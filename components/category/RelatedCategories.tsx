import Link from 'next/link';
import type { Category, Post } from '@/lib/content';
import { categoryUrl } from '@/lib/url';
import PostCard from '@/components/post/PostCard';

type RelatedCategoryData = {
  category: Category;
  posts: Post[];
  totalCount: number;
};

type Props = {
  currentCategoryName: string;
  relatedCategories: RelatedCategoryData[];
};

const categoryDescriptions: Record<string, string> = {
  'how-to': 'Step-by-step diagnostics, recovery guides, and system tweaks.',
  'apps': 'Open source software, privacy-first tools, and verified mobile utilities.',
  'tech': 'Hardware architecture, wireless standards, silicon, and modern protocols.',
  'social': 'Platform privacy audits, security defense, tracking protection, and OPSEC.',
};

export default function RelatedCategories({
  currentCategoryName,
  relatedCategories,
}: Props) {
  if (!relatedCategories || relatedCategories.length === 0) return null;

  return (
    <section
      aria-labelledby="related-categories-heading"
      className="mt-14 border-t border-line/80 pt-10"
    >
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-line/60">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex size-5 items-center justify-center rounded-md bg-brand/10 text-[11px] font-bold text-brand-strong">
              ★
            </span>
            <span className="text-xs font-bold uppercase tracking-widest text-brand-strong">
              Explore More Topics
            </span>
          </div>
          <h2
            id="related-categories-heading"
            className="font-display mt-1.5 text-2xl sm:text-3xl font-bold tracking-tight text-ink"
          >
            Related Categories &amp; Recommended Guides
          </h2>
          <p className="mt-1.5 text-xs sm:text-sm text-ink-2 max-w-2xl leading-relaxed">
            Expand your technical toolkit beyond {currentCategoryName}. Explore top-rated guides across our other editorial desks.
          </p>
        </div>
      </div>

      {/* Category Groups: 3 Posts Each */}
      <div className="mt-8 space-y-12">
        {relatedCategories.map(({ category, posts, totalCount }) => {
          const href = categoryUrl(category.slug);
          const desc = categoryDescriptions[category.slug] || category.metaDescription;

          return (
            <div key={category.slug} className="space-y-5">
              {/* Individual Category Sub-header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-xl bg-surface-2/60 border border-line/60 px-4 py-3 sm:px-5">
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className={`chip chip-${category.slug}`}>
                    {category.name}
                  </span>
                  <span className="text-xs font-semibold text-muted">
                    {totalCount} Verified Guides
                  </span>
                  <span className="hidden md:inline text-xs text-ink-2/80">
                    — {desc}
                  </span>
                </div>

                <Link
                  href={href}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-strong hover:underline shrink-0"
                >
                  <span>Explore All {category.name}</span>
                  <span aria-hidden="true">→</span>
                </Link>
              </div>

              {/* 3 Posts Grid */}
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {posts.slice(0, 3).map((post) => (
                  <PostCard key={post.slug} post={post} priority={false} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
