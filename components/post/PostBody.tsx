import AdUnit from '@/components/ads/AdUnit';
import { FIRST_AD_AFTER_PARAGRAPHS, MAX_IN_ARTICLE_ADS, PARAGRAPHS_BETWEEN_ADS, WORDS_PER_AD } from '@/config/ads';
import { wordCount } from '@/lib/content';
import { processPostHtml, type TocItem } from '@/lib/post-html';

/** Which paragraph ends get an in-article ad: scaled to length, spaced out, never near the very end. */
function pickPositions(words: number) {
  return (ends: number[]): number[] => {
    const wanted = Math.min(MAX_IN_ARTICLE_ADS, Math.floor(words / WORDS_PER_AD));
    const picks: number[] = [];
    let i = FIRST_AD_AFTER_PARAGRAPHS - 1;
    while (picks.length < wanted && i <= ends.length - 3) {
      picks.push(i);
      i += PARAGRAPHS_BETWEEN_ADS;
    }
    return picks;
  };
}

export async function getPostBody(html: string): Promise<{ segments: string[]; toc: TocItem[] }> {
  return processPostHtml(html, pickPositions(wordCount(html)));
}

/** Renders the post body (identical visible text) with ad units between the segments. */
export default function PostBody({ segments }: { segments: string[] }) {
  return (
    <>
      <div data-post-body="1">
        {segments.map((html, i) => (
          <div key={i}>
            <div className="prose-tw" dangerouslySetInnerHTML={{ __html: html }} />
            {i < segments.length - 1 && <AdUnit kind="inArticle" />}
          </div>
        ))}
      </div>
      <div data-post-body-end="1" hidden />
    </>
  );
}
