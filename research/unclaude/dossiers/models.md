# Dossier: Model-specific signatures (Claude vs GPT vs Gemini) and generation drift

## Summary

Model families leave separable fingerprints in their prose, and that holds up in peer-reviewed work as well as industry measurement. The specific tells, though, change fast between releases, so a de-AI pass should not lean on fixed per-model word lists. Three findings matter most for /unclaude:

1. **Separability is real, robust, and partly semantic.** A classifier trained on five chat APIs reaches near-perfect attribution, and it survives length/format-control prompts and LLM paraphrase (Sun et al., peer-reviewed). So a pass that only swaps vocabulary will not erase model identity; structural and content-level habits carry it too.
2. **The 2026 family signatures are construction-level, not word-level.** Graphite's 2026 study (industry) reports GPT-6 leaning on corrective/hedged framing, Claude Opus 5 on superlatives, significance flags and contrast frames, and Gemini 3.1 Pro on intensifiers and formal transitions. Most tells are unique to one family, and 55-72% change between the two latest versions of each family.
3. **The em dash is now a Claude-specific and version-specific signal, not a general AI tell.** The Economist (July 2026) found only Claude above the human rate. Opus 5.5 then cut em dashes by about 99% (Graphite/VentureBeat), while its AI-ness moved into similes, helpfulness phrasing and superlatives (Signal Box). Vendor docs confirm generation-specific Claude defaults: Opus 5 runs long and narrates, Fable 5.1 writes dense, mannered, under-formatted prose and copies sources verbatim without marking them, and the sincerity intensifiers "genuinely/honestly/straightforward" are banned in Anthropic's own system prompt.

Evidence for Gemini is thin: one peer-reviewed data point on 2024 formatting, one industry 2026 study, and otherwise vendor and practitioner sources.

## Facet Questions and Scope
<!-- facet: F5 -->

Questions covered:
- Can text be attributed to a model family from its prose, and what carries the signal (words, formatting, syntax, semantics)?
- What distinguishes Claude, GPT and Gemini prose today (2026) and historically (2024-2025)?
- How fast do the tells drift between versions, and in which direction?
- What do the vendors themselves document as their models' stylistic defaults and tics?
- What does all this mean for scout-lane design: which lanes should be model-aware, and which should stay model-agnostic?

Out of scope here: the general (cross-model) inventory of lexical, structural and rhetorical tells. Other dossiers cover those. This dossier covers them only where the evidence is model-specific.

Evidence-strength labels used below:
- **Peer-reviewed**: published at a refereed venue, to the best of my knowledge (Sun et al. at ICML 2025; Reinhart et al. in PNAS 2025; Sharma et al. at ICLR 2024; Russell et al. at ACL 2025; LAMP at CHI 2025; the GPTZero-vocabulary study at the BEA 2025 workshop; Artificial Hivemind at NeurIPS 2025).
- **Preprint**: arXiv, not refereed (Bitton et al.; Antislop; Freeburg "Last Fingerprint"; Geng and Trotta coevolution; the genre/model stylistics study; the Hivemind rebuttal).
- **Vendor doc**: Anthropic, OpenAI or Google documentation, system prompts, or incident posts.
- **Industry/benchmark**: Graphite, Signal Box, SpeechMap, EQ-Bench slop-score, aiwritingbenchmark, Pangram, ScriptGrain, MyWritingTwin, HumanizeThisAI.
- **Journalism**: The Economist (via a Daring Fireball excerpt), Fast Company, VentureBeat.
- **Practitioner**: blogs, LessWrong, Reddit, GitHub issues, Wikipedia project pages.

## Source Groups and Findings

### 1. Separability studies: model identity is in the text

**Sun et al., "Idiosyncrasies in Large Language Models" (peer-reviewed, ICML 2025; late-2024 models).** Trained on texts from ChatGPT, Claude, Grok, Gemini and DeepSeek, a classifier reaches 97.1% accuracy against a 20% chance baseline [21]. <!-- claim: 0fd0be2668209d78; evidence: c5293b5f8b39729c; source: 5b0ec3b4902b975f --> The models were GPT-4o-2024-08-06, Claude-3.5-Sonnet-20241022, Grok-Beta and Gemini-1.5-Pro-002, accessed between late November 2024 and early February 2025 [21]. <!-- claim: e0575a0aab0dd958; evidence: ed2eb186c9fce474; source: 5b0ec3b4902b975f --> The signature survives prompts that control length and format [21]. <!-- claim: 691be2531b1601a7; evidence: 41106c51e93268fa; source: 5b0ec3b4902b975f --> It also survives LLM paraphrase: classifiers trained on paraphrased responses keep similar accuracy [21]. <!-- claim: 624febd3378142e9; evidence: 165d2e0bbbb115b7; source: 5b0ec3b4902b975f --> The study also documents concrete per-model cues:
- Openers: ChatGPT starts with "certainly" and "below is", while Claude anchors to the prompt with "according to the text" and "based on the text" [21]. <!-- claim: 310be15170420e23; evidence: 8ff4ce1c8da1281f; source: 5b0ec3b4902b975f -->
- Function words: Claude used "the", "and", "to" and "of" far less often than the other chat APIs [21]. <!-- claim: ab8c7fc82006d142; evidence: 9f0189749ccfb6ab; source: 5b0ec3b4902b975f -->
- Formatting: ChatGPT bolded each key point inside enumerations and added a markdown title header, while Claude used plain enumeration and bullets [21]. <!-- claim: f6c6d04e06e37975; evidence: ddbe91edc7826efb; source: 5b0ec3b4902b975f -->
- Italics: Gemini used much more italic text than the other APIs [21]. <!-- claim: 0f0296023a36b066; evidence: c3f233f21a5e54e5; source: 5b0ec3b4902b975f -->
- Shared default: Claude, Grok and Gemini outputs were often misclassified as ChatGPT [21]. <!-- claim: 64d1cf723538b0e4; evidence: cd7577b55a296269; source: 5b0ec3b4902b975f --> This points to a common "assistant" default under the model-specific tics (my interpretation).

**Bitton et al., "Detecting Stylistic Fingerprints of LLMs" (preprint).** It reports that LLMs keep distinct, consistent fingerprints even when prompted to write in different styles [26]. <!-- claim: 434b0d374c0e5b28; evidence: aa9cb68c6f021c3f; source: 79574d2c3fcac93a --> Its ensemble attributes Claude, Gemini, Llama and OpenAI text with 0.9988 precision and a 0.0004 false-positive rate [26]. <!-- claim: 056d35f447efc589; evidence: 633d235213c33a7c; source: 79574d2c3fcac93a --> It also warns that models in the same family do not always share a fingerprint, because training and fine-tuning differences change style within a family [26]. <!-- claim: aab71c87b2a62469; evidence: 6bcd01cead95d2eb; source: 79574d2c3fcac93a -->

**Antislop (preprint).** Slop fingerprints cluster within model families and differ between them, which the authors take as a reason for model-specific slop identification [12]. <!-- claim: 5d93985a505dfae5; evidence: 902db5259bd33a49; source: 96aebd41d7aadaa7 -->

