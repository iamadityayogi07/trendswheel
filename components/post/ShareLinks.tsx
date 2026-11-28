'use client';

import { useState } from 'react';

type Props = {
  url: string;
  title: string;
};

export default function ShareLinks({ url, title }: Props) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      if (typeof navigator !== 'undefined' && navigator.clipboard) {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2200);
      }
    } catch {
      /* ignore clipboard error */
    }
  };

  const platforms = [
    {
      name: 'X',
      href: `https://x.com/intent/post?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
      hover: 'hover:border-black hover:bg-black hover:text-white',
      icon: (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.2 2.25h3.3l-7.2 8.23L22.8 21.75h-6.64l-5.2-6.8-5.95 6.8H1.7l7.7-8.8L1.2 2.25h6.8l4.7 6.21 5.5-6.21Zm-1.16 17.52h1.83L7.05 4.13H5.1l11.94 15.64Z" />
        </svg>
      ),
    },
    {
      name: 'WhatsApp',
      href: `https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`,
      hover: 'hover:border-[#25D366] hover:bg-[#25D366] hover:text-white',
      icon: (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 21l1.7-5A9 9 0 1 1 8 19.3L3 21Z" />
          <path d="M9 10c0 3 2 5 5 5l1.2-1.4-2-1-.8.7c-.8-.4-1.5-1.1-1.9-1.9l.7-.8-1-2L9 10Z" />
        </svg>
      ),
    },
    {
      name: 'LinkedIn',
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      hover: 'hover:border-[#0a66c2] hover:bg-[#0a66c2] hover:text-white',
      icon: (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77Z" />
        </svg>
      ),
    },
    {
      name: 'Facebook',
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      hover: 'hover:border-[#1877f2] hover:bg-[#1877f2] hover:text-white',
      icon: (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3Z" />
        </svg>
      ),
    },
  ];

  return (
    <div
      className="my-8 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-line/80 bg-white p-4 sm:p-5 shadow-2xs"
      role="group"
      aria-label="Share this article"
    >
      <div className="flex items-center gap-2.5">
        <span
          className="flex size-8 items-center justify-center rounded-lg bg-brand/10 text-brand-strong"
          aria-hidden="true"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="18" cy="5" r="3" />
            <circle cx="6" cy="12" r="3" />
            <circle cx="18" cy="19" r="3" />
            <path d="m8.6 13.5 6.8 4M15.4 6.5l-6.8 4" />
          </svg>
        </span>
        <div>
          <span className="font-display text-sm font-bold text-ink block">
            Share this guide
          </span>
          <span className="text-[11px] text-muted hidden sm:block">
            Help other readers solve this technical issue
          </span>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {platforms.map((p) => (
          <a
            key={p.name}
            href={p.href}
            target="_blank"
            rel="noopener noreferrer nofollow"
            className={`inline-flex h-9 items-center gap-2 rounded-xl border border-line/80 bg-surface-2/60 px-3 py-1.5 text-xs font-bold text-ink transition duration-200 cursor-pointer ${p.hover}`}
            title={`Share on ${p.name}`}
          >
            {p.icon}
            <span className="hidden md:inline">{p.name}</span>
          </a>
        ))}

        {/* Copy Link Button */}
        <button
          type="button"
          onClick={handleCopy}
          className={`inline-flex h-9 items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-bold transition duration-200 cursor-pointer ${
            copied
              ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
              : 'border-line/80 bg-white text-ink hover:border-brand hover:text-brand-strong'
          }`}
          title="Copy Link to Clipboard"
        >
          {copied ? (
            <>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span>Copied!</span>
            </>
          ) : (
            <>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
              </svg>
              <span>Copy Link</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
