# Dossier: LLM/agent prompting guidance for running the doc-coauthoring workflow in Claude Code

## Summary

Current Anthropic guidance, together with the LLM-as-judge literature, supports the core idea of the doc-coauthoring skill: test the draft with a reader that has no context. It also points to specific weaknesses in how SKILL.md carries that idea out. Five changes have the strongest support.

1. Run Reader Testing in a genuinely isolated, non-fork subagent and hand it the document verbatim. Do not frame the document as the user's own work.
2. Write expected answers on the author side before testing, and let the reader answer "Not stated in the document". Without a reference, judges over-credit answers.
3. Replace open-ended "check for ambiguity/slop" prompts with yes/no checklists, and give each check a quoted span as evidence.
4. Treat the author-side "re-read and polish" passes as polish only. Self-refinement improves fluency, not substance. The near-completion and final reviews should be merged or moved to the fresh reader.
5. Calibrate the skill to current models. Opus 5 writes longer documents and verifies on its own. Fable 5.1 under-formats. "CRITICAL/MUST"-style emphasis and blanket anti-formatting rules are out of date.

Judged against Anthropic's own skill-authoring guidance, SKILL.md is under the 500-line ceiling (375 lines). It spends many tokens on scripted "announce/inform" steps that Claude already knows how to do. It names claude.ai artifact tools (`create_file`, `str_replace`) that do not exist under those names in Claude Code.

Key uncertainty: no primary study shows that a fresh LLM reader is a good proxy for human comprehension of a specific design doc. The evidence that does exist suggests capable models are *too good* at inferring what the text leaves out. No source in this facet measures self-preference in current Claude models.

## Facet Questions and Scope
<!-- facet: F5 -->
F5 asks what current LLM and agent prompting guidance bears on running a co-authoring workflow in Claude Code. In scope: Anthropic prompting best practices and the model-specific pages (Opus 5, Fable 5.1); skill-authoring best practices; Claude Code subagents versus forks; evaluator-optimizer; context engineering; evals and judges; the OpenAI GPT-5/4.1 guides and the OpenAI hallucination post; LLM-as-judge biases; rubric, checklist and reference-guided judging; and self-refine and its limits. The facet also includes an audit of the upstream SKILL.md against Anthropic's skill-authoring guidance. Out of scope: general technical-writing craft (other facets) and human-subject studies of AI co-writing.

## Source Groups and Findings

### 1. How to write the instructions themselves (Anthropic prompting guidance)

Anthropic's general guidance asks for explicit, motivated instructions rather than emphatic ones. The golden rule is to show your prompt to a colleague with minimal context on the task and ask them to follow it; if they'd be confused, Claude will be too [122]. <!-- claim: 03fcae0ee5a0f466; evidence: a43e355aa121113b; source: da45de5646cbbc5b --> Providing context or motivation behind instructions, such as explaining why such behavior is important, can help Claude better understand goals and deliver more targeted responses [122]. <!-- claim: 41ad73c2399cb510; evidence: 422fdbdabc864126; source: da45de5646cbbc5b --> Where a prompt might have said "CRITICAL: You MUST use this tool when...", more normal prompting like "Use this tool when..." can be used [122]. <!-- claim: 03a6540dcb828fa6; evidence: 3c5f3c7701896f50; source: da45de5646cbbc5b --> On format, the guidance favors positive instructions. The guidance is to tell Claude what to do instead of what not to do, e.g. instead of "Do not use markdown" try "Your response should be composed of smoothly flowing prose paragraphs." [122]. <!-- claim: fe4969c054122754; evidence: bb9b1bec74fc591e; source: da45de5646cbbc5b --> Two long-document techniques apply directly to Reader Testing. For long document tasks, ask Claude to quote relevant parts of the documents first before carrying out its task [122]. <!-- claim: 85ee29bdfe137bad; evidence: 5fca218bd051fc3b; source: da45de5646cbbc5b --> Placing long documents and inputs near the top of the prompt, above the query, instructions, and examples, improves performance across all models [122]. <!-- claim: ae97ed31e9c0d5a1; evidence: 08566b8c8df5d121; source: da45de5646cbbc5b -->

