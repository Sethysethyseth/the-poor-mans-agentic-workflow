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
guidance depends on it. Same-session amendment (Seth's call): decision 9
gained "two fill paths, one artifact" - hand-edit the manifest OR
(recommended) point your agent at manifest + project and it fills the
manifest FROM EVIDENCE, one confirmation pass; guard is "the
conversation is never the record" - answers always land in the manifest
file before generation. Second same-session addition (Seth's call):
settled decision 12 - ONE-PASTE BOOTSTRAP. Quickstart is a prompt:
paste "Read <github-link-to-SETUP.md> and set me up" into Claude Code
in your project; root SETUP.md (added to target structure) is the
agent-facing setup contract, written like a task block (ordered steps,
done conditions, hello-relay lap as closing smoke test), driving
tooling installs (incl. relaunch-into-WezTerm mid-setup), manifest
evidence-fill, generation, receipt. New hard requirement "one source,
two drivers": SETUP.md orchestrates docs/setup.md + manifest +
checklists, never duplicates them - agent and manual paths must not
be able to drift. Decision 12 then amended same session: the pre-agent
surface is ONE BLESSED DOOR (official per-OS installer one-liner,
login, paste - three README lines) plus EXACTLY TWO one-line side
doors (desktop app for the terminal-shy; claude.ai/code web as
zero-install doorstep-not-residence). Design rule: defer every choice
that can wait into the agent-driven part (WezTerm is a step-0 offer,
never a prerequisite); never present the doors as a chooser matrix.
Buildout re-verifies installer commands and web-session capabilities.
Final same-session addition: settled decision 13 - MAINTENANCE.
Generated files carry a version+date stamp (repo tags releases);
upgrading = re-run the SETUP paste (agent regenerates from the
existing manifest and presents a diff first) - the one-paste path is
also the upgrade path; the loop cheat sheet gains 3-5 "when it goes
sideways" rows so no failure state strands the adopter without a next
move.
**Updated: 2026-07-12/13 (Fable, workout-db cross-pollination session):
BRIEF gained settled decisions 14-15.** Decision 14: the tools/ waiver -
`tools/token-tracker/` (Seth's uncommitted tracker.js, now completed:
README with the ccusage-complement framing, config.example.json,
anchor-ping.ps1 with the window-open guard, .gitignore for
data/logs/config; smoke-tested, one cosmetic anchor-plan bug fixed - the
>10h-block override now rewrites its reason line). Honesty note declared
load-bearing; the no-code rule stands for everything else. Decision 15:
receipts refreshed - source-material gained the token-savings stats +
raw data (37 units / 35 commits, July 2-11; 78.4/21.6 unit split,
80.7/19.3 byte split, layered ~0.6-1.6M-token estimate) and a receipts
addendum covering post-snapshot workflow events: the EXECUTOR
SUBSTITUTION receipt (Cursor out of Opus tokens mid-wave; Composer
delivered the wave's biggest unit from the same block file, zero repo
changes - decision 7 proven live), the CLOUD-DISPATCH variant (pushed
blocks, delivery report in the PR body, own clone - protocol.md carries
it as a second delivery channel, not a third mode), the planner-seat
tier refinement (Fable withheld for gate/skeletons/escalations, Opus
audits execution units - economics.md), and two new steering receipts
(post-push smoke checklist caught two bugs a clean 11-criterion audit
missed; a second recorded process deviation). Newer numbers SUPERSEDE
the "~24 units in 6 days" figures - README PR #1 shipped with the old
ones and needs a refresh line before merge or in the docs wave. Still
OPEN (Seth): whether/where the suggested charts ship and in what format.
Source-project backports agreed in the same session but NOT yet applied
(workout-db's tree was live with another agent): the standing
"Next action (human):" HANDOFF line, a reviewer-checklist file, a filled
usage-tracker updated at session close, and the tracking-doc section-10
log catch-up for the addendum's events - until that catch-up lands, the
addendum here is the traceable record.

**Updated: 2026-07-14 (Fable, workout-db session): BRIEF gained settled
decision 16 - TWO DRIVING MODES.** The source project adopted relay v5
the same day (autonomous dispatch: the resident seat dispatches blocks
to the executor's headless CLI in a lane worktree, polls, audits, lands;
first autonomous unit landed clean; pricing probe run at $0). The repo
now offers: manual relay (DEFAULT, beginner path, the v4 story
unchanged - human as message bus) and autonomous relay (opt-in power
mode; human keeps authoring go-ahead, bug reports, smoke sign-off, and
every gate item). Switching = the decision-13 re-paste with one manifest
answer flipped (up) or simply stop-dispatching-and-point-by-hand (down,
no regeneration) - both modes execute the same block files verbatim.
Decision 6 amended (story = v4 baseline + v5 as the evolution's ceiling,
never the lead pitch - age disclosure required: one landed unit vs ~5
weeks of manual receipts). Target structure gained `docs/autonomous.md`
+ `templates/dispatch-ritual.md` (the ONE generated file allowed to
carry a concrete executor CLI invocation - stated carve-out added to the
roles-not-tools hard requirement); manifest gains a driving-mode
question (default MANUAL); loop-cheat-sheet gains an autonomous variant
block; economics.md gains the autonomous cost profile. Two new hard
requirements: manual-default/reversibility, and autonomy-claims-honest +
the-gate-never-dispatches-itself (migrations/prod blocks REFUSE
autonomous dispatch; two-bounce stop; wave end hands to the frontier
gate, never the loop). New source file the buildout MUST consume:
`source-material/autonomous-dispatch-2026-07-14.md` (scrubbed spec +
dispatch ritual + probe results + v5 receipts; note inside: the source
project's skills are under live revision by another agent - re-snapshot
if the docs wave starts more than a few days after 2026-07-14). NEW
re-verify items for the buildout: whether an executor trial account
includes headless-CLI/auto-model access (gates any rung-2 autonomous
guidance; if unverifiable, say so and scope autonomous to rung 3), and
the executor CLI install one-liner + hang-bug status. README PR #1
impact: the pitch line "human as the message bus" stays the headline but
now needs the one-paragraph autonomous teaser + link (decision 16's
README treatment) - fold into the same pre-merge refresh decision 15
already requires.

**Read this + BRIEF.md first.** This file is session state, NOT publishable
content - it goes on the pre-publish deletion checklist along with
`source-material/`.

**Updated: 2026-07-11 (buildout seat, local Claude Code session): BUILDOUT
STARTED.** Two PRs open, both off main, independent of each other:

- **PR #1 (`readme-onramp`, 8f84c3a):** README v1 - the full public
  on-ramp page (pitch, cost model, relay loop + rung ladder as mermaid
  diagrams, one-paste quickstart, receipts incl. unflattering, full honest
  positioning, steering summary, v2->v4 evolution, repo map, MIT).
  Verified at buildout: name-collision check CLEAR (title stands);
  install one-liners + Claude prices confirmed 2026-07-11; **Cursor trial
  terms UNVERIFIABLE** (cursor.com/pricing silent; community reports
  conflict: 14d / 7d / removed) - README hedges them as
  community-reported + unstable; the trial-playbook must hedge the same
  way.
- **PR #2 (`templates-wave`, e27aa2f):** all seven templates/ files -
  task-block (both scales, verbatim footer, delivery report w/ fixed
  next-action footer, diagnosis variant), tasks-README (queue protocol),
  command-gate (G4/G5 non-deletable), AGENTS.md, HANDOFF (capped +
  archive + never-empty next-action line), usage-tracker (decision 8),
  setup-interview (decision-9 defaults-first manifest + generation
  contract: stamps, receipt spec, upgrade-as-diff, hello-relay starter
  block in the generated set). Roles-not-tools verified by grep.

Decisions made by the buildout seat, flaggable at review: root SETUP.md
deferred to the docs/ PR (one-source-two-drivers needs docs/setup.md to
exist first); +50% weekly-promo numbers kept OUT of the README
(economics.md re-verifies fresh - promo expires 2026-07-13, past by the
time that PR is written); command-gate.md's deliberate duplication of the
AGENTS.md gate section is stated in both files.

**Next: Seth reviews PRs #1-#2** (or lets them ride and says "keep going" -
his stated preference today was volume before critique). PR #2's
templates wave predates decision 16 - the manifest needs the
driving-mode question and templates/ needs dispatch-ritual.md added,
either as a review fix or a follow-up PR. Then the docs/ wave: setup.md,
protocol.md, steering.md, economics.md (re-verify ALL meter numbers
fresh), autonomous.md (decision 16), scar-tissue.md, root SETUP.md.
Then checklists/, then the pre-publish PR.

## Status: BUILDOUT IN PROGRESS (was: ready for buildout)

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
