// Checks every look in the lab, at every section and device size, in a hidden muted browser. No approval needed.
// Reports anything off the screen or cut off, and saves a picture of each. Usage: node tools/lab-check.mjs <output folder> [look ids, comma separated]
import { findBrowser } from './lib/find.mjs';
import { spawn } from 'node:child_process';
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
const [out, only] = process.argv.slice(2); mkdirSync(out, { recursive: true });
const work = mkdtempSync(join(tmpdir(), 'hs-lab-')), port = 9700 + Math.floor(Math.random() * 200);
const proc = spawn(findBrowser(), ['--headless=new', '--mute-audio', '--hide-scrollbars', '--no-first-run', `--remote-debugging-port=${port}`, `--user-data-dir=${join(work, 'p')}`, '--window-size=1500,1000', 'about:blank'], { stdio: 'ignore' });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
let tab; for (let i = 0; i < 40 && !tab; i++) { await sleep(250); try { tab = (await (await fetch(`http://127.0.0.1:${port}/json`)).json()).find((t) => t.type === 'page'); } catch (e) {} }
const ws = new WebSocket(tab.webSocketDebuggerUrl); await new Promise((r) => { ws.onopen = r; });
let id = 0; const wait = new Map(), errors = new Set();
ws.onmessage = (m) => { const d = JSON.parse(m.data); if (d.id) { wait.get(d.id)?.(d); wait.delete(d.id); } if (d.method === 'Runtime.exceptionThrown') errors.add(d.params.exceptionDetails.exception?.description?.slice(0, 200)); if (d.method === 'Log.entryAdded' && d.params.entry.level === 'error') errors.add(`${d.params.entry.text.slice(0, 90)} ${d.params.entry.url || ''}`); };
const send = (method, params = {}) => new Promise((r) => { const n = ++id; wait.set(n, r); ws.send(JSON.stringify({ id: n, method, params })); });
const ev = async (expression) => { const r = await send('Runtime.evaluate', { expression, awaitPromise: true, returnByValue: true }); if (r.result.exceptionDetails) throw new Error(r.result.exceptionDetails.exception?.description); return r.result.result.value; };
await send('Runtime.enable'); await send('Log.enable'); await send('Page.enable');
await send('Page.navigate', { url: 'http://localhost:8080/kid-lab/' }); await sleep(2500);
const SECS = { K: ['', 'shelf', 'board', 'wall', 'diary'], L: ['route', 'backpack', 'logbook'], N: ['now', 'next', 'library', 'scores'], P: ['now', 'later', 'week', 'marks'], Q: ['0', '1', '2', '3'], R: ['items:1', 'quests', 'journal', 'stats'] };
const DEFS = await ev('JSON.stringify(Object.fromEntries(Object.entries(window.LOOKS).map(([k, v]) => [k, v.sections || SECS_FALLBACK(k)])))'.replace('SECS_FALLBACK(k)', '[]')).then(JSON.parse);
const looks = (only ? only.split(',') : Object.keys(DEFS));
const problems = [];
for (const look of looks) for (const [dev, w, h] of (DEFS[look].devs || [['pad', 1180, 820], ['phone', 390, 844]])) {
  const secs = DEFS[look].length ? DEFS[look] : SECS[look];
  for (const sec of secs) {
    await send('Emulation.setDeviceMetricsOverride', { width: w, height: h, deviceScaleFactor: 1, mobile: false });
    const res = await ev(`(async () => { S.d=${JSON.stringify(look)}; S.all=false; S.dev=${JSON.stringify(dev)}; S.sec[S.d]=${JSON.stringify(sec)}; document.body.style.padding='0'; document.getElementById('stage')?.remove; draw();
      let sc=document.querySelector('.fit > .screen'); const c=sc.cloneNode(true); c.style.transform='none'; c.style.position='fixed'; c.style.left='0'; c.style.top='0'; c.style.zIndex='9'; c.style.pointerEvents='auto'; document.body.append(c); document.getElementById('clone')?.remove(); c.id='clone';
      await document.fonts.ready; await new Promise(r=>setTimeout(r,450));
      await Promise.all([...c.querySelectorAll('img')].map(i=>i.complete?1:new Promise(r=>{i.onload=i.onerror=r})));
      const S0=c.getBoundingClientRect(), bad=[];
      c.querySelectorAll('h2,h3,b,small,p,span,li,button,td,th,time,em,strong').forEach(e=>{ const r=e.getBoundingClientRect(); if(!r.width||!r.height||!(e.textContent||'').trim()) return; if(e.closest('.side')||e.closest('[hidden]')) return; let sc=false; for(let p=e.parentElement;p&&p!==c;p=p.parentElement){const o=getComputedStyle(p).overflowY; if(o==='auto'||o==='scroll'){sc=true;break;}} const hor=r.right>S0.right+1||r.left<S0.left-1; if(hor||(!sc&&(r.bottom>S0.bottom+1||r.top<S0.top-1))) bad.push('OFF:'+e.tagName+':'+e.textContent.trim().slice(0,28)); });
      c.querySelectorAll('*').forEach(e=>{ if(e.closest('.side')||['IMG','svg','path','circle','HTML'].includes(e.tagName)||e.matches('.glowBg')) return; const st=getComputedStyle(e); if((st.overflow==='hidden'||st.overflow==='clip'||st.webkitLineClamp!=='none') && e.scrollHeight>e.clientHeight+2 && e.clientHeight>0 && !e.matches('.h,.screen')) bad.push('CUT:'+(e.className||e.tagName)+':'+(e.textContent||'').trim().slice(0,24)); });
      c.querySelectorAll('button').forEach(e=>{ const r=e.getBoundingClientRect(); if(e.closest('.side')||!r.width||e.closest('.sTap')) return; if(r.height<40&&(e.textContent||'').trim()) bad.push('SMALL:'+e.textContent.trim().slice(0,20)+':'+Math.round(r.height)); });
      c.querySelectorAll('img').forEach(i=>{ if(i.complete&&!i.naturalWidth) bad.push('NOIMG:'+i.getAttribute('src')); });
      return [...new Set(bad)].slice(0,12); })()`);
    const name = `${look}-${dev}-${String(sec || 'home').replace(':', '')}`;
    const p = await send('Page.captureScreenshot', { format: 'jpeg', quality: 72, clip: { x: 0, y: 0, width: w, height: h, scale: dev === 'phone' ? .75 : dev === 'laptop' ? .6 : .68 } });
    writeFileSync(join(out, `${name}.jpg`), Buffer.from(p.result.data, 'base64'));
    await ev("document.getElementById('clone')?.remove()");
    if (res.length) problems.push(`${name}: ${res.join(' | ')}`);
  }
}
console.log(problems.length ? problems.join('\n') : 'No problems found');
console.log('page errors:', [...errors].join(' ; ') || 'none');
proc.kill(); await sleep(300); rmSync(work, { recursive: true, force: true }); process.exit(problems.length ? 1 : 0);
