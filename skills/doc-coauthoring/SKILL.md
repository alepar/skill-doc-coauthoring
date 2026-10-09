---
name: doc-coauthoring
description: Guide the user through co-authoring a document — design doc, RFC, PRD, ADR, postmortem, decision memo, proposal, spec or user documentation — from context gathering through section-by-section drafting to testing the doc on a fresh reader. Use when the user wants to write, draft or substantially rework such a document. Not for quick edits to a finished doc or for one-paragraph messages.
---

# Doc Co-Authoring Workflow

Guide the user through three stages: **Context Gathering**, **Refinement & Structure**, and **Reader Testing**. Be an active guide: ask, propose, draft and test, while the user owns the decisions and the position the document takes.

The division of labour matters. When a model originates a document's framing and options, drafts converge, the author's stated views drift toward the model's without their noticing, and their sense of ownership drops. Drafting help itself is valuable. So throughout: **the author supplies the position, the options they already hold and the decisions; Claude interviews, structures, drafts from what the author supplied, and points out every specific it introduced.**

## Offering the workflow

Offer it when the user starts a substantial document. Name the three stages in a sentence each and ask whether they want the workflow or prefer to work freeform. If they decline, work freeform.

The user can answer any question in shorthand ("1: yes, 2: see #infra-channel, 3: no, backwards compat"), paste raw material, or point at files, links or channels. Restate this at the start of each stage and section; it is easy to forget in a long session.

## Stage 1: Context Gathering

**Goal:** close the gap between what the user knows and what Claude knows, and agree in writing what document this is before any structure exists.

### Opening questions

1. What kind of document is this (design doc, RFC, PRD, ADR, postmortem, decision memo, PR/FAQ, user docs, other)?
2. Who reads it, what do they already know, what are they trying to do, and what should they know or be able to do afterwards? A useful form: "I'm writing this so that ___ can ___."
3. Is there a template, required format, or an existing doc to start from?
4. Optional: is there a style guide, glossary or term list, or an existing doc whose tone this should match? If the user has none, skip it.
5. Any constraints: deadline, length, reviewers, politics?
6. What does the document describe that its claims can be checked against: a repository, the project's docs, data, other teams' systems? Where is the current version of each? These are the sources of truth for the claim check in Stage 3.

If the user points to a template, an existing doc or a link, read it with whatever tool or integration is available; if none can reach it, ask them to paste it. If they provide style material, note its tone and terminology for drafting.

**Editing an existing doc:** read its current state from its source, not from a copy someone pasted or fetched earlier: the latest revision in version control (fetch first), or the live shared doc. Note the revision you started from, and check again before Final Review that it has not moved; if it has, merge the changes in before testing. Check images for missing alt text; readers increasingly paste docs into an assistant that cannot see the images. Offer to draft alt text from the images the user pastes.

### Info dump

Ask for everything relevant, unorganized: background, the problem, prior discussions, why the obvious alternatives are not being used, organizational context, timeline, architecture and dependencies, stakeholder concerns. If integrations (chat, drive, wiki) are available, offer to read the threads and documents the user names; ask before searching for things they did not point to. Track what is known and what is still unclear.

### Clarifying questions

When the user signals the dump is done, ask numbered questions about the gaps: as many as the gaps need, typically 5-10. Ask concrete questions (facts, numbers, incidents, examples) before abstract "why" questions; concrete answers are easier to give and harder to fake.

### The brief

Before moving on, write back a brief of 5-8 lines and ask the user to correct it:

- **Purpose:** what the reader should know or do after reading.
- **Main point:** the provisional one-sentence point or recommendation.
- **Audience:** who, and what they already know.
- **Doc type:** from `references/doc-types.md`.
- **Scope / non-scope:** what it covers, and what readers might expect it to cover but it deliberately does not.
- **Constraints:** length, deadline, required sections, reviewers.
- **Sources of truth:** what the claims will be checked against, with where the current version lives.

Mark each item *stated* (the user said it) or *assumed* (Claude inferred it), so the user can see where Claude is guessing. The brief is what later stages curate, cut and test against.

**Size the document.** Ask two questions: what is the penalty if this decision turns out wrong, and would doing the work take less time than writing about it? If the decision is cheap to reverse, propose a one-page mini-doc (problem, decision, alternatives, risks, open questions) instead of the full template. If the document is not needed at all, say so.

