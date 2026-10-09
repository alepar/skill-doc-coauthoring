# Dossier: Doc-type templates and cultures (design doc, RFC, PRD, ADR, postmortem, decision memo, PR/FAQ, Diataxis)

## Summary

Practitioner templates agree on a small core that each doc type then specializes. The core is: problem or background, goals with explicit non-goals, the proposal, alternatives including "do nothing", risks and drawbacks, open questions, and status metadata. What separates good from bad docs in these cultures is less about which sections a doc has and more about what each section does. Non-goals have to be things a reader could plausibly mistake for goals. Alternatives have to be real options at the same level of abstraction. Drawbacks have to be stated honestly. Open issues need a next step. The background has to pass a "random engineer" test. Each type also adds its own checks: ADRs list negative consequences, postmortems are blameless with quantified impact and verifiable action items, PRDs write acceptance criteria as test cases, and a PR/FAQ is under one page plus an FAQ of five pages or less. Review norms in these cultures (silent reading, general feedback before line-by-line comments, fixing confusion in the doc itself, "yes, if" or "not yet") map directly onto the skill's Reader Testing stage.

The strongest counter-current is template bloat and premature specification. Twitter's 14-page template, "one-way-door scrutiny" for every decision, and specs that act as a false sign of progress all argue that the skill should first decide whether a doc is needed and how large it should be, before building a scaffold. The main uncertainty: no source shows empirically that particular template sections improve outcomes. The evidence here is practitioner consensus plus one interview-based template revision (Twitter).

## Facet Questions and Scope
<!-- facet: F2 -->
What do the templates and cultures for each doc type prescribe (sections, the purpose of each section, length, review norms)? What makes them work, and when is writing a doc the wrong move? The scope covers engineering design docs and RFCs, PRDs, ADRs, postmortems, decision/action memos, Amazon narratives and PR/FAQs, and Diataxis for user documentation. General prose style and AI co-writing are excluded; other facets cover them.

## Source Groups and Findings

### Design docs and RFCs: purpose and core sections

The design doc is defined by its trade-offs, not by implementation detail.
- The design doc documents the high level implementation strategy and key design decisions with emphasis on the trade-offs that were considered during those decisions [33]. <!-- claim: 6fa5d2f4fe05e006; evidence: e652551401074249; source: f71efa2c2c0102dc -->
- A clear indicator that a design doc might not be necessary is a doc that is really an implementation manual, saying "This is how we are going to implement it" without going into trade-offs, alternatives, and decision making [33]. <!-- claim: 395086e9f4388aa6; evidence: 4a07d1a582b349df; source: f71efa2c2c0102dc -->
- For a larger project the sweet spot for a design doc seems to be around 10-20ish pages, detailed but short enough to be read by busy people [33]. <!-- claim: 02689281a8a7faf1; evidence: 59d5b2b45edcf5ae; source: f71efa2c2c0102dc -->
- Why is much more important than how, so if you need to cut anything, cut implementation detail over reasoning and alternatives [36]. <!-- claim: 8dadfbb2b6f0f666; evidence: dbfe2e034c300751; source: 17e86d9fc269045e -->

Twitter rebuilt its template from data, the closest thing in this corpus to an empirical test of templates.
- After interviews, Twitter authors and reviewers felt that most of the RFC template was superfluous and the level of detail in most docs was too high, with much content better suited for code review [57]. <!-- claim: 66011a19c8626b52; evidence: 78cf35083596ce63; source: 752507d9886b20e2 -->
- The trimmed template kept a problem statement, goals and non-goals, what success looks like and how it can be measured, a high-level overview of the solution proposal, details, alternatives considered, and risks [57]. <!-- claim: 230b1c89890c7398; evidence: 9664dcb4e62383ea; source: 752507d9886b20e2 -->
- RFC reviewers wanted to understand which assertions or behaviors in the design were dictated by a corresponding product spec versus made by the RFC author [57]. <!-- claim: 8551005e9d5fd778; evidence: 3ca8318d8b923a2f; source: 752507d9886b20e2 -->

The last finding implies that docs should label which constraints are inherited and which are the author's own choices.

### Section purposes: what each section must actually do

