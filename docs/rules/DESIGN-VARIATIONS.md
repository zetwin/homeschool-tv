# How we make design variations

Last updated: 2026-11-07. **Read this before making any new screen, prototype or variation, for children, parents or anything else. The owner shouldn't have to repeat it.** It sets a quality level, not a style: it never limits what a design can look like.

**Why this exists.** The owner rejected ten child looks, then six parent looks: "poor weak, like kid made", "no clear point", "same design issues". Each time, I chose layouts and colors without first thinking about the person using it. Then a second six parent looks, made with this rule: "weak poor generic sketches", "content has no sense". I followed the checklist while polishing the wrong content.

## The level we aim for
Top apps and dashboards, made by a professional: clear, useful, and well made in every small part. Smart, not decorated. If a designer at a top company wouldn't sign it, it isn't ready to show.

## Content first, with the owner's yes
**No look until the owner has agreed what the screen says.**
1. Write the screen's goal in one sentence, and when people really open it.
2. List what's on it, in plain text, with real data.
3. **Never invent a feature to make a sample interesting.** Mark each thing as real or coming. A sample must be something the product could really do.
4. Show that plain version. Only after a yes, design it.

## Research first, with named references
**Before any new design direction, look at real products that do the same job, and write down what you learned.** The owner, 2026-11-07: "Feels like you don't understand or not searched and used any reference." The research is in `docs/research/2026-11-07-design-research.md`. Each direction says which products it learns from and why. Reuse that research; add to it when a new kind of screen comes up.

### Rules learned from the research
1. **One hero.** One thing is clearly biggest: the next action or the day's answer. No grid of equal tiles. Size follows importance. *(Weather, Fitness, Apple Home)*
2. **Plain words before numbers.** One sentence says what the numbers mean. *(Weather, Health Highlights)*
3. **Order by what matters now.** What needs the parent comes first: late or missing, then to mark, then coming up, then what happened. Say nothing when nothing is wrong. *(Classroom summaries, Canvas alerts)*
4. **One colour and one face per child, everywhere.** *(Skylight, Cozi, Khan Kids)*
5. **Few children side by side;** a switcher only when one child needs focus. *(Skylight Day view; Family Link pill)*
6. **Each card states a fact and offers its action.** No information without a reason, and no hunting for the button. *(Family Link)*
7. **One place for "needs you".** An empty place means all is well. *(Family Link bell, Canvas alerts)*
8. **Two layers, then a page.** Layer 1: today's answers. Layer 2: detail, opened in place or in a sheet. Anything deeper is a full page with Back. *(NN/g progressive disclosure)*
9. **Which layer for which job:**
   - **A sheet** for a short task tied to this screen (give a mark), with Cancel and Done, one at a time.
   - **A full page** for moving deeper (a child, scores).
   - **A popover** for a quick choice on iPad only.
   - **An alert** only for permanent deletes, with a verb, never "OK". *(Apple HIG modality, sheets, popovers, alerts)*
