# Dossier: False positives, the keep list, and detection reliability

## Summary

This dossier covers what a de-AI editing pass must leave alone (F7) and how far "AI tells" can be trusted at all (F9). The evidence agrees on three points:

1. Most surface features people treat as AI tells (correct grammar, formal register, transitions, em dashes, tricolons, hedges, curly quotes, bold-label lists, "delve") have long human histories, documented genre uses, or are prescribed by style guides. Taken one at a time they are weak evidence.
2. Detection is unreliable whichever way it is done. Untrained humans perform at chance, perplexity-based detectors are biased against non-native and neurodivergent writers, OpenAI withdrew its own classifier, and paraphrase attacks defeat most detectors. The exceptions are heavy LLM users working as an ensemble and some modern trained classifiers, according to the vendors' own claims.
3. The signals that hold up are density and co-occurrence of specific items, repetition, and unsupported or generic content. A single instance of a tell is not one of them.

For /unclaude this means every scout lane needs a keep list and a density threshold. The reviewer must not "fix" a lone em dash, a calibrated hedge, a parallel list, or plain L2 prose, and must never push plain writing toward fancier diction. The dossier ends with a candidate keep list (K1 to K24).

## Facet Questions and Scope

<!-- facet: F7 -->
<!-- facet: F9 -->

F7: Which patterns that look like AI writing are legitimate human or genre conventions? Who gets falsely flagged, and what does over-correction look like?

F9: How reliable are humans, word lists, perplexity and burstiness, and commercial classifiers at telling AI text from human text? Which cues are valid and which mislead? How easily does paraphrase defeat detection?

Scope: informational and expository prose, technical documentation, and academic writing. Fiction-specific tells are out of scope.

## Source Groups and Findings

### 1. Wikipedia's "Ineffective indicators" and "Signs of human writing" (community field guide; practitioner, high-volume empirical base)

Wikipedia lists perfect grammar as an ineffective indicator, because many editors are skilled writers or come from professional writing backgrounds [1]. <!-- claim: 8f42f197c493e41d; evidence: d271398cb3d87e50; source: 216545f88fe97a24 --> It also says a mix of casual and formal registers may point to a person in a technical field, youth, playfulness, or neurodivergence [1]. <!-- claim: c007212cff682016; evidence: c1c35e4d60ca0ab3; source: 216545f88fe97a24 --> The LLM correlation holds for specific words and does not extend to formal, academic, or fancy-sounding prose in general [1]. <!-- claim: fad2cba36d6cca63; evidence: 1cffc5988f8c65b5; source: 216545f88fe97a24 --> Transition words in isolation are not a strong tell, because the pattern has precedent in human essay writing and many style guides accept it [1]. <!-- claim: ee8cada5240f351d; evidence: b3a8586defae361c; source: 216545f88fe97a24 --> The "not X but Y" contrast is common among human writers, especially in "common misconceptions" or "myths busted" listicles [1]. <!-- claim: 6a5f0696df7bea9d; evidence: 780528fd58d6f57f; source: 216545f88fe97a24 -->

The guide also names features that lean human. Qualifiers and intensifiers such as "very", "perhaps" and "tends to" are listed as signs of human writing [1]. <!-- claim: 7d3453ed5a044fde; evidence: c7f84b339ecc7d9d; source: 216545f88fe97a24 --> So are isolated wordy constructions such as "in order to", "as a result of" and "the fact that" [1]. <!-- claim: d2eea716acd7fd7c; evidence: 2f807dea41e4125c; source: 216545f88fe97a24 --> A de-AI pass that "tightens" these as if they were AI artefacts is over-correcting. They are ordinary plain-style edits, not de-AI edits.

Curly quotes alone do not prove LLM use, since Chicago-style publishing and Microsoft Word's smart quotes both produce them [1]. <!-- claim: fb2ac2271472ac56; evidence: 3451cc3ee7cba1f3; source: 216545f88fe97a24 --> Elegant variation (cycling synonyms to avoid repeating a word) can come from schooling: editors who are not native English speakers may avoid repeated words because, for example, Italian schools teach it [1]. <!-- claim: 19fd6512f4ea83fe; evidence: c604cd8f93b38ab3; source: 216545f88fe97a24 --> The guide warns that false accusations of AI use can drive away new editors and foster an atmosphere of suspicion [1]. <!-- claim: d1ecc0890b4ef0c4; evidence: 15eaaa3928972a63; source: 216545f88fe97a24 --> The companion WikiProject AI Cleanup guide adds that for non-native English speakers, content doesn't need to be written in perfect English [2]. <!-- claim: eb12c1ecb0446cac; evidence: d9d960454d480985; source: d73c5c4ced616d9e -->

