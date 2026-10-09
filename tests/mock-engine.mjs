// mock-engine.mjs — run the unclaude engine under node with stub agent()/parallel(), then finalize, and
// assert on the results. Covers lane assembly by source family, prompt filling, protected-span
// suppression, quote verification, the quotation-mismatch path, duplicate merging, the weak-hit
// cluster rule, dead scouts, claims and reference candidates, the dry-run stub path, author notes, sources of
// truth, local sources kept out of References, and the filled reviewer/guard prompts.
// Usage: node tests/mock-engine.mjs   (exit 0 = all assertions passed)
import { execFileSync } from 'node:child_process'
import { readFileSync, writeFileSync, mkdtempSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join, resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import assert from 'node:assert/strict'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const SKILL = join(ROOT, 'skills/unclaude')
const FIX = join(ROOT, 'tests/fixtures/sample-doc.md')
const tmp = mkdtempSync(join(tmpdir(), 'unclaude-test-'))
const AsyncFunction = (async () => {}).constructor

const prepare = (dir, extra = []) =>
  JSON.parse(execFileSync('bash', [join(SKILL, 'scripts/prepare'), '--target', FIX, '--out-dir', dir, '--chunk-lines', '20', ...extra], { encoding: 'utf8' }))
const finalize = (dir, result) => {
  writeFileSync(join(dir, 'result.json'), JSON.stringify(result))
  const out = execFileSync('bash', [join(SKILL, 'scripts/finalize'), '--result', join(dir, 'result.json'), '--out', join(dir, 'report.md'),
    '--json-out', join(dir, 'findings.json'), '--date', '2026-10-08'], { encoding: 'utf8' })
  return { summary: JSON.parse(out), report: readFileSync(join(dir, 'report.md'), 'utf8'), json: JSON.parse(readFileSync(join(dir, 'findings.json'), 'utf8')) }
}
async function runEngine(scriptPath, agentImpl) {
  const src = readFileSync(scriptPath, 'utf8').replace('export const meta', 'const meta')
  const calls = []
  const agent = async (prompt, opts) => { calls.push({ prompt, opts }); return agentImpl(prompt, opts) }
  const settle = p => Promise.resolve().then(p).catch(() => null)
  const parallel = thunks => Promise.all(thunks.map(t => settle(t)))
  const logs = []
  const fn = new AsyncFunction('args', 'agent', 'parallel', 'phase', 'log', src)
  const result = await fn(undefined, agent, parallel, () => {}, m => logs.push(m))
  return { result, calls, logs }
}
const F = (lineStart, quote, pattern, strength, extra = {}) =>
  ({ lineStart, lineEnd: lineStart, quote, pattern, strength, why: 'w', digestRefs: ['X01'], action: 'rewrite', fix: `fix ${pattern}`, suggestedRewrite: '', confidence: 'medium', ...extra })
const HOPPER = "The most dangerous phrase in the language is: we've always done it this way."

// ---------- case A: real path with scripted agents
{
  const dir = join(tmp, 'a')
  const prep = prepare(dir)
  assert.equal(prep.chunks, 1)
  assert.equal(prep.lanes.length, 13)
  assert.equal(prep.agents, 14, 'one protect agent + 8 passage lanes x 1 chunk + 5 document lanes')

  const SCOUTS = {
    'lexical @ 1-13': { findings: [F(3, 'pivotal', 'tier A word', 'weak'), F(11, 'Additionally', 'sentence-initial transition', 'weak'),
      F(11, 'robust', 'tier B word', 'weak'), F(9, 'the cutover', 'stiff word', 'weak'), F(9, 'never skip the dry run', 'absolute', 'weak'),
      F(4, 'this sentence is not in the document', 'phantom', 'strong')], cleanNotes: '' },
    'contrast @ 1-13': { findings: [F(3, "Here's the thing:", 'throat-clearing pivot', 'strong'),
      F(3, "isn't just a technical change — it's a strategic shift", 'negative parallelism', 'strong')], cleanNotes: '' },
    'significance @ 1-13': { findings: [F(3, 'plays a pivotal role', 'significance flag', 'strong')], cleanNotes: '' },
    'residue': { findings: [F(3, 'Great question!', 'validation opener', 'strong'),
      F(13, "Let me know if you'd like me to draft the rollout plan!", 'offer closer', 'strong')], cleanNotes: '' },
    'precision': { findings: [F(5, '1,234,567.89 messages per day', 'false precision', 'strong'),
      F(5, '$48,213.17 per year', 'false precision', 'strong', { action: 'flag' })], cleanNotes: '' },
    'shape': { findings: [F(13, 'In summary,', 'summary closer', 'strong')], cleanNotes: '' },
    'claims': {
      findings: [F(11, 'Experts say queue migrations are risky.', 'weasel attribution', 'strong', { action: 'flag' })],
      claims: [
        { lineStart: 5, quote: '1,234,567.89 messages per day', claim: 'The queue handles 1,234,567.89 messages per day', type: 'project', route: 'metrics dashboard', loadBearing: true },
        { lineStart: 7, quote: HOPPER, claim: `Grace Hopper said: ${HOPPER}`, type: 'public-fact', route: 'search', loadBearing: false },
        { lineStart: 9, quote: 'Teams must never skip the dry run.', claim: 'Teams must never skip the dry run', type: 'author-only', route: '', loadBearing: true },
      ],
      cleanNotes: '' },
    'rhythm': null,
  }
  const { result, calls, logs } = await runEngine(prep.script, (prompt, o) => {
    if (o.label === 'protect') return {
      spans: [{ kind: 'code', lineStart: 9, lineEnd: 9, text: 'queue-migrate --dry-run' },
        { kind: 'rule', lineStart: 9, lineEnd: 9, text: 'Teams must never skip the dry run.' },
        { kind: 'quote', lineStart: 7, lineEnd: 7, text: HOPPER },
        { kind: 'name', lineStart: 7, text: 'Not In The Text' }],
      quotes: [{ lineStart: 7, quote: HOPPER, attributedTo: 'Grace Hopper', source: 'Computerworld 1976', status: 'mismatch',
        sourceText: "The most dangerous phrase in the language is, 'We've always done it this way.'", note: 'wording differs' }],
    }
    if (o.label in SCOUTS) return SCOUTS[o.label]
    if (o.label === 'verify 1') return { verdicts: [
      { id: 'C1', verdict: 'unverifiable' },
      { id: 'C2', verdict: 'holds', evidence: 'The most dangerous phrase', evidenceRef: 'https://example.org/hopper' }] }
    return { findings: [], cleanNotes: `clean ${o.label}`, ...(o.label === 'claims' ? { claims: [] } : {}) }
  })
  // factored verification: the verifier sees the claims and routes, never the text
  const ver = calls.find(c => c.opts.label === 'verify 1')
  assert.ok(ver && ver.prompt.includes('C1 [project] The queue handles') && ver.prompt.includes('route: metrics dashboard'))
  assert.ok(!ver.prompt.includes(prep.snapshot) && !ver.prompt.includes('{{'), 'verifier prompt has no text path and no tokens')
  assert.ok(!ver.prompt.includes('Teams must never skip'), 'author-only claims are not sent')
  assert.equal(result.coverage.verifiers, 1)

  // prompts
  const protect = calls.find(c => c.opts.label === 'protect')
  assert.equal(protect.opts.model, 'sonnet')
  assert.ok(protect.prompt.includes(prep.snapshot) && protect.prompt.includes('WebFetch'))
  const lex = calls.find(c => c.opts.label === 'lexical @ 1-13')
  assert.ok(lex.prompt.includes('For claude-written text:'), 'claude notes added for a claude source')
  assert.ok(!lex.prompt.includes('For openai-written text:'), 'openai notes left out for a claude source')
  assert.ok(lex.prompt.includes('code @ 9: "queue-migrate --dry-run"'), 'protected spans listed')
  assert.ok(lex.prompt.includes('failed their source check (not protected): line 7'))
  assert.ok(lex.prompt.includes('lines 1-13 ONLY'))
  assert.ok(!lex.prompt.includes('{{'), 'no unfilled tokens in a scout prompt')
  const cl = calls.find(c => c.opts.label === 'claims')
  assert.ok(cl.prompt.includes('Also return `claims`') && cl.opts.schema.required.includes('claims'))
  assert.ok(!lex.opts.schema.properties.claims)
  assert.deepEqual(result.coverage.deadScouts, ['rhythm'])
  assert.ok(logs.some(l => l.includes('1 mismatched')))

  const { summary, report, json } = finalize(dir, result)
  const by = q => json.findings.find(f => f.quote === q)
  // quotation mismatch becomes a strong finding even though the quote is a protected span
  const qf = json.findings.find(f => f.lanes.includes('quotes'))
  assert.ok(qf && qf.strength === 'strong' && qf.lineStart === 7 && qf.suggestedRewrite.includes("'We've always"))
  // merge: "pivotal" (lexical) folds into "plays a pivotal role" (significance)
  const piv = by('plays a pivotal role') ?? by('pivotal')
  assert.deepEqual([...piv.lanes].sort(), ['lexical', 'significance'])
  assert.equal(piv.strength, 'strong')
  assert.equal(json.findings.filter(f => f.quote === 'pivotal').length, 0)
  // cluster rule: two weak lexical hits in one paragraph with a strong claims finding are acted on
  assert.ok(by('Additionally') && by('robust'))
  // isolated weak hit in a paragraph with nothing else
  assert.deepEqual(json.isolated.map(f => f.quote), ['the cutover'])
  // inside a protected rule span
  assert.deepEqual(json.suppressed.map(f => f.quote), ['never skip the dry run'])
  // phantom quote
  assert.deepEqual(json.unverified.map(f => f.quote), ['this sentence is not in the document'])
  // ids in document order
  assert.deepEqual(json.findings.map(f => f.id), json.findings.map((_, i) => `U${i + 1}`))
  assert.ok(json.findings.every((f, i, a) => i === 0 || a[i - 1].lineStart <= f.lineStart))
  // claims and references
  assert.deepEqual(json.claims.map(c => c.status), ['unverifiable', 'holds', 'author-only'])
  assert.ok(json.findings.some(f => f.patterns.some(p => p.startsWith('unverifiable load-bearing claim'))), 'load-bearing unverifiable claim becomes a finding')
  assert.deepEqual(json.references.map(r => r.ref), ['https://example.org/hopper'])
  // protected span that is not in the text is dropped
  assert.equal(json.protectedSpans.length, 3)
  assert.equal(summary.authorFlags, 2)
  for (const s of ['## Findings to act on', '### ¶2 (lines 3-3)', '## Quotation checks', '## Claims checked', '## Reference candidates',
    '## Isolated weak hits (1', '## Inside protected spans (1', '## Unverified quotes (1', '1 scout(s) returned nothing: rhythm'])
    assert.ok(report.includes(s), `report has ${s}`)
}

// ---------- case B: openai source, lane selection
{
  const dir = join(tmp, 'b')
  const prep = prepare(dir, ['--source', 'openai', '--lanes', 'lexical,precision', '--no-web'])
  assert.deepEqual(prep.lanes, ['lexical', 'precision'])
  const { calls } = await runEngine(prep.script, (p, o) => o.label === 'protect' ? { spans: [], quotes: [] } : { findings: [], cleanNotes: 'ok' })
  const lex = calls.find(c => c.opts.label.startsWith('lexical'))
  assert.ok(lex.prompt.includes('For openai-written text:') && !lex.prompt.includes('For claude-written text:'))
  assert.ok(calls.find(c => c.opts.label === 'protect').prompt.includes('Do not use the web'))
}

// ---------- case C: dry run stubs answer with their canned JSON
{
  const dir = join(tmp, 'c')
  const prep = prepare(dir, ['--dry-run'])
  const { result, calls } = await runEngine(prep.script, (prompt) => JSON.parse(prompt.slice(prompt.indexOf('{'))))
  assert.ok(calls.every(c => c.opts.model === 'haiku' && c.prompt.startsWith('You are a stub.')))
  assert.deepEqual(result.coverage.stubDeviations, [])
  const { report } = finalize(dir, result)
  assert.ok(report.includes('DRY RUN') && !report.includes('DRY RUN FAILED'))
  // and a deviating stub is caught
  const bad = await runEngine(prep.script, (prompt, o) => o.label === 'protect' ? { spans: [], quotes: [] } : JSON.parse(prompt.slice(prompt.indexOf('{'))))
  assert.deepEqual(bad.result.coverage.stubDeviations, ['protect'])
}

// ---------- case D: author notes, sources of truth, local sources kept out of References, filled prompts
{
  const dir = join(tmp, 'd')
  const notes = join(tmp, 'notes.md'), truthDir = mkdtempSync(join(tmpdir(), 'unclaude-truth-'))
  writeFileSync(notes, '- Keep "plays a pivotal role": the author wants it.')
  const prep = prepare(dir, ['--author-notes', notes, '--truth', truthDir, '--lanes', 'lexical,claims'])
  assert.deepEqual(prep.truth, [truthDir])
  assert.equal(prep.authorNotes, true)
  const { result, calls } = await runEngine(prep.script, (p, o) => o.label === 'protect' ? { spans: [{ kind: 'code', lineStart: 9, lineEnd: 9, text: 'queue-migrate --dry-run' }], quotes: [] }
    : o.label === 'claims' ? { findings: [], cleanNotes: 'ok', claims: [
        { lineStart: 7, quote: HOPPER, claim: `Grace Hopper said: ${HOPPER}`, type: 'public-fact', route: 'search', loadBearing: false },
        { lineStart: 9, quote: 'queue-migrate --dry-run', claim: 'queue-migrate has a --dry-run flag', type: 'command', route: 'queue-migrate --help', loadBearing: true }] }
    : o.label === 'verify 1' ? { verdicts: [
        { id: 'C1', verdict: 'holds', evidence: 'quote', evidenceRef: 'https://example.org/hopper; notes/hopper.md:2' },
        { id: 'C2', verdict: 'contradicted', evidence: '--preview  show the plan', evidenceRef: join(truthDir, 'src/cli.rs') + ':12', correction: 'queue-migrate --preview', mechanical: true }] }
    : { findings: [], cleanNotes: 'ok' })
  const lex = calls.find(c => c.opts.label.startsWith('lexical'))
  assert.ok(lex.prompt.includes('## Author decisions (binding)') && lex.prompt.includes('plays a pivotal role'))
  const cl = calls.find(c => c.opts.label === 'claims')
  assert.ok(cl.prompt.includes(`Sources of truth for this text: ${truthDir}`))
  assert.ok(calls.find(c => c.opts.label === 'verify 1').prompt.includes(`Check claims about the system against: ${truthDir}`))
  const { summary, report, json } = finalize(dir, result)
  assert.deepEqual(json.references.map(r => r.ref), ['https://example.org/hopper'])
  // a mixed ref is split: the URL is a reference candidate, the path is local evidence
  assert.deepEqual(json.localSources.map(r => r.ref), ['notes/hopper.md:2', join(truthDir, 'src/cli.rs') + ':12'])
  // a mechanical contradiction becomes a rewrite finding with the source's correction
  // even though the command sits in a protected code span
  const contra = json.findings.find(f => f.patterns.some(p => p.startsWith('contradicted claim')))
  assert.ok(contra && contra.action === 'rewrite' && contra.fix.includes('queue-migrate --preview'))
  assert.ok(report.includes('## Author decisions') && report.includes('## Checked against local sources') && report.includes(`Sources of truth: \`${truthDir}\``))
  for (const p of ['reviewerPrompt', 'guardPrompt']) {
    const t = readFileSync(summary[p], 'utf8')
    assert.ok(!/\{\{[A-Z_]+\}\}/.test(t), `${p} fully filled`)
    assert.ok(t.includes('Author decisions (binding') && t.includes('plays a pivotal role'), `${p} carries the author notes`)
  }
  assert.ok(readFileSync(summary.guardPrompt, 'utf8').includes(join(dir, 'review.diff')))
  // without notes, no author block and no stray token
  const plain = finalize(join(tmp, 'a'), JSON.parse(readFileSync(join(tmp, 'a', 'result.json'), 'utf8')))
  assert.ok(!readFileSync(plain.summary.reviewerPrompt, 'utf8').includes('Author decisions'))
}

console.log('mock-engine: all assertions passed')
