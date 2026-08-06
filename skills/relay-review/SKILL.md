---
name: relay-review
description: Audit one delivery against its task block and the working tree, re-run the check lane fresh, then land it with a single commit or bounce it back. Use when an executor has stopped and a delivery is awaiting review.
---

# relay-review - audit, then land or bounce

Run this on every delivery, every time, whatever tier is playing
reviewer. At Level 1 it is one of your own sessions; when the loop
dispatches itself the same steps run unchanged - autonomy never waives a
step.

The delivery report turns review into **auditing a claim instead of
reconstructing a tree**. That is cheap enough that skipping it is never
worth it, and skipping it quietly turns the whole workflow into
unreviewed codegen.

**Inputs:** the task block, the delivery report, the working tree.
(In a lane worktree, the same three, inside the worktree.)

**Done when:** the unit is `LANDED <sha>` with the state file rewritten,
or `BOUNCED` with the block updated to say what to fix.

---

## 1. Re-run the checks fresh

The report is never trusted for green checks - "the executor lies about
done" is a founding scar, not an insult. Re-run the block's lane
yourself, now. On a laneless project, re-run the "show it running"
evidence commands instead.

**If the block created or changed a lane, re-run both halves of the
falsifiability proof** - the deliberate break with the lane red, and the
reverted tree with it green. A lane that has only ever shown green is not
proven, and proving it now is cheaper than after it has silently passed a
hundred units.

## 2. Audit the report against the tree and the block

- **Scope** - every changed file appears in `FILES TO TOUCH` or in the
  report's deviations. Use `git status --untracked-files=all`; untracked
  directories collapse to one line and hide new files. An unexplained
  touch is a bounce, not a shrug.
- **Criteria** - every `DONE WHEN` line has evidence, and spot-check that
  evidence against the actual tree. A criterion met in prose only is not
  met.
- **Deviations** - each declared one is either acceptable (record why) or
  a bounce. An undeclared deviation you discover yourself is worse than a
  declared one; say so in the bounce.
- **The stop** - nothing committed, no state files touched, no
  dependencies added.

## 3. Fix or bounce

- **Trivia** - naming, a missed comment, a one-line gap: fix it yourself
  and note the fix in the queue entry.
- **Anything real** - bounce. Update the BLOCK with what to fix and why,
  flip the status, re-queue. Never iterate with the executor in chat; the
  block stays the contract. (When the loop is dispatching itself, two
  bounces on one unit stops the machine and pages the human.)
- **Delivery contradicts the spec in a way the block doesn't settle** -
  that is an escalation trigger, not your call. Send it up.

## 4. Land it

- Stage files individually - never `git add .`.
- One commit per unit; history stays bisectable.
- SHA-verify: `git log --oneline -1` after committing - confirm it exists
  and says what you meant.
- Push to the working branch, then confirm the push reached the remote
  (`git log origin/<branch> -1`). Anything downstream rebuilds the OLD
  head until the push lands.

## 5. State upkeep - you are the single writer

- Queue: flip the unit to `LANDED <sha>` or `BOUNCED`. Note who actually
  delivered, if it wasn't the agent that was dispatched.
- Rewrite the state file: what landed, what is in flight (or "nothing in
  flight"), and the `Next action (human):` line - never empty.
- Hand the human a smoke list: 3-6 concrete things to eyeball on the
  running build. Checks prove the code; only eyes prove the product - a
  unit here once passed an 11-criterion audit clean and the smoke pass
  still found two live defects.

## If the executor committed anyway

It happens. Don't panic and don't reach for destructive git - resets and
force-pushes are gated ops in every configuration.

1. Stop the executor session; nothing else writes while you sort it out.
2. Run this checklist against the committed tree exactly as if the
   changes were uncommitted. The audit doesn't change; only the state of
   the tree does.
3. **Audit passes** - keep the commit, record in the queue that the
   executor committed off-protocol (recorded, never silent), continue
   from step 4.
4. **Audit fails** - bounce as usual, and undo with a NEW revert commit.
   History moves forward; nothing gets rewritten.
5. Either way, check whether the executor could actually see the rule -
   it lives in `AGENTS.md`, and if that file wasn't reachable from the
   tool it was running in, fix the adapter rather than the agent.
