# How we make tests and exams

Last updated: 2026-11-09. **Follow this for every test and exam.** Tests and exams use the child's chosen theme, from `channel/views/themes.js`. The newer question types are `region`, `estimate`, `sort`, `gaps`, `pics` and `contract`, in `channel/views/questions.js`. `channel/test-styles/` was rejected as too gamified, and is kept only as a record. See `docs/research/2026-11-06-aaa-interface-styles.md`, and `docs/product/ASSESSMENT.md` for marking.

## The main ideas
1. **A test stays a test.** It must not feel like a game. The owner rejected two prototypes for this: the second was still "too gamified".
2. **Quality comes from craft, not effects.** Clear type, spacing, restraint and precise motion. No glow, neon, big rounded corners or playful fonts by default.
3. **Reusable, never custom per lesson.** Every question comes from a small set of ready-made question types filled with data and pictures. Building 3D or animation for each lesson's test is a waste of time.
4. **Do something real when a standard type allows it:** tap a place on the lesson's real picture, order, sort, match.
5. **Feedback teaches.** Show the right answer and one sentence on why, and never shame.
6. **Tests are light. Exams are calm,** with a clear result.
7. **Rewards stay modest and show real skills.** No loot boxes, random prizes, paying, or guilt about streaks.

## How a test screen works
The owner rejected the first themed tests on 2026-11-06: new colors on old screens, and a skeleton beside the question that was only a progress bar.
- **One question, one screen, no scrolling,** at every size. Layout A: picture beside the question. Check with a real measurement.
- **Do it directly.** Drag, swipe, draw a line, build a word. Never a dropdown, a radio button or an on-screen keyboard. Each drag also works by tapping.
- **A single answer checks itself** when tapped.
- **Big type,** with no empty card and a small question in the corner.
- **The picture belongs to the question.** Nothing decorates the side. If a figure is shown, the child uses it to answer.
- **A picture must not give away the answer.** Check for labels.
- **The action is always at the bottom,** in the same place. When it's grey, the bar says why.
- **Feedback uses the same bar:** right or wrong, why, and Next. It shows what the child chose apart from what they missed.
- **Honest words.** A low score never gets praise it didn't earn, and it offers the lesson again.
- **Fix mistakes straight away** from the result, without changing the recorded score.
- **Stop asks first.** Back can't leave an exam by accident.

## The ladder
| When | What | Where | Feeling | Answers shown |
|---|---|---|---|---|
| During a lesson | Shout it out | TV, together | Fun | Straight away |
| Start of a lesson | Starter quiz, 3 questions | Own device | Quick | Straight away |
| End of a lesson | Lesson test, 4 to 12 tasks | Own device | Lively | Straight away |
| After 1, 7 and 30 days | Re-test, past mistakes first | Own device | Quick | Straight away |
| End of a unit | Unit exam, timed, one attempt | Own device or paper, adult nearby | Calm | Only at the end |
| End of a term or year | Big exam | Laptop or paper, supervised | Serious | Only at the end |

## Choosing the question type
Ask: **what would someone who understands this be able to do?** Then pick the closest ready-made type. A new type is added only when many lessons will reuse it.
| Type | What the child does | Filled with |
|---|---|---|
| Find it | Taps a place on a picture or map | A lesson picture and marked areas |
| Label | Puts names on a picture | A lesson picture and names |
| Sort | Moves items into groups | Words or small pictures |
| Order | Puts things in sequence | Steps or dates |
| Connect | Links matching pairs | Words or pictures |
| Estimate | Moves a slider, then sees the true value | A number and range |
| Fill the gap | Picks or types the missing word | A sentence |
| Choose | Radio, checkbox, true or false | Text or pictures |
| Write | Types an answer, then checks it against the model answer after the exam | A question and its marking points (`points`), one mark each |

### By subject
- **Science:** find on a diagram, label, order a process.
- **Maths:** type the number, number lines, fill the gap. Show the working.
- **English:** fill the gap, choose, write, read a short passage.
- **History:** order on a timeline, read a source, choose.
- **Geography:** find on a map, sort, read a graph or photo.
- **Languages:** listen and match, fill the gap.

### Rules for each task
- **It tests the objective,** not how fast or how well someone drags.
- **Only one answer can be defended.** Check this in the fact-check.
- **Words stay short and plain.** A science test mustn't become a reading test.
- **Pictures and scenes belong to the lesson.**
- **First try counts for the score.** Children can then try until they see it work.
- **Every test keeps some written or spoken explaining,** because doing isn't always understanding.

## How a right or wrong answer behaves
- **Right:** the answer is marked clearly, with a small, quick response and one sentence on why.
- **Wrong:** show the right answer and why, calmly. No buzzing, no lost lives.
- **Motion is short and exact,** and is there to show what changed. Nothing bounces for its own sake.
- **Always reduce motion** when the device asks for it.

## The test result
- Lead with the score.
- Name each skill: "You can..." or "Look again...", with what was missed and a chance to try now.
- Say when mistakes come back.

## Exams
- **Before:** what it covers, time, marks, one attempt, the rules. An adult enters the PIN.
- **During:** a quiet screen, with a clock and a question list. They can flag and return. No sounds, effects, or right or wrong.
- **Interactive tasks stay,** but with no reaction. A real exam can include "find it" and "order".
- **Children go through everything on their own. Nothing ever waits for a parent to mark or check** (owner, 2026-11-09). A parent only starts the exam with the PIN.
- **Written answers are self-checked.** After the clock stops, before the result, each written answer is shown beside the model answer, split into marking points. The child ticks each point their answer makes, in their own words. One mark a point. An empty answer gets no marks, but the model answer is still shown.
- **Every written question needs `points`:** short, plain sentences, one per mark, so a 10-year-old can compare. Write "or" inside a point for other right wordings.
- **After:** the big moment. The final score, marks by lesson, and what to practice next. Reviewing answers later shows the ticked points again.
- **The gradebook says when written marks were self-checked,** quietly, so a parent knows where the number came from.
- **Fairness:** answers save as they go. If the connection drops, nothing is lost.

## Devices: laptop, tablet and phone
Students may use any of these. **Every task must work on all three.**
| | Laptop | Tablet | Phone |
|---|---|---|---|
| Input | Mouse and keyboard | Fingers | One thumb, usually upright |
| Layout | Scene beside or under the question | Scene fills the screen, with answers at the bottom | Question on top, scene in the middle, answers within thumb reach |
| Text | Normal | Normal | Short. Never below 16 pixels |
| Drag | Mouse, or arrow keys | Finger | Finger, with a tap alternative |
| Exams | Best | Good | Allowed for short exams. Warn for writing and long exams |

Rules for all:
- **Nothing depends on hover,** because fingers can't hover.
- **Every drag also has a tap or key alternative.**
- **Touch targets are at least 48 pixels.**
- **Fingers mustn't cover what's being watched:** show the effect above the finger.
- **The page never scrolls sideways.** Rotating the device must not lose answers.
- **Keyboard:** 1 to 4 picks an answer, Enter confirms, Tab moves.
- **Must run on older devices.** No heavy 3D in tests.
- **Test on real devices:** a small phone, a tablet and a laptop.

## Before showing the owner
- [ ] Each task tests an official objective
- [ ] Uses ready-made question types, with no custom building
- [ ] Doesn't feel like a game
- [ ] Each task has exactly one defensible answer
- [ ] Right and wrong both teach
- [ ] Works at 375, 1024 and 1440 pixels wide
- [ ] Works by mouse, touch and keyboard
- [ ] A helper with no background passed it
