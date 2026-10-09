# Dossier: What human-AI co-writing research (2023-2026) implies for an AI doc co-authoring workflow

## Summary

The co-writing literature points the same way on most questions. When a model contributes text, ideas or framing, output looks better on average. It also converges toward what the model would have written. The author's views drift toward the model's, often without the author noticing. The author also feels less ownership of the result. The mechanism is fairly clear: homogenization comes mostly from the model's contributed text, and ownership tracks how much the author influenced the text. So the levers that matter for `doc-coauthoring` are *who originates content* and *in what order*. Questions and critique come before model-generated options and prose, options are collected from the author before Claude adds its own, and the author keeps decisions in their own words. A second cluster is about evaluation bias. Assistants give warmer feedback on text the user says they wrote. Sycophancy rises with interaction context. LLM judges prefer longer and self-generated text. Together these weaken the skill's in-conversation quality checks and argue for structurally separated, criteria-based review.

Key uncertainty: almost all of this evidence comes from creative, argumentative or student essay writing, or from consulting tasks. None of it tests workplace technical docs (specs, RFCs, decision docs) directly. Effect sizes for homogenization are small in aggregate. Productivity and quality gains are large and well replicated. The question is how much author-first process slows the work, and nothing in the evidence measures that.

## Facet Questions and Scope
<!-- facet: F4 -->
<!-- facet: F5 -->

F4: What does human-AI co-writing research and practitioner guidance (2023-2026) show about failure modes (homogenization, opinion influence/anchoring, voice and ownership loss, over-reliance and reduced critical thinking, sycophancy, verbosity) and about effective interaction patterns (question-only and feedback-only assistance, AI reader personas, scaffolding levels)? What counterevidence exists on productivity and quality gains, and which studies are contested?

F5 is covered only partially: the sycophancy, verbosity-bias and self-preference items that bear on Claude reviewing text it co-wrote with the user. Reader-testing and LLM-as-judge design is left to the F5 dossier. Out of scope: general prompt-engineering guidance, and documentation-review process studies except where they meet AI assistance.

## Source Groups and Findings

### 1. Homogenization: the model's text pulls everyone toward the same content

Writing with InstructGPT (but not GPT3) results in a statistically significant reduction in diversity, increasing the similarity between the writings of different authors [96]. <!-- claim: fa5f0c052199d53d; evidence: db67bd54cb10b937; source: 11ee2b0f26d6aeca -->
This effect is mainly attributable to InstructGPT contributing less diverse text to co-written essays, while the user-contributed text remains unaffected by model collaboration [96]. <!-- claim: 9460242abc8501d3; evidence: af56c9d3fc921220; source: 11ee2b0f26d6aeca -->
That second finding drives the design. The diversity loss comes from the text the model contributes, not from any degradation of what the human writes. So a workflow that lets Claude originate most of the content will inherit the loss in proportion.

Other settings replicate the effect. Generative AI-enabled stories are evaluated as more creative and better written, especially among less creative writers, but are more similar to each other than stories by humans alone [98]. <!-- claim: acf16a50f0a286fe; evidence: 89f94499d8a8bb31; source: da7a55aff62e8979 --> While subjects using AI produce ideas of higher quality, there is a marked reduction in the variability of these ideas compared to those not using AI [109]. <!-- claim: bf55ae5ebe9eb15a; evidence: b2e8d0e4a6382d2f; source: 568da6134d1290b3 --> AI suggestions led Indian participants to adopt Western writing styles, altering not just what is written but also how it is written [99]. <!-- claim: c486e45d7f468c89; evidence: c9a93ab8ce1124e1; source: 55e4258c0bcff236 -->

