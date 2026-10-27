// Presentation-only processing of the stored post HTML. Visible text is never changed:
// we add heading ids, wrap tables, add image attributes and split into segments so ads can sit between them.
import path from 'node:path';
import sharp from 'sharp';
import { SITE_URL } from '@/config/site';
import { stripHtml } from '@/lib/content';

export type TocItem = { id: string; text: string; level: 2 | 3 };

const PUBLIC_DIR = path.join(process.cwd(), 'public');
const dimCache = new Map<string, { w: number; h: number } | null>();

async function imageSize(src: string): Promise<{ w: number; h: number } | null> {
  let p = src.startsWith(SITE_URL) ? src.slice(SITE_URL.length) : src;
  if (/^(https?:)?\/\//.test(p) || p.startsWith('data:')) return null;
  p = decodeURIComponent(p.split('?')[0].split('#')[0]);
  if (!p.startsWith('/')) p = '/' + p;
  if (dimCache.has(p)) return dimCache.get(p) ?? null;
  let result: { w: number; h: number } | null = null;
  try {
    const meta = await sharp(path.join(PUBLIC_DIR, p)).metadata();
    if (meta.width && meta.height) result = { w: meta.width, h: meta.height };
  } catch {
    result = null;
  }
  dimCache.set(p, result);
  return result;
}

export function slugifyHeading(text: string): string {
  return (
    text
      .toLowerCase()
      .replace(/&[a-z#0-9]+;/g, ' ')
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-') || 'section'
  );
}

/** Add `id`s to h2/h3 lacking one and collect the table of contents. */
function addHeadingIds(html: string): { html: string; toc: TocItem[] } {
  const used = new Set<string>();
  for (const m of html.matchAll(/<h[1-6][^>]*\sid=["']([^"']+)["']/gi)) used.add(m[1]);
  const toc: TocItem[] = [];
  const out = html.replace(/<h([23])([^>]*)>([\s\S]*?)<\/h\1>/gi, (full, lvl: string, attrs: string, inner: string) => {
    const text = stripHtml(inner);
    const existing = attrs.match(/\sid=["']([^"']+)["']/i);
    let id = existing?.[1];
    if (!id) {
      const base = slugifyHeading(text);
      id = base;
      for (let n = 2; used.has(id); n++) id = `${base}-${n}`;
      used.add(id);
    }
    if (text) toc.push({ id, text, level: Number(lvl) as 2 | 3 });
    return existing ? full : `<h${lvl}${attrs} id="${id}">${inner}</h${lvl}>`;
  });
  return { html: out, toc };
}

function wrapTables(html: string): string {
  return html
    .replace(/<table\b/gi, '<div class="table-wrap" tabindex="0"><table')
    .replace(/<\/table>/gi, '</table></div>');
}

/** Real width/height + lazy loading on images inside the body. `src` and `alt` stay exactly as stored. */
async function enhanceImages(html: string): Promise<string> {
  const tags = [...html.matchAll(/<img\b[^>]*>/gi)];
  let out = html;
  for (const m of tags) {
    const tag = m[0];
    const src = tag.match(/\ssrc=["']([^"']+)["']/i)?.[1];
    let next = tag;
    const add = (name: string, value: string) => {
      if (!new RegExp(`\\s${name}\\s*=`, 'i').test(next)) next = next.replace(/<img\b/i, `<img ${name}="${value}"`);
    };
    if (src) {
      const size = await imageSize(src);
      if (size && !/\swidth\s*=/i.test(next) && !/\sheight\s*=/i.test(next)) {
        add('height', String(size.h));
        add('width', String(size.w));
      }
    }
    add('decoding', 'async');
    add('loading', 'lazy');
    out = out.replace(tag, next);
  }
  return out;
}

const CONTAINERS = new Set(['div', 'ul', 'ol', 'table', 'blockquote', 'figure', 'section', 'details', 'pre', 'aside', 'dl', 'form']);

/** Offsets just after each top-level </p> whose next top-level element is not a heading. */
function topLevelParagraphEnds(html: string): number[] {
  const ends: number[] = [];
  let depth = 0;
  const re = /<(\/?)([a-z][a-z0-9]*)\b[^>]*?(\/?)>/gi;
  let m: RegExpExecArray | null;
  while ((m = re.exec(html))) {
    const [full, closing, rawName, selfClose] = m;
    const name = rawName.toLowerCase();
    if (selfClose || /^(img|br|hr|input|meta|link)$/.test(name)) continue;
    if (CONTAINERS.has(name)) depth += closing ? -1 : 1;
    else if (name === 'p' && closing && depth <= 0) {
      const after = html.slice(m.index + full.length, m.index + full.length + 80);
      if (!/^\s*<h[1-6]\b/i.test(after)) ends.push(m.index + full.length);
    }
  }
  return ends;
}

export type BodySegments = { segments: string[]; toc: TocItem[] };

/**
 * Returns the processed body split into `adCount + 1` segments; ads render between them.
 * `placeAds(paragraphEnds)` picks which paragraph ends get an ad.
 */
export async function processPostHtml(
  rawHtml: string,
  pickAdPositions: (paragraphEnds: number[]) => number[],
): Promise<BodySegments> {
  const withIds = addHeadingIds(rawHtml);
  const html = wrapTables(await enhanceImages(withIds.html));
  const ends = topLevelParagraphEnds(html);
  const cuts = pickAdPositions(ends).map((i) => ends[i]).sort((a, b) => a - b);
  const segments: string[] = [];
  let last = 0;
  for (const c of cuts) {
    segments.push(html.slice(last, c));
    last = c;
  }
  segments.push(html.slice(last));
  return { segments, toc: withIds.toc };
}
