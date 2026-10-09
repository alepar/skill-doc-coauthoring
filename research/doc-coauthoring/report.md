# Research Report: Making AI-assisted doc co-authoring produce better documents, and validating them before they ship

## Executive Summary

The upstream `doc-coauthoring` skill gets the overall shape right: gather context, build the document section by section with the author curating, then test it on a reader who has none of the author's context. The evidence gathered here supports keeping that shape. It also shows that several of the skill's mechanisms are weaker than they look, and that it leaves out practices which technical-writing, design-doc and co-writing research treat as central.

Six conclusions matter most for revising the skill.

1. **Reader testing asks the wrong questions and over-trusts its reader.** Asking readers whether a document is clear does not work. In a documented plain-language test, every reader said a letter was clear and several still would have acted on it wrongly [64]. Paraphrase, scenario and teach-back tests, graded against what the author intended, are the methods with evidence behind them [64][65][66][92]. An LLM reader is also too capable to stand in for a human one: capable models infer what the text leaves out, and persona prompts do not fix this [78][80]. The fresh-subagent test should stay, but as a floor that catches gaps, not as proof the document works for people.
2. **Grading needs a reference and isolation.** Without a reference answer, LLM judges over-credit wrong answers [144][145]. They also prefer their own text and longer text [81][120], and give warmer feedback when told the user wrote the text [104]. The reader test should therefore use an author-confirmed answer key and a non-fork subagent that gets only the document [127][128]. The reader needs an explicit "not stated in the document" option [133].
3. **Who originates content shapes the result.** When the model contributes text, essays converge, and the convergence comes from the model's contributions [96]. An opinionated model shifts the author's arguments, mostly without the author noticing [97]. Ownership tracks how much the author shaped the text [100]. The brainstorm and decision steps should collect the author's own position and options first. The productivity gains of AI drafting are real [108], so Claude should keep drafting.
4. **The skill does not decide what document it is writing.** Design-doc, RFC, ADR, PRD, postmortem and PR/FAQ cultures converge on a small core: goals with non-goals, real alternatives including "do nothing", honest drawbacks, open issues with next steps, and status metadata [33][36][39][35]. They also warn against template bloat and against writing a doc that isn't needed [57][35]. A doc-type map and a "do we need a doc, and how big?" triage would replace the current "suggest 3-5 sections".
5. **Writing and revision discipline is missing.** The skill has no step that fixes the main point, scope and non-scope before drafting [2]. It has no rule about prose versus bullets, although LLM defaults run to bulleted, overlong output [180][123]. Its revision is a single re-read rather than ordered structural, stylistic and copy passes [18][180].
6. **Parts of the skill are outdated for current Claude models and hosts.** It names claude.ai tool names (`create_file`, `str_replace`). It scripts many "announce/inform" lines that add little. Its anti-"slop" check is one vague bullet. Current Anthropic guidance favors lean skills, positive formatting rules, length calibration, no emphatic "MUST" language, and evals written before the skill [125][124][123][122].

Retrieval stopped as **budget-exhausted** after three rounds. Every high-priority facet had direct evidence and counterevidence, but the residual low-yield rounds needed for a "saturated" stop were not run. The most important open gap: no source directly measures how well an LLM cold read predicts human comprehension of real workplace documents. The recommendation to treat Reader Claude as a floor rests on adjacent evidence from student-reader simulation, UX testing and LLM-as-judge studies.

The prioritized change list is the final section of this report. The detailed evidence is in six dossiers:

- [Writing fundamentals](dossiers/d1-writing-fundamentals.md)
- [Doc types and templates](dossiers/d2-doc-types-and-templates.md)
- [Validation](dossiers/d3-validation.md)
- [Human–AI co-writing](dossiers/d4-human-ai-cowriting.md)
- [LLM and agent guidance](dossiers/d5-llm-agent-guidance.md)
- [Tools, style guides and AI prose](dossiers/d6-tools-styleguides-ai-prose.md)

## Introduction

**Question.** What prompts, practices and patterns, from technical writing, editing, documentation, design-doc/RFC/PRD culture and human–AI co-writing, would make an AI-assisted document co-authoring process produce better docs? And how should such docs be validated before shipping?

**Purpose.** This research feeds a repository that will ship an improved version of Anthropic's `doc-coauthoring` skill. That skill's public history shows a single commit touching its SKILL.md: The GitHub commits API for skills/doc-coauthoring/SKILL.md returned a single commit, 2025-12-04, "Add doc-coauthoring skill and update example skills (#134)" [184]. <!-- claim: 669826491f8d580f; evidence: fcba0e92bb1d0416; source: 278c2785e3ad1cc8 --> The analysis therefore reads the upstream file as it stands. That file runs: an initial offer; Stage 1, Context Gathering (meta-questions, info dump, 5-10 clarifying questions); Stage 2, Refinement & Structure (per-section questions, brainstorm 5-20 options, curate, gap check, draft, refine with surgical edits, then near-completion and final re-reads); Stage 3, Reader Testing (predict reader questions, test them with a fresh sub-agent, run open "ambiguity/assumptions/contradictions" checks, loop back); and a Final Review.

**Scope.** The research covered six high-priority facets and one supporting facet:

- F1, writing fundamentals;
- F2, doc-type templates and cultures;
- F3, validation;
- F4, human–AI co-writing research;
- F5, LLM and agent guidance for running the workflow in Claude Code;
- F6, comparable skills, tools and style guides;
- F7 (supporting), markers of AI-generated prose.

**Assumptions.**

- The improved skill's primary host is Claude Code, with subagents and file access, and it should degrade gracefully to claude.ai.
- The documents produced will be read both by people and by LLMs that people paste them into.

## Main Analysis

### 1. How good docs are written (F1)

<!-- facet: F1 -->

The guidance converges on four disciplines that the upstream skill only partly encodes.

**Define the reader by goal and knowledge gap.** Defining the reader by role alone is not enough. Google's technical-writing course asks a fuller set of questions: The guide asks: What is your target audience's goal, why are they reading this document, what do your readers already know, and what should your readers know or be able to do after they read your document? [2]. <!-- claim: c7b8df16fb816e2f; evidence: 786e2ba1ce61b103; source: 27a619a70c947904 --> The skill's Stage 1 asks only "Who's the primary audience?" and "What's the desired impact?".

**Fix purpose, main point and scope before drafting.** The same course recommends writing a scope statement and goes further: A better document additionally defines its non-scope: the topics not covered that the target audience might reasonably expect your document to cover [2]. <!-- claim: dd14a7dd23ca555a; evidence: 5aecd4b94545b168; source: 27a619a70c947904 --> The scope then becomes the test for what to cut. Put the main point first in most cases, with one important qualification. Bryan Garner's critique explains when "bottom line up front" fails: Garner says BLUF assumes the reader has clearly requested precise information or a recommendation and already understands the mission, the operating environment and the underlying problem [7]. <!-- claim: 63e11aaf4e8c1b87; evidence: ab74d808bb987a37; source: 81c0e30202765747 --> Persuasive and decision documents therefore often need the problem stated before the answer. See [the writing-fundamentals dossier](dossiers/d1-writing-fundamentals.md) for the GOV.UK, NN/g and Army AR 25-50 positions [6][9][29].

**Use prose for reasoning and lists for parallel items.** Bezos's argument for narrative memos is that The narrative structure of a good memo forces better thought and better understanding of what's more important than what, and how things are related [11]. <!-- claim: 01a88ae0e20605e9; evidence: 6512654bbc1d78f8; source: d9a7c765aa01b3bf --> The evidence on bullets is mixed rather than one-sided. Lists help readers recall the listed items, but In two studies, bulleted lists had a negative effect on the recall of content presented in the surrounding text [32]. <!-- claim: a07510575105cffa; evidence: 7accd07a209e06b2; source: 33931488e985c172 --> This matters for an AI co-author because the model's default runs the other way: LLM responses are typically a lot of bulleted lists connected by short paragraphs [180]. <!-- claim: 5a1d2b172d8afc76; evidence: 7058d7a347860e7e; source: 4479d1abd5084f7d -->

**Revise in ordered passes.** Professional editing standards separate structural, stylistic and copy editing, and require that each pass check its own effects: Editors should verify that all necessary edits have been applied at each preceding stage and that new problems have not been introduced [18]. <!-- claim: 348ec738b785f56e; evidence: 878414afb368620c; source: 261c3db6a98f874c --> Google's LLM-in-technical-writing guidance gives the same ordering for AI-assisted revision: The guide recommends fixing organizational issues before editing grammar and style issues [180]. <!-- claim: 30c1d6046a72f65b; evidence: 6020aac9b14d16f3; source: 4479d1abd5084f7d --> Length is the commonest structural defect. One practitioner's rule of thumb: Slatton claims you can almost always cut length by ~30% from the first draft without sacrificing information [34]. <!-- claim: 4772da6ff8cd08c2; evidence: 6333c87ea53facf9; source: be47be05ea0742de -->

