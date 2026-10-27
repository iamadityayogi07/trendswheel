import Link from 'next/link';
import { getSite } from '@/lib/content';
import { homeUrl } from '@/lib/url';

const DARK_LOGO = '/settings/trendswheel-logo-dark-d38b5d.png';

export default function Logo({ priority = false }: { priority?: boolean }) {
  const site = getSite();
  const logo = site.logo ?? '/web-assets/media/logo/logo.png';
  return (
    <Link href={homeUrl()} className="inline-flex items-center" aria-label={`${site.name} home`}>
      <picture>
        <source srcSet={DARK_LOGO} media="(prefers-color-scheme: dark)" />
        <img
          src={logo}
          alt={`${site.name} logo`}
          width={70}
          height={40}
          className="h-10 w-auto"
          {...(priority ? { fetchPriority: 'high' as const } : { loading: 'lazy' as const })}
        />
      </picture>
    </Link>
  );
}
