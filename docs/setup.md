# Setup - seats, accounts, and the one-time ritual, per level

This is the manual path: the same content the agent-driven
[one-paste quickstart](../SETUP.md) executes, readable by a human. If your
agent flails mid-setup, you finish HERE - there is no second flow to learn.

The ladder itself (what each level costs, teaches, and catches) lives on
[the README](../README.md#pick-your-level). This page is the mechanics:
what to install, what to sign up for, and what to generate, at each level.

---

## Step 0 - machine tooling (before any protocol content)

Settle the machine first. All of this is also the first section of
[the setup manifest](../templates/setup-interview.md), so the agent-driven
path walks you through the same list.

- **A terminal.** The planner seat runs in one. A modern terminal makes
  long sessions nicer (fast rendering, sane scrollback); **WezTerm** is
  the recommendation where the stock option is weak (the old Windows
  console, older macOS Terminal) - install commands at
  [wezterm.org](https://wezterm.org/installation.html). Recommended,
  never required: if your terminal already serves you, keep it.
- **The planner-seat agent.** The worked example is **Claude Code**
  (official installer, no Node.js required - as of July 2026, re-verify
  at [the install docs](https://code.claude.com/docs/en/setup)):

  ```bash
  # macOS / Linux / WSL
  curl -fsSL https://claude.ai/install.sh | bash
  ```

  ```powershell
  # Windows PowerShell
  irm https://claude.ai/install.ps1 | iex
  ```

  On ChatGPT instead? Install **Codex CLI** and read "planner seat" as
  your Codex terminal session throughout (as of July 2026 - re-verify at
  [chatgpt.com/codex](https://chatgpt.com/codex)):

  ```bash
  # macOS / Linux
  curl -fsSL https://chatgpt.com/codex/install.sh | sh
  ```

  ```powershell
  # Windows PowerShell
  powershell -ExecutionPolicy ByPass -c "irm https://chatgpt.com/codex/install.ps1 | iex"
  ```

  *(Fallback if the served install script fails: `npm i -g @openai/codex` or Homebrew per OpenAI docs - a July 2026 report found the CDN script lagging the repo.)*

  Log in with your existing subscription either way - no API key. The
  README's [honesty note](../README.md#on-chatgpt-instead-of-claude)
  applies: our receipts are all from the Claude Code + Cursor pair.
- **The executor app - LEVEL-AWARE, and the timing matters.**
  - Level 2, 3, or 4: install and subscribe now (worked example: Cursor
    Pro ~$20/mo, from [cursor.com](https://cursor.com)).
  - Level 0 or 1: **wait.** Do not subscribe yet - the test month's value
    comes from feeling the Level 1 squeeze first.
    [The test-month playbook](../checklists/test-month-playbook.md) says
    when to pull the trigger. *(As of 2026-07-18, the free Pro trial is
    removed - staff-confirmed 2026-07-03; the free Hobby tier is a taste
    of the editor, not a viable executor seat.)*
- **Git**, and whatever runtime your project's checks need.
- **Repo location.** Cloud-synced folders (OneDrive / Dropbox / Drive)
  cause file-lock hangs and stale reads - a documented scar
  ([scar-tissue.md](scar-tissue.md)). The repo should live outside sync;
  worktrees MUST.

## Level 0 - toes in the water (nothing to set up from this repo)

One agent, your project, no protocol. Install a planner-seat agent
(step 0), open it in a repo, ship one tiny real change. Level 0
deliberately generates nothing - the manifest run happens when you enter
Level 1. When the agent first confidently breaks something and you have
only its own word for what happened, that's the argument for Level 1,
and you're ready for it.

*(Cost, as of July 2026: ChatGPT's Free tier includes some Codex usage,
so the ChatGPT door is a genuine $0 entry; Claude Code needs a $20 Pro
seat. Plan terms move - re-verify.)*

## Level 1 - the shallow end (the solo relay)

**Accounts:** one planner-seat subscription (~$20/mo, as of 2026-07-18).
Nothing else.

**Setup:** run the manifest. Either paste the
[quickstart prompt](../SETUP.md) at your agent (recommended - it fills
the manifest from your repo's evidence and you confirm once), or
hand-edit [templates/setup-interview.md](../templates/setup-interview.md)
and point your agent at it. Answer `Level 1`, driving mode `manual`.
Generation gives you: an agent contract (AGENTS.md) with the command
gate, the work-state file + archive, the task queue with its README and
block template, and a trivial `hello-relay` starter block.

**How roles work here:** one tool plays all three roles, separated by
SESSION instead of seat - a frontier-model session authors blocks into
the queue; a FRESH mid-tier session (your tool's model selector: `/model`
in both Claude Code and Codex CLI, as of July 2026) implements ONE block
and stops, committing nothing; a reviewer session audits and commits.
Every load-bearing rule survives with "seat" read as "session."

**The honest catch, so you feel it knowingly:** all three roles share one
usage meter, so executor tokens compete with planner tokens - rationing
pressure is highest at this level, and
[window anchoring](economics.md#window-anchoring---you-control-the-clock)
is your only lever.
Keep [the usage tracker](../templates/usage-tracker.md) from week one;
its rows are how you'll know whether Level 2 is worth it.

## Level 2 - waist deep (the paid test month)

**Accounts:** Level 1 + a NEW executor subscription (Cursor Pro, ~$20/mo,
cancel anytime), created when
[the test-month playbook](../checklists/test-month-playbook.md) says to - not
before. ~$40 total for the test month (as of 2026-07-18).

**The trial-removal fact, dated:** as of 2026-07-18, the free Pro trial has
been removed system-wide - staff-confirmed on the official forum 2026-07-03.
The free Hobby tier is a taste of the editor, NOT a viable executor seat. If
a trial ever returns, treat it as a free test month - same playbook.

**Setup delta: none.** Your generated files already name roles, not
tools - "the executor" simply stops meaning "my cheap session" and
starts meaning "the agent app I point at the block." Re-run the manifest
paste only if you want the records updated (`Answer: Level 2`); nothing
generated changes.

**What to do with the test month:** the playbook, in one line - route your
token-heaviest REAL units to the executor, taste parallelism in week two,
keep mini-receipts in the usage tracker. At month's end your own numbers make
the call: continue to Level 3 (subscription keeps going), or cancel and drop
back to Level 1.

## Level 3 - the deep end (the documented two-seat relay)

**Accounts:** planner seat + executor seat (~$40/mo total, as of
July 2026).

**Setup delta from Level 2: pay the executor. Change nothing else.**
Same account, same repo files, same protocol - this is the level-mobility
property doing its job, not a lucky accident. The `MODEL:` header on
each block starts doing real economic work here: it is where the $40
holds or creeps ([economics.md](economics.md#where-the-40-creeps)).

## Level 4 - open water (the autonomous relay)

**Prerequisite: you have driven Level 3 manually.** You can't steer a
loop you've never driven; the levels below aren't a formality.

**Setup delta (~10 minutes, measured):** install the executor's CLI and
log in once; create a lane-worktree parent directory OUTSIDE cloud-synced
folders; re-run the manifest paste with driving mode flipped to
`autonomous`. Generation adds exactly one file - the
[dispatch ritual](../templates/dispatch-ritual.md) - and nothing else
changes. Full mechanics, channels, and the hard stops:
[autonomous.md](autonomous.md).

**Stepping back down needs no regeneration:** stop dispatching and point
the executor at blocks by hand, mid-wave if you like. Both driving modes
execute the same block files verbatim.

## Moving between levels (each move is one paragraph, on purpose)

- **Up:** each level-up is one new account or one manifest answer -
  never a file rewrite. Level 1→2: create the executor account per the
  playbook. Level 2→3: pay the executor. Level 3→4: the ~10-minute CLI
  setup + one flipped manifest answer.
- **Down:** point your blocks at a cheaper agent (or your own cheap
  sessions) again. Your queue, state files, templates, and habits are
  all intact - nothing is uninstalled from the repo, ever. Stepping down
  is a normal move the tracker will sometimes recommend; the ladder is
  honest in both directions.
- **Out (graduation):** hitting caps weekly at Level 3-4 with `MODEL:`
  routing already honest means the answer is a Max-tier seat. This path
  openly ends with outgrowing this repo.

## Hello, relay - the first lap (~15 minutes, every level from 1 up)

One lap through the FULL loop on a trivial change teaches the relay
better than any docs read - and it doubles as the smoke test that your
generated files actually work. Setup generated a starter block
(`u0-hello-relay` in your task queue: add one line to your project's
README) sized for exactly this.

1. **Dispatch.** Open your executor (at Level 1: a fresh mid-tier
   session) and paste: *"Read `docs/tasks/u0-hello-relay.md` and execute
   it exactly. It is the complete task; do not ask for the task in
   chat."*
2. **Watch it stop.** It makes the change, writes `DELIVERY.md`, and
   ends its turn without committing. That stop is the protocol working.
3. **Review.** Tell your reviewer (at Level 1: a fresh session): *"The
   executor stopped - review the delivery."* It audits the report
   against the tree, re-runs your check lane, commits with SHA
   verification, and updates the work-state file - including its "Next
   action (human):" line.
4. **Look at what just happened.** One block file, three actors, zero
   shared chat context, one commit, and a state file that tells you
   what's next. That's the whole loop; real units are the same lap with
   bigger blocks.

Keep [the loop cheat sheet](../checklists/loop-cheat-sheet.md) open for
week one - it's the "you see X → you do Y" version of everything above.
