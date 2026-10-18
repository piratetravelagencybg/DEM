# DomExpert — бележки за /brag-slim

Готов пример: промо видео за domexpertmebel.com (вертикално 1080×1920, 21.5 s), направено с /brag-slim.
`brag-plan.md` е сценарият, `index.html` е композицията (`window.renderAt(t)` рисува всеки кадър), `render.mjs` прави кадрите.

## Марка
- Цветове (`tailwind.config.ts`): cream `#F5F0E8`, walnut `#8B6F47`, walnut-dark `#6B5235`, charcoal `#2C2C2C`, light-tan `#E8DDD0`, sand `#D4C4A8`.
- Шрифтове: Cormorant Garamond (заглавия) + DM Sans (текст). Ако Google Fonts е блокиран, вземи ги от GitHub:
  `git clone --depth 1 --filter=blob:none --sparse https://github.com/google/fonts && git -C fonts sparse-checkout set ofl/cormorantgaramond ofl/dmsans`
- Лого: `public/images/logo-gold.png` има „вграден“ шахматен фон (няма истинска прозрачност). Ползвай `logo-clean.png` от тази папка.
- Твърдения, които може да се ползват (от сайта): 3D проект с точни размери; коригираме до одобрение; стойността на проекта се приспада при поръчка; 14+ години опит (`site-config.ts`: от 2012); 100+ проекта; 2 г. гаранция; Благоевград · София · региона.
- Не пиши „реални проекти“ върху снимките от `public/images/real/` — повечето са визуализации.
- Огледът: сайтът си противоречи (50 € срещу безплатен) — не го споменавай, докато не се уточни.

## Медия от сайта
- `public/video/kitchen-tour-16x9-compressed.mp4` — 3D обиколка на кухня (30 s). Вертикален кроп с чекмедже: `-ss 12.6 -t 3.8 -vf "crop=608:1080:820:0,scale=1080:1920"`.
- `public/portfolio/kuhnya-domexpert-v17/` — 3D проект на същата кухня (3 ракурса).
- `public/images/real/` — кухни, гардероби, спални, дневни.

## Рендер в облачна сесия
- Playwright: `/opt/node22/lib/node_modules/playwright/index.mjs`, Chromium: `/opt/pw-browsers/chromium`.
- `node render.mjs stills 1.2,4.1,...` → проверка на кадри (включително по средата на прехода); `node render.mjs frames` → всички кадри.
- Сглобяване: `ffmpeg -framerate 30 -i frames/f_%04d.jpg -i audio.wav -c:v libx264 -crf 18 -pix_fmt yuv420p -c:a aac brag.mp4`.
- Музика: `../brag/assets/music/` (vol-11, 114.8 BPM — силни удари 3.70 / 8.96 / 12.65 / 17.91). Провери лиценза на ende.app преди публикуване.