The guide's positive rule is about density. One or two AI-vocabulary words may be coincidence, but an edit that introduces lots of them is one of the strongest tells [1]. <!-- claim: a36e3388fd4114de; evidence: 29e6b534d50c8b01; source: 216545f88fe97a24 --> An editing checklist from a professional editing firm says the same: an occasional em dash or triadic list is not a problem on its own, and the problem is co-occurrence [126]. <!-- claim: c849b40d9f332b02; evidence: 75fb359146c87299; source: 2d868d4de107c27b -->

Detection cue for the lanes: flag word-list items only above a density threshold, or when several different tells co-occur in one paragraph. The evidence gives no single numeric threshold. Practitioner tools use per-1k-word rates.

### 2. Genre conventions in technical and government documentation (style guides; authoritative for genre)

The Google developer documentation style guide says to end a run-in heading with a period or a colon, consistently within the list [96]. <!-- claim: d96364e015616452; evidence: e390aea6b2cf309b; source: 48486baf13318ddb --> This is the "bold label: explanation" bullet that de-AI lists often flag. The same guide prescribes the same syntax and structure for every item in a list [96]. <!-- claim: b680725005191cdb; evidence: 46d636710dfa61b5; source: 48486baf13318ddb --> In docs, parallelism is a requirement, not a tell. GOV.UK guidance says a clear structure helps users get tasks done more quickly [121]. <!-- claim: edc60bf7f055b538; evidence: d3f1bdf4cf24255e; source: b8ef6ddd6ec18f75 --> It also says headings should be descriptive and should avoid generic ones like "Introduction" [121]. <!-- claim: 21184e9b8ad28e5d; evidence: 6c2fcdf219d6bac3; source: b8ef6ddd6ec18f75 --> Digital.gov says question headings are useful when you know what questions your audience will ask [122]. <!-- claim: dd2491feca83f226; evidence: 0de972f0cc487f7d; source: f33160b06bab57d6 --> The genre rules therefore point at the real defect: generic or vague structure. Structure as such is fine.

In technical prose, the deslop skill treats domain terminology as fine and expected in scientific writing [67]. <!-- claim: 1679460072cc4ef5; evidence: 7085855a870f6a5a; source: 171c8455dd272c61 --> The unslop contract keeps force-bearing "never", "must" and "all" exactly as written in safety, security, legal and technical rules [66]. <!-- claim: 0c22c04b40981e56; evidence: bc6ee2140a4add33; source: 8870b50ae0ada072 -->

### 3. Academic register: hype words and hedging predate LLMs (peer-reviewed)

Vinkers et al. (BMJ 2015) found that the share of positive words in PubMed abstracts rose from 2.0% in 1974-80 to 17.5% in 2014, led by "robust", "novel", "innovative" and "unprecedented" [95]. <!-- claim: 22be5ade5ed4701c; evidence: f9d3a34b344a8769; source: 62014fbaad6a2a7a --> Their positive-word list includes "groundbreaking", "innovative", "novel", "promising", "remarkable", "robust", "unique" and "unprecedented", which overlap heavily with today's AI-vocabulary lists [95]. <!-- claim: 5caf864475721123; evidence: f2c7778ffe2c4157; source: 62014fbaad6a2a7a --> Inference: in academic abstracts, promotional adjectives are a pre-LLM genre habit. A de-AI lane can still flag them as inflation, but it should not treat them as evidence of AI authorship.

Hyland argues that hedges are a significant resource for academics who need to present claims with precision and caution [97]. <!-- claim: e81b6603a6f9b2e6; evidence: e0dbe8ed6108f9ec; source: debed86bb967e036 --> He also argues that the ability to hedge appropriately is essential to effective scientific communication [97]. <!-- claim: d05b4683ee1dd4bc; evidence: 854f51ae9693daac; source: debed86bb967e036 --> The fix for AI hedging is calibration, not deletion. Stacked or reflexive hedges go; a hedge that marks real uncertainty stays.

