#!/usr/bin/env python3
"""Резервен вариант, когато yt-dlp е блокиран от Instagram (иска login).
Отваря публичната страница на reel-а в headless Chromium, вади описанието
и DASH пистите (видео + аудио) и ги сваля в <out_dir>/v.mp4 и a.mp4.
Употреба: ig_browser_fetch.py <URL> <out_dir>
"""
import html
import json
import os
import re
import shutil
import subprocess
import sys
import urllib.request

url, out = sys.argv[1], sys.argv[2]
os.makedirs(out, exist_ok=True)

chromium = next((p for p in (os.environ.get("CHROMIUM"), "/opt/pw-browsers/chromium",
                             shutil.which("chromium"), shutil.which("google-chrome"))
                 if p and os.path.exists(p)), None)
if not chromium:
    sys.exit("ERROR: няма Chromium")

dom = subprocess.run([chromium, "--headless=new", "--no-sandbox", "--virtual-time-budget=15000",
                      "--dump-dom", url], capture_output=True, text=True, timeout=90).stdout
open(os.path.join(out, "dom.html"), "w").write(dom)


def meta(prop):
    m = re.search(r'<meta (?:property|name)="%s" content="([^"]*)"' % re.escape(prop), dom)
    return html.unescape(m.group(1)) if m else None


# og:title = 'Автор on Instagram: "<описание>"', og:description = 'N likes, M comments - автор on <дата>: "..."'
info = {"url": url, "og_title": meta("og:title"), "og_description": meta("og:description")}
json.dump(info, open(os.path.join(out, "meta.json"), "w"), ensure_ascii=False, indent=2)
cap = re.search(r'on Instagram: "(.*)"\s*$', info["og_title"] or "", re.S)
open(os.path.join(out, "description.txt"), "w").write(cap.group(1) if cap else (info["og_title"] or ""))

u = (dom.replace("\\/", "/").replace("\\u003C", "<").replace("\\u003E", ">")
     .replace("\\u00253D", "%3D").replace('\\"', '"'))
reps = re.findall(r'<Representation[^>]*?codecs="([^"]*)"[^>]*>.*?<BaseURL>([^<]+)</BaseURL>', u, re.S)
video = next((html.unescape(b) for c, b in reps if c.startswith("avc") or c.startswith("hvc")), None)
audio = next((html.unescape(b) for c, b in reps if c.startswith("mp4a")), None)
if not video:
    sys.exit("ERROR: не намерих видео в страницата (вероятно login стена) — поискай файла от потребителя")

for name, link in (("v.mp4", video), ("a.mp4", audio)):
    if link:
        urllib.request.urlretrieve(link, os.path.join(out, name))
print("OK", json.dumps(info, ensure_ascii=False))
