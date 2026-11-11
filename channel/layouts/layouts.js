/* Plain layouts: one set of screens per reader, tested with four very different subjects. Family results here are examples. */
const PROGRAM = [
  ['Science', [['Forces', 10], ['States of matter', 7], ['Cells', 7], ['Our solar system and beyond', 8], ['Solutions', 11], ['Ecosystems', 9], ['Sound, light and vision', 8], ['Heredity and DNA', 7], ['Separation techniques', 7], ['Human skeleton and muscles', 4], ['Heating and cooling', 8], ['Diffusion', 4], ['Climate change and living sustainably', 7]]],
  ['Maths', [['Place value', 11], ['Factors, multiples, squares and cubes', 19], ['Arithmetic with integers and decimals', 17], ['Expressions and equations', 17], ['Plotting coordinates', 7], ['Perimeter and area', 12], ['Ordering fractions and decimals', 18], ['Arithmetic with fractions', 10], ['Fractions and ratio', 17], ['Transformations', 18]]],
  ['English', [['The fundamentals of effective discussion', 4], ['Step into the unknown', 32], ['The Tempest', 28], ['Poetry about place and home', 14], ['Sherlock Holmes: short stories', 22], ['The Twisted Tree', 32], ['Dystopian settings', 16]]],
  ['History', [['The Great Schism', 3], ['11th-century Islamic worlds', 3], ['The Norman Conquest', 6], ['The Crusades', 6], ['Medieval women: Matilda', 6], ['England under Henry II', 6], ['Magna Carta', 6], ['Edward I', 6], ['Medieval Norwich', 6], ['Medieval Mali', 6], ['The Black Death and the Silk Road', 3], ['The Peasants’ Revolt', 6], ['The Wars of the Roses', 6], ['The Renaissance', 6]]],
  ['Geography', [['What makes a geographer?', 12], ['Weather and climate', 14], ['Population', 12], ['Coasts', 12], ['Forest biomes', 12], ['India', 12], ['China', 12]]],
  ['Computing', [['Clear messaging in digital media', 6], ['Computer networks and data transmission', 6], ['Using media to gain support for a cause', 6], ['Block-based programming', 6], ['Physical computing using the micro:bit', 6], ['Data modelling', 6]]],
  ['Spanish', [['Identity: estar and ser', 6], ['Belongings: tener', 4], ['Activities: -AR verbs', 4], ['Life at school and home', 6], ['Places: definite articles', 6], ['Celebrations: querer and dar', 2], ['What we have', 6], ['Activities: information questions', 4], ['What we can and must do', 6], ['People and places', 4], ['At home and away', 5], ['What people do: -ER and -IR verbs', 6], ['Describing people and possessions', 4], ['Places and plans', 8]]],
];
const LESSONS = {
  bones: { subject: 'Science', unit: 'Human skeleton and muscles', hook: 'Why don’t you collapse?', pic: 'A real human skeleton', minutes: 10, next: ['Muscles', 'Movement', 'Biomechanics'], q: 'Which bone is the longest in your body?', o: ['Femur', 'Humerus', 'Tibia', 'Stapes'], miss: [['What makes blood cells?', 'Bone marrow.'], ['What kind of joint is your shoulder?', 'Ball and socket.']] },
  fractions: { subject: 'Maths', unit: 'Arithmetic with fractions', hook: 'How do you share 3 pizzas between 8 people?', pic: '3 pizzas cut into slices', minutes: 12, next: ['Fractions and ratio', 'Transformations'], q: 'What fraction of a pizza does each person get?', o: ['3/8', '8/3', '1/3', '1/8'], miss: [['What is 1/2 + 1/4?', '3/4.'], ['What is 3/8 + 3/8?', '6/8, which is the same as 3/4.']] },
  tempest: { subject: 'English', unit: 'The Tempest', hook: 'Who made the storm?', pic: 'A ship caught in a storm at sea', minutes: 15, next: ['Poetry about place and home', 'Sherlock Holmes'], q: 'Who causes the storm at the start of The Tempest?', o: ['Prospero', 'Miranda', 'Caliban', 'Alonso'], miss: [['Who is Prospero’s daughter?', 'Miranda.'], ['Where is the play set?', 'On an island.']] },
  magna: { subject: 'History', unit: 'Magna Carta', hook: 'Can a king break the law?', pic: 'King John and the Magna Carta, 1215', minutes: 12, next: ['Edward I', 'Medieval Norwich'], q: 'Which king agreed to Magna Carta in 1215?', o: ['King John', 'Henry II', 'Edward I', 'Richard I'], miss: [['When was Magna Carta agreed?', '1215.'], ['Who pressured the king to agree?', 'His barons.']] },
};
const KIDS = ['Kid 1', 'Kid 2', 'Kid 3'];
// Example positions in May, so each child's "Now" fits the term.
const NOW = {
  'Kid 1': { Science: 'Human skeleton and muscles', Maths: 'Arithmetic with fractions', English: 'The Twisted Tree', History: 'The Black Death and the Silk Road', Geography: 'India', Computing: 'Physical computing using the micro:bit', Spanish: 'At home and away' },
  'Kid 2': { Science: 'Heating and cooling', Maths: 'Arithmetic with fractions', English: 'Dystopian settings', History: 'The Peasants’ Revolt', Geography: 'China', Computing: 'Data modelling', Spanish: 'What people do: -ER and -IR verbs' },
  'Kid 3': { Science: 'Separation techniques', Maths: 'Arithmetic with fractions', English: 'The Twisted Tree', History: 'The Black Death and the Silk Road', Geography: 'India', Computing: 'Physical computing using the micro:bit', Spanish: 'At home and away' },
};
const SCREENS = {
  'tv-home': { reader: 'tv', name: 'Channel home', who: 'Children together, on the sofa', where: 'TV, 2–4 metres, remote', want: 'What are we watching? Is it cool?', order: ['The picture', 'The question it asks', 'Play'], then: 'Press Play. Next lessons are there if they want them.' },
  'tv-browse': { reader: 'tv', name: 'Browse by subject', who: 'A curious child on the sofa', where: 'TV, 2–4 metres, remote', want: 'What else is there?', order: ['Which subject', 'Lessons this term', 'What’s playing next'], then: 'Pick a lesson. It shows a few large items, never the full year.' },
  'tv-end': { reader: 'tv', name: 'End of a lesson', who: 'Children together, on the sofa', where: 'TV, 2–4 metres', want: 'What do we do now?', order: ['Go to your own device', 'The code to scan'], then: 'Each child picks up their own device.' },
  'kid-day': { reader: 'kid', name: 'My day', who: 'One child, alone', where: 'Their tablet or laptop, arm’s length', want: 'What do I do now? How long will it take?', order: ['The one next thing', 'Start', 'The rest of today', 'How I’m doing'], then: 'Press Start. The child never has to plan.' },
  'kid-test': { reader: 'kid', name: 'A test question', who: 'One child, concentrating', where: 'Their tablet or laptop', want: 'What’s the answer?', order: ['The question', 'The answers', 'Check'], then: 'Check the answer. Nothing else competes for attention.' },
  'kid-result': { reader: 'kid', name: 'Test result', who: 'One child', where: 'Their tablet or laptop', want: 'How did I do? What should I fix?', order: ['The score', 'What to look at again', 'When it comes back'], then: 'Go back to My day.' },
  'kid-year': { reader: 'kid', name: 'My year', who: 'A curious child', where: 'Their tablet or laptop', want: 'What will I learn? Where am I?', order: ['Subject', 'Where I am now', 'What’s before and after'], then: 'One subject at a time, in real words.' },
  'par-dash': { reader: 'par', name: 'Dashboard', who: 'Parent, short of time', where: 'Laptop or phone', want: 'Are they on track? What needs me?', order: ['Each child’s status', 'What needs me', 'What’s coming up'], then: 'Open the one thing that needs attention, then leave.' },
  'par-grades': { reader: 'par', name: 'Gradebook', who: 'Parent, checking or keeping records', where: 'Laptop', want: 'What are the actual results?', order: ['Who and which subject', 'Dated results'], then: 'Filter, or export for records.' },
  'par-year': { reader: 'par', name: 'Whole year', who: 'Parent, planning', where: 'Laptop or printed', want: 'What will they learn this year?', order: ['Which child and year', 'Subjects by term', 'Where they are now'], then: 'Read the year, or switch child. A printable copy comes later.' },
};
const READERS = { tv: ['TV', 1920, 1080, 'Children on the sofa'], kid: ['Child’s device', 1024, 768, 'One child'], par: ['Parent’s laptop', 1440, 900, 'Parent'] };
const V = { screen: 'tv-home', lesson: 'bones', order: true, subject: 0, gradeKid: 'All children', yearKid: 'Kid 1' };
const $ = (s) => document.querySelector(s);
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const lesson = () => LESSONS[V.lesson];
const terms = (units) => { const total = units.reduce((n, u) => n + u[1], 0); const out = [[], [], []]; let seen = 0; units.forEach((u) => { const f = seen / total; out[f < 1 / 3 ? 0 : f < 2 / 3 ? 1 : 2].push(u); seen += u[1]; }); return out; };
const TERM = ['Autumn', 'Spring', 'Summer'];
const nowUnit = (subject, kid = 'Kid 1') => NOW[kid][subject];

