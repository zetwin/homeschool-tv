# Voices: how they're made, and the plan

Last updated: 2026-11-07. **English: Kokoro Heart. Spanish: Chatterbox, recorded in takes and checked by speech recognition, sounding like Kokoro's Dora and Alex. Made on our own computer. Native speakers still have to judge it.** Tests: `docs/research/2026-11-07-spanish-voice-tests.md`. Setup on a new computer: `docs/SETUP.md`.

## How to record
```bash
npm run voice:setup
```
```bash
npm run voice spanish-1
```
Then remove the 500 MB install with `npm run voice:clean`. Everything runs on this computer, with nothing sent to a voice company.

**Only changed lines are recorded again.** Edit a line's words in `channel/episodes/<id>.js`, or a value in `tools/voice/voices.json`, and run it again.

## The settings: `tools/voice/voices.json`
| Setting | Now | What it does |
|---|---|---|
| `english.voices.main` | `af_heart` | The narrator |
| `english.voices.second` | Not chosen yet | One more narrator, once the owner picks. The main narrator stays |
| `english.speed` | 1 | Speed. 1 is normal |
| `spanish.voices.main` | `ef_dora` | Spanish lines, and female speakers |
| `spanish.voices.second` | `cb:alex` | Male speakers, such as Mateo. Chatterbox, chosen by the owner on 2026-11-07 |
| `spanish.sounds` | 2 | Version of the word-to-sound method. Raising it records all Spanish lines again |
| `spanish.accent` | `es-419` | Latin American Spanish |
| `spanish.speed` | 0.9 | Slower than normal, for beginners |
| `spanish.slowSpeed` | 0.75 | For lines marked `slow: true` |
| `timing.handoverGap` | 0.14 s | Quiet time when one voice hands to another |
| `timing.startPad`, `endPad` | 0.06 s, 0.12 s | Quiet time at each end, so short words aren't clipped |
| `loudness.lineTarget` | -16 LUFS | Every line ends up this loud |
| `loudness.peak` | -1.5 dB | The loudest moment allowed |

## In a lesson
```js
{ say: 'A house: casa.', parts: [{ en: 'A house:' }, { es: 'casa', slow: true }, { pause: 0.5 }, { es: 'casa' }] }
{ es: '¡Hola, Ana!', voice: 'second' }   // Alex
```
- `say` is what the subtitle shows. `parts` is what's spoken. With no `parts`, English reads `say` (or `speak`, to spell out numbers).
- `hold` is the silence after a line, for "Your turn". The "Your turn" bar times itself from each recording's real length, so timing follows the voice.
- Spanish is spoken with `espeak-ng` turning the words into sounds, then Kokoro speaking them. Punctuation is kept, so questions rise.

## How it was chosen
The owner found the old Apple voice "weak poor robotic", and chose Kokoro's Spanish voices from samples. Kokoro's model is Apache 2.0 according to its model card. `espeak-ng` is GPL-3.0, and we only use it as a tool while recording, without shipping it. Have this confirmed in the legal review before a public launch.

## Ideas for later
1. **Spanish phrases stored apart,** each with its own file, so one recording serves every lesson.
2. **A real recording always wins:** a file under a phrase's name replaces the voice everywhere. Good for key words children copy.
3. **A voice review page:** every phrase listed, with play, OK, redo and a note. Later, record with a microphone, and edit a line's words in the page.
4. **A Spanish speaker checks the result.** Not done yet.

## Spanish, from 2026-11-07
Native speakers said the man sounds wrong, and the owner said the Spanish sounds broken. Tests showed **Kokoro distorts lone Spanish words**, which are most of this lesson's Spanish. Its sentences were fine. So Spanish now uses **Chatterbox** (MIT license), recorded like a studio:
1. `node tools/voice/chatterbox-make.mjs spanish-1` records two takes of each Spanish line per round. Speech recognition keeps a take only if it hears exactly the right words and the take isn't too long. It repeats until every line passes. Kept takes are listed in `tools/voice/chatterbox-picks.json`, with the seed that made each one.
2. `npm run voice spanish-1` builds the lesson from the kept takes, the same way as before. Lines marked `slow: true` are stretched without changing the pitch.

| Setting in `voices.json` | Now | Means |
|---|---|---|
| `spanish.voices.main` | `cb:dora` | Chatterbox, sounding like Kokoro Dora (`tools/voice/refs/dora.wav`) |
| `spanish.voices.second` | `cb:alex` | Chatterbox, sounding like Kokoro Alex (`tools/voice/refs/alex.wav`), for Mateo |

