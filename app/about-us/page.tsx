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

const ic = { width: 24, height: 24, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.9, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true } as const;
const coverIcons: Record<string, React.ReactNode> = {
  'how-to': <svg {...ic}><rect x="6" y="2" width="12" height="20" rx="3" /><path d="M11 18h2" /></svg>,
  apps: <svg {...ic}><rect x="3" y="3" width="7" height="7" rx="2" /><rect x="14" y="3" width="7" height="7" rx="2" /><rect x="3" y="14" width="7" height="7" rx="2" /><rect x="14" y="14" width="7" height="7" rx="2" /></svg>,
  tech: <svg {...ic}><rect x="5" y="5" width="14" height="14" rx="2" /><rect x="9" y="9" width="6" height="6" /><path d="M9 1v4M15 1v4M9 19v4M15 19v4M1 9h4M1 15h4M19 9h4M19 15h4" /></svg>,
  social: <svg {...ic}><circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" /><path d="m8.6 13.5 6.8 4M15.4 6.5l-6.8 4" /></svg>,
};

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

      <section aria-labelledby="what-we-cover" className="relative mt-12 overflow-hidden rounded-[28px] border border-line bg-gradient-to-br from-brand-soft via-white to-surface-2 p-6 sm:p-10">
        <div className="pointer-events-none absolute -right-20 -top-20 size-64 rounded-full bg-brand/10 blur-3xl" aria-hidden="true" />
        <div className="relative">
          <h2 id="what-we-cover" className="font-display text-2xl font-bold sm:text-3xl">
            What We Cover
          </h2>
          <div className="mt-3 h-1 w-14 rounded-full bg-brand" aria-hidden="true" />
          <p className="mt-5 border-l-4 border-brand/40 pl-5 text-[1.05rem] leading-relaxed text-ink-2">
            We keep to a few topics: Android how-to guides, apps and privacy, tech explained for India, and social media privacy. We do not publish phone reviews, launch news or follower-growth tips.
          </p>
          <ul className="my-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {coverage.map((c) => (
              <li key={c.slug}>
                <Link href={categoryUrl(c.slug)} className="group flex h-full flex-col rounded-2xl border border-line bg-white p-5 no-underline shadow-sm transition duration-200 hover:-translate-y-1 hover:border-brand/50 hover:shadow-lg">
                  <span className="flex size-12 items-center justify-center rounded-xl bg-brand-soft text-brand-strong transition group-hover:bg-brand group-hover:text-white">{coverIcons[c.slug]}</span>
                  <strong className="font-display mt-4 block text-lg text-ink">{c.name}</strong>
                  <span className="mt-1 block text-ink-2">{c.text}</span>
                  <span className="mt-auto pt-4 text-sm font-bold text-brand-strong">
                    Explore <span aria-hidden="true" className="inline-block transition group-hover:translate-x-1">→</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <p className="flex items-start gap-3 rounded-2xl bg-white/80 p-4 text-ink-2 ring-1 ring-line">
            <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full bg-brand-soft text-brand-strong" aria-hidden="true">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 16v-4M12 8h.01" />
              </svg>
            </span>
            <span>Each article shows the source behind its facts and the date it was last updated. If something has changed or a step does not match your phone, tell us on the Contact page and we will check it.</span>
          </p>
        </div>
      </section>

      {team.length > 0 && (
        <section className="mt-12" aria-labelledby="team">
          <div className="text-center">
            <h2 id="team" className="font-display text-3xl font-bold">
              Who Writes This
            </h2>
            <p className="mt-1 italic text-muted">The people behind the articles.</p>
          </div>
          <ul className="mt-6 flex flex-wrap justify-center gap-6">
            {team.map((m) => (
              <li key={m.slug} className="card w-full max-w-sm text-center sm:w-[calc(50%-0.75rem)] lg:w-[calc(25%-1.125rem)] lg:min-w-64">
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
