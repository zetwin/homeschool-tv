# Activities: done on a device, or printed

**Status: a plan, agreed in words on 2026-11-10. Nothing here is built yet, except what's marked "Built".** The owner asked for it; their words are in the team's private notes (2026-11-10).

**Updated 2026-11-10:** the parent's page is now called **Materials** (the pad's bottom bar). The owner asked for more kinds than our lessons give, so there's a new section, "General kinds, beyond our lessons". Prototypes of the Materials page are in `channel/materials-lab/`. **F was chosen and is built into the app** (released 2026-11-10); the others stay as samples.

**Status words:**
- **Built:** in the app today.
- **Planned:** made from our lessons, as this plan describes.
- **Idea:** a wider kind, not made yet.

**Research:**
- `research/2026-11-10-activity-types.md`: what real products offer.
- `research/2026-11-10-activities-learning-science.md`: what helps children remember.
- `research/2026-11-10-materials-presentation.md`: how top apps present a library, and more kinds.

## The idea in one paragraph
Every lesson gives children a few **activities**: crosswords, secret codes, mazes, sorting games, maps, cards and more. Each activity is made from that lesson's own words, facts and pictures. A child does it **on their own device**, where it checks itself straight away. Or a parent **prints** it, as one clean black-and-white page. Activities are grouped by subject and topic, and bundled into **packs**: after a lesson, for the week, before a unit exam, for a holiday. They feel like games, with a stamp in a passport for each subject, but they repeat what the lesson taught, so they also help children remember. Exam papers stay with parents.

## The rules
1. **One activity, two ways.** The same content plays on the device and prints on paper. We never make two versions by hand.
2. **Lesson activities are made from our lessons.** They use only words, facts, pictures and questions already in a lesson, and already checked. No new facts are invented for a puzzle. **General kinds** (daily maths, chess, kitchen science and the rest) are our own new content: each one is written and checked like a lesson, and never copied from another publisher's pages.
3. **Remembering beats colouring.** Every activity makes the child bring something out of memory: an answer, a word, a place. Pure fun with no recall (like a plain word search) is changed until it needs recall. See "How we make fun useful" below.
4. **Games aren't tests.** As the owner decided on 2026-11-07, activities live in the child's new tab and **give no marks**. They give stamps. Lesson tests and exams stay as they are, and they alone go to the gradebook.
5. **The same for every child.** No activity is made for one child. Each child moves at their own pace.
6. **Little paper.** The device is the default. Paper is a choice, mostly one page, with the answers kept in the app unless a parent asks to print them.
7. **Exams are for parents only.** Children never see or print an exam paper before the exam, so they can't send it to an AI to solve. Answer pages print only from the parent's side.
8. **Black and white first.** Every printed page works on a plain home printer, with body text at least 14 pt.

## Where it lives
| Who | Where | What they do there |
|---|---|---|
| Parent | **Materials** (`#print`), one of the five places on the pad's bottom bar. Built 2026-11-09 as "Pages to print", with exams, worksheets, week checklists and habit charts. Its new look is being chosen from three prototypes | Look through anything, print it or send it to the children's devices, make a pack |
| Child | **The new tab** on the child's pad, agreed on 2026-11-07 for "practice, games and extras". Working name: **Play** (the owner chooses the name) | Do activities, see stamps, and ask to print one |
| Child | **To do** | "New activities for Muscles" appears after the lesson, as a choice, never as homework |
| Parent | Pad | One line per child: "4 activities done this week". No marks |

## The parent's main page
**Built 2026-11-09:** one list with For each child, Exam papers and Lesson exercises. The owner found it "broken", "generic" and "not intuitive" (2026-11-10).

**Three prototypes, 2026-11-10** (`channel/materials-lab/`, at `/materials-lab/` on 8081):
| | Idea | Learnt from |
|---|---|---|
| **A. Shelves** | This week's pack on top, its pages fanned out, one red Print; rows by kind slide sideways | App Store Today, Apple Books, Netflix rows, Khan Kids Library |
| **B. This week's bag** | The week's pages first, large and in order, Print all; kinds to add more below | Epic Assign, Kumon Connect, Workybooks, Apple Books Want to Read |
| **C. Subjects** | Big subject pictures, then a subject's pages by topic, then one page full size | Khan Kids Library, Teachers Pay Teachers, BrainPOP, Apple Books Library |

All three use the pad's header and bottom bar, real-looking pictures of each page, and the same opened page: what it is, who gets it, **Print** and **Send to their devices**.

**The first sketch** (before the prototypes), kept for reference:

