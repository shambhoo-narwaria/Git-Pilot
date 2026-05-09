export class GitPilotError extends Error {
  constructor(
    message: string,
    public readonly code: string
  ) {
    super(message);
    this.name = 'GitPilotError';
  }
}

export class NotAGitRepoError extends GitPilotError {
  constructor() {
    super('Not inside a Git repository', 'NOT_A_GIT_REPO');
  }
}

export class NoChangesError extends GitPilotError {
  constructor() {
    super('No changes to commit', 'NO_CHANGES');
  }
}

export class EmptyCommitMessageError extends GitPilotError {
  constructor() {
    super('Commit message cannot be empty', 'EMPTY_COMMIT_MESSAGE');
  }
}

export class CommitFailedError extends GitPilotError {
  constructor(detail?: string) {
    super(
      detail ? `Commit failed: ${detail}` : 'Commit failed',
      'COMMIT_FAILED'
    );
  }
}

export class PushFailedError extends GitPilotError {
  constructor(detail?: string) {
    super(
      detail ? `Push failed: ${detail}` : 'Push failed',
      'PUSH_FAILED'
    );
  }
}
