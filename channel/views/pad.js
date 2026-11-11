/* The parent pad: the home screen after login, in one of three designs, each with its own Admin. It fits one screen, and one tap slides the detail over it.
   See docs/product/PARENT-PAD-PURPOSE.md. */
(function () {
  const S = window.Store, Sc = () => window.Schedule, D = () => window.ParentData;
  const V = { sheet: null };
  const GEAR = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>'; /* Lucide "settings", ISC license */
  const SIZES = [[1, 'Normal'], [1.2, 'Large'], [1.4, 'Extra large']];
  const PLAY = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 4.5v15l13-7.5z"/></svg>';
  const CHEVRON = '<svg class="padGo" viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5l7 7-7 7"/></svg>';
  const SAY = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5h16v11H9l-5 4z"/><path d="M8 9h8M8 12h5"/></svg>';
  const CLOSE = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>';
  const longDay = (date) => Sc().parse(date).toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' });
  const WORD = { done: 'Done', missing: 'No lesson yet', now: 'To do', catch: 'Catch up', ready: 'Later', past: 'Not done', later: 'Later', none: '' };
  const classWord = (c) => (c.mark ? `Mark ${c.mark}` : c.state === 'now' && V.over ? 'Not done' : WORD[c.state] || '');
  const isScore = (r) => r.type === 'Lesson test' || r.type === 'Unit exam' || r.type === 'Class mark';
  const plural = (n, one, many = `${one}s`) => `${n} ${n === 1 ? one : many}`;

  /* ---------- What the pad knows ---------- */
  function placeOf(k, subject, week) {
    const list = week.filter((c) => c.subject === subject), next = Sc().iso(Sc().schoolDay(new Date())), c = [...list].reverse().find((x) => x.date <= next) || list[0];
    if (!c) return { long: 'Not this week', short: 'Not this week' };
    if (c.kind === 'exam') return { long: `${c.unit}: unit exam`, short: 'Unit exam' };
    if (c.kind === 'free') return { long: c.title, short: 'Review' };
    return { long: `${c.unit}, lesson ${c.i} of ${c.of}`, short: `Lesson ${c.i} of ${c.of}` };
  }
  function model() {
    const Sch = Sc(), kids = S.data.kids, now = Sch.todayIso(), next = Sch.iso(Sch.schoolDay(new Date())), isToday = next === now;
    const days = kids.map((k) => Sch.dayOf(k, next)), numbers = [...new Set(days.flatMap((d) => d.periods.map((c) => c.n)))].sort((x, y) => x - y);
    const clock = new Date(), minutes = clock.getHours() * 60 + clock.getMinutes(), length = +S.data.school.lessonMin || 45;
    const classes = numbers.map((n) => {
      const periods = days.map((d) => d.periods.find((c) => c.n === n)), first = periods.find(Boolean), [h, m] = first.time.split(':').map(Number);
      const held = periods.filter(Boolean);
      return { n, time: first.time, subject: first.subject, title: first.title, ep: first.ep, periods, start: h * 60 + m, done: held.filter((c) => c.state === 'done' || c.mark).length, held: held.length, missing: held.every((c) => c.state === 'missing' && !c.mark) };
    });
    const current = isToday ? classes.find((c) => minutes >= c.start && minutes < c.start + length) : null;
    const upcoming = isToday ? classes.find((c) => c.start > minutes) : null;
    if (current) current.when = 'now';
    if (upcoming) upcoming.when = 'next';
    const off = Sch.offReason(now), over = !!(isToday && classes.length && !current && !upcoming); V.over = over;
    const countable = (c) => c.state !== 'missing', isDone = (c) => c.state === 'done' || c.mark;
    const undone = days.reduce((n, d) => n + d.periods.filter((c) => countable(c) && !isDone(c)).length, 0);
    const line = over ? (undone ? `${plural(undone, 'class', 'classes')} not done today` : 'Everything done today') : off ? `No school today. Next: ${longDay(next)}` : !isToday ? longDay(next) : current ? `Now: ${current.subject}` : upcoming ? `Next: ${upcoming.subject} at ${upcoming.time}` : 'No classes today';
    const rows = D().journalRows();
    const info = kids.map((k, i) => {
      const list = rows.filter((r) => r.kidId === k.id && isScore(r)), final = list.filter((r) => !r.waiting);
      const got = final.reduce((n, r) => n + r.got, 0), total = final.reduce((n, r) => n + r.total, 0), todo = window.kidTodoList(k);
      return { k, average: total ? Sch.showMark(got, total) : '', tests: list.length, latest: list[0], todo: todo.length, late: todo.filter((t) => t.late).length, classesToday: days[i].periods.filter(countable).length, doneToday: days[i].periods.filter((c) => countable(c) && isDone(c)).length, allToday: days[i].periods.length, doneAll: days[i].periods.filter(isDone).length };
    });
    const toRate = window.EPISODES.filter((e) => kids.some((k) => S.hasWatched(k.id, e.id))).filter((e) => !S.rating(e.id, 'parent'));
    const weeks = kids[0] ? Sch.week(kids[0], Sch.monday(Sch.schoolDay(new Date()))).flatMap((d) => d.periods) : [];
    const where = window.CURRICULUM.program.map((p) => ({ subject: p.subject, place: kids[0] ? placeOf(kids[0], p.subject, weeks) : { short: '' } }));
    const focus = current || upcoming || classes.find((c) => c.ep) || classes[0], here = focus && where.find((w) => w.subject === focus.subject);
    return { focus, kids, info, classes, line, next, isToday, off, over, undone, current, upcoming, whereNow: here ? `${here.subject}: ${here.place.short.toLowerCase()}` : `${where.length} subjects`, toRate, subjects: window.CURRICULUM.program.length, scale: S.data.school.scale === 'percent' ? '' : 'out of 12' };
  }

  /* One place for a parent to send an idea or a problem. It lands in Admin, Feedback and checks, and in our notes. */
  function dashFeedback() {
    const kind = V.fbKind || 'idea';
    return `<section class="dpBox dpFeedback"><h2>Send us an idea or a problem</h2>
      <div class="padChoice two" role="group" aria-label="What is it?"><button data-f data-fbkind="idea" aria-pressed="${kind === 'idea'}"><b>An idea</b><span>Something to add or change</span></button><button data-f data-fbkind="problem" aria-pressed="${kind === 'problem'}"><b>Something’s wrong</b><span>It broke, or it’s confusing</span></button></div>
      <label class="fbText" for="fbText">${kind === 'idea' ? 'Your idea' : 'What happened?'}<textarea id="fbText" rows="5" placeholder="${kind === 'idea' ? 'Write it in your own words' : 'Which screen, and what did you see?'}">${esc(V.fbDraft || '')}</textarea></label>
      <p class="fine">Tip: tap the microphone on the iPad keyboard to speak instead of typing.</p>
      <div class="famActions"><button class="solidBtn dark" data-f data-fbsend>Send</button><p class="famSaid" role="status">${esc(V.fbSaid || '')}</p></div></section>`;
  }
  function dashProgram() {
    const rows = window.CURRICULUM.program.map((p) => {
      const seq = Sc().sequence(p.subject).filter((e) => e.kind === 'lesson');
      return `<details class="dpSubject"><summary><b>${esc(p.subject)}</b><span>${plural(p.units.length, 'unit')}, ${plural(seq.length, 'lesson')}, ${seq.filter((e) => e.ep).length} made so far</span></summary><ol>${p.units.map(([unit, count]) => `<li>${esc(unit)}<small>${count} lessons</small></li>`).join('')}</ol></details>`;
    }).join('');
    return `<section class="dpBox"><h2>The full program</h2>${rows}<div class="paperActions"><button class="plainBtn" data-f data-ptab="program">Open the program document</button></div></section>
      <section class="dpBox dpOfficial"><h2>The official program</h2><p>England’s national curriculum, in the government’s own words. It sets goals for each stage, not a lesson list. Years 5 and 6 are key stage 2, and Years 7 to 9 are key stage 3. A revised version is due in 2027, for teaching from 2028.</p>
        <div class="paperActions">${[['science', 'Science'], ['mathematics', 'Maths'], ['english', 'English'], ['history', 'History'], ['geography', 'Geography'], ['computing', 'Computing'], ['languages', 'Languages'], ['england-national-curriculum', 'Everything']].map(([f, t]) => `<a class="plainBtn" href="official/${f}.pdf" target="_blank" rel="noopener">${t}</a>`).join('')}<a class="plainBtn" href="https://www.gov.uk/government/publications/relationships-education-relationships-and-sex-education-rse-and-health-education" target="_blank" rel="noopener">Health and relationships</a></div></section>`;
  }
  /* Text size and contrast: kept with the parent's account, so they follow that parent to any device. */
  function dashReading() {
    const me = S.me() || {}, size = +me.textSize || 1, strong = !!me.contrast;
    return `<section class="dpBox dpReading"><h2>Easier to read</h2>
      <h3>Text size</h3><div class="padChoice" role="group" aria-label="Text size">${SIZES.map(([v, t], i) => `<button data-f data-ptext="${v}" aria-pressed="${v === size}"><b style="font-size:${22 + i * 8}px">Aa</b><span>${t}</span></button>`).join('')}</div>
      <h3>Contrast</h3><div class="padChoice two" role="group" aria-label="Contrast"><button data-f data-pcontrast="0" aria-pressed="${!strong}"><b>Normal</b></button><button data-f data-pcontrast="1" aria-pressed="${strong}"><b>Strong</b><span>Black on white</span></button></div>
      <p class="fine">This changes the parent pad and every parent page. Children’s screens stay as they are.</p></section>`;
  }
  function applyReading() {
    const me = S.me() || {}, size = +me.textSize || 1, body = document.body;
    if (size > 1) body.dataset.ptext = String(size); else delete body.dataset.ptext;
    if (me.contrast) body.dataset.pcontrast = '1'; else delete body.dataset.pcontrast;
  }
  const SHEETS = { feedback: dashFeedback, reading: dashReading };
  const sheetBody = (name) => SHEETS[name]?.() || '';
  const panel = (still) => `<div class="padSheet ${still ? 'still' : ''}" id="padSheet"><div class="padDim" data-padclose></div><aside class="padPanel" role="dialog" aria-modal="true" aria-label="Details"><button class="padClose" data-f data-padclose aria-label="Close">${CLOSE}</button>${sheetBody(V.sheet)}</aside></div>`;

  /* ---------- Three directions of the pad, each learnt from real products. See docs/research/2026-11-07-design-research.md and docs/product/PARENT-PAD-PURPOSE.md.
     Admin is a separate full page in every direction (the gear opens it). Deeper places open as full pages with Back. Short tasks open as a centred sheet. ---------- */
  /* The owner chose Board on 2026-11-09. Every parent screen uses its parts: the pad, inner pages and Admin. */
  /* Prototypes for the owner (2026-11-10): the same pages in two looks, Paper (light) and Channel (deep), beside the Board as it is now. */
  const LOOKS = [['clear', 'Clear', 'One answer first, then each child'], ['light', 'Paper', 'Light, with the Home School red'], ['deep', 'Channel', 'Dark bars like the TV channel'], ['board', 'Now', 'The Board as it is today']];
  const look = () => { const l = S.me()?.padLook; return ['deep', 'board', 'light'].includes(l) ? l : 'clear'; };
  const ROOT = { board: 'dBoard', light: 'dBoard lkNew lkA', deep: 'dBoard lkNew lkB', clear: 'dBoard lkNew lkA lkC' };
  const rootCls = () => ROOT[look()];
  const ICON = {
    gear: GEAR, say: SAY, play: PLAY, close: CLOSE,
    home: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 11l8-7 8 7v9H4z"/><path d="M9 20v-6h6v6"/></svg>',
    person: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></svg>',
    people: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0"/><path d="M16 4.6a3.5 3.5 0 0 1 0 6.8M18 14.2a6.5 6.5 0 0 1 3.5 5.8"/></svg>',
    info: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7.5v.5"/></svg>',
    card: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 10h18"/></svg>',
    out: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 4h4v16h-4M10 8l-4 4 4 4M6 12h11"/></svg>',
    week: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="4" width="18" height="17" rx="2"/><path d="M3 9h18M8 2v4M16 2v4"/></svg>',
    table: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M3 15h18M9 3v18"/></svg>',
    star: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3l2.7 5.6 6.1.8-4.5 4.2 1.1 6.1L12 16.8l-5.4 2.9 1.1-6.1-4.5-4.2 6.1-.8z"/></svg>',
    chart: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/></svg>',
    book: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M2 4h6a4 4 0 0 1 4 4v13a3 3 0 0 0-3-3H2z"/><path d="M22 4h-6a4 4 0 0 0-4 4v13a3 3 0 0 1 3-3h7z"/></svg>',
    bell: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 16V11a6 6 0 0 1 12 0v5l2 2H4z"/><path d="M10 20a2 2 0 0 0 4 0"/></svg>',
    check: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12.5l5 5L20 6.5"/></svg>',
    chev: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5l7 7-7 7"/></svg>',
    back: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5l-7 7 7 7"/></svg>',
    print: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 9V3h12v6M6 18H4v-7h16v7h-2M7 14h10v7H7z"/></svg>',
    flag: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 21V4h11l-2 4 2 4H5"/></svg>',
  };
  const icon = (name, cls = '') => ICON[name].replace('<svg ', `<svg class="ic ${cls}" `);
  const subjectColor = (name) => window.CURRICULUM.program.find((p) => p.subject === name)?.color || '#475569';
  const dayName = (m) => (m.isToday ? 'Today' : Sc().parse(m.next).toLocaleDateString('en-GB', { weekday: 'long' }));
  const kidSay = (x) => (x.allToday ? `${x.doneAll} of ${x.allToday} done` : 'No classes');
  const kidMore = (x) => `${x.average ? `Average ${outOf(x)}` : 'No marks yet'}. ${x.todo ? `${plural(x.todo, 'homework')}${x.late ? `, ${x.late} late` : ''}` : 'No homework'}`;
  const kidFrac = (x) => (x.allToday ? x.doneAll / x.allToday : 0);
  const outOf = (x) => (x.average ? `${x.average}${S.data.school.scale === 'percent' ? '%' : ' out of 12'}` : '');
  const pic = (k) => { const first = ['owl', 'fox', 'panda', 'robot', 'lion', 'dolphin'], p = k.avatar || first[Math.max(0, S.data.kids.findIndex((x) => x.id === k.id)) % first.length]; return `<img src="assets/avatars/${esc(p)}.png" alt="">`; };
  const face = (k, cls = '') => `<span class="pFace ${cls}" style="--kc:${esc(k.color || '#475569')}" aria-hidden="true">${pic(k)}</span>`;
  function daySay(m) {
    const n = m.classes.length, first = m.classes[0], last = m.classes[n - 1], done = m.classes.filter((c) => c.held && c.done === c.held).length;
    if (!n) return m.isToday ? 'No classes today' : `${dayName(m)}: no classes`;
    if (m.over) return m.undone ? `School is over. ${plural(m.undone, 'class', 'classes')} not done` : 'School is over. Everything is done';
    if (m.isToday) return `${plural(n, 'class', 'classes')} today, ${done} done`;
    return `${dayName(m)}: ${plural(n, 'class', 'classes')}, ${first.time} to ${last.time}`;
  }
  const classLabel = (m, c) => (c === m.current ? 'On now' : c === m.upcoming ? 'Next' : !m.isToday && c === m.classes[0] ? `${dayName(m)}’s first class` : m.isToday ? 'Today' : 'Class');
  const stateOf = (p) => (!p ? 'free' : p.mark ? 'mark' : p.state === 'done' ? 'done' : p.state === 'missing' ? 'missing' : 'todo');
  const stateWord = (p) => (!p ? 'Free' : p.mark ? 'Done' : p.state === 'done' ? 'Done' : p.state === 'missing' ? 'No lesson yet' : V.over && p.state === 'now' ? 'Not done' : 'To do');
  const tick = (p) => { const st = stateOf(p); return st === 'missing' ? (look() === 'board' ? '<span class="tickWord" aria-hidden="true">No lesson</span>' : '<span class="tickNone" aria-hidden="true"></span>') : `<span class="tick t-${st === 'mark' ? 'done' : st}" aria-hidden="true">${st === 'done' || st === 'mark' ? icon('check') : ''}</span>`; };
  const iconTools = () => `<div class="tools"><button class="stTool" data-f data-padopen="reading" aria-label="Text size and contrast"><b aria-hidden="true">Aa</b></button><button class="stTool" data-f data-padopen="feedback" aria-label="Tell us an idea or a problem">${icon('say')}</button><button class="stTool" data-f data-ptab="family" aria-label="Admin">${icon('gear')}</button></div>`;
  const tools = () => (look() === 'clear' ? iconTools() : textTools());
  const textTools = () => `<div class="tools"><button class="tool" data-f data-padopen="reading" aria-label="Text size and contrast"><b class="aa" aria-hidden="true">Aa</b><span>Text size</span></button><button class="tool" data-f data-padopen="feedback" aria-label="Tell us an idea or a problem">${icon('say')}<span>Tell us</span></button><button class="tool" data-f data-ptab="family" aria-label="Admin">${icon('gear')}<span>Admin</span></button></div>`;
  /* The parent's one job on the pad: put the lesson on the TV. Tests mark themselves and children work on their own (owner, 2026-11-09). */
  const playBtn = (c, cls) => (c?.ep ? `<button class="${cls} play" data-f data-lessonplay="${esc(c.ep)}">${icon('play')}<span>Play the lesson</span></button>` : c ? `<p class="${cls}None">No lesson made yet for this class</p>` : '');
  /* The bottom bar: the same five buttons, in the same order and place, on every parent page (owner, 2026-11-10: "Yes, these five").
     Only the current place is marked; a page under another marks its parent (Timetable under The week; Test results and a child's page under Children). Admin marks none. */
  const PLACES = [['today', 'Today', 'Today', 'home', 'ptab'], ['kids', 'Children', 'Children', 'people', 'padopen'], ['print', 'Materials', 'Materials', 'print', 'ptab'], ['diary', 'The week', 'Week', 'week', 'ptab'], ['program', 'The program', 'Program', 'book', 'padopen']];
  const PARENT_PLACE = { results: 'kids', journal: 'kids', timetable: 'diary', day: 'today' };
  const barPlace = (current) => (current?.startsWith('kid:') ? 'kids' : PARENT_PLACE[current] || current);
  const nav = (current) => { const here = barPlace(current), one = S.data.kids.length === 1;
    return `<nav class="pzNav" aria-label="Places">${PLACES.map(([key, word, short, ic, kind]) => { const w = key === 'kids' && one ? 'Your child' : word, sh = key === 'kids' && one ? 'Child' : short; return `<button data-f data-${kind}="${key}" aria-current="${key === here ? 'page' : 'false'}">${icon(ic)}<span class="long">${w}</span><span class="short" aria-hidden="true">${sh}</span></button>`; }).join('')}</nav>`; };
  /* A list that shows what fits, then a named link to the rest. Filled in by fit() after drawing. */
  const fitList = (cls, items, open, word) => `<ol class="${cls}" data-fit="${open}" data-fitword="${word}">${items.join('')}</ol>`;
  const topicOf = (ep) => window.EPISODES.find((e) => e.id === (ep || 'skeleton'))?.topic || 'Lesson';
  /* What each child has: tests to do (they appear by themselves after a lesson), lessons to catch up, and their last result. */
  function status(k) {
    const tests = (window.kidTodoList?.(k) || []).filter((t) => t.kind === 'test' || t.kind === 'retest');
    const behind = window.kidCatchUp?.(k) || [];
    const last = S.data.attempts.filter((a) => a.kidId === k.id && (a.kind === 'test' || a.kind === 'retest')).sort((a, b) => new Date(b.at) - new Date(a.at))[0];
    return { tests, behind, last, testsSay: tests.length ? `${plural(tests.length, 'test')} to do` : 'All tests done', behindSay: behind.length ? `${plural(behind.length, 'lesson')} to catch up` : '', lastSay: last ? `${topicOf(last.ep)}: ${last.score} of ${last.total} right` : 'No tests yet' };
  }
  const statusLine = (st) => `<span class="stLine ${st.tests.length ? 'stTodo' : 'stOk'}">${st.tests.length ? icon('flag') : icon('check')}${esc(st.testsSay)}</span>${st.behind.length ? `<span class="stLine stBehind">${esc(st.behindSay)}</span>` : ''}`;

  /* ---------- Board: learnt from Skylight Calendar's Day view and Things 3's Today. Children side by side. ---------- */
  /* A progress circle: classes done today, out of the day's classes. */
  const ring = (x) => { const r = 42, c = 2 * Math.PI * r, f = kidFrac(x); return `<span class="bdRing" role="img" aria-label="${esc(kidSay(x))}"><svg viewBox="0 0 100 100" aria-hidden="true"><circle class="rgBg" cx="50" cy="50" r="${r}"/>${f > 0 ? `<circle class="rgFg" cx="50" cy="50" r="${r}" stroke-dasharray="${(c * f).toFixed(1)} ${c.toFixed(1)}" transform="rotate(-90 50 50)"/>` : ''}</svg><b>${x.doneAll}/${x.allToday}</b></span>`; };
  /* The prototypes' top card: the lesson to put on the TV. Today's class with a lesson first; if today has none, the lesson most children still need to catch up. */
  function heroNew(m) {
    const withEp = m.classes.filter((c) => c.ep), pick = [m.current, m.upcoming].find((c) => c?.ep) || withEp.find((c) => c.done < c.held) || withEp[0];
    if (pick) return `<section class="bdNext" style="--sc:${subjectColor(pick.subject)}"><span class="bdNextDot" aria-hidden="true"></span><div><small>${esc(pick === m.current ? `On now, ${pick.time}` : pick === m.upcoming ? `Next, ${pick.time}` : `${dayName(m)}’s lesson, ${pick.time}`)}</small><b>${esc(pick.subject)}</b><span>${esc(pick.title)}</span></div>${playBtn(pick, 'bdPlay')}</section>`;
    const need = {}; m.kids.forEach((k) => (window.kidCatchUp?.(k) || []).forEach((t) => { (need[t.ep] ||= { t, who: [] }).who.push(k.name); }));
    const top = Object.values(need).sort((a, b) => b.who.length - a.who.length)[0];
    if (!top) return `<section class="bdNext calm"><div><small>${esc(dayName(m))}</small><b>No lesson to play</b><span>Nothing to catch up either</span></div></section>`;
    const who = top.who.length === m.kids.length ? 'Everyone still needs it' : `${top.who.join(' and ')} still ${top.who.length === 1 ? 'needs' : 'need'} it`;
    return `<section class="bdNext" style="--sc:${subjectColor(top.t.sub.split(',')[0])}"><span class="bdNextDot" aria-hidden="true"></span><div><small>No lesson made for today’s classes. To catch up:</small><b>${esc(top.t.title)}</b><span>${esc(top.t.sub.split(',')[0])}. ${esc(who)}</span></div><button class="bdPlay play" data-f data-lessonplay="${esc(top.t.ep)}">${icon('play')}<span>Play on the TV</span></button></section>`;
  }
  function boardNew(m) {
    const kid = V.kid && m.info.some((x) => x.k.id === V.kid) ? V.kid : m.info[0]?.k.id, n = m.classes.length;
    const cols = m.info.map((x, i) => {
      const st = status(x.k), rows = [];
      [['Morning', (cl) => cl.start < 720], ['Afternoon', (cl) => cl.start >= 720]].forEach(([name, test]) => {
        const day = m.classes.filter(test).filter((cl) => cl.periods[i]);
        if (!day.length) return;
        day.forEach((cl) => { const p = cl.periods[i], none = stateOf(p) === 'missing'; rows.push(`<li class="bdRow ${cl.when || ''} ${none ? 'none' : ''}"><i style="--sc:${subjectColor(cl.subject)}" aria-hidden="true"></i><span class="bdRowText"><b>${esc(cl.subject)}</b><small><time>${esc(cl.time)}</time> <span class="bdTitle">${none ? 'No lesson yet' : esc(cl.title)}</span></small></span>${none ? '' : tick(p)}<span class="srOnly">${esc(stateWord(p))}</span></li>`); });
      });
      const facts = `<ul class="bdFacts"><li class="${st.tests.length ? 'fTodo' : 'fOk'}">${st.tests.length ? icon('flag') : icon('check')}<span>${esc(st.testsSay)}</span></li><li>${icon('book')}<span>${esc(st.behindSay || 'Nothing to catch up')}</span></li><li>${icon('chart')}<span>${esc(st.last ? `Last test: ${st.lastSay}` : st.lastSay)}</span></li></ul>`;
      return `<section class="bdCol ${x.k.id === kid ? 'on' : ''}" style="--kc:${esc(x.k.color || '#475569')}" aria-label="${esc(x.k.name)}"><button class="bdWho" data-f data-padopen="kid:${esc(x.k.id)}">${face(x.k, 'pFaceM')}<span class="bdWhoText"><b>${esc(x.k.name)}</b><small>${esc(kidSay(x))}</small></span>${ring(x)}${icon('chev', 'go')}</button>${facts}${fitList('bdList', rows, `kid:${x.k.id}`, 'classes')}</section>`;
    }).join('');
    const pick = `<div class="bdPick" role="group" aria-label="Show one child">${m.info.map((x) => `<button data-f data-padkid="${esc(x.k.id)}" aria-pressed="${x.k.id === kid}">${face(x.k)}<span>${esc(x.k.name)}</span></button>`).join('')}</div>`;
    const sub = n ? `${plural(n, 'class', 'classes')}, ${m.classes[0].time} to ${m.classes[n - 1].time}` : 'No classes';
    return `<header class="bdHead"><span class="brandMark" aria-hidden="true">Home School</span><div class="bdDay"><h1>${esc(m.isToday ? longDay(m.next) : `Next school day: ${longDay(m.next)}`)}</h1><p>${esc(sub)}</p></div>${tools()}</header>
      ${heroNew(m)}${pick}<main class="bdCols" style="--n:${m.info.length}">${cols}</main>`;
  }
  /* Clear (owner, 2026-11-10): built by the hierarchy ladder in docs/rules/VISUAL-HIERARCHY.md.
     1 main: one sentence answering "Is everyone OK?", with its one action. 2 secondary: each child on one line. 3 supporting: grey details. 4 quiet: date, tools, tabs.
     The day's classes are one tap deeper, on each child's page. */
  const listNames = (a) => (a.length < 3 ? a.join(' and ') : `${a.slice(0, -1).join(', ')} and ${a[a.length - 1]}`);
  const allWord = (n) => (n === 2 ? 'Both' : `All ${['', 'one', 'two', 'three', 'four', 'five', 'six'][n] || n}`);
  /* Today, Stage (owner, 2026-11-10: picked "A Stage" in /pad-lab/round3/). The pad's one job is to play today's lesson on the TV.
     Very little, very big: the lesson on now (or next, or to catch up) fills most of the screen with its own picture and one Play;
     a few more lessons wait on the right as picture cards; four big buttons at the bottom; header tools are icons only. */
  const epOf = (id) => window.EPISODES.find((e) => e.id === id);
  const posterOf = (id) => { const f = epOf(id)?.scenes?.find((x) => x.poster)?.poster; return f ? `assets/img/${f}` : ''; };
  /* Some covers have their own big words printed in them; behind the big white title they clash. The big card uses the lesson's next picture instead. */
  const WORDS_IN_PICTURE = { 'spanish-cover.jpg': 'spanish-casa.jpg', 'emotions-cover.jpg': 'em-ch1.jpg' };
  const heroPoster = (id) => { const p = posterOf(id), f = p.split('/').pop(); return WORDS_IN_PICTURE[f] ? `assets/img/${WORDS_IN_PICTURE[f]}` : p; };
  function catchUps(m) {
    const need = {}; m.kids.forEach((k) => (window.kidCatchUp?.(k) || []).forEach((t) => { (need[t.ep] ||= { ep: t.ep, title: t.title, subject: t.sub.split(',')[0], who: [] }).who.push(k.name); }));
    return Object.values(need).sort((a, b) => b.who.length - a.who.length);
  }
  const whoMissed = (m, x) => (m.kids.length === 1 ? 'Missed' : x.who.length === m.kids.length ? `${allWord(m.kids.length)} missed it` : `${listNames(x.who)} missed it`);
  /* Lessons on the next school days, for when today has nothing left to play */
  function comingUp(m) {
    const Sch = Sc(), kid = m.kids[0], out = []; if (!kid) return out;
    for (let i = 1, d = new Date(); i <= 14 && out.length < 3; i++) {
      const date = new Date(d.getTime() + i * 86400000), iso = Sch.iso(date), day = Sch.dayOf(kid, iso);
      if (!day || day.off) continue;
      day.periods.filter((p) => p.ep).forEach((p) => { if (out.length < 3 && !out.some((o) => o.ep === p.ep)) out.push({ ep: p.ep, title: p.title, subject: p.subject, when: `${date.toLocaleDateString('en-GB', { weekday: 'long' })} at ${p.time}` }); });
    }
    return out;
  }
  function stage(m) {
    const ups = catchUps(m), withEp = m.classes.filter((c) => c.ep), used = new Set();
    let hero = null;
    const c = [m.current, m.upcoming].find((x) => x?.ep) || withEp.find((x) => x.done < x.held);
    if (c) hero = { ep: c.ep, tag: c === m.current ? `On now, ${c.time}` : c === m.upcoming ? `Next, ${c.time}` : `Today at ${c.time}`, title: epOf(c.ep)?.title || c.title, sub: c.subject };
    else if (ups[0]) hero = { ep: ups[0].ep, tag: 'To catch up', title: ups[0].title, sub: `${ups[0].subject}. ${whoMissed(m, ups[0])}.` };
    else { const n = comingUp(m)[0]; if (n) hero = { ep: n.ep, tag: n.when, title: epOf(n.ep)?.title || n.title, sub: `${n.subject}. The next lesson; it can be watched early.` }; }
    /* Nothing new to play: offer the newest lessons to watch again, never an empty card */
    const again = window.EPISODES.filter((e) => !e.extra && !e.review).slice().reverse();
    if (!hero && again[0]) hero = { ep: again[0].id, tag: 'Nothing new today', title: again[0].title, sub: again[0].subject || 'Science' };
    /* Don't repeat the subject when the title already names it ("…in Spanish", "Spanish") */
    if (hero && hero.sub && hero.title.toLowerCase().includes(hero.sub.split('.')[0].toLowerCase())) hero.sub = hero.sub.split('. ').slice(1).join('. ');
    if (hero) used.add(hero.ep);
    const cards = [];
    withEp.filter((x) => !used.has(x.ep) && x.done < x.held && (!hero || !m.upcoming || x.start >= (m.current || m.upcoming).start)).forEach((x) => { used.add(x.ep); cards.push({ ep: x.ep, when: `${x.time}, ${x.subject}`, title: epOf(x.ep)?.title || x.title }); });
    ups.filter((x) => !used.has(x.ep)).forEach((x) => { used.add(x.ep); cards.push({ ep: x.ep, kind: 'catch', when: x.who.length === m.kids.length ? x.subject : `${whoMissed(m, x)}. ${x.subject}`, title: x.title }); });
    if (cards.length < 3) comingUp(m).filter((x) => !used.has(x.ep)).forEach((x) => { used.add(x.ep); cards.push({ ep: x.ep, when: `${x.when}, ${x.subject}`, title: epOf(x.ep)?.title || x.title }); });
    if (cards.length < 3) again.filter((e) => !used.has(e.id)).slice(0, 3 - cards.length).forEach((e) => { used.add(e.id); cards.push({ ep: e.id, kind: 'again', when: e.subject || 'Science', title: e.title }); });
    const title = m.classes.some((x) => x.ep) || m.isToday ? 'Today' : dayName(m);
    const heroHtml = hero ? `<section class="stHero" aria-labelledby="stTitle">${heroPoster(hero.ep) ? `<img src="${esc(heroPoster(hero.ep))}" alt="">` : ''}<div class="stHeroText"><span class="stTag">${esc(hero.tag)}</span><h2 id="stTitle">${esc(hero.title)}</h2>${hero.sub ? `<p>${esc(hero.sub)}</p>` : ''}<button class="stPlay play" data-f data-lessonplay="${esc(hero.ep)}">${icon('play')}<span>Play on the TV</span></button></div></section>`
      : `<section class="stHero none"><div class="stHeroText"><span class="stTag">${esc(dayName(m))}</span><h2 id="stTitle">No lessons made yet</h2><p>New lessons appear here when they are ready.</p></div></section>`;
    const fits = (+S.me()?.textSize || 1) > 1 ? 2 : 3;
    const cardsHtml = cards.slice(0, fits).map((x) => `<button class="stCard" data-f data-lessonplay="${esc(x.ep)}" aria-label="Play ${esc(x.title)}"><figure>${posterOf(x.ep) ? `<img src="${esc(posterOf(x.ep))}" alt="">` : ''}<span aria-hidden="true">${icon('play')}</span></figure><span class="stCardText"><small>${esc(x.when)}</small><b>${esc(x.title)}</b></span></button>`).join('');
    const shown = cards.slice(0, 3), later = shown.some((x) => /^\d/.test(x.when)) ? 'Later today' : shown.every((x) => x.kind === 'catch') ? 'Also to catch up' : shown.every((x) => x.kind === 'again') ? 'Watch again' : 'Also to play';
    return `<header class="stHead"><h1>${esc(title)}<small>${esc(longDay(m.isToday ? Sc().todayIso() : m.next))}</small></h1><button class="stTool" data-f data-padopen="reading" aria-label="Text size and contrast"><b aria-hidden="true">Aa</b></button><button class="stTool" data-f data-padopen="feedback" aria-label="Tell us an idea or a problem">${icon('say')}</button><button class="stTool" data-f data-ptab="family" aria-label="Admin">${icon('gear')}</button></header>
      <main class="stMain ${cards.length ? '' : 'solo'}">${heroHtml}${cards.length ? `<aside class="stSide" aria-label="${esc(later)}"><h2>${esc(later)}${cards.length > fits ? `: ${fits} of ${cards.length}` : ''}</h2>${cardsHtml}</aside>` : ''}</main>`;
  }
  function board(m) {
    if (look() === 'clear') return stage(m);
    if (look() !== 'board') return boardNew(m);
    const c = m.focus, kid = V.kid && m.info.some((x) => x.k.id === V.kid) ? V.kid : m.info[0]?.k.id;
    const next = c ? `<section class="bdNext" style="--sc:${subjectColor(c.subject)}" aria-label="${esc(classLabel(m, c))}"><span class="bdNextDot" aria-hidden="true"></span><div><small>${esc(classLabel(m, c))}, ${esc(c.time)}</small><b>${esc(c.subject)}</b><span>${esc(c.title)}</span></div>${playBtn(c, 'bdPlay')}</section>` : '';
    const cols = m.info.map((x, i) => {
      const st = status(x.k), rows = [];
      [['Morning', (cl) => cl.start < 720], ['Afternoon', (cl) => cl.start >= 720]].forEach(([name, test]) => {
        const day = m.classes.filter(test).filter((cl) => cl.periods[i]);
        if (!day.length) return;
        rows.push(`<li class="bdGroup">${name}</li>`);
        day.forEach((cl) => { const p = cl.periods[i]; rows.push(`<li class="bdRow ${cl.when || ''}"><i style="--sc:${subjectColor(cl.subject)}" aria-hidden="true"></i><span class="bdRowText"><time>${esc(cl.time)}</time><b>${esc(cl.subject)}</b></span>${tick(p)}<span class="srOnly">${esc(stateWord(p))}</span></li>`); });
      });
      return `<section class="bdCol ${x.k.id === kid ? 'on' : ''}" style="--kc:${esc(x.k.color || '#475569')}" aria-label="${esc(x.k.name)}"><button class="bdWho" data-f data-padopen="kid:${esc(x.k.id)}">${face(x.k, 'pFaceM')}<span class="bdWhoText"><b>${esc(x.k.name)}</b>${statusLine(st)}<small class="bdLast">${esc(st.lastSay)}</small></span>${ring(x)}</button>${fitList('bdList', rows, `kid:${x.k.id}`, 'classes')}</section>`;
    }).join('');
    const pick = `<div class="bdPick" role="group" aria-label="Show one child">${m.info.map((x) => `<button data-f data-padkid="${esc(x.k.id)}" aria-pressed="${x.k.id === kid}">${face(x.k)}<span>${esc(x.k.name)}</span></button>`).join('')}</div>`;
    return `<header class="bdHead"><span class="brandMark" aria-hidden="true">Home School</span><div class="bdDay"><p>${esc(longDay(Sc().todayIso()))}</p><h1>${esc(daySay(m))}</h1></div>${tools()}</header>
      ${next}${pick}<main class="bdCols" style="--n:${m.info.length}">${cols}</main>`;
  }


  /* ---------- Full pages, opened from the pad, with Back. ---------- */
  const resultRow = (a) => `<li class="rsRow"><span><b>${esc(topicOf(a.ep))}</b><small>${a.kind === 'retest' ? 'Re-test' : 'Lesson test'}, ${esc(D().shortDate(a.at))}</small></span><span class="rsScore"><b>${a.score} of ${a.total}</b></span></li>`;
  const examRow = ({ r, t }) => `<li class="rsRow"><span><b>${esc(window.ExamData?.exam?.title || 'Unit exam')}</b><small>Exam, ${esc(D().shortDate(r.at))}</small></span><span class="rsScore"><b>${t.got} of ${t.total}</b></span></li>`;
  function kidPage(id) {
    const m = model(), i = m.kids.findIndex((k) => k.id === id), k = m.kids[i]; if (!k) return '';
    const st = status(k), day = m.classes.filter((cl) => cl.periods[i]), x = m.info[i];
    const results = S.data.attempts.filter((a) => a.kidId === k.id && (a.kind === 'test' || a.kind === 'retest')).sort((a, b) => new Date(b.at) - new Date(a.at));
    const exams = S.data.exams.filter((r) => r.kidId === k.id).map((r) => ({ r, t: window.examTotals(r) }));
    if (look() === 'board') return kidPageOld(k, i, m, st, day, results);
    const card = `<div class="kpBand">${face(k, 'pFaceL')}<p><b>${esc(m.isToday ? 'Today' : dayName(m))}: ${esc(kidSay(x).toLowerCase())}</b><span>${esc(st.testsSay)}. ${esc(st.behindSay || 'Nothing to catch up')}.</span></p>${ring(x)}</div>`;
    const todayBox = `<section class="kpBox"><h2>${esc(m.isToday ? 'Today' : longDay(m.next))}</h2>${day.length ? `<ol class="kpDay">${day.map((cl) => { const p = cl.periods[i], none = stateOf(p) === 'missing'; return `<li class="${cl.when || ''} ${none ? 'none' : ''}"><i style="--sc:${subjectColor(cl.subject)}" aria-hidden="true"></i><time>${esc(cl.time)}</time><span><b>${esc(cl.subject)}</b><small>${none ? 'No lesson yet' : esc(cl.title)}</small></span>${none ? '' : tick(p)}<span class="srOnly">${esc(stateWord(p))}</span></li>`; }).join('')}</ol>` : '<p class="kpEmpty">No classes on this day.</p>'}</section>`;
    const testsBox = `<section class="kpBox"><h2>Tests to do</h2>${st.tests.length ? `<ul class="kpList">${st.tests.map((t) => `<li><span><b>${esc(t.title)}</b><small>${esc(t.sub)}</small></span></li>`).join('')}</ul><p class="kpNote">${esc(k.name)} does these on their own device.</p>` : `<p class="kpEmpty">${icon('check')}All done. A new test appears by itself after each lesson.</p>`}</section>`;
    const behindBox = st.behind.length ? `<section class="kpBox"><h2>To catch up</h2><ul class="kpList">${st.behind.map((t) => `<li><span><b>${esc(t.title)}</b><small>${esc(t.sub)}</small></span><button class="kpWatch" data-f data-lessonplay="${esc(t.ep)}">${icon('play')}<span>Watch</span></button></li>`).join('')}</ul></section>` : '';
    const resBox = `<section class="kpBox"><div class="kpBoxHead"><h2>Test results</h2><button class="pgAction" data-f data-padopen="results">${icon('chart')}<span>Everyone’s results</span></button></div>${results.length || exams.length ? `<ul class="rsList">${exams.map(examRow).join('')}${results.map(resultRow).join('')}</ul>` : '<p class="kpEmpty">No tests yet. Scores appear here by themselves.</p>'}</section>`;
    const signBox = `<section class="kpBox kpSign"><div class="kpBoxHead"><h2>Signing in</h2><button class="pgAction" data-f data-ptab="family" data-pperson="${esc(k.id)}">${icon('chev')}<span>Change password</span></button></div><p>${esc(k.name)} signs in with <b>${esc(k.username)}</b> and the password <b>${esc(k.pin)}</b></p></section>`;
    return `<div class="kpGrid" style="--kc:${esc(k.color || '#475569')}">${card}<div class="kpMain">${todayBox}<div class="kpStack">${testsBox}${behindBox}</div>${resBox}${signBox}</div></div>`;
  }
  function kidPageOld(k, i, m, st, day, results) {
    return `<section class="dpBox"><h2>${esc(m.isToday ? 'Today' : longDay(m.next))}</h2><ul class="pRows">${day.map((cl) => { const p = cl.periods[i]; return `<li class="pRow"><span><b>${esc(cl.time)} ${esc(cl.subject)}</b><small>${esc(cl.title)}</small></span><span class="pGo">${esc(stateWord(p))}</span></li>`; }).join('') || '<li>No classes on this day.</li>'}</ul></section>
      <section class="dpBox"><h2>Tests to do</h2>${st.tests.length ? `<ul class="pRows">${st.tests.map((t) => `<li class="pRow"><span><b>${esc(t.title)}</b><small>${esc(t.sub)}. ${esc(k.name)} does it on their own device</small></span></li>`).join('')}</ul>` : `<p>All tests done. New ones appear by themselves after each lesson.</p>`}</section>
      ${st.behind.length ? `<section class="dpBox"><h2>To catch up</h2><ul class="pRows">${st.behind.map((t) => `<li class="pRow"><span><b>${esc(t.title)}</b><small>${esc(t.sub)}</small></span><button class="pGo plainBtn" data-f data-lessonplay="${esc(t.ep)}">Watch</button></li>`).join('')}</ul></section>` : ''}
      <section class="dpBox"><h2>Test results</h2>${results.length ? `<ul class="pRows">${results.map((a) => `<li class="pRow"><span><b>${esc(topicOf(a.ep))}</b><small>${a.kind === 'retest' ? 'Re-test' : 'Lesson test'}, ${esc(D().shortDate(a.at))}</small></span><span class="pGo">${a.score} of ${a.total}</span></li>`).join('')}</ul>` : '<p>No tests yet.</p>'}</section>`;
  }
  function resultsPage() {
    if (look() !== 'board') {
      const cols = S.data.kids.map((k) => {
        const rows = S.data.attempts.filter((a) => a.kidId === k.id && (a.kind === 'test' || a.kind === 'retest')).sort((a, b) => new Date(b.at) - new Date(a.at));
        const exams = S.data.exams.filter((r) => r.kidId === k.id).map((r) => ({ r, t: window.examTotals(r) })), n = rows.length + exams.length;
        return `<section class="rsCol" style="--kc:${esc(k.color || '#475569')}"><button class="rsWho" data-f data-padopen="kid:${esc(k.id)}">${face(k, 'pFaceM')}<span><b>${esc(k.name)}</b><small>${n ? plural(n, 'result') : 'No results yet'}</small></span>${icon('chev', 'go')}</button>${n ? `<ul class="rsList">${exams.map(examRow).join('')}${rows.map(resultRow).join('')}</ul>` : `<p class="rsEmpty">After each lesson ${esc(k.name)} takes a short test on their own device. The score shows here by itself.</p>`}</section>`;
      }).join('');
      return `<div class="rsCols" style="--n:${S.data.kids.length}">${cols}</div>`;
    }
    const rows = S.data.attempts.filter((a) => a.kind === 'test' || a.kind === 'retest').sort((a, b) => new Date(b.at) - new Date(a.at));
    const exams = S.data.exams.map((r) => ({ r, t: window.examTotals(r) }));
    return `<section class="dpBox"><h2>Test results</h2>${rows.length ? `<ul class="pRows">${rows.map((a) => `<li class="pRow">${face(S.kid(a.kidId) || { color: '#475569' })}<span><b>${esc(S.kid(a.kidId)?.name || '')}: ${esc(topicOf(a.ep))}</b><small>${a.kind === 'retest' ? 'Re-test' : 'Lesson test'}, ${esc(D().shortDate(a.at))}</small></span><span class="pGo">${a.score} of ${a.total}</span></li>`).join('')}</ul>` : '<p>No tests yet. Results appear here by themselves.</p>'}</section>
      ${exams.length ? `<section class="dpBox"><h2>Exams</h2><ul class="pRows">${exams.map(({ r, t }) => `<li class="pRow">${face(S.kid(r.kidId) || { color: '#475569' })}<span><b>${esc(S.kid(r.kidId)?.name || '')}: ${esc(window.ExamData?.exam?.title || 'Unit exam')}</b><small>${esc(D().shortDate(r.at))}</small></span><span class="pGo">${t.got} of ${t.total}</span></li>`).join('')}</ul></section>` : ''}`;
  }

  const PAGES = { day: ['The whole day', () => dayPage()], results: ['Test results', () => resultsPage()], program: ['The program', () => dashProgram()], kids: ['Children', () => kidsPage()] };
  function dayPage() {
    const m = model();
    return m.info.map((x, i) => `<section class="dpBox"><h2>${esc(x.k.name)}</h2><ul class="pRows">${m.classes.filter((cl) => cl.periods[i]).map((cl) => { const p = cl.periods[i]; return `<li class="pRow"><span><b>${esc(cl.time)} ${esc(cl.subject)}</b><small>${esc(cl.title)}</small></span>${cl.ep ? `<button class="pGo plainBtn" data-f data-lessonplay="${esc(cl.ep)}">Play</button>` : `<span class="pGo">${esc(stateWord(p))}</span>`}</li>`; }).join('')}</ul></section>`).join('');
  }
  function kidsPage() {
    const m = model();
    return `${look() === 'clear' ? `<div class="pgActions"><button class="pgAction" data-f data-padopen="results">${icon('chart')}<span>Test results</span></button></div>` : ''}<section class="dpBox"><h2>Children</h2><ul class="pRows">${m.info.map((x) => { const st = status(x.k); return `<li><button class="pRow" data-f data-padopen="kid:${esc(x.k.id)}">${face(x.k)}<span><b>${esc(x.k.name)}</b><small>${esc(st.testsSay)}${st.behind.length ? `. ${esc(st.behindSay)}` : ''}. ${esc(st.lastSay)}</small></span></button></li>`; }).join('')}</ul></section>`;
  }
  /* Every screen that isn't the pad uses one frame: Back, a title, the three tools, the content, and the bottom menu. */
  const frame = (cls, back, title, body, current) => `<div class="padRoot pz ${rootCls()} ${cls}"><header class="pgHead">${back}<h1>${esc(title)}</h1>${tools()}</header>${body}${nav(current)}${V.sheet ? panel(true) : ''}</div>`;
  const backBtn = (attr, word = 'Back') => `<button class="pgBack" data-f ${attr}>${icon('back')}<span>${word}</span></button>`;
  function page() {
    const name = V.page, title = name.startsWith('kid:') ? S.kid(name.slice(4))?.name || '' : PAGES[name]?.[0] || '';
    const body = name.startsWith('kid:') ? kidPage(name.slice(4)) : PAGES[name]?.[1]() || '';
    return frame('isPage', backBtn('data-padback'), title, `<main class="pgMain pg-${name.split(':')[0]} ${name.startsWith('kid:') && look() === 'board' ? 'kidPage' : ''}"><div class="pgIn">${body}</div></main>`, name);
  }
  function html() {
    const m = model();
    if (!m.kids.length) return frame('', '', 'Home School', '<main class="padEmpty"><h1>Add a child to begin</h1><button class="solidBtn" data-f data-ptab="family">Add a child</button></main>', 'today');
    if (V.page) return page();
    return `<div class="padRoot pz ${rootCls()}">${board(m)}${nav('today')}${V.sheet ? panel(true) : ''}</div>`;
  }
  /* Admin: a one-screen page with big section buttons on the left and the chosen section on the right. */
  const ADMIN_ICON = { family: 'people', me: 'person', plan: 'book', how: 'info', account: 'card', health: 'chart' };
  function adminShell(list, tab, main) {
    const sections = list.map(([k, t]) => `<button data-f data-ptab="${k}" aria-current="${k === tab ? 'page' : 'false'}">${icon(ADMIN_ICON[k] || 'info')}<span>${esc(t)}</span></button>`).join('');
    return frame('isAdmin', backBtn('data-ptab="today"', 'Back to the pad'), 'Admin', `<main class="admMain"><nav class="admNav" aria-label="Admin">${sections}<button class="admOut" data-f data-signout>${icon('out')}<span>Sign out</span></button></nav><section class="admPane">${main}</section></main>`, '');
  }
  /* Pages drawn by other files (the week, the timetable, the program document): the same frame around their content. */
  const PAGE_TITLE = { diary: 'The week', timetable: 'Timetable', program: 'The program', journal: 'Every score', print: 'Materials' };
  /* A page's own way to the page under it: The week leads to the Timetable, and the Timetable back to The week. */
  const PAGE_LINK = { diary: ['timetable', 'table', 'Timetable'], timetable: ['diary', 'week', 'The week'] };
  function pageShell(tab, main, fit) {
    const link = PAGE_LINK[tab], title = PAGE_TITLE[tab] || '';
    return frame(`isPage outside ${fit ? 'fit' : ''}`, backBtn('data-ptab="today"', 'Back'), title, `<main class="pgMain cabMain">${link && look() === 'clear' ? `<div class="pgActions"><button class="pgAction" data-f data-ptab="${link[0]}">${icon(link[1])}<span>${link[2]}</span></button></div>` : ''}<div class="pgOut">${main}</div></main>`, tab);
  }

  /* After drawing: each list shows the rows that fit, then a named link to the rest. Nothing is cut and nothing scrolls. */
  function fit() {
    document.querySelectorAll('.pz [data-fit]').forEach((list) => {
      list.querySelector('.fitMore')?.remove();
      const items = [...list.children]; items.forEach((li) => { li.hidden = false; });
      if (list.scrollHeight <= list.clientHeight + 1) return;
      const more = document.createElement('li'); more.className = 'fitMore';
      more.innerHTML = `<button class="fitBtn" data-f data-padopen="${esc(list.dataset.fit)}"></button>`; list.append(more);
      let hidden = 0;
      for (let i = items.length - 1; i >= 0 && list.scrollHeight > list.clientHeight + 1; i--) { items[i].hidden = true; hidden++; }
      while (items.length && items[items.length - hidden - 1]?.classList.contains('bdGroup')) { items[items.length - hidden - 1].hidden = true; hidden++; }
      const shown = items.filter((li) => !li.hidden && !li.classList.contains('bdGroup')).length, total = items.filter((li) => !li.classList.contains('bdGroup')).length;
      more.firstChild.textContent = shown ? `All ${total} ${list.dataset.fitword}` : `Open: ${total} ${list.dataset.fitword}`;
    });
  }
  window.addEventListener('resize', () => { if (document.querySelector('.pz [data-fit]')) fit(); });
  /* Fonts and pictures can change sizes after drawing, so fit again once they're ready. */
  const fitSoon = () => { fit(); document.fonts?.ready.then(fit); setTimeout(fit, 350); };
  const adminBtn = () => `<button class="padAdmin" data-f data-ptab="family">${GEAR}<span>Admin</span></button>`;
  const adminClass = () => 'adm-board';
  function lookChoice() { return ''; }

  window.Pad = { V, html, fit: fitSoon, applyReading, reading: dashReading, lookChoice, adminBtn, adminClass, adminShell, pageShell, LOOKS };

  /* ---------- Taps ---------- */
  const root = () => document.querySelector('.padRoot');
  function closePanel() {
    const sheet = document.getElementById('padSheet'), was = V.sheet; if (!sheet) return;
    V.sheet = null;
    sheet.classList.remove('still'); sheet.classList.add('leaving');
    setTimeout(() => sheet.remove(), 190);
    document.querySelector(`[data-padopen="${CSS.escape(was)}"]`)?.focus({ preventScroll: true });
  }
  function redraw() {
    const scroll = document.querySelector('.padPanel')?.scrollTop || 0;
    window.drawParent();
    const p = document.querySelector('.padPanel'); if (p) p.scrollTop = scroll;
  }
  document.addEventListener('click', (ev) => {
    const el = ev.target.closest('button, [data-padclose]'); if (!el) return;
    const d = el.dataset;
    if (d.ptab || d.home != null || d.signout != null) { V.sheet = null; V.page = null; return; }
    if (d.padback != null) { V.page = V.pageBack || null; V.pageBack = null; V.sheet = null; redraw(); document.querySelector('.pgBack, .pz h1')?.focus({ preventScroll: true }); return; }
    if (d.padkid != null) { V.kid = d.padkid || ''; redraw(); document.querySelector(`[data-padkid="${CSS.escape(d.padkid)}"]`)?.focus({ preventScroll: true }); return; }
    if (d.padopen && !['reading', 'feedback'].includes(d.padopen) && !document.querySelector('.padRoot:not(.outside):not(.isAdmin)')) { V.page = d.padopen; V.sheet = null; window.renderParent('today'); return; }
    if (d.padopen && !['reading', 'feedback'].includes(d.padopen)) { V.pageBack = V.page && d.padopen.startsWith('kid:') && V.page === 'kids' ? 'kids' : null; V.page = d.padopen; V.sheet = null; redraw(); window.scrollTo(0, 0); document.querySelector('.pgBack')?.focus({ preventScroll: true }); return; }
    if (d.padopen) { V.sheet = d.padopen; document.getElementById('padSheet')?.remove(); root().insertAdjacentHTML('beforeend', panel(false)); document.querySelector('.padClose').focus({ preventScroll: true }); return; }
    if (d.padclose != null) { closePanel(); return; }
    if (d.fbkind) { V.fbDraft = document.getElementById('fbText')?.value || ''; V.fbKind = d.fbkind; V.fbSaid = ''; redraw(); document.querySelector(`[data-fbkind="${d.fbkind}"]`)?.focus({ preventScroll: true }); return; }
    if (d.fbsend != null) {
      const text = document.getElementById('fbText').value.trim();
      if (!text) { V.fbSaid = 'Write a few words first.'; redraw(); document.getElementById('fbText').focus(); return; }
      S.sendFeedback(V.fbKind || 'idea', text).then((ok) => { V.fbDraft = ok ? '' : text; V.fbSaid = ok ? 'Thank you. It’s saved, and we’ll read it.' : 'It’s saved on this iPad, but didn’t reach the Mac. Check the Wi-Fi.'; redraw(); });
      return;
    }
    if (d.ptext || d.pcontrast) {
      const me = S.me(); if (me) Object.assign(me, d.ptext ? { textSize: +d.ptext } : { contrast: d.pcontrast === '1' });
      S.saveSettings(); applyReading(); redraw();
      document.querySelector(d.ptext ? `button[data-ptext="${d.ptext}"]` : `button[data-pcontrast="${d.pcontrast}"]`)?.focus({ preventScroll: true });
      return;
    }
    if (d.padlook) { const me = S.me(); if (me) { me.padLook = d.padlook; S.saveSettings(); } window.drawParent(); document.querySelector(`[data-padlook="${d.padlook}"]`)?.focus({ preventScroll: true }); return; }
  });
  document.addEventListener('keydown', (ev) => {
    if (ev.key === 'Escape' && document.getElementById('padSheet') && !document.getElementById('dSheet')) { ev.stopPropagation(); ev.preventDefault(); closePanel(); return; }
    if (ev.key === 'Escape' && V.page && root() && !document.getElementById('dSheet')) { ev.stopPropagation(); ev.preventDefault(); V.page = null; redraw(); }
  }, true);
  /* A new rating changes what the tiles say. */
  window.addEventListener('hs-rated', (ev) => {
    if (!root() || document.getElementById('dSheet')) return;
    redraw();
    document.querySelector(`[data-rate="${CSS.escape(ev.detail)}"]`)?.focus({ preventScroll: true });
  });
})();
