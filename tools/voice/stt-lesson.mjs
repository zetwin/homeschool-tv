// Runs the speech check on every line of a lesson that is only Spanish. Usage: node tools/voice/stt-lesson.mjs spanish-1
import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { pipeline } from '@huggingface/transformers';
import { findTool } from '../lib/find.mjs';
const here = dirname(fileURLToPath(import.meta.url)), dir = resolve(here, '../../channel/assets/voice/en'), ffmpeg = findTool('ffmpeg');
const manifest = JSON.parse(readFileSync(join(dir, 'manifest.json'), 'utf8')), ep = process.argv[2];
const words = (t) => t.toLowerCase().normalize('NFD').replace(/\p{M}/gu, '').replace(/[^a-zñ ]/g, ' ').split(/\s+/).filter(Boolean);
const score = (a, b) => { const d = Array.from({ length: a.length + 1 }, () => Array(b.length + 1).fill(0)); for (let i = 1; i <= a.length; i++) for (let j = 1; j <= b.length; j++) d[i][j] = a[i - 1] === b[j - 1] ? d[i - 1][j - 1] + 1 : Math.max(d[i - 1][j], d[i][j - 1]); return Math.round((d[a.length][b.length] / (a.length || 1)) * 100); };
const hear = await pipeline('automatic-speech-recognition', 'onnx-community/whisper-small', { dtype: 'q8', device: 'cpu' });
const lines = Object.entries(manifest).filter(([, v]) => v.ep === ep).map(([id, v]) => [id, v.text.match(/^\{[^}]*?es-419: ([^}]*)\}$/)?.[1]]).filter(([, t]) => t);
let total = 0;
const low = [];
for (const [id, text] of lines) {
  const raw = execFileSync(ffmpeg, ['-v', 'error', '-i', join(dir, `${id}.mp3`), '-ar', '16000', '-ac', '1', '-f', 'f32le', '-'], { maxBuffer: 2e8 });
  const { text: heard } = await hear(new Float32Array(raw.buffer, raw.byteOffset, raw.byteLength / 4), { language: 'spanish', task: 'transcribe' });
  const s = score(words(text), words(heard)); total += s;
  if (s < 100) low.push(`${s}% ${id}: "${text}" heard "${heard.trim()}"`);
}
console.log(`${lines.length} Spanish-only lines, average ${Math.round(total / (lines.length || 1))}%`);
console.log(low.join('\n'));
