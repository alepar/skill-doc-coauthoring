# Designing a "verify every claim" step for AI doc-writing skills

Quick-mode research report, 2026-10-08. Scope: the claim check in doc-coauthoring Stage 3 and the claims lane in unclaude.

## Answer first

The research converges on a single pipeline, which the skills should copy:
1. Extract atomic, self-contained, checkable claims.
2. Route each claim to the source of truth that owns it.
3. Gather evidence with tools (read code, run commands, search), using a verifier that does not see the draft's reasoning.
4. Assign a verdict that must quote its evidence, with abstention allowed.
5. Send the result back as an attribution report plus minimal edits.

FActScore, SAFE, FacTool, RARR and CoVe each show part of this pipeline. For software docs, the strongest "verifier" for commands and examples is execution. Docs-as-tests tools such as rustdoc, doctest, trycmd and Cram already do this.

The main risk is a lenient LLM verifier. It favours text that is familiar and plausible, and it repeats hallucinations when it can see them. The step design therefore relies on three things:
- keeping the verifier out of the draft's context;
- requiring a quote as evidence;
- keeping "unverifiable" distinct from "contradicted".

## Findings

### 1. Claim extraction (F1)

- **Atomic decomposition is the standard unit.** FActScore breaks a generation into a series of atomic facts and computes the percentage that a reliable knowledge source supports [1].
- **Claims must stand on their own before checking.** SAFE revises each fact to be self-contained by replacing vague references such as pronouns with the proper entities [2]. In a doc, that means writing "`foo sync --dry-run` prints planned changes without writing" instead of "it supports a dry run".
- **Skip what cannot be verified.**
  - Claimify first decides whether each sentence has verifiable content, and keeps only the verifiable part of mixed sentences [3].
  - Claimify extracts a claim only when it is highly confident of the correct reading; that is how it handles ambiguity [3].
  - VeriScore argues that FActScore and SAFE do not suit most generation tasks, because they assume every claim is verifiable [4].
  - In an RFC, design rationale, opinions, recommendations and future plans are not claims to check. The author owns them.
- **Counterevidence: decomposition itself introduces error.** FActScore results change with the decomposition method, because errors can come from the decomposition step [5]. Mitigations:
  - keep each claim's exact source span (line or quote), so a reviewer can see what was split;
  - send ambiguous sentences back to the author instead of guessing.

### 2. Source routing and precedence (F2)

- **Practice favours one canonical source in version control next to the code.**
  - Google designates canonical documentation as the primary source of truth and keeps it in source control alongside the code it documents [17].
  - Google also adds freshness dates that record the last review, and sends reminders when a doc goes untouched, for example after three months [17].
- **Route by claim type.** FacTool picks its tool by the claim's domain: Google Search or Scholar for knowledge and citations, code interpreters for code [6]. This is the evidence for routing each claim separately.
- **Gap: no study ranks code against docs when they disagree.** The precedence used below is a design inference from canonical-source and freshness practice:
  1. executed behaviour
  2. code at HEAD
  3. the project's own versioned docs
  4. version-pinned upstream docs
  5. general web

  A mismatch between code and docs is still a finding about the docs. It should not be resolved silently, because the docs may describe the intended behaviour and the code may have a bug.

### 3. Verifying code and CLI claims (F3)

- **Execution is the strongest check.** FacTool grounds code factuality in execution: it runs code against test inputs and compares the output with the expected output [6].
- **Mature docs-as-tests tooling exists:**
  - rustdoc runs documentation examples as tests, so they stay "up to date and working" [11].
  - `mdbook test` runs a book's tests; at the moment it supports only Rust tests [12].
  - Python doctest runs interactive-session examples "to verify that they work exactly as shown" [13].
  - trycmd runs the command examples in a README.md under `cargo test` [14].
  - Cram runs each command and compares the recorded output with the actual output [15].
  - The Docs as Tests practice validates that docs "work as written" [16].
- **Implication for the step:**
  - If the repo has one of these harnesses, run it and treat a pass as the verdict.
  - If not, run safe read-only commands (`--help`, `--version`, dry runs), and read the code paths for everything else.
  - Prose about behaviour, such as "retries 3x" or "defaults to X", needs a file:line citation as evidence.

### 4. External and public facts (F4)

- **SAFE:** splits a response into self-contained facts, checks whether each is relevant, and runs multi-step Google searches to decide whether each fact is supported [2]. It agreed with crowdsourced annotators 72% of the time, won 76% of disagreements, and cost more than 20x less [2].
- **FacTool:** its five steps (claim extraction → query generation → tool querying → evidence collection → verification) form a reusable skeleton [6].
- **RARR:** finds attribution, then post-edits only the unsupported content, keeping the original as far as possible [7]. This fits a de-AI editor that must not rewrite the author's voice.
- **Citations must be checked too.** In an audit of generative search engines, only 51.5% of sentences were fully supported by their citations, and only 74.5% of citations supported their sentence [9].