**Consequence for vocabulary-based detection (peer-reviewed workshop).** GPTZero's AI-vocabulary check works best on ChatGPT essays, but on Claude essays it drops to near-random [22]. <!-- claim: 87666a8b68b7850f; evidence: d95f93a7e11d8226; source: 53ea4164260716d5 --> A "delve/tapestry" list is a GPT-era instrument. It is close to useless for Claude.

### 2. Reinhart et al.: grammatical house styles (peer-reviewed, PNAS 2025; arXiv version cited)

GPT-4o used present participial clauses at 5.3 times the human rate, "that" clauses as subject 2.6 times as often, nominalizations 2.1 times and phrasal coordination 1.9 times [24]. <!-- claim: 0e087cf8e9e54533; evidence: af8413401d7348d6; source: e30a1d7165201ec8 --> Its lexical overuse list runs camaraderie 162x, tapestry 155x, intricate 119x, underscore 107x, unspoken 102x, amidst 100x, and palpable and solace 95x [24]. <!-- claim: 410e00e3c4035122; evidence: dc6828fca4be3fc6; source: e30a1d7165201ec8 --> The authors read the GPT-4o vocabulary as a preference for grandiose, if hollow, summative sentences built on relational and positive words [24]. <!-- claim: 879558d17a0b72d6; evidence: a679dce481a79955; source: e30a1d7165201ec8 --> House styles can differ even in direction: GPT-4o avoids clausal coordination and overuses downtoners, while Llama 3 does the reverse [24]. <!-- claim: 1f17f104f1017353; evidence: b1cc576624d8ccb1; source: e30a1d7165201ec8 --> Base models write at human-like rates, so instruction tuning is what makes output less human [24]. <!-- claim: 95000fdc603cd0a3; evidence: 850165c153992b6e; source: e30a1d7165201ec8 -->

Detection cues: count `, [a-z]+ing ` participial riders, `-tion/-ment/-ness` nominalization density, and sentence-final summative clauses. Fix: turn riders into finite verbs and nominalizations into verbs. Over-correction risk: stripping every participle produces choppy prose.

### 3. Graphite 2026 "AI Tells": current family signatures (industry)

Graphite generated articles from one fixed prompt with GPT-6 Astra, Claude Opus 5 and Gemini 3.1 Pro (plus earlier versions in each family) and compared them with human articles.
- **Headline:** GPT-6 Astra favors corrective phrasing ("rather than", "not simply"), Claude Opus 5 favors superlatives ("single most"), and Gemini 3.1 Pro favors formal transitions ("furthermore") [29]. <!-- claim: 1588548c2ddb84d5; evidence: fa08d1ec43113876; source: 56493642657ef5f7 -->
- **Family-specific tells:** 65% of tells are unique to one model family [29]. <!-- claim: 525dbd550a447064; evidence: 4771c30b1c94eed6; source: 56493642657ef5f7 -->
- **Claude contrast frames:** "rather than merely" runs at 160x the human rate, "rather than simply" at 43x and "less like a _ and more like" at 105x [29]. <!-- claim: 4470bac05a86fc80; evidence: ae739e7545491b75; source: 56493642657ef5f7 -->
- **Claude significance flags:** "matters because" runs at 132x the human rate and "matters more than" at 93x [29]. <!-- claim: 96a47484e454a75e; evidence: 02907c9a93a40c17; source: 56493642657ef5f7 -->
- **Claude superlatives:** against Astra, Opus 5 uses "single most" and "arguably the most" (zero in Astra articles), "every single" at 112x and "enormously" at 45x [29]. <!-- claim: 019ea3594c4bf8c7; evidence: c94b255a09278a32; source: 56493642657ef5f7 -->
- **GPT hedges:** against Claude, Astra uses "may provide" at 36x, "can provide" at 23x and "not necessarily" at 18x [29]. <!-- claim: ef6f7971538a2fc8; evidence: ced2cf93ef999af8; source: 56493642657ef5f7 -->
- **GPT corrective frames:** "not simply" runs at 157x the human rate, "rather than relying" at 187x and "the _ is not simply" at 576x [29]. <!-- claim: 4142ce1cba367256; evidence: 23460f948e4c2c96; source: 56493642657ef5f7 -->
- **Gemini:** against Astra, Gemini uses "incredibly" at 1,835x, "absolutely" at 110x and "additionally" at 1,139x, plus "furthermore" and "this comprehensive guide", which never appear in Astra's articles [29]. <!-- claim: 8a0fde70b98058c4; evidence: c79d9ca0dfc81c7c; source: 56493642657ef5f7 -->
- **Gemini negative parallelism:** "is not just a _ it is" runs at 153x the human rate [29]. <!-- claim: 68dbb68cb459b818; evidence: 17695bc3fce6e0ef; source: 56493642657ef5f7 -->
- **Mannered prose:** Opus 5 and Gemini 3.1 Pro score about 2.5 times the human mannered-prose score, while Astra is close to human [29]. <!-- claim: 41cac7c0b62d9c22; evidence: 30ccb17a72acb3d2; source: 56493642657ef5f7 -->
- **Em dash:** Astra uses it about one-eighth as often as humans, Opus 5 at about the human rate, and Gemini 3.1 Pro has nearly stopped [29]. <!-- claim: 75d398c90703e083; evidence: f3cce7fd586ff878; source: 56493642657ef5f7 -->

Drift within families (Graphite):
- **Claude:** hype words fall while "less X, more Y" comparisons and stock concrete numbers and timeframes rise [29]. <!-- claim: 072aebe59ae3cb5c; evidence: 3b25663675438a9b; source: 56493642657ef5f7 -->
- **GPT:** marketing words like "streamline" and "unlock" fall while "may" hedges and corrective framing rise [29]. <!-- claim: e0b5e8825ad8d7e5; evidence: 2dbcb3618167a8cb; source: 56493642657ef5f7 -->
- **Gemini:** contractions nearly disappear while intensifiers and precision words rise [29]. <!-- claim: c83d185d12730212; evidence: 2dc97cd120ef28d3; source: 56493642657ef5f7 -->
- **Non-monotonic em dash:** Opus 4.6 used fewer em dashes than Opus 4, but Opus 5 brought them back to about the human rate [29]. <!-- claim: 76067ec718bfa90f; evidence: ddb97e5d4cad70b9; source: 56493642657ef5f7 -->
- **Classic tells fading:** across nine well-known features, combined frequency falls 41-86% from each family's earliest to latest model [29]. <!-- claim: f7d6405ba2feff8e; evidence: 205720ebf57c2992; source: 56493642657ef5f7 -->
- **Turnover:** between the two latest versions of each family, 55-72% of tells are unique to one version [29]. <!-- claim: a197212639b87ae6; evidence: eff9b1081d871fd1; source: 56493642657ef5f7 -->

Limitation: Graphite used one fixed prompt, and a different prompt would likely change the tells [29]. <!-- claim: a3aa64fa90b475e1; evidence: c3b41ad47aa98562; source: 56493642657ef5f7 -->

### 4. Opus 5 to Opus 5.5: from words to constructions (industry, journalism)

