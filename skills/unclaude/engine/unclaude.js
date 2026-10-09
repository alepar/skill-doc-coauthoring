export const meta = {
  name: 'unclaude',
  description: 'Scan a text for AI-sounding patterns, false precision and unsupported claims: protect pass -> lane scouts; finalize merges into one report',
  phases: [
    { title: 'Protect', detail: 'mark spans nobody may edit; check quotations against their sources' },
    { title: 'Scout', detail: 'one scout per (passage lane x chunk) and per document lane' },
    { title: 'Verify', detail: 'fresh verifiers check the extracted claims against their sources, without seeing the text' },
  ],
}

// `scripts/prepare` writes a copy of this file with the run's args embedded on the next line, so the
// orchestrator launches it by scriptPath without transcribing the args. Explicit `args` win.
const EMBEDDED_ARGS = null // @@EMBEDDED_ARGS@@

const A = (() => {
  const a = args ?? EMBEDDED_ARGS
  return typeof a === 'string' ? JSON.parse(a) : a
})()
if (!A || !A.target || !A.lanes || !A.prompts) {
  throw new Error('unclaude: args must carry {target, lanes, prompts, chunks} (build them with scripts/prepare) — got ' + JSON.stringify(A).slice(0, 200))
}
const { target, lanes, prompts, chunks, refs = {}, config = {}, dryRun = false } = A
const SITE_MODEL = { protect: 'sonnet', scout: undefined, claims: undefined, verify: undefined }
const SITE_EFFORT = { protect: 'medium', scout: undefined, claims: undefined, verify: undefined }
const opts = (site, label, phase, schema) => {
  const o = { label, phase, schema }
  const m = dryRun ? 'haiku' : (config.agentModels?.[site] ?? SITE_MODEL[site])
  const e = dryRun ? 'low' : (config.effort?.[site] ?? SITE_EFFORT[site])
  if (m) o.model = m
  if (e) o.effort = e
  return o
}