The model-specific pages change several defaults that the skill quietly relies on. Opus 5 writes longer documents and verifies more on its own initiative:

- Files that Claude Opus 5 writes to disk (reports, Markdown documents, summaries) are often longer than on prior models, so Claude-authored documents need explicit length calibration [123]. <!-- claim: 2b715299e6b95a3c; evidence: fd778c09760e8f36; source: 545654c2e6e4a55e -->
- Claude Opus 5 verifies its own work without being told to, and explicit verification instructions such as "use a subagent to verify" cause over-verification and should be removed [123]. <!-- claim: 08377f0f92c96207; evidence: a892bb2cab61c852; source: 545654c2e6e4a55e -->
- Claude Opus 5 delegates to subagents more readily; delegation pays off on genuinely independent, sizeable tracks of work but multiplies cost and time when applied to small tasks [123]. <!-- claim: 480ed274c89a309d; evidence: 5aa89f6346c17a39; source: 545654c2e6e4a55e -->

Fable 5.1 moves in the opposite direction from the "too many bullets" problem that older anti-formatting prompts were written to suppress:

- Claude Fable 5.1 uses bold less and is less likely to reach for headers, lists, or quotation marks than earlier models, which overused bullets and bold in chat [124]. <!-- claim: 3919a07e1200e8b1; evidence: 6c3a2312b7cda280; source: 557f96ccb3270d91 -->
- If a prompt contains anti-formatting language, remove it or replace it with a rule that says when specific formatting is appropriate [124]. <!-- claim: 74b4a8428cbd3ec7; evidence: 29995bd1e3f24b2f; source: 557f96ccb3270d91 -->
- Claude Fable 5.1's prose is in some cases denser, with longer sentences and fewer paragraph breaks, and an instruction that defines the anti-pattern, mannered prose, helps [124]. <!-- claim: d2d1e2f112fa9bb9; evidence: 9c63680261d4ecfd; source: 557f96ccb3270d91 -->
- When summarizing documents, Claude Fable 5.1 is more likely to reproduce passages of the source text without marking them as quotations [124]. <!-- claim: 2bce4126c0a3ffed; evidence: f91b926292e40487; source: 557f96ccb3270d91 -->

The OpenAI guides back the same direction for strongly instruction-following models. GPT-5's careful instruction-following means contradictory or vague instructions can be more damaging, as it expends reasoning tokens searching for a way to reconcile the contradictions [134]. <!-- claim: f8202619e2c707f6; evidence: 76b6a56220bc60aa; source: 643282b96ef2f98c --> Adherence to Markdown instructions can degrade over a long conversation, and appending a Markdown instruction every 3-5 user messages gave consistent adherence [134]. <!-- claim: 9e7372da6c1ab2ac; evidence: a1235080578ef3f8; source: 643282b96ef2f98c --> Inference: the skill's long, conditional, multi-branch instructions (artifacts vs files, sub-agents vs no sub-agents) leave room for exactly this kind of contradiction-resolution overhead, and the skill runs over a long conversation, so its formatting conventions (numbered options, shorthand replies) may decay unless they are restated at the point of use.

### 2. Skill-authoring guidance, and how SKILL.md measures up

Anthropic's skill guidance sets these constraints:

- Being concise in SKILL.md still matters because once Claude loads it, every token competes with conversation history and other context [125]. <!-- claim: 711d0c71b68adf5a; evidence: 3224228242eda8d3; source: ee885bfc4c773cf4 -->
- The default assumption is to only add context Claude doesn't already have and to challenge each piece of information [125]. <!-- claim: 1066ee56552ec01f; evidence: 02eb0f30220abd73; source: ee885bfc4c773cf4 -->
- For an open field with no hazards, where many paths lead to success, give general direction and trust Claude to find the best route (high freedom) [125]. <!-- claim: 755dcfd6f4871e5f; evidence: 59b23174c88e8d8a; source: ee885bfc4c773cf4 -->
- A validation loop can use reference documents instead of scripts, where the "validator" is STYLE_GUIDE.md and Claude performs the check by reading and comparing [125]. <!-- claim: ae3c54e58e50270d; evidence: 1889dd59a72ade77; source: ee885bfc4c773cf4 -->
- Create evaluations BEFORE writing extensive documentation, so the Skill solves real problems rather than documenting imagined ones [125]. <!-- claim: 32d350f54f2f5223; evidence: 19e1531feec01934; source: ee885bfc4c773cf4 -->
- The description is what Claude matches a request against when deciding whether to trigger the Skill, so it must say both what the Skill does and when to use it [126]. <!-- claim: c72377997c4d26c0; evidence: da1c4abec459ccc4; source: 5388df5d34815380 -->

