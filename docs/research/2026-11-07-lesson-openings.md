# Lesson openings and endings, brought up to the rules

Date: 2026-11-07. Why: the owner asked twice for every lesson to say what children already know and what they'll learn, before teaching. `docs/rules/LESSON-RULES.md` now requires it, and `tools/check-lesson.mjs` checks it.

## What changed
| Lesson | Opening | Ending |
|---|---|---|
| Skeleton | Hook, what you already know (press on your arm: a bone), new unit, title, today | Answer, what we learned, next: Muscles |
| Muscles | Last time (Skeleton's points), hook, title, today | Answer, what we learned, next: the straightening-arm puzzle |
| Colombia 1 | Hook, what you already know (Spanish, South America), new series, title, today | Answer, what we learned, next: Why Is It Cold Near the Equator? |
| Colombia 2 | Last time (Colombia 1's points), hook, title, today | Answer, what we learned, next: the people of each floor |
| Neuroscience 1 | Adds what you already know: muscles pull bones, so who tells them when? | No change |
| Emotional Intelligence 1 | Adds what you already know: everyone has had feelings, and nobody has to share theirs | No change |
| Spanish 1 | Adds what you already know: Spanish from songs, films or home | No change. **Not recorded yet**, because the Spanish voice work was unsaved |

Skeleton and Colombia 1 are marked `subjectStart: false`, because neither is the first unit of its subject in the program: Science starts with Forces, and Geography with What makes a geographer?

Each video in these lessons now has a kind, a `candidate` status, and a short line after it, as `VIDEO-RULES.md` requires. The clips themselves are unchanged.

## New facts, and their sources
- **Spanish is Colombia's official language:** [Constitution of Colombia, article 10](http://www.secretariasenado.gov.co/senado/basedoc/constitucion_politica_1991.html).
- **Colombia is in South America, with six regions:** already taught and sourced in Colombia Lesson 1. See `2026-11-06-colombia-program.md`.
- All other new lines repeat what each lesson already teaches, such as 206 bones, or the heart and gut muscles working on their own.

## Not checked
- How the new lines sound. The owner listens.
- New clips for Neuroscience and Emotional Intelligence weren't watched by Claude. See each lesson's video plan.
