# Video rules

Last updated: 2026-11-06. Read before adding any video. Licensing rules are in `COMPLIANCE-AND-LICENSING.md`.

## Why this exists
The owner watched a Colombia video that was half a toy drone being unpacked. Claude had picked it from its title. Its description said "toy review mini drone", and its chapters started with "Opening the dome" and "Drone features". Reading them would have ruled it out.

**A bad video is worse than no video. Our own animation can always carry the lesson.**

## What Claude can and can't check
| Claude can read | Claude can't do |
|---|---|
| Title, channel, length, description, chapters | Watch or hear a video |
| Whether the video can play inside our lesson | Read transcripts: YouTube blocks automatic reading, and we don't work around that |
| Its thumbnail | Confirm that facts or tone are right |

So Claude's checks only **rule videos out**. **A person watches every video before children see it.** Until then, a clip may sit in a draft lesson so the owner can judge it in place. It's marked `candidate`, and the owner is told.

## The steps
1. **Know the job first.** Fill in the video plan below: its kind, its place in the lesson, and what it must show. Choose video only when moving real footage teaches better than our animation: real places, real processes, experts, real experiments.
2. **Look in trusted sources first** (list below). Search more widely only if they have nothing.
3. **Run the checker:** `python3 tools/check-video.py <id>`, or `--search "words"`.
4. **Rule out:**
   - Any toy, unboxing, product, game-play or sponsor section inside the clip
   - An opening longer than about 20 seconds before the teaching starts
   - Pitched at a much younger or older age than our children, unless marked as "for older students"
   - Memes, mockery, "slander" or jokes about a country or people
   - Content we've chosen to leave out at this age, such as drugs or armed conflict
   - Unknown channels with no way to judge them, or that seem mass-produced by AI
   - Videos with no chapters and a long running time, unless a person watches all of it
   - Videos that won't play inside our lesson
5. **Choose the best part, not the whole video.** Set a start and end time. Most clips should run 1 to 3 minutes.
6. **Propose 2 or 3 candidates to the owner:** link, channel, length, start and end, what it shows, why it was chosen, what's unknown.
7. **The owner watches and says yes or no.** Only then is it for the children.
8. **Record it** in the lesson's review notes: who approved it, when, and the start and end.
9. **Set a "watch for"** question, and make sure the clip really answers it.
10. **Check again later:** videos can be deleted or changed. Skip quietly if one fails to load.

## Three ways to use a video
Choose the kind before searching. Set it as `use:` on the scene.

| Kind | `use:` | What it is | Length | Words around it | How many |
|---|---|---|---|---|---|
| **Support clip** | `support` | Backs up one idea inside a chapter: real footage, an expert or an experiment | 30 seconds to 2 minutes | **Before:** one line and a "watch for". **After:** the answer, in one line | 1 or 2 |
| **Video break** | `break` | A short, fun change of pace between chapters, still on the topic. It rests attention and isn't for teaching | 1 to 2 minutes | **Before:** "Time for a break". **After:** one line back into the lesson | 0 or 1, around the middle |
| **Video chapter** | `chapter` | The video is the chapter, because it's better than anything we could animate | 2 to 5 minutes | **Before:** the chapter card and 1 or 2 sentences. **After:** 1 or 2 sentences and one question | 0 or 1 |

**In all,** usually 2 or 3 clips and no more than about a third of the lesson. Real places and processes (geography, biology) use more. Language and maths may use fewer.

**Which kind?**
- It proves or shows one idea → support clip
- We can't animate it as well, and it covers a whole idea → video chapter
- The lesson has run a long time with no change of pace, and something fun fits → video break
- Our animation does it just as well → no video

## Where to place a video
- **Never** first or last in a lesson, and never right after the title or right before What we learned.
- **Never** two videos in a row. At least one of our own scenes sits between them.
- **Teach, then show:** for a support clip, give the idea first, unless the clip is the surprise that starts the chapter.
- **Don't rely on it.** A video can fail, so anything tested or in What we learned must also come from our own voice or screen. A video chapter needs a short fallback scene.
- **The words after it are required.** Never cut straight from a video to the next topic.

## The video plan
Every lesson's review notes have this table, filled in **before** searching. Then Claude searches from it, and the owner can see why each clip is there.

| Chapter | Kind | Its job, in one line | Search words | Must show | Skip if | Start to end | Line before | Line after | If it won't play | Status |
|---|---|---|---|---|---|---|---|---|---|---|

