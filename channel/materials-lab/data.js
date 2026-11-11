/* One believable week for every Materials prototype, so the only difference between them is the design.
   `status`: built = in the app today (#print); planned = in docs/product/ACTIVITIES.md, made from our lessons; idea = a wider kind from the research, not made yet.
   Children: ?kids=1 to 6 in the address shows that many (Ana, Leo, Mia, Sam, Eva, Tom). */
(function () {
  const ALL_KIDS = [
    { id: 'ana', name: 'Ana', year: 'Year 6' }, { id: 'leo', name: 'Leo', year: 'Year 7' }, { id: 'mia', name: 'Mia', year: 'Year 7' },
    { id: 'sam', name: 'Sam', year: 'Year 5' }, { id: 'eva', name: 'Eva', year: 'Year 8' }, { id: 'tom', name: 'Tom', year: 'Year 6' },
  ];
  const n = Math.max(1, Math.min(6, +(new URLSearchParams(location.search).get('kids') || 3)));
  const IMG = (f) => `../../assets/img/${f}`;
  /* Kinds of material, in the order a parent thinks of them. */
  const SHELVES = [
    { id: 'lessons', title: 'From this week’s lessons', say: 'Made from what they watched' },
    { id: 'daily', title: 'A little every day', say: 'Short practice, step by step' },
    { id: 'puzzles', title: 'Puzzles and games', say: 'Chess, codes, logic' },
    { id: 'make', title: 'Make and explore', say: 'Kitchen science, art, outdoors' },
    { id: 'words', title: 'Read and write', say: 'Reading log, Spanish writing' },
    { id: 'feel', title: 'Feelings and life skills', say: 'Check-ins, money, time' },
    { id: 'forms', title: 'Charts and forms', say: 'Habits, the week, experiments' },
    { id: 'parents', title: 'For parents only', say: 'Exam papers and answers' },
  ];
  /* Subjects, for the by-subject view. Photos come from our own lessons (licenses in assets/img/credits.json); subjects with no lesson yet show a drawing of their own page, never an unrelated photo. */
  const SUBJECTS = [
    { id: 'science', name: 'Science', pic: IMG('skeleton.jpg'), say: 'Skeleton, muscles, the brain' },
    { id: 'geography', name: 'Geography', pic: IMG('colombia-paramo.jpg'), say: 'Colombia' },
    { id: 'spanish', name: 'Spanish', pic: IMG('spanish-cover.jpg'), say: '¡Hola! and writing' },
    { id: 'feelings', name: 'Emotions', pic: IMG('emotions-cover.jpg'), say: 'Feelings, mind, life skills' },
    { id: 'maths', name: 'Maths', art: 'maths', say: 'Daily practice, puzzles' },
    { id: 'english', name: 'English', art: 'handwriting', say: 'Reading, handwriting' },
    { id: 'games', name: 'Chess and logic', art: 'chess', say: 'Mate in one, logic grids' },
    { id: 'makers', name: 'Make and explore', art: 'experiment', say: 'Kitchen science, art' },
  ];
  const ITEMS = [
    // From lessons
    { id: 'mu-sheet', kind: 'worksheet', shelf: 'lessons', subject: 'science', title: 'Muscles exercises', from: 'How Do Your Muscles Work?', what: '12 questions to write and tick, with an answer page', pages: 4, mins: 25, both: true, status: 'built', level: 'Lesson 2' },
    { id: 'sk-label', kind: 'label', shelf: 'lessons', subject: 'science', title: 'Label the skeleton', from: 'Why Don’t You Collapse?', what: 'Write the bone at each letter', pages: 1, mins: 10, both: true, status: 'planned', level: 'Lesson 1' },
    { id: 'mu-cross', kind: 'crossword', shelf: 'lessons', subject: 'science', title: 'Muscles crossword', from: 'How Do Your Muscles Work?', what: '10 clues from the lesson', pages: 1, mins: 15, both: true, status: 'planned', level: 'Lesson 2' },
    { id: 'co-map', kind: 'map', shelf: 'lessons', subject: 'geography', title: 'Colombia’s six regions', from: 'Colombia: One Country, Six Regions', what: 'Shade and name each region', pages: 1, mins: 15, both: true, status: 'planned', level: 'Lesson 1' },
    { id: 'co-floors', kind: 'timeline', shelf: 'lessons', subject: 'geography', title: 'Climb the thermal floors', from: 'Why Is It Cold Near the Equator?', what: 'Put cacao, coffee, potatoes and snow in order', pages: 1, mins: 10, both: true, status: 'planned', level: 'Lesson 2' },
    { id: 'sp-cards', kind: 'cards', shelf: 'lessons', subject: 'spanish', title: '¡Hola! speaking cards', from: '¡Hola! Your First Words in Spanish', what: '8 cards to say aloud, then flip', pages: 1, mins: 10, both: true, status: 'planned', level: 'Lesson 1' },
    { id: 'em-sort', kind: 'faces', shelf: 'lessons', subject: 'feelings', title: 'Which feeling is it?', from: 'What Are Emotions For?', what: 'Match six moments to six faces', pages: 1, mins: 10, both: true, status: 'planned', level: 'Lesson 1' },
    { id: 'ne-comic', kind: 'comic', shelf: 'lessons', subject: 'science', title: 'Draw a reflex', from: 'How Your Brain Talks to Your Body', what: 'Four boxes: from the hot pan to your hand', pages: 1, mins: 20, both: false, status: 'planned', level: 'Lesson 1' },
    { id: 'mu-code', kind: 'code', shelf: 'puzzles', subject: 'science', title: 'Muscles secret code', from: 'How Do Your Muscles Work?', what: 'Six answers spell a hidden word', pages: 1, mins: 10, both: true, status: 'planned', level: 'Lesson 2' },
    // A little every day
    { id: 'ma-daily', kind: 'maths', shelf: 'daily', subject: 'maths', title: 'Times tables 6 to 9', from: 'Daily practice, step 14 of 40', what: 'One short sheet a day, a little harder each time', pages: 1, mins: 10, both: true, status: 'idea', level: 'Step 14' },
    { id: 'en-hand', kind: 'handwriting', shelf: 'daily', subject: 'english', title: 'Joined handwriting', from: 'Daily practice, week 3', what: 'Copy five joined words, then a sentence', pages: 1, mins: 10, both: false, status: 'idea', level: 'Week 3' },
    { id: 'sp-write', kind: 'postcard', shelf: 'words', subject: 'spanish', title: 'A postcard from Cartagena', from: 'Spanish writing', what: 'Write 5 sentences in Spanish with estoy and está', pages: 1, mins: 20, both: true, status: 'idea', level: 'Spanish' },
    // Puzzles and games
    { id: 'ch-mate', kind: 'chess', shelf: 'puzzles', subject: 'games', title: 'Mate in one', from: 'Chess, set 1', what: 'Six boards: find the move that wins', pages: 1, mins: 15, both: true, status: 'idea', level: 'Set 1' },
    { id: 'lg-pets', kind: 'logic', shelf: 'puzzles', subject: 'games', title: 'Who owns the parrot?', from: 'Logic grid', what: 'Four clues, a grid of ticks and crosses', pages: 1, mins: 15, both: true, status: 'idea', level: 'Easy' },
    // Make and explore
    { id: 'mk-cabbage', kind: 'experiment', shelf: 'make', subject: 'makers', title: 'Red cabbage colour test', from: 'Kitchen science', what: 'Lemon, soap, vinegar: which turn it pink?', pages: 1, mins: 30, both: false, status: 'idea', level: 'Adult nearby' },
    { id: 'mk-art', kind: 'art', shelf: 'make', subject: 'makers', title: 'Draw a frailejón', from: 'Art, with the Colombia lessons', what: 'Draw the páramo plant step by step', pages: 1, mins: 20, both: false, status: 'idea', level: 'Art' },
    { id: 'mk-nature', kind: 'nature', shelf: 'make', subject: 'makers', title: 'Five things outside', from: 'Nature journal', what: 'Find, draw and name five living things', pages: 1, mins: 30, both: false, status: 'idea', level: 'Outdoors' },
    // Read and write
    { id: 'rd-log', kind: 'readlog', shelf: 'words', subject: 'english', title: 'Reading log', from: 'Hard-cover book habit', what: 'Book, pages, one sentence a day', pages: 1, mins: 5, both: true, status: 'idea', level: 'Every day' },
    // Feelings and life
    { id: 'fe-check', kind: 'feelings', shelf: 'feel', subject: 'feelings', title: 'How am I today?', from: 'Feelings check-in', what: 'Pick a face, say why, one kind thing', pages: 0.5, mins: 5, both: true, status: 'idea', level: 'Every day' },
    { id: 'lf-money', kind: 'money', shelf: 'feel', subject: 'maths', title: 'A picnic for £20', from: 'Life skills: money', what: 'Choose food from a price list and add it up', pages: 1, mins: 20, both: true, status: 'idea', level: 'Money' },
    // Charts and forms
    { id: 'fm-habits', kind: 'habits', shelf: 'forms', subject: 'all', title: 'Habit chart', from: 'Chess and reading', what: 'Days across, habits down', pages: 1, mins: 1, both: false, status: 'built', level: 'Each child', perKid: true },
    { id: 'fm-week', kind: 'week', shelf: 'forms', subject: 'all', title: 'This week’s tasks', from: 'From the timetable', what: 'Every class with a tick box', pages: 1, mins: 1, both: false, status: 'built', level: 'Each child', perKid: true },
    { id: 'fm-exp', kind: 'expform', shelf: 'forms', subject: 'science', title: 'Experiment record', from: 'Science form', what: 'Question, guess, results, what I found', pages: 1, mins: 15, both: false, status: 'idea', level: 'Any experiment' },
    { id: 'aw-cert', kind: 'certificate', shelf: 'forms', subject: 'all', title: 'Skeleton expert certificate', from: 'After the unit', what: 'For finishing the skeleton unit', pages: 1, mins: 0, both: false, status: 'idea', level: 'Award' },
    // For parents only
    { id: 'ex-unit', kind: 'exam', shelf: 'parents', subject: 'science', title: 'Unit exam: Skeleton and muscles', from: 'Parents only', what: '17 questions, 30 minutes, marking points at the end', pages: 6, mins: 30, both: false, status: 'built', level: 'Exam', parentOnly: true },
  ];
  /* This week's pack: what a parent would print on Monday. */
  const WEEK = { title: 'This week’s pack', dates: '9 to 15 November', items: ['fm-week', 'fm-habits', 'mu-sheet', 'co-map', 'sp-cards', 'ma-daily'] };
  const byId = (id) => ITEMS.find((i) => i.id === id);
  const sheetsOf = (ids, kids) => ids.map(byId).reduce((s, i) => s + Math.ceil(i.pages) * (i.perKid ? kids : 1), 0);
  window.MAT = { kids: ALL_KIDS.slice(0, n), SHELVES, SUBJECTS, ITEMS, WEEK, byId, sheetsOf, IMG };
})();