const VIEW = {
  'tv-home'() {
    const l = lesson();
    return `<div class="tv"><div class="pic tvPic" data-ro="1">[Picture: ${esc(l.pic)}]</div>
      <div class="tvMain"><div data-ro="2"><h1>${esc(l.hook)}</h1><p>${esc(l.subject)}, ${l.minutes} minutes</p></div><button class="btn" data-ro="3" data-go="tv-end">Play</button></div>
      <div class="tvNext"><b>Next</b>${l.next.slice(0, 3).map((t) => `<button>${esc(t)}</button>`).join('')}</div></div>`;
  },
  'tv-browse'() {
    const s = PROGRAM[V.subject], parts = terms(s[1]), cur = nowUnit(s[0]);
    const term = Math.max(0, parts.findIndex((p) => p.some((u) => u[0] === cur)));
    const list = parts[term === -1 ? 0 : term].slice(0, 6);
    return `<div class="tv"><div class="tvTabs" data-ro="1">${PROGRAM.map((p, i) => `<button aria-pressed="${i === V.subject}" data-subject="${i}">${p[0]}</button>`).join('')}</div>
      <h2 data-ro="2">${TERM[term]} term</h2><ol class="tvList" data-ro="3">${list.map((u, i) => { const isNow = u[0] === cur; const idx = list.findIndex((x) => x[0] === cur); return `<li class="${isNow ? 'now' : ''}">${esc(u[0])}<span>${isNow ? 'Next up' : idx >= 0 && i < idx ? 'Watched' : 'Later'}</span></li>`; }).join('')}</ol></div>`;
  },
  'tv-end'() {
    return `<div class="tv"><div class="tvEnd"><div><h1 data-ro="1">Now take your test on your own device</h1><p>It’s waiting in My day.</p><button class="btnLine" data-go="tv-home">Back to the channel</button></div><div class="pic" data-ro="2">[Code to scan with your device]</div></div></div>`;
  },
  'kid-day'() {
    const l = lesson();
    return `<div class="kid"><header class="kidTop"><h1>Hi, Kid 1</h1><button class="textBtn">Sign out</button></header><div class="kidGrid"><div>
      <section class="nextCard"><small data-ro="1">Do this next</small><div class="pic">[Picture: ${esc(l.pic)}]</div><h2>${esc(l.hook)}</h2><p>${esc(l.subject)} lesson, ${l.minutes} minutes. Or watch it on the TV together.</p><div class="nextRow"><button class="btn" data-ro="2" data-go="kid-test">Start</button></div></section>
      <section class="dayList" data-ro="3"><h3>Also today</h3><ul><li class="done"><span>Done</span><span>3 warm-up questions</span><small>Got 3 of 3</small></li><li><span></span><span>Test on this lesson</span><small>10 min</small></li><li><span></span><span>Fractions: adding with different denominators</span><small>25 min</small></li><li><span></span><span>The Twisted Tree: next chapter</span><small>30 min</small></li></ul></section></div>
      <aside class="side" data-ro="4"><section><h3>Last test</h3><p class="big" style="font-size:40px">9 of 12</p><button class="textBtn" data-go="kid-result">3 things to fix</button></section><section><h3>Coming back</h3><p>A short re-test on Tuesday.</p></section><section><h3>My year</h3><p>See what you’ll learn this year.</p><button class="textBtn" data-go="kid-year">Open my year</button></section></aside></div><p class="example" style="margin-top:14px;font-size:14px">Example day and results.</p></div>`;
  },
  'kid-test'() {
    const l = lesson();
    return `<div class="kid"><div class="qCard"><div class="qTop"><button class="textBtn" data-go="kid-day">Stop</button><span>Question 3 of 12</span></div><div class="bar"><i style="width:25%"></i></div>
      <h1 data-ro="1">${esc(l.q)}</h1><div class="qOpts" data-ro="2">${l.o.map((o) => `<label><input type="radio" name="kidAnswer">${esc(o)}</label>`).join('')}</div><div><button class="btn" data-ro="3" data-go="kid-result">Check answer</button></div></div></div>`;
  },
  'kid-result'() {
    const l = lesson();
    return `<div class="kid"><div class="qCard"><p data-ro="1" class="big">9 of 12</p><h1>Good. Fix these 3 and you’ve got it.</h1>
      <section data-ro="2"><h3>Look at these again</h3><ul class="fixList">${l.miss.map(([q, a]) => `<li>${esc(q)}<small>${esc(a)}</small></li>`).join('')}<li>${esc(l.q)}<small>${esc(l.o[0])}.</small></li></ul></section>
      <p data-ro="3">These come back in a short re-test on Tuesday.</p><div><button class="btn" data-go="kid-day">Back to My day</button></div><p class="example" style="font-size:14px">Example result.</p></div></div>`;
  },
  'kid-year'() {
    const s = PROGRAM[V.subject], parts = terms(s[1]), cur = nowUnit(s[0]);
    const flat = s[1].map((u) => u[0]), at = cur ? flat.indexOf(cur) : -1;
    return `<div class="kid"><header class="kidTop"><h1>My year</h1><button class="textBtn" data-go="kid-day">Back to My day</button></header><div class="kidTabs" data-ro="1">${PROGRAM.map((p, i) => `<button aria-pressed="${i === V.subject}" data-subject="${i}">${p[0]}</button>`).join('')}</div>
      <div class="termList" data-ro="2">${parts.map((part, t) => `<section><h3>${TERM[t]} term</h3><ul>${part.map((u) => { const i = flat.indexOf(u[0]); const state = at < 0 ? '' : i < at ? 'Done' : i === at ? 'Now' : 'Later'; return `<li class="${i === at ? 'now' : ''}">${esc(u[0])}<span>${state}</span></li>`; }).join('')}</ul></section>`).join('')}</div></div>`;
  },
  'par-dash'() {
    const rows = [['Kid 1', 'Year 7', 'Human skeleton and muscles', '4 of 5', '9 of 12, science test', 'On track'], ['Kid 2', 'Year 7', 'Arithmetic with fractions', '5 of 5', '29 of 34, unit exam', 'Ahead'], ['Kid 3', 'Year 7', 'The Twisted Tree', '2 of 5', '6 of 12, English test', 'Behind by 3 lessons']];
    return parent(`<div class="parHead"><h1>Dashboard</h1><span class="example">Friday 8 May. Example data.</span></div>
      <section data-ro="1"><table><thead><tr><th>Child</th><th>Level</th><th>Now learning</th><th>Lessons this week</th><th>Latest result</th><th>Status</th></tr></thead><tbody>${rows.map((r) => `<tr>${r.map((c, i) => `<td class="${i === 5 ? 'status' : ''}">${esc(c)}</td>`).join('')}</tr>`).join('')}</tbody></table></section>
      <div class="parTwo"><section data-ro="2"><h2>Needs you</h2><ul class="rowList"><li><span>Mark Kid 2’s written answers<small>3 answers, about 5 minutes</small></span><button class="btn">Mark</button></li><li><span>Talk to Kid 3 about The Twisted Tree<small>Missed 6 of 12 questions, and 3 lessons behind</small></span><button class="btnLine">See results</button></li><li><span>Do the bendy bone experiment with Kid 1<small>Chicken bone and vinegar; takes about 5 days</small></span><button class="btnLine">Open</button></li></ul></section>
      <section data-ro="3"><h2>Coming up</h2><ul class="rowList"><li><span>Kid 1: science re-test</span><span>Tue</span></li><li><span>Kid 3: English test</span><span>Wed</span></li><li><span>Kid 2: next maths unit starts</span><span>Mon</span></li><li><span>End of Summer term</span><span>In 10 weeks</span></li></ul></section></div>`, 'par-dash');
  },
  'par-grades'() {
    const data = [['8 May', 'Kid 2', 'Maths', 'Arithmetic with fractions', 'Unit exam', '29 of 34', '85%'], ['8 May', 'Kid 1', 'Science', 'Human skeleton and muscles', 'Lesson test', '9 of 12', '75%'], ['7 May', 'Kid 3', 'English', 'The Twisted Tree', 'Lesson test', '6 of 12', '50%'], ['6 May', 'Kid 1', 'Science', 'Human skeleton and muscles', 'Warm-up', '3 of 3', '100%'], ['6 May', 'Kid 2', 'History', 'Magna Carta', 'Re-test', '4 of 4', '100%'], ['5 May', 'Kid 3', 'Maths', 'Arithmetic with fractions', 'Lesson test', '10 of 12', '83%'], ['30 Apr', 'Kid 1', 'Maths', 'Ordering fractions and decimals', 'Unit exam', '25 of 30', '83%'], ['29 Apr', 'Kid 2', 'Science', 'Separation techniques', 'Lesson test', '11 of 12', '92%']];
    const rows = data.filter((r) => V.gradeKid === 'All children' || r[1] === V.gradeKid);
    return parent(`<div class="parHead"><h1>Gradebook</h1><button class="btnLine">Export report</button></div><div class="filters" data-ro="1">${['All children', 'Kid 1', 'Kid 2', 'Kid 3'].map((k) => `<button class="${V.gradeKid === k ? 'btn' : 'btnLine'}" data-grade="${k}">${k}</button>`).join('')}<span class="example" style="margin-left:8px">Example data.</span></div>
      <table data-ro="2"><thead><tr><th>Date</th><th>Child</th><th>Subject</th><th>Topic</th><th>Type</th><th>Result</th><th>%</th></tr></thead><tbody>${rows.map((r) => `<tr>${r.map((c) => `<td>${esc(c)}</td>`).join('')}</tr>`).join('')}</tbody></table>`, 'par-grades');
  },
  'par-year'() {
    const units = PROGRAM.reduce((n, p) => n + p[1].length, 0), lessons = PROGRAM.reduce((n, p) => n + p[1].reduce((m, u) => m + u[1], 0), 0);
    return parent(`<div data-ro="1" style="display:grid;gap:10px"><div class="parHead"><h1>${V.yearKid}’s year: Year 7</h1><span>${PROGRAM.length} subjects, ${units} units, ${lessons} lessons</span></div><div class="filters">${KIDS.map((k) => `<button class="${V.yearKid === k ? 'btn' : 'btnLine'}" data-yearkid="${k}">${k}</button>`).join('')}</div></div>
      <table class="yearTable" data-ro="2"><thead><tr><th>Subject</th><th>Autumn</th><th>Spring</th><th>Summer</th></tr></thead><tbody>${PROGRAM.map((p) => `<tr><td>${p[0]}</td>${terms(p[1]).map((part) => `<td><ul>${part.map((u) => { const isNow = u[0] === nowUnit(p[0], V.yearKid); return `<li class="${isNow ? 'now' : ''}">${isNow ? 'Now: ' : ''}${esc(u[0])} <small>(${u[1]})</small></li>`; }).join('')}</ul></td>`).join('')}</tr>`).join('')}</tbody></table>
      <p class="example" data-ro="3">Numbers show lessons in each unit. Unit order comes from Oak National Academy. The split into terms is our suggestion, and some titles are shortened.</p>`, 'par-year');
  },
};
function parent(body, current) {
  const nav = [['par-dash', 'Dashboard'], ['par-grades', 'Gradebook'], ['par-year', 'Whole year']];
  return `<div class="par"><aside class="parNav"><b>Parent</b>${nav.map(([k, t]) => `<button data-go="${k}" aria-current="${k === current ? 'page' : 'false'}">${t}</button>`).join('')}<button disabled style="opacity:.5">Children</button><button disabled style="opacity:.5">Billing</button></aside><div class="parMain">${body}</div></div>`;
}

