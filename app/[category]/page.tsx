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
import { getCategories, getCategory, getPopularPosts, getPostsByCategory } from '@/lib/content';
import { categoryMetadata, categorySchemas } from '@/lib/seo';
import { categoryUrl, postUrl } from '@/lib/url';

export const dynamicParams = false;

type Params = { category: string };

export const generateStaticParams = (): Params[] => getCategories().map((c) => ({ category: c.slug }));

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { category } = await params;
  const c = getCategory(category);
  return c ? categoryMetadata(c) : {};
}

export default async function CategoryPage({ params }: { params: Promise<Params> }) {
  const { category } = await params;
  const c = getCategory(category);
  if (!c) notFound();

  const posts = getPostsByCategory(c.slug);
  const copy = categoryCopy[c.slug];
  const picks = (copy?.picks ?? []).flatMap(([slug, why]) => {
    const p = posts.find((x) => x.slug === slug);
    return p ? [{ post: p, why }] : [];
  });
  const popular = getPopularPosts(6, c.slug);

  return (
    <>
      {categorySchemas(c, posts).map((s, i) => (
        <JsonLd key={i} data={s} />
      ))}
      <div className="hero-band">
        <header className="container-page py-8 sm:py-12">
          <Breadcrumbs items={[{ name: 'Home', href: '/' }, { name: c.name }]} />
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <span className="chip">{c.name}</span>
            <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-ink-2 ring-1 ring-line">{posts.length} articles</span>
          </div>
          <h1 className="font-display mt-4 text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl">{copy?.heading ?? c.name}</h1>
          <div className="mt-4 h-1 w-16 rounded-full bg-brand" aria-hidden="true" />
          <div className="mt-6 grid gap-5 text-[1.05rem] leading-relaxed text-ink-2 lg:grid-cols-2 lg:gap-10">
            {copy?.intro.map((t) => (
              <p key={t} className="border-l-4 border-brand/30 pl-5">
                {t}
              </p>
            ))}
          </div>
        </header>
      </div>

      <div className="container-page py-6">
      {picks.length > 0 && (
        <section className="card mt-8 p-5" aria-labelledby="start-here">
          <h2 id="start-here" className="font-display text-xl font-bold">
            Start here
          </h2>
          <ul className="mt-3 space-y-2">
            {picks.map(({ post, why }) => (
              <li key={post.slug}>
                <Link href={postUrl(post.category.slug, post.slug)} className="font-bold text-brand-strong underline underline-offset-2">
                  {post.title}
                </Link>
                <span className="text-ink-2"> – {why}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="mt-10" aria-labelledby="all-posts">
        <h2 id="all-posts" className="font-display text-2xl font-bold">
          All {c.name} articles
        </h2>
        <div className="mt-5">
          <LoadMore initial={12} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.flatMap((p, i) => {
              const card = <PostCard key={p.slug} post={p} priority={i < 2} />;
              return card;
            })}
          </LoadMore>
        </div>
      </section>

      <AdUnit kind="display" />

      {copy && <EditorialNote note={copy.note} />}

      <Faq items={c.faq} heading="Frequently Asked Questions (FAQs)" />

      {popular.length > 0 && (
        <section aria-labelledby="popular" className="mt-12 rounded-[28px] border border-line bg-gradient-to-br from-brand-soft/60 via-white to-surface-2 p-6 sm:p-8">
          <h2 id="popular" className="font-display flex items-center gap-3 text-2xl font-bold sm:text-3xl">
            <span className="h-7 w-1.5 rounded-full bg-brand" aria-hidden="true" />
            Popular Articles
          </h2>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {popular.map((p, i) => (
              <li key={p.slug} className="relative rounded-2xl border border-line bg-white p-4 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-brand/50 hover:shadow-lg">
                <span className="absolute -left-2 -top-2 z-10 flex size-8 items-center justify-center rounded-full bg-brand text-sm font-bold text-white shadow-md" aria-hidden="true">
                  {i + 1}
                </span>
                <PostCard post={p} compact />
              </li>
            ))}
          </ul>
        </section>
      )}

      <nav aria-label="Other categories" className="mt-10 flex flex-wrap gap-2">
        {getCategories()
          .filter((x) => x.slug !== c.slug)
          .map((x) => (
            <Link key={x.slug} href={categoryUrl(x.slug)} className="group inline-flex min-h-11 items-center gap-2 rounded-full border-2 border-line bg-white px-5 py-2 font-bold text-ink no-underline shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-brand hover:bg-brand hover:text-white hover:shadow-md">
              {x.name}
              <span aria-hidden="true" className="transition group-hover:translate-x-1">→</span>
            </Link>
          ))}
      </nav>
      </div>
    </>
  );
}
