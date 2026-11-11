/* Design round one: three directions compared on the same screens, with the real Year 7 program from Oak National Academy. */
const SUBJECTS = [
  { name: 'Science', a: '#1F35D6', c: '#6FE7F2', units: [['Fo', 'Forces', 10], ['St', 'States of matter', 7], ['Ce', 'Cells', 7], ['So', 'Our solar system', 8], ['Sl', 'Solutions', 11], ['Ec', 'Ecosystems', 9], ['Li', 'Sound, light and vision', 8], ['Dn', 'Heredity and DNA', 7], ['Se', 'Separation techniques', 7], ['Sk', 'Human skeleton and muscles', 4], ['He', 'Heating and cooling', 8], ['Di', 'Diffusion', 4], ['Cl', 'Climate change', 7]] },
  { name: 'Maths', a: '#E8421F', c: '#FFB547', units: [['Pv', 'Place value', 11], ['Fm', 'Factors and multiples', 19], ['Ar', 'Integers and decimals', 17], ['Eq', 'Expressions and equations', 17], ['Co', 'Plotting coordinates', 7], ['Pa', 'Perimeter and area', 12], ['Fd', 'Ordering fractions', 18], ['Af', 'Arithmetic with fractions', 10], ['Ra', 'Fractions and ratio', 17], ['Tr', 'Transformations', 18]] },
  { name: 'English', a: '#6A3FD1', c: '#B69CFF', units: [['Ds', 'Effective discussion', 4], ['Un', 'Step into the unknown', 32], ['Te', 'The Tempest', 28], ['Po', 'Poetry about place and home', 14], ['Sh', 'Sherlock Holmes', 22], ['Tw', 'The Twisted Tree', 32], ['Dy', 'Dystopian settings', 16]] },
  { name: 'History', a: '#B4531A', c: '#FF8E72', units: [['Gs', 'The Great Schism', 3], ['Is', 'Islamic worlds', 3], ['No', 'The Norman Conquest', 6], ['Cr', 'The Crusades', 6], ['Ma', 'Matilda and medieval women', 6], ['Hn', 'England under Henry II', 6], ['Mc', 'Magna Carta', 6], ['Ed', 'Edward I', 6], ['Nw', 'Medieval Norwich', 6], ['Ml', 'Medieval Mali', 6], ['Bd', 'The Black Death', 3], ['Pr', 'The Peasants’ Revolt', 6], ['Wr', 'The Wars of the Roses', 6], ['Rn', 'The Renaissance', 6]] },
  { name: 'Geography', a: '#0A8F6A', c: '#6EE7A8', units: [['Gg', 'What makes a geographer?', 12], ['We', 'Weather and climate', 14], ['Pp', 'Population', 12], ['Cs', 'Coasts', 12], ['Fb', 'Forest biomes', 12], ['In', 'India', 12], ['Ch', 'China', 12]] },
  { name: 'Computing', a: '#0A8FAF', c: '#7CB8FF', units: [['Dm', 'Digital media', 6], ['Ne', 'Computer networks', 6], ['Mc', 'Media for a cause', 6], ['Bl', 'Block programming', 6], ['Mb', 'Coding a micro:bit', 6], ['Dt', 'Data modelling', 6]] },
  { name: 'Spanish', a: '#D93A75', c: '#FF97C4', units: [['Id', 'Identity: estar and ser', 6], ['Be', 'Belongings: tener', 4], ['Ac', 'Activities: -AR verbs', 4], ['Lf', 'Life at school and home', 6], ['Pl', 'Places: articles', 6], ['Ce', 'Celebrations: querer and dar', 2], ['Wh', 'What we have', 6], ['Qu', 'Information questions', 4], ['Mo', 'What we can and must do', 6], ['Pe', 'People and places', 4], ['Aw', 'At home and away', 5], ['Er', '-ER and -IR verbs', 6], ['De', 'Describing people', 4], ['Pn', 'Places and plans', 8]] },
];
const R = { dir: 'A', screen: 'today', pickS: 0, pickU: 9, still: false };
const stage = document.getElementById('stage'), bar = document.getElementById('bar');
const FIG = 'art/skeleton-cut.png';
const SKELETON_ALT = 'A real human skeleton, cut out of a photograph';
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const lessonsOf = (s) => s.units.reduce((n, u) => n + u[2], 0);
const termOf = (s, u) => { const before = s.units.slice(0, u).reduce((n, x) => n + x[2], 0) / lessonsOf(s); return before < 1 / 3 ? 'Autumn' : before < 2 / 3 ? 'Spring' : 'Summer'; };
const today = () => new Date().toLocaleDateString(undefined, { weekday: 'long' });

