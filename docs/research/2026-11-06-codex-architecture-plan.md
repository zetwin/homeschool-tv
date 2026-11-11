> **Note from Claude, 2026-11-06:** an independent review by Codex, kept as it wrote it. It isn't an agreed plan. My checked version, including where I disagree, is in `docs/product/ROADMAP.md`. After this was written, the owner removed Mission Deck and Metro Line from the lab.

Home School TV has not been started the wrong way for a family prototype, but the current browser storage and Mac JSON server are the wrong foundation for a paid service. Keep the TV lesson player, reusable question types, existing lesson work, and voice and picture files as a demo base. Replace the client-only sign-in and whole-family file API before adding more real family records. The two-parent Control Center is well described in the product notes and the lab now contains six parent looks, but those are still visual samples, not working screens. First make one family demo dependable; then build one secure family from TV pairing through child marks. Do not start billing, a broad lesson catalogue, offline edits, or permanent selection among all the lab looks yet.

# Home School TV: independent architecture review and plan

## 1. What I checked

I read the requested material: CLAUDE.md; docs/README.md; docs/product/HOW-IT-WORKS.md, PRD.md, ARCHITECTURE.md, BUSINESS.md, SCHEDULE-AND-DIARY.md and HOMEWORK.md; docs/log/DECISIONS.md, LEARNINGS.md and TASKS.md; docs/rules/COMPLIANCE-AND-LICENSING.md and LESSON-RULES.md; and the earlier review at docs/research/2026-11-06-codex-review.md. I also read docs/product/FAMILY-DATA-PLAN.md, docs/product/PARENT-CONTROL-CENTER.md, docs/research/2026-11-06-kid-design-polish.md, and the related screen, video, test, accessibility and licensing rules referenced by the project.

For code, I read channel/app.js, channel/index.html, the requested channel/views/ files, channel/episodes/spanish-1.js, channel/curriculum.js, tools/serve.mjs, tools/voice/generate-mixed.mjs, tools/kid-art/, and channel/kid-lab/index.html, plus the relevant browser and lab-check scripts.

I did not open or search inside data/. I did not run the app, browser checks, tests, voice generation, image rendering, or a live Wi-Fi or hosted-copy check. I changed no code and made no commit. I am editing only this report.

**Repository snapshot:** the checkout visible for this review has eight commits, and its working tree was clean before I edited this report. The target report file was already tracked. This conflicts with the owner's note that the repo has one commit and many uncommitted files; whether that note describes another checkout or an earlier state is unverified. Confirm the intended branch and any unsaved work before implementation begins.

I use these labels below:

- **Verified:** visible in the current files I read.
- **Recommendation:** my proposed design, not something the code already does.
- **Assumption / unknown:** needs a product choice, a live check, or local legal advice.

### Verified facts that shape this review

- channel/app.js is 940 lines and combines the TV home/player, scene renderers, narration timing, video behavior, lesson completion, and the TV-to-test handoff. channel/index.html is 1,528 lines, with most styling inline and scripts loaded in a fixed order.
- There are already separate files under channel/views/ for the child, parent, diary, timetable, questions, exam, themes, and other screens. The project is not literally one file, but the main player and the page shell still depend on shared browser globals and load order.
- tools/serve.mjs reads and writes one JSON file. It binds to 127.0.0.1 by default, so another device cannot reach it. --lan binds to 0.0.0.0, which exposes the unauthenticated HTTP API to the home network. /api/state returns the whole saved family object and has no sign-in check.
- channel/views/store.js keeps a copy in localStorage, compares sign-in details in the browser, and sends whole settings sections to the server. A failed save is ignored by the screen. Parent and child credentials are stored as readable text. The prototype sign-in page and child settings page can display credentials; I am not reproducing any values here.
- channel/views/student.js saves lesson-test scores and the positions of missed questions, but not the child's full answer or the version of the question they saw. Retests look up questions by those old positions.
- channel/views/exam.js has one exam definition in code. It stores answers by question position and calculates totals using the exam as it exists today. Its adult exam code is exposed in the prototype screen. Parent marking replaces fields in the exam record; it does not keep who changed a mark or its earlier value.
- channel/views/diary.js stores the weekly signature as a date, not as a named adult. Homework, class completion and marks are editable fields in the same school record. channel/views/schedule.js works out old dates from today's timetable, so a timetable edit can move a past class.
- A TV lesson is recorded as watched for the whole family; a child signed into their own device gets a child-specific record. The TV cannot tell which child was in the room.
- The current kid lab has three retained examples plus eight newer child layouts (My Room, Island, Mission Deck, Now Playing, Metro Line, Day Dial, Stories and Backpack). channel/kid-lab/parents.js adds six parent concepts: Class Register, Lesson Console, Day Planner, Inbox, Kids Board and Control Room. These are lab views with sample content and inert sample controls; they do not use live family data. The parent sample covers Home, During a lesson and Marking, but not weekly diary signoff or a working Admin page.
- Three of the newer child concepts have rendered 3D art scenes in tools/kid-art/. The renderer saves images for the lab, so a child's device does not need to run 3D. This is a sound way to keep the device app light.
- The real child app has 14 CSS-token themes, but the themes mainly change color, shape and type. They do not select the different screen structures in the lab. The six parent looks are not in the real parent app.
- channel/views/parent.js is a multi-page parent cabinet. It mixes learning and account pages. Its billing screen says it is a sample and does not charge anyone. There is no two-parent identity, teacher assignment, shared job claim, live TV remote or named action history in this app.
- channel/views/questions.js is a valuable reusable question-rendering module. Question answer rules are delivered to the browser, which is acceptable for practice but not for an exam whose answers must stay hidden.
- channel/episodes/spanish-1.js is structured as lesson and scene objects with beats, captions, audio parts, question data and references to custom art code. It is a useful content prototype, but lesson data is still executable JavaScript coupled to global renderers.
- speak() in channel/app.js uses the voice manifest when present. If an entry is missing, it waits for an estimated time without playing a clip. If a requested clip errors, it shows a warning and continues. channel/app.js also labels the non-local preview as having no voice in newer lessons. This explains how a partial media copy can look as if it finished while silent; it does not prove which online copy is live or why the reported copy is missing voice.
- The current code has no persistent app mute control I could identify. It reuses one audio player and starts a silent clip to work around browser sound-start rules. The report that a test left voice muted is real owner feedback, but its exact code cause is **unverified** without reproducing it on the target device.
- tools/voice/generate-mixed.mjs creates per-beat MP3s and a manifest; the working audio files are temporary. Its cleanup is at the normal end of the job, not in a finally block. tools/kid-art/render.mjs does clean its browser profile and server in finally. The render and capture scripts can write large outputs.
- tools/browser-check.mjs already uses a new hidden, muted Edge profile and does not use the owner's visible browser. tools/lab-check.mjs checks layout bounds and image loads in a hidden browser, but saves a screenshot for every case and ends with exit code 0 even when it printed problems. It also has no finally around all browser/profile cleanup. Do not treat it as a reliable green CI gate in its current form.
- docs/product/ARCHITECTURE.md and FAMILY-DATA-PLAN.md already propose a sensible single web app, managed Postgres, object storage, per-child Stripe billing, immutable lesson/question versions, and separate parent identities. They are plans, not code. PARENT-CONTROL-CENTER.md says the idea is agreed but no part is in the real app. The existing family data plan is a good base to refine.

