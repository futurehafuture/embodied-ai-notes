"""Render the textbook chapters into the published standalone HTML page.

Run from this directory: python3 build.py
Requires pandoc. The short interview summaries and page shell remain in index.html.
"""

from pathlib import Path
import re
import subprocess

root = Path(__file__).resolve().parent
source = (root / "textbook.md").read_text(encoding="utf-8")
page_path = root / "index.html"
page = page_path.read_text(encoding="utf-8")

parts = re.split(r"^<!-- chapter:([a-z-]+) -->\s*$", source, flags=re.M)
if parts[0].strip() or len(parts) < 3 or len(parts) % 2 == 0:
    raise SystemExit("Expected <!-- chapter:id --> markers and chapter content")

for chapter, markdown in zip(parts[1::2], parts[2::2]):
    if not markdown.strip():
        raise SystemExit(f"Empty chapter: {chapter}")
    rendered = subprocess.run(
        ["pandoc", "-f", "gfm", "-t", "html", "--wrap=none"],
        input=markdown,
        text=True,
        capture_output=True,
        check=True,
    ).stdout.strip()
    rendered = rendered.replace("<table>", '<div class="tbl-wrap"><table>').replace("</table>", "</table></div>")
    start = f"<!-- textbook:{chapter}:start -->"
    end = f"<!-- textbook:{chapter}:end -->"
    if start not in page:
        pattern = rf'(<section id="{re.escape(chapter)}">\s*<h2[^>]*>.*?</h2>)'
        page, count = re.subn(pattern, rf"\1\n      {start}\n      {end}", page, count=1, flags=re.S)
        if count != 1:
            raise SystemExit(f"Missing section: {chapter}")
    pattern = re.compile(rf"({re.escape(start)}).*?({re.escape(end)})", flags=re.S)
    page, count = pattern.subn(lambda m: f"{m.group(1)}\n<div class=\"textbook\">\n{rendered}\n</div>\n      {m.group(2)}", page, count=1)
    if count != 1:
        raise SystemExit(f"Missing render target: {chapter}")

page_path.write_text(page, encoding="utf-8")
print(f"Rendered {len(parts[1::2])} textbook chapters into {page_path.name}")