/* Small sounds, played only after a person acts. */
const audio = { ctx: null, tone(f1, f2, t, g = .08, type = 'sine') { try { const c = (this.ctx ||= new (window.AudioContext || window.webkitAudioContext)()); const o = c.createOscillator(), a = c.createGain(); o.type = type; o.frequency.setValueAtTime(f1, c.currentTime); o.frequency.exponentialRampToValueAtTime(f2, c.currentTime + t); a.gain.setValueAtTime(g, c.currentTime); a.gain.exponentialRampToValueAtTime(.001, c.currentTime + t); o.connect(a).connect(c.destination); o.start(); o.stop(c.currentTime + t); } catch (e) {} }, right() { this.tone(660, 990, .25); setTimeout(() => this.tone(990, 1320, .4), 120); }, wrong() { this.tone(180, 120, .3, .1, 'triangle'); } };

/* ---------- A: The Living Encyclopedia ---------- */
const A = {
  today() {
    return `<div class="aDisk"></div><img class="aTodayFig" src="${FIG}" alt="${SKELETON_ALT}">
      <div class="aTabs" aria-hidden="true">${SUBJECTS.map((s, i) => `<div class="aTab ${i ? '' : 'on'}" style="background:${s.a}">${s.name}</div>`).join('')}</div>
      <h1 class="aDay">${esc(today())}</h1>
      <ol class="aList">
        <li><button class="aRow done"><span class="num">1</span><span><h2>Starter quiz</h2><p>Done. You got 3 out of 3.</p></span></button></li>
        <li><button class="aRow hero" data-go="cover" data-first><span class="num">2</span><span><h2>Why Don’t You Collapse?</h2><p>Science: the human skeleton. A 7-minute episode with 2 films.</p></span></button></li>
        <li><button class="aRow" data-go="question"><span class="num">3</span><span><h2>Lesson test</h2><p>12 questions, on your own device.</p></span></button></li>
      </ol>
      <p class="aAlso"><b>Also today:</b> Maths, place value. English, The Tempest. (Example timetable)</p>`;
  },
  year() {
    return `<div class="aYearHead"><h1>Your year</h1><div class="aPick" id="pick"></div></div>
      <div class="aChart"><div class="aTerms"><span></span><span>Autumn</span><span>Spring</span><span>Summer</span></div>
      ${SUBJECTS.map((s, i) => `<div class="aRowY"><span>${s.name}</span><div class="aTiles">${s.units.map((u, j) => `<button class="aTile ${i === 0 && j === 9 ? 'now' : ''}" style="--w:${u[2]};--col:${s.a}" data-pick="${i}:${j}" aria-label="${esc(u[1])}" ${i === 0 && j === 9 ? 'data-first' : ''}>${u[0]}</button>`).join('')}</div></div>`).join('')}</div>
      <p class="aFoot">Year 7. Each tile’s width shows how many lessons it has. Unit order from Oak National Academy; the terms are our suggested split.</p>`;
  },
  showPick(s, u) {
    const S = SUBJECTS[s], U = S.units[u], isNow = s === 0 && u === 9;
    document.getElementById('pick').innerHTML = `<h2>${esc(U[1])}</h2><p>${S.name}, ${termOf(S, u)} term, ${U[2]} lessons${isNow ? '. You are here.' : ''}</p>`;
  },
  cover() {
    return `<div class="aCover"><h1 class="aMast" id="mast">Bones</h1><img class="aFigure" id="fig" src="${FIG}" alt="${SKELETON_ALT}">
      <p class="aDeck" id="deck">Take them away and you’d be a puddle on the floor. So why don’t you collapse?</p>
      <div class="aSticker" id="stick"><em>Try it</em>Make a bone that bends</div>
      <button class="aPlay" data-first data-go="question" id="play">Watch the episode</button>
      <p class="aMeta">Science. Human skeleton and muscles, lesson 1 of 4.</p>
      <p class="credit">Skeleton photo: Sklmsta, CC0</p></div>`;
  },
  list() { return programList('Everything this year'); },
  question() {
    return `<div class="aQFig" id="figBox"><img src="${FIG}" alt="${SKELETON_ALT}">${pins()}</div>
      <div class="aQText"><small>Question 2 of 12</small><h1>Which letter is on the longest bone?</h1><div class="aAnswer" id="answer"></div></div>`;
  },
};
/* Positions as a percent of the cut-out photo. */
function pins() {
  return [['A', 33, 9, 'skull'], ['B', 34, 44, 'ribs'], ['C', 6, 46, 'humerus'], ['D', 23, 92, 'femur']].map(([l, x, y, b]) => `<button class="pinQ" style="left:${x}%;top:${y}%" data-pin="${b}" aria-label="Letter ${l}">${l}</button>`).join('');
}
const ANSWERS = { femur: 'Your thigh bone is about a quarter of your height.', skull: 'That’s your skull. The longest bone is much lower down.', ribs: 'Those are ribs. Look lower, in the top of your leg.', humerus: 'That’s your upper arm. Long, but there’s a longer one.' };

