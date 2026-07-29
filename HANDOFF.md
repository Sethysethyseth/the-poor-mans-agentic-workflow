# HANDOFF - launch-prep state (read this first; it is sufficient)

**This file is the complete pickup doc.** Read it and you know the
project, its state, what you may do without asking, and the exact next
action. You do not need to interview Seth to start. This file is session
state, NOT publishable content - PR #7 deletes it.

**Where the decisions live.** BRIEF.md held settled decisions 1-20. PR #7
DELETES it (owner-confirmed 2026-07-29: it stated the Level 2 conversion
strategy in internal strategy language). Until #7 merges, read it at the
repo root. After #7 merges, recover it with
`git show c35153f~1:BRIEF.md`. **All 20 decisions are FROZEN** - none
need revisiting. Any NEW decision gets recorded in this file with a date
and a rationale, not in BRIEF.

**Seat history:** Fable departed 2026-07-18; Opus is the frontier seat.
The workflow eats its own dog food - Cursor executes, Claude Code audits
and lands.

---

## What this repo is (30 seconds)

A docs-only public repo teaching a two-seat agentic coding workflow
(~$40/mo): a frontier PLANNER authors self-contained task blocks, a
cheap EXECUTOR implements them, and the HUMAN is the message bus. Sold
as a five-level on-ramp ($0 -> $40 -> autonomous). No code ships except
`tools/token-tracker/` (a stated decision-14 waiver). The receipts come
from a real pilot: 37 units in 10 days on the source project.

## Current state (as of 2026-07-29)

**ALL CONTENT IS AUTHORED. ALL BUILD WORK IS DONE. Nothing is in
flight.** The repo is review-complete. The only thing standing between
here and a public launch is Seth merging the stack.

- **Merged:** PR #1 - the five-level on-ramp README (merge `893bbe4`).
- **Open, STACKED, merge strictly in order #2 -> #3 -> #4 -> #5 -> #6
  -> #7** (each retargets automatically as its base merges; the combined
  preview of everything is the `pre-publish` branch tree):
  - **PR #2** `templates-wave` - all 8 templates/ files.
  - **PR #3** `docs-wave` - the six docs/ pages + root SETUP.md.
  - **PR #4** `checklists-wave` - the four checklists/ rituals.
  - **PR #5** `receipts-wave` (`d9f327d`) - `docs/receipts.md`, the
    evidence page (pilot data inlined, four mermaid charts, two-layer
    token estimate, every caveat) + `docs/receipts-data.json`, the raw
    per-commit dataset. Recorded as decision 20; Seth ratifies at review.
  - **PR #6** `level2-test-month` - Level 2 rewritten to the PAID TEST
    MONTH (decision 19) + every EDIT-grade fix from the 2026-07-18
    verify sweep and pre-publish audit.
  - **PR #7** `pre-publish` (`c35153f`, opened 2026-07-29) - LICENSE
    (MIT, decision 2); the lapsed +50% promo fixed in economics.md; the
    dangling `cursor-token-savings-stats.md` reference fixed in
    receipts-data.json; and the scrub - deletes `source-material/` (14
    files), `HANDOFF.md` (this file), and `BRIEF.md`. 19 files,
    +26/-4840.
- **The public tree after #7 merges is 21 files:** README, SETUP.md,
  LICENSE, 7 docs/, 8 templates/, 4 checklists/, 5 tools/token-tracker/.

## Next action

**Human (Seth):** merge #2 -> #3 -> #4 -> #5 -> #6 -> #7, in order.
That is the only blocking item. Bounce anything by commenting on the PR.

**Agent, if Seth opens the project and asks "what now":** the answer is
the ordered list in "Launch checklist" below. Items 3-6 are yours to do
without further instruction the moment the stack lands. Do NOT wait to
be asked for them individually.

## Standing authority (added 2026-07-29 at Seth's explicit direction)

Seth wants agents driving this repo with minimal round-tripping -
"faster and less mistakes." Act accordingly. Default to doing the work
and reporting, not to asking permission.

**DO without asking:** author and edit any file; run verify sweeps; run
the scrub greps; create worktrees; dispatch Cursor lanes; stage and
commit; push branches; open PRs; apply PR review feedback; rewrite this
file; tag releases once the stack has landed; set repo description,
topics, and About metadata; recompute any number from source data.

**ASK FIRST:** merging PRs (Seth's, unless he has said "land the stack"
in the current session); anything that changes what decisions 1-20
settled; deleting content that is not on the scrub list.

**NEVER, under any instruction short of Seth doing it himself:** flip
repository visibility to public. That is his act alone, it is
effectively irreversible once indexed, and no amount of "go ahead"
transfers it. Also never force-push, never `git reset --hard` a shared
branch, never rewrite published history.

