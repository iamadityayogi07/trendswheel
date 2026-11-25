// Category page copy carried over word-for-word from the old Blade partials
// (category-intro.blade.php and category-editorial-note.blade.php).

export type CategoryCopy = {
  heading: string;
  intro: string[];
  /** [post slug, one-line reason]; only posts that exist are shown. */
  picks: [string, string][];
  note: string;
};

export const categoryCopy: Record<string, CategoryCopy> = {
  'how-to': {
    heading: 'Android How-To Guides',
    intro: [
      'These guides cover the Android problems people search for most: a slow phone, a draining battery, a full storage screen, app permissions, and keeping your accounts safe from scams. Each guide gives the steps in order and says which parts can differ on your phone, because menu names change between brands and Android versions.',
      "Where a guide gives a menu path or a rule, it comes from the phone maker's or Google's help page, or from the government or regulator for India-specific topics such as UPI, the 1930 helpline and Sanchar Saathi. The source is linked at the bottom of the page, and the page shows when it was last updated. If a step does not match your phone, tell us on the Contact page and we will check it.",
    ],
    picks: [
      ['google-account-security-checklist-2026', 'The settings that protect your Google account most.'],
      ['how-to-report-online-fraud-1930-cybercrime-portal-india', 'Step-by-step reporting within the golden hour to freeze stolen funds.'],
      ['cancel-upi-autopay-mandate-gpay-phonepe-paytm', 'How to stop recurring UPI wallet and app deductions.'],
      ['activate-dnd-jio-airtel-vi-stop-spam-calls-1909', 'Permanent 1909 telecom DND activation and TRAI complaint filing.'],
      ['how-to-unlist-number-from-truecaller-permanently-2026', 'Unlist and delete public caller database records permanently.'],
      ['someone-got-your-aadhaar-number-misuse-lock-biometrics', 'Prevent unauthorized SIM issuance and banking frauds by locking UIDAI biometrics.'],
      ['is-my-android-phone-hacked', 'Check apps, permissions and your account, in order.'],
      ['android-phone-slow-fixes', 'Storage, background apps and RAM, step by step.'],
    ],
    note: "Steps in a how-to guide come from the phone maker's or Google's own help pages, and the source is linked in the guide. Some guides also show the author's own test, with the phone, the Android version and the date. If a guide has no such test, it does not claim one.",
  },
  apps: {
    heading: 'Apps and Privacy',
    intro: [
      'This section is about decisions you make with apps: whether you need a VPN, how to choose a password manager, what happens to your data when you uninstall something. We do not publish ranked lists of apps. A ranking needs real testing, and we would rather say plainly what an app does and does not do than repeat a store listing.',
      'Before you install any app, read the Data safety section on its Play Store page and look at the permissions it asks for. The guides here show how, and where they name a product they say whether it has been used, and whether any link earns us a commission.',
    ],
    picks: [
      ['best-free-two-factor-authenticator-apps-android', 'Aegis, Ente, Bitwarden, and Google Authenticator compared.'],
      ['best-budget-expense-tracker-apps-india-no-sms-permission', 'Manual and privacy-friendly finance logging without invasive SMS permissions.'],
      ['free-offline-gps-navigation-apps-no-mobile-data', 'Offline turn-by-turn navigation apps for dead zones and road trips.'],
      ['best-open-source-android-apps-f-droid', '10 essential open-source privacy utilities from F-Droid.'],
      ['how-to-run-two-whatsapp-accounts-one-phone', 'Official multi-account switcher vs dual app cloning.'],
      ['how-to-transfer-large-files-android-pc-wirelessly-fast', 'Local Wi-Fi file sharing at max speeds without cloud cables.'],
      ['best-free-vpn-apps-for-android-in-2025-fast-safe-secure', 'Do you need a VPN in India? What it does and does not do.'],
      ['best-password-manager-apps-for-android-2026', 'Google Password Manager first, and what to check in any other.'],
    ],
    note: 'We name a product only when we can say something checkable about it. If we have used an app, the guide says how long and on which phone. If a post ever includes affiliate links, it will say so at the top.',
  },
  tech: {
    heading: 'Tech Explained for India',
    intro: [
      'These articles explain how everyday technology works and what the rules around it are, with an India angle where it matters: eSIM activation on Jio, Airtel and Vi, ONDC, warranty rights under Indian consumer law, phone radiation (SAR), and what an employer or a repair shop can see on a device.',
      'We stay away from launch news, phone reviews and spec-sheet comparisons. Facts are taken from the maker, the operator, the regulator or the law itself, and linked at the bottom of each page. When we could not open an official source, the article says so instead of guessing.',
    ],
    picks: [
      ['wifi-5-vs-wifi-6-vs-wifi-7-router-upgrade-worth-it', 'When a router upgrade actually improves your real home speeds.'],
      ['usb-c-cable-types-charging-wattage-data-speed-guide', 'Decoding wattage (60W-240W) and data transfer speeds.'],
      ['fiber-broadband-vs-5g-airfiber-which-is-better', 'Latency, weather reliability, and real speeds compared.'],
      ['does-fast-charging-damage-smartphone-battery-health', 'The science of heat degradation and 80% charge limits.'],
      ['google-one-vs-icloud-vs-onedrive-cloud-storage-comparison', 'Storage pricing, compression, and cross-platform backup compared.'],
      ['why-traditional-vpns-are-being-replaced-by-zero-trust-ztna', 'Zero Trust Network Access architecture explained simply.'],
      ['ssd-vs-nvme-vs-emmc-storage-differences-explained', 'Storage controllers, sequential speeds, and longevity.'],
      ['what-is-esim-and-how-it-works-in-india-2025-updated-guide', "How eSIM works in India, from the operators' own pages."],
    ],
    note: 'Facts about rules, operators and devices are taken from the maker, the operator, the regulator or the law itself, and linked at the bottom of the article. When an official page could not be opened, we say so rather than fill the gap.',
  },
  social: {
    heading: 'Social Media Privacy and Short Video',
    intro: [
      'This section covers the settings that decide who can see you and contact you on Instagram, Facebook and WhatsApp, and how to think about choosing between Instagram Reels, YouTube Shorts and Facebook Reels. There are no follower-growth tricks here.',
      "Platforms move their menus often, so each guide names the setting to look for and links the platform's own help centre for the current path. Where a guide compares platforms, it uses what the platforms publish, and shows how to run the test on your own videos.",
    ],
    picks: [
      ['whatsapp-privacy-settings-you-must-turn-on-now', '7 essential WhatsApp privacy controls to enable right now.'],
      ['how-to-stop-instagram-tracking-across-other-apps-web', 'Disconnect Off-Meta activity and stop third-party tracking.'],
      ['how-to-spot-ai-deepfake-video-voice-scams-social-media', 'How to identify synthetic voice clone and video extortion calls.'],
      ['how-to-hide-whatsapp-online-status-and-last-seen-completely', 'Enable stealth ghost mode without getting caught.'],
      ['how-to-secure-telegram-account-against-hackers', '2FA cloud passwords, active session audits, and call IP protection.'],
      ['what-happens-when-you-block-someone-on-whatsapp-vs-instagram', 'Checkmarks, mutual groups, profile hiding, and future accounts.'],
      ['how-to-detect-if-someone-is-spying-on-your-whatsapp-web', 'Audit active linked devices and revoke unauthorized sessions.'],
      ['how-to-protect-your-privacy-on-social-media-2026', 'A comprehensive checklist for Instagram, Facebook and WhatsApp.'],
    ],
    note: "Platforms change their menus often. Guides here name the setting to look for and link the platform's own help centre, which is the final word on where it is today.",
  },
};

export const editorialPoints = [
  { title: 'Sources linked', text: 'Each article lists the official pages behind its facts' },
  { title: 'Dated', text: 'A "last updated" line shows when the article was last checked' },
  { title: 'Corrections welcome', text: 'Found a step that does not match your phone? Tell us on the', link: true },
];