**Writing is also thinking.** Lamport, Graham and Google's own LLM guidance warn that outsourcing the draft outsources the thinking: When you rely on an LLM to create a first draft, you lose the benefits of the writing process [180]. <!-- claim: 422751c0b57e3a9e; evidence: 36a0e4a8f7c9d1a3; source: 4479d1abd5084f7d --> This does not argue against AI drafting. It argues that drafting should be treated as a gap detector. Where the draft needs a reason, number or decision that the context does not supply, Claude should ask the author rather than write fluent filler.

### 2. What doc-type cultures prescribe (F2)

<!-- facet: F2 -->

Practitioner templates have a shared core, each part of which exists because reviewers kept asking the same questions [57][33]: problem or background, goals and non-goals, a proposal, alternatives, risks and drawbacks, open issues, and status metadata. What separates good docs in these cultures is what each section *does*, not whether the heading exists.

- **Non-goals.** Non-goals aren't negated goals like "The system shouldn't crash" but things that could reasonably be goals and are explicitly chosen not to be goals [33]. <!-- claim: 4cbb2fafa8e2dadc; evidence: 8255d685cd645e71; source: f71efa2c2c0102dc -->
- **Alternatives.** The most important alternative to see in a design is the default "do nothing" option [36]. <!-- claim: 22e5b52894a63f49; evidence: 05961ea54e866ed6; source: 17e86d9fc269045e --> Options must be real and at the same level of abstraction, with no "sandwiching" of the preferred option [46][61].
- **Drawbacks.** The Rust RFC process reports that RFCs that do not present convincing motivation, demonstrate lack of understanding of the design's impact, or are disingenuous about the drawbacks or alternatives tend to be poorly-received [39]. <!-- claim: af0d13c83b1e8e5a; evidence: 158f702f1a69e31f; source: 16eac748ac2d76b0 -->
- **Summaries.** HashiCorp's PRD guidance makes explicit what the upstream skill implies: The PRD introduction is read first but should be authored last, so the author summarizes the final content rather than writing an introduction without knowing the end result [44]. <!-- claim: 762e9d8d8317e690; evidence: eb8e119a8d0f7a60; source: 404a58ca52b594ba -->
- **User documentation.** For user docs, Diátaxis argues that Crossing or blurring the boundaries in the Diataxis map is at the heart of a vast number of problems in documentation [52]. <!-- claim: 202397f2fae9303d; evidence: 4fb4b3506410a95c; source: 10806d8ed39073c1 -->

Type-specific rules sit on top of the core:

- ADRs list negative as well as positive consequences in 1-2 pages [45].
- Postmortems are blameless, quantify impact, and give action items an owner and a verifiable end state [47][48].
- A PR/FAQ is a press release under one page plus an FAQ of five pages or less [49].

The [doc-types dossier](dossiers/d2-doc-types-and-templates.md) includes a ready-to-use table mapping each type to core sections and type-specific checks.

**Counterevidence: bloat and premature documents.** Twitter's experience is the clearest warning: After interviews, Twitter authors and reviewers felt that most of the RFC template was superfluous and the level of detail in most docs was too high, with much content better suited for code review [57]. <!-- claim: 807f5f004d6147f6; evidence: 78cf35083596ce63; source: 752507d9886b20e2 --> Critics such as Costa, Cagan and 37signals go further and question writing a spec at all for reversible decisions [56][54][62]. The practical test proposed by one practitioner is simple: A rule of thumb for whether a decision belongs in a design doc is to ask: what's the penalty for being wrong? [35]. <!-- claim: 013bfaaff583230c; evidence: d3afb88cb239ed3e; source: d4c3eaf303f7512a --> Review cultures also offer a rule the skill can use directly when a test reader misunderstands: When a reader asks a question or misunderstands, resolve the confusion in the doc itself rather than out of band in comment threads, chat, or email [63]. <!-- claim: 2e61a2694b37b026; evidence: e2d40360c29128f7; source: 02ed639372381754 -->

### 3. How docs should be validated (F3)

<!-- facet: F3 -->

The upstream Stage 3 has the right instinct: test the doc on a reader without the author's context. It uses the wrong instrument in two ways.

**Self-reported clarity is not evidence.** The plain-language testing literature is blunt. In the VBA case study, when each reader was asked a general question about understanding the letter, they all said that it was clear, yet several would have done something other than what VBA wanted [64]. <!-- claim: 0f5271b7b1f397f5; evidence: d028e3cfa9f5f6b6; source: 0581cd2109f9c69d --> The same guidance warns that The paraphrase-testing guide warns that you won't get much usable information from questions that can be answered with yes or no [64]. <!-- claim: d342766ec64e8551; evidence: 12408aa30f3207ce; source: 0581cd2109f9c69d --> The upstream skill's checks are "What in this doc might be ambiguous or unclear?" and "Are there any internal contradictions?". Those are exactly the self-report probes this evidence discounts.

Methods with evidence behind them are behavioral:

- paraphrase ("in your own words, what does this section mean?");
- scenario and task tests ("you need X; what do you do?");
- plus-minus marking;
- teach-back [64][66][68][92].

All of them are run in loops: The guide says to test, make corrections based on feedback, and test again, and to plan to test at least twice [65]. <!-- claim: 92d0cc567ff8139b; evidence: 7cbc8da2a609f012; source: 09abc8a8925483c2 -->

**The author cannot predict reader trouble.** The upstream Stage 3 begins with the author-side model predicting reader questions. Hinds's work shows why that is a weak step: Hinds found that experts suffer from a cognitive bias that leads them to underestimate the difficulty that novices will encounter [75]. <!-- claim: c023eeb1194638d7; evidence: 07d418dac9bf2d49; source: fcf541caeff29a4e --> Moreover, The experts' underestimation bias was resistant to a common debiasing technique of listing the steps and listing problems novices could encounter [75]. <!-- claim: f19e99f28dd95090; evidence: b887e5ef4cbcb8c8; source: fcf541caeff29a4e --> Omissions are the hardest class of defect: SmartBear notes that omissions are the hardest defects to find because it's difficult to review something that isn't there [89]. <!-- claim: 66cede1f70b67692; evidence: cb08b65a235bb738; source: 05830fb0fc3f439f --> Two methods target omissions directly: a pre-mortem, which imagines the plan has failed, and claim-by-claim checking. In Veinott et al.'s test, One hundred and seventy-eight people evaluated a plan, and the Premortem method reliably reduced confidence more than each of the other conditions [73]. <!-- claim: 7b8663f6deaca4a5; evidence: 7358024c6358110c; source: cf69afedd3ca45a0 --> Fact-checking practice is line-by-line: In the KSJ process the fact-checker goes through the piece line-by-line, checking each fact against its source [83]. <!-- claim: f39f32648bad9cba; evidence: 04185887bd196910; source: 28f51d95fadc95ae -->

**Review output needs severity.** Google's code-review guidance notes that Without comment labels, authors may interpret all comments as mandatory, even if some are merely informational or optional [84]. <!-- claim: 2ee06f1ae529e9f4; evidence: 86272ddff875a37a; source: a8d9e8779cfcac56 --> This matters for the skill's fix loop. Without severity, every reader-test finding is treated as mandatory.

**Readability formulas are not a gate.** Redish's summary: Redish concludes that a good readability score does not mean you have a usable document and that rewriting to get a better score is misusing the formula [20]. <!-- claim: a54e06abc533f4e8; evidence: ec1044961c838305; source: bcd05986ed630c3f --> Linting, with Vale for example, is useful as a cheap flag layer, not as a quality score [155][87].

**The LLM reader is a floor, not a proxy.** This is the most consequential finding for Stage 3. Simulation studies find that Standard persona prompting yields near-perfect, deterministic performance, failing to capture the natural variance of developing readers [78]. <!-- claim: afc87e51fce60e46; evidence: 178465204bbc9c7f; source: ef8ccb5ac52029b5 --> and that Increasing LLM capability actually degrades simulation fidelity of developing readers [78]. <!-- claim: 2aeb03e6a2c793cc; evidence: 70030d6c3f5d9006; source: ef8ccb5ac52029b5 --> In UX research, Synthetic GPT participants produced a significantly different distribution from real data in 53% of tasks [80]. <!-- claim: 9cd04147373141e2; evidence: 3666dfd37250b5e5; source: 941d7c6e13230333 --> The usability literature's position follows: Comprehension is a combined property of the text and a specific user segment, so to measure comprehension you must test with real users from your target audience [70]. <!-- claim: 41cefdbb123df248; evidence: 9cc6c0965af3b3ca; source: 6daa1c10977fa343 --> A fresh Claude that fails a scenario is strong evidence of a real gap. A fresh Claude that passes is weak evidence that humans will understand.

The [validation dossier](dossiers/d3-validation.md) proposes a complete redesigned Stage 3. It runs: answer key, cold paraphrase, scenario tasks with quoted evidence and a "not in doc" option, an omission/pre-mortem pass, a claim ledger, severity triage, retest with fresh agents, and a human handoff scaled to stakes.

### 4. What human–AI co-writing research shows (F4)

<!-- facet: F4 -->

**Failure modes come from who originates content.**

