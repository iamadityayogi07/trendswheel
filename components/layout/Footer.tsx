import Link from 'next/link';
import { footerLinks } from '@/config/nav';
import { getCategories, getSite } from '@/lib/content';
import { archiveUrl, categoryUrl } from '@/lib/url';
import Logo from './Logo';

export default function Footer() {
  const site = getSite();
  const categories = getCategories();
  const col = 'mb-3 text-sm font-bold uppercase tracking-wide text-ink';
  const li = 'inline-flex min-h-9 items-center text-ink-2 no-underline hover:text-brand-strong hover:underline';
  return (
    <footer className="mt-16 border-t border-line bg-surface">
      <div className="container-page grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo />
          <p className="mt-4 text-ink-2">The TrendsWheel team — turning complex tech into simple, insightful stories.</p>
          {Object.keys(site.social).length > 0 && (
            <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-1">
              {Object.entries(site.social).map(([name, url]) => (
                <li key={name}>
                  <a href={url} target="_blank" rel="noopener nofollow" className={`${li} capitalize`}>
                    {name}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
        <nav aria-label="Categories">
          <h2 className={col}>Categories</h2>
          <ul>
            {categories.map((c) => (
              <li key={c.slug}>
                <Link href={categoryUrl(c.slug)} className={li}>
                  {c.name}
                </Link>
              </li>
            ))}
            <li>
              <Link href={archiveUrl()} className={li}>
                All articles
              </Link>
            </li>
          </ul>
        </nav>
        <nav aria-label="Quick links">
          <h2 className={col}>Quick Links</h2>
          <ul>
            {footerLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className={li}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <h2 className={col}>Get In Touch</h2>
          <ul className="space-y-2 text-ink-2">
            <li>{site.address}</li>
            <li>
              <a href={`mailto:${site.email}`} className={li}>
                {site.email}
              </a>
            </li>
            {site.phone && (
              <li>
                <a href={`tel:${site.phone}`} className={li}>
                  {site.phone}
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>
      <div className="border-t border-line py-5 text-center text-sm text-muted">
        <p>
          {new Date().getFullYear()} © all right reserved by{' '}
          <Link href="/" className="font-semibold text-ink no-underline hover:underline">
            Trendswheel
          </Link>
        </p>
      </div>
    </footer>
  );
}