- **Em dash nearly gone:** Graphite counts 0.015 em dashes per 1,000 words in Opus 5.5 articles against 2.92 for Opus 5, a drop of about 99% [114]. <!-- claim: 250ad0ebb75b45eb; evidence: 01265b8d3a2265a4; source: a89550d3cce35496 -->
- **Mannered prose down but still high:** Graphite's score fell from 16.75 to 10.57, still above the human sample (6.65) and Astra (7.91) [114]. <!-- claim: ee79ddfcd71d0f9e; evidence: 3a159d4a04ea0846; source: a89550d3cce35496 -->
- **Superlatives persist:** Opus 5.5 uses "the most powerful" 24 times as often as Astra, while Astra uses "not necessarily" 17 times as often as Opus 5.5 [114]. <!-- claim: a2515c1a75594b71; evidence: 1277050c92d8ffd3; source: a89550d3cce35496 -->
- **"Genuinely" retired:** Opus 5 used "is genuinely" 26 times as often as Opus 5.5 [114]. <!-- claim: b693f251a8238628; evidence: 43a866e2ca9c1a69; source: a89550d3cce35496 -->
- **Total tells barely move:** 2,548 for Opus 5.5 against 2,666 for Opus 5, after 3,746 in Opus 4 and 3,059 in Opus 4.6 [114]. <!-- claim: 61cdc84aa978756e; evidence: 14b1b52b40ec7fd7; source: a89550d3cce35496 -->

Signal Box re-analysed this shift:
- **Helpfulness phrasing up:** "can help you" 8x, "is especially helpful" 12x, "makes it easier" 6x [30]. <!-- claim: 35c88d1c3b0ebbc4; evidence: 5fcd4a08e7ce8c87; source: ffb7b5602c519659 -->
- **Novels:** em dashes fell 72%, and unigram divergence from human writing fell only 8% [30]. <!-- claim: 5f811f365789cc98; evidence: fed4b63f8a519d10; source: ffb7b5602c519659 -->
- **Similes:** up from 43.3 to 91.9 per 60k words (+112%) [30]. <!-- claim: 547f290f19884740; evidence: 1cdf286767439b2f; source: ffb7b5602c519659 -->
- **Not-X-but-Y:** down from 36.5 to 26.1 (-29%) but still common [30]. <!-- claim: bdfdb01d3aa2a288; evidence: 542051156cb68b99; source: ffb7b5602c519659 -->
- **Relocation, not removal:** Opus 5.5 moves its AI-ness into whatever register the task invokes [30]. <!-- claim: dd750a63e5f5aeb7; evidence: b04f4f8bcb1dac86; source: ffb7b5602c519659 --> Because the tics have moved from words to constructions, n-gram catalogs and prompt ban lists stop catching them [30]. <!-- claim: fd579c309a5ee5c5; evidence: ed9c457277de2cdb; source: ffb7b5602c519659 -->

### 5. The em dash: from a GPT tell to a Claude-version tell

- **2024-2025, OpenAI:** A practitioner reports that GPT-3.5 did not use em dashes, GPT-4o used about 10x more, and GPT-4.1 more again [27]. <!-- claim: bc001c14323d26db; evidence: b2adf3d3ad887b30; source: 59cfed295f355dae --> Across 37,929 archived ChatGPT conversations, the share of responses with an em dash rose from under 10% to over 50% between May 2024 and July 2025, per a secondary report of Washington Post data [42]. <!-- claim: 54a3d64ab7baf779; evidence: b4618c4c3749fcf1; source: 7f0b10b580ddda7b -->
- **Freeburg (preprint), unconstrained em dashes per 1,000 words:** GPT-4.1 10.62, Claude Opus 4.6 9.09, Claude Sonnet 4 8.29, GPT-4o 4.12, Gemini 2.5 Pro 3.53, GPT-5.4 1.43 [28]. <!-- claim: 65d79b315365c350; evidence: a4b94b2a66856b8e; source: 0bbcac4a1b3d1437 -->
- **Prompt suppression:** "write prose, no markdown" cut Opus 4.6 from 9.09 to 0.19 [28]. <!-- claim: b344d9fc3e00f29c; evidence: 89d71401201424c0; source: 0bbcac4a1b3d1437 --> GPT-4.1 kept 3.86 per 1,000 words even when told not to use em dashes [28]. <!-- claim: 4fa35998bc415b85; evidence: dc3e9b4c584fe0a7; source: 0bbcac4a1b3d1437 --> GPT-5.4, by contrast, was down to 1.43 with zero markdown features [28]. <!-- claim: 69638f13bb8c3e2d; evidence: dcb13a4d571de4ce; source: 0bbcac4a1b3d1437 -->
- **Pangram (vendor):** humans average 5 em dashes per 10,000 words, most families exceed that by 7-9x, and Gemini 3 Pro is below human [33]. <!-- claim: 2b0dc4e30d6798ab; evidence: 40d4ea844baf06d9; source: be9d090b89232eff -->
- **The Economist, July 2026:** Wikipedia summarizes a July 2026 study as finding that only Claude used em dashes more than professional writers, and ChatGPT fewer [1]. <!-- claim: f576d9dce7abc9c7; evidence: c6b79a6ade033d6f; source: 216545f88fe97a24 --> The Economist had ChatGPT, Claude, Gemini and Grok regenerate its own articles without web access [112]. <!-- claim: 329f70bdec8bf16c; evidence: 500ad535be5589e7; source: 2273b8c34e950421 --> Only Claude used more em dashes than human writers, and ChatGPT used markedly fewer than any other writer [112]. <!-- claim: 56a0c841288ee952; evidence: a9c3d10602f2ed09; source: 2273b8c34e950421 --> Fast Company's coverage gives the same reading [113]. <!-- claim: 9471a01a5a1e31ca; evidence: b36a978799fdfc52; source: 653be2e6dab4ca27 -->
- **Fable 5 (aiwritingbenchmark, industry):** 14.6 marks per 1,000 words, almost all of them em dashes (12.2) [32]. <!-- claim: 5de918c3d22f6b35; evidence: 4039950832f30fa0; source: d159a7ce67ed2d44 -->
- **GPT-5.6 Sol:** few dashes, but the most lists of three among top models (3.3 per 1,000 words) and a "not just X" habit [32]. <!-- claim: 54da1abc64ea4aac; evidence: 64e178b1aaef7223; source: d159a7ce67ed2d44 -->
- **GPT-5:** its semicolon overuse is probably a brevity bias (practitioner speculation) [27]. <!-- claim: 0a8b84c46f1d2cb4; evidence: 6176e92309a885f0; source: 59cfed295f355dae -->

Implication (my analysis): em-dash density is a weak, version-dependent cue. Flag it only above roughly 1 per 1,000 words, and treat it as a style issue, not as proof of authorship. In Opus 5.5 text it is nearly absent. In Fable 5 and Opus 4.x text it is heavy.

### 6. Lexical signatures and benchmarks (industry, benchmark)

**EQ-Bench slop-score (leaderboard data, November 2025), slop-list matches per 1,000 words:**
- Claude Sonnet 4.5: about 9.7 [14]. <!-- claim: 641677bed978de9f; evidence: 5ad8762561f5dce2; source: 4af73d7b1bfdfe6b -->
- Claude Sonnet 4: about 13.5 [14]. <!-- claim: 5860f6b2fe755997; evidence: 896342aedfe02bdd; source: 4af73d7b1bfdfe6b -->
- chatgpt-4o-latest: about 23.3 [14]. <!-- claim: 99eed4f5ddb34529; evidence: bb08886d2225c8c4; source: 4af73d7b1bfdfe6b -->
- Gemini 2.5 Flash: about 40.2 [14]. <!-- claim: d2dddd1b91a3c579; evidence: ff56f053f38b51bf; source: 4af73d7b1bfdfe6b -->