### 4. Em dash: long human history and wide human variance (peer-reviewed preprint, corpus studies, practitioner)

A punctuation-frequency corpus found that dash use rose after 1750 and peaked at about 0.35% in 1860 [27]. <!-- claim: cd6892a18dbe77f3; evidence: cf80d831744ab672; source: 59cfed295f355dae --> Freeburg reports a human baseline of 3.23 em dashes per 1,000 words, ranging from 0.33 to 17.12 across writers and genres [28]. <!-- claim: b2ef84da92957b41; evidence: 25a10978d669add6; source: 0bbcac4a1b3d1437 --> *Huckleberry Finn* scores 10.13 em dashes per 1,000 words and GPT-4.1 scores 10.62 [94]. <!-- claim: 7ea96347b2e1cfe4; evidence: c659b8ba16dbc358; source: d46fd106c5817168 --> Over-correction is already happening outside any tool: people who like em dashes have stopped using them for fear of being taken for AI [27]. <!-- claim: 991aa331126319e4; evidence: 2904a9ffde3224eb; source: 59cfed295f355dae -->

Model notes and drift: Graphite reports that GPT-6 Astra uses em dashes about one-eighth as often as human writers, Claude Opus 5 uses them at about the human rate, and Gemini 3.1 Pro has nearly stopped using them [29]. <!-- claim: 33ab02b354bcf4d3; evidence: f3cce7fd586ff878; source: 56493642657ef5f7 --> Inference: for current models the em dash is at best a Claude-specific density cue, and the threshold should sit well above the human mean. A good starting point is the writer's own baseline, or about 10 per 1,000 words, where the human tail begins to thin.

### 5. Tricolon and connective stacking (classical rhetoric; practitioner corpora)

The rule of three goes back to Aristotle ("veni, vidi, vici") [120]. <!-- claim: 7cae82bfbb84f738; evidence: 0fb28a82e3fbb5bd; source: eff07036c2ba8c9e --> Underslop found the rule of three in only 4 of 12 models' logs, and much of what a simple pattern-match caught was literal enumeration rather than rhetorical flourish [119]. <!-- claim: ae86420cae436434; evidence: 8467b3a0ef09730b; source: 1ccacfcd3eed4fbf --> The same team found zero instances of "Furthermore", "Moreover", "Additionally" and "In conclusion" used as connective stacking across 12 models [117]. <!-- claim: 92105c1d784cd7dc; evidence: 184f7607086f5618; source: 16855c7a068bda86 --> They advise students and non-native writers who were taught this structure for formal writing not to strip it out of fear [117]. <!-- claim: 17bb85b2029ab910; evidence: 96d9a4d27690f817; source: 16855c7a068bda86 --> Inference: a tricolon lane should flag only abstract, rhythm-driven triads ("clarity, efficiency, and impact"). It should not flag enumerations of real items.

### 6. "Delve" and dialect: the Nigerian English hypothesis (journalism vs. peer-reviewed counter)

The Guardian reported that "delve" is much more common in Nigerian business English than in England or the US [23]. <!-- claim: 7e5ea3f3e2cc940d; evidence: e9145b7bcfec3513; source: dac858c92771a2ab --> Juzek and Ward, testing ICE corpora, found no evidence that the focal words are especially common in any particular variety of English [9]. <!-- claim: 4e1f2e2fc3fe0bff; evidence: b5892b9c0fad1d57; source: 1c69f6f4398b13af --> The causal story behind the hypothesis (RLHF annotators) is contested. The narrower claim, that "delve" is ordinary in some dialects, still argues against treating a single "delve" as proof.

Human adoption is wearing down word lists as authorship evidence. Post-ChatGPT trend changes show faster adoption of "delve", "realm", "meticulous" and "adept" in human spoken communication [20]. <!-- claim: d31a267c4cd84c95; evidence: fc9481f60e1b1e06; source: 765e2e09c1103164 --> By the end of 2025, 89% of biomedical papers showed an excess of LLM-associated vocabulary [128]. <!-- claim: 94f7f38466497c0d; evidence: 54a0f19adc2f48ca; source: 4fe18cf282cc6857 --> Word lists also transfer poorly between model families: GPTZero's AI Vocabulary drops to near-random accuracy on Claude-generated essays [22]. <!-- claim: b7b754928e007767; evidence: d95f93a7e11d8226; source: 53ea4164260716d5 -->

