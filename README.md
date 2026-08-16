# The Poor Man's Agentic Workflow

[![License: MIT](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![Works with](https://img.shields.io/badge/works%20with-any%20skills--compatible%20agent-blue.svg)](https://agentskills.io)
[![Runs on](https://img.shields.io/badge/runs%20on-%2420--40%2Fmo-brightgreen.svg)](#the-honest-trade)

**Agentic coding on two $20 plans instead of one $200 plan — without
dropping the quality.**

Here's the whole idea: one AI agent plans the work and reviews it, a
second cheaper agent writes the code, and a review gate between them
re-runs every check itself — so nothing lands just because an agent
said it was done. You pay a premium for judgment and pennies for typing.

It isn't an app or a framework. It's a folder of instructions your coding
agent reads — [five skills](#the-skills), loaded only at the moment each
one is needed. Download it, tell your agent *"set this up,"* and about
twenty minutes later your project has the whole workflow in it, plus a
practice run so you've done one lap before any real work.

> [!TIP]
> **Don't want to read all this? You don't have to.** Paste this into
> whatever AI you already use (ChatGPT, Claude, anything that reads links):
>
> ```
> Read https://github.com/Sethysethyseth/the-poor-mans-agentic-workflow and give me the short version: what it is, what it costs, and which level I should start at.
> ```
>
> The same move runs the entire install —
> [the quickstart is one paste](#quickstart-one-paste).

You are not getting the $200 plan for $40. You're getting **the same
quality of output**, paid for in wall-clock time, your attention, and some
discipline about usage limits. [The honest list of what you give
up](#the-honest-trade) is at the bottom, unsoftened.

**Jump to:**
[How it works](#how-it-works) ·
[Pick your level](#pick-your-level) ·
[The skills](#the-skills) ·
[Quickstart](#quickstart-one-paste) ·
[What's in the repo](#whats-in-the-repo) ·
[Receipts](#the-receipts) ·
[The honest trade](#the-honest-trade)

---

## How it works

Two agents, and they can't talk to each other. Work travels between them
as **files in your repo**, which means your whole job is one pasted line
per handoff.

<a href="https://sethysethyseth.github.io/the-poor-mans-agentic-workflow/how-it-works.html">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="docs/relay-line-dark.svg?v=3">
    <img alt="One task traveling five stops: Plan on the smart agent, Hand off by you, Build on the cheap agent, Check on the smart agent, Land by you — with a send-back arc from Check to Build." src="docs/relay-line.svg?v=3" width="100%">
  </picture>
</a>

<sup>**[▶ Click the diagram](https://sethysethyseth.github.io/the-poor-mans-agentic-workflow/how-it-works.html)** to open the interactive version, where every stop explains what it costs and what you do.</sup>

**The one rule that makes it work:** the reviewer never takes the
builder's word for anything. It runs the tests again, itself, on the
actual code. Agents are confident about work they didn't finish — this is
the step that catches it.

<details>
<summary><b>Why splitting the work in two saves so much money</b></summary>

The work has two very different cost profiles, and one expensive agent
charges you top price for both:

- **Planning, reviewing, debugging** — needs the smartest model, but
  barely any output. Short, expensive, high-value.
- **Writing the code** — needs a lot of output, but not much judgment,
  *as long as the task was specified well*. Long, cheap, mechanical.

Paying top price for judgment and commodity price for typing is just
matching the cost to the value. That's why the savings don't disappear
when prices change.

| Setup | $/mo | What you're buying |
| --- | --- | --- |
| One good agent plan | $20 | Smart, but rationed — and doing everything |
| **This workflow** (two plans) | **$40** | Judgment at premium price, typing at cheap price |
| A top-tier plan | $100–200 | Never thinking about usage limits |

*Prices as of July 2026 — a dated example, not the durable claim. Full
cost breakdown: [docs/economics.md](docs/economics.md).*

</details>

## Pick your level

You don't start at $40 — each level adds exactly one idea. And because the
workflow lives in your repo rather than inside any one tool, moving up *or
down* just changes which agent you point at a task.

<a href="https://sethysethyseth.github.io/the-poor-mans-agentic-workflow/pick-your-level.html">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="docs/levels-dark.svg?v=1">
    <img alt="Four levels. Level 0: one agent plans and builds, with no check step. Level 1: one seat plays all three roles in separate sessions. Level 2: a cheap second agent takes over building. Level 3: the same two seats, with handoffs happening automatically." src="docs/levels.svg?v=1" width="100%">
  </picture>
</a>

<sup>**[▶ Click any level](https://sethysethyseth.github.io/the-poor-mans-agentic-workflow/pick-your-level.html)** for what it involves — what you need, what it costs you, and the catch.</sup>

- **Never done any of this? Start at Level 0.** Ship one tiny change with
  one agent and come back. The install will still be one paste.
- **Most people should land on Level 2.** It and Level 3 cost the same
  because they buy different things: Level 2 buys **capacity**, Level 3
  buys **your attention back**. Capacity usually comes first — but that's
  a recommendation, not a requirement.
- **Level 3 needs your cheap agent to have a headless CLI**, because the
  reviewer has to drive it programmatically and it can't type into a
  window for you. What the cheap agent actually is — and why the $40 holds
  only because that second seat is a flat subscription rather than metered
  API billing — is in [docs/economics.md](docs/economics.md).

<details>
<summary><b>The catch at each level, stated not softened</b></summary>

- **Level 0** — no review step at all, so you're trusting one agent's
  claim about its own work. Fine for a taste. The first time it
  confidently breaks something is the argument for Level 1.
- **Level 1** — every role shares one usage limit, so you'll feel the
  squeeze fastest here. You still get a fresh second look at the code;
  you just don't get a second opinion from a different model. It also
  makes you copy-paste on purpose: handing the task over yourself is the
  only way to see exactly what the builder was given.
- **Level 2** — the $40 can creep, because letting an expensive model do
  the typing burns your allowance fast. Every task carries a line naming
  which model tier should run it; that's the control, and it only works
  if you use it. If a month of this doesn't feel worth $20, canceling
  and going back to Level 1 is a designed outcome, not a failure.
- **Level 3** — the newest and least-proven part of this (seven tasks
  behind it, against six weeks of the manual loop), and you can't
  supervise a loop you've never run yourself. **Deploys, merges, and
  anything destructive always wait for you to say so**, at every level.

When you find yourself hitting usage limits weekly even at Level 3, the
honest answer is to go buy the expensive plan. This path openly ends in
**outgrowing this repo** — that's a graduation, not a failure.

</details>

## The skills

A skill is a folder with an instruction file your agent loads **only when
that moment actually arrives** — so it costs almost nothing to keep
around. That's the [Agent Skills open standard](https://agentskills.io),
not a Claude feature: Claude Code, Codex, Cursor, Gemini CLI, Copilot,
Goose, Roo Code and 40+ other agents read this format, which means **you
can switch models or tools without rewriting anything.**

| Skill | It fires when… |
| --- | --- |
| [`relay-setup`](skills/relay-setup/SKILL.md) | **you're installing this.** The whole install in one file — and the upgrade path later |
| [`relay-plan`](skills/relay-plan/SKILL.md) | **you have a goal**, and it needs turning into task files someone else could build from |
| [`relay-execute`](skills/relay-execute/SKILL.md) | **a task has been handed over.** Build it, prove it, write down what you did, stop |
| [`relay-review`](skills/relay-review/SKILL.md) | **work is waiting to be checked.** Ends in landed or sent back — and guards the merge |
| [`skill-map`](skills/skill-map/SKILL.md) | **you want to see what you have**, or you need a new skill that doesn't exist yet |

**Want the detail on any of them?** Ask whatever AI you're already using:

```
Read https://github.com/Sethysethyseth/the-poor-mans-agentic-workflow/tree/main/skills and tell me what each skill does, when it fires, and which one I'd touch first.
```

**It's built to evolve on its own.** Every time work gets sent back,
`relay-review` turns that failure into a permanent rule, with the
trade-off it accepted written next to it. `relay-setup` pulls in
improvements from here later without touching anything you've customized.
And `skill-map` writes you a new skill when you catch yourself repeating
something — after making it earn the slot. It shrinks too: any rule nobody
can trace to a real problem gets deleted.

## Quickstart: one paste

The install is done by an agent — the same way this whole repo was built.

1. **Install a coding agent** if you don't have one — Claude Code, Codex,
   Cursor, Gemini CLI, or anything else that reads skills.
2. **Open it in your project folder.** No project yet? An empty folder is
   fine; the agent will set up git for you.
3. **Paste this:**

   ```
   Read https://github.com/Sethysethyseth/the-poor-mans-agentic-workflow/blob/main/skills/relay-setup/SKILL.md and set me up.
   ```

That's the whole install. The agent reads your project, works out the
answers itself, and asks you to confirm once — no questionnaire. Then it
writes the workflow into your repo, makes sure you have a working test
command (and **proves it can actually fail**, because a test that can't
fail checks nothing), and walks you through one practice task end to end.

Every decision it made gets written down in one file, so you can change
your mind later — and updating it down the road is the same skill run
again, not a reinstall.

## What's in the repo

No code, no CLI, no framework — documents you point your own agent at.
GitHub already shows you the file tree above this README; here's what each
part is for.

<details>
<summary><b>The file map</b></summary>

| | |
| --- | --- |
| [`core/`](core/) | The rules, in one place: the [agent contract](core/CONTRACT.md), the [task format](core/BLOCK.md), the state file |
| [`skills/`](skills/) | The five skills — set up, plan, build, check, and the one that keeps the set current |
| [`docs/how-it-works.html`](https://sethysethyseth.github.io/the-poor-mans-agentic-workflow/how-it-works.html) | The interactive walkthrough of the loop — live, or open the file locally |
| [`docs/pick-your-level.html`](https://sethysethyseth.github.io/the-poor-mans-agentic-workflow/pick-your-level.html) | The levels, clickable — including what the cheap agent actually is |
| [`docs/economics.md`](docs/economics.md) | What it costs, where the $40 creeps, how to watch your usage |
| [`docs/receipts.md`](docs/receipts.md) | The full paper trail behind every number here, plus [the raw data](docs/receipts-data.json) |
| [`docs/scar-tissue.md`](docs/scar-tissue.md) | Every rule, and the thing that went wrong to cause it |
| [`checklists/loop-cheat-sheet.md`](checklists/loop-cheat-sheet.md) | "You see X → you do Y" — the one page written for you, not your agent |

</details>

## The receipts

Measured July 2–11, 2026, on two $20 plans, against a production fitness
tracker — named only so the numbers have a source. This was Level 2: two
seats, every handoff done by hand. The flattering and unflattering numbers
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
