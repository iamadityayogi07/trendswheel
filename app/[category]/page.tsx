import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import AdUnit from '@/components/ads/AdUnit';
import CategoryFeedClient, {
  type CategoryPostSummary,
} from '@/components/category/CategoryFeedClient';
import CategoryNewsletter from '@/components/category/CategoryNewsletter';
import RelatedCategories from '@/components/category/RelatedCategories';
import JsonLd from '@/components/JsonLd';
import Breadcrumbs from '@/components/post/Breadcrumbs';
import Faq from '@/components/post/Faq';
import { categoryCopy } from '@/config/category-content';
import {
  getCategories,
  getCategory,
  getPopularPosts,
  getPostsByCategory,
  getSite,
  readingMinutes,
  stripHtml,
  type Post,
} from '@/lib/content';
import { imageSet } from '@/lib/images';
import { categoryMetadata, categorySchemas } from '@/lib/seo';
import { postUrl } from '@/lib/url';

export const dynamicParams = false;

type Params = { category: string };

export const generateStaticParams = (): Params[] =>
  getCategories().map((c) => ({ category: c.slug }));

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { category } = await params;
  const c = getCategory(category);
  return c ? categoryMetadata(c) : {};
}

function toSummary(p: Post): CategoryPostSummary {
  return {
    id: p.id,
    slug: p.slug,
    title: p.title,
    description: stripHtml(p.description || p.excerpt),
    publishedAt: p.publishedAt,
    readMinutes: readingMinutes(p.html),
    impressions: p.impressions,
    tags: p.tags,
    href: postUrl(p.category.slug, p.slug),
    img: imageSet(p.thumbnailImage || p.featuredImage, '260px'),
    alt: p.altImage || p.title,
  };
}

const bannerThemes: Record<string, { bg: string; iconBg: string }> = {
  'how-to': {
    bg: 'from-[#eef2ff] via-[#f5f3ff] to-[#eef6ff] border-indigo-100',
    iconBg: 'from-indigo-500 to-violet-600',
  },
  apps: {
    bg: 'from-[#f0f9ff] via-[#eef2ff] to-[#f5f3ff] border-sky-100',
    iconBg: 'from-sky-500 to-indigo-600',
  },
  tech: {
    bg: 'from-[#ecfdf5] via-[#f0fdfa] to-[#eef2ff] border-emerald-100',
    iconBg: 'from-emerald-500 to-teal-600',
  },
  social: {
    bg: 'from-[#fff1f2] via-[#fdf2f8] to-[#f5f3ff] border-pink-100',
    iconBg: 'from-pink-500 to-rose-600',
  },
};