### 7. Detector bias against non-native and neurodivergent writers (peer-reviewed, vendor rebuttals)

Liang et al. (2023) found that seven detectors misclassified over half of the TOEFL essays they tested as AI-generated (average false-positive rate 61.22%), while their accuracy on US 8th-grade essays was near-perfect [83]. <!-- claim: ad7a7eebdce72e32; evidence: 6d4ab2e36ca1e5f2; source: 05ea0961d7fe712d --> The essays that every detector flagged had significantly lower perplexity [83]. <!-- claim: 7d377fa74ff95031; evidence: d7d6a51eef428220; source: 05ea0961d7fe712d --> Rewriting the essays with a richer vocabulary cut the average false-positive rate from 61.22% to 11.77% [83]. <!-- claim: ec822a76a11ad322; evidence: 0678f84a40b7a1ea; source: 05ea0961d7fe712d --> The authors note the paradox: to avoid false detection, these writers may need AI tools to refine their vocabulary [83]. <!-- claim: 783aff6dbd001cf8; evidence: 5c988b30e72f3291; source: 05ea0961d7fe712d --> For /unclaude, the over-correction this predicts is real. A pass that treats plain, low-variety prose as "robotic" would push writers toward exactly the fancy diction that word-list lanes flag.

In a study of a GPT-2-based detector, posts from a likely-autistic corpus were significantly more likely to be flagged as AI [98]. <!-- claim: ca7fef578a1479ae; evidence: d78d1d8fa753f8d1; source: 0e3fa0b204716094 --> Pangram argues that non-native speakers, and by extension neurodiverse students and students with disabilities, are more vulnerable to perplexity-based detectors [89]. <!-- claim: 19834345d551dc31; evidence: c947d927c347ff58; source: 54724b8c04f5f621 --> The harm shows up in behaviour: one student said he sometimes "dumbs down" his work by leaving words misspelled or using Spanish sentence structures to avoid accusations [81]. <!-- claim: 5c46f80da362f52b; evidence: 76613c2d7eeec6b5; source: ba9147a911779d1c -->

### 8. Human detection ability (peer-reviewed: Clark 2021, Jakesch PNAS 2023, Russell 2025)

Clark et al. found that untrained evaluators told GPT-3 text from human text at chance level [86]. <!-- claim: 538682aed5b63366; evidence: ebef66163b68c250; source: 55f3ee831a0c77e3 --> Evaluators cited formality, spelling and grammar errors, and clarity to justify both "human" and "machine" judgments [86]. <!-- claim: 97325fb446417ebb; evidence: bbe864c924c8b7dc; source: 55f3ee831a0c77e3 --> Jakesch et al. found that 4,600 participants could not detect AI-written self-presentations and relied on flawed heuristics such as first-person pronouns, contractions and family topics [87]. <!-- claim: 611f47ef2a40e578; evidence: 39e604208e0c18ac; source: 1c828b523d9d3c8f --> In their data, most texts with long words or rare bigrams were written by humans, and grammatically flawed texts were 15% less likely to be AI-generated [87]. <!-- claim: e0605a129f53939e; evidence: 214872c93f7e2315; source: 1c828b523d9d3c8f --> One cue did hold: texts with repetitive content were 47% more likely to be AI-generated [87]. <!-- claim: 077bd06f435dc592; evidence: 5242b4131d304601; source: 1c828b523d9d3c8f -->

