import Link from 'next/link';
import { primaryLinks } from '@/config/nav';
import { getCategories } from '@/lib/content';
import { categoryUrl } from '@/lib/url';
import Logo from './Logo';
import SearchBox from './SearchBox';

const linkCls = 'inline-flex min-h-11 items-center rounded-lg px-3 font-semibold text-ink-2 no-underline hover:bg-surface-2 hover:text-ink';

export default function Header() {
  const categories = getCategories();
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-surface/95 backdrop-blur">
      <div className="container-page flex h-16 items-center gap-3">
        <Logo priority />

        <nav aria-label="Primary" className="ml-4 hidden items-center gap-1 lg:flex">
          <Link href="/" className={linkCls}>
            Home
          </Link>
          <div className="group relative">
            <Link href={categoryUrl(categories[0].slug)} className={linkCls}>
              Categories
            </Link>
            <ul className="invisible absolute left-0 top-full min-w-44 rounded-xl border border-line bg-surface p-1 opacity-0 shadow-lg transition group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
              {categories.map((c) => (
                <li key={c.slug}>
                  <Link href={categoryUrl(c.slug)} className="block rounded-lg px-3 py-2.5 font-medium no-underline hover:bg-surface-2">
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          {primaryLinks.map((l) => (
            <Link key={l.href} href={l.href} className={linkCls}>
              {l.label}
            </Link>
          ))}
        </nav>

        <SearchBox className="ml-auto w-full max-w-[16rem] sm:max-w-xs" />

        {/* Mobile menu: native <details>, no JavaScript */}
        <details className="relative lg:hidden">
          <summary className="flex size-11 items-center justify-center rounded-lg hover:bg-surface-2" aria-label="Menu">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          </summary>
          <nav aria-label="Mobile" className="absolute right-0 top-full mt-2 w-64 rounded-xl border border-line bg-surface p-2 shadow-lg">
            <Link href="/" className={`${linkCls} w-full`}>
              Home
            </Link>
            <p className="px-3 pt-2 text-xs font-bold uppercase tracking-wide text-muted">Categories</p>
            {categories.map((c) => (
              <Link key={c.slug} href={categoryUrl(c.slug)} className={`${linkCls} w-full pl-6`}>
                {c.name}
              </Link>
            ))}
            <hr className="my-2 border-line" />
            {primaryLinks.map((l) => (
              <Link key={l.href} href={l.href} className={`${linkCls} w-full`}>
                {l.label}
              </Link>
            ))}
          </nav>
        </details>
      </div>
    </header>
  );
}
