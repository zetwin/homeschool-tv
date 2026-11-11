# Contributing

Thank you for looking. This is a family project that is still finding its shape, so **outside code changes aren't being taken yet**, and the code isn't licensed for reuse (see [LICENSE](LICENSE)).

You're welcome to:
- **Report a bug** or a wrong fact in a lesson: open an issue, say where you saw it, and what you expected.
- **Suggest an idea:** open an issue. Short is fine.
- **Report a security problem** privately: see [SECURITY.md](SECURITY.md).

## If you run it yourself
- Start with [the setup guide](docs/SETUP.md) and [the docs map](docs/README.md).
- There is no build step: change a file and reload the page.
- Lessons live in `channel/episodes/`. Check them with `npm run check:lessons`.
- Test in a hidden, muted browser: `node tools/browser-check.mjs <url> <script.js> <width> <height> [picture.png]`. Lessons have sound.
- Never commit anything from `data/`: it holds a family's names, logins and results.

## How the work is done
Every lesson follows [the lesson rules](docs/rules/LESSON-RULES.md), every test [the test rules](docs/rules/TEST-AND-EXAM-RULES.md), and every screen [the style guide](docs/rules/STYLE-GUIDE.md) and [visual hierarchy rules](docs/rules/VISUAL-HIERARCHY.md). Facts need a source; pictures and videos need a licence check first ([compliance and licensing](docs/rules/COMPLIANCE-AND-LICENSING.md)). Write plainly: many readers aren't native English speakers.
