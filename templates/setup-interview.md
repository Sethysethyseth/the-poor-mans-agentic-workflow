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
  `npm test`" on sight. (At Level 1 this spends part of one usage window -
  a fair one-time cost.)

**The guard either way: the conversation is never the record.** However an
answer was reached, it lands IN THIS FILE before anything is generated -
so your choices are versioned, re-consultable when you move levels or
driving modes, and generation is reproducible from this file alone.

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
- **Executor app** - LEVEL-AWARE, and the timing matters:
  - Level 2, 3, or 4: install and subscribe to the executor app now
    (Cursor Pro ~$20/mo, cancel anytime).
  - Level 1: **WAIT - do not subscribe yet.** The test month's value
    comes from feeling the Level 1 squeeze first
    (`checklists/test-month-playbook.md` says when to pull the trigger).
    *(As of 2026-07-18, the free Pro trial is removed - staff-confirmed
    2026-07-03; the free Hobby tier is a taste of the editor, not a
    viable executor seat.)*
  `Answer: per my level (L1 below)`
- **Executor CLI** - *(Level 4 / autonomous driving mode only)* - the
  headless command-line form of the executor app, so the resident seat
  can dispatch blocks itself. Install + log in once, and create the lane
  worktree parent directory OUTSIDE cloud-synced folders (measured setup:
  ~10 minutes total). Skip entirely on manual driving mode.
  `Answer: n/a (manual mode)`
- **Git** - required at every level; the whole protocol lives in a git
  repo. `Answer: installed`
- **Project runtime** - whatever your project needs to run its check
  lanes (Node, Python, Rust, ...). `Answer: <installed / list what's missing>`
- **Repo location** - cloud-synced folders (OneDrive/Dropbox/Drive) cause
  file-lock hangs and stale reads; a documented scar. The repo should
  live outside sync - and worktrees MUST.
  `Answer: repo is outside cloud sync (if not: move or exclude it before the first worktree)`

## Section 1 - which level, which driving mode?

Controls what the generated files call "the executor" in your head (they
name roles either way), and which vocabulary the loop docs use (sessions
vs seats). Generated files stay valid unchanged if you move levels or
driving modes later - that's a hard property, not luck.

*(Level 0 - one agent, no protocol - generates nothing; you run this
manifest when you enter Level 1.)*

