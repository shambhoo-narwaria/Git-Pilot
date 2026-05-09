# Roadmap

GitPilot is built in five phases. Each phase builds on a stable foundation before adding more capability.

---

## Phase 1 — Git Workflow Automation (Current)

**Status:** Complete

The core loop. No AI, no cloud. Just solid CLI tooling.

- Detects whether you are inside a Git repository
- Shows changed files grouped by type
- Stages all changes automatically
- Prompts for GitHub remote if it doesn't exist
- Detects current branch and upstream
- Sets upstream automatically on first push
- Confirms push before executing
- Handles branch switching and creation interactively

---

## Phase 2 — Smart Git Automation

**Status:** Planned

Add intelligence without AI. Pattern-based automation.

- Auto Commit Type Detection (`feat(auth): ...`)
- Selective File Staging (Interactive checkbox list)
- Pre-push Checks (`npm test`, `npm run lint`)
- Smart Branch Suggestions (`feature/user-login`)

---

## Phase 3 — Local AI Integration

**Status:** Planned

Introduce AI for commit message generation and code review. Uses Ollama so everything stays local — no API keys, no cloud.

- AI Commit Messages (Sends `git diff` to local model)
- AI PR Review (Analyzes diff for security/smells)
- AI Changelog
- AI PR Summary

---

## Phase 4 — Git Hooks and Team Workflow

**Status:** Planned

Make GitPilot useful for teams, not just individuals.

- Git Hook Integration (husky)
- Config File (`.aigitt.json`)
- Ignore Rules (`.aigittignore`)

---

## Phase 5 — Advanced DevTool

**Status:** Planned (post-users)

Only built after real usage data exists.

- VSCode extension with sidebar panel
- GitHub API integration (create PRs directly from CLI)
- Terminal UI dashboard
