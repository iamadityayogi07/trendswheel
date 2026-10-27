// Sitemap index + child sitemaps at the same URLs the old Laravel site used.
import { getAllPosts, getAuthors, getCategories, getPostsByAuthor, getPostsByCategory } from '@/lib/content';
import { absoluteUrl, archiveUrl, authorUrl, categoryUrl, postUrl, staticPageUrl } from '@/lib/url';

export type UrlEntry = { loc: string; lastmod?: string };

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const newest = (dates: string[]) => [...dates].sort().at(-1);

export const latestModified = () => newest(getAllPosts().map((p) => p.updatedAt))!;

export const childSitemaps = ['sitemap-posts.xml', 'sitemap-pages.xml', 'sitemap-categories.xml', 'sitemap-authors.xml'];

export function pageEntries(): UrlEntry[] {
  return [
    { loc: absoluteUrl('/'), lastmod: latestModified() },
    { loc: absoluteUrl(archiveUrl()), lastmod: latestModified() },
    { loc: absoluteUrl(staticPageUrl('about-us')) },
    { loc: absoluteUrl(staticPageUrl('contact-us')) },
    { loc: absoluteUrl(staticPageUrl('privacy-policy')) },
    { loc: absoluteUrl(staticPageUrl('terms-conditions')) },
  ];
}

export const postEntries = (): UrlEntry[] =>
  [...getAllPosts()]
    .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
    .map((p) => ({ loc: absoluteUrl(postUrl(p.category.slug, p.slug)), lastmod: p.updatedAt }));

export const categoryEntries = (): UrlEntry[] =>
  getCategories().map((c) => ({
    loc: absoluteUrl(categoryUrl(c.slug)),
    lastmod: newest(getPostsByCategory(c.slug).map((p) => p.updatedAt)),
  }));

export const authorEntries = (): UrlEntry[] =>
  getAuthors()
    .filter((a) => getPostsByAuthor(a.slug).length > 0)
    .map((a) => ({
      loc: absoluteUrl(authorUrl(a.slug)),
      lastmod: newest(getPostsByAuthor(a.slug).map((p) => p.updatedAt)),
    }));

export function urlsetXml(entries: UrlEntry[]): string {
  const body = entries
    .map(
      (e) =>
        `  <url>\n    <loc>${esc(e.loc)}</loc>\n${e.lastmod ? `    <lastmod>${e.lastmod}</lastmod>\n` : ''}  </url>`,
    )
    .join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`;
}

export function indexXml(): string {
  const body = childSitemaps.map((f) => `  <sitemap>\n    <loc>${absoluteUrl('/' + f)}</loc>\n  </sitemap>`).join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</sitemapindex>\n`;
}

export const xmlResponse = (xml: string) => new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=UTF-8' } });
