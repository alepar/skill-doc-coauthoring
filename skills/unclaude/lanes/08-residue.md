---
key: residue
title: Chatbot residue and sycophancy
scope: document
---
Digest entries: X14, X15, C06, C07; keep K20.
Openers and closers are positional, so read the whole text; also catch asides embedded mid-text.
Hunt:
- [strong] Validation openers: "You're absolutely right", "Great question", "What a fascinating…", "Excellent point", "Certainly!", "Of course!", "Absolutely!", "Sure!", "Got it".
- [strong] Agreement with no claim to agree with; praise with no reason in review or feedback text.
- [weak] Validate-then-refine ("X is correct, and it can be made precise").
- [weak] Reflexive apologies.
- [strong] Closers and offers: "I hope this helps", "Let me know if", "Feel free to", "Would you like me to", "Shall I", "Want me to", "unless you'd prefer", "Good luck", "You've got this"; more than one trailing question.
- [strong] Narration of intent without action ("Next, I'll…") and recaps that end in an announced next step.
- [strong] Knowledge-cutoff and "as of my last update" disclaimers.
- [strong] Prompt-anchoring openers: "Based on the text", "Here is", "Below is".
- [strong] Placeholder text: [Your Name], INSERT_DATE, lorem ipsum.
- [weak] Restating the user's question before answering.

Fix: delete; start with the content; replace an offer with the action already taken or with nothing; keep at most one specific blocking question.
Keep: reasoned agreement that states why; real questions the author needs answered; courtesy in a letter or email the user asked for; a warm register the user requested (K20).

## claude
Claude 4.x: "You're absolutely right!". Claude 5.x: validate-then-refine, "Shall I apply this?", "Want me to…?", recaps ending in an announced next step.

## openai
"Certainly! Here's", "Got it", "Thanks for checking in", cheerleading closers, generic sign-offs.
