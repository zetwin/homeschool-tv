# What the parent pad is for

Last updated: 2026-11-07. **Status: content simplified on 2026-11-09 (no marking or homework); three directions waiting for the owner's pick. Everything a parent needs is listed in `PARENT-APP-SPEC.md`.** This page comes before any look. `PARENT-CONTROL-CENTER.md` holds the rest of the plan.

Written after the owner rejected the second six parent looks: "weak poor generic sketches", "content on the pages have no sense", "complicated forms, not clear how to use what for".

## The main goal of the app, for a parent
**My children get a proper education, I can see they are really learning, and it doesn't take over my life.**

| Part | What the parent feels | What the app does |
|---|---|---|
| **Proper** | "I'm not missing anything" | A full program that follows a known curriculum, in a clear order |
| **Really learning** | "I know it's working" | Tests, re-tests and marks that show what they remember |
| **Doesn't take over** | "I still have a life, and I'm still their parent" | The TV teaches, and marking is automatic where possible. Target: under 15 minutes of managing a week (`PRD.md`) |

Underneath is one worry: **"Am I doing enough?"**

## The main goal of the pad
**Tell me in a few seconds whether school is running well and what I need to do. Then let me do it in a few taps.**

It is a tool to get things done and get out, not a place to sit and watch. A good result is the parent putting it down quickly.

## When a parent really opens it
My earlier screens imagined one moment, 9:50 on a Friday. Real use is these moments, and home has to work for the commonest.

| When | How long | What they want |
|---|---|---|
| Before school | 1 to 2 min | What's on today? Do I need to prepare anything? |
| Starting a lesson | Seconds | Start it on the TV, and control it |
| During a lesson | Glances | What should I say or ask here? |
| After a lesson | 1 min | How did each child do? |
| Evening | 5 min | What should we talk about tomorrow? (Written answers are checked by the children themselves, so nothing here waits for marking) |
| End of week | 5 to 10 min | Did we do what we planned? Sign the diary |
| When life happens | 1 min | Someone's ill, or we're away. Move things without breaking the year |
| When worried, or at term end | 10 min | Are they really learning? Show me the proof |

## Everything a teaching parent could want
**Have:** in the prototype's parent area today. **Part:** some of it exists. **Planned:** already in our plans. **Idea:** new here.
**Where:** Home, one tap away, or Rare (kept somewhere deeper).

### 1. Run today
| Section | The parent's question | Status | Where |
|---|---|---|---|
| Today's classes | What's on, and what's next? | Have | Home |
| Start the lesson on the TV | How do I begin? | Idea (the TV plays lessons, but the pad can't start them) | Home |
| Phone as TV remote | Pause, go back, skip | Planned, sample only | One tap |
| Teacher's notes for this lesson | What's it about? What should I ask? | Planned | One tap |
| What to prepare | Paper, scissors, anything? | Idea | Home, only when needed |
| Who teaches what | Is it me or my partner? | Planned | Home, with two parents |
| Start an exam (PIN) | Open it for my child | Have | When due |
| Attendance and hours | Record that school happened | Planned | Automatic |

### 2. See how they did
| Section | The parent's question | Status | Where |
|---|---|---|---|
| Results from today | Did they pass? Who struggled? | Have, in the Gradebook | Home, short |
| Marking written answers | What's waiting for me? | Removed 2026-11-09: children check their own written answers | Nothing |
| Mistakes they share | What should I go over with everyone? | Idea | One tap |
| Homework done or not | Did they do it? | Part | One tap |
| Re-tests | Do they still remember it? | Have for children. No parent view yet | One tap |

### 3. Know each child
| Section | The parent's question | Status | Where |
|---|---|---|---|
| One line per child | Is each child OK? | Idea | Home |
| Child's page | How's this child doing overall? | Part | One tap |
| Strong and weak topics | What's solid? What isn't? | Idea | One tap |
| Marks by subject over time | Getting better or worse? | Part, in the Gradebook | One tap |
| What to talk about | What should I say to my child? | Idea | One tap |
| Missed lessons | What did they miss? | Have for children. No parent view yet | Home, when any |
| Time spent | How long are they really working? | Idea | One tap |

### 4. Change the plan
| Section | The parent's question | Status | Where |
|---|---|---|---|
| This week | What's coming? | Have, in the Timetable | One tap |
| Move or skip a lesson | We can't do this today | Part. Changing the timetable can move past dates | One tap |
| Sick day or trip | What happens to the plan? | Idea | One tap |
| Extra practice | Give this child more of this topic | Idea | One tap |
| Add my own task | Piano, a museum, a book | Part | One tap |
| Approve videos | Is this OK for my children? | Planned | Rare |
| Pace and level | Slower, faster, different per child | Planned | Rare |

### 5. Proof and records
| Section | The parent's question | Status | Where |
|---|---|---|---|
| On track for the year | Are we behind? In what? | Idea | Home, one line |
| Curriculum covered | Is anything missing from the program? | Part, in Program | One tap |
| Diary and signature | Sign off the week | Have | When due |
| Gradebook | Every mark, by date | Have | One tap |
| Term report | A proper document | Planned | Rare |
| Print or export for the authorities | Show the records | Planned | Rare |

### 6. Between parents and children
| Section | The parent's question | Status | Where |
|---|---|---|---|
| Handover note | Tell my partner what happened | Planned | One tap |
| Shared job list | Who's marking this? | Planned | One tap |
| Note or praise to a child | Well done, or try this again | Idea | One tap |

### Not on the pad: Admin
Payment, parent invites, child logins, privacy, school year settings and deleting data.

## The flow
**Login, then the parent pad, then Admin through the gear.** The owner chose this: it separates the screens and keeps it simple. Until 2026-11-07 the gear was a thin sun-like drawing, and the owner couldn't find Admin ("where is a button to open admin?") and read it as "change theme". The owner then decided: "Lets have admin under gear icon in parents pad." So the pad's top bar has four big tools, each an icon with its word under it: **Look** (a paint palette: choose how the pad looks), **Text size** (a big Aa: text size and strong contrast) **Tell us** (a speech bubble: send an idea or a problem) and **Admin** (a real gear). On a phone the bar shows only the TV badge, so all four fit. Sign out is inside Admin, and also on the top bar where there's room. The small word under the gear is waiting for the owner's yes.
- **Pad side, with no side menu:** the pad, plus the week (Diaries), Timetable, every score (Gradebook) and the Program document, each with "Back to the pad".
- **Admin, behind the gear:** Family, Your account, Lessons and languages, How it works, Plan and billing, Feedback and checks, Sign out. It keeps its side menu, because it's a settings area.

## One design everywhere: Board (owner, 2026-11-09)
The owner chose **Board** ("do a board") and asked for one design on every parent screen: "unify everything to be the same like on pad screen ... big buttons ... clear blocks/sections/containers", with "progress circles in kids avatar/name section to the right", a "bottom nav ... visible all time", and Admin as "simple page app, without scrolls".

- **The pad:**
  - Each child's header holds the face, name, tests line, last result and a **progress circle** on the right (classes done today out of the day's classes).
  - Classes are one compact line each: time, subject and a tick.
  - Summary and Cards are deleted.
