import sys
import os

sys.path.append(os.path.abspath("scripts"))
from generate_social_347_351 import posts
from batch_builder_helper import count_words
from base_generator import save_and_verify

extra_347 = """
<h2>AutoModerator YAML Rule Structures and Regex Syntax Patterns</h2>
<p>To audit why your legitimate submissions may be getting flagged or removed, power users must understand the underlying YAML syntax that subreddit moderators deploy inside AutoModerator:</p>
<pre><code># Sample production AutoModerator rule:
---
type: submission
author:
    account_age: "< 14 days"
    combined_karma: "< 50"
action: remove
action_reason: "New account karma/age threshold failed"
comment: "Your submission was removed because your account is under 14 days old or has less than 50 combined karma."
---
type: any
body+title (regex): ['bit\\.ly', 'goo\\.gl', 't\\.co', 'discord\\.gg', 'telegram\\.me']
action: spam
action_reason: "Blacklisted link shortener / invite link"
---</code></pre>
<p>Notice the critical difference between <code>action: remove</code> and <code>action: spam</code>:</p>
<ul>
  <li><code>action: remove</code>: Simply un-publishes the post from the subreddit. It remains on your profile and does not negatively impact your global account trust score.</li>
  <li><code>action: spam</code>: Flags the item directly into Reddit's global machine learning training queue. If an account accumulates multiple <code>action: spam</code> marks across several communities within 48 hours, Reddit's automated sitewide classifier triggers an instant, permanent shadowban!</li>
</ul>

<h2>Arkose Labs (FunCaptcha) Telemetry and Behavioral Biometrics</h2>
<p>When creating accounts or performing rapid voting actions, Reddit frequently challenges users with <strong>Arkose Labs (FunCaptcha)</strong> interactive puzzles (e.g., rotating an animal until it faces the direction of a hand):</p>
<ol>
  <li><strong>Mouse Dynamics and Velocity Vectors:</strong> Arkose Labs does not merely verify whether you chose the correct puzzle image; it tracks the micro-curvature, acceleration, and jitter of your mouse cursor (or touchscreen swipe trajectory) leading up to the click. Automated bot scripts moving with linear geometric perfection are instantly identified and blacklisted.</li>
  <li><strong>TCP/IP Packet Fingerprinting (p0f):</strong> Anti-abuse systems analyze the TCP SYN packet parameters (Window Size, TTL, IP DF flags) to detect OS-spoofing. If a user-agent header claims you are using Windows 11 on Chrome, but your TCP packet headers reveal a Linux kernel running inside a headless Docker container, your trust score collapses to zero.</li>
</ol>

<h2>Reddit CQS (Contributor Quality Score) Internal Metrics</h2>
<p>In addition to public karma points, Reddit calculates a hidden <strong>Contributor Quality Score (CQS)</strong> for every registered account, grading profiles on a spectrum from <em>Lowest</em> to <em>Highest</em>. The CQS algorithm synthesizes multiple signals:</p>
<ul>
  <li>Phone number and email verification status.</li>
  <li>Historical account age combined with cross-subreddit diversity of participation.</li>
  <li>Frequency of reported comments, deleted submissions, and AutoMod rule triggers.</li>
  <li>Subreddit moderators can configure AutoModerator to automatically filter or restrict submissions from any user whose CQS grade falls below <em>Moderate</em>, silencing newly flagged accounts before human moderators review the queue.</li>
</ul>
"""

