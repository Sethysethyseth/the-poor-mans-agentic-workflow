# BRIEF — build instructions for the agent working in this repo

You are an agent (most likely Claude, in a claude.ai/code web session)
building this repo from a shell into a publishable public repo. The owner
(Seth) wants the work off his hands: you do the extraction, structuring, and
writing; he reviews PRs. **All open decisions are already settled (section
2)** — do not re-interview him; the only research task left for you is the
repo-name collision check.

Read this whole file, then read everything in `source-material/`, before
writing anything.

---

## 1. What this repo becomes

A public repo (working title `the-poor-mans-agentic-workflow`) documenting a
low-cost agentic coding workflow: two paid seats plus the human as the
message bus, ~$40/mo total vs ~$100–200/mo for a single-seat Max-tier setup.

**Ship the v4 three-role story** (the current reality in the source project;
the tracking doc's log entries for 2026-07-03 and 2026-07-06 tell the
evolution). Frame it as the refinement of the simpler two-seat idea:

- **The planner seat is really two roles.** Frontier intelligence
  (Fable/Opus in Claude Code) is rented by the session: it authors
  contract-first task blocks in short wave-sessions and does ONE thorough
  review of the accumulated branch diff before release. A mid-tier resident
  (Sonnet) runs the day-to-day loop: per-unit audit of each delivery,
  commits with SHA verification, state upkeep, dispatch — escalating on
  standing triggers instead of guessing.
- **Executor seat** (Cursor): token-heavy codegen — whole roadmap units,
  multi-file implementation, test runs, a self-verified delivery report.
  Writes code and STOPS: never commits, never touches state files.
- **The human is the message bus**: tasks are dispatched as files in the
  repo; the human's job is one pointer line per unit plus telling the
  reviewer when the executor stopped.

The claim — and this exact framing is required, see section 4 — is
"Max-quality *results* for $40, paid for in wall-clock time, human
attention, and rationing discipline," NOT "Max for $40."

The setup ships as a **three-rung on-ramp** (settled decision 7): start on
a single $20 Claude seat, add Cursor for free via its trial to evaluate
the two-seat relay, upgrade to the full $40 setup — or step back down —
without changing a single file in your repo. The protocol-is-files
property is what makes that true, and section 4 makes keeping it true a
hard requirement. The same property now buys a SECOND axis (settled
decision 16): two driving modes — the manual relay (default: the human
is the message bus) and an opt-in autonomous relay (the resident seat
dispatches, monitors, audits, and lands units itself; the human keeps
the gates) — switchable in both directions with zero protocol-file
edits.

Beyond the seats and the relay, the repo ships two more first-class layers,
both now specified in the tracking doc:

