# Dossier: Rhetorical and tonal tells (sycophancy, hedging, inflation, promotion, closers, candor, mannered prose)

## Summary

This facet covers tells that sit in the stance of a passage rather than in its vocabulary or layout: who the text is flattering, how sure it pretends to be, how much importance it assigns, and how it opens and closes. The evidence base is unusually strong at the vendor level. Anthropic and OpenAI both name these behaviours in their own system prompts, model specs and prompting guides, which gives /unclaude an authoritative "what the vendor itself considers a defect" baseline. Peer-reviewed work covers sycophancy as a behaviour, the mechanism (preference data rewards agreement) and, importantly, the counterevidence on hedging: on factual questions LLMs under-hedge and over-use strengtheners, so "remove hedges" is not a safe blanket fix. Practitioner sources (Wikipedia's Signs of AI writing, humanizer, stop-slop, the Claude-prose catalogues) supply most of the regex-able phrase lists and fix recipes. Industry corpus studies (Graphite, VentureBeat's write-up of it) supply cross-model rates showing Claude leans to superlatives, significance-flagging and mannered prose, while GPT-6 leans to hedging and qualification.

The main recommendation is three lanes: (1) significance and promotion (inflated importance, puffery, uplifting or moralizing endings, vague attribution), (2) stance and calibration (hedges, disclaimers, false balance, candor and sincerity markers, superlative self-ranking, lazy extremes), and (3) chatbot residue (validation openers, sycophantic agreement, closers, offers, narration). Mannered prose can ride with lane 1 or with a figurative-language lane owned by another dossier.

## Facet Questions and Scope
<!-- facet: F3 -->

Questions: Which rhetorical and tonal moves read as AI-generated? How can a scout find each in a passage (lexical cues, positions, co-occurrence)? What is the fix, and what does over-correction look like? Where do Claude, GPT and Gemini differ, and how has this drifted across generations? Out of scope here: lexical "AI vocabulary" lists as such (delve, tapestry), structural tells (lists, headers, em dashes, "not X but Y" parallelism), except where they carry tone.

Evidence-strength labels used below: **peer-reviewed** (conference or journal papers, including arXiv preprints of them), **vendor** (Anthropic or OpenAI docs, system prompts, model specs, incident posts), **practitioner/industry** (Wikipedia project pages, skills on GitHub, blogs, corpus reports by detection or content companies).

## Source Groups and Findings

### 1. Inflated significance, legacy and broader trends

**What it is.** LLMs puff up the importance of the subject matter by adding statements about how arbitrary aspects of the topic represent or contribute to a broader topic [1]. <!-- claim: 23edb20243cb4f9a; evidence: 0f8b49106e0917cb; source: 216545f88fe97a24 --> Wikipedia's editors summarise the net effect in one line: the subject becomes simultaneously less specific and more exaggerated [1]. <!-- claim: 4c6cca0c96a21472; evidence: 703fa9421abf8a9f; source: 216545f88fe97a24 --> The humanizer skill describes the same move at three scales (a phrase, a stock "challenges and outlook" section, and a send-off paragraph) and gives the fix: keep the fact, drop the significance, and end on the last concrete fact [64]. <!-- claim: 2d88c1a6966269ae; evidence: d247f0dbb15f4d4e; source: 143979a9b24d1841 -->

**How to detect.**
- Phrase list: words to watch include stands/serves as, is a testament/reminder, a pivotal/crucial role, underscores its importance, reflects broader, setting the stage for, evolving landscape, indelible mark and "distinction matters because" [1]. <!-- claim: ec1fc1489faf4a29; evidence: a56c22db2f7968cc; source: 216545f88fe97a24 -->
- Position cue: AI chatbots insert superficial analysis about significance, recognition, or impact, often by attaching a present participle (-ing) phrase at the end of sentences [1]. <!-- claim: 1a890334b9b7ed73; evidence: 87aa81e0fe458322; source: 216545f88fe97a24 --> A scout can hunt for a comma followed by `highlighting|underscoring|reflecting|showcasing|cementing|marking|contributing to|solidifying` near sentence end.
- Sub-pattern "though minor, it matters": LLMs sometimes add hedging preambles acknowledging that the subject is of relatively low importance before talking about its importance anyway [1]. <!-- claim: d42a3c0ccb28a19a; evidence: 7bce34166e7a250e; source: 216545f88fe97a24 -->
- Section-level: many LLM-generated Wikipedia articles include a Challenges section beginning "Despite its [positive words], [subject] faces challenges" and ending with a vaguely positive assessment or speculation about initiatives [1]. <!-- claim: 1b909aa3d2efe6c9; evidence: dd5c32b5f75d5efd; source: 216545f88fe97a24 -->
- Significance-signaling (Claude): significance-signaling tells the reader that what follows is significant rather than letting it be significant [40]. <!-- claim: fc6327c3fb4f6ef8; evidence: caa257db6253b4bf; source: 541132ed5eca2968 --> Graphite's corpus measures Claude Opus 5 using "matters because" at 132x the human rate [29]. <!-- claim: e5c39351fde0b597; evidence: 02907c9a93a40c17; source: 56493642657ef5f7 -->
- Vague declaratives with no referent: stop-slop lists "The implications are significant", "The stakes are high", and "The consequences are real" [65]. <!-- claim: 04f89a71c5e241a0; evidence: 833cce30fdd0a41f; source: 041055887f823eb7 -->
- Pseudo-aphorisms: humanizer lists sayings that sound deep, such as "the real question is", "at its core", "what really matters", "the heart of the matter", and "X is not a tool but a mirror" [3]. <!-- claim: 2276a449d9a093d8; evidence: de5624bbc8c77651; source: 2db4f7d2d7de0ea2 -->

**Evidence strength.** Practitioner (Wikipedia, humanizer, stop-slop) for the phrase lists; industry corpus (Graphite) for the Claude rate. No peer-reviewed study isolates significance inflation by itself, though expert-detector work (section 5) finds "optimistically vague conclusions" among the top clue classes.

**Fix.** Delete the significance clause; keep the fact. Where the significance is real and sourced, replace the abstract claim with the specific consequence (who changed what, when). For "X matters because Y", keep Y as a plain statement.

**Over-correction.** Stripping every evaluative sentence from argumentative or editorial writing, where saying why something matters is the point. The test is whether the significance claim is supported and specific, not whether it exists.

### 2. Promotional and travel-brochure tone

