# SETUP.md - the agent-facing setup contract

**If you are a human:** you don't need to read this file. Paste
`Read <link-to-this-file> and set me up` into your planner-seat agent in
your project's folder (the [README quickstart](README.md#quickstart-one-paste)
has the exact line), or follow the human-readable path at
[docs/setup.md](docs/setup.md) instead. Both routes produce the same
setup from the same files - there is no second flow to drift.

**If you are an agent:** the human has pointed you here to set up the
relay workflow in THEIR project. This file is your task block: ordered
steps, done conditions, and a stop condition. It is agent-agnostic - any
planner-seat agent that can read files, fetch URLs, and write files can
execute it; nothing below depends on a vendor-specific feature. It
ORCHESTRATES the repo's content and never restates it: when a step
points at a file, that file is the source of truth - read it and follow
it, don't work from memory of this page.

**Fetching this repo's files:** if the workflow repo is cloned locally,
use those paths. Otherwise fetch raw files from
`https://raw.githubusercontent.com/Sethysethyseth/the-poor-mans-agentic-workflow/main/<path>`
as each step needs them. You never need to clone the whole repo.

---

## Standing rules for this setup run

- **Ask before installing anything** (tools, apps, packages), one
  batched confirmation where possible. Recommendations are offers.
- **The conversation is never the record.** Every decision lands in the
  manifest file (step 3) before you generate anything from it.
- **Don't push, don't publish, don't change repo settings.** Offer one
  local commit of the generated files at the end; the human decides.
- If the human's project contradicts an instruction here (already has a
  conflicting file, an unusual layout), say so and ask - never silently
  overwrite work you didn't create.

## Step 1 - orient (and detect the upgrade case)

Confirm you are in the human's project folder. Not a git repo yet?
Offer `git init` - the whole protocol lives in git; this is the one
install-adjacent action that needs no debate, but still confirm.

**Upgrade detection, before anything else:** if the project already
contains generated files carrying a
`generated from the-poor-mans-agentic-workflow` stamp AND a filled
manifest, this run is an UPGRADE, not a first setup. Follow the upgrade
rule in the manifest's generation contract
([templates/setup-interview.md](templates/setup-interview.md), "For the
consuming agent"): regenerate against the current version and **present
a diff of what would change, and why, before touching anything**. Then
skip to step 6.

## Step 2 - machine tooling (step 0 of the manifest)

Walk the tooling list in
[docs/setup.md](docs/setup.md#step-0---machine-tooling-before-any-protocol-content)
- terminal, git, project runtime, repo location, executor timing. Use
that page's install commands and links verbatim; do not reconstruct
install one-liners from memory (they are timestamped there for a
reason). Three points of judgment:

- **Terminal:** if the human's current terminal is weak for long agent
  sessions, offer the recommended upgrade - and if they take it,
  relaunching into the new terminal mid-setup is fine; this contract is
  a file, so a fresh session resumes by re-reading it and continuing
  from the manifest's recorded state.
- **Executor app timing is level-aware:** do NOT have the human subscribe
  to the executor before the level question (step 3) is answered - at the
  lower levels, signing up early starts paying before the playbook's
  timing.
- **Repo location:** if the project sits inside a cloud-synced folder,
  surface the scar ([docs/scar-tissue.md](docs/scar-tissue.md)) and
  offer the move/exclude now - before any worktree ever exists.

**Done when:** git + runtime confirmed, terminal settled, repo location
checked, and no executor account has been created ahead of its level.

## Step 3 - the manifest (level question included)

1. Copy [templates/setup-interview.md](templates/setup-interview.md)
   into the project (conventional home: `docs/setup-manifest.md`).
2. Ask the level question first - present the five levels in one screen
   (the [README ladder](README.md#pick-your-level) is the source; one
   line per level, cost + what-it-teaches), plus the driving-mode
   question if they pick the top level. Record both in the manifest.
3. Fill the REST of the manifest **from the project's evidence** (the
   manifest's "Path B"): read the repo - test scripts, build config,
   deploy hints, database presence - and write inferred answers in
   place, each tagged with what you saw. Anything the evidence can't
   answer keeps its printed default.
4. **The check lane (P2) is the one answer worth real effort** - it is
   what the reviewer re-runs on every unit from here on. Find the
   project's lane if it has one. If it has none, do NOT just record the
   absence: propose the smallest command that could actually fail for
   this project (build succeeds, entry point imports, CLI answers
   `--help`, links resolve) and write THAT command into P2. You are
   deciding the command now; the hello-relay block builds it in step 6.
   Name it in the confirmation pass so the human can veto a lane that
   proves nothing.
5. Show the completed manifest for **ONE confirmation pass** - a short
   summary of what you inferred and which defaults stand, not an
   interrogation. Write any corrections back into the file.

**Done when:** the manifest file in the project holds every answer, the
check lane is named (found or proposed), and the human has confirmed it
once.

## Step 4 - generate

Execute the manifest's own generation contract
([templates/setup-interview.md](templates/setup-interview.md), section
"For the consuming agent") - it defines the file list, the
parameterization, the stamp format, and the receipt. That section is
the authority; this step adds nothing to it. Fetch the referenced
templates from this repo as inputs.

**Done when:** every file the contract requires for the manifest's
answers exists in the project, stamped, and roles-not-tools holds (the
generated dispatch ritual, if any, is the one stated exception).

## Step 5 - the generation receipt

Post the receipt exactly as the generation contract specifies: one line
per file, the <=10-line loop primer, links for depth, and the
hello-relay lap named as the next action. Then offer that one local
commit of the generated files.

## Step 6 - the hello-relay lap (the smoke test)

Setup isn't done because files exist; it's done when the loop has run
once. Walk the human through the ~15-minute first lap in
[docs/setup.md](docs/setup.md#hello-relay---the-first-lap-15-minutes-every-level-from-1-up)
using the generated starter block. Your role during the lap is
narrator: tell them what to paste where, and after each hop, point at
what just happened (the stop without committing, the audit, the single
commit, the state file's next-action line). If this lap is building the
check lane, the moment worth narrating is the lane going RED - that is
the proof it can fail, and it is the only reason a later green means
anything. For an upgrade run, the lap is optional - offer it as a
regression check.

**Done when:** one full lap is complete - block dispatched, executor
stopped uncommitted with a delivery report, reviewer audited and made
exactly one commit, and the state file names the next action. If the lap
built the check lane, also: the lane exists, the delivery report shows
it red-then-green, and the reviewer re-ran both halves.

## Stop condition

Stop when step 6's done condition holds (or the human declines the
lap). Close by pointing at the state file's "Next action (human):" line
- the no-dangling-next-action rule starts with you. Do not queue real
work, author real blocks, or start the loop yourself: setup ends where
the human's own roadmap begins.
