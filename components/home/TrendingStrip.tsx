import Link from 'next/link';
import type { Post } from '@/lib/content';
import { postUrl } from '@/lib/url';

export default function TrendingStrip({ posts }: { posts: Post[] }) {
  if (!posts || posts.length === 0) return null;

  return (
    <section aria-label="Trending Stories" className="my-6 rounded-2xl border border-line/80 bg-surface-2/60 p-4 sm:p-5">
      <div className="flex items-center gap-2 mb-3 px-1">
        <span className="flex size-5 items-center justify-center rounded-full bg-brand text-[11px] text-white font-bold" aria-hidden="true">
          ⚡
        </span>
        <h2 className="text-xs font-bold uppercase tracking-widest text-ink">
          Trending Deep Dives
        </h2>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {posts.slice(0, 4).map((post, idx) => {
          const href = postUrl(post.category.slug, post.slug);
          const num = String(idx + 1).padStart(2, '0');

          return (
            <article key={post.slug} className="group relative flex items-start gap-3 rounded-xl bg-white p-3 border border-line/60 shadow-2xs transition hover:border-brand/40 hover:shadow-xs">
              <span className="font-display text-xl font-black text-brand/35 transition group-hover:text-brand" aria-hidden="true">
                {num}
              </span>
              <div className="min-w-0 flex-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-muted">
                  {post.category.name}
                </span>
                <h3 className="mt-0.5 text-xs font-bold leading-snug line-clamp-2 text-ink">
                  <Link href={href} className="no-underline transition group-hover:text-brand-strong">
                    {post.title}
                  </Link>
                </h3>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
