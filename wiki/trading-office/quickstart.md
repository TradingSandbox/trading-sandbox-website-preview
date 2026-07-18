---
title: Your First Strategy
description: Take one trading idea through research, testing, paper operation, monitoring, and review.
outline: 2
---

# Your First Strategy

This tutorial takes one rough observation through the complete Trading Office loop: research it, test it, promote the result, operate it on paper, monitor it, and record what you learned.

## Before you begin

- Open a Trading Office pane with a trading book selected. In the current preview, choose **Hedge Fund** and select the corresponding **fund book**. Ideas, experiments, approvals, and reviews are attributed to an employee and scoped to that book.
- Keep TradingView connected. It is the simulation engine used by Strategy Lab.
- Guided mode is enough for this tutorial. Once a run starts, deterministic backtest continuation can keep advancing it in either Guided or Autonomous Paper mode.

## The loop at a glance

| Stage | What becomes durable |
|---|---|
| Research | The original idea and its shaped hypothesis |
| Test | The approved experiment plan, completed chunks, results, and verdict |
| Promote | One frozen strategy version and its evidence links |
| Operate | A version-tagged Office paper trade with recorded risk and exits |
| Monitor | Position state, marks, planned exits, and later strategy behavior |
| Review | Paper results and a Keep, Pause, Retire, or Improve decision |

## 1. Capture the idea

Run:

<p class="doc-code-label">Command</p>

```text
/ideas
```

Choose **Capture** and enter one observation. Keep it specific enough to discuss, but do not force parameters too early.

<p class="doc-code-label">Example idea</p>

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

<p class="doc-code-label">Command</p>

```text
/backtest
```

Then choose **New experiment**.

## 3. Build and approve the experiment

Strategy Lab follows a fixed contract:

<p class="doc-code-label">Strategy Lab lifecycle</p>

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

After the promising verdict appears, ask the Trading Office pane to promote that completed job. Rejected and inconclusive jobs remain as evidence but cannot pass this gate.

Open **Backtest Lab → Approvals** to inspect the proposed deployment. The approval view shows the strategy, hypothesis, verdict, parameters, exits, universe, evidence job, and risk limits before you approve or reject it.

Approval records who authorized paper use and makes the strategy ready for paper operation.

## 6. Book one version-tagged paper trade

Run:

<p class="doc-code-label">Command</p>

```text
/strategies
```

Select the approved version. When **Trade** is available, it creates a risk-sized entry ticket from the version's stored universe, exit fields, and deployment risk limit. Review the symbol, side, instrument, quantity, stop, targets, and paper fill, then confirm the Office paper trade in Market Terminal.

This is a simulated transaction in the trading book, not a broker order. The trade carries the strategy version and deployment IDs so it appears in the correct journal. The position monitor handles recorded stop, target, and time-exit conditions; use Market Terminal whenever you want to inspect or make a partial exit yourself.

## 7. Monitor the position and strategy

Open Market Terminal:

<p class="doc-code-label">Command</p>

```text
/terminal
```

Use it to inspect the position, current mark, unrealized P&L, and recorded exit plan. The position monitor checks stored stops, targets, and time exits. Use a watch when you also want an employee to revisit the broader thesis or report a meaningful change in market context.

As paper trades close, their tagged outcomes accumulate in the strategy journal. A forward check can also test the unchanged strategy over history that arrived after promotion.

## 8. Review the evidence

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

## Continue through the lifecycle

- Shape stronger hypotheses → [Research and Ideas](./ideas)
- Understand the evidence pipeline → [Test in Strategy Lab](./strategy-lab)
- Automate monitoring and recurring work → [Automation Tools](./watches)
- Close the learning loop → [Review and Improve](./review)