Russell et al. (2025) found that annotators with little LLM experience performed close to chance, with an average true-positive rate of 56.7% and false-positive rate of 52.5% [84]. <!-- claim: d775b09755955c06; evidence: 578f3963eb6eaca3; source: 94bc1872a6410141 --> A majority vote of five expert annotators misclassified only 1 of 300 articles and beat most commercial and open-source detectors, even against paraphrasing and humanization [84]. <!-- claim: d210661be547e208; evidence: 2e31cda1d914b3c7; source: 94bc1872a6410141 --> Non-experts took any fancy or low-frequency word, grammatically correct sentences, and a neutral tone as signs of AI. Experts knew that humans make more grammatical errors [84]. <!-- claim: 8692cf84c5873951; evidence: 4b9b5f3e32c6478c; source: 94bc1872a6410141 --> Even experts slipped on vocabulary: 31% of their false-positive explanations mentioned words like "delve" and "crucial" appearing in human-written text [84]. <!-- claim: a59be6b8cee75a59; evidence: d328249752de8138; source: 94bc1872a6410141 --> Informality was also a weak signal of human authorship: o1-Pro's frequent contractions and colloquialisms fooled one expert [84]. <!-- claim: a4e25ce255b068b0; evidence: 2c42bce11b9eb484; source: 94bc1872a6410141 --> Inference: when a de-AI pass sprinkles in contractions and slang to "sound human", it adds a cheap disguise, not quality.

### 9. Automated detectors: withdrawals, vendor claims, perplexity critiques, paraphrase attacks (vendor docs, peer-reviewed)

OpenAI withdrew its AI classifier on July 20, 2023, citing its low accuracy [85]. <!-- claim: 9515096f0eb1a284; evidence: 04588146461d9ec3; source: ddac8850e482fa2b --> The classifier caught 26% of AI-written text and labelled human text as AI 9% of the time [85]. <!-- claim: e9001b3cfb564a24; evidence: 9757e9d425be22cf; source: ddac8850e482fa2b --> OpenAI said it was very unreliable on texts under 1,000 characters [85]. <!-- claim: a570c6e793592b76; evidence: 9c471ee762e768a7; source: ddac8850e482fa2b --> It also said that highly predictable text, such as a list of the first 1,000 primes, cannot be reliably attributed at all [85]. <!-- claim: 861cbacc2ccbfb62; evidence: 02d25d00b083ba97; source: ddac8850e482fa2b --> Weber-Wulff et al. concluded that the detection tools they tested were neither accurate nor reliable [99]. <!-- claim: 34b181e541d522e8; evidence: 6268e753ef51d223; source: ba9efe239a910f20 -->

Perplexity and burstiness are now discredited even by vendors. GPTZero dropped them in autumn 2023 when it moved to a deep-learning architecture [88]. <!-- claim: 40c2ebd2f775d104; evidence: 7e20b52c344650df; source: cf2471251fdfd300 --> Pangram points out that perplexity-based detectors classify the Declaration of Independence as AI-generated because the text appears so often in training data [89]. <!-- claim: e0119c59e26185aa; evidence: 94c8701616abcca5; source: 54724b8c04f5f621 -->

Turnitin reports a document-level false-positive rate below 1% for documents with 20% or more AI writing [90]. <!-- claim: f6fef2f865ab7320; evidence: bbc6cf37266f4379; source: cde18f8fd0881646 --> Its sentence-level false-positive rate is about 4% and is higher at transitions between human and AI text [90]. <!-- claim: ba89ced6cc368bdf; evidence: 71d020881de40792; source: cde18f8fd0881646 --> Turnitin also found a "slightly higher-than-comfortable" false-positive rate on submissions under 300 words [92]. <!-- claim: 694ef1f8a9943b2c; evidence: 9cc9e620823822ad; source: d478969eecdde094 --> Inference: per-sentence and short-passage judgments are the least reliable. That applies directly to /unclaude, which works passage by passage.

Paraphrase attacks: DIPPER paraphrasing cut DetectGPT's accuracy from 70.3% to 4.6% at a 1% false-positive rate [71]. <!-- claim: d1f049451d7ed68b; evidence: 96aef74f2c48e4cc; source: 83e70f1452f01d94 --> Recursive paraphrasing can sharply reduce detection while only slightly degrading text quality [72]. <!-- claim: 5679380f1d6506ca; evidence: 98206d199eef8358; source: bb58e1dce57ecd0d --> In Liang et al., a single self-edit prompt asking for "literary language" reduced detection from 100% to 13% [83]. <!-- claim: ed49e0f5e46082c4; evidence: e34b07d937e66487; source: 05ea0961d7fe712d --> Inference: detector scores are not a usable quality target for /unclaude. The goal is better text for readers, and "passes GPTZero" is a different goal.

## Counterevidence and Disagreements

