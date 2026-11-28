'use client';

import Link from 'next/link';
import { Fragment, useMemo, useState } from 'react';
import AdUnit from '@/components/ads/AdUnit';
import { formatDate } from '@/lib/format';
import { categoryUrl } from '@/lib/url';
import CategoryNewsletter from './CategoryNewsletter';

export type CategoryPostSummary = {
  id: number;
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  readMinutes: number;
  impressions: number;
  tags: string[];
  href: string;
  img: { src: string; srcSet?: string; sizes?: string };
  alt: string;
};

type CategoryNavItem = {
  name: string;
  slug: string;
  count?: number;
};

type Props = {
  category: CategoryNavItem;
  posts: CategoryPostSummary[];
  popular: CategoryPostSummary[];
  latest: CategoryPostSummary[];
  allCategories: CategoryNavItem[];
  socialLinks: Record<string, string>;
};

type SubtopicRule = {
  id: string;
  label: string;
  pattern: RegExp;
};

const subtopicRulesByCategory: Record<string, SubtopicRule[]> = {
  'how-to': [
    { id: 'android', label: 'Android How-To', pattern: /\b(android|pixel|samsung|galaxy|apk|adb|bootloader|fastboot|play store|gboard|battery)\b/i },
    { id: 'windows', label: 'Windows & PC', pattern: /\b(windows|pc|laptop|ssd|nvme|bios|driver|powershell|desktop)\b/i },
    { id: 'iphone', label: 'iPhone & iOS', pattern: /\b(iphone|ios|ipad|apple|safari|icloud|airdrop)\b/i },
    { id: 'web', label: 'Internet & Web', pattern: /\b(wifi|router|dns|vpn|webrtc|browser|chrome|firefox|gmail|email|network)\b/i },
    { id: 'social', label: 'Social Media How-To', pattern: /\b(whatsapp|instagram|facebook|twitter|tiktok|youtube|snapchat|discord|telegram)\b/i },
  ],
  apps: [
    { id: 'ai', label: 'AI & Productivity', pattern: /\b(ai|llm|gpt|gemini|claude|copilot|productivity|notes|automation)\b/i },
    { id: 'foss', label: 'FOSS & Open Source', pattern: /\b(foss|open[- ]source|f-droid|github|linux|libre)\b/i },
    { id: 'privacy', label: 'Privacy & Security Apps', pattern: /\b(privacy|vpn|encrypted|password|2fa|authenticator|signal|proton|tracker)\b/i },
    { id: 'mobile', label: 'Mobile Utilities', pattern: /\b(android|ios|launcher|browser|file manager|camera|keyboard)\b/i },
  ],
  tech: [
    { id: 'hardware', label: 'Hardware & Silicon', pattern: /\b(ssd|nvme|cpu|gpu|npu|chip|silicon|ram|battery|display|oled|usb)\b/i },
    { id: 'security', label: 'Security & Forensics', pattern: /\b(security|forensic|privacy|encryption|zero[- ]day|malware|telemetry|opsec)\b/i },
    { id: 'network', label: 'Networking & 6G', pattern: /\b(5g|6g|wifi|bluetooth|dns|quic|http|webrtc|router|satellite)\b/i },
    { id: 'os', label: 'OS & Architecture', pattern: /\b(android|linux|kernel|aosp|windows|filesystem|sandbox|virtualization)\b/i },
  ],
  social: [
    { id: 'privacy', label: 'Privacy & OPSEC', pattern: /\b(privacy|exif|metadata|geofenc|opsec|opt[- ]out|scraping|tracking|leak)\b/i },
    { id: 'security', label: 'Account & Stream Security', pattern: /\b(security|2fa|phishing|swatting|sniping|ip leak|whisper|hack)\b/i },
    { id: 'algorithms', label: 'Algorithms & Feeds', pattern: /\b(algorithm|personalization|feed|recommendation|embedding|grok|ai)\b/i },
  ],
};

