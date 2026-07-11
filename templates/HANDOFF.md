# HANDOFF - work-state channel (template)

> Template notes, deleted at generation: this file is THE work-state
> channel - the one file every agent reads at session start and the single
> place the human looks to resume. Three load-bearing rules, enforced by
> convention and by the agent contract:
>
> 1. **Single writer.** Only the reviewer edits this file. The executor
>    never touches it; the human asks the reviewer for changes instead of
>    editing around it.
> 2. **Capped, with a verbatim archive.** Keep this file under ~300 lines.
>    When it's rewritten, aged session logs move VERBATIM (never
>    summarized) to `<work-state-archive>`, newest first. Every agent pays
>    to read this file every session - history they don't need is a tax.
>    The archive is read only by the planner, for release review and
>    big-picture planning.
> 3. **"Next action (human):" is never empty.** Every rewrite fills it.
>    A state file that leaves the human without a stated next move is a
>    bug (the no-dangling-next-action rule). When nothing is in flight, it
>    says what starting the next unit looks like.
>
> The session-close ritual that keeps this file honest: rewrite it, state
> "nothing in flight" or name exactly what is, pin the next action. The
> session-start ritual on the other side: the agent reads this file and
> STATES the next action before doing anything else.

---

**Written:** <date>, by <which seat/session>.

## Next action (human): <the ONE next thing - e.g. "dispatch docs/tasks/u2-....md to the executor">

## Status

<2-5 lines: what wave/milestone is in progress, what just landed, whether
anything is in flight right now. "Nothing in flight" is a valid and
valuable status - say it explicitly.>

## Open TODOs (numbered; re-surfaced every session until closed or demoted)

0. <TODO - oldest first, numbered so they can be referenced. A TODO leaves
   this list by being verified done or explicitly demoted, never by
   quietly vanishing.>

## In flight

<Exactly what is mid-unit right now: which block is DISPATCHED, whether a
delivery report is awaiting review, which branch carries unlanded commits.
Or: "Nothing in flight.">

## Session log (newest first; age out to the archive verbatim)

### <date> - <seat/session>: <one-line summary>

<What happened, decisions made, deviations accepted, anything the next
session must know. Off-queue work is labeled OFF-QUEUE here and in the
commit message - drift is allowed but always visible.>