The context-engineering post adds the general principle and its reason. Good context engineering means finding the smallest possible set of high-signal tokens that maximize the likelihood of some desired outcome [130]. <!-- claim: b7790f24db54a295; evidence: 11317f5d1655b62a; source: 126e07cf0d684e03 --> As the number of tokens in the context window increases, the model's ability to accurately recall information from that context decreases [130]. <!-- claim: e5db6d81f9dc0740; evidence: e7c9cc5d6c4b230d; source: 126e07cf0d684e03 --> Rather than stuffing a laundry list of edge cases into a prompt, the recommendation is to curate a set of diverse, canonical examples that portray the expected behavior [130]. <!-- claim: 3d942773904a3eb2; evidence: 7ecd9c61597e086f; source: 126e07cf0d684e03 -->

Audit of the upstream SKILL.md (my reading of the file against these sources):

- **Length.** 375 lines and about 2,500 words, which is under the 500-line ceiling. About 17 lines are scripted "Announce…/Inform them…" steps, for example "Announce work will begin on the [SECTION NAME] section." These are conversational moves Claude makes without being told. By the "only add context Claude doesn't already have" test [125], they are candidates to cut.
- **Emphasis.** The skill has no "CRITICAL/MUST" capitals, which matches current guidance [122]. It does use around 40 bold spans, many of them bolded conditional headers. Stylistically, it uses "never" absolutes ("never reprint the whole doc", "Never use artifacts for brainstorming lists").
- **Degrees of freedom.** Co-authoring is mostly an "open field" task, yet the skill fixes counts throughout: 5-10 questions, 5-20 options, 3-5 sections, "3 consecutive iterations". Those counts read as hard requirements. Better to state them as defaults with a stated purpose [125].
- **Description field.** It says both what the skill does and when to use it, as [126] requires. It repeats the trigger list twice ("Use when…", "Trigger when…"), which could be tightened.
- **Tool names.** `create_file` and `str_replace` are claude.ai artifact/editor tool names. In Claude Code the equivalents are Write and Edit. Under "Artifact Management" the skill says "Use `create_file` for drafting full sections", which conflicts with Step 5's "Use `str_replace` to replace the placeholder text". It also says to "provide artifact link after every change", which is host-specific. Inference: describe the intended operation ("create the file once; edit sections in place; never re-emit the whole document") and let the host map it to its own tools.
- **Feedback loops.** The skill has a reader-test loop but no reference-document validator (style guide, doc-type checklist) of the kind [125] describes. It also ships no evals.

### 3. Fresh context: subagents vs forks in Claude Code

Each subagent starts with a fresh, isolated context window and does not see conversation history; Claude composes a delegation message that summarizes the task, and the subagent works from there [127]. <!-- claim: 892e3ecc49f5c3c5; evidence: 7bad2110d9d6916c; source: 7dc93e85c023d968 --> A fork is a subagent that inherits the entire conversation so far, which drops the input isolation that subagents otherwise provide [127]. <!-- claim: 86e0da5680ad2e5d; evidence: ef66a26da45b66c0; source: 7dc93e85c023d968 --> A fresh context improves code review since Claude won't be biased toward code it just wrote [128]. <!-- claim: abc1b04c7c3eed46; evidence: b18d46981e452b80; source: 9686dc1633cd25c6 --> A reviewer running in a fresh subagent context sees only the diff and the criteria you give it, not the reasoning that produced the change, so it evaluates the result on its own terms [128]. <!-- claim: 7043a6638f1f33a9; evidence: 00de2aad78e32f11; source: 9686dc1633cd25c6 --> Each subagent needs an objective, an output format, guidance on the tools and sources to use, and clear task boundaries [131]. <!-- claim: 2fafa2e0b7e29773; evidence: 2f3cfc1a7f8edc03; source: a3afc1e8c7c23916 -->

