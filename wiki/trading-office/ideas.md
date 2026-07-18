---
title: Research and Ideas
description: Capture, shape, park, and advance Trading Office ideas without losing their evidence or history.
outline: 2
---

# Research and Ideas

The Idea Backlog is the starting point for every Trading Office strategy. Use it to capture a rough observation, shape it into a falsifiable hypothesis, or send it to Strategy Lab for testing.

Idea records remain scoped to the active trading book and employee. Captured, in-flight, rejected, validated, and parked ideas remain searchable as part of the strategy's history.

## Open the Idea Backlog

From a Trading Office pane, run:

```text
/ideas
```

The menu has three views:

| View | What it contains |
|---|---|
| **Capture** | A one-line input for a new idea |
| **Backlog** | Captured and in-flight ideas |
| **Concluded** | Validated, rejected, or parked ideas with their evidence |

Ideas require an active Trading Office employee and book. This keeps the research record attached to the office that owns the work.

## Capture first, parameterize later

A useful capture states an observation or suspected relationship. It does not need to arrive as a finished strategy.

```text
Breakouts after a narrow opening range may hold better when volume is elevated.
```

Avoid hiding several unrelated claims in one idea. A smaller claim is easier to falsify and easier to improve later without changing everything at once.

After saving it, choose:

- **Shape with me** to clarify the hypothesis.
- **Test it now** to send the original sentence directly to Strategy Lab.
- **Keep in backlog** to return later.

## Shape a falsifiable hypothesis

Shaping is a short conversation before any experiment is approved. tradecli asks one focused question at a time and concentrates on the choices that are genuinely unresolved:

1. What exact event triggers entry, and on which bar?
2. Which symbols or universe and timeframe does the claim cover?
3. What target, stop, or time rule ends the trade?
4. What result would make you reject the claim?

The resulting shape is recorded as a compact block:

```text
Claim
Entry
Exit
Sweep candidates
Scope
Falsified if
```

If a similar strategy already exists in the Strategy Library, the shaping flow can surface the overlap so the next test becomes an intentional improvement rather than an accidental duplicate.

::: tip A practical test
A hypothesis is ready when another person could implement the same entry and exit, run it on the named scope, and tell you what result would count against it.
:::

## Send an idea to Strategy Lab

Open the idea in **Backlog** and choose **Send to Lab**. The idea record is carried into the experiment so its plan, job, verdict, and later strategy version can be traced back to the original observation.

Sending an idea does not bypass the evidence gates. Strategy Lab still has to:

```text
BUILD → PLAN → RUN → JUDGE → PROMOTE
```

Nothing runs until you review and approve the experiment plan. See [Test in Strategy Lab](./strategy-lab).

## Keep, park, or conclude

- **Keep in backlog** when the idea is interesting but not ready to test.
- **Park** when you want to conclude it without testing. Parking does not delete it.
- A tested idea moves into the concluded history with its recorded verdict and evidence.

Use **Snapshot** on an idea to place its text, source, capture time, status, and linked experiment identifiers into scrollback without asking AI to reconstruct them.

## A useful idea template

Use this as a thinking aid, not a form you must complete before capture:

```text
Observation: What recurring behavior did I notice?
Mechanism: Why might it exist?
Trigger: What event would create an entry?
Scope: Which market, symbols, and timeframe?
Exit: What closes or invalidates the trade?
Falsified if: What evidence would make me abandon the claim?
```

The mechanism can remain uncertain. The trigger, scope, exit, and falsification rule cannot remain ambiguous when the experiment is approved.

## Principles to keep

- **An idea is not a strategy version.** It becomes one only after a promising experiment is promoted.
- **Rejected is a useful result.** It prevents the same unsupported claim from returning as if it were new.
- **One change deserves one child hypothesis.** Improvements should preserve the parent and state exactly what changed.
- **The record outranks the chat.** The durable idea, plan, result, and review are the strategy's history.

## What's next

- Run the complete loop → [Your First Strategy](./quickstart)
- Design and approve the test → [Test in Strategy Lab](./strategy-lab)
- Turn paper evidence into a decision → [Review and Improve](./review)
