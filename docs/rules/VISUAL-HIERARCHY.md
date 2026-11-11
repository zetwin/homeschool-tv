# Visual hierarchy: where the eye goes first

**Read before any screen, prototype or variation. It comes before colours and style.**
Written 2026-11-10, after the owner said of the new pad looks: "my eyes are crossed in any direction, so unclear". The owner shouldn't have to say this again. Every screen must pass this page before the owner sees it.

## What it means, in plain words
Visual hierarchy is the order in which the eye reads a screen. A good screen decides that order on purpose: **one main thing** is seen first, then a **few secondary things**, then the **supporting details** only when someone looks for them. When everything is the same size, the same boldness and has its own colour and box, the eye jumps around and finds nothing. That is what the owner felt.

## Step 1: write the ladder before drawing
For every screen, write this in plain text first and check it against the person's real question (see `AUDIENCE-AND-READING.md`):

| Level | How many | What it is | Example: the parent pad, morning |
|---|---|---|---|
| **1. Main** | **one** | The answer to the person's main question on this screen | "All three are on track" or "Kid 2 needs you: 2 lessons to catch up", with its one action |
| **2. Secondary** | two to four | What they check next | Each child: done today, one line |
| **3. Supporting** | the rest | Detail for when they look | The day's classes, times, last test |
| **4. Quiet** | as little as possible | Navigation, settings, meta | Tab bar, Admin, Text size |

If a block can't be placed on the ladder, it has no purpose here: remove it or move it one tap deeper.
If the main slot is empty today (nothing to play), it **must not stay the biggest thing**. Promote the next most useful answer instead. "No lesson to play" in the biggest type is a wasted main slot.

## Step 2: give each level its weight
Visual weight is how strongly something pulls the eye. It comes from size, boldness, colour strength, a filled shape, empty space around it, and position (top and left are read first). **Only the main thing gets several of these at once.**

**Parent screens are also for parents who can't read small things** (owner, 2026-11-07 and 2026-11-10). So the sizes are large from the start, and hierarchy comes from the *difference* between levels, never from shrinking the lower ones.

| Level | Text size, parent pad on iPad | On a phone | Boldness | Colour | Space around |
|---|---|---|---|---|---|
| **Main** | the biggest, at least 1.6× the body text (about 40 to 48 px) | about 30 px | bold | the screen's only strong accent, or a filled button | the most; it sits apart |
| **Secondary** | about 26 to 28 px | about 22 px | bold | ink (near black) | clear groups |
| **Supporting** | body, **20 px at least** | **18 px at least** | regular | ink, or dark grey | tight inside a group |
| **Quiet** | 18 px, never smaller | 16 px | regular | grey, still at least 4.5:1 contrast | at the edges |

Tap targets on the parent pad are at least 56 px tall, larger than the usual 44, for the same reason.

## Use the whole screen
**Making a screen calm must never make it smaller.** Calm comes from fewer things, not from small things with empty space around them (owner, 2026-11-10: "why now it doesnt use whole screen space? it makes everything smaller which is bad for mother").
- Content spreads across the width of the iPad: **at least 85% of the width**, not a narrow column in the middle. Only long reading text (a paragraph) is kept to a comfortable line length.
- **No big empty band:** no empty strip taller than about 15% of the screen in the middle of the content. If there is room left, make the parts bigger, or give the main thing more space, before adding anything.
- Three children on an iPad held sideways sit **side by side as three large buttons**, using the full width, not stacked thin rows.
- The tool measures both: how much of the width is used, and the biggest empty band.

**De-emphasise to emphasise:** to make the main thing stand out, first make everything else quieter (regular weight, grey, smaller), rather than making the main thing louder.

## Show it, don't make them read
**People should understand a screen at a glance, before reading a single word** (owner, 2026-11-11: "you are not using design skills design ellements etc etc etc to visualize information, which make us read anything to understand it, not like top apps and tools, games etc is doing"). Hierarchy decides *what* is seen first. This section decides *how* each fact is shown: as a shape first, and words only to confirm it.

