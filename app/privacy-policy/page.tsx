import type { Metadata } from 'next';
import Link from 'next/link';
import AdUnit from '@/components/ads/AdUnit';
import JsonLd from '@/components/JsonLd';
import Breadcrumbs from '@/components/post/Breadcrumbs';
import { getLegalPage } from '@/lib/content';
import { buildMetadata, simplePageSchema } from '@/lib/seo';
import { staticPageUrl } from '@/lib/url';

const page = getLegalPage('privacy-policy');
const path = staticPageUrl('privacy-policy');

export const metadata: Metadata = buildMetadata({
  title: page.title,
  description: page.metaDescription,
  keywords: page.metaKeywords,
  path,
});

const legalSections = [
  { id: 'section-1', title: '1. Information We Collect' },
  { id: 'section-2', title: '2. Cookies & Google AdSense' },
  { id: 'section-3', title: '3. Google Analytics' },
  { id: 'section-4', title: '4. External Links' },
  { id: 'section-5', title: '5. Data Security' },
  { id: 'section-6', title: '6. Updates to This Policy' },
  { id: 'section-7', title: '7. Contact Us' },
];

function injectSectionIds(html: string): string {
  let output = html;
  legalSections.forEach((s) => {
    const escaped = s.title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`<h3>(${escaped})</h3>`, 'gi');
    output = output.replace(
      regex,
      `<h3 id="${s.id}" class="scroll-mt-28 !mt-8 !pt-4 first:!mt-0">$1</h3>`
    );
  });
  return output;
}

