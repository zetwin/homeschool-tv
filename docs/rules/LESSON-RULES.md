# How we make a lesson

Last updated: 2026-11-06. **Follow this for every new lesson, without being reminded.** It joins the owner's corrections so far. Details on titles and images are in `docs/rules/CONTENT-RULES.md`, and on rights in `docs/rules/COMPLIANCE-AND-LICENSING.md`.

## What a lesson must feel like
- **One show:** every lesson has the same colors, fonts, voice and overall feeling, so it's clearly Home School TV.
- **Never the same twice in a row:** each chapter looks and moves differently from the one before.
- **Clear first:** a new idea only goes in where it clearly helps at that moment. Variety must never become a mess.
- **Respect the viewers:** they're 10 to 12. Not babyish, not corporate, not scary.

## The steps, in order
| # | Step | Result | Who |
|---|---|---|---|
| 1 | **Place it in the program** | Subject, unit, lesson number, official objectives, and what comes before and after | `curriculum-researcher` |
| 2 | **Say it back** | For new kinds of lessons or big changes: tell the owner the plan and wait for a yes | Claude |
| 3 | **Collect the facts** | A fact sheet with a source for every claim | `fact-checker` |
| 4 | **Find the wrong idea** | What children usually believe, to build the lesson around | Claude |
| 5 | **Write the script** | What we learned first, then Today, the opening and the chapters | `lesson-writer` |
| 6 | **Plan the look** | One visual idea per chapter, from the lists below | Claude |
| 7 | **Find pictures and write the video plan** | Each one checked against its line. Videos played inside our page | `license-checker` |
| 8 | **Build, then watch every chapter opening together** | A contact sheet: no two neighbors alike | Claude |
| 9 | **Check the facts again** | Fix everything found | `fact-checker` |
| 10 | **First-look check** | A helper with no background sees only the screens | `first-look-tester` |
| 11 | **Record the voice, and test** | TV size, then phone. Full play-through | `tv-tester` |
| 12 | **The owner watches it** | Claude can't see videos or hear audio | Owner |

## How big a lesson is
**Every new lesson runs about 15 minutes:** about 10 minutes of voice and 2 or 3 short clips. The owner decided this on 2026-11-06, after finding lessons with 5 to 6 minutes of voice too small. **A new lesson includes 2 or 3 suggested clips inside its chapters,** marked `status: 'candidate'`, chosen from the title, channel, description and chapters, and checked that they embed. The owner then judges them inside the lesson. A new lesson stays hidden from children (`review: true`) until the owner has watched it, clips included. The owner asked for this on 2026-11-07, upset that new lessons had no clips. The old wording, "voice only until the owner approves clips", led to lessons with none.
- A 45-minute class holds a starter quiz, the lesson, the test and a break.
- **Plan the whole topic before the first lesson,** and say what's coming: a series covers what one lesson can't.
- Bigger topics get more lessons, not a very long one.

## Running order
Every lesson has the same three parts. **A lesson never jumps straight into teaching, and never jumps straight from teaching to the QR code.**

| Part | What's in it | Time |
|---|---|---|
| **Opening** | See "How a lesson opens" below | 1 to 2 minutes |
| **Teaching** | Usually 4 to 7 chapters, each teaching one idea from the objectives. Something to do in at least one: try it, predict it or shout it out. Videos where they help. Bonus last, clearly marked and never tested | Most of the lesson |
| **Ending** | See "How a lesson ends" below | About 1 minute |

**Length:** about 10 minutes of voice in all, plus clips. The opening and ending count toward it.

## How a lesson opens
**Like a real class: the teacher says hello and what today is about before anything else.** The owner asked for this three times, on 2026-11-06 and 2026-11-07. The first thing a child hears is never a surprise question or a fact. It's "Welcome to Spanish. Today we're learning…, because…". The hook comes after that. Chapter name on the timeline: **Intro**. A viewer can always skip it with the remote.

