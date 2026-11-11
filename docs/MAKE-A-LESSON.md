# How to start making lessons

A guide for a parent who wants to make new lessons for Home School TV. You don't need to know how to code. Claude writes the lesson; you decide what it teaches, and you watch and listen before the children see it.

These steps work on **Windows** and on a **Mac**. Setting up takes about an hour the first time. After that, a lesson takes an afternoon: some of it is Claude working, and the most important part is you watching it.

---

## Part 1: Set up, once

### 1. Get what you need
- **A Claude plan that includes Claude Code** (Pro or Max). Sign up at [claude.ai](https://claude.ai).
- **The Claude app** for Windows or Mac: [claude.ai/download](https://claude.ai/download). Install it and sign in.
- **Node.js:** go to [nodejs.org](https://nodejs.org), download the version marked **LTS**, and install it like any app.
- **Git** (only on Windows): download it from [git-scm.com](https://git-scm.com/download/win) and install it with the usual choices. A Mac offers it by itself in step 4.
- **Microsoft Edge or Google Chrome.** Windows already has Edge. Claude uses it, hidden and with no sound, to check the lessons.
- **About 2 GB of free disk space.**

### 2. Make a folder
Make a folder for the project, for example **Documents → Home School** (in File Explorer on Windows, or Finder on a Mac).

### 3. Open the folder in Claude
1. Open the Claude app.
2. Go to the **Code** tab.
3. Choose the folder you just made.

### 4. Let Claude download and check everything
Type this to Claude, as it is:

> Download https://github.com/zetwin/homeschool-tv into this folder. Then run `npm run doctor`, and help me install everything it says is missing, one thing at a time. Explain each step in simple words.

Claude will ask before it runs each command. Say yes.

**What only you may need to do:**
- **Windows:** if Windows asks "Do you want to allow this app to make changes?", click **Yes**. If Claude asks you to run a command yourself, open **Terminal** (right-click the Start button → Terminal), paste it, and press Enter.
- **Mac:** if your Mac asks to install **developer tools** (for `git`), click **Install** and wait. If Claude says **Homebrew** is missing, open the **Terminal** app, paste the command from [brew.sh](https://brew.sh), press Return, and type your Mac password when asked (it doesn't show as you type; that's normal).

Then tell Claude it's done.

### 5. See the app
Type to Claude:

> Start the app and tell me the address to open.

Open **http://localhost:8080** in your browser. You'll see the TV home with the lessons. Log in with the example accounts shown under **Test accounts**.

### 6. Read what "good" means (10 minutes)
Open these on GitHub, or ask Claude to explain them:
- [Quality notes](rules/QUALITY-NOTES.md): mistakes we made, and what worked
- [Lesson rules](rules/LESSON-RULES.md): how every lesson is built

---

## Part 2: Make a lesson

### 1. Choose the lesson
Look at the program to see what's planned: open **http://localhost:8080/#program**. Pick one lesson: a subject, a unit and a lesson number.

### 2. Ask Claude
Start a new conversation in the Code tab (same folder). Say what you want, in your own words. For example:

> Make a new lesson: Science, unit "Human skeleton and muscles", lesson 3, "Movement". Follow CLAUDE.md and the lesson rules. Tell me the plan first.

or

> Make Geography, Colombia, lesson 3: the people and culture of Colombia.

### 3. Agree the plan
Claude first finds the official goals for that lesson and tells you the plan: what children will learn, the chapters, and what's bonus. **Read it, change what you want, and then say yes.** Nothing is built before your yes.

### 4. Let Claude build it
Claude now writes the script, finds pictures with licences, chooses video clips, records the voice, writes the test, and runs the checks and the helpers (fact check, a first look as a child, TV test). This can take a while. It will tell you when it's done and what it couldn't check.

### 5. Check the video clips
Claude can't watch videos. It gives you the list of clips it suggests. **Watch each one all the way through**, and say yes or no to each. Say no to anything that wastes time, isn't for children, or doesn't teach the lesson.

### 6. Watch the whole lesson, with sound
Open **http://localhost:8080**, find the new lesson, and play it from start to end, ideally on the TV.

Check:
- Does every picture show what the voice is talking about?
- Is the voice clear? Does anything sound wrong? (Claude can't hear.)
- Is it right for a 10 to 12-year-old: not babyish, not too hard?
- Then take its test on a phone or tablet.

Tell Claude everything you didn't like, in your own words. It fixes it, and you watch the changed parts again.

### 7. Finish
When you're happy, tell Claude:

> The lesson is approved. Save it.

---

## Part 3: Send the lesson to the family's app

Your copy is separate from the family's app. To add your lesson there:

1. Ask the owner to invite you to the GitHub project (they add you under **Settings → Collaborators** on `zetwin/homeschool-tv`). You need a free GitHub account.
2. Then tell Claude:

   > Share the approved lesson on GitHub.

   Claude saves it to the project. **This project is public:** lessons only, never children's names, photos or family details.
3. Tell the owner it's there. They add it to the family's app.

---

## If something goes wrong
- **"Command not found", or something is missing:** tell Claude "run `npm run doctor` and fix what's missing".
- **The app won't open:** tell Claude "start the app again".
- **A lesson looks broken, or the home page is blank:** tell Claude what you see. It can photograph the screens and find the cause.
- **Not sure what to ask?** Ask Claude: "What should I do next?" It knows these steps.

## Good to know
- **One lesson at a time.** Finish and approve one before starting the next.
- **Say what you think plainly.** "This picture is wrong" or "too long" is enough. Claude asks if it needs more.
- **Your copy has its own example children,** so testing never touches the family's real data.
- **Recording voices** downloads about 500 MB. Claude can remove it afterwards to save space.
- **Spanish voices** use a second, bigger voice tool. On Windows it runs slower than on a Mac. English lessons don't need it.