### 5. Verdicts and outputs (F5)

- FActScore labels each fact Supported, Not-supported or Irrelevant. Its Not-supported label merges "contradicted" with "no evidence" [1]. A doc workflow must separate the two: one means fix the draft, the other means ask the author.
- RARR outputs an attribution report of evidence snippets together with a revision that can be traced to that evidence [7]. That is the model for the claim ledger and for the References section.

### 6. Failure modes and mitigations (F6)

- **Seeing the draft makes the verifier repeat its errors.**
  - Evidence: in CoVe, models that attend to their own hallucinations repeat them; factored verification, which hides the original response, does better [8].
  - Mitigation: give the verifier the claim and the route only.
- **Self-preference and familiarity bias.**
  - GPT-4 shows significant self-preference, and LLM judges score familiar (lower-perplexity) text higher regardless of who wrote it [18].
  - LLMs can recognise their own outputs, and that ability correlates linearly with self-preference [19].
- **Sycophancy.** Humans and preference models sometimes prefer convincing sycophantic answers over correct ones [20].
- **Self-correction without external feedback fails.**
  - Evidence: LLMs struggle to self-correct without external feedback, and sometimes get worse [21].
  - Mitigation: every "holds" verdict needs an external artifact (tool output, file:line, or a quote from a URL).
- **Quote-or-retract and abstain.** Anthropic recommends finding a supporting quote for each claim and retracting any claim without one [10]. It also recommends explicitly allowing "I don't know" [10].
- **Over-flagging.** No direct study was found. The design mitigation is to drop non-verifiable spans at extraction (as Claimify and VeriScore do) and to treat "unverifiable" as a neutral verdict, not an error.

## Recommended step design

