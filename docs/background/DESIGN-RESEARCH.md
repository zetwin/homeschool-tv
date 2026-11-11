# Design research and direction

Last updated: 2026-11-06. Status: research finished. **Nothing new is built yet.** The owner chooses what to prototype.

## Why the current map looks bad
- It has no idea behind it. It's rows of rounded rectangles that could belong to any product.
- Everything has the same weight: same corners, same color blocks, same text sizes.
- No pictures, no objects and no world. The subject (learning a year of science) isn't visible.
- The stop cards are mostly empty. Space looks unused, not intentional.
- Dots and pills stand in for design.

A designer would start from an idea and one memorable thing. I started from a list of data.

## What the best work has in common
Status key: **Seen** = I opened the page. **Read** = I read its official text. **Reported** = another source describes it. **Memory** = from my general knowledge, not checked.

| Reference | What to learn | Status |
|---|---|---|
| [The Week Junior](https://theweekjunior.co.uk/) | Real magazine covers for ages 8–14: huge title, one cut-out subject, a clear theme for each issue. Respects children's intelligence. | Seen |
| [Oak National Academy](https://www.thenational.academy/teachers/programmes/science-secondary-aqa/units) | Its own hand-inked illustration style with one color. A curriculum site can have character. | Seen |
| [Brilliant](https://brilliant.org/) | Quiet page, elegant serif headline, and the real interactive problems shown as the visuals. Lesson content **is** the decoration. | Seen |
| [Kurzgesagt](https://kurzgesagt.org/) | One unmistakable world: glowing color on deep space, rounded forms, all motion in one style. [Consistency is what commentators single out](https://artsatmichigan.umich.edu/ink/2019/09/27/simple-bright-beautiful-the-work-of-kurzgesagt). | Seen |
| [Duolingo](https://blog.duolingo.com/shape-language-duolingos-art-style/) | Illustration rules: fewest details, clear silhouettes, exaggeration, shapes that direct the eye, framed with empty space. | Read |
| [National Geographic Kids](https://www.natgeokids.com/uk/) | Strong photos and printed covers, but the website is crowded with ads and banners. Learn from the photography, not the page. | Seen |
| [DK Eyewitness](https://madegooddesigns.com/dk-eyewitness-brand-guidelines/) | Words give meaning to pictures; consistent color coding per section. Isolated objects on clean pages with labels are the classic look. | Reported; memory for the look |
| [Flying Eye](https://flyingeyebooks.com/about/) and [Wide Eyed](https://QuartoKnows.com/Wide-Eyed-Editions) | Beautiful, illustrated, curriculum-linked non-fiction. Their map-style atlases are close to a whole-year view. | Reported. **The owner may want to look at these books directly** |
| [Monument Valley](https://design-milk.com/monument-valley-2-architecture/) | A color world per level. [Influences](https://indienova.com/en/indie-game-news/monument-valley-2-interview-eu/) include mid-century illustration, theatre, toys and confectionery. | Reported |
| Super Mario world maps | A map you travel across makes progress feel like adventure. A [game developer found the same](https://feitizogames.itch.io/geodessey/devlog/56371/designing-a-level-select-interface) when replacing buttons with a map. | Memory; reported |
| [Interface In Game](https://www.interfaceingame.com/) | Library of game screens with a Map category of about 600 screenshots. Useful for browsing together. I couldn't load the map page. | Read the home page only |
| [Apple TV guidance](https://developer.apple.com/design/human-interface-guidelines/designing-for-tvos) | Edge-to-edge artwork, gentle focus movement, cinematic and readable from across a room, easy sign-in. | Read |

### The pattern
1. **A single idea, visible in seconds:** a magazine, a world, a channel.
2. **Real subject matter is the decoration:** objects, diagrams and interactive problems, not colored boxes.
3. **One hero per screen,** then quiet supporting content.
4. **A repeatable system:** one illustration style, one color logic, so a hundred lessons feel like a series.
5. **Aimed slightly older than the audience.** Ages 10–12 hate looking babyish. This is my judgment, supported by how The Week Junior presents itself to ages 8–14.

## The parameters we need to decide
Starting values are proposals, to be tested on a real TV.

### 1. Personality
What are we? A proposal: **curious, smart, a bit funny, never childish, never school-grey.** Words we'd use: "the best science magazine you've ever read, on your TV."

### 2. Screens and viewing distance
| Device | Distance | Job |
|---|---|---|
| TV, 1920×1080 | [8 feet or more](https://developer.apple.com/design/human-interface-guidelines/designing-for-tvos) | Watch, browse, feel excited |
| Tablet or laptop | Arm's length | My day, tests, exams |
| Phone | Close | Quick tasks, parent checks |

Each surface needs its own layout, not a stretched copy.

### 3. Sizes on TV (at 1920×1080)
Apple's [TV text styles](https://developer.apple.com/design/human-interface-guidelines/typography):

| Style | Apple size | Our starting value |
|---|---|---|
| Body | 29 (minimum 23) | 32–36, since children read it from a sofa |
| Caption | 23–25 | 26 minimum |
| Headline | 38 | 44 |
| Titles | 48–76 | 56–96 |
| Display | Not specified | 140–300, used once per screen |

[Fire TV](https://developer.amazon.com/docs/fire-tv/design-and-user-experience-guidelines.html) suggests at least 28px at 1080p. [Smashing](https://smashingmagazine.com/2025/09/designing-tv-principles-patterns-practical-guidance/) suggests starting at 24px with 5–6 sizes. Use 5–6 sizes in total.

### 4. Spacing and layout
- Safe area: keep important content inside the [inner 90%](https://developer.amazon.com/docs/fire-tv/design-and-user-experience-guidelines.html). About 96px at the sides and 54–60px top and bottom. Backgrounds should run to the edges.
- Grid: 12 columns, as [recommended for TV](https://smashingmagazine.com/2025/09/designing-tv-principles-patterns-practical-guidance/).
- Spacing steps: 8, 16, 24, 40, 64, 96, 160. Use big jumps. Timid spacing looks amateur.
- Allow overlap and cropping, as magazines do.
- Corners by role: no single radius everywhere.

### 5. Type
- A display face with real character, plus one readable text face. One family can be enough.
- Must support Spanish characters such as ñ and á, and Spanish text runs longer.
- Avoid: all-caps labels above everything, words joined with dots, and one highlighted word in each heading. **My first map does all three.**
- Test candidates on a TV. [Fraunces with Rubik](https://fontalternatives.com/pairings/fraunces/) came up, but pairing sites are weak evidence. A paid typeface may be worth it: type sets the personality more than anything else.

### 6. Color
- A color for each subject, with lightness differences so color-blind children can tell them apart, plus text labels.
- [TV guidance](https://smashingmagazine.com/2025/09/designing-tv-principles-patterns-practical-guidance/): more muted palettes, no pure white, bright color kept for states. [Fire TV](https://developer.amazon.com/docs/fire-tv/design-and-user-experience-guidelines.html) adds that cool colors work better than red or orange. Our current bright red and yellow panels go against this, and it's worth testing on the real TV.
- Each unit could get its own color world, as Monument Valley's levels do.

### 7. Covers
This is probably the most visible missing piece. Each lesson and unit should have a designed cover, like a magazine issue.
- Formats: 16:9 for TV, [2:3 and 1:1](https://smashingmagazine.com/2025/09/designing-tv-principles-patterns-practical-guidance/) for shelves
- Anatomy: one strong subject, large title, consistent placement of the series mark
- Must show the actual topic, under rule 1 in `rules/CONTENT-RULES.md`
- A cover template that can be repeated cheaply for every lesson

### 8. Illustration
Decide one system, using [Duolingo's rules](https://blog.duolingo.com/shape-language-duolingos-art-style/) as a model.

| Route | Quality | Consistency | Cost and time |
|---|---|---|---|
| A professional illustrator creates the style and core set | Highest | Highest | Costliest; I have no sourced price, so get quotes |
| I draw vector art in code | Medium; simple shapes only | High | Cheap. **This is why my work looks limited** |
| AI-generated images | Can be strong | Hard across hundreds of images, and anatomy errors are a risk | Cheap; check licensing and accuracy |
| A paid illustration library | Medium | Medium | Moderate, but may look generic |

**My recommendation:** for a real product, pay an illustrator for a small style kit and key art. Prototypes can use what I can draw plus real photos, and I'll say plainly where the art is a stand-in.

### 9. Photos
- One treatment: objects cut out on color, or duotone, not random snapshots.
- Our current images are only 900–1280px wide, which is soft at full TV size. Get larger versions or use them smaller. Full-screen needs at least 1920px.
- Paid science libraries can be considered later. I couldn't confirm prices.

### 10. Motion
- [Google's latest system](https://m3.material.io/styles/motion/overview/how-it-works) uses springs, with an expressive scheme that overshoots and bounces, and a standard scheme for utility.
- Proposal: expressive springs for children's moments, standard for exams and parent screens.
- One signature transition for the whole product, such as a page turning or a camera moving through a map.
- Motion must show what changed. No fade-up on everything.
- TV browsers may be slow, so animate position, size and opacity only, and test on the real TV.
- Tools:
  - **GSAP**, already used, for scenes
  - **[Rive](https://rive.app/docs/editor/state-machine/state-machine.md)** for characters that react to right and wrong answers, using state machines; its open-source runtimes have [no royalties or runtime fees](https://rive.app/docs/)
  - **Rendered video** for heavy scenes
  - Lottie for simple playback (from memory; its docs failed to load)

### 11. Sound
[Material's guidance](https://m2.material.io/design/sound/applying-sound-to-ui.html) gives clear rules:
- **Earcons:** short sounds tied to an action.
- **Hero sounds:** rare, for big moments such as finishing a unit.
- **Silence is a design choice:** don't add sound to frequent actions.
- Decorative sound should be rare, to avoid fatigue.

For us: a short channel sting; correct, wrong, and completion sounds; a quiet music bed under narration that dips when the voice speaks; separate mute controls. Sounds I generate in code are stand-ins. A sound designer could make a small set, and a recognisable sting is worth having.

Licensing:
- [Pixabay](https://pixabay.com/service/terms/): allows commercial use, no credit needed, but no standalone redistribution. Check that UI sound use fits.
- [Freesound](https://freesound.org/help/faq/): license differs per sound, and some ban commercial use.

### 12. Focus and remote
- Focus must be obvious [from across the room](https://smashingmagazine.com/2025/09/designing-tv-principles-patterns-practical-guidance/): scale, color inversion or border. Apple's TV system uses [gentle depth](https://developer.apple.com/design/human-interface-guidelines/focus-and-selection).
- Never move focus without the user's action.
- Vertical moves between groups and horizontal between items.
- Avoid typing on a TV. A short phrase takes [about 38 presses](https://smashingmagazine.com/2025/09/designing-tv-principles-patterns-practical-guidance/).

### 13. A host or character?
Creator channels have a personality. We have only a voice. A recurring guide could give us the same, with [Rive state machines](https://rive.app/docs/editor/state-machine/state-machine.md) making it react. For ages 10–12, it must be witty, not babyish. **This decision affects everything else.**

### 14. Words
Short, sentence case, one job per line. Every word has to earn its place on a TV.

### 15. How designs can coexist
**Agreed with the owner:** keep the current design and don't patch on top. A proposal:
- Same data and logic: curriculum, lessons, scores.
- Each look lives in `channel/themes/<name>/`, with its own tokens, layouts and art.
- The current look becomes `classic`.
- A switcher chooses the theme, including in prototypes.

## The anti-slop checklist
Before showing any design, each answer must be yes:
- [ ] Could I describe the idea in one sentence, and is it specific to this subject?
- [ ] Is one thing clearly the hero of each screen?
- [ ] Is real subject content the main visual, instead of colored boxes?
- [ ] Would a designer say corners, shadows and sizes vary with purpose?
- [ ] Have I removed all-caps labels, dot-separated text and highlight-one-word headings?
- [ ] Have I removed empty cards and identical grids?
- [ ] Do I still like it after removing one decoration?
- [ ] Was it reviewed at real TV size, not just on a laptop?

Sources on these patterns are mostly [blogs and skill files](https://world.hey.com/kostac/spot-the-slop-a-ui-designer-s-guide-to-fixing-ai-defaults-4c448c9c), so treat them as prompts, not rules.

## Whole year and Today
The owner's idea has real names in schools: a **curriculum overview**, **year at a glance**, or **long-term plan**. A [UK school](https://www.maplewell.leics.sch.uk/?p=12768) calls its visual version a **learning journey**. [A US district](https://www.comalisd.org/apps/pages/curriculum-YAG) publishes a Year at a Glance per subject and grade so families can see the year's goals.

In plain words: one page shows everything we'll learn this year, in every subject. Then we zoom in:

**Year → Term → Week → Today**

A switcher moves between these levels. Children mostly stay on Today. Parents and curious children open Year.

Oak's own [overview](https://www.thenational.academy/teachers/programmes/science-secondary-aqa/units) is a filtered list of units, so a truly beautiful year view is a chance to stand out. A real whole-year view needs all subjects, and only science is mapped so far. Prototypes will need other subjects' topics from official sources, marked as examples if they aren't checked.

### Five ways to show a whole year
```
1. Wall chart              2. Metro map
   Aut  Spr  Sum              Science ●──●──●──◉──●──●
Sci ▇▇▇ ▇▇▇ ▇▇▇              Maths   ●────●────●────●
Mat ▇▇▇ ▇▇▇ ▇▇▇              History ──●───●────●───●
Eng ▇▇▇ ▇▇▇ ▇▇▇              Lines cross where subjects link
Like a periodic table

3. Contents pages          4. Seasons and episodes
   Book-style index with      Autumn season
   small pictures             ▣ ▣ ▣ ▣ ▣ ▣
   Science ........ 4         Spring season
   Maths .......... 28        ▣ ▣ ▣ ▣ ▣ ▣

5. One big world
   Pan across an illustrated land.
   Each subject is a region, each unit a place.
```

## Three directions to prototype
Each would show the same screens, so they're fair to compare: **Today, Whole year, Lesson cover, and a test question.** All three are about a skeleton lesson with real content.

### A. The Living Encyclopedia
**Idea:** the most beautiful science magazine, on your TV.
- **Look:** clean color fields, large cut-out real objects such as a skull and femur, huge type, labels with thin lines. Each lesson has a magazine cover.
- **Whole year:** wall chart or contents pages.
- **Motion:** pages turn; objects float in, then rotate; labels draw themselves.
- **Sound:** paper, soft clicks, a warm sting.
- **Best for:** trust from parents, closest to real school quality, feels grown-up.
- **Risk:** needs great images.

### B. The Big World
**Idea:** your year is one giant illustrated place you travel across.
- **Look:** a rich, atlas-style painted world with a region per subject.
- **Whole year:** the world itself. Today zooms in to where you are.
- **Motion:** one continuous camera moving from Year to Term to Today, with depth layers.
- **Sound:** gentle ambience per region, footsteps or a travel sting.
- **Best for:** wow factor and a reason to return.
- **Risk:** needs an illustrator to be truly good, is the hardest to do well in code, and may feel young if done badly. Harder to show real exact plans.

### C. The Cinematic Channel
**Idea:** a premium show, with seasons and episodes.
- **Look:** deep, rich full-screen art like Kurzgesagt's glow, but our own. Large titles. A host character could live here.
- **Whole year:** seasons and episodes, plus a metro map.
- **Motion:** slow movement in the background, depth on focus, cinematic cuts.
- **Sound:** a recognisable sting and a music bed.
- **Best for:** builds on the Channel look and lesson style the owner already likes. TV-native.
- **Risk:** can feel passive or too much like a streaming service if it has no strong idea.

### My recommendation
Prototype **A and C** first, with **metro map** and **wall chart** as whole-year options. They use what we can make well now. Build a small version of **B** as well, so the owner can judge the idea, with a clear note that real quality needs an illustrator.

If I had to bet on the final product, I'd mix them: **C's channel on the TV, A's magazine covers and lesson pages, and a metro map for the year.**

## Honest limits
- I can design layout, type, color, motion and diagrams. I can't paint rich illustrations or compose real music. A real launch needs an illustrator and a sound designer for key pieces.
- I haven't seen the printed books directly. Spreads from DK or Wide Eyed may look different from what's described.
- Apple's and Material's rules were read directly. Others came from secondary sources.
- All numbers here are starting points, and need testing on the owner's TV.
