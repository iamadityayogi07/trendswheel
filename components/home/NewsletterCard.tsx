'use client';

import { useState } from 'react';

export default function NewsletterCard() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.includes('@')) {
      setSubmitted(true);
    }
  };

  return (
    <section aria-labelledby="newsletter-heading" className="my-16 overflow-hidden rounded-3xl border border-line bg-gradient-to-br from-ink via-slate-900 to-ink p-8 text-white sm:p-12 shadow-xl">
      <div className="relative mx-auto max-w-3xl text-center">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-brand/20 border border-brand/40 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-orange-300">
          <span className="size-1.5 rounded-full bg-brand" aria-hidden="true" />
          The TrendsWheel Dispatch
        </span>

        <h2 id="newsletter-heading" className="font-display mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
          Deep Tech Analysis &amp; System Guides, Delivered Weekly.
        </h2>

        <p className="mt-3 text-base text-slate-300 sm:text-lg">
          Join thousands of engineers, privacy enthusiasts, and power users who rely on our zero-fluff, lab-tested breakdowns.
        </p>

        {submitted ? (
          <div className="mt-8 rounded-2xl border border-emerald-500/30 bg-emerald-950/40 p-4 text-emerald-300 font-semibold animate-in fade-in">
            ✓ Thank you for subscribing! Check your inbox for the next weekly edition.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-8 flex flex-col sm:flex-row gap-3 justify-center items-center">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="h-12 w-full sm:w-96 rounded-full border border-slate-700 bg-slate-800/80 px-5 text-sm text-white placeholder:text-slate-400 focus:border-brand focus:outline-none focus:ring-4 focus:ring-brand/20 transition"
            />
            <button
              type="submit"
              className="h-12 w-full sm:w-auto px-8 rounded-full bg-gradient-to-r from-brand to-brand-strong font-bold text-white text-sm uppercase tracking-wider shadow-lg hover:shadow-brand/30 hover:brightness-110 transition cursor-pointer"
            >
              Subscribe Free
            </button>
          </form>
        )}

        <div className="mt-4 flex items-center justify-center gap-4 text-xs text-slate-400">
          <span>✓ Zero spam</span>
          <span>•</span>
          <span>✓ Lab-verified insights</span>
          <span>•</span>
          <span>✓ Unsubscribe anytime</span>
        </div>
      </div>
    </section>
  );
}