Goals and non-goals:
- Non-goals aren't negated goals like "The system shouldn't crash" but things that could reasonably be goals and are explicitly chosen not to be goals [33]. <!-- claim: 425e3b86d2e23059; evidence: 8255d685cd645e71; source: f71efa2c2c0102dc -->
- A better document additionally defines its non-scope, the topics not covered that the target audience might reasonably expect it to cover [2]. <!-- claim: 0be9fe71adb45f14; evidence: 5aecd4b94545b168; source: 27a619a70c947904 -->

Alternatives and drawbacks. Several sources independently say this section is where honesty is tested.
- The alternatives considered section can be succinct about solutions not selected, yet it is one of the most important sections because it shows explicitly why the selected solution is the best given the project goals [33]. <!-- claim: 21a0aad9ec12add5; evidence: 6c99862bec088e69; source: f71efa2c2c0102dc -->
- The most important alternative to see in a design is the default "do nothing" option [36]. <!-- claim: fbe58d3b8fa83f7a; evidence: 05961ea54e866ed6; source: 17e86d9fc269045e -->
- Rust's RFC template asks why this design is the best in the space of possible designs, what other designs were considered and why not chosen, and what is the impact of not doing this [38]. <!-- claim: fdda4fe6eda5b5f9; evidence: 198b6b8b9155e15f; source: bdfb1b0ef16511bc -->
- RFCs that do not present convincing motivation, demonstrate lack of understanding of the design's impact, or are disingenuous about the drawbacks or alternatives tend to be poorly-received [39]. <!-- claim: 831bbc98a50392a3; evidence: 158f702f1a69e31f; source: 16eac748ac2d76b0 -->
- Options should solve the given problem in the given context and be on the same level of abstraction, and pseudo-alternatives do not help [46]. <!-- claim: 504e711549616a58; evidence: bdbea4637b18606b; source: f86a0052b9b59889 -->
- The memo guidance says simplification of options needs justification beyond sandwiching a preferred option between formal alternatives [61]. <!-- claim: 9c6c30de3e286966; evidence: c41b30f9670f8eff; source: d54711ec63899589 -->
- A preference is more credible if it is openly disclosed and alternative views have been fully and adequately presented [61]. <!-- claim: 347f135a8baee690; evidence: 168b280365423283; source: d54711ec63899589 -->
- The memo checklist says issues of equal importance should take up equivalent space: the more important, the more space [61]. <!-- claim: 9c324be7f4e3e13f; evidence: 5b4c0b65d9578784; source: d54711ec63899589 -->

Open issues and abandoned ideas:
- Each open issues entry should explain the problem that requires more work, the options for resolving it, and the immediate next step [35]. <!-- claim: 38e4a160766b804c; evidence: 00a2aaf0803dd7ff; source: d4c3eaf303f7512a -->
- Rather than deleting abandoned ideas, the template asks authors to organize them into sections that make clear they're abandoned and explain why [43]. <!-- claim: c0943c2b6ddc4d50; evidence: 134c44f9f954b6ad; source: ad71038a6de1e158 -->

Background, layering, and length:
- If a random engineer shown the background section cannot acquire nearly full context on the necessity for the RFC, the background section is not full enough [43]. <!-- claim: e84db8de411e05b3; evidence: 7c6f2141cf79b6b8; source: ad71038a6de1e158 -->
- HashiCorp's RFC template is designed for readers to exit at any time, so someone who isn't a major stakeholder can review just the background and proposal sections [42]. <!-- claim: 6c0387568f88e24e; evidence: 687bb778bb024b02; source: 974e99d425cc39ba -->
- A common pitfall is too much detail: in most cases a background section takes only a paragraph or two, and a proposal takes one [42]. <!-- claim: 33e62ee03f03edc6; evidence: 64841095501452da; source: 974e99d425cc39ba -->
- A perfect design doc is written such that the reader is never surprised, anticipating every objection and preemptively showing why it's invalid [34]. <!-- claim: 5689e641bfee3f4c; evidence: d575bf6ae9c37e4d; source: be47be05ea0742de -->
- Unless you're an unusually terse writer, you can almost always cut length by ~30% from the first draft without sacrificing information [34]. <!-- claim: ff5f145fe4902246; evidence: 6333c87ea53facf9; source: be47be05ea0742de -->

My inference: a "never surprised" doc and an "exit at any time" doc together require the inverted pyramid. The opening has to stand alone for skimmers, and each later section builds only on what came before it.

