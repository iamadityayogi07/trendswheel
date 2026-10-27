import { getAllPosts, stripHtml } from '@/lib/content';
import { postUrl } from '@/lib/url';

export const dynamic = 'force-static';

// Static index for the header autocomplete (title, description, keywords), like the old /search/suggest endpoint.
export const GET = () =>
  Response.json(
    getAllPosts().map((p) => ({
      title: p.title,
      url: postUrl(p.category.slug, p.slug),
      category: p.category.name,
      description: stripHtml(p.description),
      keywords: p.metaKeywords ?? '',
    })),
  );