- **Convergence.** In Padmakumar and He's study, writing with InstructGPT made essays more alike, and This effect is mainly attributable to InstructGPT contributing less diverse text to co-written essays, while the user-contributed text remains unaffected by model collaboration [96]. <!-- claim: 1cf33914467d0709; evidence: af56c9d3fc921220; source: 11ee2b0f26d6aeca --> A 2026 meta-analysis puts the size in perspective: A three-level meta-analysis of 19 studies and 61 effect sizes reveals a small but statistically significant homogenisation effect associated with AI use, not explained by publication bias [111]. <!-- claim: 4dd474e2008c9b38; evidence: 4b21e11182fb3ea5; source: 94ddde9bb1c31ac7 -->
- **Opinion shift.** In Jakesch et al.'s study, Participants who received suggestions from a language model supportive of social media were 2.04 times more likely than control group participants to argue that social media is good [97]. <!-- claim: f7aaa728547a15d5; evidence: 2a1ca6fb7fa8723b; source: 72a8900677a6c230 --> and Most participants were not aware of the model's opinion and believed that the model did not affect their argument [97]. <!-- claim: 1f7ffd9b9370a0bb; evidence: 7a6491c120a5d226; source: 72a8900677a6c230 -->
- **Ownership.** Draxler et al. found that Higher levels of participants' influence on texts increased their sense of ownership, while personalization of AI-generated texts did not impact the AI Ghostwriter Effect [100]. <!-- claim: 06567346d63520bb; evidence: 6b7c84a6f3b4ef00; source: 0379563343648a87 -->
- **Critical thinking.** In a survey of knowledge workers, In a survey of knowledge workers, higher confidence in GenAI is associated with less critical thinking, while higher self-confidence is associated with more critical thinking [103]. <!-- claim: 5d6af04e67ef932a; evidence: e49390978f8bf01d; source: e881c2cc35e5a940 -->

For a co-authoring skill, the levers are the *order* in which the author and the model contribute, and *who states the position*.

**Sycophancy contaminates in-session review.** Anthropic's own sycophancy research found that AI assistants frequently provide more positive feedback when the user states they like or wrote the passage of text [104]. <!-- claim: 67f9cf16393e6697; evidence: b8faa03947ad1d38; source: d6fb2b001042aa3d --> Later work found that Agreement sycophancy tends to increase with the presence of user context, though model behavior varies based on the context type [105]. <!-- claim: 6c550ab75b32e413; evidence: ce4561cc6145307c; source: 09e4e674356d9d54 --> A long co-authoring conversation is the high-context case. In-session quality checks, such as the skill's "Quality Checking" and "Near Completion" re-reads, are therefore the least trustworthy reviews in the workflow.

**Patterns that work.** Question-led and feedback-only assistance keeps the author in charge. In a question-only prewriting study, Sensory and memory questions most reliably supported elaboration, while reflective questions stalled dialogue when posed too abstractly or too early [113]. <!-- claim: 551abd69f67f0883; evidence: f2e5a91447510b5c; source: 6bc278fda77d8091 --> AI reader personas help, with a caveat: Writers strategically used writer-defined AI personas for getting different perspectives, but the feedback was often verbose and unspecific [115]. <!-- claim: a8b1b4196fe2295b; evidence: 0a2e7fd668794f32; source: 1d5df02f4e191c3b --> They should be built from the real audience and constrained to cite specific sentences.

**Counterevidence.** Removing AI drafting would be a mistake. ChatGPT substantially raises average productivity: time taken decreases by 0.8 SDs and output quality rises by 0.4 SDs [108]. <!-- claim: 0ac8b98691d69af0; evidence: 4e097738fb7e83a6; source: 59877efdf3ea1938 --> The same field experiments show the risk: For a task outside the frontier, consultants using AI were 19 percentage points less likely to produce correct solutions compared to those without AI [109]. <!-- claim: bdb9b2144d93a815; evidence: c8bd9eb3b5dba224; source: 568da6134d1290b3 --> That risk is the argument for surfacing every specific Claude introduces for the author to verify. See [the co-writing dossier](dossiers/d4-human-ai-cowriting.md). It also discusses the contested "cognitive debt" study [101][102].

### 5. Running the workflow in Claude Code (F5)

<!-- facet: F5 -->

**Isolation is a property of how the subagent is spawned.** Claude Code's documentation states that Each subagent starts with a fresh, isolated context window and does not see conversation history; Claude composes a delegation message that summarizes the task, and the subagent works from there [127]. <!-- claim: bad2b784ecd20fda; evidence: 7bad2110d9d6916c; source: 7dc93e85c023d968 --> but also that A fork is a subagent that inherits the entire conversation so far, which drops the input isolation that subagents otherwise provide [127]. <!-- claim: bcdb830ec14111a5; evidence: ef66a26da45b66c0; source: 7dc93e85c023d968 --> Anthropic's best-practices page gives the rationale for fresh reviewers: A fresh context improves code review since Claude won't be biased toward code it just wrote [128]. <!-- claim: a1fec996b1e9415e; evidence: b18d46981e452b80; source: 9686dc1633cd25c6 --> The upstream skill says "invoke a sub-agent with just the document content". It should say explicitly: a non-fork subagent, given the document verbatim, with no framing that the user wrote it.

**Judges need references, an out, and binary criteria.**

- **Reference answers.** Judges show high agreement with human experts only on questions the judges were able to correctly answer themselves when not provided with a correct reference [144]. <!-- claim: 81b7e1b4280732c5; evidence: 195eb4521121aa34; source: 35a5b0ac72232fe2 --> A 2026 study adds that Judge models tend to over-credit incorrect answers in the absence of a reference answer, and adding reference answer information flips correct/incorrect decisions by as much as 85% in some settings [145]. <!-- claim: cea73b16e210f0e1; evidence: 2aaa41732d9db104; source: d54198973bbf00c8 -->
- **An out.** Anthropic's evals guidance recommends to To avoid hallucinations, give the LLM grader a way out, like an instruction to return "Unknown" when it doesn't have enough information [133]. <!-- claim: 27fa859d079efdc3; evidence: 62baac9dbd47fa0f; source: 6c790a16de0afd2b -->
- **Binary checklists.** On rubric format, CheckEval is a checklist-based evaluation framework that improves rating reliability via decomposed binary questions [141]. <!-- claim: 4f20cfa4bd6d6d8c; evidence: a65b9340b415a87e; source: 7cd53d39b7f268a2 -->

These findings translate directly into a Stage 3 where the author writes expected answers first, the reader may answer "not stated in the document", and checks are yes/no.

**Self-review is polish, not validation.** LLMs struggle to self-correct their reasoning, and in most instances the performance after self-correction even deteriorates [138]. <!-- claim: c89e8ffa8ce52ca5; evidence: 8b4ed20f23405ad7; source: eb965ead9f1c3b5e --> For text specifically, The self-refine pipeline improves the fluency and understandability of model outputs but further amplifies self-bias [140]. <!-- claim: e7254a42de2602f3; evidence: 9e83fcd3e380f8e7; source: bdf8803f523d649b --> Feedback quality matters too: in Self-Refine, Changing from specific feedback to generic feedback leads to a significant performance drop in Sentiment Transfer (43.2 to 31.2) [139]. <!-- claim: a56fca8df8827252; evidence: c3947973878233a3; source: 84dfa8c302f8c9c9 --> The skill's author-side re-reads should be framed as polish passes that return specific, located findings, with substance left to the fresh reader and the user.

**Calibrate to current models.**

- **Length.** Anthropic's Opus 5 guidance says Files that Claude Opus 5 writes to disk (reports, Markdown documents, summaries) are often longer than on prior models, so Claude-authored documents need explicit length calibration [123]. <!-- claim: 1d47b6f36d1c4355; evidence: fd778c09760e8f36; source: 545654c2e6e4a55e -->
- **Verification.** The same page warns Claude Opus 5 verifies its own work without being told to, and explicit verification instructions such as "use a subagent to verify" cause over-verification and should be removed [123]. <!-- claim: 6a73e587301aaa15; evidence: a892bb2cab61c852; source: 545654c2e6e4a55e --> This is a reason to scale the reader test to the stakes of the document, not to drop it.
- **Formatting.** For formatting rules: If a prompt contains anti-formatting language, remove it or replace it with a rule that says when specific formatting is appropriate [124]. <!-- claim: a9fe1dfc6ccee65a; evidence: 29995bd1e3f24b2f; source: 557f96ccb3270d91 -->
- **Emphasis.** On emphasis: Where a prompt might have said "CRITICAL: You MUST use this tool when...", more normal prompting like "Use this tool when..." can be used [122]. <!-- claim: 5beb894ef879f6c5; evidence: 3c5f3c7701896f50; source: da45de5646cbbc5b -->

**Skill-authoring rules apply to the skill itself.**

