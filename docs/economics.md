# Economics - the cost model, the meters, and where the $40 creeps

Most adopters have no idea what a $20 seat actually buys. This page
teaches the meters and how to ration them - because at this price point,
rationing discipline IS part of what you're paying with.

A provenance rule this page lives by: **official facts and community
estimates are different classes of claim**, and each number below is
labeled as one or the other, with a date. Anthropic publishes plan
MULTIPLIERS only - it does not publish token quotas. Any guide quoting
you an exact official token figure invented it; this repo will not be
that guide.

---

## The plan table (verified 2026-07-16; prices move - re-verify)

| Plan | $/mo | What it buys | Class of claim |
| --- | --- | --- | --- |
| Claude Pro | $20 | The planner seat. 1x usage: 5-hour rolling windows + a weekly cap | Official: multiplier + mechanics |
| **This workflow** (Pro + executor Pro) | **$40** | One windowed meter (Claude) + one monthly dollar meter (executor) - two meters that fail independently | - |
| Claude Max 5x | $100 | ~5x Pro's per-window usage; rationing mostly stops being a thought | Official: multiplier |
| Claude Max 20x | $200 | ~20x; never thinking about the meter | Official: multiplier |

Community-measured anchors, **estimates, not quotas** (mid-2026,
post-doubling): very roughly ~45 prompts per 5-hour window on Pro, ~225
on Max 5x, ~900 on Max 20x - useful for intuition, worthless as a
guarantee. Two dated official mechanics worth knowing: the 5-hour limits
were permanently DOUBLED on 2026-05-06 (and peak-hour throttling
removed), and a +50% weekly-limit promotion ran 2026-05-13 through
2026-07-13 - expired as this page was written, which is why no weekly
numbers appear here. Both weekly caps (all-models and a separate
mid-tier-only cap on Max) still apply.

On ChatGPT instead? The same table shape works with ChatGPT plans in the
planner row (Free includes limited Codex usage; Plus $20; Pro $100/5x
and $200/20x - per OpenAI's published pricing as of 2026-07-16). Same
provenance rule: OpenAI publishes per-window message RANGES by model,
not token quotas.

## Two kinds of meter (the pedagogical point of the $40 stack)

- **The planner seat is WINDOWED:** a 5-hour rolling window plus a
  weekly cap. Capacity expires whether you use it or not; the unit you
  budget is the window, not the token.
- **The executor seat is a MONTHLY DOLLAR POOL:** ~$20/mo of agent usage
  metered at model-provider prices (per the executor's published docs,
  as of July 2026), plus separate cheap/first-party allowances; monthly
  reset, no rollover; overflow is opt-in pay-as-you-go that you should
  leave OFF.

Two meters that fail independently is itself an argument for the second
seat: a planner lockout doesn't stop the executor mid-unit, and an
exhausted executor pool doesn't touch your planning windows. At Level 1
there is ONE meter and everything competes - which is why the level's
catch is real and why window anchoring (below) is the only lever there.

## Window anchoring - you control the clock

The 5-hour window opens on your FIRST prompt and expires five hours
later, used or not. So open it DELIBERATELY: a cheap "anchor" prompt at
a chosen time puts the reset where your life needs it. Anchor at 4pm
and a fresh window is waiting for the 9pm session; anchor at 8am and
lunch + evening draw on separate windows.

Corollaries: batch work into planned window-blocks instead of trickling
prompts across the day; learn your weekly reset time and schedule the
heaviest wave right after it; route token-heavy execution to the
executor seat, whose dollar meter doesn't care about your windows - the
`MODEL:` header doing economic work at the meter level.

The instrument for all of this is
[the usage tracker](../templates/usage-tracker.md): a weekly window
plan, a per-session log, a five-minute weekly review. It doubles as the
level instrument - your own four weeks of rows answer "which level do I
actually need," including the honest answer at the top of the ladder.
In-product readouts to pair with it (as of July 2026; names change):
the planner seat's `/usage` readout, the executor's dashboard usage
meter, and community tools that parse local session logs (e.g.
`ccusage`). Optional power-user companion in this repo:
[tools/token-tracker](../tools/token-tracker/) - a zero-dependency local
script that reconstructs your windows from transcripts already on your
disk and computes an anchor plan; every figure it prints is an
unofficial local estimate, per its own honesty header.

## Token levers, in order of impact

1. **Unit-scale task blocks.** The executor's fixed overhead (loading
   the contract, exploring the repo) is paid once per session - one big
   coherent block beats ten small prompts for the same work.
2. **The `MODEL:` header per block.** Frontier tier for judgment-heavy
   units, cheap tier for mechanical ones, decided at authoring time -
   one glance at dispatch.
