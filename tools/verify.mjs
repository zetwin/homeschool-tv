// One command before showing anything: node tools/verify.mjs
// Checks disk space, every voice file, the Wi-Fi address, and that each lesson really starts speaking, in a hidden muted browser.
// Exits with 1 if anything fails. No approval needed. Add --lessons to also check each lesson's opening, ending and videos.
import { execFileSync, spawnSync } from 'node:child_process';
import { findTool } from './lib/find.mjs';
import { hostname } from 'node:os';
import { existsSync, readFileSync, writeFileSync, mkdtempSync, rmSync } from 'node:fs';
import { networkInterfaces, tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
const PORT = process.env.PORT || 8080;
const problems = [], ok = (t) => console.log(`OK   ${t}`), bad = (t) => { problems.push(t); console.log(`FAIL ${t}`); };
/* Disk */
const free = process.platform === 'win32' ? 99 : Math.floor(+execFileSync('df', ['-k', '.'], { encoding: 'utf8' }).split('\n')[1].trim().split(/\s+/)[3] / 1048576);
if (free < 5) bad(`Only ${free} GB free on the disk`); else ok(`${free} GB free on the disk`);
/* Voice files really decode, and match their recorded length. */
const dir = resolve('channel/assets/voice/en'), manifest = JSON.parse(readFileSync(join(dir, 'manifest.json'), 'utf8'));
const probe = findTool('ffprobe');
const broken = Object.entries(manifest).filter(([id, v]) => { const f = join(dir, `${id}.mp3`); if (!existsSync(f)) return true; const r = spawnSync(probe, ['-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', f], { encoding: 'utf8' }); return r.status !== 0 || Math.abs(+r.stdout - v.seconds) > .6; }).map(([id]) => id);
if (broken.length) bad(`${broken.length} voice files missing or damaged, such as ${broken[0]}`); else ok(`${Object.keys(manifest).length} voice files are fine`);
/* The address the TV and tablets use. */
const ip = Object.values(networkInterfaces()).flat().find((n) => n.family === 'IPv4' && !n.internal && (n.address.startsWith('192.168.') || n.address.startsWith('10.')))?.address;
const hit = async (u) => { try { return (await fetch(u, { signal: AbortSignal.timeout(4000) })).ok; } catch (e) { return false; } };
const host = process.platform === 'darwin' ? execFileSync('scutil', ['--get', 'LocalHostName'], { encoding: 'utf8' }).trim() : hostname();
if (await hit(`http://localhost:${PORT}/`)) ok('Server is running'); else bad('Server is not running: node tools/serve.mjs --lan');
if (ip && await hit(`http://${ip}:${PORT}/`)) ok(`Wi-Fi address opens: http://${ip}:${PORT}`); else bad('The Wi-Fi address does not open. Start the server with --lan');
if (await hit(`http://${host}.local:${PORT}/`)) ok(`Stable name opens: http://${host}.local:${PORT}`); else console.log(`NOTE http://${host}.local:${PORT} did not open`);
/* Each lesson starts speaking, from the Wi-Fi address. */
if (ip) {
  const work = mkdtempSync(join(tmpdir(), 'hs-verify-')), js = join(work, 'v.js');
  writeFileSync(js, `const sleep=ms=>new Promise(r=>setTimeout(r,ms));await sleep(800);const out=[];for(const ep of window.EPISODES){openEpisode(ep,0);await sleep(6000);out.push([ep.id,P.audio.currentTime>0&&!P.audio.error,P.audio.muted]);closePlayer();await sleep(250);}Object.keys(localStorage).filter(k=>k.startsWith('hs-place-')).forEach(k=>localStorage.removeItem(k));return out;`);
  const r = spawnSync('node', ['tools/browser-check.mjs', `http://${ip}:${PORT}/`, js, '1280', '800'], { encoding: 'utf8', timeout: 120000 });
  rmSync(work, { recursive: true, force: true });
  try { const d = JSON.parse(r.stdout); d.result.forEach(([id, spoke, muted]) => { if (spoke && !muted) ok(`Voice starts: ${id}`); else bad(`Voice does not start: ${id}`); }); const real = d.pageErrors.filter((e) => !e.includes('favicon')); if (real.length) bad(`Page errors: ${real[0].slice(0, 120)}`); } catch (e) { bad('Could not run the lesson check'); }
}
if (process.argv.includes('--lessons')) { const r = spawnSync('node', ['tools/check-lesson.mjs'], { encoding: 'utf8' }); console.log(r.stdout); if (r.status) bad('Some lessons do not follow the lesson rules yet'); }
console.log(problems.length ? `\n${problems.length} problem(s). Don't show this yet.` : '\nAll checks passed. A person still has to listen and watch.');
process.exit(problems.length ? 1 : 0);