```
┌──────────────────────────────────────────────────────────────┐
│ Pages to print                         [ Search: "muscles" ] │
│                                                              │
│ THIS WEEK                                                    │
│ ┌───────────────┐ ┌───────────────┐ ┌───────────────┐        │
│ │ Week pack     │ │ Week pack     │ │ Week pack     │        │
│ │ Kid 1         │ │ Kid 2         │ │ Kid 3         │        │
│ │ 9 to 15 Nov   │ │ 6 pages       │ │ 6 pages       │        │
│ └───────────────┘ └───────────────┘ └───────────────┘        │
│                                                              │
│ BY SUBJECT                                                   │
│ [Science] [Geography] [Spanish] [Emotions] [Maths] [English] │
│   └ Science › Human skeleton and muscles                     │
│      Lesson 1 Skeleton     Crossword · Label it · Secret code│
│      Lesson 2 Muscles      Sort it · Maze · Cards            │
│      Unit revision pack    Escape challenge + mixed quiz     │
│                                                              │
│ FORMS          Habit chart · Week checklist · Reading log    │
│                Experiment record · My week                   │
│                                                              │
│ FOR PARENTS    Exam papers · Answer pages                    │
└──────────────────────────────────────────────────────────────┘
```
- **This week** comes first: a pack for each child, with the right lessons' activities, the week checklist and the habit chart, printed in one go.
- **By subject** opens subject, then unit, then lesson, then that lesson's activities, in the same order as the program.
- **Forms** are pages to fill in, not puzzles.
- **For parents** holds exams and answer pages. Children can't open these.
- Each tile shows how many sheets it prints, so nothing is a surprise.

## The kinds of activity
Families of activity, with the ones we'd build. **Value** says how much it helps memory, from the research: **High**, **Some**, or **Fun**, which means only with our changes. **Paper**: ¼, ½ or 1 page, or **Cut**, a page of cards.

### Word puzzles
| Activity | How it works | Made from | Device | Paper | Value |
|---|---|---|---|---|---|
| **Crossword** | Clues are the lesson's facts; answers are its key words | Key words + recap | Type into the grid | 1 | High: clues need recall |
| **Secret code** | Answer 6 questions; each answer's first letter spells a hidden word | Test questions | Letters light up as answers are right | ½ | High |
| **Word search with meanings** | The list gives meanings, not words. Find the word that fits each meaning | Key words + meanings | Drag across letters | ½ | Some: our change makes it recall |
| **Word scramble** | Unscramble key words, with a clue for each | Key words | Drag letters | ¼ | Some |
| **Fallen phrase** | Letters have dropped out of a fact; put them back | Recap sentences | Drag letters up | ½ | Some |
| **Gap fill** | A short summary with key words missing, and a word bank | Recap + key words | Built: the "gaps" question | ½ | High |
| **Funny fill-in** (English) | Supply a noun, a verb, an adjective; read the silly story aloud | Grammar words | Type, then reveal the story | ½ | Some, for word classes |

### Logic and mystery
| Activity | How it works | Made from | Device | Paper | Value |
|---|---|---|---|---|---|
| **Escape challenge** | 4 or 5 locks; each opens with an answer: a word, a number, a direction. Ends with a reveal | Mixed test questions from a unit | Locks click open | 2 pages | High, if every lock is a recall question |
| **Detective case** | A short case: clues, suspects, and questions to rule them out with a ✓/✕ grid | History, Emotions, Science | Tap ✓ or ✕ | 1 | Some |
| **Maze of answers** | At each fork, the right answer takes the right path | Yes/no and number questions | Tap a path | 1 | Some: each turn is a question |
| **Mystery picture** | A grid where each right answer colours a few squares; a picture appears | Any questions | Squares fill in | 1 | Fun: keep the colouring small |
| **Real or made up** | Three facts, one is made up. Which one? | Lesson facts, plus wrong options from the test | Tap | ¼ | High: always show the truth after |
| **Odd one out** | Four things; which doesn't belong, and why? | Sort and match questions | Tap, then pick why | ¼ | High |

### Pictures, maps and diagrams
| Activity | How it works | Made from | Device | Paper | Value |
|---|---|---|---|---|---|
| **Label it** | Letters on a drawing; write the names | Skeleton, body, map | Built: the "label" question | ½ | High |
| **Map hunt** | Find, name or shade places on a map | Colombia map, later others | Tap the map | 1 | High |
| **Timeline** | Put events or steps in order, from memory | Order questions, history dates | Drag | ½ | Some |
| **Sort it** | Put things into groups | Sort questions | Built: the "sort" question | ½ | Some |
| **Half-drawn notes** | A page of half-finished drawings to complete while watching the lesson | Lesson pictures | Draw on the screen (later) | 1 | Some: drawing helps memory |

