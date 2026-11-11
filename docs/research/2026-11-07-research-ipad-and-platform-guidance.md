# Platform guidance for navigation and layers (Apple HIG, Material 3, WCAG 2.2)

Researched 2026-11-07, for the parent area: a web app used mostly on iPad (both orientations) and phones, by parents who sometimes use very large text.

**How it was read**
- **Apple HIG:** read in full from Apple's own data files behind each page (`developer.apple.com/tutorials/data/design/human-interface-guidelines/<page>.json`). These hold the same text as the web page. **Verified.**
- **WCAG 2.2:** read directly on w3.org. **Verified.**
- **Material 3:** **m3.material.io could not be opened.** It is a script-only site and returns 404 to fetch tools. Instead I used:
  - Google's Android developer pages, which restate the M3 rules (verified);
  - the official Material token file (verified);
  - search-result extracts of m3.material.io, marked **(unverified)**.

---

## 1. Apple Human Interface Guidelines

**Layout and the iPad**
- Choose the layout by the space available, which Apple calls "size classes" (compact or regular). Don't choose by device or orientation.
- Keep the same features at every size; show more or less of them. "Consider taking advantage of larger spaces to switch from a tab bar to a sidebar."
- Put the most important content top and leading. Use progressive disclosure: disclosure triangles, menus, nested views.
- For text-size changes: "horizontally adjacent views may need to stack vertically", and rows must grow so text isn't cut off.
- On iPad: use the big screen for content, "minimizing modal interfaces and full-screen transitions".
- A full-screen iPad is "regular" width in both orientations. Split View can make it compact.
- Sources:
  - https://developer.apple.com/design/human-interface-guidelines/layout
  - https://developer.apple.com/design/human-interface-guidelines/designing-for-ipados

**Sidebars**
- A sidebar is for moving between main areas, and it "requires a large amount of vertical and horizontal space".
- Show at most two levels. If it goes deeper, use a split view.
- Let people hide it, but don't hide it by default.
- On iPad: "Consider using a tab bar first."
- Use one for many areas or collections (for example, the children). Don't use one on narrow screens.
- Source: https://developer.apple.com/design/human-interface-guidelines/sidebars

**Tab bars, including the iPadOS 18+ tab bar**
- Tabs are "to support navigation, not to provide actions". Actions go in a toolbar.
- Keep the tab bar visible, except under a modal.
- Never hide or disable a tab. If a section is empty, explain why.
- Use one-word labels, avoid "More" overflow, and use badges only for critical items.
- On iPad, the tab bar sits **near the top**. It can be fixed, or have a button that **turns it into a sidebar** (the "sidebar-adaptable" style). It adapts to rotation and window size by itself.
- "Prefer a tab bar for navigation". With customisable tabs, "aim for a default list of five or fewer".
- On iPhone, it floats at the bottom.
- Source: https://developer.apple.com/design/human-interface-guidelines/tab-bars

**Split views**
- A split view shows a list and the selected item side by side, in 2 or 3 panes on iPad.
- Keep the selection highlighted.
- "Prefer using a split view in a regular — not a compact — environment". On phones it collapses into stacked pages.
- Plan for narrow and in-between widths.
- On launch, show the most relevant detail.
- For a small task, use a sheet, not a pane.
- Source: https://developer.apple.com/design/human-interface-guidelines/split-views

**Navigation and search**
- This is only an index page; it has no rules of its own.
- Search can be a tab in the tab bar, or sit in a top or bottom toolbar.
- Sources:
  - https://developer.apple.com/design/human-interface-guidelines/navigation-and-search
  - https://developer.apple.com/design/human-interface-guidelines/search-fields

**Modality**
- Use a modal "only when there's a clear benefit". That means critical information, confirming a recent action, a "narrowly scoped task", or deep focus.
- Keep it "simple, short, and streamlined", and give it a title that names the task.
- No "app within your app".
- Ask before closing if typed work would be lost.
- Show one modal at a time.
- Never use a modal for ordinary navigation.
- Source: https://developer.apple.com/design/human-interface-guidelines/modality