For every fact on a screen, ask: **could a shape say this?** If yes, the shape leads and the words become small, or go.
| The fact | Don't write | Show | Seen in |
|---|---|---|---|
| How much is done | "3 of 5 classes done" | A bar of 5 segments, 3 filled; or a ring | Apple Fitness rings, Duolingo lesson bar |
| A day's order and time | Rows of "09:55 Science Not yet" | A timeline: one block per class in the subject's colour, filled when done, empty when to do, a "now" line across it | Google Calendar day view, Apple Screen Time |
| State | "Not yet", "Done", "Missed", "Not started" | A tick, an empty circle, a red outline or a dash; one meaning each, the same everywhere | Linear issue icons, GitHub checks |
| A score | "11 of 12" alone | A small ring or bar, green, amber or red, with the number inside | Khan Academy mastery, game star ratings |
| Something waits | "2 tests waiting" | An icon with a count badge, like an app badge | iOS badges, ClassDojo |
| Which subject | The word "Geography" on every row | The subject's colour and icon; the word once, small | Apple Calendar colours, Notion icons |
| Which lesson | Its long title | A small picture of the lesson (the cover), title under it | Netflix and YouTube thumbnails |
| Who | A name as text | The child's face, always in the same place | Messages, FaceTime |
| Progress through a subject | "Lesson 7 of 11" | A thin bar with a dot for each lesson | Duolingo path, Strava goals |

Rules:
1. **Shape first, words second.** The words that stay are short labels, not sentences.
2. **Colour always has a meaning** (a subject, a state, a child) and the same meaning on every screen. Never colour alone: the shape or icon must say it too, for the 8 in 100 men who don't see some colours.
3. **One visual language for the whole app:** the same tick, ring, bar and badge everywhere, so it's learned once.
4. **Glance test:** look at the screen for 3 seconds, from arm's length or in the squint picture. Can you say who is ahead, who is behind, and what's next? If you had to read sentences to know, it fails.
5. **Large still applies:** shapes are big enough for every parent to see, at least as big as the body text.

## Step 3: the limits (checked by a tool)
`node tools/hierarchy-check.mjs <url>` measures these on the visible screen and saves a normal and a blurred picture.

| Limit | Why |
|---|---|
| **Body text at least 18 px** (20 px on the parent pad on iPad), nothing under 16 px | Some parents can't read small text; small text also flattens the hierarchy |
| **Content uses at least 85% of the width**, no empty band over 15% of the height | A narrow column makes everything smaller for no reason |
| **At most 4 text sizes** on a screen: three levels (NN/g) plus one small size for quiet text | More sizes look accidental, and nothing ranks |
| **At most 2 large elements** on a screen (NN/g) | Two big things already compete |
| **3 text colours:** dark, grey, light grey (Refactoring UI) | Grey, not smaller size, is how secondary text steps back |
| **At most 2 weights**, regular and one bold, never below regular (400) | A third weight is noise; thin text is hard to read |
| **Bold on at most about 30% of the words** | When most things are bold, nothing is |
| **Biggest text at least 1.6× the body** | Otherwise nothing obviously leads |
| **At most 3 strong colours**: one accent for the action, plus at most two that carry meaning (done, problem) | Every extra colour is one more place the eye jumps |
| **At most 3 strong filled areas**, and at most 1 or 2 filled buttons (Apple). The main action is one of them | Fills are the loudest thing on a screen |
| **3 button styles only:** filled for the main action, outline for secondary, plain text link for the rest (Refactoring UI) | The style itself says how important an action is |
| **About 8 boxes at most**; group with space first | Boxes make every block look equally important |

A CHECK isn't always wrong, but it needs a written reason.

## Step 4: rules that the tool can't measure
0. **Design for any number of children, 1 to 6.** Never build a screen around three cards (owner, 2026-11-10: "what if some parents will have 1 kid? his card will take all of the space? i think we focused on kids too much"). Children are compact rows or small marks that grow in number, not big tiles that grow in size. Check every screen with 1, 3 and 5 children. Use the space for what the parent needs to do, not to make child cards larger.
0. **The bottom bar never changes.** Same buttons, same order, same place on every page of an area, Today included; only the current one is marked. Never a different set on the home screen. Checked page by page before showing (owner, 2026-11-10: "why bottom navigation is unstable amount of links changing its so wrong").
0. **Big buttons keep an icon with their text,** beside it or under it (owner, 2026-11-10). **The small tools in the header (Text size, Tell us, Admin) are icons only,** round, with a spoken name for screen readers (owner, later the same day: "tools in header make just icons"). Elsewhere, text alone is harder to find and an icon alone is harder to understand.
1. **One main thing per screen.** If two things compete for first place, choose one.
2. **Repeated equal blocks are secondary.** Three children side by side are equal on purpose, so the main thing must sit above or outside them, not inside each.
3. **Group by space.** The space between groups is at least twice the space inside a group. Use the spacing scale 4, 8, 12, 16, 24, 32, 48 px.
4. **Colour means one thing only.** A colour used for a child must not also be a subject (Kid 1 red and Spanish red is a mistake). Child colours stay small: the avatar or a dot, not big fills.
5. **Say it once.** Don't show the same fact twice ("3/5" ring and "3 of 5 done").
6. **Icons only when they help find something.** An icon beside every line is noise.
7. **Status in words, colour only to support it.** Small and quiet when all is fine; stronger only when something needs a person. Red only for a real problem. About 8 in 100 men don't see some colours, so colour never works alone.
11. **Labels are a last resort.** Write "3 lessons left", not "Remaining: 3". A number needs a comparison: a goal, yesterday, last week (Stephen Few).
12. **TV is different:** body text about 29 pt and nothing under 23 pt (Apple tvOS).
8. **Highlight one state only.** If "now" is tinted, don't also outline "next" in another style.
9. **Prototype tools are quiet.** "Example", "Sign in" and "Page list" bars must not be the loudest things on the screen.
10. **Position follows the ladder.** The main thing is top-left or top-centre, where the eye starts. Quiet things go to the edges.

