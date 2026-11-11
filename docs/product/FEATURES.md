# Features

Last updated: 2026-11-11. **Everything we have, and how real it is. Update this whenever a feature changes.**

| Status | Means |
|---|---|
| **Works** | In the real prototype, using this family's data |
| **Sample** | A design to look at, with example data. Its buttons don't do real work |
| **Planned** | Written down, not built |

Open pages from `http://localhost:8080`. Where the page says `#me`, that means `http://localhost:8080/#me`.

## TV lessons
| Feature | What it does | Status | Where |
|---|---|---|---|
| Lessons | Skeleton, Muscles, Colombia's regions, Colombia's climate, Spanish Lesson 1, Emotional Intelligence Lesson 1, and neuroscience Lesson 1 (a bonus unit, waiting for the owner to watch) | Works. The owner hasn't yet watched Emotional Intelligence | Home page, `channel/episodes/` |
| Moving scenes | 11 scene types: title, chapter, photo, big number, atlas, cards, shout it out, statement, recap, video and custom art | Works | `channel/app.js` |
| Voice and subtitles | Recorded before use, one file per line. Subtitles can be turned off | Works | `channel/assets/voice/en/` |
| YouTube clips | Play inside the lesson, with a trimmed start and end. Skipped if one won't load | Works, for family use. Nobody has reviewed every clip | `channel/app.js` |
| Remote and keyboard | OK pauses, left and right skip 10 seconds, down reaches the controls. Timeline, chapters and full screen | Works. Not tested on a real TV by Claude | `docs/rules/TV-CONTROLS.md`, `/remote-test.html` |
| Continue where you stopped | Each device remembers its place | Works | `channel/app.js` |
| Opening and ending | Welcome or Last time, Today's goals, What we learned, Next time | Works in all 7 lessons: `npm run check:lessons` passes 7 of 7 (2026-11-11) | `docs/rules/LESSON-RULES.md` |
| Second English narrator | One more narrator beside the main one | Planned. Owner is comparing voices at `/voice-samples/` | `docs/product/VOICE-PLAN.md` |

## Child's app
| Feature | What it does | Status | Where |
|---|---|---|---|
| Sign-in | One sign-in for everyone. The account opens its own dashboard. The device stays signed in | Works, but checked only in the browser, so it isn't secure | `#me` |
| Today | Next lesson, To do, Catch up and today's classes | Works | `channel/views/student.js` |
| Tests arrive by themselves | After a lesson, the test appears under To do, with a banner if the app is open. No camera or typing needed | Works in a hidden browser. Not tried on a real tablet | `channel/views/student.js` |
| Diary | The week on one screen, or one day on a phone: homework, marks and the parent's note. This is the child's version; the parent's is "The week" below | Works | `#diary` |
| Lessons, To do, Marks | The other tabs | Works | `channel/views/student.js` |
| Settings gear | Name, picture, theme, light or dark, and sign out | Works | `channel/views/student.js` |
| Themes | 14 looks that change color, shape and type | Works. They don't change the layout | `channel/views/themes.js` |
| Add to home screen | Opens like an app on a tablet | Set up. Not tried on a real device | `channel/index.html` |

## Tests and exams
| Feature | What it does | Status | Where |
|---|---|---|---|
| Question types | 19 kinds, including tap a region, sort, match, order, listen, fill gaps and written | Works | `channel/views/questions.js` |
| Tests | Starter quiz, lesson test, fix my mistakes, and re-tests at 1, 7 and 30 days | Works. Saves the score and which questions were missed, not the full answers | `channel/views/student.js` |
| QR code after a lesson | Signs in a new device, then opens the test | Works | `channel/app.js` |
| Exam | Timed, started with a parent's PIN. The child checks their own written answers against the model answer, point by point, then sees the final result. Nothing waits for a parent | Works, for one exam | `#exam`, `channel/views/exam.js` |