- **The steering layer** (tracking doc section 6): the state files double as
  a steering mechanism that keeps the HUMAN on task (single next action,
  off-queue labeling, resurfacing TODOs, trigger-phrase gates, session-close
  ritual, post-push smoke checklists) and stops AGENTS from working in loops
  (machine-checkable done conditions, the stop-and-explain footer,
  diagnosis-before-fix, escalation-instead-of-retry, ground-truth
  verification, bounce-don't-thrash).
- **The receipts** (tracking doc section 8): measured results from the
  July 2–7, 2026 pilot — the proof the workflow works, including the
  unflattering numbers.

`source-material/tracking-doc.md` is the primary source (refreshed
2026-07-07 to the v4 state). Its structure is a good skeleton for the final
README, but you own the final structure. `queue-snapshot.md` +
`handoff-archive.md` are the ground truth behind every receipts number.

## 2. Settled decisions (write these in; do not re-ask)

Recorded 2026-07-07, decided by Seth in session:

1. **Repo name:** working title `the-poor-mans-agentic-workflow` stands
   unless your GitHub collision check finds squatting/confusion on similar
   names — if it does, present 2–3 alternatives in your first PR, don't
   pick one yourself.
2. **License: MIT, everything.** One license file, maximum copy-paste
   freedom on the templates. No dual-licensing.
3. **Framing: named tools first.** "Cursor + Claude Code" is the concrete,
   copy-pasteable primary path, with one short section generalizing to any
   planner+executor pair. Timestamp all prices and model names ("as of
   mid-2026") — the structural claim (rent frontier intelligence by the
   session for judgment, keep a cheap resident for the loop, route typing
   to commodity models) is the durable content; the dollar figures are the
   dated worked example.
4. **Receipts: provenance-only.** The source project is named — LogChamp, a
   production fitness tracker — exactly where evidence needs a source, with
   dates and numbers intact. HARD RULE: no app link, no feature pitch, no
   screenshots, no "check it out." The repo documents a workflow; it never
   markets the app. If a sentence about LogChamp isn't load-bearing for a
   receipt, cut it.
5. **Tone: accessible on-ramp.** The README opens for people who want to
   get INTO agentic coding without committing $100+/mo — "dip your foot in"
   energy, first person, zero gatekeeping — then goes numbers-forward.
   Sample register (adapt, don't copy verbatim):

   > Want to get into agentic coding, but don't want to spend $100+ a month
   > on what the top people tell you is the only real setup? I built a
   > "poor man's" version that runs on two $20 seats — a planner/reviewer
   > and an executor, with you as the message bus — so you can dip your
   > foot in without committing hundreds a month. It shipped a real
   > production app: ~24 units in 6 days, zero bounced deliveries, two
   > prod-breaking bugs caught before deploy. It is not "Max for $40" —
   > it's Max-quality results for $40, paid for in your time, attention,
   > and rationing discipline. This repo is the whole workflow, including
   > the honest list of what you give up.

6. **Story version: v4 baseline, v5 as the opt-in ceiling** (amended
   2026-07-14). The headline story stays v4 (three roles + two-tier
   state channel), told as the refinement of the two-seat idea, with
   the v2→v3→v4 evolution kept as content — the log of stated
   trade-offs is itself one of the repo's most transferable ideas. The
   source project has since adopted relay v5 (autonomous dispatch —
   decision 16); it ships as the OPTIONAL second driving mode and
   extends the evolution log (v2→v3→v4→v5), never replaces the
   beginner-facing v4 pitch.
7. **Entry ladder: three rungs, one protocol** (recorded 2026-07-09).
   The README and setup doc present the workflow as an on-ramp you climb
   (and can climb back down), not a $40 buy-in:
   - **Rung 1 — Solo Claude (~$20/mo, Claude Pro only).** One tool plays
     all three roles, separated by SESSION instead of by seat: a planner
     session (frontier model) authors blocks into the queue; a FRESH
     executor session (mid-tier model, e.g. `/model sonnet`) implements
     one block and writes the delivery report, committing nothing; a
     reviewer session audits and commits. Every load-bearing rule
     survives with "seat" mapped to "session" — single committer (the
     reviewer session), executor-never-commits, self-contained blocks,
     fresh-context review. Honest caveats to state plainly: all three
     roles share ONE usage meter, so executor tokens compete with
     planner tokens (rationing pressure is highest on this rung), and
     review keeps the fresh-context second look but loses the
     cross-vendor second opinion.
   - **Rung 2 — Claude + Cursor trial (~$20/mo + $0).** The CONVERSION
     rung — its job is to make the adopter not want to go back. It is
     deliberately sequenced AFTER rung 1: a week or two solo teaches the
     protocol and makes the single-meter squeeze felt; the trial (a new
     Cursor account gets a Pro trial — ~2 weeks, full agent mode, no
     card required, as of mid-2026) then removes exactly that pain.
     Guidance to publish: route the token-heaviest units of your real
     backlog to the executor during the trial (the ones that hurt most
     on rung 1), taste Mode 2 parallelism in week two (impossible on one
     seat), and keep mini-receipts (units shipped, bounces, review
     catches, planner tokens freed) — by trial's end the adopter's own
     numbers are the pitch for rung 3. State the intent openly:
     designed-to-convert is honest persuasion, not a dark pattern, and
     what is being sold is the SECOND SEAT (the relay), not Cursor the
     brand — any executor with an agent mode qualifies at rung 3
     (decision 3's generalization section). State plainly that the
     post-trial Hobby tier is NOT a sustainable executor seat: the exits
     from this rung are up to $40 or back to rung 1, never "free
     forever." If the adopter's receipts genuinely don't justify the
     second seat, rung 1 is a fully supported destination, not a
     failure state.
   - **Rung 3 — Full setup (~$40/mo).** The documented v4 relay.
     Upgrading from rung 2 means paying Cursor and changing nothing
     else — same account, same repo files, same protocol; the `MODEL:`
     header starts doing real economic work here (it is where the
     included allowance holds or creeps).

   Movement between rungs — up OR down — changes which agent the human
   points at a block and nothing else. If someone tries Cursor and walks
   away, their queue, state files, templates, and habits are all intact
   on rung 1; nothing is uninstalled from the repo. This reversibility
   is a selling point — say it explicitly. Verify Cursor's current
   trial/Hobby terms against cursor.com/pricing at buildout time and
   timestamp them (decision 3's rule applies); the trial length and
   Hobby limits above are community-reported and change.

8. **Meter literacy: the plan table, window anchoring, and the usage
   tracker** (recorded 2026-07-09). Most adopters have no idea what a
   $20 seat actually buys — the repo teaches the meters and how to ration
   them. Ships as required content in `economics.md` plus a new
   `templates/usage-tracker.md`:
   - **The comparison table, with honest provenance.** economics.md
     opens with a plan table — Claude Pro $20 / the $40 stack / Max 5x
     $100 / Max 20x $200 — showing what each buys. Facts as of
     2026-07-09 (buildout re-verifies and timestamps): Anthropic
     publishes MULTIPLIERS only (Pro 1x, Max 5x, Max 20x) — it does not
     publish token quotas, and any guide quoting an exact token figure
     invented it. Community-measured anchors, always labeled as
     estimates: roughly 45 prompts per 5-hour window on Pro, ~225 on
     Max 5x, ~900 on Max 20x; 5-hour limits were permanently DOUBLED
     2026-05-06, and a +50% weekly-limit promotion (2026-05-13) runs
     through 2026-07-13 — it expires days after this decision was
     recorded, so numbers gathered today WILL shift; re-verify is not
     optional. Cursor Pro is a DIFFERENT KIND of meter and that contrast
     is the pedagogical point: $20/mo of agent usage billed at
     model-provider prices (per cursor.com docs), plus a separate
     first-party-models pool and unlimited tab completion; monthly
     reset, no rollover; overflow is opt-in pay-as-you-go. So the $40
     stack = one windowed/weekly meter (Claude) + one monthly dollar
     meter (Cursor) — two meters that fail independently, which is
     itself an argument the README can make. The Max case ships too
     (the where-Max-wins cons are already required content): a Max seat
     removes rationing as a daily concern; the repo's claim is never
     "Max is bad," it's that a beginner coding <2 hrs/day is paying for
     headroom they cannot use.
   - **Window anchoring — the human controls the clock.** The 5-hour
     window opens on your FIRST prompt and expires five hours later
     whether you used it or not; capacity does not roll over. So the
     published discipline: open the window DELIBERATELY — a cheap
     "anchor" prompt at a chosen time — so the reset lands where your
     life needs it (anchor at 4pm and a fresh window is waiting for the
     9pm session; anchor at 8am and lunch + evening draw on separate
     windows). Corollaries to publish with it: batch work into planned
     window-blocks instead of trickling prompts across the day; learn
     your weekly reset time and schedule the heaviest wave right after
     it; route token-heavy execution to the executor seat, whose
     monthly dollar meter doesn't care about your windows — this is the
     `MODEL:` header doing economic work at the meter level, and on
     rung 1 (single meter) window anchoring is the ONLY lever, which is
     worth saying explicitly.
   - **The tracker: windows are the budget unit, not tokens.**
     `templates/usage-tracker.md` is a copy-paste markdown file an
     adopter keeps in their repo or notes. Three parts: a weekly plan
     (which window-blocks they intend to open, and when), a per-session
     log (date, anchor time, seat used, units shipped, cap-hit y/n,
     one-line note), and a weekly review (windows used vs planned,
     units per window, Cursor $ spent of $20, cap hits). It doubles as
     the RUNG INSTRUMENT: never hitting caps → rung 1 suffices;
     the single meter pinching while units queue → the rung-2 trial
     pays; hitting caps weekly even on the $40 stack → the honest
     answer is Max, and the repo says so plainly. It is also the same
     file that carries rung 2's mini-receipts (decision 7) — one
     tracker, two jobs; do not ship two overlapping templates. Name
     the in-product readouts alongside the paper tracker (timestamped,
     re-verify at buildout): Claude Code's `/usage` readout, Cursor's
     dashboard included-usage meter, and `ccusage` (community npm tool
     that parses local Claude Code logs) as the power-user option.

9. **Setup UX: defaults-first manifest, step-0 tooling, generation
   receipt** (recorded 2026-07-11). The setup phase is where adopters are
   won or lost; it ships as READ-AND-PRUNE, not author-from-scratch:
   - **The interview becomes a manifest.** `templates/setup-interview.md`
     is restructured as a defaults-first manifest: every question ships
     ALREADY ANSWERED with the strict default plus a one-line
     plain-language summary of what the answer controls (e.g. "Single
     committer — only the reviewer runs `git commit`, so two agents never
     race one tree. Default: ON."). The adopter's whole job is
     keep / change / delete per line — an adopter who edits NOTHING gets
     a complete working setup. The batched-interview hard requirement in
     section 4 stands and gets sharper: the consuming agent asks zero
     questions the manifest already answers, and "strict defaults for
     unanswered items" now means defaults the adopter has already SEEN
     printed on the page — no hidden fallbacks.
   - **Two fill paths, one artifact** (amended 2026-07-11, Seth's call).
     Path A: hand-edit the manifest in any editor — for adopters who
     already know what they want. Path B, the RECOMMENDED default:
     point your agent at the manifest plus your actual project; the
     agent fills the manifest FROM EVIDENCE — it reads the repo and
     infers project shape, check lanes ("check lane: `npm test` — found
     in package.json"), whether prod/DB gate items apply — tagging each
     inferred answer with what it saw, then presents the completed
     manifest for ONE confirmation pass. Inference beats interrogation:
     the exact adopter this repo targets doesn't know what "check
     lanes" means, but can confirm "your tests run with npm test" on
     sight. The guard that keeps this honest: THE CONVERSATION IS NEVER
     THE RECORD — however the answers were reached, they land in the
     manifest file before generation runs, so the choices are
     versioned, re-consultable at rung moves, and generation stays
     reproducible from the file alone. Rung-1 note: path B spends part
     of one window; a fair one-time cost, worth stating.
   - **Step 0 — machine tooling, before the meat.** The manifest's first
     section (and setup.md's first page) settles tools before any
     protocol content: terminal (WezTerm recommended for Claude Code —
     one-line why + per-platform install command; recommended, never
     required, and only surfaced on platforms where it matters), the
     executor app, git, and whatever runtime the adopter's project needs.
     The executor-app item is RUNG-AWARE: on rung 2/3 the setup
     recommends installing Cursor now (the agent may offer the install
     command or link the download); on rung 1 it says explicitly to WAIT
     — if the trial clock starts at account signup, creating the account
     during the learning weeks burns the decision-7 conversion window;
     the trial-playbook says when to pull that trigger. Buildout must
     verify when Cursor's trial clock actually starts and timestamp it.
     GUARD: tooling recommendations live in setup.md and the manifest
     ONLY — generated templates keep naming roles, not tools (section 4).
   - **The generation receipt.** After consuming the manifest and
     generating the adopter's repo files, the consuming agent must post a
     BRIEF receipt: one line per generated file (what it is + which
     manifest answer shaped it) and a <=10-line "how your loop runs"
     primer — who acts, in what order, and the one-sentence why behind
     the two rules that surprise people (executor never commits; one
     writer for state). Brevity is a hard property of the receipt: deep
     rationale lives in the public repo's docs (protocol.md, steering.md)
     and gets LINKED, not inlined. The receipt spec ships inside
     setup-interview.md as instructions to the consuming agent.

10. **Relay-loop legibility: cheat sheet, you-are-here cues, first loop**
    (recorded 2026-07-11). The loop must be understandable at a glance
    mid-session, not only in a docs read-through:
    - **`checklists/loop-cheat-sheet.md`** (added to the target
      structure): one printable page. The loop as a "you see X -> you do
      Y" table keyed to what the HUMAN observes ("executor ended its turn
      with a delivery report -> tell the reviewer to audit"; "reviewer
      committed and updated HANDOFF -> point the executor at the next
      block"), a small loop diagram, per-rung vocabulary variants (rung 1
      in sessions, rung 3 in seats), and the three rules most often
      broken (executor never commits; one state-file writer; blocks are
      self-contained). This is the page an adopter keeps open in week
      one.
    - **You-are-here cues in the generated files.** The HANDOFF template
      carries a standing "Next action (human):" line the state-writer
      must fill on every rewrite; the delivery-report format ends with a
      fixed footer telling the human the next move. Companion hard
      requirement in section 4: the generated repo never leaves the
      adopter without a stated next action.
    - **The first loop is a walkthrough, not a reading.** setup.md ends
      with a ~15-minute "hello, relay" exercise: a pre-written trivial
      starter block (e.g. add one line to the project README) run through
      the FULL loop once — dispatch, execute, deliver, review, commit —
      before any real work. One lap teaches the relay better than any
      prose; it is cheap enough to run on every rung, and it doubles as
      the smoke test that the generated files actually work.

11. **Any-project parameterization** (recorded 2026-07-11). The
    load-bearing rules are already project-agnostic; the setup must be
    too, and must SAY so:
    - The manifest asks PROJECT SHAPE (web app / API / CLI / library /
      scripts / data-or-notebooks / docs-or-content) and CHECK LANES
      (which command proves the project still works: tests, build, lint,
      typecheck — or NOTHING YET). Generated files parameterize on the
      answers: every "tests green" in the templates becomes the adopter's
      named check lane(s). A no-lane project gets the honest degraded
      default — executor evidence becomes "show the change running"
      (command output, before/after) — plus a standing TODO in the
      generated files to add a real check lane, because
      verify-before-trust visibly weakens without one. Say that plainly;
      don't pretend the workflow is equally strong laneless.
    - The command gate parameterizes the same way: no prod -> no prod
      item; no DB -> no migrations item; EVERY project keeps the
      destructive-ops and dependency items. Dropping a gate item is a
      manifest choice, never a hand-edit of a generated template.
    - setup.md and the README state plainly that the source project (a
      full-stack app) is the worked EXAMPLE, not a requirement — one
      short "what changes if your project isn't a web app" subsection,
      whose honest answer is: the check lanes and the gate list; nothing
      else.

12. **One-paste bootstrap: the agent-guided setup path** (recorded
    2026-07-11, Seth's call). The primary quickstart is a PROMPT, not a
    procedure — and it mirrors how this repo itself was built:
    - **The entry.** The README quickstart is one paste: open Claude
      Code in (or cd to) your project — or an empty folder; the agent
      can `git init` — and paste "Read <github-link-to-SETUP.md> and
      set me up." A root-level `SETUP.md` is the agent-facing setup
      contract (added to target structure): the agent fetches/clones
      this workflow repo, reads the contract, and drives the whole
      setup from the adopter's terminal — step-0 tooling (it may run
      installs and, after installing WezTerm, tell the adopter to
      relaunch inside it), the rung question, the evidence-fill of the
      manifest (decision 9 path B), ONE confirmation pass, generation,
      the receipt, and the hello-relay first lap as the closing smoke
      test. Sell the symmetry openly: this repo was built by an agent
      reading BRIEF.md; the adopter's setup works the same way.
    - **Written like a task block.** SETUP.md carries ordered steps and
      machine-checkable done conditions (manifest complete and
      confirmed; files generated; receipt posted; hello-relay lap
      landed as the adopter's first commit) — agent-guided flows erode
      exactly like human ones, so the contract discipline applies to
      the setup itself.
    - **The pre-agent surface stays minimal: one blessed door, two
      labeled side doors** (amended 2026-07-11). The design rule is
      DEFER EVERY CHOICE THAT CAN WAIT into the agent-driven part:
      Claude Code runs fine in the stock terminal, so the terminal
      question is not a prerequisite — the agent offers WezTerm inside
      step 0 and handles the relaunch. What is irreducibly pre-agent
      is three README lines (the blessed path): run Anthropic's
      official per-OS install one-liner (no Node required; command
      timestamped and re-verified at buildout per decision 3), log in
      with your Claude subscription, open a terminal in your project
      (or an empty folder) and paste the SETUP.md prompt. Beneath it,
      a short "other ways in" note with EXACTLY TWO side doors, one
      line each: the Claude Code desktop app (same agent, same paste,
      lowest fear for the terminal-shy, makes WezTerm moot — but the
      alternative, not the default, because the workflow's destination
      is terminal-shaped and starting there avoids a migration), and
      claude.ai/code web sessions (zero-install taste: point a web
      session at your GitHub repo — the honest framing is doorstep,
      not residence; the daily loop wants local; buildout verifies
      current web-session capabilities). Never present the doors as a
      chooser matrix; the quickstart shows the blessed path only.
    - **One source, two drivers.** The agent path EXECUTES the same
      content the manual path documents — SETUP.md orchestrates and
      points into setup.md, the manifest, and the checklists; it never
      forks from them. If an adopter's agent flails, the manual path
      is the same material read by a human, not a second maintained
      flow. Decision 9's guards apply unchanged inside this path:
      evidence before questions, batched confirmation, conversation is
      never the record.

13. **Maintenance: stamped generation, re-paste updates, sideways
    rows** (recorded 2026-07-11, Fable recommendation). The adopter
    story can't end at generation — this repo will improve after
    people have generated from it:
    - **Stamped generation.** Every generated file's header carries the
      workflow version it was generated from and the date (one line,
      e.g. "generated from poor-mans-agentic-workflow v1.0,
      2026-07-15"). The repo tags releases so the stamp means
      something. Combined with the manifest, any generated setup is
      fully reproducible: version + manifest = the whole story.
    - **Updating is the same paste.** To pick up workflow improvements,
      the adopter re-runs the SETUP.md paste; the agent sees the
      existing manifest and stamps, regenerates against the new
      version, and presents a DIFF of what changed and why before
      touching anything. No separate update procedure to document or
      maintain — the one-paste path is also the upgrade path, which is
      only possible because the manifest is the record (decision 9).
    - **Sideways rows in the cheat sheet.** The loop cheat sheet gains
      a short "when it goes sideways" section, same you-see-X-do-Y
      format: agent flailed mid-setup -> the manual path is the same
      content, read docs/setup.md yourself; loop stalled and you're
      lost -> HANDOFF's "Next action (human):" line is the resume
      point; executor committed when it shouldn't have -> the
      reviewer-checklist's recovery note. Three to five rows, not a
      troubleshooting manual — the goal is that no failure strands a
      beginner without a next move (the no-dangling-next-action
      requirement, extended to failure states).

14. **tools/ waiver: the token tracker** (recorded 2026-07-12, Seth's
    call). Section 3's "no code, no CLI" rule is waived for exactly one
    tool: `tools/token-tracker/` - a zero-dependency, single-file Node
    script (plus a PowerShell anchor-ping wrapper, example config, and
    README) that automates the decision-8 disciplines locally. It
    reconstructs the adopter's 5-hour windows from the Claude Code
    transcripts already on their disk, estimates a window budget ONLY
    from lockouts actually observed (no lockouts seen = no percentage
    printed, ever), computes the anchor-ping plan from the adopter's
    weekly schedule, and offers a statusline readout. Constraints that
    keep it inside the repo's character: zero dependencies, no network
    calls, nothing leaves the machine, generated data/config gitignored,
    and the HONESTY NOTE in the script header is load-bearing - every
    figure it prints is an unofficial local estimate, and the "meter
    numbers stay honest" hard requirement applies to code output exactly
    as to prose. Positioning: an optional companion to
    `templates/usage-tracker.md`, referenced from economics.md; it
    complements ccusage (token/cost readouts) rather than replacing it -
    the differentiators are window reconstruction, lockout calibration,
    and the anchor-plan calculator. The paper tracker stays the primary
    published instrument.

15. **Receipts refresh through 2026-07-11 + post-snapshot events**
    (recorded 2026-07-12). `source-material/` gained three files the
    buildout MUST consume: `cursor-token-savings-stats.md` +
    `cursor-token-savings-data.json` (measured delivery-route split -
    78.4/21.6 by units, 80.7/19.3 by bytes, 37 units / 35 commits over
    July 2-11 - plus a two-layer token-savings estimate whose layers and
    caveats publish together or not at all) and
    `receipts-addendum-2026-07-12.md` (the executor-substitution
    receipt: Cursor ran out of Opus allowance mid-wave and a DIFFERENT
    executor delivered the wave's biggest unit from the same block file
    with zero repo changes - decision 7's roles-not-tools claim proven
    live; the cloud-dispatch delivery variant - pushed blocks, delivery
    report in a PR body, own-clone execution - which protocol.md carries
    as a second delivery channel, not a third mode; the planner-seat
    internal tier refinement for economics.md; and two new
    steering-layer receipts including a second recorded process
    deviation). Where these numbers overlap older receipts ("~24 units
    in 6 days"), the new files supersede - the README PR (#1) shipped
    with the older numbers and should be refreshed before merge or in
    the docs wave. Still OPEN (Seth decision, do not decide it in the
    buildout): whether/where the stats file's suggested charts ship
    (README vs economics.md) and their format - flag it, don't render it
    unprompted.

16. **Two driving modes: manual relay (default) and autonomous relay**
    (recorded 2026-07-14, from the source project's relay-v5 adoption —
    source: `source-material/autonomous-dispatch-2026-07-14.md`). The
    repo now offers the workflow at two levels of automation, chosen in
    the manifest, switchable at any time:
    - **Manual relay — the DEFAULT and the beginner path.** Exactly the
      v4 story already specified: the human is the message bus (one
      pointer line per unit, one "executor stopped" ping to the
      reviewer). Zero setup beyond the seats. All three rungs. Every
      existing decision applies unchanged. An adopter who never reads
      the autonomous docs has a complete workflow — the autonomous
      content must be ADDITIVE, quarantined in its own doc and one
      manifest question, never a fork of the beginner path.
    - **Autonomous relay — the opt-in power mode.** The resident
      planner seat dispatches blocks itself: headless executor CLI in
      a dedicated lane worktree outside cloud-synced folders (the
      backbone channel), or the executor's cloud-agents API (the gated
      exception — it requires usage-based billing the adopter must
      deliberately enable; it refuses cleanly at $0 otherwise). The
      resident polls, audits each delivery with the SAME per-unit
      ritual, lands it, and dispatches the next. Quota refusals descend
      a fallback ladder (named model on plan credit -> auto model free
      -> STOP, page the human) and are routine, not incidents. The
      human's remaining touchpoints are exactly the judgment surface:
      authoring go-ahead, bug reports, smoke sign-off, and every gate
      item. Extra setup is real but small (~10 min measured): executor
      CLI install + login, lane worktree, optional API key.
    - **Switching modes is the decision-13 paste, in both directions.**
      Upgrading = flip the manifest's driving-mode answer and re-run
      the SETUP.md paste; the agent adds the dispatch ritual and the
      autonomous cheat-sheet rows and NOTHING else changes — both modes
      execute the same block files verbatim, so the queue, blocks,
      state files, and delivery reports need zero edits. Downgrading is
      even cheaper: stop dispatching and point the executor at blocks
      by hand — mid-wave, per-unit, no regeneration needed (the manual
      path is always live underneath the autonomous one; the
      executor-substitution receipt generalizes). Say this reversibility
      explicitly — it is the same selling point as the rung ladder, on
      a second axis.
    - **Rung interaction.** Autonomous mode is documented and receipted
      for the full two-seat stack (rung 3) only. Whether an executor
      trial account includes headless-CLI/auto-model access is
      UNVERIFIED — buildout checks and timestamps it before writing
      rung-2 guidance. A solo-Claude autonomous variant (rung 1) has
      zero receipts and does not ship; at most one honest line naming
      it untested.
    - **README treatment.** The manual relay stays the headline pitch —
      the accessible on-ramp tone (decision 5) and the
      human-as-message-bus framing survive as the default story. The
      autonomous relay appears as a short late section ("when you're
      ready to take your hands off the loop"): one paragraph, the
      honest catches, a link to `docs/autonomous.md`. It is never the
      lead — it has the youngest receipts (one landed unit + one probe
      day vs ~5 weeks manual) and the greenest adopters can't steer
      what they haven't driven. Publish the age disclosure plainly.
    - **What stays human even in autonomous mode (non-negotiable, from
      the source spec):** the command gate never dispatches itself —
      migration-carrying or prod-touching blocks REFUSE autonomous
      dispatch; merges to main stay behind the trigger phrase; two
      bounces on one unit stops the machine and pages the human; wave
      completion hands to the frontier review gate, never to the loop.
      These hard stops are load-bearing and survive genericization
      exactly like the section-4 rules.
    - **Terminology guard:** the serial/parallel "Mode 1 / Mode 2"
      vocabulary already in the source material is a DIFFERENT axis.
      Use "driving modes" (manual relay / autonomous relay) everywhere
      for this decision; never number them.

## 3. Target structure

```
README.md                     the on-ramp pitch, the three-rung ladder
                              (pick your rung up front), cost model,
                              receipts, honest positioning,
                              who-should-not-use-this, and the one-paste
                              quickstart (decision 12): install Claude
                              Code, open it, paste the SETUP.md prompt
SETUP.md                      the agent-facing setup contract (decision
                              12): ordered steps + done conditions for
                              an agent driving the full setup from the
                              adopter's terminal — step-0 tooling,
                              rung question, manifest evidence-fill +
                              one confirmation pass, generation +
                              receipt, hello-relay lap. Orchestrates
                              docs/setup.md + the manifest + the
                              checklists; never duplicates them
docs/
  setup.md                    the seats, accounts, one-time setup — per
                              rung (solo / trial / full), plus the
                              rung-up and rung-down moves (each is one
                              paragraph precisely because nothing in the
                              repo changes). Opens with step-0 machine
                              tooling (terminal, rung-aware executor-app
                              timing, git — decision 9) and closes with
                              the ~15-min "hello, relay" first-loop
                              walkthrough (decision 10)
  protocol.md                 the loop: author -> dispatch -> execute ->
                              review -> land; statuses; the two modes;
                              the rung-1 mapping (roles = sessions, not
                              seats). The dispatch step names both
                              drivers: the human points the executor at
                              the block (manual, default) or the
                              resident dispatches it (autonomous,
                              decision 16 - one pointer line into
                              docs/autonomous.md, no forked flow)
  autonomous.md               the opt-in autonomous relay (decision 16):
                              the two dispatch channels (headless CLI in
                              a lane worktree = backbone; cloud API =
                              gated behind a deliberate usage-based
                              billing choice), the fallback ladder, the
                              resident's loop tick, the hard stops (gate
                              items never self-dispatch; two-bounce
                              stop), extra setup (~10 min), the honest
                              catches (young receipts, CLI hang bug +
                              timeout discipline, named-pool sharing
                              with IDE usage, resident windows spent on
                              polling/audit), and the switch-back
                              paragraph (stop dispatching; point by
                              hand - nothing to uninstall)
  steering.md                 the steering layer: keep-the-human-on-task
                              mechanisms + anti-loop mechanisms, framed
                              "erosion-resistant, not foolproof"
  economics.md                cost model + token levers + where the $40
                              creeps + the bookkeeping tax + per-rung
                              cost profiles (rung 1's single-meter
                              squeeze, rung 2's trial-window math,
                              rung 3's creep risk) + the decision-8
                              meter literacy content: the plan
                              comparison table (Pro / $40 stack /
                              Max 5x / Max 20x, provenance-labeled),
                              the two-kinds-of-meter explainer, and
                              window anchoring; plus the autonomous-mode
                              cost profile (decision 16): the auto-model
                              rung is the free backbone, named-model
                              dispatch shares the plan pool with the
                              adopter's own IDE usage, the cloud channel
                              is usage-based-only (real overage money,
                              OFF by default), and the resident's
                              polling/audit spends planner-seat windows
                              - autonomy shifts the bookkeeping tax from
                              human time to resident tokens, it does not
                              erase it
  scar-tissue.md              the hard-won rules and the incidents behind
                              them (include the recorded review skip and
                              the wrong-belief correction — process erosion
                              and belief loops are scars too)
templates/
  setup-interview.md          the adopter's DEFAULTS-FIRST SETUP MANIFEST
                              (tracking doc section 7, reshaped per
                              decision 9): every question pre-answered
                              with its strict default + one-line summary;
                              the adopter keeps/changes/deletes per line,
                              then points their agent at it in ONE pass.
                              Answers GENERATE the target repo's
                              AGENTS.md / gate / HANDOFF / steering
                              rules. Sections: step-0 tooling, "which
                              rung?" (parameterizes executor name +
                              MODEL: vocabulary), "which driving mode?"
                              (decision 16 - default MANUAL; answering
                              autonomous adds the dispatch ritual to the
                              generated set and the CLI items to step
                              0), project shape + check lanes (decision
                              11), gate items, state files. Also carries
                              the generation-receipt spec for the
                              consuming agent (decision 9). Generated
                              files must remain valid unchanged if the
                              adopter later moves rungs OR driving modes
  AGENTS.md                   generic shared agent contract
  HANDOFF.md                  work-state channel template + single-writer
                              rule + the cap/archive two-tier split
  task-block.md               the block template, both scales, standing
                              footer, delivery report, diagnosis variant
  tasks-README.md             the file-dispatch queue protocol (drop into
                              docs/tasks/ of a target repo)
  command-gate.md             generic ask-first gate (merge / deploy /
                              migrations / destructive / dependencies)
  dispatch-ritual.md          the autonomous-mode dispatch ritual
                              (decision 16), generated ONLY when the
                              manifest says autonomous: preconditions
                              (block queued + serialization allows +
                              lane worktree clean), the dispatch
                              command, monitor-with-timeout, the
                              fallback ladder, the hard stops. This is
                              the ONE generated file allowed to carry
                              the executor's concrete CLI invocation
                              (see the roles-not-tools carve-out in
                              section 4); ships as a loadable ritual
                              for the resident seat (a Claude Code
                              skill in the worked example)
  usage-tracker.md            the decision-8 weekly meter tracker:
                              weekly window plan, per-session log
                              (anchor time, seat, units shipped,
                              cap-hit), weekly review; doubles as the
                              rung-2 mini-receipts sheet and the
                              move-up/move-down rung instrument
checklists/
  loop-cheat-sheet.md         one printable page: the relay loop as a
                              "you see X -> you do Y" table for the
                              human, loop diagram, per-rung vocabulary,
                              the three most-broken rules (decision 10),
                              plus 3-5 "when it goes sideways" rows
                              (decision 13), plus a short autonomous
                              variant block (decision 16): what the
                              human sees/does when the resident is
                              driving (mostly: nothing, until a page),
                              and the switch-back row
  reviewer-checklist.md       the per-unit audit ritual + verify-before-trust
  worktree-ritual.md          parallel Mode 2 isolation ritual
  trial-playbook.md           the rung-2 conversion playbook: how to spend
                              the ~2-week executor trial so the two-seat
                              contrast is felt (heaviest real units first,
                              Mode 2 taste in week two, which
                              mini-receipts to keep, the decision point
                              at trial end)
tools/
  token-tracker/              the decision-14 waiver: single-file local
                              window tracker + anchor-plan calculator +
                              statusline (tracker.js, anchor-ping.ps1,
                              config.example.json, README); optional
                              companion to the usage-tracker template,
                              linked from economics.md
```

Keep it lean. This repo sells a workflow, not a framework: no code, no CLI,
no build tooling, no GitHub Actions, unless Seth explicitly asks (he has
asked exactly once - decision 14's token tracker; that waiver extends to
nothing else). The setup interview is a document an adopter points their
own agent at — not a script.

## 4. Hard requirements (non-negotiable, from the source project)

- **Honest positioning ships.** Tracking doc section 5 — the comparability
  claim, the five "where Max wins" cons stated without softening, and the
  "who should NOT use this" list — is REQUIRED published content in the
  final README, whatever the angle. Add the two cons measured since it was
  written: the ~20% planner-direct leak rate and process erosion (both in
  the receipts). This was an explicit owner decision.
- **Steering claims stay honest.** The steering layer is published as
  EROSION-RESISTANT, NOT FOOLPROOF: the guarantee is "no silent drift" —
  every deviation requires an explicit, recorded step around a named rule.
  The recorded review skip (July 4) ships as the receipt that proves both
  the limit and the guarantee. Never publish "foolproof."
- **Receipts trace or die.** Every number in the receipts section must
  trace to `queue-snapshot.md` / `handoff-archive.md` /
  `tracking-doc.md` section 8 / `cursor-token-savings-stats.md` +
  `-data.json` / `receipts-addendum-2026-07-12.md` /
  `autonomous-dispatch-2026-07-14.md`. If it isn't there,
  ask Seth or leave it out. Where the newer files overlap the older ones,
  the newer supersede (decision 15). Provenance-only rule from section 2
  applies everywhere.
- **The load-bearing rules survive genericization.** Whatever the templates
  look like, they must carry: single committer; single state-file writer;
  executor never commits; blocks fully self-contained (executor gets zero
  chat context); the standing stop-condition footer verbatim in every
  block; the delivery report (audit a claim, don't reconstruct a tree);
  verify-before-trust (re-run the executor's "tests green," SHA-check every
  commit, confirm pushes reached origin); the capped state file + verbatim
  archive split; worktrees/repos outside cloud-synced folders.
- **The setup interview is batched AND defaults-first.** All questions in
  one pass, answers written INTO the generated files, strict defaults for
  anything unanswered — and per decision 9, every default is PRINTED in
  the manifest with a one-line summary, so an adopter who edits nothing
  gets a working setup and no fallback is ever hidden. Drip-fed
  interviews are a documented anti-pattern.
- **No dangling next action.** The generated repo must never leave the
  human without a stated next move: the HANDOFF template's standing
  "Next action (human):" line, the delivery-report footer, and the loop
  cheat sheet (decision 10) all exist to guarantee this. A generated
  state file whose writer can leave that line empty is a bug against
  this requirement.
- **One source, two drivers.** The agent-guided setup (SETUP.md,
  decision 12) orchestrates the same files the manual path reads —
  docs/setup.md, the manifest, the checklists. If the two paths can
  drift apart, that's a bug: SETUP.md points into the content, never
  copies it.
- **Setup degrades gracefully to any project shape.** Generated files
  must be valid for projects with no tests, no prod, no DB (decision 11):
  check lanes and gate items parameterize from manifest answers, the
  laneless default is honest about being weaker, and destructive-ops +
  dependency gate items survive in every configuration.
- **Templates name ROLES, not tools, in load-bearing places.** The
  executor is "whatever agent you point at the block"; Cursor + Claude
  Code stay the concrete worked example (decision 3), but the seamless
  rung-up/rung-down claim in decision 7 is only honest if the generated
  repo files (AGENTS.md, task blocks, queue protocol, HANDOFF) need ZERO
  edits when the executor changes. If a template hardcodes "Cursor" where
  "the executor" belongs, that's a bug against this requirement. The
  decision-9 tooling step does not weaken this: install recommendations
  (WezTerm, Cursor, terminals) live in setup.md and the manifest's step-0
  section ONLY, timestamped per decision 3, and never leak into generated
  templates. ONE stated carve-out (decision 16): the generated
  dispatch ritual necessarily carries the executor's concrete CLI
  invocation — it IS the pointer the human used to be. It is
  parameterized from the manifest's executor answer, and changing
  executors regenerates that one file while the protocol files
  (blocks, queue, state, reports) still need zero edits — which is the
  testable form of the rung-move claim, now extended to driving-mode
  moves.
- **Manual is the default; autonomous is opt-in and reversible.** The
  manifest's driving-mode question defaults to MANUAL; an adopter who
  ignores the autonomous content entirely has a complete, first-class
  workflow. Switching up is the decision-13 re-paste (one manifest
  answer flipped); switching down requires NO regeneration — stop
  dispatching and point by hand, mid-wave if needed. If any generated
  protocol file would need editing to change driving modes, that's a
  bug against this requirement.
- **Autonomy claims stay honest, and the gate never dispatches
  itself.** The autonomous docs ship with their catches attached: the
  age disclosure (one landed unit + one probe day at snapshot time, vs
  ~5 weeks of manual receipts), the headless-CLI hang bug and the
  timeout-and-retry discipline, named-model pool sharing with the
  adopter's own IDE usage (a refusal is routine ladder descent, not an
  incident), the cloud channel's usage-based-billing requirement
  (refuses cleanly at $0 when disabled; enabling it is the adopter's
  deliberate billing decision, never the agent's), and the resident's
  window spend on polling/audit. Non-negotiable hard stops survive
  genericization: migration-carrying and prod-touching blocks refuse
  autonomous dispatch; release merges stay behind the human trigger
  phrase; two bounces on one unit stops the machine and pages the
  human; wave completion hands to the frontier review gate, never back
  to the loop. Sources: `autonomous-dispatch-2026-07-14.md`
  (trace-or-die applies).
- **Meter numbers stay honest.** In the decision-8 content, official
  facts (the plan multipliers, window/weekly mechanics, Cursor's
  published dollar amounts) and community estimates (prompts-per-window
  counts, hours-per-week figures) are DIFFERENT CLASSES of claim and
  must be labeled as such, each timestamped. Never present a token
  quota as official — Anthropic does not publish one; a guide that
  quotes one invented it, and this repo will not be that guide. All
  meter numbers get re-verified at buildout (the +50% weekly promotion
  recorded in decision 8 expires 2026-07-13, days after it was written).
- **Tier claims stay honest.** Each rung's cost ships next to its catch:
  rung 1's single-meter squeeze and weaker (same-vendor) second opinion;
  rung 2's expiring trial and the non-viability of post-trial Hobby as an
  executor seat; rung 3's allowance-creep risk. The ladder is an on-ramp,
  never a "free Max" pitch — the no-softening rule from section 5 of the
  tracking doc applies to the rungs too. Rung 2's conversion intent ships
  STATED, not hidden ("this trial is sequenced to sell you the second
  seat — here's how to check it worked on your own numbers"), and rung 1
  is always written as a supported destination, never as a nag screen.
- **No source-project internals leak.** `source-material/` is scrubbed
  (placeholders like `<prod-db-id>`, `<smoke-user>`). Keep it that way in
  everything you write; never reconstruct or guess real service names,
  hosts, IDs, or credentials.
- **Don't invent facts.** Every claim about what the workflow did must
  trace to the source material.

## 5. Working method

- Work on branches; open PRs for Seth to review. Prefer several readable
  PRs (suggested order: README first, then templates/ + the setup
  interview, then docs/, then checklists/ + the pre-publish PR) over one
  huge one.
- The repo stays **private** until Seth explicitly says to publish. Never
  change repo visibility, settings, or name yourself — surface it as a
  question instead. The pre-publish checklist (name collision check
  resolved, LICENSE present, final scrub pass, honest positioning present,
  `source-material/` + HANDOFF.md deleted or history squashed) should be
  your last PR.
- `source-material/` is read-only reference. Don't edit it; don't delete it
  until Seth says the extraction is complete.
- If source material conflicts with this brief, say so and ask rather than
  silently picking one.
