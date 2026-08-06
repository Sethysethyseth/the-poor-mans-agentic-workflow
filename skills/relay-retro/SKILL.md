---
name: relay-retro
description: Turn an incident or a finished wave into a contract amendment and a scar-tissue entry, so the same failure cannot recur silently. Use after something went wrong, after a wave lands, or when the workflow itself needs changing.
---

# relay-retro - an incident becomes a rule

This workflow changes by scar, not by preference. Something failed;
something in the contract changes so it can't fail the same way; the
incident that forced it gets written down next to the rule.

**Done when:** the incident is recorded with its date, the contract
carries the amendment, and the amendment's accepted downside is written
down beside it.

---

## 1. Find the mechanism, not the moment

"The executor committed" is a moment. "The rule lived only in the block
footer, and the dispatch prompt was retyped without it" is a mechanism.
Amend against mechanisms - a rule written against a moment reads as a
scolding and gets dropped the first time it's inconvenient.

If you can't state the mechanism in one sentence with a file or a step in
it, you don't have the root cause yet.

## 2. Write the amendment where it will actually be read

- A rule every agent needs every session goes in `AGENTS.md`, and it must
  earn its place there - that file is loaded by everyone, every time, and
  every line is a tax on all of them.
- A rule that applies to one moment in the loop goes in that moment's
  skill.
- A project-specific scar goes in the project's gotchas file, with its
  incident date.

Prefer amending an existing rule to adding a new one. The failure mode of
a process document is accretion: five layers of ceremony that nobody
performs because performing all of them costs more than the incident did.

## 3. Write the accepted downside next to it

This is the part that makes the workflow's history readable. **Every
refinement states the trade-off it accepted, in the contract, where
nobody can quietly optimize it back out.** "Contract-first blocks raise
the expected bounce rate - that's the price of moving implementation
thinking off the frontier seat" is a downside stated; someone six months
later who dislikes the bounce rate can see they'd be reversing a decision
rather than fixing a bug.

An amendment with no stated downside is usually an amendment nobody
thought hard about.

## 4. Record the incident

Append to `docs/scar-tissue.md`: what happened, the date, the mechanism,
and the rule it produced. Newest first, never summarized away.

## The deletion rule

**A gotcha nobody can trace to a real incident gets deleted.** Run this
on every retro, on the existing entries as well as the new one. Rules
that came from someone's general anxiety rather than a real failure are
the ones that make a contract long enough to stop being read - and a
contract nobody reads protects nothing.