// Single pass over all tokens, so a substituted value that quotes a later token stays literal (the
// text under review may contain `{{...}}`). Function replacement keeps `$&` literal.
const fill = (template, vars) => {
  const keys = Object.keys(vars)
  if (!keys.length) return template
  const re = new RegExp(keys.map(k => k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|'), 'g')
  return template.replace(re, t => String(vars[t] ?? ''))
}
const stubJson = (site, vars = {}) => fill(prompts.stubs?.[site] ?? '{}', vars)
const stub = (site, vars) => `You are a stub. Call no tools. Return exactly this JSON as your structured output: ${stubJson(site, vars)}`
const canon = v => JSON.stringify(v, (k, x) => x && typeof x === 'object' && !Array.isArray(x) ? Object.fromEntries(Object.entries(x).sort(([a], [b]) => a.localeCompare(b))) : x)
const stubDeviations = []
async function ask(real, site, vars, o) {
  const r = await agent(dryRun ? stub(site, vars) : real, o)
  if (dryRun && r && canon(r) !== canon(JSON.parse(stubJson(site, vars)))) stubDeviations.push(o.label)
  return r
}

// ---------------------------------------------------------------- schemas
const PROTECT_SCHEMA = { type: 'object', properties: {
  spans: { type: 'array', items: { type: 'object', properties: {
    kind: { enum: ['quote', 'code', 'name', 'term', 'mention', 'rule'] },
    lineStart: { type: 'integer' }, lineEnd: { type: 'integer' },
    text: { type: 'string', description: 'exact text of the span, <=400 chars; machine-checked' } },
    required: ['kind', 'lineStart', 'text'] } },
  quotes: { type: 'array', items: { type: 'object', properties: {
    lineStart: { type: 'integer' }, quote: { type: 'string' }, attributedTo: { type: 'string' }, source: { type: 'string' },
    status: { enum: ['exact', 'mismatch', 'unreachable', 'no-source'] }, sourceText: { type: 'string' }, note: { type: 'string' } },
    required: ['lineStart', 'quote', 'status'] } },
}, required: ['spans', 'quotes'] }
const FINDING_PROPS = {
  lineStart: { type: 'integer' },
  lineEnd: { type: 'integer' },
  quote: { type: 'string', description: 'exact verbatim text from the file, <=400 chars; machine-checked' },
  pattern: { type: 'string' },
  strength: { enum: ['strong', 'weak'] },
  why: { type: 'string' },
  digestRefs: { type: 'array', items: { type: 'string' } },
  action: { enum: ['delete', 'rewrite', 'flag'] },
  fix: { type: 'string', description: 'one imperative sentence' },
  suggestedRewrite: { type: 'string' },
  confidence: { enum: ['high', 'medium', 'low'] },
}
const CLAIM_TYPES = ['command', 'behavior', 'version', 'project', 'third-party', 'public-fact', 'author-only']
const CLAIM_PROPS = {
  lineStart: { type: 'integer' },
  quote: { type: 'string', description: 'exact verbatim span of the file that makes the claim, <=400 chars; machine-checked' },
  claim: { type: 'string', description: 'the claim restated so it stands alone: name the thing instead of "it" or "this"' },
  type: { enum: CLAIM_TYPES },
  route: { type: 'string', description: 'where to check it: a path, a read-only command, a URL or a search to run; empty for author-only' },
  loadBearing: { type: 'boolean', description: 'true when a reader would act on it or the argument depends on it' },
}
const VERIFY_SCHEMA = { type: 'object', properties: {
  verdicts: { type: 'array', items: { type: 'object', properties: {
    id: { type: 'string' },
    verdict: { enum: ['holds', 'contradicted', 'stale-source', 'unverifiable'] },
    evidence: { type: 'string', description: 'verbatim quote from the source or trimmed command output' },
    evidenceRef: { type: 'string', description: 'path:line, the command run, or a URL' },
    correction: { type: 'string', description: 'what the claim should say per the source (contradicted only)' },
    mechanical: { type: 'boolean' } },
    required: ['id', 'verdict'] } },
}, required: ['verdicts'] }
const scoutSchema = withClaims => ({ type: 'object', properties: {
  findings: { type: 'array', items: { type: 'object', properties: FINDING_PROPS,
    required: ['lineStart', 'quote', 'pattern', 'strength', 'why', 'action', 'fix', 'confidence'] } },
  ...(withClaims ? { claims: { type: 'array', items: { type: 'object', properties: CLAIM_PROPS, required: ['lineStart', 'quote', 'claim', 'type'] } } } : {}),
  cleanNotes: { type: 'string' },
}, required: withClaims ? ['findings', 'claims', 'cleanNotes'] : ['findings', 'cleanNotes'] })

// ---------------------------------------------------------------- protect
phase('Protect')
const protectPrompt = fill(prompts.protect, {
  '{{TARGET}}': target.snapshot,
  '{{LINES}}': target.lines,
  '{{WEB_NOTE}}': config.noWeb ? 'Do not use the web; check only sources in local files, and mark web sources unreachable.' : 'Use Read/Grep for local sources and WebFetch for URLs.',
})
const protect = await ask(protectPrompt, 'protect', {}, opts('protect', 'protect', 'Protect', PROTECT_SCHEMA))
const spans = protect?.spans ?? []
const failedQuotes = (protect?.quotes ?? []).filter(q => q.status === 'mismatch')
const protectedList = spans.length
  ? spans.map(s => `- ${s.kind} @ ${s.lineStart}${s.lineEnd && s.lineEnd !== s.lineStart ? '-' + s.lineEnd : ''}: ${JSON.stringify(String(s.text).slice(0, 160))}`).join('\n')
    + (failedQuotes.length ? '\nQuotations that failed their source check (not protected): ' + failedQuotes.map(q => `line ${q.lineStart}`).join(', ') : '')
  : (protect ? 'None found.' : 'The protect pass failed; treat quotations, code, URLs, names and terms of art as protected yourself.')
log(`protect: ${spans.length} spans, ${(protect?.quotes ?? []).length} quotations checked, ${failedQuotes.length} mismatched${protect ? '' : ' (protect pass dead)'}`)

// ---------------------------------------------------------------- scout
phase('Scout')
function laneBrief(lane) {
  const fams = A.source === 'unknown' ? Object.keys(lane.byFamily ?? {}) : [A.source]
  const extra = Object.entries(lane.byFamily ?? {}).filter(([fam]) => fams.includes(fam)).map(([fam, text]) => `For ${fam}-written text: ${text}`)
  return [lane.brief, ...extra].join('\n\n')
}
const SOURCE_NOTE = {
  claude: 'a Claude model (weight the Claude notes).',
  openai: 'an OpenAI GPT model (weight the OpenAI notes).',
  gemini: 'a Google Gemini model (weight the Gemini notes).',
  unknown: 'unknown; it may be human-written or any model. Apply the cross-family patterns and treat family-specific notes as weaker evidence.',
}
const AUTHOR_NOTES = refs.authorNotes
  ? `## Author decisions (binding)\nThe author has settled these points. Do not report a finding that asks to undo one; a claim the author has decided to keep is still checked and recorded in \`claims\`, with the decision named in its evidence.\n${refs.authorNotes}`
  : ''
const truthList = (refs.truth ?? []).length
  ? `Sources of truth for this text${refs.truthDefaulted ? ' (the git repository that contains it)' : ''}: ${refs.truth.join(', ')}. Check claims about the system the text describes against these first, at their current state.`
  : 'No source of truth was given for the system this text describes. If you check claims against a repository or files you find, name them in each claim\'s `sourceRef`.'
function scoutPrompt(lane, chunk) {
  const scope = chunk
    ? `read lines ${chunk.start}-${chunk.end} ONLY (Read with offset/limit). Report findings only in those lines; you may read surrounding lines for context.`
    : `read the whole text; this lane works on document-wide rates, positions and consistency.`
  return fill(prompts.scout, {
    '{{LANE_KEY}}': lane.key,
    '{{LANE_TITLE}}': lane.title,
    '{{LANE_BRIEF}}': laneBrief(lane),
    '{{TARGET}}': target.snapshot,
    '{{SCOPE_NOTE}}': scope,
    '{{SOURCE_NOTE}}': SOURCE_NOTE[A.source] ?? SOURCE_NOTE.unknown,
    '{{SAMPLE_NOTE}}': refs.writerSample ? `A sample of the writer's own prose is at ${refs.writerSample}. Rates and register in it override the digest's defaults (R05): do not flag what the writer does in their own writing.` : '',
    '{{PROTECTED}}': protectedList,
    '{{DIGEST_PATH}}': refs.digestPath,
    '{{CLAIMS_NOTE}}': lane.key === 'claims'
      ? `Also return \`claims\`: every checkable claim in the text, one entry each, with its exact \`quote\`, a self-contained restatement, its \`type\`, a \`route\` (where it should be checked) and \`loadBearing\`. You extract and route; you do not verify. Fresh verifiers that never see this text check each claim, and their verdicts become findings. ${truthList}`
      : '',
    '{{AUTHOR_NOTES}}': AUTHOR_NOTES,
  })
}
const jobs = []
for (const lane of lanes) {
  if (lane.scope === 'document') jobs.push({ lane, chunk: null, key: lane.key })
  else for (const c of chunks) jobs.push({ lane, chunk: c, key: `${lane.key} @ ${c.start}-${c.end}` })
}
const results = await parallel(jobs.map(j => () => {
  const site = j.lane.key === 'claims' ? 'claims' : 'scout'
  return ask(dryRun ? '' : scoutPrompt(j.lane, j.chunk), 'scout',
    { '{{LANE}}': j.lane.key, '{{LINE}}': j.chunk?.start ?? 1 },
    opts(site, j.key, 'Scout', scoutSchema(j.lane.key === 'claims')))
}))
const deadScouts = jobs.filter((_, i) => !results[i]).map(j => j.key)

// ---------------------------------------------------------------- verify
// Factored verification: verifiers get the claims and their routes, never the text, so they cannot
// lean on the draft's own framing. Author-only claims are recorded and not sent.
phase('Verify')
const extracted = []
results.forEach((r, i) => { for (const c of r?.claims ?? []) {
  const key = String(c.claim ?? '').trim().toLowerCase()
  if (key && !extracted.some(e => e.key === key)) extracted.push({ ...c, key, job: jobs[i].key, id: `C${extracted.length + 1}` })
} })
const toVerify = extracted.filter(c => c.type !== 'author-only')
const BATCH = 12
const batches = []
for (let i = 0; i < toVerify.length; i += BATCH) batches.push(toVerify.slice(i, i + BATCH))
const verifyTruth = (refs.truth ?? []).length
  ? `Check claims about the system against: ${refs.truth.join(', ')}, at their current state (record the commit with \`git -C <repo> rev-parse --short HEAD\` when it is a repository).`
  : 'No repository or docs were named. Use the path, command or URL in each claim\'s route; if a claim needs a source that is not named and you cannot find one, answer unverifiable.'
const verifyPrompt = batch => fill(prompts.verify ?? '', {
  '{{TRUTH_NOTE}}': verifyTruth,
  '{{WEB_NOTE}}': config.noWeb ? 'Do not use the web: answer unverifiable for anything that needs it.' : 'Use WebSearch and WebFetch.',
  '{{CLAIMS}}': batch.map(c => `- ${c.id} [${c.type}] ${c.claim}${c.route ? `\n  route: ${c.route}` : ''}`).join('\n'),
})
const verified = await parallel(batches.map((b, i) => () => ask(dryRun ? '' : verifyPrompt(b), 'verify',
  { '{{ID}}': b[0].id }, opts('verify', `verify ${i + 1}`, 'Verify', VERIFY_SCHEMA))))
const deadVerifiers = batches.map((_, i) => i).filter(i => !verified[i]).map(i => `verify ${i + 1}`)
const verdictOf = new Map()
verified.forEach(v => { for (const x of v?.verdicts ?? []) verdictOf.set(x.id, x) })
const claimFindings = []
const claimsOut = extracted.map(c => {
  const v = c.type === 'author-only' ? null : verdictOf.get(c.id)
  let status = c.type === 'author-only' ? 'author-only' : (v?.verdict ?? 'unverifiable')
  const quoted = v && String(v.evidence ?? '').trim()
  if (status !== 'unverifiable' && status !== 'author-only' && !quoted) status = 'unverifiable'
  const out = { id: c.id, lineStart: c.lineStart, quote: c.quote, claim: c.claim, type: c.type, route: c.route ?? '', loadBearing: !!c.loadBearing,
    status, evidence: v?.evidence ?? (v ? '' : c.type === 'author-only' ? 'author-only: not checked' : 'no verifier verdict'),
    sourceRef: v?.evidenceRef ?? '', sourceTitle: v?.evidenceRef ?? '', correction: v?.correction ?? '', mechanical: !!v?.mechanical, job: c.job }
  const base = { lineStart: c.lineStart, lineEnd: c.lineStart, quote: c.quote, strength: 'strong', digestRefs: ['V02', 'V03'], confidence: 'high', lane: 'claims', job: `verify ${c.id}`, suggestedRewrite: '' }
  if (status === 'contradicted') claimFindings.push({ ...base, pattern: `contradicted claim (${c.type})`,
    why: `${c.claim} — the source says: ${String(v.evidence).slice(0, 300)} (${v.evidenceRef ?? 'no ref'}).`,
    action: v.mechanical ? 'rewrite' : 'flag',
    fix: v.mechanical ? `Correct it to what the source says: ${v.correction || 'see evidence'}.` : `Insert [AUTHOR: the source says otherwise (${v.evidenceRef ?? 'see report'}); confirm or correct] at the claim.` })
  else if (status === 'stale-source') claimFindings.push({ ...base, pattern: `stale source (${c.type})`, action: 'flag',
    why: `${c.claim} — the only evidence found is out of date or for another version: ${String(v.evidence).slice(0, 200)}`,
    fix: 'Insert [AUTHOR: verify against the current version] at the claim.' })
  else if (status === 'unverifiable' && c.loadBearing) claimFindings.push({ ...base, pattern: `unverifiable load-bearing claim (${c.type})`, action: 'flag', confidence: 'medium',
    why: `${c.claim} — the verifier found no evidence either way${c.route ? ` (route: ${c.route})` : ''}.`,
    fix: 'Insert [AUTHOR: verify — source needed] at the claim, or hedge it to what is known.' })
  return out
})
log(`verify: ${toVerify.length} claims in ${batches.length} batch(es) · ${extracted.length - toVerify.length} author-only · ${claimFindings.length} findings · ${deadVerifiers.length} dead`)
const findings = [...results.flatMap((r, i) => (r?.findings ?? []).map(f => ({ ...f, lane: jobs[i].lane.key, job: jobs[i].key }))), ...claimFindings]
const claims = claimsOut
const clean = results.map((r, i) => r && { job: jobs[i].key, n: r.findings?.length ?? 0, cleanNotes: r.cleanNotes }).filter(Boolean)
log(`scout: ${jobs.length - deadScouts.length}/${jobs.length} scouts returned · ${findings.length} raw findings · ${claims.length} claims checked`)
if (stubDeviations.length) log(`dryRun: ${stubDeviations.length} stub(s) did not return their canned JSON: ${stubDeviations.join(', ')}`)

return {
  engine: 'unclaude',
  dryRun,
  label: A.label ?? '',
  source: A.source,
  target,
  refs,
  protect: protect ?? null,
  findings,
  claims,
  clean,
  coverage: {
    scouts: jobs.length,
    deadScouts,
    verifiers: batches.length,
    deadVerifiers,
    protectDead: !protect,
    raw: findings.length,
    lanes: lanes.map(l => l.key),
    laneScopes: Object.fromEntries(lanes.map(l => [l.key, l.scope])),
    chunks: chunks.length,
    stubDeviations,
  },
}
