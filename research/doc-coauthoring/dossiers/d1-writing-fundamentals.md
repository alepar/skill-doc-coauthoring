# Dossier: Writing fundamentals for AI-assisted doc co-authoring

## Summary

The writing-fundamentals literature converges on a small set of practices the current `doc-coauthoring` skill only partly encodes. First, define the audience as a goal plus a knowledge gap, not just a role. Second, before drafting, write down the document's purpose, main point, scope and non-scope. Third, put the main point first, in most cases. Fourth, use connected prose for reasoning and lists only for parallel or sequential items. Fifth, revise in ordered passes: structure, then style, then copy. Sixth, test comprehension by asking readers to paraphrase or act, not by asking whether the text is clear [1][2][6][11][18][64].

The skill already does a lot of context gathering and reader testing. It is missing four things: an explicit main-point/scope statement, a prose-vs-bullets rule that would counter LLMs' known pull toward bullet lists and length [180], labeled structural-before-stylistic revision passes, and paraphrase- and action-based reader-test questions.

Key uncertainties. "Bottom line up front" depends on context: it assumes readers who already understand the problem, and persuasive or decision documents may need "problem first, answer next" [7]. Empirical support for the inverted pyramid at the scale of whole documents is weak [12]. The evidence on bullets is mixed: they help recall of the list items but hurt recall of the surrounding text [32]. Most sources are practitioner guidance, not controlled studies.

## Facet Questions and Scope
<!-- facet: F1 -->
Facet F1 asks how good technical and business documents should be written. It covers audience and purpose framing; BLUF, the pyramid principle and the inverted pyramid; concision and plain language; prose vs bullets; revision and editing passes; and writing as a way of thinking. Boundaries: document-type templates (design docs, RFCs, PRDs) and review culture belong to other facets. I use them here only where they bear on fundamentals, for example non-goals, "why over how" and handling feedback [33][36]. Reader testing is covered in depth elsewhere. Here I cover only the plain-language testing methods (paraphrase testing, readability formulas) that bear on how Stage 3 should phrase its probes.

## Source Groups and Findings

### 1. Audience: a goal and a knowledge gap, not a role

Google's technical-writing course defines the target as a difference, not a demographic. The course frames good documentation as the knowledge and skills your audience needs to do a task minus your audience's current knowledge and skills [1]. <!-- claim: 9adb458d3dac1976; evidence: 3b384595f7ff3d2a; source: 69272a676e54274e --> Roles, by themselves, are insufficient for defining an audience; you must also consider your audience's proximity to the knowledge [1]. <!-- claim: 863cf854efe129e5; evidence: c6a32a4be7df74af; source: 69272a676e54274e --> The companion "Documents" unit turns this into four questions. The guide asks: What is your target audience's goal, why are they reading this document, what do your readers already know, and what should your readers know or be able to do after they read your document? [2]. <!-- claim: c46f7070e6b7e044; evidence: 786e2ba1ce61b103; source: 27a619a70c947904 --> The reason it matters: Experts often suffer from the curse of knowledge, forgetting that novices don't know what they already know [1]. <!-- claim: e1ea2225e1edc2a0; evidence: 861e1a293050db63; source: 69272a676e54274e --> A planning-oriented alternative compresses audience and purpose into one line. Redish proposes filling in the sentence "I'm writing this so that (who?) (can do what?)." [94]. <!-- claim: 293106cad6f0c757; evidence: 1c97575b51f08a90; source: a2b771d9844bcdcd --> Design-doc practitioners add a structural consequence. Using the same document for two vastly different audiences will make them both unhappy, so the author advises splitting it into two smaller documents [36]. <!-- claim: 2ffcc86c5cf55f2d; evidence: c008b6822a0b55e2; source: 17e86d9fc269045e -->

Synthesis: Stage 1 of the skill asks "Who's the primary audience?" and "What's the desired impact?". That captures role and outcome but not the reader's current knowledge or their after-state. Those are the two terms of Google's equation, and they drive how much to explain. In co-authoring, the user is the expert with the curse of knowledge. The AI begins with almost no context, which makes it a useful proxy for a newcomer, but only if it is told to keep that stance instead of absorbing everything the user knows.

