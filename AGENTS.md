# Agent Briefing: jasonsant.dev

## 1. Repository Overview & Purpose
- **Repository**: `webdev0814/jasonsant.dev`
- **Visibility**: `Public`
- **Default Branch**: `main`
- **Last Updated / Pushed**: 2026-09-09
- **Description**: Personal portfolio site for Test_in_Prod, featuring AI automation, developer tools, and web projects.



---

## 2. Tech Stack & Architecture
- **Primary Language / Ecosystem**: HTML, Python, JavaScript
- **Key Directories**: `.github/`, `assets/`, `calendar/`, `scripts/`
- **Notable Top-Level Files**: `AGENTS.md`, `CLAUDE.md`, `CNAME`, `GEMINI.md`, `SECURITY.md`, `effects.js`, `index.html`, `styles.css`

---

## 3. Setup & Execution Commands
### Environment Setup & Installation
```bash
# Review repository files and install dependencies corresponding to the language/runtime.
```

### Running / Starting
```bash
python3 <entrypoint>.py
```

### Testing / Verification
```bash
# Run relevant unit/integration tests (e.g. pytest or npm test)
```

---

## 4. Recent Commit Activity (Where We Left Off)
The most recent commits show the latest development trajectory:
- `[c07c31d]` (2026-09-09) docs: update agent briefing with multi-computer handoff protocol
- `[db2dbfb]` (2026-09-09) docs: update agent briefing with multi-computer handoff protocol
- `[9edca95]` (2026-09-09) docs: update agent briefing with multi-computer handoff protocol
- `[76f4855]` (2026-09-09) docs: update agent briefing with multi-computer handoff protocol
- `[3fd8cd5]` (2026-09-09) docs: update agent briefing with multi-computer handoff protocol
- `[df1ff9a]` (2026-09-09) docs: update agent briefing with multi-computer handoff protocol
- `[6505c85]` (2026-09-09) docs: update agent briefing with multi-computer handoff protocol
- `[f35aa27]` (2026-09-09) docs: update agent briefing with multi-computer handoff protocol
- `[3929eb2]` (2026-09-09) docs: update agent briefing with multi-computer handoff protocol
- `[ac34381]` (2026-09-09) docs: update agent briefing with multi-computer handoff protocol

---

## 5. Current State & Immediate Next Steps
- **Current State**: Project is active under branch `main`.
- **When picking up this repo**:
  1. Inspect the top-level files and recent commits to understand the active feature or bugfix context.
  2. Verify all required credentials and environment variables before running integration scripts.
  3. Ensure all tests and linting pass after making modifications.
  4. Follow the repository conventions and preserve existing architecture patterns.

---

## 6. Multi-Computer Handoff & Git Sync Protocol
- **On Session Start**: Always run `git pull` when opening this repository on any computer to synchronize the latest changes.
- **On Task Completion**: Before ending any agent session, the agent **MUST**:
  1. Update Section 5 (Current State & Next Steps) in this `AGENTS.md` file.
  2. Stage all modifications (`git add .`).
  3. Commit with a concise conventional message (`git commit -m "feat/fix: ..."`).
  4. Push directly to GitHub (`git push`).
- **Secret Hygiene**: NEVER commit plain-text API keys, tokens, or credentials into repository files.
