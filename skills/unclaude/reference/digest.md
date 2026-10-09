# unclaude digest

The entries lanes, scouts and the reviewer cite. Ids: **X** cross-family patterns, **C** Claude, **O** OpenAI, **G** Gemini, **V** verification, **N** numbers and precision, **R** rules binding on the reviewer, **K** keep list. Strength grades: **P** peer-reviewed study; **V** vendor documentation; **W** Wikipedia editorial consensus; **I** industry or practitioner measurement; **H** heuristic or inference. Thresholds marked (h) are heuristics with no validated source.

Derived from `research/unclaude/report.md` (UltraDeep run, October 2026), which carries the full evidence and bibliography. Per-model rates come mostly from 2026 industry studies and go stale with each model release; pattern classes last longer than their surface forms.

Two principles govern every lane:
- **Clusters, not single hits.** Fixed AI-vocabulary lists perform near chance as detectors; expert readers who use LLMs heavily succeed by combining cues. A `[weak]` hunt item is a finding only with another tell in the same paragraph or above its density threshold.
- **Fix the cause, never optimize for a detector.** Detectors are unreliable and biased against non-native writers; paraphrasing defeats them without improving the text.

## Cross-family patterns (X)

### X01 Excess style vocabulary
Readers: all. Look for rare high-ratio words (delve, showcasing, underscores, tapestry, testament, intricate, meticulous, realm, pivotal, commendable) and density of common style words (crucial, significant, comprehensive, additionally, notably). Fix: delete, or use the plainest word; replace evaluative adjectives with facts. Over-correction: same-register synonym swaps; stripping words used in their literal or technical sense. Strength: P + W.
**Sources:** [Kobak et al., excess vocabulary](https://arxiv.org/abs/2406.07016) · [Liang et al., peer reviews](https://arxiv.org/abs/2403.07183) · [Liang et al., papers](https://arxiv.org/abs/2404.01268) · [Wikipedia: Signs of AI writing](https://en.wikipedia.org/wiki/Wikipedia:Signs_of_AI_writing)

### X02 Lexical lists drift; density and position, not presence
Readers: all. Look for co-occurring list words in one paragraph, hits in first or last sentences, sentence-initial transitions. Fix: treat single hits as weak; refresh era-tagged lists each model generation. Over-correction: treating any listed word as proof; aiming for zero listed words. Between consecutive versions of one model family, 55–72% of tells are unique to one version. Strength: P + I.
**Sources:** [Vocabulary lists as detectors (BEA 2025)](https://aclanthology.org/2025.bea-1.71/) · [Graphite: AI tells](https://graphite.io/five-percent/research/ai-tells) · [ScriptGrain: the AI tells moved](https://scriptgrain.com/research/the-ai-tells-moved) · [SpeechMap vocabulary](https://speechmap.ai/experiments/vocab/)

### X03 Copula avoidance and stiff synonyms
Readers: all. Look for serves as, stands as, functions as, represents a, boasts, features, utilize, facilitate. Fix: is/are/has; plain verbs. Over-correction: none known, but AI copyedits introduce "serves as", so the reviewer must not. Strength: P + W.
**Sources:** [Is ChatGPT transforming academics' writing style?](https://arxiv.org/abs/2404.08627) · [Wikipedia: Signs of AI writing](https://en.wikipedia.org/wiki/Wikipedia:Signs_of_AI_writing)

### X04 Negative parallelism and contrast frames
Readers: all. Look for not X but Y; it's not X, it's Y; X rather than (merely) Y; less like X, more like Y; "No X. No Y. Just Z." Fix: state Y directly. Over-correction: deleting contrasts that correct a belief the reader actually holds. Strength: W + V + I.
**Sources:** [Wikipedia: Signs of AI writing](https://en.wikipedia.org/wiki/Wikipedia:Signs_of_AI_writing) · [OpenAI latest-model guide](https://developers.openai.com/api/docs/guides/latest-model) · [Graphite: AI tells](https://graphite.io/five-percent/research/ai-tells) · [The negative-parallelism tic](https://brandonlazovic.dev/articles/llm-negative-parallelism-tic/)

### X05 Rule of three
Readers: all; strongest GPT-5.x. Look for back-to-back triads, triads of near-synonyms, empty third items. Fix: keep the informative items. Over-correction: forcing every list to two items. Strength: W + I, contested.
**Sources:** [Wikipedia: Signs of AI writing](https://en.wikipedia.org/wiki/Wikipedia:Signs_of_AI_writing) · [Russell et al., expert detectors](https://arxiv.org/abs/2501.15654) · [AI Writing Benchmark](https://aiwritingbenchmark.com/insights/which-ai-sounds-least-like-ai/)

### X06 Em-dash density, version-aware
Readers: Claude Fable 5.x and Opus 4.x, GPT-4o and 4.1; low relevance for Opus 5.5, GPT-5/6 and Gemini 3. Look for a rate above about 4 per 1,000 words (h) or above the writer's own rate; two per sentence; "it's not X — it's Y". Fix: choose the punctuation the clause relation needs. Over-correction: a zero-dash rule; semicolon or comma monotony; stripping hyphens. Strength: I.
**Sources:** [The Last Fingerprint: Markdown training and LLM prose](https://arxiv.org/abs/2603.27006) · [Economist on AI writing (via Daring Fireball)](https://daringfireball.net/linked/2026/08/11/economist-ai-writing) · [Opus 5.5 em-dash drop (VentureBeat)](https://venturebeat.com/data/claude-opus-5-5-uses-em-dashes-99-less-often-and-sounds-more-human-but-still-exhibits-2-548-ai-writing-tells)

### X07 Throat-clearing pivots, colon reveals and signposting
Readers: all. Look for Here's the thing; Here's where it gets interesting; Let's dive in; The real question is; contentless "X:" reveals; "Question? Answer."; announcing the structure. Fix: delete the run-up; lead with the claim. Over-correction: deleting "deep dive" used as ordinary jargon. Strength: I + V.
**Sources:** [underslop: Here's the thing](https://underslop.com/tells/heres-the-thing) · [OpenAI latest-model guide](https://developers.openai.com/api/docs/guides/latest-model) · [Catalog of Claude clichés](https://www.linkandth.ink/p/catalog-of-claude-cliches)

### X08 Summary closers and portable intros
Readers: all. Look for In summary, In conclusion, Overall, Ultimately, In short:, Bottom Line:; one-line restating closers; "In today's fast-paced world" openers. Fix: end on the last concrete fact; start with the first specific sentence. Over-correction: deleting summaries the genre requires. Strength: P + W + V.
**Sources:** [Russell et al., expert detectors](https://arxiv.org/abs/2501.15654) · [Wikipedia: Signs of AI writing](https://en.wikipedia.org/wiki/Wikipedia:Signs_of_AI_writing) · [OpenAI latest-model guide](https://developers.openai.com/api/docs/guides/latest-model)

### X09 Formatting in prose contexts
Readers: GPT and Gemini strongest; Claude before Fable. Look for bold-label bullets, mechanical bold, small tables, title-case or generic headings, any formatting in personal messages, fragment bullets. Fix: prose with inline series; sentence case; remove decoration. Over-correction: stripping structure that technical or reference content needs. Strength: W + P + V.
**Sources:** [Wikipedia: Signs of AI writing](https://en.wikipedia.org/wiki/Wikipedia:Signs_of_AI_writing) · [Idiosyncrasies in large language models](https://arxiv.org/abs/2502.12150) · [Prompting Claude Fable 5.1](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-fable-5-1)

### X10 Dense, uniform register
Readers: all. Look for participial riders, nominalization clusters, long under-punctuated "and"-chains, runs of similar-length sentences, no parentheticals or questions. Fix: finite verbs with named subjects; vary sentences by function. Over-correction: staccato fragments. Strength: P + journalism.
**Sources:** [Do LLMs write like humans? (Biber features)](https://arxiv.org/abs/2410.16107) · [Notes on LLM style](https://www.refsmmat.com/notebooks/llm-style.html) · [Economist via Fast Company](https://www.fastcompany.com/91584243/how-to-identify-ai-generated-writing-viral-report-has-surprising-new-clues-economist)

### X11 Inflated significance and puffery
Readers: all. Look for a testament to; pivotal role; underscores the importance; reflects broader; vibrant, nestled, boasts; legacy endings. Fix: keep the fact, drop the significance. Over-correction: removing sourced significance claims. Strength: W + P.
**Sources:** [Wikipedia: Signs of AI writing](https://en.wikipedia.org/wiki/Wikipedia:Signs_of_AI_writing) · [Art or Artifice (creative-writing evaluation)](https://arxiv.org/abs/2309.14556)

### X12 Vague attribution and vague relations
Readers: all. Look for experts say; observers note; associated with; linked to; one source behind a plural attribution. Fix: name the source and the relation, or cut. Over-correction: inventing a source or relation. Strength: W.
**Sources:** [Wikipedia: Signs of AI writing](https://en.wikipedia.org/wiki/Wikipedia:Signs_of_AI_writing) · [WikiProject AI Cleanup guide](https://en.wikipedia.org/wiki/Wikipedia:WikiProject_AI_Cleanup/Guide_and_resources)

### X13 Formulaic hedges versus calibration
Readers: all; GPT-6 strongest. Look for it's important to note; no one-size-fits-all; may vary; hedge stacks; caveat bloat. Fix: verify, then delete the formula or replace it with one precise qualifier. Over-correction: making unverified claims sound certain. Strength: V + W; counterevidence P (hedging is standard scientific practice).
**Sources:** [OpenAI Model Spec](https://model-spec.openai.com/2026-08-18.html) · [Wikipedia: Signs of AI writing](https://en.wikipedia.org/wiki/Wikipedia:Signs_of_AI_writing) · [Hedging in academic writing (ERIC)](https://files.eric.ed.gov/fulltext/ED390258.pdf)

### X14 Sycophancy and validation openers
Readers: all. Look for You're absolutely right; Great question; agreement with nothing to agree with; praise with no reason. Fix: delete; start with the content. Over-correction: deleting reasoned agreement. Strength: P + V.
**Sources:** [Towards understanding sycophancy](https://arxiv.org/abs/2310.13548) · [OpenAI: sycophancy in GPT-4o](https://openai.com/index/sycophancy-in-gpt-4o/) · [claude-code issue 3382](https://github.com/anthropics/claude-code/issues/3382)

### X15 Chat residue and offers
Readers: all. Look for I hope this helps; Let me know if; Would you like me to; Shall I; knowledge-cutoff disclaimers; placeholders; restating the question. Fix: delete; replace an offer with the action taken. Over-correction: deleting courtesy in a letter the user asked for. Strength: W + V + I.
**Sources:** [Wikipedia: Signs of AI writing](https://en.wikipedia.org/wiki/Wikipedia:Signs_of_AI_writing) · [Prompting Claude Opus 5.5](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-opus-5-5) · [GPT-5.1 prompting guide](https://developers.openai.com/cookbook/examples/gpt-5/gpt-5-1_prompting_guide)

### X16 Mannered and purple prose, clichés
Readers: all; strongest Claude and Gemini. Look for metaphor in place of a literal statement; personified abstractions; "the [N] of [adj] [N]"; stock imagery. Fix: the literal phrase. Over-correction: an LLM fixer swapping one cliché for another. Strength: P + V + I.
**Sources:** [LAMP: expert edits of AI prose](https://arxiv.org/abs/2409.14509) · [Prompting Claude Fable 5.1](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-fable-5-1) · [Signal Box: Opus 5.5 articles vs novels](https://research.signalbox.studio/research/opus-5-5-articles-vs-novels/)

### X17 Generic over specific
Readers: all. Look for category nouns, unsupported praise, sweeping openers, irrelevant paragraphs. Fix: cut, narrow, or move up an existing specific; otherwise flag for the author. Over-correction: inventing specifics. Strength: P.
**Sources:** [LAMP: expert edits of AI prose](https://arxiv.org/abs/2409.14509) · [Russell et al., expert detectors](https://arxiv.org/abs/2501.15654) · [Anti-slop reference (NousResearch)](https://github.com/NousResearch/autonovel/blob/master/ANTI-SLOP.md)

### X18 Redundant exposition and meta-text
Readers: all; Opus 5 long deliverables. Look for gloss tails, spelled-out subtext, "This section will…", repeated summaries, edit narration. Fix: delete. Over-correction: deleting summaries the genre requires. Strength: P + W + V.
**Sources:** [LAMP: expert edits of AI prose](https://arxiv.org/abs/2409.14509) · [Prompting Claude Opus 5](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-opus-5)

### X19 Missing stance and homogenized content
Readers: all. Look for balanced pro and con with no verdict; avoidance of any claim someone could dispute. Fix: state the position the text's own evidence supports, or flag. Over-correction: manufactured opinion or contrarianism. Strength: P.
**Sources:** [Notes on LLM style](https://www.refsmmat.com/notebooks/llm-style.html) · [Writing with LMs reduces content diversity](https://arxiv.org/abs/2309.05196)

### X20 Templated specifics
Readers: all. Look for Emily/Sarah/Elara/Kael; "Dr. X, a researcher at Y"; round unsourced figures; scene-setting openers. Fix: flag for verification; never substitute another invented name. Strength: P.
**Sources:** [Russell et al., expert detectors](https://arxiv.org/abs/2501.15654) · [Expert detection guide (Russell et al.)](https://github.com/jenna-russell/human_detectors/blob/main/prompts/detection_guide.txt)

### X21 Availability hedges with gap-filling
Readers: all; strongest GPT-5/6. Look for not widely documented; limited information; maintains a low profile; then a plausible guess. Fix: say what the source shows; delete the guess. Strength: W.
**Sources:** [Wikipedia: Signs of AI writing](https://en.wikipedia.org/wiki/Wikipedia:Signs_of_AI_writing)

## Claude (C)

### C01 Sincerity and candor markers
genuinely, honestly, straightforward(ly), "the honest answer", "to be clear" on the writer's own claims. Anthropic's own system prompt discourages them. Fix: delete. Strength: V + I.
**Sources:** [Claude Fable 5.1 system prompt](https://platform.claude.com/docs/en/release-notes/system-prompts/claude-fable-5-1) · [claudisms.ai](https://claudisms.ai/)

### C02 Superlatives, self-ranking and significance flags
"single most", "arguably the most", "every single", "the whole game", "matters because" (about 130× the human rate), Opus 5.5's "can help you". Fix: give the criterion or delete. Strength: I.
**Sources:** [Graphite: AI tells](https://graphite.io/five-percent/research/ai-tells) · [Catalog of Claude clichés](https://www.linkandth.ink/p/catalog-of-claude-cliches)

### C03 Claude contrast frames
"rather than merely" (about 160×), "less like a _ and more like" (about 105×), binary aphoristic enders, validate-then-refine. Strength: I.
**Sources:** [Graphite: AI tells](https://graphite.io/five-percent/research/ai-tells) · [Catalog of Claude clichés](https://www.linkandth.ink/p/catalog-of-claude-cliches)

### C04 Em-dash history
Opus 4.6 about 9 per 1,000 words; Fable 5 about 12; Opus 5.5 about 0.015. Use the model version when known; otherwise treat dashes as weak. Strength: I.
**Sources:** [The Last Fingerprint: Markdown training and LLM prose](https://arxiv.org/abs/2603.27006) · [Opus 5.5 em-dash drop (VentureBeat)](https://venturebeat.com/data/claude-opus-5-5-uses-em-dashes-99-less-often-and-sounds-more-human-but-still-exhibits-2-548-ai-writing-tells)

### C05 Formatting and length drift
Claude 3.5 to 4 over-bulleted in chat; Fable 5.1 under-formats with dense long sentences; Opus 5 writes long deliverables with filler sections. Fix: match the shape to the content; do not strip needed structure. Strength: V + P.
**Sources:** [Prompting Claude Fable 5.1](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-fable-5-1) · [Prompting Claude Opus 5](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-opus-5)

### C06 Sycophancy forms
"You're absolutely right!" (Claude 4.x); validate-then-refine (Claude 5.x). Strength: V + I.
**Sources:** [claude-code issue 3382](https://github.com/anthropics/claude-code/issues/3382) · [Catalog of Claude clichés](https://www.linkandth.ink/p/catalog-of-claude-cliches)

### C07 Agentic narration and offers
"Next, I'll…", "Shall I apply this?", "Want me to…?", "unless you'd prefer otherwise", a recap ending in an announced next step. Fix: delete; report the action taken. Strength: V.
**Sources:** [Prompting Claude Fable 5.1](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-fable-5-1) · [Prompting Claude Opus 5.5](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-opus-5-5)

### C08 Mannered prose and figurative drift
"a dial worth turning", "earns its keep", "load-bearing", "shape", "lives" (placement metaphor), "quietly"; Opus 5.5 similes (+112%) and personification (+55%). Fix: the literal phrase. Strength: V + I.
**Sources:** [Prompting Claude Fable 5.1](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-fable-5-1) · [Graphite: AI tells](https://graphite.io/five-percent/research/ai-tells) · [Signal Box: Opus 5.5](https://research.signalbox.studio/research/opus-5-5-articles-vs-novels/)

## OpenAI (O)

### O01 GPT-6 published slop list
Bottom Line:, delve, foster, leverage, it's worth noting, importantly, genuinely, hyphenated compound descriptions, In short:, "The simplest mental model is:". Strength: V.
**Sources:** [OpenAI latest-model guide](https://developers.openai.com/api/docs/guides/latest-model)

### O02 GPT contrast and corrective frames
"the X is not simply", "This isn't about X. It's about Y.", "X, not Y" with an alternative nobody raised, "Question? Answer." Strength: V + I.
**Sources:** [OpenAI latest-model guide](https://developers.openai.com/api/docs/guides/latest-model) · [Graphite: AI tells](https://graphite.io/five-percent/research/ai-tells)

### O03 GPT formatting defaults
GPT-6 Astra leans to lists, tables and Markdown; GPT-4o bold-labelled enumerations and markdown titles. Strength: V + P.
**Sources:** [OpenAI latest-model guide](https://developers.openai.com/api/docs/guides/latest-model) · [Idiosyncrasies in large language models](https://arxiv.org/abs/2502.12150)

### O04 GPT hedging and qualification
"may provide", "not necessarily", over-qualification; GPT-4o downtoners. Strength: I + P.
**Sources:** [Graphite: AI tells](https://graphite.io/five-percent/research/ai-tells) · [Do LLMs write like humans? (Biber features)](https://arxiv.org/abs/2410.16107)

### O05 GPT sycophancy and acknowledgement tokens
GPT-4o's April 2025 flattery; "got it", "Thanks for checking in"; generic praise and sign-offs. Strength: V.
**Sources:** [OpenAI: sycophancy in GPT-4o](https://openai.com/index/sycophancy-in-gpt-4o/) · [GPT-5.1 prompting guide](https://developers.openai.com/cookbook/examples/gpt-5/gpt-5-1_prompting_guide)

### O06 GPT-5.x figurative tics and triads
Goblin/gremlin creature metaphors (GPT-5.1 to 5.5); three-item lists at about 3 per 1,000 words; "not just X". Strength: V + I.
**Sources:** [OpenAI: where the goblins came from](https://openai.com/index/where-the-goblins-came-from/) · [AI Writing Benchmark](https://aiwritingbenchmark.com/insights/which-ai-sounds-least-like-ai/)

## Gemini (G)

### G01 Gemini tells (low confidence)
Intensifiers (incredibly, absolutely); formal transitions (furthermore, additionally); "this comprehensive guide"; "is not just a X, it is"; no contractions; high formality with careful hedging; unrequested bullets and intro-body-summary sections. Strength: I.
**Sources:** [Graphite: AI tells](https://graphite.io/five-percent/research/ai-tells) · [Idiosyncrasies in large language models](https://arxiv.org/abs/2502.12150)

## Verification (V)

### V01 Quotations must match their source
A quotation attributed to a person, document or URL must match the source verbatim (modulo typographic quotes and whitespace). The protect pass fetches each reachable source and checks. A mismatch is a finding; the fix restores the source's wording or removes the quotation marks and paraphrases accurately. A quote whose source cannot be reached stays protected and is listed as unverified. Strength: practitioner (fact-checking practice).
**Sources:** [KSJ Science Editing Handbook: the fact-checking process](https://ksjhandbook.org/fact-checking-science-journalism-how-to-make-sure-your-stories-are-true/the-fact-checking-process/) · [Wikipedia: Signs of AI writing](https://en.wikipedia.org/wiki/Wikipedia:Signs_of_AI_writing)

### V02 Load-bearing claims need a checkable source
Check claims one at a time against the source that owns each: numbers, names, dates, system behaviors, commitments and causal claims first. Extract each as a self-contained statement, route it (executed `--help` or docs tests for commands, code at the current revision for behavior, manifests for versions, version-pinned upstream docs for third-party tools, primary sources for public facts), and verify it in an agent that does not see the draft: a verifier that can see the text repeats its errors. Verdicts: holds, contradicted, stale-source, unverifiable, author-only; every verdict but the last two quotes its evidence. Contradicted means fix; unverifiable means ask the author. Strength: P + practitioner.
**Sources:** [Chain-of-Verification](https://arxiv.org/abs/2309.11495) · [FActScore](https://arxiv.org/abs/2305.14251) · [Long-form factuality (SAFE)](https://arxiv.org/abs/2403.18802) · [FacTool](https://arxiv.org/abs/2307.13528) · [KSJ: the fact-checking process](https://ksjhandbook.org/fact-checking-science-journalism-how-to-make-sure-your-stories-are-true/the-fact-checking-process/) · research: `research/claim-verification/report.md`

### V03 AI drafts introduce plausible specifics that need checking
Workers using AI on tasks outside its competence produced confident wrong answers; verification of what the model introduced is the human's main job. Strength: P.
**Sources:** [Jagged technological frontier (field experiment)](https://mitsloan.mit.edu/sites/default/files/2023-10/SSRN-id4573321.pdf) · [Generative AI and critical thinking (survey)](https://advait.org/files/lee_2025_ai_critical_thinking_survey.pdf)

## Numbers and precision (N)

Added for /unclaude after the research run, from the numeracy and uncertainty-communication literature.

### N01 Round to the precision the uncertainty supports
Reporting more digits than the measurement or estimate supports implies confidence that does not exist (false precision). Estimates and projections should carry the digits their uncertainty supports, usually two significant figures. Strength: P + W.
**Sources:** [Cole, "Too many digits" (Arch Dis Child 2015)](https://doi.org/10.1136/archdischild-2014-307149) · [False precision (Wikipedia)](https://en.wikipedia.org/wiki/False_precision)

### N02 Two effective digits for reading and comparison
Ehrenberg argues that readers can only compare and remember numbers rounded to two effective (varying) digits; extra digits are noise for the reader's task. Strength: P (argument with worked examples, not a controlled study).
**Sources:** [Ehrenberg, "Rudiments of Numeracy" (JRSS A 1977)](https://doi.org/10.2307/2344922) · [Cole, "Too many digits"](https://doi.org/10.1136/archdischild-2014-307149)

### N03 State uncertainty as a range when it matters
Expressing uncertainty numerically (a range, an interval, "about") communicates it without materially reducing trust in the number or its source; verbal hedges alone do reduce trust. Prefer "$1–1.5M" or "~$1.2M" over a bare "$1,234,567" for an estimate. Strength: P.
**Sources:** [van der Bles et al., effects on trust (PNAS 2020)](https://doi.org/10.1073/pnas.1913678117) · [van der Bles et al., communicating uncertainty (R Soc Open Sci 2019)](https://doi.org/10.1098/rsos.181870)

### N04 Precision should match the audience's decision
A number's precision should match what the reader decides with it. An executive or strategy document gains nothing from cents or exact headcounts; the extra digits cost attention and imply false certainty. Strength: H, consistent with N01 and N02.
**Sources:** [Ehrenberg, "Rudiments of Numeracy"](https://doi.org/10.2307/2344922)

### N05 One quantity, one presentation
The same quantity should appear with the same value and precision everywhere in a document; derived figures cannot be more precise than their inputs. Strength: H + W.
**Sources:** [False precision (Wikipedia)](https://en.wikipedia.org/wiki/False_precision)

## Reviewer rules (R), binding on the reviewer and checked by the guard

### R01 No fabrication
Add no fact, name, number, date, quote, citation, relation, range or opinion that the text, its cited sources or the author did not supply. Flag gaps as `[AUTHOR: …]`.
**Sources:** [humanizer skill](https://github.com/blader/humanizer/blob/main/SKILL.md) · [unslop](https://github.com/theclaymethod/unslop) · [LAMP](https://arxiv.org/abs/2409.14509)

### R02 Protected spans
Never edit protected spans (verified quotations, code, URLs, paths, proper names, terms of art, text that mentions a phrase rather than uses it). Never soften force-bearing never/must/all in rules. A quotation that failed verification (V01) is not protected; fix it to the source.
**Sources:** [unslop](https://github.com/theclaymethod/unslop) · [Pangram: the slop-2 problem](https://www.pangram.com/blog/ai-humanizers-the-slop-2-problem)

### R03 Smallest sufficient edit
Replace with the plainest phrasing, then cut, and insert only as a last resort. If a finding is doubtful, make no edit. Rewrite a whole paragraph only when two or more findings land in it.
**Sources:** [LAMP](https://arxiv.org/abs/2409.14509) · [unslop](https://github.com/theclaymethod/unslop)

### R04 Verify before de-hedging
Delete a hedge only when the claim is supported; otherwise use one precise qualifier.
**Sources:** [Proofed AI editing checklist](https://proofed.com/knowledge-hub/ai-editing-checklist-how-to-spot-and-fix-ai-writing-patterns) · [humanizer skill](https://github.com/blader/humanizer/blob/main/SKILL.md)

### R05 The writer's sample overrides rates
If a writer sample is supplied and it uses dashes, contractions or a register at a similar rate, keep them.
**Sources:** [humanizer](https://github.com/blader/humanizer) · [Proofed AI editing checklist](https://proofed.com/knowledge-hub/ai-editing-checklist-how-to-spot-and-fix-ai-writing-patterns)

### R06 No staccato, no stock substitutes
Never chop sentences into fragments, swap dashes for semicolons by reflex, strip hyphens from compounds, or rotate synonyms for "said".
**Sources:** [avoid-ai-writing](https://github.com/conorbronsdon/avoid-ai-writing) · [Humanizer stress test](https://ankitvora2.substack.com/p/day-1-of-testing-ai-agents-humanizer)

### R07 No humanizing theatre
Never inject first-person anecdotes, slang, rhetorical questions, typos or a personality the text lacked.
**Sources:** [unslop](https://github.com/theclaymethod/unslop) · [Wired: the anti-AI literary counterculture](https://www.wired.com/story/more-typos-fewer-em-dashes-writers-are-creating-an-anti-ai-literary-counterculture/)

### R08 No cliché swaps
Replacing a cliché or figure with another figure is not a fix; use the literal claim.
**Sources:** [LAMP](https://arxiv.org/abs/2409.14509) · [Prompting Claude Fable 5.1](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-fable-5-1)

### R09 Preserve voice and meaning
A rewrite that clears every flag but loses the author's cadence, stance or content has failed. Keep the length within about ±25% of the original (h) unless findings demanded cuts.
**Sources:** [avoid-ai-writing](https://github.com/conorbronsdon/avoid-ai-writing) · [Humanizer stress test](https://ankitvora2.substack.com/p/day-1-of-testing-ai-agents-humanizer)

### R10 Detector scores are not the target
Do not optimize for detector output; paraphrasing defeats detectors without improving writing.
**Sources:** [Paraphrasing evades detectors](https://arxiv.org/abs/2303.13408) · [Can AI-generated text be reliably detected?](https://arxiv.org/abs/2303.11156)

### R11 References section
When the claims lane recorded external sources (URLs, DOIs), end the document with a References section listing each one the text relies on, and link claims to it in the document's own citation style. Keep any existing references section and merge into it; never list a source nobody checked. Local paths are evidence, not references: a project's own README or docs do not cite their own tree or the author's machine.

## Keep list: do not flag (K)

- **K1** Run-in bold labels, parallel list items and lead-in sentences in technical, reference and how-to documents that follow a style guide. ([Google style: lists](https://developers.google.com/style/lists))
- **K2** Descriptive headings and question headings in long, scannable documents. ([GOV.UK: clear structure](https://guidance.publishing.service.gov.uk/writing-to-gov-uk-standards/writing-guidelines/clear-structure/))
- **K3** Em dashes at or below the writer's own rate, or below about 4 per 1,000 words when no sample exists (h); dashes in ranges, code and compound modifiers.
- **K4** Calibrated hedges in academic, scientific, legal, medical and safety writing; single ordinary hedges (perhaps, likely, tends to).
- **K5** A single occurrence of a listed word (delve, crucial, robust, key) with no other tell nearby; humans use them, and 31% of expert annotators' explanations for their false positives cited such vocabulary in human-written text. ([Russell et al.](https://arxiv.org/abs/2501.15654))
- **K6** Listed words in their literal or technical sense: robust estimator, cryptographic key, landscape orientation, Kerberos realm, load-bearing wall, foster care.
- **K7** Positive or hype words in academic abstracts as such; they rose for decades before LLMs. ([BMJ 2015](https://doi.org/10.1136/bmj.h6467))
- **K8** Superlatives and intensifiers that are literally true; "very", "perhaps", "in order to", "the fact that" and plain is/has lean human.
- **K9** A contrast that corrects a belief the reader plausibly holds, or where both halves carry information.
- **K10** "Deep dive" used as ordinary jargon, as distinct from "Let's dive in".
- **K11** Literal three-item enumerations, and the tricolon as deliberate rhetoric.
- **K12** Elegant variation and essay connectives (furthermore, in conclusion) by student or non-native writers taught to use them. Detectors flagged 61% of essays by non-native writers as AI.
- **K13** Plain vocabulary, simple syntax and low lexical diversity; never make plain prose fancier.
- **K14** Correct grammar, formal register, neutral tone, and mixed casual and formal registers.
- **K15** Formatting the content needs: steps, comparisons, reference tables.
- **K16** Summaries the genre requires: abstracts, executive summaries, TL;DRs, conclusion sections in long reports.
- **K17** Marketing copy written as marketing; promotional register where the genre is promotional.
- **K18** Scope statements; legal, medical, safety and security notices; caveats a reader needs.
- **K19** Specific, sourced claims and attributions (named source, stated relation).
- **K20** Warmth, courtesy or first person the author chose or the user asked for; real questions the author needs answered.
- **K21** Curly quotes, Markdown alone, and the absence of typos; tools and careful humans produce them.
- **K22** Figurative language in fiction and essays, a single apt metaphor, and domain-standard metaphors (bottleneck, memory leak).
- **K23** Exact values whose exactness matters: identifiers, versions, configuration values, contract, invoice and billing amounts, legal and regulatory figures, measured results reported with method and error, small exact counts.
- **K24** Full precision in a technical appendix or data table aimed at analysts who need it.

## Cross-family conflicts

Report these to the user rather than resolving them in a lane.
- **Formatting.** GPT and Gemini drafts usually need structure removed; Claude Fable 5.1 drafts may need structure kept or added.
- **Hedging.** GPT-6 drafts tend to over-qualify; Claude drafts tend to overstate. A reviewer that always pushes one way damages the other family's text.
