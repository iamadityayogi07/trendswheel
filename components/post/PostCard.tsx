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

export default function PostCard({ post, excerpt = true, priority = false, compact = false, sizes = '(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw' }: Props) {
  const href = postUrl(post.category.slug, post.slug);
  const img = imageSet(post.thumbnailImage || post.featuredImage, compact ? '112px' : sizes);
  const alt = post.altImage || post.title;

  if (compact) {
    return (
      <article className="flex gap-3">
        <Link href={href} className="shrink-0" tabIndex={-1} aria-hidden="true">
          <img src={img.src} srcSet={img.srcSet} sizes={img.sizes} alt="" width={112} height={112} loading="lazy" decoding="async" className="size-24 rounded-lg object-cover" />
        </Link>
        <div className="min-w-0">
          <Link href={categoryUrl(post.category.slug)} className="chip">
            {post.category.name}
          </Link>
          <h3 className="mt-1 text-base font-bold leading-snug">
            <Link href={href} className="no-underline hover:text-brand-strong hover:underline">
              {post.title}
            </Link>
          </h3>
        </div>
      </article>
    );
  }

  return (
    <article className="card flex h-full flex-col">
      <Link href={href} tabIndex={-1} aria-hidden="true">
        <img
          src={img.src}
          srcSet={img.srcSet}
          sizes={img.sizes}
          alt={alt}
          width={800}
          height={450}
          className="thumb"
          {...(priority ? { fetchPriority: 'high' as const } : { loading: 'lazy' as const, decoding: 'async' as const })}
        />
      </Link>
      <div className="flex flex-1 flex-col p-4">
        <div>
          <Link href={categoryUrl(post.category.slug)} className="chip">
            {post.category.name}
          </Link>
        </div>
        <h3 className="font-display mt-3 text-xl font-bold leading-snug">
          <Link href={href} className="no-underline hover:text-brand-strong hover:underline">
            {post.title}
          </Link>
        </h3>
        {excerpt && post.description && <p className="mt-2 line-clamp-3 text-ink-2">{stripHtml(post.description)}</p>}
        <p className="mt-auto pt-3 text-sm text-muted">
          <time dateTime={post.updatedAt}>{formatDate(post.updatedAt)}</time> · {readingMinutes(post.html)} min read
        </p>
      </div>
    </article>
  );
}
