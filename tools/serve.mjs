// Serves the channel so it can open on this Mac, or on the TV's browser with --lan.
// Usage: node tools/serve.mjs [--lan] [port]
import { appendFileSync, createReadStream, existsSync, mkdirSync, readFileSync, renameSync, statSync, writeFileSync } from 'node:fs';
import { createServer } from 'node:http';
import { networkInterfaces } from 'node:os';
import { extname, join, normalize, resolve } from 'node:path';

const ROOT = resolve(import.meta.dirname, '../channel');
const lan = process.argv.includes('--lan');
const port = Number(process.argv.find((arg) => /^\d+$/.test(arg))) || 8080;
const TYPES = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.json': 'application/json', '.jpg': 'image/jpeg', '.png': 'image/png', '.mp3': 'audio/mpeg', '.pdf': 'application/pdf' };
const lanAddresses = Object.values(networkInterfaces()).flat().filter((n) => n.family === 'IPv4' && !n.internal).map((n) => n.address).sort((a, b) => b.startsWith('192.168.') - a.startsWith('192.168.'));
const lanUrl = lan && lanAddresses[0] ? `http://${lanAddresses[0]}:${port}/` : '';
/* Asked fresh each time, because the Mac's address changes when it joins another Wi-Fi. */
const currentLanUrl = () => { const found = Object.values(networkInterfaces()).flat().filter((n) => n.family === 'IPv4' && !n.internal).map((n) => n.address).sort((a, b) => b.startsWith('192.168.') - a.startsWith('192.168.')); return lan && found[0] ? `http://${found[0]}:${port}/` : ''; };
const HEAD = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover"><script>window.HS_LAN=__LAN__</script>`;

/* Family prototype storage: one JSON file on this Mac. Anyone on the home Wi-Fi can reach it, so it holds first names, PINs and scores only. */
const DATA = process.env.HS_DATA || resolve(import.meta.dirname, '../data/family.json');
const readData = () => (existsSync(DATA) ? JSON.parse(readFileSync(DATA, 'utf8')) : null);
function writeData(data) {
  mkdirSync(resolve(DATA, '..'), { recursive: true });
  writeFileSync(DATA + '.tmp', JSON.stringify(data, null, 1));
  renameSync(DATA + '.tmp', DATA);
}
/* Activity and error log: one line per event, next to the family data, on this Mac only. What goes in is listed in
   docs/product/MONITORING.md. Lines older than 90 days are dropped when the server starts, and the file never grows past 20 MB. */
const LOG = DATA.replace(/\.json$/, '') + '-log.jsonl', KEEP_DAYS = 90, KINDS = new Set(['signin', 'signout', 'lesson', 'video', 'voice', 'test', 'error', 'feedback']);
try {
  if (existsSync(LOG)) {
    const cut = Date.now() - KEEP_DAYS * 864e5;
    writeFileSync(LOG, readFileSync(LOG, 'utf8').split('\n').filter((line) => { try { return Date.parse(JSON.parse(line).at) > cut; } catch (e) { return false; } }).map((line) => `${line}\n`).join(''));
  }
} catch (e) { console.log('The activity log could not be tidied:', e.message); }
const clip = (v) => (typeof v === 'string' ? v.slice(0, 300) : typeof v === 'number' || typeof v === 'boolean' ? v : undefined);
function writeLog(entry, req) {
  try {
    if (!KINDS.has(entry?.kind) || (existsSync(LOG) && statSync(LOG).size > 20e6)) return;
    const at = Date.parse(entry.at) ? new Date(entry.at).toISOString() : new Date().toISOString(), line = { at, from: req?.socket?.remoteAddress?.replace('::ffff:', '') };
    for (const [k, v] of Object.entries(entry)) if (k !== 'at' && k !== 'from' && clip(v) !== undefined) line[k] = clip(v);
    mkdirSync(resolve(LOG, '..'), { recursive: true });
    appendFileSync(LOG, `${JSON.stringify(line)}\n`);
  } catch (e) { console.log('Could not write the activity log:', e.message); }
}
function readLog(days) {
  if (!existsSync(LOG)) return [];
  const cut = Date.now() - days * 864e5;
  return readFileSync(LOG, 'utf8').split('\n').slice(-5000).flatMap((line) => { try { const e = JSON.parse(line); return Date.parse(e.at) > cut ? [e] : []; } catch (err) { return []; } });
}
function logApi(req, res) {
  if (req.method === 'GET') { const days = Math.min(90, Number(new URL(req.url, 'http://x').searchParams.get('days')) || 7); res.writeHead(200, { 'Content-Type': 'application/json' }); return res.end(JSON.stringify(readLog(days))); }
  let body = '';
  req.on('data', (chunk) => { body += chunk; if (body.length > 1e5) req.destroy(); });
  req.on('end', () => { try { const list = JSON.parse(body); (Array.isArray(list) ? list : [list]).slice(0, 60).forEach((e) => writeLog(e, req)); res.writeHead(204); res.end(); } catch (e) { res.writeHead(400); res.end('Bad request'); } });
}

