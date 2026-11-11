// Visual hierarchy check: does the eye know where to look first? Hidden, muted browser, no approval needed.
// Usage: node tools/hierarchy-check.mjs <url> [more urls] [--size 1180x820] [--out folder]
// For each page it measures type sizes, bold, loud colours and boxes, and saves two pictures:
// <name>.png as it is, and <name>-squint.png blurred, the "squint test": the main thing must still stand out.
// The limits come from docs/rules/VISUAL-HIERARCHY.md. A CHECK isn't always wrong, but it needs a reason.
import { execFileSync } from 'node:child_process';
import { mkdirSync, writeFileSync, mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
const here = dirname(fileURLToPath(import.meta.url));
const args = process.argv.slice(2), urls = [], opt = { size: '1180x820', out: join(tmpdir(), 'hs-hierarchy'), minBody: 18 };
for (let i = 0; i < args.length; i++) { if (args[i] === '--size') opt.size = args[++i]; else if (args[i] === '--out') opt.out = args[++i]; else if (args[i] === '--min-body') opt.minBody = +args[++i]; else urls.push(args[i]); }
if (!urls.length) { console.log('Usage: node tools/hierarchy-check.mjs <url> [more urls] [--size 1180x820] [--min-body 18] [--out folder]'); process.exit(1); }
mkdirSync(opt.out, { recursive: true });
const [w, h] = opt.size.split('x'), work = mkdtempSync(join(tmpdir(), 'hs-hier-')), blur = join(work, 'blur.js');
writeFileSync(blur, "await new Promise((r) => setTimeout(r, 2500)); document.documentElement.style.filter = 'blur(7px)'; return 'ok';");
const run = (url, file, shot) => JSON.parse(execFileSync('node', [join(here, 'browser-check.mjs'), url, file, w, h, ...(shot ? [shot] : [])], { encoding: 'utf8', maxBuffer: 1 << 24 }));

// Limits: [what, value, ok?, why it matters]
const judge = (m) => [
  ['Body text size', `${m.bodySize}px`, m.bodySize >= opt.minBody, `Body at least ${opt.minBody}px: some parents can't read small text (--min-body to change; 20 for the parent pad on iPad)`],
  ['Smallest text', `${m.smallestSize}px`, m.smallestSize >= opt.minBody - 2, `Nothing under ${opt.minBody - 2}px`],
  ['Width used', `${m.widthUsed}%`, m.widthUsed >= 85, 'Content spreads over at least 85% of the width, not a narrow column'],
  ['Biggest empty band', `${m.emptyBand}% of the height`, m.emptyBand <= 15, 'No empty strip over 15% of the screen: make things bigger instead'],
  ['Text sizes on screen', m.fontSizes.length, m.fontSizes.length <= 4, 'At most 4 sizes: main, heading, body, small'],
  ['Text weights', m.weights.join(', '), m.weights.length <= 2 && m.weights[0] >= 400, 'Two weights, regular and one bold, nothing thinner than regular'],
  ['Biggest text vs body', `${m.topToBody}x`, m.topToBody >= 1.6, 'The main thing is at least 1.6 times the body text'],
  ['Bold share of words', `${m.boldShare}%`, m.boldShare <= 30, 'If more than about a third is bold, nothing is'],
  ['Loud colours', m.loudHues.length, m.loudHues.length <= 3, 'One accent, plus up to two that mean something (done, problem)'],
  ['Loud filled areas', m.loudFills, m.loudFills <= 3, 'Strong colour fills pull the eye; keep them for the main action'],
  ['Boxes', m.boxes, m.boxes <= 8, 'Space groups things first; too many boxes make every block equal'],
];
let fails = 0;
for (const url of urls) {
  const name = (new URL(url).hash.slice(1) || new URL(url).pathname.replace(/\W+/g, '-') || 'page').replace(/\W+/g, '-').slice(0, 60);
  const r = run(url, join(here, 'lib', 'hierarchy-measure.js'), join(opt.out, `${name}.png`));
  if (r.thrown || !r.result) { console.log(`\n${url}\n  could not measure: ${r.thrown || 'no result'}`); fails++; continue; }
  const m = JSON.parse(r.result); run(url, blur, join(opt.out, `${name}-squint.png`));
  console.log(`\n${url.replace(/^https?:\/\/[^/]+/, '')}  (${m.window})`);
  console.log(`  Biggest text: ${m.biggestSize}px "${m.biggestText.join('", "')}"  — is this the most important thing?`);
  console.log(`  Sizes: ${m.fontSizes.join(', ')}px, body ${m.bodySize}px. Bold lines ${m.boldLines} of ${m.textLines}. Loud colours: ${m.loudHues.join(', ') || 'none'}. Small icons: ${m.smallIcons}`);
  for (const [what, v, ok, why] of judge(m)) { if (!ok) fails++; console.log(`  ${ok ? 'ok   ' : 'CHECK'} ${what}: ${v}. ${why}`); }
  console.log(`  Pictures: ${join(opt.out, name)}.png and ${name}-squint.png. Squint test: in the blurred one, can you still tell the one main thing?`);
}
rmSync(work, { recursive: true, force: true });
console.log(fails ? `\n${fails} CHECK${fails > 1 ? 's' : ''}. Fix them or write down why each is right.` : '\nAll measured limits pass. Still look at the squint pictures yourself.');
process.exit(fails ? 1 : 0);
