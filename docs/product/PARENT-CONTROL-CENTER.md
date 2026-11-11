# Parent Control Center

Last updated: 2026-11-06. **Status: idea agreed with the owner. The home screen is built as the Day Board: read `PARENT-PAD-PURPOSE.md`, which replaces the home screen ideas here. Teaching with notes, phone remote and two parents aren't built yet.** Data for this is in `FAMILY-DATA-PLAN.md`.

## The idea
A parent has two very different jobs, and today we mix them in one admin area, which is awkward when you're teaching.

**Who pays and who teaches are separate.** One parent may pay, and either or both may teach. One person can do both, and someone can do only one.

| | Control Center (daily) | Admin (rare) |
|---|---|---|
| For | Any parent who teaches, often both | The account holder, often the one who pays |
| Feels like | The kids' app: one screen, quick and made for working | A plain settings page |
| Holds | Today, teaching a lesson, marking, diary, exam PIN, marks, homework | Plan and payment, inviting a parent, child logins, privacy, school year settings, deleting data |

One sign-in opens the parent pad. Admin sits behind a gear on it. See `PARENT-PAD-PURPOSE.md`.

## A teaching day
1. **Before class:** what each child has today, who needs help, and the teacher's notes for the lesson.
2. **During class:** start the lesson on the TV, and use a phone or tablet as the remote. It also shows the answers and discussion questions, so the parent can lead.
3. **After class:** test results arrive per child. Mark written answers in place, and see the common mistakes.
4. **End of the week:** sign the diary, write notes and check the report.

## Two teaching parents
- **Share out subjects:** each parent sees their own first.
- **One shared job list:** when one parent starts marking, the other sees it, so nothing is done twice.
- **Names on actions:** "Marked by Mum", "Signed by Dad".
- **Handover note:** "Kid 2 struggled with fractions today, please check tomorrow."
- **A parent who only pays:** sees Admin and a short weekly summary.

## Where today's parent pages go
| Today | Goes to |
|---|---|
| Dashboard, marking, gradebook, diary, exam PIN, timetable view | Control Center |
| Plan and billing, children and logins, learning plan settings, school year settings | Admin |

## Each parent's settings
Behind the Aa button on the pad, and saved with the parent's account. **One parent has trouble reading small text, so this is required, not extra.** Built, except a second parent login, which doesn't exist yet.
- **Text size:** Normal, Large or Extra large. It enlarges the whole screen. On a small screen, what no longer fits scrolls inside its own panel, and no control is cut off.
- **Theme:** includes a strong contrast option.
- **Admin** has its own gear, next to Aa.

## What a parent wants to know
Every block on the home screen must answer one of these. If it doesn't, it isn't there. This is my judgment, for the owner to correct.

| The parent asks | So the screen says |
|---|---|
| **Does anything need me right now?** | One clear thing, or "Nothing needs you" |
| **What's happening today?** | What's on, what's next, who's teaching |
| **Is each child OK?** | One plain sentence per child, not only a number |
| **Are we on track?** | This week and this year against the plan: ahead, on track or behind |
| **What should I do later, and how long will it take?** | Marking and signing, with minutes |
| **What should I say to my child?** | The mistake they keep making, and a question to ask |

**Underneath:** "Am I doing enough?" A good screen can honestly say "You're on track". The calm state is the goal, not an empty page.

**Not on the home screen:** account settings, empty grid squares, marks with no meaning, decoration.

## Looks
Two rounds of sample looks were rejected. The owner then chose the Day Board. See `PARENT-PAD-PURPOSE.md`.

## Still open
- Real logins for each parent need the database plan.
- A real phone-as-remote needs the TV and phone to talk, through the server. Not built.
- Teacher's notes need writing for every lesson. The lesson format doesn't have them yet.
- Legal cases with separated parents: see `FAMILY-DATA-PLAN.md`.
