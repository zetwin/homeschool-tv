/* Emotional Intelligence, Lesson 1 of 6. Aligned to England's Health Education (primary content 3, 4, 5 and 9), not approved by anyone. The term itself and the bonus go beyond it.
   Goal: say what emotional intelligence is, what emotions are for, and how to notice, name and handle them. Scene ids start with em- because voice clips share one folder.
   Safety: nobody is asked to share a real feeling. Questions are about stories and facts. The test checks knowledge, and nothing about how a child feels is asked or saved.
   Review notes: sources, what's unverified and the video plan are in docs/research/2026-11-07-emotions-1.md. Voice part only: no clips until the owner approves them (docs/rules/VIDEO-RULES.md). */
(window.EPISODES = window.EPISODES || []).push({
  id: 'emotions-1',
  extra: true,
  number: 1,
  subject: 'Emotional Intelligence',
  unit: 'Knowing your feelings',
  title: 'What Are Emotions For?',
  topic: 'What emotions are for',
  series: 'Emotional Intelligence',
  lessonLabel: 'Lesson 1 of 6',
  blurb: 'What emotional intelligence really is, what emotions often do, how feelings show up in your body, how to name them exactly, and who to tell when one is too big.',
  hero: 'emotions-cover.jpg',
  heroAlt: 'Six faces showing emotions, each labeled: happy, sad, angry, scared, surprised and nervous',
  heroPos: '50% 50%',
  builder: 'plate',
  builderImg: 'emotions-cover.jpg',
  builderLabel: 'Fill in the six emotions',
  builderDone: 'Your six emotions',
  fullScore: 'You know what emotions are for!',
  scenes: [
    { id: 'em-greet', part: 'welcome', chapter: 'Intro', type: 'statement', bg: '#BE185D', beats: [ { say: 'Hello, and welcome to your first lesson in Emotional Intelligence!', text: 'Something you carry *everywhere*' }, { say: 'Today, we’re finding out what feelings are for, and how to name them exactly. Knowing your feelings helps with friends, family and hard days.', text: 'Today: what *feelings* are for', hold: 0.4 } ] },
    { id: 'em-welcome', part: 'welcome', chapter: 'Intro', type: 'statement', bg: '#0F766E', beats: [
      { say: 'This subject is about something you carry everywhere: your feelings. They’re there in every game, every argument, and every hard day.', text: 'Welcome to *Emotional Intelligence*' },
      { say: 'You can get better at it with practice. And it can help you with friends, with family, and with yourself.', text: 'You can get better with *practice*' },
    ] },
    { id: 'em-how', part: 'welcome', chapter: 'Intro', type: 'statement', bg: '#D42A20', beats: [
      { say: 'This subject has one rule. Your feelings are yours. Nobody here will make you say how you feel. When we ask you to think of something, you can keep it in your head. And if you want to talk about a feeling, that’s good too.', text: 'Your feelings are *yours*' },
      { say: 'And the test only checks what you’ve learned. It never asks how you feel.', text: 'The test never asks *how you feel*' },
    ] },
    { id: 'em-known', part: 'known', chapter: 'Intro', type: 'statement', bg: '#1D4ED8', beats: [
      { say: 'You already know a lot about feelings. Everyone has felt happy, surprised, nervous and cross.', text: 'You already *know* feelings' },
      { say: 'Shout it out: name a feeling. Any feeling at all. You don’t have to say how you feel.', text: 'Name a *feeling*', hold: 3 },
      { say: 'Good. Today, we find out what feelings are for.', text: 'What are they *for*?' },
    ] },
    { id: 'em-journey', part: 'journey', chapter: 'Intro', type: 'art', art: 'emJourney', layout: 'full', bg: '#17131F', beats: [
      { say: 'Here’s where we’re going: six lessons on knowing your feelings. This is the first.', hold: 1.2 },
    ] },
    { id: 'em-hook', part: 'hook', chapter: 'Intro', type: 'art', art: 'emWand', layout: 'full', bg: '#17131F', poster: 'emotions-cover.jpg', beats: [
      { say: 'Imagine a magic wand. Wave it, and you’ll never feel scared again.', text: 'Never scared again', step: 'fear' },
      { say: 'Or sad. Or angry. Or nervous. Just happy, for the rest of your life.', text: 'Just *happy,* forever', step: 'rest' },
      { say: 'Would you wave it? Don’t say it out loud. Just think about your answer.', text: 'Would you wave it?', hold: 3 },
      { say: 'Some people would. Some people think certain feelings are simply bad. They think being clever about feelings means being happy all the time.', text: 'Some feelings are bad?' },
      { say: 'By the end of this lesson, you might think differently about that wand.', text: 'You might think differently' },
    ] },
    { id: 'em-title', part: 'title', chapter: 'Intro', type: 'title', eyebrow: 'Emotional Intelligence · Lesson 1 of 6', title: 'What Are *Emotions* For?', img: 'emotions-card.jpg', bg: '#FFC400', fg: '#17131F', beats: [
      { say: 'Today’s question: what are emotions for?', hold: 0.8 },
    ] },
    { id: 'em-today', part: 'today', chapter: 'Intro', type: 'recap', bg: '#1D4ED8', heading: 'Today, you’ll be able to', items: ['Say what emotional intelligence really is', 'Say what job an emotion may be doing', 'Name a feeling exactly, and how strong it is', 'Tell a feeling from a choice', 'Know when to tell someone'], beats: [
      { say: 'Today, you’ll say what emotional intelligence really is, and what job an emotion may be doing. You’ll name a feeling exactly, and how strong it is. You’ll tell a feeling from a choice. And you’ll know when to tell someone.' },
    ] },

    { id: 'em-ch1', chapter: 'What it is', type: 'chapter', n: 1, title: 'What emotional intelligence is', look: 'right', bg: '#0F766E', poster: 'em-ch1.jpg', beats: [
      { say: 'Chapter one. What is emotional intelligence? And what isn’t it?' },
    ] },
    { id: 'em-not', chapter: 'What it is', type: 'statement', bg: '#7E22CE', beats: [
      { say: 'First, what it isn’t. It isn’t being happy all the time. It isn’t being nice all the time. And it isn’t hiding what you feel.', text: 'Not *happy* all the time' },
      { say: 'It means being clever about feelings: your own, and other people’s.', text: 'Being *clever* about feelings' },
    ] },
    { id: 'em-1990', chapter: 'What it is', type: 'number', bg: '#0C0A10', img: 'em-article.jpg', beats: [
      { say: 'Two psychologists, Peter Salovey and John Mayer, set out the idea in an article in 1990. A writer, Daniel Goleman, made it famous with a book in 1995.', speak: 'Two psychologists, Peter Salovey and John Mayer, set out the idea in an article in nineteen ninety. A writer, Daniel Goleman, made it famous with a book in nineteen ninety-five.', from: 1950, to: 1990, sub: 'Salovey and Mayer’s article' },
      { say: 'A psychologist is a scientist who studies how people think and feel.', sub: 'Psychologist: studies how people think and feel' },
    ] },
    { id: 'em-nnc', chapter: 'What it is', type: 'art', art: 'emSteps', layout: 'full', bg: '#17131F', beats: [
      { say: 'In this subject, we’ll practice three things. One: notice. Something’s going on inside you.', text: 'Three things to practice', show: 0 },
      { say: 'Two: name it. Find the word for it.', text: 'Three things to practice', show: 1 },
      { say: 'Three: choose. Decide what to do next.', text: 'Three things to practice', show: 2 },
      { say: 'Notice. Name. Choose. You’ll see those three words a lot.', text: '*Notice. Name. Choose.*', hold: 0.6 },
    ] },
    { id: 'em-guess-who', chapter: 'What it is', type: 'guess', bg: '#1D4ED8', question: 'Who’s using emotional intelligence?', options: ['Priya: never gets angry', 'Sam: spots he’s angry, and goes for a walk', 'Mia: hides every feeling', 'Leo: shouts until it stops'], answer: 1, img: 'em-face-angry.jpg', imgCaption: 'Angry is allowed', beats: [
      { say: 'Your turn. Four people, and these aren’t about you. Who’s using emotional intelligence?', step: 'ask' },
      { say: 'Shout it out!', step: 'count', hold: 5 },
      { say: 'Sam! He felt angry. He noticed it. Then he chose what to do.', step: 'reveal' },
      { say: 'Being angry wasn’t the problem. Sam just knew what to do with it.', step: 'image', hold: 0.5 },
    ] },

    { id: 'em-ch2', chapter: 'What emotions do', type: 'chapter', n: 2, title: 'What emotions can do for you', look: 'number', bg: '#D42A20', beats: [
      { say: 'Chapter two. So what are emotions for? Scientists still argue about exactly how they work. But many think emotions help us deal with problems and chances in our lives. Let’s meet six of them.' },
    ] },
    { id: 'em-jobs', chapter: 'What emotions do', type: 'art', art: 'emJobs', layout: 'full', bg: '#17131F', beats: [
      { say: 'Fear says: watch out! Your body gets ready to get away. That’s why you step back from the edge of a cliff, before you’ve even thought about it.', text: 'Fear: *watch out!*', k: 3 },
      { say: 'Nervousness is a smaller kind of fear. It can mean: this matters to you. You might feel it before a race or a big test.', text: 'Nervous: *this matters*', k: 5 },
      { say: 'Anger says: that’s not fair, or something’s in your way. It can give you the energy to stand up for yourself, or to change something.', text: 'Anger: *that’s not fair*', k: 2 },
      { say: 'Sadness says: you’ve lost something that matters. It slows you down. And when people see you’re sad, they may come and help.', text: 'Sadness: *this mattered*', k: 1 },
      { say: 'Surprise can make you stop, and look. Something just happened that you didn’t expect.', text: 'Surprise: *stop and look*', k: 4 },
      { say: 'Happiness says: this is good. Do more of it. It can pull you toward people and things that are good for you.', text: 'Happiness: *more of this*', k: 0 },
    ] },
    { id: 'em-guess-job', chapter: 'What emotions do', type: 'guess', bg: '#0F766E', question: 'Which feeling says “that’s not fair”?', options: ['Surprise', 'Anger', 'Happiness', 'Nervousness'], answer: 1, img: 'em-face-angry.jpg', imgCaption: 'Anger: that’s not fair', beats: [
      { say: 'Someone takes credit for your friend’s drawing. Which feeling says: that’s not fair?', step: 'ask' },
      { say: 'Shout it out!', step: 'count', hold: 5 },
      { say: 'Anger. It’s pointing at something unfair.', step: 'reveal' },
      { say: 'It’s a signal. What you do with it comes later.', step: 'image', hold: 0.5 },
    ] },
    { id: 'em-sm', chapter: 'What emotions do', type: 'art', art: 'emNoFear', layout: 'full', bg: '#17131F', beats: [
      { say: 'What if a feeling was nearly gone? Scientists have studied a woman they call S.M. Damage to two small parts of her brain means she feels very little fear of dangers around her.', speak: 'What if a feeling was nearly gone? Scientists have studied a woman they call S M. Damage to two small parts of her brain means she feels very little fear of dangers around her.', text: 'A woman called *S.M.*' },
      { say: 'They took her to a pet shop. She held a snake for over three minutes. She tried to touch a big spider, a tarantula, and had to be stopped.', text: 'Holding a snake, reaching for a spider', pets: true },
      { say: 'They asked how scared she felt, from zero to ten. Her answer was never above two.', text: 'Fear, from 0 to 10', meter: 2 },
      { say: 'She’s just one person, so we have to be careful. But it hints at what life can be like with less of the warning that fear gives.', text: 'Less fear, *less warning*' },
    ] },
    { id: 'em-normal', chapter: 'What emotions do', type: 'statement', bg: '#7E22CE', beats: [
      { say: 'Hard feelings are normal too. Worrying and feeling down happen to everyone, at different times.', text: 'Worrying and feeling down: *normal*' },
      { say: 'On their own, they don’t mean something’s wrong with you. And in chapter six, you’ll hear what to do if one gets too big.', text: 'On their own, *not a sign of a problem*' },
    ] },

    { id: 'em-video-feel', use: 'support', status: 'candidate', chapter: 'What emotions do', type: 'video', bg: '#17131F', youtube: 'rjJdzhRZxGw', end: 113, videoTitle: 'How to feel feelings', channel: 'AboutKidsHealth, The Hospital for Sick Children', watchFor: 'Listen for why feelings are worth noticing', still: 'em-ch1.jpg', beats: [
      { say: 'Here’s a short film from a children’s hospital in Canada. Listen for why feelings are worth noticing.' },
    ] },
    { id: 'em-after-feel', afterVideo: true, chapter: 'What emotions do', type: 'statement', bg: '#1D4ED8', beats: [
      { say: 'Feelings are messages. Noticing them is the first step.', text: 'Feelings are *messages*' },
    ] },
    { id: 'em-ch3', chapter: 'In your body', type: 'chapter', n: 3, title: 'Feelings show up in your body', look: 'split', bg: '#7E22CE', poster: 'em-ch3.jpg', beats: [
      { say: 'Chapter three. How do you notice a feeling? Often, your body tells you first.' },
    ] },
    { id: 'em-700', chapter: 'In your body', type: 'number', flip: true, bg: '#0C0A10', img: 'em-outline.jpg', beats: [
      { say: 'In one study, more than 700 people from Finland and Taiwan colored in an outline of a body. They showed where they felt each emotion.', speak: 'In one study, more than seven hundred people from Finland and Taiwan colored in an outline of a body. They showed where they felt each emotion.', from: 0, to: 700, sub: 'people or more colored in a body' },
      { say: 'This is what people reported feeling. It isn’t a measurement of their bodies.', sub: 'What people reported feeling' },
    ] },
    { id: 'em-body', chapter: 'In your body', type: 'art', art: 'emBody', layout: 'full', bg: '#17131F', beats: [
      { say: 'For most of the main emotions, people marked the upper chest.', text: 'Many emotions: *upper chest*', area: 'chest' },
      { say: 'For anger and happiness, they also marked the arms. Those are the parts you’d use to go and do something.', text: 'Anger and happiness: *arms*', area: 'arms' },
      { say: 'For sadness, the arms and legs felt less active than usual.', text: 'Sadness: arms and legs *less active*', area: 'weak' },
      { say: 'And for happiness, people marked almost the whole body.', text: 'Happiness: *all over*', area: 'all' },
      { say: 'Your body may do it differently, and that’s fine. Some people get a tight tummy, a hot face, or a fast heartbeat. It’s worth finding out what yours does.', text: 'Yours may be *different*', area: 'none' },
    ] },
    { id: 'em-video-stress', use: 'support', status: 'candidate', chapter: 'In your body', type: 'video', bg: '#17131F', youtube: 'awhOrqGb-TU', end: 72, videoTitle: 'The fight or flight response', channel: 'TED-Ed', watchFor: 'Watch what your body gets ready to do', still: 'em-ch3.jpg', beats: [
      { say: 'Here’s what happens in your body when you feel scared or stressed. Watch what your body gets ready to do.' },
    ] },
    { id: 'em-after-stress', afterVideo: true, chapter: 'In your body', type: 'statement', bg: '#7E22CE', beats: [
      { say: 'Your heart speeds up, and your muscles get ready. That’s one reason you feel feelings in your body.', text: 'Your body *gets ready*' },
    ] },
    { id: 'em-try', chapter: 'In your body', type: 'art', art: 'emTry', layout: 'full', bg: '#0F766E', beats: [
      { say: 'Try it now. This one’s private, so you don’t need to say anything. Sit still. You can close your eyes.', text: 'Try it now: *just notice*' },
      { say: 'Notice your shoulders. Are they tight, or loose?', text: 'Your shoulders', hold: 4 },
      { say: 'Notice your tummy. Is it tight, or calm?', text: 'Your tummy', hold: 4 },
      { say: 'Notice your heartbeat. Is it fast, or slow?', text: 'Your heartbeat', hold: 4 },
      { say: 'That’s it. There’s no right answer, and you don’t have to tell anyone. You’ve just practiced the first step: notice.', text: '*Notice:* done' },
    ] },

    { id: 'em-ch4', chapter: 'Name it', type: 'chapter', n: 4, title: 'Find the word, and how strong', look: 'left', bg: '#1D4ED8', poster: 'em-ch4.jpg', beats: [
      { say: 'Chapter four. Remember: notice, name, choose. Now it’s time to name. And “bad” isn’t a very useful name.' },
    ] },
    { id: 'em-ladder', chapter: 'Name it', type: 'art', art: 'emLadder', layout: 'full', bg: '#17131F', beats: [
      { say: 'Feelings come in sizes. Anger starts small. Annoyed.', text: 'Feelings come in *sizes*', family: 0, level: 0 },
      { say: 'Then cross. Then angry. And at the very top: furious.', text: 'Feelings come in *sizes*', family: 0, level: 3 },
      { say: 'Fear has sizes too. Uneasy. Nervous. Scared. Terrified.', text: 'Fear has sizes too', family: 1, level: 3 },
      { say: 'And so does sadness. Disappointed. Sad. Very sad. Heartbroken.', text: 'So does sadness', family: 2, level: 3 },
      { say: 'The right word tells you, and everyone else, much more. “I’m annoyed” and “I’m furious” need very different help.', text: 'The right word *tells you more*', family: 0, level: 3 },
    ] },
    { id: 'em-guess-size', chapter: 'Name it', type: 'guess', bg: '#D42A20', question: 'A pencil gets borrowed. Which word fits best?', options: ['Annoyed', 'Terrified', 'Heartbroken', 'Furious'], answer: 0, img: 'em-face-angry.jpg', imgCaption: 'A small size of anger', beats: [
      { say: 'Here’s a story. A little brother borrows a pencil without asking. Which word fits best?', step: 'ask' },
      { say: 'Shout it out!', step: 'count', hold: 5 },
      { say: 'Annoyed. Most people would call that a small problem, so a small feeling fits.', step: 'reveal' },
      { say: 'Now ask yourself: is my feeling the right size for what happened?', step: 'image', hold: 0.5 },
    ] },
    { id: 'em-size', chapter: 'Name it', type: 'statement', bg: '#0F766E', beats: [
      { say: 'Sometimes a feeling comes out bigger than the problem. That happens to everyone. Noticing it is a real skill.', text: 'Is it the *right size?*' },
      { say: 'And one thing can bring two feelings. Before a big trip, you might feel excited and nervous.', text: 'Excited *and* nervous' },
    ] },
    { id: 'em-39', chapter: 'Name it', type: 'number', bg: '#0C0A10', img: 'em-brain.jpg', beats: [
      { say: 'Can a word really help? In one small brain-scan study, 39 adults aged 55 to 75 looked at upsetting pictures, and chose a word for how they felt.', speak: 'Can a word really help? In one small brain scan study, thirty-nine adults aged fifty-five to seventy-five looked at upsetting pictures, and chose a word for how they felt.', from: 0, to: 39, sub: 'adults chose a word for a feeling' },
      { say: 'Choosing a word went with less activity in a part of the brain called the amygdala, one of the parts that responds to upsetting things. The pictures felt a little less unpleasant, too.', speak: 'Choosing a word went with less activity in a part of the brain called the uh-mig-duh-luh, one of the parts that responds to upsetting things. The pictures felt a little less unpleasant, too.', sub: 'A little less unpleasant' },
      { say: 'They were older adults, and it helped only a little. So a word isn’t magic. But it’s free, and you can always try it.', sub: 'Not magic, but worth trying' },
    ] },

    { id: 'em-ch5', chapter: 'Feeling and doing', type: 'chapter', n: 5, title: 'Feeling is not the same as doing', look: 'band', bg: '#D42A20', poster: 'em-ch5.jpg', beats: [
      { say: 'Chapter five. Now it’s time to choose. Here’s the most useful idea in this lesson.' },
    ] },
    { id: 'em-split', chapter: 'Feeling and doing', type: 'art', art: 'emSplit', layout: 'full', bg: '#17131F', beats: [
      { say: 'A feeling just arrives. You don’t pick it. So you’re allowed to feel anything at all.', text: 'A feeling *arrives*', side: 'feel' },
      { say: 'But what you do next is your choice. And what you do can hurt people, or help.', text: 'What you do is *your choice*', side: 'do' },
      { say: 'You feel furious with your brother. That’s allowed. Breaking his game isn’t.', text: 'Allowed, and not allowed', row: 0 },
      { say: 'You feel nervous before a race. That’s allowed. Warming up is a great choice.', text: 'Allowed, and a great choice', row: 1 },
      { say: 'You feel sad after an argument. That’s allowed. Talking to someone is a great choice.', text: 'Allowed, and a great choice', row: 2 },
    ] },
    { id: 'em-guess-choice', chapter: 'Feeling and doing', type: 'guess', bg: '#7E22CE', question: 'A furious boy wants to throw his tablet. Best choice?', options: ['Throw it', 'Pretend he’s fine', 'Walk away, and come back later', 'Shout at his sister'], answer: 2, img: 'em-choose.jpg', imgCaption: 'Feeling, then choosing', beats: [
      { say: 'A boy in a story is furious, and wants to throw his tablet. What’s the best choice?', step: 'ask' },
      { say: 'Shout it out!', step: 'count', hold: 5 },
      { say: 'Walk away, and come back later. He doesn’t have to pretend he’s fine.', step: 'reveal' },
      { say: 'Notice. Name. Choose.', step: 'image', hold: 0.5 },
    ] },
    { id: 'em-care', chapter: 'Feeling and doing', type: 'recap', bg: '#0F766E', heading: 'Good choices for hard days', items: ['Move your body, or go outside', 'Rest', 'Spend time with friends or family', 'Do something you enjoy', 'Help someone else'], beats: [
      { say: 'Some choices often help on hard days. Moving your body, or going outside. Resting. Time with friends or family. Doing something you enjoy. And helping someone else.' },
    ] },

    { id: 'em-ch6', chapter: 'Telling someone', type: 'chapter', n: 6, title: 'When to tell an adult', look: 'right', bg: '#B45309', poster: 'em-ch6.jpg', beats: [
      { say: 'Chapter six. You don’t have to handle every feeling alone. So when should you tell someone?' },
    ] },
    { id: 'em-when', chapter: 'Telling someone', type: 'recap', bg: '#17131F', heading: 'Tell someone when a feeling', items: ['Feels too big to handle', 'Goes on for a long time', 'Gets in the way of sleep, food or fun', 'Comes from someone hurting you or making you feel unsafe'], beats: [
      { say: 'Tell someone when a feeling is too big to handle. When it goes on for a long time. When it gets in the way of sleep, food or fun. And always, if someone is hurting you or making you feel unsafe.' },
    ] },
    { id: 'em-who', chapter: 'Telling someone', type: 'art', art: 'emWho', layout: 'full', bg: '#0F766E', beats: [
      { say: 'Who should you tell? An adult you trust: a parent, a grandparent, a doctor, or someone else who looks after you.', text: 'Tell an adult you *trust*', show: true },
      { say: 'You don’t need perfect words. You can just say, “Something’s bothering me. Can we talk?”', text: '“Something’s bothering me. Can we talk?”' },
      { say: 'And if the first person doesn’t help, tell someone else. Keep telling until someone listens.', text: 'Keep telling until someone *listens*' },
      { say: 'If the problem is at home, tell an adult outside your home: another relative, a doctor, or a friend’s parent. Many countries also have a phone line just for children.', text: 'Problem at home? Tell an adult *outside*' },
      { say: 'And if you ever feel you might hurt yourself, tell an adult you trust straight away.', text: 'Tell someone *straight away*' },
    ] },
    { id: 'em-strong', chapter: 'Telling someone', type: 'statement', bg: '#D42A20', beats: [
      { say: 'Telling someone isn’t weak. It’s a smart choice, and getting help early can make a real difference.', text: 'Telling someone is *smart*' },
    ] },

    { id: 'em-bonus', chapter: 'Bonus', type: 'chapter', bonus: true, label: 'Bonus', title: 'Words for feelings', look: 'band', bg: '#7E22CE', poster: 'em-bonus.jpg', beats: [
      { say: 'Bonus! This isn’t in the test. People keep inventing words for feelings.' },
    ] },
    { id: 'em-words', chapter: 'Bonus', type: 'statement', bg: '#1D4ED8', beats: [
      { say: 'In German, there’s schadenfreude: enjoying someone else’s bad luck. If a friend slips on a banana peel and you laugh, that’s it.', speak: 'In German, there’s shah-den-froy-duh: enjoying someone else’s bad luck. If a friend slips on a banana peel and you laugh, that’s it.', text: '*Schadenfreude:* enjoying someone’s bad luck' },
      { say: 'And newer English has hangry: bad-tempered because you’re hungry. So next time you’re cross, check when you last ate.', text: '*Hangry:* cross because you’re hungry' },
    ] },

    { id: 'em-answer', part: 'answer', chapter: 'What we learned', type: 'statement', bg: '#D42A20', beats: [
      { say: 'So, would you still wave that wand? Remember what fear does. Remember what anger and sadness can do. Those feelings can be hard, but they’re often doing a job.', text: 'Would you still *wave the wand?*', hold: 1.2 },
    ] },
    { id: 'em-recap', part: 'summary', chapter: 'What we learned', type: 'recap', bg: '#0F766E', heading: 'What we learned', items: ['Being clever about feelings', 'Emotions often do a job', 'Notice it, then find the word and size', 'Feeling is not the same as doing', 'Too big, too long, unsafe? Tell someone'], beats: [
      { say: 'Here’s what we learned. Emotional intelligence is being clever about feelings. Emotions often do a job. Notice it, then find the word and size. Feeling is not the same as doing. And if it’s too big, too long or unsafe, tell someone.' },
    ] },
    { id: 'em-next', part: 'next', chapter: 'What we learned', type: 'statement', bg: '#7E22CE', beats: [
      { say: 'Next lesson, you’ll collect many more words for your feelings, and learn the difference between them.', text: 'Next time: *more words for feelings*', hold: .4 },
      { say: 'But first, take the test.', text: 'Now, *the test*', hold: .4 },
    ] },
  ],
  starter: [
    { type: 'radio', q: 'What do you think emotional intelligence means?', o: ['Being clever about feelings', 'Being happy all the time', 'Never getting angry'], a: 0, why: 'It means being clever about feelings. Today you’ll see why it isn’t about being happy all the time.' },
    { type: 'radio', q: 'Which of these is an emotion?', o: ['Surprise', 'Homework', 'Thursday'], a: 0, why: 'Surprise is an emotion. Today you’ll meet six of them.' },
    { type: 'radio', q: 'What do you think? In the lesson, which feeling helps people step back from danger?', o: ['Fear', 'Happiness', 'Surprise'], a: 0, why: 'Fear says “watch out!” You’ll hear more about it soon.' },
  ],
  test: [
    { type: 'radio', q: 'Which sentence is true about emotional intelligence?', o: ['It means being clever about feelings: your own, and other people’s', 'It means being happy all the time', 'It means hiding what you feel', 'It means never getting angry'], a: 0, why: 'It isn’t about being happy all the time, or hiding feelings. It’s being clever about them.' },
    { type: 'order', q: 'Put the three steps in order.', items: ['Notice', 'Name', 'Choose'], why: 'First notice that something’s going on. Then name it. Then choose what to do.' },
    { type: 'match', q: 'Match each emotion to the job from the lesson.', pairs: [['Fear', 'Watch out!'], ['Anger', 'That’s not fair'], ['Sadness', 'You’ve lost something that matters'], ['Surprise', 'Stop, and look']], why: 'Many scientists think emotions help us deal with different kinds of problems and chances.' },
    { type: 'pics', q: 'In the lesson’s pictures, which face shows surprise?', o: [{ img: 'em-face-happy.jpg', t: 'Picture A' }, { img: 'em-face-surprised.jpg', t: 'Picture B' }, { img: 'em-face-angry.jpg', t: 'Picture C' }, { img: 'em-face-sad.jpg', t: 'Picture D' }], a: 1, why: 'Picture B has wide eyes and an open mouth. Real faces can look different from person to person, so words help too.' },
    { type: 'radio', q: 'A woman called S.M. feels very little fear of danger. What did she try to do in a pet shop?', o: ['Touch a tarantula', 'Run outside', 'Hide behind a door', 'Close her eyes'], a: 0, why: 'She held a snake and tried to touch a tarantula. The usual warning from fear wasn’t stopping her.' },
    { type: 'truefalse', q: 'True or false?', rows: [['Worrying and feeling down happen to everyone, at different times.', true], ['Everybody feels emotions in exactly the same parts of their body.', false], ['You choose which feelings arrive.', false], ['One event can bring two feelings, such as excited and nervous.', true]], why: 'Hard feelings are normal. Bodies differ. Feelings arrive by themselves, and one event can bring more than one.' },
    { type: 'order', q: 'Put these in order, from the smallest feeling to the biggest.', items: ['Annoyed', 'Angry', 'Furious'], why: 'They’re all anger, in different sizes.' },
    { type: 'select', q: 'A story: a girl’s little brother borrows her pencil. Choose the words that fit best.', text: 'She’d probably feel {0}. Feeling {1} would be much too big for that.', choices: [['annoyed', 'terrified', 'heartbroken'], ['furious', 'annoyed', 'cross']], a: ['annoyed', 'furious'], why: 'It’s a small problem, so it’s a small feeling. Asking “is it the right size?” is a real skill.' },
    { type: 'sort', q: 'Sort these. Which are feelings, and which are things you do?', bins: ['A feeling', 'Something you do'], items: [{ t: 'Furious', bin: 0 }, { t: 'Nervous', bin: 0 }, { t: 'Sad', bin: 0 }, { t: 'Walking away', bin: 1 }, { t: 'Warming up', bin: 1 }, { t: 'Talking to someone', bin: 1 }], why: 'A feeling arrives by itself. What you do next is your choice.' },
    { type: 'gaps', q: 'Finish the sentences.', text: 'You’re allowed to {0} anything. But what you {1} is your {2}.', bank: ['feel', 'do', 'choice', 'pencil', 'cloud', 'quiet'], a: ['feel', 'do', 'choice'], why: 'Feeling is not the same as doing.' },
    { type: 'checkbox', q: 'When should someone tell an adult they trust? Tick all that are true.', o: ['A feeling is too big to handle', 'A feeling goes on for a long time', 'Someone is hurting them or making them feel unsafe', 'Only once they’ve found perfect words'], a: [0, 1, 2], why: 'You don’t need perfect words. “Something’s bothering me. Can we talk?” is enough.' },
    { type: 'radio', q: 'A boy tells an adult he trusts that he’s been feeling very worried, but the adult is too busy to listen. What should he do?', o: ['Tell someone else', 'Never tell anyone again', 'Pretend he’s fine', 'Wait for it to go away by itself'], a: 0, why: 'Keep telling until someone listens. Getting help early can make a real difference.' },
  ],
  credits: {
    /* Candidates go in docs/research/2026-11-07-emotions-1.md. Videos go in once the owner has watched them. */
    videos: [
      { title: 'How to Feel Feelings (0:00 to 1:53)', by: 'AboutKidsHealth, The Hospital for Sick Children', url: 'https://www.youtube.com/watch?v=rjJdzhRZxGw' },
      { title: 'How to make your stress work for you (0:00 to 1:12)', by: 'TED-Ed', url: 'https://www.youtube.com/watch?v=awhOrqGb-TU' },
    ],
    deeper: [],
  },
});