### Cards to cut and play
| Activity | How it works | Made from | Device | Paper | Value |
|---|---|---|---|---|---|
| **Flashcards** | A question on the front, the answer on the back. Answer before flipping | Test questions, key words | Flip cards; missed ones come back | Cut, 8 per page | High |
| **Match pairs** | Turn over two cards; keep them if they match | Match questions, key words + Spanish | Memory game | Cut | Some |
| **Dominoes** | Each end matches the next: a word to its meaning | Key words | Drag dominoes | Cut | Some |
| **Bingo** | A parent reads a clue; children mark the answer on their card. Good for siblings together | Key words, number facts | One child, or the family on the TV later | ½ per child | Some |
| **Speaking cards** (Spanish, Emotions) | Draw a card, say the answer aloud, then flip to check | Spanish phrases, emotion situations | The card reads the answer aloud | Cut, 8 per page | High for speaking |
| **Question cards** | 8 numbered cards, one answer strip | Test questions | One card at a time | Cut, 2 sheets in all | High |

### Practice
| Activity | How it works | Made from | Device | Paper | Value |
|---|---|---|---|---|---|
| **Daily practice** (maths and spelling) | A short sheet each day, in small steps. Mostly today's skill, plus a few mixed questions from earlier. Move on after getting it right | A practice path, not a lesson. **Waits for the parents' answers** on the wish list | Checks each answer | 1 | High. Research backs short daily practice and mixing; it doesn't back long blocks of one kind |
| **Quick 5** | Five questions from earlier lessons, to start the day. Like the re-tests after 1, 7 and 30 days, but optional and mixed across subjects | Old test questions, mistakes first | Instant check | ¼ | High: spacing |
| **Beat your best** | The same set against your own last time | Any set | Timer, your own record only | None | Some |

### Writing and making
| Activity | How it works | Made from | Device | Paper | Value |
|---|---|---|---|---|---|
| **Postcard** (Spanish, Geography) | Write a postcard from a place in the lesson, with the words to use | Key words, places | Type it; a parent reads it | ½ | Some |
| **Explain it** | Explain one idea in 3 sentences to a younger child | Lesson goal | Type, then compare with the model answer | ½ | High |
| **Comic strip** | Four boxes to draw a process: how a bone heals, how a nerve signal travels | Order questions | Paper only | 1 | Some |

### Forms (pages to fill in)
| Form | What's on it | Paper |
|---|---|---|
| **Week checklist** | Built: each class with a tick box, one sheet | 1 |
| **Habit chart** | Built: days across, Chess and reading plus empty rows | 1 |
| **Reading log** | Book, pages, a sentence about it, with a stamp for each book | ½ |
| **Experiment record** | Question, what I think will happen and why, what I change and measure, results table, what I found | 1 |
| **My week** | What I learned, what was hard, what I want to try next | ½ |
| **Cooking card record** | When the cooking cards come (wish 8): what we measured, what happened | ½ |

## General kinds, beyond our lessons
Added 2026-11-10: the owner wants more than what our lessons give, and a family wish list asks for most of these. Each is our own content, written and checked like a lesson. Licences are in `research/2026-11-10-materials-presentation.md`.

| Kind | What the page looks like | Where | Status | Notes |
|---|---|---|---|---|
| **Daily maths, step by step** | One short sheet a day, a little harder each time, with a few mixed questions from before | Both | Idea | The Kumon idea (daily small steps). Copy the idea of small steps, never Kumon's sheets. Waits for the parents' answers |
| **Handwriting** | Trace, copy, then a sentence, on handwriting lines | Paper | Idea | |
| **Reading log and book report** | Book, pages, one sentence a day; a one-page report | Both | Idea | Goes with the hard-cover reading habit (wish 1) |
| **Chess: mate in one** | Six boards, "find the move that wins", answers on the back | Both | Idea | Goes with the chess habit. Puzzle data could come from the Lichess database (CC0; confirm at database.lichess.org) |
| **Logic puzzles** | Logic grids, sudoku, picture puzzles from numbers | Both | Idea | Simon Tatham's puzzles are MIT-licensed |
| **Kitchen science** | What you need, steps, "what happened?", adult nearby | Paper | Idea | Cheap, everyday ingredients (wish 8). Safety checked by a person |
| **Art prompts** | A prompt and a frame to draw in, sometimes from a lesson ("Draw a frailejón") | Paper | Idea | Wish 9, for anyone |
| **Nature journal** | Sketch box, date, weather, "I notice, I wonder" | Paper | Idea | |
| **Spanish writing and speaking** | Five sentences about a picture; a postcard; speaking cards | Writing on paper, speaking on the device | Idea | Wish 10: they understand well, need to write and speak. Oak KS3 Spanish may be reused with credit |
| **Feelings check-in** | Pick a face, say why, one kind thing | Both | Idea | Feelings never leave the home; no tracking |
| **Life skills: money and time** | A price list and a budget; saving weeks; a chore chart | Paper, device for sums | Idea | |
| **Projects** | A plan page: question, steps, materials, show date | Both | Idea | |
| **Certificates** | Name, what they achieved, date | Paper | Idea | After a unit or a passport page |
| **Typing** | Home row first, then more rows | Device | Idea | Link to a free course, don't copy |
| **Map colouring and timelines** | An outline map with a key; a strip with years | Paper | Idea | Natural Earth maps are public domain |