export default function PrivacyPolicyPage() {
  const processedHtml = injectSectionIds(page.html);

  return (
    <>
      <JsonLd
        data={simplePageSchema(
          'WebPage',
          'Privacy Policy - TrendsWheel',
          'Read the privacy policy of TrendsWheel to understand how we collect and protect user data.',
          path
        )}
      />

      <div className="container-page py-6">
        {/* Breadcrumbs */}
        <Breadcrumbs
          items={[{ name: 'Home', href: '/' }, { name: 'Privacy Policy' }]}
        />

        {/* Editorial Header Banner */}
        <header className="mt-4 rounded-2xl border border-indigo-100 bg-gradient-to-r from-[#eef2ff] via-[#f5f3ff] to-[#eef6ff] p-6 sm:p-8 lg:px-10 lg:py-9 shadow-2xs">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="max-w-2xl">
              <div className="flex items-center gap-2">
                <span className="flex size-5 items-center justify-center rounded-md bg-brand/10 text-[11px] font-bold text-brand-strong">
                  🛡️
                </span>
                <span className="text-xs font-bold uppercase tracking-widest text-brand-strong">
                  Legal &amp; Compliance • Data Governance
                </span>
              </div>

              <h1 className="font-display mt-2 text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-ink">
                {page.heading}
              </h1>

              <p className="mt-2 text-xs sm:text-sm text-ink-2 leading-relaxed">
                At TrendsWheel, we believe in radical transparency. This policy details how our publication handles non-personal technical data, anonymous analytics, advertising cookies, and your consumer rights.
              </p>

              {/* Trust Metadata Pills */}
              <div className="mt-5 flex flex-wrap items-center gap-2.5 text-xs font-semibold">
                <span className="inline-flex items-center gap-1.5 rounded-lg bg-white/90 border border-line/70 px-3 py-1.5 text-ink shadow-2xs">
                  <span className="size-2 rounded-full bg-brand" aria-hidden="true" />
                  <span>Last Updated: {page.lastUpdated}</span>
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-lg bg-white/90 border border-line/70 px-3 py-1.5 text-ink shadow-2xs">
                  <span aria-hidden="true">✓</span>
                  <span>Zero Personal Data Sold</span>
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-lg bg-white/90 border border-line/70 px-3 py-1.5 text-ink shadow-2xs">
                  <span aria-hidden="true">🔒</span>
                  <span>GDPR &amp; CCPA Compliant</span>
                </span>
              </div>
            </div>

            {/* Decorative Vector Shield Graphic */}
            <div className="hidden md:flex size-24 shrink-0 items-center justify-center rounded-2xl bg-white/80 border border-indigo-200/60 shadow-sm text-brand-strong" aria-hidden="true">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2 4 5v6c0 5 3.4 9.4 8 11 4.6-1.6 8-6 8-11V5l-8-3Z" />
                <path d="m9 12 2 2 4-4" />
              </svg>
            </div>
          </div>
        </header>

        {/* 2-Column Responsive Layout */}
        <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_300px] xl:grid-cols-[minmax(0,1fr)_320px]">
          {/* Main Legal Content */}
          <main className="space-y-6">
            {/* Quick Summary Highlights Box */}
            <div className="rounded-2xl border border-line/80 bg-surface-2/50 p-5 sm:p-6 shadow-2xs">
              <div className="flex items-center gap-2 border-b border-line/60 pb-3">
                <span className="flex size-6 items-center justify-center rounded-md bg-emerald-100 text-emerald-800 text-xs font-bold" aria-hidden="true">
                  ✓
                </span>
                <h2 className="font-display text-sm font-bold text-ink">
                  Summary at a Glance
                </h2>
              </div>

              <ul className="mt-4 space-y-2.5 text-xs sm:text-sm text-ink-2 leading-relaxed">
                <li className="flex items-start gap-2.5">
                  <span className="text-emerald-600 font-bold mt-0.5">•</span>
                  <span>
                    <strong>Zero Personal Data Collected:</strong> We do not require registration, forms, or personal identity verification to read our articles.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-emerald-600 font-bold mt-0.5">•</span>
                  <span>
                    <strong>Standard Advertising Cookies:</strong> Google AdSense uses standard, anonymous cookies (DoubleClick) to serve relevant tech advertisements.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-emerald-600 font-bold mt-0.5">•</span>
                  <span>
                    <strong>Easy Opt-Out Options:</strong> You can opt out of personalized ads via Google Ad Settings and disable Google Analytics tracking with one click.
                  </span>
                </li>
              </ul>
            </div>

            {/* Full Document Card */}
            <div className="rounded-2xl border border-line/80 bg-white p-6 sm:p-8 lg:p-10 shadow-2xs">
              <div
                className="legal-body prose-tw max-w-none text-ink-2"
                dangerouslySetInnerHTML={{ __html: processedHtml }}
              />
            </div>

            {/* Questions or Data Inquiries Contact Card */}
            <div className="rounded-2xl border border-line/80 bg-white p-6 sm:p-8 shadow-2xs">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h3 className="font-display text-base font-bold text-ink">
                    Questions or Privacy Requests?
                  </h3>
                  <p className="mt-1 text-xs sm:text-sm text-ink-2">
                    Our compliance team responds to all data inquiries within 48 business hours.
                  </p>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <a
                    href="mailto:info@trendswheel.com"
                    className="inline-flex items-center justify-center rounded-xl bg-brand px-4 py-2 text-xs font-bold text-white shadow-xs hover:bg-brand-strong transition"
                  >
                    Email Privacy Desk
                  </a>
                  <Link
                    href="/contact-us"
                    className="inline-flex items-center justify-center rounded-xl border border-line bg-surface-2 px-4 py-2 text-xs font-bold text-ink hover:border-brand hover:text-brand-strong transition"
                  >
                    Contact Us
                  </Link>
                </div>
              </div>
            </div>
          </main>

          {/* Right Sidebar: Policy Sections, Legal Links, Sticky Ad */}
          <aside className="space-y-6 h-full" aria-label="Legal Navigation">
            {/* Table of Contents Jump Nav */}
            <nav className="rounded-2xl border border-line/80 bg-white p-5 shadow-2xs">
              <div className="flex items-center gap-2 border-b border-line/60 pb-3">
                <span className="flex size-6 items-center justify-center rounded-md bg-brand/10 text-brand-strong text-xs font-bold" aria-hidden="true">
                  📑
                </span>
                <h2 className="font-display text-sm font-bold text-ink">
                  Policy Sections
                </h2>
              </div>

              <ul className="mt-3.5 space-y-1">
                {legalSections.map((s) => (
                  <li key={s.id}>
                    <a
                      href={`#${s.id}`}
                      className="block rounded-lg px-2.5 py-1.5 text-xs font-medium text-ink-2 transition hover:bg-surface-2 hover:text-brand-strong"
                    >
                      {s.title}
                    </a>
                  </li>
                ))}
              </ul>

              {/* Related Policies Section */}
              <div className="mt-5 border-t border-line/60 pt-4">
                <span className="text-[11px] font-bold uppercase tracking-wider text-muted block mb-2">
                  Related Documents
                </span>
                <ul className="space-y-1.5 text-xs">
                  <li>
                    <Link
                      href="/terms-conditions"
                      className="text-ink-2 font-semibold hover:text-brand-strong transition flex items-center justify-between"
                    >
                      <span>Terms &amp; Conditions</span>
                      <span aria-hidden="true">→</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/about-us"
                      className="text-ink-2 font-semibold hover:text-brand-strong transition flex items-center justify-between"
                    >
                      <span>Editorial Standards</span>
                      <span aria-hidden="true">→</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/contact-us"
                      className="text-ink-2 font-semibold hover:text-brand-strong transition flex items-center justify-between"
                    >
                      <span>Contact Editorial Desk</span>
                      <span aria-hidden="true">→</span>
                    </Link>
                  </li>
                </ul>
              </div>
            </nav>

            {/* Sticky Sidebar High-RPM Display Unit */}
            <div className="sticky top-28 z-10">
              <AdUnit kind="display" className="!my-0 shadow-xs" />
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
