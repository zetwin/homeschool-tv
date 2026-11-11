/* D and E share this: a list on the left that keeps its place, and the opened page on the right.
   window.SPLIT_MODE: 'D' = This week as its own section at the top of the list, then the categories.
                      'E' = This week as one card in the categories, the same size as the others.
   On a phone the list fills the screen and a page opens over it; Back returns to the same scroll place. */
(function () {
  const MODE = window.SPLIT_MODE || 'D';
  const { kids, ITEMS, WEEK, byId, sheetsOf, IMG } = window.MAT, { icon, head, nav, page, esc, names, kidChips, STATUS, sheets, SEND, EACH } = window.UI;
  /* This week's lessons, each with the pages made from it; then the pages for the whole week. Sample week: 9 to 15 November. */
  const LESSONS = [
    { title: 'How Do Your Muscles Work?', sub: 'Science, lesson 2', pic: IMG('muscle-cover.jpg'), items: ['mu-sheet', 'mu-cross', 'mu-code'] },
    { title: 'Colombia: One Country, Six Regions', sub: 'Geography, lesson 1', pic: IMG('colombia-cover.jpg'), items: ['co-map', 'co-floors'] },
    { title: '¡Hola! Your First Words in Spanish', sub: 'Spanish, lesson 1', pic: IMG('spanish-cover.jpg'), items: ['sp-cards'] },
  ];
  const WHOLE = ['fm-week', 'fm-habits', 'ma-daily'];
  /* Categories: subjects and kinds, all equal. Each shows a small picture of one of its own pages. */
  const CATS = [
    { id: 'science', name: 'Science', art: 'label', items: ['mu-sheet', 'sk-label', 'mu-cross', 'mu-code', 'ne-comic', 'fm-exp'] },
    { id: 'geography', name: 'Geography', art: 'map', items: ['co-map', 'co-floors'] },
    { id: 'spanish', name: 'Spanish', art: 'cards', items: ['sp-cards', 'sp-write'] },
    { id: 'feelings', name: 'Emotions and life', art: 'feelings', items: ['em-sort', 'fe-check', 'lf-money'] },
    { id: 'maths', name: 'Maths every day', art: 'maths', items: ['ma-daily', 'lf-money'] },
    { id: 'english', name: 'Reading and writing', art: 'readlog', items: ['rd-log', 'en-hand', 'sp-write'] },
    { id: 'games', name: 'Puzzles and games', art: 'chess', items: ['ch-mate', 'lg-pets', 'mu-code', 'mu-cross'] },
    { id: 'makers', name: 'Make and explore', art: 'experiment', items: ['mk-cabbage', 'mk-art', 'mk-nature'] },
    { id: 'forms', name: 'Charts and forms', art: 'habits', items: ['fm-week', 'fm-habits', 'fm-exp', 'aw-cert'] },
    { id: 'exams', name: 'Exam papers', art: 'exam', items: ['ex-unit'], parentOnly: true },
  ];
  const WEEK_CAT = { id: 'week', name: 'This week', art: 'week' };
  const week = [...WEEK.items];
  const S = { level: 'home', open: 'pack', order: [], unfold: new Set(), homeY: 0 };
  const time = (i) => (i.mins ? `${i.mins} min` : 'any time');
  /* A tick shows which pages are already in this week's pack */
  const row = (id) => { const i = byId(id), inPack = week.includes(id); return `<button class="row" data-open="${id}" aria-current="false">${page(i.kind)}<span>${esc(i.title)}<span class="quiet">${i.perKid ? EACH() : `${sheets(i.pages)}, ${time(i)}`}</span></span>${inPack ? `<span class="inMark" title="In this week’s pack">${icon('check')}<span class="vh">In this week’s pack</span></span>` : ''}</button>`; };
  const forLine = () => `<p class="who"><span class="quiet">For</span>${esc(names(kids))}<button class="link">Change</button></p>`;
  const packBtn = () => `<button class="pack" data-open="pack" aria-current="false"><span class="stack" aria-hidden="true">${week.slice(0, 3).map((id, n) => `<div class="page" style="left:${n * .8}em;top:${n * .3}em">${window.THUMB(byId(id).kind)}</div>`).join('')}</span><span><b>This week’s pack</b><span class="quiet">${week.length} pages, ${sheetsOf(week, kids.length)} sheets of paper</span></span></button>`;
  const weekBody = () => `${packBtn()}
    ${LESSONS.map((l, n) => { const open = S.unfold.has(n); return `<div class="lesson"><button class="lessonHead" data-fold="${n}" aria-expanded="${open}"><img src="${l.pic}" alt=""><span class="lt"><b>${esc(l.title)}</b><span class="quiet">${esc(l.sub)}. ${l.items.length} ${l.items.length === 1 ? 'page' : 'pages'}</span></span>${icon('next')}</button>${open ? `<div class="rows">${l.items.map(row).join('')}</div>` : ''}</div>`; }).join('')}
    <div class="group"><span class="quiet">For the whole week</span><div class="rows">${WHOLE.map(row).join('')}</div></div>`;
  const catCard = (c, isWeek) => `<button class="cat" data-cat="${c.id}" aria-current="false">${isWeek ? icon('week') : page(c.art)}<span><b>${esc(c.name)}</b><span class="quiet">${isWeek ? `${esc(WEEK.dates)}: the pack and ${LESSONS.length} lessons` : c.parentOnly ? 'Parents only' : `${c.items.length} pages`}</span></span>${icon('next')}</button>`;
  /* The left side, by level: home, This week (E only), or one category */
  function listHtml() {
    if (S.level === 'home' && MODE === 'D') return `<h2>This week<span class="quiet">${esc(WEEK.dates)}</span></h2>${weekBody()}<h2>Everything else</h2><div class="cats">${CATS.map((c) => catCard(c)).join('')}</div>`;
    if (S.level === 'home') return `<h2>Materials by kind<span class="quiet">Pick a kind, then a page</span></h2><div class="cats one">${catCard(WEEK_CAT, true)}${CATS.map((c) => catCard(c)).join('')}</div>`;
    const back = `<button class="btn listBack" data-level="home">${icon('back')}All materials</button>`;
    if (S.level === 'week') return `${back}<h2>This week<span class="quiet">${esc(WEEK.dates)}</span></h2>${weekBody()}`;
    const c = CATS.find((x) => x.id === S.level);
    return `${back}<h2>${esc(c.name)}${c.parentOnly ? '<span class="quiet">Only parents can see these</span>' : ''}</h2><div class="rows">${c.items.map(row).join('')}</div>`;
  }
  /* The right side: the pack, or one page */
  function readHtml() {
    const back = `<button class="btn backList" data-backlist>${icon('back')}Back to the list</button>`;
    if (S.open === 'pack') {
      return `${back}<div class="packView"><div><h3>This week’s pack</h3><p class="quiet">${esc(WEEK.dates)}. ${week.length} pages, ${sheetsOf(week, kids.length)} sheets of paper</p></div>
        <div class="packPages">${week.map((id) => { const i = byId(id); return `<button data-open="${id}">${page(i.kind)}<span>${esc(i.title)}</span></button>`; }).join('')}</div>
        <div>${forLine()}<div class="packActs" style="margin-top:.7em"><button class="btn fill">${icon('print')}Print the pack</button><button class="btn">${icon('tablet')}${SEND()}</button></div></div></div>`;
    }
    const i = byId(S.open), n = S.order.indexOf(S.open), inWeek = week.includes(i.id);
    const who = i.parentOnly ? `<p>${icon('lock')} Only parents can see this. Children never get it early.</p>` : forLine();
    const add = i.parentOnly ? '' : inWeek ? `<span class="inPack">${icon('check')}In this week’s pack</span>` : `<button class="link" data-addweek="${i.id}">Add to this week’s pack</button>`;
    return `${back}<div class="doc"><div class="docHead"><p class="quiet">${esc(i.from)}</p><h3>${esc(i.title)}</h3><p>${esc(i.what)}</p></div>${page(i.kind)}<div class="info">
        <p class="quiet">${i.perKid ? EACH() : sheets(i.pages)}, ${time(i)}</p>${who}
        <div class="acts"><button class="btn fill">${icon('print')}Print${i.perKid && kids.length > 1 ? ` for ${kids.length}` : ''}</button>${i.both && !i.parentOnly ? `<button class="btn">${icon('tablet')}${SEND()}</button>` : ''}</div>${add}
        <p class="quiet">${STATUS[i.status]}</p></div></div>
      <div class="steps">${n >= 0 ? `<button class="btn prev" data-step="-1" ${n > 0 ? '' : 'disabled'}>${icon('back')}Previous</button><span class="quiet">${n + 1} of ${S.order.length}</span><button class="btn" data-step="1" ${n < S.order.length - 1 ? '' : 'disabled'}>Next${icon('next')}</button>` : ''}</div>`;
  }
  /* Draw once; afterwards only the side that changes is redrawn, so the list keeps its scroll place */
  function frame() { document.getElementById('app').innerHTML = `${head('Materials')}<main class="split" id="split"><nav class="list" id="list" aria-label="Materials list"></nav><section class="read" id="read" aria-live="polite"></section></main>${nav()}`; drawList(); drawRead(); }
  /* `y` puts the list back where it was: after unfolding a lesson, or coming back from a category */
  function drawList(y = 0) { const l = document.getElementById('list'); l.innerHTML = listHtml(); l.scrollTop = y; S.order = [...l.querySelectorAll('[data-open]')].map((b) => b.dataset.open).filter((id) => id !== 'pack'); mark(); }
  function drawRead() { document.getElementById('read').innerHTML = readHtml(); mark(); }
  /* Highlight one state only: the page or card that is open on the right */
  function mark() {
    document.querySelectorAll('#list [data-open]').forEach((b) => b.setAttribute('aria-current', String(b.dataset.open === S.open)));
    document.querySelectorAll('#list [data-cat]').forEach((b) => b.setAttribute('aria-current', 'false'));
  }
  const phone = () => matchMedia('(max-width: 800px)').matches;
  function open(id) { S.open = id; drawRead(); document.getElementById('split').classList.add('reading'); if (phone()) document.querySelector('#read [data-backlist]')?.focus({ preventScroll: true }); }
  document.addEventListener('click', (e) => {
    const t = e.target.closest('[data-open],[data-cat],[data-level],[data-step],[data-backlist],[data-addweek],[data-fold]'); if (!t) return;
    const list = document.getElementById('list');
    if (t.dataset.fold) { const n = +t.dataset.fold; S.unfold.has(n) ? S.unfold.delete(n) : S.unfold.add(n); drawList(list.scrollTop); return; }
    if (t.dataset.open) open(t.dataset.open);
    else if (t.dataset.cat) { S.homeY = list.scrollTop; S.level = t.dataset.cat; drawList(); if (!phone()) open(S.level === 'week' ? 'pack' : S.order[0]); }
    else if (t.dataset.level) { S.level = 'home'; drawList(S.homeY); }
    else if (t.dataset.step) { const n = S.order.indexOf(S.open) + +t.dataset.step; if (S.order[n]) open(S.order[n]); }
    else if (t.dataset.backlist != null) { document.getElementById('split').classList.remove('reading'); document.querySelector(`#list [data-open="${S.open}"]`)?.focus({ preventScroll: true }); }
    else if (t.dataset.addweek) { week.push(t.dataset.addweek); drawRead(); drawList(list.scrollTop); }
  });
  frame();
  /* Review links: #open shows a page, #cat a category, #week This week (E) */
  const h = location.hash.slice(1);
  if (h === 'open') { S.unfold.add(0); drawList(); open('mu-cross'); }
  if (h === 'cat') { S.level = 'games'; drawList(); open('ch-mate'); }
  if (h === 'week') { S.level = 'week'; drawList(); open('pack'); }
})();
