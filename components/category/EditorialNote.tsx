import Link from 'next/link';
import { editorialPoints } from '@/config/category-content';
import { staticPageUrl } from '@/lib/url';

const s = { width: 24, height: 24, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.9, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true } as const;

// Same order as editorialPoints: sources, dated, corrections.
const icons = [
  <svg key="l" {...s}><path d="M10 13a5 5 0 0 0 7.1 0l3-3a5 5 0 0 0-7.1-7.1l-1.7 1.7" /><path d="M14 11a5 5 0 0 0-7.1 0l-3 3A5 5 0 0 0 11 21l1.7-1.7" /></svg>,
  <svg key="d" {...s}><rect x="3" y="4" width="18" height="18" rx="3" /><path d="M16 2v4M8 2v4M3 10h18" /><path d="m9 16 2 2 4-4" /></svg>,
  <svg key="c" {...s}><rect x="2" y="4" width="20" height="16" rx="3" /><path d="m2 7 10 7 10-7" /></svg>,
];

export default function EditorialNote({ note }: { note: string }) {
  return (
    <section aria-labelledby="how-we-write" className="relative my-10 overflow-hidden rounded-[28px] border border-line bg-gradient-to-br from-brand-soft via-white to-surface-2 p-6 sm:p-10">
      <div className="pointer-events-none absolute -left-20 -top-20 size-64 rounded-full bg-brand/10 blur-3xl" aria-hidden="true" />
      <div className="relative">
        <h2 id="how-we-write" className="font-display text-2xl font-bold sm:text-3xl">
          How We Write These
        </h2>
        <div className="mt-3 h-1 w-14 rounded-full bg-brand" aria-hidden="true" />
        <p className="mt-5 border-l-4 border-brand/40 pl-5 text-[1.05rem] leading-relaxed text-ink-2">{note}</p>
        <ul className="mt-8 grid gap-4 sm:grid-cols-3">
          {editorialPoints.map((e, i) => (
            <li key={e.title} className="group rounded-2xl border border-line bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-md">
              <span className="flex size-12 items-center justify-center rounded-xl bg-brand-soft text-brand-strong transition group-hover:bg-brand group-hover:text-white">{icons[i]}</span>
              <strong className="font-display mt-4 block text-lg">{e.title}</strong>
              <span className="mt-1 block text-ink-2">
                {e.text}
                {e.link && (
                  <>
                    {' '}
                    <Link href={staticPageUrl('contact-us')} className="font-semibold text-brand-strong underline underline-offset-2">
                      Contact page
                    </Link>
                  </>
                )}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
