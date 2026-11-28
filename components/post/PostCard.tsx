import Link from 'next/link';
import { type Post, readingMinutes, stripHtml } from '@/lib/content';
import { formatDate } from '@/lib/format';
import { imageSet } from '@/lib/images';
import { categoryUrl, postUrl } from '@/lib/url';

type Props = {
  post: Post;
  /** Show the short excerpt under the title. */
  excerpt?: boolean;
  /** First card above the fold: eager + high priority. */
  priority?: boolean;
  /** Compact horizontal card (sidebars, lists). */
  compact?: boolean;
  sizes?: string;
};

export default function PostCard({
  post,
  excerpt = true,
  priority = false,
  compact = false,
  sizes = '(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw',
}: Props) {
  const href = postUrl(post.category.slug, post.slug);
  const img = imageSet(post.thumbnailImage || post.featuredImage, compact ? '112px' : sizes);
  const alt = post.altImage || post.title;
  const chipClass = `chip chip-${post.category.slug}`;

  if (compact) {
    return (
      <article className="group flex items-center gap-3.5 rounded-xl p-2 transition duration-200 hover:bg-surface-2">
        <Link href={href} className="relative size-20 shrink-0 overflow-hidden rounded-lg bg-surface-2" tabIndex={-1} aria-hidden="true">
          <img
            src={img.src}
            srcSet={img.srcSet}
            sizes={img.sizes}
            alt=""
            width={112}
            height={112}
            loading="lazy"
            decoding="async"
            className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </Link>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <Link href={categoryUrl(post.category.slug)} className={chipClass}>
              {post.category.name}
            </Link>
            <span className="text-[11px] text-muted">
              {readingMinutes(post.html)}m read
            </span>
          </div>
          <h3 className="mt-1 text-sm font-bold leading-snug line-clamp-2">
            <Link href={href} className="text-ink no-underline transition hover:text-brand-strong">
              {post.title}
            </Link>
          </h3>
        </div>
      </article>
    );
  }

  return (
    <article className="card group flex h-full flex-col border border-line/80 bg-white">
      <Link href={href} className="relative aspect-video w-full overflow-hidden bg-surface-2" tabIndex={-1} aria-hidden="true">
        <img
          src={img.src}
          srcSet={img.srcSet}
          sizes={img.sizes}
          alt={alt}
          width={800}
          height={450}
          className="size-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          {...(priority ? { fetchPriority: 'high' as const } : { loading: 'lazy' as const, decoding: 'async' as const })}
        />
        <div className="absolute top-3 left-3">
          <span className={`${chipClass} shadow-xs backdrop-blur-xs`}>
            {post.category.name}
          </span>
        </div>
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center gap-2 text-xs text-muted">
          <span className="font-medium text-ink-2">{post.author.name}</span>
          <span aria-hidden="true">•</span>
          <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
          <span aria-hidden="true">•</span>
          <span>{readingMinutes(post.html)} min read</span>
        </div>

        <h3 className="font-display mt-2.5 text-lg font-bold leading-snug text-ink">
          <Link href={href} className="no-underline transition hover:text-brand-strong">
            {post.title}
          </Link>
        </h3>

        {excerpt && post.description && (
          <p className="mt-2.5 line-clamp-2 text-sm leading-relaxed text-ink-2">
            {stripHtml(post.description)}
          </p>
        )}

        <div className="mt-auto flex items-center justify-between pt-4 border-t border-line/60 text-xs">
          <span className="font-semibold text-muted">Verified Guide</span>
          <Link href={href} className="inline-flex items-center gap-1 font-bold text-brand-strong hover:underline">
            Read Guide <span aria-hidden="true" className="transition group-hover:translate-x-0.5">→</span>
          </Link>
        </div>
      </div>
    </article>
  );
}
