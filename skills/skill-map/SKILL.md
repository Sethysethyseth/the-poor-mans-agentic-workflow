---
name: skill-map
description: Render the workflow's installed skills as a single self-contained HTML page - what each one is, when it fires, and which are upstream, locally authored, or drifted. Use when someone asks what skills they have, what a skill does, or wants a picture of their install.
---

# skill-map - see what you actually have installed

Progressive disclosure has one cost: **skills that load only when their
moment arrives are invisible the rest of the time.** A human who cannot
see the set cannot tell whether a gap is a missing skill or a skill they
forgot they had, and cannot tell that a skill has quietly drifted from
upstream.

This renders the install as one page. It is a picture, but it is also an
audit - the drift column is the part that earns it.

**Done when:** a single self-contained HTML file exists, generated from
the skill files actually on disk, showing every skill with its trigger and
its provenance.

---

## 1. Read the install, never a list from memory

Enumerate the skill files on disk - `skills/*/SKILL.md` and whatever the
project's adapters render. **The map is only useful if it reflects
reality**, so every row comes from a file you read. Do not fill gaps from
this workflow's documentation, from upstream, or from what you remember
the set being. A map that shows a skill the project does not have is worse
than no map.

For each skill, pull from its frontmatter and body:

- **name** and **description** (the description is the trigger - it is
  what an agent selects on)
- **the done-condition** - the `**Done when:**` line
- **tier**: loop verb / getting started / the workflow itself
- **line count** - a skill drifting past ~120 lines is a skill nobody
  reads to the end

## 2. Classify provenance

Three states, and this is the audit:

- **upstream** - matches the upstream version at the installed manifest
  version.
- **local** - authored in this project by `create-skill`. Note the
  incident or repetition that justified it if the file records one.
- **drifted** - started upstream, edited locally. Show *that* it drifted;
  the detail belongs to `workflow-upgrade`.

If upstream cannot be fetched, mark provenance **unknown** and say so on
the page. Do not guess it, and do not quietly omit the column - a missing
audit that looks like a clean audit is the failure mode here.

## 3. Render one self-contained file

Constraints, all of them load-bearing:

- **One file, no external requests.** Inline the CSS. No CDN scripts, no
  remote fonts, no fetched data. It has to open from disk, offline, in
  six months.
- **Group by tier**, in loop order - the loop reads as a sequence
  (plan → block → execute → review → gate) and showing it out of order
  loses the one thing a picture is good at.
- **Trigger is the primary text on every card**, not the name. "When a
  delivery is awaiting review" is what a human is actually looking for;
  the name is a label for it.
- **Mark provenance visibly** - a badge per card, plus a count at the top
  ("9 upstream, 2 local, 1 drifted").
- **Readable in light and dark**, and on a phone.
- **Stamp it** with the generation date and the installed workflow
  version. An undated map gets trusted long after it stopped being true.

If your tool can publish an HTML page as a shareable artifact, do that as
well as writing the file - but the file is the deliverable, because the
project keeps it and the artifact is a convenience.

## 4. Report what the map shows

The page is not the whole output. Say in plain text:

- Anything **drifted** - and that `workflow-upgrade` is what resolves it.
- Any skill whose description does not actually state a trigger. That
  skill will be selected badly, and the fix is one line.
- Any two skills whose triggers overlap. Overlap degrades selection for
  both.
- Any tier that is empty or lopsided - no getting-started skills in a
  fresh install means setup never finished.

## What this skill must never do

- **Never invent a skill row.** Every card comes from a file on disk.
- **Never present provenance as verified when the fetch failed.**
- **Never edit a skill while mapping it.** Reading and rewriting are
  different jobs; findings go in the report and get fixed by
  `create-skill` or `workflow-upgrade`.
- **Never make the map a second source of truth.** It is generated, it is
  disposable, and it gets regenerated rather than maintained.
