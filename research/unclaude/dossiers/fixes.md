# Dossier: Fix guidance and over-correction (F8)

## Summary

This dossier covers the rewrite side of /unclaude: once a scout lane has flagged a pattern, what should the single reviewer agent actually do to the text, and what does a bad fix look like? The evidence comes from one peer-reviewed study of expert edits on LLM prose (LAMP, "Can AI writing be salvaged?"), several open-source de-AI skills (humanizer, unslop, avoid-ai-writing, stop-slop, deslop), Wikipedia's AI-cleanup guidance, a professional editing agency's published protocol (Proofed), vendor prompting guides (Anthropic, OpenAI), and evaluations of commercial "humanizer" tools (DAMAGE, Pangram, practitioner stress tests).

The sources broadly agree on four points. First, the default operation is to replace or cut, not to add. Second, rewriting quality matters more than detection quality. Third, surface fixes such as stripping dashes or swapping words leave the underlying problem (vague, unsupported, padded content) in place and often create a new tell. Fourth, the most damaging over-corrections are the ones that change meaning: invented specifics, paraphrased quotations, deleted hedges on unverified claims, deleted load-bearing absolutes, and injected personality. Where the sources disagree is on blanket rules: stop-slop and deslop ban all adverbs and all triads, while humanizer, unslop, Proofed and underslop keep a pattern whenever it carries information. This dossier recommends the conditional, keep-when-informative position for the reviewer agent.

## Facet Questions and Scope
<!-- facet: F8 -->

- What edit operations do expert editors use on AI prose, and in what proportion?
- For each common pattern (contrast framing, closers, triads, dashes, hedges, significance inflation, vague attribution, bold-label lists, mannered metaphor, throat-clearing, chatbot offers, stiff verbs, passive voice, list fragmentation), what is the recommended fix, and when should the pattern be kept?
- Which over-correction failure modes are documented: mechanical dash stripping, semicolon swaps, staccato fragments, fake typos, synonym-swap tortured phrases, invented specifics, injected first person and personality, paraphrased quotations, deleted load-bearing absolutes, flattened voice, cliché-for-cliché swaps, iterative humanizing, and detector score as a target?
- What does vendor guidance say about describing target prose positively versus banning patterns?

Out of scope: detection cues themselves (covered by other facets), except where a fix rule depends on a detection threshold.

## Source Groups and Findings

### 1. Edit operations and the default direction (peer-reviewed)

The LAMP study analysed professional writers' edits on LLM-generated paragraphs. In expert edits of AI text, replacements are most frequent (74%), followed by deletions (18%) and insertions (8%) [100]. <!-- claim: 4c161ddaafe76cb4; evidence: b92d15263a4d22f1; source: 604a33a5ff2aff54 --> The paper's recommendations quote the editing maxim that overwriting is a bigger problem than underwriting, so the rule for most writers is "If in doubt, cut it" [100]. <!-- claim: 71e74d4353ae59c1; evidence: da1dbf29b94a333b; source: 604a33a5ff2aff54 --> Its most important finding for /unclaude's architecture is that writer-marked spans and automatically detected spans produced almost identical preference ranks, which the authors read as evidence that span detection is not the bottleneck and that the rewriting module dictates pipeline performance [100]. <!-- claim: 69c4ce187271ef72; evidence: c87b4439a03588ef; source: 604a33a5ff2aff54 --> In other words, the reviewer agent's fix rules matter at least as much as the scouts' recall.

LAMP also shows where LLM rewriters do well and badly. For Unnecessary Exposition, an LLM editor handles the shape "[Main clause], [explanatory tail]" well by deleting the tail, but the harder problem is prose that spells out its own subtext [100]. <!-- claim: eb5a6db3c05812fb; evidence: b9f588dfb65efac4; source: 604a33a5ff2aff54 --> Prompting alone does not prevent the pattern: the authors report that generated responses were rife with clichés even though the prompt explicitly asked the models to avoid clichés and overused tropes [100]. <!-- claim: 6c54c777c065ec1d; evidence: 266b7a08f053a076; source: 604a33a5ff2aff54 -->

Fix implication (inference): the reviewer should treat replacement with a plainer phrase as the normal operation and deletion as the second. Insertion should be rare and limited to material already present in the source or supplied by the user.

### 2. Wikipedia cleanup: fix substance, check sources, salvage facts

Wikipedia's Signs of AI writing page warns editors not to treat the signs themselves as the problems to fix, because doing so could just make detection harder; the real problems are the deeper concerns (sourcing, neutrality, puffery) [1]. <!-- claim: ff481c45843aa851; evidence: e44863d757639d85; source: 216545f88fe97a24 --> The WikiProject AI Cleanup guide says the most reliable test is whether the sources support the text, and that it is efficient to prioritise checking sentences which contain AI signs [2]. <!-- claim: 45e6e0dd81593cd0; evidence: 472e73ee6fc54ff2; source: d73c5c4ced616d9e --> For remediation, the guide says it is usually more realistic to stubbify or rewrite from scratch than to preserve LLM content and patch it into compliance [2]. <!-- claim: 26585cff3da0cb75; evidence: dd86e32f51d24b5f; source: d73c5c4ced616d9e --> When the prior version is poor, it recommends salvaging basic facts from the content [2]. <!-- claim: ef7940b9bf902000; evidence: 5352ebb06759bb5d; source: d73c5c4ced616d9e -->

