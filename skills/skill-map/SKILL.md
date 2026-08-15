---
name: skill-map
description: Survey every skill installed in this project - the ones that shipped with the workflow and any built here since - audit them for gaps and overlap, optionally render them as a visual HTML page, and author a new one when something is genuinely missing. Use when someone asks what skills they have, what a skill does, or wants a new one.
---

# skill-map - see every skill, and add one when it's missing

Skills load only when their moment arrives, which is what makes them cheap
to keep around - and also means **they are invisible the rest of the
time.** Someone who can't see the set can't tell whether a gap is a
missing skill or one they forgot they had.

This surveys everything installed, says what's healthy and what isn't,
and - when there's a real gap - writes the new skill.

**Done when:** every skill on disk is accounted for, the findings are
reported, and any visual page that was asked for has been generated from
the files actually present.

---

## 1. Read what's actually installed

Enumerate every skill in the project: the ones that came with this
workflow, any authored here since, and any from unrelated sources sharing
the same directory. **Every row comes from a file you read.** Do not fill
gaps from this workflow's documentation, from upstream, or from memory - a
map showing a skill the project doesn't have is worse than no map.

For each one, pull from the frontmatter and body:

- **name** and **description** - the description *is* the trigger; it's
  what an agent selects on before reading a single line of the body
- **the done-condition** - the `**Done when:**` line
- **origin** - shipped with the workflow, written here, or third-party
- **size** - a skill past ~120 lines is one nobody reads to the end

## 2. Audit, don't just list

This is the part that makes it worth running:

- **Overlapping triggers.** Two skills that can fire at the same moment
  will be chosen between arbitrarily, which degrades both. Name the pair.
- **Descriptions that don't state a trigger.** "Use when working on the
  frontend" is a preference, not a moment. That skill will be selected
  badly; the fix is one line.
- **Drift.** A shipped skill that has been edited locally isn't wrong -
  local edits usually exist because something went wrong here - but it
  should be *known*. Resolving drift belongs to `relay-setup`'s upgrade
  path, not to this skill.
- **Rules with no incident behind them.** Same deletion rule the review
  step runs: a rule nobody can trace to a real failure is what makes a
  skill long enough to stop being read.
- **Skills that have never fired.** Worth asking whether the trigger is
  wrong or the skill is unnecessary.

## 3. Render the visual page, if it was asked for

The setup manifest records whether this project wants one (`V1`). Generate
it when that's on, or whenever someone asks - never unprompted.

Write **one self-contained HTML file**, and treat these as hard rules:

- **No external requests.** Inline the CSS. No CDN scripts, no remote
  fonts, no fetched data. It must open from disk, offline, in six months.
- **Group by what the skill is for**, in loop order - plan, build, review
  - because the sequence is the one thing a picture conveys better than a
  list.
- **The trigger is the primary text on every card**, not the name. "When
  work is waiting to be checked" is what someone is actually looking for;
  the name is just a label for it.
- **Show origin visibly** - a badge per card and a count at the top
  ("5 shipped, 2 written here, 1 drifted").
- **Readable in light and dark**, and on a phone.
- **Stamp it** with the date and the workflow version it was generated
  from. An undated map gets trusted long after it stopped being true.

The workflow ships `docs/how-it-works.html` as the reference for tone and
construction - one file, no dependencies, legible in both themes.

## 4. Write a new skill only when it earns the slot

The default answer to "we should make a skill for this" is **no** - most
of the time it belongs inside a skill that already exists, where the agent
is already looking. Three gates, checked in order, stop at the first
failure:

1. **Nothing existing covers it.** Read every description first.
2. **It has a real trigger** - one sentence starting with "when." If the
   trigger is "when you want to do it well," it's a preference and belongs
   in the agent contract instead.
3. **It has actually happened** - an incident, or the third repetition of
   the same manual instruction. Skills invented in anticipation are the
   ones nobody invokes and nobody maintains.

If a need fails gate 3 but is clearly real, say so and write it somewhere
cheap - a line in the state file or the project's gotchas. If it recurs,
it comes back with its receipt.

### Writing it

Name it for what it does, in one or two plain words. Then:

```markdown
---
name: <the-name>
description: <what it does. When to use it.>
---

# <name> - <one-line tagline>

<The failure this prevents. Two or three sentences.>

**Done when:** <the observable end state.>

---

## <numbered steps or named sections>

## What this skill must never do
```

**Every skill must read as a standalone document.** Someone will hand a
plain chat assistant the raw file with no repo and no context and expect
it to work - so no "as established above," no dependence on trigger
context, and the goal and done-condition stated near the top. Reference
other files by path and assume the reader may not open them.

Then register it: add it to the project's contract, render it into
whatever adapters are in use (adapters **point at** the file, they never
copy it), note the incident date if one justified it, and re-run this
skill so the map includes it.

## What this skill must never do

- **Never invent a row.** Every entry comes from a file on disk.
- **Never edit a skill while surveying it.** Findings go in the report;
  fixing drift belongs to the upgrade path.
- **Never generate the visual page unprompted** - it's an output someone
  asked for, not a side effect of looking.
- **Never let the map become a second source of truth.** It is generated,
  disposable, and regenerated rather than maintained.
- **Never add a skill without checking whether one should be deleted.**
  The set stays small by subtraction as well as by refusal.
