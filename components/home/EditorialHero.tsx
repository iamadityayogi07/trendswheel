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

  // Extract top tags or fallback
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
          <span className="hidden text-line sm:inline" aria-hidden="true">|</span>
          <span className="hidden items-center gap-1.5 text-xs font-medium text-muted sm:inline-flex">
            <span className="size-2 rounded-full bg-emerald-500 animate-pulse" aria-hidden="true" />
            Independent Lab Analysis
          </span>
        </div>

        {/* Quick Topic Jump Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          <span className="text-[11px] font-bold uppercase tracking-wider text-muted shrink-0">Topics:</span>
          {trendingTopics.map((topic) => (
            <Link
              key={topic.name}
              href={`/archive?q=${encodeURIComponent(topic.query)}`}
              className="inline-flex shrink-0 items-center rounded-full border border-line bg-white px-2.5 py-1 text-xs font-semibold text-ink-2 transition duration-150 hover:border-brand hover:bg-brand-soft hover:text-brand-strong"
            >
              #{topic.name}
            </Link>
          ))}
        </div>
      </div>

      {/* Main Grid: Flagship Story (7 cols) + Spotlight Stories (5 cols) */}
      <div className="grid gap-8 lg:grid-cols-12 lg:items-start">
        {/* Left Column: Flagship Story Showcase */}
        <article className="card group relative flex flex-col border border-line/90 bg-white shadow-md lg:col-span-7 transition-all duration-300 hover:shadow-xl hover:border-brand/30">
          {/* Featured Image with Badges */}
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
          <div className="flex flex-1 flex-col p-6 sm:p-8">
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

            <h1 id="editorial-lead" className="font-display mt-3.5 text-2xl font-bold leading-tight tracking-tight sm:text-3xl lg:text-[2.25rem] text-ink">
              <Link href={heroHref} className="no-underline transition hover:text-brand-strong">
                {featured.title}
              </Link>
            </h1>

            {featured.description && (
              <p className="mt-3.5 line-clamp-3 text-base leading-relaxed text-ink-2">
                {stripHtml(featured.description)}
              </p>
            )}

            {/* Key Takeaways Callout Box */}
            <div className="mt-5 rounded-xl border border-line-subtle bg-surface-2/80 p-3.5 text-xs text-ink-2">
              <div className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-brand-strong mb-1.5">
                <span className="size-1.5 rounded-full bg-brand" aria-hidden="true" />
                Inside This Investigation:
              </div>
              <p className="leading-relaxed">
                Step-by-step diagnostic workflows, forensic packet/hardware traces, verified mitigation parameters, and complete lab-tested instructions.
              </p>
            </div>

            {/* Action Bar */}
            <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-line/70 pt-5">
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
                className="btn !min-h-11 !px-7 text-sm shadow-md"
              >
                <span>Read Full Investigation</span>
                <span aria-hidden="true" className="transition group-hover:translate-x-1">→</span>
              </Link>
            </div>
          </div>
        </article>

        {/* Right Column: Editor's Must-Read Showcase (5 cols) */}
        <div className="flex flex-col gap-4 lg:col-span-5">
          <div className="flex items-center justify-between border-b border-line pb-2.5">
            <div className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-brand" aria-hidden="true" />
              <h2 className="font-display text-sm font-bold uppercase tracking-widest text-ink">
                Spotlight Deep Dives
              </h2>
            </div>
            <span className="text-xs font-semibold text-brand-strong">
              Editor Selected
            </span>
          </div>

          <div className="space-y-3.5">
            {sideStories.map((post, idx) => {
              const href = postUrl(post.category.slug, post.slug);
              const img = imageSet(post.thumbnailImage || post.featuredImage, '180px');
              const chipClass = `chip chip-${post.category.slug}`;
              const rankLabels = ['01 · LAB VERIFIED', '02 · TRENDING TECH', '03 · EDITORIAL PICK'];

              return (
                <article
                  key={post.slug}
                  className="card group flex items-start gap-4 p-4 border border-line/80 bg-white transition-all duration-200 hover:border-brand/40 hover:shadow-md"
                >
                  <Link
                    href={href}
                    className="relative aspect-video w-32 shrink-0 overflow-hidden rounded-xl bg-surface-2 sm:w-36 shadow-xs"
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
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-brand-strong">
                        {rankLabels[idx] || `0${idx + 1} · RECOMMENDED`}
                      </span>
                      <span className="text-[11px] text-muted">
                        {readingMinutes(post.html)}m
                      </span>
                    </div>

                    <h3 className="font-display mt-1 text-sm sm:text-base font-bold leading-snug line-clamp-2 text-ink">
                      <Link href={href} className="no-underline transition hover:text-brand-strong">
                        {post.title}
                      </Link>
                    </h3>

                    <div className="mt-2 flex items-center justify-between gap-2 text-xs">
                      <Link href={categoryUrl(post.category.slug)} className={chipClass}>
                        {post.category.name}
                      </Link>
                      <span className="text-[11px] text-muted">
                        {formatDate(post.publishedAt)}
                      </span>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          {/* Quick Authority Banner below Spotlight */}
          <div className="rounded-2xl border border-line/70 bg-gradient-to-br from-surface-2 to-white p-4 text-xs text-ink-2 shadow-2xs">
            <div className="flex items-center gap-2 font-bold text-ink">
              <span className="flex size-5 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 font-bold" aria-hidden="true">
                ✓
              </span>
              <span>100% Original Forensic Benchmarks</span>
            </div>
            <p className="mt-1 text-muted leading-relaxed">
              Every guide on TrendsWheel is thoroughly written, tested on actual hardware, and checked against carrier and OS telemetry.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
