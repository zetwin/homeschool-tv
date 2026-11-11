# Why our kid screens look kid-made, and what polish really is

Date: 2026-11-06. Written after the owner rejected all ten lab directions as "poor, weak, like kid made", and kept D, F and G as the right direction.

**How this was done:** I opened real pages in a test browser and looked at the screens. The lessons below are my own reading of those pictures, not facts from the sources. The written articles I found were general and weak, so I lean on them very little.

**Limits:**
- Dribbble shows concept art that designers make to attract clients. It sets a visual bar, but much of it was never built, and some may be AI-generated.
- I couldn't open Mobbin or Game UI Database, and the Interface In Game pages I tried for block games were missing.
- The Clash Royale and Genshin pictures I saw were small marketing images, not screens I used.
- No child has seen any of this.

## What I looked at
| Reference | What I saw |
|---|---|
| [Dribbble: kids education app 3D](https://dribbble.com/search/kids-education-app-3d) | Big characters and toy-like 3D objects lead every screen. A world map drawn as an island, with stops on it. A very strong, loud title beside a character |
| [Dribbble: bento dashboard](https://dribbble.com/search/bento-dashboard-kids) | 3D plastic bricks on near-black tiles. A 3D character that breaks out of its frame. One giant number per tile, with very small labels |
| [Dribbble: journal app paper](https://dribbble.com/search/journal-app-paper-texture) | Real paper grain, torn edges, layered photos, printed type with real character. Very few colors |
| [Dribbble: scrapbook app](https://dribbble.com/search/scrapbook-app-ui) | Collage of cut-out photos, real materials, overlapping pieces |
| [Pixune's review of mobile game screens](https://pixune.com/blog/best-examples-mobile-game-ui-design/) | Clash Royale: thick, bright, 3D-looking parts with a character. Genshin Impact: ornate frames and rich items |
| [Apple Design Awards 2025](https://developer.apple.com/design/awards/2025/) | CapWords: turns photos of real objects into stickers, with a real-world sound on each flash card. Its idea comes from the subject, not decoration |
| [Khan Academy Kids in the App Store](https://apps.apple.com/us/app/khan-academy-kids-learning/id1378467217) | One consistent family of drawn characters across everything |
| [Duolingo's art rules](https://blog.duolingo.com/shape-language-duolingos-art-style/), [Rive on Duolingo](https://rive.app/blog/duolingo-s-ai-powered-video-call-brings-lily-to-life) | A strict drawing style, plus characters that react through animation |
| [SaaSFrame's bento guide](https://www.saasframe.io/blog/designing-bento-grids-that-actually-work-a-2026-practical-guide) | Size shows importance. Group related things |

## What the good ones have and ours didn't
1. **Real art carries the screen.** Most of the polish is one large, rich object or character, made by an artist or a 3D tool. Ours were colored boxes with 256-pixel emoji icons.
2. **Things break the frame.** A character steps out of its tile, or a photo sits over the edge of a page. Ours stayed neatly inside boxes, and that's what looks like a template.
3. **Real materials.** Paper has grain, plastic has shine, stone has weight. Ours used flat color with a shadow on top.
4. **Light comes from one place.** Everything looks lit the same way, so it feels like a real space.
5. **Very strong size differences.** A giant number beside tiny text. Ours were mostly medium-sized.
6. **Fewer colors, chosen harder.** One strong backdrop plus the art. Our Bento had many pale tints, which looks like a child's drawing.
7. **Every small part is designed.** Buttons have thickness and a pressed state, and icons match each other. Ours were default shapes.
8. **It moves and answers back.** Parts press, spring and sound. Ours were still pictures.
9. **One photo repeated everywhere is a giveaway.** Ours showed the same mountain on every screen, and a dull one.

## Why I kept getting this wrong
I treated design as choosing layout, font and color, then wrote it in CSS. Those are only about a third of what makes it look good. The art and materials are the rest, and I never had any. Ten layouts with no art are ten versions of the same weakness. The existing `docs/background/DESIGN-RESEARCH.md` already says I can't paint rich art. I ignored that, and I didn't read it before building.

## What we can really get
| Route | What it gives | Cost and limits |
|---|---|---|
| **3D objects modeled in code and rendered with three.js** | Toy-like objects with real light and shine: books, blocks, globe, mountains, a whole small block world. Original to us | Free. Simple shapes only: good objects, but no good characters. Unproven until we try |
| **Free real textures**: [ambientCG](https://ambientcg.com/list?q=paper&type=material), [Poly Haven](https://polyhaven.com/textures) | Real paper, wood and stone | Free, and sources list them as CC0. I need to confirm each file's license before use |
| **[Kenney's UI packs](https://kenney.nl/assets/ui-pack-adventure)** | Ready game parts: panels, buttons | Free, CC0 on the pack's page. Well made, but generic and used by many games, so only a base |
| **AI image tool** | Rich characters and scenes in days | Needs an account, which the owner must make, and I don't have one connected. Hard to keep consistent, and its license must be checked |
| **Paid illustrator or 3D artist** | The real thing, and the only route to a true identity | Costs money and weeks. I have no sourced prices |

**My view:** use the first three now. That can lift the screens far above what you've seen, but it won't reach the best references, which have artists behind them. A real launch needs an artist for the character and key art, as `DESIGN-RESEARCH.md` said.

## What this means for D, F and G
- **D, Bento:** a few strong tiles and one dark or strong backdrop, not many pale tints. A big 3D object per subject that breaks out of its tile, and one giant number per tile. Buttons with thickness.
- **F, Desk:** a real wood desk and real paper grain, torn edges, translucent tape, photos with thick print borders, stickers with a white die-cut edge. Light from one side, so shadows agree. Printed type for reading, handwriting only for short notes. Pages that really turn.
- **G, Block Hub:** a real 3D block world behind the screen, our own, with its own textures. Rendered, so light and shadow are real. Thick stone panels with real grain. Each class is a small 3D object in its slot. Must stay original, not a copy of any game's art.
- **All three:** a different, sharp, relevant photo or render per lesson, motion on every press, and sound as stand-ins for the owner to judge.
