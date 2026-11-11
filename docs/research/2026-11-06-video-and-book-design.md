# Learning from great educational videos and books

Researched: 2026-11-06. Status: research only. **Nothing is built or changed.** The owner chooses what to try.

Example used throughout: our skeleton lesson, *Why Don't You Collapse?* (`channel/episodes/skeleton.js`).

## The short version
1. **The best makers don't start with design. They start with what the viewer wrongly believes, and with one picture that explains the idea.** Style comes after that.
2. **The strongest research finding for us:** a clear video can teach almost nothing if it never mentions the wrong idea the viewer already holds. Viewers feel more confident anyway.
3. **Motion and stillness do different jobs.** Animation is best for showing how something changes. Still pictures are best for showing where things are. Great books are good at the second, and great videos at the first. **We can do both:** teach in motion, then settle on a still "encyclopedia page".
4. **Colour, size and number must mean something.** Isotype, the picture-chart method from the 1920s, is the clearest teacher here. It costs almost nothing to apply.
5. **Fritz Kahn's "body as a working place" is a real, tested idea for our science series,** but it has known weaknesses, so we need to say where each comparison stops being true.
6. **One thing to rethink in our current plan:** we planned a quiet music bed under the narration. The research I read suggests music under a hard explanation can hurt learning. Kurzgesagt uses music heavily, so this needs testing. See idea 21.

**Biggest limit of this research:** I can't watch video or hear audio, and I haven't held these books. Almost all the learning research tested adults or university students, not children aged 10–12. Treat the numbers as starting points.

## How to read the evidence marks
| Mark | Meaning |
|---|---|
| **Read** | I opened the source and read that part of its text directly |
| **Read (summary)** | I opened the source through a tool that gives a summary, so I didn't see every line |
| **Reported** | A search result or another writer describes it. I didn't read the original |
| **Memory** | My general knowledge. Not checked |
| **Ours** | Measured from our own project files |
| **My arithmetic** | I calculated it from other numbers |

Transcripts on rosetta.to are third-party copies of the creators' own videos. They are close to primary, but I couldn't check them against the videos. Quotes are avoided on purpose: nearly everything is in my own words.

## Where our lesson stands today
Measured from `channel/episodes/skeleton.js` and `channel/assets/voice/en/manifest.json`. **Ours.**

| Measure | Skeleton lesson |
|---|---|
| Spoken words | 917, about the same as one TED-Ed script |
| Narration time | 344 seconds (5.7 minutes), before pauses and the 2 videos |
| Speaking speed | About 160 words a minute |
| Lines of narration | 82, with a median of 4.2 seconds each |
| Scenes | 36, so a new scene about every 10 seconds on average |
| Chapters | 7 plus a bonus, each about 25–60 seconds of narration |

**What's already right:** a question in the title, short chapters, shout-out questions, a marked bonus, a hands-on experiment and a recap. Much of the playbook matches what the best makers do.

**Three weaknesses this research exposed:**
- **The hook gives away the misconception.** The second line says the skeleton is alive. Chapter 5 then says most people get this wrong. By then the surprise is gone.
- **Colour has no meaning.** Red is chapter 1, chapter 4, chapter 6, the "Move" job, a statement scene and the recap. Teal is both chapter 2 and "Store".
- **Many scenes are a word plus an image.** `rebuild` is a statement scene, although it's about the most visual idea in the lesson: a body constantly demolishing and rebuilding itself.

---

# Part 1: Educational video and animation

