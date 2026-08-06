---
name: relay-execute
description: Execute one task block from the queue - implement it, prove it with the check lane, write the delivery report, and stop without committing. Use when a block has been dispatched to you, or when told to read a task file and execute it.
---

# relay-execute - implement one block and stop

You have been handed one task block. It is the contract. Your job is to
satisfy it, prove you satisfied it, and end your turn leaving the tree
uncommitted so the reviewer sees exactly what changed.

**Done when:** every `DONE WHEN` criterion is met with evidence, and
`DELIVERY.md` at the repo root reports it.

---

## Do

1. **Read the block, then read `AGENTS.md`.** The block names the
   outcome; the contract names the standing rules - the gate, the check
   lane, the project's conventions. Neither restates the other.
2. **Implement it.** Follow the patterns the block names, by name. Match
   the surrounding code rather than introducing a style it doesn't use.
   Where the block gives a contract rather than an implementation, the
   implementation choices are yours - that is deliberate.
3. **Prove it.** Run every check lane the block allows, yourself, before
   claiming anything. If the block created or changed a lane, prove the
   lane can fail: break something trivial, run it, watch it go red,
   revert, watch it go green. Capture both halves.
4. **Write `DELIVERY.md`** (below) and end your turn.

## Don't, and why

- **Don't commit, push, or touch git.** One writer for git and state, and
  it's the reviewer - two agents committing one tree is the accident this
  workflow exists to prevent. Leaving the tree dirty is not sloppiness;
  it is the handoff.
- **Don't edit the state file, the agent contract, this block, or
  anything else in the queue.** State is the reviewer's, and a block that
  edits its own contract can't be audited against it.
- **Don't retry without new information.** If a criterion can't be met,
  stop and say why. Guessing again is the failure mode; a clear stop is a
  useful outcome and gets you a better block.
- **Don't install dependencies or refactor unrelated code.** Package
  installs are an ask-first gate item - stop and ask, the human runs it.
- **Don't start the next block.** End your turn.

## Going outside FILES TO TOUCH

Allowed when the change genuinely needs it - just say so in the report,
with the reason. A declared deviation is a normal outcome. An
**undeclared** file in the diff is the single loudest signal review looks
for, and it bounces the unit.

## The delivery report

Write `DELIVERY.md` at the repo root. It is gitignored and never
committed. One `## <unit-id>` section per block if several were batched.

- **Files touched** - the exact list. Anything outside `FILES TO TOUCH`
  flagged explicitly, with its reason.
- **Check evidence** - verbatim output of every lane you ran. Not a
  summary of it. If the project has no lane yet, evidence is the change
  running: the command, and its before/after output.
- **Criteria** - each `DONE WHEN` line restated with the evidence that
  proved it: a test name, grep output, a command result. The word "done"
  is not evidence.
- **Deviations** - anything you did differently from the block, and why.

End with this footer, so the human always knows the next move:

```
--- DELIVERY COMPLETE ---
Next action (human): tell the reviewer this unit is awaiting review.
```

**Write the report honestly, including failures.** The reviewer re-runs
every lane fresh and audits the report against the actual tree - a report
that doesn't match the tree is itself the loudest review signal, and
claiming a green that isn't there is the founding scar this whole step
exists to catch. A report that says "criterion 3 could not be met,
here's why" is a good report.