**Not checked live:** the current hosted copy, the owner’s actual Wi-Fi and router settings, actual free disk space, how the mute issue occurs, the TVs and tablets the family uses, where the business will be registered, and the price or currency.

## 2. Verdict: what to keep and what to change

| Part | Verdict | Practical reason |
|---|---|---|
| Plain HTML and JavaScript | **Keep for the prototype and the isolated lesson player; do not keep it as the growing app architecture.** | It got a moving TV lesson on screen quickly. It is now harder to change safely because screens share globals, the order of script tags matters, and there is no type check before shipping it. |
| Large app.js and index.html | **Split gradually. Do not rewrite all lessons to a new framework at once.** | The app already has useful view files, but the player file owns several unrelated jobs and the HTML is also a large style sheet and app shell. A build step should catch missing imports and bad data before the browser opens it. |
| Lessons as JavaScript files | **Move lesson text and scene lists to versioned data with a checked format. Keep renderer code in shared modules.** | Today a lesson can contain executable code and custom art functions. That is flexible for one developer, but it makes content review, version history, reuse and automated checks harder. |
| JSON file store | **Discard it as the live source of truth. Keep only as a local demo/export format.** | One whole-family file has no user-level permissions, audit history, safe simultaneous edits, or built-in backup. An old browser can replace newer settings. |
| Voice and images as files | **Keep binary media as files. Move published files to versioned object storage/CDN.** | Audio, images and video do not belong in database rows. The problem is not “files”; it is that missing or mismatched files are not a release failure. |
| Reusable question types | **Keep and make them a formal contract.** | questions.js already has reusable interactions and fits the request for many question formats. Questions need stable IDs and versions before attempts rely on them. |
| Current child screens and themes | **Reuse the useful behavior, not every visual variant.** | My day, diary, lessons, to-do and marks are a good first map. The real themes are token changes, while the lab contains different structures; those are two different systems today. |
| 3D rendered art | **Keep as an optional art-production tool.** | Rendering once to JPEG/PNG avoids device GPU and battery cost. It should not make each child layout a new software product. |
| Current parent area | **Keep pieces of the diary, schedule, gradebook and marking flow; replace its navigation and access model.** | Its ten-section cabinet is exactly the mixed admin/teaching area the owner now wants to separate. It is not two-parent software. |

**Blunt verdict:** the project began in a reasonable way for a one-family visual prototype. It becomes the wrong start if more real family data, multiple parent identities or paid accounts are added to the present local storage and Mac JSON server. A rewrite from zero is not needed. A clean boundary is needed before the next major feature: stable browser player, typed app screens, versioned lesson content, server-owned family data.

## 3. Recommended stack

**Recommendation:** one codebase, one web app, one managed database and a small number of managed services. Avoid separate apps for every screen, microservices, a local Docker stack, and a custom login provider.