## Fact-verification status (the provenance rule is load-bearing)

Every third-party fact in the public tree carries an as-of date. NEVER
bump a stamp you did not personally re-check - claiming verification you
did not do is the one failure this repo cannot survive.

| Item | Status | Last checked |
| --- | --- | --- |
| Claude Code install one-liners | CONFIRMED verbatim | 2026-07-29 |
| Claude Pro $20 / Max 5x $100 / Max 20x $200 | CONFIRMED (multipliers, not quotas; two weekly caps) | 2026-07-29 |
| Cursor Pro $20, Hobby free, NO Pro trial | CONFIRMED (no trial returned) | 2026-07-29 |
| Cursor CLI install + `agent` binary | CONFIRMED | 2026-07-29 |
| +50% Claude weekly promo | LAPSED 2026-07-19; fixed in PR #7 | 2026-07-29 |
| **Codex on ChatGPT Free** | **UNVERIFIED - see risk below** | 2026-07-18 |
| Cursor Auto / first-party pool wording | not re-checked; minor | 2026-07-18 |

**The one live risk:** the repo claims ChatGPT's Free tier includes some
Codex usage, which is what makes Level 0 a genuine $0 door. Verified
2026-07-18 against OpenAI's help center. On 2026-07-29 that page and
openai.com/chatgpt/pricing both returned 403 to automated fetches, and a
third-party source suggested developer tooling may be excluded on Free.
NOT resolved either way - do not rewrite on blog sources. Check the
official help center by hand before launch. The existing hedge ("as of
July 2026, re-verify, plan terms move") is currently carrying it.

## Launch checklist (the definition of "ready to flip public")

Items 1-2 are Seth's. Items 3-6 are the agent's, unprompted, the moment
the stack lands. Item 7 is Seth's alone.

1. **Merge PRs #2 -> #3 -> #4 -> #5 -> #6 -> #7 in order** (Seth).
2. **Decision-20 ratification at PR #5 review:** the receipts page IS
   the charts settlement (placement + mermaid format). Bounce with
   format feedback if not.
3. **Resolve the Codex-on-Free question** (see the risk note above). If
   Free no longer includes Codex, Level 0's "$0 door" claim and the
   matching cells in README + `docs/setup.md` + `docs/economics.md` need
   a dated correction. This is the last known content risk.
4. **Tag `v1.0.0`** on main. NOT optional: the generation contract in
   `templates/setup-interview.md` tells every adopter's agent to stamp
   generated files with "version from this repo's release tag." With no
   tag, every stamp is undefined and the decision-13 upgrade-as-a-diff
   path has nothing to diff against. Write release notes from the README.
5. **Repo metadata:** description (currently still "under
   construction"), topics (`agentic-coding`, `ai-agents`, `claude-code`,
   `cursor`, `llm`, `developer-workflow`, `ai-workflow`), About link to
   the receipts page. `gh repo edit` does all of it.
6. **Confirm the GitHub render:** README's two mermaid diagrams
   (browser-verified once, 2026-07-16) and `docs/receipts.md`'s four
   charts (NEVER seen rendered - authored by a Cursor lane and only ever
   read as source). GitHub's mermaid is stricter than local previews;
   this is the single most likely thing to break visibly at launch.
7. **Seth flips the repo public.** His act. Never agent-side.

## Post-launch backlog (nothing here blocks the flip)

- **Social preview image** - this project spreads by link-share; without
  one, every share is a gray box. Highest-leverage polish available.
- **A concrete example in the README** - the page describes task blocks
  and delivery reports for 500 lines without ever showing one. A
  collapsed `<details>` with a real abbreviated block + its delivery
  report is the "oh, that's all it is" moment.
- **A fallback line under the quickstart** for agents that cannot fetch
  URLs ("clone the repo and point your agent at the local SETUP.md").
- **A channel for receipts** - the README says "we'd love to see them"
  twice; Discussions is off and there are no issue templates.
- **The fan-out dispatch pattern** (Seth-gated) - design intuition and
  the first receipt were in `source-material/fan-out-dispatch-2026-07-18.md`;
  after PR #7, recover with `git show c35153f~1:source-material/fan-out-dispatch-2026-07-18.md`.
  Seth has an unshared Cursor-integration idea: ASK HIM FIRST.

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
- **Guardrails:** PRs are Seth's to merge - never merge for him unless
  he says so in the current session. Never flip visibility, ever. New
  decisions get a dated rationale in THIS file (BRIEF.md is deleted by
  PR #7; decisions 1-20 are frozen). This file is rewritten every
  session: state on top, log below verbatim, newest entries last.

## Carried context

- **Flagged for Seth's ruling at review:** decision-20 ratification
  (PR #5); SETUP.md naming `docs/setup-manifest.md` as the manifest's
  adopter-repo home (from 07-17); the test-month playbook keeping
  cursor.com/pricing as the worked example.
- **Open Seth items:** when to flip public; his unshared Cursor/fan-out
  integration idea (ask him).
- **Judgment call in PR #7 worth knowing:** `receipts-data.json` keeps
  the internal model codenames (`FABLE-DIRECT` etc.) in
  `delivered_by_detail`. They are the queue's verbatim attribution tags
  and are what makes the 78.4/21.6 split independently checkable;
  scrubbing them would weaken the receipts. Stated in the PR body so
  Seth can bounce it.
- **Vocabulary bans (still enforced):** "rung" never ships - "level" is
  the public word. No gym/lifting metaphors, ever; Seth rejected them
  explicitly. The metaphor is wading into water.
- **Worktrees under `C:\dev\worktrees\`:** `pmaw-prepublish` (holds the
  `pre-publish` branch - KEEP until #7 merges), plus stale lanes
  `pmaw-verify`, `pmaw-audit`, `pmaw-evidence`, `cursor-lane`,
  `cursor-lane-2`, `cursor-lane-3`. All but pmaw-prepublish are safe to
  `git worktree remove`.

## Pointers

- **Source project:** `C:\Users\Sethy\OneDrive\Desktop\Cursor\workout-db`
  (extraction source: `docs/specs/poor-mans-agentic-workflow.md`).
- **This clone IS inside OneDrive** (`...\OneDrive\Desktop\PoorWorkflow`)
  despite an earlier note in this file claiming otherwise. It has not
  caused problems for a docs repo, but WORKTREES MUST live outside sync
  (`C:\dev\worktrees\`) - cloud-sync file locks are a documented scar.
- **Cursor CLI (for dispatching lanes):**
  `C:\Users\Sethy\AppData\Local\cursor-agent\cursor-agent.ps1`; key via
  `[Environment]::GetEnvironmentVariable('CURSOR_API_KEY','User')`.
- **Claude Code memory:** project-scoped memory for THIS repo carries a
  condensed version of this state, so a fresh session knows the project
  before reading anything. Keep it in sync when state changes materially.
- **Known environment gotcha:** the tool safety classifier went down for
  most of 2026-07-29, blocking all shell, web, and repo writes while
  leaving file reads and scratchpad writes working. If that recurs, the
  workaround that worked: stage finished files in the scratchpad and
  have Seth copy them in and run git himself. Shell variables do NOT
  persist between his pastes - always use literal paths.

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
**Updated: 2026-07-29 (Opus seat): PR #7 OPENED - the pre-publish PR;
the build is DONE.** Seth asked for a full state review before shipping,
then for the fixes to be made. Work landed as `pre-publish` (`c35153f`,
stacked on #6): LICENSE (MIT, decision 2 - unblocks the README badge and
License link, both 404 until now); `docs/economics.md` promo sentence
corrected (the +50% weekly boost lapsed 2026-07-19 and the page still
read as though it were pending); `docs/receipts-data.json` `_comment`
rewritten (it cited `cursor-token-savings-stats.md`, a source-material
file the same commit deletes - a NEW defect the 07-18 audit never saw,
because receipts-data.json arrived in PR #5 authored in parallel with
the audit lane); and the scrub - `source-material/` (14 files),
`HANDOFF.md`, and `BRIEF.md`. BRIEF's deletion was NOT on the original
checklist; Seth confirmed it this session (it states the Level 2
conversion strategy in internal strategy language, which the README
already carries honestly in adopter-facing words). Copyright holder set
to `Sethysethyseth` per Seth rather than a legal name. Public-tree scrub
grep came back clean: no "rung", no BRIEF/HANDOFF/source-material
references, no stray TASK/DELIVERY/report files. Re-verify sweep re-run
live: Claude Code install one-liners, Claude plan prices ($20/$100/$200,
multipliers not quotas, two weekly caps), Cursor Pro $20 with NO trial
returned, and the Cursor CLI install all CONFIRMED 2026-07-29; the
Codex-on-ChatGPT-Free claim is UNVERIFIED (OpenAI 403s automated
fetches; a third-party source hints Free may exclude developer tooling)
and is now the last known content risk - it is what makes Level 0 a $0
door. Plan-table stamps deliberately NOT bumped beyond what was actually
re-checked. Environment note: the tool safety classifier was down for
most of the session, blocking shell/web/repo-writes; the work was
completed by staging files in the scratchpad and having Seth run git
himself. Seth also directed (recorded here as standing policy, see
"Standing authority") that agents should drive this repo with minimal
round-tripping - author, verify, commit, push, tag, and set metadata
without asking; merging stays his by default and flipping visibility is
his alone, always.