**Status of the lesson kinds above:**
- **Built:** worksheets from each lesson's test, the exam paper, the week checklist and the habit chart.
- **Planned:** everything else in "The kinds of activity".

## By subject: what fits best
Real examples from lessons we already have.

| Subject | Best kinds | Example from our lessons |
|---|---|---|
| **Science** | Label it, crossword, flashcards, comic strip, experiment record, escape challenge | Skeleton: label the skull, ribs, pelvis and femur; a crossword whose clues are "The longest bone in your body" (femur). Muscles: sort voluntary and involuntary muscles |
| **Geography** | Map hunt, postcard, real or made up, timeline of heights | Colombia: shade the Andean region; order cacao, coffee, potatoes and frailejones from low to high; a postcard from Bogotá |
| **Spanish** | Speaking cards, match pairs, crossword in Spanish, postcard, bingo | Spanish 1: speaking cards for hola, estoy, está; match photos to casa, cama, planta, mapa |
| **Emotional intelligence** | Speaking cards, detective case, sort it, explain it | Emotions 1: sort situations by the emotion they bring; a case about a friend who seems angry |
| **Neuroscience** | Comic strip, flashcards, label it | Brain and body: draw a signal going from the brain to a finger |
| **English** | Funny fill-in, word scramble, explain it, reading log | When English lessons exist |
| **History** | Timeline, detective case, real or made up | When History lessons exist |
| **Maths** | Daily practice, maze of answers, number cage puzzle, mystery picture | When the daily practice path is agreed |

## How an activity is made from a lesson
Each lesson already holds what activities need:
- **Key words**: English, with Spanish, in `channel/keywords/es/<lesson>.js`.
- **Recap points**: "What we learned".
- **The lesson test**: about 12 checked questions, with answers and explanations.
- **The starter quiz**: questions on what came before.
- **Drawings**: skeleton, body, map of Colombia.
- **Pictures**: their licenses are already recorded.

So most activities can be **built automatically** from a lesson, the way the worksheets were on 2026-11-09:

| From | We can make |
|---|---|
| Key words | Crossword, word search with meanings, scramble, flashcards, dominoes, match pairs, bingo |
| Key words + Spanish | Spanish match pairs and speaking cards for any lesson |
| Test questions | Secret code, escape challenge, maze, question cards, real or made up, quick 5 |
| Order questions | Timeline, comic strip |
| Sort and match questions | Sort it, odd one out |
| Drawings and maps | Label it, map hunt |
| Recap | Gap fill, fallen phrase, explain it |

**Two things a person must add:**
- **A meaning for each key word.** Crossword clues and meaning lists need one. A word's meaning comes from the lesson's own sentences, and the fact-checker checks it like any lesson text.
- **Detective cases and postcards** are short pieces of writing, done per unit, checked like a lesson.

Each lesson gets its activities when the lesson is made. `rules/LESSON-RULES.md` would gain one step: "Write a meaning for each key word."

## On the child's device
1. A child finishes a lesson. To do says: "3 new activities for Muscles. Want to try?" It's a choice.
2. The **Play** tab shows activities by subject, the newest first, with the ones from lessons they've watched.
3. An activity opens full screen, uses the child's own look, and **checks itself**: right answers light up, wrong ones explain why, as tests do.
4. At the end: a **stamp** in that subject's passport. No mark, no score for parents to judge.
5. **"Print this"**: the child can ask, and the parent sees a print request on the pad. Children never print exams or answer pages.
6. **Done on paper**: the child taps "I did it on paper", checks their answers on the device, and gets the stamp the same way.
7. Activities appear only after the lesson is watched, so nothing gives away a lesson early.

