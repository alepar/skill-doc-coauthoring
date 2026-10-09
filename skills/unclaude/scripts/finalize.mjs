// finalize.mjs — turn the unclaude engine's result into the single findings report the reviewer works
// from. Everything here is deterministic: quote verification against the snapshot, protected-span
// suppression, duplicate merging, the weak-hit cluster rule, numbering and markdown rendering.
// Invoked through ./finalize (bash wrapper). Exit codes: 0 ok, 2 bad input.
import { readFileSync, writeFileSync, existsSync } from 'node:fs'
import { resolve, dirname, join, extname } from 'node:path'

const USAGE = `usage: finalize --result <file> --out <report.md> [--json-out <file>] [--date YYYY-MM-DD]

  --result     the workflow's output: the task output file named in the completion notification,
               a run record (*.json with a "result" key), or the bare result object
  --out        where to write the markdown report
  --json-out   also write the numbered findings, claims and references as JSON (the reviewer reads it)
               (default: findings.json next to the report)

Also writes reviewer-prompt.md and guard-prompt.md next to the report, with every path filled in.
  --date       report date (default: today)`
const die = (code, msg) => { process.stderr.write(`finalize: ${msg}\n`); process.exit(code) }

const opt = {}
const argv = process.argv.slice(2)
for (let i = 0; i < argv.length; i++) {
  const a = argv[i]
  if (a === '--help' || a === '-h') { console.log(USAGE); process.exit(0) }
  if (!a.startsWith('--') || i + 1 >= argv.length) die(2, `bad argument '${a}'\n${USAGE}`)
  opt[a.slice(2).replace(/-([a-z])/g, (_, c) => c.toUpperCase())] = argv[++i]
}
if (!opt.result || !opt.out) die(2, USAGE)
if (!existsSync(opt.result)) die(2, `result file not found: ${opt.result}`)

// ---- load
let raw = readFileSync(opt.result, 'utf8')
const brace = raw.indexOf('{')
if (brace > 0) raw = raw.slice(brace)
let doc
try { doc = JSON.parse(raw) } catch (e) { die(2, `result is not JSON: ${e.message}`) }
const R = doc?.engine === 'unclaude' ? doc : doc?.result?.engine === 'unclaude' ? doc.result : null
if (!R) die(2, 'no unclaude result found (expected a top-level or "result" object with engine: "unclaude")')
const date = opt.date ?? new Date().toISOString().slice(0, 10)
const snap = R.target?.snapshot
if (!snap || !existsSync(snap)) die(2, `snapshot not found: ${snap}`)
const text = readFileSync(snap, 'utf8')
const lines = text.split('\n')

