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
hard requirement.

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

6. **Story version: v4** (three roles + two-tier state channel), told as
   the refinement of the two-seat idea, with the v2→v3→v4 evolution kept
   as content — the log of stated trade-offs is itself one of the repo's
   most transferable ideas.
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

## 3. Target structure

```
README.md                     the on-ramp pitch, the three-rung ladder
                              (pick your rung up front), cost model,
                              receipts, honest positioning,
                              who-should-not-use-this, quickstart pointer
docs/
  setup.md                    the seats, accounts, one-time setup — per
                              rung (solo / trial / full), plus the
                              rung-up and rung-down moves (each is one
                              paragraph precisely because nothing in the
                              repo changes)
  protocol.md                 the loop: author -> dispatch -> execute ->
                              review -> land; statuses; the two modes;
                              the rung-1 mapping (roles = sessions, not
                              seats)
  steering.md                 the steering layer: keep-the-human-on-task
                              mechanisms + anti-loop mechanisms, framed
                              "erosion-resistant, not foolproof"
  economics.md                cost model + token levers + where the $40
                              creeps + the bookkeeping tax + per-rung
                              cost profiles (rung 1's single-meter
                              squeeze, rung 2's trial-window math,
                              rung 3's creep risk)
  scar-tissue.md              the hard-won rules and the incidents behind
                              them (include the recorded review skip and
                              the wrong-belief correction — process erosion
                              and belief loops are scars too)
templates/
  setup-interview.md          the adopter's setup-phase questionnaire
                              (tracking doc section 7): asked in ONE batch,
                              answers GENERATE the target repo's AGENTS.md /
                              gate / HANDOFF / steering rules; unanswerable
                              questions get strict defaults. Includes a
                              "which rung are you starting on?" question
                              that parameterizes the generated files
                              (executor name, model vocabulary in the
                              MODEL: header) — and the generated files
                              must remain valid unchanged if the adopter
                              later moves rungs
  AGENTS.md                   generic shared agent contract
  HANDOFF.md                  work-state channel template + single-writer
                              rule + the cap/archive two-tier split
  task-block.md               the block template, both scales, standing
                              footer, delivery report, diagnosis variant
  tasks-README.md             the file-dispatch queue protocol (drop into
                              docs/tasks/ of a target repo)
  command-gate.md             generic ask-first gate (merge / deploy /
                              migrations / destructive / dependencies)
checklists/
  reviewer-checklist.md       the per-unit audit ritual + verify-before-trust
  worktree-ritual.md          parallel Mode 2 isolation ritual
  trial-playbook.md           the rung-2 conversion playbook: how to spend
                              the ~2-week executor trial so the two-seat
                              contrast is felt (heaviest real units first,
                              Mode 2 taste in week two, which
                              mini-receipts to keep, the decision point
                              at trial end)
```

Keep it lean. This repo sells a workflow, not a framework: no code, no CLI,
no build tooling, no GitHub Actions, unless Seth explicitly asks. The
setup interview is a document an adopter points their own agent at — not a
script.

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
  `tracking-doc.md` section 8. If it isn't there, ask Seth or leave it out.
  Provenance-only rule from section 2 applies everywhere.
- **The load-bearing rules survive genericization.** Whatever the templates
  look like, they must carry: single committer; single state-file writer;
  executor never commits; blocks fully self-contained (executor gets zero
  chat context); the standing stop-condition footer verbatim in every
  block; the delivery report (audit a claim, don't reconstruct a tree);
  verify-before-trust (re-run the executor's "tests green," SHA-check every
  commit, confirm pushes reached origin); the capped state file + verbatim
  archive split; worktrees/repos outside cloud-synced folders.
- **The setup interview is batched.** All questions in one message, answers
  written INTO the generated files, strict defaults for anything
  unanswered. Drip-fed interviews are a documented anti-pattern.
- **Templates name ROLES, not tools, in load-bearing places.** The
  executor is "whatever agent you point at the block"; Cursor + Claude
  Code stay the concrete worked example (decision 3), but the seamless
  rung-up/rung-down claim in decision 7 is only honest if the generated
  repo files (AGENTS.md, task blocks, queue protocol, HANDOFF) need ZERO
  edits when the executor changes. If a template hardcodes "Cursor" where
  "the executor" belongs, that's a bug against this requirement.
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
