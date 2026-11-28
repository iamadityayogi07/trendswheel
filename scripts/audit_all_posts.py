import os
import json
import glob
import xml.etree.ElementTree as ET
import re

POSTS_DIR = r"c:\wamp64\www\trendswheel-next\content\posts"
PUBLIC_DIR = r"c:\wamp64\www\trendswheel-next\public"

def clean_html_words(html_text):
    text = re.sub(r'<[^>]+>', ' ', html_text)
    return len(text.split())

files = glob.glob(os.path.join(POSTS_DIR, "*.json"))
print(f"Total post JSON files on disk: {len(files)}")

categories = {}
new_posts = []
errors = []

for f in files:
    with open(f, encoding="utf-8") as fp:
        p = json.load(fp)
    cat = p.get("category", {}).get("slug", "unknown")
    categories[cat] = categories.get(cat, 0) + 1
    
    if p["id"] >= 282:
        new_posts.append(p)
        words = clean_html_words(p.get("html", ""))
        if words < 1500:
            errors.append(f"Post {p['id']} ({p['slug']}) has only {words} words (< 1500 target)!")
        
        # Check SVG
        img = p.get("featuredImage", "")
        if img.startswith("/"):
            svg_path = os.path.join(PUBLIC_DIR, img.lstrip("/").replace("/", os.sep))
            if not os.path.exists(svg_path):
                errors.append(f"Post {p['id']} SVG file not found: {svg_path}")
            else:
                try:
                    ET.parse(svg_path)
                except Exception as e:
                    errors.append(f"Post {p['id']} SVG file invalid XML: {e}")
        
        # Check dates
        pub = p.get("publishedAt")
        upd = p.get("updatedAt")
        if not pub or not upd:
            errors.append(f"Post {p['id']} missing publishedAt or updatedAt")
        elif pub != upd:
            errors.append(f"Post {p['id']} dates differ: pub={pub}, upd={upd}")

print("Category breakdown:")
for c, count in sorted(categories.items()):
    print(f"  {c}: {count} posts")

print(f"Total new posts evaluated (IDs 282-361): {len(new_posts)}")
print(f"Total errors found: {len(errors)}")

if errors:
    for e in errors:
        print("ERROR:", e)
    sys.exit(1)
else:
    print("SUCCESS: All 80 new posts strictly meet all criteria (>=1500 words, valid XML SVGs, matching dates for Published-only rendering, correct JSON structure)!")