Status metadata:
- Readers should easily understand whether to provide feedback and to whom, via metadata on author, date, and current state such as under review, approved, abandoned or implemented [36]. <!-- claim: cca13cb3f4cc7e9d; evidence: 72aba79a51328651; source: 17e86d9fc269045e -->
- Approvers say "yes" or "not yet" rather than "no", making clear what it would take to approve the idea [59]. <!-- claim: bb814193fa5af102; evidence: 8b76be3f28c3c3af; source: 10f720211b115b2f -->

### PRDs

- Most large projects start with a PRD to define the problem and are followed by an RFC to propose a solution [42]. <!-- claim: bfd03df0fd127ff4; evidence: 24fa792795b52097; source: 974e99d425cc39ba -->
- The PRD introduction is read first but should be authored last, so the author summarizes the final content rather than writing an introduction without knowing the end result [44]. <!-- claim: 1f2fd4069b5715c2; evidence: eb8e119a8d0f7a60; source: 404a58ca52b594ba -->
- PRD acceptance criteria should be written like test cases, objectively, so anybody can validate the criteria is met prior to release [44]. <!-- claim: 8f55e51ad09665fd; evidence: 8655ba19eec93b18; source: 404a58ca52b594ba -->
- Each PRD requirement's "Considerations" for the RFC writer should almost always be a question, not a suggestion [44]. <!-- claim: dc709a069239d0d8; evidence: 026bfb72511c0101; source: 404a58ca52b594ba -->

The last point marks the PRD/RFC boundary: a PRD poses questions to the solution author and does not prescribe solutions. The same source names user research as the PRD's most important section [44].

### ADRs

- The ADR Context section describes the forces at play, which are probably in tension, in value-neutral language that simply describes facts [45]. <!-- claim: 19e3542e3283a212; evidence: 9fe90f799b34df2e; source: 692ba2f113ff47ec -->
- All ADR consequences should be listed, not just the "positive" ones, because positive, negative, and neutral consequences all affect the team and project [45]. <!-- claim: 78d0a7dfde048f56; evidence: b8be0f3547224c5c; source: 692ba2f113ff47ec -->
- An ADR should be one or two pages long, written as if it is a conversation with a future developer [45]. <!-- claim: e77aef502790bc99; evidence: 3049cefa6cfaafe4; source: 692ba2f113ff47ec -->

MADR adds "Good, because ... / Bad, because ..." consequence bullets and an optional confirmation section, because deciding alone does not bring a decision to life [46].

### Postmortems

- A blamelessly written postmortem assumes that everyone involved had good intentions and did the right thing with the information they had [47]. <!-- claim: 345b85477b1f76e4; evidence: 9adf7c5475c068ba; source: a6a2489b213e99fa -->
- Postmortem review criteria ask whether key incident data was collected, impact assessments are complete, the root cause is sufficiently deep, the action plan is appropriate, and the outcome was shared with stakeholders [47]. <!-- claim: ed14e8cff671ed6d; evidence: 373e0e64ea88a969; source: a6a2489b213e99fa -->
- Action items with ambiguous phrases like "Improve" and "Make better" are vague and make it difficult to measure and understand success criteria [48]. <!-- claim: bf64e06ecef60004; evidence: b7b5231007e5d16c; source: 1a2646e9ad6d934d -->
- Animated language and dramatic descriptions erode psychological safety; instead provide verifiable data to justify the severity of a statement [48]. <!-- claim: ba50ca437cc22cd4; evidence: de279ce4a4d488ca; source: 1a2646e9ad6d934d -->

The Workbook's good example abstracts long chat transcripts and logs, links to the unedited versions, and balances verbosity against readability [48].

### Amazon narratives, PR/FAQ, tenets

- The press release is always less than one page and the FAQ should be five pages or less, with no awards for extra pages or more words [49]. <!-- claim: ddbbfcde67759205; evidence: 734c9e9c20848e22; source: f0f4a0a3df22e9ac -->
- An excellent FAQ anticipates the most important questions from every department and should be optimistic but also realistic [50]. <!-- claim: 8db3b9836029c5cc; evidence: 02f0ca71b20f3d4f; source: 609ed2a7cb1a2cff -->
- Great memos are written and re-written, shared with colleagues asked to improve the work, set aside for a couple of days, and then edited again with a fresh mind [16]. <!-- claim: 86d3928bd12af56d; evidence: 080daefe83c65e86; source: 55aae724f31dc193 -->
- To be effective a tenet needs an opposite which could be acceptable to an organisation, which prevents blindly obvious statements from becoming tenets [51]. <!-- claim: f0db69a491e4784e; evidence: 7efc912d50532766; source: 20494a696278848a -->

