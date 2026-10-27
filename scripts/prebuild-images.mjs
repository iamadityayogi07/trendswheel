// Generates resized WebP variants (400/800/1200 wide) of featured/thumbnail/category images into public/_img/.
// Originals are never touched. Skips files whose variant already exists and is newer.
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const ROOT = path.resolve(import.meta.dirname, '..');
const PUBLIC = path.join(ROOT, 'public');
const WIDTHS = [400, 800, 1200];

const sources = new Set();
const postsDir = path.join(ROOT, 'content', 'posts');
for (const f of fs.readdirSync(postsDir)) {
  const p = JSON.parse(fs.readFileSync(path.join(postsDir, f), 'utf8'));
  for (const i of [p.featuredImage, p.thumbnailImage]) if (i) sources.add(i);
}
for (const c of JSON.parse(fs.readFileSync(path.join(ROOT, 'content', 'categories.json'), 'utf8'))) if (c.featuredImage) sources.add(c.featuredImage);
sources.add('/images/post-placeholder.webp');

let made = 0;
for (const src of sources) {
  const file = path.join(PUBLIC, src);
  if (!fs.existsSync(file) || /\.svg$/i.test(file)) continue;
  const base = src.replace(/\.[a-z0-9]+$/i, '');
  const meta = await sharp(file).metadata();
  for (const w of WIDTHS) {
    if (meta.width && w > meta.width && w !== WIDTHS[0]) continue;
    const out = path.join(PUBLIC, '_img', `${base}-${w}.webp`);
    if (fs.existsSync(out) && fs.statSync(out).mtimeMs > fs.statSync(file).mtimeMs) continue;
    fs.mkdirSync(path.dirname(out), { recursive: true });
    await sharp(file).resize({ width: w, withoutEnlargement: true }).webp({ quality: 78 }).toFile(out);
    made++;
  }
}
console.log(`prebuild-images: ${sources.size} sources, ${made} variants written`);