Wikipedia also documents one way AI editing goes wrong. Avoidance of basic copulatives ("serves as", "stands as" in place of "is") is particularly visible in AI copyedits, which "improve" plain text in this way [1]. <!-- claim: d2b79395a93892f3; evidence: 698cc630084be37b; source: 216545f88fe97a24 --> The same page lists plain verbs such as "wrote" rather than "authored", "used" rather than "utilized", and "tried" rather than "attempted" as signs of human writing [1]. <!-- claim: 6e5e28a9cb69004a; evidence: 84e30cc323286ba6; source: 216545f88fe97a24 --> So the fix for stiff verbs is the plain verb, and the reviewer must not introduce "serves as" while editing.

Evidence strength: community guidance built from editors' practice. It is not a controlled study, but it rests on years of cleanup work.

### 3. Professional editors' protocol (Proofed; industry report)

Proofed's published checklist turns several patterns into conditional rules.

- Hedges: a hedge often sits in front of an unverified claim, so deleting it blindly makes an unconfirmed statement sound more confident; the first step is to check what the hedge is covering for [126]. <!-- claim: 3b0992a08b23b349; evidence: 2aac88e3fb04be13; source: 2d868d4de107c27b -->
- Dashes and voice: for one client, editors used the CEO's own tone to restore the contractions he would naturally use and capped dashes at two per 500 words, noting that deleting the dash is not the fix if the voice underneath is flat [126]. <!-- claim: 44e88182e60ab1b2; evidence: 4663471b513b9126; source: 2d868d4de107c27b -->
- Contrast framing: editors kept the "not X but Y" construction only when both parts of the comparison added value, observing that usually only one half carries useful information [126]. <!-- claim: 3ad5bb732b941f8c; evidence: ffc0e5db1af20bde; source: 2d868d4de107c27b -->
- Forced triads: editors restructure groups of three into one or two items that carry real weight [126]. <!-- claim: 75a32346fd69e52d; evidence: e93cf4f1bc2012c6; source: 2d868d4de107c27b -->
- Vagueness: the edit-level fix is to swap the vague line for a specific one, such as a statistic or a detail you can check [126]. <!-- claim: d4ff0934458b9ecf; evidence: 0f381b1f88c778ba; source: 2d868d4de107c27b -->
- Passive voice: the usual fix is to name the agent and use the active voice; if the agent cannot be named, the sentence needs more than a grammar fix [126]. <!-- claim: 59a4c40829b75457; evidence: a8c643789c5d3c1c; source: 2d868d4de107c27b -->

Calibrated hedging is not itself a defect: the ERIC hedging study calls the ability to hedge statements appropriately essential to effective scientific communication [97]. <!-- claim: 09fc57b3e6deb414; evidence: 854f51ae9693daac; source: debed86bb967e036 -->

Note the tension between "swap the vague line for a specific one" and the no-fabrication rules in section 4. Proofed's editors have access to the client and the transcript. An automated reviewer usually does not, so it should only use a specific that appears elsewhere in the source; otherwise it should flag the gap.

### 4. Open-source de-AI skills: per-pattern rules (practitioner)

**humanizer (blader, v3.1.0).** This is the most detailed per-pattern fix specification in the corpus.

- Not-X-but-Y: state the point directly, and keep a contrast only when the negative half corrects a belief the reader actually holds or both halves carry information [64]. <!-- claim: cc33fd1642d281f9; evidence: bf9b010124c2c451; source: 143979a9b24d1841 -->
- One-line closers: a short sentence can carry emphasis when it carries a new fact; cut a closer that only repeats [64]. <!-- claim: 8af18763f67febec; evidence: 3612a2ab98b3bd3b; source: 143979a9b24d1841 -->
- Triads: check that each item adds a distinct idea, merge or develop the strongest when they do not, and keep three real items when the meaning needs three [64]. <!-- claim: e82df05e9f0a5d15; evidence: 448b1954f6701274; source: 143979a9b24d1841 -->
- Dashes: replace each with a period, comma, colon or parentheses, or rewrite the sentence, and leave dashes inside code, commands, paths and URLs alone [64]. <!-- claim: 2183db6d165ed2ae; evidence: 46d42b74a8e65f5c; source: 143979a9b24d1841 --> A writer's sample overrides the dash rule, so if the sample uses dashes the rewrite keeps them at about the same rate [64]. <!-- claim: ceec22024b7f84e7; evidence: 60336dbbc35deec5; source: 143979a9b24d1841 -->
- Stacked qualifiers: keep a qualifier only when the source supports it and the meaning needs it, keep scope, legal and safety notices, and treat ordinary hedges like "perhaps" or "tends to" as human habits rather than tells [64]. <!-- claim: 871acf93d68b5999; evidence: db878e79c486f36c; source: 143979a9b24d1841 -->
- Inflated significance: keep the fact, drop the significance, and end on the last concrete fact [64]. <!-- claim: a2eca43f8db9cacf; evidence: d247f0dbb15f4d4e; source: 143979a9b24d1841 -->
- Vague connection: name the relationship the source gives, and if the source does not say, keep the vague wording rather than inventing a role [64]. <!-- claim: caee0a44cb98eb67; evidence: 9754bd52d7b6bf95; source: 143979a9b24d1841 -->
- Bold as decoration: remove the bold and turn a labelled list into prose when the labels carry no information of their own [64]. <!-- claim: 83300eb09871dbbe; evidence: bfb44289e7a32545; source: 143979a9b24d1841 -->

