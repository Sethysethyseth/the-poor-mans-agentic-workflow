# Autonomous dispatch (relay v5) - source snapshot, 2026-07-14

Snapshotted from the source project (LogChamp / workout-db) at commit
`f809494`, 2026-07-14, by the planner seat (Fable). Two artifacts copied
below with light scrubbing (GitHub org/repo and Windows usernames ->
placeholders; nothing else altered), plus the v5 receipts. NOTE: the
source project's skills are under active revision by another agent as of
this snapshot date - re-snapshot before the docs wave consumes this if
more than a few days pass. **RE-SNAPSHOT DONE 2026-07-16 - see section
5 (the addendum) for everything that changed since `f809494`: the v5.1
amendment, the skills alignment pass, and the MW-wave receipts that
SUPERSEDE section 4's age disclosure.**

This file is the ground truth for BRIEF decision 16 (the two driving
modes). Trace-or-die applies: every published claim about autonomous
mode traces here or to the git history cited here.

---

## 1. What relay v5 is, in one paragraph

The manual step "the human points the executor at a block" is replaced
by the resident planner seat dispatching the block itself - via the
executor's headless CLI in a dedicated worktree (Channel B, the
backbone) or the executor's cloud-agents API (Channel A, gated behind a
deliberate billing decision) - so the relay runs frontier-authors ->
auto-dispatch -> executor-executes -> resident-audits-and-lands without
the human in the inner loop. Everything else is UNCHANGED: the command
gate, one-writer-for-git-and-state, the audit ritual, the escalation
triggers, block authoring, and the pre-release frontier review. Both
paths execute the same block file verbatim - the human pointing the
executor at a block by hand still works identically.

## 2. The adopted spec (verbatim, scrubbed)

Source: `docs/specs/autonomous-cursor-dispatch.md` at `f809494`.

