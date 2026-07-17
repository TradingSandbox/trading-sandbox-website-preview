---
title: Automation tools
description: Choose and manage watches, employee workflows, backtest jobs, workflow heartbeat, and paper-position monitoring.
outline: 2
---

# Automation tools

Trading Office can continue observing, researching, testing, and managing paper positions after the initial instruction. The right automation tool depends on whether the work requires AI interpretation, a standing employee responsibility, experiment continuation, or a recorded position rule.

## Choose the right tool

| If you want to… | Use… |
| --- | --- |
| Re-check a chart, thesis, news condition, or exposure and report what changed | **Watch** |
| Give an employee a recurring responsibility with scope and risk limits | **Office workflow** |
| Run an approved experiment in durable, resumable chunks | **Backtest job** |
| Pick up due Office work and unfinished experiment chunks | **Workflow heartbeat** |
| Apply recorded stops, targets, and time exits to a paper position | **Position monitor** |

A conventional market watchlist only groups symbols for browsing. A Trading Office watch schedules an AI employee to gather fresh context, interpret it, and report meaningful changes.

## Watches

A watch is useful when one answer is not enough. You might follow a price level, thesis, portfolio condition, filing, or research question over time.

### Start a watch in natural language

Tell the active employee what to watch, how often to check, and which changes matter:

```text
Watch RELIANCE every 5 minutes. Report only if it closes above 3,100
with stronger volume, or if the setup is invalidated below 3,050.
```

```text
Watch our technology exposure every hour and tell me if it rises above 30%.
```

```text
Watch this earnings thesis once a day. Compare new filings and news with
the current thesis, and save a research record only when something material changes.
```

A useful watch instruction defines:

- the symbol, book, thesis, exposure, or source to check;
- the interval between checks;
- the current baseline;
- the changes worth reporting; and
- whether a material result should become a durable Office record.

The response includes a **cron job ID**. Keep it as the reliable identifier for inspecting, stopping, or deleting the watch.

### What happens on each check

At each tick, the employee reloads the instruction, gathers fresh context through the appropriate market, browser, broker, or TradingView tools, compares it with the baseline, and reports the useful difference.

A watch polls rather than streams. Its minimum interval is **one minute**. Each watch runs **10 times by default** and then pauses itself; request a different run cap when you create it if the job should continue longer.

The schedule and prompt persist locally. Decision-relevant results can also be preserved as research records when the instruction asks for it.

### List, stop, and delete watches

Use natural language with the cron job ID:

```text
List my watches.
```

```text
Stop watch <cron-job-id>.
```

```text
Delete watch <cron-job-id>.
```

- **List** shows ownership, state, interval, next and previous run, last status, and run count.
- **Stop** pauses the watch while keeping its stored job.
- **Delete** permanently removes the scheduled job.

The employee who creates a watch owns it, and its ticks return to that employee's pane. The office lead can inspect and remove watches across the office through Cron Monitor.

### Inspect watches in Cron Monitor

Run:

```text
/crons
```

The **WATCHES** table shows each job's owner, schedule, next run, previous run, and state:

- **ARMED** — enabled and waiting for the next check;
- **PAUSED** — disabled manually or after reaching its run cap;
- **ERROR** — the previous check failed.

Use `↑` and `↓` to select a row, `R` to refresh, and `K` or `X` to remove the selected watch after confirmation. Removing deletes the job; use **Stop watch** in conversation when you want to keep it.

## Office workflows

An Office workflow is a standing responsibility owned by an employee. It has a cadence, scope, mandate, and persisted run history. Examples include a Trader scanning an approved universe, a Risk Manager reviewing exposure, or an Investor updating a research brief.

Create, inspect, pause, and restart workflows from the Control Center:

```text
/hedgefund:control
```

Guided operation keeps scheduled employee ticks paused. Autonomous · Paper trading allows due workflows to run within their mandates and report their results.

## Backtest jobs and workflow heartbeat

A backtest job executes the experiment approved in Strategy Lab. It stores each completed chunk, so a long test can resume without losing finished work.

The workflow heartbeat is the background transport that discovers due Office work and unfinished experiment chunks. You do not create it as a watch. Inspect experiments through **Backtest Lab → Jobs** and employee workflows through the Control Center.

## Position monitor

The position monitor works from the exit plan recorded on an Office paper position. It checks stops, targets, planned time exits, and applicable intraday cutoffs using current market data.

Use Market Terminal to inspect the position or make a manual partial or full exit:

```text
/terminal
```

## Related pages

- [Set up your office](/trading-office/setup)
- [Test in Strategy Lab](/trading-office/strategy-lab)
- [Paper trade and monitor](/trading-office/paper-operations)
- [Run your trading office](/trading-office/operations)
- [Concepts and terminology](/trading-office/concepts)
- [Commands and shortcuts](/trading-office/commands)
