# Setting up on another computer

Last updated: 2026-11-11. For a parent or a developer. Tested by cloning into an empty folder and starting it.

## 1. Just run the lessons
You need [Node.js](https://nodejs.org) 22 or newer, and nothing else. Voice files and pictures come with the project.

```bash
git clone https://github.com/zetwin/homeschool-tv.git
```
```bash
cd homeschool-tv
```
```bash
npm start
```

Open http://localhost:8080. On a TV or tablet on the same Wi-Fi, use the address the server prints. On Apple devices, the Mac's name also works and doesn't change, such as `http://your-mac-name.local:8080`.

**Keep that Terminal window open.** Closing it stops the server.

- **Family data isn't shared.** `data/` stays out of git, so a new computer starts with example children and test logins, shown under "Test accounts" on the sign-in page. Each copy has its own family data for now.
- **Safety:** with `npm start`, anyone on the Wi-Fi can read this copy's family data. Use it only on a home network you trust. Real accounts are in [the roadmap](product/ROADMAP.md). See also [SECURITY.md](../SECURITY.md).

## 2. Check a computer
```bash
npm run doctor
```
It says what's installed and what's missing, with the command to fix each. It changes nothing.

Before showing anything, with the server running:
```bash
npm run verify
```

## 3. Record or change voices
Only needed if you change lesson words. **Full guide: `product/VOICE-PLAN.md`.**
```bash
npm run voice:setup
```
```bash
npm run voice spanish-1
```
```bash
npm run voice:clean
```
The last one removes about 500 MB. On first use, the voice model downloads about 90 MB more.

## 4. For developers
| Read | For |
|---|---|
| `README.md` | What it is, and the project map. **Start here** |
| `CLAUDE.md` | How to work on it with Claude Code, and how to make a lesson |
| `docs/README.md` | The map of all project knowledge |
| `docs/product/ROADMAP.md` | The plan and open decisions |
| `docs/rules/LESSON-RULES.md` | How to make a lesson |

- **Branches:** `main` holds versions known to work. Daily work goes on `dev`.
- **Lessons:** `channel/episodes/<id>.js`. Check them with `npm run check:lessons`.
- **Screens to compare:** `/kid-lab/`. Check with `npm run check:lab -- <output folder>`.
- **Testing:** hidden and muted only, with `node tools/browser-check.mjs`. Lessons have sound.
- There's no build step yet: edit a file and reload the page.

## Install it as an app on an iPad or iPhone
1. Open the home server's address in **Safari**.
2. Tap the Share button, then **Add to Home Screen**, then **Add**.
3. Open it from the new icon. It runs full screen, with no Safari bars.

Sign in once more the first time: the icon keeps its own sign-in, apart from Safari. It still needs the home server running, and the same Wi-Fi.

### Spanish voice, Chatterbox (optional, only to record Spanish again)
```bash
python3.12 -m venv ~/.cache/homeschool-voices/chatterbox/venv
```
```bash
~/.cache/homeschool-voices/chatterbox/venv/bin/pip install chatterbox-tts "setuptools<81"
```
Then, with `npm run voice:setup` done, record takes with `node tools/voice/chatterbox-make.mjs spanish-1`, and build the lesson with `npm run voice spanish-1`. Remove it all with `rm -rf ~/.cache/homeschool-voices/chatterbox ~/.cache/huggingface/hub/models--ResembleAI--chatterbox`. Details: `docs/product/VOICE-PLAN.md`.

## A stable copy and a work copy (optional)
If you change the code while your family uses it, keep two copies apart:
- **Family:** `git worktree add .live main`, then `npm run live` serves `.live/` (the `main` branch) at port 8080 with `data/family.json`.
- **Work:** `npm run dev` serves this folder at port 8081, with practice data in `data/dev-family.json`.
- **Publish checked work:** `npm run release` runs the checks on 8081, moves `main` and updates `.live/`.

## An always-on home server (optional, Mac)
Any Mac that stays on and plugged in can be the school's server. In the project folder on that Mac:
```bash
bash tools/host/install-node.sh
```
```bash
bash tools/host/setup.sh
```
- `install-node.sh` puts its own Node.js in `~/HomeSchool-node`, checked against the published checksum.
- `setup.sh` installs three background jobs: the server on port 8080 (starts at login, restarts if it stops, keeps the Mac awake on the charger), a **nightly backup** of `data/` to `~/HomeSchool-backups/` (30 days kept) at 03:00, and a nightly update from GitHub at 04:00.
- **Give the Mac a fixed address** in your router, so the TV and tablets always find it. Apple devices can also use the Mac's name: `http://<mac-name>.local:8080`.
- **After a restart** with FileVault on, someone must sign in on the Mac once.
- **Moving to a new server:** stop the old one, then copy `data/family.json` and `data/family-log.jsonl` across.
- **Safety:** anyone on the home Wi-Fi can still read the family data. Home Wi-Fi only.
