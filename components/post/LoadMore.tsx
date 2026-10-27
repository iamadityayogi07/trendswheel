'use client';

import { Children, useState, type ReactNode } from 'react';

/**
 * Every item is already in the static HTML (crawlable links); items past `initial` are hidden until the button is used.
 * With JavaScript disabled the <noscript> rule shows them all.
 */
export default function LoadMore({ children, initial = 12, step = 12, className = '' }: { children: ReactNode; initial?: number; step?: number; className?: string }) {
  const items = Children.toArray(children);
  const [shown, setShown] = useState(initial);
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
      {shown < items.length && (
        <div className="mt-8 text-center">
          <button type="button" className="btn btn-outline" onClick={() => setShown((s) => s + step)}>
            Load more articles ({items.length - shown} left)
          </button>
        </div>
      )}
    </>
  );
}