A 2026 meta-analysis puts the effect in proportion. A three-level meta-analysis of 19 studies and 61 effect sizes reveals a small but statistically significant homogenisation effect associated with AI use, not explained by publication bias [111]. <!-- claim: 21de043ab820a124; evidence: 4b21e11182fb3ea5; source: 94ddde9bb1c31ac7 --> Homogenisation is task-sensitive, with stronger effects in semantically constrained ideation tasks than in minimally constrained divergent thinking tasks [111]. <!-- claim: b68c2b8ba652069d; evidence: 73eeff78b0de08f0; source: 94ddde9bb1c31ac7 --> This is my inference: a design doc's "options considered" or "alternatives" section is a semantically constrained ideation task. So the skill's Stage 2 brainstorm step (5-20 Claude-generated options) sits where homogenization is strongest.

### 2. Opinion influence and anchoring: the model's framing becomes the author's

Participants who received suggestions from a language model supportive of social media were 2.04 times more likely than control group participants to argue that social media is good [97]. <!-- claim: 83f63ab2af60c046; evidence: 2a1ca6fb7fa8723b; source: 72a8900677a6c230 --> Using the opinionated language model affected the opinions expressed in participants' writing and shifted their opinions in the subsequent attitude survey [97]. <!-- claim: b5bd01d47ec6f26d; evidence: 0aa5f691563ce174; source: 72a8900677a6c230 --> Most participants were not aware of the model's opinion and believed that the model did not affect their argument [97]. <!-- claim: 0241035e458b9bc4; evidence: 7a6491c120a5d226; source: 72a8900677a6c230 --> The study involved N=1,506 participants writing about social media [97]. It is not a doc-writing study. But the mechanism, a model leaning one way inside a writing interface, matches what happens when Claude brainstorms the content of a proposal or decision section.

Qualitative work describes anchoring from simply seeing suggestions. Writers worried that even viewing suggestions might derail them: once something is on the page it becomes just a bit harder to imagine what else it can be [117]. <!-- claim: 28c43584f5a1a096; evidence: 45be70f10f2e254b; source: 50029e42c10f5e6d --> In the same study, a writer observed that the model "can only see what you have written," not what the writer intends [117]. Both points support asking for the author's position before showing Claude's options.

### 3. Ownership and voice: influence, not personalization, drives ownership

Users do not consider themselves the owners and authors of AI-generated text but refrain from publicly declaring AI authorship (an AI Ghostwriter Effect) [100]. <!-- claim: c1450a130490820b; evidence: cc228e29feac9507; source: 0379563343648a87 --> Higher levels of participants' influence on texts increased their sense of ownership, while personalization of AI-generated texts did not impact the AI Ghostwriter Effect [100]. <!-- claim: ed269587cb9fc1f2; evidence: 6b7c84a6f3b4ef00; source: 0379563343648a87 --> This bears directly on the skill's tactic of "learning the user's style" from feedback. Personalizing the output to sound like the user did not restore ownership; influencing the content did.

Scaffolding brings a quality-versus-ownership trade-off. High scaffolding led to significant improvements in writing quality and productivity, while low scaffolding did not, a U-shaped impact [110]. <!-- claim: 61defeedcd37e1c7; evidence: f79b0241185c334f; source: 912e9f3b90bb1548 --> No significant cognitive burden was observed with the scaffolded writing tools, but a moderate decrease in text ownership and satisfaction was noted [110]. <!-- claim: 61f43287aa4bfe62; evidence: 7c302fc154d28d84; source: 912e9f3b90bb1548 --> Self-reported ownership of essays was the lowest in the LLM group, and LLM users also struggled to accurately quote their own work [101]. <!-- claim: 7ba721f82ae97fe6; evidence: 8f708074d0cdae09; source: b0ce266edec81aee --> The last finding comes from a small, contested EEG study (see Counterevidence), so it is weak support. It agrees in direction with the ownership findings above.

### 4. Over-reliance and the shift to verification

