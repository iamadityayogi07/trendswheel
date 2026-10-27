import Link from 'next/link';
import { getSite } from '@/lib/content';
import { imageSet } from '@/lib/images';
import { homeUrl } from '@/lib/url';

export default function Logo({ priority = false }: { priority?: boolean }) {
  const site = getSite();
  const light = imageSet(site.logo ?? '/web-assets/media/logo/logo.png', '140px');
  return (
    <Link href={homeUrl()} className="inline-flex items-center" aria-label={`${site.name} home`}>
      <picture>
        <img
          src={light.src}
          srcSet={light.srcSet}
          sizes={light.sizes}
          alt={`${site.name} logo`}
          width={84}
          height={48}
          className="h-12 w-auto"
          {...(priority ? { fetchPriority: 'high' as const } : { loading: 'lazy' as const })}
        />
      </picture>
    </Link>
  );
}
