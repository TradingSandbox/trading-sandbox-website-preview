---
title: Pro Trader
description: MCP-first chart trading persona for experienced Indian market traders using TradingView, Groww, and Kite context.
outline: 2
---

# Pro Trader

Pro Trader is built for traders who already understand entries, stops, sizing, and market structure, and want a fast chart-first workflow instead of a teaching flow.

Use Pro Trader when you want to reason from live market context: TradingView chart state, levels, multi-timeframe structure, momentum, options context, and broker-side position checks.

## What it's for

- Chart-first trade decisions for Indian cash and options markets
- Multi-timeframe structure, support/resistance, VWAP, momentum, and invalidation
- Options buying and selling workflows with explicit bias, levels, and risk
- Pine script workflows for indicators, strategies, and TradingView backtests
- Broker-side context from Groww or Kite when it materially improves the decision

Pro Trader assumes you can judge trade risk. It will stay concise, decision-oriented, and practical.

## How it differs from Trader

| Persona | Best for | Primary workflow |
|---|---|---|
| [Trader](/guides/trader) | Streak strategy building, backtesting, deployment, and monitoring | Browser-driven Streak workflows |
| **Pro Trader** | Live chart context, trade setup quality, levels, options/cash decisions, Pine tools | MCP-first TradingView, Groww, and Kite workflows |

If you ask Pro Trader for browser-driven execution, Streak deployment, or Streak strategy monitoring, it should route you back to [Trader](/guides/trader).

## Primary tools

- TradingView Desktop app with at least an Essential paid plan, required for MCP access to charts, screeners, watchlists, Pine state, screenshots, and Strategy Tester results
- A Groww or Zerodha account with MCP access for positions, margin, holdings, and broker context
- An AI provider of your choice to run the workflows

Pro Trader prefers MCP-native workflows over browser detours. For trade discovery and scanning, it prefers TradingView screeners before broker screeners.

Best for: traders who already know what they're doing and want a fast, chart-native second pair of eyes — not hand-holding.

## Trade path routing

For trade intent, Pro Trader resolves the missing parts of the trade path before analyzing the setup:

| Axis | Examples |
|---|---|
| Underlying | NIFTY, BANKNIFTY, RELIANCE, a sector, a watchlist |
| Instrument | Cash, futures, options |
| Style | Intraday, swing, positional |
| Exposure | Long, short, range, volatility, hedge |
| Strategy | Breakout, pullback, mean reversion, event, theta harvest |
| Product | CNC, MIS, MTF, NRML |
| Execution | Discretionary, rule-based, systematic, semi-auto |

If one axis is missing, Pro Trader asks one focused question at a time instead of dumping a long intake form.

## Pine workflows

Pro Trader includes Pine script and backtest workflows for TradingView.

Useful prompts:

```text
Show me the Pine script catalog
Use VWAP and Auto S/R to review this chart
Backtest the strategy already on my chart
Create a Pine strategy for this breakout setup
Stress-test this backtest for repaint or overfit risk
```

High-leverage Pine adapters include IntraEdge, Sentient Level, VWAP, F&O Time Zones, Auto Price Action S/R Levels, TTM Squeeze, SuperTrend + ADX, and Momentum Breakout.

## Typical prompts

```text
Read my BANKNIFTY 5m chart and give me bias, levels, invalidation
Is this NIFTY breakout trade worth taking?
Build an options plan for a range-bound BANKNIFTY session
Scan TradingView for liquid cash breakouts with clean structure
Review my RELIANCE swing setup across 15m, 1h, and daily
Run Strategy Tester on the Pine strategy on my chart and flag red risks
```

::: danger Guardrails
Pro Trader must not fabricate option-chain data, margin, positions, fills, Greeks, OI, or order status. It must not claim an order was placed or managed unless a broker tool confirms it.
:::

## What's next

- **Compare with other personas** → [Personas & Modes](/guides/personas)
- **Set up TradingView browser context** → [Browser Setup](../getting-started/browser-setup)
- **Use Streak automation instead** → [Trader](/guides/trader)
