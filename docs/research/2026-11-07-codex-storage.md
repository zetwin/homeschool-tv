# Codex on family data storage

Date: 2026-11-07. The owner asked why data is in a JSON file, and what Codex would do. Codex ran read-only and didn't open `data/`. Its answer is below, unedited. **My checks against the code come first.**

## What I checked myself
| Codex says | Checked | Verdict |
|---|---|---|
| `/api/state` has no sign-in, and anyone on the Wi-Fi can read or change data | `tools/serve.mjs`: no check before the API | **True** |
| A device holding older data can overwrite newer settings, because 'settings' replaces each section it sends | `serve.mjs` uses `Object.assign(next, value)`. `store.js` `saveSettings` sends all children, and diary saves send the whole `school` | **True.** The likeliest real loss for this family |
| If the server can't be reached, the save fails silently, and a later refresh can replace the device's changes | `store.js` `send()` swallows errors, and `refresh()` replaces local data | **True** |
| An exam save replaces a record with the same ID | That's how parent marking updates an exam | **True but intended.** Only a risk if two devices mark the same exam |
| One Node process writes one at a time, with an atomic rename | `writeFileSync` to a temp file, then rename | **True.** Half-written files aren't the risk |
| SQLite now, Postgres or Supabase later, behind the existing `store.js` boundary | Matches our `ROADMAP.md` and `FAMILY-DATA-PLAN.md` | **Agree** |
| Sign-in shouldn't wait for the database | Our plan put real sign-in later | **Partly agree.** For one family at home it's acceptable for now, but it must come with the database, before any other family |
| 5 to 8 days | My guess is similar | Plausible |

## My recommendation
1. **This week, a small bridge (about 1 day):** saves change only the record touched, such as one child, one class log entry or one rating, never a whole section. A failed save shows a message, and is retried. This removes the likeliest loss without changing how anything looks.
2. **Then SQLite (about 5 to 8 days),** with a server-side sign-in and hashed passwords, as Codex describes. After that, backup is one file to copy.
3. **Later, for other families:** Postgres, which is Supabase's database, with row-level security.

## Codex's answer
Nothing for you — this was read-only. I changed no files and did not open anything under `data/`.

### 1. What can go wrong this month

At about 1 KB, file size isn’t the problem. Access, stale copies, and recovery are.

- With `--lan`, the server listens on all network interfaces. The `/api/state` handler has no sign-in: anyone on the home Wi-Fi can read or change family data. It uses plain HTTP. See [serve.mjs](../../tools/serve.mjs:36) and [its listener](../../tools/serve.mjs:66).
- [store.js](../../channel/views/store.js:6) seeds plain-text passwords and PINs. It saves the family object in localStorage and checks sign-in in the browser, so each device gets a copy and the server doesn’t know which parent is acting.
- A stale device can overwrite newer settings: `saveSettings` sends its whole in-memory children list, while the server applies each supplied section wholesale. Removing a child sends attempts and other sections too. See [store.js](../../channel/views/store.js:93) and [serve.mjs](../../tools/serve.mjs:31). Exam saves replace an existing record with the same ID ([serve.mjs](../../tools/serve.mjs:30)).
- If the server is offline, a save failure is swallowed. A later refresh can replace that device’s local changes with the server copy ([store.js](../../channel/views/store.js:37), lines 62–68).

One qualification: in this single Node process, file reads and writes are synchronous, so simultaneous request handlers run one after another. Atomic rename also helps prevent a half-written JSON file ([serve.mjs](../../tools/serve.mjs:23)). The likelier loss is a stale whole-section save or a same-ID exam replacement. The data plan says the daily backup is proposed, not active, and a restore hasn’t been tested ([FAMILY-DATA-PLAN.md](../../docs/product/FAMILY-DATA-PLAN.md:3), lines 456–458).

### 2. Recommendation

Use SQLite on the Mac behind a small server-side storage module. Keep attempts, answers, and marks as separate records; use ordinary updates for settings and watched status. A full append-only event system adds work this family doesn’t need. JSON fixes would be a short bridge, but would preserve the same whole-section update problem.

This Mac runs Node 26.12.1. `node:sqlite` fits it, though Node’s current docs call the API a release candidate and say its calls are synchronous. The project allows Node `>=22`; raise that minimum to `22.13` if using the built-in module. [Node.js SQLite docs](https://nodejs.org/api/sqlite.html)

Later, move the same storage boundary to managed Postgres; Supabase is a reasonable option with Auth and carefully tested row-level security (RLS). Every family-owned row needs a family ID, and every exposed table needs deliberate grants and RLS policies. [Supabase RLS guidance](https://supabase.com/docs/guides/database/postgres/row-level-security)

### 3. Smallest safe first step

Start with `families`, `users` (password hashes), `children`, one `settings` row per family, `attempts` and `answers`, `exam_sittings`, `watched_lessons`, and `ratings`. Keep timetable settings as JSON in that settings row at first; add detail when needed.

Keep the screen-facing `Store` methods, but have them call narrow server operations. Stop putting the whole family record or passwords in localStorage; keep only device preferences and a server-issued session. Show save failures instead of silently accepting them.

Pause writes, make a private backup, then import the JSON in one transaction. Hash credentials or require resets; don’t copy plaintext passwords forward. Compare record counts and scores, keep the JSON read-only until a restore is verified, then retire it. Back up SQLite with its backup API, keep daily and monthly copies plus an encrypted copy off the Mac, and test restoring one. SQLite alone does not add sign-in: I disagree with the data plan’s suggestion that real security can wait for the database ([FAMILY-DATA-PLAN.md](../../docs/product/FAMILY-DATA-PLAN.md:517)). I agree with the roadmap’s single `store.js` boundary ([ROADMAP.md](../../docs/product/ROADMAP.md:45)); I’d defer its much larger future schema.

### 4. Effort and risks

Roughly **5–8 developer days** for SQLite, the adapter, import, backup, and basic server-side access control. A later multi-family Postgres/Auth/RLS move is roughly **10–20 more days**, excluding legal and launch work. Main risks are auth mistakes, untested restores, and old question IDs or versions being unavailable for historic answers.