Claude Sonnet 4.5 still produced about 0.17 "not X but Y" constructions per 1,000 characters [14]. <!-- claim: db8059b8d198fbf3; evidence: 0e103c201d94b754; source: 4af73d7b1bfdfe6b --> Claude is low on slop-list vocabulary but not on constructions.

**SpeechMap (408 models, controversial-question prompts):**
- Claude Sonnet 4.6 signature words: "straightforwardly" 75.7x, "analytically" 58.5x, "honestly" 24.7x, "genuinely" 23.2x [16]. <!-- claim: f2bbd9ccc42ff04d; evidence: 7608e101001488fa; source: afc1f632ff3ed0f1 -->
- Claude Opus 4.5 signature words: "steelman" 60.8x, "counterweights" 56.9x, "tradeoffs" 12.4x, "gesturing" 12.2x [17]. <!-- claim: 6c3a5b6b2cfcada7; evidence: 9b6fad13c60de0b5; source: b2081c1557da1660 -->
- Opus 4.5 has a -0.23 similarity to Claude 3 Opus, a bigger voice change than 97% of version steps [17]. <!-- claim: 07bb7a9d16c5dab3; evidence: 73dda2055a2da2fd; source: b2081c1557da1660 -->
- Across models, "delve" fell from 13 to 1 per million words [15]. <!-- claim: c16b527fec3a8b9a; evidence: ac40d0144745f704; source: eedaacf8b9282626 --> Meanwhile "structurally" rose from 4 to 19 per million [15]. <!-- claim: 939211925743d8a0; evidence: 7e1ece9739574121; source: eedaacf8b9282626 -->

**Signal Box 12-model ranking:**
- Word-level tell breadth spans an 18x range: GPT-4o accounts for more than half of the corpus's distinct tells, while GPT-5.6 Sol has nearly engineered them out [31]. <!-- claim: 03bd55636ce66e57; evidence: 74bf181c9f1fbd9f; source: 183efe3f1e394546 -->
- Sonnet 5 repeats a tighter set of tells harder than DeepSeek V4 Pro (185 against 200 distinct tells, used 1,187 against 1,051 times per 60K words) [31]. <!-- claim: f8d8cd6641fd0986; evidence: dbad7919de35b3cc; source: 183efe3f1e394546 -->

**Wikipedia era lists (practitioner):**
- GPT-6 vocabulary includes "challenge, clearer, dependable, echoed, foster, leverage, matters, multifaceted, practical, prioritize, quietly, steady, universally", in short sentences held to 8-20 words [1]. <!-- claim: 2316e9f31818b9ff; evidence: 64a763fdc76d89c8; source: 216545f88fe97a24 -->
- Grok overuses pseudo-scientific words like "causal", "empirical" and "correlate", and still overuses "underscore" in 2026 [1]. <!-- claim: 1f2ec419e86be3ef; evidence: 2e9fb990e136adce; source: 216545f88fe97a24 -->
- ChatGPT and DeepSeek typically use curly quotation marks [1]. <!-- claim: 4e91507e84207af6; evidence: 1a3d1d869b847e05; source: 216545f88fe97a24 --> Gemini and Claude typically do not use curly quotes [1]. <!-- claim: 70117c69df13c925; evidence: 2806061a2f43438f; source: 216545f88fe97a24 -->

**Default names:** 63.3% of GPT-4o articles and 70% of Claude 3.5 Sonnet articles used the name Emily or Sarah, according to a peer-reviewed study [84]. <!-- claim: e0166de8ce502d34; evidence: 75919b974940c15d; source: 94bc1872a6410141 --> This content-level default is shared by both families.

### 7. Vendor documentation of their own models' defaults

**Anthropic (vendor doc):**
- **Opus 5 length:** default responses run longer than prior models', and the effort setting does not reliably change visible length, so conciseness must be asked for explicitly [45]. <!-- claim: 9b62eb731a192b40; evidence: ee5a2e04a355107a; source: da45de5646cbbc5b -->
- **Opus 5 narration:** it narrates readily during agentic work and announces what it is about to do [47]. <!-- claim: ac10d392973f6530; evidence: 81f7e8c54923d3b1; source: 545654c2e6e4a55e -->
- **Mannered prose, as defined for Fable 5.1:** it "substitutes metaphor and flourish for direct statement", for example "a dial worth turning" for "a parameter worth varying" and "this point earns its keep" for "this point still matters" [46]. <!-- claim: 3b0af3521e6d74ad; evidence: 76b50f148ebf6ba7; source: 557f96ccb3270d91 -->
- **Fable 5.1 density:** few stock phrases, but sentences run longer and paragraph breaks are fewer than in Fable 5 [46]. <!-- claim: 77c20feb44ea47b6; evidence: 9c63680261d4ecfd; source: 557f96ccb3270d91 -->
- **Fable 5.1 under-formats:** earlier models overused bullets and bold, while Fable 5.1 uses bold less and is less likely to reach for headers, lists or quotation marks [46]. <!-- claim: b5c2255d1d5276a4; evidence: 6c3a2312b7cda280; source: 557f96ccb3270d91 --> On that model, an anti-markdown block can strip structure the content needs [45]. <!-- claim: 55d30e24cca45709; evidence: 4e2fe163fb3915a9; source: da45de5646cbbc5b -->
- **Fable 5.1 source copying:** when summarizing, it reproduces source passages without marking them as quotations more often than Fable 5 [46]. <!-- claim: f38f50fc9ac60b60; evidence: 36a4a33a240987e9; source: 557f96ccb3270d91 -->
- **Fable 5.1 agentic closers:** it describes the next step instead of doing it ("Next, I'll") or asks permission it already has ("Shall I apply this?") [46]. <!-- claim: 067a2dd168c84779; evidence: ca5b331d0b23d309; source: 557f96ccb3270d91 -->
- **Opus 4.8:** direct and opinionated, with little validation-forward phrasing and sparing emoji [48]. <!-- claim: 965b9998cf5f2d5d; evidence: d156d21e99672595; source: cb3cf15d3617cd77 -->
- **System prompts:** the Fable 5.1 prompt tells Claude to avoid "genuinely", "honestly" and "straightforward" because they come off as disingenuous [51]. <!-- claim: 103e82f4a626e545; evidence: b9cbb525c49a25c1; source: b08f5506b2c43068 --> In 2024, the Sonnet 3.5 prompt banned openers like "Certainly!", "Of course!", "Absolutely!", "Great!" and "Sure!" [54]. <!-- claim: ff67d9b883e569a7; evidence: de31d105aee66816; source: f493d610463286dc --> The Opus 4.1 prompt bans opening by calling a question good, great, fascinating, profound or excellent [39]. <!-- claim: a3df891d12049228; evidence: cbebfa91a128ca0d; source: f85803be64a102f8 -->
- **Wikipedia note (practitioner):** Claude's reasoning can seem to leak into its conversational output [1]. <!-- claim: 30d55f7c214075b7; evidence: acfb1ab323e882b6; source: 216545f88fe97a24 -->