- **Liang's sample size.** Turnitin argues that Liang's claim rests on just 91 TOEFL practice essays, all under 150 words [92]. <!-- claim: da5eef442038ef16; evidence: f7606e9e484d6aa3; source: d478969eecdde094 --> Pangram reports a false-positive rate of 0.078% on ESL text, not significantly above its general rate of 0.01% [93]. <!-- claim: a5cf2151eb60febf; evidence: 80d00aa1bf8e7322; source: 1f8a039932cba328 --> Pangram also reports that GPTZero self-reports a 1.1% false-positive rate on Liang's TOEFL set, while 6.6% of that set is still labelled "Possible AI content" [93]. <!-- claim: 4088e5c885783409; evidence: 7844121029651ca5; source: 1f8a039932cba328 --> These are vendor self-reports from interested parties. They suggest that trained classifiers have reduced the ESL bias of perplexity-era tools. They do not touch the keep-list point, which is about which surface features a human or LLM editor should treat as tells.
- **Experts can detect.** Russell's expert ensemble is near-perfect, which cuts against "detection is hopeless". It is consistent with this dossier, though: the experts succeed by keying on specific overused words and on co-occurrence, while generic formality and grammar mislead everyone.
- **Hedging direction.** Hyland treats hedging as a core scholarly device. Separately, publicly deployed LMs are reported to be unable to express uncertainty and to be overconfident [108]. <!-- claim: 96655d8b0f0433e1; evidence: 559c5ba249eed043; source: e641ec293c4b9c0f --> So "LLMs over-hedge" holds only for style (stacked qualifiers). It does not hold for epistemic calibration, and deleting hedges can make text wrongly confident.
- **Dialect hypothesis.** The Guardian's Nigerian-English account and Juzek and Ward's corpus null result disagree on why models favour "delve". Both support keeping the word when it appears alone.
- **List drift.** The WikiProject AI Cleanup guide says that, as of August 2026, much of WP:AISIGNS is outdated for the most recent models [2]. <!-- claim: f23a51fd2ab0abbe; evidence: f90728abc43f2e38; source: d73c5c4ced616d9e --> Keep lists and hunt lists both drift. Em-dash rates now differ across GPT, Claude and Gemini.

## Methodological Limits and Open Gaps

- No study gives a validated per-passage density threshold for any single tell. The thresholds proposed below are inferences from human baseline ranges.
- The neurodivergence evidence comes from one GPT-2-era detector on Reddit posts. Whether modern classifiers, or LLM-based scout lanes, over-flag autistic writing is untested.
- The vendor false-positive figures (Turnitin, Pangram, GPTZero) are self-reported and not independently replicated in the evidence base.
- The Russell et al. findings cover edited US nonfiction articles under 1,000 words. Their transfer to technical documentation or chat replies is unknown.
- The evidence does not show whether an LLM reviewer agent applying a keep list actually avoids over-correction. This needs an eval with human-written control passages run through /unclaude.
- The "delve" causal story is contested and not resolved by the evidence.

## Proposed lane material

**Cross-cutting rule for all lanes (not a separate lane): "keep-list gate".** Every scout finding passes three checks before the reviewer acts on it. (a) Is it a density or co-occurrence hit, or a single instance? Single instances of weak tells are reported as "info" and not fixed. (b) Is it inside a protected context: quotation, title, proper name, code, a passage that discusses the phrase, or a legal, safety or security rule? (c) Does the genre prescribe it (docs lists, academic hedges)? The reviewer should check that each fix improves the text for a reader. It should not fix things to lower a detector score, and must never add slang, contractions or errors to "sound human".

**Optional lane `overcorrection` (whole document, run after the fix pass as a regression check).** Hunt: hedges deleted where the claim is uncertain; absolutes ("must", "never") softened in rules; parallel list items made non-parallel; descriptive headings removed; plain L2 phrasing replaced with fancier synonyms; the em-dash rate pushed far below the writer's own baseline; injected colloquialisms; enumerations of real items broken up because they had three members.

**Candidate keep list:**

