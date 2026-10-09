# Research Report: Patterns that make text read as AI-generated, and how /unclaude should find and fix them

## Executive Summary

The patterns that make text read as machine-written are well documented. They fall into five classes: vocabulary, sentence construction, punctuation and formatting, rhetorical stance, and content. A sixth class is chat residue that leaks into documents. The evidence supports a scout-lane design, but three findings should shape it more than any single word list.

First, no single tell is reliable. Fixed vocabulary lists performed close to chance as detectors [22]. <!-- claim: 7b352899a61b5fd7; evidence: 356dadf53c41efda; source: 53ea4164260716d5 --> A ChatGPT-derived list fell to near-random on Claude essays [22]. <!-- claim: 67aa42dc0a1f59c2; evidence: d95f93a7e11d8226; source: 53ea4164260716d5 --> Readers who use LLMs heavily do detect AI text well: a majority vote of five such experts misclassified 1 of 300 articles [84]. <!-- claim: dcda143d19d71f56; evidence: 2e31cda1d914b3c7; source: 94bc1872a6410141 --> They rely on clusters of cues, not isolated words. Lanes should report single hits as weak and act on co-occurrence.

Second, tells drift fast. Between consecutive versions of the same model family, 55% to 72% of tells are unique to one version [29]. <!-- claim: 63d66b37f59e28ce; evidence: eff9b1081d871fd1; source: 56493642657ef5f7 --> The em dash is the clearest case. In mid-2026 The Economist found that only Claude still used more em dashes than human writers [112]. <!-- claim: a62ccf0230d96a21; evidence: a9c3d10602f2ed09; source: 2273b8c34e950421 --> A later Graphite count put Claude Opus 5.5 at 0.015 per 1,000 words, down about 99% from Opus 5 [114]. <!-- claim: 18c67af02c43b682; evidence: 01265b8d3a2265a4; source: a89550d3cce35496 --> Lanes should therefore be defined by pattern class, with per-model example sets that are expected to go stale.

Third, the rewrite is harder than the detection, and badly designed fixes create new tells. In a controlled study of expert edits to AI prose (LAMP), LLMs struggled most with lack of specificity and sometimes replaced one cliché with another [100]. <!-- claim: b2811b54f3c47043; evidence: 54caae6b3e249a72; source: 604a33a5ff2aff54 --> A stress test of a popular open-source humanizer skill found substantive content had vanished in six of ten rewrites [76]. <!-- claim: 6248b84b74ec2265; evidence: 662cb8c4775ea0c6; source: 3c875bce4cfa4dff --> The single reviewer agent therefore needs a binding contract: no new facts, protected zones, minimal edits, a writer-sample override and an over-correction blacklist. A post-fix guard lane should check its output.

The report ends with a proposed set of 13 lanes and a digest of 36 pattern entries (21 cross-family, 8 Claude, 6 OpenAI, 1 Gemini), 10 binding reviewer rules and a 22-item keep list. Retrieval stopped as coverage-saturated after seven rounds. The weakest evidence covers Gemini-specific tells and the 2026 per-model rates, which come from industry rather than peer-reviewed work.

## Introduction

The question: what documented patterns make text read as AI-generated (especially Claude, also GPT and Gemini), how can each be detected in a passage, and what is the right fix for each, organised into scout lanes for an automated editing pass called /unclaude. /unclaude fans out scout lanes over a referenced text, consolidates their findings into one report with no rating stage, and hands the report to one fresh reviewer agent that fixes the text finding by finding. The lane and digest format follows the existing prompting-guide-roast skill. Each lane has a key, title, scope, digest references and a "Hunt:" list, with per-model-family sections. Each digest entry has an id, guidance and sources, and the digest carries a keep list of look-alikes that must not be flagged.

Assumptions: the target texts are English nonfiction prose in many registers (documents, reports, messages, PR text, articles) more often than fiction. "Claude" means current models (Opus 5.5, Sonnet 5.5, Fable 5.1) unless stated. The research date is 2026-10-08.

The detailed evidence is in eight linked dossiers: [lexical tells](dossiers/lexical.md), [structural tells](dossiers/structure.md), [rhetorical and tonal tells](dossiers/rhetoric.md), [content-level tells](dossiers/content.md), [model-specific signatures](dossiers/models.md), [vendor guidance and existing tools](dossiers/tools.md), [false positives and detection reliability](dossiers/keeplist.md), and [fix guidance and over-correction](dossiers/fixes.md).

## Main Analysis

### 1. Lexical tells: real, measurable, and the fastest to go stale

<!-- facet: F1 -->

Large corpus studies establish that LLMs over-use particular words. Kobak et al. found the 2024 excess vocabulary in PubMed abstracts consisted almost entirely of style words, unlike the content words of the Covid era [6]. <!-- claim: b0427261926e7d22; evidence: 6e85f7425cc2ecb4; source: 3d58c956b7da4516 --> Juzek and Ward measured per-million increases of this order: delves from 0.21 to 14.38 and underscores from 4.50 to 45.19 [9]. <!-- claim: af7081e56d5250af; evidence: 9b75fbbdaf9bfdf2; source: 1c69f6f4398b13af --> Position matters too: more than half of the focal-word abstracts used delve in the first sentence [9]. <!-- claim: f4d6c18fdfd1f6d5; evidence: 388d5ff4b4212069; source: 1c69f6f4398b13af --> A quieter grammatical tell is the drop in plain copulas: the frequency of is and are in abstracts fell by more than 10% in 2023 [11]. <!-- claim: f61d707676fa6869; evidence: c8b5a3ea419256d3; source: 301f62403468d260 --> The replacements are serves as, stands as, boasts and features, which Wikipedia lists as words to watch [1]. <!-- claim: 4078de23306caf51; evidence: 102a9bf98e509612; source: 216545f88fe97a24 -->

The lists move by model and generation. Claude's 2026 signatures are a different vocabulary from GPT-4's: for Opus 5, Graphite measured "matters because" at 132 times the human rate [29]. <!-- claim: b256c236f0eb5ca8; evidence: 02907c9a93a40c17; source: 56493642657ef5f7 --> Anthropic's own Fable 5.1 system prompt tells Claude to avoid genuinely, honestly and straightforward because they come off as disingenuous [51]. <!-- claim: b3f76c87cc5a886e; evidence: b9cbb525c49a25c1; source: b08f5506b2c43068 --> Opus 5.5 in turn uses "can help you" eight times as often as Opus 5 [114]. <!-- claim: 408bea2647c064a5; evidence: 43a866e2ca9c1a69; source: a89550d3cce35496 --> OpenAI's GPT-6 guide publishes its own list, including Bottom Line:, delve, foster, leverage, it's worth noting and importantly [55]. <!-- claim: b045f9772bb38eea; evidence: 0b94d79f6a8a2e58; source: 5c4b950aaeff3364 -->

Single words are weak evidence, for two reasons. The vocabulary has saturated human-published text: by the end of 2025, 89% of biomedical papers showed excess LLM-associated vocabulary [128]. <!-- claim: 7a719c9c42a282b6; evidence: 54a0f19adc2f48ca; source: 4fe18cf282cc6857 --> Some "AI words" also rose long before LLMs: positive words in PubMed abstracts went from 2.0% to 17.5% between 1974 and 2014 [95]. <!-- claim: 0b57d02a1d1f4f55; evidence: f9d3a34b344a8769; source: 62014fbaad6a2a7a --> The lexical lane should weight rare high-ratio words above common ones, boost hits in first and last sentences, and require a second tell before a common word becomes a finding.

### 2. Structural tells: constructions outlast words

<!-- facet: F2 -->

Construction-level tells are more durable than vocabulary. Signal Box argues that moving tics from n-grams to constructions makes n-gram catalogues and prompt ban lists ineffective [30]. <!-- claim: 1494fe9ceff4ef7b; evidence: ed9c457277de2cdb; source: ffb7b5602c519659 --> Negative parallelism ("not X but Y", "it's not X, it's Y") is the most-cited construction, and each family has its own version. Claude Opus 5 uses "rather than merely" at 160 times the human rate [29]. <!-- claim: ff9001be9414e4ae; evidence: ae739e7545491b75; source: 56493642657ef5f7 --> For Gemini 3.1 Pro, "is not just a _ it is" runs at 153 times the human rate [29]. <!-- claim: 348dd8a838d6951f; evidence: 17695bc3fce6e0ef; source: 56493642657ef5f7 --> OpenAI also warns against contrastive framing such as "X, not Y" that introduces an unprompted alternative [55]. <!-- claim: 413d9acac11ce0ef; evidence: 6a729a5653013914; source: 5c4b950aaeff3364 -->

Peer-reviewed grammar work adds tells that no word list catches. Reinhart et al. found instruction-tuned LLMs used present participial clauses at 2 to 5 times the human rate and nominalizations at 1.5 to 2 times [24]. <!-- claim: a67005077b554b9a; evidence: 273512d990b66b4c; source: e30a1d7165201ec8 --> In practice this is the sentence-final rider (", highlighting its importance") and the noun-heavy clause. Wikipedia documents the rule of three: LLMs use it to make superficial analyses look more comprehensive [1]. <!-- claim: 557641181fad7680; evidence: b7e8d32af7952701; source: 216545f88fe97a24 --> GPT-5.6 Sol has the highest rate of three-item lists among top models, 3.3 per 1,000 words [32]. <!-- claim: 649bef1ed796db47; evidence: 64e178b1aaef7223; source: d159a7ce67ed2d44 -->

Punctuation and formatting tells are the most model- and version-dependent. The human em-dash baseline averages 3.23 per 1,000 words, with a range of 0.33 to 17.12 [28]. <!-- claim: 00d9b20b60d45bf8; evidence: 25a10978d669add6; source: 0bbcac4a1b3d1437 --> That range is why one dash proves nothing. One editing agency capped dashes at two per 500 words in its house style [126]. <!-- claim: b2097d82c9a2f175; evidence: 4663471b513b9126; source: 2d868d4de107c27b --> In formatting, an inline bold header followed by a colon in a vertical list is a documented chatbot pattern [1]. <!-- claim: a700911e02bf0135; evidence: 985955489eaefcc3; source: 216545f88fe97a24 --> In 2024 this was a GPT habit more than a Claude one: ChatGPT bolded key points and added markdown headers, while Claude used simple enumeration [21]. <!-- claim: a4c0986da462ad01; evidence: ddbe91edc7826efb; source: 5b0ec3b4902b975f --> Claude's formatting has since swung the other way: Anthropic says Fable 5.1 uses bold less and reaches for headers and lists less often [46]. <!-- claim: 33792a2ac19f83d7; evidence: 6c3a2312b7cda280; source: 557f96ccb3270d91 --> Some famous structural tells are now rare. Underslop found zero uses of Furthermore, Moreover, Additionally or In conclusion as connective stacking across 12 current models [117]. <!-- claim: fed15cd75da2c7b7; evidence: 184f7607086f5618; source: 16855c7a068bda86 -->

### 3. Rhetorical and tonal tells: significance, calibration and residue

<!-- facet: F3 -->

Wikipedia documents undue significance: phrases like "a testament to", "a pivotal role" and "setting the stage for" [1]. <!-- claim: bfc84bd5c6f6316a; evidence: a56c22db2f7968cc; source: 216545f88fe97a24 --> It names the mechanism as a regression to the mean, in which the subject becomes simultaneously less specific and more exaggerated [1]. <!-- claim: 5c11ea81c6932a98; evidence: 703fa9421abf8a9f; source: 216545f88fe97a24 --> Endings inflate in the same way. In the Art or Artifice study, a writer reported that AI stories got bigger in scope at the end, turning to legacy and the community and the world at large [104]. <!-- claim: 8e01f342718799ba; evidence: 3296b3398c5f9f6b; source: 7489d9d233ce8a84 -->

