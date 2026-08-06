---
name: relay-block
description: Author, split, or re-scope a single task block - the contract the executor works against. Use when writing one block, when a diff came back too big to review, or when a bug needs a diagnosis pass.
---

# relay-block - author one block

A block is a contract, not a script. It names the outcome and the proof;
the implementation belongs to the executor. It does not restate the agent
contract - the executor reads `AGENTS.md` itself.

**Done when:** the block file exists, is `QUEUED` (or `DRAFT` with the
missing decision named), and someone who has never seen this conversation
could execute it.

---

## The format

```markdown
# TASK <unit-id>: <one-line title>

STATUS: DRAFT
MODEL:  <frontier | mid | cheap>
MODE:   <relay | worktree @ <path> on branch unit/<unit-id>>

CONTEXT:
<1-2 sentences on what this is part of - then POINT at the real source:
the spec section, the data file, the upstream doc.>

FILES TO TOUCH:
- <path>                 (what changes)
Expected blast radius. If the change genuinely needs a file outside this
list, touch it and say so in the delivery report. An UNREPORTED file
outside this list is the thing review is looking for.

CHANGE:
<The contract: which files, which existing patterns to follow BY NAME,
and the observable behavior. Not the line-level implementation.
EXCEPTION: judgment-heavy visual/design work, where the design detail IS
the spec - those stay fully specified.>

DONE WHEN:
- <the check lane green, run from the right directory>
- <concrete input -> output for the changed contract>
- <something observable: a grep that must hit, a command whose output
  must contain X>
```

## What makes each part earn its place

- **Naming patterns by name** is what makes the executor match your
  codebase instead of inventing a style for it.
- **Observable `DONE WHEN` lines** give the executor and the reviewer the
  same objective "done." Review becomes yes/no instead of taste, and a
  finite checklist is a terminating condition - it kills polish spirals.
- **Blast radius, not prohibition.** The reviewer's scope check is
  "everything in the diff is either listed here or explained in the
  report." Declared deviations are normal; undeclared ones bounce.

## Two scales

- **Small** - 1-3 files, reviewable in a minute. Use while learning the
  loop, or for any executor you don't trust yet.
- **Unit** - one coherent roadmap unit with a testable contract; `FILES
  TO TOUCH` may name directories plus a contract. Requires both a working
  review ritual and a lane the reviewer can re-run in ~2 minutes. The
  safety net for a bigger diff is the review, not diff smallness.

## If a diff came back too big

Split it. Block size is a dial the human owns, and "that was too big -
split it into two" is a normal instruction, not a failure. Split along
file boundaries so the halves don't collide.

## Bugs get a diagnosis block first

The first block for a bug changes no code. `CHANGE` says: reproduce or
trace it, and report root cause (file:line, the mechanism, and why it
explains the *exact* symptom rather than a plausible one), blast radius,
and the smallest correct fix.

The reviewer then verifies reasoning - cheap - instead of deriving it -
not cheap - and green-lights a fix block.

**Stated exception, so it doesn't drift:** when diagnosis was ~95% of the
work and the fix is trivial, whoever diagnosed ships it. Relaying a
one-liner costs more than it protects. Anything where implementation is
the bulk of the work goes to the executor, however small.
