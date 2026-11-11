/* The channel: home screen, episode player, reusable scene types and the test. Episode content lives in episodes/. */
const LANG = 'en';
/* The full school (videos, voice, QR codes) runs from our own server, at any address: home Wi-Fi, Tailscale (100.64 to 100.127, or a .ts.net name) or this Mac.
   Our server marks its pages with HS_LAN, so that alone is enough. The address list is a fallback for copies served some other way. */
const CAN_EMBED = 'HS_LAN' in window || /^(localhost|127\.|192\.168\.|10\.|172\.(1[6-9]|2\d|3[01])\.|100\.(6[4-9]|[7-9]\d|1[01]\d|12[0-7])\.|.*\.local$|.*\.ts\.net$|.*\.pages\.dev$)/.test(location.hostname);
const $ = (sel, root = document) => root.querySelector(sel);
const app = $('#app'), player = $('#player'), stage = $('#stage');
const State = { manifest: {}, credits: {}, captions: true };

const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const marked = (s) => esc(s).replace(/\*(.+?)\*/g, '<em>$1</em>');
const imgUrl = (name) => `assets/img/${name}`;

/* ---------- Skeleton drawing ---------- */
function L(d, w) { return `<path class="hit" d="${d}" stroke-width="${w + 10}"/><path class="o" d="${d}" stroke-width="${w + 3}"/><path class="b" d="${d}" stroke-width="${w}"/>`; }
function line(a, b, c, d, w) { return L(`M${a} ${b}L${c} ${d}`, w); }
function knob(x, y, r) { return `<circle class="fo" cx="${x}" cy="${y}" r="${r}"/>`; }
function skeletonSide() {
  const ribW = [30, 40, 46, 48, 48, 44, 38];
  const ribs = ribW.map((w, i) => { const y = 118 + i * 20; return L(`M118 ${y}C${118 - w * .6} ${y - 8} ${118 - w} ${y + 2} ${120 - w} ${y + 14}`, 5); }).join('');
  const fingers = [[35, 342], [42, 350], [50, 349], [57, 340]].map(([x, y]) => line(45, 310, x, y, 3)).join('') + line(52, 304, 66, 326, 3);
  const toes = [[66, 628], [74, 633], [83, 635], [92, 634], [100, 630]].map(([x, y]) => line(87, 602, x, y, 3)).join('');
  return `<g data-bone="clavicle">${L('M114 110Q94 102 72 112', 6)}</g><g data-bone="ribs">${ribs}</g>
  <g data-bone="humerus">${line(68, 120, 54, 206, 9)}${knob(69, 118, 9)}${knob(54, 208, 7)}</g>
  <g data-bone="forearm">${line(50, 216, 40, 294, 5)}${line(58, 216, 50, 294, 5)}</g>
  <g data-bone="hand">${knob(45, 304, 8)}${fingers}</g>
  <g data-bone="femur">${line(95, 342, 88, 448, 11)}${knob(96, 338, 9)}</g><g data-bone="patella">${knob(88, 460, 9)}</g>
  <g data-bone="shin">${line(85, 476, 84, 584, 8)}${line(98, 478, 96, 582, 4)}</g><g data-bone="foot">${knob(88, 596, 8)}${toes}</g>`;
}
function skeleton(hl = []) {
  let spine = '';
  for (let i = 0; i < 18; i++) spine += `<rect class="fo" x="113" y="${94 + i * 11}" width="14" height="9" rx="3"/>`;
  const svg = `<svg class="skel" viewBox="0 0 240 645" role="img" aria-label="Front view of a human skeleton"><g data-bone="spine">${spine}</g>
    <g>${skeletonSide()}</g><g transform="translate(240 0) scale(-1 1)">${skeletonSide()}</g><g data-bone="ribs">${line(120, 118, 120, 182, 9)}</g>
    <g data-bone="pelvis"><path class="fo" d="M120 296C96 282 72 288 76 316C79 336 104 342 120 334C136 342 161 336 164 316C168 288 144 282 120 296Z"/><ellipse class="dark" cx="100" cy="324" rx="7" ry="6"/><ellipse class="dark" cx="140" cy="324" rx="7" ry="6"/></g>
    <g data-bone="jaw"><path class="fo" d="M99 62Q102 90 120 91Q138 90 141 62Q130 72 120 72Q110 72 99 62Z"/></g>
    <g data-bone="skull"><ellipse class="fo" cx="120" cy="42" rx="31" ry="35"/><ellipse class="dark" cx="108" cy="42" rx="7.5" ry="8.5"/><ellipse class="dark" cx="132" cy="42" rx="7.5" ry="8.5"/><path class="dark" d="M120 52L115 62H125Z"/></g></svg>`;
  return svg.replace(/<g data-bone="(\w+)"/g, (m, b) => `<g data-bone="${b}"${hl.includes(b) || hl.includes('all') ? ' class="hl"' : ''}`);
}
function bodyShape(color) {
  const limb = (d, w) => `<path d="${d}" fill="none" stroke="${color}" stroke-width="${w}" stroke-linecap="round"/>`;
  return `<ellipse cx="120" cy="42" rx="40" ry="44" fill="${color}"/>${limb('M120 80V110', 34)}
    <path d="M56 104H184Q196 104 192 124L170 330Q168 348 150 348H90Q72 348 70 330L48 124Q44 104 56 104Z" fill="${color}"/>
    ${limb('M62 122L38 330', 34)}${limb('M178 122L202 330', 34)}${limb('M92 340L84 610', 52)}${limb('M148 340L156 610', 52)}${limb('M80 618L60 628', 30)}${limb('M160 618L180 628', 30)}`;
}

/* ---------- Sound effects, made in the browser so no audio files are needed ---------- */
const Sfx = {
  ctx: null,
  get() { try { this.ctx = this.ctx || new (window.AudioContext || window.webkitAudioContext)(); return this.ctx; } catch (e) { return null; } },
  tone(from, to, time, gain = .14, type = 'sine') {
    if (Sfx.silent) return;
    const c = this.get(); if (!c) return;
    const o = c.createOscillator(), g = c.createGain();
    o.type = type; o.frequency.setValueAtTime(from, c.currentTime); o.frequency.exponentialRampToValueAtTime(to, c.currentTime + time);
    g.gain.setValueAtTime(gain, c.currentTime); g.gain.exponentialRampToValueAtTime(.001, c.currentTime + time);
    o.connect(g).connect(c.destination); o.start(); o.stop(c.currentTime + time);
  },
  pop() { Sfx.tone(520, 180, .14); },
  ding() { Sfx.tone(880, 880, .5, .1); setTimeout(() => Sfx.tone(1320, 1320, .6, .08), 110); },
  buzz() { Sfx.tone(150, 110, .35, .12, 'sawtooth'); },
  splat() { Sfx.tone(240, 40, .5, .22, 'triangle'); },
  whoosh() {
    const c = Sfx.get(); if (!c) return;
    const size = c.sampleRate * .6, buf = c.createBuffer(1, size, c.sampleRate), data = buf.getChannelData(0);
    for (let i = 0; i < size; i++) data[i] = (Math.random() * 2 - 1) * Math.sin(Math.PI * i / size);
    const s = c.createBufferSource(), f = c.createBiquadFilter(), g = c.createGain();
    s.buffer = buf; f.type = 'bandpass'; f.frequency.setValueAtTime(400, c.currentTime); f.frequency.exponentialRampToValueAtTime(3200, c.currentTime + .5); g.gain.value = .12;
    s.connect(f).connect(g).connect(c.destination); s.start();
  },
};
/* A body with the places where each kind of muscle is found. Used in the muscles lesson and its test. */
function bodyMap() {
  const heart = 'M130 146c-9-13-27-5-20 10 4 9 14 17 20 24 6-7 16-15 20-24 7-15-11-23-20-10z';
  const gut = 'M92 226C126 212 158 222 150 240C142 256 96 244 92 262C88 280 150 266 152 286C154 306 96 294 96 314';
  return `<svg class="skel bodyMap" viewBox="0 0 240 645" role="img" aria-label="Outline of a body showing the arm, thigh, heart and intestines">${bodyShape('#6B6380')}
    <g data-bone="biceps"><ellipse class="fo" cx="50" cy="195" rx="17" ry="46" transform="rotate(8 50 195)"/></g><g data-bone="thigh"><ellipse class="fo" cx="88" cy="462" rx="24" ry="74"/></g>
    <g data-bone="heart"><path class="fo" d="${heart}"/></g><g data-bone="gut">${L(gut, 13)}</g></svg>`;
}
const LIB = window.LIB = { skeleton, bodyShape, bodyMap, sfx: Sfx, img: imgUrl };

