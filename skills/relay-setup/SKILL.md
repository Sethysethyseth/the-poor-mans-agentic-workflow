---
name: relay-setup
description: Install or upgrade the relay workflow in a project - fill the setup manifest, generate the agent contract and task queue, render the per-tool adapters, and run the first lap. Use when someone asks to set up, install, adopt, or upgrade this workflow.
---

# relay-setup - install the whole workflow

**This file is self-contained on purpose.** You may be a chat assistant
someone handed this URL to, with no repo clone and no skill support.
Everything needed is here; you do not need to read any other file in the
workflow to run this.

**Done when:** the project holds a filled manifest, a generated agent
contract, a state file, a task queue with one starter block, adapters for
the tools in use, and one completed lap through the loop.

**Time:** ~20 minutes, most of it the lap.

---

## Before you start

Confirm four things and stop if one fails:

1. **It's a git repo.** The whole protocol lives in git. `git init` if not.
2. **The repo is outside cloud sync.** OneDrive/Dropbox/Drive cause
   file-lock hangs and stale reads - a documented scar. Worktrees
   especially must live outside sync.
3. **At least one coding agent CLI is installed** - Claude Code, Cursor,
   Codex, whichever. The workflow is tool-neutral; it needs one to start.
4. **The project's runtime runs** - whatever the check lane will need.

---

## Step 1 - read the project, don't interview the human

Read the repo before asking anything: package manifests, test and build
scripts, linter config, CI config, entry points, deploy hints, whether a
database is present. You are inferring the manifest answers from
evidence, and you will tag each inference with what you saw.

The human should confirm your findings once, not answer a questionnaire.

## Step 2 - write the manifest

Create `docs/relay-manifest.md` with the answers below. **Every question
has a default that works.** An adopter who changes nothing gets a
complete, strict setup. Write the default in unless the repo's evidence
says otherwise; tag inferred answers (`check lane: npm test - found in
package.json`).

**The conversation is never the record.** However an answer was reached,
it lands in this file before anything is generated - so choices are
versioned, re-consultable when levels change, and generation is
reproducible from the file alone.

### Tools and level

- **T1. Tools in use** - which coding agents will play the roles. Decides
  which adapters get rendered in step 5. *Default: whichever CLI is
  installed.*
- **T2. Level** - `0` one agent no protocol (generates nothing);
  `1` the relay dispatched by hand; `2` a second seat or model tier;
  `3` the loop dispatches itself. *Default: 1.*
  Level 1 dispatches by copy-paste **on purpose** - handing the block
  over yourself is the only way to see exactly what context the executor
  gets, and that is what makes a bad block debuggable later. Say this to
  the adopter; it is the level's whole point.
- **T3. Model tiers** - blocks carry a `MODEL:` header so dispatch is one
  glance. *Default: `frontier | mid | cheap`.*

### Project

- **P1. Shape** - web app / API / CLI / library / scripts / data / docs.
  Controls phrasing only. *Default: unspecified.*
- **P2. Check lane** - the command that proves the project still works,
  re-runnable fresh in under ~2 minutes. **This is the answer worth real
  effort** - it is what every review re-runs forever.
  *Default: name what exists, and BUILD A MINIMAL ONE if nothing does.*
  Don't record an absence and move on: propose the smallest command that
  could actually fail here - the build succeeds, the entry point imports,
  the CLI answers `--help`, the links resolve. Coverage is not the goal
  and this is not a testing strategy; one command you can run and trust
  is. Decide the command now; step 6 builds it through the loop.
  *(Escape hatch, kept on purpose: `none yet` degrades evidence to "show
  the change running" and carries a standing TODO. It is visibly weaker
  and stays documented rather than hidden.)*
- **P2a. Lane falsifiability** - any lane this setup creates is proven RED
  before it is accepted: break something trivial, run it, watch it fail,
  revert, watch it pass. *Default: ON, not deletable for lanes setup
  creates.* A lane nobody has watched fail is an unverified claim, and
  unverified claims are refused everywhere else here.
- **P3. Release flow** - is there a branch whose push deploys, and a
  production environment at the end of it? *Default: release branch
  `main`, no auto-deploy assumed.*

### The gate (ask-first items)

Hands-off by default; these stop and ask. Include or exclude here - never
by hand-editing a generated file later.

- **G1. Release merge + trigger phrase.** *Default: ON, phrase
  `"push to main"`.* Enthusiasm is never authorization.
- **G2. Production touches.** *Default: ON; deletable only with no prod.*
- **G3. Migrations, any environment.** *Default: ON; deletable only with
  no database.* The migration lands before dependent code deploys.
