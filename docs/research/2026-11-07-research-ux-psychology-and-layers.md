# UX psychology, layers of interaction and calm UI, for the parent dashboard

Research date: 2026-11-07. The reader is a parent on an iPad, sometimes with weak eyesight. The goal is a screen that is "simple and not overloaded", with depth reached through layers.

Sources are linked inline. **Verified** means the page was opened and read for this note. **Unverified** means it comes from search summaries, third-party copies or memory. Those claims are marked.

---

## 1. Progressive disclosure and staged disclosure

**Progressive disclosure** (NN/g, verified): https://www.nngroup.com/articles/progressive-disclosure/
- **First layer:** only the few options that most people need most of the time. NN/g: "Initially, show users only a few of the most important options." The first layer must not hold anything confusing.
- **Second layer:** specialised or rarely used options, shown on request. People can finish their task without opening it.
- **How many levels:** two. NN/g warns that "designs that go beyond 2 disclosure levels typically have low usability." If you need a third, simplify first.
- **Pitfalls:** a first layer that is still crowded; an unclear way into layer two (the control must say what is behind it); several entry points to the same hidden content.

**Staged disclosure** is a step-by-step sequence, like a wizard. Most people pass through every step. It works only when the steps barely depend on one another. If people must go back and forth between steps, it fails (same article).

**Apple** (verified): "Place controls that people are most likely to use at the top of the disclosure hierarchy", with advanced features hidden by default, and "use no more than one disclosure button in a single view". https://developer.apple.com/design/human-interface-guidelines/disclosure-controls

**For our dashboard:** layer 1 answers the parent's daily questions (who did what today, what needs me). Layer 2 holds the details (scores per question, history, settings). There is no layer 3. Anything deeper becomes its own page.

---

## 2. Layers of interaction: when to use each

| Layer | Use when | Avoid when | Source |
|---|---|---|---|
| **In-place expansion** (accordion, disclosure) | Only a few sections matter to a given person; content is loosely related; the page is very long | People need most of the content (then "relevance trumps page length"); content everyone must see | NN/g https://www.nngroup.com/articles/accordions-complex-content/ (verified); GOV.UK https://design-system.service.gov.uk/components/accordion/ (verified) |
| **Tabs / segmented control** | Distinct groups of the same object or view; people don't need to compare across them | Groupings aren't distinct; people must compare across tabs, which strains memory | NN/g https://www.nngroup.com/articles/tabs-used-right/ (verified) |
| **Dropdowns, menus** | Choosing one value from a known list; saving space | Few options (show them instead); long lists that need scrolling; menus whose options change based on another menu | NN/g https://www.nngroup.com/articles/drop-down-menus/ (verified) |
| **Popover** (iPad) | A small amount of information or functionality, needed briefly | Warnings (people miss them, so use an alert); cascades of popovers | Apple https://developer.apple.com/design/human-interface-guidelines/popovers (verified) |
| **Modal dialog** | Preventing a disaster (unsaved work, deleting); missing information needed to go on | Non-essential requests; complex decisions where the modal hides what you need to decide | NN/g https://www.nngroup.com/articles/modal-nonmodal-dialog/ (verified) |
| **Sheet** (non-modal or modal) | A scoped task tied to the current context, done before returning | Long or complex flows (use a full page); stacked sheets; ordinary page-to-page navigation | Apple https://developer.apple.com/design/human-interface-guidelines/sheets (verified); NN/g https://www.nngroup.com/articles/bottom-sheet/ (verified) |
| **Full page** | Multi-step or long tasks; content people read for some time; anything worth a Back button | Quick one-field edits | Apple sheets page (above) |

