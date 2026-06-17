---
title: PMS and Portfolio Workflows
description: Portfolio-level decisions across brokers, mandates, weights, concentration, correlation, rebalancing, and tax harvesting.
outline: 2
---

# PMS and Portfolio Workflows

PMS workflows are portfolio-level Office Mode work: mandates, weights, sectors, concentration, drawdown, correlation, and review cadence. The desk uses specialist workers when needed, while AITradingOffice keeps the durable record.

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
- AITradingOffice records for theses, ledgers, reviews, clients, and office state

## Setup

Run `tradecli setup`, launch `tradecli`, then choose a PMS or portfolio workflow from the interactive TUI. Broker login can happen on first use when a workflow needs account data.

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
PMS workflows surface decisions but do not execute orders automatically. Any action that moves money requires explicit user authorization at the broker. Claims of "deployed" or "placed" only appear when a tool confirms execution.
:::

## What's next

- **Compare with other personas** → [Personas & Modes](/guides/personas)
- **Connect brokers** → [Broker Setup](../getting-started/broker-setup) — Groww and Zerodha Kite first-use behavior
