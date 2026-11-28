import Link from 'next/link';
import type { Category, Post } from '@/lib/content';
import { categoryUrl, postUrl } from '@/lib/url';
import PostCard from '@/components/post/PostCard';

type Props = {
  category: Category;
  posts: Post[];
  totalCount: number;
};

const categoryDescriptions: Record<string, string> = {
  'how-to': 'Step-by-step system diagnostics, bootloop recovery, and root-level problem solving.',
  'apps': 'Open source, privacy-focused software, FOSS alternatives, and verified toolkits.',
  'tech': 'Hardware architectures, silicon packaging, wireless standards, and next-gen physics.',
  'social': 'Platform privacy audits, tracking defense, forensic metadata, and zero-trust security.',
};

export default function CategoryHubSection({ category, posts, totalCount }: Props) {
  if (!posts || posts.length === 0) return null;

  const href = categoryUrl(category.slug);
  const desc = categoryDescriptions[category.slug] || category.metaDescription;
  const chipClass = `chip chip-${category.slug}`;

  return (
    <section aria-labelledby={`cat-heading-${category.slug}`} className="my-14 border-t border-line/60 pt-10">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2.5">
            <span className={chipClass}>{category.name}</span>
            <span className="text-xs font-semibold text-muted">
              {totalCount} Verified Guides
            </span>
          </div>
          <h2 id={`cat-heading-${category.slug}`} className="font-display mt-2 text-2xl font-bold tracking-tight text-ink sm:text-3xl">
            {category.name} Hub
          </h2>
          <p className="mt-1 text-sm text-ink-2 max-w-2xl">
            {desc}
          </p>
        </div>

        <Link
          href={href}
          className="inline-flex items-center gap-1.5 text-sm font-bold text-brand-strong hover:underline shrink-0"
        >
          <span>Explore all {category.name}</span>
          <span aria-hidden="true">→</span>
        </Link>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.slice(0, 6).map((p) => (
          <PostCard key={p.slug} post={p} priority={false} />
        ))}
      </div>
    </section>
  );
}