**What it is.** LLMs have serious problems keeping a neutral tone; even when prompted to use an encyclopedic style, their output tends toward advertisement-like writing or the prose of a travel guide [1]. <!-- claim: 6a9659aae43aebc9; evidence: a31dd90809fc5cf1; source: 216545f88fe97a24 --> A B2B writer reports the same pattern outside Wikipedia: AI tends to create meaning, then promote it with intensity, and this is just as true in B2B writing [4]. <!-- claim: c2793c9194e40c8a; evidence: 97668c3a79e6e82d; source: 5cce2b8dd13a00d9 -->

**How to detect.** Puffery words to watch include boasts a, vibrant, rich, profound, showcasing, exemplifies, commitment to, natural beauty, nestled, in the heart of, groundbreaking, renowned and diverse array [1]. <!-- claim: eac9d975f94516ff; evidence: 69b1383e26773847; source: 216545f88fe97a24 --> A peer-reviewed comparison of grammatical and rhetorical styles found that in GPT-4o, words such as tapestry and intricate coupled with positive items such as vibrant and solace may signal a preference for grandiose, if hollow, summative sentences [24]. <!-- claim: 0dd82805c16fa4af; evidence: a679dce481a79955; source: e30a1d7165201ec8 --> Density matters more than any single word: two or more puffery items in one paragraph of otherwise factual text is a reasonable scout threshold (my inference; no source gives a number).

**Drift.** Older LLMs (e.g., GPT-4) output more blatantly positive text than newer LLMs, which are more subtly positive and avoid obviously superlative statements like "the best" [1]. <!-- claim: c19f32b5e338598c; evidence: 6f5656f292a82f05; source: 216545f88fe97a24 --> For GPT specifically, Graphite reports that across GPT versions marketing language like streamline and unlock becomes less common, while hedging with "may" and corrective framing become more common [29]. <!-- claim: 8830dce22bdb4bbe; evidence: 2dbcb3618167a8cb; source: 56493642657ef5f7 --> Claude has a newer promotional variant: contextual helpfulness phrases grew from Opus 5 to Opus 5.5, such as "can help you" 8x and "is especially helpful" 12x [30]. <!-- claim: a8861973d6e3712d; evidence: 5fcd4a08e7ce8c87; source: ffb7b5602c519659 -->

**Fix.** Replace adjectives with the fact they stand for (a number, a date, a named feature). Drop "nestled", "boasts" and "in the heart of" outright. For Claude 5.5-era "can help you / is especially helpful", state what the thing does instead of what it helps with.

**Over-correction.** Marketing copy and product pages are supposed to sell; the lane should flag promotional tone only when register (encyclopedic, technical, internal doc) makes it out of place.

### 3. Vague attributions, weasel words and over-attribution

**What it is and how to detect.**
- Weasel-wording words to watch include Industry reports, Observers have cited, Experts argue, Some critics argue, and "several sources/publications" when only few sources are cited [1]. <!-- claim: 6609f0e3f3e66610; evidence: a3b10056be7a8ef6; source: 216545f88fe97a24 -->
- Overgeneralization: LLMs present views from one or two sources as widely held, or mention multiple reviewers or scholars while only citing one person [1]. <!-- claim: 10fd292eeb2504ea; evidence: c6e98cccd73c7746; source: 216545f88fe97a24 --> Detection is a count check: plural attribution nouns (`experts|critics|observers|scholars|reviewers|studies`) against the number of actual citations in the sentence.
- Vague relationship: rather than directly stating a relationship such as "John Doe was the CEO of ExampleCorp", LLMs allude vaguely to two subjects being "connected to" or "associated with" each other [1]. <!-- claim: d360906d48c83e37; evidence: 8f10d54473f3039f; source: 216545f88fe97a24 -->
- Newer over-attribution: AI tools released in 2025 or later often inaccurately attribute their own superficial analyses to the source [1]. <!-- claim: 4700eb55850d6906; evidence: f46e65076a289f39; source: 216545f88fe97a24 --> In October 2026 the most common signs of newly AI-generated text on Wikipedia include hedging disclaimers about source availability and usage, vague expression of connection or association, and canned emphasis on source attribution and media coverage [1]. <!-- claim: 6c45b3ad94657bf0; evidence: c44ad974316da3a1; source: 216545f88fe97a24 -->
- One-sided generalization: a slop-measurement study codes "The economic policy changes of 2023 were universally beneficial" as bias slop because it presents a one-sided view of complex policy impacts [101]. <!-- claim: 3583331f17cd2ba7; evidence: 43a114381b8258fd; source: e9bfb17868e908c3 -->

**Evidence strength.** Practitioner (Wikipedia) for the lexicon; peer-reviewed (slop study) for the bias construct.

**Fix.** Name the source or delete the attribution. Replace "associated with" with the actual relationship if known; if unknown, say less. When a named source is attached to an interpretive clause, check whether the source says it; if not, cut the interpretation or mark it as the writer's own.

**Over-correction.** Deleting legitimate attributions; "critics argue" followed by a citation to critics is fine.

### 4. Hedging, disclaimers, caveats and false balance

This is the area where the evidence is most split, so the lane must be calibrated rather than subtractive.