**Exit:** the user has confirmed the brief, and Claude can ask about edge cases and trade-offs without needing the basics explained.

## Stage 2: Refinement & Structure

**Goal:** build the document section by section, with the author's content first and every section doing its job.

### Structure

Use the doc-type map in `references/doc-types.md`. Offer two or three candidate outlines, the recommended one first with its trade-off in a sentence, and let the user drop sections that would only be ceremony. For decision documents, state the problem before the recommendation; for most other documents, lead with the point.

Create the document file once the outline is agreed: all headings, a status header (author, date, state such as draft / in review / approved, and the kind of feedback wanted), and a short placeholder under each heading. Use a Markdown file in the working directory unless the user names another place (a shared doc via an integration, or an artifact in hosts that have them). From here on, edit sections in place; never reprint the whole document in chat.

Start with the section that has the most unknowns, usually the core proposal or decision. Write the summary last, though it sits first in the document: it must answer the reader's essential questions on its own.

### For each section

Restate the shorthand convention, then:

1. **Clarifying questions.** Ask what this section needs, concrete questions first.
2. **Author first.** Ask what the user already thinks belongs here, and list their items first.
3. **Brainstorm.** Add Claude's own candidates, marked as new, deliberately varied in stance and angle rather than variations on the user's: enough to cover the distinct angles, typically 5-10. Include context the user shared earlier and may have forgotten. Keep the list in the conversation, not in the document.
4. **Curate.** The user keeps, removes or combines items ("keep 1,4,7; drop 3, duplicates 1; combine 5 and 6"). Ask for a short reason on removals; reasons teach their priorities for later sections. If they answer freeform, extract the choices and continue.
5. **The author's position.** For the core proposal, decision or recommendation, ask the user to state the position and its main reason in one to three sentences of their own before drafting. Draft from their words.
6. **Gap check.** Check the section against its purpose in `references/doc-types.md`: non-goals are things that could plausibly be goals; "do nothing" is among the alternatives; alternatives are real options at the same level of abstraction, with the preferred one not sandwiched between weak ones; drawbacks are stated honestly; each open issue has options and a next step; the background lets an engineer from another team understand why this document exists.
7. **Draft.** Replace the placeholder with the section (see Drafting rules). Then list, under the draft in chat, every specific Claude introduced that the user did not supply: numbers, names, dates, system behaviour, claims about other teams. The user confirms or cuts each.
8. **Refine.** Apply the user's feedback as targeted edits. When drafting the first section, ask the user to tell Claude what to change rather than editing the file themselves, because the explanations teach their style. If they do edit directly, read the file and carry their changes forward as preferences.

When a section has gone three rounds with no substantial change, ask whether anything can be cut without losing information. Then confirm the section is done and move on.

### Drafting rules

- **Grounding.** Draft only from facts in the conversation and the material the user supplied. When a sentence needs a reason, number or decision that nothing supplies, ask; do not write plausible filler. A draft that cannot be written without inventing something has found a gap in the author's thinking, which is worth more than the sentence.
- **Prose for reasoning, lists for parallel items.** Write reasoning, trade-offs and rationale as connected prose that says how ideas relate. Use bullets for genuinely parallel items, numbered lists for sequences, tables for comparisons. Do not carry the numbered brainstorm list into the document as bullets.
- **Numbers at honest precision.** Round estimates and projections to what their uncertainty supports, usually two significant figures, and give a range or "~" when the figure is rough. Match precision to the reader: a strategy document does not need cents. Keep exact values exact where exactness matters (IDs, config values, contract amounts, measured results with their method).
- **Length.** Aim for the length the doc type calls for in `references/doc-types.md`; put depth in appendices so the main text stays readable.
- **Terms.** Keep a running term sheet of accepted and rejected terms and defined acronyms; define each term on first use and use it the same way everywhere.
- **Quotes.** Mark verbatim text from source material as a quotation, with its source.
- **Inclusive, portable writing.** Link text that makes sense out of context; phrasing a global audience and machine translation handle well (no idioms or culture-bound references the reader must decode); bias-free language.

### Revision passes

When all sections are drafted, run the ordered passes in `references/review-passes.md`: structural, stylistic, then a yes/no checklist, then a regression check on the fixes. These are polish passes run by the same conversation that wrote the draft, which is the least reliable reviewer of it; they tidy the document but do not validate it. Each finding quotes the sentence and names the problem.

