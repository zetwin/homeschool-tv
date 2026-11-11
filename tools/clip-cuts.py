#!/usr/bin/env python3
"""Shows what is said where each lesson clip starts and stops, so no clip begins or ends mid-sentence.

Usage: python3 tools/clip-cuts.py [lesson id ...]      (no id = every lesson)
Needs yt-dlp. Install it for one run, then remove it (rule 10, the disk):
  python3 -m venv /tmp/yt && /tmp/yt/bin/pip install -q yt-dlp
  YTDLP=/tmp/yt/bin/yt-dlp python3 tools/clip-cuts.py emotions-1
  rm -rf /tmp/yt
A cut is marked CHECK when the words before it don't end a sentence, or the words after it don't start one.
Auto captions have rough times and sometimes no full stops, so a person still looks at every CHECK.
"""
import glob, os, re, subprocess, sys, tempfile

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
YTDLP = os.environ.get('YTDLP', 'yt-dlp')
ids = sys.argv[1:] or [os.path.basename(f)[:-3] for f in sorted(glob.glob(os.path.join(ROOT, 'channel/episodes/*.js')))]

def clips(lesson):
    text = open(os.path.join(ROOT, 'channel/episodes', lesson + '.js'), encoding='utf-8').read()
    for line in text.splitlines():
        m = re.search(r"id: '([^']+)'.*?youtube: '([^']+)'", line)
        if not m: continue
        start = re.search(r"\bstart: (\d+)", line); end = re.search(r"\bend: (\d+)", line)
        yield m[1], m[2], int(start[1]) if start else 0, int(end[1]) if end else None

def captions(vid, folder):
    subprocess.run([YTDLP, '-q', '--no-simulate', '--skip-download', '--write-auto-subs', '--write-subs', '--sub-langs', 'en,en-orig',
                    '--sub-format', 'vtt', '-o', os.path.join(folder, vid), f'https://www.youtube.com/watch?v={vid}'], capture_output=True)
    files = sorted(glob.glob(os.path.join(folder, vid + '.en*.vtt')), key=lambda f: 'orig' in f)
    if not files: return None
    cues, t = [], None
    for line in open(files[0], encoding='utf-8'):
        m = re.match(r'(\d+):(\d+):([\d.]+) --> ', line)
        if m: t = int(m[1]) * 3600 + int(m[2]) * 60 + float(m[3]); continue
        s = re.sub(r'<[^>]+>', '', line).replace('&nbsp;', ' ').strip()
        if t is not None and s and (not cues or cues[-1][1] != s): cues.append((t, s))
    return cues

def show(cues, at, label):
    before = [s for t, s in cues if t < at][-2:]; after = [s for t, s in cues if t >= at][:2]
    ends = bool(before) and re.search(r'[.!?…"”)\]]$', before[-1])
    starts = not after or re.match(r'^[\[A-Z¿¡"“]', after[0])
    print(f"  {label} {at // 60}:{at % 60:02d}  {'ok' if ends and starts else 'CHECK'}")
    print(f"     before: {' / '.join(before) or '(start of video)'}")
    print(f"     after:  {' / '.join(after) or '(end of video)'}")

with tempfile.TemporaryDirectory() as folder:
    for lesson in ids:
        for scene, vid, start, end in clips(lesson):
            if not start and end is None: continue
            print(f"{lesson} {scene} ({vid})")
            cues = captions(vid, folder)
            if not cues: print('  no English captions: a person must watch the cut points'); continue
            if start: show(cues, start, 'starts')
            if end is not None: show(cues, end, 'stops ')
