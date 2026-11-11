/* Internal page list, reached only at #screens. Opening a page uses example results that are never saved. */
(function () {
  const S = window.Store;
  const items = () => window.SCREEN_GROUPS.flatMap((g) => g.items);

  /* Example family, so every screen shows what it looks like in real use. */
  function exampleFamily() {
    const days = (n) => new Date(Date.now() - n * 86400000).toISOString();
    const exam = window.ExamData.exam, auto = {};
    exam.questions.forEach((q, i) => { if (q.type !== 'written') auto[i] = i % 5 === 3 ? 0 : q.marks; });
    const written = exam.questions.map((q, i) => (q.type === 'written' ? i : -1)).filter((i) => i >= 0);
    const answers = { [written[0]]: 'It has lots of small spaces so the bone is lighter.', [written[1]]: 'So the bones slide and do not rub.', [written[2]]: 'The biceps contracts and pulls the arm up. Then the triceps contracts to straighten it.' };
    const attempt = (kidId, ep, kind, score, total, ago, missed = []) => ({ id: `${kidId}${ep}${kind}${ago}`, kidId, ep, kind, score, total, missed, at: days(ago) });
    /* A few marks on the day shown, so the pad looks like a day in progress. */
    const base = S.preview ? S.real : S.data, shown = window.Schedule.iso(window.Schedule.schoolDay(new Date()));
    /* Only when the day shown is today: a class can't be done before it happens. */
    const log = shown !== window.Schedule.todayIso() ? {} : { k1: { [`${shown}-2`]: { mark: '10', done: true }, [`${shown}-3`]: { done: true }, [`${shown}-4`]: { done: true } }, k2: { [`${shown}-2`]: { mark: '8', done: true }, [`${shown}-3`]: { done: true } }, k3: { [`${shown}-3`]: { done: true } } };
    return {
      ...base,
      /* Copies, so choosing a look on an example page never changes a real parent. Example pages show normal text. */
      parents: base.parents.map((p) => ({ ...p, textSize: 1, contrast: false })),
      school: { ...base.school, log },
      attempts: [
        attempt('k1', 'skeleton', 'starter', 3, 3, 5), attempt('k1', 'skeleton', 'test', 9, 12, 5, [2, 6, 9]), attempt('k1', 'skeleton', 'retest', 4, 4, 4),
        attempt('k2', 'skeleton', 'starter', 3, 3, 5), attempt('k2', 'skeleton', 'test', 11, 12, 5, [6]), attempt('k2', 'skeleton', 'retest', 4, 4, 4), attempt('k2', 'muscles', 'starter', 2, 3, 0), attempt('k2', 'muscles', 'test', 10, 12, 0, [4, 8]),
        attempt('k3', 'skeleton', 'starter', 2, 3, 0), attempt('k3', 'skeleton', 'test', 6, 12, 0, [1, 2, 4, 6, 8, 9]),
      ],
      exams: [{ id: 1001, exam: exam.id, kidId: 'k2', at: days(0), answers, auto, self: { [written[0]]: [0], [written[1]]: [0], [written[2]]: [0, 2] }, checked: days(0) }],
      /* The example family has seen every lesson, so the pages show tests waiting. */
      watched: { family: Object.fromEntries(window.EPISODES.map((e) => [e.id, days(0)])) },
    };
  }
  const asKid = () => { const k = S.data.kids[0]; S.signIn(k.username, k.pin); };
  const asParent = () => { const p = S.data.parents[0]; S.signIn(p.username, p.password); };
  const OPEN = {
    home() { window.chooseEpisode(null); window.renderHomeView(); },
    myDay() { asKid(); window.renderMyDay(); },
    programDoc() { window.renderProgramDoc(); },
    print(what) { asParent(); window.renderPrint(what); },
    diary() { asKid(); window.renderDiary(); },
    diaryParent() { asParent(); window.renderDiary(); },
    timetable() { asParent(); window.renderTimetable(); },
    map(view) { window.renderMap(view); },
    lesson(id) { window.chooseEpisode(id); window.renderHomeView(); },
    play(id) { window.chooseEpisode(id); window.playCurrent(); },
    quiz(kind, item) { asKid(); window.chooseEpisode(item.lesson || 'muscles'); window.previewQuiz(kind); },
    quizResult() { asKid(); window.chooseEpisode('muscles'); window.previewQuizResult(); },
    examPaper() { asKid(); window.previewExamPaper(); },
    examResult() { const rec = S.data.exams[0]; S.signIn(S.kid(rec.kidId).username, S.kid(rec.kidId).pin); window.renderExamResult(rec); },
    examCheck() { const rec = S.data.exams[0]; S.signIn(S.kid(rec.kidId).username, S.kid(rec.kidId).pin); window.previewExamCheck(); },
    examStart() { asKid(); window.renderExamStart(); },
    ladder() { window.renderAssess(); },
    parent(tab) { asParent(); window.renderParent(tab); },
    padLook(arg) { asParent(); const [look, where, count] = arg.split('|'); S.me().padLook = look; window.Pad.V.page = null;
      /* Example families with 1 to 6 children: fewer, or copies of the example children with their own names, colours and pictures. Never saved. */
      if (count) { const base = S.data.kids, extra = [['Kid 4', '#B45309', 'bear'], ['Kid 5', '#7C3AED', 'frog'], ['Kid 6', '#BE185D', 'cat_face']]; S.data.kids = Array.from({ length: +count }, (_, i) => (i < base.length ? base[i] : { ...base[i % base.length], id: `kx${i}`, name: extra[i - base.length][0], color: extra[i - base.length][1], avatar: extra[i - base.length][2] })); }
      if (!where) return window.renderParent('today');
      if (where.startsWith('admin:')) return window.renderParent(where.slice(6));
      window.Pad.V.page = where; window.renderParent('today'); },
    login() { window.renderLogin(); },
    how() { window.renderHow(); },
  };

  function showPill() {
    if (document.getElementById('screensPill')) return;
    const pill = document.createElement('button');
    pill.id = 'screensPill'; pill.textContent = 'Page list';
    document.body.append(pill);
    /* Someone may reach an example page from a link, so it says what it is, and offers the real way in. */
    const real = document.createElement('div');
    real.id = 'screensNote';
    real.innerHTML = '<span>Example. Nothing is saved.</span><button id="screensSignIn">Sign in</button>';
    document.body.append(real);
  }
  function leavePreview() {
    S.endPreview(); window.chooseEpisode(null); window.resetMap();
    document.getElementById('screensPill')?.remove();
    document.getElementById('screensNote')?.remove();
  }
  window.endScreens = () => { if (S.preview || document.getElementById('screensPill')) leavePreview(); };
  function start(open, arg, item) {
    S.startPreview(exampleFamily());
    showPill();
    OPEN[open](arg, item);
    window.scrollTo(0, 0);
  }
  window.openScreen = function (id) {
    const item = items().find((x) => x.id === id);
    /* A lab page lives at its own address (`href`), outside the app. */
    if (item?.href) location.href = item.href;
    else if (item) start(item.open, item.arg, item);
  };
  const card = (item) => {
    const [w, h] = window.SCREEN_SIZES[item.size];
    return `<button class="pageCard" data-f data-screen="${esc(item.id)}"><img src="assets/screens/${item.img || item.id}.jpg" alt="" width="${w}" height="${h}" style="height:auto" loading="lazy"><b>${esc(item.name)}</b><small>${esc(item.who)}</small></button>`;
  };
  window.renderScreens = function () {
    leavePreview();
    document.body.dataset.surface = 'tv';
    app.innerHTML = `<div class="pageList"><header><h1>Page list</h1><p>For our own review. Families never see this page. Pages opened from here show example results, and nothing is saved.</p></header>
      ${window.SCREEN_GROUPS.map((g) => `<section class="pageGroup"><h2>${esc(g.title)}</h2><div class="pageGrid">${g.items.map(card).join('')}</div>
        ${g.more ? `<div class="pageMore"><span>${esc(g.moreLabel)}</span>${g.more.map(([t, open, arg]) => `<button data-f data-openpage="${esc(open)}" data-openarg="${esc(arg || '')}">${esc(t)}</button>`).join('')}</div>` : ''}</section>`).join('')}</div>`;
    window.scrollTo(0, 0);
  };
  document.addEventListener('click', (ev) => {
    const el = ev.target.closest('button');
    if (!el) return;
    if (el.id === 'screensSignIn') { history.replaceState(null, '', location.pathname); leavePreview(); window.openAccount(); }
    else if (el.id === 'screensPill') { if (document.getElementById('player').hidden) window.renderScreens(); }
    else if (el.dataset.screen) window.openScreen(el.dataset.screen);
    else if (el.dataset.openpage) start(el.dataset.openpage, el.dataset.openarg || undefined, {});
  });
})();
