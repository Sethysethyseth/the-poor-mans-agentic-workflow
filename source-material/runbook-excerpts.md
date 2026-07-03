# RUNBOOK excerpts (source project)

Relevant sections of the source project's `docs/RUNBOOK.md` — the
copy-paste command rituals the workflow leans on. Infrastructure
identifiers replaced with `<placeholders>`. PowerShell-flavored because the
source project runs on Windows (`;` chaining, no `&&` in Windows
PowerShell 5; the workflow itself is shell-agnostic).

---

## Session start (planner seat)

```powershell
git status
git log main -1 --oneline
git branch -vv
git stash list
```

Manual checks (browser):

```
# Hosting dashboard -> staging service -> deployed branch == intended branch
# Hosting dashboard -> staging service -> latest deploy SHA == expected
# Hosting dashboard -> prod service   -> latest deploy SHA == main HEAD
```

Then read `docs/HANDOFF.md` and confirm its TODO list against the above
before starting any unit.

---

## Pre-merge checklist (feature branch -> main)

```
# 1. Executor reports done -> DO NOT trust. Verify commits exist and are pushed:
```

```powershell
git log <branch> --oneline -5
git status
git log origin/<branch> -1 --oneline
```

```
# 2. Point the staging service at <branch>; verify the deploy SHA in the
#    host's event log.
# 3. Smoke test on staging IN THE BROWSER (build/server tests do NOT catch
#    everything - e.g. React Hook dependency-array errors - exercise the
#    changed screens).
# 4. If the unit includes a schema change -> run the DB migration ritual
#    BEFORE merging (DB first, code second; code-ahead-of-DB took down
#    prod login in the source project).
# 5. Merge (manual, ff-only preferred):
```

```powershell
git checkout main
git merge --ff-only <branch>
git push
```

```
# 6. Repoint staging back at main. Verify the redeploy SHA.
# 7. Update docs/HANDOFF.md.
```

---

## Verify a deploy actually shipped

```
# Hosting dashboard -> service -> events -> newest "deploy live" -> commit SHA
```

```powershell
git log main -1 --format="%H %s"
```

```
# SHAs must match. If the host shows an older SHA, the push didn't trigger
# a deploy or the service is tracking the wrong branch.
```

---

## Parallel worktree ritual (task-queue Mode 2)

For running the executor in an isolated checkout while the planner works
the main tree. Protocol + when this is allowed: the task-queue README.
Worktrees live OUTSIDE cloud-synced folders (OneDrive/Dropbox cause
sync-lag and file-lock bugs).

### Create (before dispatching the block)

```powershell
New-Item -ItemType Directory -Force C:\dev\worktrees
git worktree add C:\dev\worktrees\<unit-id> -b unit/<unit-id> <base-branch>
```

```
# Open the executor's editor at C:\dev\worktrees\<unit-id>.
# node_modules are NOT shared - run the package installs inside the
# worktree (from existing lockfiles).
# The task block's MODE line must name this path + branch.
```

### Review + land (planner seat, from the main checkout)

```powershell
git diff <base-branch>..unit/<unit-id> --stat
git diff <base-branch>..unit/<unit-id>
```

```
# Fix-or-bounce. Small fixes: edit IN THE WORKTREE, commit there on
# unit/<unit-id> (SHA-verify). Then merge into the integration branch:
```

```powershell
git checkout <base-branch>
git merge --ff-only unit/<unit-id>
git log -1 --oneline
```

### Cleanup

```powershell
git worktree remove C:\dev\worktrees\<unit-id>
```

```
# Branch deletion is a gated (ask-first) operation in the source project.
# Merged unit branches can also just accumulate; deletion is hygiene, not
# required.
```

---

## Safety invariants (source project's "never violate" list)

- Local `.env` files point at staging or localhost only. Never prod.
- Never paste prod connection strings into local files or ad-hoc CLI.
  Prod SQL runs only in the DB provider's web console.
- Never disable environment-safety guards to make a test pass; new
  DB-connecting scripts call the safety assertion at the top of `main()`.
- All git merge/commit/push and all prod DB operations: manual, owned by
  one designated writer, never the executor seat.
