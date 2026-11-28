import sys
import os

sys.path.append(os.path.abspath("scripts"))
from generate_howto_282_286 import posts
from batch_builder_helper import count_words
from base_generator import save_and_verify

extra_283 = """
<h2>The Role of Android App Measurement SDKs and Probabilistic Fingerprinting</h2>
<p>While zeroizing your Google Advertising ID deals a crushing blow to deterministic ad tracking, advanced marketing cartels deploy sophisticated backup mechanisms known as <strong>probabilistic fingerprinting</strong>. Major attribution software development kits (SDKs)—including AppsFlyer, Adjust, Branch.io, Kochava, and Singular—are bundled into millions of free Google Play Store applications.</p>
<p>When an app initializes, these SDKs query non-permissioned system hardware parameters: your exact display resolution, DPI density, current battery charge level and charging status, volume levels, available internal storage down to the byte, uptime in seconds, system font list, and cellular carrier MCC/MNC codes. By combining these twenty seemingly innocuous parameters into a mathematical hash, data brokers generate a device fingerprint with over 90% uniqueness across local network clusters. When you delete your GAID, these SDKs fall back to this probabilistic profile. Defeating probabilistic fingerprinting requires pairing your GAID deletion with a local firewall app (such as NetGuard or RethinkDNS) to block background network sockets from connecting to known measurement endpoints.</p>

<h2>Web Browser Fingerprinting and Canvas Tracking on Android</h2>
<p>A major vulnerability in most Android privacy setups is the mobile web browser. Default mobile browsers like Google Chrome on Android deliberately lack support for third-party extensions (like uBlock Origin or Privacy Badger), preventing users from installing script blockers. When you browse the web, advertising networks execute JavaScript <strong>Canvas Fingerprinting</strong> and <strong>WebGL profiling</strong>.</p>
<p>The website instructs your browser's HTML5 Canvas engine to invisibly render a 3D geometric shape with complex shading and text fonts. Because every smartphone GPU model (Adreno, Mali, Immortalis) and display driver renders sub-pixel anti-aliasing with microscopic variations, the resulting cryptographic image hash is unique to your exact hardware configuration. To eliminate browser tracking, migrate away from mobile Chrome to privacy-hardened browsers such as <strong>Brave</strong>, <strong>Mull (hardened Firefox fork)</strong>, or <strong>Firefox with Fingerprinting Protection (FPP)</strong> enabled, which introduce artificial canvas noise to completely randomize tracking hashes.</p>
"""

extra_285 = """
<h2>Android Work Profile Isolation (Shelter & Insular): The Open-Source Secure Folder Alternative</h2>
<p>If you use a Google Pixel, Motorola, Nothing Phone, or any device running clean stock Android that lacks Samsung Knox or Xiaomi App Lock, you do not have to forfeit containerized privacy. Android incorporates enterprise-grade multi-profile capabilities designed for corporate 'Bring Your Own Device' (BYOD) programs. Open-source utilities like <strong>Shelter</strong> and <strong>Insular</strong> leverage Android's native <code>DevicePolicyManager</code> API to configure a personal <strong>Work Profile</strong> sandbox on any compatible Android smartphone.</p>
<p>Once initialized, your phone creates an isolated user space indicated by a small blue briefcase badge on app icons. Apps cloned into this profile (such as WhatsApp, banking portals, or confidential work apps) operate with independent SQLite databases, isolated media storage, and segregated background processes. Best of all, Shelter provides an automated <strong>\"Freeze Apps\"</strong> toggle: when you finish using your private messaging apps, a single tap freezes their background services completely, preventing them from running background telemetry or sending notifications until you explicitly unlock and unfreeze them with your biometric fingerprint.</p>

<h2>Biometric Security Architecture: Class 3 Strong Biometrics vs. Weak 2D Face Unlock</h2>
<p>When gating sensitive financial apps and private vaults with biometrics, understanding Android's hardware security classification is critical. In the Android Compatibility Definition Document (CDD), Google classifies biometric authenticators into three distinct tiers based on Spoof Acceptance Rate (SAR) and Imposter Acceptance Rate (IAR):</p>
<ul>
  <li><strong>Class 3 (Strong Biometrics):</strong> Hardware-backed ultrasonic fingerprint sensors, capacitive sensors, and structured-light 3D IR face scanners (such as Google Pixel 4 or Honor Magic Pro). Class 3 sensors maintain an Imposter Acceptance Rate of less than 0.002% and integrate directly with Android Keystore. Only Class 3 sensors are permitted to authenticate banking apps and cryptographic key decryptions.</li>
  <li><strong>Class 1 & Class 2 (Weak Biometrics):</strong> Standard front-facing 2D camera face unlock found on budget and mid-range Android phones. These systems merely analyze flat RGB camera frames without depth mapping. They can frequently be spoofed by high-resolution photographs or video playbacks on a tablet. Android automatically restricts Class 1 face unlock from gating app locks and payment APIs. Always ensure your app locker is bound strictly to your physical fingerprint sensor rather than 2D camera unlocking.</li>
</ul>
"""