| Kind of lesson | Opening, in this order |
|---|---|
| **First lesson of a subject** | **Welcome to the subject** (with the greeting) → **What you already know** → **Where we're going** → Hook → Title → **Today** |
| **First lesson of a new unit** | **Welcome** → **What you already know** → **New unit** → Hook → Title → **Today** |
| **Any later lesson** | **Welcome** → **Last time** → Hook → Title → **Today** |

**Every lesson, without exception, says three things before it teaches:** hello and what this lesson is, what the children already know, and what they'll learn today and why it's worth knowing.

### What each part does
| Part | `part:` in the file | What it says | Rules |
|---|---|---|---|
| **Welcome** | `greet` | Always the first thing heard. Hello, the subject and the lesson by name: "Welcome to Science, Lesson 2: How Do Your Muscles Work?" Then one sentence on what we're learning today, and one on why it matters in their life | 15 to 30 seconds. A warm teacher's voice, plain words, no surprise yet. In the first lesson of a subject, `welcome` does this job and comes first |
| **Hook** | `hook` | A surprise or wrong idea about today's topic, about 20 seconds. **It comes after the welcome, never first** | Belongs to this lesson's topic |
| **Welcome to the subject** | `welcome` | **First in the lesson.** Hello, and what this subject is, why it's worth having, and what you'll be able to do by the end. Spanish: "Over 600 million people speak it, and by the end of this unit you can say where you and your friends are". Also how lessons in this subject work, such as "speak out loud" | 30 to 45 seconds. A real reason a child cares, not "this is important". No teaching yet |
| **Where we're going** | `journey` | A "you are here" view: this unit, its lessons, and this one lit up | 10 to 15 seconds. Use the real lesson list |
| **New unit** | `unit` | How this unit links to what they already know, and what it will let them do | 20 to 30 seconds |
| **Last time** | `lastTime` | What we learned last lesson, as 2 or 3 short points with their pictures. Then one quick question they answer aloud before it's shown, such as "How do you say I am in Spanish?" Then one line linking it to today | 30 to 45 seconds. **Comes from the last lesson's "What we learned", in the same words.** Nothing new. Say "If you missed it, that's fine" where it helps |
| **What you already know** | `known` | Links today to something learned before. Use the lesson or unit that comes before it in the program, such as "Last unit, your muscles pulled your bones. Today: who tells them when?" For a brand-new subject, use everyday life: "You've already felt angry, scared and excited." Then one quick question they answer aloud | 20 to 40 seconds. Name the earlier lesson by its real title. Say "If you haven't watched it, that's fine" |
| **Title** | `title` | Says the topic plainly | |
| **Today** | `today` | 2 or 3 things "you'll be able to do", in a child's words, with a small picture each. **Then one sentence on why it matters** in their own life | 15 to 25 seconds. These are promises: the ending must pay them off |

## How a lesson ends
Timeline name: **What we learned**. It's always the last thing before the test, after any bonus.

| Part | `part:` in the file | What it says | Rules |
|---|---|---|---|
| **The answer** | `answer` | Answers the hook's question or wrong idea from the start | One or two lines. Closes the loop |
| **What we learned** | `summary` | 3 to 5 short points, one per chapter's main idea, each with a picture from that chapter. Each of **Today's** promises is ticked off | 30 to 45 seconds. Nothing new. Only things that were taught. Next lesson's "Last time" uses these words |
| **Next time** | `next` | One line that makes them curious about the next lesson | 10 seconds. Use the real next lesson. If it doesn't exist yet, name the next topic only |
| **Test, then QR code** | Comes after `next` | "Now show what you know." Then the screen with the QR code | Voice and text on the QR screen stay short |

**Write in this order:** write What we learned first, then Today from it, then the chapters. If a chapter doesn't feed a summary point, question whether it belongs.

