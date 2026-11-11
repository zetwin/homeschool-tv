/* The personal school diary (щоденник), and the parent's timetable. Both are built to fit one screen on a laptop or TV. On a phone, the diary shows one day. */
(function () {
  const S = window.Store, Sch = () => window.Schedule;
  const V = { monday: null, kid: null, day: null, ttKid: 'all' };
  const school = () => S.data.school;
  const saveSchool = () => { S.save(); if (S.online && !S.preview) fetch('/api/state', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ op: 'settings', value: { school: school() } }) }).catch(() => {}); };
  const longDate = (d) => Sch().parse(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'long' });
  const weekKey = (m) => Sch().iso(m);
  const viewer = () => (S.isParent() ? S.kid(V.kid) || S.data.kids[0] : S.currentKid());

  function row(p) {
    return `<button class="dRow ${p.state} ${p.late ? 'late' : ''}" data-f data-class="${p.date}|${p.n}">
      <span class="dNo" style="background:${p.color}">${p.n}</span>
      <span class="dMain"><b>${esc(p.subject)}</b><small>${p.kind === 'exam' ? '<i class="dExam">Exam</i> ' : ''}${esc(p.title)}</small></span>
      <span class="dHw">${esc(p.hw)}</span>
      <span class="dMark ${p.mark ? 'has' : ''}" aria-label="${p.mark ? `Mark ${esc(p.mark)}` : 'No mark yet'}">${p.mark ? esc(p.mark) : p.state === 'done' ? '✓' : ''}</span></button>`;
  }
  function dayBlock(d, parent) {
    const today = d.date === Sch().todayIso();
    const single = school().off.some((o) => o.date === d.date);
    const toggle = parent && (!d.off || single) && d.date >= school().start ? `<button class="dOffBtn" data-f data-offday="${d.date}">${single ? 'Back to school' : 'No school'}</button>` : '';
    return `<section class="dDay ${today ? 'isToday' : ''} ${V.day === d.date ? 'sel' : ''}" data-date="${d.date}" aria-label="${d.name} ${longDate(d.date)}">
      <header><h2>${d.name}</h2><span>${longDate(d.date)}</span>${today ? '<i class="dToday">Today</i>' : ''}${toggle}</header>
      ${d.off ? `<p class="dOff">${esc(d.off)}</p>` : `<div class="dRows">${d.periods.map(row).join('') || '<p class="dOff">No classes</p>'}</div>`}</section>`;
  }
  function summary(days, kid, parent) {
    const all = days.flatMap((d) => d.periods), key = weekKey(V.monday);
    const done = all.filter((p) => p.state === 'done').length, due = all.filter((p) => p.hwDo === 'test');
    const exams = all.filter((p) => p.kind === 'exam'), noLesson = all.filter((p) => p.state === 'missing').length;
    const signed = school().signed?.[kid.id]?.[key], note = school().notes?.[kid.id]?.[key] || '';
    return `<section class="dDay dWeek"><header><h2>This week</h2></header>
      <div class="dWeekBody"><ul class="dFacts"><li><b>${done}</b> of ${all.length} classes done</li><li><b>${due.length}</b> ${due.length === 1 ? 'test' : 'tests'} to do</li><li><b>${exams.length}</b> ${exams.length === 1 ? 'exam' : 'exams'}${exams.length ? `: ${esc(exams[0].unit)}` : ''}</li>${noLesson ? `<li><b>${noLesson}</b> ${noLesson === 1 ? 'class' : 'classes'} without a lesson yet</li>` : ''}</ul>
      <div class="dSign"><label for="dNote">Parent’s note</label>${parent ? `<textarea id="dNote" rows="2" placeholder="Write a note for this week">${esc(note)}</textarea>` : `<p class="dNoteText">${esc(note) || 'No note yet'}</p>`}
      ${signed ? `<p class="dSigned">✓ Signed by a parent, ${esc(Sch().shortDate(signed))}</p>` : parent ? '<button class="dBtn" data-f id="dSignBtn">Sign this week</button>' : '<p class="dUnsigned">Not signed yet</p>'}</div></div></section>`;
  }
  const PAGE_HEAD = '<div class="dHead" aria-hidden="true"><span></span><span>Subject and topic</span><span>Homework</span><span>Mark</span></div>';
  function draw() {
    const parent = S.isParent(), kid = viewer();
    if (!kid) { if (parent) window.renderParent('family'); else window.renderLogin(); return; }
    V.kid = kid.id;
    V.monday ||= Sch().monday(Sch().schoolDay(new Date()));
    const days = Sch().week(kid, V.monday);
    V.day = days.some((d) => d.date === V.day) ? V.day : (days.find((d) => d.date === Sch().todayIso()) || days[0]).date;
    const end = Sch().addDays(V.monday, 4), range = `${V.monday.getDate()}–${longDate(Sch().iso(end))} ${end.getFullYear()}`;
    if (parent) { drawParentWeek(kid, days, range); return; }
    const page = `<div class="diary">
      <header class="diaryTop">
        <div class="diaryName">${S.face(kid, 'small')}<h1>${esc(kid.name)}’s diary</h1><small>${esc(kid.year)}</small></div>
        ${parent && S.data.kids.length > 1 ? `<div class="dKids" role="group" aria-label="Choose a child">${S.data.kids.map((k) => `<button data-f data-diarykid="${k.id}" aria-pressed="${k.id === kid.id}">${esc(k.name)}</button>`).join('')}</div>` : ''}
        <div class="dWeekNav"><button data-f data-week="-1" aria-label="Previous week">‹</button><b>${range}</b><button data-f data-week="1" aria-label="Next week">›</button><button class="dThis" data-f data-week="0">This week</button></div></header>
      <nav class="dStrip" aria-label="Day of the week">${days.map((d) => `<button data-pickday="${d.date}" aria-pressed="${d.date === V.day}" class="${d.date === Sch().todayIso() ? 'isToday' : ''}"><small>${d.name.slice(0, 3)}</small><b>${Sch().parse(d.date).getDate()}</b></button>`).join('')}</nav>
      <div class="spread"><div class="dPage">${PAGE_HEAD}${days.slice(0, 3).map((d) => dayBlock(d, parent)).join('')}</div>
        <div class="dPage">${PAGE_HEAD}${days.slice(3).map((d) => dayBlock(d, parent)).join('')}${summary(days, kid, parent)}</div></div></div>`;
    window.kidShell('diary', page);
    (app.querySelector('.dDay.isToday .dRow.now') || app.querySelector('.dDay.isToday .dRow') || app.querySelector('.dWeekNav button'))?.focus({ preventScroll: true });
  }
  /* ---------- Parent: the week ---------- */
  const IC = {
    back: '<path d="M15 5l-7 7 7 7"/>', next: '<path d="M9 5l7 7-7 7"/>', check: '<path d="M4 12.5l5 5L20 6.5"/>', close: '<path d="M6 6l12 12M18 6L6 18"/>',
    play: '<path d="M7 4.5v15l13-7.5z"/>', people: '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0"/><path d="M16 4.6a3.5 3.5 0 0 1 0 6.8M18 14.2a6.5 6.5 0 0 1 3.5 5.8"/>',
    cal: '<rect x="3" y="4" width="18" height="17" rx="2"/><path d="M3 9h18M8 2v4M16 2v4"/>',
  };
  const ic = (n) => `<svg class="ic" viewBox="0 0 24 24" aria-hidden="true">${IC[n]}</svg>`;
  const plural = (n, one, many = `${one}s`) => `${n} ${n === 1 ? one : many}`;
  const AVATARS = ['owl', 'fox', 'panda', 'robot', 'lion', 'dolphin'];
  const face = (k, cls = '') => `<span class="pFace ${cls}" style="--kc:${esc(k.color || '#475569')}" aria-hidden="true"><img src="assets/avatars/${esc(k.avatar || AVATARS[Math.max(0, S.data.kids.findIndex((x) => x.id === k.id)) % AVATARS.length])}.png" alt=""></span>`;

  /* Three calm versions to choose from (owner, 2026-11-10: "too much everything thrown to our face"). They follow docs/rules/VISUAL-HIERARCHY.md:
     one main thing, a few secondary things, quiet grey details, and topics, notes and settings only after a tap.
     A: every child's week as rings (Apple Fitness, Skylight). B: one child, one day big (Things 3 Today). C: one child's week as a quiet grid (a school timetable). */
  const WEEK_LOOKS = [['a', 'Children'], ['b', 'One day'], ['c', 'Grid']];
  const protoPick = (attr, cur, list) => `<div class="protoPick" role="group" aria-label="Versions to compare"><span>Version</span>${list.map(([k, w], i) => `<button data-f data-${attr}="${k}" aria-pressed="${k === cur}">${i + 1}. ${w}</button>`).join('')}</div>`;
  const isDone = (p) => p.state === 'done';
  const dayRing = (done, all, cls = '') => { const r = 40, c = 2 * Math.PI * r, f = all ? done / all : 0; return `<span class="waRing ${cls}" aria-hidden="true"><svg viewBox="0 0 100 100"><circle class="rgBg" cx="50" cy="50" r="${r}"/>${f > 0 ? `<circle class="rgFg" cx="50" cy="50" r="${r}" stroke-dasharray="${(c * f).toFixed(1)} ${c.toFixed(1)}" transform="rotate(-90 50 50)"/>` : ''}</svg><b>${f >= 1 ? ic('check') : `${done}/${all}`}</b></span>`; };
  const weekNav = (range, thisWeek) => `<div class="wvNav" role="group" aria-label="Week"><button class="wvArrow" data-f data-week="-1" aria-label="Previous week">${ic('back')}</button><b>${esc(range)}</b><button class="wvArrow" data-f data-week="1" aria-label="Next week">${ic('next')}</button>${thisWeek ? '' : '<button class="wvThis" data-f data-week="0">This week</button>'}</div>`;
  const signState = (k) => { const key = weekKey(V.monday); return school().signed?.[k.id]?.[key]; };
  const signBtn = (k) => (signState(k) ? `<button class="wvSigned" data-f data-wksign="${esc(k.id)}">${ic('check')}<span>Signed</span></button>` : `<button class="wvSign" data-f data-wksign="${esc(k.id)}">Sign</button>`);
  const kidTabs = (cur) => (S.data.kids.length > 1 ? `<div class="wvKids" role="group" aria-label="Choose a child">${S.data.kids.map((k) => `<button data-f data-diarykid="${esc(k.id)}" aria-pressed="${k.id === cur}" style="--kc:${esc(k.color || '#475569')}">${face(k)}<span>${esc(k.name)}</span></button>`).join('')}</div>` : '');

  /* A: all children, five rings each. The rings are the main thing; names are secondary; dates are grey. */
  function weekA(range, thisWeek) {
    const rows = S.data.kids.map((k) => ({ k, days: Sch().week(k, V.monday) }));
    const days = rows[0]?.days || [];
    const head = `<div class="waHead" aria-hidden="true"><span></span>${days.map((d) => `<span class="${d.date === Sch().todayIso() ? 'isToday' : ''}"><b>${d.name.slice(0, 3)}</b>${Sch().parse(d.date).getDate()}</span>`).join('')}<span></span></div>`;
    const body = rows.map(({ k, days: kd }) => `<section class="waRow" style="--kc:${esc(k.color || '#475569')}" aria-label="${esc(k.name)}">
      <div class="waWho">${face(k, 'pFaceM')}<b>${esc(k.name)}</b></div>
      ${kd.map((d) => { const n = d.periods.length, done = d.periods.filter(isDone).length, exam = d.periods.some((p) => p.kind === 'exam'); return `<button class="waDay ${d.date === Sch().todayIso() ? 'isToday' : ''} ${d.off ? 'off' : ''}" data-f data-wkday="${esc(k.id)}|${d.date}" aria-label="${esc(k.name)}, ${d.name}: ${d.off ? 'no school' : `${done} of ${n} classes done${exam ? ', exam' : ''}`}">${d.off ? '<span class="waOff">Off</span>' : dayRing(done, n)}${exam && !d.off ? '<i class="waExam">Exam</i>' : ''}</button>`; }).join('')}
      <div class="waSignCell">${signBtn(k)}</div></section>`).join('');
    return `<div class="wvTop">${weekNav(range, thisWeek)}</div><div class="waBoard">${head}${body}</div><p class="wvHint">Tap a circle to see that day’s classes.</p>`;
  }
  /* B: one child, one day big. The day's classes are the main thing; the week is a quiet strip of dots. */
  function weekB(kid, days, range, thisWeek) {
    const d = days.find((x) => x.date === V.day) || days[0], done = d.periods.filter(isDone).length;
    const strip = `<nav class="wbStrip" aria-label="Day of the week">${days.map((x) => `<button data-f data-pickday="${x.date}" aria-pressed="${x.date === d.date}" class="${x.date === Sch().todayIso() ? 'isToday' : ''}" aria-label="${x.name} ${Sch().parse(x.date).getDate()}${x.off ? ', no school' : `, ${x.periods.filter(isDone).length} of ${x.periods.length} done`}"><span>${x.name.slice(0, 3)}</span><b>${Sch().parse(x.date).getDate()}</b><i class="wbDots" aria-hidden="true">${x.off ? '<em>Off</em>' : x.periods.map((p) => `<u class="${isDone(p) ? 'on' : ''} ${p.kind === 'exam' ? 'ex' : ''}"></u>`).join('')}</i></button>`).join('')}</nav>`;
    const rows = d.off ? `<p class="wbOff">${esc(d.off)}</p>` : `<ol class="wbRows">${d.periods.map((p) => `<li><button class="wbRow" data-f data-class="${p.date}|${p.n}" style="--sc:${p.color}"><i aria-hidden="true"></i><time>${esc(p.time)}</time><b>${esc(p.subject)}</b>${p.kind === 'exam' ? '<em class="wvExam">Exam</em>' : ''}<span class="wbTick ${isDone(p) ? 'on' : ''}" aria-hidden="true">${isDone(p) ? ic('check') : ''}</span><span class="srOnly">${isDone(p) ? 'Done' : 'Not done yet'}</span></button></li>`).join('')}</ol>`;
    const canOff = (!d.off && d.date >= Sch().todayIso() && d.date >= school().start) || school().off.some((o) => o.date === d.date);
    return `<div class="wvTop">${kidTabs(kid.id)}${weekNav(range, thisWeek)}</div>${strip}
      <section class="wbDay" aria-labelledby="wbDayH"><header><h2 id="wbDayH">${d.name} ${Sch().parse(d.date).getDate()}</h2><p>${d.off ? 'No school' : `${done} of ${d.periods.length} done`}</p></header>${rows}
        <footer>${canOff ? `<button class="wvLink" data-f data-offday="${d.date}">${d.off ? 'Back to school' : 'No school this day'}</button>` : '<span></span>'}${signBtn(kid)}</footer></section>`;
  }
  /* C: one child's week as a quiet grid. Subjects are plain words; only ticks and exams stand out. */
  function weekC(kid, days, range, thisWeek) {
    const max = Math.max(0, ...days.map((d) => Math.max(0, ...d.periods.map((p) => p.n))));
    const head = `<span class="wcCorner"></span>${days.map((d) => `<span class="wcHead ${d.date === Sch().todayIso() ? 'isToday' : ''}"><b>${d.name.slice(0, 3)}</b> ${Sch().parse(d.date).getDate()}</span>`).join('')}`;
    const rows = Array.from({ length: max }, (_, i) => i + 1).map((n) => `<span class="wcTime">${esc(Sch().periodTime(n))}</span>${days.map((d) => { const p = d.periods.find((x) => x.n === n); if (d.off) return n === 1 ? `<span class="wcOff" style="grid-row: span ${max}">No school</span>` : ''; return p ? `<button class="wcCell ${d.date === Sch().todayIso() ? 'isToday' : ''} ${isDone(p) ? 'done' : ''}" data-f data-class="${p.date}|${p.n}" style="--sc:${p.color}" aria-label="${d.name}, ${esc(p.time)}: ${esc(p.subject)}${p.kind === 'exam' ? ', exam' : ''}${isDone(p) ? ', done' : ''}"><i aria-hidden="true"></i><span>${esc(p.subject)}</span>${p.kind === 'exam' ? '<em class="wvExam">Exam</em>' : ''}${isDone(p) ? `<span class="wcTick" aria-hidden="true">${ic('check')}</span>` : ''}</button>` : `<span class="wcEmpty ${d.date === Sch().todayIso() ? 'isToday' : ''}"></span>`; }).join('')}`).join('');
    const all = days.flatMap((d) => d.periods), done = all.filter(isDone).length;
    return `<div class="wvTop">${kidTabs(kid.id)}${weekNav(range, thisWeek)}</div>
      <section class="wcCard" aria-label="${esc(kid.name)}’s week"><header><h2>${done} of ${all.length} classes done</h2>${signBtn(kid)}</header><div class="wcGrid">${head}${rows}</div></section>`;
  }
  function drawParentWeek(kid, days, range) {
    const thisWeek = weekKey(V.monday) === weekKey(Sch().monday(Sch().schoolDay(new Date())));
    V.wkLook ||= 'a';
    /* The grid needs room: on a phone it shows one day, like version 2. */
    const look = V.wkLook === 'c' && matchMedia('(max-width: 600px)').matches ? 'b' : V.wkLook;
    const body = look === 'b' ? weekB(kid, days, range, thisWeek) : look === 'c' ? weekC(kid, days, range, thisWeek) : weekA(range, thisWeek);
    window.cabinetPage('diary', `<div class="wv wv-${V.wkLook}">${protoPick('wklook', V.wkLook, WEEK_LOOKS)}${body}</div>`, 'diary');
  }
  /* A day for one child (from version A's circles): the classes, then No school. */
  function dayCard(kidId, date) {
    const k = S.kid(kidId), d = Sch().dayOf(k, date); if (!d) return;
    const canOff = (!d.off && d.date >= Sch().todayIso() && d.date >= school().start) || school().off.some((o) => o.date === d.date);
    V.dayCard = `${kidId}|${date}`;
    sheet(`<div class="wkPanel" role="dialog" aria-modal="true" aria-labelledby="wkSheetH" style="--kc:${esc(k.color || '#475569')}">
      <header>${face(k)}<div><p class="wkSheetWhen">${esc(k.name)}</p><h2 id="wkSheetH">${d.name} ${Sch().parse(d.date).getDate()}</h2></div><button class="wkClose" data-f data-sheetclose aria-label="Close">${ic('close')}</button></header>
      ${d.off ? `<p class="wbOff">${esc(d.off)}</p>` : `<ol class="wbRows">${d.periods.map((p) => `<li><button class="wbRow" data-f data-dayclass="${esc(kidId)}|${p.date}|${p.n}" style="--sc:${p.color}"><i aria-hidden="true"></i><time>${esc(p.time)}</time><b>${esc(p.subject)}</b>${p.kind === 'exam' ? '<em class="wvExam">Exam</em>' : ''}<span class="wbTick ${isDone(p) ? 'on' : ''}" aria-hidden="true">${isDone(p) ? ic('check') : ''}</span><span class="srOnly">${isDone(p) ? 'Done' : 'Not done yet'}</span></button></li>`).join('')}</ol>`}
      ${canOff ? `<div class="wkSheetBtns"><button class="wvLink" data-f data-offday="${d.date}">${d.off ? 'Back to school' : 'No school this day, for everyone'}</button></div>` : ''}</div>`);
  }
  /* Signing a week: the note lives here, not on the page. */
  function signCard(kidId) {
    const k = S.kid(kidId), key = weekKey(V.monday), signed = school().signed?.[k.id]?.[key], note = school().notes?.[k.id]?.[key] || '';
    const days = Sch().week(k, V.monday), all = days.flatMap((d) => d.periods), done = all.filter(isDone).length;
    sheet(`<div class="wkPanel" role="dialog" aria-modal="true" aria-labelledby="wkSheetH">
      <header>${face(k)}<div><p class="wkSheetWhen">${esc(k.name)}, ${esc(document.querySelector('.wvNav b')?.textContent || '')}</p><h2 id="wkSheetH">${signed ? 'Signed' : 'Sign this week'}</h2></div><button class="wkClose" data-f data-sheetclose aria-label="Close">${ic('close')}</button></header>
      <p class="wvBig">${done} of ${all.length} classes done</p>
      <label class="wvNote"><span>Your note (if you want one)</span><textarea id="dNote" data-kid="${esc(k.id)}" rows="3" placeholder="For example: a good week">${esc(note)}</textarea></label>
      <div class="wkSheetBtns">${signed ? `<p class="wvSignedLine">${ic('check')}<span>Signed ${esc(Sch().shortDate(signed))}</span></p><button class="plainBtn" data-f data-sheetclose>Done</button>` : `<button class="solidBtn" data-f data-dosign="${esc(k.id)}">Sign the week</button>`}</div></div>`);
  }

  /* A class, for a parent: what it is, and Play the lesson. No marks, homework or ratings (owner, 2026-11-09). */
  function parentClass(kid, d, p) {
    const where = p.kind === 'lesson' ? (p.title.startsWith(p.unit) ? `Lesson ${p.i} of ${p.of} in this unit` : `${p.unit}, lesson ${p.i} of ${p.of}`) : p.kind === 'exam' ? (p.title.includes(p.unit) ? 'The end of the unit' : `Unit exam: ${p.unit}`) : 'Your own activity';
    const seen = p.ep && S.hasWatched(kid.id, p.ep);
    const state = p.state === 'done' ? `<p class="wkState ok">${ic('check')}<span>${esc(kid.name)} has done this class.</span></p>` : p.state === 'missing' ? '<p class="wkState">There’s no lesson for this class yet. You can teach it your own way.</p>' : `<p class="wkState">${esc(kid.name)} hasn’t done this class yet.</p>`;
    sheet(`<div class="wkPanel" role="dialog" aria-modal="true" aria-labelledby="wkSheetH" style="--sc:${p.color}">
      <header><i class="wkSheetBar" aria-hidden="true"></i><div><p class="wkSheetWhen">${esc(kid.name)}, ${d.name} ${longDate(d.date)}, ${esc(p.time)}</p><h2 id="wkSheetH">${esc(p.subject)}</h2></div><button class="wkClose" data-f data-sheetclose aria-label="Close">${ic('close')}</button></header>
      <div class="wkSheetBody">${p.kind === 'exam' ? '<em class="wkExam">Exam</em>' : ''}<p class="wkSheetTitle">${esc(p.title)}</p><p class="wkSheetWhere">${esc(where)}</p>${p.goal ? `<p class="wkSheetGoal">${esc(p.goal)}</p>` : ''}${state}</div>
      <div class="wkSheetBtns">${p.ep ? `<button class="solidBtn wkPlay" data-f data-lessonplay="${esc(p.ep)}">${ic('play')}<span>${seen ? 'Play the lesson again' : 'Play the lesson'}</span></button>` : ''}</div></div>`.replace('<div class="wkSheetBtns"></div>', ''));
  }
  /* A centred card on an iPad, from the bottom on a phone. It sits inside the frame, so it has the same colours and text size. */
  function sheet(inner, still) {
    document.getElementById('wkSheetBox')?.remove();
    if (!still) V.opener = document.activeElement;
    const el = document.createElement('div');
    el.id = 'wkSheetBox'; el.className = `wkSheet ${still ? 'still' : ''}`;
    el.innerHTML = `<div class="wkDim" data-sheetclose></div>${inner}`;
    const root = document.querySelector('.padRoot') || app;
    root.append(el);
    /* Only the card can be used while it's open. */
    [...root.children].forEach((c) => { if (c !== el) c.inert = true; });
    if (!still) el.querySelector('.wkPanel [data-ttset][aria-pressed="true"], .wkPanel .solidBtn, .wkPanel input, .wkPanel .wkClose')?.focus({ preventScroll: true });
  }
  function closeSheet() {
    const el = document.getElementById('wkSheetBox'); if (!el) return;
    el.parentElement && [...el.parentElement.children].forEach((c) => { c.inert = false; });
    el.remove(); V.ttSheet = null; V.dayCard = null;
    if (V.opener?.isConnected) V.opener.focus({ preventScroll: true });
    V.opener = null;
  }

  /* The parent pad opens the same class sheet, and goes back to itself after saving. */
  window.openClassFor = (kidId, date, n, back) => { V.kid = kidId; V.back = back; openClass(date, n); };
  window.saveSchool = saveSchool;
  window.renderDiary = (kidId) => { window.setRoute(S.currentKid() ? 'me-diary' : 'diary'); V.back = null; if (kidId) V.kid = kidId; if (!S.session()) { window.renderLogin(); return; } draw(); };

  /* What one class is, and what you can do from here. */
  function openClass(date, n) {
    const parent = S.isParent(), kid = viewer();
    const d = Sch().dayOf(kid, date), p = d.periods.find((x) => x.n === n); if (!p) return;
    if (parent) { parentClass(kid, d, p); return; }
    const where = p.kind === 'lesson' ? `${p.unit}, lesson ${p.i} of ${p.of}` : p.kind === 'exam' ? p.unit : 'Your own activity';
    let actions = '';
    const seen = p.ep && S.hasWatched(kid.id, p.ep);
    if (p.ep) actions = `<button class="dBtn" data-f data-lessonplay="${esc(p.ep)}">${seen ? 'Watch again' : 'Watch the lesson'}</button>${!parent && seen ? `<button class="dBtn ghost" data-f data-diaryquiz="${p.hwDo === 'retest' ? 'retest' : 'test'}" data-ep="${esc(p.ep)}">${p.hwDo === 'retest' ? 'Do the re-test' : 'Take the test'}</button>` : ''}`;
    else if (p.kind === 'exam' && p.ready && !parent) actions = '<button class="dBtn" data-f data-diaryexam>Open the exam</button>';
    else if (p.kind === 'activity' && !parent) actions = `<button class="dBtn" data-f data-classdone="${date}|${n}">${p.log.done ? 'Not done yet' : 'Mark as done'}</button>`;
    const missing = p.state === 'missing' ? '<p class="dSheetNote">We haven’t made this lesson yet. Your parent can write what to do instead, like pages to read, in Homework.</p>' : '';
    const edit = parent ? `<form class="dEdit" data-editclass="${date}|${n}"><label>Homework<input name="hw" value="${esc(p.log.hw || '')}" placeholder="For example: read pages 12 to 15"></label><label>Mark<input name="mark" value="${esc(p.log.mark || '')}" inputmode="numeric" maxlength="3"></label><label class="dCheck"><input type="checkbox" name="done" ${p.log.done ? 'checked' : ''}> Class done</label><button class="dBtn">Save</button></form>` : '';
    const sheet = document.createElement('div');
    sheet.id = 'dSheet';
    sheet.innerHTML = `<div class="dSheetBox" role="dialog" aria-modal="true" aria-label="${esc(p.subject)}"><header style="--c:${p.color}"><small>${d.name}, ${longDate(date)}, ${p.time}</small><h2>${esc(p.subject)}</h2></header>
      <p class="dSheetTitle">${esc(p.title)}</p><p class="dSheetWhere">${esc(where)}</p>${p.goal ? `<p class="dSheetGoal">${esc(p.goal)}</p>` : ''}${missing}${p.hw ? `<p class="dSheetHw"><b>Homework:</b> ${esc(p.hw)}</p>` : ''}${p.mark ? `<p class="dSheetHw"><b>Mark:</b> ${esc(p.mark)}${school().scale === 'percent' ? '' : ' out of 12'}</p>` : ''}${seen ? `<div class="rateAsk"><b>How was this lesson?</b>${window.rateStars(p.ep, parent ? 'parent' : kid.id, 'Rate this lesson')}${parent ? '' : '<small>Only your parent sees this. It isn’t a mark.</small>'}</div>` : ''}
      <div class="dSheetBtns">${actions}<button class="dBtn ghost" data-f id="dSheetClose">Close</button></div>${edit}</div>`;
    app.append(sheet);
    (sheet.querySelector('.dBtn') || sheet.querySelector('button')).focus({ preventScroll: true });
  }
  const logEntry = (kidId, key) => { const log = (school().log ??= {}); log[kidId] ??= {}; return (log[kidId][key] ??= {}); };

  /* ---------- Parent: the timetable, in the Board style (owner's yes, 2026-11-10) ----------
     The week as a grid of tinted class blocks; tap one to choose its subject from big buttons. "Enough classes?" beside it.
     School year and breaks open as a card, so the main screen stays one screen. A phone shows one day at a time. */
  const SUBJECTS = () => ['', ...window.CURRICULUM.program.map((p) => p.subject), ...Object.keys(Sch().ACTIVITIES)];
  const editing = () => (V.ttKid === 'all' ? school().timetable : school().kidTimetable?.[V.ttKid] || school().timetable);
  const whoseTt = () => (V.ttKid === 'all' ? 'Everyone' : S.kid(V.ttKid)?.name || '');
  const timeOf = (n) => Sch().periodTime(n + 1);
  function drawTimetable() {
    window.setRoute('timetable');
    if (!S.isParent()) { window.renderLogin(); return; }
    if (V.ttKid !== 'all' && !S.kid(V.ttKid)) V.ttKid = 'all';
    const table = editing(), counts = {}, DAYS = Sch().DAYS;
    DAYS.forEach((d) => table[d].forEach((s) => { if (s) counts[s] = (counts[s] || 0) + 1; }));
    const total = Object.values(counts).reduce((a, b) => a + b, 0);
    const todayKey = DAYS[(new Date().getDay() + 6) % 7];
    V.ttDay = DAYS.includes(V.ttDay) ? V.ttDay : DAYS.includes(todayKey) ? todayKey : 'mon';
    const need = Sch().needed().map((n) => ({ ...n, have: counts[n.subject] || 0, want: Math.max(1, Math.round(n.perWeek)) }));
    const short = need.filter((n) => n.have < n.want);
    const own = V.ttKid !== 'all' && school().kidTimetable?.[V.ttKid];
    const ownKids = S.data.kids.filter((k) => school().kidTimetable?.[k.id]).map((k) => k.name);
    const whoNote = V.ttKid === 'all' ? `Changes here are for every child${ownKids.length ? `, except ${ownKids.join(' and ')}, who ${ownKids.length === 1 ? 'has their' : 'have their'} own` : ''}.`
      : own ? `${whoseTt()} has their own timetable.` : `${whoseTt()} follows Everyone’s timetable. A change here gives ${whoseTt()} their own.`;
    const firstFree = [0, 1, 2, 3, 4, 5].flatMap((n) => DAYS.map((d) => [d, n])).find(([d, n]) => !table[d][n]);
    /* Say nothing when all is well; one line with one button when a subject is short. */
    const alert = short.length ? `<div class="tgAlert" role="status"><p><b>${esc(short[0].subject)}</b> needs ${plural(short[0].want - short[0].have, 'more class', 'more classes')} a week${short.length > 1 ? `, and ${plural(short.length - 1, 'other subject')} too` : ''}.</p>${firstFree ? `<button class="solidBtn" data-f data-ttcell="${firstFree[0]}|${firstFree[1]}">Add it</button>` : ''}</div>` : '';
    /* Only say who a change is for when it isn't obvious: a child is chosen, or some children have their own. */
    const tgNote = V.ttKid !== 'all' || ownKids.length ? `<p>${esc(whoNote)}</p>` : '';
    const kids = `<div class="wvKids" role="group" aria-label="Whose timetable"><button data-f data-ttkid="all" aria-pressed="${V.ttKid === 'all'}"><span>Everyone</span></button>${S.data.kids.map((k) => `<button data-f data-ttkid="${esc(k.id)}" aria-pressed="${V.ttKid === k.id}">${face(k)}<span>${esc(k.name)}</span></button>`).join('')}</div>`;
    const label = (d, n, s) => `${Sch().DAY_NAMES[d]}, ${timeOf(n)}: ${esc(s || 'Free')}. Change`;
    const cellA = (d, n) => { const s = table[d][n] || ''; const sel = d === V.ttDay ? 'sel' : ''; return s ? `<button class="tgCell ${sel}" data-f data-ttcell="${d}|${n}" style="--sc:${Sch().colorOf(s)}" aria-label="${label(d, n, s)}"><i aria-hidden="true"></i><span>${esc(s)}</span></button>` : `<button class="tgCell free ${sel}" data-f data-ttcell="${d}|${n}" aria-label="${label(d, n, s)}"><span aria-hidden="true">+</span></button>`; };
    const viewA = `<section class="tgCard" aria-labelledby="tgH"><header><h2 id="tgH">${esc(whoseTt())}’s week</h2>${tgNote}</header>
      <nav class="tgStrip" aria-label="Day">${DAYS.map((d) => `<button data-f data-ttday="${d}" aria-pressed="${d === V.ttDay}" aria-label="${Sch().DAY_NAMES[d]}">${Sch().DAY_NAMES[d].slice(0, 3)}</button>`).join('')}</nav>
      <div class="tgGrid"><span></span>${DAYS.map((d) => `<span class="tgHead">${Sch().DAY_NAMES[d]}</span>`).join('')}
      ${[0, 1, 2, 3, 4, 5].map((n) => `<span class="tgTime">${timeOf(n)}</span>${DAYS.map((d) => cellA(d, n)).join('')}`).join('')}</div></section>`;
    const viewB = `<header class="tgHeadLine"><h2>${esc(whoseTt())}’s week</h2>${tgNote}</header>
      <div class="tgDays">${DAYS.map((d) => `<section class="tgDay" aria-label="${Sch().DAY_NAMES[d]}"><h3>${Sch().DAY_NAMES[d]}</h3><ol>${[0, 1, 2, 3, 4, 5].map((n) => { const s = table[d][n] || ''; return `<li><button class="tgRow ${s ? '' : 'free'}" data-f data-ttcell="${d}|${n}" style="--sc:${s ? Sch().colorOf(s) : 'transparent'}" aria-label="${label(d, n, s)}"><i aria-hidden="true"></i><span>${esc(s || '+')}</span></button></li>`; }).join('')}</ol></section>`).join('')}</div>`;
    V.ttLook ||= 'a';
    window.cabinetPage('timetable', `<div class="wv tg tg-${V.ttLook}">${protoPick('ttlook', V.ttLook, [['a', 'Grid'], ['b', 'Day lists']])}
      <div class="wvTop">${kids}<button class="wvLink" data-f data-ttsheet="year">School year and breaks</button></div>
      ${alert}${V.ttLook === 'b' ? viewB : viewA}</div>`, 'diary');
    if (V.ttSheet) openTtSheet(V.ttSheet, true);
  }
  function openTtSheet(what, still) {
    V.ttSheet = what;
    if (what === 'year') {
      const sc = school();
      sheet(`<div class="wkPanel tbPanel" role="dialog" aria-modal="true" aria-labelledby="wkSheetH">
        <header><div><h2 id="wkSheetH">School year and breaks</h2></div><button class="wkClose" data-f data-sheetclose aria-label="Close">${ic('close')}</button></header>
        <div class="tbScroll"><div class="tbFields"><label>First day of school<input type="date" data-setting="start" value="${esc(sc.start)}"></label><label>The day starts at<input type="time" data-setting="dayStart" value="${esc(sc.dayStart)}"></label>
          <label>Each class lasts<select data-setting="lessonMin">${[30, 40, 45, 50, 60].map((m) => `<option value="${m}" ${+sc.lessonMin === m ? 'selected' : ''}>${m} minutes</option>`).join('')}</select></label>
          <label>Show test scores as<select data-setting="scale"><option value="12" ${sc.scale !== 'percent' ? 'selected' : ''}>Out of 12</option><option value="percent" ${sc.scale === 'percent' ? 'selected' : ''}>Percent</option></select></label></div>
        <h3>Breaks</h3>${sc.breaks.length ? `<ul class="tbBreaks">${sc.breaks.map((b, i) => `<li><span><b>${esc(b.name)}</b><small>${esc(Sch().shortDate(b.from))} to ${esc(Sch().shortDate(b.to))}</small></span><button class="plainBtn" data-f data-delbreak="${i}" aria-label="Remove ${esc(b.name)}">Remove</button></li>`).join('')}</ul>` : '<p class="fine">No breaks yet.</p>'}
        <form id="ttAddBreak" class="tbAdd"><h3>Add a break</h3><div class="tbFields"><label>Name<input name="name" required placeholder="For example: Half term"></label><label>From<input name="from" type="date" required></label><label>To<input name="to" type="date" required></label></div><button class="solidBtn">Add the break</button></form></div>
        <div class="wkSheetBtns tbDone"><button class="solidBtn" data-f data-sheetclose>Done</button></div></div>`, still);
      return;
    }
    const [d, n] = what.split('|'), cur = editing()[d][+n] || '', counts = {};
    Sch().DAYS.forEach((x) => editing()[x].forEach((s) => { if (s) counts[s] = (counts[s] || 0) + 1; }));
    const needs = Object.fromEntries(Sch().needed().map((x) => [x.subject, Math.max(1, Math.round(x.perWeek)) - (counts[x.subject] || 0)]).filter(([, k]) => k > 0));
    sheet(`<div class="wkPanel tbPanel" role="dialog" aria-modal="true" aria-labelledby="wkSheetH">
      <header><div><p class="wkSheetWhen">${esc(whoseTt())}’s timetable</p><h2 id="wkSheetH">${Sch().DAY_NAMES[d]}, class ${+n + 1} at ${timeOf(+n)}</h2></div><button class="wkClose" data-f data-sheetclose aria-label="Close">${ic('close')}</button></header>
      <div class="tbPick" role="group" aria-label="Choose the subject">${SUBJECTS().map((s) => `<button data-f data-ttset="${esc(s)}" aria-pressed="${s === cur}" style="--sc:${s ? Sch().colorOf(s) : 'transparent'}" class="${s ? '' : 'free'}"><i aria-hidden="true"></i><span>${esc(s || 'Free')}${needs[s] ? `<small>Needs ${needs[s]} more</small>` : ''}</span>${s === cur ? ic('check') : ''}</button>`).join('')}</div></div>`, still);
  }
  window.renderTimetable = drawTimetable;

  /* ---------- Clicks and changes ---------- */
  document.addEventListener('click', (ev) => {
    if (ev.target.closest('[data-sheetclose]')) { closeSheet(); return; }
    const el = ev.target.closest('button, [data-class]'); if (!el) return;
    const d = el.dataset;
    if (el.id === 'openDiary') { window.renderDiary(); return; }
    if (d.week != null) { V.monday = d.week === '0' ? Sch().monday(Sch().schoolDay(new Date())) : Sch().addDays(V.monday, 7 * +d.week); V.day = null; draw(); return; }
    if (d.diarykid) { V.kid = d.diarykid; draw(); return; }
    if (d.wklook) { V.wkLook = d.wklook; draw(); app.querySelector(`[data-wklook="${d.wklook}"]`)?.focus({ preventScroll: true }); return; }
    if (d.wkday) { const [k, date] = d.wkday.split('|'); dayCard(k, date); return; }
    if (d.dayclass) { const [k, date, n] = d.dayclass.split('|'); V.kid = k; openClass(date, +n); return; }
    if (d.wksign) { signCard(d.wksign); return; }
    if (d.dosign) { const id = d.dosign; (school().signed ??= {}); (school().signed[id] ??= {})[weekKey(V.monday)] = Sch().todayIso(); saveSchool(); draw(); signCard(id); return; }
    if (d.pickday) { V.day = d.pickday; draw(); return; }
    if (d.class) { const [date, n] = d.class.split('|'); openClass(date, +n); return; }
    if (el.id === 'dSheetClose') { document.getElementById('dSheet')?.remove(); return; }
    if (d.diaryquiz) { document.getElementById('dSheet')?.remove(); window.chooseEpisode(d.ep); window.previewQuiz(d.diaryquiz); return; }
    if (d.diaryexam != null) { document.getElementById('dSheet')?.remove(); window.renderExamStart(); return; }
    if (d.classdone) { const e = logEntry(viewer().id, d.classdone.replace('|', '-')); e.done = !e.done; saveSchool(); draw(); return; }
    if (d.offday) {
      const i = school().off.findIndex((o) => o.date === d.offday);
      if (i >= 0) school().off.splice(i, 1); else school().off.push({ date: d.offday, reason: 'No school today. Classes move to the next school day' });
      const reopen = document.getElementById('wkSheetBox') && V.dayCard;
      saveSchool(); draw(); if (reopen) { const [k, date] = reopen.split('|'); dayCard(k, date); } return;
    }
    if (el.id === 'dSignBtn') { const k = viewer(); (school().signed ??= {}); (school().signed[k.id] ??= {})[weekKey(V.monday)] = Sch().todayIso(); saveSchool(); draw(); return; }
    if (d.ttkid) { V.ttKid = d.ttkid; drawTimetable(); return; }
    if (d.ttlook) { V.ttLook = d.ttlook; drawTimetable(); app.querySelector(`[data-ttlook="${d.ttlook}"]`)?.focus({ preventScroll: true }); return; }
    if (d.ttday) { V.ttDay = d.ttday; drawTimetable(); app.querySelector(`[data-ttday="${d.ttday}"]`)?.focus({ preventScroll: true }); return; }
    if (d.ttcell) { openTtSheet(d.ttcell); return; }
    if (d.ttsheet) { openTtSheet(d.ttsheet); return; }
    if (d.ttset != null && V.ttSheet) {
      const [day, n] = V.ttSheet.split('|');
      if (V.ttKid !== 'all') { (school().kidTimetable ??= {}); school().kidTimetable[V.ttKid] ??= JSON.parse(JSON.stringify(school().timetable)); }
      editing()[day][+n] = d.ttset;
      saveSchool(); V.ttSheet = null; V.opener = null; drawTimetable();
      app.querySelector(`[data-ttcell="${day}|${n}"]`)?.focus({ preventScroll: true });
      return;
    }
    if (d.delbreak != null) { school().breaks.splice(+d.delbreak, 1); saveSchool(); drawTimetable(); app.querySelector('#ttAddBreak input')?.focus({ preventScroll: true }); }
  });
  document.addEventListener('keydown', (ev) => { if (ev.key === 'Escape' && document.querySelector('.wkSheet')) { ev.preventDefault(); closeSheet(); } });
  document.addEventListener('change', (ev) => {
    const el = ev.target;
    if (el.id === 'dNote') { const k = S.kid(el.dataset.kid) || viewer(); (school().notes ??= {}); (school().notes[k.id] ??= {})[weekKey(V.monday)] = el.value; saveSchool(); return; }
    if (el.dataset.setting) { const key = el.dataset.setting; school()[key] = key === 'lessonMin' ? +el.value : el.value; saveSchool(); drawTimetable(); app.querySelector(`[data-setting="${key}"]`)?.focus({ preventScroll: true }); }
  });
  document.addEventListener('submit', (ev) => {
    const f = ev.target;
    if (f.dataset.editclass) {
      ev.preventDefault();
      const e = logEntry(viewer().id, f.dataset.editclass.replace('|', '-'));
      e.hw = f.hw.value.trim(); e.mark = f.mark.value.trim(); e.done = f.done.checked;
      saveSchool();
      if (V.back) V.back(); else draw();
    } else if (f.id === 'ttAddBreak') {
      ev.preventDefault();
      if (f.to.value < f.from.value) { f.to.setCustomValidity('The last day must be on or after the first day'); f.to.reportValidity(); f.to.addEventListener('input', () => f.to.setCustomValidity(''), { once: true }); return; }
      school().breaks.push({ name: f.name.value.trim(), from: f.from.value, to: f.to.value }); school().breaks.sort((a, b) => a.from.localeCompare(b.from));
      saveSchool(); drawTimetable();
    }
  });
})();
