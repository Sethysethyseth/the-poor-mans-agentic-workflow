# When the loop drives itself - Level 3, opt-in, reversible

Handing off by hand is the default and the beginner path; nothing in this
repo requires reading this page. This is the mode for when the loop has
got boring: the reviewer session hands queued tasks to the builder itself,
monitors the run, audits the delivery with the **same** per-task ritual,
lands it, and picks up the next one. You keep exactly the judgment
surface - go-aheads, bug reports, one smoke pass per batch, and every
gated command.

**The prerequisite, before anything else: this requires the builder as a
headless CLI.** The reviewer drives it programmatically and cannot type
into an editor window for you. If your builder only runs inside an editor,
Level 3 is not open to you yet - and that is a tooling fact, not a
judgment about your setup.

**The age disclosure, second:** as of 2026-07-16 this mode has **seven
landed tasks** behind it - one pilot task, then a batch of six (four code,
two diagnosis) - against roughly six weeks and 40+ tasks for the manual
loop. It works; it is young. Run the loop by hand first: you cannot steer
a loop you have never driven.

---

## What does NOT change (read this before the mechanics)

- **The command gate.** Merges still wait for your verbatim trigger
  phrase. Tasks carrying migrations or touching production **refuse
  automatic handoff outright** - those stay on your manual track.
- **One writer for git and state.** The reviewer is still the only
  committer and the only state-file writer.
- **The per-task audit.** Every delivery gets the same review the manual
  loop uses; the check command re-runs fresh; one commit per task;
  bisectable history. **The audit does not change because the driver
  did.**
- **Escalation triggers, and the release gate.** A finished batch hands to
  the release review - never back to the loop.

## The two handoff channels

**The backbone: the builder's headless CLI in its own worktree.** The
reviewer runs the builder's CLI non-interactively with the same prompt a
human would paste, inside a dedicated `git worktree` **outside**
cloud-synced folders. The CLI writes files but does not commit - the same
rule governs as in manual mode. Delivery is uncommitted changes plus
`DELIVERY.md` in that worktree, and the reviewer commits from there. The
worktree persists across tasks to amortise dependency installs; **a dirty
worktree at handoff time means a previous delivery was never landed** -
stop and audit, never hand off over it.

**The gated exception: a cloud-agents API.** If your builder offers one,
it can serve as a second channel: the task file must be committed **and
pushed**, and delivery arrives as a pushed branch and PR with the report
in the PR body. The catch that keeps it off by default: it typically
requires usage-based billing - real overage money - which you must
deliberately enable. At $0 it refuses cleanly at handoff time, before any
spend (verified live during the pilot). Enabling it is **your billing
decision, never an agent's routing decision.**

## The fallback ladder (refusals are routine, not incidents)

```
cloud channel, named model    usage-based credit only - refuses cleanly at $0
CLI, named model              the plan's included allowance
CLI, cheap/auto tier          included at no extra cost - the backbone
STOP: page the human          auth broken / every step refused
```

Descend on any quota or payment refusal - a 402 or 429, a quota-message
run failure, an auth or quota CLI exit. Dying mid-task is safe: task files
are self-contained contracts, so a task re-runs from scratch on the next
step down. Every descent is logged in the queue notes, because the audit
needs to know who actually delivered.

**Never silently downgrade a task whose `MODEL:` header was a deliberate
quality call.** In the pilot's second batch, descending to the cheap tier
was a *human* ruling, with expensive-tier audit named as the stated
compensating control.

## The loop tick (one session per batch)

The norm is one reviewer session owning a whole batch, from "run the loop"
to a stop condition. Per tick: poll the in-flight run using scheduled
wake-ups rather than spinning; on a finished delivery, run the audit and
land it - or send it back, and **two send-backs on one task stops the
machine and pages you**; when nothing is in flight, hand off the next
`QUEUED` task whose serialization notes allow it; stop when the queue
empties, the batch completes, an escalation trigger fires, or the ladder
is exhausted.

What batches to batch scale is **your attention** - progress messages, one
smoke checklist at the end, one release gate. The machine's checkpoints
never batch.

## The honest catches

- **Young receipts** - the disclosure at the top. The manual loop's
  numbers are measured over weeks; this mode's are days old.
- **The headless-CLI hang.** Print modes of agent CLIs have publicly
  reported hang bugs (as of July 2026). The discipline: always a hard
  timeout, always as a background task; on a hang, kill it, retry once,
  then descend or escalate. **Never wait unbounded.**
- **A silently sticky model flag.** One CLI remembers the last model used;
  a flagless handoff once inherited an exhausted named model and
  quota-refused while the cheap tier worked fine. Pass the model flag
  explicitly, every time.
- **Named-model handoffs share the plan's pool with your own editor
  usage.** The allowance gating the CLI is the same one your interactive
  work drains - a refusal mid-cycle is normal, and it is the ladder's job,
  not an incident.
- **The reviewer's windows pay for the loop.** Polling, audits and state
  upkeep spend the expensive seat's tokens. Automatic handoff shifts the
  bookkeeping tax from your time to those tokens; it does not erase it
  ([economics](economics.md)).
- **This is Level 3, so it assumes Level 2's second seat.** A one-seat
  automatic variant has zero receipts here and does not ship.

## Switching back (the paragraph that makes this safe to try)

Stop handing off automatically and point the builder at the next task by
hand - mid-batch if you like, per-task if you like. No regeneration,
nothing to uninstall: **both drivers execute the same task files
verbatim**, so your queue, task files, state file and reports need zero
edits in either direction. Switching up again is one manifest answer
re-pasted.

The manual path is always live underneath the automatic one. The pilot
proved that by accident, mid-batch, when a different builder delivered a
task from the same file with zero repo changes.
