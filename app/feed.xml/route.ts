import { SITE_URL } from '@/config/site';
import { getAllPosts, getSite, stripHtml } from '@/lib/content';
import { absoluteUrl, postUrl } from '@/lib/url';

export const dynamic = 'force-static';

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const rfc822 = (iso: string) => new Date(iso).toUTCString();
const clip = (s: string, n: number) => (s.length > n ? s.slice(0, n - 3).trimEnd() + '...' : s);

export const GET = () => {
  const site = getSite();
  const posts = getAllPosts().slice(0, 20);
  const items = posts
    .map((p) => {
      const url = absoluteUrl(postUrl(p.category.slug, p.slug));
      const summary = clip(stripHtml(p.metaDescription || p.description || p.html), 500);
      return `    <item>
      <title>${esc(p.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <dc:creator>${esc(p.author.name)}</dc:creator>
      <category>${esc(p.category.name)}</category>
      <pubDate>${rfc822(p.publishedAt)}</pubDate>
      <description><![CDATA[${summary}]]></description>
    </item>`;
    })
    .join('\n');
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>${esc(site.name)}</title>
    <link>${SITE_URL}</link>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml"/>
    <description>${esc(site.tagline)}</description>
    <language>en</language>
    <managingEditor>${site.email} (${esc(site.name)} Editorial)</managingEditor>
    <category>Technology</category>
    <generator>${esc(site.name)}</generator>
    <ttl>60</ttl>
    <lastBuildDate>${rfc822(posts[0].updatedAt)}</lastBuildDate>
    <pubDate>${rfc822(posts[0].publishedAt)}</pubDate>
${items}
  </channel>
</rss>
`;
  return new Response(xml, { headers: { 'Content-Type': 'application/rss+xml; charset=UTF-8' } });
};
