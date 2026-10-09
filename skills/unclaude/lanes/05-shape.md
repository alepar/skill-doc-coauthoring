---
key: shape
title: Formatting and document shape
scope: document
---
Digest entries: X08, X09; keep K1, K2, K15, K16.
Hunt:
- [strong in prose contexts] Bold-label bullets ("**Term:** explanation") where the label is restated in the sentence after it.
- [weak] Mechanical bolding of key phrases throughout running prose.
- [weak] Fragment bullets carrying an argument that needs connected prose.
- [weak] Tables of 2–3 rows that a sentence would carry.
- [strong] Any heading, list or bold in a personal or emotional message.
- [weak] Title-case headings in a sentence-case context; generic headings (Introduction, Understanding X, Key Takeaways, Pros and Cons, Conclusion, Challenges and Future Prospects); headings nearly as long as their content.
- [weak] The intro / three sections / recap template applied regardless of content.
- [strong] Summary closers ("In summary", "In conclusion", "Overall", "Ultimately", "In short:", "Bottom Line:") and one-line closers that restate the piece.
- [weak] Portable intros that could open any article on the topic ("In today's fast-paced world").
- [weak] Emoji headings; horizontal rules in short pieces.

Fix: turn label lists into prose with inline series ("x, y and z"); remove decorative bold; sentence-case or remove headings; cut restating closers and end on the last concrete point; cut the portable intro and start with the first specific sentence.
Keep: run-in headings and parallel lists in reference and technical docs (K1); descriptive or question headings in long scannable documents (K2); lists for sequential steps or genuinely parallel items (K15); summaries the genre requires (K16).

## claude
Earlier Claude over-bulleted in chat; Fable 5.1 under-formats, so do not flag structure the content needs. Opus 5 writes long deliverables with filler sections and redundant summaries; weight those.

## openai
GPT-6 Astra "tends to use lists, tables and Markdown"; weight bold-label lists, small tables and "Bottom Line:" / "In short:" closers.

## gemini
Weight unrequested bullets, intro-body-summary inside every section, and bold headings (practitioner evidence).