Inference: SKILL.md says to "invoke a sub-agent with just the document content and the question". That is the right idea, but in Claude Code it is under-specified in two ways. (a) Claude Code also offers forks, and a fork carries the whole authoring conversation along with it, which defeats the test. (b) A normal subagent still receives a *delegation message composed by the author-Claude*. That message can leak the author's intent, add framing such as "the user wrote this", or paraphrase the document instead of passing it verbatim. The skill should require the verbatim file (or file path), the reader question, and an output format, and nothing else.

### 4. Evaluator-optimizer and self-refinement

The evaluator-optimizer workflow is particularly effective when there are clear evaluation criteria and when iterative refinement provides measurable value [129]. <!-- claim: 0ff5c4077a45ed89; evidence: 27222f8b6bf42d7c; source: ffc229d83891918f --> Self-Refine outputs are preferred by humans and automatic metrics over one-step generation, improving by 20% absolute on average in task performance [139]. <!-- claim: 8d60bb28c292b32b; evidence: 874a315e066c2e9d; source: 84dfa8c302f8c9c9 --> Changing from specific feedback to generic feedback leads to a significant performance drop in Sentiment Transfer (43.2 to 31.2) [139]. <!-- claim: fc61dcd1f490d5d6; evidence: c3947973878233a3; source: 84dfa8c302f8c9c9 --> CoVe answers verification questions independently so the answers are not biased by other responses [82]. <!-- claim: 95449c7fb02a8fa8; evidence: 20668eb75af96e8c; source: b1f6a8047c37d10f -->

Inference: these sources support iterative refinement when the feedback is specific and comes from a source that can actually spot the problem. The user's numbered curation and the reader subagent's failures are both such signals. Generic "review for flow and slop" self-passes are not.

### 5. Judges: biases, rubrics, references, and the "Unknown" exit

Bias findings:

- Most LLM judges exhibit strong position bias favoring the first position, and only GPT-4 outputs consistent results in more than 60% of cases [137]. <!-- claim: 898ad5bb70268aa4; evidence: 3e21d39bf608f11e; source: fe3c0d3102288397 -->
- GPT-4 favors itself with a 10% higher win rate and Claude-v1 favors itself with a 25% higher win rate [137]. <!-- claim: 31225eb76e10537a; evidence: bd097a32217f4fb9; source: fe3c0d3102288397 -->
- Self-preference is a bias where an LLM evaluator scores its own outputs higher than others' while human annotators consider them of equal quality [81]. <!-- claim: d322366b113a085e; evidence: 0a2c0cadb2c9aa72; source: 8704997ce5824d92 -->
- AI assistants frequently provide feedback that is more positive when the user states they like or wrote the passage of text [104]. <!-- claim: 98f03bf5ff67b6b5; evidence: b8faa03947ad1d38; source: d6fb2b001042aa3d -->

Remedies found in the sources:

- To avoid hallucinations, give the LLM grader a way out, like an instruction to return "Unknown" when it doesn't have enough information [133]. <!-- claim: 68b726b7832d6f61; evidence: 62baac9dbd47fa0f; source: 6c790a16de0afd2b -->
- When models are graded only on accuracy, they are encouraged to guess rather than say "I don't know." [136]. <!-- claim: 362f47bd6d86afe5; evidence: d1e08a57d4a2f96c; source: 39305e45dcf4de61 -->
- LLM-as-judge graders should be closely calibrated with human experts to gain confidence that there is little divergence between human grading and model grading [133]. <!-- claim: 5545ff34152b70b3; evidence: bfc783f846670324; source: 6c790a16de0afd2b -->
- CheckEval is a checklist-based evaluation framework that improves rating reliability via decomposed binary questions [141]. <!-- claim: 7cd14834eaf9b842; evidence: a65b9340b415a87e; source: 7cd53d39b7f268a2 -->
- Judges show high agreement with human experts only on questions the judges were able to correctly answer themselves when not provided with a correct reference [144]. <!-- claim: 049ab0348e0f5ac7; evidence: 195eb4521121aa34; source: 35a5b0ac72232fe2 --> Providing the judges with expert-written references largely mitigates this issue [144]. <!-- claim: e2aef701349d5274; evidence: 6cb4b93a95233785; source: 35a5b0ac72232fe2 -->
- Judge models tend to over-credit incorrect answers in the absence of a reference answer, and adding reference answer information flips correct/incorrect decisions by as much as 85% in some settings [145]. <!-- claim: b4fd2031a1c8e175; evidence: 2aaa41732d9db104; source: d54198973bbf00c8 -->

