# the-poor-mans-agentic-workflow

> Working title. **Status: under construction — private shell, not yet
> published.** Do not flip this repo to public; that is the owner's call.

This repo will document a real two-seat agentic coding workflow that runs at
$0-40/month (a planner/reviewer seat + an executor seat, with the human as
the message bus) as an honest alternative to $200/month single-seat agentic
coding. It ships as a five-level on-ramp into agentic coding (decision 17):
Level 0 - one agent, no protocol ($0-20); Level 1 - the solo relay, roles
split by session ($20); Level 2 - add a free executor trial; Level 3 - the
full two-seat relay ($40); Level 4 - the opt-in autonomous relay (the
planner seat dispatches, audits, and lands units itself; the human keeps
the gates). Level moves in either direction require zero repo changes, and
the planner seat runs on Claude (Claude Code) or ChatGPT (Codex CLI) -
decision 18. It was extracted from a live project where the workflow
shipped real features and caught real bugs.

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