### Key details
- **Accordions:** let several sections stay open at once, and remember what is open (NN/g). Never nest accordions, and never disable a section. Remove it or explain why it's empty (GOV.UK). GOV.UK suggests the smaller **Details** component for one or two short, less important pieces of content.
- **Tabs:** "The fewer tabs, the better." Use one- or two-word plain labels, never all caps (NN/g). Apple: segmented controls should have "no more than about five to seven segments in a wide interface", noun labels, and text or icons but not both. Use them for related views, and a tab bar for separate app sections. https://developer.apple.com/design/human-interface-guidelines/segmented-controls (verified)
- **Modals:** NN/g's bottom line is "if you must, make sure it's worth the cost." On iPad, Apple prefers form or page sheets, one at a time: "Display only one sheet at a time." Done is always paired with Cancel, and unsaved changes are confirmed on swipe-dismiss.
- **Bottom sheets:** always include a visible close button (the grabber is easy to miss), support Back, and don't stack them (NN/g).
- **Popovers:** "Always save work when automatically closing a nonmodal popover" (Apple).

### Scroll inside a section versus page scroll
- **Baymard** (verified, 2014 study): https://baymard.com/blog/inline-scroll-areas. "Scrolling within scrolling is simply not an easy concept to grasp." Problems seen in testing:
  - Inner scroll areas move the "no overview" problem from the page to the section.
  - They hijack page scrolling.
  - On iOS the scrollbars are hidden, so people don't see that content is cut off, and some left believing the options didn't exist.
  - Baymard's advice: use them "very sparingly, if at all".
- **What to do instead:** show a visibly truncated list ("5 of 12") plus a link to the rest. Baymard found that truncation "performed rather well" when it was clearly marked. Separate, non-nested panes, such as a sidebar beside the content, don't have the problem.
- **Page length:** NN/g found 57% of viewing time above the fold, and 74% within the first two screenfuls (2018). Avoid "false floors" that look like the end of the page. https://www.nngroup.com/articles/scrolling-and-attention/ (verified)
- No NN/g article dedicated to nested scrolling was found. Baymard is the primary source here.

### "See all" links
- Name what is behind the link. NN/g's homepage guidelines: no generic "More…"; "tell users specifically what they will get more of." People mostly read the first two words of a link, so put the key word first. https://www.nngroup.com/articles/better-link-labels/, https://www.nngroup.com/articles/learn-more-links/ (search summaries, not opened: **unverified wording**)
- Example: "All 12 math results" rather than "See all".

### Hover versus touch (iPad)
- Hover tooltips "are not normally available on touchscreens"; the touch alternative is a tap-to-open "popup tip" behind an ⓘ icon. https://www.nngroup.com/articles/tooltip-guidelines/ (search summary)
- NN/g's tablet report: avoid "hover states, right button clicks". https://media.nngroup.com/media/reports/free/Tablet_Website_and_Application_UX.pdf (search summary)
- Icons need visible text labels: "a word is worth a thousand pictures." Hover-only labels fail on touch. https://www.nngroup.com/articles/icon-usability/ (verified)

---

## 3. Psychology laws, each with one dashboard application

