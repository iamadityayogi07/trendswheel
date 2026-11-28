import type { Metadata } from 'next';
import Link from 'next/link';
import AdUnit from '@/components/ads/AdUnit';
import ArchiveClient, { type ArchiveCategoryItem, type ArchivePostItem } from '@/components/archive/ArchiveClient';
import CategoryNewsletter from '@/components/category/CategoryNewsletter';
import JsonLd from '@/components/JsonLd';
import Breadcrumbs from '@/components/post/Breadcrumbs';
import { getAllPosts, getCategories } from '@/lib/content';
import { buildMetadata, simplePageSchema } from '@/lib/seo';
import { archiveUrl, categoryUrl, postUrl } from '@/lib/url';

const path = archiveUrl();

export const metadata: Metadata = buildMetadata({
  title: 'All Articles & Technical Guides Archive | TrendsWheel',
  description:
    'Complete master index of all 248 verified guides, tutorials, and technical analyses on TrendsWheel, categorized across How-To, Apps, Tech, and Social.',
  path,
});

export default function ArchivePage() {
  const allPosts = getAllPosts();
  const rawCategories = getCategories();

  const posts: ArchivePostItem[] = allPosts.map((p) => ({
    id: p.id,
    slug: p.slug,
    title: p.title,
    description: p.description || '',
    publishedAt: p.publishedAt,
    updatedAt: p.updatedAt,
    readMinutes: p.readMinutes,
    category: {
      name: p.category.name,
      slug: p.category.slug,
    },
    href: postUrl(p.category.slug, p.slug),
  }));

  const categories: ArchiveCategoryItem[] = rawCategories.map((c) => ({
    name: c.name,
    slug: c.slug,
    count: posts.filter((p) => p.category.slug === c.slug).length,
  }));

  return (
    <>
      <JsonLd
        data={simplePageSchema(
          'CollectionPage',
          'All Articles Archive - TrendsWheel',
          'Complete master index of all 248 verified guides, tutorials, and technical analyses on TrendsWheel.',
          path
        )}
      />

      <div className="container-page py-6 sm:py-8">
        {/* Breadcrumb Navigation */}
        <Breadcrumbs
          items={[{ name: 'Home', href: '/' }, { name: 'Articles Archive' }]}
        />

        {/* Editorial Header Banner */}
        <header className="mt-4 rounded-2xl border border-indigo-100 bg-gradient-to-r from-[#eef2ff] via-[#f5f3ff] to-[#eef6ff] p-6 sm:p-8 lg:p-9 shadow-2xs">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="max-w-2xl">
              <div className="flex items-center gap-2">
                <span className="flex size-5 items-center justify-center rounded-md bg-brand/10 text-[11px] font-bold text-brand-strong">
                  📚
                </span>
                <span className="text-xs font-bold uppercase tracking-widest text-brand-strong">
                  Master Publication Archive • Complete Index
                </span>
              </div>

              <h1 className="font-display mt-2 text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-ink">
                All Articles &amp; Technical Guides
              </h1>

              <p className="mt-2 text-xs sm:text-sm text-ink-2 leading-relaxed">
                Explore our full catalogue of {posts.length} step-by-step how-to tutorials, app reviews, tech architecture breakdowns, and digital privacy guides. Search in real-time or browse category by category.
              </p>

              {/* Trust & Stats Pills */}
              <div className="mt-5 flex flex-wrap items-center gap-2 text-xs font-semibold">
                <span className="inline-flex items-center gap-1.5 rounded-lg bg-white/95 border border-line/70 px-3 py-1.5 text-ink shadow-2xs">
                  <span className="size-2 rounded-full bg-brand" aria-hidden="true" />
                  <span>{posts.length} Published Articles</span>
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-lg bg-white/95 border border-line/70 px-3 py-1.5 text-ink shadow-2xs">
                  <span aria-hidden="true">🗂️</span>
                  <span>{categories.length} Core Categories</span>
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-lg bg-white/95 border border-line/70 px-3 py-1.5 text-ink shadow-2xs">
                  <span aria-hidden="true">✓</span>
                  <span>Verified for 2026</span>
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-lg bg-white/95 border border-line/70 px-3 py-1.5 text-ink shadow-2xs">
                  <span aria-hidden="true">🔓</span>
                  <span>100% Free &amp; Open Access</span>
                </span>
              </div>
            </div>

            {/* Quick Category Stats Card */}
            <div className="w-full md:w-auto shrink-0 rounded-xl border border-line/80 bg-white/90 p-4 shadow-2xs">
              <span className="text-[11px] font-bold uppercase tracking-wider text-muted">
                Category Breakdown
              </span>
              <div className="mt-2.5 grid grid-cols-2 gap-2 text-xs">
                {categories.map((c) => (
                  <a
                    key={c.slug}
                    href={`#a-${c.slug}`}
                    className="flex items-center justify-between gap-3 rounded-lg border border-line/70 bg-surface-2/60 px-2.5 py-1.5 font-bold text-ink hover:border-brand hover:text-brand-strong transition no-underline"
                  >
                    <span>{c.name}</span>
                    <span className="text-[11px] font-medium text-muted">{c.count}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </header>

        {/* 2-Column Responsive Layout: Left Feed + Right Sticky Sidebar */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8 items-start">
          {/* Main Feed Column */}
          <main className="min-w-0">
            <ArchiveClient posts={posts} categories={categories} />
          </main>

          {/* Right Sidebar */}
          <aside aria-label="Archive navigation and resources" className="space-y-6">
            {/* Quick Navigation Card */}
            <section className="rounded-2xl border border-line/80 bg-white p-5 shadow-2xs">
              <div className="flex items-center gap-2 border-b border-line/60 pb-3">
                <span className="text-brand-strong" aria-hidden="true">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="8" y1="6" x2="21" y2="6" />
                    <line x1="8" y1="12" x2="21" y2="12" />
                    <line x1="8" y1="18" x2="21" y2="18" />
                    <line x1="3" y1="6" x2="3.01" y2="6" />
                    <line x1="3" y1="12" x2="3.01" y2="12" />
                    <line x1="3" y1="18" x2="3.01" y2="18" />
                  </svg>
                </span>
                <h2 className="font-display text-sm font-bold text-ink">
                  Jump to Topic
                </h2>
              </div>

              <nav aria-label="Quick jump categories" className="mt-3.5 space-y-2">
                {categories.map((c) => (
                  <a
                    key={c.slug}
                    href={`#a-${c.slug}`}
                    className="flex items-center justify-between rounded-xl border border-line/70 bg-surface-2/40 px-3 py-2 text-xs font-bold text-ink hover:border-brand hover:bg-brand-soft hover:text-brand-strong transition no-underline"
                  >
                    <span className="flex items-center gap-2">
                      <span className={`chip chip-${c.slug} !text-[9px] !px-1.5 !py-0.5`}>
                        {c.name}
                      </span>
                      <span>{c.name} Guides</span>
                    </span>
                    <span className="rounded-full bg-white border border-line/70 px-2 py-0.5 text-[10px] text-muted font-semibold">
                      {c.count}
                    </span>
                  </a>
                ))}
              </nav>
            </section>

            {/* High-RPM Sticky Display Ad */}
            <AdUnit kind="display" className="!my-0 sticky top-28 z-10" />

            {/* Explore Topic Hubs Card */}
            <section className="rounded-2xl border border-line/80 bg-white p-5 shadow-2xs">
              <div className="flex items-center gap-2 border-b border-line/60 pb-3">
                <span className="text-brand-strong" aria-hidden="true">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
                    <path d="M2 12h20" />
                  </svg>
                </span>
                <h2 className="font-display text-sm font-bold text-ink">
                  Browse Topic Hubs
                </h2>
              </div>
              <p className="mt-2 text-xs text-ink-2 leading-relaxed">
                Prefer rich visual feeds with featured articles and topic filters? Visit our category hubs:
              </p>
              <div className="mt-3 grid grid-cols-2 gap-2">
                {categories.map((c) => (
                  <Link
                    key={c.slug}
                    href={categoryUrl(c.slug)}
                    className="flex flex-col items-center justify-center rounded-xl border border-line/70 bg-surface-2/50 p-2.5 text-center text-xs font-bold text-ink hover:border-brand hover:bg-white hover:text-brand-strong transition no-underline shadow-2xs"
                  >
                    <span>{c.name}</span>
                    <span className="text-[10px] text-muted font-normal">View Hub →</span>
                  </Link>
                ))}
              </div>
            </section>

            {/* Mini Newsletter Card */}
            <CategoryNewsletter variant="sidebar" categoryName="TrendsWheel" />
          </aside>
        </div>
      </div>
    </>
  );
}
