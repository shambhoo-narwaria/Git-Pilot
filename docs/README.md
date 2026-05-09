# GitPilot Documentation

Welcome to the GitPilot documentation. GitPilot is a local Git workflow automation CLI built for developers who want to stop repeating themselves.

---

## Table of Contents

| Document | Description |
|----------|-------------|
| [Commands](./commands/README.md) | All available CLI commands |
| [ship](./commands/ship.md) | Stage and commit changes |
| [push](./commands/push.md) | Push commits to remote |
| [status](./commands/status.md) | View working-tree status |
| [Architecture](./architecture.md) | Codebase structure and design decisions |
| [Roadmap](./roadmap.md) | Phase-by-phase product plan |

---

## Quick Start

### Install

```bash
npm install -g aigit
```

### Verify

```bash
aigit --version
aigit --help
```

### Typical Workflow

```bash
# 1. See what changed
aigit status

# 2. Stage and commit
aigit ship

# 3. Push to remote
aigit push
```

---

## Design Philosophy

GitPilot is built around one idea:

> Replace repetitive Git sequences with a single, guided command.

The workflow follows the natural developer loop:

```
code  ->  commit  ->  push
```

Each step is a separate command. No hidden side effects. No surprises.
