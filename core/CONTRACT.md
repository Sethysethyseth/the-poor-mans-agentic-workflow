# Agent contract - `<project>`

> The one file every agent loads every session. Everything else in this
> workflow is reachable from here and loads only when it is needed.
> Work-state lives in `<work-state-file>`, never in this file.
>
> *Template note, deleted at generation: `<angle-bracket>` placeholders
> come from your setup manifest. Role names are deliberate - "the
> builder" is whatever agent you point at a task file, so changing tools or
> levels needs zero edits here.*

## Project *(project)*

`<2-4 lines: what this is, and what you deliberately do NOT want built -
agents invent scope when nothing names the anti-goals.>`

Run it: `<command>`. Platform notes: `<e.g. Windows + PowerShell: chain
with ; not &&>`.

## Check lane *(project)*

`<check-lane-command>`, from `<directory>`, under ~2 minutes.

This is the instrument every review re-runs. It has been seen to fail. If
a change ever makes failing impossible, the lane is broken - fix the lane
before trusting another green.

## Roles - one writer for git and state

- **Planner** authors task task files and reviews the accumulated diff before
  release. Escalate rather than guess on: `<escalation triggers - schema
  design, security surfaces, production incidents, root-cause debugging
  review can't close, delivery and spec disagreeing in a way the task file
  doesn't settle>`.
- **Builder** implements one task file, proves it, writes `DELIVERY.md`, and
  leaves the tree uncommitted so review sees exactly what changed. When a
  criterion can't be met, it stops and says why - retrying without new
  information is the failure mode this rule exists to prevent.
- **Reviewer** is the single writer for git and for state: audits the
  delivery, re-runs the lane itself, then lands or bounces.

One writer because two agents committing one tree is the accident this
workflow exists to prevent.

## Verify before trust

A delivery report is a claim. Read it for narrative, never for green
checks - re-run the lane yourself. When reality and a state file
disagree, query the system of record and correct the file; a wrong belief
repeats its failure until the record is fixed.

## Ask first

Hands-off by default - run commands, stage, commit locally, and push to
working branches without asking. These stop and ask:

1. **Merge into `<release-branch>`** - only after the human says
   `"<trigger-phrase>"` verbatim, then one command at a time.
2. **Production touches** - `<prod-identifiers>`.
3. **Migrations, any environment** - a separate track from code deploys.
4. **Irreversible local ops** - `reset --hard`, `clean`, `push --force`,
   branch deletion, bulk deletion.
5. **Dependency installs** - anything mutating manifests or lockfiles.

`<project-specific irreversibles: emails, payments, webhooks, publishing.>`

## Where to look

- Current state and the next action: `<work-state-file>`
- Task queue: `<queue-dir>` - the builder reads task files here; the
  reviewer owns their status.
- Block format, protocol, review checklist, release gate: carried by the
  `relay-*` skills, loaded when the situation calls for them. Don't
  preload them.
- Project scars: `<gotchas-file>`. A gotcha nobody can trace to a real
  incident gets deleted.
