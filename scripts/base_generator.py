import os
import json
import xml.etree.ElementTree as ET
from batch_builder_helper import build_svg, count_words

POSTS_DIR = r"c:\wamp64\www\trendswheel-next\content\posts"
PUBLIC_DIR = r"c:\wamp64\www\trendswheel-next\public\posts"

def save_and_verify(post):
    svg_code = build_svg(post)
    svg_path = os.path.join(PUBLIC_DIR, post["svg_file"])
    with open(svg_path, "w", encoding="utf-8") as f:
        f.write(svg_code)
    
    # strict xml check
    ET.parse(svg_path)
    
    words = count_words(post["html"])
    print(f"Post {post['id']} [{post['category']['slug']}] ({post['slug']}): {words} words. SVG XML Valid.")
    assert words >= 1500, f"Post {post['id']} has only {words} words (< 1500 target)!"
    
    post_json = {
        "id": post["id"],
        "slug": post["slug"],
        "title": post["title"],
        "metaTitle": post["metaTitle"],
        "metaDescription": post["metaDescription"],
        "metaKeywords": post["metaKeywords"],
        "excerpt": post["excerpt"],
        "description": post["description"],
        "publishedAt": post["publishedAt"],
        "updatedAt": post["updatedAt"],
        "category": post["category"],
        "tags": post["tags"],
        "author": post["author"],
        "featuredImage": f"/posts/{post['svg_file']}",
        "thumbnailImage": f"/posts/{post['svg_file']}",
        "altImage": post["altImage"],
        "oldPath": f"/{post['category']['slug']}/{post['slug']}",
        "impressions": 0,
        "faq": post["faq"],
        "html": post["html"]
    }
    
    json_path = os.path.join(POSTS_DIR, f"{post['slug']}.json")
    with open(json_path, "w", encoding="utf-8") as f:
        json.dump(post_json, f, indent=2)

print("Base runner ready.")
