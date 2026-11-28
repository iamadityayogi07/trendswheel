import sys
import os

sys.path.append(os.path.abspath("scripts"))
from generate_apps_307_311 import posts
from batch_builder_helper import count_words
from base_generator import save_and_verify

extra_307 = """
<h2>Reproducible Builds and Sigstore Cryptographic Transparency</h2>
<p>As direct-from-source distribution replaces traditional centralized app repositories, security researchers have focused on solving a critical software supply-chain dilemma: <em>\"How do you prove that an APK binary uploaded to a GitHub release genuinely matches the audited open-source code in the repository?\"</em></p>
<p>This is where <strong>Reproducible Builds</strong> and cryptographic transparency protocols like <strong>Sigstore</strong> are revolutionizing mobile security. In a reproducible build environment, compilers are stripped of non-deterministic inputs—such as system timestamps, ephemeral file paths, and random seed generators. If three independent developers compile the code on three different machines across the world, every machine produces a bit-for-bit identical cryptographic SHA-256 binary hash!</p>
<p>Modern package managers like <strong>Accrescent</strong> and advanced Obtainium workflows can cross-check developer release hashes against distributed transparency logs. If a compromised GitHub developer account or a rogue CI/CD runner uploads a backdoored APK, the hash diverges from the reproducible build consensus, and the installation is instantly blocked before malicious code can execute on your device.</p>

<h2>Shizuku IPC Binder Architecture and Android Permission Sandboxing</h2>
<p>Understanding the internal security architecture of Shizuku reveals why it has become the gold standard for non-root system operations. Standard Android security isolates applications using Linux kernel UID boundaries and SELinux policies. When an app requests system privileges, Android's <code>ActivityManagerService</code> checks its UID against the system manifest table.</p>
<p>Shizuku operates by spawning a persistent Java daemon process under the <code>shell</code> UID (UID 2000). It establishes an <strong>Android Binder IPC (Inter-Process Communication)</strong> proxy interface exposed via a local socket. When you authorize an app like Obtainium inside Shizuku's management screen, Shizuku generates a cryptographically random 128-bit authentication token stored securely in the app's internal database.</p>
<p>During silent package installations, Obtainium passes this token over the Binder transaction buffer. Shizuku's daemon verifies the token, asserts caller legitimacy, and proxies the package installation payload directly to Android's internal <code>IPackageInstaller</code> service. Because the call originates under UID 2000, Android processes the update without user prompts. This architecture gives you the operational velocity of a custom root ROM while preserving verified boot, hardware attestation, and zero attack surface for unauthenticated apps.</p>
"""

