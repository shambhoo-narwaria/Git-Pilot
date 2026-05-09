# ⚡ GitPilot

> **"Cursor for Git workflows."**  
> A local AI-powered Git automation assistant for developers.

---

## The Problem

Every developer repeats this sequence dozens of times a day:

```bash
git add .
git status
git commit -m "fix stuff"
git push origin feature/login --set-upstream
```

## The Solution

```bash
aigit ship
aigit push
aigit pull
aigit branch
```

Two simple commands. Full workflow. Done.

---

## Installation

```bash
npm install -g aigit
```

---

## Commands

### `aigit ship`

The flagship command. Runs the full Git workflow:

```
✔ Detect git repository
✔ Show changed files (modified / added / deleted)
✔ Stage all changes  (git add .)
✔ Prompt for commit message
✔ Commit changes locally
✔ Changes committed!
```

**Options:**

| Flag | Description |
|------|-------------|
| `-m, --message <msg>` | Skip the prompt — use this message directly |

**Examples:**

```bash
# Interactive mode
aigit ship

# With inline commit message
aigit ship -m "feat(auth): add login validation"
```

---

### `aigit push`

Push your committed changes to GitHub/remote automatically.

```
✔ Detect git repository
✔ Check if remote exists (prompts to add GitHub URL if missing)
✔ Detect branch and upstream
✔ Push to remote (auto-sets upstream if needed)
```

**Examples:**

```bash
aigit push
```

---

### `aigit pull`

Safely pull the latest changes from the remote repository. It checks for uncommitted changes to prevent messy merge conflicts and attempts a fast-forward pull by default.

**Examples:**

```bash
aigit pull
```

---

### `aigit branch`

A single command to handle everything related to branches.

- **Interactive Switch:** Run without arguments to see a clean list of local branches. Use your arrow keys to select and switch.
- **Instant Create:** Pass a name to instantly create and switch to a new branch.

**Examples:**

```bash
# Interactive selection menu
aigit branch

# Create and switch immediately
aigit branch new-feature
```

---

### `aigit status`

Clean, readable working-tree status:

```bash
aigit status
```

Output:
```
Modified:
  ~ src/auth.ts

Added:
  + src/user.ts

Deleted:
  - temp.js

Untracked:
  ? notes.txt
```

---

## Before vs After

### 1. Shipping Code
**Before (3 commands, repetitive noise):**
```bash
git add .
git status
git commit -m "feat: add login"
```
**After (1 simple command):**
```bash
aigit ship
```

### 2. Pushing Code
**Before (Error-prone, manual upstream tracking):**
```bash
git push
# fatal: The current branch feature has no upstream branch.
git push --set-upstream origin feature
```
**After (1 smart command):**
```bash
aigit push
```
*(Auto-detects branch, auto-sets upstream, stops if up-to-date!)*

### 3. Branching
**Before (Scattered commands):**
```bash
git branch -a        # view branches
git checkout -b new  # create new
git switch main      # switch existing
```
**After (1 interactive command):**
```bash
aigit branch
```
*(Interactive selection menu, instantly creates new branches, and prevents switching with messy worktrees!)*

### 4. Pulling
**Before (Messy merge conflicts):**
```bash
git pull origin main --ff-only
```
**After (1 safe command):**
```bash
aigit pull
```
*(Automatically blocks pulls if you have uncommitted changes to protect your work!)*

---

## Documentation

Looking for more details? Check out the [`docs/`](./docs/index.md) folder:
- [Commands Reference](./docs/commands/index.md)
- [Architecture & Design Decisions](./docs/architecture.md)
- [Detailed Roadmap](./docs/roadmap.md)

---

## Roadmap

| Phase | Status | Description |
|-------|--------|-------------|
| **Phase 1** | Complete | `aigit ship` — full workflow automation |
| **Phase 2** | Planned | Smart commit types, selective staging, pre-push checks |
| **Phase 3** | Planned | Local AI commit messages via Ollama |
| **Phase 4** | Planned | Git hooks, team config, `.aigitignore` |
| **Phase 5** | Planned | VSCode extension, GitHub integration |

---

## Tech Stack

- **Language:** TypeScript
- **CLI framework:** Commander
- **Git integration:** simple-git
- **Prompts:** Inquirer
- **Styling:** Chalk + Ora

---

## Development

```bash
# Clone and install
git clone https://github.com/your-username/gitpilot
cd gitpilot
npm install

# Build
npm run build

# Link locally for testing
npm link
aigit --help
```

---

## License

MIT © GitPilot
