# The protocol - the relay loop in full

The README tells the story; this page is the reference. Everything here
is enforced by files in your repo (the agent contract, the queue, the
state files), not by either tool - which is why levels, executors, and
even vendors can change without a single protocol-file edit.

---

## The loop

```
author  →  dispatch  →  execute  →  review + land  →  (release gate)
planner     you, or      executor     reviewer          planner, once
            the resident              (audits, commits) per wave
```

1. **Author (planner, frontier tier, short sessions).** The planner
   turns the next roadmap unit into a task block:
   [templates/task-block.md](../templates/task-block.md) - files to
   touch, patterns referenced by name, machine-checkable acceptance
   criteria, and the standing stop-condition footer VERBATIM. Blocks are
   fully self-contained; the executor gets zero chat context. A block
   that needs an unmade decision is DRAFT, not QUEUED. The planner
   typically authors a wave of blocks in one session, then drops out.
2. **Dispatch - two drivers, same block.** MANUAL (the default): you
   paste one pointer line at the executor - *"read
   `docs/tasks/<block>.md` and execute it exactly."* AUTONOMOUS (opt-in,
   [Level 4](autonomous.md)): the resident seat dispatches the same
   block file to the executor's headless CLI itself. There is no forked
   flow - both drivers execute the block verbatim.
3. **Execute (executor, cheap tokens).** Implements the block, runs the
   allowed check lanes itself, writes the delivery report
   (`DELIVERY.md`: files touched, verbatim check output, evidence per
   criterion, deviations), and STOPS. It never commits, never pushes,
   never touches state files or anything in the queue directory.
4. **Review + land (reviewer, resident mid-tier).** Audits the report
   against the actual working tree and the block: scope vs FILES TO
   TOUCH, spot-check criteria, verify claimed deviations. Re-runs the
   check lanes FRESH - the report is never trusted for green checks.
   Fixes trivia or bounces. Commits with SHA verification, one commit
   per unit, pushes to the working branch, flips the queue status, and
   rewrites the work-state file including its "Next action (human):"
   line.
5. **Release gate (planner again, once per wave).** Before anything
   merges to the release branch, the frontier tier reviews the
   accumulated diff against the specs. Then the merge itself waits for
   YOUR verbatim trigger phrase - the gate never opens on enthusiasm.

Bugs enter the loop as **diagnosis blocks** first: root cause with
evidence (file:line, mechanism, why it explains the exact symptom) +
proposed fix, NO code changes. The reviewer verifies reasoning - cheap -
instead of deriving it - expensive - then green-lights a fix block.
Stated exception: when diagnosis was ~95% of the work and the fix is
trivial, the diagnosing agent ships it directly.

## Statuses (tracked in the queue index; single writer: the reviewer)

`DRAFT → QUEUED → DISPATCHED → AWAITING-REVIEW → LANDED <sha>`, with
`BOUNCED` as the failure exit: the reviewer updates the BLOCK with what
to fix and re-queues it. The executor never iterates blind against a
silent reviewer - bounce, don't thrash. Full protocol including
authoring rules: [templates/tasks-README.md](../templates/tasks-README.md).

## The two modes (serialization, not driving)

- **Mode 1 - serialized relay (start here).** One working tree, one
  agent active at a time. The two-agents-one-tree accident class cannot
  trigger. At Level 1 this is also the only mode that makes sense.
- **Mode 2 - parallel worktrees (graduate after ~3 clean Mode 1
  units).** The executor works a block in its own `git worktree` while
  the reviewer lands the previous unit. Mandatory: the two blocks are
  file-disjoint (including tests and index files), worktrees live
  outside cloud sync, and only the reviewer merges. Ritual:
  [checklists/worktree-ritual.md](../checklists/worktree-ritual.md).
  If in doubt whether two blocks are disjoint, they aren't - serialize.

These modes are about WHERE work serializes. They are a different axis
from the manual/autonomous **driving modes** - Level 4 runs Mode 1
semantics with a robot bus driver.

## Where the executor runs (a delivery variant, not a third mode)

An executor can also run **in the cloud from your GitHub remote**
(worked example: Cursor's cloud agents). Same block, same contract,
three mechanical differences, learned live: the block must be PUSHED,
not just committed (a cloud executor reads the remote); the delivery
arrives as a pushed branch + PR with the report in the PR body instead
of a local `DELIVERY.md`; and the reviewer audits the PR branch instead
of the local tree. The two-agents-one-tree hazard doesn't apply (own
clone) - but the single-committer rule still does: the reviewer decides
what merges.

## The Level 1 mapping (roles = sessions, not seats)

Every rule above survives at Level 1 with one substitution: a SESSION
plays each role. Frontier-model session = planner; fresh mid-tier
session = executor (fresh is the point - it simulates the cold,
zero-chat-context start a real second seat would have); another session
= reviewer. Single committer (the reviewer session),
executor-never-commits, self-contained blocks, fresh-context review -
all intact. What you lose vs two seats is only the cross-vendor second
opinion and the second meter.

## Escalation (ambiguity has a destination)

Standing triggers that pull the frontier tier in mid-wave, written into
your generated agent contract: data-model/schema design; security
surfaces; production incidents; root-cause debugging the reviewer can't
close; any case where the delivery and the spec disagree in a way the
block doesn't settle. The rule is escalate-don't-guess - the pilot's A6
event (the resident paused dispatch and escalated on a standing trigger,
got a design session) is the receipt that it resolves things thrash
can't.

## How the workflow evolved (v2 → v5, with stated trade-offs)

The transferable part isn't the version history - it's that every
refinement WROTE ITS ACCEPTED DOWNSIDE into the shared contract, so
nobody could silently "fix" the trade-off back out.

- **v2 - two seats, review everything.** The planner deep-reviews every
  unit. Caught a shipped-contract bug on day one; also burned frontier
  tokens on bookkeeping.
- **v3 - the planner seat splits into two roles.** Frontier judgment is
  rented by the session (authoring, release review); a mid-tier resident
  runs the daily loop and escalates on the named triggers. *Stated
  trade-off:* deep review moves from per-unit to the release gate, so a
  contract bug can live on the working branch one gate longer - the
  per-unit audit is the tripwire, the release review is the net.
- **v4 - the executor proves its own work.** Delivery reports turn
  review into auditing a claim; the always-read state file gets CAPPED
  with history in an archive only the planner reads; diagnosis-before-
  fix; blocks go contract-first. *Stated trade-off:* contract-first
  blocks slightly raise the expected bounce rate - the price of moving
  implementation thinking off the frontier seat.
- **v5 - the loop drives itself (opt-in).** The resident dispatches,
  monitors, audits, lands - one session per wave; your attention batches
  to wave scale. *Stated trade-off:* fewer human touchpoints mid-wave
  means a drifting wave is caught at the wave boundary - which is why
  the gate never dispatches itself. Full mechanics:
  [autonomous.md](autonomous.md).

The incidents that forced each change: [scar-tissue.md](scar-tissue.md).
