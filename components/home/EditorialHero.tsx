import Link from 'next/link';
import { type Post, readingMinutes, stripHtml } from '@/lib/content';
import { formatDate } from '@/lib/format';
import { imageSet } from '@/lib/images';
import { categoryUrl, postUrl } from '@/lib/url';

type Props = {
  featured: Post;
  sideStories: Post[];
};

export default function EditorialHero({ featured, sideStories }: Props) {
  const heroImg = imageSet(featured.featuredImage, '(min-width: 1024px) 680px, 100vw');
  const heroHref = postUrl(featured.category.slug, featured.slug);
  const heroChipClass = `chip chip-${featured.category.slug}`;

  return (
    <section aria-labelledby="editorial-lead" className="py-6 sm:py-8 lg:py-10">
      <div className="grid gap-8 lg:grid-cols-12 lg:items-start">
        {/* Main Flagship Story (7 cols) */}
        <article className="card group relative flex flex-col border border-line/80 bg-white lg:col-span-7">
          <Link href={heroHref} className="relative aspect-video w-full overflow-hidden bg-surface-2" tabIndex={-1} aria-hidden="true">
            <img
              src={heroImg.src}
              srcSet={heroImg.srcSet}
              sizes={heroImg.sizes}
              alt={featured.altImage || featured.title}
              width={1200}
              height={675}
              fetchPriority="high"
              className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            />
            <div className="absolute top-4 left-4 flex items-center gap-2">
              <span className={`${heroChipClass} shadow-md backdrop-blur-md`}>
                {featured.category.name}
              </span>
              <span className="rounded-full bg-ink/75 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider text-white shadow-xs backdrop-blur-md">
                Lead Story
              </span>
            </div>
          </Link>

          <div className="flex flex-1 flex-col p-6 sm:p-8">
            <div className="flex items-center gap-2.5 text-xs text-muted">
              <span className="font-semibold text-ink-2">{featured.author.name}</span>
              <span aria-hidden="true">•</span>
              <time dateTime={featured.publishedAt}>{formatDate(featured.publishedAt)}</time>
              <span aria-hidden="true">•</span>
              <span>{readingMinutes(featured.html)} min read</span>
            </div>

            <h1 id="editorial-lead" className="font-display mt-3 text-2xl font-bold leading-tight tracking-tight sm:text-3xl lg:text-4xl text-ink">
              <Link href={heroHref} className="no-underline transition hover:text-brand-strong">
                {featured.title}
              </Link>
            </h1>

            {featured.description && (
              <p className="mt-3 line-clamp-3 text-base leading-relaxed text-ink-2">
                {stripHtml(featured.description)}
              </p>
            )}

            <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-line/60 pt-5">
              <div className="flex items-center gap-2 text-xs font-semibold text-muted">
                <span className="inline-block size-2 rounded-full bg-emerald-500" aria-hidden="true" />
                Verified In-Depth Guide ({featured.tags.slice(0, 2).join(', ')})
              </div>
              <Link
                href={heroHref}
                className="btn !min-h-11 !px-6 text-sm"
              >
                Read Deep Dive
                <span aria-hidden="true" className="transition group-hover:translate-x-1">→</span>
              </Link>
            </div>
          </div>
        </article>

        {/* Right Stack: Top Editor Picks (5 cols) */}
        <div className="flex flex-col gap-4 lg:col-span-5">
          <div className="flex items-center justify-between border-b border-line pb-2.5">
            <h2 className="font-display text-sm font-bold uppercase tracking-widest text-ink">
              Spotlight Stories
            </h2>
            <span className="text-xs font-semibold text-brand-strong">
              Editorial Selected
            </span>
          </div>

          <div className="space-y-3.5">
            {sideStories.map((post, idx) => {
              const href = postUrl(post.category.slug, post.slug);
              const img = imageSet(post.thumbnailImage || post.featuredImage, '160px');
              const chipClass = `chip chip-${post.category.slug}`;

              return (
                <article
                  key={post.slug}
                  className="card group flex items-start gap-4 p-4 border border-line/70 bg-white transition-all hover:border-brand/40"
                >
                  <Link
                    href={href}
                    className="relative aspect-video w-32 shrink-0 overflow-hidden rounded-lg bg-surface-2 sm:w-36"
                    tabIndex={-1}
                    aria-hidden="true"
                  >
                    <img
                      src={img.src}
                      srcSet={img.srcSet}
                      sizes={img.sizes}
                      alt=""
                      width={240}
                      height={135}
                      loading="lazy"
                      decoding="async"
                      className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </Link>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <Link href={categoryUrl(post.category.slug)} className={chipClass}>
                        {post.category.name}
                      </Link>
                      <span className="text-[11px] text-muted">
                        {readingMinutes(post.html)}m
                      </span>
                    </div>

                    <h3 className="font-display mt-1.5 text-base font-bold leading-snug line-clamp-2 text-ink">
                      <Link href={href} className="no-underline transition hover:text-brand-strong">
                        {post.title}
                      </Link>
                    </h3>

                    <p className="mt-1 text-xs text-muted">
                      {formatDate(post.publishedAt)}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
