# The loop cheat sheet - keep this page open in week one

One page: what you SEE, what you DO. This is the short form of
[docs/protocol.md](../docs/protocol.md); when a row isn't enough, that
page is the depth.

```
        author            hand off            build
  planner writes a   →   you paste one   →   builder works,
  task file into         pointer line        writes a report,
  the queue (QUEUED)                         STOPS
                                                  ↓
        gate             check + land        "it stopped"
  batch done? the    ←   reviewer audits, ←  you tell the
  release review         commits, updates    reviewer to audit
  + YOUR trigger         the state file
  phrase
```

## You see X → you do Y

| You see | You do |
| --- | --- |
| A new task sits `QUEUED` in the queue | Hand it off: paste at the builder — *"Read `docs/tasks/<task>.md` and execute it exactly. It is the complete task; do not ask for it in chat."* |
| The builder ended its turn with a report and NO commit | That stop is the protocol working. Tell the reviewer: *"The builder stopped — review the delivery."* |
| The builder asks you for the task, or stops with no report | Don't explain in chat — task files are self-contained. Re-paste the handoff line. If it stopped part-way explaining a criterion it can't meet, that goes to the reviewer as-is. |
| The reviewer committed and rewrote the state file | Read the state file's `Next action (human):` line and do that — usually: hand off the next task. |
| The reviewer sent the task BACK | Nothing to write — the reviewer already updated the task file with what to fix. Re-hand-off the same file. |
| The reviewer hands you a smoke checklist | Run it on the DEPLOYED build, never a dev server, soon. Findings go back as bug reports — they become diagnosis tasks, not live-chat fixes. |
| The queue is empty / the batch is done | The release gate: an expensive-tier session reviews the accumulated diff. The merge itself waits for your verbatim trigger phrase. |
| ANY agent proposes a merge, deploy, migration, or destructive command | Only your verbatim trigger phrase authorises it. Enthusiasm, implication, and "looks good" never do. |

## The three most-broken rules (tape these somewhere)

1. **The builder never commits.** Even though it can. Two writers on one
   tree is this workflow's worst accident class.
2. **One writer for state.** Only the reviewer edits the state file and
   the queue — everyone else reads.
3. **Task files are self-contained.** The builder gets the file and
   nothing else. If it needs the chat to succeed, the task is wrong —
   send it back to the planner; don't fill the gap by hand.

## What "the builder" means at your level

- **Level 1 (one seat):** every "agent" above is a **session**. The
  builder is a fresh session — fresh is the point; the reviewer is
  another one. "Tell the reviewer" means open a session and say it. Same
  rows, same rules.
- **Level 2 (two seats):** the table reads literally. The builder is the
  cheaper agent you point at the task file.
- **Level 3:** see the block at the bottom.

## When it goes sideways

| You see | You do |
| --- | --- |
| Your agent flailed mid-install | Re-run [`relay-setup`](../skills/relay-setup/SKILL.md) and continue from where the manifest left off. It is written to be resumable. |
| The loop stalled and you're lost | The state file's `Next action (human):` line is the resume point. It is never empty; if it somehow is, that's the bug to report. |
| The builder committed when it shouldn't have | Don't reset anything. Follow the recovery steps at the end of [`relay-review`](../skills/relay-review/SKILL.md). |
| The builder stopped saying a criterion can't be met | Correct behaviour, not failure — the anti-loop rule fired. Send it to review; the reviewer fixes the task file or escalates. |
| An agent ran out of tokens mid-task | Safe by design: task files re-run from scratch. Point the SAME file at another agent, a cheaper tier, or a later window — zero repo edits. |

## Level 3 — when the loop is driving itself

| You see | You do |
| --- | --- |
| "n/N landed" progress messages | Nothing. That's the loop working; your attention is batched to batch scale. |
| A page: two send-backs on one task, or an escalation trigger fired | The loop stopped on purpose. Read what it hit and rule on it — this is the judgment surface you kept. |
| Batch complete: one smoke checklist plus the release gate | Same as manual, batched once: run the smoke list on the deployed build, then the gate waits for your trigger phrase. |
| You want manual control back | Say stop handing off, and point the builder at the next task by hand — mid-batch is fine. Nothing to uninstall ([docs/autonomous.md](../docs/autonomous.md)). |
