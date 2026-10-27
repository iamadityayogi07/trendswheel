import type { Metadata } from 'next';
import Link from 'next/link';
import AboutSection from '@/components/home/AboutSection';
import TrustSection from '@/components/home/TrustSection';
import AdUnit from '@/components/ads/AdUnit';
import JsonLd from '@/components/JsonLd';
import Faq from '@/components/post/Faq';
import PostCard from '@/components/post/PostCard';
import { homeFaq } from '@/config/home-content';
import { HOME_TITLE } from '@/config/site';
import { getAllPosts, getCategories, getPostsByCategory, getSite, readingMinutes, stripHtml } from '@/lib/content';
import { formatDate } from '@/lib/format';
import { imageSet } from '@/lib/images';
import { faqSchema, homeMetadata, websiteSchema } from '@/lib/seo';
import { absoluteUrl, archiveUrl, categoryUrl, postUrl } from '@/lib/url';

export const metadata: Metadata = homeMetadata(HOME_TITLE);

export default function HomePage() {
  const site = getSite();
  const posts = getAllPosts();
  const [featured, ...rest] = posts;
  const latest = rest.slice(0, 6);
  const hero = imageSet(featured.featuredImage, '(min-width: 1024px) 560px, 100vw');
  const shown = new Set([featured.slug, ...latest.map((p) => p.slug)]);
  const sections = getCategories()
    .map((c) => ({ c, posts: getPostsByCategory(c.slug).filter((p) => !shown.has(p.slug)).slice(0, 3), total: getPostsByCategory(c.slug).length }))
    .filter((s) => s.posts.length > 0);
  const faqLd = faqSchema(homeFaq, `${absoluteUrl('/')}#faq`);

  return (
    <>
      <JsonLd data={websiteSchema()} />
      {faqLd && <JsonLd data={faqLd} />}

      <div className="hero-band">
      <section aria-labelledby="hero-title" className="container-page grid items-center gap-8 py-10 lg:grid-cols-2 lg:py-14">
        <div>
          <p className="text-sm font-bold uppercase tracking-wide text-brand-strong">{site.name}</p>
          <h1 id="hero-title" className="font-display mt-2 text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
            Tech News, App Reviews &amp; How-To Guides
          </h1>
          <p className="mt-4 text-lg text-ink-2">{site.tagline}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href={archiveUrl()} className="group inline-flex min-h-12 items-center gap-2 rounded-full bg-gradient-to-r from-brand to-brand-strong px-7 py-3 font-bold text-white no-underline shadow-lg shadow-brand/30 transition duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-brand/40">
              Browse all articles
              <span aria-hidden="true" className="transition group-hover:translate-x-1">→</span>
            </Link>
            <Link href={categoryUrl('how-to')} className="group inline-flex min-h-12 items-center gap-2 rounded-full border-2 border-line bg-white px-7 py-3 font-bold text-ink no-underline shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-brand hover:bg-brand-soft hover:text-brand-strong hover:shadow-md">
              Android how-to guides
              <span aria-hidden="true" className="transition group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </div>
        <article className="card">
          <Link href={postUrl(featured.category.slug, featured.slug)} tabIndex={-1} aria-hidden="true">
            <img src={hero.src} srcSet={hero.srcSet} sizes={hero.sizes} alt={featured.altImage || featured.title} width={1200} height={675} fetchPriority="high" className="thumb" />
          </Link>
          <div className="p-5">
            <div className="flex items-center gap-3">
              <Link href={categoryUrl(featured.category.slug)} className="chip">
                {featured.category.name}
              </Link>
              <span className="text-sm text-muted">Featured</span>
            </div>
            <h2 className="font-display mt-3 text-2xl font-bold leading-snug">
              <Link href={postUrl(featured.category.slug, featured.slug)} className="no-underline hover:text-brand-strong hover:underline">
                {featured.title}
              </Link>
            </h2>
            {featured.description && <p className="mt-2 line-clamp-3 text-ink-2">{stripHtml(featured.description)}</p>}
            <p className="mt-3 text-sm text-muted">
              {formatDate(featured.updatedAt)} · {readingMinutes(featured.html)} min read
            </p>
          </div>
        </article>
      </section>
      </div>

      <div className="container-page pb-6">
      <section className="mt-12" aria-labelledby="latest">
        <div className="flex items-end justify-between gap-4">
          <h2 id="latest" className="font-display text-2xl font-bold sm:text-3xl">
            Latest articles
          </h2>
          <Link href={archiveUrl()} className="font-semibold text-brand-strong underline underline-offset-2">
            View all
          </Link>
        </div>
        <ul className="mt-5 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {latest.map((p) => (
            <li key={p.slug}>
              <PostCard post={p} />
            </li>
          ))}
        </ul>
      </section>

      <AdUnit kind="inFeed" />

      {sections.map(({ c, posts: ps, total }) => (
        <section key={c.slug} className="mt-12" aria-labelledby={`cat-${c.slug}`}>
          <div className="flex items-end justify-between gap-4">
            <h2 id={`cat-${c.slug}`} className="font-display text-2xl font-bold">
              {c.name}
            </h2>
            <Link href={categoryUrl(c.slug)} className="font-semibold text-brand-strong underline underline-offset-2">
              All {total} articles
            </Link>
          </div>
          <ul className="mt-5 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {ps.map((p) => (
              <li key={p.slug}>
                <PostCard post={p} />
              </li>
            ))}
          </ul>
        </section>
      ))}

      <AboutSection site={site} />
      <TrustSection />

      <Faq items={homeFaq} heading="Frequently Asked Questions" centered />
      </div>
    </>
  );
}
