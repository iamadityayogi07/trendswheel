import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import AdUnit from '@/components/ads/AdUnit';
import JsonLd from '@/components/JsonLd';
import Breadcrumbs from '@/components/post/Breadcrumbs';
import Faq from '@/components/post/Faq';
import LoadMore from '@/components/post/LoadMore';
import PostCard from '@/components/post/PostCard';
import EditorialNote from '@/components/category/EditorialNote';
import { categoryCopy } from '@/config/category-content';
import {
  getAllPosts,
  getCategories,
  getCategory,
  getPopularPosts,
  getPostsByCategory,
  readingMinutes,
} from '@/lib/content';
import { categoryMetadata, categorySchemas } from '@/lib/seo';
import { categoryUrl, postUrl } from '@/lib/url';

export const dynamicParams = false;

type Params = { category: string };

const categoryAccentDots: Record<string, string> = {
  'how-to': 'bg-brand',
  apps: 'bg-indigo-500',
  tech: 'bg-emerald-500',
  social: 'bg-pink-500',
};

export const generateStaticParams = (): Params[] =>
  getCategories().map((c) => ({ category: c.slug }));

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { category } = await params;
  const c = getCategory(category);
  return c ? categoryMetadata(c) : {};
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { category } = await params;
  const c = getCategory(category);
  if (!c) notFound();

  const posts = getPostsByCategory(c.slug);
  const copy = categoryCopy[c.slug];
  const picks = (copy?.picks ?? []).flatMap(([slug, why]) => {
    const p = posts.find((x) => x.slug === slug);
    return p ? [{ post: p, why }] : [];
  });
  const popular = getPopularPosts(5, c.slug);
  const related = getAllPosts()
    .filter((p) => p.category.slug !== c.slug)
    .sort((a, b) => b.id - a.id)
    .slice(0, 6);

  const allCategories = getCategories();

  return (
    <>
      {categorySchemas(c, posts).map((s, i) => (
        <JsonLd key={i} data={s} />
      ))}

      {/* Modern Editorial Category Masthead */}
      <div className="hero-band border-b border-line/70">
        <header className="container-page py-8 sm:py-12">
          <Breadcrumbs
            items={[{ name: 'Home', href: '/' }, { name: c.name }]}
          />

          {/* Quick Category Switcher Pills */}
          <nav
            aria-label="Category switcher"
            className="mt-5 flex flex-wrap items-center gap-2"
          >
            <Link
              href="/archive"
              className="inline-flex items-center gap-1.5 rounded-xl border border-line/80 bg-white px-3.5 py-1.5 text-xs font-semibold text-ink-2 shadow-2xs transition hover:border-brand hover:text-brand-strong"
            >
              <span>All Guides</span>
            </Link>
            {allCategories.map((x) => {
              const isCurrent = x.slug === c.slug;
              const count = getPostsByCategory(x.slug).length;
              return (
                <Link
                  key={x.slug}
                  href={categoryUrl(x.slug)}
                  className={`inline-flex items-center gap-2 rounded-xl px-3.5 py-1.5 text-xs font-semibold shadow-2xs transition ${
                    isCurrent
                      ? 'bg-brand text-white shadow-brand/20'
                      : 'border border-line/80 bg-white text-ink-2 hover:border-brand hover:text-brand-strong'
                  }`}
                >
                  {!isCurrent && (
                    <span
                      className={`size-1.5 rounded-full ${
                        categoryAccentDots[x.slug] || 'bg-brand'
                      }`}
                      aria-hidden="true"
                    />
                  )}
                  <span>{x.name}</span>
                  <span
                    className={`rounded-md px-1.5 py-0.5 text-[10px] font-bold ${
                      isCurrent
                        ? 'bg-white/25 text-white'
                        : 'bg-surface-2 text-muted'
                    }`}
                  >
                    {count}
                  </span>
                </Link>
              );
            })}
          </nav>

          {/* Category Eyebrow & Title */}
          <div className="mt-6">
            <div className="flex flex-wrap items-center gap-2.5 text-xs font-bold uppercase tracking-widest text-brand-strong">
              <span>Category Hub</span>
              <span className="text-line" aria-hidden="true">
                •
              </span>
              <span className="text-ink-2">
                {posts.length} Verified Guides
              </span>
              <span className="text-line" aria-hidden="true">
                •
              </span>
              <span className="text-emerald-600">Hardware Tested</span>
            </div>

            <h1 className="font-display mt-2 text-3xl font-bold leading-[1.12] tracking-tight text-ink sm:text-4xl lg:text-5xl">
              {copy?.heading ?? c.name}
            </h1>
            <div
              className="mt-4 h-1 w-14 rounded-full bg-brand"
              aria-hidden="true"
            />
          </div>

          {/* Clean 2-Column Editorial Intro */}
          {copy?.intro && (
            <div className="mt-6 grid gap-5 text-sm sm:text-base leading-relaxed text-ink-2 lg:grid-cols-2 lg:gap-10">
              {copy.intro.map((t) => (
                <p key={t}>{t}</p>
              ))}
            </div>
          )}
        </header>
      </div>

      <div className="container-page py-8">
        {/* Cornerstone "Start Here" Picks */}
        {picks.length > 0 && (
          <section className="mb-10" aria-labelledby="start-here">
            <div className="flex items-center gap-2.5 mb-4">
              <span className="flex size-6 items-center justify-center rounded-lg bg-brand text-xs font-black text-white shadow-xs">
                ★
              </span>
              <h2
                id="start-here"
                className="font-display text-xs font-bold uppercase tracking-widest text-ink sm:text-sm"
              >
                Essential Cornerstone Guides
              </h2>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {picks.map(({ post, why }, idx) => (
                <article
                  key={post.slug}
                  className="card group flex flex-col justify-between rounded-xl border border-line/80 bg-white p-5 shadow-2xs transition duration-200 hover:border-brand/40 hover:shadow-md"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 text-[11px] font-bold uppercase tracking-wider">
                      <span className="text-brand-strong">
                        0{idx + 1} · ESSENTIAL
                      </span>
                      <span className="text-muted">
                        {readingMinutes(post.html)} min read
                      </span>
                    </div>
                    <h3 className="font-display mt-2 text-base font-bold leading-snug text-ink group-hover:text-brand-strong transition line-clamp-2">
                      <Link
                        href={postUrl(post.category.slug, post.slug)}
                        className="no-underline"
                      >
                        {post.title}
                      </Link>
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-ink-2 line-clamp-2">
                      {why}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-line/50">
                    <Link
                      href={postUrl(post.category.slug, post.slug)}
                      className="inline-flex items-center gap-1 text-xs font-bold text-brand-strong hover:underline"
                    >
                      <span>Read Guide</span>
                      <span
                        aria-hidden="true"
                        className="transition group-hover:translate-x-1"
                      >
                        →
                      </span>
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* High-Viewability Top Leaderboard Ad */}
        <AdUnit kind="leaderboard" className="my-6" />

        {/* Main 2-Column Content & Sticky Sidebar */}
        <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_340px]">
          {/* Left Column: Complete Category Feed */}
          <div className="min-w-0">
            <section aria-labelledby="all-posts">
              <div className="flex items-end justify-between gap-4 border-b border-line/80 pb-3.5">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-widest text-brand-strong">
                    Complete Library
                  </span>
                  <h2
                    id="all-posts"
                    className="font-display mt-0.5 text-2xl font-bold tracking-tight text-ink"
                  >
                    All {c.name} Guides
                  </h2>
                </div>
                <span className="rounded-lg bg-surface-2 px-2.5 py-1 text-xs font-semibold text-muted">
                  {posts.length} articles
                </span>
              </div>

              <div className="mt-6">
                <LoadMore initial={12} className="grid gap-6 sm:grid-cols-2">
                  {posts.map((p, i) => (
                    <PostCard key={p.slug} post={p} priority={i < 2} />
                  ))}
                </LoadMore>
              </div>
            </section>

            {/* In-Feed Ad below Main Grid */}
            <AdUnit kind="inFeed" className="my-10" />
          </div>

          {/* Right Column: Ranked Popular, Directory & Sticky Ad */}
          <aside aria-label="Sidebar" className="space-y-8">
            {/* Popular in Category */}
            {popular.length > 0 && (
              <section
                aria-labelledby="popular"
                className="rounded-2xl border border-line/80 bg-white p-5 shadow-2xs"
              >
                <div className="flex items-center justify-between border-b border-line/60 pb-3">
                  <h2
                    id="popular"
                    className="font-display flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-ink"
                  >
                    <span
                      className="size-2 rounded-full bg-brand"
                      aria-hidden="true"
                    />
                    <span>Popular in {c.name}</span>
                  </h2>
                </div>

                <ul className="mt-4 divide-y divide-line/60">
                  {popular.map((p, idx) => (
                    <li
                      key={p.slug}
                      className="py-3 first:pt-0 last:pb-0"
                    >
                      <div className="flex items-start gap-2.5">
                        <span className="font-display text-xs font-black text-brand-strong/70 pt-1">
                          0{idx + 1}
                        </span>
                        <div className="min-w-0 flex-1">
                          <PostCard post={p} compact />
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Sidebar Display Ad #1 */}
            <AdUnit kind="display" className="!my-0" />

            {/* Explore Other Hubs */}
            <section
              aria-labelledby="side-cats"
              className="rounded-2xl border border-line/80 bg-surface-2/50 p-5 shadow-2xs"
            >
              <h2
                id="side-cats"
                className="font-display text-xs font-bold uppercase tracking-widest text-ink mb-4"
              >
                Explore Other Hubs
              </h2>
              <ul className="space-y-2.5">
                {allCategories.map((x) => {
                  const isCurrent = x.slug === c.slug;
                  const count = getPostsByCategory(x.slug).length;
                  return (
                    <li key={x.slug}>
                      <Link
                        href={categoryUrl(x.slug)}
                        aria-current={isCurrent ? 'page' : undefined}
                        className={`group flex min-h-11 items-center justify-between gap-3 rounded-xl border px-4 no-underline transition duration-200 ${
                          isCurrent
                            ? 'border-brand bg-brand-soft/60 text-brand-strong font-bold'
                            : 'border-line/80 bg-white text-ink-2 hover:border-brand hover:text-brand-strong'
                        }`}
                      >
                        <span className="flex items-center gap-2.5 font-display text-sm font-bold">
                          <span
                            className={`size-2 rounded-full ${
                              categoryAccentDots[x.slug] || 'bg-brand'
                            }`}
                            aria-hidden="true"
                          />
                          <span>{x.name}</span>
                        </span>
                        <span className="flex items-center gap-2">
                          <span className="rounded-md bg-surface-2 px-2 py-0.5 text-xs font-bold text-muted group-hover:text-ink">
                            {count}
                          </span>
                          <span
                            aria-hidden="true"
                            className="text-xs transition group-hover:translate-x-1"
                          >
                            →
                          </span>
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </section>

            {/* Sticky High-RPM Sidebar Ad */}
            <div className="sticky top-28">
              <AdUnit kind="display" className="!my-0" />
            </div>
          </aside>
        </div>

        {/* Testing Methodology */}
        {copy && <EditorialNote note={copy.note} />}

        {/* Category Knowledge Base FAQ */}
        <Faq items={c.faq} heading="Frequently Asked Questions (FAQs)" />

        <AdUnit kind="display" className="my-10" />

        {/* Cross-Topic Discovery */}
        {related.length > 0 && (
          <section aria-labelledby="related" className="mt-12">
            <div className="flex items-end justify-between border-b border-line/80 pb-3.5">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-widest text-brand-strong">
                  Cross-Topic Discovery
                </span>
                <h2
                  id="related"
                  className="font-display mt-0.5 text-2xl font-bold tracking-tight text-ink sm:text-3xl"
                >
                  More From Other Hubs
                </h2>
              </div>
              <Link
                href="/archive"
                className="text-xs font-bold text-brand-strong hover:underline"
              >
                Full Library →
              </Link>
            </div>

            <ul className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <li key={p.slug}>
                  <PostCard post={p} />
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Bottom Category Navigation Strip */}
        <nav
          aria-label="Other categories"
          className="mt-12 flex flex-wrap items-center gap-3 border-t border-line/70 pt-8"
        >
          <span className="text-xs font-bold uppercase tracking-wider text-muted mr-2">
            Switch Hub:
          </span>
          {allCategories
            .filter((x) => x.slug !== c.slug)
            .map((x) => (
              <Link
                key={x.slug}
                href={categoryUrl(x.slug)}
                className="group inline-flex min-h-10 items-center gap-2 rounded-xl border border-line/80 bg-white px-4 py-2 text-sm font-bold text-ink no-underline shadow-2xs transition hover:border-brand hover:bg-brand hover:text-white"
              >
                <span>{x.name}</span>
                <span
                  aria-hidden="true"
                  className="transition group-hover:translate-x-1"
                >
                  →
                </span>
              </Link>
            ))}
        </nav>
      </div>
    </>
  );
}