The reference clips are made by Kokoro, so no real person's voice is copied. Go back to Kokoro with `"main": "ef_dora"` and `"second": "em_alex"`, then `npm run voice spanish-1`.

**Checking a voice:** `node tools/voice/stt-lesson.mjs spanish-1` tests every Spanish-only line, and `node tools/voice/stt-check.mjs "<words>" <file>` tests one file. They show whether words are clear, never whether they sound natural.

**Install:** Chatterbox needs Python 3.12 and about 1.3 GB in `~/.cache/homeschool-voices/chatterbox`, plus about 3 GB of model in `~/.cache/huggingface`. See `docs/SETUP.md`. Takes are kept in `~/.cache/homeschool-voices/takes`.

**If native speakers still say it's wrong:** the most reliable fix is a native speaker recording the Spanish, starting with Mateo's 5 lines, with written permission. A paid cloud voice is another way, but it needs the owner's own account.

## Earlier, 2026-11-06: the male Spanish voice
Native speakers said Alex sounds wrong. Two things changed on 2026-11-06:
1. **A mistake of mine, fixed.** I turned words into sounds differently from Kokoro's official code ([misaki](https://github.com/hexgrad/misaki/blob/main/misaki/espeak.py)). Sounds like "ai" and "ei" were sent in two parts, and "¿" and "¡" left a gap. This also affects Dora, so every Spanish line was recorded again. Kokoro's own notes warn that its non-English voices may be weak, so this may not be the whole cause.
2. **A new voice for Mateo: Aldo.** A Piper model trained on one real Mexican speaker. **Taken out on 2026-11-07:** the owner said he sounds like a retired or sick person, and speech recognition heard him least clearly. Dave stood in briefly.

| Voice | Trained on | License as stated | Size |
|---|---|---|---|
| Aldo, `es_MX-ald-medium` | One Mexican speaker, 535 clips | [Unlicense, dataset](https://huggingface.co/datasets/rmcpantoja/Ald_Mexican_Spanish_speech_dataset), and [model card](https://huggingface.co/rhasspy/piper-voices/tree/main/es/es_MX/ald/medium) | 63 MB |
| Dave, `es_ES-davefx-medium` | One speaker from Spain | [CC0, model card](https://huggingface.co/rhasspy/piper-voices/tree/main/es/es_ES/davefx/medium) | 63 MB |
| Alex, Santa | Kokoro | Apache 2.0 | Included |

We use only the model files, run with onnxruntime, and not Piper's own GPL program. Models download once to `~/.cache/homeschool-voices/piper`. **Not verified:** that the speakers agreed to commercial use. Check before any paid launch.

**If native speakers reject all of these:** the most reliable fix is a native speaker recording Mateo's 5 short lines, with written permission. Chatterbox (MIT) is another model to try, but it's a much bigger install, and I haven't tested its Spanish.

Compare samples with `node tools/voice/sample-spanish-men.mjs`, then open `/voice-samples/`. Change back with one line in `voices.json`, then `npm run voice spanish-1`.

## Decided 2026-11-07
The owner listened: the old single Spanish words were broken, and the Chatterbox voices sound right. They dropped Aldo (slow and normal pace), Dave, Santa, and Alex as it was. The Piper code and its models are removed. Native speakers haven't been asked yet.

**What it needs:** playing a lesson needs nothing extra. Recording new Spanish lines needs Chatterbox, which is already installed on this Mac in `~/.cache/homeschool-voices/chatterbox` (about 1.3 GB). A new computer would download it once.

## Which Spanish voice says which line (2026-11-07)
The owner found the Chatterbox voice "too much" in the lesson, and asked to use what we have, with the best one picked for each line.
- **Up to 3 words:** Chatterbox (`cb:dora`, `cb:alex`). Kokoro broke single words.
- **Longer sentences:** Kokoro (`ef_dora`, `em_alex`), with the corrected sounds. The owner liked "Alex, sounds corrected", and speech recognition heard Kokoro sentences 100%.
- **Settings:** `spanish.cbMaxWords` and `spanish.calmFor` in `voices.json`. Changing them records only the lines affected.
- **Measured:** 22 Spanish-only lines, 95% average clarity. One single word, "Estar", was heard as "Está", which is likely a limit of the recognizer.
- **Tried and not used:** lower Chatterbox expressiveness (0.25 and 0.35). Five phrases per level showed no clear difference in clarity or pitch swing, so I couldn't say it helped.
- **Not measured:** how natural it sounds. The owner and native speakers decide.
