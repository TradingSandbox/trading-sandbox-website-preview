---
title: Watches and background work
description: Ask your office to keep checking something, manage scheduled watches, and understand how watches differ from market watchlists, Office workflows, and position monitoring.
outline: 2
---

# Watches and background work

A watch lets you ask an employee to check something repeatedly and report what changed. It is useful when one answer is not enough—for example, when you want to follow a price level, a thesis, a portfolio condition, or fresh research over time.

A scheduled AI watch observes and reports. It is not a conventional market watchlist—a static list of symbols—or a stop-loss, standing employee mandate, or autonomous strategy runner.

## The four background systems

Trading Office has several features that continue work over time. They are deliberately separate:

| System | What it does | When it runs |
| --- | --- | --- |
| **Watch** | Repeats an ad hoc observation or research instruction and reports meaningful changes | Guided or Autonomous · Paper trading |
| **Office workflow** | Gives an employee a persistent, role-specific routine with a cadence, scope, and mandate | Agent-driven ticks run in Autonomous · Paper trading and stay deferred in Guided mode |
| **Workflow heartbeat** | Picks up due Office work and continues unfinished backtest chunks | Runs as background transport in both modes; it is not configured as a watch |
| **Position monitor** | Checks recorded stops, targets, and time exits and applies qualifying Office paper exits deterministically | Runs in office panes in both modes |

Use a **watch** when you want the AI to keep looking and interpreting. A conventional **market watchlist** only groups symbols and does not schedule this AI work. Use an **Office workflow** for a standing job owned by an employee. Record a stop, target, or time exit on the paper trade when you need the **position monitor** to enforce the plan.

An approved Strategy Lab version does not yet become its own scheduled entry runner. That exact-version autonomous execution path remains **TBD**.

## Start a watch in natural language

Tell the active employee what to watch, how often to check, and which changes matter. For example:

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

The employee builds the recurring instruction from:

- the purpose of the watch;
- the entity, symbol, book, or source to check;
- the polling interval;
- the current observation or baseline;
- the conditions that count as meaningful change;
- whether a material result should become an AI Trading Office record.

The response includes a **cron job ID**. Keep that ID: it is the reliable identifier for inspecting, stopping, or deleting the watch.

## What happens on each check

At each tick, the employee reloads the watch instruction, gathers fresh context through the appropriate market, browser, broker, or TradingView tools, compares it with the baseline and conditions, and reports only the useful difference.

A watch is a polling workflow, not a streaming market trigger. Its minimum interval is **one minute**; shorter requests are raised to one minute. Each watch runs **10 times by default** and then disables itself to protect data and model quotas. Ask explicitly when you need a different run cap.

The schedule and its prompt persist locally. A watch does not automatically become a permanent research record: decision-relevant results are written to AI Trading Office only when the instruction requests it or the employee determines that the change should be preserved.

The owning tradecli pane normally runs the scheduler and prints ticks inline with a distinct `● tick` banner. If no owning pane or standalone cron scheduler is running, the schedule remains saved but cannot fire until a scheduler is available.

## List, stop, and delete watches

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

The actions are different:

- **List** is read-only. It shows the owner, whether the watch is enabled, its interval, next and previous run, last status, and run count.
- **Stop** disables the watch but keeps its stored job.
- **Delete** permanently removes the scheduled job.

In a Trading Office, the employee who creates a watch owns it and its ticks return to that employee's pane. Employees can inspect all watches, but cannot stop or delete another employee's watch. The office lead can remove any scheduled watch from Cron Monitor.

## Inspect watches in Cron Monitor

Open the monitor from the current **Hedge Fund** navigation or run:

```text
/crons
```

The **WATCHES** table shows scheduled jobs across the office, including their owner, schedule, next run, previous run, and current state:

- **ARMED** — enabled and waiting for its next check;
- **PAUSED** — disabled, including a watch that reached its run cap;
- **ERROR** — its previous run failed.

Controls inside the monitor:

- `↑` / `↓` — select a row;
- `R` — refresh;
- `K` or `X` — remove the selected watch after confirmation;
- `Y` / `N` — confirm or cancel removal;
- `Esc` or `Q` — close.

::: warning Removing is not pausing
`K` or `X` permanently removes a scheduled watch. Use **Stop watch** in conversation when you want to retain the job instead.
:::

::: info Current preview boundary
Cron Monitor's **WATCHES** table is working. The **LIVE LOOPS** registration is not yet connected on this preview branch, so the monitor may not show the watch scheduler, workflow heartbeat, or position monitor. Do not use Cron Monitor as a way to stop an Office workflow heartbeat or deterministic position monitor.

Manage and pause employee workflows from `/hedgefund:control` instead.
:::

## Choose the right feature

| If you want to… | Use… |
| --- | --- |
| Save a group of symbols without scheduled AI checks | A conventional market watchlist, outside this scheduled-watch feature |
| Re-check a chart, thesis, news condition, or exposure and hear what changed | A watch |
| Give a trader, risk manager, or operations employee a recurring mandate | An Office workflow in `/hedgefund:control` |
| Continue an approved backtest without babysitting every chunk | The workflow heartbeat; tradecli handles this automatically |
| Apply a recorded stop, target, or time exit to an Office paper position | The deterministic position monitor |
| Run entries from the exact strategy version that passed JUDGE | **TBD exact-version autonomous runner** |

## Related pages

- [Trading Office](/trading-office/)
- [Set up your office](/trading-office/setup)
- [Run paper strategies](/trading-office/paper-operations)
- [Run your trading office](/trading-office/operations)
- [Status and reference](/trading-office/reference)
