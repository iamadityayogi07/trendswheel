'use client';

import { useState } from 'react';

export default function FooterNewsletter() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) return;
    setSubmitted(true);
    setEmail('');
  };

  if (submitted) {
    return (
      <div className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50/80 p-3 text-xs font-semibold text-emerald-800">
        ✓ Thank you for subscribing! Check your inbox soon.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-3.5">
      <div className="flex items-center rounded-xl border border-line bg-white p-1 shadow-2xs focus-within:border-brand focus-within:ring-2 focus-within:ring-brand/20 transition">
        <div className="pl-2.5 text-muted shrink-0" aria-hidden="true">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="4" width="20" height="16" rx="2" />
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
          </svg>
        </div>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email address"
          required
          className="w-full bg-transparent px-2.5 py-1.5 text-xs sm:text-sm text-ink placeholder:text-muted focus:outline-none"
        />
        <button
          type="submit"
          className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-brand text-white shadow-xs hover:bg-brand-strong transition cursor-pointer"
          aria-label="Subscribe to newsletter"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </button>
      </div>

      <div className="mt-2.5 flex items-center gap-1.5 text-xs text-muted">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="text-brand shrink-0" aria-hidden="true">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
        <span>No spam. Unsubscribe anytime.</span>
      </div>
    </form>
  );
}