humanizer's process rules matter as much as its pattern rules. It says to state each point naturally rather than patching flagged phrases one at a time, and to rewrite the paragraph around its main point if a sentence stays awkward [64]. <!-- claim: b8f29d3094e87252; evidence: 7972d5c098214aa5; source: 143979a9b24d1841 --> After rewriting, it re-scans for the tells most likely to survive: contrasts, closers, triads, dashes and bold labels [64]. <!-- claim: b5eef9d17de80ab8; evidence: 313cf595599264c1; source: 143979a9b24d1841 --> It also forbids adding a fact, name, number, date, quote or citation unless it comes from the source or the user [3]. <!-- claim: 412ee18e937b62b4; evidence: 9f09667f1110351a; source: 2db4f7d2d7de0ea2 -->

**unslop (theclaymethod).** This skill is the most conservative contract. It repairs concrete defects, leaves everything else unchanged, and prefers a no-op to an uncertain edit [66]. <!-- claim: 36cec624ed9f875b; evidence: c5ad47f9c4194d6c; source: 8870b50ae0ada072 --> A scanner match alone never authorises an edit, and literal, domain-valid, quoted, attributed, accurately caveated or genre-natural uses are protected [66]. <!-- claim: 4e675e8605811eeb; evidence: fc25f23c966ebffc; source: 8870b50ae0ada072 --> Only sentences with confirmed findings are edited, using the smallest repair, and every other sentence is copied byte-for-byte [66]. <!-- claim: 064dc3e2392dfc26; evidence: 9545baa254e7e4b8; source: 8870b50ae0ada072 --> The rewrite may add no claims, advice, personality, anecdote, certainty or conclusion, and it must not substitute filler or produce staccato anti-slop prose [66]. <!-- claim: 210449f3d31928f3; evidence: b0d55d9c7777a8d6; source: 8870b50ae0ada072 --> It preserves force-bearing "never", "must" and "all" exactly in safety, security, legal and technical rules [66]. <!-- claim: 5714930e4def098b; evidence: bc6ee2140a4add33; source: 8870b50ae0ada072 -->

**avoid-ai-writing (conorbronsdon).** This skill names editor-side failure modes as explicit constraints. A rewrite that clears every flag but erases the source's cadence, stance or idiosyncrasies has failed to preserve its voice [68]. <!-- claim: 8e3ff0f82a69f284; evidence: 70f036815480c605; source: 10ac1554017e831d --> The "put voice back" step tends to fail predictably: the model installs a stock personality the author never had, trading one detectable register for a louder one [68]. <!-- claim: e35b322af657d7e4; evidence: f5248d6aca0161d6; source: 10ac1554017e831d --> Staccato conversion means chopping ordinary sentences into fragments to manufacture rhythm; the fix is to vary sentence length by varying the sentences, not by breaking them [68]. <!-- claim: 3fcbc67097d5fc04; evidence: 1a6951c44bf3c435; source: 10ac1554017e831d --> A fabricated specific is worse than the vague phrasing it replaced, so a missing detail should be flagged and left [68]. <!-- claim: 074bddf83def47a4; evidence: ba2c43e755752063; source: 10ac1554017e831d --> A first-person aside is fine when the author wrote it and a failure when the tool inserted it; only provenance tells the two apart [68]. <!-- claim: b8c3ce1d7f2e4bfc; evidence: 887b46069e2906f7; source: 10ac1554017e831d --> Adding dashes for drama during a rewrite should never happen [68]. <!-- claim: fd5cea655c29735d; evidence: 1aff3515720ca955; source: 10ac1554017e831d -->

**Pattern-specific practitioner fixes (underslop, Louis Bouchard).**
- Throat-clearing pivots ("here's the thing"): cut the pivot and start with the claim [116]. <!-- claim: 61ab87920cfa1faf; evidence: 85c3043694f5d1b7; source: 84f726da84dcf6fb -->
- Triads: do not cut one just because it has three items; cut it when the third item repeats the first two or when two triads land back to back [119]. <!-- claim: 9a844063e4981edb; evidence: b85e3a7f44347cee; source: 1ccacfcd3eed4fbf -->
- Adjectives: strip them from a paragraph, put back only the ones that change meaning, and replace mood with detail [77]. <!-- claim: 55a42d77473a9e43; evidence: e1ac563fe9192f87; source: 7ae715e0a2fb5ce2 -->
- Portable intros and recap closers: if the first paragraph could open a different article, cut or rewrite it; if the last paragraph only repeats what the reader knows, delete it [77]. <!-- claim: 85875c8f4e73b49e; evidence: 17bc8949e169ab42; source: 7ae715e0a2fb5ce2 -->
- Structure first: deleting "delve" is not enough, because the skeleton has to change [77]. <!-- claim: 5d12e9377553e8e7; evidence: f2c5e301c5071a36; source: 7ae715e0a2fb5ce2 -->

**Domain keep rule (deslop).** In scientific writing, domain terminology is expected; the targets are business buzzwords and AI vocabulary tells [67]. <!-- claim: 42c2f2d11ced1acd; evidence: 7085855a870f6a5a; source: 171c8455dd272c61 -->

### 5. Vendor guidance: describe the target positively, use literal phrases, lead with the outcome

