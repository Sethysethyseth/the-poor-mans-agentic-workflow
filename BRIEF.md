# BRIEF — build instructions for the agent working in this repo

You are an agent (most likely Claude, in a claude.ai/code web session)
building this repo from a shell into a publishable public repo. The owner
(Seth) wants the work off his hands: you do the extraction, structuring, and
writing; he answers a small batched set of decisions and reviews PRs.

Read this whole file, then read everything in `source-material/`, before
writing anything.

---

## 1. What this repo becomes

A public repo (working title `the-poor-mans-agentic-workflow`) documenting a
two-seat agentic coding workflow:

- **Planner/reviewer seat** (Claude Code on Claude Pro, $20/mo): architecture,
  task authoring, diff review against spec, root-cause debugging, sole owner
  of git and state files.
- **Executor seat** (Cursor on Cursor Pro, $20/mo): token-heavy codegen —
  whole roadmap units, multi-file implementation, test runs. Writes code and
  STOPS: never commits, never touches state files.
- **The human is the message bus**: tasks are dispatched as files in the
  repo; the human's job is one pointer line per unit plus telling the
  reviewer when the executor stopped.

Total ~$40/mo vs ~$100–200/mo for a single-seat Max-tier setup. The claim —
and this exact framing is required, see section 4 — is "Max-quality
*results* for $40, paid for in wall-clock time, human attention, and
rationing discipline," NOT "Max for $40."

`source-material/tracking-doc.md` is the primary source. It was written
session-by-session in the live project specifically so this repo could be
extracted from it. Its structure (pitch, cost model, mechanism table,
hard-won rules, honest positioning, open questions) is a good skeleton for
the final README, but you own the final structure.

## 2. Step 1 — batch these questions to Seth, up front, before building

Ask all of these in one message. Do not drip them one at a time, and do not
start the buildout on guessed answers.

1. **Final repo name.** Working title is `the-poor-mans-agentic-workflow`.
   Check GitHub for collisions/squatting on similar names and suggest 2–3
   alternatives alongside the working title.
2. **License.** This is a documentation/template repo, not code. Reasonable
   options: MIT (maximally simple), CC BY 4.0 (docs-appropriate,
   attribution). Recommend one, let him pick.
3. **Tool-specific or tool-agnostic?** Ship it as "Cursor + Claude Code,
   named" (concrete, copy-pasteable, dates faster) or "any planner seat +
   any executor seat, with Cursor + Claude Code as the worked example"
   (durable, vaguer). The tracking doc lists this as an open question.
4. **The receipts.** The source project (a fitness-tracking app called
   LogChamp) provides dated, concrete evidence — a shipped-contract bug
   caught by the review gate on day one, a working-tree race between two
   agents, a Pro-limit scar. Does Seth want the project named, anonymized
   ("a production web app"), or the receipts summarized without dates?
5. **README angle/tone.** The honest-positioning content ships regardless
   (see section 4), but the framing around it — how hype vs. how dry — is
   his call. Offer 2 short sample intro paragraphs in different registers.

## 3. Step 2 — proposed target structure (adjust per Seth's answers)

```
README.md                     the pitch, cost model, honest positioning,
                              who-should-not-use-this, quickstart pointer
docs/
  setup.md                    the two seats, accounts, one-time setup
  protocol.md                 the loop: author -> dispatch -> execute ->
                              review -> land; statuses; the two modes
  economics.md                cost model + token levers + where the $40 creeps
  scar-tissue.md              the hard-won rules and the incidents behind them
templates/
  AGENTS.md                   generic shared agent contract
  HANDOFF.md                  work-state channel template + single-writer rule
  task-block.md               the block template, both scales, standing footer
  tasks-README.md             the file-dispatch queue protocol (drop into
                              docs/tasks/ of a target repo)
  command-gate.md             generic ask-first gate (merge / deploy /
                              migrations / destructive / dependencies)
checklists/
  reviewer-checklist.md       the review ritual + verify-before-trust
  worktree-ritual.md          parallel Mode 2 isolation ritual
```

Keep it lean. This repo sells a workflow, not a framework: no code, no CLI,
no build tooling, no GitHub Actions, unless Seth explicitly asks.

## 4. Hard requirements (non-negotiable, from the source project)

- **Honest positioning ships.** Section 5 of the tracking doc — the
  comparability claim, the five "where Max wins" cons stated without
  softening, and the "who should NOT use this" list — is REQUIRED published
  content in the final README, whatever the angle. This was an explicit
  owner decision, recorded in the tracking doc.
- **The load-bearing rules survive genericization.** Whatever the templates
  look like, they must carry: single committer; single state-file writer;
  executor never commits; blocks fully self-contained (executor gets zero
  chat context); the standing stop-condition footer verbatim in every block;
  verify-before-trust (re-run the executor's "tests green," SHA-check every
  commit, confirm pushes reached origin); worktrees/repos outside
  cloud-synced folders.
- **No source-project internals leak.** `source-material/` was already
  scrubbed of infrastructure identifiers (placeholders like
  `<prod-db-id>` mark the spots). Keep it that way in everything you write;
  never reconstruct or guess at real service names, hosts, or IDs.
- **Don't invent facts.** Every claim about what the workflow did ("caught a
  bug," "raced on the working tree") must trace to the source material. If
  it isn't there, ask Seth or leave it out.

## 5. Working method

- Work on branches; open PRs for Seth to review. Prefer several readable
  PRs (e.g. README first, then templates, then docs/) over one huge one.
- The repo stays **private** until Seth explicitly says to publish. Never
  change repo visibility, settings, or name yourself — surface it as a
  question instead. The pre-publish checklist (name, license, final scrub
  pass, positioning present) should be your last PR.
- `source-material/` is read-only reference. Don't edit it; don't delete it
  until Seth says the extraction is complete. It must be removed (or the
  repo history squashed) before the repo goes public — put that on the
  pre-publish checklist.
- If source material conflicts with this brief, say so and ask rather than
  silently picking one.