## Chapter openings
Six layouts exist now. Use a different one from the chapter before. Add more when a subject needs it.
| Layout | Looks like | Best for |
|---|---|---|
| Picture right | Tilted card, title on the left | An object to show |
| Full screen | The picture fills the screen, with the title over it | Places, big sights |
| Big number | A huge chapter number | Ideas with no strong picture |
| Half and half | The picture fills one half | Comparing, or real textures |
| Picture left | Tilted card, title on the right | A change of rhythm |
| Wide band | A picture strip across the top | Landscapes, wide objects |

## Scenes inside a chapter
Mix these. Don't use the same kind more than twice in a row.
| Kind | Use it for |
|---|---|
| Moving drawing | Showing how something works |
| Real photo with slow zoom | Real things, with the named part visible |
| Atlas: zoom around a plate or map | Naming the parts of something |
| Big number that counts up | A fact worth remembering |
| Shout it out | Asking before telling |
| Try it now | Using the body, with a timer |
| Sentence, word by word | One strong statement |
| Cards | Up to three things to remember |
| Recap list | Locking it in |
| Video with "Watch for" | When someone explains it better than we can |

## What the best education channels do
From `docs/research/2026-11-06-video-and-book-design.md`. Numbers mark the ideas there. These are now rules, unless marked "try".
| Rule | From | What it means here |
|---|---|---|
| **Start with the wrong idea** (1) | Veritasium, and Oak's misconceptions | Each lesson shows what people wrongly believe, then disproves it. Clear videos can teach almost nothing if they skip this |
| **Write what's said and what's shown** (3) | TED-Ed, Kurzgesagt | Plan both together. If the picture says it, cut the words |
| **Picture first, name second** (4) | 3Blue1Brown | Show the idea, then give the word |
| **Sections that return** (5) | Mark Rober-style hooks, Horrible Science | Wrong!, Record holders, Try it, Bonus: same name and look each lesson |
| **Promise only what's delivered** (6) | Top creators | Design the cover and title first. The lesson must pay them off |
| **Count by repeating** (9) | Isotype | Show 206 small bones, not only "206" |
| **Color and size mean something** (10) | Isotype | A color stands for one thing through the lesson |
| **Every number gets a comparison** (11) | Tufte | Compared with something a child knows |
| **"You are here"** (13) | Tufte | When zoomed in, a small picture shows where we are |
| **Label on the thing, as it's said** (14) | Learning research | No legends or side panels |
| **End a chapter on a still page** (16, try) | DK books | Motion teaches, then settles into a page to read |
| **Show stages side by side** (17, try) | Tufte | Keep all steps on screen after they play |
| **Music only in the gaps** (21, try) | Learning research, Kurzgesagt | Compare two versions, because the evidence is mixed |

## Ideas to add only where they fit
- **A second voice** that gets things wrong: good when a misunderstanding drives the chapter.
- **One long journey** in a single shot: good for moving through a body, a map or a timeline.
- **A mystery** with clues: good for history, stories and puzzles.
- **Do it first:** the lesson waits while they try something.
- **Vote on the way forward:** good for history and stories.
- **Live answers on their devices,** shown on the TV: once the service can link devices.

## Motion and sound
- **Motion must explain something.** No animation just for decoration.
- **Big transition only between chapters,** in a different direction each time. Inside a chapter, scenes change quietly.
- **Text stays still while being read.** Move the world, not the words.
- **Draw it as it's said,** with labels on the object itself.
- **Effects scale with importance.** Save the biggest for the biggest idea.
- **Sound:** a short effect for each key moment. Music, once licensed, only in the gaps.
- **Controls stay hidden while playing.**

## Words
- Short, spoken sentences, with one idea per line.
- Explain a new word when it first appears.
- Say "about" or "more than" when numbers vary, and "mainly" or "most" when there are exceptions.
- Don't say "most people think" without evidence. Use "lots of people".
- Numbers are written in `say` and spelled out in `speak`, so the voice reads them properly.

