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
**Updated:** 2026-07-09 (third pass, Fable): BRIEF gained settled
decision 8 - meter literacy. Three parts: (a) the plan comparison table
(Pro / $40 stack / Max 5x / Max 20x) with a hard provenance rule -
Anthropic publishes multipliers only, never token quotas, so official
facts and community estimates ship labeled and timestamped; (b) window
anchoring - the 5-hour window opens on the FIRST prompt and doesn't roll
over, so the adopter opens it deliberately with a cheap anchor prompt to
control where resets land (Seth's own practice, now published content);
(c) `templates/usage-tracker.md` added to the target structure - weekly
window plan + per-session log + weekly review; doubles as rung 2's
mini-receipts sheet and the move-up/move-down rung instrument. New hard
requirement in section 4 ("Meter numbers stay honest"). URGENT for the
buildout agent: the +50% weekly-limit promotion cited in decision 8
expires 2026-07-13 - every meter number MUST be re-verified fresh, not
copied from the brief.
**Updated:** 2026-07-11 (Fable): BRIEF gained settled decisions 9-11 -
the adopter-experience pass, from Seth's direct critique. Decision 9:
the setup interview reshapes into a DEFAULTS-FIRST MANIFEST (every
question pre-answered + one-line summary; adopter keeps/changes/deletes;
editing nothing yields a working setup), a step-0 machine-tooling
section (WezTerm recommended for Claude Code; executor-app install is
RUNG-AWARE - rung 1 waits so the trial clock isn't burned during the
learning weeks), and a generation receipt (one line per generated file +
a <=10-line loop primer; depth linked, not inlined). Decision 10: relay
legibility - `checklists/loop-cheat-sheet.md` added to target structure
("you see X -> you do Y" table), you-are-here cues ("Next action
(human):" line in HANDOFF template, delivery-report footer), and
setup.md now closes with a ~15-min "hello, relay" first-loop
walkthrough. Decision 11: any-project parameterization - manifest asks
project shape + check lanes; "tests green" parameterizes; laneless
projects get an honest degraded default; gate items include/exclude by
manifest, destructive-ops + dependency items always survive. Section 3
and section 4 updated to match (new hard requirements: defaults-first,
no-dangling-next-action, graceful degradation to any project shape).
NEW re-verify item for the buildout agent: when exactly Cursor's trial
clock starts (install vs account signup) - decision 9's rung-1 "wait"
guidance depends on it.
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
