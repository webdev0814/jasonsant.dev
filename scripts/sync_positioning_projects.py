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


def build_links_markup(repos: list[dict[str, str]]) -> str:
    lines = []
    for repo in repos:
        title = html.escape(repo["description"], quote=True)
        title_fragment = f' title="{title}"' if title else ""
        lines.append(
            f'              <span><a href="{html.escape(repo["url"], quote=True)}" '
            f'target="_blank" rel="noreferrer"{title_fragment}>'
            f'{html.escape(repo["name"])}</a></span>'
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
    repos = []
    for slug in TARGET_REPOS:
        repo = fetch_repo(slug)
        if repo:
            repos.append(repo)
        if len(repos) == MAX_PROJECTS:
            break

    if not repos:
        raise RuntimeError("No curated public repositories are currently available.")

    original = INDEX_PATH.read_text(encoding="utf-8")
    updated = update_index(original, build_links_markup(repos))

    if updated != original:
        INDEX_PATH.write_text(updated, encoding="utf-8")
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
