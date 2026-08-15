---
name: relay-review
description: Audit delivered work against its task file and the working tree, re-run the checks fresh, then land it with one commit or send it back - plus the release gate before anything merges, and turning any failure into a permanent rule. Use when a builder has stopped, when a batch is ready to merge or deploy, or after something went wrong.
---

# relay-review - audit, then land or send back

Run this on every delivery, every time, whoever is playing reviewer. When
the loop dispatches itself, the same steps run unchanged - **autonomy
never waives a step.**

The delivery report turns review into **auditing a claim instead of
reconstructing a tree.** That is cheap enough that skipping it is never
worth it, and skipping it quietly turns the whole workflow into unreviewed
codegen.

**Inputs:** the task file, the delivery report, the working tree.

**Done when:** the task is `LANDED <sha>` with the state file rewritten,
or `BOUNCED` with the task file updated to say what to fix.

---

## 1. Re-run the checks fresh

The report is never trusted for green checks - *"the builder lies about
done"* is a founding scar, not an insult. Re-run the task's check command
yourself, now. On a project with no check command, re-run the "show it
running" evidence commands instead.

**If the task created or changed the check command, re-run both halves of
the falsifiability proof** - the deliberate break with it red, and the
reverted tree with it green. A check that has only ever shown green is not
proven, and proving it now is cheaper than after it has silently passed a
hundred tasks.

## 2. Audit the report against the tree and the task

- **Scope** - every changed file appears in `FILES TO TOUCH` or in the
  report's deviations. Use `git status --untracked-files=all`; untracked
  directories collapse to one line and hide new files. An unexplained
  touch is a bounce, not a shrug.
- **Criteria** - every `DONE WHEN` line has evidence, and spot-check that
  evidence against the actual tree. A criterion met in prose only is not
  met.
- **Deviations** - each declared one is either acceptable (record why) or
  a bounce. An undeclared deviation you discover yourself is worse than a
  declared one; say so in the bounce.
- **The stop** - nothing committed, no state files touched, no
  dependencies added.

## 3. Fix or send back

- **Trivia** - naming, a missed comment, a one-line gap: fix it yourself
  and note the fix in the queue entry.
- **Anything real** - send it back. Update the **task file** with what to
  fix and why, flip the status, re-queue. Never iterate with the builder
  in chat; the task file stays the contract. (When the loop is dispatching
  itself, two bounces on one task stops the machine and pages the human.)
- **Delivered work contradicts the spec in a way the task doesn't settle**
  - that is an escalation trigger, not your call. Send it up.

## 4. Land it

- Stage files individually - never `git add .`.
- One commit per task; history stays bisectable.
- SHA-verify: `git log --oneline -1` after committing - confirm it exists
  and says what you meant.
- Push, then confirm the push reached the remote
  (`git log origin/<branch> -1`). Anything downstream rebuilds the OLD
  head until the push lands.

## 5. State upkeep - you are the single writer

- Queue: flip the task to `LANDED <sha>` or `BOUNCED`. Note who actually
  delivered it, if it wasn't the agent that was handed the task.
- Rewrite the state file: what landed, what is in flight (or "nothing in
  flight"), and the `Next action (human):` line - **never empty.**
- Hand the human a smoke list: 3-6 concrete things to eyeball on the
  running build. Checks prove the code; only eyes prove the product - one
  task here once passed an 11-criterion audit clean and the smoke pass
  still found two live defects.

---

## The release gate - before anything merges or deploys

Per-task audits already happened. This pass, on the expensive tier, looks
for what per-task review structurally cannot see:

- **Drift from the spec** - each task satisfied its own file and the batch
  still isn't what the spec describes.
- **Contract damage** - a public interface changed shape across two tasks,
  each locally reasonable.
- **Accumulated shortcuts** - three declared deviations that were each
  fine and together are a problem.
- **The seam** - behavior at the boundaries between tasks, which no single
  task owned.

**Then wait. The gate never opens on enthusiasm.** Do not begin the merge
sequence until the human says the trigger phrase from the manifest,
verbatim. Not "looks good," not "ship it," not your own confidence that
the batch is clean - the exact phrase. An agent that merges when it feels
ready has removed the last human checkpoint in the entire workflow, and it
will feel ready at exactly the wrong moment.

Once triggered, **no batching**: run each command, show its result, get
approval, run the next. A merge sequence pasted as one block is a sequence
nobody can stop halfway. Afterward report exactly what merged - the
commits, their SHAs, the confirmed `origin` HEAD - and hand back a smoke
list.

The merge trigger unlocks nothing else. Production touches, migrations,
irreversible git operations, and dependency installs each stop and ask on
their own terms. **Approval for one is never approval for another.**

---

## When something goes wrong, make it a rule

A bounce, an incident, or a near miss is the moment this workflow
improves. Do it now, while the mechanism is still visible.

1. **Find the mechanism, not the moment.** "The builder committed" is a
   moment. "The rule lived only in the task footer, and the handoff was
   retyped without it" is a mechanism. Rules written against moments read
   as scolding and get dropped the first time they're inconvenient. If you
   can't state the mechanism in one sentence with a file or a step in it,
   you don't have the root cause yet.
2. **Write the fix where it will actually be read.** A rule everyone needs
   every session goes in `AGENTS.md` - and it must earn that place, because
   every line there is a tax on every agent. A rule about one moment in the
   loop goes in that moment's skill. A project-specific scar goes in the
   project's gotchas file with its date.
3. **Write the accepted downside next to it.** Every change states the
   trade-off it accepted, where nobody can quietly optimize it back out.
   *"Contract-first tasks raise the expected bounce rate - that's the price
   of moving implementation thinking off the expensive seat"* is a downside
   stated; someone six months later who dislikes the bounce rate can see
   they'd be reversing a decision rather than fixing a bug. **A change with
   no stated downside is usually one nobody thought hard about.**
4. **Record the incident** in `docs/scar-tissue.md`: what happened, the
   date, the mechanism, the rule it produced. Newest first, never
   summarized away.

**The deletion rule, run every time:** a rule nobody can trace to a real
incident gets deleted. Rules that came from someone's general anxiety
rather than a real failure are what make a contract long enough to stop
being read - and a contract nobody reads protects nothing.

## If the builder committed anyway

It happens. Don't panic and don't reach for destructive git - resets and
force-pushes are gated operations in every configuration.

1. Stop the builder's session; nothing else writes while you sort it out.
2. Run this checklist against the committed tree exactly as if the changes
   were uncommitted. The audit doesn't change; only the state of the tree
   does.
3. **Audit passes** - keep the commit, record in the queue that the builder
   committed off-protocol (recorded, never silent), continue from step 4.
4. **Audit fails** - bounce as usual, and undo with a NEW revert commit.
   History moves forward; nothing gets rewritten.
5. Either way, check whether the builder could actually see the rule. It
   lives in `AGENTS.md` - if that file wasn't reachable from the tool it
   was running in, fix the adapter rather than blaming the agent.
