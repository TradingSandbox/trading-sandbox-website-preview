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

## Primary tools

- Browser for Streak automation
- News for market-moving developments

## Typical prompts

```
Build a NIFTY options strategy for a bullish intraday view
/equities       (start the equity strategy pipeline)
/options        (start the options strategy pipeline)
Read the current options context for BANKNIFTY
Monitor my deployed strategies
```

::: info Scope note
Trader today is Streak-focused. Direct broker-level order placement for arbitrary strategies is evolving — for now, Streak handles the execution layer.
:::

## What's next

- **Compare with other personas** → [Personas & Modes](/guides/personas)
- **Browser setup for Streak automation** → [Browser Setup](../getting-started/browser-setup)
