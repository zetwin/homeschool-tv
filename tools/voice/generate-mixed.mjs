// Records a lesson's voice. A line can mix English and Spanish, and each part can use a main or second voice.
// All settings are in voices.json. Setup: docs/SETUP.md. Usage, from the project folder: npm run voice spanish-1
//
// A beat can have: parts: [{ en: 'Say hello with:' }, { es: 'Hola' }, { pause: 0.6 }, { es: 'Hola', slow: true, voice: 'second' }]
// A beat with only `say` (or `speak`) is one English line. `say` stays on every beat for the captions.
// An episode can also list `clips: { 'sp-hola': 'Hola' }`, for listening questions. Those are Spanish only.
// Each line becomes one mp3 and one manifest entry, so the player needs no changes.
// Lines and settings that haven't changed are skipped, so editing one line records one line.
import { execFileSync, spawnSync } from 'node:child_process';
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { speakSpanish, writeWav } from './kokoro-es.mjs';
import { takeKey, TAKES } from './chatterbox-takes.mjs';
import { findTool } from '../lib/find.mjs';

const here = dirname(fileURLToPath(import.meta.url));
const SET = JSON.parse(readFileSync(join(here, 'voices.json'), 'utf8'));
const root = resolve(here, '../../channel'), lang = 'en';
const episodeId = process.argv[2];
if (!episodeId) { console.log('Say which lesson, such as: npm run voice spanish-1'); process.exit(1); }
const ffmpeg = findTool('ffmpeg'), ffprobe = findTool('ffprobe');
if (!ffmpeg || !ffprobe) { console.log('ffmpeg is missing. Run: npm run doctor'); process.exit(1); }
const RATE_HZ = SET.sampleRate, GAP = SET.timing.handoverGap;
const pick = (group, name) => group.voices[name || 'main'] || name;
/* Spanish voice for one line. Chatterbox is clearest on single words, and Kokoro sounds calmer on sentences, so long lines go to Kokoro. Owner's choice, 2026-11-07. */
const spanishVoice = (part) => {
  const name = pick(SET.spanish, part.voice), calm = SET.spanish.calmFor?.[name], words = part.es.trim().split(/\s+/).length;
  return name.startsWith('cb:') && calm && words > (SET.spanish.cbMaxWords ?? 99) ? calm : name;
};
const speedOf = (part) => (part.slow ? SET.spanish.slowSpeed : part.speed || SET.spanish.speed);

globalThis.window = { EPISODES: [] };
await import(pathToFileURL(resolve(root, 'episodes', `${episodeId}.js`)).href);
const episode = window.EPISODES.find((e) => e.id === episodeId) || window.EPISODES[0];
await (await import('./word-help.mjs')).addWordHelp(episode, root);

const out = resolve(root, 'assets/voice', lang);
mkdirSync(out, { recursive: true });
const manifestPath = join(out, 'manifest.json');
const manifest = existsSync(manifestPath) ? JSON.parse(readFileSync(manifestPath, 'utf8')) : {};
const plain = (text) => text.normalize('NFD').replace(/\p{M}/gu, '');

// The text in the manifest is how a changed line is noticed, so it records voices, speeds and pauses too.
const describe = (parts) => parts.map((p) => (p.pause != null ? `[${p.pause}s]` : p.en != null ? (p.voice ? `{${pick(SET.english, p.voice)}: ${plain(p.en)}}` : plain(p.en)) : `{${spanishVoice(p)}${spanishVoice(p).startsWith('piper:') ? ` p${SET.spanish.piperPace}` : ''} s${SET.spanish.sounds} ${speedOf(p)} ${SET.spanish.accent}: ${p.es}}`)).join(' ');

const lines = [];
for (const scene of episode.scenes) {
  scene.beats.forEach((beat, i) => {
    const parts = beat.parts || [{ en: beat.speak || beat.say }];
    lines.push({ id: `${scene.id}-${i}`, parts, text: describe(parts), voice: beat.parts ? `${SET.english.voices.main}+${SET.spanish.voices.main}` : SET.english.voices.main });
  });
}
for (const [id, es] of Object.entries(episode.clips || {})) {
  const parts = [{ es }];
  lines.push({ id, parts, text: describe(parts), voice: SET.spanish.voices.main });
}

const work = mkdtempSync(join(tmpdir(), 'hs-mixed-'));
const run = (...args) => execFileSync(ffmpeg, ['-v', 'error', '-y', ...args]);

// Trims the silence each voice leaves at its ends, then evens out the level. Without this, the two voices join unevenly.
function meanVolume(wav) {
  const r = spawnSync(ffmpeg, ['-hide_banner', '-i', wav, '-af', 'volumedetect', '-f', 'null', '-'], { encoding: 'utf8' });
  const m = /mean_volume: (-?[\d.]+) dB/.exec(r.stderr);
  return m ? +m[1] : -20;
}
/* Chatterbox ends words softly, such as the r in estar, so its takes keep more of their ending. */
function clean(input, output, soft = false) {
  const end = soft ? 'start_threshold=-60dB:start_silence=0.15' : 'start_threshold=-50dB:start_silence=0.05';
  const trim = `silenceremove=start_periods=1:start_threshold=-50dB:start_silence=0.03,areverse,silenceremove=start_periods=1:${end},areverse`;
  const trimmed = `${output}.t.wav`;
  run('-i', input, '-af', `${trim},aresample=${RATE_HZ}`, '-ac', '1', trimmed);
  const gain = (SET.loudness.partLevel - meanVolume(trimmed)).toFixed(2);
  run('-i', trimmed, '-af', `volume=${gain}dB,alimiter=limit=0.89:level=false,afade=t=in:d=0.008,areverse,afade=t=in:d=0.015,areverse`, '-ar', String(RATE_HZ), '-ac', '1', '-c:a', 'pcm_s16le', output);
  rmSync(trimmed, { force: true });
}
const silence = (seconds, output) => run('-f', 'lavfi', '-i', `anullsrc=r=${RATE_HZ}:cl=mono`, '-t', String(seconds), '-c:a', 'pcm_s16le', output);

