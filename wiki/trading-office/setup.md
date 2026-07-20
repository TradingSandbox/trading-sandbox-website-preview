---
title: Set up your Trading Office
description: Create a trading book, build the team, choose an operating mode, and review mandates and scheduled workflows.
outline: 2
---

# Set up your Trading Office

A ready office has a trading book, at least one active employee, and a clear decision about whether scheduled employee workflows may run. Start in Guided mode; choose Autonomous · Paper trading only after the mandates and workflows match your intent.

## 1. Enter Trading Office

Launch `tradecli` and choose **Hedge Fund**, the current interface name for Trading Office. The lead surface is currently labeled the **CEO pane**. It opens the book picker and coordinates setup, employees, and Office controls.

Use `/persona` when you need to leave another workflow and choose Hedge Fund. Once the lead pane is open, continue with the book picker below.

## 2. Create or select a trading book

Open the book picker:

```text
/hedgefund:books
```

A trading book is the boundary for paper cash, positions, transactions, NAV, P&L, employees, research, and workflows. The current interface labels it a **fund book**. Each book also carries its market context: India or the US.

You can create more than one book, but one is active in a Trading Office session. Check the book name and opening cash before starting work; research and paper actions should always land in the intended book.

## 3. Build your AI team

Before beginning research or paper trading, add at least one active AI employee to the selected trading book. Open the guided team setup:

```text
/hedgefund:onboard
```

The setup confirms that the trading book exists and has at least one active non-CEO employee.

The available roles support separation of responsibility:

| Role | Primary responsibility |
| --- | --- |
| **Chief Investment Officer** | Investment direction and synthesis |
| **Portfolio Manager** | Book construction and portfolio context |
| **Trader** | Candidate selection, trade planning, and paper execution |
| **Risk Manager** | Limits, challenge, escalation, and review |
| **Operations** | Reconciliation, records, and operating checks |

A personal Trading Office does not need all five roles. The onboarding check requires one active non-CEO employee, so a solo trader can begin with one Trader employee and add research, risk, portfolio, or operations roles when those responsibilities are useful. Administration also supports custom employees and roles.

## 4. Choose the session mode

When you enter a book, choose how this session should operate:

- **Guided** — you initiate or delegate the work; scheduled employee workflows remain deferred.
- **Autonomous · Paper trading** — scheduled employee workflows may research, trade, and report on paper without a fresh instruction, subject to their mandates.

Both modes keep the paper trade pipeline available. Neither mode grants authority to place live broker orders.

Autonomous · Paper trading applies to scheduled employee workflows. It does not turn approval of a Strategy Lab deployment into an automatic strategy-version execution runtime. The current Strategy Library paper-trade path still creates a reviewable ticket for confirmation.

::: tip Recommended first setup
Use Guided mode for [Your First Strategy](/trading-office/quickstart). It makes every decision and approval point easy to see before you allow standing workflows to run.
:::

## 5. Review mandates before autonomy

A mandate describes what an employee may do, not only what it has been asked to do. Depending on the role, it can constrain:

- whether the employee may enter a paper trade;
- allowed instruments and symbols;
- maximum notional per trade and open-position limits;
- daily-loss limits and required stops;
- market-session rules;
- escalation behavior and kill-switch state.

Open the Control Center and choose **Manage mandates**:

```text
/hedgefund:control
```

Book or account controls can tighten a mandate. They should not be treated as permission to loosen an explicit denial.

## 6. Review scheduled workflows

An employee workflow is a standing Office routine with an owner, cadence, symbols or scope, and persisted runs. In Autonomous · Paper trading, due workflows can run without a fresh prompt. In Guided mode, employee mandate ticks stay deferred.

From the Control Center, choose **Manage workflows** to inspect cadence, symbols, run state, pause, and restart controls. Choose **Inspect activity** to see due, running, waiting, and failed runs.

Employee workflows are one of several ways Trading Office continues work over time. [Automation Tools](/trading-office/watches) compares them with watches, backtest jobs, and position monitoring.

## 7. Verify the office in Control Center

```text
/hedgefund:control
```

The Control Center summarizes the active book, session mode, team coverage, mandates, configured workflows, run state, and unread escalations. Its actions let you:

- complete the recommended setup;
- manage the team;
- manage mandates;
- manage workflows;
- inspect recent activity;
- pause all scheduled workflows for the current trading book.

Use the global pause when the workflow configuration, data, or market context needs review. It invalidates pending and waiting scheduled runs for that book; it is not a substitute for closing open paper positions.

## Before enabling Autonomous · Paper trading

Confirm that you can answer each question:

- Which symbols and instruments may each trading employee use?
- What is the largest acceptable paper notional and risk per trade?
- Is a stop required?
- What daily-loss or position limit should stop new entries?
- How often should each workflow run?
- Which events require escalation instead of action?
- Do you know how to use `/hedgefund:control` to pause Office workflows and `/crons` to remove scheduled watches?

If any answer is unclear, stay in Guided mode and tighten the setup first.

## Related pages

- [Connect TradingView](/getting-started/tradingview-setup)
- [Your first strategy](/trading-office/quickstart)
- [Automation tools](/trading-office/watches)
- [Run your trading office](/trading-office/operations)
- [Concepts and terminology](/trading-office/concepts)
- [Commands and shortcuts](/trading-office/commands)
