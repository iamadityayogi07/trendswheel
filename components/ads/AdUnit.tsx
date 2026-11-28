'use client';

import { useEffect, useRef } from 'react';
import { ADSENSE_CLIENT, adMinHeight, adSlots, type AdKind } from '@/config/ads';

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

/**
 * One AdSense unit with guaranteed min-height (0 CLS) and clear editorial labeling.
 * The unit is pushed once when it approaches viewport (300px rootMargin) for optimal viewability and speed.
 */
export default function AdUnit({
  kind = 'display',
  className = '',
  showLabel = true,
}: {
  kind?: AdKind;
  className?: string;
  showLabel?: boolean;
}) {
  const slot = kind === 'leaderboard' ? adSlots.display : adSlots[kind];
  const box = useRef<HTMLDivElement>(null);
  const pushed = useRef(false);

  useEffect(() => {
    const el = box.current;
    if (!slot || !el) return;
    const push = () => {
      if (pushed.current) return;
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
    <aside
      className={`ad-slot my-8 mx-auto w-full max-w-5xl overflow-hidden rounded-xl border border-line/70 bg-[#fafbfc] p-3 text-center transition-shadow ${className}`}
      aria-label="Advertisement"
      ref={box}
      style={{ minHeight: adMinHeight[kind] + (showLabel ? 28 : 0) }}
    >
      {showLabel && (
        <div className="mb-2 flex items-center justify-center gap-2">
          <span className="h-px w-8 bg-line" aria-hidden="true" />
          <span className="text-[10px] font-bold uppercase tracking-widest text-muted/80">Advertisement</span>
          <span className="h-px w-8 bg-line" aria-hidden="true" />
        </div>
      )}
      <div className="flex items-center justify-center overflow-hidden">
        {kind === 'inArticle' && (
          <ins {...common} style={{ display: 'block', textAlign: 'center', width: '100%' }} data-ad-layout="in-article" data-ad-format="fluid" />
        )}
        {kind === 'inFeed' && (
          <ins {...common} style={{ display: 'block', width: '100%' }} data-ad-format="fluid" data-ad-layout-key={adSlots.inFeedLayoutKey} />
        )}
        {kind === 'leaderboard' && (
          <ins {...common} style={{ display: 'block', width: '100%' }} data-ad-format="auto" data-full-width-responsive="true" />
        )}
        {kind === 'display' && (
          <ins {...common} style={{ display: 'block', width: '100%' }} data-ad-format="auto" data-full-width-responsive="true" />
        )}
      </div>
    </aside>
  );
}
