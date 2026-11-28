import Link from 'next/link';
import { primaryLinks } from '@/config/nav';
import { getCategories } from '@/lib/content';
import { archiveUrl } from '@/lib/url';
import { DesktopNav, MobileMenu } from './HeaderNav';
import Logo from './Logo';
import SearchBox from './SearchBox';

export default function Header() {
  const categories = getCategories().map((c) => ({ name: c.name, slug: c.slug }));

  return (
    <header className="sticky top-0 z-40 border-b border-line/80 bg-white/95 backdrop-blur-md transition-shadow">
      {/* Top Editorial Utility Bar */}
      <div className="border-b border-line/60 bg-surface-2/80 px-4 py-2 text-xs text-muted">
        <div className="container-page flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 font-bold uppercase tracking-wider text-brand-strong">
              <span className="size-2 animate-pulse rounded-full bg-emerald-500" aria-hidden="true" />
              Lab Verified
            </span>
            <span className="hidden text-line sm:inline" aria-hidden="true">
              |
            </span>
            <span className="hidden font-medium text-ink-2 md:inline">
              Independent Systems Journalism • Hardware Diagnostics &amp; OS Forensics
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs font-semibold">
            <Link
              href={archiveUrl()}
              className="text-ink-2 no-underline hover:text-brand-strong transition inline-flex items-center gap-1.5"
            >
              <span className="font-bold text-ink">248</span>
              <span>Guides in Library</span>
            </Link>
            <span className="text-line" aria-hidden="true">
              •
            </span>
            <Link
              href="/feed.xml"
              className="inline-flex items-center gap-1.5 text-ink-2 no-underline hover:text-brand-strong transition"
              aria-label="RSS Feed"
            >
              <svg
                width="12"
                height="12"
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
              <span>RSS</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="container-page flex h-[70px] items-center justify-between gap-6">
        <Logo priority />

        <div className="flex items-center gap-4 sm:gap-5 h-full">
          <DesktopNav categories={categories} links={primaryLinks} />
          <SearchBox className="hidden w-60 sm:block xl:w-72" />
          <Link
            href={archiveUrl()}
            className="hidden items-center gap-1.5 rounded-xl bg-brand px-4 py-2 font-display text-xs font-bold uppercase tracking-wider text-white shadow-xs transition hover:bg-brand-strong xl:inline-flex"
          >
            <span>Library Index</span>
            <span aria-hidden="true">→</span>
          </Link>
          <MobileMenu categories={categories} links={primaryLinks} />
        </div>
      </div>

      {/* Mobile Search Input */}
      <div className="container-page pb-3 sm:hidden">
        <SearchBox className="w-full" />
      </div>

      {/* Radiant Gradient Accent Line */}
      <div
        className="h-[2px] w-full bg-gradient-to-r from-brand via-orange-400 to-amber-300 opacity-90"
        aria-hidden="true"
      />
    </header>
  );
}
