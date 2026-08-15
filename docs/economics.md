# Economics - the cost model, the meters, and where the $40 creeps

Most adopters have no idea what a $20 plan actually buys. This page
teaches the meters and how to ration them - because at this price point,
rationing discipline **is** part of what you are paying with.

A provenance rule this page lives by: **official facts and community
estimates are different classes of claim**, and every number below is
labeled as one or the other, with a date. Anthropic publishes plan
*multipliers* only - it does not publish token quotas. Any guide quoting
you an exact official token figure invented it; this repo will not be that
guide.

---

## The plan table (verified 2026-07-16 unless noted; prices move)

| Plan | $/mo | What it buys | Class of claim |
| --- | --- | --- | --- |
| One good agent plan | $20 | The planner/reviewer seat. 1x usage: 5-hour rolling windows plus a weekly cap | Official: multiplier + mechanics |
| **This workflow** (two plans) | **$40** | One windowed meter plus one monthly pool - **two meters that fail independently** | - |
| A 5x plan | $100 | ~5x per-window usage; rationing mostly stops being a thought | Official: multiplier |
| A 20x plan | $200 | ~20x; never thinking about the meter | Official: multiplier |

Community-measured anchors, **estimates, not quotas** (mid-2026): very
roughly ~45 prompts per 5-hour window at 1x, ~225 at 5x, ~900 at 20x -
useful for intuition, worthless as a guarantee. Two dated official
mechanics worth knowing: the 5-hour limits were permanently **doubled** on
2026-05-06 (peak-hour throttling removed), and a +50% weekly-limit
promotion ran 2026-05-13 to 2026-07-19 PT and has since **lapsed**, so
weekly caps are back to standard. This repo hard-codes no weekly numbers,
because they move.

