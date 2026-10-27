// Homepage copy carried over word-for-word from the old WebController / index.blade.php.
import type { FaqItem } from '@/lib/content';

export const homeFaq: FaqItem[] = [
  {
    title: 'What topics does TrendsWheel cover?',
    description:
      "Mostly Android how-to's and troubleshooting, app and AI tool reviews, tech news explained in plain language, and social media growth tips. Check the Categories menu at the top for all four.",
  },
  {
    title: 'How often is the content updated?',
    description:
      "Whenever something changes, honestly. There's no fixed schedule - if an app redesigns its settings menu or a feature gets removed, we go back and update the article. The date at the top of each post shows when it was last checked.",
  },
  {
    title: 'Who writes the articles?',
    description: "A small team that actually tests what we write about, rather than just researching it online. Each article has the author's name on it.",
  },
  {
    title: 'Is everything on TrendsWheel free?',
    description:
      "Yes. No paywalls, no sign-up required. The site runs on ads, which is why you'll see them, but they're kept separate from the actual guide content.",
  },
  {
    title: 'Found something wrong or outdated?',
    description:
      "Tell us. Use the Contact page, mention the article and what's off, and we'll take a look. Apps and phones change constantly, so we'd rather know than have the guide sit there being wrong.",
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
