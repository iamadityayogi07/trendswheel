import sys
import os

sys.path.append(os.path.abspath("scripts"))
from generate_apps_302_306 import posts
from batch_builder_helper import count_words
from base_generator import save_and_verify

extra_303 = """
<h2>Qualcomm Hexagon NPU vs. ARM Immortalis: Mobile Silicon Deep Dive</h2>
<p>Understanding the hardware layer that accelerates local LLM inference explains why on-device AI has advanced so rapidly between 2024 and 2026. Modern mobile system-on-chips (SoCs) no longer rely on general-purpose CPU cores to process tensor mathematics. Instead, modern flagships embed dedicated <strong>Neural Processing Units (NPUs)</strong> and matrix math co-processors designed specifically for int4 and int8 dot-product operations.</p>
<p>For example, Qualcomm's Snapdragon 8 Gen 3 and Gen 4 feature the <strong>Hexagon NPU</strong>, which utilizes fused vector-tensor accelerators capable of delivering up to 45 to 70 TOPS (Tera Operations Per Second). When running quantized GGUF models through llama.cpp compiled with Qualcomm's <em>FastRPC</em> and <em>Qualcomm Neural Processing SDK (QNN)</em> backends, the NPU processes attention matrices directly in dedicated high-speed tightly-coupled memory (TCM). This eliminates round-trips to system DRAM, slashing power draw from 7 watts down to less than 2.2 watts! If you run local models on MediaTek Dimensity 9300 or 9400 chips, the <strong>APU 790</strong> hardware accelerator delivers comparable hardware gains via the NeuroPilot framework. Always check if your local AI app supports hardware NPU delegates to double battery endurance during long conversational sessions.</p>

<h2>Thermal Throttling Mitigation and Sustained Token Generation</h2>
<p>While generating short 50-token answers is effortless for modern mobile silicon, generating multi-page essays, translating 2000-word documents, or running continuous agentic loops will quickly heat your smartphone's application processor up to 45°C. When Android's thermal core driver detects junction temperatures exceeding 75°C, it activates thermal throttling: throttling big CPU core frequencies from 3.3 GHz down to 1.8 GHz and slashing token generation rates in half.</p>
<p>To maintain peak generation performance during heavy inference workloads:</p>
<ul>
  <li><strong>Thread Clamping:</strong> In llama.cpp or PocketPal settings, do not set the execution thread count to your total physical core count (e.g., 8 threads on an octa-core CPU). Instead, configure thread count to <strong>4 threads</strong>, pinning execution exclusively to the high-performance Cortex-X and Cortex-A7 series performance cores while leaving the efficiency cores idle to manage background OS interrupts.</li>
  <li><strong>Context Window Management:</strong> Restrict context limits (<code>-c</code> parameter) to the minimum necessary for your task (e.g., 2048 tokens instead of 8192). Larger context windows exponentially increase KV cache memory footprint in RAM, triggering aggressive memory compression algorithms like zRAM that burn additional CPU cycles.</li>
</ul>
"""

extra_304 = """
<h2>Split APKs, APKM Bundles, and Dynamic Feature Modules Demystified</h2>
<p>One of the primary reasons standard backup apps fail when attempting to restore modern Android applications is the widespread transition from monolithic APKs to <strong>Android App Bundles (AAB)</strong> and <strong>Split APKs</strong>.</p>
<p>In older Android versions, every app was compiled into a single, self-contained <code>base.apk</code> that included all CPU architectures, display densities, and language files. Today, the Google Play Store serves tailor-made Split APK packages containing:</p>
<ul>
  <li><code>base.apk</code>: Core application bytecode and manifest.</li>
  <li><code>split_config.arm64_v8a.apk</code>: Native C/C++ compiled binaries matching your exact processor architecture.</li>
  <li><code>split_config.xxhdpi.apk</code>: High-resolution graphical assets matching your screen density.</li>
  <li><code>split_config.en.apk</code>: Localized language strings.</li>
</ul>
<p>If a legacy backup utility only archives the <code>base.apk</code>, attempting to restore it on a new device results in instant <code>INSTALL_FAILED_MISSING_SPLIT_APKS</code> crashes! Advanced backup suites like <strong>Swift Backup</strong> and <strong>Neo Backup</strong> recognize the Split APK tree, bundling all companion slices into unified <code>.apks</code> or <code>.apkm</code> packages, and leveraging Android's <code>PackageInstaller.Session</code> API to install the complete bundle atomically.</p>

<h2>Encrypted Keystore Extraction and Hardware-Backed Secret Migration</h2>
<p>The ultimate frontier in Android backup engineering is the <strong>Android Keystore System</strong>. When you log into modern banking apps, signal communicators, or enterprise VPNs, the cryptographic private keys securing your session are generated inside a dedicated <strong>Hardware Security Module (HSM)</strong>—such as Google's Titan M2 or Samsung Knox Vault.</p>
<p>By architectural design, private keys created with the <code>KeyGenParameterSpec.PURPOSE_SIGN</code> flag inside hardware-backed storage can never be exported or read by software—not even by the Linux root superuser! This is why, even with a 100% complete byte-for-byte root backup of <code>/data/data/</code>, high-security banking applications will still prompt you to authenticate when restored onto a different physical motherboard with a different cryptographic hardware chip. Understanding this fundamental security boundary ensures you always maintain secondary two-factor recovery codes and never rely solely on file backups for hardware-bound cryptographic keys.</p>
"""