**Sheets: sheet or pushed page, and form, page or full screen**
- Use a sheet for "a scoped task that's closely related to their current context", which people finish before returning.
- Show one sheet at a time, never a sheet on a sheet.
- Put Cancel on the leading side and Done on the trailing side. Done is always paired with Cancel.
- Support swipe-down to close, and ask first if there are unsaved changes.
- On iPhone, a medium (half-height) sheet suits short or progressive content.
- **Push a page** when the person is navigating, for example into a child or a class. "Avoid using a sheet to help people navigate your app's content" (this line is under visionOS, but it matches the modality rules).
- **On iPad**, "prefer using the page or form sheet presentation styles":
  - A **form sheet** is a centred card, smaller than a page sheet. Use it for short forms.
  - A **page sheet** is roughly page-sized.
  - Both leave the page behind partly visible, and both become a bottom sheet on a phone.
- **Full screen** covers everything. Keep it for immersive or very large tasks.
- Sources:
  - https://developer.apple.com/design/human-interface-guidelines/sheets
  - https://developer.apple.com/documentation/uikit/uimodalpresentationstyle/formsheet
  - https://developer.apple.com/documentation/uikit/uimodalpresentationstyle/pagesheet

**Popovers**
- Use a popover for "a small amount of information or functionality", tied to its button.
- Show one at a time, never chained.
- Save work when it closes by itself.
- Never use one for warnings.
- "Avoid displaying popovers in compact views". On a phone, use a sheet.
- Source: https://developer.apple.com/design/human-interface-guidelines/popovers

**Disclosure controls and outline views**
- "Hide details until they're relevant", and label what opens.
- Use at most one disclosure button per view.
- An outline view is an expandable list. The hierarchy goes in the first column only, and it should remember what is open. Use a plain table when the data has no levels.
- Sources:
  - https://developer.apple.com/design/human-interface-guidelines/disclosure-controls
  - https://developer.apple.com/design/human-interface-guidelines/outline-views

**Lists and tables**
- Prefer lists for text.
- Keep the row that drives a detail pane highlighted, and use checkmarks for chosen options.
- Keep rows short, with clear column headings. Sorting by column and resizable columns are recommended (stated on the macOS part of the page).
- A chevron means "drill in"; the (i) button is only for extra information.
- Source: https://developer.apple.com/design/human-interface-guidelines/lists-and-tables

**Menus and pull-down buttons**
- **Menus:**
  - Start labels with a verb.
  - Put the most-used items first and group related ones.
  - Keep submenus to one level of about five items.
  - Show the menu "near the content it controls".
- **Pull-down buttons:**
  - Use one for related commands (Add ▸ what, Sort ▸ by what), with at least three items.
  - Don't hide a view's main actions in it.
  - Destructive items are red and are confirmed afterwards (a popover on iPad).
  - To pick one value, use a pop-up button instead.
- Sources:
  - https://developer.apple.com/design/human-interface-guidelines/menus
  - https://developer.apple.com/design/human-interface-guidelines/pull-down-buttons

**Alerts and action sheets (for "delete")**
- Avoid alerts for "common, undoable actions, even when they're destructive".
- Do use an alert for an "uncommon destructive action that they can't undo".
- Buttons are specific verbs ("Delete", not "OK"), plus "Cancel".
- Action sheets offer choices tied to an action the person started. Use at most 4 buttons, with the destructive one on top.
- Sources:
  - https://developer.apple.com/design/human-interface-guidelines/alerts
  - https://developer.apple.com/design/human-interface-guidelines/action-sheets

**Typography and Dynamic Type**
- On iOS and iPadOS, the default text size is **17 pt** and the minimum is **11 pt**. Avoid Light and Thin weights.
- Default text styles:

  | Style | Size |
  |---|---|
  | Large Title | 34 |
  | Title 1 | 28 |
  | Title 2 | 22 |
  | Title 3 | 20 |
  | Headline | 17 semibold |
  | Body | 17 |
  | Callout | 16 |
  | Subhead | 15 |
  | Footnote | 13 |
  | Caption | 12 or 11 |

- Body text grows to 23 pt at the largest normal size, and to **53 pt at the largest accessibility size (AX5)**, about 3 times bigger.
- Large Title only grows from 34 to 60 pt. So at big sizes, the hierarchy must come from weight and position, not size.
- At accessibility sizes, the page asks:
  - "Keep text truncation to a minimum".
  - Use "a stacked layout where text appears above secondary items".
  - "Reduce the number of columns".
  - Keep primary elements at the top.
  - Grow meaningful icons with the text.
  - "Prioritize important content". Tab labels, for example, needn't grow.
