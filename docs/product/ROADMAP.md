# Roadmap

Last updated: 2026-11-06. **Status: Claude's checked plan, based on Codex's independent review. Waiting for the owner's yes. Nothing past Phase 1 has started.** Codex's full review: `docs/research/2026-11-06-codex-architecture-plan.md`.

## Did we start the wrong way?
**No for a prototype. Yes if we keep building a paid service on it.** Plain HTML and one JSON file let us try ideas quickly, and we learned a lot. But one large player file, no sign-in on the server, and one whole-family file can't carry real families. We don't need to start again: the lessons, the player, the question types and the art carry over.

## Where I checked Codex and agree
I confirmed these in the code:
- `tools/serve.mjs` with `--lan` opens all family data, with no sign-in, to anyone on the Wi-Fi.
- Tests save scores and the positions of missed questions, so changing a question later can change the meaning of old results.
- The weekly signature is only a date, with no name.
- `lab-check` always reported success. Now fixed.

And I agree with these directions:
- **Reliability first:** one command that checks everything. First version: `node tools/verify.mjs`.
- **One app, one database, no separate services.**
- **Stack:** TypeScript and React with Vite for the screens, keeping our lesson player. Supabase for accounts and data. Cloudflare for files and hosting. Stripe later. Files stay as files, not in the database.
- **Lessons become checked data,** not code. A new kind of scene adds one small file.
- **A look is a package:** it arranges the screen, but every look shares the same actions and rules.
- **Ship one good default look first,** then add others after real children try them.
- **Control Center:** start from Lesson Console with Class Register's view of everyone.

## Where I disagree with Codex
| Codex says | My view | Why |
|---|---|---|
| Stop adding lesson files | **Pause only until the lesson format is agreed, about a week of work.** Then add lessons again | Lessons are what the family and customers pay for |
| Teacher or child confirms who watched each lesson | **Default to everyone, and let the teacher untick a child.** One tap at most | The owner wants what "just works". A required step each lesson would annoy. Today's rule offers a test to a child who missed the lesson |
| Don't count a TV finishing as a child watching | Agree for official records. **Keep "Watched" and "Took the test" as the real evidence** | The test itself shows the child took part |
| Core lessons shouldn't depend on YouTube | **Agree for paid. Keep YouTube for the family now.** The owner likes these clips and expects them | Its terms bar charging for embedded videos. So paid lessons need licensed clips or our own, and that needs a decision and a budget |
| A payer with no link to a child sees no learning summary | Agree, as the default. It replaces the "weekly summary" idea unless the owner wants it | Paying isn't the same as access. **The owner decides** |
| 8 to 13 weeks to a family release, then 4 to 8 more to a paid beta | **Treat as rough.** It leaves out writing lessons, art and legal work | The main risks are real TVs, child sign-in and video rights |

## What Codex missed
1. **Making lessons is the real long-term cost.** The plan excludes it, but every subject needs hundreds of 15-minute lessons. We need a repeatable line: objectives, script, voice, pictures, video plan, checks, review. Without it, a good platform has nothing on it.
2. **Voice editing.** See `VOICE-PLAN.md`. Phrase library, recordings and a review page belong in the content step.
3. **Older TV browsers.** A modern build may not run on an older smart TV. Test the family's real TV in the first week, not at the end.
4. **Where children's data lives.** The database region and data agreements depend on the launch country, so this needs a decision before real records go in.

## Family first, ready for the public later
**The owner's direction, 2026-11-06:** don't work on paid services now. Build for the family, but so that a public launch later doesn't mean rewriting the whole system.

**Do now, because it's cheap now and costly later:**
- **Stable names for everything:** each lesson, question and scene has an ID that never changes.
- **Family data goes through one module** (`channel/views/store.js`, later a typed data layer). Screens never read the file directly, so the database can replace it behind that module.
- **Keep history:** save what a child answered and which version of a question they saw. Don't overwrite marks.
- **Separate people from roles:** adult, child, payer and teacher stay different ideas in the plan, even with one family.
- **Nothing about one family in the code.** Names and settings stay in data.
- **Record rights for each file,** as `credits.json` does.
- **Words apart from layout,** so other languages can come later.
- **Settings per person,** such as text size and theme.

**Don't build yet:** payments, public sign-up, more than one family on a server, app stores, or billing pages. The sample billing page stays a sample.

## The plan
| Phase | What you get | Rough size |
|---|---|---|
| **1. A demo you can trust** | One check command, a stable copy for presenting that daily work can't break, chosen Spanish voice, all 7 lessons with openings and endings (done: 7 of 7 pass the lesson check, 2026-11-11), real TV, tablet and phone tested when the owner has them | Days |
| **2. A clean base** | TypeScript build, checked lesson format, one lesson converted, split the big files, voice phrases and review page | 1 to 2 weeks |
| **3. Real accounts and records** | Database, a login for each parent, roles, child devices, tests and marks with history. No payment yet | 1 to 2 weeks |
| **4. The real daily screens** | Child app, Control Center, Admin, TV pairing and phone remote, in the looks you choose | 2 to 3 weeks |
| **5. Family release** | Your family's data moved safely, backups, privacy pages, real-device checks | 1 to 2 weeks |
| **6. Public launch, later** | Payments, a small invited group, licensed videos, legal review. **Not a focus now** | 4 to 8 weeks |
| **Alongside, from Phase 2** | The lesson-making line, and new lessons | Ongoing |

## Decisions for the owner
1. **Which country and curriculum comes first?** I'd pick one before paying for anything. It affects privacy law, content and tax.
2. **Which TV, tablet and phone must work first?** Name the real ones, and we test those.
3. **Videos in the paid service:** license clips, make our own, or leave them out?
4. **Can a parent who only pays see learning records?** I'd say no by default.
5. **Family data backup:** the project is on private GitHub, but `data/` stays out of it, on purpose. It still needs its own backup: see `FAMILY-DATA-PLAN.md`.

## How we use git
- `main`: versions known to work. `dev`: daily work. Each finished piece is one clear commit.
- **Stable copy for presenting:** a tagged version in its own folder and port, so a lesson shown to the kids can't be broken by today's work.
- **GitHub:** the working repository is private; a clean public copy is at `zetwin/homeschool-tv`. Automatic checks on each save can come next.
- `data/` stays out of git. It needs its own daily backup: see `FAMILY-DATA-PLAN.md`.
