import os
import json
import xml.etree.ElementTree as ET
import re

POSTS_DIR = r"c:\wamp64\www\trendswheel-next\content\posts"
PUBLIC_DIR = r"c:\wamp64\www\trendswheel-next\public\posts"

def clean_xml(text):
    if not isinstance(text, str):
        return text
    # Avoid double escaping if already has &amp; or &#x...
    t = text.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")
    # fix double escapes
    t = re.sub(r'&amp;(amp|lt|gt|quot|apos|#x[0-9a-fA-F]+|[0-9]+);', r'&\1;', t)
    return t

def build_svg(data):
    theme = data.get("svg_theme", {"bg1": "#0f172a", "bg2": "#1e1b4b", "bg3": "#020617", "accent": "#38bdf8", "glow": "#818cf8", "badge_color": "#c084fc"})
    
    badge = clean_xml(data.get('svg_badge', 'GUIDE'))
    t1 = clean_xml(data.get('svg_title_1', ''))
    t2 = clean_xml(data.get('svg_title_2', ''))
    sub1 = clean_xml(data.get('svg_sub_1', ''))
    sub2 = clean_xml(data.get('svg_sub_2', ''))
    
    c1_title = clean_xml(data.get('svg_card1_title', ''))
    c1_sub = clean_xml(data.get('svg_card1_sub', ''))
    c1_b1 = clean_xml(data.get('svg_card1_b1', ''))
    c1_b2 = clean_xml(data.get('svg_card1_b2', ''))
    c1_b3 = clean_xml(data.get('svg_card1_b3', ''))
    
    c2_title = clean_xml(data.get('svg_card2_title', ''))
    c2_sub = clean_xml(data.get('svg_card2_sub', ''))
    c2_b1 = clean_xml(data.get('svg_card2_b1', ''))
    c2_b2 = clean_xml(data.get('svg_card2_b2', ''))
    c2_b3 = clean_xml(data.get('svg_card2_b3', ''))
    
    c3_title = clean_xml(data.get('svg_card3_title', ''))
    c3_sub = clean_xml(data.get('svg_card3_sub', ''))
    c3_b1 = clean_xml(data.get('svg_card3_b1', ''))
    c3_b2 = clean_xml(data.get('svg_card3_b2', ''))
    c3_b3 = clean_xml(data.get('svg_card3_b3', ''))

    svg = f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" width="100%" height="100%">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="{theme['bg1']}" />
      <stop offset="50%" stop-color="{theme['bg2']}" />
      <stop offset="100%" stop-color="{theme['bg3']}" />
    </linearGradient>
    <linearGradient id="titleGlow" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="{theme['accent']}" />
      <stop offset="100%" stop-color="{theme['glow']}" />
    </linearGradient>
    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="8" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)" />
  <circle cx="200" cy="160" r="150" fill="{theme['glow']}" opacity="0.12" filter="url(#glow)" />
  <circle cx="1020" cy="460" r="180" fill="{theme['accent']}" opacity="0.1" filter="url(#glow)" />
  <rect x="140" y="70" width="180" height="34" rx="17" fill="{theme['glow']}" fill-opacity="0.18" stroke="{theme['glow']}" stroke-width="1.5" />
  <text x="230" y="93" fill="{theme['badge_color']}" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="700" text-anchor="middle" letter-spacing="1">{badge}</text>
  <text x="140" y="165" fill="#ffffff" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="44" font-weight="800" line-height="1.2">
    <tspan x="140" dy="0">{t1}</tspan>
    <tspan x="140" dy="56" fill="url(#titleGlow)">{t2}</tspan>
  </text>
  <text x="140" y="275" fill="#94a3b8" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="20" font-weight="400">
    <tspan x="140" dy="0">{sub1}</tspan>
    <tspan x="140" dy="30">{sub2}</tspan>
  </text>
  <g transform="translate(140, 360)">
    <rect width="280" height="180" rx="16" fill="#1e293b" fill-opacity="0.75" stroke="#334155" stroke-width="1.5" />
    <circle cx="48" cy="48" r="24" fill="{theme['accent']}" fill-opacity="0.2" />
    <text x="48" y="55" fill="{theme['accent']}" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="20" font-weight="800" text-anchor="middle">1</text>
    <text x="86" y="44" fill="#f8fafc" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="16" font-weight="700">{c1_title}</text>
    <text x="86" y="64" fill="#94a3b8" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13">{c1_sub}</text>
    <text x="24" y="105" fill="#cbd5e1" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="500">&#x2022; {c1_b1}</text>
    <text x="24" y="130" fill="#cbd5e1" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="500">&#x2022; {c1_b2}</text>
    <text x="24" y="155" fill="#cbd5e1" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="500">&#x2022; {c1_b3}</text>
  </g>
  <g transform="translate(460, 360)">
    <rect width="280" height="180" rx="16" fill="#1e293b" fill-opacity="0.75" stroke="#334155" stroke-width="1.5" />
    <circle cx="48" cy="48" r="24" fill="{theme['glow']}" fill-opacity="0.2" />
    <text x="48" y="55" fill="{theme['glow']}" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="20" font-weight="800" text-anchor="middle">2</text>
    <text x="86" y="44" fill="#f8fafc" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="16" font-weight="700">{c2_title}</text>
    <text x="86" y="64" fill="#94a3b8" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13">{c2_sub}</text>
    <text x="24" y="105" fill="#cbd5e1" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="500">&#x2022; {c2_b1}</text>
    <text x="24" y="130" fill="#cbd5e1" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="500">&#x2022; {c2_b2}</text>
    <text x="24" y="155" fill="#cbd5e1" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="500">&#x2022; {c2_b3}</text>
  </g>
  <g transform="translate(780, 360)">
    <rect width="280" height="180" rx="16" fill="#1e293b" fill-opacity="0.75" stroke="#10b981" stroke-width="1.5" />
    <circle cx="48" cy="48" r="24" fill="#10b981" fill-opacity="0.2" />
    <text x="48" y="55" fill="#10b981" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="20" font-weight="800" text-anchor="middle">&#x2713;</text>
    <text x="86" y="44" fill="#f8fafc" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="16" font-weight="700">{c3_title}</text>
    <text x="86" y="64" fill="#6ee7b7" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13">{c3_sub}</text>
    <text x="24" y="105" fill="#cbd5e1" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="500">&#x2022; {c3_b1}</text>
    <text x="24" y="130" fill="#cbd5e1" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="500">&#x2022; {c3_b2}</text>
    <text x="24" y="155" fill="#cbd5e1" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="500">&#x2022; {c3_b3}</text>
  </g>
</svg>"""
    return svg

def strip_tags(html):
    return re.sub(r'<[^>]*>', ' ', html)

def count_words(html):
    return len(strip_tags(html).split())

print("Updated batch_builder_helper loaded.")
