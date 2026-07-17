# HANDOFF - buildout session state (for the next chat)

**Read this + BRIEF.md first.** BRIEF is the settled decision record
(decisions 1-18) and needs no re-interviewing; this file is session
state, NOT publishable content - it goes on the pre-publish deletion
checklist along with `source-material/`. History of how each decision
landed: the dated log at the bottom, newest entries last.

---

## Current state (as of 2026-07-17)

**ALL CONTENT WAVES ARE AUTHORED.** The repo is feature-complete
pending Seth's review; nothing is in flight.

- **Merged:** PR #1 - the five-level on-ramp README (merge `893bbe4`,
  2026-07-16) is the repo front page.
- **Awaiting Seth's review, STACKED, merge strictly in order:**
  - **PR #2** `templates-wave` - all 8 templates/ files (7 originals +
    dispatch-ritual.md; decision-16/17 gaps closed 2026-07-16/17:
    level sweep, D1 driving-mode question, executor-CLI step-0 item).
    https://github.com/Sethysethyseth/the-poor-mans-agentic-workflow/pull/2
  - **PR #3** `docs-wave` - the six docs/ pages + root SETUP.md.
    https://github.com/Sethysethyseth/the-poor-mans-agentic-workflow/pull/3
  - **PR #4** `checklists-wave` - the four checklists/ rituals; merging
    it closes the README's last known 404s.
    https://github.com/Sethysethyseth/the-poor-mans-agentic-workflow/pull/4
  - Each retargets automatically as its base merges. Combined preview
    of everything: the `checklists-wave` branch tree.
- **Remaining build work after PRs land:** ONLY the pre-publish PR -
  LICENSE (MIT per decision 2), final scrub pass, delete
  `source-material/` + this file. It waits for Seth's publish decision
  (his call alone; never flip visibility agent-side).

## Next action (human)

**Next action (human):** review/land PR #2, then #3, then #4 (links
above). Bounce anything by commenting on the PR and telling the next
session to apply the feedback. After all three land: say the word on
publish when ready, and the next session runs the pre-publish PR.

## Carried context for the next session

- **Calls flagged for Seth's ruling at review** (fine to land as-is;
  listed so they're conscious): SETUP.md names `docs/setup-manifest.md`
  as the manifest's conventional home in adopter repos (no prior
  decision specified placement); the trial playbook names
  cursor.com/pricing once as "the worked example" (same pattern
  docs/setup.md uses).
