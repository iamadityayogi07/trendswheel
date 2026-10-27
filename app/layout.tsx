import type { Metadata, Viewport } from 'next';
import { League_Spartan, Roboto } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import ConsentBanner from '@/components/analytics/ConsentBanner';
import JsonLd from '@/components/JsonLd';
import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import { ADSENSE_CLIENT } from '@/config/ads';
import { GA_ID, SITE_LANG, SITE_URL, THEME_COLOR } from '@/config/site';
import { getSite } from '@/lib/content';
import { organizationSchema } from '@/lib/seo';

const body = Roboto({ subsets: ['latin'], weight: ['400', '500', '700'], display: 'swap', variable: '--font-body' });
const heading = League_Spartan({ subsets: ['latin'], weight: ['600', '700'], display: 'swap', variable: '--font-heading' });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  authors: [{ name: 'TrendsWheel' }],
  icons: { icon: getSite().favicon ?? '/favicon.ico', apple: getSite().favicon ?? undefined },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: THEME_COLOR,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang={SITE_LANG} className={`${body.variable} ${heading.variable}`}>
      <head>
        <link rel="preconnect" href="https://pagead2.googlesyndication.com" crossOrigin="anonymous" />
        <JsonLd data={organizationSchema()} />
      </head>
      <body className="flex min-h-screen flex-col">
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        <ConsentBanner />

        <Script
          id="adsense-init"
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`}
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
        <Script id="gtag-init" strategy="afterInteractive">
          {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('js',new Date());gtag('consent','default',{ad_storage:'denied',analytics_storage:'denied'});gtag('config','${GA_ID}',{cookie_flags:'SameSite=None;Secure'});`}
        </Script>
      </body>
    </html>
  );
}
