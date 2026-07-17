---
title: Hedge Fund status and reference
description: Verified Hedge Fund commands, shortcuts, terminology, availability, safety rules, and current preview gaps.
outline: 2
---

# Hedge Fund status and reference

This page is the compact reference for the current backtesting preview. **Available** means the user-facing path exists now. **Preview gap** means the runtime exists but part of its product path is not yet reliable. **TBD** means the product does not yet provide the capability.

## Availability matrix

| Capability | Status | Current boundary |
| --- | --- | --- |
| Multiple India or US fund books | **Available** | One book is active in a Hedge Fund session |
| Team setup and employee administration | **Available** | Launch readiness requires a book and one active non-CEO employee |
| CEO delegation and mailbox reports | **Available** | Interactive delegation routes to an Investor or Trader |
| Ideas, durable experiments, machine verdicts, promotion, and review | **Available** | Promotion requires a promising verdict |
| Scanner, deterministic strategy sizing, and Office paper tickets | **Available** | No live broker order is placed |
| Manual version-tagged trade from an approved deployment | **Available** | Current Library action creates a user-confirmed buy-side equity ticket; it does not evaluate the Pine entry signal |
| Watches | **Available** | Minimum one-minute interval; ten runs by default unless another cap is chosen |
| Guided employee work | **Available** | Scheduled mandate ticks stay deferred |
| Autonomous employee paper workflows | **Preview gap** | Runtime exists for the current session, but book `operating_mode` is not persisted by the current Office service |
| Exact promoted-version scheduled runner | **TBD** | Approval does not schedule entries from the frozen rules |
| Deterministic stop, target, and time-exit monitoring | **Available** | It operates on recorded Office paper plans, not broker positions |
| Cron Monitor watch table | **Available** | Watches can be inspected and removed |
| Cron Monitor live-loop table | **Preview gap** | Scheduler, workflow-heartbeat, and position-monitor loop registration is not connected on this branch |
| LP creation and fund reporting | **Available** | Later capital operations and standalone NAV strikes are not public actions |
| AI Trading Office browser dashboard | **Read-only** | It reports Office state but cannot change it |
| Configured India broker holdings in Market Terminal | **Read-only** | Manage or exit those holdings in the broker application |
| Live Hedge Fund broker execution | **Outside the product boundary** | Hedge Fund office panes are paper-only |

## Commands

Run these from the tradecli editor.

| Command | What it opens or does |
| --- | --- |
| `/hedgefund:books` | Choose or add a fund book, then launch its active team; CEO pane only |
| `/hedgefund:onboard` | Open launch-readiness cards; CEO pane only |
| `/hedgefund:control` | Open the selected book's Control Center; CEO pane only |
| `/hedgefund:admin` | Configure the selected book, team, mandates, workflows, and LP records |
| `/ideas` | Open the Idea Backlog |
| `/backtest` | Open Backtest Lab: new experiment, jobs, approvals, strategies, and help |
| `/strategies` | Open the Strategy Library for snapshots, journals, reviews, forward checks, restoration, and eligible paper tickets |
| `/terminal` | Open Market Terminal for the active Office paper scope |
| `/trade` | Open the entry ticket for the current pending strategy plan |
| `/exit [symbol]` | Open Market Terminal with the matching position's exit ticket; omit the symbol to choose manually |
| `/crons` | Open Cron Monitor for scheduled watches and the live-loop area |
| `/prefs` | Open preferences |
| `/persona` | Leave the current persona home and choose another persona |
| `/shortcuts` | Toggle the shortcut sheet below the editor |

There is no `/scanner` command in this preview. Use `Ctrl+Shift+N`.

## Keyboard shortcuts

### Global

