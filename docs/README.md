# Project knowledge: the map

Last updated: 2026-11-11. Every file has one job. If something new doesn't fit, add it here.

**New here?** [`product/FEATURES.md`](product/FEATURES.md) lists everything we have and how real it is. [`product/HOW-THE-CODE-WORKS.md`](product/HOW-THE-CODE-WORKS.md) explains the code. [`SETUP.md`](SETUP.md) gets it running. [`DESIGN-GALLERY.md`](DESIGN-GALLERY.md) shows the design rounds. [`MAKE-A-LESSON.md`](MAKE-A-LESSON.md) is the step-by-step guide to making a new lesson.

**About this public copy:** the team's day-to-day notes (tasks, decisions, the owner's notes and feedback) stay in a private repository, because they quote a real family. What they taught us about quality is summed up in `rules/QUALITY-NOTES.md`. Where a document below mentions "the team's private notes", that's what it means. "The owner" means the product owner, who is also the first family's parent.

## Where everything lives
| Folder | What's in it | When to use it |
|---|---|---|
| `docs/rules/` | **What we must follow.** Short, firm rules | Before doing that kind of work |
| `docs/product/` | What we're building, and how it works | When planning |
| `docs/research/` | Dated research with sources, and notes on what's unverified | When a rule needs evidence |
| `docs/official/` | Official programs by subject (England's national curriculum), read before searching the web | Planning a unit |
| `docs/background/` | Older notes kept for reference: `DESIGN-RESEARCH.md`, `KID-DESIGN-DIRECTIONS.md`, `LESSON-PLAYBOOK.md`. Rules win if they disagree | Rarely |
| `CLAUDE.md`, `.claude/agents/` | How Claude Code works on the project, and the helpers for each lesson step | When making a lesson |
| `docs/images/` | Pictures for the README and the design gallery | |
| `channel/` | The working prototype: TV lessons, child app, parent pad | |
| `channel/pad-lab/`, `channel/kid-lab/`, `channel/materials-lab/`, `channel/children-lab/` | **Design labs:** clickable samples for the parent pad, the child's screens, Materials and the Children page. Not the real app | Comparing designs |
| `channel/theme-kit/` | Full interface kit in 10 themes | Choosing a look |
| `channel/style-references/` | Style references to compare | Choosing a look |
| `channel/game/`, `channel/test-styles/`, `channel/round1/` | **Rejected designs.** Kept as a record. Never build on them | Rarely |

## Rules
| File | Covers |
|---|---|
| `rules/QUALITY-NOTES.md` | **What we learned the hard way. Read before any lesson, test or screen** |
| `rules/STYLE-GUIDE.md` | App look, tools, motion, options. **Read before any screen** |
| `rules/DESIGN-VARIATIONS.md` | **Quality level and how to make variations. Read before any prototype** |
| `rules/AUDIENCE-AND-READING.md` | Who reads each screen, on which device |
| `rules/LESSON-RULES.md` | How to make a lesson |
| `rules/TEST-AND-EXAM-RULES.md` | How to make tests and exams, on every device |
| `rules/CONTENT-RULES.md` | Titles, names and images |
| `rules/COMPLIANCE-AND-LICENSING.md` | Videos, images, voice and children's data |
| `rules/VISUAL-HIERARCHY.md` | **One main thing per screen, then the rest. Read before any screen** |
| `rules/VIDEO-RULES.md` | Choosing and trimming videos. A person watches every one first |
| `rules/TV-CONTROLS.md` | What every remote button does |

## Product
`FEATURES.md` **everything we have, and its status** · `HOW-THE-CODE-WORKS.md` **the code as it is today** · `PRD.md` what and for whom · `HOMEWORK.md` the homework plan · `ROADMAP.md` **the plan, phase by phase** · `VOICE-PLAN.md` Spanish and English voices, and editing them · `PARENT-CONTROL-CENTER.md` parents' daily screen vs Admin · `HOW-IT-WORKS.md` the whole flow · `ARCHITECTURE.md` technical plan · `PROGRAM.md` the program's status · `CURRICULUM.md` official sources · `ASSESSMENT.md` marking · `ACTIVITIES.md` **a plan:** activities and packs, on a device or printed, made from lessons · `FAMILY-DATA-PLAN.md` **a plan, not built:** where family data lives, parent roles, the database, backup and moving the data · `RELEASE-PLAN.md` **a plan:** making it safe and easy for other families to install · `PARENT-PAD-PURPOSE.md` what the parent pad is for · `PARENT-APP-SPEC.md` the parent app, screen by screen · `SCHEDULE-AND-DIARY.md` the timetable, diary and program document · `MONITORING.md` what the activity log records and never records · `LANGUAGES.md` lessons in more than one language · `PROGRAM-ALIGNMENT.md` how lessons line up with the official program · `XP-AND-REWARDS.md` **a plan:** points, coins and rewards · `MY-DAY-AND-XP-V1.md` **a plan:** the first version of My day with XP

## Research
| File | Answers |
|---|---|
| `2026-11-05-standards-licensing.md` | Which curriculum, and what we may legally use |
| `2026-11-06-aaa-interface-styles.md` | What makes interfaces feel top quality |
| `2026-11-06-codex-architecture-plan.md` | Codex's plan for the code's next shape |
| `2026-11-06-codex-review.md` | An independent review of stack, risks and next steps |
| `2026-11-06-colombia-climate.md` | Fact sheet for Colombia Lesson 2 |
| `2026-11-06-colombia-program.md` | Where Colombia fits in school programs, and its facts |
| `2026-11-06-design-frameworks.md` | Which design tools the best teams use |
| `2026-11-06-homework.md` | What good homework looks like |
| `2026-11-06-kid-design-polish.md` | Why kid screens can look kid-made, and what polish is |
| `2026-11-06-parent-screens.md` | What a parent's screen is for, and why the first looks failed |
| `2026-11-06-school-norms.md` | School timetable norms |
| `2026-11-06-spanish-lesson-1.md` | Sources for Spanish Lesson 1 |
| `2026-11-06-test-exam-quality.md` | What makes tests feel good |
| `2026-11-06-video-and-book-design.md` | **How the best education channels and books teach** |
| `2026-11-07-codex-languages.md` | How lessons should handle languages |
| `2026-11-07-codex-onboarding-review.md` | Codex's review before daily family use |
| `2026-11-07-codex-screen-review.md` | Codex's screen-by-screen review |
| `2026-11-07-codex-storage.md` | Codex on family data storage |
| `2026-11-07-design-research.md` | How good parent apps and dashboards are built |
| `2026-11-07-emotions-1.md` | Review notes for Emotional Intelligence Lesson 1 |
| `2026-11-07-lesson-openings.md` | Lesson openings and endings, brought up to the rules |
| `2026-11-07-neuroscience.md` | Where neuroscience fits, and Lesson 1's review notes |
| `2026-11-07-research-dashboards-and-today-screens.md` | How the best "today" screens are built |
| `2026-11-07-research-family-and-school-apps.md` | How family and school apps build the parent's home screen |
| `2026-11-07-research-ipad-and-platform-guidance.md` | Apple, Material and WCAG guidance for navigation |
| `2026-11-07-research-ux-psychology-and-layers.md` | UX psychology and calm interfaces |
| `2026-11-07-spanish-voice-tests.md` | Spanish voice tests |
| `2026-11-10-activities-learning-science.md` | What helps children remember |
| `2026-11-10-activity-types.md` | Activity types and packs from real products |
| `2026-11-10-materials-presentation.md` | How others present a library of materials |
| `2026-11-10-visual-hierarchy.md` | Where the eye goes first |
| `2026-11-10-xp-and-rewards.md` | XP and rewards: what products do and what the evidence says |

## How the project learns
1. **Before work:** read this map and the rule file for that work.
2. **Big or unclear work:** say back what the owner means, and wait for a yes.
3. **When the owner corrects something:** change the rule file, so the mistake can't repeat.
4. **When new research is done:** save it in `research/` with its sources, and put what it changes into a rule file. Research that never reaches a rule doesn't help.
5. **Before showing anything:** run the check list in the rule file, and a first-look check by someone with no background.
