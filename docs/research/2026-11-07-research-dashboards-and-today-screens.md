# How the best "today" and summary screens are built

Research for the parent pad (iPad first, large text). Date: 2026-11-07.

Markers: **[seen]** means read in a source during this research. **[unverified]** means remembered or inferred and not confirmed in a source this time. Most press sources date from launch (2019–2025), so current layouts may differ in detail.

---

## 1. Product by product

### Apple Health: Summary (iPhone and iPad)
- **Composition.** One scrolling column. Top: the person's chosen metrics (called Favorites in iOS 13, shown as "Pinned" in later versions [unverified name change]). Each shows only the latest value. Below: **Highlights**, a few chart cards that compare recent data, for example "stairs this week vs last week". At the bottom: suggestions and articles [seen, MacStories].
- **Avoiding overload.** Highlights shows "only a few at once", with a **Show All Highlights** link to the full set [seen]. Everything else lives in a second tab, Browse [seen]. Apple Books' Reading Now is the model: one place that brings up what's relevant [seen, MacStories].
- **Detail.** Tapping a metric **pushes** a full page with a chart and short teaching text [seen].
- **Style.** Each health category has its own colour (Activity orange, Heart red, Sleep teal, and so on), used for the small icon and the category label on each card. White cards on a light grey background, big numbers, small grey units [unverified, remembered].
- **iPad.** Apple calls it "an optimized design for the iPad display", with Favorites, Trends and Highlights using the wider screen and interactive charts [seen, Apple newsroom 2023]. Whether it has a sidebar was not confirmed.
- Sources: https://www.macstories.net/stories/health-in-ios-13-a-foundation-for-apples-grand-wellness-ambitions/ · https://www.apple.com/newsroom/2023/06/ipados-17-brings-new-levels-of-personalization-and-versatility-to-ipad/

### Apple Fitness: Summary
- **Composition.** The Activity rings card is fixed at the top and is the hero. It takes about a third of the screen [seen, MacStories watchOS 11 review]. Below it are cards for Trends, workouts, sessions, awards and friends. The Summary replaced four separate tabs (History, Trends, Workouts, Awards) with "brief summaries for each" [seen, iOS 14 coverage].
- **Avoiding overload.** At the bottom are **Edit Summary** (move cards in "jiggle mode"; the rings stay locked at the top) and **See All Categories** for anything not shown [seen].
- **Detail.** Cards push to full pages [unverified].
- **Style.** Three semantic ring colours (red Move, green Exercise, blue Stand) carry through every chart. Black background on iPhone [unverified].
- Source: https://www.macstories.net/stories/watchos-11-the-macstories-review/4/

### Apple Home (iOS 16 redesign onward)
- **Composition.** **Category buttons** across the top (Lights, Climate, Security, Speakers & TVs, Water), each with a status line such as "2 on" [seen, MacStories]. Below them, a camera grid (up to four at once, with more by side scroll), then Favorites, then rooms of tiles [seen].
- **Tiles.** Two sizes: small rectangles and wide landscape rectangles, set by the person [seen]. Size, not colour, is the main way to show importance.
- **Detail.** Tapping a category **blurs the Home tab and lays that category's devices over it**, grouped by room [seen]. Tapping a tile turns the device on or off; holding it opens full controls [unverified].
- **iPad.** Rooms and categories also sit in a **sidebar** [seen].
- **Lesson for us.** Status chips that summarise each area ("Climate 21°", "Security: 1 open") let a person check the whole house without opening anything.
- Source: https://www.macstories.net/stories/everything-new-coming-to-the-home-app-in-ios-16-and-macos-ventura/