Anthropic's prompting guide recommends replacing "Do not use markdown" with a positive description: "Your response should be composed of smoothly flowing prose paragraphs" [45]. <!-- claim: 82d1ff5cd4f5d840; evidence: fb5f951581506479; source: da45de5646cbbc5b --> The Opus 5 guide says positive examples of the desired style tend to work better than instructions about what not to do [47]. <!-- claim: 0705a55730add55b; evidence: 660c0be001b7e5fa; source: 545654c2e6e4a55e --> The same guide says to lead with the outcome, so the first sentence answers "what happened" or "what did you find" [47]. <!-- claim: 1727078aa86865e9; evidence: 7e1b042a124283be; source: 545654c2e6e4a55e --> The Fable 5.1 guide treats mannered metaphor as imprecise, because it brings in connotations the writer did not choose, and gives the fix as saying what you mean with the literal phrase when one exists [46]. <!-- claim: 1ac813406c2329f9; evidence: c6834b1339c0d8d6; source: 557f96ccb3270d91 --> The Opus 5.5 guide says to delete invitations to redirect or offers to wait [50]. <!-- claim: df18156aec523fc2; evidence: 18cccaa9c363160b; source: 72a68f793144bdd2 -->

OpenAI's GPT-6 guidance gives a trim order for padded text: keep required facts, decisions, caveats and next steps, and trim introductions, repetition, generic reassurance and optional background first [55]. <!-- claim: 8fd744b5fdab4099; evidence: ec10ed72c9ef6751; source: 5c4b950aaeff3364 -->

The Antislop paper adds peer-reviewed support for this approach: telling a model to avoid banned vocabulary has limited efficacy and can backfire through the "pink elephant" effect [12]. <!-- claim: 3862258f51c59971; evidence: 38cd32741ae430b9; source: 96aebd41d7aadaa7 --> Its pipeline also runs extra iterations to catch slop that appears after the first set is banned [12]. <!-- claim: 6106f0157c4f5869; evidence: 5ebe3b547c8dc03e; source: 96aebd41d7aadaa7 --> For /unclaude, this means the reviewer prompt should describe the target prose positively and the pass should end with a re-scan.

### 6. Over-correction failure modes

**Mechanical em-dash stripping and punctuation monotony.** Wikipedia notes that LLMs now rarely use alternate punctuation, leaving commas and periods more common than in human text, and that this has become its own sign of AI writing [1]. <!-- claim: 85be9252fc0cd79c; evidence: 0f24e7f94d81fee3; source: 216545f88fe97a24 --> Swapping em dashes for semicolons by reflex creates a repeated semicolon cadence that reads as generated as the dashes did [42]. <!-- claim: 3a04926dc370f867; evidence: 1c37132241d09e9d; source: 7f0b10b580ddda7b --> One agency argues that three em dashes in two sentences is a structure problem whose fix is cleaner writing with fewer dashes, not zero dashes out of fear [79]. <!-- claim: 103356234166f9e8; evidence: 3acca099930b150c; source: a3cb732d5d3be63e --> The same source says that when an em dash is used where a hyphen or en dash belongs, the fix is to correct the mark rather than delete the punctuation [79]. <!-- claim: 7786c675a2abaf23; evidence: 48fdab0f49674dec; source: a3cb732d5d3be63e --> The extreme case is a commercial humanizer whose output contained zero hyphens across 194 texts, turning "multi-ethnic inner-city street" into "multi, ethnic inner, city street" [75]. <!-- claim: e5bb7fd0408bd391; evidence: e37fcf84c5a079e1; source: 3b957664240fc36e --> A detector vendor puts it plainly: a slop paragraph with every em dash deleted is still slop, still vague and substance-free [94]. <!-- claim: 0478c81f69a5a906; evidence: 11180f911c1f886d; source: d46fd106c5817168 -->

**Staccato fragments and the replacement fingerprint.** The DAMAGE audit describes a humanizer that splits every sentence into single-clause statements and calls the output unnatural and low-quality [74]. <!-- claim: 461ba4b2e9700e92; evidence: 126338b05a6248b0; source: 01c098d2d5f066bc --> A practitioner stress test of the humanizer skill found it replaced one AI fingerprint with another: fragments, shrug closers, and one-sentence paragraphs stacked like index cards [76]. <!-- claim: 1aa804ee066646f1; evidence: 5476f6d1c7a5eb15; source: 3c875bce4cfa4dff -->

**Information loss.** The same test found that seven of ten rewrites were shorter than the originals, and in six of those cases substantive content vanished [76]. <!-- claim: 7e08115860445654; evidence: 662cb8c4775ea0c6; source: 3c875bce4cfa4dff -->

**Synonym-swap tortured phrases and meaning drift.** Tortured phrases arise when a word-by-word synonym substitution is applied to a multi-word term, replacing the established phrase [73]. <!-- claim: d6c3aa36cc774c4b; evidence: 6870b0dc7623abdd; source: 1f19853b9e98661a --> DAMAGE found a trade-off: LLM-based humanizers are weakly grounded in the source, while rules-based synonym replacers stay closer to it [74]. <!-- claim: 686503d21c0c5bf9; evidence: fcc669170e43f837; source: 01c098d2d5f066bc --> The better humanizers adopt the writing level and tone of the original document instead of imposing one of their own [74]. <!-- claim: 91a1d590d73232cd; evidence: b3997833bc4fa875; source: 01c098d2d5f066bc -->

