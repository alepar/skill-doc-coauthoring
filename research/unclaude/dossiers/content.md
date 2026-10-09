# Dossier: Content-level tells (genericness, low information, missing stance, speculative gap-filling)

## Summary

Content-level tells concern what a passage says, not how its sentences are built. The strongest-evidenced family is regression to the mean: a model trades a rare, specific fact for a common, generic, usually positive description, so the text gets vaguer and more inflated at the same time. Around that core sit related patterns. Redundant exposition restates what is obvious or implied. A passage answers a nearby question instead of the one asked. Relationships are softened to "associated with". Every side gets equal, shallow coverage with no stance. Source-availability hedges are followed by speculative filler. Templated specifics appear (Emily/Sarah, "Dr. X", "Elara"). Some text describes itself instead of its subject. Endings over-explain the theme and tie it up neatly. The peer-reviewed anchors are the LAMP corpus and taxonomy (Chakrabarty et al.), the slop taxonomy of Shaib et al. (Information Utility = Density + Relevance; Information Quality = Factuality + Bias), the preference-model "vagueness" bias work, and the homogenization studies. Wikipedia's Signs of AI writing and several practitioner skills (humanizer, avoid-ai-writing, stop-slop) supply most of the detection cues.

The main design constraint for a /unclaude lane is on the fix side. Writers and models alike find "add specificity" the hardest edit. It is also the edit most likely to produce fabrication. A content lane should therefore delete, narrow, or state the gap. Where the passage needs a fact the text does not contain, it should flag the gap for the author and never fill it.

## Facet Questions and Scope

<!-- facet: F4 -->

F4 covers content-level tells. The questions are how to recognise generic-over-specific prose, redundant or obvious exposition, restated questions, symmetric no-stance coverage, vague relational verbs, source-availability hedges with gap-filling, templated or hallucinated-sounding specifics, meta-narration about the document, over-explained themes and tidy endings, and homogenization. It also asks how the Shaib et al. slop taxonomy and the LAMP categories map onto detectable spans, and what a safe fix is for each. Lexical vocabulary lists, sentence templates ("not X but Y"), formatting, and sycophancy belong to other facets. They appear here only where they overlap with content.

## Source Groups and Findings

### 1. Regression to the mean: generic over specific

**What it is.** Wikipedia's guide gives the mechanism directly: the LLM tends to omit specific, unusual, nuanced facts, which are statistically rare, and replace them with more generic, positive descriptions, which are statistically common [1]. <!-- claim: 81640b140d410b0b; evidence: 5fc2013ae053af83; source: 216545f88fe97a24 --> The same guide puts the detection signature in one line: the subject becomes simultaneously less specific and more exaggerated [1]. <!-- claim: effe0c2025726c46; evidence: 703fa9421abf8a9f; source: 216545f88fe97a24 --> The LAMP authors (peer-reviewed) give the training explanation: when autoregressive objectives are combined with RLHF adjustment, models default to common, generic descriptions rather than specific ones because those are safer predictions [100]. <!-- claim: 1958529125e96f7c; evidence: cb284f8082f53a1c; source: 604a33a5ff2aff54 --> The humanizer skill makes the same point about readers: a language model makes the choice that fits the widest range of readers and subjects, while a human writer chooses for one reader and one subject [3]. <!-- claim: 5bae7ea61e0674d5; evidence: 1cf2f31776a659b7; source: 2db4f7d2d7de0ea2 --> Anthropic's own prompting guide tells Claude that it tends to converge toward generic, "on distribution" outputs, which users call the "AI slop" aesthetic (vendor doc) [45]. <!-- claim: b73abb9be0a0b50a; evidence: c5bff08c8d434571; source: da45de5646cbbc5b -->

In LAMP, "Lack of Specificity and Detail" is one of seven expert categories. It is described as reliance on broad generalizations that fails to engage readers [100]. <!-- claim: 0d15f9ed520f7c5d; evidence: bec6cc553c265610; source: 604a33a5ff2aff54 --> It was also the hardest category for LLM editors: they often failed to add engaging details, and sometimes swapped one cliché for another [100]. <!-- claim: b7b0fa9c4929a835; evidence: 54caae6b3e249a72; source: 604a33a5ff2aff54 --> Peer-review monitoring work (peer-reviewed) found that reviews containing "et al." had lower estimated AI modification. The authors read the missing scholarly citations as content an expert reviewer would include and generated text leaves out [7]. <!-- claim: ffdf6e11fb9602e5; evidence: 40253382698029f5; source: f2f7eea8d36a2dd1 -->