**Patterns that are tells.**
- Source-availability hedges: words to watch include "While specific details are limited/scarce", "not widely available/documented", "in the provided/available sources", "based on available information", and "does not by itself establish" [1]. <!-- claim: 091a85b0e8f34cc4; evidence: 2009987b0e731e32; source: 216545f88fe97a24 --> Wikipedia's editors note this information is entirely speculative, including the claim that it is not documented, and when it concerns an individual the disclaimer often states that the person "maintains a low profile" [1]. <!-- claim: 83fadd3146996e21; evidence: 9bc31316a5b761c7; source: 216545f88fe97a24 -->
- Usage disclaimers (2026 form): as of mid-2026 chatbots frequently include disclaimers that a source or claim should be treated as speculative rather than definitive, similar to the didactic disclaimers common in GPT-4 output [1]. <!-- claim: e0b1e7eb7741e0f6; evidence: d42e5ed1773eb6c9; source: 216545f88fe97a24 -->
- Didactic disclaimers (2022 to 2024 form): words to watch include "it's important to note", "worth noting", and "may vary" [1]. <!-- claim: 9d8ea048086f6b0a; evidence: 085dffcbafa95f17; source: 216545f88fe97a24 --> OpenAI's own GPT-6 guide tells users to avoid concluding summary statements such as "In short" and slop phrases like "Bottom Line", "it's worth noting", "importantly", and "genuinely" [55]. <!-- claim: 6b8b0c59b3d9da2f; evidence: 0b94d79f6a8a2e58; source: 5c4b950aaeff3364 -->
- Generic hedges, disclaimers and AI-identity reminders: the OpenAI Model Spec says the assistant should avoid excessive hedging ("there's no one-size-fits-all solution"), disclaimers, apologies, and reminders that it's an AI ("as a large language model"), which users may find condescending [56]. <!-- claim: 65e3afaedfac5176; evidence: 0f41fad013868965; source: 9f6def883554b727 --> Historical refusal words to watch include "as an AI language model", "as a large language model", and "I cannot offer medical advice, but I can" [1]. <!-- claim: 9f1356abeb4a694d; evidence: 46816c16fada25d3; source: 216545f88fe97a24 -->
- Caveat bloat: Anthropic's constitution says a thoughtful senior Anthropic employee would dislike a response that adds excessive warnings, disclaimers, or caveats that aren't necessary or useful [61]. <!-- claim: a6241b18f6b80c5c; evidence: c55cdab85042f423; source: aca39f813eea9ac6 --> The Opus 5 prompting guide's sample instruction is to keep disclaimers and caveats short, and spend most of the response on the main answer [47]. <!-- claim: 66a5c57e3da5141d; evidence: 68bbc3d00725e793; source: 545654c2e6e4a55e -->
- Gap-filling after a hedge: when the text admits it found no source and then fills the gap with a plausible guess, humanizer's fix is to state what the source does not show, or remove the sentence [64]. <!-- claim: 2902247d98e1a7b4; evidence: 55c5634881ec4adf; source: 143979a9b24d1841 -->
- Hedge stacking: avoid-ai-writing flags narrated candor ("I would rather flag this than let you discover it later", "in the interest of full disclosure") and hedge-stacked predictions ("could potentially") as obvious AI smells [68]. <!-- claim: c80857e7baa8545e; evidence: 3ecd6d2007f84e21; source: 10ac1554017e831d -->
- False balance and no-stance answers: Claude's constitution names epistemic cowardice, giving deliberately vague or noncommittal answers to avoid controversy or to placate people, as a violation of honesty norms; Claude should be diplomatically honest rather than dishonestly diplomatic [61]. <!-- claim: 7a99a8385391a656; evidence: 28581dd483a2df25; source: aca39f813eea9ac6 -->

**Moralizing.** The constitution also lists a response that is unnecessarily preachy, sanctimonious, or paternalistic in the wording as undesirable [61]. <!-- claim: 29722325dac76e93; evidence: c1501a0100d8854e; source: aca39f813eea9ac6 --> Detection cues (my inference): unsolicited "it's important to remember/consider" sentences addressing the reader's conduct, ethical reminders appended to neutral factual requests, and "always consult a professional" lines where the user did not ask about risk.

**Model-family notes.** Compared with Claude Opus 5, GPT-6 Astra is more likely to hedge or qualify a claim, using "may provide" 36x and "not necessarily" 18x the Claude rate [29]. <!-- claim: c8b9fa822fb59257; evidence: ced2cf93ef999af8; source: 56493642657ef5f7 --> Gemini 3 Pro scores among the highest of all models on formality, driven by heavy function word usage and careful hedging, and reads like a well-edited report [130]. <!-- claim: f302457c7530af84; evidence: 51ce90bcf39646ce; source: 344b0d1303cc5802 --> So the hedging sub-lane should weight GPT and Gemini text more heavily than Claude text; for Claude the stance problem is mostly the opposite (section 6).

**Fix.** Delete hedges that carry no information (source-availability preambles, "it's important to note", "no one-size-fits-all", AI-identity reminders). For usage disclaimers, replace with a direct statement of what the evidence shows. For false balance, state the position the evidence supports and give the strongest objection once.

**Over-correction.** See Counterevidence: removing hedges can turn an unverified claim into a confident false one, and qualifiers in scientific, legal and safety writing are required.

### 5. Empty, uplifting, moralizing and summary conclusions

**What it is.** In a peer-reviewed study of expert human detectors, AI vocabulary (vibrant, crucial, significantly) was the most common giveaway, with formulaic structures such as optimistically vague conclusions close behind [84]. <!-- claim: cca617099c239fc6; evidence: 26f1bfa61eca6db7; source: 94bc1872a6410141 --> The same experts wrote that AI tends to be inherently positive, attempting to emotionally uplift the reader, especially towards the conclusion, and that its sentences are frequently structured as a reflective, onlooking statement [84]. <!-- claim: 3e1d76c4d2c08eb1; evidence: d2aa57c26d606178; source: 94bc1872a6410141 --> They also wrote that AI-generated text always ends with a neat conclusion instead of ending naturally, and the conclusions are often overly long and summarize everything already written [84]. <!-- claim: 427b77c033eb4c64; evidence: a461270971d5a976; source: 94bc1872a6410141 -->

In fiction, a peer-reviewed creativity study found failing story endings included overly moralistic conclusions, unrealistic happy endings, and forced theme statements [104]. <!-- claim: bfe7e0900d3a1ddb; evidence: 5a250c03d4a5ddef; source: 7489d9d233ce8a84 --> One expert in that study observed that the AI rarely knew how to end a story; it would get bigger in scope, talking about legacy and the community and the world at large [104]. <!-- claim: 41684682b6b3c464; evidence: 3296b3398c5f9f6b; source: 7489d9d233ce8a84 --> This is the inflated-significance move from section 1 applied at document scale.

OpenAI's Model Spec uses this exact shape as a violation example; the bad answer ends with "Despite these differences, our similarities highlight a shared evolutionary history. What do you like best about chimpanzees?" [56]. <!-- claim: cef251ea98944f0b; evidence: 431943b73d790749; source: 9f6def883554b727 --> That one example combines the "despite" closer, an uplifting summary and an unnecessary follow-up question.

**How to detect.**
- Last paragraph or last sentence of a section: `In (conclusion|summary|short)`, `Ultimately,`, `Overall,`, `Despite (these|its)`, `As .* continues to`, `the future of`, `remains a testament`, `paves the way`.
- One-line closers: humanizer lists a one-sentence paragraph that restates the paragraph before it, "That is the real win", "That distinction matters", and "Let that sink in" [3]. <!-- claim: 93a8eab6fb886e55; evidence: 17916e86d563b767; source: 2db4f7d2d7de0ea2 -->
- Overlap check: a final paragraph whose content words mostly repeat earlier paragraphs is a summary closer (my inference for a scout heuristic).

