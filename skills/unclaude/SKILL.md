---
name: unclaude
description: Use when the user wants a text de-AI'd — prose that reads as LLM-written, or a doc to check for AI tells, false precision in numbers, misquoted sources or unsupported claims — and fixed in place. Takes a file. Not for code review, and not for detecting whether a human or a model wrote something.
---

# unclaude

Scans one text for the patterns that make prose read as machine-written, plus false precision in numbers and claims or quotations that do not hold, then fixes them. A Workflow runs a protect pass, lane scouts, and fresh verifiers that check every extracted claim against its source without seeing the text; a script merges the findings into one report; a single fresh reviewer agent works through the report and edits the text; a guard agent checks the reviewer's edits for known regressions.

Invoking this skill is the user's request to run its Workflow.

## Inputs to settle with the user

- **Target:** one text file (Markdown or plain text). For text that is not in a file yet, write it to a file in the scratch directory first.
- **Who wrote it:** `--source claude` (default), `openai`, `gemini` or `unknown`. Tells drift by model family; ask if the conversation does not make it evident.
- **Author decisions:** anything the author has settled that a scout or the reviewer could otherwise undo: a claim deliberately made ahead of a merge, framing they chose, "no References section". Write them to a short file and pass `--author-notes <file>`; every scout, the reviewer and the guard are bound by it. Do not smuggle decisions in through other options.
- **Sources of truth:** what the text's claims should be checked against. `--truth <path,...>` names repositories, docs or files; by default it is the git repository that contains the target. When the target is a copy (a scratch file, a fetched README), pass the real repository, at the revision the text should describe; check that copy is current first.
- **Options (optional):** `--writer-sample <file>` (a sample of the author's own prose; its dash rate, contractions and register override the defaults), `--lanes` / `--skip-lanes`, `--no-web` (no fetching for quotation and claim checks), `--label`. `bash scripts/prepare --help` lists everything.
- **Report only?** By default the reviewer edits the target in place. If the user wants only the report, stop after step 3.

## Run

1. Build the run in a scratch directory:
   `bash <skill-dir>/scripts/prepare --target <file> --source <family> --out-dir <scratch>/unclaude-<label>`
   It snapshots the target to `<out-dir>/original.<ext>` and prints the chunk count, lanes and agent count. Tell the user the agent count before launching a long document.
2. Launch: `Workflow({ scriptPath: "<out-dir>/run.js" })`. The args are embedded in the script, so pass no `args`.
3. When the completion notification arrives, take its `output-file` path:
   `bash <skill-dir>/scripts/finalize --result <output-file> --out <out-dir>/report.md`
   It writes `report.md`, `findings.json`, and the filled prompts `reviewer-prompt.md` and `guard-prompt.md`. If nothing is left to act on, tell the user and stop.
4. **Reviewer.** Spawn one fresh subagent (general-purpose, not a fork; it must not see this conversation) whose prompt is: "Read your instructions from `<out-dir>/reviewer-prompt.md` and follow them exactly; return only the JSON it specifies." Save its returned JSON to `<out-dir>/review-log.json`. If it skipped findings wholesale or returned no log, say so instead of continuing silently.
5. **Guard.** Write the diff: `git diff --no-index <out-dir>/original.<ext> <target> > <out-dir>/review.diff`. Spawn a second fresh subagent the same way with `<out-dir>/guard-prompt.md`. Save its JSON to `<out-dir>/guard-log.json`.
6. Tell the user:
   - how many findings were applied, skipped and flagged, and what the guard reverted;
   - the `[AUTHOR: …]` notes now in the text, since each needs their input (missing sources, number precision, positions);
   - quotation mismatches and contradicted claims, which change meaning rather than style, including contradicted claims the author decided to keep (they stay in the report as a reminder);
   - where the report, logs and the original snapshot are, so they can diff or roll back.

If a script prints `NODE_UNAVAILABLE:`, tell the user that node 22 or later is required.

## Lanes

Thirteen scout lanes in `lanes/`. Passage lanes run once per chunk of about 80 lines; document lanes read the whole text because their patterns are rates, positions or consistency.

| Lane | Scope | Hunts |
|---|---|---|
| lexical | passage | overused AI vocabulary, copula substitutes, stiff synonyms |
| contrast | passage | "not X but Y" frames, throat-clearing pivots, colon reveals |
| syntax | passage | -ing riders, nominalizations, empty triads, and-chains |
| rhythm | document | em-dash rate, semicolon cadence, uniform or staccato sentences |
| shape | document | bold-label bullets, generic headings, summary closers, portable intros |
| significance | passage | inflated significance, puffery, superlatives, grand endings |
| stance | passage | formulaic hedges, candor markers, false balance |
| residue | document | chatbot openers and closers, offers, placeholders, sycophancy |
| figurative | passage | metaphor for literal statement, clichés, stock imagery |
| generic | passage | vague over specific, templated names and scenes |
| redundancy | passage | restating, meta-text about the document, duplicate summaries |
| claims | document | extracts and routes every checkable claim for the verifiers; weasel attribution, gap-filling |
| precision | document | false precision, precision beyond the audience, missing ranges |

**Claim verification.** The claims lane extracts each checkable claim as a self-contained statement with a type and a route (a path, a read-only command, a URL). Verifiers, one per 12 claims, get only the claims, routes and sources of truth, never the text, and return holds, contradicted, stale-source or unverifiable with quoted evidence. A contradicted claim becomes a finding (a mechanical correction such as a wrong flag is applied, even inside a code span; one about meaning is flagged for the author), and so does a stale or unverifiable load-bearing one. Author-only claims (rationale, plans, intent) are listed, not checked. Only external sources that hold become References.

Each hunt item is `[strong]` (a finding on one sighting) or `[weak]` (acted on only alongside another finding in the same paragraph, or when a document-scope lane reports it, since those lanes apply their own rate thresholds). Single weak hits are listed in the report but not acted on; humans use those words too.

## What is where

- `engine/unclaude.js`: the Workflow script (protect → scouts → verify). It returns raw findings and claim verdicts; it does no judging of style.
- `scripts/finalize.mjs`: verifies every quote against the snapshot, drops findings inside protected spans, merges duplicates, applies the weak-hit cluster rule, numbers findings in document order and renders the report.
- `prompts/`: protect, scout, verify, reviewer and guard templates.
- `reference/digest.md`: the pattern entries lanes cite (X cross-family, C Claude, O OpenAI, G Gemini, V verification, N numbers), the reviewer rules R01–R11, and the keep list of things never to flag. Built from `research/unclaude/report.md` in this repo.

## Dry run

`prepare --dry-run` swaps every agent for a haiku stub returning canned JSON, to check the pipeline after editing lanes, prompts or the engine. `node tests/mock-engine.mjs` in the repo covers the merge, suppression and cluster logic without any agents.