**Detection.** These cues are inference drawn from the sources above.
- A noun phrase that names a category where a member would be expected: "a leading company", "various factors", "many experts", "several studies", "key stakeholders". Regex seeds: `\b(various|numerous|several|many|key|leading|notable)\s+(factors|experts|studies|stakeholders|companies|aspects|elements)\b`.
- Evaluative praise attached to a subject with no fact behind it ("a revolutionary titan of industry"). Flag a sentence when it contains an evaluative adjective and no number, proper noun, date or concrete mechanism.
- Density heuristic: count proper nouns, numerals and dates per 100 words. A paragraph with none of these, in a genre that needs them (report, review, biography, technical doc), is a candidate. Treat this as a soft signal and never as a verdict.
- Vague declaratives that announce importance without saying what it is. stop-slop lists examples such as "The reasons are structural", "The implications are significant" and "The stakes are high" [65]. <!-- claim: c32e065c25777ed3; evidence: 833cce30fdd0a41f; source: 041055887f823eb7 -->

**Fix.** Where the source or the surrounding text already holds the specific (a name, figure or mechanism given elsewhere in the document), move it in. Where it does not, either cut the generic sentence or narrow it to what is actually known, and flag the gap for the author. The humanizer rule is: do not add a fact, name, number, date, quote, or citation unless it comes from the source or the user; if a sentence needs a detail you do not have, ask for it or write a simpler sentence [3]. <!-- claim: 71c2cf595aced9b8; evidence: 9f09667f1110351a; source: 2db4f7d2d7de0ea2 --> avoid-ai-writing names the trap directly: specificity is the most tempting fix because it often reads better, a fabricated specific is worse than the vague phrasing it replaced, and when the concrete detail is missing the editor should flag the gap and leave it [68]. <!-- claim: f5f6794dd6eea840; evidence: ba2c43e755752063; source: 10ac1554017e831d -->

**Over-correction.** The reviewer invents numbers, people, studies or company names to make a sentence read as human. This is the worst failure mode for this facet, because it turns a style problem into a factual error.

### 2. Unnecessary or redundant exposition (restating the obvious, spelling out subtext)

**What it is.** LAMP defines this category as excessive, repetitive or implied information, often restating the obvious or adding details of little value [100]. <!-- claim: df86c8f900bdb835; evidence: 260abd79fafaab10; source: 604a33a5ff2aff54 --> Across GPT-4o, Claude 3.5 Sonnet and Llama 3.1, edits were distributed similarly. The most common categories were Awkward Word Choice (28%), Poor Sentence Structure (20%), Unnecessary/Redundant Exposition (18%) and Clichés (17%) [100]. <!-- claim: 5259dd3cb654fe09; evidence: b4e3ff5c015721a7; source: 604a33a5ff2aff54 --> The corpus behind these numbers is 1,057 LLM paragraphs edited by professional writers, and no model family came out ahead on quality [100]. <!-- claim: 55e2b761e7700276; evidence: 39ad45f224c8db7b; source: 604a33a5ff2aff54 --> The paper's guidance for editors is that overwriting is a bigger problem than underwriting: "If in doubt, cut it" [100]. <!-- claim: 56f94edc19d49bd9; evidence: da1dbf29b94a333b; source: 604a33a5ff2aff54 -->

**Detection.** The paper gives a regex-friendly shape. LLM editors handle `[Main clause] [comma] [exposition]` sentences well by deleting the tail, but the larger problem in this category is text that spells out the subtext [100]. <!-- claim: 3702a7ab006755e3; evidence: b9f588dfb65efac4; source: 604a33a5ff2aff54 --> Practical cues:
- A sentence-final comma clause that glosses the main clause: `, (which|showing|highlighting|reflecting|demonstrating|meaning|indicating) [^.]+\.$`.
- A sentence whose content is entailed by the one before it ("This means that...", "In other words...", "Essentially,...").
- Repeated content. In a PNAS study (peer-reviewed), self-presentations with repetitive content were 8% more likely to be rated as AI-generated and 47% more likely to actually be AI-generated [87]. <!-- claim: 747ea8db52ead779; evidence: 5242b4131d304601; source: 1c828b523d9d3c8f -->

**Fix.** Delete the tail or the entailed sentence. When subtext has been made explicit (a character announcing their own feelings, an essay stating its moral), cut the statement and let the preceding concrete material carry it. Do not replace the statement with a new image or detail.

**Over-correction.** Cutting definitions or context the intended reader actually needs (onboarding docs, safety steps). Cutting every summary sentence in a long report where a summary was requested.

### 3. Low information density and off-target relevance (Shaib et al. slop taxonomy)

**What it is.** Shaib et al. (peer-reviewed) define Information Utility as two parts. Density is the amount of substantive content relative to text length. Relevance is how well the content aligns with the task or prompt [101]. <!-- claim: 7afcf86d44c84485; evidence: e4ddb63093996fa7; source: e9bfb17868e908c3 --> Their Density code covers text that is verbose but conveys little information, and the canonical example opens "In today's fast-paced modern world of cutting-edge technology and innovation" [101]. <!-- claim: fbfaaffc84ab91dc; evidence: 5e8f01a731ce3fca; source: e9bfb17868e908c3 --> The Relevance code is illustrated by a reply to "How can I improve my marathon time?" that lists the general health benefits of running and never addresses marathon times [101]. <!-- claim: 72155f8ae82cd104; evidence: f6dbf5b82fdedc67; source: e9bfb17868e908c3 --> All seven codes significantly predicted a "slop" label, and Relevance, Density and Tone were the strongest predictors [101]. <!-- claim: 7538f8d54d668f45; evidence: 95d0834e556b277d; source: e9bfb17868e908c3 --> The taxonomy also has a Templatedness code, defined partly as frequent text following a common pattern such as "Mr. X, a Y-year-old Z" [101]. <!-- claim: f8d266e6cbdacd6e; evidence: 341a155246ee2a1e; source: e9bfb17868e908c3 -->

