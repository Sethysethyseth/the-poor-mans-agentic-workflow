# The protocol - the loop in full

The README tells the story; this page is the reference. Everything here is
enforced by files in your repo - the agent contract, the queue, the state
file - not by any tool. That is why levels, agents, and even vendors can
change without editing a single protocol file.

---

## The loop

```
author  →  hand off  →  build  →  check + land  →  (release gate)
planner    you, or      builder   reviewer          planner, once
           the loop               (audits, commits)  per batch
```

1. **Author (planner, expensive tier, short sessions).** The planner turns
   the next piece of work into a task file - format in
   [`core/BLOCK.md`](../core/BLOCK.md): files to touch, patterns
   referenced by name, machine-checkable acceptance criteria. Task files
   are self-contained; the builder gets zero chat context. A task needing
   an unmade decision is `DRAFT`, not `QUEUED`. The planner typically
   writes a batch in one session, then drops out. Skill:
   [`relay-plan`](../skills/relay-plan/SKILL.md).
2. **Hand off - two drivers, same file.** MANUAL (the default): you paste
   one pointer line at the builder - *"read `docs/tasks/<task>.md` and
   execute it."* AUTOMATIC (opt-in, [Level 3](autonomous.md)): the
   reviewer hands the same file to the builder's headless CLI itself.
   There is no forked flow; both drivers execute the file verbatim.
3. **Build (builder, cheap tokens).** Implements the task, runs the check
   command itself, writes the delivery report (`DELIVERY.md`: files
   touched, verbatim check output, evidence per criterion, deviations),
   and STOPS. It never commits, never pushes, never touches state files or
   anything in the queue. Skill:
   [`relay-execute`](../skills/relay-execute/SKILL.md).
4. **Check + land (reviewer).** Audits the report against the actual
   working tree and the task file: scope vs `FILES TO TOUCH`, spot-check
   criteria, verify declared deviations. Re-runs the check command
   **fresh** - the report is never trusted for green checks. Fixes trivia
   or sends it back. Commits with SHA verification, one commit per task,
   pushes, flips the queue status, and rewrites the state file including
   its `Next action (human):` line. Skill:
   [`relay-review`](../skills/relay-review/SKILL.md).
5. **Release gate (expensive tier, once per batch).** Before anything
   merges, the accumulated diff is reviewed against the specs. Then the
   merge waits for YOUR verbatim trigger phrase - the gate never opens on
   enthusiasm.

Bugs enter as **diagnosis tasks** first: root cause with evidence
(file:line, the mechanism, why it explains the *exact* symptom) plus a
proposed fix, and no code changes. The reviewer then verifies reasoning -
cheap - instead of deriving it - not cheap - and green-lights a fix task.
Stated exception: when diagnosis was ~95% of the work and the fix is
trivial, whoever diagnosed it ships it.

## Statuses (tracked in the queue; single writer: the reviewer)

`DRAFT → QUEUED → HANDED OFF → AWAITING REVIEW → LANDED <sha>`, with
`BOUNCED` as the failure exit: the reviewer updates the **task file** with
what to fix and re-queues it. The builder never iterates blind against a
silent reviewer - send it back, don't thrash.

## The two modes (about serialization, not about driving)

- **Mode 1 - serialized (start here).** One working tree, one agent active
  at a time. The two-agents-one-tree accident class cannot trigger. At
  Level 1 this is the only mode that makes sense.
- **Mode 2 - parallel worktrees (graduate after ~3 clean Mode 1 tasks).**
  The builder works in its own `git worktree` while the reviewer lands the
  previous task. Mandatory: the two tasks are file-disjoint (including
  tests and index files), worktrees live outside cloud sync, and only the
  reviewer merges. Ritual:
  [`checklists/worktree-ritual.md`](../checklists/worktree-ritual.md).
  **If you are unsure whether two tasks are disjoint, they aren't** -
  serialize.

These modes are about *where work serializes*. That is a different axis
from manual vs automatic handoff - Level 3 runs Mode 1 semantics with a
robot carrying the messages.

## Where the builder runs

**In an editor** - you paste the handoff yourself. This is all Level 2
needs.

**As a headless CLI** - a terminal command, scriptable, able to run
unattended. **Level 3 requires this form**, because the reviewer drives
the builder programmatically and cannot type into a window for you.

**In the cloud from your GitHub remote** (worked example: Cursor's cloud
agents) - same task file, same contract, three mechanical differences
learned live: the task file must be **pushed**, not just committed,
because a cloud builder reads the remote; the delivery arrives as a pushed
branch and PR with the report in the PR body rather than a local
`DELIVERY.md`; and the reviewer audits the PR branch instead of the local
tree. The two-agents-one-tree hazard doesn't apply - it has its own clone -
but the single-committer rule still does.

## The Level 1 mapping (roles are sessions, not seats)

Every rule above survives at Level 1 with one substitution: a **session**
plays each role. One session plans, a **fresh** session builds - fresh is
the point, it simulates the cold zero-context start a real second agent
would have - and another session reviews. Single committer,
builder-never-commits, self-contained task files, fresh-context review:
all intact. What you lose against two seats is the second meter and the
cross-vendor second opinion, nothing else.

## Escalation (ambiguity has a destination)

Standing triggers that pull the expensive tier in mid-batch, written into
your generated agent contract: data-model and schema design; security
surfaces; production incidents; root-cause debugging the reviewer can't
close; and any case where delivered work and the spec disagree in a way
the task file doesn't settle.

The rule is **escalate, don't guess.** The pilot's receipt for it: the
reviewer hit a real ambiguity, paused handing off work, and escalated on a
standing trigger - which resolved in one design session what guessing
would have thrashed on.

## Why it looks like this

None of it was designed on a whiteboard. Every refinement **wrote its
accepted downside into the contract**, so nobody could quietly optimise
the trade-off back out later:

- **Reviewing every task** caught a broken contract on day one - and
  burned the expensive seat on bookkeeping. So deep review moved to the
  release gate and a cheaper model runs the daily loop. *Accepted
  downside:* a contract bug can now live one gate longer. The per-task
  audit is the tripwire; the release review is the net.
- **The builder proves its own work.** Delivery reports turn review into
  auditing a claim rather than reconstructing a tree; the state file is
  capped; bugs get diagnosis before fix; task files became contracts
  rather than scripts. *Accepted downside:* contract-shaped tasks get sent
  back slightly more often - the price of moving implementation thinking
  off the expensive seat.
- **The loop drives itself, opt-in.** The reviewer hands off, monitors,
  audits and lands - one session per batch, attention batched to batch
  scale. *Accepted downside:* a drifting batch is caught at the batch
  boundary rather than mid-task, which is exactly why the gate never
  dispatches itself. Mechanics: [autonomous.md](autonomous.md).
- **Rules stopped being copy-pasted into every task** and became skills
  that load when their moment arrives. *Accepted downside:* the builder
  must be an agent that can read your repo. A plain chat window can still
  install the workflow and explain it, but it can no longer run the daily
  loop.

The incidents that forced each change: [scar-tissue.md](scar-tissue.md).
