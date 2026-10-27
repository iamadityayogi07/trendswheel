const ico = { width: 20, height: 20, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true } as const;

const targets = (url: string, title: string) => [
  {
    name: 'X',
    href: `https://x.com/intent/post?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
    hover: 'hover:border-black hover:bg-black',
    icon: <svg {...ico}><path d="M4 4l16 16M20 4 4 20" /></svg>,
  },
  {
    name: 'Facebook',
    href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    hover: 'hover:border-[#1877f2] hover:bg-[#1877f2]',
    icon: <svg {...ico}><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3Z" /></svg>,
  },
  {
    name: 'WhatsApp',
    href: `https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`,
    hover: 'hover:border-[#1da851] hover:bg-[#1da851]',
    icon: <svg {...ico}><path d="M3 21l1.7-5A9 9 0 1 1 8 19.3L3 21Z" /><path d="M9 10c0 3 2 5 5 5l1.2-1.4-2-1-.8.7c-.8-.4-1.5-1.1-1.9-1.9l.7-.8-1-2L9 10Z" /></svg>,
  },
  {
    name: 'LinkedIn',
    href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    hover: 'hover:border-[#0a66c2] hover:bg-[#0a66c2]',
    icon: <svg {...ico}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6Z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></svg>,
  },
];

/** Plain links, no third-party scripts. */
export default function ShareLinks({ url, title }: { url: string; title: string }) {
  return (
    <div className="my-8 flex flex-wrap items-center gap-3 rounded-2xl border border-line bg-gradient-to-r from-brand-soft/60 via-white to-surface-2 p-4 shadow-sm sm:px-6" role="group" aria-label="Share this article">
      <span className="font-display mr-1 flex items-center gap-2 text-base font-bold">
        <span className="flex size-9 items-center justify-center rounded-xl bg-brand text-white" aria-hidden="true">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="18" cy="5" r="3" />
            <circle cx="6" cy="12" r="3" />
            <circle cx="18" cy="19" r="3" />
            <path d="m8.6 13.5 6.8 4M15.4 6.5l-6.8 4" />
          </svg>
        </span>
        Share:
      </span>
      {targets(url, title).map((t) => (
        <a
          key={t.name}
          href={t.href}
          target="_blank"
          rel="noopener noreferrer nofollow"
          className={`inline-flex min-h-11 items-center gap-2 rounded-full border-2 border-line bg-white px-4 py-1 text-sm font-bold text-ink no-underline shadow-sm transition duration-200 hover:-translate-y-0.5 hover:text-white hover:shadow-md ${t.hover}`}
        >
          {t.icon}
          {t.name}
        </a>
      ))}
    </div>
  );
}
