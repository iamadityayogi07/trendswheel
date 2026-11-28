// Homepage copy carried over word-for-word from the old WebController / index.blade.php.
import type { FaqItem } from '@/lib/content';

export const homeFaq: FaqItem[] = [
  {
    title: 'What technical domains does TrendsWheel cover?',
    description:
      "TrendsWheel specializes in four core areas: in-depth Android diagnostics and recovery workflows, cross-platform application and AI productivity tool reviews, accessible explainers on emerging hardware and networking architectures, and data-backed social platform mechanics. Browse our Category hubs in the masthead for complete archives.",
  },
  {
    title: 'How are troubleshooting steps and guides verified?',
    description:
      'Every procedure published on TrendsWheel is executed hands-on in our testing lab on physical hardware, test devices, and active developer environments before release. When a tutorial instructs you to edit system settings, execute terminal commands, or adjust developer partitions, our editors have verified that it works safely without compromising device security.',
  },
  {
    title: 'How often is technical documentation updated?',
    description:
      'We run ongoing deprecation audits. Whenever an Android platform update, vendor firmware rollout, or app redesign alters a setting path or breaks an existing workaround, our team re-tests the workflow and republishes the guide with a verified update timestamp.',
  },
  {
    title: 'Who writes and reviews TrendsWheel articles?',
    description:
      'All articles are authored by experienced technical researchers, software engineers, and digital privacy analysts. Every guide carries a transparent byline with the author\'s verifiable credentials, testing environment specifications, and direct contact details.',
  },
  {
    title: 'Is TrendsWheel content completely free to access?',
    description:
      'Yes. All 248+ lab guides and technical deep dives are 100% open-access with no subscription paywalls or mandatory account creation. Our independent lab operations are supported by clearly labeled, non-intrusive advertising that complies strictly with zero-CLS performance standards and remains completely isolated from our editorial recommendations.',
  },
  {
    title: 'How do I report an outdated step or request a guide?',
    description:
      'If an app updates its interface overnight or you encounter a device-specific discrepancy, reach out directly to our editorial team via our Contact Desk. We investigate reader reports, re-test the solution, and deploy verified revisions within 24 hours.',
  },
];

export const trustBadges = [
  { title: 'Tested, not guessed', text: 'We use the app and follow the steps ourselves' },
  { title: 'Named authors', text: 'Every article has a byline, not a bot' },
  { title: 'Kept current', text: 'Updated when apps or Android actually change' },
  { title: 'Ads, clearly marked', text: 'You can always tell an ad from our actual advice' },
];

export const trustParagraphs = [
  'If a guide tells you to tap a setting, we tapped it first. Every article shows an "Updated on" date, and when an app changes its layout or Android ships something new, we go back and fix it instead of leaving it wrong.',
  "We stick to four things we actually know well - Android how-to's, app and AI tool reviews, tech explainers, and social media growth - instead of trying to cover everything and getting half of it wrong. If you want the research behind a guide, most articles link to the source or the setting they're describing so you can check it yourself.",
];
