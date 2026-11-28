import Link from 'next/link';
import { editorialPoints } from '@/config/category-content';
import { staticPageUrl } from '@/lib/url';

const s = {
  width: 20,
  height: 20,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
} as const;

const icons = [
  <svg key="l" {...s}>
    <path d="M10 13a5 5 0 0 0 7.1 0l3-3a5 5 0 0 0-7.1-7.1l-1.7 1.7" />
    <path d="M14 11a5 5 0 0 0-7.1 0l-3 3A5 5 0 0 0 11 21l1.7-1.7" />
  </svg>,
  <svg key="d" {...s}>
    <rect x="3" y="4" width="18" height="18" rx="3" />
    <path d="M16 2v4M8 2v4M3 10h18" />
    <path d="m9 16 2 2 4-4" />
  </svg>,
  <svg key="c" {...s}>
    <rect x="2" y="4" width="20" height="16" rx="3" />
    <path d="m2 7 10 7 10-7" />
  </svg>,
];

export default function EditorialNote({ note }: { note: string }) {
  return (
    <section
      aria-labelledby="how-we-write"
      className="my-12 rounded-2xl border border-line/80 bg-surface-2/50 p-6 sm:p-10 shadow-2xs"
    >
      <div className="max-w-3xl">
        <span className="text-xs font-bold uppercase tracking-widest text-brand-strong">
          Editorial Methodology &amp; Rigor
        </span>
        <h2
          id="how-we-write"
          className="font-display mt-1.5 text-2xl font-bold tracking-tight text-ink sm:text-3xl"
        >
          How We Test &amp; Verify These Guides
        </h2>
        <div className="mt-3 h-1 w-12 rounded-full bg-brand" aria-hidden="true" />
        <p className="mt-4 text-sm sm:text-base leading-relaxed text-ink-2">
          {note}
        </p>
      </div>

      <ul className="mt-8 grid gap-5 sm:grid-cols-3">
        {editorialPoints.map((e, i) => (
          <li
            key={e.title}
            className="group rounded-xl border border-line/80 bg-white p-5 shadow-2xs transition duration-200 hover:border-brand/40 hover:shadow-sm"
          >
            <span className="flex size-10 items-center justify-center rounded-lg bg-brand-soft text-brand-strong transition group-hover:bg-brand group-hover:text-white">
              {icons[i]}
            </span>
            <strong className="font-display mt-3.5 block text-base font-bold text-ink">
              {e.title}
            </strong>
            <span className="mt-1.5 block text-xs sm:text-sm leading-relaxed text-ink-2">
              {e.text}
              {e.link && (
                <>
                  {' '}
                  <Link
                    href={staticPageUrl('contact-us')}
                    className="font-bold text-brand-strong hover:underline"
                  >
                    Contact Desk →
                  </Link>
                </>
              )}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
