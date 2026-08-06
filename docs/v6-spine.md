# v6 - the spine

Working design document for the v6 rework. Decided 2026-08-06. This file
describes the shape; it is not itself the contract. It gets deleted or
folded into `docs/protocol.md` when v6 lands.

---

## The one move that makes everything else legal

v5 stamped the same rules into every task block - the stop-condition
footer "kept verbatim," the delivery schema restated in four files, the
contract re-explained per dispatch. That duplication had a real cause:
**the executor might be a browser chat with no access to the repo.** If
it can't read `AGENTS.md`, every rule has to travel inside the block.

Dropping the browser seat removes that constraint. Every executor is now
a coding agent sitting in the repo, which means a block can *point* at
the contract instead of carrying it. So the two objectives turn out to be
one move:

> **Objective 2 (drop the browser) is what makes Objective 1 (stop
> repeating yourself, disclose progressively) safe to do.**

Everything below follows from that.

---

## The six shifts, as concrete changes

| Shift | v5 | v6 |
|---|---|---|
| Rules → Judgement | Six `Do NOT` lines stamped in every block | Two real invariants stated with their reason; the rest is declared intent the agent can reason about |
| Examples → Interfaces | Small blocks spec line-level detail | The check lane is the interface; `relay-lane` builds one and proves it red-then-green |
| Upfront → Progressive disclosure | 152-line contract + up-to-300-line state, always loaded | 66-line contract + ~40-line state; everything else loads on trigger |
| Repeat yourself → Simple descriptions | Footer + delivery schema duplicated across 4 files | Each lives in exactly one file; blocks reference it |
| CLAUDE.md memory → Auto-memory | Hand-rolled state file + capped archive + manual rotation ritual | Auto-memory is the fast path; repo files stay the portable source of truth |
| Simple specs → Rich references | Paraphrased context inside blocks | Blocks point at the real source: the spec section, the data file, the upstream doc |

### The always-loaded budget

The number that matters, because it is what every agent pays on every
session:

- **v5:** `AGENTS.md` 152 lines + work-state file capped at ~300 = **up to
  452 lines, every session, every role.**
- **v6:** contract 66 (measured, after the template note is stripped at
  generation) + state ~40 = **~106 lines.**

Roughly a 4x cut, and nothing is deleted - it moves behind a trigger.

---

## Three layers

```
core/       one canonical source     - the contract, the block interface, the protocol
skills/     the verbs                - loaded when the situation arises
adapters/   thin per-tool renders    - .claude/, .cursor/, plain AGENTS.md
```

**`core/` is the only place content lives.** Adapters do not restate it;
they point at it in whatever dialect their tool reads. That is what makes
Claude Code → Cursor a zero-content-fork move.

### core/

| File | Replaces | Size |
|---|---|---|
| `core/CONTRACT.md` | `templates/AGENTS.md` (152) | 66 (drafted) |
| `core/BLOCK.md` | `templates/task-block.md` (185) | ~60 |
| `core/PROTOCOL.md` | `templates/tasks-README.md` + `docs/protocol.md` | reference, on-demand |
| `core/STATE.md` | `templates/HANDOFF.md` | ~40 capped |

### skills/ - the nine verbs

Prefix `relay-`, matching the vocabulary the docs already use. Each is a
skill directory that renders into whatever the tool supports.

**The loop:**

| Skill | Invoked by | Triggered when | Loads |
|---|---|---|---|
| `relay-plan` | planner | a spec/roadmap unit needs turning into work | steering rules, the wave shape |
| `relay-block` | planner | one block needs authoring, splitting, or re-scoping | `core/BLOCK.md`, diagnosis variant, batching rules |
| `relay-execute` | executor | a block was dispatched | the executor contract, delivery schema, stop condition |
| `relay-review` | reviewer | a delivery is awaiting review | reviewer checklist, verify-before-trust, land-or-bounce |
| `relay-gate` | planner | a wave is ready for the release branch | release review + the trigger-phrase merge |

`relay-review` ends in land **or** bounce - landing is not a separate
verb, because separating them invites landing without auditing.

**Setup and infrastructure:**

| Skill | Invoked by | Triggered when |
|---|---|---|
| `relay-setup` | any | installing or upgrading the workflow in a project |
| `relay-lane` | any | the project has no check lane, or one needs repair |

**Evolution - the part that keeps this current:**

| Skill | Invoked by | Triggered when |
|---|---|---|
| `relay-retro` | reviewer/planner | a wave ended, or an incident happened | 
| `relay-refresh` | any | the volatile facts need re-verifying |

