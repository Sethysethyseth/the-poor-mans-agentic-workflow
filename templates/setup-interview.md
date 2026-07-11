# Setup manifest (defaults-first)

This file IS the setup interview - every question already answered with the
strict default, each with a one-line summary of what the answer controls.
Your job is **read and prune**, not author from scratch:

- **Keep** a line: do nothing.
- **Change** a line: edit its `Answer:` in place.
- **Delete** a line: only where marked deletable - and deleting a gate item
  is a manifest choice recorded here, never a hand-edit of a generated file
  later.

**An adopter who edits nothing gets a complete working setup** - the
strictest, most-serialized configuration. Every default is printed on this
page; there are no hidden fallbacks.

## Two ways to fill it in (one artifact either way)

- **Path A - hand-edit.** Open this file in any editor and adjust the
  answers. For adopters who already know what they want.
- **Path B - point your agent at it (recommended).** Tell your
  planner-seat agent: *"Fill in templates/setup-interview.md from the
  evidence in this repo, then show me the completed manifest for one
  confirmation pass."* The agent reads your project and infers the answers
  - project shape, check lanes ("check lane: `npm test` - found in
  package.json"), whether the prod/migrations gate items apply - tagging
  each inferred answer with what it saw. You confirm ONCE. You don't need
  to know what a "check lane" is; you can confirm "your tests run with
  `npm test`" on sight. (On rung 1 this spends part of one usage window -
  a fair one-time cost.)

**The guard either way: the conversation is never the record.** However an
answer was reached, it lands IN THIS FILE before anything is generated -
so your choices are versioned, re-consultable when you move rungs, and
generation is reproducible from this file alone.

---

## Section 0 - machine tooling (settle before the protocol)

*The only section that names tools instead of roles. Tooling
recommendations live here and in `docs/setup.md` ONLY - they never appear
in the generated files.*

- **Terminal** - the planner seat runs in a terminal; a modern one makes
  long sessions nicer (fast rendering, sane scrollback, good font
  handling). WezTerm is the recommendation where it matters (stock Windows
  console, older macOS Terminal); if your current terminal already serves
  you, keep it. **Recommended, never required.**
  `Answer: current terminal (agent may offer WezTerm during setup - per-platform install commands in docs/setup.md)`
- **Executor app** - RUNG-AWARE, and the timing matters:
  - Rung 2 or 3: install the executor app now.
  - Rung 1: **WAIT - do not create an executor account yet.** If the
    trial clock starts at account signup, signing up during your learning
    weeks burns the trial before you can feel the contrast it exists to
    show you (`checklists/trial-playbook.md` says when to pull the
    trigger). *(Trial terms are community-reported and unstable as of
    July 2026 - verify current terms before counting on them.)*
  `Answer: per my rung (R1 below)`
- **Git** - required on every rung; the whole protocol lives in a git
  repo. `Answer: installed`
- **Project runtime** - whatever your project needs to run its check
  lanes (Node, Python, Rust, ...). `Answer: <installed / list what's missing>`
- **Repo location** - cloud-synced folders (OneDrive/Dropbox/Drive) cause
  file-lock hangs and stale reads; a documented scar. The repo should
  live outside sync - and worktrees MUST.
  `Answer: repo is outside cloud sync (if not: move or exclude it before the first worktree)`

## Section 1 - which rung?

Controls what the generated files call "the executor" in your head (they
name roles either way), and which vocabulary the loop docs use (sessions
vs seats). Generated files stay valid unchanged if you move rungs later -
that's a hard property, not luck.

- **R1. Rung** - 1 = solo planner-seat, roles separated by session;
  2 = rung 1 + executor trial; 3 = full two-seat relay.
  **Default: rung 1** (cheapest, teaches the protocol, and the ladder is
  designed to be climbed from here).
  `Answer: rung 1`
