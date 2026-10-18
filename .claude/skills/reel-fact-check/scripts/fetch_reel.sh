#!/usr/bin/env bash
# Сваля reel (или ползва локален видео файл) и вади: meta, описание, аудио, кадри, транскрипт.
# Употреба: fetch_reel.sh <URL или път до видео> [out_dir]
set -uo pipefail

SRC="${1:?Употреба: fetch_reel.sh <URL или видео файл> [out_dir]}"
OUT="${2:-./reel_out}"
mkdir -p "$OUT/frames"

if [[ -f "$SRC" ]]; then
  cp "$SRC" "$OUT/video.mp4"
else
  SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
  YTDLP=$(command -v yt-dlp || true)
  if [[ -z "$YTDLP" ]]; then
    # pip често е блокиран в облачни среди — GitHub release-ът обикновено минава
    YTDLP="$OUT/.yt-dlp"
    pip install -q -U yt-dlp >/dev/null 2>&1 && YTDLP=$(command -v yt-dlp) \
      || { curl -sSL --max-time 60 -o "$YTDLP" https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp \
           && chmod +x "$YTDLP"; } || YTDLP=""
  fi
  COOKIES=()
  [[ -n "${IG_COOKIES:-}" && -f "$IG_COOKIES" ]] && COOKIES=(--cookies "$IG_COOKIES")
  if [[ -z "$YTDLP" ]] || ! "$YTDLP" "${COOKIES[@]}" -q --no-warnings \
      -f "mp4/best" -o "$OUT/video.%(ext)s" \
      --write-info-json --write-description --write-subs --write-auto-subs --sub-langs "bg,en,.*" \
      "$SRC"; then
    echo "yt-dlp не успя — опитвам през headless браузър..." >&2
    python3 -I "$SCRIPT_DIR/ig_browser_fetch.py" "$SRC" "$OUT" \
      || { echo "ERROR: свалянето не успя (login стена / private акаунт) — поискай видеото от потребителя" >&2; exit 3; }
    if [[ -f "$OUT/a.mp4" ]]; then
      ffmpeg -loglevel error -y -i "$OUT/v.mp4" -i "$OUT/a.mp4" -c copy "$OUT/video.mp4"
    else
      mv "$OUT/v.mp4" "$OUT/video.mp4"
    fi
    rm -f "$OUT/v.mp4" "$OUT/a.mp4"
  fi
  VID=$(ls "$OUT"/video.* 2>/dev/null | grep -Ev '\.(json|description|vtt|srt)$' | head -1)
  [[ -n "$VID" && "$VID" != "$OUT/video.mp4" ]] && mv "$VID" "$OUT/video.mp4"
  [[ -f "$OUT/video.info.json" ]] && python3 - "$OUT" <<'PY'
import json, sys, os
out = sys.argv[1]
d = json.load(open(os.path.join(out, "video.info.json")))
keep = {k: d.get(k) for k in ("title", "uploader", "uploader_id", "channel", "upload_date",
                              "duration", "view_count", "like_count", "comment_count", "webpage_url")}
json.dump(keep, open(os.path.join(out, "meta.json"), "w"), ensure_ascii=False, indent=2)
open(os.path.join(out, "description.txt"), "w").write(d.get("description") or "")
PY
fi

[[ -f "$OUT/video.mp4" ]] || { echo "ERROR: няма видео файл" >&2; exit 4; }

# Аудио (16 kHz моно — за транскрипция) и кадри на всеки 2 сек.
ffmpeg -loglevel error -y -i "$OUT/video.mp4" -vn -ac 1 -ar 16000 "$OUT/audio.wav"
ffmpeg -loglevel error -y -i "$OUT/video.mp4" -vf "fps=1/2,scale=720:-2" "$OUT/frames/f_%03d.jpg"

# Транскрипт, ако има Whisper
if python3 -c "import faster_whisper" 2>/dev/null; then
  python3 - "$OUT" <<'PY'
import sys, os
from faster_whisper import WhisperModel
out = sys.argv[1]
model = WhisperModel(os.environ.get("WHISPER_MODEL", "small"), compute_type="int8")
segs, info = model.transcribe(os.path.join(out, "audio.wav"))
with open(os.path.join(out, "transcript.txt"), "w") as f:
    f.write(f"# language: {info.language}\n")
    for s in segs:
        f.write(f"[{s.start:6.1f}s] {s.text.strip()}\n")
PY
elif command -v whisper >/dev/null 2>&1; then
  whisper "$OUT/audio.wav" --model small --output_format txt --output_dir "$OUT" >/dev/null 2>&1 \
    && mv "$OUT/audio.txt" "$OUT/transcript.txt"
else
  echo "Няма Whisper — без транскрипт на говора (pip install faster-whisper)." >&2
fi

echo "Готово: $OUT"
ls -1 "$OUT" | sed 's/^/  /'
echo "  кадри: $(ls "$OUT/frames" | wc -l)"
