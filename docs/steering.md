# The steering layer - keeping the human on task, and agents out of loops

A human-routed relay has two failure modes no tool vendor will solve for
you: **the human drifts** (off-queue detours, skipped gates, forgotten
TODOs, abandoned waves) and **agents loop** (retry thrash, polish
spirals, guess-fix-guess cycles, repeated failures driven by a wrong
belief). The state files that carry your work double as the steering
mechanism for both. None of this is extra tooling - it's discipline
written into files agents already read.

**The honest frame, before the mechanisms: EROSION-RESISTANT, NOT
FOOLPROOF.** A human with git access can override any speed bump - the
pilot's own record proves it (the mandated pre-release review was
explicitly skipped once, July 4, 2026, at the owner's instruction). What
the layer guarantees is **no silent drift**: every deviation requires an
explicit, recorded step around a named rule, so drift is visible,
priced, and correctable - never ambient. Don't trust any workflow that
claims more; you'd falsify "foolproof" in a week.

---

## Human-steering mechanisms (each with its pilot receipt)

1. **Single next action.** The work-state file names ONE next thing, in
   a standing "Next action (human):" line that is never left empty.
   Session-start ritual: the agent reads the state file and STATES the
   next action before doing anything else. You never open a session
   wondering where you were.
2. **Off-queue work is labeled, never refused.** Ask for something not
   in the queue and the agent does it - AND records it as off-queue in
   the queue index, the state file, and the commit message. Drift is
   allowed but priced and visible, which is what keeps it occasional.
   *(Receipt: the pilot's off-queue login-UX fixes carry the label in
   all three places.)*
3. **Open TODOs are numbered and re-surfaced** every session until
   closed or explicitly demoted - never quietly vanished. *(Receipt: a
   decimal-input bug survived as TODO #0 across four days of sessions
   until verified fixed.)*
4. **Gates require verbatim trigger phrases.** "push to main" means
   those words; enthusiasm, implication, or "looks good" is never
   authorization for a gated op.
5. **Session-close ritual.** The state file is rewritten: "nothing in
   flight" stated or the in-flight work named, next action pinned. The
   next session - any agent, any tier - starts on rails.
6. **The post-push smoke checklist.** After every push the agent hands
   you a short, concrete checklist for the deployed artifact - human
   verification becomes a bounded task instead of a vibe, so it actually
   happens. *(Receipt: a unit passed a full 11-criterion audit with all
   checks green; the smoke checklist then caught two real defects the
   audit couldn't see. Checks prove the code; only eyes prove the
   product.)*

## Anti-loop mechanisms (agent side)

1. **Machine-checkable acceptance criteria are a terminating
   condition.** "Done" is a checklist, not a feeling - which kills
   polish spirals.
2. **The standing footer's anti-loop line:** if a criterion can't be
   met, STOP and explain why instead of guessing. Retrying without new
   information is forbidden by construction.
3. **Diagnosis-before-fix** kills guess-fix-guess: no code until a root
   cause exists with file:line, mechanism, and why it explains the
   exact symptom.
4. **Escalation instead of retry.** Ambiguity bounces UP a tier on
   standing triggers; it never spins in place. *(Receipt: the resident
   hit a real resolution-design gap, paused dispatch, escalated, and
   got a design session - not an afternoon of thrash.)*
5. **Ground-truth verification breaks belief loops.** When reality
   contradicts a state file, query the system of record and CORRECT the
   file in place - a wrong belief causes repeated failures until the
   record is fixed. *(Receipt: one false state-file claim about
   migration history caused exactly ONE failed deploy - the rule caught
   it before it became a loop, and the correction is recorded in
   place.)*
6. **Bounce, don't thrash.** A failed review updates the BLOCK with
   what to fix and re-queues it; the builder never iterates blind
   against a silent reviewer.

## The one-line version

The state files are the steering wheel: **one next action for the
human, one terminating condition for the agent, and no silent step
around either.**

Both recorded process deviations in the pilot (the July 4 review skip;
a July 12 diagnose-first skip, "this once," partially walked back the
next session) follow the same shape: explicit, recorded, correctable.
That's the layer working as designed - the guarantee was never that
rules can't bend, it's that they can't bend silently. The incidents
behind each mechanism: [scar-tissue.md](scar-tissue.md).
