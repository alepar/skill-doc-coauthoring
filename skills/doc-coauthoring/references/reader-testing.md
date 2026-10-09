# Reader testing protocol

Stage 3 of doc-coauthoring. The aim is to learn whether the intended reader can (a) state the document's point correctly and (b) find and act on what they need. Whether they can trust its claims is the claim check in `claim-check.md`, which runs first: a reader test on wrong facts tests the wrong document. Evidence and sources: `research/doc-coauthoring/dossiers/d3-validation.md` in this repo.

Why this shape:
- Asking readers whether a text is clear yields "yes" from readers who then misread it. Paraphrase and task tests, graded against the author's intent, find real problems.
- Authors and experts are poor at predicting where readers will struggle, so Claude does not predict reader questions; the author states what a correct reading looks like, and readers are tested against that.
- Model judges grade too generously without a reference answer, favour text that looks like their own, and soften when they think the user wrote it. Hence the answer key, isolation and neutral framing.
- A fresh model reader infers much more than a human reader does. A failure is strong evidence of a real gap; a pass is weak evidence that people will understand. Treat the result as a floor.

## Step 1: Answer key (main conversation, with the user)

From the brief, write:
1. The document's point in one sentence.
2. The 1-3 decisions or actions a reader should take away.
3. 3-6 reader scenarios, each "You are [role]. You need to [task]. Using only this document, what do you do / what is the answer?", with the expected answer.
4. 2-3 likely misreadings.

Show the key to the user and ask them to correct it. Do not show the key to any reader.

## Step 2: Cold paraphrase

One fresh subagent (not a fork). Give it the document and this prompt:

> Read the document below as [role]. In your own words, without quoting: what is this document asking of you, what was decided, and what would you do next? Then give one sentence per section saying what that section means.
>
> [document]

Compare with the key. A divergence in the point, the decision or the next action is a blocking gap; fix the document there first.

## Step 3: Scenario tasks

One fresh subagent per scenario (or one for all scenarios if the document is short). Prompt:

> You are [role]. [Scenario.] Answer using only the document below; do not use outside knowledge to fill gaps.
> Give: (1) your answer; (2) the exact sentence or sentences you relied on, quoted; (3) "Not stated in the document" if nothing in it supports an answer; (4) a list of any fact, step or definition you had to supply yourself because the document did not.
>
> [document]

Grade each scenario pass or fail against the key:
- wrong answer → gap;
- "Not stated in the document" where the key expects an answer → gap;
- right answer that depended on supplied knowledge → gap (a human reader would likely have been stuck there).

Report to the user what each reader got right and wrong, with the quoted evidence.

## Step 4: Fix and retest

- Fix every misreading in the document itself, not by explaining in chat; the next reader will not have the chat.
- If the user and the test disagree for two or three rounds, record the point in Open Issues and move on.
- Retest only what changed, with new subagents. A reader that saw the earlier version is no longer cold.
- Re-check edited sections for caveats or technical details lost in the fix.

**Stop** when the paraphrase matches the key, every scenario passes with no "not stated" and no supplied knowledge that matters, and the claim check has nothing open; or after two retest rounds, reporting what is left to the user. Tell the user plainly that this is a floor: for a document that drives a decision, one human reader outside the team is worth more than another model pass.

## Isolation and framing

- Use a fresh subagent that is not a fork of the authoring conversation; a fork inherits everything Claude knows about the intent.
- Give it the document verbatim (or its path) and the role, nothing more: no brief, no answer key, no summary of what the document is meant to say.
- Never say the user wrote it, likes it, or is anxious about it; say nothing about authorship.

## Without subagents

In a chat interface without subagents, ask the user to open a fresh conversation, paste the document and the Step 2 and Step 3 prompts, and paste the answers back. Grade them here against the key. Remind the user that a fresh chat is still more capable than the human readers the document is for.

## Scale to stakes

- Short, low-stakes document: Step 1 (a short key), Step 2, and two or three scenarios.
- Document that drives a decision or that many people will act on: all steps.
