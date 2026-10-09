---
key: precision
title: False precision and number presentation
scope: document
---
Digest entries: N01, N02, N03, N04, N05; keep K23, K24.
Read every number in the text, then judge each one by two questions: how precisely is this quantity actually known, and how much precision does this reader need for the decision the text supports?
Hunt:
- [strong] Estimates, projections, forecasts and modelled figures stated to more significant digits than their uncertainty supports: "$1,234,567 in projected savings", "37.4% faster" from a handful of runs, "reduces churn by 12.73%", "a 2.847× improvement" from a rough benchmark.
- [strong] Precision beyond what the audience can use: cents in a strategy or executive document, exact headcounts where "about 40" decides nothing differently, latencies to the microsecond in a product overview.
- [strong] A point estimate where the source gave, or the method implies, a range or interval; a range or confidence interval dropped when the number was carried over.
- [weak] The same quantity at different precision in different places (12.4% in one section, 12% in another, "about an eighth" in a third).
- [weak] Derived numbers with more digits than their inputs (a percentage computed from two rough counts and reported to two decimals); sums of rounded numbers presented as exact.
- [weak] Ratios and percentages with no base ("doubled", "40% of users") where the base matters to the claim.
- [weak] Unrounded numbers in a table meant for comparison; Ehrenberg's rule of thumb is two effective digits.

Fix: round to the precision the uncertainty supports and the reader needs, usually 2 significant figures for estimates ("~$1.2M", "about 37%"); prefer a range or "~" when the source is rough ("$1–1.5M", "roughly a third faster"); state the basis once when it matters ("from 5 benchmark runs"); make the same quantity read the same everywhere. If you cannot tell how precisely a number is known, flag `[AUTHOR: how precise is this? state range or basis]` rather than guess. Never change the value beyond rounding, and never invent a range (R01).
Keep: exact values whose exactness matters (K23): identifiers, versions, configuration values, prices and amounts in contracts, invoices or billing, measured results with method and error stated, legal and regulatory figures, counts that are actually exact and small. Precision in a technical appendix or data table aimed at analysts who need it (K24).

## claude
Newer Claude models tend to replace vague hype with concrete-looking numbers; weight unsourced precise figures in Claude drafts and hand their truth to the claims lane.