/* ---------- C: The Cinematic Channel ---------- */
const C = {
  today() {
    return `<img class="cFig xray" id="fig" src="${FIG}" alt="${SKELETON_ALT}, glowing like an X-ray"><div class="scan" id="scan"></div>
      <div class="cHero"><small>Today’s episode</small><h1 class="big">Why don’t you collapse?</h1><p>Your body is held up by something you’ve never seen. Season 1, episode 1.</p><button class="cBtn" data-first data-go="cover">Watch now</button></div>
      <div class="cRail"><button class="cStep done"><b>Starter quiz</b>3 out of 3</button><button class="cStep next" data-go="cover"><b>Episode</b>7 minutes, 2 films</button><button class="cStep" data-go="question"><b>Lesson test</b>On your own device</button></div>`;
  },
  cover() {
    return `<img class="cPosterFig xray" id="fig" src="${FIG}" alt="${SKELETON_ALT}, glowing like an X-ray"><div class="scan" id="scan"></div>
      <h1 class="big cPosterTitle" id="mast">Bones</h1>
      <p class="cSeason"><b>Season 1: The human machine.</b> Episode 1 of 4. What’s really holding you up?</p>
      <button class="cBtn cPosterBtn" data-first data-go="question">Play episode 1</button>
      <p class="credit">Skeleton photo: Sklmsta, CC0</p>`;
  },
  question() {
    return `<div class="cQFig" id="figBox"><img class="xray" src="${FIG}" alt="${SKELETON_ALT}, glowing like an X-ray">${pins()}</div><div class="scan" id="scan"></div>
      <div class="cQ"><span class="cKick">Question 2 of 12</span><h1 class="big">Which letter is on the longest bone?</h1><div class="cA" id="answer"></div></div>`;
  },
  list() { return programList('The whole season'); },
  year() {
    return `<div class="cMetro" id="metro"></div>`;
  },
  drawMetro() {
    const box = document.getElementById('metro');
    const x0 = 300, x1 = 1790, y0 = 380, gap = 66;
    /* Each line bends gently at the term boundaries, as a transit map does. */
    const route = (i) => {
      const y = y0 + i * gap, jog = (i % 2 ? -1 : 1) * 20, t1 = x0 + (x1 - x0) / 3, t2 = x0 + (2 * (x1 - x0)) / 3;
      return [[x0, y], [t1 - 40, y], [t1, y + jog], [t2 - 40, y + jog], [t2, y], [x1, y]];
    };
    const at = (pts, x) => { for (let k = 1; k < pts.length; k++) if (x <= pts[k][0]) { const [a, b] = [pts[k - 1], pts[k]]; const f = (x - a[0]) / (b[0] - a[0] || 1); return a[1] + f * (b[1] - a[1]); } return pts.at(-1)[1]; };
    const stationX = (s, u) => { const total = lessonsOf(s); const before = s.units.slice(0, u).reduce((n, x) => n + x[2], 0); return x0 + 18 + ((before + s.units[u][2] / 2) / total) * (x1 - x0 - 36); };
    let lines = '', dots = '', names = '', btns = '', labels = '';
    SUBJECTS.forEach((s, i) => {
      const pts = route(i), on = i === R.pickS;
      lines += `<polyline points="${pts.map((p) => p.join(',')).join(' ')}" fill="none" stroke="${s.c}" stroke-width="${on ? 16 : 7}" stroke-linejoin="round" stroke-linecap="round" opacity="${on ? 1 : .38}"/>`;
      names += `<button class="lineName ${on ? 'on' : ''}" style="top:${pts[0][1]}px;color:${on ? s.c : ''}" data-line="${i}">${s.name}</button>`;
      s.units.forEach((u, j) => {
        const x = stationX(s, j), y = at(pts, x), cur = on && j === R.pickU, here = i === 0 && j === 9;
        dots += `<circle cx="${x}" cy="${y}" r="${cur ? 22 : on ? 12 : 5}" fill="${cur || here ? '#fff' : '#050B1E'}" stroke="${here ? '#FFB547' : s.c}" stroke-width="${on || here ? 5 : 3}" ${here ? 'class="herePulse"' : ''} opacity="${on || here ? 1 : .6}"/>`;
        if (on) { btns += `<button class="stationBtn" style="left:${x}px;top:${y}px" data-pick="${i}:${j}" aria-label="${esc(u[1])}" ${cur ? 'data-first' : ''}></button>`; labels += `<span class="stationLabel ${cur ? 'cur' : ''} ${here ? 'here' : ''}" style="left:${x + (cur ? 18 : 4)}px;top:${y - (cur ? 50 : 36)}px">${esc(u[1])}</span>`; }
      });
    });
    const S = SUBJECTS[R.pickS], U = S.units[R.pickU], isNow = R.pickS === 0 && R.pickU === 9;
    box.innerHTML = `<h1 class="big">Season map</h1>${['Autumn', 'Spring', 'Summer'].map((t, k) => `<span class="cTerm" style="left:${x0 + (k * (x1 - x0)) / 3}px">${t}</span>`).join('')}
      <svg viewBox="0 0 1920 1080" aria-hidden="true">${lines}${dots}</svg>${names}${btns}${labels}
      <div class="cPanel"><div><h2>${esc(U[1])}</h2><p>${S.name}, ${termOf(S, R.pickU)} term, ${U[2]} lessons${isNow ? '. You are here.' : ''}</p></div>${isNow ? '<button class="cBtn" data-go="cover">Watch</button>' : ''}</div>`;
    gsap.to(box.querySelectorAll('.herePulse'), { attr: { r: 26 }, duration: .8, repeat: -1, yoyo: true, ease: 'sine.inOut' });
  },
};