- **The bottom menu is on every parent screen:** Today, Pages to print, Test results, The week, Timetable, The program. On a phone, on a portrait iPad and at big text it shows short words.
- **One frame for every other screen:** Back, a title, Text size, Tell us, Admin, the content, and the bottom menu.
- **Admin:** a one-screen page with big section buttons on the left and the chosen section on the right. It no longer jumps or resizes when you tap. On a phone the section buttons wrap into rows above.
- **Shared parts everywhere:** cards, lists, fields, buttons and choices share one set of sizes and colours.
- **Not done yet:** The week and the Timetable are restyled only at the surface. Their own redesign in the Board style is a separate job.

## What the pad holds (owner, 2026-11-09)
**The rule:** the TV teaches, tests and exams mark themselves, and children go through everything on their own. The pad never asks a parent to mark, set homework or check work. Owner: "why do we need to put the marks, why do we need to enable homework's ... feels like we invented something just to have", and "have kids be able to go thru everything independently? without having us to check anything?"

**On the pad:**
1. **Today's lesson for the TV,** with a big **Play**. If no lesson is made for that class, it just says so.
2. **Each child:**
   - **Tests:** "All tests done" or "3 tests to do". Tests appear by themselves after a lesson, and the child does them on their own device.
   - **Catch up:** lessons to catch up, when there are any.
   - **The last result, in words:** "Muscles: 10 of 12 right".
3. **One tap away:**
   - **Pages to print:** for now only the program document. Exam papers, exercises, weekly tasks and habit charts are being made as their own job.
   - **Test results**
   - **The week**
   - **Timetable**
   - **The program**
4. **Admin** behind the gear.

**Removed from the pad:** giving class marks, setting homework, homework statuses, averages out of 12, rating lessons, the marking inbox, "No school today" (it stays in the week), and the class sheet.

**Moved to their own jobs, proposed to the owner:**
- children mark their own written exam answers against the model answer (no parent marking)
- the "Pages to print" section at `#print`

## Three directions from research (2026-11-07, late)
The owner rejected Widgets, Day ribbon and Family too: "None of them looks good ... not different looks, similar same issues as before. Do a research ... use them as references ... Also I don't like to have admin side as slide panel should be a separate page." The research is in `docs/research/2026-11-07-design-research.md`, and its rules are in `rules/DESIGN-VARIATIONS.md`. The three earlier directions are deleted.

