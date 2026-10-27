'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';

type NavLink = { label: string; href: string };
type Cat = { name: string; slug: string };
type Props = { categories: Cat[]; links: NavLink[] };

const base = 'relative inline-flex h-11 items-center rounded-full px-4 text-[15px] font-semibold no-underline transition-colors';
const idle = 'text-ink-2 hover:bg-surface-2 hover:text-ink';
const active = 'bg-brand-soft text-brand-strong';

function useNav(categories: Cat[]) {
  const pathname = usePathname() || '/';
  const first = pathname.split('/')[1] ?? '';
  const inCategory = categories.some((c) => c.slug === first);
  const cls = (on: boolean, extra = '') => `${base} ${on ? active : idle} ${extra}`;
  const aria = (on: boolean) => (on ? ({ 'aria-current': 'page' } as const) : {});
  return { pathname, first, inCategory, cls, aria, isActive: (href: string) => pathname === href };
}

/** Desktop nav. Client component only so the current page can be highlighted. */
export function DesktopNav({ categories, links }: Props) {
  const { pathname, first, inCategory, cls, aria, isActive } = useNav(categories);
  return (
    <>
      <nav aria-label="Primary" className="ml-6 hidden items-center gap-1 lg:flex">
        <Link href="/" className={cls(pathname === '/')} {...aria(pathname === '/')}>
          Home
        </Link>
        <div className="group relative">
          <Link href={`/${categories[0].slug}`} className={cls(inCategory, 'gap-1.5')} {...aria(pathname === `/${first}` && inCategory)}>
            Categories
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden="true" className="transition group-hover:rotate-180">
              <path d="m6 9 6 6 6-6" />
            </svg>
          </Link>
          <ul className="invisible absolute left-0 top-full z-50 min-w-48 translate-y-1 rounded-2xl border border-line bg-white p-2 opacity-0 shadow-xl transition group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
            {categories.map((c) => (
              <li key={c.slug}>
                <Link
                  href={`/${c.slug}`}
                  className={`flex min-h-11 items-center rounded-xl px-3 font-medium no-underline ${first === c.slug ? active : 'hover:bg-surface-2'}`}
                  {...aria(first === c.slug && pathname === `/${c.slug}`)}
                >
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        {links.map((l) => (
          <Link key={l.href} href={l.href} className={cls(isActive(l.href))} {...aria(isActive(l.href))}>
            {l.label}
          </Link>
        ))}
      </nav>

    </>
  );
}

/** Mobile menu: native <details>, closes after navigation. */
export function MobileMenu({ categories, links }: Props) {
  const { pathname, first, cls, aria, isActive } = useNav(categories);
  const menu = useRef<HTMLDetailsElement>(null);
  useEffect(() => {
    if (menu.current) menu.current.open = false;
  }, [pathname]);
  return (
    <>
      <details ref={menu} className="group/menu relative lg:hidden">
        <summary className="flex size-11 items-center justify-center rounded-full border border-line bg-white hover:bg-surface-2" aria-label="Menu">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
            <path d="M4 7h16M4 12h16M4 17h16" />
          </svg>
        </summary>
        <nav aria-label="Mobile" className="absolute right-0 top-full z-50 mt-3 w-72 rounded-2xl border border-line bg-white p-2 shadow-xl">
          <Link href="/" className={cls(pathname === '/', 'w-full rounded-xl')} {...aria(pathname === '/')}>
            Home
          </Link>
          <p className="px-4 pb-1 pt-3 text-xs font-bold uppercase tracking-wider text-muted">Categories</p>
          {categories.map((c) => (
            <Link key={c.slug} href={`/${c.slug}`} className={cls(first === c.slug, 'w-full rounded-xl pl-6')} {...aria(first === c.slug && pathname === `/${c.slug}`)}>
              {c.name}
            </Link>
          ))}
          <hr className="my-2 border-line" />
          {links.map((l) => (
            <Link key={l.href} href={l.href} className={cls(isActive(l.href), 'w-full rounded-xl')} {...aria(isActive(l.href))}>
              {l.label}
            </Link>
          ))}
        </nav>
      </details>
    </>
  );
}
