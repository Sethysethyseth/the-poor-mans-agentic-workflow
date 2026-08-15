# Upgrading an existing install, and re-checking facts that rot

Referenced by `relay-setup`. Two jobs that both mean "the world moved on":
pulling this workflow's changes into a project that already has it, and
re-verifying claims about prices, plans, and tools.

---

## Part 1 - upgrading an install

A project that installed this workflow holds generated files: a contract,
a state file, a queue, adapters, skills. Some have been edited on purpose
- the project's own gotchas, its check command, a rule its own review
produced.

**The whole job is telling those two kinds of change apart.** An upgrade
that overwrites a local rule destroys the incident that produced it, which
is worse than staying a version behind.

**Done when:** the manifest records the new version, every upstream change
is applied or explicitly declined with a reason, and no local edit was
overwritten without being named in the report.

### 1. Find the installed version

In order: the `version:` line in the manifest; a version stamp in the
generated contract's header; or nothing at all. **If there's no stamp, say
so** - treat the version as unknown rather than guessing it from how the
files look. Also record when the last upgrade ran; a six-month-old install
and a week-old one need different amounts of care.

### 2. Fetch and diff, file by file

Upstream is
`https://github.com/Sethysethyseth/the-poor-mans-agentic-workflow`.

**If you cannot fetch it, stop and say so.** Do not upgrade from memory.
Your training data has a cutoff, and a confidently-invented "upstream
change" is the worst possible output of this procedure.

Sort every difference into exactly one bucket:

- **Upstream moved.** Local matches the old upstream; upstream changed it.
  Safe to apply.
- **Local moved.** Upstream unchanged since install; local differs. This
  is a deliberate edit. **Never touch it.**
- **Both moved.** The only case that needs a human.

Can't tell which bucket - usually because the installed version is unknown?
It's "both moved." Guessing in the safe direction costs a question;
guessing wrong costs someone's rule.

### 3. Both-moved files: show, don't merge

State what upstream changed **and why** - the upstream commit message, not
your paraphrase of the diff. State what the local edit does. Say whether
they actually conflict; most don't, and those merge cleanly. For a real
conflict, present both and let the human choose. Do not average them, and
do not prefer upstream because it's newer - **the local edit usually
exists because something went wrong in that project**, and upstream
doesn't know about it.

### 4. Verify the install still works

- The check command still runs.
- The state file still names exactly one next action.
- Every skill the contract references still exists at its path.
- Adapters still point at the source files, and none has grown a *copy* of
  content that belongs in one. **Adapter drift is the failure this
  architecture exists to prevent.**

If an upgrade changes what a task file is, what a delivery report
contains, or what the review step checks, **say that loudly** - tasks
already in the queue were written against the old shape.

### 5. Report

Old version → new version and the date; what was applied and why it
changed upstream; what was declined and why; and **every preserved local
edit, named individually.** That last list is what earns trust in the next
upgrade. Then update the manifest's version - never stamp a version you
didn't actually apply.

**Never upgrade a level.** Moving from Level 1 to Level 2 has a cost
attached; that belongs to the human. **Never delete a project's
scar-tissue entries** because upstream reorganized that file - local
incident history is the project's, not upstream's.

---

## Part 2 - re-checking facts that rot

This workflow makes claims about a fast-moving world: which models exist,
what a seat costs, what a free tier includes, which tools support what.
Every one carries an as-of date, and the date is a promise.

**The rule: never bump an as-of date you did not personally re-check.** A
refreshed date on an unverified claim is worse than a stale one - stale is
visibly stale, and a false date is invisible.

### Checking a claim

1. **Go to a first-party source** - the vendor's own pricing page, help
   center, or CLI README. Not a blog post, not a summary, and not your own
   memory; your training data has a cutoff and this is exactly the class of
   fact it gets wrong.
2. **Record what the source actually says, including its hedges.** If a
   help center says a tool is "included across plans, including Free" but
   the same vendor's CLI docs omit Free from their plan list, *that gap is
   the finding.* Ship it stated, with a named fallback - don't resolve it
   by picking the friendlier reading.
3. **Update every place that repeats the claim**, then reduce the
   repetition. A fact stated in four files will be wrong in three of them
   by next quarter.

### The three outcomes

- **Unchanged and verified** - update the date. This is a real result; the
  claim is now fresh.
- **Changed** - update the value, the date, and everything downstream. If
  it breaks something the README claims structurally (a level's price, a
  door that was free and isn't), say so loudly - that's a content
  decision, not a date edit.
- **Could not verify** - leave the old date untouched and say so. Never
  split the difference. A claim that stays unverifiable across two passes
  should be rewritten so it doesn't need verifying.

### What is not volatile

Receipts and incident history are historical records, not claims about the
present. Do not refresh them, re-date them, or smooth their numbers. Same
for any number in a delivery report - recompute it from the underlying
data file rather than trusting the report that quoted it. A wrong number
that looks plausible because the totals happen to match is exactly how bad
data survives review.
