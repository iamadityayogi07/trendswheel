'use client';

import Link from 'next/link';
import { useEffect, useId, useRef, useState } from 'react';

type Item = { title: string; url: string; category: string; description: string; keywords: string };

/** Autocomplete only (no results page), like the old site. The index is a static JSON file loaded on first focus. */
export default function SearchBox({ className = '' }: { className?: string }) {
  const [items, setItems] = useState<Item[] | null>(null);
  const [q, setQ] = useState('');
  const [open, setOpen] = useState(false);
  const id = useId();
  const wrap = useRef<HTMLDivElement>(null);

  const load = () => {
    if (items) return;
    fetch('/search-index.json')
      .then((r) => r.json())
      .then(setItems)
      .catch(() => setItems([]));
  };

  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (wrap.current && !wrap.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, []);

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
      <input
        id={id}
        type="search"
        value={q}
        placeholder="Search articles"
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
        className="h-11 w-full rounded-full border border-line bg-surface px-4 text-base text-ink placeholder:text-muted"
      />
      {open && term.length >= 2 && (
        <ul className="absolute right-0 z-50 mt-2 max-h-96 w-[min(92vw,380px)] overflow-auto rounded-xl border border-line bg-surface p-1 shadow-lg">
          {results.length === 0 && <li className="px-3 py-3 text-sm text-muted">{items ? 'No matching articles.' : 'Searching...'}</li>}
          {results.map((r) => (
            <li key={r.url}>
              <Link href={r.url} onClick={() => setOpen(false)} className="block rounded-lg px-3 py-2 no-underline hover:bg-surface-2">
                <span className="block text-sm font-semibold text-ink">{r.title}</span>
                <span className="block text-xs text-muted">{r.category}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
