# skill-doc-coauthoring

Two Claude Code skills for writing documents. `doc-coauthoring` walks you through writing a doc the way [the research in this repo](research/doc-coauthoring/report.md) says works, and checks every checkable claim against the code or source it describes. `unclaude` takes a finished text and makes it read like a person wrote it: it finds the patterns that mark text as machine-written, fixes them, and verifies the facts along the way.

## doc-coauthoring

Guides you through a design doc, RFC, PRD, ADR, postmortem, decision memo or user doc, from scratch or from a draft you already have, in three stages: gather context into a written brief, draft section by section from what you supply, then test the result. It needs nothing beyond Claude Code. It is a revised version of [Anthropic's doc-coauthoring skill](https://github.com/anthropics/skills/tree/main/skills/doc-coauthoring). The main changes:

- **Claims are checked against their sources.** Before any reader test, Claude extracts every checkable claim (commands, flags, behaviour, versions, numbers, quotes) and routes each to the source that owns it: `--help` or the repo's docs tests for commands, the code at the current revision for behaviour, primary sources for public facts. Fresh subagents that never see the draft do the checking and must quote their evidence. Wrong flags and versions are fixed; anything about meaning goes back to you.
- **Reader testing is rebuilt.** Upstream asked a fresh Claude whether the doc was clear. Readers who say yes still misread. Now you confirm an answer key, and fresh Claude subagents paraphrase the doc and work through scenarios. They quote their evidence and list what they had to supply themselves. A model reader infers more than a person does, so passing is a minimum bar and does not show that people will read the doc correctly.
- **You write the position.** Your own items come before Claude's brainstorm, and you state the core decision in your own words before Claude drafts it. Every specific Claude introduces is listed for you to confirm or cut.
- **A brief and a doc-type map before structure.** Stage 1 ends with a brief marked "stated" or "assumed", sized to the stakes, and outlines come from a map of what each doc type and section has to do.

## unclaude

Scans one text file, written by a model or by you, and edits it in place:

```
prepare (node)     snapshot the text, cut it into chunks, assemble lanes and prompts
Workflow           protect pass (spans nobody may edit; quotations checked against their sources)
                   → 13 lane scouts (per chunk, or whole document)
                   → verifiers check each extracted claim against its source, without seeing the text
finalize (node)    verify quotes → drop findings in protected spans → merge duplicates
                   → weak-hit cluster rule → one numbered report, grouped by paragraph
reviewer (agent)   works through the report finding by finding and edits the text
guard (agent)      checks the reviewer's diff for known regressions and reverts them
```

- **Lanes:** lexical, contrast, syntax, rhythm, shape, significance, stance, residue, figurative, generic, redundancy, claims, precision. Lane notes cover Claude, OpenAI and Gemini; `--source` picks which apply.
- **Weak tells count only in clusters.** A weak tell, such as one "crucial", is acted on only next to another finding in the same paragraph, or when a document-wide lane finds it at a high rate. Single tells are common in human writing.
- **Claims checked against their sources.** A wrong flag or version is corrected to what the source says; a contradiction about meaning, or a claim the text depends on that nobody could verify, gets an `[AUTHOR: …]` note for you.
- **Numbers at the precision the evidence supports.** The precision lane flags estimates written to the last digit, like cents in a strategy doc.
- **Your decisions hold.** `--author-notes` lists what you have settled (a claim made ahead of a release, framing you chose); every scout, the reviewer and the guard honor it.
- **No judges.** Findings are verified and merged in code. The reviewer marks each one applied, skipped with a reason, or flagged for you with an `[AUTHOR: …]` note.

[`skills/unclaude/reference/digest.md`](skills/unclaude/reference/digest.md) has every pattern with its sources, the reviewer rules, and a keep list of things never to flag.

## Install

As a Claude Code plugin:

```
/plugin marketplace add alepar/skill-doc-coauthoring
/plugin install skill-doc-coauthoring@skill-doc-coauthoring
```

Or copy or symlink `skills/doc-coauthoring` and `skills/unclaude` into `~/.claude/skills/`.

`unclaude` needs Claude Code with the Workflow tool, and node 22 or later.

## Use

- "Help me write a design doc for …" starts `doc-coauthoring`.
- "unclaude `docs/proposal.md`" runs `unclaude`. Useful options:
  - `--truth <path,...>`: the repositories or docs the claims should be checked against (default: the git repository containing the file);
  - `--author-notes <file>`: decisions the edit must not undo;
  - `--source openai|gemini|unknown`: who wrote the text (default Claude; `unknown` for your own writing);
  - `--writer-sample <file>`: a sample of your own prose, whose habits override the defaults.

  `bash skills/unclaude/scripts/prepare --help` lists all options.

## Test

- `node tests/mock-engine.mjs` runs the unclaude engine with stub agents and checks prompt assembly, protected spans, quote verification, merging, the cluster rule, claim verification, author notes and the dry-run path.
- `skills/doc-coauthoring/evals/evals.json` holds scenario evals for the co-authoring workflow.

## Research

`research/` holds the deep-research runs behind these skills: reports with numbered citations to the original sources, plus topic dossiers for the first two. [doc-coauthoring](research/doc-coauthoring/report.md) covers writing and validating documents, [unclaude](research/unclaude/report.md) covers AI-text patterns and fixes, and [claim-verification](research/claim-verification/report.md) covers checking claims against their sources. The raw evidence logs are not published.

## License

Apache License 2.0; see [LICENSE](LICENSE) and [NOTICE](NOTICE). `skills/doc-coauthoring` is derived from Anthropic's `doc-coauthoring` skill, from the [anthropics/skills](https://github.com/anthropics/skills) repository. That repository's README says many of its skills are open source under Apache 2.0 and names only its document skills (docx, pdf, pptx, xlsx) as source-available; the doc-coauthoring folder has no license file of its own.