/* ---------- Reusable scene types. Each builds its scene and returns a function called once per spoken line. ---------- */
const riseIn = (el, vars = {}) => gsap.from(el, { y: 70, opacity: 0, duration: .7, ease: 'power3.out', ...vars });
function creditLine(img) {
  const c = State.credits[img.replace(/\.\w+$/, '')];
  return c ? `<p class="credit">${esc(c.author.slice(0, 50))} · ${esc(c.license)}</p>` : '';
}
const Scenes = {
  title(el, s) {
    el.innerHTML = `<div class="col" style="left:96px;top:230px;width:1060px"><p class="eyebrow">${esc(s.eyebrow)}</p><h1 class="mega">${marked(s.title)}</h1></div>
      <img class="tilt" src="${imgUrl(s.img)}" alt="" style="right:110px;top:70px;height:800px;width:560px;object-fit:cover;object-position:50% 12%">`;
    Sfx.whoosh();
    gsap.from($('.mega', el), { x: -700, opacity: 0, duration: .9, ease: 'power4.out' });
    gsap.from($('.eyebrow', el), { y: -40, opacity: 0, duration: .5, delay: .3 });
    gsap.from($('img', el), { y: 1100, rotation: 18, duration: 1.1, ease: 'back.out(1.1)' });
    return () => {};
  },
  /* Chapter openings. Same fonts and colors, but no two in a row look alike. */
  chapter(el, s) {
    const looks = ['right', 'full', 'number', 'split', 'left', 'band'];
    const look = s.look || (s.bonus ? 'band' : looks[((s.n || 1) - 1) % looks.length]);
    const pill = `<p class="pill">${esc(s.label || `Chapter ${s.n}`)}</p>`, title = `<h1 class="huge">${esc(s.title)}</h1>`, src = imgUrl(s.poster);
    const words = () => { const h = $('.huge', el); h.innerHTML = esc(s.title).split(' ').map((w) => `<span class="w">${w}</span>`).join(' '); return $$('.w', h); };
    if (look === 'full') {
      el.style.color = '#FBFAFF';
      /* posterStill: for a diagram, which must not be zoomed past its edges or shaded over */
      el.innerHTML = `<img class="full" src="${src}" alt="" style="object-position:50% 25%"><div class="scrim" style="background:linear-gradient(0deg,#000E 0,#0009 ${s.posterStill ? '24%,#0000 41%' : '45%,#0000 75%'})"></div><div class="col" style="left:96px;bottom:190px;width:1500px">${pill}${title}</div>`;
      if (!s.posterStill) gsap.fromTo($('img', el), { scale: 1.25 }, { scale: 1.02, duration: 7, ease: 'power1.out' });
      gsap.from(words(), { y: 80, opacity: 0, duration: .6, stagger: .09, ease: 'power3.out', delay: .2 });
    } else if (look === 'number') {
      el.innerHTML = `<div class="chapNum">${s.n}</div><div class="col" style="left:760px;top:330px;width:1060px">${pill}${title}</div>`;
      gsap.from($('.chapNum', el), { scale: 3, opacity: 0, duration: .7, ease: 'back.out(1.6)' });
      gsap.from(words(), { x: 90, opacity: 0, duration: .5, stagger: .08, ease: 'power3.out', delay: .35 });
    } else if (look === 'split') {
      el.innerHTML = `<img class="chapSplit" src="${src}" alt=""><div class="col" style="left:1040px;top:300px;width:800px">${pill}<h1 class="huge" style="font-size:108px">${esc(s.title)}</h1></div>`;
      gsap.from($('img', el), { y: -1100, duration: .8, ease: 'power4.out' });
      gsap.from($('.col', el), { x: 400, opacity: 0, duration: .7, ease: 'power3.out', delay: .25 });
    } else if (look === 'left') {
      el.innerHTML = `<img class="tilt" src="${src}" alt="" style="left:90px;top:170px;width:520px;height:640px;object-fit:cover;object-position:50% 20%;transform:rotate(-3deg)"><div class="col" style="left:700px;top:300px;width:1120px">${pill}${title}</div>`;
      gsap.from($('img', el), { x: -800, rotation: -16, duration: .9, ease: 'power3.out' });
      gsap.from($('.col', el), { y: 60, opacity: 0, duration: .6, delay: .3 });
    } else if (look === 'band') {
      el.innerHTML = `<img class="chapBand" src="${src}" alt="" style="${s.posterPos ? `object-position:${s.posterPos}` : ''}"><div class="col" style="left:96px;right:96px;top:510px;justify-items:center;text-align:center">${pill}${title}</div>`;
      gsap.fromTo($('img', el), { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: .9, ease: 'power3.inOut' });
      gsap.from($('.col', el), { scale: .86, opacity: 0, duration: .6, ease: 'back.out(1.6)', delay: .35 });
    } else {
      el.innerHTML = `<div class="col" style="left:96px;top:300px;width:1090px">${pill}${title}</div><img class="tilt" src="${src}" alt="" style="right:90px;top:170px;width:520px;height:640px;object-fit:cover;object-position:50% 20%">`;
      gsap.from($('.pill', el), { scale: 0, duration: .5, ease: 'back.out(2)', delay: .2 });
      gsap.from($('.huge', el), { x: -500, opacity: 0, duration: .8, ease: 'power4.out', delay: .1 });
      gsap.from($('img', el), { x: 800, rotation: 16, duration: .9, ease: 'power3.out' });
      gsap.to($('img', el), { scale: 1.07, duration: 8, ease: 'none', delay: .9 });
    }
    return () => {};
  },
  statement(el) {
    el.innerHTML = '<h1 class="mega center" id="said"></h1>';
    const said = $('#said', el);
    return (i, beat) => {
      said.innerHTML = marked(beat.text).split(' ').map((w) => `<span class="w">${w}</span>`).join(' ');
      gsap.from($$('.w', said), { y: 90, opacity: 0, rotation: 4, duration: .55, stagger: .08, ease: 'back.out(1.6)' });
    };
  },
  photo(el, s) {
    el.innerHTML = `<img class="full" src="${imgUrl(s.img)}" alt=""><div class="scrim"></div><h1 class="big" id="said" style="position:absolute;left:96px;right:96px;bottom:190px"></h1>${creditLine(s.img)}`;
    const img = $('img', el), said = $('#said', el);
    return (i, beat) => {
      said.innerHTML = marked(beat.text); riseIn(said);
      const [x, y, zoom] = beat.focus;
      gsap.to(img, { scale: zoom, x: (50 - x) / 100 * 1920 * zoom, y: (50 - y) / 100 * 1080 * zoom, duration: i ? 5 : 9, ease: 'sine.inOut' });
      if (beat.gray) gsap.set(img, { filter: 'grayscale(1) brightness(.8)' });
      if (beat.warm) gsap.to(img, { filter: 'grayscale(0) sepia(1) hue-rotate(-30deg) saturate(3)', duration: 1.2 });
    };
  },
  number(el, s) {
    el.innerHTML = `<div style="position:absolute;${s.flip ? 'left:760px;width:1060px' : 'left:96px;width:1100px'};top:240px"><div class="giant tab" id="num">0</div><p class="sub" id="sub"></p></div>
      <img class="tilt" src="${imgUrl(s.img)}" alt="" style="${s.flip ? 'left:110px;transform:rotate(-3deg)' : 'right:110px'};top:90px;height:760px;width:520px;object-fit:cover;object-position:50% 10%">${creditLine(s.img)}`;
    gsap.from($('img', el), { x: s.flip ? -800 : 800, rotation: s.flip ? -10 : 10, duration: 1, ease: 'power3.out' });
    const num = $('#num', el), sub = $('#sub', el), val = { v: 0 };
    return (i, beat) => {
      if (beat.sub) { sub.textContent = beat.sub; gsap.fromTo(sub, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: .5 }); }
      if (beat.to != null) {
        val.v = beat.from;
        gsap.to(val, { v: beat.to, duration: 1.5, ease: 'power2.out', onUpdate: () => { num.textContent = Math.round(val.v); }, onComplete: Sfx.pop });
      }
    };
  },
  guess(el, s) {
    const letters = 'ABCD';
    el.innerHTML = `<h1 class="big" style="position:absolute;left:96px;top:104px;width:1500px">${esc(s.question)}</h1>
      <div class="guessOpts">${s.options.map((o, k) => `<div class="guessOpt" data-k="${k}"><b>${letters[k]}</b><span>${esc(o)}</span></div>`).join('')}</div>
      <div class="timer" id="timer" style="opacity:0">5</div>
      <figure class="reveal" style="opacity:0"><img src="${imgUrl(s.img)}" alt=""><figcaption>${esc(s.imgCaption || '')}</figcaption></figure>${creditLine(s.img)}`;
    gsap.from($$('.guessOpt', el), { x: -700, opacity: 0, duration: .55, stagger: .1, ease: 'power3.out', delay: .4 });
    const timer = $('#timer', el), fig = $('.reveal', el);
    return (i, beat) => {
      if (beat.step === 'count') {
        const n = { v: Math.ceil(beat.hold || 5) };
        timer.textContent = n.v;
        gsap.fromTo(timer, { opacity: 0, scale: .4 }, { opacity: 1, scale: 1, duration: .3, ease: 'back.out(2)' });
        gsap.to(n, { v: 0, duration: beat.hold || 5, delay: 1, ease: 'none', onUpdate: () => { timer.textContent = Math.ceil(n.v); } });
      }
      if (beat.step === 'reveal') {
        gsap.to(timer, { opacity: 0, duration: .2 }); Sfx.ding();
        $$('.guessOpt', el).forEach((o, k) => {
          if (k === s.answer) { o.classList.add('right'); gsap.fromTo(o, { scale: 1 }, { scale: 1.06, duration: .3, yoyo: true, repeat: 1 }); }
          else gsap.to(o, { opacity: .3, duration: .3 });
        });
        gsap.fromTo(fig, { opacity: 0, x: 500, rotation: 8 }, { opacity: 1, x: 0, rotation: 2, duration: .8, ease: 'power3.out' });
      }
      if (beat.step === 'image') gsap.to($('img', fig), { scale: 1.18, duration: 5, ease: 'sine.inOut' });
    };
  },
  atlas(el, s) {
    const W = 660, H = W * (s.ratio || 2103 / 1280);
    el.innerHTML = `<div class="atlasView"><img id="plate" src="${imgUrl(s.img)}" alt="" style="width:${W}px;height:${H}px"></div>
      <div class="atlasDot"></div><div class="atlasLine"></div>
      <div class="atlasCard"><p class="plateLabel">${esc(s.plate)}</p><h1 class="atlasName" id="nm"></h1><div class="atlasCount tab" id="ct"></div><p class="atlasFact" id="fact"></p></div>${creditLine(s.img)}`;
    const plate = $('#plate', el), dot = $('.atlasDot', el), rule = $('.atlasLine', el);
    gsap.set(plate, { transformOrigin: '0 0', x: 200, y: 0, scale: 1080 / H * .98 });
    gsap.to(dot, { scale: 1.5, duration: .6, repeat: -1, yoyo: true, ease: 'sine.inOut' });
    return (i, beat) => {
      const [mx, my] = beat.mark, z = beat.zoom;
      gsap.to(plate, { x: 560 - mx / 100 * W * z, y: 450 - my / 100 * H * z, scale: z, duration: 1.3, ease: 'power3.inOut' });
      gsap.fromTo(rule, { scaleX: 0 }, { scaleX: 1, transformOrigin: '0 50%', duration: .5, delay: .9, ease: 'power2.out' });
      gsap.set(dot, { opacity: 1 });
      $('#nm', el).textContent = beat.name; $('#fact', el).textContent = beat.fact; $('#ct', el).textContent = beat.count || '';
      gsap.fromTo([$('#nm', el), $('#ct', el), $('#fact', el)], { x: 60, opacity: 0 }, { x: 0, opacity: 1, duration: .5, stagger: .1, delay: 1.1, ease: 'power3.out', onStart: Sfx.pop });
    };
  },
  cards(el, s) {
    el.innerHTML = `<h1 class="big" style="position:absolute;left:96px;top:104px;width:1720px">${esc(s.heading)}</h1>
      <div class="cardRow">${s.cards.map((c) => `<div class="tvCard" style="opacity:0">${ICONS[c.icon] || ''}<h2>${esc(c.title)}</h2><p>${esc(c.text)}</p></div>`).join('')}</div>
      <p class="footerPill" style="opacity:0">${esc(s.footer || '')}</p>`;
    return (i, beat) => {
      if (beat.card != null) { Sfx.pop(); gsap.fromTo($$('.tvCard', el)[beat.card], { y: 120, opacity: 0, rotation: -3 }, { y: 0, opacity: 1, rotation: 0, duration: .7, ease: 'back.out(1.5)' }); }
      if (beat.footer) gsap.fromTo($('.footerPill', el), { scale: .5, opacity: 0 }, { scale: 1, opacity: 1, duration: .6, ease: 'back.out(2)' });
    };
  },
  recap(el, s) {
    el.innerHTML = `<h1 class="big" style="position:absolute;left:96px;top:104px">${esc(s.heading)}</h1>
      <div class="recapList">${s.items.map((t, k) => `<div class="recapItem" style="opacity:0"><b>${k + 1}</b>${esc(t)}</div>`).join('')}</div>`;
    return (i) => { if (i === 0) gsap.fromTo($$('.recapItem', el), { x: -600, opacity: 0 }, { x: 0, opacity: 1, duration: .5, stagger: .95, ease: 'power3.out', onStart: Sfx.pop }); };
  },
  video(el, s) {
    el.style.color = '#FBFAFF';
    el.innerHTML = `<img class="full" alt="" src="https://i.ytimg.com/vi/${esc(s.youtube)}/hqdefault.jpg" onerror="this.onerror=null;this.src='${imgUrl(s.still)}'" style="object-position:50% 50%;filter:brightness(.55)"><div style="position:absolute;left:96px;top:130px;width:1500px"><p class="pill">Watch this</p><h1 class="big" style="margin-top:32px">${esc(s.videoTitle)}</h1>
      <p class="sub" style="margin-top:18px">${esc(s.channel)}</p><div class="watchFor" style="background:var(--yellow);color:var(--plum)"><b>Watch for</b>${esc(s.watchFor)}</div></div>`;
    gsap.fromTo($('img', el), { scale: 1.15 }, { scale: 1, duration: 8, ease: 'none' });
    riseIn($('.watchFor', el), { delay: .5 });
    return () => {};
  },
  art(el, s) {
    const job = s.layout === 'job';
    el.innerHTML = job
      ? `<div class="jobText"><p class="pill">${s.job ? `Job ${s.job} of 5` : esc(s.eyebrow || '')}</p><h1 class="huge">${esc(s.word)}</h1><p class="jobLine" id="said"></p></div><div class="artBox"></div>`
      : '<div class="artFull"></div>';
    if (s.flip) el.classList.add('flipJob');
    const box = $(job ? '.artBox' : '.artFull', el);
    const draw = window.ART[s.art](box, LIB);
    if (job) { gsap.from($('.huge', el), { x: s.flip ? 500 : -500, opacity: 0, duration: .7, ease: 'power4.out' }); gsap.from(box, { opacity: 0, x: s.flip ? -200 : 200, duration: .7, ease: 'power3.out' }); }
    const said = $('#said', el);
    return (i, beat) => {
      if (beat.text && said) { said.innerHTML = marked(beat.text); gsap.fromTo(said, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: .45 }); }
      const head = $('.headline', el);
      if (beat.text && head) { head.innerHTML = marked(beat.text); gsap.fromTo(head, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: .45 }); }
      draw(i, beat);
    };
  },
};
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
const ICONS = {
  seat: '<svg viewBox="0 0 200 180" class="ico"><path d="M30 118C30 66 66 44 100 62C134 44 170 66 170 118C170 150 130 160 100 142C70 160 30 150 30 118Z" fill="#D42A20" stroke="#17131F" stroke-width="8"/></svg>',
  ear: '<svg viewBox="0 0 200 180" class="ico"><path d="M62 72C62 30 142 26 146 76C148 112 108 112 106 142C104 166 72 164 70 142" fill="none" stroke="#17131F" stroke-width="16" stroke-linecap="round"/><circle cx="104" cy="82" r="10" fill="#D42A20"/></svg>',
  beat: '<svg viewBox="0 0 200 180" class="ico"><path d="M100 164C44 118 18 88 28 56C38 22 84 22 100 58C116 22 162 22 172 56C182 88 156 118 100 164Z" fill="#D42A20" stroke="#17131F" stroke-width="8"/></svg>',
  egg: '<svg viewBox="0 0 200 180" class="ico"><path d="M100 14C60 14 40 74 40 108C40 146 66 168 100 168C134 168 160 146 160 108C160 74 140 14 100 14Z" fill="#fff" stroke="#17131F" stroke-width="8"/><circle cx="100" cy="108" r="30" fill="#FFC400"/></svg>',
  moon: '<svg viewBox="0 0 200 180" class="ico"><path d="M126 18C80 26 50 62 54 104C58 146 100 172 140 158C104 150 82 124 82 90C82 60 100 34 126 18Z" fill="#1D4ED8" stroke="#17131F" stroke-width="8"/></svg>',
  jump: '<svg viewBox="0 0 200 180" class="ico"><circle cx="100" cy="28" r="22" fill="#D42A20"/><path d="M100 54V110M100 70L58 44M100 70L142 44M100 110L68 150M100 110L132 150" stroke="#17131F" stroke-width="14" stroke-linecap="round" fill="none"/><path d="M50 172H150" stroke="#17131F" stroke-width="8" stroke-dasharray="4 16" stroke-linecap="round"/></svg>',
  milk: '<svg viewBox="0 0 200 180" class="ico"><path d="M72 10H128V36L146 66V170H54V66L72 36Z" fill="#fff" stroke="#17131F" stroke-width="8" stroke-linejoin="round"/><rect x="54" y="92" width="92" height="44" fill="#1D4ED8"/><text x="100" y="124" text-anchor="middle" font-size="30" font-weight="800" font-family="Bricolage Grotesque,Arial" fill="#fff">Ca</text></svg>',
  sun: '<svg viewBox="0 0 200 180" class="ico"><circle cx="100" cy="90" r="46" fill="#D42A20"/><g stroke="#17131F" stroke-width="12" stroke-linecap="round"><path d="M100 10V26M100 154V170M20 90H36M164 90H180M43 33L55 45M145 135L157 147M43 147L55 135M145 45L157 33"/></g></svg>',
};

