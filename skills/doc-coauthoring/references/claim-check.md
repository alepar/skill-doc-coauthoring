# Claim check

Part of Stage 3, run before the reader tests: a reader test on wrong facts tests the wrong document. The aim is that every checkable claim in the document has been compared with the source that owns it, and everything else is visibly the author's call. Evidence and sources: `research/claim-verification/report.md` in this repo.

Why this shape:
- A verifier that can see the draft, or the conversation that wrote it, tends to repeat the draft's errors. Plausible, familiar text gets waved through, and a model grades its own writing generously. So verification runs in fresh subagents that see the claims and where to check them, not the draft.
- "Not supported" hides two different results. A *contradicted* claim means the draft is wrong; an *unverifiable* one means nobody could check it. The first is fixed, the second goes to the author.
- Execution beats reading, and reading the code beats reading about it. A command example is checked by running it (safely); a statement about behaviour is checked against the code that implements it, at the current revision.

## Inputs

- The document, with line numbers.
- The sources of truth the user named in Stage 1, or that the document describes: a repository (record `git rev-parse HEAD` and `git status`), the project's own docs, pinned versions (lockfile, `--version`), upstream docs, the material the user supplied.
- Whether each source is current. A fetched or pasted copy is not the source; fetch the latest revision and compare (see Stage 1, *Editing an existing doc*).

## Step 1: Extract (main conversation)

List every checkable claim as one line each, self-contained (no "it" or "this": name the thing), with its line number:

- commands, flags, defaults, exit codes, output samples;
- behaviour of the system the document describes ("retries three times", "the hook finds the seat");
- versions, compatibility, platforms, dependencies;
- names, files, paths, owners, dates;
- numbers, quotes, comparisons, public facts;
- statements about other teams or systems.

Skip what is not checkable: the author's rationale, opinions, recommendations, plans and intent. Mark those *author-only*; they are the author's to stand behind. If a sentence can be read two ways, ask the author which they meant before checking it.

## Step 2: Route

Give each claim the source that owns it:

| Claim type | Check against | Fallback | If sources disagree |
|---|---|---|---|
| Command, flag, default, exit code, output | The repo's docs tests if it has them (doctest, rustdoc, trycmd, cram, mdbook test); else run `--help`, `--version` or a dry run | The argument parser at the current revision | Executed output over code over docs. Never run anything destructive or anything that touches shared state; read the code instead. |
| Behaviour of the code | The code path at the current revision (file:line) | Tests that exercise it | Code over the project's docs; report the mismatch, since either may be the bug |
| Version, platform, compatibility | Manifest, lockfile, `--version`, tags | Release notes | Repo metadata over README text |
| Files, architecture, owners | The repo tree and docs at the current revision | `git log` | Current revision over any copy |
| Third-party tool or library | Its docs for the version in use | Its source at that tag | Version-pinned docs over `latest` over blog posts |
| Numbers, quotes, public facts, comparisons | Primary sources found by search; open each citation | A second independent source | Primary over secondary |
| Material the user supplied (notes, threads, data) | That material | — | Ask the user |
| Decisions, intent, plans | — | — | author-only |

## Step 3: Verify (fresh subagents)

Hand the routed claims to one or more fresh subagents (not forks), a batch of 10-20 claims each. Give each one only the claims, their routes, and the paths or URLs of the sources. Never give it the draft, the brief or the conversation, and say nothing about who wrote the claims. Prompt:

> Check each claim below against the source named for it, using your tools: run the docs tests or the read-only commands named (never anything destructive), read the code at the paths given, fetch the URLs. For each claim return: verdict (holds, contradicted, stale-source, unverifiable), the evidence quoted verbatim (file:line at the commit given, the command and its trimmed output, or a URL with the quoted passage), and for a contradicted claim, what the source says instead. If you cannot find evidence, answer unverifiable; do not guess.
>
> [claims with routes]

Verdicts:
- **holds:** the source says so; evidence quoted.
- **contradicted:** the source says otherwise; evidence quoted, plus what it says.
- **stale-source:** the only evidence is out of date or for another version.
- **unverifiable:** checked, nothing found. Not an error, but the author must answer for it.
- **author-only:** from Step 1; not sent to the verifier.

A *holds* without quoted evidence is treated as unverifiable.

## Step 4: Act

- **Contradicted, mechanical** (a flag name, a default, a version, a path): fix it to what the source says and tell the user.
- **Contradicted, about meaning or behaviour:** show the user the claim and the evidence. Where code and docs disagree, either may be wrong; the user decides.
- **Stale-source, unverifiable, author-only:** list them for the user to confirm, source or cut. Do not settle them with Claude's own judgement.
- Claims Claude introduced while drafting (the list from each section's draft step) get no benefit of the doubt: if they are not *holds*, they go.

Report to the user as a ledger: line, claim, type, verdict, evidence, action.

## References

Cite in the document only what a reader cannot check from the thing the document describes: numbers, quotes, comparisons, third-party behaviour. Those citations come from *holds* evidence on external sources (URLs, DOIs). A project's own README or design doc does not cite its own repository; that evidence stays in the ledger.

## Scale to stakes

- Short or low-stakes document: one verifier subagent for all claims; skip the web for public facts nobody will act on.
- Document that drives a decision, or user-facing docs with commands people will copy: every claim routed and verified, every command example run (or checked by the repo's docs tests).

## Without subagents

Ask the user to open a fresh conversation with the tools it needs, paste the claims and routes (not the document) with the Step 3 prompt, and paste the results back.
