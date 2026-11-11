# Making Home School a proper app anyone can install

Written 2026-11-10. The owner said: "after youll finish everything publish it to my personal github properly as proper service app which easy to make run on any pc. it should be proper app. think everything round it."

This is a plan, not built yet. It starts when the current work is done: the Children page, My day and XP.

## Where we are today (checked 2026-11-10)
- **The code:** the working repository is private. A clean public copy, without family notes, is at `zetwin/homeschool-tv`. It is about 100 MB, almost all of it pictures and voices.
- **No family data has ever been on GitHub.** `data/` was never committed.
- **Running it means being a developer:** you install Node, copy the project with git, and type a command in Terminal. Only the MacBook Air has an always-on setup (`tools/host/`), and it only works on a Mac.
- **It isn't safe for other families yet:**
  - Anyone on the home Wi-Fi can read the family data.
  - Passwords are stored as plain text.
  - A new copy starts with the login "parent", password "parent".
- **The project mixes the app with design labs** (`pad-lab`, `kid-lab`, `materials-lab`, `round1`, `prototype`). They're useful for us but don't belong in the app people install.

## What "a proper app" means here
A parent with no technical knowledge can do all of this:
1. **Download** one file for their computer from the GitHub page, with no Node, git or Terminal needed.
2. **Open it.** The browser opens a welcome page: name the family, create the parent's own password, add the children.
3. **Choose "Start with this computer".** It then runs by itself, like the Air does now: it starts when the computer starts and restarts if it stops.
4. **See the addresses** for the TV, iPads and phones, with a QR code to scan.
5. **Get updates** with one tap when a new version is out. The family data is never touched.
6. **Have backups made by themselves** every night, with "Download a backup" and "Restore" in Admin.
7. **Remove it cleanly,** while keeping their data if they want.

## How it would work (recommended)
| Part | Choice | Why |
|---|---|---|
| **The app file** | One program per system: Windows, Mac (Apple chip and Intel) and Linux, built from our server with Node's own "single executable" feature. It sits next to the lessons folder, packed as one zip per system on the GitHub Releases page | No Node to install. Nothing else to download. It's still the same server we test every day |
| **Starting by itself** | The app sets this up when the parent chooses it: on a Mac a login job (as on the Air), on Windows a task that starts at sign-in, on Linux a user service | Works without admin passwords on all three |
| **Family data** | In the user's own folder (for example `Documents/Home School data`), never inside the app folder | Updates and reinstalls can't touch it |
| **Updates** | The app checks GitHub Releases once a day. Admin says "Version 1.3 is ready", with an Update button. The old version is kept for one step back | Families stay current without help |
| **Backups** | The backup and update scripts are rewritten in Node so they work on Windows too. Nightly, 30 days kept, plus Download and Restore in Admin | Today's backup only works on a Mac |
| **Advanced option** | A Docker file for people with a home server | Optional, for later |

## What must be fixed before any other family uses it
1. **A sign-in the server checks:** today the server answers anyone. Each request must come from a signed-in parent or child, and a child sees only their own data.
2. **Scrambled passwords** (stored as hashes, so even we can't read them). Parents can still set and see a *child's* password, as now. For an adult, the parent makes a new password instead.
3. **A first-run welcome page,** with no default logins.
4. **Only the home network:** the server refuses visitors from outside the home Wi-Fi unless the parent turns that on (for Tailscale).
5. **A content check:** every picture, video, voice and text is checked by the `license-checker` helper before the app is shared beyond our family. YouTube clips must not be charged for or locked behind payment (`rules/COMPLIANCE-AND-LICENSING.md`).

## The GitHub page
- **README for parents:** what it is, a screenshot, the download buttons, the three steps, and what to do if something goes wrong. Plain words.
- **For developers:** `docs/SETUP.md` and `CONTRIBUTING.md`.
- **Version numbers** (1.0, 1.1 and so on), with a short "What's new" for each.
- **Automatic checks on GitHub:** every change runs the checks (`verify`, lesson checks). Every new version builds the downloads for each system by itself.
- **The labs move out of the app:** they stay in the repository for us, but aren't in the downloads.
- **Licence:** private and all rights reserved, unless the owner decides otherwise.

## Getting the downloads to families, with a private repository
A private repository's Releases page can only be opened by people invited to it. Families who just want the app shouldn't need a GitHub account. Options, to decide when we get there:
- **A second, public repository that holds only the downloads and the parent README,** with no code. Simple and free, but the download is public.
- **Send each family a link** to the download, for example from a shared cloud folder.
- **Invite each family** to the private repository. Each family then needs a GitHub account, which is the most work for them.

## Testing before calling it done
- **Clean install** on three real computers, from the download only:
  - the HP Windows laptop
  - the MacBook Air (after moving the family's data safely)
  - a Linux computer or a test machine
- On each one, check the whole flow: welcome, add children, a lesson with voice on the TV address, a test on an iPad, update, backup, restore, restart the computer, remove.
- Sound is checked by a person. Our test browsers are always muted.

## Order of work
1. Finish the current work (Children page, My day, XP).
2. Security first (the list above).
3. Separate the app from the labs.
4. Cross-platform backups, updates and start-by-itself.
5. Build the downloads, plus automatic checks on GitHub.
6. README and "What's new".
7. Test on three computers, then version 1.0.

## Questions for the owner
1. ~~Who will install it?~~ **Answered 2026-11-10: "Other families too".** So all of "What must be fixed before any other family uses it" is part of version 1.0, including the content check.
2. ~~Private or public on GitHub?~~ **Answered 2026-11-10: "Yes, keep private".** The repository stays private; people are invited as needed. Families who only install the app don't need a GitHub account: the downloads must reach them another way (see below).
3. **Which computers matter most?** The HP Windows laptop and the Macs, or Linux too?
4. **The Air:** move the family to the Air with this new app, rather than doing it twice?
