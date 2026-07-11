# AGENTS.md - shared agent contract (template, SINGLE SOURCE)

> Read by ALL agents, every session, at every rung. Shared conventions, the
> division of labor, and the command-running gate live HERE and ONLY here -
> do not duplicate them into tool-specific config files (point those here
> instead, e.g. a CLAUDE.md that imports this file). Current work-state
> lives in `<work-state-file>`, never in this file.

> Template notes, deleted at generation: `<angle-bracket>` placeholders are
> filled from your setup manifest. Role names are deliberate - "the
> executor" is whatever agent you point at a block, so changing tools (or
> rungs) requires zero edits here. Sections marked *(project)* are yours to
> fill with your project's facts; keep them short - this file is a
> contract, not documentation.

---

## Project *(project)*

<2-6 lines: what this project is, who works on it, and the agents' roles
in one sentence each. Anti-goals worth knowing before adding scope go here
too - agents invent scope when you don't name what you DON'T want.>

## How to run / check lanes *(project)*

- Run: `<how to start the project locally>`
- Check lane(s) - what proves the project still works, re-runnable fresh
  in under ~2 minutes: `<check-lane-command(s), run from <directory>>`
- <If you have NO check lane yet: say so honestly here, and keep the
  standing TODO to build one - the review step visibly weakens without it.
  Until then, "proof" means showing the change running: command output,
  before/after.>

## Structure *(project)*

- <the 3-8 directories an agent must know about, one line each>
- `<work-state-file>` - current state + next unit, rewritten every session,
  CAPPED (~300 lines). THE work-state channel for all agents.
- `<work-state-archive>` - append-only history: aged session logs move
  there VERBATIM (never summarized) when the work-state file is rewritten,
  newest first. Only the planner reads it (release review, big-picture
  planning); the reviewer and executor never load it. Same single writer
  as the work-state file.
- `docs/tasks/` - the file-dispatched task queue. Protocol in its README;
  the executor never edits anything under it.

## Division of labor (one writer for git and state)

- **The executor writes code, self-verifies, and stops.** It does NOT
  commit, push, or edit the work-state file - it implements the current
  task block, gets the check lanes green, writes the delivery report to
  `DELIVERY.md` at the repo root (gitignored), and ends its turn. (The
  gate below permits local commits without asking; this rule says
  committing is the REVIEWER'S job, so two agents never race one working
  tree.)
- **The reviewer owns git and state:** audits each delivery report against
  the working tree and the block, re-runs the check lanes fresh (the
  report is never trusted for green checks), commits with SHA
  verification, pushes to the working branch, and keeps the work-state
  file current - including its "Next action (human):" line, which is
  never left empty.
- **The planner authors task blocks and reviews the accumulated diff
  before release.** Escalation triggers that pull the planner in mid-wave:
  `<your escalation triggers - e.g. schema/data-model design, security
  surfaces, production incidents, root-cause debugging the reviewer can't
  close, and any case where the delivery and the spec disagree in a way
  the block doesn't settle>`. Ambiguity escalates - it never spins in
  place.
- **Bugs get a diagnosis block first** (root cause + evidence + proposed
  fix in `DELIVERY.md`, NO code changes); the reviewer verifies the
  reasoning, then green-lights a fix block. Stated exception: when
  diagnosis was ~95% of the work and the fix is trivial, the diagnosing
  agent ships it directly - anything implementation-heavy goes to the
  executor, however small.
- The human personally runs everything the gate marks ask-first.

## Conventions

- Match existing patterns before inventing new ones - reference them by
  name when in doubt.
- Scope discipline: only touch files named in the current task. Don't
  refactor unrelated code. Stop when the acceptance criteria are met.
- Stage files individually - never `git add .`.
- ASCII-only commit messages (shells mangle non-ASCII in `-m` arguments).
- <your OS/shell notes, e.g. "Windows + PowerShell: chain with `;` not
  `&&`">

## Command-running gate (HANDS-OFF by default)

Default is HANDS-OFF: agents run commands freely WITHOUT asking -
including staging files, local commits, and pushes to non-release
branches. Only the items below stop and ask first. Everything not listed
runs automatically.

ASK BEFORE RUNNING:

1. **MERGE INTO `<release-branch>`** - gated behind a trigger phrase. Do
   not start the merge/push sequence until the human says
   `"<trigger-phrase>"` verbatim. Once triggered, run one command at a
   time with explicit approval before each - never batch the sequence.
   After the push lands, report exactly what was merged (commits, SHAs,
   confirmed origin HEAD).
2. **PRODUCTION touches** *(if applicable)* - operations against
   `<prod-identifiers>`, any prod data operation, any push that deploys to
   production.
3. **MIGRATIONS - any environment** *(if applicable)* - separate manual
   track; code push != DB migrate; the migration lands BEFORE the code
   that depends on it deploys.
4. **LOCAL-DESTRUCTIVE / IRREVERSIBLE ops** - `reset --hard`, `git clean`,
   `push --force`, branch deletion, bulk deletion.
5. **DEPENDENCY installs** - anything mutating package manifests or
   lockfiles. Scripts/config entries are normal edits; packages ask first.

<project-specific irreversibles from the manifest: emails, payments,
webhooks, publishing.>

## Verify-before-trust (holds even when hands-off)

- SHA check after every commit (`git log --oneline`).
- Confirm the commit reached `origin` before treating a deploy as evidence
  (`git log origin/<branch> --oneline`) - a redeploy rebuilds the OLD HEAD
  until the push lands.
- The executor's "checks green" is re-run fresh by the reviewer, always.
- Passing checks + a good-looking diff do NOT prove user-facing behavior -
  the human smokes the deployed/running artifact.
- When reality contradicts a state file, query the system of record and
  CORRECT the file in place - wrong beliefs cause repeated failures until
  the record is fixed.

## Current state / next up

Read `<work-state-file>`. It is rewritten every session, capped, and is
the ONLY work-state channel - this file never carries state. Session-start
ritual: read it and STATE the next action before doing anything else.

## Durable gotchas

- **Two agents, one working tree:** if two agents are ever active
  simultaneously, check `git status --untracked-files=all` immediately
  before every commit (untracked directories collapse to one line and hide
  new files), let writes settle, and let only ONE agent commit at a time.
  Better: don't let it happen - serialize, or use worktrees (Mode 2).
- Cloud-synced folders (OneDrive/Dropbox/Drive) cause file-lock hangs and
  stale reads - keep the repo, and always the worktrees, outside sync.
- Never commit `.env` files or hardcode secrets. Local config points at
  development/staging resources only, never production.
- <your project's own scars go here as you earn them - one line each, with
  the incident date. A gotcha nobody can trace to an incident gets
  deleted.>
