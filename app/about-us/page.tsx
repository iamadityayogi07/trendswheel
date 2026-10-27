import type { Metadata } from 'next';
import Link from 'next/link';
import JsonLd from '@/components/JsonLd';
import Breadcrumbs from '@/components/post/Breadcrumbs';
import { getAuthors, getSite } from '@/lib/content';
import { buildMetadata, simplePageSchema } from '@/lib/seo';
import { authorUrl, categoryUrl, staticPageUrl } from '@/lib/url';

const path = staticPageUrl('about-us');
const TITLE = 'About TrendsWheel | Tech News, Guides & App Trends';
const DESCRIPTION =
  'Learn about TrendsWheel, a platform for tech news, app reviews, how-to tutorials and trending topics. See our mission and how we keep guides current.';

export const metadata: Metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  keywords: 'about TrendsWheel, about us, TrendsWheel team, tech news site, app guides, how to tutorials, trending topics 2026, tech trends, app reviews 2026',
  path,
});

const coverage = [
  { slug: 'how-to', name: 'How-To', text: 'Android guides & troubleshooting' },
  { slug: 'apps', name: 'Apps', text: 'Apps & privacy decisions' },
  { slug: 'tech', name: 'Tech', text: 'Tech explained for India' },
  { slug: 'social', name: 'Social', text: 'Privacy settings & short video' },
];

export default function AboutPage() {
  const site = getSite();
  // Same rule as the old site: authors with a bio and an avatar, founder first.
  const team = getAuthors()
    .filter((a) => a.bio?.trim() && a.avatar)
    .sort((a, b) => Number(b.isAdmin) - Number(a.isAdmin));

  return (
    <div className="container-page py-6">
      <JsonLd data={simplePageSchema('AboutPage', 'About Us - TrendsWheel', 'Learn more about TrendsWheel, our vision, mission, and purpose.', path)} />
      <Breadcrumbs items={[{ name: 'Home', href: '/' }, { name: 'About Us' }]} />

      <section className="mt-6 grid items-center gap-8 lg:grid-cols-[1fr_1.4fr]">
        {site.aboutImage && (
          <img src={site.aboutImage} alt={site.aboutImageAlt ?? site.name} width={460} height={460} fetchPriority="high" className="mx-auto w-full max-w-md rounded-2xl object-cover" />
        )}
        <div>
          <p className="text-sm font-bold uppercase tracking-wide text-brand-strong">Who We Are</p>
          <h1 className="font-display mt-1 text-4xl font-bold">{site.aboutHeading}</h1>
          <div className="page-body mt-4" dangerouslySetInnerHTML={{ __html: site.aboutContent ?? `<p>${site.tagline}</p>` }} />
        </div>
      </section>

      <section className="card mt-10 p-6">
        <h2 className="font-display text-2xl font-bold">What We Cover</h2>
        <p className="mt-3 text-ink-2">
          We keep to a few topics: Android how-to guides, apps and privacy, tech explained for India, and social media privacy. We do not publish phone reviews, launch news or follower-growth tips.
        </p>
        <ul className="my-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {coverage.map((c) => (
            <li key={c.slug}>
              <Link href={categoryUrl(c.slug)} className="block rounded-xl bg-surface-2 p-4 no-underline hover:bg-brand-soft">
                <strong className="block">{c.name}</strong>
                <span className="text-sm text-ink-2">{c.text}</span>
              </Link>
            </li>
          ))}
        </ul>
        <p className="text-ink-2">
          Each article shows the source behind its facts and the date it was last updated. If something has changed or a step does not match your phone, tell us on the Contact page and we will check it.
        </p>
      </section>

      {team.length > 0 && (
        <section className="mt-12" aria-labelledby="team">
          <div className="text-center">
            <h2 id="team" className="font-display text-3xl font-bold">
              Who Writes This
            </h2>
            <p className="mt-1 italic text-muted">The people behind the articles.</p>
          </div>
          <ul className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((m) => (
              <li key={m.slug} className="card">
                <Link href={authorUrl(m.slug)} className="block" tabIndex={-1} aria-hidden="true">
                  <img
                    src={m.avatar!}
                    alt={`${m.name}, ${m.isAdmin ? 'Founder & Writer' : 'Writer'} at TrendsWheel`}
                    width={320}
                    height={280}
                    loading="lazy"
                    decoding="async"
                    className="h-72 w-full object-cover"
                    style={{ objectPosition: m.slug === 'aditya-yogi' ? 'center 20%' : 'top' }}
                  />
                </Link>
                <div className="p-4">
                  <h3 className="font-display text-xl font-bold">
                    <Link href={authorUrl(m.slug)} className="no-underline hover:text-brand-strong hover:underline">
                      {m.name}
                    </Link>
                  </h3>
                  <p className="text-sm font-semibold text-brand-strong">{m.isAdmin ? 'Founder & Writer' : 'Writer'}</p>
                  {m.shortBio && <p className="mt-2 whitespace-pre-line text-sm text-ink-2">{m.shortBio}</p>}
                </div>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
