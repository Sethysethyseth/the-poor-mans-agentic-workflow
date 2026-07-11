# Command-running gate (generic, parameterized)

The ask-first list. Default is HANDS-OFF: agents run commands freely
WITHOUT asking - reads, scoped edits, branch creation, staging files, local
commits, pushes to non-release branches. Only the items below stop and ask
first. Everything not listed runs automatically.

Two rules about the gate itself:

- **Items are included or excluded by your manifest answers, never by
  hand-editing a generated file.** No prod -> no prod item; no database ->
  no migrations item. Items 4 and 5 survive in EVERY configuration - every
  project has files that can be destroyed and dependencies that can drift.
- **This gate normally lives as a section inside your generated agent
  contract (`AGENTS.md`), not as a separate file.** This standalone copy
  exists for dropping the gate into an agent contract you already have.

---

## ASK BEFORE RUNNING (the short gate)

1. **MERGE INTO `<release-branch>`** - gated behind a trigger phrase. Do
   not start the merge/push sequence until the human says
   `"<trigger-phrase>"` verbatim - enthusiasm, implication, or "looks good"
   is never authorization. Once triggered, run one command at a time and
   wait for explicit approval before each next one - never batch or
   auto-run the sequence. After the push lands, report exactly what was
   merged (commits, SHAs, confirmed `origin/<release-branch>` HEAD) before
   considering the task done.

2. **PRODUCTION touches** *(include if your project has a prod
   environment)* - any operation against `<prod-service-or-db-identifiers>`,
   any prod data operation, or any `git push` that deploys to production.
   Pushes to non-prod branches are fine; prod-bound pushes ask first.

3. **MIGRATIONS - any environment** *(include if your project has a
   database)* - a separate manual track, always. Pushing code does NOT
   migrate any database, and a bad migration corrupts live data in a way
   that is not locally reversible. Sequencing rule that must never invert:
   the migration lands before the code that depends on it deploys
   (code-ahead-of-DB took down production login in the source project).

4. **LOCAL-DESTRUCTIVE / IRREVERSIBLE ops** *(every project keeps this)* -
   `git reset --hard`, `git clean`, `git push --force`, branch deletion,
   bulk file deletion. These can destroy work on disk.

5. **DEPENDENCY installs** *(every project keeps this)* - anything mutating
   the manifest/lockfiles of your package ecosystem (`package.json`,
   `requirements.txt`, `Cargo.toml`, `go.mod`, ...). Adding a script or a
   config entry is a normal scoped edit; adding a PACKAGE asks first.

*(Add project-specific irreversibles from your manifest here: sending
emails, charging payments, firing webhooks, publishing packages - anything
expensive or embarrassing to undo.)*

---

## Why a short gate beats a long one

A gate with twenty items trains everyone to click through it. Five items
that are all genuinely dangerous keep their stopping power. The default
being hands-off is what makes the exceptions feel like exceptions.

The gate is erosion-resistant, not foolproof: a human can override any
item. What it guarantees is that overriding is an explicit, recorded step
around a named rule - drift stays visible and priced, never silent.