- **G4. Irreversible local ops.** *Default: ON. Not deletable.*
- **G5. Dependency installs.** *Default: ON. Not deletable.*
- **G6. Project irreversibles** - emails, payments, webhooks, publishing.
  *Default: none listed.*

### State and cadence

- **S1. State file.** *Default: `docs/STATE.md`*, capped ~40 lines,
  carrying a "Next action (human):" line that is never left empty.
- **S2. Single writer.** *Default: ON, the reviewer. Not deletable* - it
  is the root-cause fix for the workflow's worst accident class.
- **S3. Queue directory.** *Default: `docs/tasks/`.*
- **M1. Cadence** - honest dispatch/review round-trips per week; a unit
  costs ~3 touches. Controls how big the planner sizes units.
- **M2. Escalation triggers.** *Default:* schema/data-model design;
  security surfaces; production incidents; root-cause debugging review
  can't close; delivery and spec disagreeing in a way the block doesn't
  settle.

## Step 3 - one confirmation pass

Show a short summary of what you inferred and which defaults stand. Not
an interrogation - the adopter should be able to confirm "your tests run
with `npm test`" on sight without knowing what a check lane is. Name the
check lane explicitly so a lane that proves nothing can be vetoed. Write
corrections back into the manifest.

## Step 4 - generate

From the manifest alone, ask zero questions it answers:

- **`AGENTS.md`** at the repo root - the agent contract. Roles, the
  check lane, verify-before-trust, the gate assembled from G1-G6, and
  pointers to everything else. Keep it under ~70 lines; it is loaded by
  every agent every session, and length here is a tax on all of them.
- **`<S1>`** - the state file, with the next-action line pre-filled.
- **`<S3>`** with a `BLOCK.md` describing the block format, and
  **`<S3>/u0-hello-relay.md`**, the starter block for step 6.
- A `.gitignore` entry for `DELIVERY.md`.

Stamp every generated file with one header line: `generated from
the-poor-mans-agentic-workflow <version>, <date>`. Version plus the
manifest makes regeneration reproducible.

## Step 5 - render the adapters

Same content, one copy, per-tool dialect. Render only for the tools in
T1; adding another later is one more render, never a content fork.

| Tool | Render |
|---|---|
| Claude Code | `CLAUDE.md` importing `AGENTS.md`; the `relay-*` skills into `.claude/skills/`; gate items as permission settings |
| Cursor | `.cursor/rules/` pointing at `AGENTS.md`, skills as rules with globs |
| Codex / other | `AGENTS.md` alone - it is the cross-tool standard |

**Adapters point, they never restate.** A copied rule is a rule that
drifts. This is what makes moving from one tool to another a re-render
instead of a rewrite.

## Step 6 - the first lap (~15 minutes)

One lap through the full loop teaches the relay better than any docs
read, and doubles as the smoke test that the generated files work. Your
role is narrator: say what to do, then point at what just happened.

The starter block takes one of two shapes:

- **A lane already existed** - the block is a trivial change (one README
  line) whose `DONE WHEN` includes running that lane.
- **Setup is building the lane** - the block establishes it, and
  `DONE WHEN` demands the P2a proof: the lane shown FAILING against a
  deliberate trivial break, then passing once reverted.

The lap:

1. **Dispatch.** At Level 1 the human opens a fresh executor session and
   pastes one line: *"Read `docs/tasks/u0-hello-relay.md` and execute
   it."* That paste is the lesson - it is the moment you can see exactly
   what the executor was given and what it wasn't.
2. **Watch it stop.** It changes the code, writes `DELIVERY.md`, and ends
   its turn without committing. The stop is the protocol working. (If the
   lane needs a package installed, it stops and asks - that's G5, and the
   human runs it.)
3. **Review.** A fresh session audits the report against the tree,
   re-runs the lane - **both halves of the red-then-green proof if this
   lap built it** - commits with SHA verification, and updates the state
   file including its next-action line.
4. **Look at what happened.** One block file, three actors, zero shared
   chat context, one commit, and a state file that says what's next. Real
   units are the same lap with bigger blocks. If the lap built the lane,
   the adopter now owns the instrument every future review re-runs -
   built through the loop, on the first unit, which is the cheapest it
   will ever be to add.

---

## Stop condition

Stop when the manifest is filled and confirmed, the files are generated
and stamped, the adapters are rendered, and one lap is complete: block
dispatched, executor stopped uncommitted with a report, reviewer made
exactly one commit, state file names the next action.

Do not invent questions the manifest already answers. Do not generate
before the confirmation pass. If something can't be determined, say so
and use the printed default rather than guessing silently.