let tts;
async function renderPart(part, base) {
  const output = `${base}.wav`;
  if (part.pause != null) { silence(part.pause, output); return output; }
  const raw = `${base}.raw.wav`;
  if (!tts) {
    const { KokoroTTS } = await import('kokoro-js');
    tts = await KokoroTTS.from_pretrained(SET.model.id, { dtype: SET.model.quality, device: 'cpu' });
  }
  if (part.en != null) {
    const audio = await tts.generate(plain(part.en), { voice: pick(SET.english, part.voice), speed: SET.english.speed });
    await audio.save(raw);
  } else {
    const name = spanishVoice(part);
    if (name.startsWith('cb:')) {
      const take = join(TAKES, `${takeKey(part.es, name)}.wav`);
      if (!existsSync(take)) throw new Error(`No take for "${part.es}". Run: node tools/voice/chatterbox-make.mjs ${episodeId}`);
      const tempo = speedOf(part) / SET.spanish.speed; // Slow lines are stretched, keeping the pitch, because Chatterbox has no speed setting.
      run('-i', take, '-af', `atempo=${tempo.toFixed(3)},aresample=${RATE_HZ}`, '-ac', '1', raw);
    } else writeWav(await speakSpanish(tts, part.es, { voice: name, speed: speedOf(part), accent: SET.spanish.accent, modelId: SET.model.id }), raw, RATE_HZ);
  }
  clean(raw, output, part.es != null && spanishVoice(part).startsWith('cb:'));
  rmSync(raw, { force: true });
  return output;
}

for (const [n, line] of lines.entries()) {
  const mp3 = join(out, `${line.id}.mp3`);
  if (manifest[line.id]?.text === line.text && manifest[line.id]?.voice === line.voice && existsSync(mp3)) continue;
  const list = [];
  for (const [k, part] of line.parts.entries()) {
    if (k && part.pause == null && line.parts[k - 1].pause == null) { // A short breath at each handover, unless a pause is already there.
      const gap = join(work, `${line.id}-${k}-gap.wav`);
      silence(GAP, gap);
      list.push(gap);
    }
    list.push(await renderPart(part, join(work, `${line.id}-${k}`)));
  }
  const listFile = join(work, `${line.id}.txt`);
  writeFileSync(listFile, list.map((f) => `file '${f}'`).join('\n'));
  const joined = join(work, `${line.id}.wav`);
  run('-f', 'concat', '-safe', '0', '-i', listFile, '-c', 'copy', joined);
  // Quiet padding at both ends, so a very short word isn't clipped when the player starts it. Same loudness as generate.mjs.
  run('-i', joined, '-af', `adelay=${Math.round(SET.timing.startPad * 1000)}:all=1,apad=pad_dur=${SET.timing.endPad},loudnorm=I=${SET.loudness.lineTarget}:TP=${SET.loudness.peak}:LRA=${SET.loudness.range}`, '-ar', String(RATE_HZ), '-ac', '1', '-b:a', SET.file.bitrate, mp3);
  const probe = execFileSync(ffprobe, ['-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', mp3], { encoding: 'utf8' });
  manifest[line.id] = { seconds: +(+probe).toFixed(2), text: line.text, voice: line.voice, ep: episodeId };
  list.forEach((f) => rmSync(f, { force: true }));
  rmSync(joined, { force: true });
  console.log(`${n + 1}/${lines.length}`, line.id, `${manifest[line.id].seconds}s`);
}
rmSync(work, { recursive: true, force: true });

// Clips from other lessons share this folder, so only remove this lesson's old lines.
for (const id of Object.keys(manifest)) if (manifest[id].ep === episodeId && !lines.some((line) => line.id === id)) { delete manifest[id]; rmSync(join(out, `${id}.mp3`), { force: true }); }
// Another lesson may have been recorded meanwhile, so keep its newest entries and write only this lesson's.
const latest = existsSync(manifestPath) ? JSON.parse(readFileSync(manifestPath, 'utf8')) : {};
for (const id of Object.keys(manifest)) if (manifest[id].ep !== episodeId && !latest[id]) delete manifest[id];
for (const [id, entry] of Object.entries(latest)) if (entry.ep !== episodeId) manifest[id] = entry;
writeFileSync(manifestPath, JSON.stringify(manifest, null, 1));
const beats = lines.filter((line) => !(line.id in (episode.clips || {})));
const total = beats.reduce((sum, line) => sum + manifest[line.id].seconds, 0);
const waits = episode.scenes.flatMap((s) => s.beats).reduce((sum, b) => sum + (b.hold ?? 0.3), 0);
console.log(`Done: ${beats.length} beats, ${(total / 60).toFixed(1)} minutes of audio, ${(waits / 60).toFixed(1)} minutes of silent time.`);
