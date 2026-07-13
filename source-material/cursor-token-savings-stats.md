# Cursor token-savings stats (for the poor-man's-agentic-workflow visuals)

*(Snapshotted 2026-07-12 from the source repo's
`docs/specs/cursor-token-savings-stats.md`, verbatim. Companion raw data:
`cursor-token-savings-data.json` in this directory.)*

Source data: `cursor-token-savings-data.json` (35 landed commits / 37 task
units, 2026-07-02 through 2026-07-11, `workout-db` repo). Built for another
agent to turn into charts - this file is the numbers + the methodology, not
the visual itself. Companion narrative doc:
`docs/specs/poor-mans-agentic-workflow.md` (section 8, "Receipts").

## What's actually being measured

Every unit of shipped work in this pilot was delivered by one of two
routes:

- **`cursor`** - Cursor (the $20/mo executor seat) wrote the code, per the
  standard task-queue protocol in `docs/tasks/README.md`. Claude Code only
  audited the diff and committed.
- **`planner_direct`** - Claude Code (Sonnet or Fable/Opus, the $20/mo
  planner seat) wrote the code itself, either because the unit was an
  escalation trigger (schema/isolation-surface/visual-mock units), a
  stated direct-fix exception (diagnosis was the bulk of the work), or a
  token-expiry scramble.

`delivered_by` on every commit is read directly off `docs/tasks/QUEUE.md`'s
own attribution notes, not inferred - QUEUE.md explicitly tags
`FABLE-DIRECT` / `no task block - Fable direct` / `Sonnet direct...
direct-fix exception` on every `planner_direct` commit; everything else
follows the default protocol where Cursor executes.

## Headline counts

| | Commits | Task units | Share of units |
|---|---|---|---|
| Cursor-delivered | 27 | 29 | 78.4% |
| Planner-direct (Claude Code) | 8 | 8 | 21.6% |
| **Total** | **35** | **37** | 100% |

(29 not 27 because one commit, `d21608c`, bundles 3 task-file units run in
one working tree - `u10` + `u8` + `u9` - a documented protocol violation
that's its own footnote in the narrative doc: "the messiest session on
record is the one that broke serialization.")

This ~78/22 split matches the "~80% held, ~20% leaked under pressure" figure
already called out in `poor-mans-agentic-workflow.md` section 8 - this file
is that number's full paper trail, refreshed through the N-wave and NT-wave
(previously measured only through July 7).

## Code volume by delivery route

Measured as raw unified-diff size (`git show <sha> | wc -c`, i.e. bytes of
the actual patch text - file paths, hunk headers, +/- lines, everything
git printed) and as `git show --shortstat` line counts, summed per route.

| | Diff bytes | Insertions | Deletions | Lines changed | Share of bytes |
|---|---|---|---|---|---|
| Cursor-delivered | 534,033 | 9,998 | 1,234 | 11,232 | 80.7% |
| Planner-direct | 127,771 | 2,009 | 363 | 2,372 | 19.3% |
| **Total** | **661,804** | 12,007 | 1,597 | 13,604 | 100% |

Byte share (80.7%) and unit share (78.4%) track closely - Cursor wasn't
just handed more *units*, it was handed comparably *sized* ones on average
(avg 19.8 KB/unit for Cursor vs 16.0 KB/unit planner-direct), which is the
point of the "unit-scale task block" lever in the narrative doc: units are
sized to be worth a full Cursor context-load regardless of route.

## Token estimate - methodology, stated as an estimate

There's no ground-truth token count for hypothetical work that was never
done in Claude Code, so this is necessarily an estimate built on two
explicit, separately-stated layers. Read both numbers, not just the
headline - the first is defensible, the second is a labeled extrapolation.

**Layer 1 - diff-text tokens (the floor).** Convert the 534,033 bytes of
Cursor-authored diff into tokens using a 3.3-4.2 chars/token range (the
standard band for code-dense text; English prose runs closer to 4,
punctuation-heavy diffs run a little tighter):

- Low (4.2 chars/token): ~127,000 tokens
- Mid (3.8 chars/token): ~140,500 tokens
- High (3.3 chars/token): ~161,800 tokens

This is a *floor*: it's only the size of the final patch text, as if the
code appeared with zero exploration, zero failed attempts, zero file reads
for context, and zero test-iteration overhead. No real coding-agent session
runs this lean.

**Layer 2 - realistic session-token estimate (labeled extrapolation).**
Agentic coding sessions typically spend several times the final-diff size
in total tokens - reading surrounding files for context, grepping the
repo, ingesting test output, thinking tokens, multi-turn tool-call
scaffolding. This project has no direct instrumentation of that
multiplier, so apply a stated 5x-10x band (a commonly-cited range for
agentic coding workflows, not measured in this repo) to the Layer-1 range:

- Low estimate: 127,000 x 5 = ~635,000 tokens
- Mid estimate: 140,500 x 7 = ~985,000 tokens
- High estimate: 161,800 x 10 = ~1,618,000 tokens

**Headline for the visual: Cursor generated an estimated 0.6-1.6 million
tokens' worth of agentic coding work (midpoint ~1M) across 29 units in 9
days, at zero marginal cost to the $20/mo Claude Pro planner seat** - that
volume of generation either didn't happen on the planner seat at all, or
would have required Max-tier ($100-200/mo) headroom to absorb without
hitting session limits (the documented July 2 scar: "Claude Code built two
units directly because the Pro seat's tokens were expiring mid-plan").

Per-unit average, useful for a "cost per unit" chart: ~4,850 floor tokens /
~34,000 realistic-midpoint tokens per Cursor-delivered unit.

## Suggested visuals

1. **Stacked bar, units by wave, colored by delivered_by** - `wave` +
   `delivered_by` fields in the JSON, one bar per wave, segment count.
   Shows the leak rate is roughly constant across waves, not concentrated
   in one.
2. **Cumulative diff-bytes area chart over the 9 days**, split
   cursor vs planner_direct - shows the volume gap widening wave over
   wave (`date` + `diff_bytes` + `delivered_by`).
3. **Single "token savings" stat tile** using the Layer 2 mid estimate
   (~985K tokens, or round to "~1M"), with the floor (~140K) as a
   secondary/footnote figure so the tile doesn't overclaim precision.
4. **Donut: unit share cursor vs planner-direct** (78.4% / 21.6%) paired
   with a second donut of byte share (80.7% / 19.3%) side by side - shows
   they're nearly identical, which is itself the interesting finding
   (route split isn't skewed by unit size).

## Caveats to carry into any published version

- This is diff-text volume, not a metered token count - nobody ran the
  counterfactual "Claude Code writes all 37 units directly" session, so
  Layer 2 is explicitly an assumption-driven range, not a measurement.
- Diff bytes charge deletions the same as insertions; a large deletion
  (e.g. `4dcd829`'s 273-line removal) reflects real reasoning cost (what to
  cut, why) even though it isn't newly-generated code, so this is a
  reasonable proxy but not a perfect one.
- Excludes review/audit tokens Claude Code still spent on every Cursor
  delivery (re-running lanes, reading `DELIVERY.md`, spot-checking
  criteria) - those are a real, non-zero cost on the planner seat that this
  file does not net out. The claim is "generation shifted off the planner
  seat," not "the planner seat spent zero tokens on these units."
- Excludes the ~5 units where Cursor churned through revisions/bounces
  before a clean delivery (not separately tracked per-unit) - real Cursor
  token spend on this work is higher than the clean final diff implies,
  which if anything makes the savings estimate conservative.
