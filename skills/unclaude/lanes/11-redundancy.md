---
key: redundancy
title: Redundant exposition and meta-text
scope: passage
---
Digest entries: X18; keep K16.
Hunt:
- [weak] "[main clause], [gloss tail]" sentences where the tail restates the clause.
- [weak] Spelled-out subtext or over-explained themes.
- [weak] Re-explaining what the intended reader already knows.
- [strong] Writing about the document: "This section will explore…", "In this guide, we…", "As mentioned above".
- [strong] Repeating the prompt or the question.
- [weak] Section summaries that repeat the section; duplicate conclusions; recap closers (the shape lane owns the closer itself; report here when the content is a repeat).
- [strong] Edit-summary narration in commit, PR and changelog text ("ensured neutrality", "while preserving…").

Fix: delete and lead with the content. If in doubt, cut it.
Keep: abstracts, executive summaries and TL;DRs the genre requires (K16); definitions the intended reader needs; signposting in long documents written for scanning.

## claude
Opus 5 long deliverables carry filler sections and redundant summaries; weight them.

## openai
Cross-family; no specific weighting.

## gemini
Weight intro-body-summary repetition inside each section.