- K1. Correct grammar and spelling. Not a tell. Humans make more errors, but polish is not evidence.
- K2. Formal, academic or "fancy" register in general. Only specific overused words count.
- K3. Mixed casual and formal register. It is common among technical writers, young writers and neurodivergent writers.
- K4. Single transition words ("However", "Additionally") in isolation. Flag only stacked, paragraph-initial runs.
- K5. "Not X but Y" when the negative half corrects a belief the reader actually holds, or when both halves carry information.
- K6. Ordinary hedges and qualifiers ("perhaps", "tends to", "very"), and calibrated academic hedges. Remove stacked or reflexive hedges only.
- K7. Plain wordy constructions ("in order to", "the fact that"). These are a plain-style edit, not a de-AI edit.
- K8. Curly or typographic quotes and apostrophes.
- K9. Em dashes at or below the writer's own rate, or below roughly 10 per 1,000 words when there is no writer sample. Never flag one dash alone.
- K10. Tricolons that enumerate real, distinct items. Flag only abstract rhythmic triads, and only when they repeat.
- K11. Bold run-in labels with a colon in reference lists. Google style prescribes them. Flag only in narrative prose, or where the labels just repeat the body.
- K12. Parallel list syntax, and a full lead-in sentence before a list. Both are prescribed by doc style guides.
- K13. Descriptive headings, and question headings in task-oriented or government content. Flag only generic headings ("Introduction", "Overview", "Conclusion").
- K14. Domain terminology and technical jargon used precisely.
- K15. Force-bearing absolutes ("must", "never", "all") in safety, security, legal and technical rules.
- K16. Single occurrences of listed AI words ("delve", "crucial", "robust", "deep dive"). Flag only on density or co-occurrence.
- K17. Promotional adjectives in academic abstracts as evidence of AI. A pre-LLM genre trend. The inflation lane may still trim them for accuracy.
- K18. Elegant variation and avoidance of repetition by non-native writers trained to avoid repeating words. Flag only when the synonyms cause confusion about the referent.
- K19. Plain, low-variety vocabulary and simple syntax (L2 and ESL writers). Never "enrich" it.
- K20. Essay connectives ("Furthermore", "In conclusion") in student or L2 formal writing taught that way. Suggest; don't force.
- K21. Words, phrases and punctuation inside quotations, titles, proper names, code, or passages that discuss the phrase.
- K22. Unsourced content as an AI signal. Missing citations predate LLMs. A factuality lane may still flag it.
- K23. Neutral tone. Not an AI marker on its own.
- K24. Mixed-authorship transition zones. Sentence-level flags there are the least reliable, so the reviewer should look for co-occurring tells before editing.

**Per-model notes:** em-dash density is mainly a Claude cue now (about the human rate in Opus 5, so a density threshold matters most for Claude). GPT and Gemini under-use dashes, so absence of dashes means nothing. ChatGPT-derived word lists generalise poorly to Claude, so Claude needs its own list.

**Reliability guidance for the skill's report:** never present findings as an authorship verdict. Short passages under about 300 words or 1,000 characters are undecidable. Valid high-weight cues are repetition, generic or unsupported content, and dense co-occurrence of specific items. Invalid cues are grammar, formality, neutral tone, long words, and single dashes.

## Bibliography