function applyOp(data, { op, value }) {
  if (op === 'seed') return data ?? value;
  const next = data ?? {};
  if (op === 'attempt') (next.attempts ??= []).push(value);
  if (op === 'exam') { next.exams ??= []; const i = next.exams.findIndex((e) => e.id === value.id); if (i >= 0) next.exams[i] = value; else next.exams.push(value); }
  if (op === 'settings') Object.assign(next, value);
  /* An idea or a problem from a parent. Kept with the family data, so it's backed up with it. */
  if (op === 'feedback') (next.feedback ??= []).push(value);
  /* Merged one entry at a time, so two devices can't overwrite each other. The first watch is kept. */
  if (op === 'watched') { const w = (next.watched ??= {}); if (!Object.hasOwn(w, value.who)) w[value.who] = {}; w[value.who][value.ep] ??= value.at; }
  return next;
}
function api(req, res) {
  const send = (body) => { res.writeHead(200, { 'Content-Type': 'application/json' }); res.end(JSON.stringify(body)); };
  if (req.method === 'GET') { try { return send(readData()); } catch (e) { writeLog({ kind: 'error', where: 'server', msg: `The family data file couldn't be read: ${e.message}` }, req); res.writeHead(500); return res.end('The family data file is damaged. Restore it from a backup.'); } }
  let body = '';
  req.on('data', (chunk) => { body += chunk; if (body.length > 1e6) req.destroy(); });
  req.on('end', () => { try { const next = applyOp(readData(), JSON.parse(body)); writeData(next); send(next); } catch (e) { writeLog({ kind: 'error', where: 'server', msg: `A save was refused: ${e.message}` }, req); res.writeHead(400); res.end('Bad request'); } });
}

createServer((req, res) => {
  if (req.url === '/api/state') return api(req, res);
  if (req.url.startsWith('/api/log')) return logApi(req, res);
  const path = normalize(decodeURIComponent(new URL(req.url, 'http://x').pathname));
  const page = path.endsWith('/') ? `${path}index.html` : path;
  if (page.endsWith('/index.html') && existsSync(join(ROOT, page))) {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    return res.end(HEAD.replace('__LAN__', JSON.stringify(currentLanUrl())) + readFileSync(join(ROOT, page), 'utf8'));
  }
  const file = join(ROOT, path);
  if (!file.startsWith(ROOT) || !existsSync(file) || !statSync(file).isFile()) {
    res.writeHead(404);
    return res.end('Not found');
  }
  const size = statSync(file).size, range = /bytes=(\d*)-(\d*)/.exec(req.headers.range || '');
  const type = TYPES[extname(file)] || 'application/octet-stream';
  if (range) {
    const start = Number(range[1] || 0), end = Number(range[2] || size - 1);
    res.writeHead(206, { 'Cache-Control': 'no-cache', 'Content-Type': type, 'Accept-Ranges': 'bytes', 'Content-Range': `bytes ${start}-${end}/${size}`, 'Content-Length': end - start + 1 });
    return createReadStream(file, { start, end }).pipe(res);
  }
  res.writeHead(200, { 'Cache-Control': 'no-cache', 'Content-Type': type, 'Accept-Ranges': 'bytes', 'Content-Length': size });
  createReadStream(file).pipe(res);
}).listen(port, lan ? '0.0.0.0' : '127.0.0.1', () => {
  console.log(`Channel running: http://localhost:${port}`);
  if (lan) for (const address of lanAddresses) console.log(`On the TV or a child's device, open: http://${address}:${port}`);
});