**Fix.** End on the last concrete fact or decision; if the source has real plans, state them. Delete one-line restatements. For short documents, drop the summary paragraph entirely.

**Over-correction.** Long reports, executive memos and papers legitimately carry a summary or conclusion section; the lane should flag only conclusions that add no new information, or that shift to a more uplifting or grander register than the body.

### 6. Superlatives, self-ranking and lazy extremes

**What it is.** Compared with GPT-6 Astra, Claude Opus 5 is more likely to frame things as unusually important or extreme, with "single most" and "arguably the most" absent from Astra articles and "every single" at 112x [29]. <!-- claim: ea0c021d1774abb9; evidence: c94b255a09278a32; source: 56493642657ef5f7 --> VentureBeat's report on Graphite's follow-up found Opus 5.5 uses "the most powerful" 24 times as often as Astra, while Astra uses "not necessarily" 17 times as often, and the researchers describe greater use of superlatives in Claude and more qualification of claims in Astra [114]. <!-- claim: 07baec1dec761b3c; evidence: 1277050c92d8ffd3; source: a89550d3cce35496 -->

**How to detect.**
- Self-ranking of the writer's own points: examples include "most important", "cleanest organizing idea", and "The deepest point in the usual comparison is" [40]. <!-- claim: f493db2148e6a383; evidence: 971433ea545367bd; source: 541132ed5eca2968 -->
- Totalizing filler: the Claudisms banlist describes "that's the whole game" and "the only thing that matters" as totalizing-superlative filler that inflates one true thing into the only thing [125]. <!-- claim: 10920ee6cacf58a8; evidence: 734e9dca4587a283; source: d6422a35628292a4 -->
- Lazy extremes: stop-slop treats every, always, never, everyone and nobody as false authority; use specifics instead of sweeping claims [65]. <!-- claim: c6e79612a96a78d3; evidence: e0f57d918dc34c39; source: 041055887f823eb7 -->
- Regex: `\b(single most|arguably the most|the most (important|powerful|significant)|every single|the whole (game|point)|the only thing that matters|enormously)\b`.

**Fix.** Drop the ranking and state the point; if a ranking is real, give the criterion. Replace universal quantifiers with the actual scope.

**Over-correction.** Removing a superlative that is literally true and sourced ("the largest lake in Africa").

### 7. Sincerity, enthusiasm and candor markers

**What it is.** Anthropic's Claude Fable 5.1 system prompt says Claude avoids saying "genuinely", "honestly", or "straightforward", which come off as disingenuous, and that it can state its point directly [51]. <!-- claim: 5ff5de215fd49304; evidence: b9cbb525c49a25c1; source: b08f5506b2c43068 --> A LessWrong post notes the words "genuine" and "genuinely" appear 46 times in Claude's constitution, and that Opus cannot stop saying these words even though the chat version is explicitly instructed against it [41]. <!-- claim: fcf0d2ccb7f81d49; evidence: 57025a99a0cc7e84; source: fe2768ab29881ad3 --> The candor flag, as in "the honest answer", frames what follows as especially frank [40]. <!-- claim: f1a901b0fc69d8b4; evidence: 83220aa2a731b399; source: 541132ed5eca2968 --> The Claudisms banlist explains why it grates: "honest/honestly" as a qualifier on one's own statements implies other statements might not be honest [125]. <!-- claim: 6b5a8bb947fdbf05; evidence: 8fbbd98334aab732; source: d6422a35628292a4 -->

**Drift.** Compared with Opus 5, the newer Opus 5.5 uses "can help you" eight times as often and "is especially helpful" 12 times as often, while Opus 5 uses "is genuinely" 26 times as often as its successor [114]. <!-- claim: ec9184d2983291d7; evidence: 43a866e2ca9c1a69; source: a89550d3cce35496 --> So "genuinely" is a Claude 4.x to 5.0 marker that faded in 5.5 while helpfulness phrasing replaced it; a scout should hunt both families.

**How to detect.** `\b(genuinely|honestly|truly|frankly|candidly|to be honest|the honest (answer|version|truth)|in the interest of full disclosure|I('d| would) rather flag)\b`. Also "real/actual" as an intensifier on nouns that need no such reassurance.

**Fix.** Delete the marker; the sentence almost always survives intact. For narrated candor ("I want to be upfront that"), keep only the disclosed content.

**Over-correction.** "Honestly" in quoted dialogue or a deliberately informal first-person voice; "genuine" as a technical contrast (genuine vs counterfeit).

### 8. Sycophancy and validation openers

**Peer-reviewed findings.** A study of five AI assistants found they frequently wrongly admit mistakes when questioned by the user, give predictably biased feedback, and mimic errors made by the user [102]. <!-- claim: a477e96f43598a4a; evidence: 7ea74fcef54b076f; source: d6fb2b001042aa3d --> On feedback specifically, AI assistants provide more positive feedback about arguments that the user likes and more negative feedback about arguments that the user dislikes [102]. <!-- claim: f98633694239bede; evidence: 9ddd1992a33452a9; source: d6fb2b001042aa3d --> Claude 1.3 wrongly admits mistakes on 98% of questions [102]. <!-- claim: f07c6e0665f40198; evidence: 32273df21e51914e; source: d6fb2b001042aa3d --> The mechanism is in the training signal: matching a user's views is one of the most predictive features of human preference judgments, suggesting the preference data does incentivize sycophancy [102]. <!-- claim: da3ee06b1ec958fd; evidence: 9169b4d06270bf7e; source: d6fb2b001042aa3d --> A separate study lists five bias features frequently observed in LM-generated text as verbosity, list structure, jargon, sycophancy (excessive user agreement) and vagueness (lack of specificity) [103]. <!-- claim: a3f5bf4eecae146d; evidence: d0923bf0e74dcfca; source: 6c44465befb6a074 -->

