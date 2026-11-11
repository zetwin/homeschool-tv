/* Question types shared by tests and exams. Each one draws itself, holds the child's answer, and marks it.
   Children do something with the thing itself: tap it, drag it, swipe it, build it. Every drag also works by tapping, and by keyboard where it can. */
(function () {
  const shuffled = (list) => { const a = [...list]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const PIN_AT = { heart: [130, 158], gut: [122, 272], biceps: [50, 195], thigh: [88, 460], skull: [120, 30], ribs: [82, 160], pelvis: [90, 312], humerus: [58, 165], forearm: [44, 255], femur: [90, 395], shin: [84, 530], spine: [120, 250] };
  const pic = (file) => window.LIB.img(file);
  const plain = (w) => w.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
  const calm = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
  const LETTERS = 'ABCDEFGH';

  /* Drag with a mouse or a finger. `over` lights up the place under the pointer. Tapping stays as the other way to do the same thing. */
  function dragger(box, from, to, onDrop, { onMove, noGhost } = {}) {
    box.querySelectorAll(from).forEach((el) => {
      el.style.touchAction = 'none';
      el.addEventListener('pointerdown', (e) => {
        if (e.button) return;
        const sx = e.clientX, sy = e.clientY;
        let moving = false, ghost = null, over = null;
        const move = (m) => {
          if (!moving) { if (Math.hypot(m.clientX - sx, m.clientY - sy) < 7) return; moving = true; el.classList.add('qLifted'); if (!noGhost) { ghost = el.cloneNode(true); ghost.classList.add('qGhost'); ghost.style.width = `${el.getBoundingClientRect().width}px`; document.body.append(ghost); } }
          if (ghost) { ghost.style.left = `${m.clientX}px`; ghost.style.top = `${m.clientY}px`; }
          onMove?.(el, m);
          const t = document.elementFromPoint(m.clientX, m.clientY)?.closest(to);
          if (t !== over) { over?.classList.remove('over'); over = t; over?.classList.add('over'); }
        };
        const up = () => {
          removeEventListener('pointermove', move); removeEventListener('pointerup', up); removeEventListener('pointercancel', up);
          if (!moving) return;
          ghost?.remove(); el.classList.remove('qLifted'); over?.classList.remove('over');
          box._dragged = true; setTimeout(() => { box._dragged = false; }, 60);
          onMove?.(el, null);
          if (over) onDrop(el, over);
        };
        addEventListener('pointermove', move); addEventListener('pointerup', up); addEventListener('pointercancel', up);
      });
    });
  }
  const state = (o, good, chosen) => (o.reveal ? (good ? 'right' : chosen ? 'wrong' : 'dim') : '');

  const TYPES = {
    /* Tap your answer. A test checks it straight away. */
    radio: {
      init: () => null,
      answered: (q, v) => v != null,
      fraction: (q, v) => (v === q.a ? 1 : 0),
      instant: true,
      html: (q, v, o) => `<div class="qCards n${q.o.length}" role="radiogroup">${q.o.map((t, k) => `<button type="button" role="radio" aria-checked="${v === k}" class="qCard ${v === k ? 'on' : ''} ${state(o, k === q.a, k === v)}" data-opt="${k}" ${o.locked ? 'disabled' : ''}><i>${LETTERS[k]}</i><span>${esc(t)}</span></button>`).join('')}</div>`,
      click: (e) => { const b = e.target.closest('[data-opt]'); return b ? +b.dataset.opt : undefined; },
    },
    /* Listen, then tap what you heard. For languages. */
    listen: {
      init: () => null,
      answered: (q, v) => v != null,
      fraction: (q, v) => (v === q.a ? 1 : 0),
      instant: true,
      play(q) { try { new Audio(`assets/voice/en/${q.clip}.mp3`).play().catch(() => {}); } catch (e) {} },
      html: (q, v, o) => `<button type="button" class="qPlay" data-playclip aria-label="Play the sound"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9v6h4l5 5V4L8 9zM16 8.500a5 5 0 0 1 0 7M18.500 6a8.500 8.500 0 0 1 0 12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>Play it again</button>${TYPES.radio.html(q, v, o)}`,
      after(box, q, v, o) { if (!o.locked && !o.played) { o.played = true; TYPES.listen.play(q); } box.querySelector('[data-playclip]').onclick = () => TYPES.listen.play(q); },
      click: (e) => { const b = e.target.closest('[data-opt]'); return b ? +b.dataset.opt : undefined; },
    },
    /* Tap every card that fits. */
    checkbox: {
      init: () => [],
      answered: (q, v) => v.length > 0,
      fraction: (q, v) => { const good = v.filter((x) => q.a.includes(x)).length, bad = v.length - good; return Math.max(0, good - bad) / q.a.length; },
      html: (q, v, o) => `<div class="qCards tick n${q.o.length}">${q.o.map((t, k) => { const has = v.includes(k), good = q.a.includes(k); return `<button type="button" aria-pressed="${has}" class="qCard ${has ? 'on' : ''} ${o.reveal ? (good ? (has ? 'right' : 'missed') : has ? 'wrong' : 'dim') : ''}" data-opt="${k}" ${o.locked ? 'disabled' : ''}><i>${has ? '✓' : ''}</i><span>${esc(t)}</span></button>`; }).join('')}</div>`,
      click: (e, q, v) => { const b = e.target.closest('[data-opt]'); if (!b) return undefined; const k = +b.dataset.opt; return v.includes(k) ? v.filter((x) => x !== k) : [...v, k]; },
    },
    /* Build the sentence: choose a word for the highlighted gap. */
    select: {
      init: (q) => q.choices.map(() => ''),
      answered: (q, v) => v.every(Boolean),
      fraction: (q, v) => v.filter((x, i) => x === q.a[i]).length / q.a.length,
      html(q, v, o) {
        const cur = o.gap ?? v.findIndex((x) => !x), line = esc(q.text).replace(/\{(\d+)\}/g, (m, i) => `<button type="button" class="qGap ${v[+i] ? 'filled' : ''} ${+i === cur && !o.locked ? 'cur' : ''} ${o.reveal ? (v[+i] === q.a[+i] ? 'right' : 'wrong') : ''}" data-gap="${i}" aria-label="Gap ${+i + 1}" ${o.locked ? 'disabled' : ''}>${esc(v[+i] || '')}</button>`);
        const missed = o.reveal && q.a.some((w, i) => v[i] !== w);
        q._c ||= {};
        return `<p class="qSentence">${line}</p>${o.locked ? (missed ? `<p class="qHelp">Right answer: ${esc(q.a.join(', '))}</p>` : '') : cur >= 0 ? `<div class="labelBank">${(q._c[cur] ||= shuffled(q.choices[cur])).map((w) => `<button type="button" class="chip" data-word="${esc(w)}">${esc(w)}</button>`).join('')}</div>` : ''}`;
      },
      click(e, q, v, o, draw) {
        const w = e.target.closest('[data-word]'), g = e.target.closest('[data-gap]');
        if (g) { o.gap = +g.dataset.gap; draw(); return undefined; }
        if (w) { const at = o.gap ?? v.findIndex((x) => !x), n = [...v]; n[at] = w.dataset.word; o.gap = null; return n; }
        return undefined;
      },
    },
    /* A one-word answer. Tests build it from letter tiles, so no keyboard covers the screen. Exams ask for it typed. */
    word: {
      init: () => '',
      target: (q) => plain(q.a[0]),
      answered: (q, v) => (q._tiles ? v.length === TYPES.word.target(q).length : v.trim().length > 0),
      fraction: (q, v) => { const norm = (x) => plain(x).replace(/[^\p{L}\p{N} ]/gu, '').replace(/\s+/g, ' ').trim(); return q.a.some((w) => norm(v) === norm(w)) ? 1 : 0; }, /* Exact, so "not hinge" isn't marked right for "hinge". List other right forms in `a`. */
      html(q, v, o) {
        if (o.exam) return `<input class="qText ${o.reveal ? (TYPES.word.fraction(q, v) ? 'right' : 'wrong') : ''}" aria-label="Your answer" value="${esc(v)}" placeholder="${esc(q.placeholder || 'Type your answer')}" autocomplete="off" autocapitalize="off" spellcheck="false" ${o.locked ? 'disabled' : ''}>`;
        const word = TYPES.word.target(q), tiles = (q._tiles ||= shuffled([...word, ...shuffled([...'aeiorstn']).slice(0, 2)]));
        const left = [...v]; const used = tiles.map((t) => { const i = left.indexOf(t); if (i >= 0) { left.splice(i, 1); return true; } return false; });
        const good = o.reveal && TYPES.word.fraction(q, v);
        return `<div class="qSlots ${o.reveal ? (good ? 'right' : 'wrong') : ''}" aria-label="Your word: ${esc(v)}">${[...word].map((_, i) => `<button type="button" class="qSlot" data-slot="${i}" ${o.locked ? 'disabled' : ''}>${esc(v[i] || '')}</button>`).join('')}</div>${o.locked ? (good ? '' : `<p class="qHelp">Right answer: ${esc(q.a[0])}</p>`) : `<div class="qTiles">${tiles.map((t, i) => `<button type="button" class="qTile" data-tile="${esc(t)}" ${used[i] ? 'disabled' : ''}>${esc(t)}</button>`).join('')}</div>`}`;
      },
      after(box, q, v, o) { if (!o.exam && !o.locked) box.querySelector('.qTile:not(:disabled)')?.focus({ preventScroll: true }); },
      click(e, q, v) {
        const t = e.target.closest('[data-tile]'), s = e.target.closest('[data-slot]');
        if (t) return v + t.dataset.tile;
        if (s) return v.slice(0, +s.dataset.slot);
        return undefined;
      },
      keydown(e, q, v, o) {
        if (o.exam) return undefined;
        if (e.key === 'Backspace') return v.slice(0, -1);
        if (/^[a-záéíóúñ]$/i.test(e.key)) { const k = plain(e.key), rest = [...q._tiles]; [...v].forEach((c) => { const i = rest.indexOf(c); if (i >= 0) rest.splice(i, 1); }); if (rest.includes(k)) return v + k; }
        return undefined;
      },
      input: (e) => (e.target.matches('.qText') ? e.target.value : undefined),
    },
    /* A number pad on screen, so no keyboard covers the question. */
    number: {
      init: () => '',
      answered: (q, v) => String(v).trim() !== '',
      fraction: (q, v) => (Math.abs(parseFloat(String(v).replace(',', '.')) - q.a) <= (q.tol || 0.001) ? 1 : 0),
      html(q, v, o) {
        const good = o.reveal && TYPES.number.fraction(q, v), [whole, dec] = String(v).split('.'), shown = v === '' ? '' : `${Number(whole || 0).toLocaleString('en-US')}${dec != null ? `.${dec}` : ''}`;
        return `${q.hint ? `<p class="qHint">${esc(q.hint)}</p>` : ''}<div class="qDisplay ${o.reveal ? (good ? 'right' : 'wrong') : ''}" aria-live="polite"><b>${esc(shown) || '&nbsp;'}</b>${q.unit ? `<span>${esc(q.unit)}</span>` : ''}</div>${o.locked ? (good || !o.reveal ? '' : `<p class="qHelp">Right answer: ${Number(q.a).toLocaleString('en-US')}${q.unit ? ` ${esc(q.unit)}` : ''}</p>`) : `<div class="qPad">${['1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '0', '⌫'].map((k) => `<button type="button" data-key="${k}" ${k === '⌫' ? 'aria-label="Delete"' : ''}>${k}</button>`).join('')}</div>`}`;
      },
      press: (v, k) => { if (k === '⌫') return v.slice(0, -1); if (k === '.' && v.includes('.')) return v; return v.length >= 9 ? v : v + k; },
      click(e, q, v) { const b = e.target.closest('[data-key]'); return b ? TYPES.number.press(v, b.dataset.key) : undefined; },
      keydown(e, q, v) { if (/^[0-9.]$/.test(e.key)) return TYPES.number.press(v, e.key); if (e.key === 'Backspace') return TYPES.number.press(v, '⌫'); return undefined; },
    },
    written: {
      init: () => '',
      answered: (q, v) => v.trim().length > 0,
      fraction: () => null,
      html: (q, v, o) => `<textarea class="qWritten" rows="6" aria-label="Your answer" placeholder="Write your answer in full sentences" ${o.locked ? 'disabled' : ''}>${esc(v)}</textarea><p class="qCount">${v.trim() ? v.trim().split(/\s+/).length : 0} words</p>`,
      input: (e) => e.target.value,
    },
    /* One statement at a time: swipe it, or tap True or False. */
    truefalse: {
      init: (q) => q.rows.map(() => null),
      answered: (q, v) => v.every((x) => x != null),
      fraction: (q, v) => v.filter((x, i) => x === q.rows[i][1]).length / q.rows.length,
      instant: (q, v) => v.every((x) => x != null),
      html(q, v, o) {
        const cur = v.findIndex((x) => x == null);
        if (o.locked || cur < 0) return `<div class="qGrid">${q.rows.map(([t, a], i) => `<button type="button" class="qRow ${o.reveal ? (v[i] === a ? 'right' : 'wrong') : ''}" data-redo="${i}" ${o.locked ? 'disabled' : ''}><span class="qRowText">${esc(t)}</span><b>${v[i] == null ? '' : v[i] ? 'True' : 'False'}${o.reveal && v[i] !== a ? ` (it’s ${a ? 'true' : 'false'})` : ''}</b></button>`).join('')}</div>`;
        return `<div class="tfStage"><div class="tfCard" data-card>${esc(q.rows[cur][0])}</div><div class="tfBtns"><button type="button" class="tfNo" data-tf="false">✗ False</button><span>${cur + 1} of ${q.rows.length}</span><button type="button" class="tfYes" data-tf="true">✓ True</button></div></div>`;
      },
      fling(box, q, v, o, set, val) {
        const n = [...v]; n[n.findIndex((x) => x == null)] = val;
        const card = box.querySelector('[data-card]');
        if (calm() || !card) { set(n); return; }
        gsap.to(card, { x: val ? 420 : -420, rotation: val ? 14 : -14, opacity: 0, duration: .2, ease: 'power2.in', overwrite: true, onComplete: () => set(n) });
      },
      after(box, q, v, o, set) {
        const card = box.querySelector('[data-card]'); if (!card || o.locked) return;
        card.style.touchAction = 'none';
        card.addEventListener('pointerdown', (e) => {
          const sx = e.clientX; let dx = 0;
          const move = (m) => { dx = m.clientX - sx; card.style.transform = `translateX(${dx}px) rotate(${dx / 26}deg)`; card.dataset.lean = dx > 40 ? 'true' : dx < -40 ? 'false' : ''; };
          const up = () => {
            removeEventListener('pointermove', move); removeEventListener('pointerup', up); removeEventListener('pointercancel', up);
            if (Math.abs(dx) > 90) TYPES.truefalse.fling(box, q, v, o, set, dx > 0); else { card.style.transform = ''; card.dataset.lean = ''; }
          };
          addEventListener('pointermove', move); addEventListener('pointerup', up); addEventListener('pointercancel', up);
        });
      },
      click(e, q, v, o, draw, set, box) {
        const b = e.target.closest('[data-tf]'), r = e.target.closest('[data-redo]');
        if (b) { TYPES.truefalse.fling(box, q, v, o, set, b.dataset.tf === 'true'); return undefined; }
        if (r) { const n = [...v]; n[+r.dataset.redo] = null; return n; }
        return undefined;
      },
      keydown(e, q, v, o, set, box) { if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') { if (box.querySelector('[data-card]')) TYPES.truefalse.fling(box, q, v, o, set, e.key === 'ArrowRight'); return v; } return undefined; },
    },
    /* Slide along a number line. With `ruler`, you see the size you chose. */
    slider: {
      init: () => null,
      answered: (q, v) => v != null,
      fraction: (q, v) => (Math.abs(v - q.a) <= (q.tol ?? 0) ? 1 : 0),
      ruler(q, v) {
        const W = 600, x = (n) => 20 + (n / q.max) * (W - 40), ticks = Array.from({ length: q.max + 1 }, (_, n) => `<line x1="${x(n)}" x2="${x(n)}" y1="70" y2="${n % 5 ? 84 : 94}"/>${n % 5 ? '' : `<text x="${x(n)}" y="112" text-anchor="middle">${n}</text>`}`).join('');
        return `<svg viewBox="0 0 ${W} 122" role="img" aria-label="A ruler"><rect x="4" y="66" width="${W - 8}" height="54" rx="6" class="rBody"/>${ticks}<rect x="${x(0)}" y="40" width="${Math.max(3, x(v) - x(0))}" height="18" rx="9" class="rBone"/></svg>`;
      },
      html(q, v, o) {
        const cur = v ?? Math.round((q.min + q.max) / 2), pct = (n) => ((n - q.min) / (q.max - q.min)) * 100, good = o.reveal && TYPES.slider.fraction(q, v);
        const band = o.reveal ? `<i class="qBand" style="left:${pct(q.a - (q.tol ?? 0))}%;width:${pct(q.a + (q.tol ?? 0)) - pct(q.a - (q.tol ?? 0))}%"></i>` : '';
        return `${q.ruler ? `<div class="qRuler" data-ruler>${TYPES.slider.ruler(q, cur)}</div>` : ''}<div class="qLine"><output class="${o.reveal ? (good ? 'right' : 'wrong') : ''}" style="left:${pct(cur)}%">${v == null ? 'Slide me' : `${Number(cur).toLocaleString('en-US')} ${esc(q.unit || '')}`}</output><div class="qTrack">${band}<input type="range" aria-label="Your estimate" min="${q.min}" max="${q.max}" step="${q.step || 1}" value="${cur}" ${o.locked ? 'disabled' : ''}></div><div class="qEnds"><span>${Number(q.min).toLocaleString('en-US')} ${esc(q.unit || '')}</span>${o.reveal && !good ? `<b>Right answer: ${Number(q.a).toLocaleString('en-US')} ${esc(q.unit || '')}</b>` : ''}<span>${Number(q.max).toLocaleString('en-US')} ${esc(q.unit || '')}</span></div></div>`;
      },
      input: (e) => (e.target.type === 'range' ? +e.target.value : undefined),
      live(box, q, v) {
        const out = box.querySelector('output'); out.textContent = `${Number(v).toLocaleString('en-US')} ${q.unit || ''}`; out.style.left = `${((v - q.min) / (q.max - q.min)) * 100}%`;
        const r = box.querySelector('[data-ruler]'); if (r) r.innerHTML = TYPES.slider.ruler(q, v);
      },
    },
    /* Tap the bone or body part itself. */
    tap: {
      init: () => null,
      answered: (q, v) => v != null,
      fraction: (q, v) => (v === q.a ? 1 : 0),
      instant: true,
      html: (q) => `<div class="qFigure tapFig xray">${q.fig === 'body' ? window.LIB.bodyMap() : window.LIB.skeleton()}</div>`,
      after(box, q, v, o) {
        box.querySelectorAll('g[data-bone]').forEach((g) => {
          const b = g.dataset.bone;
          if (!o.locked) { g.setAttribute('tabindex', '0'); g.setAttribute('role', 'button'); g.setAttribute('aria-label', q.fig === 'body' ? 'Body part' : 'Bone'); }
          g.classList.toggle('hl', !o.reveal && b === v);
          if (o.reveal) { g.classList.toggle('isRight', b === q.a); g.classList.toggle('isWrong', b === v && b !== q.a); }
        });
      },
      click: (e) => { const g = e.target.closest('g[data-bone]'); return g ? g.dataset.bone : undefined; },
      keydown: (e) => ((e.key === 'Enter' || e.key === ' ') && e.target.closest?.('g[data-bone]') ? e.target.closest('g[data-bone]').dataset.bone : undefined),
    },
    /* Tap a real region on a map. Any map in window.MAPS works the same way. */
    region: {
      init: () => null,
      answered: (q, v) => v != null,
      fraction: (q, v) => (v === q.a ? 1 : 0),
      instant: true,
      html(q, v, o) {
        const M = window.MAPS[q.map], shape = (r, i) => (r.ring ? `<circle cx="${r.ring[0]}" cy="${r.ring[1]}" r="${r.ring[2]}"` : `<path d="${r.d}"`) + ` data-region="${r.id}" ${o.locked ? '' : 'tabindex="0" role="button"'} aria-label="Region ${i + 1}${v === r.id ? ', chosen' : ''}"/>`;
        const name = (r) => { const x = r.ring ? r.ring[0] + r.ring[2] + 20 : r.center[0], y = r.ring ? r.ring[1] + 16 : r.center[1]; return `<text x="${x}" y="${y}" text-anchor="${r.ring ? 'start' : 'middle'}">${esc(r.name)}</text>`; };
        return `<svg class="rmap" viewBox="${M.frame || M.viewBox}" role="group" aria-label="Map">${M.regions.map((r, i) => `<g class="${v === r.id ? 'on' : ''} ${o.reveal ? (r.id === q.a ? 'right' : r.id === v ? 'wrong' : '') : ''}" style="--r:${r.color}">${shape(r, i)}</g>`).join('')}${o.reveal ? M.regions.map(name).join('') : ''}</svg>`;
      },
      click: (e) => e.target.closest('[data-region]')?.dataset.region,
      keydown: (e) => ((e.key === 'Enter' || e.key === ' ') ? e.target.closest?.('[data-region]')?.dataset.region : undefined),
    },
    /* Set a height on the picture itself: drag on the mountain, or use the slider. */
    estimate: {
      init: () => null,
      answered: (q, v) => v != null,
      fraction: (q, v) => (Math.abs(v - q.a) <= (q.tol ?? 0) ? 1 : 0),
      html(q, v, o) {
        const cur = v ?? Math.round((q.min + q.max) / 2), pct = (x) => ((x - q.min) / (q.max - q.min)) * 100, show = (x) => `${Number(x).toLocaleString('en-US')} ${esc(q.unit || '')}`;
        return `<div class="qEstimate"><input type="range" aria-label="Your estimate" min="${q.min}" max="${q.max}" step="${q.step || 1}" value="${cur}" ${o.locked ? 'disabled' : ''}>
          <div class="qMountain" data-mountain><svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true"><path d="M0 100L20 76L34 48L48 22L52 8L58 24L70 52L84 78L100 100Z" fill="#5E9E38"/><path d="M34 48L48 22L52 8L58 24L70 52L60 46L52 56L44 44Z" fill="#8C7C42"/><path d="M48 22L52 8L58 24L54 20L50 26Z" fill="#F4F8FF"/></svg>
          ${o.reveal ? `<div class="qMark truth" style="bottom:${pct(q.a)}%"><b>Really about ${show(q.a)}</b></div>` : ''}<div class="qMark" data-mark style="bottom:${pct(cur)}%"><b>${v == null ? 'Drag me up or down' : show(cur)}</b></div></div></div>`;
      },
      input: (e) => (e.target.type === 'range' ? +e.target.value : undefined),
      live(box, q, v) { const m = box.querySelector('[data-mark]'); m.style.bottom = `${((v - q.min) / (q.max - q.min)) * 100}%`; m.firstChild.textContent = `${Number(v).toLocaleString('en-US')} ${q.unit || ''}`; box.querySelector('input[type=range]').value = v; },
      after(box, q, v, o, set) {
        const area = box.querySelector('[data-mountain]'); if (o.locked || !area) return;
        area.style.touchAction = 'none'; area.style.cursor = 'ns-resize';
        const at = (e) => { const r = area.getBoundingClientRect(), f = Math.max(0, Math.min(1, 1 - (e.clientY - r.top) / r.height)), step = q.step || 1, n = Math.round((q.min + f * (q.max - q.min)) / step) * step; set(n, false); TYPES.estimate.live(box, q, n); };
        area.addEventListener('pointerdown', (e) => { at(e); const up = () => { removeEventListener('pointermove', at); removeEventListener('pointerup', up); }; addEventListener('pointermove', at); addEventListener('pointerup', up); });
      },
    },
    /* Put each thing in the right box. */
    sort: {
      init: () => ({}),
      answered: (q, v) => q.items.every((_, i) => v[i] != null),
      fraction: (q, v) => q.items.filter((it, i) => v[i] === it.bin).length / q.items.length,
      html(q, v, o) {
        const chip = (it, i) => `<button type="button" class="sortChip ${o.pick === i ? 'picked' : ''} ${o.reveal ? (v[i] === it.bin ? 'right' : 'wrong') : ''}" data-sort="${i}" ${o.locked ? 'disabled' : ''}>${it.img ? `<img src="${pic(it.img)}" alt="">` : ''}${esc(it.t)}</button>`;
        const order = (q._order ||= shuffled(q.items.map((_, i) => i)));
        return `<div class="sortBank">${order.filter((i) => v[i] == null).map((i) => chip(q.items[i], i)).join('')}</div>
          <div class="sortBins">${q.bins.map((b, n) => `<div class="sortBin" data-bin="${n}" ${o.locked ? '' : 'tabindex="0" role="button"'}><b>${esc(b)}</b><div class="sortIn">${order.filter((i) => v[i] === n).map((i) => chip(q.items[i], i)).join('')}</div></div>`).join('')}</div>`;
      },
      after(box, q, v, o, set) { if (!o.locked) dragger(box, '[data-sort]', '[data-bin]', (el, bin) => { o.pick = null; set({ ...v, [el.dataset.sort]: +bin.dataset.bin }); }); },
      click(e, q, v, o, draw) {
        const c = e.target.closest('[data-sort]'), b = e.target.closest('[data-bin]');
        if (c) { o.pick = +c.dataset.sort; draw(); return undefined; }
        if (b && o.pick != null) { const i = o.pick; o.pick = null; return { ...v, [i]: +b.dataset.bin }; }
        return undefined;
      },
      keydown(e) { if (e.key === 'Enter' || e.key === ' ') e.target.closest?.('[data-bin]')?.click(); return undefined; },
    },
    /* Finish a sentence from a bank of words. */
    gaps: {
      init: (q) => q.a.map(() => null),
      answered: (q, v) => v.every(Boolean),
      fraction: (q, v) => v.filter((w, i) => (q.any ? q.a.includes(w) && v.indexOf(w) === i : w === q.a[i])).length / q.a.length,
      html(q, v, o) {
        const good = (i) => (q.any ? q.a.includes(v[i]) && v.indexOf(v[i]) === i : v[i] === q.a[i]);
        const line = esc(q.text).replace(/\{(\d+)\}/g, (m, i) => `<button type="button" class="qGap ${v[+i] ? 'filled' : ''} ${o.reveal ? (good(+i) ? 'right' : 'wrong') : ''}" data-gap="${i}" aria-label="Gap ${+i + 1}" ${o.locked ? 'disabled' : ''}>${esc(v[+i] || '')}</button>`);
        const bank = (q._bank ||= shuffled(q.bank));
        return `<p class="qSentence">${line}</p>${o.locked ? (o.reveal && !q.a.every((_, i) => good(i)) ? `<p class="qHelp">Right answer: ${esc(q.a.join(', '))}</p>` : '') : `<div class="labelBank">${bank.filter((w) => !v.includes(w)).map((w) => `<button type="button" class="chip" data-word="${esc(w)}">${esc(w)}</button>`).join('')}</div>`}`;
      },
      after(box, q, v, o, set) { if (!o.locked) dragger(box, '[data-word]', '[data-gap]', (el, gap) => { const n = [...v]; n[+gap.dataset.gap] = el.dataset.word; set(n); }); },
      click(e, q, v) {
        const w = e.target.closest('[data-word]'), g = e.target.closest('[data-gap]');
        if (w) { const n = [...v], at = n.findIndex((x) => !x); if (at >= 0) n[at] = w.dataset.word; return n; }
        if (g && v[+g.dataset.gap]) { const n = [...v]; n[+g.dataset.gap] = null; return n; }
        return undefined;
      },
    },
    /* Choose the right picture. */
    pics: {
      init: () => null,
      answered: (q, v) => v != null,
      fraction: (q, v) => (v === q.a ? 1 : 0),
      instant: true,
      html: (q, v, o) => `<div class="qPics" role="radiogroup">${q.o.map((p, k) => `<button type="button" role="radio" aria-checked="${v === k}" class="${v === k ? 'on' : ''} ${o.reveal ? (k === q.a ? 'right' : k === v ? 'wrong' : '') : ''}" data-pic="${k}" ${o.locked ? 'disabled' : ''}><img src="${pic(p.img)}" alt=""><span>${esc(p.t)}</span></button>`).join('')}</div>`,
      click: (e) => { const b = e.target.closest('[data-pic]'); return b ? +b.dataset.pic : undefined; },
    },
    /* Grab the bone and pull: the muscle gets shorter and thicker. Then say what happened. */
    contract: {
      init: () => ({ k: 100, pick: null }),
      answered: (q, v) => v.pick != null,
      fraction: (q, v) => (v.pick === q.a ? 1 : 0),
      instant: (q, v) => v.pick != null,
      muscle(k) {
        const f = k / 100, L = 300 * f, r = 44 / Math.sqrt(f), cx = 300, xl = cx - L / 2, xr = cx + L / 2;
        return `<rect x="${xl - 62}" y="16" width="24" height="178" rx="12" fill="#E9E3D2" stroke="#0005" stroke-width="2"/><rect x="${xr + 38}" y="16" width="24" height="178" rx="12" fill="#FFF4C9" stroke="#17131F" stroke-width="3"/><path d="M${xl - 40} 105L${xl} 105M${xr} 105L${xr + 40} 105" stroke="#CFC6A8" stroke-width="10" stroke-linecap="round"/><ellipse cx="${cx}" cy="105" rx="${L / 2}" ry="${r}" fill="#D9483F" stroke="#7A1B16" stroke-width="3"/>${[-0.55, -0.2, 0.15, 0.5].map((d) => `<path d="M${xl + 16} ${105 + d * r}Q${cx} ${105 + d * r * 1.1} ${xr - 16} ${105 + d * r}" fill="none" stroke="#FFFFFF44" stroke-width="3"/>`).join('')}`;
      },
      html(q, v, o) {
        const open = v.k <= 70 || o.locked;
        return `<div class="qMuscle" data-pull><svg viewBox="0 0 600 210" role="img" aria-label="A muscle between two bones" data-muscle>${TYPES.contract.muscle(v.k)}</svg></div>
          <div class="qLine small"><output style="left:${(100 - v.k) * 2.5}%" data-len>${v.k}% of its length</output><div class="qTrack"><input type="range" aria-label="Length of the muscle" min="60" max="100" value="${v.k}" style="direction:rtl" ${o.locked ? 'disabled' : ''}></div></div>
          <div class="qMuscleAsk" data-ask ${open ? '' : 'hidden'}><p class="qAskLine">${esc(q.ask)}</p><div class="qCards n${q.o.length}">${q.o.map((t, k) => `<button type="button" class="qCard ${v.pick === k ? 'on' : ''} ${state(o, k === q.a, k === v.pick)}" data-opt="${k}" ${o.locked ? 'disabled' : ''}><i>${LETTERS[k]}</i><span>${esc(t)}</span></button>`).join('')}</div></div>`;
      },
      click: (e, q, v) => { const b = e.target.closest('[data-opt]'); return b ? { ...v, pick: +b.dataset.opt } : undefined; },
      input: (e, q, v) => (e.target.type === 'range' ? { ...v, k: +e.target.value } : undefined),
      live(box, q, v) {
        box.querySelector('[data-muscle]').innerHTML = TYPES.contract.muscle(v.k);
        const len = box.querySelector('[data-len]'); len.textContent = `${v.k}% of its length`; len.style.left = `${(100 - v.k) * 2.5}%`;
        box.querySelector('input[type=range]').value = v.k;
        if (v.k <= 70) { const ask = box.querySelector('[data-ask]'); if (ask.hidden) { ask.hidden = false; box.dispatchEvent(new CustomEvent('qresize', { bubbles: true })); } }
      },
      after(box, q, v, o, set) {
        const area = box.querySelector('[data-pull]'); if (o.locked) return;
        area.style.touchAction = 'none'; area.style.cursor = 'ew-resize';
        area.addEventListener('pointerdown', (e) => {
          const sx = e.clientX, k0 = v.k, scale = 600 / area.getBoundingClientRect().width;
          let cur = v;
          const move = (m) => { cur = { ...cur, k: Math.max(60, Math.min(100, Math.round(k0 + ((m.clientX - sx) * scale) / 3))) }; set(cur, false); TYPES.contract.live(box, q, cur); };
          const up = () => { removeEventListener('pointermove', move); removeEventListener('pointerup', up); };
          addEventListener('pointermove', move); addEventListener('pointerup', up);
        });
      },
    },
    /* Drag the steps into order. */
    order: {
      init: (q) => { let order; do { order = shuffled(q.items.map((_, i) => i)); } while (order.every((x, i) => x === i)); return order; },
      answered: () => true,
      fraction: (q, v) => v.filter((x, i) => x === i).length / v.length,
      html: (q, v, o) => `<ol class="qOrder">${v.map((idx, pos) => `<li class="${o.reveal ? (idx === pos ? 'right' : 'wrong') : ''} ${o.pickO === pos ? 'picked' : ''}" data-pos="${pos}" data-idx="${idx}" ${o.locked ? '' : 'tabindex="0"'}>${q.colors ? `<i style="background:${q.colors[idx]}"></i>` : ''}<b>${pos + 1}</b><span>${esc(q.items[idx])}</span>${o.locked ? (o.reveal && idx !== pos ? `<small>goes at ${idx + 1}</small>` : '') : '<em aria-hidden="true">⠿</em>'}</li>`).join('')}</ol>`,
      after(box, q, v, o, set) {
        if (o.locked) return;
        const list = box.querySelector('.qOrder');
        list.querySelectorAll('li').forEach((li) => {
          li.style.touchAction = 'none';
          li.addEventListener('pointerdown', (e) => {
            if (e.button) return;
            const sy = e.clientY; let moved = false;
            const move = (m) => {
              if (!moved) { if (Math.abs(m.clientY - sy) < 7) return; moved = true; li.classList.add('qLifted'); }
              const other = document.elementsFromPoint(m.clientX, m.clientY).map((x) => x.closest?.('.qOrder li')).find((x) => x && x !== li);
              if (!other) return;
              const before = [...list.children].map((c) => [c, c.getBoundingClientRect().top]);
              const r = other.getBoundingClientRect();
              list.insertBefore(li, m.clientY > r.top + r.height / 2 ? other.nextSibling : other);
              if (!calm()) before.forEach(([c, t]) => { if (c !== li) { const d = t - c.getBoundingClientRect().top; if (d) gsap.fromTo(c, { y: d }, { y: 0, duration: .15, overwrite: true }); } });
            };
            const up = () => {
              removeEventListener('pointermove', move); removeEventListener('pointerup', up); removeEventListener('pointercancel', up);
              if (!moved) return;
              box._dragged = true; setTimeout(() => { box._dragged = false; }, 60);
              li.classList.remove('qLifted');
              set([...list.children].map((c) => +c.dataset.idx));
            };
            addEventListener('pointermove', move); addEventListener('pointerup', up); addEventListener('pointercancel', up);
          });
        });
      },
      /* Tapping two steps swaps them. */
      click(e, q, v, o, draw) {
        const li = e.target.closest('li[data-pos]'); if (!li) return undefined;
        const pos = +li.dataset.pos;
        if (o.pickO == null) { o.pickO = pos; draw(); return undefined; }
        const a = o.pickO, n = [...v]; o.pickO = null; [n[a], n[pos]] = [n[pos], n[a]];
        return n;
      },
      keydown(e, q, v, o, set, box) {
        const li = e.target.closest?.('li[data-pos]'); if (!li || (e.key !== 'ArrowUp' && e.key !== 'ArrowDown')) return undefined;
        const pos = +li.dataset.pos, to = pos + (e.key === 'ArrowUp' ? -1 : 1); if (to < 0 || to >= v.length) return v;
        const n = [...v]; [n[pos], n[to]] = [n[to], n[pos]];
        setTimeout(() => box.querySelector(`li[data-pos="${to}"]`)?.focus(), 0);
        return n;
      },
    },
    /* Draw a line from each thing to its match. */
    match: {
      init: () => ({}),
      answered: (q, v) => q.pairs.every((_, i) => v[i] != null),
      fraction: (q, v) => q.pairs.filter((_, i) => v[i] === i).length / q.pairs.length,
      html(q, v, o) {
        const right = (q._right ||= shuffled(q.pairs.map((_, i) => i)));
        return `<div class="qMatch"><svg class="matchLines" aria-hidden="true"></svg>
          <div class="matchCol">${q.pairs.map(([t], i) => `<button type="button" class="matchItem ${t.img ? 'hasImg' : ''} ${o.mpick === i ? 'picked' : ''} ${v[i] != null ? 'linked' : ''}" data-left="${i}" ${o.locked ? 'disabled' : ''}>${t.img ? `<img src="${pic(t.img)}" alt="">${esc(t.t)}` : esc(t)}<i class="dot"></i></button>`).join('')}</div>
          <div class="matchCol">${right.map((r) => `<button type="button" class="matchItem ${Object.values(v).includes(r) ? 'linked' : ''}" data-right="${r}" ${o.locked ? 'disabled' : ''}><i class="dot"></i>${esc(q.pairs[r][1])}</button>`).join('')}</div></div>`;
      },
      after(box, q, v, o, set) {
        const wrap = box.querySelector('.qMatch'), svg = box.querySelector('.matchLines');
        const place = (temp) => {
          if (!wrap.isConnected) return;
          const w = wrap.getBoundingClientRect();
          svg.setAttribute('viewBox', `0 0 ${w.width} ${w.height}`);
          const line = (x1, y1, x2, y2, c) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${c}" stroke-width="5" stroke-linecap="round"/>`;
          svg.innerHTML = Object.entries(v).map(([l, r]) => {
            const a = box.querySelector(`[data-left="${l}"]`).getBoundingClientRect(), b = box.querySelector(`[data-right="${r}"]`).getBoundingClientRect();
            return line(a.right - w.left, a.top + a.height / 2 - w.top, b.left - w.left, b.top + b.height / 2 - w.top, o.reveal ? (+l === r ? 'var(--q-good)' : 'var(--q-bad)') : 'var(--q-accent)');
          }).join('') + (temp ? line(temp[0] - w.left, temp[1] - w.top, temp[2] - w.left, temp[3] - w.top, 'var(--q-accent)') : '');
        };
        requestAnimationFrame(() => place());
        o.placeLines = place;
        if (o.locked) return;
        dragger(box, '[data-left]', '[data-right]', (el, t) => { const n = { ...v }, to = +t.dataset.right; Object.keys(n).forEach((k) => { if (n[k] === to) delete n[k]; }); n[+el.dataset.left] = to; o.mpick = null; set(n); }, { noGhost: true, onMove: (el, m) => { if (!m) { place(); return; } const a = el.getBoundingClientRect(); place([a.right, a.top + a.height / 2, m.clientX, m.clientY]); } });
      },
      click(e, q, v, o, draw) {
        const l = e.target.closest('[data-left]'), r = e.target.closest('[data-right]');
        if (l) { o.mpick = +l.dataset.left; draw(); return undefined; }
        if (r && o.mpick != null) {
          const n = { ...v }, target = +r.dataset.right;
          Object.keys(n).forEach((k) => { if (n[k] === target) delete n[k]; });
          n[o.mpick] = target; o.mpick = null;
          return n;
        }
        return undefined;
      },
    },
    /* Drag each name onto its place on the figure. */
    label: {
      init: () => ({}),
      answered: (q, v) => Object.keys(q.pins).every((l) => v[l]),
      fraction: (q, v) => Object.entries(q.a).filter(([l, t]) => v[l] === t).length / Object.keys(q.a).length,
      html(q, v, o) {
        const used = Object.values(v), bank = (q._bank ||= shuffled(q.bank));
        return `<div class="labelQ"><div class="qFigure labelFig xray">${q.fig === 'body' ? window.LIB.bodyMap() : window.LIB.skeleton()}${Object.entries(q.pins).map(([l, b]) => { const x = (PIN_AT[b][0] / 240) * 100, y = (PIN_AT[b][1] / 645) * 100, side = x > 50 ? 'r' : 'l', good = v[l] === q.a[l]; return `<button type="button" class="labelPin ${v[l] ? 'set' : ''} ${o.reveal ? (good ? 'right' : 'wrong') : ''}" data-pin="${l}" style="left:${x}%;top:${y}%" aria-label="Place ${l}${v[l] ? `: ${esc(v[l])}` : ''}" ${o.locked ? 'disabled' : ''}>${l}${v[l] ? `<span class="labelTag ${side}">${esc(v[l])}${o.reveal && !good ? ` → ${esc(q.a[l])}` : ''}</span>` : ''}</button>`; }).join('')}</div>
          ${o.locked ? '' : `<div class="labelBank">${bank.filter((t) => !used.includes(t)).map((t) => `<button type="button" class="chip ${o.pick === t ? 'picked' : ''}" data-chip="${esc(t)}">${esc(t)}</button>`).join('')}</div>`}</div>`;
      },
      after(box, q, v, o, set) { if (!o.locked) dragger(box, '[data-chip]', '[data-pin]', (el, pin) => { o.pick = null; set({ ...v, [pin.dataset.pin]: el.dataset.chip }); }); },
      click(e, q, v, o, draw) {
        const chip = e.target.closest('[data-chip]'), pin = e.target.closest('[data-pin]');
        if (chip) { o.pick = chip.dataset.chip; draw(); return undefined; }
        if (pin) {
          if (o.pick) { const t = o.pick; o.pick = null; return { ...v, [pin.dataset.pin]: t }; }
          if (v[pin.dataset.pin]) { const n = { ...v }; delete n[pin.dataset.pin]; return n; }
        }
        return undefined;
      },
    },
  };

  let uid = 0;
  window.MAPS = { get colombia() { return { ...window.COLOMBIA_MAP, frame: '0 100 1763 2026' }; } };
  window.QT = {
    PIN_AT,
    initial: (q) => TYPES[q.type].init(q),
    answered: (q, v) => (v == null ? false : TYPES[q.type].answered(q, v)),
    fraction: (q, v) => TYPES[q.type].fraction(q, v),
    marks(q) { return q.marks || 1; },
    autoMarked: (q) => q.type !== 'written',
    /* These check themselves as soon as the child acts, so a test shows no Check button. */
    checksItself: (q) => !!TYPES[q.type].instant,
    /* Marks given for an answer; null for a written answer, which the child checks against the model answer after an exam. */
    award(q, v) {
      if (q.type === 'written') return null;
      if (v == null || !this.answered(q, v)) return 0;
      return Math.floor(this.fraction(q, v) * this.marks(q) + 1e-9);
    },
    isCorrect(q, v) { return v != null && this.answered(q, v) && this.fraction(q, v) === 1; },
    /* Draws a question into `box`. `onChange` fires with each new answer, and `onDone` when an answer checks itself. */
    mount(oldBox, q, { value, locked = false, reveal = false, exam = false, onChange, onDone } = {}) {
      const T = TYPES[q.type], s = { uid: `q${++uid}`, locked, reveal, exam, pick: null, mpick: null };
      /* A new element each time, so old listeners can't change an answer after it's marked. */
      const box = oldBox.cloneNode(false); oldBox.replaceWith(box);
      let v = value ?? T.init(q);
      const draw = () => { box.innerHTML = T.html(q, v, s); T.after?.(box, q, v, s, commit); box.dispatchEvent(new CustomEvent('qresize', { bubbles: true })); };
      function commit(next, redraw = true) {
        v = next; onChange?.(v); if (redraw) draw();
        const inst = T.instant; if (onDone && !locked && (inst === true || (typeof inst === 'function' && inst(q, v)))) onDone(v);
      }
      box.className = `qBody qType-${q.type}`;
      draw();
      if (!locked) {
        onChange?.(v);
        box.addEventListener('click', (e) => { if (!T.click || box._dragged) return; const n = T.click(e, q, v, s, draw, commit, box); if (n !== undefined) commit(n); });
        box.addEventListener('keydown', (e) => { if (!T.keydown) return; const n = T.keydown(e, q, v, s, commit, box); if (n !== undefined) { e.preventDefault(); e.stopPropagation(); if (n !== v) commit(n); } });
        box.addEventListener('input', (e) => { if (!T.input) return; const n = T.input(e, q, v); if (n === undefined) return; v = n; onChange?.(v); T.live?.(box, q, v); const count = box.querySelector('.qCount'); if (count && typeof v === 'string') count.textContent = `${v.trim() ? v.trim().split(/\s+/).length : 0} words`; });
        addEventListener('resize', () => s.placeLines?.());
      }
      return () => v;
    },
  };
})();
