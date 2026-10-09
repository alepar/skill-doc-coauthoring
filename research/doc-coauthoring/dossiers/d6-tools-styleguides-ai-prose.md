# Dossier: Comparable writing tools and style guides (F6); markers of AI prose and how to remove their causes (F7)

## Summary

Comparable agent skills, linters, editor assistants and house style guides cover several things that upstream `doc-coauthoring` does not. They write back the brief and keep what the user said apart from what the model assumed. They get an outline approved with explicit exclusions. They take tone and terminology from documents the user already has. They run a placeholder, consistency and ambiguity self-review. Their review findings come severity-tagged, tied to a location and backed by a cited rule, and they are kept apart from the text. Fact-checking is done against the source of truth, and project vocabulary is enforced mechanically. Upstream asks about audience and template, then relies on one "slop or generic filler" bullet and on Reader Claude testing. It never asks for a house style, glossary or example docs, and it does not structure its review output.

For AI-prose markers, the evidence agrees on two points. First, the stable tells are mechanisms: generic content in place of specific facts, symmetric or templated structure, false depth, metadiscourse, and inflated significance. Word lists are snapshots that go stale. Second, neither automated detectors nor bans on surface patterns are reliable. Detectors have high false-positive rates, especially on non-native writers, and banning a token moves the tell somewhere else (em dashes turn into appositives). A skill should therefore fix causes: ask for specifics, check whether the text would still work with the topic swapped, use density thresholds rather than single hits, and state when formatting is appropriate rather than forbidding it.

Key uncertainty: no source here shows in a controlled study that a "tells" pass improves reader comprehension or task success. The only quantitative intervention result (agent-style) measures mechanical tell density, not clarity.

## Facet Questions and Scope
<!-- facet: F6 -->
<!-- facet: F7 -->

F6 asks which comparable skills, tools, prompts and style guides exist for AI-assisted doc writing and review (agent skill repos, prose linters, editor assistants, Google, Microsoft and GitLab style guides), and what they do that upstream `doc-coauthoring` does not. F7 asks which observable markers of AI-generated prose are documented, what limits detection has, and how a workflow can remove the causes without an ever-growing list of banned words. Out of scope: general RFC/design-doc culture and reader-testing method, which other facets cover. Grammarly brand tones, Lex.page and Anthropic's prompt library were not retrieved.

Version context for the upstream skill: The GitHub commits API for skills/doc-coauthoring/SKILL.md returned a single commit, 2025-12-04, "Add doc-coauthoring skill and update example skills (#134)" [184]. <!-- claim: 1b213a4124e64e28; evidence: fcba0e92bb1d0416; source: 278c2785e3ad1cc8 --> So the skill has one upstream revision, and none of the practices below have been added since the first release.

## Source Groups and Findings

### Comparison table: what comparable tools do vs. upstream doc-coauthoring

| Tool / source | Kind | Key practice | Upstream equivalent? |
|---|---|---|---|
| superpowers `brainstorming` [150] | Agent skill | Write-back brief separating said from assumed; one question per message; 2-3 approaches with a recommendation; spec self-review (placeholders, consistency, ambiguity, scope) | Partial: 5-10 batched questions; no write-back; no self-review checklist |
| awesome-copilot `documentation-writer` [151] | Agent skill | Scope with explicit exclusions; outline approval before drafting; mine existing files for tone and terminology; Diátaxis type | Partial: proposes 3-5 sections; no exclusions; no tone or terminology mining |
| `writing-clearly-and-concisely` [148], [149] | Agent skill | Delegate the copyedit to a subagent with a style reference; AI-pattern avoidance list | Only the "slop" bullet in Near Completion |
| agent-style [152] | Ruleset | 21 rules applied at generation time; curse-of-knowledge and citation rules marked critical | None |
| Kaz Sato's subagents [153] | Agent workflow | Editor plus SME reviewers; Critical/Warning/Suggestion; verify claims against source code | Reader Claude covers comprehension, not factual verification |
| Hodsdon, Gemini CLI [154] | Prompt pattern | Cite the style rule behind each edit; plan, then feedback, then edit | None |
| Vale [155], [156]; GitLab [87]; Datadog [88] | Prose linter | Project rules as code; accept/reject vocabularies; error/warning/suggestion levels; JSON output; don't silence rules | None |
| alex [162], proselint [163], write-good [164] | Linters | Inclusive language; usage advice; weak-word checks | None |
| Grammarly style rules [165] | Editor | Team substitution rules with explanations | None |
| Copilot in Word [166], [167] | Editor | Suggestions kept apart from the text; each card cites its paragraph | Edits applied directly with str_replace |
| Gemini in Docs [168] | Editor | Match the style of a reference file; whole-document argument prompts | None |
| Notion AI [169] | Editor | Accept/discard/retry; adapt tone per audience | Freeform feedback only |
| Google / Microsoft / GitLab style guides [158], [159], [95], [157], [161] | Style guides | Global audience; second person; active voice; descriptive links; no pre-announcements; lead with what matters; bias-free language | Alt-text check only |

### Agent skills that front-load shared understanding and self-review

