// Post-build verification of out/ against the old site (Section 6 of the migration playbook).
// Usage: npm run build && npm run verify
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const OUT = path.join(ROOT, 'out');
const SITE = 'https://trendswheel.com';
const results = [];
let failed = 0;

const report = (name, problems, info = '') => {
  const ok = problems.length === 0;
  if (!ok) failed++;
  results.push({ name, ok, problems });
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${name}${info ? ` (${info})` : ''}`);
  for (const p of problems.slice(0, 15)) console.log(`        - ${p}`);
  if (problems.length > 15) console.log(`        ... and ${problems.length - 15} more`);
};

const read = (f) => fs.readFileSync(f, 'utf8');
const entities = { '&amp;': '&', '&lt;': '<', '&gt;': '>', '&quot;': '"', '&#39;': "'", '&#x27;': "'", '&nbsp;': ' ', '&#039;': "'" };
const text = (html) =>
  html
    .replace(/<(script|style|noscript)[\s\S]*?<\/\1>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&(?:amp|lt|gt|quot|nbsp|#0?39|#x27);/g, (m) => entities[m])
    .replace(/\s+/g, ' ')
    .trim();

function pageFile(urlPath) {
  const p = decodeURIComponent(urlPath.split('#')[0].split('?')[0]);
  if (p === '/' || p === '') return path.join(OUT, 'index.html');
  const candidates = [path.join(OUT, p + '.html'), path.join(OUT, p, 'index.html'), path.join(OUT, p)];
  return candidates.find((c) => fs.existsSync(c) && fs.statSync(c).isFile());
}

function walk(dir, files = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const f = path.join(dir, e.name);
    if (e.isDirectory()) walk(f, files);
    else files.push(f);
  }
  return files;
}

if (!fs.existsSync(OUT)) {
  console.error('out/ not found - run `npm run build` first');
  process.exit(1);
}

const posts = fs.readdirSync(path.join(ROOT, 'content', 'posts')).map((f) => JSON.parse(read(path.join(ROOT, 'content', 'posts', f))));
const categories = JSON.parse(read(path.join(ROOT, 'content', 'categories.json')));
const authors = JSON.parse(read(path.join(ROOT, 'content', 'authors.json')));
const oldUrls = read(path.join(ROOT, 'migration', 'old-urls.txt')).split('\n').filter(Boolean);

// 1. URL + slug parity
{
  const problems = [];
  for (const u of oldUrls) if (!pageFile(u)) problems.push(`missing in out/: ${u}`);
  const oldPostPaths = new Set(oldUrls.filter((u) => u.split('/').length === 3 && !u.startsWith('/author/')));
  const newPostPaths = new Set(posts.map((p) => `/${p.category.slug}/${p.slug}`));
  for (const p of oldPostPaths) if (!newPostPaths.has(p)) problems.push(`slug missing: ${p}`);
  for (const p of newPostPaths) if (!oldPostPaths.has(p)) problems.push(`extra slug: ${p}`);
  report('1  URL and slug parity', problems, `${oldUrls.length} old URLs, ${newPostPaths.size} posts`);
}

// 1b. Text parity (post body, title, meta)
const strip = (s) => text(s);
{
  const problems = [];
  for (const p of posts) {
    const file = pageFile(`/${p.category.slug}/${p.slug}`);
    if (!file) continue;
    const html = read(file);
    const m = html.match(/data-post-body="1"[^>]*>([\s\S]*?)<div data-post-body-end="1"/);
    if (!m) {
      problems.push(`${p.slug}: body markers not found`);
      continue;
    }
    const body = text(m[1].replace(/<aside[\s\S]*?<\/aside>/g, ' '));
    if (body !== strip(p.html)) problems.push(`${p.slug}: body text differs`);
    const title = html.match(/<title>([\s\S]*?)<\/title>/)?.[1];
    if (text(title ?? '') !== `${p.metaTitle} | TrendsWheel`) problems.push(`${p.slug}: <title> differs: ${title}`);
    const desc = html.match(/<meta name="description" content="([^"]*)"/)?.[1];
    if (text(desc ?? '') !== text(p.metaDescription)) problems.push(`${p.slug}: meta description differs`);
    if (!new RegExp(`<h1[^>]*>\\s*${p.title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(/&/g, '(?:&|&amp;)').replace(/'/g, "(?:'|&#x27;|&#39;)")}\\s*</h1>`).test(html)) problems.push(`${p.slug}: h1 differs`);
  }
  report('1b Text parity (body, title, meta description, h1)', problems);
}

// 2. Content present in static HTML
{
  const problems = [];
  for (const p of posts) {
    const file = pageFile(`/${p.category.slug}/${p.slug}`);
    if (!file) continue;
    const t = text(read(file));
    const orig = strip(p.html);
    if (!t.includes(orig.slice(0, 200)) || t.length < orig.length * 0.8) problems.push(`${p.slug}: content too short in HTML`);
  }
  report('2  Content present in static HTML', problems);
}

// 3. Per-page tags
const pages = walk(OUT)
  .filter((f) => f.endsWith('.html'))
  .filter((f) => !/[\\/](404|_not-found)\.html$/.test(f) && !f.includes(`${path.sep}_next${path.sep}`));
const pageUrl = (f) => {
  const rel = path.relative(OUT, f).replace(/\\/g, '/').replace(/\.html$/, '').replace(/\/index$/, '');
  return rel === 'index' || rel === '' ? '/' : '/' + rel;
};
const authorNoindex = new Set(
  authors.filter((a) => !(posts.some((p) => p.author.slug === a.slug) && a.bio?.trim())).map((a) => `/author/${a.slug}`),
);
{
  const problems = [];
  for (const f of pages) {
    const url = pageUrl(f);
    const h = read(f);
    const count = (re) => (h.match(re) || []).length;
    if (count(/<title[ >]/g) !== 1) problems.push(`${url}: ${count(/<title[ >]/g)} <title>`);
    if (count(/<meta name="description"/g) !== 1) problems.push(`${url}: description tags = ${count(/<meta name="description"/g)}`);
    if (count(/<h1[ >]/g) !== 1) problems.push(`${url}: h1 count = ${count(/<h1[ >]/g)}`);
    const canon = h.match(/<link rel="canonical" href="([^"]+)"/g) || [];
    const expected = url === '/' ? SITE : SITE + url;
    if (canon.length !== 1 || !canon[0].includes(`href="${expected}"`)) problems.push(`${url}: canonical ${canon.join(' ') || 'missing'}`);
    if (/<meta name="robots" content="[^"]*noindex/.test(h) && !authorNoindex.has(url)) problems.push(`${url}: unexpected noindex`);
  }
  report('3  Per-page title/description/canonical/h1/noindex', problems, `${pages.length} pages`);
}