## Voices
Settings and how to record: `docs/product/VOICE-PLAN.md`.
- **The main narrator stays the same in every lesson.** Children get to know one voice. Don't change it from lesson to lesson.
- **One more narrator can share a lesson** (proposed, once the owner picks a voice). They might take a chapter, ask what a child would ask, say the wrong idea, or play a character. The main narrator still does most of it. Never swap voices at random.
- **Languages:** each language has its own voices. Two speakers in a dialogue use `main` and `second`.

## Videos
Follow `VIDEO-RULES.md`, which says how to find them, which of the three kinds to use, and how to place them. **Every lesson has a video plan in its review notes,** even if the plan is "no video here, and why".
- **Usually 2 or 3 clips in a lesson,** no more than about a third of its time.
- **Play it inside our page first.** Some channels block this (error 150). Never send anyone to another tab.
- A clip never starts or ends a lesson, and two clips never run back to back.
- Don't test anything that only appears in a video, because a video may not play.
- The owner says yes or no to each one. Until then it's a draft, not for the children.

## Every lesson's file needs
Title, topic, unit, lesson label, blurb, hero image with its description, scenes, starter quiz, lesson test, credits, and a test reward that fits the lesson. Scenes in the opening and ending carry a `part:` tag, and video scenes carry `use:` (`support`, `break` or `chapter`). `node tools/check-lesson.mjs` checks all of this. See `channel/episodes/`.

## Before showing the owner
- [ ] `node tools/check-lesson.mjs <id>` passes
- [ ] The opening fits the kind of lesson: welcome for a new subject, new unit for a new unit, Last time for anything later
- [ ] It says what they already know, through Last time or What you already know, and Today says why it matters
- [ ] Today's promises are paid off in What we learned, which comes after any bonus and before the QR code
- [ ] Last time uses the last lesson's real summary
- [ ] The video plan is in the review notes, with a kind, a job and a fallback for each clip
- [ ] Title and cover say the topic in 3 seconds
- [ ] Every picture matches its chapter or line, and nothing is cut off
- [ ] No two chapter openings in a row look alike
- [ ] Every fact has a source, and the fact-check is fixed
- [ ] All videos played inside the page
- [ ] A helper with no background passed it
- [ ] Played at TV size and phone size
- [ ] New pages are on the internal page list

## How I'll do the next lesson
1. Read this file, `docs/rules/CONTENT-RULES.md` and the source lesson.
2. Tell you in a few lines: where it fits, its opening, the wrong idea it starts from, its chapters, how each will look, and its video plan. For a normal next lesson, I carry on straight away unless you object.
3. Build it, run every check above, and only then show you a link, with what I couldn't check.

## Spanish voices
Native speakers judge every Spanish voice before it's called good. See "The male Spanish voice" in `docs/product/VOICE-PLAN.md`.

## Is it a new subject, a unit or a bonus?
Check the official program first, and write what it says, with links, in `docs/research/`.
| Official objectives say | So it's | In the program |
|---|---|---|
| It's its own subject for this age | A subject | Its own entry in `program` |
| It's part of a subject, for this age | A unit | In that subject, in official order. It fills timetable classes |
| It's taught, but to older students, or not at all | A **bonus unit** | In the nearest subject, after what it builds on. Name ends in "(bonus)", with `{ bonus: true }`. It never fills timetable classes |

The opening says plainly that a bonus unit is an early start. **A lesson stays off the timetable until the owner has watched it.**

## Keeping every lesson up to the rules
- **When a rule changes, every lesson changes the same day.** Run `node tools/check-lesson.mjs` on all of them. Fix them all, or add each lesson that still fails to the team's private notes as P0. No lesson stays below the rules without a task.
- **Whenever a lesson is touched,** for any reason, bring all of it up to the current rules, not only the part asked about.
- **The checker enforces the order.** If a rule can be checked, add it to `tools/check-lesson.mjs`, so it can't be forgotten.
- **Every lesson file starts with a comment** saying which official program it follows (with the objective's words), what goes beyond it, and whether it's a bonus. Use "follows" or "aligned to", never "approved". The table of all lessons is in `docs/product/PROGRAM-ALIGNMENT.md`.
