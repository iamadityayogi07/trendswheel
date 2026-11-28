import Link from 'next/link';
import { type Post, readingMinutes, stripHtml } from '@/lib/content';
import { formatDate } from '@/lib/format';
import { imageSet } from '@/lib/images';
import { categoryUrl, postUrl } from '@/lib/url';

type Props = {
  featured: Post;
  sideStories: Post[];
};

const trendingTopics = [
  { name: 'Android Recovery', query: 'bootloop' },
  { name: 'Silicon & 6G', query: 'architecture' },
  { name: 'FOSS Apps', query: 'foss' },
  { name: 'Privacy Forensics', query: 'privacy' },
  { name: 'SSD & Hardware', query: 'ssd' },
  { name: 'Battery Physics', query: 'battery' },
];

export default function EditorialHero({ featured, sideStories }: Props) {
  const heroImg = imageSet(featured.featuredImage, '(min-width: 1024px) 760px, 100vw');
  const heroHref = postUrl(featured.category.slug, featured.slug);
  const heroChipClass = `chip chip-${featured.category.slug}`;

  // Extract top tags
  const displayTags = featured.tags.length > 0 ? featured.tags.slice(0, 3) : ['Diagnostics', 'Verification', 'Lab Tested'];

  return (
    <section aria-labelledby="editorial-lead" className="py-6 sm:py-8 lg:py-10">
      {/* Editorial Masthead & Topics Bar */}
      <div className="mb-6 flex flex-col gap-3.5 border-b border-line/80 pb-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2.5">
          <span className="flex size-6 items-center justify-center rounded-lg bg-brand text-xs font-black text-white shadow-xs">
            ★
          </span>
          <span className="font-display text-xs font-bold uppercase tracking-widest text-ink sm:text-sm">
            Today&apos;s Flagship Investigation
          </span>
        </div>

        {/* Quick Topic Jump Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          <span className="text-[11px] font-bold uppercase tracking-wider text-muted shrink-0">Topics:</span>
          {trendingTopics.map((topic) => (
            <Link
              key={topic.name}
              href={`/archive?q=${encodeURIComponent(topic.query)}`}
              className="inline-flex shrink-0 items-center rounded-full border border-line bg-white/90 px-2.5 py-1 text-xs font-semibold text-ink-2 transition duration-150 hover:border-brand hover:bg-brand-soft hover:text-brand-strong"
            >
              #{topic.name}
            </Link>
          ))}
        </div>
      </div>

      {/* Main Grid: Equal Height via items-stretch */}
      <div className="grid gap-8 lg:grid-cols-12 lg:items-stretch">
        {/* Left Column: Flagship Story Card (7 cols) */}
        <article className="card group relative flex flex-col h-full border border-line/90 bg-white shadow-md lg:col-span-7 transition-all duration-300 hover:shadow-xl hover:border-brand/30">
          {/* Featured Image with Badges */}
          <Link href={heroHref} className="relative aspect-[16/10] sm:aspect-video lg:h-[290px] w-full overflow-hidden bg-surface-2 shrink-0" tabIndex={-1} aria-hidden="true">
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
            <div className="absolute inset-0 bg-gradient-to-t from-ink/30 via-transparent to-transparent pointer-events-none" aria-hidden="true" />

            <div className="absolute top-4 left-4 flex flex-wrap items-center gap-2">
              <span className={`${heroChipClass} shadow-md backdrop-blur-md`}>
                {featured.category.name}
              </span>
              <span className="rounded-full bg-ink/85 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white shadow-sm backdrop-blur-md">
                Cover Story
              </span>
              <span className="hidden sm:inline-flex rounded-full bg-emerald-950/80 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-emerald-300 shadow-sm backdrop-blur-md">
                1,500+ Words
              </span>
            </div>
          </Link>

          {/* Article Info & Body */}
          <div className="flex flex-1 flex-col justify-between p-5 sm:p-6">
            <div>
              <div className="flex flex-wrap items-center gap-2.5 text-xs text-muted">
                <span className="flex items-center gap-1.5 font-bold text-ink">
                  <span className="flex size-5 items-center justify-center rounded-full bg-brand/10 text-[10px] font-bold text-brand-strong" aria-hidden="true">
                    {featured.author.name.charAt(0)}
                  </span>
                  {featured.author.name}
                </span>
                <span aria-hidden="true">•</span>
                <time dateTime={featured.publishedAt}>{formatDate(featured.publishedAt)}</time>
                <span aria-hidden="true">•</span>
                <span className="inline-flex items-center gap-1 text-brand-strong font-semibold">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 6v6l4 2" />
                  </svg>
                  {readingMinutes(featured.html)} min read
                </span>
              </div>

              <h1 id="editorial-lead" className="font-display mt-2.5 text-xl sm:text-2xl font-bold leading-snug tracking-tight text-ink line-clamp-2">
                <Link href={heroHref} className="no-underline transition hover:text-brand-strong">
                  {featured.title}
                </Link>
              </h1>

              {featured.description && (
                <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-ink-2">
                  {stripHtml(featured.description)}
                </p>
              )}
            </div>

            {/* Bottom Action Row */}
            <div className="mt-4 flex flex-wrap items-center justify-between gap-4 border-t border-line/70 pt-3.5">
              <div className="flex flex-wrap items-center gap-1.5">
                {displayTags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center rounded-md bg-surface-3 px-2 py-0.5 text-[11px] font-semibold text-ink-2"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              <Link
                href={heroHref}
                className="btn !min-h-10 !px-6 text-xs uppercase tracking-wider font-bold shadow-md"
              >
                <span>Read Full Guide</span>
                <span aria-hidden="true" className="transition group-hover:translate-x-1">→</span>
              </Link>
            </div>
          </div>
        </article>

        {/* Right Column: Unified Spotlight Panel (5 cols) matching Left Card height naturally */}
        <aside aria-label="Spotlight Deep Dives" className="card flex flex-col h-full border border-line/90 bg-white shadow-md lg:col-span-5 overflow-hidden">
          {/* Panel Header */}
          <div className="flex items-center justify-between border-b border-line bg-surface-2/60 px-5 py-3 shrink-0">
            <div className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-brand" aria-hidden="true" />
              <h2 className="font-display text-xs font-bold uppercase tracking-widest text-ink">
                Spotlight Deep Dives
              </h2>
            </div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-brand-strong">
              Editor Selected
            </span>
          </div>

          {/* 4 Content-Filled Editorial Rows (Zero artificial white space) */}
          <div className="flex flex-1 flex-col divide-y divide-line/60">
            {sideStories.slice(0, 4).map((post, idx) => {
              const href = postUrl(post.category.slug, post.slug);
              const img = imageSet(post.thumbnailImage || post.featuredImage, '160px');
              const chipClass = `chip chip-${post.category.slug}`;
              const rankLabels = [
                '01 · MOST POPULAR',
                '02 · TRENDING TECH',
                '03 · SYSTEM GUIDE',
                '04 · PRIVACY AUDIT',
              ];

              return (
                <article
                  key={post.slug}
                  className="group flex flex-1 items-center gap-3.5 px-4 py-3 sm:px-5 transition duration-150 hover:bg-brand-soft/25"
                >
                  {/* Thumbnail */}
                  <Link
                    href={href}
                    className="relative aspect-video w-24 sm:w-28 shrink-0 overflow-hidden rounded-lg bg-surface-2 shadow-2xs"
                    tabIndex={-1}
                    aria-hidden="true"
                  >
                    <img
                      src={img.src}
                      srcSet={img.srcSet}
                      sizes={img.sizes}
                      alt=""
                      width={200}
                      height={112}
                      loading="lazy"
                      decoding="async"
                      className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </Link>

                  {/* Story Details */}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-brand-strong">
                        {rankLabels[idx] || `0${idx + 1} · RECOMMENDED`}
                      </span>
                      <span className="text-[10px] text-muted">
                        {readingMinutes(post.html)}m
                      </span>
                    </div>

                    <h3 className="font-display mt-0.5 text-xs sm:text-[13px] font-bold leading-snug line-clamp-2 text-ink">
                      <Link href={href} className="no-underline transition group-hover:text-brand-strong">
                        {post.title}
                      </Link>
                    </h3>

                    {post.description && (
                      <p className="mt-0.5 text-[11px] text-muted line-clamp-1">
                        {stripHtml(post.description)}
                      </p>
                    )}

                    <div className="mt-1 flex items-center justify-between gap-2 text-xs">
                      <Link href={categoryUrl(post.category.slug)} className={chipClass}>
                        {post.category.name}
                      </Link>
                      <span className="text-[10px] text-muted">
                        {formatDate(post.publishedAt)}
                      </span>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </aside>
      </div>
    </section>
  );
}