The superpowers brainstorming skill says to write back your understanding, summarizing the intended outcome, constraints, and success criteria, and to separate what they said from assumptions [150]. <!-- claim: 5b9f845d39533947; evidence: c58e0acb0658e92e; source: 101df0cfe5835e9d --> The brainstorming skill asks for only one question per message, breaking a topic that needs more exploration into multiple questions [150]. <!-- claim: 7dbe74200d478adf; evidence: 6b1f10a4f01421f7; source: 101df0cfe5835e9d --> The brainstorming skill says to propose 2-3 different approaches with trade-offs and to lead with your recommended option and explain why [150]. <!-- claim: 86c793d08c79c6cf; evidence: af0ba14d128bacbb; source: 101df0cfe5835e9d --> Its spec self-review includes a placeholder scan for to-be-determined or to-do markers, incomplete sections, or vague requirements, and an internal consistency check for sections that contradict each other [150]. <!-- claim: 1d1ae126a709daa5; evidence: e42aaf20198008c2; source: 101df0cfe5835e9d --> Its ambiguity check asks whether any requirement could be interpreted two different ways and, if so, to pick one and make it explicit [150]. <!-- claim: 2c5cc934b3cdbcc3; evidence: 181ea34c11a4d8ef; source: 101df0cfe5835e9d -->

Upstream's Stage 1 asks 5-10 numbered questions at once and has no point where the model hands back a brief for the user to check. The brainstorming skill makes misunderstanding visible before drafting starts. Upstream lets it surface only at Reader Testing, after the sections are written.

The awesome-copilot documentation-writer skill requires determining scope, including what specific topics should be included and, importantly, excluded [151]. <!-- claim: e76f0051ca39270e; evidence: 53a75f5c9c178350; source: e83e07b7bda64157 --> The documentation-writer skill proposes a detailed outline, such as a table of contents with brief descriptions, and awaits approval before writing the full content [151]. <!-- claim: b97ac8fa7af80fb2; evidence: 2facfa1ba9157a6c; source: e83e07b7bda64157 --> When given other markdown files, the documentation-writer skill uses them as context to understand the project's existing tone, style, and terminology [151]. <!-- claim: 7a449f2656f7d157; evidence: 48708ac413db0981; source: e83e07b7bda64157 -->

Upstream does ask for "a template or specific format", but not for existing documents in the same voice and not for exclusions. Both are cheap to collect and they shape every section that follows.

The core idea of Diátaxis is that there are four kinds of documentation (tutorials, how-to guides, reference and explanation), each with a different purpose and written in a different way [52]. <!-- claim: b306f13b797732be; evidence: 629977c673883b41; source: 10806d8ed39073c1 --> Diátaxis holds that crossing or blurring the boundaries in the map is at the heart of a vast number of problems in documentation [52]. <!-- claim: eb37e711087f557f; evidence: 4fb4b3506410a95c; source: 10806d8ed39073c1 --> This is relevant because upstream lists doc types (spec, decision doc, proposal) but has no rule against mixing purposes within one doc, for example tutorial-style explanation inside a reference section.

The writing-clearly-and-concisely skill, when context is tight, has you write a draft, dispatch a subagent with the draft and elements-of-style.md, and have the subagent copyedit and return the revision [148]. <!-- claim: e4946377b56f9be6; evidence: 5c229a628ced3bd6; source: ad4411041bed682e --> That skill warns that elements-of-style.md consumes ~12,000 tokens and should be read only when writing or editing prose [148]. <!-- claim: ddfbc84fb56e7f25; evidence: 0290727a0da233cd; source: ad4411041bed682e --> The softaworks fork says LLMs regress to statistical means, producing generic, puffy prose, and lists puffery such as pivotal, crucial, vital, testament and empty "-ing" phrases [149]. <!-- claim: 1c7d51528f8b60e2; evidence: 8731d34945fd1f13; source: 17c8cc0e9d430b83 --> These skills keep style references out of the main context and load them only for an editing pass. That bears on how heavy a style or anti-slop checklist inside SKILL.md can be. Claude skill guidance notes that being concise in SKILL.md still matters, because once loaded every token competes with conversation history and other context [125]. <!-- claim: 4516c1b5e05f5090; evidence: 3224228242eda8d3; source: ee885bfc4c773cf4 -->

### Multi-role review, cited style fixes and fact-checking

Kaz Sato notes that this level of quality traditionally needs multiple reviewers (an editor, a code reviewer, and a subject matter expert) and asks whether AI could combine all three [153]. <!-- claim: 293d8a30be523ab4; evidence: a5ea87826ef92dee; source: 1efd2c22e7d09469 --> Sato's docs-reviewer subagent labels Critical Issues (C1, C2, …) as must fix because they severely impact readability or correctness [153]. <!-- claim: fe8a8eae3e2bba37; evidence: 5c96308c8909948d; source: 1efd2c22e7d09469 --> Sato's adk-reviewer agent does source code verification, investigating the actual implementation to verify issues rather than solely relying on API documentation [153]. <!-- claim: 0e3d7ac19f7202e1; evidence: f4d8500e58ab2877; source: 1efd2c22e7d09469 -->

Hodsdon's prompt requires a Citation section that cites a source to justify each style fix, such as a style guide page URL or local GEMINI.md file [154]. <!-- claim: af4a4caa69f252ba; evidence: 5bfe17fab7298105; source: 998f3e2f0e4b1efd --> Hodsdon says prompting for citations helps verify where the style guideline comes from and to quickly spot an invented citation source [154]. <!-- claim: 5973c86097b40b97; evidence: 8ca5797a1141e222; source: 998f3e2f0e4b1efd -->

