---
title: Operate the fund
description: Run the Hedge Fund office through its Control Center, CEO desk, fund-book reporting, and LP records.
outline: 2
---

# Operate the fund

The Hedge Fund office is organized around one selected paper fund book. The CEO coordinates people and standing work, while AI Trading Office keeps the durable record of the book, employees, mandates, workflow runs, research, and paper transactions.

This page covers day-to-day fund operations. For the strategy lifecycle, begin with the [idea-to-review quickstart](/hedge-fund/quickstart).

## Start in the Control Center

Open the selected book's Control Center from the CEO pane:

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

### Pause scheduled work safely

**Pause all scheduled workflows** invalidates pending and waiting employee runs. It does not close paper positions, remove watches, or stop the deterministic position monitor. A run that is already executing is not cancelled and may create its next scheduled run when it finishes; inspect the workflow again after the current run completes.

Use [Cron Monitor](/hedge-fund/watches#inspect-watches-in-cron-monitor) for scheduled watches and [Market Terminal](/hedge-fund/paper-operations#monitor-in-market-terminal) for open paper positions.

### Autonomous Paper is a preview runtime

The current-session Autonomous · Paper trading runtime exists. When a Hedge Fund session is actually operating in that mode, due employee workflows can research and report, and a Trader workflow can book mandate-constrained Office paper trades.

::: warning Current persistence gap
The current AI Trading Office service does not persist the fund book's `operating_mode` field. Selecting Autonomous · Paper trading in book setup or administration can therefore fall back to Guided after the response or after re-entering the office. Verify the mode shown in Control Center and do not rely on unattended continuation until this preview gap is fixed.
:::

This runtime is also separate from the **TBD exact-version strategy runner**. Approving a promoted strategy does not start a schedule that evaluates that frozen version.

## Direct the office from the CEO pane

The CEO pane is the coordination desk. Ask it in ordinary language to delegate a bounded task to an **Investor** or **Trader**, optionally naming the employee.

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

## Choose and administer fund books

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

You can also ask the active Hedge Fund employee to show book facts such as:

- paper cash, units outstanding, and NAV per unit;
- realized P&L by instrument and in total;
- the account ledger;
- derived equity, option, and futures positions; and
- fund-client or LP rows.

For current marks and unrealized P&L, use `/terminal` or ask for the live market-terminal view. When a quote is unavailable, the position should remain visible with a quote error rather than an invented mark.

## Add investors and LPs

Open `/hedgefund:admin`, choose **Manage investors / LPs**, then **Add investor / LP**. The current form records:

- a name;
- capital contributed;
- optional units; and
- an optional high-water mark.

This creates the LP record used by fund summaries and the read-only dashboard. It is not a complete subscription or cash-transfer workflow. The current terminal administration flow cannot edit or delete standalone fund-client rows after creation.

### Capital operations are not public Hedge Fund actions

The following Office service operations are internal and are deliberately excluded from the Hedge Fund user workflow:

- recording later subscriptions, contributions, or redemptions;
- reconciling the fund book;
- striking NAV as a standalone action; and
- writing transactions directly through fund-book APIs.

Use the public paper pipeline for trades—Scanner or a strategy plan, a reviewed ticket, and Market Terminal—and use fund summaries for LP and NAV reporting. The presence of an internal API route does not make it a supported user action.

## Use the read-only Office dashboard

AI Trading Office also serves an advanced browser view at [http://127.0.0.1:8787/ui/](http://127.0.0.1:8787/ui/) when the local Office service is running.

Its Hedge Fund area provides read-only views for:

- the audit summary and service health;
- the fund book, cash, units, NAV, realized P&L, and ledger;
- positions and equity, option, and futures transactions;
- records, clients, and employees; and
- mandates, workflow exceptions, blocked risk decisions, unread mailbox items, and kill-switch state.

The dashboard does not mutate Office state. Use tradecli administration for books, employees, and LP creation; Control Center for mandates and workflows; and the Strategy Library for versions, deployments, journals, and reviews.

## A practical operating rhythm

At the start of a session:

1. Confirm the selected book and mode in Control Center.
2. Read escalations, failed runs, and mandate coverage.
3. Check Market Terminal for open paper risk.

During the session, delegate bounded research, use watches for repeated observations, and keep standing employee work inside explicit mandates. Before leaving, inspect recent activity, pause work that should not continue, and preserve strategy decisions through the journal and review flow.

## Related pages

- [Set up your office](/hedge-fund/setup)
- [Watches and background work](/hedge-fund/watches)
- [Run paper strategies](/hedge-fund/paper-operations)
- [Review and improve](/hedge-fund/review)
- [Status and reference](/hedge-fund/reference)