For the AI-prose part of the stylistic pass, if the `unclaude` skill is available, offer to run it on the draft: it scans for AI-sounding patterns, false precision and unsupported claims and fixes them with a fresh reviewer. Otherwise use the cause-level checks in `references/review-passes.md`.

Then ask whether the user is ready for Reader Testing.

## Stage 3: Reader Testing

**Goal:** make sure every claim in the document holds against its source, then find out whether the intended reader can state the document's point correctly and find and act on what they need.

Asking a reader whether a document is clear does not work: readers say yes and then act on it wrongly. Paraphrase and scenario tasks graded against what the author intended do work. A fresh Claude is the first and cheapest reader. It catches missing context and contradictions, but it infers far better than a human reader, so passing its test is a floor, not proof that people will understand the document.

**Claim check first** (`references/claim-check.md`). A reader test on wrong facts tests the wrong document, and a model reader will not notice a wrong flag name or a version that no longer ships. In outline:

1. **Extract** every checkable claim as a self-contained line with its location: commands, flags, defaults, behaviour, versions, names, paths, numbers, quotes, public facts. Rationale, opinions and plans are *author-only*.
2. **Route** each claim to the source that owns it: executed `--help` or the repo's docs tests for commands, the code at the current revision for behaviour, manifests for versions, version-pinned upstream docs for third-party tools, primary sources for public facts, the user's material for the rest. Note the revision of each source, and that it is current.
3. **Verify** in fresh subagents that see the claims and their routes but not the draft, the brief or this conversation. Each verdict (holds, contradicted, stale-source, unverifiable) quotes its evidence; without a quote it counts as unverifiable.
4. **Act.** Fix mechanical contradictions (a flag, a version, a path) and tell the user; take contradictions about meaning, code-versus-docs mismatches, and stale, unverifiable and author-only claims to the user. Specifics Claude introduced that do not hold are cut.

Then the reader tests (`references/reader-testing.md`):

1. **Answer key (with the user).** From the brief, write the one-sentence point, the 1-3 decisions or actions the document should produce, 3-6 reader scenarios with expected answers, and 2-3 likely misreadings. The user confirms or corrects the key; it encodes their intent, which the document must transmit.
2. **Cold paraphrase.** A fresh reader restates the document's ask, decision and next step in its own words, plus one sentence per section. Compare with the key.
3. **Scenario tasks.** For each scenario, a fresh reader answers using only the document, quotes the passage it relied on, says "Not stated in the document" when nothing supports an answer, and lists anything it had to supply from its own knowledge. A wrong answer, a "not stated", or a right answer that rests on supplied knowledge each marks a gap.
4. **Fix and retest.** Fix misreadings in the document, not in chat; move anything still disputed after two or three exchanges to Open Issues. Retest the changed parts with new readers, never the ones that read the earlier version. Re-run the claim check on any passage a fix changed. Stop when the paraphrase matches the key, all scenarios pass, and the claim check has nothing open, or after two retest rounds with the residual issues reported to the user.

**Isolation.** Each reader is a fresh subagent that is not a fork of this conversation. Give it the document text (or its path) and its role, nothing else: not the brief, not Claude's intent, and never a hint that the user wrote or likes the document, which makes model readers softer.

**Without subagents** (for example in a chat interface), the user opens a fresh conversation, pastes the document with the paraphrase and scenario prompts from `references/reader-testing.md`, and pastes the answers back; Claude grades them against the key. A fresh chat is still a more capable reader than a human.

**Scale to stakes.** For a short, low-stakes document, one verifier for all claims, the paraphrase and two or three scenarios are enough. For user-facing docs with commands people will copy, run every command example (or the repo's docs tests).

## Final review

When reader testing passes:

1. Ask the user to read the whole document once more themselves. They own it, and they are its last line of verification.
2. Point them to what most needs their check: the specifics Claude introduced, and every claim the claim check left unverifiable, stale or author-only.
3. Ask whether it achieves the purpose in the brief.

Closing tips, if useful: put depth in appendices rather than the main text, and update the document as real readers respond.

## Guidance

- Be direct and procedural. Explain the reason for a step briefly when it changes what the user does; do not sell the workflow.
- The user can skip or reorder any stage. If they want to move faster, say which steps can be dropped for their stakes.
- Ask about missing context as soon as it shows up rather than letting gaps accumulate.
