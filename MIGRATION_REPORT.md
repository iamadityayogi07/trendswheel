# TrendsWheel migration report

Old: Laravel 12 (`C:\wamp64\www\trendswheel-live`, read-only, untouched). New: `C:\wamp64\www\trendswheel-next` (Next.js 16.4.3, App Router, TypeScript strict, Tailwind 4, static export).

## Counts
- Posts: 41 exported = 41 published rows. Categories 4, authors 3, static pages 4 (about, contact, privacy, terms) plus a new `/archive`.
- Files copied into `public/`: 1000 (images keep their original paths). Missing image references: 0. Files over 25 MB: 0. Built `out/`: 1538 files.

## URL parity
- All 61 old URLs exist in `out/` with the same path, no trailing slash. Post slug set is identical (no extra, none missing).
- Only new URL: `/archive` (no collision). Old sitemap URLs kept: `/sitemap.xml` (index) and `-posts`, `-pages`, `-categories`, `-authors`, plus `/feed.xml`, `/robots.txt`, `/ads.txt`.
- Redirects (`public/_redirects`): 37 old 301s from the `seo_redirects` table (chains flattened) + `/public/*` to `/:splat`.
- 56 old URLs were HTTP 410 (removed on purpose). Cloudflare Pages cannot return 410, so they return 404. List: `migration/redirects-gone.txt`.
- Wrong-category post URLs (e.g. `/apps/<tech-post>`) were 301-redirected by Laravel; static hosting cannot do that, they now 404. Real URLs are unchanged.

## Verification (`npm run verify`, plus manual)
| Check | Result |
| --- | --- |
| 1 URL and slug parity | PASS |
| 1b Text parity (body, `<title>`, meta description, h1) for all 41 posts | PASS |
| 2 Content in static HTML | PASS |
| 3 One title/description/h1, canonical = own URL, no noindex (54 pages) | PASS |
| 4 Local images resolve | PASS |
| 5 Internal links resolve | PASS |
| 6 Sitemap: 53 URLs, all exist in `out/` | PASS |
| 7 robots.txt, ads.txt | PASS |
| 8 AdSense script with `ca-pub-1412589887378400`; ads.txt same ID | PASS |
| 9 Served `out/` locally: home, 4 categories, static pages, author, feed, sitemap, 5 random posts all 200; unknown URL 404 | PASS |
| 10 390px width (5 pages): no horizontal scroll. Checked via 390px iframes because the window resize did not change the viewport; no visual review of ads | PASS (partial) |
| 11 `tsc --noEmit`, ESLint | clean |
| 11 Lighthouse mobile (local, throttled, live AdSense/GA scripts) | see below, targets NOT met |
| 12 No orphan posts, Read next on every post | PASS |

Lighthouse (final run): Home perf 72 / a11y 100 / BP 73 / SEO 100 (LCP 3.9 s, CLS 0, TBT 520 ms). Category perf 66 (LCP 4.6 s). Post perf 67 (LCP 4.1 s, TBT 690 ms). Performance is below the 90 target: most main-thread time is Google's ad and GA scripts (loaded `lazyOnload`), and the local `serve` has no compression. Best Practices 73 comes from third-party cookies and console errors from the ad script on localhost. Re-measure on the real `pages.dev` URL; a first pass raised perf from 37-51 to 66-72 (smaller logo variants, deferred ad/GA scripts).