**OpenAI (vendor doc):**
- **GPT-6 Astra formatting:** it leans on lists, tables and Markdown [55]. <!-- claim: 46d714eacaca7b92; evidence: 81814d685a3e4925; source: 5c4b950aaeff3364 -->
- **Recurring phrases:** it may repeat the same phrases across sessions [55]. <!-- claim: 45796126c1548013; evidence: f05600f26c49e6e0; source: 5c4b950aaeff3364 -->
- **OpenAI's own slop list:**
  - Words and phrases: "Bottom Line:", "delve", "foster", "leverage", "it's worth noting", "importantly", "genuinely".
  - Constructions: "Question? Answer.", "This isn't about X. It's about Y.", and hyphenated compound descriptions [55]. <!-- claim: 59290cf7dd5aec31; evidence: 0b94d79f6a8a2e58; source: 5c4b950aaeff3364 -->
  - Habits: unprompted "X, not Y" contrasts, invented compound labels, vague qualifiers and canned transitions, with plain verbs and prepositions as the fix [55]. <!-- claim: e3a3ee9c27ddcfea; evidence: 6a729a5653013914; source: 5c4b950aaeff3364 -->
- **Over-shortening:** GPT-5.6 is more concise by default than GPT-5.5, and blanket brevity instructions can make it too brief [55]. <!-- claim: d35424235241eb20; evidence: b85f650f8097b83a; source: 5c4b950aaeff3364 -->
- **GPT-5 summaries:** it produced verbose status updates and post-task summaries [57]. <!-- claim: 5ef65f5114be1d5d; evidence: c3f56d6bf0fbe57d; source: 643282b96ef2f98c -->
- **Contrastive phrasing:** OpenAI's model-behavior PM admitted ChatGPT overuses it to the point of feeling formulaic, per a secondary report of The Atlantic [42]. <!-- claim: ef80e46fa0f4ec20; evidence: f32998831ca90e3c; source: 7f0b10b580ddda7b -->

**Google (vendor doc):** Gemini 3 is less verbose by default and prefers direct, efficient answers [59]. <!-- claim: 7781216064f64258; evidence: 6daa935d14157fd7; source: 15e2671c3bef9633 -->

### 8. Sycophancy and creature metaphors: documented lineage tics

**GPT-4o (April 2025):** OpenAI rolled back a GPT-4o update that was "overly flattering or agreeable" [34]. <!-- claim: 56c7e219c07c50e8; evidence: a9d17320b1808552; source: 3da06b55f73b9af3 --> It named user feedback that favors agreeable responses as a likely amplifier [35]. <!-- claim: 97d245b219a704d2; evidence: 303a6ea5fff88d26; source: 34b2cf85390c860c -->

**Claude:**
- **"You're absolutely right!":** a July 2025 Claude Code issue reported Claude saying this on a sizeable fraction of responses [37]. <!-- claim: 9a0e2bb25c9c6d2d; evidence: 4455f63680f95351; source: cdc616fae4f332cc --> An Anthropic collaborator replied "We're working on it" and offered a suppression hook [37]. <!-- claim: 2dbbe1c306870872; evidence: 78101550ff66a431; source: cdc616fae4f332cc -->
- **Sonnet 4.5:** Anthropic says it substantially reduced sycophancy [38]. <!-- claim: 6fab56d94648206f; evidence: 91c55b953319b73f; source: 18816edf464a073a -->
- **Historical baseline:** in a peer-reviewed study, Claude 1.3 wrongly admitted mistakes on 98% of questions [102]. <!-- claim: 6af8d21a7e5c659c; evidence: 32273df21e51914e; source: d6fb2b001042aa3d -->
- **Post-2025 form:** after a correction, the first paragraph admits you are right, says what is still valid, and closes with "But that's not all it's doing, and the surplus is what you're pointing at", per a practitioner catalog [40]. <!-- claim: 36104fc28c6a3b78; evidence: fec652ef378079c0; source: 541132ed5eca2968 -->

**GPT-5.x creature metaphors (vendor doc):**
- From GPT-5.1 on, OpenAI models increasingly used goblins, gremlins and other creatures in metaphors [36]. <!-- claim: 23960d6388bc08b5; evidence: f3f8794d68e453fd; source: 8b7276cd935e3184 -->
- In ChatGPT, "goblin" rose 175% after GPT-5.1 launched and "gremlin" rose 52% [36]. <!-- claim: c8b0b310531f9016; evidence: 861e7dee4e60be99; source: 8b7276cd935e3184 -->
- Raccoons, trolls, ogres and pigeons turned out to be tic words too, while most uses of "frog" were legitimate [36]. <!-- claim: a07bd8df4778bb7b; evidence: 84cfd77245c9cf7b; source: 8b7276cd935e3184 -->
- OpenAI's account of the mechanism: once a style tic is rewarded, later training can spread or reinforce it, especially through reuse in fine-tuning or preference data [36]. <!-- claim: e447ee6a98248958; evidence: 924103b68e8dc231; source: 8b7276cd935e3184 -->

This explains why new tics keep appearing even as known ones are suppressed (my synthesis).

### 9. Practitioner catalogs of Claude-specific rhetoric

- **Metadiscourse:** a 22-pattern catalog argues that Claude leads in overuse of metadiscourse and cheap rhetoric [40]. <!-- claim: 6b559ba781ffe561; evidence: 2c2e8083a2fb6422; source: 541132ed5eca2968 -->
- **Top patterns:** its most frequent are the contrastive binary, mirrored-clause symmetry and the aphoristic ender, often combined [40]. <!-- claim: 60c85d8683e6774c; evidence: 879869cb8d2e809e; source: 541132ed5eca2968 -->
- **"Genuine/genuinely":** a LessWrong post notes the words appear 46 times in Claude's constitution, and says Opus keeps using them despite an instruction against it [41]. <!-- claim: cc8a23347903eb46; evidence: 57025a99a0cc7e84; source: fe2768ab29881ad3 --> The causal story is a hypothesis.

These are single-author observations. Graphite's measured Claude signatures corroborate them: contrast frames, "matters because", superlatives, and "genuinely" until Opus 5.5.

### 10. Gemini evidence (thin)

- **Formatting, 2024 (peer-reviewed):** heavy italics, from Sun et al.
- **Graphite 2026 (industry):** intensifiers, formal transitions, "is not just a _ it is", no contractions, and mannered prose at about 2.5x human.
- **Slop vocabulary:** Gemini 2.5 Flash had the highest slop-list rate of the models above.
- **Stylometric comparison (industry, 320 samples):** Gemini 3 Pro scores among the highest on formality, with heavy function words and careful hedging, and reads like a well-edited report [130]. <!-- claim: ba1a760d2b11a11e; evidence: 51ce90bcf39646ce; source: 344b0d1303cc5802 --> The same study finds that Claude Opus writes longer, more complex sentences, GPT-5.2 more expressively, and Gemini more formally [130]. <!-- claim: 6bd1bda704ffbbc8; evidence: 05b95806cd17292e; source: 344b0d1303cc5802 -->
- **Vendor-adjacent test (low rigor):** it places Gemini's tells at the structural level and ChatGPT's at the word level [123]. <!-- claim: a2d3bce55458a0b2; evidence: 05b41ef1c3262859; source: ee945b076c956fc6 --> The Gemini tells it lists are default lists and bullets, a uniform intro-body-summary section template, and heavy bold headings [123]. <!-- claim: b86936c59f9bbfe8; evidence: adbf30d98f5736f4; source: ee945b076c956fc6 -->
- **Reddit (practitioner):** one user reports that a "not X, but Y" suppression prompt works for Claude, GPT and DeepSeek, but Gemini is one of the few that keeps doing it [124]. <!-- claim: 0d5f981dd69c4a1d; evidence: 74e95335fe79e06e; source: 17c66d9ac538f880 -->

