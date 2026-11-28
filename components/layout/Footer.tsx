import Link from 'next/link';
import { footerLinks } from '@/config/nav';
import { getCategories, getSite } from '@/lib/content';
import { archiveUrl, categoryUrl, staticPageUrl } from '@/lib/url';
import Logo from './Logo';

const ico = {
  width: 18,
  height: 18,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
} as const;

const socialIcons: Record<string, React.ReactNode> = {
  linkedin: (
    <svg {...ico}>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6Z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  ),
  instagram: (
    <svg {...ico}>
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" />
    </svg>
  ),
  x: (
    <svg {...ico}>
      <path d="M4 4l16 16M20 4 4 20" />
    </svg>
  ),
  youtube: (
    <svg {...ico}>
      <path d="M22 8.5a3 3 0 0 0-2.1-2.1C18 6 12 6 12 6s-6 0-7.9.4A3 3 0 0 0 2 8.5 31 31 0 0 0 1.6 12 31 31 0 0 0 2 15.5a3 3 0 0 0 2.1 2.1C6 18 12 18 12 18s6 0 7.9-.4a3 3 0 0 0 2.1-2.1c.4-1.2.4-3.5.4-3.5s0-2.3-.4-3.5Z" />
      <path d="m10 15 5-3-5-3v6Z" />
    </svg>
  ),
  pinterest: (
    <svg {...ico}>
      <circle cx="12" cy="12" r="10" />
      <path d="M10.5 21l1.8-7.4M9 11.5c0-2 1.6-3.5 3.5-3.5s3 1.3 3 3c0 2.3-1.3 4-3 4-.8 0-1.4-.4-1.7-1" />
    </svg>
  ),
};

const categoryDots: Record<string, string> = {
  'how-to': 'bg-brand',
  apps: 'bg-indigo-500',
  tech: 'bg-emerald-500',
  social: 'bg-pink-500',
};

