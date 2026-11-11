/* The learning map. Unit order follows Oak National Academy's free science programme, which maps to England's National Curriculum.
   `episode` marks a unit we have built. `path` marks the units on the human body route. */
window.CURRICULUM = {
  standard: 'England’s National Curriculum',
  sequence: 'Oak National Academy’s free unit order',
  here: { subject: 'Science', strand: 'Biology', topic: 'The human body', unit: 'Human skeleton and muscles', lesson: 'Lesson 2 of 4: Muscles' },
  path: [
    { label: 'Earlier', when: 'Year 3', title: 'Skeletons and muscles: first introduction', note: 'Humans and some animals have skeletons and muscles for support, protection and movement.', status: 'done' },
    { label: 'Earlier', when: 'Year 6', title: 'The human circulatory system', note: 'Heart, blood vessels and blood. Helps with what marrow is for.', status: 'plan', unit: 'y6-1' },
    { label: 'Earlier', when: 'Year 6', title: 'Keeping healthy', note: 'How diet, exercise and lifestyle affect the body.', status: 'plan', unit: 'y6-3' },
    { label: 'Before this', when: 'Year 7', title: 'Cells', note: 'Cells build tissues, organs and whole systems such as the skeleton.', status: 'plan', unit: 'y7-3' },
    { label: 'Last lesson', when: 'Year 7', title: 'The human skeleton', note: 'Support, protection, movement and making blood cells.', status: 'done', unit: 'y7-10', ep: 'skeleton' },
    { label: 'You are here', when: 'Year 7', title: 'Muscles', note: 'What muscles are made of and how they move.', status: 'now', unit: 'y7-10', ep: 'muscles' },
    { label: 'Next', when: 'Year 7', title: 'Movement', note: 'How muscles work together to move bones at joints.', status: 'plan', unit: 'y7-10' },
    { label: 'Then', when: 'Year 7', title: 'Biomechanics', note: 'Calculating the turning force around a joint.', status: 'plan', unit: 'y7-10' },
    { label: 'After', when: 'Year 8', title: 'Human digestive system', note: 'The next human body unit in Oak’s order, after Diffusion in Year 7.', status: 'plan', unit: 'y8-1' },
  ],
  years: [
    { id: 'y5', name: 'Year 5', age: 'Ages 9–10', units: [
      ['Properties, changes and separating materials', 'Chemistry and physics', 20], ['Forces including simple machines', 'Physics', 13], ['Earth, Sun and Moon', 'Physics', 12],
      ['Reproduction and life cycles: plants', 'Biology', 9], ['Reproduction and life cycles: animals', 'Biology', 11], ['Human development', 'Biology', 11],
    ] },
    { id: 'y6', name: 'Year 6', age: 'Ages 10–11', units: [
      ['The human circulatory system', 'Biology', 7], ['Changing circuits', 'Physics', 16], ['Keeping healthy', 'Biology', 12], ['Why we group and classify living things', 'Biology', 13],
      ['Evolution and inheritance', 'Biology', 14], ['Light and how it travels', 'Chemistry and physics', 11], ['Materials', 'Chemistry', 3], ['Climate change and sustainability', 'All sciences', 8],
    ] },
    { id: 'y7', name: 'Year 7', age: 'Ages 11–12', units: [
      ['Forces', 'Physics', 10], ['Solid, liquid, gas states and changes of state', 'Chemistry', 7], ['Cells', 'Biology', 7], ['Our solar system and beyond', 'Physics', 8], ['Solutions', 'Chemistry', 11], ['Ecosystems', 'Biology', 9],
      ['Sound, light and vision', 'Physics', 8], ['Heredity and DNA', 'Biology', 7], ['Separation techniques', 'Chemistry', 7], ['Human skeleton and muscles', 'Biology', 4], ['Heating and cooling', 'Physics', 8], ['Diffusion', 'Biology', 4], ['Climate change and living sustainably', 'All sciences', 7], ['Your brain and nerves (bonus)', 'Biology', 6],
    ] },
    { id: 'y8', name: 'Year 8', age: 'Ages 12–13', units: [
      ['Human digestive system', 'Biology', 5], ['Atoms, elements and compounds', 'Chemistry', 9], ['Biodiversity', 'Biology', 8], ['Understanding chemical reactions', 'Chemistry', 6], ['Moving by force', 'Physics', 10], ['Species and classification', 'Biology', 4], ['Variation', 'Biology', 5],
      ['Earth’s resources', 'Chemistry', 7], ['Series circuits', 'Physics', 8], ['Reproduction in humans', 'Biology', 8], ['Fuels and energetics', 'Chemistry', 6], ['Making images', 'Physics', 7], ['Diet and exercise', 'Biology', 9], ['Climate change and greenhouse gases', 'Chemistry and physics', 6],
    ] },
  ],
  unitLessons: {
    /* A bonus unit: England teaches this at key stage 4, ages 14 to 16. Order follows Oak's KS4 unit, simplified. See docs/research/2026-11-07-neuroscience.md. */
    'Your brain and nerves (bonus)': [
      ['How Your Brain Talks to Your Body', 'The parts of the nervous system, and how a message travels', 'ready', 'neuro-1'],
      ['Neurons up close', 'What neurons are made of, and how a message crosses the gap', 'plan'],
      ['How fast can you react?', 'Measure your own reaction time', 'plan'],
      ['Reflexes in detail', 'The path of a reflex, and why reflexes keep us safe', 'plan'],
      ['Inside your brain', 'The main parts of the brain and what each one does', 'plan'],
      ['Looking after your brain', 'How brains can be damaged, how they’re studied, and how to protect yours', 'plan'],
    ],
    'Human skeleton and muscles': [
      ['The human skeleton', 'Support, protection and making blood cells', 'ready', 'skeleton'],
      ['Muscles', 'What muscles are made of and how they move', 'ready', 'muscles'],
      ['Movement', 'How muscles work together to move bones at joints', 'plan'],
      ['Biomechanics', 'Calculating the moment of a force around a joint', 'plan'],
    ],
    'Identity: estar and ser': [
      ['¡Hola! Your First Words in Spanish', 'Use estoy and está for location, and say the sound a', 'ready', 'spanish-1'],
      ['Where are you?', 'Use estás to ask and say where someone is', 'plan'],
      ['How are you feeling?', 'Use estar to say how people feel', 'plan'],
      ['Words that change: he and she', 'Match feeling words to the person', 'plan'],
      ['What I am like', 'Use ser to describe people', 'plan'],
      ['Asking with your voice', 'Turn a sentence into a question with your voice', 'plan'],
    ],
    'Knowing your feelings': [
      ['What are emotions for?', 'Say what emotional intelligence is, what emotions do, and when to tell someone', 'ready', 'emotions-1'],
      ['More words for feelings', 'Use a wider range of words for your own and other people’s feelings', 'plan'],
      ['Feelings in your body', 'Notice how feelings show up in your body', 'plan'],
      ['Calming big feelings', 'Use simple ways to calm down and look after yourself', 'plan'],
      ['Reading other people’s feelings', 'Spot and respond to how someone else feels', 'plan'],
      ['When to ask for help', 'Know when, how and who to ask for help', 'plan'],
    ],
    Colombia: [
      ['One country, six regions', 'Locate Colombia and name its six regions', 'ready', 'colombia'],
      ['Why Is It Cold Near the Equator?', 'Explain how altitude changes climate and crops', 'ready', 'colombia-climate'],
      ['The people of Colombia', 'Who lives there, their languages, cities and daily life', 'plan'],
      ['Coffee and food', 'How coffee is grown, and what families cook in each region', 'plan'],
      ['Music, dance and festivals', 'Cumbia, vallenato and the Carnival of Barranquilla', 'plan'],
      ['Rain, rivers and reefs', 'Explain Pacific rain, Amazon rivers and island reefs', 'plan'],
      ['The golden raft', 'Use the Muisca raft to separate evidence from legend', 'plan'],
      ['A new nation', 'Describe New Granada, independence, and who was affected', 'plan'],
    ],
    Cells: [
      ['The common processes of all living organisms', '', 'plan'], ['Observing cells with a light microscope', '', 'plan'], ['Preparing and observing a microscope slide', '', 'plan'],
      ['Animal cell structures and their functions', '', 'plan'], ['Plant cell structures and their functions', '', 'plan'], ['Multicellular and unicellular organisms', '', 'plan'], ['Specialised cells are adapted for their functions', '', 'plan'],
    ],
  },
  /* All of Year 7 in the seven subjects we've fetched: [unit, lessons]. Some titles are shortened. */
  program: [
    { subject: 'Science', color: '#0F766E', art: 'atom', units: [['Forces', 10], ['States of matter', 7], ['Cells', 7], ['Our solar system and beyond', 8], ['Solutions', 11], ['Ecosystems', 9], ['Sound, light and vision', 8], ['Heredity and DNA', 7], ['Separation techniques', 7], ['Human skeleton and muscles', 4], ['Your brain and nerves (bonus)', 6, { bonus: true }], ['Heating and cooling', 8], ['Diffusion', 4], ['Climate change and living sustainably', 7]] },
    { subject: 'Maths', cover: 'Expressions and equations', color: '#1D4ED8', art: 'fraction', units: [['Place value', 11], ['Factors, multiples, squares and cubes', 19], ['Arithmetic with integers and decimals', 17], ['Expressions and equations', 17], ['Plotting coordinates', 7], ['Perimeter and area', 12], ['Ordering fractions and decimals', 18], ['Arithmetic with fractions', 10], ['Fractions and ratio', 17], ['Transformations', 18]] },
    { subject: 'English', cover: 'The Tempest', color: '#7E22CE', art: 'pen', units: [['The fundamentals of effective discussion', 4], ['Step into the unknown', 32], ['The Tempest', 28], ['Poetry about place and home', 14], ['Sherlock Holmes: short stories', 22], ['The Twisted Tree', 32], ['Dystopian settings', 16]] },
    { subject: 'History', cover: 'Edward I', color: '#B45309', art: 'crown', units: [['The Great Schism', 3], ['11th-century Islamic worlds', 3], ['The Norman Conquest', 6], ['The Crusades', 6], ['Medieval women: Matilda', 6], ['England under Henry II', 6], ['Magna Carta', 6], ['Edward I', 6], ['Medieval Norwich', 6], ['Medieval Mali', 6], ['The Black Death and the Silk Road', 3], ['The Peasants’ Revolt', 6], ['The Wars of the Roses', 6], ['The Renaissance', 6]] },
    { subject: 'Geography', cover: 'What makes a geographer?', color: '#4D7C0F', art: 'volcano', units: [['What makes a geographer?', 12], ['Weather and climate', 14], ['Population', 12], ['Coasts', 12], ['Forest biomes', 12], ['India', 12], ['China', 12], ['Colombia', 8]] },
    { subject: 'Computing', color: '#9F1239', art: 'chip', units: [['Clear messaging in digital media', 6], ['Computer networks and data transmission', 6], ['Using media to gain support for a cause', 6], ['Block-based programming', 6], ['Physical computing using the micro:bit', 6], ['Data modelling', 6]] },
    { subject: 'Spanish', color: '#D42A20', art: 'speech', units: [['Identity: estar and ser', 6], ['Belongings: tener', 4], ['Activities: -AR verbs', 4], ['Life at school and home', 6], ['Places: definite articles', 6], ['Celebrations: querer and dar', 2], ['What we have', 6], ['Activities: information questions', 4], ['What we can and must do', 6], ['People and places', 4], ['At home and away', 5], ['What people do: -ER and -IR verbs', 6], ['Describing people and possessions', 4], ['Places and plans', 8]] },
    /* Not an Oak subject. Aligned to England's Health Education: see docs/research/2026-11-07-emotions-1.md. Later units are planned once Unit 1 is done. */
    { subject: 'Emotional Intelligence', color: '#BE185D', art: 'speech', units: [['Knowing your feelings', 6]] },
  ],
  otherSubjects: ['Maths', 'English', 'History', 'Geography', 'Computing', 'Spanish', 'Emotional Intelligence'],
  sources: [
    ['England’s science curriculum', 'https://www.gov.uk/government/publications/national-curriculum-in-england-science-programmes-of-study/national-curriculum-in-england-science-programmes-of-study'],
    ['Oak Year 7 science units', 'https://www.thenational.academy/teachers/programmes/science-secondary-ks3/units?year=year-7'],
    ['Oak skeleton and muscles lessons', 'https://www.thenational.academy/teachers/programmes/science-secondary-ks3/units/human-skeleton-and-muscles/lessons'],
    ['US standard: MS-LS1', 'https://www.nextgenscience.org/dci-arrangement/ms-ls1-molecules-organisms-structures-and-processes'],
  ],
};
