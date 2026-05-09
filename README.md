# ⚡ GitPilot

> **"Cursor for Git workflows."**  
> A local AI-powered Git automation assistant for developers.

---

## The Problem

Every developer repeats these scattered, noisy sequences dozens of times a day:

**1. The "Commit & Push" Chore**
```bash
git add .
git status
git commit -m "fix stuff"
git push
# fatal: The current branch feature/login has no upstream branch.
git push --set-upstream origin feature/login
```

**2. The "Branch Management" Mess**
```bash
git branch -a        # "Wait, what branches do I have?"
git checkout -b new  # "Let me create a new one"
git switch main      # "Let me go back"
# error: Your local changes would be overwritten by checkout...
```

## The Solution

```bash
aigit ship
aigit push
aigit branch
```

Three simple commands for your daily workflow. 
**For everything else? `aigit` works exactly like `git`.** You can completely alias `git` to `aigit` and never look back!

---

## Installation

```bash
npm install -g aigit
```

---

## Commands

### `aigit ship`

The flagship command. Runs the full Git workflow **100% Vim-Free**:

```
✔ Detect git repository
✔ Show changed files (modified / added / deleted)
✔ Stage all changes  (git add .)
✔ Prompt for commit message
✔ Commit changes locally
✔ Changes committed!
```
*(By using a clean, interactive terminal prompt for your commit message, `aigit ship` completely bypasses the dreaded Vim editor. Plus, once your commit is done, it instantly offers to run `aigit push` for you!)*

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

Clean, readable working-tree status with **intelligent next-step routing**:

```bash
aigit status
```

Output:
```
Modified:
  ~ src/auth.ts

Untracked:
  ? notes.txt

? You have uncommitted changes. What would you like to do?
❯ Run `aigit ship` now
  Exit
```
*(If your workspace has changes, it instantly offers to run `aigit ship`. If your workspace is clean but you have local commits, it offers to run `aigit push`. GitPilot guides you to the next logical step automatically!)*

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
$ aigit branch

? Select a branch to switch to:
  master
❯ feature/login
  hotfix/typo
```
*(Use your arrow keys to quickly switch branches, or use `aigit branch <name>` to instantly create and switch to a new one. Plus, it blocks switches when your worktree is messy!)*

### 4. Everything Else
**Before (Switching between custom CLI and Git):**
```bash
git log --oneline
git rebase main
```
**After (100% Git Compatible):**
```bash
aigit log --oneline
aigit rebase main
```
*(GitPilot seamlessly passes any unknown commands directly to standard Git. You can use it as a complete 1:1 drop-in replacement!)*

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
