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
    <div className="container-narrow py-8">
      <JsonLd data={simplePageSchema('WebPage', `Privacy Policy - TrendsWheel`, 'Read the privacy policy of TrendsWheel to understand how we collect and protect user data.', path)} />
      <Breadcrumbs items={[{ name: 'Home', href: '/' }, { name: page.heading }]} />
      <h1 className="font-display mt-6 text-center text-4xl font-bold">{page.heading}</h1>
      <p className="mt-2 text-center italic text-muted">Last Updated: {page.lastUpdated}</p>
      <div className="page-body mt-8" dangerouslySetInnerHTML={{ __html: page.html }} />
    </div>
  );
}
