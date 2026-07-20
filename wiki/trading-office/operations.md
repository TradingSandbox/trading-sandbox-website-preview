---
title: Run your trading office
description: Run day-to-day Trading Office work through the Control Center and add fund-team administration when you need it.
outline: 2
---

# Run your trading office

Trading Office is organized around one selected trading book. The office lead coordinates employees and standing work, while the local Trading Office record preserves the book, mandates, workflow runs, research, and paper transactions. The current interface labels the office lead surface the **CEO pane**.

The everyday controls apply whether you are a solo trader, an emerging manager, or part of a fund team. Additional LP and capital-record features appear later on this page. For the strategy lifecycle, begin with [Your First Strategy](/trading-office/quickstart).

## Everyday Trading Office operations

### Start in the Control Center

Open the selected book's Control Center from the office lead—the current **CEO pane**:

```text
/hedgefund:control
```

It brings the operating state of the book into one view:

- the selected book and session mode;
- active employees and recommended-role coverage;
- active mandates and configured workflows;
- due, running, waiting, and failed workflow runs;
- unread escalations; and
- recent activity.

From here you can complete the recommended setup, manage the team, edit mandates, manage workflows, inspect activity, or pause scheduled employee workflows for the book.

#### Pause scheduled work safely

**Pause all scheduled workflows** invalidates pending and waiting employee runs. It does not close paper positions, remove watches, or stop the deterministic position monitor. A run that is already executing is not cancelled and may create its next scheduled run when it finishes; inspect the workflow again after the current run completes.

Use [Cron Monitor](/trading-office/watches#inspect-watches-in-cron-monitor) for scheduled watches and [Market Terminal](/trading-office/paper-operations#monitor-in-market-terminal) for open paper positions.

#### Use Autonomous · Paper trading for standing work

In Autonomous · Paper trading, due employee workflows can research, report, and prepare or book mandate-constrained Office paper trades. Review the selected mode, mandates, workflow cadence, and escalation rules together before allowing standing work to continue.

### Direct the office from the lead pane

The lead pane is the coordination desk. Ask it in ordinary language to delegate a bounded task to an **Investor** or **Trader**, optionally naming the employee.

```text
Ask the Investor to challenge the assumptions behind the gap-fill idea and report the strongest falsification case.
```

```text
Ask the Trader to scan the approved universe, prepare one paper setup within the stored mandate, and report any blocked risk checks.
```

The task is delivered through the office mailbox to the employee pane. The employee works with its own identity and book scope, then sends a result or status report back to the CEO. Active employee panes are started automatically when the CEO enters the office.

A useful delegation states:

1. the decision or output needed;
2. the universe, evidence, or book context to use;
3. constraints that must not be relaxed; and
4. what should be escalated instead of acted on.

Mailbox reports are coordination artifacts, not a substitute for durable state. Confirm positions and fills in Market Terminal, workflow state in Control Center, and strategy evidence in the Strategy Library.

### Choose and administer trading books

Use the CEO book picker to choose or create the active book:

```text
/hedgefund:books
```

Each book carries its own market context, paper cash, employees, clients, positions, records, mandates, and workflows. India books use INR and the India market context; US books use USD and the US market context. Switching books changes the scope of the office panes that are launched.

Use the setup cards for launch readiness:

```text
/hedgefund:onboard
```

Use deterministic administration to edit the selected book, manage employees, review mandates and workflows, or manage investor records:

```text
/hedgefund:admin
```

You can also ask the active Trading Office employee to show book facts such as:

- paper cash, units outstanding, and NAV per unit;
- realized P&L by instrument and in total;
- the account ledger;
- derived equity, option, and futures positions; and
- fund-client or LP rows.

For current marks and unrealized P&L, use `/terminal` or ask for the live market-terminal view. When a quote is unavailable, the position should remain visible with a quote error rather than an invented mark.

### Use the advanced read-only dashboard

The local Trading Office service serves an advanced browser view at [http://127.0.0.1:8787/ui/](http://127.0.0.1:8787/ui/) when the service is running.

Its current **Hedge Fund** area provides read-only views for:

- the audit summary and service health;
- the trading book, cash, units, NAV, realized P&L, and ledger;
- positions and equity, option, and futures transactions;
- records, clients, and employees; and
- mandates, workflow exceptions, blocked risk decisions, unread mailbox items, and kill-switch state.

The dashboard does not mutate Office state. Use tradecli administration for books, employees, and LP creation; Control Center for mandates and workflows; and the Strategy Library for versions, deployments, journals, and reviews.

### A practical operating rhythm

At the start of a session:

1. Confirm the selected book and mode in Control Center.
2. Read escalations, failed runs, and mandate coverage.
3. Check Market Terminal for open paper risk.

During the session, delegate bounded research, use watches for repeated observations, and keep standing employee work inside explicit mandates. Before leaving, inspect recent activity, pause work that should not continue, and preserve strategy decisions through the journal and review flow.

## Additional operations for fund teams

These features extend the same Trading Office model for managers who track outside capital or report across a team.

### Add investors and LPs

Open `/hedgefund:admin`, choose **Manage investors / LPs**, then **Add investor / LP**. The current form records:

- a name;
- capital contributed;
- optional units; and
- an optional high-water mark.

The record becomes part of fund summaries and the read-only Office dashboard alongside units, NAV, high-water marks, P&L, and ledger state.

## Related pages

- [Set up your office](/trading-office/setup)
- [Automation tools](/trading-office/watches)
- [Paper trade and monitor](/trading-office/paper-operations)
- [Review and improve](/trading-office/review)
- [Concepts and terminology](/trading-office/concepts)
- [Commands and shortcuts](/trading-office/commands)