export default function Footer() {
  const site = getSite();
  const categories = getCategories();

  return (
    <footer className="mt-24 border-t border-line/80 bg-surface-2 text-ink">
      {/* Top Editorial Accent Bar */}
      <div
        className="h-1 bg-gradient-to-r from-brand via-orange-400 to-amber-300"
        aria-hidden="true"
      />

      {/* Authority & Fast Navigation Strip */}
      <div className="border-b border-line/70 bg-white/60 py-5">
        <div className="container-page flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="flex size-7 items-center justify-center rounded-lg bg-brand font-display text-xs font-black text-white shadow-xs">
              TW
            </span>
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="font-bold text-ink">
                TrendsWheel Research &amp; Diagnostics Lab
              </span>
              <span className="text-muted hidden sm:inline" aria-hidden="true">
                •
              </span>
              <span className="text-ink-2 hidden sm:inline">
                Independent Systems Journalism
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 text-xs font-semibold">
            <Link
              href="/feed.xml"
              className="inline-flex items-center gap-1.5 rounded-lg border border-line bg-white px-3 py-1.5 text-ink-2 shadow-2xs transition hover:border-brand/40 hover:text-brand-strong"
            >
              <svg
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M4 11a9 9 0 0 1 9 9" />
                <path d="M4 4a16 16 0 0 1 16 16" />
                <circle cx="5" cy="19" r="1" />
              </svg>
              <span>RSS Feed</span>
            </Link>

            <Link
              href="/archive"
              className="inline-flex items-center gap-1.5 rounded-lg border border-line bg-white px-3 py-1.5 text-ink-2 shadow-2xs transition hover:border-brand/40 hover:text-brand-strong"
            >
              <span>All 248 Guides →</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Footer Columns */}
      <div className="container-page grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-12">
        {/* Column 1: Brand & Mission (5 cols) */}
        <div className="lg:col-span-5">
          <Logo />
          <p className="mt-4 max-w-md text-xs sm:text-sm text-ink-2 leading-relaxed">
            TrendsWheel is an independent digital publication producing peer-verified technical tutorials, Android system diagnostics, mobile software audits, and digital privacy architecture analyses.
          </p>

          {/* Trust Badges */}
          <div className="mt-5 flex flex-wrap gap-2 text-xs">
            <span className="inline-flex items-center gap-1.5 rounded-md bg-white border border-line/80 px-2.5 py-1 font-semibold text-ink shadow-2xs">
              <span className="size-2 rounded-full bg-emerald-500" aria-hidden="true" />
              <span>248 Verified Guides</span>
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-md bg-white border border-line/80 px-2.5 py-1 font-semibold text-ink shadow-2xs">
              <span className="text-brand-strong font-bold" aria-hidden="true">✓</span>
              <span>100% Hardware Tested</span>
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-md bg-white border border-line/80 px-2.5 py-1 font-semibold text-ink shadow-2xs">
              <span className="text-amber-500 font-bold" aria-hidden="true">★</span>
              <span>Zero Paywalls</span>
            </span>
          </div>

          {/* Social Channels */}
          {Object.keys(site.social).length > 0 && (
            <div className="mt-6">
              <span className="text-[11px] font-bold uppercase tracking-wider text-muted">
                Follow our investigations
              </span>
              <ul className="mt-2.5 flex flex-wrap gap-2">
                {Object.entries(site.social).map(([name, url]) => (
                  <li key={name}>
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener nofollow"
                      aria-label={name}
                      title={name}
                      className="flex size-9 items-center justify-center rounded-lg border border-line/80 bg-white text-ink-2 shadow-2xs transition-all duration-200 hover:-translate-y-0.5 hover:border-brand hover:bg-brand hover:text-white"
                    >
                      {socialIcons[name] ?? (
                        <span className="text-xs font-bold uppercase">
                          {name.slice(0, 2)}
                        </span>
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Column 2: Editorial Sections (2 cols) */}
        <nav aria-label="Editorial Categories" className="lg:col-span-2">
          <h2 className="font-display text-xs font-bold uppercase tracking-widest text-ink mb-4 flex items-center gap-2">
            <span>Categories</span>
            <span className="h-px flex-1 bg-line/80" aria-hidden="true" />
          </h2>
          <ul className="space-y-2.5 text-xs sm:text-sm">
            {categories.map((c) => {
              const dotColor = categoryDots[c.slug] || 'bg-brand';
              return (
                <li key={c.slug}>
                  <Link
                    href={categoryUrl(c.slug)}
                    className="group inline-flex items-center gap-2 text-ink-2 no-underline transition hover:text-brand-strong"
                  >
                    <span
                      className={`size-1.5 rounded-full ${dotColor} transition-transform group-hover:scale-125`}
                      aria-hidden="true"
                    />
                    <span>{c.name}</span>
                  </Link>
                </li>
              );
            })}
            <li className="pt-1.5">
              <Link
                href={archiveUrl()}
                className="font-bold text-xs uppercase tracking-wider text-brand-strong hover:underline inline-flex items-center gap-1"
              >
                <span>Full Archive</span>
                <span aria-hidden="true">→</span>
              </Link>
            </li>
          </ul>
        </nav>

        {/* Column 3: Resources & Governance (2 cols) */}
        <nav aria-label="Quick links" className="lg:col-span-2">
          <h2 className="font-display text-xs font-bold uppercase tracking-widest text-ink mb-4 flex items-center gap-2">
            <span>Governance</span>
            <span className="h-px flex-1 bg-line/80" aria-hidden="true" />
          </h2>
          <ul className="space-y-2.5 text-xs sm:text-sm">
            {footerLinks.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="inline-flex items-center gap-2 text-ink-2 no-underline transition hover:text-brand-strong"
                >
                  <span className="size-1 rounded-full bg-muted/40" aria-hidden="true" />
                  <span>{l.label}</span>
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/feed.xml"
                className="inline-flex items-center gap-2 text-ink-2 no-underline transition hover:text-brand-strong"
              >
                <span className="size-1 rounded-full bg-muted/40" aria-hidden="true" />
                <span>XML RSS Feed</span>
              </Link>
            </li>
            <li>
              <Link
                href="/sitemap.xml"
                className="inline-flex items-center gap-2 text-ink-2 no-underline transition hover:text-brand-strong"
              >
                <span className="size-1 rounded-full bg-muted/40" aria-hidden="true" />
                <span>Sitemap Index</span>
              </Link>
            </li>
          </ul>
        </nav>

        {/* Column 4: Editorial Desk & Inquiries (3 cols) */}
        <div className="lg:col-span-3">
          <h2 className="font-display text-xs font-bold uppercase tracking-widest text-ink mb-4 flex items-center gap-2">
            <span>Editorial Desk</span>
            <span className="h-px flex-1 bg-line/80" aria-hidden="true" />
          </h2>

          <div className="rounded-xl border border-line/80 bg-white p-4 shadow-2xs space-y-3 text-xs">
            <div className="flex items-start gap-2.5 text-ink-2">
              <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-md bg-brand-soft text-brand-strong">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0Z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </span>
              <span className="pt-0.5 leading-relaxed">{site.address}</span>
            </div>

            <div className="flex items-start gap-2.5 text-ink-2">
              <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-md bg-brand-soft text-brand-strong">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="2" y="4" width="20" height="16" rx="3" />
                  <path d="m2 7 10 7 10-7" />
                </svg>
              </span>
              <a
                href={`mailto:${site.email}`}
                className="pt-0.5 break-all font-semibold text-brand-strong hover:underline"
              >
                {site.email}
              </a>
            </div>

            <div className="pt-2 border-t border-line/60">
              <p className="text-[11px] text-muted leading-relaxed">
                Spotted a moved setting or outdated step?
              </p>
              <Link
                href={staticPageUrl('contact-us')}
                className="mt-1.5 inline-flex items-center gap-1 font-bold text-brand-strong hover:underline"
              >
                <span>Submit a Lab Correction</span>
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Sub-Footer Bar */}
      <div className="border-t border-line/80 bg-white py-5">
        <div className="container-page flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted">
          <p>
            © {new Date().getFullYear()} TrendsWheel. All rights reserved. Published under independent editorial standards.
          </p>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <Link
              href={staticPageUrl('privacy-policy')}
              className="hover:text-brand-strong hover:underline"
            >
              Privacy Policy
            </Link>
            <span aria-hidden="true">•</span>
            <Link
              href={staticPageUrl('terms-conditions')}
              className="hover:text-brand-strong hover:underline"
            >
              Terms &amp; Conditions
            </Link>
            <span aria-hidden="true">•</span>
            <Link
              href={staticPageUrl('contact-us')}
              className="hover:text-brand-strong hover:underline"
            >
              Contact Desk
            </Link>
            <span aria-hidden="true">•</span>
            <a
              href="#top"
              className="font-bold text-ink hover:text-brand-strong inline-flex items-center gap-1"
            >
              <span>Back to Top</span>
              <span aria-hidden="true">↑</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
