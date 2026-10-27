// Read-only export of the old Laravel database + public files into content/ and public/.
// Usage: node scripts/export-content.mjs [path-to-old-laravel-folder]
// DB credentials are read from the old project's .env and are never printed.
import fs from 'node:fs';
import path from 'node:path';
import mysql from 'mysql2/promise';

const OLD = path.resolve(process.argv[2] || 'C:/wamp64/www/trendswheel-live');
const ROOT = path.resolve(import.meta.dirname, '..');
const CONTENT = path.join(ROOT, 'content');
const PUBLIC = path.join(ROOT, 'public');
const SITE_URL = 'https://trendswheel.com';

function readEnv(file) {
  const out = {};
  for (const line of fs.readFileSync(file, 'utf8').split(/\r?\n/)) {
    const m = line.match(/^([A-Z0-9_]+)=(.*)$/);
    if (m) out[m[1]] = m[2].trim().replace(/^["']|["']$/g, '');
  }
  return out;
}

const env = readEnv(path.join(OLD, '.env'));
const db = await mysql.createConnection({
  host: env.DB_HOST,
  port: Number(env.DB_PORT || 3306),
  user: env.DB_USERNAME,
  password: env.DB_PASSWORD,
  database: env.DB_DATABASE,
  charset: 'utf8mb4',
  dateStrings: true, // keep raw 'YYYY-MM-DD HH:MM:SS' (app timezone Asia/Kolkata)
});

// Laravel stores timestamps in app timezone (Asia/Kolkata, +05:30) and emits toIso8601String().
const iso = (s) => (s ? `${String(s).replace(' ', 'T')}+05:30` : null);

const [cats] = await db.query('SELECT * FROM categories ORDER BY id');
const [users] = await db.query('SELECT * FROM users ORDER BY id');
const [posts] = await db.query("SELECT * FROM posts WHERE status = 'published' ORDER BY id");
const [drafts] = await db.query("SELECT id, slug, title, category_id FROM posts WHERE status <> 'published' ORDER BY id");
const [redirects] = await db.query('SELECT from_path, to_path, status_code, active FROM seo_redirects ORDER BY id');
const [settingsRows] = await db.query('SELECT * FROM settings');
await db.end();

const catById = new Map(cats.map((c) => [c.id, c]));
const userById = new Map(users.map((u) => [u.id, u]));

const parseJson = (s, fallback) => {
  if (!s) return fallback;
  try {
    const v = JSON.parse(s);
    return v ?? fallback;
  } catch {
    return fallback;
  }
};
const urlPath = (p) => (p ? '/' + String(p).replace(/^\/+/, '') : null);

fs.rmSync(CONTENT, { recursive: true, force: true });
fs.mkdirSync(path.join(CONTENT, 'posts'), { recursive: true });

// ---- settings (never export credential blocks) ----
let general = {};
for (const row of settingsRows) {
  const data = parseJson(row.data, null);
  if (!data || typeof data !== 'object' || 'password' in data) continue;
  if ('logo' in data || 'title' in data) general = data;
}
const clean = (v) => (typeof v === 'string' && v.trim() !== '' ? v : null);

const site = {
  name: clean(general.title) ?? 'TrendsWheel',
  tagline: clean(general.tagline) ?? 'Premium technology coverage: how-to guides, tech news, apps and social platform reporting.',
  baseUrl: SITE_URL,
  lang: 'en',
  adsensePublisherId: 'ca-pub-1412589887378400',
  gaMeasurementId: 'G-0R1CTGQCDG',
  email: clean(general.email) ?? 'editor@trendswheel.com',
  address: clean(general.address) ?? 'TrendsWheel Media, 4th Floor, Cross Street, Bengaluru, India',
  phone: clean(general.mobile),
  social: Object.fromEntries(Object.entries(general.social ?? {}).filter(([, v]) => v)),
  logo: urlPath(clean(general.logo)),
  favicon: urlPath(clean(general.favIcon) ?? clean(general.favicon)),
  aboutHeading: clean(general.about_heading) ?? `About ${clean(general.title) ?? 'TrendsWheel'}`,
  aboutContent: clean(general.about_content),
  aboutImage: urlPath(clean(general.about_image)),
  aboutImageAlt: clean(general.about_image_alt),
};
fs.writeFileSync(path.join(CONTENT, 'site.json'), JSON.stringify(site, null, 2));

// ---- categories ----
const categories = cats.map((c) => ({
  id: c.id,
  name: c.name,
  slug: c.slug,
  metaTitle: c.meta_title,
  metaDescription: c.meta_description,
  metaKeywords: c.meta_keywords,
  faq: parseJson(c.faq, []),
  featuredImage: urlPath(c.featured_image),
}));
fs.writeFileSync(path.join(CONTENT, 'categories.json'), JSON.stringify(categories, null, 2));

// ---- authors ----
const authors = users
  .filter((u) => u.slug)
  .map((u) => ({
    id: u.id,
    name: u.name,
    slug: u.slug,
    bio: u.bio,
    shortBio: u.short_bio,
    metaBio: u.meta_bio ?? null,
    avatar: urlPath(u.avatar),
    isAdmin: Boolean(u.is_admin),
  }));
fs.writeFileSync(path.join(CONTENT, 'authors.json'), JSON.stringify(authors, null, 2));

// ---- posts ----
const postFiles = [];
const refs = new Set();
for (const p of posts) {
  const cat = catById.get(p.category_id);
  const author = userById.get(p.user_id);
  if (!cat) throw new Error(`Post ${p.slug} has no category`);
  const post = {
    id: p.id,
    slug: p.slug,
    title: p.title,
    html: p.content, // exactly as stored
    excerpt: p.description ?? '',
    description: p.description ?? '',
    metaTitle: p.meta_title,
    metaDescription: p.meta_description,
    metaKeywords: p.meta_keywords,
    publishedAt: iso(p.created_at),
    updatedAt: iso(p.updated_at),
    category: { name: cat.name, slug: cat.slug },
    tags: p.meta_keywords ? p.meta_keywords.split(',').map((t) => t.trim()).filter(Boolean) : [],
    author: author ? { name: author.name, slug: author.slug } : { name: 'Aditya Yogi', slug: 'aditya-yogi' },
    featuredImage: urlPath(p.featured_image),
    thumbnailImage: urlPath(p.thumbnail_image),
    altImage: p.alt_image,
    faq: parseJson(p.faq, []),
    impressions: Number(p.impressions),
    oldPath: `/${cat.slug}/${p.slug}`,
  };
  fs.writeFileSync(path.join(CONTENT, 'posts', `${p.slug}.json`), JSON.stringify(post, null, 2));
  postFiles.push(p.slug);
  for (const f of [post.featuredImage, post.thumbnailImage]) if (f) refs.add(f);
  for (const m of p.content.matchAll(/(?:src|href|srcset|data-src)=["']([^"']+)["']/gi)) refs.add(m[1]);
}
console.log(`published rows: ${posts.length}, exported posts: ${postFiles.length}`);
if (posts.length !== postFiles.length) throw new Error('post count mismatch');

// ---- redirects / drafts / url list ----
fs.mkdirSync(path.join(ROOT, 'migration'), { recursive: true });
fs.writeFileSync(path.join(ROOT, 'migration', 'redirects-old.json'), JSON.stringify(redirects, null, 2));
fs.writeFileSync(
  path.join(ROOT, 'migration', 'drafts-not-published.json'),
  JSON.stringify(drafts.map((d) => ({ id: d.id, slug: d.slug, title: d.title })), null, 2),
);
const staticPaths = ['/', '/about-us', '/contact-us', '/privacy-policy', '/terms-conditions'];
const oldUrls = [
  ...staticPaths,
  ...categories.map((c) => `/${c.slug}`),
  ...authors.map((a) => `/author/${a.slug}`),
  ...postFiles.map((s) => {
    const p = JSON.parse(fs.readFileSync(path.join(CONTENT, 'posts', `${s}.json`), 'utf8'));
    return p.oldPath;
  }),
  '/sitemap.xml',
  '/sitemap-pages.xml',
  '/sitemap-posts.xml',
  '/sitemap-categories.xml',
  '/sitemap-authors.xml',
  '/feed.xml',
  '/robots.txt',
  '/ads.txt',
];
fs.writeFileSync(path.join(ROOT, 'migration', 'old-urls.txt'), oldUrls.join('\n') + '\n');
console.log(`old URLs listed: ${oldUrls.length}`);

// ---- copy public files, same paths ----
function copyDir(src, dest) {
  if (!fs.existsSync(src)) return 0;
  let n = 0;
  fs.mkdirSync(dest, { recursive: true });
  for (const e of fs.readdirSync(src, { withFileTypes: true })) {
    const s = path.join(src, e.name);
    const d = path.join(dest, e.name);
    if (e.isDirectory()) n += copyDir(s, d);
    else {
      fs.copyFileSync(s, d);
      n++;
    }
  }
  return n;
}
let copied = 0;
for (const dir of ['posts', 'images', 'settings', 'uploads', 'assets/category', 'assets/users', 'assets/images', 'web-assets/media']) {
  copied += copyDir(path.join(OLD, 'public', dir), path.join(PUBLIC, dir));
}
for (const f of ['ads.txt', 'favicon.ico']) {
  const s = path.join(OLD, 'public', f);
  if (fs.existsSync(s)) {
    fs.copyFileSync(s, path.join(PUBLIC, f));
    copied++;
  }
}
// storage/app/public -> public/storage (only if present)
copied += copyDir(path.join(OLD, 'storage', 'app', 'public'), path.join(PUBLIC, 'storage'));
console.log(`files copied to public/: ${copied}`);

// ---- verify image references ----
const missing = [];
const big = [];
for (const r of refs) {
  let p = r;
  if (!p || p.startsWith('#') || p.startsWith('mailto:') || p.startsWith('tel:') || p.startsWith('data:')) continue;
  if (p.startsWith(SITE_URL)) p = p.slice(SITE_URL.length);
  else if (/^https?:\/\//.test(p) || p.startsWith('//')) continue;
  p = p.split('#')[0].split('?')[0];
  if (!/\.(png|jpe?g|gif|webp|svg|avif|ico)$/i.test(p)) continue;
  const f = path.join(PUBLIC, decodeURIComponent(p.startsWith('/') ? p : '/' + p));
  if (!fs.existsSync(f)) missing.push(r);
}
function walk(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const f = path.join(dir, e.name);
    if (e.isDirectory()) walk(f);
    else if (fs.statSync(f).size > 25 * 1024 * 1024) big.push(f);
  }
}
walk(PUBLIC);
fs.writeFileSync(path.join(ROOT, 'migration', 'image-check.json'), JSON.stringify({ missing, over25MB: big }, null, 2));
console.log(`missing image refs: ${missing.length}; files over 25MB: ${big.length}`);

// ---- public/_redirects from the old seo_redirects table (chains flattened, 410s cannot be expressed on Pages) ----
{
  const rules = new Map(redirects.filter((r) => r.active).map((r) => [r.from_path, r]));
  const live = new Set(oldUrls);
  const lines = ['/public/* /:splat 301'];
  const gone = [];
  const conflicts = [];
  for (const [from, rule] of rules) {
    let r = rule;
    const seen = new Set([from]);
    while (r.status_code !== 410 && r.to_path && rules.has(r.to_path) && !seen.has(r.to_path)) {
      seen.add(r.to_path);
      r = rules.get(r.to_path);
    }
    if (live.has(from)) {
      conflicts.push(from);
      continue; // a live page wins over a stale rule
    }
    if (r.status_code === 410 || !r.to_path) gone.push(from);
    else if (live.has(r.to_path) || r.to_path === '/') lines.push(`${from} ${r.to_path} 301`);
    else gone.push(from); // target is not a live page
  }
  fs.writeFileSync(path.join(PUBLIC, '_redirects'), lines.join('\n') + '\n');
  fs.writeFileSync(path.join(ROOT, 'migration', 'redirects-gone.txt'), gone.join('\n') + '\n');
  console.log(`_redirects: ${lines.length - 1} 301 rules + /public/*; 410/no-target (served as 404): ${gone.length}; conflicts with live URLs: ${conflicts.length}`);
}

// ---- static legal pages (privacy, terms): body HTML lifted verbatim from the Blade views ----
{
  const views = path.join(OLD, 'resources', 'views', 'web');
  const defs = [
    { key: 'privacy-policy', file: 'privacy-policy.blade.php', heading: 'Privacy Policy' },
    { key: 'terms-conditions', file: 'terms-conditions.blade.php', heading: 'Terms & Conditions' },
  ];
  const pages = {};
  for (const d of defs) {
    const src = fs.readFileSync(path.join(views, d.file), 'utf8');
    const sec = (name) =>
      src.match(new RegExp(String.raw`@section\('${name}',\s*'((?:[^'\\]|\\.)*)'\)`))?.[1].replaceAll("\\'", "'");
    const body = src.match(/<div class="content">([\s\S]*?)<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/section>/)?.[1];
    const updated = src.match(/Last Updated: ([^<]+)</)?.[1];
    if (!body || !sec('title')) throw new Error(`Could not parse ${d.file}`);
    pages[d.key] = {
      heading: d.heading,
      title: sec('title'),
      metaDescription: sec('meta_description'),
      metaKeywords: sec('meta_keywords'),
      lastUpdated: updated,
      html: body.replace(/\{\{\s*route\('home'\)\s*\}\}/g, SITE_URL).trim(),
    };
  }
  fs.writeFileSync(path.join(CONTENT, 'pages.json'), JSON.stringify(pages, null, 2));
  console.log(`pages.json: ${Object.keys(pages).join(', ')}`);
}
