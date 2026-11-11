// Renders Kid Lab art to channel/kid-lab/art. Usage: node tools/kid-art/render.mjs <scene> [pad|phone|icon] [item ...]
// Uses a muted, hidden browser, and removes its temporary profile afterwards. Prints where the tap points fall.
import { findBrowser } from '../lib/find.mjs';
import { execFileSync, spawn } from 'node:child_process';
import { mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
const [scene, ...rest] = process.argv.slice(2);
const SIZES = { pad: [2360, 1640], phone: [780, 1688], icon: [640, 640] };
const edge = findBrowser();
const server = spawn('python3', ['-m', 'http.server', '8765', '--bind', '127.0.0.1'], { cwd: resolve('.'), stdio: 'ignore' });
await new Promise((r) => setTimeout(r, 900));
const work = mkdtempSync(join(tmpdir(), 'hs-art-'));
const jobs = rest[0] === 'icon' ? rest.slice(1).map((item) => ['icon', item]) : (rest.length ? rest : ['pad', 'phone']).map((d) => [d, '']);
try {
  for (const [dev, item] of jobs) {
    const [w, h] = SIZES[dev], name = item ? `icon-${item}` : `${scene}-${dev}`;
    const url = `http://127.0.0.1:8765/tools/kid-art/page.html?scene=${scene}&dev=${dev}&w=${w}&h=${h}&item=${item}`;
    const dom = execFileSync(edge, ['--headless=new', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--mute-audio', '--hide-scrollbars', '--no-first-run', `--user-data-dir=${join(work, 'p')}`, '--window-size=800,600', '--virtual-time-budget=90000', '--dump-dom', url], { encoding: 'utf8', timeout: 280000, maxBuffer: 4e8, stdio: ['ignore', 'pipe', 'ignore'] });
    const spots = /<pre id="spots"[^>]*>(.*?)<\/pre>/s.exec(dom)?.[1], data = /<pre id="png"[^>]*>data:image\/png;base64,(.*?)<\/pre>/s.exec(dom)?.[1];
    if (!data) { console.log(name, 'FAILED: no picture'); continue; }
    const png = resolve(`channel/kid-lab/art/${name}.png`);
    writeFileSync(png, Buffer.from(data, 'base64'));
    if (dev !== 'icon') { execFileSync('sips', ['-s', 'format', 'jpeg', '-s', 'formatOptions', '86', png, '--out', png.replace('.png', '.jpg')], { stdio: 'ignore' }); rmSync(png); }
    console.log(name, spots || '');
  }
} finally { server.kill(); rmSync(work, { recursive: true, force: true }); }