extra_348 = """
<h2>Signal Secure Value Recovery (SVR) and Intel SGX Enclaves</h2>
<p>A classic dilemma in encrypted communications is: <em>What happens if you lose your phone or switch devices?</em> In traditional systems, you lose your contact list, or the server stores your contacts in plaintext. Signal solved this using <strong>Secure Value Recovery (SVR)</strong> running inside hardware <strong>Intel SGX (Software Guard Extensions) Enclaves</strong>:</p>
<ul>
  <li><strong>Client-Side Master Key Derivation:</strong> When you set a 4-to-8-digit Signal PIN, your device uses Argon2id key stretching to generate an encryption key. Your contacts and profile keys are encrypted locally before leaving the phone.</li>
  <li><strong>Hardware-Enclaved Rate Limiting:</strong> The encrypted blob is stored in an Intel SGX enclave on Signal's cloud infrastructure. The enclave's hardware code strictly limits PIN guessing attempts to prevent brute-force attacks: if someone attempts more than a handful of wrong PINs, the enclave permanently cryptographically shreds the data! Because the code runs inside isolated hardware memory that even Signal's server administrators cannot read or modify, your contacts remain completely private.</li>
</ul>

<h2>Private Contact Discovery: Cryptographic Intersection Without Disclosure</h2>
<p>When you install Signal, the app tells you which of your friends are already on Signal—without ever revealing your address book to Signal's servers! This is achieved via <strong>Private Contact Discovery</strong>:</p>
<ol>
  <li>Your device hashes all phone numbers in your address book using a truncated cryptographic hash.</li>
  <li>The client connects to a verified Intel SGX hardware enclave on the server over a remote-attested secure channel.</li>
  <li>The enclave performs an in-memory set intersection with the global directory of registered Signal numbers, returning only the mutual matches.</li>
  <li>The enclave discards the contact hashes immediately. Signal's persistent databases never learn who is in your phone's address book!</li>
</ol>

<h2>Post-Quantum Cryptography: The PQXDH Protocol Transition</h2>
<p>To defend encrypted communications against the future threat of quantum supercomputers running Shor's algorithm (which will break classical RSA and Elliptic Curve Diffie-Hellman), Signal upgraded its key agreement protocol to <strong>PQXDH (Post-Quantum Extended Diffie-Hellman)</strong>.</p>
<p>PQXDH creates a hybrid cryptographic handshake: combining classical Curve25519 elliptic curve keys with the post-quantum lattice-based key encapsulation mechanism <strong>CRYSTALS-Kyber-1024</strong> (standardized by NIST as ML-KEM). Even if an adversary intercepts and archives encrypted Signal traffic today ("Harvest Now, Decrypt Later"), future quantum supercomputers will remain mathematically incapable of decrypting the communication!</p>

<h2>Username Privacy: Decoupling Phone Numbers from Messaging</h2>
<p>Historically, connecting with someone on Signal required sharing your real-world mobile phone number. To protect personal identities for activists, whistleblowers, and public figures, Signal engineered <strong>Cryptographic Usernames</strong>:</p>
<ul>
  <li>A Signal username is not a public profile handle displayed in a global directory; it is an ephemeral contact initiation token.</li>
  <li>Under the hood, usernames are stored as 96-bit cryptographic hashes. The server routes initial connection requests using the hash without associating your mobile phone number with the recipient.</li>
  <li>Users can configure phone number discovery to <em>"Nobody"</em>, ensuring that strangers who have your phone number in their contact list cannot discover whether you possess an active Signal account.</li>
</ul>
"""