**Inputs:**
- the draft, with line numbers;
- the repo root and HEAD SHA (`git rev-parse HEAD`), plus `git status` for uncommitted changes;
- the list of the project's docs;
- pinned versions (lockfiles, `--version` output);
- the mode: `coauthor` (Stage 3, author present) or `unclaude` (claims lane, editing someone else's text, voice preserved).

**Procedure:**
1. **Extract.** List atomic, self-contained claims, each with its draft line span. Skip opinion, rationale, proposals and future or hedged plans. When a sentence is ambiguous, ask the author instead of guessing.
2. **Classify and route** each claim using the table below. Record the source of truth and the version it applies to.
3. **Check freshness.** Record the SHA, version or date of each source. Flag:
   - a copy older than HEAD;
   - docs whose version differs from the lockfile or `--version`;
   - a fetched page with no version.
4. **Verify independently.** Use a separate subagent or pass that sees only the claim text and its route, never the draft or the conversation.
   - Run tools in this order: existing docs-test harness, then `--help` or a dry run in a sandbox, then reading the code, then web search.
   - Every verdict except `author-only` must quote its evidence verbatim.
5. **Assign a verdict** from the list below.
6. **Output** the claim ledger and the edits.

**Routing table**

| Claim type | Primary check | Fallback | Precedence / notes |
|---|---|---|---|
| Command, CLI flag, default, exit code, output sample | Docs-test harness (trycmd, Cram, doctest, `mdbook test`) or `cmd --help` / dry run in a sandbox | Read the argument parser at HEAD | Executed output > code at HEAD > the project's docs. Never run destructive commands; read the code for those. |
| API, function or config behaviour | Code path at HEAD (file:line) | Tests that exercise it | Code at HEAD > project docs. Report a mismatch; do not auto-resolve it. |
| Version, compatibility, dependency | Lockfile, manifest, `--version`, tags | Release notes | Repo metadata > README badge > memory |
| Project-internal facts (architecture, files, owners) | Repo tree and project docs at HEAD | `git log` | Current HEAD > stale or fetched copies |
| Third-party tool or library behaviour | Upstream docs pinned to the version in use | Upstream source at that tag | Version-pinned docs > `latest` docs > blog posts |
| Numbers, benchmarks, quotes, public facts, comparisons | SAFE-style multi-query search for primary sources | A second independent source | Primary > secondary. Open each citation and confirm it supports the claim. |
| Decisions, intent, roadmap, team facts | Not checkable | — | `author-only`. In coauthor mode, ask the author; in unclaude mode, leave the claim as is. |

**Verdicts:**
- **`holds`:** evidence quoted.
- **`contradicted`:** evidence quoted, plus a proposed correction.
- **`stale-source`:** the only evidence is outdated or for a different version.
- **`unverifiable`:** checked and nothing found; the verifier abstains, and this is not an error.
- **`author-only`:** outside every source.

This deliberately splits FActScore's single "Not-supported" label into `contradicted` and `unverifiable`.

**Outputs:**
- **Claim ledger:** one row per claim with these fields:
  - id, draft line, claim, type, route, verdict, action;
  - evidence: `path:line@SHA`, or the command with its trimmed output, or a URL with a quote and access date.
- **Fixed automatically** in both modes, as RARR-style minimal edits: `contradicted` claims where the fix is mechanical (flag name, default, version, path).
- **Returned to the author:**
  - contradicted claims about behaviour or meaning;
  - mismatches between code and docs (either one may be the bug);
  - `stale-source` and `author-only` items;
  - in unclaude mode, `unverifiable` claims too, as suggestions to hedge or cut rather than forced rewrites.
- **References section:**
  - Build it only from `holds` evidence on external sources (upstream docs, papers, URLs).
  - Leave out self-references. A project's README does not cite its own repo or files; that internal evidence stays in the ledger.
  - Add an in-doc citation only for numbers, quotes, comparisons and third-party claims that a reader cannot check from the repo.
- **How the two skills use it:**
  - Doc-coauthoring Stage 3 runs steps 1–6 and asks the author about `author-only` items and contradicted claims about meaning.
  - Unclaude's claims lane runs the same procedure with a voice-preserving edit policy: it applies only mechanical fixes and turns everything else into annotations.

## Limitations

- No empirical study was found that evaluates LLM claim-checkers on READMEs or design docs. The evidence comes from long-form QA and biography factuality work, plus the documentation of docs-test tools.
- The code-over-docs precedence is a design inference.
- Five sources were read at abstract level only: VeriScore, Wanner et al., the sycophancy paper, the self-correction paper and the generative-search audit.

## Methodology

- **Tools:**
  - Search used the `search` CLI (aggregate, academic and general modes).
  - Fetching used curl plus a local HTML-to-text converter.
- **Preflight:** ok, with partial provider failures (Perplexity HTTP 401 quota, Serper HTTP 400 credits). The CLI was kept and no fallback was needed.
- **Query attempts:** 19. Six failed because of an argument-quoting bug (invalid mode value) and succeeded on retry.
- **Results considered:** 122 entries.
- **Documents retrieved:** 21 distinct original documents, with 0 fetch failures. Six of them were reached by navigating directly to canonical pages.
- **Retrieval stop:** budget-exhausted (Quick mode, 2 rounds). All high-priority facets have direct evidence, but the two post-readiness probe rounds were not run.
- **Delivery:** the research ran in a subagent, which the host does not allow to write report files; it returned this text and the main session saved it. The raw evidence logs are not published.

## Bibliography

[1] FActScore: Fine-grained Atomic Evaluation of Factual Precision in Long Form Text Generation. Min et al., EMNLP 2023. https://arxiv.org/html/2305.14251
[2] Long-form factuality in large language models. Wei et al., NeurIPS 2024. https://arxiv.org/html/2403.18802v4
[3] Towards Effective Extraction and Evaluation of Factual Claims (Claimify). Metropolitansky & Larson, ACL 2025. https://arxiv.org/html/2502.10855
[4] VERISCORE: Evaluating the factuality of verifiable claims in long-form text generation. Song et al., 2024. https://arxiv.org/abs/2406.19276
[5] A Closer Look at Claim Decomposition. Wanner et al., 2024. https://arxiv.org/abs/2403.11903
[6] FacTool: Factuality Detection in Generative AI. Chern et al., 2023. https://arxiv.org/html/2307.13528v2
[7] RARR: Researching and Revising What Language Models Say, Using Language Models. Gao et al., ACL 2023. https://arxiv.org/html/2210.08726v3
[8] Chain-of-Verification Reduces Hallucination in Large Language Models. Dhuliawala et al., Findings ACL 2024. https://arxiv.org/html/2309.11495
[9] Evaluating Verifiability in Generative Search Engines. Liu, Zhang & Liang, Findings EMNLP 2023. https://arxiv.org/abs/2304.09848
[10] Reduce hallucinations - Claude Platform Docs. Anthropic. https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/reduce-hallucinations
[11] Documentation tests - The rustdoc book. https://doc.rust-lang.org/rustdoc/write-documentation/documentation-tests.html
[12] test - mdBook Documentation. https://rust-lang.github.io/mdBook/cli/test.html
[13] doctest - Test interactive Python examples. https://docs.python.org/3/library/doctest.html
[14] trycmd - Rust (docs.rs). https://docs.rs/trycmd/latest/trycmd/
[15] Cram: It's test time. https://bitheap.org/cram/
[16] Never have stale docs again | Docs as Tests. https://www.docsastests.com/
[17] Software Engineering at Google, Chapter 10: Documentation. https://abseil.io/resources/swe-book/html/ch10.html
[18] Self-Preference Bias in LLM-as-a-Judge. Wataoka et al., 2024. https://arxiv.org/html/2410.21819v1
[19] LLM Evaluators Recognize and Favor Their Own Generations. Panickssery et al., NeurIPS 2024. https://arxiv.org/abs/2404.13076
[20] Towards Understanding Sycophancy in Language Models. Sharma et al., 2023. https://arxiv.org/abs/2310.13548
[21] Large Language Models Cannot Self-Correct Reasoning Yet. Huang et al., ICLR 2024. https://arxiv.org/abs/2310.01798
