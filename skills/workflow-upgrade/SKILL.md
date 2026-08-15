---
name: workflow-upgrade
description: Pull upstream changes to this workflow into a project that already has it installed - diff the upstream files against the local ones, apply what moved, and never silently overwrite a local edit. Use when the workflow may be out of date, or after someone asks what changed upstream.
---

# workflow-upgrade - bring an install up to date without losing local edits

A project that installed this workflow holds generated files: a contract,
a state file, a queue, adapters, skills. Upstream keeps changing. Some of
those local files have been edited on purpose - a project's own gotchas,
its check lane, an amendment its own retro produced.

**The whole job is telling those two kinds of change apart.** An upgrade
that overwrites a local amendment destroys the scar that produced it,
which is worse than staying a version behind.

**Done when:** the manifest records the new upstream version, every
upstream change is applied or explicitly declined with a reason, and no
local edit was overwritten without being named in the report.

**This is not `relay-refresh`.** Refresh re-verifies claims about the
outside world - prices, model rosters, plan terms. This skill moves *this
repo's* content into a project. They are unrelated failures.

---

## 1. Find the installed version

Look, in order, for:

1. `docs/relay-manifest.md` - the `version:` line written at setup.
2. A version stamp in the generated contract's header.
3. Nothing. If there is no stamp, the install predates versioning: treat
   it as unknown and say so in the report rather than guessing a version
   from how the files look.

Also record **when** the last upgrade ran. An install nobody has upgraded
in six months and an install upgraded last week need different amounts of
care, and the human should be told which one they have.

## 2. Fetch upstream and diff, file by file

Upstream is
`https://github.com/Sethysethyseth/the-poor-mans-agentic-workflow`.

Compare the current upstream tree against the local generated files. If
you cannot fetch - no network, a blocked host - **stop and say so.** Do
not upgrade from memory. Your training data has a cutoff, and a
confidently-invented "upstream change" is the worst possible output of
this skill.

Sort every difference into exactly one of three buckets:

- **Upstream moved.** The local file matches the old upstream and
  upstream changed it. Safe to apply.
- **Local moved.** Upstream is unchanged since install and the local file
  differs. This is a deliberate local edit. **Never touch it.**
- **Both moved.** The interesting case, and the only one that needs a
  human. Handle it in step 3.

If you cannot tell which bucket a file is in - usually because the
installed version is unknown - it is "both moved" by default. Guessing in
the safe direction costs a question; guessing wrong costs someone's
amendment.

## 3. Both-moved files: show, don't merge

For each file where upstream and local both changed:

1. State what upstream changed and **why** - the upstream commit message
   or the changelog line, not your paraphrase of the diff.
2. State what the local edit does.
3. Say whether they actually conflict. Most don't: upstream tightened one
   section, the project added a rule to another. Those merge cleanly and
   you can just do it.
4. For a real conflict, present both and let the human choose. Do not
   average them, and do not pick the upstream version because it is
   newer. **The local edit usually exists because something went wrong in
   that project**, and upstream doesn't know about it.

## 4. Apply, then verify the install still works

Applying an upgrade is not done until the install is proven intact:

- The check lane still runs.
- The state file still names exactly one next action.
- Every skill referenced by the contract still exists at its path.
- Adapters still point at `core/`, and none of them have grown a copy of
  content that belongs in `core/`. **Adapter drift is the failure this
  architecture exists to prevent** - an adapter that restates content
  instead of pointing at it will be wrong at the next upgrade.

If an upgrade changes what a task block is, what a delivery report
contains, or what the review gate checks, **say that loudly**. Blocks
already sitting in the queue were authored against the old shape and may
need re-authoring. That is a content decision for the human, not a
silent consequence of an upgrade.

## 5. Write the report

- Old version → new version, and the date.
- Applied: what changed and why it changed upstream.
- Declined: what was skipped and the reason.
- Preserved: every local edit that was left alone, **named individually**.
  This list is the one that earns trust in the next upgrade.
- Anything needing a human decision, still open.

Then update the manifest's version and date. Do not stamp a version you
did not actually apply.

## What this skill must never do

- **Never overwrite a local edit without naming it in the report.**
- **Never invent an upstream change from memory** when the fetch failed.
- **Never upgrade a level.** Moving from Level 1 to Level 2 is a decision
  with a cost attached; it belongs to the human and to `relay-setup`.
- **Never delete a project's scar-tissue entries** because upstream
  reorganized that file. Local incident history is the project's, not
  upstream's.
