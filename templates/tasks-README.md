# Task queue - the file-dispatch protocol

Drop this file into `docs/tasks/README.md` of your project (the generation
step does this for you). This directory IS the queue: the planner authors
task blocks as files here, you dispatch one to the executor with a single
pointer line, the executor reads the file and executes. `QUEUE.md` is the
index, `_TEMPLATE.md` is the block format (from `task-block.md`).

Why files and not chat: a block in the repo is versioned, self-contained,
re-readable by any seat at any level, and survives every tool swap - the
protocol lives in the files, not in either agent.

---

## The loop

1. **Author (planner session):** writes `docs/tasks/<unit>.md` from
   `_TEMPLATE.md`, adds it to `QUEUE.md` as `QUEUED`. The planner typically
   authors a wave of blocks in one short session, then drops out.
2. **Dispatch (you, one line at the executor):**

   > Read `docs/tasks/<unit>.md` and execute it exactly. It is the complete
   > task; do not ask for the task in chat.

3. **Execute (executor):** implements the block, runs the allowed check
   lanes itself, writes the delivery report to `DELIVERY.md` at the repo
   root, STOPS. The standing footer in every block repeats the hard rules:
   no git, no state files, no scope creep, no editing the task file.
4. **Review + land (reviewer):** audits `DELIVERY.md` against the working
   tree and the block (scope vs FILES TO TOUCH, spot-check 1-2 criteria,
   verify claimed deviations are real and sane), re-runs the check lanes
   fresh (the report is never trusted for green checks), fixes trivia or
   bounces, commits with SHA verification, flips the unit's status in
   `QUEUE.md`, and updates the work-state file - including its
   "Next action (human):" line.

Your whole job is the two pointer lines per unit: the dispatch, and telling
the reviewer "review `<unit>`" when the executor stops.

Bugs enter the queue as DIAGNOSIS blocks first - root cause + evidence +
proposed fix in `DELIVERY.md`, no code changes; the fix block dispatches
after the reviewer verifies the reasoning. Two blocks with fully disjoint
FILES TO TOUCH may run back-to-back before one review session (one commit
per unit). Details for both: `_TEMPLATE.md`.

## Statuses (tracked in QUEUE.md - single writer: the reviewer)

- `DRAFT` - block exists but isn't final; do not dispatch. A block missing
  an unmade decision stays DRAFT.
- `QUEUED` - authored and ready to dispatch.
- `DISPATCHED` - you pointed the executor at it. (You flip this one, or
  tell the reviewer to - it's the only status change the reviewer can't
  observe on its own.)
- `AWAITING-REVIEW` - the executor stopped with a delivery report written.
- `LANDED <sha>` - reviewed and committed.
- `BOUNCED` - review failed; the reviewer updates the BLOCK with what to
  fix and flips it back to QUEUED. The executor never iterates blind
  against a silent reviewer - bounce, don't thrash.

The executor NEVER edits `QUEUE.md`, task files, or anything in this
directory - the same single-writer rule as the work-state file.

## Two modes

**Mode 1 - serialized file relay (start here).** One working tree, one
agent active at a time. No new risk: the two-agents-one-tree accident class
can't trigger because activity is serialized. At Level 1 (one tool, roles
as sessions) this is also the only mode that makes sense.

**Mode 2 - parallel worktrees (graduate after ~3 clean Mode 1 units).**
The executor works in its own `git worktree` while the reviewer lands the
previous unit or works a disjoint one in the main checkout. Requirements,
all mandatory:

- The two active blocks are **file-disjoint** - their FILES TO TOUCH
  sections share nothing, including test files and barrel/index files.
- The executor's block says at the top which worktree path + branch it
  lives in.
- Worktrees live OUTSIDE cloud-synced folders (OneDrive/Dropbox/Drive
  cause sync-lag and file-lock bugs - a documented scar).
- Only the reviewer merges worktree branches (ritual in the workflow
  repo's `checklists/worktree-ritual.md` - copy it into your repo if you
  want it local).
- If in doubt whether two blocks are disjoint, they aren't - serialize.

A warning from the pilot that produced this protocol: the messiest session
on record was the one where three units ran in one working tree against
the serialization rule - six reviewer fixes. The rule is load-bearing.

## Authoring rules (for the planner)

- Use `_TEMPLATE.md` - the standing stop-condition footer must appear
  VERBATIM in every block; it is the single most important line in the
  system.
- Filename: `<unit-id>-<slug>.md`, lowercase.
- The block must be fully self-contained: the executor gets NO chat context
  beyond the dispatch line.
- Declare the executor model tier at the top (`MODEL:`) - frontier tier for
  judgment-heavy units, cheap tier for mechanical ones. This header is
  where the monthly price holds or creeps.
- Don't optimize dispatch mechanics (file read vs paste is token-noise).
  Optimize block size - bigger coherent units amortize the executor's fixed
  context-loading cost - and model tier.
