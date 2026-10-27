// Footer and header links. Paths come from lib/url.ts so nothing is hardcoded here.
import { staticPageUrl } from '@/lib/url';

export const primaryLinks = [
  { label: 'About Us', href: staticPageUrl('about-us') },
  { label: 'Privacy Policy', href: staticPageUrl('privacy-policy') },
  { label: 'Contact Us', href: staticPageUrl('contact-us') },
];

export const footerLinks = [
  { label: 'About Us', href: staticPageUrl('about-us') },
  { label: 'Contact Us', href: staticPageUrl('contact-us') },
  { label: 'Privacy Policy', href: staticPageUrl('privacy-policy') },
  { label: 'Terms & Conditions', href: staticPageUrl('terms-conditions') },
];