extra_349 = """
<h2>Webhook Security and Phishing Announcement Injections</h2>
<p>One of the most devastating attack vectors against Discord communities is <strong>Compromised Server Webhooks</strong>. Discord Webhooks provide a static HTTP POST endpoint that allows external scripts (like GitHub, YouTube, or Patreon integrations) to broadcast rich embed messages into channels without a bot token.</p>
<p>However, Discord Webhooks possess a dangerous structural attribute: <strong>They completely bypass channel permissions and role hierarchies!</strong></p>
<ol>
  <li>If an attacker gains access to an external developer's webhook URL, they can send an HTTP POST request formatted with custom avatars, usernames (impersonating server admins), and verified-looking announcements.</li>
  <li>Because webhooks bypass role locks, the attacker can broadcast phishing links (e.g., <em>"Exclusive 10,000 Nitro Giveaway - Claim in 10 minutes!"</em>) across announcement channels that only server owners are supposed to post in.</li>
  <li><strong>Defense Architecture:</strong> Never commit webhook URLs to public or private Git repositories. Regularly query the Discord API to audit all active webhooks across all channels:
    <pre><code>GET /api/v10/guilds/{guild.id}/webhooks
Authorization: Bot {SECURE_BOT_TOKEN}</code></pre>
  Automatically delete any webhook whose creator user ID does not match a verified, active core administrative team member.</li>
</ol>

<h2>Discord Gateway Real-Time WebSocket Heartbeats and Rate Limits</h2>
<p>Discord bots communicate with Discord's infrastructure over a persistent WSS (WebSocket Secure) connection called the <strong>Gateway</strong>. Understanding Gateway dynamics is vital for bot stability and server defense:</p>
<ul>
  <li><strong>Heartbeat Intervals:</strong> The Gateway server periodically sends an Opcode 10 (Hello) containing a <code>heartbeat_interval</code> (typically 41,250 milliseconds). The bot must reply with Opcode 1 (Heartbeat) within that window; failing to do so triggers an automatic connection drop and zombie session state.</li>
  <li><strong>Identify Rate Limits:</strong> Bots are strictly rate-limited to sending 1 <code>Identify</code> payload every 5 seconds. If a bot experiences network flapping and reconnects too rapidly, Discord blocks the bot's IP address for several hours.</li>
  <li><strong>REST API Rate-Limit Headers:</strong> When performing bulk moderation actions (e.g., mass-banning raid accounts), the bot must monitor the <code>X-RateLimit-Remaining</code> and <code>X-RateLimit-Reset-After</code> HTTP response headers. Exceeding 50 requests per second will trigger an HTTP 429 Too Many Requests response, stalling anti-raid scripts during critical attacks.</li>
</ul>

<h2>Auditing Bot Permissions via Discord.js / Discord.py Automation</h2>
<p>To mathematically audit every bot operating within your server, community owners can run automated inspection scripts. Here is a Python automation utilizing <code>discord.py</code> that scans and flags bots with dangerous permissions:</p>
<pre><code>import discord

class SecurityAuditor(discord.Client):
    async def on_ready(self):
        print(f"Logged in as {self.user}")
        for guild in self.guilds:
            print(f"\\n--- Auditing Server: {guild.name} ---")
            for member in guild.members:
                if member.bot:
                    perms = member.guild_permissions
                    if perms.administrator:
                        print(f"[CRITICAL ALERT] Bot '{member.name}' has ADMINISTRATOR (0x8)!")
                    if perms.manage_roles:
                        print(f"[HIGH RISK] Bot '{member.name}' can MANAGE_ROLES!")
                    if perms.manage_webhooks:
                        print(f"[WARNING] Bot '{member.name}' can MANAGE_WEBHOOKS!")
        await self.close()</code></pre>
<p>Running this audit weekly ensures no rogue bot quietly retains excessive permissions following a server restructuring.</p>

<h2>Ephemeral Slash Commands and Interaction Data Boundaries</h2>
<p>Legacy Discord bots relied on reading every message in a channel (using prefixes like <code>!ban</code> or <code>!play</code>). This required granting bots full message-reading permissions. Discord's modern <strong>Interactions API (Slash Commands)</strong> solves this by decoupling bot commands from channel text:</p>
<ul>
  <li>When a user types <code>/settings</code>, Discord's client communicates directly with Discord's backend over an HTTP webhook, forwarding the command payload solely to the target bot. Other bots and unprivileged users in the channel cannot see the command.</li>
  <li>Bots can respond with <strong>Ephemeral Messages</strong> (flag <code>64 / 1 << 6</code>). An ephemeral message is rendered exclusively on the invoking user's screen and is never stored in server message history, eliminating public chatter and preventing sensitive configuration details from leaking into public channels.</li>
  <li>By auditing and enforcing Slash Commands, administrators eliminate the need for bots to possess message history read access, dramatically minimizing token breach blast radiuses. Implementing granular channel overwrites and zero-trust verification rules ensures that even if a community bot suffers a credential compromise, the potential operational damage to server architecture remains tightly compartmentalized.</li>
</ul>
"""

