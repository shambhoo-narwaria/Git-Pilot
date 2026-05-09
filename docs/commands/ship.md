# aigit ship

Stage all working-tree changes and commit them locally.

---

## Usage

```bash
aigit ship [options]
```

---

## What It Does

When you run `aigit ship`, it executes the following steps in order:

| Step | Action | Git Equivalent |
|------|--------|----------------|
| 1 | Verify you are inside a Git repository | `git rev-parse --is-inside-work-tree` |
| 2 | Read and display changed files | `git status --short` |
| 3 | Stage all changes | `git add .` |
| 4 | Prompt for a commit message | — |
| 5 | Commit staged changes | `git commit -m "message"` |

The command stops after the commit. It does **not** push. Use [`aigit push`](./push.md) to push after committing.

---

## Options

| Flag | Type | Description |
|------|------|-------------|
| `-m, --message <msg>` | string | Provide the commit message directly — skips the interactive prompt |
| `-h, --help` | — | Show help for this command |

---

## Examples

### Interactive mode (recommended)

```bash
aigit ship
```

You will see your changed files, then be prompted to enter a commit message:

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  GitPilot  .  ship
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✔ Git repository detected

Modified:
  ~ src/auth.ts

Added:
  + src/user.ts

✔ All changes staged

? Enter commit message: feat(auth): add login validation

✔ Committed: "feat(auth): add login validation"

  Changes committed locally!
```

---

### Inline commit message

```bash
aigit ship -m "fix: correct typo in README"
```

Skips the prompt entirely. Useful for scripting or when you already know the message.

---

## File Change Display

After reading the working tree, `aigit ship` groups changed files by type:

| Symbol | Color | Meaning |
|--------|-------|---------|
| `~` | Yellow | Modified file |
| `+` | Green | Added / newly created file |
| `-` | Red | Deleted file |
| `->` | Blue | Renamed file |
| `?` | Magenta | Untracked file (new, not yet staged) |

---

## Error Handling

| Situation | Behaviour |
|-----------|-----------|
| Not inside a Git repo | Prints error and exits with code 1 |
| Working tree is clean | Prints a warning and exits cleanly (code 0) |
| Empty commit message provided via `-m` | Prints error and exits with code 1 |
| Commit fails (e.g. nothing staged) | Prints the Git error and exits with code 1 |