## Packs
| Pack | What's in it | When | Paper |
|---|---|---|---|
| **Lesson pack** | 2 or 3 activities from one lesson | After the lesson | 1 or 2 sheets |
| **Week pack** (per child) | Week checklist, habit chart, and one activity for each lesson that week | Printed on Sunday or Monday | About 5 or 6 sheets |
| **Unit revision pack** | Escape challenge, flashcards, quick 5s, all from the unit | The week before the unit exam | 3 or 4 sheets |
| **Subject pack** | The best activity from every lesson so far in one subject | Any time | Varies, shown on the tile |
| **Holiday pack** | Mixed activities from the whole term, plus a reading log and "My week" | Half term and holidays | 6 to 8 sheets |
| **Rainy-day pack** | Cut-and-play games for siblings together: bingo, dominoes, match pairs | Any time | 3 sheets |

The parent can untick any page in a pack before printing.

## Making it feel like a game
**What we'd do:**
- **A passport for each subject.** Each finished activity adds a stamp. A full page shows what was learned: "You know the skeleton's 206 bones." The stamp records learning; it isn't pay.
- **Levels on every activity**: easy, medium, hard. Hard hides the word bank or the hints.
- **Mystery reveals**: a picture fills in, or a lock clicks open.
- **Surprise stickers** now and then, never promised in advance. Research says expected rewards can make children like the task less; surprises don't.
- **A family goal**: "Together, 30 stamps this week". Siblings help each other instead of competing.
- **A forgiving streak**: "5 of 7 days", which never drops to zero after one missed day.
- **Praise for effort**: "You came back to the hard ones."

**What we won't do:**
- No ranking or leagues between siblings.
- No prizes promised for marks.
- No streak that resets to zero.
- Nothing locked behind payment.
- Game parts never take longer than the thinking.

## How we make fun useful
| Fun activity | Its weak spot | Our change |
|---|---|---|
| Word search | Children only hunt letter patterns | Give meanings, not words |
| Mystery picture | Colouring takes longer than thinking | Few squares per answer, and a small grid |
| Maze | Can be solved by trying paths | Each fork is a question |
| Escape challenge | The puzzle can outweigh the topic | Every lock is a question from the lesson |
| Multiple choice | Wrong options can stick | Always show the right answer after |

## Saving paper
- **The device is the default.** A page is printed only when someone presses Print.
- **Answers stay in the app.** The answer page prints only when the parent ticks "Add the answer page", as the worksheets already do.
- **Most activities fit on one page or half a page.** Two half-page activities share a sheet.
- **Cards print 8 per sheet.** They're the kind of thing to print once and reuse: a plastic sleeve and a dry-wipe pen turn any page into a reusable one.
- **Each tile says how many sheets it uses** before printing.
- **Packs let a parent untick pages.**
- **Black and white, with no heavy borders or backgrounds.**

## Exams and answer pages
- Exam papers and answer pages appear only under **For parents**, after a parent signs in.
- A child's device never shows or prints an exam before it starts, and never shows an answer page.
- This keeps exams fair. A child can't take the paper early and ask an AI to solve it.

## What to build first (a suggestion for the owner)
| Step | What | Why first |
|---|---|---|
| 1 | The new main page: This week, By subject, Forms, For parents. Packs for the week | Uses what's built, and is what parents see |
| 2 | Meanings for each lesson's key words, checked | Unlocks the word puzzles for all 7 lessons |
| 3 | Five activity kinds, on device and paper: crossword, secret code, flashcards, map hunt / label it, quick 5 | Highest value, and made automatically |
| 4 | The child's Play tab, with stamps and passports | Where children do them |
| 5 | Escape challenge and unit revision pack | Before the first unit exam |
| 6 | Cut-and-play games, forms, holiday pack | Fun extras |
| Later | Daily maths practice | Waits for the parents' answers on the wish list |

Each step: options to click and compare first, with a recommendation, as `rules/DESIGN-VARIATIONS.md` requires.

## Questions for the owner
1. **The tab's name** on the child's pad: Play, Activities, Practice, or another?
2. **Printing from the child's side**: should a child be able to send a print request, or only parents print?
3. **Stamps**: one passport per subject, or one passport for everything?
4. **The family goal**: yes, or each child only against their own best?
5. **First subjects**: start with all 7 lessons, or with Science and Geography first?
6. **Week pack day**: is Sunday evening or Monday morning the usual time to print?

## Sources
- `research/2026-11-10-activity-types.md`: 37 formats from real products, packs, game parts, paper-saving tricks, and trademarked names we must not use (we say "number cage puzzle", "funny fill-in", "half-drawn notes" and "escape challenge").
- `research/2026-11-10-activities-learning-science.md`: what helps memory (recall and spacing most), what game parts help or harm, paper versus device, and what's known about Kumon-style practice.