Upstream's Reader Claude tests whether a fresh reader can answer questions. It does not check whether the doc's claims are true, and its findings have no severity. Sato's split into an editor and an SME, with severity-ranked findings, and Hodsdon's "cite the rule" requirement each target a gap: unverified technical claims, and style feedback the user cannot audit.

### Prose linters and house-style enforcement

Vale is a command-line linter for prose that reads Markdown and other formats and reports style violations against rules the project chooses [155]. <!-- claim: 345fce2f1627e7c0; evidence: 19aa231d357d99b6; source: 65887d28ddb9fc89 --> Vale's agent instructions say do not silence a rule to make a run pass, because fixing the prose is the point of the tool [155]. <!-- claim: 95ee88955cf37b7c; evidence: e323cf92b26176e7; source: 65887d28ddb9fc89 --> Vale's agent instructions say to use --output=JSON when you intend to parse the result [155]. <!-- claim: 29e41a60e12629c2; evidence: dc01c52bf702e7c3; source: 65887d28ddb9fc89 -->

GitLab runs 69 Vale rules in its docs pipeline on every merge request, and error-level rules fail the job [156]. <!-- claim: 6e52b5fada671b5c; evidence: f4367e0c58defa2b; source: 71ba43e81abcf2b4 --> GitLab reserves the Error level for branding guidelines, trademark guidelines, and anything that causes content to render incorrectly [87]. <!-- claim: 29d2dfd8a9da6bad; evidence: 9746394248c51f0d; source: 95dc1a497e2a949f --> GitLab warns that if a rule is too subjective, it cannot be adequately enforced and creates unnecessary additional warnings [87]. <!-- claim: da2d2e31ea6539d0; evidence: ee0f7be87fdf1cb7; source: 95dc1a497e2a949f --> Datadog says Vale cut down on editing time, reduced the mental toll on writers, and enabled contributors to amend their own contributions before review [88]. <!-- claim: 99696b30358212f8; evidence: c267ea7c545d93ba; source: 2dba8cee79e941e3 -->

The production pattern is to tier rules by severity, make only objective rules blocking, keep subjective preferences at suggestion level, and maintain project-specific accept and reject vocabularies. Claude's skill authoring guidance describes a validation loop where the "validator" is STYLE_GUIDE.md and Claude performs the check by reading and comparing [125]. <!-- claim: 446e2f040b1c0bf4; evidence: 1889dd59a72ade77; source: ee885bfc4c773cf4 --> So a skill can use a house style document or glossary as its validator even when no linter is installed.

Alex helps you find gender favoring, polarizing, race related, or other unequal phrasing in text [162]. <!-- claim: 3a0b81851ccf6eef; evidence: f87f93927605880f; source: 8d6d6b82fc7f4526 -->

### Editor-embedded assistants

Grammarly style rules pair original text with rule text and an explanation that gives the team context to understand the suggestion [165]. <!-- claim: 98026b552c68c3fd; evidence: bd562dcec2d8e9e1; source: fa365752fe561c68 --> In Coaching with Copilot, you control what changes to make, and the suggestions are separate from your content so that nothing gets overwritten [166]. <!-- claim: 80e98b400ca12e8f; evidence: 6f969710f70a6232; source: 473c8e66324e4c4d --> Copilot's suggestion cards each include a citation to the paragraph associated with the suggestion so you can compare the original text and the proposed revision [167]. <!-- claim: 93add94829c3231b; evidence: 100fa9492be738ef; source: e9423a6bbf12935f --> Gemini in Docs can reference a writing style like the tone of voice, sentence structure, and vocabulary complexity from a Google Drive document [168]. <!-- claim: 21fa0d343cb33fe5; evidence: 5d54ffd5a1628eaf; source: 499d61dd2ea567f5 --> To refine the whole document, Gemini in Docs accepts a prompt like "Suggest places where I can better defend my argument." [168]. <!-- claim: 3598e0e5cfd64021; evidence: 5b7ab6b25ebe21ac; source: 499d61dd2ea567f5 --> Notion's Edit with AI lets you give a prompt like make it shorter or change the tone, then accept, discard, or ask it to try again [169]. <!-- claim: 69ba67ea4c49d21f; evidence: e094359a1e319f94; source: 859bf56083c68b2e -->

The common pattern across commercial editors is that suggestions stay apart from the text, each one is tied to a location and comes with a reason, and the user accepts or rejects it. Upstream applies changes directly with `str_replace`. That is fine for drafting a section the user asked for, but in the Near Completion and Final Review passes it hides what changed and why.

### House style guides

GitLab's style guide says the increasing use of machine translation, GitLab Duo Chat, and other AI tools means that consistency is even more important [157]. <!-- claim: 78871470402a8e2d; evidence: 30bf149582d29a5d; source: 68bd0cba209d10c3 --> GitLab's style guide says do not promise to deliver features in a future release, avoiding phrases like "Support for this feature is planned." [157]. <!-- claim: df974c26d427b38a; evidence: cd73577914b0f5a5; source: 68bd0cba209d10c3 --> GitLab observes that content is often written from the contributor's point of view, and topic types help geared content toward helping others rather than documenting how a feature was implemented [157]. <!-- claim: 4ac4e4f09f190c36; evidence: 4a0b11ab4e4f1d86; source: 68bd0cba209d10c3 -->

