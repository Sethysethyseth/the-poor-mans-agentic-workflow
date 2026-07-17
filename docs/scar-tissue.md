# Scar tissue - the incidents behind the rules

Every load-bearing rule in this workflow was paid for by a specific
incident in the pilot. This page is the ledger: what happened, what rule
it bought, and where that rule now lives in the files you generate. It
is published for two reasons. First, adopters keep rules they understand
and quietly delete the ones that look like ceremony - so here is what
each one cost. Second, the honest record includes the incidents where
the HUMAN was the failure mode: process erosion and wrong beliefs are
scars too, and a workflow that only documents its agents' mistakes is
lying by omission.

Dates are from the pilot's own record (July 2026); every entry traces to
the pilot's queue index, state-file archive, or receipts files.

---

## Git and the working tree

### July 1 - two agents, one working tree

The day before the pilot formally started, two agents were active in the
same checkout: concurrent edits got swept into the wrong commit, and
state files were clobbered mid-write. This is the workflow's worst
accident class, and its fix is structural, not behavioral - which is why
the rules it bought are the least deletable in the whole setup:
**a single committer, a single state-file writer, the executor never
commits even though it can**, worktrees for any parallelism, and an
untracked-files-visible `git status` immediately before every commit.
*Lives in:* the generated agent contract; manifest item S3 (marked
not-deletable, and this incident is why).

### The serialization violation (three units, one tree)

