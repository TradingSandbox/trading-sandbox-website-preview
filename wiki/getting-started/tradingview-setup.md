---
title: Connect TradingView
description: Prepare TradingView Desktop for tradecli chart, market-data, Pine, and Strategy Lab workflows.
outline: 2
---

# Connect TradingView

tradecli uses TradingView Desktop for chart state, TradingView-derived prices, Pine compilation, and Strategy Lab simulation. TradingView is a connected system; the trading book, experiment plan, results, strategy versions, and paper ledger remain in tradecli's local Trading Office records.

This is separate from [Browser Setup](./browser-setup). Browser Setup prepares the Chrome profile used for web workflows. TradingView workflows connect to the locally running TradingView Desktop application.

## Before you begin

Confirm that:

- [TradingView Desktop](https://www.tradingview.com/desktop/) is installed;
- you can sign in and open a chart in the Desktop application;
- `tradecli setup` has completed; and
- `tradecli doctor` reports the TradingView MCP source package as cached.

`tradecli setup` downloads the TradingView connector used by tradecli. It does not install the TradingView Desktop application or sign in to your TradingView account.

## Connect the Desktop application

1. Open TradingView Desktop once, sign in, and open or create a chart layout.
2. Launch `tradecli` and enter the Trader or Trading Office workflow that needs TradingView.
3. Ask the active employee:

```text
Check the TradingView connection. If it is not connected, launch TradingView
without closing an existing instance. Then tell me which symbol and timeframe
are open.
```

tradecli checks the local TradingView connection before using chart, Pine, or market-data tools. A successful check returns the connected chart context, including its current symbol and timeframe.

If the Desktop application is open but the connection is unavailable, ask tradecli to launch TradingView without closing the existing application. Restarting an existing TradingView instance is a separate recovery action and should not happen without your approval.

## Prepare Strategy Lab

Strategy Lab uses TradingView as its simulation target. Before starting [Your First Strategy](/trading-office/quickstart):

1. Keep TradingView Desktop open.
2. Confirm that the connection check succeeds.
3. Open a normal chart for the market you intend to test.

During BUILD, tradecli writes or restores a Pine strategy and compiles it on the chart. The first build can expose a manual **Add to chart** step. After that action, the build gate checks the compiled strategy and its declared inputs before PLAN can continue.

## What the connection is used for

| Workflow | TradingView provides |
| --- | --- |
| Chart research | Symbol, timeframe, bars, indicators, drawings, and screenshots |
| Strategy Lab | Pine compilation and backtest simulation |
| Paper planning | TradingView-derived prices when the paper fill is not supplied explicitly |
| Position monitoring | Current marks used to evaluate recorded paper exit rules |

TradingView does not hold the Trading Office book, approvals, paper ledger, strategy lineage, journal, or reviews. It also does not turn an Office paper trade into a broker order.

## Troubleshooting

### The connector package is missing

Run:

```bash
tradecli doctor
tradecli doctor --fix
```

The fix path can refresh a missing or stale TradingView connector package.

### TradingView Desktop is open but not connected

- Ask tradecli to run the TradingView connection check again.
- If needed, ask it to launch TradingView without closing the existing instance.
- Close and restart TradingView only when the non-destructive launch path does not restore the connection and you are ready to interrupt the current Desktop session.

### A backtest pauses after a connection failure

Completed chunks remain stored. The Strategy Lab workflow retries temporary TradingView failures with backoff. Use **Backtest Lab → Jobs → Status** to inspect the saved job rather than starting a duplicate experiment.

### BUILD stops at the chart

Check the TradingView window for the Pine strategy and complete the manual **Add to chart** action when it appears. Strategy Lab verifies the compiled strategy again before it accepts the build.

## Related pages

- [Set up your Trading Office](/trading-office/setup)
- [Your first strategy](/trading-office/quickstart)
- [Test in Strategy Lab](/trading-office/strategy-lab)
- [Browser Setup](./browser-setup)
