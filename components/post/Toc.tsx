import type { TocItem } from '@/lib/post-html';

/** Table of contents built from the post's h2/h3. Native <details>: collapsed on mobile, open on desktop via CSS. */
export default function Toc({ items }: { items: TocItem[] }) {
  if (items.length < 3) return null;
  return (
    <nav aria-label="Table of contents" className="my-6 rounded-xl border border-line bg-surface-2 p-4">
      <details className="group lg:open:block" open>
        <summary className="flex min-h-11 items-center justify-between font-display text-lg font-bold">
          In this article
          <svg className="chev" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
            <path d="m6 9 6 6 6-6" />
          </svg>
        </summary>
        <ol className="mt-2 space-y-1">
          {items.map((t) => (
            <li key={t.id} className={t.level === 3 ? 'pl-5' : ''}>
              <a href={`#${t.id}`} className="inline-flex min-h-9 items-center text-ink-2 no-underline hover:text-brand-strong hover:underline">
                {t.text}
              </a>
            </li>
          ))}
        </ol>
      </details>
    </nav>
  );
}
