import Link from 'next/link';
import { getSite } from '@/lib/content';
import { imageSet } from '@/lib/images';
import { homeUrl } from '@/lib/url';

const DARK_LOGO = '/settings/trendswheel-logo-dark-d38b5d.png';

export default function Logo({ priority = false }: { priority?: boolean }) {
  const site = getSite();
  const light = imageSet(site.logo ?? '/web-assets/media/logo/logo.png', '140px');
  const dark = imageSet(DARK_LOGO, '140px');
  return (
    <Link href={homeUrl()} className="inline-flex items-center" aria-label={`${site.name} home`}>
      <picture>
        <source srcSet={dark.srcSet ?? dark.src} sizes={dark.sizes} media="(prefers-color-scheme: dark)" />
        <img
          src={light.src}
          srcSet={light.srcSet}
          sizes={light.sizes}
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
