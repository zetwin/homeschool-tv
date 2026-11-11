# Lesson ideas and background

The rules to follow are now in `docs/rules/LESSON-RULES.md`. This page keeps the background.

Last updated: 2026-11-06

## The formula
Entertain like a creator, organise like an encyclopedia, check like a school.

### From creator channels
These are observations from creators and marketing blogs, not learning research.
- Open with a hook in the first seconds.
- Build around a misunderstanding, then resolve it.
- Have one idea flow into the next. Use short chapters.
- Change the visual often, and keep motion meaningful.

### From encyclopedias
- A real picture or diagram first, then labels.
- One topic per spread, with small captions and fact callouts.
- Scale comparisons and record holders.

### From learning research
[Mayer's multimedia principles](https://services.dartmouth.edu/TDClient/1806/Portal/KB/PrintArticle?ID=171655): split into segments, highlight key points, prefer a friendly human-like voice, and have learners actively do things. Retrieval practice and spacing are well supported in general, but less studied in this exact age and subject.

## Running order
1. **Cold open:** a question or surprise, about 20 seconds.
2. **Title.**
3. **Chapters:** usually 5–7, each teaching one idea.
4. **Inside chapters:** animation, then a supporting video where it adds something, then a check that ties it back.
5. **Shout-it-out questions:** every few minutes.
6. **Do something:** an experiment or a physical activity.
7. **Bonus:** clearly marked; not in the test.
8. **Recap,** then the **lesson test.**

## How video fits
Video **supports a chapter**, not a break from it:
1. Introduce it with a question: "Watch for…"
2. Play it.
3. Check the answer or build on it straight afterwards.

Check the licensing doc before adding any video. **Play it inside our own page first:** some channels block embedding (YouTube error 150). If a video can't play, the lesson skips it and never sends anyone to another tab. Every video must be watched by a person first. Log its title, channel, ID, start and end, why it's useful, and its license route.

## Image rules
- **Every image must show what's being taught at that moment.** No impressive but unrelated images. (See the team's private notes: the whale mistake.)
- Lesson posters and hero images show the lesson's own subject.
- **The cover must match the title's idea.** Hide the title: can you guess the lesson from the picture?
- Check each chapter's image against that chapter's title, not only against the topic.
- Check images for labels, text or marks that would confuse.
- Check in-frame details after zooming. Does the part you name actually appear? (The whale flipper didn't.)
- Record the source and license with `tools/fetch-images.py`.

## Writing rules
- Short, spoken sentences; one idea per line.
- Use `say` for captions, and `speak` for pronunciation.
- Only say what a source supports.
- Don't use words children won't know without explaining them.

## Production steps
1. Find the official objectives (`curriculum-researcher`).
2. Write the script and running order (`lesson-writer`).
3. Check facts and images (`fact-checker`).
4. Check licenses (`license-checker`).
5. Render the voice: `cd tools/voice && npm install && node generate.mjs ../../channel <episode> en af_heart`.
6. Test at TV and phone size (`tv-tester`).
7. A parent watches it through, including any videos.
8. Publish, and update the team's private notes, `docs/product/CURRICULUM.md` and the team's private notes.

## Reusable scene types
`title`, `chapter`, `statement`, `photo`, `number`, `guess`, `atlas`, `cards`, `recap`, `video`, `art`. Custom animations live in the episode file and use the `art` scene.

## Making lessons different
Lessons 1 and 2 share one template: chapter card, big word with a picture on the right, one voice, a question, a video, a recap. It's clear, but they feel the same. Keep a few things fixed so it feels like one show (title, recap, test), and let each lesson choose a format that suits its topic.

| Format | What changes | Fits | Cost |
|---|---|---|---|
| **Two voices** | A curious friend gets things wrong, and the host puts it right | Every lesson | Low |
| **One long journey** | One unbroken camera trip, with no slides: follow a breakfast through the body | Body, space, history | Medium |
| **Mystery** | A case at the start, with clues in each chapter and a reveal at the end | History, The Tempest, science | Low to medium |
| **Phones as buzzers** | Children answer live on their own devices, with the scores on the TV | Every lesson | Medium |
| **Do it first** | The lesson stops until they've tried something, then explains what happened | Science, maths | Low |
| **You choose** | The children vote on which way to go next | History, stories | Medium |

Also needed in any format: more kinds of scene, varied transitions, sound and music in the gaps, and running jokes.

## Next improvements
- Background music, once licensed
- Starter quiz at the start
- Better drawn illustrations; a professional illustrator or a licensed library
- Replace the hand X-ray, which has leftover label lines