Vendor guidance describes the same tell from the producer side. The OpenAI Model Spec says that if the user asks a question, the response should be a direct answer rather than a list of facts [56]. <!-- claim: d96949e57b24adb6; evidence: edf8af1bc3cc93a0; source: 9f6def883554b727 --> OpenAI's GPT-6 guidance gives a trim order: introductions, repetition, generic reassurance and optional background go first, while required facts, decisions, caveats and next steps stay [55]. <!-- claim: 7ff323e5197fefd6; evidence: ec10ed72c9ef6751; source: 5c4b950aaeff3364 -->

**Detection.** For Relevance, compare each paragraph's claim against the stated question or the section heading. Flag paragraphs that would be equally true for any neighbouring question. For Density, flag openers built on "In today's...", "In an era of...", "When it comes to..." and sentences with no content noun phrase beyond the topic word. LLM scouts are unreliable judges here. Models under-predicted the slop label (0.03-0.08 against 0.35 for humans), with very low recall and precision [101]. <!-- claim: e288dc245c907f09; evidence: 92f4b374a2be8667; source: e9bfb17868e908c3 --> o3-mini concentrated almost entirely on Density and missed the other codes annotators used [101]. <!-- claim: ab250096c5c0d833; evidence: 9c45329eddaf665f; source: e9bfb17868e908c3 --> LLM judges also favour length: GPT-4 prefers longer answers more than humans do [111]. <!-- claim: 1562bcd0c06207ff; evidence: 73661245ec1d2e01; source: 236bcb5503059425 --> A scout prompt should therefore list the Relevance and Bias questions explicitly rather than asking "is this sloppy?".

**Fix.** Cut the off-target material and put the direct answer first. Never pad an answer with new facts to make up for the cut.

### 4. Restating the question, re-explaining what the reader knows, writing about the document

**What it is.** The OpenAI Model Spec tells the assistant not to repeat substantial parts of the user's request or information it has already given (vendor doc) [56]. <!-- claim: bc7a6a0e209b0971; evidence: 843b970b22e49ac7; source: 9f6def883554b727 --> The Claudisms banlist (practitioner) puts it bluntly: restating the question before answering is an AI tic, and the fix is to just answer [125]. <!-- claim: a324a320ebf472d6; evidence: b2d48902f6ed0744; source: d6422a35628292a4 --> humanizer adds the wrong-reader variant. In a reply the reader already has the context, so rebuilding it buries the point, and because each sentence reads fine alone, the pattern survives sentence-level cleanup [64]. <!-- claim: 2bebf3711f78db7d; evidence: aca12b0a171027e2; source: 143979a9b24d1841 --> humanizer also names meta-narration, where the text describes itself instead of its subject [3]. <!-- claim: 260e23b1bee743bb; evidence: c2b22733ef3d4116; source: 2db4f7d2d7de0ea2 --> A related residue is chat correspondence pasted into a document. Wikipedia editors report AI text meant as correspondence, prewriting or advice showing up in article content [1]. <!-- claim: 332c2fd9596cac2f; evidence: c9dcb1ac30a402a6; source: 216545f88fe97a24 --> Unfilled template slots are another residue: some users forget to fill in the blanks of chatbot-generated fill-in-the-blank templates [1]. <!-- claim: 14375778c2223326; evidence: 1e86d4c60c2a50e7; source: 216545f88fe97a24 -->

**Detection.**
- Opening sentence paraphrasing the prompt: "You asked about X", "The question of X is...", "When it comes to X,".
- Meta-narration: `\b(this|the following) (document|section|report|article|guide|post) (will|aims to|explores|provides|outlines|covers)\b`, "In this section we", "Below, I", "Let's dive into".
- Advice addressed to the user inside deliverable prose: "you may want to", "feel free to", "let me know if".
- Placeholders: `\[(Your|Insert|Company) [A-Z][a-z]+\]`, `20\d\d-XX-XX`, `PASTE_.*_HERE`.
- Whole-document scope: a closing summary that repeats the body, or a section that restates the previous one. Anthropic's Opus 5 guide notes that files Claude writes to disk (reports, Markdown documents, summaries) are often longer than on earlier models (vendor doc) [47]. <!-- claim: 40577137165c44be; evidence: 1f2abed6f3ff2a8c; source: 545654c2e6e4a55e --> The same guide warns against padding documents with filler sections, redundant summaries or boilerplate [47]. <!-- claim: f5439d7007a56564; evidence: d15acc34b7a218b9; source: 545654c2e6e4a55e -->

