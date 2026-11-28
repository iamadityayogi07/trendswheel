import Link from 'next/link';
import { AUTHOR_SAME_AS } from '@/config/site';
import type { Author } from '@/lib/content';
import { authorUrl } from '@/lib/url';

export default function AuthorBox({ author }: { author: Author }) {
  const profiles = AUTHOR_SAME_AS[author.slug] ?? [];

  return (
    <aside
      className="my-10 rounded-2xl border border-line/80 bg-gradient-to-br from-white via-surface-2/30 to-brand-soft/10 p-6 sm:p-7 shadow-2xs"
      aria-label="About the author"
    >
      <div className="flex flex-col sm:flex-row items-start gap-5">
        {/* Author Avatar with Ring */}
        <div className="relative shrink-0">
          {author.avatar ? (
            <img
              src={author.avatar}
              alt={author.name}
              width={80}
              height={80}
              loading="lazy"
              decoding="async"
              className="size-18 sm:size-20 rounded-2xl object-cover ring-2 ring-brand/20 shadow-xs"
            />
          ) : (
            <div className="flex size-18 sm:size-20 items-center justify-center rounded-2xl bg-brand/10 font-display text-2xl font-bold text-brand-strong ring-2 ring-brand/20">
              {author.name.charAt(0)}
            </div>
          )}
          <span
            className="absolute -bottom-1 -right-1 flex size-6 items-center justify-center rounded-full bg-emerald-500 text-white shadow-xs"
            title="Verified Technical Contributor"
            aria-label="Verified Contributor"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </span>
        </div>

        {/* Author Content */}
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-widest text-brand-strong">
                Written By Editorial Staff
              </span>
              <h3 className="font-display text-lg font-bold text-ink">
                <Link
                  href={authorUrl(author.slug)}
                  className="no-underline transition hover:text-brand-strong hover:underline"
                >
                  {author.name}
                </Link>
              </h3>
            </div>

            <Link
              href={authorUrl(author.slug)}
              className="inline-flex items-center gap-1 text-xs font-bold text-brand-strong hover:underline"
            >
              <span>View all guides</span>
              <span aria-hidden="true">→</span>
            </Link>
          </div>

          {author.shortBio && (
            <div
              className="mt-2.5 text-xs sm:text-sm text-ink-2 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: author.shortBio }}
            />
          )}

          {profiles.length > 0 && (
            <div className="mt-4 flex flex-wrap items-center gap-3 pt-3 border-t border-line/60">
              <span className="text-xs font-semibold text-muted">Connect:</span>
              <ul className="flex flex-wrap gap-2">
                {profiles.map((url) => {
                  const isInstagram = url.includes('instagram');
                  return (
                    <li key={url}>
                      <a
                        href={url}
                        target="_blank"
                        rel="noopener me nofollow"
                        className="inline-flex items-center gap-1.5 rounded-lg border border-line/80 bg-white px-2.5 py-1 text-xs font-semibold text-ink-2 shadow-3xs transition hover:border-brand hover:text-brand-strong"
                      >
                        {isInstagram ? (
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="2" y="2" width="20" height="20" rx="5" />
                            <circle cx="12" cy="12" r="4" />
                            <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
                          </svg>
                        ) : (
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77Z" />
                          </svg>
                        )}
                        <span>{isInstagram ? 'Instagram' : 'LinkedIn'}</span>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
