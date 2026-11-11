# Family data plan

Last updated: 2026-11-06. **Status: a plan for the owner to decide on. Nothing here is built, and the backup is not switched on.**

## The short version
- **Today** all family data is one small file on your Mac. Everyone shares one parent login, and the Mac never checks who is asking. That is acceptable for one family at home, but not for anyone else.
- **The main idea:** three questions get three separate answers. Who pays? Whose child is this? Who teaches which subject? One person can be all three, or only one of them.
- **A parent links to each child, not to a house.** So separated parents work, and each adult has their own login.
- **Every mark, signature and note records who did it.** A mark is never overwritten. A correction is a new row, so old results stay true even when a lesson changes.
- **The first step is small:** a daily copy of the family file. The script is ready and tested on made-up data. It waits for your yes.
- **What I need from you:** the decisions in part 6. Three of them are for now.

Words used in this document:
- **Table:** one sheet of a spreadsheet. Each row is one record.
- **Link:** a row that points to a row in another table.
- **Hashed:** scrambled one way, so nobody can read it back, but the computer can still check it.
- **Migration:** moving the data from the old place to the new one.

---

## 1. What is stored today, and where

### Where each thing lives
| What | Where | Notes |
|---|---|---|
| Parent login, exam PIN, children, results | `data/family.json` on the Mac | The server reads it fresh each time |
| A copy of all of that | The browser's storage on **every device** (`hs-family-v2`) | Includes the parent's password, on the children's devices too |
| Who is signed in | That browser only (`hs-session-v2`) | The server doesn't know |
| The saved place in a lesson | That browser only (`hs-place-<lesson>`) | Stays on one device |
| Lesson test questions and answers | `channel/episodes/*.js` | 7 lessons, each with 3 starter questions and 10 to 12 test questions: 103 in all (2026-11-11) |
| Exam questions, answers and mark schemes | `channel/views/exam.js` | 1 exam, 17 questions, written directly in the code |
| How each question type works | `channel/views/questions.js` | Code |
| Subjects, units and lesson lists | `channel/curriculum.js` | Code |
| The default timetable | `channel/views/store.js` | Reaches the file when someone changes it |
| Which class falls on which date | **Not stored.** `channel/views/schedule.js` works it out each time | So past dates can move. See "Gaps" |
| Images and voice | `channel/assets/` | With `credits.json` |
| Consent, payments, a list of devices, invitations | **Nowhere** | Billing is a sample screen |

### The shape of `data/family.json` today
Names of fields and counts only. On 2026-11-06 the file is very small (about 500 bytes), so there is almost nothing to lose yet.

| Part | Fields | Count today |
|---|---|---|
| `parent` | `username`, `password` | One, shared |
| `parentPin` | The exam PIN | One |
| `kids` | `id`, `name`, `username`, `year`, `pin`, `color`. Also `avatar`, `theme`, `mode` once a child chooses them | 3 |
| `attempts` | `id`, `kidId`, `ep`, `kind`, `score`, `total`, `missed`, `at` | 0 |
| `exams` | `id`, `exam`, `kidId`, `at`, `answers`, `auto`, `parent` | 0 |
| `watched` | Child or `family` → lesson → first time watched | 0. It changed while I was writing this, so it is being used |
| `school` | `start`, `dayStart`, `lessonMin`, `scale`, `startUnit`, `timetable`, `breaks`, `off`, `kidTimetable`, `log`, `signed`, `notes` | **Not in the file yet.** The app uses the defaults in the code |

### Gaps
| Gap | What it means | Where |
|---|---|---|
| **One shared parent login** | The app can't tell which parent did something | `store.js:6`, `store.js:104` |
| **Passwords in plain text** | Parent password, child logins and the exam PIN can be read by anyone who opens the file or the browser's storage. The Children page shows child logins too | `store.js:6-11`, `parent.js:66` |
| **Starting passwords are in the code** | Anyone who reads the code knows them, until they are changed. Please replace them (decision 2) | `store.js:6-11` |
| **The exam PIN is shown on the exam screen** | The child can read it there, so it doesn't stop a child from starting alone | `exam.js:60` |
| **No sign-in on `/api/state`** | Any device on the Wi-Fi can read everything, including the parent's password, and can change everything | `serve.mjs:36-42` |
| **Sign-in only happens in the browser** | The server never checks it. A child who knows how could make the browser say "parent" | `store.js:102-108` |
| **No encryption on the Wi-Fi** | The address is `http`, so the data travels unprotected | `serve.mjs` |
| **`data/family.json` is not in git, and has no backup** | Keeping it out of git is right. But it means there is **no second copy.** A dead disk or one bad save loses everything. **Update 2026-11-10:** the family's server Mac now backs it up every night (`tools/host/`). Other copies still have none | `.gitignore:8` |
| **Saving replaces whole sections** | A child changing their picture also sends the parent's login and all the children. A device with an old copy can undo newer changes, even a new password | `store.js:80`, `student.js:258-262`, `serve.mjs:31` |
| **Two adults marking at once** | The whole exam record is replaced, so one adult's marks can erase the other's | `serve.mjs:30`, `parent.js:134` |
| **Work done while the server is off is lost** | The result is saved on the device, then replaced by the server's copy on the next refresh. From reading the code; I didn't run it | `store.js:37`, `store.js:63` |
| **Nobody is recorded** | Marks, signatures, notes and homework don't say who did them | `parent.js:134`, `diary.js:119`, `diary.js:125` |
| **Marks depend on today's code** | Exam marks are stored by position ("question 3"), and totals are worked out from the current exam. Change the exam, and old results change | `exam.js:98`, `exam.js:103-114` |
| **Lesson test answers aren't kept** | Only the score and the positions of wrong answers are saved. Re-tests use those positions, so editing a test points them at the wrong questions | `student.js:204`, `student.js:215` |
| **Past dates can move** | Dates are worked out from the current timetable. This limit is already known | `SCHEDULE-AND-DIARY.md` |
| **Removing a child can't be undone** | One adult, one confirmation, gone at once. The other parent isn't told | `store.js:82-91` |