Bezos's 2004 email adds that bullet lists in a Word document are "just as bad as powerpoint", because narrative structure forces the writer to rank ideas and relate them to each other [11].

### Diataxis (user-facing documentation)

- Diataxis holds that there are four kinds of documentation, tutorials, how-to guides, reference and explanation, each with a different purpose and written in a different way [52]. <!-- claim: f6d6613f318c321b; evidence: 629977c673883b41; source: 10806d8ed39073c1 -->
- Crossing or blurring the boundaries in the Diataxis map is at the heart of a vast number of problems in documentation [52]. <!-- claim: 239ebad8238aaebf; evidence: 4fb4b3506410a95c; source: 10806d8ed39073c1 -->

The practical consequence is that a co-authoring skill should classify user documentation by reader need before scaffolding it, and should flag mixed modes. One example is a tutorial overloaded with explanation [52].

### Review norms

- The PR/FAQ meeting begins with 15-20 minutes of silent reading and note-taking [50]. <!-- claim: 3c2c15f2dc732dd4; evidence: f55cf3ee74b39bbc; source: 609ed2a7cb1a2cff -->
- When everyone has finished reading, the writer asks for general feedback, the most senior attendees speak last to avoid influencing others, and then the writer asks for specific comments line by line, paragraph by paragraph [49]. <!-- claim: 3352b6051f2d5e73; evidence: 70521a2f095547b4; source: f0f4a0a3df22e9ac -->
- Engineers weren't willing to bring RFCs until very polished, by which time the author was invested and major changes weren't welcome [59]. <!-- claim: 7f868254c7a1541b; evidence: 60c628bdc0ab4950; source: 10f720211b115b2f -->
- The free-text status field is used to be clear about the kind of review wanted, for example whether this is even a good idea for a first draft [59]. <!-- claim: a5b8b71009ab9a39; evidence: b66b0c9d19e0c691; source: 10f720211b115b2f -->
- When a reader asks a question or misunderstands, resolve the confusion in the doc itself rather than out of band in comment threads, chat, or email [63]. <!-- claim: 147d25a42771c610; evidence: e2d40360c29128f7; source: 02ed639372381754 -->
- If discussion remains open after two or three back-and-forths in margin notes, move it to an "Open Issues" section in the appendix [63]. <!-- claim: 668c28db10ebde5b; evidence: 5a69d244bf3bfa4f; source: 02ed639372381754 -->

Rust's process adds that before a final-comment period on a long discussion, someone writes a summary comment covering the current state, the major trade-offs, and the points of disagreement [39].

### When to write a doc, and how big

- If implementing an idea will take less time than writing it up, you can probably go ahead without an RFC [42]. <!-- claim: 254765c707ee6b7f; evidence: c029e6c09ef4b845; source: 974e99d425cc39ba -->
- A rule of thumb for whether a decision belongs in a design doc is to ask: what's the penalty for being wrong? [35]. <!-- claim: cd33fef4a9d6e2a1; evidence: d3afb88cb239ed3e; source: d4c3eaf303f7512a -->

## Counterevidence and Disagreements

**Template bloat.**
- The backend RFC Google Doc template had accumulated required sections from various "special interests" and was in the ballpark of 14 pages before being filled in [57]. <!-- claim: 92d3140619573231; evidence: 8cd76692c05cfca6; source: 752507d9886b20e2 -->
- Authors like checklists because they don't want to miss anything important, but they don't want to spend time cargo-culting written prose about how they went about doing X or consulting Z [57]. <!-- claim: 7ef5771feb030ffa; evidence: d24ff15448a5b8be; source: 752507d9886b20e2 -->

The fix the source proposes is to move compliance items into an actual checklist and not demand prose for them [57].

