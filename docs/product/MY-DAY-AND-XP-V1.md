# My day and XP: the first version

Written 2026-11-10, after the owner said "Yes, plan it". It brings three things together:
- Kid 2's "it's not clear what to do"
- the children's wish for XP and a shop
- the owner's photos of another app, "Family School" (kept private)

The full XP plan, with the research behind it, is `XP-AND-REWARDS.md`. This page is only the **first version**, and it is **content, not style**: the look comes from the options built next.

## 1. My day: the child sees what to do, in order

**Why:** Kid 2's My day on 10 November had these problems:
- 4 of 5 classes said "Not made yet", with no lesson.
- The big card was yesterday's catch-up.
- 3 tests and 3 more catch-ups sat beside it, with no order between them.
- The header said "0 of 25 classes", which counted classes that don't exist.

The Family School photo gets this right: "Today's lessons, 4/4, All done for today!", with each lesson's steps ticked.

**The ladder** (from `rules/VISUAL-HIERARCHY.md`):
| Level | What |
|---|---|
| **Main** | **Today's plan:** one numbered list of what to do today, in order, with a ring ("2 of 5 done"). The first step not done yet has the only big button: **Start** |
| Secondary | A small header: level ring with its chess rank, coins, and "this week: 3 of 5 days" |
| Supporting | The timetable for today (in the Diary), and the To do and Marks pages, as now |
| Quiet | The bottom bar, settings |

**What goes in Today's plan, in this order:**
1. **Today's lessons.** Each one shows subject, minutes and title, and its steps as ticks: Warm-up, Watch, Test.
2. **Tests waiting,** oldest first. Each is about 10 minutes.
3. **One catch-up lesson at most,** marked "from Monday". The rest wait in To do, so the list never grows long.
4. **Homework due today** from the Diary.
5. **Household tasks** for today, which parents add (part 2 below).

**Classes with no lesson** stay out of the plan. If a parent wrote what to do instead ("Read 20 minutes"), that note joins the plan. "Not made yet" never shows to a child.

**When everything is done:** "All done for today! Amazing work." Below it, **Extra practice (no XP)** offers re-watching or a Materials page.

**A parent can turn the header off.** With XP off, My day is just Today's plan.

## 2. XP and coins

**XP** is earned. It raises your **level**, which never goes down. **Coins** are what you spend in the shop.

**Recommended: every XP also gives 1 coin.** That's simpler for children than "1 coin for every 10 XP". The photo app gives far more XP each day (528 in one day), so its 1 in 10 suits its scale, not ours.

**What earns XP:** the amounts are in `XP-AND-REWARDS.md`, "What earns XP":
- lesson on your own device: 15
- starter quiz: 5
- test finished: 20, whatever the score
- fix my mistakes: 10
- second try better than the first: +10
- re-test: 10
- exam finished: 60
- homework: 10 to 20
- household task: set by the parent, approved by a parent
- parent's bonus with a note: 10, 25 or 50

A normal school day comes to about 100 XP.

**Levels use chess ranks,** as in the photo, which suits a family that likes chess:
| Rank | Levels |
|---|---|
| Pawn | 1 to 5 |
| Knight | 6 to 10 |
| Bishop | 11 to 15 |
| Rook | 16 to 20 |
| Queen | 21 to 25 |
| King | 26 and up |

The first levels come in days, and later ones in weeks.

**After each thing, a short message says why:** "+20 XP. Test finished." It never shows during an exam.

## 3. The shop

These are the photo's six rewards. **The prices are doubled**, so each costs about as many school days as it does in the photo app:

| Reward | Coins | Limit |
|---|---|---|
| 30 min extra gaming | 120 | Once a day |
| Choose what's for dinner | 160 | Once a week |
| Skip one chore | 200 | Once a week |
| Pick the family movie | 240 | Once a week |
| Stay up 30 min later (weekend) | 300 | Weekends |
| Special outing with Mom | 800 | Once a month |

- **To buy:** the child taps a reward. The coins are set aside, and it shows "Waiting for Mum or Dad". On the pad, a parent taps **Give it now** or **Not now**. With Not now, the coins go back.
- **Not enough coins yet:** the reward says "64 more coins", so children can see how far they are from it.
- **Parents edit the list,** prices and limits on the pad. Children add their own wishes later.

## 4. Household tasks
- A parent adds a task in the Diary, such as "Wash the car, 30 XP". It can happen once or every week.
- The child ticks it done, and a parent OKs it on the pad. The XP then arrives.
- Everyday jobs, like making your own bed, earn nothing unless the parents decide otherwise.

## 5. The parent's side
- **On Today,** one line, only when something waits: "Ana wants: Pick the family movie", and "Leo did: Wash the car". Each has its buttons right there.
- **Each child's page** shows their level, coins and this week's XP, and a **Give a bonus** button with a short note.
- **The shop and tasks** are edited in one Rewards place.
- **In Admin,** XP can be turned on or off.

## 6. The family goal
One shared goal that all three fill together, such as "Pizza and a film: 1,500 XP together". Only this goal ever shows on the TV, never one child's XP or level.

## Left for later
- habits in the app
- XP for Materials activities
- saving goals with a ring
- the wish list
- badges
- the weekly school-days bonus
- the 80% watched check

## Build next, once the owner says yes
Two or three real, clickable options for **My day with Today's plan**, **My XP page with the shop**, and **the pad's waiting line**, with a recommendation. They will be checked:
- with `tools/hierarchy-check.mjs`
- at laptop, iPad and phone sizes
- with 1, 3 and 5 children

The kid screens' look is still open (`background/KID-DESIGN-DIRECTIONS.md`), so the options also show different looks.

## Questions for the owner
1. **Coins:** 1 coin for each XP, with the doubled prices above (recommended), or 1 coin for every 10 XP, as in the photo?
2. **The first shop:** keep these six rewards? Should sweets go on it?
3. **"Tasks":** household jobs, school tasks, or both? The plan does both.
4. **The first family goal:** what would all three like?
