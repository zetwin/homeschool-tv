# Materials lab: the brief (2026-11-10)

**The owner's words** (the team's private notes, 2026-11-10):
- "why Material page looks so broken? why its half screen? why navigation so akward and jumping?"
- "rethink about it plan and build me few proper good looking easy to understand and navigate prototypes"

**The page's job:** the parent opens Materials to find pages for the children: print them, or send them to their devices. Mostly on Monday, for the week, and sometimes to find "something for Spanish" or "something fun". Exam papers are for parents only.

**Fixed for all three:**
- The pad's header: title left, round icon tools right.
- The pad's five-button bar, with Materials marked.
- Body 21 px on an iPad and 18 px on a phone.
- 1 to 6 children (`?kids=`), shown as small marks.
- Real-looking pictures of each printed page (`thumbs.js`).
- Sample content from our lessons plus the wider kinds (`data.js`). Each opened page says if it's in the app now, planned, or an idea.

## The three ideas
| | A. Shelves | B. This week's bag | C. Subjects |
|---|---|---|---|
| **Idea** | An editorial front page: one big pack, then rows by kind | A working tray: the week's pages, then add more | A catalogue: subjects as big pictures, then pages |
| **Main thing** | "This week's pack", its pages fanned out, red Print | "6 pages for this week", red Print all | The subject with this week's lessons, as the biggest picture, with a thin "Print the week" row above |
| **Secondary** | Shelf names | The pages, large and in order | The other subjects |
| **Supporting** | Each page and its title | Kinds to add from | Page counts |
| **Opening a page** | A sheet slides up from the bottom | Full screen, arrows through the week | A full page, back to the subject |
| **Learnt from** | App Store Today, Apple Books, Netflix rows, Khan Kids Library | Epic Assign and Mailbox, Kumon Connect, Workybooks, Apple Books Want to Read | Khan Kids Library, Teachers Pay Teachers, BrainPOP, Apple Books Library |

Research: `docs/research/2026-11-10-materials-presentation.md`. The suggested split view for C wasn't used, because the owner dropped split views in pad round 2.

## Checks (2026-11-10)
`node tools/hierarchy-check.mjs` at 1180x820 (`--min-body 20`) and 390x844:
- **All three pass:** 4 text sizes, 2 weights, body 21 / 18 px, nothing under 18 / 16 px, 94–96% of the width used, no empty band, one loud colour (the red Print).
- **Squint test:** the pack and its red button win in A and B; the Science picture and the red button win in C.
- **Two CHECKs, with reasons:**
  - **Boxes, 12 to 27.** Most are the pictures of printed pages, which are content, not layout boxes. Eight more are the fixed bar and header tools, and the rest are the children's marks.
  - **Bold share in C, 31–32%**, just over the limit. The subject names are short bold words under pictures, and almost no other text is bold.

**Design review** (design-reviewer helper): its fixes are made.
- **A:** short shelves sit two side by side; one number for paper; Close in the corner.
- **B:** no grey tray; larger kind pictures; the phone viewer fixed; daily maths steps per child in words.
- **C:** a "Print the week" row on top; taller subject pictures; one grid of pages per subject; exam papers and forms as clear buttons; the phone header fixed.

**Recommended:** B. In 3 seconds it says what this week needs and what to tap.

**Honest limits:**
- A and B both start from this week, so they're less different from each other than from C.
- C mixes photos (subjects with lessons) and page drawings (subjects without). We never use an unrelated photo.
- Nothing prints or sends yet.

## Round 2: D and E (2026-11-10)
**The owner's words:**
- "open Material/document on the right side, and keep the list on the left to keep going and check the others too"
- "I like This week pack section and be able to open it, and categories from C. Subjects but not to have this big sizes of cards"
- "when we will open This week pack they can have lesson cards and materials next to it"
- "kind of equal value of categories and this week related lessons materials", "or have This week as a card which looks like a category"

**Both D and E:**
- **iPad:** the list on the left keeps its scroll place. Coming back from a category returns to the same spot (tested).
- **Right side:** the opened page shows there, with Print, Send to their devices, Add to this week's pack, and Previous and Next through the list. On arrival it shows This week's pack: its pages, who it's for, Print the pack.
- **Phone:** the list fills the screen; a page opens over it with Back to the list; Print and Send stay at the bottom.
- **The pack is visible in the list:** pages already in it have a tick.
- **Categories are equal, modest cards:** a small picture of one of their pages, a name and a count.

**D, This week first:**
- At the top: the pack, then each of this week's lessons.
- Each lesson is folded to one row; tap it to see its pages.
- Then the pages for the whole week, then "Everything else", as categories.

**E, This week as a card:** all kinds as equal full-width rows, with This week as one of them. Tap one to see its pages.

**Checks:**
- **Hierarchy check:** passes at 1180x820 (`--min-body 20`) and 390x844, with nothing open and with a page open; 1 and 3 children measured, 6 looked at.
- **Squint test:** the open page's title and the red Print win on the right, and the list stays calm.
- **CHECKs left, with reasons:**
  - Boxes, 12 to 25. Mostly page pictures, the fixed bar and the header tools.
  - D's phone list is 32% bold, because the lesson titles are bold.

**Design review:** it preferred D; its fixes are made.
- Lessons fold up, so the categories show on the first screen.
- A tick marks pages in the pack.
- The scroll place is kept.
- The status line uses plain words.
- Print and Send stay at the bottom on a phone.
- E's cards became full-width rows, and only the open item is highlighted.
- "Chess and puzzles" became "Puzzles and games".
- The pack's six pages show in one row.

**Recommended: D.**
- It does what the owner asked first: This week opens with lesson cards and their pages next to them.
- Everything else sits just below, on the same first screen.
- E puts the lessons one tap deeper.

## Round 3: F (2026-11-10)
**The owner chose neither D nor E:** "none, full list like from C. and if ill open category it should be a list gallery of materials. when im clicking on material it should open it on the right side the others should be on the left. clear? understand?" After it was said back to them: "Yes, build it".

**F, at `f-gallery/`, works in three steps:**
1. **The categories,** as in C, all the same modest size. This week is one of them; Charts and forms and Exam papers are cards too. All 11 fit on one iPad screen.
2. **A category:** its materials fill the screen as a gallery of large page pictures with names. This week shows its pack line (Print the pack), then each lesson with its pages, then the pages for the whole week.
3. **A material:** the page opens on the right, and the category's other materials sit in a list on the left, with the open one highlighted. Previous and Next step through them. **Back** goes to the gallery, at the same scroll place; Back again goes to the categories.

**Phone:** categories in two columns; the gallery in two columns; the page full screen with a labelled Back to the gallery. The bottom bar never changes.

**Checks** (hierarchy-check at 1180x820 `--min-body 20` and 390x844, on all three steps):
- Everything passes except the box count.
- **One more CHECK, with its reason:** on the categories screen, the biggest text is only 1.5 times the body. That's on purpose: the owner asked for equal cards with nothing leading. Category names are regular weight, so the eye isn't pulled anywhere.
- **The flow, tested:** category, page, Next, Back to the gallery at the same place, Back to the categories.
