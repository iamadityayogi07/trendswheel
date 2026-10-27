import type { TocItem } from '@/lib/post-html';

/** Table of contents built from the post's h2/h3. Native <details>, open by default; links are plain anchors. */
export default function Toc({ items }: { items: TocItem[] }) {
  if (items.length < 3) return null;
  return (
    <nav aria-label="Table of contents" className="my-8 overflow-hidden rounded-2xl border border-line bg-gradient-to-br from-brand-soft/70 via-white to-surface-2 shadow-sm">
      <details className="group" open>
        <summary className="flex min-h-14 cursor-pointer items-center justify-between gap-3 px-5 py-3 font-display text-lg font-bold sm:px-6">
          <span className="flex items-center gap-3">
            <span className="flex size-9 items-center justify-center rounded-xl bg-brand text-white shadow-sm" aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                <path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" />
              </svg>
            </span>
            In this article
          </span>
          <svg className="chev text-brand-strong" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
            <path d="m6 9 6 6 6-6" />
          </svg>
        </summary>
        <ol className="space-y-0.5 border-t border-line px-3 pb-4 pt-3 sm:px-4">
          {items.map((t) => {
            const top = t.level !== 3;
            return (
              <li key={t.id} className={top ? '' : 'pl-11'}>
                <a href={`#${t.id}`} className="group/item flex min-h-10 items-center gap-3 rounded-lg px-2 py-1.5 text-ink-2 no-underline transition hover:bg-white hover:text-brand-strong hover:shadow-sm">
                  {top ? (
                    <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-brand-soft text-xs font-bold text-brand-strong transition group-hover/item:bg-brand group-hover/item:text-white" aria-hidden="true">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m9 6 6 6-6 6" />
                      </svg>
                    </span>
                  ) : (
                    <span className="size-1.5 shrink-0 rounded-full bg-brand/40 transition group-hover/item:bg-brand" aria-hidden="true" />
                  )}
                  <span className={top ? 'font-semibold' : 'text-[0.95rem]'}>{t.text}</span>
                </a>
              </li>
            );
          })}
        </ol>
      </details>
    </nav>
  );
}