/* Every unit of the year by name, like the contents pages of a book. */
function programList(title) {
  const total = SUBJECTS.reduce((n, x) => n + x.units.length, 0), lessons = SUBJECTS.reduce((n, x) => n + lessonsOf(x), 0);
  return `<div class="plist"><header><h1>${title}</h1><p>${SUBJECTS.length} subjects, ${total} units, ${lessons} lessons</p></header>
    <div class="plistCols">${SUBJECTS.map((x, i) => `<section style="--col:${R.dir === 'A' ? x.a : x.c}"><h2>${x.name}</h2><ol>${x.units.map((u, j) => `<li class="${i === 0 && j === 9 ? 'now' : ''}">${esc(u[1])}</li>`).join('')}</ol></section>`).join('')}</div>
    <p class="plistFoot">Year 7, in Oak National Academy’s order. Some titles are shortened.</p></div>`;
}

/* ---------- B: The Big World (small version) ---------- */
const CENTERS = [[410, 340, 230], [930, 240, 200], [1500, 300, 220], [1650, 720, 190], [1090, 720, 210], [620, 790, 170], [240, 760, 130]];
const BCOL = [[52, 148, 120], [224, 120, 74], [132, 104, 200], [186, 112, 70], [86, 158, 96], [64, 146, 172], [210, 96, 136]];
let worldImage = null;
function drawWorld() {
  if (worldImage) return worldImage;
  const W = 1920, H = 1080, S = 1, canvas = document.createElement('canvas');
  canvas.width = W; canvas.height = H;
  const ctx = canvas.getContext('2d'), img = ctx.createImageData(W, H), d = img.data;
  const seed = (x, y) => { const n = Math.sin(x * 127.1 + y * 311.7) * 43758.5453; return n - Math.floor(n); };
  const smooth = (x, y) => { const xi = Math.floor(x), yi = Math.floor(y), xf = x - xi, yf = y - yi, u = xf * xf * (3 - 2 * xf), v = yf * yf * (3 - 2 * yf); const a = seed(xi, yi), b = seed(xi + 1, yi), c = seed(xi, yi + 1), e = seed(xi + 1, yi + 1); return a + (b - a) * u + (c - a) * v + (a - b - c + e) * u * v; };
  const noise = (x, y) => smooth(x / 135, y / 135) * .55 + smooth(x / 57, y / 57) * .3 + smooth(x / 24, y / 24) * .15;
  const heightAt = new Float32Array(W * H), region = new Uint8Array(W * H);
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
    const px = x / S, py = y / S;
    let best = 0, who = 0;
    CENTERS.forEach(([cx, cy, r], k) => { const dd = Math.hypot(px - cx, (py - cy) * 1.15) / r, v = Math.exp(-dd * dd * 1.1); if (v > best) { best = v; who = k; } });
    heightAt[y * W + x] = best * 1.08 + (noise(x, y) - .5) * .62;
    region[y * W + x] = who;
  }
  const LEVELS = [.3, .42, .54, .66, .78, .9];
  const level = (h) => { let n = 0; for (const t of LEVELS) if (h > t) n++; return n; };
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
    const i = y * W + x, l = level(heightAt[i]);
    const nx = Math.max(0, x - 8), ny = Math.max(0, y - 9), up = level(heightAt[ny * W + nx]);
    let r, g, b;
    if (l === 0) { const wave = Math.sin(y / 7 + noise(x, y) * 26) > .95 ? 9 : 0; [r, g, b] = [18 + wave, 52 + wave, 74 + wave]; if (up > 0) { r *= .68; g *= .68; b *= .68; } }
    else {
      const [cr, cg, cb] = BCOL[region[i]], k = .68 + l * .085;
      r = cr * k; g = cg * k; b = cb * k;
      if (l >= 5) { r = r * .55 + 250 * .45; g = g * .55 + 245 * .45; b = b * .55 + 230 * .45; }
      if (up > l) { r *= .66; g *= .66; b *= .66; }
    }
    const p = i * 4; d[p] = r; d[p + 1] = g; d[p + 2] = b; d[p + 3] = 255;
  }
  ctx.putImageData(img, 0, 0);
  worldImage = canvas.toDataURL('image/png');
  return worldImage;
}
const B = {
  year() {
    const cam = `<div class="bCam" id="cam"><img src="${drawWorld()}" alt="" style="position:absolute;inset:0;width:100%;height:100%">
      ${SUBJECTS.map((s, i) => `<button class="bRegion" style="left:${CENTERS[i][0]}px;top:${CENTERS[i][1]}px" data-region="${i}" ${i ? '' : 'data-first'}>${s.name}<small>${s.units.length} places</small></button>`).join('')}</div>`;
    return `${cam}<h1 class="bTitle" id="bt">Your year</h1><p class="note">Generated by code as a stand-in. An illustrator would draw a much richer world.</p>`;
  },
  today() {
    const [cx, cy, r] = CENTERS[0], units = SUBJECTS[0].units;
    const spots = units.map((u, j) => { const a = -3 + j * .46, rad = r * .78; return [cx + Math.cos(a) * rad * 1.1, cy + Math.sin(a) * rad * .92]; });
    const z = 2.25, tx = 620 - cx * z, ty = 560 - cy * z;
    return `<div class="bCam" id="cam" style="transform:translate(${tx}px,${ty}px) scale(${z})"><img src="${drawWorld()}" alt="" style="position:absolute;inset:0;width:100%;height:100%">
      <svg viewBox="0 0 1920 1080" style="position:absolute;inset:0;width:100%;height:100%" aria-hidden="true"><polyline points="${spots.map((p) => p.join(',')).join(' ')}" fill="none" stroke="#fff" stroke-width="2.4" stroke-dasharray="1 7" stroke-linecap="round"/></svg>
      ${units.map((u, j) => `<i class="bPlace ${j === 9 ? 'now' : ''}" style="left:${spots[j][0]}px;top:${spots[j][1]}px"></i><span class="bPlaceLabel" style="left:${spots[j][0] + 11}px;top:${spots[j][1] - 7}px">${esc(u[1])}</span>`).join('')}</div>
      <aside class="bToday"><small>You are here, in Science</small><h2>The human skeleton</h2><p>Lesson 1 of 4. Starter quiz done. Next, the episode.</p><button data-first>Start the episode</button></aside>
      <button class="bBack" data-screen="year">See the whole year</button>`;
  },
  cover() { return ''; }, question() { return ''; }, list() { return ''; },
};