### 2. Purpose, scope and non-scope as a contract for drafting and cutting

A better document additionally defines its non-scope: the topics not covered that the target audience might reasonably expect your document to cover [2]. <!-- claim: f738994442e5c498; evidence: 5aecd4b94545b168; source: 27a619a70c947904 --> The scope statement is also a cutting tool: If contents veer away from the scope statement, you must either refocus the document or modify the scope statement, and when reviewing the first draft, delete any sections that don't help satisfy the scope statement [2]. <!-- claim: 86fda40100a7f28e; evidence: bf565675b74a76a1; source: 27a619a70c947904 --> Google's large-docs unit makes the same check after drafting and calls it a form of "documentation quality assurance (QA)" [3]. Design-doc guides use the same idea as "non-goals" [33].

Synthesis: The skill has no step that writes down scope or non-scope. As a result, the "Quality Checking" step ("ask if anything can be removed") has no criterion to measure removals against. A one-paragraph purpose/scope/non-scope statement agreed at the end of Stage 1 would give later curation and cutting something to refer to.

### 3. Main point first: BLUF, pyramid, inverted pyramid

Several independent traditions recommend putting the conclusion first. Imagine that your peers might only read the first paragraph of your document, so ensure that the start answers your readers' essential questions [2]. <!-- claim: 6deb152ea537acda; evidence: 536a1d876e21e132; source: 27a619a70c947904 --> The start of any long document is the hardest page to write, so be prepared to revise page one many times [2]. <!-- claim: 35197684a0f6aee5; evidence: 625ac1d1cb0f59a7; source: 27a619a70c947904 --> The U.S. Army's correspondence rule is the strictest version: Two essential requirements are putting the main point at the beginning of the correspondence (bottom line up front) and using the active voice [6]. <!-- claim: 20e59ff498125ec9; evidence: bc7b78cc99be1178; source: 751c67d84d7caaf2 --> It also specifies an order. The regulation says to begin the memorandum with a short, clear purpose sentence and put the recommendation, conclusion, or most important information (the main point) next [6]. <!-- claim: 712a0930ff0257fb; evidence: a1789bfc25aacaad; source: 751c67d84d7caaf2 --> Nielsen Norman Group says the same thing for web content: Start content with the most important piece of information so readers can get the main point, regardless of how much they read [29]. <!-- claim: 33ded0174015cc0c; evidence: 366cf155d5360d2c; source: b0d85c159587144a --> Its reason is behavioral. In the study, 79 percent of test users always scanned any new page; only 16 percent read word-by-word [22]. <!-- claim: f15aa17f27749692; evidence: 816ad5f4ae6863ba; source: 35daa14b159686fe -->

Minto's pyramid principle presents conclusion-first as a discipline of thought, not just of layout. Minto describes extended thinking ending in a single pyramid of ideas held together by a single thought, so that communicating requires only that you guide the reader down the pyramid [24]. <!-- claim: d07ac055887480e1; evidence: a236ca458d3bf2e6; source: ff58ff7a8ded8914 --> A secondary summary quotes her against generic opening sections. Minto's rule of thumb is that you never want a section labeled "Background" or "Introduction" because its information will not be on the same level of abstraction as the other points that follow [23]. <!-- claim: 0d7f60796b467b1f; evidence: 3dc7b918897f1035; source: b978835c4d47ecce --> GOV.UK makes a similar point at the heading level. Headings should be descriptive, avoiding generic headings like 'Introduction', and frontloaded with the most important information first [9]. <!-- claim: 942b97aee30495ec; evidence: e3dc80a607b656ae; source: b8ef6ddd6ec18f75 -->

Synthesis: The skill already says "Summary sections are best left for last". That fits Google's advice to revise page one many times [2]. But the skill never asks for the main point to be stated before drafting begins, and its scaffold uses placeholder headings with no requirement that headings be descriptive. Writing the summary last is fine. Deciding the main point last is not. The "single thought" at the top of the pyramid [24] should exist from Stage 1 on as a working one-sentence thesis, revised as drafting shows it to be wrong.

### 4. Writing is thinking, so drafting finds gaps

