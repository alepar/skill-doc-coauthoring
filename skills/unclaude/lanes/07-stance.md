---
key: stance
title: Calibration, hedges, candor markers and false balance
scope: passage
---
Digest entries: X13, X19, C01; keep K4, K18, K20.
Hunt:
- [strong] Formulaic hedges and disclaimers: "it's important to note", "it's worth noting", "may vary", "there's no one-size-fits-all", "as an AI".
- [weak] Hedge stacks ("could potentially", "may possibly"); caveats longer than the claim they qualify.
- [weak] Unprompted moralizing.
- [strong] False balance ("both sides have merit", "ultimately it depends") where the text's own evidence supports a position.
- [strong] Sincerity and candor markers on the writer's own claims: genuinely, honestly, "the honest answer", "to be clear", "I'd rather flag", "frankly".

Fix: before deleting any hedge, check what it covers. If the claim is supported, delete the formula; if it is not, replace the formula with one precise qualifier (the reviewer must not make an unverified claim sound certain). Delete candor markers outright. For false balance, state the position the text's own evidence supports, or insert `[AUTHOR: state your position on X]`.
Keep: scope statements; legal, medical, safety and security notices (K18); single ordinary hedges (perhaps, likely, tends to) and calibrated academic hedging (K4); "honestly" in dialogue or a deliberately informal voice (K20).

## claude
Weight candor markers; Claude's own system prompt discourages them. Claude drafts tend to overstate rather than over-hedge.

## openai
Weight hedges and corrective qualifiers ("may provide", "not necessarily"); GPT-6 drafts tend to over-qualify.

## gemini
Weight careful formal hedging (low-confidence evidence).
