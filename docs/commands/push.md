# aigit push

Push committed changes from your local branch to the remote repository.

---

## Usage

```bash
aigit push
```

---

## What It Does

When you run `aigit push`, it executes the following steps in order:

| Step | Action | Git Equivalent |
|------|--------|----------------|
| 1 | Verify you are inside a Git repository | `git rev-parse --is-inside-work-tree` |
| 2 | Detect the current branch name | `git branch --show-current` |
| 3 | Check whether an upstream is set | `git rev-parse --abbrev-ref --symbolic-full-name @{u}` |
| 4 | Confirm the push with you | — |
| 5a | Push (upstream already set) | `git push` |
| 5b | Push and set upstream (no upstream yet) | `git push --set-upstream origin <branch>` |

---

## Options

| Flag | Description |
|------|-------------|
| `-h, --help` | Show help for this command |

There are no additional flags. The push target is always `origin`.

---

## Examples

### Standard push

```bash
aigit push
```

Sample output when the branch already has an upstream:

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  GitPilot  .  push
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✔ Git repository detected
✔ Branch: feature/login -> origin/feature/login

  Ready to push feature/login to origin/feature/login
? Continue? Yes

✔ Pushed feature/login to origin/feature/login

  Changes pushed to remote!
```

---

### First push on a new branch

When the branch has no upstream yet, GitPilot sets it automatically:

```
✔ Git repository detected
i Branch "feature/payments" has no upstream — will set automatically

  Ready to push feature/payments to origin/feature/payments (new upstream)
? Continue? Yes

✔ Pushed feature/payments to origin/feature/payments

  Changes pushed to remote!
```

You never need to type `--set-upstream` manually.

---

### Cancelling a push

If you answer `No` at the confirmation prompt:

```
? Continue? No
Warning: Push cancelled.
```

The command exits cleanly with code 0. Nothing is pushed.

---

## Upstream Detection

GitPilot runs this internally to detect the upstream:

```bash
git rev-parse --abbrev-ref --symbolic-full-name @{u}
```

- If it **succeeds** — the branch already tracks a remote branch. GitPilot runs `git push`.
- If it **fails** — no upstream is set. GitPilot runs `git push --set-upstream origin <current-branch>` automatically.

This is the "magic moment" that removes the most common Git annoyance for developers working on new branches.

---

## Error Handling

| Situation | Behaviour |
|-----------|-----------|
| Not inside a Git repo | Prints error and exits with code 1 |
| No commits to push | Git will report the error; GitPilot surfaces it and exits with code 1 |
| Push rejected (e.g. remote has newer commits) | Prints the Git error message and exits with code 1 |
| User cancels at the confirmation prompt | Exits cleanly with code 0 |

---

## Typical Workflow

```bash
# 1. Make your changes in your editor

# 2. Check what changed
aigit status

# 3. Stage and commit
aigit ship

# 4. Push to remote
aigit push
```
