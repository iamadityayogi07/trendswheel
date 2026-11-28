import type { Metadata } from 'next';
import Link from 'next/link';
import AdUnit from '@/components/ads/AdUnit';
import JsonLd from '@/components/JsonLd';
import Breadcrumbs from '@/components/post/Breadcrumbs';
import { getLegalPage } from '@/lib/content';
import { buildMetadata, simplePageSchema } from '@/lib/seo';
import { staticPageUrl } from '@/lib/url';

const page = getLegalPage('terms-conditions');
const path = staticPageUrl('terms-conditions');

export const metadata: Metadata = buildMetadata({
  title: page.title,
  description: page.metaDescription,
  keywords: page.metaKeywords,
  path,
});

const termsSections = [
  { id: 'section-1', title: '1. Use of Content' },
  { id: 'section-2', title: '2. Website Access' },
  { id: 'section-3', title: '3. External Links' },
  { id: 'section-4', title: '4. Advertising & Affiliate Disclosure' },
  { id: 'section-5', title: '5. Disclaimer' },
  { id: 'section-6', title: '6. Limitation of Liability' },
  { id: 'section-7', title: '7. Intellectual Property' },
  { id: 'section-8', title: '8. Changes to Terms' },
  { id: 'section-9', title: '9. Contact Us' },
];

function injectSectionIds(html: string): string {
  let output = html;
  termsSections.forEach((s) => {
    const escaped = s.title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`<h3>(${escaped})</h3>`, 'gi');
    output = output.replace(
      regex,
      `<h3 id="${s.id}" class="scroll-mt-28 !mt-8 !pt-4 first:!mt-0">$1</h3>`
    );
  });
  return output;
}

export default function TermsPage() {
  const processedHtml = injectSectionIds(page.html);

  return (
    <>
      <JsonLd
        data={simplePageSchema(
          'WebPage',
          'Terms & Conditions - TrendsWheel',
          'The terms and conditions governing use of TrendsWheel.',
          path
        )}
      />

      <div className="container-page py-6">
        {/* Breadcrumbs */}
        <Breadcrumbs
          items={[{ name: 'Home', href: '/' }, { name: 'Terms & Conditions' }]}
        />

        {/* Editorial Terms Header Banner */}
        <header className="mt-4 rounded-2xl border border-indigo-100 bg-gradient-to-r from-[#eef2ff] via-[#f5f3ff] to-[#eef6ff] p-6 sm:p-8 lg:px-10 lg:py-9 shadow-2xs">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="max-w-2xl">
              <div className="flex items-center gap-2">
                <span className="flex size-5 items-center justify-center rounded-md bg-brand/10 text-[11px] font-bold text-brand-strong">
                  ⚖️
                </span>
                <span className="text-xs font-bold uppercase tracking-widest text-brand-strong">
                  Legal Governance • Terms of Service
                </span>
              </div>

              <h1 className="font-display mt-2 text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-ink">
                {page.heading}
              </h1>

              <p className="mt-2 text-xs sm:text-sm text-ink-2 leading-relaxed">
                Please review the terms and conditions governing access to TrendsWheel&apos;s technical journalism, tutorials, hardware reviews, and web services.
              </p>

              {/* Trust Metadata Pills */}
              <div className="mt-5 flex flex-wrap items-center gap-2.5 text-xs font-semibold">
                <span className="inline-flex items-center gap-1.5 rounded-lg bg-white/90 border border-line/70 px-3 py-1.5 text-ink shadow-2xs">
                  <span className="size-2 rounded-full bg-brand" aria-hidden="true" />
                  <span>Last Updated: {page.lastUpdated}</span>
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-lg bg-white/90 border border-line/70 px-3 py-1.5 text-ink shadow-2xs">
                  <span aria-hidden="true">✓</span>
                  <span>Educational &amp; Informative Use</span>
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-lg bg-white/90 border border-line/70 px-3 py-1.5 text-ink shadow-2xs">
                  <span aria-hidden="true">🛡️</span>
                  <span>Fair Use with Attribution</span>
                </span>
              </div>
            </div>

            {/* Decorative Vector Scale Graphic */}
            <div className="hidden md:flex size-24 shrink-0 items-center justify-center rounded-2xl bg-white/80 border border-indigo-200/60 shadow-sm text-brand-strong text-4xl" aria-hidden="true">
              ⚖️
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
                    <strong>Educational Content:</strong> All guides, tutorials, and reviews are published in good faith for informational and educational purposes.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-emerald-600 font-bold mt-0.5">•</span>
                  <span>
                    <strong>Content Sharing &amp; Fair Use:</strong> You may quote or share excerpts with clear attribution and a link back to the original guide.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-emerald-600 font-bold mt-0.5">•</span>
                  <span>
                    <strong>Advertising Transparency:</strong> TrendsWheel is supported by Google AdSense and editorial independence is maintained across all guides.
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

            {/* Questions or Legal Inquiries Card */}
            <div className="rounded-2xl border border-line/80 bg-white p-6 sm:p-8 shadow-2xs">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h3 className="font-display text-base font-bold text-ink">
                    Questions Regarding Our Terms?
                  </h3>
                  <p className="mt-1 text-xs sm:text-sm text-ink-2">
                    Contact our editorial desk for clarification on content rights or licensing.
                  </p>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <a
                    href="mailto:info@trendswheel.com?subject=Terms%20and%20Conditions%20Inquiry"
                    className="inline-flex items-center justify-center rounded-xl bg-brand px-4 py-2 text-xs font-bold text-white shadow-xs hover:bg-brand-strong transition"
                  >
                    Email Legal Desk
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
                  Document Sections
                </h2>
              </div>

              <ul className="mt-3.5 space-y-1">
                {termsSections.map((s) => (
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
                      href="/privacy-policy"
                      className="text-ink-2 font-semibold hover:text-brand-strong transition flex items-center justify-between"
                    >
                      <span>Privacy Policy</span>
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
              <AdUnit kind="display" className="!my-0" />
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
