import os
import json
import xml.etree.ElementTree as ET

POSTS_DIR = r"c:\wamp64\www\trendswheel-next\content\posts"
PUBLIC_DIR = r"c:\wamp64\www\trendswheel-next\public\posts"

how_to_posts = [
    {
        "id": 202,
        "slug": "recover-compromised-google-account-without-phone-number",
        "title": "How to Recover a Hacked Google Account When 2FA Phone Number Is Changed",
        "metaTitle": "Recover Hacked Google Account When Hacker Changed 2FA & Phone",
        "metaDescription": "Step-by-step forensic guide to recovering a compromised Google Account after a hacker changed the recovery phone number, email, and 8-digit backup codes.",
        "metaKeywords": "recover hacked google account, google recovery phone number changed, bypass google 2fa hacker, google account recovery page 2026",
        "excerpt": "When an attacker hijacks your Google Account, the first thing they do is update the recovery phone number and generate new backup codes. Here is the verified recovery roadmap.",
        "description": "Comprehensive guide on recovering a hijacked Google Account when the recovery phone number and email have been altered by an attacker. Includes AR cookie tokens and IP matching.",
        "svg_file": "recover-hacked-google-account-featured.svg",
        "svg_badge": "ACCOUNT RECOVERY",
        "svg_title_1": "Recover Hacked Google Account",
        "svg_title_2": "When 2FA Phone Is Changed",
        "svg_sub_1": "Bypassing unauthorized phone swaps, utilizing trusted hardware session",
        "svg_sub_2": "tokens, and verifying ownership through Google's Account Recovery engine.",
        "svg_card1_title": "Trusted Network & Device",
        "svg_card1_sub": "Match historical telemetry",
        "svg_card1_b1": "Use home Wi-Fi IP address",
        "svg_card1_b2": "Use previously logged-in phone",
        "svg_card1_b3": "Bypasses instant bot rejection",
        "svg_card2_title": "Previous Password Audit",
        "svg_card2_sub": "Cryptographic ledger match",
        "svg_card2_b1": "Enter last password you recall",
        "svg_card2_b2": "Triggers 7-day rollback grace",
        "svg_card2_b3": "Prompts secondary challenge",
        "svg_card3_title": "Post-Recovery Lockdown",
        "svg_card3_sub": "Evict malicious sessions",
        "svg_card3_b1": "Revoke rogue App Passwords",
        "svg_card3_b2": "Generate 10 fresh backup keys",
        "svg_card3_b3": "Enroll hardware passkey (FIDO2)",
        "svg_theme": {"bg1": "#1e1b4b", "bg2": "#0f172a", "bg3": "#020617", "accent": "#6366f1", "glow": "#818cf8", "badge_color": "#a5b4fc"},
        "faq": [
            {
                "title": "Why does Google say 'Google couldn't verify that this account belongs to you' immediately?",
                "description": "Google's automated risk engine flags recovery attempts coming from unfamiliar public IP addresses, VPN connections, or clean browsers as potential secondary attack vectors. Attempt recovery only from a computer, phone, or home Wi-Fi network where the account was active for weeks prior to the breach."
            },
            {
                "title": "Can Google customer support manually reset my account password over phone or email?",
                "description": "No. Google does not offer telephone, email, or live chat support for consumer (@gmail.com) account recovery to prevent social engineering. Recovery is 100% automated via the g.co/recover algorithm and identity proofing challenges."
            },
            {
                "title": "How does Google's 7-day security rollback grace period work?",
                "description": "When critical security credentials (such as recovery phone numbers or recovery emails) are changed, Google retains the previous credentials in an internal cryptographic quarantine for 7 days. If you initiate recovery within this window, Google will offer to send verification OTPs to your OLD phone number or old email."
            }
        ],
        "sections": [
            {
                "heading": "The Devastation of an Account Takeover",
                "content": "<p>A hijacked Google Account is catastrophic: an attacker gains immediate command over your Gmail communications, Google Drive documents, Google Photos library, connected YouTube channels, Chrome synchronized passwords, and active Google Play subscriptions. In most coordinated credential stuffing and phishing attacks, the malicious actor's first maneuver within the initial 90 seconds is to navigate to Google Security, delete your telephone number, replace your secondary recovery email with a temporary burner inbox, and invalidate your 8-digit 2FA backup codes.</p><p>When you attempt to log in, you are confronted with a recovery screen requesting an SMS code sent to a mobile phone ending in two digits you do not recognize. However, Google's authentication backend incorporates safety mechanisms specifically engineered to handle malicious credential swaps&#x2014;most notably the <strong>7-Day Security Quarantine Window</strong> and <strong>Historical Device Fingerprinting</strong>. This guide walks you through the exact forensic steps to take your account back.</p>"
            },
            {
                "heading": "Phase 1: Establishing the Optimal Hardware & Network Environment",
                "content": "<p>Google's automated account recovery system (hosted at <code>g.co/recover</code>) evaluates hundreds of contextual browser signals before determining whether to challenge you or summarily reject your request with the infamous notice: <em>'Google couldn't verify that this account belongs to you.'</em></p><p>Before you type a single character, you must optimize your physical environment:</p><ul><li><strong>Use a Previously Authorized Device:</strong> Pick up the laptop, desktop PC, tablet, or smartphone that was logged into this Google Account for at least 30 days prior to the attack. Even if your browser cookies were cleared, local storage hashes, display resolution fingerprints, and MAC-derived canvas metrics assist Google in authenticating device continuity.</li><li><strong>Connect to Your Familiar Home or Office Network:</strong> Never initiate account recovery over public coffee shop Wi-Fi, mobile cellular hotspot tethering, or active VPN connections (such as NordVPN or Cloudflare WARP). Connect directly to your home residential Wi-Fi router. Google compares your current ASN (Autonomous System Number) and geographic IP subnet with the historical location logs stored in your account security history.</li><li><strong>Use Your Regular Web Browser:</strong> Do NOT open an Incognito or Private Browsing window. An incognito window suppresses cached service worker tokens and font signatures that prove legitimate device possession.</li></ul>"
            },
            {
                "heading": "Phase 2: Navigating the Recovery Workflow & Bypassing the Hacker's Phone",
                "content": "<p>Navigate directly to <strong>https://accounts.google.com/signin/recovery</strong>. Follow these specific responses:</p><ol><li><strong>Enter Your Full Gmail Address:</strong> Input your address carefully. Click <em>Next</em>.</li><li><strong>Entering Your Password:</strong> Google will ask for the password. The hacker has undoubtedly changed it. <strong>Enter the last password you remember using before you were locked out.</strong> Do not guess random words. Entering a valid historical password signals to Google's cryptographic audit table that you are the legitimate previous account owner, which triggers the deep recovery assessment tree.</li><li><strong>Bypassing the Unknown Phone Challenge:</strong> When prompted to receive an SMS or WhatsApp code on the hacker's new telephone number, do NOT panic. Look at the bottom left corner and tap <strong>'Try another way'</strong> (or <em>'I don't have my phone'</em>).</li><li><strong>Leveraging the 7-Day Quarantine Grace Period:</strong> If the intrusion occurred within the preceding 168 hours (7 days), Google's security server will present an option: <em>'Get a verification code at [your original phone number ending in XX]'</em>. Select this option immediately. Enter the 6-digit G-code sent to your SIM card.</li><li><strong>Providing an Alternative Contact Email:</strong> If Google requests an email address where they can reach you, enter an accessible, secure email address (for instance, a ProtonMail or secondary Outlook account). Google will send a 6-digit confirmation code to verify your immediate access to that inbox.</li></ol>"
            },
            {
                "heading": "Comparative Analysis: Self-Service Recovery vs Escalated Security Review",
                "content": "<p>Depending on whether you have hardware security keys or trusted devices still connected, your recovery path diverges into two potential trajectories:</p><table><thead><tr><th>Verification Parameter</th><th>Automated Instant Recovery</th><th>Manual Delayed Security Evaluation</th></tr></thead><tbody><tr><td>Turnaround Time</td><td>3 to 5 minutes</td><td>48 hours to 120 hours</td></tr><tr><td>Required Proof</td><td>Known device + Previous password + Old SIM OTP</td><td>Familiar IP subnet + Account creation date + Contact email</td></tr><tr><td>Device Status</td><td>Active device prompt on Android / iPad</td><td>Email link sent with cryptographic password reset token</td></tr><tr><td>Hacker Lockout</td><td>Immediate global token revocation</td><td>72-hour delay allowing legitimate owner to cancel rogue request</td></tr></tbody></table>"
            },
            {
                "heading": "Phase 3: Immediate 10-Point Post-Recovery Lockdown",
                "content": "<p>Once you regain access and set a brand-new, high-entropy master password (minimum 16 alphanumeric characters and symbols), you must eliminate any persistence mechanisms the intruder left behind:</p><ol><li><strong>Revoke All Active Sessions:</strong> Navigate to <code>myaccount.google.com/device-activity</code>. Click on every desktop and mobile session you do not recognize, select <strong>Sign Out</strong>, and choose <strong>'Don't recognize this device?'</strong>.</li><li><strong>Audit Connected Third-Party Apps:</strong> Attackers often connect malicious OAuth applications with full mailbox read/write scopes. Go to <code>myaccount.google.com/connections</code> and delete every unauthorized app.</li><li><strong>Inspect Gmail Forwarding Filters:</strong> Go to Gmail Settings &gt; <em>Filters and Blocked Addresses</em> and <em>Forwarding and POP/IMAP</em>. Delete any rogue filter that automatically forwards incoming emails or OTPs to an external address or archives security alerts silently.</li><li><strong>Regenerate 8-Digit Backup Codes:</strong> In 2-Step Verification settings, delete the old backup codes and download a new PDF of 10 backup codes. Store them offline on encrypted physical storage.</li><li><strong>Enroll a FIDO2 Hardware Passkey:</strong> Create a passkey tied to your device's biometric sensor (Windows Hello, Touch ID, or Android Biometric) or a YubiKey. Passkeys are phishing-resistant and cannot be intercepted by remote OTP proxy servers.</li></ol><p>For additional layers of digital self-defense, review our related guide on <a href=\"/how-to/google-account-security-checklist-2026\">the complete Google account security checklist</a> and learn <a href=\"/how-to/someone-is-using-my-email-address\">what to do when someone uses your email for spam registrations</a>.</p>"
            }
        ]
    }
]

print("Script template ready.")
