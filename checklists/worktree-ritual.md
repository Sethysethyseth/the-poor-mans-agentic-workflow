# The worktree ritual - Mode 2 parallel isolation

Mode 2 lets the builder build task N+1 in its own checkout while the
reviewer lands task N. It is a graduation, not a default: run ~3 clean
serialized (Mode 1) tasks first. The pilot's messiest session on record
is the one that ran parallel work in ONE tree - this ritual exists so
that never recurs.

**Preconditions, all four, every time:**

1. The two task files are **file-disjoint** - including tests, index/barrel
   files, lockfiles, and shared config. If in doubt whether two task files
   are disjoint, they aren't: serialize.
2. The worktree parent directory lives **OUTSIDE cloud-synced folders**
   (OneDrive/Dropbox/Drive) - sync causes file-lock hangs and stale
   reads ([the scar](../docs/scar-tissue.md#cloud-synced-folders-eat-repos)).
3. Only the reviewer merges. The worktree gives the builder its own
   tree, not its own git authority.
4. The task file's MODE line names the worktree path and branch, so the
   builder knows where it lives.

## Create (before dispatching the task file)

```bash
mkdir -p <worktrees-parent>          # e.g. ~/dev/worktrees - outside sync
git worktree add <worktrees-parent>/<task-id> -b task/<task-id> <base-branch>
```

Open the builder at that path. Dependency installs are NOT shared with
the main checkout - run them inside the worktree, from the existing
lockfiles (an install from a lockfile is reproduction, not a new
dependency; adding a package stays gated).

## While it runs

The reviewer works the MAIN checkout (landing the previous task)
untouched. Nobody edits across the boundary - the disjointness
precondition is what makes the eventual merge trivial.

## Review + land (reviewer, from the main checkout)

```bash
git diff <base-branch>..task/<task-id> --stat
git diff <base-branch>..task/<task-id>
```

Run the full review from [`relay-review`](../skills/relay-review/SKILL.md) against the
worktree's delivery. Small fixes: edit IN THE WORKTREE, commit there on
`task/<task-id>` (SHA-verify). Then:

```bash
git checkout <base-branch>
git merge --ff-only task/<task-id>
git log -1 --oneline        # SHA-verify the merge landed
```

`--ff-only` is deliberate: if it refuses, the branches diverged -
usually a disjointness violation. Stop and look; don't force a merge
commit to make the refusal go away.

## Cleanup

```bash
git worktree remove <worktrees-parent>/<task-id>
```

Branch deletion is a gated (ask-first) op in every configuration -
merged `task/` branches can simply accumulate; deleting them is
hygiene, not required.
