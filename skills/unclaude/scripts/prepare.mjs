// prepare.mjs — snapshot the target, cut it into scout chunks, assemble the lanes and prompts, and
// write a runnable engine script with the args embedded. Invoked through ./prepare (bash wrapper).
// Exit codes: 0 ok, 2 bad input, 3 skill-file drift (a prompt file or marker the assembly needs is missing).
import { readFileSync, writeFileSync, mkdirSync, statSync, readdirSync, existsSync, copyFileSync } from 'node:fs'
import { dirname, join, resolve, basename, extname } from 'node:path'
import { execFileSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'

const SKILL = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const SOURCES = ['claude', 'openai', 'gemini', 'unknown']
const USAGE = `usage: prepare --target <file> --out-dir <dir> [options]

  --target <file>             the text to scan (Markdown or plain text); it is snapshotted to the out dir
  --source <family>           who wrote it: ${SOURCES.join(', ')} (default claude)
  --writer-sample <file>      a sample of the author's own prose; its rates and register override the defaults
  --author-notes <file>       decisions the author has made about this text (claims to keep, framing to keep,
                              no References section, ...); every scout, the reviewer and the guard must honor them
  --truth <path,...>          sources of truth for the claims lane: repos, docs dirs or files the text describes
                              (default: the git repository containing the target, if any)
  --lanes <a,b>               run only these lanes;  --skip-lanes <a,b>  drop these lanes
  --chunk-lines <n>           passage lanes read chunks of about this many lines, cut at paragraph breaks (default 80)
  --no-web                    protect pass and claims lane use local files only
  --agent-models <site=m,...> override workflow agent models (sites: protect, scout, claims, verify)
  --effort <site=e,...>       override workflow agent effort per site
  --label <text>              run label shown in the report
  --dry-run                   stub every agent (haiku, canned JSON) to validate the pipeline
  --out-dir <dir>             where the snapshot, args.json and run.js are written (required)`

const die = (code, msg) => { process.stderr.write(`prepare: ${msg}\n`); process.exit(code) }

// ---- argv
const opt = {}
const argv = process.argv.slice(2)
for (let i = 0; i < argv.length; i++) {
  const a = argv[i]
  if (a === '--help' || a === '-h') { console.log(USAGE); process.exit(0) }
  if (a === '--dry-run') { opt.dryRun = true; continue }
  if (a === '--no-web') { opt.noWeb = true; continue }
  if (!a.startsWith('--') || i + 1 >= argv.length) die(2, `bad argument '${a}'\n${USAGE}`)
  opt[a.slice(2).replace(/-([a-z])/g, (_, c) => c.toUpperCase())] = argv[++i]
}
const known = ['target', 'source', 'writerSample', 'authorNotes', 'truth', 'lanes', 'skipLanes', 'chunkLines', 'noWeb', 'agentModels', 'effort', 'label', 'dryRun', 'outDir']
for (const k of Object.keys(opt)) if (!known.includes(k)) die(2, `unknown option --${k.replace(/[A-Z]/g, c => '-' + c.toLowerCase())}`)
if (!opt.target) die(2, '--target is required')
if (!opt.outDir) die(2, '--out-dir is required')
const source = (opt.source ?? 'claude').toLowerCase()
if (!SOURCES.includes(source)) die(2, `--source must be one of ${SOURCES.join(', ')}`)
const targetPath = resolve(opt.target)
if (!existsSync(targetPath) || !statSync(targetPath).isFile()) die(2, `target is not a file: ${opt.target}`)
let writerSample = null
if (opt.writerSample) {
  writerSample = resolve(opt.writerSample)
  if (!existsSync(writerSample)) die(2, `writer sample not found: ${opt.writerSample}`)
}

let authorNotes = ''
if (opt.authorNotes) {
  const p = resolve(opt.authorNotes)
  if (!existsSync(p)) die(2, `author notes not found: ${opt.authorNotes}`)
  authorNotes = readFileSync(p, 'utf8').trim()
  if (authorNotes.length > 8000) die(2, '--author-notes: keep it under 8000 characters; it goes into every prompt')
}
const gitRoot = dir => { try { return execFileSync('git', ['-C', dir, 'rev-parse', '--show-toplevel'], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim() || null } catch { return null } }
let truth = opt.truth ? opt.truth.split(',').map(x => x.trim()).filter(Boolean).map(x => resolve(x)) : null
for (const t of truth ?? []) if (!existsSync(t)) die(2, `--truth path not found: ${t}`)
const truthDefaulted = !truth
if (!truth) { const g = gitRoot(dirname(targetPath)); truth = g ? [g] : [] }

// ---- snapshot and chunks
const outDir = resolve(opt.outDir)
mkdirSync(outDir, { recursive: true })
const snapshot = join(outDir, 'original' + (extname(targetPath) || '.txt'))
copyFileSync(targetPath, snapshot)
const text = readFileSync(snapshot, 'utf8')
const lines = text.length ? text.split('\n') : []
if (lines.length && lines[lines.length - 1] === '') lines.pop()
if (!lines.length) die(2, 'target is empty')
const chunkLines = Number(opt.chunkLines ?? 80)
if (!(chunkLines >= 20)) die(2, '--chunk-lines must be >= 20')
// Cut at a blank line outside a code fence once a chunk reaches chunkLines; force a cut at twice that.
const chunks = []
let start = 1, inFence = false
lines.forEach((l, i) => {
  const n = i + 1
  if (/^\s*(```|~~~)/.test(l)) inFence = !inFence
  const size = n - start + 1
  if ((size >= chunkLines && l.trim() === '' && !inFence) || size >= chunkLines * 2) { chunks.push({ start, end: n }); start = n + 1 }
})
if (start <= lines.length) {
  const rest = lines.length - start + 1
  // A short tail joins the previous chunk instead of costing a scout of its own.
  if (chunks.length && rest < chunkLines / 3) chunks[chunks.length - 1].end = lines.length
  else chunks.push({ start, end: lines.length })
}
const words = text.split(/\s+/).filter(Boolean).length

// ---- skill files
const read = rel => {
  const p = join(SKILL, rel)
  if (!existsSync(p)) die(3, `missing skill file ${rel}`)
  return readFileSync(p, 'utf8')
}
function parseLane(t, file) {
  const m = t.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/)
  if (!m) die(3, `lane ${file}: missing frontmatter`)
  const fm = Object.fromEntries(m[1].split('\n').map(l => l.match(/^(\w+):\s*(.*)$/)).filter(Boolean).map(x => [x[1], x[2].trim()]))
  for (const k of ['key', 'title', 'scope']) if (!fm[k]) die(3, `lane ${file}: frontmatter lacks ${k}`)
  if (!['passage', 'document'].includes(fm.scope)) die(3, `lane ${file}: scope must be passage or document`)
  const parts = m[2].split(/^## (\S+)\s*$/m)
  const byFamily = {}
  for (let i = 1; i < parts.length; i += 2) byFamily[parts[i]] = parts[i + 1].trim()
  return { key: fm.key, title: fm.title, scope: fm.scope, brief: parts[0].trim(), byFamily }
}
const laneFiles = readdirSync(join(SKILL, 'lanes')).filter(f => f.endsWith('.md')).sort()
let lanes = laneFiles.map(f => parseLane(read(`lanes/${f}`), f))
const laneKeys = lanes.map(l => l.key)
const pickList = s => s ? s.split(',').map(x => x.trim()).filter(Boolean) : null
const only = pickList(opt.lanes), skip = pickList(opt.skipLanes) ?? []
for (const k of [...(only ?? []), ...skip]) if (!laneKeys.includes(k)) die(2, `unknown lane '${k}'. Lanes: ${laneKeys.join(', ')}`)
lanes = lanes.filter(l => (!only || only.includes(l.key)) && !skip.includes(l.key))
if (!lanes.length) die(2, 'no lanes left to run')

const prompts = {}
for (const p of ['protect', 'scout', 'verify']) prompts[p] = read(`prompts/${p}.md`).trim()
for (const [p, tokens] of Object.entries({ protect: ['{{TARGET}}', '{{WEB_NOTE}}'], scout: ['{{LANE_BRIEF}}', '{{TARGET}}', '{{PROTECTED}}', '{{DIGEST_PATH}}', '{{CLAIMS_NOTE}}', '{{AUTHOR_NOTES}}'], verify: ['{{CLAIMS}}', '{{TRUTH_NOTE}}', '{{WEB_NOTE}}'] }))
  for (const t of tokens) if (!prompts[p].includes(t)) die(3, `prompts/${p}.md lacks token ${t}`)
for (const [p, tokens] of Object.entries({ reviewer: ['{{TARGET}}', '{{REPORT}}', '{{FINDINGS_JSON}}', '{{AUTHOR_NOTES}}'], guard: ['{{ORIGINAL}}', '{{DIFF}}', '{{REVIEW_LOG}}', '{{AUTHOR_NOTES}}'] })) {
  const t = read(`prompts/${p}.md`)
  for (const k of tokens) if (!t.includes(k)) die(3, `prompts/${p}.md lacks token ${k}`)
}

if (opt.dryRun) {
  prompts.stubs = {
    protect: '{"spans":[{"kind":"code","lineStart":1,"lineEnd":1,"text":"stub span"}],"quotes":[{"lineStart":1,"quote":"stub quote","status":"mismatch","sourceText":"stub source","attributedTo":"stub","source":"stub","note":"stub"}]}',
    verify: '{"verdicts":[{"id":"{{ID}}","verdict":"holds","evidence":"stub evidence","evidenceRef":"stub"}]}',
    scout: '{"findings":[{"lineStart":{{LINE}},"lineEnd":{{LINE}},"quote":"stub quote","pattern":"stub-{{LANE}}","strength":"weak","why":"stub","digestRefs":["X01"],"action":"rewrite","fix":"stub fix","suggestedRewrite":"","confidence":"medium"}],"cleanNotes":"stub"}',
  }
}

const kv = (s, what) => Object.fromEntries(String(s).split(',').filter(Boolean).map(p => {
  const i = p.indexOf('=')
  if (i < 1) die(2, `${what}: expected key=value, got '${p}'`)
  return [p.slice(0, i).trim(), p.slice(i + 1).trim()]
}))
const config = { noWeb: !!opt.noWeb }
if (opt.agentModels) config.agentModels = kv(opt.agentModels, '--agent-models')
if (opt.effort) config.effort = kv(opt.effort, '--effort')

const args = {
  label: opt.label ?? basename(targetPath),
  source,
  dryRun: !!opt.dryRun,
  target: { path: targetPath, snapshot, lines: lines.length, words },
  chunks,
  lanes,
  prompts,
  refs: { digestPath: join(SKILL, 'reference/digest.md'), writerSample, authorNotes, truth, truthDefaulted, promptsDir: join(SKILL, 'prompts') },
  config,
}

// ---- write
const engine = read('engine/unclaude.js')
const MARK = 'const EMBEDDED_ARGS = null // @@EMBEDDED_ARGS@@'
if (!engine.includes(MARK)) die(3, 'engine/unclaude.js lacks the EMBEDDED_ARGS marker')
writeFileSync(join(outDir, 'args.json'), JSON.stringify(args, null, 1))
writeFileSync(join(outDir, 'run.js'), engine.replace(MARK, () => `const EMBEDDED_ARGS = ${JSON.stringify(args)}`))

const passage = lanes.filter(l => l.scope === 'passage').length
const scouts = passage * chunks.length + (lanes.length - passage)
console.log(JSON.stringify({
  script: join(outDir, 'run.js'),
  snapshot,
  dryRun: !!opt.dryRun,
  target: targetPath, lines: lines.length, words, source,
  chunks: chunks.length,
  lanes: lanes.map(l => l.key),
  agents: scouts + 1,
  verifiers: 'plus one verifier per 12 claims the claims lane extracts',
  truth,
  authorNotes: !!authorNotes,
}, null, 1))
