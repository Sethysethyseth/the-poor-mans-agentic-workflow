# The loop cheat sheet - keep this page open in week one

One printable page: what you SEE, what you DO. Everything here is the
short form of [docs/protocol.md](../docs/protocol.md); when a row isn't
enough, that page is the depth.

```
        author            dispatch           execute
  planner writes a   →   you paste one   →   executor works,
  block into the         pointer line        writes a delivery
  queue (QUEUED)                             report, STOPS
                                                  ↓
        gate             review + land       "it stopped"
  wave done? the     ←   reviewer audits, ←  you tell the
  frontier review        commits, updates    reviewer to audit
  + YOUR trigger         the state file
  phrase
```

## You see X -> you do Y

| You see | You do |
| --- | --- |
| A new block sits `QUEUED` in the task queue | Dispatch it: paste at the executor - *"Read `docs/tasks/<block>.md` and execute it exactly. It is the complete task; do not ask for the task in chat."* |
| The executor ended its turn with a delivery report and NO commit | That stop is the protocol working. Tell the reviewer: *"The executor stopped - review the delivery."* |
| The executor asks you for the task, or stops with no report | Don't explain in chat - blocks are self-contained. Re-paste the dispatch line; if it stopped mid-way explaining an unmeetable criterion, that goes to the reviewer as-is. |
| The reviewer committed and rewrote the state file | Read the state file's "Next action (human):" line and do that - usually: dispatch the next block. |
| The reviewer BOUNCED the unit | Nothing to write - the reviewer already updated the block with what to fix. Re-dispatch the same block file. |
| The reviewer hands you a post-push smoke checklist | Run it on the DEPLOYED build (never a dev server), soon. Findings go back as bug reports - they become diagnosis blocks, not live-chat fixes. |
| The queue is empty / the wave is done | The release gate: a frontier-tier session reviews the accumulated diff. The merge itself waits for your verbatim trigger phrase. |
| ANY agent proposes a merge, deploy, migration, or destructive op | Only your verbatim trigger phrase authorizes it. Enthusiasm, implication, and "looks good" never do. |

## The three most-broken rules (tape these somewhere)

1. **The executor never commits.** Even though it can. Two writers on
   one tree is the workflow's worst accident class.
2. **One writer for state.** Only the reviewer edits the state file and
   the queue index - everyone else reads.
3. **Blocks are self-contained.** The executor gets the block file and
   nothing else. If it needs the chat to succeed, the block is wrong -
   bounce it to the planner; don't fill the gap by hand.

## Per-level vocabulary

- **Level 1 (solo seat):** every "seat" above is a SESSION. Executor =
  a fresh mid-tier session (fresh is the point); reviewer = another
  fresh session; "tell the reviewer" = open one and say it. Same rows,
  same rules.
- **Levels 2-3 (two seats):** the table reads literally - executor is
  the agent app you point at the block.
- **Level 4:** see the autonomous block below.

## When it goes sideways

| You see | You do |
| --- | --- |
| Your agent flailed mid-setup | The manual path is the SAME content - read [docs/setup.md](../docs/setup.md) yourself and continue from where the manifest left off. |
| The loop stalled and you're lost | The state file's "Next action (human):" line is the resume point. It is never empty; if it somehow is, that's the bug to report. |
| The executor committed when it shouldn't have | Don't reset anything. Follow the recovery note in the [reviewer checklist](reviewer-checklist.md#recovery-the-executor-committed). |
| The executor stopped saying a criterion can't be met | That's correct behavior, not failure - the anti-loop rule fired. Send it to review; the reviewer fixes the block or escalates. |
| A seat ran out of tokens mid-unit | Safe by design: blocks re-dispatch from scratch. Point the SAME block file at another agent, a cheaper tier, or (Level 1) a later window - zero repo edits. |

## Level 4 - when the resident is driving (autonomous)

| You see | You do |
| --- | --- |
| "n/N landed" wave-progress messages | Nothing. That's the loop working; your attention is batched to wave scale. |
| A page: two bounces on one unit, ladder exhausted, or an escalation trigger | The machine stopped on purpose. Read what it hit and rule - this is the judgment surface you kept. |
| Wave complete: one consolidated smoke checklist + the release gate | Same as manual, batched once per wave: run the smoke list on the deployed build, then the gate waits for your trigger phrase. |
| You want manual control back | Say stop dispatching, and point the executor at the next block by hand - mid-wave is fine. No regeneration, nothing to uninstall ([docs/autonomous.md](../docs/autonomous.md#switching-back-the-paragraph-that-makes-this-safe-to-try)). |
