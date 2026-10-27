import type { Metadata } from 'next';
import JsonLd from '@/components/JsonLd';
import Breadcrumbs from '@/components/post/Breadcrumbs';
import { SITE_URL } from '@/config/site';
import { getSite } from '@/lib/content';
import { buildMetadata, simplePageSchema } from '@/lib/seo';
import { staticPageUrl } from '@/lib/url';

const path = staticPageUrl('contact-us');

export const metadata: Metadata = buildMetadata({
  title: 'Contact TrendsWheel | Get in Touch',
  description: 'Have questions, feedback, or a correction to report? Contact TrendsWheel - your source for tech news, app reviews, and how-to guides.',
  keywords: 'contact TrendsWheel, contact us, TrendsWheel support, tech news contact, app guides, how to guides, tech trends 2026',
  path,
});

export default function ContactPage() {
  const site = getSite();
  const mailto = `mailto:${site.email}?subject=${encodeURIComponent('Message for TrendsWheel')}`;
  const ld = simplePageSchema('ContactPage', 'Contact Us - TrendsWheel', 'Have questions or feedback? Contact TrendsWheel anytime.', path);
  return (
    <div className="container-narrow py-8">
      <JsonLd data={{ ...ld, contactPoint: { '@type': 'ContactPoint', contactType: 'Customer Support', email: 'info@trendswheel.com', availableLanguage: ['English', 'Hindi'] } }} />
      <Breadcrumbs items={[{ name: 'Home', href: '/' }, { name: 'Contact Us' }]} />
      <p className="mt-6 text-sm font-bold uppercase tracking-wide text-brand-strong">How may we help you</p>
      <h1 className="font-display mt-1 text-4xl font-bold">Contact Us</h1>
      <p className="mt-4 text-lg text-ink-2">
        Got a question, spotted something wrong in an article, or have a topic you&apos;d like us to cover? Send us a message and we&apos;ll get back to you.
      </p>

      <ul className="card mt-8 divide-y divide-line">
        <li className="p-4">
          <span className="block text-sm font-semibold text-muted">Address</span>
          {site.address}
        </li>
        <li className="p-4">
          <span className="block text-sm font-semibold text-muted">Email</span>
          <a href={`mailto:${site.email}`} className="font-semibold text-brand-strong underline">
            {site.email}
          </a>
        </li>
        {site.phone && (
          <li className="p-4">
            <span className="block text-sm font-semibold text-muted">Phone</span>
            <a href={`tel:${site.phone}`} className="font-semibold text-brand-strong underline">
              {site.phone}
            </a>
          </li>
        )}
        <li className="p-4">
          <span className="block text-sm font-semibold text-muted">Website</span>
          <a href={SITE_URL} rel="nofollow" className="font-semibold text-brand-strong underline">
            www.trendswheel.com
          </a>
        </li>
      </ul>

      <p className="mt-6">
        <a href={mailto} className="btn">
          Email us
        </a>
      </p>

      <div className="mt-8 overflow-hidden rounded-xl border border-line">
        <iframe
          title="Map of our location"
          className="block aspect-[16/9] w-full border-0"
          src={`https://www.google.com/maps?q=${encodeURIComponent(site.address)}&output=embed`}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </div>
    </div>
  );
}