### 6. Can an LLM stand in for a less-informed reader?

Standard persona prompting yields near-perfect, deterministic performance, failing to capture the natural variance of developing readers [78]. <!-- claim: 0fe0c0e783ffc534; evidence: 178465204bbc9c7f; source: ef8ccb5ac52029b5 --> Increasing LLM capability actually degrades simulation fidelity [78]. <!-- claim: 72a11da2ae261d41; evidence: 70030d6c3f5d9006; source: ef8ccb5ac52029b5 -->

Inference: the reader-simulation studies concern children and students, not professional doc readers, so they transfer only partially. Still, they warn that a strong Reader Claude will fill gaps from world knowledge and from inference that real readers lack. A correct answer from Reader Claude is therefore weak evidence that the document is clear. A wrong or "not stated" answer is strong evidence that it is not. The reader prompt should require the reader to separate "stated in the doc (quote)" from "inferred or assumed".

## Counterevidence and Disagreements

- **Self-correction does not reliably work.** LLMs struggle to self-correct their reasoning, and in most instances the performance after self-correction even deteriorates [138]. <!-- claim: ee4db890a0e78ed1; evidence: 8b4ed20f23405ad7; source: eb965ead9f1c3b5e --> There is an exception for style. Prior works have demonstrated successful self-correction that aligns responses with specific preferences, such as altering the style of responses [138]. <!-- claim: 6788d4fb45a1c3e3; evidence: 04782f771962a637; source: eb965ead9f1c3b5e --> The self-refine pipeline improves the fluency and understandability of model outputs but further amplifies self-bias [140]. <!-- claim: 11eeec56ecd2e266; evidence: 9e83fcd3e380f8e7; source: bdf8803f523d649b --> For the 52B model, the critiques were sometimes reasonable, but often made inaccurate or overstated criticisms [143]. <!-- claim: 32c61600cc492575; evidence: b168d89722c17db4; source: 26b6866398248f43 --> This cuts against the skill's several author-side review passes (the "Quality Checking" removal question, Near Completion, "When all sections are drafted", Final Review) being treated as validation.
- **LLM critics are not useless.** LLMs are such good critics that they can even find mistakes in the text that they generated [180]. <!-- claim: 130b00d3affdf2db; evidence: 9d6da6ad4a8200fb; source: 4479d1abd5084f7d --> Strong LLM judges like GPT-4 can match controlled and crowdsourced human preferences well, achieving over 80% agreement, the same level of agreement between humans [137]. <!-- claim: e74b5b80611643f1; evidence: 97e187074e9a63c2; source: fe3c0d3102288397 --> These findings support having a critic. They do not settle whether the critic should be the author's own context.
- **Single judge or one judge per dimension: Anthropic's own posts disagree.** A single LLM call with a single prompt outputting scores from 0.0-1.0 and a pass-fail grade was the most consistent and aligned with human judgements [131]. <!-- claim: 4ac39fb09853614e; evidence: 0731cf7e3305b99f; source: a3afc1e8c7c23916 --> It can help to grade each dimension of a task with an isolated LLM-as-judge rather than using one to grade all dimensions [133]. <!-- claim: db1e51987138c295; evidence: 7572610f6c025af8; source: 6c790a16de0afd2b --> Unresolved. For document checks, my inference is to use one isolated reader per *question* (which is close to what the skill already does), plus a single checklist pass.
- **Over-verification vs. verification.** The Opus 5 page says to remove "use a subagent to verify" boilerplate [123]. The Claude Code best-practices page recommends a fresh-context reviewer [128]. They can be reconciled: the reader test is a *designed check with distinct information* (no authoring context), not a generic double-check. Even so, the skill should scale it to the stakes of the document.
- **The co-writing premise itself.** When you rely on an LLM to create a first draft, you lose the benefits of the writing process [180]. <!-- claim: 21ec49c5e95647bd; evidence: 36a0e4a8f7c9d1a3; source: 4479d1abd5084f7d --> The skill's 5-20-option brainstorm-then-curate loop has the model generating content the author might otherwise have worked out alone. This tension belongs to other facets, but it bears on how prescriptive the brainstorm step should be.
- **Banned-phrase lists backfire.** Suppression may introduce a backfire effect: if we forbid a term while prompting, the model can accidentally prioritize it by talking about it more [177]. <!-- claim: b08e5320feab3c87; evidence: fe3155aa277abc6a; source: 08517a2d8575b3fc --> This supports replacing "anything that feels like slop" with a positive definition of the target prose. It agrees with [122] and [124].

