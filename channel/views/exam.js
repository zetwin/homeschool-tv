/* Exams and the assessment ladder. Everything marks itself. The child checks their own written answers against the model answer, point by point, so nothing waits for a parent. */
(function () {
  const OBJECTIVES = { skeleton: 'The human skeleton', muscles: 'Muscles', movement: 'Movement', biomechanics: 'Biomechanics' };
  const EXAM = {
    id: 'skeleton-muscles-unit', title: 'Human skeleton and muscles', minutes: 30,
    questions: [
      { section: 'Section A: Quick questions', obj: 'skeleton', marks: 1, type: 'radio', q: 'Which of these is NOT a function of the skeleton?', o: ['Support', 'Protection', 'Digesting food', 'Making blood cells'], a: 2 },
      { obj: 'skeleton', marks: 2, type: 'checkbox', q: 'Tick the two statements that are true.', o: ['Bones contain living cells', 'Adults have about 300 bones', 'Marrow makes blood cells', 'Bones never repair themselves'], a: [0, 2] },
      { obj: 'skeleton', marks: 3, type: 'truefalse', q: 'True or false?', rows: [['The femur is the longest bone.', true], ['The stapes is in your foot.', false], ['Ribs protect the heart and lungs.', true]] },
      { obj: 'muscles', marks: 2, type: 'select', q: 'Complete the sentence.', text: 'Muscle cells use oxygen and {0} to release energy, and this energy lets them {1}.', choices: [['sugar', 'salt', 'calcium'], ['contract', 'dissolve', 'divide']], a: ['sugar', 'contract'] },
      { obj: 'muscles', marks: 1, type: 'radio', q: 'Which kind of muscle moves food through your intestines?', o: ['Skeletal', 'Smooth', 'Cardiac', 'Voluntary'], a: 1 },
      { section: 'Section B: Diagrams and links', obj: 'skeleton', marks: 4, type: 'label', q: 'Drag each name to the correct letter.', pins: { A: 'skull', B: 'ribs', C: 'humerus', D: 'femur' }, bank: ['Skull', 'Ribs', 'Humerus', 'Femur', 'Pelvis', 'Tibia'], a: { A: 'Skull', B: 'Ribs', C: 'Humerus', D: 'Femur' } },
      { obj: 'skeleton', marks: 1, type: 'tap', q: 'Tap the pelvis.', a: 'pelvis' },
      { obj: 'movement', marks: 3, type: 'match', q: 'Match each joint to where it’s found.', pairs: [['Hinge', 'Knee'], ['Ball and socket', 'Hip'], ['Fixed', 'Plates of the skull']] },
      { obj: 'movement', marks: 2, type: 'order', q: 'Put these steps in order to bend your arm.', items: ['The biceps contracts', 'The biceps pulls on the forearm bone', 'The forearm moves at the elbow', 'Your hand comes up'] },
      { section: 'Section C: Calculations', obj: 'biomechanics', marks: 2, type: 'number', q: 'A muscle pulls with 50 N, 0.3 m from a joint. What is the moment?', hint: 'Moment = force × distance', unit: 'N m', a: 15 },
      { obj: 'biomechanics', marks: 2, type: 'number', q: 'A 40 N force acts 0.25 m from a joint. What is the moment?', unit: 'N m', a: 10 },
      { obj: 'biomechanics', marks: 1, type: 'radio', q: 'What is the unit of a moment?', o: ['N', 'N m', 'kg', 'm/s'], a: 1 },
      { section: 'Section D: Written answers', obj: 'movement', marks: 1, type: 'word', q: 'What type of joint is your elbow?', a: ['hinge', 'hinge joint', 'a hinge joint', 'a hinge'], placeholder: 'One word' },
      { obj: 'movement', marks: 1, type: 'word', q: 'Biceps and triceps are called what kind of muscle pair?', a: ['antagonistic', 'antagonistic pair', 'antagonistic pairs', 'antagonistic muscles'], placeholder: 'One word' },
      /* Written answers: one mark for each point in `points`. The child ticks the points their answer makes. */
      { obj: 'skeleton', marks: 2, type: 'written', q: 'Why is spongy bone useful?', points: ['It makes the bone lighter.', 'The bone stays strong.'] },
      { obj: 'movement', marks: 2, type: 'written', q: 'Why is there cartilage at the ends of bones in a joint?', points: ['It stops the bones rubbing together, or reduces friction.', 'It cushions the joint, or absorbs shocks.'] },
      { obj: 'movement', marks: 4, type: 'written', q: 'Explain how the biceps and triceps bend and straighten your arm.', points: ['To bend the arm, the biceps contracts.', 'While the arm bends, the triceps relaxes.', 'To straighten the arm, the triceps contracts.', 'While the arm straightens, the biceps relaxes.'] },
    ],
  };
  const E = { i: 0, answers: {}, flags: {}, endAt: 0, timer: 0, confirm: false };
  const total = () => EXAM.questions.reduce((s, q) => s + q.marks, 0);
  const WRITTEN = EXAM.questions.map((q, i) => (q.type === 'written' ? i : -1)).filter((i) => i >= 0);
  const wrote = (rec, i) => window.QT.answered(EXAM.questions[i], rec.answers[i]);
  const sectionOf = (i) => { for (let k = i; k >= 0; k--) if (EXAM.questions[k].section) return EXAM.questions[k].section; return ''; };
  window.ExamData = { exam: EXAM, objectives: OBJECTIVES };

  /* A child sees their exam in their own look. A parent, or anyone signed out, sees plain paper. */
  function paper(html) { const k = window.Store.currentKid(); document.body.dataset.surface = k ? 'school' : 'paper'; if (k) window.Theme.use(k); app.innerHTML = html; window.scrollTo(0, 0); }

  /* Tests and exams, for parents: a designed brochure like How it works, one idea per page, with real screens. */
  window.renderAssess = function () {
    const { brochure, pic, lap, phone } = window.Brochure;
    const rungs = [
      ['During the lesson', 'Shout it out', 'Questions inside the lesson. No score, just thinking.', 'TV, together', false],
      ['Before the lesson', 'Starter quiz', 'Three quick questions on what came before.', 'Own device, 1 to 3 minutes', false],
      ['After the lesson', 'Lesson test', 'Real tasks, answers explained at once, and a second try.', 'Own device, about 10 minutes', true],
      ['After 1, 7 and 30 days', 'Re-tests', 'A few old questions, past mistakes first, so it sticks.', 'Own device, 3 minutes', false],
      ['End of a unit', 'Unit exam', 'Timed, one try, answers only at the end. You start it.', 'Tablet or laptop', true],
      ['End of term and year', 'Big exam', 'Questions from every unit, to see what lasted.', 'Paper or laptop, with you', false],
    ];
    brochure('assess', [
      ['ppCover ppAssessCover', `<div class="ppCoverText"><p class="ppBrand">Home School <i>TV</i></p><h1>Tests and exams.</h1><p class="ppLead">Small checks often. Exams rarely. A lesson test helps a child learn; an exam shows what they kept.</p><p class="ppSmall">For parents</p></div>
        <div class="ppCoverArt">${lap('exam', 'A timed unit exam')}${phone('phone-test', 'A lesson test on a phone')}</div>`],
      ['ppLadder', `<h2>Six kinds of check, from light to serious.</h2><ol class="ppRungs">${rungs.map(([when, name, what, where, key]) => `<li class="${key ? 'key' : ''}"><small>${when}</small><h3>${name}</h3><p>${what}</p><span>${where}</span></li>`).join('')}</ol>
        <p class="ppSmall">Every mark is given by the app. In an exam, the child checks their own written answers against a model answer.</p>`],
      ['ppTests', `<h2>The lesson test: do, don’t just tick.</h2><p class="ppLead">Children use what they just learned, and every answer is explained straight away.</p><div class="ppFour">
        <figure>${pic('q-region', 'Tapping a region on the map of Colombia')}<figcaption>Tap the real place on the map</figcaption></figure>
        <figure>${pic('q-estimate', 'Setting the height of Bogotá on a mountain')}<figcaption>Set the height on the mountain</figcaption></figure>
        <figure>${pic('q-contract', 'Shortening a muscle with a slider')}<figcaption>Shrink a muscle and see what happens</figcaption></figure>
        <figure>${pic('q-match', 'Connecting photos to regions')}<figcaption>Connect each photo to its region</figcaption></figure></div>
        <p class="ppFoot">A second try is allowed. The best score counts.</p>`],
      ['ppWeek ppRetests', `<div class="ppNotes"><h2>Mistakes come back.</h2><p class="ppLead">A few old questions return after 1, 7 and 30 days, mistakes first. It takes 3 minutes.</p><ul class="ppList"><li><b>It shows up by itself</b> in the child’s To do.</li><li><b>Spacing it out</b> is what makes learning last.</li><li><b>You see it</b> in the gradebook, like any test.</li></ul></div><div class="ppWide"><figure class="fPad"><div>${pic('pad-todo', 'A child’s To do with a re-test')}</div></figure></div>`],
      ['ppDiary ppExams', `<div class="ppWide">${lap('exam', 'A unit exam with a timer')}</div><div class="ppNotes"><h2>Exams feel like exams.</h2><ul class="ppList"><li><b>You start it</b> with your exam PIN, so a child can’t start it alone.</li><li><b>It’s timed,</b> with one try.</li><li><b>Answers appear only at the end.</b></li><li><b>Written answers</b> the child checks against a model answer, point by point. Nothing waits for you.</li></ul></div>`],
      ['ppWeek ppMarks', `<div class="ppNotes"><h2>Every mark in one place.</h2><ul class="ppList"><li><b>The gradebook</b> keeps every test, exam and class mark, with the date.</li><li><b>The diary</b> shows marks on the day they were given.</li><li><b>Your pad</b> shows each child’s average and what’s waiting.</li></ul></div><div class="ppWide">${lap('journal', 'The gradebook')}</div>`],
      ['ppLast ppSources', `<div><h2>Where these ideas come from.</h2><ul class="ppChecks"><li>Oak National Academy’s lessons start and end with short quizzes</li><li>Spaced re-tests are a well-known way to make learning last</li><li>In England, Year 6 children sit national tests in reading, grammar and maths</li></ul></div>
        <div class="ppHonest"><h3>Good to know</h3><p>Home School follows these ideas. It isn’t an exam board, and its marks aren’t official grades.</p></div>`],
    ]);
  };

  /* An adult starts the exam with the parent PIN. */
  window.renderExamStart = function () {
    const k = window.Store.currentKid();
    if (!k) { window.renderMyDay('exam'); return; }
    /* An exam finished but not checked yet goes straight back to the check. */
    const open = window.Store.examsFor(k.id).find((r) => r.exam === EXAM.id && window.examTotals(r).waiting);
    if (open) { startCheck(open); return; }
    paper(`<div class="paperPage narrow"><div class="paperTop"><button class="plainBtn btn sec" data-f id="examBack">Back</button><span class="paperBrand">Unit exam</span></div>
      <p class="qMeta">${esc(k.name)}</p><h1>${EXAM.title}</h1><p class="lead">Covers all 4 lessons in this unit.</p>
      <ul class="examFacts"><li><b>${EXAM.minutes}</b>minutes</li><li><b>${EXAM.questions.length}</b>questions</li><li><b>${total()}</b>marks</li><li><b>1</b>attempt</li></ul>
      <ul class="rules"><li>Do this alone, with an adult nearby.</li><li>No books, phones or videos.</li><li>You can flag a question and come back.</li><li>Answers appear after you finish.</li></ul>
      <h2 class="whoHead">Adult: enter the exam PIN to start</h2><div id="pad" class="paperPad"></div>
      <p class="fine">Lessons 1 and 2 are built so far. The other questions show how the full exam would work.</p></div>`);
    window.pinPad(document.getElementById('pad'), { hint: 'A parent enters the exam PIN.', onDone: (pin) => { if (pin !== window.Store.data.parentPin) return 'That PIN isn’t right.'; Object.assign(E, { i: 0, answers: {}, flags: {}, confirm: false, endAt: Date.now() + EXAM.minutes * 60000 }); drawExam(); return null; } });
  };

  function clock() {
    const left = Math.max(0, E.endAt - Date.now()), el = document.getElementById('examClock');
    if (!el) { clearInterval(E.timer); return; }
    const m = Math.floor(left / 60000), sec = Math.floor(left / 1000) % 60;
    el.textContent = `${m}:${String(sec).padStart(2, '0')}`;
    el.classList.toggle('low', left < 300000);
    if (left === 0) finish();
  }
  const answered = (i) => window.QT.answered(EXAM.questions[i], E.answers[i]);
  function drawExam() {
    const q = EXAM.questions[E.i], n = EXAM.questions.length, k = window.Store.currentKid();
    const count = EXAM.questions.filter((_, i) => answered(i)).length;
    let lastSection = '';
    const palette = EXAM.questions.map((qq, i) => {
      const head = qq.section && qq.section !== lastSection ? `<h3>${esc(qq.section.split(':')[0])}</h3>` : '';
      if (qq.section) lastSection = qq.section;
      return `${head}<button data-f data-q="${i}" class="${i === E.i ? 'cur' : ''} ${answered(i) ? 'done' : ''} ${E.flags[i] ? 'flag' : ''}" aria-label="Question ${i + 1}${answered(i) ? ', answered' : ''}${E.flags[i] ? ', flagged' : ''}">${i + 1}</button>`;
    }).join('');
    const own = ['tap', 'label', 'region', 'estimate', 'contract', 'pics'].includes(q.type);
    paper(`<div class="tq isExam">
      <header class="tqTop"><b class="tqTitle">${esc(EXAM.title)}</b><span class="tqCount"><span id="exCount">${count}</span> of ${n} answered</span><span class="examClock" id="examClock"></span></header>
      <div class="tqExamBody"><main class="tqMain ${own ? 'hasFig' : ''} tqType-${q.type}"><section class="tqAsk"><p class="tqKind">${esc(sectionOf(E.i))}. Question ${E.i + 1}, ${q.marks} ${q.marks === 1 ? 'mark' : 'marks'}</p><h1>${esc(q.q)}</h1><div id="qBox"></div></section></main>
        <aside class="tqPalette"><div class="palette">${palette}</div><ul class="key"><li><i class="done"></i>Answered</li><li><i class="flag"></i>Flagged</li></ul></aside></div>
      <footer class="tqBar">${E.confirm ? `<p class="tqSay"><b>Finish the exam?</b> ${n - count ? `${n - count} still unanswered. ` : ''}You only get one attempt.</p><div class="tqBtns"><button class="btn sec" data-f id="exCancel">Keep working</button><button class="btn big" data-f id="exFinish">Finish exam</button></div>` : `<div class="tqBtns"><button class="btn sec" data-f id="exPrev" ${E.i ? '' : 'disabled'}>Previous</button><button class="btn ghost ${E.flags[E.i] ? 'flagged' : ''}" data-f id="exFlag">${E.flags[E.i] ? 'Flagged' : 'Flag for later'}</button></div><button class="btn big" data-f id="exNext">${E.i === n - 1 ? 'Review and finish' : 'Next'}</button>`}</footer></div>`);
    window.QT.mount(document.getElementById('qBox'), q, { exam: true, value: E.answers[E.i], onChange: (v) => {
      E.answers[E.i] = v;
      document.getElementById('exCount').textContent = EXAM.questions.filter((_, i) => answered(i)).length;
      document.querySelector(`.palette [data-q="${E.i}"]`)?.classList.toggle('done', answered(E.i));
    } });
    clearInterval(E.timer); E.timer = setInterval(clock, 1000); clock();
    window.fitQuestion();
  }
  function finish() {
    clearInterval(E.timer);
    const k = window.Store.currentKid();
    const record = { id: Date.now(), exam: EXAM.id, kidId: k.id, at: new Date().toISOString(), answers: E.answers, auto: {}, self: {} };
    EXAM.questions.forEach((q, i) => { if (q.type !== 'written') record.auto[i] = window.QT.award(q, E.answers[i]); });
    window.Store.putExam(record);
    window.renderExamResult(record);
  }
  /* A written answer counts once the child has checked it. Older exams may hold a parent's mark instead, and that still counts. */
  const writtenMark = (rec, i) => (rec.parent?.[i] != null ? rec.parent[i] : rec.checked ? Math.min((rec.self?.[i] || []).length, EXAM.questions[i].marks) : null);
  window.examTotals = function (rec) {
    let got = 0, waiting = 0, self = false;
    const byObj = {};
    EXAM.questions.forEach((q, i) => {
      const o = (byObj[q.obj] = byObj[q.obj] || { got: 0, max: 0, waiting: 0 });
      o.max += q.marks;
      const m = q.type === 'written' ? writtenMark(rec, i) : rec.auto[i];
      if (m == null) { waiting += q.marks; o.waiting += q.marks; return; }
      if (q.type === 'written' && rec.parent?.[i] == null) self = true;
      got += m; o.got += m;
    });
    return { got, waiting, total: total(), byObj, self };
  };
  /* Preview for the Screens page: opens the paper without a PIN. Nothing is saved until Finish, and in preview that saves nowhere. */
  window.previewExamPaper = function () { Object.assign(E, { i: 0, answers: {}, flags: {}, confirm: false, endAt: Date.now() + EXAM.minutes * 60000 }); drawExam(); };

  /* After the clock stops: the child checks each written answer against the model answer, and ticks the points they made. One mark a point. */
  const C = { rec: null, j: 0, preview: false };
  function drawCheck() {
    const rec = C.rec, i = WRITTEN[C.j], q = EXAM.questions[i], blank = !wrote(rec, i), ticks = (rec.self[i] ||= []), last = C.j === WRITTEN.length - 1;
    paper(`<div class="tq isExam isCheck"><header class="tqTop"><b class="tqTitle">Check your written answers</b><span class="tqCount">${C.j + 1} of ${WRITTEN.length}</span></header>
      <main class="tqMain tqType-check"><section class="tqAsk">${C.j ? '' : '<p class="checkIntro">The exam is finished. Last step: compare each written answer with the model answer.</p>'}<p class="tqKind">Question ${i + 1}, ${q.marks} ${q.marks === 1 ? 'mark' : 'marks'}</p><h1>${esc(q.q)}</h1><p class="checkHow">${blank ? 'You didn’t write an answer, so read the model answer for next time.' : 'Tick a point only if your answer really says it. Your own words are fine.'}</p>
        <div class="checkGrid"><div class="checkMine"><h2>Your answer</h2>${blank ? '<p class="checkBlank">You didn’t write an answer.</p>' : `<blockquote>${esc(rec.answers[i].trim())}</blockquote>`}</div>
          <div class="checkModel"><h2>Model answer, point by point</h2>
            <div class="qCards tick checkPoints">${q.points.map((t, k) => { const on = ticks.includes(k); return `<button type="button" class="qCard ${on ? 'on' : ''}" aria-pressed="${on}" data-f data-selftick="${k}" ${blank ? 'disabled' : ''}><i>${on ? '✓' : ''}</i><span>${esc(t)}</span></button>`; }).join('')}</div></div></div></section></main>
      <footer class="tqBar"><p class="tqSay" aria-live="polite"><b>${ticks.length} of ${q.marks} ${q.marks === 1 ? 'mark' : 'marks'}</b> ${blank ? 'No answer, so no marks.' : 'One mark for each point you tick.'}</p><div class="tqBtns">${C.j ? '<button class="btn ghost" data-f data-selfprev>Previous</button>' : ''}<button class="btn big" data-f data-selfnext>${last ? 'See my result' : 'Next answer'}</button></div></footer></div>`);
    window.fitQuestion();
  }
  function startCheck(rec, preview = false) { rec.self ||= {}; Object.assign(C, { rec, j: 0, preview }); drawCheck(); }
  /* Preview for the Screens page: the first check, with a sample answer. Nothing is saved. */
  window.previewExamCheck = function () { const rec = window.Store.data.exams[0]; startCheck({ ...rec, self: { [WRITTEN[0]]: [0] }, checked: false }, true); };

  window.renderExamResult = function (rec) {
    const t = window.examTotals(rec), k = window.Store.kid(rec.kidId);
    /* Not checked yet, for example the app was closed half way: finish the check first. */
    if (t.waiting) { startCheck(rec); return; }
    paper(`<div class="paperPage narrow"><div class="paperTop"><button class="plainBtn btn sec" data-f id="examDone">Back to My day</button><span class="paperBrand">Exam result</span></div>
      <p class="qMeta">${esc(k?.name || '')} · ${esc(EXAM.title)}</p><p class="bigScore tab">${t.got}/${t.total}</p><h1>Your final marks</h1>
      <div class="objList">${Object.entries(t.byObj).map(([key, o]) => `<div><span>${OBJECTIVES[key]}</span><div class="objBar"><i style="width:${o.max ? (o.got / o.max) * 100 : 0}%"></i></div><b>${o.got}/${o.max}</b></div>`).join('')}</div>
      <div class="examNav"><button class="solidBtn btn big" data-f data-reviewexam="${rec.id}">See my answers</button></div></div>`);
  };
  /* The answers, one screen at a time. A written answer shows the model points, with the ones the child ticked. */
  function drawReview(rec, i) {
    const q = EXAM.questions[i], n = EXAM.questions.length, m = q.type === 'written' ? writtenMark(rec, i) : rec.auto[i];
    const got = `${m} of ${q.marks} ${q.marks === 1 ? 'mark' : 'marks'}${q.type === 'written' && rec.parent?.[i] == null ? ', checked by you' : ''}`;
    const own = ['tap', 'label', 'region', 'estimate', 'contract', 'pics'].includes(q.type);
    const ticks = rec.self?.[i] || [];
    const model = q.type === 'written' ? `<div class="checkModel"><h2>Model answer: ${m} of ${q.marks} marks${rec.parent?.[i] == null ? ', checked by you' : ''}</h2><div class="qCards tick checkPoints">${q.points.map((t, k) => `<button type="button" class="qCard ${ticks.includes(k) ? 'on' : ''}" disabled><i>${ticks.includes(k) ? '✓' : ''}</i><span>${esc(t)}</span></button>`).join('')}</div></div>` : '';
    paper(`<div class="tq isExam"><header class="tqTop"><b class="tqTitle">Your answers</b><span class="tqCount">${i + 1} of ${n}</span></header>
      <main class="tqMain ${own ? 'hasFig' : ''} tqType-${q.type}"><section class="tqAsk"><p class="tqKind">${esc(got)}</p><h1>${esc(q.q)}</h1>${q.type === 'written' ? `<div class="checkMine">${rec.answers[i]?.trim() ? `<blockquote>${esc(rec.answers[i].trim())}</blockquote>` : '<p class="checkBlank">You didn’t write an answer.</p>'}</div>` : '<div id="qBox"></div>'}${model}</section></main>
      <footer class="tqBar"><div class="tqBtns"><button class="btn sec" data-f data-reviewexam="${rec.id}" data-at="${i - 1}" ${i ? '' : 'disabled'}>Previous</button><button class="btn ghost" data-f data-backresult="${rec.id}">Back to my result</button></div>${i < n - 1 ? `<button class="btn big" data-f data-reviewexam="${rec.id}" data-at="${i + 1}">Next</button>` : ''}</footer></div>`);
    const v = rec.answers[i];
    if (q.type !== 'written') window.QT.mount(document.getElementById('qBox'), q, { exam: true, value: v ?? window.QT.initial(q), locked: true, reveal: q.type !== 'written' });
    window.fitQuestion();
  }
  document.addEventListener('click', (ev) => {
    const el = ev.target.closest('button');
    if (!el) return;
    if (el.id === 'examDone') window.renderMyDay();
    else if (el.id === 'examBack') window.backTo(() => window.renderMyDay());
    else if (el.id === 'assessBack') window.backTo(() => (window.Store.isParent() ? window.renderParent('plan') : window.renderHow()));
    else if (el.id === 'exPrev') { E.i--; drawExam(); }
    else if (el.id === 'exNext') { if (E.i < EXAM.questions.length - 1) E.i++; else E.confirm = true; drawExam(); }
    else if (el.id === 'exFlag') { E.flags[E.i] = !E.flags[E.i]; drawExam(); }
    else if (el.dataset.q != null) { E.i = +el.dataset.q; drawExam(); }
    else if (el.id === 'exAsk') { E.confirm = true; drawExam(); }
    else if (el.id === 'exCancel') { E.confirm = false; drawExam(); }
    else if (el.id === 'exFinish') finish();
    else if (el.dataset.reviewexam) { const rec = window.Store.data.exams.find((r) => r.id === +el.dataset.reviewexam); if (rec) drawReview(rec, +(el.dataset.at || 0)); }
    else if (el.dataset.selftick != null && C.rec) { const t = C.rec.self[WRITTEN[C.j]], k = +el.dataset.selftick; C.rec.self[WRITTEN[C.j]] = t.includes(k) ? t.filter((x) => x !== k) : [...t, k].sort(); drawCheck(); document.querySelector(`[data-selftick="${k}"]`)?.focus({ preventScroll: true }); }
    else if (el.dataset.selfprev != null && C.rec) { C.j--; drawCheck(); }
    else if (el.dataset.selfnext != null && C.rec) {
      if (C.j < WRITTEN.length - 1) { C.j++; if (!C.preview) window.Store.putExam(C.rec); drawCheck(); return; }
      C.rec.checked = new Date().toISOString(); if (!C.preview) window.Store.putExam(C.rec);
      const rec = C.rec; C.rec = null; window.renderExamResult(rec);
    }
    else if (el.dataset.backresult) { const rec = window.Store.data.exams.find((r) => r.id === +el.dataset.backresult); if (rec) window.renderExamResult(rec); }
  });
})();