- **Context.** Anthropic's skill guidance says The default assumption is to only add context Claude doesn't already have and to challenge each piece of information [125]. <!-- claim: 43eafbf6aa3a4800; evidence: 02eb0f30220abd73; source: ee885bfc4c773cf4 -->
- **Evals.** It also says to Create evaluations BEFORE writing extensive documentation, so the Skill solves real problems rather than documenting imagined ones [125]. <!-- claim: 562713b0749d1d9f; evidence: 19e1531feec01934; source: ee885bfc4c773cf4 -->
- **Long sessions.** Co-authoring sessions are long, which is why As the number of tokens in the context window increases, the model's ability to accurately recall information from that context decreases [130]. <!-- claim: 3f9b1ce7eede49e9; evidence: e7c9cc5d6c4b230d; source: 126e07cf0d684e03 --> OpenAI's GPT-5 guide makes a related practical point: Adherence to Markdown instructions can degrade over a long conversation, and appending a Markdown instruction every 3-5 user messages gave consistent adherence [134]. <!-- claim: 2db46321c0924412; evidence: a1235080578ef3f8; source: 643282b96ef2f98c --> Conventions such as shorthand replies should be restated where they are used.

See [the LLM and agent guidance dossier](dossiers/d5-llm-agent-guidance.md). It includes an audit of the upstream SKILL.md against Anthropic's own skill-authoring guidance.

### 6. Comparable tools and style guides (F6), and AI-prose markers (F7)

<!-- facet: F6 -->

Comparable agent skills and tools do several things upstream `doc-coauthoring` does not.

- **Brief write-back.** The superpowers brainstorming skill writes the brief back before work begins: The superpowers brainstorming skill says to write back your understanding, summarizing the intended outcome, constraints, and success criteria, and to separate what they said from assumptions [150]. <!-- claim: 8237a1c7022790e9; evidence: c58e0acb0658e92e; source: 101df0cfe5835e9d -->
- **Options with a recommendation.** It also says The brainstorming skill says to propose 2-3 different approaches with trade-offs and to lead with your recommended option and explain why [150]. <!-- claim: c445232e6746c5fa; evidence: af0ba14d128bacbb; source: 101df0cfe5835e9d --> It runs a self-review that includes an ambiguity check: Its ambiguity check asks whether any requirement could be interpreted two different ways and, if so, to pick one and make it explicit [150]. <!-- claim: a810596bc8e03525; evidence: 181ea34c11a4d8ef; source: 101df0cfe5835e9d -->
- **House style and outline approval.** GitHub's documentation-writer skill mines existing material: When given other markdown files, the documentation-writer skill uses them as context to understand the project's existing tone, style, and terminology [151]. <!-- claim: c16c5896546cff20; evidence: 48708ac413db0981; source: e83e07b7bda64157 --> It also The documentation-writer skill proposes a detailed outline, such as a table of contents with brief descriptions, and awaits approval before writing the full content [151]. <!-- claim: b29463b56e892d98; evidence: 2facfa1ba9157a6c; source: e83e07b7bda64157 -->
- **Severity and fact-checking.** Practitioner reviewer-subagent setups tag severity and check facts against sources. Sato's docs-reviewer subagent labels Critical Issues (C1, C2, …) as must fix because they severely impact readability or correctness [153]. <!-- claim: 40dabf02d2f57bca; evidence: 5c96308c8909948d; source: 1efd2c22e7d09469 --> Sato's adk-reviewer agent does source code verification, investigating the actual implementation to verify issues rather than solely relying on API documentation [153]. <!-- claim: cc63a885545727a8; evidence: f4d8500e58ab2877; source: 1efd2c22e7d09469 -->
- **Feedback kept apart from text.** Commercial assistants keep feedback separate from text: In Coaching with Copilot, you control what changes to make, and the suggestions are separate from your content so that nothing gets overwritten [166]. <!-- claim: daf2cb55fc607fc8; evidence: 6f969710f70a6232; source: 473c8e66324e4c4d -->
- **Mechanical style checks.** Linters make style mechanical, with a clear rule for agents: Vale's agent instructions say do not silence a rule to make a run pass, because fixing the prose is the point of the tool [155]. <!-- claim: 480a35c8cf477c73; evidence: e323cf92b26176e7; source: 65887d28ddb9fc89 --> They come with a caveat: GitLab warns that if a rule is too subjective, it cannot be adequately enforced and creates unnecessary additional warnings [87]. <!-- claim: be2366d749cf7626; evidence: ee0f7be87fdf1cb7; source: 95dc1a497e2a949f -->
- **Consistency for AI readers.** Style guides add a reason consistency matters more for AI-mediated readers: GitLab's style guide says the increasing use of machine translation, GitLab Duo Chat, and other AI tools means that consistency is even more important [157]. <!-- claim: 126eeaf551450cd7; evidence: 30bf149582d29a5d; source: 68bd0cba209d10c3 -->
- **Accessibility beyond alt text.** Google's accessibility guidance widens the upstream alt-text step: Google's accessibility guidance says don't present new information in images and always provide an equivalent text explanation with the image [159]. <!-- claim: edf7cf59dfb2112b; evidence: 8a649842d49af182; source: 0ed6b289e4dd3f07 -->

A comparison table is in [the tools dossier](dossiers/d6-tools-styleguides-ai-prose.md).

<!-- facet: F7 -->

**AI-prose markers: fix causes, not words.** Wikipedia's AI-cleanup guidance identifies the underlying mechanism: According to the page, the LLM tends to omit specific, unusual, nuanced facts (which are statistically rare) and replace them with more generic, positive descriptions [170]. <!-- claim: 7ab118c10ed9684a; evidence: 57083e2a1ddd2131; source: 216545f88fe97a24 --> It also cautions that The page asks editors not to merely treat these signs as the problems to be fixed, because that could just make detection harder; the actual problems are the deeper concerns [170]. <!-- claim: bc782b1eed3e9a57; evidence: 425f98bf0f279c64; source: 216545f88fe97a24 --> A practical test from the anti-slop literature: Its smell test asks whether you could swap the topic and the text would still work, and says specificity is the antidote to slop [179]. <!-- claim: 6ecaf5500f450900; evidence: 1ff8b5e5fefd6fcc; source: 87db0d136ed1c2be -->

Surface bans displace the problem:

- A chapter drafted under a hard em-dash budget recounted 0.00 em-dashes per 1,000 words but carried 14 trailing appositive clauses, a density of 6.6 per thousand words [178]. <!-- claim: facff3cf20f2423f; evidence: 0ca79d852b724440; source: 0e3b3fd19152285a -->
- Thoughtworks warns that suppression may introduce a "backfire effect": if we forbid a term while prompting, the model can accidentally prioritize it by talking about it more [177]. <!-- claim: 7d56841a944c173d; evidence: fe3155aa277abc6a; source: 08517a2d8575b3fc -->

The one quantitative intervention found, the agent-style ruleset, reports large drops in surface tells: With agent-style, Claude Opus 4.7 dropped 47% (88 → 47 violations), Gemini 3 Flash dropped 86% (65 → 9), and GitHub Copilot CLI reported no change (52 → 52) [152]. <!-- claim: 426f75f942863151; evidence: 03308c891215b440; source: aa7f71ce8d21a796 --> But its author cautions to Agent-style says to read these percentages as mechanical AI-tell density, not evidence about argument quality, clarity for a stated audience, or sourcing [152]. <!-- claim: 0a523962ac087f04; evidence: bbbf77e79572e9d0; source: aa7f71ce8d21a796 -->

Detectors are not a usable gate. GPT detectors misclassified over half of the TOEFL essays as "AI-generated" (average false positive rate: 61.22%), while showing near-perfect accuracy for US 8-th grade essays [173]. <!-- claim: e77f60f10c69fd2e; evidence: 851b439e7defeb00; source: 05ea0961d7fe712d --> On a challenge set, the classifier correctly identified 26% of AI-written text as "likely AI-written" while labeling human-written text as AI-written 9% of the time [174]. <!-- claim: f2cd459d4e5f0f6c; evidence: 1fdedcdcc3744063; source: ddac8850e482fa2b -->

## Synthesis

Across facets, three design principles explain most of the recommended changes.

**Author-originated decisions, model-originated labor.** Writing research says the act of writing is where thinking happens [180][10]. Co-writing research says model-originated framing and text cause convergence, opinion drift and lost ownership [96][97][100]. Productivity research says AI drafting delivers large gains [108]. These fit together in one division of labor:

- The author originates the position, the options they already hold, and the decisions.
- Claude interviews, structures, drafts from the supplied material, and flags every specific it introduced.

The upstream skill partly embodies this: the user curates the lists and edits the text. But it brainstorms before asking for the author's own view, and it never asks the author to state the core position in their own words.

**Behavioral, reference-graded validation with isolated readers.** Document-usability research (paraphrase and scenario tests, test-retest) and LLM-as-judge research (reference answers, binary checks, isolation, sycophancy and self-preference) point to the same protocol [64][65][144][141][104][81]. The fresh reader paraphrases and performs tasks. Its answers are graded against an author-confirmed key. It must quote its evidence, may answer "not in doc", and must list what it inferred. The simulation literature adds a necessary humility [78][80]. Passing the LLM test is a floor. Docs that drive decisions should get a five-minute test with one real reader outside the team [66].

**Decide the document before drafting it.** Doc-type cultures and writing guidance agree that the expensive mistakes are made before drafting: the wrong document, the wrong size, the wrong scope, or a point the author has not yet decided [35][57][2][7]. A short triage and a written brief (purpose, main point, scope and non-scope, doc type and its core sections) are cheap. They also give every later stage a criterion for curating, cutting and testing.

