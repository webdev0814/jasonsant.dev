from __future__ import annotations

import html
import pathlib
import re
import sys
import urllib.request


PROFILE_URL = "https://github.com/webdev0814"
OWNER = "webdev0814"
INDEX_PATH = pathlib.Path("index.html")
START_MARKER = "<!-- POSITIONING_PROJECT_LINKS_START -->"
END_MARKER = "<!-- POSITIONING_PROJECT_LINKS_END -->"

SHOWCASE_ITEM_RE = re.compile(
    r'href="/'
    + re.escape(OWNER)
    + r'/([^"/?#]+)"[^>]*class="min-width-0 Link text-bold flex-auto wb-break-all">'
    + r'<span class="repo"\s*>\s*([^<]+?)\s*</span>.*?'
    + r'<p class="pinned-item-desc[^"]*">\s*(.*?)\s*</p>',
    re.DOTALL,
)
TAG_RE = re.compile(r"<[^>]+>")
MULTISPACE_RE = re.compile(r"\s+")


def fetch_text(url: str) -> str:
    request = urllib.request.Request(
        url,
        headers={
            "User-Agent": "Mozilla/5.0 (compatible; jasonsant-dev-sync/1.0)",
            "Accept": "text/html,application/xhtml+xml",
        },
    )
    with urllib.request.urlopen(request, timeout=30) as response:
        return response.read().decode("utf-8")


def clean_text(raw: str) -> str:
    text = TAG_RE.sub("", raw)
    text = html.unescape(text)
    return MULTISPACE_RE.sub(" ", text).strip()


def extract_showcase_repos(profile_html: str) -> list[dict[str, str]]:
    repos: list[dict[str, str]] = []
    seen: set[str] = set()

    for match in SHOWCASE_ITEM_RE.finditer(profile_html):
        slug = match.group(1).strip()
        if slug in seen:
            continue

        name = clean_text(match.group(2))
        description = clean_text(match.group(3))

        repos.append(
            {
                "slug": slug,
                "name": name,
                "url": f"https://github.com/{OWNER}/{slug}",
                "description": description,
            }
        )
        seen.add(slug)

    if not repos:
        raise RuntimeError("No GitHub showcase repositories were found on the profile page.")

    return repos


def build_links_markup(repos: list[dict[str, str]]) -> str:
    lines = []
    for repo in repos:
        title_attr = html.escape(repo["description"], quote=True) if repo["description"] else ""
        title_fragment = f' title="{title_attr}"' if title_attr else ""
        lines.append(
            f'              <span><a href="{html.escape(repo["url"], quote=True)}" target="_blank" rel="noreferrer"{title_fragment}>{html.escape(repo["name"])}</a></span>'
        )
    return "\n".join(lines)


def update_index(index_text: str, links_markup: str) -> str:
    if START_MARKER not in index_text or END_MARKER not in index_text:
        raise RuntimeError("Positioning link markers were not found in index.html.")

    start = index_text.index(START_MARKER) + len(START_MARKER)
    end = index_text.index(END_MARKER)
    replacement = "\n" + links_markup + "\n              "
    return index_text[:start] + replacement + index_text[end:]


def main() -> int:
    if not INDEX_PATH.exists():
        raise FileNotFoundError(f"Expected {INDEX_PATH} in the current directory.")

    profile_html = fetch_text(PROFILE_URL)
    repos = extract_showcase_repos(profile_html)
    links_markup = build_links_markup(repos)

    original = INDEX_PATH.read_text(encoding="utf-8")
    updated = update_index(original, links_markup)

    if updated != original:
        INDEX_PATH.write_text(updated, encoding="utf-8")
        print(f"Updated {INDEX_PATH} with {len(repos)} highlighted GitHub projects.")
    else:
        print("No changes were needed.")

    return 0


if __name__ == "__main__":
    try:
        raise SystemExit(main())
    except Exception as exc:
        print(f"sync failed: {exc}", file=sys.stderr)
        raise