/* ---------- Player ---------- */
const SILENT_CLIP = 'data:audio/wav;base64,UklGRrQBAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YZABAACAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA';
const P = { ep: null, index: 0, token: 0, paused: false, audio: new Audio(), uiTimer: 0, yt: null, ytResolve: null };
P.audio.preload = 'auto';
gsap.ticker.lagSmoothing(0); // Keep motion on real time, so it stays with the voice on slow TV browsers.

function fitStage() {
  const s = Math.min(innerWidth / 1920, innerHeight / 1080);
  stage.style.transform = `translate(${(innerWidth - 1920 * s) / 2}px, ${(innerHeight - 1080 * s) / 2}px) scale(${s})`;
}
addEventListener('resize', fitStage);

function killAll() { gsap.globalTimeline.clear(); gsap.globalTimeline.resume(); }
/* Play speed, like YouTube. It's remembered on this device. The voice keeps its pitch, and pictures and pauses follow the same speed. */
const SPEEDS = [1, 1.25, 1.5, 2, 0.75];
let speed = 1;
try { const saved = +localStorage.getItem('hs-speed'); if (SPEEDS.includes(saved)) speed = saved; } catch (e) { /* Normal speed is fine. */ }
function applySpeed(on = true) {
  const rate = on ? speed : 1;
  gsap.globalTimeline.timeScale(rate);
  P.audio.defaultPlaybackRate = rate; P.audio.playbackRate = rate;
  try { P.yt?.setPlaybackRate?.(rate); } catch (e) { /* A video that can't change speed just plays normally. */ }
  const btn = $('#btnSpeed');
  if (btn) { btn.textContent = `${speed}×`; btn.setAttribute('aria-label', `Play speed: ${speed === 1 ? 'normal' : `${speed} times`}. Press to change`); }
}
function nextSpeed() {
  speed = SPEEDS[(SPEEDS.indexOf(speed) + 1) % SPEEDS.length];
  try { localStorage.setItem('hs-speed', speed); } catch (e) { /* It just won't be remembered. */ }
  applySpeed(); revealUI();
  hudToast(speed === 1 ? 'Normal speed' : `Speed ${speed}×`);
}
const wait = (s) => new Promise((resolve) => gsap.delayedCall(s, resolve));

function speak(id, beat, offset = 0) {
  const entry = State.manifest[id];
  const estimate = beat.say.split(' ').length / 2.6 + .3;
  return new Promise((resolve) => {
    let done = false;
    const finish = () => { if (!done) { done = true; timer.kill(); resolve(); } };
    const timer = gsap.delayedCall((entry ? entry.seconds - offset + 1.5 : estimate), finish);
    if (!entry) return;
    P.audio.onended = finish;
    P.audio.onerror = () => { window.Store.log('voice', { ep: P.ep?.id, clip: id, did: 'failed' }); timer.kill(); gsap.delayedCall(estimate, finish); hudToast('This voice clip didn’t load'); };
    P.audio.src = `assets/voice/${LANG}/${id}.mp3`;
    P.audio.playbackRate = speed;
    P.audio.addEventListener('loadedmetadata', () => { P.audio.playbackRate = speed; }, { once: true });
    if (offset) P.audio.addEventListener('loadedmetadata', () => { P.audio.currentTime = offset; }, { once: true });
    /* Some browsers block sound until you tap. Say so, and start it on the next tap or key. */
    P.audio.play().catch((err) => {
      if (err.name !== 'NotAllowedError') return;
      hudToast('Sound is blocked. Tap the screen to turn it on');
      const retry = () => { if (!P.paused) P.audio.play().catch(() => {}); };
      addEventListener('pointerdown', retry, { once: true }); addEventListener('keydown', retry, { once: true });
    });
  });
}
/* Word help: a second language for key words, shown in a corner while the word is said. Off unless a parent turns it on,
   so English lessons stay exactly as they are. Word lists are checked by us before they ship, never by parents. See docs/product/LANGUAGES.md. */
function wordHelp(ep = P.ep) {
  const S = window.Store, L = S.data.languages || {}, kid = S.currentKid();
  const lang = (kid?.wordHelp && kid.wordHelp !== 'family' ? kid.wordHelp : L.wordHelp) || 'off', key = `${lang}/${ep?.id}`;
  const list = window.KEYWORDS?.[lang]?.[ep?.id];
  if (lang === 'off' || !list) return null;
  const fixes = L.fixes?.[key] || {};
  return { lang, words: list.map(([en, es]) => ({ en, forms: en.split('|'), es: fixes[en] || es })) };
}
window.wordHelp = wordHelp;
/* The key words in one spoken line, longest first, so "red blood cells" wins over "blood cells". Two at most. */
function wordsIn(text, wh) {
  const line = ` ${text.toLowerCase().replace(/[^\p{L}' ]/gu, ' ').replace(/\s+/g, ' ')} `;
  const found = wh.words.filter((w) => w.forms.some((f) => line.includes(` ${f} `)));
  return found.filter((w) => !found.some((o) => o !== w && o.forms.some((of) => w.forms.some((f) => of !== f && of.includes(f))))).slice(0, 2);
}
/* Spoken word help: each key word is recorded once (tools/voice/word-help.mjs builds the same clip name). The end screen reads the list
   aloud, each word lighting up as it's said, and a tap on any word plays it again. Only clips that were recorded are played. */
