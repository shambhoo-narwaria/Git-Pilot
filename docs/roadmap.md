# Roadmap

GitPilot is built in five phases. Each phase builds on a stable foundation before adding more capability.

---

## Phase 1 — Git Workflow Automation (Current)

**Status:** Complete

The core loop. No AI, no cloud. Just solid CLI tooling.

### Commands Delivered

| Command | Description |
|---------|-------------|
| `aigit ship` | Stage all changes and commit locally |
| `aigit push` | Push committed changes to remote |
| `aigit status` | View working-tree changes |

### Key Capabilities

- Detects whether you are inside a Git repository
- Shows changed files grouped by type (modified, added, deleted, renamed, untracked)
- Stages all changes automatically
- Accepts commit message via prompt or `--message` flag
- Detects current branch and upstream
- Sets upstream automatically on first push (`--set-upstream origin <branch>`)
- Confirms push before executing

### Goal

Replace this:

```bash
git add .
git status
git commit -m "message"
git push origin feature/login --set-upstream
```

With this:

```bash
aigit ship
aigit push
```

---

## Phase 2 — Smart Git Automation

**Status:** Planned

Add intelligence without AI. Pattern-based automation.

### Planned Features

#### Auto Commit Type Detection

Inspect changed files and suggest a conventional commit prefix:

| Files changed | Suggested prefix |
|---------------|-----------------|
| `src/auth/*` | `feat(auth):` |
| `*.test.ts` | `test:` |
| `README.md`, `docs/*` | `docs:` |
| Bug-related branch name | `fix:` |

Example output:

```
Suggested: feat(auth): add login validation
Enter commit message (or press Enter to accept):
```

#### Selective File Staging

Instead of always staging everything, let the user pick:

```
Select files to stage:
  [x] src/auth.ts
  [x] src/user.ts
  [ ] temp.txt
```

#### Pre-push Checks

Before pushing, optionally run:

- `npm test`
- `npm run lint`

If any check fails, the push is blocked and the error is shown.

#### Smart Branch Suggestions

```bash
aigit branch
```

Suggests a branch name based on your task description:

```
Describe your change: add user login
Suggested branch: feature/user-login
Create it? Yes
```

---

## Phase 3 — Local AI Integration

**Status:** Planned

Introduce AI for commit message generation and code review. Uses Ollama so everything stays local — no API keys, no cloud.

### Planned Stack

- **Ollama** — local model runner
- **DeepSeek Coder** / **Qwen Coder** / **CodeLlama** — supported models

### Planned Features

#### AI Commit Messages

Run `git diff --staged`, send it to the local model, and generate a commit message:

```bash
aigit ship --ai
```

```
Generating commit message...
Suggested: feat(auth): implement JWT-based login with refresh token support
Use this message? Yes
```

#### AI PR Review

Analyse the full diff against the base branch and surface:

- Code smells
- Security risks
- Missing edge cases

#### AI Changelog

Generate a release changelog from all commits since the last tag.

#### AI PR Summary

Auto-generate a PR description from the diff for GitHub copy-paste.

---

## Phase 4 — Git Hooks and Team Workflow

**Status:** Planned

Make GitPilot useful for teams, not just individuals.

### Planned Features

#### Git Hook Integration

Auto-run checks before commit or push using `husky`:

- Run tests
- Run AI review
- Run lint

#### Config File

```json
{
  "autoPush": false,
  "runTests": true,
  "aiReview": false,
  "model": "deepseek-coder"
}
```

Stored in `.aigit.json` at the project root.

#### Ignore Rules

A `.aigitignore` file to exclude files from staging:

```
node_modules
dist
coverage
*.log
```

---

## Phase 5 — Advanced DevTool

**Status:** Planned (post-users)

Only built after real usage data exists.

### Possible Directions

- VSCode extension with sidebar panel
- GitHub API integration (create PRs directly from CLI)
- PR comment automation
- Terminal UI dashboard
- Team-level policy enforcement
- Analytics and commit pattern insights

---

## What Will NOT Be Built (Early)

The following will not be added until Phase 5 or later, if at all:

- Authentication / accounts
- Cloud sync
- Databases
- Web dashboard
- Subscriptions
- Vector databases
- Autonomous agents

The product stays local, fast, and focused.