**Fix.** Delete the restatement and the meta-sentence, and start with the content. Remove or flag placeholders for the author. Never invent a value for one.

### 5. Vague relationships, overgeneralised attribution, and speculative gap-filling

**What it is.** Wikipedia observes that instead of stating a relationship directly ("In 2017, John Doe was the CEO of ExampleCorp"), LLMs often say the two subjects are "connected to" or "associated with" each other [1]. <!-- claim: 41195a0791c93955; evidence: 8f10d54473f3039f; source: 216545f88fe97a24 --> As of October 2026, Wikipedia lists hedging disclaimers about source availability and vague expressions of connection among the most common signs in new AI text [1]. <!-- claim: 4347c583ac764f95; evidence: c44ad974316da3a1; source: 216545f88fe97a24 --> Models also present views from one or two sources as widely held, or mention "reviewers" or "scholars" in the plural when only one person is cited [1]. <!-- claim: 648a4b3ba1a5a930; evidence: c6e98cccd73c7746; source: 216545f88fe97a24 --> Retrieval-equipped chatbots may attach statements to named sources ("Roger Ebert highlighted the lasting influence") whether or not those sources say anything close [1]. <!-- claim: 6f28a8331132b0d5; evidence: 353d4c37efcee2bf; source: 216545f88fe97a24 -->

The source-availability hedge has its own lexicon: "While specific details are limited/scarce", "not widely available/documented/disclosed", "in the provided/available sources", "based on available information" [1]. <!-- claim: f65ff10c64062868; evidence: 2009987b0e731e32; source: 216545f88fe97a24 --> Wikipedia warns that what follows such a hedge is entirely speculative, including the claim that something is "not documented". For a person's private life, the hedge often becomes "maintains a low profile" [1]. <!-- claim: bfa7e863c5a15c1c; evidence: 9bc31316a5b761c7; source: 216545f88fe97a24 --> The mid-2026 form uses negative parallelism: a source "should be treated as" something speculative rather than definitive, or the available information "does not support" a firm conclusion [1]. <!-- claim: 349adf3f3c3684e9; evidence: d42e5ed1773eb6c9; source: 216545f88fe97a24 --> A related move is a preamble conceding that the subject is minor, followed by an argument for its importance anyway [1]. <!-- claim: adde94ada2d3f172; evidence: 7bce34166e7a250e; source: 216545f88fe97a24 -->

**Detection.** Regex seeds: `\b(associated with|connected to|linked to|tied to|has ties to|in connection with)\b` when no relation verb (founded, led, wrote, funded, taught) appears nearby. Plural-attribution cues: `\b(critics|scholars|experts|reviewers|observers) (have )?(noted|praised|argued|highlighted)\b` with one or no citation. Hedge cues: `\b(limited|scarce) (information|details)\b`, `not (widely )?(documented|available|disclosed)`, `based on (the )?available`, `maintains? a low profile`, `should be (treated|viewed|read) as .{1,40} rather than`. Co-occurrence matters. The Wikipedia guide marks a hedge as most suspect when a plausible-sounding sentence follows it.

**Fix.** humanizer's rule for knowledge-limit disclaimers: state what the source does not show, or remove the sentence [64]. <!-- claim: 3233306c5f748700; evidence: 55c5634881ec4adf; source: 143979a9b24d1841 --> For "associated with", use the actual relation only if the source names it. Otherwise flag "relationship unspecified" for the author. For plural attribution, reduce the plural to the one cited source ("Smith argued"), using the name already present. WikiProject AI Cleanup adds a priority rule. Checking whether the sources support the text is the most reliable test, and sentences carrying AI signs are the efficient place to start [2]. <!-- claim: 724081d50acc0dbd; evidence: 472e73ee6fc54ff2; source: d73c5c4ced616d9e --> In the report, a content-lane finding should mark the sentence "verify" for the author, not just "restyle".

**Over-correction.** Turning "associated with" into a confident but invented relation ("co-founded"). Deleting a legitimate scope statement ("the dataset covers 2019-2023 only").

### 6. Symmetric coverage and missing stance