// 4 + 5. Images and internal links
{
  const imgProblems = [];
  const linkProblems = [];
  const linked = new Map(); // target path -> Set of source pages
  for (const f of pages) {
    const url = pageUrl(f);
    const h = read(f).replace(/<script[\s\S]*?<\/script>/gi, '');
    for (const m of h.matchAll(/\ssrc="([^"]+)"|\ssrcSet="([^"]+)"|\ssrcset="([^"]+)"/g)) {
      const vals = m[1] ? [m[1]] : (m[2] || m[3]).split(',').map((s) => s.trim().split(/\s+/)[0]);
      for (let v of vals) {
        if (v.startsWith(SITE)) v = v.slice(SITE.length);
        if (!v.startsWith('/') || v.startsWith('//')) continue;
        if (!fs.existsSync(path.join(OUT, decodeURIComponent(v.split('?')[0])))) imgProblems.push(`${url}: ${v}`);
      }
    }
    for (const m of h.matchAll(/<a\s[^>]*?href="([^"]+)"/g)) {
      let v = m[1].replace(/&amp;/g, '&');
      if (v.startsWith(SITE)) v = v.slice(SITE.length) || '/';
      if (!v.startsWith('/') || v.startsWith('//')) continue;
      const target = v.split('#')[0].split('?')[0] || '/';
      if (!target || target === '/') {
        // home link always exists
      } else if (!pageFile(target)) linkProblems.push(`${url} -> ${v}`);
      if (target !== url) {
        if (!linked.has(target)) linked.set(target, new Set());
        linked.get(target).add(url);
      }
    }
  }
  report('4  Local images resolve', [...new Set(imgProblems)]);
  report('5  Internal links resolve', [...new Set(linkProblems)]);

  // 12. orphans and related posts
  const orphans = posts.map((p) => `/${p.category.slug}/${p.slug}`).filter((u) => !linked.has(u));
  report('12 No orphan posts (each linked from another page)', orphans.map((o) => `orphan: ${o}`));
  const noRelated = posts.filter((p) => {
    const h = read(pageFile(`/${p.category.slug}/${p.slug}`));
    return !/id="read-next"/.test(h);
  });
  report('12b Related/Read-next block on every post', noRelated.map((p) => p.slug));
}

