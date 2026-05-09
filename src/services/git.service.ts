import simpleGit, { SimpleGit, StatusResult } from 'simple-git';
import { GitStatus, BranchInfo } from '../types/index.js';
import {
  NotAGitRepoError,
  CommitFailedError,
  PushFailedError,
} from '../utils/errors.js';
import { DEFAULT_REMOTE } from '../constants/index.js';

export class GitService {
  private git: SimpleGit;

  constructor(cwd: string = process.cwd()) {
    this.git = simpleGit(cwd);
  }

  /**
   * Verify that the current directory is inside a Git repository.
   */
  async assertIsRepo(): Promise<void> {
    try {
      const result = await this.git.raw(['rev-parse', '--is-inside-work-tree']);
      if (result.trim() !== 'true') {
        throw new NotAGitRepoError();
      }
    } catch (err: any) {
      throw new NotAGitRepoError();
    }
  }

  /**
   * Get a structured summary of working-tree status.
   */
  async getStatus(): Promise<GitStatus> {
    const status: StatusResult = await this.git.status();

    const modified: string[] = status.modified;
    const added: string[] = [
      ...status.created,
      ...status.staged.filter((f) => !status.modified.includes(f)),
    ];
    const deleted: string[] = status.deleted;
    const renamed: string[] = status.renamed.map((r) => `${r.from} → ${r.to}`);
    const untracked: string[] = status.not_added;

    // Deduplicate added list
    const uniqueAdded = [...new Set(added)];

    const hasChanges =
      modified.length > 0 ||
      uniqueAdded.length > 0 ||
      deleted.length > 0 ||
      renamed.length > 0 ||
      untracked.length > 0;

    return {
      modified,
      added: uniqueAdded,
      deleted,
      renamed,
      untracked,
      hasChanges,
    };
  }

  /**
   * Stage all changes (git add .).
   */
  async stageAll(): Promise<void> {
    await this.git.add('.');
  }

  /**
   * Commit with the provided message.
   */
  async commit(message: string): Promise<void> {
    try {
      await this.git.commit(message);
    } catch (err: any) {
      throw new CommitFailedError(err?.message);
    }
  }

  /**
   * Return current branch name and upstream status.
   */
  async getBranchInfo(): Promise<BranchInfo> {
    const current = (await this.git.raw(['branch', '--show-current'])).trim();

    let hasUpstream = false;
    let upstream: string | undefined;

    try {
      const upstreamRef = (
        await this.git.raw([
          'rev-parse',
          '--abbrev-ref',
          '--symbolic-full-name',
          '@{u}',
        ])
      ).trim();

      hasUpstream = true;
      upstream = upstreamRef;
    } catch {
      hasUpstream = false;
    }

    return { current, hasUpstream, upstream };
  }

  /**
   * Push to origin. Sets upstream automatically if not set.
   */
  async push(branch: BranchInfo): Promise<void> {
    try {
      if (!branch.hasUpstream) {
        await this.git.push([
          '--set-upstream',
          DEFAULT_REMOTE,
          branch.current,
        ]);
      } else {
        await this.git.push();
      }
    } catch (err: any) {
      throw new PushFailedError(err?.message);
    }
  }

  /**
   * Check whether a named remote (e.g. "origin") exists.
   */
  async hasRemote(name: string = DEFAULT_REMOTE): Promise<boolean> {
    try {
      const remotes = await this.git.getRemotes(false);
      return remotes.some((r) => r.name === name);
    } catch {
      return false;
    }
  }

  /**
   * Add a remote with the given name and URL.
   */
  async addRemote(name: string, url: string): Promise<void> {
    await this.git.addRemote(name, url);
  }
}

