# The Poor Man's Agentic Workflow

[![License: MIT](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![Works with](https://img.shields.io/badge/works%20with-any%20skills--compatible%20agent-blue.svg)](https://agentskills.io)
[![Runs on](https://img.shields.io/badge/runs%20on-%2420--40%2Fmo-brightgreen.svg)](#the-honest-trade)

**Agentic coding on two $20 plans instead of one $200 plan - without
dropping the quality.**

One agent plans and reviews. A cheaper one writes the code. Between them
sits a gate that **re-runs every check itself**, so nothing lands because
an agent said it was done. Premium price for judgment, commodity price for
typing.

It's not an app or a framework - it's [five skills](#the-skills) your
coding agent loads only when needed. Install is one paste, in a coding
agent opened in your project folder:

```
Read https://github.com/Sethysethyseth/the-poor-mans-agentic-workflow/blob/main/skills/relay-setup/SKILL.md and set me up.
```

About twenty minutes later the workflow is in your repo and you've run one
practice task through it. No project yet? An empty folder is fine.

**Jump to:**
[The loop](#one-loop) ·
[Two dials](#two-dials) ·
[The skills](#the-skills) ·
[Receipts](#the-receipts) ·
[The honest trade](#the-honest-trade)

---

## One loop

There is exactly one thing to learn. Every setup below is this loop,
unchanged.

<a href="https://sethysethyseth.github.io/the-poor-mans-agentic-workflow/how-it-works.html">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="docs/relay-line-dark.svg?v=3">
    <img alt="One task traveling five stops: Plan on the smart agent, Hand off by you, Build on the cheap agent, Check on the smart agent, Land by you - with a send-back arc from Check to Build." src="docs/relay-line.svg?v=3" width="100%">
  </picture>
</a>

<sup>**[▶ Click the diagram](https://sethysethyseth.github.io/the-poor-mans-agentic-workflow/how-it-works.html)** for the interactive version.</sup>

Three rules hold it up, and they never change:

1. **Roles are sessions, not seats.** Plan, build, and check each start
   cold. A fresh session can't inherit the last one's assumptions - that
   is the second look, even when one model plays every part.
2. **Files are the only wire.** The task file goes in, `DELIVERY.md` comes
   out, both live in your repo. Agents never talk to each other, so any
   agent can fill any role.
3. **The checker never takes the builder's word.** It re-runs the tests
   itself, on the real code, and it is the only one that commits.

## Two dials

Everything else is two independent settings. Turn either one, either way,
any time - it's a line in a manifest, not a reinstall.

**Dial 1 - who builds** (buys *capacity*)

| Setting | Cost | What changes |
| --- | --- | --- |
| Same model, fresh session | ~$20 | Nothing extra. One usage limit carries all three roles |
| Cheaper model tier, same plan | ~$20 | Typing stops burning your best model's allowance |
| A second, cheap seat | ~$40 | A second meter, and a second opinion from a different vendor |

**Dial 2 - who carries the handoff** (buys *attention*)

| Setting | What changes |
| --- | --- |
| You paste one line | You see exactly what the builder was given. Start here |
| The checker dispatches | Needs a builder with a headless CLI. You get your time back, not capacity |

**Start with both dials at their first setting.** Run three clean tasks,
then turn whichever one hurts: out of usage, turn Dial 1; tired of
pasting, turn Dial 2. Deploys, merges, and anything destructive wait for
you at every setting.

<details>
<summary><b>The old level numbers, if you came in on them</b></summary>

The levels are four presets of the same two dials - still valid in the
manifest, and still [clickable here](https://sethysethyseth.github.io/the-poor-mans-agentic-workflow/pick-your-level.html).

| Level | Dial 1 | Dial 2 |
| --- | --- | --- |
| 0 | *(no loop - one agent, no check)* | - |
| 1 | Same model, fresh session | You |
| 2 | Second seat | You |
| 3 | Second seat | The checker |

The combinations the ladder never named - a cheaper tier on one plan, or
one seat with automatic handoff - work the same way.

</details>

<details>
<summary><b>The catch at each setting, stated not softened</b></summary>

- **One limit for everything** squeezes fastest, and you get a fresh look
  but not a different model's opinion.
- **A second seat can creep past $40** if an expensive model ends up
  typing. Every task names its model tier; that control only works if you
  use it. Canceling the seat is a designed outcome, not a failure.
- **Automatic handoff is the least-proven part** (seven tasks behind it,
  against six weeks of the manual loop), and you can't supervise a loop
  you've never run by hand.
- **Hitting limits weekly with both dials turned?** Go buy the expensive
  plan. Outgrowing this repo is a graduation.

Cost detail and why the second seat must be a flat subscription:
[docs/economics.md](docs/economics.md).

</details>

## The skills

Folders of instructions in the [Agent Skills open standard](https://agentskills.io) -
Claude Code, Codex, Cursor, Gemini CLI and 40+ other agents read them, so
switching tools rewrites nothing.

| Skill | It fires when… |
| --- | --- |
| [`relay-setup`](skills/relay-setup/SKILL.md) | **you're installing or upgrading** |
| [`relay-plan`](skills/relay-plan/SKILL.md) | **you have a goal** that needs turning into task files |
| [`relay-execute`](skills/relay-execute/SKILL.md) | **a task was handed over.** Build, prove, report, stop |
| [`relay-review`](skills/relay-review/SKILL.md) | **work is waiting to be checked.** Ends in landed or sent back |
| [`skill-map`](skills/skill-map/SKILL.md) | **you want to see what you have**, or need a skill that doesn't exist |

**It evolves on its own.** Every send-back becomes a permanent rule with
its accepted trade-off written beside it; any rule nobody can trace to a
real problem gets deleted.

<details>
<summary><b>What's in the repo</b></summary>

| | |
| --- | --- |
| [`core/`](core/) | The [agent contract](core/CONTRACT.md) and the [task format](core/BLOCK.md) |
| [`skills/`](skills/) | The five skills |
| [`docs/economics.md`](docs/economics.md) | What it costs and where it creeps |
| [`docs/receipts.md`](docs/receipts.md) | The paper trail behind every number, plus [raw data](docs/receipts-data.json) |
| [`docs/scar-tissue.md`](docs/scar-tissue.md) | Every rule, and what went wrong to cause it |
| [`checklists/loop-cheat-sheet.md`](checklists/loop-cheat-sheet.md) | "You see X, you do Y" - the one page written for you, not your agent |

</details>

## The receipts

Measured July 2–11, 2026, on two $20 plans, against a production fitness
tracker — named only so the numbers have a source. Settings: second seat,
every handoff done by hand. The flattering and unflattering numbers
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
