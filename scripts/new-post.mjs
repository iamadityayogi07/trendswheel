// Creates content/posts/<slug>.json from a template.
// Usage: npm run new-post -- <category-slug> <post-slug> "Post title"
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const [categorySlug, slug, ...titleParts] = process.argv.slice(2);
const title = titleParts.join(' ').trim();

if (!categorySlug || !slug || !title) {
  console.error('Usage: npm run new-post -- <category-slug> <post-slug> "Post title"');
  process.exit(1);
}
const categories = JSON.parse(fs.readFileSync(path.join(ROOT, 'content', 'categories.json'), 'utf8'));
const category = categories.find((c) => c.slug === categorySlug);
if (!category) {
  console.error(`Unknown category "${categorySlug}". Use one of: ${categories.map((c) => c.slug).join(', ')}`);
  process.exit(1);
}
if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
  console.error('The slug may only contain lowercase letters, numbers and hyphens.');
  process.exit(1);
}
const file = path.join(ROOT, 'content', 'posts', `${slug}.json`);
if (fs.existsSync(file)) {
  console.error(`${file} already exists`);
  process.exit(1);
}
const posts = fs.readdirSync(path.dirname(file)).map((f) => JSON.parse(fs.readFileSync(path.join(path.dirname(file), f), 'utf8')));
const now = new Date().toISOString();

const post = {
  id: Math.max(0, ...posts.map((p) => p.id)) + 1,
  slug,
  title,
  html: '<p>Write the article body here as HTML.</p>',
  excerpt: '',
  description: 'One or two sentences shown on cards.',
  metaTitle: title,
  metaDescription: 'Write the meta description here (about 150 characters).',
  metaKeywords: '',
  publishedAt: now,
  updatedAt: now,
  category: { name: category.name, slug: category.slug },
  tags: [],
  author: { name: 'Aditya Yogi', slug: 'aditya-yogi' },
  featuredImage: '/posts/your-image.webp',
  thumbnailImage: null,
  altImage: title,
  faq: [],
  impressions: 0,
  oldPath: `/${category.slug}/${slug}`,
};
fs.writeFileSync(file, JSON.stringify(post, null, 2) + '\n');
console.log(`Created ${path.relative(ROOT, file)}\nNext: edit it, put the image in public/posts/, run npm run build.`);
