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
| 2 | Check if remote "origin" exists | `git remote` |
| 2a | If no remote — prompt for URL and add it | `git remote add origin <url>` |
| 3 | Detect the current branch name | `git branch --show-current` |
| 4 | Check whether an upstream is set | `git rev-parse --abbrev-ref --symbolic-full-name @{u}` |
| 5 | Confirm the push with you | — |
| 6a | Push (upstream already set) | `git push` |
| 6b | Push and set upstream (no upstream yet) | `git push --set-upstream origin <branch>` |

---

## Remote Detection

If no `origin` remote is configured (common with brand new repos), GitPilot catches this before attempting a push and prompts you:

```
Warning: No remote "origin" found

Enter GitHub repo URL: https://github.com/your-username/your-repo.git
✔ Remote "origin" added -> https://github.com/your-username/your-repo.git
```

### Accepted URL formats

| Format | Example |
|--------|---------|
| HTTPS | `https://github.com/user/repo.git` |
| SSH | `git@github.com:user/repo.git` |

The URL is validated before the remote is added. Blank or malformed values are rejected and re-prompted.

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

## Error Handling

| Situation | Behaviour |
|-----------|-----------|
| Not inside a Git repo | Prints error and exits with code 1 |
| No commits to push | Git will report the error; GitPilot surfaces it and exits with code 1 |
| Push rejected (e.g. remote has newer commits) | Prints the Git error message and exits with code 1 |
| User cancels at the confirmation prompt | Exits cleanly with code 0 |