---

## 2. Who is who

### Three separate questions
| Question | Answer in the design | Example |
|---|---|---|
| **Who pays and runs the account?** | The **account holder** | Uses **Admin** |
| **Whose child is this?** | A **link** between one adult and one child | Gives the right to see that child |
| **Who teaches what?** | A **teaching assignment** | Uses the daily **Control Center** |

The account holder's rights and a parent's rights are different things. Paying does not by itself show you a child's marks.

| Real life | Account holder | Linked to the child | Teaches |
|---|---|---|---|
| One parent does everything | Yes | Yes | Everything |
| Two parents share at home | Parent A | Both | A: Maths and Science. B: the rest |
| One parent only pays | Parent A | Parent B, and Parent A if the family wishes | B only |
| A grandparent pays | Grandparent | Parents only | Parents |
| Separated parents | Parent A | Both | Both, by subject or by week |
| Separated, each with other children | One each | Each to their own children, and both to the child they share | Each sees only their own linked children |

### What opens after sign-in
One sign-in for everyone, and no chooser afterwards, as already decided.
- **A teacher** opens the **Control Center**: one screen for today.
- **Someone who only pays** opens **Admin**.
- **Someone who is both** opens the Control Center, with one quiet link to Admin.
- **A linked parent who teaches nothing** opens the Control Center, to read only.
- **A child** opens My day.

