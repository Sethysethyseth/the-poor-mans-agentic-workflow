# The autonomous relay - Level 4, opt-in, reversible

The manual relay is the default and the beginner path; nothing in this
repo requires reading this page. This is the power mode for when the
loop is boring: the resident reviewer-seat session dispatches queued
blocks to the executor itself, monitors the run, audits the delivery
with the SAME per-unit ritual, lands it, and picks up the next block.
You keep exactly the judgment surface: authoring go-aheads, bug reports,
one consolidated smoke pass per wave, and every gated command.

**The age disclosure, first:** as of 2026-07-16 this mode has SEVEN
landed units behind it - one code pilot unit, then a six-unit wave of
four code and two no-code diagnosis units (seven total = five code +
two diagnosis) - across two waves and one validated pricing probe, vs
~six weeks and 40+ units for the manual relay. It works; it is young.
Drive the manual loop first: you can't steer a loop you've never driven.

---

## What does NOT change (read this before the mechanics)

- **The command gate.** Merges to the release branch still wait for your
  verbatim trigger phrase. Migration-carrying or prod-touching blocks
  REFUSE autonomous dispatch outright - those are your manual track.
- **One writer for git and state.** The reviewer seat is still the only
  committer and the only state-file writer.
- **The per-unit audit ritual.** Every delivery gets the same review the
  manual relay uses; check lanes re-run fresh; one commit per unit;
  bisectable history. The audit does not change because the dispatcher
  did.
- **Escalation triggers, and the release gate.** Wave completion hands
  to the frontier review gate - never back to the loop.

## The two dispatch channels

**The backbone: the executor's headless CLI in a lane worktree.** The
resident runs the executor's CLI non-interactively with the same
dispatch prompt a human would paste, inside a dedicated `git worktree`
OUTSIDE cloud-synced folders. The CLI writes files but does not commit
(the block footer governs, exactly as in manual mode); delivery =
uncommitted changes + `DELIVERY.md` in the lane, and the reviewer
commits from there. The lane persists across units to amortize
dependency installs; a dirty lane at dispatch time means a prior
delivery was never landed - stop and audit, never dispatch over it.

**The gated exception: the executor's cloud-agents API.** If your
executor offers one (the worked example does), it can serve as a second
channel: the block must be committed AND pushed, and delivery arrives as
a pushed branch + PR with the report in the PR body. The catch that
keeps it OFF by default: it typically requires usage-based billing -
real overage money - which the owner must deliberately enable. At $0 it
refuses cleanly at dispatch time, before any spend (verified live in the
pilot's pricing probe). Enabling it is YOUR billing decision, never an
agent's routing decision.

## The fallback ladder (refusals are routine, not incidents)

```
cloud channel, named model    usage-based credit only - refuses cleanly at $0
CLI, named model              the plan's included credit
CLI, cheap/auto tier          included at no extra cost - the backbone
STOP: page the human          auth broken / every step refused
```

Descend on any quota or payment refusal (a 402/429, a quota-message
run failure, an auth/quota CLI exit). Mid-unit death is safe: blocks
are self-contained contracts, so a unit re-dispatches from scratch on
the next step down. Every descent is logged in the queue notes - the
audit needs to know who actually delivered. Never silently downgrade a
block whose `MODEL:` header was a deliberate quality call: in the
pilot's second wave, the descent to the cheap tier was a HUMAN ruling,
with frontier-tier audit named as the stated compensating control.

## The loop tick (one resident session per wave)

The norm is one resident session owning the whole wave, from "run the
relay" to a stop condition. Per tick: poll the in-flight run (scheduled
wakeups, never spinning); on a terminal delivery, run the audit ritual
and land it (or bounce - and TWO bounces on one unit stops the machine
and pages you); when nothing is in flight, dispatch the next QUEUED
block whose serialization notes allow it; stop when the queue is empty,
the wave completes, any escalation trigger fires, or the ladder is
exhausted.

What batches at wave scale is YOUR attention - wave-progress messages
("n/N landed"), one consolidated smoke checklist at wave end, one
release gate. The machine checkpoints never batch.

Generated when your manifest says `autonomous`, and the file the
resident actually loads: the
[dispatch ritual](../templates/dispatch-ritual.md) - preconditions, the
concrete dispatch invocation, the timeout discipline, the ladder, the
hard stops. It is the one generated file that names your executor
concretely, because it IS the pointer line you used to be.

## The honest catches

- **Young receipts** (the disclosure at the top). The manual relay's
  numbers are measured over weeks; this mode's are days old.
- **The headless-CLI hang.** Print modes of executor CLIs have publicly
  reported hang bugs (as of July 2026). The ritual's discipline: always
  a hard timeout, always as a background task; on hang - kill, retry
  once, descend or escalate. Never wait unbounded.
- **A silently sticky model flag.** The worked example's CLI remembers
  the last-used model; a flagless dispatch once inherited an exhausted
  named model and quota-refused while the cheap tier worked fine. The
  ritual passes the model flag explicitly, every time.
- **Named-model dispatches share the plan pool with your own IDE
  usage.** The meter that gates the CLI's named models is the same one
  your interactive use drains - a refusal mid-cycle is normal, and it's
  the ladder's job, not an incident.
- **The resident's windows pay for the loop.** Polling, audits, and
  state upkeep spend planner-seat tokens. Autonomy shifts the
  bookkeeping tax from your time to resident tokens - it does not erase
  it ([economics](economics.md#the-autonomous-cost-profile)).
- **Level 4 requires a paid executor plan.** As of 2026-07-18, the free
  Pro trial is removed (staff-confirmed 2026-07-03), and autonomous mode
  is documented for the full two-seat stack (Levels 3→4) only. A
  solo-seat autonomous variant has zero receipts and does not ship.

## Switching back (the paragraph that makes this safe to try)

Stop dispatching and point the executor at the next block by hand -
mid-wave if you like, per-unit if you like. No regeneration, nothing to
uninstall: both driving modes execute the same block files verbatim, so
your queue, blocks, state files, and delivery reports need zero edits in
either direction. Switching UP again is one manifest answer re-pasted.
The manual path is always live underneath the autonomous one - the
pilot proved that by accident, mid-wave, when a different executor
delivered a unit from the same block file with zero repo changes.
