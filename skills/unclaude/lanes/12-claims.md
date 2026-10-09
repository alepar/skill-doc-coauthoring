---
key: claims
title: Claims, attribution and sourcing
scope: document
---
Digest entries: X12, X21, V02, V03; keep K19.
This lane does two jobs. It extracts every checkable claim for the verifiers, and it hunts the vague-attribution patterns that hide unsupported claims.

**Extract** (returned in `claims`; fresh verifiers that never see the text check each one, and their verdicts become findings, so do not verify claims yourself):
- One entry per checkable claim: commands, flags, defaults, output; behavior of the system the text describes; versions, platforms, compatibility; names, files, paths, owners, dates; numbers, quotes, comparisons, public facts; statements about other teams or systems.
- `quote`: the exact span. `claim`: the claim restated so it stands alone ("`foo sync --dry-run` prints the plan without writing", not "it supports a dry run").
- `type`: command, behavior, version, project (files, architecture, owners), third-party, public-fact, or author-only (rationale, opinion, recommendation, plan, intent: the author's to stand behind; not verified).
- `route`: where the claim should be checked, as specifically as you can: a path in the sources of truth, a read-only command (`tool --help`), a URL, or a search to run. You may Read and Grep to find the right path; do not judge the claim.
- `loadBearing`: true when a reader would act on it or the argument depends on it.
- Skip common knowledge the intended reader shares, and sentences with nothing checkable. If a sentence can be read two ways, extract the reading the text most plausibly means and say so in `claim`.

Hunt (returned as findings):
- [strong] Weasel attribution: "experts say", "observers note", "studies show", "many believe" with no named source; a plural attribution backed by one citation.
- [strong] Availability hedges followed by a guess: "not widely documented", "limited information is available", "maintains a low profile", then a plausible-sounding claim.
- [strong] A claim contradicted by another passage of the same document (cite both lines).
- [weak] Vague relations: "associated with", "linked to", "in connection with" where a specific relation is expected.
- [weak] Analysis riders attached to a named source ("X said…, highlighting the need for…") that put words in the source's mouth.
- [weak] Unmarked verbatim reuse of source text.

Fix: name the source of a vague attribution or cut the attribution; state a relation only if the source states it; for an internal contradiction, flag both lines for the author. Never invent a source, person, number or relation (R01).
Keep: specific, sourced claims and attributions (K19); common knowledge the intended reader shares.
