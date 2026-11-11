// Samples of possible extra narrators, for the owner to compare at /voice-samples/. Usage, from the project folder: node tools/voice/sample-voices.mjs
// Each voice reads a full passage alone, so differences are easy to hear. A second, short file puts it beside the main narrator.
import { execFileSync } from 'node:child_process';
import { mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { KokoroTTS } from 'kokoro-js';
import { findTool } from '../lib/find.mjs';
const here = dirname(fileURLToPath(import.meta.url)), SET = JSON.parse(readFileSync(join(here, 'voices.json'), 'utf8'));
const OUT = resolve(here, '../../channel/voice-samples'), ffmpeg = findTool('ffmpeg'), work = join(tmpdir(), 'hs-samples'); mkdirSync(work, { recursive: true }); mkdirSync(OUT, { recursive: true });
const tts = await KokoroTTS.from_pretrained(SET.model.id, { dtype: SET.model.quality, device: 'cpu' });
const finish = (input, name) => execFileSync(ffmpeg, ['-v', 'error', '-y', '-f', 'concat', '-safe', '0', '-i', input, '-af', 'loudnorm=I=-16:TP=-1.5:LRA=11', '-ar', '24000', '-ac', '1', '-b:a', '64k', join(OUT, `${name}.mp3`)]);
const gap = join(work, 'gap.wav'); execFileSync(ffmpeg, ['-v', 'error', '-y', '-f', 'lavfi', '-i', 'anullsrc=r=24000:cl=mono', '-t', '0.4', '-c:a', 'pcm_s16le', gap]);
const say = async (text, voice, file) => { const a = await tts.generate(text, { voice }); await a.save(file); return file; };
const join2 = (files, name) => { const l = join(work, 'l.txt'); writeFileSync(l, files.flatMap((f, i) => (i ? [gap, f] : [f])).map((f) => `file '${f}'`).join('\n')); finish(l, name); };
const ALONE = 'High in the mountains of Colombia, there is snow, right on the Equator. The sun is strong here, so why doesn’t the snow melt? The answer is in the air. As you climb, the air gets thinner, and it holds less heat.';
const MAIN = await say('Near the Equator, the sun is at its strongest. So why is there snow on this mountain?', SET.english.voices.main, join(work, 'main.wav'));
join2([await say(ALONE, SET.english.voices.main, join(work, 'heart.wav'))], 'narrator-af_heart');
for (const v of ['am_michael', 'am_puck', 'am_fenrir', 'bm_george', 'bf_emma', 'af_bella']) {
  join2([await say(ALONE, v, join(work, `${v}.wav`))], `narrator-${v}`);
  join2([MAIN, await say('The answer is in the air. As you climb, the air gets thinner, and it holds less heat.', v, join(work, `${v}-2.wav`))], `together-${v}`);
  console.log(v);
}
rmSync(work, { recursive: true, force: true });
