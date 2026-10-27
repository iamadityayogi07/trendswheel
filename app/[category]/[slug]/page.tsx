import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import AdUnit from '@/components/ads/AdUnit';
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
  const popular = getPopularPosts(5, post.category.slug).filter((p) => p.slug !== post.slug).slice(0, 4);
  const hero = imageSet(post.featuredImage, '(min-width: 1024px) 720px, 100vw');
  const url = absoluteUrl(postUrl(post.category.slug, post.slug));
  const updated = !sameDay(post.publishedAt, post.updatedAt);

  return (
    <div className="container-page py-6">
      {postSchemas(post, author).map((s, i) => (
        <JsonLd key={i} data={s} />
      ))}
      <Breadcrumbs
        items={[
          { name: 'Home', href: '/' },
          { name: post.category.name, href: categoryUrl(post.category.slug) },
          { name: post.title },
        ]}
      />

      <div className="mt-6 grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px]">
        <article className="mx-auto w-full min-w-0 max-w-[720px] lg:mx-0">
          <header>
            <Link href={categoryUrl(post.category.slug)} className="chip">
              {post.category.name}
            </Link>
            <h1 className="font-display mt-3 text-3xl font-bold leading-tight sm:text-4xl">{post.title}</h1>
            <p className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted">
              <span>
                Published on: <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
              </span>
              {updated && (
                <span>
                  Updated on: <time dateTime={post.updatedAt}>{formatDate(post.updatedAt)}</time>
                </span>
              )}
              <span>{readingMinutes(post.html)} min read</span>
              <span>
                <Link href={authorUrl(post.author.slug)} className="font-semibold text-ink-2 no-underline hover:text-brand-strong hover:underline">
                  {post.author.name}
                </Link>
              </span>
            </p>
          </header>

          <figure className="mt-5">
            <img
              src={hero.src}
              srcSet={hero.srcSet}
              sizes={hero.sizes}
              alt={post.altImage || post.title}
              width={1200}
              height={675}
              fetchPriority="high"
              className="thumb rounded-xl"
            />
          </figure>

          <Toc items={toc} />

          <PostBody segments={segments} />

          <Faq items={post.faq} heading="Frequently Asked Questions (FAQs)" />

          {author && <AuthorBox author={author} />}

          {post.tags.length > 0 && (
            <ul className="my-4 flex flex-wrap gap-2" aria-label="Tags">
              {post.tags.slice(0, 8).map((t) => (
                <li key={t} className="rounded-full bg-surface-2 px-3 py-1 text-sm text-ink-2">
                  {t}
                </li>
              ))}
            </ul>
          )}

          <ShareLinks url={url} title={post.title} />

          <AdUnit kind="display" />

          <nav aria-label="Previous and next articles" className="my-10 grid gap-4 sm:grid-cols-2">
            <Link href={postUrl(previous.category.slug, previous.slug)} className="group relative flex items-center gap-4 overflow-hidden rounded-2xl border border-line bg-white p-5 no-underline shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-brand hover:bg-brand-soft/50 hover:shadow-md">
              <span aria-hidden="true" className="flex size-11 shrink-0 items-center justify-center rounded-full bg-brand-soft text-xl font-bold text-brand-strong transition group-hover:-translate-x-1 group-hover:bg-brand group-hover:text-white">←</span>
              <span className="min-w-0">
                <span className="text-xs font-bold uppercase tracking-wide text-brand-strong">‹ Previous Article</span>
                <span className="font-display mt-1 block font-bold leading-snug transition group-hover:text-brand-strong">{previous.title}</span>
                <span className="mt-1 block text-sm text-muted">{formatDate(previous.updatedAt)}</span>
              </span>
            </Link>
            <Link href={postUrl(next.category.slug, next.slug)} className="group relative flex flex-row-reverse items-center gap-4 overflow-hidden rounded-2xl border border-line bg-white p-5 text-right no-underline shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-brand hover:bg-brand-soft/50 hover:shadow-md">
              <span aria-hidden="true" className="flex size-11 shrink-0 items-center justify-center rounded-full bg-brand-soft text-xl font-bold text-brand-strong transition group-hover:translate-x-1 group-hover:bg-brand group-hover:text-white">→</span>
              <span className="min-w-0">
                <span className="text-xs font-bold uppercase tracking-wide text-brand-strong">Next Article ›</span>
                <span className="font-display mt-1 block font-bold leading-snug transition group-hover:text-brand-strong">{next.title}</span>
                <span className="mt-1 block text-sm text-muted">{formatDate(next.updatedAt)}</span>
              </span>
            </Link>
          </nav>

          <section aria-labelledby="read-next" className="mt-10">
            <h2 id="read-next" className="font-display text-2xl font-bold">
              Read next
            </h2>
            <div className="mt-4 grid gap-5 sm:grid-cols-2">
              {related.slice(0, 2).map((p) => (
                <PostCard key={p.slug} post={p} sizes="(min-width: 640px) 340px, 100vw" />
              ))}
            </div>
            {related.length > 2 && (
              <div className="lg:hidden">
                <h2 className="font-display mt-10 text-2xl font-bold">Related posts</h2>
                <ul className="mt-4 space-y-4">
                  {related.slice(2).map((p) => (
                    <li key={p.slug}>
                      <PostCard post={p} compact />
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </section>
        </article>

        <aside className="hidden lg:block" aria-label="Sidebar">
          <div className="space-y-8">
            {popular.length > 0 && (
              <section aria-labelledby="side-popular" className="rounded-2xl border border-line bg-white p-5 shadow-sm">
                <h2 id="side-popular" className="font-display flex items-center gap-2.5 text-xl font-bold">
                  <span className="h-6 w-1.5 rounded-full bg-brand" aria-hidden="true" />
                  Popular Articles
                </h2>
                <ul className="mt-4 space-y-2">
                  {popular.map((p) => (
                    <li key={p.slug} className="-mx-2 rounded-xl p-2 transition hover:bg-brand-soft/60">
                      <PostCard post={p} compact />
                    </li>
                  ))}
                </ul>
              </section>
            )}
            {related.length > 2 && (
              <section aria-labelledby="side-related" className="rounded-2xl border border-line bg-white p-5 shadow-sm">
                <h2 id="side-related" className="font-display flex items-center gap-2.5 text-xl font-bold">
                  <span className="h-6 w-1.5 rounded-full bg-brand" aria-hidden="true" />
                  Related posts
                </h2>
                <ul className="mt-4 space-y-2">
                  {related.slice(2).map((p) => (
                    <li key={p.slug} className="-mx-2 rounded-xl p-2 transition hover:bg-brand-soft/60">
                      <PostCard post={p} compact />
                    </li>
                  ))}
                </ul>
              </section>
            )}
            <section aria-labelledby="side-cats" className="rounded-2xl border border-line bg-gradient-to-br from-brand-soft/60 via-white to-surface-2 p-5 shadow-sm">
              <h2 id="side-cats" className="font-display flex items-center gap-2.5 text-xl font-bold">
                <span className="h-6 w-1.5 rounded-full bg-brand" aria-hidden="true" />
                Hot Categories
              </h2>
              <ul className="mt-4 space-y-2">
                {getCategories().map((c) => (
                  <li key={c.slug}>
                    <Link
                      href={categoryUrl(c.slug)}
                      className="group flex min-h-12 items-center justify-between gap-3 rounded-xl border border-line bg-white px-4 no-underline transition duration-200 hover:-translate-y-0.5 hover:border-brand hover:bg-brand hover:text-white hover:shadow-md"
                    >
                      <span className="font-display font-bold">{c.name}</span>
                      <span className="flex items-center gap-2">
                        <span className="rounded-full bg-brand-soft px-2.5 py-0.5 text-xs font-bold text-brand-strong transition group-hover:bg-white/20 group-hover:text-white">{getPostsByCategory(c.slug).length}</span>
                        <span aria-hidden="true" className="transition group-hover:translate-x-1">→</span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
            <div className="sticky top-24">
              <AdUnit kind="display" className="!my-0" />
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
