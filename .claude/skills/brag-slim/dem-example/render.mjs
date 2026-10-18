// Usage: node render.mjs stills <t1,t2,...>  |  node render.mjs frames
import { chromium } from '/opt/node22/lib/node_modules/playwright/index.mjs';
import { mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const [mode, list] = process.argv.slice(2);
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const page = await browser.newPage({ viewport: { width: 1080, height: 1920 } });
await page.goto('file://' + join(here, 'index.html'));
await page.evaluate(async () => { await document.fonts.ready; await Promise.all([...document.images].map(i => i.decode().catch(() => {}))); });

const shot = async (t, path) => {
  await page.evaluate(t => window.renderAt(t), t);
  await page.screenshot({ path, type: 'jpeg', quality: 92 });
};

if (mode === 'stills') {
  mkdirSync(join(here, 'stills'), { recursive: true });
  for (const t of list.split(',').map(Number)) await shot(t, join(here, 'stills', `s_${t.toFixed(2)}.jpg`));
} else {
  mkdirSync(join(here, 'frames'), { recursive: true });
  const dur = await page.evaluate(() => window.DURATION);
  const n = Math.round(dur * 30);
  for (let i = 0; i < n; i++) await shot(i / 30, join(here, 'frames', `f_${String(i).padStart(4, '0')}.jpg`));
  console.log('frames', n);
}
await browser.close();