Lamport argues: to think, you have to write; if you're thinking without writing, you only think you're thinking [10]. <!-- claim: 80d52688a9b7ebf0; evidence: 60aee5bd6859960b; source: 84ab812601dd9b5a --> Graham says to expect 80% of the ideas in an essay to happen after you start writing it, and 50% of those you start with to be wrong [4]. <!-- claim: c9ca1549244ab42f; evidence: d6c9a4edd3b03fa1; source: 3855b9d49700d842 --> A great deal of knowledge is unconscious, and experts have a higher proportion of unconscious knowledge than beginners [5]. <!-- claim: 3de96fda9d51f281; evidence: ee859e01fd700788; source: 2c0310287d29c813 --> Graham's test for a draft is to read it as an outsider: The real test is reading what you've written while pretending to be a neutral reader who knows nothing of what's in your head, only what you wrote, and asking whether it seems correct and complete [5]. <!-- claim: 05c129c92822a527; evidence: 6bcb85a439ea2ea8; source: 2c0310287d29c813 --> Google's guidance on LLM-assisted writing applies this directly to design docs: Until you write a design document, you haven't fully worked through all the issues and their solutions; clear technical writing is the byproduct of clear technical thought [180]. <!-- claim: 396b940c76e1ddf5; evidence: 518fb205b30f3156; source: 4479d1abd5084f7d --> and warns: When you rely on an LLM to create a first draft, you lose the benefits of the writing process [180]. <!-- claim: 9d594b7aa53e2c88; evidence: 36a0e4a8f7c9d1a3; source: 4479d1abd5084f7d -->

Synthesis: This is the most important tension for an AI co-authoring skill. If Claude produces polished sections from a curated brainstorm list, the user may skip the struggle that exposes weak ideas. The evidence suggests the skill should expect drafting to surface new gaps, roughly as often as Graham's 80/50 figures imply. It should present these to the user as questions ("drafting this, I couldn't say why X beats Y — what's the reason?") instead of papering over them with fluent text. It should also explicitly allow the user to write key passages, or the thesis, themselves.

### 5. Prose for reasoning, lists for parallel items

Amazon's narrative memo culture rejects bullets for reasoning. Bezos wrote that well structured, narrative text is what they're after, and that a list of bullet points in Word would be just as bad as PowerPoint [11]. <!-- claim: 252e73ac2eb64a3f; evidence: fb70f2592befbadc; source: d9a7c765aa01b3bf --> The narrative structure of a good memo forces better thought and better understanding of what's more important than what, and how things are related [11]. <!-- claim: 93cdb91dc85913d5; evidence: 6512654bbc1d78f8; source: d9a7c765aa01b3bf --> Tufte's critique of NASA slides makes the same point: Tufte says bullet lists tend to be base-touching grunts, which show effects without causes, actions without actors, verbs without subjects, and nouns without predicates [15]. <!-- claim: 1d736e050c6e1020; evidence: c5f4dd01d170e007; source: 760cb0192eae2f3b --> A business-writing consultancy names the mechanism. Linking words used in structured prose are stripped away by bullet points, and without them you can't say unequivocally how ideas relate to each other [26]. <!-- claim: 1ed0c546cabf5d58; evidence: 82ea0fee30a1b0ba; source: 14143bf843241e3a -->

This matters directly for an LLM co-author. Google's LLM unit observes: LLM responses are typically a lot of bulleted lists connected by short paragraphs [180]. <!-- claim: ef6b1838af5ae03c; evidence: 7058d7a347860e7e; source: 4479d1abd5084f7d --> It also notes: LLM responses tend to be too long [180]. <!-- claim: f709d7f352fa6652; evidence: f1f79e5822654216; source: 4479d1abd5084f7d -->

Lists are not condemned outright. Technical readers generally love lists, so the course advises writers to seek opportunities to convert prose into lists [28]. <!-- claim: b65650f3835a0ffb; evidence: 15d6339e7c5b3513; source: d9598bf030408da2 --> The rule Google gives for list type implies when a list is the right choice in the first place: If you rearrange the items in a bulleted list, the list's meaning does not change; if you rearrange the items in a numbered list, the list's meaning changes [28]. <!-- claim: 6f0848de11934ed1; evidence: 2ce71babf35d16d1; source: d9598bf030408da2 --> Structural editors move content between forms in both directions. Structural editors recast text better presented in another form, such as number-laden text as a table, a long run-in series of points as a vertical list, or a lengthy digression as an appendix [19]. <!-- claim: fc42c9167c7a0144; evidence: 1799c6305ec05f45; source: 50dce90cb9d77535 -->

