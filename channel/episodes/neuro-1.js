/* Your brain and nerves, Lesson 1 of 6. Science, Biology, The human body. A bonus unit: England teaches the nervous system at key stage 4 (ages 14 to 16), not at age 11 to 12. Aligned to that content and to Oak's KS4 order, simplified. Not approved by anyone.
   Goal: name the parts of the nervous system, follow a message from a stimulus to a response, say what a neuron and a reflex are, and spot two brain myths. Scene ids start with ne- because voice clips share one folder.
   Review notes: sources, what's unverified and the video plan are in docs/research/2026-11-07-neuroscience.md. Voice part only: no clips until the owner approves them (docs/rules/VIDEO-RULES.md). */
(window.EPISODES = window.EPISODES || []).push({
  id: 'neuro-1',
  extra: true,
  subjectStart: false,
  number: 1,
  subject: 'Science',
  unit: 'Your brain and nerves (bonus)',
  title: 'How Your Brain Talks to Your Body',
  topic: 'How your nervous system works',
  series: 'Science · Your brain and nerves',
  lessonLabel: 'Lesson 1 of 6',
  blurb: 'The three main parts of your nervous system, how a message travels from your skin to your muscles, what a neuron and a reflex are, and two brain myths.',
  hero: 'neuro-cover.jpg',
  heroAlt: 'A human body with its brain, spinal cord and nerves shown in bright gold',
  heroPos: '50% 50%',
  builder: 'plate',
  builderImg: 'neuro-body.jpg',
  builderLabel: 'Light up your nervous system',
  builderDone: 'Your nervous system',
  fullScore: 'Every message got through!',
  scenes: [
    { id: 'ne-greet', part: 'greet', chapter: 'Intro', type: 'statement', bg: '#1D4ED8', beats: [ { say: 'Hello, and welcome back to Science! This is Lesson 1 of a bonus unit: your brain and nerves.', text: 'Welcome back to *Science*' }, { say: 'Today, we’re finding out how messages race between your brain and your body. It’s what lets you catch a ball, or pull your hand away from something hot.', text: 'Today: how your *brain* talks to your body', hold: 0.4 } ] },
    { id: 'ne-known', part: 'known', chapter: 'Intro', type: 'statement', bg: '#1D4ED8', beats: [
      { say: 'Last unit, in How Do Your Muscles Work?, your muscles pulled on your bones to move you.', text: 'Muscles pull *bones*' },
      { say: 'But who tells your muscles when to pull? Shout it out!', text: 'Who gives the *order*?', hold: 3 },
      { say: 'Your brain, through your nerves. If you haven’t watched that lesson, that’s fine.', text: 'Your *brain*' },
    ] },
    { id: 'ne-unit', part: 'unit', chapter: 'Intro', type: 'statement', bg: '#0F766E', beats: [
      { say: 'You’ve learned that bones hold you up, and that muscles pull on them. But a muscle doesn’t pull by itself. Something has to tell it when.', text: 'What tells a muscle *when to pull?*' },
      { say: 'That’s what this unit is about. It’s a bonus unit. Schools in England usually teach it to older students, aged about fourteen to sixteen. So you’re getting an early start.', text: 'A bonus unit: *an early start*' },
    ] },
    { id: 'ne-journey', part: 'unit', chapter: 'Intro', type: 'art', art: 'neJourney', layout: 'full', bg: '#17131F', beats: [
      { say: 'Here’s the plan: six lessons on your brain and nerves. This is the first.', hold: 1.2 },
    ] },
    { id: 'ne-hook', part: 'hook', chapter: 'Intro', type: 'photo', bg: '#0C0A10', img: 'neuro-reflex.jpg', poster: 'neuro-cover.jpg', beats: [
      { say: 'Imagine your finger touches something very hot. Your hand jumps away, before you’ve had any time to think.', text: 'Your hand *jumps away*', focus: [45, 62, 1.12] },
      { say: 'So who decided to move it? Lots of people would say, your brain, of course. The brain is the boss of everything.', text: 'Your brain decided. *Or did it?*', focus: [45, 45, 1.08] },
      { say: 'It’s not that simple. By the end of this lesson, you’ll know what really moved that hand, and how messages race around your body.', text: 'What really moved your hand?', focus: [50, 50, 1] },
    ] },
    { id: 'ne-title', part: 'title', chapter: 'Intro', type: 'title', eyebrow: 'Your brain and nerves · Lesson 1 of 6', title: 'How Your *Brain* Talks to Your Body', img: 'neuro-body.jpg', bg: '#FFC400', fg: '#17131F', beats: [
      { say: 'Today’s question: how does your brain talk to your body?', hold: 0.8 },
    ] },
    { id: 'ne-today', part: 'today', chapter: 'Intro', type: 'recap', bg: '#1D4ED8', heading: 'Today, you’ll be able to', items: ['Name the main parts of your nervous system', 'Follow a message from your skin to a muscle', 'Say what a neuron is', 'Explain what a reflex is', 'Spot two brain myths'], beats: [
      { say: 'Today, you’ll name the main parts of your nervous system, and follow a message from your skin to a muscle. You’ll say what a neuron is, and explain what a reflex is. And you’ll spot two famous brain myths.', hold: 0.5 },
    ] },

    { id: 'ne-ch1', chapter: 'Your nervous system', type: 'chapter', n: 1, title: 'What your nervous system is', look: 'right', bg: '#0F766E', poster: 'neuro-body.jpg', beats: [
      { say: 'Chapter one. Meet the system that carries your body’s messages: your nervous system.' },
    ] },
    { id: 'ne-job', chapter: 'Your nervous system', type: 'statement', bg: '#7E22CE', beats: [
      { say: 'Your nervous system has one big job. It lets you sense changes, and respond to them quickly.', text: 'Sense it. *Respond to it.*' },
      { say: 'Those changes can be outside your body, like a loud bang. Or inside, like getting too hot.', text: 'Changes *outside* and *inside* you' },
    ] },
    { id: 'ne-parts', chapter: 'Your nervous system', type: 'atlas', bg: '#FFFFFF', img: 'neuro-plate.jpg', ratio: 1292 / 1100, plate: 'Your nervous system', beats: [
      { say: 'Here it is, shown in gold. At the top is your brain, safe inside your skull.', mark: [46, 6], zoom: 2.4, name: 'Brain', fact: 'Inside your skull' },
      { say: 'Running down from it, inside your backbone, is your spinal cord. It’s like a main road for messages.', mark: [45, 30], zoom: 1.6, name: 'Spinal cord', fact: 'Inside your backbone. A main road for messages' },
      { say: 'And spreading out from there, all over your body, are your nerves.', mark: [33, 34], zoom: 1.7, name: 'Nerves', fact: 'They reach all over your body' },
      { say: 'Your brain and spinal cord together have their own name: the central nervous system. It’s where messages get sorted out and answered.', mark: [45, 18], zoom: 1.3, name: 'Central nervous system', fact: 'Your brain and spinal cord together' },
    ] },
    { id: 'ne-protect', chapter: 'Your nervous system', type: 'statement', bg: '#1D4ED8', beats: [
      { say: 'Remember the jobs of your skeleton? One of them is protection. Your skull guards your brain, and your backbone guards your spinal cord.', text: 'Your skeleton *guards* them' },
      { say: 'And here’s a word to clear up. The nervous system has nothing to do with feeling nervous before a test. Here, nervous just means made of nerves.', text: 'Nervous system: made of *nerves*' },
    ] },
    { id: 'ne-guess-parts', chapter: 'Your nervous system', type: 'guess', bg: '#D42A20', question: 'Which two make up the central nervous system?', options: ['Heart and lungs', 'Brain and spinal cord', 'Bones and muscles', 'Skin and nerves'], answer: 1, img: 'neuro-body.jpg', imgCaption: 'Your brain and spinal cord', beats: [
      { say: 'Quick check. Which two make up the central nervous system?', step: 'ask' },
      { say: 'Shout your answer now!', step: 'count', hold: 5 },
      { say: 'Your brain and your spinal cord.', step: 'reveal' },
      { say: 'Nerves connect them to the rest of you.', step: 'image', hold: 0.5 },
    ] },

    { id: 'ne-ch2', chapter: 'A message’s journey', type: 'chapter', n: 2, title: 'How a message travels', look: 'number', bg: '#D42A20', beats: [
      { say: 'Chapter two. Let’s follow one message, all the way around your body.' },
    ] },
    { id: 'ne-signal', chapter: 'A message’s journey', type: 'art', art: 'neSignal', layout: 'full', bg: '#17131F', beats: [
      { say: 'Say someone taps your hand. That tap is a change. Scientists call a change like this a stimulus.', text: 'The change: a *stimulus*', step: 'stim' },
      { say: 'In your skin, special cells called receptors notice it.', text: 'Noticed by *receptors*', step: 'receptor' },
      { say: 'They set off a message. It races along a nerve to your spinal cord, and up to your brain.', text: 'A message goes *in*', step: 'up' },
      { say: 'Your brain works out what happened, and what to do. Maybe you decide to look, or to tap back.', text: 'Your brain *decides*', step: 'brain' },
      { say: 'A new message races back out, along a different nerve cell, to a muscle in your arm.', text: 'A message goes *out*', step: 'down' },
      { say: 'The muscle pulls, and your arm moves. That’s the response.', text: 'The action: a *response*', step: 'move' },
      { say: 'So the route goes like this. Stimulus. Receptor. Nerve. Central nervous system. Nerve. Then muscle.', text: 'In, decide, *out*', step: 'all', hold: 1 },
    ] },
    { id: 'ne-senses', chapter: 'A message’s journey', type: 'statement', bg: '#7E22CE', beats: [
      { say: 'Receptors aren’t only in your skin. Some are single cells, like those. Others are packed together in sense organs. Your eyes have receptors for light. Your ears have receptors for sound.', text: 'Receptors: *skin, eyes, ears*' },
      { say: 'Different senses, but the same start. A receptor notices a change, and a message sets off.', text: 'A change sets off a *message*' },
    ] },
    { id: 'ne-ball', chapter: 'A message’s journey', type: 'statement', bg: '#1D4ED8', beats: [
      { say: 'Let’s follow a harder one. A friend throws you a ball. The stimulus is the light from that moving ball, reaching your eyes.', text: 'The stimulus: a ball *you can see*' },
      { say: 'Receptors in your eyes notice it, and messages race along nerves to your brain.', text: 'Eyes to *brain*' },
      { say: 'Your brain works out where the ball is going, and decides to catch it.', text: 'Your brain *works it out*' },
      { say: 'Messages race out, down your spinal cord and along your nerves, to the muscles in your arm and hand. Your fingers close. Caught! That’s the response.', text: 'Brain to *muscles.* Caught!' },
    ] },
    { id: 'ne-try', chapter: 'A message’s journey', type: 'statement', bg: '#0F766E', beats: [
      { say: 'Try it now. Sit still and listen. When you hear me say the word now, clap once. Get ready.', text: 'Clap when you hear *now*', hold: 2.2 },
      { say: 'Now!', text: '*Now!*', hold: 1.6 },
      { say: 'It felt instant, but a whole journey just happened. The sound reached your ears, and a message went in to your brain. Your brain understood the word. And messages went out to the muscles in your arms.', text: 'Ears, brain, *muscles*' },
    ] },
    { id: 'ne-inside', chapter: 'A message’s journey', type: 'statement', bg: '#B45309', beats: [
      { say: 'It works for changes inside you too, and you don’t have to think about them. When you get too hot, your body responds by sweating, to cool you down.', text: 'Too hot? *You sweat*' },
    ] },
    { id: 'ne-guess-stim', chapter: 'A message’s journey', type: 'guess', bg: '#1D4ED8', question: 'Someone calls your name, and you turn your head. What’s the stimulus?', options: ['Your neck muscles', 'Turning your head', 'The sound of your name', 'Your brain'], answer: 2, img: 'neuro-body.jpg', imgCaption: 'The stimulus starts the journey', beats: [
      { say: 'Your turn. Someone calls your name, and you turn your head. What’s the stimulus?', step: 'ask' },
      { say: 'Shout it out!', step: 'count', hold: 5 },
      { say: 'The sound of your name. That’s the change that starts it all.', step: 'reveal' },
      { say: 'And turning your head is the response.', step: 'image', hold: 0.5 },
    ] },

    { id: 'ne-ch3', chapter: 'Neurons', type: 'chapter', n: 3, title: 'Neurons: the cells that carry messages', look: 'split', bg: '#7E22CE', poster: 'neuro-neuron.jpg', beats: [
      { say: 'Chapter three. What’s actually carrying these messages? A special kind of cell.' },
    ] },
    { id: 'ne-neuron', chapter: 'Neurons', type: 'atlas', bg: '#FFFFFF', img: 'neuro-neuron.jpg', ratio: 825 / 1280, plate: 'A neuron', beats: [
      { say: 'This is a nerve cell, also called a neuron. Your nerves are made of the long parts of lots of these cells, bundled together.', mark: [23, 52], zoom: 1, name: 'A neuron', fact: 'A nerve cell' },
      { say: 'The middle part is called the cell body. It keeps the whole cell alive.', mark: [22, 52], zoom: 2.2, name: 'Cell body', fact: 'Keeps the cell alive' },
      { say: 'This long thin wire is the axon. The message runs along it as a tiny electrical signal.', mark: [48, 24], zoom: 2, name: 'Axon', fact: 'Carries a tiny electrical signal' },
      { say: 'At the far end, the message passes to the next cell. Neurons have a tiny gap between them, and in the next lesson we’ll see how a message crosses it.', mark: [82, 28], zoom: 2.2, name: 'The far end', fact: 'The message passes to the next cell' },
    ] },
    { id: 'ne-video-nerves', use: 'support', status: 'candidate', chapter: 'Neurons', type: 'video', bg: '#17131F', youtube: 'uU_4uA6-zcE', end: 134, videoTitle: 'How do nerves work?', channel: 'TED-Ed', watchFor: 'Watch how a message travels along neurons', still: 'neuro-neuron.jpg', beats: [
      { say: 'Here’s a short film from TED-Ed about how nerves work. Watch how a message travels along neurons.' },
    ] },
    { id: 'ne-after-nerves', afterVideo: true, chapter: 'Neurons', type: 'statement', bg: '#0F766E', beats: [
      { say: 'So a message travels along neurons, from one to the next, until it reaches a muscle.', text: 'Neuron to *neuron*' },
    ] },
    { id: 'ne-count', chapter: 'Neurons', type: 'number', flip: true, bg: '#0C0A10', img: 'neuro-body.jpg', beats: [
      { say: 'How many neurons are in your brain? Scientists carefully counted them in four adult brains, and got about 86 billion.', speak: 'How many neurons are in your brain? Scientists carefully counted them in four adult brains, and got about eighty-six billion.', from: 0, to: 86, sub: 'billion neurons, about, in an adult brain' },
      { say: 'That’s about ten for every person on Earth, all packed inside one head.', sub: 'About 10 for every person on Earth' },
    ] },
    { id: 'ne-race', chapter: 'Neurons', type: 'art', art: 'neRace', layout: 'full', bg: '#17131F', beats: [
      { say: 'And how fast are the messages? Let’s race. In this lane is Usain Bolt. In 2009, he set a world record: 100 meters in 9.58 seconds.', speak: 'And how fast are the messages? Let’s race. In this lane is Usain Bolt. In two thousand and nine, he set a world record: a hundred meters in nine point five eight seconds.', text: 'A race over *100 m*', step: 'ready' },
      { say: 'In the other lane is a signal in one of your fastest nerves. These can travel over 100 meters in a single second.', speak: 'In the other lane is a signal in one of your fastest nerves. These can travel over a hundred meters in a single second.', text: 'Bolt against a *nerve signal*', step: 'go', hold: 1.5 },
      { say: 'Not every nerve is that fast. Some signals go at about walking speed. But that’s why you can respond so quickly.', text: 'Some are slower: about *walking speed*', step: 'slow' },
    ] },

    { id: 'ne-ch4', chapter: 'Reflexes', type: 'chapter', n: 4, title: 'Reflexes: moves without thinking', look: 'band', bg: '#1D4ED8', poster: 'neuro-reflex.jpg', posterPos: '50% 70%', beats: [
      { say: 'Chapter four. Back to our hot finger. It’s time to find out what moved that hand.' },
    ] },
    { id: 'ne-guess-reflex', chapter: 'Reflexes', type: 'guess', bg: '#0F766E', question: 'You touch something hot, and pull away fast. Where does the message get answered?', options: ['In your finger', 'In your brain', 'In your spinal cord', 'In your muscle'], answer: 2, img: 'neuro-reflex.jpg', imgCaption: 'The fast route goes through the spinal cord', beats: [
      { say: 'Here’s a tricky one. You touch something hot, and pull away fast. Where does the message get answered?', step: 'ask' },
      { say: 'Shout your answer!', step: 'count', hold: 5 },
      { say: 'In your spinal cord! It doesn’t need your brain to decide.', step: 'reveal' },
      { say: 'That’s the route in this picture.', step: 'image', hold: 0.5 },
    ] },
    { id: 'ne-arc', chapter: 'Reflexes', type: 'photo', bg: '#0C0A10', img: 'neuro-reflex.jpg', beats: [
      { say: 'This fast move is called a reflex. Follow the blue line. A message goes from the finger to the spinal cord.', text: 'In: to the *spinal cord*', focus: [60, 40, 1.2] },
      { say: 'There, it’s passed straight on, and the red line carries a new message back to the arm muscle.', text: 'Straight back *out*', focus: [50, 62, 1.25] },
      { say: 'The muscle pulls, and the hand jumps away. Scientists call this short route a reflex arc.', text: 'A *reflex arc*', focus: [40, 66, 1.15] },
    ] },
    { id: 'ne-video-reflex', use: 'support', status: 'candidate', chapter: 'Reflexes', type: 'video', bg: '#17131F', youtube: 'jA6IgvFAfJE', start: 91, end: 174, videoTitle: 'Why our reflexes are fast', channel: 'Free Animated Education', watchFor: 'Watch where the message turns around', still: 'neuro-reflex.jpg', beats: [
      { say: 'Here’s another way to see it. Watch where the message turns around.' },
    ] },
    { id: 'ne-after-reflex', afterVideo: true, chapter: 'Reflexes', type: 'statement', bg: '#1D4ED8', beats: [
      { say: 'It turns around in the spinal cord, before it reaches your brain. That’s why a reflex is so fast.', text: 'Turns at the *spinal cord*' },
    ] },
    { id: 'ne-why', chapter: 'Reflexes', type: 'statement', bg: '#D42A20', beats: [
      { say: 'Reflexes are fast, and you don’t choose them. That’s useful, because when something could hurt you, every moment counts.', text: 'Fast, and *not chosen*' },
      { say: 'Your brain isn’t left out for long. A message goes up to it as well. So you find out what happened, and you feel the pain, just after your hand has moved.', text: 'Your brain finds out *just after*' },
    ] },
    { id: 'ne-choice', chapter: 'Reflexes', type: 'statement', bg: '#0F766E', beats: [
      { say: 'Let’s test that. Reflex, or choice? Your finger touches a hot pan, and your hand jumps away. Shout it out!', text: 'Hot pan: *reflex or choice?*', hold: 3 },
      { say: 'Reflex. You didn’t choose it.', text: '*Reflex*' },
      { say: 'Next. You look at the menu, and pick a sandwich for lunch. Reflex, or choice?', text: 'Picking lunch: *reflex or choice?*', hold: 3 },
      { say: 'Choice. That message went all the way to your brain, and your brain took its time.', text: '*Choice:* your brain decided' },
      { say: 'Last one. A friend throws a ball, and you catch it. It’s quick, so is it a reflex?', text: 'Catching a ball: *a reflex?*', hold: 3 },
      { say: 'No. It’s fast, but your brain worked out where the ball was going. Fast doesn’t always mean reflex. What matters is the route.', text: 'What matters is *the route*' },
    ] },
    { id: 'ne-knee', chapter: 'Reflexes', type: 'statement', bg: '#7E22CE', beats: [
      { say: 'Have you ever seen a doctor tap someone’s knee with a little hammer, and the leg kicks by itself? That’s another reflex. The doctor is checking that the route works.', text: 'The knee tap: *another reflex*' },
      { say: 'Reflexes don’t mean your brain is powerless, though. It can sometimes override them. Think of holding still while you get an injection.', text: 'Your brain can sometimes *override* them' },
    ] },

    { id: 'ne-ch5', chapter: 'Brain myths', type: 'chapter', n: 5, title: 'Two famous brain myths', look: 'left', bg: '#0F766E', poster: 'neuro-brain.jpg', beats: [
      { say: 'Chapter five. Now you know how it works, let’s bust two things that lots of people believe about the brain.' },
    ] },
    { id: 'ne-myth10', chapter: 'Brain myths', type: 'statement', bg: '#B45309', beats: [
      { say: 'Myth number one. You only use 10 percent of your brain. You may have heard this in films.', speak: 'Myth number one. You only use ten percent of your brain. You may have heard this in films.', text: '“You only use *10%*”' },
      { say: 'It’s wrong. As one brain scientist, Nick Spitzer, puts it: we use all of our brain. Brain scans show activity all over it.', text: 'Wrong. You use *all of it*' },
    ] },
    { id: 'ne-energy', chapter: 'Brain myths', type: 'number', bg: '#0C0A10', img: 'neuro-brain.jpg', beats: [
      { say: 'Here’s another clue. In an adult, the brain is only about 2 percent of the body’s weight.', speak: 'Here’s another clue. In an adult, the brain is only about two percent of the body’s weight.', from: 0, to: 2, sub: 'percent of an adult’s weight' },
      { say: 'But it uses about 20 percent of the body’s energy. Your body wouldn’t spend all that on a part that mostly did nothing.', speak: 'But it uses about twenty percent of the body’s energy. Your body wouldn’t spend all that on a part that mostly did nothing.', from: 2, to: 20, sub: 'percent of the body’s energy' },
    ] },
    { id: 'ne-sides', chapter: 'Brain myths', type: 'photo', bg: '#0C0A10', img: 'neuro-brain.jpg', beats: [
      { say: 'Myth number two. People are either left-brained and logical, or right-brained and creative.', text: '“Left-brained” or “right-brained”?', focus: [50, 50, 1] },
      { say: 'Different parts of your brain do have different jobs, as you can see here. And some jobs lean to one side. Language tends to be on the left.', text: 'Some jobs *do* lean to one side', focus: [48, 58, 1.2] },
      { say: 'But when researchers studied brain scans of 1,011 people, they found no sign that a person uses one whole side more than the other.', speak: 'But when researchers studied brain scans of one thousand and eleven people, they found no sign that a person uses one whole side more than the other.', text: 'No “left-brained” *people*', focus: [50, 50, 1] },
      { say: 'So you can be logical and creative. You’re using your whole brain either way.', text: 'You use your *whole brain*', focus: [50, 50, 1.05] },
    ] },

    { id: 'ne-video-myth', use: 'support', status: 'candidate', chapter: 'Brain myths', type: 'video', bg: '#17131F', youtube: 'ZMSbDwpIyF4', end: 170, videoTitle: 'The left brain vs. right brain myth', channel: 'TED-Ed', watchFor: 'Listen for how the two sides really work', still: 'neuro-brain.jpg', beats: [
      { say: 'TED-Ed made a short film about this myth. Listen for how the two sides really work.' },
    ] },
    { id: 'ne-after-myth', afterVideo: true, chapter: 'Brain myths', type: 'statement', bg: '#7E22CE', beats: [
      { say: 'Both sides work together, all the time. Nobody is only left-brained, or only right-brained.', text: 'Both sides, *together*' },
    ] },
    { id: 'ne-bonus', chapter: 'Bonus', type: 'chapter', bonus: true, label: 'Bonus', title: 'Why can’t you tickle yourself?', look: 'split', bg: '#7E22CE', poster: 'neuro-stem.jpg', beats: [
      { say: 'Bonus! This isn’t in the test. Why can’t you tickle yourself?' },
    ] },
    { id: 'ne-tickle', chapter: 'Bonus', type: 'statement', bg: '#D42A20', beats: [
      { say: 'Try it. Tickle the palm of your own hand. Not much happens, does it?', text: 'Tickle your own *palm*', hold: 2 },
      { say: 'Scientists tested this in a brain scanner. People said the same touch felt less tickly when they did it themselves.', text: 'Your own touch feels *less tickly*' },
      { say: 'They think a part at the back of your brain, called the cerebellum, predicts what your own move will feel like. So there’s no surprise.', text: 'Your brain *saw it coming*' },
    ] },

    { id: 'ne-answer', part: 'answer', chapter: 'What we learned', type: 'statement', bg: '#D42A20', beats: [
      { say: 'So, who moved your hand off that hot thing? A fast route through your spinal cord. Your brain found out just after.', text: 'Your *spinal cord* moved it first' },
    ] },
    { id: 'ne-recap', part: 'summary', chapter: 'What we learned', type: 'recap', bg: '#0F766E', heading: 'What we learned', items: ['Brain, spinal cord and nerves', 'Stimulus, nerves, then response', 'Neurons carry electrical signals', 'A reflex is fast and not chosen', 'You use all of your brain'], beats: [
      { say: 'Here’s what we learned. Your nervous system is your brain, spinal cord and nerves. Messages go from a stimulus, along nerves, to a response. Neurons carry them as electrical signals. A reflex is fast and not chosen. And you use all of your brain.', hold: 0.4 },
    ] },
    { id: 'ne-next', part: 'next', chapter: 'What we learned', type: 'statement', bg: '#7E22CE', beats: [
      { say: 'Next time, we’ll zoom right in on a neuron, and see how a message jumps across the gap. Now, show what you know.', text: 'Next time: *Neurons up close*', hold: 0.4 },
    ] },
  ],
  starter: [
    { type: 'radio', q: 'From the Muscles lesson: what happens when a muscle contracts?', o: ['It gets shorter', 'It gets longer', 'It turns to bone'], a: 0, why: 'When a muscle contracts, it gets shorter.' },
    { type: 'radio', q: 'From the Muscles lesson: what are muscles made of?', o: ['Muscle cells', 'Bone', 'Air'], a: 0, why: 'Muscles are made of muscle cells.' },
    { type: 'radio', q: 'What do you think? Something hot touches your finger. What answers first?', o: ['Your spinal cord', 'Your brain', 'Your finger'], a: 0, why: 'A fast route through your spinal cord answers first. Today you’ll find out how.' },
  ],
  test: [
    { type: 'checkbox', q: 'Which of these make up your central nervous system? Tick all that are right.', o: ['Brain', 'Spinal cord', 'Heart', 'Lungs'], a: [0, 1], why: 'Your central nervous system is your brain and spinal cord.' },
    { type: 'order', q: 'Put this message’s journey in order.', items: ['Stimulus', 'Receptor', 'Nerve going in', 'Brain', 'Nerve going out', 'Muscle'], why: 'A change is noticed by receptors. A message goes in, the brain decides, and a message goes out to a muscle.' },
    { type: 'sort', q: 'Is each one a stimulus or a response? Sort them.', bins: ['Stimulus', 'Response'], items: [{ t: 'A loud bang', bin: 0 }, { t: 'Getting too hot', bin: 0 }, { t: 'A tap on your hand', bin: 0 }, { t: 'Jumping', bin: 1 }, { t: 'Sweating', bin: 1 }, { t: 'Moving your arm', bin: 1 }], why: 'A stimulus is the change. A response is what your body does about it.' },
    { type: 'gaps', q: 'Finish the sentences.', text: 'A nerve cell is also called a {0}. A message runs along its long thin part, the {1}, as a tiny {2} signal.', bank: ['neuron', 'axon', 'electrical', 'muscle', 'bone', 'sound'], a: ['neuron', 'axon', 'electrical'], why: 'Neurons carry messages along their axons as tiny electrical signals.' },
    { type: 'radio', q: 'About how many neurons did scientists count in an adult brain?', o: ['About 86 billion', 'About 86 thousand', 'About 86', 'About 86 million'], a: 0, why: 'They counted about 86 billion, in four adult brains.' },
    { type: 'radio', q: 'Why can you pull your hand off something hot before you’ve had time to think?', o: ['The message is answered in your spinal cord', 'Your finger decides by itself', 'Your skin moves your hand', 'Your brain guesses in advance'], a: 0, why: 'In a reflex, the message goes to your spinal cord and straight back out to a muscle.' },
    { type: 'match', q: 'Match each word to what it means.', pairs: [['Stimulus', 'A change you can sense'], ['Receptor', 'A cell that notices a change'], ['Neuron', 'A cell that carries messages'], ['Reflex', 'A fast move you don’t choose']], why: 'These are the key words from the message’s journey.' },
    { type: 'select', q: 'Choose the right words.', text: 'A reflex is {0}, and you {1} choose it. Your brain finds out {2}.', choices: [['fast', 'slow', 'silent'], ['don’t', 'always', 'must'], ['just after', 'a day later', 'never']], a: ['fast', 'don’t', 'just after'], why: 'A reflex is fast and not chosen, and a message reaches your brain just after.' },
    { type: 'truefalse', q: 'True or false?', rows: [['You only use 10 percent of your brain.', false], ['In an adult, the brain uses about a fifth of the body’s energy.', true], ['Brain scans show that some people use their whole left side more.', false]], why: 'You use all of your brain. It’s about 2 percent of an adult’s weight, and uses about 20 percent of the energy. A study of 1,011 people found no whole-side difference.' },
    { type: 'pics', q: 'Which picture shows the route of a reflex?', o: [{ img: 'neuro-neuron.jpg', t: 'Picture A' }, { img: 'neuro-reflex.jpg', t: 'Picture B' }, { img: 'neuro-brain.jpg', t: 'Picture C' }], a: 1, why: 'Picture B follows a message from a finger to the spinal cord and back to a muscle.' },
  ],
  credits: {
    /* A candidate list is in docs/research/2026-11-07-neuroscience.md. Videos go in once the owner has watched them. */
    videos: [
      { title: 'How do nerves work? (0:00 to 2:14)', by: 'TED-Ed', url: 'https://www.youtube.com/watch?v=uU_4uA6-zcE' },
      { title: 'Why Our Reflexes are Automatic and Fast (1:31 to 2:54)', by: 'Free Animated Education', url: 'https://www.youtube.com/watch?v=jA6IgvFAfJE' },
      { title: 'The left brain vs. right brain myth (0:00 to 2:50)', by: 'TED-Ed', url: 'https://www.youtube.com/watch?v=ZMSbDwpIyF4' },
    ],
    deeper: [],
  },
});

