from __future__ import annotations

import html
import json
import pathlib
import sys
import urllib.error
import urllib.request


OWNER = "webdev0814"
INDEX_PATH = pathlib.Path("index.html")
START_MARKER = "<!-- POSITIONING_PROJECT_LINKS_START -->"
END_MARKER = "<!-- POSITIONING_PROJECT_LINKS_END -->"
MAX_PROJECTS = 6

# Desired flagships first; supporting repositories fill open positions until
# the two sanitized MCP references are published.
TARGET_REPOS = [
    "mcp-microsoft-graph-reference",
    "mcp-jira-governed-actions",
    "browser-llm-debate-orchestrator",
    "stakeholder-outreach-draft-generator",
    "agent-prompt-context-compression",
    "agent-vps-security-hardening",
    "single-vm-agent-consolidation",
    "openclaw-to-hermes-orchestrator-migration",
]

SHOWCASE_URLS = [
    f"https://github.com/{OWNER}/browser-llm-debate-orchestrator",
    f"https://github.com/{OWNER}/stakeholder-outreach-draft-generator",
    f"https://github.com/{OWNER}/agent-prompt-context-compression",
    f"https://github.com/{OWNER}/agent-vps-security-hardening",
    f"https://github.com/{OWNER}/single-vm-agent-consolidation",
    f"https://github.com/{OWNER}/openclaw-to-hermes-orchestrator-migration",
]


def find_marker_block(index_text: str) -> tuple[int, int, str]:
    start_marker_at = index_text.find(START_MARKER)
    if start_marker_at == -1:
        raise RuntimeError("Positioning link start marker was not found in index.html.")

    content_start = start_marker_at + len(START_MARKER)
    content_end = index_text.find(END_MARKER, content_start)
    if content_end == -1:
        raise RuntimeError("Positioning link end marker was not found in index.html.")

    return content_start, content_end, index_text[content_start:content_end]


def contains_case_study_cards(block: str) -> bool:
    return (
        "<article" in block
        or 'class="case-study"' in block
        or 'class="case-flow"' in block
        or 'class="case-count"' in block
    )


def verify_showcase_urls(block: str) -> None:
    missing_urls = [url for url in SHOWCASE_URLS if url not in block]
    for url in missing_urls:
        print(
            f"warning: protected case-study showcase is missing {url}",
            file=sys.stderr,
        )


def fetch_repo(slug: str) -> dict[str, str] | None:
    request = urllib.request.Request(
        f"https://api.github.com/repos/{OWNER}/{slug}",
        headers={
            "User-Agent": "Mozilla/5.0 (compatible; jason-agentic-sync/2.0)",
            "Accept": "application/vnd.github+json",
        },
    )
    try:
        with urllib.request.urlopen(request, timeout=30) as response:
            data = json.loads(response.read().decode("utf-8"))
    except urllib.error.HTTPError as exc:
        if exc.code == 404:
            return None
        raise

    if data.get("private") or data.get("archived"):
        return None

    return {
        "name": data.get("name") or slug,
        "url": data.get("html_url") or f"https://github.com/{OWNER}/{slug}",
        "description": data.get("description") or "",
    }


def build_links_markup(repos: list[dict[str, str]], newline: str) -> str:
    lines = []
    for repo in repos:
        title = html.escape(repo["description"], quote=True)
        title_fragment = f' title="{title}"' if title else ""
        lines.append(
            f'              <span><a href="{html.escape(repo["url"], quote=True)}" '
            f'target="_blank" rel="noreferrer"{title_fragment}>'
            f'{html.escape(repo["name"])}</a></span>'
        )
    return newline.join(lines)


def populate_empty_block(index_text: str, links_markup: str, newline: str) -> str:
    content_start, content_end, block = find_marker_block(index_text)
    if block.strip():
        raise RuntimeError(
            "Refusing to replace a non-empty positioning showcase block."
        )

    replacement = newline + links_markup + newline + "              "
    return index_text[:content_start] + replacement + index_text[content_end:]


def main() -> int:
    original_bytes = INDEX_PATH.read_bytes()
    original = original_bytes.decode("utf-8")
    _, _, block = find_marker_block(original)

    # Any authored content between the markers is protected. In particular,
    # case-study cards are verified locally and returned byte-identical without
    # making GitHub API requests or writing index.html.
    if block.strip():
        if contains_case_study_cards(block):
            verify_showcase_urls(block)
            print("Protected case-study showcase detected; no changes were made.")
        else:
            print(
                "Protected non-empty positioning showcase detected; "
                "no changes were made."
            )
        return 0

    repos = []
    for slug in TARGET_REPOS:
        repo = fetch_repo(slug)
        if repo:
            repos.append(repo)
        if len(repos) == MAX_PROJECTS:
            break

    if not repos:
        raise RuntimeError("No curated public repositories are currently available.")

    newline = "\r\n" if "\r\n" in original else "\n"
    updated = populate_empty_block(
        original,
        build_links_markup(repos, newline),
        newline,
    )

    if updated != original:
        INDEX_PATH.write_bytes(updated.encode("utf-8"))
        print(f"Updated {INDEX_PATH} with {len(repos)} curated GitHub projects.")
    else:
        print("No changes were needed.")

    return 0


if __name__ == "__main__":
    try:
        raise SystemExit(main())
    except Exception as exc:
        print(f"sync failed: {exc}", file=sys.stderr)
        raise