const socialIcons: Record<string, React.ReactNode> = {
  youtube: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31.4 31.4 0 0 0 0 12a31.4 31.4 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31.4 31.4 0 0 0 24 12a31.4 31.4 0 0 0-.5-5.8ZM9.6 15.6V8.4l6.3 3.6-6.3 3.6Z" />
    </svg>
  ),
  x: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.2 2.25h3.3l-7.2 8.23L22.8 21.75h-6.64l-5.2-6.8-5.95 6.8H1.7l7.7-8.8L1.2 2.25h6.8l4.7 6.21 5.5-6.21Zm-1.16 17.52h1.83L7.05 4.13H5.1l11.94 15.64Z" />
    </svg>
  ),
  linkedin: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77Z" />
    </svg>
  ),
  instagram: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
    </svg>
  ),
  pinterest: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <path d="M10.5 21l1.8-7.4M9 11.5c0-2 1.6-3.5 3.5-3.5s3 1.3 3 3c0 2.3-1.3 4-3 4-.8 0-1.4-.4-1.7-1" />
    </svg>
  ),
};

function matchesRule(post: CategoryPostSummary, pattern: RegExp): boolean {
  const haystack = `${post.title} ${post.description} ${post.tags.join(' ')}`;
  return pattern.test(haystack);
}

