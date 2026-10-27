// Ad slots reused from the old Laravel site. Leave a slot as '' to render nothing for it.
export const ADSENSE_CLIENT = 'ca-pub-1412589887378400';

export const adSlots = {
  /** Responsive display unit (old slot used in layouts, sidebars and after the post). */
  display: '5022249621',
  /** In-article fluid unit (old slot used on legal/about pages). */
  inArticle: '6997676270',
  /** In-feed fluid unit used between post rows on the old homepage. */
  inFeed: '8047868213',
  inFeedLayoutKey: '-gi-2e+as-aj-bs',
} as const;

export type AdKind = 'display' | 'inArticle' | 'inFeed';

/** Reserved heights (px) so an ad never makes the page jump. */
export const adMinHeight: Record<AdKind, number> = {
  display: 280,
  inArticle: 250,
  inFeed: 250,
};

/** Roughly one in-article ad per this many words, never above the cap. */
export const WORDS_PER_AD = 350;
export const MAX_IN_ARTICLE_ADS = 3;
/** Paragraphs that must precede the first in-article ad / separate two ads. */
export const FIRST_AD_AFTER_PARAGRAPHS = 3;
export const PARAGRAPHS_BETWEEN_ADS = 5;
