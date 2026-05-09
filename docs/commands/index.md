# Commands Overview

GitPilot exposes three commands, each responsible for one stage of the Git workflow.

---

## Command Summary

| Command | Description |
|---------|-------------|
| [`aigit ship`](./ship.md) | Stage all changes and commit locally |
| [`aigit push`](./push.md) | Push committed changes to the remote repository |
| [`aigit status`](./status.md) | Show working-tree status in a clean format |

---

## Workflow

The three commands map directly to the developer loop:

```
aigit status   ->   see what changed
aigit ship     ->   stage + commit
aigit push     ->   push to remote
```

Each command is intentionally focused on one job. This makes the tool predictable and easy to compose.

---

## Global Options

These options work on all commands:

| Flag | Description |
|------|-------------|
| `-v, --version` | Print the current version |
| `-h, --help` | Show help for any command |
