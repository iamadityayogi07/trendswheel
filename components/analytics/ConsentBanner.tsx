'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

const KEY = 'cookiesAccepted';

/** Same behaviour as the old site: a small notice; Accept grants analytics/ad storage via Consent Mode. */
export default function ConsentBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Deferred so the first client render matches the server HTML (no banner), then the banner appears if needed.
    const t = setTimeout(() => {
      let accepted = false;
      try {
        accepted = localStorage.getItem(KEY) === 'true';
      } catch {
        /* storage blocked */
      }
      if (accepted) window.gtag?.('consent', 'update', { ad_storage: 'granted', analytics_storage: 'granted' });
      else setShow(true);
    }, 0);
    return () => clearTimeout(t);
  }, []);

  if (!show) return null;
  const accept = () => {
    window.gtag?.('consent', 'update', { ad_storage: 'granted', analytics_storage: 'granted' });
    try {
      localStorage.setItem(KEY, 'true');
    } catch {
      /* private mode */
    }
    setShow(false);
  };
  return (
    <div role="region" aria-label="Cookie notice" className="fixed inset-x-0 bottom-0 z-[60] border-t border-line bg-surface p-3 shadow-[0_-4px_20px_rgb(0_0_0/12%)]">
      <div className="container-page flex flex-col items-center gap-3 sm:flex-row sm:justify-between">
        <p className="text-sm text-ink-2">
          We use cookies to improve your experience. By using our site, you agree to our{' '}
          <Link href="/privacy-policy" className="font-semibold text-brand-strong underline">
            Privacy Policy
          </Link>
          .
        </p>
        <button type="button" onClick={accept} className="btn shrink-0">
          Accept
        </button>
      </div>
    </div>
  );
}