const wordClipId = (lesson, en) => `${lesson}-wh-es-${en.split('|')[0].toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}`;
const wordVoice = new Audio();
function sayWord(id) {
  return new Promise((done) => {
    if (!State.manifest[id]) return done();
    wordVoice.onended = wordVoice.onerror = done;
    wordVoice.src = `assets/voice/${LANG}/${id}.mp3`;
    wordVoice.play().catch(done);
    setTimeout(done, ((State.manifest[id].seconds || 2) + 1) * 1000);
  });
}
let wordsToken = 0;
async function readWords(box) {
  const token = ++wordsToken;
  for (const btn of box.querySelectorAll('[data-whsay]')) {
    if (token !== wordsToken || !box.isConnected) return;
    btn.classList.add('on'); btn.scrollIntoView({ block: 'nearest' });
    await sayWord(btn.dataset.whsay);
    btn.classList.remove('on');
    await new Promise((r) => setTimeout(r, 350));
  }
}
document.addEventListener('click', (ev) => {
  const btn = ev.target.closest('[data-whsay]'); if (!btn) return;
  wordsToken++; document.querySelectorAll('[data-whsay].on').forEach((b) => b.classList.remove('on'));
  btn.classList.add('on'); sayWord(btn.dataset.whsay).then(() => btn.classList.remove('on'));
});
function showWordHelp(beat) {
  const box = $('#wordHelp'), wh = wordHelp();
  const words = wh ? wordsIn(`${beat.say || ''} ${(beat.text || '').replace(/\*/g, '')}`, wh) : [];
  box.innerHTML = words.map((w) => `<div><b lang="${wh.lang}">${esc(w.es)}</b><small>${esc(w.forms[0])}</small></div>`).join('');
  box.hidden = !words.length;
}
function showCaption(text) {
  const c = $('#caption');
  c.textContent = text;
  c.hidden = !State.captions;
  placeCaption();
  /* GSAP owns the whole transform here. Leaving the centering to CSS sets each line off-center. */
  gsap.fromTo(c, { opacity: 0, y: 12, x: 0, xPercent: -50 }, { opacity: 1, y: 0, x: 0, xPercent: -50, duration: .25 });
}
function mount(scene) {
  const old = $('.scene', stage);
  if (old) old.remove();
  const el = document.createElement('div');
  el.className = `scene type-${scene.type}`;
  el.style.background = scene.bg;
  el.style.color = scene.fg || '#FBFAFF';
  if (scene.fg) el.style.setProperty('--em', '#B3201A');
  stage.prepend(el);
  return Scenes[scene.type](el, scene);
}
/* The big transition is kept for chapter changes, in a different direction each time. Inside a chapter, scenes change quietly. */
function wipe(swap, kind = 0) {
  const a = $('#wipeA'), b = $('#wipeB');
  Sfx.whoosh();
  const paths = [
    [{ x: -3300, y: 0 }, { x: -300, y: 0 }, { x: 2500, y: 0 }],
    [{ x: 2500, y: 0 }, { x: -300, y: 0 }, { x: -3300, y: 0 }],
    [{ x: -300, y: -1300 }, { x: -300, y: 0 }, { x: -300, y: 1300 }],
    [{ x: -300, y: 1300 }, { x: -300, y: 0 }, { x: -300, y: -1300 }],
  ];
  const [from, mid, to] = paths[kind % paths.length];
  return new Promise((resolve) => {
    gsap.timeline({ onComplete: () => { gsap.set([a, b], { x: -3300, y: 0 }); resolve(); } })
      .set([a, b], from)
      .to(a, { ...mid, duration: .32, ease: 'power3.in' }, 0).to(b, { ...mid, duration: .32, ease: 'power3.in' }, .06)
      .call(swap, null, .4)
      .to(a, { ...to, duration: .36, ease: 'power3.out' }, .42).to(b, { ...to, duration: .36, ease: 'power3.out' }, .46);
  });
}
function changeScene(scene, swap) {
  const chapters = P.ep.scenes.slice(0, P.index + 1).filter((s) => s.type === 'chapter').length;
  if (scene.type === 'chapter' || P.index === 0 || scene.type === 'title') return wipe(swap, chapters);
  swap();
  const el = $('.scene', stage);
  gsap.fromTo(el, { opacity: 0 }, { opacity: 1, duration: .3, ease: 'none' });
  return wait(.2);
}
/* Remembers each lesson's place on this device, so Back never loses it. */
const placeKey = (id) => `hs-place-${id}`;
function savePlace(id, index) { try { if (index > 0) localStorage.setItem(placeKey(id), index); else localStorage.removeItem(placeKey(id)); } catch (e) {} }
function savedPlace(ep) { try { const n = +localStorage.getItem(placeKey(ep.id)); return n > 0 && n < ep.scenes.length ? n : 0; } catch (e) { return 0; } }
/* Jumps to an exact moment: draws the scene's earlier beats at once, then speaks from that point in the clip. */
async function runFrom(index, seek = null) {
  const token = ++P.token;
  killAll(); P.audio.pause(); closeVideo();
  P.paused = false; P.beat = 0; updateControls();
  gsap.ticker.remove(tickProgress); gsap.ticker.add(tickProgress);
  const scenes = P.ep.scenes;
  for (let n = index; n < scenes.length; n++) {
    P.index = n; updateChapterBar(); savePlace(P.ep.id, n);
    const scene = scenes[n];
    if (scene.type === 'video' && !CAN_EMBED) continue;
    let drive;
    const jump = seek && n === index ? seek : null;
    if (jump) { drive = mount(scene); $('#caption').hidden = true; } else await changeScene(scene, () => { drive = mount(scene); $('#caption').hidden = true; });
    if (token !== P.token) return;
    if (jump) {
      Sfx.silent = true;
      for (let i = 0; i < jump.beat; i++) drive(i, scene.beats[i]);
      Sfx.silent = false;
      gsap.globalTimeline.getChildren(true, true, false).forEach((t) => { if (!(t.repeat && t.repeat() === -1)) t.progress(1); });
    }
    for (let i = jump?.beat || 0; i < scene.beats.length; i++) {
      const beat = scene.beats[i];
      P.beat = i;
      drive(i, beat); showCaption(beat.say); showWordHelp(beat);
      await speak(`${scene.id}-${i}`, beat, jump && i === jump.beat ? jump.offset : 0);
      if (token !== P.token) return;
      await wait(beat.hold ?? .3);
      if (token !== P.token) return;
    }
    if (scene.type === 'video') { await playVideo(scene); if (token !== P.token) return; }
  }
  savePlace(P.ep.id, 0);
  P.finished = true; window.Store.log('lesson', { ep: P.ep.id, did: 'finished' });
  window.Store.markWatched(P.ep.id);
  startTest();
}
function togglePause() {
  if ($('#testBox') || P.yt) return;
  P.paused = !P.paused;
  if (P.paused) { gsap.globalTimeline.pause(); P.audio.pause(); } else { gsap.globalTimeline.resume(); if (P.audio.src && !P.audio.ended) P.audio.play().catch(() => {}); }
  updateControls(); revealUI();
  showBigIcon(P.paused ? ICON_PAUSE : ICON_PLAY);
}
const ICON_PLAY = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 4.5v15L20 12z"/></svg>';
const ICON_PAUSE = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.5 4.5h4v15h-4zM13.5 4.5h4v15h-4z"/></svg>';
function updateControls() {
  const play = $('#btnPlay');
  play.innerHTML = P.paused ? ICON_PLAY : ICON_PAUSE;
  play.setAttribute('aria-label', P.paused ? 'Play' : 'Pause');
  $('#btnCaps').setAttribute('aria-pressed', State.captions);
  player.classList.toggle('paused', P.paused);
}
const clock = (t) => `${Math.floor(t / 60)}:${String(Math.floor(t % 60)).padStart(2, '0')}`;
/* When each scene starts, in spoken seconds. Videos inside a lesson don't count toward the time. */
function lessonTimes(ep) {
  if (ep._times) return ep._times;
  let t = 0;
  const lens = ep.scenes.map((s) => (s.type === 'video' && !CAN_EMBED ? 0 : s.beats.reduce((sum, b, i) => sum + (State.manifest[`${s.id}-${i}`]?.seconds ?? b.say.split(' ').length / 2.6) + (b.hold ?? .3), .6)));
  const starts = lens.map((l) => { const at = t; t += l; return at; });
  ep._times = { starts, lens, total: t };
  return ep._times;
}
const chapterStarts = () => P.ep.scenes.map((s, i) => (i === 0 || s.chapter !== P.ep.scenes[i - 1].chapter ? i : -1)).filter((i) => i >= 0);
function jumpChapter(dir) {
  const starts = chapterStarts();
  let at = starts.filter((i) => i <= P.index).length - 1;
  if (dir > 0 && at === starts.length - 1) { hudToast('This is the last chapter'); return; }
  at = Math.max(0, at + dir);
  runFrom(starts[at]);
  if (player.classList.contains('ui')) revealUI();
  else hudToast(P.ep.scenes[starts[at]].chapter);
}
/* Chapter marks are sized by their real length. */
function updateChapterBar() {
  const starts = chapterStarts(), { lens } = lessonTimes(P.ep), scenes = P.ep.scenes;
  const sig = `${P.ep.id}:${starts.length}`;
  const bar = $('#bar');
  if (bar.dataset.sig !== sig) {
    bar.dataset.sig = sig;
    bar.innerHTML = starts.map((s, k) => {
      const end = starts[k + 1] ?? scenes.length, len = lens.slice(s, end).reduce((a, b) => a + b, 0);
      return `<div class="seg ${scenes[s].bonus ? 'bonus' : ''}" style="flex:${Math.max(len, 1)} 1 0" data-from="${s}" data-to="${end}"><i></i></div>`;
    }).join('');
    $('#chapterDrawer').innerHTML = starts.map((s) => {
      const sc = scenes[s], src = sc.poster || sc.img || sc.still || P.ep.hero;
      return `<button data-f data-go="${s}"><img src="${imgUrl(src)}" alt="" loading="lazy"><b>${esc(sc.title && sc.type !== 'title' ? sc.title : sc.chapter)}</b><small>${clock(lessonTimes(P.ep).starts[s])}</small></button>`;
    }).join('');
    $('#hudSeries').textContent = `${P.ep.series.replace(' · ', ', ')}, ${P.ep.lessonLabel}`;
    $('#hudTitle').textContent = P.ep.title;
  }
  const sc = scenes[P.index];
  $('#hudChapter').textContent = sc.chapter;
  $$('#chapterDrawer button').forEach((b) => { const s = +b.dataset.go, nxt = starts[starts.indexOf(s) + 1] ?? scenes.length; b.classList.toggle('on', P.index >= s && P.index < nxt); });
}
/* Where the lesson is now, in spoken seconds. */
function lessonNow() {
  const { starts } = lessonTimes(P.ep), scene = P.ep.scenes[P.index];
  let t = starts[P.index];
  for (let i = 0; i < P.beat; i++) t += (State.manifest[`${scene.id}-${i}`]?.seconds ?? 0) + (scene.beats[i]?.hold ?? .3);
  return t + Math.min(P.audio.currentTime || 0, State.manifest[`${scene.id}-${P.beat}`]?.seconds ?? 0);
}
function skipBy(seconds) {
  const { total } = lessonTimes(P.ep), { n, beat, offset } = placeAtTime(Math.max(0, Math.min(total - .5, lessonNow() + seconds)));
  closeChapters(); runFrom(n, { beat, offset }); revealUI();
  hudToast(seconds > 0 ? 'Forward 10 seconds' : 'Back 10 seconds');
}
/* The red line moves with the voice. */
function tickProgress() {
  if (!P.ep || player.hidden || !player.classList.contains('ui')) return;
  const { starts, total } = lessonTimes(P.ep), scene = P.ep.scenes[P.index]; if (!scene) return;
  const t = lessonNow();
  $$('#bar .seg').forEach((seg) => {
    const a = starts[+seg.dataset.from], b = +seg.dataset.to < starts.length ? starts[+seg.dataset.to] : total;
    seg.firstChild.style.width = `${Math.max(0, Math.min(1, (t - a) / (b - a || 1))) * 100}%`;
  });
  $('#hudTime').textContent = `${clock(t)} / ${clock(total)}`;
}
function placeCaption() {
  const c = $('#caption'), st = stage.getBoundingClientRect(), s = st.width / 1920 || 1, ui = player.classList.contains('ui');
  /* Clear the controls themselves, not the empty fade above them. Layout sizes, so the bar's slide-in doesn't change the answer. */
  const hud = $('.hudBottom'), controls = hud.offsetHeight - parseFloat(getComputedStyle(hud).paddingTop);
  const overlap = st.bottom - (player.getBoundingClientRect().bottom - controls);
  const bottom = Math.max(46, overlap / s + 16);
  c.style.bottom = ui ? `${bottom}px` : '';
  /* If the subtitle would still cover a chapter title, the title moves up while the controls show. */
  const col = $('.scene.type-chapter .col', stage);
  if (!col) return;
  const lift = ui && !c.hidden ? col.offsetTop + col.offsetHeight + 16 - (1080 - bottom - c.offsetHeight) : 0;
  col.style.translate = lift > 0 ? `0 ${-Math.min(lift, col.offsetTop - 40)}px` : '';
}
function revealUI() {
  if ($('#testBox') || P.yt || player.hidden || !$('#videoWrap').hidden) return;
  player.classList.add('ui');
  placeCaption();
  clearTimeout(P.uiTimer);
  P.uiTimer = setTimeout(() => { if (!P.paused && $('#chapterDrawer').hidden) hideUI(); else revealUI(); }, 3000);
}
function hideUI() {
  clearTimeout(P.uiTimer);
  player.classList.remove('ui');
  closeChapters();
  placeCaption();
  if (document.activeElement?.closest?.('#hud')) document.activeElement.blur();
}
function toggleChapters() { if ($('#chapterDrawer').hidden) openChapters(); else closeChapters(); revealUI(); }
function openChapters() {
  const d = $('#chapterDrawer');
  d.hidden = false; $('#btnChapters').setAttribute('aria-expanded', 'true');
  const on = $('button.on', d) || $('button', d);
  player.classList.add('drawer');
  on?.focus({ preventScroll: true }); on?.scrollIntoView({ inline: 'center', block: 'nearest' });
  /* fromTo with fixed end values: opening it twice can't leave cards stuck at different heights. */
  gsap.fromTo(d, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: .18, ease: 'power2.out', overwrite: true, clearProps: 'all' });
}
function closeChapters() { $('#chapterDrawer').hidden = true; $('#btnChapters').setAttribute('aria-expanded', 'false'); player.classList.remove('drawer'); }
function showBigIcon(svg) {
  const big = $('#hudBig'); big.innerHTML = svg;
  /* Not GSAP: pausing the lesson pauses all of GSAP, which froze this icon on screen, even over a video. */
  big.getAnimations().forEach((a) => a.cancel());
  big.animate([{ opacity: .9, transform: 'scale(.7)' }, { opacity: 0, transform: 'scale(1.25)' }], { duration: 550, easing: 'ease-out' });
}
function hudToast(text) {
  const t = $('#hudToast'); t.textContent = text;
  gsap.fromTo(t, { opacity: 1, x: 0 }, { opacity: 0, duration: .4, delay: 1.5, overwrite: true });
}
function toggleFullscreen() {
  if (document.fullscreenElement) document.exitFullscreen?.();
  else document.documentElement.requestFullscreen?.().catch(() => {});
  revealUI();
}
/* Esc on a laptop leaves full screen first, and the page never sees that key. Treat it as Back for the chapter strip. */
document.addEventListener('fullscreenchange', () => { if (!document.fullscreenElement && !player.hidden && !$('#chapterDrawer').hidden) { closeChapters(); revealUI(); $('#btnChapters').focus(); } });
async function keepAwake() { try { P.wake = await navigator.wakeLock?.request('screen'); } catch (e) {} }
document.addEventListener('visibilitychange', () => {
  if (player.hidden) return;
  /* Leaving the app pauses everything, the YouTube clip too, so nothing keeps playing or floats over other apps. */
  /* An iPad floats a playing clip in its own small window when you switch apps, and pausing comes too late to stop it.
     So the clip leaves the page, which closes that window, and comes back at the same second when the family returns. */
  if (document.hidden) {
    if (P.yt && P.ytMount) { try { P.ytAt = Math.floor(P.yt.getCurrentTime()); P.yt.destroy(); } catch (e) {} P.yt = null; $('#videoHost').innerHTML = ''; }
    else if (!P.paused && !$('#testBox')) togglePause();
  } else {
    keepAwake();
    if (P.ytAt != null && P.ytMount && !$('#videoWrap').hidden) { const at = P.ytAt; P.ytAt = null; $('#videoWait').hidden = false; P.ytMount(at); }
  }
});
/* Laptop and phone play/pause keys belong to the system, which passes them on through Media Session rather than as key presses. */
function setMediaKeys(ep) {
  const ms = navigator.mediaSession; if (!ms) return;
  if (window.MediaMetadata) ms.metadata = new MediaMetadata({ title: ep.title, artist: 'Home School TV' });
  const pauseOnly = (want) => () => { if (P.yt) { if (want) P.yt.playVideo(); else P.yt.pauseVideo(); } else if (P.paused === want) togglePause(); };
  [['play', pauseOnly(true)], ['pause', pauseOnly(false)], ['nexttrack', () => jumpChapter(1)], ['previoustrack', () => jumpChapter(-1)]].forEach(([a, f]) => { try { ms.setActionHandler(a, f); } catch (e) {} });
}
function openEpisode(ep, index = 0) {
  P.ep = ep; P.finished = false;
  window.Store.log('lesson', { ep: ep.id, did: index ? 'resumed' : 'started', scene: ep.scenes[index]?.id }); app.hidden = true; player.hidden = false; fitStage();
  setMediaKeys(ep);
  if (CAN_EMBED && ep.scenes.some((s) => s.type === 'video')) loadYT();
  /* A lesson fills big screens. Phones and blocked browsers just carry on. */
  if (innerWidth >= 1280 && !document.fullscreenElement) document.documentElement.requestFullscreen?.().catch(() => {});
  keepAwake();
  Sfx.get()?.resume?.();
  document.body.classList.add('playing');
  /* Safari and iPads only allow sound on a player that really played during the tap. An empty player doesn't count, so play a moment of silence. */
  P.audio.onended = P.audio.onerror = null;
  P.audio.src = SILENT_CLIP;
  P.audio.play().catch(() => {});
  applySpeed();
  runFrom(index);
}
function closePlayer() {
  $('#wordHelp').hidden = true; wordsToken++; wordVoice.pause();
  if (P.ep && !P.finished && !player.hidden) window.Store.log('lesson', { ep: P.ep.id, did: 'left early', scene: P.ep.scenes[P.index]?.id });
  P.token++; killAll(); applySpeed(false); P.audio.pause(); closeVideo(); hideUI(); gsap.ticker.remove(tickProgress);
  $('.scene', stage)?.remove(); $('#testBox')?.remove();
  player.hidden = true; app.hidden = false;
  document.body.classList.remove('playing');
  if (document.fullscreenElement) document.exitFullscreen?.();
  P.wake?.release?.(); P.wake = null;
  /* A child on their own device goes back to their day, not the TV's home. */
  if (window.Store.currentKid()) window.renderMyDay(); else renderHome();
}