Google's style highlights say don't pre-announce anything in documentation, use descriptive link text, write accessibly, and write for a global audience [158]. <!-- claim: cda009c8861b9f7f; evidence: 1a4be8de49931c93; source: 45ae9999516a259b --> Google's accessibility guidance says don't present new information in images and always provide an equivalent text explanation with the image [159]. <!-- claim: 79cba09a5db75c6f; evidence: 8a649842d49af182; source: 0ed6b289e4dd3f07 --> Google says links should make sense when read out of context [159]. <!-- claim: 21c979f5da1a8984; evidence: e98c480be2452248; source: 0ed6b289e4dd3f07 -->

Microsoft's top tips say lead with what's most important, front-load keywords for scanning, and make customer choices and next steps obvious [95]. <!-- claim: 766beb02d3421a7b; evidence: acd9266c45400b92; source: 629d96b21e3d5fd4 --> Microsoft advises reading your text aloud to check whether it sounds like something a real person would say [95]. <!-- claim: 215cd5a9a1c6fb84; evidence: cf659ad235fc1583; source: 629d96b21e3d5fd4 --> Microsoft advises that most of the time you start each statement with a verb and edit out "you can" and "there is, there are, there were" [95]. <!-- claim: a226ec25bd349683; evidence: 13072a8b939d89b0; source: 629d96b21e3d5fd4 -->

Upstream's only accessibility step is the alt-text check, and its rationale is that Claude cannot see the images. The style guides give broader rules that also help a "Reader Claude": no information only in images, link text that makes sense out of context, no pre-announcements, and the main point first. GitLab's point about writing from the contributor's view is the same curse-of-knowledge failure that upstream's Reader Testing targets. Here it is caught by a structural rule rather than by testing.

### Markers of AI-generated prose: mechanisms over word lists

Wikipedia's signs page says the patterns listed are only potential signs of a problem, not the problem itself [170]. <!-- claim: 463b7ae04b476469; evidence: 000e704f9d1ae99c; source: 216545f88fe97a24 --> The page asks editors not to merely treat these signs as the problems to be fixed, because that could just make detection harder; the actual problems are the deeper concerns [170]. <!-- claim: 8f93b226fdc72848; evidence: 425f98bf0f279c64; source: 216545f88fe97a24 --> According to the page, the LLM tends to omit specific, unusual, nuanced facts (which are statistically rare) and replace them with more generic, positive descriptions [170]. <!-- claim: 4fa29cec686f49ce; evidence: 57083e2a1ddd2131; source: 216545f88fe97a24 -->

The page notes that the words LLMs overuse have changed over time, for instance delve was overused in 2023 and early 2024 but dropped off sharply in 2025 [170]. <!-- claim: 39e28707a2e256c6; evidence: f20ca27f02c77ef9; source: 216545f88fe97a24 --> According to the page, LLMs overuse the rule of three, from "adjective, adjective, adjective" to "short phrase, short phrase, and short phrase" [170]. <!-- claim: b463de45c24585f2; evidence: 054f4247c1842fe3; source: 216545f88fe97a24 -->

Kobak et al. studied over 15 million biomedical abstracts from 2010--2024 indexed by PubMed and showed an abrupt increase in the frequency of certain style words after LLMs appeared [171]. <!-- claim: 532ada7151781c27; evidence: b9fe4bcb27639c54; source: 3d58c956b7da4516 --> The excess word analysis suggests that at least 13.5% of 2024 abstracts were processed with LLMs, reaching 40% for some subcorpora [171]. <!-- claim: 9ab3401687fcd483; evidence: 5e9d8807876406a6; source: 3d58c956b7da4516 --> The 2023–24 excess words were not content-related nouns but style-affecting verbs and adjectives that ChatGPT-like LLMs prefer [171]. <!-- claim: 81b5ee24fac44722; evidence: d46d042c4cba0808; source: 3d58c956b7da4516 --> Kobak et al. suggest native speakers may be better at noticing and actively removing unnatural style words from LLM outputs [171]. <!-- claim: e79f454916993703; evidence: 840fb8f567e46ec7; source: 3d58c956b7da4516 --> Liang et al. found the largest and fastest growth in LLM usage in Computer Science papers (up to 17.5%), with Mathematics papers and the Nature portfolio showing the least (up to 6.3%) [172]. <!-- claim: f723b40f7c1195f9; evidence: e11af28fc210f006; source: c6867adfdf199076 -->

The NousResearch anti-slop reference says LLMs default to a rigid paragraph template, topic sentence -> elaboration -> example -> wrap-up, every paragraph with the same rhythm [179]. <!-- claim: 9e10092cb02ef21a; evidence: cf50625314344108; source: 87db0d136ed1c2be --> It describes symmetry addiction: three pros, three cons, five steps, equal-length sections, whereas real writing is lumpy [179]. <!-- claim: fae355881c9410a0; evidence: 7d64034da9c62bc7; source: 87db0d136ed1c2be --> It says LLMs simulate depth by restating the problem in fancier words, listing obvious considerations, and concluding with a vague call to action or "it depends" [179]. <!-- claim: 224db600a6e5228d; evidence: d8e64d8509c52e00; source: 87db0d136ed1c2be --> Its smell test asks whether you could swap the topic and the text would still work, and says specificity is the antidote to slop [179]. <!-- claim: 5db6cc789fa9aabe; evidence: 1ff8b5e5fefd6fcc; source: 87db0d136ed1c2be -->

