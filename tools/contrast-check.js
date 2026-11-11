// Measures the contrast of every piece of text on the screen against the colour really behind it.
// Run in a hidden browser: node tools/browser-check.mjs "<url>?pad=widgets&t=1.4&c=1" tools/contrast-check.js 1180 820 [shot.png]
// pad: a parent pad design to open while signed in as the first parent. t: text size (1, 1.2, 1.4). c=1: strong contrast. admin=1: open Admin. tab=<me|plan|diary|timetable...>: then open that page. open=<page>: open a pad page.
// Fails text under 4.5:1, or under 3:1 when it's large (24px, or 18.7px bold). Prints the worst ones.
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
for (let i = 0; i < 40 && !window.renderParent; i++) await sleep(250);
const q = new URLSearchParams(location.search);
if (q.get('pad')) {
  localStorage.setItem('hs-session-v2', JSON.stringify({ role: 'parent', id: Store.data.parents[0].id }));
  await window.renderParent('today'); await sleep(400);
  /* Opening a page reloads the family from the server, so the look and reading settings are set again after each tap. */
  const set = async () => { const me = Store.me(); me.padLook = q.get('pad'); me.textSize = +(q.get('t') || 1); me.contrast = q.get('c') === '1'; window.Pad?.applyReading(); if (!document.querySelector('.padRoot.outside')) window.drawParent(); await sleep(900); };
  await set();
  if (q.get('admin') === '1') { document.querySelector('.tool[data-ptab="family"]')?.click(); await sleep(700); await set(); }
  if (q.get('tab')) { const tap = () => document.querySelector(`[data-ptab="${q.get('tab')}"]`)?.click(); tap(); await sleep(900); await set(); tap(); await sleep(900); }
  if (q.get('open')) { document.querySelector(`[data-padopen="${q.get('open')}"]`)?.click(); await sleep(500); }
}
const parse = (c) => { const m = c.match(/rgba?\(([^)]+)\)/); if (!m) return null; const p = m[1].split(/[ ,/]+/).filter(Boolean).map(Number); return { r: p[0], g: p[1], b: p[2], a: p.length > 3 ? p[3] : 1 }; };
const lum = ({ r, g, b }) => { const f = (v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; }; return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b); };
const over = (top, under) => ({ r: top.r * top.a + under.r * (1 - top.a), g: top.g * top.a + under.g * (1 - top.a), b: top.b * top.a + under.b * (1 - top.a), a: 1 });
function backOf(el) {
  const layers = [];
  for (let e = el; e; e = e.parentElement) {
    const st = getComputedStyle(e);
    if (st.backgroundImage !== 'none' && !st.backgroundImage.startsWith('linear-gradient(transparent')) return null; // a picture behind: can't measure
    const c = parse(st.backgroundColor); if (c && c.a > 0) { layers.push(c); if (c.a >= 1) break; }
  }
  let bg = { r: 255, g: 255, b: 255, a: 1 };
  for (let i = layers.length - 1; i >= 0; i--) bg = over(layers[i], bg);
  return bg;
}
const bad = [], seen = new Set(); let checked = 0, worst = 99;
document.querySelectorAll('body *').forEach((el) => {
  if (!el.closest('.padRoot, .cabinet, .padPanel, .dSheet') || el.closest('[aria-hidden="true"]')) return;
  const own = [...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim()); if (!own) return;
  const r = el.getBoundingClientRect(); if (!r.width || !r.height) return;
  const st = getComputedStyle(el); if (st.visibility === 'hidden' || +st.opacity === 0) return;
  const fg = parse(st.color), bg = backOf(el); if (!fg || !bg) return;
  const L1 = lum(over(fg, bg)), L2 = lum(bg), ratio = (Math.max(L1, L2) + 0.05) / (Math.min(L1, L2) + 0.05);
  const size = parseFloat(st.fontSize), large = size >= 24 || (size >= 18.66 && +st.fontWeight >= 700), need = large ? 3 : 4.5;
  checked++; worst = Math.min(worst, ratio);
  const key = `${el.textContent.trim().slice(0, 30)}|${ratio.toFixed(2)}`;
  if (ratio < need && !seen.has(key)) { seen.add(key); bad.push(`${ratio.toFixed(2)}:1 "${el.textContent.trim().slice(0, 30)}" ${st.color} on rgb(${Math.round(bg.r)},${Math.round(bg.g)},${Math.round(bg.b)})`); }
});
/* Cut and overlapping text: a text cut by a box that hides overflow, shortened with "…", or drawn over another text. */
const texts = [...document.querySelectorAll('.padRoot *, .cabinet *')].filter((e) => !e.closest('.srOnly') && [...e.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim()) && e.getBoundingClientRect().width && getComputedStyle(e).visibility !== 'hidden' && !e.closest('[aria-hidden="true"]'));
/* The part of a text you can really see, after every box that hides overflow. Text scrolled out of a list or a swipe row isn't a fault. */
function shown(e) {
  let r = e.getBoundingClientRect(), box = { left: r.left, right: r.right, top: r.top, bottom: r.bottom };
  for (let a = e.parentElement; a && a !== document.body; a = a.parentElement) {
    const as = getComputedStyle(a); if (as.overflow === 'visible' && as.overflowX === 'visible' && as.overflowY === 'visible') continue;
    const b = a.getBoundingClientRect(); box = { left: Math.max(box.left, b.left), right: Math.min(box.right, b.right), top: Math.max(box.top, b.top), bottom: Math.min(box.bottom, b.bottom) };
  }
  return box.right - box.left > 2 && box.bottom - box.top > 2 ? box : null;
}
const scroller = (e) => { for (let a = e.parentElement; a && a !== document.body; a = a.parentElement) { const as = getComputedStyle(a); if ((/auto|scroll/.test(as.overflowX) && a.scrollWidth > a.clientWidth + 1) || (/auto|scroll/.test(as.overflowY) && a.scrollHeight > a.clientHeight + 1)) return a; } return null; };
const cut = [];
texts.forEach((e) => {
  const r = e.getBoundingClientRect(), st = getComputedStyle(e), name = e.textContent.trim().slice(0, 24);
  if (st.textOverflow === 'ellipsis' && e.scrollWidth > e.clientWidth + 1) { cut.push(`"…" ${name}`); return; }
  const vis = shown(e); if (!vis) { if (!scroller(e)) cut.push(`hidden: ${name}`); return; }
  if (scroller(e)) { if (vis.right - vis.left < r.width - 1 && vis.right - vis.left < 40) cut.push(`half shown: ${name}`); return; }
  if (r.right > innerWidth + 1 || r.bottom > innerHeight + 1 && !e.closest('.padRoot main, .admBody, .padPanel')) { cut.push(`off screen: ${name}`); return; }
  for (let a = e.parentElement; a && a !== document.body; a = a.parentElement) {
    const as = getComputedStyle(a); if (as.overflow === 'visible' && as.overflowX === 'visible' && as.overflowY === 'visible') continue;
    const b = a.getBoundingClientRect(), scrolls = (as.overflowY === 'auto' || as.overflowY === 'scroll') && a.scrollHeight > a.clientHeight;
    if (r.left < b.left - 1 || r.right > b.right + 1 || (!scrolls && (r.top < b.top - 1 || r.bottom > b.bottom + 1))) { cut.push(`cut by its box: ${name}`); break; }
    break;
  }
});
const overlap = [];
for (let i = 0; i < texts.length; i++) for (let j = i + 1; j < texts.length; j++) {
  const a = texts[i], b = texts[j]; if (a.contains(b) || b.contains(a)) continue;
  if (a.closest('.admWrap') && !b.closest('.admWrap') || b.closest('.admWrap') && !a.closest('.admWrap')) continue;
  if (a.closest('#padSheet') && !b.closest('#padSheet') || b.closest('#padSheet') && !a.closest('#padSheet')) continue;
  const p = shown(a), q = shown(b); if (!p || !q) continue;
  const w = Math.min(p.right, q.right) - Math.max(p.left, q.left), h = Math.min(p.bottom, q.bottom) - Math.max(p.top, q.top);
  if (w > 3 && h > 3) overlap.push(`${a.textContent.trim().slice(0, 16)} / ${b.textContent.trim().slice(0, 16)}`);
}
/* A button you can see that says nothing: no visible words and no label. */
const empty = [...document.querySelectorAll('.padRoot button, .cabinet button')].filter((b) => { const r = b.getBoundingClientRect(); return r.width > 20 && r.height > 20 && shown(b) && !b.innerText.trim() && !b.getAttribute('aria-label'); }).map((b) => b.className || 'button');
const small = [...document.querySelectorAll('.padRoot *, .cabinet *')].filter((e) => [...e.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim()) && e.getBoundingClientRect().width && parseFloat(getComputedStyle(e).fontSize) < 14).map((e) => `${e.textContent.trim().slice(0, 20)}: ${getComputedStyle(e).fontSize}`);
const main = document.querySelector('.padRoot > main, .cabMain'), page = document.scrollingElement;
return { checked, worst: +worst.toFixed(2), fails: bad.slice(0, 12), cut: cut.slice(0, 8), overlap: overlap.slice(0, 6), emptyButtons: empty.slice(0, 6), smallText: small.slice(0, 6), pageScrolls: page.scrollHeight > innerHeight + 1, mainOverflow: main ? main.scrollHeight - main.clientHeight : null, wide: document.documentElement.scrollWidth > innerWidth };
