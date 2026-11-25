import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumbs from '@/components/post/Breadcrumbs';
import { getCategories, getPostsByCategory } from '@/lib/content';
import { formatDate } from '@/lib/format';
import { buildMetadata } from '@/lib/seo';
import { archiveUrl, categoryUrl, postUrl } from '@/lib/url';

// New page (no old URL collides with it): one crawlable list that links to every article.
export const metadata: Metadata = buildMetadata({
  title: 'All Articles | TrendsWheel',
  description: 'Every TrendsWheel article in one place, grouped by category: Android how-to guides, apps and privacy, tech explained for India, and social media privacy.',
  path: archiveUrl(),
});

export default function ArchivePage() {
  const categories = getCategories();
  return (
    <div className="container-narrow py-8">
      <Breadcrumbs items={[{ name: 'Home', href: '/' }, { name: 'All articles' }]} />
      <h1 className="font-display mt-6 text-4xl font-bold">All articles</h1>
      <p className="mt-2 text-ink-2">Comprehensive index of guides, security checklists, and technical analyses.</p>

      {/* Quick category jump navigation */}
      <nav aria-label="Jump to category" className="mt-6 flex flex-wrap gap-2">
        {categories.map((c) => (
          <a
            key={c.slug}
            href={`#a-${c.slug}`}
            className="inline-flex items-center gap-1.5 rounded-full border border-line bg-white px-3.5 py-1.5 text-xs font-bold text-ink-2 shadow-sm transition hover:border-brand hover:bg-brand-soft hover:text-brand-strong"
          >
            <span>{c.name}</span>
            <span className="rounded-full bg-surface-2 px-1.5 py-0.2 text-[10px] text-muted">
              {getPostsByCategory(c.slug).length}
            </span>
          </a>
        ))}
      </nav>

      {categories.map((c) => {
        const posts = getPostsByCategory(c.slug);
        return (
          <section key={c.slug} className="mt-10" aria-labelledby={`a-${c.slug}`}>
            <h2 id={`a-${c.slug}`} className="font-display text-2xl font-bold">
              <Link href={categoryUrl(c.slug)} className="no-underline hover:text-brand-strong hover:underline">
                {c.name}
              </Link>{' '}
              <span className="text-base font-normal text-muted">({posts.length})</span>
            </h2>
            <ul className="mt-3 divide-y divide-line border-y border-line">
              {posts.map((p) => (
                <li key={p.slug}>
                  <Link href={postUrl(p.category.slug, p.slug)} className="flex min-h-12 flex-col justify-center gap-0.5 py-2 no-underline hover:text-brand-strong sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                    <span className="font-semibold">{p.title}</span>
                    <span className="shrink-0 text-sm text-muted">{formatDate(p.updatedAt)}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        );
      })}
    </div>
  );
}
