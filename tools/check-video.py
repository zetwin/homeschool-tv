#!/usr/bin/env python3
"""Reads what YouTube says about a video before it goes in a lesson: channel, length, description and chapters.

Claude can't watch a video, and YouTube blocks automatic transcript reading, so this only rules videos out.
A person still has to watch every video. See docs/rules/VIDEO-RULES.md.
Usage: python3 tools/check-video.py <id> [more ids]
       python3 tools/check-video.py --search "words to search"
"""
import re
import sys
import time
import urllib.parse
import urllib.request

UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36'
OFF_TOPIC = ['unbox', 'toy', 'review', 'sponsor', 'subscribe', 'giveaway', 'merch', 'discount', 'patreon', 'my channel']


def get(url):
    req = urllib.request.Request(url, headers={'User-Agent': UA, 'Accept-Language': 'en'})
    with urllib.request.urlopen(req, timeout=30) as r:
        return r.read().decode('utf-8', 'replace')


def first(pattern, text, default=''):
    m = re.search(pattern, text)
    return m[1] if m else default


def report(vid):
    page = get(f'https://www.youtube.com/watch?v={vid}')
    title = first(r'"title":"([^"]+)","lengthSeconds', page)
    print(f'\n=== {vid}: {title}')
    length = int(first(r'"lengthSeconds":"(\d+)"', page, '0'))
    print(f'channel: {first(r"\"ownerChannelName\":\"([^\"]+)\"", page)} | length: {length // 60}:{length % 60:02d} | can play inside our lesson: {first(r"\"playableInEmbed\":(\w+)", page)}')
    description = first(r'"shortDescription":"(.{0,260})', page).replace('\\n', ' ')
    print('description:', description)
    chapters = re.findall(r'"chapterRenderer":\{"title":\{"simpleText":"([^"]+)"\}.*?"timeRangeStartMillis":(\d+)', page)
    chapters = list(dict((t, int(ms) // 1000) for t, ms in chapters).items())
    print('chapters:', '; '.join(f'{s // 60}:{s % 60:02d} {t}' for t, s in chapters) or 'none listed')
    low = (title + ' ' + description + ' ' + ' '.join(t for t, _ in chapters)).lower()
    print('warning words:', [w for w in OFF_TOPIC if w in low] or 'none')


def search(words):
    page = get('https://www.youtube.com/results?search_query=' + urllib.parse.quote(words))
    found = re.findall(r'"videoRenderer":\{"videoId":"([\w-]{11})".*?"title":\{"runs":\[\{"text":"([^"]+)".*?"ownerText":\{"runs":\[\{"text":"([^"]+)".*?"lengthText":\{.*?"simpleText":"([\d:]+)"', page)
    print(f'\n--- {words}')
    for vid, title, channel, length in found[:12]:
        print(f'{vid} | {length} | {channel} | {title}')


args = sys.argv[1:]
if args[:1] == ['--search']:
    for words in args[1:]:
        search(words)
        time.sleep(1)
else:
    for vid in args:
        try:
            report(vid)
        except Exception as e:
            print(f'\n=== {vid}: could not read ({e})')
        time.sleep(1)
