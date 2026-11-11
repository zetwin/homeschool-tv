// Spanish for the Kokoro model. The kokoro-js library only turns English into sounds, so espeak-ng does that for Spanish.
// Punctuation is put back, because espeak-ng drops it and the model uses it for rising questions and pauses.
import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { homedir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { Tensor } from '@huggingface/transformers';
const here = dirname(fileURLToPath(import.meta.url));
const espeak = process.env.ESPEAK || 'espeak-ng';

// Kokoro learned these two-part sounds as single symbols, so they're joined the same way as its official Spanish code (misaki).
const JOINED = [['a^ɪ', 'I'], ['a^ʊ', 'W'], ['d^z', 'ʣ'], ['d^ʒ', 'ʤ'], ['e^ɪ', 'A'], ['o^ʊ', 'O'], ['ə^ʊ', 'Q'], ['s^s', 'S'], ['t^s', 'ʦ'], ['t^ʃ', 'ʧ'], ['ɔ^ɪ', 'Y']];
export function spanishSounds(text, accent = 'es-419', old = false) {
  const clean = text.normalize('NFC').trim();
  const pieces = clean.split(/([¿¡.,;:?!…]+)/).filter((p) => p.trim());
  let out = '';
  for (const piece of pieces) {
    if (/^[¿¡.,;:?!…]+$/.test(piece)) { out = out.trimEnd() + piece.replace(/…/g, '...') + ' '; continue; }
    let sounds = execFileSync(espeak, ['-v', accent, '-q', '--ipa', ...(old ? [] : ['--tie=^']), piece], { encoding: 'utf8' }).trim().replace(/\s*\n\s*/g, ' ');
    if (!old) { for (const [from, to] of JOINED) sounds = sounds.replaceAll(from, to); sounds = sounds.replaceAll('^', ''); }
    out += `${sounds} `;
  }
  out = old ? out.trim() : out.trim().replace(/([¿¡]) /g, '$1').replace(/([.,;:?!])([¿¡])/g, '$1 $2'); // An opening ¿ or ¡ belongs to its word, or the voice leaves a gap.
  return /[.?!,;:]$/.test(out) ? out : `${out}.`; // Very short words need an ending, or the model can trail off.
}
async function voiceData(name, modelId) {
  const shipped = resolve(here, 'node_modules/kokoro-js/voices', `${name}.bin`);
  const cache = join(homedir(), '.cache', 'homeschool-voices', `${name}.bin`);
  if (!existsSync(shipped) && !existsSync(cache)) {
    mkdirSync(dirname(cache), { recursive: true });
    const r = await fetch(`https://huggingface.co/${modelId}/resolve/main/voices/${name}.bin`);
    if (!r.ok) throw new Error(`Couldn't download voice ${name}`);
    writeFileSync(cache, Buffer.from(await r.arrayBuffer()));
  }
  const b = readFileSync(existsSync(shipped) ? shipped : cache);
  return new Float32Array(b.buffer, b.byteOffset, b.byteLength / 4);
}
export async function speakSpanish(tts, text, { voice, speed, accent, modelId, sounds, minStyle = 0 }) {
  const { input_ids } = tts.tokenizer(sounds || spanishSounds(text, accent), { truncation: true });
  const all = await voiceData(voice, modelId), n = Math.min(Math.max(input_ids.dims.at(-1) - 2, minStyle), 509);
  const { waveform } = await tts.model({ input_ids, style: new Tensor('float32', all.slice(n * 256, n * 256 + 256), [1, 256]), speed: new Tensor('float32', [speed], [1]) });
  return waveform.data;
}
export function writeWav(data, file, rate = 24000) {
  const n = data.length, b = Buffer.alloc(44 + n * 2);
  b.write('RIFF', 0); b.writeUInt32LE(36 + n * 2, 4); b.write('WAVEfmt ', 8); b.writeUInt32LE(16, 16); b.writeUInt16LE(1, 20); b.writeUInt16LE(1, 22); b.writeUInt32LE(rate, 24); b.writeUInt32LE(rate * 2, 28); b.writeUInt16LE(2, 32); b.writeUInt16LE(16, 34); b.write('data', 36); b.writeUInt32LE(n * 2, 40);
  for (let i = 0; i < n; i++) b.writeInt16LE(Math.round(Math.max(-1, Math.min(1, data[i])) * 32767), 44 + i * 2);
  writeFileSync(file, b);
}
