'use client';

import { useState } from 'react';

/**
 * Reusable interactive newsletter form for both the left sidebar card
 * and the full-width bottom banner on category pages.
 */
export default function CategoryNewsletter({
  variant = 'sidebar',
  categoryName,
}: {
  variant?: 'sidebar' | 'banner';
  categoryName: string;
}) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitted'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) return;
    setStatus('submitted');
    setEmail('');
  };

  if (variant === 'banner') {
    return (
      <section
        aria-label="Newsletter signup"
        className="my-10 rounded-2xl border border-line/80 bg-gradient-to-r from-brand-soft/70 via-white to-indigo-50/70 p-6 sm:p-8 shadow-2xs"
      >
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <span
              className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-white border border-brand/20 text-brand-strong shadow-xs text-xl"
              aria-hidden="true"
            >
              ✉️
            </span>
            <div>
              <h2 className="font-display text-lg sm:text-xl font-bold text-ink">
                Never Miss a New Guide
              </h2>
              <p className="mt-0.5 text-xs sm:text-sm text-ink-2">
                Get the latest {categoryName.toLowerCase()} guides, app tips, and tech updates delivered to your inbox.
              </p>
            </div>
          </div>

          {status === 'submitted' ? (
            <div className="rounded-xl bg-emerald-50 border border-emerald-200 px-4 py-2.5 text-xs sm:text-sm font-semibold text-emerald-700">
              ✓ Subscribed! You&apos;ll receive our next lab dispatch.
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex w-full lg:w-auto flex-col sm:flex-row items-stretch sm:items-center gap-2.5"
            >
              <label htmlFor="cat-banner-email" className="sr-only">
                Email address
              </label>
              <input
                id="cat-banner-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="h-11 w-full sm:w-64 rounded-xl border border-line bg-white px-4 text-sm text-ink placeholder:text-muted focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/15"
              />
              <button
                type="submit"
                className="inline-flex h-11 items-center justify-center gap-1.5 rounded-xl bg-brand px-5 font-display text-xs font-bold uppercase tracking-wider text-white shadow-xs transition hover:bg-brand-strong cursor-pointer shrink-0"
              >
                <span>Subscribe</span>
                <span aria-hidden="true">→</span>
              </button>
            </form>
          )}
        </div>
      </section>
    );
  }

  return (
    <section
      aria-label="Sidebar newsletter"
      className="rounded-2xl border border-line/80 bg-white p-5 shadow-2xs"
    >
      <div className="flex items-center gap-2">
        <span className="text-base text-brand-strong" aria-hidden="true">
          ✉️
        </span>
        <h2 className="font-display text-sm font-bold text-ink">
          Get New Guides
        </h2>
      </div>
      <p className="mt-2 text-xs leading-relaxed text-ink-2">
        Get the latest {categoryName.toLowerCase()} guides and tech tips in your inbox.
      </p>

      {status === 'submitted' ? (
        <div className="mt-3 rounded-xl bg-emerald-50 border border-emerald-200 p-3 text-xs font-semibold text-emerald-700">
          ✓ Thanks for subscribing!
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-3.5 space-y-2.5">
          <label htmlFor="cat-side-email" className="sr-only">
            Email address
          </label>
          <input
            id="cat-side-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="h-10 w-full rounded-xl border border-line/80 bg-surface-2/60 px-3.5 text-xs text-ink placeholder:text-muted focus:border-brand focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand/15"
          />
          <button
            type="submit"
            className="w-full h-10 rounded-xl bg-brand font-display text-xs font-bold uppercase tracking-wider text-white shadow-xs transition hover:bg-brand-strong cursor-pointer"
          >
            Subscribe
          </button>
        </form>
      )}
    </section>
  );
}