extra_350 = """
<h2>LinkedIn Insight Tag and Reverse-Engineering Corporate Pixels</h2>
<p>To understand the depth of surveillance executed across professional networks, one must examine the <strong>LinkedIn Insight Tag</strong>—a lightweight JavaScript snippet embedded across hundreds of thousands of B2B corporate websites, SaaS landing pages, and enterprise portals:</p>
<ul>
  <li><strong>Deterministic B2B Identity Matching:</strong> When you visit an external B2B software vendor's pricing page while logged into LinkedIn in another browser tab, the Insight Tag fires an asynchronous beacon to <code>https://px.ads.linkedin.com/collect</code>.</li>
  <li><strong>Corporate Telemetry Matching:</strong> The tag matches your LinkedIn authenticated cookie (<code>li_at</code> / <code>bcookie</code>) with the vendor's site visit. The vendor does not see your individual personal name, but their marketing dashboard receives an aggregated <strong>Website Demographics Report</strong> detailing:
    <ul>
      <li>The exact corporate company domain you work for (e.g., <em>"32 visitors from Microsoft, 14 from Google"</em>).</li>
      <li>Job seniority levels (e.g., <em>"60% Senior Vice Presidents or C-Suite Directors"</em>).</li>
      <li>Functional job departments (Engineering, Legal, Sales, Procurement).</li>
    </ul>
  </li>
</ul>
<p>This demographic intelligence allows enterprise sales teams to initiate hyper-targeted account-based marketing (ABM) outreach to your company's procurement leads within hours of your anonymous web visit!</p>

<h2>Third-Party Data Broker Scraping and Legal Precedents (hiQ vs. LinkedIn)</h2>
<p>The privacy landscape of professional networking was permanently altered by the landmark federal appellate court decision <strong>hiQ Labs v. LinkedIn Corp (2022)</strong>. hiQ, an analytics firm, deployed automated web scrapers to harvest millions of public LinkedIn profiles to build predictive employee flight-risk models for corporate employers.</p>
<p>The Ninth Circuit Court of Appeals ruled that scraping publicly accessible website data that does not require an authenticated login does NOT violate the Computer Fraud and Abuse Act (CFAA). The real-world consequence: <strong>Anything you make public on LinkedIn is scraped, copied, and archived indefinitely by dozens of global commercial data brokers (such as ZoomInfo, Apollo.io, and Lusha)</strong>. Even if you subsequently edit or delete your profile details on LinkedIn, historical career data remains archived in third-party sales intelligence databases.</p>

<h2>Social Selling Index (SSI) and Algorithmic Visibility Scoring</h2>
<p>LinkedIn assigns every member a hidden internal score from 0 to 100 known as the <strong>Social Selling Index (SSI)</strong>. The score is calculated across four pillars: 1) Establishing a complete professional brand, 2) Finding the right people via search, 3) Engaging with insights, and 4) Building relationships.</p>
<p>Accounts with high SSI scores (above 75) receive algorithmic distribution boosts on their status posts and published articles, while accounts with low scores or suspicious connection-acceptance ratios are algorithmically suppressed into feed obscurity.</p>

<h2>Sales Navigator Advanced Search and Lead Tracking Pipelines</h2>
<p>For corporate sales representatives and headhunters, LinkedIn licenses <strong>Sales Navigator</strong>, a high-octane enterprise reconnaissance platform:</p>
<ol>
  <li><strong>Lead Lists and Real-Time Alerts:</strong> When a Sales Navigator user adds your profile to a "Lead List", LinkedIn automatically sends real-time push alerts to the salesperson whenever you change job titles, get promoted, comment on industry news, or view company updates.</li>
  <li><strong>Smart Links Tracking:</strong> When a salesperson sends you a presentation or PDF through LinkedIn Smart Links, the link does not simply download the file. It tracks your viewing behavior in real time: alerting the sender to how many seconds you lingered on Slide 3 (pricing), whether you forwarded the link to colleagues, and what geographic IP address you opened it from!</li>
  <li><strong>Mitigation Strategy:</strong> Never click unverified Smart Links in unsolicited InMails without routing through an isolated browser sandbox or downloading the static file directly via an unauthenticated terminal utility.</li>
</ol>

<h2>Managing Search Engine Indexing and Public Web Profiles</h2>
<p>By default, LinkedIn makes your profile publicly indexed by Google, Bing, and external search engines. Anyone searching your legal name in Google can see your headline, current employer, past work history, and recommendations without even possessing a LinkedIn account.</p>
<p>To restrict external search indexing:</p>
<ul>
  <li>Navigate to <em>Settings &amp; Privacy &gt; Visibility &gt; Edit your public profile</em>.</li>
  <li>In the right-hand panel, toggle <strong>Your profile's public visibility</strong> to <strong>Off</strong> (or selectively disable specific sections like Past Experience, Education, and Certifications).</li>
  <li>This sends a <code>noindex</code> meta directive to search engine crawlers, prompting them to purge your cached profile from public search results within their next crawl cycle.</li>
</ul>

<h2>Auditing Third-Party Application Permissions and API Integrations</h2>
<p>Over years of professional networking, users frequently connect their LinkedIn accounts to third-party CRM tools, scheduling calendars, applicant tracking systems (ATS), and automated resume builders. Each connection creates a long-lived OAuth token that grants persistent read access to your email, profile data, and network relationships.</p>
<p>To eliminate lingering supply-chain risks, navigate to <em>Settings &amp; Privacy &gt; Data privacy &gt; Permitted services</em>. Review the list of connected applications, and revoke access for any legacy service or software platform that you no longer actively utilize in your daily professional workflow.</p>
<p>Because professional reputation and corporate executive authority are prime targets for Business Email Compromise (BEC) and corporate impersonation fraud, securing your LinkedIn account credentials requires more than a strong password. Enable hardware-backed two-factor authentication under <em>Settings &gt; Sign-in &amp; security &gt; Two-step verification</em>. Prefer authenticator apps (Aegis, 1Password, Google Authenticator) or FIDO2 WebAuthn security keys over SMS verification to eliminate vulnerabilities stemming from telecom SIM swaps and SS7 signaling intercepts. Furthermore, routinely audit active logged-in devices under <em>Where you're signed in</em> to terminate obsolete sessions from old mobile phones or public workstations, ensuring that rogue session tokens cannot persist undetected.</p>
"""

