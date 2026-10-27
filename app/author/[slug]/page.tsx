import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import JsonLd from '@/components/JsonLd';
import Breadcrumbs from '@/components/post/Breadcrumbs';
import LoadMore from '@/components/post/LoadMore';
import PostCard from '@/components/post/PostCard';
import { getAuthor, getAuthors, getPostsByAuthor } from '@/lib/content';
import { authorMetadata, authorSchemas } from '@/lib/seo';

export const dynamicParams = false;

type Params = { slug: string };

export const generateStaticParams = (): Params[] => getAuthors().map((a) => ({ slug: a.slug }));

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const a = getAuthor(slug);
  return a ? authorMetadata(a, getPostsByAuthor(a.slug).length) : {};
}

export default async function AuthorPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const a = getAuthor(slug);
  if (!a) notFound();
  const posts = getPostsByAuthor(a.slug);

  return (
    <div className="container-page py-6">
      {authorSchemas(a, posts).map((s, i) => (
        <JsonLd key={i} data={s} />
      ))}
      <Breadcrumbs items={[{ name: 'Home', href: '/' }, { name: a.name }]} />

      <header className="card mt-6 flex flex-col items-start gap-5 p-6 sm:flex-row">
        {a.avatar && <img src={a.avatar} alt={a.name} width={128} height={128} fetchPriority="high" className="size-32 shrink-0 rounded-full object-cover" />}
        <div>
          <h1 className="font-display text-3xl font-bold">{a.name}</h1>
          {a.bio && <div className="page-body mt-3" dangerouslySetInnerHTML={{ __html: a.bio }} />}
        </div>
      </header>

      <section className="mt-10" aria-labelledby="author-posts">
        <h2 id="author-posts" className="font-display text-2xl font-bold">
          Articles by {a.name} ({posts.length})
        </h2>
        <div className="mt-5">
          <LoadMore initial={12} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((p) => (
              <PostCard key={p.slug} post={p} />
            ))}
          </LoadMore>
        </div>
      </section>
    </div>
  );
}
