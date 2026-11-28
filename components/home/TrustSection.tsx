import Link from 'next/link';
import { staticPageUrl } from '@/lib/url';

const trustPillars = [
  {
    step: '01',
    title: 'Hands-On Lab Verification',
    badge: 'Hardware Tested',
    text: 'If a guide tells you to toggle a hidden developer setting, flash a firmware partition, or edit an APN, our editors executed it first on physical hardware.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M9 3h6M10 3v6L4.5 19a1.5 1.5 0 0 0 1.3 2.2h12.4a1.5 1.5 0 0 0 1.3-2.2L14 9V3" />
        <path d="M7.5 15h9" />
      </svg>
    ),
  },
  {
    step: '02',
    title: 'Byline Accountability',
    badge: 'Human Authors',
    text: 'Every investigation carries a real byline with identifiable technical credentials. We do not publish automated, unverified AI content or thin listicles.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="8" r="4" />
        <path d="M4 21a8 8 0 0 1 16 0" />
      </svg>
    ),
  },
  {
    step: '03',
    title: 'Continuous Deprecation Audits',
    badge: 'Kept Current',
    text: 'Operating systems and platform interfaces evolve rapidly. When a security update or menu redesign alters a workflow, our team revises the steps promptly.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M20 11a8 8 0 0 0-14.5-4.5L4 8" />
        <path d="M4 4v4h4" />
        <path d="M4 13a8 8 0 0 0 14.5 4.5L20 16" />
        <path d="M20 20v-4h-4" />
      </svg>
    ),
  },
  {
    step: '04',
    title: 'Strict Ad Separation',
    badge: 'No Native Deception',
    text: 'Monetization never dictates technical recommendations. Sponsored placements are explicitly labeled, zero-CLS compliant, and never disguised as advice.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
  },
];

export default function TrustSection() {
  return (
    <section className="my-16 border-t border-line/70 pt-12" aria-labelledby="trust-heading">
      {/* Editorial Authority Manifesto Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-line/80">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2">
            <span className="flex size-5 items-center justify-center rounded-full bg-emerald-500 text-[10px] font-bold text-white shadow-xs" aria-hidden="true">
              ✓
            </span>
            <span className="text-xs font-bold uppercase tracking-widest text-brand-strong">
              Editorial Integrity &amp; Verification
            </span>
          </div>
          <h2 id="trust-heading" className="font-display mt-2 text-2xl font-bold tracking-tight text-ink sm:text-3xl lg:text-4xl">
            Why Readers Trust TrendsWheel
          </h2>
          <p className="mt-3 text-sm sm:text-base leading-relaxed text-ink-2">
            In an era of generic web scrapers and auto-generated content, TrendsWheel operates on a simple standard: if we haven’t verified the solution ourselves, we don’t publish it.
          </p>
        </div>

        {/* Live Integrity Stats Row */}
        <div className="flex items-center gap-4 sm:gap-6 shrink-0 bg-surface-2/80 border border-line/80 px-5 py-3 rounded-2xl">
          <div className="text-center">
            <span className="block font-display text-xl font-bold text-ink">248</span>
            <span className="text-[11px] font-medium text-muted">Lab Guides</span>
          </div>
          <span className="h-8 w-px bg-line" aria-hidden="true" />
          <div className="text-center">
            <span className="block font-display text-xl font-bold text-emerald-600">100%</span>
            <span className="text-[11px] font-medium text-muted">Human Tested</span>
          </div>
          <span className="h-8 w-px bg-line" aria-hidden="true" />
          <div className="text-center">
            <span className="block font-display text-xl font-bold text-brand-strong">0</span>
            <span className="text-[11px] font-medium text-muted">Paywalls</span>
          </div>
        </div>
      </div>

      {/* 4 Premium Pillar Cards */}
      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {trustPillars.map((p) => (
          <article
            key={p.title}
            className="card group flex flex-col justify-between p-6 border border-line/80 bg-white transition-all duration-200 hover:border-brand/40 hover:shadow-md"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="flex size-11 items-center justify-center rounded-xl bg-brand-soft text-brand-strong transition group-hover:bg-brand group-hover:text-white shadow-2xs">
                  {p.icon}
                </span>
                <span className="text-xs font-display font-black text-muted/50 tracking-wider">
                  {p.step}
                </span>
              </div>

              <div className="mt-4">
                <span className="inline-block rounded-md bg-surface-2 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-muted">
                  {p.badge}
                </span>
                <h3 className="font-display mt-2 text-base font-bold leading-snug text-ink">
                  {p.title}
                </h3>
              </div>

              <p className="mt-2 text-xs leading-relaxed text-ink-2">
                {p.text}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-line/60 flex items-center gap-1.5 text-[11px] font-semibold text-emerald-600">
              <span className="size-1.5 rounded-full bg-emerald-500" aria-hidden="true" />
              <span>Verified Standard</span>
            </div>
          </article>
        ))}
      </div>

      {/* Readers-First Correction & Fact-Checking Guarantee */}
      <div className="mt-8 rounded-2xl border border-line/80 bg-gradient-to-r from-surface-2 via-white to-surface-2 p-6 sm:p-7 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 font-display text-sm font-bold uppercase tracking-wider text-ink">
            <span className="text-brand-strong">🛡️</span>
            <span>Our Readers-First Correction Policy</span>
          </div>
          <p className="mt-1 text-xs sm:text-sm text-ink-2 leading-relaxed">
            Spotted an app interface that updated overnight or a setting that moved in the latest OS beta? Let our editorial desk know. We re-test and deploy verified corrections within 24 hours.
          </p>
        </div>

        <Link
          href={staticPageUrl('contact-us')}
          className="btn !min-h-10 !px-5 text-xs uppercase tracking-wider font-bold shrink-0 shadow-xs"
        >
          <span>Report an Update</span>
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </section>
  );
}
