---
title: Quickstart — Idea to Reviewed Paper Strategy
description: Take one Hedge Fund idea through a durable backtest, paper approval, a version-tagged paper trade, and review.
outline: 2
---

# Quickstart — Idea to Reviewed Paper Strategy

This is the main Hedge Fund workflow: turn a rough observation into a testable strategy, collect evidence, operate it on paper, and decide what to do next without losing the history behind it.

::: info Available
The supervised loop is available today: idea → experiment → machine verdict → promoted version → approval → human-confirmed paper ticket → journal → review.
:::

::: warning TBD — exact-version scheduled execution
An approved deployment does **not** yet start a scheduled runner for that exact promoted version. Hedge Fund employees can run general autonomous paper workflows under mandates, but the runtime that repeatedly evaluates the frozen strategy rules and creates version-tagged entries is still to be built.
:::

## Before you begin

- Open a Hedge Fund office pane with a fund book selected. Ideas, experiments, approvals, and reviews are attributed to an employee and scoped to that book.
- Keep TradingView connected. It is the simulation engine used by Strategy Lab.
- Guided mode is enough for this tutorial. Once a run starts, deterministic backtest continuation can keep advancing it in either Guided or Autonomous Paper mode.

## The loop at a glance

| Stage | What becomes durable |
|---|---|
| Capture | The original idea and its shaped hypothesis |
| Test | The approved experiment plan, completed chunks, results, and verdict |
| Promote | One frozen strategy version and its evidence links |
| Approve | An employee-attributed paper deployment decision |
| Operate | A human-confirmed, version-tagged Office paper trade |
| Review | Paper results and a Keep, Pause, Retire, or Improve decision |

## 1. Capture the idea

Run:

```text
/ideas
```

Choose **Capture** and enter one observation. Keep it specific enough to discuss, but do not force parameters too early.

```text
Large-cap gap-downs may fill more often during expiry weeks.
```

After capture, choose one of three verified paths:

- **Shape with me** — sharpen it through a short conversation.
- **Test it now** — send the sentence to Strategy Lab as-is.
- **Keep in backlog** — save it without starting an experiment.

See [Research and Ideas](./ideas) for a practical shaping template.

## 2. Make it testable

During shaping, tradecli focuses on the unresolved parts of the hypothesis: the exact entry trigger, universe and timeframe, exit rules, and what result would falsify the claim. The shaped record keeps the claim, entry, exit, sweep candidates, scope, and falsification rule together.

When ready, choose **Send to Lab**. You can also start independently with:

```text
/backtest
```

Then choose **New experiment**.

## 3. Build and approve the experiment

Strategy Lab follows a fixed contract:

```text
BUILD → PLAN → RUN → JUDGE → PROMOTE
```

During BUILD, tradecli either restores an existing Library strategy or authors a new Pine strategy, compiles it on TradingView, verifies its declared inputs, and fingerprints the compiled result. On first setup, TradingView may require one **Add to chart** click before verification can finish.

PLAN then shows the exact experiment: hypothesis, fixed and swept parameters, symbols, timeframes, historical window, validation method, cost assumptions, cell and chunk counts, ranking rule, and warnings.

Approve the native plan dialog only when it matches the question you intend to test. The approved plan is immutable; changing any part requires a new plan and another approval.

## 4. Let the run finish

The run is divided into bounded, persisted chunks. Completed chunks survive model timeouts and later sessions, and the workflow heartbeat can continue an unfinished job without another agent prompt.

Use **Backtest Lab → Jobs** to inspect it:

- **Status** shows the persisted stage tracker without AI interpretation.
- **Results** shows the leaderboard, validation, and verdict from stored job state.
- **Interpret** asks AI to explain the recorded result.
- **Cancel** stops the job while keeping already completed chunks in its research record.

JUDGE produces exactly one machine-owned verdict: **promising**, **rejected**, or **inconclusive**. AI may explain that verdict, but cannot replace it.

## 5. Promote and approve

Only a completed job with a **promising** verdict can be promoted. Promotion freezes the strategy implementation, parameters, exit rules, universe, fingerprint, and evidence into a version, then creates a proposed paper deployment with risk limits.

After the promising verdict appears, ask the Hedge Fund pane to promote that completed job. Rejected and inconclusive jobs remain as evidence but cannot pass this gate.

Open **Backtest Lab → Approvals** to inspect the proposed deployment. The approval view shows the strategy, hypothesis, verdict, parameters, exits, universe, evidence job, and risk limits before you approve or reject it.

Approval records who authorized paper use. It does not itself place a trade or start the TBD scheduled strategy runner.

## 6. Book one version-tagged paper trade

Run:

```text
/strategies
```

Select the approved version. When **Trade** is available, it creates a risk-sized entry ticket from the version's stored universe, exit fields, and deployment risk limit. Review the symbol, side, instrument, quantity, stop, targets, and paper fill, then confirm the Office paper trade in Market Terminal.

::: warning Current manual-ticket boundary
The current Strategy Library action builds a buy-side equity ticket. It does not evaluate the frozen Pine entry signal or infer a short, option, or futures entry from the version. Use it only when that ticket matches the strategy you approved; otherwise treat the version as evidence and create the appropriate paper plan separately.
:::

This is a simulated transaction in the fund book, not a broker order. The trade carries the strategy version and deployment IDs so it appears in the correct journal. The deterministic position monitor handles stored stop, target, and time-exit conditions; make partial exits explicitly in Market Terminal while automatic multi-target progression is still being verified.

## 7. Review the evidence

Return to `/strategies`, select the same version, and use:

- **Journal** for tagged trades, open and closed counts, wins and losses, and realized P&L.
- **Forward check** to run the unchanged rules over post-promotion history.
- **Review** to compare the backtest expectation with the paper journal.
- **Reviews** to see earlier outcomes and child hypotheses.

Record one outcome:

- **Keep** — continue as-is and preserve the evidence.
- **Pause** — stop new entries for an applicable deployment.
- **Retire** — permanently stop this version.
- **Improve** — create a child draft around one explicit change hypothesis.

An improved child must return to Strategy Lab and earn its own evidence. The validated parent is never silently rewritten.

## What you have at the end

The Office now holds the idea, approved plan, persisted run, machine verdict, frozen version, deployment decision, version-tagged paper activity, journal, and human review. That durable chain—not the surrounding chat—is the source of truth for the strategy.

## What's next

- Shape stronger hypotheses → [Research and Ideas](./ideas)
- Understand the evidence pipeline → [Test in Strategy Lab](./strategy-lab)
- Close the learning loop → [Review and Improve](./review)

::: danger Paper is not live
Hedge Fund office panes are paper-only. Do not interpret an Office transaction, deployment approval, or autonomous employee report as confirmation of a live broker order.
:::
