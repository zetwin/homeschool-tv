# Homework

Last updated: 2026-11-06. **Status: a plan for the owner to decide on. Only the first row of the table under "What's built today" exists now.**

## What homework is for
Homework should do what a class can't. It isn't more of the same.
1. **Make learning stick,** with short practice spread over days.
2. **Use it in real life:** measure, cook, ask someone, look outside.
3. **Build habits and independence.**
4. **Show a parent how it's going.**

Research points the same way: short, focused practice with feedback works best, and long tasks without help work worst. The link between homework and results is real but not proof of cause. It grows stronger with age, and exact minutes are weakly supported. So the times below are a starting point that the parent can change.

**How solid this is:** it comes from search summaries, not the full studies. The Ukrainian limits still need checking against the official text, and we didn't research how homework apps look. See `docs/research/2026-11-06-homework.md`.

**How it can look:** see the Homework screen in `/kid-lab/`. It shows a short list with the time for each piece, and the open piece beside it. A late piece is marked in a calm way, and a checked piece shows the parent's mark and comment. That screen is a design only, and it doesn't save anything yet.

## Kinds of homework
Each lesson's file holds its homework as data, so a new lesson needs no new building.

| Kind | Example | Time | How it's done | Who marks it |
|---|---|---|---|---|
| **Lesson test** | The 12-question test | 10 min | On their device | Automatic |
| **Re-test** | After 1, 7 and 30 days, past mistakes first | 3 min | On their device | Automatic |
| **Fix my mistakes** | The questions they got wrong | 2–5 min | On their device | Automatic |
| **Real-world task** | "Find your pulse and count for a minute", "Ask someone how high up they've lived" | 10 min | At home, then tap Done and write one line | Parent reads it |
| **Read** | A page, a chapter | 15 min | On paper or on screen | Parent checks |
| **Write** | Three sentences on what they learned | 10 min | Typed, or written on paper | Parent marks it |
| **Prepare** | "Guess three things before tomorrow's lesson" | 2 min | On their device | No mark |
| **Project** | A week-long poster or model | Across days | Hand in when done | Parent marks it |
| **Parent's own** | Anything: a book, a page, a practice sheet | Any | Tap Done | Parent, if they want |

## How much
A starting point, changeable per child by the parent.

| Age | A school day | A week |
|---|---|---|
| 10–11 | About 20 minutes | About 1.5 hours |
| 11–12 | About 30 minutes | About 2 hours |

- **Above about 60 to 70 minutes,** the warning is stronger. Ukraine's quoted limits of 1 to 1.5 hours are ceilings, not targets.
- **The app adds up the time** and warns the parent when a day has too much.
- **No more than 2 or 3 things in a day.** Extra items wait for a lighter day.
- **Weekends and breaks stay free,** unless the parent sets something.

## How it works
1. **Set.** After a lesson's class, its homework appears automatically. A parent can also add, change or remove any item.
2. **See.** It shows in **To do** on the child's home, in the **Diary** beside the class, and for parents in their menu.
3. **Do.** One tap to start. On a device, it opens straight away.
4. **Hand in.** Automatic for tests. Otherwise, tap Done and add a line.
5. **Mark.** Automatic, or a parent gives a mark and a short comment.
6. **See the result.** The mark goes to the Diary and to Marks. Comments show in To do until they're read.
7. **Sign.** A parent signs the week in the Diary, as with a paper diary.

**Due date:** the next class in that subject, not "tomorrow". That's how the diary's lesson tests work already.

## Cases
| Case | What happens |
|---|---|
| Missed the due date | It's marked Late in a calm way, and stays until done. No lost marks, unless the parent wants that |
| Sick day | Due dates move with the classes |
| Break or holiday | Nothing new is due. Only what a parent sets |
| Too much in one day | The app warns the parent and suggests moving something |
| A lesson not made yet | No automatic homework. The parent can set something |
| Done on paper | Tap Done and add a line. A parent checks it |
| Child says it's done, but isn't | Parent can reopen it with a note |
| Copying or AI | Written work has a parent reading it, and tests have re-tests. Nothing is automatic about trust |
| Two children, same lesson | Each has their own homework and marks. No ranking |
| Child wants more | "Go further" tasks are optional, with no mark |
| Photos of work | Not at first, to protect children's data. Later only with a parent's approval, and kept private |

## What's built today
| Part | Status |
|---|---|
| Lesson tests and re-tests as homework, in To do and the Diary | Built |
| Parent writes homework in the Diary, and the child taps Done | Built |
| Fix my mistakes after a test | Built, but not counted as homework |
| Real-world, Read, Write, Prepare and Project kinds | Not built |
| Homework as data in each lesson's file | Not built |
| Time totals, and the warning for too much | Not built |
| Parent's Homework page, with comments | Not built |

## Build order
1. Add `homework: [...]` to the lesson format, and write it for the 4 lessons.
2. Real-world and Write kinds in To do, with Done and one line.
3. A Homework page in the parent menu, for setting, marking and commenting.
4. Time totals and the warning.
5. Prepare, and Project.

## Decisions for the owner
1. **Is the amount right?** About 20 to 30 minutes a school day.
2. **Do marks count if late?** Recommended: yes, marks stay the same, and it just shows as late.
3. **Should written homework be typed or on paper?** Recommended: either.
4. **Homework at weekends?** Recommended: no, unless the parent sets it.
