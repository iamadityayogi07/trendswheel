import sys
import os
sys.path.append(os.path.dirname(__file__))
from base_generator import save_and_verify
from gen_howto_3 import posts

extra_posts = [
    {
        "id": 215,
        "slug": "how-to-secure-digilocker-account-mfa-security-pin",
        "title": "How to Secure Your DigiLocker Account with 6-Digit PIN & Biometric Two-Factor",
        "metaTitle": "Secure DigiLocker Account: 6-Digit PIN & Biometric 2FA (2026)",
        "metaDescription": "DigiLocker holds your Aadhaar, driving license, PAN, and vehicle RC. Step-by-step guide to locking your account with a secure security PIN, biometrics, and active session audits.",
        "metaKeywords": "secure digilocker account, change digilocker security pin, digilocker biometric login, digilocker hacked how to recover, digilocker two factor authentication",
        "excerpt": "DigiLocker stores your official Aadhaar, PAN, and driving documents. An unauthorized login grants immediate access to your identity. Here is how to lock it down completely.",
        "description": "Comprehensive security tutorial on hardening your Government of India DigiLocker account using 6-digit security PINs, biometric locks, consent revocation, and active device auditing.",
        "publishedAt": "2026-11-26T11:05:00.000Z",
        "updatedAt": "2026-11-26T11:05:00.000Z",
        "category": {"name": "Android How-To Guides", "slug": "how-to"},
        "tags": ["DigiLocker", "Cyber Security", "Aadhaar Security", "Digital Identity", "Government Schemes"],
        "author": {"name": "Aditya Yogi", "slug": "aditya-yogi"},
        "svg_file": "secure-digilocker-pin-mfa-featured.svg",
        "altImage": "Infographic illustrating security hardening steps for DigiLocker including 6-digit PIN, biometric authentication, and active consent audits",
        "svg_badge": "DIGITAL IDENTITY",
        "svg_title_1": "Secure Your DigiLocker Account",
        "svg_title_2": "6-Digit Security PIN &amp; 2FA",
        "svg_sub_1": "Protect your digital Aadhaar, PAN card, vehicle RC, and academic records",
        "svg_sub_2": "against unauthorized identity harvesting, SIM swaps, and consent leaks.",
        "svg_card1_title": "6-Digit Security PIN",
        "svg_card1_sub": "Master cryptographic PIN",
        "svg_card1_b1": "Avoid birth years or 123456",
        "svg_card1_b2": "Requires mandatory entry",
        "svg_card1_b3": "Blocks automated credential stuff",
        "svg_card2_title": "Biometric App Lock",
        "svg_card2_sub": "Hardware fingerprint gate",
        "svg_card2_b1": "Enforce biometric sensor lock",
        "svg_card2_b2": "Instant timeout on app exit",
        "svg_card2_b3": "Zero physical snooping access",
        "svg_card3_title": "Consent Revocation",
        "svg_card3_sub": "Audit third-party APIs",
        "svg_card3_b1": "Review DigiLocker Drive access",
        "svg_card3_b2": "Revoke stale fintech permits",
        "svg_card3_b3": "Complete sovereign privacy",
        "svg_theme": {"bg1": "#0c4a6e", "bg2": "#082f49", "bg3": "#031726", "accent": "#38bdf8", "glow": "#0284c7", "badge_color": "#7dd3fc"},
        "faq": [
            {
                "title": "What is the difference between a DigiLocker password and the 6-Digit Security PIN?",
                "description": "Historically, DigiLocker supported standard passwords. Under modern Ministry of Electronics and Information Technology (MeitY) standards, passwords have been phased out in favor of a mandatory 6-digit numeric Security PIN paired with an SMS OTP. The PIN acts as your second-factor authentication key alongside your Aadhaar number."
            },
            {
                "title": "Can a hacker access my DigiLocker documents if they steal my phone or clone my SIM card?",
                "description": "If a hacker clones your SIM card, they receive the SMS login OTP. However, they CANNOT log into DigiLocker without entering your confidential 6-digit Security PIN. This is why you must never set predictable PINs like '123456', '000000', or your birth year."
            },
            {
                "title": "How can I revoke DigiLocker consent from third-party loan or insurance apps?",
                "description": "In the DigiLocker web portal (digilocker.gov.in), log in and navigate to 'Consent' or 'My Profile & Permissions'. You can view a complete chronological ledger of every bank, NBFC, or fintech app that requested access to your documents and revoke their data access permissions with a single click."
            }
        ],
        "html": """<h2>The Crown Jewel of Indian Digital Identity</h2>
<p>In modern India, <strong>DigiLocker</strong> (operated by the Ministry of Electronics and Information Technology, MeitY) has evolved into the central repository of national digital life. Under Rule 9A of the Information Technology (Preservation and Retention of Information by Intermediaries Providing Digital Locker Facilities) Rules, documents issued into DigiLocker carry equal legal standing to original physical paper certificates under the Indian Evidence Act.</p>
<p>Inside an average citizen's DigiLocker repository resides their complete biographical and financial footprint: <strong>Aadhaar Card, Permanent Account Number (PAN), Driving License, Vehicle Registration Certificates (RC), Passport details, COVID vaccination certificates, university degree transcripts, and insurance policies</strong>. If an attacker gains unauthorized entry to your DigiLocker, they possess everything required to execute synthetic identity theft: taking instant personal loans in your name, issuing fraudulent SIM cards, and forging property agreements. This comprehensive security tutorial explains how to harden your DigiLocker account using strong PIN architecture, biometric locks, and third-party consent revocations.</p>

<h2>Understanding DigiLocker's Two-Factor Authentication Model</h2>
<p>DigiLocker authenticates users through a two-step identity challenge: something you have (your mobile SIM card receiving an SMS OTP) and something you know (your <strong>6-Digit Security PIN</strong>). If you registered your account years ago with an easily guessed sequence (like <code>123456</code> or your year of birth <code>199500</code>), your account is dangerously vulnerable to credential-stuffing and SIM-swap attacks.</p>

<h2>Step 1: Resetting and Hardening Your 6-Digit Security PIN</h2>
<ol>
  <li>Open the official <strong>DigiLocker</strong> application on your smartphone (or visit <code>https://www.digilocker.gov.in</code>).</li>
  <li>Sign in using your mobile number or Aadhaar number.</li>
  <li>Tap the <strong>Menu</strong> icon (or tap your profile picture in the top right corner) and select <strong>Settings</strong>.</li>
  <li>Tap <strong>Security PIN</strong> (or <em>Change Security PIN</em>).</li>
  <li>Enter your current PIN. If you cannot remember your current PIN, click <em>'Forgot Security PIN?'</em>. DigiLocker will verify your identity by asking for your registered mobile number and your complete Date of Birth matching your Aadhaar records, followed by a government SMS OTP.</li>
  <li><strong>Choose a High-Entropy Security PIN:</strong> Select a 6-digit sequence that follows strict cryptographic randomness. Never use:
    <ul>
      <li>Sequential numbers (e.g., <code>123456</code>, <code>654321</code>).</li>
      <li>Repeated numbers (e.g., <code>111111</code>, <code>999999</code>).</li>
      <li>Your birth day/month/year (e.g., <code>150892</code>).</li>
      <li>The last 6 digits of your mobile number or Aadhaar number.</li>
    </ul>
  </li>
  <li>Confirm the new 6-digit PIN and tap <strong>Submit</strong>.</li>
</ol>

<h2>Step 2: Enabling Biometric Fingerprint &amp; Face ID Authentication</h2>
<p>Prevent anyone who holds your unlocked smartphone from launching DigiLocker and reading your documents:</p>
<ol>
  <li>In the DigiLocker mobile app, navigate to <strong>Settings</strong>.</li>
  <li>Locate the toggle titled <strong>App Lock / Biometric Authentication</strong>.</li>
  <li>Toggle the switch to <strong>ON</strong>.</li>
  <li>Verify your physical fingerprint or Face ID when prompted by Android Keystore.</li>
  <li>Set the lock timeout preference to <strong>'Immediately'</strong>. Every time you switch away from the app or minimize it, DigiLocker will demand biometric authentication before displaying stored credentials.</li>
</ol>

<h2>Step 3: Auditing Third-Party Fintech and NBFC Consents</h2>
<p>When applying for credit cards, personal loans, or mutual fund KYC online, apps like Groww, Zerodha, Cred, and Bajaj Finance request access to your DigiLocker repository via API. Many users forget that these permissions often grant ongoing read privileges:</p>
<ol>
  <li>Log into the desktop web portal: <strong>https://www.digilocker.gov.in</strong> (the web portal provides a more exhaustive audit ledger than the mobile app).</li>
  <li>On the left sidebar, click on <strong>Activities / Consent</strong>.</li>
  <li>Carefully review the chronological ledger of third-party organizations that have accessed your account.</li>
  <li>Look for services you used years ago or financial platforms you no longer do business with.</li>
  <li>Click <strong>Revoke Access</strong> next to each outdated entity. This immediately invalidates the OAuth access token, cutting off their ability to query your Aadhaar or driving records.</li>
</ol>

<h2>DigiLocker Security Checklist Matrix</h2>
<table>
  <thead>
    <tr>
      <th>Security Layer</th>
      <th>Primary Threat Neutralized</th>
      <th>Recommended Configuration</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>6-Digit Security PIN</td>
      <td>Credential-stuffing and SIM swap logins</td>
      <td>Random, non-birthday alphanumeric-free 6-digit key</td>
    </tr>
    <tr>
      <td>Biometric App Lock</td>
      <td>Physical theft of an unlocked smartphone</td>
      <td>Mandatory fingerprint scan on every app launch</td>
    </tr>
    <tr>
      <td>Consent Audit</td>
      <td>Unauthorized data harvesting by fintech apps</td>
      <td>Quarterly revocation of inactive third-party tokens</td>
    </tr>
    <tr>
      <td>Aadhaar Biometric Lock</td>
      <td>Unauthorized e-KYC authentication attempts</td>
      <td>Locked via mAadhaar app (unlocked only on-demand)</td>
    </tr>
  </tbody>
</table>

<h2>Preventative Architecture &amp; Companion Recommendations</h2>
<p>DigiLocker is your sovereign digital identity vault. Protecting it requires coordinating your broader telecom and Aadhaar defenses. Explore our companion guides on <a href=\"/how-to/someone-got-your-aadhaar-number-misuse-lock-biometrics\">locking your Aadhaar biometrics to prevent fraudulent identity harvesting</a>, learn <a href=\"/how-to/how-to-check-registered-sim-cards-on-your-aadhaar-tafcop\">how to check all mobile SIM cards registered to your name via TAFCOP</a>, and discover <a href=\"/how-to/cancel-upi-autopay-mandate-gpay-phonepe-paytm\">how to audit and cancel active UPI autopay mandates across payment apps</a>.</p>"""
    },
    {
        "id": 216,
        "slug": "how-to-turn-off-google-assistant-gemini-power-button-hijack",
        "title": "How to Restore the Classic Power Off Menu and Disable Gemini Power Button Hijack",
        "metaTitle": "Restore Classic Power Off Menu & Disable Gemini Hijack (2026)",
        "metaDescription": "Holding your phone's power button launches Google Gemini or Assistant instead of the Power Off / Restart menu? Step-by-step guide to restoring the classic power menu on Android.",
        "metaKeywords": "disable gemini power button, restore classic power menu android, hold power button power off samsung, turn off google assistant power button android",
        "excerpt": "Modern Android updates hijacked the physical power button to launch Gemini AI instead of letting you turn off your phone. Here is how to restore the traditional power menu.",
        "description": "Comprehensive tutorial on reclaiming the physical hardware power button across Samsung One UI, Google Pixel, Xiaomi HyperOS, and OnePlus to restore the traditional Power Off, Restart, and Emergency menu.",
        "publishedAt": "2026-11-26T11:10:00.000Z",
        "updatedAt": "2026-11-26T11:10:00.000Z",
        "category": {"name": "Android How-To Guides", "slug": "how-to"},
        "tags": ["Android Settings", "Google Gemini", "One UI", "Pixel Android", "System Gestures"],
        "author": {"name": "Aditya Yogi", "slug": "aditya-yogi"},
        "svg_file": "restore-power-menu-disable-gemini-featured.svg",
        "altImage": "Diagram showing how to change the hardware side key gesture from digital assistant to the classic Power Off menu",
        "svg_badge": "SYSTEM GESTURES",
        "svg_title_1": "Restore Classic Power Off Menu",
        "svg_title_2": "Disable Gemini &amp; Assistant Hijack",
        "svg_sub_1": "Reclaim your physical hardware power button from AI assistant overlays",
        "svg_sub_2": "across Samsung Galaxy, Google Pixel, OnePlus, and Xiaomi HyperOS.",
        "svg_card1_title": "Samsung One UI",
        "svg_card1_sub": "Side Key Settings",
        "svg_card1_b1": "Advanced features > Side button",
        "svg_card1_b2": "Press and hold: 'Power off menu'",
        "svg_card1_b3": "Bypasses Bixby &amp; Gemini",
        "svg_card2_title": "Google Pixel",
        "svg_card2_sub": "System Gestures menu",
        "svg_card2_b1": "Settings > System > Gestures",
        "svg_card2_b2": "Press &amp; hold power button",
        "svg_card2_b3": "Switch to 'Power menu'",
        "svg_card3_title": "OnePlus / Xiaomi",
        "svg_card3_sub": "Power Button shortcut",
        "svg_card3_b1": "Special features / Gestures",
        "svg_card3_b2": "Disable 'Hold for Assistant'",
        "svg_card3_b3": "Instant traditional rebooting",
        "svg_theme": {"bg1": "#1e1b4b", "bg2": "#1e3a8a", "bg3": "#0f172a", "accent": "#60a5fa", "glow": "#3b82f6", "badge_color": "#93c5fd"},
        "faq": [
            {
                "title": "Why did smartphone manufacturers replace the Power Off menu with digital assistants?",
                "description": "Tech giants (Google, Samsung, and Apple) repurposed the physical power button (now rebranded as the 'Side Button') into a dedicated hardware trigger for conversational AI assistants (Gemini, Bixby, and Siri) to drive daily active user engagement, forcing users to use awkward two-button combinations (Power + Volume Up) to shut down."
            },
            {
                "title": "How do I turn off my phone if the power button is currently hijacked by Gemini?",
                "description": "You can power off using either: 1) Press and hold the physical Power Button + Volume UP key simultaneously for 2 seconds, or 2) Swipe down twice from the top of your display to open the Quick Settings shade and tap the software Power Icon located near the settings gear."
            },
            {
                "title": "Does disabling Gemini on the power button delete my Gemini chat history?",
                "description": "No. Reconfiguring the hardware side key simply decouples the physical button long-press event from the digital assistant intent. Gemini remains fully functional via its app icon, home screen widget, or voice activation ('Hey Google')."
            }
        ],
        "html": """<h2>The Annoying Disappearance of the Power Off Button</h2>
<p>You find yourself in a quiet library, an executive meeting, a cinema, or a flight takeoff where you need to power off your smartphone immediately. You press and firmly hold the physical power button on the right edge of your phone, expecting to see the familiar, reliable options: <strong>'Power off'</strong>, <strong>'Restart'</strong>, and <strong>'Emergency'</strong>.</p>
<p>Instead, your phone vibrates and displays a colorful glowing animation at the bottom of your screen: <strong>Google Gemini (or Google Assistant / Bixby)</strong> opens, chirping: <em>'Hi, how can I help you today?'</em>. You furiously press the button again, only for the AI assistant to prompt you for voice input. Confused and frustrated, you wonder: <em>How on earth do I actually turn off my own phone?</em></p>
<p>Over the past three Android releases, device manufacturers have systematically hijacked the primary physical hardware key&#x2014;rebranding it from a 'Power Button' to a 'Side Key'&#x2014;to force adoption of their respective AI assistant ecosystems. To turn off a modern phone out-of-the-box, users are expected to execute contorted two-handed acrobatics: holding <strong>Power + Volume Up</strong> simultaneously, or pulling down the notification panel twice to hunt for a tiny software power icon. This straightforward tutorial demonstrates how to reclaim your physical hardware button and restore the traditional Power Off menu across all major smartphone brands in under 30 seconds.</p>

<h2>Step-by-Step Restoration Guide by Smartphone Brand</h2>

<h3>1. How to Restore the Classic Power Menu on Samsung Galaxy (One UI 5, 6 &amp; 7)</h3>
<p>Samsung replaced the power menu with Bixby years ago, and modern updates frequently route the button to Gemini. Here is how to fix it:</p>
<ol>
  <li>Open the <strong>Settings</strong> app on your Samsung Galaxy device.</li>
  <li>Scroll down and tap <strong>Advanced features</strong>.</li>
  <li>Tap <strong>Side button</strong> (or <em>Side key</em>).</li>
  <li>Under the section labeled <strong>'Press and hold'</strong>, you will see two options: <em>Wake Bixby / Launch assistant</em> and <strong>Power off menu</strong>.</li>
  <li>Select the radio button for <strong>Power off menu</strong>.</li>
  <li><em>(Optional Productivity Tip):</em> Under the <strong>'Double press'</strong> section above, you can set double-tapping the power button to instantly launch your <em>Camera</em> or open an essential utility like <em>Calculator</em> or <em>Torch</em>.</li>
  <li>Exit settings. Now, pressing and holding the side button will immediately bring up the classic Power Off, Restart, and Emergency SOS menu!</li>
</ol>

<h3>2. How to Restore the Power Menu on Google Pixel (Android 12, 13, 14 &amp; 15)</h3>
<p>Google Pixel devices pioneered the digital assistant power button takeover. To reclaim it:</p>
<ol>
  <li>Open <strong>Settings</strong> on your Google Pixel.</li>
  <li>Scroll down and tap <strong>System</strong>.</li>
  <li>Tap <strong>Gestures</strong>.</li>
  <li>Scroll to the bottom and select <strong>Press &amp; hold power button</strong>.</li>
  <li>You will see two choices: <em>Digital assistant (Gemini/Assistant)</em> and <strong>Power menu</strong>.</li>
  <li>Select <strong>Power menu</strong>.</li>
  <li>Test your configuration: press and hold the power button for one second. The traditional Android power carousel (Emergency, Lockdown, Power off, Restart) will appear instantly.</li>
</ol>

<h3>3. How to Restore the Power Menu on OnePlus &amp; Realme (OxygenOS &amp; Realme UI)</h3>
<ol>
  <li>Open <strong>Settings</strong>.</li>
  <li>Navigate to <strong>Special features</strong> (or <em>Additional settings &gt; Power button</em>).</li>
  <li>Tap <strong>Power button</strong>.</li>
  <li>Tap <strong>Press and hold the power button</strong>.</li>
  <li>Change the selection from <em>Voice Assistant</em> to <strong>Power menu</strong>.</li>
</ol>

<h3>4. How to Restore the Power Menu on Xiaomi, Redmi &amp; POCO (HyperOS &amp; MIUI)</h3>
<ol>
  <li>Open <strong>Settings</strong> &gt; <strong>Additional settings</strong>.</li>
  <li>Tap <strong>Gesture shortcuts</strong>.</li>
  <li>Tap <strong>Launch Google Assistant</strong>.</li>
  <li>Toggle off the switch for <strong>'Press and hold the Power button for 0.5s'</strong>.</li>
  <li>Once toggled off, holding the power button automatically defaults to the full-screen HyperOS power and reboot slider.</li>
</ol>

<h2>Hardware Button Mapping Matrix Across Major OEMs</h2>
<table>
  <thead>
    <tr>
      <th>Manufacturer</th>
      <th>Default Out-of-Box Behavior</th>
      <th>Settings Navigation Path</th>
      <th>Restored Functionality</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Samsung Galaxy</td>
      <td>Launches Bixby or Gemini</td>
      <td>Settings &gt; Advanced features &gt; Side button</td>
      <td>Classic One UI Power Off / Restart grid</td>
    </tr>
    <tr>
      <td>Google Pixel</td>
      <td>Launches Google Gemini</td>
      <td>Settings &gt; System &gt; Gestures &gt; Press &amp; hold power button</td>
      <td>Traditional Power Menu + Lockdown</td>
    </tr>
    <tr>
      <td>OnePlus / Realme</td>
      <td>Launches Google Assistant</td>
      <td>Settings &gt; Additional settings &gt; Power button</td>
      <td>OxygenOS Power Off / Restart circle</td>
    </tr>
    <tr>
      <td>Xiaomi / POCO</td>
      <td>Launches Assistant at 0.5s</td>
      <td>Settings &gt; Additional settings &gt; Gesture shortcuts</td>
      <td>Clean vertical Power/Reboot slider</td>
    </tr>
    <tr>
      <td>Motorola</td>
      <td>Launches Assistant</td>
      <td>Settings &gt; Gestures &gt; Press &amp; hold power button</td>
      <td>Stock Android Power Menu</td>
    </tr>
  </tbody>
</table>

<h2>What Is 'Lockdown Mode' and Why You Should Enable It</h2>
<p>When you restore your traditional power menu on Android 12 through 15, you will notice an option titled <strong>Lockdown</strong>. Every security-conscious user should understand this feature:</p>
<p>When you tap <em>Lockdown</em>, your smartphone immediately locks the device, <strong>disables all biometric authentication (fingerprint and face unlock), and suppresses all notifications from appearing on the lock screen</strong>. The phone can only be unlocked by physically typing your master alpha-numeric password or PIN. If you are entering customs checkpoints, police interactions, or situations where someone might attempt to forcibly press your finger against the sensor while you are asleep, activating Lockdown ensures absolute legal and cryptographic protection.</p>

<h2>Preventative Architecture &amp; Companion Recommendations</h2>
<p>Reclaiming control of your physical hardware buttons is an empowering first step toward customizing an operating system that serves you rather than advertising algorithms. Continue optimizing your mobile experience by reading our guides on <a href=\"/how-to/how-to-disable-glance-lock-screen-ads-samsung-realme-xiaomi\">permanently disabling Glance lock screen advertisements</a>, learn <a href=\"/apps/best-android-launchers-minimalist-battery-friendly\">how minimalist Android launchers can eliminate visual clutter and save battery</a>, and discover <a href=\"/how-to/fix-android-system-ui-not-responding-freeze\">how to diagnose and fix 'System UI isn't responding' errors on Android</a>.</p>"""
    }
]

for p in extra_posts:
    save_and_verify(p)

print("Batch 3 (Posts 212-216) ALL 5 POSTS successfully written and validated!")
