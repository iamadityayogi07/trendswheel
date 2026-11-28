'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';

type NavLink = { label: string; href: string };
type Cat = { name: string; slug: string };
type Props = { categories: Cat[]; links: NavLink[] };

const baseTab = 'relative inline-flex h-11 items-center px-3.5 font-display text-sm font-bold no-underline transition-colors';
const idleTab = 'text-ink-2 hover:text-brand-strong';
const activeTab = 'text-brand-strong after:absolute after:bottom-0 after:left-2 after:right-2 after:h-[2.5px] after:bg-brand after:rounded-full';

function useNav(categories: Cat[]) {
  const pathname = usePathname() || '/';
  const first = pathname.split('/')[1] ?? '';
  const inCategory = categories.some((c) => c.slug === first);
  const cls = (on: boolean, extra = '') => `${baseTab} ${on ? activeTab : idleTab} ${extra}`;
  const aria = (on: boolean) => (on ? ({ 'aria-current': 'page' } as const) : {});
  return { pathname, first, inCategory, cls, aria, isActive: (href: string) => pathname === href };
}

/** Desktop nav with direct category access and editorial dropdown. */
export function DesktopNav({ categories, links }: Props) {
  const { pathname, first, cls, aria, isActive } = useNav(categories);

  return (
    <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex h-full">
      <Link href="/" className={cls(pathname === '/')} {...aria(pathname === '/')}>
        Home
      </Link>

      {/* Direct Category Links */}
      {categories.map((c) => {
        const isCurrent = first === c.slug;
        return (
          <Link
            key={c.slug}
            href={`/${c.slug}`}
            className={cls(isCurrent)}
            {...aria(isCurrent && pathname === `/${c.slug}`)}
          >
            {c.name}
          </Link>
        );
      })}

      {/* More Pages Dropdown */}
      <div className="group relative">
        <button
          type="button"
          className="relative inline-flex h-11 items-center gap-1.5 px-3 font-display text-sm font-bold text-ink-2 transition-colors hover:text-brand-strong cursor-pointer"
          aria-haspopup="true"
        >
          <span>More</span>
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            aria-hidden="true"
            className="transition-transform duration-200 group-hover:rotate-180"
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </button>

        <ul className="invisible absolute left-0 top-full z-50 min-w-48 translate-y-1 rounded-xl border border-line bg-white/95 p-1.5 opacity-0 shadow-xl backdrop-blur-md transition-all duration-150 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className={`flex min-h-9 items-center rounded-lg px-3 text-sm font-medium no-underline transition ${
                  isActive(l.href)
                    ? 'bg-brand-soft text-brand-strong font-semibold'
                    : 'text-ink-2 hover:bg-surface-2 hover:text-ink'
                }`}
                {...aria(isActive(l.href))}
              >
                {l.label}
              </Link>
            </li>
          ))}
          <li className="my-1 border-t border-line/60" />
          <li>
            <Link
              href="/archive"
              className="flex min-h-9 items-center rounded-lg px-3 text-xs font-bold uppercase tracking-wider text-brand-strong hover:bg-brand-soft transition"
            >
              All 248 Guides →
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

/** Mobile menu: accessible drawer, closes after navigation. */
export function MobileMenu({ categories, links }: Props) {
  const { pathname, first, aria, isActive } = useNav(categories);
  const menu = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    if (menu.current) menu.current.open = false;
  }, [pathname]);

  const mobileCls = (on: boolean) =>
    `flex items-center rounded-xl px-3.5 py-2.5 text-sm font-semibold transition ${
      on ? 'bg-brand-soft text-brand-strong' : 'text-ink-2 hover:bg-surface-2 hover:text-ink'
    }`;

  return (
    <details ref={menu} className="group/menu relative lg:hidden">
      <summary
        className="flex size-10 items-center justify-center rounded-xl border border-line bg-white shadow-xs transition hover:bg-surface-2 cursor-pointer list-none [&::-webkit-details-marker]:hidden"
        aria-label="Navigation Menu"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          aria-hidden="true"
        >
          <path d="M4 7h16M4 12h16M4 17h16" />
        </svg>
      </summary>

      <nav
        aria-label="Mobile Menu"
        className="absolute right-0 top-full z-50 mt-2 w-72 rounded-2xl border border-line bg-white/95 p-3 shadow-2xl backdrop-blur-md animate-in fade-in slide-in-from-top-2"
      >
        <Link href="/" className={mobileCls(pathname === '/')} {...aria(pathname === '/')}>
          Home
        </Link>

        <div className="px-3 pb-1 pt-3 text-[11px] font-bold uppercase tracking-wider text-muted">
          Categories
        </div>
        <div className="space-y-1">
          {categories.map((c) => (
            <Link
              key={c.slug}
              href={`/${c.slug}`}
              className={mobileCls(first === c.slug)}
              {...aria(first === c.slug && pathname === `/${c.slug}`)}
            >
              {c.name}
            </Link>
          ))}
        </div>

        <hr className="my-2 border-line/70" />

        <div className="px-3 pb-1 pt-1 text-[11px] font-bold uppercase tracking-wider text-muted">
          Company &amp; Lab
        </div>
        <div className="space-y-1">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={mobileCls(isActive(l.href))}
              {...aria(isActive(l.href))}
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div className="mt-3 pt-2 border-t border-line/70">
          <Link
            href="/archive"
            className="flex items-center justify-center rounded-xl bg-brand py-2 text-xs font-bold uppercase tracking-wider text-white shadow-xs"
          >
            Explore 248 Guides →
          </Link>
        </div>
      </nav>
    </details>
  );
}