Synthesis: My reading is that use of lists should follow from the logical shape of the content. Use connected prose for arguments, trade-offs and causal chains. Use lists when items are parallel and independent, numbered lists for sequences, and tables for multi-attribute comparisons. The skill's brainstorm-then-curate loop produces numbered fragments, and an LLM's default is bullets. Together these make it likely that sections will be drafted as bullets, which is exactly the failure Bezos and Tufte describe.

### 6. Concision and plain language: "every word tell", not "dumb it down"

Strunk's rule requires not that the writer make all sentences short or avoid all detail, but that every word tell [21]. <!-- claim: 464205e80f2825d1; evidence: 729bbaf921fae8f1; source: 36e7f58006afc0e3 --> One practitioner gives a figure for how much a first draft can lose: Slatton claims you can almost always cut length by ~30% from the first draft without sacrificing information [34]. <!-- claim: 3f9635dde27cdcd6; evidence: 6333c87ea53facf9; source: be47be05ea0742de --> NN/g's usability measurements give the strongest quantitative support for concision: Usability was 58% better for the concise version, 47% better for the scannable version, and 124% better when three ideas for improved writing were combined [22]. <!-- claim: ca8edd5b0d0ebe26; evidence: d364171426298749; source: 35daa14b159686fe --> GOV.UK reports a preference for plain language even among experts: 80% of people preferred sentences written in clear English, and the more complex the issue, the greater that preference [8]. <!-- claim: e656fc41e5fd9fd7; evidence: c3a71d3e2fa5c7da; source: 01ec2b8b5099454d --> Plain-language guidance rejects the idea that this means simplifying the content. The guidelines call it a myth that you have to "dumb down" content; the first rule of plain language is: write for your audience [13]. <!-- claim: d4c61b1f500c58bb; evidence: 66bcbd41ad42b25d; source: 12be932e2dd942b2 --> Specialist terms can be used; you just need to explain what they mean the first time you use them [8]. <!-- claim: 58c813b181740985; evidence: cc6ba39fa45df2f0; source: 01ec2b8b5099454d --> In design docs, concision should cut the "how" before the "why": Why is much more important than how; if you need to cut anything, cut implementation detail over reasoning and alternatives [36]. <!-- claim: 5721507190a7067e; evidence: dbfe2e034c300751; source: 17e86d9fc269045e -->

Synthesis: The skill's quality check ("ask if anything can be removed") is in line with this. It could be made more concrete: run a cut pass aimed at roughly 30% of a first draft, protect reasoning and alternatives from cuts, and define jargon on first use.

### 7. Revision in ordered passes, with distance

Editors Canada separates editing levels by scope. Structural editing is assessing and shaping the overall organization and content of the material to optimize it for the intended audience, medium and purpose [18]. <!-- claim: ba443498afe400cc; evidence: 77dfad30fce0e018; source: 261c3db6a98f874c --> Stylistic editing clarifies meaning, ensures coherence and flow at the paragraph and sentence level and refines the language [18]. <!-- claim: 8cfc959eacc166c7; evidence: 8635b02f33055fcf; source: 261c3db6a98f874c --> It also requires a regression check: Editors should verify that all necessary edits have been applied at each preceding stage and that new problems have not been introduced [18]. <!-- claim: ce0b3e6bec4bd991; evidence: 878414afb368620c; source: 261c3db6a98f874c --> Google's LLM guidance gives the same order: The guide recommends fixing organizational issues before editing grammar and style issues [180]. <!-- claim: 6bbdff91444208c8; evidence: 6020aac9b14d16f3; source: 4479d1abd5084f7d --> Two sources recommend time away from the draft: After the first draft, set it aside, come back after an hour (or two or three) and read it with fresh eyes [17]. <!-- claim: 0b21deb977d6491b; evidence: a304020f02ef2d7d; source: f93c2042d01e8024 --> The great memos are written and re-written, shared with colleagues who are asked to improve the work, set aside for a couple of days, and then edited again with a fresh mind [16]. <!-- claim: 8bcfab1b0d46e0b5; evidence: ae7185599ff8d536; source: 55aae724f31dc193 -->

