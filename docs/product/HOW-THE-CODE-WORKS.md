# How the code works

Last updated: 2026-11-06. **What's really there today.** For where it's going, see `ROADMAP.md`. For plain rules, see `rules/` and `CONTRIBUTING.md`.

## The big picture
There's no build step: plain HTML and JavaScript, loaded by the browser. Edit a file, and reload the page.

```
TV, tablet, phone, laptop (browser)
        │  loads pages, pictures and voice files
        │  reads and saves family data at /api/state
        ▼
tools/serve.mjs  (on one computer)
        ├─ channel/          the app, lessons and media
        └─ data/family.json  family data, not in git
```

Every device gets the same app. **Who you are decides what you see:** a TV with no sign-in shows the channel, a child's login opens their app, and a parent's opens the parent area.

## Where things are
| Path | What it holds |
|---|---|
| `channel/index.html` | The page shell, most styles, and the order scripts load in |
| `channel/app.js` | TV home, lesson player, scene types, routes |
| `channel/episodes/<id>.js` | One lesson each |
| `tools/serve.mjs` `/api/log` | The activity and error log: POST lines from devices (`Store.log` in `views/store.js`), GET the last days for Admin's Feedback and checks |
| `tools/voice/word-help.mjs` | Adds a lesson's Spanish key words to its recording run, as clips named `<lesson>-wh-es-<word>` |
| `channel/keywords/<lang>/<id>.js` | Word help: a lesson's key words in another language. The player (`wordHelp`, `showWordHelp` in `app.js`) shows them in a corner card when on |
| `channel/curriculum.js` | The program: subjects, units and lessons |
| `channel/views/store.js` | **All family data goes through here** |
| `channel/views/student.js` | Child's app and tests |
| `channel/views/questions.js` | Every question type |
| `channel/views/schedule.js` | Works out each child's classes and states from the timetable |
| `channel/views/diary.js` | The child's diary (paper щоденник layout), and for parents the week (`drawParentWeek`) and the timetable (`drawTimetable`) in the Board style, inside the pad frame. Parent cards (a class, a timetable slot, school year and breaks) open with `sheet()` inside `.padRoot` and make the page behind `inert`. Styles: the "The week and the Timetable, for parents" block in `index.html` (`.wk*`, `.tb*`) |
| `channel/views/pad.js` | Every parent screen's frame and the pad itself: `model()`; `board()` (the pad); `frame()` (Back, title, tools, content, the bottom menu `nav()`); `adminShell()` for Admin and `pageShell()` for pages other files draw (the week, the timetable, the program); pad pages in `PAGES` (the day, test results, pages to print, the program, a child); `fit()`, which shows what fits in a list plus a named link. Styles in `channel/index.html` under `.pz` and `.dBoard` |
| `channel/views/parent.js` | Admin behind the pad's gear, plus the Gradebook |
| `channel/views/exam.js` | The exam |
| `channel/views/themes.js` | Theme colors and shapes |
| `channel/views/map.js`, `program-doc.js`, `how.js`, `screens.js` | Learning map, program document, brochure, internal page list |
| `channel/views/print.js`, `print-thumbs.js` | Materials (`#print`, inside the pad's frame): categories → gallery (`#print-cat-<id>`) → one page (`#print-<key>`: `lesson-<id>`, `exam`, `week-<child>`, `habits-<child>`, `pack`). `pages()` lists every real page and how to draw its sheets; `keysOf(cat)` gives a category's pages. The sheets turn exam and lesson-test questions into paper form, with answer pages. Print fills `#prHost` with only the chosen sheets, and the print styles show nothing else. `print-thumbs.js` draws the small page pictures. Styles: the `.pr…` (paper) and `.mt…` (Materials) blocks in `index.html` |
| `channel/kid-lab/` | Screen Lab. Separate from the real app |
| `channel/theme-kit/`, `round1/`, `game/`, `test-styles/`, `style-references/`, `layouts/` | Older design work, kept as a record. Don't build on them |
| `channel/assets/` | Pictures, voice, avatars, icons. Sources: `assets/img/credits.json` |
| `tools/` | Server, checks, voice and art tools |

## How a lesson plays
1. A lesson file adds an object to `window.EPISODES`. It has `scenes`, and each scene has `beats`, which are single spoken lines.
2. `runFrom()` in `app.js` goes through the scenes. For each one, `mount()` draws it using its `type`, and returns a function that shows each beat.
3. For each beat, `speak()` plays `assets/voice/en/<scene id>-<beat number>.mp3`. It waits until the clip ends, plus any `hold`. Timing comes from each recording's real length, listed in `manifest.json`.
4. A `video` scene pauses this and plays YouTube, then carries on.
5. At the end, the lesson is marked as watched, and the screen tells children their test is waiting.

**Sound:** when Play is tapped, a moment of silence plays, because Safari and iPads only allow sound on a player that really played during the tap. Animations use GSAP, which pauses as a whole when a lesson is paused.

**To add a lesson:** follow `docs/rules/LESSON-RULES.md`, add the script tag in `index.html`, add it to `curriculum.js`, record with `npm run voice <id>`, then run `npm run check:lessons`.

## How family data works
- `store.js` keeps a copy in the browser, and sends changes to the server. On load, it reads the latest from the server.
- `tools/serve.mjs` keeps one file, `data/family.json`. If it's missing, the first device to connect creates it from example data.
- It holds the parent, children, test attempts, exams, watched lessons and school settings.
- **It isn't a database.** Sign-in is checked in the browser, `/api/state` has no sign-in, and passwords are plain text. Fine for testing at home, not for anyone else's family. The replacement is in `FAMILY-DATA-PLAN.md`.

## How a school day is worked out
`schedule.js` takes the timetable and the program, and fills each class with the next lesson in that subject. Units marked `{ bonus: true }` in `program` are skipped, so a bonus unit never fills a class. It doesn't store past days, so changing the timetable can move past dates. That's a known limit.

**Lesson, then test:** a test appears only after its lesson is watched. A lesson finished on the TV counts for the whole family, because the TV doesn't know who's in the room. A lesson finished on a child's own device counts for that child. While the child's app is open, it checks every 6 seconds for new work.

## The Screen Lab
`channel/kid-lab/index.html` holds the page, older looks and all styles. `looks.js` adds the child looks. Each look is a function that returns a screen's HTML. Nothing there reads real family data.

## Voices
See `VOICE-PLAN.md`. Lesson text and `tools/voice/voices.json` go in, and MP3 files plus `manifest.json` come out. Both are in git, so nobody needs to record anything just to run the lessons.

## Checks
| Command | Checks |
|---|---|
| `npm run verify` | Disk space, each voice file, server, Wi-Fi address, and that each lesson starts speaking |
| `npm run check:lessons` | Opening, ending and video rules, and that every line has a voice file. All 7 lessons pass (2026-11-11) |
| `npm run check:lab -- <folder>` | Every look and section at each size: off screen, cut off, missing pictures. Saves pictures to the folder |

All run hidden and muted. They can't tell whether something sounds or looks good, so a person still has to check. **No check yet plays a whole lesson to the end.**

## Known weak spots
From Codex's review, and confirmed in the code. See `ROADMAP.md`.
- `app.js` and `index.html` are large, and scripts depend on load order.
- Lessons are code, not checked data.
- Tests save scores and the positions of missed questions, so changing a question can change what old results mean.
- Signatures in the diary are only a date, with no name.
- No automatic tests run when code is saved to GitHub.

**Contrast check:** `node tools/browser-check.mjs "http://localhost:8081/?pad=widgets&t=1.4&c=1" tools/contrast-check.js 1180 820` measures every text on screen against what's really behind it, and reports anything under 4.5:1 (3:1 for large text), text under 14 px, and page scroll.
