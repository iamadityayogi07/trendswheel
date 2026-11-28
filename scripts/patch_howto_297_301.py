import sys
import os

sys.path.append(os.path.abspath("scripts"))
from generate_howto_297_301 import posts
from batch_builder_helper import count_words
from base_generator import save_and_verify

extra_297 = """
<h2>IPv6 Hop Limit Modification and ND Packet Inspections</h2>
<p>While configuring IPv4 Time-To-Live (TTL) to 65 handles legacy web traffic, modern tier-1 wireless carriers increasingly deploy native <strong>IPv6-only cellular cores</strong> (using DNS64/NAT64 or dual-stack routing). Under native IPv6, the standard TTL header field does not exist; instead, the protocol uses the <strong>Hop Limit</strong> field.</p>
<p>If you tether a Windows, macOS, or Linux laptop over an IPv6 cellular link and only alter your IPv4 TTL, your laptop transmits outbound IPv6 packets with a default Hop Limit of 64 or 128. When your Android handset forwards these packets across the carrier's cellular interface, it decrements the Hop Limit by 1 (down to 63 or 127). The carrier's edge gateway detects this irregular Hop Limit and immediately shunts the connection into the throttled 600 kbps hotspot queue!</p>
<p>To eliminate IPv6 tethering detection:</p>
<ul>
  <li><strong>Modify Windows IPv6 Hop Limit:</strong> Launch PowerShell as Administrator and execute: <code>netsh int ipv6 set glob defaultcurrenthoplimit=65</code>. This aligns IPv6 hop decrements identically with the IPv4 TTL=65 configuration.</li>
  <li><strong>Disable IPv6 on Tethered APN (Fallback Method):</strong> If your carrier's core supports dual-stack APNs, navigate to your Android APN settings, tap your active profile, and set <strong>APN protocol</strong> and <strong>APN roaming protocol</strong> to <strong>IPv4 only</strong>. This forces all tethered traffic through your IPv4 TTL=65 mangle rules, bypassing IPv6 deep packet inspection completely.</li>
</ul>

<h2>DNS-over-HTTPS (DoH) and SNI Hostname Masking</h2>
<p>Modern mobile network operators do not rely solely on packet TTL flags to identify tethered devices; carrier DPI middleboxes examine the <strong>Server Name Indication (SNI)</strong> in TLS handshakes and unencrypted DNS lookups. For example, when a tethered PC queries <code>windowsupdate.microsoft.com</code>, <code>steamcommunity.com</code>, or Apple's telemetry endpoints, the carrier knows with certainty that a desktop computer is active on the hotspot line regardless of your TTL value.</p>
<p>To defeat SNI and DNS heuristic profiling, configure encrypted DNS directly inside your connected laptop's operating system or web browser. Enable <strong>DNS-over-HTTPS (DoH)</strong> with providers like Cloudflare (<code>1.1.1.1</code>) or Quad9 (<code>9.9.9.9</code>), and activate <strong>Encrypted Client Hello (ECH)</strong> in your browser flags. Encrypting the initial handshake obscures target hostnames from intermediate carrier sniffers, securing your private browsing data across all tethered devices.</p>
"""