extra_308 = """
<h2>WebSub (PubSubHubbub) Real-Time Push vs. High-Frequency Polling</h2>
<p>A persistent challenge with traditional RSS feeds has always been the delay between an article's publication and when your reader discovers it. Traditionally, an RSS reader polls each website every 30 or 60 minutes. If you follow breaking news or financial tickers, a 30-minute lag is unacceptable; yet polling 200 feeds every two minutes will quickly drain your smartphone's battery and get your home IP address rate-limited by cloud firewalls like Cloudflare.</p>
<p>Modern self-hosted RSS servers like <strong>FreshRSS</strong> and <strong>Miniflux</strong> overcome this via <strong>WebSub (formerly PubSubHubbub)</strong>. WebSub is a W3C-standard decentralized publish-subscribe protocol that replaces polling with real-time push events:</p>
<ol>
  <li>When you subscribe to a WebSub-enabled feed (supported by WordPress, Substack, Medium, and major news networks), your self-hosted server registers a unique callback webhook with the publisher's designated WebSub Hub.</li>
  <li>The publisher posts a new article. Within milliseconds, the hub transmits a lightweight HTTP POST payload containing the new article directly to your server!</li>
  <li>Your server ingests the article and immediately pushes a notification to your Android phone via unified push protocols (such as <em>ntfy</em> or <em>Gotify</em>).</li>
</ol>
<p>Through WebSub, you receive breaking investigative journalism within 5 seconds of publication with virtually zero background battery consumption on your mobile device!</p>

<h2>Custom CSS and XPath Scrapers: Bypassing Paywalled and Incomplete Feeds</h2>
<p>Many digital media publications deliberately handicap their public RSS feeds by publishing only a single paragraph followed by a tracking link to force users onto ad-choked websites. If you run a self-hosted FreshRSS backend, you can completely neutralize this behavior using <strong>Custom XPath Scraping Rules</strong>.</p>
<p>Inside FreshRSS's feed configuration, you can enter custom CSS/XPath selectors (for example: <code>//article[@class='post-content']</code> or <code>//div[contains(@class,'story-body')]</code>). When FreshRSS detects a new article, its server-side DOM parser fetches the web page, executes the XPath query, extracts the complete long-form article body alongside high-resolution images, and strips out newsletter popups, social share widgets, and sponsored affiliate blocks. By the time the article syncs to your phone in ReadYou or FocusReader, you receive an impeccably clean, distraction-free reading experience that loads instantly offline.</p>

<h2>Fever API and Google Reader API Emulation: Under the Hood</h2>
<p>To understand how cross-device synchronization functions so reliably between your home server and Android apps, it helps to inspect the communication protocols. When Google killed Google Reader in 2013, developers did not abandon its architecture; instead, the community standardized on reverse-engineered clones of the <strong>Google Reader API (GReader)</strong> and Shaun Inman's <strong>Fever API</strong>.</p>
<p>Under the GReader API protocol, your Android app transmits HTTP GET requests with an authentication token (<code>ClientLogin</code> or OAuth). The server responds with streamlined JSON streams containing item IDs and timestamp markers. Rather than transmitting thousands of entire HTML files across mobile data, the app queries: <em>\"Give me only article IDs modified since timestamp T\"</em>. The server returns a compact JSON array of modified IDs. The Android app marks those articles as read locally, reducing data consumption to a few kilobytes per sync. This enables lightning-fast synchronization even in underground transit stations with weak cellular signals.</p>

<h2>Automating Content Aggregation: Bridging YouTube, Reddit, and Podcasts into RSS</h2>
<p>One of the best-kept secrets of modern RSS power users is that RSS is not restricted to traditional text blogs. You can transform your entire digital media consumption into a centralized, ad-free RSS stream:</p>
<ul>
  <li><strong>YouTube Channels via RSS:</strong> Every YouTube channel has a hidden native RSS feed! Simply take any channel ID (e.g., <code>UC...</code>) and format it as <code>https://www.youtube.com/feeds/videos.xml?channel_id=CHANNEL_ID</code>. Subscribe in ReadYou or Feeder, and you receive every new video upload chronologically without YouTube's addictive algorithmic recommendations or sponsor banners.</li>
  <li><strong>Reddit Subreddits via RSS:</strong> Append <code>.rss</code> to any subreddit URL (e.g., <code>https://www.reddit.com/r/android.rss</code>) to follow technical discussions and breaking news directly in your RSS reader.</li>
  <li><strong>Newsletter Ingestion:</strong> Services like <em>Kill the Newsletter!</em> convert annoying email newsletters into clean, private Atom feeds, keeping your personal email inbox pristine while consolidating all reading into one unified dashboard.</li>
</ul>
"""