// 6. Sitemap
{
  const problems = [];
  const idx = read(path.join(OUT, 'sitemap.xml'));
  const children = [...idx.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  let total = 0;
  const all = new Set();
  for (const c of children) {
    const f = path.join(OUT, c.replace(SITE, ''));
    if (!fs.existsSync(f)) {
      problems.push(`child sitemap missing: ${c}`);
      continue;
    }
    for (const m of read(f).matchAll(/<loc>([^<]+)<\/loc>/g)) {
      total++;
      all.add(m[1]);
      const u = m[1].replace(SITE, '') || '/';
      if (!pageFile(u)) problems.push(`sitemap URL not in out/: ${m[1]}`);
    }
  }
  const indexable = authors.filter((a) => posts.some((p) => p.author.slug === a.slug)).length;
  const expected = 1 /* home */ + 1 /* archive */ + 4 /* static pages */ + posts.length + categories.length + indexable;
  if (total !== expected) problems.push(`sitemap has ${total} URLs, expected ${expected}`);
  if (all.size !== total) problems.push('duplicate URLs in sitemap');
  report('6  Sitemap', problems, `${total} URLs`);
}

// 7. robots + ads.txt
{
  const problems = [];
  const robots = read(path.join(OUT, 'robots.txt'));
  if (!/Sitemap: https:\/\/trendswheel\.com\/sitemap\.xml/.test(robots)) problems.push('robots.txt lacks Sitemap line');
  if (/Disallow:\s*\/\s*$/m.test(robots.split('User-agent: Amazonbot')[0])) problems.push('robots.txt blocks the whole site for *');
  const ads = fs.existsSync(path.join(OUT, 'ads.txt')) ? read(path.join(OUT, 'ads.txt')).trim() : '';
  if (ads !== 'google.com, pub-1412589887378400, DIRECT, f08c47fec0942fa0') problems.push(`ads.txt = "${ads}"`);
  report('7  robots.txt and ads.txt', problems);
}

// 8. AdSense
{
  const problems = [];
  const sample = [pageFile('/'), pageFile(`/${posts[0].category.slug}/${posts[0].slug}`)];
  for (const f of sample) {
    const h = read(f);
    if (!h.includes('adsbygoogle.js?client=ca-pub-1412589887378400')) problems.push(`${f}: adsbygoogle script/ID missing`);
  }
  report('8  AdSense script + publisher ID', problems);
}

// Extra: no noindex anywhere in headers file, redirects sanity
{
  const problems = [];
  if (/noindex/i.test(read(path.join(OUT, '_headers')))) problems.push('_headers contains noindex');
  report('x  _headers does not block indexing', problems);
}

fs.writeFileSync(path.join(ROOT, 'migration', 'verify-result.json'), JSON.stringify(results, null, 2));
console.log(failed ? `\n${failed} check(s) FAILED` : '\nAll checks passed');
process.exit(failed ? 1 : 0);
