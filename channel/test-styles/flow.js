/* The test and exam flow for the prototype. Content follows Lesson 2, Muscles. Nothing here is saved. */
(function () {
  const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const calm = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const ui = $('#ui');
  const LOOKS = [['show', 'C. Show Time'], ['lab', 'A. Living Lab'], ['soft', 'B. Soft Bright']];
  const SCREENS = [['test', 'Test'], ['result', 'Test result'], ['start', 'Exam start'], ['exam', 'Exam'], ['examresult', 'Exam result']];
  const ACCENT = { show: ['#FFC400', '#FF7A5C', '#FFFFFF', '#D42A20'], lab: ['#2DE6D6', '#FFD24A', '#FFFFFF', '#FF5A4E'], soft: ['#FFC21E', '#FF5C57', '#2D66E8', '#FFFFFF'] };
  const G = { look: 'show', screen: 'test', i: 0, res: [null, null, null, null], muted: false, ei: 0, ea: {}, endAt: 0, tag: null };

  const QUESTIONS = [
    { id: 'contract', skill: 'Contract', title: 'Contract this muscle.', hint: 'Drag the glowing bone toward the other one.', ask: 'What happened to the muscle?', o: ['It got shorter and thicker', 'It got longer and thinner', 'It stayed the same size'], a: 0, right: 'To contract means to get shorter. All the cells work together, so the muscle gets thicker too.', wrong: 'Look at the muscle: to contract means to get shorter, and all the cells working together make it thicker.' },
    { id: 'fuel', skill: 'Fuel', title: 'Power this muscle cell.', hint: 'Your blood delivers the two things it mainly uses. Send them in.', right: 'Sugar and oxygen go to the mitochondria, where they release energy. Now the cell can contract.', wrong: 'Salt and sunlight don’t power the cell. Sugar and oxygen go to the mitochondria, where they release energy.' },
    { id: 'find', skill: 'Find', title: 'Find cardiac muscle.', hint: 'Turn the body by dragging it, then tap the place.', right: 'Cardiac muscle is found only in your heart. It contracts with every heartbeat.', wrong: 'Cardiac muscle is found only in your heart. It’s glowing now.' },
    { id: 'squeeze', skill: 'Squeeze', title: 'Move the food along.', hint: 'Tap the tube to squeeze it. Where does the squeeze need to be?', ask: 'Which kind of muscle does this?', o: ['Smooth muscle', 'Cardiac muscle', 'Skeletal muscle'], a: 0, right: 'Smooth muscle squeezes just behind food, in a wave, and pushes it along.', wrong: 'This is smooth muscle. It squeezes just behind food, in a wave, and pushes it along.' },
  ];

  /* ---------- Particles, drawn over the 3D ---------- */
  const FX = {
    c: $('#fx'), g: null, ps: [], rings: [],
    size() { const d = Math.min(devicePixelRatio || 1, 2); this.c.width = innerWidth * d; this.c.height = innerHeight * d; this.g = this.c.getContext('2d'); this.g.setTransform(d, 0, 0, d, 0, 0); },
    burst(x, y, n = 44, spd = 560) { const colors = ACCENT[G.look]; for (let i = 0; i < n; i++) { const a = Math.random() * 6.283, v = spd * (.2 + Math.random()); this.ps.push({ x, y, vx: Math.cos(a) * v, vy: Math.sin(a) * v, s: 2 + Math.random() * 4.5, l: .35 + Math.random() * .55, m: .9, c: colors[i % colors.length] }); } },
    ring(x, y, r = 240, c) { this.rings.push({ x, y, to: r, t: 0, c: c || ACCENT[G.look][0] }); },
    step(dt) {
      const g = this.g; if (!g) return;
      g.clearRect(0, 0, innerWidth, innerHeight);
      g.globalCompositeOperation = G.look === 'soft' ? 'source-over' : 'lighter';
      this.rings = this.rings.filter((o) => { o.t += dt / .5; if (o.t >= 1) return false; g.globalAlpha = (1 - o.t) ** 1.5; g.strokeStyle = o.c; g.lineWidth = 2 + 12 * (1 - o.t); g.beginPath(); g.arc(o.x, o.y, o.to * (1 - (1 - o.t) ** 3), 0, 6.283); g.stroke(); return true; });
      this.ps = this.ps.filter((p) => { p.l -= dt; if (p.l <= 0) return false; p.vx *= 1 - dt * 2.4; p.vy = p.vy * (1 - dt * 2.4) + dt * 220; p.x += p.vx * dt; p.y += p.vy * dt; g.globalAlpha = Math.min(1, p.l / .3); g.fillStyle = p.c; g.beginPath(); g.arc(p.x, p.y, p.s * .5, 0, 6.283); g.fill(); return true; });
      g.globalAlpha = 1;
    },
  };
  gsap.ticker.add((time, delta) => FX.step(Math.min(delta / 1000, .05)));

  /* ---------- Sound ---------- */
  const Snd = {
    ctx: null,
    get() { if (G.muted) return null; try { this.ctx ||= new (window.AudioContext || window.webkitAudioContext)(); this.ctx.resume?.(); return this.ctx; } catch (e) { return null; } },
    tone(f, t = .14, type = 'sine', vol = .1, delay = 0, to) { const c = this.get(); if (!c) return; const o = c.createOscillator(), g = c.createGain(), s = c.currentTime + delay; o.type = type; o.frequency.setValueAtTime(f, s); if (to) o.frequency.exponentialRampToValueAtTime(to, s + t); g.gain.setValueAtTime(0, s); g.gain.linearRampToValueAtTime(vol, s + .012); g.gain.exponentialRampToValueAtTime(.001, s + t); o.connect(g).connect(c.destination); o.start(s); o.stop(s + t + .03); },
    air(t = .3, vol = .08, f = 1800) { const c = this.get(); if (!c) return; const n = c.sampleRate * t | 0, b = c.createBuffer(1, n, c.sampleRate), d = b.getChannelData(0); for (let i = 0; i < n; i++) d[i] = (Math.random() * 2 - 1) * Math.sin(Math.PI * i / n); const s = c.createBufferSource(), fl = c.createBiquadFilter(), g = c.createGain(); s.buffer = b; fl.type = 'bandpass'; fl.frequency.value = f; g.gain.value = vol; s.connect(fl).connect(g).connect(c.destination); s.start(); },
    tap() { this.tone(660, .07, 'triangle', .07); },
    good() { this.air(.34, .1, 2600); [523, 659, 784, 1047].forEach((f, i) => this.tone(f, .3, 'triangle', .09, i * .07)); this.tone(98, .28, 'sine', .22); },
    bad() { this.tone(196, .3, 'triangle', .1, 0, 130); },
    pulse() { this.tone(70, .22, 'sine', .28, 0, 42); },
    stretch(k) { this.tone(180 + (1 - k) * 700, .05, 'sine', .03); },
    win() { [392, 523, 659, 784, 1047, 1319].forEach((f, i) => this.tone(f, .5, 'triangle', .09, i * .09)); this.air(.7, .1, 3200); this.tone(65, .5, 'sine', .3); },
  };

  /* ---------- Page frame ---------- */
  function drawReview() {
    $('#review').innerHTML = `<div class="rGroup" role="group" aria-label="Look">${LOOKS.map(([k, t]) => `<button data-look="${k}" aria-pressed="${k === G.look}">${t}</button>`).join('')}</div>
      <div class="rGroup" role="group" aria-label="Screen">${SCREENS.map(([k, t]) => `<button data-screen="${k}" aria-pressed="${k === G.screen}">${t}</button>`).join('')}</div>
      <button id="mute">${G.muted ? 'Sound off' : 'Sound on'}</button>`;
  }
  function clearTag() { $$('.tag3d, .coach').forEach((e) => e.remove()); gsap.killTweensOf('.coach'); }
  function tag3d(p, text) { clearTag(); const el = document.createElement('div'); el.className = 'tag3d'; el.textContent = text; el.style.left = `${Math.max(90, Math.min(innerWidth - 90, p.x))}px`; el.style.top = `${p.y}px`; document.body.append(el); if (!calm) gsap.from(el, { opacity: 0, y: 12, duration: .2 }); return el; }
  function enter(sel, vars = {}) { if (!calm && $$(sel).length) gsap.from(sel, { y: 24, opacity: 0, duration: .36, stagger: .06, ease: 'power3.out', ...vars }); }
  function skills() { return `<div class="skills">${QUESTIONS.map((q, i) => `<button class="skill ${i === G.i && G.screen === 'test' ? 'on' : ''} ${G.res[i] === true ? 'yes' : G.res[i] === false ? 'no' : ''}" data-jump="${i}"><i></i>${q.skill}</button>`).join('')}</div>`; }
  function frame(q, dock) {
    ui.innerHTML = `${skills()}<header class="prompt"><h1>${esc(q.title)}</h1><p>${esc(q.hint)}</p></header><div class="grow"></div><div class="dock" id="dock">${dock || ''}</div>`;
    if (!calm) { gsap.from('.prompt h1', { x: -46, opacity: 0, duration: .46, ease: 'power3.out' }); gsap.from('.prompt p', { x: -30, opacity: 0, duration: .4, delay: .1, ease: 'power3.out' }); }
  }
  /* A right answer: light, sparks, sound, then the science carries on moving. */
  function celebrate(p) { Snd.good(); if (!calm) { FX.ring(p.x, p.y, 280); FX.ring(p.x, p.y, 170, ACCENT[G.look][1]); FX.burst(p.x, p.y, 52, 640); } Stage.boost(1.1); }
  function feedback(ok, text, retest) {
    const last = G.i === QUESTIONS.length - 1;
    G.res[G.i] = ok;
    $$('.skill')[G.i].className = `skill ${ok ? 'yes' : 'no'}`;
    $('#dock').insertAdjacentHTML('beforeend', `<div class="feedback ${ok ? 'good' : 'bad'}"><p><b>${ok ? 'Correct!' : 'Not quite.'}</b>${esc(text)}</p><button class="next" id="next">${last ? 'See my result' : 'Next'}</button></div>`);
    enter('.feedback', { y: 30 });
    $('#next').focus({ preventScroll: true });
  }
  function step2(q, firstOk) {
    $('#dock').innerHTML = `<p class="step2">${esc(q.ask)}</p><div class="choices" role="group">${q.o.map((t, k) => `<button class="chip" data-pick="${k}">${esc(t)}</button>`).join('')}</div>`;
    enter('.step2, .chip');
    G.onPick = (k, el) => {
      const ok = k === q.a && firstOk;
      $$('.chip').forEach((c, n) => { c.disabled = true; c.classList.add(n === q.a ? 'ok' : n === k ? 'no' : 'dim'); });
      const r = el.getBoundingClientRect();
      if (k === q.a) celebrate({ x: r.x + r.width / 2, y: r.y }); else Snd.bad();
      Stage.current?.flex?.();
      feedback(ok, ok ? q.right : q.wrong);
    };
  }

  /* ---------- The four questions ---------- */
  const RUN = {
    contract(q) {
      frame(q, '<p class="readout" id="read">Length 100%</p>');
      let last = 1;
      Stage.muscleScene({
        onLength: (k) => { const r = $('#read'); if (!r) return; const pct = Math.round(k * 100 + 0 * last); r.textContent = `Length ${pct}%`; if (Math.abs(k - last) > .03) { Snd.stretch(k); last = k; } },
        onReached: () => { Snd.pulse(); clearTag(); const p = Stage.current.point(); if (!calm) { FX.ring(p.x, p.y, 240); FX.burst(p.x, p.y, 30, 460); } gsap.delayedCall(.25, () => step2(q, true)); },
      });
      /* A soft ring shows where to grab, until the child starts. */
      gsap.delayedCall(.1, () => { const c = document.createElement('div'); c.className = 'coach'; const p = Stage.current.handle(); c.style.left = `${p.x}px`; c.style.top = `${p.y}px`; document.body.append(c); if (!calm) gsap.to(c, { x: -Math.min(innerWidth * .11, 150), scale: .8, opacity: 0, duration: 1.1, repeat: -1, repeatDelay: .3, ease: 'power2.inOut' }); });
    },
    fuel(q) {
      const tokens = [['Sugar', '#FFC400', true], ['Oxygen', '#7FE7FF', true], ['Salt', '#E8E8F0', false], ['Sunlight', '#FF9A3D', false]];
      frame(q, `<div class="choices" role="group">${tokens.map(([t, c], k) => `<button class="chip token" data-token="${k}" style="--tc:${c}"><b></b>${t}</button>`).join('')}</div>`);
      enter('.chip');
      let wrongs = 0, got = 0;
      G.onToken = (k, el) => {
        const [name, c, good] = tokens[k], r = el.getBoundingClientRect();
        Snd.tap(); el.disabled = true; el.classList.add('dim');
        Stage.current.send(name, c, good, r.x + r.width / 2);
      };
      Stage.fuelScene({
        onArrive: (name, good, p, powered) => {
          if (!good) { wrongs++; Snd.bad(); tag3d(p, `${name} doesn’t power the cell`); $$('.chip').find((c) => c.textContent === name)?.classList.add('no'); return; }
          Snd.pulse(); clearTag(); if (!calm) { FX.ring(p.x, p.y, 200); FX.burst(p.x, p.y, 30, 420); }
          tag3d(p, `${name} reached the mitochondria`);
          got = powered;
          if (got === 2) {
            $$('.chip').forEach((c) => { c.disabled = true; });
            gsap.delayedCall(.5, () => { clearTag(); Stage.current.flex(); celebrate(Stage.current.point()); feedback(wrongs === 0, wrongs === 0 ? q.right : q.wrong); });
          }
        },
      });
    },
    find(q) {
      frame(q, '');
      const body = Stage.bodyScene({
        onHover: (z) => { if (z) tag3d(Stage.current.where(z.name), 'Tap here'); else clearTag(); },
        onPick: (z, p) => {
          clearTag(); Stage.current.lock();
          const ok = z.name === 'heart';
          tag3d(p, z.label);
          if (ok) { Stage.current.celebrate('heart'); celebrate(p); } else {
            Snd.bad();
            gsap.delayedCall(1.15, () => { Stage.current?.reveal?.('heart'); Stage.current?.celebrate?.('heart'); if ($('.feedback') && Stage.current?.where) tag3d(Stage.current.where('heart'), 'Cardiac muscle: the heart'); });
          }
          feedback(ok, ok ? q.right : q.wrong);
        },
      });
      return body;
    },
    squeeze(q) {
      frame(q, '');
      let tips = 0;
      Stage.squeezeScene({
        onResult: (moved, first, p, why) => {
          if (moved) { clearTag(); Snd.pulse(); gsap.delayedCall(.1, () => { if (!calm) { FX.ring(p.x, p.y, 220); FX.burst(p.x, p.y, 34, 480); } step2(q, first); }); return; }
          Snd.tone(150, .18, 'sine', .22, 0, 90);
          tips++;
          tag3d(p, why === 'front' ? 'That blocks the way. Try behind the food' : 'Closer, just behind the food');
        },
      });
    },
  };
  function startQuestion() {
    clearTag(); G.onPick = G.onToken = null;
    Stage.setCalm(false);
    RUN[QUESTIONS[G.i].id](QUESTIONS[G.i]);
  }

  /* ---------- Test result: what you can now do ---------- */
  function showResult() {
    clearTag(); Stage.setCalm(false);
    const score = G.res.filter(Boolean).length, n = QUESTIONS.length;
    const say = score === n ? 'You’ve got this lesson' : score >= n - 1 ? 'Nearly there' : 'Good start. Let’s fix the rest';
    ui.innerHTML = `<div class="result"><p class="bigNum"><span id="num">0</span><small> of ${n}</small></p><h1 class="headline">${say}</h1>
      <div class="mastery">${QUESTIONS.map((q, i) => { const ok = G.res[i] === true; return `<div class="mCard ${ok ? 'yes' : 'no'}"><b>${ok ? 'You can' : 'Look again'}: ${q.skill.toLowerCase()}</b><small>${esc(ok ? q.right : q.wrong)}</small>${ok ? '' : `<button data-retry="${i}">Try it again now</button>`}</div>`; }).join('')}</div>
      <p class="note">Skills you got wrong come back in a short re-test on Tuesday.</p><div class="btns"><button class="next" data-screen="start">Back to My day</button></div></div>`;
    Stage.muscleScene({ hero: true });
    if (calm) { $('#num').textContent = score; return; }
    const tl = gsap.timeline(), o = { v: 0 };
    tl.from('.bigNum', { scale: .5, opacity: 0, duration: .42, ease: 'back.out(2)', onStart: () => Snd.win() });
    tl.to(o, { v: score, duration: .7, ease: 'power2.out', onUpdate: () => { const e = $('#num'); if (e) e.textContent = Math.round(o.v); } }, 0);
    tl.call(() => { const r = $('.bigNum')?.getBoundingClientRect(); if (r) { FX.ring(r.x + r.width / 2, r.y + r.height / 2, Math.max(innerWidth * .36, 280)); FX.burst(r.x + r.width / 2, r.y + r.height / 2, 90, 820); Stage.boost(1.5); } }, null, .34);
    tl.from('.headline', { y: 26, opacity: 0, duration: .34 }, .46);
    $$('.mCard').forEach((c, i) => tl.from(c, { y: 26, opacity: 0, scale: .96, duration: .3, ease: 'back.out(1.8)', onStart: () => Snd.tone(G.res[i] ? 660 + i * 120 : 240, .16, 'triangle', .08) }, .68 + i * .13));
    tl.from('.note, .btns', { opacity: 0, y: 12, duration: .28, stagger: .08 }, 1.3);
  }

  /* ---------- Exam: calm and focused, with the big moment saved for the result ---------- */
  const EXAM = [
    { sec: 'Section A', marks: 1, kind: 'body', q: 'Tap the place where smooth muscle is found.', help: 'Drag to turn the body. You can change your answer.' },
    { sec: 'Section B', marks: 1, kind: 'pics', q: 'Which picture shows cardiac muscle?', o: [['muscle-skeletal.jpg', 'Picture A'], ['muscle-cardiac.jpg', 'Picture B'], ['muscle-smooth.jpg', 'Picture C']] },
    { sec: 'Section D', marks: 2, kind: 'written', q: 'Explain why muscle cells need sugar and oxygen.' },
  ];
  function showStart() {
    clearTag(); Stage.muscleScene({ hero: false }); Stage.setCalm(true);
    ui.innerHTML = `<div class="exams"><section class="examCard"><div><small style="color:var(--soft);font-weight:700">Unit exam</small><h1>Human skeleton and muscles</h1></div>
      <ul class="facts"><li><b>30</b>minutes</li><li><b>17</b>questions</li><li><b>34</b>marks</li><li><b>1</b>attempt</li></ul>
      <ul class="rules"><li>Do this alone, with an adult nearby.</li><li>No books, phones or videos.</li><li>You’ll see your answers after you finish.</li></ul>
      <div class="btns" style="justify-content:flex-start"><button class="next" data-screen="exam">Adult: enter PIN and start</button></div></section></div>`;
    enter('.examCard', { y: 40 });
  }
  function drawExam() {
    clearTag();
    const q = EXAM[G.ei], n = EXAM.length;
    ui.innerHTML = `<div class="examTop"><span class="clock" id="clock">30:00</span><div class="rail" role="group" aria-label="Questions">${EXAM.map((_, i) => `<button data-eq="${i}" class="${i === G.ei ? 'on' : ''} ${G.ea[i] != null && G.ea[i] !== '' ? 'done' : ''}">${i + 1}</button>`).join('')}</div></div>
      <header class="examQ"><small>${q.sec}, question ${G.ei + 1} of ${n} in this sample, ${q.marks} ${q.marks === 1 ? 'mark' : 'marks'}</small><h1>${esc(q.q)}</h1>${q.help ? `<small>${esc(q.help)}</small>` : ''}</header>
      <div class="grow"></div><div class="dock" id="dock">${q.kind === 'pics' ? `<div class="pics">${q.o.map(([src, t], k) => `<button class="pic ${G.ea[G.ei] === k ? 'sel' : ''}" data-epic="${k}"><img src="img/${src}" alt="Muscle seen under a microscope"><span>${t}</span></button>`).join('')}</div>` : q.kind === 'written' ? `<textarea class="written" id="written" aria-label="Your answer" placeholder="Write your answer in full sentences">${esc(G.ea[G.ei] || '')}</textarea>` : ''}
      <div class="examNav"><button class="next ghost" id="ePrev" ${G.ei ? '' : 'disabled style="visibility:hidden"'}>Previous</button><button class="next" id="eNext">${G.ei === n - 1 ? 'Finish exam' : 'Next'}</button></div></div>`;
    tick();
    if (q.kind === 'body') {
      Stage.bodyScene({ onPick: (z) => { G.ea[G.ei] = z.name; Snd.tap(); tag3d(Stage.current.where(z.name), 'Your answer'); $(`[data-eq="${G.ei}"]`).classList.add('on'); }, onHover: () => {} });
      Stage.setCalm(true);
      if (G.ea[G.ei]) Stage.current.setChosen(G.ea[G.ei]);
    } else if (Stage.current?.zones || !Stage.current) { Stage.muscleScene({ hero: false }); Stage.setCalm(true); }
    if (!calm) gsap.from('.examQ, .dock', { opacity: 0, duration: .25 });
  }
  function tick() { const c = $('#clock'); if (!c) return; const left = Math.max(0, G.endAt - Date.now()); c.textContent = `${Math.floor(left / 60000)}:${String(Math.floor(left / 1000) % 60).padStart(2, '0')}`; clearTimeout(tick.t); tick.t = setTimeout(tick, 1000); }
  function showExamResult() {
    clearTag(); Stage.muscleScene({ hero: true }); Stage.setCalm(false);
    const rows = [['The skeleton', 11, 13], ['Muscles', 7, 8], ['Movement', 5, 8], ['Biomechanics', 4, 5]], got = rows.reduce((s, r) => s + r[1], 0);
    ui.innerHTML = `<div class="result"><p class="bigNum"><span id="num">0</span><small> of 34</small></p><h1 class="headline">Your exam marks so far</h1>
      <section class="bars">${rows.map(([t, a, b]) => `<div class="bar"><span>${t}</span><div><i data-w="${a / b * 100}"></i></div><span>${a}/${b}</span></div>`).join('')}</section>
      <p class="note">A parent is still marking 4 marks from your written answers, so this can go up. Movement is the one to practice next.</p><div class="btns"><button class="next" data-screen="start">Back to My day</button></div></div>`;
    if (calm) { $('#num').textContent = got; $$('.bar i').forEach((b) => { b.style.width = `${b.dataset.w}%`; }); return; }
    const o = { v: 0 }, tl = gsap.timeline();
    tl.from('.bigNum', { scale: .6, opacity: 0, duration: .5, ease: 'back.out(1.8)' });
    tl.to(o, { v: got, duration: 1.6, ease: 'power2.inOut', onUpdate: () => { const e = $('#num'); if (e) e.textContent = Math.round(o.v); if (Math.random() < .25) Snd.tone(500 + o.v * 16, .04, 'triangle', .04); } }, 0);
    tl.call(() => { Snd.win(); const r = $('.bigNum')?.getBoundingClientRect(); if (r) { FX.ring(r.x + r.width / 2, r.y + r.height / 2, Math.max(innerWidth * .36, 280)); FX.burst(r.x + r.width / 2, r.y + r.height / 2, 80, 760); Stage.boost(1.4); } }, null, 1.6);
    tl.from('.headline', { y: 20, opacity: 0, duration: .3 }, 1.65);
    tl.from('.bars', { y: 20, opacity: 0, duration: .3 }, 1.8);
    $$('.bar i').forEach((b, i) => tl.to(b, { width: `${b.dataset.w}%`, duration: .6, ease: 'power2.out' }, 1.95 + i * .13));
    tl.from('.note, .btns', { opacity: 0, y: 10, duration: .28, stagger: .08 }, 2.5);
  }

  /* ---------- Navigation ---------- */
  function go(screen) {
    G.screen = screen; drawReview(); clearTag();
    if (screen === 'test') { G.i = G.res.findIndex((r) => r === null); if (G.i < 0) { G.res = [null, null, null, null]; G.i = 0; } startQuestion(); }
    if (screen === 'result') { if (G.res.some((r) => r === null)) G.res = [true, true, false, true]; showResult(); }
    if (screen === 'start') showStart();
    if (screen === 'exam') { G.ei = 0; G.ea = {}; G.endAt = Date.now() + 1800000; drawExam(); }
    if (screen === 'examresult') showExamResult();
  }
  function setLook(k) { G.look = k; document.body.className = k; Stage.setLook(k); drawReview(); go(G.screen); }
  document.addEventListener('click', (ev) => {
    const b = ev.target.closest('button'); if (!b || b.disabled) return;
    const d = b.dataset;
    if (d.look) setLook(d.look);
    else if (d.screen) { Snd.tap(); go(d.screen); }
    else if (b.id === 'mute') { G.muted = !G.muted; drawReview(); }
    else if (d.jump != null) { Snd.tap(); G.i = +d.jump; G.res[G.i] = null; G.screen = 'test'; drawReview(); startQuestion(); }
    else if (d.pick != null) G.onPick?.(+d.pick, b);
    else if (d.token != null) G.onToken?.(+d.token, b);
    else if (b.id === 'next') { Snd.tap(); if (G.i === QUESTIONS.length - 1 || G.res.every((r) => r !== null)) { G.screen = 'result'; drawReview(); showResult(); } else { G.i = G.res.findIndex((r, i) => r === null && i > G.i); if (G.i < 0) G.i = G.res.findIndex((r) => r === null); startQuestion(); } }
    else if (d.retry != null) { G.i = +d.retry; G.res[G.i] = null; G.screen = 'test'; drawReview(); startQuestion(); }
    else if (d.eq != null) { Snd.tap(); G.ei = +d.eq; drawExam(); }
    else if (d.epic != null) { Snd.tap(); G.ea[G.ei] = +d.epic; $$('.pic').forEach((p, k) => p.classList.toggle('sel', k === +d.epic)); $(`[data-eq="${G.ei}"]`)?.classList.add('done'); }
    else if (b.id === 'ePrev') { G.ei--; drawExam(); }
    else if (b.id === 'eNext') { Snd.tap(); if (G.ei < EXAM.length - 1) { G.ei++; drawExam(); } else go('examresult'); }
  });
  document.addEventListener('input', (ev) => { if (ev.target.id === 'written') { G.ea[G.ei] = ev.target.value; } });
  /* Keyboard: the same actions without a pointer. */
  document.addEventListener('keydown', (ev) => {
    const cur = Stage.current; if (!cur || ev.target.closest?.('textarea')) return;
    if (ev.key === 'ArrowLeft' && cur.nudge) { ev.preventDefault(); cur.nudge(-.05); }
    if (ev.key === 'ArrowRight' && cur.nudge) { ev.preventDefault(); cur.nudge(.05); }
    if (ev.key === ' ' && cur.auto && G.screen === 'test') { ev.preventDefault(); cur.auto(); }
  });
  addEventListener('resize', () => FX.size());

  FX.size();
  const [hl, hs, hq] = location.hash.slice(1).split('-');
  if (['show', 'lab', 'soft'].includes(hl)) G.look = hl;
  if (SCREENS.some(([k]) => k === hs)) G.screen = hs;
  if (hq != null && QUESTIONS[+hq]) G.i = +hq;
  document.body.className = G.look;
  document.fonts?.ready.then(() => {
    Stage.init($('#stage')); Stage.setLook(G.look); drawReview();
    if (G.screen === 'test' && hq != null) { startQuestion(); } else go(G.screen);
  });
  window.TESTLAB = { G, go, Stage };
})();