- **Web note (partly verified):** Safari on iPhone and iPad can follow the system text size through `font: -apple-system-body`. This is documented in an older WebKit post, and current behaviour has not been checked. https://webkit.org/blog/3709/using-the-system-font-in-web-content/
- Source: https://developer.apple.com/design/human-interface-guidelines/typography

**Accessibility**
- Allow text to be enlarged by "at least 200 percent", "through custom UI, or by adopting Dynamic Type".
- Contrast: Apple uses the WCAG AA values (4.5:1, or 3:1 for 18 pt and up or bold). Check both light and dark.
- Controls should be **44×44 pt**, with an absolute minimum of 28×28.
- Leave about 12 pt of space around controls with a border, and about 24 pt around borderless ones.
- Every gesture needs a button alternative.
- Source: https://developer.apple.com/design/human-interface-guidelines/accessibility

**Color and dark mode**
- Never use colour alone to carry meaning, and use one colour for one meaning.
- Test in light, dark and Increase Contrast.
- "Avoid offering an app-specific appearance setting". Follow the system.
- In dark mode, layers on top (sheets, popovers) use a lighter "elevated" background.
- Sources:
  - https://developer.apple.com/design/human-interface-guidelines/color
  - https://developer.apple.com/design/human-interface-guidelines/dark-mode

**Settings**
- The settings area holds "general, infrequently changed settings" and account options. Keep them few, with good defaults.
- Options for one task ("showing or hiding parts of the current view… filtering a list") belong on that screen.
- Don't copy system settings such as accessibility or appearance.
- Source: https://developer.apple.com/design/human-interface-guidelines/settings

**Touch targets**
- Use a tap area of at least **44×44 pt**.
- Use full-width main buttons on a phone.
- Mark the preferred choice by style, not size.
- Source: https://developer.apple.com/design/human-interface-guidelines/buttons

---

## 2. Material 3

**Adaptive design and window size classes**
- Choose the layout by the window's width, never by asking "is it a tablet?".

  | Width class | Width | Typical use |
  |---|---|---|
  | Compact | under 600 dp | 99.96% of phones in portrait |
  | Medium | 600 to 839 dp | 93.7% of tablets in portrait |
  | Expanded | 840 to 1199 dp | 97.2% of tablets in landscape |
  | Large | 1200 to 1599 dp | large tablets |
  | Extra-large | 1600 dp and up | desktop |

- Compact height (under 480 dp, a phone in landscape) makes two panes impractical.
- Design for expanded first, then decide what to do at medium.
- Applied to our iPads: an 11-inch iPad is about 834 pt in portrait (**medium**) and about 1194 pt in landscape (**expanded**). These widths are from my own knowledge, not from these pages.
- Sources:
  - https://developer.android.com/develop/ui/compose/layouts/adaptive/use-window-size-classes
  - https://m3.material.io/foundations/layout/applying-layout/window-size-classes (could not open)

**Canonical layouts**
- **List-detail:**
  - At expanded width, the list and the detail sit side by side.
  - At medium or compact width, it shows one at a time, and Back returns to the list.
  - On rotation, it keeps the pane the person was looking at.
- **Supporting pane:**
  - The main content plus a helper that only makes sense next to it.
  - At expanded width, split 70/30. At medium width, split 50/50.
  - At compact width, move the helper below the content or into a bottom sheet.
- **Feed:** a grid of similar cards that drops to one column on narrow screens.
- Sources:
  - https://developer.android.com/develop/ui/compose/layouts/adaptive/canonical-layouts
  - https://m3.material.io/foundations/layout/canonical-layouts/overview (could not open)

**Navigation bar, rail or drawer**
- Google's default: a **navigation bar** when width *or height* is compact, and a **navigation rail** otherwise. A rail is "easier to reach while holding the left and right sides of the device".
- A navigation bar holds 3 to 5 destinations. A rail holds up to 7.
- The 2025 Material update **deprecates the navigation drawer** in favour of the "expanded navigation rail".
- Sources:
  - https://developer.android.com/develop/ui/compose/layouts/adaptive/build-adaptive-navigation
  - https://github.com/material-components/material-components-android/blob/master/docs/components/NavigationDrawer.md
  - https://github.com/material-components/material-components-android/blob/master/docs/components/BottomNavigation.md

