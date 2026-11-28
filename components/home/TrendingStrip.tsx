import Link from 'next/link';
import { type Post, readingMinutes } from '@/lib/content';
import { formatDate } from '@/lib/format';
import { imageSet } from '@/lib/images';
import { categoryUrl, postUrl } from '@/lib/url';

export default function TrendingStrip({ posts }: { posts: Post[] }) {
  if (!posts || posts.length === 0) return null;

  return (
    <section aria-labelledby="trending-heading" className="my-10 rounded-2xl border border-line/80 bg-gradient-to-b from-surface-2/60 to-white p-5 sm:p-7 shadow-xs">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 border-b border-line/80 pb-4 mb-6">
        <div className="flex items-center gap-2.5">
          <span className="flex size-6 items-center justify-center rounded-lg bg-brand text-xs font-black text-white shadow-xs" aria-hidden="true">
            ⚡
          </span>
          <div>
            <h2 id="trending-heading" className="font-display text-base font-bold uppercase tracking-wider text-ink sm:text-lg">
              Trending Deep Dives
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold text-muted">
          <span className="size-2 rounded-full bg-emerald-500 animate-pulse" aria-hidden="true" />
          <span>High Community Engagement This Week</span>
        </div>
      </div>

      {/* 4 Rich Editorial Cards with Visuals and Numbered Badges */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {posts.slice(0, 4).map((post, idx) => {
          const href = postUrl(post.category.slug, post.slug);
          const img = imageSet(post.thumbnailImage || post.featuredImage, '320px');
          const chipClass = `chip chip-${post.category.slug}`;
          const rank = String(idx + 1).padStart(2, '0');

          return (
            <article
              key={post.slug}
              className="card group flex flex-col h-full border border-line/80 bg-white transition-all duration-200 hover:border-brand/40 hover:shadow-md"
            >
              {/* Thumbnail Container with Floating Rank Pill */}
              <Link
                href={href}
                className="relative aspect-video w-full overflow-hidden bg-surface-2 shrink-0"
                tabIndex={-1}
                aria-hidden="true"
              >
                <img
                  src={img.src}
                  srcSet={img.srcSet}
                  sizes={img.sizes}
                  alt={post.altImage || post.title}
                  width={320}
                  height={180}
                  loading="lazy"
                  decoding="async"
                  className="size-full object-cover rounded-none transition-transform duration-500 group-hover:scale-105"
                />
                
                {/* Number Badge */}
                <div className="absolute top-2.5 left-2.5 flex items-center justify-center rounded-md bg-ink/85 px-2 py-0.5 text-xs font-display font-black text-white shadow-sm backdrop-blur-md">
                  {`#${rank}`}
                </div>

                <div className="absolute top-2.5 right-2.5">
                  <span className={`${chipClass} shadow-xs backdrop-blur-xs text-[10px] !py-0.5 !px-2`}>
                    {post.category.name}
                  </span>
                </div>
              </Link>

              {/* Details */}
              <div className="flex flex-1 flex-col justify-between p-4">
                <div>
                  <div className="flex items-center gap-2 text-[11px] text-muted">
                    <span>{post.author.name}</span>
                    <span aria-hidden="true">•</span>
                    <span>{readingMinutes(post.html)}m read</span>
                  </div>

                  <h3 className="font-display mt-1.5 text-sm font-bold leading-snug line-clamp-2 text-ink">
                    <Link href={href} className="no-underline transition group-hover:text-brand-strong">
                      {post.title}
                    </Link>
                  </h3>
                </div>

                <div className="mt-3 flex items-center justify-between border-t border-line/60 pt-2.5 text-[11px] text-muted">
                  <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
                  <Link
                    href={href}
                    className="inline-flex items-center gap-1 font-bold text-brand-strong hover:underline"
                  >
                    Read <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
