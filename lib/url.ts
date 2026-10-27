// Every internal URL is built here, using the old Laravel URL format:
// /{category}/{slug}, /{category}, /author/{slug}, /about-us ... (no trailing slash).
import { SITE_URL } from '@/config/site';

export type StaticPageKey = 'about-us' | 'contact-us' | 'privacy-policy' | 'terms-conditions';

export const homeUrl = () => '/';
export const postUrl = (category: string, slug: string) => `/${category}/${slug}`;
export const categoryUrl = (category: string) => `/${category}`;
export const authorUrl = (slug: string) => `/author/${slug}`;
export const staticPageUrl = (key: StaticPageKey) => `/${key}`;
export const archiveUrl = () => '/archive';

/** Absolute URL as used for canonicals, sitemaps and JSON-LD. Home has no trailing slash, like the old site. */
export const absoluteUrl = (p: string) => (p === '/' ? SITE_URL : `${SITE_URL}${p}`);
