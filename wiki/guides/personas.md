---
title: Personas & Modes
description: Overview of tradecli's three personas (Investor, Trader, Portfolio Manager) and Learner mode. How to pick one, and what switching means.
outline: 2
---

# Personas & Modes

`tradecli` has three specialist **personas** — Investor, Trader, and Portfolio Manager — each with its own tools, instincts, and response style. Plus **Learner mode**, a guided curriculum for people getting started.

All four are chosen from the same picker (`Ctrl+\` inside the TUI). Each keeps its own session state, so switching away and back doesn't lose your place.

::: tip Why separate?
A trader sizing a 5-minute setup, an investor writing a 10-year thesis, and a portfolio manager watching sector correlation need different tools and different defaults. Using one monolithic assistant for all three produces mediocre answers for each. Separating them keeps the prompt focused and the tool palette clean.
:::

## Picking one

| You want to… | Use |
|---|---|
| Learn trading or investing from scratch | [**Learner mode**](/guides/learner) |
| Research a listed Indian company or find ideas | [**Investor**](/guides/investor) |
| Build, backtest, and deploy a Streak strategy | [**Trader**](/guides/trader) |
| Review your holdings across brokers, rebalance, harvest losses | [**Portfolio Manager**](/guides/portfolio-manager) |

If you're unsure, start with [Learner](/guides/learner) — it introduces the vocabulary and the platforms. You can switch later.

## Switching

Open the picker with `Ctrl+\`. Your **last active persona is remembered** across sessions, so the next launch drops you back where you left off.

Key properties:

- **State is isolated per persona.** A trader conversation stays in trader context. Switching to investor starts a fresh thread with investor's tools and prompt.
- **Mid-lesson safety.** If you're in Learner mode mid-step and switch to another persona, the step session is preserved and resumes on return.
- **Tool palette changes with the persona.** Investor gets Screener; Portfolio Manager gets the XLSX parser and broker MCPs; Trader gets the Streak workflow. Tools aren't shared globally — the persona decides.

## What's next

- **Deep dive on each** → [Learner Mode](/guides/learner) · [Investor](/guides/investor) · [Trader](/guides/trader) · [Portfolio Manager](/guides/portfolio-manager)
- **Connect your broker** → [Broker Setup](../getting-started/broker-setup) — so persona tools can reach your account
- **Configure the browser** → [Browser Setup](../getting-started/browser-setup) — for Streak workflows and some PM actions
- **Extend a persona** → [Skills & Extensions](../extending/skills) — how skills are loaded, and how to add new ones

::: danger Not financial advice
Persona outputs are educational and analytical. Nothing `tradecli` says constitutes a recommendation to buy, sell, or hold any security. Verify against primary sources before trading real capital.
:::
