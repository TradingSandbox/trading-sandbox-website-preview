---
title: Personas & Modes
description: Overview of tradecli's Learner, Investor, Trader, Hedge Fund, and PMS workflows. How to pick one, and what switching means.
outline: 2
---

# Personas & Modes

`tradecli` has specialist workflows for learning, investing, trading, and multi-agent office work. Investor and Trader are the primary single-agent work modes. Hedge Fund and PMS are Office Mode desks where a CEO pane coordinates specialist workers.

Modes are chosen from the same picker (`Ctrl+\` inside the TUI). Each keeps its own session state, so switching away and back doesn't lose your place.

::: tip Why separate?
A trader sizing a 5-minute setup, an investor writing a 10-year thesis, and an office desk coordinating portfolio context need different tools and different defaults. Separating them keeps the prompt focused and the tool palette clean.
:::

## Picking one

| You want to… | Use |
|---|---|
| Learn trading or investing from scratch | [**Learner mode**](/guides/learner) |
| Research a listed Indian company or find ideas | [**Investor**](/guides/investor) |
| Build, backtest, and deploy a Streak strategy | [**Trader**](/guides/trader) |
| Coordinate investor and trader workers around one thesis | **Hedge Fund Office Mode** |
| Review model portfolios, mandates, concentration, and client context | [**PMS and portfolio workflows**](/guides/portfolio-manager) |

If you're unsure, start with [Learner](/guides/learner) — it introduces the vocabulary and the platforms. You can switch later.

## Switching

Open the picker with `Ctrl+\`. Your **last active persona is remembered** across sessions, so the next launch drops you back where you left off.

Key properties:

- **State is isolated per mode.** A trader conversation stays in trader context. Switching to investor starts a fresh thread with investor's tools and prompt.
- **Mid-lesson safety.** If you're in Learner mode mid-step and switch to another mode, the step session is preserved and resumes on return.
- **Tool palette changes with the mode.** Investor gets Screener; Trader gets the Streak and TradingView workflows; Office Mode desks add mailbox delegation and AITradingOffice memory. Tools are scoped by the active workflow.

## What's next

- **Deep dive on each** → [Learner Mode](/guides/learner) · [Investor](/guides/investor) · [Trader](/guides/trader) · [PMS and Portfolio Workflows](/guides/portfolio-manager)
- **Connect your broker** → [Broker Setup](../getting-started/broker-setup) — so broker-aware workflows can reach your account
- **Configure the browser** → [Browser Setup](../getting-started/browser-setup) — for TradingView, Screener.in, and broker-browser workflows

::: danger Not financial advice
Persona outputs are educational and analytical. Nothing `tradecli` says constitutes a recommendation to buy, sell, or hold any security. Verify against primary sources before trading real capital.
:::