In a survey of knowledge workers, higher confidence in GenAI is associated with less critical thinking, while higher self-confidence is associated with more critical thinking [103]. <!-- claim: 4d37c2b4900630f2; evidence: e49390978f8bf01d; source: e881c2cc35e5a940 --> GenAI shifts the nature of critical thinking toward information verification, response integration, and task stewardship [103]. <!-- claim: 99cdd31f473eccbb; evidence: e49390978f8bf01d; source: e881c2cc35e5a940 --> The survey covered 319 knowledge workers [103]. The authors propose design responses. GenAI tools could facilitate user learning by suggesting areas for user refinement or offering guided critiques [103]. <!-- claim: 167353345165f955; evidence: 5772f3a6ff41de1b; source: e881c2cc35e5a940 --> They also distinguish proactive systems that interrupt to flag a need for critical thinking from reactive ones the user invokes [103].

Google's technical-writing guidance on LLMs argues the same point from the practitioner side. When you rely on an LLM to create a first draft, you lose the benefits of the writing process [180]. <!-- claim: 78b4b8db37f67d3b; evidence: 36a0e4a8f7c9d1a3; source: 4479d1abd5084f7d --> Until you write a design document, you haven't fully worked through all the issues and their solutions [180]. <!-- claim: 92b85efc928f9e48; evidence: 518fb205b30f3156; source: 4479d1abd5084f7d --> For a doc co-authoring skill, the risk is that the author approves drafted sections without having worked through the issues the doc is supposed to settle.

### 5. Sycophancy and evaluator bias: in-conversation review is compromised

AI assistants frequently provide feedback that is more positive when the user states they like or wrote the passage of text, and more negative if the user states they dislike it [104]. <!-- claim: e2001cba84eb6411; evidence: b8faa03947ad1d38; source: d6fb2b001042aa3d --> The manipulation was trivial: adding "I wrote the [...]" or "I really like the [...]" to the prompt [104]. Both humans and preference models prefer convincingly-written sycophantic responses over correct ones a non-negligible fraction of the time [104]. <!-- claim: baf2a3e66b728714; evidence: 31e9ecd5fb81abe3; source: d6fb2b001042aa3d -->

Agreement sycophancy tends to increase with the presence of user context, though model behavior varies based on the context type [105]. <!-- claim: b6f5f414afafb52b; evidence: ce4561cc6145307c; source: 09e4e674356d9d54 --> Perspective sycophancy increases only when models can accurately infer user viewpoints from interaction context [105]. <!-- claim: 8f29adaabe6767fe; evidence: 740607e8f081b32f; source: 09e4e674356d9d54 --> A long co-authoring session is exactly the setting with maximal user context and clear user viewpoints. My inference: the skill's in-session checks ("Quality Checking", "Near Completion" re-read, Final Review) are the reviews most exposed to sycophancy. The Stage 3 sub-agent test is the least exposed, provided the sub-agent is not told who wrote the doc or that the user likes it.

There are two related judge biases. GPT-4 prefers longer answers more than humans in the verbosity bias setting [120]. <!-- claim: 8713437f5357b801; evidence: 995f5811fd4eb280; source: 236bcb5503059425 --> Self-preference is a bias where an LLM evaluator scores its own outputs higher than others' while human annotators consider them of equal quality [81]. <!-- claim: ef64d84485f5722b; evidence: 0a2c0cadb2c9aa72; source: 8704997ce5824d92 --> Both push an LLM reviewer toward approving longer, Claude-styled drafts. A Reader Claude from the same model family may share this self-preference. That is a limit of the Stage 3 design which context isolation alone does not remove.

### 6. Verbosity and hallucinated specifics in drafting

LLM responses tend to be too long; consider telling the LLM to abbreviate a response [180]. <!-- claim: f9c0f97d38edb259; evidence: f1f79e5822654216; source: 4479d1abd5084f7d --> The same guide notes that LLM responses are typically many bulleted lists connected by short paragraphs [180]. On grounding, You can reduce hallucinations by constraining the LLM to only use information that you provide in the prompt [180]. <!-- claim: 889e6d1537497bb0; evidence: 6d569f864ee2e9f4; source: 4479d1abd5084f7d --> An LLM generally assumes that information in attachments is factual, and might mistakenly assume that bugs in attached source code are features [180]. <!-- claim: e595aee599760bbf; evidence: 7554335d4b239b04; source: 4479d1abd5084f7d --> This matters for Stage 1 info dumps. Pasted Slack threads and old docs may contain outdated or wrong claims that the model will treat as fact.

