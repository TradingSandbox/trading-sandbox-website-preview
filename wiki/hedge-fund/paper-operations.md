---
title: Run paper strategies
description: Find candidates, build risk-sized plans, book Office paper trades, and monitor or exit positions.
outline: 2
---

# Run paper strategies

Paper operation turns a researched setup into a simulated transaction in the active fund book. It joins candidate selection, deterministic risk math, a reviewable ticket, market-derived marks, planned exits, and the Office ledger.

::: warning Paper means paper
An Office paper transaction is not a broker order. Hedge Fund mode does not use Autonomous · Paper trading as permission to place live orders.
:::

## Three ways to reach a paper ticket

### From a promoted strategy

Open the Strategy Library:

```text
/strategies
```

An approved or active paper deployment can expose **Trade**. The current path creates a risk-sized, human-confirmed ticket from the stored universe, exit fields, and deployment risk limit, then tags the resulting trade with its strategy-version and deployment identifiers.

The current Library action assumes a **buy-side equity** entry. It does not evaluate the version's frozen Pine entry signal or infer a short, option, or futures entry. Verify that the ticket actually represents the strategy; otherwise build the appropriate paper plan separately.

This is the traceable path for the idea-to-review journey, but it is currently initiated by the user. Scheduled entry generation from the frozen version is **TBD**.

### From Scanner

Open Scanner with `Ctrl+Shift+N`. It supports a repeatable pipeline:

**saved scan or symbol search → candidate → strategy card → paper booking → Market Terminal**

Saved scans form a shared Office playbook. Re-running a saved definition applies the same validated query, while the market results can naturally change. The Scanner surface also covers equity screens, option chains, and futures curves when the required data is available.

### From conversation

Ask the active employee to turn a setup into a strategy plan. The deterministic planning layer can resolve:

- direction and entry reference;
- stop as a price, percentage, or ATR-based distance;
- targets as prices, percentages, or R-multiples;
- equal or explicit scale-out quantities;
- risk as a fixed amount or percentage of book cash;
- whole-unit or whole-lot sizing;
- an optional planned time exit.

The result is a computed plan and risk card, not free-form AI arithmetic. Review it before opening the paper ticket.

## Review the risk card

Before booking, check:

- symbol, instrument, side, and product type;
- entry reference and the source of the current mark;
- quantity or lots;
- stop price and risk per unit;
- total paper risk and percentage of book cash;
- target prices, R:R, and scale-out quantities;
- planned time exit;
- affordability or reward-to-risk warnings;
- strategy-version and deployment tags, when this came from the library.

Changing the stop, risk, quantity, or lots recomputes the plan. A manual size override also changes the implied risk shown on the card.

## Mandate and risk checks

Before a paper entry is recorded, the system can block it when stored controls deny the action. Checks include paper-trade permission, kill-switch state, allowed instruments or symbols, maximum notional, required stops, and market-session rules.

Treat a warning as a reason to inspect the mandate and book state, not as permission to improvise around the control.

## Book the paper entry

Confirming the ticket records the simulated entry and its exit plan in AI Trading Office. The entry can carry targets, stop, scale-out quantities, and a time exit so later monitoring does not need to reconstruct the plan from chat.

When no explicit paper fill is supplied, the trade path obtains a current TradingView-derived price. If required market data is unavailable, the safe result is an error rather than an invented fill.

## Monitor in Market Terminal

Open Market Terminal with either path:

```text
/terminal
```

or `Ctrl+Shift+M`.

The terminal shows the active Office paper book, open positions, current marks, and unrealized P&L. Broker holdings can appear as read-only context when configured; they are not merged into the Office paper ledger.

Use it to:

- inspect entry, quantity, mark, and P&L;
- open a new paper entry ticket;
- exit a position fully or partially;
- verify that a planned exit changed the position and ledger.

The conversation shortcuts `/trade` and `/exit [symbol]` route into the same paper-trade surfaces.

## Deterministic position monitoring

The position monitor is a background service for recorded exit conditions. It can evaluate:

- stop-loss levels;
- one or more targets;
- planned time exits;
- applicable intraday cutoffs.

It works from the stored plan and market data, not from a watch prompt. That distinction matters: a watch can notice and report a condition, while the position monitor is the deterministic mechanism intended to apply a recorded paper exit. Multi-target automatic scale-out progression is still being verified; use Market Terminal when a partial exit must be explicit.

## What is available and what is TBD

| Capability | Status |
| --- | --- |
| Scanner and saved Office playbooks | Available |
| Deterministic risk sizing and paper tickets | Available |
| Manual, version-tagged buy-side equity ticket from Strategy Library | Available, with the boundary above |
| Workflow-driven, mandate-constrained Office paper trades | Available in Autonomous · Paper trading |
| Market Terminal entries, partial exits, and full exits | Available |
| Deterministic stored stop, target, and time-exit monitoring | Available |
| Automatic multi-target scale-out progression | **TBD verification** |
| Scheduled entries generated from one exact promoted strategy version | **TBD** |
| Live Hedge Fund broker execution | Outside the current product boundary |

## Related pages

- [Test in Strategy Lab](/hedge-fund/strategy-lab)
- [Watches and schedules](/hedge-fund/watches)
- [Review and improve](/hedge-fund/review)
- [Status and reference](/hedge-fund/reference)
