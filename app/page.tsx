import type { Metadata } from 'next';
import Link from 'next/link';
import AdUnit from '@/components/ads/AdUnit';
import JsonLd from '@/components/JsonLd';
import Faq from '@/components/post/Faq';
import PostCard from '@/components/post/PostCard';
import { homeFaq, trustBadges, trustParagraphs } from '@/config/home-content';
import { HOME_TITLE } from '@/config/site';
import { getAllPosts, getCategories, getPostsByCategory, getSite, readingMinutes } from '@/lib/content';
import { formatDate } from '@/lib/format';
import { imageSet } from '@/lib/images';
import { faqSchema, homeMetadata, websiteSchema } from '@/lib/seo';
import { absoluteUrl, archiveUrl, categoryUrl, postUrl, staticPageUrl } from '@/lib/url';

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
    <div className="container-page py-6">
      <JsonLd data={websiteSchema()} />
      {faqLd && <JsonLd data={faqLd} />}

      <section aria-labelledby="hero-title" className="grid items-center gap-6 lg:grid-cols-2">
        <div>
          <p className="text-sm font-bold uppercase tracking-wide text-brand-strong">{site.name}</p>
          <h1 id="hero-title" className="font-display mt-2 text-4xl font-bold leading-tight sm:text-5xl">
            Tech News, App Reviews &amp; How-To Guides
          </h1>
          <p className="mt-4 text-lg text-ink-2">{site.tagline}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href={archiveUrl()} className="btn">
              Browse all articles
            </Link>
            <Link href={categoryUrl('how-to')} className="btn btn-outline">
              Android how-to guides
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
            {featured.description && <p className="mt-2 line-clamp-3 text-ink-2">{featured.description}</p>}
            <p className="mt-3 text-sm text-muted">
              {formatDate(featured.updatedAt)} · {readingMinutes(featured.html)} min read
            </p>
          </div>
        </article>
      </section>

      <section className="mt-14" aria-labelledby="latest">
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

      <section className="card mt-14 grid gap-6 p-6 md:grid-cols-[1.2fr_1fr] md:p-8" aria-labelledby="who">
        <div>
          <p className="text-sm font-bold uppercase tracking-wide text-brand-strong">Who We Are</p>
          <h2 id="who" className="font-display mt-1 text-2xl font-bold">
            {site.aboutHeading}
          </h2>
          <div className="page-body mt-3" dangerouslySetInnerHTML={{ __html: site.aboutContent ?? `<p>${site.tagline}</p>` }} />
          <p className="mt-4">
            <Link href={staticPageUrl('about-us')} className="btn">
              Learn more about us
            </Link>
          </p>
        </div>
        {site.aboutImage && (
          <img src={site.aboutImage} alt={site.aboutImageAlt ?? site.name} width={460} height={460} loading="lazy" decoding="async" className="mx-auto w-full max-w-sm rounded-xl object-cover" />
        )}
      </section>

      <section className="mt-14" aria-labelledby="trust">
        <h2 id="trust" className="font-display text-2xl font-bold">
          Why Trust Us
        </h2>
        <ul className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {trustBadges.map((b) => (
            <li key={b.title} className="card p-4">
              <strong className="block">{b.title}</strong>
              <span className="text-sm text-ink-2">{b.text}</span>
            </li>
          ))}
        </ul>
        <div className="mt-5 max-w-3xl space-y-3 text-ink-2">
          {trustParagraphs.map((t) => (
            <p key={t}>{t}</p>
          ))}
          <p>
            Spotted something outdated? <Link href={staticPageUrl('contact-us')} className="font-semibold text-brand-strong underline">Use the Contact page</Link> and let us know - we&apos;d rather fix it than have people finding out it doesn&apos;t work anymore.
          </p>
        </div>
      </section>

      <Faq items={homeFaq} heading="Frequently Asked Questions" />
    </div>
  );
}
