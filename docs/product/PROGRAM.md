# The learning program

Last updated: 2026-11-06

## What we have today
| Item | Status |
|---|---|
| Official framework | England's National Curriculum (government document) |
| Teaching order | Oak National Academy, a public body sponsored by the Department for Education |
| Year 7 unit titles and lesson counts | Yes, for 7 subjects |
| Science units for Years 5–8 | Yes |
| Lesson titles | Only 2 units: Human skeleton and muscles, and Cells |
| Objectives, keywords, misconceptions and quizzes in our data | **No** |
| Built lessons | **2**: The human skeleton, Muscles |

**We have the skeleton of a real program, not a full detailed program.**

## How big Year 7 is
| Subject | Units | Lessons |
|---|---:|---:|
| Science | 13 | 97 |
| Maths | 10 | 146 |
| English | 7 | 148 |
| History | 14 | 75 |
| Geography | 7 | 86 |
| Computing | 6 | 36 |
| Spanish | 14 | 71 |
| **Total** | **71** | **659** |

These are only the subjects we've fetched. [Oak says its curriculum covers 20 subjects across key stages 1 to 4](https://www.thenational.academy/teachers/curriculum), so art, music, PE and others are missing.

## The entities of a program
```
Framework       England's National Curriculum
 └ Key stage    Key stage 3
    └ Year      Year 7
       └ Subject     Science
          └ Strand        Biology
             └ Unit           Human skeleton and muscles
                └ Lesson           The human skeleton
                   ├ Learning outcome
                   ├ Key learning points
                   ├ Keywords
                   ├ Common misconception
                   ├ Prior knowledge
                   ├ Teacher tip, supervision, content guidance
                   ├ Slides, worksheet, video, transcript
                   ├ Starter quiz → questions → answers
                   ├ Exit quiz → questions → answers
                   └ Licence
```
Also: threads, the big ideas that run across years ([Oak describes these](https://www.thenational.academy/teachers/curriculum)), and exam boards at key stage 4.

Our own layer adds: episode, chapter, spoken line, scene, asset and its license, question type, level, re-test schedule, attempt, mark and gradebook entry. See `docs/product/ARCHITECTURE.md`.

## The way to get the full program
[Oak has a free curriculum API](https://open-api.thenational.academy/) and [bulk downloads](https://open-api.thenational.academy/bulk-download): one JSON file per subject and phase, including quiz questions and answers, teaching transcripts, misconceptions and more, with a published schema.
- Content is under the Open Government Licence, "except where otherwise stated", and third-party material needs checking.
- Getting a key needs a name, email and company name, so **the owner must request it**.
- I haven't seen the files yet, so the field list above comes from one lesson page and needs checking against the real schema.

**Plan once we have a key:**
1. Download the subjects and years we want.
2. Import into one program database, keeping source and license on each item.
3. Build the map and year views on real data.
4. Use Oak's objectives, keywords and misconceptions as the brief for each episode.
5. Use Oak's questions as a base for our question types.

Check with counsel before charging, as this content would underpin a paid service. See `docs/rules/COMPLIANCE-AND-LICENSING.md`.

## What comes after the skeleton
1. **The human skeleton**, built
2. **Muscles:** what muscles are made of and how they move, built
3. **Movement:** how muscles work together to move bones at joints
4. **Biomechanics:** calculating the moment of a force around a joint
5. **Unit exam**
6. Next, by route:
   - Oak's Year 7 order: Heating and cooling (physics)
   - Next biology: Diffusion
   - Next human body: Human digestive system, Year 8

Oak mixes physics, chemistry and biology through the year, so the next science unit isn't always about the body.

## Open decisions
- Which country's program is the base? Other countries would need their own mapping.
- Which subjects at launch?
- Which school year for each child? Ages 10–12 span Years 5 to 7.
