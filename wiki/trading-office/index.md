---
title: Trading Office
description: Use tradecli to turn trading ideas into tested, reviewed, and monitored paper strategies with investment-team discipline.
outline: 2
---

# Trading Office

Trading Office is the main operating experience inside `tradecli`, a local-first, AI-native trading workspace. It gives a serious self-directed trader a team of AI employees working around one shared trading book. You can research ideas, test strategies, delegate recurring work, monitor paper positions, and keep the evidence and decisions behind each strategy connected.

The goal is not unattended live trading. The current product is an operating environment for supervised research and autonomous paper work.

::: info Current interface names
The current preview interface still calls this workspace **Hedge Fund** and calls a trading book a **fund book**. This guide uses the broader product language, while commands such as `/hedgefund:books` remain exactly as they appear in the product.
:::

::: info Preview documentation
This guide describes the current backtesting branch. Exact-version autonomous strategy execution is marked **TBD** wherever it would otherwise be easy to overstate the product.
:::

## The product model

Trading Office brings five things into one working surface:

| Part | What it gives you |
| --- | --- |
| **Trading book** | The paper cash, positions, transactions, NAV, and P&L for one market |
| **Team** | A CEO pane plus employees for investment, portfolio, trading, risk, and operations work |
| **Mandates** | Permissions, limits, schedules, and escalation rules for each employee |
| **Working tools** | Ideas, Strategy Lab, Scanner, Market Terminal, watches, and office controls |
| **AI Trading Office** | The durable record of people, research, workflows, strategy versions, approvals, paper trades, journals, and reviews |

The AI helps shape intent and interpret evidence. Prices, experiment progress, verdicts, approvals, transactions, and lifecycle state come from the system that owns them.

## One workflow, three scales

Trading Office is not a separate product for each type of trader. The same evidence loop supports different levels of operation:

| User | How the office helps |
| --- | --- |
| **Self-directed trader** | Run a personal trading operation with repeatable research, paper risk controls, monitoring, and review |
| **Emerging manager** | Coordinate multiple strategies and AI specialists while keeping decisions and evidence attached to one book |
| **Fund team** | Add team administration, investor records, reporting, and stronger operating controls around the same strategy lifecycle |

The current experience is strongest for the serious self-directed trader and emerging manager. Established funds would also require institutional execution, reconciliation, permissions, compliance, data governance, and reliability controls that are not claimed here.

## How to describe tradecli

- **Product:** `tradecli`
- **Current category:** a local-first, AI-native trading workspace
- **Main experience:** Trading Office
- **Interaction metaphor:** Cursor for trading—the work is conversational, iterative, and grounded in durable artifacts
- **Long-term direction:** an AI trading operating system

“AI trading operating system” describes the direction of travel. The current documentation claims the research and paper-operation workflows that exist today, not a complete institutional control plane.

## Two ways to run the office

### Guided

You direct the office interactively. Scheduled employee mandate workflows stay off, while deterministic work such as unfinished backtest chunks and paper-position exit monitoring can continue in the background.

This is the recommended mode for your first journey.

### Autonomous · Paper trading

Scheduled employees can research, make mandate-constrained decisions, book Office paper trades, monitor them, and report without waiting for a new prompt. This mode is paper-only and does not grant live broker authority.

::: warning Current preview gap
The mode selector controls the current tradecli session, but the selected `operating_mode` is not yet persisted by the current AI Trading Office book API. Re-select and verify Autonomous · Paper trading when starting a new session; do not assume a previous selection was restored.
:::

It is important to separate two kinds of autonomy:

- **Available:** general scheduled employee workflows operating inside stored mandates.
- **TBD:** a runner that evaluates and executes the exact frozen strategy version that passed Strategy Lab.

## Your first journey

The recommended first journey is one complete learning loop:

**Idea → research → test → judge → promote → paper trade → monitor → review → improve**

Behind the shorter journey, Strategy Lab preserves its exact **BUILD → PLAN → RUN → JUDGE → PROMOTE** contract. You begin with one observation, turn it into a fixed experiment, accept one machine verdict, freeze a promising result as a strategy version, operate it on paper, and decide whether to keep, pause, retire, or improve it.

[Start the idea-to-review quickstart →](/trading-office/quickstart)

## Background work, without the ambiguity

Several features can continue work over time. They serve different purposes:

| Feature | Use it for |
| --- | --- |
| **Watch** | Repeat an observation or research instruction, such as checking a chart or thesis every 15 minutes |
| **Office workflow** | Give an employee a standing role-specific routine under a mandate |
| **Workflow heartbeat** | Resume due workflows and unfinished experiment chunks |
| **Position monitor** | Evaluate recorded paper stops, targets, and time exits deterministically |
| **Backtest job** | Execute and persist the approved experiment in bounded chunks |

A watch is not a stop-loss, and a scheduled employee workflow is not the exact-version strategy runner. The [Watches and schedules](/trading-office/watches) guide explains when to use each one.

## What you can do today

- Run multiple India or US trading books and choose the active book when entering the office.
- Build a recommended team or create custom employees.
- Delegate through the CEO and receive employee reports and escalations.
- Define mandates, limits, workflow cadence, and kill switches.
- Capture ideas and run the complete Strategy Lab evidence path.
- Promote promising experiments into frozen strategy versions and approve paper use.
- Find candidates with Scanner and book risk-sized Office paper trades.
- Inspect and exit positions through Market Terminal.
- Schedule watches and inspect their status in Cron Monitor.
- Journal, forward-check, review, and improve a strategy without rewriting its history.

## Current boundary

An approved paper deployment does not yet start a scheduled runner for its exact strategy version. The Strategy Library can create a human-confirmed, version-tagged paper ticket, while Autonomous · Paper trading can run general employee workflows. Connecting the frozen version directly to scheduled entry generation remains **TBD**.

Live Trading Office broker execution is also outside the current product boundary.

## Continue through the guide

- [Quickstart: idea to review](/trading-office/quickstart)
- [Set up your office](/trading-office/setup)
- [Research and ideas](/trading-office/ideas)
- [Test in Strategy Lab](/trading-office/strategy-lab)
- [Run paper strategies](/trading-office/paper-operations)
- [Watches and schedules](/trading-office/watches)
- [Review and improve](/trading-office/review)
- [Run your trading office](/trading-office/operations)
- [Status and reference](/trading-office/reference)

::: danger Not financial advice
Trading Office is an analytical and paper-trading environment. Verify AI output, market data, risk, and strategy assumptions independently before making decisions with real capital.
:::
