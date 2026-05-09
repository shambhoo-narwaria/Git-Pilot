# aigitt branch

A unified, interactive command for all branching operations. Replaces `git branch`, `git checkout`, and `git switch`.

---

## Usage

```bash
# Interactive mode
aigitt branch

# Create/Switch mode
aigitt branch [name]
```

---

## What It Does

### Interactive Mode (`aigitt branch`)
If you run it without arguments, it fetches all local branches and opens an interactive menu. Use the up and down arrows to select the branch you want, then hit Enter. It automatically switches you there.

### Fast Create/Switch Mode (`aigitt branch [name]`)
If you provide a branch name:
1. It checks if the branch exists locally.
2. **If it exists**, it instantly checks it out (`git checkout [name]`).
3. **If it does NOT exist**, it creates it and checks it out (`git checkout -b [name]`).

---

## Error Handling

| Situation | Behaviour |
|-----------|-----------|
| Not inside a Git repo | Prints error and exits with code 1 |
| Uncommitted changes exist | Prints warning to use `aigitt ship` and exits cleanly to prevent messy worktrees |
| Only 1 branch exists | Warns you that there's nothing to switch to, and suggests creating one |
