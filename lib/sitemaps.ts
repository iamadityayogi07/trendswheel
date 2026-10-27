// Sitemap index + child sitemaps at the same URLs the old Laravel site used.
import { getAllPosts, getAuthors, getCategories, getPostsByAuthor, getPostsByCategory } from '@/lib/content';
import { absoluteUrl, archiveUrl, authorUrl, categoryUrl, postUrl, staticPageUrl } from '@/lib/url';

export type UrlEntry = { loc: string; lastmod?: string; changefreq?: string; priority?: string };

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const newest = (dates: string[]) => [...dates].sort().at(-1);

export const latestModified = () => newest(getAllPosts().map((p) => p.updatedAt))!;

export const childSitemaps = ['sitemap-posts.xml', 'sitemap-pages.xml', 'sitemap-categories.xml', 'sitemap-authors.xml'];

export function pageEntries(): UrlEntry[] {
  return [
    { loc: absoluteUrl('/'), lastmod: latestModified(), changefreq: 'daily', priority: '1.0' },
    { loc: absoluteUrl(archiveUrl()), lastmod: latestModified(), changefreq: 'daily', priority: '0.6' },
    { loc: absoluteUrl(staticPageUrl('about-us')), changefreq: 'monthly', priority: '0.5' },
    { loc: absoluteUrl(staticPageUrl('contact-us')), changefreq: 'monthly', priority: '0.5' },
    { loc: absoluteUrl(staticPageUrl('privacy-policy')), changefreq: 'yearly', priority: '0.3' },
    { loc: absoluteUrl(staticPageUrl('terms-conditions')), changefreq: 'yearly', priority: '0.3' },
  ];
}

export const postEntries = (): UrlEntry[] =>
  [...getAllPosts()]
    .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
    .map((p) => ({ loc: absoluteUrl(postUrl(p.category.slug, p.slug)), lastmod: p.updatedAt, changefreq: 'weekly', priority: '0.7' }));

export const categoryEntries = (): UrlEntry[] =>
  getCategories().map((c) => ({
    loc: absoluteUrl(categoryUrl(c.slug)),
    lastmod: newest(getPostsByCategory(c.slug).map((p) => p.updatedAt)),
    changefreq: 'daily',
    priority: '0.8',
  }));

export const authorEntries = (): UrlEntry[] =>
  getAuthors()
    .filter((a) => getPostsByAuthor(a.slug).length > 0)
    .map((a) => ({
      loc: absoluteUrl(authorUrl(a.slug)),
      lastmod: newest(getPostsByAuthor(a.slug).map((p) => p.updatedAt)),
      changefreq: 'weekly',
      priority: '0.5',
    }));

export function urlsetXml(entries: UrlEntry[]): string {
  const body = entries
    .map(
      (e) =>
        `  <url>\n    <loc>${esc(e.loc)}</loc>\n${e.lastmod ? `    <lastmod>${e.lastmod}</lastmod>\n` : ''}${e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>\n` : ''}${e.priority ? `    <priority>${e.priority}</priority>\n` : ''}  </url>`,
    )
    .join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`;
}

export function indexXml(): string {
  const lastmod = latestModified();
  const body = childSitemaps.map((f) => `  <sitemap>\n    <loc>${absoluteUrl('/' + f)}</loc>\n    <lastmod>${lastmod}</lastmod>\n  </sitemap>`).join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</sitemapindex>\n`;
}

export const xmlResponse = (xml: string) => new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=UTF-8' } });