| Principle | What it says | Apply to the parent dashboard |
|---|---|---|
| **Cognitive load** (https://www.nngroup.com/articles/minimize-cognitive-load/, verified) | Mental effort to use the system. Cut clutter, reuse known patterns, offload remembering and deciding | Show "Ada: 2 of 3 lessons done", not raw logs. Pre-select today and the current child |
| **Hick's law** (https://lawsofux.com/hicks-law/, verified) | More and harder choices mean slower decisions. Highlight a recommended option, but don't oversimplify | One main action per card ("Review Ada's test"); secondary actions go in a "More" menu |
| **Miller's law, and its misuse** (https://lawsofux.com/millers-law/, https://www.nngroup.com/articles/chunking/, verified) | About 7±2 items in working memory. Laws of UX warns against using the number to impose limits. NN/g: menus rely on recognition, so they need not stop at 7. Cowan (2001, *Behavioral and Brain Sciences* 24:87–114) puts working memory nearer **4 chunks** (**not opened; from memory**) | Don't cap a menu at 7. Do chunk: group the settings list into 3–4 labelled groups. Keep the first-glance summary to about 3–4 numbers |
| **Fitts's law** (https://lawsofux.com/fittss-law/, verified) | Big, near targets are faster. Small and far targets cause errors | Use 44×44 pt minimum targets (Apple) and space between them. Put "Approve" next to the item it approves, not in a far corner |
| **Jakob's law** (https://lawsofux.com/jakobs-law/, verified) | People expect your app to work like the others they use | Use iPad conventions: sheet with Cancel/Done, swipe to dismiss, a tab bar or sidebar for sections |
| **Aesthetic-usability effect** (https://lawsofux.com/aesthetic-usability-effect/, verified; Kurosu & Kashimura 1995, 252 participants) | Attractive designs are judged easier to use, and beauty can hide usability problems in testing | Craft matters for trust, but test with real tasks, not just "do you like it?" |
| **Von Restorff (isolation) effect** (https://lawsofux.com/von-restorff-effect/, verified) | The odd one out is remembered. Use restraint, and don't rely on colour alone | Exactly one highlighted item per screen, such as "Needs you: 1 test to check", with an icon plus words, not just red |
| **Serial position effect** (https://lawsofux.com/serial-position-effect/, verified) | First and last items are remembered best | Put "Today" first and "Settings / Account" last; less important items go in the middle |
| **Chunking** (NN/g chunking, verified) | Split content into meaningful units | One card per child; inside it, the lessons, tests and homework strips |
| **Proximity** (https://www.nngroup.com/articles/gestalt-proximity/, verified) | Near means related. Spacing inside a group must be smaller than spacing between groups. Recheck groups when the layout stacks | Keep a child's name close to their numbers, with a big gap before the next child |
| **Similarity** (Gestalt; NN/g dashboards article notes similar shapes read as related) | Things that look alike seem alike | Every subject chip has the same shape; every "needs you" item has the same treatment |
| **Common region** (https://lawsofux.com/law-of-common-region/, verified) | A border or background groups items | A soft card background per child, or per day, instead of extra lines and labels |

---

## 4. Visual hierarchy, scanning and dashboards

- **Hierarchy tools** (NN/g, verified, https://www.nngroup.com/articles/visual-hierarchy-ux-definition/): scale, colour and contrast, and grouping. "Use no more than 3 sizes", and at most two large elements. Bright, saturated colour is reserved for key items. **Position** (top-left first in left-to-right languages) comes from the scanning research below.
- **Scanning:**
  - **F-pattern:** the default when nothing guides the eye. People miss things without knowing it. https://www.nngroup.com/articles/f-shaped-pattern-reading-web-content/ (verified)
  - **Layer-cake:** eyes jump between headings, and it is "by far the most effective way to scan pages", but only if headings are meaningful. https://www.nngroup.com/articles/layer-cake-pattern-scanning/ (verified)
  - **For us:** every block gets a heading that says the answer ("Ada finished today"), not a category ("Progress"). The first two words carry the meaning.
- **Dashboards** (NN/g, verified, https://www.nngroup.com/articles/dashboards-preattentive/):
  - Built for a glance, with "a minimum of interaction or cognitive processing", not for exploring.
  - Use length and position (bars) for amounts. Colour is for categories and is a secondary cue, never for magnitude.
  - Avoid pies, donuts, radial gauges and 3D; prefer simple bars or bullet bars.
- **Stephen Few** (book *Information Dashboard Design*, quoted in search results, **not opened**): a dashboard is the most important information "arranged on a single screen so the information can be monitored at a glance."
- **How many numbers:** no authoritative source gives a number. A "5–9 metrics" figure seen online comes from a vendor blog (**unverified**). Working-memory research (Cowan, about 4) and NN/g's "at most two large elements" suggest **about 3–4 headline facts on the first layer**. This is an inference, not a published rule.

---

## 5. Calm technology and "calm UI"

Amber Case's eight principles (verified, https://calmtech.com/), built on Weiser & Brown, *Designing Calm Technology* (Xerox PARC, 1995, https://calmtech.com/papers/designing-calm-technology):
1. Require the smallest possible amount of attention.
2. Inform and create calm.
3. Make use of the periphery.
4. Amplify the best of technology and the best of humanity.
5. Communicate without needing to speak.
6. Work even when it fails.
7. Use the minimum technology needed to solve the problem.
8. Respect social norms.

Weiser & Brown add that calm technology moves easily from the edge of attention to the centre and back (from search summaries).

**In practice, for a parent app** (our interpretation):
- **Quiet by default:** a calm "All on track" state, and nothing blinking.
- **Status as ambient signals** (a small coloured dot plus a word) rather than pop-ups or badges with counts.
- **One clear interruption type,** only for things that truly need the parent, such as a test to check or a lesson the child is stuck on.
- **No streak pressure, red numbers or alarm language.**
- **Degrade gracefully:** if the data can't load, say what's known and when it was last updated (principle 6).

---

## 6. Accessibility for low vision

- **Text size:** iPadOS default body is 17 pt and the minimum is 11 pt. "In general, avoid light font weights." Support Dynamic Type up to the accessibility sizes. https://developer.apple.com/design/human-interface-guidelines/typography (verified)
- **No truncation:** Apple says to "keep text truncation to a minimum as font size increases", wrap labels, and switch to stacked layouts and fewer columns as text grows. WCAG 1.4.12 allows an ellipsis only if the full text can be reached. https://www.w3.org/WAI/WCAG22/Understanding/text-spacing.html (verified)
- **Spacing:** the layout must survive user spacing of line height 1.5×, paragraph spacing 2×, letter spacing 0.12× and word spacing 0.16× (WCAG 1.4.12, verified).
- **Reflow:** content must work at 320 CSS px wide (about 400% zoom) without sideways scrolling (WCAG 1.4.10, AA). https://www.w3.org/WAI/WCAG22/Understanding/reflow.html (verified)
- **Contrast:**
  - Text needs 4.5:1, and large text 3:1 (WCAG 1.4.3 AA). AAA is 7:1 (1.4.6).
  - Icons and control borders need 3:1 (1.4.11).
  - These are the standard WCAG values. The W3C pages weren't opened this session, but the figures are well established.
- **Targets:** 44×44 pt (Apple, verified on the Buttons page). WCAG 2.5.8 AA asks for at least 24×24 CSS px, and 2.5.5 (AAA) for 44×44 (verified). https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html
- **Not colour alone:** WCAG 1.4.1, and W3C low-vision needs §3.1.3: "Color is not the only visual means of conveying information." https://www.w3.org/TR/low-vision-needs/ (verified, draft)
- **W3C low-vision needs** also lists:
  - text size changeable "without zooming the entire interface"
  - single-column reflow
  - all elements still visible when text grows
- **Dark mode:** see section 7.

---

## 7. Trends, 2024–2026: useful or fad?

| Trend | Verdict for us | Evidence |
|---|---|---|
| **Bento grids** (cards of different sizes in one grid) | **Useful if the sizes mean something:** the biggest tile is the most important thing. A fad if the sizes are random. They must collapse to one column, with a logical reading order | No NN/g or Baymard research found; the sources are vendor blogs (e.g. https://www.freecodecamp.org/news/bento-grids-in-web-design/). **Benefits unverified**. Supported indirectly by common region and hierarchy |
| **Big type** | **Useful,** and it suits low vision. Keep within three sizes | NN/g's 3-size rule; Apple's 17 pt default; Material 3 Expressive's emphasis on larger type (press coverage, unverified detail) |
| **Soft depth, glass (Apple Liquid Glass)** | **Use sparingly, and only for floating controls, never behind text** | Apple: "Don't use Liquid Glass in the content layer"; "Use Liquid Glass effects sparingly"; regular glass for text-heavy parts; clear glass only over rich media. https://developer.apple.com/design/human-interface-guidelines/materials (verified). Press reports of a legibility backlash and Apple adding a "Tinted" option in iOS 26.1 (https://www.macrumors.com/2025/09/17/ios-26-liquid-glass-critiques/, **press, unverified detail**). Must respect Reduce Transparency |
| **Material 3 Expressive** (bolder shapes, colour, size, springy motion) | **The research idea is useful:** emphasis by size, colour and shape helps people find the key control. The look itself is Android-flavoured, so borrow the principle, not the style | Google Research, CHI '26: 48 participants, 10 apps; correct element fixated 33% faster and tasks done 20% faster than with the previous Material. https://research.google/pubs/usability-hasnt-peaked-exploring-how-expressive-design-overcomes-the-usability-plateau/ (verified abstract). The widely quoted "4× faster" figure comes from launch press (https://www.dezeen.com/2025/05/28/google-ushers-in-age-of-expressive-interfaces-with-material-design-update/) and is **unverified** |
| **Dark mode** | **Offer it; don't make it the default.** Follow the iPad setting | NN/g: light mode performs better for most people, including older adults. Some low-vision users (e.g. with cataracts) read better in dark mode. Offer a switch and use the OS setting. https://www.nngroup.com/articles/dark-mode/ (verified) |
| **Micro-interactions and motion** | **Useful when short and functional** | NN/g: about 100 ms for small feedback, 200–300 ms for bigger changes such as a sheet opening, 400 ms maximum; past 500 ms it "feels like a drag"; ease-out by default; never linear; exits a bit faster than entrances. https://www.nngroup.com/articles/animation-duration/ (verified). Apple: "Don't add motion for the sake of adding motion"; avoid motion on frequent interactions; "Make motion optional"; let people cancel. https://developer.apple.com/design/human-interface-guidelines/motion (verified) |

**Motion details:**
- Honour `prefers-reduced-motion` (the CSS media query) and the iPad Reduce Motion setting by replacing slides and zooms with fades (Apple accessibility guidance; WCAG 2.3.3, AAA). **Not opened this session.**
- Material 3's standard easing `cubic-bezier(0.2, 0, 0, 1)` and the 200 ms "short4" duration come from third-party ports of the tokens. **Unverified against m3.material.io.**
- M3 Expressive moves spatial motion to spring physics (**unverified detail**).

---

## 8. Microcopy for clarity

- **Buttons say the action.** Avoid a generic "OK" in confirmations, because people click it out of habit; use a verb such as "Discard". Label buttons by what they do. Avoid vague "Continue" or "Next" when a specific verb fits. https://www.nngroup.com/articles/ui-copy/, https://www.nngroup.com/articles/button-states-communicate-interaction/ (search summaries; **wording unverified**)
- **Cancel vs Close:** use text labels rather than a lone ✕, and confirm destructive actions. https://www.nngroup.com/articles/cancel-vs-close/ (search summary)
- **Empty states** (NN/g, verified, https://www.nngroup.com/articles/empty-state-interface-design/):
  - Never leave them blank.
  - Say whether something is loading, has failed or is truly empty.
  - Don't show "nothing here" while still loading.
  - Explain how to fill the space, and give a button to do it.
  - Example: "No tests yet this week. Ada's first test opens after Lesson 3. [See this week's plan]"
- **Labels:**
  - Tabs: one or two plain words, sentence case, no made-up or branded terms (NN/g tabs).
  - Segmented controls: nouns (Apple).
  - Headings: front-load the meaning (NN/g F-pattern).
- **Links:** name the destination, as in "All 12 math results" (NN/g link labels).

---

## 27 practical rules for the parent dashboard

1. **Two layers, never three.** Layer 1 is today's answers and layer 2 is the details; anything deeper is a full page. *NN/g progressive disclosure.*
2. **Layer 1 shows about 3–4 headline facts,** with one large element and at most two. *NN/g visual hierarchy; Cowan 2001 (inference).*
3. **One main action per card,** with the rest behind a clearly labelled "More" control. *Hick's law.*
4. **Exactly one "needs you" highlight per screen,** with an icon, words and colour together. *Von Restorff; WCAG 1.4.1.*
5. **Headings state the answer** ("Ada finished today"), and the first two words carry the meaning. *NN/g layer-cake and F-pattern.*
6. **Use no more than three text sizes,** with body 17 pt or larger and no light weights. *NN/g hierarchy; Apple typography.*
7. **Touch targets are at least 44×44 pt and spaced apart.** *Apple Buttons; Fitts's law; WCAG 2.5.5.*
8. **Put actions next to what they act on.** *Fitts's law; NN/g proximity.*
9. **Spacing inside a group is smaller than spacing between groups.** One card (common region) per child. *NN/g proximity; Laws of UX common region.*
10. **Avoid scroll areas inside the page.** Show "5 of 12" plus a named link to the full list. *Baymard inline scroll areas.*
11. **"See all" links name their content and count.** *NN/g link labels.*
12. **Use accordions only for optional detail.** Never nest them, allow several open at once, remember their state, and never put essential information inside one. *NN/g accordions; GOV.UK accordion.*
13. **Use tabs or segmented controls for 2–5 distinct views of one thing** (for example This week / This term), never for content people must compare. *NN/g tabs; Apple segmented controls.*
14. **Use dropdowns only for picking one value from a longer list;** with 2–5 options, show them all. *NN/g dropdowns (inference for the few-options case).*
15. **Use popovers for small, brief information, one at a time,** never for warnings. *Apple popovers.*
16. **Use modal dialogs only to prevent mistakes** (delete, unsaved work), and label the buttons with verbs ("Delete test", "Keep editing"). *NN/g modals; NN/g UI copy.*
17. **Use a sheet for short, scoped edits.** Show one at a time, pair Done with Cancel, and confirm before discarding changes. Long tasks get a full page. *Apple sheets; NN/g bottom sheets.*
18. **No hover-only anything.** Use tap-to-open ⓘ tips, and keep text labels on all icons. *NN/g tooltips, tablet report, icon usability.*
19. **Never truncate important text.** Wrap it, and stack the layout when text grows. Test at the largest Dynamic Type size and at 320 px width. *Apple typography; WCAG 1.4.10, 1.4.12.*
20. **Meet contrast:** 4.5:1 for text (aim for 7:1 for body text, given low-vision parents) and 3:1 for icons and borders. *WCAG 1.4.3, 1.4.6, 1.4.11.*
21. **Show amounts as simple bars or numbers,** with no pies, gauges or 3D, and colour only for categories. *NN/g dashboards.*
22. **Calm by default:** no blinking, no streak pressure, no red counters. Interrupt only for things that truly need the parent. *Amber Case principles 1–3.*
23. **Fail calmly:** show the last known data with "Updated 8:40". *Calm tech principle 6; NN/g empty states.*
24. **Empty states explain and offer the next step;** never show "nothing here" while loading. *NN/g empty states.*
25. **Keep motion short:** 100 ms for feedback, 200–300 ms for sheets, ease-out, no motion on frequent taps, and fades when Reduce Motion is on. *NN/g animation duration; Apple motion.*
26. **Glass and blur only on floating controls,** never behind text, and solid when Reduce Transparency is on. *Apple materials.*
27. **Follow iPad conventions** (sidebar or tab bar, swipe-to-dismiss sheets, Cancel/Done) before inventing new ones. Offer dark mode through the system setting, not as the default. *Jakob's law; NN/g dark mode.*

## Do / Don't

**Do**
- Answer "what needs me today?" in the first glance.
- Use one highlight, real headings, big type and generous spacing.
- Show a named "All 12 …" link instead of an inner scroll box.
- Use sheets for short edits and pages for long ones.
- Label buttons with verbs.
- Use icons and words together, not colour alone.
- Test at the largest text size, at 320 px, in light and dark, and with Reduce Motion on.

**Don't**
- Hide essential information in accordions, tabs or hover.
- Stack modals, sheets or popovers.
- Use more than two disclosure levels.
- Put scroll boxes inside a scrolling page.
- Use pies, gauges or decorative charts.
- Put glass or blur behind text, or use thin font weights.
- Use generic "OK", "More" or "See all".
- Use animations over 400 ms, or motion on every tap.
- Use alarm colours or streak pressure for normal states.
