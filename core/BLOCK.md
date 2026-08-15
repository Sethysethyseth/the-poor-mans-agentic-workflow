# The task file - the interface between planner and builder

A task file is a contract, not a script. It names the outcome and the proof;
the implementation is the builder's. It does not restate the agent
contract - the builder reads that from `AGENTS.md`, which it can,
because every builder is a coding agent sitting in this repo.

A task file that needs a decision nobody has made is `DRAFT`, not `QUEUED`.

---

## The format

```markdown
# TASK <unit-id>: <one-line title>

STATUS: DRAFT
MODEL:  <frontier | mid | cheap>
MODE:   <relay | worktree @ <path> on branch unit/<unit-id>>

CONTEXT:
<1-2 sentences on what this is part of - then POINT at the real source:
the spec section, the data file, the upstream doc. Point, don't
paraphrase; a paraphrase is a second copy that can drift.>

FILES TO TOUCH:
- <path>                 (what changes)
Expected blast radius. If the change genuinely needs a file outside this
list, touch it and say so in the delivery report. An UNREPORTED file
outside this list is the thing review is looking for.

CHANGE:
<The contract: which files, which existing patterns to follow BY NAME,
and the observable behavior. Not the line-level implementation - that is
the builder's to choose.
EXCEPTION: judgment-heavy visual/design work, where the design detail IS
the spec. Those stay fully specified.>

DONE WHEN:
- <the check command green, run from the right directory>
- <concrete input -> output for the changed contract>
- <something observable: a grep that must hit, a command whose output
  must contain X>
```

That is the whole format. There is no standing footer - the stop
condition, the delivery report schema, and the git rules live in
`AGENTS.md` and the `relay-execute` skill, in one copy each.

## Two scales

- **Small** - 1-3 files, diff reviewable in a minute. Use it while you're
  learning the loop, or for any builder you don't trust yet.
- **Unit** - one coherent roadmap unit with a testable contract. `FILES
  TO TOUCH` may name directories plus a contract. Requires both a working
  review ritual and a check command the reviewer can re-run in ~2 minutes -
  the safety net for the bigger diff is the review, not diff smallness.

## Statuses

`DRAFT → QUEUED → DISPATCHED → AWAITING-REVIEW → LANDED <sha>`, with
`BOUNCED` as the failure exit: the reviewer writes what to fix into the
task file and re-queues it. Single writer: the reviewer. The builder never
iterates blind against a silent reviewer.

## Diagnosis task files (bugs get a first pass with no code)

A bug's FIRST task file is a diagnosis. Same format, but `CHANGE` says:
reproduce or trace it, change no code, and report root cause
(file:line, the mechanism, and why it explains the *exact* symptom - not
a plausible one), blast radius, and the smallest correct fix.

The reviewer verifies reasoning, which is cheap, instead of deriving it,
which is not - then green-lights a fix task file.

**Stated exception, so it doesn't drift:** when diagnosis was ~95% of the
work and the fix is trivial, whoever diagnosed ships it. Relaying a
one-liner costs more than it protects. Anything where implementation is
the bulk of the work goes to the builder, however small.
