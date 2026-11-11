// Renders one test line with each candidate voice, so the voice can be chosen by ear.
import { KokoroTTS } from 'kokoro-js';

const TEXT = 'Right now, two hundred and six bones are holding you up. Take them away, and you would collapse into a puddle. So, what is your skeleton really doing?';
const VOICES = ['af_heart', 'af_bella', 'am_michael', 'bm_george'];

const tts = await KokoroTTS.from_pretrained('onnx-community/Kokoro-82M-v1.0-ONNX', { dtype: 'q8', device: 'cpu' });
for (const voice of VOICES) {
  const started = Date.now();
  const audio = await tts.generate(TEXT, { voice });
  await audio.save(`${process.argv[2]}/${voice}.wav`);
  console.log(voice, 'seconds of audio:', (audio.audio.length / audio.sampling_rate).toFixed(1), 'render seconds:', ((Date.now() - started) / 1000).toFixed(1));
}
