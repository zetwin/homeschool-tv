"""Downloads open-license lesson images from Wikimedia Commons and adds them to the credits.
Usage: python3 fetch-images.py <folder> [key "File title.jpg"]...  With no pairs, it fetches the skeleton lesson's images."""
import json
import pathlib
import re
import sys
import time
import urllib.error
import urllib.parse
import urllib.request

UA = {"User-Agent": "HomeSchoolPrototype/1.0 (family education project)"}
OUT = pathlib.Path(sys.argv[1])
OUT.mkdir(parents=True, exist_ok=True)

IMAGES = {
    "skeleton-photo": "Human Skeleton HNM 2.jpg",
    "skeleton-tall": "Human Skeleton 01.jpg",
    "plate-front": "Thomson plate 01 - male skeleton, front view.webp",
    "hand-xray": "814 Radiograph of Hand.jpg",
    "knee-xray": "X-ray of a normal knee by lateral projection.jpg",
    "whale": "Blue whale skeleton at the Central Hall of the Natural History Museum 2026-09-03 (1).jpg",
    "giraffe": "Skeleton of a giraffe, National Museum of Bosnia and Herzegovina.jpg",
    "skull": "Human skull;Oral anaesthesia (1914).jpg",
    "long-bone": "603 Anatomy of a Long Bone.jpg",
    "femur-plate": "Gray244.png",
    "bone-1900": "Anatomy, physiology and hygiene (1900) (14775861451).jpg",
    "encyclopedia-1911": "EB1911 - Skeleton - Fig 5.png",
}


def clean(text):
    return re.sub(r"\s+", " ", re.sub(r"<[^>]+>", "", text or "")).strip()


def fetch(url):
    """Wikimedia limits request rates, so wait and retry when it says to slow down."""
    for wait in (10, 30, 60, 120):
        try:
            time.sleep(4)
            return urllib.request.urlopen(urllib.request.Request(url, headers=UA), timeout=60).read()
        except urllib.error.HTTPError as error:
            if error.code != 429:
                raise
            time.sleep(wait)
    raise RuntimeError("Still rate limited: " + url)


if len(sys.argv) > 2:
    IMAGES = dict(zip(sys.argv[2::2], sys.argv[3::2]))
credits_file = OUT / "credits.json"
credits = json.loads(credits_file.read_text()) if credits_file.exists() else {}
for key, title in IMAGES.items():
    query = urllib.parse.urlencode(dict(
        action="query", titles="File:" + title, prop="imageinfo",
        iiprop="url|size|extmetadata|mime", iiurlwidth=1280, format="json"))
    page = next(iter(json.loads(fetch("https://commons.wikimedia.org/w/api.php?" + query))["query"]["pages"].values()))
    info = page["imageinfo"][0]
    meta = info["extmetadata"]
    url = info.get("thumburl") or info["url"]
    suffix = pathlib.Path(urllib.parse.urlparse(url).path).suffix.lower() or ".jpg"
    target = OUT / (key + suffix)
    target.write_bytes(fetch(url))
    credits[key] = {
        "file": target.name,
        "title": title,
        "author": clean(meta.get("Artist", {}).get("value")),
        "license": meta.get("LicenseShortName", {}).get("value"),
        "page": info["descriptionurl"],
    }
    print(key, target.stat().st_size // 1024, "KB", credits[key]["license"], "|", credits[key]["author"][:60])

credits_file.write_text(json.dumps(credits, indent=2))
