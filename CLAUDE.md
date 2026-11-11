# Home School TV

A family learning app for children aged 10 to 12: lessons on the TV, tests on each child's own device, and a pad for the parent. This file tells Claude Code how to work on it, especially how to make a new lesson at the same quality as the existing ones.

## Read first
- `docs/rules/QUALITY-NOTES.md`: **what we learned the hard way. Read before any lesson, test or screen**
- `docs/rules/LESSON-RULES.md`: **follow for every lesson, without being reminded.** The 12 steps, opening and ending, chapter layouts, scenes, motion, checks
- `docs/rules/CONTENT-RULES.md`: titles, names and pictures. A title and picture must say the topic in 3 seconds
- `docs/rules/VIDEO-RULES.md`: **read before adding any video.** A person watches every one first
- `docs/rules/TEST-AND-EXAM-RULES.md`: **follow for every test and exam**
- `docs/rules/COMPLIANCE-AND-LICENSING.md`: read before adding any picture, video, voice or child data
- `docs/rules/TV-CONTROLS.md`: what every remote button does. Read before changing the lesson player
- `docs/rules/STYLE-GUIDE.md`, `docs/rules/VISUAL-HIERARCHY.md`, `docs/rules/AUDIENCE-AND-READING.md`, `docs/rules/DESIGN-VARIATIONS.md`: read before any screen
- `docs/official/README.md`: official programs by subject. Read these before searching the web
- `docs/product/FEATURES.md`: what exists, and how real it is
- `docs/product/HOW-THE-CODE-WORKS.md`: the code as it is today
- `docs/README.md`: the map of all project knowledge

## Making a lesson
Follow the steps in `docs/rules/LESSON-RULES.md`, in order. The helpers in `.claude/agents/` do these steps:

| Step | Helper |
|---|---|
| Place the lesson in the program: subject, unit, objectives, what comes before and after | `curriculum-researcher` |
| Collect the facts, each with a source; later, check them again | `fact-checker` |
| Write the script and running order in `channel/episodes/<id>.js` | `lesson-writer` |
| Check every picture and video may be used, and record its credit | `license-checker` |
| Look at the cover and chapter screens cold, as a child would | `first-look-tester` |
| Play it at TV size and phone size, with the remote | `tv-tester` |

Then:
1. Record the voice: `npm run voice:setup` once, then `npm run voice <id>`. See `docs/product/VOICE-PLAN.md`.
2. Run `node tools/check-lesson.mjs <id>` until it passes, then `npm run verify` with the server running.
3. Use `#shot-<sceneId>-<line>` to freeze any scene and look at it. Photograph every scene before trusting a check.
4. **A person watches the whole lesson and every clip, and listens to the voice.** Claude can't see video or hear audio, so never call a lesson finished before that.

`channel/episodes/skeleton.js` is the format example. The question types are in `channel/views/questions.js`; add new kinds there.

## Rules
1. **Title and picture must say the topic in 3 seconds.** Every picture shows what is being taught at that moment, with no other topic in the frame.
2. **Follow the map.** Every lesson belongs to subject, strand, topic, unit, lesson, objective. Mark anything outside the official objectives as bonus.
3. **Check facts.** Science facts need a source in the lesson's review notes (`docs/research/YYYY-MM-DD-<lesson>.md`). If something can't be verified, say so; never present a guess as fact.
4. **Check licences before using content.** Record source and licence for every picture in `channel/assets/img/credits.json`. YouTube clips are for family use; they must not be charged for or put behind a paywall.
5. **Protect children's data.** First names only. Children have no email. No ads and no tracking on children's screens. Nothing from `data/` ever goes into git.
6. **Claim only what is true.** Say "follows" or "aligned to" a curriculum, never "approved" or "accredited".
7. **Say it back, then build.** Before any big piece of work, say in plain words what you understood, and wait for a yes.
8. **Write plainly.** Readers may not be native English speakers. No jargon; explain terms in everyday words.
9. **Test what you change** at TV size (1920×1080) and phone width, and say what wasn't tested.
10. **Never test with sound on.** Test only in a hidden, muted browser: `node tools/browser-check.mjs <url> <script.js> <width> <height> [picture.png]`.
11. **Never serve the family from the folder you work in.** The family uses `npm run live` (port 8080); work happens with `npm run dev` (port 8081); `npm run release` moves checked work across.

## Layout
- `channel/`: the app. Plain HTML, CSS and JavaScript, with GSAP from `channel/vendor/`. No build step
  - `app.js`: TV home, lesson player, reusable scene types
  - `episodes/<id>.js`: one lesson: script, running order, test, custom animations
  - `curriculum.js`: the learning map data
  - `views/`: sign-in and the child's day, question types, exams, parent pad, diary, Materials
  - `assets/img/credits.json`: source and licence for every picture
  - `assets/voice/<lang>/`: recorded narration and a manifest of clip lengths
  - `pad-lab/`, `kid-lab/`, `materials-lab/`, `children-lab/`, `theme-kit/`: design labs, not the app
- `tools/serve.mjs`: the server. `npm start` also serves it to the TV on the home Wi-Fi
- `tools/voice/`: records voices. Settings in `voices.json`
- `tools/fetch-images.py`: downloads pictures from Wikimedia Commons and records credits
- `tools/clip-cuts.py`: shows the words at every clip start and stop. Needs yt-dlp
- `tools/check-lesson.mjs`, `tools/verify.mjs`, `tools/browser-check.mjs`, `tools/hierarchy-check.mjs`: checks
- `docs/SETUP.md`: running the project on another computer. `npm run doctor` says what's missing

## Run it
```bash
npm start
```
Open http://localhost:8080. Useful links: `#diary`, `#timetable`, `#program`, `#me`, `#map-year`, `#assess`, `#exam`, `#parent`, `#how`, `#screens`, and `#shot-<sceneId>-<line>` to freeze one scene.
