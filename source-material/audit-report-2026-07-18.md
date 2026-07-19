# Pre-publish audit report

Audited: public tree only (README, SETUP.md, docs/, templates/, checklists/, tools/). Excluded from content audit per TASK: BRIEF.md, HANDOFF.md, source-material/**, TASK.md, AUDIT-REPORT.md.

## Summary

| # | Check | Findings | Worst |
| --- | --- | ---: | --- |
| 1 | LINKS | 1 | BLOCKER |
| 2 | INTERNAL LEAKS | 1 | EDIT |
| 3 | BANNED VOCABULARY | 0 | — |
| 4 | PROVENANCE RULE | 0 | — |
| 5 | NUMBER CONSISTENCY | 3 | BLOCKER |
| 6 | TIMESTAMPS | 3 | EDIT |
| 7 | LEVEL VOCABULARY | 2 | EDIT |
| 8 | TEMPLATE INTEGRITY | 3 | EDIT |
| 9 | TONE/POLISH | 1 | BLOCKER |
| 10 | tools/token-tracker + PII paths | 1 | NIT |

---

## 1. LINKS

- `README.md:499` - `[MIT](LICENSE)` and badge at line 8 also target `LICENSE` - **file missing from tree** - add an MIT LICENSE file (or retarget the links) before publish. — **BLOCKER**

All other relative links and intra-page / cross-file anchors in public `.md` files resolve (GitHub-style slugs with preserved `---` from ` - ` in headings). External https links not verified live.

**Otherwise clean.**

---

## 2. INTERNAL LEAKS

No public file links to root `BRIEF.md`, root `HANDOFF.md`, or `source-material/` paths. Mentions of `docs/HANDOFF.md` / `templates/HANDOFF.md` are the adopter template / generated work-state paths (public; stay after publish) — not hits.

- `docs/economics.md:177` - "Full methodology and raw data: the pilot's stats file and per-commit JSON." — those artifacts live only under `source-material/` today and will be deleted; the public page depends on unpublished backing files with no inlined methodology. — **EDIT** (inline the caveats/methodology into `economics.md`, or drop the pointer)

**No literal path leaks to BRIEF / root HANDOFF / source-material/.**

---

## 3. BANNED VOCABULARY

**clean** — no `rung` (any case) in public files; no gym/lifting metaphors used for the workflow (`reps` / `workout` / `progressive overload` absent as metaphors). Water-depth level names are the intended substitute.

---

## 4. PROVENANCE RULE

LogChamp / source-project mentions in public files:

| Location | Notes |
| --- | --- |
| `README.md:147-150` | Source project as full-stack web app example — factual, no pitch |
| `README.md:309-311` | LogChamp named as production fitness tracker; explicitly "named only so the numbers have a source" |
| `templates/setup-interview.md:117-118` | Source project shape as worked example |
| `templates/command-gate.md:41` | Source-project incident (code-ahead-of-DB) — receipt |
| `docs/scar-tissue.md:46`, `:104` | Source-project scars — receipt |

**clean** — no app link, screenshot, feature pitch, or praise beyond sourcing receipts.

---

## 5. NUMBER CONSISTENCY

### Occurrences of the pilot figures (public)

| Figure | Where |
| --- | --- |
| 37 units in 10 days | `README.md:16-17`, `:315`; `docs/economics.md:165` |
| 35 commits | `README.md:315` only (intro omits commits; not a conflict) |
| 78.4% units / 80.7% bytes executor | `docs/economics.md:165-166` |
| ~127-162K floor; ~0.6-1.6M band (midpoint ~1M) | `docs/economics.md:168-171` |
| ~8 of 37 / ~20% planner-direct leak | `README.md:336-337`, `:404-405` |
| 21.6% implied (100−78.4) | via `docs/economics.md:165-166` |
| No "~24 units in 6 days" | **absent from public files — good** |

### Disagreements / broken math

- `docs/autonomous.md:11-13` - claims "SEVEN landed units (one pilot unit + a six-unit wave: **five code, two diagnosis**)" — 5+2=7 for the wave alone, which cannot also be a "six-unit wave"; conflicts with `README.md:329-330` ("six-unit wave — **four** code units, two no-code diagnosis"). — **BLOCKER**
- `README.md:336-337` - "~20% leak rate" soft-rounds 8/37 (=21.6%), while `docs/economics.md` publishes 78.4/21.6. Align wording to ~21.6% or "about one in five." — **EDIT**
- Autonomous age totals ("seven landed units") agree across `README.md:198-199`, `:240` and `docs/autonomous.md:11` **if** the wave is 4+2; fix the five-code clause in `autonomous.md` to match README (or vice versa if five+two is ground truth and the wave is seven). — covered by BLOCKER above

---

## 6. TIMESTAMPS

Stamped examples (non-exhaustive): plan tables / Level 0–2 cost notes / Cursor trial terms / Codex inclusion / meter readouts — mostly "as of July 2026" or `2026-07-16`.

Unstamped (or stamp too far from the claim):

- `docs/setup.md:87` - Level 1 "**Accounts:** … (~$20/mo)" — no local as-of; Level 0 (`:81`) and Level 3 (`:132-133`) are stamped. — **EDIT**
- `README.md:236-240` level table — Level 0 and 2 cells carry as-of; Level 1/3/4 cost cells do not (section has no blanket stamp). — **EDIT**
- `templates/usage-tracker.md:64-65` - "$40" / "$200" Max comparison in the level instrument — meter readout stamp at `:76` does not clearly cover these plan prices. — **NIT**

Structural "$40 stack" / "$160/mo saved" narrative near already-stamped tables treated as covered.

---

## 7. LEVEL VOCABULARY

Names/order/prices are aligned across README, `docs/setup.md`, and the manifest (0 toes → 1 shallow → 2 waist → 3 deep → 4 open water; ~$0–20 / ~$20 / ~$20+$0 / ~$40 / ~$40).

Manifest ↔ autonomous agreement on defaults:

- `templates/setup-interview.md:111` - **Default: MANUAL** — matches `docs/autonomous.md:2-3` (manual default)
- Level 4 = Level 3 + autonomous — matches `templates/setup-interview.md:109`, `docs/setup.md` Level 4 section, `docs/autonomous.md` title

Findings:

- Who dispatches in autonomous mode is named inconsistently: `README.md:190`, `:240`, `:468` say "**resident reviewer** seat"; `docs/autonomous.md:5` and `templates/setup-interview.md:100` say "**resident planner** seat"; `docs/protocol.md:29` says neutral "**resident seat**". Pick one phrase and use it everywhere. — **EDIT**
- Level 0 handling in the manifest (generates nothing; enter at Level 1) agrees with `docs/setup.md` / README. No further findings.

---

## 8. TEMPLATE INTEGRITY

Placeholder style is mostly `<angle-bracket>` (`task-block.md`, `AGENTS.md`, `HANDOFF.md`, `setup-interview.md`). `usage-tracker.md` also uses `__` / `$__` blanks — minor style mix. — **NIT**

Generated-set path problems (manifest generation contract does **not** copy `checklists/` into the adopter repo):

- `templates/tasks-README.md:82` - references `checklists/worktree-ritual.md`; after generation this file is `docs/tasks/README.md` and checklists are not generated — dead path in the adopter tree. — **EDIT** (inline the ritual summary, or tell adopters to copy that checklist)
- `templates/dispatch-ritual.md:34` - references `checklists/reviewer-checklist.md`; dispatch ritual **is** generated on autonomous — same dead path. — **EDIT**
- `templates/tasks-README.md:44` - "Details for both: `task-block.md`" — generated set has `_TEMPLATE.md`, not `task-block.md`. — **EDIT**

Cross-links from templates to `docs/*.md` that exist **in this repo** are fine for readers of the workflow repo (`usage-tracker.md` → `docs/economics.md`, etc.).

---

## 9. TONE/POLISH

- `README.md:3-6` - **Buildout-in-progress banner** still claims docs/templates/checklists "land in the next PRs" and "those links 404." Those directories are present and linked successfully — banner would embarrass at launch and contradicts the tree. Remove on the pre-publish pass (banner text itself says this). — **BLOCKER**

TODOs elsewhere are intentional protocol language (open TODOs, standing TODO for check lanes) — not polish debt. No FIXME / "coming soon" / empty sections / truncated sentences / duplicate headings found in public files beyond the banner.

---

## 10. tools/token-tracker + personal identifiers

README vs tree:

| Documented | Present |
| --- | --- |
| `tracker.js` + subcommands `report` / `scan` / `anchors` / `last-activity` / `statusline` | yes (`tracker.js` header + CLI match) |
| `config.example.json` → `config.json` | yes |
| `anchor-ping.ps1` | yes |
| gitignored `data/` / `logs/` / `config.json` | yes (`.gitignore`) |

Example paths in the tool README (`C:\path\to\...`) are placeholders, not machine-specific.

Identifier search:

- **Sethy** — appears inside public GitHub URLs `Sethysethyseth/the-poor-mans-agentic-workflow` (`README.md:35`, `:283`; `SETUP.md:21`). No `C:\Users\...` personal paths in public files. — **NIT** (confirm this is the intended public owner slug; if publishing under a different org, rewrite)
- **OneDrive** — only as cloud-sync warning copy in docs/templates/checklists (not a personal path). Not a leak.
- **C:\Users** — **clean** in public files

**Instructions match files; no absolute personal Windows paths leaked.**

---

## Suggested fix priority

1. Remove README buildout banner; add `LICENSE`.
2. Fix autonomous wave composition math (`five` vs `four` code units) so seven/six-unit claims are internally consistent.
3. Unify "resident reviewer" vs "resident planner" naming; stamp remaining Level-1 / level-table prices; fix generated-set checklist / `_TEMPLATE` references; inline or drop economics' pointer to unpublished stats JSON.
