# Building a check command that can actually fail

Referenced by `relay-setup` (question P2/P2a) and by `relay-review`.

The check command is the instrument every review re-runs. Without one, the
workflow hands the reviewer its most load-bearing step with nothing to
run: the builder's evidence degrades to "show the change running," and
review degrades to reading a diff and hoping.

**Done when:** one command exists that proves the project isn't broken, it
runs fresh in under ~2 minutes, and it has been **seen to fail.**

---

## Build the smallest thing that could fail

You are not designing a testing strategy, and coverage is not the goal. A
command you can run and trust is. In descending order of what to reach
for:

1. The project's existing test or build script, if one exists.
2. The build succeeds / the type checker passes.
3. The entry point imports without error.
4. The CLI answers `--help`; the server starts and answers one request.
5. For docs or content: the links resolve, the frontmatter parses.

Any of these is worth more than nothing, and every one can fail for a real
reason. Pick one, wire it to a single command, write it into the agent
contract.

## Then prove it red

**A check nobody has watched fail is not a check; it's a checkmark.** It
prints green over an unproven tree - which is the exact defect class the
review step exists to catch, now wearing a badge.

So prove falsifiability before accepting it:

1. Break something trivial and real - a typo in an import, a broken link,
   an assertion flipped.
2. Run it. **Watch it go red.** Capture the output.
3. Revert the break.
4. Run it again. Watch it go green. Capture that too.

Both halves go in the delivery report like any other evidence, and the
reviewer re-runs both. A check that only ever showed green is a bounce.

## Build it through the loop, on the first task

The command gets *decided* at setup time so the contract can name it, but
it gets *built* as a task file - handed off, delivered, reviewed, landed
like anything else.

That is deliberate: the adopter's first task produces the instrument every
later review depends on. It is both the cheapest moment to add it and the
clearest possible demonstration of what the loop is for.

If building it needs a package installed, that is an ask-first gate item -
stop and let the human run it.

## When it goes bad

A check that can no longer fail is broken, not passing. If a change makes
failure impossible - the assertion got deleted, the test got skipped, the
build target went empty - fix it before trusting another green. Re-run the
red-then-green proof afterward; a repaired check is a new check.

## The escape hatch, kept on purpose

`none yet` is a legal answer. It degrades evidence to "show the change
running" and carries a standing TODO. It is visibly weaker, and it stays
documented rather than hidden - an honest gap beats a green that means
nothing.
