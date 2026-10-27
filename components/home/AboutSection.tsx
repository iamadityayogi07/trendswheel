import Link from 'next/link';
import type { Site } from '@/lib/content';
import { staticPageUrl } from '@/lib/url';

export default function AboutSection({ site }: { site: Site }) {
  return (
    <section
      aria-labelledby="who"
      className="relative mt-16 overflow-hidden rounded-[28px] border border-line bg-gradient-to-br from-brand-soft via-white to-surface-2 p-6 sm:p-10 lg:p-14"
    >
      <div className="pointer-events-none absolute -right-24 -top-24 size-72 rounded-full bg-brand/10 blur-3xl" aria-hidden="true" />
      <div className="relative grid items-center gap-10 lg:grid-cols-[1.15fr_1fr]">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-brand-strong shadow-sm ring-1 ring-line">
            <span className="size-2 rounded-full bg-brand" aria-hidden="true" />
            Who We Are
          </p>
          <h2 id="who" className="font-display mt-4 text-3xl font-bold leading-tight sm:text-4xl">
            {site.aboutHeading}
          </h2>
          <div className="page-body mt-5 text-[1.05rem]" dangerouslySetInnerHTML={{ __html: site.aboutContent ?? `<p>${site.tagline}</p>` }} />
          <p className="mt-7">
            <Link href={staticPageUrl('about-us')} className="btn">
              Learn more about us
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </Link>
          </p>
        </div>
        {site.aboutImage && (
          <div className="relative mx-auto w-full max-w-md">
            <div className="absolute inset-0 translate-x-3 translate-y-3 rounded-3xl bg-brand/20" aria-hidden="true" />
            <img
              src={site.aboutImage}
              alt={site.aboutImageAlt ?? site.name}
              width={460}
              height={460}
              loading="lazy"
              decoding="async"
              className="relative aspect-square w-full rounded-3xl border-4 border-white object-cover shadow-xl"
            />
          </div>
        )}
      </div>
    </section>
  );
}
