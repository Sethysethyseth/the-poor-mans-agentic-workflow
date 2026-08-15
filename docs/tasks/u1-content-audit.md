# TASK u1-content-audit: prove no rule is lost in the v6 restructure

STATUS: QUEUED
MODEL:  cheap
MODE:   relay

CONTEXT:
The v6 rework moves content out of ~20 files into `core/`, `skills/`, and
`docs/`. The largest risk is silently dropping a rule that was
load-bearing. This block produces the inventory that makes that risk
checkable. The source of truth for where each file's content goes is the
"File-by-file disposition" table in `docs/v6-spine.md` - read it, don't
guess.

FILES TO TOUCH:
- docs/v6-content-audit.md    (new file - the inventory, nothing else)

Expected blast radius. If the change genuinely needs a file outside this
list, touch it and say so in the delivery report. An UNREPORTED file
outside this list is the thing review is looking for.

CHANGE:
For every file named in the disposition table whose v6 destination is NOT
"unchanged", extract each distinct RULE it contains and record it.

A RULE is any statement that would change an agent's or a human's
behavior: a prohibition, a required sequence, a default, a named
threshold, a stated trade-off, or a scar traced to an incident. Prose
that only explains or motivates is NOT a rule - skip it. When in doubt
about a borderline line, include it and mark the destination cell
`UNCLEAR`.

Write `docs/v6-content-audit.md` as a one-line header followed by a
single markdown table, sorted by source file:

| source | rule (<= 15 words) | v6 destination | in v6 yet? |
|---|---|---|---|

- `source` is `path/to/file.md:LINE` and must point at a line that
  actually exists on this branch.
- `v6 destination` comes from the disposition table, or `UNCLEAR`.
- `in v6 yet?` is `yes` or `no`, determined by searching the files that
  currently exist under `core/` and `skills/`. A rule counts as present
  only if its SUBSTANCE is there - identical wording is not required and
  should not be expected, because v6 deliberately rewrites prohibitions
  as stated intent.

Do not create or edit anything under `core/` or `skills/`. This block
produces an inventory; deciding what to carry over is the reviewer's.

DONE WHEN:
- `docs/v6-content-audit.md` exists and contains exactly a one-line
  header and one table.
- Every file in the disposition table not marked "unchanged" appears at
  least once in the `source` column.
- Every `source` cell resolves to a real line on this branch.
- The header line states the total row count and how many are `no`.
