# HANDOFF - launch-prep state (for the next session: the Opus seat)

**Read this + BRIEF.md first.** BRIEF is the settled decision record
(decisions 1-20) and needs no re-interviewing; this file is session
state, NOT publishable content - it goes on the pre-publish deletion
checklist along with `source-material/`. History of how each decision
landed: the dated log at the bottom, newest entries last.

**Seat change (2026-07-18): Fable has departed.** Opus is the frontier
seat for this repo now - planning, review-feedback application, the
pre-publish PR, everything. Nothing remaining needs re-deciding; BRIEF
decisions 1-20 are settled, and the operator's guide below carries
every ritual this repo uses.

---

## Current state (as of 2026-07-18)

**ALL CONTENT IS AUTHORED, including the launch evidence page and the
launch-blocker fixes.** Nothing is in flight. The repo is
review-complete pending Seth.

- **Merged:** PR #1 - the five-level on-ramp README (merge `893bbe4`).
- **Awaiting Seth's review, STACKED, merge strictly in order
  #2 -> #3 -> #4 -> #5 -> #6:**
  - **PR #2** `templates-wave` - all 8 templates/ files.
  - **PR #3** `docs-wave` - the six docs/ pages + root SETUP.md.
  - **PR #4** `checklists-wave` - the four checklists/ rituals.
  - **PR #5** `receipts-wave` (commit `d9f327d`) - `docs/receipts.md`,
    the launch evidence page: pilot data inlined, four mermaid charts,
    the two-layer token estimate, every caveat; plus
    `docs/receipts-data.json` (the raw per-commit dataset, public so
    nothing depends on files deleted at pre-publish) and one-line
    paper-trail links from README + economics.md. Settles decision 15's
    charts question (recorded as decision 20) - Seth ratifies at review.
  - **PR #6** `level2-test-month` - Level 2 rewritten to the PAID TEST
    MONTH (decision 19: the Cursor Pro trial is REMOVED system-wide,
    staff-confirmed 2026-07-03) + every EDIT-grade fix from the
    2026-07-18 verify sweep and pre-publish audit: +50%-promo date
    corrected, README buildout banner removed, autonomous wave-math
    wording fixed, "resident reviewer" naming unified, missing as-of
    stamps added, template dead paths fixed,
    `checklists/trial-playbook.md` renamed
    `checklists/test-month-playbook.md`.
- **2026-07-18 reports (read before the pre-publish PR), preserved at
  `source-material/verify-report-2026-07-18.md` and
  `source-material/audit-report-2026-07-18.md`:**
  - Re-verify sweep - every third-party fact checked live with URLs;
    the trial-removal BLOCKER (fixed by PR #6); all else CONFIRMED
    fresh.
  - Pre-publish audit - tree-wide consistency audit; all EDIT+
    findings fixed by PR #6 except LICENSE (a pre-publish item by
    design).
- **Remaining build work after PRs land: ONLY the pre-publish PR** -
  LICENSE (MIT, decision 2), final scrub, delete `source-material/` +
  this file + stray TASK/DELIVERY/report files, same-day re-verify
  refresh. Waits for Seth's publish decision (his call alone; never
  flip visibility agent-side).

## Next action (human)

Review/land PR #2 -> #3 -> #4 -> #5 -> #6 in order (each retargets as
its base merges; combined preview of everything = the
`level2-test-month` branch tree). Bounce anything by commenting on the
PR and telling the next session to apply the feedback. After all five
land: say the word on publish, and the next session runs the
pre-publish PR.

## Launch checklist (the definition of "ready to flip public")

1. PRs #2-#6 merged in order (Seth).
2. Decision-20 ratification at PR #5 review: the receipts page IS the
   charts settlement (placement + mermaid format). Bounce with format
   feedback if not.
3. Pre-publish PR (next session, only after Seth says publish):
   LICENSE (MIT); SAME-DAY re-verify sweep re-run (prices move; the
   +50% weekly promo lapsed 2026-07-19 - confirm economics.md reads
   correctly by then); final scrub (delete `source-material/` +
   `HANDOFF.md`; grep the public tree for BRIEF/HANDOFF/source-material
   references, "rung", stray TASK/DELIVERY/AUDIT/VERIFY files); confirm
   the GitHub render of README + receipts.md (mermaid charts included).
4. Seth flips the repo public - manual, his act, never agent-side.
5. Post-launch candidate (Seth-gated): the fan-out dispatch pattern -
   `source-material/fan-out-dispatch-2026-07-18.md` holds the design
   intuition + the first receipt. Seth has an unshared integration
   idea: ASK HIM FIRST, then design against that note.

## Operator's guide (running this repo's loop without Fable)

The workflow eats its own dog food: Cursor executes, Claude Code
audits and lands. Proven here 2026-07-18 with four units, three of
them in parallel.

