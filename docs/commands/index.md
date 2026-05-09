# Commands Overview

GitPilot exposes four core commands, each responsible for one stage of the Git workflow.

---

## Command Summary

| Command | Description |
|---------|-------------|
| [`aigitt ship`](./ship.md) | Stage all changes and commit locally |
| [`aigitt push`](./push.md) | Push committed changes to the remote repository |
| [`aigitt branch`](./branch.md) | Switch or create branches interactively |
| [`aigitt status`](./status.md) | Show working-tree status in a clean format |

---

## Workflow

These commands map directly to the developer loop:

```
aigitt status   ->   see what changed
aigitt ship     ->   stage + commit
aigitt push     ->   push to remote
```

Each command is intentionally focused on one job. This makes the tool predictable and easy to compose.

---

## Global Options

These options work on all commands:

| Flag | Description |
|------|-------------|
| `-v, --version` | Print the current version |
| `-h, --help` | Show help for any command |
