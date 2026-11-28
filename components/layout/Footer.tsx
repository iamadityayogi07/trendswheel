import Link from 'next/link';
import { getCategories, getSite } from '@/lib/content';
import { archiveUrl, categoryUrl, homeUrl, staticPageUrl } from '@/lib/url';
import FooterNewsletter from './FooterNewsletter';

const socialCardStyle =
  'flex size-8.5 items-center justify-center rounded-lg border border-line/80 bg-white shadow-2xs hover:border-brand hover:shadow-xs hover:scale-105 transition';

export default function Footer() {
  const site = getSite();
  const categories = getCategories();

  const socialLinks = {
    linkedin: site.social?.linkedin || 'https://www.linkedin.com/company/trendswheel/',
    youtube: site.social?.youtube || 'https://www.youtube.com/@trendswheel-blogs',
    x: site.social?.x || 'https://x.com/trendswheelblog',
    instagram: site.social?.instagram || 'https://www.instagram.com/trendswheelblogs',
    rss: '/feed.xml',
  };

  return (
    <footer className="mt-16 border-t-[3px] border-brand bg-white text-ink relative">
      <div className="container-page py-12 lg:py-14">
        {/* 4-Column Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10">
          {/* Column 1: Brand, About & Trust Stats (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <Link href={homeUrl()} className="inline-block" aria-label="TrendsWheel Home">
              <img
                src={site.logo || '/settings/trendswheel-logo-3471a0.png'}
                alt="TrendsWheel"
                width={160}
                height={46}
                className="h-9 sm:h-10 w-auto object-contain"
                loading="lazy"
              />
            </Link>

            <p className="max-w-sm text-xs sm:text-[13px] leading-relaxed text-ink-2">
              Independent technology journalism, practical how-to guides, app tips, and in-depth insights to make your digital life easier.
            </p>

            {/* Trust Badges */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-ink pt-1">
              <span className="flex items-center gap-1.5">
                <span className="flex size-4 items-center justify-center rounded-full bg-emerald-500 text-white text-[9px] font-bold">
                  ✓
                </span>
                <span>248+ Verified Guides</span>
              </span>
              <span className="text-muted/60" aria-hidden="true">|</span>
              <span>1.2M+ Monthly Reads</span>
            </div>

            {/* Social Icons Row */}
            <div className="flex flex-wrap items-center gap-2 pt-2">
              {/* LinkedIn */}
              <a
                href={socialLinks.linkedin}
                target="_blank"
                rel="noopener nofollow"
                aria-label="LinkedIn"
                title="LinkedIn"
                className={socialCardStyle}
              >
                <span className="text-[#0a66c2]" aria-hidden="true">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77Z" />
                  </svg>
                </span>
              </a>

              {/* YouTube */}
              <a
                href={socialLinks.youtube}
                target="_blank"
                rel="noopener nofollow"
                aria-label="YouTube"
                title="YouTube"
                className={socialCardStyle}
              >
                <span className="text-[#ff0000]" aria-hidden="true">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </span>
              </a>

              {/* X (Twitter) */}
              <a
                href={socialLinks.x}
                target="_blank"
                rel="noopener nofollow"
                aria-label="X (Twitter)"
                title="X"
                className={socialCardStyle}
              >
                <span className="text-ink" aria-hidden="true">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </span>
              </a>

              {/* Instagram */}
              <a
                href={socialLinks.instagram}
                target="_blank"
                rel="noopener nofollow"
                aria-label="Instagram"
                title="Instagram"
                className={socialCardStyle}
              >
                <span className="text-[#e4405f]" aria-hidden="true">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" />
                    <circle cx="12" cy="12" r="4" />
                    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                  </svg>
                </span>
              </a>

              {/* RSS */}
              <Link
                href="/feed.xml"
                aria-label="RSS Feed"
                title="RSS Feed"
                className={socialCardStyle}
              >
                <span className="text-brand" aria-hidden="true">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 11a9 9 0 0 1 9 9" />
                    <path d="M4 4a16 16 0 0 1 16 16" />
                    <circle cx="5" cy="19" r="1" />
                  </svg>
                </span>
              </Link>
            </div>
          </div>

          {/* Column 2: Categories (2 cols) */}
          <div className="lg:col-span-2 space-y-3.5">
            <div className="flex items-center gap-2">
              <span className="text-brand" aria-hidden="true">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="7" height="7" rx="1.5" />
                  <rect x="14" y="3" width="7" height="7" rx="1.5" />
                  <rect x="3" y="14" width="7" height="7" rx="1.5" />
                  <rect x="14" y="14" width="7" height="7" rx="1.5" />
                </svg>
              </span>
              <h3 className="font-display text-base font-bold text-ink">
                Categories
              </h3>
            </div>

            <ul className="space-y-2.5 text-sm text-ink-2">
              {categories.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={categoryUrl(c.slug)}
                    className="hover:text-brand-strong transition font-normal"
                  >
                    {c.name}
                  </Link>
                </li>
              ))}
              <li className="pt-1">
                <Link
                  href={archiveUrl()}
                  className="text-brand font-bold hover:underline inline-flex items-center gap-1 text-sm"
                >
                  <span>All Categories</span>
                  <span aria-hidden="true">→</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Company (2 cols) */}
          <div className="lg:col-span-2 space-y-3.5">
            <div className="flex items-center gap-2">
              <span className="text-brand" aria-hidden="true">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                  <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                </svg>
              </span>
              <h3 className="font-display text-base font-bold text-ink">
                Company
              </h3>
            </div>

            <ul className="space-y-2.5 text-sm text-ink-2">
              <li>
                <Link href={staticPageUrl('about-us')} className="hover:text-brand-strong transition font-normal">
                  About Us
                </Link>
              </li>
              <li>
                <Link href={staticPageUrl('contact-us')} className="hover:text-brand-strong transition font-normal">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href={staticPageUrl('privacy-policy')} className="hover:text-brand-strong transition font-normal">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href={staticPageUrl('terms-conditions')} className="hover:text-brand-strong transition font-normal">
                  Terms &amp; Conditions
                </Link>
              </li>
              <li>
                <Link href={staticPageUrl('terms-conditions')} className="hover:text-brand-strong transition font-normal">
                  Disclaimer
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter (4 cols) */}
          <div className="lg:col-span-4 space-y-3.5">
            <div className="flex items-center gap-2">
              <span className="text-brand" aria-hidden="true">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
              </span>
              <h3 className="font-display text-base font-bold text-ink">
                Newsletter
              </h3>
            </div>

            <p className="text-xs sm:text-[13px] leading-relaxed text-ink-2">
              Get the latest guides, app tips and tech updates in your inbox.
            </p>

            <FooterNewsletter />
          </div>
        </div>

        {/* Compact Bottom Bar */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-line/70 pt-6 text-xs sm:text-[13px] text-muted">
          <p className="text-ink-2 font-medium">
            © {new Date().getFullYear()} TrendsWheel. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center gap-x-2.5 sm:gap-x-3 gap-y-1.5">
            <span className="text-ink-2 font-medium">Independent Tech Guides</span>
            <span aria-hidden="true" className="text-line/80">|</span>
            <Link href={staticPageUrl('privacy-policy')} className="text-ink-2 hover:text-brand-strong transition">
              Privacy
            </Link>
            <span aria-hidden="true" className="text-line/80">|</span>
            <Link href={staticPageUrl('terms-conditions')} className="text-ink-2 hover:text-brand-strong transition">
              Terms
            </Link>
            <span aria-hidden="true" className="text-line/80">|</span>
            <Link href={staticPageUrl('contact-us')} className="text-ink-2 hover:text-brand-strong transition">
              Contact
            </Link>
            <span aria-hidden="true" className="text-line/80">|</span>
            <Link href={archiveUrl()} className="text-ink-2 hover:text-brand-strong transition">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
