# What really makes an interface feel AAA

Date: 2026-11-06. Written after the owner rejected two test prototypes. Glow, neon, big rounded corners and playful fonts don't create this feeling.

**How solid this is:** neither Bungie, Riot nor Sony has published a full design system for these, as far as I could find. These notes come from fan analyses, designer write-ups and third-party measurements. I haven't studied the screenshots themselves yet, so the owner should look at the libraries below and judge.

## What top interfaces actually do
- **Swiss typography, not game-looking fonts.** One analysis says Destiny's team deliberately avoided traditional sci-fi interface style, using Swiss-style typefaces with clean shapes and clear hierarchy ([Notes Of](https://notesof.com/thoughts-on-the-destiny-ui/)). A community framework reports Neue Haas Grotesk Display ([GitHub](https://github.com/itssimple/destiny-ui-css)), though Bungie hasn't confirmed its fonts ([Made Good Designs](https://madegooddesigns.com/destiny-font/)).
- **One or two font families at most, with hierarchy from weight first** ([H. Idris](https://h-idris.com/blog/game-ui-typography.html), [IndieKlem](https://indieklem.com/13-the-basics-of-typography-in-game-interface/)).
- **Readable first:** clear 1, l, I and 0, real weights, numbers of equal width, and enough line spacing ([H. Idris](https://h-idris.com/blog/game-ui-typography.html)).
- **Short, firm motion:** one third-party measurement of PlayStation's site lists 180–200 ms ([WebDesignHot](https://www.webdesignhot.com/design.md/playstation/)), unofficial. Another guide says most transitions take 200–500 ms and shouldn't be linear ([Made Good Designs](https://madegooddesigns.com/motion-design-principles/)).
- **Designers disagree, so style is a real choice.** One designer argues Valorant's thin lines and soft transparency are too gentle, and proposes solid filled shapes with taller, heavier type ([Refal Dahlan](https://www.dahlanrefal.com/case-studies/valorant-revamp.html)).

## My conclusion (judgment, not a sourced fact)
The AAA feeling comes from restraint and precision:
- A strict grid and generous, consistent space
- Small corners or none
- One accent color, used only for what matters
- Excellent pictures doing the emotional work
- Very few effects, and each one means something

## Three directions to choose from
All three use the same standard question types and no 3D. Nothing below is built yet.

| | 1. Swiss Precision | 2. Console Calm | 3. Bold Solid |
|---|---|---|---|
| Studied from | Destiny-style clean typography | PlayStation and Apple TV menus | The heavier Valorant redesign study |
| Feeling | Exact, intelligent, serious | Quiet, spacious, premium | Confident, strong, energetic |
| Background | Near-black, plain | Very dark, with the lesson's picture softly behind | Solid dark and one strong color |
| Type | One Swiss-style family | One clean, friendly family | One tall, heavy family, plus a plain one |
| Corners | None or 2 px | 8–12 px | None |
| Answers | Thin-line rows | Large soft-edged tiles | Solid filled blocks |
| Motion | Lines draw in, 150–200 ms | Gentle fade and slide, 200 ms | Hard snap, 120–180 ms |
| Best at | Exams and reading | Tablets and TV | Keeping children alert |

Fonts must allow web use and support Spanish. Candidates to test: Inter Tight, Archivo, Hanken Grotesk, Instrument Sans.

## Where to look at real screens
- [Interface In Game](https://interfaceingame.com/): screens by game, genre and theme
- [Game UI Database](https://www.gameuidatabase.com/): searchable by screen type, layout and color

## Next
1. The owner picks a direction, or shows screens they love from those libraries.
2. Write one exact style guide: fonts, sizes, spacing, corners, colors and motion.
3. Show the same two screens, one question and one result, as still pages, before building anything more.