- **Dispatch:** one agent per worktree, ALWAYS outside OneDrive
  (`git worktree add C:\dev\worktrees\<name> -b <branch> <base>` from
  this clone). Contract-first `TASK.md` at the worktree root (goal,
  sources to read, hard rules, acceptance criteria with grep-proof
  demands, STOP CONDITION footer; report-only lanes state "NO repo
  file edits"). Run headless as a BACKGROUND task, never
  foreground-wait (known hang bug): read the key inline via
  `[Environment]::GetEnvironmentVariable('CURSOR_API_KEY','User')`,
  invoke by full path -
  `C:\Users\Sethy\AppData\Local\cursor-agent\cursor-agent.ps1 -p "Read
  TASK.md in this directory and execute it exactly. Write the delivery
  report to DELIVERY.md in this directory and make NO git operations."
  --force --model <opus|auto> --output-format text` with cwd = the
  worktree. ALWAYS pass `--model` explicitly (flagless silently
  inherits the previous run's model). Judgment/content units -> opus
  tier; mechanical/report units -> auto. Quota refusal descends
  named -> auto -> do it yourself (every unit here is docs-scale).
- **Parallel fan-out:** content lanes parallelize only when their
  files-to-touch are disjoint (in doubt = collide = serialize);
  report-only lanes (audits, verify sweeps, research) parallelize
  freely - they can't collide by construction. Many hands, ONE gate:
  auditing/committing/landing stays single-file through this seat.
- **Landing:** never trust the delivery report - re-verify yourself
  (recompute any numbers from source data, grep banned vocab -
  "rung", gym metaphors - check links and level-price consistency).
  Remove TASK.md/DELIVERY.md before staging. Stage files individually
  (never `git add .`), ASCII-only commit messages, SHA check via
  `git log --oneline`, push, `gh pr create` against the correct
  stacked base, confirm the branch reached origin.
- **Guardrails:** PRs are Seth's to merge - never merge for him.
  Never flip visibility. BRIEF changes get a numbered decision with a
  dated rationale. This file is rewritten every session: state on
  top, log below verbatim, newest entries last.

## Carried context for the next session

- The re-verify list is FRESH as of 2026-07-18 (VERIFY-REPORT.md has
  URLs + verdicts per item); only the same-day pre-publish refresh
  remains. The older standing list in previous log entries is
  superseded.
- Flagged for Seth's ruling at review: decision-20 ratification
  (PR #5); SETUP.md naming `docs/setup-manifest.md` as the manifest's
  adopter-repo home (from 07-17); the test-month playbook keeping
  cursor.com/pricing as the worked example (confirm the pattern
  survived the PR #6 rewrite).
- Open Seth items: when to flip public; his Cursor/fan-out
  integration idea (unshared - ask him).
- Worktrees left in place under `C:\dev\worktrees\`: `pmaw-verify` +
  `pmaw-audit` (report lanes, reports now copied into
  source-material/) and `pmaw-evidence` (the content lane; branches
  `receipts-wave` + `level2-test-month` landed from it). Safe to
  `git worktree remove` any of them at next session start.

## Pointers

- Source project: `C:\Users\Sethy\OneDrive\Desktop\Cursor\workout-db`
  (extraction source: `docs/specs/poor-mans-agentic-workflow.md`).
- This clone lives outside OneDrive deliberately (cloud-sync file
  locks - see the scar in the tracking doc). Keep it that way.
- Claude Code memory (workout-db project scope):
  `poor-mans-agentic-workflow.md` + `fable-withheld-opus-executes.md`
  both updated 2026-07-18 with this state and the seat change.

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
vocabulary sweep, D1 driving-mode question, executor-CLI step-0 item,
new `templates/dispatch-ritual.md` (the stated roles-not-tools
carve-out; ladder wording uses "step" so "level" owns the ladder
vocabulary). (2) The docs wave: five pages (setup, protocol, steering,
economics, autonomous) found drafted-but-uncommitted from a prior
session, verified against decisions 8-18; two missing files authored -
`docs/scar-tissue.md` (17-entry incident ledger incl. the required
July 4 review skip + July 7 wrong-belief correction; one defensive
scar labeled as not-ours) and root `SETUP.md` (decision-12 agent-facing
contract, agent-agnostic per decision 18, upgrade-as-diff,
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
**Updated: 2026-07-18 (Fable, workout-db seat - FABLE'S LAST SESSION):
LAUNCH-PREP FAN-OUT.** Four Cursor agents dispatched from one frontier
session against this repo - three parallel worktree lanes + one
serialized behind the first landing: (A) the evidence page ->
`docs/receipts.md` + `docs/receipts-data.json`, landed as PR #5
(`receipts-wave`, `d9f327d`; recorded as decision 20, settles
decision 15's charts question pending Seth's ratification); (B) a live
web re-verify sweep -> `VERIFY-REPORT.md` (pmaw-verify worktree):
Cursor's Pro trial REMOVED system-wide (staff-confirmed 2026-07-03) =
Level 2 cost-claim BLOCKER; +50% weekly promo actually EXTENDED to
2026-07-19 (repo said expired 07-13); everything else confirmed fresh
with URLs; (C) a pre-publish tree audit -> `AUDIT-REPORT.md`
(pmaw-audit worktree): LICENSE missing (planned), stale README
buildout banner (BLOCKER at launch), autonomous wave-math ambiguity,
resident-naming split, missing stamps, template dead paths; tree
otherwise clean on links/vocab/provenance/PII; (D) Seth ruled mid-
session "go with your recommendation" -> Level 2 rewritten to the PAID
TEST MONTH (decision 19) + all EDIT+ audit/verify fixes, landed as
PR #6 (`level2-test-month`, stacked on #5). BRIEF gained decisions
19-20. Fan-out design intuition + first receipt captured in
`source-material/fan-out-dispatch-2026-07-18.md`; Seth has an unshared
Cursor-integration idea - next session asks him first. Seat handover:
Fable departs; Opus continues with the operator's guide above; memory
files updated.
