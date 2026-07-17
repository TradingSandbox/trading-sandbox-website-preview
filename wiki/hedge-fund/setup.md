---
title: Set up your Hedge Fund office
description: Create a fund book, build the team, choose an operating mode, and review mandates and scheduled workflows.
outline: 2
---

# Set up your Hedge Fund office

A ready office has a fund book, at least one active employee, and a clear decision about how much scheduled paper work the team may do. Start in Guided mode; enable Autonomous · Paper trading after the mandates and workflows match your intent.

## 1. Create or select a fund book

Open the book picker:

```text
/hedgefund:books
```

A fund book is the boundary for pooled paper cash, positions, transactions, NAV, P&L, employees, and workflows. Each book also carries its market context: India or the US.

You can create more than one book, but one is active in a Hedge Fund session. Check the book name and opening cash before starting work; research and paper actions should always land in the intended book.

## 2. Complete launch readiness

Open the guided setup cards:

```text
/hedgefund:onboard
```

Launch readiness checks two required pieces:

1. A fund book exists.
2. The book has at least one active non-CEO employee.

The recommended team provides clearer separation of responsibility:

| Role | Primary responsibility |
| --- | --- |
| **Chief Investment Officer** | Investment direction and synthesis |
| **Portfolio Manager** | Book construction and portfolio context |
| **Trader** | Candidate selection, trade planning, and paper execution |
| **Risk Manager** | Limits, challenge, escalation, and review |
| **Operations** | Reconciliation, records, and operating checks |

The recommended team is a starting configuration, not a requirement to use all five roles. Administration also supports custom employees and roles.

## 3. Choose the session mode

When you enter a book, choose how this session should operate:

- **Guided** — you initiate or delegate the work; scheduled employee workflows remain deferred.
- **Autonomous · Paper trading** — due employee workflows may research, paper-trade, and report within their mandates.

Both modes keep the paper trade pipeline available. Neither mode grants authority to place live broker orders.

::: warning Current preview gap
The selection applies to the current tradecli session. The current AI Trading Office book API does not yet persist `operating_mode`, so verify or re-select the mode whenever you start a new session.
:::

::: tip Recommended first setup
Use Guided mode for the [idea-to-review quickstart](/hedge-fund/quickstart). It makes every decision and approval point easy to see before you allow standing workflows to run.
:::

## 4. Review mandates before autonomy

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

## 5. Review scheduled workflows

An employee workflow is a standing Office routine with an owner, cadence, symbols or scope, and persisted runs. In Autonomous · Paper trading, due workflows can run without a fresh prompt. In Guided mode, employee mandate ticks stay deferred.

From the Control Center, choose **Manage workflows** to inspect cadence, symbols, run state, pause, and restart controls. Choose **Inspect activity** to see due, running, waiting, and failed runs.

These workflows are different from:

- a [watch](/hedge-fund/watches), which repeats an ad hoc instruction;
- a backtest job, which continues an approved experiment;
- the exact-version autonomous strategy runner, which is **TBD**.

## 6. Verify the office in Control Center

```text
/hedgefund:control
```

The Control Center summarizes the active book, session mode, team coverage, mandates, configured workflows, run state, and unread escalations. Its actions let you:

- complete the recommended setup;
- manage the team;
- manage mandates;
- manage workflows;
- inspect recent activity;
- pause all scheduled workflows for the current fund book.

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

- [Quickstart: idea to review](/hedge-fund/quickstart)
- [Watches and schedules](/hedge-fund/watches)
- [Operate the fund](/hedge-fund/operations)
- [Status and reference](/hedge-fund/reference)