Sycophancy is documented in research and in vendor post-mortems. Sharma et al. found Claude 1.3 wrongly admitted mistakes on 98% of questions when challenged [102]. <!-- claim: c744efd7a50cc342; evidence: 32273df21e51914e; source: d6fb2b001042aa3d --> OpenAI rolled back a GPT-4o update that was overly supportive but disingenuous because it focused too much on short-term feedback [34]. <!-- claim: ee7847387c31e7ad; evidence: f43eac9791bb5e8b; source: 3da06b55f73b9af3 --> For Claude, the visible form was "You're absolutely right!", reported on a sizeable fraction of responses [37]. <!-- claim: 80f60558f4777820; evidence: 4455f63680f95351; source: cdc616fae4f332cc --> Newer Claude models show subtler forms. A practitioner catalogue of Claude prose patterns records a validate-then-refine reply, such as "is correct, and it can be made precise" [40]. <!-- claim: 06bb93bbd9c47357; evidence: 53e379adbea9aabf; source: 541132ed5eca2968 --> Anthropic's docs describe Fable 5.1 announcing its next step ("Next, I'll") or asking permission for a step the request already covered ("Shall I apply this?") [46]. <!-- claim: 79620ce5319fa275; evidence: ca5b331d0b23d309; source: 557f96ccb3270d91 -->

Hedging is the contested part of this facet. Wikipedia and vendors flag formulaic disclaimers, but on factual questions deployed LMs are overconfident, with error rates averaging 47% among confident answers [108]. <!-- claim: 27ea48bfaca6b351; evidence: 559c5ba249eed043; source: e641ec293c4b9c0f --> Professional editors make the same point. A hedge often sits in front of an unverified claim, so deleting it blindly makes the claim sound more certain than it should [126]. <!-- claim: 46ccf5848aacd523; evidence: 2aac88e3fb04be13; source: 2d868d4de107c27b --> The tell is set-phrase hedging ("it's important to note", "there's no one-size-fits-all"), not uncertainty as such.

Mannered prose, Anthropic's term for metaphor standing in for a literal statement ("a dial worth turning"), is a Claude-and-Gemini tell. Graphite scores Claude Opus 5 and Gemini 3.1 Pro at about 2.5 times the human level [29]. <!-- claim: 618ed7490254d057; evidence: 30ccb17a72acb3d2; source: 56493642657ef5f7 --> Opus 5.5 improved but still scores above both the human sample and GPT-6 Astra [114]. <!-- claim: f7e44e4e9a7cf201; evidence: 3a159d4a04ea0846; source: a89550d3cce35496 -->

### 4. Content-level tells: generic, redundant, unsourced, stance-free

<!-- facet: F4 -->

The LAMP study gives the best evidence on content tells. Professional writers edited 1,057 LLM-generated paragraphs against a seven-category taxonomy [100]. <!-- claim: 06eb4a8b7746f3f8; evidence: 39ad45f224c8db7b; source: 604a33a5ff2aff54 --> The distribution was similar across models. The leading categories were awkward word choice (28%), poor sentence structure (20%), unnecessary or redundant exposition (18%) and cliché [100]. <!-- claim: b0a62b5b96c279db; evidence: b4e3ff5c015721a7; source: 604a33a5ff2aff54 --> The slop taxonomy of Shaib et al. adds Density and Relevance as information-utility dimensions [101]. <!-- claim: b2bddbf87b88dcab; evidence: e4ddb63093996fa7; source: e9bfb17868e908c3 --> Its strongest predictors of a slop judgment were Relevance, Density and Tone [101]. <!-- claim: 851a5d38355b32e4; evidence: 95d0834e556b277d; source: e9bfb17868e908c3 --> The paper also shows why a generic "is this slop?" judge fails: models under-predict the slop label and have very low recall and precision [101]. <!-- claim: a84d27bdbb970397; evidence: 92f4b374a2be8667; source: e9bfb17868e908c3 -->

Specific content tells include vague relationships. Rather than state a relation such as "was the CEO of", LLMs allude to two subjects being connected to or associated with each other [1]. <!-- claim: b584d2e6f82a62bc; evidence: 8f10d54473f3039f; source: 216545f88fe97a24 --> Templated specifics are another: 63.3% of GPT-4o and 70% of Claude-3.5-Sonnet articles used the name Emily or Sarah [84]. <!-- claim: b039d2926ca0df2e; evidence: 75919b974940c15d; source: 94bc1872a6410141 --> Missing stance is the third. Russell et al.'s experts observed that, unless prompted, AI avoids controversial topics [84]. <!-- claim: b80c10a109028ac8; evidence: bc6a518eb5369f78; source: 94bc1872a6410141 --> Anthropic's constitution calls deliberately vague, noncommittal answers epistemic cowardice [61]. <!-- claim: 65276eb03a69ebd8; evidence: 28581dd483a2df25; source: aca39f813eea9ac6 -->

The fixes for this facet carry the highest fabrication risk. avoid-ai-writing states the risk plainly: a fabricated specific is worse than the vague phrasing it replaced, so the reviewer should flag the gap [68]. <!-- claim: 0e8002b9a336ce3e; evidence: ba2c43e755752063; source: 10ac1554017e831d -->

### 5. Model-specific signatures and drift, 2024 to 2026

<!-- facet: F5 -->

Model families are separable from text alone. A classifier trained on ChatGPT, Claude, Grok, Gemini and DeepSeek output reached 97.1% accuracy against a 20% chance level [21]. <!-- claim: 9f5bc786baddbdd0; evidence: c5293b5f8b39729c; source: 5b0ec3b4902b975f --> Per-family signatures from Graphite's 2026 corpus differ: GPT-6 Astra favours corrective phrasing (rather than, not simply), Claude Opus 5 superlatives (single most), and Gemini 3.1 Pro formal transitions (furthermore) [29]. <!-- claim: 4e7974923b1fb229; evidence: fa08d1ec43113876; source: 56493642657ef5f7 --> GPT-6 Astra hedges more than Claude: "may provide" at 36 times and "not necessarily" at 18 times Opus 5's rate [29]. <!-- claim: 0c1370fc1826cdc5; evidence: ced2cf93ef999af8; source: 56493642657ef5f7 --> Gemini 3.1 Pro uses more intensifiers and formal transitions, such as incredibly, absolutely and "this comprehensive guide" [29]. <!-- claim: 6cdf21f231d344d5; evidence: c79d9ca0dfc81c7c; source: 56493642657ef5f7 --> GPT-5.x developed a creature-metaphor habit: from GPT-5.1, models increasingly mentioned goblins and gremlins in their metaphors [36]. <!-- claim: 8d90f7bf27d22e13; evidence: f3f8794d68e453fd; source: 8b7276cd935e3184 -->

The em dash shows how a signature can come and go. GPT-3.5 used almost none, GPT-4o about ten times more, and GPT-4.1 more again [27]. <!-- claim: 078c7a62a5605ce7; evidence: b2adf3d3ad887b30; source: 59cfed295f355dae --> By 2026 the dash had become mostly a Claude cue, and then Opus 5.5 nearly dropped it (see section 1). Prompting also changes the rate. Under a prose instruction, Claude Opus 4.6 dropped from 9.09 to 0.19 dashes per 1,000 words and Gemini 2.5 Pro to zero [28]. <!-- claim: 7144486bd035b1de; evidence: 89d71401201424c0; source: 0bbcac4a1b3d1437 --> A dash-heavy Claude text therefore usually reflects an older model, a Fable-family model or the prompt, and the lane must not read a missing dash as evidence of human writing.

Most 2026 per-model evidence is industry research rather than peer review (Graphite, Signal Box, ScriptGrain, SpeechMap, EQ-Bench). The peer-reviewed separability and grammar studies use 2024 models. The [models dossier](dossiers/models.md) has a per-family table with an evidence grade for each tell.

### 6. Vendor guidance and existing de-slop tools

<!-- facet: F6 -->

Vendors now publish their own tic lists (OpenAI's GPT-6 slop list; Anthropic's system-prompt bans on sincerity markers and formatting rules). Both also recommend describing the target prose positively rather than relying on bans. Antislop explains the preference: instructing a model to avoid banned vocabulary has limited efficacy and may backfire through the pink-elephant problem [12]. <!-- claim: 5a687b636739119d; evidence: 38cd32741ae430b9; source: 96aebd41d7aadaa7 --> Banning tokens at generation time also has a ceiling: token banning becomes unusable at about 2,000 patterns [12]. <!-- claim: 3c337d7258cdd755; evidence: b563474ee43b3454; source: 96aebd41d7aadaa7 -->

The open-source de-slop skills (humanizer, stop-slop, unslop, deslop, avoid-ai-writing, claudisms) converge on a shared catalogue derived from Wikipedia's list. Their useful architecture is a strength tier: a pattern acts on a single sighting only if it is strong, and a weak one needs company. Humanizer's em-dash entry shows the reasoning: many editors use dashes, so one dash is weak alone, but a text full of them is not [64]. <!-- claim: 32e2d732cdc507d2; evidence: 6936758a95c208ce; source: 143979a9b24d1841 --> Its verification step re-scans for the tells most likely to survive a rewrite: contrasts, closers, triads, dashes and bold labels [64]. <!-- claim: f6aab170c2f046a8; evidence: 313cf595599264c1; source: 143979a9b24d1841 --> unslop contributes the protection rule: preserve force-bearing never, must and all in safety, security, legal and technical rules [66]. <!-- claim: 988f3410e8c9a038; evidence: bc6ee2140a4add33; source: 8870b50ae0ada072 -->

Commercial humanizers show what to avoid. The DAMAGE audit of 19 tools found that LLM-based humanizers are more weakly grounded in the original text, while rule-based synonym swappers stay closer to it [74]. <!-- claim: 57e96f11898359f7; evidence: fcc669170e43f837; source: 01c098d2d5f066bc --> Synonym swapping has its own failure, documented in the scientific literature as tortured phrases. A tortured phrase replaces an established term word by word, as in "counterfeit consciousness" for artificial intelligence [73]. <!-- claim: 0fe723f628fa3c77; evidence: ffd89d2e4b80b62b; source: 1f19853b9e98661a -->

### 7. False positives and detection reliability

<!-- facet: F7 -->
<!-- facet: F9 -->

Detector errors show what a keep list must protect. Liang et al. found detectors classed over half of TOEFL essays by non-native writers as AI-generated, with an average false positive rate of 61.22% [83]. <!-- claim: 7f4941aa70a3c066; evidence: 6d4ab2e36ca1e5f2; source: 05ea0961d7fe712d --> The mechanism was low perplexity from plain vocabulary. Enriching the vocabulary cut the false positive rate to 11.77% [83]. <!-- claim: 7cd15fc1df2dc760; evidence: 0678f84a40b7a1ea; source: 05ea0961d7fe712d --> Plain, simple prose is not a tell, and a de-AI pass must never make plain prose fancier. Vendors dispute the size of this bias for modern trained classifiers (Turnitin, Pangram, GPTZero), but those are self-reports; the [keep-list dossier](dossiers/keeplist.md) covers the dispute. OpenAI withdrew its own classifier, which identified only 26% of AI text and flagged 9% of human text [85]. <!-- claim: 911f5cdd662df9d2; evidence: 9757e9d425be22cf; source: ddac8850e482fa2b -->

