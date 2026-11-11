/* An example day built from real lessons in the app and their own pictures (assets/img, credits in assets/img/credits.json).
   The times and order are an example, not the family's real timetable. */
window.R3 = {
  date: 'Tuesday 10 November',
  lessons: [
    { time: '09:00', subject: 'Science', title: 'How Do Your Muscles Work?', img: 'muscle-cover.jpg', state: 'done' },
    { time: '09:55', subject: 'Geography', title: 'Why Is It Cold Near the Equator?', img: 'colombia-tolima.jpg', state: 'now' },
    { time: '11:00', subject: 'Spanish', title: '¡Hola! Your First Words in Spanish', img: 'spanish-cover.jpg', state: 'next' },
    { time: '11:55', subject: 'Emotional Intelligence', title: 'What Are Emotions For?', img: 'emotions-cover.jpg', state: 'later' },
  ],
  missed: [{ subject: 'Science', title: 'Why Don’t You Collapse?', img: 'skeleton.jpg', who: 'Missed on Monday' }],
};
window.R3.icon = {
  play: '<svg class="ic fill" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 4.5v15l13-7.5z"/></svg>',
  people: '<svg class="ic" viewBox="0 0 24 24" aria-hidden="true"><circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0"/><path d="M16 4.6a3.5 3.5 0 0 1 0 6.8M18 14.2a6.5 6.5 0 0 1 3.5 5.8"/></svg>',
  print: '<svg class="ic" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 9V3h12v6M6 18H4v-7h16v7h-2M7 14h10v7H7z"/></svg>',
  week: '<svg class="ic" viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="4" width="18" height="17" rx="2"/><path d="M3 9h18M8 2v4M16 2v4"/></svg>',
  gear: '<svg class="ic" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/></svg>',
  say: '<svg class="ic" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5h16v11H9l-5 4z"/><path d="M8 9h8M8 12h5"/></svg>',
  check: '<svg class="ic" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12.5l5 5L20 6.5"/></svg>',
};
window.R3.places = () => `<nav class="places" aria-label="More"><button>${R3.icon.people}Children</button><button>${R3.icon.print}Print</button><button>${R3.icon.week}The week</button><button>${R3.icon.gear}Admin</button></nav>`;
/* Header tools: icons only (owner, 2026-11-10: "tools in header make just icons"); each still has a name for screen readers */
window.R3.top = () => `<header class="top"><h1>Today<small>${R3.date}</small></h1><button class="tool icon" aria-label="Text size"><b>Aa</b></button><button class="tool icon" aria-label="Tell us an idea or a problem">${R3.icon.say}</button></header>`;
window.R3.img = (f) => `../../../assets/img/${f}`;
