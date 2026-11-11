/* Episode file: the script and the running order. Everything spoken is in `say`; the player times the motion to it.
   `speak` overrides how a line is pronounced when the caption reads differently (for example numbers).
   A new lesson is a new file like this one, mostly built from the reusable scene types in app.js. */
(window.EPISODES = window.EPISODES || []).push({
  id: 'skeleton',
  subjectStart: false,
  number: 1,
  title: 'Why Don’t You Collapse?',
  topic: 'The Skeleton',
  series: 'Science · Human skeleton and muscles',
  lessonLabel: 'Lesson 1 of 4',
  blurb: 'A full tour of your skeleton: 206 bones, five jobs, joints, what’s inside a bone, and how breaks heal.',
  hero: 'skeleton.jpg',
  scenes: [
    { id: 'sk-greet', part: 'greet', chapter: 'Intro', type: 'statement', bg: '#1D4ED8', beats: [ { say: 'Hello, and welcome to Science! This is Lesson 1 of a new unit: the human skeleton and muscles.', text: 'Welcome to *Science*' }, { say: 'Today, we’re finding out what your skeleton does, and how your bones keep you standing, moving and alive. You use them every second of the day.', text: 'Today: what your *skeleton* does', hold: 0.4 } ] },
    { id: 'sk-known', part: 'known', chapter: 'Intro', type: 'statement', bg: '#0F766E', beats: [
      { say: 'You already know something about today. Press your fingers on your arm, or on your knee.', text: 'Press on your *arm*' },
      { say: 'Feel something hard under the skin? Shout it out: what is it?', text: 'What’s the *hard* part?', hold: 3 },
      { say: 'A bone! Even if you’ve never thought about your bones before, that’s fine. You’ve used them all your life.', text: '*Bones.* You use them every day' },
    ] },
    { id: 'sk-unit', part: 'unit', chapter: 'Intro', type: 'statement', bg: '#1D4ED8', beats: [
      { say: 'This is a new unit: the human skeleton and muscles. It has four lessons.', text: 'New unit: *skeleton and muscles*' },
      { say: 'First your bones, then your muscles, then how they work together to move you.', text: 'Bones, muscles, *movement*' },
    ] },
    { id: 'hook', part: 'hook', chapter: 'Intro', type: 'art', art: 'collapse', layout: 'full', bg: '#17131F', poster: 'skeleton.jpg', beats: [
      { say: 'Right now, something is holding you up.' },
      { say: 'It’s hard. It’s alive. And you have never seen yours.' },
      { say: 'Take it away, and this happens.', hold: 0.6 },
      { say: 'You would be a puddle on the floor.', hold: 0.4 },
    ] },
    { id: 'title', part: 'title', chapter: 'Intro', type: 'title', eyebrow: 'Science · Lesson 1 of 4', title: 'Why Don’t You *Collapse?*', img: 'skeleton.jpg', bg: '#FFC400', fg: '#17131F', beats: [
      { say: 'This is the story of your skeleton.', hold: 0.8 },
    ] },
    { id: 'sk-today', part: 'today', chapter: 'Intro', type: 'recap', bg: '#0F766E', heading: 'Today, you’ll be able to', items: ['Say how many bones you have', 'Name five jobs your bones do', 'Explain how a broken bone heals'], beats: [
      { say: 'Today, you’ll be able to say how many bones you have, name five jobs your bones do, and explain how a broken bone heals.' },
      { say: 'Why does it matter? Every time you stand, run or fall over, your skeleton is working for you.', hold: 0.4 },
    ] },

    { id: 'ch1', chapter: '206 bones', type: 'chapter', n: 1, title: '206 bones', bg: '#D42A20', poster: 'plate-front.jpg', beats: [
      { say: 'Chapter one. Two hundred and six bones.' },
    ] },
    { id: 'count', chapter: '206 bones', type: 'number', bg: '#17131F', img: 'skeleton.jpg', beats: [
      { say: 'An adult skeleton has 206 bones.', speak: 'An adult skeleton has two hundred and six bones.', from: 0, to: 206, sub: 'bones in an adult' },
      { say: 'But you didn’t start with that number.' , sub: 'but you didn’t start there' },
      { say: 'A newborn baby has around 300.', speak: 'A newborn baby has around three hundred.', from: 206, to: 300, sub: 'bones in a newborn, about' },
    ] },
    { id: 'fuse', chapter: '206 bones', type: 'art', art: 'fuse', layout: 'full', bg: '#17131F', beats: [
      { say: 'Many of those bones start out soft and separate.' },
      { say: 'As you grow, they join together, like puzzle pieces becoming one.' },
      { say: 'It’s happening inside you right now. Your skeleton usually isn’t finished until your twenties.' },
    ] },
    { id: 'guess-hands', chapter: '206 bones', type: 'guess', bg: '#1D4ED8', question: 'Where are more than half of all your bones?',
      options: ['Your head', 'Your spine', 'Your hands and feet', 'Your ribs'], answer: 2, img: 'hand-xray.jpg', imgCaption: 'X-ray of a hand', beats: [
      { say: 'Quick question. Where are more than half of all your bones?', step: 'ask' },
      { say: 'Shout your answer now!', step: 'count', hold: 5 },
      { say: 'Your hands and feet! 106 of your bones are right there.', speak: 'Your hands and feet! One hundred and six of your bones are right there.', step: 'reveal' },
      { say: 'That’s why your fingers can tie a knot, play piano, or type a message.', step: 'image', hold: 0.5 },
    ] },

    { id: 'ch2', chapter: 'Five jobs', type: 'chapter', n: 2, title: 'Five jobs your bones do', bg: '#0F766E', poster: 'skeleton.jpg', beats: [
      { say: 'Chapter two. Your bones have five jobs, and they never take a break.' },
    ] },
    { id: 'job-support', chapter: 'Five jobs', type: 'art', art: 'tent', layout: 'job', job: 1, word: 'Support', bg: '#FFC400', fg: '#17131F', beats: [
      { say: 'Job one. Support.', text: 'Holds you up' },
      { say: 'A tent without poles is just a pile of cloth. Your skeleton is your poles.', text: 'Like poles inside a tent' },
    ] },
    { id: 'job-protect', chapter: 'Five jobs', type: 'art', art: 'guard', layout: 'job', job: 2, word: 'Protect', bg: '#17131F', beats: [
      { say: 'Job two. Protect.', text: 'Armor for soft parts' },
      { say: 'Your skull guards your brain.', text: 'Skull guards your brain' },
      { say: 'And your ribs make a cage around your heart and lungs.', text: 'Ribs guard your heart and lungs' },
    ] },
    { id: 'job-move', chapter: 'Five jobs', type: 'art', art: 'arm', layout: 'job', job: 3, word: 'Move', bg: '#D42A20', beats: [
      { say: 'Job three. Move.', text: 'Bones are levers' },
      { say: 'Muscles can only pull. When a muscle pulls on a bone, the bone swings like a lever, and you lift the weight.', text: 'Muscles pull. Bones swing.' },
    ] },
    { id: 'job-make', chapter: 'Five jobs', type: 'art', art: 'marrow', layout: 'job', job: 4, word: 'Make', bg: '#7E22CE', beats: [
      { say: 'Job four. Make.', text: 'A blood cell factory' },
      { say: 'Soft marrow inside your bones makes blood cells. About two million new red blood cells, every single second.', text: 'About 2 million red cells a second' },
    ] },
    { id: 'job-store', chapter: 'Five jobs', type: 'art', art: 'bank', layout: 'job', job: 5, word: 'Store', bg: '#0F766E', beats: [
      { say: 'Job five. Store.', text: 'A mineral bank' },
      { say: 'Bones are a bank for calcium. Almost all the calcium in your body is kept here, ready to be sent out when you need it.', text: 'Calcium goes in and comes out' },
    ] },
    { id: 'jobs-recap', chapter: 'Five jobs', type: 'recap', bg: '#17131F', heading: 'Five jobs', items: ['Support', 'Protect', 'Move', 'Make', 'Store'], beats: [
      { say: 'Support. Protect. Move. Make. Store. Say them with me, one more time.', hold: 1 },
    ] },

    { id: 'ch3', chapter: 'Meet your bones', type: 'chapter', n: 3, title: 'Meet your bones', bg: '#1D4ED8', poster: 'hand-xray.jpg', hasVideo: true, beats: [
      { say: 'Chapter three. Let’s meet your bones.' },
    ] },
    { id: 'video-1', use: 'support', status: 'candidate', chapter: 'Meet your bones', type: 'video', bg: '#FFC400', fg: '#17131F', youtube: 'vRuh9aBwUdM', videoTitle: 'Your Super Skeleton!', channel: 'SciShow Kids',
      watchFor: 'What does your skeleton do for you?', still: 'skeleton.jpg', beats: [
      { say: 'Before we open the atlas, here’s a quick tour of your skeleton. Watch for one thing. What does it do for you?' },
    ] },
    { id: 'sk-after-video-1', afterVideo: true, chapter: 'Meet your bones', type: 'statement', bg: '#0F766E', beats: [
      { say: 'So your skeleton holds you up, keeps you safe, and helps you move.', text: 'Up, safe, *moving*' },
    ] },
    { id: 'atlas', chapter: 'Meet your bones', type: 'atlas', bg: '#F5F4FA', img: 'plate-front.jpg', plate: 'Plate I · The human skeleton, front view', beats: [
      { say: 'At the top is your skull. Twenty-two bones, but only your jaw moves.', mark: [46, 12], zoom: 2.3, name: 'Skull', fact: '22 bones, and only the jaw moves', count: '22' },
      { say: 'Next, twenty-four ribs curve around your chest like a cage.', mark: [46, 27], zoom: 2, name: 'Ribs', fact: '12 pairs protect your heart and lungs', count: '24' },
      { say: 'Down the middle is your spine. A stack of twenty-six bones that lets you bend and twist.', mark: [46, 37], zoom: 2.2, name: 'Spine', fact: 'A flexible stack that also guards your spinal cord', count: '26' },
      { say: 'The pelvis is a strong bowl. It joins your spine to your legs.', mark: [46, 44], zoom: 2.2, name: 'Pelvis', fact: 'Carries your upper body’s weight to your legs' },
      { say: 'Your arm has the humerus up top, then the radius and ulna below.', mark: [28, 39], zoom: 1.9, name: 'Arm', fact: 'Humerus above the elbow. Radius and ulna below.', count: '3' },
      { say: 'Each hand packs in twenty-seven bones.', mark: [22.5, 53], zoom: 3, name: 'Hand', fact: 'Small bones, huge control', count: '27' },
      { say: 'And down here is your kneecap, with the tibia and fibula running to your foot.', mark: [41, 72], zoom: 1.8, name: 'Lower leg', fact: 'Kneecap, then tibia and fibula. Each foot has 26 bones.' },
    ] },
    { id: 'records', chapter: 'Meet your bones', type: 'art', art: 'records', layout: 'full', bg: '#17131F', beats: [
      { say: 'Now for the record holders. The longest bone is the femur, your thigh bone. It’s about a quarter of your height.', text: 'Longest: the *femur*' },
      { say: 'Here’s the smallest, drawn at the same scale. Can you even see it?', text: 'Smallest: at the same scale' },
      { say: 'It’s the stapes, deep inside your ear. About three millimeters long, smaller than a grain of rice.', text: 'The *stapes*, about 3 mm' },
    ] },

    { id: 'ch4', chapter: 'Joints', type: 'chapter', n: 4, title: 'Bones can’t bend. You can.', bg: '#D42A20', poster: 'knee-chapter.jpg', beats: [
      { say: 'Chapter four. Bones can’t bend. So how do you?' },
    ] },
    { id: 'joint-hinge', chapter: 'Joints', type: 'art', art: 'hinge', layout: 'job', flip: true, word: 'Hinge', eyebrow: 'Joint type 1', bg: '#17131F', beats: [
      { say: 'The answer is joints, the places where bones meet. A hinge joint opens and closes like a door.', text: 'Opens and closes' },
      { say: 'Your elbows and knees work like this.', text: 'Elbow and knee' },
    ] },
    { id: 'joint-ball', chapter: 'Joints', type: 'art', art: 'ball', layout: 'job', flip: true, word: 'Ball and socket', eyebrow: 'Joint type 2', bg: '#1D4ED8', beats: [
      { say: 'A ball and socket joint swings in almost any direction.', text: 'Shoulder and hip' },
      { say: 'Try it. Stand up and make big circles with your arm.', text: 'Try it now!', hold: 4 },
    ] },
    { id: 'joint-fixed', chapter: 'Joints', type: 'art', art: 'suture', layout: 'job', flip: true, word: 'Fixed', eyebrow: 'Joint type 3', bg: '#0F766E', beats: [
      { say: 'Some joints don’t move at all. The plates of your skull lock together like a jigsaw.', text: 'Locked like a jigsaw' },
    ] },
    { id: 'joint-cushion', chapter: 'Joints', type: 'art', art: 'cushion', layout: 'job', flip: true, word: 'No grinding', eyebrow: 'Why joints stay smooth', bg: '#7E22CE', beats: [
      { say: 'And why don’t your moving joints grind? Smooth cartilage and slippery fluid keep the bones gliding.', text: 'Cartilage and slippery fluid' },
    ] },

    { id: 'ch5', chapter: 'Inside a bone', type: 'chapter', n: 5, title: 'Your bones are alive', bg: '#7E22CE', poster: 'bone-1900.jpg', beats: [
      { say: 'Chapter five. Here’s what most people get wrong.' },
    ] },
    { id: 'myth', chapter: 'Inside a bone', type: 'photo', bg: '#0C0A10', img: 'bone-1900.jpg', beats: [
      { say: 'In a museum, a bone looks dead, dry and hard, like a rock.', text: 'Dead? Dry? Like a rock?', focus: [45, 45, 1.15], gray: true },
      { say: 'But the bones inside you are alive. They have blood vessels, nerves, and living cells.', text: 'Your bones are *alive*', focus: [35, 40, 1.4], warm: true },
    ] },
    { id: 'slice', chapter: 'Inside a bone', type: 'art', art: 'slice', layout: 'full', bg: '#17131F', beats: [
      { say: 'Let’s slice one open.', text: 'Inside a long bone' },
      { say: 'The hard outer shell is compact bone.', text: 'Compact bone: the hard shell' },
      { say: 'Inside the ends is spongy bone, full of tiny spaces like a honeycomb. That keeps bones strong, but light.', text: 'Spongy bone: strong but light' },
      { say: 'Marrow fills the spaces. That’s your blood cell factory.', text: 'Marrow: the factory' },
    ] },
    { id: 'rebuild', chapter: 'Inside a bone', type: 'statement', bg: '#D42A20', beats: [
      { say: 'Your body is always taking old bone apart and building new bone.', text: 'Always *rebuilding*' },
      { say: 'Over about ten years, nearly your whole skeleton gets replaced.', text: 'About *10 years* for a whole new skeleton' },
    ] },

    { id: 'ch-heal', chapter: 'When bones break', type: 'chapter', n: 6, title: 'When a bone breaks', bg: '#D42A20', poster: 'femur-plate.png', hasVideo: true, beats: [
      { say: 'Chapter six. What happens when a bone breaks?' },
    ] },
    { id: 'video-2', use: 'support', status: 'candidate', chapter: 'When bones break', type: 'video', bg: '#17131F', youtube: 'gVXoAbeB8QI', videoTitle: 'What happens when you break a bone?', channel: 'TED-Ed',
      watchFor: 'What are the four stages of healing?', still: 'femur-plate.png', beats: [
      { say: 'TED-Ed shows it brilliantly. Watch for the four stages of healing.' },
    ] },
    { id: 'sk-after-video-2', afterVideo: true, chapter: 'When bones break', type: 'statement', bg: '#0F766E', beats: [
      { say: 'So a broken bone can mend itself, if it’s held still while it heals.', text: 'Bones can *mend*' },
    ] },
    { id: 'heal', chapter: 'When bones break', type: 'art', art: 'heal', layout: 'job', flip: true, word: 'Four stages', eyebrow: 'How a break heals', bg: '#17131F', beats: [
      { say: 'Let’s check. Stage one. Blood clots around the break.', text: '1. Blood clot' },
      { say: 'Stage two. Soft cartilage builds a bridge across the gap.', text: '2. Soft bridge' },
      { say: 'Stage three. Hard new bone replaces the bridge.', text: '3. Hard new bone' },
      { say: 'Stage four. Over months, your body reshapes it until it’s smooth.', text: '4. Reshaped' },
    ] },

    { id: 'ch7', chapter: 'Keep them strong', type: 'chapter', n: 7, title: 'Build yours now', bg: '#0F766E', poster: 'skeleton.jpg', beats: [
      { say: 'Chapter seven. This part is about you.' },
    ] },
    { id: 'strong', chapter: 'Keep them strong', type: 'cards', bg: '#FFC400', fg: '#17131F', heading: 'Three ways to build stronger bones', cards: [
      { title: 'Jump and run', text: 'Bones grow stronger when they carry your weight', icon: 'jump' },
      { title: 'Eat calcium', text: 'Milk, yogurt, beans and leafy greens', icon: 'milk' },
      { title: 'Get vitamin D', text: 'Sunlight and food help you use calcium', icon: 'sun' },
    ], footer: 'Most of your bone is built by about age 20', beats: [
      { say: 'One. Jump, run and climb. Bones grow stronger when they carry your weight.', card: 0 },
      { say: 'Two. Eat foods with calcium, like milk, yogurt, beans and leafy greens.', card: 1 },
      { say: 'Three. Get vitamin D, from sunlight and food. It helps your body use that calcium.', card: 2 },
      { say: 'Most of the bone you will ever have gets built by about age twenty. So now is the time.', footer: true },
    ] },
    { id: 'try', chapter: 'Keep them strong', type: 'art', art: 'vinegar', layout: 'job', word: 'Try it at home', eyebrow: 'The bendy bone', bg: '#17131F', beats: [
      { say: 'Want to see what calcium does? With an adult’s help, clean a cooked chicken bone and put it in a jar of vinegar.', text: 'Bone + vinegar' },
      { say: 'Wait about five days.', text: 'Wait about 5 days', hold: 0.5 },
      { say: 'Now rinse it and bend it. The vinegar dissolved the calcium, so what’s left is rubbery. Wash your hands when you’re done.', text: 'No calcium, no stiffness' },
    ] },

    { id: 'bonus', chapter: 'Bonus: other animals', type: 'chapter', label: 'Bonus chapter', bonus: true, title: 'Same plan, different animal', bg: '#1D4ED8', poster: 'whale.jpg', posterPos: '50% 62%', beats: [
      { say: 'Bonus chapter. Whales and giraffes are built on the same plan as you.' },
    ] },
    { id: 'whale', chapter: 'Bonus: other animals', type: 'photo', bg: '#17131F', img: 'whale.jpg', beats: [
      { say: 'This is a real blue whale skeleton, more than twenty-five meters long.', text: 'Blue whale: over 25 meters', focus: [50, 50, 1.05] },
      { say: 'Those giant bones at the front are its jaws.', text: 'Its *jaws*', focus: [28, 53, 1.5] },
      { say: 'And that fan-shaped bone behind them is a shoulder blade. You have two of those yourself.', text: 'A *shoulder blade*, like yours', focus: [53, 38, 2.4] },
      { say: 'Its flippers even hide arm bones and finger bones, the same basic plan as your hand.', text: 'Flippers hide *finger bones*', focus: [55, 40, 2.2] },
    ] },
    { id: 'guess-giraffe', chapter: 'Bonus: other animals', type: 'guess', bg: '#D42A20', question: 'How many neck bones does a giraffe have?', options: ['7', '20', '50', '100'], answer: 0, img: 'giraffe.jpg', imgCaption: 'Giraffe skeleton', beats: [
      { say: 'So how many neck bones does a giraffe have?', step: 'ask' },
      { say: 'Shout it out!', step: 'count', hold: 4 },
      { say: 'Seven! Exactly the same as you. Its neck bones are just much, much longer.', step: 'reveal' },
      { say: 'Different animal. Same plan.', step: 'image', hold: 0.5 },
    ] },

    { id: 'sk-answer', part: 'answer', chapter: 'What we learned', type: 'statement', bg: '#D42A20', beats: [
      { say: 'Remember the start? Something hard and alive is holding you up right now. It’s your skeleton: 206 living bones.', speak: 'Remember the start? Something hard and alive is holding you up right now. It’s your skeleton: two hundred and six living bones.', text: 'Your skeleton holds you *up*' },
    ] },
    { id: 'recap', part: 'summary', chapter: 'What we learned', type: 'recap', bg: '#D42A20', heading: 'What we learned', items: ['206 bones', '5 jobs', 'Joints let you move', 'Bones are alive', 'Breaks can heal'], beats: [
      { say: 'Let’s lock it in. 206 bones. Five jobs. Joints let you move. Bones are alive. And breaks can heal.', speak: 'Let’s lock it in. Two hundred and six bones. Five jobs. Joints let you move. Bones are alive. And breaks can heal.' },
    ] },
    { id: 'sk-next', part: 'next', chapter: 'What we learned', type: 'statement', bg: '#7E22CE', beats: [
      { say: 'Next lesson: muscles. Your bones can’t move on their own. So what moves them?', text: 'Next time: *muscles*', hold: 0.4 },
      { say: 'But first, take the test.', text: 'Now, *the test*', hold: 0.4 },
    ] },
  ],
  starter: [
    { type: 'radio', q: 'Do humans have a skeleton inside or outside the body?', o: ['Inside', 'Outside', 'Both'], a: 0, why: 'Your skeleton is inside your body.' },
    { type: 'checkbox', q: 'Which of these can move your bones?', o: ['Muscles', 'Skin', 'Hair'], a: [0], why: 'Muscles pull on bones to move them.' },
    { type: 'radio', q: 'Which part of your body protects your brain?', o: ['Ribs', 'Skull', 'Spine'], a: 1, why: 'Your skull surrounds your brain.' },
  ],
  test: [
    { type: 'radio', img: 'skeleton.jpg', q: 'How many bones does an adult have?', o: ['106', '206', '270', '300'], a: 1, why: 'Adults have 206. Babies start with about 300.' },
    { type: 'tap', q: 'Tap the longest bone in your body.', a: 'femur', why: 'The femur is your thigh bone.' },
    { type: 'checkbox', img: 'plate-front.jpg', q: 'Tick all the jobs your bones do.', o: ['Support your body', 'Digest food', 'Make blood cells', 'Protect organs', 'Pump blood', 'Store calcium'], a: [0, 2, 3, 5], why: 'Support, protect, move, make and store are the five jobs.' },
    { type: 'select', img: 'skeleton.jpg', q: 'Choose the right words.', text: 'Your {0} protects your brain, and your {1} protect your heart and lungs.', choices: [['skull', 'pelvis', 'femur'], ['ribs', 'fingers', 'toes']], a: ['skull', 'ribs'], why: 'The skull guards the brain. Ribs make a cage around the heart and lungs.' },
    { type: 'match', img: 'knee-xray.jpg', q: 'Match each joint to an example.', pairs: [['Hinge', 'Elbow'], ['Ball and socket', 'Shoulder'], ['Fixed', 'Plates of the skull']], why: 'Hinges open and close, ball joints swing, and fixed joints don’t move.' },
    { type: 'truefalse', img: 'bone-1900.jpg', q: 'True or false?', rows: [['Babies have more bones than adults.', true], ['Living bones are dead and dry.', false], ['Bones can repair themselves.', true]], why: 'Bones are alive. Many of a baby’s bones join together as they grow.' },
    { type: 'label', q: 'Drag each name to the correct letter.', pins: { A: 'skull', B: 'ribs', C: 'pelvis', D: 'femur' }, bank: ['Skull', 'Ribs', 'Pelvis', 'Femur'], a: { A: 'Skull', B: 'Ribs', C: 'Pelvis', D: 'Femur' }, why: 'Top to bottom: skull, ribs, pelvis, femur.' },
    { type: 'word', img: 'bone-1900.jpg', q: 'Which soft tissue inside bones makes blood cells?', a: ['marrow', 'bone marrow', 'red marrow', 'red bone marrow'], placeholder: 'Type one word', why: 'Bone marrow is the blood cell factory.' },
    { type: 'order', q: 'Put the stages of healing in order.', items: ['Blood clot forms', 'Soft cartilage bridge forms', 'Hard new bone forms', 'Bone is reshaped'], why: 'Clot, soft bridge, hard bone, then reshaping.' },
    { type: 'slider', ruler: true, q: 'About how long is the stapes, your smallest bone? Set it on the ruler.', min: 1, max: 20, step: 1, unit: 'mm', a: 3, tol: 1, why: 'It’s about 3 mm, smaller than a grain of rice.' },
    { type: 'radio', img: 'femur-plate.png', q: 'A bone goes bendy in vinegar because it loses…', o: ['Water', 'Calcium', 'Marrow', 'Blood'], a: 1, why: 'Vinegar dissolves calcium, which makes bones stiff.' },
    { type: 'number', img: 'hand-xray.jpg', q: 'Each hand has 27 bones and each foot has 26. How many in both hands and both feet?', a: 106, why: '27 + 27 + 26 + 26 = 106.' },
  ],
  credits: {
    videos: [
      { title: 'Your Super Skeleton!', by: 'SciShow Kids', url: 'https://www.youtube.com/watch?v=vRuh9aBwUdM' },
      { title: 'What happens when you break a bone?', by: 'TED-Ed', url: 'https://www.youtube.com/watch?v=gVXoAbeB8QI' },
    ],
    deeper: [
      { youtube: 'i42FSNA9bAY', title: 'How Your Bones and Skeleton Works', by: 'Nemours KidsHealth', note: 'Short overview' },
      { youtube: 'rDGqkMHPDqE', title: 'The Skeletal System', by: 'CrashCourse', note: 'For older students' },
    ],
  },
});

