// All metadata, canonicals and JSON-LD come from here; pages never write SEO by hand.
import type { Metadata } from 'next';
import {
  AUTHOR_SAME_AS,
  DEFAULT_OG_IMAGE,
  HOME_DESCRIPTION,
  HOME_KEYWORDS,
  LOGO_PATH,
  ORGANIZATION_DESCRIPTION,
  ORGANIZATION_SAME_AS,
  SITE_NAME,
  SITE_URL,
  TITLE_SUFFIX,
} from '@/config/site';
import type { Author, Category, FaqItem, Post } from '@/lib/content';
import { stripHtml, wordCount } from '@/lib/content';
import { absoluteUrl, authorUrl, categoryUrl, postUrl } from '@/lib/url';

const abs = (p: string | null | undefined, fallback = DEFAULT_OG_IMAGE) => absoluteUrl(p || fallback);

type PageMeta = {
  title: string;
  description: string;
  keywords?: string | null;
  path: string;
  image?: string | null;
  type?: 'website' | 'article' | 'profile';
  noindex?: boolean;
  published?: string;
  modified?: string;
  section?: string;
  authorName?: string;
};

export function buildMetadata(m: PageMeta): Metadata {
  const url = absoluteUrl(m.path);
  const image = abs(m.image);
  return {
    title: { absolute: m.title },
    description: m.description,
    keywords: m.keywords ?? undefined,
    alternates: { canonical: url },
    robots: m.noindex ? { index: false, follow: true } : { index: true, follow: true },
    openGraph: {
      title: m.title,
      description: m.description,
      url,
      siteName: SITE_NAME,
      type: m.type ?? 'website',
      images: [{ url: image }],
      ...(m.type === 'article'
        ? { publishedTime: m.published, modifiedTime: m.modified, section: m.section, authors: m.authorName ? [m.authorName] : undefined }
        : {}),
    },
    twitter: { card: 'summary_large_image', title: m.title, description: m.description, images: [image], site: '@trendswheel' },
  };
}

export const homeMetadata = (title: string) =>
  buildMetadata({ title, description: HOME_DESCRIPTION, keywords: HOME_KEYWORDS, path: '/', image: LOGO_PATH });

export const postMetadata = (post: Post) =>
  buildMetadata({
    title: `${post.metaTitle}${TITLE_SUFFIX}`,
    description: post.metaDescription,
    keywords: post.metaKeywords,
    path: postUrl(post.category.slug, post.slug),
    image: post.featuredImage,
    type: 'article',
    published: post.publishedAt,
    modified: post.updatedAt,
    section: post.category.name,
    authorName: post.author.name,
  });

export const categoryMetadata = (c: Category) =>
  buildMetadata({
    title: c.metaTitle,
    description: c.metaDescription,
    keywords: c.metaKeywords,
    path: categoryUrl(c.slug),
    image: c.featuredImage ?? LOGO_PATH,
  });

/** Old rule: an author page is noindex until it has posts and a bio. */
export const authorIsIndexable = (a: Author, postCount: number) => postCount > 0 && !!a.bio?.trim();

export const authorMetadata = (a: Author, postCount: number) =>
  buildMetadata({
    title: `${a.name} - Author at ${SITE_NAME}`,
    description: a.metaBio ?? `Explore articles and content by ${a.name}`,
    path: authorUrl(a.slug),
    image: a.avatar ?? LOGO_PATH,
    type: 'profile',
    noindex: !authorIsIndexable(a, postCount),
  });

// ---- JSON-LD ----
const logoObject = () => ({ '@type': 'ImageObject', url: absoluteUrl(LOGO_PATH), width: 162, height: 162 });
const publisher = () => ({ '@type': 'Organization', name: SITE_NAME, logo: logoObject() });

export const organizationSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${SITE_URL}#organization`,
  name: SITE_NAME,
  url: SITE_URL,
  logo: logoObject(),
  image: absoluteUrl(LOGO_PATH),
  description: ORGANIZATION_DESCRIPTION,
  sameAs: ORGANIZATION_SAME_AS,
});

export const websiteSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE_URL}#website`,
  name: SITE_NAME,
  url: SITE_URL,
  inLanguage: 'en',
  publisher: { '@id': `${SITE_URL}#organization` },
});

