'use client';

import Link from 'next/link';
import { useEffect, useId, useRef, useState } from 'react';

type Item = { title: string; url: string; category: string; description: string; keywords: string };

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
          width="17"
          height="17"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
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
          placeholder="Search 248 guides..."
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
          className="h-10 w-full rounded-full border border-line bg-surface-2/70 pl-10 pr-12 text-sm text-ink placeholder:text-muted transition duration-200 focus:border-brand focus:bg-white focus:outline-none focus:ring-4 focus:ring-brand-soft shadow-inner"
        />
        <kbd className="pointer-events-none absolute right-3 hidden rounded border border-line bg-white px-1.5 py-0.5 text-[10px] font-semibold text-muted shadow-xs sm:inline-block">
          ⌘K
        </kbd>
      </div>

      {open && term.length >= 2 && (
        <ul className="absolute right-0 z-50 mt-2 max-h-96 w-[min(92vw,420px)] overflow-auto rounded-2xl border border-line bg-white p-2 shadow-2xl animate-in fade-in slide-in-from-top-2">
          {results.length === 0 && (
            <li className="px-4 py-4 text-center text-sm text-muted">
              {items ? 'No matching guides found.' : 'Loading index...'}
            </li>
          )}
          {results.map((r) => (
            <li key={r.url}>
              <Link
                href={r.url}
                onClick={() => setOpen(false)}
                className="group flex flex-col gap-1 rounded-xl px-3.5 py-2.5 no-underline transition hover:bg-brand-soft/50"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-brand-strong">
                    {r.category}
                  </span>
                  <span className="text-[11px] text-muted opacity-0 group-hover:opacity-100 transition">
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
          ))}
        </ul>
      )}
    </div>
  );
}