/* ---------- Videos inside chapters. Where a video can't play, the lesson carries on without it rather than sending anyone to another tab. ---------- */
/* A click inside YouTube's frame takes the keyboard away from us, so the remote would stop working. Take it back. */
addEventListener('blur', () => setTimeout(() => { if (P.yt && document.activeElement?.tagName === 'IFRAME') { document.activeElement.blur(); $('#videoWrap').focus(); } }, 2500));
function videoKey(ev) {
  const yt = P.yt, key = ev.key;
  if (document.activeElement === $('#videoSkip') && (key === 'Enter' || key === ' ')) return;
  if (key === 'Enter' || key === ' ' || isMediaToggle(ev)) { ev.preventDefault(); if (yt.getPlayerState?.() === YT.PlayerState.PLAYING) { yt.pauseVideo(); showBigIcon(ICON_PAUSE); } else { yt.playVideo(); showBigIcon(ICON_PLAY); } return; }
  if (key === 'ArrowLeft' || key === 'ArrowRight' || key === 'MediaRewind' || key === 'MediaFastForward') {
    ev.preventDefault();
    const dir = key === 'ArrowRight' || key === 'MediaFastForward' ? 10 : -10;
    yt.seekTo(Math.max(0, (yt.getCurrentTime?.() || 0) + dir), true);
    hudToast(dir > 0 ? 'Forward 10 seconds' : 'Back 10 seconds');
    return;
  }
  if (key === 'ArrowDown') { ev.preventDefault(); $('#videoSkip').focus(); return; }
  if (key === 'ArrowUp') { ev.preventDefault(); $('#videoWrap').focus(); return; }
  if (key === 'MediaTrackNext') { ev.preventDefault(); $('#videoSkip').click(); }
}
function closeVideo() {
  P.ytMount = null; P.ytAt = null;
  if (P.yt) { try { P.yt.destroy(); } catch (e) {} P.yt = null; }
  const w = $('#videoWrap'); if (w) w.hidden = true;
}
/* Slow home Wi-Fi can take many seconds, so this starts when a lesson opens, and waits a good while before giving up. */
let ytLoading = null;
function loadYT() {
  if (window.YT && YT.Player) return Promise.resolve(true);
  ytLoading ||= new Promise((resolve) => {
    window.onYouTubeIframeAPIReady = () => resolve(true);
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api'; tag.onerror = () => { ytLoading = null; resolve(false); };
    document.head.append(tag);
  });
  return Promise.race([ytLoading, new Promise((resolve) => setTimeout(() => resolve(false), 30000))]);
}
function playVideo(scene) {
  P.audio.pause();
  $('#hudBig').getAnimations().forEach((a) => a.cancel());
  if (P.paused) { P.paused = false; gsap.globalTimeline.resume(); updateControls(); }
  return new Promise(async (resolve) => {
    const done = () => { closeVideo(); resolve(); };
    const skip = (why = 'not allowed here') => { window.Store.log('video', { ep: P.ep?.id, scene: scene.id, youtube: scene.youtube, did: 'failed', why: String(why) });
      closeVideo(); toast('That video wouldn’t play here, so we carried on without it.'); resolve(); };
    if (!CAN_EMBED) return skip();
    const wrap = $('#videoWrap'), token = P.token;
    hideUI();
    $('#videoName').textContent = scene.videoTitle || '';
    wrap.hidden = false;
    $('#videoHost').innerHTML = '';
    $('#videoWait').hidden = false;
    $('#videoSkip').onclick = () => { $('#videoWait').hidden = true; done(); };
    wrap.focus();
    const ready = await loadYT();
    if (token !== P.token || wrap.hidden) return resolve();
    if (!ready) { $('#videoWait').hidden = true; return skip('YouTube didn’t load'); }
    /* We make the frame ourselves, so its permissions say no to picture-in-picture, and YouTube's player attaches to it.
       `from` is where to start: the clip's own start, or where it was when the family left the app (see visibilitychange). */
    const mount = (from) => {
      const vars = new URLSearchParams({ enablejsapi: 1, autoplay: 1, rel: 0, playsinline: 1, modestbranding: 1, fs: 0, iv_load_policy: 3, origin: location.origin, ...(from ? { start: from } : {}), ...(scene.end ? { end: scene.end } : {}) });
      $('#videoHost').innerHTML = `<iframe id="ytSlot" title="${esc(scene.videoTitle || 'Video')}" src="https://www.youtube-nocookie.com/embed/${encodeURIComponent(scene.youtube)}?${vars}" allow="autoplay; encrypted-media; picture-in-picture 'none'" referrerpolicy="strict-origin-when-cross-origin" style="width:100%;height:100%;border:0"></iframe>`;
      P.yt = new YT.Player('ytSlot', {
        events: {
          onReady: (e) => { $('#videoWait').hidden = true; e.target.playVideo(); try { e.target.setPlaybackRate(speed); } catch (err) { /* Plays at normal speed. */ } setTimeout(() => { if (P.yt && P.yt.getPlayerState?.() !== YT.PlayerState.PLAYING) hudToast('Press OK to start the video'); }, 4000); },
          onStateChange: (e) => { if (e.data === YT.PlayerState.ENDED) { P.ytMount = null; done(); } },
          onError: (e) => { $('#videoWait').hidden = true; P.ytMount = null; skip(`YouTube error ${e?.data}`); },
        },
      });
    };
    P.ytMount = mount;
    mount(scene.start || 0);
    wrap.focus();
  });
}

