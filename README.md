# TrendsWheel (Next.js static site)

Static export of trendswheel.com for Cloudflare Pages. Node 22 (`.nvmrc`).

## Publish a new post (4 steps)

1. `npm run new-post -- <category-slug> <post-slug> "Post title"` creates `content/posts/<post-slug>.json`. Fill in `html`, `metaTitle`, `metaDescription`, `description`, dates, `featuredImage`, and put the image in `public/posts/`.
2. `npm run build` (builds image variants, the site into `out/`). Then `npm run verify`.
3. Commit and push to your Git repository.
4. Cloudflare Pages builds automatically (build command `npm run build`, output directory `out`).

Slugs and URLs are permanent: `/{category}/{slug}`. Never rename one after it is indexed; add a line to `public/_redirects` if you must.

## Scripts

| Script | What it does |
| --- | --- |
| `npm run build` | `prebuild-images` then `next build` (static export to `out/`) |
| `npm run verify` | URL/slug parity, text parity, canonicals, images, links, sitemap, ads.txt, AdSense |
| `npm run lighthouse` | Mobile Lighthouse on home, one post, one category (needs Chrome) |
| `npm run export` | Re-export content from the old Laravel DB (needs the old MySQL running) |
| `npm run typecheck` / `npm run lint` | `tsc --noEmit` / ESLint |

## Layout

`app/` routes only, `components/` (layout, post, ads, analytics), `lib/` (`content.ts` zod-validated loader, `seo.ts`, `url.ts`, `post-html.ts`), `config/` (`site.ts`, `ads.ts`, `nav.ts`, page copy), `content/` JSON, `scripts/`, `public/`.

Ads: slot IDs live in `config/ads.ts`; an empty slot renders nothing.
