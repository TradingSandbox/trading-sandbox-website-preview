---
title: Personas & Modes
description: Overview of tradecli's specialist personas and Learner mode. How to pick one, and what switching means.
outline: 2
---

# Personas & Modes

`tradecli` has two specialist **personas** — Investor and Trader — each with its own tools, instincts, and response style. Plus **Learner mode**, a guided curriculum for people getting started.

All three are chosen from the same picker (`Ctrl+\` inside the TUI). Each keeps its own session state, so switching away and back doesn't lose your place.

::: tip Why separate?
A trader sizing a 5-minute setup and an investor writing a 10-year thesis need different tools and different defaults. Using one monolithic assistant for both produces mediocre answers for each. Separating them keeps the prompt focused and the tool palette clean.
:::

## Picking one

| You want to… | Use |
|---|---|
| Learn trading or investing from scratch | [**Learner mode**](/guides/learner) |
| Research a listed Indian company, value it, build a thesis, or review holdings and rebalance across brokers | [**Investor**](/guides/investor) |
| Build/backtest/deploy a Streak strategy, analyze live chart context, run Pine workflows, or read options context | [**Trader**](/guides/trader) |

If you're unsure, start with [Learner](/guides/learner) — it introduces the vocabulary and the platforms. You can switch later.

## Switching

Open the picker with `Ctrl+\`. Your **last active persona is remembered** across sessions, so the next launch drops you back where you left off.

Key properties:

- **State is isolated per persona.** A trader conversation stays in trader context. Switching to investor starts a fresh thread with investor's tools and prompt.
- **Mid-lesson safety.** If you're in Learner mode mid-step and switch to another persona, the step session is preserved and resumes on return.
- **Tool palette changes with the persona.** Investor gets Screener, the XLSX parser, and broker MCPs for portfolio context; Trader gets the Streak workflow, MCP-native TradingView, Groww/Kite context, and Pine workflows. Tools aren't shared globally — the persona decides.

## What's next

- **Deep dive on each** → [Learner Mode](/guides/learner) · [Investor](/guides/investor) · [Trader](/guides/trader)
- **Connect your broker** → [Broker Setup](../getting-started/broker-setup) — so persona tools can reach your account
- **Configure the browser** → [Browser Setup](../getting-started/browser-setup) — for Streak workflows and broker automation

::: danger Not financial advice
Persona outputs are educational and analytical. Nothing `tradecli` says constitutes a recommendation to buy, sell, or hold any security. Verify against primary sources before trading real capital.
:::
