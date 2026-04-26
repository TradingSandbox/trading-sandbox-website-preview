---
title: Trader
description: Active, short-horizon persona built around Streak workflows for Indian equities and options.
outline: 2
---

# Trader

Active, short-horizon work on Indian equities and options. Today, Trader is built around **[Streak](https://streak.tech/)** workflows — find, build, backtest, deploy, monitor.

## What it's for

- Equity strategy pipelines (discover → build → backtest → deploy → monitor)
- Options strategies (build → deploy → monitor)
- Read-only options context (OI, PCR, IV, technicals) before building
- Technical setup evaluation and strategy refinement for Indian markets
- Risk-aware trade planning with explicit assumptions and tradeoffs

Trader is for Streak-first strategy workflows. If you want live chart-native MCP analysis through TradingView, use [Pro Trader](/guides/pro-trader).

## Primary tools

- Browser for Streak workflow execution
- Broker MCP tools for account, portfolio, and order context when needed
- News for market-moving developments

Trader prefers structured workflow tools over open-ended browsing. It uses the browser mainly when a Streak step requires it.

## Core workflows

| Workflow | Use it for |
|---|---|
| Equity strategy build | Full equity pipeline: find, build, backtest, deploy, monitor |
| Options strategy build | Options pipeline: find, build, deploy, monitor |
| Options context read | Read-only OI, PCR, IV, and technical context before building |

Find and evaluate steps are optional. If you already know what you want, Trader can go straight to build, deploy, or monitor.

## Typical prompts

```
Build a NIFTY options strategy for a bullish intraday view
/equities       (start the equity strategy pipeline)
/options        (start the options strategy pipeline)
Read the current options context for BANKNIFTY
Monitor my deployed strategies
Backtest this equity strategy before deployment
Check news that could affect this intraday setup
```

## Broker behavior

- If you mention Groww, Trader prefers Groww tools.
- If you mention Zerodha or Kite, Trader prefers Kite tools.
- If the broker matters and you do not specify one, Trader asks a short clarification before taking action.

Indian cash market hours are 9:15 AM to 3:30 PM IST. Trader should make stale, pre-market, or after-hours context clear when it matters.

::: info Scope note
Trader today is Streak-focused. Direct broker-level order placement for arbitrary strategies is evolving — for now, Streak handles the execution layer.
:::

::: danger Safety
Trader must not fabricate live prices, positions, orders, balances, or broker confirmations. It should not claim a strategy was deployed unless a tool confirms the current state and you explicitly authorized the guarded step.
:::

## What's next

- **Compare with other personas** → [Personas & Modes](/guides/personas)
- **Browser setup for Streak automation** → [Browser Setup](../getting-started/browser-setup)
- **Chart-native trading workflow** → [Pro Trader](/guides/pro-trader)