| Area | Use | Why | Rejected alternative |
|---|---|---|---|
| Front end | TypeScript, Vite and React for sign-in, child app, Control Center and Admin. Keep the current GSAP lesson stage as a separate module and reuse it. | Type checking catches wrong fields and missing screen data early. React makes shared tabs, forms and state easier to maintain. Vite builds a small static app without a server-rendering layer. | More plain global JavaScript: fastest for one experiment, already causing coupling. Next.js: adds server-rendering and server conventions this app does not need. |
| TV | Same browser-based lesson player at a TV route. TV shows the lesson; teacher's paired phone/tablet controls it. Keep HDMI/laptop as a fallback. | One lesson player to maintain. TV remains a display, not a second app with its own records. | Native Samsung/LG/Roku apps: separate toolchains, stores and remote-control problems for one person. |
| Tablet and phone | Responsive web app, installable as a PWA if the family wants an app icon. One app serves parent and child roles. | One release covers iPad, Android tablet, iPhone and Android phone through their browser. | Native iOS and Android apps now: too much build, release and support work before offline use or notifications are proven necessary. |
| Back end | Supabase Auth, Postgres and server-side Edge Functions for child-device pairing, TV pairing, billing webhooks and sensitive actions. Keep ordinary reads/writes behind verified database rules. | One provider gives a managed database, adult sign-in and server functions. It removes the Mac as a production server and supports transactions and backups. | A custom server on the Mac: it must be awake, reachable and protected. Neon plus a separate auth provider plus Cloudflare Workers: more accounts, secrets and handoffs for one developer. |
| Database | Managed PostgreSQL with SQL migrations checked into Git. | Families, adult links, subjects, assignments, dates and marks are related records that need history and access rules. | JSON file for production: no safe access boundaries or history. SQLite: excellent for a local prototype, but not my choice for this multi-family service. |
| Sign-in | Each adult gets a separate managed account and accepts an invitation. A child gets a no-email profile, linked only to their family and device. A parent pairs the child device; the server issues a child-only session with rate-limited, parent-resettable sign-in. | Adults must be distinguishable for marks and signatures. A child account needs to work without an email address. This plan keeps a child's identity limited while still recording who acted. | Shared parent login: cannot identify who did anything. Child password or PIN checked only in browser: can be bypassed and exposes credentials. |
| Payments | Stripe Billing with one subscription per family and quantity equal to billable children. Use its hosted checkout/customer portal and a server-verified webhook. | It matches one payer and a per-child monthly price. Do not send child names, marks or answers to Stripe. | Building card collection; app-store billing before native apps; manual invoices as the normal signup flow. |
| Audio and image files | Cloudflare R2 for published, immutable, public lesson assets with a custom asset domain and long cache. The database stores asset IDs, hashes and rights records, not image or audio bytes. Keep small source content and manifests in Git. | R2 has no internet egress charge and includes a small standard-storage allowance. A shared lesson library costs the same at one and 1,000 families. | Serving production media from the Mac or bundling every large file into the app build. Supabase Storage is possible, but it puts large public media in the same bill and operating surface as family records. |
| Video | Cloudflare Stream only for videos we own or have licensed for this paid use. Keep still images or animation as a valid lesson fallback. | It handles encoding and streaming without us building a video pipeline. Cost follows stored and watched minutes. | Core lessons depending on YouTube embeds. YouTube's API rules prohibit charging people to watch embedded YouTube content or requiring an action beyond choosing play. YouTube can remain a separately reviewed optional link only if the product flow and terms allow it. |
| Voice pipeline | Generate voice before release. Keep script text, voice and timing in lesson data; make MP3s plus a manifest in a repeatable job. Use the current Kokoro path only after its full package/model/dependency license review; the current project marks Apple voices as prototype-only. | Predictable playback, works without on-demand generation and easy to check before release. Do not generate speech on a child's device. | Runtime TTS: internet delay, variable sound and ongoing use costs. Do not assume an open model or a Mac's built-in voice is cleared for selling. |
| Tests | Small TypeScript unit tests for date/score/content rules; asset validation using ffprobe; Playwright hidden-browser checks for child/parent/TV flows; database access-policy tests in CI. | Each tool checks one failure class. The real website runs in a separate hidden browser without touching the owner's open browser. | Relying on visual inspection alone or the current lab script's exit code. Do not add a large all-device test matrix before the core flow works. |
| Hosting and release | Cloudflare Pages for the static app, Supabase for data and server functions, GitHub Actions for checks and deployment. Keep staging and production separate. Deploy the exact checked build; do not build or serve production from this Mac. | This keeps the browser app static and moves uptime, backups and access control off the home computer. | A hand-copied online folder that may omit voice files; a local --lan server presented as production. |

Supabase Pro currently starts at $25/month and includes one project; extra projects are listed from $10/month. Pro includes daily backups retained for seven days, 8 GB database disk, 250 GB egress and 100 GB file storage. The Free plan can pause after inactivity, so I would not rely on it for a family release that stores the family's only copy of results. [Supabase pricing](https://supabase.com/pricing)