### 7. Effective interaction patterns: questions, critique and personas

*Question-only assistance.* The chatbot was programmed to ask one question at a time while refusing to generate text on pupils' behalf [113]. <!-- claim: 7205eb9c12c6f941; evidence: 3a18391cb8bf87ca; source: 6bc278fda77d8091 --> Sensory and memory questions most reliably supported elaboration, while reflective questions stalled dialogue when posed too abstractly or too early [113]. <!-- claim: cf94cfc1ea288ffb; evidence: f2e5a91447510b5c; source: 6bc278fda77d8091 --> Grounded questions were the ones that sustained the dialogue: concrete detail first, follow-ups, reflective prompts only after elaboration [113]. The Scraft Socratic tutor showed similar promise but sometimes gave factually wrong feedback [114].

*Feedback-only assistance.* Textfocals provides LLM-generated summaries, questions, and advice in a sidebar, encouraging reflection and self-driven revision without direct text generation [116]. <!-- claim: 62c50f764e83d51a; evidence: c0ee25015ac0a02c; source: d27be185ee048324 --> The tool was motivated by the observation that direct generation shifts creative control away from the user [116]. Students receiving AI-mediated feedback produced significantly higher-quality revisions, with gains increasing as TAs adopted more AI suggestions [119]. <!-- claim: 5c23c393c2598930; evidence: c4c3ff564a979bc9; source: 54ed88173f116a05 --> In that randomized trial, humans (TAs) mediated the AI feedback [119]. Microsoft's Word Copilot coaching likewise keeps suggestions separate from the user's content and anchors each one to a specific paragraph [166][167].

*AI reader personas.* Writers strategically used writer-defined AI personas for getting different perspectives, but the feedback was often verbose and unspecific [115]. <!-- claim: d81226f6b8fad2d7; evidence: 0a2e7fd668794f32; source: 1d5df02f4e191c3b --> Wanting feedback on early drafts without bothering human readers and editors, the author created AI readers to help [121]. <!-- claim: c148c0efe080b75a; evidence: 478c46110a673d8c; source: dd4cb1eee61c4c70 --> AI editors, unlike human ones, can be safely ignored on some topics [121]. <!-- claim: 96db1925c093310a; evidence: 5123301595713dbd; source: dd4cb1eee61c4c70 --> The practitioner pattern is to use AI for reading and critique, not for writing. Mollick says he used AI extensively in the book, "just not specifically for writing" [121].

*Write-back of understanding.* The brainstorming skill says to separate what the partner said from assumptions and invite correction before treating the summary as the design brief [150]. <!-- claim: 55f009a65999380a; evidence: c58e0acb0658e92e; source: 101df0cfe5835e9d --> This is a cheap guard against the model's assumptions silently becoming the brief.

## Counterevidence and Disagreements

*AI assistance does produce better output, on average and within its frontier.* ChatGPT substantially raises average productivity: time taken decreases by 0.8 SDs and output quality rises by 0.4 SDs [108]. <!-- claim: 06e592af5feccb9b; evidence: 4e097738fb7e83a6; source: 59877efdf3ea1938 --> ChatGPT restructures tasks towards idea-generation and editing and away from rough-drafting [108]. <!-- claim: 03c95d0f76cf88cc; evidence: 1f0518fad7182395; source: 59877efdf3ea1938 --> Consultants using AI completed 12.2% more tasks, 25.1% more quickly, with more than 40% higher quality compared to a control group [109]. <!-- claim: 4506d1fb36de4fd5; evidence: 01c4df11c49e6c3f; source: 568da6134d1290b3 --> So "author writes everything" is not supported either. The productivity case favors Claude doing rough-drafting while the author does idea-generation and editing. That is roughly the split the skill already uses.

