// AI lifestyle photos: puts the real catalog product into a warm, sunlit room (OpenAI image edits).
// Usage: OPENAI_API_KEY=... node marketing/ai/generate-images.mjs marketing/ads/<ad>
// Reads <ad>/data.json (+ <ad>/img/<id>.jpg), writes <ad>/ai/<id>.png. Existing files are kept, delete one to regenerate it.
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { join, resolve } from 'node:path';

const adDir = resolve(process.argv[2] ?? '.');
const key = process.env.OPENAI_API_KEY;
if (!key) { console.log('OPENAI_API_KEY not set, skipping AI images'); process.exit(0); }
const MODEL = process.env.OPENAI_IMAGE_MODEL || 'gpt-image-1';

// House style, matched to the DomExpert carousel references
const STYLE = `Photorealistic interior photograph for a premium furniture brand.
Bright, warm Scandinavian-minimal room: golden-hour sunlight through sheer linen curtains casting soft window-frame shadows across a warm cream plaster wall,
light natural oak floor, a beige woven rug, a potted olive tree in a ceramic pot, one small ceramic vase, calm and uncluttered.
Warm beige / cream / honey colour palette, soft natural shadows, shot on a full-frame camera, 35mm lens, eye level, slight 3/4 angle.
No people, no text, no logos, no watermarks.`;

const KEEP = `The furniture piece from the reference photo must appear exactly as it is: same proportions, same number of doors and drawers,
same door layout, same handles, same colours and materials, same mirror panels. Do not add, remove or redesign any part of it.
Show the whole piece, standing on the floor against the wall, filling about 60% of the frame height, sharp and in focus.`;

const data = JSON.parse(readFileSync(join(adDir, 'data.json'), 'utf8'));
mkdirSync(join(adDir, 'ai'), { recursive: true });

for (const it of data) {
  const out = join(adDir, 'ai', `${it.id}.png`);
  if (existsSync(out)) { console.log('keep', out); continue; }
  const src = join(adDir, it.photo ?? '');
  if (!it.photo || !existsSync(src)) { console.log('no product photo for', it.name); continue; }

  const buf = readFileSync(src);
  const type = buf.subarray(8, 12).toString() === 'WEBP' ? 'image/webp' : buf[0] === 0x89 ? 'image/png' : 'image/jpeg';
  const form = new FormData();
  form.append('model', MODEL);
  form.append('image', new Blob([buf], { type }), `product.${type.split('/')[1]}`);
  form.append('prompt', `${STYLE}\n\n${it.scene}\n\n${KEEP}`);
  form.append('size', '1024x1536');
  form.append('quality', 'high');
  form.append('input_fidelity', 'high');

  const res = await fetch('https://api.openai.com/v1/images/edits', {
    method: 'POST', headers: { Authorization: `Bearer ${key}` }, body: form,
  });
  const json = await res.json();
  if (!res.ok) { console.error('failed', it.name, res.status, json.error?.message); process.exitCode = 1; continue; }
  writeFileSync(out, Buffer.from(json.data[0].b64_json, 'base64'));
  console.log('wrote', out);
}