**Bottom sheets versus dialogs**
- Use dialogs for confirming "such as when deleting a file", asking for input, or picking options.
- M3 calls dialogs "purposefully interruptive", to be used sparingly. Full-screen dialogs are for compact screens only; use a basic dialog at medium and expanded. **(Unverified.)**
- Bottom sheets hold secondary content on the bottom edge. Modal ones sit over a dimmed layer.
- On larger screens, bottom sheets get a maximum width, and at expanded width a side sheet can replace them. **(Unverified.)**
- Sources:
  - https://developer.android.com/develop/ui/compose/components/dialog
  - https://github.com/material-components/material-components-android/blob/master/docs/components/BottomSheet.md
  - https://m3.material.io/components/bottom-sheets/guidelines (could not open)
  - https://m3.material.io/components/dialogs/guidelines (could not open)

**Cards**
- Cards hold "content and actions about a single subject". There are three kinds: elevated, filled and outlined.
- Don't force content into cards when spacing, headings or dividers would be simpler. **(Unverified.)**
- Source: https://github.com/material-components/material-components-android/blob/master/docs/components/Card.md

**Type scale (size / line height, px)**

| Group | Large | Medium | Small |
|---|---|---|---|
| Display | 57/64 | 45/52 | 36/44 |
| Headline | 32/40 | 28/36 | 24/32 |
| Title | 22/28 | 16/24 | 14/20 |
| Body | 16/24 | 14/20 | 12/16 |
| Label | 14/20 | 12/16 | 11/16 |

- Source: https://github.com/material-foundation/material-tokens/blob/json/json/typescale.json

---

## 3. WCAG 2.2

**1.4.4 Resize Text (AA)**
- Text can be resized "up to 200 percent without loss of content or functionality".
- "No loss" means text, images and controls are not "clipped, truncated or obscured" (failure F69).
- Cutting text off is allowed only if the full text opens on focus or tap, and there is a visible sign that more exists.
- Browser zoom counts as the way to resize, so never block it.
- Source: https://www.w3.org/WAI/WCAG22/Understanding/resize-text.html

**1.4.10 Reflow (AA)**
- At **320 CSS px wide** (a 1280 px screen at 400% zoom), nothing may be lost and nothing may need two-way scrolling.
- Data tables are an exception, but not their cells, and not the headings, search or paging around them.
- Moving content is fine. Content that vanishes fails (failure F102).
- Source: https://www.w3.org/WAI/WCAG22/Understanding/reflow.html

**1.4.3 and 1.4.11 Contrast (AA)**
- Text needs 4.5:1. Large text needs 3:1; "large" means 18 pt (about 24 px) or 14 pt bold (about 18.7 px). This includes placeholder, hover and focus text.
- Non-text items need 3:1 against neighbouring colours. That covers:
  - input borders, when nothing else shows the field;
  - focus rings;
  - meaningful icons;
  - chart parts;
  - selected and checked marks.
- Disabled controls are exempt. Ratios are not rounded: 2.999 fails.
- Sources:
  - https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html
  - https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html

**2.5.8 Target Size (Minimum) (AA)**
- Targets are at least **24×24 CSS px**. Smaller ones pass only if a 24 px circle on each one touches no other target or circle.
- Other exceptions: an equivalent control elsewhere on the page, a link inside a sentence, a browser default, or a size that is essential.
- The stricter level, 2.5.5 (AAA), asks for **44×44**, which matches Apple.
- Source: https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html

**1.4.12 Text Spacing (AA)**
- Nothing may be lost when a user sets all four of these:
  - line height 1.5×;
  - space after paragraphs 2×;
  - letter spacing 0.12×;
  - word spacing 0.16×.
- Clipping and overlap fail (failure F104).
- Size text boxes in `em`, not with fixed px heights.
- Source: https://www.w3.org/WAI/WCAG22/Understanding/text-spacing.html