These principles conflict in two places, and the recommendations resolve them by scaling to stakes.

- **More verification versus over-verification.** Anthropic's Opus 5 guidance warns against generic "verify with a subagent" instructions [123], while its Claude Code guidance recommends fresh-context review [128]. These are compatible: the reader test is a designed check with different information, not a generic re-verification. Its depth should scale with the stakes of the document.
- **Rigor versus speed.** Rigor in templates argues for thoroughness [33]; the bloat critique argues for brevity [57]. A mini-doc mode and the "penalty for being wrong" triage keep the process proportionate [35].

## Limitations

- **The LLM-reader proxy gap is unmeasured for workplace docs.** No source compared an LLM cold read with human reader tests on design docs, RFCs or specs. The "floor, not proxy" conclusion is inferred from student-reader simulation [78][79], UX click studies [80] and judge-bias research.
- **Co-writing evidence comes mostly from essays, creative writing and consulting tasks**, not technical documents. Homogenization effects are small in aggregate [111]. No study tests outline-first against section-by-section drafting, or author-first against model-first brainstorming.
- **Doc-type evidence is practitioner consensus.** No empirical study links template sections to outcomes. The closest is an interview-based template revision [57]. The sources lean toward large tech companies. Some PRD sources (Lenny's newsletter, Figma, Intercom) were inaccessible or not retrieved.
- **Model-specific guidance changes fast.** Claims about Opus 5 and Fable 5.1 behavior come from vendor docs without ablations [123][124]. Self-preference data for current Claude models was not found; the newest figure is for Claude-v1 [137].
- **AI-prose tell lists change constantly.** The only quantitative intervention measures surface tell density, not comprehension [152].
- **Retrieval stop.** The stop was budget-exhausted, not coverage-saturated. All high-priority facets met readiness after round 3, but the round still added sources, so further searching would likely add material, mostly in secondary areas.
- **Source verification.** Several items rest on abstracts only: de Jong & Schellens, the IDJ bullet study, some ACM papers. Some web sources (Wikipedia, vendor docs) are living documents retrieved in October 2026.

## Methodology

| Item | Value (derived from `queries.jsonl` / `retrievals.jsonl`) |
|---|---|
| Mode | UltraDeep, 7 facets (6 high-priority), 3 retrieval rounds |
| Search tool | `search` CLI (metasearch aggregating brave, serper, exa, jina, tavily, parallel and others); preflight **ok** |
| Fetch tools | `search` CLI extract mode (183 attempts), `curl` (48, including arXiv API and PDF + pdftotext), `gh api` (1) |
| Search query attempts | 161 (round 1: 97, round 2: 58, round 3: 6); 129 success, 32 partial |
| Result entries considered | 1,584 (before deduplication) |
| Query families | counterevidence 33, entity 29, source-specific 28, literal 26, citation-neighborhood 13, disciplinary 11, synonym 9, delta 9, vocabulary-probe 3 |
| Document fetch attempts | 232 (202 retrieved, 30 failed) |
| Distinct original documents retrieved | 190 canonical document keys |
| Registered sources / evidence passages / claims | 184 / 629 / 374 dossier claims plus final-report claims |

**Preflight and provider failures.** The CLI was present. `search agent-info` was inspected. The first scoped query ("design doc best practices how to write a good design document") returned `partial_success` with 10 usable results. The perplexity provider failed on every query with HTTP 401 `insufficient_quota`, and serper was out of quota for some runs. These are recorded as partial provider failures. No automatic fallback to another search tool was needed.

**Process.**

- **Retrieval.** Six parallel retrieval workers each covered one facet: F1, F2, F3, F4, F5, and F6+F7. Each ran an opening round and a follow-up round (literal, synonym, disciplinary and counterevidence families first; then citation-neighborhood, entity, source-specific and delta families). Each wrote query, retrieval and candidate logs. Every quote was programmatically checked as verbatim against the fetched text.
- **Lead integration.** The lead merged the logs and deduplicated sources by canonical identity, merging five duplicate arXiv entries into their canonical works. It then ran a third gap-filling round: counterevidence for F6, LLM-reader proxies, technical-writing LLM guidance, upstream repo history, and the primary PR/FAQ description.
- **Dossiers and claims.** Six dossier workers then wrote facet dossiers from the canonical evidence. Every factual claim is registered with a lexical-overlap support check against its evidence.

**Failed fetches.** There were 30 failed attempts.

- **Recovered by another route.** Several were recovered: arXiv abstract pages that returned titles only were refetched through the arXiv API or PDF; Grammarly's style-rules page was refetched via curl; the Refactoring English stub was refetched at its blog URL; and PubMed/Science (the Doshi & Hauser abstract) was read via PubMed.
- **Still inaccessible.** The Canada readability blog; the IDJ bullet study full text (bot walls at jbe-platform and ResearchGate; abstract used); the SSRN plain-language paper; Lenny's PRD post (paywall); AHRQ "tip 6"; a Microsoft internal style checklist; a SAGE article; the T&F version of the homogenization meta-analysis (the Aarhus repository record was used); an HBS page; two ACM DL pages (arXiv versions used); and Grammarly's brand-tones page.

These operational counts measure effort and access, not recall.

**Retrieval stop.** The stop was `budget-exhausted` at round 3, with no unresolved high-priority facets. Remaining gaps are listed per facet in `coverage.json` and in the Limitations above.

## Bibliography

[2] [Documents | Technical Writing One | Google for Developers](https://developers.google.com/tech-writing/one/documents)

[4] [Writing, Briefly](https://paulgraham.com/writing44.html)

[6] [Army Regulation 25-50: Preparing and Managing Correspondence](https://armypubs.army.mil/epubs/DR_pubs/DR_a/ARN42124-AR_25-50-007-WEB-13.pdf)

[7] [Should the bottom line be up front? Only with context, Bryan Garner says](https://www.abajournal.com/columns/article/should-the-bottom-line-be-up-front-only-with-context-says-bryan-garner)

[9] [Create a clear structure for your content - GOV.UK content and publishing guidance](https://guidance.publishing.service.gov.uk/writing-to-gov-uk-standards/writing-guidelines/clear-structure/)

[10] [Thinking Above the Code (slides)](https://www.microsoft.com/en-us/research/wp-content/uploads/2016/07/leslie_lamport.pdf)

[11] [Jeff Bezos Email Against PowerPoint Presentations (reproduces 2004 STeam email)](https://www.businessinsider.com/jeff-bezos-email-against-powerpoint-presentations-2015-7)

[16] [2017 Letter to Shareholders](https://www.aboutamazon.com/news/company-news/2017-letter-to-shareholders)

[17] [Self-editing | Technical Writing Two | Google for Developers](https://developers.google.com/tech-writing/two/editing)

[18] [Professional Editorial Standards 2024: A. The Fundamentals of Editing](https://editors.ca/publications/professional-editorial-standards/fundamentals-editing/)

[19] [Professional Editorial Standards 2024: B. Standards for Structural Editing](https://editors.ca/publications/professional-editorial-standards/structural-editing/)

[20] [Readability formulas have even more limitations than Klare discusses](https://redish.net/wp-content/uploads/Redish_on_Readability_Formulas.pdf)

[26] [Why bullets won't make your case](https://www.writing-skills.com/bullets-wont-make-case)

[29] [Inverted Pyramid: Writing for Comprehension](https://www.nngroup.com/articles/inverted-pyramid/)

[30] [Why Academics Stink at Writing (Chronicle of Higher Education, 2014)](https://grad.ncsu.edu/wp-content/uploads/2016/06/Why-Academics-Stink-at-Writing-1-2.pdf)

[32] [How bulleted lists and enumerations in formatted paragraphs affect recall and evaluation of functional text (Information Design Journal 21:2)](https://benjamins.com/catalog/idj.21.2.06jan)

[33] [Design Docs at Google](https://www.industrialempathy.com/posts/design-docs-at-google/)

[34] [How to write a good design document](https://grantslatton.com/how-to-design-document)

[35] [How to Write an Effective Design Doc (Refactoring English excerpt)](https://refactoringenglish.com/excerpts/write-an-effective-design-doc/)

[36] [Better design docs](https://blog.mbrt.dev/posts/better-design-docs/)

[39] [rust-lang/rfcs README (RFC process)](https://github.com/rust-lang/rfcs/blob/master/README.md)

[42] [Writing Practices and Culture (How HashiCorp Works)](https://www.hashicorp.com/en/how-hashicorp-works/articles/writing-practices-and-culture)

[43] [HashiCorp's RFC Template](https://www.hashicorp.com/en/how-hashicorp-works/articles/rfc-template)

[44] [PRD Template (HashiCorp Problem Requirements Document)](https://www.hashicorp.com/en/how-hashicorp-works/articles/prd-template)

[45] [Documenting Architecture Decisions](https://cognitect.com/blog/2011/11/15/documenting-architecture-decisions)

[46] [The Markdown ADR (MADR) Template Explained and Distilled](https://ozimmer.ch/practices/2022/11/22/MADRTemplatePrimer.html)

[47] [Postmortem Culture: Learning from Failure (Site Reliability Engineering, ch. 15)](https://sre.google/sre-book/postmortem-culture/)

[48] [Postmortem Culture: Learning from Failure (The Site Reliability Workbook, ch. 10)](https://sre.google/workbook/postmortem-culture/)

[49] [An insider look at Amazon's culture and processes (excerpt from Working Backwards)](https://www.aboutamazon.com/news/workplace/an-insider-look-at-amazons-culture-and-processes)

[52] [Start here - Diátaxis in five minutes](https://diataxis.fr/start-here/)

[54] [Revisiting the Product Spec](https://www.svpg.com/revisiting-the-product-spec/)

[56] [Design docs considered harmful](https://www.lucasfcosta.com/blog/design-docs)

[57] [Goals and Failure Modes for RFCs and Technical Design Documents](https://betterprogramming.pub/goals-and-failure-modes-for-rfcs-and-technical-design-documents-c4ee1d1da6ff)

[59] [The Power of "Yes, if": Iterating on our RFC Process](https://engineering.squarespace.com/blog/2019/the-power-of-yes-if)

[61] [Option and Decision Memos: Basic Components / Checklist for Writing Action Memoranda](https://shorensteincenter.org/wp-content/uploads/2013/07/MEMO-WRITING-HO-ALL-Danziger.pdf)

[62] [Don't Do Dead Documents (Getting Real)](https://basecamp.com/gettingreal/11.2-dont-do-dead-documents)

[63] [How to Get Meaningful Feedback on Your Design Document](https://refactoringenglish.com/blog/useful-feedback-on-design-docs/)

[64] [Paraphrase testing (Plain language guide series)](https://digital.gov/guides/plain-language/test/paraphrase-testing)

[65] [Test for understanding (Plain language guide series)](https://digital.gov/guides/plain-language/test)

[66] [Usability testing (Plain language guide series)](https://digital.gov/guides/plain-language/test/usability-testing)

[68] [How to Test the Usability of Documents](https://www.uxmatters.com/mt/archives/2020/05/how-to-test-the-usability-of-documents.php)

[70] [Cloze Test for Reading Comprehension](https://www.nngroup.com/articles/cloze-test-reading-comprehension/)

[72] [Performing a Project Premortem](https://hbr.org/2007/09/performing-a-project-premortem)

[73] [Evaluating the Effectiveness of the PreMortem Technique on Plan Confidence](https://idl.iscram.org/files/veinott/2010/1049_Veinott_etal2010.pdf)

[75] [Who Should Design for Novice Users? A Study of Experts’ Limitations in Predicting Novices’ Experience (HPL-98-136; published as Hinds 1999, J. Exp. Psych: Applied)](http://shiftleft.com/mirrors/www.hpl.hp.com/techreports/98/HPL-98-136.pdf)

[78] [“Act Like a 5th Grader” is Not Enough: Bounding Knowledge in LLM-Based User Simulators](https://arxiv.org/html/2608.30033)

[79] [Can LLMs Reliably Simulate Real Students’ Abilities in Mathematics and Reading Comprehension?](https://arxiv.org/abs/2507.08232)

[80] [What Would GPT Click: Practical Effects of Human-AI Behavioral Misalignment and the Cost of Synthetic Participants in User Experience](https://arxiv.org/abs/2605.18302)

[81] [LLM Evaluators Recognize and Favor Their Own Generations](https://arxiv.org/abs/2404.13076)

[82] [Chain-of-Verification Reduces Hallucination in Large Language Models](https://arxiv.org/abs/2309.11495)

[83] [The Fact-Checking Process (KSJ Science Editing Handbook)](https://ksjhandbook.org/fact-checking-science-journalism-how-to-make-sure-your-stories-are-true/the-fact-checking-process/)

[84] [How to write code review comments (Google eng-practices)](https://google.github.io/eng-practices/review/reviewer/comments.html)

[85] [Conventional Comments](https://conventionalcomments.org/)

[87] [Vale documentation tests (GitLab Docs)](https://docs.gitlab.com/development/documentation/testing/vale/)

[89] [Best Practices for Code Review](https://smartbear.com/learn/code-review/best-practices-for-peer-code-review/)

[92] [Use the Teach-Back Method: Tool 5 (AHRQ Health Literacy Universal Precautions Toolkit)](https://www.ahrq.gov/health-literacy/improve/precautions/tool5.html)

[94] [Letting Go of the Words (2nd ed.), Chapter 2: Planning: Purposes, Personas, Conversations](https://redish.net/wp-content/uploads/Redish_2nd_ed_Chap_2.pdf)

[95] [Top 10 tips for Microsoft style and voice](https://learn.microsoft.com/en-us/style-guide/top-10-tips-style-voice)

[96] [Does Writing with Language Models Reduce Content Diversity?](https://arxiv.org/abs/2309.05196)

[97] [Co-Writing with Opinionated Language Models Affects Users' Views](https://arxiv.org/abs/2302.00560)

[100] [The AI Ghostwriter Effect: When Users Do Not Perceive Ownership of AI-Generated Text But Self-Declare as Authors](https://arxiv.org/abs/2303.03283)

[101] [Your Brain on ChatGPT: Accumulation of Cognitive Debt when Using an AI Assistant for Essay Writing Task](https://arxiv.org/abs/2506.08872)

[102] [Comment on: Your Brain on ChatGPT: Accumulation of Cognitive Debt When Using an AI Assistant for Essay Writing Tasks](https://arxiv.org/abs/2601.00856)

[103] [The Impact of Generative AI on Critical Thinking: Self-Reported Reductions in Cognitive Effort and Confidence Effects From a Survey of Knowledge Workers](https://advait.org/files/lee_2025_ai_critical_thinking_survey.pdf)

[104] [Towards Understanding Sycophancy in Language Models](https://arxiv.org/abs/2310.13548)

[105] [Interaction Context Often Increases Sycophancy in LLMs](https://arxiv.org/abs/2509.12517)

[108] [Experimental Evidence on the Productivity Effects of Generative Artificial Intelligence](https://economics.mit.edu/sites/default/files/inline-files/Noy_Zhang_1.pdf)

[109] [Navigating the Jagged Technological Frontier: Field Experimental Evidence of the Effects of AI on Knowledge Worker Productivity and Quality](https://mitsloan.mit.edu/sites/default/files/2023-10/SSRN-id4573321.pdf)

[111] [Does Generative AI Make Us Think Alike? A Systematic Review and Meta-Analysis of Homogenization Effects in Human-AI Co-Creation](https://pure.au.dk/portal/en/publications/does-generative-ai-make-us-think-alike-a-systematic-review-and-me/)

[112] [Diverse AI Personas Can Mitigate the Homogenization Effect in Human-AI Collaborative Ideation](https://arxiv.org/abs/2504.13868)

[113] [When AI only asks: how question-driven dialogue shapes prewriting in the classroom](https://www.frontiersin.org/journals/education/articles/10.3389/feduc.2026.1740044/full)

[115] [Writer-Defined AI Personas for On-Demand Feedback Generation](https://arxiv.org/abs/2309.10433)

[116] [Towards Full Authorship with AI: Supporting Revision with AI-Generated Views](https://arxiv.org/abs/2403.01055)

[117] [Social Dynamics of AI Support in Creative Writing](https://www.katygero.com/papers/2023_SocialDynamics.pdf)

[119] [AI-Mediated Feedback Improves Student Revisions: A Randomized Trial with FeedbackWriter in a Large Undergraduate Course](https://arxiv.org/abs/2602.16820)

[120] [Verbosity Bias in Preference Labeling by Large Language Models](https://arxiv.org/abs/2310.10076)

[121] [I, Cyborg: Using Co-Intelligence](https://www.oneusefulthing.org/p/i-cyborg-using-co-intelligence)

[122] [Prompting best practices - Claude Platform Docs](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices)

[123] [Prompting Claude Opus 5 - Claude Platform Docs](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-opus-5)

[124] [Prompting Claude Fable 5.1 - Claude Platform Docs](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-fable-5-1)

[125] [Skill authoring best practices - Claude Platform Docs](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices)

[126] [Agent Skills overview - Claude Platform Docs](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview)

[127] [Create custom subagents - Claude Code Docs](https://code.claude.com/docs/en/sub-agents)

[128] [Best practices for Claude Code - Claude Code Docs](https://code.claude.com/docs/en/best-practices)

[129] [Building effective agents](https://www.anthropic.com/engineering/building-effective-agents)

[130] [Effective context engineering for AI agents](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents)

[133] [Demystifying evals for AI agents](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents)

[134] [GPT-5 prompting guide](https://developers.openai.com/cookbook/examples/gpt-5/gpt-5_prompting_guide)

[137] [Judging LLM-as-a-Judge with MT-Bench and Chatbot Arena](https://arxiv.org/html/2306.05685v4)

[138] [Large Language Models Cannot Self-Correct Reasoning Yet](https://arxiv.org/html/2310.01798v2)

[139] [Self-Refine: Iterative Refinement with Self-Feedback](https://arxiv.org/html/2303.17651v2)

[140] [Pride and Prejudice: LLM Amplifies Self-Bias in Self-Refinement](https://arxiv.org/html/2402.11436)

[141] [CheckEval: A reliable LLM-as-a-Judge framework for evaluating text generation using checklists](https://arxiv.org/html/2403.18771)

[144] [No Free Labels: Limitations of LLM-as-a-Judge Without Human Grounding](https://arxiv.org/html/2503.05061v4)

[145] [LLM Judges Can Be Too Generous When There Is No Reference Answer](https://arxiv.org/html/2607.12885)

[150] [brainstorming (SKILL.md, obra/superpowers)](https://github.com/obra/superpowers/blob/main/skills/brainstorming/SKILL.md)

[151] [documentation-writer (Diátaxis Documentation Expert), github/awesome-copilot](https://github.com/github/awesome-copilot/blob/main/skills/documentation-writer/SKILL.md)

[152] [agent-style: The Elements of Agent Style (21 writing rules for AI agents)](https://github.com/yzhao062/agent-style)

[153] [Supercharge Your Tech Writing with Claude Code Subagents and Agent Skills](https://medium.com/google-cloud/supercharge-tech-writing-with-claude-code-subagents-and-agent-skills-44eb43e5a9b7)

[155] [Vale — instructions for coding agents](https://vale.sh/AGENTS.md)

[157] [Documentation Style Guide | GitLab Docs](https://docs.gitlab.com/development/documentation/styleguide/)

[158] [Highlights | Google developer documentation style guide](https://developers.google.com/style/highlights)

[159] [Write accessible documentation | Google developer documentation style guide](https://developers.google.com/style/accessibility)

[161] [Bias-free communication - Microsoft Style Guide](https://learn.microsoft.com/en-us/style-guide/bias-free-communication)

[162] [alex — Catch insensitive, inconsiderate writing](https://github.com/get-alex/alex)

[166] [Use Coaching with Copilot suggestions on how to improve your content in Word](https://techcommunity.microsoft.com/blog/microsoft365copilotblog/use-coaching-with-copilot-suggestions-on-how-to-improve-your-content-in-word/4264558)

[168] [Write & edit with Gemini in Docs - Google Docs Editors Help](https://support.google.com/docs/answer/13951448)

[170] [Wikipedia:Signs of AI writing](https://en.wikipedia.org/wiki/Wikipedia:Signs_of_AI_writing)

[173] [GPT detectors are biased against non-native English writers](https://arxiv.org/abs/2304.02819)

[174] [New AI classifier for indicating AI-written text](https://openai.com/index/new-ai-classifier-for-indicating-ai-written-text/)

[177] [Anti-slopping: An innovation for rectifying LLM writing clichés](https://research.thoughtworks.com/library/anti-slopping-an-innovation-for-rectifying-llm-writing-cliches)

[178] [The vocabulary tells (and why the blacklist isn't the fix)](https://captainrandom.co.uk/learning/ai-prose-voice/the-vocabulary-tells/)

[179] [ANTI-SLOP REFERENCE (NousResearch/autonovel)](https://github.com/NousResearch/autonovel/blob/master/ANTI-SLOP.md)

[180] [Using large language models (LLMs) in technical writing](https://developers.google.com/tech-writing/two/llms)

[184] [anthropics/skills commit history for skills/doc-coauthoring/SKILL.md](https://github.com/anthropics/skills/commits/main/skills/doc-coauthoring/SKILL.md)

## Proposed improvements to doc-coauthoring SKILL.md

The items are ordered by expected impact on document quality, weighted by strength of evidence. Each item names the SKILL.md section it touches, the change, and the evidence. Suggested text is a starting point; it is not tuned wording.

### P1. Stage 3 Reader Testing: replace the instrument (rewrite)

**Touches:** Stage 3 "Testing Approach", Steps 1-4 and the Exit Condition, both the sub-agent and the manual branch.

**Change:** Rewrite Stage 3 as follows.

- **Step 0, answer key.** Before testing, the main agent writes from the brief: the one-sentence point; the 1-3 decisions or actions the doc should produce; 3-6 reader scenarios with expected answers; and 2-3 likely misreadings. The user confirms the key. This replaces "Predict Reader Questions" [75][144][145].
- **Step 1, cold paraphrase.** "Read this as [role]. In your own words: what is this doc asking of you, what was decided, what would you do next? Then give one sentence per section." Grade against the key [64][92].
- **Step 2, scenario tasks.** For each scenario, the reader returns the answer, the quoted passage it relied on, "Not stated in the document" when applicable, and "anything you had to supply from your own knowledge". A wrong answer, a "not stated", or a correct answer that rests on supplied knowledge each counts as a gap [66][133][78].
- **Remove the open checks.** Drop "What might be ambiguous or unclear?" and similar self-report probes as the primary checks [64]. If an open question is kept, use "What might confuse other readers on the team?" [64].
- **Exit condition.** Replace "Reader Claude consistently answers correctly" with: the paraphrase matches the key, all scenarios pass, and no blocking items remain; or two retest rounds are done and the residual issues have been reported. State that this is a floor, not proof that humans will understand [65][78][80].

**Suggested text for the core instruction:**

> For each scenario, spawn a fresh subagent (not a fork). Give it only the document text and the scenario. Ask it to answer using only the document, quote the sentence(s) it relied on, say "Not stated in the document" if nothing supports an answer, and list anything it had to assume. Compare with the expected answer. A mismatch, a "Not stated", or a correct answer that rests on an assumption each marks a gap to fix in the document.

### P2. Stage 3: specify isolation and neutral framing (rewrite)

**Touches:** Stage 3 "Test with Sub-Agent" and "Run Additional Checks".

**Change:** Require a non-fork subagent. Pass the document verbatim (or its path) plus the reader role. Never say the user wrote, likes or is invested in the doc, and never pass the brief or Claude's intent [127][128][104][105]. Use new subagents for each retest round [65]. In the manual (claude.ai) branch, tell the user to paste only the doc and the paraphrase and scenario prompts, and warn that a fresh chat is still more capable than a human reader [78].

### P3. End of Stage 1: add a written brief and a doc-type/size triage (add)

**Touches:** Stage 1 "Initial Questions", "Exit condition" and "Transition"; the Initial Offer.

**Change:**

- Replace "Who's the primary audience?" with: "Who reads this, what do they already know, what are they trying to do, and what should they know or be able to do after reading? (Finish: 'I'm writing this so that ___ can ___.')" [2][94].
- Before Stage 2, write back a 5-8 line brief: purpose; a provisional one-sentence main point or recommendation; audience; doc type; scope and non-scope; known constraints. Mark each item *stated* or *assumed* [2][150][151].
- Add triage: "What is the penalty for being wrong? Would implementing take less time than writing?" If stakes are low, offer a one-page mini-doc (problem, decision, alternatives, risks, open questions) [35][42][56].

**Suggested text:** "Before structuring, write back the brief and mark what the user said versus what you assumed. Ask for corrections. If the decision is cheap to reverse, propose a one-page version."

### P4. Stage 2 structure: replace "suggest 3-5 sections" with a doc-type map (rewrite, plus a reference file)

**Touches:** Stage 2 "Section ordering", "If user doesn't know what sections they need".

**Change:**

- Add `references/doc-types.md`, based on the table in [the doc-types dossier](dossiers/d2-doc-types-and-templates.md). It covers design doc/RFC, PRD, ADR, postmortem, decision memo, PR/FAQ and Diátaxis user docs, each with core sections and type-specific checks [33][44][45][47][49][52].
- Offer 2-3 candidate outlines, the recommended one first with its trade-off stated, and get approval [150][151].
- Seed every scaffold with a status header (author, date, state, the kind of feedback wanted) [36][59].
- Let the user drop sections that would be ceremony [57].
- Keep "write the summary last", but say explicitly that the summary goes first in the document and must answer the reader's essential questions on its own [44][2].
- For decision docs, state the problem before the recommendation [7].

### P5. Stage 2 per-section loop: author-first content and decisions (rewrite)

**Touches:** Stage 2 Step 1 (Clarifying Questions), Step 2 (Brainstorming), Step 3 (Curation), Step 4 (Gap Check).

**Change:**

- Ask concrete questions (facts, incidents, numbers, examples) before abstract "why" questions [113].
- Before brainstorming, ask the user what they already think belongs in the section. Lead with their items, then add Claude's options marked as new, deliberately varied in stance [96][117][111][112].
- For the core proposal or decision section, require the user's position and rationale in 1-3 sentences of their own words before drafting [97][100].
- Turn the gap check into section-purpose checks:
  - non-goals are plausible goals [33];
  - "do nothing" is among the alternatives [36];
  - alternatives are real and at the same level of abstraction [46];
  - drawbacks are honest [39];
  - each open issue has options and a next step [35];
  - the background passes the "random engineer" test [43].
- Reduce the default brainstorm from "5-20" to "enough to cover distinct angles (typically 5-10)", stated as a default with its purpose [125].

### P6. Stage 2 drafting: grounding, a prose/list rule and length calibration (add)

**Touches:** Stage 2 Step 5 (Drafting) and "Artifact Management".

**Change:**

- Draft only from facts in the conversation and supplied material. After each section, list the specifics Claude introduced (numbers, names, system behaviors, dates) for the user to confirm or cut. When drafting needs a missing reason or decision, ask instead of filling it in [180][109][4].
- Add a positive formatting rule: "Write reasoning, trade-offs and rationale as connected prose that says how ideas relate. Use bullets only for parallel items, numbered lists for sequences, tables for comparisons. Don't carry the numbered brainstorm list into the doc as bullets." [11][26][32][180][124]
- Add length calibration: a target length per doc type, with depth moved to appendices [123][180].
- Mark verbatim reuse of pasted sources as quotes [124].

### P7. Replace "Near Completion" and the final self-review with ordered passes plus a self-review checklist (rewrite)

**Touches:** Stage 2 "Quality Checking", "Near Completion", "When all sections are drafted".

**Change:** Merge the two author-side re-reads into labeled passes, and call them polish, not validation [138][140].

1. **Structural pass:** order, gaps, duplication, alignment with brief and scope, the right form for each section [18][19].
2. **Stylistic pass:** cut toward 30% shorter, cutting "how" before "why"; define terms on first use; remove metadiscourse and unneeded signposting [34][36][30].
3. **Self-review checklist (yes/no):** placeholders left from the scaffold, contradictions, sentences readable two ways, undefined terms or acronyms, unsupported claims, promises about future features [150][141][157].
4. **Regression check:** confirm the fixes introduced no new problems [18].

Each finding must quote the sentence and name the problem; generic verdicts don't count [139]. Optionally run pass 1 in a fresh subagent as the "set it aside" substitute [17][128].

### P8. Replace the one-line "slop" check with a cause-level pass (rewrite, plus a reference file)

**Touches:** Stage 2 "Near Completion" bullet "Anything that feels like 'slop' or generic filler".

**Change:** Add `references/ai-prose-patterns.md`, loaded at review time only [125]. Check by mechanism and density, not by word lists:

- **Swap test:** would the paragraph still work if the topic changed? If so, add the specific fact [179][170].
- **False depth:** restating the problem, listing obvious points, ending on "it depends" [179].
- **Symmetry padding:** reflexive threes, equal-length sections [179][170].
- **Inflated significance** in place of plain statements [170].
- **Bullets standing in for reasoning** [26].

Flag patterns that recur, not single uses [178]. Do not ship a banned-word list [178][177]. Never run AI detectors, and never tell the user a doc "sounds AI-written"; name the mechanism and its fix [173][174]. The user's house style overrides generic tell lists [95][178].

### P9. Stage 3: add omission, claim-ledger and type-specific passes, with severity triage (add)

**Touches:** Stage 3 "Run Additional Checks" and "Report and Fix".

**Change:**

- Add a pre-mortem/omission subagent: "Six months on, this doc was approved and followed, and the outcome was bad. List every reason traceable to what the doc said, omitted or left ambiguous." [72][73][89]
- Add a claim ledger: extract every factual claim, number, name, date and commitment, and mark each as traceable to user-supplied context, an assumption, or unsupported. Unsupported claims go back to the user [83][82]. Where claims concern code or systems, have the subagent check the source of truth [153].
- Add type-specific prompts from the doc-type map:
  - postmortem: the SRE review criteria [47];
  - PRD: testable acceptance criteria [44];
  - ADR: the future-developer test [45].
- Triage all findings as blocking, should-fix or nit, each with a location and a reason, presented apart from the text. Fix blocking items first [84][85][153][166].
- Fix misreadings in the document, not in chat. Move anything still disputed after 2-3 exchanges to an Open Issues section [63].
- Scale to stakes. For short, low-stakes docs, run only the paraphrase and 2-3 scenarios [123][129].

### P10. Final Review: human reader handoff, stakeholder plan and verification focus (rewrite)

**Touches:** "Final Review".

**Change:**

- Replace the generic "double-check facts" with: "Verify the claims and sections Claude originated" (point to the claim ledger and the list of introduced specifics) [103][109].
- For docs that drive decisions, generate a 5-minute human test kit: a paraphrase prompt, the 2-3 key scenarios, and "What might confuse others on your team?". Recommend one reader from outside the authoring team [64][66][70].
- Suggest a review plan in the doc: who approves and who is informed, what kind of feedback is wanted, and a fresh-mind re-read after time away [59][36][16].
- Optionally run Vale, alex or a project linter if one is configured, with JSON output, fixing prose rather than silencing rules, and treating subjective rules as advisory [155][87].

### P11. Stage 1: ask for house style, glossary and exemplars; keep a term sheet (add)

**Touches:** Stage 1 "Initial Questions" item 4 ("template or specific format").

**Change:** Extend it to: "Is there a style guide, glossary or term list, or an existing doc whose tone we should match?" Mine any provided files for tone and terminology [151][168]. Keep a running term sheet of accepted and rejected terms and defined acronyms, and check each section against it. Consistency matters more when readers use AI tools and machine translation [157][155].

### P12. Broaden the accessibility step beyond alt text (rewrite)

**Touches:** Stage 1 "If user mentions editing an existing shared document" (the alt-text bullet).

**Change:** Keep the alt-text check, and add four more:

- no information that appears only in images;
- link text that makes sense out of context;
- phrasing suited to a global audience;
- bias-free language [159][158][161][162].

### P13. Initial Offer: add a critique-only mode and a rubber-stamp interrupt (add)

**Touches:** "Initial offer" and "Tips for Effective Guidance".

**Change:**

- Offer three modes: full co-authoring; critique-only (Claude asks questions and gives located feedback but drafts nothing); and freeform [116][119][121].
- In the Tips, add: if the user accepts several sections in a row without edits, prompt one active choice, such as "Which of these points would you defend in review? What would you cut?" [103].

### P14. Make the skill host-neutral, leaner and current (rewrite / remove)

**Touches:** the whole file, especially "If access to artifacts is available", Step 5, Step 6 and "Artifact Management".

**Change:**

- Replace `create_file` and `str_replace` with operation descriptions ("create the doc file once; edit sections in place; never reprint the whole doc"). These are claude.ai tool names, and the file is inconsistent about them [125][126].
- Cut the scripted "Announce…/Inform them…" lines and keep only those that change user behavior [125].
- State counts as defaults with their purpose [125].
- Replace emphatic phrasing with plain instructions plus reasons [122].
- Restate the shorthand-reply conventions at each section start, because adherence decays over long sessions [134][130].
- Move templates, checklists and the AI-prose reference into `references/` so SKILL.md stays lean [125].
- Tighten the description's duplicated trigger lists, keeping both what the skill does and when to use it [126].

### P15. Ship evals with the skill (add)

**Touches:** repo structure, outside SKILL.md.

**Change:** Before rewriting, write 3-5 eval scenarios: realistic doc requests with planted gaps, such as a missing non-goal, an undefined acronym, a decision that rests on an unstated assumption, and a low-stakes request that should get a mini-doc. Test baseline and revised skills with a fresh Claude, as Anthropic's skill guidance prescribes [125].

### What the evidence says to remove or treat as outdated in the current SKILL.md

| Current element | Problem | Evidence | Action |
|---|---|---|---|
| Stage 3 "Predict Reader Questions" by the author-side model | Experts systematically under-predict novice difficulty, and listing likely problems does not debias them | [75] | Replace with the author-confirmed answer key and scenarios (P1) |
| "What in this doc might be ambiguous or unclear?" and similar self-report probes | Readers say text is clear and then misread it; yes/no and self-report probes give little usable information | [64] | Replace with paraphrase and scenario tasks (P1) |
| Exit condition "Reader Claude consistently answers questions correctly" | Capable LLM readers are over-competent and miscalibrated proxies; judges without a reference over-credit | [78][80][145] | Redefine as a floor plus a human handoff (P1, P10) |
| `create_file` / `str_replace` tool names and artifact-specific branches | Host-specific claude.ai tool names, inconsistent within the file | [125] | Describe operations instead (P14) |
| "Brainstorm 5-20 things" before asking the author's view | Model-first options drive convergence and anchoring | [96][117] | Author-first, then marked additions (P5) |
| Single "slop or generic filler" bullet | Vague; word-level fixes displace tells; detectors unreliable | [170][178][173] | Cause-level pass in a reference file (P8) |
| Two author-side re-reads ("Near Completion", "When all sections are drafted") presented as quality checks | Self-refinement improves fluency, not substance, and amplifies self-bias | [140][138] | Merge into labeled polish passes (P7) |
| "Double-check any facts" in Final Review | Generic; verification is now the human's main job and needs a target list | [103][83] | Claim ledger plus introduced-specifics list (P9, P10) |
| Many scripted "Announce/Inform" lines | Token cost for behavior Claude already has | [125][130] | Cut (P14) |
| "Consider linking this conversation in an appendix" | Not supported by any source found; may expose drafting context to readers | none found | Make optional or drop (judgment call) |

Kept as-is because the evidence supports them:

- the three-stage shape;
- shorthand numbered replies;
- surgical edits rather than reprinting the doc;
- learning from the user's edits;
- "you own this document";
- appendices for depth;
- the core idea of testing with a context-free reader [128][63][121].
