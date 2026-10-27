// Runs mobile Lighthouse on the built site (serves out/ locally). Needs Chrome installed.
// Usage: npm run build && npm run lighthouse
import { spawn, spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const PORT = 4174;
const posts = fs.readdirSync(path.join(ROOT, 'content', 'posts')).map((f) => JSON.parse(fs.readFileSync(path.join(ROOT, 'content', 'posts', f), 'utf8')));
const post = posts.sort((a, b) => b.id - a.id)[0];
const targets = ['/', `/${post.category.slug}/${post.slug}`, '/how-to'];

const server = spawn(process.execPath, [path.join(ROOT, 'node_modules', 'serve', 'build', 'main.js'), 'out', '-l', String(PORT)], { cwd: ROOT, stdio: 'ignore' });
await new Promise((r) => setTimeout(r, 2500));

const rows = [];
for (const t of targets) {
  const out = path.join(ROOT, 'migration', `lighthouse-${t === '/' ? 'home' : t.slice(1).replace(/\//g, '_')}.json`);
  const res = spawnSync('npx', ['--yes', 'lighthouse', `http://localhost:${PORT}${t}`, '--output=json', `--output-path=${out}`, '--only-categories=performance,accessibility,best-practices,seo', '--chrome-flags=--headless=new --no-sandbox', '--quiet'], { cwd: ROOT, shell: true, stdio: 'inherit' });
  if (res.status !== 0 || !fs.existsSync(out)) {
    rows.push({ url: t, error: 'lighthouse failed (is Chrome installed?)' });
    continue;
  }
  const j = JSON.parse(fs.readFileSync(out, 'utf8'));
  const c = j.categories;
  rows.push({
    url: t,
    performance: Math.round(c.performance.score * 100),
    accessibility: Math.round(c.accessibility.score * 100),
    bestPractices: Math.round(c['best-practices'].score * 100),
    seo: Math.round(c.seo.score * 100),
    LCP: j.audits['largest-contentful-paint'].displayValue,
    CLS: j.audits['cumulative-layout-shift'].displayValue,
    TBT: j.audits['total-blocking-time'].displayValue,
  });
}
server.kill();
console.table(rows);
fs.writeFileSync(path.join(ROOT, 'migration', 'lighthouse-summary.json'), JSON.stringify(rows, null, 2));