## Step 5: the order of work
1. Write the ladder (Step 1) and agree it with the owner in plain text.
2. Draw it **in grey first**, with no colour, and check that the order already reads.
3. **Squint test:** blur the screen (the tool does this at 7 px; also try stronger). The main thing must still be the first thing you see. If a yellow button, a banner or a tick wins, fix it. Then a **grey test**: in black and white, does the order still read? And a **headings-only read**: do the bold words alone tell the story?
4. Run `node tools/hierarchy-check.mjs` at iPad (1180x820) and phone (390x844) sizes.
5. Add colour last, only where it means something.
6. Then the usual checks in `DESIGN-VARIATIONS.md`, and the `design-reviewer` helper.

## The pad on 2026-11-10: what went wrong
**Where it landed ("Stage", chosen by the owner):** the lesson to play fills most of the screen with its picture, a very large title and the only red button; other lessons wait on the right; four big buttons at the bottom. Squint test: the main card wins. Bold share and a third weight come from the few big lesson titles, which is accepted.

**Second try ("Clear" Today):** hierarchy fixed (4 sizes, 8% bold, 3 colours), but the content was a 740 px column in the middle of a 1180 px iPad, body text 17 px, and a 200 px empty band under the children. The owner: "it makes everything smaller which is bad for mother". Lesson: quieter must not mean smaller.

**First try (Paper and Channel looks):**
Measured on both new looks (Paper and Channel) at iPad size:
- 9 text sizes (limit 4); 59% of the words bold, 51 of 82 lines (limit about 30%).
- 7 strong colours (limit 3): red, purple, blue, teal, green, cyan, yellow; Spanish shared Kid 1's red.
- 6 to 10 strong filled areas, 13 boxes, 20 small icons.
- The biggest words on the screen were "No lesson to play": an empty main slot.
- Squint test: the "Example" bar, the yellow buttons, the logo and the ticks won. The main card was a white blank.
- Three equally loud columns with no main thing above them.

## Sources
The full research, with 30 rules, common mistakes, the checklist and what couldn't be verified: `docs/research/2026-11-10-visual-hierarchy.md`. Main sources:
- Nielsen Norman Group: [Visual hierarchy](https://www.nngroup.com/articles/visual-hierarchy-ux-definition/), [Squint test](https://www.nngroup.com/videos/squint-test/), [Principles of visual design](https://www.nngroup.com/articles/principles-visual-design/), [Dashboards and what the eye sees first](https://www.nngroup.com/articles/dashboards-preattentive/), [Proximity](https://www.nngroup.com/articles/gestalt-proximity/), [Common region](https://www.nngroup.com/articles/common-region/), [Scanning patterns](https://www.nngroup.com/articles/text-scanning-patterns-eyetracking/)
- Apple: [Typography](https://developer.apple.com/design/human-interface-guidelines/typography), [Layout](https://developer.apple.com/design/human-interface-guidelines/layout), [Buttons](https://developer.apple.com/design/human-interface-guidelines/buttons), [Colour](https://developer.apple.com/design/human-interface-guidelines/color)
- Refactoring UI: [Labels are a last resort](https://www.refactoringui.com/previews/labels-are-a-last-resort), [7 practical tips](https://medium.com/refactoring-ui/7-practical-tips-for-cheating-at-design-40c736799886)
- Stephen Few: [Common pitfalls in dashboard design](https://www.perceptualedge.com/articles/Whitepapers/Common_Pitfalls.pdf)
- Smashing Magazine: [Visual weight and direction](https://www.smashingmagazine.com/2014/12/design-principles-visual-weight-direction/)
- W3C: [Contrast, at least 4.5:1](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html)

**Our own numbers, not from a source:** at most 3 strong colours and 3 filled areas, about 8 boxes, the gap between groups at least twice the gap inside, and the 1.6× size step. They are starting points; change them when the owner's eye says otherwise.
