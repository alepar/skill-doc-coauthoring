# Dossier: Validating documents before shipping, and whether LLM "Reader Claude" is a valid proxy for human readers

## Summary

The current Stage 3 of `doc-coauthoring` has the right instinct (test with a reader who lacks the author's context) but the wrong instrument in two places. First, it relies on open "is anything ambiguous or unclear?" questions, which the document-usability literature shows are close to useless: readers say a text is clear and then act on it wrongly. The methods with evidence behind them are behavioral: paraphrase ("tell me in your own words"), scenario/task tests ("you need X; find it and tell me what you'd do"), plus-minus marking, and teach-back, run in test-revise-retest loops. Second, it treats a fresh Claude instance as a stand-in for the human reader and uses "Reader Claude answers correctly" as the exit condition. The evidence says LLM simulated readers are systematically *too competent*: they solve inferential and vocabulary problems that defeat real readers, persona prompts do not fix this, and they share self-preference and sycophancy biases with the author model. A fresh-context sub-agent is therefore a useful *floor* test (it catches missing information, contradictions, and context leaks) but not a ceiling: passing it does not show that humans will understand the doc.

The redesigned protocol proposed below keeps the sub-agent test but changes what it is asked to do (paraphrase and scenario tasks graded against an author-written answer key, rather than self-reported clarity), adds three cheap independent passes (omission/pre-mortem, claim ledger, severity-labelled review), drops any reliance on readability scores, and ends with a short human-reader handoff for docs whose stakes justify it. Key uncertainty: no source found directly measures agreement between an LLM cold read and human reader testing on real workplace documents, so the size of the "Reader Claude gap" for, e.g., design docs read by engineers is inferred from adjacent domains (students, UX clicks, LLM-as-judge).

## Facet Questions and Scope
<!-- facet: F3 -->
<!-- facet: F5 -->

F3: How should a co-authored document be validated before it ships? Covered: reader/usability testing of documents (paraphrase, scenario/task, plus-minus, cloze), teach-back, expert blind spots and the curse of knowledge, review stages and checklists, comment severity, pre-mortem, claim-by-claim fact checking, readability formulas and linting, and the cost structure of stakeholder review. F5 (partial): evidence on LLM-as-judge and LLM-as-simulated-reader validity, used here only insofar as it bears on Stage 3's "Reader Claude". Out of scope: drafting-stage practices (other dossiers), and red-team primary sources (not retrieved).

## Source Groups and Findings

### 1. Asking readers whether a document is clear does not work; asking them to restate or act does

The single most decision-relevant finding for Stage 3 is that self-reported clarity is not comprehension. In the VBA case study, when each reader was asked a general question about understanding the letter, they all said that it was clear, yet several would have done something other than what VBA wanted [64]. <!-- claim: ee00ebf4d000dfcd; evidence: d028e3cfa9f5f6b6; source: 0581cd2109f9c69d --> In another VBA letter test, users appeared to understand every word, yet most said they would call the toll-free number when asked what they would do [64]. The practitioner guidance follows directly. The paraphrase-testing guide warns that you won't get much usable information from questions that can be answered with yes or no [64]. <!-- claim: 0dea15bd4cf24203; evidence: 12408aa30f3207ce; source: 0581cd2109f9c69d --> Paraphrase testing asks the participant, at the end of each section, to tell you in their own words what that section means [64]. <!-- claim: 35c9bd1658bca83a; evidence: 0966fb188956a686; source: 0581cd2109f9c69d --> A related probe reframes the question away from the reader's own competence. Asking what other people might find confusing matters because people are more comfortable telling you that than admitting that they don't understand something themselves [64]. <!-- claim: 895b289c447898bc; evidence: 3345453c2790a107; source: 0581cd2109f9c69d -->

The NCI brochure case shows a second failure that comprehension questions on the body text would miss: framing. In the NCI case, people understood the brochure's information, but the title made them think it was only for African-Americans [66]. <!-- claim: a8e68d14d384ed4a; evidence: 414395382585610c; source: 7d424b078312f39b --> A reader test that only asks content questions would not have caught that the doc would be ignored by most of its intended audience.

Methods are matched to document type. The guide recommends paraphrase testing for short documents and usability testing for longer documents where finding the right information is important [65]. <!-- claim: 8154e69a054933ae; evidence: 70c5cc6b8860a8d2; source: 09abc8a8925483c2 --> In scenario-based usability testing you give the participant very short stories suggesting a need for specific information and watch as they find that information and tell you what they understand [66]. <!-- claim: 836e5ae12024e0c4; evidence: 7eed8ae4b921ae22; source: 7d424b078312f39b --> Plus-minus testing, devised by de Jong and Schellens, asks readers to mark positives and negatives [68]. <!-- claim: 4ac6f9b4b7d5d082; evidence: 738ed276039fe688; source: 620a5cf7125ff8ec --> Plus-minus is suited to long documents because it localizes problems; the de Jong and Schellens review of evaluation-method validity is available only as an abstract [77]. Teach-back, from health literacy, is the same idea as paraphrase testing, with stronger outcome evidence. Teach-back checks understanding by asking people to state in their own words what they need to know or do, and the toolkit stresses you are checking how well you explained something [92]. <!-- claim: 88fdc3b88f019ddf; evidence: 6d864ba221bf6292; source: 213e520ec82f6054 --> A systematic review found teach-back effective in 19 of the 20 studies [93]. <!-- claim: a8dd2ea1e66c435a; evidence: ef227ae796d49a06; source: 0f78cc05f00f9186 --> The review rated its 20 studies as moderate quality overall, so the effect is consistent but not precisely estimated [93].

Testing is iterative and should not use insiders. The guide says to test, make corrections based on feedback, and test again, and to plan to test at least twice [65]. <!-- claim: 7716732372ca63a9; evidence: 7cbc8da2a609f012; source: 09abc8a8925483c2 --> The usability guide advises: don't use members of your own team as test participants [66]. <!-- claim: 51f062f8882dbe1b; evidence: 80c51495317e4592; source: 7d424b078312f39b --> Comprehension is a combined property of the text and a specific user segment, so to measure comprehension you must test with real users from your target audience [70]. <!-- claim: 5a744ecbb20b66d7; evidence: 9cc6c0965af3b3ca; source: 6daa1c10977fa343 --> The cloze test gives a cheap quantitative check (60% or more correct implies reasonable comprehension for the target profile), but it too requires the target readers [70].

Inference for the skill: Stage 3's current "Additional Checks" ("What in this doc might be ambiguous or unclear?") is the yes/no-adjacent general question the VBA case warns against. The question-answer tests in Step 2 are closer to the right shape, but they ask the reader to self-report ambiguity alongside the answer, and they do not require a pre-committed correct answer to compare against.

### 2. Authors and experts cannot predict readers' problems, and omissions are the hardest defects

Hinds found that experts suffer from a cognitive bias that leads them to underestimate the difficulty that novices will encounter [75]. <!-- claim: b86cd4b09a37e7d3; evidence: 07d418dac9bf2d49; source: fcf541caeff29a4e --> The experts' underestimation bias was resistant to a common debiasing technique of listing the steps and listing problems novices could encounter [75]. <!-- claim: 9b790b4527602aca; evidence: b887e5ef4cbcb8c8; source: fcf541caeff29a4e --> The second finding matters directly: the skill's current Step 1 ("Predict reader questions") is a version of exactly the debiasing technique Hinds found ineffective when the predictor is the expert. In the co-authoring setting, the main Claude instance has absorbed the whole context dump and is the "expert". Paul Graham describes the same blind spot from the writer's side: a great deal of knowledge is unconscious, and experts have a higher proportion of it [5].

SmartBear notes that omissions are the hardest defects to find because it's difficult to review something that isn't there [89]. <!-- claim: b7361edb2897e6da; evidence: cb08b65a235bb738; source: 05830fb0fc3f439f --> This is the defect class a reader with only the text is best placed to expose, and the class that self-review and "is anything unclear?" prompts are worst at. Schriver's work gives a partial remedy: watching real reader protocols trains writers. Schriver reports that writers taught with protocol-aided revision improve in their ability to predict problems of omission and global problems from the readers' point of view [76]. <!-- claim: 157a101b9fae39c4; evidence: 22596a439ddc94d5; source: eca0f010e9d24371 -->

The practitioner literature converges on "fresh eyes" as the structural fix. The interview study identifies five stages of documentation review: self review, technical review, editorial review, play testing, and post-publication feedback [74]. <!-- claim: ca3741eef766a06f; evidence: d9c30723beec249b; source: 213be1d0ab9d7e67 --> A participant described play testing as checking for the curse of knowledge in a tutorial, such as a skipped prerequisite [74]. <!-- claim: d8dd864d0282571f; evidence: 74765fbbc2f44a4a; source: 213be1d0ab9d7e67 --> Technical review also serves as a safeguard against editorial improvements accidentally removing important technical details [74]. <!-- claim: c269ea77212ba4fd; evidence: 70536520fd8384a5; source: 213be1d0ab9d7e67 --> The last point is a warning for the fix loop: clarity edits made in response to reader tests can strip caveats, so a correctness re-check belongs after the fix, not only before. Amazon builds time into the process for the same reason. Great memos are shared with colleagues who are asked to improve the work, set aside for a couple of days, and then edited again with a fresh mind [16]. <!-- claim: 71b8d55c8f3aae16; evidence: 080daefe83c65e86; source: 55aae724f31dc193 -->

Reviewers also need to be told what to look for. Reviewers weren't sure what they should be looking for and were wary of asking stupid questions about issues the author had probably considered but hadn't written down [59]. <!-- claim: acd48e5b3630627f; evidence: c96e825c17eb831a; source: 10f720211b115b2f --> That is an argument for giving each review pass (human or sub-agent) a specific job, not a general "review this".

### 3. Pre-mortem and independent verification

The premortem operates on the assumption that the patient has died and asks what did go wrong, unlike a typical critiquing session [72]. <!-- claim: e4df40a067b30e8a; evidence: 86aed04ae937cedf; source: 081d06c5edfff29a --> In the premortem, those in the room independently write down every reason they can think of for the failure [72]. <!-- claim: 80f1b65edf89d7ae; evidence: 22e8a5d1faf5517a; source: 081d06c5edfff29a --> Prospective hindsight increases the ability to correctly identify reasons for future outcomes by 30% [72]. <!-- claim: 6f348f01ec716a38; evidence: 8c6bc80e687b9ef0; source: 081d06c5edfff29a --> One hundred and seventy-eight people evaluated a plan, and the Premortem method reliably reduced confidence more than each of the other conditions [73]. <!-- claim: 46c7b29194b9445f; evidence: 7358024c6358110c; source: cf69afedd3ca45a0 --> For a design doc, RFC or proposal, "the reader acted on this doc and it went badly; why?" is a sharper probe than "find problems", and the independence instruction maps cleanly onto isolated sub-agents.

For factual accuracy, the strongest practice is claim-by-claim checking against sources. In the KSJ process the fact-checker goes through the piece line-by-line, checking each fact against its source [83]. <!-- claim: 7df34105dd8a07ff; evidence: 04185887bd196910; source: 28f51d95fadc95ae --> The LLM analogue is Chain-of-Verification. Chain-of-Verification plans verification questions and answers them independently so the answers are not biased by other responses [82]. <!-- claim: 8f73c15fe902243e; evidence: 20668eb75af96e8c; source: b1f6a8047c37d10f --> The key design detail is independence: verification answers are generated without seeing the draft's answer, so the checker is not anchored on it. For a co-authored doc, the "source" is usually the user's context dump plus any linked materials, so the check is "is every factual claim traceable to something the user supplied or confirmed?"

### 4. Reviews: severity labels, focus, and cost

Without comment labels, authors may interpret all comments as mandatory, even if some are merely informational or optional [84]. <!-- claim: 3b5de177e6226fef; evidence: 86272ddff875a37a; source: a8d9e8779cfcac56 --> Conventional Comments treats nitpicks as trivial preference-based requests that should be non-blocking by nature [85]. <!-- claim: 683cf168c02ae61c; evidence: 55e2f9d87724c377; source: 07b68130855b7330 --> The analogue for the skill is that every issue Reader Claude or a review pass raises should be tagged (for example blocking / should-fix / nit), so the user is not presented with a flat list of 20 items and the fix loop terminates.

Review has real costs that scale with the number of reviewers. Ziftci and Greenberg found that more approvers positively correlate with longer time-to-approval [90]. <!-- claim: 4de94f84cd31aee3; evidence: 6914df5bac06b71a; source: 950d11b64eaf3078 --> Lynch argues it is better to fix unclear wording with a single reviewer than to let 10 people trip over the same mistake [63]. <!-- claim: 4d31698b9dfc0183; evidence: 9439bf80755c7787; source: 02ed639372381754 --> Both point toward cheap early passes (sub-agent tests, one human reader) before wide circulation. The "Design Docs at Google" essay frames review value as catching issues early while change is cheap [33], and Visser warns that a late review on a polished doc arrives when there is little room left for change [58].

### 5. Readability formulas and linting: flags, not gates

Redish concludes that a good readability score does not mean you have a usable document and that rewriting to get a better score is misusing the formula [20]. <!-- claim: 64429425fa3026bb; evidence: ec1044961c838305; source: bcd05986ed630c3f --> Klare reviewed 36 studies that tried to improve comprehension by improving readability scores and only about half succeeded [20]. <!-- claim: c0335bf78a63a5ae; evidence: bd2710ea42a98113; source: bcd05986ed630c3f --> To achieve those comprehension gains, scores had to move by an average of 6.5 grade levels [20]. Begeny and Greene found seven of the eight readability formulas were less than 49 percent accurate [71]. <!-- claim: f747452471c62c4c; evidence: 4756a04abb260bf8; source: 103b080f1b9bffcf --> Formulas also break on exactly the structure good docs use: bulleted lists read as long sentences [20], and Charrow and Charrow's revisions improved comprehension while worsening scores because they added connective words [20]. Jarrett and Redish report rewrites that dropped scores by up to six grades without improving comprehension, because cohesion was lost [69].

Linting has a narrower but real role. GitLab requires all AI-generated documentation to be reviewed by a Technical Writer and run through a Vale test before review [86]. <!-- claim: 026505481a74299e; evidence: 53398f0960746d05; source: f608a6718269b545 --> Vale's agent instructions say: do not silence a rule to make a run pass [155]. <!-- claim: 301981a5f1aeb0bc; evidence: e323cf92b26176e7; source: 65887d28ddb9fc89 --> Datadog reports Vale cut editing time and let contributors fix their own drafts before review [88]. Jarrett and Redish's advice for checkers in general is to treat them as sources of red flags and never let them change content automatically [69].

### 6. Fresh-context sub-agents: what they give and what they cannot

The skill's sub-agent test rests on context isolation, which the platform provides. Each Claude Code subagent starts with a fresh, isolated context window and doesn't see your conversation history [127]. <!-- claim: f213c3f6eac871f0; evidence: 7bad2110d9d6916c; source: 7dc93e85c023d968 --> A reviewer running in a fresh subagent context sees only the diff and the criteria you give it, not the reasoning that produced the change [128]. <!-- claim: b1196484122804a5; evidence: 00de2aad78e32f11; source: 9686dc1633cd25c6 --> Note that a forked sub-agent inherits the whole conversation and loses this isolation [127]; the skill should specify a fresh sub-agent, not a fork. Practitioners use AI readers as a preliminary layer. Lynch notes AI assistants can offer useful preliminary design feedback before you share the document with your teammates [63]. <!-- claim: cd553f600f348b56; evidence: 93fd37b42fd47bca; source: 02ed639372381754 --> Mollick describes building AI readers for early-draft feedback so he did not need to bother his human readers yet [121].

For grading, the evals guidance supplies two concrete techniques. To avoid hallucinations, give the LLM a way out, like an instruction to return Unknown when it doesn't have enough information [133]. <!-- claim: 3e37ac400f3d8c91; evidence: 62baac9dbd47fa0f; source: 6c790a16de0afd2b --> LLM-as-judge graders should be closely calibrated with human experts to gain confidence that there is little divergence from human grading [133]. <!-- claim: 24be903fe5839d6e; evidence: bfc783f846670324; source: 6c790a16de0afd2b --> Answer keys matter for a reason shown in the next section: without a reference, LLM judges tend to over-credit [145].

## Counterevidence and Disagreements

### LLM simulated readers are too competent to stand in for humans

This is the central caveat for Stage 3. Standard persona prompting yields near-perfect, deterministic performance, failing to capture the natural variance of developing readers [78]. <!-- claim: 011debc23758e63f; evidence: 178465204bbc9c7f; source: ef8ccb5ac52029b5 --> Increasing LLM capability actually degrades simulation fidelity of developing readers [78]. <!-- claim: 7411277c53074bb3; evidence: 70030d6c3f5d9006; source: ef8ccb5ac52029b5 --> Balog and Bakken attribute this to a lack of explicitly modelled cognitive limitations, not incapability [78]. Without guidance, strong general-purpose models consistently outperform the average student at every grade [79]. <!-- claim: 7fcc81f6db980d80; evidence: 21e6745a396bcf1f; source: 176ca3088d99e697 --> Grade-enforcement prompts changed results, but alignment with real students was "highly model- and prompt-specific" [79]. In a UX setting: Synthetic GPT participants produced a significantly different distribution from real data in 53% of tasks [80]. <!-- claim: 372f11346f24da32; evidence: 3666dfd37250b5e5; source: 941d7c6e13230333 --> Personas, chain-of-thought reasoning, and sampling parameters failed to create sensible fidelity improvements apart from inflating believability [80]. <!-- claim: 32237d12c0498de5; evidence: 87036db9c76e6525; source: 941d7c6e13230333 -->

All three studies are outside workplace documentation (children's reading, school maths, UI clicks), so the transfer to "an engineer reading a design doc" is an inference. But the direction is consistent: a strong model reading a doc will infer missing steps, resolve ambiguous referents, and fill gaps from world knowledge. That is exactly what hides the curse-of-knowledge defects in section 2. "Reader Claude answered correctly" is weak evidence that a human will; "Reader Claude answered wrongly" is strong evidence that a human will too.

### LLM evaluators favour their own and their user's text

An LLM evaluator shows self-preference, scoring its own outputs higher than others' while human annotators consider them of equal quality [81]. <!-- claim: 87e19627fedc9769; evidence: 0a2c0cadb2c9aa72; source: 8704997ce5824d92 --> AI assistants frequently provide more positive feedback when the user states they like or wrote the passage of text [104]. <!-- claim: 6a7312a86b7abb63; evidence: b8faa03947ad1d38; source: d6fb2b001042aa3d --> Context makes this worse: agreement sycophancy tends to increase with the presence of user context [105]. Fresh-context isolation addresses the second bias (the sub-agent does not know who wrote the doc, if the prompt does not tell it), but not the first, since the reader is the same model family as the writer. Without a correct reference, judges show high agreement with human experts only on questions the judges were able to correctly answer themselves [144]. <!-- claim: 3e19197c70ce17b0; evidence: 195eb4521121aa34; source: 35a5b0ac72232fe2 -->

### The documentation profession is sceptical

The study finds current LLM implementations produce unreliable outputs and raise data security concerns in documentation contexts [74]. <!-- claim: d1e077e95c39d90a; evidence: f70cf44d83db2bde; source: 213be1d0ab9d7e67 --> GitLab states generative AI tools are not a replacement for subject matter expertise [86]. <!-- claim: 3c77ee24fb558400; evidence: de0f56f90f10b05a; source: f608a6718269b545 --> Writer-defined AI persona feedback was seen as helpful and inspired revisions, although it was often verbose and unspecific [115]. <!-- claim: cf76aed2d1eeb15d; evidence: 0a2e7fd668794f32; source: 1d5df02f4e191c3b -->

### Evidence on the other side

LLM critique is not worthless, and some of the evidence is positive. Google's guide says LLMs excel at critical analysis and can even find mistakes in the text that they generated [180]. <!-- claim: 9b1252fbff970f92; evidence: 9d6da6ad4a8200fb; source: 4479d1abd5084f7d --> Strong LLM judges like GPT-4 can match human preferences well, achieving over 80% agreement, the same level of agreement between humans [137]. <!-- claim: 3b0091a61d4abae2; evidence: 97e187074e9a63c2; source: fe3c0d3102288397 --> That agreement is on pairwise preferences over chat answers, not reader comprehension. CheckEval improves rating reliability via decomposed binary questions while maintaining competitive correlation with human evaluation [141]. <!-- claim: 81bac93ff79a87f7; evidence: a65b9340b415a87e; source: 7cd53d39b7f268a2 --> This supports structuring Reader Claude's output as binary checks (did the answer match the key: yes/no) rather than Likert ratings. A randomized trial found AI-mediated (TA-filtered) feedback produced higher-quality student revisions [119], but with a human in the loop.

On the pre-mortem: A noted limitation is that participants all reacted to a ready-made plan, whereas teams typically evaluate plans they themselves generated [73]. <!-- claim: 36f10776e006064e; evidence: ce0735fa4bc6d5e0; source: cf69afedd3ca45a0 --> So the effect for authors attacking their own doc may be weaker, which again argues for running it in an isolated sub-agent rather than in the authoring context.

### A cost counterweight

Claude Opus 5 verifies its own work without being told to, and explicit verification instructions cause over-verification [123]. <!-- claim: 56be53b456cc70cb; evidence: a892bb2cab61c852; source: 545654c2e6e4a55e --> For the skill, this argues against piling on generic "verify again" instructions; each pass in the protocol below has a distinct target, and the protocol scales passes to stakes.

Bezos's observation that readers "know it when they see it" [16] is a reminder that some qualities of a great doc resist checklisting; none of the methods here measures persuasiveness or judgment quality directly.

## Implications for doc-coauthoring SKILL.md

### Proposed redesigned Stage 3: "Reader Testing"

Goal statement to replace the current one: *Find out whether the intended reader can (a) state the doc's point correctly, (b) find and act on what they need, and (c) trust its claims. A fresh Claude is the first, cheapest reader. It catches missing context and contradictions but is better at inference than any human reader, so passing its test is necessary, not sufficient.* [64] [78] [80]

**Step 0. Write the answer key before testing (main agent, with user).** Before any sub-agent sees the doc, write down, from the author's intent: (1) the doc's one-sentence point and the 1-3 decisions or actions it should produce; (2) 3-6 *reader scenarios*: short stories of the form "You are [role]; you need to [task]; using only this doc, what do you do / what is the answer?", each with the expected answer; (3) 2-3 likely misreadings. Ask the user to confirm or correct the key, because they hold the intent the doc must transmit. This replaces "predict reader questions", because experts are poor predictors of reader difficulty, and the debiasing that Step 1 currently relies on did not work in Hinds's study [75]. Instead the key captures what the *author* knows best: what a correct reading looks like. Scenarios come from usability testing [66] and task tests [68]; graded with a reference, which LLM judges need [144] [145] [133].

**Step 1. Cold paraphrase (fresh sub-agent; not a fork [127]).** Give only the doc and the reader role. Prompt: "Read this as [role]. Without quoting, tell me in your own words: what is this doc asking of you, what was decided, and what you would do next. Then, section by section, state what each section means in one sentence." Do not tell the sub-agent the author is the user or that the doc is a draft under review [104] [105]. Compare against the key; any divergence in the point or the action is a blocking issue [64] [92].

**Step 2. Scenario tasks (one fresh sub-agent per scenario, or one for all if the doc is short).** Give the doc plus one scenario. Require the answer, the quoted passage it relied on, and an explicit "NOT IN DOC" when the doc does not contain what was needed, instead of guessing [133] [122]. Also require: "List any fact or step you had to supply from your own knowledge." This is the main countermeasure to the over-competent reader: inferred steps are the curse-of-knowledge gaps a human would trip on [74] [78]. Grade each scenario pass/fail against the key (binary, not Likert [141]).

**Step 3. Omission and pre-mortem pass (fresh sub-agent).** Prompt: "Six months from now, this doc was approved and followed, and the outcome was bad. Independently list every reason that could be traced to something the doc said, left out, or left ambiguous." For a reference/how-to doc, use "a reader followed this and got stuck or did the wrong thing." [72] [73] [89]

**Step 4. Claim ledger (fresh sub-agent, or main agent if the doc is short).** Extract every factual claim, number, name, date and commitment; mark each as traceable to user-supplied context, stated as an assumption, or unsupported. Unsupported claims go back to the user, not to Claude's own judgement [83] [82] [86].

**Step 5. Triage with severity labels.** Merge findings into one list tagged *blocking* (wrong point/action; failed scenario; unsupported claim; contradiction), *should-fix* (an inferred step; a framing risk like the NCI title [66]), *nit* (style). Present to the user; fix blocking items, ask about should-fix, batch or drop nits [84] [85]. Resolve confusion in the doc itself, not in chat [63].

**Step 6. Retest and stop.** After fixes, rerun Steps 1-2 with *new* fresh sub-agents (not the ones that already read the earlier version) and re-check any edited section for dropped caveats or technical details [65] [74]. Stopping rule: the paraphrase matches the key, all scenarios pass with no NOT-IN-DOC and no supplied steps that matter, and no blocking items remain, or two retest rounds are done and the remaining issues are reported to the user [65]. Replace the current exit condition ("Reader Claude consistently answers questions correctly") with this, plus the explicit caveat that it is a floor.

**Step 7. Human reader handoff (scale to stakes).** For any doc whose readers will make a decision or take an action, generate a 5-minute human test kit: the 2-3 most important scenarios and a paraphrase prompt ("Tell me in your own words what this asks you to do"), plus "What might confuse other people on your team?" [64]. Recommend one reader from outside the authoring team, before wide circulation [66] [63] [90]. Do not ask "Is it clear?" [64].

**Without sub-agents (claude.ai).** Keep the same structure: the user opens a fresh conversation, pastes the doc and the paraphrase and scenario prompts (not "what is ambiguous?"), and pastes the answers back; the main conversation grades against the key. Warn that a fresh chat is still more competent than a human reader [78] [79].

### Other changes

- **Remove "Predict Reader Questions" as a standalone step** in both branches, folding it into the answer key (Step 0) [75].
- **Replace the "Additional checks" prompts** ("What might be ambiguous or unclear?", "Are there contradictions?") with the targeted passes above. Keep a contradiction check, but as a binary checklist item inside Step 4 [141].
- **Do not add readability scores** as a quality signal or target; if the user's org has a Vale or similar style config, offer to run it as a flag source in Final Review, never auto-applying fixes or silencing rules [20] [69] [155] [87].
- **Final Review: add a fresh-eyes re-read** by the user after time away where the schedule allows [16] [17].
- **Name the review plan** in the doc (who reviews, what kind of review is wanted, by when) so that human reviewers know what to look for [59] [36].
- **Keep the protocol proportionate**: for a short, low-stakes doc, Steps 0-2 and 5-6 suffice; Steps 3, 4 and 7 scale up with stakes, given the cost of extra verification [123] [91].

## Methodological Limits and Open Gaps

- No study directly compares an LLM cold read against human paraphrase or usability tests on real workplace docs (design docs, RFCs, PRDs). The "over-competent reader" conclusion transfers from children's reading [78], school assessment [79], and UX click behaviour [80]. The direction is consistent; the magnitude for professional readers is unknown.
- Whether asking an LLM reader to "list facts you supplied from your own knowledge" reliably surfaces its inferences is untested here; it is a design proposal.
- Red-team and analytic-tradecraft primaries (e.g., CIA structured analytic techniques) were not retrieved; the pre-mortem evidence rests on Klein [72] and one experiment [73] with a stated ecological limitation.
- de Jong and Schellens [77] was abstract-only, so the comparative validity of plus-minus vs paraphrase vs scenario methods is not established here.
- Readability evidence is mostly older (Klare 1976 via Redish 2000 [20]) or from children's texts [71]; it has not been tested on LLM-written technical prose.
- No canonical Write the Docs review checklist was found.

## Bibliography

[5] [Putting Ideas into Words](https://paulgraham.com/words.html)

[16] [2017 Letter to Shareholders](https://www.aboutamazon.com/news/company-news/2017-letter-to-shareholders)

[17] [Self-editing | Technical Writing Two | Google for Developers](https://developers.google.com/tech-writing/two/editing)

[20] [Readability formulas have even more limitations than Klare discusses](https://redish.net/wp-content/uploads/Redish_on_Readability_Formulas.pdf)

[33] [Design Docs at Google](https://www.industrialempathy.com/posts/design-docs-at-google/)

[36] [Better design docs](https://blog.mbrt.dev/posts/better-design-docs/)

[58] [Never approve design docs](https://josvisser.substack.com/p/never-approve-design-docs)

[59] [The Power of "Yes, if": Iterating on our RFC Process](https://engineering.squarespace.com/blog/2019/the-power-of-yes-if)

[63] [How to Get Meaningful Feedback on Your Design Document](https://refactoringenglish.com/blog/useful-feedback-on-design-docs/)

[64] [Paraphrase testing (Plain language guide series)](https://digital.gov/guides/plain-language/test/paraphrase-testing)

[65] [Test for understanding (Plain language guide series)](https://digital.gov/guides/plain-language/test)

[66] [Usability testing (Plain language guide series)](https://digital.gov/guides/plain-language/test/usability-testing)

[68] [How to Test the Usability of Documents](https://www.uxmatters.com/mt/archives/2020/05/how-to-test-the-usability-of-documents.php)

[69] [Readability Formulas: seven reasons to avoid them and what to do instead](https://www.effortmark.co.uk/readability-formulas-seven-reasons-to-avoid-them-and-what-to-do-instead/)

[70] [Cloze Test for Reading Comprehension](https://www.nngroup.com/articles/cloze-test-reading-comprehension/)

[71] [Study Shows ‘Readability’ Scores Are Largely Inaccurate (Begeny & Greene 2014, Psychology in the Schools)](https://news.ncsu.edu/2014/01/wms-begeny-readability/)

[72] [Performing a Project Premortem](https://hbr.org/2007/09/performing-a-project-premortem)

[73] [Evaluating the Effectiveness of the PreMortem Technique on Plan Confidence](https://idl.iscram.org/files/veinott/2010/1049_Veinott_etal2010.pdf)

[74] [“A Second Set of Eyes”: The Process and Challenges of Software Documentation Review](https://arxiv.org/html/2608.26232v1)

[75] [Who Should Design for Novice Users? A Study of Experts’ Limitations in Predicting Novices’ Experience (HPL-98-136; published as Hinds 1999, J. Exp. Psych: Applied)](http://shiftleft.com/mirrors/www.hpl.hp.com/techreports/98/HPL-98-136.pdf)

[76] [Evaluating Text Quality: The Continuum from Text-Focused to Reader-Focused Methods](https://www.karenschriverassociates.com/wp-content/uploads/2020/03/9-Schriver-Evaluating-Text-Quality-Text-to-Reader-focused-Methods.pdf)

[77] [Toward a document evaluation methodology: What does research tell us about the validity and reliability of evaluation methods?](https://research.utwente.nl/en/publications/toward-a-document-evaluation-methodology-what-does-research-tell-/)

[78] [“Act Like a 5th Grader” is Not Enough: Bounding Knowledge in LLM-Based User Simulators](https://arxiv.org/html/2608.30033)

[79] [Can LLMs Reliably Simulate Real Students’ Abilities in Mathematics and Reading Comprehension?](https://arxiv.org/abs/2507.08232)

[80] [What Would GPT Click: Practical Effects of Human-AI Behavioral Misalignment and the Cost of Synthetic Participants in User Experience](https://arxiv.org/abs/2605.18302)

[81] [LLM Evaluators Recognize and Favor Their Own Generations](https://arxiv.org/abs/2404.13076)

[82] [Chain-of-Verification Reduces Hallucination in Large Language Models](https://arxiv.org/abs/2309.11495)

[83] [The Fact-Checking Process (KSJ Science Editing Handbook)](https://ksjhandbook.org/fact-checking-science-journalism-how-to-make-sure-your-stories-are-true/the-fact-checking-process/)

[84] [How to write code review comments (Google eng-practices)](https://google.github.io/eng-practices/review/reviewer/comments.html)

[85] [Conventional Comments](https://conventionalcomments.org/)

[86] [Documentation workflows (GitLab Docs)](https://docs.gitlab.com/development/documentation/workflow/)

[87] [Vale documentation tests (GitLab Docs)](https://docs.gitlab.com/development/documentation/testing/vale/)

[88] [How we use Vale to improve our documentation editing process](https://www.datadoghq.com/blog/engineering/how-we-use-vale-to-improve-our-documentation-editing-process/)

[89] [Best Practices for Code Review](https://smartbear.com/learn/code-review/best-practices-for-peer-code-review/)

[90] [Improving Design Reviews at Google](https://ieeexplore.ieee.org/iel7/10298258/10298286/10298531.pdf)

[91] [Design review guidelines (V8)](https://v8.dev/docs/design-review-guidelines)

[92] [Use the Teach-Back Method: Tool 5 (AHRQ Health Literacy Universal Precautions Toolkit)](https://www.ahrq.gov/health-literacy/improve/precautions/tool5.html)

[93] [Teach-back: A systematic review of implementation and impacts](https://pmc.ncbi.nlm.nih.gov/articles/PMC7156054/)

[104] [Towards Understanding Sycophancy in Language Models](https://arxiv.org/abs/2310.13548)

[105] [Interaction Context Often Increases Sycophancy in LLMs](https://arxiv.org/abs/2509.12517)

[115] [Writer-Defined AI Personas for On-Demand Feedback Generation](https://arxiv.org/abs/2309.10433)

[119] [AI-Mediated Feedback Improves Student Revisions: A Randomized Trial with FeedbackWriter in a Large Undergraduate Course](https://arxiv.org/abs/2602.16820)

[121] [I, Cyborg: Using Co-Intelligence](https://www.oneusefulthing.org/p/i-cyborg-using-co-intelligence)

[122] [Prompting best practices - Claude Platform Docs](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices)

[123] [Prompting Claude Opus 5 - Claude Platform Docs](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-opus-5)

[127] [Create custom subagents - Claude Code Docs](https://code.claude.com/docs/en/sub-agents)

[128] [Best practices for Claude Code - Claude Code Docs](https://code.claude.com/docs/en/best-practices)

[133] [Demystifying evals for AI agents](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents)

[137] [Judging LLM-as-a-Judge with MT-Bench and Chatbot Arena](https://arxiv.org/html/2306.05685v4)

[141] [CheckEval: A reliable LLM-as-a-Judge framework for evaluating text generation using checklists](https://arxiv.org/html/2403.18771)

[144] [No Free Labels: Limitations of LLM-as-a-Judge Without Human Grounding](https://arxiv.org/html/2503.05061v4)

[145] [LLM Judges Can Be Too Generous When There Is No Reference Answer](https://arxiv.org/html/2607.12885)

[155] [Vale — instructions for coding agents](https://vale.sh/AGENTS.md)

[180] [Using large language models (LLMs) in technical writing](https://developers.google.com/tech-writing/two/llms)
