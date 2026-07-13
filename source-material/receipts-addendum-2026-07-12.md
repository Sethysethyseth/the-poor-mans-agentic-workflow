# Receipts addendum - source-project events after the 2026-07-07 snapshot

*(Written 2026-07-12 by the planner seat, from the source project's live
QUEUE.md and HANDOFF.md. The source project's tracking doc (section 10 log)
has NOT yet been caught up with these events - that catch-up is queued
there. Until it happens, THIS file is the traceable record for anything
below; the trace-or-die rule applies to it the same as to the other
receipts files.)*

## 1. The executor-substitution receipt (2026-07-11) - roles-not-tools, proven live

Mid NT-wave, Cursor ran out of its included Opus allowance. The wave's
centerpiece unit (NT2, `f26e783` - an 847-insertion, 3-file client
rebuild) was delivered instead by **a different executor** (Cursor's
Composer agent), reading the exact same task-block file. Zero repo files
changed to make the swap work: the block was self-contained, the delivery
report format was the same, the reviewer audited it the same way (all 11
acceptance criteria verified, both lanes re-run fresh, one reviewer fix
folded in).

Why it matters for the public repo: this is decision 7's central claim -
"moving between rungs/executors changes which agent you point at a block
and nothing else" - demonstrated under pressure, by accident, on the
biggest unit of the wave. Use it in README/protocol.md as the
roles-not-tools receipt. It is also an allowance-creep receipt for
economics.md: the unit was `MODEL: opus` on the executor seat, and that is
exactly where the $20 executor allowance ran dry (the section-5 con #3
"the $40 can creep," now measured).

## 2. The cloud-dispatch variant (2026-07-12) - a new delivery channel

The NT-wave's fix unit (NTFIX1) was dispatched to **Cursor running in the
cloud from GitHub**, not a local Cursor session. Mechanical consequences,
recorded in the source repo (commit `804b65b`):

- Task blocks must be **pushed to the remote**, not just committed - a
  cloud executor reads the repo from GitHub, not from the local tree.
- The delivery arrives as a **`cursor/` branch + a PR**, with the delivery
  report in the **PR body** instead of a local `DELIVERY.md` file.
- The reviewer audits the PR branch instead of the local working tree.
- The two-agents-one-working-tree hazard (the July 1 scar) does not apply
  to a cloud executor - it has its own clone. The single-committer rule
  still holds: the reviewer decides what merges.

For the buildout: protocol.md should carry this as a variant of the
dispatch/delivery steps (same contract, second delivery channel), not as a
third mode - Mode 1/Mode 2 are about serialization, this is about where
the executor runs.

## 3. Planner-seat internal tiering refined (2026-07-11, owner's call)

Within the planner seat, the top tier (Fable) is now **withheld for the
pre-main review gate, wave-skeleton authoring, and standing escalations
only**; per-unit audit work defaults to Opus even when judgment-heavy
(NT2's audit was run by Opus in Claude Code instead of the usual mid-tier
resident, at the owner's direction, precisely so Fable would arrive at the
pre-main gate with fresh eyes and budget). This is the v3 "rent frontier
intelligence by the session" lever applied one level deeper - a third tier
inside the planner seat. economics.md material.

## 4. Steering-layer receipts, new since the snapshot

- **The post-push smoke checklist caught two real bugs a clean audit
  missed (2026-07-12).** NT2 passed a full 11-criterion audit with both
  lanes green; the owner's smoke pass on the staging deploy (run from the
  standing post-push checklist - human-steering mechanism #6) then found
  two live defects (a tracked-status UI lag and a failed-fetch on
  create-from-scratch). Receipt for: "build-passing + diff-looking-right
  do not prove the visual" and for the smoke checklist being a bounded
  task that actually happens.
- **A second recorded process deviation (2026-07-12).** The usual
  diagnosis-before-fix step was explicitly skipped for those two smoke
  findings at the owner's instruction ("this once"), recorded in HANDOFF
  at the time - and the next session partially walked it back by
  authoring a proper fix block that kept the un-root-caused finding as
  diagnose-first anyway. Receipt class: same as the July 4 review skip -
  no silent drift; deviations are explicit, recorded, and correctable.

## 5. Refreshed headline numbers (supersede the July-7 receipts where they overlap)

Full paper trail: `cursor-token-savings-stats.md` +
`cursor-token-savings-data.json` in this directory (measured 2026-07-11).

- **37 task units / 35 landed commits in 10 days** (2026-07-02 through
  2026-07-11) - supersedes "~24 units in 6 days."
- **Planner-direct leak rate: 21.6% of units (8/37)** - consistent with
  the earlier "~20% leaked under pressure" figure, now with per-commit
  attribution read off QUEUE.md's own notes rather than estimated.
- **80.7% of diff volume by bytes was executor-delivered** - the route
  split is not skewed by unit size (Cursor units averaged 19.8 KB of diff
  vs 16.0 KB planner-direct).
- **Estimated 0.6-1.6M tokens of codegen (midpoint ~1M) moved off the
  planner seat** - a two-layer estimate whose methodology and caveats are
  stated in full in the stats file; publish the layers and the caveats
  with the number, never the headline alone ("meter numbers stay honest"
  applies).
