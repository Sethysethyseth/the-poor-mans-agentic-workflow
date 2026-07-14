# the-poor-mans-agentic-workflow

> Working title. **Status: under construction — private shell, not yet
> published.** Do not flip this repo to public; that is the owner's call.

This repo will document a real two-seat agentic coding workflow that runs at
$20-40/month (a planner/reviewer seat + an executor seat, with the human as
the message bus) as an honest alternative to $200/month single-seat agentic
coding. It ships as a three-rung on-ramp: solo Claude ($20), Claude + a free
Cursor trial to evaluate the two-seat relay ($20), the full two-seat setup
($40) - with rung changes in either direction requiring zero repo changes.
It also ships two driving modes: the manual relay (default - the human
runs the loop) and an opt-in autonomous relay (the planner seat
dispatches, audits, and lands units itself; the human keeps the gates),
switchable both ways with zero protocol-file edits.
It was extracted from a live project where the workflow shipped real
features and caught real bugs.

## State of this repo

This is a **shell**. The finished content does not exist yet. What exists:

- **`BRIEF.md`** — build instructions for the agent doing the buildout.
  If you are an AI agent working in this repo, start there and follow it.
- **`source-material/`** — verbatim (lightly scrubbed) copies of every
  artifact from the source project: the tracking doc, agent contracts,
  task-block templates, queue protocol, and operational rituals. This is the
  ground truth to extract from. Do not invent content that isn't supported
  by these files.

## For the human

Point an agent (e.g. a Claude Code web session at claude.ai/code) at this
repo with: *"Read BRIEF.md and follow it."* It will batch its questions up
front, then build the repo out in reviewable PRs.