export default async function CategoryPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { category } = await params;
  const c = getCategory(category);
  if (!c) notFound();

  const site = getSite();
  const posts = getPostsByCategory(c.slug);
  const copy = categoryCopy[c.slug];
  const popular = getPopularPosts(5, c.slug).map(toSummary);
  const latest = posts.slice(0, 3).map(toSummary);
  const summaries = posts.map(toSummary);
  const allCategories = getCategories().map((x) => ({
    name: x.name,
    slug: x.slug,
    count: getPostsByCategory(x.slug).length,
  }));

  const relatedCategories = getCategories()
    .filter((cat) => cat.slug !== c.slug)
    .map((cat) => {
      const catPosts = getPostsByCategory(cat.slug);
      return {
        category: cat,
        posts: catPosts.slice(0, 3),
        totalCount: catPosts.length,
      };
    });

  const theme = bannerThemes[c.slug] || bannerThemes['how-to'];

  return (
    <>
      {categorySchemas(c, posts).map((s, i) => (
        <JsonLd key={i} data={s} />
      ))}

      <div className="container-page pt-5 pb-12">
        {/* Breadcrumbs */}
        <Breadcrumbs
          items={[{ name: 'Home', href: '/' }, { name: c.name }]}
        />

        {/* Modern Category Hero Banner */}
        <header
          className={`mt-4 relative overflow-hidden rounded-2xl border bg-gradient-to-r p-6 sm:p-8 lg:px-10 lg:py-9 shadow-2xs ${theme.bg}`}
        >
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="max-w-2xl">
              <div className="flex items-center gap-4">
                <span
                  className={`flex size-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br text-white shadow-md ${theme.iconBg}`}
                  aria-hidden="true"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m12 2 9 4.9v10.2L12 22l-9-4.9V6.9L12 2z" />
                    <path d="m12 22 9-4.9M12 22V11.8M12 11.8 3 6.9M12 11.8l9-4.9" />
                  </svg>
                </span>
                <div>
                  <h1 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-ink">
                    {copy?.heading ?? `${c.name} Guides`}
                  </h1>
                  <p className="mt-1 text-xs sm:text-sm text-ink-2 leading-relaxed">
                    {c.metaDescription || copy?.intro?.[0]}
                  </p>
                </div>
              </div>

              {/* Metadata Pills */}
              <div className="mt-5 flex flex-wrap items-center gap-2.5 text-xs font-semibold">
                <span className="inline-flex items-center gap-1.5 rounded-lg bg-white/90 border border-line/70 px-3 py-1.5 text-ink shadow-2xs">
                  <span aria-hidden="true">📄</span>
                  <span>{posts.length} Guides</span>
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-lg bg-white/90 border border-line/70 px-3 py-1.5 text-ink shadow-2xs">
                  <span aria-hidden="true">✓</span>
                  <span>Hardware Verified</span>
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-lg bg-white/90 border border-line/70 px-3 py-1.5 text-ink shadow-2xs">
                  <span aria-hidden="true">📅</span>
                  <span>Updated Weekly</span>
                </span>
              </div>
            </div>

            {/* Decorative Vector Checklist Graphic (Right) */}
            <div className="hidden md:block shrink-0 opacity-90" aria-hidden="true">
              <svg width="180" height="115" viewBox="0 0 180 115" fill="none">
                <rect x="24" y="12" width="132" height="86" rx="10" fill="white" fillOpacity="0.9" stroke="#C7D2FE" strokeWidth="2" />
                <rect x="10" y="96" width="160" height="10" rx="5" fill="#C7D2FE" />
                <rect x="44" y="28" width="92" height="14" rx="4" fill="#EEF2FF" />
                <circle cx="52" cy="35" r="3.5" fill="#6366F1" />
                <rect x="62" y="33" width="58" height="4" rx="2" fill="#818CF8" />
                <rect x="44" y="50" width="92" height="14" rx="4" fill="#EEF2FF" />
                <circle cx="52" cy="57" r="3.5" fill="#10B981" />
                <rect x="62" y="55" width="48" height="4" rx="2" fill="#A5B4FC" />
                <rect x="44" y="72" width="92" height="14" rx="4" fill="#EEF2FF" />
                <circle cx="52" cy="79" r="3.5" fill="#F97316" />
                <rect x="62" y="77" width="64" height="4" rx="2" fill="#A5B4FC" />
              </svg>
            </div>
          </div>
        </header>

        {/* Top High-RPM Leaderboard Ad */}
        <AdUnit kind="leaderboard" className="my-6" />

        {/* 3-Column Interactive Category Layout */}
        <CategoryFeedClient
          category={{ name: c.name, slug: c.slug }}
          posts={summaries}
          popular={popular}
          latest={latest}
          allCategories={allCategories}
          socialLinks={site.social}
        />

        {/* Related Categories: 3 Posts Each */}
        <RelatedCategories
          currentCategoryName={c.name}
          relatedCategories={relatedCategories}
        />

        {/* High-Impact Pre-FAQ Display Unit */}
        <AdUnit kind="display" className="my-10" />

        {/* Category Knowledge Base FAQ */}
        <div className="mt-10">
          <Faq items={c.faq} heading="Frequently Asked Questions (FAQs)" />
        </div>

        {/* Bottom Horizontal Newsletter Banner */}
        <CategoryNewsletter variant="banner" categoryName={c.name} />
      </div>
    </>
  );
}