/* ---------- Motion: one entrance for each world ---------- */
function enter() {
  const q = (s) => stage.querySelector(s);
  if (R.dir === 'A' && R.screen === 'cover') {
    gsap.timeline()
      .from('#mast', { y: 90, opacity: 0, duration: .7, ease: 'power3.out' })
      .from('#fig', { y: 600, duration: 1, ease: 'back.out(1.1)' }, .1)
      .from('#deck', { x: -50, opacity: 0, duration: .5 }, .55)
      .from('#stick', { scale: 0, rotation: -60, duration: .6, ease: 'back.out(2.2)' }, .85);
  } else if (R.dir === 'A' && R.screen === 'today') {
    gsap.from('.aDisk', { scale: .4, duration: .8, ease: 'back.out(1.5)' });
    gsap.from('.aTodayFig', { y: 500, duration: .9, ease: 'back.out(1.1)', delay: .05 });
    gsap.from('.aTab', { x: 140, duration: .45, stagger: .04, ease: 'power3.out', delay: .2 });
  } else if (R.dir === 'A' && R.screen === 'year') {
    gsap.from('.aTile', { scaleY: 0, transformOrigin: '50% 100%', duration: .35, stagger: { amount: .9, from: 'start' }, ease: 'power3.out', clearProps: 'all' });
  } else if (R.dir === 'A' && R.screen === 'question') {
    gsap.from('#figBox', { x: -500, duration: .7, ease: 'power3.out' });
    gsap.from('.pinQ', { scale: 0, duration: .4, stagger: .1, delay: .5, ease: 'back.out(2.4)', clearProps: 'scale' });
  } else if (R.dir === 'C') {
    if (q('#scan')) gsap.fromTo('#scan', { top: -170, opacity: 1 }, { top: 1080, duration: 1.9, ease: 'none', onComplete: () => gsap.set('#scan', { opacity: 0 }) });
    if (q('#fig')) gsap.fromTo('#fig', { clipPath: 'inset(0 0 100% 0)' }, { clipPath: 'inset(0 0 0% 0)', duration: 1.9, ease: 'none' });
    if (q('#fig')) gsap.to('#fig', { y: -18, duration: 5, ease: 'sine.inOut', repeat: -1, yoyo: true, delay: 2 });
    if (q('#mast')) gsap.from('#mast', { opacity: 0, letterSpacing: '40px', duration: 1.2, ease: 'power3.out' });
    if (q('.cHero')) gsap.from('.cHero > *', { opacity: 0, y: 30, duration: .6, stagger: .1, delay: .4 });
    if (q('.pinQ')) gsap.from('.pinQ', { scale: 0, duration: .4, stagger: .12, delay: 1.2, ease: 'back.out(2.4)', clearProps: 'scale' });
    if (R.screen === 'question') gsap.fromTo('#figBox img', { clipPath: 'inset(0 0 100% 0)' }, { clipPath: 'inset(0 0 0% 0)', duration: 1.6, ease: 'none' });
  } else if (R.dir === 'B' && R.screen === 'year') {
    gsap.from('#cam', { scale: 1.12, transformOrigin: '50% 50%', duration: 1.4, ease: 'power3.out' });
    gsap.from('.bRegion', { opacity: 0, scale: .5, duration: .5, stagger: .07, delay: .4, ease: 'back.out(2)', clearProps: 'opacity,scale' });
  } else if (R.dir === 'B' && R.screen === 'today') {
    gsap.from('.bToday', { x: 700, duration: .7, ease: 'power3.out', delay: .9 });
    const end = document.getElementById('cam').style.transform;
    gsap.fromTo('#cam', { transform: 'translate(0px, 0px) scale(1)' }, { transform: end, duration: 1.3, ease: 'power3.inOut' });
  }
}