**What it is.** Bharadwaj et al. (peer-reviewed) describe a "vagueness" bias: models favour broad statements that touch many aspects shallowly over concrete, query-specific information, possibly because vague statements are less falsifiable [103]. <!-- claim: 0f548c34351cf237; evidence: a2897260e51c330e; source: 6c44465befb6a074 --> Reward models and LLM evaluators showed miscalibration above 50% on vagueness and jargon, and a 60.1% preference for verbose responses [103]. <!-- claim: 68050d8d4923bef6; evidence: ed95e7e5e7df37f0; source: 6c44465befb6a074 --> Expert annotators in Russell et al. (peer-reviewed) reported that, unless specifically prompted, AI avoids controversial topics at all costs [84]. <!-- claim: dfd5eddbdae8d9bb; evidence: bc6a518eb5369f78; source: 94bc1872a6410141 --> Anthropic's constitution calls this a failure for Claude. Claude should be diplomatically honest rather than dishonestly diplomatic, and deliberately vague or noncommittal answers given to avoid controversy or placate people violate honesty norms (vendor doc) [61]. <!-- claim: 98cd180771009150; evidence: 28581dd483a2df25; source: aca39f813eea9ac6 --> The OpenAI Model Spec likewise names hedges such as "there's no one-size-fits-all solution" and reminders such as "as a large language model" [56]. <!-- claim: d446daf7607d5bb5; evidence: 0f41fad013868965; source: 9f6def883554b727 --> Shaib et al.'s Bias code covers the opposite failure, one-sided over-standardisation, with the example "The economic policy changes of 2023 were universally beneficial" [101]. <!-- claim: 125ead42807a1977; evidence: 43a114381b8258fd; source: e9bfb17868e908c3 -->

**Detection.** These cues are inference. Look for parallel "On one hand / on the other hand", "Pros / Cons" or "Some argue... others argue..." blocks with equal length and no concluding judgment, in a passage where the prompt or genre asks for a recommendation. Look for closers such as "Ultimately, the best choice depends on your specific needs", "it depends", "there is no one-size-fits-all". Also flag sweeping claims of consensus ("universally", "widely recognised") with no source.

**Fix.** If the text already contains the evidence for a judgment, state the judgment the evidence supports and put it first. If the author's stance is unknown, the reviewer must not invent one. Flag "author to state recommendation" and cut the empty "it depends" closer. For one-sided universal claims, narrow the scope to what the source supports.

**Over-correction.** Manufacturing a strong opinion, or deleting real trade-offs that the reader needs for a decision.

### 7. Templated or hallucinated-sounding specifics

**What it is.** In Russell et al., 63.3% of GPT-4o and 70% of Claude-3.5-Sonnet articles included the name Emily or Sarah [84]. <!-- claim: 00e661a3429398b8; evidence: 75919b974940c15d; source: 94bc1872a6410141 --> After "humanization", names became more varied, but humanized articles used titles such as Dr. and Prof. far more often than human-written ones [84]. <!-- claim: 3d590f03050fcec0; evidence: f35693c5f7d29633; source: 94bc1872a6410141 --> In fiction, the Antislop forensic analysis found models fixating on character names such as "Elara" and "Kael", sensory clichés, and intensifiers like "a profound sense" (preprint) [12]. <!-- claim: e3b4241a74768f62; evidence: 0f24f578ddbb5ef7; source: 96aebd41d7aadaa7 --> A Claude-specific drift is relevant here: across Claude versions, hype words grew less common while "less X, more Y" comparisons and concrete numbers and timeframes grew more common (practitioner/industry corpus analysis) [29]. <!-- claim: ac9d1f5b5ce534bd; evidence: 3b25663675438a9b; source: 56493642657ef5f7 --> This means newer Claude text can look specific without being sourced. Stock round figures ("twenty minutes", "a dozen") can be templated filler too.

**Detection.**
- Name list: `\b(Emily|Sarah|Elara|Kael|Lyra|Elena|Marcus|Chen)\b` in invented examples or fiction. Name-plus-title pattern: `\bDr\. [A-Z][a-z]+ (at|from) (the )?[A-Z]`.
- Apposition template: `[A-Z][a-z]+ [A-Z][a-z]+, a \d{2}-year-old [a-z]+`.
- Round, unsourced quantities in non-fiction: `\b(a dozen|two or three|twenty minutes|dozens of|countless)\b` with no citation.

**Fix.** In fiction or illustrative examples, a stock name can be flagged and offered to the author for a replacement. Choosing a new one is a style choice, not a factual claim. In non-fiction, an unsourced person, institution or statistic must be flagged "unverified; author to confirm or remove". The reviewer must not substitute another invented name or number, because that only swaps one fabrication for a less detectable one.

### 8. Over-explained themes, tidy endings, scope-inflating closers

