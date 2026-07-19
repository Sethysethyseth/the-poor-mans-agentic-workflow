# Fan-out dispatch - design intuition + first receipt (2026-07-18)

**Status:** internal design note (source-material tier - deleted at
pre-publish; its content feeds a future docs/autonomous.md section or its
own page IF Seth greenlights publishing the pattern). Written by the
frontier seat on its last session, at Seth's direction ("high functioning
frontier models will split multiple agents... i have an idea to integrate
cursor into this... add your intuition onto this"). Seth's fuller idea is
NOT yet captured - the next session should ask for it and design against
this note.

## The receipt (what actually happened today)

One frontier session dispatched FOUR executor agents in one sitting,
against the workflow's own public repo:

- 3 in parallel, each in its own git worktree off the same base branch:
  one content unit (the receipts/evidence page, opus tier), two
  report-only units (a live web re-verify sweep + a full pre-publish tree
  audit, auto tier).
- A 4th content unit (the Level 2 rewrite) serialized behind the review
  of the first, because their files overlap.
- All four delivered clean on the first pass. Zero collisions - by
  construction, not by luck. Frontier-seat spend: authoring four task
  blocks, reading two reports, one audit-and-land pass per content unit.
- The re-verify lane paid for the whole day by itself: it caught the
  removed Cursor Pro trial (a launch BLOCKER in the Level 2 story) the
  same hour the audit lane was checking link integrity.

## The core intuition: parallelism has a grain

1. **The unit of safe parallelism is the worktree, not the file list.**
   One agent per worktree, always. This generalizes the "two agents, one
   working tree" scar to N agents: the scar never happens because no two
   agents ever share a tree.

2. **Two lane classes, different physics:**
   - **CONTENT lanes** produce repo changes. They parallelize only when
     their files-to-touch are disjoint (if in doubt, they collide -
     serialize), and they always serialize through the single reviewer
     at landing.
   - **REPORT lanes** produce a report file and touch nothing. They are
     embarrassingly parallel: zero merge risk, no landing ritual, the
     "delivery" is just reading. Verification sweeps, audits, web
     research, and diagnosis blocks are ALL report lanes - the protocol
     already has them; fan-out just runs several at once.
   Report lanes are the cheap on-ramp: an adopter's first fan-out should
   be two report lanes, not two content lanes.

3. **Many hands, one gate.** Fan-out multiplies executors, never
   reviewers. Audit, commit, push, state upkeep stay single-file through
   one seat. If landing feels like the bottleneck, that is the design
   working: review capacity is the real budget. Set dispatch width by
   what you can audit while it's fresh, not by how many agents you can
   afford to run.

4. **Human attention still batches.** Same as autonomous mode: dispatch
   N, then ONE consolidated review pass, one smoke checklist. Fan-out
   must not multiply the number of times the human gets pinged.

5. **The economics:** N parallel cheap agents burn executor-seat quota
   concurrently, but wall-clock compresses and the planner seat's token
   cost stays roughly flat - authoring blocks and auditing deliveries is
   the same work whether the executors ran serial or parallel. The real
   win is frontier-session utilization: a frontier seat that would idle
   waiting on one executor instead authors the next block while three
   run. (Today's session is the receipt.)

6. **Model mixing is per-lane and free.** The MODEL header already
   carries it: judgment lane on the named tier, mechanical/report lanes
   on auto. Fan-out makes the header earn more.

7. **Failure isolation comes free.** A hung or quota-dead agent strands
   only its own lane; blocks are self-contained, so re-dispatch on
   another ladder rung is safe by construction. The existing fallback
   ladder needs zero changes.

## Guardrails that MUST survive any fan-out design

- The gate never fans out: no parallel agent may touch gate items
  (merges to main, prod, migrations, publish flips).
- Report lanes may not edit repo files - that prohibition is exactly
  what makes them safe to parallelize without thought.
- Two-bounce stop applies per lane; a wave's end still hands to ONE
  frontier gate, never to the loop.
- Wave progress messaging: "n/N" counting needs a convention for
  parallel lanes (suggest: count landings, not dispatches).

## Where it could ship (pending Seth)

An advanced pattern at the top of the ladder - either a section in
docs/autonomous.md ("fan-out dispatch: N lanes, one gate") or a short
page of its own. Age disclosure required: as of 2026-07-18 the receipts
are ONE session (four units: evidence page, verify sweep, tree audit,
Level 2 rewrite). Do not oversell.

## Seth's integration idea - placeholder

Seth stated he has an idea for integrating Cursor into this multi-agent
picture beyond what's captured here. Not yet specified. Candidate shapes
to explore when he shares it (guesses, not his words): Cursor as a
standing pool the resident reviewer fans out to; per-lane cloud agents
(Channel A) once usage-based pricing economics make sense; mixed fleets
(Claude subagents for report lanes, Cursor for content lanes). The next
session should get the idea from Seth FIRST, then reconcile it with the
grain above.