export function faqSchema(items: FaqItem[], id: string) {
  const mainEntity = items
    .map((i) => ({ q: (i.title ?? '').trim(), a: (i.description ?? '').trim() }))
    .filter((i) => i.q || i.a)
    .map((i) => ({ '@type': 'Question', name: i.q, acceptedAnswer: { '@type': 'Answer', text: i.a } }));
  if (!mainEntity.length) return null;
  return { '@context': 'https://schema.org', '@type': 'FAQPage', '@id': id, mainEntity };
}

export function breadcrumbSchema(crumbs: { name: string; path: string }[], id: string) {
  return {
    '@type': 'BreadcrumbList',
    '@id': id,
    itemListElement: crumbs.map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c.name, item: absoluteUrl(c.path) })),
  };
}

export function postSchemas(post: Post, author: Author | undefined) {
  const url = absoluteUrl(postUrl(post.category.slug, post.slug));
  const article = {
    '@type': 'BlogPosting',
    '@id': `${url}#article`,
    headline: post.title,
    alternativeHeadline: post.metaTitle,
    description: post.metaDescription,
    articleSection: post.category.name,
    keywords: post.metaKeywords ?? undefined,
    wordCount: wordCount(post.html),
    image: { '@type': 'ImageObject', url: abs(post.featuredImage), width: 1200, height: 630 },
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    author: {
      '@type': 'Person',
      name: post.author.name,
      url: absoluteUrl(authorUrl(post.author.slug)),
      sameAs: AUTHOR_SAME_AS[post.author.slug] ?? [],
      image: { '@type': 'ImageObject', url: abs(author?.avatar, LOGO_PATH), width: 200, height: 200 },
    },
    publisher: publisher(),
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    url,
  };
  const breadcrumbs = breadcrumbSchema(
    [
      { name: 'Home', path: '/' },
      { name: post.category.name, path: categoryUrl(post.category.slug) },
      { name: post.title, path: postUrl(post.category.slug, post.slug) },
    ],
    `${url}#breadcrumbs`,
  );
  const faq = faqSchema(post.faq, `${url}#faq`);
  return [{ '@context': 'https://schema.org', '@graph': [article, breadcrumbs] }, ...(faq ? [faq] : [])];
}

export function categorySchemas(c: Category, posts: Post[]) {
  const url = absoluteUrl(categoryUrl(c.slug));
  const page = {
    '@type': 'CollectionPage',
    '@id': `${url}#page`,
    name: c.metaTitle,
    description: c.metaDescription,
    url,
    mainEntity: posts.map((p) => ({ '@type': 'BlogPosting', headline: p.title, url: absoluteUrl(postUrl(p.category.slug, p.slug)) })),
    publisher: publisher(),
  };
  const crumbs = breadcrumbSchema(
    [
      { name: 'Home', path: '/' },
      { name: c.name, path: categoryUrl(c.slug) },
    ],
    `${url}#breadcrumbs`,
  );
  const faq = faqSchema(c.faq, `${url}#faq`);
  return [{ '@context': 'https://schema.org', '@graph': [page, crumbs] }, ...(faq ? [faq] : [])];
}

export function authorSchemas(a: Author, posts: Post[]) {
  const url = absoluteUrl(authorUrl(a.slug));
  return [
    {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Person',
          '@id': `${url}#person`,
          name: a.name,
          url,
          image: { '@type': 'ImageObject', url: abs(a.avatar, LOGO_PATH), width: 200, height: 200 },
          description: a.bio ? stripHtml(a.bio) : '',
          sameAs: AUTHOR_SAME_AS[a.slug] ?? [],
          jobTitle: 'Content Author',
          worksFor: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
        },
        breadcrumbSchema(
          [
            { name: 'Home', path: '/' },
            { name: a.name, path: authorUrl(a.slug) },
          ],
          `${url}#breadcrumbs`,
        ),
        {
          '@type': 'CollectionPage',
          '@id': `${url}#page`,
          name: `${a.name} Articles`,
          url,
          mainEntity: posts.map((p) => ({ '@type': 'BlogPosting', headline: p.title, url: absoluteUrl(postUrl(p.category.slug, p.slug)), datePublished: p.publishedAt })),
        },
      ],
    },
  ];
}

export function simplePageSchema(type: 'AboutPage' | 'ContactPage' | 'WebPage', name: string, description: string, path: string) {
  return {
    '@context': 'https://schema.org',
    '@type': type,
    name,
    description,
    url: absoluteUrl(path),
    publisher: publisher(),
  };
}