**What it is.** StoryScope (quoted in Reinhart's notebook) found that AI stories over-explain themes and favour tidy, single-track plots, while human stories present protagonists' choices as more morally ambiguous [127]. <!-- claim: cf23c0d5f15b4578; evidence: 0d047e2ed84a61df; source: a65abd76098d76c4 --> In the TTCW study (peer-reviewed), failing endings included overly moralistic conclusions, unrealistic happy endings and forced theme statements [104]. <!-- claim: e34bb767f2f9eeac; evidence: 5a250c03d4a5ddef; source: 7489d9d233ce8a84 --> One expert put it this way: the AI rarely knew how to end a story, and its endings kept growing in scope, leaving the characters behind to talk about legacy, community and the world at large [104]. <!-- claim: e837dcccf5930e46; evidence: 3296b3398c5f9f6b; source: 7489d9d233ce8a84 --> Experts also found that AI characters frequently over-explain situations and emotions in direct, expository dialogue [104]. <!-- claim: 1e0c33aae7c83487; evidence: 5e4ebdcf1f72da79; source: 7489d9d233ce8a84 --> Overall, LLM stories were three to ten times less likely than expert stories to pass TTCW tests [104]. <!-- claim: 04c203bedf2199bd; evidence: 29903dd418dbeefc; source: 7489d9d233ce8a84 --> For non-fiction, Russell et al.'s experts named "optimistically vague conclusions" among formulaic structures, just behind AI vocabulary as a giveaway [84]. <!-- claim: 2ac545e1bed5a22f; evidence: 26f1bfa61eca6db7; source: 94bc1872a6410141 -->

**Detection.** Position cue: final paragraph or final sentence. Lexical cues: `\b(legacy|testament|reminder that|in the end|ultimately|the true meaning|learned that|a future where|for generations to come)\b`. Structural cue: the closing sentence names an abstract theme (hope, resilience, connection) that the body never stated. Dialogue cue: a character states their emotion outright ("I feel betrayed because...").

**Fix.** End at the last concrete event or fact. Delete the stated moral or the zoom-out to the world. Do not write a new ending image. If removing the closer leaves the piece unresolved, flag it for the author.

### 9. Homogenization (corpus-level, not passage-level)

Padmakumar and He (peer-reviewed) found that writing with InstructGPT, but not base GPT-3, significantly reduced diversity and made different authors' writing more similar [105]. <!-- claim: c192546e31a06f2f; evidence: 1a1d32e154eab402; source: 11ee2b0f26d6aeca --> They describe the risk as content shifting toward the mode: "good but not colorful" writing [105]. <!-- claim: 71c970ad1fc6bb76; evidence: e471ffbd5f6257ff; source: 11ee2b0f26d6aeca --> Doshi and Hauser (peer-reviewed) found that AI ideas made individual stories rate as more creative and better written, yet the AI-assisted stories were more similar to each other than stories by humans alone [106]. <!-- claim: 45d667eb05ae6e32; evidence: 9248f25f97502ab1; source: 376e6ab942be56de --> In conference peer review, higher estimated AI modification correlated with homogenized review content in embedding space (peer-reviewed) [7]. <!-- claim: b36530aecbb18c76; evidence: f6a02ec9b81a98eb; source: f2f7eea8d36a2dd1 --> For a single-passage editor this cannot be measured directly. It shows up locally as the modal choices covered in sections 1, 7 and 8. The lane should treat "could this paragraph appear unchanged in a different document on the same topic?" as the operational test.

### Model-family notes

- LAMP found no quality difference among GPT-4o, Claude 3.5 Sonnet and Llama 3.1. Only minor differences appeared: GPT-4o used more purple prose and Llama more unnecessary exposition (see section 2).
- Claude-specific: Opus 5 tends to produce longer written deliverables (section 4). Newer Claude generations replace hype words with concrete-sounding but possibly templated numbers (section 7). Anthropic reports that Claude Fable 5.1 is more likely than Fable 5 to reproduce source passages in summaries without marking them as quotations (vendor doc) [46]. <!-- claim: 452ec5546014ed2a; evidence: 36a4a33a240987e9; source: 557f96ccb3270d91 --> That is a content-integrity tell a summary lane should check for.
- Drift: Wikipedia notes that older models such as GPT-4 produced more blatantly positive text, while newer ones are subtly positive [1]. <!-- claim: 06f8a97220778262; evidence: 6f5656f292a82f05; source: 216545f88fe97a24 --> Generic praise therefore now shows up less as superlatives and more as quiet evaluative framing.

## Counterevidence and Disagreements

- **Is AI text low-density or high-density?** Goulart et al. (quoted in Reinhart) report that AI-generated texts are more informationally dense, explicit and less involved than student-authored texts [127]. <!-- claim: abb839f282b88b4b; evidence: 977bdf73862a6a92; source: a65abd76098d76c4 --> This seems to conflict with the Density code in the slop taxonomy. A reasonable reading (inference) is that register-level density (nominalisations, noun-heavy prose) is high while propositional novelty relative to the task is low. A density lane should test for new propositions, not for word counts.
- **Missing stance versus missing hedging.** Jiang and Hyland found that ChatGPT essays use significantly fewer hedges, boosters and attitude markers, which gives them an impersonal, expository tone [127]. <!-- claim: 139e32d8b7b884ab; evidence: 94d102f6ff5b59f8; source: a65abd76098d76c4 --> So the stance tell is not simply too much hedging. It is the absence of a writer's position, whether expressed as a hedge or a booster. humanizer warns that ordinary hedges such as "perhaps" or "tends to" are human habits and not tells, and that a qualifier should stay when the source supports it and the meaning needs it [64]. <!-- claim: 5de85baaffb04c38; evidence: db878e79c486f36c; source: 143979a9b24d1841 -->
- **Are content tells model-specific?** The Artificial Hivemind study reports both intra-model repetition and inter-model homogeneity, with different models producing strikingly similar outputs [43]. <!-- claim: 33884b3201c04e07; evidence: 257116eb9a7e0424; source: 2d36eb2b2e6f4735 --> A reevaluation argues that much of this homogeneity is the shared geometry of answering the same prompt [44]. <!-- claim: c27705cc0b82fc79; evidence: f166b1389966e64f; source: ed19da9ae56822b0 --> For /unclaude, this suggests content-lane hunts should be family-agnostic.
- **Specificity as an evasion strategy.** The Claude drift toward concrete numbers (section 7) and the use of honorifics after humanization show that "contains specifics" is no longer evidence of human authorship. Specific-looking but unsourced detail is now a tell in its own right.
- **Subjectivity.** Shaib et al. found binary slop judgments somewhat subjective, though they correlate with dimensions such as coherence and relevance [101]. <!-- claim: bd615a8fccf4438b; evidence: d377c9a506b995a0; source: e9bfb17868e908c3 -->

## Methodological Limits and Open Gaps

- The LAMP data comes mainly from literary fiction and creative non-fiction, so its categories may transfer less well to technical writing, journalism or scientific writing [100]. <!-- claim: f9512d006cfaeb34; evidence: 1edf09003be94a40; source: 604a33a5ff2aff54 -->
- Shaib et al. annotated news and QA. No content-tell study found here covers internal engineering docs, design specs or agent change logs, which are the main /unclaude genres.
- Detection is the easier half. LAMP found that system-detected spans and writer-marked "oracle" spans gave nearly identical results, so detection is not the bottleneck: the rewriting step sets the pipeline's quality [100]. <!-- claim: 6ef741fd6eca7a34; evidence: c87b4439a03588ef; source: 604a33a5ff2aff54 --> This supports investing in reviewer fix rules (delete, narrow, flag) over more scouts.
- No source gives a validated numeric threshold for proper-noun or number density per 100 words. Any threshold in the lane is a heuristic to be tuned.
- The Claude-version drift evidence (section 7) is an industry corpus analysis, not peer-reviewed, and the Fable 5.1 note (model-family notes) is a vendor statement without published rates.
- LLM scouts under-detect slop and over-prefer verbose text (section 3), so content lanes need explicit checklists, not open-ended "find slop" prompts.

## Proposed lane material

**Lane key: `content-generic`. Title: "Generic over specific; empty density; off-target relevance." Scope: per passage, plus a whole-document relevance pass against the stated purpose or question.**
Hunt:
- Category nouns where a member is expected ("various factors", "a leading company", "many experts").
- Evaluative praise with no backing fact. Specificity down plus exaggeration up in the same sentence.
- Vague declaratives ("the implications are significant", "the stakes are high").
- Density openers ("In today's...", "In an era of...", "When it comes to...").
- Paragraphs that answer a neighbouring question (Relevance). The test: could this paragraph appear unchanged in another doc on the topic?
- Unsourced round quantities and stock figures ("a dozen", "twenty minutes", "countless").

Fix: cut, or narrow to what the text already supports. Pull a specific from elsewhere in the same document if one exists. Otherwise leave `[AUTHOR: specify X]` in the report and never fill it.

**Lane key: `content-redundant`. Title: "Redundant exposition, restated question, meta-narration, residue." Scope: per passage plus whole-document (duplicate summaries, sections restating sections).**
Hunt:
- `[main clause], [gloss tail]` sentences; "In other words", "This means that", "Essentially".
- Spelled-out subtext and announced emotions.
- Opening paraphrase of the prompt.
- Self-description ("This document/section will...", "Below, I...").
- Context the reader already has in a reply.
- Closing summary repeating the body.
- Chat residue ("let me know if", "feel free to") and placeholders (`[Your Name]`, `XX-XX`).

Fix: delete. Lead with the decision or content. Flag placeholders for the author.

**Lane key: `content-sourcing`. Title: "Vague relations, overgeneralised attribution, availability hedges, speculative gap-filling, templated specifics." Scope: per sentence. Highest priority for factual genres.**
Hunt:
- "associated with / connected to / linked to" with no relation verb.
- Plural "critics/scholars/experts noted" backed by one or zero sources.
- "limited/scarce information", "not widely documented", "based on available information", "maintains a low profile", "should be treated as X rather than Y".
- A plausible claim immediately after such a hedge.
- Named-source riders ("X highlighted...").
- "Dr./Prof. Name at Institution" and default names (Emily, Sarah, Elara, Kael) in non-fiction.
- Unmarked verbatim source reuse in summaries.

Fix: state what the source does not show, or delete. Reduce plural attribution to the one named source. Mark every such sentence `verify` for the author. Never invent the relation, the person or the number.

**Lane key: `content-stance-ending`. Title: "Symmetric no-stance coverage; over-explained themes and tidy or scope-inflating endings." Scope: whole document (stance) plus final paragraph/sentence of each section (endings).**
Hunt:
- Balanced pro/con blocks with no verdict where one is expected.
- "it depends on your needs", "no one-size-fits-all".
- Unsourced universal consensus claims.
- Moralising or theme-naming last sentences; zoom-out to legacy, community or the world.
- "optimistically vague" conclusions.

Fix: if the text's own evidence supports a verdict, state it first. Otherwise flag "author to state position" and cut the empty closer. End on the last concrete point. Never write a new image or moral.

**Keep-list (do not flag):** genuine scope statements and limitations; ordinary hedges where the evidence is uncertain; legal or safety caveats; definitions the target reader needs; summaries the genre requires (an executive summary at the top of a long report); real trade-off sections in decision docs; and specifics that are sourced.

**Per-model notes:** Treat all content hunts as family-agnostic (LAMP, Hivemind). Claude: watch for over-long written deliverables, concrete-looking but unsourced numbers and timeframes, and unmarked quotation in summaries. GPT-4o era: more purple prose and blatant positivity. Newer models: subtler positivity. Llama: more redundant exposition.

**Reviewer rule (cross-lane):** content fixes may delete, reorder, narrow or flag. They may not add a fact, name, number, date, quote, citation, relation or opinion that is not already in the text or supplied by the author. When the only good fix needs a missing fact, leave the sentence (or its narrowed form) and record an author question in the report.

## Bibliography

[1] [Wikipedia:Signs of AI writing](https://en.wikipedia.org/wiki/Wikipedia:Signs_of_AI_writing)
[2] [Wikipedia:WikiProject AI Cleanup/Guide and resources](https://en.wikipedia.org/wiki/Wikipedia:WikiProject_AI_Cleanup/Guide_and_resources)
[3] [humanizer (SKILL.md v3.1.0 and README)](https://github.com/blader/humanizer)
[7] [Monitoring AI-Modified Content at Scale: A Case Study on the Impact of ChatGPT on AI Conference Peer Reviews](https://arxiv.org/abs/2403.07183)
[12] [Antislop: A Comprehensive Framework for Identifying and Eliminating Repetitive Patterns in Language Models](https://arxiv.org/abs/2510.15061)
[29] [AI Tells](https://graphite.io/five-percent/research/ai-tells)
[43] [Artificial Hivemind: The Open-Ended Homogeneity of Language Models (and Beyond)](https://arxiv.org/abs/2510.22954)
[44] [How Strong Is the Evidence for the Artificial Hivemind? Reevaluating Evidence for the Open-Ended Homogeneity of Language Models](https://arxiv.org/abs/2609.33936)
[45] [Prompting best practices](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices)
[46] [Prompting Claude Fable 5.1](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-fable-5-1)
[47] [Prompting Claude Opus 5](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-opus-5)
[55] [Using GPT-6 (Model guidance)](https://developers.openai.com/api/docs/guides/latest-model)
[56] [OpenAI Model Spec (2026/08/18)](https://model-spec.openai.com/2026-08-18.html)
[61] [Claude's Constitution](https://www.anthropic.com/constitution)
[64] [humanizer/SKILL.md (Humanizer: remove AI writing patterns, v3.1.0)](https://github.com/blader/humanizer/blob/main/SKILL.md)
[65] [stop-slop (SKILL.md, references/structures.md, references/phrases.md)](https://github.com/hardikpandya/stop-slop)
[68] [avoid-ai-writing SKILL.md (Avoid AI Writing — Audit & Rewrite)](https://github.com/conorbronsdon/avoid-ai-writing)
[84] [People who frequently use ChatGPT for writing tasks are accurate and robust detectors of AI-generated text](https://arxiv.org/abs/2501.15654)
[87] [Human heuristics for AI-generated language are flawed](https://doi.org/10.1073/pnas.2208839120)
[100] [Can AI writing be salvaged? Mitigating Idiosyncrasies and Improving Human-AI Alignment in the Writing Process through Edits](https://arxiv.org/abs/2409.14509)
[101] [Measuring AI "Slop" in Text](https://arxiv.org/abs/2509.19163)
[103] [Flattery, Fluff, and Fog: Diagnosing and Mitigating Idiosyncratic Biases in Preference Models](https://arxiv.org/abs/2506.05339)
[104] [Art or Artifice? Large Language Models and the False Promise of Creativity](https://arxiv.org/abs/2309.14556)
[105] [Does Writing with Language Models Reduce Content Diversity?](https://arxiv.org/abs/2309.05196)
[106] [Generative AI enhances individual creativity but reduces the collective diversity of novel content](https://doi.org/10.1126/sciadv.adn5290)
[111] [Verbosity Bias in Preference Labeling by Large Language Models](https://arxiv.org/abs/2310.10076)
[125] [Claudisms - a living banlist of AI-writing tells](https://claudisms.ai/)
[127] [LLM writing styles](https://www.refsmmat.com/notebooks/llm-style.html)