/* ---------- Review bar and rendering ---------- */
const DIRS = { A: 'A: Encyclopedia', C: 'C: Cinematic', B: 'B: Big World' };
const SCREENS = { today: 'Today', year: 'Whole year', list: 'Year: all names', cover: 'Lesson cover', question: 'Test question' };
function drawBar() {
  const seg = (map, cur, attr, off = []) => `<div class="seg" role="group">${Object.entries(map).map(([k, t]) => `<button aria-pressed="${k === cur}" data-${attr}="${k}" ${off.includes(k) ? 'disabled' : ''}>${t}</button>`).join('')}</div>`;
  bar.innerHTML = `<b>Design round one</b>${seg(DIRS, R.dir, 'dir')}${seg(SCREENS, R.screen, 'screen', R.dir === 'B' ? ['list', 'cover', 'question'] : [])}`;
}
function fit() {
  const view = document.getElementById('view'), s = Math.min(view.clientWidth / 1920, view.clientHeight / 1080);
  stage.style.transform = `translate(${(view.clientWidth - 1920 * s) / 2}px, ${(view.clientHeight - 1080 * s) / 2}px) scale(${s})`;
}
function render() {
  gsap.killTweensOf('*');
  if (R.dir === 'B' && ['cover', 'question', 'list'].includes(R.screen)) R.screen = 'year';
  stage.className = R.dir;
  stage.innerHTML = { A, B, C }[R.dir][R.screen]();
  if (R.dir === 'A' && R.screen === 'year') A.showPick(R.pickS, R.pickU);
  if (R.dir === 'C' && R.screen === 'year') C.drawMetro();
  drawBar();
  stage.querySelector('[data-first]')?.focus({ preventScroll: true });
  if (!R.still) enter();
}
addEventListener('resize', fit);
document.addEventListener('click', (ev) => {
  const el = ev.target.closest('button');
  if (!el) return;
  const d = el.dataset;
  if (d.dir) { R.dir = d.dir; render(); }
  else if (d.screen) { R.screen = d.screen; render(); }
  else if (d.go) { R.screen = d.go; render(); }
  else if (d.pick) { const [s, u] = d.pick.split(':').map(Number); R.pickS = s; R.pickU = u; if (R.dir === 'C') { C.drawMetro(); stage.querySelector('[data-first]')?.focus(); } else A.showPick(s, u); }
  else if (d.line != null) { R.pickS = +d.line; R.pickU = 0; C.drawMetro(); stage.querySelector('[data-first]')?.focus(); }
  else if (d.region != null) { const i = +d.region; if (i === 0) { R.screen = 'today'; render(); } else { const [cx, cy] = CENTERS[i]; gsap.to('#cam', { x: 960 - cx * 1.8, y: 540 - cy * 1.8, scale: 1.8, duration: 1, ease: 'power3.inOut' }); document.getElementById('bt').textContent = `${SUBJECTS[i].name}: ${SUBJECTS[i].units.length} places, not built`; } }
  else if (d.pin) {
    const ok = d.pin === 'femur', box = document.getElementById('answer');
    stage.querySelectorAll('.pinQ').forEach((p) => p.classList.remove('wrong'));
    el.classList.add(ok ? 'right' : 'wrong');
    box.innerHTML = `<b class="${ok ? '' : 'no'}">${ok ? 'Yes! The femur.' : 'Not that one.'}</b>${ANSWERS[d.pin]}`;
    gsap.from(box, { y: 30, opacity: 0, duration: .4, ease: 'power3.out' });
    if (ok) { audio.right(); gsap.fromTo(el, { scale: 1 }, { scale: 1.35, duration: .25, yoyo: true, repeat: 1 }); if (stage.querySelector('#scan')) gsap.fromTo('#scan', { top: -170, opacity: 1 }, { top: 1080, duration: 1.1, ease: 'none', onComplete: () => gsap.set('#scan', { opacity: 0 }) }); } else { audio.wrong(); gsap.fromTo(el, { x: -8 }, { x: 0, duration: .4, ease: 'elastic.out(1,.3)' }); }
  }
});
/* Focus shows a unit's details; arrows move as a TV remote would. */
stage.addEventListener('focusin', (ev) => { const d = ev.target.dataset; if (R.dir === 'A' && R.screen === 'year' && d.pick) { const [s, u] = d.pick.split(':').map(Number); A.showPick(s, u); } });
stage.addEventListener('mouseover', (ev) => { const d = ev.target.dataset || {}; if (R.dir === 'A' && R.screen === 'year' && d.pick) { const [s, u] = d.pick.split(':').map(Number); A.showPick(s, u); } });
document.addEventListener('keydown', (ev) => {
  if (!['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(ev.key)) return;
  if (R.dir === 'C' && R.screen === 'year') {
    ev.preventDefault();
    if (ev.key === 'ArrowLeft') R.pickU = Math.max(0, R.pickU - 1);
    if (ev.key === 'ArrowRight') R.pickU = Math.min(SUBJECTS[R.pickS].units.length - 1, R.pickU + 1);
    if (ev.key === 'ArrowUp' || ev.key === 'ArrowDown') { R.pickS = Math.max(0, Math.min(SUBJECTS.length - 1, R.pickS + (ev.key === 'ArrowUp' ? -1 : 1))); R.pickU = Math.min(R.pickU, SUBJECTS[R.pickS].units.length - 1); }
    C.drawMetro(); stage.querySelector('[data-first]')?.focus(); return;
  }
  const items = [...stage.querySelectorAll('button:not(:disabled)')], cur = document.activeElement;
  if (!items.includes(cur)) { items[0]?.focus(); return; }
  const from = cur.getBoundingClientRect(), cx = from.left + from.width / 2, cy = from.top + from.height / 2;
  let best = null, bestScore = Infinity;
  items.forEach((it) => { if (it === cur) return; const r = it.getBoundingClientRect(), dx = r.left + r.width / 2 - cx, dy = r.top + r.height / 2 - cy, along = { ArrowRight: dx, ArrowLeft: -dx, ArrowDown: dy, ArrowUp: -dy }[ev.key], across = ev.key === 'ArrowLeft' || ev.key === 'ArrowRight' ? Math.abs(dy) : Math.abs(dx); if (along > 3) { const score = along + across * 3; if (score < bestScore) { bestScore = score; best = it; } } });
  if (best) { ev.preventDefault(); best.focus(); }
});
const hash = location.hash.slice(1).split('-');
if (DIRS[hash[0]]) R.dir = hash[0];
if (SCREENS[hash[1]]) R.screen = hash[1];
R.still = hash[2] === 'still';
fit(); render();
document.fonts?.ready.then(fit);
