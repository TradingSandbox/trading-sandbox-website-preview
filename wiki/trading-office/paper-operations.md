---
title: Paper trade and monitor
description: Find candidates, build risk-sized plans, record Office paper trades, monitor positions, and manage exits.
outline: 2
---

# Paper trade and monitor

Paper operation turns a researched setup into a simulated transaction in the active trading book. It joins candidate selection, deterministic risk math, a reviewable ticket, market-derived marks, planned exits, and the Office ledger.

An Office paper transaction belongs to the Trading Office ledger. It records the strategy, risk, position, and exit plan without placing a live broker order.

## Three ways to reach a paper ticket

### From a promoted strategy

Open the Strategy Library:

```text
/strategies
```

An approved or active paper deployment can expose **Trade**. The current path creates a risk-sized, human-confirmed ticket from the stored universe, exit fields, and deployment risk limit, then tags the resulting trade with its strategy-version and deployment identifiers.

Review the generated symbol, direction, instrument, quantity, stop, targets, and risk before confirming the ticket. The resulting transaction stays connected to the strategy version and deployment that produced it.

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

It works from the stored plan and market data, not from a watch prompt. A watch can notice and report a condition; the position monitor applies the exit rules recorded on the paper position. You can inspect, partially exit, or fully exit the position yourself through Market Terminal at any time.

## Related pages

- [Test in Strategy Lab](/trading-office/strategy-lab)
- [Automation tools](/trading-office/watches)
- [Review and improve](/trading-office/review)
- [Concepts and terminology](/trading-office/concepts)
- [Commands and shortcuts](/trading-office/commands)
