import { primaryLinks } from '@/config/nav';
import { getCategories } from '@/lib/content';
import { DesktopNav, MobileMenu } from './HeaderNav';
import Logo from './Logo';
import SearchBox from './SearchBox';

export default function Header() {
  const categories = getCategories().map((c) => ({ name: c.name, slug: c.slug }));
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-white/90 backdrop-blur-md">
      <div className="h-[3px] bg-gradient-to-r from-brand via-orange-400 to-amber-300" aria-hidden="true" />
      <div className="container-page flex h-[68px] items-center gap-3">
        <Logo priority />
        <DesktopNav categories={categories} links={primaryLinks} />
        <div className="ml-auto flex items-center gap-2">
          <SearchBox className="hidden w-64 sm:block xl:w-72" />
          <MobileMenu categories={categories} links={primaryLinks} />
        </div>
      </div>
      <div className="container-page pb-3 sm:hidden">
        <SearchBox className="w-full" />
      </div>
    </header>
  );
}