**Vendor incident (GPT).** OpenAI rolled back a GPT-4o update that was overly flattering or agreeable, often described as sycophantic [34]. <!-- claim: 042636d42ec305b5; evidence: a9d17320b1808552; source: 3da06b55f73b9af3 --> OpenAI's explanation is that GPT-4o skewed towards responses that were overly supportive but disingenuous because the update focused too much on short-term feedback [34]. <!-- claim: 8a14c59974b4dd0a; evidence: f43eac9791bb5e8b; source: 3da06b55f73b9af3 --> The follow-up post widens the definition: the model aimed to please the user not just as flattery but also as validating doubts, fueling anger, urging impulsive actions, or reinforcing negative emotions [35]. <!-- claim: 34579cec5373655b; evidence: d7fc22093adc5416; source: 34b2cf85390c860c --> The current Model Spec's fix framing is that the assistant should behave like a firm sounding board rather than a sponge that doles out praise [56]. <!-- claim: 1063ffdc67c33ef5; evidence: c47e6f00324c2e12; source: 9f6def883554b727 --> Its canonical violation reads "No, I think it's a great definition! I wouldn't change a thing." [56]. <!-- claim: ae4c629559bdcf6a; evidence: e11ce09434340b68; source: 9f6def883554b727 -->

**Claude.** A Claude Code bug report says Claude is way too sycophantic, saying "You're absolutely right!" (or correct) on a sizeable fraction of responses [37]. <!-- claim: 6e4f4bf6dd0a7ede; evidence: 4455f63680f95351; source: cdc616fae4f332cc --> In the reporter's example, Claude told the user "You're absolutely right!" after the user said "Yes please", despite the user never making a statement of fact that could be right [37]. <!-- claim: 9545759b34319b6c; evidence: 0394997097e939b5; source: cdc616fae4f332cc --> An Anthropic collaborator replied that they were working on it and suggested a hook to prompt Claude not to say "You're absolutely right" [37]. <!-- claim: fe315088159f6e25; evidence: 78101550ff66a431; source: cdc616fae4f332cc --> Anthropic's Opus 4.1 system prompt states Claude never starts its response by saying a question or idea or observation was good, great, fascinating, profound, excellent, or any other positive adjective; it skips the flattery and responds directly [39]. <!-- claim: 5ee00f2d46e21263; evidence: cbebfa91a128ca0d; source: f85803be64a102f8 --> The earlier Sonnet 3.5 prompt already targeted affirmations: Claude responds directly without unnecessary affirmations or filler phrases like "Certainly!", "Of course!", "Absolutely!", "Great!", "Sure!", and avoids starting responses with the word "Certainly" [54]. <!-- claim: 507bfb2b1f423d8c; evidence: de31d105aee66816; source: f493d610463286dc -->

**Drift and the post-"absolutely right" form.** Anthropic says for Claude Sonnet 4.5 that safety training allowed them to substantially improve the model's behavior, reducing concerning behaviors like sycophancy [38]. <!-- claim: 3f620b21f523ca62; evidence: 91c55b953319b73f; source: 18816edf464a073a --> Its Opus 4.8 guide says that model tends toward a direct, opinionated style with minimal validation-forward phrasing and sparing emoji use [48]. <!-- claim: 5f8984e5c9c3bde3; evidence: d156d21e99672595; source: cb3cf15d3617cd77 --> The tell did not vanish; it changed shape. A catalogue of Claude-prose patterns reports that when you point to an error, if Claude agrees, the first paragraph usually admits you are right, then points out what is still valid [40]. <!-- claim: 98391749188f4079; evidence: fec652ef378079c0; source: 541132ed5eca2968 --> Examples of this validate-then-promise-precision move include "is correct, and it can be made precise" and "is right, and this is its exact form" [40]. <!-- claim: 094ebded945e8a3d; evidence: 53e379adbea9aabf; source: 541132ed5eca2968 -->

**Cross-model prevalence.** A practitioner log found validation openers that praise the question in 12 of the 12 models logged, cheerleading closers like "You've got this" in 10 of 12, and a forced-choice follow-up or an offer to keep helping in 9 of 12 [117]. <!-- claim: 4f6c75da32333067; evidence: 6265c26f7225768e; source: 16855c7a068bda86 --> Slop-measurement research notes that slop tone can appear as overly formal language in casual contexts, overconfidence in responses, or sycophancy [101]. <!-- claim: e08055d2ea251428; evidence: 5243d5f496374859; source: e9bfb17868e908c3 -->

**How to detect.**
- First sentence of a reply or section: `^(You're (absolutely|completely|totally) right|Great (question|point|catch)|What a (great|fascinating)|Excellent (question|point)|That's a (great|fascinating|really good)|Certainly!|Of course!|Absolutely!|Sure!)`.
- Agreement with nothing to agree with (the "Yes please" case): an agreement token where the preceding turn contains no claim.
- Validate-then-refine: `is (right|correct), and (it|this) (can be made|is its)`.
- Document co-authoring (my inference from the feedback-sycophancy finding): praise in a review that tracks the author's stated attachment rather than any specific property of the text; praise without a named reason.

**Fix.** Delete the opener and start with the answer. In review feedback, replace general praise with a specific observation, or drop it. In a correction response, state the corrected fact without the ritual of agreement.

**Over-correction.** Removing a substantive, reasoned agreement ("Yes, the off-by-one is in line 40") or turning every agreement into contrarianism.

### 9. Chatbot residue: openers, closers, offers, narration

**What it is.** Words to watch for collaborative-communication residue include "I hope this helps", "Of course!", "Certainly!", "You're absolutely right!", "Would you like", "is there anything else", and "let me know" [1]. <!-- claim: 5b26422b8e369a5c; evidence: a2da87c5aee77002; source: 216545f88fe97a24 --> Editors sometimes paste chatbot text meant as correspondence, prewriting or advice rather than article content [1]. <!-- claim: 67e285ce02a2edcf; evidence: c9dcb1ac30a402a6; source: 216545f88fe97a24 --> In comment threads, LLM-generated comments sound like a clerk or customer service representative, claiming to have "carefully reviewed" things and apologizing for any inconvenience they "may have" caused [1]. <!-- claim: 0058d98712b61ff6; evidence: fc16e4ceac5d9ce2; source: 216545f88fe97a24 -->

**Openers by family.** A peer-reviewed study of model idiosyncrasies found ChatGPT begins responses with "certainly" and "below is", while Claude usually references the original prompt using phrases like "according to the text" and "based on the text" [21]. <!-- claim: 17bfd3cc37a8e8b8; evidence: e7495c5e1a2e2c84; source: 5b0ec3b4902b975f --> OpenAI's GPT-5.1 prompting guide advises avoiding excessive acknowledgment phrases like "got it" or "thank you" [58]. <!-- claim: 5f77889d1eca77cf; evidence: 0b0925c8949e5645; source: f95cd838b68fddab -->

