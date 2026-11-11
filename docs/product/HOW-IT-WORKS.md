# How it works, in simple words

Last updated: 2026-11-09. The page `#how` in the channel shows the same flow visually.

## Three people, three screens
| Who | Device | What it's for |
|---|---|---|
| **Parent** | Laptop or phone | Set up the family, follow progress, pay. Nothing to mark |
| **Each child** | Their own tablet, phone or laptop | Their own day, tests, exams, results |
| **The family** | TV | Watch lessons together. Nobody signs in as a person on the TV |

The TV doesn't know who is in the room, and doesn't need to. Tests and scores belong on each child's own device, where the child is already signed in.

## Setting up (parent, about 5 minutes)
1. Register with email and password.
2. Agree to the privacy terms for the children.
3. Choose the program, such as England's curriculum, and the language.
4. Add each child: name, school level and their own login.
5. Optional placement check per subject, to find the right level.
6. Choose a plan. Price is per child. Start with a free trial.
7. Connect the TV: the TV shows a short code, and the parent types it.

## Signing in
**There's one sign-in screen for everyone: username and password. There's no choosing a child.**
- A parent's login opens the **parent pad**. Admin opens from the gear on the pad, marked Admin. Each parent chooses how their pad looks in Your account.
- A child's login opens **My day**.
- A device stays signed in, so children don't type it every day.
- Children don't need an email. Their login sits inside the parent's account, and the parent can reset a password.

## The school week
Each family has a timetable, like a normal school: different subjects on different days. Lessons follow it. Each child has a personal diary with the week's classes, homework, marks and a parent's signature. See `SCHEDULE-AND-DIARY.md`.

## A normal school day
1. **Child opens "My day".** It shows only what's needed today, in order.
2. **Starter quiz, on their device.** Three quick questions on what they already know.
3. **Lesson.** Together on the TV, or alone on their own device if they missed it.
4. **During the lesson:** shout-it-out questions, and something to do.
5. **The TV finishes and says: "Your test is on your tablet."** It appears under To do by itself, and a banner says it's ready if the app is open. No typing and no camera needed. A QR code is only there to sign in a new device. A test never appears before its lesson has been watched.
   - The TV doesn't know who is in the room, so a lesson finished on the TV counts for the whole family. A lesson finished on a child's own device counts for that child.
   - A lesson the timetable has passed, and the child hasn't seen, shows under **Catch up** with a Watch button. It isn't late work: it's never red, and it isn't counted in To do.
6. **Lesson test, on their device.** Interactive questions and explanations right away. A bone is added for each right answer. Afterward the child can rate the lesson with 1 to 5 stars, which only a parent sees.
7. **Saved automatically.** The parent sees it. Mistakes go into the child's "Mistakes to fix" list.
8. **Re-tests** appear after 1, 7 and 30 days: a few old questions, with past mistakes first.

## Exams
- **Unit exam:** unlocked after all lessons in a unit.
- The child opens it on a tablet or laptop, and **an adult enters the exam PIN to start it**.
- Timed, one attempt, answers shown only at the end.
- Question types: choose one, tick several, dropdown, write a word, number, drag a label, match, put in order, true or false, written answers.
- **Children do everything on their own. No parent marks or checks anything.** Every question except written answers marks itself.
- **Written answers are checked by the child.** When the clock stops, the child sees each written answer beside the model answer, split into points, and ticks each point their answer also makes. One mark a point. This is a normal UK self-assessment method.
- Then the child sees the final result straight away, and the gradebook updates, with a quiet note: "Written answers self-checked".
- If the app closes half way through the check, opening the exam again goes straight back to it.
- Bigger exams at the end of a term and year cover several units.

## What the parent sees
- **Parent pad, the home screen:** today's classes, where each child is, scores, homework status and the full program.
- **Gradebook:** every test and exam by date, child, subject and topic. In some countries this is called an assessment or attestation journal.
- **Children:** add a child, change a login or level.
- **Lessons and languages:** which program lessons follow, the map, and Spanish key words.
- **Plan and billing:** children, payment, cancellation.

## How data moves
A child's device sends each answer to the family's account online. The parent's laptop and every other device read from the same place. In the family prototype, the Mac is that place: the server stores `data/family.json`, so it works only on the home Wi-Fi while the Mac server is running.

## What's built, and what's missing
### Built in the prototype
The up-to-date list, with what's real and what's a sample, is in `FEATURES.md`.

Episode on TV or device, one sign-in with own dashboards, gradebook, My day, starter quiz, playful lesson test, re-test screen, an exam that marks itself (children check their own written answers), parent PIN to start an exam, child editing, simple reports, and sync across devices on home Wi-Fi.

### Missing for a real product
**Accounts and safety**
- Real parent registration, email verification and password reset
- Parental consent records, and export or delete of family data
- Secure storage of PINs, and locking after too many wrong tries
- TV pairing and removing a lost device
- Sign out, and sharing one tablet between children

**Learning**
- Placement check to find each child's level
- Different question sets for each level
- A weekly plan and pace per child, with holidays and catch-up
- Attendance and learning-hours records, which some home-school rules require
- Mistake review with re-teaching, not just the same question again
- "I'm stuck" help: re-explain, ask a parent, or a safe AI tutor later
- Printable workbooks, exams and certificates
- Offline use for tablets

**Exams**
- A question bank with several versions
- Basic exam rules: full-screen mode, and telling the parent when the child leaves the screen
- Paper exams: print, then enter marks

**Motivation**
- Personal goals, and progress on the learning map
- Family goals instead of ranking children
- Rewards are fine for learning, but never for watching YouTube

**Parents**
- Weekly email summary
- Screen-time limits and approved-video controls
- Support and help pages

**Access**
- Captions and text size; a font option for dyslexia; slower narration
- Translation for Spanish; choosing voice and caption language separately

**Business and content**
- Stripe payments per child, sibling discounts, trial, failed-payment handling, cancellation
- A content studio: writing, review and publishing
- Analytics to see where children stop watching
- Legal review before any other family joins

See the team's private notes for the order.
