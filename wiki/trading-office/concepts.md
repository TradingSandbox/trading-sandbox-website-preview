---
title: Concepts and terminology
description: Understand the durable objects, lifecycle stages, operating principles, and shared language of Trading Office.
outline: 2
---

# Concepts and terminology

Trading Office connects conversations to durable work. These terms describe the objects that survive a session and keep research, strategy operation, and review consistent.

## The main objects

| Term | Meaning |
| --- | --- |
| **Trading book** | The boundary for one market's paper cash, positions, ledger, team, research, and workflows; currently labeled **fund book** in the interface |
| **AI employee** | A role-bound agent with its own identity, mandate, tools, book scope, and responsibility for attributed work |
| **Office lead** | The selected book's coordination surface for setup, delegation, and controls; currently labeled the **CEO pane** |
| **Employee pane** | A working surface with its own employee identity and book scope |
| **Trading Office records** | The local records behind the workspace: books, employees, research, workflows, transactions, strategies, journals, and reviews |
| **Mandate** | Stored permissions, limits, scope, cadence, and escalation rules for an employee |
| **Office workflow** | A reusable employee-owned responsibility with persisted scheduled runs |
| **Market watchlist** | A saved group of symbols for browsing; it does not schedule AI work |
| **Watch** | A scheduled AI observation that gathers fresh context and reports material changes |
| **Workflow heartbeat** | Background transport that advances due Office work and unfinished backtest chunks |
| **Position monitor** | Deterministic checking of recorded paper stops, targets, and time exits |
| **Strategy Lab** | The idea-to-verdict testing workflow; the current `/backtest` menu is labeled **Backtest Lab** |

## Strategy lifecycle terms

| Term | Meaning |
| --- | --- |
| **Idea** | An observation or suspected relationship preserved before it becomes a formal strategy |
| **Hypothesis** | A falsifiable trading claim with an entry, exit, scope, and result that would count against it |
| **Experiment plan** | The immutable symbols, dates, parameters, costs, validation, and ranking rule approved before a backtest |
| **Experiment job** | The persisted, chunked execution of an approved plan |
| **Machine verdict** | The system-owned promising, rejected, or inconclusive result from JUDGE |
| **Strategy version** | A frozen promoted implementation, parameter set, exits, universe, fingerprint, and evidence link |
| **Paper deployment** | Recorded authorization to use one strategy version for paper trading within defined risk limits |
| **Journal** | Version-tagged paper activity and its computed outcomes |
| **Forward check** | A test of the unchanged version over history that arrived after promotion |
| **Review** | A human Keep, Pause, Retire, or Improve decision that preserves the earlier evidence |
| **Child hypothesis** | One explicit proposed change linked to its reviewed parent strategy |

## The evidence lifecycle

Strategy Lab follows a fixed contract:

| Stage | What becomes durable |
| --- | --- |
| **BUILD** | The compiled strategy implementation and its fingerprint |
| **PLAN** | The exact experiment specification and approval |
| **RUN** | Completed chunks, cells, progress, and results |
| **JUDGE** | One promising, rejected, or inconclusive verdict |
| **PROMOTE** | A frozen strategy version, lineage, evidence links, and paper deployment |

The broader Trading Office journey continues beyond the experiment:

**Idea → research → test → judge → promote → paper trade → monitor → review → improve**

## Operating principles

1. **Everything belongs to a book.** Research, workflows, strategies, and paper activity stay inside the selected trading context.
2. **Durable state outranks chat.** Jobs, verdicts, approvals, transactions, journals, and reviews are the source of truth.
3. **AI proposes and interprets; systems own facts.** Prices, risk math, progress, verdicts, approvals, and fills come from the tools that produce them.
4. **Mandates constrain employee action.** Scope, risk limits, required stops, escalation rules, and kill switches apply to scheduled and interactive work.
5. **An approved experiment is immutable.** Changing the test creates a new plan and approval point.
6. **Promotion requires evidence.** A strategy version inherits the implementation, parameters, lineage, and result that earned promotion.
7. **Paper trading stays traceable.** Trades carry their strategy-version and deployment identities into the ledger and journal.
8. **Improvement preserves history.** A proposed change creates a child hypothesis rather than rewriting the reviewed parent.
9. **Automation tools have distinct jobs.** Watches observe, workflows assign responsibility, heartbeat resumes work, and position monitoring applies recorded exits.
10. **Paper and live activity remain distinct.** An Office paper transaction is not a broker order.

## How the systems fit together

- **tradecli** is the product: conversation, roles, delegation, charts, market tools, automation, and paper-trade surfaces.
- **Trading Office** is the workspace in tradecli that connects the full strategy loop and its local records.
- **Connected systems** provide external truth and capabilities, including model providers, TradingView, market-data services, and configured brokers.

## Related pages

- [Trading Office overview](/trading-office/)
- [Your first strategy](/trading-office/quickstart)
- [Automation tools](/trading-office/watches)
- [Commands and shortcuts](/trading-office/commands)