// ---- paragraphs: runs of non-blank lines; a fenced code block is one paragraph.
const paraOf = new Array(lines.length + 2).fill(null)
const paras = []
{
  let cur = null, fence = false
  lines.forEach((l, i) => {
    const n = i + 1
    const isFence = /^\s*(```|~~~)/.test(l)
    if (!fence && l.trim() === '') { cur = null; if (isFence) fence = !fence; return }
    if (!cur) { cur = { idx: paras.length + 1, start: n, end: n }; paras.push(cur) }
    cur.end = n
    paraOf[n] = cur.idx
    if (isFence) fence = !fence
  })
}

// ---- quote location
const norm = s => String(s ?? '').replace(/[‘’]/g, "'").replace(/[“”]/g, '"').replace(/\s+/g, ' ').trim()
const normText = norm(text)
function locate(q, hint) {
  q = String(q ?? '')
  if (!q.trim()) return { check: 'missing' }
  // Prefer the occurrence nearest the scout's line hint.
  const hits = []
  for (let i = text.indexOf(q); i >= 0; i = text.indexOf(q, i + 1)) hits.push(i)
  if (hits.length) {
    const lineAt = i => text.slice(0, i).split('\n').length
    const off = hits.sort((a, b) => Math.abs(lineAt(a) - (hint ?? lineAt(a))) - Math.abs(lineAt(b) - (hint ?? lineAt(b))))[0]
    const best = lineAt(off)
    return { check: 'exact', lineStart: best, lineEnd: best + q.split('\n').length - 1, offset: off }
  }
  const nq = norm(q)
  if (!normText.includes(nq)) return { check: 'missing' }
  const head = nq.slice(0, 40)
  const cands = lines.map((_, i) => i).filter(i => norm(lines.slice(i, i + 8).join(' ')).includes(head))
  // The last window that still contains the head starts on the quote's first line; pick the one nearest the hint.
  const starts = cands.filter(i => !cands.includes(i + 1) || !norm(lines.slice(i + 1, i + 9).join(' ')).includes(head))
  const best = (starts.length ? starts : cands).sort((a, b) => Math.abs(a + 1 - (hint ?? a + 1)) - Math.abs(b + 1 - (hint ?? b + 1)))[0]
  const ls = best >= 0 ? best + 1 : hint
  const offset = lines.slice(0, Math.max(0, ls - 1)).reduce((n, l) => n + l.length + 1, 0)
  return { check: 'normalized', lineStart: ls, lineEnd: ls + Math.max(0, Math.ceil(nq.length / 80) - 1), offset }
}

// ---- protected spans
const spans = (R.protect?.spans ?? []).map(s => ({ ...s, ...locate(s.text, s.lineStart) })).filter(s => s.check !== 'missing')
const mismatched = (R.protect?.quotes ?? []).filter(q => q.status === 'mismatch')
const mismatchedNorm = mismatched.map(q => norm(q.quote))
const insideProtected = f => spans.some(s =>
  !(s.kind === 'quote' && mismatchedNorm.some(m => m && norm(s.text).includes(m))) &&
  norm(s.text).includes(norm(f.quote)) && f.lineStart >= s.lineStart - 1 && f.lineStart <= (s.lineEnd ?? s.lineStart) + 1)

// ---- findings: quote-check findings first, then scouts'
const quoteFindings = mismatched.map(q => ({
  lane: 'quotes', pattern: 'quotation does not match its source', strength: 'strong', confidence: 'high',
  quote: q.quote, lineStart: q.lineStart, lineEnd: q.lineStart,
  why: `Attributed to ${q.attributedTo || 'a source'} (${q.source || 'source not named'}), which says something different.${q.note ? ' ' + q.note : ''}`,
  digestRefs: ['V01'], action: 'rewrite',
  fix: "Restore the source's wording, or drop the quotation marks and paraphrase accurately.",
  suggestedRewrite: q.sourceText ?? '',
}))
const CONF = { high: 3, medium: 2, low: 1 }
const scopes = R.coverage?.laneScopes ?? {}
const located = [...quoteFindings, ...(R.findings ?? [])].map(f => {
  const loc = locate(f.quote, f.lineStart)
  return { ...f, check: loc.check, lineStart: loc.lineStart ?? f.lineStart, lineEnd: loc.lineEnd ?? f.lineEnd ?? f.lineStart, offset: loc.offset ?? 0 }
})
const unverified = located.filter(f => f.check === 'missing')
const verified = located.filter(f => f.check !== 'missing')
// Quotation mismatches and verifier contradictions are about the protected text itself (a misquote, a
// wrong flag inside a code span), so protection does not hide them.
const factual = f => f.lane === 'quotes' || String(f.job ?? '').startsWith('verify ')
const suppressed = verified.filter(f => !factual(f) && insideProtected(f))
const live = verified.filter(f => !suppressed.includes(f))

// Merge findings on the same text in the same paragraph: equal quotes, or one quote containing the other.
const merged = []
for (const f of live.sort((a, b) => a.lineStart - b.lineStart || (CONF[b.confidence] ?? 0) - (CONF[a.confidence] ?? 0))) {
  const p = paraOf[f.lineStart]
  const nq = norm(f.quote)
  const m = merged.find(g => g.para === p && g.members.some(x => { const nx = norm(x.quote); return nx === nq || nx.includes(nq) || nq.includes(nx) }))
  if (m) m.members.push(f)
  else merged.push({ para: p, members: [f] })
}
const findings = merged.map(g => {
  const ms = g.members
  const rep = [...ms].sort((a, b) => (b.strength === 'strong') - (a.strength === 'strong') || (CONF[b.confidence] ?? 0) - (CONF[a.confidence] ?? 0) || b.quote.length - a.quote.length)[0]
  const uniq = xs => [...new Set(xs.filter(Boolean))]
  const others = uniq(ms.filter(x => x !== rep).map(x => x.fix)).filter(x => x !== rep.fix)
  return {
    ...rep,
    para: g.para,
    lanes: uniq(ms.map(x => x.lane)),
    patterns: uniq(ms.map(x => x.pattern)),
    digestRefs: uniq(ms.flatMap(x => x.digestRefs ?? [])),
    strength: ms.some(x => x.strength === 'strong') ? 'strong' : 'weak',
    lineStart: Math.min(...ms.map(x => x.lineStart)),
    lineEnd: Math.max(...ms.map(x => x.lineEnd ?? x.lineStart)),
    offset: Math.min(...ms.map(x => x.offset ?? 0)),
    alternativeFixes: others.slice(0, 3),
    mergedCount: ms.length,
  }
})
// Cluster rule: a weak finding is acted on only with another finding in its paragraph, or when a
// document-scope lane (which applies its own rate threshold) reported it.
const perPara = {}
for (const f of findings) perPara[f.para] = (perPara[f.para] ?? 0) + 1
const isActive = f => f.strength === 'strong' || (perPara[f.para] ?? 0) >= 2 || f.lanes.some(l => scopes[l] === 'document')
const active = findings.filter(isActive).sort((a, b) => a.offset - b.offset || a.lineEnd - b.lineEnd)
const isolated = findings.filter(f => !isActive(f))
active.forEach((f, i) => { f.id = `U${i + 1}` })

// ---- claims and references
const claims = (R.claims ?? []).map(c => ({ ...c, ...(() => { const l = locate(c.quote ?? c.claim, c.lineStart); return { check: l.check, lineStart: l.lineStart ?? c.lineStart } })() }))
  .sort((a, b) => a.lineStart - b.lineStart)
// Only sources a reader can follow become References (R11). Local paths (the repo the text describes,
// a scratch copy) were checked but are listed apart: a project's own docs do not cite their own tree.
// A verifier may cite several sources in one string ("URL; path:line"), so split it: each URL or DOI is
// a reference candidate, the rest is local evidence.
const URL_RE = /\b(?:https?:\/\/[^\s;,)\]]+|doi:\S+)/gi
const references = [], localSources = []
const add = (list, ref, title, line) => {
  const r = list.find(x => x.ref === ref)
  if (r) r.lines.push(line)
  else list.push({ ref, title: title || ref, lines: [line] })
}
for (const c of claims) {
  const ref = String(c.sourceRef ?? '').trim()
  if (!ref || !['holds', 'contradicted'].includes(c.status)) continue
  const urls = ref.match(URL_RE) ?? []
  // Strip a trailing line locator ("…/SKILL.md:255-318") so one page is one reference.
  for (const u of urls) { const clean = u.replace(/[.:]$/, '').replace(/(\.[a-z]+):\d+(-\d+)?$/i, '$1'); add(references, clean, clean, c.lineStart) }
  const rest = ref.replace(URL_RE, '').replace(/^[\s;,()]+|[\s;,()]+$/g, '')
  if (rest) add(localSources, rest, rest, c.lineStart)
}

// ---- render
const cell = s => String(s ?? '').replace(/\|/g, '\\|').replace(/\n/g, ' ')
const quoteBlock = q => String(q ?? '').split('\n').slice(0, 8).map(l => `> ${l}`).join('\n')
const fence = s => { const t = String(s); const n = Math.max(3, ...(t.match(/`+/g) ?? []).map(x => x.length + 1)); return '`'.repeat(n) + '\n' + t + '\n' + '`'.repeat(n) }
const span = f => `${f.lineStart}${f.lineEnd && f.lineEnd !== f.lineStart ? '-' + f.lineEnd : ''}`
const cov = R.coverage ?? {}
const byLane = {}
for (const f of active) for (const l of f.lanes) byLane[l] = (byLane[l] ?? 0) + 1
const quoteChecks = R.protect?.quotes ?? []
const authorFlags = active.filter(f => f.action === 'flag').length

