# Doc types: core sections, section purposes, checks

Use this to propose outlines in Stage 2 and to run each section's gap check. The core sections are defaults; drop any section that would only be ceremony for this document, and keep the ones whose questions reviewers will ask anyway. Evidence and sources: `research/doc-coauthoring/dossiers/d2-doc-types-and-templates.md` in this repo.

## Core sections by type

| Doc type | Default sections | Type-specific checks | Typical length |
|---|---|---|---|
| Design doc / RFC | Status header; Objective (one sentence); Background; Goals / Non-goals; Proposal (overview, then details); Alternatives (including do nothing); Risks and drawbacks; Open issues; Abandoned ideas (optional) | Trade-offs explicit, not an implementation manual; non-goals plausible; alternatives real and at the same level of abstraction; drawbacks honest; background passes the other-team-engineer test; readable by someone who stops after any section; inherited constraints separated from the author's choices | Background a paragraph or two; the whole doc as short as the decision allows; a mini design doc is 1-3 pages |
| PRD | Summary (written last); Problem; User research; Personas or use cases; Requirements, each with considerations; Acceptance criteria; Success metrics; Non-goals | Grounded in real user problems; every acceptance criterion checkable by someone outside the team; considerations phrased as questions, not solutions; success definition clear | As short as the requirements allow |
| ADR | Title; Status; Context (the forces, stated neutrally); Considered options; Decision; Consequences (good, bad, neutral); Confirmation (optional) | One decision; context value-neutral; negative consequences listed; no pseudo-alternatives; a future developer can tell why this option won | 1-2 pages |
| Postmortem | Summary; Impact (quantified); Timeline; Root causes and trigger; Detection and response; What went well, poorly, and where we got lucky; Action items (owner, priority, verifiable end state); Glossary; Links to raw data | Blameless; no dramatic language; data a reader can verify; no vague action verbs ("improve", "look into"); context for readers outside the team | As long as the incident needs; summary readable alone |
| Decision / action memo | Issue and recommendation up front (or problem first, see below); Background; Options (all the serious ones, no clutter); Analysis; Recommendation with the author's preference disclosed; Next steps | No sandwiching of the preferred option between weak ones; preference disclosed; space proportional to importance | 1-2 pages |
| Amazon narrative / PR-FAQ | Press release (headline, problem, solution, quote, call to action); External FAQ; Internal FAQ; Tenets (optional) | Narrative prose, not bullets; FAQ anticipates every affected team, optimistic but realistic; each tenet has a reasonable opposite | Press release under 1 page; FAQ 5 pages or less; narratives 6 pages |
| User docs (Diátaxis) | Exactly one of: tutorial, how-to guide, reference, explanation | One mode per page; scope and non-scope stated; no promises about future features | Whatever the task needs |

**Mini-doc** (for reversible or small decisions): Problem; Decision; Alternatives; Risks; Open questions. One page.

## Status header

Every scaffold starts with: author(s); date; state (draft, in review, approved, abandoned, implemented); the kind of feedback wanted and from whom; review deadline if there is one. Readers should be able to tell at a glance whether and how to respond.

## What each section has to do

A heading is not a section. These are the jobs reviewers check for; use them as the Stage 2 gap check.

- **Summary / objective.** Answers the reader's essential questions on its own, so a reader can stop there. Written last, placed first.
- **Background.** Gives a capable engineer from another team nearly full context on why this document exists. Usually one or two paragraphs; it is not a history of everything.
- **Goals and non-goals.** Goals are outcomes, not features. Non-goals are things that could reasonably be goals and were deliberately excluded ("the system shouldn't crash" is not a non-goal). State non-scope too: topics the audience might expect the document to cover that it does not.
- **Proposal.** Overview first, then details. Explains the trade-offs it makes and why, rather than reading as an implementation manual.
- **Alternatives.** Real options that solve the same problem at the same level of abstraction, including "do nothing" and its consequences. Each says why it was not chosen. The preferred option is not propped up by straw alternatives, and its author's preference is disclosed.
- **Risks and drawbacks.** Honest. Proposals that are disingenuous about drawbacks are received worst of all.
- **Open issues.** Each names the problem, the options for resolving it, and the immediate next step. Disputes that do not resolve in review land here rather than in endless comment threads.
- **Abandoned ideas.** Kept and labelled as abandoned, with the reason, so reviewers do not re-propose them.
- **Action items** (postmortems, memos). Each has an owner, a priority, and an end state someone can verify.

## Order

- Most documents lead with the point, so a reader who stops early still gets it, and each later section builds only on what came before.
- Decision and persuasive documents that will meet resistance often need the problem and its stakes stated before the recommendation; a bottom line with no context reads as a conclusion in search of a reason.
- Space should be proportional to importance: equally important issues get equal space, more important ones more.

## User docs: Diátaxis

If the document is user-facing, ask which mode it is: a tutorial (learning by doing), a how-to guide (accomplishing a task), reference (looking something up), or explanation (understanding). Flag pages that blend modes, such as a how-to that stops to explain theory; split them or link out. Treat the four modes as a lens, not a strict rule.
