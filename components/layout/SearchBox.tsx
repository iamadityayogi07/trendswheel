'use client';

import Link from 'next/link';
import { useEffect, useId, useRef, useState } from 'react';

type Item = { title: string; url: string; category: string; description: string; keywords: string };

const categoryBadgeClass: Record<string, string> = {
  'how-to': 'bg-brand/10 text-brand-strong',
  apps: 'bg-indigo-50 text-indigo-700',
  tech: 'bg-emerald-50 text-emerald-700',
  social: 'bg-pink-50 text-pink-700',
};

/**
 * Autocomplete search box with keyboard shortcut (Cmd+K / Ctrl+K),
 * fast static index caching, and editorial result badges.
 */
export default function SearchBox({ className = '' }: { className?: string }) {
  const [items, setItems] = useState<Item[] | null>(null);
  const [q, setQ] = useState('');
  const [open, setOpen] = useState(false);
  const id = useId();
  const wrap = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const load = () => {
    if (items) return;
    fetch('/search-index.json')
      .then((r) => r.json())
      .then(setItems)
      .catch(() => setItems([]));
  };

  useEffect(() => {
    const handleGlobalKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        load();
        inputRef.current?.focus();
        setOpen(true);
      }
    };
    const close = (e: MouseEvent) => {
      if (wrap.current && !wrap.current.contains(e.target as Node)) setOpen(false);
    };
    window.addEventListener('keydown', handleGlobalKey);
    document.addEventListener('mousedown', close);
    return () => {
      window.removeEventListener('keydown', handleGlobalKey);
      document.removeEventListener('mousedown', close);
    };
  }, [items]);

  const term = q.trim().toLowerCase();
  const results =
    items && term.length >= 2
      ? items
          .filter((i) => `${i.title} ${i.description} ${i.keywords}`.toLowerCase().includes(term))
          .sort((a, b) => Number(b.title.toLowerCase().includes(term)) - Number(a.title.toLowerCase().includes(term)))
          .slice(0, 8)
      : [];

  return (
    <div ref={wrap} className={`relative ${className}`} role="search">
      <label htmlFor={id} className="sr-only">
        Search articles
      </label>
      <div className="relative flex items-center">
        <svg
          className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.5-3.5" />
        </svg>
        <input
          ref={inputRef}
          id={id}
          type="search"
          value={q}
          placeholder="Search 248 verified guides..."
          autoComplete="off"
          onFocus={() => {
            load();
            setOpen(true);
          }}
          onChange={(e) => {
            setQ(e.target.value);
            setOpen(true);
          }}
          onKeyDown={(e) => e.key === 'Escape' && setOpen(false)}
          className="h-10 w-full rounded-xl border border-line/80 bg-surface-2/60 pl-10 pr-12 text-sm text-ink placeholder:text-muted transition duration-200 hover:border-line focus:border-brand focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand/15 shadow-2xs"
        />
        <kbd className="pointer-events-none absolute right-2.5 hidden rounded-md border border-line/80 bg-white px-1.5 py-0.5 font-mono text-[10px] font-bold text-muted shadow-2xs sm:inline-block">
          ⌘K
        </kbd>
      </div>

      {open && term.length >= 2 && (
        <ul className="absolute right-0 z-50 mt-2 max-h-96 w-[min(92vw,440px)] overflow-auto rounded-2xl border border-line bg-white/95 p-2 shadow-2xl backdrop-blur-md animate-in fade-in slide-in-from-top-2">
          {results.length === 0 && (
            <li className="px-4 py-6 text-center text-sm text-muted">
              {items ? 'No matching guides found in library.' : 'Loading search index...'}
            </li>
          )}
          {results.map((r) => {
            const badgeClass = categoryBadgeClass[r.category.toLowerCase()] || 'bg-surface-2 text-ink-2';
            return (
              <li key={r.url}>
                <Link
                  href={r.url}
                  onClick={() => setOpen(false)}
                  className="group flex flex-col gap-1 rounded-xl px-3.5 py-2.5 no-underline transition hover:bg-brand-soft/40"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className={`inline-block rounded-md px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${badgeClass}`}>
                      {r.category}
                    </span>
                    <span className="text-[11px] font-medium text-brand-strong opacity-0 group-hover:opacity-100 transition">
                      Read guide →
                    </span>
                  </div>
                  <span className="text-sm font-semibold text-ink group-hover:text-brand-strong transition line-clamp-1">
                    {r.title}
                  </span>
                  {r.description && (
                    <span className="text-xs text-muted line-clamp-1">
                      {r.description}
                    </span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
