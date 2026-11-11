# Independent review by Codex

Date: 2026-11-06. Requested by the owner. Codex read a chosen list of project files, read-only, and changed nothing. This is its opinion, and it says below what it didn't check.

## 1. Biggest risks today

The prototype is useful for one family, but it is not safe for a paid beta. In [store.js](../../channel/views/store.js), the default parent password and family PINs are stored in browser data. In [serve.mjs](../../tools/serve.mjs), `--lan` opens the server to the home network, and `/api/state` lets anyone who can reach it read or change family data without signing in. That data includes passwords, PINs and test results. The ignored `data/` folder keeps it out of Git; it does not protect it.

The code is also hard to change safely: [app.js](../../channel/app.js) is 743 lines and combines the player, screens, routing and video handling. The Colombia episode mixes lesson data, custom artwork code and hand-written styles. `.gitignore` also excludes every `package-lock.json`, which makes installed versions harder to reproduce.

Git shows one commit (`f6d70d6`) and `git status --short | wc -l` reports **152 entries**. I did not inspect those entries, so I can’t say what is changed or untracked.

## 2. Architecture: change and keep

Keep one application, one relational database, parent-owned accounts, child profiles without child email, versioned lessons, and the GSAP lesson engine. Those are sensible foundations.

Choose one managed service for database, sign-in and file storage first; Supabase is one option already in the plan. Add a separate hosting or media provider only for a clear need. Move tests and parent screens to TypeScript and React in small steps, while keeping the working TV player. Put access checks on the server so each family can only see its own records; browser checks are not security.

## 3. Migration order: first three steps

1. Choose the launch country, curriculum and initial subject. These are still open decisions and affect content, law and scope.
2. Define and validate one versioned lesson format. Convert the Colombia lesson and test first, including their sources and media rights.
3. Build one secure end-to-end beta path: parent account, child profile, TV pairing, one lesson, one child-device test, and saved result. Try it on the real TV, tablet and phone. Add billing after the privacy and legal gates are clear.

## 4. Make lessons and tests cheap to create

Keep the reusable scene types and question types. Put lesson content in a structured editor or data file, not custom screen code. Each fact should carry its source, each asset its license, and each question its objective, answer and explanation. Add automatic checks for missing sources, invalid answers, missing audio and broken media, then keep human fact and rights review.

One visible warning: the Colombia test asks children to pick “the three countries” bordering Colombia, but its explanation lists five and the choices omit Panama and Ecuador. That is the kind of confusing item a simple review checklist should catch.

## 5. Reach a premium look

Use Figma to compare a few real visual references and prototype the same screens at TV, tablet and phone sizes. Choose one direction and define its type, colors, spacing and reusable parts before coding. Then use Tailwind and shadcn/ui for the test and parent screens, as the style guide proposes. Keep the lesson’s distinct TV feel and GSAP motion; a component library is a starting point, not the finished design.

## 6. Important gaps

The YouTube episode loads a thumbnail from YouTube and embeds its player. Treat that as a child-privacy and licensing decision: confirm the current terms and legal requirements before paid use, and make sure lessons still work without YouTube. The project already says paid use needs written approval and that children’s data needs legal review; those are launch blockers, not later polish.

I did not read the data folder or any files outside your list. I did not run the app or tests, inspect the 152 Git entries, verify lesson facts against outside sources, test on devices, or check current YouTube terms or child-privacy laws.
