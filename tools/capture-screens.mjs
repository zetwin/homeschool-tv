// Takes a thumbnail of every page in channel/screens-list.js, at the size its reader really sees it.
// Usage: [PORT=8081] node tools/capture-screens.mjs [id ...]   (the server must be running; port 8080 unless PORT is set)
import { findBrowser } from './lib/find.mjs';
import { execFileSync } from 'node:child_process';
import { mkdirSync, mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

globalThis.window = {};
await import(pathToFileURL(resolve('channel/screens-list.js')).href);
const browser = findBrowser();
const out = resolve('channel/assets/screens');
mkdirSync(out, { recursive: true });
const only = process.argv.slice(2);
const work = mkdtempSync(join(tmpdir(), 'hs-capture-'));
for (const item of window.SCREEN_GROUPS.flatMap((g) => g.items)) {
  if (only.length && !only.includes(item.id)) continue;
  if (item.img) continue; /* shares another page's picture */
  const route = item.href || (item.shot ? `#shot-${item.shot}` : `#screen-${item.id}`);
  const [w, h] = window.SCREEN_SIZES[item.size];
  const png = join(work, `${item.id}.png`);
  execFileSync(browser, ['--headless=new', '--disable-gpu', '--hide-scrollbars', '--no-first-run', `--user-data-dir=${join(work, 'profile')}`, `--window-size=${w},${h}`, '--virtual-time-budget=4000', `--screenshot=${png}`, `http://localhost:${process.env.PORT || 8080}/${route}`], { stdio: 'ignore' });
  execFileSync('sips', ['-Z', '800', '-s', 'format', 'jpeg', '-s', 'formatOptions', '72', png, '--out', join(out, `${item.id}.jpg`)], { stdio: 'ignore' });
  console.log(item.id);
}
rmSync(work, { recursive: true, force: true });
