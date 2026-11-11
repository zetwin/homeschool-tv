# Design gallery

Every screen in Home School TV went through rounds of clickable designs before one was built. The rounds are kept in the repository, so you can open each one, compare, and see why a direction was kept or dropped.

**To open them:** run `npm start`, then open the addresses below on `http://localhost:8080`. They use made-up families (Ana, Leo, Mia, or Kid 1 to Kid 3). Their buttons don't change any real data.

**Status words:** **Live** means it was built into the app. **Sample** means a design to compare, not the app.

---

## Parent pad
The parent's home screen, on an iPad. Three rounds, from 15 wide directions down to one.

| | |
|---|---|
| <img src="images/gallery/pad1-picker.jpg" width="360" alt="Round 1, direction 1: three children side by side on a time grid"> | **Round 1: 15 directions** · `/pad-lab/` · Sample<br>Calendar day, family wall, needs-you inbox, one next thing, magazine front, child cards, day timeline, big tiles, school digest, checklist, progress rings, paper register, week map, split view and calm minimal. Each has a keep or drop button and a reason box. |
| <img src="images/gallery/pad1-wall.jpg" width="360" alt="Family wall: one big column per child, like a kitchen calendar"> | **Family wall** · `/pad-lab/02-family-wall/` · Sample<br>One big column per child, like a kitchen calendar. Kept from round 1. |
| <img src="images/gallery/pad2-picker.jpg" width="360" alt="Round 2: refined walls, cards and tiles"> | **Round 2: 16 refined versions** · `/pad-lab/round2/` · Sample<br>The kept ideas from round 1, mixed and made clearer: walls, cards, tiles, rings, checklists. |
| <img src="images/gallery/pad2-cards.jpg" width="360" alt="One child at a time: one big card fills the screen"> | **One child at a time** · `/pad-lab/round2/r04-cards-one/` · Sample<br>One big card per child; tap a face or swipe to switch. |
| <img src="images/gallery/pad3-stage.jpg" width="360" alt="Round 3, Stage: the lesson on now fills most of the screen"> | **Round 3 A: Stage** · `/pad-lab/round3/a-stage/` · **Live**<br>The pad has one job: put today's lesson on the TV. The lesson on now fills the screen; later lessons wait on the right. This became the real Today screen. |
| <img src="images/gallery/pad3-shelf.jpg" width="360" alt="Round 3, Shelf: one big banner, then a shelf of picture cards"> | **Round 3 B: Shelf** · `/pad-lab/round3/b-shelf/` · Sample<br>One big banner for the lesson on now, then a shelf of picture cards. |
| <img src="images/gallery/pad3-stack.jpg" width="360" alt="Round 3, Stack: today's lessons one under another"> | **Round 3 C: Stack** · `/pad-lab/round3/c-stack/` · Sample<br>Today's lessons one under another, each with its own Play; the one on now is biggest. |

## Children page
What each child is doing today, for the parent. Built from four questions: is each child doing school, what did they do and how did it go, does anyone need me, what's next.

| | |
|---|---|
| <img src="images/gallery/children-a.jpg" width="360" alt="One card per child, each answering all four questions"> | **1. One card per child** · `/children-lab/view.html#a-3` · Sample, the direction picked<br>Each card answers all four questions. One state word per child, missed classes in red. |
| <img src="images/gallery/children-b.jpg" width="360" alt="By question: four answers, each showing every child"> | **2. By question** · `/children-lab/view.html#b-3` · Sample<br>Four answers, each showing every child. A third version, **Needs you first**, is at `#c-3`. Each opens with three or six children; the first also with one, two or four. |

## Materials
Pages to print, made from the week's lessons. Six directions in two rounds.

| | |
|---|---|
| <img src="images/gallery/mat-f.jpg" width="360" alt="F: all categories as equal cards"> | **F. Categories, gallery, page** · `/materials-lab/f-gallery/` · **Live**<br>Every category as an equal card; a category opens as a gallery; a page opens on the right with the others listed on the left. This is the app's Materials page. |
| <img src="images/gallery/mat-a.jpg" width="360" alt="A: shelves of pages by subject"> | **A. Shelves** · `/materials-lab/a-shelves/` · Sample<br>The week's pack on top, then shelves of pages. |
| <img src="images/gallery/mat-b.jpg" width="360" alt="B: this week's pages first, Print all"> | **B. This week's bag** · `/materials-lab/b-week-bag/` · Sample<br>The week's pages first, large and in order, with Print all. Also in the lab: **C. Subjects**, **D. This week first** and **E. This week as a card**, at `/materials-lab/`. |

## Child's screens
| | |
|---|---|
| <img src="images/gallery/kid.jpg" width="360" alt="Screen Lab: nine looks for a child's day, side by side"> | **Screen Lab** · `/kid-lab/` · Sample<br>Nine looks for the child's day, side by side at real tablet and phone sizes: Bento, Desk, Block Hub, My Room, Island, Now Playing, Day Dial, Stories and Backpack. The 3D art is rendered once to pictures (`tools/kid-art/`), so tablets need no 3D. |

## Child themes
Each child picks a look in their settings. 14 themes change colour, shape and type; the layout stays the same. Each is original, in the spirit of a kind of game, with no copied art, names or logos. **Live.**

| | | |
|---|---|---|
| <img src="images/gallery/theme-brick.jpg" width="250" alt="Brick Studio theme"><br>**Brick Studio** | <img src="images/gallery/theme-candy.jpg" width="250" alt="Bubble Run theme"><br>**Bubble Run** | <img src="images/gallery/theme-cozy.jpg" width="250" alt="Island Life theme"><br>**Island Life** |
| <img src="images/gallery/theme-farm.jpg" width="250" alt="Harvest Valley theme"><br>**Harvest Valley** | <img src="images/gallery/theme-realm.jpg" width="250" alt="Ancient Realm theme"><br>**Ancient Realm** | <img src="images/gallery/theme-sky.jpg" width="250" alt="Sky Journal theme"><br>**Sky Journal** |

The others: Block Craft, Deep Mine, Space Crew, Storm Season, Toy Arena, Hero Academy, Home School TV (the first look) and Clean. All are in `channel/views/themes.js`.

## Theme kit
| | |
|---|---|
| <img src="images/gallery/themekit.jpg" width="360" alt="Theme Kit: every part of the interface in one theme, with a theme picker"> | **Theme Kit** · `/theme-kit/` · Reference<br>Every part of the child's interface (Today, lesson, test, test result, exam, exam result) in each theme, to check that a theme works everywhere before a child picks it. |

## Older experiments
Kept as a record, not to build on: `channel/round1/` (the first design round), `channel/test-styles/` (early test looks), `channel/game/` (a game-style map), `channel/layouts/` (plain layouts for checking reading order) and `prototype/` (the very first prototype, with Book, Map and Channel looks).
