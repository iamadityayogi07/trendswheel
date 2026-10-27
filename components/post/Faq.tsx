import type { FaqItem } from '@/lib/content';

/** FAQ accordion with native <details>; answers are in the static HTML. Text is rendered escaped, newlines kept. */
export default function Faq({ items, heading, headingLevel = 2, centered = false }: { items: FaqItem[]; heading: string; headingLevel?: 2 | 3; centered?: boolean }) {
  const list = items.filter((i) => (i.title ?? '').trim() || (i.description ?? '').trim());
  if (!list.length) return null;
  const H = `h${headingLevel}` as 'h2' | 'h3';
  return (
    <section className="my-12" aria-labelledby="faq-heading">
      <div className={centered ? 'text-center' : ''}>
        <H id="faq-heading" className="font-display text-3xl font-bold sm:text-4xl">
          {heading}
        </H>
        <div className={`mt-3 h-1 w-14 rounded-full bg-brand ${centered ? 'mx-auto' : ''}`} aria-hidden="true" />
      </div>
      <div className="mx-auto mt-8 max-w-3xl space-y-3">
        {list.map((f, i) => (
          <details key={i} className="group rounded-2xl border border-line bg-white shadow-sm transition open:border-brand/40 open:bg-brand-soft/40 open:shadow-md" open={i === 0}>
            <summary className="flex min-h-14 items-center justify-between gap-4 px-5 py-4 text-left font-display text-lg font-bold leading-snug">
              <span className="flex items-center gap-3">
                <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-brand-soft text-sm font-bold text-brand-strong" aria-hidden="true">
                  {i + 1}
                </span>
                <span>{f.title ?? 'FAQ'}</span>
              </span>
              <span className="flex size-8 shrink-0 items-center justify-center rounded-full border border-line bg-white text-brand-strong transition group-open:rotate-45 group-open:border-brand/40" aria-hidden="true">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round">
                  <path d="M12 5v14M5 12h14" />
                </svg>
              </span>
            </summary>
            <p className="whitespace-pre-line px-5 pb-5 pl-[4.25rem] text-[1.02rem] leading-relaxed text-ink-2">{f.description ?? ''}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
