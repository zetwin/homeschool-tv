# Security

## Who this is for
Home School TV is a **family prototype**. It is built to run on one computer at home, on a home Wi-Fi the family trusts. It is not built to face the internet.

## Known weak points
These are known, written down, and planned to be fixed before any other family uses it:

- **Sign-in is checked only in the browser.** The server's data address (`/api/state`) does not check who is asking. Anyone on the same Wi-Fi can read or change the family data.
- **Passwords and PINs are stored as plain text** in one JSON file (`data/family.json`), and the example logins are written in the code.
- **No encryption on the Wi-Fi:** the server speaks plain `http`.
- **With `npm start`, the server listens on every network the computer is on.** Use `node tools/serve.mjs` (without `--lan`) to keep it to this computer only.
- **No backup** unless you set one up.

The plan to fix these is in [docs/product/RELEASE-PLAN.md](docs/product/RELEASE-PLAN.md) and [docs/product/FAMILY-DATA-PLAN.md](docs/product/FAMILY-DATA-PLAN.md).

## How to stay safe today
- Run it only on a home network you trust.
- Never forward its port on your router, and never put it on a public server.
- Use first names only. Don't store anything you wouldn't want someone on your Wi-Fi to read.
- `data/` is never committed to git. Keep it that way.

## Reporting a problem
If you find a security problem, please **don't open a public issue**. Use GitHub's private report instead: on this repository, open **Security**, then **Report a vulnerability**. Say what you found, how to see it happen, and what it could affect. You'll get an answer in plain words.