(function () {
  const GOLD = '#FFC400', IN = '#5FB8FF', OUT = '#FF7A59';
  const lessons = () => (window.CURRICULUM?.unitLessons?.['Your brain and nerves (bonus)'] || []).map((l) => l[0]);
  window.ART = Object.assign(window.ART || {}, {
    neJourney(box) {
      const { gsap } = window;
      box.innerHTML = `<h1 class="big" style="position:absolute;left:96px;top:90px;margin:0">Your brain and nerves: 6 lessons</h1>
        <ol style="position:absolute;left:96px;right:96px;top:250px;list-style:none;margin:0;padding:0;display:grid;grid-template-columns:repeat(3,1fr);gap:28px">${lessons().map((t, k) => `<li class="stop" style="background:${k ? '#FFFFFF14' : GOLD};color:${k ? '#FBFAFF' : '#17131F'};border-radius:24px;padding:34px;min-height:290px"><b style="display:block;font:800 92px/1 var(--display)">${k + 1}</b><span style="display:block;margin-top:16px;font:700 42px/1.12 var(--body)">${t}</span></li>`).join('')}</ol>`;
      return () => { gsap.fromTo(box.querySelectorAll('.stop'), { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: .4, stagger: .12, ease: 'power3.out' }); };
    },

    /* One message on the real diagram: in along a nerve to the brain, then out to an arm muscle. */
    neSignal(box, lib) {
      const { gsap } = window;
      const UP = 'M197 495 L208 455 L228 390 L258 305 L285 215 L322 178 L347 165 L347 80 L347 52';
      const DOWN = 'M347 52 L347 80 L347 165 L322 178 L285 215 L262 285 L250 330';
      const tag = (cls, x, y, t, c = '#FFF') => `<text class="${cls}" x="${x}" y="${y}" style="font:800 30px var(--body);fill:${c};stroke:#17131F;stroke-width:8;paint-order:stroke;opacity:0">${t}</text>`;
      box.innerHTML = `<div class="headline" style="left:96px;top:330px;width:880px"></div>
        <div style="position:absolute;left:1040px;top:20px;width:880px;height:1034px">
          <img src="${lib.img('neuro-body.jpg')}" alt="" style="position:absolute;inset:0;width:100%;height:100%">
          <svg viewBox="0 0 766 900" style="position:absolute;inset:0;width:100%;height:100%;overflow:visible" role="img" aria-label="A message travels from the hand, along a nerve, up the spinal cord to the brain, then back out to a muscle in the arm">
            <path class="pUp" d="${UP}" pathLength="1" fill="none" stroke="${IN}" stroke-width="7" stroke-linecap="round" stroke-dasharray="1" stroke-dashoffset="1"/>
            <path class="pDown" d="${DOWN}" pathLength="1" fill="none" stroke="${OUT}" stroke-width="7" stroke-linecap="round" stroke-dasharray="1" stroke-dashoffset="1"/>
            <circle class="touch" cx="197" cy="497" r="16" fill="none" stroke="${GOLD}" stroke-width="5" opacity="0"/>
            <circle class="dot" cx="197" cy="495" r="11" fill="#FFF" opacity="0"/>
            <circle class="glow" cx="347" cy="40" r="44" fill="${GOLD}" opacity="0"/>
            <circle class="musc" cx="250" cy="335" r="26" fill="${OUT}" opacity="0"/>
            ${tag('tStim', 30, 540, 'Tap!', GOLD)}${tag('tBrain', 410, 50, 'Brain', GOLD)}${tag('tIn', 60, 300, 'Going in', IN)}${tag('tOut', 40, 345, 'Going out', OUT)}${tag('tMus', 30, 390, 'Muscle', OUT)}
          </svg>
        </div>`;
      const q = (s) => box.querySelector(s), dot = q('.dot');
      const show = (s) => gsap.to(q(s), { opacity: 1, duration: .35 });
      const run = (path, duration) => {
        const el = q(path), len = el.getTotalLength(), pos = { t: 0 };
        gsap.to(dot, { opacity: 1, duration: .1 });
        gsap.to(el, { attr: { 'stroke-dashoffset': 0 }, duration, ease: 'none' });
        gsap.to(pos, { t: 1, duration, ease: 'none', onUpdate: () => { const p = el.getPointAtLength(pos.t * len); dot.setAttribute('cx', p.x); dot.setAttribute('cy', p.y); } });
      };
      return (i, beat) => {
        lib.sfx.pop();
        if (beat.step === 'stim') { show('.tStim'); gsap.fromTo(q('.touch'), { opacity: 1, attr: { r: 10 } }, { opacity: .2, attr: { r: 34 }, duration: .9, repeat: 2 }); }
        if (beat.step === 'receptor') gsap.to(q('.touch'), { opacity: 1, attr: { r: 18 }, duration: .4 });
        if (beat.step === 'up') { show('.tIn'); run('.pUp', 2.6); }
        if (beat.step === 'brain') { show('.tBrain'); gsap.fromTo(q('.glow'), { opacity: .75 }, { opacity: .25, duration: .8, yoyo: true, repeat: 3 }); }
        if (beat.step === 'down') { gsap.to(q('.glow'), { opacity: 0, duration: .3 }); show('.tOut'); run('.pDown', 2); }
        if (beat.step === 'move') { show('.tMus'); gsap.fromTo(q('.musc'), { opacity: .9, attr: { r: 16 } }, { opacity: .55, attr: { r: 30 }, duration: .6, yoyo: true, repeat: 3 }); }
        if (beat.step === 'all') gsap.to(dot, { opacity: 0, duration: .3 });
      };
    },

    /* The race: real times, 100 meters in 9.58 seconds against a signal at over 100 meters a second. */
    neRace(box, lib) {
      const { gsap } = window;
      const lane = (cls, y, label, sub, c, icon) => `<div style="position:absolute;left:96px;width:1728px;top:${y}px">
          <div style="display:flex;justify-content:space-between;align-items:baseline;font:800 46px var(--body)"><span>${label}</span><span class="${cls}T tab" style="color:${c}"></span></div>
          <div style="position:relative;height:96px;margin-top:14px;background:#FFFFFF14;border-radius:48px"><div class="${cls}B" style="position:absolute;left:0;top:0;bottom:0;width:0;background:${c};border-radius:48px"></div>${icon}</div>
          <p style="margin:12px 0 0;font:500 34px var(--body);color:#C9C4D6">${sub}</p></div>`;
      box.innerHTML = `<div class="headline" style="left:96px;top:80px;width:1728px"></div>
        ${lane('bolt', 300, 'Usain Bolt', 'His 2009 world record for 100 m', '#FFFFFF', `<img class="boltI" src="assets/icons/person_running.png" alt="" style="position:absolute;left:0;top:4px;height:88px;transform:scaleX(-1)">`)}
        ${lane('sig', 620, 'A fast nerve signal', 'Over 100 m in one second', GOLD, `<img class="sigI" src="assets/icons/high_voltage.png" alt="" style="position:absolute;left:0;top:4px;height:88px">`)}`;
      const q = (s) => box.querySelector(s);
      const go = (bar, icon, time, label, seconds) => {
        const v = { p: 0 };
        gsap.to(v, { p: 1, duration: seconds, ease: 'none', onUpdate: () => {
          q(bar).style.width = `${v.p * 100}%`;
          q(icon).style.left = `calc(${v.p * 100}% - ${v.p * 90}px)`;
          q(time).textContent = `${(v.p * label).toFixed(2)} s`;
        } });
      };
      return (i, beat) => {
        if (beat.step === 'go') { lib.sfx.pop(); go('.boltB', '.boltI', '.boltT', 9.58, 9.58); go('.sigB', '.sigI', '.sigT', 1, 1); }
      };
    },
  });
})();
