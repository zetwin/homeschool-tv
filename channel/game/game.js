/* Four playable styles of the same test and exam. Questions come from Lesson 2. Results here are not saved. */
(function () {
  const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const calm = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const ui = $('#ui');

  const TEST = [
    { t: 'radio', q: 'What is a muscle made of?', o: ['Muscle cells', 'Bone cells', 'Blood', 'Fat'], a: 0, why: 'A muscle is made of specialized muscle cells.' },
    { t: 'check', q: 'Your blood brings two things muscle cells use to release energy. Pick both.', o: ['Sugar', 'Oxygen', 'Salt', 'Sunlight'], a: [0, 1], why: 'Sugar and oxygen are used in the mitochondria.' },
    { t: 'radio', q: 'When a muscle cell contracts, it gets…', o: ['Shorter', 'Longer', 'Softer', 'Smaller in number'], a: 0, why: 'To contract means to get shorter.' },
    { t: 'tf', q: 'True or false?', rows: [['You can choose when to move your skeletal muscles.', true], ['You can stop your heart muscle by thinking about it.', false]], why: 'Only skeletal muscle takes orders from you.' },
    { t: 'radio', q: 'Where is cardiac muscle found?', o: ['Only in your heart', 'In your arms', 'In your stomach', 'In your bones'], a: 0, why: 'Cardiac muscle is found only in the heart.' },
    { t: 'slider', q: 'About how many muscles are joined to your bones?', min: 100, max: 1000, step: 50, a: 650, tol: 50, unit: 'muscles', why: 'More than 600. Scientists count them in different ways.' },
  ];
  const EXAM = [
    { section: 'A', t: 'radio', q: 'Which of these is NOT a job of the skeleton?', marks: 1, o: ['Support', 'Protection', 'Digesting food', 'Making blood cells'] },
    { section: 'A', t: 'check', q: 'Tick the two statements that are true.', marks: 2, o: ['Bones contain living cells', 'Adults have about 300 bones', 'Marrow makes blood cells', 'Bones never repair themselves'] },
    { section: 'B', t: 'radio', q: 'Which kind of muscle moves food through your intestines?', marks: 1, o: ['Skeletal', 'Smooth', 'Cardiac', 'Voluntary'] },
    { section: 'C', t: 'radio', q: 'A muscle pulls with 50 N, 0.3 m from a joint. What is the moment?', marks: 2, o: ['15 N m', '50.3 N m', '150 N m', '1.5 N m'] },
    { section: 'D', t: 'written', q: 'Why is spongy bone useful?', marks: 2 },
  ];

  const SKINS = {
    arena: { name: 'A. Toybox Arena', like: 'Bright strategy games', mission: 'Beat the Forgetter', meter: 'down', lock: 'Attack!', ok: ['Hit!', 'Great hit!', 'Super hit!', 'Mega hit!'], no: 'Blocked!', comboWord: 'x', colors: ['#FFD84A', '#FF8A1F', '#FFFFFF', '#FF4D6D'], win: 'Victory!', reward: 'Muscle Champion', rewardNote: 'Earned for 5 out of 6 or better', xpLabel: 'Level 7', next: 'Back to My day', lobby: 'Boss battle', go: 'Adult: start the battle', examRank: 'Gold rank', tone: { base: 330, wave: 'triangle' } },
    neon: { name: 'B. Neon Rush', like: 'Fast battle games', mission: 'Outrun the storm', meter: 'up', lock: 'Lock in', ok: ['Boost!', 'Double boost!', 'Hyper boost!', 'Max speed!'], no: 'Slowed!', comboWord: 'x', colors: ['#FFF04A', '#27F5F5', '#FF2EDB', '#FFFFFF'], win: 'You made it', reward: 'Tier 12 reached', rewardNote: 'Your tier rises with every right answer', xpLabel: 'Season tier', next: 'Back to My day', lobby: 'Final run', go: 'Adult: start the run', examRank: 'Tier: Gold', tone: { base: 392, wave: 'sawtooth' } },
    dark: { name: 'C. Dark Legend', like: 'Dark hero games', mission: 'Light the six runes', meter: 'up', lock: 'Strike', ok: ['Rune lit', 'Twin runes', 'Power surge', 'Unstoppable'], no: 'The dark holds', comboWord: 'x', colors: ['#FFE9AE', '#E8B24A', '#FF7A1E', '#FFFFFF'], win: 'Legendary', reward: 'Keeper of Muscles', rewardNote: 'Your hero’s title for this unit', xpLabel: 'Hero level 7', next: 'Return to My day', lobby: 'The Trial', go: 'Adult: begin the trial', examRank: 'Rank: Gold', tone: { base: 196, wave: 'triangle' } },
    block: { name: 'D. Block Builder', like: 'Block-building worlds', mission: 'Build your tower', meter: 'up', lock: 'Place it', ok: ['Placed!', 'Nice stack!', 'Super builder!', 'Master builder!'], no: 'Wobble!', comboWord: 'x', colors: ['#7CE05A', '#FFD632', '#2D9CF0', '#F04E4E'], win: 'Tower built!', reward: 'New tower block', rewardNote: 'Your towers stay in your world, one for each lesson', xpLabel: 'Builder level 7', next: 'Back to My day', lobby: 'Big build', go: 'Adult: start the build', examRank: 'Gold builder', tone: { base: 440, wave: 'square' } },
  };
  const SCREENS = [['test', 'Test'], ['result', 'Test result'], ['lobby', 'Exam start'], ['exam', 'Exam question'], ['examresult', 'Exam result']];
  const G = { skin: 'arena', screen: 'test', i: 0, right: 0, streak: 0, missed: [], val: null, locked: false, ei: 0, ea: {}, muted: false };
  const skin = () => SKINS[G.skin];

  /* ---------- 3D ---------- */
  const W = { r: null, scene: null, cam: null, ctl: null, t: 0, freeze: 0, base: null };
  try {
    W.r = new THREE.WebGLRenderer({ canvas: $('#world'), antialias: true, alpha: true });
    W.r.setPixelRatio(Math.min(devicePixelRatio || 1, 1.6));
    W.r.shadowMap.enabled = true; W.r.shadowMap.type = THREE.PCFSoftShadowMap;
  } catch (e) { W.r = null; }
  function fit() {
    const w = innerWidth, h = innerHeight;
    FX.size(w, h);
    if (!W.r || !W.cam) return;
    W.r.setSize(w, h, false);
    W.cam.aspect = w / h;
    /* Lifts the world up so it sits above the question panel, and pulls back on narrow screens. */
    W.cam.setViewOffset(w, h, 0, h * (w < 640 ? .27 : .2), w, h);
    if (W.base) W.cam.position.copy(W.base).multiplyScalar(w / h < 1 ? 1.75 : w / h < 1.5 ? 1.15 : 1);
    if (G.skin === 'neon') W.cam.position.set(0, 3.1, 10);
    W.cam.updateProjectionMatrix();
  }
  function loadWorld() {
    if (!W.r) return;
    W.scene = new THREE.Scene();
    W.cam = new THREE.PerspectiveCamera(42, 1, .1, 600);
    W.ctl = window.WORLDS[G.skin](W.scene, W.cam);
    W.base = W.cam.position.clone();
    W.cam.updateProjectionMatrix();
    fit();
  }
  const toScreen = (v) => {
    if (!W.cam) return { x: innerWidth / 2, y: innerHeight * .3 };
    W.cam.updateMatrixWorld();
    const p = v.clone().project(W.cam);
    return { x: (p.x + 1) / 2 * innerWidth, y: (1 - p.y) / 2 * innerHeight };
  };
  gsap.ticker.lagSmoothing(0);
  gsap.ticker.add((time, delta) => {
    let dt = Math.min(delta / 1000, .05);
    if (W.freeze > 0) { W.freeze -= dt; dt *= .05; }
    W.t += dt;
    if (W.ctl && W.r) { W.ctl.tick(dt, W.t); W.r.render(W.scene, W.cam); }
    FX.step(Math.min(delta / 1000, .05));
  });

  /* ---------- Particles and flashes, drawn over the world ---------- */
  const FX = {
    c: $('#fx'), g: null, ps: [], rings: [],
    size(w, h) { const d = Math.min(devicePixelRatio || 1, 2); this.c.width = w * d; this.c.height = h * d; this.g = this.c.getContext('2d'); this.g.setTransform(d, 0, 0, d, 0, 0); },
    burst(x, y, n = 40, spd = 620, grav = 900, size = 7, life = .85) {
      const colors = skin().colors, square = G.skin === 'block' || G.skin === 'arena';
      for (let i = 0; i < n; i++) { const a = Math.random() * 6.283, v = spd * (.25 + Math.random() * .85); this.ps.push({ x, y, vx: Math.cos(a) * v, vy: Math.sin(a) * v - spd * .22, g: grav, s: size * (.5 + Math.random()), life: life * (.55 + Math.random() * .6), max: life, c: colors[i % colors.length], sq: square && i % 2 === 0, r: Math.random() * 6, vr: (Math.random() - .5) * 12 }); }
    },
    ring(x, y, color, r = 340, w = 16) { this.rings.push({ x, y, r: 10, to: r, w, c: color, t: 0 }); },
    confetti() {
      const colors = skin().colors;
      for (let i = 0; i < 150; i++) this.ps.push({ x: Math.random() * innerWidth, y: -30 - Math.random() * innerHeight * .7, vx: (Math.random() - .5) * 120, vy: 150 + Math.random() * 220, g: 40, s: 7 + Math.random() * 7, life: 4.2, max: 4.2, c: colors[i % colors.length], sq: true, r: Math.random() * 6, vr: (Math.random() - .5) * 9 });
    },
    step(dt) {
      const g = this.g; if (!g) return;
      g.clearRect(0, 0, innerWidth, innerHeight);
      g.globalCompositeOperation = G.skin === 'block' || G.skin === 'arena' ? 'source-over' : 'lighter';
      this.rings = this.rings.filter((o) => { o.t += dt / .42; if (o.t >= 1) return false; const e = 1 - (1 - o.t) ** 3; g.globalAlpha = 1 - o.t; g.strokeStyle = o.c; g.lineWidth = o.w * (1 - o.t) + 1; g.beginPath(); g.arc(o.x, o.y, 10 + (o.to - 10) * e, 0, 6.283); g.stroke(); return true; });
      this.ps = this.ps.filter((p) => {
        p.life -= dt; if (p.life <= 0) return false;
        p.vy += p.g * dt; p.x += p.vx * dt; p.y += p.vy * dt; p.r += p.vr * dt;
        g.globalAlpha = Math.min(1, p.life / (p.max * .4)); g.fillStyle = p.c;
        if (p.sq) { g.save(); g.translate(p.x, p.y); g.rotate(p.r); g.fillRect(-p.s / 2, -p.s / 2, p.s, p.s); g.restore(); } else { g.beginPath(); g.arc(p.x, p.y, p.s / 2, 0, 6.283); g.fill(); }
        return true;
      });
      g.globalAlpha = 1;
    },
  };
  function shake(power = 12, time = .32) {
    if (calm) return;
    const rig = $('#rig'), o = { p: 1 };
    gsap.killTweensOf(o); gsap.set(rig, { scale: 1.035 });
    gsap.to(o, { p: 0, duration: time, ease: 'power2.out', onUpdate: () => gsap.set(rig, { x: (Math.random() - .5) * power * o.p, y: (Math.random() - .5) * power * o.p }), onComplete: () => gsap.set(rig, { x: 0, y: 0, scale: 1 }) });
  }
  function flash(color, peak = .55) { if (calm) return; const f = $('#flash'); f.style.background = color; gsap.fromTo(f, { opacity: peak }, { opacity: 0, duration: .32, ease: 'power2.out' }); }
  function floatWord(x, y, text, size = 60) {
    const el = document.createElement('div');
    el.className = 'float'; el.textContent = text; el.style.cssText = `left:${x}px;top:${y}px;font-size:clamp(34px,6vw,${size}px)`;
    document.body.append(el);
    gsap.timeline({ onComplete: () => el.remove() }).fromTo(el, { scale: 2.4, opacity: 0 }, { scale: 1, opacity: 1, duration: .22, ease: 'back.out(2.6)' }).to(el, { y: -70, opacity: 0, duration: .75, ease: 'power1.in' }, '+=.3');
  }

  /* ---------- Sound, made in the browser ---------- */
  const Snd = {
    ctx: null,
    get() { if (G.muted) return null; try { this.ctx ||= new (window.AudioContext || window.webkitAudioContext)(); this.ctx.resume?.(); return this.ctx; } catch (e) { return null; } },
    tone(f, t = .14, wave, vol = .13, delay = 0, to) {
      const c = this.get(); if (!c) return;
      const o = c.createOscillator(), g = c.createGain(), s = c.currentTime + delay;
      o.type = wave || skin().tone.wave; o.frequency.setValueAtTime(f, s); if (to) o.frequency.exponentialRampToValueAtTime(to, s + t);
      g.gain.setValueAtTime(vol, s); g.gain.exponentialRampToValueAtTime(.001, s + t);
      o.connect(g).connect(c.destination); o.start(s); o.stop(s + t + .02);
    },
    noise(t = .3, vol = .2, freq = 900) {
      const c = this.get(); if (!c) return;
      const n = c.sampleRate * t, buf = c.createBuffer(1, n, c.sampleRate), d = buf.getChannelData(0);
      for (let i = 0; i < n; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / n);
      const s = c.createBufferSource(), f = c.createBiquadFilter(), g = c.createGain();
      s.buffer = buf; f.type = 'lowpass'; f.frequency.value = freq; g.gain.value = vol;
      s.connect(f).connect(g).connect(c.destination); s.start();
    },
    tap() { this.tone(skin().tone.base * 2, .06, undefined, .07); },
    select() { this.tone(skin().tone.base * 1.5, .08, undefined, .09); },
    hit(streak) { const b = skin().tone.base; this.noise(.26, .24, 1400); this.tone(110, .22, 'sine', .3, 0, 45); [1, 1.25, 1.5, 2].slice(0, Math.min(4, streak + 1)).forEach((m, i) => this.tone(b * m * (1 + streak * .06), .18, undefined, .11, .05 + i * .07)); },
    miss() { this.tone(170, .3, 'sawtooth', .1, 0, 80); },
    star(i) { const b = skin().tone.base; this.tone(b * [1.5, 2, 3][i], .36, undefined, .13); this.tone(b * [3, 4, 6][i], .3, 'sine', .07, .03); },
    fanfare() { const b = skin().tone.base; [1, 1.25, 1.5, 2, 2.5].forEach((m, i) => this.tone(b * m, .34, undefined, .12, i * .11)); this.noise(.5, .14, 2600); },
    tick() { this.tone(skin().tone.base * 3, .04, 'square', .05); },
  };

  /* ---------- Review strip ---------- */
  function drawReview() {
    $('#review').innerHTML = `<div class="rGroup" role="group" aria-label="Style">${Object.entries(SKINS).map(([k, s]) => `<button data-skin="${k}" aria-pressed="${k === G.skin}">${esc(s.name)}</button>`).join('')}</div>
      <div class="rGroup" role="group" aria-label="Screen">${SCREENS.map(([k, t]) => `<button data-screen="${k}" aria-pressed="${k === G.screen}">${t}</button>`).join('')}</div>
      <button id="mute">${G.muted ? 'Sound off' : 'Sound on'}</button>`;
  }
  function go(screen, keep) {
    G.screen = screen;
    drawReview();
    if (!keep) loadWorld();
    ({ test: startTest, result: () => showResult(true), lobby: showLobby, exam: () => { G.ei = 0; G.ea = {}; G.endAt = Date.now() + 1800000; drawExam(); }, examresult: showExamResult })[screen]();
  }
  function setSkin(k) { G.skin = k; document.body.className = k; go(G.screen); }

  /* ---------- Test ---------- */
  function startTest() { Object.assign(G, { i: 0, right: 0, streak: 0, missed: [], val: null, locked: false }); drawQuestion(true); }
  function meterWidth() { const f = G.right / TEST.length; return skin().meter === 'down' ? 1 - f : f; }
  function hud() {
    const s = skin();
    return `<header class="hud"><div class="mission"><h1>${esc(s.mission)}</h1><div class="meter ${s.meter === 'up' ? 'good' : ''}" role="img" aria-label="${G.right} of ${TEST.length} right"><i id="fill" style="width:${meterWidth() * 100}%"></i><div class="ticks">${TEST.map(() => '<b></b>').join('')}</div></div></div>
      <div class="count"><b>${G.i + 1}/${TEST.length}</b><small>Question</small></div></header>
      <div class="combo" id="combo"></div><div class="spacer"></div>`;
  }
  function answersHtml(q, value, reveal) {
    const L = 'ABCD';
    if (q.t === 'radio' || q.t === 'check') {
      const picked = (k) => (q.t === 'check' ? (value || []).includes(k) : value === k);
      const right = (k) => (q.t === 'check' ? q.a.includes(k) : q.a === k);
      return `${q.t === 'check' ? '<p class="help">Pick all that apply</p>' : ''}<div class="answers">${q.o.map((t, k) => `<button class="ans ${picked(k) ? 'sel' : ''} ${reveal && right(k) ? 'ok' : ''} ${reveal && picked(k) && !right(k) ? 'no' : ''}" data-ans="${k}" ${reveal ? 'disabled' : ''}><span class="key"><span>${L[k]}</span></span>${esc(t)}</button>`).join('')}</div>`;
    }
    if (q.t === 'tf') return `<div class="tf">${q.rows.map(([t, a], r) => `<div class="tfRow"><span>${esc(t)}</span><span class="tfBtns">${[[true, 'True'], [false, 'False']].map(([v, l]) => { const chosen = (value || [])[r] === v; return `<button data-tf="${r}:${v}" class="${chosen ? 'sel' : ''} ${reveal && a === v ? 'ok' : ''} ${reveal && chosen && a !== v ? 'no' : ''}" ${reveal ? 'disabled' : ''}>${l}</button>`; }).join('')}</span></div>`).join('')}</div>`;
    if (q.t === 'slider') { const v = value ?? Math.round((q.min + q.max) / 2 / q.step) * q.step; return `<div class="slider"><output id="slideOut">${v} ${esc(q.unit)}</output><input type="range" aria-label="Your estimate" id="slide" min="${q.min}" max="${q.max}" step="${q.step}" value="${v}" ${reveal ? 'disabled' : ''}></div>`; }
    if (q.t === 'written') return `<textarea class="written" id="written" aria-label="Your answer" placeholder="Write your answer in full sentences">${esc(value || '')}</textarea>`;
    return '';
  }
  const answered = (q, v) => (q.t === 'check' ? (v || []).length > 0 : q.t === 'tf' ? (v || []).filter((x) => x != null).length === q.rows.length : q.t === 'slider' ? true : v != null);
  const correct = (q, v) => {
    if (q.t === 'radio') return v === q.a;
    if (q.t === 'check') return [...(v || [])].sort().join() === [...q.a].sort().join();
    if (q.t === 'tf') return q.rows.every(([, a], i) => v[i] === a);
    if (q.t === 'slider') return Math.abs((v ?? 550) - q.a) <= q.tol;
    return false;
  };
  function drawQuestion(enter) {
    const q = TEST[G.i], s = skin();
    ui.innerHTML = `${hud()}<section class="panel" aria-live="polite"><h2 class="qText">${esc(q.q)}</h2><div id="box">${answersHtml(q, G.val, false)}</div><div class="foot" id="foot"><button class="go" id="lock" ${answered(q, G.val) ? '' : 'disabled'}>${esc(s.lock)}</button></div></section>`;
    if (enter && !calm) {
      gsap.from('.panel', { y: 90, opacity: 0, duration: .4, ease: 'back.out(1.5)' });
      gsap.from('.qText', { x: -50, opacity: 0, duration: .35, delay: .08, ease: 'power3.out' });
      gsap.from('.ans, .tfRow, .slider', { y: 26, opacity: 0, duration: .3, stagger: .055, delay: .12, ease: 'back.out(1.8)' });
    }
  }
  function refresh() {
    const q = TEST[G.i];
    $('#box').innerHTML = answersHtml(q, G.val, false);
    $('#lock').disabled = !answered(q, G.val);
  }
  function lockIn() {
    const q = TEST[G.i]; G.locked = true;
    const ok = correct(q, q.t === 'slider' ? (G.val ?? 550) : G.val), s = skin();
    $('#box').innerHTML = answersHtml(q, q.t === 'slider' ? (G.val ?? 550) : G.val, true);
    const finish = () => {
      $('#foot').innerHTML = `<p class="why"><b>${ok ? 'Correct!' : 'Not quite.'}</b>${esc(q.why)}</p><button class="go" id="nextQ">${G.i === TEST.length - 1 ? 'See how you did' : 'Next'}</button>`;
      $('#nextQ').focus({ preventScroll: true });
      if (!calm) gsap.from('#foot > *', { y: 16, opacity: 0, duration: .25, stagger: .06 });
    };
    if (ok) {
      G.right++; G.streak++;
      W.ctl ? W.ctl.fire(() => impact(G.streak)) : impact(G.streak);
      gsap.delayedCall(.1, () => W.ctl?.progress(G.right / TEST.length));
      gsap.to('#fill', { width: `${meterWidth() * 100}%`, duration: .5, delay: .4, ease: 'power2.out' });
      finish();
    } else {
      G.streak = 0; G.missed.push(G.i);
      Snd.miss();
      W.ctl?.miss(() => {});
      gsap.fromTo('.panel', { x: -10 }, { x: 0, duration: .5, ease: 'elastic.out(1,.3)' });
      const p = W.ctl ? toScreen(W.ctl.target()) : { x: innerWidth / 2, y: innerHeight * .3 };
      floatWord(p.x, p.y, s.no, 48);
      gsap.to('#combo', { opacity: 0, duration: .2 });
      finish();
    }
  }
  function impact(streak) {
    const s = skin(), p = W.ctl ? toScreen(W.ctl.target()) : { x: innerWidth / 2, y: innerHeight * .3 };
    W.freeze = .07 + Math.min(streak, 4) * .018;
    Snd.hit(streak);
    FX.burst(p.x, p.y, 34 + streak * 14, 560 + streak * 90);
    FX.ring(p.x, p.y, s.colors[0], 240 + streak * 60);
    if (streak > 1) FX.ring(p.x, p.y, s.colors[1], 170 + streak * 50, 10);
    shake(9 + streak * 3.5);
    flash(s.colors[2] + '', .12 + Math.min(streak, 4) * .06);
    floatWord(p.x, p.y - 30, s.ok[Math.min(streak - 1, s.ok.length - 1)], 64 + streak * 8);
    const c = $('#combo');
    if (c && streak > 1) { c.textContent = `${s.comboWord}${streak}`; gsap.fromTo(c, { scale: 2.2, opacity: 0, rotation: -8 }, { scale: 1, opacity: 1, rotation: 0, duration: .3, ease: 'back.out(3)' }); }
  }

  /* ---------- Rewards are earned by the score, and never random ---------- */
  const STAR = (id) => `<svg viewBox="0 0 100 96" aria-hidden="true"><defs><linearGradient id="s${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FFF6B0"/><stop offset=".5" stop-color="#FFC21E"/><stop offset="1" stop-color="#E87A00"/></linearGradient></defs><path d="M50 4l14 30 33 4-24 23 6 33-29-16-29 16 6-33L3 38l33-4z" fill="url(#s${id})" stroke="#3A1E00" stroke-width="5" stroke-linejoin="round"/><path d="M50 15l9 20-12 2z" fill="#fff" opacity=".6"/></svg>`;
  const STAR_OFF = '<svg viewBox="0 0 100 96" aria-hidden="true"><path d="M50 4l14 30 33 4-24 23 6 33-29-16-29 16 6-33L3 38l33-4z" fill="#00000055" stroke="#00000088" stroke-width="5" stroke-linejoin="round"/></svg>';
  const TROPHIES = {
    arena: `<svg class="trophy" viewBox="0 0 200 170" aria-hidden="true"><defs><linearGradient id="cw" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#C2813D"/><stop offset="1" stop-color="#7A4A1E"/></linearGradient><linearGradient id="cg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FFEE8A"/><stop offset="1" stop-color="#F09A00"/></linearGradient></defs><g id="lid"><path d="M28 74c0-40 144-40 144 0v10H28z" fill="url(#cw)" stroke="#2A1608" stroke-width="7"/><path d="M84 40h32v44H84z" fill="url(#cg)" stroke="#2A1608" stroke-width="5"/></g><rect x="28" y="84" width="144" height="74" rx="8" fill="url(#cw)" stroke="#2A1608" stroke-width="7"/><path d="M28 104h144" stroke="#2A1608" stroke-width="5"/><rect x="82" y="80" width="36" height="46" rx="6" fill="url(#cg)" stroke="#2A1608" stroke-width="5"/><circle cx="100" cy="102" r="7" fill="#2A1608"/></svg>`,
    neon: `<svg class="trophy" viewBox="0 0 200 170" aria-hidden="true"><defs><linearGradient id="ng" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#27F5F5"/><stop offset=".5" stop-color="#FFF04A"/><stop offset="1" stop-color="#FF2EDB"/></linearGradient></defs><path d="M46 8h126l-18 132-54 26-72-26z" fill="#150858" stroke="url(#ng)" stroke-width="9" stroke-linejoin="round"/><text x="104" y="106" text-anchor="middle" font-family="Barlow Condensed,Arial" font-style="italic" font-weight="900" font-size="88" fill="#FFF04A">12</text></svg>`,
    dark: `<svg class="trophy" viewBox="0 0 200 170" aria-hidden="true"><defs><linearGradient id="dg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FFF3C4"/><stop offset=".5" stop-color="#E8B24A"/><stop offset="1" stop-color="#7A4A12"/></linearGradient><radialGradient id="dc" cx=".5" cy=".4"><stop offset="0" stop-color="#FFF3C4"/><stop offset="1" stop-color="#C96F1E"/></radialGradient></defs><path d="M100 4l27 18 32-4 9 31 26 20-13 30 7 32-31 10-20 25-30-12-30 12-20-25-31-10 7-32L10 69l26-20 9-31 32 4z" fill="url(#dg)" stroke="#2A1608" stroke-width="4"/><circle cx="100" cy="84" r="46" fill="#17111F" stroke="#2A1608" stroke-width="3"/><path d="M100 46l25 38-25 38-25-38z" fill="url(#dc)"/></svg>`,
    block: `<svg class="trophy" viewBox="0 0 200 170" aria-hidden="true"><path d="M100 8l78 36-78 36-78-36z" fill="#92E873" stroke="#1F3A1A" stroke-width="5" stroke-linejoin="round"/><path d="M22 44l78 36v82l-78-36z" fill="#C6894A" stroke="#1F3A1A" stroke-width="5" stroke-linejoin="round"/><path d="M178 44l-78 36v82l78-36z" fill="#9C6B3C" stroke="#1F3A1A" stroke-width="5" stroke-linejoin="round"/><path d="M22 44l78 36 78-36v20l-78 36-78-36z" fill="#4FC02C" stroke="#1F3A1A" stroke-width="5" stroke-linejoin="round"/></svg>`,
  };
  function showResult(direct) {
    const s = skin();
    if (direct) { Object.assign(G, { right: 5, missed: [3], i: TEST.length - 1 }); if (W.ctl?.prefill) W.ctl.prefill(5); W.ctl?.progress(5 / TEST.length); }
    const stars = G.right >= TEST.length - 1 ? 3 : G.right >= TEST.length / 2 ? 2 : 1;
    const earned = G.right >= TEST.length - 1;
    ui.innerHTML = `<div class="result"><div class="rays"></div><h1 class="winWord">${esc(s.win)}</h1>
      <div class="stars">${[0, 1, 2].map((i) => (i < stars ? STAR(i) : STAR_OFF)).join('')}</div>
      ${earned ? TROPHIES[G.skin] : ''}
      <p class="scoreLine">${G.right} of ${TEST.length} right${earned ? `: ${esc(s.reward)}` : ''}</p>
      <div class="xp"><div class="xpTop"><span>${esc(s.xpLabel)}</span><span id="xpNum">+0 XP</span></div><div class="meter good"><i id="xpFill" style="width:22%"></i></div></div>
      ${G.missed.length ? `<section class="fix"><h2>Beat these next time</h2>${G.missed.map((i) => `<p>${esc(TEST[i].q)}<small>${esc(TEST[i].why)}</small></p>`).join('')}</section>` : ''}
      <p class="note" style="color:inherit">${earned ? esc(s.rewardNote) : 'Get 5 out of 6 to earn this lesson’s reward.'}</p>
      <div class="resultBtns"><button class="go" id="again">Play again</button><button class="ghost" data-screen="lobby">${esc(s.next)}</button></div></div>`;
    W.ctl?.win();
    const tl = gsap.timeline();
    if (calm) { gsap.set('.rays', { opacity: 1 }); $('#xpNum').textContent = `+${G.right * 50} XP`; gsap.set('#xpFill', { width: '70%' }); return; }
    tl.fromTo('.rays', { opacity: 0, rotation: 0 }, { opacity: 1, duration: .5 }, 0);
    gsap.to('.rays', { rotation: 360, duration: 40, ease: 'none', repeat: -1 });
    tl.from('.winWord', { scale: 3.2, opacity: 0, duration: .4, ease: 'back.out(1.8)', onStart: () => { Snd.fanfare(); } }, .1);
    tl.call(() => { shake(16); FX.ring(innerWidth / 2, innerHeight * .2, skin().colors[0], Math.max(innerWidth, 600) * .6, 22); FX.burst(innerWidth / 2, innerHeight * .2, 90, 900); FX.confetti(); }, null, .42);
    $$('.stars svg').forEach((el, i) => tl.from(el, { scale: 0, rotation: -160, duration: .45, ease: 'back.out(2.2)', onStart: () => { if (i < stars) Snd.star(i); } }, .65 + i * .22));
    tl.call(() => { if (stars) { const r = $$('.stars svg')[Math.min(1, stars - 1)]?.getBoundingClientRect(); if (r) FX.burst(r.x + r.width / 2, r.y + r.height / 2, 34, 480); } }, null, 1.3);
    const trophy = $('.trophy');
    if (trophy) {
      tl.from(trophy, { y: -240, scale: .5, duration: .55, ease: 'bounce.out' }, 1.45);
      const lid = $('#lid', trophy);
      if (lid) tl.to(lid, { y: -24, rotation: -9, transformOrigin: '0% 100%', duration: .35, ease: 'back.out(3)', onStart: () => { const r = trophy.getBoundingClientRect(); FX.burst(r.x + r.width / 2, r.y + r.height * .45, 70, 720, 800); Snd.fanfare(); } }, 2);
    }
    tl.from('.scoreLine', { y: 24, opacity: 0, duration: .3 }, 1.85);
    tl.from('.xp', { y: 24, opacity: 0, duration: .3 }, 2.05);
    const xp = { v: 0 }, target = G.right * 50;
    tl.to(xp, { v: target, duration: .9, ease: 'power2.out', onUpdate: () => { const el = $('#xpNum'); if (el) el.textContent = `+${Math.round(xp.v)} XP`; } }, 2.2);
    tl.to('#xpFill', { width: `${22 + G.right * 8}%`, duration: .9, ease: 'power2.out' }, 2.2);
    tl.from('.fix, .note, .resultBtns', { y: 20, opacity: 0, duration: .3, stagger: .1 }, 2.7);
  }

  /* ---------- Exam: same world, but calm. No effects until the end, because concentration comes first. ---------- */
  function showLobby() {
    const s = skin(), stages = [['A', 'Quick questions'], ['B', 'Diagrams'], ['C', 'Calculations'], ['D', 'Written']];
    ui.innerHTML = `<div class="lobby"><section class="lobbyCard"><h1>${esc(s.lobby)}</h1><p>Unit exam: Human skeleton and muscles</p>
      <ul class="facts"><li><b>30</b>minutes</li><li><b>17</b>questions</li><li><b>34</b>marks</li><li><b>1</b>attempt</li></ul>
      <ol class="stages">${stages.map(([l, t]) => `<li><i><span>${l}</span></i>${t}</li>`).join('')}</ol>
      <p class="note">Do this alone, with an adult nearby. No books, phones or videos. An adult enters the exam PIN to begin.</p>
      <button class="go" data-screen="exam">${esc(s.go)}</button></section></div>`;
    if (!calm) { gsap.from('.lobbyCard', { y: 60, scale: .94, opacity: 0, duration: .5, ease: 'back.out(1.6)' }); gsap.from('.facts li, .stages li', { y: 18, opacity: 0, duration: .3, stagger: .05, delay: .2 }); }
  }
  function drawExam() {
    const q = EXAM[G.ei], n = EXAM.length;
    ui.innerHTML = `<div class="examHud"><span class="clock" id="clock">30:00</span><div class="nodes" role="group" aria-label="Questions">${EXAM.map((_, i) => `<button data-q="${i}" class="${i === G.ei ? 'on' : ''} ${G.ea[i] != null && i !== G.ei ? 'done' : ''}" aria-label="Question ${i + 1}"><span>${i + 1}</span></button>`).join('')}</div></div>
      <div class="spacer"></div>
      <section class="panel"><p class="help" style="margin:0">Section ${q.section}, question ${G.ei + 1} of ${n} (sample of the 17), ${q.marks} ${q.marks === 1 ? 'mark' : 'marks'}</p><h2 class="qText">${esc(q.q)}</h2><div id="box">${answersHtml(q, G.ea[G.ei], false)}</div>
      <div class="examNav"><button class="ghost" id="prevQ" ${G.ei ? '' : 'disabled'}>Previous</button><button class="go" id="examNext">${G.ei === n - 1 ? 'Finish exam' : 'Next'}</button></div></section>`;
    tickClock();
  }
  function tickClock() {
    const c = $('#clock'); if (!c) return;
    const left = Math.max(0, G.endAt - Date.now());
    c.textContent = `${Math.floor(left / 60000)}:${String(Math.floor(left / 1000) % 60).padStart(2, '0')}`;
    clearTimeout(tickClock.t); tickClock.t = setTimeout(tickClock, 1000);
  }
  function showExamResult() {
    const s = skin(), rows = [['The skeleton', 11, 13], ['Muscles', 7, 8], ['Movement', 5, 8], ['Biomechanics', 4, 5]];
    ui.innerHTML = `<div class="result"><div class="rays"></div><h1 class="winWord">${esc(s.examRank)}</h1>${TROPHIES[G.skin]}
      <p class="scoreLine">27 of 34 marks so far</p><section class="bars">${rows.map(([t, a, b]) => `<div class="barRow"><span>${t}</span><div class="meter good"><i class="bar" data-w="${a / b * 100}" style="width:0"></i></div><span>${a}/${b}</span></div>`).join('')}</section>
      <p class="note" style="color:inherit">A parent is marking 4 more marks from your written answers. The rank can still go up.</p><div class="resultBtns"><button class="go" data-screen="lobby">Back to My day</button></div></div>`;
    W.ctl?.win();
    if (calm) { $$('.bar').forEach((b) => { b.style.width = `${b.dataset.w}%`; }); gsap.set('.rays', { opacity: 1 }); return; }
    gsap.fromTo('.rays', { opacity: 0 }, { opacity: 1, duration: .5 }); gsap.to('.rays', { rotation: 360, duration: 50, ease: 'none', repeat: -1 });
    gsap.from('.winWord', { scale: 2.8, opacity: 0, duration: .4, ease: 'back.out(1.8)', onStart: () => Snd.fanfare() });
    gsap.delayedCall(.4, () => { shake(10); FX.confetti(); });
    gsap.from('.trophy', { scale: 0, rotation: -40, duration: .55, delay: .5, ease: 'back.out(2)' });
    $$('.bar').forEach((b, i) => gsap.to(b, { width: `${b.dataset.w}%`, duration: .7, delay: .9 + i * .14, ease: 'power2.out' }));
  }

  /* ---------- Input ---------- */
  document.addEventListener('click', (ev) => {
    const b = ev.target.closest('button'); if (!b || b.disabled) return;
    const d = b.dataset;
    if (d.skin) { Snd.tap(); setSkin(d.skin); }
    else if (d.screen) { Snd.tap(); go(d.screen); }
    else if (b.id === 'mute') { G.muted = !G.muted; drawReview(); }
    else if (d.ans != null) {
      Snd.select(); const k = +d.ans;
      const isExam = G.screen === 'exam', q = isExam ? EXAM[G.ei] : TEST[G.i];
      let v = isExam ? G.ea[G.ei] : G.val;
      if (q.t === 'check') { v = [...(v || [])]; v = v.includes(k) ? v.filter((x) => x !== k) : [...v, k]; } else v = k;
      if (isExam) { G.ea[G.ei] = v; $('#box').innerHTML = answersHtml(q, v, false); } else { G.val = v; refresh(); }
      if (!calm) gsap.fromTo(`[data-ans="${k}"]`, { scale: .96 }, { scale: 1, duration: .25, ease: 'back.out(3)' });
    } else if (d.tf) { Snd.select(); const [r, val] = d.tf.split(':'); const v = [...(G.val || [])]; v[+r] = val === 'true'; G.val = v; refresh(); }
    else if (b.id === 'lock' && !G.locked) { Snd.tap(); lockIn(); }
    else if (b.id === 'nextQ') { Snd.tap(); if (G.i === TEST.length - 1) { G.screen = 'result'; drawReview(); showResult(false); } else { G.i++; G.val = null; G.locked = false; drawQuestion(true); } }
    else if (b.id === 'again') { go('test'); }
    else if (d.q != null) { Snd.tap(); G.ei = +d.q; drawExam(); }
    else if (b.id === 'prevQ') { Snd.tap(); G.ei--; drawExam(); }
    else if (b.id === 'examNext') { Snd.tap(); if (G.ei < EXAM.length - 1) { G.ei++; drawExam(); } else go('examresult'); }
  });
  document.addEventListener('input', (ev) => {
    if (ev.target.id === 'slide') { G.val = +ev.target.value; $('#slideOut').textContent = `${G.val} ${TEST[G.i].unit}`; if (G.val % 100 === 0) Snd.tick(); }
    if (ev.target.id === 'written') G.ea[G.ei] = ev.target.value;
  });
  addEventListener('resize', fit);

  /* A link such as #neon-result opens that style and screen. */
  const [hs, hscreen] = location.hash.slice(1).split('-');
  if (SKINS[hs]) G.skin = hs;
  if (SCREENS.some(([k]) => k === hscreen)) G.screen = hscreen;
  document.body.className = G.skin;
  FX.size(innerWidth, innerHeight);
  document.fonts?.ready.then(() => { go(G.screen); });
  window.GAME = { G, go, setSkin, lockIn };
})();
