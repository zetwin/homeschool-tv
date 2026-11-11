/* One believable day for every pad direction, so the only difference between designs is the design.
   Real things the app does today. Nothing here is invented to make a sample interesting. */
window.PAD = {
  today: 'Monday 9 November', now: '11:20',
  parents: [{ name: 'Sam', you: true }, { name: 'Alex' }],
  kids: [
    { name: 'Ana', year: 'Year 6', face: '🦉', color: '#D42A20', done: 2, of: 5, average: '9 of 12', homework: 1, late: 0 },
    { name: 'Leo', year: 'Year 7', face: '🦊', color: '#0F766E', done: 3, of: 5, average: '10 of 12', homework: 2, late: 1 },
    { name: 'Mia', year: 'Year 7', face: '🐼', color: '#1D4ED8', done: 1, of: 5, average: '7 of 12', homework: 0, late: 0 },
  ],
  /* Today's timetable. `lesson` is a video lesson we have made; the others are classes a parent sets work for. */
  classes: [
    { time: '09:00', subject: 'Maths', title: 'Place value, lesson 5', state: ['done', 'done', 'done'], marks: ['10', '', '8'] },
    { time: '09:55', subject: 'English', title: 'Effective discussion', state: ['done', 'done', 'missed'] },
    { time: '11:00', subject: 'Science', title: 'Why don’t you collapse? The skeleton', lesson: true, now: true, state: ['now', 'done', 'now'] },
    { time: '11:55', subject: 'History', title: 'The Great Schism, lesson 3', state: ['later', 'later', 'later'] },
    { time: '13:30', subject: 'PE', title: 'Sport, swimming or a long walk', state: ['later', 'later', 'later'] },
  ],
  /* Things that need a parent, most urgent first. */
  needsYou: [
    { what: 'Mark Leo’s written answers', detail: 'Unit exam: Skeleton and muscles, 3 answers', action: 'Mark now' },
    { what: 'Leo’s homework is late', detail: 'English: read pages 12 to 15, due Friday', action: 'Remind' },
    { what: 'Rate the Muscles lesson', detail: 'All three children watched it', action: 'Rate' },
  ],
  scores: [
    { kid: 'Leo', what: 'Skeleton, lesson test', score: '11 of 12', when: 'Today' },
    { kid: 'Ana', what: 'Skeleton, lesson test', score: '9 of 12', when: 'Today' },
    { kid: 'Mia', what: 'Muscles, re-test', score: '3 of 4', when: 'Yesterday' },
  ],
  program: { subjects: 8, readyLessons: 7, where: 'Science: Human skeleton and muscles, lesson 2 of 4' },
  admin: {
    sections: ['Your account', 'Family', 'Learning plan', 'Plan and billing', 'Feedback and checks'],
    account: { name: 'Sam', username: 'sam', textSize: 'Large' },
    plan: 'England’s National Curriculum', wordHelp: 'Spanish key words: off',
    billing: 'Family trial, free', examPin: 'Set',
  },
};