**Paraphrased or altered quotations.** Pangram documents a humanizer that edits the original quote itself, so readers are led to believe the altered quote is real [75]. <!-- claim: 60aec05a52426d34; evidence: c21c2beea62175a8; source: 3b957664240fc36e -->

**Invented specifics and injected personality.** See section 4 (avoid-ai-writing, unslop, humanizer). LAMP adds that Lack of Specificity is the hardest category for LLM editors, and that they sometimes replace clichés with other clichés [100]. <!-- claim: b6e8880d9d81039f; evidence: 54caae6b3e249a72; source: 604a33a5ff2aff54 -->

**Fake informality and fake typos.** In the expert-annotator study, o1-Pro's frequent contractions and colloquialisms fooled one of the expert annotators [84]. <!-- claim: 18b32aa7e1f74a31; evidence: 2c42bce11b9eb484; source: 94bc1872a6410141 --> Students accused by detectors report deliberately leaving words misspelled to avoid accusations [81]. <!-- claim: c903fa3f4f53e5de; evidence: 76613c2d7eeec6b5; source: ba9147a911779d1c --> Neither is good writing, so the reviewer should never add typos or slang the author did not use.

**Iterative LLM humanizing.** The same study's authors abandoned a multi-step LLM humanization pipeline because the repeated LLM calls added more characteristics of AI [84]. <!-- claim: 107fb6ed84ba4a42; evidence: 4ef54be080b8bd6c; source: 94bc1872a6410141 -->

**Flattening and sanding off.** One humanizer vendor argues that a team which strips every em dash, every triplet and every strong statement is sanding off the only parts of the draft that had a pulse [5]. <!-- claim: a4abb82a43d24c74; evidence: 44c8c2320da40ae6; source: c3e630563d972c51 -->

**Detector score as a false target.** In the stress test, detection scores were completely decoupled from publishability [76]. <!-- claim: 9827e77653eb59b9; evidence: 4fac2261d31b2af5; source: 3c875bce4cfa4dff -->

### 7. Model-family notes

The "Last Fingerprint" study found Claude Opus 4.6's em-dash rate fell from 9.09 to 0.19 per 1,000 words (98%) under a prose instruction, and Gemini 2.5 Pro's from 3.53 to 0.00 [28]. <!-- claim: fd88f3d2930ccd85; evidence: 89d71401201424c0; source: 0bbcac4a1b3d1437 --> Under direct prohibition, GPT-4.1 still produced 3.86 per 1,000 words and DeepSeek V3 1.57 [28]. <!-- claim: a54fde460c3d72a9; evidence: dc3e9b4c584fe0a7; source: 0bbcac4a1b3d1437 --> So a post-hoc dash pass matters more for GPT-family drafts, and for Claude drafts a dash cluster more likely means the prompt or source invited it. Generation drift cuts the other way too. Anthropic warns that Claude Fable 5.1 already formats less than earlier models, so an anti-markdown instruction can suppress structure the content needs [45]. <!-- claim: 3142c222af32b451; evidence: 4e2fe163fb3915a9; source: da45de5646cbbc5b --> OpenAI similarly warns that broad brevity instructions can make GPT-5.6 responses too brief [55]. <!-- claim: 0cae563203fff33b; evidence: b85f650f8097b83a; source: 5c4b950aaeff3364 --> Fix rules written against older defaults can over-correct newer models.

## Per-pattern fix table

| Pattern | Default fix | Keep when | Over-correction to avoid |
|---|---|---|---|
| Not X but Y / contrast framing | State Y directly | The negative half corrects a belief the reader holds, or both halves carry information | Deleting a real correction; replacing it with a semicolon pair |
| One-line closer / recap paragraph | Cut | It adds a new fact | Swapping in a different aphorism (cliché for cliché) |
| Forced triad | Merge to one or two weighted items, or develop the strongest | Three distinct items the meaning needs | Blanket "two items beat three" rules; turning every list into a pair |
| Em/en dash cluster | Pick the real relation: period, comma, colon or parentheses; or restructure | Author's sample uses dashes (match its rate); code, paths, URLs; hyphens and en dashes in ranges and compounds | Zero-dash stripping; semicolon swap; breaking compounds; adding dashes |
| Stacked hedges / qualifiers | Verify the claim first, then remove surplus qualifiers | Source-supported uncertainty, scope, legal and safety notices, calibrated academic hedging | Deleting a hedge on an unverified claim (manufactured certainty) |
| Inflated significance / legacy | Keep the fact, drop the significance, end on the last concrete fact | The source states real consequences or plans | Inventing a concrete consequence |
| Vague attribution / vague connection | Name the relationship or source the text already gives | Source gives nothing more: keep the vague wording and flag it | Invented names, numbers, dates, roles |
| Generic adjectives, puffery | Strip; restore only meaning-changing adjectives; replace mood with detail drawn from the source | Domain terms ("weighted interval score") | Fancier diction; invented metrics |
| Stiff verbs, copulative avoidance ("serves as", "utilizes") | Plain verb: is, has, used, wrote, said | Technical senses | Elegant variation of "said" (notes, explains, remarks) |
| Mannered metaphor | Literal phrase | Metaphor is the established term | Replacing one metaphor with another |
| Throat-clearing pivot ("here's the thing") | Cut; start with the claim | n/a | Replacing it with a different opener |
| Chatbot offers / closers ("let me know if") | Delete | Real next steps the reader needs | n/a |
| Preamble / buried lead | Lead with the outcome | Reader genuinely lacks context | Stripping necessary context |
| [Main clause], [explanatory tail] | Delete the tail | The tail adds a new fact | Deleting needed subtext explanation in instructional text |
| Bold-label bullet lists | Remove bold; fold into prose when labels add nothing | Genuinely parallel, sequential or comparative content; reference docs | Stripping structure the content needs, especially on newer low-format models |
| Passive / agentless | Name the agent, use the active voice | Action matters more than actor | Inventing an agent |
| Absolutes (never, must, all) | Soften only rhetorical absolutes | Safety, security, legal and technical rules | Weakening a binding rule |
| Quotations | Never edit | Always keep verbatim | Paraphrasing or "improving" a quote |
| Wordy phrases ("in order to", "the fact that") | Leave alone unless clustered | Isolated instances (Wikipedia lists them as human-leaning) | Tightening them as if they were AI tells |