## Implications for doc-coauthoring SKILL.md

Ordered by strength of evidence and expected impact.

1. **Stage 3: specify true isolation.** Replace "invoke a sub-agent with just the document content" with: "Spawn a fresh (non-fork) subagent. Give it only the document text verbatim (or its file path) and one reader question. Do not say who wrote it or what the doc is trying to achieve beyond what the doc says." Evidence: [127] [128] [104] [105].
2. **Stage 3: author-side reference answers and an explicit out.** Before testing, write the expected answer for each reader question, with the section it should come from. Have the reader answer, quote the supporting passage, and reply "Not stated in the document" when it cannot find one. Grade a guess presented as an answer as a failure. Evidence: [144] [145] [133] [136] [122].
3. **Stage 3: separate "stated" from "inferred".** Ask the reader to list what it had to assume or infer. Treat inferred-but-correct answers as gaps. Do not count fluent correct answers as proof of clarity. Evidence: [78] [79].
4. **Replace the open-ended checks with a checklist.** Swap "check for ambiguity, false assumptions, contradictions" and "anything that feels like slop" for doc-type yes/no checklists kept in a reference file (for example `references/checklists.md`). Example items: "Does the doc state the decision being requested?" and "Is every acronym defined on first use?". The reader answers each item with a quote. Evidence: [141] [125] [129].
5. **Consolidate the author-side review passes.** Merge "Near Completion" and "When all sections are drafted" into a single coherence/redundancy pass, and call it polish, not validation. Rely on the reader test and the user for substance. Evidence: [138] [140] [143] [123].
6. **Calibrate length and format with positive rules.** Add a length target per doc type ("aim for N words; put depth in appendices"). Describe the target prose positively ("short paragraphs, one idea each; use lists only for parallel items; use tables for comparisons"). Avoid a ban list. Tell Claude to mark verbatim reuse of pasted sources as quotes. Evidence: [123] [124] [122] [177] [180].
7. **Make the skill host-neutral and leaner.** Describe operations instead of naming `create_file`/`str_replace` ("create the file once; edit sections in place"). Cut the scripted "Announce/Inform" lines. State counts as defaults with their purpose, for example "ask enough numbered questions (typically 5-10) that edge cases and tradeoffs can be discussed". Tighten the description's repeated trigger lists. Evidence: [125] [126] [130].
8. **Scale verification to stakes.** For short or low-stakes docs, offer a lighter reader test (2-3 questions), because Opus 5 already self-verifies and subagents add cost. Evidence: [123] [129].
9. **Restate conventions at the point of use.** Re-state the shorthand-reply convention and numbering rules at each section's start rather than once at the top, because adherence decays over long conversations. Evidence: [134] [130].
10. **Ship evals.** Add a small eval set (2-3 realistic doc requests with known gaps) and test with a fresh Claude, as the skill guidance prescribes. Evidence: [125].

Suggested replacement text for Stage 3 Step 2:

> For each reader question, spawn a fresh subagent (not a fork). Give it only the document text and the question. Ask it to: (1) answer using only the document; (2) quote the sentence(s) that support the answer; (3) say "Not stated in the document" if no passage supports an answer; (4) list anything it had to assume. Compare its answer to the expected answer you wrote beforehand. A mismatch, a "Not stated", or a correct answer that rests on an assumption each marks a gap to fix.