| Shortcut | Action |
| --- | --- |
| `Ctrl+\` | Abort the current operation, if any, and return home |
| `Esc` | Go back or close the current overlay |
| `Ctrl+Shift+S` | Open preferences |
| `Ctrl+Shift+M` | Open Market Terminal |
| `Ctrl+Shift+N` | Open Scanner |
| `?` | Toggle the shortcut sheet when the editor is empty |

### Market Terminal

| Key | Action |
| --- | --- |
| `1`–`5` | Change instrument filter; the broker filter appears only where supported |
| `↑` / `↓` | Select a position |
| `T` | Open an entry ticket from the pending strategy plan |
| `X` | Open an exit ticket for the selected Office position |
| `R` | Refresh live marks |
| `Esc` | Close the terminal |

The exit ticket starts with the full open quantity at the current mark, but quantity and price remain editable before confirmation. Partial exits are supported.

### Cron Monitor

| Key | Action |
| --- | --- |
| `↑` / `↓` | Select a scheduled watch |
| `R` | Refresh status |
| `K` or `X` | Request permanent removal of the selected watch |
| `Y` / `N` | Confirm or cancel removal |
| `Esc` or `Q` | Close the monitor |

Removing a watch in Cron Monitor is different from stopping it in conversation: removal deletes the job, while **Stop watch** retains it in a disabled state.

## Core terminology

| Term | Meaning |
| --- | --- |
| **Fund book** | The boundary for one market's paper cash, positions, ledger, roster, research, and workflows |
| **CEO pane** | The selected book's lead surface for setup, delegation, and controls |
| **Employee pane** | A working surface with its own employee identity and book scope |
| **AI Trading Office** | The durable system of record behind the office and its read-only dashboard |
| **Mandate** | Stored permissions, limits, scope, cadence, and escalation rules for an employee |
| **Office workflow** | A reusable employee-owned routine with persisted scheduled runs |
| **Watch** | An ad hoc repeated observation that gathers fresh context and reports material changes |
| **Workflow heartbeat** | Background transport that advances due Office runs and unfinished backtest chunks |
| **Position monitor** | Deterministic checking of recorded paper stops, targets, and time exits |
| **Experiment plan** | The immutable symbols, dates, parameters, costs, validation, and ranking rule approved before a backtest |
| **Experiment job** | The persisted, chunked execution of an approved plan |
| **Machine verdict** | The system-owned promising, rejected, or inconclusive result from JUDGE |
| **Strategy version** | A frozen promoted implementation, parameter set, exits, universe, fingerprint, and evidence link |
| **Paper deployment** | A recorded proposal or approval to operate one strategy version within risk limits |
| **Journal** | Version-tagged paper activity and computed outcomes |
| **Review** | A human Keep, Pause, Retire, or Improve decision that preserves the earlier evidence |

## Safety invariants

These rules are part of the product model, not optional usage advice:

1. **Everything is book-scoped.** Verify the selected book before research, workflow, or paper-trade actions.
2. **Hedge Fund execution is paper-only.** An Office fill, deployment approval, or employee report is not a live broker order.
3. **Durable state outranks chat.** Use Office records, jobs, verdicts, transactions, journals, and reviews as the source of truth.
4. **AI explains and proposes; deterministic systems own lifecycle state.** Plans, fills, risk math, experiment progress, verdicts, and approvals are not inferred from prose.
5. **Risk denials cannot be softened by a prompt.** Mandates, symbol and instrument scope, required stops, loss limits, and kill switches constrain paper actions.
6. **An approved plan is immutable.** Changing the experiment creates a new plan and approval point.
7. **Only a promising experiment can be promoted.** Rejected and inconclusive jobs remain evidence.
8. **Promotion and deployment do not place a trade.** A paper ticket still needs a valid execution path.
9. **Versions are append-only evidence.** Improvement creates a child draft; it does not rewrite the reviewed parent.
10. **A watch is observation, not execution.** Use the position monitor for recorded paper exits and an Office workflow for standing employee work.

## Current preview gaps

### Operating-mode persistence

The scheduled Autonomous · Paper trading runtime is present, but the current Office book API and storage do not persist `operating_mode`. A mode selected during book creation or administration can return as Guided. Verify Control Center in every session; treat Autonomous Paper as a current-session preview rather than a durable book setting.

### Exact-version autonomy

The product can approve a frozen strategy version and can create a human-confirmed, version-tagged paper ticket. The current Library action uses stored universe, exit, and risk fields but assumes a buy-side equity entry; it does not evaluate the Pine entry signal. The product cannot yet schedule repeated signal evaluation and entry generation from the exact version. That runner is **TBD**.

### Cron live-loop visibility

Cron Monitor's watch table works. The live-loop table is not yet receiving registrations from the watch scheduler, workflow heartbeat, or position monitor on this branch. Manage Office workflows from `/hedgefund:control`; do not use an empty live-loop table as proof that no background service exists.

### LP operations

Administration can create an LP row, and summaries can report LPs, units, capital, high-water marks, NAV, P&L, and ledger state. Editing or deleting standalone fund-client rows is not available in the terminal UI. Later contributions, redemptions, reconciliation, and standalone NAV strikes remain internal Office operations.

### Broker and advanced-instrument accounting

Configured India broker holdings are context only in Market Terminal. They cannot be exited from the Hedge Fund office. Futures entries are audit-only and do not yet model margin or mark-to-market cash movement. Multi-leg option and futures baskets book legs sequentially, so inspect Market Terminal if a later leg fails. Automatic multi-target scale-out progression is still under verification.

## Related pages

- [Hedge Fund mode](/hedge-fund/)
- [Set up your office](/hedge-fund/setup)
- [Operate the fund](/hedge-fund/operations)
- [Watches and background work](/hedge-fund/watches)
- [Run paper strategies](/hedge-fund/paper-operations)