**Pre-specification is premature.**
- Design docs apply one-way-door scrutiny to every decision, including which JSON serialization library to use [56]. <!-- claim: 335ed2b2d15ecb21; evidence: a2f55b333bcc3b59; source: 977493b30487b0e1 -->
- The alternative proposed is to spend two days building a rough prototype and then write a short document capturing the real constraints, the surprising parts, and the decisions that matter [56]. <!-- claim: d420bbc853637291; evidence: 6213da1841bea707; source: 977493b30487b0e1 -->
- Specs can take too long to write, are seldom read, and their mere existence can serve as a false indicator to management that everything is proceeding fine [54]. <!-- claim: 4e890a79829eba29; evidence: 68a2ffedc06233c9; source: 5980d764b64d0db9 -->
- Unless a document is actually going to morph into something real, don't produce it [62]. <!-- claim: feb7f65c532b278a; evidence: 05a8b995d6a32bae; source: dadab3cc7f92fd03 -->

**Polish versus timeliness.** The sources disagree here. Bezos says great memos take a week or more and need a "fresh mind" pass [16]. Others argue for sharing rough drafts early:
- Notes are encouraged to be timely rather than polished, and explicit questions without attempted answers are acceptable [37]. <!-- claim: b87128b25c0a2e8d; evidence: 0f53ecc00c918aad; source: b5686afea4c94b5a -->
- Not every RFD is equal; some have more urgency and might not be as rigorous as others [37]. <!-- claim: dd34694f71f120e2; evidence: 632b35cfb86b59c1; source: b5686afea4c94b5a -->
- A design review checkbox on a launch checklist can result in sending a never-before-reviewed design document to review very late just to tick the box [58]. <!-- claim: 0ef6356bcf3722f8; evidence: c90de8a4a55a62bb; source: 70751c1c8f01c585 -->

Bertasi also says authors should spend no more than a few hours on a doc before sharing it [36], and Working Backwards says a first PR/FAQ draft should take only a few hours [50]. One reading reconciles them: draft rough and share early for direction, then polish heavily before the decision meeting. This is my synthesis; no source states it.

**Diataxis rigidity.**
- The critic found siloing documentation into four types overly opinionated and arbitrary as an information model and asked what research it was based on [53]. <!-- claim: 2a997df0480852a5; evidence: 28bd242dbb3d2b76; source: 76ecb0171807acbc -->

Procida's reply, as reported by Johnson, is that the four types are an analytical lens and not rigid buckets [53].

**Length norms differ by type and culture.** Accepted lengths range from 1-2 pages for an ADR [45], through a background of "a paragraph or two" at HashiCorp [42], to 10-20 pages for a large Google design doc [33]. So no single length target fits all types. Length should follow the doc type and the reader.

## Implications for doc-coauthoring SKILL.md

1. **Add a "do you need a doc, and how big?" triage to the Initial Offer or the start of Stage 1.** Ask what the penalty for being wrong is [35]. Ask whether implementing would take less time than writing [42]. Ask whether the doc will turn into something real [62]. Offer a "mini-doc" mode (one page: problem, decision, alternatives, risks, open questions) for reversible or small decisions [56]. Suggested text: *"Before scaffolding, check the stakes: if the decision is cheap to reverse, propose a one-page version and skip sections that would only be ceremony."*

2. **Replace "suggest 3-5 sections" with a doc-type map (reference file; table below).** Stage 2 currently guesses at sections. Seed each type with its core sections and let the user drop any section that would be ceremony [57].

3. **Make section purposes into gap checks.** In each section's "gap check" step, test the following. Is each non-goal something that could reasonably be a goal [33]? Is "do nothing" among the alternatives [36]? Are the alternatives real options at the same level of abstraction, with no sandwiching [46][61]? Are drawbacks stated honestly [39]? Does each open issue have options and a next step [35]? Does the background pass the random-engineer test [43]? Are inherited constraints separated from the author's choices [57]?

4. **Add a status/metadata header to the scaffold.** It should name the author, the date, the state (draft, under review, approved, abandoned), and the kind of feedback wanted [36][59].

5. **Order and sizing.** Keep "summary last", but state that the summary goes first in the doc, is written last, and must answer the reader's essential questions on its own [44][2]. Organize sections so readers can exit at any time [42]. Add a cutting pass that targets about 30% fewer words, cutting how before why [34][36]. Allocate space in proportion to importance [61].