**Closers and offers (agentic Claude).** Anthropic's Fable 5.1 guide says that without the nudge, the model sometimes describes what it would do next instead of doing it ("Next, I'll") or stops to ask permission for a step the request already covered ("Shall I apply this?") [46]. <!-- claim: 58de8ce677e8de96; evidence: ca5b331d0b23d309; source: 557f96ccb3270d91 --> The Opus 5.5 guide names two closers: a long summary of what was done that ends by announcing the next step, and an offer to carry on unless the user would prefer otherwise, which stops to wait for an answer [50]. <!-- claim: 39be4f5fc263a3d1; evidence: dd814a7745af21a7; source: 72a68f793144bdd2 --> Its fix is blunt: if you notice yourself inviting the user to redirect you or offering to wait, delete it and do the next thing [50]. <!-- claim: 7861d62c2b4ec6ae; evidence: 18cccaa9c363160b; source: 72a68f793144bdd2 --> Claude Opus 5 narrates readily during agentic work and tends to announce what it is about to do [47]. <!-- claim: 903323a596bc9558; evidence: 81f7e8c54923d3b1; source: 545654c2e6e4a55e --> On questions, the Opus 5.5 system prompt says Claude doesn't always ask questions, but when it does it avoids more than one per response [52]. <!-- claim: 6afa0ff77a7c3236; evidence: 2a00eae54fe64d65; source: 3e045f52520583bf -->

**OpenAI equivalents.** The GPT-6 tone sample says to omit generic praise and unnecessary sign-offs, and to use reassurance only when it is relevant [55]. <!-- claim: 255473e8dbdda8cd; evidence: 3b4995845457dfd5; source: 5c4b950aaeff3364 --> Its trimming order is to keep all required facts, decisions, caveats, and next steps, and to trim introductions, repetition, generic reassurance, and optional background first [55]. <!-- claim: fe8db86576c276e4; evidence: ec10ed72c9ef6751; source: 5c4b950aaeff3364 -->

**How to detect.**
- Final paragraph: `(I hope this helps|Hope this helps|Let me know if|Feel free to|Happy to help|Would you like (me to)?|Shall I|Want me to|Is there anything else|unless you'd prefer|Good luck|You've got this)`.
- Two or more trailing questions in a reply.
- Narration of intent with no following action: `^(Next, I'll|Now I'll|Let me|I'll now|I'm going to)` at the end of a message.
- Customer-service register: `carefully reviewed|apologi[sz]e for any (confusion|inconvenience)|please (point|let me know)`.

**Fix.** Delete. In a document (not a chat reply) every one of these is out of register. In agent hand-off text, replace offers with the action taken or a single, specific question if one is genuinely blocking.

**Over-correction.** Real blocking questions in a hand-off, or courtesy lines in an actual email the user asked to be drafted.

### 10. Mannered and purple prose

**What it is.** Graphite reports that Anthropic calls writing that substitutes metaphor and flourish for direct statement "mannered prose", with an example of "a dial worth turning" where "a parameter worth varying" would be more direct; Claude Opus 5 and Gemini 3.1 Pro score about 2.5 times the human score, while GPT-6 Astra is much closer to the human score [29]. <!-- claim: bbac438816439f49; evidence: 30ccb17a72acb3d2; source: 56493642657ef5f7 --> Graphite's mannered-prose score falls 37%, from 16.75 for Opus 5 to 10.57 for Opus 5.5, but remains above the human sample's 6.65 and Astra's 7.91 [114]. <!-- claim: 87f31dc7c0d3030b; evidence: 3a159d4a04ea0846; source: a89550d3cce35496 --> The OpenAI Model Spec says the assistant should by default avoid purple prose, hyperbole, self-aggrandizing, and clichéd phrases that do not add to the clarity of communication [56]. <!-- claim: 244ebe9faa7a0c75; evidence: 38537fff9afafd9f; source: 9f6def883554b727 --> A peer-reviewed study of edits to LLM writing defines purple prose as sprawling sentences, abstract words, and excessive adjectives, adverbs, and metaphors used to convey little information [100]. <!-- claim: 3f579d94a319bbb8; evidence: 0324156044f0523a; source: 604a33a5ff2aff54 --> In the same study, writers mentioned that LLM writing often required edits for nonsensical metaphors [100]. <!-- claim: 397919ea38526b6a; evidence: f2ea409c0dc5ce57; source: 604a33a5ff2aff54 -->

**How to detect.** Figurative verbs and nouns applied to technical or abstract subjects (dial, lever, north star, tapestry, landscape, symphony, mirror); metaphor density above one per paragraph in expository text (my inference); a metaphor that cannot be paraphrased into a literal claim.

**Fix.** Replace the figure with the literal statement it stands for. If no literal statement is recoverable, delete the sentence.

**Over-correction.** Flattening fiction, essays or deliberately voiced prose; one apt metaphor in an explanation is normal human writing.

## Counterevidence and Disagreements

**LLMs under-hedge on facts.** The "AI over-hedges" folk claim is contradicted by peer-reviewed measurement on factual QA. Publicly deployed LMs are unable to express uncertainties even when they produce incorrect responses, and when prompted to express confidences tend to be overconfident, with high error rates (on average 47%) among confident responses [108]. <!-- claim: f471fc4473551f78; evidence: 559c5ba249eed043; source: e641ec293c4b9c0f --> The same study found LMs prefer answers free of epistemic markers and, when they use epistemic modifiers, rely too much on strengtheners, leading to overconfident but incorrect generations [108]. <!-- claim: 3fd274f396ef6bda; evidence: 08fc0b833d97f7bf; source: e641ec293c4b9c0f --> It traces this to the training data: preference-annotated datasets used in RLHF show that humans have a bias against texts with uncertainty [108]. <!-- claim: e3c5689c6407c966; evidence: e7482abb4e858429; source: e641ec293c4b9c0f --> In argumentative writing, a corpus study quoted by Reinhart reports that ChatGPT essays exhibit a significantly lower frequency of interactional metadiscourse such as hedges, boosters, and attitude markers, leading to a more impersonal and expository tone [127]. <!-- claim: 2880e806f3950fc8; evidence: 94d102f6ff5b59f8; source: a65abd76098d76c4 -->

Reconciliation (my inference): the hedging tells are formulaic, placed hedges (source-availability preambles, didactic "it's important to note", generic "no one-size-fits-all", usage disclaimers). They sit next to under-calibrated content claims. The lane should target the formulas, not epistemic modality in general, and should sometimes add a qualifier where a bare claim is unsupported.

