import Link from 'next/link';
import { footerLinks } from '@/config/nav';
import { getCategories, getSite } from '@/lib/content';
import { archiveUrl, categoryUrl, homeUrl, staticPageUrl } from '@/lib/url';

const ico = {
  width: 15,
  height: 15,
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

export default function Footer() {
  const site = getSite();
  const categories = getCategories();

  return (
    <footer className="mt-16 border-t border-line/80 bg-white text-ink">
      {/* Signature Thin Editorial Top Line */}
      <div
        className="h-0.5 bg-gradient-to-r from-brand via-orange-400 to-amber-300"
        aria-hidden="true"
      />

      <div className="container-page py-10">
        {/* Main Compact Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-12 lg:items-start">
          {/* Brand & Publication Summary (5 cols) */}
          <div className="lg:col-span-5">
            <Link href={homeUrl()} className="inline-block" aria-label="TrendsWheel Home">
              <img
                src={site.logo || '/settings/trendswheel-logo-3471a0.png'}
                alt="TrendsWheel"
                width={140}
                height={40}
                className="h-9 w-auto object-contain"
                loading="lazy"
              />
            </Link>

            <p className="mt-3 max-w-sm text-xs leading-relaxed text-ink-2">
              Independent systems journalism covering physical hardware diagnostics, mobile operating systems, software audits, and privacy architecture.
            </p>

            <div className="mt-3.5 flex items-center gap-3 text-xs text-muted">
              <span className="inline-flex items-center gap-1.5 font-semibold text-ink">
                <span className="size-1.5 rounded-full bg-emerald-500" aria-hidden="true" />
                248 Verified Guides
              </span>
              <span aria-hidden="true">•</span>
              <span>100% Tested on Hardware</span>
            </div>

            {/* Compact Social Row */}
            {Object.keys(site.social).length > 0 && (
              <ul className="mt-4 flex flex-wrap gap-2">
                {Object.entries(site.social).map(([name, url]) => (
                  <li key={name}>
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener nofollow"
                      aria-label={name}
                      title={name}
                      className="flex size-8 items-center justify-center rounded-md border border-line/80 bg-surface-2 text-ink-2 transition-all hover:border-brand hover:bg-brand hover:text-white"
                    >
                      {socialIcons[name] ?? (
                        <span className="text-[10px] font-bold uppercase">{name.slice(0, 2)}</span>
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Quick Links: Categories (2 cols) */}
          <div className="lg:col-span-2">
            <span className="font-display text-[11px] font-bold uppercase tracking-wider text-ink">
              Categories
            </span>
            <ul className="mt-3 space-y-2 text-xs">
              {categories.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={categoryUrl(c.slug)}
                    className="text-ink-2 transition hover:text-brand-strong"
                  >
                    {c.name}
                  </Link>
                </li>
              ))}
              <li className="pt-1">
                <Link
                  href={archiveUrl()}
                  className="font-semibold text-brand-strong hover:underline"
                >
                  All Guides →
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links: Governance (2 cols) */}
          <div className="lg:col-span-2">
            <span className="font-display text-[11px] font-bold uppercase tracking-wider text-ink">
              Company
            </span>
            <ul className="mt-3 space-y-2 text-xs">
              {footerLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-ink-2 transition hover:text-brand-strong"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/feed.xml"
                  className="text-ink-2 transition hover:text-brand-strong"
                >
                  RSS Feed
                </Link>
              </li>
            </ul>
          </div>

          {/* Compact Editorial Desk (3 cols) */}
          <div className="lg:col-span-3">
            <span className="font-display text-[11px] font-bold uppercase tracking-wider text-ink">
              Editorial Desk
            </span>
            <div className="mt-3 space-y-2 text-xs text-ink-2">
              <p className="flex items-center gap-1.5 text-muted">
                <span>📍</span>
                <span>{site.address}</span>
              </p>
              <p className="flex items-center gap-1.5">
                <span>✉️</span>
                <a
                  href={`mailto:${site.email}`}
                  className="font-medium text-brand-strong hover:underline"
                >
                  {site.email}
                </a>
              </p>
              <div className="pt-2 text-[11px]">
                <span className="text-muted">Need a guide updated? </span>
                <Link
                  href={staticPageUrl('contact-us')}
                  className="font-bold text-brand-strong hover:underline"
                >
                  Submit correction →
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Compact Bottom Bar */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-line/70 pt-5 text-xs text-muted">
          <p>© {new Date().getFullYear()} TrendsWheel. All rights reserved.</p>

          <div className="flex items-center gap-4">
            <Link href={staticPageUrl('privacy-policy')} className="hover:text-ink">
              Privacy
            </Link>
            <span>•</span>
            <Link href={staticPageUrl('terms-conditions')} className="hover:text-ink">
              Terms
            </Link>
            <span>•</span>
            <Link href={staticPageUrl('contact-us')} className="hover:text-ink">
              Contact
            </Link>
            <span>•</span>
            <a
              href="#top"
              className="font-semibold text-brand-strong hover:underline inline-flex items-center gap-0.5"
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
