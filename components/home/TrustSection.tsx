import Link from 'next/link';
import { trustBadges, trustParagraphs } from '@/config/home-content';
import { staticPageUrl } from '@/lib/url';

const svg = { width: 26, height: 26, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.9, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true } as const;

// One icon per badge, same order as trustBadges.
const icons = [
  <svg key="a" {...svg}><path d="M9 3h6M10 3v6L4.5 19a1.5 1.5 0 0 0 1.3 2.2h12.4a1.5 1.5 0 0 0 1.3-2.2L14 9V3" /><path d="M7.5 15h9" /></svg>,
  <svg key="b" {...svg}><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></svg>,
  <svg key="c" {...svg}><path d="M20 11a8 8 0 0 0-14.5-4.5L4 8" /><path d="M4 4v4h4" /><path d="M4 13a8 8 0 0 0 14.5 4.5L20 16" /><path d="M20 20v-4h-4" /></svg>,
  <svg key="d" {...svg}><path d="M3 11v2a1 1 0 0 0 1 1h2l5 4V6L6 10H4a1 1 0 0 0-1 1Z" /><path d="M15.5 8.5a5 5 0 0 1 0 7M18 6a8.5 8.5 0 0 1 0 12" /></svg>,
];

export default function TrustSection() {
  return (
    <section className="mt-16" aria-labelledby="trust">
      <div className="text-center">
        <h2 id="trust" className="font-display text-3xl font-bold sm:text-4xl">
          Why Trust Us
        </h2>
        <div className="mx-auto mt-3 h-1 w-14 rounded-full bg-brand" aria-hidden="true" />
      </div>
      <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {trustBadges.map((b, i) => (
          <li key={b.title} className="card group p-6">
            <span className="flex size-14 items-center justify-center rounded-2xl bg-brand-soft text-brand-strong transition group-hover:bg-brand group-hover:text-white">{icons[i]}</span>
            <strong className="font-display mt-4 block text-lg leading-snug">{b.title}</strong>
            <span className="mt-1 block text-ink-2">{b.text}</span>
          </li>
        ))}
      </ul>
      <div className="mx-auto mt-8 max-w-4xl space-y-4 rounded-2xl bg-surface-2 p-6 text-[1.05rem] text-ink-2 sm:p-8">
        {trustParagraphs.map((t) => (
          <p key={t}>{t}</p>
        ))}
        <p>
          Spotted something outdated?{' '}
          <Link href={staticPageUrl('contact-us')} className="font-semibold text-brand-strong underline underline-offset-2">
            Use the Contact page
          </Link>{' '}
          and let us know - we&apos;d rather fix it than have people finding out it doesn&apos;t work anymore.
        </p>
      </div>
    </section>
  );
}
