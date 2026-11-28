import type { Metadata } from 'next';
import Link from 'next/link';
import AdUnit from '@/components/ads/AdUnit';
import JsonLd from '@/components/JsonLd';
import Breadcrumbs from '@/components/post/Breadcrumbs';
import { SITE_URL } from '@/config/site';
import { getSite } from '@/lib/content';
import { buildMetadata, simplePageSchema } from '@/lib/seo';
import { staticPageUrl } from '@/lib/url';

const path = staticPageUrl('contact-us');

export const metadata: Metadata = buildMetadata({
  title: 'Contact TrendsWheel | Editorial Desk & Reader Support',
  description:
    'Have questions, feedback, or a correction to report? Contact TrendsWheel directly via email or WhatsApp — your source for tech news, app reviews, and hardware-verified how-to guides.',
  keywords:
    'contact TrendsWheel, contact us, TrendsWheel support, tech news contact, app guides, how to guides, tech trends 2026',
  path,
});

const socialIcons: Record<string, React.ReactNode> = {
  youtube: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31.4 31.4 0 0 0 0 12a31.4 31.4 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31.4 31.4 0 0 0 24 12a31.4 31.4 0 0 0-.5-5.8ZM9.6 15.6V8.4l6.3 3.6-6.3 3.6Z" />
    </svg>
  ),
  x: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.2 2.25h3.3l-7.2 8.23L22.8 21.75h-6.64l-5.2-6.8-5.95 6.8H1.7l7.7-8.8L1.2 2.25h6.8l4.7 6.21 5.5-6.21Zm-1.16 17.52h1.83L7.05 4.13H5.1l11.94 15.64Z" />
    </svg>
  ),
  linkedin: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77Z" />
    </svg>
  ),
  instagram: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
    </svg>
  ),
  pinterest: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <path d="M10.5 21l1.8-7.4M9 11.5c0-2 1.6-3.5 3.5-3.5s3 1.3 3 3c0 2.3-1.3 4-3 4-.8 0-1.4-.4-1.7-1" />
    </svg>
  ),
};