### Things 3: Today (iPad)
- **Composition.** Calendar events come first, in their calendar colours, and past events turn grey. Then the day's to-dos as plain text rows. Then a **This Evening** section on the same screen [seen, MacStories]. On iPad there is a sidebar with Inbox, Today, Upcoming, Anytime and the projects [unverified detail].
- **Avoiding overload.** A list, not cards. The layout is "dominated by white space", with bold type and "thoughtful splashes of color" [seen]. The day is split only by time of day (day and evening), not by category.
- **Detail.** Tapping a to-do **expands it in place** into a card while the rest of the list fades back [seen]. You can drag the "+" button to the exact spot in the list where a new item should go [seen].
- **Style.** One accent per meaning: a yellow star for Today, a blue moon for This Evening, and small pie charts for project progress [partly seen; star and moon unverified].
- Source: https://www.macstories.net/reviews/things-3-beauty-and-delight-in-a-task-manager/

### Todoist: Today
- **Composition.** A header with the date and a task count. An **Overdue** section first, with its own "Reschedule" action [action unverified], then today's tasks. List by default, with a board layout as an option [seen, help centre].
- **Avoiding overload.** The Overdue section **can be collapsed** so late tasks "don't crowd out the rest of your day" [seen, What's New page]. The empty state is a calm illustration with a short line [unverified].
- **Detail.** On iPad, a task opens as a sheet or side panel [unverified].
- **Style.** Priority shown with a coloured check circle (red, orange, blue). Red is the brand colour and is also used for overdue dates [unverified].
- Sources: https://www.todoist.com/help/articles/use-board-view-in-todoist-AiAVsyEI · https://win.todoist.com/help/articles/whats-new-WV4aRXKsN

### Fantastical (iPad)
- **Composition.** A sidebar with a mini month calendar at the top left. Its coloured dots show how busy each day is, and it stays in step with the schedule list under it. Buttons at the top switch between Day, Week, Month, Quarter and Year. The Year view is a heat map [seen, Flexibits help]. Older iPad versions had three linked panes: a day strip, a list and a month grid [seen, 2014 reviews].
- **Lesson for us.** A small overview (the month) next to the detailed list (today), both kept in step. Busyness is shown by dots and colour, not numbers.
- Source: https://www.flexibits.com/fantastical-ios/help/calendar-views

### Linear: Inbox and My Issues
- **Composition.** A list beside a detail view. The Inbox opens on a **Priority** tab by default ("notifications that need your attention"), with other updates kept separate [seen, Linear docs].
- **Avoiding overload.** Snooze hides an item until a set time. "Show unread first" puts unread items at the top. Read items can be cleared in bulk [seen].
- **Style.** The 2024 redesign aimed to "reduce visual noise, maintain visual alignment, and increase the hierarchy". Colour moved to LCH, so equal lightness values look equally light. A whole theme now comes from 3 variables (base, accent, contrast) instead of 98. The **blue accent was cut back** for a neutral look. Inter Display is used for headings and Inter for everything else [seen, Linear blog].
- **Lesson for us.** Quiet, alignment-driven neutral design, where colour is kept for meaning.
- Sources: https://linear.app/now/how-we-redesigned-the-linear-ui · https://linear.app/docs/inbox

### Notion: Home
- **Composition.** A greeting, then fixed widgets: Recently visited (a row of small cards scrolled sideways), Upcoming events from Notion Calendar with a "join" link, My tasks, and a chosen database view [seen, release notes 2.38/2.40; card layout from a third-party guide]. It is **not** a free canvas, unlike the rest of Notion [seen, Thomas Frank].
- **Avoiding overload.** Each widget can be hidden. Each list is short, with a link to the full view [unverified detail].
- Sources: https://www.notion.com/releases/2024-06-11 · https://thomasjfrank.com/every-notion-feature-released-in-2024/

### Stripe Dashboard: Home
- **Composition.** At the top, a **Today** strip: one big line chart of today's gross volume against yesterday, with the balance and next payout beside it [unverified, remembered]. Below it, **Your overview**: a grid of widgets the person picks. The page also "surfaces important notifications, like unresolved disputes" [seen, Stripe docs]. One date range and compare control applies to the whole overview [unverified].
- **Avoiding overload.** Widgets are chosen by the person through Add, Edit and Apply [seen]. There are 35 or more to choose from [seen, Stripe dev digest].
- **Style.** Mostly neutral, with one purple brand accent. Every chart uses the same "now vs before" form, so all the charts read the same way [unverified].
- Source: https://docs.stripe.com/dashboard

### Google Home (2023 redesign, and the 2025 "Ask Home" version)
- **Composition.** The app **opens to Favorites**: devices, actions and automations the person pins, including live camera views [seen, Google blog]. **Spaces** group devices automatically (Lights, Cameras, Climate, Wi-Fi) [seen]. In 2025 there are three tabs (Home, Activity, Automations). An "Ask" bar sits at the top, and Favorites, Devices and categories run as swipeable chips along the top [seen, 9to5Google].
- **Avoiding overload.** Favorites starts empty until the person picks; reordering was added later [seen, Nest Community].
- **Detail.** Tapping a tile turns the device on or off, or opens its full control page [seen].
- Sources: https://blog.google/products-and-platforms/devices/google-nest/google-home-app/ · https://9to5google.com/2025/09/27/google-home-ask-redesign-iphone/

### Apple Weather (the best "hero plus modules" example)
- **Composition.** **Hero**: place name, a very large current temperature, the condition, and the high and low, on an animated sky background. Then the hourly card, which starts with **one plain sentence** ("Rain expected around 4 PM") [sentence pattern unverified], then the 10-day card, then a map. Then smaller modules, two to a row (UV, wind, humidity and so on) [seen, MacRumors/9to5Mac].
- **Adapts to the situation.** If rain is near, the hourly forecast, next-hour rain and radar **move to the top** [seen, 9to5Mac]. Order follows what matters now.
- **Compact charts.** Each day in the 10-day list has a range bar with a dot for the current temperature, so the whole week is read in one row per day [seen].
- **Detail.** Tapping any module opens a detail sheet with an hourly chart [seen].
- **Style.** Cards are frosted panels over the sky. Each card header is a small, quiet line with an icon and caps; the value is large. The colour scale is semantic: temperature from blue to red, UV from green to purple [unverified detail].
- **iPad.** A sidebar of places, shown by default; modules spread into more columns [seen].
- Sources: https://www.macrumors.com/guide/ios-16-weather/ · https://9to5mac.com/2022/10/28/how-to-use-the-weather-app-ipad/

### Education examples
- **Duolingo home (path, 2022).** One vertical path where **the next step is the obvious action**. Units have plain-language headers ("get directions", not "City 3"). Stories, practice and tips moved into the path or into unit guidebooks; challenges and quests moved to their own tab [seen, Duolingo blog]. A floating arrow brings you back to your current spot [seen]. The stated reason: learners asked for "a clear path to follow". Criticism: less freedom to choose [seen]. It won an Apple Design Award in 2023 [seen, press].
- **Khan Academy learner home.** "My courses": up to 9 courses, each showing **which unit to start or resume** and how many skills are done. Then "Resume learning". The menu separates self-chosen courses from work set by a teacher [seen, help centre].
- **Lesson for us.** For a learning product, each child's card should answer "what's next, and how far along are they?", not show a wall of statistics.
- Sources: https://blog.duolingo.com/new-duolingo-home-screen-design/ · https://support.khanacademy.org/hc/en-us/articles/115003342971-How-do-I-modify-My-courses-

---

## 2. Large text and iPad: Apple's rules [seen, HIG]

- **Text sizes** at the default setting (Large), in size/leading in points: Large Title 34/41, Title 1 28/34, Title 2 22/28, Title 3 20/25, Headline 17/22 semibold, Body 17/22, Callout 16/21, Subhead 15/20, Footnote 13/18, Caption 12/16 and 11/13. At the biggest accessibility setting (AX5), Body is 53/62 and Large Title is 60/70. The minimum is 11 pt. Avoid Thin and Light weights.
- **At large sizes**: "use stacked layouts, reduce the number of columns", keep primary items near the top, let rows grow instead of truncating, and **keep the hierarchy** rather than enlarging everything equally.
- **Layout**: put the most important items near the top and leading edge. Group with space, containers or separators. Use progressive disclosure, meaning show a little and reveal more on request. **Decide layout by size class, not device**: the same app gets a sidebar when wide and tabs when narrow, with the same features.
- Sources: https://developer.apple.com/design/human-interface-guidelines/typography · https://developer.apple.com/design/human-interface-guidelines/layout

---

## 3. Trends: what is actually new

**Bento grids.** These are tiles of different sizes in one grid, popularised by Apple's keynote summary slides and product pages; Microsoft's Metro is an earlier relative [seen, SaaSFrame, Webdesigner Depot]. They work only when **tile size follows importance** and each tile holds one idea. The common failure is equal tiles filled with whatever is available. Several articles quote engagement figures, which I could not verify. **Fit:** good for a "this week" overview. Too loose for a "today" working list, which reads better as an ordered list.

**Liquid Glass (Apple, WWDC 2025).** A translucent material for **controls and navigation** (tab bars, sidebars, toolbars) that "floats above the content layer". The HIG says plainly: "**Don't use Liquid Glass in the content layer**", "use … sparingly", and use the clear variant only over photos or video [seen, HIG Materials]. Tab bars shrink on scroll; iPad sidebars refract the content behind them [seen, Apple newsroom]. The appearance changes with Reduce Transparency and Increase Contrast [seen]. **What it means for us:** nothing changes in the content cards. The new parts are a floating, rounded nav layer and content that runs under it. Glass cards would break Apple's own rule and hurt legibility for a large-text reader.

**Material 3 Expressive (Google, 2025).** Bolder use of colour, shape, size, motion and containment. Google cites 46 studies with over 18,000 participants: key elements spotted **up to 4 times faster**; people 45 and over found key elements about as fast as younger users, helped by bigger buttons and high-contrast containers [seen, design.google]. Google's own warnings: it "isn't one-size-fits-all", banking-type products should keep familiar patterns, removing text labels hurt usability, a strong minority prefer calmer designs, and "No amount of expressive design will beat basic functionality" [seen]. **Fit:** use the useful part (one big, high-contrast primary action, clear containers, labelled buttons) and skip the playful shapes.

---

## 4. Composition patterns for a calm, clear "today" dashboard

1. **One hero that answers the first question.** A single large element, not a row of equal stats. *Apple Weather*: the temperature. *Fitness*: the rings. For us: "Today: 3 of 5 lessons done" or the next thing to do.
2. **A one-line plain-language summary above the detail.** A sentence before the chart. *Apple Weather* hourly card ("Rain around 4 PM"); *Health* Highlights ("You climbed more this week").
3. **Order by what matters now, and change it when the situation changes.** *Apple Weather* moves rain to the top when rain is near. For us: a child who is stuck goes first; otherwise the schedule does.
4. **Status chips summarising each area.** One short line per area, opened for detail. *Apple Home* category buttons ("Lights: 2 on"). For us: one chip per child.
5. **Few items, then "Show all".** Three to five items, then a link to the full list. *Health* Highlights, *Fitness* See All Categories, *Notion Home*.
6. **Split the day by time, not by type.** Morning, afternoon and evening on one screen. *Things 3* Today and This Evening; *Fantastical* events before tasks.
7. **A separate, collapsible place for problems.** Late or failed items get their own section that can be folded away. *Todoist* Overdue; *Linear* Priority tab.
8. **Each person's card answers "what's next, and how far along?"** *Khan Academy* My courses (resume unit plus skills done); *Duolingo* next node.
9. **Expand in place for small detail; push a page for deep detail.** *Things 3* to-do card; *Weather* module sheet; *Health* metric page.
10. **A small overview beside the detailed list on iPad.** *Fantastical* mini month plus list; *Weather* and *Home* sidebars. On a narrow screen, the same items stack into one column.
11. **The person chooses, inside a fixed frame.** Let them pin and reorder, but keep the hero fixed. *Fitness* Edit Summary (rings locked); *Stripe* Your overview; *Google Home* Favorites.
12. **Neutral base, colour only for meaning.** One accent for "act here" and a few fixed meaning colours (per child or per subject, plus done and late). *Linear* cut blue; *Fitness* ring colours; *Health* category colours.

## 5. Anti-patterns to avoid

1. **Equal-weight tiles.** A grid of same-sized cards tells the reader nothing is more important, so they must read everything. Size must follow importance (bento rule; Apple HIG "most important items near the top").
2. **Filler widgets.** Modules added to fill a grid ("tip of the day", stat counters nobody acts on). Every block needs a question it answers. Google's playlist study found that looking modern does not beat function.
3. **Numbers without a sentence.** "72%" or a chart without "is this good, and what do I do?" makes a parent work it out. Weather and Health put plain words first.
4. **Decorative glass, gradients or shapes on content.** Apple's HIG forbids Liquid Glass in the content layer. Translucent cards hurt contrast for large-text readers, and colour used for decoration loses its meaning.
5. **Text that truncates or shrinks to fit at large sizes.** Fixed-height cards and multi-column rows that cut words. Apple says to stack, drop columns, let rows grow, and keep the hierarchy instead of scaling everything evenly.
6. *(Bonus)* **Everything visible, nothing hidden.** No "show all", no collapsing, every past item listed. Todoist and Linear both added ways to fold or snooze exactly because late items crowded out today.

---

## Source list
- MacStories, Health iOS 13: https://www.macstories.net/stories/health-in-ios-13-a-foundation-for-apples-grand-wellness-ambitions/
- Apple newsroom, iPadOS 17: https://www.apple.com/newsroom/2023/06/ipados-17-brings-new-levels-of-personalization-and-versatility-to-ipad/
- MacStories, watchOS 11 (Fitness Summary): https://www.macstories.net/stories/watchos-11-the-macstories-review/4/
- MacStories, Home iOS 16: https://www.macstories.net/stories/everything-new-coming-to-the-home-app-in-ios-16-and-macos-ventura/
- MacStories, Things 3: https://www.macstories.net/reviews/things-3-beauty-and-delight-in-a-task-manager/
- Todoist help: https://www.todoist.com/help/articles/use-board-view-in-todoist-AiAVsyEI · https://win.todoist.com/help/articles/whats-new-WV4aRXKsN
- Fantastical help: https://www.flexibits.com/fantastical-ios/help/calendar-views
- Linear: https://linear.app/now/how-we-redesigned-the-linear-ui · https://linear.app/docs/inbox
- Notion: https://www.notion.com/releases/2024-06-11
- Stripe: https://docs.stripe.com/dashboard
- Google Home: https://blog.google/products-and-platforms/devices/google-nest/google-home-app/ · https://9to5google.com/2025/09/27/google-home-ask-redesign-iphone/
- Apple Weather: https://www.macrumors.com/guide/ios-16-weather/ · https://9to5mac.com/2022/10/28/how-to-use-the-weather-app-ipad/
- Duolingo: https://blog.duolingo.com/new-duolingo-home-screen-design/
- Khan Academy: https://support.khanacademy.org/hc/en-us/articles/115003342971-How-do-I-modify-My-courses-
- Apple HIG: typography, layout, materials at https://developer.apple.com/design/human-interface-guidelines/
- Apple newsroom, Liquid Glass: https://www.apple.com/newsroom/2025/06/apple-introduces-a-delightful-and-elegant-new-software-design/
- Google, M3 Expressive research: https://design.google/library/expressive-material-design-google-research
- Bento: https://www.saasframe.io/blog/the-bento-layout-trend · https://webdesignerdepot.com/what-is-the-bento-ui-trend-and-how-can-you-get-started

Not researched: Brilliant (no source fetched). The details of Mobbin and Dribbble galleries need a login or rendered images, so none were used.