## Revamp summary
- Design system: tokens in `app/globals.css` (brand `#e64a19` kept; AA-contrast darker brand for text/buttons), Roboto + League Spartan via `next/font`, light/dark via `prefers-color-scheme`.
- Homepage: hero with featured post, latest grid, per-category sections, About/Trust/FAQ copy kept, path to `/archive`. Post: breadcrumb, meta, hero image, collapsible table of contents, body, FAQ, author box, share links, previous/next, Read next + Related (4-6, deterministic scoring), sidebar (popular, categories, sticky ad on desktop).
- Category pages render all posts in the HTML (crawlable links); "Load more" only reveals them. Old pagination was JS-only, so URLs are unchanged.
- Performance: server components, native `<details>` menus (no JS), WebP variants (400/800/1200) in `public/_img` for cards/hero/logo, real width/height on body images, lazy ads via IntersectionObserver.
- SEO: single `lib/seo.ts`; BlogPosting + BreadcrumbList, CollectionPage, FAQPage (only where FAQ text exists), Organization, WebSite.
- Kept from old: GA `G-0R1CTGQCDG` with Consent Mode and the cookie notice, robots rules (AI crawlers blocked), author noindex rule (index only with posts and bio; all 3 authors currently qualify).

## Ad layout (slot IDs reused from the old site)
- Slots: display `5022249621`, in-article `6997676270`, in-feed `8047868213` (`config/ads.ts`).
- Posts: up to 3 in-article units (first after the 3rd paragraph, then every 5, scaled to ~350 words each), one display unit after the body, one sticky display unit in the desktop sidebar. Home: one in-feed unit between sections. Category: one display unit after the list. No ads on about, contact, privacy, terms, archive, author, 404.
- The old site also had Auto ads (`amp-auto-ads` tag); that tag was not carried over, the AdSense script is still loaded so dashboard Auto ads still work.

## AdSense dashboard to-do (honest note: RPM is not guaranteed)
Review Auto ads formats (anchor, vignette) and test one at a time; enable Google's consent message (Privacy & messaging) for EEA/UK; block low-paying or irrelevant categories; use experiments to compare layouts. Long-term revenue depends mostly on indexed posts and traffic from higher-paying countries.

## Publishing a new post
See `README.md`: `npm run new-post`, `npm run build`, push, Cloudflare auto-build.

## Not carried over (no static backend)
- Contact form (stored in DB) replaced by an "Email us" mailto button. Options: Formspree/Web3Forms, or a Cloudflare Pages Function.
- Newsletter form (stored emails): removed. Options: Buttondown/MailerLite embed.
- View counters ("N Views") and impression-based "popular": popularity now uses exported counts frozen at migration.
- Admin panel: replaced by the JSON workflow. Search: kept as client-side autocomplete from `/search-index.json`.
- Old JSON-LD `SearchAction` pointed at a non-existent `?s=` page and was dropped.

## SEO audit of the old site
- No `noindex` on public pages, robots.txt allows all (blocks admin, `/search`, AI-training bots), canonicals self-referencing. Author pages are noindex when they lack posts or bio.
- Duplicate meta: none (titles and descriptions unique). Missing featured images: 0. Posts under 300 words: none (shortest 428 words). No `[ADITYA: ...]` placeholders in published posts.
- Thinnest posts to improve first: `what-to-do-when-your-accounts-go-wrong` (428), `still-getting-emails-after-unsubscribing` (430), `see-saved-wifi-password-android-without-root-2026` (437).
- Old problems already fixed in Laravel and not repeated: `/public/` duplicates, wrong-category duplicate URLs. Category split is lopsided (31 how-to, 6 tech, 3 apps, 1 social).
- Old site code could not be fully audited for sitemap host mismatches beyond the code (sitemap used `route()` URLs, https non-www).

## Drafts not published
92 drafts, listed in `migration/drafts-not-published.json`.

## Open items for you
1. `npx wrangler login`, then `npm run build` and `npx wrangler pages deploy out --project-name trendswheel` (not run by me; preview only).
2. Check `https://trendswheel.pages.dev` (5 posts, images, ads script in view-source), then add the custom domain in Cloudflare yourself; SSL Full (strict), Always Use HTTPS.
3. Old host redirected `www` to non-www; set the same in Cloudflare (Redirect Rule).
4. Search Console: resubmit `sitemap.xml`, request indexing for homepage and 5-10 posts per day.
5. AdSense: confirm site "Ready" and ads.txt "Authorized". Re-run Lighthouse on the live preview.
