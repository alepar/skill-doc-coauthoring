# Revision passes

Run after all sections are drafted, before Reader Testing. These are polish passes: the conversation that wrote the draft is the least reliable judge of it, because self-review improves fluency more than substance and leans toward approving its own text. They tidy the document; Reader Testing validates it. Optionally run the structural pass in a fresh subagent (not a fork) for a cheap set of fresh eyes.

Every finding quotes the sentence it concerns and names the problem. "The flow could be smoother" is not a finding.

Evidence and sources: `research/doc-coauthoring/dossiers/d1-writing-fundamentals.md` and `d6-tools-styleguides-ai-prose.md` in this repo.

## 1. Structural pass

- Does the order follow the brief, with the point (or, for a contested decision, the problem) first?
- Is anything missing that the brief or the doc type requires? Is anything present that the brief's non-scope excludes?
- Is anything said twice? Keep the better instance.
- Is each section in the right form: connected prose for reasoning, lists for parallel items and sequences, tables for comparisons?
- Is space proportional to importance?

## 2. Stylistic pass

- **Cut toward 30% shorter.** Most first drafts can lose that much without losing information. Cut "how" before "why": the reasoning is what reviewers need.
- Define each term and acronym on first use, and use each term the same way throughout (check the term sheet).
- Remove metadiscourse and signposting the reader does not need ("This section will explain…", "As mentioned above").
- Numbers: estimates rounded to the precision their uncertainty supports; the same quantity stated the same way everywhere; ranges where the source was rough.
- If the user supplied a style guide or exemplar, check tone and terminology against it.

### AI-prose check

If the `unclaude` skill is available, offer to run it on the document (report only, or fix). Otherwise check for causes, not banned words; word lists displace the problem and detectors are unreliable, so never tell the user a document "sounds AI-written" and never run an AI detector. Name the mechanism and its fix:

- **Swap test:** would the paragraph still read fine if the topic were swapped for a different one? Then it lacks the specific fact that makes it about this topic.
- **False depth:** restating the problem, listing obvious considerations, ending on "it depends".
- **Symmetry padding:** reflexive threes, every option given equal space, every section the same length.
- **Inflated significance:** "plays a pivotal role", "a testament to", grand closing sentences, in place of the plain fact.
- **Contrast frames** nobody needed ("this isn't just X, it's Y") and throat-clearing ("Here's the thing").
- **Bullets standing in for reasoning:** a list of fragments where the reader needed to know how the points relate.
- **Chat residue:** "Great question", "I hope this helps", offers to do more.

Flag patterns that recur, not single uses; one "crucial" is normal writing. The user's house style overrides this list.

## 3. Checklist (yes / no)

- Placeholders or "[To be written]" left anywhere?
- Any statement that contradicts another?
- Any sentence that can be read two ways?
- Any undefined term or acronym?
- Any claim with no basis in the material the user supplied?
- Any promise about future work or features the user did not commit to?
- Link text that makes sense out of context (no "click here")?
- Idioms, culture-bound references or wordplay a global reader or machine translation would trip on?
- Language that excludes or stereotypes?

## 4. Regression check

After applying fixes, re-read each changed passage: did a cut drop a caveat, a number, or a step? Did a rewrite change meaning? Restore anything lost.
