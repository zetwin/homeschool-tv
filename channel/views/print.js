/* Pages to print, for parents: exam papers, a worksheet per lesson, each child's week as a checklist, and a habit chart.
   Every page is built from content we already have. Each one looks like a sheet of A4 on screen, and prints in black and white with no app around it.
   Routes: #print, #print-exam, #print-lesson-<episode id>, #print-week-<child id>, #print-habits-<child id>. */
(function () {
  const S = () => window.Store, Sc = () => window.Schedule;
  /* Two example habits. Other rows are left empty to write by hand. */
  const HABITS = ['Chess', 'Read a hard-cover book'];
  const EMPTY_HABIT_ROWS = 4;
  const LETTERS = 'ABCDEFGHIJ';
  const V = { answers: true, nextWeek: false };
  /* Names for the parts of the body and skeleton drawings, for the answer pages. */
  const PART = { heart: 'The heart', gut: 'The intestines', biceps: 'The upper arm (biceps)', thigh: 'The thigh', skull: 'The skull', ribs: 'The ribs', pelvis: 'The pelvis', humerus: 'The humerus', forearm: 'The forearm', femur: 'The femur', shin: 'The shin', spine: 'The spine', jaw: 'The jaw' };

  /* The same mixed-up order every time, so a reprint matches its answer page. */
  function seeded(list, key) {
    let h = 2166136261; for (const c of key) h = Math.imul(h ^ c.charCodeAt(0), 16777619);
    const rnd = () => { h = Math.imul(h ^ (h >>> 15), 2246822507); h = Math.imul(h ^ (h >>> 13), 3266489909); return ((h ^= h >>> 16) >>> 0) / 4294967296; };
    const a = [...list]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
    return a;
  }
  const mixed = (n, key) => { const idx = [...Array(n).keys()]; let out = seeded(idx, key); if (n > 1 && out.every((x, i) => x === i)) out = [...out.slice(1), out[0]]; return out; };
  const pic = (f) => window.LIB.img(f);
  const box = '<i class="prBox" aria-hidden="true"></i>';
  const lines = (n) => `<div class="prLines">${'<span></span>'.repeat(n)}</div>`;
  const num = (x) => Number(x).toLocaleString('en-GB');
  const marksOf = (q) => q.marks || 1;
  const keyOf = (q) => q.q + (q.text || '');
  const cap = (t) => t.charAt(0).toUpperCase() + t.slice(1);
  /* Instructions go first, right under the question, because children read from the top. */
  const how = (t) => `<p class="prHow">${t}</p>`;
  /* On paper the ribs letter points to the right side, so it can't be mixed up with the upper arm. */
  const PAPER_AT = { ribs: [138, 152] };

  /* ---------- Each question type, on paper ---------- */
  const options = (list, show = (t) => esc(t)) => `<ul class="prOpts">${list.map((t, k) => `<li>${box}<b>${LETTERS[k]}</b><span>${show(t)}</span></li>`).join('')}</ul>`;
  /* The body or skeleton drawing. Letters sit beside it, each with a line to its part, so no two letters cover each other. */
  function figure(q) {
    const art = (q.fig === 'body' ? window.LIB.bodyMap() : window.LIB.skeleton()).replace('<svg ', '<svg x="0" y="0" width="240" height="645" ');
    if (!q.pins) return `<div class="prFig"><svg viewBox="0 0 240 645" role="img" aria-label="Drawing">${art}</svg></div>`;
    const sides = { l: [], r: [] };
    Object.entries(q.pins).forEach(([l, b]) => { const [x, y] = PAPER_AT[b] || window.QT.PIN_AT[b]; sides[x < 120 ? 'l' : 'r'].push({ l, x, y, ty: y }); });
    Object.values(sides).forEach((list) => { list.sort((a, b) => a.y - b.y); list.forEach((p, i) => { if (i) p.ty = Math.max(p.y, list[i - 1].ty + 52); }); });
    const mark = (p, side) => { const cx = side === 'l' ? -66 : 306, ex = side === 'l' ? cx + 24 : cx - 24;
      return `<line x1="${ex}" y1="${p.ty}" x2="${p.x}" y2="${p.y}"/><circle class="dot" cx="${p.x}" cy="${p.y}" r="5"/><circle cx="${cx}" cy="${p.ty}" r="23"/><text x="${cx}" y="${p.ty + 10}">${p.l}</text>`; };
    return `<div class="prFig wide"><svg viewBox="-96 0 432 645" role="img" aria-label="Drawing with letters">${art}<g class="prPins">${sides.l.map((p) => mark(p, 'l')).join('')}${sides.r.map((p) => mark(p, 'r')).join('')}</g></svg></div>`;
  }
  const PAPER = {
    radio: (q) => options(q.o),
    listen: (q) => `${how('A parent reads one word aloud. Tick the box.')}${options(q.o)}`,
    contract: (q) => options(q.o),
    pics: (q) => `${how('Tick one box.')}<ul class="prPics">${q.o.map((p) => `<li><img src="${pic(p.img)}" alt=""><span>${box}${esc(p.t)}</span></li>`).join('')}</ul>`,
    checkbox: (q) => `${/tick/i.test(q.q) ? '' : how('Tick every one that’s right.')}${options(q.o)}`,
    truefalse: (q) => `${how('Circle True or False on each row.')}<table class="prTF"><tbody>${q.rows.map(([t], i) => `<tr><td>${i + 1}</td><td>${esc(t)}</td><td><span class="prRing">True</span><span class="prRing">False</span></td></tr>`).join('')}</tbody></table>`,
    select: (q) => `${how('Circle the right word in each bracket.')}<p class="prSentence">${esc(q.text).replace(/\{(\d+)\}/g, (m, i) => `<span class="prChoice">${q.choices[+i].map(esc).join(' / ')}</span>`)}</p>`,
    gaps: (q) => `${how('Write a word from the box in each gap.')}<p class="prBank">${seeded(q.bank, keyOf(q)).map((w) => `<span>${esc(w)}</span>`).join('')}</p><p class="prSentence">${esc(q.text).replace(/\{(\d+)\}/g, (m, i) => '<span class="prGap"></span>')}</p>`,
    word: () => `<p class="prWrite">Answer: <span class="prLine"></span></p>`,
    number: (q) => `${q.hint ? how(esc(q.hint)) : ''}<p class="prWrite">Answer: <span class="prLine short"></span> ${esc(q.unit || '')}</p>`,
    slider: (q) => `${how(`It’s between ${num(q.min)} and ${num(q.max)} ${esc(q.unit || '')}.`)}<p class="prWrite">Answer: about <span class="prLine short"></span> ${esc(q.unit || '')}</p>`,
    estimate: (q) => PAPER.slider(q),
    written: (q) => lines(Math.max(3, marksOf(q) + 2)),
    order: (q) => `${how(`Write 1 to ${q.items.length} in the boxes.`)}<ul class="prOrder">${mixed(q.items.length, keyOf(q)).map((i) => `<li><i class="prNum" aria-hidden="true"></i><span>${esc(q.items[i])}</span></li>`).join('')}</ul>`,
    match(q) {
      const right = mixed(q.pairs.length, keyOf(q));
      const left = ([t]) => (t.img ? `<img src="${pic(t.img)}" alt="">${esc(t.t)}` : esc(t));
      return `${how('Draw a line from each one on the left to its match on the right.')}<div class="prMatch"><ol>${q.pairs.map((p, i) => `<li class="${p[0].img ? 'hasImg' : ''}"><b>${i + 1}</b><span>${left(p)}</span><i class="prDot"></i></li>`).join('')}</ol>
        <ol>${right.map((r, k) => `<li><i class="prDot"></i><b>${LETTERS[k]}</b><span>${esc(q.pairs[r][1])}</span></li>`).join('')}</ol></div>`;
    },
    sort: (q) => `${how('Tick one box on each row.')}<table class="prSort"><thead><tr><th scope="col"><span class="vh">Item</span></th>${q.bins.map((b) => `<th scope="col">${esc(b)}</th>`).join('')}</tr></thead>
      <tbody>${mixed(q.items.length, keyOf(q)).map((i) => `<tr><td>${esc(q.items[i].t)}</td>${q.bins.map(() => `<td>${box}</td>`).join('')}</tr>`).join('')}</tbody></table>`,
    label: (q) => `<div class="prFigRow">${figure(q)}<div><p class="prBank">${seeded(q.bank, keyOf(q)).map((w) => `<span>${esc(w)}</span>`).join('')}</p>
      <ul class="prLabelLines">${Object.keys(q.pins).map((l) => `<li><b>${l}</b><span class="prLine"></span></li>`).join('')}</ul></div></div>`,
    tap: (q) => `<div class="prFigRow">${figure(q)}</div>`,
    region(q) {
      const M = window.MAPS[q.map];
      return `<svg class="prMap" viewBox="${M.frame || M.viewBox}" role="img" aria-label="Map with its regions">${M.regions.map((r) => (r.ring ? `<circle cx="${r.ring[0]}" cy="${r.ring[1]}" r="${r.ring[2]}"/><text x="${r.ring[0] + r.ring[2] + 24}" y="${r.ring[1] + 22}">Islands</text>` : `<path d="${r.d}"/>`)).join('')}</svg>`;
    },
  };
  /* What the question says on paper. Screen words like "tap" and "drag" become pen words. */
  function paperAsk(q) {
    if (q.type === 'contract') return `A muscle contracts. ${q.ask}`;
    return q.q.replace(/^Listen\. /, '').replace(/^Tap /, 'Circle ').replace(/^Drag each (.+?) to the correct letter\./, 'Write the right $1 next to each letter.')
      .replace(/^Move the slider to where/, 'Write the height where').replace(/\s*Set it on the ruler\.?$/, '').replace(/\s*Sort them\.?$/, '').replace(/\s*Move the line on the mountain\.?$/, '');
  }

  /* ---------- The answers ---------- */
  function answer(q) {
    const right = (list, k) => `${LETTERS[k]}: ${esc(list[k])}`;
    switch (q.type) {
      case 'radio': case 'contract': return right(q.o, q.a);
      case 'listen': return `Read aloud: <b>${esc(q.clip.replace(/^sp-/, '').replace(/-/g, ' '))}</b>. Answer ${right(q.o, q.a)}`;
      case 'pics': return esc(q.o[q.a].t);
      case 'checkbox': return q.a.map((k) => right(q.o, k)).join('; ');
      case 'truefalse': return q.rows.map(([, t], i) => `${i + 1} ${t ? 'True' : 'False'}`).join(', ');
      case 'select': return `In order: ${q.a.map(esc).join(', ')}`;
      case 'gaps': return `${q.any ? 'In any order' : 'In order'}: ${q.a.map(esc).join(', ')}`;
      case 'word': { const also = q.a.slice(1).filter((w) => !w.startsWith('a ')); return `${esc(cap(q.a[0]))}${also.length ? `. Also accept: ${also.map(esc).join(', ')}` : ''}`; }
      case 'number': return `${num(q.a)} ${esc(q.unit || '')}${q.tol ? ` (${num(q.a - q.tol)} to ${num(q.a + q.tol)} is right)` : ''}`;
      case 'slider': case 'estimate': return `About ${num(q.a)} ${esc(q.unit || '')}${q.tol ? ` (${num(q.a - q.tol)} to ${num(q.a + q.tol)} is right)` : ''}`;
      case 'written': return `One mark for each point:<ul class="prPoints">${(q.points || []).map((p) => `<li>${esc(p)}</li>`).join('')}</ul>`;
      case 'order': { const pos = mixed(q.items.length, keyOf(q)); return `Boxes from the top: ${pos.map((i) => i + 1).join(', ')}. The right order: ${q.items.map(esc).join(', then ')}.`; }
      case 'match': { const right2 = mixed(q.pairs.length, keyOf(q)); return q.pairs.map((p, i) => `${i + 1}–${LETTERS[right2.indexOf(i)]}`).join(', '); }
      case 'sort': return q.bins.map((b, n) => `<b>${esc(b)}:</b> ${q.items.filter((it) => it.bin === n).map((it) => esc(it.t)).join(', ')}`).join('<br>');
      case 'label': return Object.entries(q.a).map(([l, t]) => `${l} ${esc(t)}`).join(', ');
      case 'tap': return PART[q.a] || esc(cap(q.a));
      case 'region': return esc(window.MAPS[q.map].regions.find((r) => r.id === q.a)?.name || q.a);
      default: return '';
    }
  }
  function answerPage(questions, opts) {
    const reads = questions.map((q, i) => (q.type === 'listen' ? `<li>Question ${i + 1}: <b>${esc(q.clip.replace(/^sp-/, '').replace(/-/g, ' '))}</b></li>` : '')).join('');
    return `<section class="prSheet prAnswers"><header class="prAnsHead"><h2>Answers</h2><p>${esc(opts.title.replace(/[.?!]$/, ''))}: for the parent. Keep this page apart.</p></header>
      ${reads ? `<div class="prReads"><h3>Read these words aloud</h3><ul>${reads}</ul></div>` : ''}
      ${opts.marks ? '<p class="prKeyHead">Marks</p>' : ''}<ol class="prKey">${questions.map((q, i) => `<li><b>${i + 1}</b><div><div class="prAns">${answer(q)}</div>${q.why ? `<small>${esc(q.why)}</small>` : ''}</div>${opts.marks ? `<em>${marksOf(q)}</em>` : ''}</li>`).join('')}</ol>${opts.marks ? `<p class="prTotal">Total <b>${questions.reduce((n, q) => n + marksOf(q), 0)}</b></p>` : ''}</section>`;
  }

  /* ---------- One paper: header, questions, then the answers on their own page ---------- */
  function paper({ kicker, title, intro, questions, marks, sections }) {
    const total = questions.reduce((n, q) => n + marksOf(q), 0);
    let last = '';
    const qs = questions.map((q, i) => {
      const head = sections && q.section && q.section !== last ? `<h2 class="prSection">${esc(q.section)}</h2>` : '';
      if (q.section) last = q.section;
      return `${head}<article class="prQ prT-${q.type}"><header><b>${i + 1}</b><h3>${esc(paperAsk(q))}</h3>${marks ? `<em>${marksOf(q)} ${marksOf(q) === 1 ? 'mark' : 'marks'}</em>` : ''}</header>${PAPER[q.type]?.(q) || ''}</article>`;
    }).join('');
    return `<section class="prSheet"><header class="prHead"><div class="prTitle"><p>${esc(kicker)}</p><h1>${esc(title)}</h1><small>${esc(intro)}</small></div>
        <dl class="prFill"><div><dt>Name</dt><dd></dd></div><div><dt>Date</dt><dd></dd></div><div><dt>Score</dt><dd><span>out of ${total}</span></dd></div></dl></header>${qs}</section>
      ${V.answers ? answerPage(questions, { title, marks }) : ''}`;
  }

  /* ---------- The pages ---------- */
  const lessons = () => window.EPISODES.filter((e) => e.test?.length);
  const subjectOf = (ep) => (ep.series || '').split('·')[0].trim() || 'Lesson';
  const kidOf = (id) => S().data.kids.find((k) => k.id === id);
  const mondayShown = () => { const m = Sc().monday(new Date()); return V.nextWeek ? Sc().addDays(m, 7) : m; };
  const longDate = (iso) => Sc().parse(iso).toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' });
  const weekWords = (m) => `Week of ${m.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}`;

  function examSheet() {
    const E = window.ExamData.exam;
    return paper({ kicker: 'Unit exam', title: E.title, intro: `${E.minutes} minutes. Do it alone, with no books, phones or videos. Answer every question on this paper.`, questions: E.questions, marks: true, sections: true });
  }
  function lessonSheet(ep) {
    return paper({ kicker: `${subjectOf(ep)}. ${ep.lessonLabel || ''}`, title: ep.title, intro: `Exercises from the lesson. ${ep.test.length} questions. Write or tick your answers on this sheet.`, questions: ep.test, marks: false });
  }
  function weekSheet(kid) {
    const m = mondayShown(), days = Sc().week(kid, m);
    const word = (p) => (p.kind === 'exam' ? 'Unit exam' : p.kind === 'activity' ? 'Activity' : p.kind === 'free' ? 'Review' : `Lesson ${p.i} of ${p.of}`);
    const rows = days.map((d) => `<section class="prDay"><h2>${esc(longDate(d.date))}</h2>${d.off ? `<p class="prOff">No school: ${esc(d.off)}</p>` : d.periods.length ? `<ul class="prTasks">${d.periods.map((p) => `<li>${box}<time>${esc(p.time)}</time><p><b>${esc(p.subject)}</b> ${esc(p.title.replace(/: unit exam$/, ''))}</p><small>${esc(word(p))}</small></li>`).join('')}</ul>` : '<p class="prOff">No classes.</p>'}</section>`).join('');
    return `<section class="prSheet prCompact"><header class="prHead"><div class="prTitle"><p>${esc(weekWords(m))}</p><h1>${esc(kid.name)}’s week</h1><small>Tick each class when it’s done.</small></div></header>${rows}</section>`;
  }
  function habitSheet(kid) {
    const m = mondayShown(), days = [...Array(7).keys()].map((i) => Sc().addDays(m, i));
    const head = days.map((d) => `<th scope="col">${d.toLocaleDateString('en-GB', { weekday: 'short' })}<small>${d.getDate()}</small></th>`).join('');
    const row = (name) => `<tr><th scope="row">${name ? esc(name) : '<span class="prLine"></span>'}</th>${days.map(() => '<td></td>').join('')}</tr>`;
    return `<section class="prSheet"><header class="prHead"><div class="prTitle"><p>${esc(weekWords(m))}</p><h1>${esc(kid.name)}’s habits</h1><small>Put a tick in the square for each day you do it. Write more habits in the empty rows.</small></div></header>
      <table class="prHabits"><thead><tr><th scope="col"><span class="vh">Habit</span></th>${head}</tr></thead><tbody>${HABITS.map(row).join('')}${Array(EMPTY_HABIT_ROWS).fill('').map(row).join('')}</tbody></table></section>`;
  }

  /* ---------- Materials: categories, then a gallery, then the page with the others beside it ----------
     The owner's direction of 2026-11-10 (lab version F): "full list like from C. and if ill open category it should be a list gallery
     of materials. when im clicking on material it should open it on the right side the others should be on the left."
     Only real pages appear. Kinds that aren't made yet are named once, quietly, as coming. */
  const IC = {
    back: '<path d="M15 5l-7 7 7 7"/>', next: '<path d="M9 5l7 7-7 7"/>', print: '<path d="M6 9V3h12v6M6 18H4v-7h16v7h-2M7 14h10v7H7z"/>',
    week: '<rect x="3" y="4" width="18" height="17" rx="2"/><path d="M3 9h18M8 2v4M16 2v4"/>', lock: '<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>',
  };
  const ic = (n) => `<svg class="ic" viewBox="0 0 24 24" aria-hidden="true">${IC[n]}</svg>`;
  const drawing = (kind) => `<div class="page mtPg">${window.THUMB ? window.THUMB(kind) : ''}</div>`;
  const PIC = { Science: 'skeleton.jpg', Geography: 'colombia-paramo.jpg', Spanish: 'spanish-cover.jpg', 'Emotional Intelligence': 'emotions-cover.jpg' };
  const slug = (t) => t.toLowerCase().replace(/[^a-z]+/g, '-').replace(/^-|-$/g, '');
  const figureOf = (ep) => (ep.test.some((q) => q.type === 'label' || q.type === 'tap') ? 'worksheet' : 'worksheetPlain');
  const thisMonday = () => Sc().monday(new Date());
  /* The lessons on this week's timetable that have a worksheet, for any child */
  function weekLessons() {
    const ids = new Set();
    S().data.kids.forEach((k) => Sc().week(k, thisMonday()).forEach((d) => d.periods.forEach((p) => { if (p.ep) ids.add(p.ep); })));
    return lessons().filter((e) => ids.has(e.id));
  }
  const packKeys = () => [...weekLessons().map((e) => `lesson-${e.id}`), ...S().data.kids.flatMap((k) => [`week-${k.id}`, `habits-${k.id}`])];
  /* Every real page, by its key (the key is also its address: #print-<key>) */
  function pages() {
    const out = {}, E = window.ExamData.exam;
    lessons().forEach((ep) => { out[`lesson-${ep.id}`] = { kind: figureOf(ep), title: ep.title, sub: `${subjectOf(ep)}, ${(ep.lessonLabel || '').replace('Lesson', 'lesson')}. ${ep.test.length} questions`, cat: slug(subjectOf(ep)), sheets: () => lessonSheet(ep), opt: 'answers' }; });
    out.exam = { kind: 'exam', title: `Unit exam: ${E.title}`, sub: `${E.questions.length} questions, ${E.minutes} minutes. Only parents can see it`, cat: 'exams', sheets: examSheet, opt: 'answers' };
    S().data.kids.forEach((k) => {
      out[`week-${k.id}`] = { kind: 'week', title: `${k.name}’s week`, sub: 'Every class with a tick box', cat: 'forms', sheets: () => weekSheet(k), opt: 'week' };
      out[`habits-${k.id}`] = { kind: 'habits', title: `${k.name}’s habit chart`, sub: `${HABITS.join(' and ')}, with empty rows`, cat: 'forms', sheets: () => habitSheet(k), opt: 'week' };
    });
    out.pack = { kind: 'week', title: 'This week’s pack', sub: 'This week’s lessons, and each child’s week and habit chart', cat: 'week', sheets: () => packKeys().map((key) => out[key].sheets()).join(''), opt: 'both' };
    return out;
  }
  function cats() {
    const subjects = [...new Set(lessons().map(subjectOf))];
    return [
      { id: 'week', name: 'This week', icon: 'week' },
      ...subjects.map((t) => ({ id: slug(t), name: t, pic: PIC[t] ? `assets/img/${PIC[t]}` : null, art: 'worksheetPlain' })),
      { id: 'forms', name: 'Charts and forms', art: 'habits' },
      { id: 'exams', name: 'Exam papers', art: 'exam', parentOnly: true },
    ];
  }
  function keysOf(cat) {
    if (cat === 'week') return ['pack', ...packKeys()];
    const all = pages(); return Object.keys(all).filter((k) => all[k].cat === cat);
  }
  const M = { step: 'cats', cat: null, key: null, galleryY: 0 };
  const sheetWord = (key) => (key.startsWith('week-') || key.startsWith('habits-') ? '1 sheet' : key === 'pack' ? `${packKeys().length} pages` : '');

  /* Step 1: every category, the same modest size */
  function catsHtml() {
    const list = cats().map((c) => ({ c, n: keysOf(c.id).length })).filter((x) => x.n);
    return `<div class="mt"><div class="mtCats">${list.map(({ c, n }) => `<button class="mtCat" data-f data-mcat="${c.id}">${c.pic ? `<img src="${c.pic}" alt="">` : `<span class="mtArt">${c.icon ? ic(c.icon) : drawing(c.art)}</span>`}<span class="mtTxt"><span>${esc(c.name)}</span><small>${c.parentOnly ? 'Parents only' : c.id === 'week' ? `${weekWords(thisMonday())}` : `${n} ${n === 1 ? 'page' : 'pages'}`}</small></span></button>`).join('')}</div>
      <p class="mtSoon">More kinds are coming: daily maths, reading logs, chess, kitchen science and art.</p><div id="prHost" class="prDoc"></div></div>`;
  }
  /* Step 2: one category as a gallery across the whole screen */
  const card = (key, p) => `<button class="mtItem" data-f data-mopen="${key}">${drawing(p.kind)}<span>${esc(p.title)}</span><small>${esc(p.sub)}</small></button>`;
  function galleryHtml() {
    const c = cats().find((x) => x.id === M.cat), all = pages(), keys = keysOf(M.cat);
    const back = `<div class="mtBackRow"><button class="mtBack" data-f data-mback>${ic('back')}<span>All materials</span></button></div>`;
    if (M.cat === 'week') {
      const lessonKeys = keys.filter((k) => k.startsWith('lesson-')), kidKeys = keys.filter((k) => k.startsWith('week-') || k.startsWith('habits-'));
      return `<div class="mt" id="mtGal">${back}<div class="mtGTop"><h2>This week</h2><p>${esc(weekWords(thisMonday()))}. The pack: ${packKeys().length} pages</p><button class="mtPrint" data-f data-mprintkey="pack">${ic('print')}<span>Print the pack</span></button></div>
        ${lessonKeys.length ? `<h3 class="mtGroup">From this week’s lessons</h3><div class="mtGallery">${lessonKeys.map((k) => card(k, all[k])).join('')}</div>` : '<p class="mtSoon">None of this week’s classes has a made lesson yet, so there are no lesson exercises this week. Every lesson’s exercises are under its subject.</p>'}
        ${kidKeys.length ? `<h3 class="mtGroup">For each child</h3><div class="mtGallery">${kidKeys.map((k) => card(k, all[k])).join('')}</div>` : ''}<div id="prHost" class="prDoc"></div></div>`;
    }
    return `<div class="mt" id="mtGal">${back}<div class="mtGTop"><h2>${esc(c.name)}</h2><p>${c.parentOnly ? 'Only parents can see these. Children never get them early.' : `${keys.length} ${keys.length === 1 ? 'page' : 'pages'}. Tap one to see it.`}</p></div>
      <div class="mtGallery">${keys.map((k) => card(k, all[k])).join('')}</div><div id="prHost" class="prDoc"></div></div>`;
  }
  /* Step 3: the page on the right, the category's other pages on the left */
  function readHtml() {
    const all = pages(), keys = keysOf(M.cat), p = all[M.key], n = keys.indexOf(M.key), c = cats().find((x) => x.id === M.cat);
    const weekly = p.opt === 'week' || p.opt === 'both', asks = p.opt === 'answers' || p.opt === 'both';
    const opts = `${weekly ? `<span class="mtSeg" role="group" aria-label="Which week"><button data-f data-prweek="0" aria-pressed="${!V.nextWeek}">This week</button><button data-f data-prweek="1" aria-pressed="${V.nextWeek}">Next week</button></span>` : ''}${asks ? `<label class="mtCheck"><input type="checkbox" id="prAnswers" ${V.answers ? 'checked' : ''}>Add the answer pages</label>` : ''}`;
    return `<div class="mt mtRead"><div class="mtBackRow"><button class="mtBack" data-f data-mback>${ic('back')}<span>${esc(c.name)}</span></button></div>
      <nav class="mtList" id="mtList" aria-label="${esc(c.name)}">${keys.map((k) => `<button class="mtRow" data-f data-mopen="${k}" aria-current="${k === M.key}">${drawing(all[k].kind)}<span>${esc(all[k].title)}</span></button>`).join('')}</nav>
      <section class="mtPage" aria-live="polite"><div class="mtTop"><div><p>${esc(p.sub)}</p><h2>${esc(p.title)}</h2></div><button class="mtPrint" data-f data-mprintkey="${M.key}">${ic('print')}<span>Print</span></button></div>
        ${opts ? `<div class="mtOpts">${opts}</div>` : ''}
        <div class="mtPaper"><div class="prDoc">${p.sheets()}</div></div>
        <div class="mtSteps"><button class="mtStep" data-f data-mstep="-1" ${n > 0 ? '' : 'disabled'}>${ic('back')}<span>Previous</span></button><span>${n + 1} of ${keys.length}</span><button class="mtStep" data-f data-mstep="1" ${n < keys.length - 1 ? '' : 'disabled'}><span>Next</span>${ic('next')}</button></div></section>
      <div id="prHost" class="prDoc"></div></div>`;
  }

  /* Printing always goes through #prHost: it holds only the pages being printed, and print styles show nothing else */
  function printKey(key) {
    const host = document.getElementById('prHost'); if (!host) return;
    host.innerHTML = pages()[key].sheets();
    window.print();
  }

  window.renderPrint = function (what = '') {
    if (!S().isParent()) { window.renderLogin(); return; }
    const all = pages(), cs = cats().map((c) => c.id);
    if (what.startsWith('cat-') && cs.includes(what.slice(4))) { M.step = 'gallery'; M.cat = what.slice(4); }
    else if (all[what]) { M.step = 'read'; M.key = what; if (!M.cat || !keysOf(M.cat).includes(what)) M.cat = all[what].cat; }
    else M.step = 'cats';
    window.setRoute(M.step === 'cats' ? 'print' : M.step === 'gallery' ? `print-cat-${M.cat}` : `print-${M.key}`);
    portrait(true);
    const listY = document.getElementById('mtList')?.scrollTop || 0, sameRead = M.step === 'read' && document.querySelector('.mtRead');
    window.cabinetPage('print', M.step === 'cats' ? catsHtml() : M.step === 'gallery' ? galleryHtml() : readHtml(), 'print');
    if (M.step === 'gallery') { const g = document.querySelector('.pgMain'); if (g) g.scrollTop = M.galleryY; }
    if (M.step === 'read') {
      const l = document.getElementById('mtList'); if (l) l.scrollTop = sameRead ? listY : 0;
      if (!sameRead) l?.querySelector('[aria-current="true"]')?.scrollIntoView({ block: 'nearest' });
    }
    document.querySelector(M.step === 'cats' ? '.mtCat' : M.step === 'gallery' ? '.mtItem' : '.mtPrint')?.focus({ preventScroll: true });
  };

  /* Portrait A4 for these pages only. The program document keeps its landscape pages. */
  function portrait(on) {
    let el = document.getElementById('prPageSize');
    if (on && !el) { el = document.createElement('style'); el.id = 'prPageSize'; el.textContent = '@media print { @page { size: A4 portrait; margin: 14mm 14mm 16mm; } }'; document.head.append(el); }
    if (!on) el?.remove();
  }
  /* Any other page sets its own surface, which drops the portrait setting. */
  new MutationObserver(() => { if (document.body.dataset.surface !== 'print') portrait(false); }).observe(document.body, { attributes: true, attributeFilter: ['data-surface'] });


  document.addEventListener('click', (ev) => {
    const el = ev.target.closest('button'); if (!el) return;
    const d = el.dataset;
    if (d.mcat) { M.galleryY = 0; window.renderPrint(`cat-${d.mcat}`); }
    else if (d.mopen) { if (M.step === 'gallery') M.galleryY = document.querySelector('.pgMain')?.scrollTop || 0; window.renderPrint(d.mopen); }
    else if (d.mback != null) window.renderPrint(M.step === 'read' ? `cat-${M.cat}` : '');
    else if (d.mstep) { const keys = keysOf(M.cat), k = keys[keys.indexOf(M.key) + +d.mstep]; if (k) window.renderPrint(k); }
    else if (d.mprintkey) printKey(d.mprintkey);
    else if (d.prweek != null) { V.nextWeek = d.prweek === '1'; window.renderPrint(M.key); }
  });
  document.addEventListener('change', (ev) => { if (ev.target.id === 'prAnswers') { V.answers = ev.target.checked; window.renderPrint(M.key); } });
})();
