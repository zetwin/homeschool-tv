// Records a lesson's Spanish with Chatterbox, like a studio: several takes of each line, and speech recognition keeps a take with the right words and no extras.
// Then `npm run voice <lesson>` uses the kept takes. It checks clarity only. A native speaker still has to judge how it sounds. Guide: docs/product/VOICE-PLAN.md.
// Usage, from the project folder: node tools/voice/chatterbox-make.mjs spanish-1
import { createHash } from 'node:crypto';
import { execFileSync, spawnSync } from 'node:child_process';
import { copyFileSync, existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { homedir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { pipeline } from '@huggingface/transformers';
import { findTool } from '../lib/find.mjs';
import { takeKey, takeText, TAKES } from './chatterbox-takes.mjs';
const here = dirname(fileURLToPath(import.meta.url)), SET = JSON.parse(readFileSync(join(here, 'voices.json'), 'utf8')), ffmpeg = findTool('ffmpeg');
const id = process.argv[2], python = join(homedir(), '.cache/homeschool-voices/chatterbox/venv', process.platform === 'win32' ? 'Scripts/python.exe' : 'bin/python');
if (!id) { console.log('Say which lesson, such as: node tools/voice/chatterbox-make.mjs spanish-1'); process.exit(1); }
if (!existsSync(python)) { console.log('Chatterbox is not installed. See docs/product/VOICE-PLAN.md'); process.exit(1); }
globalThis.window = { EPISODES: [] };
await import(pathToFileURL(resolve(here, '../../channel/episodes', `${id}.js`)).href);
const episode = window.EPISODES.find((e) => e.id === id);
await (await import('./word-help.mjs')).addWordHelp(episode, resolve(here, '../../channel'));
const pick = (name) => (name === 'second' ? 'cb:alex' : 'cb:dora'); // The voices these takes are for. Switch to them in voices.json after recording.
const wanted = new Map();
const add = (es, voice) => { const v = pick(voice); if (v.startsWith('cb:')) wanted.set(takeKey(es, v), { text: takeText(es), voice: v }); };
for (const scene of episode.scenes) for (const beat of scene.beats) for (const part of beat.parts || []) if (part.es != null) add(part.es, part.voice);
/* Chatterbox only says short clips; longer ones go to the calmer voice (cbMaxWords in voices.json), so they need no take. */
for (const es of Object.values(episode.clips || {})) if (es.trim().split(/\s+/).length <= (SET.spanish.cbMaxWords ?? 99)) add(es, null);
const raw = join(homedir(), '.cache/homeschool-voices/takes-raw'); mkdirSync(raw, { recursive: true }); mkdirSync(TAKES, { recursive: true });
const picksFile = join(here, 'chatterbox-picks.json'), picks = existsSync(picksFile) ? JSON.parse(readFileSync(picksFile, 'utf8')) : {};
const hear = await pipeline('automatic-speech-recognition', 'onnx-community/whisper-small', { dtype: 'q8', device: 'cpu' });
const NUM = { 1: 'uno', 2: 'dos', 3: 'tres', 4: 'cuatro', 5: 'cinco', 6: 'seis' };
/* The model crashes on these very short lines, so it says the same sound spelled another way. */
const SAY = { 'a.': 'Ah.', 'En.': 'Enn.' };
/* Different spellings of one sound count as the same word: a silent h, and chao or chau. */
const words = (t) => t.toLowerCase().replace(/\bah\b/g, 'a').replace(/\benn\b/g, 'en').replace(/\bchau\b/g, 'chao').replace(/\bh/g, '').normalize('NFD').replace(/\p{M}/gu, '').replace(/\d/g, (d) => ` ${NUM[d] || d} `).replace(/[^a-zñ ]/g, ' ').split(/\s+/).filter(Boolean);
const lcs = (a, b) => { const d = Array.from({ length: a.length + 1 }, () => Array(b.length + 1).fill(0)); for (let i = 1; i <= a.length; i++) for (let j = 1; j <= b.length; j++) d[i][j] = a[i - 1] === b[j - 1] ? d[i - 1][j - 1] + 1 : Math.max(d[i - 1][j], d[i][j - 1]); return d[a.length][b.length]; };
const read = (f) => { const r = execFileSync(ffmpeg, ['-v', 'error', '-i', f, '-ar', '16000', '-ac', '1', '-f', 'f32le', '-'], { maxBuffer: 2e8 }); return new Float32Array(r.buffer.slice(r.byteOffset, r.byteOffset + r.byteLength)); };
const pad = (d) => { const z = 6400, o = new Float32Array(d.length + z * 2); o.set(d, z); return o; };
/* Too long means it added something. A line of Spanish rarely needs more than this. */
const longest = (text) => 0.75 + text.length * 0.095;
async function score(file, text) {
  const a = read(file), seconds = a.length / 16000, heard = (await hear(pad(a), { language: 'spanish', task: 'transcribe' })).text.trim(), w = words(text), h = words(heard);
  const same = lcs(w, h), exact = w.join(' ') === h.join(' '), fits = seconds <= longest(text);
  return { seconds: +seconds.toFixed(2), heard, exact, fits, value: (same / Math.max(w.length, h.length)) - (fits ? 0 : 0.5) };
}
const ROUNDS = 8;
for (let round = 0; round < ROUNDS; round++) {
  const open = [...wanted].filter(([key]) => !picks[key]?.verified);
  if (!open.length) break;
  const count = round === 0 ? 2 : 2;
  const jobs = open.flatMap(([key, w]) => Array.from({ length: count }, (_, i) => { const seed = 1000 * (round + 1 + +(process.env.FIRST_ROUND || 0)) + i; return { take: `${key}-${seed}`, seed, text: SAY[w.text] || w.text, ref: join(here, 'refs', `${w.voice.slice(3)}.wav`) }; }));
  writeFileSync(join(raw, 'jobs.json'), JSON.stringify(jobs));
  console.log(`Round ${round + 1}: ${open.length} lines still open, ${jobs.length} takes`);
  const r = spawnSync(python, [join(here, 'chatterbox-es.py'), join(raw, 'jobs.json'), raw], { stdio: 'inherit', env: { ...process.env, PYTORCH_ENABLE_MPS_FALLBACK: '1' } });
  if (r.status !== 0) { console.log('Chatterbox stopped with an error'); process.exit(1); }
  for (const [key, w] of open) {
    for (const job of jobs.filter((j) => j.take.startsWith(`${key}-`))) {
      const file = join(raw, `${job.take}.wav`);
      if (!existsSync(file)) continue;
      const s = await score(file, w.text), now = picks[key];
      const better = !now || (s.exact && s.fits && !(now.verified && now.seconds <= s.seconds)) || (!now.verified && s.value > now.value);
      if (better) { picks[key] = { text: w.text, voice: w.voice, seed: job.seed, seconds: s.seconds, heard: s.heard, value: +s.value.toFixed(2), verified: s.exact && s.fits }; copyFileSync(file, join(TAKES, `${key}.wav`)); }
    }
  }
  writeFileSync(picksFile, JSON.stringify(picks, null, 1));
  console.log(`After round ${round + 1}: ${[...wanted].filter(([key]) => picks[key]?.verified).length} of ${wanted.size} verified`);
}
const unsure = [...wanted].filter(([key]) => !picks[key]?.verified);
console.log(`Done. ${wanted.size - unsure.length} of ${wanted.size} lines passed.`);
unsure.forEach(([key, w]) => console.log(`NOT VERIFIED: "${w.text}" (${w.voice}) heard "${picks[key]?.heard}"`));