## Methodological Limits and Open Gaps

- No source validates an LLM cold reader as a proxy for human comprehension of design docs. The closest evidence ([78], [79], [80]) concerns students and UX clicks, and it is negative.
- No source in this facet gives self-preference data for current Claude models (Opus 5, Fable 5.1). The bias figures [137] [81] come from 2023-2024 models.
- Single judge vs per-dimension judges is unresolved even within Anthropic's own posts ([131] vs [133]).
- The model-specific prompting pages ([123], [124]) are vendor guidance without published ablations.
- The SKILL.md audit (line, bold and "Announce" counts) is my own reading of the file, not sourced evidence.
- Retrieval was done by a separate worker. I did no new retrieval.

## Bibliography

[78] [“Act Like a 5th Grader” is Not Enough: Bounding Knowledge in LLM-Based User Simulators](https://arxiv.org/html/2608.30033)

[79] [Can LLMs Reliably Simulate Real Students’ Abilities in Mathematics and Reading Comprehension?](https://arxiv.org/abs/2507.08232)

[80] [What Would GPT Click: Practical Effects of Human-AI Behavioral Misalignment and the Cost of Synthetic Participants in User Experience](https://arxiv.org/abs/2605.18302)

[81] [LLM Evaluators Recognize and Favor Their Own Generations](https://arxiv.org/abs/2404.13076)

[82] [Chain-of-Verification Reduces Hallucination in Large Language Models](https://arxiv.org/abs/2309.11495)

[104] [Towards Understanding Sycophancy in Language Models](https://arxiv.org/abs/2310.13548)

[105] [Interaction Context Often Increases Sycophancy in LLMs](https://arxiv.org/abs/2509.12517)

[122] [Prompting best practices - Claude Platform Docs](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices)

[123] [Prompting Claude Opus 5 - Claude Platform Docs](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-opus-5)

[124] [Prompting Claude Fable 5.1 - Claude Platform Docs](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-fable-5-1)

[125] [Skill authoring best practices - Claude Platform Docs](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices)

[126] [Agent Skills overview - Claude Platform Docs](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview)

[127] [Create custom subagents - Claude Code Docs](https://code.claude.com/docs/en/sub-agents)

[128] [Best practices for Claude Code - Claude Code Docs](https://code.claude.com/docs/en/best-practices)

[129] [Building effective agents](https://www.anthropic.com/engineering/building-effective-agents)

[130] [Effective context engineering for AI agents](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents)

[131] [How we built our multi-agent research system](https://www.anthropic.com/engineering/multi-agent-research-system)

[133] [Demystifying evals for AI agents](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents)

[134] [GPT-5 prompting guide](https://developers.openai.com/cookbook/examples/gpt-5/gpt-5_prompting_guide)

[136] [Why language models hallucinate](https://openai.com/index/why-language-models-hallucinate/)

[137] [Judging LLM-as-a-Judge with MT-Bench and Chatbot Arena](https://arxiv.org/html/2306.05685v4)

[138] [Large Language Models Cannot Self-Correct Reasoning Yet](https://arxiv.org/html/2310.01798v2)

[139] [Self-Refine: Iterative Refinement with Self-Feedback](https://arxiv.org/html/2303.17651v2)

[140] [Pride and Prejudice: LLM Amplifies Self-Bias in Self-Refinement](https://arxiv.org/html/2402.11436)

[141] [CheckEval: A reliable LLM-as-a-Judge framework for evaluating text generation using checklists](https://arxiv.org/html/2403.18771)

[143] [Constitutional AI: Harmlessness from AI Feedback](https://arxiv.org/html/2212.08073)

[144] [No Free Labels: Limitations of LLM-as-a-Judge Without Human Grounding](https://arxiv.org/html/2503.05061v4)

[145] [LLM Judges Can Be Too Generous When There Is No Reference Answer](https://arxiv.org/html/2607.12885)

[177] [Anti-slopping: An innovation for rectifying LLM writing clichés](https://research.thoughtworks.com/library/anti-slopping-an-innovation-for-rectifying-llm-writing-cliches)

[180] [Using large language models (LLMs) in technical writing](https://developers.google.com/tech-writing/two/llms)
