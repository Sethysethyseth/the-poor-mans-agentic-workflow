# source-material/ — ground truth from the source project

Verbatim copies (lightly scrubbed) of the workflow artifacts from the live
project this repo is being extracted from: LogChamp, a solo-dev
analytics-first weightlifting tracker (React/Vite + Express/Prisma/Postgres)
where the two-seat workflow ran in production for real feature work.

**Scrubbing:** infrastructure identifiers (DB hosts, hosting service IDs)
and throwaway staging smoke credentials were replaced with `<placeholders>`
like `<prod-db-id>` at copy time. Nothing else was altered. Never
reconstruct or guess the real values.

**Refreshed 2026-07-07:** all copies re-snapshotted from the source project
at its relay-v4 state (the 2026-07-02 snapshot predated v3 and v4). Two
files added: the queue snapshot and the HANDOFF archive — together they are
the ground truth behind the tracking doc's receipts section (section 8);
every published number must trace to them.

**Extended 2026-07-12:** three files added (nothing re-snapshotted): the
token-savings stats + raw per-commit data measured 2026-07-11 in the source
project, and a receipts addendum recording the workflow events after the
2026-07-07 snapshot (executor substitution, cloud-dispatch variant,
planner-tier refinement, new steering receipts). Where the addendum's
numbers overlap the tracking doc's section 8, the addendum supersedes.

**This directory is read-only reference.** Don't edit it during the
buildout; it gets deleted (with a history squash if needed) on the
pre-publish checklist.

## Inventory

| File | Was (in source repo) | What it is |
| --- | --- | --- |
| `tracking-doc.md` | `docs/specs/poor-mans-agentic-workflow.md` | **Primary source.** Written session-by-session as the extraction source for this repo: pitch, cost model, mechanism map, hard-won rules, REQUIRED honest-positioning content, open questions, dated log. |
| `agents-md.md` | `AGENTS.md` | The shared agent contract both seats read: project context, conventions, division of labor, the command-running gate, verify-before-trust, durable gotchas. Genericize into `templates/AGENTS.md`. |
| `claude-md.md` | `CLAUDE.md` | The planner-seat-specific layer: the two-seat model split ("brain"/"hands"), the relay loop v2, seat-specific environment rules. Note the import pattern: CLAUDE.md holds only planner-specific content and imports AGENTS.md as the single source. |
| `tasks-protocol.md` | `docs/tasks/README.md` | The file-dispatched task queue protocol: the loop, the status lifecycle, the two operating modes (serial relay / parallel worktrees), authoring rules. |
| `task-template-unit.md` | `docs/tasks/_TEMPLATE.md` | The unit-scale task block template with the standing stop-condition footer — per the source project, the single most important part of the format. |
| `task-block-template.md` | `cursor-task-block-template.md` | The original small-scale block format plus the rationale for every section, a worked example, and the unit-scale variant rules. |
| `runbook-excerpts.md` | `docs/RUNBOOK.md` (sections) | The operational rituals: session start, pre-merge checklist, deploy verification, the parallel worktree ritual, safety invariants. |
| `queue-snapshot.md` | `docs/tasks/QUEUE.md` | The task-queue index at pilot end (2026-07-07): every landed unit with its SHA and per-unit review outcome. Half of the receipts ground truth. |
| `handoff-archive.md` | `docs/HANDOFF-ARCHIVE.md` | The verbatim session-log history: reviewer fixes, escalations, sequencing flags, the recorded review skip, the wrong-belief correction. The other half of the receipts ground truth. |
| `cursor-token-savings-stats.md` | `docs/specs/cursor-token-savings-stats.md` | Measured delivery-route split (78/22 units, 81/19 bytes) + the layered token-savings estimate with its methodology and caveats, July 2-11. Refreshes the receipts numbers; feeds the economics.md visuals. |
| `cursor-token-savings-data.json` | `docs/specs/cursor-token-savings-data.json` | Raw per-commit data behind the stats file: SHA, date, wave, unit ids, delivered_by (read off QUEUE.md attribution), shortstat, diff bytes. Chart source. |
| `receipts-addendum-2026-07-12.md` | (written for this repo) | Source-project workflow events after the 2026-07-07 snapshot: the executor-substitution receipt, the cloud-dispatch delivery variant, planner-seat tier refinement, two new steering-layer receipts, refreshed headline counts. |