Several of these mechanisms come straight from classic writing advice. Pinker argues metadiscourse is there to help the writer, not the reader, since previews, summaries, and signposts cost more work than they save [30]. <!-- claim: 1e066f5078d8d445; evidence: 429d8e3240da0629; source: 19491a352077d705 --> Pinker says good writers' hedging is a choice, not a tic [30]. <!-- claim: 5d069f5cee3eb9ff; evidence: af6fd10ab1b5677b; source: 19491a352077d705 --> Emphasis argues that bullet points strip away linking words, so you can't say how ideas relate to each other [26]. <!-- claim: c7622c1a7e8ec478; evidence: 82ea0fee30a1b0ba; source: 14143bf843241e3a --> Zinsser says that after each rewrite he goes over it once more, reading it aloud, and is amazed at how much clutter can still be profitably cut [31]. <!-- claim: 72a1645674b0ccd3; evidence: 60888b94d02b8999; source: fb8a8250bfa42d42 -->

The model vendor's own guidance points the same way, and shows that tells shift between model versions. Anthropic's prompting guide says earlier models overused bullets and bold in chat, while the newer model leans the other way and uses bold less [124]. <!-- claim: 35890013d1540a36; evidence: 6c3a2312b7cda280; source: 557f96ccb3270d91 --> The guide says that if your prompt contains anti-formatting language, remove it or replace it with a rule that says when specific formatting is appropriate [124]. <!-- claim: 88a3c4108b338a3c; evidence: 29995bd1e3f24b2f; source: 557f96ccb3270d91 --> The guide says the model's writing has few stock phrases, but its prose can be denser, with longer sentences and fewer paragraph breaks, and an instruction that defines the anti-pattern, mannered prose, helps [124]. <!-- claim: 792f8d3aee0ce857; evidence: 9c63680261d4ecfd; source: 557f96ccb3270d91 --> When summarizing documents, the model is more likely to reproduce passages of the source text without marking them as quotations [124]. <!-- claim: 05518a3bc7262573; evidence: f91b926292e40487; source: 557f96ccb3270d91 --> The last point matters for doc co-authoring in particular. When the user pastes in a source document, the drafted doc may reuse that source's wording without marking it as a quote. A final review should check for this.

### Removing causes, not chasing tokens

One practitioner calls AI word lists an inventory of symptoms rather than a diagnosis, noting the lists keep growing and scrubbing tools hand back prose with a different accent of wrong [178]. <!-- claim: f7b73bac40b6b737; evidence: b7e94fb898a3ce00; source: 0e3b3fd19152285a --> The same source flags em-dashes above 3 per 1,000 words because the tell is density, never presence [178]. <!-- claim: 8b5a2d427cce5e67; evidence: 2d789750567933ff; source: 0e3b3fd19152285a --> A chapter drafted under a hard em-dash budget recounted 0.00 em-dashes per 1,000 words but carried 14 trailing appositive clauses, a density of 6.6 per thousand words [178]. <!-- claim: ef4ca88e48a85f0b; evidence: 0ca79d852b724440; source: 0e3b3fd19152285a --> The source argues that if you catalogue the mechanism the next costume is recognisable on sight, but if you list only the words every model release resets you to zero [178]. <!-- claim: d80534957c474206; evidence: 8ad839912eb489ea; source: 0e3b3fd19152285a --> The page reports that suppressing em dashes made LLMs avoid alternate punctuation, so variety dropped and commas and periods are more likely now than even in human text [170]. <!-- claim: 5aea347f326082ee; evidence: 77a4d2494f84e712; source: 216545f88fe97a24 -->

Antislop reports some slop patterns appear over 1,000x more frequently in LLM output than human text, and its sampler suppresses 8,000+ patterns while token banning becomes unusable at just 2,000 [176]. <!-- claim: 65442055b88d2498; evidence: b563474ee43b3454; source: 96aebd41d7aadaa7 -->

Agent-style is a curated set of English writing rules for AI agents to follow at generation time, not as a post-hoc linter [152]. <!-- claim: 13b736675ba60e2b; evidence: 504b6ea4e7b7702d; source: aa7f71ce8d21a796 --> With agent-style, Claude Opus 4.7 dropped 47% (88 → 47 violations), Gemini 3 Flash dropped 86% (65 → 9), and GitHub Copilot CLI reported no change (52 → 52) [152]. <!-- claim: 1a837c97c54d0842; evidence: 03308c891215b440; source: aa7f71ce8d21a796 -->

Taken together: per-document vocabulary bans are a weak tool for a skill. They go stale with each model release, they move the tell somewhere else, and at the prompt level they may make the banned item more likely (see Counterevidence). What stays stable is the mechanism: a generic claim where a specific fact belongs, structure padded for symmetry, metadiscourse, hedging as a habit, bullets that remove the reasoning between points, and summaries that hide where text was copied. A cause-level pass tests for specificity ("could the topic be swapped?"), cuts sentences that carry nothing, and counts density rather than reacting to single occurrences.

