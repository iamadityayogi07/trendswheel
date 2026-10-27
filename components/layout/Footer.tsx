import Link from 'next/link';
import { footerLinks } from '@/config/nav';
import { getCategories, getSite } from '@/lib/content';
import { archiveUrl, categoryUrl } from '@/lib/url';
import Logo from './Logo';

const ico = { width: 18, height: 18, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true } as const;

const social: Record<string, React.ReactNode> = {
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

const pin = (
  <svg {...ico}>
    <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);
const mail = (
  <svg {...ico}>
    <rect x="2" y="4" width="20" height="16" rx="3" />
    <path d="m2 7 10 7 10-7" />
  </svg>
);
const phone = (
  <svg {...ico}>
    <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z" />
  </svg>
);

const heading = 'font-display mb-5 text-lg font-bold text-ink after:mt-2 after:block after:h-0.5 after:w-8 after:rounded-full after:bg-brand after:content-[""]';
const link = 'group inline-flex min-h-10 items-center gap-2 text-ink-2 no-underline transition hover:translate-x-0.5 hover:text-brand-strong';
const dot = <span className="size-1.5 rounded-full bg-brand/40 transition group-hover:bg-brand" aria-hidden="true" />;

export default function Footer() {
  const site = getSite();
  const categories = getCategories();
  return (
    <footer className="mt-20 bg-surface-2">
      <div className="h-1 bg-gradient-to-r from-brand via-orange-400 to-amber-300" aria-hidden="true" />
      <div className="container-page grid gap-12 py-14 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.3fr]">
        <div>
          <Logo />
          <p className="mt-5 max-w-xs text-ink-2">The TrendsWheel team — turning complex tech into simple, insightful stories.</p>
          {Object.keys(site.social).length > 0 && (
            <ul className="mt-6 flex flex-wrap gap-2.5">
              {Object.entries(site.social).map(([name, url]) => (
                <li key={name}>
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener nofollow"
                    aria-label={name}
                    title={name}
                    className="flex size-11 items-center justify-center rounded-full border border-line bg-white text-ink-2 transition hover:-translate-y-0.5 hover:border-brand hover:bg-brand hover:text-white"
                  >
                    {social[name] ?? <span className="text-xs font-bold uppercase">{name.slice(0, 2)}</span>}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>

        <nav aria-label="Categories">
          <h2 className={heading}>Categories</h2>
          <ul>
            {categories.map((c) => (
              <li key={c.slug}>
                <Link href={categoryUrl(c.slug)} className={link}>
                  {dot}
                  {c.name}
                </Link>
              </li>
            ))}
            <li>
              <Link href={archiveUrl()} className={link}>
                {dot}
                All articles
              </Link>
            </li>
          </ul>
        </nav>

        <nav aria-label="Quick links">
          <h2 className={heading}>Quick Links</h2>
          <ul>
            {footerLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className={link}>
                  {dot}
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className={heading}>Get In Touch</h2>
          <ul className="space-y-3 text-ink-2">
            <li className="flex items-start gap-3">
              <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-full bg-brand-soft text-brand-strong">{pin}</span>
              <span className="pt-1.5">{site.address}</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-full bg-brand-soft text-brand-strong">{mail}</span>
              <a href={`mailto:${site.email}`} className="break-all pt-1.5 no-underline hover:text-brand-strong hover:underline">
                {site.email}
              </a>
            </li>
            {site.phone && (
              <li className="flex items-start gap-3">
                <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-full bg-brand-soft text-brand-strong">{phone}</span>
                <a href={`tel:${site.phone}`} className="pt-1.5 no-underline hover:text-brand-strong hover:underline">
                  {site.phone}
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>

      <div className="border-t border-line bg-white">
        <div className="container-page flex flex-col items-center justify-between gap-3 py-5 text-sm text-muted sm:flex-row">
          <p>
            {new Date().getFullYear()} © all right reserved by{' '}
            <Link href="/" className="font-semibold text-ink no-underline hover:text-brand-strong hover:underline">
              Trendswheel
            </Link>
          </p>
          <ul className="flex flex-wrap justify-center gap-x-5">
            {footerLinks
              .filter((l) => /privacy|terms/.test(l.href))
              .map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="inline-flex min-h-10 items-center no-underline hover:text-brand-strong hover:underline">
                    {l.label}
                  </Link>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