Synthesis: The skill's revision loop is driven by user feedback and works at the sentence level (`str_replace` edits). It has no structural pass across the whole document before line edits begin, and no check that a fix in one section hasn't created a contradiction or a gap somewhere else. An AI cannot "set the draft aside", but it can get a similar effect from a fresh-context sub-agent. That is the same mechanism Stage 3 already uses, and it can also be pointed at structure.

### 8. Testing comprehension: paraphrase and action, not "is it clear?"

The plain-language testing literature is directly relevant to how Stage 3 phrases its questions. Paraphrase testing asks the participant to read to a cue and tell you in his or her own words what that section means [13]. <!-- claim: 4916d1fa522fb029; evidence: 763965d96f84591b; source: 12be932e2dd942b2 --> The VBA case shows why asking about clarity is not enough: In the VBA case, readers all said the letter was clear, yet several would have done something other than what VBA wanted because they had a different definition of "service-connected." [64]. <!-- claim: e8f1439f0d8b50f1; evidence: d028e3cfa9f5f6b6; source: 0581cd2109f9c69d --> You won't get much usable information from questions that can be answered with "yes" or "no." [64]. <!-- claim: 53cc6d0f6f730967; evidence: 12408aa30f3207ce; source: 0581cd2109f9c69d --> When real readers aren't available: Don't ask a tester whether they like the content; ask them to tell you what it means [69]. <!-- claim: f75ff22501d48985; evidence: d3cc5c51027a7e93; source: fa46bc012955e9a5 --> Feedback from reviewers should go back into the text: When people ask questions and are unsure, it's often an indication that context is missing or the prose is unclear, so fix the text so the same questions don't pop up again and again [36]. <!-- claim: 07afe3fc771cf330; evidence: 03fc0e544ce0e48d; source: 17e86d9fc269045e --> One supporting note for using an AI as the tester: LLMs are such good critics that they can even find mistakes in the text that they generated [180]. <!-- claim: 839fc99dce7e910f; evidence: 9d6da6ad4a8200fb; source: 4479d1abd5084f7d -->

Synthesis: The skill's manual-path probes ("What in this doc might be ambiguous or unclear?") are close to the yes/no clarity question that the VBA case shows to be unreliable. Better probes would be: "In your own words, what does section X decide?", "What would you do next after reading this?", and "Define [key term] as this doc uses it." The answers can then be compared with the author's stated main point and intended actions.

## Counterevidence and Disagreements

**BLUF depends on context.** Garner says BLUF assumes the reader has clearly requested precise information or a recommendation and already understands the mission, the operating environment and the underlying problem [7]. <!-- claim: 607f941d25761374; evidence: ab74d808bb987a37; source: 81c0e30202765747 --> In persuasive writing, the real bottom line is a reasoned answer to a precisely stated problem; if the answer appears before the problem, it has no intelligible content [7]. <!-- claim: fe98a330efc290e4; evidence: f3def17e3ffdc172; source: 81c0e30202765747 --> For decision documents and proposals, the main document types this skill targets, this argues for a short problem statement before the recommendation. Purpose-then-main-point [6] already permits that.

**The inverted pyramid does not obviously scale to whole documents.** The review judges that the inverted pyramid likely only works well for relatively straightforward and short paragraphs, where the connection between initial information and subsequent detail is clear [12]. <!-- claim: d17e5d2b3a428bf2; evidence: 3d6013db1d14381b; source: 0ce8ab228e7582e2 --> Critics call the inverted pyramid the anti-story, at odds with the storytelling tradition of a beginning, middle, and end [25]. <!-- claim: 610f13c24bcd19b6; evidence: 97e9a2209a2615cc; source: 142c3664111229bb --> The same GOV.UK review admits the evidence base is thin: The authors are unaware of formal research that demonstrates that one convention is easier to read or understand than another [12]. <!-- claim: 0f4b4835186827db; evidence: 987c9860eff493b9; source: 0ce8ab228e7582e2 -->