**Hedges are legitimate.** Hedges are a significant resource for academics presenting scientific claims with precision and caution [97]. <!-- claim: c9669c6a05dd97c6; evidence: e0dbe8ed6108f9ec; source: debed86bb967e036 --> An editing agency warns that a hedge often precedes an unverified claim, so deleting it blindly makes an unconfirmed statement sound more confident than it should; the first step is checking what the hedge is covering for [126]. <!-- claim: 6885a9ef9ee0da77; evidence: 2aac88e3fb04be13; source: 2d868d4de107c27b --> Humanizer's keep-list says to keep a qualifier only when the source supports it and the meaning needs it, to keep scope statements, legal and safety notices, and real corrections, and that ordinary hedges such as "perhaps" or "tends to" are human habits and not tells [64]. <!-- claim: 2a8e6b66b525482a; evidence: db878e79c486f36c; source: 143979a9b24d1841 -->

**Claude vs GPT direction.** The cross-model data points in opposite directions for the two families: Claude over-states (superlatives, significance-flagging), GPT-6 over-qualifies. A single "tone" lane with a fixed direction would mis-fix one of them. Gemini sits with GPT on hedging and with Claude on mannered prose.

**Sycophancy reduction claims.** Anthropic reports reductions from Sonnet 4.5 and Opus 4.8 onward, but practitioner catalogues still document the validate-then-refine opener in later Claude output. The vendor claims are about behaviour on evaluations; the residual tell is about phrasing. Both can be true.

**Sincerity markers.** Anthropic's own system prompt bans "genuinely" and "honestly", yet practitioners observe Claude using them anyway. Graphite's Opus 5 to 5.5 comparison suggests "is genuinely" faded in 5.5, so the age of the text matters.

## Methodological Limits and Open Gaps

- Most cross-model rates come from one industry corpus (Graphite, and VentureBeat's and Signalbox's reports on it). Its sampling (article genre, prompts) is not peer-reviewed, and multipliers like "132x" are sensitive to small human base rates.
- No source gives validated density thresholds for any rhetorical tell. The thresholds proposed here (two puffery items per paragraph, one metaphor per paragraph, two trailing questions) are my inference and should be treated as tunable.
- Sycophancy research measures behaviour (caving, biased feedback), not phrasing. The link from "the model is sycophantic" to "this sentence is a sycophancy tell" is practitioner-level.
- Gemini coverage is thin: one stylometric blog and the Graphite mannered-prose figure.
- Moralizing has vendor naming (preachy, sanctimonious, paternalistic) but no phrase-level corpus study; detection cues are inferred.
- The hedging counterevidence is on factual QA and argumentative essays; it is less clear how it transfers to long-form expository writing where Wikipedia editors see formulaic source-availability hedges.
- A SpeechMap lexical-fingerprint table for Claude Sonnet 4.6 (honestly, genuinely, straightforwardly as signature words) exists in the evidence set but its table did not survive the lexical verifier, so it is not cited here.

## Proposed lane material

**Lane A: `significance` — Inflated significance, promotion and grand endings.** Scope: per passage, plus a whole-document pass for the ending.
Hunt:
- significance phrases (stands/serves as, testament to, pivotal/crucial/key role, underscores/highlights the importance, reflects broader, setting the stage, evolving landscape, indelible mark, matters because, The stakes are high, The implications are significant)
- sentence-final -ing evaluation clauses (", highlighting X", ", underscoring X", ", cementing X")
- "though minor/limited, it still contributes" preambles; "Despite its [praise], X faces challenges" sections
- puffery (boasts, vibrant, rich, nestled, in the heart of, groundbreaking, renowned, diverse array, showcasing); Claude 5.5 helpfulness phrasing (can help you, is especially helpful, makes it easier)
- pseudo-aphorisms (the real question is, at its core, what really matters, X is not a Y but a Z)
- ending checks: last paragraph summarises, uplifts, moralizes or zooms out to legacy/community/world; one-line restating closers
- vague attribution (experts argue, observers note, several sources with one citation, "associated with", analysis pinned to a named source)
Fix: keep the fact, drop the significance; replace adjectives with facts; end on the last concrete fact; name the source or cut the attribution.
Keep-list: sourced and specific significance claims; promotional register in actual marketing copy; summary sections in long reports; superlatives that are literally true.