On ChatGPT instead? The same shape works with ChatGPT plans in the planner
row (Free includes limited Codex usage; Plus $20; Pro tiers at $100 and
$200 - per OpenAI's published pricing as of 2026-07-30). Same provenance
rule: OpenAI publishes per-window message *ranges* by model, not token
quotas, and only for Plus and above. No per-window numbers are published
for Free at all, so treat "limited" as genuinely unquantified.

## What the second seat actually is

**Not prepaid API credits.** This matters more than it sounds, because the
whole $40 headline depends on it.

The worked example is **Cursor Pro at $20/mo**: a *subscription with usage
included* - as of 2026-08-15, $20 of third-party model usage per month
plus generous included usage of its own models. An API key exists for
authenticating automation, but it is not a separate meter you top up.

If the second seat were metered API billing, the number in this document
would not be $40 - it would be "however much you used." Exceeding the
included allowance continues at pay-as-you-go rates, and **that is the
entire mechanism behind "the $40 creeps"** further down this page.

*Cursor plan terms verified against cursor.com 2026-08-15.*

## Two kinds of meter (the pedagogical point of the $40 stack)

- **The planner/reviewer seat is WINDOWED:** a 5-hour rolling window plus
  a weekly cap. Capacity expires whether you use it or not; the unit you
  budget is the window, not the token.
- **The builder seat is a MONTHLY POOL:** auto and first-party model tiers
  have generous included usage; named expensive models draw the separate
  ~$20 allowance metered at provider prices. Monthly reset, no rollover;
  overflow is opt-in pay-as-you-go that you should leave **off**.

Two meters that fail independently is itself an argument for the second
seat: a planner lockout doesn't stop the builder mid-task, and an
exhausted builder pool doesn't touch your planning windows. **At Level 1
there is one meter and everything competes** - which is why that level's
catch is real, and why window anchoring is the only lever there.

## Window anchoring - you control the clock

The 5-hour window opens on your **first** prompt and expires five hours
later, used or not. So open it deliberately: a cheap "anchor" prompt at a
chosen time puts the reset where your life needs it. Anchor at 4pm and a
fresh window is waiting for the 9pm session; anchor at 8am and lunch and
evening draw on separate windows.

Corollaries: batch work into planned window-blocks rather than trickling
prompts across the day; learn your weekly reset time and schedule the
heaviest batch right after it; and route token-heavy building to the
builder seat, whose pool doesn't care about your windows - the `MODEL:`
header doing economic work at the meter level.

The instrument is [the usage tracker](../templates/usage-tracker.md): a
weekly window plan, a per-session log, a five-minute weekly review. It
doubles as the level instrument - four weeks of your own rows answer
"which level do I actually need," including the honest answer at the top
of the ladder. Pair it with in-product readouts (names change): your
planner's `/usage`, the builder's dashboard meter, and community tools
that parse local session logs. Optional companion in this repo:
[tools/token-tracker](../tools/token-tracker/) - a zero-dependency local
script that reconstructs your windows from transcripts already on disk;
every figure it prints is an unofficial local estimate, per its own
honesty header.

## Token levers, in order of impact

1. **Full-size task files.** The builder's fixed overhead - loading the
   contract, exploring the repo - is paid once per session. One coherent
   task beats ten small prompts for the same work.
2. **The `MODEL:` header per task.** Expensive tier for judgment-heavy
   work, cheap tier for mechanical work, decided at authoring time so the
   handoff is one glance.
3. **Short planner sessions.** Write the tasks, review, commit, drop out.
   An expensive session sitting idle re-reading context is the waste on
   that side.
4. **The review step itself.** Rework is the most expensive token sink;
   the review exists to stop defects before they compound into re-fix
   sessions.

Non-lever, documented so nobody optimizes it: reading a file versus
pasting into chat is token-noise - a few hundred tokens of tool chatter on
tasks that consume tens of thousands.

## Per-level cost profiles

- **Level 0 ($0-20).** ChatGPT Free's included Codex usage makes the door
  genuinely $0 (as of 2026-07-30, limited and unquantified - re-verify);
  Claude Code needs a $20 seat. No protocol overhead, because there is no
  protocol.
- **Level 1 (~$20).** The single-meter squeeze. Building competes with
  planning for the same windows. Anchor deliberately, route cheaper models
  for building sessions, and expect the meter to be the thing that teaches
  you what Level 2 is worth.
- **Level 2 (~$40).** The second seat. **Treat the first month as a
  measurement, not a commitment:** route your token-heaviest real work
  through it and keep rough notes - tasks shipped, review catches, planner
  windows freed. At month's end your own numbers make the call, and
  canceling back to Level 1 is a designed outcome rather than a failure.
  The creep risk below is yours from here; the `MODEL:` header is where
  the price holds.
- **Level 3 (~$40 plus discipline).** Same seats, same price. The
  difference is where the bookkeeping tax lands - see below.

## Where the $40 creeps

Expensive-model usage on the builder seat burns the included allowance
fast. The pilot measured this the hard way when its builder ran out of
expensive-model allowance **mid-batch** - the biggest task of that batch
was delivered by a different builder from the same task file, which is a
great portability receipt, but the meter event is the economics lesson.

Heavy months throttle or spill into pay-as-you-go. Mitigations, in order:
route mechanical tasks to the cheap tier at authoring time (the `MODEL:`
header is a routing decision, not a suggestion); leave overage billing
**off**, so exhaustion means clean refusals rather than surprise charges;
and watch the weekly review's "used of pool" line - creep announces itself
there weeks before the first painful month.

## The bookkeeping tax

Roughly half of all commits in the pilot were docs and state upkeep. That
is the price of a loop whose every hop is auditable. It is priced *down*
by the capped state file - every agent reads it every session, so its
length is a per-session tax on all of them - and by routing upkeep to the
cheaper tier. It is not eliminated. Budget for it honestly.

## The Level 3 cost profile

Automatic handoff shifts the bookkeeping tax from your time to the
reviewer's tokens; it does not erase it. Specifically: the cheap/auto CLI
tier is the free backbone, included in the builder's paid plan at no extra
cost; named-model handoffs draw the **same** pool as your own interactive
use, so mid-cycle refusals are routine ladder descents rather than
incidents; any cloud channel is usage-based only - real overage money, off
by default, refusing cleanly at $0 (verified during the pilot); and the
reviewer's polling, audits and state upkeep spend windowed tokens.
Details: [autonomous.md](autonomous.md).

## What the split actually moved (measured, caveats attached)

Full paper trail: [receipts.md](receipts.md).

From the pilot's 37 tasks over 10 days (2026-07-02 → 07-11): **78.4% of
tasks and 80.7% of diff bytes were builder-delivered** - so the split is
not skewed by task size. Converting the builder's 534 KB of diff text to
tokens gives a **floor** of ~127-162K tokens (3.3-4.2 chars/token, the
standard band for code-dense text). Applying a stated-but-unmeasured
5-10x session-overhead multiplier gives a **labeled extrapolation** of
~0.6-1.6M tokens, midpoint ~1M, of agentic coding moved off the $20
planner seat.

Publish-with-the-number caveats, per the house rule: the second layer is
an assumption-driven range and nobody ran the counterfactual; the figure
excludes the review and audit tokens the planner still spent on every
delivery; and it excludes builder churn before clean deliveries - which,
if anything, makes it conservative. Methodology and raw data:
[receipts.md](receipts.md) and
[receipts-data.json](receipts-data.json).

## The honest top of the ladder

If the tracker shows cap hits weekly even at Level 3, with `MODEL:`
routing already honest - **buy the expensive plan.** This workflow's claim
was never "the big plan is bad"; it is that a beginner coding a couple of
hours a day is paying for headroom they cannot use. Your own rows just
showed you are not that beginner. That is a graduation, and this page is
happy for you.