## School year
| Feature | What it does | Status | Where |
|---|---|---|---|
| Timetable | Classes across the week, breaks and days off, per family or child. In the Board style (2026-11-10): a grid of tinted class blocks, tap one to choose its subject from big buttons; Everyone or one child; "Enough classes?" beside it, showing only the subjects that need more, with a button to put one in a free class; School year and breaks in a card. A phone shows one day at a time | Works. Changing it can move past dates | `#timetable`, `channel/views/diary.js`, `channel/views/schedule.js` |
| The week (parent) | One child's week in the Board style (2026-11-10): child buttons with faces, week back and forward, a card in the child's colour with a progress circle, classes done and the week's exams in plain words, the parent's note and Sign this week; then the five days side by side, each class with time, subject, the whole topic, an Exam tag, a tick when done, "Not done" on past days, a play mark when a lesson exists, and a quiet "No school this day" on today and later days. A portrait iPad, a phone and bigger text show one day at a time. Tapping a class opens a card with the topic, unit, goal and Play the lesson. No marks, homework or ratings | Works (released 2026-11-10) | `#diary` as a parent, `channel/views/diary.js` |
| Program | The whole year, unit by unit, which prints as a PDF | Works | `#program` |
| Learning map | Several views of the year | Works | `#map-year`, `channel/views/map.js` |
| Homework | Today it means tests, re-tests and what a parent writes. The full plan is bigger | Partly | `docs/product/HOMEWORK.md` |
| Term report | Formal report | Planned | the team's private notes |

## Parents
| Feature | What it does | Status | Where |
|---|---|---|---|
| Lesson ratings | The parent and each child give a lesson 1 to 5 stars. Only the parent sees all of them | Works | `channel/views/store.js`, parent pad, test result, diary |
| Official program | England's national curriculum per subject, from the pad's Full program panel | Works. Goals, not a lesson list | `channel/official/`, `docs/official/README.md` |
| Kids' program | In a child's Lessons tab: Ready now, all subjects, units and lessons, with what's ready and this week's unit | Works | `channel/views/student.js` |
| Install as an app | Add to the home screen, which removes Safari's bars | Set up. Not yet tried on a real iPad | `channel/manifest.json`, `docs/SETUP.md` |
| Admin | One screen in the pad's design: big section buttons (Family, Your account, Lessons and languages, How it works, Plan and billing, Feedback and checks, Sign out) and the chosen section beside them, from the gear on any parent screen | Works. Billing is free during the trial | `#parent-family`, `channel/views/pad.js` (`adminShell`), `channel/views/parent.js` |
| Parent pad | The home screen after login, in the Board design: today's lesson with Play, and the children side by side, each with tests to do or all done, lessons to catch up, the last result and a progress circle, then the day's classes with ticks. A bottom menu on every parent screen: Today, Children, Materials, The week, The program. Test results and the timetable open from Children and The week | Works (released 2026-11-10) | `#parent`, `channel/views/pad.js`, `#screen-dash-board` |
| Pad pages | Diaries, Timetable, Gradebook and Program document, opened from the pad. The Marking page was removed on 2026-11-09 | Works | `channel/views/parent.js`, `channel/views/diary.js` |
| Text size and contrast | Three text sizes and strong contrast on all parent screens, from the Aa button on the pad | Works. Saved with each parent's own login. Children's screens aren't affected | `channel/views/pad.js` |
| Parent logins, one per adult | **Family** in Admin lists parents and children; a tap opens a person's card. **Add a parent** shows a one-time starting password to hand over, and that parent chooses their own on first sign-in. Other parents' passwords stay hidden, with **Make a new password**. Children's passwords stay visible to parents. **Your account** holds your own name, username, password, text size and contrast. The sign-in page shows example logins only while every parent still has the starting password | Works on the work copy (2026-11-07) | `#parent`, gear, Family |
| Materials (was Pages to print) | The bottom bar's Materials, at `#print`. It opens on every category as equal cards: This week, each subject that has lessons, Charts and forms, Exam papers (parents only), with one quiet line naming the kinds still to come. A category opens as a gallery of its pages. A page opens on the right, as the real sheet, with the category's other pages listed on the left, red Print, Previous and Next, This week or Next week for charts, and Add the answer pages for worksheets and exams. This week holds this week's lesson worksheets, and each child's week and habit chart, with Print the pack. Print sends only the chosen pages: A4, black and white, nothing of the app around them. On a phone, a page opens full screen | Works (released 2026-11-10). This is direction F from the Materials lab. No Send to devices yet. Habits are paper only | `#print`, `channel/views/print.js`, `channel/views/print-thumbs.js` |
| Two parents with different roles | Who pays and who teaches kept apart, with names on actions | Planned | `docs/product/FAMILY-DATA-PLAN.md` |
| Phone as a TV remote | The parent's phone controls the TV, with notes and answers | Planned | `docs/product/PARENT-CONTROL-CENTER.md` |