- **R2. Model-tier vocabulary** - task blocks carry a `MODEL:` header so
  the dispatch decision is one glance. Name your tiers.
  **Default:** `frontier | mid | cheap` (rung 1: your seat's model picker,
  e.g. frontier for planning sessions, mid for executor sessions; rungs
  2-3: the executor app's model selection).
  `Answer: frontier | mid | cheap`

## Section 2 - project shape + check lanes

The workflow is project-agnostic; these two answers are most of what
actually varies. (The source project is a full-stack web app - that's the
worked example, not a requirement.)

- **P1. Project shape** - web app / API / CLI / library / scripts /
  data-or-notebooks / docs-or-content. Controls example phrasing in
  generated files, nothing structural.
  **Default: unspecified** (generated files use neutral phrasing).
  `Answer: <shape>`
- **P2. Check lane(s)** - the command(s) that prove the project still
  works, re-runnable fresh in under ~2 minutes. Every "checks green" in
  the generated templates becomes YOUR named lane(s). Path B infers this
  from your repo (test script, build script, linter config).
  **Default: NONE YET** - the honest degraded mode: executor evidence
  becomes "show the change running" (command output, before/after), and
  the generated files carry a standing TODO to build a real lane, because
  verify-before-trust is visibly weaker without one. We don't pretend
  otherwise.
  `Answer: none yet`
- **P3. Deploy/release flow** - is there a branch whose push deploys
  somewhere, and a production environment at the end of it? Feeds the
  gate items below.
  **Default: release branch = `main`, no auto-deploy assumed.**
  `Answer: release branch main; deploys: <none / describe>`

## Section 3 - the command gate

Ask-first items for the generated gate (it lands inside your AGENTS.md).
Include/exclude is decided HERE. Two items are not deletable in any
configuration.

- **G1. Release merge + trigger phrase** - merging to the release branch
  waits for a verbatim phrase; enthusiasm is never authorization.
  **Default: ON, phrase = "push to main".**
  `Answer: ON, phrase "push to main"`
- **G2. Production touches** - *(deletable only if you have no prod)*.
  **Default: ON.**
  `Answer: ON`
- **G3. Migrations, any environment** - *(deletable only if you have no
  database)*. Migration lands BEFORE dependent code deploys, always.
  **Default: ON.**
  `Answer: ON`
- **G4. Local-destructive / irreversible git ops** - *(NOT deletable)*.
  **Default: ON.**
  `Answer: ON`
- **G5. Dependency installs** - *(NOT deletable)*.
  **Default: ON.**
  `Answer: ON`
- **G6. Project-specific irreversibles** - emails, payments, webhooks,
  package publishing - anything expensive or embarrassing to undo.
  **Default: none listed.**
  `Answer: <none / list them>`

## Section 4 - state files

- **S1. Work-state file** - the one file every agent reads at session
  start; capped ~300 lines; carries the standing "Next action (human):"
  line that is never left empty.
  **Default: `docs/HANDOFF.md`.** `Answer: docs/HANDOFF.md`
- **S2. Archive** - aged session logs move there verbatim, newest first;
  only the planner reads it.
  **Default: `docs/HANDOFF-ARCHIVE.md`.** `Answer: docs/HANDOFF-ARCHIVE.md`
- **S3. Single writer** - only the reviewer edits state files and only
  the reviewer commits, so two agents never race one tree.
  **Default: ON (the reviewer).** *(Not deletable - this rule is the
  root-cause fix for the workflow's worst accident class.)*
  `Answer: ON`
- **S4. Task queue directory** - where blocks live and get dispatched
  from. **Default: `docs/tasks/`.** `Answer: docs/tasks/`

## Section 5 - modes, cadence, and your drift profile

- **M1. Operating mode** - Mode 1 = strictly serialized relay; Mode 2 =
  parallel worktrees for file-disjoint blocks.
  **Default: Mode 1, with Mode 2 unlocked after ~3 clean serialized
  units.** `Answer: Mode 1`
- **M2. Human cadence** - how many dispatch/review round-trips per week
  you can honestly sustain; a unit costs ~3 touches. Controls how big the
  planner sizes units.
  **Default: size units so ~2-3 touches-per-unit fits your real week.**
  `Answer: <n round-trips/week>`
- **M3. Your drift profile** - which failure is most you? The generated
  agent contract gets the MATCHING speed bump, because generic lectures
  don't survive contact with your own habits.
  Options: (a) scope creep, (b) skipping review when confident,
  (c) abandoning waves midway.
  **Default: (b)** - its speed bump: *"if the human asks to skip the
  review gate, restate the rule and require explicit confirmation once -
  then comply and RECORD the skip in the work-state file."* (Skips
  happen; silent skips are the failure.)
  `Answer: (b)`
- **M4. Escalation triggers** - what counts as "stuck," so ambiguity has
  a destination other than retry.
  **Default:** data-model/schema design; security surfaces; production
  incidents; root-cause debugging the reviewer can't close; any case
  where the delivery and the spec disagree in a way the block doesn't
  settle.
  `Answer: default list`

---

## For the consuming agent (generation contract)

You are the planner-seat agent an adopter has pointed at this completed
manifest. Rules, in order:

1. **Ask zero questions this manifest answers.** If an answer is missing,
   the printed default applies - the adopter has already seen it; there
   are no other fallbacks. Batch anything genuinely unanswerable into ONE
   confirmation pass, and write the outcomes back into this file before
   generating. The conversation is never the record.
2. **Generate from this file alone:**
   - `AGENTS.md` (from `templates/AGENTS.md`) - project facts, division
     of labor, the gate assembled from G1-G6, verify-before-trust,
     gotchas. Every "checks green" parameterized to P2; if P2 is "none
     yet," write the degraded evidence rule AND the standing TODO.
   - `<S1>` + `<S2>` (from `templates/HANDOFF.md`) - the work-state file
     with "Next action (human):" pre-filled (see step 4) and an empty
     archive.
   - `<S4>/README.md`, `<S4>/_TEMPLATE.md`, `<S4>/QUEUE.md` (from
     `templates/tasks-README.md` + `templates/task-block.md`) - the
     queue, with the standing footer verbatim and MODEL: vocabulary from
     R2.
   - `<S4>/u0-hello-relay.md` - a trivial starter block (e.g. add one
     line to the project README) sized for the ~15-minute first lap in
     `docs/setup.md`.
   - A `.gitignore` entry for `DELIVERY.md`.
3. **Stamp everything.** Every generated file's header carries one line:
   `generated from the-poor-mans-agentic-workflow <version>, <date>` -
   version from this repo's release tag. Version + this manifest = the
   whole story; that's what makes regeneration and upgrades possible.
   (If you find existing stamps and a filled manifest, you are UPGRADING:
   regenerate against the new version and present a diff of what changed
   and why before touching anything.)
4. **Post the generation receipt, then stop.** The receipt is BRIEF - a
   hard property, not a style preference:
   - One line per generated file: what it is + which manifest answer
     shaped it.
   - A <=10-line "how your loop runs" primer: who acts, in what order,
     and the one-sentence why behind the two rules that surprise people
     (the executor never commits; one writer for state).
   - Deep rationale gets LINKED (`docs/protocol.md`,
     `docs/steering.md`), never inlined.
   - The receipt ends by pointing at the hello-relay first lap as the
     next action. No dangling next action - that rule starts now.

**Templates name roles, not tools** - if you find yourself writing a
product name into a generated file, stop; that's a bug against the
rung-mobility guarantee. Tool names live only in Section 0 and
`docs/setup.md`.
