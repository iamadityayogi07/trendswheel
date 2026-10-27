import Link from 'next/link';
import { AUTHOR_SAME_AS } from '@/config/site';
import type { Author } from '@/lib/content';
import { authorUrl } from '@/lib/url';

export default function AuthorBox({ author }: { author: Author }) {
  const profiles = AUTHOR_SAME_AS[author.slug] ?? [];
  return (
    <aside className="card my-8 flex items-start gap-4 p-4" aria-label="About the author">
      {author.avatar && <img src={author.avatar} alt={author.name} width={80} height={80} loading="lazy" decoding="async" className="size-20 shrink-0 rounded-full object-cover" />}
      <div className="min-w-0">
        <p className="text-lg font-bold">
          <span className="font-normal text-muted">By </span>
          <Link href={authorUrl(author.slug)} className="no-underline hover:text-brand-strong hover:underline">
            {author.name}
          </Link>
        </p>
        {author.shortBio && <div className="mt-1 text-sm text-ink-2" dangerouslySetInnerHTML={{ __html: author.shortBio }} />}
        {profiles.length > 0 && (
          <ul className="mt-2 flex flex-wrap gap-x-4">
            {profiles.map((u) => (
              <li key={u}>
                <a href={u} target="_blank" rel="noopener me" className="inline-flex min-h-9 items-center text-sm font-semibold text-brand-strong underline">
                  {u.includes('instagram') ? 'Instagram' : 'LinkedIn'}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </aside>
  );
}
