import Link from 'next/link';
import type { FaqItem } from '@/lib/content';

type Props = {
  items: FaqItem[];
  heading: string;
  subtitle?: string;
  headingLevel?: 2 | 3;
  centered?: boolean;
  className?: string;
};

/**
 * Modern Editorial FAQ Section with heading on top and accordion below.
 * Fully static, zero-JS accessible, and structured for Google FAQPage rich snippets.
 */
export default function Faq({
  items,
  heading,
  subtitle = 'Clear, verified answers to common reader questions about our guides, testing methodology, and technical troubleshooting.',
  headingLevel = 2,
  centered = false,
  className = '',
}: Props) {
  const list = items.filter(
    (i) => (i.title ?? '').trim() || (i.description ?? '').trim()
  );
  if (!list.length) return null;

  const H = `h${headingLevel}` as 'h2' | 'h3';

  return (
    <section
      aria-labelledby="faq-heading"
      className={`my-12 rounded-2xl border border-line/80 bg-white p-6 sm:p-8 lg:p-9 shadow-2xs ${className}`}
    >
      {/* Top Header Block: Heading & Subtitle */}
      <div
        className={`border-b border-line/70 pb-6 ${
          centered ? 'text-center max-w-2xl mx-auto' : ''
        }`}
      >
        <div
          className={`flex items-center gap-2 ${
            centered ? 'justify-center' : ''
          }`}
        >
          <span className="flex size-5 items-center justify-center rounded-md bg-brand/10 text-[11px] font-bold text-brand-strong">
            ?
          </span>
          <span className="text-xs font-bold uppercase tracking-widest text-brand-strong">
            Knowledge Base • {list.length} Verified Answers
          </span>
        </div>

        <H
          id="faq-heading"
          className="font-display mt-2.5 text-2xl sm:text-3xl font-bold tracking-tight text-ink"
        >
          {heading}
        </H>

        {subtitle && (
          <p className="mt-2 text-xs sm:text-sm text-ink-2 leading-relaxed max-w-3xl">
            {subtitle}
          </p>
        )}
      </div>

      {/* Accordion Below Heading (Full Width) */}
      <div className="mt-6 sm:mt-7 space-y-3.5 w-full">
        {list.map((f, i) => {
          const numberLabel = String(i + 1).padStart(2, '0');

          return (
            <details
              key={f.title || i}
              className="group rounded-xl border border-line/80 bg-[#fafbfc] transition duration-200 hover:border-brand/40 hover:bg-white open:border-brand/50 open:bg-white open:shadow-xs"
              open={i === 0}
            >
              <summary className="flex min-h-14 cursor-pointer select-none items-center justify-between gap-4 px-5 py-4 text-left list-none [&::-webkit-details-marker]:hidden">
                <span className="flex items-center gap-3.5 min-w-0">
                  <span
                    className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-surface-2 font-display text-xs font-bold text-ink-2 transition-colors group-hover:bg-brand-soft group-hover:text-brand-strong group-open:bg-brand group-open:text-white"
                    aria-hidden="true"
                  >
                    {numberLabel}
                  </span>
                  <span className="font-display text-sm sm:text-[15px] font-bold leading-snug text-ink transition-colors group-hover:text-brand-strong group-open:text-brand-strong">
                    {f.title ?? 'Frequently Asked Question'}
                  </span>
                </span>

                <span
                  className="flex size-7 shrink-0 items-center justify-center rounded-full border border-line/80 bg-white text-ink-2 transition-transform duration-200 group-hover:border-brand/40 group-open:rotate-180 group-open:bg-brand group-open:text-white group-open:border-brand shadow-3xs"
                  aria-hidden="true"
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </span>
              </summary>

              <div className="border-t border-line/50 bg-white px-5 pb-5 pt-3.5 sm:px-6 sm:pl-16 text-xs sm:text-sm leading-relaxed text-ink-2">
                <p className="whitespace-pre-line">{f.description ?? ''}</p>
              </div>
            </details>
          );
        })}
      </div>

      {/* Bottom Editorial Assistance Banner */}
      <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-3 rounded-xl border border-line/80 bg-surface-2/60 p-4 sm:p-4.5 text-xs text-ink-2">
        <div className="flex items-center gap-2.5">
          <span className="text-base" aria-hidden="true">
            💡
          </span>
          <span>
            Have a technical question or encountered an OS version discrepancy not covered above?
          </span>
        </div>
        <Link
          href="/contact-us"
          className="font-bold text-brand-strong hover:underline inline-flex items-center gap-1 shrink-0"
        >
          <span>Ask Editorial Desk</span>
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </section>
  );
}