**Bullets help recall of the items themselves.** In three studies, the bulleted list format had a positive effect on recall of the items, mitigated if the components are heterogeneous [32]. <!-- claim: 54bdb24f9f063055; evidence: f8533c1e257784ad; source: 33931488e985c172 --> In two studies, bulleted lists had a negative effect on the recall of content presented in the surrounding text [32]. <!-- claim: e80e14a2d8caa0c1; evidence: 7accd07a209e06b2; source: 33931488e985c172 --> This supports "lists for parallel, homogeneous items" rather than "never use lists". It also suggests that heavy bulleting costs readers the surrounding reasoning.

**Signposting and summaries can be overdone.** Pinker argues metadiscourse such as previews, summaries, and signposts is there to help the writer, not the reader [30]. <!-- claim: 3f750f96a4093de7; evidence: 429d8e3240da0629; source: 19491a352077d705 --> This conflicts with guidance to summarize up front [2][15] only in degree. A single summary helps the reader. Repeated "this section will…" metadiscourse does not.

**Readability formulas are a poor gate.** Klare reviewed 36 studies that attempted to improve comprehension by improving readability scores; only about half succeeded, and they had to change scores by an average of 6.5 grade levels [20]. <!-- claim: 537e9149de241554; evidence: bd2710ea42a98113; source: bcd05986ed630c3f --> Jarrett and Redish report that simplifying text to improve its score backfired: The changed versions had lost the cohesion that makes text flow logically, creating problems that the formulas didn't see [69]. <!-- claim: 21fe2da13849baa1; evidence: 1b6164a0d7e9e7db; source: fa46bc012955e9a5 --> Any automated "concision score" in the skill would therefore be risky. Comprehension tests are the better gate.

**Single personas narrow too much.** Relying too heavily on a persona (or two) can result in a document that is too narrowly focused to be useful to the majority of your readers [17]. <!-- claim: a4699844d07a4130; evidence: ac55037b92707c8b; source: f93c2042d01e8024 --> This argues for naming a primary and a secondary audience, or for splitting the document [36], rather than fixing on one persona.

**Top-down vs bottom-up drafting.** The reviewer disagrees with "top-down first", having seen many people take a bottom-up approach first before shifting to top-down [23]. <!-- claim: 266580a978556a42; evidence: f4b80023b864a710; source: b978835c4d47ecce --> This supports the skill's bottom-up brainstorm-then-curate approach, as long as a top-level thesis is synthesized and checked before final drafting.

**Simplicity vs precision.** Schriver lists as an open research gap whether an abstract yet precise word or a simple but less precise word is better [14]. <!-- claim: 58bef24c3a04ed39; evidence: 9ae66ddc94763395; source: 40f506b5893159c0 --> Technical documents often need the precise term, which is why the guidance is to define terms, not avoid them [8].

## Implications for doc-coauthoring SKILL.md

Ordered by expected impact.

1. **Stage 1: replace the audience question with a goal/knowledge-gap question** [1][2][94]. Suggested text: "Who will read this, what do they already know, what are they trying to do, and what should they know or be able to do after reading? Complete: 'I'm writing this so that ___ can ___.'" If two very different audiences come up, suggest splitting the document or naming a primary audience [36][17].