> **Status: ADOPTED (July 14, 2026)** - setup complete, probe complete,
> and NT3 landed clean (`98963f6`) as the first autonomous unit, all the
> same day. Probe verdict: Channel A is unavailable under the
> overage-OFF billing precondition, so **Channel B is the backbone for
> ALL blocks**, not just MODEL-auto ones. Authored July 13, 2026 (Fable
> session, Seth's go-ahead on the brainstormed design); probe + trial
> July 14 (Fable).

### What does NOT change

- The command-running gate. Everything here is staging-side. Main
  merges, prod, migrations, destructive ops still ask first.
- One writer for git and state. The reviewer seat remains the only
  agent committing to wave branches and editing HANDOFF/QUEUE. (Cloud
  agents pushing their own `cursor/<slug>` branch is the
  already-accepted delivery mechanism - not a violation; the block
  footer's no-git rule governs the local/worktree lane.)
- The audit ritual (`land-unit`). Both channels normalize to inputs it
  already handles: a `cursor/` branch + PR ("cloud branch" mode) or
  uncommitted changes in a tree ("local relay" mode, pointed at the
  worktree).
- Escalation triggers. Contract ambiguity, schema/security surfaces,
  and repeated bounces still stop the machine and page a human.
- Block authoring and the pre-main frontier review gate.

### Channel A - Cloud Agents API

Base URL `https://api.cursor.com`, auth `Authorization: Bearer
$env:CURSOR_API_KEY` (key from cursor.com/dashboard -> API Keys).
Dispatch = `POST /v1/agents` with the block-pointer prompt,
`repos: [{ "url": "https://github.com/<org>/<repo>", "startingRef":
"<wave-branch>" }]`, `model: { "id": "<per the block's MODEL header>" }`,
`autoCreatePR: true`. The block must be COMMITTED AND PUSHED - an
unpushed block is invisible to the cloud. Poll
`GET /v1/agents/{id}/runs/{runId}`; terminal runs carry `result` and
`git.branches[]`. `POST /v1/agents/{id}/runs` is the cheap bounce
channel (follow-up prompt instead of a cold re-dispatch). On FINISHED
the delivery is a `cursor/<slug>` branch + PR with the report in the PR
body. Cloud constraint verified the hard way: the cloud workspace has
no `.env` / no DB - cloud-dispatched blocks may only require the
DB-free check lanes.

API shape corrections learned while probing: `model` must be an OBJECT
`{ "id": "..." }` (a bare string is rejected); `repos: [{ url,
startingRef }]` and top-level `autoCreatePR` are correct;
`source`/`target` keys are rejected. `GET /v1/models` works and lists
~33 model ids.

### Channel B - headless CLI in a lane worktree

The Cursor CLI (`agent`; some installs expose `cursor-agent`) runs the
same agent non-interactively:

```
agent -p "<dispatch prompt: read the block file and execute it exactly;
write the report to DELIVERY.md; make NO git operations>" --force
--output-format text
```

Rules of the lane:

- Runs in a dedicated worktree OUTSIDE cloud-synced folders:
  `git worktree add C:\dev\worktrees\cursor-lane -b cursor/<unit>
  <wave-branch>`. The lane worktree persists across units to amortize
  `npm install`; precondition per dispatch: `git status` clean in it
  (dirty = stop, a prior delivery wasn't landed), then
  `git checkout -B cursor/<unit> <wave-branch>`. The reviewer's main
  tree is never touched.
- The CLI writes files but does NOT commit (block footer governs, as
  in the manual relay). Delivery = uncommitted changes + DELIVERY.md
  in the worktree -> audit ritual in local-relay mode; the reviewer
  commits from there and merges to the wave branch.
- Known defect: print mode can hang indefinitely (public bug reports).
  Always run under a hard timeout as a background task; on hang, kill,
  retry once, then descend the ladder or escalate.
- Model: honors the plan's included usage. `--model auto` is the
  effectively-free rung on the executor's paid plan; named models draw
  plan credits. ALWAYS pass `--model` EXPLICITLY - the CLI remembers
  the last-used model, so a flagless run silently inherits whatever the
  previous invocation used (July 14 receipt: a flagless dispatch
  inherited an exhausted named model and quota-refused while
  `--model auto` worked fine; source commit `a12bb29`).

### The fallback ladder (token exhaustion -> seamless descent)

```
A: cloud agent, named model     (usage-based credit ONLY - see probe)
B: CLI, named model             (plan included credit)
B: CLI, auto                    (included at no extra cost)
STOP: page the human            (auth broken / all rungs refused)
```

Descend when: pre-dispatch health check fails; the API returns a quota
or payment error (402/429 family); a run terminates ERROR with a quota
message; the CLI exits with an auth/quota error. Mid-unit death is
safe: blocks are self-contained contracts, so the unit re-dispatches
from scratch on the next rung. Log every descent in the queue notes
(the executor-substitution receipt shows why the audit needs to know
who actually delivered).

### The relay loop (what makes it autonomous, not just scriptable)

A resident (mid-tier) session runs the loop; the frontier tier stays
withheld per the standing tiering rule. Per tick:

1. In-flight unit? Poll it (API run status, or the CLI background
   task). Not terminal -> schedule the next wake (~10-15 min for cloud
   runs) and yield.
2. Terminal delivery -> run the audit ritual (mode per channel). Fix /
   bounce / escalate per that ritual. Bounce = follow-up run (Channel
   A) or re-dispatch with findings appended (Channel B); TWO bounces
   on one unit = stop, page the human.
3. Nothing in flight and the queue has a QUEUED unit whose
   serialization notes allow it -> dispatch, flip it DISPATCHED.
4. Stop conditions: queue empty; wave complete (the pre-release gate
   is frontier + human, never the loop); any audit escalation trigger;
   ladder exhausted.

The human's remaining touchpoints: authoring go-ahead, bug reports,
staging smoke sign-off, and every gate item - exactly the judgment
surface.

### Hard stops (from the dispatch skill; never dispatch past these)

- Two bounces on one unit -> stop, page the human.
- Any audit-ritual escalation trigger fired -> stop.
- Wave complete -> the pre-release gate is frontier + human, never the
  dispatch ritual.
- A migration-carrying or prod-touching block -> the dispatch ritual
  REFUSES; those are the human's manual track, full stop.

### One-time setup (measured: ~10 minutes)

1. Mint an executor API key (cloud channel only); set it as a
   user-level env var; never commit it.
2. Install the executor CLI - on Windows
   `irm 'https://cursor.com/install?win32=true' | iex` (the docs' curl
   form is Unix-only) - and log in once. Verify with the CLI's status
   command (installs to `C:\Users\<user>\AppData\Local\cursor-agent\`;
   expect `agent.ps1`/`cursor-agent.ps1` wrappers, no `.exe`).
3. Create the lane worktree parent (e.g. `C:\dev\worktrees\`) outside
   cloud-synced folders.

Windows gotcha, verified: a running agent session's shell may not see
a freshly set user-level env var or PATH update (the parent process
chain holds the stale environment) - read the key from the registry
inline and invoke the CLI by full path.

## 3. Pricing probe - results (run July 14, 2026, $0 spent)

The probe (read-only prompt, cheapest named model, no PR creation) ran
against all three rungs. Verdicts (source commit `d00eda6`):

1. **Channel A: blocked at dispatch, $0.** `POST /v1/agents` returned
   `400 usage_limit_exceeded`: "Usage-based pricing required.
   Background Agent requires at least $2 remaining until your hard
   limit." Cloud agents are usage-based-only; the included plan pool
   never covers them. With the owner's overage toggle OFF (the standing
   precondition: exhaustion means refusals, never charges), this rung
   always refuses cleanly at dispatch time, before any token spend.
   Enabling it is a billing decision, not a routing one - never flipped
   from an agent seat.
2. **B named: refused this cycle.** "You've hit your usage limit...
   saved $64 on API model usage this month with Pro... resets
   7/17/2026." The included named-model pool was already exhausted by
   the owner's own IDE usage mid-cycle - a named-model refusal is
   routine ladder descent, not an incident. Notable: this contradicted
   a "33% consumed" dashboard reading from the previous day - the meter
   that gates named-model CLI calls is the API-model-usage pool, not
   the dashboard's headline meter.
3. **B auto: WORKS, free.** Headless print-mode run in the lane
   worktree returned the correct answer, no hang, no files changed, no
   git operations. This is the backbone rung.

Routing default after the probe: MODEL-auto blocks -> Channel B auto
rung directly (free); judgment-tier blocks -> Channel B named rung
(plan credit), NOT Channel A. Never silently downgrade a block whose
MODEL header was a deliberate quality call without noting it in the
queue entry.

## 4. Receipts (v5 adoption, all July 13-14, 2026)

- **Spec authored July 13** (frontier session, owner's go-ahead on the
  brainstormed design). Setup + probe + first autonomous unit all
  landed July 14 - one day from design to adopted doctrine.
- **First autonomous unit: NT3**, dispatched via Channel B auto rung
  (source commit `ae07ef7` flipped it DISPATCHED; landed clean as
  `98963f6`, audited by the standard per-unit ritual - the audit did
  not change because the dispatcher did).
- **Adoption evidence first, doctrine second** (a steering receipt in
  its own right): the workflow docs were deliberately NOT amended to v5
  until the probe validated the cost model AND the first autonomous
  unit landed clean. The spec carried an explicit instruction to that
  effect from the day it was authored.
- **The flagless-model gotcha** (source commit `a12bb29`): the first
  autonomous dispatch attempt inherited an exhausted named model
  because the CLI silently remembers the last-used model; the fix
  (always pass `--model` explicitly) was written into the dispatch
  ritual the same day.
- **Age disclosure:** as of this snapshot the autonomous mode has ONE
  landed unit and one validated probe behind it, vs ~5 weeks and 37+
  units for the manual relay. Publish that plainly. **(SUPERSEDED
  2026-07-16 - see section 5.5; the count is now seven autonomous
  units including a six-unit single-session wave.)**

---

## 5. Re-snapshot addendum (2026-07-16, at source commit `c45e0c2`)

Delta since `f809494` across the spec, the three relay skills, and the
task-queue README (source commits `00dda65`, `c473e21`, `1b9174b`,
`627c520`). Same scrubbing rules. This addendum is ground truth for the
docs wave alongside sections 1-4; where it conflicts with them, the
addendum wins.

### 5.1 The v5.1 amendment (July 15) - one resident session per wave

The spec's relay loop gained a stated norm: **ONE resident mid-tier
session owns the whole wave** - dispatch -> monitor (scheduled wakeups
while the executor runs, never spinning) -> audit-and-land ->
dispatch-next, tick after tick, from "run the relay" until a stop
condition. Opening a fresh session per unit is the degraded fallback
(session crash, hand-relay), not the design. Two guard rails written
into the amendment so it can't be "extended" silently:

- What batches at wave scale is THE HUMAN'S attention (one smoke
  sign-off, one release gate per wave), never the machine checkpoints -
  per-unit audit, one commit per unit, and bisectable history are
  unchanged. Do not stretch this into batching executor runs across
  units.
- Skills/rituals load fresh at execution time, so a long resident
  session still runs the exact audit/dispatch checklists, not a
  degraded memory of them.

Smoke sign-off correspondingly moved to ONE consolidated checklist per
wave: the resident session writes each landed unit's smoke items into
the state file and carries them forward, handing the human the full
list at wave end. A hand-relayed or single-unit session still gives its
list immediately. (Precedent: the NT-wave sign-off, two units smoked
together against one four-item list.)

### 5.2 Skills alignment pass (the v4 remnants swept)

- **The audit ritual now names three delivery paths:** lane worktree
  (the v5 backbone - uncommitted changes + report in the lane, audit
  and re-run lanes THERE), local relay (hand-relay fallback, the
  reviewer's own tree), cloud branch (Channel A exception, PR-body
  report). Lane-worktree landings: commit in the lane on its
  `cursor/<unit>` branch, ff-merge onto the wave branch (rebase first
  if the wave moved), push from the main tree - one commit per unit
  still holds.
- **The MODEL header is now explicitly the dispatch-routing lever** as
  well as the cost lever: `auto` -> the free CLI rung, named tier ->
  plan credit. The authoring ritual says so.
- **MODE (relay vs worktree) governs only the hand-relay fallback** -
  autonomous dispatch always runs in the lane worktree regardless.
- **Blocks assume the DB-free check lanes only** (unit tests + client
  build) - no dispatch channel can run the DB-backed integration lane
  (no env secrets in the lane worktree or the cloud). A block that
  genuinely needs it is flagged for hand relay in the block itself.
- **Channel B bookkeeping parity:** the dispatch ritual flips the unit
  DISPATCHED in the queue index (channel, rung, model in the notes)
  before the run, same as Channel A.

### 5.3 Relay legibility additions (July 15-16, owner's standing asks)

Directly relevant to BRIEF decision 10 (you-are-here cues) and the
loop cheat sheet's autonomous variant:

- **Wave progress messaging:** at dispatch, "the executor is working
  on <unit> (n/N)"; after each landing, a one-line "n/N - <result>"
  summary; the final landing says "N/N complete" and hands over the
  consolidated smoke checklist. N = the wave's total block count in
  the queue index; renumber once, out loud, if the wave changes size.
- **A zero-token local watch dashboard:** the source project added a
  small local fs/git watcher (no LLM anywhere in it) that the dispatch
  ritual pops open in the browser at dispatch time, so the human gets
  visual confirmation the moment the executor starts writing files.
  NOTE for the buildout: this is source-project CODE - the public
  repo's no-code rule stands; publish it as an optional pattern
  ("any file-watcher pointed at the lane worktree works"), not as a
  shipped tool.

### 5.4 New re-verify item

None added; the two from decision 16 stand (executor-trial headless
CLI access; CLI install one-liner + hang-bug status).

### 5.5 Receipts: the MW wave (July 16) - autonomy at wave scale

These SUPERSEDE section 4's age disclosure:

- **Six of a seven-unit wave dispatched AND landed in ONE resident
  session** (source commits `c005c2a`, `87d6b37`, `f9a6dfd`, `859f3d3`,
  `9511e8f`, `b6c885f`), all over Channel B - four code units and two
  no-code DIAGNOSIS units. The seventh was DRAFT, gated on product
  rulings only the human + frontier tier could settle - the loop
  correctly did not touch it. Every landing ran the full audit ritual:
  lanes re-run fresh in the lane worktree each time, full diffs read,
  claims spot-checked, integration tests the executor could not run
  (no DB in the lane) run at land time in the main tree.
- **Deliberate ladder descent as a human call, logged:** the named-model
  rung was exhausted mid-cycle, and rather than wait for the reset the
  owner ruled mid-session "run them on auto and you will review them
  as opus" - frontier-tier audit as the stated compensating control
  for cheaper execution. Descents are routine, logged per unit in the
  queue notes, and the model-quality call stayed with the human.
- **DIAGNOSIS blocks run autonomously too:** two audit-scale diagnosis
  units (root cause + evidence, zero code changes, findings preserved
  as committed files) went over the same channel and produced the
  product-ruling questions the human then settled - the
  diagnosis-before-fix rule survived autonomy unchanged.
- **Updated age disclosure for publication:** as of 2026-07-16 the
  autonomous mode has SEVEN landed units (one pilot + a six-unit wave;
  five code, two diagnosis) across two waves and one validated pricing
  probe, vs ~6 weeks and 40+ units for the manual relay. Still young;
  still publish the asymmetry plainly.
