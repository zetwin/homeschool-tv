# Records takes with the Chatterbox multilingual model. Used by chatterbox-make.mjs. Usage: python chatterbox-es.py jobs.json outdir
import json, os, sys, time
import torch, torchaudio as ta
from chatterbox.mtl_tts import ChatterboxMultilingualTTS
jobs, out = json.load(open(sys.argv[1])), sys.argv[2]
device = 'mps' if torch.backends.mps.is_available() else 'cpu'
model = ChatterboxMultilingualTTS.from_pretrained(device=device)
for n, job in enumerate(jobs, 1):
    file = os.path.join(out, job['take'] + '.wav')
    if os.path.exists(file): continue
    torch.manual_seed(job['seed'])
    start = time.time()
    try:
        wav = model.generate(job['text'], language_id='es', audio_prompt_path=job['ref'], exaggeration=0.5, cfg_weight=0.5, temperature=0.6)
    except Exception as error:  # A very short line can crash the model. Skip this take, and another round tries again.
        print(f"{n}/{len(jobs)} {job['text'][:40]} failed: {error}", flush=True)
        continue
    ta.save(file + '.tmp.wav', wav.cpu(), model.sr)
    os.replace(file + '.tmp.wav', file)
    print(f"{n}/{len(jobs)} {job['text'][:40]} {wav.shape[-1] / model.sr:.1f}s in {time.time() - start:.0f}s", flush=True)
