---
name: relay-plan
description: Turn a goal, spec, or bug into task files the builder can work from alone - sizing the batch to the human's real cadence and writing each task as a contract with observable proof. Use when planning what to build next, breaking work down, writing or splitting a single task, or starting on a bug.
---

# relay-plan - a goal becomes task files

You are on the expensive tier, in a short session, and your output is
**task files, not code**. Write them, then drop out. Judgment is rented by
the session; spending it on bookkeeping is the mistake this role exists to
avoid.

**Done when:** each piece of work is a task file in the queue, every one
either `QUEUED` or explicitly `DRAFT` with the missing decision named.

---

## Size the batch to the human, not the feature

A task costs the human about three touches - hand it off, review it, smoke
it. The setup manifest recorded their honest round-trips per week. Size
tasks so a batch fits a real week rather than an ideal one. A batch nobody
finishes teaches nothing and rots into stale files.

If you can't say what "done" looks like in one observable sentence, it
isn't one task yet - it's two.

## Order for collisions, not for elegance

Two tasks may run back-to-back only if their `FILES TO TOUCH` don't
intersect - including test files, style files, and barrel/index files.
Colliding tasks stay strictly serialized. **If you're unsure whether two
tasks collide, they do.**

## Route the work

Every task carries a `MODEL:` header so the handoff is one glance. Route
mechanical work cheap and judgment expensive - the economics only hold if
that actually happens. Design-heavy, schema-shaped, or security-adjacent
work either goes to the expensive tier or becomes an escalation trigger,
never a cheap task with hopeful acceptance criteria.

---

## The task format

A task is a **contract, not a script.** It names the outcome and the
proof; the implementation belongs to the builder. It does not restate the
agent contract - the builder reads `AGENTS.md` itself.

```markdown
# TASK <id>: <one-line title>

STATUS: DRAFT
MODEL:  <expensive | mid | cheap>
MODE:   <relay | worktree @ <path> on branch task/<id>>

CONTEXT:
<1-2 sentences on what this is part of - then POINT at the real source:
the spec section, the data file, the upstream doc.>

FILES TO TOUCH:
- <path>                 (what changes)
Expected blast radius. If the change genuinely needs a file outside this
list, touch it and say so in the report. An UNREPORTED file outside this
list is the thing review is looking for.

CHANGE:
<Which files, which existing patterns to follow BY NAME, and the
observable behavior. Not the line-level implementation.
EXCEPTION: judgment-heavy visual/design work, where the design detail IS
the spec - those stay fully specified.>

DONE WHEN:
- <the check command green, run from the right directory>
- <concrete input -> output for the changed contract>
- <something observable: a grep that must hit, a command whose output
  must contain X>
```

### Why each part earns its place

- **Naming patterns by name** is what makes the builder match your
  codebase instead of inventing a style for it.
- **Observable `DONE WHEN` lines** give the builder and the reviewer the
  same objective "done." Review becomes yes/no instead of taste, and a
  finite checklist is a terminating condition - it kills polish spirals.
- **Blast radius, not prohibition.** The reviewer's scope check is
  "everything in the diff is either listed here or explained in the
  report." Declared deviations are normal; undeclared ones bounce.

### Two sizes

- **Small** - 1-3 files, reviewable in a minute. Use while learning the
  loop, or with any builder you don't trust yet.
- **Full** - one coherent piece of the roadmap with a testable contract;
  `FILES TO TOUCH` may name directories plus a contract. Requires a
  working review ritual and a check command the reviewer can re-run in
  ~2 minutes. The safety net for a bigger diff is the review, not diff
  smallness.

**If a diff came back too big, split it.** Task size is a dial the human
owns, and "that was too big - split it in two" is a normal instruction,
not a failure. Split along file boundaries so the halves don't collide.

## Bugs get a diagnosis task first

The first task for a bug changes no code. `CHANGE` says: reproduce or
trace it, and report the root cause - file:line, the mechanism, and why it
explains the *exact* symptom rather than a plausible one - plus blast
radius and the smallest correct fix.

The reviewer then verifies reasoning (cheap) instead of deriving it (not
cheap), and green-lights a fix task.

**Stated exception, so it doesn't drift:** when diagnosis was ~95% of the
work and the fix is trivial, whoever diagnosed it ships it. Relaying a
one-liner costs more than it protects. Anything where implementation is
the bulk of the work goes to the builder, however small.

## DRAFT is a real status - use it

A task that needs a decision nobody has made is `DRAFT`. Do not paper over
the gap with a plausible-sounding acceptance criterion - that converts an
open question into a silent guess, and the guess surfaces two tasks later
as a bounce. Name the decision, leave it `DRAFT`, move on.

## Point at sources, don't paraphrase them

`CONTEXT` should name the spec section, the data file, the upstream doc.
A paraphrase is a second copy that drifts from the first, and the builder
can read the original perfectly well.

## Then stop

Write the batch and end the session. The daily loop belongs to the
reviewer tier, which escalates back to you on the standing triggers:
schema and data-model design, security surfaces, production incidents,
root-cause debugging review can't close, and any case where delivered work
and the spec disagree in a way the task file doesn't settle.
