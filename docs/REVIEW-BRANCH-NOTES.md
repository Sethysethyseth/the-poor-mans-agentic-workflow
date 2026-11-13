# Review branch notes - README and workflow review

Committed handoff for cloud agents (the repo ignores `HANDOFF.md`, and a
cloud agent only sees committed files). Current state of the work on branch
`claude/poor-mans-workflow-review-tp9y04`. Read this first, then
`README.md` on this branch. Rewrite this file when the state changes;
delete it before the branch merges - it must not reach `main`.

Last updated: 2026-11-13.

## The goal

Get someone who already pays for one $20 AI plan to take a first step
into agentic coding, then ramp up. The reader is assumed to be a
programmer who has chatted with an AI but never let one work in their
project. (Assumption, not confirmed - see open questions.) Plain wording,
not dumbed down.

## What is on this branch

Only `README.md` and this file differ from `main`. No PR is open; the
owner has not asked for one.

| Commit | What it did |
| --- | --- |
| `4e49349` | First draft: README as "one loop, two dials" |
| `7832ae7` | Added "What lands in your repo"; grouped skills by role |
| `fa10064` | Replaced the dials framing with a ramp for one $20 plan |

## Decisions made

- **The ramp won; the dials lost.** "Two dials" (who builds, who hands
  off) was tried and rejected as the front door: it suits someone who
  already runs the loop, not someone taking a first step. Do not bring it
  back as the main framing.
- **Four levels stay, 0 to 3**, matching the skills, docs and
  `docs/levels.svg`. Each level in the README ends with a "Move up when"
  trigger tied to a pain the reader will feel.
- **Level 2 has two options**: a cheaper model on the same plan, or a
  second $20 plan. Only the second was measured in the receipts.
- **Plain words in the top half**: session, plan, "saves (commits)". Not
  seat, dispatch, lane.
- The owner said the direction is good. The README has not been viewed
  rendered on GitHub by the agent that wrote it.

## Proposed, not done (owner has not ruled on these)

Workflow changes found while reading the skills. The README does not
depend on any of them.

1. The task format exists in three drifting copies (`core/BLOCK.md`,
   `skills/relay-plan/SKILL.md`, the copy setup generates). Keep the one
   in `relay-plan`.
2. `core/` is read by no skill. Delete it, or make setup generate from it.
3. Cut statuses to `DRAFT -> QUEUED -> LANDED <sha>`. The middle two
   cannot be written in manual mode without an extra session, and have
   three spellings across files.
4. `relay-review` is 166 lines doing four jobs. Keep audit and landing;
   move the release gate, failure-to-rule, and builder-committed recovery
   into `references/`.
5. Make `skill-map` optional, drop setup question V1, trim the skill.
6. Vocabulary: "lane" vs "check command", "unit"/"block" vs "task".
   Typos: "task task files" (`core/CONTRACT.md`), "task file file"
   (`skills/relay-setup/SKILL.md`).
7. Legacy at the root: `templates/`, `SETUP.md`, `docs/setup.md`,
   `docs/v6-spine.md`, `docs/v6-content-audit.md`, `docs/tasks/`. Old
   links point at some of these.

Items 1, 2 and 6 are mechanical. Items 3 and 4 change behavior and need
the owner's call first.

## Unverified claims in the README

- "Most $20 plans already include an agent" - not checked per vendor.
- "Cheaper model, same plan" stays at $20 - `docs/economics.md` does not
  back this for tools other than Claude.

## Open questions for the owner

- Is the typical reader a programmer new to agents, or someone who has
  never used git? The second needs a gentler Level 0.
- Does the audience description above match what was meant?

## Working rules for this repo

- Commit and push to this branch only. No PR unless the owner asks.
- Commit subjects follow the existing style: `docs: ...`, `skill: ...`.
- `docs/pick-your-level.html` and `docs/how-it-works.html` are served
  from GitHub Pages off `main`; README links point at the live pages.