One pilot session ran three units in a single working tree instead of
serializing them. It produced **six reviewer fixes - the messiest
session on record**. Nothing was lost, but the protocol's cost model
inverted: review became reconstruction. The messiest session being the
one that broke the protocol is the protocol arguing for itself.
*Lives in:* Mode 1 as the default, Mode 2 gated behind ~3 clean
serialized units and file-disjoint blocks
([protocol.md](protocol.md#the-two-modes-serialization-not-driving)).

### Cloud-synced folders eat repos

The source project's repo lives inside a cloud-sync folder, and the
pilot paid for it repeatedly: stale-looking files after writes (sync
lag) and file-lock hangs - including a routine `git stash` that hung
outright, which is why the pilot's merge mechanics moved to `git
worktree`. *Lives in:* manifest section 0's repo-location item; the
hard rule that worktrees MUST live outside cloud sync
([setup.md](setup.md#step-0---machine-tooling-before-any-protocol-content)).

## Verification

### Day one - the shipped-contract bug

On the pilot's first day, the review gate caught a bug in a delivered
unit that had shipped against its contract - before it was committed.
This is the original receipt for the gate's economics: **skipping review
to save tokens costs more tokens than it saves**, because rework
sessions are the most expensive sink there is. Every later version of
the workflow moved the gate; none removed it.
*Lives in:* the review-and-land step of every loop variant
([protocol.md](protocol.md#the-loop)).

### "The executor lies about done"

The pilot's record states this rule bluntly and early, as a standing
property rather than a dated event: an executor's "tests green" is a
claim, not evidence. The reviewer **re-runs the check lanes fresh on
every delivery, SHA-verifies every commit, and confirms pushes actually
reached the remote** before treating anything as deployed. The delivery
report exists so this audit is cheap - a claim to audit, not a tree to
reconstruct. *Lives in:* verify-before-trust in the generated agent
contract; the reviewer checklist.

### July 12 - the two bugs a clean audit missed

A delivered unit passed a full 11-criterion audit with both check lanes
green. The human's post-push smoke pass on the deployed build - run from
the standing checklist, not from vibes - then found **two live defects**
(a status-display lag and a failed fetch on a fresh-creation path).
Checks prove the code; only eyes prove the product. The smoke checklist
is what makes that human verification a bounded task that actually
happens. *Lives in:* human-steering mechanism #6
([steering.md](steering.md#human-steering-mechanisms-each-with-its-pilot-receipt)).

### July 7 - the wrong belief that failed a deploy

The state file carried a false claim about the staging database's
migration history. Cost: **exactly one failed deploy** - and only one,
because the rule fired: when reality contradicts a state file, query the
system of record and correct the file in place, immediately. A wrong
belief in an always-read file is a loop generator; every session that
trusts it fails the same way. The correction is recorded in place in the
pilot's archive. *Lives in:* anti-loop mechanism #5
([steering.md](steering.md#anti-loop-mechanisms-agent-side)).

## Deploys and databases

### Code-ahead-of-DB took down production login

In the source project's earlier history, code that depended on a schema
change deployed before the migration ran - and took down login in
production. The pilot then caught the same class **twice more at
review** (two units flagged for code-ahead-of-DB sequencing before any
deploy - the "2 would-have-broken-prod defects" in the receipts). The
rule: **the migration lands before the dependent code deploys, always,
in every environment**, and migrations are a gated, human-run track -
pushing code never migrates a database. *Lives in:* manifest gate item
G3; the generated agent contract's schema-change rule.

### July 3 - the dev server that silently hit prod

The pilot's local dev client turned out to be silently pointed at the
production API by a local env file. Two rules came out: local env files
never point at prod, and **human smoke verification happens on the
deployed build, never a dev server** - the deployed artifact is the real
one anyway. Relay consequence: review gates the commit; the human's
visual sign-off gates the next unit and the release, on a deployment.
*Lives in:* the post-push smoke checklist
([steering.md](steering.md)); the safety invariants in the generated
contract.

## The meters

### July 2 - the token-expiry scramble

Mid-plan, the planner seat's usage window was about to expire - so the
planner built two units directly itself rather than waste the paid
window, bypassing the executor seat entirely. Nothing broke; that is
the point. **The seat split leaks under meter pressure at exactly the
seams it names**, and the pilot's measured leak rate (~22% of units
planner-direct) ships in the receipts rather than being hidden. The
constructive fix is deliberate window anchoring, so expiry stops
ambushing sessions. *Lives in:*
[economics.md](economics.md#window-anchoring---you-control-the-clock);
the honest cons in the README.

### July 11 - the executor allowance died mid-wave

The executor seat ran out of its included frontier-model allowance in
the middle of a wave, on the wave's biggest unit. Two lessons, one
event. Economics: **frontier usage on the executor seat is where the
$40 creeps** - the `MODEL:` header is a routing decision with real money
attached. Portability: the unit was delivered anyway, by a *different*
executor reading the exact same block file, with zero repo edits - the
roles-not-tools claim proven live, under pressure, by accident.
*Lives in:* [economics.md](economics.md#where-the-40-creeps); the
level-mobility guarantee everywhere.

## State files

### The 42,000-token state file

The work-state file - read by every agent, every session - was allowed
to grow uncapped, and by July 6 it had reached roughly 42k tokens: a
silent per-session tax on every seat, planner and executor alike, paid
before any work began. The fix is the two-tier split every generated
setup now ships with: **the state file is CAPPED (~300 lines), and aged
session logs move VERBATIM to an append-only archive** that only the
planner reads, only when planning or gating. History is preserved;
nobody pays for it by default. *Lives in:* manifest items S1/S2; the
generated state-file template's cap rule.

## Process erosion (the human is a failure mode too)

### July 4 - the recorded review skip

The mandated pre-release review was skipped once, at the owner's
explicit instruction, and **recorded in the state file at the time** -
so it was never silently treated as having happened. This is the
steering layer's honest limit and its guarantee in one event: a human
with git access can override any speed bump ("erosion-resistant, not
foolproof"), and what the layer actually promises is that no deviation
is silent. *Lives in:* the framing at the top of
[steering.md](steering.md); manifest item M3's speed-bump design.

### July 12 - "this once" (the second recorded deviation)

The diagnose-before-fix step was explicitly skipped for two smoke
findings at the owner's instruction ("this once"), recorded at the time
- and the next session partially walked it back, keeping the
un-root-caused finding on the diagnose-first track anyway. Same shape as
July 4: explicit, recorded, correctable. Two erosion events in six
weeks, both visible, is the mechanism working.
*Lives in:* [steering.md](steering.md#the-one-line-version).

### Unstated precedents expand

Early in the pilot, a "just this once" direct fix by the diagnosing
agent quietly became a habit-shaped hole in the executor split - so the
workflow **stated it as a formal exception with a boundary** (when
diagnosis was ~95% of the work and the fix is trivial, the diagnosing
agent ships it; anything implementation-heavy goes to the executor,
however small). Unstated precedents expand; stated ones hold their
shape. *Lives in:* the diagnosis-block rules
([protocol.md](protocol.md#the-loop)).

## Autonomous mode (young scars, disclosed as such)

### July 14 - the silently sticky model flag

The first autonomous dispatches hit this immediately: the executor CLI
remembers the last-used model, and a dispatch run without an explicit
model flag silently inherited an exhausted named model - and
quota-refused while the cheap tier sat available. The ritual now
**passes the model flag explicitly on every single dispatch**.
*Lives in:* the generated dispatch ritual; the honest catches in
[autonomous.md](autonomous.md#the-honest-catches).

### The headless-CLI hang (defensive scar)

Labeled honestly: this one is from public bug reports (as of July 2026),
not a pilot incident - the pilot adopted the defense before being burned.
Executor CLIs' non-interactive print modes can hang indefinitely, so the
ritual never waits unbounded: **hard timeout, background task, and on
hang - kill, retry once, then descend the ladder or escalate.**
*Lives in:* the dispatch ritual's timeout discipline
([autonomous.md](autonomous.md#the-honest-catches)).

---

## The pattern, if you want it in one line

Almost every scar above is a version of the same discovery: **a claim
was trusted where evidence was owed** - a delivery report, a state file,
a "tests green," a remembered CLI flag, a human's confidence. The
workflow's whole shape is making the evidence cheap enough to always
collect.