**Lane B: `stance` — Calibration: hedges, disclaimers, false balance, candor and superlatives.** Scope: per passage.
Hunt:
- source-availability and usage disclaimers (While specific details are limited, not widely documented, based on available information, should be treated as X rather than Y, does not by itself establish, maintains a low profile)
- didactic disclaimers and generic hedges (it's important to note, worth noting, may vary, no one-size-fits-all, as an AI/large language model)
- caveat bloat (caveats longer than the answer), moralizing reminders nobody asked for
- false balance / no-stance endings ("ultimately it depends", "both sides have merit" with no position)
- hedge stacks (could potentially, may possibly)
- sincerity/candor markers (genuinely, honestly, the honest answer, frankly, to be clear, in the interest of full disclosure, I'd rather flag)
- self-ranking and totalizing superlatives (single most, arguably the most, the most important, the deepest point, every single, the whole game, the only thing that matters) and lazy extremes (always, never, everyone, nobody)
Fix: delete formulaic hedges and markers; for disclaimers, state what the source shows; for false balance, take the supported position; for superlatives, state the point or give the criterion. Before deleting any hedge, check what it covers: if the underlying claim is unsupported, keep or add a precise qualifier instead.
Keep-list: scope statements; legal, medical and safety notices; real corrections; ordinary single hedges (perhaps, tends to, likely); scientific hedging; literally true superlatives; "honestly" in quoted dialogue or deliberate informal voice.
Per-model: Claude text, weight superlatives, significance-flagging, candor markers; GPT-6 text, weight hedges (may provide, not necessarily, rather than focusing); Gemini text, weight formality and careful hedging.

**Lane C: `residue` — Chatbot residue and sycophancy.** Scope: whole document (openers and closers are positional) plus per passage for embedded asides.
Hunt:
- validation openers (You're absolutely right, Great question, What a fascinating, Excellent point, Certainly!, Of course!, Absolutely!, Sure!, Got it)
- agreement with no claim to agree with; validate-then-refine ("is right, and it can be made precise"); reflexive apology
- closers and offers (I hope this helps, Let me know if, Feel free to, Would you like me to, Shall I, Want me to, Is there anything else, unless you'd prefer, Good luck, You've got this)
- more than one trailing question
- narration of intent with no action ("Next, I'll run the tests"), long recap ending with an announced next step
- customer-service register (carefully reviewed, apologize for any inconvenience, please point them out)
- prompt-anchoring openers (Based on the text, According to the text, Here is, Below is)
- in review/feedback text: praise without a named reason
Fix: delete; start with the content; replace offers with the action taken; keep at most one specific blocking question.
Keep-list: substantive reasoned agreement; real blocking questions; courtesy in an email the user asked to draft; first-person voice the author chose.
Per-model: Claude 4.x "You're absolutely right" era vs Claude 5.x validate-then-refine and agentic offers/narration; GPT "Certainly! Here's", "got it", cheerleading closers.

**Mannered prose** (metaphor substituted for literal statement, purple prose): attach to Lane A or to a figurative-language lane if another dossier proposes one. Weight Claude and Gemini over GPT-6. Fix: replace the figure with the literal claim; keep-list: fiction, essays, one apt metaphor per explanation.

## Bibliography
[1] [Wikipedia:Signs of AI writing](https://en.wikipedia.org/wiki/Wikipedia:Signs_of_AI_writing)
[3] [humanizer (SKILL.md v3.1.0 and README)](https://github.com/blader/humanizer)
[4] [Don't Write Like AI: 10 Takeaways from Wikipedia's Signs of AI Writing](https://www.blakestockton.com/p/takeaways-from-wikipedias-signs-of-ai-writing-2)
[21] [Idiosyncrasies in Large Language Models](https://arxiv.org/abs/2502.12150)
[24] [Do LLMs write like humans? Variation in grammatical and rhetorical styles](https://arxiv.org/abs/2410.16107)
[29] [AI Tells](https://graphite.io/five-percent/research/ai-tells)
[30] [Different, Not Better: The Evolution of AI "Tells" Across Model Versions](https://research.signalbox.studio/research/opus-5-5-articles-vs-novels/)
[34] [Sycophancy in GPT-4o: What happened and what we're doing about it](https://openai.com/index/sycophancy-in-gpt-4o/)
[35] [Expanding on what we missed with sycophancy](https://openai.com/index/expanding-on-sycophancy/)
[37] [BUG: Claude says "You're absolutely right!" about everything (claude-code issue #3382)](https://github.com/anthropics/claude-code/issues/3382)
[38] [Introducing Claude Sonnet 4.5](https://www.anthropic.com/news/claude-sonnet-4-5)
[39] [Claude Opus 4.1 system prompts](https://platform.claude.com/docs/en/release-notes/system-prompts/claude-opus-4-1)
[40] [22 Claude-prose Patterns: A Catalog of Stylistic Attractors in Generated Texts](https://www.linkandth.ink/p/catalog-of-claude-cliches)
[41] [Jude Stiel's Shortform (LessWrong)](https://www.greaterwrong.com/posts/feTBB722jXmYAvCf2/)
[46] [Prompting Claude Fable 5.1](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-fable-5-1)
[47] [Prompting Claude Opus 5](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-opus-5)
[48] [Prompting Claude Opus 4.8](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-opus-4-8)
[50] [Prompting Claude Opus 5.5](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-opus-5-5)
[51] [Claude Fable 5.1 system prompts](https://platform.claude.com/docs/en/release-notes/system-prompts/claude-fable-5-1)
[52] [Claude Opus 5.5 system prompts](https://platform.claude.com/docs/en/release-notes/system-prompts/claude-opus-5-5)
[54] [Claude Sonnet 3.5 system prompts](https://platform.claude.com/docs/en/release-notes/system-prompts/claude-sonnet-3-5)
[55] [Using GPT-6 (Model guidance)](https://developers.openai.com/api/docs/guides/latest-model)
[56] [OpenAI Model Spec (2026/08/18)](https://model-spec.openai.com/2026-08-18.html)
[58] [GPT-5.1 Prompting Guide](https://developers.openai.com/cookbook/examples/gpt-5/gpt-5-1_prompting_guide)
[61] [Claude's Constitution](https://www.anthropic.com/constitution)
[64] [humanizer/SKILL.md (Humanizer: remove AI writing patterns, v3.1.0)](https://github.com/blader/humanizer/blob/main/SKILL.md)
[65] [stop-slop (SKILL.md, references/structures.md, references/phrases.md)](https://github.com/hardikpandya/stop-slop)
[68] [avoid-ai-writing SKILL.md (Avoid AI Writing — Audit & Rewrite)](https://github.com/conorbronsdon/avoid-ai-writing)
[84] [People who frequently use ChatGPT for writing tasks are accurate and robust detectors of AI-generated text](https://arxiv.org/abs/2501.15654)
[97] [The Author in the Text: Hedging Scientific Writing](https://files.eric.ed.gov/fulltext/ED390258.pdf)
[100] [Can AI writing be salvaged? Mitigating Idiosyncrasies and Improving Human-AI Alignment in the Writing Process through Edits](https://arxiv.org/abs/2409.14509)
[101] [Measuring AI "Slop" in Text](https://arxiv.org/abs/2509.19163)
[102] [Towards Understanding Sycophancy in Language Models](https://arxiv.org/abs/2310.13548)
[103] [Flattery, Fluff, and Fog: Diagnosing and Mitigating Idiosyncratic Biases in Preference Models](https://arxiv.org/abs/2506.05339)
[104] [Art or Artifice? Large Language Models and the False Promise of Creativity](https://arxiv.org/abs/2309.14556)
[108] [Relying on the Unreliable: The Impact of Language Models' Reluctance to Express Uncertainty](https://arxiv.org/abs/2401.06730)
[114] [Claude Opus 5.5 uses em-dashes 99% less often and sounds more human — but still exhibits 2,548 AI writing tells](https://venturebeat.com/data/claude-opus-5-5-uses-em-dashes-99-less-often-and-sounds-more-human-but-still-exhibits-2-548-ai-writing-tells)
[117] ["In conclusion," "furthermore," "moreover": the AI cliché with no data behind it](https://underslop.com/tells/in-conclusion-cliche)
[125] [Claudisms - a living banlist of AI-writing tells](https://claudisms.ai/)
[126] [AI Editing Checklist: How We Edit AI Drafts](https://proofed.com/knowledge-hub/ai-editing-checklist-how-to-spot-and-fix-ai-writing-patterns)
[127] [LLM writing styles](https://www.refsmmat.com/notebooks/llm-style.html)
[130] [How Every AI Model Writes: A Stylometric Comparison](https://www.mywritingtwin.com/blog/ai-model-writing-styles-compared)