## Counterevidence and Disagreements

**Automated detection is unreliable and biased.** As of July 20, 2023, OpenAI's AI classifier is no longer available due to its low rate of accuracy [174]. <!-- claim: 078964c31324cbd4; evidence: f30f758252af2989; source: ddac8850e482fa2b --> On a challenge set, the classifier correctly identified 26% of AI-written text as "likely AI-written" while labeling human-written text as AI-written 9% of the time [174]. <!-- claim: 57f3f398c8366b51; evidence: 1fdedcdcc3744063; source: ddac8850e482fa2b --> GPT detectors misclassified over half of the TOEFL essays as "AI-generated" (average false positive rate: 61.22%), while showing near-perfect accuracy for US 8-th grade essays [173]. <!-- claim: acef629be1b2c574; evidence: 851b439e7defeb00; source: 05ea0961d7fe712d --> 89 of the 91 TOEFL essays (97.80%) were flagged as AI-generated by at least one detector [173]. <!-- claim: c6d588e38a37b596; evidence: 2080d5ece903dda3; source: 05ea0961d7fe712d --> Simplifying word choice raised the misclassification rate as AI-generated from an average of 5.19% across detectors to 56.65% [173]. <!-- claim: 9a5d5252d690ac2a; evidence: a3d443e2cf351df0; source: 05ea0961d7fe712d --> The last result points straight at the conflict. Plain-language advice, which is standard in every style guide, makes text more likely to be flagged as AI. A skill should never use "sounds AI-written" as a pass/fail gate. Liang et al. note their statistical estimation operates on the corpus level and is more robust than inference on individual instances [172]. <!-- claim: e5fba68ba719cbe2; evidence: 292cb550d99735c4; source: c6867adfdf199076 --> Kobak's and Liang's prevalence estimates are therefore population-level evidence that style words shifted. They do not license judging individual documents.

**Humans who know the tells do better than tools.** The majority vote among five "expert" annotators who frequently use ChatGPT misclassifies only 1 of 300 articles, outperforming most commercial and open-source detectors even with paraphrasing and humanization [175]. <!-- claim: f1a63601dc8b470d; evidence: 1bec2d2a6b93a471; source: 94bc1872a6410141 --> These expert annotators rely heavily on 'AI vocabulary' but also pick up on formality, originality, clarity, which are challenging for automatic detectors [175]. <!-- claim: d4bd4dcb1bffca0c; evidence: e9e3a9319ec7228d; source: 94bc1872a6410141 --> So a careful reviewer, human or a prompted model, can catch tells, but only by attending to formality, originality and clarity, not just vocabulary.

**Bans can backfire.** Thoughtworks warns that suppression may introduce a "backfire effect": if we forbid a term while prompting, the model can accidentally prioritize it by talking about it more [177]. <!-- claim: 14a8a5b98a41f137; evidence: fe3155aa277abc6a; source: 08517a2d8575b3fc --> Together with the em-dash migration result above, this argues against adding a long "never write X" list to SKILL.md.

**Ruleset benchmarks don't measure what matters.** Agent-style says both critical-severity rules, RULE-01 (curse of knowledge) and RULE-H (citation discipline), are semantic-only and measured by nothing in its bench [152]. <!-- claim: 052be33e8ca94090; evidence: 4ec0d763ccb933eb; source: aa7f71ce8d21a796 --> Agent-style says to read these percentages as mechanical AI-tell density, not evidence about argument quality, clarity for a stated audience, or sourcing [152]. <!-- claim: 809d94af54e8bd96; evidence: bbbf77e79572e9d0; source: aa7f71ce8d21a796 -->

**Linters produce noise.** One Vale guide notes that the linter sometimes produces false positives when there's no mistake, and that its main purpose is to draw your attention to the potential issue [182]. <!-- claim: 03a28aee8d8c51ce; evidence: 42c0441cdef12fbc; source: c6ef02205e96d6c9 --> GitLab's advice to keep subjective rules non-blocking (above) is the practical answer.

**Style guides disagree with each other.** Microsoft's guide endorses em dashes without spaces [95], while anti-slop sources treat em-dash density as a tell [178]. So a house style supplied by the user should override generic anti-slop heuristics.

**Diátaxis is contested.** Tom Johnson found siloing documentation into tutorials, how-tos, reference, and explanation overly opinionated and arbitrary, and asked what research the information model was based on [53]. <!-- claim: 062ec61b6e60c85a; evidence: 28bd242dbb3d2b76; source: 76ecb0171807acbc --> Procida clarified that Diátaxis isn't meant to impose four rigid buckets but is an analytical approach emerging from four core user needs [53]. <!-- claim: cfeca944220cea22; evidence: f2ba8e45e432a2e3; source: 76ecb0171807acbc --> The defensible use is as an analytical lens on reader need, not as a required template.

## Implications for doc-coauthoring SKILL.md

Ordered by expected value. Evidence is cited for each item. The suggested text is a proposal.

1. **Stage 1: ask for house style, a glossary and exemplar docs.** Add to Initial Questions: "Is there a style guide, glossary/term list, or an existing doc whose tone we should match?" Mine any files provided for tone and terminology [151], [168]. Keep a term sheet of accepted and rejected terms through all stages [155], [183], [165]. Rationale: consistency matters more when readers use AI tools and machine translation [157].