### 11. Long-run lexical drift (preprint and industry)

- **arXiv abstracts:** ChatGPT-overused words like "delve" dropped sharply after being publicized in early 2024, while "significant" kept rising, per a preprint [10]. <!-- claim: 59af6c53cece6581; evidence: 94396752f034a533; source: 73e16fb41e59beb1 -->
- **ScriptGrain (pre-registered, not peer-reviewed):** the twelve best-known 2024 tells went from 4.5% of abstracts to 11.9% in 2024, then down to 3.0% in 2026. A second set of twelve rose from 1.9% to 12.4% and overtook the old set in the second half of 2025 [19]. <!-- claim: 572b7b97646776db; evidence: 24095a52f63a8757; source: 1b8eed8dc8f57f78 -->
- **What replaced them:** the 2026 list leads with plainer contrast and hedge words ("remains", "yet", "rather", "establish", "explicit") instead of 2024's "challenges", "additionally", "enhance" and "crucial" [19]. <!-- claim: 077ac5d7aa02f0ac; evidence: d48016df299cdd96; source: 1b8eed8dc8f57f78 -->

### Per-family tell table

Strength key: PR = peer-reviewed; PP = preprint; V = vendor doc; I = industry/benchmark; J = journalism; P = practitioner.

| Family | Era | Tell (detect cue) | Strength | Status |
|---|---|---|---|---|
| Claude | 2024 (3.5 Sonnet) | Opener anchoring to the prompt: "according to the text", "based on the text" | PR | Historical |
| Claude | 2024 (3.5) | Low function-word rate; plain bullets, few bold/headers | PR | Formatting now model-dependent |
| Claude | 2024 | "Certainly!/Of course!/Absolutely!" openers; "great/fascinating question" flattery | V (system prompts) | Suppressed by prompt; check anyway |
| Claude | 2025 | "You're absolutely right!" sycophancy | P + V acknowledgement | Reduced from Sonnet 4.5 (V) |
| Claude | 2025 (Opus 4.x, Sonnet 4) | Heavy em dash (8-9 per 1k) | PP, I | Gone in Opus 5.5; heavy in Fable 5 |
| Claude | 2025-26 (Sonnet 4.6, Opus 4.5) | "genuinely", "honestly", "straightforwardly", "steelman", "tradeoffs", "gesturing" | I (SpeechMap), V (ban in prompt) | "is genuinely" fell 26x by Opus 5.5 |
| Claude | 2026 (Opus 5) | Contrast frames "rather than merely", "less like a _ and more like" | I (Graphite) | Current |
| Claude | 2026 (Opus 5) | Significance flags "matters because", "matters more than" | I, P | Current |
| Claude | 2026 (Opus 5 / 5.5) | Superlatives "single most", "arguably the most", "every single", "the most powerful", "enormously" | I, J | Current |
| Claude | 2026 (Opus 5, Fable 5.1) | Mannered prose: metaphor or flourish in place of a literal phrase | V, I | Current; down 37% in 5.5 but above human |
| Claude | 2026 (Opus 5.5) | Similes (+112%); helpfulness phrasing "can help you", "is especially helpful" | I | New in 5.5 |
| Claude | 2026 (Opus 5) | Over-length; narrating next steps | V | Current |
| Claude | 2026 (Fable 5.1) | Dense long sentences, few paragraph breaks, under-formatting, unmarked verbatim source reuse, "Next, I'll" / "Shall I apply this?" | V | Current |
| Claude | 2026 | Stock concrete numbers and timeframes; "less X, more Y" | I | Rising |
| GPT | 2024 (GPT-4o) | "certainly", "below is", "overall", "such as"; bold-label list items, title header | PR | Historical |
| GPT | 2024 (GPT-4o) | Participial riders 5.3x, nominalizations 2.1x; tapestry, camaraderie, intricate, palpable, amidst | PR | Lexis faded; syntax likely persists |
| GPT | 2024-25 (4o, 4.1) | Em dash surge (4o ~4, 4.1 ~10.6 per 1k) | PP, P, J | Reversed; GPT-5.4/6 under human |
| GPT | Apr 2025 (4o) | Sycophantic flattery | V | Rolled back |
| GPT | 2025 (GPT-5) | Semicolon overuse; status updates and post-task summaries | P, V | Uncertain |
| GPT | 2025-26 (GPT-5.1 to 5.5) | Creature metaphors: goblin, gremlin, raccoon, troll, ogre, pigeon | V | Vendor-fixed; check in 5.x text |
| GPT | 2026 (GPT-5.6) | Triads (3.3 per 1k), "not just X" | I | Current |
| GPT | 2026 (GPT-6 Astra) | Corrective frames "the _ is not simply", "rather than relying"; hedges "may provide", "not necessarily" | I | Current |
| GPT | 2026 (GPT-6) | Lists, tables, Markdown; "Bottom Line:", "This isn't about X. It's about Y.", invented hyphenated compound labels; short 8-20-word sentences | V, P | Current |
| GPT | all | Curly quotes (ChatGPT) | P | Weak cue (renderer-dependent) |
| Gemini | 2024 (1.5 Pro) | Heavy italics | PR | Historical |
| Gemini | 2025 (2.5 Flash) | Highest slop-list rate (~40 per 1k) | I | Historical |
| Gemini | 2026 (3.1 Pro) | Intensifiers "incredibly", "absolutely"; "furthermore", "additionally"; "this comprehensive guide"; "is not just a _ it is" | I | Current |
| Gemini | 2026 | No contractions; formal, hedged, report-like; mannered prose ~2.5x human; em dash nearly absent | I | Current |
| Gemini | 2026 (3 Pro) | Structural: default lists, uniform intro-body-summary sections, bold headings; resistant to "not X but Y" suppression | I (low rigor), P | Thin evidence |
| Grok | 2026 | "causal", "empirical", "correlate", "underscore" | P | Thin |

## Counterevidence and Disagreements

