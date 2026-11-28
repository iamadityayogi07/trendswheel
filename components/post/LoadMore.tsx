'use client';

import { Children, useState, type ReactNode } from 'react';

/**
 * Every item is already in the static HTML (crawlable links); items past `initial` are hidden until the button is used.
 * With JavaScript disabled the <noscript> rule shows them all.
 */
export default function LoadMore({
  children,
  initial = 12,
  step = 12,
  className = '',
}: {
  children: ReactNode;
  initial?: number;
  step?: number;
  className?: string;
}) {
  const items = Children.toArray(children);
  const [shown, setShown] = useState(initial);
  const visibleCount = Math.min(shown, items.length);
  const remaining = items.length - visibleCount;

  return (
    <>
      <noscript>
        <style>{'.lm-item[hidden]{display:block!important}'}</style>
      </noscript>
      <ul className={className}>
        {items.map((item, i) => (
          <li key={i} className="lm-item" hidden={i >= shown}>
            {item}
          </li>
        ))}
      </ul>
      {remaining > 0 && (
        <div className="mt-10 flex flex-col items-center gap-3 border-t border-line/70 pt-8">
          <p className="text-xs font-medium text-muted">
            Showing <span className="font-bold text-ink">{visibleCount}</span> of{' '}
            <span className="font-bold text-ink">{items.length}</span> verified guides
          </p>
          <button
            type="button"
            className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-line bg-white px-6 py-2.5 font-display text-sm font-bold text-ink shadow-xs transition hover:border-brand hover:bg-brand hover:text-white cursor-pointer"
            onClick={() => setShown((s) => s + step)}
          >
            <span>Load {Math.min(step, remaining)} More Guides</span>
            <span className="rounded-md bg-surface-2 px-2 py-0.5 text-xs text-muted group-hover:bg-white/20">
              +{remaining} left
            </span>
          </button>
        </div>
      )}
    </>
  );
}
