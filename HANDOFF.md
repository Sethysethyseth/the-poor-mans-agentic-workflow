# HANDOFF - roadmap-setup session state (for the next chat)

**Written:** 2026-07-04, by the Claude Code planner seat (workout-db session).
**Read this + BRIEF.md first.** This file is session state, NOT publishable
content - it goes on the pre-publish deletion checklist along with
`source-material/`.

## Goal of the interrupted session

Finish setting up the roadmap for this repo so the buildout (a Claude Code
web session following BRIEF.md) can start with zero open questions.

## Current state

- Buildout has NOT started: no PRs, no issues, only the two `shell:` commits
  (plus this handoff).
- Assessment of pre-buildout blockers was delivered to Seth; he reset the
  chat before answering the decisions. Nothing has been decided or changed
  since the assessment below.

## The three blockers found (verified 2026-07-04, in priority order)

1. **`source-material/` is one workflow revision stale.** The scrubbed
   copies were snapshotted 2026-07-02 and predate two 2026-07-03 changes in
   the source project (workout-db):
   - `tracking-doc.md` is missing BOTH July 3 log entries: (a) the
     smoke-testing lane change (visual sign-off happens on the staging-branch
     cloud deploy, after the commit, gating the next unit and the release);
     (b) relay v3 (planner seat split by model tier).
   - `claude-md.md` is the pre-v3 CLAUDE.md - it still says "Sonnet chat =
     the cheap lane" instead of Sonnet as the resident driver.
   - Fix: re-scrub and re-copy the changed files from workout-db
     (`docs/specs/poor-mans-agentic-workflow.md`, `CLAUDE.md`; check
     `AGENTS.md` for drift too). One commit here.

2. **BRIEF.md tells the v2 (two-seat) story.** Relay v3's insight - the
   planner seat is really TWO roles, frontier intelligence rented by the
   session (block authoring + one pre-release review) plus a cheap resident
   model for the loop (per-unit checks, commits, dispatch) - is current
   reality in the source project and arguably the strongest economics
   content the public repo has. The July 3 tracking-doc entry already wrote
   the generalization line for exactly this purpose. Seth must decide:
   publish the two-seat story (simpler) or the v3 three-role version
   (current). Recommendation on record: v3, framed as the refinement of the
   two-seat idea. BRIEF.md section 1 needs a paragraph either way.

3. **The five batched decisions in BRIEF.md step 1 should be settled with
   Seth in chat, then written INTO BRIEF.md,** removing the web agent's
   interview round-trip: final repo name (with GitHub collision check),
   license (MIT vs CC BY 4.0), tool-specific vs tool-agnostic framing,
   whether to name LogChamp in the receipts, README tone (offer 2 sample
   intro registers). Plus the v2/v3 question above as a sixth.

Not blocking: tracking-doc section 6 pilot questions (Mode 1 vs Mode 2
payoff data, minimum viable command gate) - the buildout carries those as
open items.

## Suggested order for the next session

1. Put the six decisions to Seth (batched, one message).
2. Refresh `source-material/` from workout-db (re-scrub; infra identifiers
   to placeholders like `<prod-db-id>` - see existing files for the pattern).
3. Rewrite BRIEF.md to carry the answers + v3; delete its step-1 interview
   if all questions got answered.
4. Commit + push here, then tell Seth the repo is ready to point a web
   session at. Repo stays PRIVATE - visibility is Seth's call alone.

## Pointers

- Source project: `C:\Users\Sethy\OneDrive\Desktop\Cursor\workout-db`
  (extraction source: `docs/specs/poor-mans-agentic-workflow.md`).
- This clone lives outside OneDrive deliberately (cloud-sync file locks -
  see the scar in the tracking doc). Keep it that way.