extra_309 = """
<h2>USB Audio Class 2.0 (UAC2) Buffer Underrun Diagnostics and Clock Jitter</h2>
<p>When connecting high-end professional audio gear to Android smartphones via USB OTG adapters, sound engineers occasionally encounter frustrating digital audio defects: intermittent clicks, pops, and rhythmic dropouts. These artifacts are not caused by analog microphone interference, but by <strong>USB Buffer Underruns</strong> and <strong>Clock Domain Jitter</strong>.</p>
<p>USB Audio Class 2.0 operates using <em>isochronous asynchronous transfers</em>. In this mode, the external USB audio interface (such as a Focusrite or Rode mixer) acts as the master word clock, dictating precise audio sampling timing (e.g., exactly 48,000 samples per second). The Android Linux kernel must read these digital PCM audio chunks and deliver them into the application's ring buffer without missing a single microsecond deadline.</p>
<p>To eliminate audio dropouts during mission-critical field recording sessions:</p>
<ul>
  <li><strong>Adjust Audio Buffer Size:</strong> In pro apps like AudioLab or WavePad, navigate to the recording engine settings and increase the USB buffer size from 64 frames (low latency) to 256 or 512 frames. While this adds a minor 5ms monitoring delay, it guarantees 100% dropout-free recording during long takes.</li>
  <li><strong>Disable Android USB Audio Routing Flags:</strong> Ensure your recording software opens the USB hardware directly using <code>libusb</code> or Android's <code>AAudio</code> low-latency framework, preventing Android's default <code>AudioFlinger</code> mixer from forcefully resampling your pristine 96kHz stream down to 48kHz.</li>
</ul>

<h2>32-Bit Floating Point vs. 24-Bit Fixed Precision Dynamics</h2>
<p>The latest revolution in professional mobile field recording is the transition to <strong>32-bit Float recording</strong>. In traditional 16-bit or 24-bit fixed-point digital audio, if an interviewee suddenly shouts into the microphone or a loud explosion occurs nearby, the incoming electrical signal exceeds maximum digital amplitude (0 dBFS). The digital-to-analog converter hard-clips the peaks of the sound wave into harsh square waves, creating permanent, unfixable distortion.</p>
<p>32-bit floating point audio completely changes the laws of mobile audio capture. By encoding audio values with a 24-bit mantissa and an 8-bit exponent, 32-bit float delivers an astronomical <strong>1,528 dB of dynamic range</strong> (far exceeding the dynamic range of human hearing and physical air molecules). When paired with a 32-bit float portable interface (such as the Zoom F3 or Rode Wireless PRO), even if an audio track violently clips to +30 dB in your phone's waveform view, the peaks are not lost! In AudioLab or WavePad, you simply select the clipped waveform, reduce gain by -30 dB, and the entire audio wave is mathematically recovered without a trace of digital distortion.</p>

<h2>Mobile Acoustic Environment Control: The Field Recording Guide</h2>
<p>Even the most expensive 24-bit USB condenser microphone connected to AudioLab cannot overcome a reverberant, acoustically reflective environment. When recording speech in hotel rooms, conference halls, or domestic bedrooms, sound waves bounce off bare drywall, windows, and hardwood floors, creating boxy flutter echoes that ruin clarity.</p>
<p>To capture broadcast-ready voice tracks on mobile without carrying acoustic foam panels:</p>
<ul>
  <li><strong>The Wardrobe Vocal Booth Trick:</strong> When recording voiceovers or podcast intros in a hotel room or home, open a clothes closet filled with hanging winter coats and speak directly toward the soft garments. The thick fabrics absorb acoustic reflections between 200 Hz and 8 kHz, producing a warm, dry broadcast sound that rival professional radio studio booths!</li>
  <li><strong>Microphone Distance and the Proximity Effect:</strong> Position your directional cardioid microphone between 4 and 6 inches from your mouth, angled slightly toward your cheekbones (off-axis) rather than directly in front of your lips. This natural off-axis alignment prevents breath plosives while taking advantage of the acoustic <em>Proximity Effect</em> to add rich, authoritative low-end resonance to your voice.</li>
</ul>
"""