Human detection without expertise is at chance. Untrained evaluators distinguished GPT-3 text from human text at chance level [86]. <!-- claim: 5b00055df7c255e6; evidence: ebef66163b68c250; source: 55f3ee831a0c77e3 --> In Jakesch et al. (N = 4,600), people relied on flawed heuristics such as first-person pronouns, contractions and family topics [87]. <!-- claim: b71b21b4a9913bce; evidence: 39e604208e0c18ac; source: 1c828b523d9d3c8f --> Repetition was a valid cue: repetitive self-presentations were 47% more likely to be AI-generated [87]. <!-- claim: 4685fcbf98858311; evidence: 5242b4131d304601; source: 1c828b523d9d3c8f --> Russell et al. found non-experts treat any fancy word, grammatical correctness and neutral tone as signs of AI [84]. <!-- claim: 7fe9095ec7874be0; evidence: 4b9b5f3e32c6478c; source: 94bc1872a6410141 --> Even experts erred on vocabulary: 31% of their false-positive explanations cited human uses of words like delve and crucial [84]. <!-- claim: bdf3d18b41ecc09f; evidence: d328249752de8138; source: 94bc1872a6410141 -->

Wikipedia keeps an "ineffective indicators" list. Perfect grammar is on it, because many editors are skilled writers [1]. <!-- claim: acf7f07e366fff6a; evidence: d271398cb3d87e50; source: 216545f88fe97a24 --> So is formal prose in general: the LLM correlation is with specific words, not with formal or fancy-sounding prose [1]. <!-- claim: ee884d9736763fc1; evidence: 1cffc5988f8c65b5; source: 216545f88fe97a24 --> Mixed registers may signal a person in a technical field, youth or neurodivergence [1]. <!-- claim: d7eaa41c01ea0e5c; evidence: c1c35e4d60ca0ab3; source: 216545f88fe97a24 --> Genre conventions also overlap with tells. Google's developer style guide prescribes run-in headings ending in a period or colon, which is the bold-label list format, used deliberately [96]. <!-- claim: 251c189cc090135f; evidence: e390aea6b2cf309b; source: 48486baf13318ddb --> Hedging is essential to effective scientific communication [97]. <!-- claim: 040b52551584bc94; evidence: 854f51ae9693daac; source: debed86bb967e036 --> The rule of three goes back to classical rhetoric [120]. <!-- claim: 76c6a204fe1a2495; evidence: 0fb28a82e3fbb5bd; source: eff07036c2ba8c9e -->

### 8. Fix guidance and over-correction

<!-- facet: F8 -->

Expert edits of AI prose are mostly replacements (74%), then deletions (18%), then insertions (8%) [100]. <!-- claim: 907e9fc524ea8f2e; evidence: b92d15263a4d22f1; source: 604a33a5ff2aff54 --> Their rule is that overwriting is a bigger problem than underwriting: if in doubt, cut it [100]. <!-- claim: c5504396d8de5bed; evidence: da1dbf29b94a333b; source: 604a33a5ff2aff54 --> Wikipedia's cleanup guidance goes further for its own setting: rewrite from scratch or cut back to a stub rather than patch [2]. <!-- claim: c0f81560532c6f7a; evidence: dd86e32f51d24b5f; source: d73c5c4ced616d9e --> For /unclaude, which edits the author's own document, the safer equivalent is to cut or replace with the plainest phrasing and to flag gaps rather than fill them.

The over-correction failures are well documented. Staccato conversion chops ordinary sentences into fragments to manufacture rhythm [68]. <!-- claim: 9965453c546d04ac; evidence: 1a6951c44bf3c435; source: 10ac1554017e831d --> In the stress test cited above, the humanizer swapped one fingerprint for another: fragments, shrug closers and one-sentence paragraphs stacked like index cards [76]. <!-- claim: ec392a8e2721e00c; evidence: 5476f6d1c7a5eb15; source: 3c875bce4cfa4dff --> Humanizers also strip punctuation mechanically: one replaced hyphens with commas throughout, breaking compound terms [75]. <!-- claim: 78af6c38172c901f; evidence: e37fcf84c5a079e1; source: 3b957664240fc36e --> And a rewrite can pass every check yet lose the voice: one that clears every flag but erases the source's cadence, stance or idiosyncrasies has failed [68]. <!-- claim: 08b5ee32b137404c; evidence: 70f036815480c605; source: 10ac1554017e831d --> Detector scores are no target either. Paraphrasing alone dropped DetectGPT's detection accuracy from 70.3% to 4.6% [71]. <!-- claim: 523040f1a2526755; evidence: 96aef74f2c48e4cc; source: 83e70f1452f01d94 -->

## Synthesis

The evidence points to five design decisions for /unclaude.

1. **Lanes by pattern class, examples by model family.** Pattern classes (contrast frames, significance inflation, chat residue, generic content) persist across vendors and versions; their surface forms do not. Each lane should state the class, give a generic detection rule, and attach `## claude`, `## openai` and `## gemini` sections listing current exemplars with era tags. Claude exemplars should be checked first, since /unclaude targets Claude output.
2. **Tiered evidence and co-occurrence.** Each Hunt item should be marked strong (one sighting is a finding) or weak-alone (report only with another tell in the same paragraph, or above a density threshold). Strong items include chatbot residue, validation openers, knowledge-cutoff and availability disclaimers, "rather than merely" style contrast frames and bold-label bullet runs in prose. Weak-alone items include single dashes, single triads, single hedges, single list words and isolated transitions. The consolidated report should group findings by paragraph so the reviewer sees clusters.
3. **Keep list as a gate, not advice.** False positives cost real people (non-native writers, neurodivergent writers, technical writers following a style guide). The keep list needs to bind scouts the way prompting-guide-roast's does, and the reviewer should re-check it before each edit.
4. **A reviewer contract that forbids the known over-corrections.** No new facts, names, numbers, quotes or citations. Protected zones (quotations, code, terms of art, force-bearing absolutes). The writer's own sample overrides the rates (dash rate, contractions, register). Smallest edit first, cut before rewrite, flag rather than invent. No staccato, no semicolon swaps, no synonym swaps inside terms, no injected personality, no typos.
5. **One post-fix guard pass, not a loop.** A `fixer-guard` lane re-scans for the tells most likely to survive (contrasts, closers, triads, dashes, bold labels) and for the reviewer's own failure signatures. Iterative humanizing loops add AI traits and drift meaning.

## Limitations

- Retrieval stopped as coverage-saturated after seven rounds. Rounds 6 and 7 were low-yield residual probes in distinct query families. Saturation is a practical heuristic, not a recall guarantee.
- Gemini-specific tells rest on one 2024 peer-reviewed data point, Graphite's 2026 corpus, a vendor stylometry blog and practitioner reports. No rigorous Gemini 3.x study was found.
- The 2026 per-model rates (Graphite, Signal Box, ScriptGrain, SpeechMap, EQ-Bench, AI Writing Benchmark) are industry research. Several use a single prompt or a narrow domain, and their rate multipliers use different baselines.
- The Economist (July 2026), The Atlantic (negative parallelism) and the Washington Post ChatGPT style analysis were paywalled; their findings come through secondary quotes.
- LAMP, Art or Artifice and Antislop draw mainly on creative writing. Their transfer to technical documents, specs and agent output is untested.
- No source validates a per-passage density threshold for any tell. The thresholds in the lane set are inferred from human baselines and are labelled as heuristics.
- Non-English text is out of scope.
- Fetched content was treated as data. Some secondary figures (for example, Freeburg's per-model dash rates as quoted by slopdetector.org) were cross-checked against the primary preprint where it was retrieved.

## Recommendations

### Proposed lane set for /unclaude

Conventions follow prompting-guide-roast. `scope: passage` means the scout reads paragraph-sized windows, with surrounding context for reference. `scope: document` means the scout reads the whole text, because the pattern is about rates, positions or shape. Digest ids refer to the Proposed digest below. Every lane reads the Keep list (K-ids). Thresholds marked (h) are heuristics without a validated source.

Before the lanes run, a protect pre-pass should mark quotations, code and inline code, URLs and paths, proper names and titles, terms of art, text that mentions a phrase rather than uses it, and force-bearing never/must/all in rules. No lane reports findings inside protected spans, except `residue` for chat residue that leaked into a quotation of the assistant's own words.

#### 1. `lexical`: Overused AI vocabulary
- **Scope:** passage, plus a document-wide tally of repeated hits.
- **Digest entries:** X01, X02, X03, C01, C02, O01, G01; keep K5, K6, K7, K12.
- **Hunt:** Tier A rare high-ratio words (delve/delves, showcasing, underscores, boasts meaning "has", tapestry, testament to, intricate/intricacies, meticulous, realm, pivotal, commendable, palpable, camaraderie). Tier B common-register words, reported only with 2+ distinct hits per paragraph (h): crucial, significant, comprehensive, enhance, additionally, notably, insights, valuable, vibrant, robust (figurative), landscape (abstract), foster, leverage, align with, garner, enduring, interplay. The 2025–26 drift set: remains, yet, rather, explicit, underexplored, grounded, structurally, matters, quietly, steady, multifaceted. Copula substitutes (serves as, stands as, functions as, represents a, boasts a, features a). Stiff synonyms (utilize, facilitate, commence, endeavor). Rotated speech verbs (notes, explains, observes) where "says" would repeat. Commit/PR self-report words (streamlined, enhanced, improved clarity, ensured). Boost hits in a document's first or last sentence and sentence-initial Additionally/Notably/Moreover.
- **Fix:** fix clusters, not single words. Delete intensifiers and sincerity adverbs; use the plainest verb (is, has, uses, shows, says); restore copulas; replace an evaluative adjective with the fact that would justify it, or drop it. Never swap in a same-register synonym (delve to "dig into"). Keep repeated "said".
- **claude:** weight genuinely/honestly/straightforward(ly) on the writer's own claims, quietly (implied unnoticed change), load-bearing (figurative), "matters because/matters more than", deliberate/measured/steady, steelman, tradeoffs, "can help you", "is especially helpful", "single most". Down-weight the 2023 GPT-4 list; it was near-random on Claude essays.
- **openai:** certainly, overall, "it's worth noting", importantly, "Bottom Line:", "In short:", goblin/gremlin/creature metaphors (GPT-5.x); the classic delve/tapestry list for GPT-4/4o-era text.
- **gemini:** incredibly, absolutely, furthermore, additionally, "this comprehensive guide" (low-confidence evidence).

#### 2. `contrast`: Contrast frames, pivots and reveals
- **Scope:** passage.
- **Digest entries:** X04, X07, C03, O02, G01; keep K9, K10.
- **Hunt:** not X but Y; not just/only/merely X but (also) Y; it's not X, it's Y; X rather than (merely) Y; less like X and more like Y; split two-sentence form ("This isn't about X. It's about Y."); "No X. No Y. Just Z."; mirrored-clause aphoristic enders; throat-clearing pivots ("Here's the thing", "Here's where it gets interesting", "The real question is", "Let's dive in"); colon reveals whose left side carries no content ("The result:", "The catch?"); self-posed "Question? Answer." beats; meta-signposting ("Four caveats belong at the front").
- **Fix:** state the positive claim directly and delete the run-up. Keep a contrast only if it corrects a belief the reader plausibly holds or both halves carry information. Deletion test for colon reveals: remove the left side; if nothing is lost, it goes.
- **claude:** "rather than merely" (160×), "less like a _ and more like" (105×), binary aphoristic enders; validate-then-refine contrast in replies.
- **openai:** "the X is not simply", "X, not Y" introducing an unprompted alternative, "This isn't about X. It's about Y.", "Question? Answer."
- **gemini:** "is not just a X, it is" (153×); practitioners report it survives suppression prompts.

#### 3. `syntax`: Dense register and sentence mechanics
- **Scope:** passage.
- **Digest entries:** X03, X05, X10; keep K4, K11, K13.
- **Hunt:** sentence-final evaluative -ing riders (", highlighting…", ", underscoring…", ", ensuring…", ", reflecting…", ", cementing…"); stacked participial clauses; nominalization clusters with weak verbs ("the implementation of the enhancement of"); copula avoidance at the sentence level; rhetorical triads of near-synonyms or empty third items; doubled descriptors ("empathy and community"); long "and"-chained sentences with little internal punctuation; invented hyphenated compound labels ("exact-head checks").
- **Fix:** give the sentence a finite verb with a named subject; use is/are/has; cut the triad to the informative items; split and-chains at the logical seam; name the concept plainly instead of coining a label.
- **Keep:** literal three-item enumerations; agentless passives where the agent is unknown or irrelevant; terms of art that look like nominalizations.
- **claude / openai / gemini:** participial and nominal density is cross-family (peer-reviewed on GPT-4o and Llama 3). Rule-of-three density is highest in GPT-5.x. Gemini 3 Pro writes complex, formal sentences with low expressiveness.

#### 4. `rhythm`: Punctuation and cadence
- **Scope:** document.
- **Digest entries:** X06, X10, C04; keep K3, K14.
- **Hunt:** em-dash rate per 1,000 words outside code and quotations. Flag above about 4 per 1,000 (h), or above the writer's sample rate, or two dashes in one sentence, or "it's not X — it's Y" fusions. Semicolon cadence (dash-suppressed models swap dashes for semicolons). Comma-and-period monotony: runs of 5+ consecutive sentences of similar length (h). Long stretches with no parenthetical, question or varied punctuation. Staccato fragment runs and stacked one-sentence paragraphs. Under-punctuated long sentences joined by "and" (the Economist's cue).
- **Fix:** choose punctuation from the logical relation between clauses (period, comma, colon, parentheses), never one stock substitute. Vary rhythm by changing what sentences do, never by chopping them.
- **Keep:** dashes at or below the writer's own rate; dashes in code, ranges and compound modifiers; a single dash.
- **claude:** Fable 5 and Opus 4.x are dash-heavy; Opus 5.5 is dash-light, so a missing dash is no evidence of human writing. Fable 5.1 writes long sentences with few paragraph breaks.
- **openai:** GPT-4.1 kept dashes even when banned. GPT-5/6 are dash-light but use semicolon cadence and an 8–20-word sentence band.
- **gemini:** dash-light since 2.5 under prose instructions.