- **L1. Level** - 1 = the shallow end: solo planner-seat, roles separated
  by session; 2 = waist deep: the paid test month (~$20 + $20 for one
  month, measure the second seat's value); 3 = the deep end: the full
  two-seat relay; 4 = open water: Level 3 driven autonomously (see D1).
  **Default: Level 1** (cheapest, teaches the protocol, and the ladder is
  designed to be climbed from here).
  `Answer: Level 1`
- **L2. Model-tier vocabulary** - task blocks carry a `MODEL:` header so
  the dispatch decision is one glance. Name your tiers.
  **Default:** `frontier | mid | cheap` (Level 1: your seat's model picker,
  e.g. frontier for planning sessions, mid for executor sessions; Levels
  2-4: the executor app's model selection).
  `Answer: frontier | mid | cheap`
- **D1. Driving mode** - MANUAL = you are the message bus: one pointer
  line dispatches each block, one line sends it to review. AUTONOMOUS =
  the resident reviewer seat dispatches blocks itself via the executor's
  headless CLI, monitors, audits, lands, and dispatches the next; you
  keep authoring go-ahead, bug reports, smoke sign-off, and every gate
  item. Answering `autonomous` adds `templates/dispatch-ritual.md` to the
  generated set and the executor-CLI items to Section 0 - and nothing
  else changes: both modes execute the same block files verbatim, so
  switching DOWN later needs no regeneration (stop dispatching and point
  by hand, mid-wave if you like), and switching UP is one re-run of this
  manifest with this answer flipped. Requires the full two-seat stack
  (Level 4 = Level 3 + this answer); it is also the youngest part of the
  workflow - drive the loop manually first.
  **Default: MANUAL.**
  `Answer: manual`

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
  **Default: name what exists - and BUILD A MINIMAL ONE if nothing does.**
  The lane is what the reviewer re-runs fresh, so a setup without one
  hands you the protocol's most load-bearing step with nothing to run:
  executor evidence degrades to "show the change running" and review
  degrades to reading a diff. Rather than record that and move on, setup
  creates the smallest lane that can actually fail - the build succeeds,
  the entry point imports, the CLI answers `--help`, the links resolve;
  whatever proves in ONE command that this project is not broken.
  Coverage is not the goal and this is not a testing strategy - a lane
  you can run and trust is. *(Escape hatch, kept on purpose: answer
  `none yet` and the generated files carry the "show it running" evidence
  rule plus a standing TODO. It is a visibly weaker setup; it stays
  documented rather than hidden.)*
  `Answer: build a minimal lane if none exists`
- **P2a. Lane falsifiability** - a lane that cannot fail is worse than no
  lane at all: it prints green over an unproven tree, which is the exact
  defect class the review gate exists to catch, now wearing a checkmark.
  So any lane created during setup is proven RED before it is accepted -
  break something trivial, run it, watch it fail, revert, watch it pass -
  and that evidence goes in the delivery report like any other criterion.
  **Default: ON. Not deletable for lanes this setup creates**; a lane
  nobody has watched fail is an unverified claim, and unverified claims
  are refused everywhere else in this workflow.
  `Answer: ON`
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
     gotchas. Every "checks green" parameterized to P2 - including a
     lane this setup creates, which is named here like any other; only
     if P2 was answered `none yet` (the escape hatch) do you write the
     degraded evidence rule AND the standing TODO.
   - `<S1>` + `<S2>` (from `templates/HANDOFF.md`) - the work-state file
     with "Next action (human):" pre-filled (see step 4) and an empty
     archive.
   - `<S4>/README.md`, `<S4>/_TEMPLATE.md`, `<S4>/QUEUE.md` (from
     `templates/tasks-README.md` + `templates/task-block.md`) - the
     queue, with the standing footer verbatim and MODEL: vocabulary from
     L2.
   - *(Only if D1 = autonomous)* the dispatch ritual (from
     `templates/dispatch-ritual.md`) - the ONE generated file that
     carries the executor's concrete CLI invocation, parameterized from
     the Section 0 executor answers. Changing executors later
     regenerates this one file; the protocol files (blocks, queue,
     state, reports) still need zero edits.
   - `<S4>/u0-hello-relay.md` - the starter block for the ~15-minute
     first lap in `docs/setup.md`. P2 decides which of two shapes it
     takes, and both are sized for the same lap:
     - **A lane already exists:** a trivial change (e.g. add one line to
       the project README) whose acceptance criteria include running
       that lane - so the first lap exercises the verification spine,
       not just the choreography.
     - **P2 asked for a lane to be built:** the block ESTABLISHES it.
       CHANGE names the lane command recorded in P2 and what it must
       cover; ACCEPTANCE CRITERIA are the P2a falsifiability proof - the
       delivery report must show the lane FAILING against a deliberate
       trivial break, then PASSING once reverted. The reviewer re-runs
       both halves. A lane that only ever showed green is a bounce.
   - A `.gitignore` entry for `DELIVERY.md`.

   **Check-lane ordering, so it isn't rediscovered every setup:** the
   lane's COMMAND is decided at manifest time (step 3) and written into
   P2, so `AGENTS.md` can name it like any other lane; the lane itself is
   BUILT during the lap, through the loop. That split is deliberate - the
   adopter's first unit produces the instrument every later review
   depends on, which is both the cheapest time to add it and the clearest
   demonstration of what the loop is for. If building it needs a package
   installed, that is a G5 gate item and the human runs it.
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
level-mobility guarantee. Tool names live only in Section 0 and
`docs/setup.md` - with exactly one stated carve-out: the generated
dispatch ritual necessarily carries the executor's concrete CLI
invocation (it IS the pointer the human used to be).