(function () {
  const icon = (name) => `assets/icons/${name}.png`;
  const GOLD = '#FFC400';
  const SIX = [
    { name: 'Happy', icon: 'beaming_face_with_smiling_eyes', c: '#F59E0B' },
    { name: 'Sad', icon: 'crying_face', c: '#2563EB' },
    { name: 'Angry', icon: 'angry_face', c: '#DC2626' },
    { name: 'Scared', icon: 'fearful_face', c: '#7C3AED' },
    { name: 'Surprised', icon: 'astonished_face', c: '#0D9488' },
    { name: 'Nervous', icon: 'grimacing_face', c: '#475569' },
  ];
  /* One line per lesson of this unit, from the program. */
  const lessons = () => (window.CURRICULUM?.unitLessons?.['Knowing your feelings'] || []).map((l) => l[0]);
  const safe = (t) => String(t).replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]));

  window.ART = Object.assign(window.ART || {}, {
    /* The wand takes the feelings away one by one, until only happy is left. */
    emWand(box, lib) {
      const { gsap } = window;
      box.innerHTML = `<div class="headline" style="left:96px;top:96px;width:1728px;text-align:center;font-size:100px"></div>
        <img class="wand" src="${icon('magic_wand')}" alt="" style="position:absolute;left:840px;top:220px;width:240px;height:240px">
        <div style="position:absolute;left:96px;right:96px;bottom:230px;display:grid;grid-template-columns:repeat(6,1fr);gap:18px">${SIX.map((f, k) => `<figure class="f" data-k="${k}" style="margin:0;background:${f.c};border-radius:22px;padding:22px 10px;text-align:center"><img src="${icon(f.icon)}" alt="" style="width:150px;height:150px"><figcaption style="font:800 40px var(--display);color:#fff;margin-top:6px">${f.name}</figcaption></figure>`).join('')}</div>`;
      const tile = (k) => box.querySelector(`.f[data-k="${k}"]`);
      gsap.fromTo(box.querySelector('.wand'), { scale: .4, opacity: 0 }, { scale: 1, opacity: 1, duration: .7, ease: 'back.out(1.6)' });
      return (i, beat) => {
        if (beat.step === 'fear') { lib.sfx.pop(); gsap.to(tile(3), { opacity: .12, scale: .9, duration: .6, filter: 'grayscale(1)' }); }
        if (beat.step === 'rest') [1, 2, 5, 4].forEach((k, n) => gsap.to(tile(k), { opacity: .12, scale: .9, duration: .5, delay: n * .55, filter: 'grayscale(1)', onStart: lib.sfx.pop }));
      };
    },

    /* You are here: this unit's real lesson list. */
    emJourney(box) {
      const { gsap } = window;
      box.innerHTML = `<h1 class="big" style="position:absolute;left:96px;top:90px;margin:0">Knowing your feelings: 6 lessons</h1>
        <ol style="position:absolute;left:96px;right:96px;top:250px;list-style:none;margin:0;padding:0;display:grid;grid-template-columns:repeat(3,1fr);gap:28px">${lessons().map((t, k) => `<li class="stop" style="background:${k ? '#FFFFFF14' : GOLD};color:${k ? '#FBFAFF' : '#17131F'};border-radius:24px;padding:34px;min-height:290px"><b style="display:block;font:800 92px/1 var(--display)">${k + 1}</b><span style="display:block;font:700 46px/1.12 var(--display);margin-top:16px">${safe(t)}</span>${k ? '' : '<strong style="display:block;font:800 38px/1.2 var(--body);margin-top:12px">You are here</strong>'}</li>`).join('')}</ol>`;
      return () => { gsap.fromTo(box.querySelectorAll('.stop'), { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: .4, stagger: .12, ease: 'power3.out' }); };
    },

    /* Three steps, side by side, that come back later in the lesson. */
    emSteps(box, lib) {
      const { gsap } = window;
      const STEPS = [['Notice', 'magnifying_glass_tilted_left', 'Something’s going on inside you'], ['Name', 'speech_balloon', 'Find the word for it'], ['Choose', 'compass', 'Decide what to do next']];
      box.innerHTML = `<div class="headline" style="left:96px;top:96px;width:1728px"></div>
        <div style="position:absolute;left:96px;right:96px;top:270px;display:grid;grid-template-columns:repeat(3,1fr);gap:32px">${STEPS.map(([t, ic, d], k) => `<div class="st" style="opacity:0;background:#FFFFFF14;border-radius:26px;padding:44px 38px;min-height:600px"><img src="${icon(ic)}" alt="" style="width:220px;height:220px"><h2 style="font:800 96px/1 var(--display);margin:30px 0 16px;color:${GOLD}">${k + 1}. ${t}</h2><p style="font:600 48px/1.2 var(--body);margin:0">${d}</p></div>`).join('')}</div>`;
      const rows = box.querySelectorAll('.st');
      return (i, beat) => { if (beat.show != null) { lib.sfx.pop(); gsap.fromTo(rows[beat.show], { y: 80, opacity: 0 }, { y: 0, opacity: 1, duration: .6, ease: 'power3.out' }); } };
    },

    /* Six emotions along the bottom. The one being explained comes up large. */
    emJobs(box, lib) {
      const { gsap } = window;
      box.innerHTML = `<div class="headline" style="left:560px;top:190px;width:1270px;font-size:128px;line-height:1.05"></div>
        <div class="stage" style="position:absolute;left:96px;top:70px;width:420px;height:500px;border-radius:28px;display:grid;place-items:center;text-align:center"><div><img class="big3d" src="" alt="" style="width:260px;height:260px"><div class="nm" style="font:800 60px var(--display);color:#fff;margin-top:12px"></div></div></div>
        <div style="position:absolute;left:96px;right:96px;bottom:210px;display:grid;grid-template-columns:repeat(6,1fr);gap:16px">${SIX.map((f, k) => `<div class="m" data-k="${k}" style="background:${f.c};opacity:.4;border-radius:18px;padding:10px;text-align:center"><img src="${icon(f.icon)}" alt="" style="width:100px;height:100px"><div style="font:800 32px var(--display);color:#fff">${f.name}</div></div>`).join('')}</div>`;
      const stage = box.querySelector('.stage'), big = box.querySelector('.big3d'), nm = box.querySelector('.nm'), tiles = [...box.querySelectorAll('.m')];
      const seen = new Set();
      return (i, beat) => {
        const f = SIX[beat.k]; if (!f) return;
        lib.sfx.pop(); seen.add(beat.k);
        stage.style.background = f.c; big.src = icon(f.icon); nm.textContent = f.name;
        gsap.fromTo(stage, { scale: .8, opacity: 0 }, { scale: 1, opacity: 1, duration: .5, ease: 'back.out(1.6)' });
        tiles.forEach((t, k) => gsap.to(t, { opacity: k === beat.k ? 1 : seen.has(k) ? .75 : .4, scale: k === beat.k ? 1.08 : 1, duration: .3 }));
      };
    },

    /* The case of S.M.: the snake and spider, and a fear scale that stays low. */
    emNoFear(box, lib) {
      const { gsap } = window;
      box.innerHTML = `<div class="headline" style="left:96px;top:96px;width:1728px"></div>
        <div class="pets" style="position:absolute;left:96px;top:300px;display:flex;gap:90px;opacity:0"><img src="${icon('snake')}" alt="" style="width:420px;height:420px"><img src="${icon('spider')}" alt="" style="width:420px;height:420px"></div>
        <div class="meter" style="position:absolute;left:96px;right:96px;top:760px;opacity:0"><div style="display:grid;grid-template-columns:repeat(11,1fr);gap:8px">${Array.from({ length: 11 }, (_, n) => `<div class="sq" style="height:120px;border-radius:12px;background:#FFFFFF14;display:grid;place-items:center;font:800 50px var(--display)">${n}</div>`).join('')}</div></div>`;
      return (i, beat) => {
        if (beat.pets) { lib.sfx.pop(); gsap.to(box.querySelector('.pets'), { opacity: 1, duration: .6 }); }
        if (beat.meter != null) {
          gsap.to(box.querySelector('.meter'), { opacity: 1, duration: .4 });
          gsap.to([...box.querySelectorAll('.sq')].slice(0, beat.meter + 1), { backgroundColor: '#7C3AED', duration: .3, stagger: .35, delay: .5, onStart: lib.sfx.pop });
        }
      };
    },

    /* The body, with the areas people marked. It's what they reported, not a measurement. */
    emBody(box, lib) {
      const { gsap } = window;
      const limbs = 'M62 122L38 330', limbs2 = 'M178 122L202 330', leg1 = 'M92 340L84 610', leg2 = 'M148 340L156 610';
      const stroke = (d, w, cls, c) => `<path class="${cls}" d="${d}" fill="none" stroke="${c}" stroke-width="${w}" stroke-linecap="round" style="opacity:0"/>`;
      box.innerHTML = `<div class="headline" style="left:96px;top:320px;width:1040px;font-size:100px"></div>
        <svg viewBox="0 0 240 645" style="position:absolute;left:1380px;top:40px;height:800px;width:298px" role="img" aria-label="An outline of a body, with the areas people marked for each emotion lit up">
          ${lib.bodyShape('#4A4458')}
          <g class="all" style="opacity:0">${lib.bodyShape('#F59E0B')}</g>
          <ellipse class="chest" cx="120" cy="170" rx="66" ry="56" fill="#EE5A2C" style="opacity:0"/>
          ${stroke(limbs, 34, 'arm', '#EE5A2C')}${stroke(limbs2, 34, 'arm', '#EE5A2C')}
          ${stroke(limbs, 34, 'weak', '#2563EB')}${stroke(limbs2, 34, 'weak', '#2563EB')}${stroke(leg1, 52, 'weak', '#2563EB')}${stroke(leg2, 52, 'weak', '#2563EB')}
        </svg>`;
      const set = (cls, on) => gsap.to(box.querySelectorAll(cls), { opacity: on ? 1 : 0, duration: .5 });
      return (i, beat) => {
        lib.sfx.pop();
        set('.chest', beat.area === 'chest' || beat.area === 'arms');
        set('.arm', beat.area === 'arms');
        set('.weak', beat.area === 'weak');
        set('.all', beat.area === 'all');
      };
    },

    /* A quiet moment: one slow circle, and the part of the body to notice. */
    emTry(box) {
      const { gsap } = window;
      box.innerHTML = `<div class="headline" style="left:96px;top:420px;width:1728px;text-align:center;font-size:128px"></div>
        <div class="o" style="position:absolute;left:660px;top:240px;width:600px;height:600px;border-radius:50%;background:#FFFFFF1F"></div>`;
      gsap.to(box.querySelector('.o'), { scale: 1.2, duration: 3.5, yoyo: true, repeat: -1, ease: 'sine.inOut' });
      return () => {};
    },

    /* Three families of feeling words, climbing in size. */
    emLadder(box, lib) {
      const { gsap } = window;
      const FAMILIES = [{ words: ['Annoyed', 'Cross', 'Angry', 'Furious'], c: '#DC2626', icon: 'angry_face' }, { words: ['Uneasy', 'Nervous', 'Scared', 'Terrified'], c: '#7C3AED', icon: 'fearful_face' }, { words: ['Disappointed', 'Sad', 'Very sad', 'Heartbroken'], c: '#2563EB', icon: 'crying_face' }];
      box.innerHTML = `<div class="headline" style="left:96px;top:90px;width:1500px"></div><img class="ic" src="" alt="" style="position:absolute;right:96px;top:50px;width:200px;height:200px">
        <div style="position:absolute;left:96px;right:96px;bottom:210px;height:590px;display:grid;grid-template-columns:repeat(4,1fr);gap:22px;align-items:end">${[0, 1, 2, 3].map((k) => `<div class="b" style="height:${150 + k * 145}px;border-radius:20px;background:#FFFFFF14;display:flex;align-items:flex-end;justify-content:center;padding:30px 8px;box-sizing:border-box"><span style="font:800 62px/1 var(--display);color:#fff;opacity:0"></span></div>`).join('')}</div>`;
      const bars = [...box.querySelectorAll('.b')];
      let shown = -1, family = -1;
      return (i, beat) => {
        const f = FAMILIES[beat.family];
        if (beat.family !== family) { family = beat.family; shown = -1; box.querySelector('.ic').src = icon(f.icon); bars.forEach((b, k) => { gsap.set(b, { backgroundColor: '#FFFFFF14' }); const s = b.querySelector('span'); s.textContent = f.words[k]; gsap.set(s, { opacity: 0 }); }); }
        for (let k = shown + 1, n = 0; k <= beat.level; k++, n++) { gsap.to(bars[k], { backgroundColor: f.c, duration: .35, delay: n * .75, onStart: lib.sfx.pop }); gsap.to(bars[k].querySelector('span'), { opacity: 1, duration: .35, delay: n * .75 }); }
        shown = Math.max(shown, beat.level);
      };
    },

    /* What arrives, beside what you choose. */
    emSplit(box, lib) {
      const { gsap } = window;
      const ROWS = [['Furious', 'angry_face', 'Breaking his game', false], ['Nervous', 'grimacing_face', 'Warming up', true], ['Sad', 'crying_face', 'Talking to someone', true]];
      box.innerHTML = `<div class="headline" style="left:96px;top:90px;width:1728px"></div>
        <div style="position:absolute;left:96px;right:96px;top:210px;display:grid;grid-template-columns:1fr 1fr;gap:28px;font:800 60px var(--display);color:${GOLD}"><div class="h0" style="opacity:0">The feeling</div><div class="h1" style="opacity:0">What you do</div></div>
        <div style="position:absolute;left:96px;right:96px;top:300px;display:grid;gap:18px">${ROWS.map(([f, ic, d, ok]) => `<div class="r" style="opacity:0;display:grid;grid-template-columns:1fr 1fr;gap:28px"><div style="background:#FFFFFF14;border-radius:22px;padding:14px 30px;display:flex;align-items:center;gap:26px;font:800 58px var(--display)"><img src="${icon(ic)}" alt="" style="width:90px;height:90px">${f}: allowed</div><div style="background:${ok ? '#0F766E' : '#991B1B'};border-radius:22px;padding:14px 30px;display:flex;align-items:center;font:800 52px/1.05 var(--display)">${d}: ${ok ? 'great choice' : 'not allowed'}</div></div>`).join('')}</div>`;
      return (i, beat) => {
        if (beat.side === 'feel') gsap.to(box.querySelector('.h0'), { opacity: 1, duration: .4 });
        if (beat.side === 'do') gsap.to(box.querySelector('.h1'), { opacity: 1, duration: .4 });
        if (beat.row != null) { lib.sfx.pop(); gsap.fromTo(box.querySelectorAll('.r')[beat.row], { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: .5, ease: 'power3.out' }); }
      };
    },

    /* Telling someone: the words can be simple. */
    emWho(box) {
      const { gsap } = window;
      box.innerHTML = `<div class="headline" style="left:96px;top:300px;width:1050px;font-size:104px"></div><div class="h" style="position:absolute;right:110px;top:240px;width:560px;display:grid;justify-items:center;gap:30px"><img src="${icon('speaking_head')}" alt="" style="width:300px;height:300px"><img src="${icon('ear')}" alt="" style="width:230px;height:230px"></div>`;
      gsap.fromTo(box.querySelector('.h'), { scale: .6, opacity: 0 }, { scale: 1, opacity: 1, duration: .7, ease: 'back.out(1.6)' });
      return () => {};
    },
  });
})();
