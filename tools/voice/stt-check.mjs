// A check for voices, since Claude can't hear: speech recognition writes down what it hears, and we compare it with the words we meant.
// It shows whether words are clear. It can't show whether a voice sounds pleasant or natural. Usage: node tools/voice/stt-check.mjs <expected text> <mp3 or wav> ...
import { execFileSync } from 'node:child_process';
import { pipeline } from '@huggingface/transformers';
import { findTool } from '../lib/find.mjs';
const ffmpeg = findTool('ffmpeg');
const [expected, ...files] = process.argv.slice(2);
const words = (t) => t.toLowerCase().normalize('NFD').replace(/\p{M}/gu, '').replace(/[^a-zñ ]/g, ' ').split(/\s+/).filter(Boolean);
function score(a, b) { // Share of the expected words heard, in order.
  const d = Array.from({ length: a.length + 1 }, () => Array(b.length + 1).fill(0));
  for (let i = 1; i <= a.length; i++) for (let j = 1; j <= b.length; j++) d[i][j] = a[i - 1] === b[j - 1] ? d[i - 1][j - 1] + 1 : Math.max(d[i - 1][j], d[i][j - 1]);
  return Math.round((d[a.length][b.length] / (a.length || 1)) * 100);
}
const hear = await pipeline('automatic-speech-recognition', 'onnx-community/whisper-small', { dtype: 'q8', device: 'cpu' });
for (const file of files) {
  const raw = execFileSync(ffmpeg, ['-v', 'error', '-i', file, '-ar', '16000', '-ac', '1', '-f', 'f32le', '-'], { maxBuffer: 2e8 });
  const audio = new Float32Array(raw.buffer, raw.byteOffset, raw.byteLength / 4);
  const { text } = await hear(audio, { language: 'spanish', task: 'transcribe', chunk_length_s: 30 });
  console.log(`${score(words(expected), words(text))}%  ${file.split('/').pop()}\n     heard: ${text.trim()}`);
}
