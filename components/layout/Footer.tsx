import Link from 'next/link';
import { footerLinks } from '@/config/nav';
import { getCategories, getSite } from '@/lib/content';
import { archiveUrl, categoryUrl, homeUrl, staticPageUrl } from '@/lib/url';

const ico = {
  width: 17,
  height: 17,
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
  'how-to': 'bg-brand shadow-[0_0_8px_rgba(230,74,25,0.6)]',
  apps: 'bg-indigo-400 shadow-[0_0_8px_rgba(129,140,248,0.6)]',
  tech: 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)]',
  social: 'bg-pink-400 shadow-[0_0_8px_rgba(244,114,182,0.6)]',
};

export default function Footer() {
  const site = getSite();
  const categories = getCategories();

  return (
    <footer className="mt-28 border-t border-white/10 bg-[#090d16] text-slate-200 selection:bg-brand selection:text-white relative overflow-hidden">
      {/* Subtle Ambient Radial Glow */}
      <div
        className="pointer-events-none absolute -top-40 right-1/4 size-96 rounded-full bg-brand/10 blur-[120px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-0 left-0 size-80 rounded-full bg-cyan-500/5 blur-[100px]"
        aria-hidden="true"
      />

      {/* Top Radiant Gradient Line */}
      <div
        className="h-[2px] bg-gradient-to-r from-brand via-orange-500 to-amber-400"
        aria-hidden="true"
      />

      {/* Authority Masthead Strip */}
      <div className="border-b border-white/10 bg-white/[0.02] py-6">
        <div className="container-page flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
          <div className="flex items-center gap-3.5">
            <span className="flex size-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand to-brand-strong font-display text-xs font-black text-white shadow-md shadow-brand/20">
              TW
            </span>
            <div>
              <p className="font-display text-sm font-bold tracking-wide text-white">
                TrendsWheel Systems &amp; Forensics Lab
              </p>
              <p className="text-xs text-slate-400">
                Independent Hardware Diagnostics, OS Internals &amp; Deep Technical Journalism
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-xs font-medium">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/5 border border-white/10 px-3.5 py-1.5 text-slate-300">
              <span className="size-2 rounded-full bg-emerald-400 animate-pulse" aria-hidden="true" />
              <span className="font-semibold text-white">248 Lab Guides</span>
              <span className="text-slate-500">•</span>
              <span>Live Library</span>
            </span>

            <Link
              href="/feed.xml"
              className="inline-flex items-center gap-1.5 rounded-full bg-white/5 border border-white/10 px-3.5 py-1.5 text-slate-300 transition hover:bg-white/10 hover:border-brand/50 hover:text-white"
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
              className="inline-flex items-center gap-1.5 rounded-full bg-brand px-4 py-1.5 font-bold text-white shadow-sm shadow-brand/25 transition hover:bg-brand-strong"
            >
              <span>Explore Archive →</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main 4-Column Editorial Body */}
      <div className="container-page grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-12">
        {/* Column 1: Brand & Mission (5 cols) */}
        <div className="lg:col-span-5">
          <Link href={homeUrl()} className="inline-block" aria-label="TrendsWheel Home">
            <img
              src="/settings/trendswheel-logo-dark-d38b5d.png"
              alt="TrendsWheel"
              width={180}
              height={52}
              className="h-11 w-auto object-contain"
              loading="lazy"
            />
          </Link>

          <p className="mt-5 max-w-md text-xs sm:text-sm text-slate-400 leading-relaxed">
            TrendsWheel is an independent digital publication producing peer-verified technical tutorials, Android system diagnostics, mobile software audits, and digital privacy architecture analyses. Every workflow is reproduced on physical hardware prior to publication.
          </p>

          {/* Dark Glass Trust Badges */}
          <div className="mt-6 flex flex-wrap gap-2 text-xs">
            <span className="inline-flex items-center gap-1.5 rounded-lg bg-white/5 border border-white/10 px-3 py-1 font-medium text-slate-300">
              <span className="text-emerald-400 font-bold" aria-hidden="true">✓</span>
              <span>100% Hardware Tested</span>
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-lg bg-white/5 border border-white/10 px-3 py-1 font-medium text-slate-300">
              <span className="text-cyan-400 font-bold" aria-hidden="true">●</span>
              <span>Named Human Authors</span>
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-lg bg-white/5 border border-white/10 px-3 py-1 font-medium text-slate-300">
              <span className="text-amber-400 font-bold" aria-hidden="true">★</span>
              <span>Zero Paywalls</span>
            </span>
          </div>

          {/* Social Channels */}
          {Object.keys(site.social).length > 0 && (
            <div className="mt-7">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Follow our investigations
              </span>
              <ul className="mt-2.5 flex flex-wrap gap-2.5">
                {Object.entries(site.social).map(([name, url]) => (
                  <li key={name}>
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener nofollow"
                      aria-label={name}
                      title={name}
                      className="flex size-9.5 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-slate-300 transition-all duration-200 hover:-translate-y-0.5 hover:border-brand hover:bg-brand hover:text-white shadow-xs"
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
          <h2 className="font-display text-xs font-bold uppercase tracking-widest text-white mb-5 flex items-center gap-2">
            <span>Editorial Hubs</span>
            <span className="h-px flex-1 bg-white/10" aria-hidden="true" />
          </h2>
          <ul className="space-y-3 text-xs sm:text-sm">
            {categories.map((c) => {
              const dotClass = categoryDots[c.slug] || 'bg-brand';
              return (
                <li key={c.slug}>
                  <Link
                    href={categoryUrl(c.slug)}
                    className="group inline-flex items-center gap-2.5 text-slate-400 no-underline transition hover:translate-x-1 hover:text-white"
                  >
                    <span
                      className={`size-2 rounded-full ${dotClass} transition-transform group-hover:scale-125`}
                      aria-hidden="true"
                    />
                    <span>{c.name}</span>
                  </Link>
                </li>
              );
            })}
            <li className="pt-2">
              <Link
                href={archiveUrl()}
                className="font-bold text-xs uppercase tracking-wider text-brand hover:text-orange-400 transition inline-flex items-center gap-1.5"
              >
                <span>Full Archive</span>
                <span aria-hidden="true">→</span>
              </Link>
            </li>
          </ul>
        </nav>

        {/* Column 3: Governance & Feeds (2 cols) */}
        <nav aria-label="Quick links" className="lg:col-span-2">
          <h2 className="font-display text-xs font-bold uppercase tracking-widest text-white mb-5 flex items-center gap-2">
            <span>Governance</span>
            <span className="h-px flex-1 bg-white/10" aria-hidden="true" />
          </h2>
          <ul className="space-y-3 text-xs sm:text-sm">
            {footerLinks.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="inline-flex items-center gap-2 text-slate-400 no-underline transition hover:translate-x-1 hover:text-white"
                >
                  <span className="size-1 rounded-full bg-slate-600" aria-hidden="true" />
                  <span>{l.label}</span>
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/feed.xml"
                className="inline-flex items-center gap-2 text-slate-400 no-underline transition hover:translate-x-1 hover:text-white"
              >
                <span className="size-1 rounded-full bg-slate-600" aria-hidden="true" />
                <span>XML RSS Feed</span>
              </Link>
            </li>
            <li>
              <Link
                href="/sitemap.xml"
                className="inline-flex items-center gap-2 text-slate-400 no-underline transition hover:translate-x-1 hover:text-white"
              >
                <span className="size-1 rounded-full bg-slate-600" aria-hidden="true" />
                <span>Sitemap Index</span>
              </Link>
            </li>
          </ul>
        </nav>

        {/* Column 4: Editorial Desk Card (3 cols) */}
        <div className="lg:col-span-3">
          <h2 className="font-display text-xs font-bold uppercase tracking-widest text-white mb-5 flex items-center gap-2">
            <span>Editorial Lab Desk</span>
            <span className="h-px flex-1 bg-white/10" aria-hidden="true" />
          </h2>

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 shadow-xl backdrop-blur-xs space-y-4 text-xs">
            <div className="flex items-start gap-3 text-slate-300">
              <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-lg bg-white/5 border border-white/10 text-brand">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0Z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </span>
              <div>
                <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">Lab Headquarters</span>
                <span className="text-slate-200">{site.address}</span>
              </div>
            </div>

            <div className="flex items-start gap-3 text-slate-300">
              <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-lg bg-white/5 border border-white/10 text-brand">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="2" y="4" width="20" height="16" rx="3" />
                  <path d="m2 7 10 7 10-7" />
                </svg>
              </span>
              <div>
                <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">Direct Inquiries</span>
                <a
                  href={`mailto:${site.email}`}
                  className="font-semibold text-brand hover:text-orange-400 transition break-all"
                >
                  {site.email}
                </a>
              </div>
            </div>

            <div className="pt-3 border-t border-white/10">
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Spotted an updated app setting or OS beta discrepancy?
              </p>
              <Link
                href={staticPageUrl('contact-us')}
                className="mt-2.5 inline-flex w-full items-center justify-center gap-1.5 rounded-lg bg-brand/15 border border-brand/30 py-2 px-3 font-display text-xs font-bold text-orange-300 transition hover:bg-brand hover:text-white"
              >
                <span>Submit a Lab Correction</span>
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Sub-Footer Legal Bar */}
      <div className="border-t border-white/10 bg-[#05070c] py-6">
        <div className="container-page flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>
            © {new Date().getFullYear()} TrendsWheel. All rights reserved. Published under independent editorial standards.
          </p>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <Link
              href={staticPageUrl('privacy-policy')}
              className="hover:text-white transition"
            >
              Privacy Policy
            </Link>
            <span aria-hidden="true" className="text-slate-600">•</span>
            <Link
              href={staticPageUrl('terms-conditions')}
              className="hover:text-white transition"
            >
              Terms &amp; Conditions
            </Link>
            <span aria-hidden="true" className="text-slate-600">•</span>
            <Link
              href={staticPageUrl('contact-us')}
              className="hover:text-white transition"
            >
              Contact Desk
            </Link>
            <span aria-hidden="true" className="text-slate-600">•</span>
            <a
              href="#top"
              className="font-bold text-brand hover:text-orange-400 transition inline-flex items-center gap-1"
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