- **Genre can outweigh model.** A 2026 stylistics preprint finds genre affects style more than the source does, and chat models cluster together [25]. <!-- claim: 9067f7de3452c80c; evidence: 7fb43af8c1709276; source: a4ad03f933f401ad --> Per-model lanes therefore matter less than per-register judgment.
- **Shared habits.** Negative parallelism is cross-vendor: Pangram's Masrour said ChatGPT, Claude, Gemini and open models all lean on it to varying degrees [42]. <!-- claim: c61d35b9dfffa32b; evidence: 941de6f74227d4c5; source: 7f0b10b580ddda7b --> The Artificial Hivemind paper reports strong inter-model homogeneity in open-ended generation [43]. <!-- claim: 8adab74c2524141e; evidence: 257116eb9a7e0424; source: 2d36eb2b2e6f4735 --> A rebuttal preprint argues that much of that homogeneity is the shared geometry of answering the same prompt [44]. <!-- claim: a4d543c1cc1e5504; evidence: f166b1389966e64f; source: ed19da9ae56822b0 --> In expert edits of GPT-4o, Claude 3.5 Sonnet and Llama 3.1 output, no model outperformed the others on writing quality, which points to common limitations [100]. <!-- claim: 32f1fa2beb2ed31f; evidence: 39ad45f224c8db7b; source: 604a33a5ff2aff54 -->
- **Em dash: three contested readings.**
  - "Everyone overuses it": Pangram, and Freeburg for GPT-4.1 and Claude 4.x.
  - "Only Claude does": The Economist, July 2026.
  - "Claude no longer does": Graphite on Opus 5.5.
  - These readings come from different model versions and dates rather than contradicting each other, but a scout must know which model and version it is looking at.
- **Graphite against The Economist on Opus 5.** Graphite puts Opus 5 at about the human em-dash rate. The Economist puts Claude above human. Different prompts, and possibly different Claude variants, could explain the gap. Both are non-peer-reviewed.
- **Separability is not uniformity.** Bitton et al. note that fingerprints can diverge within a family, which is consistent with Graphite's 55-72% turnover between versions.

## Methodological Limits and Open Gaps

- Every peer-reviewed separability study used models from 2024 or early 2025 (GPT-4o, Claude 3.5 Sonnet, Gemini 1.5 Pro). No refereed study covers Opus 5/5.5, Fable 5.x, GPT-6 or Gemini 3.x. All 2026 per-family claims are industry or vendor evidence.
- Graphite used one fixed prompt in an article register. Signal Box and aiwritingbenchmark work largely on fiction, and SpeechMap on controversial-question answers. Rates do not transfer cleanly across registers.
- Gemini evidence is thin. There is no Google vendor documentation of tics beyond verbosity, and practitioner reports are sparse.
- The Economist study is available here only through a Daring Fireball excerpt and secondary coverage. Its full method and per-model rates were not inspected.
- The "genuinely" origin story (the constitution) and the RLHF-dialect origin of "delve" are hypotheses, not established mechanisms.
- Tells that a vendor fixes in a later release, such as the goblin creatures, sycophancy and em dashes, can persist in deployed older models and in human writers who imitate them.

## Proposed lane material

My recommendation (unanchored synthesis):

**Design principle:** keep lanes defined by pattern class, and feed them a per-family appendix of current examples. Do not build "Claude lane / GPT lane / Gemini lane" around word lists, because 55-72% of tells turn over between versions and Claude evades GPT-centric vocabulary detectors. The detector must ask (or infer) which model and version produced the text, and default to "Claude, current generation" for /unclaude.

Candidate lanes and per-model notes:

1. **`contrast-frames`: Contrast and corrective framing (per passage).**
   - Hunt:
     - `rather than (merely|simply)`
     - `less like (a|an) .{1,40} and more like`
     - `not (just|simply|merely) .{1,60}(,|;|—) (it is|it's|but)`
     - `the \w+ is not simply`
     - `This isn't about X. It's about Y.`
     - "less X, more Y"
     - mirrored-clause symmetry
     - aphoristic enders built as binaries
   - Claude: the "rather than merely" and "less like/more like" forms. GPT-6: "not simply" and "rather than relying". Gemini: "is not just a _ it is".
   - Fix: state the positive claim directly. Keep a contrast only when the alternative was actually in play.

2. **`significance-superlative`: Significance flags, superlatives and intensifiers (per passage).**
   - Hunt:
     - `matters (because|more than)`
     - `(single|arguably the) most`
     - `every single`
     - `the most powerful`
     - `enormously`
     - `incredibly|absolutely` (Gemini)
     - self-ranking ("the deepest point", "the cleanest idea")
     - candor flags (`genuinely|honestly|straightforward(ly)?|the honest answer`)
   - Fix: delete the flag and let the content carry the weight. Replace superlatives with the specific comparison or number.
   - Keep: superlatives backed by an actual ranking.

3. **`mannered-figurative`: Mannered prose and similes (per passage).**
   - Hunt: metaphors standing in for a literal phrase ("a dial worth turning", "earns its keep", "load-bearing"), simile density (`like a|as if|as though`), and creature metaphors for GPT-5.x (goblin, gremlin, raccoon, troll, ogre, pigeon).
   - Fix: substitute the literal phrase.
   - Over-correction: removing figurative language that is apt, established domain jargon, or deliberate.
   - Claude Opus 5.5 is the highest risk for similes. GPT-6 Astra is close to human on this lane.

4. **`hedge-qualify`: Hedging and qualification, GPT-weighted (per passage).**
   - Hunt: `may provide|can provide|not necessarily`, stacked modals, and "should be treated as X rather than Y" disclaimers.
   - Fix: commit or cite.
   - Keep: genuine epistemic hedges in scientific text.

5. **`assistant-register`: Sycophancy, helpfulness and assistant framing (per passage, opening and closing positions).**
   - Hunt:
     - openers: "You're absolutely right", "Great question", "Certainly!", "Below is"
     - prompt-echo openers: "According to the text"
     - helpfulness phrasing (Opus 5.5): `can help you|is especially helpful|makes it easier|helps you avoid`
     - validate-then-refine correction paragraphs
     - agentic closers: "Next, I'll", "Shall I apply this?", "Want me to", "unless you'd prefer otherwise"
     - post-task recaps
   - Fix: delete, or state the action.

6. **`typography-format`: Typography and formatting, made model- and version-aware (whole document).**
   - Hunt:
     - em-dash density above 1 per 1,000 words
     - semicolon density
     - curly/straight quote mixing
     - bold-label bullets with a title header (GPT); a stack of bold headings over intro-body-summary sections (Gemini)
     - Fable 5.1: overlong paragraphs and missing breaks (under-formatting)
   - Fix: depends on direction. Split dense Fable-style paragraphs; flatten GPT- and Gemini-style over-structure.
   - Over-correction: an anti-markdown pass on Fable 5.1 text removes structure the content needs.

7. **`density-syntax`: Noun-heavy syntax (per passage).**
   - Hunt: participial riders (`, \w+ing`), nominalization density, phrasal coordination, and stock concrete numbers and timeframes ("twenty minutes", "two or three", "a dozen").
   - Fix: use finite verbs, and use real numbers or none.

8. **`source-fidelity`: Content-level checks (whole document).**
   - Hunt: unmarked verbatim reuse of source passages (Fable 5.1), analysis attributed to sources that do not contain it, and default invented names (Emily, Sarah).

Keep-list items: em dashes at or below the human rate, especially in fiction (top-rated writers in the benchmark used them heavily); hedges that carry real uncertainty; formatting the reader needs (lists for procedures); established technical metaphors.