- **Standing re-verify list** (anything published from it is
  timestamped; refresh at pre-publish): Cursor trial terms + trial
  clock start (still unverifiable as of 2026-07-11); whether a trial
  account includes headless-CLI/cheap-tier access (gates Level 4
  guidance; docs scope autonomous to Levels 3-4 because of it); Codex
  plan-inclusion limits per ChatGPT tier (Level 0's $0 claim) + install
  one-liners + model-selection mechanics; Claude Code install
  one-liners + web-session capabilities; all economics.md meter numbers
  (last verified 2026-07-16).
- **Open Seth decisions:** charts placement/format (decision 15); when
  to flip the repo public.
- **Formerly-open questions, now addressed in shipped content** (review
  confirms rather than reopens): minimum viable public gate ->
  templates/command-gate.md (G4/G5 non-deletable); Mode 1 vs Mode 2
  payoff -> published honestly (receipts lean Mode 1; the serialization
  violation is a named scar).

## Pointers

- Source project: `C:\Users\Sethy\OneDrive\Desktop\Cursor\workout-db`
  (extraction source: `docs/specs/poor-mans-agentic-workflow.md`).
- This clone lives outside OneDrive deliberately (cloud-sync file
  locks - see the scar in the tracking doc). Keep it that way.

---

## Session log (verbatim history, oldest first)

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
**Updated: 2026-07-11 (buildout seat, local Claude Code session):
BUILDOUT STARTED.** Two PRs opened off main: PR #1 (`readme-onramp`,
8f84c3a) - README v1, the full public on-ramp page. Verified at
buildout: name-collision check CLEAR; install one-liners + Claude
prices confirmed 2026-07-11; Cursor trial terms UNVERIFIABLE
(cursor.com/pricing silent; community reports conflict: 14d / 7d /
removed) - README hedges them; the trial-playbook must hedge the same
way. PR #2 (`templates-wave`, e27aa2f) - all seven templates/ files;
roles-not-tools verified by grep. Buildout-seat calls flagged at
review: root SETUP.md deferred to the docs/ PR (one-source-two-drivers
needs docs/setup.md first); +50% weekly-promo numbers kept OUT of the
README; command-gate.md's deliberate duplication of the AGENTS.md gate
section is stated in both files.
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
the "~24 units in 6 days" figures. Source-project backports agreed but
NOT yet applied (workout-db's tree was live with another agent): the
standing "Next action (human):" HANDOFF line, a reviewer-checklist
file, a filled usage-tracker at session close, and the tracking-doc
section-10 log catch-up - until that lands, the addendum here is the
traceable record.
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
never the lead pitch - age disclosure required). Target structure gained
`docs/autonomous.md` + `templates/dispatch-ritual.md` (the ONE generated
file allowed to carry a concrete executor CLI invocation - stated
carve-out added to the roles-not-tools hard requirement); manifest gains
a driving-mode question (default MANUAL); loop-cheat-sheet gains an
autonomous variant block; economics.md gains the autonomous cost
profile. Two new hard requirements: manual-default/reversibility, and
autonomy-claims-honest + the-gate-never-dispatches-itself
(migrations/prod blocks REFUSE autonomous dispatch; two-bounce stop;
wave end hands to the frontier gate, never the loop). New source file:
`source-material/autonomous-dispatch-2026-07-14.md`. New re-verify
items: whether an executor trial account includes headless-CLI/auto
access, and the executor CLI install one-liner + hang-bug status.
**Updated: 2026-07-16 (Fable, workout-db session): RE-SNAPSHOT DONE.**
`source-material/autonomous-dispatch-2026-07-14.md` gained section 5
(addendum, snapshotted at source commit `c45e0c2`): the v5.1 amendment
(one resident session per wave; human attention batches - one
consolidated smoke checklist + one gate per wave - machine checkpoints
never do), the skills alignment pass (three delivery paths in the audit
ritual, MODEL header as dispatch-routing lever), relay legibility
additions (wave progress n/N messaging; a zero-token local watch
dashboard - source-project CODE, publish as an optional pattern only),
and the MW-wave receipts that SUPERSEDE the age disclosure: six of
seven units dispatched and landed in ONE resident session July 16, a
deliberate human-ruled ladder descent with the frontier audit as stated
compensating control. New count for publication: SEVEN autonomous units
across two waves vs ~6 weeks / 40+ manual - still young, still
disclose. Same session, later: the PR #1 pre-merge refresh LANDED
(`2f85ae5` on `readme-onramp`, browser-verified render): numbers
updated to the traceable 37-units/10-days figures, the decision-16
autonomous teaser + a v5 evolution entry added, both mermaid diagrams
flipped vertical, GitHub alert banner, jump-to nav, "three roles, two
seats" clarifier.
**Updated: 2026-07-16 (later same day): BRIEF gained settled decisions
17-18, both greenlit AND implemented same day.** Decision 17 - THE
FIVE-LEVEL ON-RAMP is the repo's identity: Level 0 (one agent, no
protocol, $0-20, new), Levels 1-3 (the former rungs verbatim), Level 4
(autonomous relay as the top level), plus a "graduation to Max"
honest-exit beat. Metaphor is WADING IN / water depth; Seth REJECTED a
gym metaphor - never reintroduce it; "level" is the one public word,
"rung" never ships. Decision 18 - ChatGPT + Codex CLI as a first-class
planner-seat door (verified 2026-07-16); Claude Code + Cursor stays the
receipted worked example; planner-side swap ships LABELED UNTESTED;
SETUP.md must be agent-agnostic. README v3 carries all of it + the
top-of-page paste-this-repo-into-any-AI TIP (Seth's call).
**Updated: 2026-07-16 (same session, final): PR #1 MERGED to main per
Seth** (merge `893bbe4`) - the five-level README is the repo front
page. Note: README links to docs/, templates/, checklists/ 404 until
those waves land (the in-progress banner covers it).
**Updated: 2026-07-17 (Fable, workout-db seat): PR #2 GAPS CLOSED +
DOCS WAVE SHIPPED as PR #3.** (1) PR #2's decision-16/17 gaps fixed on
`templates-wave` (commits `6e07d98` + `8dd2093`, pushed): level
vocabulary sweep, driving-mode manifest question D1 + executor-CLI
step-0 item, new `templates/dispatch-ritual.md` (the stated
roles-not-tools carve-out; ladder wording uses "step" so "level" owns
the ladder vocabulary). (2) The docs wave: five pages (setup, protocol,
steering, economics, autonomous) found drafted-but-uncommitted from a
prior session, verified against decisions 8-18; two missing files
authored - `docs/scar-tissue.md` (17-entry incident ledger incl. the
required July 4 review skip + July 7 wrong-belief correction; one
defensive scar labeled as not-ours) and root `SETUP.md` (decision-12
agent-facing contract, agent-agnostic per decision 18, upgrade-as-diff,
orchestrates-by-pointing); one broken anchor fixed in setup.md; landed
as PR #3 (`docs-wave`, commits `834466e` + `f1889e4`), STACKED on
PR #2. Flagged: manifest's conventional home named as
`docs/setup-manifest.md`. Rung-grep on docs/ + SETUP.md: zero hits.
**Updated: 2026-07-17 (same session, later): CHECKLISTS WAVE SHIPPED as
PR #4** (`checklists-wave`, commit `3c46816`, STACKED on PR #3). Four
files: `loop-cheat-sheet.md` (decision-10 you-see-X-do-Y table +
decision-13 sideways rows + decision-16 Level 4 block w/ switch-back
row), `reviewer-checklist.md` (audit ritual, three delivery paths
normalized, verify-before-trust, and the executor-committed recovery
note decision 13 references - forward-only, revert commits, never
destructive git), `worktree-ritual.md` (Mode 2 genericized from the
source runbook; --ff-only refusal framed as a disjointness tripwire),
and `trial-playbook.md` (decision-7 conversion playbook, intent stated
in sentence one, terms hedged identically to the README, "never free
forever", trial-CLI-for-Level-4 disclosed unverified). Rung-grep zero;
anchors hand-checked. ALL CONTENT WAVES NOW AUTHORED; HANDOFF
restructured same session (current-state block on top, this log moved
below, superseded planning sections folded into it).
