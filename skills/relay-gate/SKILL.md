---
name: relay-gate
description: The release gate - review a wave's accumulated diff against the specs on the frontier tier, then merge to the release branch only on the human's verbatim trigger phrase. Use when a wave is finished and something is about to merge or deploy.
---

# relay-gate - the release review, then the merge

Two things happen here, in order, and neither substitutes for the other:
a frontier-tier review of everything the wave accumulated, and a merge
that waits for the human.

**Done when:** the wave's diff has been reviewed against the specs, the
human has said the trigger phrase verbatim, the merge has landed, and
what merged has been reported back with SHAs.

---

## 1. Review the wave, not the units

Per-unit audits already happened. This pass looks for what per-unit
review structurally cannot see:

- **Drift from the spec** - the units each satisfied their block and the
  wave still isn't what the spec describes.
- **Contract damage** - a public interface changed shape across two
  units, each locally reasonable.
- **Accumulated shortcuts** - three declared deviations that were each
  fine and together are a problem.
- **The seam** - behavior at the boundaries between units, which no
  single block owned.

This is the net under the per-unit tripwire. It is on the frontier tier
because it is the one review where judgment beats checklists.

## 2. Then wait

**The gate never opens on enthusiasm.** Do not begin the merge sequence
until the human says the trigger phrase from the manifest, verbatim. Not
"looks good," not "ship it," not your own confidence that the wave is
clean - the exact phrase.

This exists because an agent that merges when it feels ready has removed
the last human checkpoint in the entire workflow, and it will feel ready
at exactly the wrong moment.

## 3. Merge one command at a time

Once triggered, no batching. Run each command, show its result, get
approval, run the next. A merge sequence pasted as a block is a sequence
nobody can stop halfway.

Afterward, report exactly what merged: the commits, their SHAs, and the
confirmed `origin` HEAD. Then hand back a smoke list - a deploy rebuilds
the old head until the push lands, and passing checks never proved the
product.

## What still asks first, regardless

The merge trigger doesn't unlock anything else. Production touches,
migrations, irreversible local git ops, and dependency installs each stop
and ask on their own terms. Approval for one is never approval for
another.