extra_286 = """
<h2>Unlocking Hidden Android Auto Developer Settings for Video Optimization</h2>
<p>Android Auto contains a concealed Developer Settings menu that grants access to low-level video codec, bitrate, and projection parameters. Unlocking this menu allows you to optimize video performance and eliminate rendering lag on sluggish car infotainment units.</p>
<ol>
  <li>Navigate to <code>Settings &gt; Apps &gt; Android Auto</code> (or open Android Auto settings from Connected Devices).</li>
  <li>Scroll to the very bottom of the screen to find the <strong>Version</strong> string.</li>
  <li><strong>Tap the Version string 10 times consecutively</strong> in rapid succession. A toast notification will appear: <em>\"Developer mode enabled!\"</em></li>
  <li>Tap the three-dot menu icon in the top right corner of the screen and select <strong>Developer settings</strong>.</li>
  <li>Under <strong>Video resolution</strong>, test switching between <em>\"Allow car and phone to negotiate\"</em> and <em>\"Up to 1080p\"</em> (or <em>\"Up to 720p\"</em>). For older automotive head units with slow processors, forcing 720p dramatically reduces video encoding overhead and eliminates thermal throttling on your smartphone.</li>
  <li>Enable <strong>\"Force GPU rendering\"</strong> to offload interface composition from the CPU to your phone's graphics silicon, significantly smoothing frame rates in Google Maps and Waze.</li>
</ol>

<h2>Vehicle 12V Auxiliary Sockets vs. Factory USB Port Voltage Collapse</h2>
<p>A pervasive hardware cause of wired Android Auto instability is <strong>electrical power starvation</strong>. Factory-installed USB-A ports built into vehicle dashboards or center consoles were engineered according to automotive infotainment specifications established a decade ago. Many factory ports output a meager <strong>5 Volts at 0.5 to 1.0 Amperes (2.5W to 5W)</strong>.</p>
<p>When a modern smartphone connects to wired Android Auto, its hardware demands maximum power: rendering dual-screen GPS graphics, running background music streaming, powering mobile 5G modems, and powering bright OLED displays. If the car's built-in USB port cannot supply adequate current, the smartphone draws power directly from its internal battery to supplement the deficit. The battery temperature rapidly surges past 42°C (108°F), triggering the smartphone's thermal safety governor. The phone throttles CPU clock speeds, reduces charging current, and eventually terminates high-bandwidth USB data transfers, manifesting as a sudden Android Auto crash. Using a high-quality 12V cigarette lighter adapter equipped with dedicated USB-PD PPS power delivery solves this thermal power crisis.</p>
"""

marker = "<h2>Complementary"

for p in posts:
    pid = p["id"]
    if pid == 283 and marker in p["html"]:
        p["html"] = p["html"].replace(marker, extra_283 + "\n" + marker)
    elif pid == 285 and marker in p["html"]:
        p["html"] = p["html"].replace(marker, extra_285 + "\n" + marker)
    elif pid == 286 and marker in p["html"]:
        p["html"] = p["html"].replace(marker, extra_286 + "\n" + marker)
    
    words = count_words(p["html"])
    print(f"Post {pid}: {words} words -> {p['title']}")
    assert words >= 1500, f"Post {pid} has {words} words (<1500)"
    save_and_verify(p)

print("\nALL POSTS 282-286 VERIFIED AND SAVED!")
