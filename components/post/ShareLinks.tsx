const targets = (url: string, title: string) => [
  { name: 'X', href: `https://x.com/intent/post?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}` },
  { name: 'Facebook', href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}` },
  { name: 'WhatsApp', href: `https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}` },
  { name: 'LinkedIn', href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}` },
];

/** Plain links, no third-party scripts. */
export default function ShareLinks({ url, title }: { url: string; title: string }) {
  return (
    <div className="my-6 flex flex-wrap items-center gap-2" aria-label="Share this article">
      <span className="mr-1 text-sm font-semibold text-muted">Share:</span>
      {targets(url, title).map((t) => (
        <a key={t.name} href={t.href} target="_blank" rel="noopener noreferrer nofollow" className="btn btn-outline !min-h-11 !px-4 !py-1 text-sm">
          {t.name}
        </a>
      ))}
    </div>
  );
}