#### 5. `shape`: Formatting and document shape
- **Scope:** document.
- **Digest entries:** X08, X09, C05, O03; keep K1, K2, K15, K16.
- **Hunt:** bold-label bullets ("**Term:** explanation") where the label is restated in the sentence; mechanical bolding of key phrases; fragment bullets in explanatory prose; 2–3-row tables; any heading, list or bold in a personal or emotional message; title-case headings in a sentence-case context; generic headings (Introduction, Understanding X, Key Takeaways, Pros and Cons, Conclusion, Challenges and Future Prospects); headings nearly as long as their content; the intro, three sections, recap template; summary closers ("In summary", "Overall", "Ultimately", "In short:", "Bottom Line:") and one-line restating closers; portable intros that could open any article; emoji headings; horizontal rules in short pieces (h, unsupported).
- **Fix:** turn label lists into prose with inline series ("x, y and z"); remove bold; sentence-case or remove headings; cut restating closers and end on the last concrete point; cut the portable intro and start with the first specific sentence.
- **Keep:** run-in headings and parallel lists in reference and technical docs (Google style); descriptive or question headings in long scannable documents (GOV.UK, Digital.gov); lists for sequential steps or genuinely parallel items; summaries the genre requires (abstracts, executive summaries).
- **claude:** earlier Claude over-bulleted in chat; Fable 5.1 under-formats, so do not strip structure the content needs; Opus 5 writes long deliverables with filler sections and redundant summaries.
- **openai:** GPT-6 Astra "tends to use lists, tables and Markdown"; "Bottom Line:" and "In short:" closers.
- **gemini:** unrequested bullets, intro, body and summary in every section, bold headings (practitioner evidence).

#### 6. `significance`: Inflated significance, puffery and grand endings
- **Scope:** passage, plus a document pass over the final paragraph.
- **Digest entries:** X11, X12, C02; keep K8, K17.
- **Hunt:** significance flags (a testament to, plays a pivotal/crucial role, underscores the importance, reflects broader trends, setting the stage for, evolving landscape, indelible mark, matters because, the stakes are high); "Despite its [praise], X faces challenges" sections; puffery (boasts, vibrant, rich, nestled, in the heart of, groundbreaking, renowned, diverse array); pseudo-aphorisms ("at its core", "what really matters"); endings that summarize, uplift, moralize or zoom out to legacy, community or the world; canned emphasis on media coverage or social-media presence.
- **Fix:** keep the fact and drop the significance claim; replace the adjective with the fact behind it; end on the last concrete fact. Never add a claim of significance to replace one.
- **Keep:** sourced, specific significance claims; actual marketing copy written as marketing; superlatives that are literally true.
- **claude:** "matters because", "single most", "arguably the most", "every single", Opus 5.5's helpfulness phrasing ("can help you", "is especially helpful").
- **openai:** older GPT-4o puffery (vibrant, testament, tapestry); GPT-6 "Bottom Line:" framing.
- **gemini:** intensifier stacking (incredibly, absolutely).

#### 7. `stance`: Calibration, hedges, candor markers and false balance
- **Scope:** passage.
- **Digest entries:** X13, X19, C01, O04; keep K4, K18, K19.
- **Hunt:** formulaic hedges and disclaimers ("it's important to note", "it's worth noting", "may vary", "there's no one-size-fits-all", "as an AI"); hedge stacks ("could potentially", "may possibly"); caveats longer than the claim; unprompted moralizing; false balance ("both sides have merit", "ultimately it depends") where the text's own evidence supports a position; sincerity and candor markers ("genuinely", "honestly", "the honest answer", "to be clear", "I'd rather flag"); self-ranking and totalizing superlatives ("the deepest point", "the whole game", "the only thing that matters").
- **Fix:** before deleting any hedge, check what it covers. If the claim is supported, delete the formula; if not, replace it with one precise qualifier. Delete candor markers outright. For false balance, state the position the text's own evidence supports, or flag "author to state position".
- **Keep:** scope statements; legal, medical, safety and security notices; single ordinary hedges (perhaps, likely, tends to); calibrated academic hedging; "honestly" in dialogue or a deliberately informal voice.
- **claude:** weight candor markers and superlatives (overstatement).
- **openai:** weight hedges and corrective qualifiers ("may provide", "not necessarily").
- **gemini:** weight careful formal hedging (low-confidence evidence).

