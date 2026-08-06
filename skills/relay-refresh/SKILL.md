---
name: relay-refresh
description: Re-verify the facts that rot - model rosters, pricing, plan terms, tool capabilities - and restamp only the as-of dates actually checked. Use when the workflow's external claims may be stale, or on a schedule.
---

# relay-refresh - re-check what rots

This workflow makes claims about a fast-moving world: which models exist,
what a seat costs, what a free tier includes, which tools support what.
Every one of those has an as-of date, and the date is a promise.

**The rule this skill enforces: never bump an as-of date you did not
personally re-check.** A refreshed date on an unverified claim is worse
than a stale one - stale is visibly stale, and a false date is invisible.

**Done when:** every claim in the volatile registry has been checked or
explicitly skipped, changed claims are updated with today's date, and
unchanged-but-verified claims carry today's date too.

---

## The registry

`docs/volatile.md` lists every claim that can rot, one row each:

| claim | current value | as-of | source |
|---|---|---|---|

If a volatile claim exists in the docs but not in the registry, add it -
an unregistered claim is one nobody will ever re-check.

## Checking a claim

1. **Go to a first-party source.** A vendor's own pricing page, help
   center, or CLI README. Not a blog post, not a summary, not your own
   memory - your training data has a cutoff and this is exactly the class
   of fact it gets wrong.
2. **Record what the source actually says**, including its hedges. If a
   help center says a tool is "included across plans, including Free" but
   the same vendor's CLI docs omit Free from their plan list, that gap is
   the finding. Ship the gap stated, with a named fallback - don't
   resolve it by picking the friendlier reading.
3. **Update the row**, and update every place in the docs that repeats
   the claim. Then reduce the repetition: a fact stated in four files is
   a fact that will be wrong in three of them by next quarter.

## The three outcomes

- **Unchanged and verified** - update the as-of date. This is a real
  result; it means the claim is now fresh.
- **Changed** - update the value, the date, and everything downstream.
  If the change breaks a claim the README makes structurally (a level's
  price, a door that was free and isn't), say so loudly in the report -
  that's a content decision, not a date edit.
- **Could not verify** - leave the old date untouched and say so. Never
  split the difference. An unverifiable claim that stays unverifiable
  across two refreshes should be rewritten to not need verifying.

## What is not volatile

Receipts and incident history are historical records, not claims about
the present. Do not refresh them, re-date them, or smooth their numbers.
The same goes for any number in a delivery report - recompute it from the
underlying data file rather than trusting the report that quoted it. A
wrong number that looks plausible because the totals happen to match is
exactly how bad data survives review.
