import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import AdUnit from '@/components/ads/AdUnit';
import CategoryNewsletter from '@/components/category/CategoryNewsletter';
import RelatedCategories from '@/components/category/RelatedCategories';
import JsonLd from '@/components/JsonLd';
import AuthorBox from '@/components/post/AuthorBox';
import Breadcrumbs from '@/components/post/Breadcrumbs';
import Faq from '@/components/post/Faq';
import PostBody, { getPostBody } from '@/components/post/PostBody';
import PostCard from '@/components/post/PostCard';
import ShareLinks from '@/components/post/ShareLinks';
import Toc from '@/components/post/Toc';
import {
  getAllPosts,
  getAuthor,
  getCategories,
  getPopularPosts,
  getPost,
  getPostsByCategory,
  getPrevNext,
  getRelatedPosts,
  readingMinutes,
  stripHtml,
} from '@/lib/content';
import { formatDate, sameDay } from '@/lib/format';
import { imageSet } from '@/lib/images';
import { postMetadata, postSchemas } from '@/lib/seo';
import { absoluteUrl, authorUrl, categoryUrl, postUrl } from '@/lib/url';

export const dynamicParams = false;

type Params = { category: string; slug: string };

export function generateStaticParams(): Params[] {
  return getAllPosts().map((p) => ({ category: p.category.slug, slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { category, slug } = await params;
  const post = getPost(category, slug);
  return post ? postMetadata(post) : {};
}

export default async function PostPage({ params }: { params: Promise<Params> }) {
  const { category, slug } = await params;
  const post = getPost(category, slug);
  if (!post) notFound();

  const author = getAuthor(post.author.slug);
  const { segments, toc } = await getPostBody(post.html);
  const related = getRelatedPosts(post, 6);
  const { previous, next } = getPrevNext(post);
  const popular = getPopularPosts(6, post.category.slug).filter((p) => p.slug !== post.slug).slice(0, 5);
  const hero = imageSet(post.featuredImage, '(min-width: 1024px) 760px, 100vw');
  const url = absoluteUrl(postUrl(post.category.slug, post.slug));
  const updated = !sameDay(post.publishedAt, post.updatedAt);
  const allCategories = getCategories();
  const leadText = stripHtml(post.description || post.excerpt);

  const relatedCategories = getCategories()
    .filter((c) => c.slug !== post.category.slug)
    .map((c) => {
      const catPosts = getPostsByCategory(c.slug);
      return {
        category: c,
        posts: catPosts.slice(0, 3),
        totalCount: catPosts.length,
      };
    });

  return (
    <div className="container-page py-6">
      {postSchemas(post, author).map((s, i) => (
        <JsonLd key={i} data={s} />
      ))}

      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { name: 'Home', href: '/' },
          { name: post.category.name, href: categoryUrl(post.category.slug) },
          { name: post.title },
        ]}
      />

      {/* Top High-RPM Leaderboard Billboard Ad */}
      <AdUnit kind="leaderboard" className="my-6" />

      {/* Main 2-Column Editorial Layout */}
      <div className="mt-6 grid gap-10 lg:grid-cols-[minmax(0,1fr)_340px] xl:grid-cols-[minmax(0,1fr)_350px] items-start">
        {/* Main Article Column */}
        <article className="min-w-0 max-w-[760px] mx-auto lg:mx-0 w-full">
          <header className="border-b border-line/70 pb-6">
            {/* Category & Trust Badges */}
            <div className="flex flex-wrap items-center gap-2.5">
              <Link
                href={categoryUrl(post.category.slug)}
                className={`chip chip-${post.category.slug} !text-[11px] !font-bold`}
              >
                {post.category.name}
              </Link>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-0.5 text-[11px] font-bold text-emerald-700">
                <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>Lab Verified</span>
              </span>
              <span className="text-xs text-muted font-medium">
                • {readingMinutes(post.html)} min read
              </span>
            </div>

            {/* Article Headline */}
            <h1 className="font-display mt-3.5 text-2xl sm:text-3xl lg:text-[36px] font-bold leading-tight tracking-tight text-ink">
              {post.title}
            </h1>

            {/* Subtitle / Deck if available */}
            {leadText && (
              <p className="mt-3 text-sm sm:text-base leading-relaxed text-ink-2">
                {leadText}
              </p>
            )}

            {/* Author & Editorial Meta Bar */}
            <div className="mt-5 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-line/70 bg-surface-2/40 px-4 py-3 text-xs">
              <div className="flex items-center gap-3">
                {author?.avatar ? (
                  <img
                    src={author.avatar}
                    alt={author.name}
                    width={36}
                    height={36}
                    className="size-9 rounded-full object-cover ring-1 ring-brand/20"
                  />
                ) : (
                  <div className="flex size-9 items-center justify-center rounded-full bg-brand/10 font-bold text-brand-strong">
                    {post.author.name.charAt(0)}
                  </div>
                )}
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-muted">By</span>
                    <Link
                      href={authorUrl(post.author.slug)}
                      className="font-bold text-ink hover:text-brand-strong no-underline"
                    >
                      {post.author.name}
                    </Link>
                  </div>
                  <span className="text-[11px] text-muted">Technical Contributor</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 text-muted">
                <span className="inline-flex items-center gap-1.5">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <rect x="3" y="4" width="18" height="18" rx="2" />
                    <path d="M16 2v4M8 2v4M3 10h18" />
                  </svg>
                  <time dateTime={post.publishedAt} className="font-medium text-ink">
                    {formatDate(post.publishedAt)}
                  </time>
                </span>

                {updated && (
                  <span className="inline-flex items-center gap-1 rounded-md bg-emerald-50 px-2 py-0.5 text-[11px] font-bold text-emerald-700 border border-emerald-200/70">
                    <span>Updated {formatDate(post.updatedAt)}</span>
                  </span>
                )}
              </div>
            </div>
          </header>

          {/* Featured Hero Image */}
          <figure className="mt-6 overflow-hidden rounded-2xl border border-line/80 bg-white shadow-2xs">
            <img
              src={hero.src}
              srcSet={hero.srcSet}
              sizes={hero.sizes}
              alt={post.altImage || post.title}
              width={1200}
              height={675}
              fetchPriority="high"
              decoding="async"
              className="thumb !aspect-[16/9] w-full object-cover"
            />
            <figcaption className="border-t border-line/60 bg-surface-2/30 px-4 py-2 text-center text-[11px] text-muted">
              Tested on physical testbench hardware • TrendsWheel Editorial Lab capture
            </figcaption>
          </figure>

          {/* Collapsible Table of Contents */}
          <Toc items={toc} />

          {/* In-Article Segmented Body with Auto-Injected Ads */}
          <PostBody segments={segments} />

          {/* Frequently Asked Questions */}
          <div className="mt-10">
            <Faq items={post.faq} heading="Frequently Asked Questions (FAQs)" />
          </div>

          {/* Author Bio Box */}
          {author && <AuthorBox author={author} />}

          {/* Article Tag Cloud */}
          {post.tags.length > 0 && (
            <div className="my-6 flex flex-wrap items-center gap-2 pt-2">
              <span className="text-xs font-bold uppercase tracking-wider text-muted">
                Tags:
              </span>
              {post.tags.slice(0, 8).map((t) => (
                <span
                  key={t}
                  className="rounded-lg border border-line/80 bg-surface-2/70 px-3 py-1 text-xs font-semibold text-ink-2"
                >
                  #{t}
                </span>
              ))}
            </div>
          )}

          {/* Modern Interactive Social Share Buttons */}
          <ShareLinks url={url} title={post.title} />

          {/* Post-Content High Impact Ad */}
          <AdUnit kind="display" className="my-8" />

          {/* Previous / Next Article Cards */}
          <nav aria-label="Previous and next articles" className="my-10 grid gap-4 sm:grid-cols-2">
            <Link
              href={postUrl(previous.category.slug, previous.slug)}
              className="group relative flex items-center gap-4 overflow-hidden rounded-2xl border border-line/80 bg-white p-4 sm:p-5 no-underline shadow-2xs transition duration-200 hover:border-brand/40 hover:shadow-md"
            >
              <span
                aria-hidden="true"
                className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-surface-2 text-base font-bold text-ink-2 transition group-hover:bg-brand group-hover:text-white"
              >
                ←
              </span>
              <span className="min-w-0">
                <span className="text-[11px] font-bold uppercase tracking-wider text-brand-strong">
                  Previous Guide
                </span>
                <span className="font-display mt-0.5 block text-sm font-bold text-ink leading-snug line-clamp-2 transition group-hover:text-brand-strong">
                  {previous.title}
                </span>
                <span className="mt-1 block text-xs text-muted">
                  {formatDate(previous.updatedAt)}
                </span>
              </span>
            </Link>

            <Link
              href={postUrl(next.category.slug, next.slug)}
              className="group relative flex flex-row-reverse items-center gap-4 overflow-hidden rounded-2xl border border-line/80 bg-white p-4 sm:p-5 text-right no-underline shadow-2xs transition duration-200 hover:border-brand/40 hover:shadow-md"
            >
              <span
                aria-hidden="true"
                className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-surface-2 text-base font-bold text-ink-2 transition group-hover:bg-brand group-hover:text-white"
              >
                →
              </span>
              <span className="min-w-0">
                <span className="text-[11px] font-bold uppercase tracking-wider text-brand-strong">
                  Next Guide
                </span>
                <span className="font-display mt-0.5 block text-sm font-bold text-ink leading-snug line-clamp-2 transition group-hover:text-brand-strong">
                  {next.title}
                </span>
                <span className="mt-1 block text-xs text-muted">
                  {formatDate(next.updatedAt)}
                </span>
              </span>
            </Link>
          </nav>

          {/* Bottom Pre-Footer Ad */}
          <AdUnit kind="display" className="my-8" />
        </article>

        {/* Right Sidebar: Popular, Ads, Explore, Sticky Ad */}
        <aside className="space-y-6" aria-label="Article Sidebar">
          {/* Popular in this Category */}
          {popular.length > 0 && (
            <section className="rounded-2xl border border-line/80 bg-white p-5 shadow-2xs">
              <div className="flex items-center gap-2 border-b border-line/60 pb-3">
                <span className="text-base" aria-hidden="true">
                  🔥
                </span>
                <h2 className="font-display text-sm font-bold text-ink">
                  Popular in {post.category.name}
                </h2>
              </div>

              <ul className="mt-3.5 divide-y divide-line/60">
                {popular.map((p, idx) => {
                  const pImg = imageSet(p.thumbnailImage || p.featuredImage, '80px');
                  return (
                    <li key={p.slug} className="py-3 first:pt-0 last:pb-0">
                      <Link
                        href={postUrl(p.category.slug, p.slug)}
                        className="group flex items-start gap-3 no-underline"
                      >
                        <span className="font-display text-xs font-bold text-muted pt-0.5 w-3 shrink-0">
                          {idx + 1}
                        </span>
                        <img
                          src={pImg.src}
                          alt=""
                          width={80}
                          height={50}
                          loading="lazy"
                          className="w-16 h-11 shrink-0 rounded-lg object-cover bg-surface-2"
                        />
                        <span className="font-display text-xs font-bold leading-snug text-ink group-hover:text-brand-strong transition line-clamp-2">
                          {p.title}
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </section>
          )}

          {/* Sidebar Display Ad #1 */}
          <AdUnit kind="display" className="!my-0" />

          {/* Explore Categories (2x2 Grid) */}
          <section className="rounded-2xl border border-line/80 bg-white p-5 shadow-2xs">
            <div className="flex items-center gap-2 border-b border-line/60 pb-3">
              <span className="text-brand-strong" aria-hidden="true">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="7" height="7" rx="1" />
                  <rect x="14" y="3" width="7" height="7" rx="1" />
                  <rect x="3" y="14" width="7" height="7" rx="1" />
                  <rect x="14" y="14" width="7" height="7" rx="1" />
                </svg>
              </span>
              <h2 className="font-display text-sm font-bold text-ink">
                Explore Categories
              </h2>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-2.5">
              {allCategories.map((c) => {
                const isCurrent = c.slug === post.category.slug;
                const count = getPostsByCategory(c.slug).length;
                return (
                  <Link
                    key={c.slug}
                    href={categoryUrl(c.slug)}
                    className={`flex flex-col items-center justify-center rounded-xl border p-2.5 text-center no-underline transition ${
                      isCurrent
                        ? 'border-brand/40 bg-brand-soft text-brand-strong'
                        : 'border-line/80 bg-surface-2/60 text-ink-2 hover:border-brand hover:text-brand-strong'
                    }`}
                  >
                    <span className="text-xs font-bold">{c.name}</span>
                    <span className="text-[10px] text-muted">{count} guides</span>
                  </Link>
                );
              })}
            </div>
          </section>

          {/* Mini Sidebar Newsletter Card */}
          <CategoryNewsletter variant="sidebar" categoryName={post.category.name} />

          {/* Sticky High-RPM Sidebar Display Unit */}
          <div className="sticky top-28">
            <AdUnit kind="display" className="!my-0" />
          </div>
        </aside>
      </div>

      {/* Full-Width Same-Category Guides: 3 Articles in a Row */}
      {related.length > 0 && (
        <section
          aria-labelledby="same-category-guides"
          className="mt-14 border-t border-line/80 pt-10"
        >
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-line/60">
            <div>
              <div className="flex items-center gap-2">
                <span className={`chip chip-${post.category.slug}`}>
                  {post.category.name}
                </span>
                <span className="text-xs font-bold uppercase tracking-widest text-brand-strong">
                  Recommended Reading
                </span>
              </div>
              <h2
                id="same-category-guides"
                className="font-display mt-1.5 text-2xl sm:text-3xl font-bold tracking-tight text-ink"
              >
                More in {post.category.name}
              </h2>
              <p className="mt-1 text-xs sm:text-sm text-ink-2 max-w-2xl leading-relaxed">
                Continue reading our latest field-tested guides, tutorials, and deep dives in {post.category.name}.
              </p>
            </div>

            <Link
              href={categoryUrl(post.category.slug)}
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-brand-strong hover:underline shrink-0"
            >
              <span>Explore all {post.category.name} guides</span>
              <span aria-hidden="true">→</span>
            </Link>
          </div>

          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {related.slice(0, 3).map((p) => (
              <PostCard
                key={p.slug}
                post={p}
                sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw"
              />
            ))}
          </div>
        </section>
      )}

      {/* Full-Width Recommended Reading: Related Categories & Recommended Guides (3 posts each) */}
      <RelatedCategories
        currentCategoryName={post.category.name}
        relatedCategories={relatedCategories}
      />

      {/* Full-Width Bottom Dispatch Newsletter */}
      <div className="mt-12">
        <CategoryNewsletter variant="banner" categoryName={post.category.name} />
      </div>
    </div>
  );
}
