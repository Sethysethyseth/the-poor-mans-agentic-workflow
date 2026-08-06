---
name: relay-plan
description: Turn a spec, roadmap, or feature request into a wave of task blocks sized to the human's real cadence. Use when planning what to build next, breaking down work, or authoring a batch of units.
---

# relay-plan - a spec becomes a wave

You are on the frontier tier, in a short session, and your output is a
wave of task blocks - not code. Author the wave, then drop out. Frontier
judgment is rented by the session; spending it on bookkeeping is the
mistake this role exists to avoid.

**Done when:** each unit in the wave is a block file in the queue, every
one either `QUEUED` or explicitly `DRAFT` with the missing decision named.

---

## Size the wave to the human, not the feature

A unit costs the human about three touches - dispatch, review, smoke. The
manifest recorded their honest round-trips per week. Size units so the
wave fits a real week rather than an ideal one. A wave nobody finishes
teaches nothing and rots into stale blocks.

If you can't say what "done" looks like for a unit in one observable
sentence, it isn't a unit yet - it's two.

## Route the work

Every block carries a `MODEL:` header so dispatch is one glance. Route
mechanical work cheap and judgment expensive - the economics only hold if
that actually happens. Design-heavy, schema-shaped, or security-adjacent
units either go frontier or become escalation triggers, not cheap blocks
with hopeful acceptance criteria.

## Order for collisions, not for elegance

Two blocks may run back-to-back only if their `FILES TO TOUCH` don't
intersect - including test files, style files, and barrel/index files.
Colliding units stay strictly serialized. **If you're unsure whether two
blocks collide, they do.**

## Point at sources, don't paraphrase them

A block's `CONTEXT` should name the spec section, the data file, the
upstream doc. A paraphrase is a second copy that drifts from the first,
and the executor can read the original perfectly well.

## DRAFT is a real status, use it

A block that needs a decision nobody has made is `DRAFT`. Do not paper
over the gap with a plausible-sounding acceptance criterion - that
converts an open question into a silent guess, and the guess surfaces two
units later as a bounce. Name the decision, leave it `DRAFT`, and move on
to the next unit.

## Then stop

Author the wave and end the session. The daily loop belongs to the
reviewer tier, which escalates back to you on the standing triggers:
schema and data-model design, security surfaces, production incidents,
root-cause debugging review can't close, and any case where a delivery
and the spec disagree in a way the block doesn't settle.

To write or split one block rather than a wave, use `relay-block`.