## What each channel gave us
| Channel | Strongest lesson | Evidence quality |
|---|---|---|
| [Kurzgesagt](https://kurzgesagt.org/youtube/) | The script is the hard part. Metaphors are planned before drawing | Good on process. **No public style rules found** |
| [TED-Ed](https://www.edsurge.com/news/2018-08-16-behind-the-scenes-of-ted-ed-s-wildly-popular-youtube-channel-for-students) | Pictures should replace words. 800–900 word scripts | Good, from a teacher who writes for them. Guidelines themselves are private |
| [Crash Course / Thought Café](https://rosetta.to/u/crashcourse/a-history-of-crash-course) | A style built to be repeatable. Animators add their own jokes | Thin |
| [Veritasium / Derek Muller](https://openjournals.library.sydney.edu.au/IISME/article/view/6345) | Say the wrong idea first | **Best evidence here: published experiments** |
| [3Blue1Brown](https://www.3blue1brown.com/faq/) | Concrete before abstract. Every movement needs a purpose | Good, his own words |
| [Vox](https://www.storybench.org/?p=21229) | Make abstract stories physical, with cut paper and maps | Fair, one interview each with two staff |
| [MinuteEarth / MinutePhysics](https://minuteearth.com/faq) | Very simple drawing can work if the story is strong | Good on tools, thin on style |
| [Mark Rober](https://rosetta.to/u/waveform/mark-rober-talks-glitterbomb-creative-engineering-and-storytelling) | Excitement first, science hidden inside | Fair. Own words in interviews |
| [SciShow Kids](https://en.wikipedia.org/wiki/SciShow) | A host with a puppet friend | **Weak.** I found no account of how it's made |

## Script structure
- **Writing is the bottleneck.** Kurzgesagt says writing is its slowest stage. A script can take weeks or even years, and it goes through about a dozen drafts. [Read (summary): process page](https://kurzgesagt.org/youtube/), [transcript](https://rosetta.to/u/kurzgesagt/how-to-make-a-kurzgesagt-video-in-1200-hours). Crash Course also calls writing the hardest part. [Read (summary)](https://rosetta.to/u/crashcourse/a-history-of-crash-course)
- **Let the picture replace words.** TED-Ed tells writers to think of the animation as replacing some of their words, for example showing the animals instead of listing them. Scripts are 800–900 words for 4–7 minute videos, and a video takes at least four months. TED-Ed aims at ages 13–21, older than our audience, and our lesson is the same length. [Read](https://www.edsurge.com/news/2018-08-16-behind-the-scenes-of-ted-ed-s-wildly-popular-youtube-channel-for-students)
- **Name the wrong idea, show why it fails, then give the right idea.** This is Muller's structure. He also uses a puzzle to pull viewers in. [Read (summary)](https://www.creatorhandbook.net/inside-veritasium-an-interview-with-dr-derek-muller-12ad2351a4b3/)
- **Concrete before abstract; never open with a definition.** Sanderson argues the best teaching order is often different from the logical order. Show several examples and let the viewer notice the pattern before you name it. [Read (summary): FAQ](https://www.3blue1brown.com/faq/), [talk](https://rosetta.to/u/3blue1brown/make-math-videos-summer-of-math-exposition-announcement)
- **Picture first, words second.** Sanderson says this gives viewers a sense that the idea belongs to them. [Read (summary)](https://www.stanforddaily.com/2020/01/24/3blue1brown-creator-grant-sanderson-15-talks-engaging-with-math-using-stories-and-visuals)
- **Excitement first, then slip the science in.** Rober also plans the title and thumbnail very early, and often writes the story after filming. Filming first won't suit us. Planning the promise early will. [Read (summary)](https://rosetta.to/u/waveform/mark-rober-talks-glitterbomb-creative-engineering-and-storytelling) He tells communicators to aim for a feeling rather than cram in statistics. [Read (summary)](https://stanforddaily.com/2025/05/19/youtuber-and-former-nasa-engineer-mark-rober-draws-full-crowd-speaks-to-scientific-storytelling/)
- **Honest curiosity, not trickery.** Muller's test: a title can tease, but it must not misrepresent the video. [Read (summary)](https://rosetta.to/u/veritasium/clickbait-is-unreasonably-effective)
- **Write sound and picture side by side.** One explainer writer uses two columns, one for audio and one for visuals. He isn't a famous maker, so this is a practical tip rather than strong evidence. [Read](https://medium.com/@tyler.lowe/how-to-write-a-tight-script-for-an-animated-educational-video-3eb837e12eb5)

## Pacing and shot length
**I found no published measurement of shot length for any of these channels,** and I can't watch them to measure it. What exists:
- Kurzgesagt illustrates about 200 panels per video. [Read (summary)](https://rosetta.to/u/kurzgesagt/how-to-make-a-kurzgesagt-video-in-1200-hours) If a video lasts 8–10 minutes, that's a new panel about every 2.5–3 seconds. **My arithmetic, and the video length is my assumption.** Movement inside a panel isn't counted.
- A 1999 study counted about 14 visual changes a minute, 19 sound effects a minute and 27 topic shifts per half-hour in children's science TV. Its authors thought this pace might reduce effectiveness, but the abstract reports counts rather than a learning test. [Read: abstract](https://www.tandfonline.com/doi/abs/10.1080/08824099909388716)
- Fast editing has been studied in four-year-olds, [where it affected attention and self-control afterwards](https://pmc.ncbi.nlm.nih.gov/articles/PMC9923845). [Reported.](https://repository.essex.ac.uk/19140/) **This doesn't transfer to ages 10–12.** I'm mentioning it only so nobody cites it as if it does.
- Sanderson warns against pouring out ideas too fast, even where fast talking works for other content. [Read (summary)](https://rosetta.to/u/3blue1brown/make-math-videos-summer-of-math-exposition-announcement)
- Vox's art director reported an average of about four minutes watched per video, which he considered very high. [Read (summary)](https://www.storybench.org/?p=21229)

Rober spends about 100 hours editing each video and cut roughly a thousand hours of squirrel footage to about 15 minutes. [Read (summary)](https://rosetta.to/u/waveform/mark-rober-talks-glitterbomb-creative-engineering-and-storytelling) Good pacing often comes from cutting, not from speed.

## Visual metaphors
- Kurzgesagt chooses metaphors while sketching, before final drawing. Its rule: the picture should match the words and explain the idea as clearly as possible, while still being fun to watch. [Read (summary)](https://rosetta.to/u/kurzgesagt/how-to-make-a-kurzgesagt-video-in-1200-hours)
- Vox made a paper clock that becomes a pie chart for a story about teachers' hours. For an abstract AI story, it used flying text as a repeated image. [Read (summary)](https://www.storybench.org/?p=21229)
- Ask what picture would illuminate the idea, even a simple one. [Read (summary)](https://www.3blue1brown.com/faq/)
- **Every metaphor breaks somewhere.** Glynn's teaching method includes showing where the comparison stops working, and warns that stretched comparisons create misconceptions, for example the eye as a camera. [Reported](https://www.scribd.com/doc/48480905/Glynn-1995). Harrison and Coll's guide says the same. [Reported](https://www.sagepub.com/books/Book226974)

**For us:** tent poles, a mineral bank and a blood cell factory are good. None currently says where it stops being true.

## How to build an idea step by step
- **Animation only earns its place when the change itself must be learned.** Across three large reviews, animation beat still pictures only slightly. A re-analysis found the gain depends on whether the viewer must learn the change: clear when they must, and almost none when they don't. In a later experiment with university students and a gear mechanism, animation was best for motions and pictures were best for positions. [Read](https://link.springer.com/article/10.1007/s11251-021-09541-w) The same paper cites Clark and Mayer, who advise a series of still frames for many explanations.
- **Draw it while you say it.** Students engaged more with Khan-style tablet drawing than with slides, and Guo's team credits continuous visual flow. [Read](https://www.cs.rochester.edu/hci/pubs/pdfs/edX-MOOC-video-production-and-engagement_LAS-2014.pdf) MinutePhysics drawings take shape at the speed of the explanation. [Read](https://www.livescience.com/55121-youtube-channel-minute-physics.html)
- **Every movement needs a reason.** Sanderson warns against animation that competes with the narration. [Read (summary)](https://www.3blue1brown.com/faq/)
- **Clean the picture first.** Johnny Harris, who I recall worked at Vox (**Memory**), removes place labels, roads and borders from his maps, then highlights one country and fades it as the camera moves on. [Read (summary)](https://rosetta.to/u/johnnyharris/how-i-make-my-maps)

## Recurring characters and hosts
| Who | What they do | Evidence |
|---|---|---|
| Kurzgesagt | Quirky, relatable characters are a stated trademark | [Read (summary)](https://kurzgesagt.org/youtube/) |
| 3Blue1Brown | Cartoon pi figures and shapes treated as characters with relationships | [Read (summary)](https://www.stanforddaily.com/2020/01/24/3blue1brown-creator-grant-sanderson-15-talks-engaging-with-math-using-stories-and-visuals) |
| Explainer writer Tyler Lowe | Invents and names fictional people who act out an idea | [Read](https://medium.com/@tyler.lowe/how-to-write-a-tight-script-for-an-animated-educational-video-3eb837e12eb5) |
| SciShow Kids | Host Jessi and a puppet friend, Squeaks. Sources disagree about what Squeaks is | [Reported](https://en.wikipedia.org/wiki/SciShow) |
| Muller's "Dialogue" | A student who says wrong things and a tutor who responds | [Read](https://openjournals.library.sydney.edu.au/IISME/article/view/6345) |

Research points in two directions. Human-like features and on-screen guides have support in a large review. [Read: abstract](https://journals.sagepub.com/doi/10.3102/00346543211052329) But Mayer says adding the speaker's image doesn't automatically help, and that a character who gestures and acts helps more. [Read: summary list](https://ugc.futurelearn.com/uploads/files/7d/d6/7dd6188d-c343-4311-b064-ac98d2c95abc/Multimedia_Principles._R._E._Mayer__2020.pdf)

**My conclusion:** a character should have a job in the explanation. A mascot who only waves is decoration.

## Colour and shape rules
**No channel has published its style guide.** What I could find:
- **Kurzgesagt:** rounded shapes and vivid colour, with consistency being what stands out. [Reported](https://artsatmichigan.umich.edu/ink/2019/09/27/simple-bright-beautiful-the-work-of-kurzgesagt) Vector art, some pixel art, and 2D with some 3D. [Read (summary)](https://kurzgesagt.org/youtube/) Most other pages describing its "rules" look machine-written, so I ignored them.
- **Thought Café:** the Crash Course style was designed to be easy to reproduce and still expressive. [Read (summary)](https://rosetta.to/u/crashcourse/a-history-of-crash-course) This matters for a channel with hundreds of lessons.
- **MinutePhysics:** stick figures, little detail and small touches of colour. [Read](https://www.livescience.com/55121-youtube-channel-minute-physics.html)
- **Duolingo, not a video channel but the best public rules I found:** few deliberate shapes, just enough detail, clear outlines, exaggerated key features, empty space around the art, and a shared style so many artists can work together. [Read (summary)](https://blog.duolingo.com/shape-language-duolingos-art-style/)
- **Research:** pleasant colours and faces in learning materials have some support. I only saw summaries, and I can't confirm the often-repeated claim about warm colours specifically. [Reported](https://rex.libraries.wsu.edu/esploro/outputs/journalArticle/Meta-Analysis-of-Emotional-Designs-in-Multimedia/99900601054701842)

## Sound design and music
- Kurzgesagt uses original music for every video, plus a layer of sound effects, to set a mood and stress key moments. It suggests headphones. [Read (summary)](https://rosetta.to/u/kurzgesagt/how-to-make-a-kurzgesagt-video-in-1200-hours)
- 3Blue1Brown has its own composer. Sanderson says poor audio hurt many early videos, so a good microphone matters. [Read (summary)](https://www.3blue1brown.com/faq/)
- **Against that:** in two experiments, students who got background music learned less from a short animated lesson, and added sound effects hurt in one of the two. [Read: abstract](https://tecfa.unige.ch/tecfa/teaching/methodo/Moreno_Mayer00.pdf) The students were at university, and the sounds weren't always meaningful, so this isn't the final word.
- **Our voice:** Mayer prefers a friendly human voice to a machine voice. [Read: summary list](https://ugc.futurelearn.com/uploads/files/7d/d6/7dd6188d-c343-4311-b064-ac98d2c95abc/Multimedia_Principles._R._E._Mayer__2020.pdf) Later work found modern synthetic voices can do about as well as a human, though my main source is a voice company's summary. [Reported](https://searchworks.jioinstitute.edu.in/articles/eric__EJ1225297) Our episode uses Kokoro. Only the owner can judge how it sounds.

## Words moving on screen (kinetic type)
I found no maker describing clear rules for this. The useful evidence:
- Short on-screen keywords help viewers notice what matters. [Read (summary): Brame](https://pmc.ncbi.nlm.nih.gov/articles/PMC5132380/)
- Printing the same sentence the narrator says tends not to help in fast lessons. [Read: summary list](https://ugc.futurelearn.com/uploads/files/7d/d6/7dd6188d-c343-4311-b064-ac98d2c95abc/Multimedia_Principles._R._E._Mayer__2020.pdf)
- But captions were among the biggest gains for people watching in a second language. [Read: abstract](https://journals.sagepub.com/doi/10.3102/00346543211052329)

**For us:** captions should be a switch each family controls. On-screen words should be 2–5 word keywords placed beside the thing they name.

**A small conflict to note:** our checklist bans highlighting one word in headings, and the lesson uses that style often, for example "Your bones are *alive*". In a lesson, highlighting the one word that matters is supported. It stops working if every line does it.

## Transitions
- Kurzgesagt plans transitions between ideas during the sketch stage, so they aren't added at the end. [Read (summary)](https://rosetta.to/u/kurzgesagt/how-to-make-a-kurzgesagt-video-in-1200-hours)
- Harris starts wide, zooms in, holds still at each stop, and adds a slight tilt and slow orbit. [Read (summary)](https://rosetta.to/u/johnnyharris/how-i-make-my-maps)
- Vox's map producer moves between a bird's-eye map and footage on the ground, which helps viewers place the story. [Read (summary)](https://www.storybench.org/vox-atlas-producer-sam-ellis-on-his-map-animations/)
- From memory, the best explainers often turn one shape into the next, so the transition itself carries meaning. **Memory:** I couldn't check this by watching.

## Tools
| Maker | Tools | Evidence |
|---|---|---|
| Kurzgesagt | Illustrator, After Effects, some Cinema 4D, Pro Tools. All movement hand-animated. 2–3 illustrators for 8–12 weeks, 2–3 animators for about 8–10 weeks, at least 1,200 hours per video | [Read (summary)](https://rosetta.to/u/kurzgesagt/how-to-make-a-kurzgesagt-video-in-1200-hours) |
| MinuteEarth | Wacom tablets, Photoshop, Audition, Premiere, After Effects, USB microphones, Google Docs for scripts, Trello | [Read (summary)](https://minuteearth.com/faq) |
| 3Blue1Brown | Manim, his own open-source code library, then a normal video editor. He says Blender or After Effects suit non-maths work better | [Read (summary)](https://www.3blue1brown.com/faq/) |
| Vox | After Effects, plus real construction paper | [Read (summary)](https://www.storybench.org/?p=21229) |
| Johnny Harris | After Effects, Illustrator, GeoLayers plugin | [Reported](https://aescripts.com/learn/how-johnny-harris-makes-maps/) |
| Thought Café | Illustrator and animator work from the script. Process not described | [Read (summary)](https://rosetta.to/u/crashcourse/a-history-of-crash-course) |

**What this means for us:** 3Blue1Brown proves that animation written as code can look excellent when it suits the subject. Code is strongest with repetition, counting, charts, drawn lines and diagrams. It's weakest with rich characters. Our best early ideas should play to this.

## Public animation style guides
**I found none from any channel listed above.** TED-Ed sends writers guidelines, but they aren't public. Useful substitutes:

| Source | What it offers | Evidence |
|---|---|---|
| [Duolingo shape language](https://blog.duolingo.com/shape-language-duolingos-art-style/) | Illustration rules. Best model for our art section | Read (summary) |
| [Smashing: animation in design systems](https://smashingmagazine.com/2019/02/animation-design-system/) | How to structure a motion guide: reasons, timing, easing (how speed changes during a movement), and a small set of named moves | Read (summary) |
| [Adobe's guide, same subject](https://xd.adobe.com/ideas/wp-content/uploads/2021/06/Animation-in-Design-Systems.pdf) | Start from the questions a team asks most | Reported |
| [GitHub](https://brand.github.com/motion), [Palfinger](https://brand.palfinger.com/en/design-basics/motion.html), [Zalando](https://brand.zalando.com/identity/motion/introduction/) | Real company motion guides. Palfinger gives exact After Effects values. Not educational | Reported |

## What learning research says helps and distracts
A **meta-analysis** combines many experiments into one result. An **effect size** of about 0.2 is usually called small, about 0.5 medium and about 0.8 large.

**Age warning:** nearly all these studies used adults or university students. I didn't find reviews that separate out ages 10–12. Some of these effects are reported to be stronger for beginners, which may favour us. [Reported](https://zendy.io/title/10.1111/jcal.12197)

| Finding | In plain words | Evidence | What it means for us |
|---|---|---|---|
| **Misconceptions** | University students given a clear video went from 6.0 to 6.3 out of 26. Those given a dialogue with wrong ideas went to about 11, reported more effort, and described it as confusing. Clear-video students became more confident without learning | [Read: transcript](https://rosetta.to/u/veritasium/khan-academy-and-the-effectiveness-of-science-videos). [Read: paper](https://openjournals.library.sydney.edu.au/IISME/article/view/6345): gains of half to one standard deviation; a single narrator stating and correcting the wrong idea (the "Refutation") also worked | Don't judge a lesson by whether children say it was clear or feel sure. Test what they know |
| **Correcting wrong ideas in text** | Combining 44 comparisons with 3,869 people gave a moderate benefit (0.41) | [Reported](https://pmc.ncbi.nlm.nih.gov/articles/PMC8784251) | The idea holds beyond Muller's study |
| **Largest design effects** | Captions for second-language viewers, words and pictures together in time and space, and cues that point to what matters | [Read: abstract](https://journals.sagepub.com/doi/10.3102/00346543211052329) (29 reviews, 1,189 studies) | Spend effort here first. It's mostly cheap |
| **Design matters more on TV** | Good design mattered more for complex material and when the system sets the pace, as with a lecture | [Read: abstract](https://journals.sagepub.com/doi/10.3102/00346543211052329) | Our lean-back TV episodes are the case where design matters most |
| **Seductive details** | Interesting but irrelevant material lowers learning, by a small to moderate amount (58 studies, more than 7,500 learners, -0.33). Worse when static and placed beside the relevant diagram | [Read (summary): press release](https://news.wsu.edu/press-release/2020/03/19/seductive-details-inhibit-learning), [Read (summary): figures](https://inspire.acu.edu.au/articles/seductive-details) | The whale mistake has a research name. Most studies lasted only 6–12 minutes and tested knowledge, not interest, so don't over-apply it |
| **Short chunks** | In 6.9 million adult sessions, median watching was at most 6 minutes whatever the length. Longer than 9 minutes, viewers often didn't reach halfway | [Read: paper](https://www.cs.rochester.edu/hci/pubs/pdfs/edX-MOOC-video-production-and-engagement_LAS-2014.pdf) | Supports chapters, not a 6-minute law. It measured watching, not learning, and the authors say so |
| **Enthusiasm over speed** | Faster speakers got more engagement, but the authors say the real cause is probably enthusiasm | [Read: paper](https://www.cs.rochester.edu/hci/pubs/pdfs/edX-MOOC-video-production-and-engagement_LAS-2014.pdf) | Our 160 words a minute is ordinary. Warmth matters more than speed |
| **Questions during video** | Testing during a 21-minute lecture halved mind-wandering and improved learning, in adults | [Reported](https://psychology.fas.harvard.edu/publications/interpolated-memory-tests-reduce-mind-wandering-and-improve-learning-online) | Supports shout-outs every few minutes |
| **Guiding questions** | Give viewers something to look for | [Read (summary): Brame](https://pmc.ncbi.nlm.nih.gov/articles/PMC5132380/) | Supports our "Watch for…" before videos |
| **Segmenting** | Learners do better when they control when the next part starts | [Read: summary list](https://ugc.futurelearn.com/uploads/files/7d/d6/7dd6188d-c343-4311-b064-ac98d2c95abc/Multimedia_Principles._R._E._Mayer__2020.pdf) | We auto-play. See idea 22 |
| **Pre-training** | Knowing key names first helps | [Read: summary list](https://ugc.futurelearn.com/uploads/files/7d/d6/7dd6188d-c343-4311-b064-ac98d2c95abc/Multimedia_Principles._R._E._Mayer__2020.pdf) | Show "femur" before the atlas fact uses it |

---

# Part 2: Educational books and encyclopedias

**Important:** I haven't seen these books. Descriptions of how their pages look often rest on other people's reports or my memory. The owner should look at real copies, especially Eyewitness, *The Way Things Work*, a Biesty book and a Marie Neurath book.

## DK Eyewitness (Peter Kindersley)
- Kindersley called his style "lexigraphic": bright, sharply defined photos, drawings and graphics on white, with extended captions acting as the text. [Read (summary): company history citing Business Week](https://encyclopedia.com/books/politics-and-business-magazines/dorling-kindersley-holdings-plc)
- His stated aim: "the information leaps off the pages" (Peter Kindersley, Business Week, 1996, as cited above).
- He developed the idea as an art director before founding the company, and left when his managers rejected it as too costly. Eyewitness launched in 1988, and little text made translation easier. [Read (summary)](https://encyclopedia.com/books/politics-and-business-magazines/dorling-kindersley-holdings-plc)
- **Trick for us:** the caption is the writing. An isolated object plus a sharp caption replaces a paragraph. It also helps us later with Spanish.

## David Macaulay, *The Way Things Work*
- Most diagrams use woolly mammoths to operate or represent machines, with a playful story from a mysterious inventor. [Read (summary): Wikipedia](https://en.wikipedia.org/wiki/The_Way_Things_Work)
- It's organised by principle, not by machine: movement, elements, waves, electricity. So different machines are linked by the same idea. [Read (summary)](https://en.wikipedia.org/wiki/The_Way_Things_Work)
- His first sketches looked like a mail-order catalogue. He and his editors reworked them, giving art more space and using fewer words. [Read (summary)](https://www.thedartmouth.com/article/2012/11/macaulay-discusses-drawing-career)
- He sees himself as a translator, and redraws until he understands. Some redrawing is only to find the right viewpoint. [Read (summary)](https://www.sevendaysvt.com/arts-culture/illustrator-david-macaulay-talks-about-drawing-learning-and-forgetting-21877060/)
- He hides surprises where you'll probably miss them the first time, so rereading pays, and uses unusual angles. [Read (summary)](https://csmonitor.com/1997/1028/102897.home.home.1.html)

## Stephen Biesty, cross-sections
- His "atmospheric cutaways" hold stories: hundreds of tiny people doing daily tasks. In *Castle*, a spy enters on the title page, moves through the book and leaves on the last page. [Read (summary)](https://www.core77.com/posts/21408/masters-of-the-cutaway-part-4-stephen-biesty-21408)
- *Man-of-War* reportedly challenges readers to find a stowaway. A search summary said so, but three articles I then opened didn't confirm it, so treat this as **Memory** until someone checks a copy. A 1994 CD-ROM based on the book was called *Stowaway*. [Read (summary)](https://www.csmonitor.com/1998/0203/020398.home.home.1.html)
- He pictures the subject in 3D, then draws the slices. [Read (summary)](https://www.tes.com/news/artist-who-exposes-slice-past) Comic moments hide in crowds, including schoolboy-style jokes, and he keeps harsh details where they're true to the subject. He believes substance is what holds children's attention. [Read (summary)](https://booksforkeeps.co.uk/article/authorgraph-95-stephen-biesty/)
- The books took 7–8 people and about 18 months to two years each. [Read (summary)](https://booksforkeeps.co.uk/article/authorgraph-95-stephen-biesty/)
- **Warning:** density like this can't be read from a sofa. It suits a tablet or a paused still.

## Usborne: See Inside and flaps
- Usborne changed how children's non-fiction looks by combining high-quality pictures with small, accessible bites of information. [Read: Guardian obituary excerpt](https://www.inkl.com/news/peter-usborne-obituary) It used in-house writers, illustrators and designers. [Reported](https://www.inkl.com/news/peter-usborne-obituary)
- *See Inside Your Body* has more than 50 flaps, some hiding smaller flaps. [Reported: retailer](https://booktopia.com.au/see-inside-your-body-katie-daynes/book/9780746070055.html) One new edition is listed for ages 6–9. [Reported](https://storybookcove.com/book/9781805071860)
- **Warning:** that age range is below ours. The idea of a reveal is useful, but it mustn't look babyish.

## Fritz Kahn, "Man as Industrial Palace" (1926)
- The poster shows the body as a factory, with mechanical lungs, a rock-sorting stomach, and a switchboard brain. It was one insert in his series *Das Leben des Menschen*. [Reported](https://www.openculture.com/2011/06/man_as_industrial_palace.html)
- **Kahn couldn't draw.** He gave written instructions and sketches to many illustrators. "Kahn" worked almost like a brand, and a later study lists 21 other illustrators. **This is close to how we'd work with one.** [Read (summary)](https://eyemagazine.com/feature/article/machine-head)
- His tricks: tiny workers doing body jobs, everyday comparisons such as a man pressing a doorbell, cutaways, and the bloodstream as a fantastic voyage. [Read (summary)](https://eyemagazine.com/feature/article/machine-head)
- **Directly about us:** bones are shown beside engineering support structures, the eye as a camera, enzymes as workers unpacking parcels, and blood cells as a line that would circle the equator more than three times. [Read (summary)](https://hekint.org/2022/03/31/dr-fritz-kahn-and-medical-infographics/)
- Historian Cornelius Borck says engineering comparisons deepen awe at one's own body. [Read (summary)](https://www.fritz-kahn.com/?p=300)
- **Three warnings:**
  - Borck also argues the little workers undercut the explanation: if a tiny man does the job, you haven't explained how it's done. [Read (summary)](https://eyemagazine.com/feature/article/machine-head)
  - The work treats the male body as the model and often portrays the female body badly. [Read (summary)](https://eyemagazine.com/feature/article/machine-head) Our version must not repeat that.
  - **Don't reuse his images without a license check.** He died in 1968, so copyright may still apply in some countries. **My reasoning, not legal advice.** The `license-checker` should look at this.
- Eye Magazine notes that the machine imagery now looks comical next to modern biology. [Read (summary)](https://eyemagazine.com/feature/article/machine-head) So we'd copy the thinking, not the historical machine look.

## Otto and Marie Neurath, Isotype
- **Show more by repeating symbols, not by making one bigger.** Repeated figures can be counted, and sizes are hard to compare. [Read (summary)](https://en.wikipedia.org/wiki/Isotype_(picture_language)), [Read (summary)](https://isotyperevisited.org/2010/09/isotype-revisited.php) The scale of each symbol was stated clearly. Pictures almost never used perspective.
- **Colour carries information, never decoration.** One nursery chart used red for city and green for countryside. Pictures show only what the statement needs. [Read (summary)](https://isotyperevisited.org/2010/09/isotype-revisited.php)
- **The "transformer":** Marie Neurath's job was to turn expert material into a self-explaining picture. **This is a real job description our team lacks.** [Read (summary)](https://en.wikipedia.org/wiki/Isotype_(picture_language))
- **Her children's books:** more than 80 books, made by scientists, illustrators and writers together. Her named techniques are magnification, cross-section and sequencing. Those techniques aren't realistic, yet they made the subjects clear. [Read](https://research.reading.ac.uk/picturingscience/marie-neurath-picturing-science-exhibition-at-the-house-of-illustration/) Titles include [*If You Could See Inside* and *A New Life Begins*](https://research.reading.ac.uk/picturingscience/marie-neuraths-books-for-children/).
- **One chart per spread, with questions the chart can answer.** The aim was for children to look, compare and draw their own conclusions, and young readers were consulted. [Read (summary)](https://isotyperevisited.org/2010/09/isotype-revisited.php) How teachers and children received the books is covered in [Walker's article](https://centaur.reading.ac.uk/25277/). Abstract only: **Read.**
- **A free source to read next:** Sue Walker's book on these children's books is listed as open access. I didn't read it. [Reported](https://www.schweitzer-online.de/en/buch/Walker/Marie-Neuraths-Isotype-Books-for-Children/9781350375055/A76769213/)

## Edward Tufte
- **Small multiples:** similar pictures side by side on the same scale, so the eye can compare. Tufte contrasts this with showing one thing after another. [Read (summary): course notes](https://people.eecs.berkeley.edu/~ddgarcia/tufte.html). [Reported: Wikipedia](https://en.wikipedia.org/wiki/Small_multiple)
- **"Compared to what?"** A number means little without something to compare it with. [Read (summary)](https://people.eecs.berkeley.edu/~ddgarcia/tufte.html)
- **Smallest effective difference:** make marks only as strong as they must be. [Read (summary)](https://people.eecs.berkeley.edu/~ddgarcia/tufte.html)
- **Layering:** push the background context back visually and put the important route on top. [Read (summary)](https://www.edwardtufte.com/notebook/less-is-more-route-maps-from-mapblast/)
- **Micro/macro, and words beside pictures:** the fine detail and the big picture can share one view, and words belong right next to what they describe. I only confirmed that these chapters exist. [Reported](https://www.edwardtufte.com/notebook/analytical-design-and-human-factors/). Details: **Memory.**

## National Geographic: maps and infographics
- **Each kind of map feature has its own typeface,** so the letters show what a name refers to. Colour and weight add further levels. Its map type dates back to the 1930s. [Read (summary)](https://www.nationalgeographic.com/maps/article/national-geographics-cartogaphic-typefaces)
- From the 1960s, map supplements added inset maps, graphics and illustrations. [Reported](https://www.nationalgeographic.com/science/article/150123-maps-mapping-cartography-history-national-geographic-centennial)
- **Fernando Baptista's giraffe graphic is full of useful tricks.** [Read (summary)](https://infowetrust.com/project/giraffe)
  - The format follows the subject: a tall fold-out because giraffes are tall.
  - A human and a close relative give scale, with the man at low opacity so the animal stays the focus.
  - A vertebra at actual size worked in print but not on the web.
  - Clay models were used as a reference for light.
  - Cutaways are hard to read, so he managed transparency and colour carefully, sometimes across more than 1,000 layers.
  - A researcher spent 84 hours gathering facts and checking them with experts.
  - Colleagues showed him how readers actually used it. He warned that makers stop reading as an audience would.

## Horrible Science (Nick Arnold, Tony De Saulles)
- Focuses on the unusual, gory and unpleasant. Science words come in gradually through humour and fact files, and it has quizzes, cartoons and "Dare you discover" experiments. [Read (summary)](https://en.wikipedia.org/wiki/Horrible_Science) It has won Royal Society science book prizes. [Read (summary)](https://en.wikipedia.org/wiki/Horrible_Science)
- Aimed mainly at ages 8–12. Arnold writes first, designers leave gaps, and De Saulles invents picture and joke. He can exaggerate for humour, but the information must stay accurate. [Read (summary)](https://sciencebookaday.com/2014/05/16/science-book-a-day-interviews-tony-de-saulles)
- Arnold says he greatly over-researches each subject. [Reported](https://en.wikipedia.org/wiki/Nick_Arnold_(writer))

## Wide Eyed and Flying Eye atlases
- **Correction to a common mix-up:** *Maps* by the Mizielińskis is from Big Picture Press, not Wide Eyed. It reduces countries to borders, as a backdrop for thousands of small pictures. [Reported: Kirkus](https://kirkusreviews.com/book-reviews/aleksandra-mizielinska/maps-mizielinski/print)
- **Wide Eyed's *Atlas of Adventures*:** each detailed scene is annotated with facts. [Reported](https://www.schoollibraryjournal.com/review/atlas-of-adventures-a-collection-of-natural-wonders-exciting-experiences-and-fun-festivities-from-the-four-corners-of-the-globe) I found no publisher or illustrator statement on method.
- **Flying Eye's *Professor Astro Cat*:** text is never fixed. It's revised while the pages are designed, and the creators call this a breakthrough. Walliman treats word economy like a crossword puzzle. [Read (summary)](https://teenlibrarian.co.uk/2016/03/14/an-interview-with-dr-dominic-walliman-ben-newman-creators-of-professor-astro-cat/) Illustrator Ben Newman works with a restricted colour palette, inspired by old printed items such as 1950s matchbox labels. [Read (summary)](https://thebookwormbaby.blogspot.com/2016/03/interview-with-dr-dominic-walliman-and.html) This shows that a limited palette can become a strong identity.

## Classic children's encyclopedias
- **Arthur Mee's *Children's Encyclopædia* (1908):** first sold as fortnightly parts. Organised by recurring themed sections, not alphabetically, so it could be read through or looked up. Recurring features included a "Book of Wonder" where a wise man answered children's questions, and a section of things to make and do. [Read (summary)](https://en.wikipedia.org/wiki/The_Children%27s_Encyclop%C3%A6dia) **This is the closest historical match to a channel.** It also carried imperial and racial views of its time, which is a reason to check content, not just form.
- **Compton's Pictured Encyclopedia (1922):** named for having an unusually large and varied set of pictures. It added a Fact-Index in 1940. Its articles began simply and became gradually more complex, a "pyramid" structure. [Read (summary)](https://en.wikipedia.org/wiki/Compton%27s_Encyclopedia)
- **World Book:** today's children's editions use simpler text, more pictures, and reading-level measures. [Reported](https://www.worldbook.com/Discovery-Encyclopedia.aspx) I couldn't verify its early history.

## The topics you asked about, across all these books
| Topic | Main trick | From |
|---|---|---|
| **Double-page spread** | One topic and one main picture. Text and picture adjusted together. Questions the picture can answer | Neurath, Astro Cat. "One topic per spread" for DK is **Memory** |
| **Scale comparisons** | Put a known thing beside it, faintly. Use real size only where the medium allows it. Compare with a familiar distance | Baptista, Kahn |
| **Cutaways** | Imagine it in 3D, then slice. Add life and story. Manage layers carefully | Biesty, Neurath, Baptista |
| **Annotation** | Label beside the thing. A different typeface for each kind of label. Thin lines | National Geographic, Tufte. Thin leader lines: **Memory** |
| **Thumb index and colour coding** | A [thumb index](https://en.wikipedia.org/wiki/Thumb_index) is a set of labelled notches on the page edge. It shows the whole book's structure and your place in it. DK's colour coding per section is [Reported](https://madegooddesigns.com/dk-eyewitness-brand-guidelines/), from a weak source | Dictionaries, DK |
| **Information hierarchy** | Big picture, then labels, then small facts. Begin simple, then get harder | DK, Compton's |
| **Rewarding both skimmers and deep readers** | Hidden jokes, a traveller to follow, flaps, and small facts. The main idea can be taken from the picture alone | Biesty, Macaulay, Usborne |
| **Humour** | About the subject itself, never instead of it. Accuracy doesn't bend | Horrible Science, Macaulay, Biesty |
| **Captions** | The caption is the main text, not a footnote | DK |

## What not to copy
- **Kurzgesagt's budget or exact look.** At least 1,200 hours a video, and possibly about 25–30 people on videos at any one time. [Reported](https://pol1.lr.ggtyler.dev/r/IAmA/comments/ql88mw/hi_im_philipp_dettmer_founder_and_head_writer_of/hj1fv7x) Copying its look would be weak and would invite comparison.
- **Biesty-level density on a TV.** It belongs on a tablet or in a paused still.
- **Young styling.** See Inside is for younger children and flaps can look babyish. SciShow Kids is also younger. We already list it as "younger and gentle".
- **Rober's stunts or shoot-first method.** They suit his format, not curriculum lessons.
- **Tiny-worker explanations with no real mechanism.** See the warning on Kahn.
- **Treating research as rules.** "Remove all music" and "under 6 minutes" are too simple to use as laws.

---

# Part 3: Ideas for us

Effort: **Small** = code and script. **Medium** = a real new scene type or several days. **Illustrator** = needs one to be good, although a code stand-in can test the idea.

## Script and structure
| # | Idea | From | How it works in the skeleton lesson | Effort |
|---|---|---|---|---|
| 1 | **Wrong idea first** | Muller, [Oak](https://www.thenational.academy/teachers/programmes/science-secondary-ks3/units/human-skeleton-and-muscles/lessons/the-human-skeleton) | Oak lists "bones aren't living" as the common misconception ([Read](https://www.thenational.academy/teachers/programmes/science-secondary-ks3/units/human-skeleton-and-muscles/lessons/the-human-skeleton)). **Remove "It's alive" from the hook.** Open chapter 5 with a shout-out: alive or dead? Show why dead feels right, a dry museum bone, then disprove it. Pay off in chapter 6: a dead thing can't heal itself. Add one wrong-idea moment to each lesson | Small |
| 2 | **"Puddle", a wrong-on-purpose sidekick** | Muller's Dialogue, Macaulay's mammoths, Sanderson's pi | The cold open already says you'd be a puddle without bones. Make that puddle a small recurring character who confidently says wrong things: "Muscles push bones, right?" The narrator corrects him. Connects to Rive, section 13 of the design research. Must be dry and funny, not cute. The owner should choose | Small to test by voice; Illustrator for final |
| 3 | **Script in two columns: say and show** | TED-Ed, Kurzgesagt, Astro Cat, Macaulay | Add a `show` note beside each `say` in the episode file. If the picture already says it, cut the words. Example: the atlas line naming humerus, radius and ulna could become a label sequence with fewer words | Small |
| 4 | **Picture first, name second** | Sanderson | Chapter 4: show a straight bone trying to bend and failing. Then show two bones meeting and moving. Only then say "joint". Same for "compact" and "spongy" in the slice | Small |
| 5 | **Named sections that return every lesson** | Mee, Horrible Science | Give fixed names and looks to what's already there: **Wrong!** (myth), **Record holders** (femur and stapes), **Dare you** (the vinegar bone), **Bonus**. Children start to look forward to them, like magazine sections. Scene types already exist for most | Small |
| 6 | **Cover first, with an honest promise** | Rober, Muller, Kurzgesagt | Design the cover before the script: a person melting into a puddle under the title. The lesson must then pay it off. Rule: if the cover promises it, the lesson shows it. Our whale mistake came from reversing this | Small template; Illustrator for key art |

## Explaining with pictures
| # | Idea | From | How it works in the skeleton lesson | Effort |
|---|---|---|---|---|
| 7 | **Little workers, with the real names** | Kahn | The `rebuild` scene becomes a demolition crew and builders working on a bone. Name them: osteoclasts break down, osteoblasts build (**Memory, needs the fact-checker**). Then say the limit aloud: they're cells, and no little person is in charge | Medium; Illustrator for richness |
| 8 | **The engineering twin** | Kahn, Culmann | In `slice`, show spongy bone next to a crane or bridge: both put material along the paths force takes. The story of an engineer comparing a femur with his crane drawing in 1867 is [Reported](https://pmc.ncbi.nlm.nih.gov/articles/PMC3183195), but [details are disputed](https://pubmed.ncbi.nlm.nih.gov/27665092/), so use the simple comparison and check it | Medium |
| 9 | **Count by repeating** | Neurath | The `count` scene shows 206 identical small bone symbols, not only a number. Then 106 move to hands and feet, so children *see* more than half. For 300 to 206, watch symbols join. Perfect for code | Small |
| 10 | **Colour must mean something** | Neurath, National Geographic | Give each of the five jobs one colour, and bring it back later: when marrow appears in `slice`, it's "Make" purple. The recap shows them all. Chapter backgrounds stop using those colours. Check for colour-blind viewers | Small |
| 11 | **Every number gets a comparison** | Tufte, Kahn, Baptista | "2 million red cells a second" becomes a pay-off: during this 7-minute lesson, your marrow made about 840 million (**my arithmetic: 2 million × 420 seconds, based on our script's figure; fact-check it**). Stapes beside a grain of rice. Femur beside a faint child's body | Small |
| 12 | **Cutaway in layers** | Biesty, Baptista, Neurath | `slice` starts with a real bone, removes one layer per sentence, and keeps what's gone as a faint outline. A tiny blood vessel with moving cells makes it feel alive | Medium; Illustrator for richness |
| 13 | **"You are here" inset** | Tufte, Neurath's magnification | Whenever the camera zooms into the atlas or inside a bone, a small body outline in the corner shows where we are. Stops viewers getting lost | Small |
| 14 | **Draw it as you say it, label on the thing** | Mayer, Noetel, Guo, MinutePhysics | No legends or side panels. Each label draws itself beside the part at the moment it's named. Applies across the atlas, `slice` and `heal`. These are among the largest effects in the review | Small to medium |
| 15 | **One lettering style per kind of label** | National Geographic | Bone names look one way, numbers another, the narrator's keyword a third. Children learn to read them instantly. Fits the 5–6 type sizes already planned | Small |

## Making video work like a book
| # | Idea | From | How it works in the skeleton lesson | Effort |
|---|---|---|---|---|
| 16 | **Every chapter ends as a "spread"** | DK, Neurath, Clark and Mayer, Ploetzner | Motion teaches, then settles into one designed still page: big object, labels and 1–2 small facts, held 3–5 seconds. Seven chapters make seven pages. They become the recap, tablet revision pages and the lesson's "book". The animation itself becomes the way the page is built | Medium |
| 17 | **Strip for anything that changes in stages** | Tufte, Ploetzner | After the healing animation, all four stages stay side by side. Same for hinge, ball and fixed joints | Small |
| 18 | **Lift the flap on pause** | Usborne, Biesty, DK | When a still has extra content, a small mark appears. Pressing OK reveals one layer deeper, such as the ear bones behind "stapes". It's marked bonus, not in the test. Must look like an anatomy plate, not a toy | Medium |
| 19 | **A hidden traveller** | Biesty's spy, Macaulay, Kurzgesagt's Easter eggs | A tiny recurring object appears somewhere in each chapter card and cover. The recap asks where it was. Keep it **away from teaching moments**, because seductive details hurt most beside the relevant diagram | Small stand-in; Illustrator for final |
| 20 | **Thumb-tab chapter rail** | Thumb index, DK | A slim row of coloured tabs on the screen edge shows the whole lesson and your place. Same colours in the chapter menu. Must stay inside the TV safe area and be easy to hide | Small |

## Sound, pace and the learning map
| # | Idea | From | How it works | Effort |
|---|---|---|---|---|
| 21 | **Music only in the gaps** | Moreno and Mayer, Kurzgesagt, Boiarsky | **This changes our current plan.** Music in the cold open, chapter cards and pay-offs. Silence or almost silence under hard explanations such as the `slice`. Sound effects only for meaningful events, such as a click when bones join. Make two versions of one chapter for the owner to compare | Medium; composer for final |
| 22 | **"Ready?" at chapter ends** | Mayer's segmenting, Noetel | On the still from idea 16, offer OK to continue, with auto-play after a few seconds. Gives some control without breaking lean-back TV. Needs testing with the kids | Small |
| 23 | **The Body City** | Kahn | **One big idea for science.** The body as one illustrated city seen in cutaway. Skeleton is the frame and scaffolding, heart and blood are the transport, digestion is the works. Each unit is a district and each lesson a street. It becomes unit covers and the science part of the learning map. Modern and our own, with no factory-era styling or gender bias. Links to direction B without needing a whole illustrated world | Illustrator |
| 24 | **Map with a pale world and a bright route** | Tufte, Harris, National Geographic | The whole year sits faded in the background. Today's route is bright on top. A small inset shows the full year. Directly answers the owner's complaint: "Focus spreaded" | Medium |

## My suggested order
1. **Do now, nearly free:** 1, 3, 9, 10, 14. They improve the lesson without new art.
2. **Prototype next:** 16 and 17, because they join the video and the book.
3. **Test with the family and the owner's ears:** 21, 22 and 2.
4. **Bring to an illustrator:** 23, 7, 6. Kahn's method, written instructions and sketches for illustrators, is a good model for how we could work.

---

# Draft outline for our video style guide

Proposal only. Numbers are starting values from this research and our own lesson, **not research results**. Test them on the real TV.

**1. What this guide is for**
- Our stance in one sentence. Possibly: entertain like a creator, organise like an encyclopedia, check like a school (from the playbook).
- Who uses it: writer, animator, illustrator, Claude.

**2. Script rules**
- Every lesson names at least one real wrong idea, with a source, and disproves it.
- One idea per chapter. Concrete first, name second. No opening definitions.
- Each line has a `say` and a `show`. Cut words the picture already says.
- About 900 words is our current size. Going beyond it needs a reason.
- The cover's promise must be paid off in the lesson.

**3. Pace (starting values)**
- A picture change every 3–6 seconds while explaining.
- A chapter of 30–60 seconds of narration.
- A question every 2–3 minutes.
- A still held 3–5 seconds at each chapter end.
- Slow down for the hardest idea. Don't speed everything up.

**4. Metaphor rules**
- One main metaphor per idea. Don't mix them in one scene.
- Say where it stops being true, at least once in the lesson.
- A helper figure, like a tiny worker, can't be the explanation. Show the real mechanism too.
- The fact-checker reviews every metaphor, not just the facts.

**5. Motion vocabulary (a small set of named moves)**
- **Build:** a diagram draws itself as it's spoken.
- **Peel:** remove a layer, leave a faint outline.
- **Dive:** the camera goes in, with a "you are here" inset.
- **Repeat:** counting with identical symbols.
- **Settle:** motion ends as a still spread.
- One signature transition across the channel.
- Animate only what changes. Use stills for positions and structure.
- Every movement has a reason. If it doesn't, remove it.
- How speed changes during a movement (easing), with exact timings per move.

**6. Colour**
- A colour always has a meaning that lasts through the lesson.
- A subject and unit palette, with a test for colour blindness.
- Rules for TV: no pure white, and cooler or muted colours as already proposed.

**7. Shapes and illustration** (modelled on Duolingo)
- Few shapes, clear outline, just enough detail.
- How close to reality for anatomy: accurate proportion, simplified surface.
- Exaggerate only what's being taught.
- A style simple enough to repeat for hundreds of lessons.
- Photo rules: one treatment. Every image must show what's being taught.

**8. Type on screen**
- One lettering style per kind of label: part name, number, keyword.
- Keywords of 2–5 words, placed beside the thing.
- Never print the narrator's whole sentence, except as switchable captions.
- Highlight a word only when it's the point of the scene.
- Minimum sizes from `docs/background/DESIGN-RESEARCH.md`, section 3.

**9. Scale and numbers**
- Every number has a comparison.
- Show quantity by repeating symbols, not by enlarging one.
- Same scale when two things are compared, and say so.

**10. Characters**
- Each has a job in the explanation.
- Tone: witty and slightly older than the audience. List of things they never do.
- Rules for gender and diversity, learned from Kahn's failure.

**11. Humour**
- Must be about the subject, and the fact stays accurate.
- Keep hidden jokes out of teaching moments.
- Gross is allowed where it's true and useful. Check with the parent review.

**12. Sound**
- When music plays and when it doesn't.
- Sound effects only for meaningful events.
- The voice: warmth, speed, and pronunciation rules.
- A channel sting and rare hero sounds, as already proposed.

**13. Book layer**
- The structure of a spread: one hero, labels and small facts.
- Layers: voice for everyone, labels for lookers, flaps for the curious.
- Named recurring sections and how they look.
- Bonus content is always marked and never in the test.

**14. Covers and map**
- One subject, title and series mark, always in the same place.
- Unit colour links to the map.

**15. Safety and access**
- Captions on a switch.
- Avoid rapid flashing, and offer calmer motion. Exact limits to be taken from accessibility standards. **Memory: about three flashes a second is the usual limit.**
- TV safe area.
- Sensitive body content is flagged. Oak marks this lesson for adult supervision and possibly sensitive content ([Read](https://www.thenational.academy/teachers/programmes/science-secondary-ks3/units/human-skeleton-and-muscles/lessons/the-human-skeleton)).

**16. Review checklist**
- Does each image show what's being said?
- What wrong idea did we address?
- Remove the decoration: does anything get worse?
- Test questions, not "did you like it?" or "was it clear?". Muller found viewers can feel clearer and more confident without having learned.
- Watch it at TV size with a child who hasn't seen it.

---

# What I couldn't verify
- **Watching or hearing anything.** All pacing, sound and transition notes come from what makers say, not from my own viewing.
- **Shot lengths:** no published figures for any channel. The only number for Kurzgesagt is my estimate.
- **Kurzgesagt's visual rules:** I found no official guide or talk. Pages claiming to describe them looked machine-written. The AMA page on a Reddit mirror wouldn't load, so the team size is from a search snippet only.
- **TED-Ed's actual guidelines:** known only through one writer's account. I couldn't read the "Making a TED-Ed Lesson" videos, because their transcripts failed to load.
- **Thought Café and SciShow Kids:** I found nothing on how they work beyond short comments. Treat both as weak.
- **Vox:** two Storybench interviews only. No written rules for kinetic type. Interview dates may mean the process has since changed.
- **Mark Rober's Super Mario Effect:** I read only summaries, not the talk or its data. From memory, it was an informal online experiment, so I didn't use it as evidence.
- **Muller's thesis:** I read a conference paper and a video transcript, not the full thesis. Both used university students. Transcript numbers come from one experiment.
- **Mayer:** I read a one-page list of the 2020 principles made by someone else, not the book. Effect sizes differ between sources, so I mostly left them out.
- **Reiss and Tunnicliffe (2001), children's drawings of the body:** the [UCL record](https://discovery.ucl.ac.uk/id/eprint/1490583/) blocked me, including in the browser, so I can't report its findings. It may hold real misconceptions by age, and is worth a person's time.
- **Age 10–12 evidence:** I found no study that tests these design ideas in this exact age group.
- **Books:** I haven't seen any of them, so page descriptions are second-hand. DK's "one topic per spread" and thumb tabs are from memory or weak sources. I confirmed the definition of a thumb index, but not its use in children's encyclopedias.
- **Kahn:** I didn't read Borck's article, Sappol's book or Kahn's own text. I rely on Eye Magazine and other articles. The copyright position is my reasoning only.
- **Tufte:** I read notes and a few pages from his site, not his books.
- **Usborne:** its own site pages didn't load, and I saw only part of the obituary. Flap details come from retailers. The hidden yellow duck I remember from Usborne books couldn't be confirmed, so I left it out.
- **Nick Arnold's paper "Teaching Science the Horrible Way":** I couldn't get it.
- **Wide Eyed:** I found reviews and listings, but no statement from makers about method.
- **Facts in the ideas:** osteoclast and osteoblast roles, the crane comparison, the 840 million figure and the 2 million a second it relies on all need the `fact-checker` before use.