6. **Stage 3: add type-specific reader-test prompts.** For a postmortem, give the fresh reader the SRE review criteria [47]. For a PRD, ask whether a stranger could check each acceptance criterion [44]. For an ADR, ask whether a future developer could tell why this decision was made over the alternatives [45]. For an RFC, ask the reviewer to look for disingenuous drawbacks [39]. Structure the sub-agent's feedback as a general reaction first, then line-by-line comments [49].

7. **Feedback loop rule.** When the reader-test agent or a human misreads something, fix it in the text and not in chat. Move anything that stays unresolved after 2-3 exchanges into Open Issues [63][36].

8. **Add an optional "set it aside, then re-read with a fresh mind" step to Final Review** for high-stakes narratives [16]. Note that early sharing of a rough draft is often more valuable than polish [37][59].

9. **Diataxis classification for user documentation.** If the doc is user-facing, ask which of tutorial, how-to, reference, or explanation it is. Flag any blending of these types [52], and treat the four types as a lens, not a strict rule [53].

### Reference table: doc type -> core sections -> type-specific checks

| Doc type | Core sections (default scaffold) | Type-specific checks |
|---|---|---|
| Design doc / RFC | Status header; Objective (1 sentence); Background; Goals / Non-goals; Proposal (overview then details); Alternatives (incl. do-nothing); Risks / Drawbacks; Open issues; Abandoned ideas (opt.) | Trade-offs explicit, not an implementation manual [33]; non-goals plausible [33]; alternatives real and same abstraction [46]; drawbacks honest [39]; background passes random-engineer test [43]; readable exit-at-any-time [42]; inherited vs author's constraints marked [57]; dependencies aware [59] |
| PRD | Summary (written last); Problem; User research; Personas/use cases; Requirements, each with Considerations; Acceptance criteria; Success metrics; Non-goals | Grounded in real user problems [44]; acceptance criteria testable by anyone [44]; considerations are questions, not solutions [44]; success definition and elevator pitch clear [55] |
| ADR | Title; Status; Context (forces, neutral); Considered options; Decision; Consequences (good/bad/neutral); Confirmation (opt.) | 1-2 pages, one decision [45]; context value-neutral [45]; negative consequences listed [45][46]; options not pseudo-alternatives [46] |
| Postmortem | Summary; Impact (quantified); Timeline; Root cause(s) and trigger; Detection/response; What went well/poorly/lucky; Action items (owner, priority, verifiable); Glossary; Links to raw data | Blameless [47]; no dramatic language, verifiable data [48]; no vague verbs like "improve" [48]; SRE review criteria [47]; context for audiences beyond the team [48] |
| Decision / action memo | Issue and recommendation up front; Background; Options (all major, no clutter); Analysis; Recommendation with disclosed bias; Next steps | No sandwiching [61]; preferences disclosed [61]; space proportional to importance [61] |
| Amazon narrative / PR-FAQ | PR (under 1 page: headline, problem, solution, quote, CTA); External FAQ; Internal FAQ (5 pages or less); Tenets (opt.) | Narrative prose, not bullets [11]; FAQ anticipates every department, optimistic but realistic [50]; tenets have an acceptable opposite [51]; silent-read test [50] |
| User docs (Diataxis) | One of: tutorial / how-to / reference / explanation | Single mode per page [52]; scope and non-scope stated [2][151]; no future-feature promises [157] |

## Methodological Limits and Open Gaps

- No empirical study links specific template sections to better outcomes. The Twitter revision [57] is based on interviews, not on measured outcomes.
- No primary Amazon six-pager template was retrieved. Six-pager guidance here comes from Bezos's letter and email [16][11], plus PR/FAQ material [49][50].
- Product-side PRD templates from Lenny, Figma, and Intercom were not retrieved. PRD coverage rests on HashiCorp [44] and Cagan [54][55], so it is thin for modern product cultures.
- The postmortem section templates in the table (timeline, "what went lucky") reflect general SRE practice. The anchored evidence covers philosophy and review criteria, not the full section list.
- Sources are mostly from large tech companies (Google, Amazon, HashiCorp, Rust). How well these norms fit small teams or non-engineering docs is inferred, not evidenced.

## Bibliography