const out = []
out.push(`# unclaude report: ${R.label || R.target?.path}`, '')
out.push(`${date} · \`${R.target?.path}\` (${R.target?.lines} lines, ${R.target?.words} words) · written by: ${R.source}${R.dryRun ? ' · **DRY RUN (stub agents; findings are canned)**' : ''}`, '')
out.push(`${cov.scouts ?? 0} scouts · ${(R.findings ?? []).length} raw findings + ${quoteFindings.length} quotation mismatches → **${active.length} to act on** (${active.filter(f => f.strength === 'strong').length} strong, ${active.length - active.filter(f => f.strength === 'strong').length} weak in clusters; ${authorFlags} need the author) · ${isolated.length} isolated weak hits not acted on · ${suppressed.length} inside protected spans · ${claims.length} claims checked`, '')
const gaps = []
if (cov.protectDead) gaps.push('the protect pass returned nothing (no protected spans, no quotation checks)')
if (cov.deadScouts?.length) gaps.push(`${cov.deadScouts.length} scout(s) returned nothing: ${cov.deadScouts.join(', ')}`)
if (cov.deadVerifiers?.length) gaps.push(`${cov.deadVerifiers.length} verifier(s) returned nothing (their claims count as unverifiable): ${cov.deadVerifiers.join(', ')}`)
if (unverified.length) gaps.push(`${unverified.length} finding(s) quote text not found in the text (listed at the end, not acted on)`)
if (cov.stubDeviations?.length) gaps.push(`DRY RUN FAILED: ${cov.stubDeviations.length} stub agent(s) did not return their canned JSON (${cov.stubDeviations.join(', ')}); check the run for side effects`)
if (gaps.length) out.push('**Coverage gaps:** ' + gaps.join('; ') + '.', '')
if (Object.keys(byLane).length) out.push('By lane: ' + Object.entries(byLane).sort((a, b) => b[1] - a[1]).map(([l, n]) => `${l} ${n}`).join(' · '), '')
if (R.source === 'unknown') out.push('Writer unknown: family-specific notes were applied as weaker evidence. Two cross-family conflicts apply (digest, "Cross-family conflicts"): formatting and hedging push in opposite directions for GPT and Claude text.', '')

