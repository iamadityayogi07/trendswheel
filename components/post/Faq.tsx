import type { FaqItem } from '@/lib/content';

/** FAQ accordion with native <details>; answers are in the static HTML. Text is rendered escaped, newlines kept. */
export default function Faq({ items, heading, headingLevel = 2 }: { items: FaqItem[]; heading: string; headingLevel?: 2 | 3 }) {
  const list = items.filter((i) => (i.title ?? '').trim() || (i.description ?? '').trim());
  if (!list.length) return null;
  const H = `h${headingLevel}` as 'h2' | 'h3';
  return (
    <section className="my-10" aria-labelledby="faq-heading">
      <H id="faq-heading" className="font-display text-2xl font-bold">
        {heading}
      </H>
      <div className="mt-4 space-y-3">
        {list.map((f, i) => (
          <details key={i} className="rounded-xl border border-line bg-surface" open={i === 0}>
            <summary className="flex min-h-12 items-center justify-between gap-3 px-4 py-3 font-semibold">
              <span>{f.title ?? 'FAQ'}</span>
              <svg className="chev shrink-0" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                <path d="m6 9 6 6 6-6" />
              </svg>
            </summary>
            <p className="whitespace-pre-line border-t border-line px-4 py-3 text-ink-2">{f.description ?? ''}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
