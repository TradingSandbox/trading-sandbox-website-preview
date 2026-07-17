---
title: tradecli wiki
description: Preview documentation for tradecli, starting with the complete Hedge Fund paper-strategy workflow.
---

# tradecli wiki

Practical documentation for `tradecli`, the local-first AI workspace for researching decisions and turning trading ideas into versioned, testable, reviewable paper strategies.

::: info Start with Hedge Fund mode
The Hedge Fund guide is the first comprehensive product guide in this preview. Its recommended journey takes one idea through an approved experiment, a machine verdict, paper operation, and review.
:::

## Recommended first journey

**Idea → BUILD → PLAN → RUN → JUDGE → PROMOTE → paper operation → journal → review**

The tutorial shows the whole loop while keeping the current boundary clear: general autonomous employee workflows can operate on paper, but scheduled execution of the exact strategy version that passed JUDGE is still **TBD**.

[Start the Hedge Fund quickstart →](/hedge-fund/quickstart)

## Hedge Fund guide

| Guide | What you will learn |
| --- | --- |
| [Hedge Fund mode](/hedge-fund/) | The fund book, team, operating modes, safety boundary, and product model |
| [Quickstart: idea to review](/hedge-fund/quickstart) | The complete recommended journey |
| [Set up your office](/hedge-fund/setup) | Books, team, Guided and Autonomous Paper sessions, mandates, and workflows |
| [Research and ideas](/hedge-fund/ideas) | Capture, shape, park, and advance a hypothesis |
| [Test in Strategy Lab](/hedge-fund/strategy-lab) | BUILD, PLAN, RUN, JUDGE, PROMOTE, jobs, and approvals |
| [Run paper strategies](/hedge-fund/paper-operations) | Scanner, risk-sized tickets, Market Terminal, and deterministic exits |
| [Watches and schedules](/hedge-fund/watches) | Recurring observation, ownership, run limits, and Cron Monitor |
| [Review and improve](/hedge-fund/review) | Journals, forward checks, decisions, and child hypotheses |
| [Operate the fund](/hedge-fund/operations) | Delegation, Control Center, reporting, and fund administration |
| [Status and reference](/hedge-fund/reference) | Commands, terminology, availability, known gaps, and safety boundaries |

## How the pieces fit

- **tradecli** is the working experience: conversation, roles, delegation, Strategy Lab, charts, market tools, and paper-trade surfaces.
- **AI Trading Office** is the durable system of record for books, employees, mandates, research, workflows, transactions, strategy versions, approvals, journals, and reviews.
- **Connected systems** provide external truth and capabilities, including model providers, TradingView, market-data services, and configured brokers.

Important work should survive the conversation that created it. Prices, fills, experiment progress, verdicts, approvals, and transactions come from the systems that own those facts—not from model recollection.

## Install and configure

- [Quick Start](/getting-started/quick-start) — install, run setup and doctor, then launch the TUI
- [LLM Setup](/getting-started/llm-setup) — configure a model provider or subscription login
- [Broker Setup](/getting-started/broker-setup) — configure supported broker context
- [Browser Setup](/getting-started/browser-setup) — prepare the browser profile used by web workflows

## Existing focused guides

The earlier Learner, Investor, Trader, PMS, and channel guides remain available. They predate the current Hedge Fund lifecycle and will be refreshed separately; use the Hedge Fund guide as the canonical reference for the features it covers.

- [Personas and modes](/guides/personas)
- [Learner mode](/guides/learner)
- [Investor](/guides/investor)
- [Trader](/guides/trader)
- [PMS and portfolio workflows](/guides/portfolio-manager)
- [Channels and API](/guides/channels-api)

::: danger Not financial advice
`tradecli` is an analytical and paper-trading tool. Nothing it outputs is a recommendation to buy, sell, or hold a security. Verify AI output and market assumptions independently before using real capital.
:::
