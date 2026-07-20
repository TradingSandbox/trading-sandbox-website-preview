---
title: Your first strategy
description: Run one trading idea through research, Strategy Lab, paper trading, monitoring, and review.
outline: 2
---

# Your first strategy

This walkthrough shows the complete Trading Office path using one example idea. The experiment can finish as promising, rejected, or inconclusive. That verdict is part of the tutorial: a strategy advances to paper trading only when the recorded evidence passes the machine gate.

## Before you begin

Complete this checklist:

- Run `tradecli setup` and `tradecli doctor`.
- Choose **Hedge Fund**, the current interface name for Trading Office.
- Select a trading book and open an employee pane.
- Use **Guided** mode for this walkthrough.
- [Connect TradingView](/getting-started/tradingview-setup) and keep TradingView Desktop open.

Ask the employee to confirm the chart connection:

```text
Check the TradingView connection. If it is not connected, launch TradingView
without closing an existing instance. Then tell me which symbol and timeframe
are open.
```

Guided mode keeps scheduled employee workflows deferred. Once an approved backtest starts, deterministic chunk continuation can still advance it in either Guided or Autonomous · Paper trading mode.

## What this walkthrough creates

| Stage | Record created |
| --- | --- |
| Research | Original idea and shaped hypothesis |
| Test | Approved experiment plan, saved chunks, results, and machine verdict |
| Promote | Frozen strategy version and proposed paper deployment, only after a promising verdict |
| Paper trade | Version-tagged simulated transaction with recorded risk and exits |
| Monitor | Position marks, planned exits, and later version behavior |
| Review | Keep, Pause, Retire, or Improve decision |

## 1. Capture an idea

Run:

<p class="doc-code-label">Command</p>

```text
/ideas
```

Choose **Capture**. You can use this example or substitute your own observation:

<p class="doc-code-label">Example</p>

```text
On RELIANCE daily bars, a close above the previous 20-day high may continue
higher over the next five sessions.
```

Save it and choose **Shape with me**.

**Ready to continue when:** the idea appears in the active book's backlog and the shaping conversation has started.

## 2. Shape the test

Answer the focused shaping questions without adding unrelated rules. For the example above, keep the intended test explicit:

```text
Entry: daily close above the previous lookback high
Exit: five bars after entry, with a 2% protective stop
Sweep: lookback length of 10, 20, and 40 bars
Scope: NSE:RELIANCE on the daily timeframe
Falsified if: later validation is too thin or does not retain acceptable results after costs
```

The shaped idea stores the claim, entry, exit, sweep candidates, scope, and falsification rule together. Choose **Send to Lab** when those fields describe the question you intend to test.

**Ready to continue when:** the Idea Backlog links the idea to a Strategy Lab experiment.

## 3. Build and approve the experiment

The current `/backtest` menu is labeled **Backtest Lab**. It exposes the Strategy Lab contract:

<p class="doc-code-label">Strategy Lab lifecycle</p>

```text
BUILD → PLAN → RUN → JUDGE → PROMOTE
```

During BUILD, tradecli restores a matching saved strategy or authors a Pine strategy, compiles it on TradingView, checks its declared inputs, and fingerprints the compiled result. The first build can require one manual **Add to chart** action in TradingView before verification finishes.

PLAN then shows the stored experiment specification. For this example, confirm that it contains the intended:

- hypothesis;
- `NSE:RELIANCE` symbol and daily timeframe;
- fixed exit and stop rules;
- 10, 20, and 40-bar lookback sweep;
- historical range and validation method;
- commission and slippage assumptions;
- ranking rule, minimum trade count, grid size, chunk count, and warnings.

Approve only when the card matches the intended test. Approval starts that exact stored plan. Changing any field requires a new plan and another approval.

**Ready to continue when:** the plan is approved and RUN has a saved job identifier.

## 4. Let the saved job finish

Strategy Lab divides the experiment into persisted chunks. Completed chunks survive later sessions and model timeouts.

