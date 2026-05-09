# aigit pull

Safely pull the latest changes from the remote repository without dealing with messy merge conflicts or complex flags.

---

## Usage

```bash
aigit pull
```

---

## What It Does

When you run `aigit pull`, it executes the following steps:

| Step | Action | Git Equivalent |
|------|--------|----------------|
| 1 | Verify you are inside a Git repository | `git rev-parse --is-inside-work-tree` |
| 2 | Check working tree for uncommitted changes | `git status --short` |
| 3 | Fast-forward pull from origin | `git pull origin <branch> --ff-only` |

---

## Error Handling

| Situation | Behaviour |
|-----------|-----------|
| Not inside a Git repo | Prints error and exits with code 1 |
| Uncommitted changes exist | Prints warning to run `aigit ship` first, then exits safely |
| Merge conflict detected | Fails safely (since it enforces fast-forward only) and prevents broken histories |
