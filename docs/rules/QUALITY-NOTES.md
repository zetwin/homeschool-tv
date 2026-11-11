# Quality notes: what we learned the hard way

Last updated: 2026-11-11. **Read before writing a lesson, a test or a screen.** Each line is a mistake that was really made, or something that really worked, turned into a rule. The detailed rules are in the other files in `docs/rules/`; this file says why they exist.

## What works: keep it
- **The motion lesson works.** Voice, real photos, chapters, short trimmed clips inside the chapters, then a test on each child's device. Keep this formula.
- **Open like a real class:** welcome, what we learn today and why, what we already know, then the hook. End with what we learned and what's next.
- **The QR code at the end** that sends each child to their test is liked. Keep it.
- **Fit one screen.** The program document, the diary, the timetable and every test question fit one screen with no scrolling.

## Lessons
- **About 15 minutes:** about 10 minutes of voice and 2 or 3 clips. A 5-minute lesson feels small. Plan the whole topic first, and say what later lessons will cover.
- **Every picture must show what's being taught at that moment.** A whale on a skeleton lesson, chosen because it was impressive, was the worst mistake so far. Check what's actually in the frame after any zoom or crop.
- **A cover must match the lesson's title and idea,** not just its topic. Test: hide the title. Can you guess the lesson?
- **Separate official content from additions,** and label additions as bonus. Never add content without saying it was your choice.
- **Check the source's lesson split** (for example, which Oak lesson an idea belongs to) before placing an idea.
- **One template makes lessons feel the same.** Vary the chapter looks; never two neighbours alike.
- **Check who a resource is for.** A video from a nursing exam course is not for a 10-year-old.
- **Sensitive topics need both independent checks.** On emotions, the fact-checker caught a hook that could shame children who take real medicine, and that "tell a parent" fails a child when home is the problem.
- **Photograph every scene before trusting a check.** Captions hid the bottom of scenes, a title ran into its caption, and a wrong video entry blanked the whole home page, while the checks passed.
- **One broken lesson file can blank the whole app,** because the home page reads every lesson. Run `node tools/check-lesson.mjs <id>` and `npm run verify` before a lesson reaches the family.

## Videos
- **A person watches every clip first.** Claude can't watch video or hear audio.
- **Videos must teach all the way through.** Read the description and chapters before proposing one.
- **A cut point is content, not a number.** Read the captions at every start and stop (`tools/clip-cuts.py`), so no clip cuts mid-sentence.
- **Test that a video plays inside our page.** Some channels block embedding; only a real player test shows it.
- **Never send children to another tab mid-lesson.** If a clip can't play, carry on without it.
- **Test on slow internet too.** A short time limit silently skipped videos.

## Voices
- **Slides with a browser voice aren't acceptable.** Lessons use recorded voices.
- **Native speakers judge a language's voice,** not the people building it. Ask them early.
- **Copy the official method before making a shortcut.** A home-made Spanish conversion broke the sounds "ai" and "ei" in every line.
- **Measure before claiming, with a control voice.** Speech recognition plus a known-good voice shows what's really wrong. Small samples mislead: test on the lesson's real words.

## Tests and exams
- **Tests must feel real and interesting:** tap a region, drag, sort, slide, write. Plain multiple choice isn't enough.
- **The interaction comes from the lesson,** not from a game theme on top. Game quality means craft (depth, light, motion), not monsters and "Attack!" buttons.
- **Tests must be cheap to make for each lesson:** reusable question types filled with data.
- **Decoration beside a question is noise.**
- **Children do everything on their own.** Tests and exams mark themselves; children check their own written answers against the model answer.

## Screens
- **Start from the reader:** who, which device, how far away, what they read first. Then style.
- **One screen, one job, one focus.** One main thing, then secondary, then supporting (`VISUAL-HIERARCHY.md`).
- **Quieter must not mean smaller.** Some parents can't read small text: parent screens use body text of 20 px or more on an iPad and fill the width.
- **Agree what a screen says before how it looks.** Write the content as plain text first. Don't invent features to make a sample interesting.
- **Different options must be different structures,** not the same boxes in other colours.
- **Research real reference apps first,** and design from what they do and why. Flat CSS variations without research looked "AI-made".
- **Use professional icon sets.** Hand-drawn icons look poor. A category picture shows what's inside it.
- **Write the word on important buttons.** An icon alone isn't a way in.
- **One navigation, the same on every page,** and one way home.
- **After a second rejection of the same page, don't patch it.** Write the reader's questions again and start over.
- **Nothing that says prototype, sample, test or placeholder** may reach a screen a family sees.

## Testing
- **Test browsers run hidden and muted** (`node tools/browser-check.mjs`). A hidden test once played a lesson aloud.
- **Look at every screen, even when checks pass.** White buttons on white cards and a frozen pause icon passed every automatic check.
- **Test on the devices really used:** iPads run Safari, so check WebKit too. Test a child's dark theme on shared screens.
- **Tap with real key presses and the remote.** That finds map taps that do nothing and a remote trapped by a video.
- **Never serve the family from the folder you work in.** Use a stable copy (`npm run live`) and release checked work (`npm run release`).
- **Never write a real password into a project file.**
