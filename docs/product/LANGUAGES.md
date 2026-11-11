# Languages in lessons

Status: **word help built for six lessons**: Skeleton, Muscles, Colombia 1 and 2, Emotional Intelligence 1, Neuroscience 1 (2026-11-07). Spanish lesson 1 has none on purpose: it already teaches Spanish words. The owner asked for this, and Codex agreed separately (`research/2026-11-07-codex-languages.md`).

## The idea in one line
A lesson has **one teaching language**. A second language can be added on top, as **word help**, without changing the lesson.

## Two separate choices
| Choice | What it changes | Options | Who sets it |
|---|---|---|---|
| **Lesson language** | The whole lesson: voice, screen text, test and YouTube clips | English now. Others later, one by one | A parent: family default, then per child and per subject |
| **Word help** | Key words also shown in a second language | Off, or Spanish now | A parent: family default, then per child |

- **Off is the lesson as it is today.** An English-only family never sees anything new.
- On the TV, the signed-in child's choice is used. With nobody signed in, the family default.

## Word help (build first)
- Each lesson lists its key words once, with the Spanish next to them, in a separate file per language, for example `channel/keywords/es/skeleton.js`. The lesson file isn't touched.
- In the lesson, while a key word is said, a small card in the top corner shows the Spanish with the English under it: *el hueso* / bone. At most two at a time. **No extra pauses**, so the lesson doesn't get longer. A corner card works on every kind of scene, including drawn animations, where text can't be placed under a word.
- At the end of the lesson, a short list of the lesson's key words in both languages. Later, the same list becomes practice in the kids' new tab.
- The lesson test stays in English. A small, separate word quiz can check the Spanish words.
- A fluent speaker checks each list before it ships. Parents don't have to.

### How it works today
- Admin, **Lessons and languages, Spanish key words**: "Show key words in Spanish too?", answered **No, English only** or **Yes, English with Spanish words**, for the family. (Until 2026-11-07 the buttons said Off and Spanish; the owner found that unclear.) Each child's card in **Family** answers the same question: Same as the family, English only, or English with Spanish words.
- **Parents never check word lists.** We check each list (a fluent speaker, then Claude) before it ships. The owner decided this on 2026-11-07.
- Word lists live in `channel/keywords/<lang>/<lesson>.js`. Corrections and approvals are saved with the family data.
- The end of the lesson lists all its key words in both languages, **and reads the Spanish aloud**, one word at a time as it lights up. A tap on any word plays it again. Each word is recorded once with the lesson (`tools/voice/word-help.mjs`), never added into the lesson script.

## Full lessons in another language (later)
- The same lesson, made again in that language: its own text, voice, test and clips, chosen for that language. It keeps the same lesson name and place in the program, and records which English version it follows, so changes can be copied across.
- Each one costs real work: translation, a voice that native speakers approve, its own clips, and its own fact-check.
- First trial: **one subject fully in Spanish**, for a family whose children already understand Spanish. Geography of Colombia fits best, because Colombia's own program is in Spanish. The parent chooses.

## What we don't do
- **Separate bilingual lessons that mix languages and leave gaps for key words.** Every lesson would be made twice, the two copies would drift apart, and lessons would get longer. Word help gives the same benefit automatically.
- A language switch on every lesson from day one. Languages come one at a time, when a family needs them.

## Order
1. Word help: the setting, the on-screen Spanish words, the end list. One lesson first (Skeleton), a fluent speaker checks the words, then the rest.
2. The word quiz in the kids' new tab.
3. One subject in Spanish, after the parent chooses and native speakers approve the Spanish voice for long sentences.
