import { SITE_URL } from '@/config/site';

export const dynamic = 'force-static';

// Same rules as the old Laravel robots.txt: everything allowed, admin/search disallowed, AI-training crawlers blocked.
const AI_CRAWLERS = ['Amazonbot', 'Applebot-Extended', 'Bytespider', 'CCBot', 'ClaudeBot', 'Google-Extended', 'GPTBot', 'meta-externalagent'];

export const GET = () => {
  const lines = [
    'User-agent: *',
    'Allow: /',
    'Disallow: /admin',
    'Disallow: /search',
    '',
    '# Block AI training / scraper crawlers. Google-Extended only governs',
    '# Gemini training, not Google Search, so Search indexing is unaffected.',
    ...AI_CRAWLERS.flatMap((bot) => [`User-agent: ${bot}`, 'Disallow: /', '']),
    `Sitemap: ${SITE_URL}/sitemap.xml`,
    '',
  ];
  return new Response(lines.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=UTF-8' } });
};