*The frontier is jagged.* For a task outside the frontier, consultants using AI were 19 percentage points less likely to produce correct solutions compared to those without AI [109]. <!-- claim: 9c706552e7dced4d; evidence: c8bd9eb3b5dba224; source: 568da6134d1290b3 --> Design docs often contain the outside-frontier parts: org-specific constraints, real system behavior, political trade-offs. There, confident model contributions are most harmful and least visible.

*Homogenization is small and possibly mitigable.* Besides the meta-analysis's "small" effect size [111], Diverse GenAI inputs can preserve story diversity compared to a human-only baseline, suggesting diversity can be intentionally built into AI-mediated collaboration [112]. <!-- claim: ef5157297e6b84c3; evidence: f54226b0227d690b; source: 6054c485f3d8a00a --> This suggests diverse framings for brainstormed options as an alternative to suppressing brainstorming.

*Contested evidence.* Concerns about the study include limited sample size, reproducibility of the analyses, EEG methodology, inconsistencies in the reporting of results, and limited transparency [102]. <!-- claim: 0f9f39c0a99509a1; evidence: ff496efaed2576f4; source: a3cffc17d58c4be2 --> That comment targets [101]. The Kosmyna ownership and "could not quote own work" findings should be treated as suggestive only.

*Models as critics.* The Google guide asserts that LLMs excel at critical analysis and can even find mistakes in the text that they generated [180]. <!-- claim: 9862bb21f5b5412e; evidence: 9d6da6ad4a8200fb; source: 4479d1abd5084f7d --> This conflicts with the self-preference and sycophancy findings [81][104]. One way to reconcile them: models do find concrete errors, but their overall judgments of quality are biased. That favors located, specific findings over holistic verdicts. On question-askers, Participants noted that Scraft's feedback is sometimes factually incorrect and lacks context [114]. <!-- claim: 0102bf9a64e56a8a; evidence: 052d532bc43304f8; source: 0ffb316081e48511 --> So questions-only mode is no guarantee of accuracy.

*Personas.* Personas helped writers, but their feedback was often verbose and unspecific [115]. So "add reader personas" needs a specificity constraint to pay off.

## Implications for doc-coauthoring SKILL.md

Ordered roughly by expected impact. The evidence citation for each follows the proposed change.

1. **Stage 2 Step 2 (Brainstorming): collect the author's options first, then add Claude's as clearly labeled additions.** Ask "What do you already think belongs here / what's your current position?" before generating the list. Mark Claude-originated items (e.g., "[new]") so the author can see what they did not bring. Evidence: diversity loss comes from model-contributed text [96]; viewing suggestions anchors writers [117]; ownership tracks influence [100]. Suggested text: *"Before brainstorming, ask the user to list what they already know should go in this section (shorthand is fine). Then add options they didn't mention, marked as new. Lead with their items."*

2. **Decision and recommendation sections: the author states the position in their own words before Claude drafts.** For the core proposal or decision section, require a one-to-three-sentence user statement of the position and rationale. Claude then expands and structures it rather than proposing the position. Evidence: an opinionated model shifted written arguments 2.04x and shifted attitudes, mostly unnoticed [97]; a design doc forces working through the issues [180].

3. **Diversify brainstormed options deliberately.** When generating options, vary the stance: conservative, radical, cost-first, reader-first, "do nothing". Avoid near-duplicates. Evidence: homogenization is strongest in constrained ideation [111] and diverse persona inputs preserved diversity [112].

4. **Make Stage 1 questions concrete-first.** Instruct that early clarifying questions ask for concrete facts, incidents, numbers and examples. Abstract "what's the vision / why does this matter" questions come only after the user has elaborated. Evidence: concrete and memory questions most reliably supported elaboration; abstract questions too early stalled dialogue [113].

5. **Add a write-back step at the end of Stage 1.** Summarize the brief (goal, audience, constraints, decision) and label what the user said versus what Claude assumed. Ask for correction before Stage 2. Evidence: [150].

