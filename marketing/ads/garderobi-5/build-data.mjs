// Picks the products for this ad from data/mbx-import.json and tries to download their photos.
// Usage: node build-data.mjs            -> writes data.json (+ img/<groupId>.jpg when mbx.bg is reachable)
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, '../../..');

// groupId -> illustration palette (used only while the real photo is missing)
const PICK = [
  { group: '412', body: 'greyOak', front: 'whiteGloss', doors: 4 }, // Livorno
  { group: '406', body: 'brandyOak', front: 'brandyOak', doors: 4 }, // Agata
  { group: '409', body: 'brandyOak', front: 'blackGloss', doors: 3 }, // Federico
  { group: '418', body: 'greyOak', front: 'whiteGloss', doors: 4 }, // Treviso
  { group: '414', body: 'coastOak', front: 'anthracite', doors: 3 }, // Pulsar
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
    name: m[1],
    finish: m[2],
    width: +m[3],
    price: v.priceVat,
    url: `domexpertmebel.com/каталог/${v.slug}/`,
    photo: existsSync(join(here, img)) ? img : null,
    illo: { body: p.body, front: p.front, doors: p.doors },
  });
}
items.sort((a, b) => a.price - b.price);
writeFileSync(join(here, 'data.json'), JSON.stringify(items, null, 2) + '\n');
writeFileSync(join(here, 'data.js'), `window.ITEMS = ${JSON.stringify(items)};\n`); // file:// pages can't fetch JSON
console.log(items.map((i) => `${i.name} ${i.price} € photo=${!!i.photo}`).join('\n'));