/* Custom animations used by `art` scenes in this episode. Each draws into `box` and returns a function called once per spoken line. */
window.ART = Object.assign(window.ART || {}, {
  collapse(box, lib) {
    const { gsap } = window;
    box.innerHTML = `<div class="headline" style="left:96px;top:96px"></div>
      <div id="fig" style="position:absolute;left:660px;top:50px;width:600px;height:860px">
        <svg id="body" viewBox="0 0 240 645" style="position:absolute;inset:0;width:100%;height:100%;overflow:visible">${lib.bodyShape('#E5352B')}</svg>
        <div id="bones" style="position:absolute;inset:0;clip-path:inset(0 0 100% 0)">${lib.skeleton(['all'])}</div>
        <div id="scan" style="position:absolute;left:-90px;right:-90px;height:12px;top:0;background:#FFC400;box-shadow:0 0 50px 14px #FFC400;border-radius:9px;opacity:0"></div>
      </div>
      <div id="word" class="mega" style="position:absolute;left:0;right:0;top:330px;text-align:center;color:#FFC400;opacity:0">PUDDLE.</div>`;
    const body = box.querySelector('#body'), bones = box.querySelector('#bones'), scan = box.querySelector('#scan'), word = box.querySelector('#word');
    gsap.from(body, { opacity: 0, scale: .92, duration: .8, ease: 'power3.out' });
    return (i) => {
      if (i === 1) {
        lib.sfx.whoosh();
        gsap.set(scan, { opacity: 1 });
        gsap.to(scan, { top: 860, duration: 2.4, ease: 'none', onComplete: () => gsap.to(scan, { opacity: 0, duration: .2 }) });
        gsap.to(bones, { clipPath: 'inset(0 0 0% 0)', duration: 2.4, ease: 'none' });
      }
      if (i === 2) {
        gsap.set(bones, { clipPath: 'inset(0 0 0% 0)' });
        gsap.to(bones, { y: -900, rotation: 18, duration: .9, ease: 'power3.in', onComplete: () => lib.sfx.pop() });
        gsap.to(body, { scaleY: .07, scaleX: 1.9, transformOrigin: '50% 100%', duration: 1, ease: 'bounce.out', delay: .9 });
      }
      if (i === 3) {
        lib.sfx.splat();
        gsap.fromTo(word, { opacity: 0, scale: 2.2 }, { opacity: 1, scale: 1, duration: .55, ease: 'back.out(2)' });
      }
    };
  },

  fuse(box, lib) {
    const { gsap } = window;
    const cols = 25, rows = 12, W = 1040, H = 500;
    let dots = '';
    for (let n = 0; n < cols * rows; n++) {
      const x = 20 + (n % cols) * (W / cols), y = 20 + Math.floor(n / cols) * (H / rows);
      dots += `<circle class="d" cx="${x}" cy="${y}" r="13" fill="#F5F1E2"/>`;
    }
    box.innerHTML = `<div style="position:absolute;left:96px;top:190px;width:560px"><div id="n" class="mega tab" style="color:#FFC400">300</div><div class="sub" id="lbl">bones in a newborn</div></div>
      <svg viewBox="0 0 ${W} ${H + 20}" style="position:absolute;left:720px;top:190px;width:1090px;height:560px">${dots}</svg>`;
    const all = [...box.querySelectorAll('.d')];
    const state = { v: 300 }, n = box.querySelector('#n');
    gsap.from(all, { scale: 0, transformOrigin: '50% 50%', duration: .4, stagger: { amount: 1.2, from: 'random' }, ease: 'back.out(2)' });
    return (i) => {
      if (i === 1) {
        lib.sfx.whoosh();
        const merging = all.filter((_, k) => k % 16 === 3 || k % 7 === 2).slice(0, 94);
        merging.forEach((d) => {
          const k = all.indexOf(d), target = all[k % cols === 0 ? k + 1 : k - 1];
          gsap.to(d, { attr: { cx: target.getAttribute('cx'), cy: target.getAttribute('cy') }, duration: 1, delay: Math.random() * 2.4, ease: 'power2.in', onComplete: () => { d.style.display = 'none'; gsap.fromTo(target, { attr: { r: 18 } }, { attr: { r: 15 }, duration: .3 }); target.setAttribute('fill', '#FFC400'); } });
        });
        gsap.to(state, { v: 206, duration: 3.2, ease: 'none', onUpdate: () => { n.textContent = Math.round(state.v); } });
        box.querySelector('#lbl').textContent = 'bones in an adult';
      }
    };
  },

  tent(box) {
    const { gsap } = window;
    box.innerHTML = `<svg viewBox="0 0 940 860" style="width:100%;height:100%">
      <rect x="40" y="740" width="860" height="14" rx="7" fill="#17131F"/>
      <g id="poles"><rect x="462" y="240" width="16" height="505" rx="8" fill="#17131F"/><rect x="200" y="560" width="12" height="185" rx="6" fill="#17131F"/><rect x="728" y="560" width="12" height="185" rx="6" fill="#17131F"/></g>
      <path id="cloth" d="M70 740 L470 230 L870 740 Z" fill="#D42A20" stroke="#17131F" stroke-width="8" stroke-linejoin="round"/>
      <path id="door" d="M470 430 L380 740 L560 740 Z" fill="#17131F"/></svg>`;
    const cloth = box.querySelector('#cloth'), door = box.querySelector('#door'), poles = box.querySelector('#poles');
    gsap.set([cloth, door], { scaleY: .06, transformOrigin: '50% 740px' });
    gsap.set(poles, { scaleY: 0, transformOrigin: '50% 745px' });
    return (i) => {
      if (i === 1) {
        window.LIB.sfx.pop();
        gsap.to(poles, { scaleY: 1, duration: .9, ease: 'power2.out', delay: 1.8 });
        gsap.to([cloth, door], { scaleY: 1, duration: 1, ease: 'back.out(1.6)', delay: 2 });
      }
    };
  },

  guard(box, lib) {
    const { gsap } = window;
    box.innerHTML = `<div style="position:relative;height:100%;display:flex;justify-content:center;overflow:hidden">
      <svg id="organs" viewBox="0 0 240 340" style="position:absolute;top:0;height:1230px;width:868px;left:16px">
        <ellipse id="brain" cx="120" cy="36" rx="22" ry="20" fill="#FF8FA3" opacity="0"/><path id="heart" d="M120 150c-16-22-40-6-26 14 8 12 20 22 26 30 6-8 18-18 26-30 14-20-10-36-26-14z" fill="#E5352B" opacity="0"/>
      </svg>
      <div style="position:absolute;top:0;width:868px;height:2330px">${lib.skeleton([])}</div>
      <div class="ball" style="position:absolute;width:90px;height:90px;border-radius:50%;background:#FFC400;left:-120px;top:60px"></div></div>`;
    const skull = box.querySelector('[data-bone="skull"]'), ribs = box.querySelectorAll('[data-bone="ribs"]'), ball = box.querySelector('.ball');
    return (i) => {
      if (i === 1) {
        skull.classList.add('hl', 'glass');
        gsap.to(box.querySelector('#brain'), { opacity: 1, duration: .5 });
        gsap.fromTo(ball, { x: 0, y: 0 }, { x: 410, y: 70, duration: .55, ease: 'power1.in', onComplete: () => { lib.sfx.pop(); gsap.to(ball, { x: -60, y: 620, duration: .9, ease: 'power1.in' }); } });
      }
      if (i === 2) {
        ribs.forEach((r) => r.classList.add('hl'));
        gsap.to(box.querySelector('#heart'), { opacity: 1, duration: .4 });
        gsap.to(box.querySelector('#heart'), { scale: 1.14, transformOrigin: '50% 50%', duration: .38, repeat: -1, yoyo: true, ease: 'sine.inOut' });
      }
    };
  },

  arm(box, lib) {
    const { gsap } = window;
    box.innerHTML = `<svg viewBox="0 0 940 860" style="width:100%;height:100%">
      <rect x="60" y="100" width="150" height="660" rx="24" fill="#8F1812"/>
      <g><path d="M120 200 L470 470" stroke="#17131F" stroke-width="62" stroke-linecap="round"/><path d="M120 200 L470 470" stroke="#F5F1E2" stroke-width="50" stroke-linecap="round"/></g>
      <ellipse id="muscle" cx="285" cy="280" rx="130" ry="42" fill="#FFC400" transform="rotate(38 285 280)" stroke="#17131F" stroke-width="6"/>
      <g id="fore"><path d="M470 470 L820 470" stroke="#17131F" stroke-width="52" stroke-linecap="round"/><path d="M470 470 L820 470" stroke="#F5F1E2" stroke-width="40" stroke-linecap="round"/>
        <g transform="translate(850 470)"><rect x="-22" y="-90" width="44" height="180" rx="10" fill="#17131F"/><rect x="-46" y="-110" width="92" height="44" rx="10" fill="#17131F"/><rect x="-46" y="66" width="92" height="44" rx="10" fill="#17131F"/></g></g>
      <circle cx="470" cy="470" r="34" fill="#FFC400" stroke="#17131F" stroke-width="6"/></svg>`;
    const fore = box.querySelector('#fore'), muscle = box.querySelector('#muscle');
    return (i) => {
      if (i === 1) {
        lib.sfx.pop();
        gsap.to(fore, { rotation: -92, svgOrigin: '470 470', duration: 1.3, ease: 'power2.inOut', repeat: -1, yoyo: true, repeatDelay: .4 });
        gsap.to(muscle, { attr: { ry: 68, rx: 104 }, duration: 1.3, ease: 'power2.inOut', repeat: -1, yoyo: true, repeatDelay: .4 });
      }
    };
  },

  marrow(box) {
    const { gsap } = window;
    let cells = '';
    for (let k = 0; k < 44; k++) cells += `<ellipse class="c" cx="470" cy="430" rx="20" ry="15" fill="#FF4D4D" stroke="#7A0F0F" stroke-width="3"/>`;
    box.innerHTML = `<svg viewBox="0 0 940 860" style="width:100%;height:100%">
      <path d="M380 40 C300 40 300 140 380 170 V690 C300 720 300 820 380 820 H560 C640 820 640 720 560 690 V170 C640 140 640 40 560 40 Z" fill="#F5F1E2" stroke="#17131F" stroke-width="8"/>
      <rect x="415" y="150" width="110" height="560" rx="40" fill="#C2283B"/>${cells}</svg>`;
    const cs = [...box.querySelectorAll('.c')];
    gsap.set(cs, { opacity: 0 });
    return (i) => {
      if (i === 1) cs.forEach((c, k) => {
        const angle = Math.random() * Math.PI * 2, r = 330 + Math.random() * 180;
        gsap.fromTo(c, { attr: { cy: 180 + Math.random() * 500 }, x: 0, y: 0, opacity: 1, rotation: 0 },
          { x: Math.cos(angle) * r, y: Math.sin(angle) * r * .8, rotation: 180, opacity: 0, duration: 2 + Math.random(), ease: 'power1.out', repeat: -1, delay: k * .06 });
      });
    };
  },

  bank(box) {
    const { gsap } = window;
    let coins = '';
    for (let k = 0; k < 10; k++) coins += `<g class="coin"><circle cx="470" cy="60" r="44" fill="#FFC400" stroke="#17131F" stroke-width="6"/><text x="470" y="78" text-anchor="middle" font-family="Bricolage Grotesque,Arial" font-weight="800" font-size="46" fill="#17131F">Ca</text></g>`;
    box.innerHTML = `<svg viewBox="0 0 940 860" style="width:100%;height:100%">
      <path d="M320 300 C230 300 230 410 320 430 V760 H620 V430 C710 410 710 300 620 300 C570 300 560 340 470 340 C380 340 370 300 320 300 Z" fill="#F5F1E2" stroke="#17131F" stroke-width="8"/>
      <rect x="400" y="326" width="140" height="18" rx="9" fill="#17131F"/><g id="stack"></g>${coins}</svg>`;
    const cs = [...box.querySelectorAll('.coin')];
    gsap.set(cs, { opacity: 0 });
    return (i) => {
      const tl = gsap.timeline({ repeat: i === 1 ? -1 : 0, repeatDelay: .4 });
      cs.slice(0, i === 0 ? 3 : 10).forEach((c, k) => tl.fromTo(c, { y: -120, opacity: 0 }, { y: 300, opacity: 1, duration: .5, ease: 'power2.in' }, k * .32).to(c, { opacity: 0, duration: .08 }));
    };
  },

  hinge(box) {
    const { gsap } = window;
    box.innerHTML = `<svg viewBox="0 0 940 860" style="width:100%;height:100%">
      <rect x="60" y="170" width="24" height="520" fill="#F5F1E2"/><g id="door"><rect x="84" y="180" width="300" height="500" rx="8" fill="#D42A20" stroke="#F5F1E2" stroke-width="6"/><circle cx="340" cy="430" r="14" fill="#FFC400"/></g>
      <path d="M520 240 L700 450" stroke="#F5F1E2" stroke-width="52" stroke-linecap="round"/>
      <g id="lower"><path d="M700 450 L880 660" stroke="#F5F1E2" stroke-width="42" stroke-linecap="round"/></g><circle cx="700" cy="450" r="36" fill="#FFC400"/></svg>`;
    return () => {
      gsap.killTweensOf(box.querySelector('#door'));
      gsap.to(box.querySelector('#door'), { scaleX: .2, svgOrigin: '84 430', duration: 1.1, ease: 'sine.inOut', repeat: -1, yoyo: true });
      gsap.to(box.querySelector('#lower'), { rotation: -100, svgOrigin: '700 450', duration: 1.1, ease: 'sine.inOut', repeat: -1, yoyo: true });
    };
  },

  ball(box) {
    const { gsap } = window;
    box.innerHTML = `<svg viewBox="0 0 940 860" style="width:100%;height:100%">
      <circle cx="470" cy="430" r="350" fill="none" stroke="#7D9AF0" stroke-width="4" stroke-dasharray="6 18"/>
      <g id="limb"><path d="M470 430 L470 90" stroke="#F5F1E2" stroke-width="56" stroke-linecap="round"/></g>
      <path d="M340 430 A130 130 0 0 0 600 430 L560 430 A90 90 0 0 1 380 430 Z" transform="rotate(30 470 430)" fill="#FFC400" stroke="#17131F" stroke-width="6"/>
      <circle cx="470" cy="430" r="86" fill="#F5F1E2" stroke="#17131F" stroke-width="6"/></svg>`;
    return (i) => {
      if (i === 0) gsap.to(box.querySelector('#limb'), { rotation: 360, svgOrigin: '470 430', duration: 3.2, ease: 'none', repeat: -1 });
    };
  },

  suture(box) {
    const { gsap } = window;
    box.innerHTML = `<svg viewBox="0 0 940 860" style="width:100%;height:100%">
      <path d="M470 60 C230 60 130 240 150 440 C160 540 220 600 270 620 L300 780 H640 L670 620 C720 600 780 540 790 440 C810 240 710 60 470 60 Z" fill="#F5F1E2" stroke="#17131F" stroke-width="8"/>
      <ellipse cx="350" cy="520" rx="60" ry="56" fill="#17131F"/><ellipse cx="590" cy="520" rx="60" ry="56" fill="#17131F"/>
      <path class="z" d="M160 340 l40 -26 l34 34 l42 -36 l36 34 l42 -36 l40 34 l44 -34 l36 34 l42 -36 l40 34 l44 -36 l36 34 l42 -28" fill="none" stroke="#D42A20" stroke-width="10" stroke-linejoin="round"/>
      <path class="z" d="M470 62 l-26 40 l36 36 l-34 42 l34 38 l-34 42 l28 42" fill="none" stroke="#D42A20" stroke-width="10" stroke-linejoin="round"/></svg>`;
    const zs = box.querySelectorAll('.z');
    zs.forEach((z) => { const l = z.getTotalLength(); z.style.strokeDasharray = l; z.style.strokeDashoffset = l; });
    return () => gsap.to(zs, { strokeDashoffset: 0, duration: 2.4, ease: 'none', stagger: .4 });
  },

  cushion(box) {
    const { gsap } = window;
    let drops = '';
    for (let k = 0; k < 14; k++) drops += `<circle class="f" cx="${260 + k * 32}" cy="${430 + (k % 3) * 14 - 14}" r="9" fill="#8FE3FF"/>`;
    box.innerHTML = `<svg viewBox="0 0 940 860" style="width:100%;height:100%">
      <g id="top"><path d="M300 40 H640 V210 C700 290 640 390 470 390 C300 390 240 290 300 210 Z" fill="#F5F1E2" stroke="#17131F" stroke-width="8"/><path d="M262 300 C300 400 640 400 678 300 C650 390 560 402 470 402 C380 402 290 390 262 300Z" fill="#5CC8FF"/></g>
      ${drops}
      <path d="M300 820 H640 V650 C700 570 640 470 470 470 C300 470 240 570 300 650 Z" fill="#F5F1E2" stroke="#17131F" stroke-width="8"/><path d="M262 560 C300 460 640 460 678 560 C650 470 560 458 470 458 C380 458 290 470 262 560Z" fill="#5CC8FF"/></svg>`;
    return () => {
      gsap.to(box.querySelector('#top'), { rotation: 9, svgOrigin: '470 430', duration: 1.2, ease: 'sine.inOut', repeat: -1, yoyo: true });
      gsap.to(box.querySelectorAll('.f'), { x: 'random(-40,40)', y: 'random(-10,10)', duration: 1.2, ease: 'sine.inOut', repeat: -1, yoyo: true, stagger: .05 });
    };
  },

  records(box, lib) {
    const { gsap } = window;
    box.innerHTML = `<div class="headline" style="left:96px;top:104px;width:1180px"></div>
      <img src="${lib.img('femur-plate.png')}" alt="Engraving of a femur" style="position:absolute;right:220px;top:60px;height:820px;background:#F5F4FA;border-radius:16px;padding:12px">
      <div id="tiny" style="position:absolute;left:300px;top:640px;width:6px;height:5px;background:#FFC400;border-radius:50%;opacity:0"></div>
      <div id="ring" style="position:absolute;left:210px;top:550px;width:186px;height:186px;border:6px solid #FFC400;border-radius:50%;opacity:0"></div>
      <svg id="mag" viewBox="0 0 400 300" style="position:absolute;left:96px;top:330px;width:700px;height:525px;opacity:0">
        <ellipse cx="280" cy="150" rx="100" ry="46" fill="#F5F1E2" transform="rotate(-20 280 150)"/>
        <path d="M70 60 h70 v26 h-16 l26 110 h-90 l26 -110 h-16 z" fill="none" stroke="#FFC400" stroke-width="12" stroke-linejoin="round"/><rect x="50" y="196" width="110" height="20" rx="8" fill="#FFC400"/>
      </svg><p id="magLabel" class="sub" style="position:absolute;left:96px;top:800px;opacity:0">Stapes (yellow) next to a grain of rice, both magnified</p>`;
    return (i) => {
      if (i === 0) gsap.from(box.querySelector('img'), { y: 900, duration: 1, ease: 'power3.out' });
      if (i === 1) { lib.sfx.pop(); gsap.to(box.querySelector('#tiny'), { opacity: 1, duration: .1 }); gsap.fromTo(box.querySelector('#ring'), { scale: 2.4, opacity: 0 }, { scale: 1, opacity: 1, duration: .7, ease: 'back.out(1.6)' }); }
      if (i === 2) {
        gsap.to([box.querySelector('#ring'), box.querySelector('#tiny')], { opacity: 0, duration: .3 });
        gsap.fromTo(box.querySelector('#mag'), { scale: .05, opacity: 0, transformOrigin: '30% 80%' }, { scale: 1, opacity: 1, duration: .9, ease: 'power3.out' });
        gsap.to(box.querySelector('#magLabel'), { opacity: 1, duration: .4, delay: .5 });
      }
    };
  },

  slice(box, lib) {
    const { gsap } = window;
    const bone = 'M240 180 C120 120 60 240 170 300 C70 340 110 470 240 420 H1250 C1380 470 1420 340 1320 300 C1430 240 1370 120 1250 180 Z';
    box.innerHTML = `<div class="headline" style="left:96px;top:104px"></div>
      <svg viewBox="0 0 1490 600" style="position:absolute;left:215px;top:220px;width:1490px;height:600px;overflow:visible">
        <defs><pattern id="honey" width="34" height="30" patternUnits="userSpaceOnUse"><path d="M0 15 L9 0 H25 L34 15 L25 30 H9 Z" fill="#E8C98F" stroke="#A87A3C" stroke-width="3"/></pattern><clipPath id="boneClip"><path d="${bone}"/></clipPath></defs>
        <g id="inside" clip-path="url(#boneClip)"><rect width="1490" height="600" fill="#F5F1E2"/>
          <rect id="sp1" x="60" y="110" width="310" height="370" fill="url(#honey)" opacity="0"/><rect id="sp2" x="1130" y="110" width="310" height="370" fill="url(#honey)" opacity="0"/>
          <rect id="mw" x="340" y="225" width="810" height="150" rx="40" fill="#C2283B" opacity="0"/></g>
        <path d="${bone}" fill="none" stroke="#17131F" stroke-width="6"/>
        <path id="outer" d="${bone}" fill="none" stroke="#FFC400" stroke-width="26" opacity="0"/>
        <path id="cap" d="${bone}" fill="#F5F1E2" stroke="#17131F" stroke-width="6"/>
        <rect id="saw" x="30" y="296" width="0" height="8" fill="#D42A20"/>
      </svg>`;
    const cap = box.querySelector('#cap');
    return (i) => {
      if (i === 0) {
        lib.sfx.whoosh();
        gsap.to(box.querySelector('#saw'), { attr: { width: 1430 }, duration: .9, ease: 'power1.in' });
        gsap.to(cap, { y: -560, opacity: 0, duration: .8, delay: 1, ease: 'power2.in' });
        gsap.to(box.querySelector('#saw'), { opacity: 0, delay: 1, duration: .3 });
      }
      if (i === 1) gsap.fromTo(box.querySelector('#outer'), { opacity: 0 }, { opacity: 1, duration: .5, repeat: 3, yoyo: true, onComplete: () => gsap.set(box.querySelector('#outer'), { opacity: .9 }) });
      if (i === 2) gsap.to(box.querySelectorAll('#sp1,#sp2'), { opacity: 1, duration: .8 });
      if (i === 3) gsap.fromTo(box.querySelector('#mw'), { opacity: 0, attr: { width: 0 } }, { opacity: 1, attr: { width: 810 }, duration: 1, ease: 'power2.out' });
    };
  },

  heal(box) {
    const { gsap } = window;
    box.innerHTML = `<svg viewBox="0 0 940 860" style="width:100%;height:100%">
      <ellipse id="st1" cx="470" cy="430" rx="150" ry="130" fill="#D42A20" opacity="0"/>
      <ellipse id="st2" cx="470" cy="430" rx="165" ry="120" fill="#5CC8FF" opacity="0"/>
      <ellipse id="st3" cx="470" cy="430" rx="175" ry="110" fill="#E8D6A8" stroke="#17131F" stroke-width="6" opacity="0"/>
      <path id="left" d="M40 345 H440 L470 410 L430 515 H40 Z" fill="#F5F1E2" stroke="#17131F" stroke-width="6"/>
      <path id="right" d="M900 345 H500 L530 410 L490 515 H900 Z" fill="#F5F1E2" stroke="#17131F" stroke-width="6"/>
      <rect id="st4" x="40" y="345" width="860" height="170" fill="#F5F1E2" stroke="#17131F" stroke-width="6" opacity="0"/></svg>`;
    return (i) => {
      if (i === 0) gsap.fromTo(box.querySelector('#st1'), { scale: 0, opacity: 1, transformOrigin: '50% 50%' }, { scale: 1, duration: 1, ease: 'back.out(1.5)' });
      if (i === 1) { gsap.to(box.querySelector('#st1'), { opacity: 0, duration: .6 }); gsap.fromTo(box.querySelector('#st2'), { opacity: 0 }, { opacity: 1, duration: .8 }); }
      if (i === 2) { gsap.to(box.querySelector('#st2'), { opacity: 0, duration: .6 }); gsap.fromTo(box.querySelector('#st3'), { opacity: 0 }, { opacity: 1, duration: .8 }); }
      if (i === 3) { gsap.to(box.querySelector('#st3'), { opacity: 0, duration: 1.4 }); gsap.to(box.querySelector('#st4'), { opacity: 1, duration: 1.4 }); gsap.to(box.querySelectorAll('#left,#right'), { opacity: 0, duration: 1.4 }); }
    };
  },

  vinegar(box) {
    const { gsap } = window;
    box.innerHTML = `<svg viewBox="0 0 940 860" style="width:100%;height:100%">
      <g id="jar"><rect x="250" y="120" width="440" height="640" rx="50" fill="#8FE3FF" opacity=".18" stroke="#F5F1E2" stroke-width="8"/><rect x="258" y="290" width="424" height="462" rx="44" fill="#F2C94C" opacity=".45"/><rect x="290" y="70" width="360" height="60" rx="14" fill="#D42A20"/></g>
      <g id="bone"><g id="b1"><path d="M470 300 V520" stroke="#17131F" stroke-width="50" stroke-linecap="round"/><path d="M470 300 V520" stroke="#F5F1E2" stroke-width="38" stroke-linecap="round"/><circle cx="450" cy="285" r="28" fill="#F5F1E2" stroke="#17131F" stroke-width="5"/><circle cx="490" cy="285" r="28" fill="#F5F1E2" stroke="#17131F" stroke-width="5"/></g>
      <g id="b2"><path d="M470 520 V700" stroke="#17131F" stroke-width="50" stroke-linecap="round"/><path d="M470 520 V700" stroke="#F5F1E2" stroke-width="38" stroke-linecap="round"/><circle cx="450" cy="715" r="28" fill="#F5F1E2" stroke="#17131F" stroke-width="5"/><circle cx="490" cy="715" r="28" fill="#F5F1E2" stroke="#17131F" stroke-width="5"/></g></g>
      <text id="day" x="470" y="830" text-anchor="middle" font-family="Bricolage Grotesque,Arial" font-weight="800" font-size="64" fill="#FFC400" opacity="0">Day 1</text></svg>`;
    const day = box.querySelector('#day');
    return (i) => {
      if (i === 0) gsap.from(box.querySelector('#bone'), { y: -520, duration: 1, ease: 'bounce.out', delay: 1.6 });
      if (i === 1) {
        gsap.to(day, { opacity: 1, duration: .2 });
        const s = { d: 1 };
        gsap.to(s, { d: 5, duration: 2, ease: 'none', onUpdate: () => { day.textContent = 'Day ' + Math.round(s.d); } });
      }
      if (i === 2) {
        gsap.to([box.querySelector('#jar'), day], { opacity: 0, duration: .5 });
        gsap.to(box.querySelector('#b2'), { rotation: 62, svgOrigin: '470 520', duration: .9, ease: 'sine.inOut', repeat: -1, yoyo: true, delay: .6 });
        gsap.to(box.querySelector('#b1'), { rotation: -22, svgOrigin: '470 520', duration: .9, ease: 'sine.inOut', repeat: -1, yoyo: true, delay: .6 });
      }
    };
  },
});