## Fixer rules for the single reviewer agent

1. Fix the substance, not the marker. A finding is a pointer to a sentence whose content (support, specificity, purpose) must be checked. Clearing the token alone is not a fix.
2. Default operation order: replace with the plain phrase, then cut, and insert only as a last resort. If in doubt, cut it. If in doubt whether a finding is real, do nothing.
3. Smallest repair, minimal diff. Edit only sentences with confirmed findings. Copy everything else unchanged.
4. No fabrication. Never add a fact, name, number, date, quote, citation, tool or mechanism that is not in the source or supplied by the user. Where a specific is missing, keep the vague wording and emit a "needs detail" flag.
5. Verify before removing a hedge. Remove a qualifier only if the claim is supported elsewhere in the text or by the user; otherwise keep it or flag it.
6. Protected material: quotations (verbatim), code, commands, paths, URLs, proper names, domain terms, legal and safety text, and force-bearing never/must/all in rules.
7. Author's sample beats the pattern list. Match the author's dash rate, contraction rate, sentence length and register. Restore contractions only where the author uses them.
8. Never inject: first-person asides, anecdotes, opinions, humour, slang, deliberate typos, rhetorical questions, or dashes the author did not write.
9. No staccato. Vary rhythm by rewriting sentences, not by chopping them into fragments or one-line paragraphs.
10. Punctuation: choose the true relation (period, comma, colon, parentheses, restructure). Never reflex-swap dashes to semicolons, and never break hyphenated compounds.
11. No synonym swaps on established multi-word terms. When a word must go, prefer the plain word over a "fancier" synonym, and do not cycle speech verbs (use "said" or "says").
12. Clichés: replace with the literal claim or delete. Never replace one stock phrase with another.
13. Rewrite at paragraph level when patches pile up. If two or more findings land in one paragraph, restate its main point plainly rather than patching each phrase.
14. Keep conditions are part of every fix. Contrast stays if both halves inform or it corrects a real belief. A triad stays if the items are distinct. A closer stays if it adds a fact. A list stays if the content is parallel or sequential.
15. Re-scan once after fixing for the survivors (contrasts, closers, triads, dashes, bold labels) and for fixer-introduced tells (semicolon runs, fragments, "serves as", new clichés). One verification pass, not an iterative humanizing loop.
16. Do not optimise for detector scores. The target is clear, accurate, voice-preserving prose.
17. Length guard: a rewrite that loses a required fact, decision, caveat or next step is a regression. Trim intros, repetition, generic reassurance and optional background first.

## Counterevidence and Disagreements

