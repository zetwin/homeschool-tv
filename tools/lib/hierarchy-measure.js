// Runs inside the page (via browser-check). Measures visual hierarchy on what is visible in the window.
// See docs/rules/VISUAL-HIERARCHY.md for what each number means and the limits.
await new Promise((r) => setTimeout(r, +(window.HS_WAIT || 2500)));
const W = innerWidth, H = innerHeight;
const seen = (el) => { const r = el.getBoundingClientRect(); if (r.width < 2 || r.height < 2 || r.bottom < 0 || r.top > H || r.right < 0 || r.left > W) return null; const s = getComputedStyle(el); if (s.visibility === 'hidden' || +s.opacity < 0.05) return null; return r; };
const rgb = (c) => { const m = c.match(/[\d.]+/g); return m ? m.map(Number) : null; };
const hsl = ([r, g, b]) => { r /= 255; g /= 255; b /= 255; const mx = Math.max(r, g, b), mn = Math.min(r, g, b), l = (mx + mn) / 2, d = mx - mn; if (!d) return [0, 0, l]; const s = d / (1 - Math.abs(2 * l - 1)); let h = mx === r ? ((g - b) / d) % 6 : mx === g ? (b - r) / d + 2 : (r - g) / d + 4; return [Math.round(h * 60 + 360) % 360, s, l]; };
const loud = (c) => { const v = rgb(c); if (!v || (v[3] !== undefined && v[3] < 0.5)) return null; const [h, s, l] = hsl(v); return s > 0.45 && l > 0.2 && l < 0.8 ? h : null; };
const hueName = (h) => ['red', 'orange', 'yellow', 'yellow-green', 'green', 'teal', 'cyan', 'blue', 'indigo', 'purple', 'pink', 'red'][Math.floor(((h + 15) % 360) / 30)];

// Text: every element that directly holds visible text.
const texts = [];
for (const el of document.querySelectorAll('body *')) {
  if (![...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim())) continue;
  const r = seen(el); if (!r) continue;
  const s = getComputedStyle(el), words = [...el.childNodes].filter((n) => n.nodeType === 3).map((n) => n.textContent.trim()).join(' ').trim();
  const fixed = (() => { for (let p = el; p && p !== document.body; p = p.parentElement) { const ps = getComputedStyle(p).position; if (ps === 'fixed' || ps === 'sticky') return true; } return false; })();
  texts.push({ size: Math.round(parseFloat(s.fontSize)), weight: +s.fontWeight, color: s.color, words, area: r.width * r.height, top: r.top, bottom: r.bottom, left: r.left, right: r.right, fixed });
}
const chars = texts.reduce((a, t) => a + t.words.length, 0) || 1;
const sizes = {}; texts.forEach((t) => { sizes[t.size] = (sizes[t.size] || 0) + t.words.length; });
const bodySize = +Object.entries(sizes).sort((a, b) => b[1] - a[1])[0]?.[0] || 16;
const maxSize = Math.max(...texts.map((t) => t.size));
const biggest = texts.filter((t) => t.size === maxSize).map((t) => t.words.slice(0, 40));
const boldChars = texts.filter((t) => t.weight >= 600).reduce((a, t) => a + t.words.length, 0);
const boldLines = texts.filter((t) => t.weight >= 600).length;

// Colour: saturated hues used for text, fills and borders; filled loud areas; boxes.
const hues = new Map(); let loudFills = 0, boxes = 0, icons = 0;
for (const el of document.querySelectorAll('body *')) {
  const r = seen(el); if (!r) continue; const s = getComputedStyle(el);
  const add = (h, why) => { if (h === null) return; const n = hueName(h); hues.set(n, (hues.get(n) || 0) + 1); };
  add(loud(s.color)); const bg = loud(s.backgroundColor); add(bg);
  if (bg !== null && r.width * r.height > 900) loudFills++;
  if (parseFloat(s.borderTopWidth) > 0 && s.borderTopStyle !== 'none' && r.width > 6) add(loud(s.borderTopColor));
  const hasBox = (parseFloat(s.borderTopWidth) > 0 && parseFloat(s.borderBottomWidth) > 0 && s.borderTopStyle !== 'none') || (rgb(s.backgroundColor)?.[3] !== 0 && s.backgroundColor !== getComputedStyle(el.parentElement || el).backgroundColor && parseFloat(s.borderRadius) > 0);
  if (hasBox && r.width > 60 && r.height > 30) boxes++;
  if (el.tagName === 'svg' && r.width < 40) icons++;
}
// Use of space: width spanned by the page's own text (not fixed bars), and the biggest empty band between texts.
const body = texts.filter((t) => !t.fixed);
const span = body.length ? (Math.min(W, Math.max(...body.map((t) => t.right))) - Math.max(0, Math.min(...body.map((t) => t.left)))) / W : 0;
const pics = [...document.querySelectorAll('img, svg, canvas, video, picture, [style*="background-image"]')].map(seen).filter((r) => r && r.width >= 40 && r.height >= 40);
const ys = [...texts, ...pics].map((t) => [Math.max(0, t.top), Math.min(H, t.bottom)]).sort((a, b) => a[0] - b[0]);
let gap = 0, reach = ys.length ? ys[0][1] : 0;
for (const [t, b] of ys) { gap = Math.max(gap, t - reach); reach = Math.max(reach, b); }
const smallest = Math.min(...texts.map((t) => t.size));
const out = {
  widthUsed: Math.round(span * 100), emptyBand: Math.round((gap / H) * 100), smallestSize: smallest,
  page: location.href.replace(location.origin, ''), window: `${W}x${H}`,
  fontSizes: Object.keys(sizes).map(Number).sort((a, b) => b - a),
  weights: [...new Set(texts.map((t) => t.weight))].sort((a, b) => a - b),
  bodySize, biggestSize: maxSize, biggestText: [...new Set(biggest)].slice(0, 4), topToBody: +(maxSize / bodySize).toFixed(2),
  boldShare: Math.round((boldChars / chars) * 100), boldLines, textLines: texts.length,
  loudHues: [...hues.keys()], loudFills, boxes, smallIcons: icons,
};
return JSON.stringify(out);
