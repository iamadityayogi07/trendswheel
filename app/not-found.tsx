import Link from 'next/link';
import PostCard from '@/components/post/PostCard';
import { getAllPosts, getCategories } from '@/lib/content';
import { archiveUrl, categoryUrl } from '@/lib/url';

export const metadata = { title: 'Page not found | TrendsWheel', robots: { index: false, follow: true } };

export default function NotFound() {
  const latest = getAllPosts().slice(0, 3);
  return (
    <div className="container-page py-14">
      <p className="text-sm font-bold uppercase tracking-wide text-brand-strong">Error 404</p>
      <h1 className="font-display mt-2 text-4xl font-bold">We couldn&apos;t find that page</h1>
      <p className="mt-3 max-w-xl text-lg text-ink-2">The link may be old or mistyped. Try one of these instead.</p>
      <div className="mt-6 flex flex-wrap gap-3">
        <Link href="/" className="btn">
          Go to the homepage
        </Link>
        <Link href={archiveUrl()} className="btn btn-outline">
          All articles
        </Link>
        {getCategories().map((c) => (
          <Link key={c.slug} href={categoryUrl(c.slug)} className="btn btn-outline">
            {c.name}
          </Link>
        ))}
      </div>
      <h2 className="font-display mt-12 text-2xl font-bold">Latest articles</h2>
      <ul className="mt-5 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {latest.map((p) => (
          <li key={p.slug}>
            <PostCard post={p} />
          </li>
        ))}
      </ul>
    </div>
  );
}
