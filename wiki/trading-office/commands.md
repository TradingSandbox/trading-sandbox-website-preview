---
title: Commands and shortcuts
description: Find Trading Office commands, navigation paths, keyboard shortcuts, and monitor controls.
outline: 2
---

# Commands and shortcuts

Use this page when you know what you want to do and need the exact interface path.

::: info Current interface names
The preview interface labels Trading Office as **Hedge Fund**, labels a trading book as a **fund book**, labels the office lead as the **CEO pane**, and retains the `/hedgefund:*` command namespace.
:::

## Commands

Run these from the `tradecli` editor.

| Command | What it opens or does |
| --- | --- |
| `/hedgefund:books` | Choose or add a trading book, then launch its active team; office lead/CEO pane only |
| `/hedgefund:onboard` | Open launch-readiness cards; office lead/CEO pane only |
| `/hedgefund:control` | Open the selected book's Control Center; office lead/CEO pane only |
| `/hedgefund:admin` | Configure the selected book, team, mandates, workflows, and LP records |
| `/ideas` | Open the Idea Backlog |
| `/backtest` | Open the current Backtest Lab menu for the Strategy Lab workflow: new experiment, jobs, approvals, strategies, and help |
| `/strategies` | Open the Strategy Library for snapshots, journals, reviews, forward checks, restoration, and paper tickets |
| `/terminal` | Open Market Terminal for the active Office paper scope |
| `/trade` | Open the entry ticket for the current pending strategy plan |
| `/exit [symbol]` | Open Market Terminal with the matching position's exit ticket; omit the symbol to choose manually |
| `/crons` | Open Cron Monitor for scheduled watches |
| `/prefs` | Open preferences |
| `/persona` | Leave the current persona home and choose another persona |
| `/shortcuts` | Toggle the shortcut sheet below the editor |

Scanner opens with `Ctrl+Shift+N`.

## Global shortcuts

| Shortcut | Action |
| --- | --- |
| `Ctrl+\` | Abort the current operation, if any, and return home |
| `Esc` | Go back or close the current overlay |
| `Ctrl+Shift+S` | Open preferences |
| `Ctrl+Shift+M` | Open Market Terminal |
| `Ctrl+Shift+N` | Open Scanner |
| `?` | Toggle the shortcut sheet when the editor is empty |

## Market Terminal

| Key | Action |
| --- | --- |
| `1`–`5` | Change instrument filter; the broker filter appears where supported |
| `↑` / `↓` | Select a position |
| `T` | Open an entry ticket from the pending strategy plan |
| `X` | Open an exit ticket for the selected Office position |
| `R` | Refresh live marks |
| `Esc` | Close the terminal |

The exit ticket starts with the full open quantity at the current mark. Adjust the quantity when you want a partial exit.

## Cron Monitor

| Key | Action |
| --- | --- |
| `↑` / `↓` | Select a scheduled watch |
| `R` | Refresh status |
| `K` or `X` | Request permanent removal of the selected watch |
| `Y` / `N` | Confirm or cancel removal |
| `Esc` or `Q` | Close the monitor |

Removing a watch deletes the job. Use **Stop watch** in conversation when you want to retain it in a paused state.

## Find the right surface

| Task | Surface |
| --- | --- |
| Capture or reopen a hypothesis | Idea Backlog |
| Create, inspect, or approve an experiment | Backtest Lab |
| Inspect a promoted version or review its journal | Strategy Library |
| Scan for candidates | Scanner |
| Enter, inspect, or exit a paper position | Market Terminal |
| Manage employees, mandates, and workflows | Control Center |
| Inspect scheduled watches | Cron Monitor |

## Related pages

- [Concepts and terminology](/trading-office/concepts)
- [Set up your office](/trading-office/setup)
- [Connect TradingView](/getting-started/tradingview-setup)
- [Automation tools](/trading-office/watches)