Open **Backtest Lab → Jobs**:

- **Status** reads the saved stage and progress.
- **Results** reads the specification, leaderboard, validation, and verdict.
- **Interpret** asks AI to explain the stored result.
- **Cancel** stops the job while keeping its completed chunks.

If TradingView disconnects temporarily, keep the existing job. The workflow retries with backoff. Check **Status** instead of creating a duplicate experiment.

**Ready to continue when:** JUDGE records one terminal verdict—**promising**, **rejected**, or **inconclusive**.

## 5. Follow the verdict

The machine verdict controls the next step:

| Verdict | What to do |
| --- | --- |
| **Promising** | Continue to promotion below |
| **Rejected** | Keep the result as evidence; do not promote it |
| **Inconclusive** | Inspect the recorded reason; create a new hypothesis or plan only when the question genuinely changes |

Do not adjust thresholds merely to force the example through the gate. A rejected or inconclusive example has still completed a valid research-and-test workflow.

## 6. Promote a promising result

Only continue when the job's verdict is **promising**. Ask the Trading Office employee to promote the completed job.

Promotion freezes the Pine implementation, selected parameters, exit rules, universe, fingerprint, lineage, and evidence links into a strategy version. It also creates a proposed paper deployment with risk limits.

Open **Backtest Lab → Approvals**. Review the version, hypothesis, verdict, parameters, exits, universe, evidence job, and risk limits before approving or rejecting the paper deployment.

Approval records who authorized paper use. It does not start an automatic strategy-version execution runtime.

**Ready to continue when:** `/strategies` shows the frozen version and its approved paper deployment.

## 7. Create the current paper ticket

Run:

<p class="doc-code-label">Command</p>

```text
/strategies
```

Select the approved version and choose **Trade** when it is available. The current path creates a risk-sized ticket from the stored universe, exit fields, and deployment risk limit.

Review the symbol, side, instrument, quantity, stop, targets, paper fill, and total risk. Confirming the ticket records a simulated transaction in the trading book; it does not place a broker order.

The transaction carries the strategy-version and deployment identifiers into the ledger and journal.

**Ready to continue when:** Market Terminal shows the Office paper position with its entry and exit plan.

## 8. Monitor and review

Open Market Terminal:

<p class="doc-code-label">Command</p>

```text
/terminal
```

Use it to inspect the position, current mark, unrealized P&L, remaining quantity, and recorded exit plan. The position monitor checks stored stops, targets, time exits, and applicable intraday cutoffs. A watch is separate: use one when an employee should revisit the wider thesis or report a material contextual change.

Return to `/strategies` for version-specific evidence:

- **Journal** — tagged trades and their computed outcomes.
- **Forward check** — the unchanged version over post-promotion history.
- **Review** — original expectation beside the paper journal.
- **Reviews** — earlier decisions and child hypotheses.

Review warns when there are fewer than ten closed paper trades. You can inspect the flow with a thin sample, but treat any decision conservatively.

Choose one recorded outcome when the evidence supports it:

- **Keep** — continue the version as-is.
- **Pause** — stop new entries for an applicable deployment.
- **Retire** — permanently stop the version.
- **Improve** — create a child draft around one explicit change hypothesis.

An improved child returns to Strategy Lab and must earn its own verdict. The parent version and its evidence remain unchanged.

## Completion check

If the experiment was promising and you completed the paper path, the local Trading Office record now connects:

```text
idea → approved plan → saved job → machine verdict → frozen version
     → deployment decision → paper activity → journal → review
```

If the experiment was rejected or inconclusive, the record correctly ends at the verdict. That is not an incomplete run; it is a strategy that did not pass the promotion gate.

## Continue through the lifecycle

- Shape stronger hypotheses → [Research and ideas](./ideas)
- Understand the evidence pipeline → [Test in Strategy Lab](./strategy-lab)
- Configure repeated observation → [Automation tools](./watches)
- Compare paper behavior with the test → [Review and improve](./review)
