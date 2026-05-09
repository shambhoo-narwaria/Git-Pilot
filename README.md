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
```

One command. Full workflow. Done.

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

### Before GitPilot

```bash
git add .
git status
git commit -m "feat: add login"
```

3 commands. Repetitive noise.

### After GitPilot

```bash
aigit ship
```

1 command. Clean, guided UX.

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