/* ---------- End of episode: tests happen on each child's own device. ---------- */
function startTest() {
  killAll(); applySpeed(false); P.audio.pause(); $('.scene', stage)?.remove(); $('#caption').hidden = true; hideUI();
  const kid = window.Store.currentKid();
  /* On this Mac itself, "localhost" means nothing to a phone, so use the Wi-Fi address. Anywhere else, the address in use is right. */
  const onThisMac = /^(localhost|127\.)/.test(location.hostname);
  const url = `${onThisMac && window.HS_LAN ? window.HS_LAN : `${location.origin}${location.pathname}`}#test-${P.ep.id}`;
  const box = document.createElement('div');
  box.id = 'testBox';
  /* A signed-in child is already on their own device, so they need the test, not directions to it. */
  box.innerHTML = `<div class="handoff"><div><p class="pill">Lesson finished</p><h1 class="huge">${kid ? 'Your test is ready' : 'Your test is on your tablet'}</h1>
    <p class="sub">${kid ? 'Take it now, or later from To do.' : 'Open Home School on your own device. It’s waiting under To do.'}</p><div class="heroBtns">${kid ? `<button class="tvBtn" data-f id="toTest">Start my test</button>` : ''}${kid ? '' : '<button class="tvBtn" data-f id="toTry">Try the test here</button>'}<button class="tvBtn alt" data-f id="toHome">${kid ? 'Back to My day' : 'Back to the channel'}</button></div></div>${CAN_EMBED && !kid ? '<div class="qrSide"><div id="qrBox" class="qrBox" aria-label="Scan to open the test on a new device"></div><p>New device? Scan to sign in.</p></div>' : ''}</div>`;
  $('#wordHelp').hidden = true;
  const wh = wordHelp();
  if (wh) box.querySelector('.handoff').classList.add('withWords');
  if (wh) box.querySelector('.handoff > div').insertAdjacentHTML('beforeend', `<div class="whList"><p class="whHead">Key words in Spanish</p><ul>${wh.words.map((w) => `<li><button data-f data-whsay="${esc(wordClipId(P.ep.id, w.en))}" aria-label="Hear ${esc(w.es)}"><b lang="${wh.lang}">${esc(w.es)}</b><span>${esc(w.forms[0])}</span></button></li>`).join('')}</ul></div>`);
  stage.append(box);
  if (wh) setTimeout(() => readWords(box), 1500);
  if (CAN_EMBED && !kid && window.QRCode) new QRCode($('#qrBox', box), { text: url, width: 300, height: 300, colorDark: '#17131F', colorLight: '#FFFFFF' });
  ($('#toTest') || $('#toHome')).focus();
}

/* ---------- Home ---------- */
const POSTER_ART = {
  atom: '<g fill="none" stroke="#fff" stroke-width="10"><ellipse cx="120" cy="110" rx="90" ry="34"/><ellipse cx="120" cy="110" rx="90" ry="34" transform="rotate(60 120 110)"/><ellipse cx="120" cy="110" rx="90" ry="34" transform="rotate(120 120 110)"/></g><circle cx="120" cy="110" r="16" fill="#fff"/>',
  crown: '<path d="M40 170L28 60L84 108L120 40L156 108L212 60L200 170Z" fill="#fff"/>',
  chip: '<rect x="62" y="52" width="116" height="116" rx="12" fill="#fff"/><path d="M90 30V52M120 30V52M150 30V52M90 168V190M120 168V190M150 168V190M40 80H62M40 110H62M40 140H62M178 80H200M178 110H200M178 140H200" stroke="#fff" stroke-width="10" stroke-linecap="round"/>',
  speech: '<path d="M40 40H200Q214 40 214 54V130Q214 144 200 144H110L70 186V144H40Q26 144 26 130V54Q26 40 40 40Z" fill="#fff"/>',
  muscle: '<path d="M50 150C40 90 90 70 110 80L130 40L170 60L150 100C190 110 200 170 150 180Z" fill="#fff"/>',
  lever: '<path d="M30 170L210 90" stroke="#fff" stroke-width="20" stroke-linecap="round"/><path d="M120 130L90 190H150Z" fill="#FFC400"/>',
  gear: '<circle cx="120" cy="110" r="46" fill="none" stroke="#fff" stroke-width="26"/><path d="M120 30V60M120 160V190M40 110H70M170 110H200M63 53L84 74M156 146L177 167M63 167L84 146M156 74L177 53" stroke="#fff" stroke-width="22" stroke-linecap="round"/>',
  heart: '<path d="M120 190C60 140 40 110 50 80C60 45 105 45 120 80C135 45 180 45 190 80C200 110 180 140 120 190Z" fill="#fff"/>',
  lungs: '<path d="M112 50V110L60 180C40 170 40 90 80 70ZM128 50V110L180 180C200 170 200 90 160 70Z" fill="#fff"/>',
  gut: '<path d="M70 50H170V90H110V110H170V150H110V190H70V150H130V130H70Z" fill="#fff"/>',
  brain: '<path d="M60 130C30 110 50 60 85 65C95 35 145 35 155 65C190 60 210 110 180 130C185 160 145 175 130 155C120 175 95 170 95 155C80 160 55 150 60 130Z" fill="#fff"/>',
  fraction: '<circle cx="120" cy="115" r="75" fill="none" stroke="#fff" stroke-width="10"/><path d="M120 115V40A75 75 0 0 1 195 115Z" fill="#fff"/>',
  pyramid: '<path d="M120 40L210 180H30Z" fill="#fff"/><path d="M120 40L150 180H30Z" fill="#fff" opacity=".7"/>',
  volcano: '<path d="M90 70H150L210 190H30Z" fill="#fff"/><path d="M120 60C110 40 130 30 120 10C150 30 145 50 135 60Z" fill="#FFC400"/>',
  pen: '<path d="M60 180L70 140L160 50L190 80L100 170Z" fill="#fff"/>',
  coin: '<circle cx="120" cy="110" r="72" fill="#fff"/><circle cx="120" cy="110" r="52" fill="none" stroke="#0005" stroke-width="8"/>',
};
const posterArt = window.posterArt = (k) => `<svg viewBox="0 0 240 210" class="pArt">${POSTER_ART[k] || ''}</svg>`;
const AFTER_UNIT = [['Then: Digestive system', 'digestive-system', '#9A3412'], ['Also: Heart and blood', 'heart-and-blood', '#7E22CE']];
/* Blocks show real pictures, with color underneath in case a picture can't load. */
const shade = (color = '#000000') => `linear-gradient(0deg,${color}F2 8%,${color}00 68%)`;

