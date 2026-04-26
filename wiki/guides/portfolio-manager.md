---
title: Portfolio Manager
description: Portfolio-level decisions across multiple brokers — weights, concentration, correlation, rebalancing, tax harvesting.
outline: 2
---

# Portfolio Manager

The meta-persona: portfolio-level decisions across **multiple brokers at once**. Portfolio Manager thinks in weights, sectors, cash, concentration, drawdown, and correlation before it thinks about any single ticker.

## What it's for

- Snapshots across Groww + Kite in one view
- Allocation review and rebalancing plans
- Position review with decision categories (keep / trim / add / exit / watch)
- Tax harvesting, earnings checks, results calendar prep, IPO tracking
- New-buy checklists that include portfolio-fit checks
- Mutual fund review, sector analysis, market overview, and dip checks

## Primary tools

- Broker MCPs (Groww, Kite) for live holdings, positions, margins
- XLSX import for portfolios held elsewhere
- Browser for broker UI actions a skill walks through

Portfolio Manager starts from the portfolio question, not the ticker question. If context is missing, it asks for the minimum useful details: holdings, weights, cash, horizon, and constraints.

## Core workflows

| Workflow | Use it for |
|---|---|
| Snapshot | Unified view of holdings, positions, cash, P&L, weights, and broker attribution |
| Allocation Review | Concentration, cash deployment, broker split, and portfolio drift |
| Rebalancing Plan | Trim/add/watch plan based on current allocation and target constraints |
| Position Review | Existing holding review across brokers with keep/trim/add/exit/watch framing |
| New Buy Checklist | Test whether a new stock fits the portfolio before starting a position |
| Tax Harvesting | Cross-broker tax-loss and gain review using broker reports |
| Earnings Check | Latest visible earnings summary for a specific stock |
| Results Calendar Prep | Watchlist of portfolio holdings that matter most into earnings season |
| Mutual Fund Review | Cross-broker MF holdings, SIPs, overlap, allocation, and concentration |
| IPO Tracker | Upcoming, open, and recently closed IPOs through connected brokers |
| Market Overview | Daily market pulse, index levels, movers, volume shockers, and trending names |
| Sector Analysis | Sector heatmap, top/bottom sectors, and top stocks by sector |
| Dip Check | Decide whether a stock fall is noise, caution, or an add/watch opportunity |
| Stock Analysis | Broker-backed stock analysis when a single-name view is needed |

## Setup

Before first use, pick which brokers you want unified with `Ctrl+Shift+K` or `/brokers`. Portfolio Manager only shows actions for selected brokers.

If both Groww and Kite are configured, Portfolio Manager can merge broker views into one portfolio picture. If one broker fails or is not logged in, it should continue with the available broker and clearly mark the result as partial.

## Typical prompts

```
Show my portfolio
Allocation review — am I overweight anywhere?
Rebalance plan for my target 60% equity / 30% debt / 10% cash
Tax harvesting ideas for FY26
New buy checklist for BAJFINANCE
Which of my holdings have results next week?
Review my mutual funds across brokers
Is this dip in HDFCBANK a chance to add or a thesis break?
Show market overview and sector leaders today
```

::: danger Read-only by default
Portfolio Manager surfaces decisions but does not execute orders automatically. It must not fabricate holdings, allocation weights, prices, cash balances, or broker confirmations. Any action that moves money requires explicit user authorization at the broker, and claims of "deployed", "placed", or "rebalanced" only appear when a tool confirms execution.
:::

## What's next

- **Compare with other personas** → [Personas & Modes](/guides/personas)
- **Connect brokers** → [Broker Setup](../getting-started/broker-setup) — Groww and Zerodha Kite OAuth flows