#### 8. `residue`: Chatbot residue and sycophancy
- **Scope:** document (openers and closers are positional), plus passage for embedded asides.
- **Digest entries:** X14, X15, C06, C07, O05; keep K20, K21.
- **Hunt:** validation openers (You're absolutely right, Great question, What a fascinating…, Excellent point, Certainly!, Of course!, Absolutely!, Sure!, Got it); agreement with no claim to agree with; validate-then-refine ("X is correct, and it can be made precise"); reflexive apologies; closers and offers (I hope this helps, Let me know if, Feel free to, Would you like me to, Shall I, Want me to, unless you'd prefer, Good luck, You've got this); more than one trailing question; narration of intent without action ("Next, I'll…"); knowledge-cutoff and "as of my last update" disclaimers; prompt-anchoring openers ("Based on the text", "Here is", "Below is"); placeholder text ([Your Name], INSERT_DATE); restating the user's question before answering; praise with no reason in review or feedback text.
- **Fix:** delete; start with the content; replace an offer with the action taken; keep at most one specific blocking question.
- **Keep:** reasoned agreement that states why; real questions the author needs answered; courtesy in a letter or email the user asked for; a warm register the user requested.
- **claude:** Claude 4.x "You're absolutely right!" era; Claude 5.x validate-then-refine, "Shall I apply this?", recap ending in an announced next step.
- **openai:** "Certainly! Here's", "got it"/"Thanks for checking in", cheerleading closers, generic sign-offs.

#### 9. `figurative`: Mannered prose, clichés and stock imagery
- **Scope:** passage.
- **Digest entries:** X16, C08, O06; keep K22.
- **Hunt:** metaphor substituted for a literal statement ("a dial worth turning", "earns its keep", "the risk lives somewhere specific", "the shape of the problem", "the physics of"); personification of abstractions ("the decision emerges", "the data whispers"); simile density; "the [noun] of [adj] [noun]" templates ("a sea of unspoken expectations"); stock emotional clichés (hung in the air, a sense of unease, pit of her stomach, voice barely above a whisper); fiction slop (flickered, shimmered, Elara, Kael); pseudo-reflective framing ("the question I keep coming back to", "sit with", "worth sitting with"); GPT creature metaphors.
- **Fix:** say it literally. Replace the figure with the plain claim it stands for. Keep at most one apt figure per explanation.
- **Keep:** fiction and essays where figurative language is the register; domain-standard metaphors (bottleneck, load-bearing wall, memory leak); a single apt metaphor.
- **claude:** the priority lane for Claude. Opus 5 and Fable 5.x score about 2.5 times the human mannered-prose level; Opus 5.5 raised simile (+112%) and personification (+55%) while cutting n-gram tics.
- **openai:** GPT-6 Astra is close to human on mannered prose; GPT-5.1 to 5.5 creature metaphors.
- **gemini:** mannered-prose score similar to Claude (Graphite).

#### 10. `generic`: Generic over specific
- **Scope:** passage, plus a document relevance pass.
- **Digest entries:** X17, X20; keep K17.
- **Hunt:** category nouns where a specific member is expected ("various stakeholders", "a range of factors"); praise or evaluation with no supporting fact; sweeping openers ("In today's fast-paced world"); paragraphs answering a neighbouring question instead of the one asked (relevance); templated specifics (default names Emily/Sarah/Elara, "Dr. X, a researcher at Y", round invented figures, "twenty minutes", "a dozen"); scene-setting openers ("On a drab November morning…"); symmetric coverage that gives every option equal space with no ranking.
- **Fix:** cut the sentence; narrow it to what the text actually supports; or move up a specific that already exists elsewhere in the document. If none exists, insert an author flag (`[AUTHOR: specify X]`) and never fill it.
- **claude:** newer Claude replaces hype with concrete-looking numbers and timeframes, so unsourced specifics are a 2026 Claude tell.
- **openai / gemini:** cross-family (LAMP found no difference between GPT-4o, Claude 3.5 Sonnet and Llama 3.1).

#### 11. `redundancy`: Redundant exposition and meta-text
- **Scope:** passage, plus a document pass for duplicate summaries.
- **Digest entries:** X18; keep K16.
- **Hunt:** "[main clause], [gloss tail]" sentences that restate the clause; spelled-out subtext or over-explained themes; re-explaining what the reader already knows; writing about the document ("This section will explore…", "In this guide, we…"); repeating the prompt or the question; section summaries that repeat the section; duplicate conclusions; recap closers; edit-summary narration ("ensured neutrality", "while preserving…") in commit, PR and change-log text.
- **Fix:** delete and lead with the content. "If in doubt, cut it."
- **Keep:** abstracts, executive summaries and TL;DRs the genre requires; definitions the intended reader needs; signposting in long documents written for scanning.

#### 12. `sourcing`: Vague attribution, vague relations and gap-filling
- **Scope:** passage (sentence-level).
- **Digest entries:** X12, X21; keep K19, K20.
- **Hunt:** "associated with", "linked to", "in connection with" where a specific relation is expected; weasel attribution ("experts say", "observers note", "studies show", "many believe") with no named source, or plural attribution backed by one citation; source-availability hedges ("not widely documented", "limited information is available", "maintains a low profile", "should be treated as X rather than Y", "does not by itself establish") followed by a plausible guess; analysis riders attached to a named source ("X said…, highlighting the need for…"); quotations always placed at paragraph ends; unmarked verbatim reuse of source text in summaries.
- **Fix:** state the relation only if the text or source states it; otherwise say what the source does show, or delete. Name the source or cut the attribution. Mark unsupported claims `[AUTHOR: verify]`. Never invent the relation, person, number or source.
- **claude:** Fable 5.1 reuses source wording without quotation marks in summaries (vendor note).

#### 13. `fixer-guard`: Post-fix regression check
- **Scope:** document; runs once after the reviewer, with the original and revised text both in view.
- **Digest entries:** R01–R10; keep all.
- **Hunt:** surviving contrasts, closers, triads, dashes and bold labels; new staccato fragments and stacked one-sentence paragraphs; new semicolon cadence; new "serves as"; hyphens stripped from compounds; altered quotations; any new fact, number, name, date, citation or first-person anecdote; injected slang, contractions or typos against the writer's register; a cliché replaced by another cliché; deleted hedges on unverified claims; softened force-bearing absolutes; lists made non-parallel; headings removed from a scannable document; length change beyond about ±25% (h); dash rate pushed far below the writer's own.
- **Fix:** revert the regressed edit to the original wording, or apply the minimal correct fix. Do not start another full pass.

### Proposed digest

Entry format: **id**, readers (families it applies to), Look for, Fix, Over-correction, Strength, Sources. Strength grades: **P** peer-reviewed study; **V** vendor documentation for that family; **W** Wikipedia editorial consensus; **I** industry or practitioner measurement; **H** heuristic or inference. Source numbers refer to the Bibliography; the links go to the original documents.

#### Cross-family entries (X)

**X01 Excess style vocabulary.** Readers: all. Look for: rare high-ratio words (delve, showcasing, underscores, tapestry, testament, intricate, meticulous, realm, pivotal, commendable) and density of common style words (crucial, significant, comprehensive, additionally, notably). Fix: delete or plainest word; replace evaluative adjectives with facts. Over-correction: same-register synonym swaps; stripping words used in their literal or technical sense. Strength: P (excess-vocabulary studies) + W. Sources: [#6](https://arxiv.org/abs/2406.07016) [#7](https://arxiv.org/abs/2403.07183) [#8](https://arxiv.org/abs/2404.01268) [#9](https://arxiv.org/abs/2412.11385) [#1](https://en.wikipedia.org/wiki/Wikipedia:Signs_of_AI_writing) [#115](https://github.com/jenna-russell/human_detectors/blob/main/prompts/detection_guide.txt).

**X02 Lexical lists drift; density and position, not presence.** Readers: all. Look for: co-occurring list words in one paragraph; hits in first or last sentences; sentence-initial transitions. Fix: treat single hits as weak; refresh era-tagged lists each model generation. Over-correction: treating any listed word as proof; aiming for zero listed words. Strength: P + I. Sources: [#22](https://aclanthology.org/2025.bea-1.71/) [#19](https://scriptgrain.com/research/the-ai-tells-moved) [#15](https://speechmap.ai/experiments/vocab/) [#128](https://arxiv.org/abs/2608.10715) [#10](https://arxiv.org/abs/2502.09606) [#29](https://graphite.io/five-percent/research/ai-tells).

**X03 Copula avoidance and stiff synonyms.** Readers: all. Look for: serves as, stands as, functions as, represents a, boasts, features, utilize, facilitate. Fix: is/are/has; plain verbs. Over-correction: none known, but AI copyedits introduce "serves as", so the fixer must not. Strength: P + W. Sources: [#11](https://arxiv.org/abs/2404.08627) [#10](https://arxiv.org/abs/2502.09606) [#1](https://en.wikipedia.org/wiki/Wikipedia:Signs_of_AI_writing).

**X04 Negative parallelism and contrast frames.** Readers: all; family-specific forms in C03, O02, G01. Look for: not X but Y; it's not X, it's Y; X rather than (merely) Y; less like X, more like Y; "No X. No Y. Just Z." Fix: state Y directly. Over-correction: deleting contrasts that correct a belief the reader actually holds. Strength: W + V + I. Sources: [#1](https://en.wikipedia.org/wiki/Wikipedia:Signs_of_AI_writing) [#55](https://developers.openai.com/api/docs/guides/latest-model) [#29](https://graphite.io/five-percent/research/ai-tells) [#33](https://www.pangram.com/signs-of-ai-writing) [#12](https://arxiv.org/abs/2510.15061) [#42](https://brandonlazovic.dev/articles/llm-negative-parallelism-tic/).

**X05 Rule of three.** Readers: all; strongest GPT-5.x. Look for: back-to-back triads, triads of near-synonyms, empty third items. Fix: keep the informative items. Over-correction: forcing every list to two items. Strength: W + I, contested. Sources: [#1](https://en.wikipedia.org/wiki/Wikipedia:Signs_of_AI_writing) [#84](https://arxiv.org/abs/2501.15654) [#32](https://aiwritingbenchmark.com/insights/which-ai-sounds-least-like-ai/) [#119](https://underslop.com/tells/rule-of-three) [#120](https://robotsatemyhomework.substack.com/p/ai-writing-patterns).

**X06 Em-dash density, version-aware.** Readers: Claude Fable 5.x and Opus 4.x, GPT-4o and 4.1; low relevance for Opus 5.5, GPT-5/6 and Gemini 3. Look for: rate above about 4 per 1,000 words (h) or above the writer's own rate; two per sentence; "it's not X — it's Y". Fix: choose the punctuation the clause relation needs. Over-correction: zero-dash rule; semicolon or comma monotony; stripping hyphens. Strength: I (preprint and journalism). Sources: [#28](https://arxiv.org/abs/2603.27006) [#112](https://daringfireball.net/linked/2026/08/11/economist-ai-writing) [#114](https://venturebeat.com/data/claude-opus-5-5-uses-em-dashes-99-less-often-and-sounds-more-human-but-still-exhibits-2-548-ai-writing-tells) [#27](https://www.seangoedecke.com/em-dashes/) [#126](https://proofed.com/knowledge-hub/ai-editing-checklist-how-to-spot-and-fix-ai-writing-patterns) [#94](https://slopdetector.org/blog/em-dash-ai-tell-data).

**X07 Throat-clearing pivots, colon reveals and signposting.** Readers: all. Look for: Here's the thing; Here's where it gets interesting; Let's dive in; The real question is; contentless "X:" reveals; "Question? Answer."; announcing the structure. Fix: delete the run-up; lead with the claim. Over-correction: deleting "deep dive" used as ordinary jargon. Strength: I + V. Sources: [#116](https://underslop.com/tells/heres-the-thing) [#118](https://underslop.com/tells/lets-dive-in) [#55](https://developers.openai.com/api/docs/guides/latest-model) [#125](https://claudisms.ai/) [#40](https://www.linkandth.ink/p/catalog-of-claude-cliches).

**X08 Summary closers and portable intros.** Readers: all. Look for: In summary, In conclusion, Overall, Ultimately, In short:, Bottom Line:; one-line restating closers; "optimistically vague" conclusions; "In today's fast-paced world" openers. Fix: end on the last concrete fact; start with the first specific sentence. Over-correction: deleting summaries the genre requires. Strength: P (Russell) + W + V. Note: connective stacking (Furthermore, Moreover, In conclusion) is now rare in current models [#117](https://underslop.com/tells/in-conclusion-cliche). Sources: [#84](https://arxiv.org/abs/2501.15654) [#1](https://en.wikipedia.org/wiki/Wikipedia:Signs_of_AI_writing) [#55](https://developers.openai.com/api/docs/guides/latest-model) [#101](https://arxiv.org/abs/2509.19163).

**X09 Formatting in prose contexts.** Readers: GPT and Gemini strongest; Claude pre-Fable. Look for: bold-label bullets; mechanical bold; small tables; title-case or generic headings; any formatting in personal messages; fragment bullets. Fix: prose with inline series; sentence case; remove decoration. Over-correction: stripping structure that technical or reference content needs. Strength: W + P + V. Sources: [#1](https://en.wikipedia.org/wiki/Wikipedia:Signs_of_AI_writing) [#21](https://arxiv.org/abs/2502.12150) [#52](https://platform.claude.com/docs/en/release-notes/system-prompts/claude-opus-5-5) [#46](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-fable-5-1) [#4](https://www.blakestockton.com/p/takeaways-from-wikipedias-signs-of-ai-writing-2).

**X10 Dense, uniform register.** Readers: all. Look for: participial riders, nominalization clusters, long under-punctuated "and"-chains, runs of similar-length sentences, no parentheticals or questions. Fix: finite verbs with named subjects; vary sentences by function. Over-correction: staccato fragments. Strength: P (Biber features) + journalism. Sources: [#24](https://arxiv.org/abs/2410.16107) [#127](https://www.refsmmat.com/notebooks/llm-style.html) [#112](https://daringfireball.net/linked/2026/08/11/economist-ai-writing) [#113](https://www.fastcompany.com/91584243/how-to-identify-ai-generated-writing-viral-report-has-surprising-new-clues-economist) [#129](https://arxiv.org/abs/2605.23651).

**X11 Inflated significance and puffery.** Readers: all. Look for: a testament to; pivotal role; underscores the importance; reflects broader; vibrant, nestled, boasts; legacy endings. Fix: keep the fact, drop the significance. Over-correction: removing sourced significance claims. Strength: W + P. Sources: [#1](https://en.wikipedia.org/wiki/Wikipedia:Signs_of_AI_writing) [#104](https://arxiv.org/abs/2309.14556) [#56](https://model-spec.openai.com/2026-08-18.html).

**X12 Vague attribution and vague relations.** Readers: all. Look for: experts say; observers note; associated with; linked to; one source behind a plural attribution. Fix: name the source and the relation, or cut. Over-correction: inventing a source or relation. Strength: W. Sources: [#1](https://en.wikipedia.org/wiki/Wikipedia:Signs_of_AI_writing) [#2](https://en.wikipedia.org/wiki/Wikipedia:WikiProject_AI_Cleanup/Guide_and_resources).

**X13 Formulaic hedges versus calibration.** Readers: all; GPT-6 strongest. Look for: it's important to note; no one-size-fits-all; may vary; hedge stacks; caveat bloat. Fix: verify, then delete the formula or replace it with one precise qualifier. Over-correction: making unverified claims sound certain. Strength: V + W; counterevidence P. Sources: [#56](https://model-spec.openai.com/2026-08-18.html) [#1](https://en.wikipedia.org/wiki/Wikipedia:Signs_of_AI_writing) [#108](https://arxiv.org/abs/2401.06730) [#126](https://proofed.com/knowledge-hub/ai-editing-checklist-how-to-spot-and-fix-ai-writing-patterns) [#97](https://files.eric.ed.gov/fulltext/ED390258.pdf).

**X14 Sycophancy and validation openers.** Readers: all. Look for: You're absolutely right; Great question; agreement with nothing to agree with; praise with no reason. Fix: delete; start with the content. Over-correction: deleting reasoned agreement. Strength: P + V. Sources: [#102](https://arxiv.org/abs/2310.13548) [#34](https://openai.com/index/sycophancy-in-gpt-4o/) [#35](https://openai.com/index/expanding-on-sycophancy/) [#37](https://github.com/anthropics/claude-code/issues/3382) [#54](https://platform.claude.com/docs/en/release-notes/system-prompts/claude-sonnet-3-5) [#53](https://platform.claude.com/docs/en/release-notes/system-prompts/claude-opus-4).

**X15 Chat residue and offers.** Readers: all. Look for: I hope this helps; Let me know if; Would you like me to; Shall I; knowledge-cutoff disclaimers; placeholders; restating the question. Fix: delete; replace an offer with the action taken. Over-correction: deleting courtesy in a letter the user asked for. Strength: W + V + I. Sources: [#1](https://en.wikipedia.org/wiki/Wikipedia:Signs_of_AI_writing) [#46](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-fable-5-1) [#50](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-opus-5-5) [#58](https://developers.openai.com/cookbook/examples/gpt-5/gpt-5-1_prompting_guide) [#116](https://underslop.com/tells/heres-the-thing).

**X16 Mannered and purple prose, clichés.** Readers: all; strongest Claude and Gemini. Look for: metaphor for literal statement; personified abstractions; "the [N] of [adj] [N]"; stock imagery. Fix: the literal phrase. Over-correction: an LLM fixer swapping one cliché for another. Strength: P (LAMP) + V + I. Sources: [#100](https://arxiv.org/abs/2409.14509) [#46](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-fable-5-1) [#29](https://graphite.io/five-percent/research/ai-tells) [#30](https://research.signalbox.studio/research/opus-5-5-articles-vs-novels/) [#12](https://arxiv.org/abs/2510.15061) [#104](https://arxiv.org/abs/2309.14556).

**X17 Generic over specific.** Readers: all. Look for: category nouns, unsupported praise, sweeping openers, irrelevant paragraphs. Fix: cut, narrow, or move up an existing specific; otherwise flag. Over-correction: inventing specifics. Strength: P. Sources: [#100](https://arxiv.org/abs/2409.14509) [#101](https://arxiv.org/abs/2509.19163) [#1](https://en.wikipedia.org/wiki/Wikipedia:Signs_of_AI_writing) [#84](https://arxiv.org/abs/2501.15654).

**X18 Redundant exposition and meta-text.** Readers: all; Opus 5 long deliverables. Look for: gloss tails, spelled-out subtext, "This section will…", repeated summaries, edit-narration. Fix: delete. Over-correction: deleting required summaries. Strength: P + W + V. Sources: [#100](https://arxiv.org/abs/2409.14509) [#1](https://en.wikipedia.org/wiki/Wikipedia:Signs_of_AI_writing) [#47](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-opus-5) [#56](https://model-spec.openai.com/2026-08-18.html).

**X19 Missing stance and homogenized content.** Readers: all. Look for: balanced pro and con with no verdict; avoidance of any controversial claim; fewer questions and personal asides than the genre expects. Fix: state the position the text's own evidence supports, or flag. Over-correction: manufactured opinion or contrarianism. Strength: P. Sources: [#127](https://www.refsmmat.com/notebooks/llm-style.html) [#84](https://arxiv.org/abs/2501.15654) [#61](https://www.anthropic.com/constitution) [#105](https://arxiv.org/abs/2309.05196) [#106](https://doi.org/10.1126/sciadv.adn5290).

**X20 Templated specifics.** Readers: all. Look for: Emily/Sarah/Elara/Kael; "Dr. X, a researcher at Y"; round unsourced figures; scene-setting openers; quotations always at paragraph end. Fix: flag for verification; never substitute another invented name. Strength: P. Sources: [#84](https://arxiv.org/abs/2501.15654) [#12](https://arxiv.org/abs/2510.15061) [#115](https://github.com/jenna-russell/human_detectors/blob/main/prompts/detection_guide.txt).

**X21 Availability hedges with gap-filling.** Readers: all; strongest GPT-5/6 era. Look for: not widely documented; limited information; maintains a low profile; should be treated as X rather than Y; then a plausible guess. Fix: say what the source shows; delete the guess. Strength: W. Sources: [#1](https://en.wikipedia.org/wiki/Wikipedia:Signs_of_AI_writing).

#### Claude-specific entries (C)

**C01 Sincerity and candor markers.** genuinely, honestly, straightforward(ly), "the honest answer", "to be clear" on the writer's own claims. Anthropic's own system prompt bans them. Fix: delete. Strength: V + I. Sources: [#51](https://platform.claude.com/docs/en/release-notes/system-prompts/claude-fable-5-1) [#125](https://claudisms.ai/) [#41](https://www.greaterwrong.com/posts/feTBB722jXmYAvCf2/) [#16](https://speechmap.ai/experiments/vocab/m/anthropic-claude-sonnet-4-6/).

**C02 Superlatives, self-ranking and significance flags.** "single most", "arguably the most", "every single", "the whole game", "matters because" (132×), Opus 5.5's "can help you" (8×). Fix: give the criterion or delete. Strength: I. Sources: [#29](https://graphite.io/five-percent/research/ai-tells) [#114](https://venturebeat.com/data/claude-opus-5-5-uses-em-dashes-99-less-often-and-sounds-more-human-but-still-exhibits-2-548-ai-writing-tells) [#125](https://claudisms.ai/) [#40](https://www.linkandth.ink/p/catalog-of-claude-cliches).

**C03 Claude contrast frames.** "rather than merely" (160×), "less like a _ and more like" (105×), binary aphoristic enders, validate-then-refine. Strength: I. Sources: [#29](https://graphite.io/five-percent/research/ai-tells) [#40](https://www.linkandth.ink/p/catalog-of-claude-cliches).

**C04 Em-dash history.** Opus 4.6 9.09/1k; Fable 5 about 12/1k; the Economist (July 2026) found only Claude above the human rate; Opus 5.5 at 0.015/1k. Use the version when known; otherwise treat dashes as weak. Strength: I. Sources: [#28](https://arxiv.org/abs/2603.27006) [#112](https://daringfireball.net/linked/2026/08/11/economist-ai-writing) [#114](https://venturebeat.com/data/claude-opus-5-5-uses-em-dashes-99-less-often-and-sounds-more-human-but-still-exhibits-2-548-ai-writing-tells) [#32](https://aiwritingbenchmark.com/insights/which-ai-sounds-least-like-ai/).

**C05 Formatting and length drift.** Claude 3.5 to 4 over-bulleted in chat; Fable 5.1 under-formats, with dense long sentences; Opus 5 writes long deliverables with filler sections. Fix: match the shape to the content; do not strip needed structure. Strength: V + P. Sources: [#46](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-fable-5-1) [#47](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-opus-5) [#52](https://platform.claude.com/docs/en/release-notes/system-prompts/claude-opus-5-5) [#21](https://arxiv.org/abs/2502.12150).

**C06 Sycophancy forms.** "You're absolutely right!" (Claude 4.x era); validate-then-refine (Claude 5.x). Strength: V + I. Sources: [#37](https://github.com/anthropics/claude-code/issues/3382) [#40](https://www.linkandth.ink/p/catalog-of-claude-cliches) [#38](https://www.anthropic.com/news/claude-sonnet-4-5).

**C07 Agentic narration and offers.** "Next, I'll…", "Shall I apply this?", "Want me to…?", "unless you'd prefer otherwise", a recap ending in an announced next step. Fix: delete; report the action taken. Strength: V. Sources: [#46](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-fable-5-1) [#50](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-opus-5-5) [#47](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-opus-5).

**C08 Mannered prose and figurative drift.** "a dial worth turning", "earns its keep", "load-bearing", "shape", "lives" (placement metaphor), "quietly"; Opus 5.5 similes (+112%) and personification (+55%). Fix: the literal phrase. Strength: V + I. Sources: [#46](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-fable-5-1) [#29](https://graphite.io/five-percent/research/ai-tells) [#30](https://research.signalbox.studio/research/opus-5-5-articles-vs-novels/) [#125](https://claudisms.ai/).

#### OpenAI-specific entries (O)

**O01 GPT-6 published slop list.** Bottom Line:, delve, foster, leverage, it's worth noting, importantly, genuinely, hyphenated compound descriptions, In short:, "The simplest mental model is:". Strength: V. Sources: [#55](https://developers.openai.com/api/docs/guides/latest-model).

**O02 GPT contrast and corrective frames.** "the X is not simply" (576×), "This isn't about X. It's about Y.", "X, not Y" with an unprompted alternative, "Question? Answer." Strength: V + I. Sources: [#55](https://developers.openai.com/api/docs/guides/latest-model) [#29](https://graphite.io/five-percent/research/ai-tells) [#42](https://brandonlazovic.dev/articles/llm-negative-parallelism-tic/).

**O03 GPT formatting defaults.** GPT-6 Astra leans to lists, tables and Markdown; GPT-4o bold-labelled enumerations and markdown titles. Strength: V + P. Sources: [#55](https://developers.openai.com/api/docs/guides/latest-model) [#21](https://arxiv.org/abs/2502.12150).

**O04 GPT hedging and qualification.** "may provide" (36×), "not necessarily", over-qualification; GPT-4o downtoners. Strength: I + P. Sources: [#29](https://graphite.io/five-percent/research/ai-tells) [#114](https://venturebeat.com/data/claude-opus-5-5-uses-em-dashes-99-less-often-and-sounds-more-human-but-still-exhibits-2-548-ai-writing-tells) [#24](https://arxiv.org/abs/2410.16107).

**O05 GPT sycophancy and acknowledgement tokens.** GPT-4o's April 2025 flattery; "got it", "Thanks for checking in"; generic praise and sign-offs. Strength: V. Sources: [#34](https://openai.com/index/sycophancy-in-gpt-4o/) [#58](https://developers.openai.com/cookbook/examples/gpt-5/gpt-5-1_prompting_guide) [#55](https://developers.openai.com/api/docs/guides/latest-model).

**O06 GPT-5.x figurative tics and triads.** Goblin/gremlin creature metaphors (GPT-5.1 to 5.5); three-item lists at 3.3/1k (GPT-5.6 Sol); "not just X". Strength: V + I. Sources: [#36](https://openai.com/index/where-the-goblins-came-from/) [#32](https://aiwritingbenchmark.com/insights/which-ai-sounds-least-like-ai/).

#### Gemini-specific entries (G)

**G01 Gemini tells (low confidence).** Intensifiers (incredibly at 1,835× GPT's rate in Graphite's corpus, absolutely); formal transitions (furthermore, additionally); "this comprehensive guide"; "is not just a X, it is" (153×); no contractions; high formality with careful hedging; unrequested bullets and intro, body and summary sections; italics (2024). Strength: I + P (2024 italics only). Sources: [#29](https://graphite.io/five-percent/research/ai-tells) [#130](https://www.mywritingtwin.com/blog/ai-model-writing-styles-compared) [#21](https://arxiv.org/abs/2502.12150) [#123](https://humanizethisai.com/blog/chatgpt-vs-claude-vs-gemini-writing) [#124](https://www.reddit.com/r/WritingWithAI/comments/1sa2mch/repeated_phrases_in_google_ai_gemini_2530/).

#### Reviewer rules (R), binding on the fixer

**R01 No fabrication.** Add no fact, name, number, date, quote, citation, relation or opinion that the text or the author did not supply. Flag gaps as `[AUTHOR: …]`. Sources: [#64](https://github.com/blader/humanizer/blob/main/SKILL.md) [#66](https://github.com/theclaymethod/unslop) [#68](https://github.com/conorbronsdon/avoid-ai-writing) [#100](https://arxiv.org/abs/2409.14509).

**R02 Protected zones.** Never edit quotations, code, URLs, paths, proper names, terms of art, or text that mentions a phrase rather than uses it. Never soften force-bearing never/must/all in rules. Sources: [#66](https://github.com/theclaymethod/unslop) [#73](https://arxiv.org/abs/2107.06751) [#75](https://www.pangram.com/blog/ai-humanizers-the-slop-2-problem).

**R03 Smallest sufficient edit.** Replace with the plainest phrasing, then cut, and insert only as a last resort. If a finding is doubtful, make no edit. Rewrite the whole paragraph only when two or more findings land in it. Sources: [#100](https://arxiv.org/abs/2409.14509) [#66](https://github.com/theclaymethod/unslop).

**R04 Verify before de-hedging.** Delete a hedge only when the claim is supported; otherwise use one precise qualifier. Sources: [#126](https://proofed.com/knowledge-hub/ai-editing-checklist-how-to-spot-and-fix-ai-writing-patterns) [#108](https://arxiv.org/abs/2401.06730) [#64](https://github.com/blader/humanizer/blob/main/SKILL.md).

**R05 Writer sample overrides rates.** If the author's own writing uses dashes, contractions or a register at a similar rate, keep them. Sources: [#3](https://github.com/blader/humanizer) [#126](https://proofed.com/knowledge-hub/ai-editing-checklist-how-to-spot-and-fix-ai-writing-patterns).

**R06 No staccato, no stock substitutes.** Never chop sentences into fragments, swap dashes for semicolons by reflex, strip hyphens, or rotate synonyms for "said". Sources: [#68](https://github.com/conorbronsdon/avoid-ai-writing) [#76](https://ankitvora2.substack.com/p/day-1-of-testing-ai-agents-humanizer) [#75](https://www.pangram.com/blog/ai-humanizers-the-slop-2-problem) [#42](https://brandonlazovic.dev/articles/llm-negative-parallelism-tic/).

**R07 No humanizing theatre.** Never inject first-person anecdotes, slang, rhetorical questions, typos or a "personality" the text lacked. Sources: [#66](https://github.com/theclaymethod/unslop) [#80](https://www.wired.com/story/more-typos-fewer-em-dashes-writers-are-creating-an-anti-ai-literary-counterculture/) [#76](https://ankitvora2.substack.com/p/day-1-of-testing-ai-agents-humanizer).

**R08 No cliché swaps.** Replacing a cliché with another figure is not a fix; use the literal claim. Sources: [#100](https://arxiv.org/abs/2409.14509) [#46](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-fable-5-1).

**R09 Preserve voice and meaning.** A rewrite that clears every flag but loses the author's cadence, stance or content has failed. Sources: [#68](https://github.com/conorbronsdon/avoid-ai-writing) [#76](https://ankitvora2.substack.com/p/day-1-of-testing-ai-agents-humanizer) [#74](https://arxiv.org/abs/2501.03437).

**R10 Detector scores are not the target.** Do not optimize for detector output; paraphrasing defeats detectors without improving writing. Sources: [#71](https://arxiv.org/abs/2303.13408) [#72](https://arxiv.org/abs/2303.11156) [#85](https://openai.com/index/new-ai-classifier-for-indicating-ai-written-text/) [#76](https://ankitvora2.substack.com/p/day-1-of-testing-ai-agents-humanizer).

#### Keep list: do not flag

- **K1** Run-in bold labels, parallel list items and lead-in sentences in technical, reference and how-to documents that follow a style guide. [#96](https://developers.google.com/style/lists)
- **K2** Descriptive headings and question headings in long, scannable documents. [#121](https://guidance.publishing.service.gov.uk/writing-to-gov-uk-standards/writing-guidelines/clear-structure/) [#122](https://digital.gov/guides/plain-language/design/headings)
- **K3** Em dashes at or below the writer's own rate, or below about 4 per 1,000 words when no sample exists (h); dashes in ranges, code and compound modifiers. [#28](https://arxiv.org/abs/2603.27006) [#78](https://www.theringer.com/2025/08/20/pop-culture/em-dash-use-ai-artificial-intelligence-chatgpt-google-gemini) [#79](https://foureyes.com/em-dash-is-not-an-ai-tell/)
- **K4** Calibrated hedges in academic, scientific, legal, medical and safety writing; single ordinary hedges (perhaps, likely, tends to). [#97](https://files.eric.ed.gov/fulltext/ED390258.pdf) [#64](https://github.com/blader/humanizer/blob/main/SKILL.md)
- **K5** A single occurrence of a listed word (delve, crucial, robust, key) with no other tell nearby; humans use them, and 31% of expert false positives came from them. [#84](https://arxiv.org/abs/2501.15654) [#20](https://arxiv.org/abs/2409.01754)
- **K6** Listed words in their literal or technical sense: robust estimator, cryptographic key, landscape orientation, Kerberos realm, gating in ML, load-bearing wall, foster care. [#1](https://en.wikipedia.org/wiki/Wikipedia:Signs_of_AI_writing)
- **K7** Positive or hype words in academic abstracts as such; they rose for decades before LLMs. [#95](https://doi.org/10.1136/bmj.h6467)
- **K8** Superlatives and intensifiers that are literally true, and "very", "perhaps", "in order to", "the fact that", plain is/has, which lean human. [#1](https://en.wikipedia.org/wiki/Wikipedia:Signs_of_AI_writing)
- **K9** A contrast that corrects a belief the reader plausibly holds, or where both halves carry information. [#126](https://proofed.com/knowledge-hub/ai-editing-checklist-how-to-spot-and-fix-ai-writing-patterns) [#64](https://github.com/blader/humanizer/blob/main/SKILL.md)
- **K10** "Deep dive" used as ordinary jargon, as distinct from "Let's dive in". [#118](https://underslop.com/tells/lets-dive-in)
- **K11** Literal three-item enumerations, and the tricolon as deliberate rhetoric. [#119](https://underslop.com/tells/rule-of-three) [#120](https://robotsatemyhomework.substack.com/p/ai-writing-patterns)
- **K12** Elegant variation and essay connectives (furthermore, in conclusion) by student or non-native writers taught to use them. [#1](https://en.wikipedia.org/wiki/Wikipedia:Signs_of_AI_writing) [#117](https://underslop.com/tells/in-conclusion-cliche)
- **K13** Plain vocabulary, simple syntax and low lexical diversity; never make plain prose fancier. [#83](https://arxiv.org/abs/2304.02819)
- **K14** Correct grammar, formal register, neutral tone and mixed casual and formal registers. [#1](https://en.wikipedia.org/wiki/Wikipedia:Signs_of_AI_writing) [#84](https://arxiv.org/abs/2501.15654) [#86](https://aclanthology.org/2021.acl-long.565)
- **K15** Formatting the content needs: steps, comparisons, reference tables. [#46](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-fable-5-1) [#55](https://developers.openai.com/api/docs/guides/latest-model)
- **K16** Summaries the genre requires: abstracts, executive summaries, TL;DRs, conclusion sections in long reports. [#56](https://model-spec.openai.com/2026-08-18.html)
- **K17** Marketing copy written as marketing; promotional register where the genre is promotional. [#5](https://humanizeai.com/blog/wikipedia-signs-of-ai-writing-could-make-your-content-worse/)
- **K18** Scope statements, legal, medical, safety and security notices, and caveats a reader needs. [#64](https://github.com/blader/humanizer/blob/main/SKILL.md)
- **K19** Specific, sourced claims and attributions (named source, stated relation). [#1](https://en.wikipedia.org/wiki/Wikipedia:Signs_of_AI_writing)
- **K20** Warmth, courtesy or first person the author chose or the user asked for; real questions the author needs answered. [#48](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-opus-4-8)
- **K21** Curly quotes, Markdown alone, and the absence of typos; tools and careful humans produce them. [#1](https://en.wikipedia.org/wiki/Wikipedia:Signs_of_AI_writing)
- **K22** Figurative language in fiction and essays, a single apt metaphor, and domain-standard metaphors (bottleneck, memory leak). [#46](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-fable-5-1)

Two cross-family conflicts should be reported to the owner rather than resolved by a lane. First, formatting: drafts from GPT and Gemini usually need structure removed, while Claude Fable 5.1 drafts may need structure kept or added. Second, hedging: GPT-6 drafts tend to over-qualify, while Claude drafts tend to overstate. A fixer that always pushes in one direction will damage one of the families.

## Bibliography

[1] [Wikipedia:Signs of AI writing](https://en.wikipedia.org/wiki/Wikipedia:Signs_of_AI_writing)
[2] [Wikipedia:WikiProject AI Cleanup/Guide and resources](https://en.wikipedia.org/wiki/Wikipedia:WikiProject_AI_Cleanup/Guide_and_resources)
[3] [humanizer (SKILL.md v3.1.0 and README)](https://github.com/blader/humanizer)
[4] [Don't Write Like AI: 10 Takeaways from Wikipedia's Signs of AI Writing](https://www.blakestockton.com/p/takeaways-from-wikipedias-signs-of-ai-writing-2)
[5] [Following The Wikipedia AI Sign of Writing Could Backfire (Wikipedia's Signs of AI Writing: ... And Why Following It Can Make Your Writing Worse)](https://humanizeai.com/blog/wikipedia-signs-of-ai-writing-could-make-your-content-worse/)
[6] [Delving into LLM-assisted writing in biomedical publications through excess vocabulary](https://arxiv.org/abs/2406.07016)
[7] [Monitoring AI-Modified Content at Scale: A Case Study on the Impact of ChatGPT on AI Conference Peer Reviews](https://arxiv.org/abs/2403.07183)
[8] [Mapping the Increasing Use of LLMs in Scientific Papers](https://arxiv.org/abs/2404.01268)
[9] [Why Does ChatGPT “Delve” So Much? Exploring the Sources of Lexical Overrepresentation in Large Language Models](https://arxiv.org/abs/2412.11385)
[10] [Human-LLM Coevolution: Evidence from Academic Writing](https://arxiv.org/abs/2502.09606)
[11] [Is ChatGPT Transforming Academics' Writing Style?](https://arxiv.org/abs/2404.08627)
[12] [Antislop: A Comprehensive Framework for Identifying and Eliminating Repetitive Patterns in Language Models](https://arxiv.org/abs/2510.15061)
[15] [Lexical Fingerprints | SpeechMap.AI](https://speechmap.ai/experiments/vocab/)
[16] [claude-sonnet-4.6 — Lexical Fingerprint | SpeechMap.AI](https://speechmap.ai/experiments/vocab/m/anthropic-claude-sonnet-4-6/)
[19] [The AI tells moved: 2.1 million arXiv abstracts, 2015 to 2026 (ScriptGrain SGR-008)](https://scriptgrain.com/research/the-ai-tells-moved)
[20] [Empirical evidence of Large Language Model's influence on human spoken communication](https://arxiv.org/abs/2409.01754)
[21] [Idiosyncrasies in Large Language Models](https://arxiv.org/abs/2502.12150)
[22] [Can GPTZero’s AI Vocabulary Distinguish Between LLM-Generated and Student-Written Essays?](https://aclanthology.org/2025.bea-1.71/)
[24] [Do LLMs write like humans? Variation in grammatical and rhetorical styles](https://arxiv.org/abs/2410.16107)
[27] [Why do AI models use so many em-dashes?](https://www.seangoedecke.com/em-dashes/)
[28] [The Last Fingerprint: How Markdown Training Shapes LLM Prose](https://arxiv.org/abs/2603.27006)
[29] [AI Tells](https://graphite.io/five-percent/research/ai-tells)
[30] [Different, Not Better: The Evolution of AI "Tells" Across Model Versions](https://research.signalbox.studio/research/opus-5-5-articles-vs-novels/)
[32] [Which AI sounds least like AI? The best writers are the heaviest em-dash users](https://aiwritingbenchmark.com/insights/which-ai-sounds-least-like-ai/)
[33] [9 Signs of AI Writing, Backed by Data](https://www.pangram.com/signs-of-ai-writing)
[34] [Sycophancy in GPT-4o: What happened and what we're doing about it](https://openai.com/index/sycophancy-in-gpt-4o/)
[35] [Expanding on what we missed with sycophancy](https://openai.com/index/expanding-on-sycophancy/)
[36] [Where the goblins came from](https://openai.com/index/where-the-goblins-came-from/)
[37] [BUG: Claude says "You're absolutely right!" about everything (claude-code issue #3382)](https://github.com/anthropics/claude-code/issues/3382)
[38] [Introducing Claude Sonnet 4.5](https://www.anthropic.com/news/claude-sonnet-4-5)
[40] [22 Claude-prose Patterns: A Catalog of Stylistic Attractors in Generated Texts](https://www.linkandth.ink/p/catalog-of-claude-cliches)
[41] [Jude Stiel's Shortform (LessWrong)](https://www.greaterwrong.com/posts/feTBB722jXmYAvCf2/)
[42] [Why AI Keeps Writing 'Not X, But Y'](https://brandonlazovic.dev/articles/llm-negative-parallelism-tic/)
[46] [Prompting Claude Fable 5.1](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-fable-5-1)
[47] [Prompting Claude Opus 5](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-opus-5)
[48] [Prompting Claude Opus 4.8](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-opus-4-8)
[50] [Prompting Claude Opus 5.5](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-opus-5-5)
[51] [Claude Fable 5.1 system prompts](https://platform.claude.com/docs/en/release-notes/system-prompts/claude-fable-5-1)
[52] [Claude Opus 5.5 system prompts](https://platform.claude.com/docs/en/release-notes/system-prompts/claude-opus-5-5)
[53] [Claude Opus 4 system prompts](https://platform.claude.com/docs/en/release-notes/system-prompts/claude-opus-4)
[54] [Claude Sonnet 3.5 system prompts](https://platform.claude.com/docs/en/release-notes/system-prompts/claude-sonnet-3-5)
[55] [Using GPT-6 (Model guidance)](https://developers.openai.com/api/docs/guides/latest-model)
[56] [OpenAI Model Spec (2026/08/18)](https://model-spec.openai.com/2026-08-18.html)
[58] [GPT-5.1 Prompting Guide](https://developers.openai.com/cookbook/examples/gpt-5/gpt-5-1_prompting_guide)
[61] [Claude's Constitution](https://www.anthropic.com/constitution)
[64] [humanizer/SKILL.md (Humanizer: remove AI writing patterns, v3.1.0)](https://github.com/blader/humanizer/blob/main/SKILL.md)
[66] [unslop SKILL.md and references/core-contract.md](https://github.com/theclaymethod/unslop)
[68] [avoid-ai-writing SKILL.md (Avoid AI Writing — Audit & Rewrite)](https://github.com/conorbronsdon/avoid-ai-writing)
[71] [Paraphrasing evades detectors of AI-generated text, but retrieval is an effective defense](https://arxiv.org/abs/2303.13408)
[72] [Can AI-Generated Text be Reliably Detected?](https://arxiv.org/abs/2303.11156)
[73] [Tortured phrases: A dubious writing style emerging in science. Evidence of critical issues affecting established journals](https://arxiv.org/abs/2107.06751)
[74] [DAMAGE: Detecting Adversarially Modified AI Generated Text](https://arxiv.org/abs/2501.03437)
[75] [How AI Humanizers Work (And Why They Don’t)](https://www.pangram.com/blog/ai-humanizers-the-slop-2-problem)
[76] [I Stress-Tested Blader's Humanizer So You Don't Have To](https://ankitvora2.substack.com/p/day-1-of-testing-ai-agents-humanizer)
[78] [Stop AI-Shaming Our Precious, Kindly Em Dashes—Please](https://www.theringer.com/2025/08/20/pop-culture/em-dash-use-ai-artificial-intelligence-chatgpt-google-gemini)
[79] [The Em Dash Is Not an AI Tell. It's Punctuation.](https://foureyes.com/em-dash-is-not-an-ai-tell/)
[80] [More Typos, Fewer Em Dashes: Writers Are Creating an Anti-AI ‘Literary Counterculture’](https://www.wired.com/story/more-typos-fewer-em-dashes-writers-are-creating-an-anti-ai-literary-counterculture/)
[83] [GPT detectors are biased against non-native English writers](https://arxiv.org/abs/2304.02819)
[84] [People who frequently use ChatGPT for writing tasks are accurate and robust detectors of AI-generated text](https://arxiv.org/abs/2501.15654)
[85] [New AI classifier for indicating AI-written text](https://openai.com/index/new-ai-classifier-for-indicating-ai-written-text/)
[86] [All That's 'Human' Is Not Gold: Evaluating Human Evaluation of Generated Text](https://aclanthology.org/2021.acl-long.565)
[87] [Human heuristics for AI-generated language are flawed](https://doi.org/10.1073/pnas.2208839120)
[94] [Is the Em Dash an AI Tell? We Measured Dash Density Across Human vs AI Texts (2026)](https://slopdetector.org/blog/em-dash-ai-tell-data)
[95] [Use of positive and negative words in scientific PubMed abstracts between 1974 and 2014: retrospective analysis](https://doi.org/10.1136/bmj.h6467)
[96] [Lists | Google developer documentation style guide](https://developers.google.com/style/lists)
[97] [The Author in the Text: Hedging Scientific Writing](https://files.eric.ed.gov/fulltext/ED390258.pdf)
[100] [Can AI writing be salvaged? Mitigating Idiosyncrasies and Improving Human-AI Alignment in the Writing Process through Edits](https://arxiv.org/abs/2409.14509)
[101] [Measuring AI "Slop" in Text](https://arxiv.org/abs/2509.19163)
[102] [Towards Understanding Sycophancy in Language Models](https://arxiv.org/abs/2310.13548)
[104] [Art or Artifice? Large Language Models and the False Promise of Creativity](https://arxiv.org/abs/2309.14556)
[105] [Does Writing with Language Models Reduce Content Diversity?](https://arxiv.org/abs/2309.05196)
[106] [Generative AI enhances individual creativity but reduces the collective diversity of novel content](https://doi.org/10.1126/sciadv.adn5290)
[108] [Relying on the Unreliable: The Impact of Language Models' Reluctance to Express Uncertainty](https://arxiv.org/abs/2401.06730)
[112] [The Economist: 'How to Spot AI Writing'](https://daringfireball.net/linked/2026/08/11/economist-ai-writing)
[113] [Forget em dashes: A viral report on AI-generated writing has surprising new clues](https://www.fastcompany.com/91584243/how-to-identify-ai-generated-writing-viral-report-has-surprising-new-clues-economist)
[114] [Claude Opus 5.5 uses em-dashes 99% less often and sounds more human — but still exhibits 2,548 AI writing tells](https://venturebeat.com/data/claude-opus-5-5-uses-em-dashes-99-less-often-and-sounds-more-human-but-still-exhibits-2-548-ai-writing-tells)
[115] [Guide to Distinguishing AI-Generated Text from Human Writing (human_detectors repo, Russell et al. 2025)](https://github.com/jenna-russell/human_detectors/blob/main/prompts/detection_guide.txt)
[116] [The throat-clearing pivot: "here’s the thing" and its cousins](https://underslop.com/tells/heres-the-thing)
[117] ["In conclusion," "furthermore," "moreover": the AI cliché with no data behind it](https://underslop.com/tells/in-conclusion-cliche)
[118] [Let's dive in and deep dive: one real tell, one refuted one](https://underslop.com/tells/lets-dive-in)
[119] [The rule of three: the AI tell our own data argues against](https://underslop.com/tells/rule-of-three)
[120] [The internet made a ban list for AI writing. I'm making a case for the defense](https://robotsatemyhomework.substack.com/p/ai-writing-patterns)
[121] [Create a clear structure for your content - GOV.UK content and publishing guidance](https://guidance.publishing.service.gov.uk/writing-to-gov-uk-standards/writing-guidelines/clear-structure/)
[122] [Headings | Digital.gov (Plain language guide)](https://digital.gov/guides/plain-language/design/headings)
[123] [ChatGPT vs Claude vs Gemini: Writing Quality Compared](https://humanizethisai.com/blog/chatgpt-vs-claude-vs-gemini-writing)
[124] [Repeated phrases in Google AI Gemini 2.5/3.0 (r/WritingWithAI)](https://www.reddit.com/r/WritingWithAI/comments/1sa2mch/repeated_phrases_in_google_ai_gemini_2530/)
[125] [Claudisms - a living banlist of AI-writing tells](https://claudisms.ai/)
[126] [AI Editing Checklist: How We Edit AI Drafts](https://proofed.com/knowledge-hub/ai-editing-checklist-how-to-spot-and-fix-ai-writing-patterns)
[127] [LLM writing styles](https://www.refsmmat.com/notebooks/llm-style.html)
[128] [Most biomedical publications show signs of LLM-assisted writing](https://arxiv.org/abs/2608.10715)
[129] [How Human-Like Are Large Language Models? A Register-Aware Linguistic Evaluation](https://arxiv.org/abs/2605.23651)
[130] [How Every AI Model Writes: A Stylometric Comparison](https://www.mywritingtwin.com/blog/ai-model-writing-styles-compared)

## Methodology

| Item | Value |
|---|---|
| Mode | UltraDeep; 9 facets (8 high-priority), 7 retrieval rounds, 8 parallel retrieval workers in rounds 1–2, 8 parallel dossier writers |
| Search tool | `search` CLI (metasearch aggregator: brave, exa, serper, plus others); WebSearch not needed |
| Preflight | OK. Live probe returned `partial_success` with 8 results; perplexity failed (HTTP 401, insufficient quota), jina and tavily cancelled. CLI retained. Perplexity failed on most later queries too, which is why many query rows are `partial`. |
| Fetch tools | search-cli extract; curl with local HTML-to-text, arXiv HTML and export.arxiv.org, MediaWiki render and raw endpoints, GitHub raw and API, pdftotext; Python urllib; WebFetch. search-cli extract truncated arXiv pages at about 5–7k characters, so workers fell back to curl for full text. |
| Search query attempts | 109 (round 1: 86; round 2: 8; rounds 3–7: 3 each), including the preflight probe; 1 failed |
| Result entries considered | 850 (inspected entries before deduplication) |
| Distinct original documents retrieved | 178 |
| Document fetch attempts / failed | 203 / 12 |
| Registered sources / evidence passages / claims | 130 / 797 / 826 |

Failed fetches. Recovered by another route: arXiv 2510.15061, 2303.13408, 2303.11156 and 2107.06751 (search-cli extract returned only titles; fetched via export.arxiv.org or PDF), and PNAS 10.1073/pnas.2208839120 (Cloudflare 403; read via the PMC full text). Still inaccessible: The Atlantic negative-parallelism article (paywall and Cloudflare), the Reddit Claude-isms thread (blocked), the NPR and Poynter em-dash pieces (empty extract), the Washington Post em-dash piece (paywall), the Economist archive copy (CAPTCHA), and petergyang/no-ai-slop SKILL.md (404).

Process. Round 1 ran seven facet-scoped workers across literal, entity, source-specific, academic, counterevidence and citation-neighbourhood query families. Every high-priority facet reached direct evidence plus a completed counterevidence search, so coverage was ready after round 1. Round 2 was a delta round for named gaps: the Economist em-dash study, Gemini tells, signposting counts, Russell et al.'s vocabulary table, and the legitimacy of tricolons and headings. Rounds 3 and 5 found new relevant sources (a Claude banlist, a professional editors' checklist, a 2026 Kobak follow-up, Reinhart's literature notes, a register-aware evaluation and a Gemini stylometry post), which reset the saturation count. Rounds 6 (vocabulary-probe) and 7 (disciplinary) were low-yield residual probes in distinct families targeting high-priority facets. Retrieval stopped as `coverage-saturated` at round 7. Every evidence quote was checked verbatim against fetched text by the worker that captured it. All 826 claims were checked by the canonical lexical verifier, which tests overlap rather than meaning. The lead checked the material final claims against their quotes.