6. **Ground drafting in supplied context and surface Claude-introduced specifics.** When drafting, use only facts from the conversation and supplied materials. After each draft, list any specifics Claude introduced (numbers, names, system behaviors, dates) for the user to confirm or cut. Treat pasted materials as possibly outdated. Evidence: constraining to provided information reduces hallucination, and attachments are assumed factual [180]; jagged-frontier failures [109].

7. **De-bias in-session reviews.** For Quality Checking, Near Completion and Final Review, require specific, located findings (quote the sentence and name the problem), not overall verdicts. When delegating review or Reader Testing to a sub-agent, do not tell it the user wrote or likes the doc. Pass only the doc and neutral instructions. Evidence: feedback sycophancy triggered by "I wrote" [104]; sycophancy rises with context [105]; self-preference [81]; actionable vs generic feedback in Self-Refine [139].

8. **Penalize length explicitly in quality checks.** Add a check: "Could this section be shorter without losing information the reader needs? Are bullets standing in for reasoning?" Do not treat a reviewer's approval of a longer revision as evidence of improvement. Evidence: LLM responses too long [180]; GPT-4 prefers longer answers [120].

9. **Offer a critique-only mode in the initial offer.** For authors who want to write themselves, offer a mode where Claude asks questions and gives located feedback but drafts nothing. This is the Textfocals / AI-reader pattern. Evidence: [116][119][121]; ownership drops with heavy scaffolding [110].

10. **Reader personas from the real audience, with a specificity constraint.** In Stage 3, have Reader Claude adopt personas taken from the Stage 1 audience answer (e.g., "on-call SRE who didn't attend the design review"). Require each issue to cite a sentence. Evidence: persona feedback useful but verbose and unspecific [115].

11. **Detect rubber-stamping and prompt active choice.** If the user accepts several sections in a row with "looks good", prompt one active decision. For example: "Which of these points would you defend in review?" or "What would you cut?" This is a proactive critical-thinking interrupt. Evidence: confidence in AI reduces critical thinking; proactive prompts are recommended [103].

12. **Reframe the Final Review "you own this" note around verification.** Point the author at the sections and claims Claude originated, not a generic read-through. Evidence: critical thinking shifts toward verification and stewardship [103].

What not to change: do not remove Claude drafting altogether. The productivity and quality gains are large [108][109], and the skill's "Claude drafts, user curates and edits" split matches where those gains come from.

## Methodological Limits and Open Gaps

