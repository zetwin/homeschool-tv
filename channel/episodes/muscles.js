/* Lesson 2 of the unit. Follows Oak's outcome: "I can describe what muscles are made of and how they move." Pulling in pairs, tendons and joints are left for Lesson 3.
   Scene ids start with mu- because voice clips from every lesson share one folder. */
(window.EPISODES = window.EPISODES || []).push({
  id: 'muscles',
  number: 2,
  title: 'How Do Your Muscles Work?',
  topic: 'Muscles',
  series: 'Science · Human skeleton and muscles',
  lessonLabel: 'Lesson 2 of 4',
  blurb: 'What muscles are made of, how they contract, what they run on, and the three kinds working inside you right now.',
  hero: 'muscle-cover.jpg',
  heroAlt: 'The muscles of a human body, from the front',
  heroPos: '50% 30%',
  builder: 'plate',
  builderLabel: 'Fill in the muscles',
  builderDone: 'Your muscles',
  fullScore: 'Every muscle filled in!',
  scenes: [
    { id: 'mu-greet', part: 'greet', chapter: 'Intro', type: 'statement', bg: '#1D4ED8', beats: [ { say: 'Hello again, and welcome back to Science. This is Lesson 2 of the human skeleton and muscles.', text: 'Welcome back to *Science*' }, { say: 'Today, we’re finding out how your muscles move your bones, and the three kinds of muscle working inside you right now. It’s how you walk, breathe and even blink.', text: 'Today: how *muscles* move you', hold: 0.4 } ] },
    { id: 'mu-last', part: 'lastTime', chapter: 'Intro', type: 'recap', bg: '#1D4ED8', heading: 'Last time', items: ['206 bones', 'Joints let you move', 'Bones are alive'], beats: [
      { say: 'Last time: your skeleton. 206 bones. Joints let you move. And bones are alive.', speak: 'Last time: your skeleton. Two hundred and six bones. Joints let you move. And bones are alive.' },
      { say: 'Quick question. Shout it out: how many bones do you have?', hold: 3 },
      { say: '206! If you missed that lesson, that’s fine.', speak: 'Two hundred and six! If you missed that lesson, that’s fine.' },
      { say: 'But bones can’t move by themselves. Today: what moves them.', hold: 0.4 },
    ] },
    { id: 'mu-hook', part: 'hook', chapter: 'Intro', type: 'art', art: 'nameMuscle', layout: 'full', bg: '#17131F', poster: 'muscle-cover.jpg', beats: [
      { say: 'Quick. Name a muscle.', text: 'Name a muscle.', hold: 1.2 },
      { say: 'Biceps? Lots of people say that.', text: 'Biceps?' },
      { say: 'But right now, sitting perfectly still, you have muscles working that you have never flexed.', text: 'Working right now' },
      { say: 'One is squeezing blood around your body. Another is moving your food along.', text: 'Muscles you can’t see' },
      { say: 'And you never told them to.', text: 'You never told them to.', hold: 0.6 },
    ] },
    { id: 'mu-title', part: 'title', chapter: 'Intro', type: 'title', eyebrow: 'Science · Lesson 2 of 4', title: 'How Do Your *Muscles* Work?', img: 'muscle-cover.jpg', bg: '#FFC400', fg: '#17131F', beats: [
      { say: 'This is the story of your muscles. All three kinds.', hold: 0.8 },
    ] },
    { id: 'mu-today', part: 'today', chapter: 'Intro', type: 'recap', bg: '#0F766E', heading: 'Today, you’ll be able to', items: ['Say what a muscle is made of', 'Explain how a muscle moves a bone', 'Name the three kinds of muscle'], beats: [
      { say: 'Today, you’ll be able to say what a muscle is made of, explain how a muscle moves a bone, and name the three kinds of muscle.' },
      { say: 'Why does it matter? Every step, every breath and every heartbeat uses muscles.', hold: 0.4 },
    ] },

    { id: 'mu-ch1', chapter: 'Made of what?', type: 'chapter', n: 1, title: 'What is a muscle made of?', bg: '#D42A20', poster: 'muscle-cells.jpg', beats: [
      { say: 'Chapter one. What is a muscle actually made of?' },
    ] },
    { id: 'mu-count', chapter: 'Made of what?', type: 'number', flip: true, bg: '#17131F', img: 'muscle-plate.jpg', beats: [
      { say: 'You have more than 600 muscles joined to your bones.', speak: 'You have more than six hundred muscles joined to your bones.', from: 0, to: 600, sub: 'muscles joined to your bones, at least' },
      { say: 'Together, they make up about a third of your body’s weight.', sub: 'about a third of your weight' },
    ] },
    { id: 'mu-zoom', chapter: 'Made of what?', type: 'art', art: 'zoomIn', layout: 'full', bg: '#17131F', beats: [
      { say: 'Let’s zoom in. From the outside, a muscle looks like one solid lump.', text: 'A muscle' },
      { say: 'But it’s made of thousands of long, thin cells, packed side by side.', text: 'Thousands of muscle *cells*' },
      { say: 'A muscle cell is a specialized cell. Its special job is to get shorter.', text: 'Its job: *get shorter*' },
      { say: 'That takes energy, so it has many mitochondria, the tiny parts of a cell that release energy.', text: 'Many *mitochondria*' },
    ] },
    { id: 'mu-micro', chapter: 'Made of what?', type: 'photo', bg: '#0C0A10', img: 'muscle-skeletal.jpg', beats: [
      { say: 'Here’s the real thing, under a microscope. Each long band is one muscle cell.', text: 'Real muscle cells', focus: [50, 50, 1.05] },
      { say: 'The pink is a dye, added so that we can see them.', text: 'Pink dye makes them show up', focus: [40, 45, 1.3] },
    ] },
    { id: 'mu-guess-long', chapter: 'Made of what?', type: 'guess', bg: '#1D4ED8', question: 'How long can a single muscle cell get?',
      options: ['As long as a grain of sand', 'As long as a grain of rice', 'Longer than your hand', 'As long as a car'], answer: 2, img: 'muscle-skeletal.jpg', imgCaption: 'Long muscle cells, magnified', beats: [
      { say: 'Quick question. How long can a single muscle cell get?', step: 'ask' },
      { say: 'Shout your answer now!', step: 'count', hold: 5 },
      { say: 'Longer than your hand! The longest ones, in an adult’s thigh, can reach about 30 centimeters.', speak: 'Longer than your hand! The longest ones, in an adult’s thigh, can reach about thirty centimeters.', step: 'reveal' },
      { say: 'These are giants among cells. But they’re about as thin as a hair, so you need a microscope to see one clearly.', step: 'image', hold: 0.5 },
    ] },

    { id: 'mu-ch2', chapter: 'Contract and relax', type: 'chapter', n: 2, title: 'Shorter, then longer', bg: '#0F766E', poster: 'muscle-shorter.jpg', beats: [
      { say: 'Chapter two. So how does a muscle actually move?' },
    ] },
    { id: 'mu-contract', chapter: 'Contract and relax', type: 'art', art: 'contractCell', layout: 'job', flip: true, word: 'Contract', eyebrow: 'Two things a muscle does', bg: '#17131F', beats: [
      { say: 'A muscle cell does two things. First, it contracts. That means it gets shorter.', text: 'Contract: get shorter' },
      { say: 'Second, it relaxes. It stops working, and it can get longer again.', text: 'Relax: stop, and it can lengthen' },
      { say: 'When thousands of cells contract together, the whole muscle gets shorter and thicker.', text: 'All together: shorter and thicker' },
    ] },
    { id: 'mu-try-flex', chapter: 'Contract and relax', type: 'art', art: 'flex', layout: 'job', word: 'Feel it', eyebrow: 'Try it now', bg: '#D42A20', beats: [
      { say: 'Try it. Put one hand on your upper arm, then bend that arm and squeeze.', text: 'Bend your arm and squeeze', hold: 3 },
      { say: 'Feel it get hard and bulge? Those are muscle cells contracting.', text: 'Hard and bulging: contracting' },
      { say: 'Now let your arm drop. Feel it go soft? That’s relaxing.', text: 'Soft: relaxing', hold: 1 },
    ] },

    { id: 'mu-ch3', chapter: 'Fuel', type: 'chapter', n: 3, title: 'What muscles run on', bg: '#7E22CE', poster: 'muscle-fuel.jpg', beats: [
      { say: 'Chapter three. Getting shorter takes energy. So where does it come from?' },
    ] },
    { id: 'mu-fuel', chapter: 'Fuel', type: 'art', art: 'fuel', layout: 'full', bg: '#17131F', beats: [
      { say: 'Your muscle cell mainly uses two things, and your blood delivers them both.', text: 'Your blood delivers' },
      { say: 'Sugar, from your food.', text: '*Sugar* from food' },
      { say: 'And oxygen, from the air you breathe.', text: '*Oxygen* from the air' },
      { say: 'In the mitochondria, these two release energy. That’s called respiration. Now the cell can contract.', text: 'Energy released: *respiration*' },
    ] },
    { id: 'mu-fist', chapter: 'Fuel', type: 'art', art: 'fist', layout: 'job', flip: true, word: 'The fist test', eyebrow: 'Try it now', bg: '#1D4ED8', beats: [
      { say: 'Hold one hand up in the air. Open and close your fist as fast as you can. Go!', text: 'Go! As fast as you can', hold: 12 },
      { say: 'Stop! Does it ache? Did it slow down?', text: 'Aching? Slowing down?' },
      { say: 'Your muscle was using energy faster than it could release more. That’s one reason it got tired. It’s also why you breathe harder when you run, and your heart speeds up.', text: 'Using energy faster than it can release it' },
    ] },

    { id: 'mu-ch4', chapter: 'Three kinds', type: 'chapter', n: 4, title: 'Three kinds of muscle', bg: '#D42A20', poster: 'muscle-kinds.jpg', hasVideo: true, beats: [
      { say: 'Chapter four. Three kinds of muscle. Here’s what lots of people get wrong.' },
    ] },
    { id: 'mu-myth', chapter: 'Three kinds', type: 'statement', bg: '#17131F', beats: [
      { say: 'Lots of people think muscles are only there to move your arms and legs.', text: 'Only arms and legs?' },
      { say: 'But that’s just one of three kinds.', text: 'That’s just *one of three*' },
    ] },
    { id: 'mu-video-1', use: 'support', status: 'candidate', chapter: 'Three kinds', type: 'video', bg: '#FFC400', fg: '#17131F', youtube: 'pLujm36HMZA', videoTitle: 'Muscular System For Kids', channel: 'Fun World For Kids',
      watchFor: 'Which muscles work without you thinking about them?', still: 'muscle-plate.jpg', beats: [
      { say: 'This video takes a tour of your muscles. Watch for one thing. Which ones work without you thinking about them?' },
    ] },
    { id: 'mu-after-video-1', afterVideo: true, chapter: 'Three kinds', type: 'statement', bg: '#0F766E', beats: [
      { say: 'So your heart and stomach muscles work all day and night, without you telling them.', text: 'No orders *needed*' },
    ] },
    { id: 'mu-kind-skeletal', chapter: 'Three kinds', type: 'art', art: 'kindSkeletal', layout: 'job', word: 'Skeletal', eyebrow: 'Kind 1 of 3', bg: '#0F766E', beats: [
      { say: 'Kind one. Skeletal muscle. Most of it is joined to your bones, and it makes them move.', text: 'Mostly joined to your bones' },
      { say: 'You’re in charge of it. You can decide when to kick a ball or wave. We call that voluntary.', text: 'You control it: *voluntary*' },
    ] },
    { id: 'mu-kind-smooth', chapter: 'Three kinds', type: 'art', art: 'kindSmooth', layout: 'job', word: 'Smooth', eyebrow: 'Kind 2 of 3', bg: '#7E22CE', beats: [
      { say: 'Kind two. Smooth muscle. It’s in the walls of your stomach, intestines and other organs.', text: 'Stomach, intestines, other organs' },
      { say: 'It squeezes behind your food in a wave, like squeezing a tube of toothpaste. That’s how muscle moves your food.', text: 'It squeezes food along' },
      { say: 'You can’t control it. We call that involuntary.', text: 'It works alone: *involuntary*' },
    ] },
    { id: 'mu-kind-cardiac', chapter: 'Three kinds', type: 'art', art: 'kindCardiac', layout: 'job', word: 'Cardiac', eyebrow: 'Kind 3 of 3', bg: '#D42A20', beats: [
      { say: 'Kind three. Cardiac muscle. It’s found only in your heart.', text: 'Only in your heart' },
      { say: 'Every heartbeat is cardiac muscle contracting. It does this about 100,000 times a day.', speak: 'Every heartbeat is cardiac muscle contracting. It does this about one hundred thousand times a day.', text: 'About 100,000 beats a day' },
      { say: 'It’s involuntary too. You can’t stop your heart just by thinking about it, and that’s a very good thing.', text: 'It works alone: *involuntary*' },
    ] },
    { id: 'mu-guess-upside', chapter: 'Three kinds', type: 'guess', bg: '#1D4ED8', question: 'Muscle moves your food. What if you’re upside down?',
      options: ['Back to your mouth', 'It stays in your throat', 'On to your stomach', 'Into your lungs'], answer: 2, img: 'muscle-smooth.jpg', imgCaption: 'Muscle from a gut wall, magnified', beats: [
      { say: 'So here’s a puzzle about that muscle. If you swallowed food while upside down, where would it go?', step: 'ask' },
      { say: 'Shout it out!', step: 'count', hold: 4 },
      { say: 'On to your stomach! Muscle squeezes food along, with or without gravity’s help.', step: 'reveal' },
      { say: 'Please don’t test this one. You could choke.', step: 'image', hold: 0.5 },
    ] },
    { id: 'mu-kinds-recap', chapter: 'Three kinds', type: 'recap', bg: '#17131F', heading: 'Three kinds', items: ['Skeletal: bones, voluntary', 'Smooth: stomach and intestines, involuntary', 'Cardiac: heart, involuntary'], beats: [
      { say: 'Skeletal, smooth and cardiac. Only one of them takes orders from you.', hold: 1.5 },
    ] },

    { id: 'mu-ch5', chapter: 'Meet your muscles', type: 'chapter', n: 5, title: 'Meet your muscles', bg: '#1D4ED8', poster: 'muscle-plate.jpg', beats: [
      { say: 'Chapter five. Let’s meet a few of your skeletal muscles.' },
    ] },
    { id: 'mu-atlas', chapter: 'Meet your muscles', type: 'atlas', bg: '#FFFFFF', img: 'muscle-plate.jpg', ratio: 2165 / 1280, plate: 'Plate II · The muscles, front view', beats: [
      { say: 'Your face has dozens of muscles. That’s how you smile, frown and raise an eyebrow.', mark: [50.7, 11.7], zoom: 2.4, name: 'Face', fact: 'Dozens of muscles make your expressions' },
      { say: 'This cap on your shoulder is the deltoid. It lifts your arm out to the side.', mark: [29.7, 24.3], zoom: 2.3, name: 'Deltoid', fact: 'Lifts your arm out to the side' },
      { say: 'Here’s your biceps again, on the front of your upper arm. It helps you bend your elbow.', mark: [28, 31], zoom: 2.3, name: 'Biceps', fact: 'Helps you bend your elbow' },
      { say: 'Down the middle of your front is the rectus abdominis, the famous six pack.', mark: [50.5, 36], zoom: 2, name: 'Rectus abdominis', fact: 'Helps you bend forward, even if you can’t see it' },
      { say: 'And the front of your thigh is the quadriceps. It straightens your knee.', mark: [42, 59], zoom: 1.7, name: 'Quadriceps', fact: 'Four muscles that straighten your knee', count: '4' },
    ] },
    { id: 'mu-records', chapter: 'Meet your muscles', type: 'cards', bg: '#FFC400', fg: '#17131F', heading: 'The record holders', cards: [
      { title: 'Biggest', text: 'Gluteus maximus, in your bottom', icon: 'seat' },
      { title: 'Smallest', text: 'Stapedius, in your ear', icon: 'ear' },
      { title: 'Never stops', text: 'Your heart, all your life', icon: 'beat' },
    ], footer: 'Remember the stapes? This muscle is joined to it.', beats: [
      { say: 'Now for the record holders. Your biggest muscle is in your bottom. It’s called the gluteus maximus.', card: 0 },
      { say: 'Your smallest is the stapedius, deep inside your ear.', card: 1 },
      { say: 'And the one that never takes a day off is your heart.', card: 2 },
      { say: 'Remember the stapes, the tiniest bone from last lesson? The stapedius is joined to it.', footer: true },
    ] },

    { id: 'mu-ch6', chapter: 'Build yours', type: 'chapter', n: 6, title: 'How muscles get stronger', bg: '#0F766E', poster: 'muscle-stronger.jpg', hasVideo: true, beats: [
      { say: 'Chapter six. How do muscles get stronger?' },
    ] },
    { id: 'mu-video-2', use: 'support', status: 'candidate', chapter: 'Build yours', type: 'video', bg: '#17131F', youtube: '2tM1LFFxeKg', videoTitle: 'What makes muscles grow?', channel: 'TED-Ed',
      watchFor: 'What happens inside a muscle after hard exercise?', still: 'muscle-stronger.jpg', beats: [
      { say: 'TED-Ed takes a look inside. Watch for one thing. What happens in a muscle after hard exercise?' },
    ] },
    { id: 'mu-after-video-2', afterVideo: true, chapter: 'Build yours', type: 'statement', bg: '#0F766E', beats: [
      { say: 'So after hard exercise, muscles repair themselves, and slowly get stronger.', text: 'Repair, then *stronger*' },
    ] },
    { id: 'mu-repair', chapter: 'Build yours', type: 'art', art: 'repair', layout: 'job', flip: true, word: 'Stronger', eyebrow: 'How a muscle grows', bg: '#17131F', beats: [
      { say: 'Let’s check. Hard exercise tells your muscle cells to build.', text: 'A signal to build' },
      { say: 'Over the next days, your body can make them a little thicker.', text: 'A little thicker' },
      { say: 'You may have heard about tiny tears in muscles. Scientists are still working out how much those matter.', text: 'Science is still finding out' },
    ] },
    { id: 'mu-strong', chapter: 'Build yours', type: 'cards', bg: '#FFC400', fg: '#17131F', heading: 'Three ways to build stronger muscles', cards: [
      { title: 'Move', text: 'Run, climb, swim and play', icon: 'jump' },
      { title: 'Eat protein', text: 'Beans, eggs, fish, meat and nuts', icon: 'egg' },
      { title: 'Rest and sleep', text: 'Give your body time to recover', icon: 'moon' },
    ], footer: 'Your heart is a muscle too. Exercise trains it.', beats: [
      { say: 'One. Move. Run, climb, swim and play.', card: 0 },
      { say: 'Two. Eat protein, like beans, eggs, fish, meat and nuts.', card: 1 },
      { say: 'Three. Rest and sleep, so your body has time to recover.', card: 2 },
      { say: 'And remember, your heart is a muscle too. Exercise trains it.', footer: true },
    ] },

    { id: 'mu-bonus', chapter: 'Bonus: muscle myths', type: 'chapter', label: 'Bonus chapter', bonus: true, look: 'right', title: 'Two muscle myths', bg: '#7E22CE', poster: 'muscle-myths.jpg', beats: [
      { say: 'Bonus chapter. This won’t be in the test, but you may hear these myths.' },
    ] },
    { id: 'mu-myth-tongue', chapter: 'Bonus: muscle myths', type: 'statement', bg: '#17131F', beats: [
      { say: 'Myth one. Your tongue is your strongest muscle.', text: 'Tongue: *the strongest?*' },
      { say: 'Scientists don’t name it the strongest. And it isn’t even one muscle. It’s a group of muscles, working together.', text: 'It’s a *group of muscles*' },
    ] },
    { id: 'mu-myth-fat', chapter: 'Bonus: muscle myths', type: 'statement', bg: '#D42A20', beats: [
      { say: 'Myth two. If you stop exercising, muscle turns into fat.', text: 'Muscle turns to *fat?*' },
      { say: 'It can’t. Muscle and fat are made of different cells. One can’t turn into the other.', text: 'No. *Different cells*' },
    ] },

    { id: 'mu-answer', part: 'answer', chapter: 'What we learned', type: 'statement', bg: '#D42A20', beats: [
      { say: 'Remember the start? Muscles you have never flexed are working right now: your heart, and the muscles moving your food along.', text: 'Working *without you*' },
    ] },
    { id: 'mu-recap', part: 'summary', chapter: 'What we learned', type: 'recap', bg: '#D42A20', heading: 'What we learned', items: ['Made of muscle cells', 'Contract and relax', 'Mainly sugar and oxygen', 'Three kinds'], beats: [
      { say: 'Let’s lock it in. Muscles are made of muscle cells. They contract and relax. They run mainly on sugar and oxygen. And there are three kinds.' },
    ] },
    { id: 'mu-next', part: 'next', chapter: 'What we learned', type: 'statement', bg: '#7E22CE', beats: [
      { say: 'Next lesson, a puzzle. If a muscle can only get shorter, how do you straighten your arm again?', text: 'Next time: *a puzzle*', hold: 0.4 },
      { say: 'But first, take the test.', text: 'Now, *the test*', hold: 0.4 },
    ] },
  ],
  starter: [
    { type: 'radio', q: 'Last lesson: which job of your skeleton needs muscles to work?', o: ['Moving your body', 'Making blood cells', 'Storing calcium'], a: 0, why: 'Muscles move your bones, like levers.' },
    { type: 'radio', q: 'All living things are made of…', o: ['Cells', 'Bones', 'Metal'], a: 0, why: 'Cells are the building blocks of every living thing.' },
    { type: 'radio', q: 'Which part of a cell releases energy?', o: ['Mitochondria', 'Nucleus', 'Cell membrane'], a: 0, why: 'Mitochondria release energy. You’ll see why that matters today.' },
  ],
  test: [
    { type: 'radio', img: 'muscle-skeletal.jpg', q: 'What is a muscle made of?', o: ['Muscle cells', 'Bone cells', 'Blood', 'Fat'], a: 0, why: 'A muscle is made of specialized muscle cells.' },
    { type: 'tap', fig: 'body', q: 'Tap the place where cardiac muscle is found.', a: 'heart', why: 'Cardiac muscle is found only in the heart.' },
    { type: 'gaps', q: 'Your blood brings two things that muscle cells use to release energy. Finish the sentence.', text: 'Muscle cells use {0} and {1}.', bank: ['sugar', 'oxygen', 'salt', 'marrow', 'sunlight'], a: ['sugar', 'oxygen'], any: true, why: 'Sugar and oxygen are used in the mitochondria.' },
    { type: 'contract', q: 'Contract this muscle. Pull the bright bone toward the other one.', ask: 'What happened to the muscle?', o: ['It got shorter and thicker', 'It got longer and thinner', 'It stayed the same'], a: 0, why: 'To contract means to get shorter. Its cells bunch up, so it also gets thicker.' },
    { type: 'match', q: 'Match each kind of muscle to where it’s found.', pairs: [['Skeletal', 'Joined to bones'], ['Smooth', 'Stomach and intestines'], ['Cardiac', 'Heart']], why: 'Skeletal moves bones, smooth moves food, and cardiac pumps blood.' },
    { type: 'sort', q: 'Which muscles can you control?', bins: ['You control it', 'It works by itself'], items: [{ t: 'Skeletal muscle', bin: 0, img: 'muscle-skeletal.jpg' }, { t: 'Smooth muscle', bin: 1, img: 'muscle-smooth.jpg' }, { t: 'Cardiac muscle', bin: 1, img: 'muscle-cardiac.jpg' }], why: 'You choose when to move skeletal muscle. Smooth and cardiac muscle work without you thinking about it.' },
    { type: 'label', fig: 'body', q: 'Drag each kind of muscle to the correct letter.', pins: { A: 'heart', B: 'gut', C: 'biceps' }, bank: ['Cardiac', 'Smooth', 'Skeletal'], a: { A: 'Cardiac', B: 'Smooth', C: 'Skeletal' }, why: 'Heart: cardiac. Intestines: smooth. Arm: skeletal.' },
    { type: 'word', img: 'muscle-cover.jpg', q: 'Muscles you can control are called what?', a: ['voluntary', 'voluntary muscles', 'voluntary muscle'], placeholder: 'One word', why: 'Voluntary means you’re in charge. Involuntary muscles work by themselves.' },
    { type: 'order', q: 'Put these in order, from your food to a moving muscle.', items: ['You eat food', 'Blood carries sugar to a muscle cell', 'Mitochondria release energy', 'The muscle cell contracts'], why: 'Food gives sugar, blood delivers it, mitochondria release the energy, and the cell contracts.' },
    { type: 'radio', img: 'muscle-smooth.jpg', q: 'How does food move through your intestines?', o: ['Smooth muscle squeezes it along', 'Gravity pulls it down', 'Skeletal muscle pushes it', 'It moves when you walk'], a: 0, why: 'Smooth muscle squeezes in waves, even if you’re upside down.' },
    { type: 'slider', img: 'muscle-plate.jpg', q: 'About how many muscles are joined to your bones?', min: 100, max: 1000, step: 50, unit: 'muscles', a: 650, tol: 50, why: 'More than 600. Scientists count them in different ways, so answers from 600 to 700 are right.' },
    { type: 'number', img: 'muscle-cardiac.jpg', q: 'Your heart beats about 100,000 times a day. About how many times is that in 3 days?', a: 300000, why: '100,000 × 3 = 300,000.' },
  ],
  credits: {
    videos: [
      { title: 'Muscular System For Kids', by: 'Fun World For Kids', url: 'https://www.youtube.com/watch?v=pLujm36HMZA' },
      { title: 'What makes muscles grow?', by: 'TED-Ed', url: 'https://www.youtube.com/watch?v=2tM1LFFxeKg' },
    ],
    deeper: [
      { youtube: 'u_7kNIlStmA', title: 'The Muscular System for Kids', by: 'Hey! Guess What', note: 'A longer tour, 10 minutes' },
      { youtube: 'gcdGw09heBM', title: 'What are muscles?', by: 'Mr. Donovan', note: 'A short class lesson' },
      { youtube: 'Ktv-CaOt6UQ', title: 'Muscles, Part 1: Muscle Cells', by: 'CrashCourse', note: 'For older students' },
    ],
  },
});