extra_310 = """
<h2>Frame Pacing, NVENC Dynamic Bitrate Adaptation, and UDP Jitter Buffering</h2>
<p>To understand why Moonlight and Sunshine deliver a gaming experience that feels physically identical to playing on a local console, one must examine the mathematics of <strong>Real-Time Video Transport</strong>. Unlike video streaming platforms like Netflix or YouTube that buffer 30 seconds of video in advance, remote game streaming cannot buffer a single frame: every video frame must be captured, encoded, transmitted across the network, decoded, and rendered on your phone in under 16.6 milliseconds (at 60 FPS) or 8.3 milliseconds (at 120 FPS).</p>
<p>Moonlight achieves this through deep hardware integration:</p>
<ul>
  <li><strong>Direct NVENC / AMF Memory Grab:</strong> Sunshine hooks directly into the Windows Desktop Duplication API (DDA) or DirectX 11/12 swapchain buffers. Frames are captured directly in GPU VRAM and compressed via dedicated silicon encoders (NVENC on RTX cards or AMF on Radeon cards) in less than 2.5 milliseconds.</li>
  <li><strong>Custom UDP Transport with FEC (Forward Error Correction):</strong> Standard TCP protocols guarantee packet delivery by retransmitting dropped packets, but retransmissions introduce fatal stutter. Moonlight uses high-speed UDP streams coupled with Reed-Solomon Forward Error Correction. If 2% of network packets are lost over your home Wi-Fi, the receiving phone mathematically reconstructs the missing data without requesting a retransmission!</li>
  <li><strong>Adaptive Dynamic Bitrate:</strong> Moonlight continuously measures round-trip ping time and packet arrival jitter. If someone in your home begins uploading a large file, Moonlight dynamically scales video bitrate on the fly (from 50 Mbps down to 25 Mbps) to prevent input latency spikes.</li>
</ul>

<h2>Configuring Virtual Display Drivers for Headless High-Refresh PC Streaming</h2>
<p>A common issue encountered by users streaming PC games to modern flagship smartphones is an aspect ratio mismatch. Most desktop gaming monitors are 16:9 widescreen (1920x1080 or 2560x1440), whereas modern smartphones feature tall 19.5:9 or 20:9 display panels with 120Hz refresh rates. Streaming a 16:9 desktop to a smartphone results in thick black letterbox bars on the top and bottom.</p>
<p>To solve this, install the open-source <strong>IddSampleDriver (Virtual Display Driver)</strong> on your host PC. Paired with automation tools like <em>QRes</em> or Sunshine's preparation scripts, Sunshine can automatically create a virtual high-refresh monitor matching your smartphone's exact native resolution (such as 2778x1284 at 120Hz) whenever you connect from your phone, and disable it the second you disconnect. You get full-screen, edge-to-edge, razor-sharp 120 FPS PC gaming with zero display distortion!</p>

<h2>Advanced Controller Haptics and Gyroscope Aiming Emulation</h2>
<p>Modern mobile gaming reaches its zenith when you connect a physical gamepad. When paired with a PlayStation DualSense or Xbox wireless controller over Bluetooth, Moonlight supports full <strong>controller haptics pass-through</strong> and <strong>gyroscope motion aiming</strong>.</p>
<p>In fast-paced tactical first-person shooters, Moonlight reads your phone's or controller's internal 6-axis gyroscope sensors (accelerometer and gyroscope) at 1000 Hz, translating subtle wrist tilts into microscopic mouse aiming coordinates on your PC. This enables competitive precision aiming that rivals desktop mouse players, completely eliminating the sluggishness of traditional touchscreen virtual joysticks!</p>

<h2>Secure Remote Access via WireGuard and Tailscale Meshes</h2>
<p>When accessing your home PC outside of your local home Wi-Fi network—such as over a public cellular connection or airport Wi-Fi—opening raw ports (like port 47984 or 21117) on your home router firewall introduces severe security vulnerabilities to internet-wide botnet port scanners.</p>
<p>The gold-standard architectural solution is to tunnel your remote connection through a secure <strong>WireGuard</strong> or <strong>Tailscale overlay mesh network</strong>. By installing Tailscale or an open-source WireGuard client on both your home PC and your Android phone, both machines establish an encrypted peer-to-peer point-to-point tunnel using ChaCha20-Poly1305 cryptography. Your phone can connect to Moonlight or RustDesk using your PC's private <code>100.x.y.z</code> Tailscale IP address exactly as if you were sitting on your living room rug, with zero open firewall ports on your home router!</p>
"""

