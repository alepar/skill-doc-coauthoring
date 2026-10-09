---
key: lexical
title: Overused AI vocabulary
scope: passage
---
Digest entries: X01, X02, X03; keep K5, K6, K7, K8, K12.
Hunt:
- [strong when 2+ in one paragraph, else weak] Tier A rare high-ratio words: delve, showcasing, underscores, boasts (meaning "has"), tapestry, testament to, intricate/intricacies, meticulous, realm, pivotal, commendable, palpable, camaraderie.
- [weak] Tier B common-register words; report only with 2+ distinct hits in one paragraph: crucial, significant, comprehensive, enhance, additionally, notably, insights, valuable, vibrant, robust (figurative), landscape (abstract), foster, leverage, align with, garner, enduring, interplay, multifaceted.
- [weak] Copula substitutes: serves as, stands as, functions as, represents a, features a.
- [weak] Stiff synonyms: utilize, facilitate, commence, endeavor.
- [weak] Rotated speech verbs (notes, explains, observes, remarks) where "says" would repeat.
- [weak] Self-report words in commit, PR and changelog text: streamlined, enhanced, improved clarity, ensured.
- Weight hits in a document's first or last sentence, and sentence-initial Additionally/Notably/Moreover, more heavily.

Fix: fix clusters, not single words. Delete intensifiers; use the plainest verb (is, has, uses, shows, says); restore copulas; replace an evaluative adjective with the fact that would justify it, or drop it. Never swap in a same-register synonym (delve → "dig into" is not a fix). Repeated "said" is fine.

## claude
Weight: quietly (implying an unnoticed change), load-bearing (figurative), deliberate/measured/steady, steelman, tradeoffs, "can help you", "is especially helpful", "single most". Sincerity words (genuinely, honestly) belong to the stance lane. The 2023 GPT-4 list (delve, tapestry) is near-random on Claude text; do not lean on it.

## openai
Weight: certainly, overall, "it's worth noting", importantly, foster, leverage, delve; the classic delve/tapestry list for GPT-4/4o-era text.

## gemini
Weight (low-confidence evidence): incredibly, absolutely, furthermore, additionally, "this comprehensive guide".
