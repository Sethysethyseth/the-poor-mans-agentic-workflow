# HANDOFF - roadmap-setup session state (for the next chat)

**Written:** 2026-07-07, by the planner seat (Fable, workout-db session).
**Updated:** 2026-07-09 (Fable): BRIEF gained settled decision 7 - the
three-rung entry ladder (Solo Claude $20 / Claude + free Cursor trial /
full $40), with rung moves in either direction requiring zero repo-file
changes. Section 3 structure and section 4 hard requirements updated to
match (roles-not-tools in templates, per-rung honest caveats, rung
question in the setup interview). Cursor trial/Hobby facts in decision 7
are community-reported as of mid-2026 - the buildout agent must re-verify
against cursor.com/pricing and timestamp them.
**Updated:** 2026-07-09 (later, same seat): rung 2 reframed per Seth as
the CONVERSION rung - the trial is sequenced after rung 1 so the felt
contrast (single-meter squeeze removed, Mode 2 possible) sells the second
seat; intent ships stated openly; what's sold is the relay, not Cursor
the brand. `checklists/trial-playbook.md` added to the target structure.
**Read this + BRIEF.md first.** This file is session state, NOT publishable
content - it goes on the pre-publish deletion checklist along with
`source-material/`.

## Status: READY FOR BUILDOUT

All three blockers from the 2026-07-04 handoff are resolved:

1. **`source-material/` refreshed (2026-07-07):** every copy re-snapshotted
   from workout-db at its relay-v4 state, re-scrubbed (infra IDs + smoke
   creds -> placeholders, verified by grep). Two files ADDED:
   `queue-snapshot.md` + `handoff-archive.md` - the ground truth behind the
   tracking doc's new receipts section.
2. **BRIEF.md rewritten to the v4 story** and expanded: the steering layer
   (keep-human-on-task + anti-loop) and the setup interview are now
   first-class required content; the receipts section (measured July 2-7
   pilot numbers) is required README content with a trace-or-die rule.
3. **The batched decisions are SETTLED and written into BRIEF section 2:**
   MIT everything; named-tools-first framing with timestamped prices;
   receipts provenance-only (LogChamp named as evidence source ONLY - hard
   no-shilling rule); tone = accessible on-ramp ("dip your foot in",
   first person, then numbers); story = v4. Only the repo-name GitHub
   collision check remains, delegated to the buildout agent.

Source-project side (workout-db): the tracking doc gained sections 6
(steering layer), 7 (setup interview), 8 (receipts); old 6/7 renumbered to
9/10. Committed there same session.

## Next step (for Seth)

Point a Claude Code web session (claude.ai/code) at this repo with:
*"Read BRIEF.md and follow it."* It should NOT need to interview you - if
it asks questions BRIEF section 2 already answers, tell it to re-read
section 2. Expect several reviewable PRs (README first).

Open items the buildout carries (not blockers): Mode 1 vs Mode 2 payoff
data (the receipts lean Mode 1 - the one serialization violation produced
the messiest session on record), minimum viable command gate for a public
template.

## Pointers

- Source project: `C:\Users\Sethy\OneDrive\Desktop\Cursor\workout-db`
  (extraction source: `docs/specs/poor-mans-agentic-workflow.md`).
- This clone lives outside OneDrive deliberately (cloud-sync file locks -
  see the scar in the tracking doc). Keep it that way.
