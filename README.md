# The Poor Man's Agentic Workflow

[![License: MIT](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![Works with](https://img.shields.io/badge/works%20with-any%20skills--compatible%20agent-blue.svg)](https://agentskills.io)
[![Runs on](https://img.shields.io/badge/runs%20on-%2420--40%2Fmo-brightgreen.svg)](#the-honest-trade)

**You already pay $20 a month for an AI. This gets it building software
in your project - and keeps it honest while it does.**

*Agentic coding* means the AI stops handing you code to copy and paste.
It opens your project, edits the files, runs the tests, and reports back.
Most $20 plans already include an agent that can do this.

Two things go wrong when you try it on a $20 plan:

- **You run out of usage**, because your best model is spending its
  allowance typing boilerplate.
- **The agent says "done" when it isn't.** It is confident about work it
  never finished, and nobody checks.

This repo fixes both with one habit: **one session plans, a fresh one
builds, and a third re-runs the tests itself before anything is saved.**
It's not an app. It's a set of instruction files your agent reads.

You start with the plan you have and climb only when something hurts.

**Jump to:**
[Start here](#start-here) ·
[The loop](#the-loop) ·
[What lands in your repo](#what-lands-in-your-repo) ·
[The skills](#the-skills) ·
[Receipts](#the-receipts) ·
[The honest trade](#the-honest-trade)

---

## Start here

Four levels. Each adds one idea, and each is a fine place to stop.

<a href="https://sethysethyseth.github.io/the-poor-mans-agentic-workflow/pick-your-level.html">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="docs/levels-dark.svg?v=1">
    <img alt="Four levels. Level 0: one agent plans and builds, with no check step. Level 1: one plan plays all three roles in separate sessions. Level 2: a cheap second agent takes over building. Level 3: the same setup, with handoffs happening automatically." src="docs/levels.svg?v=1" width="100%">
  </picture>
</a>

<sup>**[▶ Click any level](https://sethysethyseth.github.io/the-poor-mans-agentic-workflow/pick-your-level.html)** for the detail.</sup>

### Level 0 - let an agent change one thing · $20, nothing to install from here

Install the coding agent your plan includes (Claude Code, Codex, Cursor,
Gemini CLI). Open it in a project folder - an empty one is fine - and ask
for one small change. Watch it edit files and run commands.

**Move up when** it tells you something works and it doesn't. That will
happen, and it is the whole argument for Level 1.

### Level 1 - add the loop · same $20

Paste this into your agent, in your project folder:

```
Read https://github.com/Sethysethyseth/the-poor-mans-agentic-workflow/blob/main/skills/relay-setup/SKILL.md and set me up.
```

About twenty minutes later the workflow is in your repo and you've run
one practice task through it. From now on every piece of work is planned
in one session, built in a fresh one, and checked in a third. You carry
each task across yourself by pasting one line - on purpose, so you see
exactly what the builder was given.

**Move up when** you hit your usage limit before the week is out.

### Level 2 - give the typing to something cheaper · $20-40

Planning and checking need your smartest model but produce little text.
Building produces a lot of text and needs little judgment, as long as the
task was written well. So stop paying top price for typing:

- **Cheaper model, same plan** - point the builder at your plan's smaller
  model. Still $20.
- **A second $20 plan** from a different vendor - a separate usage limit,
  and a second opinion. This is the $40 setup the receipts below measured.

Nothing gets reinstalled. Every task already names which model should
build it.

**Move up when** the pasting, not the usage, is what's slowing you down.

### Level 3 - let it hand off by itself · same price as Level 2

The checker starts the builder for you instead of waiting for your paste.
This buys back your attention, not more capacity. It needs a builder that
can run from the command line, and it's the newest and least-proven part
of this (seven tasks behind it, against six weeks of the manual loop).

**Deploys, merges, and anything destructive wait for you at every
level.** Stepping back down is normal: nothing gets uninstalled.

**And when you're hitting limits weekly even here,** buy the expensive
plan. Outgrowing this repo is a graduation, not a failure.

<details>
<summary><b>The catch at each level, stated not softened</b></summary>

- **Level 0** - no check at all. You're trusting one agent's claim about
  its own work.
- **Level 1** - one usage limit carries all three roles, so the squeeze
  comes fastest here. You get a fresh look, not a different model's
  opinion.
- **Level 2** - $40 can creep if an expensive model ends up typing. The
  model line on each task is the control, and it only works if you use
  it. Canceling the second plan is a designed outcome.
- **Level 3** - you can't supervise a loop you've never run by hand. Do
  Level 1 or 2 first.

Cost detail, and why the second plan must be a flat subscription rather
than pay-per-use: [docs/economics.md](docs/economics.md).

</details>

## The loop

Every level from 1 up is this same loop. Only who plays each part
changes.

<a href="https://sethysethyseth.github.io/the-poor-mans-agentic-workflow/how-it-works.html">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="docs/relay-line-dark.svg?v=3">
    <img alt="One task traveling five stops: Plan on the smart agent, Hand off by you, Build on the cheap agent, Check on the smart agent, Land by you - with a send-back arc from Check to Build." src="docs/relay-line.svg?v=3" width="100%">
  </picture>
</a>

<sup>**[▶ Click the diagram](https://sethysethyseth.github.io/the-poor-mans-agentic-workflow/how-it-works.html)** for the interactive version.</sup>

Three rules hold it up, and they never change:

1. **Each role starts in a fresh session.** A new conversation can't
   inherit the last one's assumptions. That is the second look, even
   when one model plays every part.
2. **Work travels as files in your repo.** A task file goes in, a
   delivery report comes out. The agents never talk to each other, so
   any agent can fill any role.
3. **The checker never takes the builder's word.** It re-runs the tests
   itself, on the real code, and it is the only one that saves (commits)
   anything.

## What lands in your repo

Four things, all plain files. That's the whole footprint.

| File | What it is | Who writes it |
| --- | --- | --- |
| `AGENTS.md` | The standing rules, about 70 lines, read by every agent every session | Setup, once |
| `docs/tasks/*.md` | One file per task: what to change and how to prove it | The planner |
| `DELIVERY.md` | The builder's claim: files touched, check output, evidence. Never committed | The builder |
| `docs/STATE.md` | What landed, what's in flight, and your next action. About 40 lines | The checker |

## The skills

Three skills are the loop - one per role. One installs it. One is
optional.

| Skill | Role | It fires when… |
| --- | --- | --- |
| [`relay-plan`](skills/relay-plan/SKILL.md) | Planner | **you have a goal** that needs turning into task files |
| [`relay-execute`](skills/relay-execute/SKILL.md) | Builder | **a task was handed over.** Build, prove, report, stop |
| [`relay-review`](skills/relay-review/SKILL.md) | Checker | **work is waiting.** Ends in landed or sent back, and guards the merge |
| [`relay-setup`](skills/relay-setup/SKILL.md) | - | **you're installing or upgrading** |
| [`skill-map`](skills/skill-map/SKILL.md) | - | *optional:* you want to see your skills, or need a new one |

They're folders in the [Agent Skills open standard](https://agentskills.io) -
Claude Code, Codex, Cursor, Gemini CLI and 40+ other agents read them, so
switching tools rewrites nothing.

**It evolves on its own.** Every send-back becomes a permanent rule with
its accepted trade-off written beside it; any rule nobody can trace to a
real problem gets deleted.

<details>
<summary><b>Further reading</b></summary>

| | |
| --- | --- |
| [`docs/protocol.md`](docs/protocol.md) | The loop in full, including parallel worktrees |
| [`docs/autonomous.md`](docs/autonomous.md) | Level 3: when the checker starts the builder itself |
| [`docs/economics.md`](docs/economics.md) | What it costs and where it creeps |
| [`docs/receipts.md`](docs/receipts.md) | The paper trail behind every number, plus [raw data](docs/receipts-data.json) |
| [`docs/scar-tissue.md`](docs/scar-tissue.md) | Every rule, and what went wrong to cause it |
| [`checklists/loop-cheat-sheet.md`](checklists/loop-cheat-sheet.md) | "You see X, you do Y" - the one page written for you, not your agent |

</details>

## The receipts

Measured July 2–11, 2026, on two $20 plans, against a production fitness
tracker — named only so the numbers have a source. This was Level 2 with a
second plan: every handoff done by hand. The flattering and unflattering numbers
are in one list on purpose.

- **37 tasks landed in 10 days** (35 commits) — real features: database
  migrations, analytics, UI rebuilds. Not one-line fixes.
- **2 bugs that would have broken production, caught before deploy** —
  both cases where shipping the code before its database change would
  have broken live logging for everyone.
- **1 time the agent stopped and asked instead of guessing** — it hit a
  real ambiguity, paused, and escalated rather than thrashing.
- **~8 of those 37 tasks were done by the planner itself** instead of the
  cheap builder — about one in five. The split holds ~80% of the time and
  leaks under pressure, at exactly the seams it warns about.
- **~Half of all commits are bookkeeping.** That tax is real. It's been
  priced down a lot, but not to zero.
- **The required pre-merge review got skipped once**, at the owner's
  explicit instruction — and was written down at the time, so nobody
  could later pretend it happened.

Nothing here is rounded in its own favor, and every number traces back to
a file: [docs/receipts.md](docs/receipts.md), with
[the raw data](docs/receipts-data.json).

## The honest trade

**In one line:** the same output quality for meaningfully less money, paid
for in wall-clock time, your attention, and discipline about usage limits.

**Where it genuinely wins:** the same top-tier models write the specs and
review the code, and a second agent reads the work against the spec before
anything gets committed. That second look is a quality mechanism a single
agent doesn't give you at all.

<details>
<summary><b>Where the expensive plan wins — no softening</b></summary>

1. **Your time.** The expensive plan buys autonomy: one agent grinds a
   whole task out unattended. Here, most of what you save in money you
   pay back in attention. Right trade if you're time-rich and cash-poor;
   completely wrong if you bill by the hour.
2. **Usage limits are real friction.** Recorded here: a session where the
   planner built two things itself because its limit was about to reset.
3. **The $40 can creep** if expensive models end up doing the typing.
4. **Context gets lost at every handoff.** A single agent remembers
   everything from plan through debugging. Here, each task has to be
   written down completely, and the builder starts cold every time.
   Reduced by writing tasks down completely; never eliminated.
5. **Bad at open-ended work.** "Figure out why production is slow" doesn't
   split into well-specified tasks. It lands on your expensive seat and
   eats it.
6. **The split leaks** — one in five, measured. A strong default, not a
   law of physics.
7. **Process erosion is real** — the required review got skipped once.
   The system made the skip visible and permanent; it did not make it
   impossible.

</details>

<details>
<summary><b>Who should NOT use this</b></summary>

- Anyone whose **time is worth more than the savings.** You are the thing
  carrying messages between agents, and it costs attention every task.
- Anyone doing **mostly open-ended debugging** — it doesn't break into
  tasks, and it will eat your expensive seat alive.
- Anyone **unwilling to actually do the review step.** Skipping it
  quietly turns this into cheap unreviewed AI code, which is worse than
  either alternative.

</details>

**None of this was designed on a whiteboard.** Every rule exists because
something went wrong, and each change wrote down the downside it accepted
so nobody could quietly undo it later. The incident behind every rule:
[docs/scar-tissue.md](docs/scar-tissue.md).

## License

[MIT](LICENSE) — everything. Copy it, change it, ship it.