function fit() {
  const area = $('#frameArea'), [, w, h] = READERS[SCREENS[V.screen].reader], full = document.body.classList.contains('full');
  const pad = full ? 0 : 16, sw = (area.clientWidth - pad * 2) / w, sh = (area.clientHeight - pad * 2 - (full ? 0 : 18)) / h;
  // Only the TV layout may scale up; the other readers must stay true size.
  const s = Math.min(sw, sh, SCREENS[V.screen].reader === 'tv' ? 9 : 1);
  const frame = $('#frame');
  frame.style.width = `${w}px`; frame.style.height = `${h}px`;
  frame.style.transform = `translate(${Math.max(pad, (area.clientWidth - w * s) / 2)}px, ${pad}px) scale(${s})`;
  $('#scaleNote').textContent = `${READERS[SCREENS[V.screen].reader][0]}, ${w}×${h}, shown at ${Math.round(s * 100)}%. Use Full screen to check real size.`;
}
function render() {
  const sc = SCREENS[V.screen];
  document.body.classList.toggle('showOrder', V.order);
  const lessonsUsed = ['tv-home', 'kid-day', 'kid-test', 'kid-result'].includes(V.screen);
  $('#tools').innerHTML = `<div class="group"><span>Reader</span>${Object.entries(READERS).map(([k, r]) => `<button class="tool" aria-pressed="${sc.reader === k}" data-reader="${k}">${r[0]}</button>`).join('')}</div>
    <div class="group"><span>Screen</span>${Object.entries(SCREENS).filter(([, s]) => s.reader === sc.reader).map(([k, s]) => `<button class="tool" aria-pressed="${k === V.screen}" data-go="${k}">${s.name}</button>`).join('')}</div>
    <div class="group"><span>Subject</span>${[['bones', 'Bones'], ['fractions', 'Fractions'], ['tempest', 'The Tempest'], ['magna', 'Magna Carta']].map(([k, t]) => `<button class="tool" aria-pressed="${V.lesson === k}" data-lesson="${k}" ${lessonsUsed ? '' : 'disabled style="opacity:.4"'}>${t}</button>`).join('')}</div>
    <div class="group"><button class="tool" aria-pressed="${V.order}" data-order>Reading order</button><button class="tool" data-full>Full screen</button></div>`;
  $('#notes').innerHTML = `<h2>${sc.name}</h2><dl><dt>Who is reading</dt><dd>${sc.who}</dd><dt>Where</dt><dd>${sc.where}</dd><dt>What they want to know</dt><dd><b>${sc.want}</b></dd><dt>What they read first, second, third</dt><dd><ol>${sc.order.map((o) => `<li>${o}</li>`).join('')}</ol></dd><dt>What happens next</dt><dd>${sc.then}</dd></dl><p style="color:var(--soft);font-size:14px">Grey on purpose. Judge only whether the right thing is found first. Style comes later.</p>${lessonsUsed ? '<p style="color:var(--soft);font-size:14px">The Subject buttons try this layout with another lesson. They don’t change this child’s plan.</p>' : ''}<p style="color:var(--soft);font-size:14px">All results and dates are examples. Some buttons go nowhere yet.</p>`;
  $('#frame').innerHTML = VIEW[V.screen]();
  $('#frame').scrollTop = 0;
  fit();
}
document.addEventListener('click', (ev) => {
  const el = ev.target.closest('button, [data-go]');
  if (!el || el.disabled) return;
  const d = el.dataset;
  if (d.reader) { V.screen = Object.keys(SCREENS).find((k) => SCREENS[k].reader === d.reader); render(); }
  else if (d.go) { V.screen = d.go; render(); }
  else if (d.lesson) { V.lesson = d.lesson; V.subject = PROGRAM.findIndex((p) => p[0] === LESSONS[d.lesson].subject); render(); }
  else if (d.subject != null) { V.subject = +d.subject; render(); }
  else if (d.grade) { V.gradeKid = d.grade; render(); }
  else if (d.yearkid) { V.yearKid = d.yearkid; render(); }
  else if (d.order != null) { V.order = !V.order; render(); }
  else if (d.full != null) { document.body.classList.add('full'); document.body.classList.remove('showOrder'); document.documentElement.requestFullscreen?.().catch(() => {}); fit(); }
  else if (el.id === 'exitFull') { leaveFull(); }
});
function leaveFull() {
  document.body.classList.remove('full');
  if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
  render();
}
document.addEventListener('keydown', (ev) => { if (ev.key === 'Escape' && document.body.classList.contains('full')) leaveFull(); });
document.addEventListener('fullscreenchange', () => { if (!document.fullscreenElement && document.body.classList.contains('full')) leaveFull(); else fit(); });
addEventListener('resize', fit);
const parts = location.hash.slice(1).split('.');
if (SCREENS[parts[0]]) V.screen = parts[0];
if (LESSONS[parts[1]]) { V.lesson = parts[1]; V.subject = PROGRAM.findIndex((p) => p[0] === LESSONS[parts[1]].subject); }
render();