export default function CategoryFeedClient({
  category,
  posts,
  popular,
  latest,
  allCategories,
  socialLinks,
}: Props) {
  const INITIAL_COUNT = 8;
  const STEP_COUNT = 8;

  const [selectedTopic, setSelectedTopic] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'latest' | 'popular' | 'alpha'>('latest');
  const [shown, setShown] = useState<number>(INITIAL_COUNT);

  const rules = subtopicRulesByCategory[category.slug] || [];

  // Compute topic counts cleanly
  const topicBuckets = useMemo(() => {
    const counts: { id: string; label: string; count: number }[] = [
      { id: 'all', label: `All ${category.name} Guides`, count: posts.length },
    ];

    const matchedIds = new Set<number>();

    for (const rule of rules) {
      const matching = posts.filter((p) => matchesRule(p, rule.pattern));
      if (matching.length > 0) {
        matching.forEach((p) => matchedIds.add(p.id));
        counts.push({ id: rule.id, label: rule.label, count: matching.length });
      }
    }

    const otherCount = posts.filter((p) => !matchedIds.has(p.id)).length;
    if (otherCount > 0 && rules.length > 0) {
      counts.push({ id: 'other', label: 'Other Guides', count: otherCount });
    }

    return counts;
  }, [category.name, posts, rules]);

  // Filter + Sort
  const filteredPosts = useMemo(() => {
    let list = posts;

    if (selectedTopic === 'other') {
      list = posts.filter((p) => !rules.some((r) => matchesRule(p, r.pattern)));
    } else if (selectedTopic !== 'all') {
      const rule = rules.find((r) => r.id === selectedTopic);
      if (rule) {
        list = posts.filter((p) => matchesRule(p, rule.pattern));
      }
    }

    const sorted = [...list];
    if (sortBy === 'popular') {
      sorted.sort((a, b) => b.impressions - a.impressions || b.id - a.id);
    } else if (sortBy === 'alpha') {
      sorted.sort((a, b) => a.title.localeCompare(b.title));
    } else {
      sorted.sort((a, b) => b.id - a.id);
    }
    return sorted;
  }, [posts, rules, selectedTopic, sortBy]);

  const visiblePosts = filteredPosts.slice(0, shown);
  const remaining = Math.max(0, filteredPosts.length - visiblePosts.length);

  const handleTopicChange = (topicId: string) => {
    setSelectedTopic(topicId);
    setShown(INITIAL_COUNT);
  };

  return (
    <div className="mt-8 grid gap-7 lg:grid-cols-[240px_minmax(0,1fr)_300px] xl:grid-cols-[260px_minmax(0,1fr)_310px]">
      {/* LEFT SIDEBAR: Topic Filters + Mini Newsletter + Follow */}
      <aside aria-label="Category filters and updates" className="space-y-6">
        {/* Subtopic Filter Card */}
        <section className="rounded-2xl border border-line/80 bg-white p-4 shadow-2xs">
          <div className="flex items-center gap-2 border-b border-line/60 pb-3">
            <span className="flex size-6 items-center justify-center rounded-md bg-brand/10 text-brand-strong">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="3" y="3" width="7" height="7" rx="1" />
                <rect x="14" y="3" width="7" height="7" rx="1" />
                <rect x="3" y="14" width="7" height="7" rx="1" />
                <rect x="14" y="14" width="7" height="7" rx="1" />
              </svg>
            </span>
            <h2 className="font-display text-sm font-bold text-ink">
              {category.name} Topics
            </h2>
          </div>

          <ul className="mt-3 space-y-1">
            {topicBuckets.map((bucket) => {
              const active = selectedTopic === bucket.id;
              return (
                <li key={bucket.id}>
                  <button
                    type="button"
                    onClick={() => handleTopicChange(bucket.id)}
                    className={`flex w-full items-center justify-between gap-2 rounded-xl px-3 py-2 text-left text-xs transition cursor-pointer ${
                      active
                        ? 'bg-brand-soft text-brand-strong font-bold'
                        : 'text-ink-2 hover:bg-surface-2 hover:text-ink font-medium'
                    }`}
                  >
                    <span className="truncate">{bucket.label}</span>
                    <span
                      className={`shrink-0 rounded-md px-1.5 py-0.5 text-[11px] font-bold ${
                        active ? 'bg-white/80 text-brand-strong' : 'text-muted'
                      }`}
                    >
                      {bucket.count}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </section>

        {/* Mini Sidebar Newsletter */}
        <CategoryNewsletter variant="sidebar" categoryName={category.name} />

        {/* Follow TrendsWheel Card */}
        <section className="rounded-2xl border border-line/80 bg-white p-5 shadow-2xs">
          <div className="flex items-center gap-2">
            <span className="text-brand-strong" aria-hidden="true">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 6v6l4 2" />
              </svg>
            </span>
            <h2 className="font-display text-sm font-bold text-ink">
              Follow TrendsWheel
            </h2>
          </div>
          <p className="mt-2 text-xs leading-relaxed text-ink-2">
            Stay updated with our latest guides and tech news.
          </p>

          <ul className="mt-4 flex flex-wrap gap-2">
            {Object.entries(socialLinks).map(([name, url]) => (
              <li key={name}>
                <a
                  href={url}
                  target="_blank"
                  rel="noopener nofollow"
                  aria-label={name}
                  title={name}
                  className="flex size-8.5 items-center justify-center rounded-lg border border-line/80 bg-surface-2 text-ink-2 transition hover:border-brand hover:bg-brand hover:text-white"
                >
                  {socialIcons[name] ?? (
                    <span className="text-[10px] font-bold uppercase">{name.slice(0, 2)}</span>
                  )}
                </a>
              </li>
            ))}
            <li>
              <Link
                href="/feed.xml"
                aria-label="RSS Feed"
                title="RSS Feed"
                className="flex size-8.5 items-center justify-center rounded-lg border border-line/80 bg-surface-2 text-brand-strong transition hover:border-brand hover:bg-brand hover:text-white"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M4 11a9 9 0 0 1 9 9" />
                  <path d="M4 4a16 16 0 0 1 16 16" />
                  <circle cx="5" cy="19" r="1" />
                </svg>
              </Link>
            </li>
          </ul>
        </section>
      </aside>

      {/* CENTER COLUMN: Horizontal Feed + Mid-Stream Ad + Load More */}
      <div className="min-w-0">
        {/* Feed Header Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line/80 pb-3">
          <h2 className="font-display text-lg sm:text-xl font-bold text-ink relative after:absolute after:-bottom-[13px] after:left-0 after:w-20 after:h-[2.5px] after:bg-brand">
            All {category.name} Guides ({filteredPosts.length})
          </h2>

          <div className="flex items-center gap-2 text-xs">
            <label htmlFor="cat-sort-select" className="text-muted font-medium">
              Sort by:
            </label>
            <select
              id="cat-sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'latest' | 'popular' | 'alpha')}
              className="rounded-lg border border-line/80 bg-white px-2.5 py-1.5 font-semibold text-ink focus:border-brand focus:outline-none cursor-pointer"
            >
              <option value="latest">Latest</option>
              <option value="popular">Most Popular</option>
              <option value="alpha">Title (A–Z)</option>
            </select>
          </div>
        </div>

        {/* Horizontal Post List */}
        <div className="mt-5 space-y-4">
          {visiblePosts.map((post, idx) => (
            <Fragment key={post.slug}>
              <article className="group flex flex-col sm:flex-row gap-4 rounded-2xl border border-line/80 bg-white p-3.5 sm:p-4 shadow-2xs transition duration-200 hover:border-brand/40 hover:shadow-md">
                {/* Left Thumbnail */}
                <Link
                  href={post.href}
                  className="relative w-full sm:w-52 md:w-56 shrink-0 aspect-[16/10] overflow-hidden rounded-xl bg-surface-2"
                  tabIndex={-1}
                  aria-hidden="true"
                >
                  <img
                    src={post.img.src}
                    srcSet={post.img.srcSet}
                    sizes={post.img.sizes}
                    alt=""
                    width={400}
                    height={250}
                    loading={idx < 2 ? 'eager' : 'lazy'}
                    decoding="async"
                    className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </Link>

                {/* Right Text Details */}
                <div className="min-w-0 flex-1 flex flex-col justify-between py-0.5">
                  <div>
                    <span className={`chip chip-${category.slug} !text-[10px] !px-2 !py-0.5`}>
                      {category.name}
                    </span>

                    <h3 className="font-display mt-2 text-base sm:text-[17px] font-bold leading-snug text-ink line-clamp-2">
                      <Link
                        href={post.href}
                        className="no-underline transition group-hover:text-brand-strong"
                      >
                        {post.title}
                      </Link>
                    </h3>

                    {post.description && (
                      <p className="mt-1.5 text-xs sm:text-sm leading-relaxed text-ink-2 line-clamp-2">
                        {post.description}
                      </p>
                    )}
                  </div>

                  <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-muted">
                    <span className="inline-flex items-center gap-1.5">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <rect x="3" y="4" width="18" height="18" rx="2" />
                        <path d="M16 2v4M8 2v4M3 10h18" />
                      </svg>
                      <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <circle cx="12" cy="12" r="10" />
                        <path d="M12 6v6l4 2" />
                      </svg>
                      <span>{post.readMinutes} min read</span>
                    </span>
                  </div>
                </div>
              </article>

              {/* Strategic In-Feed Ads: after 3rd article, then every 8 articles as user loads more */}
              {(idx === 2 || (idx > 2 && (idx - 2) % 8 === 0)) && (
                <AdUnit key={`feed-ad-${idx}`} kind="inFeed" className="!my-4" />
              )}
            </Fragment>
          ))}
        </div>

        {/* Load More Button */}
        {remaining > 0 && (
          <div className="mt-8 flex justify-center border-t border-line/70 pt-6">
            <button
              type="button"
              onClick={() => setShown((s) => s + STEP_COUNT)}
              className="inline-flex min-h-11 items-center justify-center rounded-xl border border-line bg-white px-7 py-2.5 font-display text-sm font-bold text-ink shadow-xs transition hover:border-brand hover:bg-brand hover:text-white cursor-pointer"
            >
              Load More Guides
            </button>
          </div>
        )}
      </div>

      {/* RIGHT SIDEBAR: Popular + Display Ad + Explore Categories + Latest + Sticky Ad */}
      <aside aria-label="Popular and related guides" className="space-y-6 h-full">
        {/* Popular Guides Card */}
        {popular.length > 0 && (
          <section className="rounded-2xl border border-line/80 bg-white p-5 shadow-2xs">
            <div className="flex items-center gap-2 border-b border-line/60 pb-3">
              <span className="text-base" aria-hidden="true">
                🔥
              </span>
              <h2 className="font-display text-sm font-bold text-ink">
                Popular {category.name} Guides
              </h2>
            </div>

            <ul className="mt-3.5 divide-y divide-line/60">
              {popular.map((p, idx) => (
                <li key={p.slug} className="py-3 first:pt-0 last:pb-0">
                  <Link
                    href={p.href}
                    className="group flex items-start gap-3 no-underline"
                  >
                    <span className="font-display text-xs font-bold text-muted pt-0.5 w-3 shrink-0">
                      {idx + 1}
                    </span>
                    <img
                      src={p.img.src}
                      alt=""
                      width={80}
                      height={50}
                      loading="lazy"
                      className="w-16 h-11 shrink-0 rounded-lg object-cover bg-surface-2"
                    />
                    <span className="font-display text-sm font-bold leading-snug text-ink group-hover:text-brand-strong transition">
                      {p.title}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Sidebar AdSense Display Unit */}
        <AdUnit kind="display" className="!my-0" />

        {/* Explore Categories Card (2x2 grid) */}
        <section className="rounded-2xl border border-line/80 bg-white p-5 shadow-2xs">
          <div className="flex items-center gap-2 border-b border-line/60 pb-3">
            <span className="text-brand-strong" aria-hidden="true">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="7" height="7" rx="1" />
                <rect x="14" y="3" width="7" height="7" rx="1" />
                <rect x="3" y="14" width="7" height="7" rx="1" />
                <rect x="14" y="14" width="7" height="7" rx="1" />
              </svg>
            </span>
            <h2 className="font-display text-sm font-bold text-ink">
              Explore Categories
            </h2>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-2.5">
            {allCategories.map((c) => {
              const isCurrent = c.slug === category.slug;
              return (
                <Link
                  key={c.slug}
                  href={categoryUrl(c.slug)}
                  className={`flex flex-col items-center justify-center rounded-xl border p-2.5 text-center no-underline transition ${
                    isCurrent
                      ? 'border-brand/40 bg-brand-soft text-brand-strong'
                      : 'border-line/80 bg-surface-2/60 text-ink-2 hover:border-brand hover:text-brand-strong'
                  }`}
                >
                  <span className="text-xs font-bold">{c.name}</span>
                  {c.count !== undefined && (
                    <span className="text-[10px] text-muted">{c.count} guides</span>
                  )}
                </Link>
              );
            })}
          </div>
        </section>

        {/* Latest Guides Card */}
        {latest.length > 0 && (
          <section className="rounded-2xl border border-line/80 bg-white p-5 shadow-2xs">
            <div className="flex items-center gap-2 border-b border-line/60 pb-3">
              <span className="text-brand-strong" aria-hidden="true">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 6v6l4 2" />
                </svg>
              </span>
              <h2 className="font-display text-sm font-bold text-ink">
                Latest {category.name} Guides
              </h2>
            </div>

            <ul className="mt-3.5 divide-y divide-line/60">
              {latest.map((p) => (
                <li key={p.slug} className="py-3 first:pt-0 last:pb-0">
                  <Link
                    href={p.href}
                    className="group flex items-start gap-3 no-underline"
                  >
                    <img
                      src={p.img.src}
                      alt=""
                      width={80}
                      height={50}
                      loading="lazy"
                      className="w-16 h-11 shrink-0 rounded-lg object-cover bg-surface-2"
                    />
                    <span className="font-display text-sm font-bold leading-snug text-ink group-hover:text-brand-strong transition">
                      {p.title}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-4 border-t border-line/60 pt-3 text-center">
              <button
                type="button"
                onClick={() => {
                  setSelectedTopic('all');
                  setSortBy('latest');
                  setShown(INITIAL_COUNT);
                  window.scrollTo({ top: 320, behavior: 'smooth' });
                }}
                className="text-xs font-bold text-brand-strong hover:underline cursor-pointer"
              >
                View All {category.name} Guides →
              </button>
            </div>
          </section>
        )}

        {/* Sticky High-RPM Sidebar Display Unit */}
        <div className="sticky top-28 z-10">
          <AdUnit kind="display" className="!my-0 shadow-xs" />
        </div>
      </aside>
    </div>
  );
}
