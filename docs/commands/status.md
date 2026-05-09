# aigit status

Display the current working-tree status in a clean, readable format.

---

## Usage

```bash
aigit status
```

---

## What It Does

Runs `git status` internally and formats the output into labelled sections grouped by change type. Unlike raw `git status`, the output is minimal and immediately scannable.

| Step | Action | Git Equivalent |
|------|--------|----------------|
| 1 | Verify you are inside a Git repository | `git rev-parse --is-inside-work-tree` |
| 2 | Read the working-tree status | `git status --short` |
| 3 | Print files grouped by change type | — |

---

## Options

| Flag | Description |
|------|-------------|
| `-h, --help` | Show help for this command |

---

## Example Output

```bash
aigit status
```

```

Modified:
  ~ src/auth.ts
  ~ src/middleware/logger.ts

Added:
  + src/user.ts
  + src/user.test.ts

Deleted:
  - temp.js

Renamed:
  -> config/old-name.json -> config/settings.json

Untracked:
  ? notes.txt

```

---

## File Symbol Reference

| Symbol | Color | Meaning |
|--------|-------|---------|
| `~` | Yellow | File was modified |
| `+` | Green | File was added or created |
| `-` | Red | File was deleted |
| `->` | Blue | File was renamed |
| `?` | Magenta | File is untracked (new, not staged) |

---

## Clean Working Tree

If there are no changes:

```bash
aigit status
```

```
i Working tree clean — nothing to show.
```

---

## Error Handling

| Situation | Behaviour |
|-----------|-----------|
| Not inside a Git repo | Prints error and exits with code 1 |
| Working tree is clean | Prints info message and exits cleanly |