- **`relay-retro`** turns an incident into a contract amendment and a
  `docs/scar-tissue.md` entry - automating by hand what the repo already
  does by discipline. Its rule survives from v5: a gotcha nobody can
  trace to an incident gets deleted.
- **`relay-refresh`** re-verifies the facts that rot - model roster,
  pricing, plan terms, tool capabilities - and restamps only the as-of
  dates it actually checked. This turns the repo's provenance rule
  ("never bump an as-of date you did not personally re-check") from a
  discipline into a lane.

### adapters/

One source, N renders. An adapter is a mapping, not a copy.

| Tool | Render |
|---|---|
| Claude Code | `CLAUDE.md` importing `core/CONTRACT.md`; skills → `.claude/skills/relay-*/SKILL.md`; gate → settings permissions |
| Cursor | `.cursor/rules/` pointing at `core/`; skills → rules with globs |
| Codex / other | plain `AGENTS.md` at root - the emerging cross-tool standard |

**Portability test, and it is a real one:** this rework is executed
across both Claude Code and Cursor, so the claim gets its own receipt.

---

## What changes for the human

The ramp is one spine with a skippable entry point - not two tracks.

| Level | What it is | What you learn |
|---|---|---|
| 0 | one agent, no protocol | what an agent mode actually is |
| 1 | the relay, dispatched by hand | **what context the executor actually gets** - visible only because you hand it over yourself |
| 2 | second seat / second model tier | what a dedicated executor buys, measured |
| 3 | the loop dispatches itself | attention batches to wave scale |

Level 1 keeps copy-paste **on purpose, and says so in the block itself.**
Its justification changed: it is no longer "you're poor, so you're the
bus," it is "you can't debug a bad block until you've seen exactly what
the executor was given." Skipping ahead is allowed and costs you that.

Price becomes an annotation per level, not the organizing spine.

---

## File-by-file disposition

| Current | v6 |
|---|---|
| `README.md` (506) | rewritten, ~170 lines, two checked-in SVGs, `<details>` below the fold |
| `SETUP.md` (155) | → `relay-setup`; root keeps a ~20-line quickstart |
| `templates/AGENTS.md` | → `core/CONTRACT.md` |
| `templates/task-block.md` | → `core/BLOCK.md` |
| `templates/tasks-README.md` | → `core/PROTOCOL.md` |
| `templates/HANDOFF.md` | → `core/STATE.md` |
| `templates/command-gate.md` | → merged into `core/CONTRACT.md` |
| `templates/setup-interview.md` (313) | → `relay-setup` + a short manifest schema |
| `templates/dispatch-ritual.md` | → `relay-dispatch` guidance inside `relay-execute` |
| `templates/usage-tracker.md` | → `docs/economics.md` |
| `checklists/reviewer-checklist.md` | → `relay-review` |
| `checklists/worktree-ritual.md` | → `docs/`, referenced by `relay-execute` |
| `checklists/test-month-playbook.md` | → `docs/economics.md` |
| `checklists/loop-cheat-sheet.md` | **survives** - the one checklist aimed at the human, not an agent |
| `docs/protocol.md` | slimmed into `core/PROTOCOL.md` |
| `docs/setup.md`, `docs/steering.md` | → `relay-setup`, `relay-plan` |
| `docs/autonomous.md` | Level 3 reference |
| `docs/economics.md` | survives, absorbs the price content |
| `docs/receipts.md` + `receipts-data.json` | survive, **re-annotated** (below) |
| `docs/scar-tissue.md` | survives as `relay-retro`'s output target |
| `tools/token-tracker/` | unchanged |
| `LICENSE` | unchanged |

Carried forward from `check-lane-default` (f7ddb8c), unchanged in intent:
the check lane is a built default, not a recorded absence, and any lane
setup creates is proven RED before green. That work becomes `relay-lane`.

---

## Receipts

29 units of evidence were gathered under v5 mechanics - manual paste,
verbatim footers, the state-file rotation ritual. One spine means the
loop in the receipts is still the loop, so they get **re-annotated**
("gathered at Level 1, v5 mechanics"), not re-run.

The condition on that: **v6 must not change what a unit is.** If block
scope, the delivery report, or the review gate change shape, the receipts
stop describing the shipped thing and have to be re-earned. Treat this as
a constraint on the rework, not a note.

---

## Open

1. Does `v6` replace v5 on `main`, or ship as a `v2.0.0` alongside a
   frozen v1 tag? (Leaning: replace - one spine, and v1.0.1 stays tagged
   for anyone who wants it.)
2. `readme-tighten` is to be deleted after mining what it cut as evidence
   of what is droppable.
3. Skill naming: `relay-*` chosen over `pmaw-*` because the docs already
   call the loop "the relay" and it reads as a verb.