extra_351 = """
<h2>ByteDance Monolith: Real-Time Recommendation Engine Architecture</h2>
<p>To process petabytes of real-time telemetry streaming from over 1.5 billion mobile devices, ByteDance engineered <strong>Monolith</strong>, a specialized distributed machine learning recommendation architecture:</p>
<ul>
  <li><strong>Real-Time Online Training:</strong> Unlike traditional recommendation systems that train offline batch models overnight, Monolith trains machine learning weights continuously in real time. The moment you pause a video for 1.8 seconds, swipe back to re-watch a 3-second loop, or share a clip to a private chat, Monolith's sparse parameter servers update your personal interest vector in under <strong>60 seconds</strong>!</li>
  <li><strong>Collision-Free Embedding Tables:</strong> Monolith allocates dynamic memory keys for user-feature embeddings, tracking hyper-granular categorical affinities (e.g., specific music subgenres, aesthetic editing pacing, visual color tones) without mathematical hash collisions.</li>
  <li><strong>Attention-Based Multi-Task Ranking:</strong> The model optimizes for multiple simultaneous objectives: Watch Time, Completion Rate, Like Probability, Comment Likelihood, and Share Velocity. It balances immediate entertainment gratification with long-term dopamine retention loops.</li>
</ul>

<h2>Project Texas and Project Clover: Data Isolation Auditing</h2>
<p>In response to intense national security scrutiny in the United States and the European Union, ByteDance announced <strong>Project Texas</strong> (partnering with Oracle in the US) and <strong>Project Clover</strong> (establishing localized data centers in Ireland and Norway):</p>
<ol>
  <li><strong>The Claimed Architecture:</strong> US user data was designated to be stored exclusively in Oracle Cloud Infrastructure (OCI) data centers in Texas, with third-party source code inspection by independent cybersecurity auditors.</li>
  <li><strong>Technical Realities and Leaks:</strong> Investigative reporting and whistleblower disclosures revealed that while static databases were moved to Oracle servers, algorithmic training pipelines, content moderation tools, and global user-graph metadata continued to route through ByteDance engineering infrastructure in Beijing. Complete separation of global social graph telemetry remains a formidable technical challenge in distributed cloud architectures.</li>
</ol>

<h2>Network-Level Blocking: Pi-hole and AdGuard Home DNS Rules</h2>
<p>For home networks and office environments seeking to eliminate TikTok tracking beacons across all connected smartphones, IoT devices, and smart TVs, deploy network-wide DNS sinkholing via <strong>Pi-hole</strong> or <strong>AdGuard Home</strong>.</p>
<p>Add these verified regex blocklists to permanently drop TikTok telemetry and advertising server queries at the local network gateway:</p>
<pre><code># TikTok telemetry, advertising, and tracking domains:
(^|\\.)byteoversea\\.com$
(^|\\.)ibytedtos\\.com$
(^|\\.)musical\\.ly$
(^|\\.)tiktokv\\.com$
(^|\\.)tiktokcdn\\.com$
(^|\\.)snssdk\\.com$
analytics.tiktok.com
ads.tiktok.com
log.tiktokv.com
mon.musical.ly</code></pre>
<p>Sinkholing these domains neutralizes background telemetry pings and in-app advertising pixels while preserving essential network bandwidth.</p>

<h2>Clipboard and Keystroke Buffer Scraping Mechanics</h2>
<p>When Apple introduced clipboard access notifications in iOS 14, security researchers caught TikTok accessing the device clipboard every 1 to 3 seconds while typing. Because users frequently copy passwords, authentication codes, and sensitive URLs from password managers to their clipboard, background clipboard polling presented a critical privacy vulnerability.</p>
<p>While TikTok subsequently updated its client to restrict clipboard polling to explicit paste events, Android and iOS users should ensure their operating systems are updated to modern versions (iOS 16+ and Android 13+) that enforce strict hardware clipboard paste permissions, preventing background applications from silently scraping copied credentials.</p>

<h2>Algorithmic Detox and Resetting the FYP Recommendation Graph</h2>
<p>If your TikTok feed has devolved into doom-scrolling, hyper-targeted commercial advertisements, or unwanted emotional spirals, you can mathematically purge your recommendation vector:</p>
<ol>
  <li>Navigate to <em>Profile &gt; Settings and privacy &gt; Content preferences</em>.</li>
  <li>Tap <strong>Refresh your For You feed</strong>.</li>
  <li>Read the confirmation prompt and tap <strong>Continue &gt; Refresh</strong>.</li>
</ol>
<p>This action severs your immediate real-time interest weighting in Monolith's dynamic ranking layer, resetting your recommendation distribution back to generic baseline viral topics. From there, actively skip or long-press and select <em>"Not Interested"</em> on videos you dislike to train the recommendation engine toward strictly educational and productive content topics.</p>
"""

patch_map = {
    347: extra_347,
    348: extra_348,
    349: extra_349,
    350: extra_350,
    351: extra_351,
}

if __name__ == '__main__':
    for post in posts:
        pid = post["id"]
        if pid in patch_map:
            post["html"] += patch_map[pid]
        words = count_words(post["html"])
        print(f"Post {pid} patched word count: {words}")
        save_and_verify(post)

    print("Social Batch 2 (347-351) patched and saved successfully!")