const refs = R.refs ?? {}
if (refs.authorNotes) out.push('## Author decisions', '', 'Binding on the reviewer and the guard. Findings that would undo one are skipped with the reason "author decision".', '', ...refs.authorNotes.split('\n').map(l => `> ${l}`), '')
out.push('## Findings to act on', '')
out.push('Grouped by paragraph in document order. The reviewer decides each one: applied, skipped (with reason) or flagged for the author. Line numbers refer to the snapshot taken before any edit.', '')
if (!active.length) out.push('Nothing to act on.', '')
let lastPara = null
for (const f of active) {
  if (f.para !== lastPara) {
    const p = paras[f.para - 1]
    out.push(`### ¶${f.para} (lines ${p ? `${p.start}-${p.end}` : '?'})`, '')
    lastPara = f.para
  }
  out.push(`#### ${f.id} · ${f.strength} · ${f.patterns.join(' / ')} — line ${span(f)}`, '')
  out.push(`Lanes: ${f.lanes.join(', ')} · confidence ${f.confidence} · digest: ${f.digestRefs.join(', ') || '—'}${f.check === 'normalized' ? ' · quote matched after whitespace normalization' : ''}`, '')
  out.push(quoteBlock(f.quote), '')
  out.push(`- **Why:** ${f.why}`)
  out.push(`- **Fix (${f.action}):** ${f.fix}`)
  if (f.alternativeFixes.length) out.push(`- **Other scouts proposed:** ${f.alternativeFixes.join(' / ')}`)
  if (f.suggestedRewrite) out.push('', 'Suggested text:', '', fence(f.suggestedRewrite))
  out.push('')
}