**What this means for a "fits one screen" design (my conclusion from the rules above)**
- A *fixed* one-screen layout fails 1.4.4, 1.4.10 and 1.4.12 as soon as text is enlarged. That covers fixed heights, `overflow:hidden`, and text shrunk to fit.
- "Fits one screen" can only be the goal at **default** text size.
- At large text sizes, the page must grow and scroll **vertically**, and columns must stack. Apple asks the same for AX sizes.
- Only a true data grid, like the gradebook, may scroll in two directions. Its filters and headers must still reflow.
- Never cut off names, marks or labels without a way to read them in full.

---

## 4. Decision table for the parent area

Phone = compact (under 600). iPad portrait = medium (about 744 to 834). iPad landscape = expanded (about 1024 to 1376).

| Need | Pattern | Phone / iPad portrait / iPad landscape | Why |
|---|---|---|---|
| **Home dashboard** | A top-level page in a **tab bar** of 5 or fewer tabs (top on iPad, bottom on phone). The page is a **feed** of single-subject cards: one per child, plus today. | 1 column / 2 columns / 2 to 3 columns. The tab bar may turn into a sidebar on iPad. | Apple: "prefer a tab bar", five or fewer. M3: navigation bar at compact, and the feed drops columns. Each card is one subject. |
| **One child's detail** | **Push a page.** In landscape, use **list-detail**: children on the left, the selected child highlighted. | Pushed page with Back / pushed page / split | Apple: a sheet is not for navigating, and split views need regular width. M3: list-detail shows both panes only at expanded. |
| **A class's detail (give a mark, set homework)** | A pushed class page laid out as a **supporting pane** (class plus a task panel). Each small task ("give a mark") opens in a **form sheet** on iPad or a **bottom sheet** on phone, with Cancel and Done. | Page, then a bottom sheet / page with the panel below or a sheet / 70:30 panes | M3: supporting pane at 70/30 and 50/50, or a sheet at compact. Apple: a sheet for a "scoped task", one at a time, Done with Cancel. |
| **Settings / Admin (separate page)** | A **separate area** reached from a profile or Admin entry, *not* a main tab. Inside, a grouped **list**, then sub-pages. | List, then pages / list, then pages / two-pane like iOS Settings | Apple: settings are for "infrequently changed" and account options, kept few. Task options stay on their own screen. |
| **Choosing text size** | **Follow the system first.** Use rem/em units, never block zoom, and use `-apple-system-body` on Apple devices. An in-app size choice (such as A / A+ / A++) is a small control in Settings or on the screen it affects. No in-app dark-mode switch. | Same everywhere | Apple: respect system settings, and allow at least 200% via Dynamic Type *or* your own control. WCAG 1.4.4: zoom must work. |
| **Confirming a delete** | **Undo instead of asking**, for common deletes: do it, then show "Undo". For rare, permanent deletes, use an **alert** with a specific verb ("Delete Mia's mark") and Cancel. A red menu item, then a confirm step. | Alert or action sheet / alert, or a popover from the button / same | Apple: no alert for "common, undoable" actions, an alert for permanent ones, no "OK". Destructive menu items need confirming. M3: use a dialog to confirm a delete. |
| **A long list, like the gradebook** | A **table** with sticky headers and a sticky first column, sorted by tapping a header. Filters sit above it on the same page. On a phone, switch to **one child or one subject at a time**. | List, then detail / table scrolling in its frame / full table | WCAG Reflow: tables are an exception, but filters and headers must reflow. Apple: clear headings, sorting, and filters on the screen they affect. |
| **A quick choice, like "no school today"** | A **popover** on iPad or a **medium-height bottom sheet** on phone, anchored to the day, with 2 or 3 buttons. Or just a switch on the day card. Make it undoable instead of confirming. | Bottom sheet / popover / popover | Apple: popovers for small choices but not at compact width, and no alerts for undoable actions. A medium-height sheet suits short choices. |

**For every row:**
- Tap targets are at least **44×44 px**. This meets Apple and is far above WCAG's 24.
- Text contrast is 4.5:1; borders, icons and focus rings are 3:1, in light and dark.
- Only one layer at a time: never a sheet on a sheet, or a popover on a popover.
- At large text, columns stack, pages scroll vertically, and nothing is cut off.
