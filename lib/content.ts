// Typed, validated content layer. Reads content/*.json once at build time and fails loudly on bad data.
import fs from 'node:fs';
import path from 'node:path';
import { z } from 'zod';

const CONTENT_DIR = path.join(process.cwd(), 'content');

const faqItem = z.object({ title: z.string().optional(), description: z.string().optional() });

const postSchema = z.object({
  id: z.number(),
  slug: z.string().min(1),
  title: z.string().min(1),
  html: z.string().min(1),
  excerpt: z.string(),
  description: z.string(),
  metaTitle: z.string().min(1),
  metaDescription: z.string().min(1),
  metaKeywords: z.string().nullable(),
  publishedAt: z.string().min(1),
  updatedAt: z.string().min(1),
  category: z.object({ name: z.string().min(1), slug: z.string().min(1) }),
  tags: z.array(z.string()),
  author: z.object({ name: z.string().min(1), slug: z.string().min(1) }),
  featuredImage: z.string().nullable(),
  thumbnailImage: z.string().nullable(),
  altImage: z.string().nullable(),
  faq: z.array(faqItem),
  impressions: z.number(),
  oldPath: z.string().min(1),
});

const categorySchema = z.object({
  id: z.number(),
  name: z.string().min(1),
  slug: z.string().min(1),
  metaTitle: z.string().min(1),
  metaDescription: z.string().min(1),
  metaKeywords: z.string().nullable(),
  faq: z.array(faqItem),
  featuredImage: z.string().nullable(),
});

const authorSchema = z.object({
  id: z.number(),
  name: z.string().min(1),
  slug: z.string().min(1),
  bio: z.string().nullable(),
  shortBio: z.string().nullable(),
  metaBio: z.string().nullable(),
  avatar: z.string().nullable(),
  isAdmin: z.boolean(),
});

const siteSchema = z.object({
  name: z.string(),
  tagline: z.string(),
  baseUrl: z.string(),
  lang: z.string(),
  adsensePublisherId: z.string(),
  gaMeasurementId: z.string(),
  email: z.string(),
  address: z.string(),
  phone: z.string().nullable(),
  social: z.record(z.string(), z.string()),
  logo: z.string().nullable(),
  favicon: z.string().nullable(),
  aboutHeading: z.string(),
  aboutContent: z.string().nullable(),
  aboutImage: z.string().nullable(),
  aboutImageAlt: z.string().nullable(),
});

export type Post = z.infer<typeof postSchema>;
export type Category = z.infer<typeof categorySchema>;
export type Author = z.infer<typeof authorSchema>;
export type Site = z.infer<typeof siteSchema>;
export type FaqItem = z.infer<typeof faqItem>;

function readJson<T>(file: string, schema: z.ZodType<T>): T {
  const full = path.join(CONTENT_DIR, file);
  const parsed = schema.safeParse(JSON.parse(fs.readFileSync(full, 'utf8')));
  if (!parsed.success) throw new Error(`Invalid content in ${file}: ${parsed.error.message}`);
  return parsed.data;
}

type Store = { site: Site; categories: Category[]; authors: Author[]; posts: Post[] };
let store: Store | null = null;

function load(): Store {
  if (store) return store;
  const site = readJson('site.json', siteSchema);
  const categories = readJson('categories.json', z.array(categorySchema));
  const authors = readJson('authors.json', z.array(authorSchema));
  const dir = path.join(CONTENT_DIR, 'posts');
  const posts = fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.json'))
    .map((f) => {
      const post = readJson(`posts/${f}`, postSchema);
      if (`${post.slug}.json` !== f) throw new Error(`Slug/file mismatch: ${f}`);
      if (!categories.some((c) => c.slug === post.category.slug)) throw new Error(`Unknown category on ${f}`);
      return post;
    })
    // newest first, like the old `latest()`
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt) || b.id - a.id);
  const slugs = new Set<string>();
  for (const p of posts) {
    if (slugs.has(p.slug)) throw new Error(`Duplicate slug ${p.slug}`);
    slugs.add(p.slug);
  }
  store = { site, categories, authors, posts };
  return store;
}

export const getSite = () => load().site;
export const getCategories = () => load().categories;
export const getAuthors = () => load().authors;
export const getAllPosts = () => load().posts;

export const getCategory = (slug: string) => load().categories.find((c) => c.slug === slug);
export const getAuthor = (slug: string) => load().authors.find((a) => a.slug === slug);
export const getPost = (category: string, slug: string) =>
  load().posts.find((p) => p.slug === slug && p.category.slug === category);
export const getPostsByCategory = (slug: string) => load().posts.filter((p) => p.category.slug === slug);
export const getPostsByAuthor = (slug: string) => load().posts.filter((p) => p.author.slug === slug);

/** Most-viewed first (the old site's "popular"). */
export const getPopularPosts = (limit: number, categorySlug?: string) =>
  load()
    .posts.filter((p) => !categorySlug || p.category.slug === categorySlug)
    .sort((a, b) => b.impressions - a.impressions || b.id - a.id)
    .slice(0, limit);

/** Previous/next by id with wrap-around, as the old site did. */
export function getPrevNext(post: Post): { previous: Post; next: Post } {
  const byId = [...load().posts].sort((a, b) => a.id - b.id);
  const i = byId.findIndex((p) => p.slug === post.slug);
  return { previous: byId[(i - 1 + byId.length) % byId.length], next: byId[(i + 1) % byId.length] };
}

const words = (s: string) => new Set(s.toLowerCase().split(/[^a-z0-9]+/).filter((w) => w.length > 3));

/** Deterministic related posts: same category, shared tags and title-word overlap. */
export function getRelatedPosts(post: Post, limit = 6): Post[] {
  const titleWords = words(post.title);
  const tags = new Set(post.tags.map((t) => t.toLowerCase()));
  return load()
    .posts.filter((p) => p.slug !== post.slug)
    .map((p) => {
      let score = p.category.slug === post.category.slug ? 5 : 0;
      for (const t of p.tags) if (tags.has(t.toLowerCase())) score += 2;
      for (const w of words(p.title)) if (titleWords.has(w)) score += 1;
      return { p, score };
    })
    .sort((a, b) => b.score - a.score || b.p.id - a.p.id)
    .slice(0, limit)
    .map((x) => x.p);
}

export function stripHtml(html: string): string {
  return html
    .replace(/<(script|style)[\s\S]*?<\/\1>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;/g, "'")
    .replace(/\s+/g, ' ')
    .trim();
}

export const wordCount = (html: string) => stripHtml(html).split(' ').filter(Boolean).length;
export const readingMinutes = (html: string) => Math.max(1, Math.round(wordCount(html) / 220));

const legalPageSchema = z.object({
  heading: z.string(),
  title: z.string(),
  metaDescription: z.string(),
  metaKeywords: z.string(),
  lastUpdated: z.string(),
  html: z.string().min(1),
});
export type LegalPage = z.infer<typeof legalPageSchema>;

let legal: Record<string, LegalPage> | null = null;
export function getLegalPage(key: 'privacy-policy' | 'terms-conditions'): LegalPage {
  legal ??= readJson('pages.json', z.record(z.string(), legalPageSchema));
  const page = legal[key];
  if (!page) throw new Error(`Missing page ${key}`);
  return page;
}
