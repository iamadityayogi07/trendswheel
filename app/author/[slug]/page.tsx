import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import JsonLd from '@/components/JsonLd';
import AdUnit from '@/components/ads/AdUnit';
import Breadcrumbs from '@/components/post/Breadcrumbs';
import LoadMore from '@/components/post/LoadMore';
import PostCard from '@/components/post/PostCard';
import { getAuthor, getAuthors, getPopularPosts, getPostsByAuthor } from '@/lib/content';
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
  const popular = getPopularPosts(5);

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

      <AdUnit kind="display" />

      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_340px]">
      <section className="mt-10 min-w-0" aria-labelledby="author-posts">
        <h2 id="author-posts" className="font-display text-2xl font-bold">
          Articles by {a.name} ({posts.length})
        </h2>
        <div className="mt-5">
          <LoadMore initial={12} className="grid gap-6 sm:grid-cols-2">
            {posts.map((p) => (
              <PostCard key={p.slug} post={p} />
            ))}
          </LoadMore>
        </div>
        <AdUnit kind="display" />
      </section>

      {popular.length > 0 && (
        <aside aria-label="Sidebar" className="lg:mt-10">
          <section aria-labelledby="popular" className="rounded-2xl border border-line bg-white p-5 shadow-sm">
            <h2 id="popular" className="font-display flex items-center gap-2.5 text-xl font-bold">
              <span className="h-6 w-1.5 rounded-full bg-brand" aria-hidden="true" />
              Popular Articles
            </h2>
            <ul className="mt-4 space-y-2">
              {popular.map((p) => (
                <li key={p.slug} className="-mx-2 rounded-xl p-2 transition hover:bg-brand-soft/60">
                  <PostCard post={p} compact />
                </li>
              ))}
            </ul>
          </section>
          <AdUnit kind="display" className="!mb-0" />
          <div className="sticky top-24">
            <AdUnit kind="display" className="!mt-0" />
          </div>
        </aside>
      )}
      </div>
    </div>
  );
}
