# The reviewer checklist - the per-unit audit ritual

Run this on every delivery, every time, whatever tier is playing
reviewer (at Level 1 it's one of your own sessions; at Level 4 the
resident runs it unchanged - autonomy never waives a step). The delivery
report turns review into **auditing a claim instead of reconstructing a
tree** - cheap enough that skipping it is never worth it, and skipping
it quietly converts the whole workflow into unreviewed codegen
([who should NOT use this](../README.md#who-should-not-use-this)).

**Inputs:** the task block, the delivery report, and the working tree.
Three delivery paths normalize to the same three inputs:

- **Local tree (manual default):** report at `DELIVERY.md`, changes
  uncommitted in the working tree.
- **Lane worktree (autonomous):** same, inside the lane worktree.
- **Cloud (the variant):** report in the PR body; audit the pushed PR
  branch instead of a local tree.

## 1. Re-run the checks FRESH

The report is never trusted for green checks - "the executor lies about
done" is a founding scar, not an insult. Re-run the block's check
lane(s) yourself, now. Laneless projects (the manifest's degraded escape
hatch): re-run the "show it running" evidence commands instead.

**If the block created or changed a check lane, re-run BOTH halves of
its falsifiability proof** - the deliberate break with the lane red, and
the reverted tree with the lane green. A lane that only ever showed
green is not proven, and proving it is cheaper now than after it has
silently passed a hundred units.

## 2. Audit the report against the tree and the block

- **Scope:** every changed file (untracked-files-visible `git status` -
  untracked directories collapse and hide new files) appears in the
  block's FILES TO TOUCH or the report's deviations. Unexplained
  touches are a bounce, not a shrug.
- **Criteria:** every acceptance criterion has evidence in the report -
  and spot-check the evidence against the actual tree; a criterion
  "met" in prose only is not met.
- **Deviations:** each one stated in the report is either acceptable
  (record why) or a bounce. Undeclared deviations you discover are
  worse than declared ones - say so in the bounce.
- **The stop:** the executor committed nothing, touched no state files,
  added no dependencies. If it committed, see the recovery note below.

## 3. Fix or bounce

- **Trivia** (naming, a missed comment, a one-line gap): fix it
  yourself, note the fix in the queue entry.
- **Anything real:** BOUNCE - update the BLOCK with what to fix and
  why, flip the status, re-queue. Never iterate with the executor in
  chat; the block stays the contract. (Autonomous mode: two bounces on
  one unit stops the machine and pages the human.)
- **The delivery contradicts the spec in a way the block doesn't
  settle:** that's an escalation trigger, not your call. Send it up.

## 4. Land it

- Stage files individually - never `git add .`.
- One commit per unit; history stays bisectable.
- **SHA-verify:** `git log --oneline -1` after the commit - confirm it
  exists and says what you meant.
- Push to the working branch, then **confirm the push reached the
  remote** (`git log origin/<branch> -1`) - anything downstream
  (deploys, previews) rebuilds the OLD head until the push lands.

## 5. State upkeep (you are the single writer)

- Queue index: flip the unit to `LANDED <sha>` (or `BOUNCED`), note
  who actually delivered if it wasn't the dispatched agent.
- Rewrite the state file: what landed, what's in flight or "nothing in
  flight," and the "Next action (human):" line - never empty.
- Hand the human the post-push smoke checklist: 3-6 concrete things to
  eyeball on the deployed build. Checks prove the code; only eyes prove
  the product - a unit here once passed an 11-criterion audit clean and
  the smoke pass still found two live defects.

## Verify-before-trust (the standing list behind steps 1-4)

- Re-run "checks green" yourself, always.
- SHA-check every commit; confirm every push reached the remote.
- Confirm the right commit actually deployed before treating a deploy
  as evidence.
- Smoke on the deployed artifact - build-passing + diff-looking-right
  do not prove the product.

## Recovery: the executor committed

It happens; don't panic and don't reach for destructive git (resets,
force-pushes, and their kin are gated ops in every configuration).

1. Stop the executor session; nothing else writes while you sort it.
2. Run this checklist against the COMMITTED tree exactly as if the
   changes were uncommitted - the audit doesn't change, only the state
   of the tree does.
3. Audit passes: keep the commit, record in the queue entry that the
   executor committed off-protocol (recorded, never silent), and
   continue from step 4 as usual.
4. Audit fails: bounce as usual, and undo with a NEW revert commit -
   history moves forward; nothing gets rewritten.
5. Either way: the block's standing footer already forbids this - if it
   keeps happening, the dispatch prompt or the block copy is being
   edited; restore them verbatim.
