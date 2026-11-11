# Style guide

Last updated: 2026-11-06. **Status: tools proposed, look not chosen.** Read before designing any screen. Evidence is in `docs/research/2026-11-06-design-frameworks.md` and `2026-11-06-aaa-interface-styles.md`. See real samples at `channel/style-references/`.

## Why this exists
Until now there was no style guide or framework. Each design was invented by hand, and the owner called the results "AI slop". **Don't invent a style again. Follow this page, or change it with the owner's agreement.**

## Tools
| Job | Tool | Why |
|---|---|---|
| App screens: tests, exams, My day, parent area | **Tailwind CSS + shadcn/ui** (built on Radix) | Popular, clean base, works with keyboards and screen readers, and we own the code |
| Interface motion | **Motion** | Spring physics, and simple to use |
| TV lessons | **GSAP**, as now | Timed to the voice |
| Characters, reactive icons | **Rive,** later | Needs a real animator |
| Interface icons | **Lucide** | Comes with shadcn |
| Category covers | **Fluent Emoji 3D** (MIT) | Professional. Claude doesn't hand-draw art |
| Rules for touch and accessibility | **Apple's guidelines and Material 3** | Tested at huge scale |

Moving the app to React and Tailwind is already planned in `docs/product/ARCHITECTURE.md`. **Proposed first step:** rebuild only the test screens on these tools.

## Rules for every look
These hold whichever look is chosen.

### Type
- One family, or two at most. Hierarchy comes from weight before size.
- No playful, sci-fi or "game" fonts.
- Numbers have equal width in scores and timers.
- Line spacing: 130–150% for reading, tighter only for big headings.
- Must cover Spanish, with clear 1, l, I and 0.

### Space and layout
- Everything sits on a 4 or 8 pixel spacing scale.
- One clear main action on each screen.
- Generous empty space. Padding is never decided by eye.
- Phone: one column, thumb-reach actions. Tablet and laptop: same order, more room.

### Color
- Neutral base, with **one** accent, used only for what matters.
- Green and red mean only right and wrong, and never by color alone.
- **No neon, no glow, no gradient for decoration.**
- Every color has a contrast check.

### Corners and depth
- One corner size per kind of thing, from the chosen look.
- No stacked shadows or heavy borders. Depth has to mean something: what's raised can be pressed.

### Motion
- **Every motion explains something:** what was pressed, what changed, where it went.
- Fast: 100–200 ms for presses and small changes, 200–400 ms for bigger changes.
- Springs for things you touch. No bouncing for its own sake.
- Nothing moves while it's being read.
- The biggest moment is saved for the end result.
- If everything is exciting, nothing is.
- Always respect reduced-motion settings.

### Feedback and sound
- Every press responds at once.
- Sounds are short, quiet, and consistent in style. Easy to mute.
- Vibration on phones only for meaningful moments, once possible.

### Images
- Real, relevant and high quality. See `CONTENT-RULES.md`. **A person checks each one before it goes live.**
- Blocks with no good picture use a clean subject tile. Never an unchecked picture.

### Consistency
- Every screen uses the same parts: button, card, input, list.
- A new part needs a reason, and gets added to this guide.

## Themes children can choose
See `channel/theme-kit/`. Each theme has a light and a dark mode, with a sun or moon switch at the top right. Themes change tokens and part shapes, not layout or content. They're original, in the style of a kind of game, with no copied art, names or logos.

Defaults: **Brick Studio** and **Block Craft.** Others: Deep Mine, Harvest Valley, Bubble Run, Space Crew, Storm Season, Toy Arena, Ancient Realm, Hero Academy, Sky Journal, Island Life, Home School TV (our first look), Clean Pro.

Tests and exams must stay readable in every theme. Exams may lock to a calmer theme.

## Options: choose one look
| Option | Studied from | Corners | Accent | Motion |
|---|---|---|---|---|
| **Neutral Pro** | shadcn/ui defaults, top modern web apps | 6–8 px | One calm color | Quiet, 150 ms |
| **Apple Clear** | Apple apps | 12–16 px | One bright color | Soft springs |
| **Expressive** | Material 3 Expressive | Shapes that change | Rich tones | Lively springs |
| **Friendly Tactile** | Duolingo | 12–16 px, thick lower edge | Bright green | Quick press-down |
| **Strong Simple** | Top mobile game menus, without their themes | 8–12 px | High contrast | Firm press, reward at the end only |
| **Swiss Precision** | Destiny-style typography | 0–2 px | One sharp color | Exact, 150 ms |
| **Console Calm** | PlayStation-style menus | 8–12 px | Soft white and one color | Snappy, 180–200 ms |
| **Bold Solid** | Valorant redesign study | 0 px | One strong color | Hard snap, 120–180 ms |

The look can differ slightly by reader. Children might use a warmer look, and parents a quieter one, on the same parts.

## Do not
- Copy a game's art, characters, names or themes.
- Add a game story to a test.
- Build a custom look or 3D scene for one lesson's test.
- Publish a screen that skips the check below.

## Before showing the owner
- [ ] Uses the chosen look and framework parts, with nothing invented
- [ ] Works at 375, 1024 and 1440 pixels wide
- [ ] Passes contrast, keyboard and reduced-motion checks
- [ ] Tested on real devices where possible
- [ ] A helper with no background called it clear
