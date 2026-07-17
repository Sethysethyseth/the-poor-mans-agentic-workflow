# Dispatch ritual - autonomous driving mode (template)

> Generated ONLY when your setup manifest's driving-mode answer (D1) is
> `autonomous`. This is the ritual the RESIDENT planner-seat session
> loads and follows to dispatch task blocks to the executor itself - the
> file that replaces you as the message bus. In the worked example it
> ships as a loadable ritual for the resident seat (a Claude Code skill);
> as plain markdown it works anywhere the resident can read a file.
>
> Template notes, deleted at generation: this is the ONE generated file
> allowed to name the executor concretely - the CLI invocation IS the
> pointer the human used to be (the stated carve-out to the
> roles-not-tools rule). `<angle-bracket>` placeholders fill from the
> manifest's Section 0 executor answers. Changing executors later
> regenerates THIS file only; blocks, queue, state files, and delivery
> reports need zero edits - that's the testable form of the
> level-mobility claim, extended to driving modes.

---

## What this ritual is NOT allowed to touch (read first, every time)

- **The command gate never dispatches itself.** A block that carries a
  migration or touches production REFUSES autonomous dispatch - those
  are the human's manual track, full stop.
- **Release merges stay behind the human's trigger phrase.** Wave
  completion hands to the frontier review gate, never back to this
  loop.
- **Two bounces on one unit stops the machine** - update the queue
  notes and page the human. Never a third dispatch without new human
  input.
- **The audit ritual does not change because the dispatcher did.**
  Every delivery gets the same per-unit review the manual relay uses
  (`checklists/reviewer-checklist.md`), lanes re-run fresh, one commit
  per unit.

## Preconditions (all must hold before any dispatch)

1. The block is `QUEUED` in `<task-queue-dir>/QUEUE.md` - never DRAFT
   (a DRAFT block is missing a decision only a human or the frontier
   tier can make; the loop correctly leaves it alone).
2. Its serialization notes allow it: nothing in flight that shares any
   FILES TO TOUCH entry.
3. The lane worktree is CLEAN (`git status` in it). Dirty means a prior
   delivery was never landed - stop and audit that first, never
   dispatch over it.
4. The block's check lanes are runnable in the lane: no dispatch
   channel can run lanes needing env secrets or a database. A block
   that genuinely needs them is flagged for hand relay in the block
   itself.
5. The block's MODEL header routes the rung: cheap/auto tier -> the
   free CLI rung; named tier -> plan credit. Never silently downgrade a
   block whose MODEL header was a deliberate quality call - if the
   ladder forces a descent, note it in the queue entry.

## The dispatch (Channel B - headless CLI in the lane worktree, the backbone)

The lane worktree persists across units (it amortizes dependency
installs) and lives OUTSIDE cloud-synced folders:

```
git worktree add <lane-worktree-path> -b <executor-branch-prefix>/<unit> <wave-branch>   # first time only
git -C <lane-worktree-path> checkout -B <executor-branch-prefix>/<unit> <wave-branch>    # per dispatch
```

Then, from the lane worktree:

```
<executor-cli> -p "Read <task-queue-dir>/<unit>.md and execute it
exactly. It is the complete task; do not ask for the task in chat.
Write the delivery report to DELIVERY.md at the repo root. Make NO git
operations." --model <per the block's MODEL header> <headless-flags>
```

Rules of the invocation, learned the hard way (receipts in the source
project, July 2026):

- **ALWAYS pass the model flag explicitly.** The worked example's CLI
  silently remembers the last-used model; a flagless run once inherited
  an exhausted named model and quota-refused while the free tier worked
  fine.
- **Always run under a hard timeout, as a background task.** Headless
  print modes have publicly reported hang bugs. On hang: kill, retry
  once, then descend the ladder or escalate. Never wait unbounded.
- The executor writes files but does NOT commit - the block's standing
  footer governs in autonomous mode exactly as in manual.

Immediately after dispatch, BEFORE the run finishes:

- Flip the unit `DISPATCHED` in `QUEUE.md`, noting channel, rung, and
  model - the audit needs to know who actually delivered (the
  executor-substitution receipt is why).
- Tell the human: "the executor is working on `<unit>` (n/N)" - wave
  progress messaging is part of the ritual, not a courtesy. N is the
  wave's block count in the queue index; renumber once, out loud, if
  the wave changes size.
- Optional pattern: any file-watcher pointed at the lane worktree gives
  the human zero-token visual confirmation the executor started
  writing.

*(Cloud-agents channel, the gated exception: if your executor offers a
cloud/background-agent API, it can serve as a second channel - the block
must be committed AND pushed first, and the delivery arrives as a pushed
branch + PR with the report in the PR body. It typically requires
usage-based billing the owner must deliberately enable; at $0 it refuses
cleanly at dispatch time. Enabling it is the OWNER'S billing decision,
never made from an agent seat. Skip this channel entirely unless that
decision has been made.)*

## The fallback ladder (quota refusals are routine, not incidents)

```
cloud channel, named model    (usage-based credit ONLY - refuses cleanly at $0)
CLI, named model              (plan included credit)
CLI, cheap/auto tier          (included at no extra cost - the backbone rung)
STOP: page the human          (auth broken / all rungs refused)
```

Descend when: a pre-dispatch health check fails; a quota/payment error
(402/429 family); a run terminates with a quota message; the CLI exits
with an auth/quota error. Mid-unit death is safe - blocks are
self-contained contracts, so the unit re-dispatches from scratch on the
next rung. Log every descent in the queue notes.

## The loop tick (one resident session owns the whole wave)

The norm is ONE resident session from "run the relay" to a stop
condition - dispatch -> monitor -> audit-and-land -> dispatch-next.
(A fresh session per unit is the degraded fallback after a crash, not
the design.) Per tick:

1. **In-flight unit?** Poll it (the background task, or the cloud run
   status). Not terminal -> schedule the next wake (minutes, not
   seconds - never spin) and yield.
2. **Terminal delivery?** Run the audit ritual on it, in the mode the
   channel implies (uncommitted changes + DELIVERY.md in the lane; or
   pushed branch + PR body). Fix trivia / bounce / escalate per that
   ritual. A bounce re-dispatches with the findings appended - and two
   bounces on one unit stops the machine.
   After landing: tell the human "n/N - <one-line result>", append the
   unit's smoke items to the work-state file's consolidated checklist.
3. **Nothing in flight, queue has an eligible QUEUED unit?** Run the
   preconditions above; dispatch; flip status.
4. **Stop conditions:** queue empty; wave complete ("N/N complete" +
   hand the human the consolidated smoke checklist and the release
   gate); any escalation trigger; ladder exhausted.

What batches at wave scale is THE HUMAN'S attention - one consolidated
smoke checklist, one release gate per wave. The machine checkpoints
never batch: per-unit audit, one commit per unit, bisectable history.

## What stays yours (the human's touchpoints, unchanged)

Authoring go-aheads. Bug reports. Smoke sign-off on the consolidated
checklist. Every command-gate item. And the switch-back is always live:
stop dispatching and point the executor at the next block by hand -
mid-wave if you like. Both modes execute the same block files verbatim;
there is nothing to uninstall.
