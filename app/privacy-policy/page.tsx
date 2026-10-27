import type { Metadata } from 'next';
import JsonLd from '@/components/JsonLd';
import Breadcrumbs from '@/components/post/Breadcrumbs';
import { getLegalPage } from '@/lib/content';
import { buildMetadata, simplePageSchema } from '@/lib/seo';
import { staticPageUrl } from '@/lib/url';

const page = getLegalPage('privacy-policy');
const path = staticPageUrl('privacy-policy');

export const metadata: Metadata = buildMetadata({ title: page.title, description: page.metaDescription, keywords: page.metaKeywords, path });

export default function PrivacyPolicyPage() {
  return (
    <>
      <JsonLd data={simplePageSchema('WebPage', `Privacy Policy - TrendsWheel`, 'Read the privacy policy of TrendsWheel to understand how we collect and protect user data.', path)} />
      <div className="hero-band">
        <header className="container-narrow py-8 text-center sm:py-12">
          <Breadcrumbs items={[{ name: 'Home', href: '/' }, { name: page.heading }]} />
          <span className="mx-auto mt-6 flex size-16 items-center justify-center rounded-2xl bg-brand text-white shadow-lg" aria-hidden="true">
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2 4 5v6c0 5 3.4 9.4 8 11 4.6-1.6 8-6 8-11V5l-8-3Z" />
              <path d="m9 12 2 2 4-4" />
            </svg>
          </span>
          <h1 className="font-display mt-5 text-4xl font-bold sm:text-5xl">{page.heading}</h1>
          <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-brand" aria-hidden="true" />
          <p className="mt-4 inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-sm font-semibold text-ink-2 ring-1 ring-line">
            <span className="size-2 rounded-full bg-brand" aria-hidden="true" />
            Last Updated: {page.lastUpdated}
          </p>
        </header>
      </div>
      <div className="container-narrow py-8">
        <div className="rounded-[28px] border border-line bg-white p-6 shadow-sm sm:p-10">
          <div className="legal-body" dangerouslySetInnerHTML={{ __html: page.html }} />
        </div>
      </div>
    </>
  );
}
