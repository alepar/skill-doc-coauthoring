# Dossier: Lexical tells (overused vocabulary and stock phrases)

## Summary

Lexical tells are the best-documented class of AI-writing signal and the least reliable one on a single-passage basis. Peer-reviewed corpus studies (Kobak et al., Liang et al., Juzek & Ward, Geng & Trotta) agree that the post-2022 excess vocabulary is made of style words, mostly verbs and adjectives, not topic nouns. The same studies, plus practitioner trackers (Wikipedia's Signs of AI writing, SpeechMap lexical fingerprints, ScriptGrain, Graphite), show that the lists drift fast: the GPT-4-era set (delve, showcasing, intricate, pivotal, tapestry) peaked in 2024 and collapsed once publicized, while plainer words (remains, yet, rather, structurally, matters, quietly) took over by 2025-2026. Claude has its own lexicon (genuinely, honestly, straightforwardly, quietly, load-bearing, deliberate, steady, "matters because") which vendor system prompts themselves try to suppress.

Single-word hits are weak evidence. Human writers have absorbed the vocabulary (89% of biomedical papers show excess LLM vocabulary by end-2025; delve and realm rose in human speech), some "AI words" were rising before ChatGPT, and a GPTZero-style vocabulary classifier is near-random on Claude essays. The lexical lane should therefore score density and co-occurrence per passage, weight position (opening sentence, closing sentence, sincerity adverbs on the writer's own claims), use per-model and per-era lists, and fix only clusters, replacing with plain verbs and concrete content rather than synonyms.

## Facet Questions and Scope

<!-- facet: F1 -->

Questions covered: which overused-vocabulary lists exist and how they were built; how they differ by model family and drift by generation from the 2023 GPT-4 era to 2026; what position and density cues raise confidence; why single-word hits are weak (human adoption, pre-ChatGPT trends, near-random list classifiers); and how lists should be weighted by genre (scientific abstracts, peer reviews, encyclopedic text, fiction, chat answers, commit messages). Structural patterns such as "not X but Y" contrast frames, participial riders, and em-dash rates are mentioned only where they bear on vocabulary lists; they belong to other lanes.

## Source Groups and Findings

### 1. Peer-reviewed excess-vocabulary studies (the empirical core)

**What it is.** Corpus studies compare word frequencies before and after ChatGPT and attribute unexplained excess to LLM use.

Kobak et al. found the 2024 excess vocabulary consisted almost entirely of style words, whereas the excess vocabulary during the Covid pandemic consisted almost entirely of content words [6]. <!-- claim: 41014810932ccc71; evidence: 6e85f7425cc2ecb4; source: 3d58c956b7da4516 --> Less common words with strong excess usage included delves, underscores, and showcasing, while more common words with strong excess usage included potential, findings, and crucial [6]. <!-- claim: 9c8691925b200aec; evidence: 5e4c8d3d8e541c78; source: 3d58c956b7da4516 --> Their high-frequency "common set" is across, additionally, comprehensive, crucial, enhancing, exhibited, insights, notably, particularly, and within [6]. <!-- claim: e199652df9d2b355; evidence: 4327f031c9cff000; source: 3d58c956b7da4516 --> The full rare-word list runs to hundreds of entries, starting with accentuates, acknowledges, adept, advancements, aligns, amidst, avenues, bolster, broader, burgeoning, and capabilities [6]. <!-- claim: bc7ca64779ab14ec; evidence: 535925e2265b374f; source: 3d58c956b7da4516 --> Evidence strength: peer-reviewed, PubMed abstracts, very large N.

Liang et al. identified realm, intricate, showcasing, and pivotal as the top four words most disproportionately used by LLMs compared to humans by log odds ratio [8]. <!-- claim: df274b1020f6e757; evidence: 3a3102b9b12a97d0; source: c6867adfdf199076 --> In ICLR 2024 peer reviews, commendable, meticulous, and intricate showed 9.8, 34.7, and 11.2-fold increases in probability of occurring in a sentence, with a similar trend in NeurIPS but not in Nature Portfolio journals [7]. <!-- claim: 043ec70415641447; evidence: 9ef0251f3b6c97c6; source: f2f7eea8d36a2dd1 --> Evidence strength: peer-reviewed; genre-specific (reviews favour evaluative praise adjectives).

Juzek and Ward's method yields 21 focal words whose increased occurrence in scientific abstracts is likely the result of LLM usage [9]. <!-- claim: af0ea7a299a07b9d; evidence: 4689e31d4059c3f4; source: 1c69f6f4398b13af --> Per million PubMed words, delves rose from 0.21 to 14.38 (a 6697% increase), showcasing from 0.59 to 8.79, delve from 0.58 to 8.50, boasts from 0.11 to 1.15, and underscores from 4.50 to 45.19 [9]. <!-- claim: d153597e1fc61200; evidence: 9b75fbbdaf9bfdf2; source: 1c69f6f4398b13af --> On causes, they found no evidence that training data, architecture, or algorithm choices play a role, but Llama testing was consistent with RLHF contributing to the overuse [9]. <!-- claim: f959fd7ae4d32076; evidence: 8cd4509a3ace2109; source: 1c69f6f4398b13af -->

Geng and Trotta's common-register list is significant, crucial, effectively, additionally, comprehensive, enhance, capabilities, and valuable [10]. <!-- claim: 857c9378000006f5; evidence: 1370709953c6a172; source: 73e16fb41e59beb1 --> A separate abstract study found the frequency of "are" and "is" dropped by more than 10% in 2023 [11]. <!-- claim: 545a6e183352a82a; evidence: c8b5a3ea419256d3; source: 301f62403468d260 --> This copula drop is the lexical footprint of the "serves as / stands as" habit, whose Wikipedia watch list is serves as, stands as, marks, functions as, operates as, represents, boasts, features, maintains, offers, and refers to [1]. <!-- claim: 1cf2cc0eb15ae464; evidence: 102a9bf98e509612; source: 216545f88fe97a24 -->

**Detection.** Style verbs and adjectives, not nouns. Highest per-hit precision comes from rare, high-ratio inflected forms (delves, showcasing, underscores, boasts as "has"); common words (crucial, significant, potential, findings, enhance) only count in density.

**Fix.** Replace with the plain verb or delete the evaluative adjective; restore "is/are/has" for copula substitutes. Do not swap in a synonym, since the synonym usually lands on another list.

### 2. Practitioner master lists and their construction rules

The Wikipedia guide states that one or two of these words appearing may be coincidental, but an edit introducing lots of them, lots of times, is one of the strongest tells for AI use [1]. <!-- claim: 051cc43d2a5e1e81; evidence: 29e6b534d50c8b01; source: 216545f88fe97a24 --> It also warns that a word being overused by AI does not imply that its synonyms are also overused [1]. <!-- claim: 28eca2b8ff258498; evidence: 2e0bca8be7309435; source: 216545f88fe97a24 --> Its human-leaning plain verbs are contrasted with stiff synonyms: wrote versus authored, moved versus relocated, used versus utilized, tried versus attempted, died versus passed away [1]. <!-- claim: 1b7dfd03f4cb9e17; evidence: 3678e3df7693a542; source: 216545f88fe97a24 --> For edit summaries, commit-message-like text, it lists canned-adherence words such as refined, enhanced, enriched, streamlined, improved, clarity, and flow [1]. <!-- claim: 6b8ba46c1f8edb90; evidence: e1802c0eb90fa645; source: 216545f88fe97a24 -->

The humanizer skill's watch list includes Actually, additionally, align with, bolstered, crucial, deep dive, delve, figurative gate/gating, quietly, figurative robust, tapestry, testament, underscore, and vibrant, with explicit carve-outs for technical uses [3]. <!-- claim: 00730f57eef0dde4; evidence: 5f567bae79a3b70b; source: 2db4f7d2d7de0ea2 --> The same project adds pseudo-aphorism phrases: the real question is, at its core, in reality, what really matters, fundamentally, the deeper issue, the heart of the matter [3]. <!-- claim: f7027ccf79f2b511; evidence: de5624bbc8c77651; source: 2db4f7d2d7de0ea2 -->

Russell et al.'s detection guide, built from expert annotators, lists nouns including aspect, challenges, landscape, multifaceted, nuance, realm, roadmap, significance, tapestry, testament, toolkit, and whimsy [115]. <!-- claim: ed79bee8506eb7d5; evidence: 3c344d78afcaed22; source: 2dc80b5318ff3a1d --> Their experts named AI vocabulary (vibrant, crucial, significantly) the most common giveaway, with formulaic structures close behind [84]. <!-- claim: 11683967417da732; evidence: 26f1bfa61eca6db7; source: 94bc1872a6410141 --> They also flag elegant variation of speech verbs: humans repeatedly write "says", while AI cycles through notes and explains [84]. <!-- claim: 7a498baad9111210; evidence: 3d0f5823aa8782a6; source: 94bc1872a6410141 --> Evidence strength: peer-reviewed study with released guide.

Vendor-named lists are a separate, authoritative source for what a vendor considers its own model's tics. OpenAI's GPT-6 guidance tells the model to avoid "Bottom Line:", delve, foster, leverage, "it's worth noting", importantly, "This isn't about X. It's about Y.", genuinely, and hyphenated compound descriptions [55]. <!-- claim: d9bb9149feacd3d6; evidence: 0b94d79f6a8a2e58; source: 5c4b950aaeff3364 --> Anthropic's late-2024 Claude prompt told it to respond without filler affirmations like Certainly!, Of course!, Absolutely!, Great!, Sure! [54]. <!-- claim: c8e83c087895b6da; evidence: de31d105aee66816; source: f493d610463286dc --> A 2026 Claude system prompt says Claude avoids genuinely, honestly, or straightforward, because these modifiers come off as disingenuous [51]. <!-- claim: 7f796410b41eb069; evidence: b9cbb525c49a25c1; source: b08f5506b2c43068 -->

### 3. Fiction and creative-writing slop lists (Antislop / EQ-Bench)

In creative writing, models fixate on character names (Elara, Kael), sensory clichés (voice barely above a whisper), and intensifiers (a profound sense) [12]. <!-- claim: 82463c261505ac41; evidence: 0f24f578ddbb5ef7; source: 96aebd41d7aadaa7 --> Some slop patterns appear over 1,000x more frequently in LLM output than in human text; the Antislop Sampler suppresses 8,000+ patterns while maintaining quality, whereas plain token banning becomes unusable at 2,000 [12]. <!-- claim: 5ee9940621e96a40; evidence: b563474ee43b3454; source: 96aebd41d7aadaa7 --> The project's own default list is mostly auto-generated from a fiction corpus, and users are told to roll their own slop list [69]. <!-- claim: e5f113327c9e2ac0; evidence: d810c6ce7934655e; source: 722f0b87f10a5699 --> Implication for /unclaude: the fiction list should be loaded only when the passage is narrative, and blanket banning degrades text, which argues for flag-and-rewrite rather than deletion.

### 4. Drift by model and generation

**2023-2024 (GPT-4 era).** Wikipedia's GPT-4 list includes Additionally, boasts, bolstered, crucial, delve, emphasizing, enduring, garner, intricate, interplay, key, and landscape [1]. <!-- claim: 22b0c18a3d69414c; evidence: d8bc0e5c95c3567f; source: 216545f88fe97a24 --> GPT-4o and 4o Mini use camaraderie, palpable, tapestry, and intricate at more than 100 times the human rate [24]. <!-- claim: 314e743385f90359; evidence: a471b51ba9a40744; source: e30a1d7165201ec8 -->

**Mid-2024 to mid-2025 (GPT-4o).** The list shifts to align with, bolstered, crucial, emphasizing, enhance, enduring, fostering, highlighting, pivotal, showcasing, underscore, vibrant [1]. <!-- claim: 9d6c060de91a09f9; evidence: fff49c32e87c5024; source: 216545f88fe97a24 -->

**Mid-2025 to mid-2026 (GPT-5).** The list shrinks to emphasizing, enhance, highlighting, showcasing [1]. <!-- claim: 52ab6140196aaf9c; evidence: a2caa1ef8c221831; source: 216545f88fe97a24 --> Starting with GPT-5.1, OpenAI models increasingly mentioned goblins, gremlins, and other creatures in their metaphors [36]. <!-- claim: abe5ad2db7266249; evidence: f3f8794d68e453fd; source: 8b7276cd935e3184 -->

**Mid-2026 on (GPT-6).** New words: challenge, clearer, dependable, echoed, foster, leverage, matters, multifaceted, practical, prioritize, quietly, steady, universally, with short sentences around an 8-20 word band [1]. <!-- claim: 01a85f12f16bac32; evidence: 64a763fdc76d89c8; source: 216545f88fe97a24 -->

**Publicity effect.** Geng and Trotta report a marked drop in delve soon after it was pointed out in early 2024, while other ChatGPT-favoured words such as significant kept increasing [10]. <!-- claim: 4da91a1b0d88cf86; evidence: 94396752f034a533; source: 73e16fb41e59beb1 --> Researchers avoid salient LLM terms but are not as sensitive to common words, which is why the is/are decline continued [10]. <!-- claim: e3073e492de2430a; evidence: bb44baee7cf296a3; source: 73e16fb41e59beb1 --> In student reports, ChatGPT-associated words grew sharply in 2023 and 2024 before declining in 2025 [127]. <!-- claim: add3e085cba57b0c; evidence: 4c3d449743e75a5d; source: a65abd76098d76c4 -->

**ScriptGrain census (non-peer-reviewed, pre-registered).** The twelve best-known 2024 tells rose from 4.5% of abstracts (2020-2022) to 11.9% in 2024 and fell to 3.0% in 2026, while a new set of twelve rose from 1.9% to 12.4%, overtaking the old set in the second half of 2025 [19]. <!-- claim: 34af2943772c38e5; evidence: 24095a52f63a8757; source: 1b8eed8dc8f57f78 --> The old set was innovative, utilized, advancements, pivotal, facilitates, firstly, tackle, showcasing, underscores, delve, delves, intricate [19]. <!-- claim: ac5d53697514e7f6; evidence: 045dcf776f5daf9f; source: 1b8eed8dc8f57f78 --> The new set was underexplored, grounded, aligns, synthesizes, replaces, leaving, recovers, expose, structurally, reproducible, treats, vanishes [19]. <!-- claim: 3c8a96b430fa6573; evidence: 7ab121eef9400ea9; source: 1b8eed8dc8f57f78 --> The broader 2026 list leads with remains, yet, rather, establish, explicit, enabling, every, remain, against a 2024 list led by challenges, additionally, findings, enhance, insights, crucial, comprehensive, enhancing [19]. <!-- claim: faede644673188fd; evidence: d48016df299cdd96; source: 1b8eed8dc8f57f78 --> Average sentence length barely moved (24.46 to 24.49 words), so the change is in vocabulary, not rhythm [19]. <!-- claim: ff0c5e01927843a7; evidence: 0c21d7268ac5f352; source: 1b8eed8dc8f57f78 --> The author notes the study does not test whether voice measurement can tell if a text was written by AI [19]. <!-- claim: b23c111f0561776b; evidence: 6037a6bb20acd569; source: 1b8eed8dc8f57f78 -->

**SpeechMap lexical fingerprints (practitioner dataset).** The fingerprints are computed from 528,997 answers by 408 models to the same 2,120 questions [15]. <!-- claim: 1e47d73fe7fa54e3; evidence: 7d9ca3c6584d95a0; source: eedaacf8b9282626 --> In its "falling across models" view, delve drops from 13 to 1 per million words [15]. <!-- claim: a49d3f98b3403cc6; evidence: ac40d0144745f704; source: eedaacf8b9282626 --> In its "rising across models" view, structurally climbs from 4 to 19 per million [15]. <!-- claim: 0123b0fff98010de; evidence: 7e1ece9739574121; source: eedaacf8b9282626 -->

**Other families.** Wikipedia notes Grok overuses superficially scientific words like causal, empirical, and correlate [1]. <!-- claim: 33f1ea4613e340af; evidence: 2e9fb990e136adce; source: 216545f88fe97a24 --> Graphite finds Gemini 3.1 Pro uses more intensifiers, formal transitions, and guide language than GPT-6 Astra, including incredibly, absolutely, furthermore, additionally, and "this comprehensive guide" [29]. <!-- claim: da67f6061cf34418; evidence: c79d9ca0dfc81c7c; source: 56493642657ef5f7 --> Graphite summarises the split as GPT-6 Astra favouring corrective phrasing (rather than, not simply), Claude Opus 5 favouring superlatives (single most), and Gemini 3.1 Pro favouring formal transitions (furthermore) [29]. <!-- claim: e564740027ff82cc; evidence: fa08d1ec43113876; source: 56493642657ef5f7 --> At the Claude 3.5 / GPT-4o generation, ChatGPT liked "such as", "certainly", and "overall", whereas Claude preferred "here", "according to", and "based on" [21]. <!-- claim: b3dfe1dcd2c7e5dc; evidence: 0d728bf8716866fb; source: 5b0ec3b4902b975f -->

### 5. Claude-specific lexicon

SpeechMap's Claude Sonnet 4.6 fingerprint shows straightforwardly at 75.7x, analytically 58.5x, examining 25.0x, honestly 24.7x, genuinely 23.2x, and honest 22.2x the cross-model rate [16]. <!-- claim: 064c248d9a444363; evidence: 7608e101001488fa; source: afc1f632ff3ed0f1 --> The Claude Opus 4.5 fingerprint shows steelman 60.8x, counterweights 56.9x, explore 16.3x, argumentative 15.3x, noting 15.2x, tradeoffs 12.4x, and gesturing 12.2x [17]. <!-- claim: c387a28a3f4bcd40; evidence: 9b6fad13c60de0b5; source: b2081c1557da1660 --> Graphite measures Claude Opus 5 using deliberate 26x, measured 4.2x, and steady 6x the human rate [29]. <!-- claim: a4e5e059fcad1c40; evidence: e574b14133f9dc10; source: 56493642657ef5f7 --> It also measures "matters because" at 132x and "matters more than" at 93x the human rate for Opus 5 [29]. <!-- claim: 2af4e85739a07684; evidence: 02907c9a93a40c17; source: 56493642657ef5f7 -->

A LessWrong post counts "genuine" and "genuinely" 46 times in Claude's constitution and says Opus cannot stop saying them even though the chat version is instructed against it [41]. <!-- claim: 89320bfb23269a30; evidence: 57025a99a0cc7e84; source: fe2768ab29881ad3 --> (Practitioner observation; the causal link to the constitution is a hypothesis.) Claudisms, a practitioner banlist, flags "load-bearing" as an engineering metaphor that has become a tic [125]. <!-- claim: a61114101a975508; evidence: eef880a1ba00f96b; source: d6422a35628292a4 --> It says "quietly", used for an unnoticed creeping change, reaches for hidden drama and asserts nobody noticed without evidence that anyone failed to [125]. <!-- claim: 00c3432dfd100290; evidence: 2e4f8dc79f50bfb8; source: d6422a35628292a4 --> It describes "honest/honestly" as a qualifier-on-own-statements tic that implies other statements might not be honest [125]. <!-- claim: c50b392c9f3384a3; evidence: 8fbbd98334aab732; source: d6422a35628292a4 -->

Generation drift inside Claude: compared with Opus 5, Opus 5.5 uses "can help you" eight times and "is especially helpful" 12 times as often, while Opus 5 uses "is genuinely" 26 times as often as its successor [114]. <!-- claim: 0b014c4f941504e7; evidence: 43a866e2ca9c1a69; source: a89550d3cce35496 --> One analysis concludes Opus 5.5 does not reduce its AI-ness but relocates it into whatever register the task invokes [30]. <!-- claim: 5731569c4c185796; evidence: b04f4f8bcb1dac86; source: ffb7b5602c519659 --> Claude Opus 5 and Gemini 3.1 Pro score about 2.5 times the human rate on mannered prose, metaphor and flourish in place of direct statement such as "a dial worth turning" [29]. <!-- claim: 95c9178ed26bbc61; evidence: 30ccb17a72acb3d2; source: 56493642657ef5f7 -->

**Detection for Claude text.** Sincerity adverbs attached to the writer's own claims (genuinely, honestly, truly, straightforwardly), "quietly" for unobserved change, figurative "load-bearing", "matters because / what matters", and evaluative calm adjectives (deliberate, measured, steady). For 2026 Claude, also helpfulness boilerplate ("can help you", "is especially helpful").

**Fix.** Delete sincerity adverbs outright (the sentence nearly always survives); replace "quietly X" with the actual observation or drop it; replace "load-bearing" with the specific dependency ("everything else assumes this"); state the reason instead of "this matters because".

### 6. Position and density cues

Considerably more than half of the abstracts with focal words included "delve" in the first sentence [9]. <!-- claim: 3f7c2b5a17704b53; evidence: 388d5ff4b4212069; source: 1c69f6f4398b13af --> At the section level, LLMs are twice as likely to be used for a Discussion paragraph (68%) as for a Methods paragraph (32%) [128]. <!-- claim: 3fa4383a3a6091e2; evidence: c11f2b48de6cc573; source: 4fe18cf282cc6857 --> Transition words in isolation are a weak tell, although older AI text tended to formulaically overuse Additionally, Consequently, and Notably [1]. <!-- claim: 1a52cad4c17ea894; evidence: 33ebfedd955ffcee; source: 216545f88fe97a24 -->

My inference for scoring: weight hits in the first and last sentence of a passage and in sentence-initial transitions higher; weight hits in methods-like, procedural, or technical passages lower; require two or more distinct list words within roughly 150 words, or one rare high-ratio word plus a structural tell from another lane, before reporting a finding.

## Counterevidence and Disagreements

**Human adoption erodes list precision.** By the end of 2025, 89% of biomedical papers show excess of LLM-associated vocabulary [128]. <!-- claim: 882f37af19432446; evidence: 54a0f19adc2f48ca; source: 4fe18cf282cc6857 --> Post-ChatGPT trend changes show accelerated adoption of delve, realm, meticulous, and adept in human spoken communication [20]. <!-- claim: 949764bd851fcd2a; evidence: fc9481f60e1b1e06; source: 765e2e09c1103164 --> Kobak et al. suggest native speakers may be better at noticing and removing unnatural style words from LLM outputs [6]. <!-- claim: 731f55112e3c9cdc; evidence: 2d1409ae7b00648f; source: 3d58c956b7da4516 --> So a vocabulary hit in 2026 text may reflect a human who learned the word, or an edited AI draft with tells removed.

**Fixed lists fail across models.** Schmalz and Tack found that checking presence, not frequency, of AI terms works best for ChatGPT essays but drops to near-random on Claude-generated essays [22]. <!-- claim: 56999222c72e4325; evidence: d95f93a7e11d8226; source: 53ea4164260716d5 --> Overall, classification with the GPTZero AI Vocabulary lists was close to random, with accuracy between 0.363 and 0.755 [22]. <!-- claim: 78f1b09734d097a8; evidence: 356dadf53c41efda; source: 53ea4164260716d5 --> Famous phrase tells such as "left an indelible mark" and "a rich tapestry" occurred only 9 and 6 times in their corpus [22]. <!-- claim: ab7bb84e9f77da2c; evidence: 6af54c2e912714af; source: 53ea4164260716d5 -->

**Some "AI words" predate ChatGPT.** Positive words in PubMed abstracts rose from 2.0% (1974-80) to 17.5% (2014), with robust, novel, innovative, and unprecedented up to 15,000% [95]. <!-- claim: 19c0007d19eb2d1f; evidence: f9d3a34b344a8769; source: 62014fbaad6a2a7a --> A secondary source reports Matsui's analysis of 27.5 million PubMed records showing AI-vocabulary terms rising from 2020, two years before ChatGPT [5]. <!-- claim: cab3e685890b30f0; evidence: f153001ee08c71dd; source: c3e630563d972c51 --> (Secondary report of an unpublished analysis; treat as low-confidence.)

**Origin dispute.** Goedecke attributes GPT-4o's delve, explore, and tapestry to African English in RLHF labour [27]. <!-- claim: 74bdb7f49e6435bb; evidence: b383e1608525b742; source: 59cfed295f355dae --> Juzek and Ward found no evidence that the focal words are especially prevalent in any particular variety of English [9]. <!-- claim: 590327ba480ce19b; evidence: b5892b9c0fad1d57; source: 1c69f6f4398b13af --> The peer-reviewed result should win; the practical point is the same either way (post-training, not pretraining, shapes the list).

**Formal register is not a tell.** Wikipedia's guide says fancy, academic, or formal prose is not itself a sign even though LLMs favour certain words [1]. <!-- claim: 022f6d759e28f616; evidence: ad62222b7730e32e; source: 216545f88fe97a24 --> False-positive risk is real: GPT detectors misclassified over half of TOEFL essays as AI-generated, an average false positive rate of 61.22% [83]. <!-- claim: 66862e1b86777fd2; evidence: 6d4ab2e36ca1e5f2; source: 05ea0961d7fe712d -->

**Vocabulary versus structure.** The humanizer project argues word habits change with every model release while structural habits persist [3]. <!-- claim: 9a2e95fbf7da5f28; evidence: 1b210c59c5295114; source: 2db4f7d2d7de0ea2 --> ScriptGrain, in contrast, finds the measurable 2015-2026 change in abstracts was vocabulary, not sentence rhythm (see Section 4). Both can hold: vocabulary is the most visible and fastest-moving signal, which makes it both detectable now and quickly stale.

**Genre.** Genre exerts a stronger influence on stylistic features than the source itself, while key LLM differentiators are robust to generation conditions [25]. <!-- claim: cad501ca97addea5; evidence: 7fb43af8c1709276; source: a4ad03f933f401ad --> Wikipedia's guide is less useful for non-informational writing and omits fiction tells such as whispering woods and Elara Voss [1]. <!-- claim: bde4d58264c71d13; evidence: 127a52a83740545f; source: 216545f88fe97a24 --> A practitioner editor puts it bluntly: there is no universal list, and different fields have different tics [77]. <!-- claim: c7702d6a71c9d887; evidence: 413ea80a87fda487; source: 7ae715e0a2fb5ce2 --> SpeechMap's prompts are deliberately narrow, sensitive and controversial questions, so its fingerprints show how models write there, not their language in general [15]. <!-- claim: 57565560abdf75a0; evidence: 50c08ca177e17a95; source: eedaacf8b9282626 -->

## Methodological Limits and Open Gaps

- Most rigorous studies use scientific abstracts and peer reviews; their lists over-represent academic evaluative vocabulary. Coverage for business prose, documentation, chat answers, and commit messages relies on practitioner lists.
- Claude-specific frequencies come from SpeechMap (narrow prompt set), Graphite (articles), and practitioner banlists; no peer-reviewed Claude-only excess-vocabulary study was found.
- Per-model rates are relative to different baselines (human corpora, cross-model averages, a competitor model), so multipliers are not comparable across sources.
- Lists decay within one to two model generations; any shipped list needs a dated era tag and periodic refresh.
- No source gives a validated per-passage density threshold; the thresholds proposed below are my inference from the Wikipedia "lots of them, lots of times" rule and the Kobak common-versus-rare split.
- Detection of edited AI text (human-pruned tells) is not addressed by vocabulary methods at all.

## Proposed lane material

**Lane key:** `lexical` (title: "Overused AI vocabulary and stock phrases"). Optional sub-lane `lexical-fiction` loaded only for narrative text.

**Scope:** per passage (paragraph or ~150-word window), with a whole-document tally to catch a word repeated across paragraphs.

**Hunt:**
- Tier A, rare high-ratio words (one hit is reportable if paired with any second tell): delve/delves/delving, showcasing/showcases, underscores/underscoring, boasts (meaning "has"), tapestry, testament, intricate/intricacies, meticulous/meticulously, realm, pivotal, commendable, camaraderie, palpable, unspoken.
- Tier B, common-register words (report only at 2+ distinct hits per window): crucial, significant, comprehensive, enhance/enhancing, additionally, notably, particularly, insights, findings, potential, valuable, effectively, capabilities, vibrant, robust (figurative), landscape (abstract), key (adjective), foster, leverage, align with, garner, bolstered, enduring, interplay.
- 2025-2026 drift set (Tier B weighting): remains, yet, rather, explicit, establish, underexplored, grounded, structurally, matters, quietly, steady, dependable, practical, prioritize, multifaceted, clearer, universally.
- Claude set: genuinely/genuine, honestly/honest (on own claims), straightforward(ly), truly, quietly (unobserved change), load-bearing (figurative), "matters because / what matters / matters more than", deliberate, measured, steady, steelman, tradeoffs, gesturing at, "can help you", "is especially helpful", "single most", "arguably the most".
- GPT set: certainly, overall, "it's worth noting", importantly, "Bottom Line:", "In short:", goblin/gremlin creature metaphors (GPT-5.x), corrective "not simply / rather than".
- Gemini set: incredibly, absolutely, furthermore, additionally, "this comprehensive guide".
- Copula substitutes: serves as, stands as, functions as, operates as, represents a, boasts a, features a.
- Elegant variation of speech verbs: notes, explains, observes, remarks used in rotation where "says" would repeat.
- Stiff synonyms: utilize, facilitate, commence, endeavor, authored, relocated, attempted, passed away.
- Pseudo-aphorisms and stock openers/closers: "at its core", "the real question is", "the heart of the matter", "Certainly!", "Great question".
- Commit/PR/edit-summary register: refined, enhanced, enriched, streamlined, improved clarity and flow, ensured adherence.
- Position boosts: hit in first or last sentence; sentence-initial Additionally/Furthermore/Notably/Moreover.

**Fix guidance (reviewer):** fix clusters, not single words. Prefer deletion (sincerity adverbs, intensifiers, "notably") or the plainest verb (is, has, uses, shows, says). Restore copulas. Replace evaluative adjectives with the concrete fact that would justify them, or drop them. Never substitute a near-synonym from the same register (delve to "dig into", crucial to "vital"). Keep repeated "said/says".

**Over-correction to avoid:** stripping every list word produces flat, choppy text and can introduce the next-generation tells (short declaratives, "rather", "remains"); do not reduce all sentences to 8-20 words; do not rewrite technical terms.

**Keep-list:** technical senses (robust estimator, key as in cryptographic/map key, landscape in ecology/UI orientation, gate/gating in electronics or ML, load-bearing wall in construction, realm in DNS/Kerberos, foster care), quoted material, proper nouns, field-standard phrasing in Methods sections, and formal register in general.

**Per-model notes:** For Claude text, weight the Claude set and sincerity adverbs highest and down-weight the 2023 GPT-4 list (it was near-random on Claude essays). For GPT-4/4o-era text, the classic delve/tapestry list still applies. For 2026 text of any family, use the drift set and rely more on co-occurrence with structural lanes.

**Genre weighting:** academic/abstract text: Kobak/Liang/ScriptGrain lists; peer review: evaluative praise adjectives; encyclopedic: Wikipedia lists plus copula substitutes; fiction: Antislop list only (Elara, voice barely above a whisper, shimmered, flickered); chat/advice: Claude and GPT sets plus openers; commit messages and PRs: procedural self-report words.

## Bibliography
[1] [Wikipedia:Signs of AI writing](https://en.wikipedia.org/wiki/Wikipedia:Signs_of_AI_writing)
[3] [humanizer (SKILL.md v3.1.0 and README)](https://github.com/blader/humanizer)
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
[17] [claude-opus-4.5 — Lexical Fingerprint | SpeechMap.AI](https://speechmap.ai/experiments/vocab/m/anthropic-claude-opus-4-5/)
[19] [The AI tells moved: 2.1 million arXiv abstracts, 2015 to 2026 (ScriptGrain SGR-008)](https://scriptgrain.com/research/the-ai-tells-moved)
[20] [Empirical evidence of Large Language Model's influence on human spoken communication](https://arxiv.org/abs/2409.01754)
[21] [Idiosyncrasies in Large Language Models](https://arxiv.org/abs/2502.12150)
[22] [Can GPTZero’s AI Vocabulary Distinguish Between LLM-Generated and Student-Written Essays?](https://aclanthology.org/2025.bea-1.71/)
[24] [Do LLMs write like humans? Variation in grammatical and rhetorical styles](https://arxiv.org/abs/2410.16107)
[25] [Interpretable Stylistic Variation in Human and LLM Writing Across Genres, Models, and Decoding Strategies](https://arxiv.org/abs/2604.14111)
[27] [Why do AI models use so many em-dashes?](https://www.seangoedecke.com/em-dashes/)
[29] [AI Tells](https://graphite.io/five-percent/research/ai-tells)
[30] [Different, Not Better: The Evolution of AI "Tells" Across Model Versions](https://research.signalbox.studio/research/opus-5-5-articles-vs-novels/)
[36] [Where the goblins came from](https://openai.com/index/where-the-goblins-came-from/)
[41] [Jude Stiel's Shortform (LessWrong)](https://www.greaterwrong.com/posts/feTBB722jXmYAvCf2/)
[51] [Claude Fable 5.1 system prompts](https://platform.claude.com/docs/en/release-notes/system-prompts/claude-fable-5-1)
[54] [Claude Sonnet 3.5 system prompts](https://platform.claude.com/docs/en/release-notes/system-prompts/claude-sonnet-3-5)
[55] [Using GPT-6 (Model guidance)](https://developers.openai.com/api/docs/guides/latest-model)
[69] [AntiSlop Sampler README](https://github.com/sam-paech/antislop-sampler)
[77] [How to Clean Up AI-Generated Drafts Without Sounding Like ChatGPT](https://www.louisbouchard.ai/ai-editing/)
[83] [GPT detectors are biased against non-native English writers](https://arxiv.org/abs/2304.02819)
[84] [People who frequently use ChatGPT for writing tasks are accurate and robust detectors of AI-generated text](https://arxiv.org/abs/2501.15654)
[95] [Use of positive and negative words in scientific PubMed abstracts between 1974 and 2014: retrospective analysis](https://doi.org/10.1136/bmj.h6467)
[114] [Claude Opus 5.5 uses em-dashes 99% less often and sounds more human — but still exhibits 2,548 AI writing tells](https://venturebeat.com/data/claude-opus-5-5-uses-em-dashes-99-less-often-and-sounds-more-human-but-still-exhibits-2-548-ai-writing-tells)
[115] [Guide to Distinguishing AI-Generated Text from Human Writing (human_detectors repo, Russell et al. 2025)](https://github.com/jenna-russell/human_detectors/blob/main/prompts/detection_guide.txt)
[125] [Claudisms - a living banlist of AI-writing tells](https://claudisms.ai/)
[127] [LLM writing styles](https://www.refsmmat.com/notebooks/llm-style.html)
[128] [Most biomedical publications show signs of LLM-assisted writing](https://arxiv.org/abs/2608.10715)