extra_299 = """
<h2>Understanding IMS Registration Architecture and SIP Handshakes</h2>
<p>To effectively troubleshoot persistent VoLTE and VoWiFi failures, it is essential to understand the underlying telecom architecture: the <strong>IP Multimedia Subsystem (IMS)</strong>. Unlike traditional circuit-switched 2G and 3G networks where voice calls occupied dedicated radio frequency slots, VoLTE and VoWiFi treat human speech as high-priority real-time Voice-over-IP (VoIP) data packets encoded via <strong>AMR-WB (Adaptive Multi-Rate Wideband)</strong> or <strong>EVS (Enhanced Voice Services)</strong> codecs.</p>
<p>When you insert a SIM card or connect to a trusted Wi-Fi network, your phone's cellular baseband modem initiates an <strong>IMS Registration Handshake</strong> via the <strong>Session Initiation Protocol (SIP)</strong>:</p>
<ol>
  <li><strong>SIP REGISTER:</strong> The phone transmits a registration request containing your SIM's International Mobile Subscriber Identity (IMSI) to the carrier's Proxy-Call Session Control Function (P-CSCF) server.</li>
  <li><strong>AKA Authentication:</strong> The carrier responds with a cryptographic challenge (401 Unauthorized), which your physical SIM or eSIM processes using its embedded cryptographic secret keys to generate an authentication digest.</li>
  <li><strong>200 OK & IPSec Tunneling:</strong> Upon successful cryptographic verification, the carrier establishes two permanent bi-directional IPSec security tunnels, securing all voice and SMS packets against eavesdropping.</li>
</ol>
<p>If your device firmware lacks the specific carrier bundle profiles for your telecom operator, this SIP registration handshake fails silently at Step 1, causing your phone to drop back to 2G/3G circuits or drop calls altogether. Manually reprovisioning IMS configurations or resetting network settings forces the baseband processor to rebuild its carrier parameter tables.</p>

<h2>ePDG Gateways: Diagnosing Wi-Fi Calling Router Firewalls</h2>
<p>When Wi-Fi Calling (VoWiFi) refuses to engage despite a strong 5 GHz home Wi-Fi connection, the blockage almost always resides in your home or office router firewall. For VoWiFi to function, your phone must establish an encrypted IPSec VPN tunnel directly to your cellular carrier's <strong>evolved Packet Data Gateway (ePDG)</strong>.</p>
<p>This secure tunnel relies strictly on two network protocols that many restrictive enterprise, hotel, and residential firewalls inadvertently block:</p>
<ul>
  <li><strong>IKEv2 (Internet Key Exchange version 2):</strong> Operates over <strong>UDP Port 500</strong>. Used for initial cryptographic parameter negotiation and mutual authentication.</li>
  <li><strong>IPSec NAT-Traversal (NAT-T):</strong> Operates over <strong>UDP Port 4500</strong>. Carries all encapsulated voice and video RTP data packets through your router's Network Address Translation (NAT) table.</li>
  <li><strong>IPSec ESP (Encapsulating Security Payload - Protocol 50):</strong> Required on non-NAT networks.</li>
</ul>
<p>If you manage your Wi-Fi router, access its administrative dashboard and verify that <strong>IPSec Passthrough</strong> and <strong>PPTP/L2TP Passthrough</strong> are enabled under the ALG (Application Layer Gateway) settings. Additionally, ensure that outgoing UDP ports 500 and 4500 are not blocked by parental controls or firewall rules. Once these ports are unblocked, your phone will register with the carrier's ePDG within 5 seconds of connecting to Wi-Fi!</p>
"""

extra_300 = """
<h2>Direct Wi-Fi P2P and AirDrop Protocol Disparities Explained</h2>
<p>The primary technical reason wireless cross-platform migration between iOS and Android was historically frustrating lies in the fundamentally incompatible proprietary wireless protocols maintained by Apple and Google. Apple utilizes <strong>Apple Wireless Direct Link (AWDL)</strong> combined with Bluetooth Low Energy (BLE) beaconing to power AirDrop. In contrast, Android devices rely on standardized <strong>Wi-Fi Direct (P2P)</strong> combined with Google Nearby Share / Quick Share APIs.</p>
<p>When you initiate a direct cable-free transfer using modern tools like Google Switch to Android or LocalSend, the application bypasses these operating-system proprietary protocols by deploying a lightweight, cross-platform <strong>local HTTP REST and WebSocket server</strong> inside the phone's memory. One device acts as a temporary Wi-Fi Access Point (SoftAP) or joins your shared 5 GHz Wi-Fi network, generating an ad-hoc local IP address. The data is sliced into encrypted multi-part chunks, streamed over high-speed local TCP sockets at up to 60 MB/s, and reassembled directly into the recipient's file system without touching any external cloud servers.</p>

<h2>WhatsApp Cryptographic Key Migration and Media Linking</h2>
<p>Migrating WhatsApp chats from an iPhone to an Android device wirelessly requires special attention because WhatsApp stores chat histories in completely different database engines across the two platforms: SQLite on Android (encrypted via <code>msgstore.db.crypt14</code>) versus CoreData / SQLite on iOS (managed via Apple Keychain hardware entitlements).</p>
<p>During the official wireless migration flow:</p>
<ol>
  <li>The iPhone generates an unencrypted local export bundle of your message tables and media attachments into a staging sandbox.</li>
  <li>The Android device reads this migration bundle via the Google Switch to Android wireless pipeline.</li>
  <li>The Android WhatsApp installation engine ingests the raw message schemas, re-indexes conversation threads, maps contact JIDs, and regenerates a fresh, locally encrypted <code>msgstore.db</code> secured by the Android Keystore.</li>
</ol>
<p>To avoid data corruption during this complex relational database ingestion, never disconnect from Wi-Fi or answer phone calls during the transfer process. Always ensure both devices have at least 50% battery or remain connected to wall chargers throughout the procedure.</p>

<h2>Health Data and Password Keychain Export Strategies</h2>
<p>Two data categories that cannot be migrated across operating systems via standard generic backup tools are <strong>Apple Health records</strong> and <strong>Apple iCloud Keychain passwords</strong>. These repositories are protected by Apple's Secure Enclave hardware and cannot be accessed by third-party Android pairing utilities.</p>
<p>To safely transfer your medical history and credentials:</p>
<ul>
  <li><strong>Apple Health to Health Connect:</strong> On your iPhone, download the open-source utility <em>Health Data Importer</em> or export your health records as an XML bundle via Apple Health Settings > Export All Health Data. On your new Android device, install Google Health Connect and import the structured dataset to maintain step counts, workout history, and heart rate trends.</li>
  <li><strong>iCloud Keychain to Password Managers:</strong> If you are moving to a multi-platform password manager like Bitwarden or 1Password, open your Mac or iPad, navigate to System Settings > Passwords > Export All Passwords (CSV), and import the CSV file directly into your encrypted vault on your Android device before securely deleting the plain CSV.</li>
</ul>
"""

