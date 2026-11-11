/* How lessons, tests and exams look in every theme. Each question is just data, using a small set of reusable interaction types.
   Making a new lesson's test means filling in data and a picture, with no new building. */
(function () {
  const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const IMG = (n) => `img/${n}.jpg`;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const go = (el, kf, o) => { if (!reduced && window.Motion && el) Motion.animate(el, kf, o || { type: 'spring', stiffness: 460, damping: 28 }); };
  const shuffled = (a) => a.map((v) => [Math.random(), v]).sort((x, y) => x[0] - y[0]).map((x) => x[1]);

  const TESTS = {
    colombia: { name: 'Colombia', list: [
      { type: 'region', skill: 'Map', q: 'Tap the Andean region.', help: 'It holds the mountains that run through the middle.', a: 'andean', why: 'The Andes split into three ranges through the middle of Colombia.' },
      { type: 'estimate', skill: 'Height', q: 'About how high up is Bogotá?', help: 'Drag the slider. The line moves on the mountain.', min: 0, max: 5000, step: 100, a: 2600, tol: 300, unit: 'm', why: 'Bogotá is about 2,600 meters up, on the cold floor of the mountain.' },
      { type: 'order', skill: 'Climate', q: 'Stack the climate floors, from the top of the mountain down.', items: [['Snow', '#EAF2FF'], ['Páramo', '#8C8F7A'], ['Cold: potatoes', '#9C8B4A'], ['Mild: coffee', '#6DAA3A'], ['Hot: bananas', '#2E9E4F']], why: 'The higher you climb, the colder it gets.' },
      { type: 'match', skill: 'Regions', q: 'Connect each photo to its region.', help: 'Tap a photo, then a name.', pairs: [['colombia-guajira', 'Caribbean'], ['colombia-llanos', 'Orinoquía'], ['colombia-andes', 'Andean'], ['colombia-amazon', 'Amazon']], why: 'Desert by the sea, grassy plains, coffee slopes and a great river.' },
      { type: 'sort', skill: 'Places', q: 'Where do these belong?', help: 'Drag each one, or tap it and then a box.', bins: ['In Colombia', 'Not in Colombia'], items: [['Bogotá', 0, 'colombia-bogota'], ['Cartagena', 0, 'colombia-cartagena'], ['Caño Cristales', 0, 'colombia-cano'], ['The Sahara', 1], ['The Alps', 1]], why: 'The Sahara is in Africa, and the Alps are in Europe.' },
      { type: 'gaps', skill: 'Coasts', q: 'Finish the sentence.', parts: ['Colombia has coasts on the ', ' and the ', '.'], bank: ['Pacific Ocean', 'Caribbean Sea', 'Red Sea', 'Arctic Ocean'], a: ['Caribbean Sea', 'Pacific Ocean'], any: true, why: 'It’s the only South American country with coasts on both.' },
    ] },
    muscles: { name: 'Muscles', list: [
      { type: 'contract', skill: 'Contract', q: 'Contract this muscle.', help: 'Move the slider to shorten the muscle. Watch what happens to its shape.', ask: 'What happens to a muscle when it contracts?', o: ['Shorter and thicker', 'Longer and thinner', 'It stays the same'], a: 0, why: 'To contract means to get shorter. Working together, the cells also make it thicker.' },
      { type: 'label', skill: 'Label', q: 'Put each name on the right muscle.', help: 'Drag a name to a letter, or tap a name and then a letter.', img: 'muscle-plate', pins: { A: [29.7, 24.3], B: [28, 31], C: [50.5, 36], D: [42, 59] }, a: { A: 'Deltoid', B: 'Biceps', C: 'Rectus abdominis', D: 'Quadriceps' }, why: 'Shoulder, upper arm, front of the belly, and thigh.' },
      { type: 'sort', skill: 'Control', q: 'Which muscles can you control?', help: 'Drag each one, or tap it and then a box.', bins: ['You control it', 'It works alone'], items: [['Skeletal muscle', 0, 'muscle-skeletal'], ['Smooth muscle', 1, 'muscle-smooth'], ['Cardiac muscle', 1, 'muscle-cardiac']], why: 'Only skeletal muscle takes orders from you.' },
      { type: 'pics', skill: 'Spot it', q: 'Which picture shows cardiac muscle?', help: 'Look for short, branching cells.', o: [['muscle-skeletal', 'Picture A'], ['muscle-cardiac', 'Picture B'], ['muscle-smooth', 'Picture C']], a: 1, why: 'Cardiac cells are short and branch into each other.' },
      { type: 'gaps', skill: 'Fuel', q: 'Finish the sentence.', parts: ['Muscle cells mainly use ', ' and ', ' to release energy.'], bank: ['sugar', 'oxygen', 'salt', 'sunlight'], a: ['sugar', 'oxygen'], any: true, why: 'Your blood delivers both to the mitochondria.' },
    ] },
  };
  const EXAM = [
    { type: 'find', marks: 1, sec: 'Section A', q: 'Tap the biceps.', img: 'muscle-plate', spots: [[29.7, 24.3, 'A'], [28, 31, 'B'], [50.5, 36, 'C'], [42, 59, 'D']], a: 1, numbered: true },
    { type: 'pics', marks: 1, sec: 'Section A', q: 'Which picture shows skeletal muscle?', o: [['muscle-skeletal', 'Picture A'], ['muscle-cardiac', 'Picture B'], ['muscle-smooth', 'Picture C']], a: 0 },
    { type: 'sort', marks: 3, sec: 'Section B', q: 'Sort each kind of muscle.', bins: ['Voluntary', 'Involuntary'], items: [['Skeletal', 0], ['Smooth', 1], ['Cardiac', 1]] },
    { type: 'gaps', marks: 2, sec: 'Section C', q: 'Complete the sentence.', parts: ['When a muscle ', ', it gets ', '.'], bank: ['contracts', 'dissolves', 'shorter', 'longer'], a: ['contracts', 'shorter'] },
    { type: 'write', marks: 2, sec: 'Section D', q: 'Explain why muscle cells need sugar and oxygen.', help: 'A parent marks this answer.' },
  ];
  const V = { view: 'parts', test: 'colombia', i: 0, res: [], val: null, locked: false, ei: 0, ea: {}, end: 0 };
  const VIEWS = [['today', 'Today'], ['lesson', 'Lesson'], ['test', 'Test'], ['result', 'Test result'], ['exam', 'Exam'], ['examresult', 'Exam result'], ['parts', 'All parts']];

  function nav() {
    $('#views').innerHTML = VIEWS.map(([k, t]) => `<button role="tab" data-view="${k}" aria-selected="${V.view === k}">${t}</button>`).join('');
    $('#parts').hidden = V.view !== 'parts'; $('#flow').hidden = V.view === 'parts';
  }
  function show(view) { V.view = view; nav(); ({ today, lesson, test: () => { V.i = 0; V.res = []; drawQ(); }, result, exam: startExam, examresult: examResult, parts: () => {} })[view](); }
  window.showView = show;

  /* ---------- Today ---------- */
  function hud(extra = '') { return `<section class="panel hud"><div class="who"><span class="avatar">M</span><div><b>Hi, Mia</b><small class="mute">Year 7</small></div></div>${extra}</section>`; }
  function today() {
    const steps = [['done', 'bone', 'The human skeleton', 'Done'], ['now', 'test_tube', 'Muscles', 'Now'], ['next', 'person_running', 'Movement', 'Next'], ['later', 'balance_scale', 'Biomechanics', 'Later']];
    $('#flow').innerHTML = `${hud('<div class="level"><div><span>Today</span><span>1 of 3 done</span></div><div class="bar"><i style="--w:33%"></i></div></div>')}
      <section class="panel heroCard"><img class="pic" src="${IMG('colombia-cover')}" alt="Six photos, one from each of Colombia’s regions"><div class="body"><span class="tag acc">Do this next</span><h2 class="q2">Colombia: One Country, Six Regions</h2><p class="mute">Geography lesson, 5 minutes, plus a test on your device.</p><div class="row"><button class="btn big" data-view="lesson" data-press>Start lesson</button><button class="btn sec" data-view="test" data-press>Go to the test</button></div></div></section>
      <section class="panel"><h2>Human skeleton and muscles</h2><ol class="track">${steps.map(([st, ic, t, w]) => `<li class="${st}"><img src="icons/${ic}.png" alt=""><small>${st === 'done' ? '✓ ' : ''}${w}</small><b>${t}</b></li>`).join('')}</ol></section>
      <div class="grid"><section class="panel c6"><h2>Coming back</h2><div class="note"><div><b>Re-test on Tuesday</b>3 minutes, with your past mistakes first.</div></div><div class="note good"><div><b>You can now: contract</b>Got it right on the last test.</div></div></section>
      <section class="panel c6"><h2>Unit exam</h2><p class="mute">After all 4 lessons. An adult starts it.</p><button class="btn sec" data-view="exam" data-press>See the exam</button></section></div>`;
  }

  /* ---------- Lesson ---------- */
  const SCENES = [
    { img: 'colombia-south-america', fit: true, big: 'Where is Colombia?', cap: 'Colombia sits in the top left corner of South America.', c: 1 },
    { img: 'colombia-guajira', big: 'Caribbean', cap: 'Hot beaches, an old walled city, and even a desert.', c: 2 },
    { img: 'colombia-andes', big: 'Andean', cap: 'The Andes split into three ranges, with coffee farms and big cities.', c: 2 },
    { img: 'colombia-peak', big: 'Higher means colder', cap: 'On a few of the highest peaks, there’s snow all year.', c: 3 },
  ];
  let sc = 0;
  function lesson() {
    const c = SCENES[sc];
    $('#flow').innerHTML = `<section class="panel"><h2>On the TV, with hidden controls</h2><div class="screen16" id="player"><img class="${c.fit ? 'fit' : ''}" src="${IMG(c.img)}" alt=""><div class="big ${c.fit ? 'side' : ''}">${esc(c.big)}</div><p class="cap">${esc(c.cap)}</p>
        <div class="ctl"><div class="seg">${[1, 2, 3, 4].map((n) => `<i class="${n <= c.c ? 'on' : ''}"></i>`).join('')}</div><div class="row" style="justify-content:space-between"><div class="row"><button class="btn small sec icon" data-scene="-1" aria-label="Back">‹</button><button class="btn small" data-scene="1">Next scene</button></div><span style="font-size:14px">Chapter ${c.c} of 4</span></div></div></div>
        <p class="mute" style="font-size:14px">A sample of the moving lesson. In the real lesson, the voice plays and scenes animate. The controls appear only when needed.</p></section>
      <section class="panel"><h2>Jump to a chapter</h2><div class="chapters">${[['colombia-south-america', 'Where is Colombia?', 0], ['colombia-regions-map', 'Six regions', 1], ['colombia-peak', 'Higher means colder', 3], ['colombia-cano', 'Birds, giant palms and a red river', 3]].map(([i, t, n]) => `<button data-jump="${n}"><img src="${IMG(i)}" alt=""><span>${t}</span></button>`).join('')}</div></section>
      <section class="panel qrEnd"><div><h2>When the lesson ends</h2><p class="mute">The TV shows this code. Each child scans it, signs in on their own device, and the test is waiting.</p><div class="row"><button class="btn" data-view="test" data-press>Open the test here</button></div></div><div id="qrKit" role="img" aria-label="QR code that opens the test"></div></section>`;
    const qr = $('#qrKit');
    if (qr && window.QRCode) new QRCode(qr, { text: `${location.href.split('#')[0]}#${document.documentElement.dataset.t}.${document.documentElement.dataset.m}.test`, width: 180, height: 180 });
    go($('#player > img'), { scale: [1.08, 1], opacity: [.5, 1] }, { duration: .5, ease: 'easeOut' });
    go($('#player .big'), { x: [-30, 0], opacity: [0, 1] }, { duration: .35, ease: 'easeOut' });
  }

  /* ---------- Test: one interaction per type, filled from data ---------- */
  const R = {
    /* Tap a real region on the map. Any country or body map with shapes works the same way. */
    region: {
      html(q, v, st) {
        const M = window.COLOMBIA_MAP, shape = (r) => (r.id === 'insular' ? `<circle cx="115" cy="225" r="90" data-v="insular" tabindex="0" role="button" aria-label="Region"/>` : `<path d="${r.d}" data-v="${r.id}" tabindex="0" role="button" aria-label="Region"/>`);
        return `<svg class="rmap" viewBox="0 100 1763 2026" role="group" aria-label="Map of Colombia">${M.regions.map((r) => `<g class="${v === r.id ? 'on' : ''} ${st.reveal ? (r.id === q.a ? 'right' : r.id === v ? 'wrong' : '') : ''}" style="--r:${r.color}">${shape(r)}</g>`).join('')}${st.reveal ? M.regions.map((r) => `<text x="${r.id === 'insular' ? 300 : r.center[0]}" y="${r.id === 'insular' ? 240 : r.center[1]}" text-anchor="${r.id === 'insular' ? 'start' : 'middle'}">${r.name}</text>`).join('') : ''}</svg>`;
      },
      ok: (q, v) => v === q.a, done: (q, v) => v != null,
      click(e) { const b = e.target.closest('[data-v]'); return b ? b.dataset.v : undefined; },
    },
    find: {
      html: (q, v, st) => `<div class="fig" id="fig" style="${st.narrow || ''}"><img src="${IMG(q.img)}" alt="">${(q.masks || []).map(([x, y, w, h]) => `<i class="mask" style="left:${x - w / 2}%;top:${y - h / 2}%;width:${w}%;height:${h}%"></i>`).join('')}${q.spots.map(([x, y, n], k) => `<button class="spot ${v === k ? 'on' : ''} ${st.reveal ? (k === q.a ? 'right' : k === v ? 'wrong' : '') : ''}" style="left:${x}%;top:${y}%" data-v="${k}" aria-label="${esc(st.exam && q.numbered ? `Place ${n}` : `Place ${k + 1}`)}">${q.numbered ? `<b>${n}</b>` : ''}</button>`).join('')}</div>`,
      ok: (q, v) => v === q.a, done: (q, v) => v != null,
      click(e, q) { const b = e.target.closest('[data-v]'); return b ? +b.dataset.v : undefined; },
    },
    pics: {
      html: (q, v, st) => `<div class="pics">${q.o.map(([i, t], k) => `<button data-v="${k}" class="${v === k ? 'on' : ''} ${st.reveal ? (k === q.a ? 'right' : k === v ? 'wrong' : '') : ''}"><img src="${IMG(i)}" alt="Muscle under a microscope"><span>${t}</span></button>`).join('')}</div>`,
      ok: (q, v) => v === q.a, done: (q, v) => v != null,
      click(e) { const b = e.target.closest('[data-v]'); return b ? +b.dataset.v : undefined; },
    },
    estimate: {
      init: () => 1000,
      html(q, v, st) {
        const pct = (x) => `${(x / q.max) * 100}%`;
        return `<div class="scaleBox"><input type="range" id="est" aria-label="Your estimate" min="${q.min}" max="${q.max}" step="${q.step}" value="${v}" ${st.reveal ? 'disabled' : ''}>
          <div class="mountain"><svg viewBox="0 0 100 100" preserveAspectRatio="none"><path d="M0 100L20 76L34 48L48 22L52 8L58 24L70 52L84 78L100 100Z" fill="#6DAA3A"/><path d="M34 48L48 22L52 8L58 24L70 52L60 46L52 56L44 44Z" fill="#9C8B4A"/><path d="M48 22L52 8L58 24L54 20L50 26Z" fill="#F4F8FF"/></svg>
          ${st.reveal ? `<div class="mark truth" style="bottom:${pct(q.a)}"><b>Really about ${q.a.toLocaleString('en-US')} ${q.unit}</b></div>` : ''}<div class="mark" id="estMark" style="bottom:${pct(v)}"><b id="estV">${Number(v).toLocaleString('en-US')} ${q.unit}</b></div></div></div>`;
      },
      ok: (q, v) => Math.abs(v - q.a) <= q.tol, done: () => true,
      input(e, q) { if (e.target.id !== 'est') return undefined; const v = +e.target.value; $('#estMark').style.bottom = `${(v / q.max) * 100}%`; $('#estV').textContent = `${v.toLocaleString('en-US')} ${q.unit}`; return { silent: v }; },
    },
    order: {
      init: (q) => { let o; do { o = shuffled(q.items.map((_, i) => i)); } while (o.every((x, i) => x === i)); return o; },
      html: (q, v, st) => `<ol class="orderL ${st.reveal && v.every((x, i) => x === i) ? 'right' : ''}">${v.map((k, pos) => `<li style="--c:${q.items[k][1]}"><i></i><span>${esc(q.items[k][0])}${st.reveal && k !== pos ? ` <small>(goes at ${q.items.length ? `place ${k + 1}` : ''})</small>` : ''}</span>${st.reveal ? '' : `<span class="row" style="gap:4px"><button class="btn small sec icon" style="width:40px" data-up="${pos}" aria-label="Move up" ${pos ? '' : 'disabled'}>↑</button><button class="btn small sec icon" style="width:40px" data-down="${pos}" aria-label="Move down" ${pos < v.length - 1 ? '' : 'disabled'}>↓</button></span>`}</li>`).join('')}</ol>`,
      ok: (q, v) => v.every((x, i) => x === i), done: () => true,
      click(e, q, v) { const u = e.target.closest('[data-up]'), d = e.target.closest('[data-down]'); if (!u && !d) return undefined; const n = [...v], i = +(u || d).dataset[u ? 'up' : 'down'], j = u ? i - 1 : i + 1; [n[i], n[j]] = [n[j], n[i]]; return n; },
    },
    match: {
      init: () => ({}),
      html(q, v, st) {
        q._names ||= shuffled(q.pairs.map((p) => p[1]));
        return `<div class="matchGrid" id="mg"><svg class="lines"></svg>${q.pairs.map(([img], k) => { const name = q._names.indexOf(v[k]); return `<button data-left="${k}" class="${st.pick === k ? 'pick' : ''} ${v[k] ? 'linked' : ''}" style="grid-column:1;grid-row:${k + 1}"><img src="${IMG(img)}" alt="Photo ${k + 1}">Photo ${k + 1}</button>`; }).join('')}${q._names.map((n, k) => `<button class="nm ${Object.values(v).includes(n) ? 'linked' : ''}" data-right="${esc(n)}" style="grid-column:2;grid-row:${k + 1}">${esc(n)}</button>`).join('')}</div>`;
      },
      after(q, v, st) {
        const g = $('#mg'); if (!g) return; const box = g.getBoundingClientRect(), svg = $('.lines', g);
        svg.innerHTML = Object.entries(v).map(([k, n]) => { const a = $(`[data-left="${k}"]`, g).getBoundingClientRect(), b = $(`[data-right="${CSS.escape(n)}"]`, g).getBoundingClientRect(); const good = q.pairs[k][1] === n; return `<line x1="${a.right - box.left}" y1="${a.top + a.height / 2 - box.top}" x2="${b.left - box.left}" y2="${b.top + b.height / 2 - box.top}" stroke="${st.reveal ? (good ? 'var(--ok)' : 'var(--no)') : 'var(--acc)'}" stroke-width="5" stroke-linecap="round"/>`; }).join('');
      },
      ok: (q, v) => q.pairs.every(([, n], k) => v[k] === n), done: (q, v) => Object.keys(v).length === q.pairs.length,
      click(e, q, v, st) {
        const l = e.target.closest('[data-left]'), r = e.target.closest('[data-right]');
        if (l) { st.pick = +l.dataset.left; return { ...v }; }
        if (r && st.pick != null) { const n = { ...v }; Object.keys(n).forEach((k) => { if (n[k] === r.dataset.right) delete n[k]; }); n[st.pick] = r.dataset.right; st.pick = null; return n; }
        return undefined;
      },
    },
    sort: {
      init: () => ({}),
      html(q, v, st) {
        const chip = (it, k) => `<span class="chip ${st.pick === k ? 'pick' : ''} ${st.reveal ? (v[k] === it[1] ? 'right' : 'wrong') : ''}" data-chip="${k}" draggable="false">${it[2] ? `<img src="${IMG(it[2])}" alt="">` : ''}${esc(it[0])}</span>`;
        return `<div class="bank" data-bin="">${q.items.map((it, k) => (v[k] == null ? chip(it, k) : '')).join('')}</div><div class="bins">${q.bins.map((b, n) => `<button class="bin" data-bin="${n}"><b>${esc(b)}</b><span class="inside">${q.items.map((it, k) => (v[k] === n ? chip(it, k) : '')).join('')}</span></button>`).join('')}</div>`;
      },
      ok: (q, v) => q.items.every((it, k) => v[k] === it[1]), done: (q, v) => Object.keys(v).length === q.items.length,
      click(e, q, v, st) {
        const c = e.target.closest('[data-chip]'), b = e.target.closest('[data-bin]');
        if (c) { st.pick = +c.dataset.chip; return { ...v }; }
        if (b && st.pick != null && b.dataset.bin !== '') { const n = { ...v, [st.pick]: +b.dataset.bin }; st.pick = null; return n; }
        return undefined;
      },
      drop(k, bin, v) { return { ...v, [k]: bin }; },
    },
    label: {
      init: () => ({}),
      html(q, v, st) {
        const names = Object.values(q.a); q._b ||= shuffled(names);
        return `<div class="twoCol"><div class="fig"><img src="${IMG(q.img)}" alt="A body’s muscles, from the front">${Object.entries(q.pins).map(([l, [x, y]]) => `<button class="spot ${v[l] ? 'on' : ''} ${st.reveal ? (v[l] === q.a[l] ? 'right' : 'wrong') : ''}" data-pin="${l}" style="left:${x}%;top:${y}%" aria-label="Letter ${l}"><b>${l}</b></button>`).join('')}</div>
          <div class="stack"><div class="bank">${q._b.filter((n) => !Object.values(v).includes(n)).map((n) => `<span class="chip ${st.pickN === n ? 'pick' : ''}" data-name="${esc(n)}">${esc(n)}</span>`).join('')}</div>${Object.keys(q.pins).map((l) => `<button class="note" data-pin="${l}" style="width:100%;text-align:left;${st.reveal ? `border-left-color:${v[l] === q.a[l] ? 'var(--ok)' : 'var(--no)'}` : ''}"><b>${l}</b><span>${esc(v[l] || (st.reveal ? '' : 'Drop a name here'))}${st.reveal && v[l] !== q.a[l] ? ` → ${esc(q.a[l])}` : ''}</span></button>`).join('')}</div></div>`;
      },
      ok: (q, v) => Object.keys(q.a).every((l) => v[l] === q.a[l]), done: (q, v) => Object.keys(v).length === Object.keys(q.a).length,
      click(e, q, v, st) {
        const n = e.target.closest('[data-name]'), p = e.target.closest('[data-pin]');
        if (n) { st.pickN = n.dataset.name; return { ...v }; }
        if (p && st.pickN) { const o = { ...v, [p.dataset.pin]: st.pickN }; st.pickN = null; return o; }
        if (p && v[p.dataset.pin]) { const o = { ...v }; delete o[p.dataset.pin]; return o; }
        return undefined;
      },
    },
    gaps: {
      init: () => [],
      html(q, v, st) {
        const blank = q.parts.length - 1;
        const right = (k) => (q.any ? q.a.includes(v[k]) && v.indexOf(v[k]) === k : v[k] === q.a[k]);
        return `<p style="font-size:clamp(19px,2.3vw,26px);line-height:1.7;font-weight:600">${q.parts.map((t, k) => `${esc(t)}${k < blank ? `<button class="gap ${v[k] ? 'filled' : ''} ${st.reveal ? (right(k) ? 'right' : 'wrong') : ''}" data-gap="${k}" aria-label="Gap ${k + 1}">${esc(v[k] || ' ')}</button>` : ''}`).join('')}</p><div class="bank">${(q._s ||= shuffled(q.bank)).filter((w) => !v.includes(w)).map((w) => `<button class="chip" data-word="${esc(w)}">${esc(w)}</button>`).join('')}</div>`;
      },
      ok: (q, v) => (q.any ? q.a.every((w) => v.includes(w)) : q.a.every((w, k) => v[k] === w)), done: (q, v) => v.filter(Boolean).length === q.parts.length - 1,
      click(e, q, v) {
        const w = e.target.closest('[data-word]'), g = e.target.closest('[data-gap]');
        if (w) { const n = [...v]; let at = 0; while (n[at]) at++; if (at < q.parts.length - 1) n[at] = w.dataset.word; return n; }
        if (g && v[+g.dataset.gap]) { const n = [...v]; n[+g.dataset.gap] = undefined; return n; }
        return undefined;
      },
    },
    contract: {
      init: () => ({ k: 100 }),
      html(q, v, st) {
        const f = v.k / 100, L = 300 * f, r = 44 / Math.sqrt(f), cx = 300, xl = cx - L / 2, xr = cx + L / 2;
        return `<div class="muscleBox" id="mb"><svg viewBox="0 0 600 210" role="img" aria-label="A muscle between two bones"><rect x="${xl - 62}" y="16" width="24" height="178" rx="12" fill="#E9E3D2" stroke="#0005" stroke-width="2"/><rect x="${xr + 38}" y="16" width="24" height="178" rx="12" fill="#E9E3D2" stroke="#0005" stroke-width="2"/>
          <path d="M${xl - 40} 105L${xl} 105M${xr} 105L${xr + 40} 105" stroke="#EFE8D2" stroke-width="10" stroke-linecap="round"/><ellipse cx="${cx}" cy="105" rx="${L / 2}" ry="${r}" fill="#D9483F" stroke="#7A1B16" stroke-width="3"/>${[-.55, -.2, .15, .5].map((d) => `<path d="M${xl + 16} ${105 + d * r}Q${cx} ${105 + d * r * 1.1} ${xr - 16} ${105 + d * r}" fill="none" stroke="#FFFFFF44" stroke-width="3"/>`).join('')}
          </svg></div>
          <label class="f">Length: <b id="cV">${v.k}%</b><input class="rng" type="range" id="cR" min="60" max="100" value="${v.k}" style="--v:${(v.k - 60) / 40 * 100}%" ${v.k <= 66 ? 'disabled' : ''}></label>
          ${v.k <= 66 ? `<p class="q" style="font-size:20px">${esc(q.ask)}</p><div class="stack">${q.o.map((t, k) => `<button class="ans ${v.pick === k ? 'on' : ''} ${st.reveal ? (k === q.a ? 'right' : k === v.pick ? 'wrong' : '') : ''}" data-opt="${k}" ${st.reveal ? 'disabled' : ''}>${esc(t)}</button>`).join('')}</div>` : ''}`;
      },
      ok: (q, v) => v.pick === q.a, done: (q, v) => v.pick != null,
      click(e, q, v) { const o = e.target.closest('[data-opt]'); return o ? { ...v, pick: +o.dataset.opt } : undefined; },
      input(e, q, v) { if (e.target.id !== 'cR') return undefined; return { ...v, k: +e.target.value }; },
    },
    write: {
      init: () => '',
      html: (q, v) => `<textarea class="in" id="wr" aria-label="Your answer" style="min-height:150px;font-size:18px" placeholder="Write your answer in full sentences">${esc(v)}</textarea>`,
      ok: () => false, done: (q, v) => !!v,
      input(e) { return e.target.id === 'wr' ? { silent: e.target.value } : undefined; },
    },
  };
  const makeState = (q, keep) => (keep != null ? keep : R[q.type].init ? R[q.type].init(q) : null);
  const tone = (f = 600, d = .07, type = 'triangle', vol = .05) => { try { window.__ac ||= new (window.AudioContext || window.webkitAudioContext)(); const c = window.__ac, o = c.createOscillator(), g = c.createGain(); o.type = type; o.frequency.value = f; g.gain.setValueAtTime(vol, c.currentTime); g.gain.exponentialRampToValueAtTime(.001, c.currentTime + d); o.connect(g).connect(c.destination); o.start(); o.stop(c.currentTime + d); } catch (e) {} };

  function drawQ(fresh = true) {
    const list = TESTS[V.test].list, q = list[V.i];
    if (fresh) { V.val = makeState(q); V.st = {}; V.locked = false; }
    $('#flow').innerHTML = `<div class="tabs"><button data-testset="colombia" aria-selected="${V.test === 'colombia'}">Colombia test</button><button data-testset="muscles" aria-selected="${V.test === 'muscles'}">Muscles test</button></div>
      <div class="tItems">${list.map((x, k) => `<button data-qjump="${k}" class="${k === V.i ? 'on' : ''} ${V.res[k] === true ? 'yes' : V.res[k] === false ? 'no' : ''}">${esc(x.skill)}</button>`).join('')}</div>
      <section class="panel qWrap" id="qCard"><div><p class="q2">${esc(q.q)}</p>${q.help ? `<p class="mute" style="margin-top:4px">${esc(q.help)}</p>` : ''}</div><div id="qBody" class="stack" style="${q.type === 'find' || q.type === 'region' ? 'max-width:480px;width:100%;justify-self:center' : ''}">${R[q.type].html(q, V.val, V.st)}</div>
      <div class="whyBox" id="qFoot">${V.locked ? `<p><b>${V.lastOk ? 'Correct!' : 'Not quite.'}</b> ${esc(q.why)}</p><button class="btn" id="nextQ" data-press>${V.i === list.length - 1 ? 'See my result' : 'Next'}</button>` : `<span class="mute"></span><button class="btn" id="checkQ" data-press ${R[q.type].done(q, V.val) ? '' : 'disabled'}>Check answer</button>`}</div></section>`;
    R[q.type].after?.(q, V.val, V.st);
    if (fresh) { go($('#qCard'), { y: [24, 0], opacity: [0, 1] }, { duration: .28, ease: 'easeOut' }); }
    bindDrag(q);
  }
  function setVal(n) { V.val = n; drawQ(false); }
  /* Drag works with mouse and finger. Tapping does the same job. */
  function bindDrag(q) {
    if (!['sort', 'label'].includes(q.type) || V.locked) return;
    $$('[data-chip], [data-name]', $('#flow')).forEach((chip) => {
      chip.onpointerdown = (e) => {
        const start = { x: e.clientX, y: e.clientY }; let ghost = null, over = null;
        const move = (m) => {
          if (!ghost && Math.hypot(m.clientX - start.x, m.clientY - start.y) < 8) return;
          if (!ghost) { ghost = chip.cloneNode(true); ghost.classList.add('floatPick'); document.body.append(ghost); chip.style.opacity = .3; }
          ghost.style.left = `${m.clientX}px`; ghost.style.top = `${m.clientY}px`;
          const t = document.elementFromPoint(m.clientX, m.clientY)?.closest(q.type === 'sort' ? '.bin' : '[data-pin]');
          if (over !== t) { over?.classList.remove('over'); over = t; over?.classList.add('over'); }
        };
        const up = () => {
          removeEventListener('pointermove', move); removeEventListener('pointerup', up);
          if (ghost) {
            ghost.remove(); chip.style.opacity = '';
            if (over) { tone(); window.__skipClick = true; if (q.type === 'sort') setVal({ ...V.val, [+chip.dataset.chip]: +over.dataset.bin }); else setVal({ ...V.val, [over.dataset.pin]: chip.dataset.name }); }
          }
        };
        addEventListener('pointermove', move); addEventListener('pointerup', up);
      };
    });
  }
  function check() {
    const q = TESTS[V.test].list[V.i], ok = R[q.type].ok(q, V.val);
    V.locked = true; V.st.reveal = true; V.lastOk = ok; V.res[V.i] = ok;
    tone(ok ? 880 : 200, ok ? .22 : .2, ok ? 'sine' : 'triangle', .07); if (ok) tone(1320, .2, 'sine', .04);
    drawQ(false);
    go($('#qFoot p'), { y: [8, 0], opacity: [0, 1] }, { duration: .2, ease: 'easeOut' });
    go($('#qCard'), ok ? { scale: [1, 1.012, 1] } : { x: [0, -6, 5, -2, 0] }, { duration: .3 });
  }

  /* ---------- Test result ---------- */
  function result() {
    const list = TESTS[V.test].list;
    if (!V.res.length || V.res.length < list.length) V.res = list.map((_, i) => i !== 2);
    const right = V.res.filter(Boolean).length;
    $('#flow').innerHTML = `<section class="panel modal"><p class="mute">${esc(TESTS[V.test].name)} test</p><p class="bigNum"><span id="rN">0</span>/${list.length}</p><h2 class="q2">${right === list.length ? 'You’ve got this lesson' : right >= list.length - 1 ? 'Nearly there' : 'Good start. Let’s fix the rest'}</h2><div class="bar" style="width:min(100%,520px)"><i style="--w:${right / list.length * 100}%"></i></div></section>
      <div class="grid">${list.map((q, k) => `<section class="panel c6 mCard"><div class="row" style="justify-content:space-between"><b class="h" style="font-size:19px">${V.res[k] ? 'You can' : 'Look again'}: ${esc(q.skill.toLowerCase())}</b><span class="tag ${V.res[k] ? 'ok' : 'no'}">${V.res[k] ? 'Done' : 'Practice'}</span></div><p class="mute">${esc(q.why)}</p>${V.res[k] ? '' : `<button class="btn small sec" data-qjump="${k}" data-goq>Try it again now</button>`}</section>`).join('')}</div>
      <div class="row"><button class="btn" data-view="today" data-press>Back to My day</button><button class="btn sec" data-view="test" data-press>Take it again</button></div>`;
    if (!reduced && window.Motion) { Motion.animate(0, right, { duration: .7, ease: 'easeOut', onUpdate: (v) => { const e = $('#rN'); if (e) e.textContent = Math.round(v); } }); go($('.bigNum'), { scale: [.6, 1.05, 1] }, { duration: .5 }); go($$('.mCard'), { y: [18, 0], opacity: [0, 1] }, { duration: .3, delay: Motion.stagger(.06, { startDelay: .35 }) }); } else $('#rN').textContent = right;
    tone(660, .2, 'sine', .06); setTimeout(() => tone(990, .28, 'sine', .05), 150);
  }

  /* ---------- Exam: the same interactions, no answers shown, and calm ---------- */
  function startExam() {
    $('#flow').innerHTML = `<section class="panel stack" style="max-width:760px;width:100%;justify-self:center"><span class="tag">Unit exam</span><h2 class="q2">Human skeleton and muscles</h2>
      <div class="row" style="gap:26px"><div class="stat"><b>30</b><small>minutes</small></div><div class="stat"><b>17</b><small>questions</small></div><div class="stat"><b>34</b><small>marks</small></div><div class="stat"><b>1</b><small>attempt</small></div></div>
      <ul class="stack mute"><li>Do this alone, with an adult nearby.</li><li>No books, phones or videos.</li><li>You’ll see your answers after you finish.</li></ul>
      <label class="f">Adult: enter the exam PIN<input class="in" inputmode="numeric" maxlength="4" value="0000" style="max-width:150px;letter-spacing:.3em"></label>
      <div><button class="btn big" id="examGo" data-press>Start exam</button></div></section>`;
  }
  function drawExam() {
    const q = EXAM[V.ei], cur = V.ea[V.ei] !== undefined ? V.ea[V.ei] : makeState(q);
    V.ea[V.ei] = cur;
    $('#flow').innerHTML = `<section class="panel examHead"><div><span class="mute">${q.sec}, question ${V.ei + 1} of ${EXAM.length} in this sample, ${q.marks} ${q.marks === 1 ? 'mark' : 'marks'}</span></div><span class="clock" id="clock">30:00</span><div class="rail">${EXAM.map((_, k) => `<button data-eq="${k}" class="${k === V.ei ? 'cur' : ''} ${isAnswered(k) ? 'ans1' : ''}" aria-label="Question ${k + 1}">${k + 1}</button>`).join('')}</div></section>
      <section class="panel qWrap"><p class="q2">${esc(q.q)}</p>${q.help ? `<p class="mute">${esc(q.help)}</p>` : ''}<div id="qBody" class="stack" style="${q.type === 'find' ? 'max-width:430px;width:100%;justify-self:center' : ''}">${R[q.type].html(q, cur, V.est ||= {})}</div>
      <div class="row" style="justify-content:space-between"><button class="btn ghost" id="ePrev" ${V.ei ? '' : 'disabled'}>Previous</button><button class="btn" id="eNext">${V.ei === EXAM.length - 1 ? 'Finish exam' : 'Next'}</button></div></section>`;
    bindExamDrag(q);
    tick();
  }
  const isAnswered = (k) => { const q = EXAM[k], v = V.ea[k]; return v !== undefined && R[q.type].done(q, v); };
  function bindExamDrag(q) { if (q.type !== 'sort') return; const save = V.locked; V.locked = false; const old = setVal; $$('[data-chip]').forEach((chip) => { chip.onpointerdown = null; }); V.locked = save; }
  function tick() { const c = $('#clock'); if (!c) return; const l = Math.max(0, V.end - Date.now()); c.textContent = `${Math.floor(l / 60000)}:${String(Math.floor(l / 1000) % 60).padStart(2, '0')}`; clearTimeout(tick.t); tick.t = setTimeout(tick, 1000); }
  function examResult() {
    const rows = [['The skeleton', 11, 13], ['Muscles', 7, 8], ['Movement', 5, 8], ['Biomechanics', 4, 5]];
    $('#flow').innerHTML = `<section class="panel modal"><p class="mute">Unit exam: Human skeleton and muscles</p><p class="bigNum"><span id="eN">0</span>/34</p><h2 class="q2">Your marks so far</h2><p class="mute">A parent is still marking 4 marks from your written answers.</p></section>
      <section class="panel"><h2>By lesson</h2><div class="stack">${rows.map(([t, a, b]) => `<div><div class="row" style="justify-content:space-between;font-size:15px"><span>${t}</span><b>${a} of ${b}</b></div><div class="bar ${a / b >= .8 ? 'good' : ''}"><i style="--w:0%" data-w="${a / b * 100}%"></i></div></div>`).join('')}</div><div class="note"><div><b>Practice next: Movement</b>That’s where you lost the most marks.</div></div></section>
      <div class="row"><button class="btn" data-view="today" data-press>Back to My day</button></div>`;
    if (!reduced && window.Motion) Motion.animate(0, 27, { duration: 1.3, ease: 'easeInOut', onUpdate: (v) => { const e = $('#eN'); if (e) e.textContent = Math.round(v); } }); else $('#eN').textContent = 27;
    setTimeout(() => { $$('.bar [data-w]').forEach((b) => { b.style.transition = 'width .7s ease-out'; b.style.setProperty('--w', b.dataset.w); }); tone(880, .3, 'sine', .06); }, reduced ? 0 : 1200);
  }

  /* ---------- Clicks ---------- */
  document.addEventListener('click', (e) => {
    if (window.__skipClick) { window.__skipClick = false; return; }
    const b = e.target.closest('button, [data-chip], [data-name], svg [data-v]'); if (!b) return;
    const d = b.dataset;
    if (d.view) { tone(); show(d.view); window.scrollTo({ top: $('#views').offsetTop - 8 }); return; }
    if (d.scene) { sc = (sc + +d.scene + SCENES.length) % SCENES.length; tone(); lesson(); return; }
    if (d.jump != null) { sc = +d.jump; tone(); lesson(); $('#player').scrollIntoView({ block: 'nearest' }); return; }
    if (d.testset) { V.test = d.testset; V.i = 0; V.res = []; tone(); drawQ(); return; }
    if (d.qjump != null) { V.i = +d.qjump; V.res[V.i] = undefined; if (V.view !== 'test') { V.view = 'test'; nav(); } tone(); drawQ(); return; }
    if (b.id === 'checkQ') { check(); return; }
    if (b.id === 'nextQ') { const list = TESTS[V.test].list; if (V.i === list.length - 1) { V.view = 'result'; nav(); result(); } else { V.i++; tone(); drawQ(); } return; }
    if (b.id === 'examGo') { V.ei = 0; V.ea = {}; V.est = {}; V.end = Date.now() + 1800000; drawExam(); return; }
    if (d.eq != null) { V.ei = +d.eq; drawExam(); return; }
    if (b.id === 'ePrev') { V.ei--; drawExam(); return; }
    if (b.id === 'eNext') { if (V.ei < EXAM.length - 1) { V.ei++; drawExam(); } else { V.view = 'examresult'; nav(); examResult(); } return; }
    if (V.view === 'test' && !V.locked) {
      const q = TESTS[V.test].list[V.i], n = R[q.type].click?.(e, q, V.val, V.st);
      if (n !== undefined) { tone(640, .05); setVal(n); const t = $(`[data-v="${n}"]`); if (t) go(t, { scale: [.85, 1] }); }
    }
    if (V.view === 'exam' && $('.rail')) {
      const q = EXAM[V.ei], n = R[q.type].click?.(e, q, V.ea[V.ei], V.est);
      if (n !== undefined) { V.ea[V.ei] = n; const y = scrollY; drawExam(); scrollTo(0, y); }
    }
  });
  /* Map regions can be chosen by keyboard or remote too. */
  document.addEventListener('keydown', (e) => { if ((e.key === 'Enter' || e.key === ' ') && e.target.closest?.('svg [data-v]')) { e.preventDefault(); e.target.dispatchEvent(new MouseEvent('click', { bubbles: true })); } });
  document.addEventListener('input', (e) => {
    if (V.view === 'test' && !V.locked) {
      const q = TESTS[V.test].list[V.i], n = R[q.type].input?.(e, q, V.val);
      if (n === undefined) return;
      if (n && 'silent' in n) { V.val = n.silent; return; }
      V.val = n; const had = n.k > 66; const r = n.k; if (q.type === 'contract') { if (r <= 66) tone(180, .25, 'triangle', .08); drawQ(false); const inp = $('#cR'); inp?.focus(); }
    }
    if (V.view === 'exam' && $('.rail')) {
      const q = EXAM[V.ei], n = R[q.type].input?.(e, q, V.ea[V.ei]);
      if (n && 'silent' in n) { V.ea[V.ei] = n.silent; $(`[data-eq="${V.ei}"]`)?.classList.toggle('ans1', isAnswered(V.ei)); }
    }
  });
  addEventListener('resize', () => { const q = TESTS[V.test]?.list[V.i]; if (V.view === 'test' && q) R[q.type].after?.(q, V.val, V.st); });
  const start = location.hash.split('.')[2];
  V.view = VIEWS.some(([k]) => k === start) ? start : 'today';
  nav(); show(V.view);
})();