2. **Stage 1 exit: write back the brief.** Before Stage 2, post a short brief (purpose, audience, desired impact, in scope / out of scope, success criteria). Mark each item *stated* or *assumed* and ask for corrections [150], [151]. Consider allowing one question at a time when the user prefers it over the 5-10 batch [150].

3. **Stage 2 structure: offer 2-3 structures with a recommendation.** Replace "suggest 3-5 sections" with 2-3 candidate outlines, the recommended one first and its trade-off stated, then get approval [150], [151]. Check that each section serves one reader need, without mixing tutorial, reference and explanation [52], [53]. Lead with what matters most [95].

4. **Near Completion: replace the single "slop" bullet with a cause-level pass.** Suggested checklist: (a) the swap test: would this paragraph still work if the topic changed? If so, add the specific fact, number or name [179], [170]; (b) false depth: does the paragraph restate the problem, list obvious points, or end with "it depends" [179]?; (c) symmetry padding: lists of three or equal-length sections that the content doesn't call for [179], [170]; (d) metadiscourse and reflexive hedges [30]; (e) bullets that drop the reasoning between points [26]; (f) inflated significance in place of plain statements [149], [170]. Use density, not presence: flag patterns that recur, not single uses [178]. Don't ship a banned-word list [178], [177], [176]. If formatting rules are needed, say when a format is appropriate rather than forbidding it [124].

5. **Add a spec-style self-review before Reader Testing.** Check for placeholders and to-be-determined markers, contradictions between sections, requirements that can be read two ways, undefined terms, unsupported factual claims, and promises about future features [150], [152], [157], [158]. Upstream's "[To be written]" scaffold makes the placeholder scan especially relevant.

6. **Stage 3: add a fact-check reviewer next to Reader Claude.** When the doc makes claims about code, data or systems, have a subagent check them against the source of truth, not against the doc [153]. Check for source passages reproduced without quotation marks when pasted material was summarized [124].

7. **Structure review output.** Findings from Near Completion, Reader Testing and Final Review should each carry a severity (critical/warning/suggestion), a location (section or paragraph), and the rule or reason, with a cited style source where there is one. Present them apart from the text and let the user accept or reject [153], [154], [87], [166], [167]. Don't apply review-stage edits silently.

8. **Broaden the accessibility check.** Extend the alt-text step: no information only in images, link text that makes sense out of context, global-audience phrasing, and bias-free language [159], [158], [161], [162].

9. **Optional tooling hook.** If Vale, alex or a project linter is configured, run it with JSON output, fix the prose rather than silencing rules, and treat only objective rules as blocking [155], [87], [88].

10. **Never use AI detectors as a gate,** and don't tell the user a doc "sounds AI-written" as a verdict. Name the concrete mechanism and its fix instead [173], [174], [170].

11. **Keep SKILL.md lean.** Put long checklists (the anti-slop mechanisms, the style rules) in a reference file loaded only at review time, or in a copyedit subagent [125], [148], [149]. Write evals before adding guidance: Claude's skill authoring guidance says to create evaluations BEFORE writing extensive documentation so the Skill solves real problems rather than imagined ones [125]. <!-- claim: 9a6e2ffaeb6fd152; evidence: 19e1531feec01934; source: ee885bfc4c773cf4 -->

## Methodological Limits and Open Gaps

- No controlled evidence that a tells or anti-slop pass improves comprehension, decision quality or reader trust. Agent-style measures mechanical tell density only [152].
- The Wikipedia list changes constantly, and vocabulary tells are tied to particular model versions [170], [124]. Specific words cited here will go stale.
- Several sources are practitioner posts or GitHub READMEs (Sato, Hodsdon, captainrandom, NousResearch, agent-style) with no independent evaluation.
- Not retrieved: Grammarly brand tones, Lex.page, Anthropic prompt library, Google "docs-agent". The comparison table may miss commercial features.
- The upstream version history comes from a single API query that returned one commit. Commits from renames or moves could be missing if the path changed.
- The detector-bias results (2023) come from older detectors. The 2025 study shows expert humans outperform current detectors, but there is no newer large FPR audit here.

## Bibliography

