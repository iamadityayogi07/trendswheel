import type { Metadata } from 'next';
import { Fragment } from 'react';
import Link from 'next/link';
import AboutSection from '@/components/home/AboutSection';
import TrustSection from '@/components/home/TrustSection';
import EditorialHero from '@/components/home/EditorialHero';
import TrendingStrip from '@/components/home/TrendingStrip';
import CategoryHubSection from '@/components/home/CategoryHubSection';
import NewsletterCard from '@/components/home/NewsletterCard';
import AdUnit from '@/components/ads/AdUnit';
import JsonLd from '@/components/JsonLd';
import Faq from '@/components/post/Faq';
import PostCard from '@/components/post/PostCard';
import { homeFaq } from '@/config/home-content';
import { HOME_TITLE } from '@/config/site';
import { getAllPosts, getCategories, getPostsByCategory, getSite } from '@/lib/content';
import { faqSchema, homeMetadata, websiteSchema } from '@/lib/seo';
import { absoluteUrl, archiveUrl, categoryUrl } from '@/lib/url';

export const metadata: Metadata = homeMetadata(HOME_TITLE);

export default function HomePage() {
  const site = getSite();
  const allPosts = getAllPosts();
  const categories = getCategories();

  // Top Editorial Curation:
  // Post 0: Main Flagship Lead Story
  // Posts 1..4: Spotlight Deep Dives (4 rich editorial stories matching lead card height 1:1)
  // Posts 5..8: Trending Highlights (4 posts)
  // Posts 9..14: Latest In-Depth Guides (6 posts)
  const featured = allPosts[0];
  const sideStories = allPosts.slice(1, 5);
  const trending = allPosts.slice(5, 9);
  const latestArticles = allPosts.slice(9, 15);

  // Category Hubs: extract top 6 primary posts per category (2 rows of 3)
  const categorySections = categories.map((cat) => {
    const catPosts = getPostsByCategory(cat.slug);
    return {
      category: cat,
      posts: catPosts.slice(0, 6),
      totalCount: catPosts.length,
    };
  });

  const faqLd = faqSchema(homeFaq, `${absoluteUrl('/')}#faq`);

  return (
    <>
      <JsonLd data={websiteSchema()} />
      {faqLd && <JsonLd data={faqLd} />}

      {/* Main Editorial Hero Band */}
      <div className="hero-band border-b border-line/70">
        <div className="container-page">
          <EditorialHero featured={featured} sideStories={sideStories} />
        </div>
      </div>

      <div className="container-page pb-12">
        {/* AdSense Placement #1: High-RPM Top Billboard (placed before Trending for 85%+ Active View rate) */}
        <AdUnit kind="leaderboard" className="my-6" />

        {/* Trending Highlights Strip */}
        <TrendingStrip posts={trending} />

        {/* AdSense Placement #2: High-CTR Native In-Feed Unit */}
        <AdUnit kind="inFeed" className="my-8" />

        {/* Latest In-Depth Guides Section */}
        <section className="mt-8" aria-labelledby="latest-heading">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-line/80 pb-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-brand-strong">
                Continuous Research
              </span>
              <h2 id="latest-heading" className="font-display mt-1 text-2xl font-bold tracking-tight text-ink sm:text-3xl">
                Latest Deep Dives &amp; Field Guides
              </h2>
            </div>
            <Link
              href={archiveUrl()}
              className="inline-flex items-center gap-1.5 font-bold text-sm text-brand-strong hover:underline"
            >
              <span>View all 248 guides in archive</span>
              <span aria-hidden="true">→</span>
            </Link>
          </div>

          <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {latestArticles.map((p) => (
              <li key={p.slug}>
                <PostCard post={p} />
              </li>
            ))}
          </ul>
        </section>

        {/* Category-Wise Dedicated In-Depth Hubs */}
        <div className="mt-12 space-y-4">
          {categorySections.map(({ category, posts, totalCount }, index) => (
            <Fragment key={category.slug}>
              <CategoryHubSection
                category={category}
                posts={posts}
                totalCount={totalCount}
              />
              {/* Strategic AdSense placements between Category Hubs for continuous engagement */}
              {index === 0 && <AdUnit kind="inFeed" className="my-8" />}
              {index === 2 && <AdUnit kind="display" className="my-8" />}
            </Fragment>
          ))}
        </div>

        {/* Modern Editorial Newsletter Dispatch */}
        <NewsletterCard />

        {/* Authority & Trust Standards */}
        <TrustSection />

        {/* Editorial About Section */}
        <AboutSection site={site} />

        {/* AdSense Placement #3: Bottom Display Unit */}
        <AdUnit kind="display" className="my-10" />

        {/* Frequently Asked Questions */}
        <Faq items={homeFaq} heading="Frequently Asked Questions" centered />
      </div>
    </>
  );
}