[1] [Wikipedia:Signs of AI writing](https://en.wikipedia.org/wiki/Wikipedia:Signs_of_AI_writing)
[2] [Wikipedia:WikiProject AI Cleanup/Guide and resources](https://en.wikipedia.org/wiki/Wikipedia:WikiProject_AI_Cleanup/Guide_and_resources)
[9] [Why Does ChatGPT “Delve” So Much? Exploring the Sources of Lexical Overrepresentation in Large Language Models](https://arxiv.org/abs/2412.11385)
[20] [Empirical evidence of Large Language Model's influence on human spoken communication](https://arxiv.org/abs/2409.01754)
[22] [Can GPTZero’s AI Vocabulary Distinguish Between LLM-Generated and Student-Written Essays?](https://aclanthology.org/2025.bea-1.71/)
[23] [TechScape: How cheap, outsourced labour in Africa is shaping AI English](https://www.theguardian.com/technology/2024/apr/16/techscape-ai-gadgest-humane-ai-pin-chatgpt)
[27] [Why do AI models use so many em-dashes?](https://www.seangoedecke.com/em-dashes/)
[28] [The Last Fingerprint: How Markdown Training Shapes LLM Prose](https://arxiv.org/abs/2603.27006)
[29] [AI Tells](https://graphite.io/five-percent/research/ai-tells)
[66] [unslop SKILL.md and references/core-contract.md](https://github.com/theclaymethod/unslop)
[67] [deslop SKILL.md (De-AI-ify scientific writing)](https://github.com/stephenturner/skill-deslop)
[71] [Paraphrasing evades detectors of AI-generated text, but retrieval is an effective defense](https://arxiv.org/abs/2303.13408)
[72] [Can AI-Generated Text be Reliably Detected?](https://arxiv.org/abs/2303.11156)
[81] [To avoid accusations of AI cheating, college students turn to AI](https://www.nbcnews.com/tech/internet/college-students-ai-cheating-detectors-humanizers-rcna253878)
[83] [GPT detectors are biased against non-native English writers](https://arxiv.org/abs/2304.02819)
[84] [People who frequently use ChatGPT for writing tasks are accurate and robust detectors of AI-generated text](https://arxiv.org/abs/2501.15654)
[85] [New AI classifier for indicating AI-written text](https://openai.com/index/new-ai-classifier-for-indicating-ai-written-text/)
[86] [All That's 'Human' Is Not Gold: Evaluating Human Evaluation of Generated Text](https://aclanthology.org/2021.acl-long.565)
[87] [Human heuristics for AI-generated language are flawed](https://doi.org/10.1073/pnas.2208839120)
[88] [What is perplexity & burstiness for AI detection?](https://gptzero.me/news/perplexity-and-burstiness-what-is-it/)
[89] [Why Perplexity and Burstiness Fail to Detect AI](https://www.pangram.com/blog/why-perplexity-and-burstiness-fail-to-detect-ai)
[90] [Understanding the false positive rate for sentences of our AI writing detection capability](https://www.turnitin.com/blog/understanding-the-false-positive-rate-for-sentences-of-our-ai-writing-detection-capability)
[92] [New research: Turnitin's AI detector shows no statistically significant bias against English Language Learners](https://www.turnitin.com/blog/new-research-turnitin-s-ai-detector-shows-no-statistically-significant-bias-against-english-language-learners)
[93] [How accurate is Pangram AI Detection on ESL?](https://www.pangram.com/blog/how-accurate-is-pangram-ai-detection-on-esl)
[94] [Is the Em Dash an AI Tell? We Measured Dash Density Across Human vs AI Texts (2026)](https://slopdetector.org/blog/em-dash-ai-tell-data)
[95] [Use of positive and negative words in scientific PubMed abstracts between 1974 and 2014: retrospective analysis](https://doi.org/10.1136/bmj.h6467)
[96] [Lists | Google developer documentation style guide](https://developers.google.com/style/lists)
[97] [The Author in the Text: Hedging Scientific Writing](https://files.eric.ed.gov/fulltext/ED390258.pdf)
[98] [The Misclassification of Autistic Writing as AI-Generated](https://arxiv.org/abs/2607.14729)
[99] [Testing of Detection Tools for AI-Generated Text](https://arxiv.org/abs/2306.15666)
[108] [Relying on the Unreliable: The Impact of Language Models' Reluctance to Express Uncertainty](https://arxiv.org/abs/2401.06730)
[117] ["In conclusion," "furthermore," "moreover": the AI cliché with no data behind it](https://underslop.com/tells/in-conclusion-cliche)
[119] [The rule of three: the AI tell our own data argues against](https://underslop.com/tells/rule-of-three)
[120] [The internet made a ban list for AI writing. I'm making a case for the defense](https://robotsatemyhomework.substack.com/p/ai-writing-patterns)
[121] [Create a clear structure for your content - GOV.UK content and publishing guidance](https://guidance.publishing.service.gov.uk/writing-to-gov-uk-standards/writing-guidelines/clear-structure/)
[122] [Headings | Digital.gov (Plain language guide)](https://digital.gov/guides/plain-language/design/headings)
[126] [AI Editing Checklist: How We Edit AI Drafts](https://proofed.com/knowledge-hub/ai-editing-checklist-how-to-spot-and-fix-ai-writing-patterns)
[128] [Most biomedical publications show signs of LLM-assisted writing](https://arxiv.org/abs/2608.10715)