## Design
| Feature | What it does | Status | Where |
|---|---|---|---|
| Screen Lab | Compares child looks side by side at real device sizes | Works, as a design tool | `/kid-lab/` |
| 3D art | Scenes rendered once to images, so devices need no 3D | Works | `tools/kid-art/` |
| Materials lab | F (chosen, and now the real Materials page): categories, then a gallery, then the page on the right with the others on the left. Also D and E: the list on the left, the opened page on the right (phone: the page opens over the list), with This week first (D) or as a card (E). First round kept: A Shelves, B This week's bag, C Subjects, each with real-looking pictures of the printed pages, the pad's header and bottom bar, iPad and phone, 1 to 6 children (`?kids=`) | Prototypes, 2026-11-10. F is built into the app; the others stay as samples | `/materials-lab/`, `channel/materials-lab/` |

## Under the hood
| Feature | What it does | Status | Where |
|---|---|---|---|
| Server | Serves pages and saves family data to one file, on this computer | Works, for home use only | `tools/serve.mjs` |
| Family data | One small file, not a database | Works. The family's server Mac backs it up every night (`tools/host/`). Any other copy has **no backup** unless you set one up | `data/family.json`, not in git |
| Database | Accounts, roles, history and access rules | Planned, not built | `docs/product/FAMILY-DATA-PLAN.md` |
| Voice recording | Made on this computer, with all settings in one file | Works | `tools/voice/`, `docs/product/VOICE-PLAN.md` |
| Spanish voice | Chatterbox, recorded in takes, and kept only when speech recognition hears the right words | Works. Clarity measured, but not judged by native speakers yet | `tools/voice/chatterbox-make.mjs`, `docs/research/2026-11-07-spanish-voice-tests.md` |
| Checks | `npm run verify`, `check:lessons` and `check:lab`, in a hidden muted browser | Works. Doesn't yet play each lesson to its end | `tools/` |
| Online hosting, payments, public sign-up | Running away from home, and for other families | Planned. Not a focus now | `docs/product/ROADMAP.md` |
| Word help (Spanish key words) | While a key word is said, a corner card shows it in Spanish; the lesson's end screen lists all its words in both languages. Off by default, so English lessons are unchanged. Set for the family in Learning plan, Languages, or per child in Family. Word lists are checked by us before they ship | Works for six lessons (2026-11-07): all except Spanish 1, which teaches Spanish already. Words written by Claude in neutral Latin American Spanish; a fluent speaker should read them | `#parent`, gear, Learning plan |
| Refresh keeps your place | Every screen writes its name in the address, so a refresh or an iPad reopening the app returns to the same screen: the pad, each Admin page, the diary, timetable, program, map, and each child's tab | Works (2026-11-07) | Any screen, then refresh |
| Activity log and error collection | Sign-ins, lessons started, finished or left early, failed videos, voices and saves, and screen errors go to a log on the Mac (`data/family-log.jsonl`, 90 days). Nothing leaves the home | Works (2026-11-07) | Admin, Feedback and checks |
| Feedback button | A speech bubble at the top of the parent pad: an idea or a problem, typed or spoken. Saved with the family data | Works (2026-11-07) | Pad, speech bubble |
| Sign-in screen | App-style: fixed top bar, the form stays above the keyboard on iPads and phones, Next then Go on the keyboard, a Show button for the password, clear messages. Failed tries are logged by username only | Works (2026-11-07), tested in Safari's engine on iPad portrait, landscape and iPhone | `#me` |
| Away from home | Over Tailscale, open `http://<the Mac's Tailscale number>:8080`. The `.ts.net` name doesn't work over http | Works | — |
| Tests and exams (for parents) | A designed brochure like How it works: cover, six kinds of check, the lesson test, re-tests, exams, where marks go, and where the ideas come from. Prints as a PDF. Back returns to where you came from | Works (2026-11-07) | Admin, Learning plan, How tests and exams work |
| Spoken Spanish key words | When word help is on, the lesson's end screen reads every Spanish key word aloud as it lights up; tapping a word plays it. 140 words recorded for six lessons | Works (2026-11-07). A native speaker must listen | End of a lesson |
| Try the test (parents) | A parent at the end of a lesson can take its real test on the same screen. No mark is saved | Works (2026-11-07) | End of a lesson |
