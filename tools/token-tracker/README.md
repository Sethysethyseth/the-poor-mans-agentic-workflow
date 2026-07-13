# token-tracker - local window tracking + anchor planning for Claude Code

A single-file, zero-dependency Node script (Node 18+) that reconstructs
your Claude 5-hour usage windows from the Claude Code transcript files
already on your disk (`~/.claude/projects/**/*.jsonl`). Nothing leaves
your machine; no API key is used or needed.

**HONESTY NOTE (load-bearing, mirrored in the script header): Anthropic
does not publish token budgets, and limits are dynamic. Every "weighted
unit" (wu) and every percentage this tool prints is an UNOFFICIAL LOCAL
ESTIMATE, calibrated only by lockouts you actually hit. Treat them as
pacing hints, never as facts.** If the tool has never seen you hit a
lockout, it will tell you it has no budget estimate rather than invent
one.

This is the automated companion to `templates/usage-tracker.md` (the
paper tracker) and the window-anchoring discipline in `docs/economics.md`.
The paper tracker is the primary instrument - this tool is for people who
want the readout automated.

## Why not just ccusage?

[`ccusage`](https://www.npmjs.com/package/ccusage) (community npm tool)
parses the same local logs and gives excellent token/cost readouts - use
it if that's what you want. This tool exists for the three things ccusage
doesn't do:

1. **Window reconstruction** - it rebuilds your actual 5-hour windows
   (a window opens on the first budget-consuming request after the
   previous one expired) so you can see when the current one resets.
2. **Lockout calibration** - it finds "limit reached" events in your
   transcripts and estimates your window budget from where YOU actually
   got locked out, the only honest data source available.
3. **The anchor-plan calculator** - given your weekly work schedule, it
   computes when to fire a cheap "anchor" prompt so window resets land
   where your life needs them (see `docs/economics.md` for why).

## Quickstart

```
node tracker.js report
```

| Subcommand | What it does |
| --- | --- |
| `report` | Full human-readable report: current window, last 7 days, recent windows, calibration state, anchor log. |
| `scan` | Rebuild `data/ledger.json` from transcripts and print a one-line summary. |
| `anchors` | Print the anchor-ping plan computed from your `config.json` schedule. |
| `last-activity` | JSON window-state probe (used by `anchor-ping.ps1` as its guard). |
| `statusline` | One-line summary for a Claude Code custom statusline. |

Flags: `--json` (machine output, where supported), `--recent`
(last-activity: only scan files modified in the last 48h - the fast path).

## Config

Copy `config.example.json` to `config.json` (gitignored) and edit:

- **`schedule`** - your work blocks per weekday. `start`/`end` are
  `"HH:MM"` local 24h time; an `end` smaller than `start` means past
  midnight. Optional `break` is where you'd LIKE the window reset to
  land (dinner, gym). Blocks longer than 5 hours get an anchor time
  computed so two windows cover the block with the reset at your break.
- **`anchor`** - the ping itself: cheapest model, near-empty prompt.
- **`tokenWeights` / `modelWeights`** - unofficial relative-cost ratios
  so different token classes and models share one pacing scalar.
  Change them if you have better local evidence; they carry no
  official authority whatsoever.
- **`transcripts`** - extra transcript directories to scan
  (`~/.claude/projects` is always scanned).

Without a `config.json` the tracker still works - `report`, `scan`, and
`statusline` need no schedule; only `anchors` is meaningless without one.

## Anchor pings (optional, Windows)

`anchor-ping.ps1` fires one minimal prompt (`claude -p "." --model haiku`
by default) to open a window deliberately. Its guard calls
`tracker.js last-activity --recent` first and SKIPS if a window is
already open, so a scheduled ping never spends anything unless it would
actually move your reset time. Every fire/skip is logged to
`logs/anchor-log.jsonl` (the `report` subcommand shows the tail).

Schedule it at the times `node tracker.js anchors` prints, e.g. with
Windows Task Scheduler:

```
schtasks /create /tn "claude-anchor-sat" /sc weekly /d SAT /st 12:00 ^
  /tr "pwsh -NoProfile -File C:\path\to\anchor-ping.ps1"
```

(macOS/Linux: the guard + ping is two lines of shell around the same
`last-activity` probe; a cron port is trivial if you want one.)

## Statusline

Claude Code supports a custom statusline command; point it at:

```
node C:\path\to\tracker.js statusline
```

Output looks like: `win: resets 9:40 PM | 312.4k wu ~62% | 7d 2.1M wu`
(the percentage only appears once at least one lockout has calibrated a
budget). The statusline path reuses a ledger younger than 120s so
frequent re-renders stay cheap.

## Data & privacy

Everything the tool writes stays in this directory and is gitignored:
`data/ledger.json` (the reconstructed windows), `logs/anchor-log.jsonl`,
and your `config.json` (it contains your weekly schedule). The tool makes
no network calls. The only thing that spends money/quota is the anchor
ping itself, which is a real (tiny) prompt to your own Claude account.