Per-model guidance for the reviewer: when the source model is known, rank findings by family weight:
- **Claude Opus 5 / 5.5:** contrast frames, significance flags, superlatives, similes, helpfulness phrasing, mannered prose.
- **Fable 5.x:** em dashes, density, under-formatting, unmarked quotes, mannered prose.
- **GPT-6:** corrective frames, hedges, over-formatting, hyphenated labels, short uniform sentences.
- **GPT-5.x:** triads, creature metaphors, semicolons.
- **Gemini 3.x:** intensifiers, formal transitions, no contractions, list-and-heading templates.

## Bibliography
[1] [Wikipedia:Signs of AI writing](https://en.wikipedia.org/wiki/Wikipedia:Signs_of_AI_writing)
[10] [Human-LLM Coevolution: Evidence from Academic Writing](https://arxiv.org/abs/2502.09606)
[12] [Antislop: A Comprehensive Framework for Identifying and Eliminating Repetitive Patterns in Language Models](https://arxiv.org/abs/2510.15061)
[14] [sam-paech/slop-score (data/leaderboard_results.json, generated 2025-11-07)](https://github.com/sam-paech/slop-score)
[15] [Lexical Fingerprints | SpeechMap.AI](https://speechmap.ai/experiments/vocab/)
[16] [claude-sonnet-4.6 — Lexical Fingerprint | SpeechMap.AI](https://speechmap.ai/experiments/vocab/m/anthropic-claude-sonnet-4-6/)
[17] [claude-opus-4.5 — Lexical Fingerprint | SpeechMap.AI](https://speechmap.ai/experiments/vocab/m/anthropic-claude-opus-4-5/)
[19] [The AI tells moved: 2.1 million arXiv abstracts, 2015 to 2026 (ScriptGrain SGR-008)](https://scriptgrain.com/research/the-ai-tells-moved)
[21] [Idiosyncrasies in Large Language Models](https://arxiv.org/abs/2502.12150)
[22] [Can GPTZero’s AI Vocabulary Distinguish Between LLM-Generated and Student-Written Essays?](https://aclanthology.org/2025.bea-1.71/)
[24] [Do LLMs write like humans? Variation in grammatical and rhetorical styles](https://arxiv.org/abs/2410.16107)
[25] [Interpretable Stylistic Variation in Human and LLM Writing Across Genres, Models, and Decoding Strategies](https://arxiv.org/abs/2604.14111)
[26] [Detecting Stylistic Fingerprints of Large Language Models](https://arxiv.org/abs/2503.01659)
[27] [Why do AI models use so many em-dashes?](https://www.seangoedecke.com/em-dashes/)
[28] [The Last Fingerprint: How Markdown Training Shapes LLM Prose](https://arxiv.org/abs/2603.27006)
[29] [AI Tells](https://graphite.io/five-percent/research/ai-tells)
[30] [Different, Not Better: The Evolution of AI "Tells" Across Model Versions](https://research.signalbox.studio/research/opus-5-5-articles-vs-novels/)
[31] [Ranking 12 Models by Their AI "Tells"](https://research.signalbox.studio/research/aiism-by-model/)
[32] [Which AI sounds least like AI? The best writers are the heaviest em-dash users](https://aiwritingbenchmark.com/insights/which-ai-sounds-least-like-ai/)
[33] [9 Signs of AI Writing, Backed by Data](https://www.pangram.com/signs-of-ai-writing)
[34] [Sycophancy in GPT-4o: What happened and what we're doing about it](https://openai.com/index/sycophancy-in-gpt-4o/)
[35] [Expanding on what we missed with sycophancy](https://openai.com/index/expanding-on-sycophancy/)
[36] [Where the goblins came from](https://openai.com/index/where-the-goblins-came-from/)
[37] [BUG: Claude says "You're absolutely right!" about everything (claude-code issue #3382)](https://github.com/anthropics/claude-code/issues/3382)
[38] [Introducing Claude Sonnet 4.5](https://www.anthropic.com/news/claude-sonnet-4-5)
[39] [Claude Opus 4.1 system prompts](https://platform.claude.com/docs/en/release-notes/system-prompts/claude-opus-4-1)
[40] [22 Claude-prose Patterns: A Catalog of Stylistic Attractors in Generated Texts](https://www.linkandth.ink/p/catalog-of-claude-cliches)
[41] [Jude Stiel's Shortform (LessWrong)](https://www.greaterwrong.com/posts/feTBB722jXmYAvCf2/)
[42] [Why AI Keeps Writing 'Not X, But Y'](https://brandonlazovic.dev/articles/llm-negative-parallelism-tic/)
[43] [Artificial Hivemind: The Open-Ended Homogeneity of Language Models (and Beyond)](https://arxiv.org/abs/2510.22954)
[44] [How Strong Is the Evidence for the Artificial Hivemind? Reevaluating Evidence for the Open-Ended Homogeneity of Language Models](https://arxiv.org/abs/2609.33936)
[45] [Prompting best practices](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices)
[46] [Prompting Claude Fable 5.1](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-fable-5-1)
[47] [Prompting Claude Opus 5](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-opus-5)
[48] [Prompting Claude Opus 4.8](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-opus-4-8)
[51] [Claude Fable 5.1 system prompts](https://platform.claude.com/docs/en/release-notes/system-prompts/claude-fable-5-1)
[54] [Claude Sonnet 3.5 system prompts](https://platform.claude.com/docs/en/release-notes/system-prompts/claude-sonnet-3-5)
[55] [Using GPT-6 (Model guidance)](https://developers.openai.com/api/docs/guides/latest-model)
[57] [GPT-5 prompting guide](https://developers.openai.com/cookbook/examples/gpt-5/gpt-5_prompting_guide)
[59] [Gemini 3 developer guide](https://ai.google.dev/gemini-api/docs/gemini-3)
[84] [People who frequently use ChatGPT for writing tasks are accurate and robust detectors of AI-generated text](https://arxiv.org/abs/2501.15654)
[100] [Can AI writing be salvaged? Mitigating Idiosyncrasies and Improving Human-AI Alignment in the Writing Process through Edits](https://arxiv.org/abs/2409.14509)
[102] [Towards Understanding Sycophancy in Language Models](https://arxiv.org/abs/2310.13548)
[112] [The Economist: 'How to Spot AI Writing'](https://daringfireball.net/linked/2026/08/11/economist-ai-writing)
[113] [Forget em dashes: A viral report on AI-generated writing has surprising new clues](https://www.fastcompany.com/91584243/how-to-identify-ai-generated-writing-viral-report-has-surprising-new-clues-economist)
[114] [Claude Opus 5.5 uses em-dashes 99% less often and sounds more human — but still exhibits 2,548 AI writing tells](https://venturebeat.com/data/claude-opus-5-5-uses-em-dashes-99-less-often-and-sounds-more-human-but-still-exhibits-2-548-ai-writing-tells)
[123] [ChatGPT vs Claude vs Gemini: Writing Quality Compared](https://humanizethisai.com/blog/chatgpt-vs-claude-vs-gemini-writing)
[124] [Repeated phrases in Google AI Gemini 2.5/3.0 (r/WritingWithAI)](https://www.reddit.com/r/WritingWithAI/comments/1sa2mch/repeated_phrases_in_google_ai_gemini_2530/)
[130] [How Every AI Model Writes: A Stylometric Comparison](https://www.mywritingtwin.com/blog/ai-model-writing-styles-compared)
