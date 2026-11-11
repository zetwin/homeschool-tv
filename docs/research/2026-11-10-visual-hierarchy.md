# Visual hierarchy: where the eye goes first (2026-11-10)

Research for the parent screens (iPad first, also phone and TV), gathered by a research helper.

**Why:** the owner said the current screens make "my eyes cross in every direction". Nothing tells a parent where to look first. This note turns the best-known sources into rules with numbers that a designer (also an AI) can follow and check on a screenshot.

**About the sources:**
- Read in full: NN/g articles, Apple's guidelines (typography, layout, buttons, color), Android's Material 3 pages, Stephen Few's white paper, W3C's contrast rule, Smashing Magazine, A List Apart, and one Refactoring UI article and one preview page.
- The Refactoring UI book itself is paid. Only its free article and one free preview page were read. Other book rules come from summaries and are marked **(unverified)**.
- The Material 3 website (m3.material.io) did not load. Its type sizes come from Google's own Android code documentation instead.
- Anything we worked out ourselves, and that no source states, is marked **(our rule)**.

---

## 1. What visual hierarchy is

Visual hierarchy means the order in which the eye visits things on a screen. A good screen has a clear order: one thing first, then a few things second, and the rest last. The designer sets this order on purpose, by making some things "heavier" (bigger, darker, more colorful, more alone) and other things "lighter". NN/g defines it as arranging elements so the eye reaches them in order of importance ([NN/g, Visual hierarchy](https://www.nngroup.com/articles/visual-hierarchy-ux-definition/)). When everything is equally loud, the eye has no starting point and jumps around. Stephen Few names this exact failure: "When everything is visually prominent, nothing stands out" ([Few, Common Pitfalls in Dashboard Design, pitfall 10](https://www.perceptualedge.com/articles/Whitepapers/Common_Pitfalls.pdf)).

**Key words, in plain English:**
- **Visual weight:** how strongly something pulls the eye.
- **Emphasis:** making something heavier on purpose.
- **De-emphasis:** making something lighter on purpose, so the important thing stands out more.
- **Accent color:** the one bright brand color, used for the most important thing.
- **Contrast:** how different two things look, for example dark text on a light background.

---

## 2. The levers of visual weight

Visual weight cannot be measured exactly. The levers add up, and they work together ([Smashing Magazine, Steven Bradley, Visual weight and direction](https://www.smashingmagazine.com/2014/12/design-principles-visual-weight-direction/)). These are the ones that matter for app screens.

| Lever | What makes it heavier | How to use it |
|---|---|---|
| **Size** | Bigger | Make the one key item the biggest. Use only 3 sizes of text ([NN/g, 5 principles](https://www.nngroup.com/articles/principles-visual-design/)). Don't use size alone; it makes the main item too big and the rest too small ([Refactoring UI](https://readmedium.com/7-practical-tips-for-cheating-at-design-40c736799886)). |
| **Weight of the font** | Bolder | Two weights only: normal and bold. Bold is cheaper than size for small emphasis ([Refactoring UI](https://readmedium.com/7-practical-tips-for-cheating-at-design-40c736799886); [Apple, Typography](https://developer.apple.com/design/human-interface-guidelines/typography)). |
| **Contrast / value** | Darker on light, or lighter on dark | Main text dark (not pure black). Secondary text grey. Hierarchy comes from contrast with the surroundings, not from the color itself ([NN/g, Visual hierarchy](https://www.nngroup.com/articles/visual-hierarchy-ux-definition/)). |
| **Color saturation** | Brighter, purer color; warm colors (red) heaviest | Keep the screen neutral. Spend bright color only on the one thing that matters, and red only on problems ([Few, pitfall 12](https://www.perceptualedge.com/articles/Whitepapers/Common_Pitfalls.pdf); [Smashing](https://www.smashingmagazine.com/2014/12/design-principles-visual-weight-direction/)). |
| **Isolation (white space)** | Empty space around it | Give the key item room. Empty space around one thing makes it heavier ([Smashing](https://www.smashingmagazine.com/2014/12/design-principles-visual-weight-direction/); [NN/g, Visual hierarchy](https://www.nngroup.com/articles/visual-hierarchy-ux-definition/)). |
| **Density** | Many small things packed together | A packed area pulls the eye even when nothing in it matters. Thin out busy areas that are not the main point ([Smashing](https://www.smashingmagazine.com/2014/12/design-principles-visual-weight-direction/)). |
| **Position** | Top, and the leading side (left in English) | People read top to bottom and from the leading side. Put the most important item at the top leading corner ([Apple, Layout](https://developer.apple.com/design/human-interface-guidelines/layout)). Don't waste it on a logo or menu ([Few, pitfall 9](https://www.perceptualedge.com/articles/Whitepapers/Common_Pitfalls.pdf)). |
| **Containers (boxes, borders, fills)** | A filled box or a strong border | Each box adds weight and noise. Prefer space to show groups ([NN/g, Common region](https://www.nngroup.com/articles/common-region/)). |
| **Pictures and faces** | Photos, strong images, "interesting" things | A strong picture can take over the page even if its story is minor ([NN/g, Visual hierarchy](https://www.nngroup.com/articles/visual-hierarchy-ux-definition/)). Only use a picture where it is the main point. |
| **Being different** | One item unlike its neighbors | A circle among squares stands out ([Smashing](https://www.smashingmagazine.com/2014/12/design-principles-visual-weight-direction/)). Use difference only for the item that should stand out. |

**The main idea from Refactoring UI:** to make one thing stand out, often you should make the other things quieter, not make the main thing louder. Smaller, lighter, or greyer labels let the data come forward ([Refactoring UI, Labels are a last resort](https://www.refactoringui.com/previews/labels-are-a-last-resort)).

---

## 3. Rules with numbers

Each rule says what to do, the number, and the source.

### A. Focus

**Rule 1. One focal point per screen.** Decide the one thing the parent must see first, for example "Anna is behind in math" or "Today: 3 lessons left". Make only that thing the heaviest.
- Few: you should look at a dashboard and have your eyes "immediately drawn to the information that is most important" ([pitfall 10](https://www.perceptualedge.com/articles/Whitepapers/Common_Pitfalls.pdf)).
- NN/g: at most **2 large elements** on a screen ([NN/g, Visual hierarchy](https://www.nngroup.com/articles/visual-hierarchy-ux-definition/)).

**Rule 2. Three levels, not more.** Every item is level 1 (the one focus), level 2 (a few supporting items) or level 3 (everything else, quiet). The number three appears across the sources:
- 3 text sizes: small, medium, large ([NN/g, 5 principles](https://www.nngroup.com/articles/principles-visual-design/)).
- 3 text colors: dark, grey, light grey ([Refactoring UI](https://readmedium.com/7-practical-tips-for-cheating-at-design-40c736799886)).
- 3 button levels: primary, secondary, tertiary ([Refactoring UI](https://readmedium.com/7-practical-tips-for-cheating-at-design-40c736799886)).
- 3 background levels: primary for the view, secondary for groups, tertiary for groups inside groups ([Apple, Color](https://developer.apple.com/design/human-interface-guidelines/color)).
- At most 3 contrast variations in complex designs ([NN/g, Visual hierarchy](https://www.nngroup.com/articles/visual-hierarchy-ux-definition/)).

**Rule 3. Put the focus at the top leading corner** (top left in English). Never put the logo, the menu or settings there. Sources: [Apple, Layout](https://developer.apple.com/design/human-interface-guidelines/layout) ("place the most important items near the top and leading side"); [Few, pitfall 9](https://www.perceptualedge.com/articles/Whitepapers/Common_Pitfalls.pdf) (the top left is "prime real estate").

**Rule 4. Fit the main view on one screen.** A parent should see everything for today without scrolling or switching. People hold only a few things in short-term memory ([Few, pitfall 1](https://www.perceptualedge.com/articles/Whitepapers/Common_Pitfalls.pdf)). NN/g also describes dashboards as single-page, at-a-glance views ([NN/g, Dashboards](https://www.nngroup.com/articles/dashboards-preattentive/)).

### B. Text

**Rule 5. At most 3 text sizes on one screen.** One extra size is allowed for one big number, if that number is the focus **(our rule)**. Source for 3: [NN/g, Visual hierarchy](https://www.nngroup.com/articles/visual-hierarchy-ux-definition/) and [NN/g, 5 principles](https://www.nngroup.com/articles/principles-visual-design/). NN/g's web example: body 14–16 px, subheading 18–22 px, heading up to 32 px.

**Rule 6. Use the platform sizes as the base.** Apple's defaults, at the standard ("Large") text setting ([Apple, Typography](https://developer.apple.com/design/human-interface-guidelines/typography)):

| Apple style (iPhone, iPad) | Size pt | Line height pt | Weight |
|---|---|---|---|
| Large Title | 34 | 41 | Regular |
| Title 1 | 28 | 34 | Regular |
| Title 2 | 22 | 28 | Regular |
| Title 3 | 20 | 25 | Regular |
| Headline | 17 | 22 | Semibold |
| Body | 17 | 22 | Regular |
| Callout | 16 | 21 | Regular |
| Subhead | 15 | 20 | Regular |
| Footnote | 13 | 18 | Regular |
| Caption 1 | 12 | 16 | Regular |
| Caption 2 | 11 | 13 | Regular |

- Default body: **17 pt** on iPhone and iPad. Smallest allowed: **11 pt**.
- TV (Apple TV): body **29 pt**, smallest **23 pt**, titles 76 / 57 / 48 pt, headline 38 pt. Apple TV uses Medium as its normal weight.
- On a web page on iPad, 1 CSS px is about 1 pt, so these numbers can be used as px. On the TV at 1920×1080, Apple's TV sizes map to about the same px **(unverified mapping; Apple states sizes at 72 ppi for @1x)**.

Material 3 sizes, for comparison ([Material Components for Android, Typography](https://github.com/material-components/material-components-android/blob/master/docs/theming/Typography.md)): display 57 / 45 / 36, headline 32 / 28 / 24, title 22 / 16 / 14, body 16 / 14 / 12, label 14 / 12 / 11 (sp, roughly px).

**For our readers (our rule):** one parent reads English as a second language. Use Apple's body 17 pt as the smallest text for anything that must be read. Use 13 pt (Footnote) only for things that can be skipped, like a date stamp. Never go below 13 pt on the parent pad, even though Apple allows 11.

**Rule 7. Make size steps clearly different.** Neighboring levels in Apple's scale differ by about 1.2–1.3 times (17 → 22 → 28 → 34). Sizes closer than that look like a mistake, not a level **(our rule, worked out from Apple's and Material's tables)**. A fixed ratio between sizes is called a "modular scale" ([A List Apart, Tim Brown, More meaningful typography](https://alistapart.com/article/more-meaningful-typography/)). Brown also says the math is only a guide; the eye decides.

**Rule 8. Two font weights only.** Normal (400 or 500) and bold (600 or 700). Never below 400 ([Refactoring UI](https://readmedium.com/7-practical-tips-for-cheating-at-design-40c736799886)). Apple also says to avoid Ultralight, Thin and Light weights, which are hard to see, especially small ([Apple, Typography](https://developer.apple.com/design/human-interface-guidelines/typography)).

**Rule 9. Three text colors only.** Dark (not pure black) for main text, grey for secondary, lighter grey for small extras ([Refactoring UI](https://readmedium.com/7-practical-tips-for-cheating-at-design-40c736799886)). Material's old standard gives the same idea as opacity: high emphasis **87%**, medium **60%**, disabled **38%** black ([Material 2, Text legibility](https://m2.material.io/design/color/text-legibility.html); 87% and 38% confirmed in [Material code docs](https://github.com/material-components/material-components-web/blob/0bfb393407727b9ad5e8de1e8dda6ea6a0ee21fd/packages/mdc-theme/README.md); **60% unverified**, some versions use 54%).

**Rule 10. Every readable text passes contrast.** At least **4.5 : 1** for normal text, **3 : 1** for large text (24 px, or 18.5 px bold) ([W3C, WCAG 1.4.3](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html)). The 7 : 1 level is the stricter AAA level. NN/g warns that greying text to de-emphasize it can hurt reading, so check it ([NN/g, 5 principles](https://www.nngroup.com/articles/principles-visual-design/)). The grey in Rule 9 must still pass 4.5 : 1. Only disabled items may fail.

**Rule 11. Don't put grey text on a colored background.** It looks dirty. Use a lighter or darker shade of the background's own color instead ([Refactoring UI](https://readmedium.com/7-practical-tips-for-cheating-at-design-40c736799886)).

### C. Color and loud elements

**Rule 12. One accent color, spent on the focus and the main action.** Keep everything else neutral. Few: "keep colors subdued and neutral, except when you are using color to highlight something" ([pitfall 12](https://www.perceptualedge.com/articles/Whitepapers/Common_Pitfalls.pdf)). Apple: keep color for "elements that truly benefit from emphasis, such as status indicators or primary actions" ([Apple, Color](https://developer.apple.com/design/human-interface-guidelines/color)). NN/g: in simple designs, use at most **2 main and 2 secondary colors** ([NN/g, Visual hierarchy](https://www.nngroup.com/articles/visual-hierarchy-ux-definition/)).

**Rule 13. Count the loud items: at most 3 per screen (our rule).** A "loud" item is anything with a bright fill, the accent color, red, a big number or a photo. Sources behind the number: at most 2 large elements ([NN/g](https://www.nngroup.com/articles/visual-hierarchy-ux-definition/)), at most 1–2 prominent buttons ([Apple, Buttons](https://developer.apple.com/design/human-interface-guidelines/buttons)), one floating action button per screen ([Material 1, FAB](https://m1.material.io/components/buttons-floating-action-button.html); older Material version, not checked against Material 3).

**Rule 14. Color must mean something, and the same thing every time.** Don't give items different colors just for variety; people look for a meaning that isn't there ([Few, pitfall 12](https://www.perceptualedge.com/articles/Whitepapers/Common_Pitfalls.pdf)). Don't use one color to mean two things ([Apple, Color](https://developer.apple.com/design/human-interface-guidelines/color)). Keep the link or button color for things you can tap ([NN/g, Similarity](https://www.nngroup.com/articles/gestalt-similarity/)).

**Rule 15. Red only for problems.** Bright warm colors like red are best kept for warnings and errors ([NN/g, Visual hierarchy](https://www.nngroup.com/articles/visual-hierarchy-ux-definition/)). Don't make a delete button the main button ([Apple, Buttons](https://developer.apple.com/design/human-interface-guidelines/buttons)).

**Rule 16. Never use color alone.** Add a word or a shape too. About 8% of men and 0.5% of women have some color blindness ([NN/g, Dashboards](https://www.nngroup.com/articles/dashboards-preattentive/)); Few gives 10% and 1% ([pitfall 12](https://www.perceptualedge.com/articles/Whitepapers/Common_Pitfalls.pdf)). Apple says the same ([Apple, Color](https://developer.apple.com/design/human-interface-guidelines/color)).

### D. Buttons and actions

**Rule 17. One or two strong buttons per view.** "Keep the number of prominent buttons to one or two per view" ([Apple, Buttons](https://developer.apple.com/design/human-interface-guidelines/buttons)).

**Rule 18. Three button styles by importance** ([Refactoring UI](https://readmedium.com/7-practical-tips-for-cheating-at-design-40c736799886); [Android, Material 3 buttons](https://developer.android.com/develop/ui/compose/components/button)):
- **Primary:** solid fill in the accent color. "Primary actions should be obvious."
- **Secondary:** outline, or a pale fill.
- **Tertiary:** text only, like a link.
Show the preferred choice by style, not by size. Buttons in a set stay the same size ([Apple, Buttons](https://developer.apple.com/design/human-interface-guidelines/buttons)).

**Rule 19. Touch targets at least 44 × 44 pt** on iPad and phone ([Apple, Buttons](https://developer.apple.com/design/human-interface-guidelines/buttons)).

### E. Grouping and space

**Rule 20. More space between groups than inside them.** Things close together are read as one group, and proximity is strong enough to override color and shape ([NN/g, Proximity](https://www.nngroup.com/articles/gestalt-proximity/)). Practical number **(our rule)**: the gap between groups is at least **2 times** the gap inside a group. A heading sits closer to the text below it than to the text above it; summaries say about twice as much space above as below **(unverified, from Refactoring UI summaries)**.

**Rule 21. Use one spacing scale.** For example 4, 8, 16, 24, 32, 48, 64 px. Don't invent new gaps **(unverified: this scale is from summaries of Refactoring UI, not the book)**.

**Rule 22. Use space first, boxes last.** Borders and boxes added "just in case" make busy, cluttered screens. Space alone is often enough. Ask before each box: is it needed? Could space do it? ([NN/g, Common region](https://www.nngroup.com/articles/common-region/)). Refactoring UI: use fewer borders; try a soft shadow, two slightly different backgrounds, or more space instead ([Refactoring UI](https://readmedium.com/7-practical-tips-for-cheating-at-design-40c736799886)).

**Rule 23. Same job, same look; different job, different look.** Things that look alike are read as related ([NN/g, Similarity](https://www.nngroup.com/articles/gestalt-similarity/)). Don't vary a display just for variety; repeat the same form so the reader learns it once ([Few, pitfall 6](https://www.perceptualedge.com/articles/Whitepapers/Common_Pitfalls.pdf)).

**Rule 24. Line things up.** Aligned items look related and are easier to follow. Indenting shows "this belongs under that" ([Apple, Layout](https://developer.apple.com/design/human-interface-guidelines/layout)). Avoid zigzag layouts (picture left, then right, then left). They make scanning slower ([NN/g, Zigzag layouts](https://www.nngroup.com/articles/zigzag-page-layout/)).

### F. Words and numbers

**Rule 25. Labels are a last resort.** Write "12 left in stock", not "In stock: 12". If a label must stay on a dashboard, make it smaller, lighter or greyer than the value ([Refactoring UI, Labels](https://www.refactoringui.com/previews/labels-are-a-last-resort)). For us: "3 lessons left today", not "Remaining lessons: 3".

**Rule 26. Headings carry the meaning, first words first.** Most people read only headings, then dive into the part they need (the "layer-cake" pattern). Start headings with the most useful words. Bold a few key words ([NN/g, Text scanning patterns](https://www.nngroup.com/articles/text-scanning-patterns-eyetracking/); [NN/g, F-pattern](https://www.nngroup.com/articles/f-shaped-pattern-reading-web-content/)).

**Rule 27. Give each number its context.** A number alone means little. Show it against a goal or last week, plus a quick good / okay / bad sign ([Few, pitfall 2](https://www.perceptualedge.com/articles/Whitepapers/Common_Pitfalls.pdf)). Show only the precision needed: "3.8M", not "3,848,305.93" ([Few, pitfall 3](https://www.perceptualedge.com/articles/Whitepapers/Common_Pitfalls.pdf)).

**Rule 28. Use bars, not circles or dials.** People judge lengths and positions well, and angles and areas badly. Avoid pies, donuts and dial gauges on quick-look screens ([NN/g, Dashboards](https://www.nngroup.com/articles/dashboards-preattentive/); [Few, pitfall 5](https://www.perceptualedge.com/articles/Whitepapers/Common_Pitfalls.pdf)).

**Rule 29. No decoration.** Remove anything that isn't information or an action: ornaments, decorative icons beside numbers, fake 3D. Decoration is content the reader has to look through to reach the data ([Few, pitfall 11](https://www.perceptualedge.com/articles/Whitepapers/Common_Pitfalls.pdf); [NN/g, Complex applications](https://www.nngroup.com/articles/complex-application-design/)). But the screen must still look good: style the data itself attractively ([Few, pitfall 13](https://www.perceptualedge.com/articles/Whitepapers/Common_Pitfalls.pdf)).

### G. TV only

**Rule 30. TV margins and sizes.** Keep main content **60 pt** from the top and bottom and **80 pt** from the sides. Body text 29 pt, never under 23 pt. Leave padding between focusable items, because a focused item grows ([Apple, Layout](https://developer.apple.com/design/human-interface-guidelines/layout); [Apple, Typography](https://developer.apple.com/design/human-interface-guidelines/typography)). Don't show focus by color alone; use scale and motion ([Apple, Color](https://developer.apple.com/design/human-interface-guidelines/color)).

---

## 4. Common mistakes that make "eyes go everywhere"

1. **Everything equally loud.** Same size, same weight, same color, same box for every item. Few calls the result "a wash of sameness" ([pitfall 10](https://www.perceptualedge.com/articles/Whitepapers/Common_Pitfalls.pdf)).
2. **Too many colors.** A different color per card or per child, with no meaning. Too many colors are "visually assaulting" and color stops working as a highlight ([Few, pitfall 12](https://www.perceptualedge.com/articles/Whitepapers/Common_Pitfalls.pdf)).
3. **A box around everything.** Many cards, borders and filled panels. Each one pulls the eye, and together they make noise ([NN/g, Common region](https://www.nngroup.com/articles/common-region/)).
4. **Many strong buttons.** Three or four filled buttons compete. Apple says this increases mental effort ([Apple, Buttons](https://developer.apple.com/design/human-interface-guidelines/buttons)).
5. **Too many text sizes and weights.** Six sizes and three weights make levels that the eye can't sort.
6. **Size doing all the work.** The title is huge and the rest is tiny, instead of using weight and color ([Refactoring UI](https://readmedium.com/7-practical-tips-for-cheating-at-design-40c736799886)).
7. **Labels as loud as values.** "Lessons done:" in the same weight as "3", so the eye reads labels instead of answers ([Refactoring UI, Labels](https://www.refactoringui.com/previews/labels-are-a-last-resort)).
8. **Even spacing everywhere.** The gaps inside a group and between groups are the same, so nothing reads as a group ([NN/g, Proximity](https://www.nngroup.com/articles/gestalt-proximity/)).
9. **Prime spot wasted.** A logo, a greeting or a menu at the top left, and the real news somewhere in the middle ([Few, pitfall 9](https://www.perceptualedge.com/articles/Whitepapers/Common_Pitfalls.pdf)).
10. **An accidental focus.** One photo, emoji or colored badge that is heavier than the real message. NN/g's blur example found exactly this: one strongly colored item became the focus by mistake ([NN/g, Visual hierarchy](https://www.nngroup.com/articles/visual-hierarchy-ux-definition/)).
11. **Variety for its own sake.** Each section uses a different kind of display, so the reader must relearn every block ([Few, pitfall 6](https://www.perceptualedge.com/articles/Whitepapers/Common_Pitfalls.pdf)).
12. **Zigzag layout.** Pictures and text swap sides, so the eye keeps jumping ([NN/g, Zigzag](https://www.nngroup.com/articles/zigzag-page-layout/)).
13. **Decoration.** Ornaments, decorative icons and fake 3D add weight with no meaning ([Few, pitfall 11](https://www.perceptualedge.com/articles/Whitepapers/Common_Pitfalls.pdf)).
14. **Bare numbers.** "73%" with no goal or comparison, so the parent can't tell whether to act ([Few, pitfall 2](https://www.perceptualedge.com/articles/Whitepapers/Common_Pitfalls.pdf)).
15. **The design was made for sample text, not real content.** Real names, long words or a strong photo break the planned order ([NN/g, Visual hierarchy](https://www.nngroup.com/articles/visual-hierarchy-ux-definition/)).

---

## 5. Checklist to run on a screenshot

Run it at iPad size, phone width and TV size (1920×1080). Write the answer to each line, with the count.

**Before looking: write the one thing.**
- [ ] Write in one sentence what the parent must see first on this screen. Without this sentence the screen can't be checked.

**Blur test (squint test).** Blur the screenshot, or squint at it. What still stands out shows the real hierarchy ([NN/g, Squint test](https://www.nngroup.com/videos/squint-test/); [NN/g, Visual hierarchy](https://www.nngroup.com/articles/visual-hierarchy-ux-definition/)). NN/g's example used blurs of 5, 10 and 20 px. The test is simple and not scientific, but it is quick.
- [ ] At **5 px** blur: the groups are clear, and the eye still finds the one thing.
- [ ] At **10 px** blur: the heaviest blob is the one thing. Name the first, second and third blobs.
- [ ] At **20 px** blur: no unplanned blob (a photo, an emoji, a colored badge) is heavier than the one thing.

**Counts (pass if at or under the limit):**
- [ ] Text sizes: **≤ 3**, or 4 if one is a big focus number. (Rules 5, 7)
- [ ] Font weights: **≤ 2**, none below 400. (Rule 8)
- [ ] Text colors (not counting the accent): **≤ 3**. (Rule 9)
- [ ] Large elements: **≤ 2**. (Rule 1)
- [ ] Filled, strong buttons: **≤ 2**, ideally 1. (Rule 17)
- [ ] Loud items in total (bright fill, accent color, red, big number, photo): **≤ 3**. (Rule 13, our rule)
- [ ] Hues used, apart from greys: **≤ 2 main + 2 secondary**. (Rule 12)
- [ ] Boxes, cards and borders: count them. For each one, write why space alone can't do it. (Rule 22)

**Position and order:**
- [ ] The one thing sits in the top half, at the leading (left) side or centered on top. (Rule 3)
- [ ] The top left is not a logo, greeting or menu. (Rule 3)
- [ ] Reading only the headings tells the whole story ("layer-cake" test). (Rule 26)
- [ ] The main view fits on one screen without scrolling. (Rule 4)

**Color:**
- [ ] Grayscale test: make the screenshot black and white. The order stays the same, and every status still has a word or shape. (Rule 16)
- [ ] Red appears only on real problems. (Rule 15)
- [ ] Each color means one thing, the same across the app. (Rule 14)
- [ ] All readable text measures **≥ 4.5 : 1** contrast (large text ≥ 3 : 1). Measure the greys, not only the main text. (Rule 10)

**Space and grouping:**
- [ ] The gap between groups is at least 2 × the gap inside a group. (Rule 20)
- [ ] All gaps come from one spacing scale. (Rule 21)
- [ ] Items line up on a few clear edges; no zigzag. (Rule 24)

**Words and numbers:**
- [ ] No "Label: value" pairs where a phrase would do. Any remaining labels are lighter than their values. (Rule 25)
- [ ] Every number has a comparison or a good / okay / bad sign. (Rule 27)
- [ ] No decoration: every element is information or an action. (Rule 29)

**Sizes on the device:**
- [ ] iPad and phone: readable text ≥ 17 pt, nothing under 13 pt. Touch targets ≥ 44 pt. (Rules 6, 19)
- [ ] TV: body ≥ 29 pt, nothing under 23 pt. Margins 60 pt top and bottom, 80 pt sides. (Rule 30)

**3-second test with a fresh viewer:** show the screen for 3 seconds to someone (or a helper agent) with no background. Ask: "What did you look at first? What should you do?" Pass if the answers match the one-thing sentence.

---

## What we could not verify

- Refactoring UI book chapters beyond the free article and one preview page. The spacing scale (Rule 21) and "space above a heading about twice the space below" (Rule 20) come from summaries only.
- Material 2's 60% for medium-emphasis text. The page did not load; a search result showed it, and some versions use 54%.
- Material 3's own website. Sizes come from Google's Android documentation. How Material 3 ranks its color roles by emphasis was not confirmed on an official page.
- The "one floating button per screen" rule is from Material 1; not checked in Material 3.
- Mapping Apple TV point sizes to px on a 1920×1080 web page.
- "≤ 3 loud items", "gap between groups ≥ 2 ×", "size steps ≥ about 1.2 ×" and "nothing under 13 pt on the parent pad" are our rules, built from the sources above. No source states these numbers.
- Few's white paper is from 2005 and was written for a software company. Its pitfalls are still widely cited. NN/g's dashboard article is from 2017.

## All sources

- NN/g, Visual hierarchy in UX: https://www.nngroup.com/articles/visual-hierarchy-ux-definition/
- NN/g, 5 principles of visual design: https://www.nngroup.com/articles/principles-visual-design/
- NN/g, Text scanning patterns: https://www.nngroup.com/articles/text-scanning-patterns-eyetracking/
- NN/g, F-shaped pattern: https://www.nngroup.com/articles/f-shaped-pattern-reading-web-content/
- NN/g, Zigzag layouts: https://www.nngroup.com/articles/zigzag-page-layout/
- NN/g, Squint test (video): https://www.nngroup.com/videos/squint-test/
- NN/g, Proximity: https://www.nngroup.com/articles/gestalt-proximity/
- NN/g, Similarity: https://www.nngroup.com/articles/gestalt-similarity/
- NN/g, Common region: https://www.nngroup.com/articles/common-region/
- NN/g, Dashboards: https://www.nngroup.com/articles/dashboards-preattentive/
- NN/g, Complex applications: https://www.nngroup.com/articles/complex-application-design/
- Apple, Typography: https://developer.apple.com/design/human-interface-guidelines/typography
- Apple, Layout: https://developer.apple.com/design/human-interface-guidelines/layout
- Apple, Buttons: https://developer.apple.com/design/human-interface-guidelines/buttons
- Apple, Color: https://developer.apple.com/design/human-interface-guidelines/color
- Material 3 type scale (Android docs): https://github.com/material-components/material-components-android/blob/master/docs/theming/Typography.md
- Material 3 color (Android docs): https://github.com/material-components/material-components-android/blob/master/docs/theming/Color.md
- Material 3 buttons (Android): https://developer.android.com/develop/ui/compose/components/button
- Material 2, Text legibility: https://m2.material.io/design/color/text-legibility.html
- Material web theme code (emphasis values): https://github.com/material-components/material-components-web/blob/0bfb393407727b9ad5e8de1e8dda6ea6a0ee21fd/packages/mdc-theme/README.md
- Material 1, Floating action button: https://m1.material.io/components/buttons-floating-action-button.html
- Refactoring UI (Wathan and Schoger), 7 practical tips for cheating at design: https://medium.com/refactoring-ui/7-practical-tips-for-cheating-at-design-40c736799886 (read through a mirror: https://readmedium.com/7-practical-tips-for-cheating-at-design-40c736799886)
- Refactoring UI, Labels are a last resort: https://www.refactoringui.com/previews/labels-are-a-last-resort
- Stephen Few, Common Pitfalls in Dashboard Design (2005): https://www.perceptualedge.com/articles/Whitepapers/Common_Pitfalls.pdf
- W3C, WCAG Contrast (Minimum): https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html
- Smashing Magazine, Steven Bradley, Visual weight and direction: https://www.smashingmagazine.com/2014/12/design-principles-visual-weight-direction/
- A List Apart, Tim Brown, More meaningful typography: https://alistapart.com/article/more-meaningful-typography/
