---
name: create-skill
description: Author a new skill for this workflow when an existing one genuinely does not cover the situation - after proving no current skill fits, and only for something that has recurred or caused an incident. Use when someone wants a new skill, or keeps repeating instructions no skill holds.
---

# create-skill - add a verb, but make it earn the slot

The workflow ships twelve skills. That number is deliberate: every skill
is a thing an agent has to notice, a thing a human has to remember exists,
and a thing that will drift. **The default answer to "we should make a
skill for this" is no** - usually the situation belongs inside a skill
that already exists.

This skill's job is to say no correctly, and then to write a good one when
the answer is actually yes.

**Done when:** either the need is met by an existing skill (and you say
which), or a new skill file exists with a trigger, a done-condition, and
the incident or repetition that justified it.

---

## 1. The three gates

A new skill has to pass all three. Check them in order and stop at the
first failure.

**Gate 1 - no existing skill covers it.** Read the descriptions of all
twelve before writing anything. Most "new skills" are one paragraph
missing from `relay-block`, `relay-review`, or `relay-setup`. Amending an
existing skill is almost always the better outcome: it puts the rule where
the agent is already looking.

**Gate 2 - it has a real trigger.** State the moment it fires in one
sentence, starting with "when." If the trigger is "when you want to do it
well" or "when working on the frontend," it is not a trigger - it is a
preference, and it belongs in the contract or in a project gotchas file.
Two skills that can fire at the same moment will be picked between
arbitrarily; that is worse than one slightly broader skill.

**Gate 3 - it has happened.** An incident, or the third repetition of the
same manual instruction. This mirrors the rule `relay-retro` enforces in
the other direction: *a rule nobody can trace to a real incident gets
deleted.* Skills invented in anticipation are the ones nobody invokes and
nobody maintains.

If a need fails Gate 3 but is clearly real, say so and write it down
somewhere cheap - a note in the state file, a line in the project's
gotchas. If it recurs, it comes back with its receipt.

## 2. Name it for what it does

Use **`relay-*`** if it is a verb in the loop, acting on the project's
work - a spec, a block, a delivery, a wave. Use **no prefix** if it acts
on the workflow installation itself, the way `workflow-upgrade` and
`skill-map` do.

One or two plain words. The name and description carry the entire
selection decision - an agent picks a skill from those alone, before
reading a line of the body - so write the description as *what it does*
plus *when to use it*, using the words a person would actually type. Check
for collisions with skills already in the project, including ones from
other sources; a name that shadows an unrelated skill makes both
unreliable.

## 3. Write it standalone

**Every skill in this workflow must read as a plain document at a stable
URL.** Someone will hand a chat assistant the link with no repo, no
context, and no skill support, and expect it to work. So:

- No "as established above," no dependence on trigger context.
- State the goal in the first paragraph and the **done-condition** near
  the top, before the procedure.
- Reference other files by path, and assume the reader might not open
  them. If a rule is load-bearing, state it here even if it lives
  elsewhere too - but state it once, and point at the source for detail.

Structure that works, and matches the rest of the set:

```markdown
---
name: <the-name>
description: <what it does. When to use it.>
---

# <name> - <one-line tagline>

<Why this exists - the failure it prevents. Two or three sentences.>

**Done when:** <the observable end state.>

---

## <numbered steps or named sections>

## What this skill must never do
```

## 4. Say what it must never do

The most useful section in most of these skills is the list of things the
skill is not allowed to do. Write it - an agent following a procedure will
happily "improve" it at the edges, and the never-list is what holds. If
the skill trades something away, state the downside beside it:
`relay-retro`'s rule applies here too, and **a change with no stated
downside is usually one nobody thought hard about.**

## 5. Register it

Add it to the skill table in the project's contract, render it into
whatever adapters are in use (the adapter **points at** the file, it does
not copy it), note the incident date in the body if one justified it, and
run `skill-map` so it shows up in the install's picture.

## What this skill must never do

- **Never create a skill that fails Gate 1.** Overlapping skills degrade
  every skill's selection, not just the new one.
- **Never write a skill for a one-time task.** That is a task block, and
  `relay-block` authors it.
- **Never copy content out of `core/` into a new skill.** Point at it.
  Duplication is exactly what this version of the workflow removed.
- **Never add a skill without also checking whether one should be
  deleted.** The set stays small by subtraction as well as by refusal.
