export interface GitStatus {
  modified: string[];
  added: string[];
  deleted: string[];
  renamed: string[];
  untracked: string[];
  hasChanges: boolean;
  ahead: number;
}

export interface BranchInfo {
  current: string;
  hasUpstream: boolean;
  upstream?: string;
}

export interface ShipOptions {
  message?: string;
}
