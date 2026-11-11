# The parent app: everything it must hold

Last updated: 2026-11-07. **Status: written for the owner's check. Nothing is built from it yet.**

The owner rejected every parent pad look and the Admin pages: "like a sketch layouts, its not proper looking design like apps ... take everything what we need to see on pad and admin, write it down, delete them completely ... build new prototypes. unified UI same logic ... one screen ui without scroll ... accessibility should be right".

This page is the list. It names **what** a parent sees and does, never how it looks. **Have** means it works today. **Coming** means it isn't built, and the new design mustn't pretend it is.

## Who and when
- **Parents:** two per family, each with their own login. One may find small details hard to see and uses Large or Extra large text.
- **Devices:** an iPad first (both ways round), then a phone, sometimes a laptop.
- **When they open it:** before school (what's on?), to start a lesson, after a lesson (how did they do?), in the evening (mark answers, check homework), at the end of the week (sign the diary), and in a quiet moment for settings.
- **The goal:** "Tell me in a few seconds whether school is running well and what I need to do. Then let me do it in a few taps."

## 1. Today
| Item | What the parent does | State |
|---|---|---|
| The day in one sentence | Reads: which day, how many classes, what's next | Have |
| The class now or next | Sees subject, topic and time; taps **Play the lesson** | Have |
| No lesson made for a class | Writes what to do instead (homework text) for each child | Have, in the class sheet |
| Each child's status per class | Sees To do, Done, a mark, or No lesson yet | Have |
| One class for one child | Gives a mark, writes homework, marks the class done | Have (class sheet) |
| No school today | Turns today off; classes move to the next school day. Can turn it back on | Have |
| Needs you | Exams waiting for marks; late homework; or "Nothing needs you" | Have |

## 2. Children
| Item | What the parent does | State |
|---|---|---|
| One line per child | Sees classes done today, average mark (out of 12), homework to do and late | Have |
| One child's page | Their day, their scores, their homework, where they are in each subject | Have |
| Where they are | For each subject, the unit and lesson this week, and tests done out of lessons made | Have |

## 3. Marks and work
| Item | What the parent does | State |
|---|---|---|
| Every score (gradebook) | Every test, exam and class mark, by date, filter by child | Have |
| Marking | Reads each written exam answer with the mark scheme, gives 0, 1 or 2 | Have |
| Homework | Each child's To do, Late and Done | Have |
| Rate the lessons | Gives 1 to 5 stars to each watched lesson; sees each child's stars | Have |
| Start an exam | An adult types the exam PIN on the child's device | Have (on the child's device) |

## 4. Plan
| Item | What the parent does | State |
|---|---|---|
| The week (diary) | Each child's week: classes, homework, marks, a parent's note; **Sign this week** | Have |
| Timetable | Classes per weekday and per child, school year start, day start, lesson length, breaks and holidays | Have |
| The program | Each subject's units and lessons, how many we've made; the program document to print | Have |
| The official program | England's national curriculum PDFs, per subject | Have |

## 5. Settings (today's "Admin", behind the gear)
| Item | What the parent does | State |
|---|---|---|
| Family | Lists parents and children. **Add a parent** (shows a one-time starting password) and **Add a child** | Have |
| A parent's card | Name, username, make a new password, remove from the family | Have |
| A child's card | Name, school level, username, password (always visible), Spanish key words (same as family, English only, English with Spanish words), remove | Have |
| Exam PIN | The 4 numbers an adult types to start an exam | Have |
| Your account | Your name, username, change your password | Have |
| Text size and contrast | Normal, Large, Extra large; normal or strong contrast. Saved per parent | Have |
| Lessons and languages | Which program lessons follow; "Show key words in Spanish too?" for the family | Have |
| How it works | The whole flow in plain words, and what's coming | Have |
| Plan and billing | Free during the trial | Have. Paying is coming |
| Feedback and checks | What parents sent; the last 7 days: sign-ins, lessons finished, left early, problems | Have |
| Tell us | Send an idea or a problem from anywhere | Have |
| Sign out | | Have |

## Coming, not built (the design may leave room, but mustn't show them as working)
Start the lesson on the TV from the pad; phone as the TV remote; teacher's notes per lesson; what to prepare; who teaches what (two parents); handover notes; sick day and trip; extra practice; term report and export; paying.

## Rules every new screen must keep
- **One screen, no page scroll** on an iPad at 1180×820 and 820×1180, and on a TV. A long list (the gradebook, a week) scrolls inside its own panel, never the whole page. On a phone, the main screen fits; deeper pages may scroll inside a panel.
- **One design for the pad and the settings.** The same parts everywhere (button, row, card, tabs, sheet), the same spacing and type.
- **Real app parts,** not links in text: lists with rows, segmented choices, cards, sheets, steppers.
- **Accessibility that can't break:** Large and Extra large text and strong contrast are built into the parts, so no text can sit on a same-colour background. A check measures the contrast of every text on every screen, in every mode.
- **Plain words.** No codes, no jargon, no "Off".
- **Nothing invented** for the sample.