**How to fill it in:**
- **Search words:** the idea, not the topic. "Why it gets colder on a mountain", not "Colombia". Try the trusted channels first, and add "explained" or "for kids" only if needed.
- **Must show:** what has to be on screen, so a person can judge it quickly.
- **Skip if:** adds to the general list below, such as "city tour with no people" or "mentions drugs".
- **Start to end:** begins after any intro, and ends before "subscribe" or a sponsor. If the good part has a bad middle, use two short clips or find another.
- **Cut only between sentences.** A clip never starts or stops in the middle of a sentence or a thought. Before a clip goes in, run `python3 tools/clip-cuts.py <lesson>`: it shows the words just before and after each cut. Every `CHECK` it prints is read by a person, and a clip with no captions is watched at both cut points. (2026-11-07: the owner found the Emotions clip stopping mid-sentence; 6 of 10 trimmed clips had the same fault.)
- **Status:** `candidate`, then `owner yes` or `owner no`, with the date.

## Trusted sources to try first
A trusted source isn't automatically good. A person still watches.

| Kind | Sources |
|---|---|
| Science | TED-Ed, SciShow Kids, Crash Course (marked older), Nemours KidsHealth |
| Nature, places | National Geographic, BBC Earth, BBC Teach, Free Documentary (clips only) |
| Culture, heritage | UNESCO, national tourism or culture bodies |
| Countries | Geography Now (clips only, skip the sponsor and any conflict sections) |

Not checked yet: whether each channel's videos can play inside our lesson, and the license route for paid use.

## In the lesson
- Use the video's real thumbnail, but only after it's been checked. Prefer a sharp frame, and don't cover faces with text.
- OK pauses, left and right move 10 seconds, down reaches Skip, and Back returns to the lesson. See `TV-CONTROLS.md`.
- For a paid service: YouTube needs a written approval route before launch. No video is charged for or gated.

## Status of current videos
Nobody has confirmed that they've watched these. All need the owner's yes.
| Lesson | Video | Channel | Result of the check |
|---|---|---|---|
| Colombia | Geography for Kids | Milton Unlimited | **Removed.** Toy review |
| Colombia, deeper | Country Profile | Geography Nuts | **Removed.** 17 minutes with a conflict chapter |
| Colombia, deeper | Regiones naturales | Mundo Virtual Primaria | **Removed for now.** Spanish, not reviewed |
| Skeleton | Your Super Skeleton! | SciShow Kids | Passes reading check. Intro runs 1:45, so consider a start time |
| Skeleton | What happens when you break a bone? | TED-Ed | Passes reading check |
| Skeleton | How Your Bones and Skeleton Works | KidsHealth | Passes reading check |
| Skeleton, older | The Skeletal System | Crash Course | Passes for older students |
| Muscles | Muscular System For Kids | Fun World For Kids | Unknown channel. Needs a close watch |
| Muscles | What makes muscles grow? | TED-Ed | Passes reading check |
| Muscles, deeper | The Muscular System for Kids | Hey! Guess What | Passes reading check. 10 minutes |
| Muscles, deeper | What are muscles? | Mr. Donovan | Passes reading check |
| Muscles, older | Muscle Cells | Crash Course | Passes for older students |

## In the Colombia lesson now, for the owner to judge
The owner asked to see videos inside lessons, so these two clips are in Lesson 1, and nobody has confirmed them yet. If one is bad, say so and it comes out.
- **Geography Now,** 3:59 to 6:41, regions and biodiversity. Unknown: jokes.
- **Free Documentary, Wild Colombia Revealed,** first 2 minutes. Unknown: the opening may have titles, or predators.

Also in Colombia Lesson 2, unconfirmed: BBC Earth Science 0:00 to 2:29 (why high air is colder), Discovery UK (coffee harvest), DW News (páramo water). Unknown: all of it, because only titles and descriptions were read.

**Goal: each lesson has 2 or 3 clips, each inside the chapter it supports.**