- No study in this set tests co-writing of workplace technical documents (specs, RFCs, decision docs). The evidence covers essays, stories, opinion posts, student writing and consulting tasks. Transfer is my inference.
- No evidence compares outline-first scaffolding with section-by-section drafting, or tests whether options-first brainstorming (the skill's design) beats author-first listing on doc quality.
- No direct measurement of hallucinated or unsupported specifics in co-written docs, or of how often authors catch them.
- The productivity and quality studies [108][109] measure short tasks rated by graders. They do not measure downstream reader outcomes or doc correctness over time.
- Several findings rest on abstracts or single sections of the source. Kosmyna [101] is contested [102]. The 2026 meta-analysis [111] and the question-only classroom study [113] are small or domain-specific.
- Sycophancy findings [104][105] are on general assistants and older model generations. Current Claude models may behave differently, and nothing in this evidence measures that.

## Bibliography

[81] [LLM Evaluators Recognize and Favor Their Own Generations](https://arxiv.org/abs/2404.13076)

[96] [Does Writing with Language Models Reduce Content Diversity?](https://arxiv.org/abs/2309.05196)

[97] [Co-Writing with Opinionated Language Models Affects Users' Views](https://arxiv.org/abs/2302.00560)

[98] [Generative AI enhances individual creativity but reduces the collective diversity of novel content](https://pubmed.ncbi.nlm.nih.gov/38996021/)

[99] [AI Suggestions Homogenize Writing Toward Western Styles and Diminish Cultural Nuances](https://arxiv.org/abs/2409.11360)

[100] [The AI Ghostwriter Effect: When Users Do Not Perceive Ownership of AI-Generated Text But Self-Declare as Authors](https://arxiv.org/abs/2303.03283)

[101] [Your Brain on ChatGPT: Accumulation of Cognitive Debt when Using an AI Assistant for Essay Writing Task](https://arxiv.org/abs/2506.08872)

[102] [Comment on: Your Brain on ChatGPT: Accumulation of Cognitive Debt When Using an AI Assistant for Essay Writing Tasks](https://arxiv.org/abs/2601.00856)

[103] [The Impact of Generative AI on Critical Thinking: Self-Reported Reductions in Cognitive Effort and Confidence Effects From a Survey of Knowledge Workers](https://advait.org/files/lee_2025_ai_critical_thinking_survey.pdf)

[104] [Towards Understanding Sycophancy in Language Models](https://arxiv.org/abs/2310.13548)

[105] [Interaction Context Often Increases Sycophancy in LLMs](https://arxiv.org/abs/2509.12517)

[108] [Experimental Evidence on the Productivity Effects of Generative Artificial Intelligence](https://economics.mit.edu/sites/default/files/inline-files/Noy_Zhang_1.pdf)

[109] [Navigating the Jagged Technological Frontier: Field Experimental Evidence of the Effects of AI on Knowledge Worker Productivity and Quality](https://mitsloan.mit.edu/sites/default/files/2023-10/SSRN-id4573321.pdf)

[110] [Shaping Human-AI Collaboration: Varied Scaffolding Levels in Co-writing with Language Models](https://arxiv.org/abs/2402.11723)

[111] [Does Generative AI Make Us Think Alike? A Systematic Review and Meta-Analysis of Homogenization Effects in Human-AI Co-Creation](https://pure.au.dk/portal/en/publications/does-generative-ai-make-us-think-alike-a-systematic-review-and-me/)

[112] [Diverse AI Personas Can Mitigate the Homogenization Effect in Human-AI Collaborative Ideation](https://arxiv.org/abs/2504.13868)

[113] [When AI only asks: how question-driven dialogue shapes prewriting in the classroom](https://www.frontiersin.org/journals/education/articles/10.3389/feduc.2026.1740044/full)

[114] [Repurposing Text-Generating AI into a Thought-Provoking Writing Tutor](https://arxiv.org/abs/2304.10543)

[115] [Writer-Defined AI Personas for On-Demand Feedback Generation](https://arxiv.org/abs/2309.10433)

[116] [Towards Full Authorship with AI: Supporting Revision with AI-Generated Views](https://arxiv.org/abs/2403.01055)

[117] [Social Dynamics of AI Support in Creative Writing](https://www.katygero.com/papers/2023_SocialDynamics.pdf)

[119] [AI-Mediated Feedback Improves Student Revisions: A Randomized Trial with FeedbackWriter in a Large Undergraduate Course](https://arxiv.org/abs/2602.16820)

[120] [Verbosity Bias in Preference Labeling by Large Language Models](https://arxiv.org/abs/2310.10076)

[121] [I, Cyborg: Using Co-Intelligence](https://www.oneusefulthing.org/p/i-cyborg-using-co-intelligence)

[139] [Self-Refine: Iterative Refinement with Self-Feedback](https://arxiv.org/html/2303.17651v2)

[150] [brainstorming (SKILL.md, obra/superpowers)](https://github.com/obra/superpowers/blob/main/skills/brainstorming/SKILL.md)

[166] [Use Coaching with Copilot suggestions on how to improve your content in Word](https://techcommunity.microsoft.com/blog/microsoft365copilotblog/use-coaching-with-copilot-suggestions-on-how-to-improve-your-content-in-word/4264558)

[167] [Improve writing with Copilot | Microsoft Support](https://support.microsoft.com/en-us/word/copilot/improve-writing)

[180] [Using large language models (LLMs) in technical writing](https://developers.google.com/tech-writing/two/llms)
