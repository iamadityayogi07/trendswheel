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

          <nav aria-label="Previous and next articles" className="my-8 grid gap-4 sm:grid-cols-2">
            <Link href={postUrl(previous.category.slug, previous.slug)} className="card block p-4 no-underline hover:border-brand">
              <span className="text-sm font-semibold text-brand-strong">‹ Previous Article</span>
              <span className="mt-1 block font-bold leading-snug">{previous.title}</span>
              <span className="mt-1 block text-sm text-muted">{formatDate(previous.updatedAt)}</span>
            </Link>
            <Link href={postUrl(next.category.slug, next.slug)} className="card block p-4 text-right no-underline hover:border-brand">
              <span className="text-sm font-semibold text-brand-strong">Next Article ›</span>
              <span className="mt-1 block font-bold leading-snug">{next.title}</span>
              <span className="mt-1 block text-sm text-muted">{formatDate(next.updatedAt)}</span>
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
            <h2 className="font-display mt-10 text-2xl font-bold">Related posts</h2>
            <ul className="mt-4 space-y-4">
              {related.slice(2).map((p) => (
                <li key={p.slug}>
                  <PostCard post={p} compact />
                </li>
              ))}
            </ul>
          </section>
        </article>

        <aside className="hidden lg:block" aria-label="Sidebar">
          <div className="sticky top-24 space-y-8">
            {popular.length > 0 && (
              <section>
                <h2 className="font-display text-xl font-bold">Popular Articles</h2>
                <ul className="mt-4 space-y-4">
                  {popular.map((p) => (
                    <li key={p.slug}>
                      <PostCard post={p} compact />
                    </li>
                  ))}
                </ul>
              </section>
            )}
            <section>
              <h2 className="font-display text-xl font-bold">Hot Categories</h2>
              <ul className="mt-3 divide-y divide-line rounded-xl border border-line bg-surface">
                {getCategories().map((c) => (
                  <li key={c.slug}>
                    <Link href={categoryUrl(c.slug)} className="flex min-h-11 items-center justify-between px-4 no-underline hover:bg-surface-2">
                      <span className="font-semibold">{c.name}</span>
                      <span className="text-sm text-muted">{getPostsByCategory(c.slug).length}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
            <AdUnit kind="display" className="!my-0" />
          </div>
        </aside>
      </div>
    </div>
  );
}
