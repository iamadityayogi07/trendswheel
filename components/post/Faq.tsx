import Link from 'next/link';
import type { FaqItem } from '@/lib/content';

type Props = {
  items: FaqItem[];
  heading: string;
  subtitle?: string;
  headingLevel?: 2 | 3;
  centered?: boolean;
};

/**
 * Modern Editorial FAQ Accordion with native <details> elements.
 * Fully static, zero-JS accessible, and structured for Google FAQPage rich snippets.
 */
export default function Faq({
  items,
  heading,
  subtitle = 'Clear, verified answers to common reader questions about our guides, testing methodology, and technical support.',
  headingLevel = 2,
  centered = false,
}: Props) {
  const list = items.filter(
    (i) => (i.title ?? '').trim() || (i.description ?? '').trim()
  );
  if (!list.length) return null;

  const H = `h${headingLevel}` as 'h2' | 'h3';

  return (
    <section
      aria-labelledby="faq-heading"
      className={`my-14 ${
        centered
          ? ''
          : 'rounded-2xl border border-line/80 bg-gradient-to-br from-surface-2/80 via-white to-brand-soft/20 p-6 sm:p-10 lg:grid lg:grid-cols-[330px_1fr] lg:gap-12 shadow-2xs'
      }`}
    >
      {/* Header Block */}
      <div
        className={
          centered
            ? 'text-center max-w-2xl mx-auto'
            : 'lg:sticky lg:top-28 lg:self-start'
        }
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
            Knowledge Base • {list.length} Answers
          </span>
        </div>

        <H
          id="faq-heading"
          className={`font-display mt-2.5 font-bold tracking-tight text-ink ${
            centered
              ? 'text-2xl sm:text-3xl lg:text-4xl'
              : 'text-2xl sm:text-3xl'
          }`}
        >
          {heading}
        </H>

        <p className="mt-2.5 text-xs sm:text-sm text-ink-2 leading-relaxed">
          {subtitle}
        </p>

        <div
          className={`mt-4 h-1 w-12 rounded-full bg-brand ${
            centered ? 'mx-auto' : ''
          }`}
          aria-hidden="true"
        />

        {/* Sidebar Help Card (shown on 2-column category/article layout) */}
        {!centered && (
          <div className="mt-6 rounded-xl border border-line/80 bg-white p-4 shadow-2xs">
            <div className="flex items-center gap-2 text-xs font-bold text-ink">
              <span aria-hidden="true">💡</span>
              <span>Still need assistance?</span>
            </div>
            <p className="mt-1.5 text-xs leading-relaxed text-ink-2">
              Encountered a different OS menu or need help with a step? Reach out to our editorial lab.
            </p>
            <Link
              href="/contact-us"
              className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-brand-strong hover:underline"
            >
              <span>Ask Editorial Desk</span>
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        )}
      </div>

      {/* Accordion List */}
      <div
        className={`space-y-3 ${
          centered ? 'mx-auto mt-8 max-w-3xl' : 'mt-8 lg:mt-0'
        }`}
      >
        {list.map((f, i) => {
          const numberLabel = String(i + 1).padStart(2, '0');

          return (
            <details
              key={f.title || i}
              className="group rounded-xl border border-line/80 bg-white shadow-2xs transition-all duration-200 hover:border-brand/40 open:border-brand/50 open:shadow-sm"
              open={i === 0}
            >
              <summary className="flex min-h-14 cursor-pointer select-none items-center justify-between gap-4 px-5 py-4 text-left list-none [&::-webkit-details-marker]:hidden">
                <span className="flex items-center gap-3.5">
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
                  className="flex size-7 shrink-0 items-center justify-center rounded-full border border-line/80 bg-surface-2 text-ink-2 transition-all duration-200 group-hover:border-brand/40 group-open:rotate-180 group-open:bg-brand group-open:text-white group-open:border-brand"
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

              <div className="border-t border-line/50 bg-surface-2/25 px-5 pb-5 pt-3.5 sm:px-6 sm:pl-16 text-xs sm:text-sm leading-relaxed text-ink-2">
                <p className="whitespace-pre-line">{f.description ?? ''}</p>
              </div>
            </details>
          );
        })}

        {/* Centered Layout Bottom Help Desk Banner */}
        {centered && (
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-3 rounded-xl border border-line/80 bg-surface-2/70 p-4 sm:p-5 text-xs text-ink-2">
            <div className="flex items-center gap-2.5">
              <span className="text-base" aria-hidden="true">
                💡
              </span>
              <span>
                Have a technical question or encountered an OS discrepancy not covered above?
              </span>
            </div>
            <div className="flex items-center gap-4 shrink-0">
              <Link
                href="/contact-us"
                className="font-bold text-brand-strong hover:underline inline-flex items-center gap-1"
              >
                <span>Ask Editorial Desk</span>
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