2. **End of Stage 1: write a purpose/main-point/scope block before structuring** [2][24][6]. Produce a 3-5 line working brief: purpose, a one-sentence main point or recommendation (provisional), scope, and non-scope (things readers might expect that the doc won't cover). Put it at the top of the scaffold. Use it as the criterion in curation ("does this point serve the scope?") and in the "can anything be removed" check [2][3].

3. **Stage 2 structure: lead with the answer, framed by the problem** [6][9][29][7]. For most docs the opening paragraph should answer the reader's essential questions [2]. For decision docs and proposals, use a short problem statement, then the recommendation. Headings should be descriptive, not generic "Background"/"Introduction" [9][23]. Keep "write the summary last", but treat the main point as fixed early and revised as needed.

4. **Stage 2 drafting: add an explicit prose-vs-list rule** [11][15][26][28][32][180]. Suggested text: "Draft reasoning, trade-offs and rationale as connected prose that states how ideas relate (because, therefore, unless). Use bulleted lists only for parallel, independent items, numbered lists for sequences, and tables for comparisons across attributes. Don't carry the numbered brainstorm list into the doc as bullets." This counters the LLM default of bulleted lists and excess length [180].

5. **Stage 2: treat drafting as a gap detector** [4][5][10][180]. When drafting reveals a reason, number or decision the context doesn't supply, stop and ask instead of writing fluent filler. Offer to let the user write the thesis or other key passages themselves, since outsourcing the first draft loses the thinking benefit [180].

6. **Add labeled revision passes before Reader Testing** [18][180][17][16][34]. After all sections are drafted: (a) a structural pass that checks order, gaps, duplication, alignment with scope and the main point, and the form of each section (prose, list, table, appendix) [19]; (b) a stylistic pass that cuts toward about 30% shorter [34], defines terms on first use [8], removes metadiscourse [30] and protects reasoning over implementation detail [36]; (c) a consistency and regression check that fixes haven't introduced new problems [18]. Where possible, run (a) in a fresh-context sub-agent to stand in for "setting it aside" [17][16].

7. **Stage 3: rephrase reader-test probes as paraphrase and action tasks** [13][64][69]. Replace "What might be ambiguous?" with "Summarize in your own words what this doc decides and why", "What would you do next?", and "Define [key terms] as used here". Compare the answers with the Stage 1 brief. Avoid yes/no clarity questions [64]. Questions that recur should lead to text fixes, not chat answers [36].

8. **Don't add readability-score gating** [20][69]. If any automated check is added, treat it as red flags only [69].

## Methodological Limits and Open Gaps

- Most sources are practitioner style guides and essays. The controlled evidence is limited to NN/g's 1997 web-reading study [22], the Information Design Journal bullet studies (abstract only) [32], the readability-formula reviews [20][69] and research cited secondhand in the GOV.UK background review [12]. No source tests these practices in AI co-authored documents.
- Minto's primary text was not retrieved. Pyramid rules come from the Minto concept page [24] and a secondary summary [23].
- No empirical evidence compares summary-first with summary-last drafting order, or measures the effect of a pre-drafting scope statement on final quality.
- Bezos/Tufte evidence on prose vs bullets is argued from cases, not measured. The IDJ results [32] are the only experimental data, and they are mixed.
- The ~30% cut figure [34] is one practitioner's heuristic. The NN/g figures [22] come from web content in 1997 and may not transfer to long internal documents.
- Gap: no source here evaluates whether an LLM reader's paraphrase is a valid proxy for a human reader's paraphrase. That belongs to the reader-testing facet.

## Bibliography

[1] [Audience | Technical Writing One | Google for Developers](https://developers.google.com/tech-writing/one/audience)

[2] [Documents | Technical Writing One | Google for Developers](https://developers.google.com/tech-writing/one/documents)

[3] [Organizing large documents | Technical Writing Two | Google for Developers](https://developers.google.com/tech-writing/two/large-docs)

[4] [Writing, Briefly](https://paulgraham.com/writing44.html)

[5] [Putting Ideas into Words](https://paulgraham.com/words.html)

[6] [Army Regulation 25-50: Preparing and Managing Correspondence](https://armypubs.army.mil/epubs/DR_pubs/DR_a/ARN42124-AR_25-50-007-WEB-13.pdf)

[7] [Should the bottom line be up front? Only with context, Bryan Garner says](https://www.abajournal.com/columns/article/should-the-bottom-line-be-up-front-only-with-context-says-bryan-garner)

[8] [Use clear language - GOV.UK content and publishing guidance](https://guidance.publishing.service.gov.uk/writing-to-gov-uk-standards/writing-guidelines/clear-language/)

[9] [Create a clear structure for your content - GOV.UK content and publishing guidance](https://guidance.publishing.service.gov.uk/writing-to-gov-uk-standards/writing-guidelines/clear-structure/)

[10] [Thinking Above the Code (slides)](https://www.microsoft.com/en-us/research/wp-content/uploads/2016/07/leslie_lamport.pdf)

[11] [Jeff Bezos Email Against PowerPoint Presentations (reproduces 2004 STeam email)](https://www.businessinsider.com/jeff-bezos-email-against-powerpoint-presentations-2015-7)

[12] [GOV.UK content principles: conventions and research background](https://www.gov.uk/government/publications/govuk-content-principles-conventions-and-research-background/govuk-content-principles-conventions-and-research-background)

[13] [Federal Plain Language Guidelines (March 2011, Rev. 1 May 2011)](https://wid.org/wp-content/uploads/2022/03/FederalPLGuidelines.pdf)

[14] [On Developing Plain Language Principles and Guidelines](https://www.karenschriverassociates.com/wp-content/uploads/2020/03/2-Schriver-Developing-Plain-Language-Principles-n-Guidelines.pdf)

[15] [PowerPoint Does Rocket Science--and Better Techniques for Technical Reports (notebook thread)](https://www.edwardtufte.com/notebook/powerpoint-does-rocket-science-and-better-techniques-for-technical-reports/)

[16] [2017 Letter to Shareholders](https://www.aboutamazon.com/news/company-news/2017-letter-to-shareholders)

[17] [Self-editing | Technical Writing Two | Google for Developers](https://developers.google.com/tech-writing/two/editing)

[18] [Professional Editorial Standards 2024: A. The Fundamentals of Editing](https://editors.ca/publications/professional-editorial-standards/fundamentals-editing/)

[19] [Professional Editorial Standards 2024: B. Standards for Structural Editing](https://editors.ca/publications/professional-editorial-standards/structural-editing/)

[20] [Readability formulas have even more limitations than Klare discusses](https://redish.net/wp-content/uploads/Redish_on_Readability_Formulas.pdf)

[21] [The Elements of Style (1918), III. Elementary Principles of Composition](https://www.bartleby.com/141/strunk5.html)

[22] [How Users Read on the Web](https://www.nngroup.com/articles/how-users-read-on-the-web/)

[23] [The Pyramid Principle: Book Summary & Review (Part 1: Logic In Writing) (secondary; quotes Minto's The Pyramid Principle)](https://strategyu.co/pyramid-principle-partone/)

[24] [The Minto Pyramid Principle: Concept](https://www.barbaraminto.com/concept)

[25] [Writing from the Top Down: Pros and Cons of the Inverted Pyramid](https://www.poynter.org/reporting-editing/2003/writing-from-the-top-down-pros-and-cons-of-the-inverted-pyramid/)

[26] [Why bullets won't make your case](https://www.writing-skills.com/bullets-wont-make-case)

[28] [Lists and tables | Technical Writing One | Google for Developers](https://developers.google.com/tech-writing/one/lists-and-tables)

[29] [Inverted Pyramid: Writing for Comprehension](https://www.nngroup.com/articles/inverted-pyramid/)

[30] [Why Academics Stink at Writing (Chronicle of Higher Education, 2014)](https://grad.ncsu.edu/wp-content/uploads/2016/06/Why-Academics-Stink-at-Writing-1-2.pdf)

[32] [How bulleted lists and enumerations in formatted paragraphs affect recall and evaluation of functional text (Information Design Journal 21:2)](https://benjamins.com/catalog/idj.21.2.06jan)

[33] [Design Docs at Google](https://www.industrialempathy.com/posts/design-docs-at-google/)

[34] [How to write a good design document](https://grantslatton.com/how-to-design-document)

[36] [Better design docs](https://blog.mbrt.dev/posts/better-design-docs/)

[64] [Paraphrase testing (Plain language guide series)](https://digital.gov/guides/plain-language/test/paraphrase-testing)

[69] [Readability Formulas: seven reasons to avoid them and what to do instead](https://www.effortmark.co.uk/readability-formulas-seven-reasons-to-avoid-them-and-what-to-do-instead/)

[94] [Letting Go of the Words (2nd ed.), Chapter 2: Planning: Purposes, Personas, Conversations](https://redish.net/wp-content/uploads/Redish_2nd_ed_Chap_2.pdf)

[180] [Using large language models (LLMs) in technical writing](https://developers.google.com/tech-writing/two/llms)
