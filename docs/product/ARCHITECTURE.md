# Architecture plan

Last updated: 2026-11-06. **This is the plan for a public service later, not how the code works today.** Today's code: `HOW-THE-CODE-WORKS.md`. Current plan: `ROADMAP.md`, which updates some choices here.

## Principles
- Curriculum is data, not page text. Any lesson can be traced to official objectives.
- Content is separate from presentation. Motion scenes render from a lesson file.
- Every asset records its source and license, and can be swapped or removed.
- Parents own accounts. Children only have profiles, with as little data as possible.
- Start simple: one web app, one database, no microservices.

## Overview
```
 TV browser ─┐
 Tablet ─────┼─► Web app (same code, three surfaces) ─► API ─► Postgres
 Laptop ─────┘    • TV channel                          │        ├ accounts, children, progress
                  • Child test / exam                   │        └ curriculum and content index
                  • Parent area                         ├─► Object storage + CDN: audio, images, video
                                                        ├─► Stripe: subscriptions per child
                                                        └─► Email: parent notices and reports
 Content studio (internal) ─► lesson files ─► review ─► publish a version
```

## Recommended stack
| Part | Choice | Why |
|---|---|---|
| Web app | TypeScript with Vite and React, keeping the GSAP scene engine | Our prototype's engine carries over; TV browsers need a light page |
| Hosting | Cloudflare Pages and Workers | Low cost and fast worldwide |
| Database | Managed Postgres (Supabase paid plan, or Neon) | Family data is relational; row-level security helps keep families apart |
| Media | Cloudflare R2 with CDN | Cheap to serve audio and video |
| Sign-in | Provider with email and passkeys (Supabase Auth, or Better Auth) | Parents only. Don't build password handling ourselves |
| Payments | Stripe subscriptions, with quantity = number of children | Standard per-seat billing, tax support and customer portal |
| Voice | Kokoro, for English and Spanish, recorded on our own computer. Settings in `tools/voice/voices.json` | Rendered once as audio files, so cost per view is nil |

The earlier idea of Cloudflare's D1 and avoiding Supabase applied to a free, single-family tool. A paid service can pay for a plan that doesn't pause.

## Data model

### Accounts
- `family`: billing owner, country, language, framework choice
- `parent`: sign-in identity, belongs to a family
- `child`: first name or nickname, school level, picture, unique username, hashed password. No email
- `device`: a remembered child device or paired TV, belongs to a family, can be removed
- `consent`: what a parent agreed to, when, and which policy version
- `subscription`: Stripe IDs, number of children, status

### Curriculum
- `framework`: for example "England National Curriculum", with version and source
- `node`: a tree of subject → strand → topic → unit → lesson → objective
- `crosswalk`: links between equivalent objectives in different frameworks, for example England KS3 skeleton ↔ NGSS MS-LS1-3

### Content
- `lesson` and `lesson_version`: published versions are never edited, so old results stay meaningful
- `line`: a spoken line with its timing and translations
- `scene`: scene type and data
- `asset`: file, source URL, author, license, attribution text, commercial-use status, reviewed-by, review date
- `video_slot`: provider (`own`, `oak`, `youtube`), external ID, start and end, whether it's allowed in the paid product

### Assessment
- `item`: a question, tagged to objectives and a difficulty level
- `assessment`: starter quiz, lesson test, re-test, unit exam, term exam, with its rules
- `attempt` and `response`: what a child answered, with automatic score
- `mark`: a parent's mark on written work, against a mark scheme
- Question types: choose one, tick several, dropdown in a sentence, write a word, number, written answer, true/false grid, slider, tap on a diagram, drag labels, match pairs, put in order. Each type draws itself, stores its answer and marks itself
- `review_schedule`: when re-tests are due per child and objective
- `mastery`: per child, per objective, calculated from responses

## Key flows
See `docs/product/HOW-IT-WORKS.md` for the whole flow in simple words.
- **One sign-in:** username and password for everyone. The account's role opens the parent dashboard or the child's My day. Child usernames must be unique, and the parent can reset child passwords. Lock after repeated wrong tries.
- **TV:** paired to the family by a short code, with a token that can only play lessons. The TV has no child identity and records nothing personal.
- **Together, then alone:** the episode plays on the TV. Tests and exams always happen on each child's own signed-in device. When the TV finishes, each child's My day shows the test. A later option: answer TV questions live from your own device.
- **Exams:** an adult's exam PIN starts an exam on the child's device.
- **Publishing:** draft → automated checks (asset licenses, missing audio) → fact check → parent or teacher review → published version.

## Bilingual design
Words live in translation files keyed by line ID. Each language has its own audio clips and manifest. Animation follows each line's real length, so it fits any language. Audio and captions can use different languages, for example English voice with Spanish captions. Kokoro's model covers Spanish, but the `kokoro-js` package we used appears limited to English voices, so Spanish needs a tested alternative.

## Migration from the prototype
1. Keep `channel/` running while the service is built.
2. Convert `episodes/*.js` data to the lesson format; keep the custom animations as code modules.
3. Replace browser storage with API calls.
4. Add sign-in, then families, then payments, in that order.

## Risks
| Risk | Plan |
|---|---|
| TV browsers vary | Test on real TVs; keep a casting or HDMI route; keep the page light |
| Paid product depends on YouTube | Core lessons must work without it. See the licensing doc |
| Children's data rules | Legal review, minimal data, no ads or tracking |
| Content cost | Reusable scenes and a repeatable production process |
| AI errors in lessons | Mandatory fact check and human review before publishing |
