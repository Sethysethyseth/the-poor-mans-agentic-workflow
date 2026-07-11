# Task-block template (both scales)

The format the planner emits and the executor consumes. A block is the ONLY
context the executor gets - it must be fully self-contained, because the
executor is dispatched with a single pointer line and no chat history. If a
block needs a decision that isn't made yet, it is DRAFT, not QUEUED.

Two scales, same skeleton:

- **Small scale** - 1-3 files, diff reviewable in under a minute. Use this
  while you're learning the loop, or for any executor you don't yet trust.
- **Unit scale** - one coherent roadmap unit with a testable contract. Use
  this once the review lane and a fast check lane both exist; the safety net
  for the bigger diff is the review, not diff smallness.

Generated copies of this file carry a version stamp in the header (see the
setup manifest); the placeholders in `<angle brackets>` are filled by your
manifest answers at generation time.

---

## The block format

```markdown
# TASK <unit-id>: <one-line title>

STATUS: DRAFT            <!-- the reviewer flips to QUEUED when final -->
MODEL: <frontier | mid | cheap>   <!-- executor model tier for this block -->
MODE: <1-relay | 2-worktree @ <worktree-path> on branch unit/<unit-id>>

CONTEXT:
<1-2 sentences. What this is part of and how it fits the existing codebase.
Reference the spec section if one exists.>

FILES TO TOUCH:
- path/to/file1          (what changes)
- path/or/directory/     (unit scale: directories + a contract allowed,
                          e.g. "new modules under src/lib/, tests under
                          test/lib/")
Do NOT modify anything outside these files.

CHANGE:
<Plain, specific description of what to do. Reference existing patterns and
functions BY NAME so the executor matches the codebase style instead of
inventing one. At unit scale, write the contract - files, named patterns,
observable behavior - not the line-level implementation.>

ACCEPTANCE CRITERIA (machine-checkable):
- <your check lane(s) pass, run from the right directory - e.g.
  `<check-lane-command>` green>
- <concrete input -> output examples for the changed contract - the
  reviewer verifies these, not vibes>
- <anything observable that proves the change: a grep that must hit, a
  command whose output must contain X>

STOP CONDITION (standing footer - keep verbatim in every block):
Stop when the acceptance criteria are met. If a criterion cannot be met,
stop and explain why instead of guessing.
- Before stopping, run every check lane this block allows and write the
  delivery report to DELIVERY.md at the repo root (files touched; verbatim
  check output; each acceptance criterion with the evidence that proved it;
  any deviations from this block, with reasons). Do not commit it.
- Do NOT commit, push, or touch git in any way - leave the working tree
  for review.
- Do NOT edit the work-state file, the agent contract, this task file, or
  anything under the task queue directory - state is the reviewer's job.
- Do NOT add dependencies or refactor unrelated code.
- Do NOT start another task file when done - end your turn.
```

## Why each section earns its place

- **FILES TO TOUCH + "do NOT modify anything outside"** kills the #1 review
  red flag: unexpected files in the diff. The reviewer's scope check becomes
  trivial.
- **Patterns referenced by name** makes the executor match your codebase
  instead of inventing a new style.
- **Machine-checkable ACCEPTANCE CRITERIA** give both the executor and the
  reviewer an objective "done" - review becomes yes/no, not a judgment call,
  and a checklist is a terminating condition (it kills polish spirals).
- **The STOP CONDITION footer is the single most important part of the
  template.** Agents sprawl when not told to stop. Its anti-loop line - stop
  and explain instead of guessing - forbids retrying without new information
  by construction.

## Unit scale: what changes

Four things move when you graduate from small blocks to unit blocks:

1. **FILES TO TOUCH** may name directories plus a contract instead of an
   exhaustive file list.
2. **ACCEPTANCE CRITERIA must be machine-checkable** - your check lane(s)
   green, plus concrete input -> output examples for the unit's public
   contract.
3. **CHANGE goes contract-first:** name the files, the patterns to follow,
   and the observable contract - do NOT write out the line-level
   implementation. The executor makes the implementation choices; the
   acceptance criteria and the review lane protect precision. EXCEPTION:
   judgment-heavy visual/design units, where the design detail IS the spec -
   those stay fully specified.
4. **The delivery report becomes load-bearing** (below) - the reviewer
   audits a claim instead of reconstructing a tree.

Do not use unit scale without BOTH a working review ritual and a check lane
the reviewer can re-run fresh in a couple of minutes.

---

## The delivery report (required on every block)

Before stopping, the executor writes `DELIVERY.md` at the repo root
(gitignored, never committed; one `## <unit-id>` section per block when
batching):

- **Files touched** - exact list; anything outside FILES TO TOUCH flagged
  explicitly with a reason.
- **Check evidence** - verbatim output of every check lane the block allows.
  If the project has no check lane yet, evidence is "show the change
  running": the command run and its before/after output.
- **Acceptance criteria** - each criterion restated with the evidence that
  proved it (test name, grep output, command result). "Done" is not
  evidence.
- **Deviations** - anything implemented differently from the block, with the
  reason. An unreported deviation found in review is an automatic bounce.

End every delivery report with this fixed footer, so the human always knows
the next move (the no-dangling-next-action rule):

```
--- DELIVERY COMPLETE ---
Next action (human): tell the reviewer this unit is awaiting review.
```

What the report buys: the reviewer audits a claim instead of re-deriving
the delivery. The reviewer still re-runs the check lanes fresh - the report
is trusted for narrative, NEVER for green checks. Executors have claimed
passing criteria that didn't pass; a report that doesn't match the tree is
itself the loudest review signal.

---

## Diagnosis-block variant (bugs get a first pass, no code)

For a bug report, the FIRST block dispatched is a diagnosis, not a fix.
Same format, but CHANGE says: reproduce or trace the bug, make NO code
changes, and write to `DELIVERY.md`:

- **Root cause** - file:line, the mechanism, and why it explains the exact
  reported symptom (not just "a" plausible cause).
- **Blast radius** - what else the mechanism touches.
- **Proposed fix** - concrete, smallest-correct.

The reviewer verifies the reasoning (cheap) instead of deriving it
(expensive), then green-lights a fix block - or escalates to the planner on
the standing triggers.

**The direct-fix exception, stated so it doesn't drift:** when diagnosis was
~95% of the work and the fix is trivial, the agent that diagnosed ships the
fix directly - relaying a one-liner costs more than it protects. Everything
where implementation is the bulk of the work goes to the executor, however
small. (Unstated precedents expand; stated ones hold their shape.)

---

## Batching (non-colliding units only)

Two QUEUED blocks whose FILES TO TOUCH don't intersect - including test
files, style files, and barrel/index files - may be dispatched back-to-back
and reviewed in ONE reviewer session: one `DELIVERY.md` section per unit,
one commit per unit (never combined), one work-state update for the batch.
Colliding units stay strictly serialized. If in doubt whether two blocks
collide, they do.

---

## How to get one written

You usually don't write blocks by hand - that's the point. In a planner
session:

> "Turn the next roadmap unit into a task block."

If a block's diff comes back too big to review comfortably, say so:
**"That was too big - split it into two blocks."** Block size is a dial you
own.