extra_311 = """
<h2>Dynamic Tone Mapping and EOTF Curves: BT.2390 in Practice</h2>
<p>Modern mobile displays on flagship smartphones (such as Samsung Dynamic AMOLED 2X and Google Super Actua displays) are capable of astonishing peak brightness levels ranging from 1,600 to 2,600 nits. However, mastering 4K HDR10 and Dolby Vision content requires precise translation between the video stream's optical luminance values and the physical capabilities of your phone's display panel.</p>
<p>In 4K HDR mastering, luminance is encoded using the <strong>Perceptual Quantizer (SMPTE ST 2084 / PQ EOTF)</strong> curve, which defines absolute brightness levels up to 10,000 nits. If a video player uses crude clipping to display a 4,000-nit highlight on a 1,200-nit mobile screen, bright clouds and explosions lose all detail and wash out into harsh white blobs. Advanced players like <strong>Just Player</strong> and <strong>MPV</strong> utilize the <strong>ITU-R BT.2390 Electro-Optical Transfer Function (EOTF)</strong> standard. BT.2390 applies smooth knee-point compression to roll off peak specular highlights gracefully, preserving nuanced cloud textures and sun flares while retaining deep OLED blacks.</p>

<h2>Custom GLSL Real-Time Upscaling Shaders: FSRCNNX and Anime4K on Android</h2>
<p>For anime lovers and vintage film enthusiasts, MPV on Android supports custom <strong>OpenGL and Vulkan GLSL Shaders</strong> that can upscale standard 720p or 1080p video to razor-sharp 1440p and 4K in real time using neural network models.</p>
<p>By placing community shader files in your MPV configuration folder, you can activate:</p>
<ul>
  <li><strong>FSRCNNX (Fast Super-Resolution Convolutional Neural Network):</strong> Uses an 8-layer deep convolutional neural network to reconstruct fine edges and textures in live-action cinema without creating artificial ringing halos.</li>
  <li><strong>Anime4K:</strong> A state-of-the-art suite of algorithms specifically designed to upscale Japanese animation. Anime4K sharpens line art, removes MPEG compression ringing around character outlines, and enhances color gradients in real time with virtually zero battery drain on modern Adreno GPUs.</li>
</ul>
<p>To enable Anime4K inside MPV on Android, simply append <code>glsl-shaders="~~/shaders/Anime4K_Restore_CNN_M.glsl:~~/shaders/Anime4K_Upscale_CNN_x2_M.glsl"</code> to your <code>mpv.conf</code> file!</p>

<h2>Surround Sound Audio Downmixing and Headphone Binaural HRTF Simulation</h2>
<p>A widespread issue when watching 4K movies with 5.1 or 7.1 surround sound audio tracks on mobile devices is muffled dialogue. When a 6-channel or 8-channel Dolby TrueHD or DTS-HD audio track is bluntly downmixed to stereo headphones by basic media players, the loud side and rear surround channels overpower the central dialogue channel, forcing you to constantly ride the volume rocker.</p>
<p>Both MPV and VLC include advanced audio matrix mixers and <strong>Head-Related Transfer Function (HRTF)</strong> spatial filters. MPV's custom audio filter <code>pan=stereo|c0=0.5*c2+0.707*c0+0.707*c4|c1=0.5*c2+0.707*c1+0.707*c5</code> dynamically boosts the center channel (c2) where human speech resides by +3dB, while applying acoustic phase delays to simulate a 3D surround soundstage inside standard wired or Bluetooth headphones. Dialogue becomes razor-sharp, crisp, and intelligible even during deafening action sequences.</p>

<h2>Hardware MediaCodec vs. Software FFmpeg Decoding: Balancing Battery Life and Codec Support</h2>
<p>In mobile video playback, the choice between hardware acceleration (<code>mediacodec</code>) and software decoding (FFmpeg CPU rendering) dictates whether your phone can play movies for 14 hours straight or drains its battery in 90 minutes while heating up uncomfortably in your hand.</p>
<p>Hardware decoding routes compressed video bitstreams directly into the smartphone SoC's dedicated fixed-function silicon blocks (such as the Qualcomm Adreno Video Processing Unit). These dedicated silicon circuits decode 10-bit HEVC, AV1, and VP9 streams using less than 1.2 watts of power. Software decoding, on the other hand, forces the main CPU cores to execute billions of mathematical discrete cosine transforms in software, consuming 5 to 7 watts. While modern open-source players like Just Player and MPV default to hardware acceleration, MPV provides the crucial fallback: if a video file uses an exotic format (such as 10-bit H.264 Hi10P anime encodes that mobile hardware decoders do not officially support), MPV automatically falls back to multi-threaded software decoding without crashing, ensuring you can play 100% of video files ever created.</p>
"""

# Apply extras
for p in posts:
    if p["id"] == 307:
        p["html"] += extra_307
    elif p["id"] == 308:
        p["html"] += extra_308
    elif p["id"] == 309:
        p["html"] += extra_309
    elif p["id"] == 310:
        p["html"] += extra_310
    elif p["id"] == 311:
        p["html"] += extra_311

print("--- Verifying & Saving Patched Apps 307 to 311 ---")
for p in posts:
    save_and_verify(p)

print("Batch Apps 307-311 successfully saved and verified!")