[26] [Why bullets won't make your case](https://www.writing-skills.com/bullets-wont-make-case)

[30] [Why Academics Stink at Writing (Chronicle of Higher Education, 2014)](https://grad.ncsu.edu/wp-content/uploads/2016/06/Why-Academics-Stink-at-Writing-1-2.pdf)

[31] [On Writing Well (excerpts: Simplicity; Clutter)](http://higinbotham.lmc.gatech.edu/wp-content/uploads/sites/359/2016/06/Zinsser.pdf)

[52] [Start here - Diátaxis in five minutes](https://diataxis.fr/start-here/)

[53] [What is Diátaxis and should you be using it with your documentation?](https://idratherbewriting.com/blog/what-is-diataxis-documentation-framework)

[87] [Vale documentation tests (GitLab Docs)](https://docs.gitlab.com/development/documentation/testing/vale/)

[88] [How we use Vale to improve our documentation editing process](https://www.datadoghq.com/blog/engineering/how-we-use-vale-to-improve-our-documentation-editing-process/)

[95] [Top 10 tips for Microsoft style and voice](https://learn.microsoft.com/en-us/style-guide/top-10-tips-style-voice)

[124] [Prompting Claude Fable 5.1 - Claude Platform Docs](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-fable-5-1)

[125] [Skill authoring best practices - Claude Platform Docs](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices)

[148] [writing-clearly-and-concisely (SKILL.md, obra/the-elements-of-style)](https://github.com/obra/the-elements-of-style/blob/main/skills/writing-clearly-and-concisely/SKILL.md)

[149] [writing-clearly-and-concisely (softaworks/agent-toolkit fork)](https://github.com/softaworks/agent-toolkit/blob/main/skills/writing-clearly-and-concisely/SKILL.md)

[150] [brainstorming (SKILL.md, obra/superpowers)](https://github.com/obra/superpowers/blob/main/skills/brainstorming/SKILL.md)

[151] [documentation-writer (Diátaxis Documentation Expert), github/awesome-copilot](https://github.com/github/awesome-copilot/blob/main/skills/documentation-writer/SKILL.md)

[152] [agent-style: The Elements of Agent Style (21 writing rules for AI agents)](https://github.com/yzhao062/agent-style)

[153] [Supercharge Your Tech Writing with Claude Code Subagents and Agent Skills](https://medium.com/google-cloud/supercharge-tech-writing-with-claude-code-subagents-and-agent-skills-44eb43e5a9b7)

[154] [Gemini CLI for Authors — Part 3: How to get LLMs to follow your style guidelines](https://medium.com/google-cloud/gemini-cli-for-authors-part-3-how-to-get-llms-to-follow-your-style-guidelines-8f3dad69cf42)

[155] [Vale — instructions for coding agents](https://vale.sh/AGENTS.md)

[156] [Vale: Your style, our editor](https://vale.sh/)

[157] [Documentation Style Guide | GitLab Docs](https://docs.gitlab.com/development/documentation/styleguide/)

[158] [Highlights | Google developer documentation style guide](https://developers.google.com/style/highlights)

[159] [Write accessible documentation | Google developer documentation style guide](https://developers.google.com/style/accessibility)

[161] [Bias-free communication - Microsoft Style Guide](https://learn.microsoft.com/en-us/style-guide/bias-free-communication)

[162] [alex — Catch insensitive, inconsiderate writing](https://github.com/get-alex/alex)

[163] [proselint: A linter for prose](https://github.com/amperser/proselint)

[164] [write-good: Naive linter for English prose](https://github.com/btford/write-good)

[165] [Create style rules – Grammarly Support](https://support.grammarly.com/hc/en-us/articles/360043832652-Create-style-rules)

[166] [Use Coaching with Copilot suggestions on how to improve your content in Word](https://techcommunity.microsoft.com/blog/microsoft365copilotblog/use-coaching-with-copilot-suggestions-on-how-to-improve-your-content-in-word/4264558)

[167] [Improve writing with Copilot | Microsoft Support](https://support.microsoft.com/en-us/word/copilot/improve-writing)

[168] [Write & edit with Gemini in Docs - Google Docs Editors Help](https://support.google.com/docs/answer/13951448)

[169] [Notion AI for docs (Notion help guide)](https://www.notion.com/help/guides/notion-ai-for-docs)

[170] [Wikipedia:Signs of AI writing](https://en.wikipedia.org/wiki/Wikipedia:Signs_of_AI_writing)

[171] [Delving into LLM-assisted writing in biomedical publications through excess vocabulary (orig. 'Delving into ChatGPT usage in academic writing through excess vocabulary')](https://arxiv.org/abs/2406.07016)

[172] [Mapping the Increasing Use of LLMs in Scientific Papers](https://arxiv.org/abs/2404.01268)

[173] [GPT detectors are biased against non-native English writers](https://arxiv.org/abs/2304.02819)

[174] [New AI classifier for indicating AI-written text](https://openai.com/index/new-ai-classifier-for-indicating-ai-written-text/)

[175] [People who frequently use ChatGPT for writing tasks are accurate and robust detectors of AI-generated text](https://arxiv.org/abs/2501.15654)

[176] [Antislop: A Comprehensive Framework for Identifying and Eliminating Repetitive Patterns in Language Models](https://arxiv.org/abs/2510.15061)

[177] [Anti-slopping: An innovation for rectifying LLM writing clichés](https://research.thoughtworks.com/library/anti-slopping-an-innovation-for-rectifying-llm-writing-cliches)

[178] [The vocabulary tells (and why the blacklist isn't the fix)](https://captainrandom.co.uk/learning/ai-prose-voice/the-vocabulary-tells/)

[179] [ANTI-SLOP REFERENCE (NousResearch/autonovel)](https://github.com/NousResearch/autonovel/blob/master/ANTI-SLOP.md)

[182] [Style guides, linters, and Vale: Why do tech writers need this?](https://tw-docs.com/docs/vale/vale-styleguides/)

[183] [Vale: a prose linter](https://lanceleonard.com/tips/doc/vale/)

[184] [anthropics/skills commit history for skills/doc-coauthoring/SKILL.md](https://github.com/anthropics/skills/commits/main/skills/doc-coauthoring/SKILL.md)