/* Custom animations used by `art` scenes in this episode. Each draws into `box` and returns a function called once per spoken line. */
window.ART = Object.assign(window.ART || {}, {
  nameMuscle(box, lib) {
    const { gsap } = window;
    const gut = 'M92 226C126 212 158 222 150 240C142 256 96 244 92 262C88 280 150 266 152 286C154 306 96 294 96 314';
    box.innerHTML = `<div class="headline" style="left:96px;top:300px;width:900px;font-size:128px;line-height:1"></div>
      <svg id="flexArm" viewBox="0 0 600 600" style="position:absolute;left:1040px;top:190px;width:680px;height:680px;opacity:0">
        <path d="M70 500L240 330" stroke="#E5352B" stroke-width="130" stroke-linecap="round"/><g id="fore"><path d="M240 330L440 200" stroke="#E5352B" stroke-width="104" stroke-linecap="round"/><circle cx="470" cy="170" r="62" fill="#E5352B"/></g>
        <ellipse id="bulge" cx="170" cy="340" rx="104" ry="58" transform="rotate(-45 170 340)" fill="#FFC400"/></svg>
      <svg id="person" viewBox="0 0 240 645" style="position:absolute;left:1120px;top:30px;width:330px;height:887px;overflow:visible;opacity:0">${lib.bodyShape('#3A3348')}
        <path id="gutBase" d="${gut}" fill="none" stroke="#8C5C9E" stroke-width="13" stroke-linecap="round"/><path id="gutWave" d="${gut}" fill="none" stroke="#FFC400" stroke-width="17" stroke-linecap="round" opacity="0"/>
        <path id="heart" d="M130 146c-9-13-27-5-20 10 4 9 14 17 20 24 6-7 16-15 20-24 7-15-11-23-20-10z" fill="#E5352B" opacity="0"/></svg>`;
    const arm = box.querySelector('#flexArm'), person = box.querySelector('#person'), wave = box.querySelector('#gutWave'), heart = box.querySelector('#heart');
    return (i) => {
      if (i === 1) {
        gsap.to(arm, { opacity: 1, duration: .3 }); lib.sfx.pop();
        gsap.from(box.querySelector('#fore'), { rotation: 60, svgOrigin: '240 330', duration: .7, ease: 'back.out(2)' });
        gsap.fromTo(box.querySelector('#bulge'), { attr: { ry: 34 } }, { attr: { ry: 58 }, duration: .7, ease: 'back.out(2)' });
      }
      if (i === 2) {
        gsap.to(arm, { opacity: 0, duration: .3 }); gsap.to(person, { opacity: 1, duration: .6 });
        gsap.set(heart, { opacity: 1 });
        gsap.to(heart, { scale: 1.2, transformOrigin: '50% 50%', duration: .38, repeat: -1, yoyo: true, ease: 'sine.inOut' });
      }
      if (i === 3) {
        const len = wave.getTotalLength();
        gsap.set(wave, { opacity: 1, strokeDasharray: `30 ${len}` });
        gsap.fromTo(wave, { strokeDashoffset: 30 }, { strokeDashoffset: -len, duration: 2.6, ease: 'none', repeat: -1 });
      }
    };
  },

  zoomIn(box, lib) {
    const { gsap } = window;
    let cells = '';
    for (let k = 0; k < 14; k++) cells += `<rect class="cell" x="${120 + (k % 2) * 34}" y="${118 + k * 24}" width="1130" height="19" rx="9" fill="${k === 7 ? '#FFC400' : '#E5635B'}"/>`;
    let mito = '';
    for (let k = 0; k < 24; k++) mito += `<ellipse class="mito" cx="${190 + (k % 12) * 92}" cy="${k < 12 ? 300 : 460}" rx="34" ry="17" fill="#FFC400" stroke="#17131F" stroke-width="4"/>`;
    let stripes = '';
    for (let k = 0; k < 44; k++) stripes += `<rect x="${112 + k * 28}" y="214" width="9" height="332" fill="#A82420"/>`;
    box.innerHTML = `<div class="headline" style="left:96px;top:90px"></div>
      <svg viewBox="0 0 1400 660" style="position:absolute;left:260px;top:210px;width:1400px;height:660px;overflow:visible">
        <path id="lump" d="M40 330C200 90 1200 90 1360 330C1200 570 200 570 40 330Z" fill="#D42A20" stroke="#F5F1E2" stroke-width="6"/>
        <g id="cells" opacity="0">${cells}</g>
        <clipPath id="bigClip"><rect x="100" y="200" width="1240" height="360" rx="170"/></clipPath>
        <g id="big" opacity="0"><rect x="100" y="200" width="1240" height="360" rx="170" fill="#E5635B"/><g clip-path="url(#bigClip)">${stripes}</g><rect x="100" y="200" width="1240" height="360" rx="170" fill="none" stroke="#F5F1E2" stroke-width="6"/><g id="mitos">${mito}</g></g></svg>`;
    const lump = box.querySelector('#lump'), cellsG = box.querySelector('#cells'), one = box.querySelectorAll('.cell')[7], big = box.querySelector('#big');
    const mitos = box.querySelectorAll('.mito');
    gsap.set(mitos, { opacity: 0 });
    gsap.from(lump, { scale: .6, opacity: 0, transformOrigin: '50% 50%', duration: .7, ease: 'back.out(1.5)' });
    return (i) => {
      if (i === 1) {
        lib.sfx.whoosh();
        gsap.to(lump, { opacity: .18, duration: .8 });
        gsap.set(cellsG, { opacity: 1 });
        gsap.from(box.querySelectorAll('.cell'), { scaleX: 0, transformOrigin: '50% 50%', duration: .6, stagger: .06, ease: 'power2.out' });
      }
      if (i === 2) {
        gsap.to(box.querySelectorAll('.cell'), { opacity: .22, duration: .4 });
        gsap.to(one, { opacity: 1, duration: .1 });
        gsap.to(one, { scaleX: .62, transformOrigin: '50% 50%', duration: .7, ease: 'sine.inOut', repeat: -1, yoyo: true, repeatDelay: .25 });
      }
      if (i === 3) {
        gsap.killTweensOf(one);
        gsap.to([cellsG, lump], { opacity: 0, duration: .4 });
        gsap.to(big, { opacity: 1, duration: .5, delay: .2 });
        gsap.to(mitos, { opacity: 1, duration: .2, stagger: .07, delay: .6, onStart: lib.sfx.pop });
      }
    };
  },

  contractCell(box) {
    const { gsap } = window;
    const bar = (y, id = '') => `<rect ${id} x="90" y="${y}" width="760" height="86" rx="43" fill="#E5635B" stroke="#F5F1E2" stroke-width="5"/>`;
    box.innerHTML = `<svg viewBox="0 0 940 860" style="width:100%;height:100%">
      <g id="single">${bar(385, 'id="cell"')}</g>
      <g id="many" opacity="0"><path id="outline" d="M50 430C200 150 740 150 890 430C740 710 200 710 50 430Z" fill="#8F1812" stroke="#F5F1E2" stroke-width="6"/><g id="rows">${[290, 360, 430, 500].map((y) => `<rect x="170" y="${y - 22}" width="600" height="44" rx="22" fill="#E5635B"/>`).join('')}</g></g></svg>`;
    const cell = box.querySelector('#cell'), many = box.querySelector('#many'), single = box.querySelector('#single');
    const squeeze = (el) => gsap.to(el, { scaleX: .6, scaleY: 1.5, svgOrigin: '470 430', duration: .8, ease: 'sine.inOut', repeat: -1, yoyo: true, repeatDelay: .3 });
    return (i) => {
      gsap.killTweensOf([cell, many]);
      if (i === 0) squeeze(cell);
      if (i === 1) gsap.to(cell, { scaleX: 1, scaleY: 1, svgOrigin: '470 430', duration: 1.2, ease: 'sine.out' });
      if (i === 2) {
        gsap.to(single, { opacity: 0, duration: .3 });
        gsap.set(many, { opacity: 1 });
        gsap.to(many, { scaleX: .72, scaleY: 1.28, svgOrigin: '470 430', duration: .9, ease: 'sine.inOut', repeat: -1, yoyo: true, repeatDelay: .3 });
      }
    };
  },

  flex(box, lib) {
    const draw = window.ART.arm(box, lib);
    return (i) => { if (i === 0) draw(1); if (i === 2) { window.gsap.killTweensOf(box.querySelectorAll('#fore,#muscle')); window.gsap.to(box.querySelector('#fore'), { rotation: 0, svgOrigin: '470 470', duration: .6 }); window.gsap.to(box.querySelector('#muscle'), { attr: { ry: 42, rx: 130 }, duration: .6 }); } };
  },

  fuel(box, lib) {
    const { gsap } = window;
    const dot = (cls, color, label) => `<g class="${cls}" opacity="0"><circle r="38" fill="${color}" stroke="#17131F" stroke-width="4"/><text y="8" text-anchor="middle" font-family="DM Sans,Arial" font-weight="800" font-size="22" fill="#17131F">${label}</text></g>`;
    let mito = '';
    for (let k = 0; k < 7; k++) mito += `<ellipse class="mito" cx="${240 + k * 160}" cy="470" rx="52" ry="24" fill="#6B5A2A" stroke="#17131F" stroke-width="4"/>`;
    box.innerHTML = `<div class="headline" style="left:96px;top:90px"></div>
      <svg viewBox="0 0 1500 640" style="position:absolute;left:210px;top:220px;width:1500px;height:640px;overflow:visible">
        <g id="vessel" opacity="0"><rect x="0" y="30" width="1500" height="140" rx="70" fill="#8F1812"/><text x="60" y="118" font-family="Bricolage Grotesque,Arial" font-weight="800" font-size="44" fill="#FFD9D3">Blood</text></g>
        ${Array.from({ length: 6 }, () => dot('sugar', '#FFC400', 'sugar')).join('')}${Array.from({ length: 6 }, () => dot('oxy', '#8FE3FF', 'O₂')).join('')}
        <rect id="cell" x="110" y="340" width="1280" height="260" rx="130" fill="#E5635B" stroke="#F5F1E2" stroke-width="6"/>${mito}
        <g id="bolts" opacity="0">${[320, 640, 960, 1280].map((x) => `<path transform="translate(${x - 20} 340)" d="M28 0L0 56H22L10 104L52 40H30L44 0Z" fill="#FFF"/>`).join('')}</g></svg>`;
    const flow = (cls, offset) => box.querySelectorAll(cls).forEach((g, k) => {
      const tl = gsap.timeline({ repeat: -1, delay: k * .55 + offset });
      tl.set(g, { opacity: 1, x: 230, y: 100 }).to(g, { x: 330 + k * 190, duration: 1.2, ease: 'none' }).to(g, { y: 460, duration: .8, ease: 'power1.in' }).to(g, { opacity: 0, duration: .2 });
    });
    return (i) => {
      if (i === 0) gsap.to(box.querySelector('#vessel'), { opacity: 1, duration: .6 });
      if (i === 1) { lib.sfx.pop(); flow('.sugar', 0); }
      if (i === 2) { lib.sfx.pop(); flow('.oxy', .2); }
      if (i === 3) {
        gsap.to(box.querySelectorAll('.mito'), { attr: { fill: '#FFC400' }, duration: .4, stagger: .08 });
        gsap.to(box.querySelector('#bolts'), { opacity: 1, duration: .25, delay: .8, repeat: -1, yoyo: true, repeatDelay: .25 });
        gsap.to(box.querySelector('#cell'), { scaleX: .8, svgOrigin: '750 470', duration: .9, delay: 1.4, ease: 'sine.inOut', repeat: -1, yoyo: true, repeatDelay: .4 });
      }
    };
  },

  fist(box, lib) {
    const { gsap } = window;
    const fingers = [150, 215, 280, 345].map((x, k) => `<rect class="fing" x="${x}" y="${k === 0 || k === 3 ? 170 : 130}" width="56" height="${k === 0 || k === 3 ? 220 : 260}" rx="28" fill="#F5F1E2" stroke="#17131F" stroke-width="6"/>`).join('');
    box.innerHTML = `<svg viewBox="0 0 940 860" style="width:100%;height:100%"><g transform="translate(180 60)">${fingers}<rect x="70" y="340" width="90" height="190" rx="44" fill="#F5F1E2" stroke="#17131F" stroke-width="6" transform="rotate(-24 115 435)"/><rect x="140" y="360" width="270" height="290" rx="60" fill="#F5F1E2" stroke="#17131F" stroke-width="6"/></g></svg>
      <div id="tick" class="mega tab" style="position:absolute;right:30px;top:0;color:#FFC400;opacity:0">15</div>`;
    const fs = box.querySelectorAll('.fing'), tick = box.querySelector('#tick');
    return (i) => {
      if (i === 0) {
        gsap.to(fs, { scaleY: .34, svgOrigin: '250 450', duration: .22, ease: 'sine.inOut', repeat: -1, yoyo: true });
        const n = { v: 15 };
        gsap.to(tick, { opacity: 1, duration: .3 });
        gsap.to(n, { v: 0, duration: 15, ease: 'none', onUpdate: () => { tick.textContent = Math.ceil(n.v); } });
      }
      if (i === 1) { lib.sfx.ding(); gsap.killTweensOf(fs); gsap.to(fs, { scaleY: 1, duration: .4 }); gsap.to(tick, { opacity: 0, duration: .3 }); }
    };
  },

  kindSkeletal(box, lib) {
    const { gsap } = window;
    box.innerHTML = `<div style="position:absolute;inset:0;display:grid;grid-template-rows:330px 1fr;gap:20px"><figure style="margin:0;position:relative"><img src="${lib.img('muscle-skeletal.jpg')}" alt="Skeletal muscle under a microscope" style="width:100%;height:330px;object-fit:cover;border-radius:16px"></figure><div class="kindArt" style="min-height:0;position:relative"></div></div>`;
    const inner = box.querySelector('.kindArt');
    inner.innerHTML = `<svg viewBox="0 0 940 510" style="width:100%;height:100%"><path d="M90 60L420 300" stroke="#F5F1E2" stroke-width="44" stroke-linecap="round"/><ellipse id="m" cx="240" cy="150" rx="150" ry="42" fill="#E5635B" stroke="#17131F" stroke-width="5" transform="rotate(36 240 150)"/><g id="f"><path d="M420 300L800 300" stroke="#F5F1E2" stroke-width="36" stroke-linecap="round"/></g><circle cx="420" cy="300" r="30" fill="#FFC400" stroke="#17131F" stroke-width="5"/></svg>`;
    return (i) => { if (i === 0) { gsap.to(inner.querySelector('#f'), { rotation: -70, svgOrigin: '420 300', duration: 1, ease: 'sine.inOut', repeat: -1, yoyo: true, repeatDelay: .3 }); gsap.to(inner.querySelector('#m'), { attr: { ry: 66, rx: 122 }, duration: 1, ease: 'sine.inOut', repeat: -1, yoyo: true, repeatDelay: .3 }); } };
  },

  kindSmooth(box, lib) {
    const { gsap } = window;
    const n = 16, rings = Array.from({ length: n }, (_, k) => `<g class="ring" transform="translate(${70 + k * 53} 250)"><ellipse class="ringIn" rx="24" ry="120" fill="#E5635B" stroke="#17131F" stroke-width="4"/></g>`).join('');
    box.innerHTML = `<div style="position:absolute;inset:0;display:grid;grid-template-rows:330px 1fr;gap:20px"><img src="${lib.img('muscle-smooth.jpg')}" alt="Smooth muscle under a microscope" style="width:100%;height:330px;object-fit:cover;border-radius:16px"><div style="min-height:0"><svg viewBox="0 0 940 500" style="width:100%;height:100%">${rings}<circle id="food" cx="0" cy="250" r="66" fill="#FFC400" stroke="#17131F" stroke-width="5"/></svg></div></div>`;
    const ins = [...box.querySelectorAll('.ringIn')], food = box.querySelector('#food');
    return (i) => {
      if (i !== 1) return;
      const tl = gsap.timeline({ repeat: -1, repeatDelay: .3 }), step = .17;
      tl.fromTo(food, { attr: { cx: 30 } }, { attr: { cx: 930 }, duration: step * n, ease: 'none' }, 0);
      ins.forEach((r, k) => { tl.to(r, { attr: { ry: 66 }, duration: step * 1.4, ease: 'sine.out' }, Math.max(0, (k - 2) * step)).to(r, { attr: { ry: 120 }, duration: step * 2, ease: 'sine.in' }); });
    };
  },

  kindCardiac(box, lib) {
    const { gsap } = window;
    box.innerHTML = `<div style="position:absolute;inset:0;display:grid;grid-template-rows:330px 1fr;gap:20px"><img src="${lib.img('muscle-cardiac.jpg')}" alt="Cardiac muscle under a microscope" style="width:100%;height:330px;object-fit:cover;border-radius:16px"><div style="min-height:0;display:grid;grid-template-columns:1fr 1fr;align-items:center;gap:10px"><svg viewBox="0 0 300 300" style="width:100%;height:440px"><path id="hb" d="M150 270C60 200 20 150 36 96C52 40 124 40 150 100C176 40 248 40 264 96C280 150 240 200 150 270Z" fill="#FFF" stroke="#17131F" stroke-width="8"/></svg><div id="beatN" class="tab" style="font:800 96px/1 var(--display);opacity:0">100,000</div></div></div>`;
    const heart = box.querySelector('#hb'), n = box.querySelector('#beatN'), v = { v: 0 };
    gsap.to(heart, { scale: 1.14, transformOrigin: '50% 55%', duration: .38, repeat: -1, yoyo: true, ease: 'sine.inOut' });
    return (i) => {
      if (i === 1) { gsap.to(n, { opacity: 1, duration: .2 }); gsap.to(v, { v: 100000, duration: 2.4, ease: 'power2.out', onUpdate: () => { n.textContent = Math.round(v.v).toLocaleString('en-US'); } }); }
    };
  },

  repair(box, lib) {
    const { gsap } = window;
    const sparks = [240, 430, 620].map((x) => `<circle class="spark" cx="${x}" cy="406" r="46" fill="#FFC400" opacity="0"/>`).join('');
    box.innerHTML = `<svg viewBox="0 0 940 860" style="width:100%;height:100%"><rect id="fibre" x="70" y="316" width="800" height="180" rx="90" fill="#E5635B" stroke="#F5F1E2" stroke-width="6"/>${sparks}</svg>`;
    const fibre = box.querySelector('#fibre'), all = box.querySelectorAll('.spark');
    return (i) => {
      if (i === 0) { lib.sfx.pop(); gsap.to(all, { opacity: 1, duration: .35, stagger: .3, delay: .8, yoyo: true, repeat: 3 }); }
      if (i === 1) { gsap.to(all, { opacity: 0, duration: .3 }); gsap.to(fibre, { scaleY: 1.4, svgOrigin: '470 406', duration: 1.6, delay: .6, ease: 'back.out(1.5)' }); }
    };
  },
});