function chapterCards(ep) {
  return ep.scenes.map((s, i) => ({ s, i })).filter(({ s }) => s.poster && s.type !== 'video');
}
/* Which lesson is on: the one a person chose, or the child's next untested lesson, or the newest. */
let chosenEpisode = null;
const coreEpisodes = () => window.EPISODES.filter((e) => !e.extra);
const lessonForKid = window.lessonForKid = (k) => coreEpisodes().find((e) => !window.Store.attemptsFor(k.id, 'test', e.id).length) || coreEpisodes().at(-1);
/* Lessons follow the timetable: the oldest one still due for this child, or the latest one due on a shared TV. */
window.currentEpisode = () => {
  if (chosenEpisode) return chosenEpisode;
  const kid = window.Store.currentKid(), id = window.Schedule.nextLesson(kid);
  return window.EPISODES.find((e) => e.id === id) || (kid ? lessonForKid(kid) : coreEpisodes().at(-1));
};
window.chooseEpisode = (id) => { chosenEpisode = window.EPISODES.find((e) => e.id === id) || null; };
function unitRow(ep) {
  const unit = ep.unit || window.CURRICULUM.here.unit, lessons = window.CURRICULUM.unitLessons[unit];
  return lessons.map(([t, , st, id], i) => {
    const built = st === 'ready' && window.EPISODES.find((e) => e.id === id);
    if (built) return `<button class="photoPoster ${id === ep.id ? 'isCurrent' : ''}" data-f data-lesson="${esc(id)}" style="background-image:${shade()},url(${imgUrl(built.hero)})"><small>Lesson ${i + 1}${id === ep.id ? ', showing now' : ''}</small><b>${esc(t)}</b></button>`;
    return `<button class="artPoster unitPoster" data-f data-soon style="background:#2C2440">${window.unitArt(t)}<small>Lesson ${i + 1}, coming soon</small><b>${esc(t)}</b></button>`;
  }).join('') + (unit === window.CURRICULUM.here.unit ? AFTER_UNIT.map(([t, slug, c]) => `<button class="artPoster unitPoster" data-f data-soon style="background:#2C2440">${window.unitArt(slug === 'digestive-system' ? 'Digestive system' : 'Heart and blood')}<small>Coming soon</small><b>${esc(t)}</b></button>`).join('') : '');
}
function openVideoOnly(id) {
  P.ep = window.currentEpisode(); app.hidden = true; player.hidden = false; fitStage();
  document.body.classList.add('playing');
  $('.scene', stage)?.remove(); $('#caption').hidden = true;
  playVideo({ youtube: id }).then(closePlayer);
}
function renderHome() {
  const ep = window.currentEpisode();
  window.setRoute(chosenEpisode ? `lesson-${chosenEpisode.id}` : '');
  const seconds = ep.scenes.flatMap((s) => s.beats.map((_, i) => State.manifest[`${s.id}-${i}`]?.seconds || 0)).reduce((a, b) => a + b, 0);
  const mins = Math.max(1, Math.round(seconds * 1.2 / 60));
  const cards = chapterCards(ep);
  const videoCount = ep.scenes.filter((s) => s.type === 'video').length, place = savedPlace(ep);
  document.body.dataset.surface = 'tv';
  app.innerHTML = `<header class="heroTV"><img class="heroImg" src="${imgUrl(ep.hero)}" alt="${esc(ep.heroAlt || '')}" style="object-position:${ep.heroPos || '50% 9%'}">
      <div class="topBar"><span class="brand">Home School <i>TV</i></span><nav class="kids" aria-label="Sections"><button data-f id="openDiary">Diary</button><button data-f id="openMap">Program</button><button data-f id="openMe" class="signBtn">${window.Store.isParent() ? 'My dashboard' : esc(window.Store.currentKid()?.name || 'Sign in')}</button></nav></div>
      ${CAN_EMBED ? '' : '<p class="previewNote">This is a preview copy, with no videos and no voice in newer lessons. For the full school, open it from your home server.</p>'}
      <div class="heroText"><p class="eyebrow">${esc(ep.series)} · ${esc(ep.lessonLabel)}</p><h1>${esc(ep.title)}</h1><p class="blurb">${esc(ep.blurb)}</p>
      <p class="meta">About ${mins} min${CAN_EMBED && videoCount ? ` plus ${videoCount === 1 ? '1 video' : `${videoCount} videos`}` : ''} · ${ep.test.length}-question test</p>
      <div class="heroBtns"><button class="tvBtn" data-f data-play="${place}" id="playMain">${place ? 'Continue lesson' : 'Play lesson'}</button>${place ? '<button class="tvBtn alt" data-f data-play="0">Start over</button>' : ''}</div></div></header>
    ${todayRow()}
    <section class="rowTV"><h2>Jump to a chapter</h2><div class="posterRow">${cards.map(({ s, i }) => `<button class="photoPoster" data-f data-play="${i}" style="background-image:linear-gradient(0deg,#000C,#0000 60%),url(${imgUrl(s.poster)})"><small>${s.type === 'chapter' ? esc(s.label || `Chapter ${s.n}`) : 'Start'}${s.hasVideo && CAN_EMBED ? ' · includes video' : ''}</small><b>${esc(s.title || s.videoTitle || 'Intro')}</b></button>`).join('')}</div></section>
    ${ep.credits.deeper.length ? `<section class="rowTV"><h2>Go deeper with more videos</h2><div class="posterRow">${ep.credits.deeper.map((v) => (() => {
      const inner = `style="background-color:#262033;background-image:${shade()},url(https://i.ytimg.com/vi/${esc(v.youtube)}/hqdefault.jpg)"><span class="playMark" aria-hidden="true"></span><small>${esc(v.by)}, ${esc(v.note.toLowerCase())}</small><b>${esc(v.title)}</b>`;
      return CAN_EMBED ? `<button class="photoPoster videoPoster" data-f data-video="${esc(v.youtube)}" ${inner}</button>` : `<a class="photoPoster videoPoster" data-f href="https://www.youtube.com/watch?v=${esc(v.youtube)}" target="_blank" rel="noopener" ${inner}</a>`;
    })()).join('')}</div></section>` : ''}
    <section class="rowTV"><h2>In this unit: ${esc(ep.unit || window.CURRICULUM.here.unit)}</h2><div class="posterRow">${unitRow(ep)}</div></section>
    <section class="rowTV"><h2>Ready to watch</h2><div class="posterRow">${window.readyPosters(ep.id)}</div></section>
    <section class="rowTV"><h2>More subjects</h2><div class="posterRow">${window.CURRICULUM.program.map((p, i) => ({ p, i })).filter(({ p }) => p.subject !== 'Science').map(({ p, i }) => `<button class="artPoster unitPoster" data-f data-subjopen="${i}" style="background:${p.color}">${window.unitArt(p.cover || p.units[0][0])}<small>${p.units.length} units</small><b>${esc(p.subject)}</b></button>`).join('')}</div></section>
    <footer class="creditsTV"><h2>Credits</h2><p>Images: ${Object.values(State.credits).map((c) => `${c.page ? `<a href="${esc(c.page)}" target="_blank" rel="noopener">${esc(c.title.slice(0, 44))}</a>` : esc(c.title.slice(0, 44))} (${esc(c.author.slice(0, 40))}, ${esc(c.license)})`).join(' · ')}</p>
      <p>Videos: ${ep.credits.videos.map((v) => `<a href="${esc(v.url)}" target="_blank" rel="noopener">${esc(v.title)}</a> by ${esc(v.by)}`).join(' · ')}. Narration: Kokoro AI voice.</p></footer>`;
  $('#playMain').focus({ preventScroll: true });
}
/* Today's classes from the timetable. On a day off, the next school day's. */
function todayRow() {
  const Sch = window.Schedule, kid = window.Store.currentKid(), now = new Date(), day = Sch.schoolDay(now), date = Sch.iso(day);
  const d = Sch.dayOf(kid, date);
  if (!d.periods.length) return '';
  const title = date === Sch.todayIso() ? 'Today’s classes' : `Classes on ${d.name}`;
  return `<section class="rowTV"><h2>${title}</h2><div class="posterRow">${d.periods.map((p) => {
    const art = window.unitArt(p.kind === 'activity' ? p.subject : window.hasUnitIcon(p.title) ? p.title : p.unit);
    const made = p.ep || p.kind === 'activity' || (p.kind === 'exam' && p.ready);
    const tag = p.state === 'done' ? '<span class="sPill done">✓ Done</span>' : p.kind === 'activity' ? '' : made ? '<span class="sPill next">Ready</span>' : '<span class="sPill later">Not made yet</span>';
    const label = `<small>${esc(p.time)}, ${esc(p.subject)}</small><b>${esc(p.kind === 'lesson' ? p.title.split(', lesson')[0] : p.title)}</b>`;
    const attrs = p.ep ? `data-lesson="${esc(p.ep)}"` : p.kind === 'activity' ? 'data-activity' : 'data-soon';
    return `<button class="artPoster unitPoster" data-f ${attrs} style="background:${p.color}">${tag}${art}${label}</button>`;
  }).join('')}</div></section>`;
}
/* Every lesson that exists today, so nobody has to hunt through the program for them. */
/* A new lesson waits for a parent to watch it first (`review: true`). Only the parent sees it until then. */
window.visibleEpisodes = () => window.EPISODES.filter((e) => !e.review || window.Store.isParent());
window.readyPosters = (skip) => window.visibleEpisodes().filter((e) => e.id !== skip).map((e) => `<button class="photoPoster" data-f data-lesson="${esc(e.id)}" style="background-image:linear-gradient(0deg,#000C,#0000 60%),url(${imgUrl(e.hero)})"><small>${esc(e.subject || 'Science')}, ${esc(e.lessonLabel)}</small><b>${esc(e.topic || e.title)}</b></button>`).join('');
window.renderHomeView = () => { renderHome(); window.scrollTo(0, 0); };
window.playCurrent = () => openEpisode(window.currentEpisode(), 0);
function toast(text) {
  const t = $('#toast');
  t.textContent = text; t.hidden = false;
  clearTimeout(toast.t); toast.t = setTimeout(() => { t.hidden = true; }, 2500);
}

/* Shared with the views in views/. */

