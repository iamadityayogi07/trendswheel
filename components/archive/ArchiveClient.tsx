'use client';

import Link from 'next/link';
import { useId, useMemo, useState } from 'react';
import AdUnit from '@/components/ads/AdUnit';
import { formatDate } from '@/lib/format';
import { categoryUrl } from '@/lib/url';

export type ArchivePostItem = {
  id: number;
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  updatedAt: string;
  readMinutes: number;
  category: {
    name: string;
    slug: string;
  };
  href: string;
};

export type ArchiveCategoryItem = {
  name: string;
  slug: string;
  count: number;
};

type Props = {
  posts: ArchivePostItem[];
  categories: ArchiveCategoryItem[];
};

export default function ArchiveClient({ posts, categories }: Props) {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'latest' | 'oldest' | 'alpha'>('latest');
  const searchInputId = useId();

  // Filter & search logic
  const filteredPosts = useMemo(() => {
    let list = posts;

    // Filter by category
    if (selectedCategory !== 'all') {
      list = list.filter((p) => p.category.slug === selectedCategory);
    }

    // Filter by query
    const q = query.trim().toLowerCase();
    if (q) {
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.category.name.toLowerCase().includes(q)
      );
    }

    // Sort
    const sorted = [...list];
    if (sortBy === 'latest') {
      sorted.sort((a, b) => b.publishedAt.localeCompare(a.publishedAt) || b.id - a.id);
    } else if (sortBy === 'oldest') {
      sorted.sort((a, b) => a.publishedAt.localeCompare(b.publishedAt) || a.id - b.id);
    } else if (sortBy === 'alpha') {
      sorted.sort((a, b) => a.title.localeCompare(b.title));
    }

    return sorted;
  }, [posts, selectedCategory, query, sortBy]);

  const isDefaultView = query.trim() === '' && selectedCategory === 'all' && sortBy === 'latest';

  const resetFilters = () => {
    setQuery('');
    setSelectedCategory('all');
    setSortBy('latest');
  };

  return (
    <div className="space-y-6">
      {/* Control Bar: Search Input, Category Filter Pills & Sort Dropdown */}
      <div className="rounded-2xl border border-line/80 bg-white p-4 sm:p-5 shadow-2xs space-y-4">
        {/* Search Input Row */}
        <div className="relative">
          <label htmlFor={searchInputId} className="sr-only">
            Search articles archive
          </label>
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-muted">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
          </div>
          <input
            id={searchInputId}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={`Search ${posts.length} articles by title, topic, or keyword...`}
            className="w-full rounded-xl border border-line/90 bg-surface-2/40 py-2.5 pl-10 pr-9 text-sm text-ink placeholder:text-muted focus:border-brand focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand/20 transition"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-muted hover:text-ink transition cursor-pointer"
              aria-label="Clear search"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          )}
        </div>

        {/* Filter Pills & Sort Row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5" role="tablist" aria-label="Filter archive by category">
            <button
              type="button"
              onClick={() => setSelectedCategory('all')}
              className={`rounded-lg px-3 py-1.5 text-xs font-bold transition cursor-pointer ${
                selectedCategory === 'all'
                  ? 'bg-brand text-white shadow-2xs'
                  : 'bg-surface-2 text-ink-2 hover:bg-surface-2/80 hover:text-ink'
              }`}
            >
              All Guides ({posts.length})
            </button>
            {categories.map((c) => {
              const isSelected = selectedCategory === c.slug;
              return (
                <button
                  key={c.slug}
                  type="button"
                  onClick={() => setSelectedCategory(c.slug)}
                  className={`rounded-lg px-3 py-1.5 text-xs font-bold transition cursor-pointer ${
                    isSelected
                      ? 'bg-brand text-white shadow-2xs'
                      : 'bg-surface-2 text-ink-2 hover:bg-surface-2/80 hover:text-ink'
                  }`}
                >
                  {c.name} ({c.count})
                </button>
              );
            })}
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-2 text-xs shrink-0">
            <label htmlFor="archive-sort-select" className="text-muted font-medium">
              Sort:
            </label>
            <select
              id="archive-sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'latest' | 'oldest' | 'alpha')}
              className="rounded-lg border border-line/80 bg-white px-2.5 py-1.5 text-xs font-bold text-ink focus:border-brand focus:outline-none cursor-pointer"
            >
              <option value="latest">Latest First</option>
              <option value="oldest">Oldest First</option>
              <option value="alpha">Title (A–Z)</option>
            </select>
          </div>
        </div>

        {/* Active Filters / Results Status Bar */}
        {(!isDefaultView || filteredPosts.length !== posts.length) && (
          <div className="flex items-center justify-between border-t border-line/60 pt-3 text-xs text-ink-2">
            <div>
              Showing <strong className="text-ink">{filteredPosts.length}</strong> of{' '}
              <strong className="text-ink">{posts.length}</strong> guides
              {selectedCategory !== 'all' && (
                <span> in <em>{categories.find((c) => c.slug === selectedCategory)?.name}</em></span>
              )}
              {query && (
                <span> matching &ldquo;<span className="text-brand-strong">{query}</span>&rdquo;</span>
              )}
            </div>
            <button
              type="button"
              onClick={resetFilters}
              className="font-bold text-brand-strong hover:underline cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

      {/* Empty State */}
      {filteredPosts.length === 0 && (
        <div className="rounded-2xl border border-line/80 bg-white p-8 sm:p-12 text-center shadow-2xs">
          <span className="text-3xl" aria-hidden="true">🔍</span>
          <h3 className="font-display mt-3 text-lg font-bold text-ink">
            No articles found matching &ldquo;{query}&rdquo;
          </h3>
          <p className="mt-1 text-xs text-muted max-w-sm mx-auto">
            Try searching with broader keywords, checking for typos, or switching to another category.
          </p>
          <button
            type="button"
            onClick={resetFilters}
            className="mt-4 inline-flex items-center rounded-xl bg-brand px-4 py-2 text-xs font-bold text-white shadow-xs hover:bg-brand-strong transition cursor-pointer"
          >
            Clear Search &amp; Show All
          </button>
        </div>
      )}

      {/* VIEW A: Grouped by Category (Default View) */}
      {isDefaultView && (
        <div className="space-y-8">
          {categories.map((c, catIdx) => {
            const catPosts = posts.filter((p) => p.category.slug === c.slug);
            if (catPosts.length === 0) return null;

            return (
              <div key={c.slug} className="space-y-4">
                <section
                  id={`a-${c.slug}`}
                  className="rounded-2xl border border-line/80 bg-white p-4 sm:p-6 shadow-2xs scroll-mt-28"
                  aria-labelledby={`heading-${c.slug}`}
                >
                  {/* Category Header */}
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line/60 pb-3.5">
                    <div className="flex items-center gap-2.5">
                      <span className={`chip chip-${c.slug} !text-xs !px-2.5 !py-1`}>
                        {c.name}
                      </span>
                      <h2 id={`heading-${c.slug}`} className="font-display text-lg sm:text-xl font-bold text-ink">
                        {c.name} Guides
                      </h2>
                      <span className="rounded-full bg-surface-2 px-2 py-0.5 text-xs font-semibold text-muted">
                        {catPosts.length}
                      </span>
                    </div>

                    <Link
                      href={categoryUrl(c.slug)}
                      className="text-xs font-bold text-brand-strong hover:underline inline-flex items-center gap-1"
                    >
                      <span>Explore Hub</span>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M5 12h14" />
                        <path d="m12 5 7 7-7 7" />
                      </svg>
                    </Link>
                  </div>

                  {/* Category Post List */}
                  <ul className="mt-2 divide-y divide-line/60">
                    {catPosts.map((p) => (
                      <li key={p.slug}>
                        <Link
                          href={p.href}
                          className="group flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 sm:gap-4 py-3 px-2 sm:px-3 rounded-xl transition duration-150 hover:bg-brand-soft/40 no-underline"
                        >
                          <span className="font-display text-sm sm:text-[15px] font-bold text-ink group-hover:text-brand-strong transition leading-snug">
                            {p.title}
                          </span>
                          <div className="flex items-center gap-3 text-xs text-muted shrink-0">
                            <span className="inline-flex items-center gap-1">
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                <rect x="3" y="4" width="18" height="18" rx="2" />
                                <path d="M16 2v4M8 2v4M3 10h18" />
                              </svg>
                              <time dateTime={p.publishedAt}>{formatDate(p.publishedAt)}</time>
                            </span>
                            <span className="hidden sm:inline-flex items-center gap-1">
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                <circle cx="12" cy="12" r="10" />
                                <path d="M12 6v6l4 2" />
                              </svg>
                              <span>{p.readMinutes}m</span>
                            </span>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted/60 transition group-hover:translate-x-0.5 group-hover:text-brand-strong" aria-hidden="true">
                              <path d="M5 12h14" />
                              <path d="m12 5 7 7-7 7" />
                            </svg>
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </section>

                {/* In-feed ad after 2nd category */}
                {catIdx === 1 && (
                  <AdUnit kind="inFeed" className="!my-6" />
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* VIEW B: Filtered or Searched Single Flat List */}
      {!isDefaultView && filteredPosts.length > 0 && (
        <section className="rounded-2xl border border-line/80 bg-white p-4 sm:p-6 shadow-2xs">
          <ul className="divide-y divide-line/60">
            {filteredPosts.map((p, idx) => (
              <li key={p.slug}>
                <Link
                  href={p.href}
                  className="group flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4 py-3 px-2 sm:px-3 rounded-xl transition duration-150 hover:bg-brand-soft/40 no-underline"
                >
                  <div className="flex items-start sm:items-center gap-2.5 min-w-0">
                    <span className={`chip chip-${p.category.slug} !text-[10px] !px-2 !py-0.5 shrink-0 mt-0.5 sm:mt-0`}>
                      {p.category.name}
                    </span>
                    <span className="font-display text-sm sm:text-[15px] font-bold text-ink group-hover:text-brand-strong transition leading-snug">
                      {p.title}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 text-xs text-muted shrink-0 pl-7 sm:pl-0">
                    <span className="inline-flex items-center gap-1">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <rect x="3" y="4" width="18" height="18" rx="2" />
                        <path d="M16 2v4M8 2v4M3 10h18" />
                      </svg>
                      <time dateTime={p.publishedAt}>{formatDate(p.publishedAt)}</time>
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <circle cx="12" cy="12" r="10" />
                        <path d="M12 6v6l4 2" />
                      </svg>
                      <span>{p.readMinutes}m</span>
                    </span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted/60 transition group-hover:translate-x-0.5 group-hover:text-brand-strong" aria-hidden="true">
                      <path d="M5 12h14" />
                      <path d="m12 5 7 7-7 7" />
                    </svg>
                  </div>
                </Link>

                {/* In-feed ad every 12 items */}
                {(idx === 11 || (idx > 11 && (idx - 11) % 16 === 0)) && (
                  <AdUnit kind="inFeed" className="!my-4" />
                )}
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
