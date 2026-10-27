'use client';

import { useEffect, useRef } from 'react';
import { ADSENSE_CLIENT, adMinHeight, adSlots, type AdKind } from '@/config/ads';

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

/**
 * One AdSense unit. Renders nothing when its slot id is empty.
 * The unit is pushed once, when it is within ~300px of the viewport (better speed + viewability).
 */
export default function AdUnit({ kind = 'display', className = '' }: { kind?: AdKind; className?: string }) {
  const slot = adSlots[kind];
  const box = useRef<HTMLDivElement>(null);
  const pushed = useRef(false);

  useEffect(() => {
    const el = box.current;
    if (!slot || !el) return;
    const push = () => {
      if (pushed.current) return; // also guards React Strict Mode's double effect
      pushed.current = true;
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch {
        /* ad blockers / script not loaded */
      }
    };
    if (!('IntersectionObserver' in window)) {
      push();
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          io.disconnect();
          push();
        }
      },
      { rootMargin: '300px 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [slot]);

  if (!slot) return null;

  const common = { className: 'adsbygoogle', 'data-ad-client': ADSENSE_CLIENT, 'data-ad-slot': slot } as const;
  return (
    <aside className={`ad-slot ${className}`} aria-label="Advertisement" ref={box} style={{ minHeight: adMinHeight[kind] }}>
      <span className="ad-label">Advertisement</span>
      {kind === 'inArticle' && (
        <ins {...common} style={{ display: 'block', textAlign: 'center' }} data-ad-layout="in-article" data-ad-format="fluid" />
      )}
      {kind === 'inFeed' && (
        <ins {...common} style={{ display: 'block' }} data-ad-format="fluid" data-ad-layout-key={adSlots.inFeedLayoutKey} />
      )}
      {kind === 'display' && (
        <ins {...common} style={{ display: 'block' }} data-ad-format="auto" data-full-width-responsive="true" />
      )}
    </aside>
  );
}