10. **Admin and settings are a separate full page** behind a small, steady icon. Never a slide panel, never cards on the pad. *(Skylight, Family Link, Apple settings guidance; the owner)*
11. **No scroll boxes inside a page.** Show the first few and a named link ("All 5 classes"). *(Baymard)*
12. **Never cut text.** At large text: stack, use fewer columns, fewer items with a named link, and keep the hierarchy. Test at Extra large and at 320 px wide. *(Apple typography, WCAG 1.4.4 and 1.4.10)*
13. **Body text 17 px or more on a phone, larger on an iPad;** no light weights; at most three text sizes on a screen. *(Apple typography, NN/g)*
14. **Tap targets at least 44 px,** with actions next to what they act on. *(Apple, Fitts's law)*
15. **Contrast 4.5:1 for text, 3:1 for icons and borders,** in every mode. Colour never carries meaning alone. Check with `tools/contrast-check.js`, which also finds cut and overlapping text. *(WCAG 1.4.3, 1.4.11, 1.4.1)*
16. **Neutral base, one accent, colour for meaning only.** No glass or blur behind text. *(Linear, Apple materials)*
17. **Calm by default.** No red counters, streaks or blinking; interrupt only for what truly needs the parent. *(Amber Case, calm technology)*
18. **Follow iPad conventions before inventing:** a sidebar or tabs, Cancel and Done, swipe to close. *(Jakob's law)*
19. **Motion:** about 100 ms for a press, 200–300 ms for a sheet, ease-out, and a fade when Reduce Motion is on. *(NN/g, Apple)*
20. **Labels are verbs and real words:** "Mark Ana's exam", "All 5 classes", never "See all" or "OK". *(NN/g microcopy)*
21. **Build every direction on colour tokens;** strong contrast is a whole token set. Base element rules use `:where()` so a part's own colour always wins. Never reuse a short class name another part of the app uses. *(Our own black-on-black bug)*

**Show, don't describe (owner, 2026-11-10):** for any change in how things look, build a clickable prototype first and ask for a yes on what they can see, not on a written plan: "i need to see prototypes to say if will looks good. i cant say do it blindly". Written plans are only for content.

## Making it
Load the `frontend-design` skill before writing any page, and do its steps: a written plan of colors, type and layout, checked against the generic look it describes, before any code. Prefer fewer directions built properly over many quick ones. Passing the checks doesn't mean it's good.

## Before drawing anything
1. **Who, where, when?** Which person, on which device, from how far, at what moment of their day, in what mood? See `AUDIENCE-AND-READING.md`.
2. **What are they trying to find out or do?** Write their real questions in their own words. Look for the worry underneath. A parent's may be "Am I doing enough?"
3. **Purpose test.** Each block answers one of those questions, or leads to an action. If it doesn't, remove it. No filler, empty grids or decoration pretending to be information.
4. **One believable story.** Use real, consistent sample content: the same day, the same people, and facts that fit together. Nonsense samples hide bad design.
5. **Look at real work first.** Look at real top apps for that job, and say what makes them good. Search design guidance when it helps. Say what's opinion and what's evidence.
6. **Plan the good states:** nothing to do, lots to do, a problem, and first use. A calm, empty state is often the goal.
7. **Say it back.** Tell the owner the understanding and directions, and wait for a yes on anything big.

## What "different" means
Each variation is a **different idea**, not a new coat of paint. Differ in several of these at once:

| Differ in | For example |
|---|---|
| **The idea** | A letter, a timeline, one action, people first, a table |
| **What leads** | Words, numbers, time, people or pictures |
| **Structure** | One column, side menu, full-screen pages, rows along a time line |
| **How you move** | Tabs, swiping, tapping words, sheets that slide over |
| **Type** | Different typefaces, scale and voice |
| **Density and spacing** | Almost empty, or calm and dense |
| **Layers** | Flat, stacked sheets, depth |
| **Parts** | Prose, rows, charts, big numbers, no boxes at all |
| **Wording** | The tone, and what things are called |
| **Motion** | How it enters and answers back |

**The gray test:** remove all color. If two variations then look alike, they're the same design. Redo one.

**Don't copy a kept direction's parts into the others.** When the owner doesn't know what they want, variety is the point.

## Feelings
Choose the feeling first, then what creates it. This table is my working judgment, to adjust by looking and listening.

| Feeling | Often comes from |
|---|---|
| **Calm, relief** | Few things, generous space, quiet color, one clear next step, slow gentle motion |
| **Trust** | Consistency, plain honest words, real data, good type, nothing hidden |
| **In control** | Order, alignment, everything findable, instant response |
| **Warmth, closeness** | People first, personal words, softer shapes and warm color, real names |
| **Reassurance** | A clear verdict in words, trends over time, saying when things are fine |
| **Excitement, wonder** | Scale, real art, surprise, energetic motion. Mostly for children |

**Don Norman's three levels:** how it looks at first sight (visceral), how it feels to use (behavioral), and what it says about me (reflective). Check all three.

## How people's minds work
From [Laws of UX](https://lawsofux.com/), a practical reference.
| Principle | So we |
|---|---|
| **Hick:** more choices means slower decisions | Show few choices. Put detail one step away |
| **Fitts:** big, near targets are faster | Make main actions large and within reach. At least 44 px to tap |
| **Von Restorff:** the different thing gets noticed | Let **one** thing stand out on a screen. If everything shouts, nothing does |
| **Peak-end:** people remember the high point and the end | Design the ending and the best moment with care |
| **Aesthetic-usability:** attractive things feel easier | Polish isn't vanity. It changes how usable it feels |
| **Doherty:** under about 400 ms keeps people in flow | Answer each tap at once |
| **Five seconds:** the main question gets answered at a glance | Test it: can a stranger say what matters? |

## Quality checks
- **Hierarchy:** follow `VISUAL-HIERARCHY.md`: write the ladder (one main, a few secondary, the rest supporting) before drawing, and pass `node tools/hierarchy-check.mjs`. Something is obviously first. Avoid everything being medium.
- **Type:** chosen for this idea. Usually one or two typefaces. Check it at real size. Tight headings, comfortable reading text.
- **Space:** even rhythm and generous margins. Space, not lines and boxes, separates things first.
- **Color:** few colors, chosen hard. One accent. Color carries meaning, and never carries it alone.
- **Reading:** contrast of at least 4.5:1. For people who struggle with small text, 18 to 20 point reading text with fewer things, designed that way from the start.
- **Every part is designed:** buttons, states, icons from one set, empty states, and alignment.
- **Art:** real art, photos or type. Say where it comes from, and say honestly when it needs a professional.

## Motion
Motion explains, answers back or sets a mood, and is never decoration. These timings are common practice from guides, not official numbers. Check them by eye.
| Kind | About |
|---|---|
| Answering a press | 100 to 150 ms |
| Small changes: menus, toggles | 200 to 300 ms |
| Sheets, big layout changes | 300 to 500 ms |
| A special entrance | 500 to 800 ms, rarely |
- Things entering ease out, and things leaving ease in. Exits are a little quicker than entrances.
- Things move from where they came from, so the eye can follow.
- Respect "reduce motion": swap movement for a fade.
- Avoid the look of a template: everything bouncing, and the same fade on everything.

## Signs of weak work: rethink it
These are warnings, not a ban. Use one only for a real reason.
- The same rounded cards, and a colored edge on each card
- Pills everywhere, and emoji as icons
- Many pale colored tiles
- A dashboard of equal boxes with nothing leading
- Variations that differ only by background, border or color
- Labels and words nobody would say, such as themed names for ordinary things
- Space filled because it was empty
- Sample content that doesn't make sense
- A headline that doesn't match the numbers under it
- A big number that looks important but rests on one result
- Numbers only the builder cares about

## Before showing the owner
1. Run `npm run check:lab` for fit and missing pictures, and `node tools/hierarchy-check.mjs <url>` at iPad and phone size. Look at the blurred squint pictures: the main thing must win.
2. **Look at every screen myself at real size.** Automatic checks miss what looks bad.
3. Get a review from the `design-reviewer` helper, with no background, as the real user and as a demanding designer.
4. **Fix or drop what's weak.** Don't show work I wouldn't defend.
5. Tell the owner what each direction is for, how it should feel, and its risks. Say what wasn't tested.

## After the owner's feedback
Add what they taught us to the team's private notes, and update this file if it's a general lesson. **The owner may add more to this later: it grows.**

## Sources
[Laws of UX](https://lawsofux.com/) · [Emotional Design, Wikipedia](https://en.wikipedia.org/wiki/Emotional_Design) · [Don Norman on three levels, TED summary](https://rosetta.to/u/ted/the-three-ways-that-good-design-makes-you-happy-don-norman?t=433) · [Motion timing guide](https://uiux-atlas.pages.dev/lessons/motion/easing-and-timing) · [Motion design reference](https://git.secluded.site/agent-skills/blob/main/vendor/impeccable/skill/reference/motion-design.md) · [Monotype on typeface and trust](https://www.monotype.com/pt/node/5776) (by a type company, so read with care) · `docs/research/2026-11-06-parent-screens.md`, `docs/research/2026-11-06-kid-design-polish.md`.
