# Design research: how good parent apps and dashboards are built

Date: 2026-11-07. **Why:** the owner rejected every parent pad so far: "None of them looks good ... not different looks, similar same issues as before. Do a research how to build good looking apps and design directions ... Feels like you don't understand or not searched and used any reference ... Write all researches down to be able to follow and reuse."

**How it was done:** four research passes on the web, with sources. Each claim is marked **seen** or **verified** (read in a source this session), or **secondary** or **unverified** (remembered, or from a review). The full reports:

| Report | What it covers |
|---|---|
| [Family and school apps](2026-11-07-research-family-and-school-apps.md) | Screen Time, Family Link, ClassDojo, Seesaw, Khan Kids, Brightwheel, Cozi, Skylight, Classroom summaries, Canvas Parent, Homeschool Planet, Duolingo Family |
| [Dashboards and today screens](2026-11-07-research-dashboards-and-today-screens.md) | Apple Health, Fitness, Home, Weather; Things 3, Todoist, Fantastical, Linear, Notion, Stripe, Google Home, Duolingo, Khan Academy; bento, Liquid Glass, Material 3 Expressive |
| [iPad and platform guidance](2026-11-07-research-ipad-and-platform-guidance.md) | Apple Human Interface Guidelines (read from Apple's own data files), Material 3 adaptive layouts, WCAG 2.2 |
| [UX psychology and layers](2026-11-07-research-ux-psychology-and-layers.md) | Progressive disclosure, modals versus sheets versus pages, scroll inside sections, the laws of UX, hierarchy, calm technology, low vision, trends, microcopy |

**Limits:** no screenshots were looked at. Layouts come from help pages, release notes, reviews and captions. Mobbin and Dribbble need a login. Material 3's own site refused automated reading, so its rules come from Google's Android pages and GitHub. Seesaw, Khan Kids and Duolingo Family are thin.

## The twelve findings that matter most
1. **One hero, not equal tiles.**
   - *Example:* Weather leads with the temperature, and Fitness keeps the rings locked at the top. In Apple Home, the size of a tile shows how important it is.
   - *Where we went wrong:* our tiles were all the same weight.
2. **Plain words before numbers.** Weather's hourly card starts with a sentence. Health says "You climbed more this week". A number alone makes the parent work it out.
3. **The order follows what matters now.**
   - *Example:* Weather moves rain to the top when it's coming.
   - *Classroom's order for a parent:* missing or late, then coming up, then what happened. When there's nothing to report, it says nothing.
4. **Each child has one colour and one face, everywhere.** Skylight, Cozi, Homeschool Planet and Khan Kids all do it. The parent knows the child before reading the name.
5. **With a few children, show them side by side.**
   - *Example:* Skylight's Day view has one column per person.
   - *Why:* Brightwheel's users complain that they must switch child by child.
   - *The exception:* a one-child switcher, like Family Link's pill or Canvas's dropdown, suits apps with a lot of data per child.
6. **A card states a fact and offers its action.** Family Link pairs "time today" with **Lock**. Skylight puts a tick circle on each task.
7. **One list for everything that needs the parent.** Family Link's bell, Canvas alerts and Apple's Ask to Buy. An empty list means all is well.
8. **Settings are a separate place behind a small, steady entry point.** Examples: "My Skylight" at the top right, Family Link's profile picture, or iOS Settings. Never cards on the home screen, and never a sliding panel. Apple keeps settings for rarely changed and account options.
9. **Two layers, then a page.**
   - *The rule:* NN/g found designs with more than two disclosure levels "typically have low usability".
   - *Layer 1:* today's answers. *Layer 2:* detail. Anything deeper is a full page.
   - *Apple:* one sheet at a time, never a popover on a phone.
10. **No scroll boxes inside the page.**
    - Baymard's testing found inner scroll areas confusing, and the iPad hides their scroll bars.
    - Show "3 of 5" with a named link ("All 5 classes") instead.
11. **Big type, stacked at large sizes, never cut.**
    - Apple body text runs from 17 pt up to 53 pt at the largest size.
    - At large sizes: stack the layout, use fewer columns, let rows grow, and keep the hierarchy.
    - WCAG says text at 200% and a width of 320 px must lose nothing.
12. **Calm, and colour only for meaning.**
    - Linear removed most of its blue in its 2024 redesign.
    - Amber Case's calm technology: quiet by default, interrupt only for what truly needs the person.
    - Apple: "Don't use Liquid Glass in the content layer."
    - Material 3 Expressive helps with bigger labelled buttons and clear containers, not with playful shapes.

## Reference library
| Product | Learn | Avoid |
|---|---|---|
| **Skylight Calendar** (Tasks Day view) | One column per person: avatar, colour, progress bar, groups by time of day, a tick circle, settings behind "My Skylight" | Columns crowd when there's a lot in them, so group and filter |
| **Google Family Link** (2025) | Fact-plus-action cards, a small child-switcher pill, a bell for requests, controls in their own place | No view of all children together |
| **Google Classroom** summaries | The order: missing, then upcoming, then activity; silence on quiet days | An email can't take action |
| **Canvas Parent** | Rule-based alerts (a grade below a set level), a full page per course with the grade on the first screen | Organised around school courses, not around the family's day |
| **Apple Health** Summary | Pinned items, then Highlights in plain words, then "Show all", a full page per item | — |
| **Apple Fitness** | One hero (rings) locked at the top; cards below that the person can rearrange | — |
| **Apple Weather** | A hero plus modules, a plain sentence first, order that changes with the situation, a detail sheet per module | Glass over a photo behind text |
| **Things 3** Today | Calm list, day and evening split, expand in place, white space | — |
| **Apple Home** | Status chips per area ("Lights: 2 on"), tile size shows importance, a sidebar on iPad | — |
| **Cozi Today** | Drops what's already over | Upsell cards on the home screen |
| **Homeschool Planet** | Any combination of students at once; colour per student | A dashboard of weather and quote widgets that answer nothing |
| **Linear** | Neutral base and alignment; an Inbox opening on Priority | — |

## Which layer for which job (from Apple, Material, NN/g and Baymard)
| Job | Use | Not |
|---|---|---|
| The pad | One page; the next thing is the hero; one region per question | Equal tiles, filler widgets |
| One child | A full page (push) with Back | A slide panel |
| A class: give a mark, set homework | A **sheet** (centred on iPad, from the bottom on phone) with Cancel and Done | A full page, or two sheets stacked |
| Admin (settings) | A **separate full page** behind the gear; grouped list; on iPad a list beside the detail, like iOS Settings | A slide panel, or cards on the pad |
| Text size | Follow the system; a small A / A+ / A++ control | Hidden in a deep menu |
| Delete | Undo for common deletes; an alert with a verb for permanent ones | "OK" |
| A long list (scores) | Its own page; a table with sticky headers | A scroll box inside the pad |
| A short list on the pad | The first few, then "All 5 classes" | Cut-off text, or a hidden scroll |
| A quick choice ("No school today") | A popover on iPad, a short bottom sheet on phone; undoable | A full page |

## The one tension, and how we resolve it
The owner wants **one screen with no page scroll**. Apple and WCAG say that at very large text the page must be allowed to grow. **Resolution:** at normal and Large text the pad fits one screen. At Extra large text, each region shows fewer items, plus a named link to the rest ("All 5 classes"), so it still fits and nothing is cut. Deeper pages (scores, the week) may scroll, because they are long by nature.

## The three directions built from this
Each is named after the products it learns from, and each has Admin as a separate full page. See `product/PARENT-PAD-PURPOSE.md`.
1. **Board** (Skylight Calendar + Things 3 + Classroom's order): the three children side by side as columns.
2. **Summary** (Apple Health + Fitness + Weather + iPad Settings): one hero with a ring per child, then Needs you and plain-words highlights.
3. **Cards** (Google Family Link + Material 3 Expressive): fact-plus-action cards, a switcher pill for all children or one, and a bell for what needs you.
