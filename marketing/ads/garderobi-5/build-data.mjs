// Picks the products for this ad from data/mbx-import.json and tries to download their photos.
// Usage: node build-data.mjs            -> writes data.json (+ img/<groupId>.jpg when mbx.bg is reachable)
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, '../../..');

// groupId -> illustration palette (used only while the real photo is missing)
// scene = room direction for the AI photo (marketing/ai/generate-images.mjs)
const PICK = [
  { group: '412', shape: 'Wardrobe shape: about as wide as it is tall; FOUR hinged white high-gloss doors in a light grey oak frame. The two left doors are single full-height panels from top to bottom (no split). One thin dark horizontal handle strip runs across at two-thirds height; below it on the right exactly TWO drawers with one more dark strip between them. Nothing is placed on or against the wardrobe.', body: 'greyOak', front: 'whiteGloss', doors: 4, // Livorno
    scene: 'A light bedroom: the wardrobe stands against the wall on the left, the corner of a bed with white linen and a knitted beige throw on the right, a tall window with sheer curtains.' },
  { group: '406', shape: 'Wardrobe shape: clearly wider than it is tall; TWO wide sliding doors in dark walnut-brown wood; one trapezoid mirror panel running across the middle of both doors.', body: 'brandyOak', front: 'brandyOak', doors: 4, // Agata
    scene: 'A cosy bedroom with warm wood tones: the wardrobe against a cream wall, a linen armchair and a floor lamp beside it, a window with sheer curtains on the right.' },
  { group: '409', shape: 'Wardrobe shape: about as wide as it is tall; TWO sliding doors: the left door is mirror panels with one black high-gloss horizontal strip, the right door is brown wood panels with the same black strip.', body: 'brandyOak', front: 'blackGloss', doors: 3, // Federico
    scene: 'A modern bedroom with a touch of contrast: the wardrobe against a warm greige wall, a low bed with beige bedding in the foreground corner, two abstract framed prints, a tall window on the right.' },
  { group: '418', shape: 'Wardrobe shape: much wider than it is tall (220 cm wide); TWO sliding doors in white high-gloss with one horizontal light grey oak band across both doors.', body: 'greyOak', front: 'whiteGloss', doors: 4, // Treviso
    scene: 'A spacious calm bedroom: the wide sliding-door wardrobe fills the back wall, the foot of a bed with cream linen and a beige throw in the foreground, a window on the left.' },
  { group: '414', shape: 'Wardrobe shape: about as wide as it is tall; FOUR hinged doors: the two outer doors are rustic light oak with black bar handles, the two middle doors are mirrors; below the mirrors one anthracite drawer and two oak drawers.', body: 'coastOak', front: 'anthracite', doors: 3, // Pulsar
    scene: 'A natural-wood bedroom: the wardrobe against a cream wall, a bench with a folded linen blanket in front of it, an olive tree by a tall window on the right.' },
];

const groups = JSON.parse(readFileSync(join(root, 'data/mbx-import.json'), 'utf8')).groups;
mkdirSync(join(here, 'img'), { recursive: true });

const items = [];
for (const p of PICK) {
  const v = groups.find((g) => g.groupId === p.group).variants[0];
  // "Гардероб Livorno (сив дъб кастело + бял гланц, 200)"
  const m = v.productName.match(/^Гардероб\s+(\S+)\s*\((.+?),\s*(\d+)\)/);
  const img = join('img', `${p.group}.jpg`);
  if (!existsSync(join(here, img))) {
    try {
      const res = await fetch(v.imageUrl);
      if (res.ok) writeFileSync(join(here, img), Buffer.from(await res.arrayBuffer()));
    } catch { /* host blocked -> illustration fallback */ }
  }
  items.push({
    id: p.group,
    name: m[1],
    finish: m[2],
    width: +m[3],
    price: v.priceVat,
    url: `domexpertmebel.com/каталог/${v.slug}/`,
    photo: existsSync(join(here, img)) ? img : null,
    illo: { body: p.body, front: p.front, doors: p.doors },
    scene: p.scene,
    shape: p.shape,
    ai: existsSync(join(here, 'ai', `${p.group}.png`)) ? `ai/${p.group}.png` : null,
  });
}
items.sort((a, b) => a.price - b.price);
writeFileSync(join(here, 'data.json'), JSON.stringify(items, null, 2) + '\n');
writeFileSync(join(here, 'data.js'), `window.ITEMS = ${JSON.stringify(items)};\n`); // file:// pages can't fetch JSON
console.log(items.map((i) => `${i.name} ${i.price} € photo=${!!i.photo}`).join('\n'));
