/* A child's own screens: sign in, My day, and tests. */
(function () {
  const ep = () => window.currentEpisode();
  const S = window.Store;
  const DAY = 86400000;
  const RETESTS = [1, 7, 30];
  let afterLogin = null;

  function surface(html, name = 'tv') { document.body.dataset.surface = name; if (name === 'school') window.Theme.use(S.currentKid()); app.innerHTML = html; window.scrollTo(0, 0); }
  const avatar = (k) => S.face(k);

  /* One sign-in for everyone. The account decides what opens next. */
  /* Sign-in, built like an app's: a fixed top bar, and a form that stays in the part of the screen above the keyboard.
     On iPads and phones the visible area shrinks when the keyboard opens, so the page follows window.visualViewport. */
  function renderLogin(message = '') {
    window.setRoute('me');
    const typed = document.getElementById('loginUser')?.value || '';
    surface(`<div class="authPage" id="authPage"><header class="authTop"><button class="authBack" data-back data-f aria-label="Back"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5l-7 7 7 7"/></svg><span>Back</span></button><span class="authBrand">Home School <i>TV</i></span></header>
      <main class="authBody"><form id="loginForm" class="authForm" novalidate><h1>Sign in</h1><p class="authSub">Parents and children sign in here. Your own page opens next.</p>
        <p class="authError" role="alert" ${message ? '' : 'hidden'}>${esc(message)}</p>
        <label for="loginUser">Username<input id="loginUser" value="${esc(typed)}" autocomplete="username" autocapitalize="none" autocorrect="off" spellcheck="false" enterkeyhint="next"></label>
        <label for="loginPass">Password<span class="authPass"><input id="loginPass" type="password" autocomplete="current-password" autocapitalize="none" autocorrect="off" spellcheck="false" enterkeyhint="go"><button type="button" class="authShow" data-f id="authShow" aria-pressed="false">Show</button></span></label>
        <button class="authGo" data-f type="submit">Sign in</button></form>
        <p class="authHelp">Forgot your password? A parent can make a new one in Admin, Family.</p></main></div>`);
    fitAuth();
    const first = document.getElementById(typed ? 'loginPass' : 'loginUser');
    if (matchMedia('(hover: hover)').matches) first.focus({ preventScroll: true });
  }
  function fitAuth() {
    const page = document.getElementById('authPage'), vv = window.visualViewport; if (!page || !vv) return;
    page.style.height = `${vv.height}px`; page.style.transform = `translateY(${vv.offsetTop}px)`;
  }
  window.visualViewport?.addEventListener('resize', fitAuth);
  window.visualViewport?.addEventListener('scroll', fitAuth);
  document.addEventListener('focusin', (ev) => { if (ev.target.closest?.('.authForm')) setTimeout(() => ev.target.scrollIntoView({ block: 'center', behavior: 'smooth' }), 300); });
  document.addEventListener('keydown', (ev) => { if (ev.key === 'Enter' && ev.target.id === 'loginUser') { ev.preventDefault(); document.getElementById('loginPass').focus(); } });
  document.addEventListener('click', (ev) => {
    if (ev.target.closest('#authShow')) { const i = document.getElementById('loginPass'), show = i.type === 'password'; i.type = show ? 'text' : 'password'; ev.target.closest('#authShow').textContent = show ? 'Hide' : 'Show'; ev.target.closest('#authShow').setAttribute('aria-pressed', String(show)); i.focus({ preventScroll: true }); }
  });
  window.renderLogin = renderLogin;
  /* Sign in if needed, then open the person's own dashboard. */
  window.openAccount = function () {
    if (S.isParent()) window.renderParent();
    else if (S.currentKid()) renderMyDay();
    else renderLogin();
  };
  document.addEventListener('submit', async (ev) => {
    if (ev.target.id !== 'loginForm') return;
    ev.preventDefault();
    const user = document.getElementById('loginUser').value.trim(), pass = document.getElementById('loginPass').value;
    if (!user || !pass) { renderLogin(user ? 'Type your password.' : 'Type your username.'); return; }
    /* Ask the Mac for the latest logins first. A page left open, or a device's old copy, may not know a parent or child added since. */
    await S.refresh();
    const role = S.signIn(user, pass);
    if (!role) { renderLogin(S.lastFailure === 'username' ? `There’s no login called “${user}” here. Check the spelling, or ask a parent to add you in Admin, Family.` : 'That password isn’t right. Check it, or ask a parent to make a new one in Admin, Family.'); return; }
    if (role === 'parent') { window.renderParent(); return; }
    const next = afterLogin; afterLogin = null;
    if (next === 'exam') window.renderExamStart(); else if (next === 'test') startQuiz('test'); else renderMyDay();
  });

  /* My day: only what's needed, in order. */
  function dayState(k) {
    const tests = S.attemptsFor(k.id, 'test', ep().id), best = tests.reduce((m, a) => Math.max(m, a.score), -1);
    const starter = S.attemptsFor(k.id, 'starter', ep().id).length > 0;
    const first = tests[0], retests = S.attemptsFor(k.id, 'retest', ep().id);
    const due = first ? RETESTS.map((d, i) => ({ day: d, at: new Date(first.at).getTime() + d * DAY, done: retests.length > i })) : [];
    const nextRetest = due.find((r) => !r.done);
    const exams = S.examsFor(k.id);
    return { tests, best, starter, watched: S.hasWatched(k.id, ep().id), nextRetest, exams, total: ep().test.length };
  }
  /* A child's own app: one screen with tabs along the bottom. Anything long scrolls inside its own section. */
  const TABS = [['day', 'Today', 'house'], ['diary', 'Diary', 'books'], ['lessons', 'Lessons', 'laptop'], ['todo', 'To do', 'check_mark_button'], ['marks', 'Marks', 'bar_chart']];
  function kidShell(tab, html) {
    window.setRoute(tab === 'day' ? 'me' : `me-${tab}`);
    const k = S.currentKid(), n = todoList(k).length;
    surface(`<div class="kidApp"><main class="kidMain">${html}</main><button class="kidGear" data-f id="openLook" aria-label="Settings: my name, picture and look"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="3.2"/><path d="M19.4 15a1.7 1.7 0 0 0 .34 1.87l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.7 1.7 0 0 0-2.88 1.2V21a2 2 0 1 1-4 0v-.09a1.7 1.7 0 0 0-2.88-1.2l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.7 1.7 0 0 0-1.2-2.88H3a2 2 0 1 1 0-4h.09a1.7 1.7 0 0 0 1.2-2.88l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.7 1.7 0 0 0 1.88.34H9a1.7 1.7 0 0 0 1-1.54V3a2 2 0 1 1 4 0v.09a1.7 1.7 0 0 0 2.88 1.2l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.7 1.7 0 0 0-.34 1.88V9a1.7 1.7 0 0 0 1.54 1H21a2 2 0 1 1 0 4h-.09a1.7 1.7 0 0 0-1.51 1z"/></svg></button><nav class="kidTabs" aria-label="My school">${TABS.map(([id, t, ic]) => `<button data-f data-kidtab="${id}" ${tab === id ? 'aria-current="page"' : ''}><img src="assets/icons/${ic}.png" alt=""><span>${t}${id === 'todo' && n ? `<span class="n">${n}</span>` : ''}</span></button>`).join('')}</nav></div>`, 'school');
  }
  window.kidShell = kidShell;
  /* Opens one of a child's tabs by name. A refresh uses it too, so a child stays on the tab they were on. */
  function openKidTab(tab) {
    if (!S.currentKid()) { window.openAccount(); return; }
    if (tab === 'diary') window.renderDiary(); else if (tab === 'lessons') lessonsTab(); else if (tab === 'todo') todoTab(); else if (tab === 'marks') marksTab(); else { window.chooseEpisode(null); renderDay(); }
  }
  window.openKidTab = openKidTab;
  /* Homework today means tests still to take, re-tests that are due, and anything a parent wrote. See docs/product/HOMEWORK.md. */
  function todoList(k) {
    if (!k) return [];
    const now = Date.now(), list = [], today = window.Schedule.todayIso();
    window.EPISODES.forEach((e) => {
      const tests = S.attemptsFor(k.id, 'test', e.id);
      if (!tests.length) {
        if (!S.hasWatched(k.id, e.id)) return;
        const date = lessonDate(k, e.id), late = date ? window.Schedule.dayOf(k, date).periods.find((p) => p.ep === e.id)?.late : false;
        list.push({ title: `Test: ${e.topic}`, sub: `${e.subject || 'Science'}, about 10 minutes`, ep: e.id, kind: 'test', late });
        return;
      }
      const done = S.attemptsFor(k.id, 'retest', e.id).length, wait = RETESTS[done];
      if (wait != null) { const at = new Date(tests[0].at).getTime() + wait * DAY; if (at <= now) list.push({ title: `Re-test: ${e.topic}`, sub: 'Past mistakes first, 3 minutes', ep: e.id, kind: 'retest' }); }
    });
    const log = S.data.school?.log?.[k.id] || {};
    Object.entries(log).forEach(([key, e]) => { if (e.hw && !e.done) { const day = key.slice(0, 10), late = day < today; list.push({ title: e.hw, sub: `From your parent, ${late ? 'was due' : 'for'} ${window.Schedule.shortDate(day)}`, classKey: key, late }); } });
    return list;
  }
  window.kidTodoList = todoList;
  window.kidCatchUp = (k) => catchUpList(k);
  /* Lessons the timetable has already passed, and this child hasn't seen. These are quiet: not late work, and not counted as to do. */
  const dayName = (date) => window.Schedule.parse(date).toLocaleDateString('en-GB', { weekday: 'long' });
  function catchUpList(k, skip) {
    const today = window.Schedule.todayIso();
    return window.EPISODES.flatMap((e) => { const date = lessonDate(k, e.id); return date && date < today && e.id !== skip && !S.hasWatched(k.id, e.id) ? [{ title: e.title, sub: `${e.subject || 'Science'}, from ${dayName(date)}`, ep: e.id }] : []; });
  }
  const catchRow = (t) => `<li class="todo catchUp"><b>${esc(t.title)}</b><small>${esc(t.sub)}</small><button class="btn small sec" data-f data-lessonplay="${esc(t.ep)}">Watch</button></li>`;
  const kidEmpty = (icon, head, text) => `<div class="kidEmpty"><img src="assets/icons/${icon}.png" alt=""><h2>${esc(head)}</h2><p>${esc(text)}</p><button class="btn" data-f data-kidtab="lessons">See my lessons</button></div>`;
  /* Tests and homework first, then anything to catch up on. */
  function todoBody(k, skip) {
    const list = todoList(k), behind = catchUpList(k, skip), plain = 'list-style:none;margin:0;padding:0;display:grid;gap:8px';
    if (!list.length && !behind.length) return kidEmpty('check_mark_button', 'All clear', 'Your tests appear here after you watch a lesson.');
    return `<div class="kidScroll">${list.length ? `<ul style="${plain}">${list.map(todoRow).join('')}</ul>` : '<p class="hubEmpty">No tests right now. They appear here after you watch a lesson.</p>'}${behind.length ? `<h3 class="catchHead">Catch up</h3><ul style="${plain}">${behind.map(catchRow).join('')}</ul>` : ''}</div>`;
  }
  /* The date this child's timetable puts a lesson on. */
  function lessonDate(k, id) {
    const sch = window.Schedule; let d = sch.parse(S.data.school.start);
    for (let i = 0; i < 60; i++, d = sch.addDays(d, 7)) { const week = sch.week(k, sch.monday(d)); for (const day of week) if (day.periods.some((p) => p.ep === id)) return day.date; if (week[4].date > sch.todayIso()) break; }
    return null;
  }
  const todoRow = (t) => `<li class="todo ${t.late ? 'late' : ''}"><b>${esc(t.title)}</b><small>${esc(t.sub)}</small>${t.ep ? `<button class="btn small" data-f data-todotest="${esc(t.ep)}" data-kind="${t.kind}">Start</button>` : `<button class="btn small sec" data-f data-todone="${esc(t.classKey)}">Done</button>`}</li>`;
  function renderDay() {
    const k = S.currentKid(), d = dayState(k), e = ep(), sch = window.Schedule;
    /* Warm up, then the lesson, then its test. The test isn't offered before the lesson. */
    const steps = [['Warm up', d.starter || d.watched], ['Watch', d.watched], ['Test', d.tests.length > 0]];
    const nowStep = d.tests.length ? -1 : d.watched ? 2 : d.starter ? 1 : 0;
    const action = d.tests.length ? '<button class="btn big" data-f data-kidtab="lessons">Choose a lesson</button>' : d.watched ? '<button class="btn big" data-f data-quiz="test">Take the test</button><button class="btn sec" data-f data-play="0">Watch again</button>' : d.starter ? '<button class="btn big" data-f data-play="0">Watch the lesson</button>' : '<button class="btn big" data-f data-quiz="starter">Start the warm-up</button><button class="btn sec" data-f data-play="0">Skip to the lesson</button>';
    const dayDate = sch.iso(sch.schoolDay(new Date())), day = sch.dayOf(k, dayDate), week = sch.week(k, sch.monday(sch.parse(dayDate))).flatMap((x) => x.periods), doneW = week.filter((p) => p.state === 'done').length;
    const todos = todoList(k), today = sch.todayIso(), when = lessonDate(k, e.id), slot = when === today && day.periods.find((p) => p.ep === e.id);
    const heading = d.tests.length ? 'All done' : slot ? `Today, ${slot.time}` : when && when < today ? `Catch up from ${dayName(when)}` : 'Next up';
    kidShell('day', `<div class="hub"><header class="hubTop"><button class="hubMe" data-f data-settings aria-label="Settings: my name, picture and look">${S.face(k)}<span><b>Hi, ${esc(k.name)}</b><small>${esc(k.year)}</small></span></button>
        <div class="hubWeek"><span>This week: ${doneW} of ${week.length} classes</span><i><b style="width:${week.length ? (doneW / week.length) * 100 : 0}%"></b></i></div></header>
      <div class="hubGrid"><section class="hubNext" style="background-image:url(${window.LIB.img(e.hero)})"><small>${esc(heading)}: ${esc(e.subject || 'Science')}</small><h2>${esc(e.title)}</h2>
          <ol class="hubSteps">${steps.map(([t, done], i) => `<li class="${done ? 'done' : i === nowStep ? 'now' : ''}">${done ? '✓ ' : ''}${t}</li>`).join('')}</ol><div class="tqBtns">${action}</div></section>
        <section class="hubPanel"><h2>To do${todos.length ? ` (${todos.length})` : ''}</h2>${todoBody(k, e.id)}</section></div>
      <section class="hubClasses" aria-label="${dayDate === sch.todayIso() ? 'Today’s classes' : `Classes on ${esc(day.name)}`}">${day.periods.map((p) => `<button class="hubClass ${p.state}" style="--c:${p.color}" data-f data-class="${p.date}|${p.n}">${p.state === 'done' ? '<i class="tick">✓</i>' : ''}<small>${p.time} ${esc(p.subject)}</small><b>${esc(p.kind === 'lesson' ? p.title.split(', lesson')[0] : p.title)}</b>${p.state === 'missing' ? '<small class="hubSoon">Not made yet</small>' : ''}</button>`).join('')}</section></div>`);
    document.querySelector('.hubNext .btn')?.focus({ preventScroll: true });
  }
  /* Lessons: what's ready now, and every subject, unit and lesson in the program. */
  /* The subject and unit open in Lessons survive a refresh on this device. */
  const LV = { sub: 'ready', unit: null };
  try { Object.assign(LV, JSON.parse(sessionStorage.getItem('hs-lessons')) || {}); } catch (e) {}
  function readyCards(k) {
    return `<div class="kidCards">${window.visibleEpisodes().map((e) => { const t = S.attemptsFor(k.id, 'test', e.id); return `<button class="kidCard" data-f data-lesson="${esc(e.id)}" data-open="1"><img src="${window.LIB.img(e.hero)}" alt=""><span><b>${esc(e.title)}</b><small>${esc(e.subject || 'Science')}. ${t.length ? '✓ Test done' : S.hasWatched(k.id, e.id) ? 'Test to do' : 'Ready to watch'}</small></span></button>`; }).join('')}</div>`;
  }
  /* The unit this child's timetable has them in this week. */
  function unitThisWeek(k, subject) {
    const sch = window.Schedule, week = sch.week(k, sch.monday(sch.schoolDay(new Date()))).flatMap((d) => d.periods).filter((c) => c.subject === subject && c.unit);
    const today = sch.iso(sch.schoolDay(new Date()));
    return ([...week].reverse().find((c) => c.date <= today) || week[0])?.unit || '';
  }
  const madeIn = (unit) => (window.CURRICULUM.unitLessons[unit] || []).filter((l) => l[2] === 'ready' && window.visibleEpisodes().some((e) => e.id === l[3]));
  function subjectPage(k, p) {
    const made = p.units.reduce((n, [u]) => n + madeIn(u).length, 0), total = p.units.reduce((n, [, c]) => n + c, 0), now = unitThisWeek(k, p.subject);
    return `<header class="progHead"><h2>${esc(p.subject)}</h2><p>${p.units.length} ${p.units.length === 1 ? 'unit' : 'units'}, ${total} lessons. ${made ? `${made} ready to watch.` : 'Lessons are on the way.'}</p></header>
      <div class="kidScroll"><div class="progUnits">${p.units.map(([u, c]) => { const n = madeIn(u).length, here = u === now; return `<button class="progUnit ${n ? 'has' : ''} ${here ? 'here' : ''}" data-f data-kunit="${esc(u)}">${window.unitArt(u) || '<i class="progDot" style="background:' + p.color + '"></i>'}<span><b>${esc(u)}</b><small>${c} lessons${n ? `, ${n} ready` : ''}${here ? '. This week' : ''}</small></span></button>`; }).join('')}</div></div>`;
  }
  function unitPage(k, p, unit) {
    const count = p.units.find(([u]) => u === unit)?.[1] || 0, named = window.CURRICULUM.unitLessons[unit] || [];
    const rows = Array.from({ length: count }, (_, i) => {
      const [title, goal, status, ep] = named[i] || [], e = status === 'ready' && ep && window.visibleEpisodes().find((x) => x.id === ep);
      if (e) { const t = S.attemptsFor(k.id, 'test', e.id); return `<button class="progLesson ready" data-f data-lesson="${esc(e.id)}" data-open="1"><img src="${window.LIB.img(e.hero)}" alt=""><span><small>Lesson ${i + 1}</small><b>${esc(title || e.title)}</b><em>${t.length ? `✓ Test done: ${t.at(-1).score} of ${t.at(-1).total}` : S.hasWatched(k.id, e.id) ? 'Watched. Test to do' : 'Ready to watch'}</em></span></button>`; }
      return `<div class="progLesson"><span><small>Lesson ${i + 1}</small><b>${esc(title || 'Coming later')}</b>${goal ? `<em>${esc(goal)}</em>` : title ? '<em>Coming later</em>' : ''}</span></div>`;
    }).join('');
    return `<header class="progHead"><button class="btn sec small" data-f data-kunitback>${esc(p.subject)}</button><h2>${esc(unit)}</h2><p>${count} lessons</p></header><div class="kidScroll"><div class="progLessons">${rows}</div></div>`;
  }
  function lessonsTab() {
    const k = S.currentKid(), P = window.CURRICULUM.program, cur = P.find((p) => p.subject === LV.sub);
    if (!cur) { LV.sub = 'ready'; LV.unit = null; }
    const rail = `<nav class="progRail" aria-label="Subjects"><button class="progSub all" data-f data-ksub="ready" aria-current="${LV.sub === 'ready'}"><b>Ready now</b><small>${window.visibleEpisodes().length} lessons</small></button>${P.map((p) => { const made = p.units.reduce((n, [u]) => n + madeIn(u).length, 0); return `<button class="progSub" style="--c:${p.color}" data-f data-ksub="${esc(p.subject)}" aria-current="${LV.sub === p.subject}"><b>${esc(p.subject)}</b><small>${made ? `${made} ready` : 'Coming soon'}</small></button>`; }).join('')}</nav>`;
    const body = cur ? (LV.unit ? unitPage(k, cur, LV.unit) : subjectPage(k, cur)) : `<header class="progHead"><h2>Ready now</h2><p>Every lesson you can watch today.</p></header><div class="kidScroll">${readyCards(k)}</div>`;
    kidShell('lessons', `<div class="kidPage"><header class="kidPageTop"><h1>Lessons</h1><button class="btn sec small" data-f id="openProgramDoc">The whole year</button></header><div class="progWrap">${rail}<section class="progMain">${body}</section></div></div>`);
  }
  function todoTab() {
    kidShell('todo', `<div class="kidPage"><header class="kidPageTop"><h1>To do</h1></header>${todoBody(S.currentKid())}</div>`);
  }
  function marksTab() {
    const k = S.currentKid(), show = (a) => (S.data.school?.scale === 'percent' ? `${Math.round((a.score / a.total) * 100)}%` : String(Math.max(1, Math.round((a.score / a.total) * 12))));
    const rows = window.EPISODES.map((e) => { const t = S.attemptsFor(k.id, 'test', e.id); if (!t.length) return ''; const best = t.reduce((a, b) => (b.score / b.total > a.score / a.total ? b : a)); return `<div class="markRow"><b>${esc(e.topic)}</b><small>${esc(e.subject || 'Science')}. Lesson test: ${best.score} of ${best.total}</small><em>${show(best)}</em></div>`; }).join('');
    kidShell('marks', `<div class="kidPage"><header class="kidPageTop"><h1>My marks</h1></header>${rows ? `<div class="kidScroll">${rows}</div>` : kidEmpty('bar_chart', 'No marks yet', 'Your marks appear here after your first test.')}</div>`);
  }
  document.addEventListener('click', (ev) => {
    const prog = ev.target.closest('[data-ksub], [data-kunit], [data-kunitback]');
    if (prog) { const d = prog.dataset; if (d.ksub) { LV.sub = d.ksub; LV.unit = null; } else if (d.kunit) LV.unit = d.kunit; else LV.unit = null; try { sessionStorage.setItem('hs-lessons', JSON.stringify(LV)); } catch (e) {} lessonsTab(); return; }
    const el = ev.target.closest('button'); if (!el) return;
    const d = el.dataset;
    if (d.kidtab) openKidTab(d.kidtab);
    else if (d.todotest) { window.chooseEpisode(d.todotest); startQuiz(d.kind); }
    else if (d.todone) { const k = S.currentKid(), e = S.data.school.log[k.id][d.todone]; e.done = true; S.save(); fetch('/api/state', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ op: 'settings', value: { school: S.data.school } }) }).catch(() => {}); document.querySelector('.kidTabs [aria-current="page"]')?.click(); }
  });
  /* New work appears by itself. Checks every few seconds, and when the device wakes. It never leaves a test or a lesson. */
  let seen = null;
  async function watchForWork() {
    const k = S.currentKid();
    if (!k || S.preview || document.hidden || !document.querySelector('.kidApp') || document.getElementById('dSheet') || document.getElementById('themeSheet')) return;
    await S.refresh();
    const now = todoList(k), key = (t) => `${t.kind}|${t.ep || t.classKey}`, sig = now.map(key).join(','), fresh = seen == null ? [] : now.filter((t) => t.ep && !seen.includes(key(t)));
    if (seen != null && sig !== seen.join(',')) document.querySelector('.kidTabs [aria-current="page"]')?.click();
    seen = now.map(key);
    if (fresh.length) {
      document.getElementById('kidNew')?.remove();
      const t = fresh[0], box = document.createElement('div');
      box.id = 'kidNew'; box.setAttribute('role', 'status');
      box.innerHTML = `<b>Your test is ready</b><span>${esc(t.title)}</span><button class="btn" data-f data-todotest="${esc(t.ep)}" data-kind="${esc(t.kind)}">Start</button><button class="kidNewX" data-f aria-label="Not now">✕</button>`;
      box.querySelector('.kidNewX').onclick = () => box.remove();
      document.querySelector('.kidApp')?.append(box);
    }
  }
  setInterval(watchForWork, 6000);
  document.addEventListener('visibilitychange', () => { if (!document.hidden) watchForWork(); });
  function renderMyDay(next) {
    if (next) afterLogin = next;
    if (S.currentKid()) { if (afterLogin === 'exam') { afterLogin = null; window.renderExamStart(); } else renderDay(); return; }
    renderLogin();
  }
  window.renderMyDay = renderMyDay;

  /* A test: one question fills the screen. The picture belongs to the question, and the action is always in the same place at the bottom. */
  const Q = { kind: 'test', list: [], i: 0, value: null, checked: false, right: 0, missed: [], marks: [] };
  const KIND = { test: 'Lesson test', starter: 'Starter quiz', retest: 'Re-test', fix: 'Fixing my mistakes' };
  /* Questions drawn on their own map or figure need the whole stage, so no extra picture. */
  const OWN_FIGURE = ['tap', 'label', 'region', 'estimate', 'contract', 'pics'];
  const calm = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
  /* Everything must fit one screen. If a question is too long for this screen, its text and figures shrink a little until it does. */
  function fit() {
    const main = document.querySelector('.tqMain'); if (!main) return;
    main.classList.remove('noPic');
    let f = 1; main.style.setProperty('--fit', f);
    const over = () => main.scrollHeight > main.clientHeight + 1;
    while (over() && f > .62) { f -= .05; main.style.setProperty('--fit', f.toFixed(2)); }
    if (over() && main.querySelector('.tqPic')) { main.classList.add('noPic'); f = 1; main.style.setProperty('--fit', f); while (over() && f > .62) { f -= .05; main.style.setProperty('--fit', f.toFixed(2)); } }
  }
  window.fitQuestion = fit;
  addEventListener('resize', fit);
  document.addEventListener('qresize', () => requestAnimationFrame(fit));

  function pick(kind) {
    if (kind === 'starter') return ep().starter.map((q, i) => ({ q, i }));
    const all = ep().test.map((q, i) => ({ q, i }));
    if (kind === 'test') return all;
    if (kind === 'fix') return all.filter((x) => Q.toFix.includes(x.i));
    const k = S.currentKid(), tests = S.attemptsFor(k.id, 'test', ep().id), missed = tests[tests.length - 1]?.missed || [];
    const front = all.filter((x) => missed.includes(x.i)), rest = all.filter((x) => !missed.includes(x.i)).sort(() => Math.random() - .5);
    return [...front, ...rest].slice(0, 4);
  }
  function startQuiz(kind, trying = Q.trying && kind === 'fix') { Object.assign(Q, { kind, trying, list: pick(kind), i: 0, checked: false, right: 0, missed: [], marks: [] }); drawQuiz(); }
  /* A parent (or anyone not signed in as a child) can try a lesson's test on the same screen. It's the real test, but no mark is saved for anyone. */
  window.tryTest = (id) => { window.chooseEpisode(id); startQuiz('test', true); };
  const leaveQuiz = () => { if (Q.trying) { Q.trying = false; if (S.isParent()) window.renderParent(); else window.renderHomeView(); } else renderDay(); };
  /* Previews for the Screens page. */
  window.previewQuiz = startQuiz;
  window.previewQuestion = (i) => { startQuiz('test'); Q.i = i; drawQuiz(); };
  window.previewQuizResult = () => { Object.assign(Q, { kind: 'test', list: pick('test'), i: 0, right: 9, missed: [2, 6, 9], marks: ep().test.map((_, i) => ![2, 6, 9].includes(i)) }); drawResult(); };
  window.openTestFor = (id) => { window.chooseEpisode(id); if (S.currentKid()) startQuiz('test'); else { afterLogin = 'test'; renderLogin('Sign in, and your test will be waiting.'); } };

  const hint = (q) => ({ listen: 'Listen, then tap what you heard', radio: 'Tap your answer', region: 'Tap a region on the map', tap: q.fig === 'body' ? 'Tap the place on the body' : 'Tap a bone', label: 'Drag each name onto a letter, or tap a name and then a letter', sort: 'Drag each one into a box, or tap it and then a box', match: 'Draw a line from each one to its match, or tap one and then its match', gaps: 'Drag or tap the words to fill the gaps', pics: 'Tap a picture', slider: 'Slide to your answer', estimate: 'Drag on the mountain to set the height', contract: 'Drag the bright bone toward the other one', word: 'Tap the letters in order', number: 'Use the number pad', checkbox: 'Tap every card that fits', truefalse: 'Swipe the card, or tap True or False', select: 'Tap the right word for the gap', order: 'Drag the steps into order, or tap two to swap them' }[q.type] || 'Tap your answer');
  function drawQuiz() {
    const { q } = Q.list[Q.i], n = Q.list.length, own = OWN_FIGURE.includes(q.type), img = !own && q.img;
    surface(`<div class="tq">
      <header class="tqTop"><button class="btn sec small" data-f id="quizExit">Stop</button>
        <ol class="tqDots" aria-label="Question ${Q.i + 1} of ${n}">${Q.list.map((_, i) => `<li class="${i === Q.i ? 'on' : Q.marks[i] === true ? 'yes' : Q.marks[i] === false ? 'no' : ''}"></li>`).join('')}</ol>
        <span class="tqCount">${Q.i + 1} of ${n}</span></header>
      <main class="tqMain ${own ? 'hasFig' : ''} ${img ? 'hasPic' : ''} tqType-${q.type}">${img ? `<figure class="tqPic"><img src="${window.LIB.img(q.img)}" alt=""></figure>` : ''}
        <section class="tqAsk"><p class="tqKind">${KIND[Q.kind]}</p><h1>${esc(q.q)}</h1><div id="qBox"></div></section></main>
      <footer class="tqBar" id="qFoot"><p class="tqSay" id="tqSay">${esc(hint(q))}</p>${window.QT.checksItself(q) ? '' : '<button class="btn big" data-f id="quizCheck" disabled>Check answer</button>'}</footer></div>`, 'school');
    const box = document.getElementById('qBox'), check = document.getElementById('quizCheck'), say = document.getElementById('tqSay');
    Q.checked = false;
    window.QT.mount(box, q, { onChange: (v) => { Q.value = v; if (!check) return; const ok = window.QT.answered(q, v); check.disabled = !ok; say.textContent = ok ? 'Ready when you are' : hint(q); }, onDone: (v) => { Q.value = v; checkQuiz(); } });
    if (!calm()) gsap.from('.tqAsk, .tqPic', { opacity: 0, duration: .2, ease: 'power1.out', clearProps: 'opacity' });
    fit();
    (document.querySelector('#qBox button:not(:disabled), #qBox [tabindex]') || check)?.focus?.({ preventScroll: true });
  }
  function checkQuiz() {
    if (Q.checked) return;
    const { q, i } = Q.list[Q.i], ok = window.QT.isCorrect(q, Q.value);
    Q.checked = true; Q.marks[Q.i] = ok;
    if (ok) { Q.right++; window.LIB.sfx.ding(); } else { window.LIB.sfx.buzz(); Q.missed.push(i); }
    window.QT.mount(document.getElementById('qBox'), q, { value: Q.value, locked: true, reveal: true });
    const last = Q.i === Q.list.length - 1, foot = document.getElementById('qFoot');
    foot.className = `tqBar ${ok ? 'good' : 'bad'}`;
    foot.innerHTML = `<p class="tqSay"><b>${ok ? '✓ Correct!' : '✗ Not quite.'}</b> ${esc(q.why)}</p><button class="btn big" data-f id="quizNext">${last ? 'See my result' : 'Next question'}</button>`;
    document.getElementById('quizNext').focus({ preventScroll: true });
    document.querySelector('.tqDots .on')?.classList.add(ok ? 'yes' : 'no');
    fit();
  }
  function finishQuiz() {
    const k = S.currentKid(), n = Q.list.length;
    if (Q.kind !== 'fix' && !Q.trying && k) S.addAttempt({ id: Date.now(), kidId: k.id, ep: ep().id, kind: Q.kind, score: Q.right, total: n, missed: Q.missed, at: new Date().toISOString() });
    drawResult();
  }
  /* Honest words: a low score never gets praise it didn't earn. */
  const verdict = (right, n) => { const f = right / (n || 1); return f === 1 ? ['Perfect score', 'You know this lesson.'] : f >= .8 ? ['Strong result', 'Just a little left to fix.'] : f >= .5 ? ['Getting there', 'Fix your mistakes now, while the lesson is fresh.'] : ['This one needs another look', 'Watching the lesson again will help. Then try once more.']; };
  function drawResult() {
    const n = Q.list.length, f = Q.right / (n || 1), [head, sub] = verdict(Q.right, n), list = Q.kind === 'starter' ? ep().starter : ep().test;
    const R = 54, C = 2 * Math.PI * R;
    surface(`<div class="tqResult"><section class="tqScore"><p class="tqKind">${KIND[Q.kind]}: ${esc(ep().topic)}</p>
        <svg class="tqRing" viewBox="0 0 130 130" role="img" aria-label="${Q.right} out of ${n}"><circle cx="65" cy="65" r="${R}" class="bg"/><circle cx="65" cy="65" r="${R}" class="fg" stroke-dasharray="${C * f} ${C}" transform="rotate(-90 65 65)"/><text x="65" y="76" text-anchor="middle">${Q.right}/${n}</text></svg>
        <h1>${esc(head)}</h1><p>${esc(sub)}</p>${Q.kind === 'test' ? `<p class="tqSmall">Re-tests come after ${RETESTS.join(', ').replace(/, (\d+)$/, ' and $1')} days.</p>${Q.trying ? '<p class="tqSmall"><b>A try-out:</b> this mark isn’t saved for anyone.</p>' : ''}<div class="rateAsk" ${S.currentKid() || S.isParent() ? '' : 'hidden'}><b>How was this lesson?</b>${window.rateStars(ep().id, S.currentKid()?.id || 'parent', 'Rate this lesson')}<small>Only your parent sees this. It isn’t a mark.</small></div>` : ''}
        <div class="tqBtns">${Q.missed.length ? '<button class="btn big" data-f id="quizFix">Fix my mistakes now</button>' : ''}${f < .5 ? '<button class="btn sec" data-f data-play="0">Watch the lesson again</button>' : ''}<button class="btn ${Q.missed.length ? 'ghost' : 'big'}" data-f id="quizDay">${Q.trying ? (S.isParent() ? 'Back to the pad' : 'Back to the channel') : 'Back to My day'}</button></div></section>
      <section class="tqReview"><h2>${Q.missed.length ? `${Q.missed.length} to look at again` : 'Nothing to fix'}</h2>${Q.missed.length ? `<ul>${Q.missed.slice(0, 4).map((i) => `<li><b>${esc(list[i].q)}</b><span>${esc(list[i].why)}</span></li>`).join('')}</ul>${Q.missed.length > 4 ? `<p class="tqSmall">And ${Q.missed.length - 4} more, when you fix your mistakes.</p>` : ''}` : '<p>Every answer was right.</p>'}</section></div>`, 'school');
    document.querySelector('.tqBtns .btn').focus({ preventScroll: true });
    if (calm()) return;
    if (f >= .8) window.LIB.sfx.ding();
    gsap.from('.tqRing .fg', { strokeDasharray: `0 ${C}`, duration: .8, ease: 'power2.out' });
    gsap.from('.tqReview li', { y: 10, opacity: 0, duration: .2, stagger: .04, delay: .3, clearProps: 'all' });
  }
  /* Stopping asks first, because answers so far aren't saved. */
  function askStop() {
    const foot = document.getElementById('qFoot'); if (!foot) { leaveQuiz(); return; }
    Q.footBefore = foot.innerHTML; Q.footClass = foot.className;
    foot.className = 'tqBar'; foot.innerHTML = '<p class="tqSay"><b>Stop this test?</b> Your answers so far won’t be saved.</p><div class="tqBtns"><button class="btn sec" data-f id="quizLeave">Stop</button><button class="btn big" data-f id="quizStay">Keep going</button></div>';
    document.getElementById('quizStay').focus({ preventScroll: true });
  }
  document.addEventListener('keydown', (ev) => {
    if (ev.key !== 'Enter' || !document.querySelector('.tq') || ev.target.closest?.('button, a, select, textarea, label, [data-region], [data-bone], [data-bin]')) return;
    (document.getElementById('quizNext') || document.getElementById('quizCheck'))?.click();
  });

  /* The child chooses a look. It changes colors and shapes, never the content. */
  function openLook() {
    const k = S.currentKid(); document.getElementById('themeSheet')?.remove();
    const box = document.createElement('div'); box.id = 'themeSheet';
    const cur = document.body.dataset.t, mode = document.body.dataset.m;
    box.innerHTML = `<div class="themeBox" role="dialog" aria-modal="true" aria-label="Settings"><header><h2>Settings</h2><div class="tqBtns"><button class="btn sec small" data-f data-home>TV channel</button><button class="btn sec small" data-f id="signOut">Sign out</button><button class="btn small" data-f id="lookClose">Done</button></div></header><label class="kidNameRow"><span>My name</span><input id="kidName" value="${esc(k.name)}" maxlength="24" autocomplete="off" spellcheck="false"></label><h2>My picture</h2><div class="avatarGrid">${S.AVATARS.map((a) => `<button data-f data-pickavatar="${a}" aria-pressed="${k.avatar === a}" aria-label="${a.replace(/_/g, ' ')}"><img src="assets/avatars/${a}.png" alt=""></button>`).join('')}</div><h2>My theme</h2><div class="picker">${window.Theme.tiles(cur, mode)}</div><button class="btn sec" data-f id="settingsMode">${mode === 'dark' ? 'Switch to light' : 'Switch to dark'}</button></div>`;
    document.body.append(box);
    box.querySelector('[aria-pressed="true"]')?.focus({ preventScroll: true });
  }
  /* A child's own name: empty isn't allowed, so the old one comes back. */
  document.addEventListener('change', (ev) => {
    if (ev.target.id !== 'kidName') return;
    const k = S.currentKid(), name = ev.target.value.trim();
    if (!k || !name) { if (k) ev.target.value = k.name; return; }
    k.name = name; S.saveSettings(); document.querySelector('.kidTabs [aria-current="page"]')?.click();
  });
  document.addEventListener('click', (ev) => {
    const el = ev.target.closest('button');
    if (!el) return;
    if (el.id === 'themeMode') { const k = S.currentKid(); if (k) { k.mode = k.mode === 'dark' ? 'light' : 'dark'; S.saveSettings(); window.Theme.use(k); } return; }
    if (el.id === 'openLook' || el.dataset.settings != null) { openLook(); return; }
    if (el.id === 'settingsMode') { const k = S.currentKid(); if (k) { k.mode = document.body.dataset.m === 'dark' ? 'light' : 'dark'; S.saveSettings(); window.Theme.use(k); openLook(); } return; }
    if (el.dataset.pickavatar) { const k = S.currentKid(); k.avatar = el.dataset.pickavatar; S.saveSettings(); document.querySelector('.kidTabs [aria-current="page"]')?.click(); openLook(); return; }
    if (el.id === 'lookClose') { document.getElementById('themeSheet')?.remove(); return; }
    if (el.dataset.pickt) { const k = S.currentKid(); k.theme = el.dataset.pickt; S.saveSettings(); window.Theme.use(k); openLook(); return; }
    if (el.id === 'signOut') { S.signOut(); window.chooseEpisode(null); renderLogin(); }
    else if (el.dataset.quiz) startQuiz(el.dataset.quiz);
    else if (el.id === 'quizCheck') checkQuiz();
    else if (el.id === 'quizNext') { if (Q.i === Q.list.length - 1) finishQuiz(); else { Q.i++; drawQuiz(); } }
    else if (el.id === 'quizExit') askStop();
    else if (el.id === 'quizStay') { const foot = document.getElementById('qFoot'); foot.className = Q.footClass; foot.innerHTML = Q.footBefore; document.getElementById('quizCheck')?.toggleAttribute('disabled', !window.QT.answered(Q.list[Q.i].q, Q.value)); }
    else if (el.id === 'quizLeave' || el.id === 'quizDay') leaveQuiz();
    else if (el.id === 'quizFix') { Q.toFix = [...Q.missed]; startQuiz('fix'); }
  });
})();