- **Blanket rules versus conditional rules.** stop-slop's core rules say to remove throat-clearing openers, emphasis crutches and all adverbs [65]. <!-- claim: 0634e1f76e1184e7; evidence: 6fdb7f15522ba938; source: 041055887f823eb7 --> The same skill says two items beat three and bans em dashes [65]. <!-- claim: 7545f7850921b7c0; evidence: 4ffb127c4269aaa7; source: 041055887f823eb7 --> deslop's quick check says a three-item list should become two items or one [67]. <!-- claim: ff0c0e71c179e013; evidence: 8b8632f5b216aa0b; source: 171c8455dd272c61 --> humanizer, unslop, underslop and Proofed all keep a pattern when it carries information. This dossier sides with the conditional rules because of the documented harm from mechanical stripping (sections 4 and 6). The blanket rules have no evaluation behind them in the corpus.
- **Is an em dash a tell at all?** A columnist at The Ringer argues it would be a tragedy if writers abandoned em dashes out of fear of sounding like AI, since the dash is one of the best tools for not sounding robotic [78]. <!-- claim: edd175ce727eb941; evidence: 8dfe03e4ca47919c; source: ce6f4964d0a45799 --> One agency admits spending billable effort on find-and-replace passes that scrubbed a correct punctuation mark out of good copy [79]. <!-- claim: 6f53ed4a54e46acb; evidence: 79ac1014f9cf98cd; source: a3cb732d5d3be63e --> humanizer bans dashes unless the writer's sample uses them, and Proofed settles on a rate cap. A rate cap combined with the author's sample is the best-supported compromise.
- **Wordy constructions.** Wikipedia lists isolated wordy constructions such as "in order to" and "the fact that" as signs of human writing [1]. <!-- claim: e6e41a638c510500; evidence: 2f807dea41e4125c; source: 216545f88fe97a24 --> Many style-guide-driven de-AI tools tighten them anyway. The reviewer should leave isolated instances alone.
- **Plain diction versus vocabulary enrichment.** The detector-bias study found that enriching non-native writers' vocabulary cut false positives, and its authors note that such writers may need AI tools to refine vocabulary and linguistic diversity to evade false detection [83]. <!-- claim: 284a32e32df35d12; evidence: 5c988b30e72f3291; source: 05ea0961d7fe712d --> In that study the enrichment cut the average false positive rate by 49.45%, from 61.22% to 11.77% [83]. <!-- claim: 14350147bccac242; evidence: 0678f84a40b7a1ea; source: 05ea0961d7fe712d --> That is a detector artefact, not a writing goal. A de-AI pass that pushed plain writers towards fancier diction would be optimising for the detector, which conflicts with the plain-verb evidence from Wikipedia and the expert-annotator study, where experts note humans repeat "says" while AI cycles through descriptive synonyms like "notes" and "explains" [84]. <!-- claim: a7350dc3e02d21c2; evidence: 3d0f5823aa8782a6; source: 94bc1872a6410141 -->
- **Can surface fixes ever succeed?** Classifiers trained on paraphrased LLM responses keep similar accuracy to those trained on the originals, so model signatures survive rewording [21]. <!-- claim: 86d207728f946e6d; evidence: 165d2e0bbbb115b7; source: 5b0ec3b4902b975f --> Wikipedia warns that telling an editor about the signs can lead them to mask or superficially fix the content [2]. <!-- claim: e502bcda9588b0d2; evidence: ce5098f4b1c0e6fb; source: d73c5c4ced616d9e --> McGarry, quoted by Wired, argues that any cosmetic counterstyle can be mimicked by AI and that the only true counterstyle is good writing [80]. <!-- claim: 18dc0ed63e95b261; evidence: f9df117692a3ce52; source: 8cb3dbba543901ef --> All three support the substance-first rule, and they suggest /unclaude should not promise undetectability.
- **Specificity: add it or flag it?** Proofed and Bouchard say to replace vague lines with checkable specifics. avoid-ai-writing, unslop and humanizer forbid invention. These are compatible only if "specific" means "drawn from the source or the user". The reviewer agent should follow the stricter rule.

## Methodological Limits and Open Gaps

- Only LAMP gives a controlled, quantified view of expert edit operations, and it covers short literary and creative paragraphs, not technical or business documents. Its 74/18/8 operation split may not transfer.
- The humanizer, unslop and avoid-ai-writing rules are design documents. Apart from the stress test of humanizer (n=10, practitioner), none has a published evaluation. humanizer's README reports that judges in a blind test preferred its rewrite over the original AI text 16 times out of 16 [3]. <!-- claim: c1468a6e56d18299; evidence: 045250a6944143ce; source: 2db4f7d2d7de0ea2 --> That is a small, self-reported sample. The over-correction lists are plausible and consistent with each other, but they are mostly unmeasured.
- Proofed's dash cap (two per 500 words) is one agency's house rule for one client, not a validated threshold.
- No source measures how often a de-AI reviewer deletes load-bearing hedges or absolutes. The risk is argued from mechanism, not counted.
- No evidence directly compares paragraph-level rewriting with phrase-level patching on quality. humanizer recommends paragraph-level rewriting and unslop recommends minimal diffs. The recommendation here (minimal diff by default, paragraph rewrite when findings cluster) is a synthesis, not a tested result.
- Model-specific fix needs rest mainly on dash-rate data. There is no per-model evidence for which fix rules over-correct which model's drafts, beyond vendor warnings about newer Claude and GPT models formatting and padding less.

## Proposed lane material

This is not a scout lane. It is the reviewer agent's rulebook, plus one optional verification lane.

- **Reviewer contract (key: `reviewer`).** Scope: per finding, with a paragraph-level rewrite when two or more findings cluster in one paragraph. It applies the fix table and fixer rules 1 to 17 above. Inputs: the consolidated report, the source text, and an optional author sample. Outputs: the edited text, plus a list of "needs detail" and "needs verification" flags for gaps it refused to fill.
- **Post-fix verification lane (key: `fixer-regressions`, title "Fixer-introduced tells").** Scope: diff-aware, whole document; it runs once after the reviewer.
  Hunt:
  - semicolon runs where dashes used to be;
  - new one-sentence paragraphs and fragment runs;
  - net loss of hyphens in compounds;
  - edited or paraphrased text inside quotation marks;
  - new numbers, names or dates absent from the source;
  - new first-person asides, rhetorical questions or slang;
  - new "serves as"/"stands as";
  - a closer or cliché swapped for another;
  - removed never/must/all in rule-like sentences;
  - removed hedges on claims with no support in the text;
  - more than about 15% length loss, or loss of facts, decisions, caveats or next steps.
- **Keep-list to hand every lane:**
  - quotations;
  - code, paths and URLs;
  - domain terms;
  - legal and safety text and binding absolutes;
  - calibrated hedges;
  - the author's own dashes, contractions and asides (match the sample's rate);
  - isolated wordy phrases;
  - lists for parallel or sequential content;
  - contrasts that correct a real belief;
  - triads of distinct items;
  - short sentences that carry a new fact.
- **Per-model notes:**
  - GPT-family drafts keep dashes even under a prohibition, so the dash fix is needed more often.
  - In Claude drafts, dashes are rarer when prose is requested, so a dash cluster usually reflects the prompt or source.
  - On newer Claude and GPT models, do not strip structure or shorten further by default; check that needed lists and next steps survive.
