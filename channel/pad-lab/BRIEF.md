# Parent pad lab: 15 directions (2026-11-07)

The owner wants 15 genuinely different parent pad designs, built fast, to pick and drop. Read first: `docs/research/2026-11-07-design-research.md` (if present), `docs/product/PARENT-PAD-PURPOSE.md`, `docs/rules/DESIGN-VARIATIONS.md`, and load the `frontend-design` skill.

## Who and where
A home-schooling parent (one parent finds small details hard to see), on an iPad, landscape (1180x820) and upright (820x1180). Plain English, not a native speaker.

## What every direction shows (from `../data.js`, the same in all 15)
The day for three children, which class is now, what's done, marks, homework (one late), what needs the parent, recent scores, where they are in the program, and a way to: play today's lesson on the TV, give a mark or homework for a class, mark written answers, open scores, the full program, text size, send feedback. Plus an **Admin icon** that opens **Admin as its own full page** (not a slide panel or sheet) with a clear way back: Your account, Family, Learning plan, Plan and billing, Feedback and checks.

## Rules for this lab (exploration only)
- **Standalone.** One folder per direction: `channel/pad-lab/NN-slug/index.html`, its own inline CSS and JS, plus `<script src="../data.js">`. No app code, no shared styles, no frameworks. Google Fonts allowed, chosen for the direction.
- **Different ideas, not colours.** Each direction learns from the named reference app: its layout idea, hierarchy, interaction layers. Remove all colour and it must still look unlike the others.
- **Layers, not overload.** First screen shows only what matters now. Details go one tap deeper: an expanding section, a sheet, a popover, an inner scroll, a separate page. Use them on purpose.
- **Keep:** text at least 17px, contrast at least 4.5:1, tap targets at least 44px, the pad fits one screen with no page scroll at 1180x820 and 820x1180. Admin may scroll.
- **Pad at `#`, Admin at `#admin`** in the same file. A small label at the top-left corner of the page is NOT allowed; the title of the direction goes only in `<title>`.
- Interactions can be fake (no saving), but taps should open the layer they promise.
- Check your work: `node tools/browser-check.mjs http://localhost:8081/pad-lab/NN-slug/ - 1180 820 shot.png` and `... 820 1180 ...`, look at every picture, and fix what's weak before you finish.