/* ---------- Clicks and remote keys ---------- */
document.addEventListener('click', (ev) => {
  const el = ev.target.closest('button, a');
  if (!el) return;
  const ep = window.currentEpisode();
  if (el.id === 'openMap') window.renderMap();
  else if (el.dataset.lesson && el.dataset.open) { window.chooseEpisode(el.dataset.lesson); window.renderMyDay(); }
  else if (el.dataset.lesson) { window.chooseEpisode(el.dataset.lesson); renderHome(); window.scrollTo(0, 0); }
  else if (el.dataset.lessonplay) { window.chooseEpisode(el.dataset.lessonplay); openEpisode(window.currentEpisode(), 0); }
  else if (el.dataset.home != null) { renderHome(); window.scrollTo(0, 0); }
  else if (el.dataset.back != null) window.backTo(() => { renderHome(); window.scrollTo(0, 0); });
  else if (el.dataset.video) openVideoOnly(el.dataset.video);
  else if (el.id === 'openMe') window.openAccount();
  else if (el.id === 'openHow') window.renderHow();
  else if (el.dataset.play != null) openEpisode(ep, +el.dataset.play);
  else if (el.dataset.soon != null) toast('This lesson isn’t made yet.');
  else if (el.dataset.activity != null) toast('This class is your own activity, away from the screen.');
  else if (el.id === 'toHome') closePlayer();
  else if (el.id === 'toTest') { const id = P.ep.id; closePlayer(); window.openTestFor(id); }
  else if (el.id === 'toTry') { const id = P.ep.id; closePlayer(); window.tryTest(id); }
  else if (el.id === 'btnPlay') togglePause();
  else if (el.id === 'btnSpeed') nextSpeed();
  else if (el.id === 'btnPrev') jumpChapter(-1);
  else if (el.id === 'btnNext') jumpChapter(1);
  else if (el.id === 'btnHome') closePlayer();
  else if (el.id === 'btnCaps') { State.captions = !State.captions; $('#caption').hidden = !State.captions; updateControls(); revealUI(); }
  else if (el.id === 'btnChapters') toggleChapters();
  else if (el.dataset.go != null) { const at = +el.dataset.go; hideUI(); runFrom(at); hudToast(P.ep.scenes[at].chapter); }
  else if (el.id === 'btnFull') toggleFullscreen();
});
/* Browsers also send mouse-move events while the picture animates, so only a real move counts. */
player.addEventListener('mousemove', (ev) => {
  if (Math.abs(ev.clientX - (P.mx ?? -99)) + Math.abs(ev.clientY - (P.my ?? -99)) < 4) return;
  P.mx = ev.clientX; P.my = ev.clientY;
  revealUI();
});
/* A tap shows the controls or pauses. On a touch screen, a double tap on the left or right skips 10 seconds, like YouTube. Tapping on keeps skipping. */
function singleTap(touch) {
  if (touch && !player.classList.contains('ui')) { revealUI(); return; }
  if ($('#chapterDrawer').hidden === false) { closeChapters(); return; }
  togglePause();
}
function flashSkip(side) {
  const el = $('#skipFlash'); el.dataset.side = side; el.textContent = side === 'right' ? '+10 s' : '−10 s';
  el.getAnimations().forEach((a) => a.cancel());
  el.animate([{ opacity: .95 }, { opacity: .95, offset: .5 }, { opacity: 0 }], { duration: 650, easing: 'ease-out' });
}
const Tap = { timer: 0, side: '', until: 0 };
$('#stage').addEventListener('pointerup', (ev) => {
  if ($('#testBox') || P.yt || ev.target.closest('button, a')) return;
  const touch = ev.pointerType === 'touch' || ev.pointerType === 'pen';
  const x = ev.clientX / innerWidth, side = !touch ? '' : x < .35 ? 'left' : x > .65 ? 'right' : '';
  if (!side) { singleTap(touch); return; }
  const now = performance.now();
  if ((Tap.timer && Tap.side === side) || (now < Tap.until && Tap.side === side)) {
    clearTimeout(Tap.timer); Tap.timer = 0; Tap.until = now + 700;
    flashSkip(side); skipBy(side === 'right' ? 10 : -10);
    return;
  }
  clearTimeout(Tap.timer);
  Tap.side = side; Tap.until = 0;
  Tap.timer = setTimeout(() => { Tap.timer = 0; singleTap(true); }, 260);
});
/* The chapter marks have gaps and different widths, so time is read from the mark under the pointer. */
function timeAtPointer(x) {
  const segs = $$('#bar .seg'), { starts, total } = lessonTimes(P.ep);
  let seg = segs[segs.length - 1];
  for (const el of segs) if (x <= el.getBoundingClientRect().right) { seg = el; break; }
  const box = seg.getBoundingClientRect(), f = Math.max(0, Math.min(1, (x - box.left) / (box.width || 1)));
  const from = starts[+seg.dataset.from], to = +seg.dataset.to < starts.length ? starts[+seg.dataset.to] : total;
  return Math.min(total - .01, from + f * (to - from));
}
/* Which scene, beat and point in the clip a time falls in. Same sums as the progress line. */
function placeAtTime(at) {
  const { starts } = lessonTimes(P.ep);
  let n = 0;
  starts.forEach((t, i) => { if (t <= at && !(P.ep.scenes[i].type === 'video' && !CAN_EMBED)) n = i; });
  const scene = P.ep.scenes[n];
  let left = Math.max(0, at - starts[n]);
  for (let b = 0; b < scene.beats.length; b++) {
    const secs = State.manifest[`${scene.id}-${b}`]?.seconds ?? 0, hold = scene.beats[b].hold ?? .3;
    if (left < secs + hold || b === scene.beats.length - 1) return { n, beat: b, offset: Math.min(left, Math.max(0, secs - .05)) };
    left -= secs + hold;
  }
  return { n, beat: 0, offset: 0 };
}
$('#barWrap').addEventListener('click', (ev) => {
  const { n, beat, offset } = placeAtTime(timeAtPointer(ev.clientX));
  closeChapters(); runFrom(n, { beat, offset }); revealUI();
});
$('#barWrap').addEventListener('mousemove', (ev) => {
  const box = $('#bar').getBoundingClientRect(), at = timeAtPointer(ev.clientX), { n } = placeAtTime(at);
  const chapter = P.ep.scenes[n].chapter, first = P.ep.scenes.find((s) => s.chapter === chapter), tip = $('#barTip');
  tip.hidden = false;
  tip.style.left = `${Math.max(tip.offsetWidth / 2, Math.min(box.width - tip.offsetWidth / 2, ev.clientX - box.left))}px`;
  const img = $('img', tip), src = first.poster || first.img || first.still || P.ep.hero;
  if (img.dataset.src !== src) { img.dataset.src = src; img.src = imgUrl(src); }
  $('span', tip).textContent = `${chapter}, ${clock(at)}`;
});
$('#barWrap').addEventListener('mouseleave', () => { $('#barTip').hidden = true; });
/* TV remotes name their keys differently, so each is matched by name and by number. */
const BACK_KEYS = ['Escape', 'Backspace', 'GoBack', 'BrowserBack'];
const BACK_CODES = [461, 10009, 4];
const isMediaToggle = (ev) => ['MediaPlayPause', 'MediaPlay', 'MediaPause', 'Pause', 'Play'].includes(ev.key) || [415, 19, 10252, 179].includes(ev.keyCode);
const isMediaStop = (ev) => ev.key === 'MediaStop' || ev.keyCode === 413;
const isMediaNext = (ev) => ['MediaTrackNext', 'MediaFastForward'].includes(ev.key) || [425, 417].includes(ev.keyCode);
const isMediaPrev = (ev) => ['MediaTrackPrevious', 'MediaRewind'].includes(ev.key) || [424, 412].includes(ev.keyCode);
/* One meaning for Back, one layer at a time. Returns false when there's nothing left to go back from. */
function goBack() {
  if (player.hidden) {
    if ($('.cabinet') && document.body.dataset.surface !== 'paper') { window.renderParent(); return true; }
    const sheet = $('#dSheet');
    if (sheet) { sheet.remove(); return true; }
    if ($('#themeSheet')) { $('#themeSheet').remove(); return true; }
    if (document.body.dataset.surface === 'school') {
      if ($('#examClock')) { toast('Finish the exam first. Your answers are safe.'); return true; }
      if ($('#quizExit')) { $('#quizExit').click(); return true; }
      if (!$('.hub')) window.renderMyDay(); else return false;
      return true;
    }
    if (!['tv', 'diary', 'doc'].includes(document.body.dataset.surface) || $('.heroTV', app)) return false;
    window.renderHomeView();
    return true;
  }
  if (P.yt || !$('#videoWrap').hidden) { $('#videoSkip').click(); return true; }
  if (!$('#chapterDrawer').hidden) { closeChapters(); revealUI(); $('#btnChapters').focus(); return true; }
  if (player.classList.contains('ui') && !P.paused && !$('#testBox')) { hideUI(); return true; }
  closePlayer();
  return true;
}
/* Some TV browsers treat the remote's Back as the browser's back button, which would leave the site. */
history.pushState({ hs: 'guard' }, '');
/* A change of address is a move between screens (setRoute keeps hsLastHash current); the same address is the remote's Back key. */
window.hsLastHash = location.hash;
addEventListener('popstate', () => {
  if (location.hash !== window.hsLastHash) { window.hsLastHash = location.hash; return; }
  if (goBack()) history.pushState({ hs: 'guard' }, ''); else history.back();
});
function moveFocus(key) {
  const scope = !player.hidden && !$('#testBox') ? $('#hud') : $('#dSheet') || document;
  const items = $$('[data-f], .qBody button, .qBody select, .qBody input', scope).filter((e) => e.offsetParent !== null && !e.disabled);
  const cur = document.activeElement, from = cur && items.includes(cur) ? cur.getBoundingClientRect() : null;
  if (!from) { items[0]?.focus(); return; }
  const cx = from.left + from.width / 2, cy = from.top + from.height / 2;
  let best = null, bestScore = Infinity;
  for (const it of items) {
    if (it === cur) continue;
    const r = it.getBoundingClientRect(), dx = r.left + r.width / 2 - cx, dy = r.top + r.height / 2 - cy;
    const along = { ArrowRight: dx, ArrowLeft: -dx, ArrowDown: dy, ArrowUp: -dy }[key];
    const across = key === 'ArrowLeft' || key === 'ArrowRight' ? Math.abs(dy) : Math.abs(dx);
    if (along <= 4) continue;
    const score = along + across * 2.5;
    if (score < bestScore) { bestScore = score; best = it; }
  }
  if (best) { best.focus(); best.scrollIntoView({ block: 'nearest', inline: 'nearest', behavior: 'smooth' }); }
}
document.addEventListener('keydown', (ev) => {
  const arrows = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'];
  const inPlayer = !player.hidden, inTest = !!$('#testBox');
  if (BACK_KEYS.includes(ev.key) || BACK_CODES.includes(ev.keyCode)) {
    if (ev.target.matches?.('input, textarea, select, [contenteditable]')) return;
    if (goBack()) ev.preventDefault();
    return;
  }
  if (!inPlayer || inTest) {
    if (arrows.includes(ev.key) && !ev.target.matches?.('input, textarea, select')) { ev.preventDefault(); moveFocus(ev.key); }
    return;
  }
  if (!$('#videoWrap').hidden) { if (P.yt) videoKey(ev); return; }
  if (isMediaStop(ev)) { ev.preventDefault(); closePlayer(); return; }
  if (isMediaNext(ev)) { ev.preventDefault(); jumpChapter(1); return; }
  if (isMediaPrev(ev)) { ev.preventDefault(); jumpChapter(-1); return; }
  const shown = player.classList.contains('ui'), focus = document.activeElement, inHud = !!focus?.closest('#hud'), onBar = focus === $('#barWrap');
  /* Left and right skip 10 seconds, like any video player, unless you've moved down to the buttons. OK pauses. */
  if (ev.key === ' ' || isMediaToggle(ev)) { ev.preventDefault(); togglePause(); return; }
  if (ev.key === 'Enter') { if (shown && inHud && !onBar) { revealUI(); return; } ev.preventDefault(); togglePause(); return; }
  if (ev.key === 'c') { ev.preventDefault(); $('#btnCaps').click(); return; }
  if (ev.key === 'f') { ev.preventDefault(); toggleFullscreen(); return; }
  if (!arrows.includes(ev.key)) return;
  ev.preventDefault();
  if ((ev.key === 'ArrowLeft' || ev.key === 'ArrowRight') && (!inHud || onBar)) { skipBy(ev.key === 'ArrowRight' ? 10 : -10); return; }
  revealUI();
  if (!inHud) { $('#barWrap').focus(); return; }
  if (onBar) { (ev.key === 'ArrowDown' ? $('#btnPlay') : $('#btnHome')).focus(); return; }
  const inDrawer = focus.closest('#chapterDrawer');
  if (ev.key === 'ArrowUp' && inDrawer) { closeChapters(); $('#btnChapters').focus(); return; }
  if (ev.key === 'ArrowUp' && focus.closest('.hudRow')) { $('#barWrap').focus(); return; }
  if (ev.key === 'ArrowDown' && focus === $('#btnHome')) { $('#barWrap').focus(); return; }
  if (ev.key === 'ArrowDown' && !inDrawer && $('#chapterDrawer').hidden) { toggleChapters(); return; }
  moveFocus(ev.key);
});

/* ---------- Start. Links such as #shot-atlas-2 freeze a scene, so a screen can be reviewed without playing it all. ---------- */
(async function boot() {
  const getJSON = (url) => fetch(url).then((r) => (r.ok ? r.json() : {})).catch(() => ({}));
  [State.manifest, State.credits] = await Promise.all([getJSON(`assets/voice/${LANG}/manifest.json`), getJSON('assets/img/credits.json'), window.Store.refresh()]);
  const first = location.hash.slice(1);
  renderHome();
  /* Opens the page an address asks for. It runs on load, and whenever the address changes, such as a link typed on an iPad while the app is open. */
  const openRoute = (route) => {
    if (route === 'map' || route.startsWith('map-')) window.renderMap(route.split('-')[1]);
    if (route.startsWith('lesson-')) { window.chooseEpisode(route.slice(7)); renderHome(); }
    if (route === 'assess') window.renderAssess();
    if (route === 'exam') window.renderMyDay('exam');
    if (route === 'parent') window.renderParent('today');
    if (route.startsWith('parent-')) window.renderParent(route.slice(7));
    if (route.startsWith('me-')) window.openKidTab(route.slice(3));
    if (route === 'how') window.renderHow();
    if (route.startsWith('test-')) window.openTestFor(route.slice(5));
    if (route === 'program') window.renderProgramDoc();
    if (route === 'print' || route.startsWith('print-')) window.renderPrint(route.slice(6));
    if (route === 'diary') window.renderDiary();
    if (route === 'timetable') window.renderTimetable();
    if (route === 'me') window.openAccount();
    if (route === 'screens') window.renderScreens();
    if (route.startsWith('screen-')) window.openScreen(route.slice(7));
  };
  openRoute(first);
  window.hsBooted = true;
  window.addEventListener('hashchange', () => {
    if (!player.hidden) return;
    const route = location.hash.slice(1);
    window.endScreens?.();
    window.hsRestoring = true;
    try { if (!route) renderHome(); else openRoute(route); } finally { window.hsRestoring = false; }
  });
  /* The address read at the start: renderHome above has already tidied location.hash by now. */
  const m = /^shot-(.+)-(\d+)$/.exec(first);
  if (!m) return;
  const ep = P.ep = window.EPISODES.find((e) => e.scenes.some((s) => s.id === m[1]));
  const scene = ep.scenes.find((s) => s.id === m[1]);
  app.hidden = true; player.hidden = false; fitStage();
  document.fonts?.ready.then(() => {
    const drive = mount(scene);
    gsap.set(['#wipeA', '#wipeB'], { x: 2500 });
    for (let i = 0; i <= +m[2]; i++) drive(i, scene.beats[i]);
    showCaption(scene.beats[+m[2]].say); showWordHelp(scene.beats[+m[2]]);
    gsap.globalTimeline.getChildren(true, true, false).forEach((t) => { if (t.repeat && t.repeat() === -1) t.time(.9); else t.progress(1); });
    document.documentElement.dataset.shotReady = '1';
  });
})();