export default function ContactPage() {
  const site = getSite();
  const ld = simplePageSchema(
    'ContactPage',
    'Contact Us - TrendsWheel',
    'Have questions or feedback? Contact TrendsWheel anytime.',
    path
  );

  const mainMailto = `mailto:${site.email}?subject=${encodeURIComponent(
    'Message for TrendsWheel Editorial Team'
  )}`;

  return (
    <>
      <JsonLd
        data={{
          ...ld,
          contactPoint: {
            '@type': 'ContactPoint',
            contactType: 'Customer Support',
            email: site.email,
            telephone: site.phone,
            availableLanguage: ['English', 'Hindi'],
          },
        }}
      />

      <div className="container-page py-6">
        {/* Breadcrumbs */}
        <Breadcrumbs
          items={[{ name: 'Home', href: '/' }, { name: 'Contact Us' }]}
        />

        {/* Editorial Contact Header Banner */}
        <header className="mt-4 rounded-2xl border border-indigo-100 bg-gradient-to-r from-[#eef2ff] via-[#f5f3ff] to-[#eef6ff] p-6 sm:p-8 lg:px-10 lg:py-9 shadow-2xs">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="max-w-2xl">
              <div className="flex items-center gap-2">
                <span className="flex size-5 items-center justify-center rounded-md bg-brand/10 text-[11px] font-bold text-brand-strong">
                  📬
                </span>
                <span className="text-xs font-bold uppercase tracking-widest text-brand-strong">
                  Editorial Desk &amp; Reader Support
                </span>
              </div>

              <h1 className="font-display mt-2 text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-ink">
                Contact TrendsWheel
              </h1>

              <p className="mt-2 text-xs sm:text-sm text-ink-2 leading-relaxed">
                Have a technical question about our guides, spotted an OS menu discrepancy in a tutorial, or want to pitch hardware for testing? Reach our editorial team directly.
              </p>

              {/* Trust Metadata Pills */}
              <div className="mt-5 flex flex-wrap items-center gap-2.5 text-xs font-semibold">
                <span className="inline-flex items-center gap-1.5 rounded-lg bg-white/90 border border-line/70 px-3 py-1.5 text-ink shadow-2xs">
                  <span className="size-2 rounded-full bg-emerald-500 animate-pulse" aria-hidden="true" />
                  <span>Direct Editorial Email: {site.email}</span>
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-lg bg-white/90 border border-line/70 px-3 py-1.5 text-ink shadow-2xs">
                  <span aria-hidden="true">⚡</span>
                  <span>Response Time: &lt; 24–48 Hours</span>
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-lg bg-white/90 border border-line/70 px-3 py-1.5 text-ink shadow-2xs">
                  <span aria-hidden="true">📍</span>
                  <span>{site.address}</span>
                </span>
              </div>
            </div>

            {/* Decorative Vector Mail Graphic */}
            <div className="hidden md:flex size-24 shrink-0 items-center justify-center rounded-2xl bg-white/80 border border-indigo-200/60 shadow-sm text-brand-strong text-4xl" aria-hidden="true">
              ✉️
            </div>
          </div>
        </header>

        {/* 3 Dedicated Department Email Cards */}
        <section className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" aria-label="Department Contact Options">
          <div className="rounded-2xl border border-line/80 bg-white p-5 shadow-2xs transition hover:border-brand/40 flex flex-col justify-between">
            <div>
              <span className="flex size-10 items-center justify-center rounded-xl bg-brand/10 text-brand-strong text-lg">
                ✍️
              </span>
              <h2 className="font-display mt-3 text-base font-bold text-ink">
                Editorial Pitches &amp; Reviews
              </h2>
              <p className="mt-1 text-xs text-ink-2 leading-relaxed">
                Software developer pitches, hardware testbench review units, and technical op-eds.
              </p>
            </div>
            <a
              href={`mailto:${site.email}?subject=${encodeURIComponent('Editorial Pitch / Review Unit')}`}
              className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-brand-strong hover:underline"
            >
              <span>Email Editorial Team</span>
              <span aria-hidden="true">→</span>
            </a>
          </div>

          <div className="rounded-2xl border border-line/80 bg-white p-5 shadow-2xs transition hover:border-brand/40 flex flex-col justify-between">
            <div>
              <span className="flex size-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 text-lg">
                🛠️
              </span>
              <h2 className="font-display mt-3 text-base font-bold text-ink">
                Corrections &amp; Bug Reports
              </h2>
              <p className="mt-1 text-xs text-ink-2 leading-relaxed">
                Found a changed Android menu path, obsolete firmware step, or outdated link? Tell us.
              </p>
            </div>
            <a
              href={`mailto:${site.email}?subject=${encodeURIComponent('Guide Correction / Menu Discrepancy Report')}`}
              className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:underline"
            >
              <span>Submit a Correction</span>
              <span aria-hidden="true">→</span>
            </a>
          </div>

          <div className="rounded-2xl border border-line/80 bg-white p-5 shadow-2xs transition hover:border-brand/40 flex flex-col justify-between">
            <div>
              <span className="flex size-10 items-center justify-center rounded-xl bg-sky-100 text-sky-700 text-lg">
                📢
              </span>
              <h2 className="font-display mt-3 text-base font-bold text-ink">
                Advertising &amp; Partnerships
              </h2>
              <p className="mt-1 text-xs text-ink-2 leading-relaxed">
                Explore direct programmatic advertising, sponsored dispatches, and technical partnerships.
              </p>
            </div>
            <a
              href={`mailto:${site.email}?subject=${encodeURIComponent('Advertising & Partnership Inquiry')}`}
              className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-sky-700 hover:underline"
            >
              <span>Partner With Us</span>
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </section>

        {/* 2-Column Main Contact Guide & Sidebar Layout */}
        <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_340px] xl:grid-cols-[minmax(0,1fr)_350px]">
          {/* Left Column: Direct Email Action Card + Formatting Guide + Map */}
          <main className="space-y-6">
            {/* Primary Direct Email Dispatch Card */}
            <div className="rounded-2xl border border-line/80 bg-white p-6 sm:p-8 lg:p-9 shadow-2xs">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-line/60 pb-5">
                <div>
                  <h2 className="font-display text-xl sm:text-2xl font-bold text-ink">
                    Email Our Editorial Desk
                  </h2>
                  <p className="mt-1 text-xs sm:text-sm text-ink-2">
                    Direct emails go straight to our lead editors and technical contributors.
                  </p>
                </div>

                <a
                  href={mainMailto}
                  className="inline-flex min-h-11 items-center justify-center rounded-xl bg-brand px-6 py-2.5 font-display text-sm font-bold text-white shadow-xs hover:bg-brand-strong transition shrink-0"
                >
                  <span className="mr-2">✉️</span>
                  <span>Open in Mail App</span>
                </a>
              </div>

              {/* Direct Address Badge */}
              <div className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-xl bg-surface-2/70 border border-line/70 p-4">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-muted block">
                    Direct Email Address
                  </span>
                  <a
                    href={`mailto:${site.email}`}
                    className="font-display text-base sm:text-lg font-bold text-ink hover:text-brand-strong transition"
                  >
                    {site.email}
                  </a>
                </div>

                <a
                  href={`mailto:${site.email}`}
                  className="inline-flex items-center gap-1 text-xs font-bold text-brand-strong hover:underline"
                >
                  <span>Compose Email</span>
                  <span aria-hidden="true">→</span>
                </a>
              </div>

              {/* Helpful Tips to get a faster response */}
              <div className="mt-7">
                <h3 className="font-display text-sm font-bold text-ink uppercase tracking-wider text-muted">
                  How to get a faster response:
                </h3>
                <ul className="mt-3.5 space-y-3 text-xs sm:text-sm text-ink-2">
                  <li className="flex items-start gap-3 rounded-xl bg-white border border-line/60 p-3.5">
                    <span className="text-base" aria-hidden="true">📱</span>
                    <div>
                      <strong className="text-ink block font-bold">For How-To Troubleshooting:</strong>
                      <span>Mention your device make, model, and OS version (e.g. <em>Samsung Galaxy S24 running One UI 6.1 / Android 14</em>) and which specific step failed.</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3 rounded-xl bg-white border border-line/60 p-3.5">
                    <span className="text-base" aria-hidden="true">🛠️</span>
                    <div>
                      <strong className="text-ink block font-bold">For Corrections &amp; Updates:</strong>
                      <span>Include the URL of the article and the updated menu text or setting path so our lab can verify on our test devices.</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3 rounded-xl bg-white border border-line/60 p-3.5">
                    <span className="text-base" aria-hidden="true">📦</span>
                    <div>
                      <strong className="text-ink block font-bold">For Hardware Review Units:</strong>
                      <span>Include product specifications, availability in the Indian/global market, and whether early test software is provided.</span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            {/* Interactive Location Map Card */}
            <div className="overflow-hidden rounded-2xl border border-line/80 bg-white p-5 sm:p-6 shadow-2xs">
              <div className="flex items-center justify-between border-b border-line/60 pb-3 mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-base" aria-hidden="true">
                    📍
                  </span>
                  <h2 className="font-display text-sm font-bold text-ink">
                    TrendsWheel Editorial Headquarters
                  </h2>
                </div>
                <span className="text-xs text-muted">{site.address}</span>
              </div>

              <div className="overflow-hidden rounded-xl border border-line/80 aspect-[16/9] w-full bg-surface-2">
                <iframe
                  title="TrendsWheel Headquarters Location Map"
                  className="size-full border-0"
                  src={`https://www.google.com/maps?q=${encodeURIComponent(site.address)}&output=embed`}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
            </div>
          </main>

          {/* Right Sidebar: Contact Info, Social Links, Sticky Ad */}
          <aside className="space-y-6 h-full" aria-label="Contact Sidebar">
            {/* Direct Contact Card */}
            <section className="rounded-2xl border border-line/80 bg-white p-5 sm:p-6 shadow-2xs">
              <div className="flex items-center gap-2 border-b border-line/60 pb-3">
                <span className="flex size-6 items-center justify-center rounded-md bg-brand/10 text-brand-strong text-xs font-bold" aria-hidden="true">
                  ☎️
                </span>
                <h2 className="font-display text-sm font-bold text-ink">
                  Direct Contact Info
                </h2>
              </div>

              <ul className="mt-4 space-y-3.5 text-xs">
                <li>
                  <span className="block text-muted font-medium mb-0.5">Primary Email</span>
                  <a
                    href={`mailto:${site.email}`}
                    className="font-bold text-ink hover:text-brand-strong transition break-all"
                  >
                    {site.email}
                  </a>
                </li>
                {site.phone && (
                  <li>
                    <span className="block text-muted font-medium mb-0.5">Direct Helpline / WhatsApp</span>
                    <a
                      href={`https://wa.me/${site.phone.replace(/[^0-9]/g, '')}`}
                      target="_blank"
                      rel="noopener nofollow"
                      className="font-bold text-emerald-700 hover:underline inline-flex items-center gap-1"
                    >
                      <span>{site.phone}</span>
                      <span aria-hidden="true">↗</span>
                    </a>
                  </li>
                )}
                <li>
                  <span className="block text-muted font-medium mb-0.5">Physical Headquarters</span>
                  <span className="font-semibold text-ink leading-relaxed">
                    {site.address}
                  </span>
                </li>
                <li>
                  <span className="block text-muted font-medium mb-0.5">Editorial Operating Hours</span>
                  <span className="font-semibold text-ink">
                    Monday – Friday: 9:30 AM – 6:30 PM IST
                  </span>
                </li>
              </ul>
            </section>

            {/* Follow TrendsWheel Social Card */}
            <section className="rounded-2xl border border-line/80 bg-white p-5 sm:p-6 shadow-2xs">
              <div className="flex items-center gap-2 border-b border-line/60 pb-3">
                <span className="text-brand-strong" aria-hidden="true">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 6v6l4 2" />
                  </svg>
                </span>
                <h2 className="font-display text-sm font-bold text-ink">
                  Follow TrendsWheel
                </h2>
              </div>
              <p className="mt-2 text-xs leading-relaxed text-ink-2">
                Connect with our editorial leads and get real-time tech dispatches across platforms.
              </p>

              <ul className="mt-4 flex flex-wrap gap-2">
                {Object.entries(site.social).map(([name, url]) => (
                  <li key={name}>
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener nofollow"
                      aria-label={name}
                      title={name}
                      className="flex size-9 items-center justify-center rounded-xl border border-line/80 bg-surface-2 text-ink-2 transition hover:border-brand hover:bg-brand hover:text-white"
                    >
                      {socialIcons[name] ?? (
                        <span className="text-[10px] font-bold uppercase">{name.slice(0, 2)}</span>
                      )}
                    </a>
                  </li>
                ))}
                <li>
                  <Link
                    href="/feed.xml"
                    aria-label="RSS Feed"
                    title="RSS Feed"
                    className="flex size-9 items-center justify-center rounded-xl border border-line/80 bg-surface-2 text-brand-strong transition hover:border-brand hover:bg-brand hover:text-white"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M4 11a9 9 0 0 1 9 9" />
                      <path d="M4 4a16 16 0 0 1 16 16" />
                      <circle cx="5" cy="19" r="1" />
                    </svg>
                  </Link>
                </li>
              </ul>
            </section>

            {/* Sticky High-RPM Sidebar Display Unit */}
            <div className="sticky top-28 z-10">
              <AdUnit kind="display" className="!my-0 shadow-xs" />
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
