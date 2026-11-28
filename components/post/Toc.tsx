import type { TocItem } from '@/lib/post-html';

/** Table of contents built from the post's h2/h3. Native <details>, open by default; links are plain anchors. */
export default function Toc({ items }: { items: TocItem[] }) {
  if (items.length < 3) return null;

  return (
    <nav
      aria-label="Table of contents"
      className="my-8 overflow-hidden rounded-2xl border border-line/80 bg-white shadow-2xs transition duration-200"
    >
      <details className="group" open>
        <summary className="flex min-h-14 cursor-pointer select-none items-center justify-between gap-3 px-5 py-4 font-display text-base sm:text-lg font-bold text-ink list-none [&::-webkit-details-marker]:hidden bg-surface-2/40 hover:bg-surface-2/70 transition">
          <span className="flex items-center gap-3">
            <span
              className="flex size-8 items-center justify-center rounded-lg bg-brand/10 text-brand-strong"
              aria-hidden="true"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
              >
                <path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" />
              </svg>
            </span>
            <span>In this guide</span>
            <span className="rounded-md bg-white border border-line/70 px-2 py-0.5 text-xs font-semibold text-muted">
              {items.length} steps
            </span>
          </span>

          <span
            className="flex size-7 shrink-0 items-center justify-center rounded-full border border-line/80 bg-white text-ink-2 transition-transform duration-200 group-open:rotate-180"
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

        <ol className="divide-y divide-line/40 px-4 py-2 sm:px-5">
          {items.map((t, idx) => {
            const top = t.level !== 3;
            return (
              <li key={t.id} className={top ? 'py-1.5' : 'py-1 pl-6 sm:pl-8'}>
                <a
                  href={`#${t.id}`}
                  className="group/item flex items-start gap-2.5 rounded-lg px-2 py-1.5 text-xs sm:text-sm text-ink-2 no-underline transition hover:bg-surface-2 hover:text-brand-strong"
                >
                  {top ? (
                    <span
                      className="flex size-5 shrink-0 items-center justify-center rounded-md bg-surface-2 text-[11px] font-bold text-muted group-hover/item:bg-brand-soft group-hover/item:text-brand-strong transition"
                      aria-hidden="true"
                    >
                      {idx + 1}
                    </span>
                  ) : (
                    <span
                      className="size-1.5 shrink-0 rounded-full bg-brand/40 mt-1.5 transition group-hover/item:bg-brand"
                      aria-hidden="true"
                    />
                  )}
                  <span
                    className={
                      top
                        ? 'font-bold text-ink group-hover/item:text-brand-strong leading-snug'
                        : 'font-medium leading-snug'
                    }
                  >
                    {t.text}
                  </span>
                </a>
              </li>
            );
          })}
        </ol>
      </details>
    </nav>
  );
}