| Direction | Learnt from | The idea |
|---|---|---|
| **Board** | Skylight Calendar (Day view), Things 3 (Today), Google Classroom summaries | The three children side by side, each a column with face, colour, progress bar, and the day split into Morning and Afternoon with tick circles. Above it: one sentence, Needs you, and the next lesson with Play |
| **Summary** | Apple Health (Summary), Apple Fitness (rings), Apple Weather (hero) | One hero: a ring per child and one sentence about the day, with the next lesson and Play. Then Needs you, then highlights in plain words, then places to browse |
| **Cards** | Google Family Link (2025), Material 3 Expressive | A switcher pill (Everyone or one child) and a bell for what needs you. Cards each pair a fact with its action; the biggest is the next lesson, with a large Play and the rest of the day |

**In all three:**
- **Admin** is a separate full page, the Admin area in the same colours. Board and Cards show its sections as tabs across the top; Summary keeps the iPad Settings sidebar.
- **Deeper places** (a child, scores, homework, the day, Needs you) open as full pages with Back.
- **Short tasks** (a class's mark and homework, text size, Tell us) open as a centred sheet on iPad, from the bottom on a phone.
- **Lists show what fits, then a named link** ("All 5 classes"). This keeps one screen at Extra large text without cutting anything. The one exception: a phone at the biggest text may scroll, which Apple and WCAG require.
- **The check:** `tools/contrast-check.js` checks contrast, cut text, overlapping text, empty buttons and page scroll. All three pass at 1180×820, 820×1180, 390×844 and 1920×1080, at normal and Extra large text, and in strong contrast.
- **Admin may scroll:** its pages are documents, like iPad Settings, and the Family page scrolls when it's long.
- **After the design review:**
  - Each child shows their average mark and homework.
  - Board keeps rows and ticks at Extra large text.
  - Summary labels every ring with names and counts, so colour is never the only clue.
  - Cards drops the duplicate bell; when nothing needs you, it says so on the Today card.
  - "No lesson" is a word, not a dashed circle.

## The Day Board
The owner asked for "one screens pad app/dashboard/home control", compared three looks on an iPad, and chose **Day Board** on 2026-11-07. It's a school register: classes down, children across, and marks written big. Under them, one line per child, then six buttons for everything else. Detail slides over the screen in a panel.

Home Control and Three Children were removed. They're in git history, at commit `8949e37`.

## Easier to read
The **Text size** button (a big Aa) opens three text sizes and strong contrast. If big text no longer fits, the classes scroll inside the board, while the top bar and bottom buttons stay on screen.

## The pad's contents: the owner's list
The owner chose: "where they are, their scores, some management of schedule or today classes, home works statuses, to be able to see the full program, maybe to score the lesson. Kind of simple dashboard."

| Block | What it shows | What you can do |
|---|---|---|
| **Today's classes** | Time, subject and topic, and each child's status | Play the lesson, tap a child to give a mark or set homework, "No school today", see the week, change the timetable |
| **Where they are** | For each subject, the unit and lesson on the timetable this week, and each child's finished lessons | |
| **Scores** | Each child's number of tests, average mark and latest result | See every score |
| **Homework** | To do, Late or Done, per child | |
| **Rate the lessons** | Every watched lesson, with your stars and each child's rating | Give your own stars |
| **The full program** | Each subject's units and lessons, and how many we've made | Open the program document |

It's one page that opens from a tablet or phone home screen, not a separate app. **Scoring a lesson:** the owner said "both can rate it". I understood that as the parent and each child each giving a lesson 1 to 5 stars, which is separate from the mark a parent gives a child. A child rates after the lesson test or from the diary. The parent rates on the pad or from a class, and sees every child's rating. "Play the lesson" plays on the device in hand: the pad can't start the TV yet.

## What was wrong with the last screens
- **I invented a crisis.** "Ana stuck on question 5 for four minutes" needs detection we don't have, and a parent helping during a scored test goes against what a test is for.
- **It was built around one minute,** not the moments above.
- **The main teaching job was missing.** No look had a real way to start a lesson.
- **Invented features sat beside real ones,** with no way to tell which was which.
- **I polished the look before agreeing on the content,** so a reviewer could only fix details of the wrong thing.

## What research says, and how far to trust it
Details are in `research/2026-11-06-parent-screens.md`. This is thin: I found no good recent study of what homeschool parents want from an app, and **no parent has been asked**. The owner's own experience counts for more.
- Parents rated time alone and with a spouse, **interruptions during school time** and **physical exhaustion** as hardest. They rated belief in home schooling, other home schoolers and a supportive family as most helpful. This is one small 1994 Florida survey, so it's only a hint.
- New homeschooling parents showed more burnout than experienced ones. Also small: 64 parents in 2020.
- So the pad shouldn't add alarms and interruptions, and a new parent needs more guidance than an experienced one. **That conclusion is my judgment.**
- Other products mostly offer progress, marks, attendance, lesson plans and reports. That's what they advertise, not proof of what parents use.

## How the next try works
1. Done: the owner set the contents.
2. Done: built as plain content with real data, in the app's existing style, as the home screen after login. The owner checks that it makes sense.
3. Done: three directions built properly, using the `frontend-design` skill's steps. The owner chose one.