extra_301 = """
<h2>USB Power Delivery (USB-PD) Protocol and Data Line Isolation Physics</h2>
<p>To understand the genuine engineering mechanics of juice jacking, you must inspect the internal pinout of modern USB standards. A standard USB Type-A connector features exactly four copper pins:</p>
<ul>
  <li><strong>Pin 1 (VBUS):</strong> Carries +5V DC electrical power.</li>
  <li><strong>Pin 2 (D-):</strong> Negative differential data communication channel.</li>
  <li><strong>Pin 3 (D+):</strong> Positive differential data communication channel.</li>
  <li><strong>Pin 4 (GND):</strong> Electrical circuit ground reference.</li>
</ul>
<p>In standard low-speed charging, pins 2 and 3 transmit serial data packets using differential signaling at 1.5 Mbps to 480 Mbps. A malicious charging kiosk exploits these two data pins: while sending 5V power along pins 1 and 4, an embedded microcomputer (such as a Raspberry Pi Zero or Arduino HID injector hidden behind the wall plate) sends high-speed data queries along pins 2 and 3.</p>
<p>A physical <strong>USB Data Blocker</strong> (often marketed as a \"USB Condom\") physically severs the internal copper connections for Pin 2 and Pin 3. With no physical metal traces connecting the data pins, transmitting electrical data signals between the wall port and your phone is physically impossible under the laws of electrical physics! Only the VBUS and GND power circuits remain complete, guaranteeing 100% hardware-level defense against juice jacking.</p>

<h2>USB Power Delivery (USB-PD) Type-C Handshake Vulnerabilities</h2>
<p>With modern USB Type-C and USB Power Delivery (USB-PD), the architectural situation is slightly more complex. USB-C replaces legacy D+/D- pins with dedicated <strong>Configuration Channel (CC1 and CC2)</strong> pins for power contract negotiation. Through CC pins, the charger and phone exchange high-level digital packets negotiating voltages (such as 9V, 15V, or 20V at up to 5A).</p>
<p>While USB-PD CC pins do not transmit standard USB file transfer packets, compromised third-party charging bricks equipped with counterfeit microcontroller firmware have been demonstrated in academic proof-of-concept attacks (such as <em>BadPower</em> attacks). In these attacks, malicious firmware over-negotiates charging voltage—delivering 20V into an unprotected 5V circuit—causing immediate physical semiconductor burnout and irreversible hardware destruction of your phone's power management IC (PMIC). This underscores why you should always carry your own genuine OEM charging brick rather than plugging directly into public unverified USB ports.</p>
"""

# Apply extras
for p in posts:
    if p["id"] == 297:
        p["html"] += extra_297
    elif p["id"] == 299:
        p["html"] += extra_299
    elif p["id"] == 300:
        p["html"] += extra_300
    elif p["id"] == 301:
        p["html"] += extra_301

print("--- Verifying & Saving 297 to 301 ---")
for p in posts:
    save_and_verify(p)

print("Batch How-To 297-301 successfully saved and verified!")
