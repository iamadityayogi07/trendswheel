import Link from 'next/link';

export type Crumb = { name: string; href?: string };

export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm text-muted">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
        {items.map((c, i) => (
          <li key={c.name} className="flex min-w-0 items-center gap-2">
            {c.href ? (
              <Link href={c.href} className="inline-flex min-h-8 items-center no-underline hover:text-brand-strong hover:underline">
                {c.name}
              </Link>
            ) : (
              <span aria-current="page" className="truncate text-ink-2">
                {c.name}
              </span>
            )}
            {i < items.length - 1 && <span aria-hidden="true">/</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}