if (quoteChecks.length) {
  out.push('## Quotation checks', '', '| Line | Quote | Attributed to | Source | Status | Note |', '|---|---|---|---|---|---|')
  for (const q of quoteChecks) out.push(`| ${q.lineStart} | ${cell(String(q.quote).slice(0, 80))} | ${cell(q.attributedTo)} | ${cell(q.source)} | ${q.status} | ${cell(q.note)} |`)
  out.push('')
}
if (claims.length) {
  const counts = {}
  for (const c of claims) counts[c.status] = (counts[c.status] ?? 0) + 1
  out.push('## Claims checked', '', `Extracted by the claims lane, verified by fresh agents that did not see the text. ${Object.entries(counts).map(([k, n]) => `${n} ${k}`).join(' · ')}.`, '',
    '| Line | Claim | Type | Verdict | Evidence | Source |', '|---|---|---|---|---|---|')
  const link = r => /^(https?:\/\/|doi:)\S+$/i.test(r) ? `[${cell(r)}](${r})` : cell(r).replace(URL_RE, u => `<${u}>`)
  for (const c of claims) out.push(`| ${c.lineStart} | ${cell(String(c.claim).slice(0, 120))} | ${c.type ?? ''} | ${c.status}${c.status === 'contradicted' && c.correction ? `: ${cell(c.correction)}` : ''} | ${cell(String(c.evidence ?? '').slice(0, 240))} | ${c.sourceRef ? link(c.sourceRef) : '—'} |`)
  out.push('')
}
if (references.length) {
  out.push('## Reference candidates', '', 'Sources the claims lane checked. The reviewer adds the ones the text relies on to a References section at the end of the document (R11).', '')
  for (const r of references) out.push(`- ${r.title} — ${r.ref} (supports lines ${[...new Set(r.lines)].join(', ')})`)
  out.push('')
}
if (localSources.length) {
  out.push('## Checked against local sources', '', 'Files and repositories the claims lane read. They back the claims but are not reference candidates: readers cannot follow a local path.', '')
  for (const r of localSources) out.push(`- ${r.title} — \`${r.ref}\` (lines ${[...new Set(r.lines)].join(', ')})`)
  out.push('')
}
if (isolated.length) {
  out.push(`## Isolated weak hits (${isolated.length}, not acted on)`, '', 'Weak tells with no other finding in their paragraph. A single weak hit is normal in human writing (K5).', '')
  out.push('| Line | Lane | Pattern | Quote |', '|---|---|---|---|')
  for (const f of isolated) out.push(`| ${span(f)} | ${f.lanes.join(', ')} | ${cell(f.patterns.join(' / '))} | ${cell(String(f.quote).slice(0, 100))} |`)
  out.push('')
}
if (suppressed.length) {
  out.push(`## Inside protected spans (${suppressed.length}, not acted on)`, '', '| Line | Lane | Pattern | Quote |', '|---|---|---|---|')
  for (const f of suppressed) out.push(`| ${span(f)} | ${f.lane} | ${cell(f.pattern)} | ${cell(String(f.quote).slice(0, 100))} |`)
  out.push('')
}
if (unverified.length) {
  out.push(`## Unverified quotes (${unverified.length})`, '', 'The quoted text was not found in the snapshot, so these are not acted on.', '', '| Claimed line | Lane | Pattern | Quote |', '|---|---|---|---|')
  for (const f of unverified) out.push(`| ${f.lineStart} | ${f.lane} | ${cell(f.pattern)} | ${cell(String(f.quote).slice(0, 100))} |`)
  out.push('')
}
out.push('## Coverage', '')
out.push(`Sources of truth: ${(refs.truth ?? []).length ? refs.truth.map(t => `\`${t}\``).join(', ') + (refs.truthDefaulted ? ' (the git repository containing the target)' : '') : 'none given'}.`, '')
out.push(`Lanes: ${(cov.lanes ?? []).join(', ')} · ${cov.chunks ?? 0} chunk(s) · ${spans.length} protected spans (${(R.protect?.spans ?? []).length - spans.length} not located).`, '')
for (const c of R.clean ?? []) if (c.n === 0 && c.cleanNotes) out.push(`- clean · ${c.job}: ${cell(c.cleanNotes)}`)
out.push('')

const reportPath = resolve(opt.out)
const jsonPath = resolve(opt.jsonOut ?? join(dirname(reportPath), 'findings.json'))
writeFileSync(reportPath, out.join('\n'))
writeFileSync(jsonPath, JSON.stringify({
  label: R.label, target: R.target, source: R.source, date, dryRun: R.dryRun, coverage: cov,
  findings: active, isolated, suppressed, unverified, protectedSpans: spans, quoteChecks, claims, references, localSources,
}, null, 1))

// ---- reviewer and guard prompts, filled so the orchestrator only has to point an agent at them
const runDir = dirname(reportPath)
const fillAll = (t, vars) => t.replace(/\{\{[A-Z_]+\}\}/g, k => k in vars ? vars[k] : k)
const authorBlock = refs.authorNotes
  ? `- Author decisions (binding; also at the top of the report): skip any finding that would undo one, with the reason "author decision". Do not treat a kept decision as a regression.\n${refs.authorNotes.split('\n').map(l => `  ${l}`).join('\n')}`
  : ''
const vars = {
  '{{TARGET}}': R.target?.path ?? '',
  '{{ORIGINAL}}': snap,
  '{{REPORT}}': reportPath,
  '{{FINDINGS_JSON}}': jsonPath,
  '{{DIGEST_PATH}}': refs.digestPath ?? '',
  '{{SAMPLE_NOTE}}': refs.writerSample ? `- Writer sample: ${refs.writerSample}. Its rates and register override the digest's defaults (R05).` : '',
  '{{AUTHOR_NOTES}}': authorBlock,
  '{{DIFF}}': join(runDir, 'review.diff'),
  '{{REVIEW_LOG}}': join(runDir, 'review-log.json'),
}
const prompts = {}
if (refs.promptsDir) for (const p of ['reviewer', 'guard']) {
  const src = join(refs.promptsDir, `${p}.md`)
  if (!existsSync(src)) continue
  const template = readFileSync(src, 'utf8')
  const left = (template.match(/\{\{[A-Z_]+\}\}/g) ?? []).filter(k => !(k in vars))
  const filled = fillAll(template, vars)
  if (left.length) die(2, `prompts/${p}.md has unknown tokens: ${[...new Set(left)].join(', ')}`)
  prompts[p] = join(runDir, `${p}-prompt.md`)
  writeFileSync(prompts[p], filled)
}
console.log(JSON.stringify({
  report: resolve(opt.out), act: active.length, strong: active.filter(f => f.strength === 'strong').length,
  authorFlags, isolated: isolated.length, suppressed: suppressed.length, unverified: unverified.length,
  claims: claims.length, references: references.length, localSources: localSources.length, gaps,
  reviewerPrompt: prompts.reviewer ?? null, guardPrompt: prompts.guard ?? null,
}, null, 1))
