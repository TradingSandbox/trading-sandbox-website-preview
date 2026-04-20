---
title: Portfolio Manager
description: Portfolio-level decisions across multiple brokers — weights, concentration, correlation, rebalancing, tax harvesting.
outline: 2
---

# Portfolio Manager

The meta-persona: portfolio-level decisions across **multiple brokers at once**. Portfolio Manager thinks in weights, sectors, concentration, drawdown, and correlation — not individual tickers.

## What it's for

- Snapshots across Groww + Kite in one view
- Allocation review and rebalancing plans
- Position review with decision categories (keep / trim / add / exit / watch)
- Tax harvesting, earnings calendar prep, IPO tracking
- New-buy checklists that include portfolio-fit checks

## Primary tools

- Broker MCPs (Groww, Kite) for live holdings, positions, margins
- XLSX import for portfolios held elsewhere
- Browser for broker UI actions a skill walks through

## Setup

Before first use, pick which brokers you want unified with `Ctrl+Shift+K` or `/brokers`. Portfolio Manager only shows actions for selected brokers.

## Typical prompts

```
Show my portfolio
Allocation review — am I overweight anywhere?
Rebalance plan for my target 60% equity / 30% debt / 10% cash
Tax harvesting ideas for FY26
New buy checklist for BAJFINANCE
Which of my holdings have results next week?
```

::: danger Read-only by default
Portfolio Manager surfaces decisions but does not execute orders automatically. Any action that moves money requires explicit user authorization at the broker. Claims of "deployed" or "placed" only appear when a tool confirms execution.
:::

## What's next

- **Compare with other personas** → [Personas & Modes](/guides/personas)
- **Connect brokers** → [Broker Setup](../getting-started/broker-setup) — Groww and Zerodha Kite OAuth flows