3. **Short planner sessions.** Author blocks, review, commit, drop out.
   A resident frontier session re-reading context is the waste on that
   side - rent frontier intelligence by the session, keep a mid-tier
   resident for the loop, and (the same lever one level deeper) withhold
   the TOP frontier tier for release gates, wave skeletons, and
   escalations only.
4. **The review gate itself.** Rework is the most expensive token sink;
   the gate exists to stop defects before they compound into re-fix
   sessions.

Non-lever, documented so nobody optimizes it: file-read vs chat-paste
dispatch is token-noise (a few hundred tokens of tool chatter on tasks
that consume tens of thousands).

## Per-level cost profiles

- **Level 0 ($0-20):** ChatGPT Free's included Codex usage makes the
  door genuinely $0 (as of 2026-07-16, limited, re-verify); Claude Code
  needs a $20 Pro seat. No protocol overhead because there's no
  protocol.
- **Level 1 (~$20):** the single-meter squeeze. Executor sessions
  compete with planner sessions for the same windows; anchor
  deliberately, route mid-tier models for execution sessions, and
  expect the meter to be the thing that teaches you Level 2's value.
- **Level 2 (~$20 + $0):** the trial month. The executor's pool is
  free but EXPIRING - spend it on your token-heaviest real units so the
  contrast is measured, not vibed
  ([trial playbook](../checklists/trial-playbook.md)). The post-trial
  free tier is not a viable executor seat; the honest exits are up to
  $40 or back to Level 1.
- **Level 3 (~$40):** the documented stack. The creep risk below is
  yours now; the `MODEL:` header is where the price holds.
- **Level 4 (~$40 + discipline):** the autonomous profile, next
  section.

## Where the $40 creeps

Frontier-model usage on the executor seat burns the included dollar
pool fast - the pilot measured this the hard way when its executor ran
out of frontier allowance MID-WAVE (the wave's biggest unit was
delivered by a different executor from the same block file; great
receipt for portability, but the meter event is the economics lesson).
Heavy months throttle or spill into overage. Mitigations, in order:
route mechanical units to the cheap tier at authoring time (the
`MODEL:` header is a routing decision, not a suggestion); leave overage
billing OFF so exhaustion means refusals, never surprise charges; and
watch the weekly review's "$ used of pool" line - creep announces
itself there weeks before the first painful month.

## The bookkeeping tax

~Half of all commits in the pilot were docs/state upkeep. That's the
price of a relay whose every hop is auditable - priced DOWN by the
capped state file (every agent reads it every session, so its length is
a per-session tax on every seat) and by routing upkeep to the mid-tier
resident, but never eliminated. Budget for it honestly.

## The autonomous cost profile

Autonomy shifts the bookkeeping tax from your time to resident tokens -
it does not erase it. Specifically: the cheap/auto CLI tier is the free
backbone (included in the executor's paid plan at no extra cost);
named-model dispatches draw the SAME plan pool as your own interactive
use, so mid-cycle refusals are routine ladder descents; the cloud
channel is usage-based-only - real overage money, OFF by default,
refusing cleanly at $0 (verified by the pilot's probe); and the
resident's polling, audits, and state upkeep spend planner-seat
windows. Details: [autonomous.md](autonomous.md).

## What the split actually moved (measured, with the caveats attached)

Full paper trail: [receipts.md](receipts.md).

From the pilot's 37 units over 10 days (2026-07-02 → 07-11): 78.4% of
units and 80.7% of diff bytes were executor-delivered - the split isn't
skewed by unit size. Converting the executor's 534 KB of diff text to
tokens gives a FLOOR of ~127-162K tokens (3.3-4.2 chars/token, the
standard band for code-dense text); applying a stated-but-unmeasured
5-10x session-overhead multiplier gives a LABELED EXTRAPOLATION of
~0.6-1.6M tokens (midpoint ~1M) of agentic coding moved off the $20
planner seat. Publish-with-the-number caveats, per the house rule:
layer 2 is an assumption-driven range, nobody ran the counterfactual;
the figure excludes the review/audit tokens the planner still spent on
every delivery; and it excludes executor churn before clean deliveries
(which, if anything, makes it conservative). Full methodology and raw
data: the pilot's stats file and per-commit JSON.

## The honest top of the ladder

If the tracker shows cap hits weekly even at Level 3-4, with `MODEL:`
routing already honest - buy the Max seat. This workflow's claim was
never "Max is bad"; it's that a beginner coding a couple hours a day is
paying for headroom they can't use. Your rows just showed you're not
that beginner. That's a graduation, and this page is happy for you.