Supabase also warns that every exposed table needs row access rules and the right table permissions. Those rules must be written and checked per action; putting the word “family” in a URL is not protection. Never put a server secret in the browser. [Supabase row-access guide](https://supabase.com/docs/guides/database/postgres/row-level-security)

### Costs for one, 100 and 1,000 families

These are **planning examples, not quotes**, checked on 6 November 2026. Prices are in USD per month. The example assumes:

- One production and one small staging Supabase project: $25 for Pro plus $10 for the second project.
- One shared library holding up to 2,000 minutes of Stream video: $10.
- R2 use stays under the first 10 GB and normal free request allowance: $0.
- Each family watches 300 minutes of video per month across its children. Stream delivery is $1 per 1,000 minutes.
- No unusually high database use, extra compute, email provider, domain, taxes, legal, artist, monitoring, support or payment fees.

| Families | Supabase prod + staging | R2 | Stream storage | Stream delivery assumption | Example total |
|---:|---:|---:|---:|---:|---:|
| 1 | $35 | $0 | $10 | $0.30 | **$45.30** |
| 100 | $35 | $0 | $10 | $30 | **$75** |
| 1,000 | $35 | $0 | $10 | $300 | **$345** |

Cloudflare's current Stream price is $5 per 1,000 stored minutes and $1 per 1,000 delivered minutes. With no owned video library, remove the $10 storage line and the per-minute delivery line: the example managed app/database floor is about $35/month for staging plus production. If each of three children separately watches 300 minutes, use 900 rather than 300 minutes per family; at 1,000 families that would make Stream delivery $900/month, not $300. Video viewing is the biggest unknown in this example. [Cloudflare Stream pricing](https://developers.cloudflare.com/stream/pricing/)

Cloudflare R2 lists 10 GB-month, one million Class A requests and ten million Class B requests free each month, then $0.015 per GB-month for standard storage; it does not charge internet egress. Cloudflare Pages static requests are free, but a free site has a 20,000-file limit and a 25 MiB limit per file. Put large media in R2 instead of turning the Pages site into a media bucket. [R2 pricing](https://developers.cloudflare.com/r2/pricing/) [Pages limits and static requests](https://developers.cloudflare.com/pages/platform/limits/) [Pages functions pricing](https://developers.cloudflare.com/pages/functions/pricing/)

Payment processing is separate from the totals. The launch country, currency, family price, tax handling and merchant account are not known. As a conditional UAE example only, Stripe currently lists domestic cards at 2.9% plus AED 1, international cards with another 1%, currency conversion with another 1%, and Billing pay-as-you-go at 0.7% of Billing volume. Do not use those fees unless the company actually bills through a UAE Stripe account. [Stripe UAE pricing](https://stripe.com/ae/pricing) [Stripe UAE Billing pricing](https://stripe.com/ae/billing/pricing)

At 1,000 families, these services may still fit their included usage. That is not proof the product will be fast or reliable. The app must stop polling and transferring the entire family state, use small scoped requests, and pass a real load check before paid beta.

## 4. Data entities and links

The existing FAMILY-DATA-PLAN.md already has most of this model. Refine that document; do not start another competing model. The table below describes what I recommend storing. IDs are stable IDs, and all records have created_at; mutable records also have updated_at. Do not keep more child information than the service needs.

| Entity | Fields in brief | Links |
|---|---|---|
| **Family** | ID, country, language, time zone, curriculum, created date, status | Parent group, children, settings, subscription |
| **Adult account** | Auth provider ID, name, email, language, active/disabled date | Family membership, child links, teaching assignments |
| **Family role** | Family, adult, role (account holder, teacher), start/end dates, who granted it | Family and adult; one active account holder per paid family |
| **Parent-child link** | Adult, child, relationship, allowed visibility, active/start/end dates, who linked them | Separates permission to see a child from paying or teaching |
| **Teaching assignment** | Adult, child, subject (or all), start/end dates, who set it | Controls who leads and marks work; old assignments remain dated |
| **Invitation** | Family, invited email, role offered, child/subject access, secure token hash, expiry, accepted/cancelled dates, inviter | Family, adult and proposed links |
| **Child profile** | Family, nickname, school year, avatar, chosen child look, active/deleted date | Family, parent links, login, work records |
| **Child login/device session** | Child, username alias or paired-device ID, secret hash/token ID, failed tries, lock date, expiry, reset actor/date | Never stores a readable password in the child profile |
| **Curriculum framework and version** | Name, country/authority, version, source URL, effective dates | Subjects and published content |
| **Subject** | Name, display order, color, kind (lesson/activity) | Framework, teaching assignments, timetable |
| **Strand / topic / unit** | Name, stable ID, order and version as needed | Parent level: subject → strand → topic → unit |
| **Lesson identity** | Stable ID, title, order, publication status | Unit, objectives, versions |
| **Lesson version** | Version number, schema version, caption/voice language, publish date, content hash | Lesson, scenes, assets, objectives; never edit after publication |
| **Lesson scene** | Version, position, scene format, scene fields, beat IDs, text, timing | Lesson version, format renderer, question/activity if any |
| **Objective** | Stable ID, wording, official/extra flag, framework source and version | Lesson versions, question versions and reports |
| **Asset** | Stable ID, file path, content hash, media type, dimensions/duration, language | Lesson version and scenes |
| **Asset right/license record** | Asset, owner/source, license name/version, source URL, required credit, paid-use status, permitted territory, review date, expiry/restriction | One or more assets; block publishing if rights are unknown |
| **Teacher lesson notes** | Lesson version, teacher-only prompt, question to ask, expected answer, answer notes | Visible only to assigned adults; never placed in child lesson data |
| **Question identity** | Stable ID, question type, difficulty and objective links | One or more question versions |
| **Question version** | Version, wording, choices, correct answer, explanation, mark scheme, image/asset, author and publication date | Question identity and objective; do not alter after use |
| **Assessment identity/version** | Kind (starter/test/retest/exam), rules, time limit, question order, question versions, total marks | Lesson or unit; a published paper is frozen |
| **Attempt** | Child, assessment version, started/finished times, status, score, total, scale, device | One assessment version; immutable once submitted |
| **Answer** | Attempt, question version, exact answer payload, time, auto score and scoring-rule version | Attempt and question version |
| **Mark revision** | Answer or homework item, mark, scale, feedback, adult who marked, time, reason, replaced mark ID | Each correction adds a row; it does not overwrite the old mark |
| **Exam sitting** | Attempt, adult who started it, start/end time, rules, one-attempt status | Attempt, adult, exam version |
| **Subscription and billing event** | Family, provider IDs, child quantity, price/currency, state, dates; webhook event ID | Family only; no child name or learning record sent to payment provider |
| **School settings** | Family, school year start, day start, class length, mark scale, effective date, setter | Family; settings version |
| **Timetable version and slot** | Family/child, effective from/to dates, weekday, period, time, subject, lesson/unit | Timetable version; previous versions remain readable |
| **Day off / school event** | Family/child, date range, reason, added/removed by and time | Changes future dates only; never silently moves a past diary record |
| **Class occurrence / diary entry** | Child, actual date/time, subject, lesson version or activity, class state and actor | Frozen instance from timetable; homework, submissions and signoff |
| **Homework item** | Text/type, set by, due date, status, completed date, child response, adult mark link | Child and class occurrence; each edit/completion records actor |
| **Weekly diary signoff** | Child, week, note, adult signer, signed time, snapshot/hash and later amendment link | One signed record per child/week; later edits show as amendments |
| **TV lesson session** | TV device, teacher who started it, lesson version, start/end, current scene, commands and connection status | Device and lesson version; teacher remote controls it |
| **Attendance / participation** | Child, TV lesson session or child device, how confirmed, time | Child and session; never infer attendance only from a family TV finishing |
| **Watched lesson record** | Child or household display, lesson version, start/completion time, device | Child's record only when identified; session can say “TV played” without claiming every child watched |
| **Device and pairing** | Family, type (TV/tablet/phone), name, paired by, created/last-used/revoked dates | Child device can be limited to a child; TV has playback-only access |
| **TV pairing token** | Hashed one-time code, expiry, family, TV device, paired by, revocation | Short-lived; code itself is not a reusable password |
| **Policy version and consent** | Policy/version text hash, parent/child/purpose, accepted/withdrawn dates, guardian who agreed | Keep what was accepted and when; get local privacy advice on exact records |
| **Job and job event** | Child/subject, kind, due date, status, claimant, completed by, timestamps | Jobs for marking, homework, exam, weekly signoff; every claim/release/change has an actor |
| **Handover note and read receipt** | Child, optional subject, text, author, recipient, created date; reader and time | Adults only; corrections are new notes, not silent edits |
| **Audit event** | Actor (adult, child, system), action, record ID, before/after reference, time, device/session | Append-only safety record; do not use it instead of the actual mark or diary history |
| **Theme definition/version** | Stable look ID, version, surface (child/parent), supported screen sizes, layout components, token set, asset refs | Each child's selected look; adult's preference can be separate and private |
| **Email notice/outbox** | Recipient adult, job ID, sent/delivery status and time | Never send a child's mark or answer in notification text |

### What must keep history so an old mark cannot change

1. **Published lesson and question versions:** the exact lesson, scene text, asset hashes, question and answer key a child saw.
2. **Published assessment version:** the exact paper order, scoring rules, maximum marks and scale used.
3. **Attempt and answer:** exact answer payloads and score at completion. Never recompute an old result against today's question file.
4. **Adult mark:** each mark and correction with the adult, date, old value and reason. The newest revision is current; older ones remain available.
5. **Timetable and diary:** date-effective timetable changes, and frozen class occurrences for dates already reached. A past lesson cannot move because the future timetable changed.
6. **Weekly signature:** signer, time, note and the state signed. A later correction appears as an amendment.
7. **People, assignments, consent and rights:** record when links and duties changed, when consent was withdrawn, and which asset license allowed each published lesson.
8. **TV playback versus child attendance:** keep a TV session separate from each child's attendance. Do not create child learning history by guessing who was in the room.

## 5. Screens and end-to-end flows

The proposed experience is the right product shape. The existing screen implementation is not there yet.

### Child flow

1. A parent creates the child in Admin, chooses their school year, creates a private sign-in and pairs that child's device.
2. The child opens My day: one next lesson, warm-up, test due, diary and marks in a tab bar. Long lists can scroll inside their own page.
3. The child starts a lesson on their own device or responds to a paired TV session. If the TV plays for the whole room, the child or parent confirms who is present before the app claims the child attended.
4. After the TV lesson, the child's own device shows their test. Attempts save the exact question version and full answer payload.
5. Diary and homework show the actual due date; marks show the scale and who marked written work. A correction does not replace the old mark without a record.

**Current hole:** the child app already has Today, Diary, Lessons, To do and Marks, but it uses browser sign-in and shared family state. It records a family TV watch against every child's eligibility. That can offer a test to a child who was absent. Tests and exams are browser screens, not server-owned records. The current phone/tablet route is not securely paired to a TV session.

### Teaching-parent flow: one daily Control Center

1. **Before class:** one daily page shows the next class, assigned teacher, preparation note, each child's status and the shared job list.
2. **During class:** the teacher taps Start on the paired TV. The teacher's phone/tablet becomes the remote for pause, play, chapter and back/forward. Private notes, answers and discussion questions are on that device only.
3. **After class:** results appear per child. The teacher marks written answers in place, sees shared mistakes and can claim or hand back a job. Each action shows who did it.
4. **End of week:** one action signs each child's diary with the adult's identity, time and the exact note signed.

The one-page experience should stay focused on today's work. “One screen” should not mean squeezing every mark, timetable and account setting onto a tiny phone display; open the selected job in the same daily workspace and leave rare setup in Admin.

**Current hole:** the parent cabinet has Dashboard, Gradebook, Marking, Diaries, Timetable, Children, Program document, Learning plan, How it works and Plan and billing. There is no real Control Center, teacher assignment, second parent, job claim, parent handover or actor identity. Weekly signoff saves a date only. The lab's six options are useful comparisons, but their remote, mark buttons and parent chooser are example artwork, not connected controls. They also lack a weekly signoff screen. The existing parent design note says a payer-only parent gets a weekly summary; the owner's newer instruction says Admin holds account management only. I recommend no child-learning summary for a payer who has no separate child link.

### Admin flow

Admin is entered from a small settings button. It contains family name/country/time zone, plan and payment, parent invitations and roles, child accounts and device access, consent/privacy/export/delete, and school-year settings. It does not contain day-to-day lesson teaching or marking.

The account holder is one billing role, not automatically the legal parent of every child or the teacher of every subject. A child link controls whose record an adult can see; a teaching assignment controls who can teach or mark. This matters for families with two homes or one payer who does not teach.

**Current hole:** account setup, payment, invitation and child-device management are sample text or absent. Learning plan and timetable settings currently live inside the parent cabinet.

### TV flow

1. The TV displays a short pairing code. A parent confirms the TV on an already signed-in device.
2. The TV gets a limited playback token for that family. It has no child identity and cannot read marks.
3. A teacher selects the lesson and controls the TV from the paired tablet/phone.
4. At the end, the teacher or each child confirms who took part. The TV does not silently mark every child as present.
5. The child's own device receives the correct test and personal result.

**Current hole:** the TV QR after a lesson opens the test or sign-in link. It is not TV-to-phone pairing. tools/serve.mjs can expose the entire state API on the home network in plain HTTP if started with --lan. The player's CAN_EMBED check is based on host names and IP patterns, not a secure family pairing or reliable video rights check.

### Which lab looks to carry forward

The six parent concepts are worth keeping as a comparison lab. For the actual screen, I would combine **Lesson Console**'s teacher notes and remote with **Class Register**'s glance at all children and the job list. I would not start from **Control Room**'s “stuck for four minutes” alert unless the product can explain exactly what it tracks and parents can turn it off. Do a task test with the two parents on the real tablet and phone before picking colors and art.

## 6. Modular architecture that stays cheap to change

Use one repository and one web application. Keep the module boundaries plain; do not make a multi-service platform.

Suggested folder map:

```text
src/
  app/                 routes, layout, sign-in entry
  auth/                adult session, child session, permissions
  family/              family, parents, child links, invitations
  child/                My day, diary, homework, tests, marks
  control-center/       teacher day, jobs, notes, marking, signoff
  admin/                plan, payment, people, privacy, school year
  tv/                   pairing, player screen, remote session
  player/
    engine/             scene timing, captions, player controls
    formats/            title, photo, number, prompt, recap, video...
  assessment/           stable questions, attempts, answer/mark handling
  themes/               child and parent look packages
  api/                  small typed calls to server
content/
  curriculum/
  lessons/<lesson-id>/v1/lesson.json
  assessments/<assessment-id>/v1/paper.json
assets/
  source/               source artwork, captions, rights records
supabase/
  migrations/
  functions/
  tests/
tests/
  unit/
  browser/
```

One TypeScript project and one Vite build are enough. Do not split these folders into separate deployable applications until there is a real team or scaling need.

### Lesson format

A lesson file should be plain data. Example shape:

- lesson ID and version;
- curriculum references and objectives;
- ordered scenes with stable scene IDs;
- each scene has a known format and its text, timing and asset IDs;
- narration references identify voice and language;
- question and answer data refers to a frozen question/assessment version;
- every asset points to its rights record.

A small TypeScript type plus schema validator rejects missing fields, unknown formats, bad image paths and broken question references. A new format adds one renderer under player/formats/ and the format's own tests. It does not require editing the whole player or writing a new custom lesson engine. Keep exceptional lesson art as a shared renderer plugin, not an executable function hidden inside a content file.

The current scene registry and reusable question components are a good starting point. Convert one lesson first; do not convert every episode before the player has a stable format.

### How a look plugs in

A look is a separate package with a manifest: look ID/version, audience, supported screen sizes, screen structure, type/colors/shapes and optional art assets. It receives the same page data and returns the layout. It cannot own scoring, permissions, diary rules, TV pairing or job state.

All looks use the same named actions and must show the same required controls. A look may arrange the screen differently, but “Start class”, “Pause”, “Mark answer”, “Sign week” and “Open Admin” have one shared behavior. Child and parent selections are separate. Store the selected look ID/version, not copied CSS in a child profile.

Use the lab to compare complete tasks, not only the opening page. The current 8 child plus 6 parent designs are good candidates for that test. Keep one stable default for the first family release; at most expose two reviewed looks per audience after the actions pass tests. Do not turn every concept into a permanent selectable theme before children and parents try them.

## 7. Reliability: smallest useful automatic checks

The first goal is that every checked build either has every required asset and works to the end, or fails clearly before the family opens it.

### One command, hidden browser, no approval

Create one future command such as **npm run verify** that runs in this order:

1. Validate every lesson/assessment file and all references.
2. Check every required MP3 is in the manifest, exists in the built output, has a valid audio stream and a sensible duration. Do not accept “the player advanced on a timer” as success.
3. Check the build contains all referenced images, fonts, icons, voice files and licensed video fallbacks.
4. Start a test-only server and run the browser checks in a fresh hidden profile. Launch with browser-level mute, run one worker, collect page errors and failed requests, and delete the profile and test data in finally.
5. Save screenshots and traces only on failure. Put output under a temporary directory; cap its size and clean it afterwards.
6. Fail with a non-zero exit code on any bad asset, page error, clipped control or failed flow.

Playwright runs headless by default and can install only its Chromium headless shell, which avoids a second full browser download on a space-limited Mac. It can also run with one worker. Use the already installed Edge on the Mac if the team wants to avoid another local browser download; CI can use a pinned Chromium version. [Playwright browser installation](https://playwright.dev/docs/browsers) [Playwright test command](https://playwright.dev/docs/test-cli)

The current tools/browser-check.mjs is a useful small hidden-browser helper. The current tools/lab-check.mjs is a useful layout-check prototype, but must not gate a release until it fails on its reported problems and always cleans up after an error. I did not run either script.

### The four failure checks the owner asked for

| Failure | Automatic check |
|---|---|
| Voice missing, silent or left muted after test | Before browser: validate all manifest entries and decode every audio file. In browser: every narrated beat requests the expected file; no failed audio event; the actual audio element is not app-muted and has non-zero volume after the quiz. Keep browser output muted so the check does not make sound. Also play one real clip muted as a media integration check. |
| Server only reachable on the Mac | For the local demo, start the server in --lan mode, get the current non-loopback address and have the hidden browser open that address, not localhost. Add a health endpoint. In production, test the deployed HTTPS address from CI; do not use the Mac server. **Limit:** a same-Mac request proves the server is listening on the Wi-Fi interface, but cannot prove that the router allows another Wi-Fi device to connect. That last check must run from a second Wi-Fi client or a CI runner on that network. |
| One-screen layout breaks | Check the child app, each parent daily state and each assessment at TV 1920×1080, tablet 1180×820 and phone 390×844. Assert there is no page overflow, all important text and primary buttons are inside the viewport, pictures loaded, controls are large enough to tap and keyboard focus is visible. Save screenshots only when a check fails. |
| A lesson stops early or reaches the end silently | For each published lesson, open it in headless browser, fast-forward the test playback clock, verify every scene/beat visited in order and the end/test handoff occurred. Separately validate each real audio file because a fast fake clock does not prove sound decodes. Test each video using a local licensed fixture; do not make core release checks depend on YouTube availability. |

The “muted” browser setting is applied outside the app. It must not change the app's mute setting. A full-lesson run can use a controlled playback clock so a 15-minute lesson does not make the test take 15 minutes; the media validation still checks the real MP3 files.

For voice production, put a free-disk check before rendering and require a configurable amount of headroom. Run one voice or art job at a time. Always use finally cleanup. Keep generated output outside the repository until it passes manifest and license checks. Never save dozens of success screenshots on a disk that is already nearly full.

## 8. Ordered plan from here to paid beta

Effort is a rough one-person estimate with AI help and an owner available to make decisions. It excludes new curriculum writing, commissioned art and legal work. **Assumption:** existing lessons and screens can be reused and there is no major unreviewed data migration. A TV compatibility problem or content-rights issue can add weeks.

| Phase | Ships / effort | Reuse | Replace or stop | Main risk |
|---|---|---|---|---|
| **0. Agree the shape and protect the current work** — 1–3 days | Reconcile the new parent and child decisions in the product docs, choose launch country/curriculum and child attendance rule, confirm the intended checkout and preserve any owner-reported unsaved work, then agree a one-family demo target. | ARCHITECTURE.md, FAMILY-DATA-PLAN.md, new parent look file, current DECISIONS.md. | Stop adding new screens or taking a design-lab mockup as accepted app behavior. Do not overwrite current work with a broad cleanup. | The country and child-login rules affect privacy, billing and access. |
| **1. Make a dependable family demo** — 3–5 days | One presentation-ready path: Mac or hosted page, voice manifest verified, TV/phone reachable, no mute carry-over, child takes a test, parent sees result. Add the first asset and hidden-browser checks. | Current scene engine, GSAP, existing lesson assets, views, browser-check.mjs, lab-check.mjs after its gate is fixed. | Retire silent fallback as a passing result; stop treating --lan as production; stop making unauthenticated server state available to the network. | Exact mute root cause and target TV browser are unknown. |
| **2. Build the content and module boundary** — 1–2 weeks | Vite/TypeScript build, lesson and assessment schema, asset/license manifest, one converted lesson, one validated assessment; old/new player can both run during conversion. | Existing scene types, custom art, question renderers and current lesson copy after fact/licensing review. | Stop growing the global script list and writing new lesson-specific render functions inside lesson files. | Content conversion can expose inconsistencies or media gaps. |
| **3. Build the secure family data slice** — 1–2 weeks | Staging/prod Postgres, adult account, account holder, invited second teacher, three children, child device sessions, family boundary checks, immutable attempt and mark history. No payment yet. | FAMILY-DATA-PLAN.md entities and access rules. | Replace localStorage and whole-file JSON API as the source of truth. Keep them only for local demo fixtures/imports. | Auth and child profiles need a careful server-side design. A bad access rule is a release blocker. |
| **4. Build the daily product flows** — 2–3 weeks | Child My day/diary/homework/marks; one-screen Control Center with before/during/after/week signoff; separate Admin for accounts; TV pairing and remote; shared jobs and teacher audit. Test one tablet, one phone and one supported TV. | Current child tabs, diary/calendar concepts, marking layouts, six parent looks as visual input, question types. | Replace the ten-tab parent cabinet and date-only signature. Do not track children as “stuck” without a clear, necessary and disclosed rule. | Live TV/phone connection and two people editing a shared job are the most failure-prone flows. |
| **5. Complete the family release** — 1–2 weeks | Migrate only needed family data after an owner-approved export plan, backup, consent/privacy pages, data export/delete, content licenses, real device playback, failure recovery and restore rehearsal. | Existing family content after review; data-plan migration notes. | Do not expose real family records to the public preview or commit them. | Local law, rights, backup/restore and real device behavior. |
| **6. Paid beta** — 4–8 additional weeks | Stripe child quantity, checkout, subscription changes, billing webhooks, support/incident path, terms, monitoring, limited invite-only group (for example 5–20 families), usage/cost review. | Staging flows, account schema, R2/Stream pipeline and family pilot learnings. | Stop accepting unpaid assumptions as payment, tax or market decisions. Do not open a broad signup page before privacy, rights and support are ready. | Payment country, taxes, price, content scope and customer support load. |

**Rough total:** 8–13 weeks to a dependable family release, then 4–8 more weeks to a small paid beta, if decisions are made quickly and the existing lesson content passes review. This is not a promise. A full curriculum or artist-designed art system is a separate product schedule.

### What must happen first

1. Choose launch country, supported TV/browser, and whether TV attendance needs confirmation. Those choices set the real permissions and content rules.
2. Make the existing family demo dependable with asset completeness and hidden browser checks. Reliability is the owner's top complaint, and this is the smallest fix that helps immediately.
3. Approve the family/parent/child relationship and history model from FAMILY-DATA-PLAN.md before writing more account code.

### What to stop doing

- Stop adding more lesson files or parent pages to the current prototype data store as if it were the paid product.
- Stop deploying folders by hand or accepting a static copy that lacks voice assets.
- Stop considering a test green if a missing voice clip merely causes the player to wait and continue.
- Stop using a visible or approval-gated browser pane for automatic tests. Use a separate hidden browser process or CI.
- Stop running bulk audio/art/screenshot jobs without disk headroom, serial output and cleanup.
- Stop changing old question or mark definitions in place after children have answered them.
- Stop building all 14 child theme tokens and 14 new layouts into the live product before one family has tested the actual tasks. Continue exploring designs in the lab, but ship one reliable default first.
- Stop treating curriculum alignment or a report as government approval, accreditation or proof that the family's education meets local requirements.

## 9. Where this decision should live and how to commit

Keep this review at docs/research/2026-11-06-codex-architecture-plan.md. The durable decisions belong in:

- docs/product/ARCHITECTURE.md: final stack, boundaries, environment and release flow.
- docs/product/FAMILY-DATA-PLAN.md: entities, permissions, audit and history.
- docs/product/PARENT-CONTROL-CENTER.md: daily teacher screens, Admin boundary, jobs and weekly signoff.
- docs/product/HOW-IT-WORKS.md and docs/product/PRD.md: child, parent and TV flows and paid-beta scope.
- docs/rules/COMPLIANCE-AND-LICENSING.md: consent, media rights, voice rights, attribution and local legal review.
- docs/log/DECISIONS.md: short dated entries only for choices the owner actually approves.

**Commit approach:** do not create one giant “architecture and everything” commit. First confirm that the checkout and branch match the owner's working copy, and preserve any unsaved files the owner expects; the current checkout has eight commits and was clean before this report edit, so the stated “one commit and many uncommitted files” does not match the Git evidence here. Once the architecture choices are approved, commit the architecture/product decision docs together as a documentation-only commit. Then use small, explicit-path commits for the lab, asset pipeline, one lesson-format conversion, database/migrations, child flow, parent flow and billing. Keep media files and application code in separate commits so a missed asset is obvious. Keep main as the known-good family demo and do daily work on dev only if those branches are actually present. Never stage the whole tree or include data/, secrets or real family records. I changed only this report and did not stage or commit it.

## 10. Questions for the owner, with my recommended answer

1. **Where will the paid service first be sold, and which school program will be supported?**  
   **Recommend:** choose one country and one curriculum before payment or content expansion. The current code uses England's curriculum and Oak's order, but that does not establish the launch country.

2. **Can a parent who only pays see the children's learning records?**  
   **Recommend:** no. Admin contains account, payment and privacy actions only. A separate parent-child link grants access to a child's work; a teaching assignment grants permission to teach/mark. This follows the owner's latest instruction and avoids confusing payment with parent access.

3. **How does the TV know who watched a lesson?**  
   **Recommend:** the TV records only that a lesson played. A teacher or child confirms attendance on the paired device before the child gets personal credit/test eligibility. Do not infer that three children watched because one TV finished.

4. **How should the children sign in without email?**  
   **Recommend:** parent-pair each child device, then use a child-only server session with a child-specific login code, rate limits and parent reset. Never keep a readable password in the browser. Confirm this with a small security review before paid beta.

5. **Which TV and tablet/phone models must work for the first family release?**  
   **Recommend:** name one TV/browser and one tablet plus one phone now; test those first, keep HDMI as fallback, and do not promise every smart TV before real-device checks.

6. **Are videos required inside every paid lesson?**  
   **Recommend:** no. Make our own narration, animation, diagrams and licensed images carry each lesson. Use only videos with documented commercial rights; do not charge for an embedded YouTube watch. Oak's post-September-2022 content is generally under OGL 3.0 except marked third-party material, and each asset still needs its own rights check and attribution. [Oak terms](https://www.thenational.academy/legal/terms-and-conditions) [YouTube API developer policies](https://developers.google.com/youtube/terms/developer-policies)

7. **What is the paid beta curriculum scope and price rule?**  
   **Recommend:** one narrow, reviewed set of lessons and a monthly price per active child. Decide whether siblings get a discount only after checking the price with families. Do not promise a full school program from the current partial curriculum map.

8. **Which screen look should ship?**  
   **Recommend:** compare the current eight kid and six parent lab looks using real tasks and the two adults' actual devices. Combine Lesson Console with Class Register for the parent; choose one readable child default and only add a second option after family testing. Store a theme ID in the profile now, but delay a large selector.

9. **Must lessons work without internet?**  
   **Recommend:** for paid beta, require internet for account, marks and teacher pairing; allow cached playback only after content rights and update behavior are clear. Do not support offline edits/sync yet because two devices can overwrite each other.

10. **Should existing family records migrate to the hosted service?**  
    **Recommend:** yes only through an explicit export/import tool with a private backup and a preview step. Do not import by copying the whole live JSON file into production. I did not inspect data/ and cannot estimate migration work or contents.

## Sources for changing prices and rules

Prices and provider rules were checked on 6 November 2026; they can change.

- [Supabase pricing](https://supabase.com/pricing)
- [Supabase row-level security guide](https://supabase.com/docs/guides/database/postgres/row-level-security)
- [Cloudflare R2 pricing](https://developers.cloudflare.com/r2/pricing/)
- [Cloudflare Stream pricing](https://developers.cloudflare.com/stream/pricing/)
- [Cloudflare Pages limits](https://developers.cloudflare.com/pages/platform/limits/)
- [Cloudflare Pages functions pricing](https://developers.cloudflare.com/pages/functions/pricing/)
- [Stripe UAE payment pricing](https://stripe.com/ae/pricing)
- [Stripe UAE Billing pricing](https://stripe.com/ae/billing/pricing)
- [Playwright browser installation](https://playwright.dev/docs/browsers)
- [Playwright test command](https://playwright.dev/docs/test-cli)
- [Oak National Academy terms](https://www.thenational.academy/legal/terms-and-conditions)
- [YouTube API developer policies](https://developers.google.com/youtube/terms/developer-policies)

