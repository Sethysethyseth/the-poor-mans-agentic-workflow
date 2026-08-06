---
name: relay-lane
description: Build or repair a project's check lane - the one command every review re-runs - and prove it can actually fail. Use when a project has no check lane, when a lane is unreliable, or when a lane has never been seen red.
---

# relay-lane - build a check lane that can fail

The check lane is the instrument every review re-runs. Without one, the
protocol hands the reviewer its most load-bearing step with nothing to
run: executor evidence degrades to "show the change running," and review
degrades to reading a diff and hoping.

**Done when:** one command exists that proves the project isn't broken,
it runs fresh in under ~2 minutes, and it has been **seen to fail**.

---

## Build the smallest lane that could fail

You are not designing a testing strategy and coverage is not the goal. A
lane you can run and trust is. In descending order of what to reach for:

1. The project's existing test or build script, if one exists.
2. The build succeeds / the type checker passes.
3. The entry point imports without error.
4. The CLI answers `--help`, the server starts and answers one request.
5. For docs or content: the links resolve, the frontmatter parses.

Any of these is worth more than nothing, and every one of them can fail
for a real reason. Pick one, wire it to a single command, write it into
the agent contract.

## Then prove it red

**A lane nobody has watched fail is not a check; it's a checkmark.** It
prints green over an unproven tree, which is the exact defect class the
review gate exists to catch, now wearing a badge.

So prove falsifiability before accepting it:

1. Break something trivial and real - a typo in an import, a broken link,
   an assertion flipped.
2. Run the lane. **Watch it go red.** Capture the output.
3. Revert the break.
4. Run it again. Watch it go green. Capture that too.

Both halves go in the delivery report like any other evidence, and the
reviewer re-runs both. A lane that only ever showed green is a bounce.

## Build it through the loop, on the first unit

The lane's command gets decided at setup time so the contract can name
it, but the lane itself gets **built as a task block** - dispatched,
delivered, reviewed, landed like anything else. That is deliberate: the
adopter's first unit produces the instrument every later review depends
on, which is both the cheapest moment to add it and the clearest possible
demonstration of what the loop is for.

If building it needs a package installed, that is an ask-first gate item
- stop and let the human run it.

## When a lane goes bad

A lane that can no longer fail is broken, not passing. If a change makes
failure impossible - the assertion got deleted, the test got skipped, the
build target went empty - fix the lane before trusting another green.
Re-run the red-then-green proof afterward; a repaired lane is a new lane.