**Control Center (daily, one screen, like the kids' app):** today's jobs, marking, the diary, signing the week, handover notes, "No school today".

**Admin (account management only):** the plan and payment, adding or removing a child, inviting adults, child logins, devices, consent, data download and delete.

**Every adult also has:** their own password, their own exam PIN and their own notice choices.

The screens themselves are separate design work. This list only says what belongs where.

### Who can do what
"Teacher" here means an adult linked to the child who teaches them.

| Action | Pays only | Teacher of this subject | Teacher of another subject | Child |
|---|---|---|---|---|
| See bills, change payment, cancel | **Yes** | No | No | No |
| See the child's marks and diary | No | Yes | Yes | Their own |
| See handover notes | No | Yes | Yes | **Never** |
| Mark work, set homework | No | Yes | Yes, after claiming the job | No |
| Sign the week | No | Yes | Yes | Later, their own signature |
| Change the child's timetable | No | Yes, and others are told | Yes, and others are told | No |
| Start an exam, with their own PIN | No | Yes | Yes | No |
| Reset the child's login | No | Yes | Yes | No |
| Add a child (this changes the bill) | **Yes** | Can ask | Can ask | No |
| Stop paying for one child | **Yes** | No | No | No |
| Invite another adult for this child | Only if the child has no linked parent yet | Yes | Yes | No |
| Ask to delete the child | No | Yes | Yes | No |
| Download the child's data | No | Yes | Yes | No |
| Hand over the account holder role | **Yes**, the other person must accept | No | No | No |
| End another parent's link | **Nobody alone.** See "Removing" below | | | |

**Subjects decide who gets told first, not who is allowed.** If the Maths parent is away, the other parent can still mark Maths.

### Invitations
1. A parent already linked to the child enters the other adult's email and picks the children and subjects. An account holder with no link can do this only for a child who has no linked parent yet, such as a grandparent who pays and invites the parent.
2. The adult gets a link that works once, for that email only, and ends after 7 days.
3. They create **their own login**. If they already have one, it's the same login, with one more child in it. So one adult can belong to two paid accounts.
4. The person who invited them is told when it's accepted.
5. An invitation can be cancelled before it's accepted.

**Nobody can link themselves to a child by claiming to be a parent.** If a parent won't invite the other parent, that goes to support, and it's a question for the lawyer below.

### Deleting and removing
| Case | Proposal |
|---|---|
| **Delete a child with only one linked parent** | That parent confirms. Everything is held for 14 days, so they can undo it, then erased |
| **Delete a child with two linked parents** | One asks, and the other is told straight away. If the other agrees, it is erased. If they say nothing for 14 days, it is erased. If they object, nothing is erased, and it goes to support |
| **The account holder wants to stop paying for a child** | That's not deleting. The child's records stay, read-only, and linked parents are told |
| **A parent removes themselves** | Allowed at any time. Their name stays on the marks and notes they already wrote |
| **Ending another parent's link** | Not possible alone. It goes to support, because it may involve a court order. A helper such as a tutor can be removed by any linked parent |
| **Before anything is erased** | A reminder to download the data first |

### Teaching assignments
- A new child starts with **every linked parent teaching every subject**, so a one-house family has nothing to set up.
- A family can then split by subject: "Parent A teaches Maths to this child".
- Each assignment has a start date and, later, an end date. They are never erased, so we can see who taught what last term.

### The shared job list
One list for all teachers of a child. The app adds jobs by itself.

| Job | Added when | Told first |
|---|---|---|
| Mark written answers | A child finishes an exam | The subject's teacher |
| Mark or check homework | A child hands it in | The subject's teacher |
| Sign the week | The school week ends | All teachers of that child |
| Start an exam | A unit's exam is due today | The subject's teacher |
| Talk about late work | A test passes its due date | The subject's teacher |

How it works:
- **Open → Claimed → Done.** Tapping "I'll do this" shows the other parent who has it.
- **A claim can be given back.** If nothing happens for 3 school days, it opens again and both are told.
- **An exam is one job.** One adult can mark half, give it back, and the other continues. Each mark is saved on its own, so nothing is lost.
- **A job can be cancelled** if it's no longer needed, and that records who did it.

### Handover notes
Short notes between the adults who teach a child, for example: "We stopped at question 4. Fractions are hard this week."
- A note belongs to one child, and optionally one subject. It can be addressed to everyone or to one adult.
- It records who wrote it and when, and who has read it.
- It can't be edited. A correction is a new note.
- **Children never see these notes.** The weekly note in the diary, which a child can see, is a different thing.
- Guidance on the screen: write about learning. Don't write about health, or about the other parent.

### Every action records who did it
| Action | What is saved |
|---|---|
| A mark, and any change to it | Who, when, the old mark stays, and why it changed |
| A week's signature | Who, when, and the note written with it |
| A handover note | Who, when, who read it |
| Homework set, changed or ticked done | Who, when, old and new text |
| A day off, or a timetable change | Who, when, from which date |
| Starting an exam | Which adult's PIN started it |
| Roles, links, invitations and logins reset | Who, when, for whom |
| A child's removal | Who asked, who agreed, when. No child's name stays |

If the app did something by itself, it says "automatic". Old data moved from the file says "not recorded". **We never guess a name.**

### Notices for each parent
Sent by email to adults only. **Never to children.** An email says a job exists and links to it. It doesn't contain marks, answers or notes.

| Notice | Pays only | Teacher of this subject | Other linked parent | Can be turned off? |
|---|---|---|---|---|
| Written work is waiting | | Yes | | Yes |
| A claim ran out and the job is open again | | Yes | Yes | Yes |
| A handover note for you | | Yes | | Yes |
| A week is ready to sign | | Yes | Yes | Yes |
| Late work | | Yes | | Yes |
| Weekly summary per child | | Yes | Yes | Yes |
| A mark you gave was changed | | Yes | | **No** |
| Receipt, trial ending, price change | Yes | | | Receipts only |
| A payment failed, and access is at risk | Yes | Yes | Yes | **No** |
| A child's login was reset, or a new device signed in | | Yes | Yes | **No** |
| An adult was invited, linked or removed | Yes | Yes | Yes | **No** |
| Someone asked to delete a child | Yes | Yes | Yes | **No** |
| The privacy policy changed | Yes | Yes | Yes | **No** |

### Questions for a lawyer
This is not legal advice. I haven't checked any country's law for these, and the answers may differ by country. Please take these to a lawyer before any other family uses the service. **Until then, we don't promise anything about these cases.**

**Court orders and safety**
1. A court order limits what one parent may see or do. What must we do, how do we check the order is real, and who at our company decides?
2. One parent must not learn where the other lives or when the child is there. Could a timetable, a device's name, "marked by" or the sign-in record reveal that?
3. A parent says the other parent is dangerous, but has no court order. May we pause a link? For how long?
4. Who answers an urgent request at night, when the company is one person?

**Who has the right**
5. Is one parent's consent enough when two people share legal responsibility? What if the other parent objects, or later withdraws?
6. A parent with no legal responsibility, a step-parent, a grandparent, a foster carer or a tutor: who may be linked, and on whose word?
7. A parent won't invite the other parent. Can the second parent get access, and what proof is needed?
8. Does a paying person who isn't a parent have any right to see a child's data? What may an invoice say?
9. A parent dies, or can't be reached, and they are the account holder.

**Notes and records**
10. **A parent must not see the other's notes.** May we hide a note about a child from a parent who has legal rights? Does that parent have a right to ask for it anyway?
11. A parent asks for all the data. It includes the other parent's name and notes. What do we hand over?
12. One parent asks to delete a child's records, and the other objects. Who wins? Is our 14-day wait acceptable?
13. How long must or may we keep records after a family leaves? Local home-school rules may want them, and privacy rules may want them gone.
14. A note suggests a child may be harmed. Do we have any duty, given that we don't normally read notes?

**The child**
15. At what age may a child ask for their own data, or to delete it? What happens as a child grows up?
16. Is a child's own login, without email, allowed under each country's rules? How must a parent's consent be proven? `COMPLIANCE-AND-LICENSING.md` lists COPPA, the UK Children's Code and GDPR Article 8, and marks them as still to verify.

**The business**
17. When we charge, which of us holds legal responsibility for the data: our company, the parents, or both?
18. Parents live in different countries. Which law applies, and where may the data be stored?
19. Which outside companies must be named to parents (hosting, sign-in, email, Stripe, YouTube), and is separate consent needed for each?

### What the design leaves room for
Whatever the lawyer says, these can be added without rebuilding: a link can be paused, a note has a "who can see this" field, and we don't store home addresses. **I'm not building these rules into screens until the lawyer answers.**

---

## 3. Database design for Postgres

`ARCHITECTURE.md` already plans a Postgres database. This part replaces the "Accounts" and "Assessment" lists there, once you approve it. Lesson scenes, spoken lines and image records stay as they are in that document.

Every table also has its own ID and the date it was created. An arrow (→) means "links to".

### The map
```
                     parents  (each adult's own login)
                    /    |                 \
         parent_roles    parent_child_links   teaching_assignments
              |              |                  |              \
          families ───── children ──────────────┘           subjects
              |              |                                   |
     subscriptions           ├─ attempts ─ answers ─ marks       units
     consents                ├─ exam_sittings                    |
     timetable_versions      ├─ watched_lessons               lessons
     days_off                ├─ diary_entries ─ homework_items   |
     school_settings         ├─ week_signoffs              lesson_versions
                             ├─ jobs
                             ├─ handover_notes ─ note_reads
                             └─ device_children ─ devices

  questions ─ question_versions ─ assessment_questions ─ assessment_versions ─ assessments
  An attempt points at one assessment version. An answer points at one question version.
```

### A. People and access
| Table | Why it exists | Holds, and links to |
|---|---|---|
| `families` | **One paid account, not one house.** Keeps families apart | Name, country, language, program → `programs` |
| `parents` | Each adult's own login, whichever family they are in | Name, email, language, hashed exam PIN, sign-in provider's ID |
| `parent_roles` | Who is the account holder or a teacher in which family. One person can have both | → `parents`, → `families`, role, start, end, given by |
| `parent_child_links` | **The key table.** Says which adult may see which child. This is what makes separated parents work | → `parents`, → `children`, relationship, status (active, paused, ended), start, end, added by |
| `teaching_assignments` | Who teaches which subject to which child | → `parents`, → `children`, → `subjects` (empty means all), start, end, set by |
| `children` | The child's profile, with as little data as possible. No email | → `families` (the account paying now), first name or nickname, school level, unique username, hashed password, picture, colour, theme, deleted date |
| `invitations` | Adding an adult safely | Email, who invited them, → `families`, children and subjects offered, hashed link code, expiry, accepted, cancelled |

### B. Consent, money and safety
| Table | Why it exists | Holds, and links to |
|---|---|---|
| `policy_versions` | Shows which words a parent actually agreed to | Kind, version, text, date |
| `consents` | Proof of consent, as the compliance doc asks | → `parents`, → `children`, → `policy_versions`, what, when, withdrawn date |
| `subscriptions` | Pay per child | → `families`, Stripe IDs, number of children, status |
| `devices` | A remembered child device or paired TV, which can be removed if lost | Kind (TV, child), name, paired by → `parents`, → `families`, last seen, removed date. **No home address** |
| `device_children` | Which children a device may serve. A TV in a second home serves only the children linked to it | → `devices`, → `children` |
| `data_requests` | Download and delete, with the 14-day wait | → `children`, kind, asked by, answered by, hold until, done date |
| `activity_log` | **The "who did what" book.** Only ever added to | Who (adult, child or automatic), action, which record, old and new value, when, → `devices` |

### C. The program
| Table | Why it exists | Holds, and links to |
|---|---|---|
| `programs` | Which official program we follow, in which version | Name, version, source link. We say "follows", never "approved" |
| `subjects` | Teaching assignments and timetables point here | Name, colour, kind (lessons or activity). A family's own subject, such as "Family project", → `families` |
| `strands`, `topics` | Project rule: subject → strand → topic → unit → lesson → objective | → the level above |
| `units` | Groups lessons, and has an exam | → `topics`, name, order |
| `lessons` | A lesson's lasting identity | → `units`, title, order, status |
| `lesson_versions` | **Published lessons are never edited,** so we always know which one a child saw | → `lessons`, version, published date, the lesson's content |
| `objectives` | What each lesson teaches. Marks anything outside the official list as bonus | → `lessons`, text, official or bonus, source |

### D. Questions and papers
| Table | Why it exists | Holds, and links to |
|---|---|---|
| `questions` | A question's lasting identity, across versions. **Questions have no ID today** | Type, → `lessons` or `units` |
| `question_versions` | **Never edited.** A change makes a new version, so old answers still point at what the child really saw | → `questions`, the text, choices, right answer, explanation, mark scheme, marks, image, who wrote it, date |
| `question_objectives` | So reports can say what's weak | → `question_versions`, → `objectives` |
| `assessments` | Starter quiz, lesson test, re-test, unit exam, term exam | Kind, → `lessons` or `units`, rules |
| `assessment_versions` | **A frozen paper.** Old results always stay with the paper that was sat | → `assessments`, version, minutes, total marks, published date |
| `assessment_questions` | Which question version sits at which place on that paper | → `assessment_versions`, → `question_versions`, position, marks |

### E. The child's work
| Table | Why it exists | Holds, and links to |
|---|---|---|
| `attempts` | One sitting of one paper | → `children`, → `assessment_versions`, → `devices`, started, finished, status, and at the end the frozen score, total, final mark and the scale used |
| `answers` | **What the child really answered.** Not kept for lesson tests today. It also feeds "Mistakes to fix" and re-tests | → `attempts`, → `question_versions`, position, the answer, automatic marks, right or wrong, when |
| `marks` | **An adult's mark. Only ever added to.** The newest counts, and older ones stay | → `answers` or → `diary_entries` or → `homework_items`, value, scale, comment, given by → `parents`, when, replaces → `marks`, reason |
| `exam_sittings` | An exam's extra rules: one attempt, a timer, and an adult who started it | → `attempts`, started by → `parents`, start, end time, finished |
| `watched_lessons` | Who has seen a lesson. Keeps the first time, as the current file does. **A TV doesn't know who is watching,** so its row has a device and no child, and it counts for the children linked to that TV | → `children` (may be empty), → `devices`, → `lesson_versions`, first watched |

Later: `mastery` and `review_schedule` from `ARCHITECTURE.md`. They can be worked out from `answers`, so they only become tables if that gets slow.

### F. School time
| Table | Why it exists | Holds, and links to |
|---|---|---|
| `school_settings` | School start, day start, class length, marks out of 12 or percent | → `families`, optional → `children`, from which date, set by |
| `timetable_versions` | **Fixes the known limit:** a change starts on a date, and earlier weeks stay as they were | → `families`, optional → `children` for their own, from, to, set by |
| `timetable_slots` | One class in the week | → `timetable_versions`, day, period, → `subjects` |
| `days_off` | Breaks and "No school" days | → `families`, optional → `children`, from, to, reason, added by, removed by |
| `diary_entries` | **One class, for one child, on one date.** Future classes are still worked out. Once a school day starts, its classes are saved and don't move | → `children`, date, period, → `subjects`, → `units`, → `lesson_versions`, kind, done, done by |
| `homework_items` | Homework, with the kinds in `HOMEWORK.md` | → `diary_entries` or → `children`, kind, text, due date, set by, done date, the child's line, reopened by |
| `week_signoffs` | The signature and weekly note in the diary, which the child can see | → `children`, week, signed by → `parents`, when, note |

### G. Working together
| Table | Why it exists | Holds, and links to |
|---|---|---|
| `jobs` | The shared job list | → `children`, → `subjects`, kind, → `attempts` or `homework_items` or week, due date, status, claimed by, claimed when, done by, done when |
| `handover_notes` | Notes between adults. Never edited | → `children`, optional → `subjects`, written by, for whom, who can see it, text, when |
| `note_reads` | Shows a note arrived | → `handover_notes`, → `parents`, when |
| `notice_settings` | Each parent's choices. Safety notices can't be turned off | → `parents`, optional → `children`, kind, on or off |
| `notices_sent` | What was sent to whom. Helps support, and shows a notice really went | → `parents`, kind, when, delivered or not. No marks or notes |

### What must keep history, so old marks never change
Here's the problem today. An exam record says "question 3: 2 marks", and the total is worked out from today's exam file. If someone moves question 3, an old result silently becomes wrong.

| What | Rule |
|---|---|
| A question | Never edited. A new version is added |
| A paper | Frozen once published. A change makes a new version |
| A lesson | Published versions are never edited |
| A child's answers | Never changed after the attempt finishes |
| An adult's mark | Only added to. The newest counts, with who, when and why |
| A final mark | Saved with its score, total and scale at the time, so changing from 12 to percent later doesn't rewrite the past |
| A timetable | A change makes a new version from a date |
| A past school day | Saved once it starts. It doesn't move |
| A signed week | Stays signed. A later change shows as a change, and the signer is told |
| Roles, links and assignments | Ended with a date, never erased |
| Consent | Withdrawing adds a date, and the old row stays |
| `activity_log` | Only added to, and no one can edit it |

**If a question turns out to be wrong,** nothing changes by itself. A teacher can add a corrected mark, with a reason, and it shows as a correction.

**The one exception:** when a child is deleted, their records really are erased, after the 14-day wait. Only a line remains: "a child's record was removed on this date, asked by this adult". Backups age out too, by a date we must state to parents.

**About claims:** these records follow a parent's own work. We can't say they meet any country's home-school rules, or that they are approved or accredited.

### Rules that keep families apart
- **Every check happens on the server, never in the browser.** Postgres can also refuse to show a row to the wrong person. This is called row-level security.
- **An adult sees a child only with an active link.** Paying doesn't give a link.
- **A child sees only their own work,** and never handover notes.
- **A TV can only play lessons.** It holds no child's identity.
- **Right answers don't go to the child's device before they answer.** The server checks each one. Today, the answers are in code a child's browser can read.
- **Passwords are never stored by us as text.** The plan is the sign-in provider named in `ARCHITECTURE.md`, not our own password handling.

---

## 4. A small safe step for now: a daily backup

**Proposed. Not switched on.** It only reads the family file, and never changes it.

| Question | Answer |
|---|---|
| What does it do? | Once a day, at 21:00, it copies `data/family.json` to a private folder |
| What does it keep? | The last 30 days, plus one copy per month for a year |
| How much disk? | Almost nothing. The file is about 500 bytes today. Even at 1 MB, it would be about 42 MB |
| If the Mac sleeps at 21:00? | It runs when the Mac wakes. This is what Apple's manual for `launchd` says |
| If the Mac is off? | It runs at the next sign-in |
| If the file is broken or missing? | It copies nothing, keeps all the old copies and writes a line in `backup.log` |
| Does it need the server changed? | No. It touches no project file |

### What it doesn't do
- **It lives on the same Mac.** A dead disk loses both. Time Machine or an outside drive would fix that. I didn't check whether you use Time Machine.
- **You could lose up to one day of work.**
- **It copies the file only,** not the copies in each browser.
- **The copies hold plain-text passwords.** So the folder is private to your Mac user, and shouldn't go to iCloud or other online storage until passwords are fixed.

### The script
To be saved as `~/HomeSchool-backups/backup.sh`, only after your yes.
```sh
#!/bin/sh
# Home School TV: copies the family data once a day. Keeps 30 daily and 12 monthly copies.
SRC="${HS_DATA:-$HOME/www/HomeSchool/data/family.json}"
DEST="${HS_BACKUP_DIR:-$HOME/HomeSchool-backups}"
umask 077                                  # only this Mac user can read the copies
mkdir -p "$DEST/daily" "$DEST/monthly" || exit 1
say() { echo "$(date '+%Y-%m-%d %H:%M') $1" >> "$DEST/backup.log"; }
if ! /usr/bin/plutil -convert json -o /dev/null -- "$SRC" 2>/dev/null; then
  say "NOT COPIED: file is missing or broken. Old copies were kept."; exit 1
fi
TODAY=$(date +%Y-%m-%d); MONTH=$(date +%Y-%m)
cp "$SRC" "$DEST/daily/.tmp" && mv "$DEST/daily/.tmp" "$DEST/daily/family-$TODAY.json" || { say "NOT COPIED: copy failed."; exit 1; }
[ -e "$DEST/monthly/family-$MONTH.json" ] || cp "$SRC" "$DEST/monthly/family-$MONTH.json"
find "$DEST/daily" -name 'family-*.json' -mtime +30 -delete    # only reached after a good copy
find "$DEST/monthly" -name 'family-*.json' -mtime +370 -delete
say "OK"
```

The timer, to be saved as `~/Library/LaunchAgents/homeschooltv.family-backup.plist`:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0"><dict>
  <key>Label</key><string>homeschooltv.family-backup</string>
  <key>ProgramArguments</key><array><string>/bin/sh</string><string>/Users/you/HomeSchool-backups/backup.sh</string></array>
  <key>StartCalendarInterval</key><dict><key>Hour</key><integer>21</integer><key>Minute</key><integer>0</integer></dict>
  <key>RunAtLoad</key><true/>
</dict></plist>
```

To switch it on, once both files are saved:
```bash
launchctl bootstrap gui/$(id -u) ~/Library/LaunchAgents/homeschooltv.family-backup.plist
```

To switch it off:
```bash
launchctl bootout gui/$(id -u)/homeschooltv.family-backup
```

### To bring back an old copy
This replaces the current data, so anything newer is lost. Close the app on other devices first, because a device with an old copy can write over it.
1. Copy the current file somewhere safe.
2. Copy the chosen backup over `data/family.json`.
3. Refresh each device.

### What I tested
- **Tested, in a scratch folder with a made-up file:** a good copy, old copies aged out and recent ones kept, a broken file (nothing deleted), a missing file (nothing deleted). The timer file passes Apple's format check.
- **Not tested:** the timer really firing, because I didn't install it. A real restore, too. **Your real file was never touched.**
- **Possible:** macOS may show a notice that a background item was added. I couldn't confirm that without installing it.

---

## 5. Moving from the JSON file

The file is nearly empty today, so **the move is cheap now and gets harder with each week of real use.**

### Order of work
Each step can stop without breaking anything. The current prototype keeps running until step 6.

| Step | What happens | How we know it worked |
|---|---|---|
| **0. Backup** | Part 4 above | A copy appears each day |
| **1. Stop losing history** | If you agree (decision 2): start saving full test answers, and a frozen copy of the exam, in the file | New results show the answers |
| **2. Lessons and questions first** | The database gets subjects, units, lessons and questions from `curriculum.js`, `episodes/*.js` and `exam.js`, as version 1. No child data yet | Counts match: 75 + 17 questions, as of today |
| **3. People, with made-up families** | Sign-in, parents, children, links, roles. Test a one-house family and a separated family | A parent sees only their own linked children, checked by trying to break it |
| **4. Practise the move** | A one-way script copies a backup into a test database. Run it as many times as needed | **Each child's gradebook looks exactly the same before and after** |
| **5. Change the app, page by page** | Almost all saving goes through `store.js`, so that's the main door. Two pages also write directly: `student.js:130` and `diary.js:6` | The real TV, a tablet and a laptop still work |
| **6. Switch your own family** | Pick a quiet day, such as a school break. Stop saving, take a final backup, run the move, compare, then everyone signs in once | Gradebook matches, and each child can sign in |
| **7. Second parent** | Invitation, job list, claiming, handover notes, notices | Both parents can use it for a week |
| **8. Other families** | **Only after** the lawyer's review and the "Before charging" checklist. Then Stripe | Checklist is finished |
| **9. Clean up** | With your OK: erase the old file and backups with plain-text passwords, after the database's own backups have been restored once as a test | Restore tested |

This keeps the order in `ARCHITECTURE.md`: sign-in, then families, then payments.

### Where each part of the file goes
| Today | New place | What happens |
|---|---|---|
| `parent` | `parents` and the sign-in provider | **The password isn't copied.** Each adult sets their own |
| `parentPin` | `parents` | Each teacher sets their own PIN |
| `kids` | `children`, `parent_child_links`, `teaching_assignments` | Each child links to you, and to the other parent once invited. New logins, or a hashed old one |
| `attempts` | `attempts` | Marked "moved from the file". **Only score and total exist.** The answers were never saved. An empty `ep` means Skeleton, as the code does today |
| `attempts.missed` | Linked to questions, if the test hasn't changed | Otherwise kept as "unknown" rather than guessed |
| `exams` | `attempts`, `exam_sittings`, `answers`, `marks` | Positions become version 1 of the exam. **Who marked it: "not recorded"** |
| `watched` | `watched_lessons` | First time kept. `family` means no child, and no known device |
| `school` start, times, scale, `startUnit` | `school_settings` | As they are |
| `school.timetable`, `kidTimetable` | `timetable_versions`, `timetable_slots` | Version 1, from the school start |
| `school.breaks`, `off` | `days_off` | Added by: "not recorded" |
| `school.log` | `diary_entries`, `homework_items`, `marks` | The key is date and period. Past classes are saved using the timetable at the time of the move, and marked as moved, because **earlier timetables were never saved** |
| `school.signed` | `week_signoffs` | Signed by: "not recorded" |
| `school.notes` | `week_signoffs` | Written by: "not recorded" |
| Browser sign-in | Not moved | Everyone signs in once more |
| Saved place in a lesson | Stays in the browser at first | Can move later |

### If it goes wrong
- **Before the first real day on the new system:** go back to the file. Nothing is lost.
- **After that, we can't simply go back,** because new work exists only in the new system. So the old server stays read-only for one month, for checking, and we fix forward.
- **The move only reads the file,** and the original stays until step 9.

---

## 6. Decisions for you

### For now
| # | Question | Recommendation | Other choice |
|---|---|---|---|
| 1 | Switch on the daily backup? | **Yes,** on this Mac: 30 daily and 12 monthly copies. Also Time Machine if you use it | Also copy to a drive you plug in. Not to iCloud while passwords are plain text |
| 2 | How much do we fix in the prototype now? | **Three small things:** stop showing the exam PIN on the exam screen, replace the starting passwords, and start saving full answers with a frozen exam. Real security waits for the database | (a) Move sign-in to the Mac server as well. It's more work on something we'll replace. (b) Nothing, but history is lost once real use starts |
| 3 | Which country comes first? | **You choose.** It's already an open question, and it decides the law, the lawyer and where data is stored | Ukraine, Colombia, England or Spain have all come up |

### Before building
| # | Question | Recommendation | Other choice |
|---|---|---|---|
| 4 | Is a "family" one paid account, not one house? | **Yes.** It's what makes separated parents work | One house: simpler, but it breaks when parents separate |
| 5 | What does someone who only pays see? | **Bills and the number of children only.** No marks | Also a short progress summary, if a parent allows it |
| 6 | Who teaches by default? | **Every linked parent teaches everything,** until the family splits subjects. Subjects decide who is told first, not who is allowed | Strict: only the assigned teacher may mark. Tidy, but it blocks work when one is away |
| 7 | Who can delete a child? | **Only a linked parent.** The other is told, and after 14 days it's erased, unless they object | Both must agree. Safer, but one silent parent blocks it forever |
| 8 | Can a parent end the other parent's link? | **No, not alone.** It goes to support | Allow it: simple, but dangerous in a dispute |
| 9 | Separated parents: who pays? | **A child sits on one paid account,** and the other parent's access is free. If the payer stops: 30 days read-only, both are told, and the other can take over | Each parent pays for their own copy. Not recommended, because it splits a child's records in two |
| 10 | Rules for claiming and correcting? | **A claim opens again after 3 school days.** Any teacher may correct a mark, the newest counts, the old one stays, and the first marker is told | Only the first marker can change a mark |
| 11 | Who signs the week? | **Any teacher of that child.** One signature is enough, and the other may add theirs | Both must sign. Hard for separated parents |
| 12 | Private notes that the other parent can't read? | **None at first.** All notes are seen by all linked teachers, until the lawyer answers | Private notes now: this is the riskiest choice |
| 13 | Are the default notices right? | **Yes, as in the table in part 2:** email only, with no marks in the email | Fewer: one daily email instead |
| 14 | How strong are child logins once online? | **An easy generated password,** such as a colour, an animal and a number, with a lock after wrong tries. Each teacher has their own exam PIN | Keep 4-digit PINs. Too weak on the open internet |

### Before other families
| # | Question | Recommendation | Other choice |
|---|---|---|---|
| 15 | How long do we keep data after a family leaves? | **90 days read-only with reminders, then erase.** Download is possible at any time. Have the lawyer confirm | Longer, if local home-school rules require it |
| 16 | Can other adults be added, such as a grandparent or tutor? | **Later.** The design has room, as "teach only" with no parent rights | From the start, once the lawyer has answered question 6 |
| 17 | When do we start building? | **Steps 0 to 2 of part 5 soon, the rest after the child's screens settle.** Use made-up data until you choose to move your own family | Start now, alongside the screen work |

---

## What isn't verified
- **Legal:** nothing here is legal advice. The 7, 14, 30 and 90-day periods and the 3-school-day limit are my suggestions, not from any law.
- **Child logins without email:** I haven't checked that the sign-in providers named in `ARCHITECTURE.md` (Supabase Auth, Better Auth) support them. Check this before choosing one.
- **Row-level security with our setup:** planned in `ARCHITECTURE.md`, not tried.
- **"Work done offline is lost":** found by reading the code, not by running it.
- **Cost and time:** I haven't estimated either. I'd rather do that once decisions 4 to 14 are made.
- **Real data:** this document uses only field names and counts from `data/family.json`. A small check compared the file's values with this document, without printing them, to be sure none got in.
- **Other sessions:** others are changing child screens and designs. If `store.js` changes, for example the `watched` record, part 1 and the table in part 5 need checking again.

## Documents to update after your yes
These stay as they are until you decide.
- `ARCHITECTURE.md`: "Accounts" and "Assessment" data lists. It says a parent "belongs to a family", and this plan changes that.
- `HOW-IT-WORKS.md`: "Three people, three screens" becomes two adult jobs: Control Center and Admin.
- `COMPLIANCE-AND-LICENSING.md`: **already out of date.** It says children sign in with "a family code, picture and PIN", but the decision of 2026-11-06 is one sign-in with a username and password.
- `SCHEDULE-AND-DIARY.md`: "A parent signs each week" becomes "any teacher of the child, by name". The known limit on past dates gets its fix.
- `DECISIONS.md`: one row for each decision you make.
