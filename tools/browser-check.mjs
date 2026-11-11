// Runs a check in a hidden, muted Edge, without touching any browser a person is using, and without asking for approval.
// Usage: node tools/browser-check.mjs <url> <file with JS to run> [width] [height] [screenshot.png]
// The script's last expression is printed as JSON. A new profile is used each time and removed afterwards.
import { findBrowser } from './lib/find.mjs';
import { spawn } from 'node:child_process';
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
const [url, file, w = '1180', h = '820', shot] = process.argv.slice(2);
const edge = findBrowser();
const work = mkdtempSync(join(tmpdir(), 'hs-check-'));
const port = 9300 + Math.floor(Math.random() * 400);
const proc = spawn(edge, ['--headless=new', '--mute-audio', '--autoplay-policy=no-user-gesture-required', '--hide-scrollbars', '--no-first-run', `--remote-debugging-port=${port}`, `--user-data-dir=${join(work, 'p')}`, `--window-size=${w},${h}`, 'about:blank'], { stdio: 'ignore' });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
let code = 1;
try {
  let tab; for (let i = 0; i < 40 && !tab; i++) { await sleep(250); try { tab = (await (await fetch(`http://127.0.0.1:${port}/json`)).json()).find((t) => t.type === 'page'); } catch (e) {} }
  const ws = new WebSocket(tab.webSocketDebuggerUrl); await new Promise((r) => { ws.onopen = r; });
  let id = 0; const wait = new Map(), errors = [];
  ws.onmessage = (m) => { const d = JSON.parse(m.data); if (d.id) { wait.get(d.id)?.(d); wait.delete(d.id); } if (d.method === 'Runtime.exceptionThrown') errors.push(d.params.exceptionDetails.exception?.description || d.params.exceptionDetails.text); if (d.method === 'Log.entryAdded' && d.params.entry.level === 'error') errors.push(`${d.params.entry.text} ${d.params.entry.url || ''}`); };
  const send = (method, params = {}) => new Promise((r) => { const n = ++id; wait.set(n, r); ws.send(JSON.stringify({ id: n, method, params })); });
  await send('Runtime.enable'); await send('Log.enable'); await send('Page.enable');
  await send('Emulation.setDeviceMetricsOverride', { width: +w, height: +h, deviceScaleFactor: 1, mobile: +w < 700 });
  /* Our own checks must not fill the family's activity log. */
  await send('Page.addScriptToEvaluateOnNewDocument', { source: 'window.HS_NO_LOG = true;' });
  await send('Page.navigate', { url }); await sleep(2500);
  const js = file && file !== '-' ? readFileSync(file, 'utf8') : 'document.title';
  const r = await send('Runtime.evaluate', { expression: `(async()=>{ return await (async()=>{${js}})(); })()`, awaitPromise: true, returnByValue: true, timeout: 280000 });
  if (shot) { await sleep(400); const p = await send('Page.captureScreenshot', { format: 'png' }); writeFileSync(shot, Buffer.from(p.result.data, 'base64')); }
  console.log(JSON.stringify({ result: r.result?.result?.value, thrown: r.result?.exceptionDetails?.exception?.description, pageErrors: errors }, null, 1));
  code = 0;
} finally { proc.kill(); await sleep(300); rmSync(work, { recursive: true, force: true }); }
process.exit(code);