## Candidates for Colombia, waiting for the owner
| For | Video | Channel, length | Part to use | Unknown |
|---|---|---|---|---|
| Regions, Lesson 1 | [Geography Now! Colombia](https://www.youtube.com/watch?v=rTsPaAIJdnw) | Geography Now, 12:56 | 3:59 to 6:41, biodiversity and regions | Jokes, sponsor at the start |
| Regions, Lesson 1 | [Colombia's Geography Explained](https://www.youtube.com/watch?v=wxxeFdQqfoo) | FactSpark, 2:59 | All | It says 5 regions, we teach 6 |
| Daily life and food | [Let's Take a Journey: Colombia](https://www.youtube.com/watch?v=p51DEUmGzQg) | Miacademy, 8:16 | 2:08 to 6:47, school, family, food, holidays | Made for 2nd grade, may feel young |
| Culture | [The Carnival of Barranquilla](https://www.youtube.com/watch?v=nDbSZUPmIm0) | UNESCO, 3:12 | All | Pace and narration |
| Coffee | [Colombia Coffee Harvest](https://www.youtube.com/watch?v=evCf7YYZk3w) | Discovery UK, 1:39 | All | Check it isn't an advert |
| Nature, plains | [Wild Colombia Revealed](https://www.youtube.com/watch?v=BASbIdt6p1I) | Free Documentary, 90:33 | Start at 44:02, life in the Llanos | Choose 2 minutes, watch for predators |
| History | [Who Was Simón Bolívar?](https://www.youtube.com/watch?v=kidUjYbjnyc) | PastPorts Kids, 3:03 | All | Unknown channel, facts unchecked |
| Páramo, Lesson 2 | [Life, Livelihood, Home: Páramos of Colombia](https://www.youtube.com/watch?v=fPrThd5eEI0) | The Nature Conservancy, 2:01 | All, after the water scene | No chapters. May lean toward fundraising. Plays inside the lesson |
| Frailejones, Lesson 2 | [This hairy plant supplies water for most of the northern Andes](https://www.youtube.com/watch?v=vg83khTvdzY) | CGTN America, 1:37 | All, after the frailejón scenes | News report from a Chinese state broadcaster, so the owner may prefer not to use it. Plays inside the lesson |
| Thermal floors, Lesson 2 | [El país que tiene todos los pisos térmicos](https://www.youtube.com/watch?v=y2DEGxdjTRs) | 5 Minutos por Colombia, 5:37 | 1:07 to 3:18, one floor at a time | Spanish. Unknown channel. A real Colombian voice, if the children can follow it |

Ruled out from the description alone: Geopold's guide ("slander" memes), and most food and travel channels, which are reviews.

Ruled out for Lesson 2: [Why Is It Cold on Top of Mountains?](https://www.youtube.com/watch?v=c4C5pR327E4) (Jool Education) and [Why Are Mountaintops Closer to the Sun but Still Cold?](https://www.youtube.com/watch?v=hEBorupkOBw) (Why X, 8:37, goes on to the greenhouse effect), because our animation does this job and no real footage is needed. [From six peaks to three](https://www.youtube.com/watch?v=0SOrAA_numU) (CGTN America, 18:42, no chapters) is too long. [Where did the glacier go?](https://www.youtube.com/watch?v=Mlk-dHDjxY4) (Mark Horrell) is a hiker's diary. [Páramos: Water for Life](https://www.youtube.com/watch?v=koz2He3ADo8) (Conservation International, 7:45, no chapters) would need someone to watch all of it first, so it's a backup only.

## In Spanish Lesson 1 now, for the owner to judge
Added 2026-11-06. **Nobody has watched these or confirmed them.** Only titles, chapters and descriptions were read. All three say they can play inside our lesson. If one is bad, say so and it comes out. The test asks nothing that only appears in a clip.
| Chapter | Video | Channel, length | Part used | Why | Unknown |
|---|---|---|---|---|---|
| The a sound | [How to Pronounce the Spanish Vowels](https://www.youtube.com/watch?v=QubwkrC4UM4) | Spring Spanish, 10:33 | 2:19 to 3:27, "always pronounced the same way" and "Letter A" | A person teaching exactly this point | Accent used, any sales talk inside the clip. The channel sells courses, though the part used has no sales chapter |
| Está | [Spanish Speaking Countries of the World](https://www.youtube.com/watch?v=aJr3nnnXqNg) | Mi Camino Spanish, 6:08 | 4:09 to 5:18, South American nations | Real places where Spanish is spoken | Whether it may feel young, what footage it uses, whether its facts are right. It counts 20 countries, with a note, as we do |
| Greetings | [Spanish Introductions and Greetings](https://www.youtube.com/watch?v=Dji9oiC8c3k) | Spanish Playground, 1:35 | All | Two people talking, unlike our computer voices | Whether it feels babyish, and which variety of Spanish it uses. It teaches phrases we haven't, such as "my name is" |

Backups: [The Spanish Verb ESTAR](https://www.youtube.com/watch?v=O9fhWtA7XnQ) (Mi Camino Spanish, 1:56). It also covers estar for feelings, which comes later.

Ruled out from the description alone: Rockalingua's vowel karaoke and Basho & Friends' songs (made for younger children), SpanishPod101's vowels (14:51, and the good part isn't easy to separate), TalkTrainer's estar lesson (7:49, no chapters, unknown channel), Passportix and Good Winner's country lists (unknown channels, and one description advertises a blog), and The Language Tutor's greetings (9:54, includes slang).