- **Prompt style for the reviewer:** describe the target prose positively ("plain, specific, connected paragraphs in the author's register; lead with the outcome; literal phrases"). Avoid a long banned-word list, and include one or two positive before-and-after examples.

## Bibliography
[1] [Wikipedia:Signs of AI writing](https://en.wikipedia.org/wiki/Wikipedia:Signs_of_AI_writing)
[2] [Wikipedia:WikiProject AI Cleanup/Guide and resources](https://en.wikipedia.org/wiki/Wikipedia:WikiProject_AI_Cleanup/Guide_and_resources)
[3] [humanizer (SKILL.md v3.1.0 and README)](https://github.com/blader/humanizer)
[5] [Following The Wikipedia AI Sign of Writing Could Backfire (Wikipedia's Signs of AI Writing: ... And Why Following It Can Make Your Writing Worse)](https://humanizeai.com/blog/wikipedia-signs-of-ai-writing-could-make-your-content-worse/)
[12] [Antislop: A Comprehensive Framework for Identifying and Eliminating Repetitive Patterns in Language Models](https://arxiv.org/abs/2510.15061)
[21] [Idiosyncrasies in Large Language Models](https://arxiv.org/abs/2502.12150)
[28] [The Last Fingerprint: How Markdown Training Shapes LLM Prose](https://arxiv.org/abs/2603.27006)
[42] [Why AI Keeps Writing 'Not X, But Y'](https://brandonlazovic.dev/articles/llm-negative-parallelism-tic/)
[45] [Prompting best practices](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices)
[46] [Prompting Claude Fable 5.1](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-fable-5-1)
[47] [Prompting Claude Opus 5](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-opus-5)
[50] [Prompting Claude Opus 5.5](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-opus-5-5)
[55] [Using GPT-6 (Model guidance)](https://developers.openai.com/api/docs/guides/latest-model)
[64] [humanizer/SKILL.md (Humanizer: remove AI writing patterns, v3.1.0)](https://github.com/blader/humanizer/blob/main/SKILL.md)
[65] [stop-slop (SKILL.md, references/structures.md, references/phrases.md)](https://github.com/hardikpandya/stop-slop)
[66] [unslop SKILL.md and references/core-contract.md](https://github.com/theclaymethod/unslop)
[67] [deslop SKILL.md (De-AI-ify scientific writing)](https://github.com/stephenturner/skill-deslop)
[68] [avoid-ai-writing SKILL.md (Avoid AI Writing — Audit & Rewrite)](https://github.com/conorbronsdon/avoid-ai-writing)
[73] [Tortured phrases: A dubious writing style emerging in science. Evidence of critical issues affecting established journals](https://arxiv.org/abs/2107.06751)
[74] [DAMAGE: Detecting Adversarially Modified AI Generated Text](https://arxiv.org/abs/2501.03437)
[75] [How AI Humanizers Work (And Why They Don’t)](https://www.pangram.com/blog/ai-humanizers-the-slop-2-problem)
[76] [I Stress-Tested Blader's Humanizer So You Don't Have To](https://ankitvora2.substack.com/p/day-1-of-testing-ai-agents-humanizer)
[77] [How to Clean Up AI-Generated Drafts Without Sounding Like ChatGPT](https://www.louisbouchard.ai/ai-editing/)
[78] [Stop AI-Shaming Our Precious, Kindly Em Dashes—Please](https://www.theringer.com/2025/08/20/pop-culture/em-dash-use-ai-artificial-intelligence-chatgpt-google-gemini)
[79] [The Em Dash Is Not an AI Tell. It's Punctuation.](https://foureyes.com/em-dash-is-not-an-ai-tell/)
[80] [More Typos, Fewer Em Dashes: Writers Are Creating an Anti-AI ‘Literary Counterculture’](https://www.wired.com/story/more-typos-fewer-em-dashes-writers-are-creating-an-anti-ai-literary-counterculture/)
[81] [To avoid accusations of AI cheating, college students turn to AI](https://www.nbcnews.com/tech/internet/college-students-ai-cheating-detectors-humanizers-rcna253878)
[83] [GPT detectors are biased against non-native English writers](https://arxiv.org/abs/2304.02819)
[84] [People who frequently use ChatGPT for writing tasks are accurate and robust detectors of AI-generated text](https://arxiv.org/abs/2501.15654)
[94] [Is the Em Dash an AI Tell? We Measured Dash Density Across Human vs AI Texts (2026)](https://slopdetector.org/blog/em-dash-ai-tell-data)
[97] [The Author in the Text: Hedging Scientific Writing](https://files.eric.ed.gov/fulltext/ED390258.pdf)
[100] [Can AI writing be salvaged? Mitigating Idiosyncrasies and Improving Human-AI Alignment in the Writing Process through Edits](https://arxiv.org/abs/2409.14509)
[116] [The throat-clearing pivot: "here’s the thing" and its cousins](https://underslop.com/tells/heres-the-thing)
[119] [The rule of three: the AI tell our own data argues against](https://underslop.com/tells/rule-of-three)
[126] [AI Editing Checklist: How We Edit AI Drafts](https://proofed.com/knowledge-hub/ai-editing-checklist-how-to-spot-and-fix-ai-writing-patterns)
