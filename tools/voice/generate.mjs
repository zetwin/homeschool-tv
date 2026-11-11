// Turns every spoken line of an episode into an audio clip, plus a manifest of clip lengths.
// Usage: node generate.mjs ../../channel skeleton en af_heart
// Accents are removed because the voice tool can crash on them; use `speak` to spell out tricky words.
// Lines whose text hasn't changed are skipped, so fixing one sentence only re-renders one clip.
import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { KokoroTTS } from 'kokoro-js';

const [root, episodeId, lang = 'en', voice = 'af_heart'] = process.argv.slice(2);
globalThis.window = { EPISODES: [] };
await import(pathToFileURL(resolve(root, 'episodes', `${episodeId}.js`)).href);
const episode = window.EPISODES[0];

const out = resolve(root, 'assets/voice', lang);
mkdirSync(out, { recursive: true });
const manifestPath = join(out, 'manifest.json');
const manifest = existsSync(manifestPath) ? JSON.parse(readFileSync(manifestPath, 'utf8')) : {};

const lines = [];
for (const scene of episode.scenes) scene.beats.forEach((beat, i) => lines.push({ id: `${scene.id}-${i}`, text: (beat.speak || beat.say).normalize('NFD').replace(/\p{M}/gu, '') }));

let tts;
for (const [n, line] of lines.entries()) {
  const mp3 = join(out, `${line.id}.mp3`);
  if (manifest[line.id]?.text === line.text && manifest[line.id]?.voice === voice && existsSync(mp3)) continue;
  tts ??= await KokoroTTS.from_pretrained('onnx-community/Kokoro-82M-v1.0-ONNX', { dtype: 'q8', device: 'cpu' });
  const audio = await tts.generate(line.text, { voice });
  const wav = join(out, `${line.id}.wav`);
  await audio.save(wav);
  execFileSync('ffmpeg', ['-v', 'error', '-y', '-i', wav, '-af', 'loudnorm=I=-16:TP=-1.5:LRA=11', '-ar', '24000', '-ac', '1', '-b:a', '64k', mp3]);
  rmSync(wav);
  manifest[line.id] = { seconds: +(audio.audio.length / audio.sampling_rate).toFixed(2), text: line.text, voice, ep: episodeId };
  console.log(`${n + 1}/${lines.length}`, line.id, manifest[line.id].seconds + 's');
}

// Clips from other lessons share this folder, so only remove this lesson's old lines.
for (const id of Object.keys(manifest)) if ((manifest[id].ep || 'skeleton') === episodeId && !lines.some((line) => line.id === id)) { delete manifest[id]; rmSync(join(out, `${id}.mp3`), { force: true }); }
writeFileSync(manifestPath, JSON.stringify(manifest, null, 1));
const total = lines.reduce((sum, line) => sum + manifest[line.id].seconds, 0);
console.log(`Done: ${lines.length} lines, ${(total / 60).toFixed(1)} minutes of narration.`);