[2] [Documents | Technical Writing One | Google for Developers](https://developers.google.com/tech-writing/one/documents)

[11] [Jeff Bezos Email Against PowerPoint Presentations (reproduces 2004 STeam email)](https://www.businessinsider.com/jeff-bezos-email-against-powerpoint-presentations-2015-7)

[16] [2017 Letter to Shareholders](https://www.aboutamazon.com/news/company-news/2017-letter-to-shareholders)

[33] [Design Docs at Google](https://www.industrialempathy.com/posts/design-docs-at-google/)

[34] [How to write a good design document](https://grantslatton.com/how-to-design-document)

[35] [How to Write an Effective Design Doc (Refactoring English excerpt)](https://refactoringenglish.com/excerpts/write-an-effective-design-doc/)

[36] [Better design docs](https://blog.mbrt.dev/posts/better-design-docs/)

[37] [RFD 1: Requests for Discussion](https://rfd.shared.oxide.computer/rfd/0001)

[38] [rust-lang/rfcs 0000-template.md](https://github.com/rust-lang/rfcs/blob/master/0000-template.md)

[39] [rust-lang/rfcs README (RFC process)](https://github.com/rust-lang/rfcs/blob/master/README.md)

[42] [Writing Practices and Culture (How HashiCorp Works)](https://www.hashicorp.com/en/how-hashicorp-works/articles/writing-practices-and-culture)

[43] [HashiCorp's RFC Template](https://www.hashicorp.com/en/how-hashicorp-works/articles/rfc-template)

[44] [PRD Template (HashiCorp Problem Requirements Document)](https://www.hashicorp.com/en/how-hashicorp-works/articles/prd-template)

[45] [Documenting Architecture Decisions](https://cognitect.com/blog/2011/11/15/documenting-architecture-decisions)

[46] [The Markdown ADR (MADR) Template Explained and Distilled](https://ozimmer.ch/practices/2022/11/22/MADRTemplatePrimer.html)

[47] [Postmortem Culture: Learning from Failure (Site Reliability Engineering, ch. 15)](https://sre.google/sre-book/postmortem-culture/)

[48] [Postmortem Culture: Learning from Failure (The Site Reliability Workbook, ch. 10)](https://sre.google/workbook/postmortem-culture/)

[49] [An insider look at Amazon's culture and processes (excerpt from Working Backwards)](https://www.aboutamazon.com/news/workplace/an-insider-look-at-amazons-culture-and-processes)

[50] [The Amazon Working Backwards PR/FAQ Process](https://workingbackwards.com/concepts/working-backwards-pr-faq-process/)

[51] [Tenets: supercharging decision-making](https://aws.amazon.com/blogs/enterprise-strategy/tenets-supercharging-decision-making/)

[52] [Start here - Diátaxis in five minutes](https://diataxis.fr/start-here/)

[53] [What is Diátaxis and should you be using it with your documentation?](https://idratherbewriting.com/blog/what-is-diataxis-documentation-framework)

[54] [Revisiting the Product Spec](https://www.svpg.com/revisiting-the-product-spec/)

[55] [How To Write a Good PRD](https://www.svpg.com/wp-content/uploads/2024/07/How-To-Write-a-Good-PRD.pdf)

[56] [Design docs considered harmful](https://www.lucasfcosta.com/blog/design-docs)

[57] [Goals and Failure Modes for RFCs and Technical Design Documents](https://betterprogramming.pub/goals-and-failure-modes-for-rfcs-and-technical-design-documents-c4ee1d1da6ff)

[58] [Never approve design docs](https://josvisser.substack.com/p/never-approve-design-docs)

[59] [The Power of "Yes, if": Iterating on our RFC Process](https://engineering.squarespace.com/blog/2019/the-power-of-yes-if)

[61] [Option and Decision Memos: Basic Components / Checklist for Writing Action Memoranda](https://shorensteincenter.org/wp-content/uploads/2013/07/MEMO-WRITING-HO-ALL-Danziger.pdf)

[62] [Don't Do Dead Documents (Getting Real)](https://basecamp.com/gettingreal/11.2-dont-do-dead-documents)

[63] [How to Get Meaningful Feedback on Your Design Document](https://refactoringenglish.com/blog/useful-feedback-on-design-docs/)

[151] [documentation-writer (Diátaxis Documentation Expert), github/awesome-copilot](https://github.com/github/awesome-copilot/blob/main/skills/documentation-writer/SKILL.md)

[157] [Documentation Style Guide | GitLab Docs](https://docs.gitlab.com/development/documentation/styleguide/)