extra_305 = """
<h2>Detecting Covert C2 Beacons and Ad-Fraud SDKs in Background Traffic</h2>
<p>When analyzing mobile packet captures with PCAPdroid or Wireshark, learning how to identify suspicious network signatures separates basic users from skilled security analysts. Malicious spyware, unauthorized data brokers, and covert advertising SDKs exhibit distinct behavioral patterns that stand out immediately in packet logs:</p>
<ul>
  <li><strong>Periodic Jittered Heartbeats:</strong> Stalkerware and remote access trojans (RATs) maintain contact with Command &amp; Control (C2) servers by transmitting tiny 64-byte to 256-byte TCP or UDP beacons at fixed intervals (e.g., every 300 seconds). By sorting PCAPdroid connections by packet frequency and transfer size, these silent heartbeats become instantly visible.</li>
  <li><strong>Unencrypted DNS Leaks:</strong> Even if your phone has a system-wide Private DNS provider configured, rogue applications sometimes bundle their own embedded DNS client libraries (such as c-ares or embedded Go resolvers) to bypass Android system DNS settings, querying hardcoded IP addresses directly. PCAPdroid flags these anomalous direct-IP socket calls in its diagnostic connection table.</li>
  <li><strong>High-Frequency Location Pings:</strong> Free utility applications (calculators, wallpapers, flashlight apps) that secretly participate in commercial location-broker data networks transmit serialized JSON payloads containing latitude, longitude, Wi-Fi BSSID tables, and device advertising IDs (GAID) every time you move more than 50 meters. Catching these packets allows you to revoke location permissions or permanently uninstall the offending app.</li>
</ul>

<h2>Automated Packet Extraction: Wireshark Display Filters for Mobile Auditing</h2>
<p>Once you export your capture file to a desktop computer, applying precision Wireshark display filters allows you to isolate critical mobile events in seconds:</p>
<ul>
  <li><code>http.request.method == "POST"</code>: Filters out all background web fetches and highlights outgoing data transmissions containing uploaded form data, telemetry strings, and analytics payloads.</li>
  <li><code>tls.handshake.type == 1</code>: Displays every TLS Client Hello packet, exposing the <strong>Server Name Indication (SNI)</strong> domain name of every encrypted server your phone connects to, even if the payload is encrypted.</li>
  <li><code>dns.flags.response == 1 &amp;&amp; dns.flags.rcode != 0</code>: Highlights all failed DNS lookups, identifying dead tracker servers or domain sinkholes.</li>
</ul>
"""

extra_306 = """
<h2>Bi-Directional Linking Mechanics and Graph Theory in Practice</h2>
<p>To unlock the true power of networked note-taking in Obsidian or Logseq, it helps to understand the underlying graph theory. Traditional hierarchical folders create tree structures: a file belongs to exactly one parent folder. If a thought connects to both \"Software Architecture\" and \"Personal Philosophy\", you are forced to make an arbitrary classification decision.</p>
<p>Bi-directional linking replaces rigid hierarchical trees with a <strong>Semantic Knowledge Web</strong>. When you write <code>[[Cognitive Biases]]</code> inside a note about mobile user interface design, you simultaneously create a forward link from your design note and a backward citation (backlink) on the Cognitive Biases page. When you open your graph view, you can filter by link depth, node centrality, and color-coded tags. Ideas that you recorded months apart begin to cluster together naturally, sparking unexpected creative insights and revealing structural patterns in your reading and thinking that no folder tree could ever provide.</p>

<h2>Automated Git Sync: Building a Bulletproof Termux Version Control Pipeline</h2>
<p>For programmers and privacy purists who want complete version history for their second brain without paying for cloud subscriptions, you can automate Git synchronization on Android using <strong>Termux</strong>:</p>
<ol>
  <li>Initialize a private Git repository on GitHub, GitLab, or your self-hosted Gitea/Forgejo instance.</li>
  <li>Inside Termux, generate an SSH key pair (<code>ssh-keygen -t ed25519</code>) and add the public key to your Git account.</li>
  <li>Clone the repository into your phone's shared storage (e.g., <code>/sdcard/Documents/ObsidianVault/</code>).</li>
  <li>Create a lightweight shell script that stages, commits, and pushes changes automatically:</li>
</ol>
<pre><code>#!/bin/bash
cd /sdcard/Documents/ObsidianVault
git add -A
git commit -m "Auto-vault sync: $(date '+%Y-%m-%d %H:%M:%S')"
git pull --rebase origin main
git push origin main</code></pre>
<p>You can execute this script with a single tap using the Termux:Widget app on your home screen or automate it via Android Cron/Tasker whenever your phone connects to your home Wi-Fi while charging. You now have infinite version rollback, zero monthly fees, and bulletproof offline redundancy!</p>
"""

# Apply extras
for p in posts:
    if p["id"] == 303:
        p["html"] += extra_303
    elif p["id"] == 304:
        p["html"] += extra_304
    elif p["id"] == 305:
        p["html"] += extra_305
    elif p["id"] == 306:
        p["html"] += extra_306

print("--- Verifying & Saving Patched Apps 302 to 306 ---")
for p in posts:
    save_and_verify(p)

print("Batch Apps 302-306 successfully saved and verified!")
