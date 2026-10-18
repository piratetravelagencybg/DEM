# Реклама: 5 гардероба под 1 000 € (Reel 1080×1920, 18.6 s)

Данните идват от `data/mbx-import.json` (име, покритие, ширина, цена, slug).

```
node build-data.mjs                # избира продуктите -> data.json/data.js, сваля снимките в img/ (ако www.mbx.bg е достъпен)
node render.mjs stills 3.4,5.6     # проверка на кадри
node render.mjs frames             # всички кадри
node render.mjs stills 3.0 && cp stills/s_3.00.jpg poster.jpg && cp poster.jpg frames/f_0000.jpg
ffmpeg -y -framerate 30 -i frames/f_%04d.jpg -i ../../../.claude/skills/brag/assets/music/happy-beats-business-moves-vol-11-by-ende-dot-app.mp3 \
  -t 18.6 -af "afade=t=out:st=17.1:d=1.5" -c:v libx264 -crf 18 -pix_fmt yuv420p -c:a aac -b:a 192k -shortest -movflags +faststart garderobi-5.mp4
```

- Продуктите се сменят в `PICK` в `build-data.mjs`.
- Докато няма снимка в `img/<groupId>.jpg`, клипът рисува илюстрация на гардероба в цветовете на покритието.
- Музика: ende.app „Happy Beats / Business Moves vol. 11“ — провери лиценза преди платена реклама.
