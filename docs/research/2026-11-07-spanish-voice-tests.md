# Spanish voice tests

Date: 2026-11-07. Why: the owner said the Spanish "sounds so broken", and native speakers said the man sounds wrong. Claude can't hear audio, so these tests measure **clarity only**: speech recognition (Whisper small, run on this Mac) writes down what it hears, and we compare it with the words we meant. **None of this says whether a voice sounds natural or pleasant. Native speakers decide that.**

## Is the recognizer fair on single words?
Yes. Apple's built-in Spanish voices were used only as a control here, not in lessons.
| Voice | 10 words, each alone | 10 words in a list | Sentence |
|---|---|---|---|
| Apple Mónica (control) | 9/10 | 10/10 | 100% |
| Apple Paulina (control) | 9/10 | 10/10 | 100% |
| Kokoro Dora, as used | 6/10 | 3/10 | 100% |
| Kokoro Alex | 4/10 | 6/10 | 100% |
| Piper Dave | 1/10 | 1/10 | 96% |

On all 35 short words the lesson uses: control 31/35, Dora 22/35. **Kokoro distorts lone Spanish words**, for example "casa" as "cazad", "mapa" as "mapar" and "hola" as "gola". Its sentences are fine. 85 of the lesson's 126 Spanish parts are one or two words.

## Things that did not help, or made it worse
- The full-size Kokoro model instead of the compressed one: no better.
- Removing the period after a lone word: looked better on 10 words (3 to 9 in a list), but on all 35 words it barely changed (26 to 28). Not the cause.
- Saying the word inside a phrase and cutting it out: Kokoro leaves no clean gap to cut at.
- Speaking slower (0.75): worse, 10/35 alone.
- Piper Aldo: least clear of all in sentences (88% at a normal pace), so he was taken out.

## Chatterbox multilingual (MIT license)
Same 10 words:
| Voice in Chatterbox | Alone | In a list | Sentence | Pitch |
|---|---|---|---|---|
| Its default voice | 4/10 | 10/10 | 96% | 176 Hz |
| Sounding like Aldo (a real person's clip) | 7/10 | 10/10 | 100% | 155 Hz |
| Sounding like Kokoro Alex | 8/10 | 10/10 | 100% | 130 Hz |

It sometimes repeats a short word or adds sounds, so it's used with **takes**: two takes of each line per round, and a take is kept only if the recognizer hears exactly the right words and it isn't too long. All 58 distinct Spanish lines of Lesson 1 passed within 7 rounds.

## Result in Lesson 1
- Spanish-only lines: 95% on average, against 0% for the old recordings of hola, casa, mapa and cama.
- Mateo's 3 lines: 100%. Pitch about 123 Hz.
- One line, "Estar", is heard as "Está". Its take passes, and small changes such as a few milliseconds of silence flip the answer, so it's at the edge of what the recognizer can tell. Not a known fault.
- Loudness inside mixed English and Spanish lines looked steady. How the joins sound wasn't judged.

## Sources
- [Chatterbox model card, MIT](https://huggingface.co/ResembleAI/chatterbox), [code and license](https://github.com/resemble-ai/chatterbox)
- [Kokoro voices, and its note that non-English may be weak](https://huggingface.co/hexgrad/Kokoro-82M/blob/main/VOICES.md)
- [Ald dataset, Unlicense](https://huggingface.co/datasets/rmcpantoja/Ald_Mexican_Spanish_speech_dataset). Speaker consent for commercial use is unverified, so it is not used in lessons
