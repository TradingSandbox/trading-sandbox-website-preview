---
title: tradecli wiki
description: Documentation for the tradecli agent-native trading OS for Indian markets.
---

# tradecli wiki

Documentation for `tradecli` — the agent-native trading OS for Indian markets.

## What is tradecli?

`tradecli` is a local command layer for AI agents that operate across the tools Indian-market traders already use: broker APIs, broker/browser screens, TradingView, Screener.in, portfolios, and a durable office memory layer.

The product shape is three parts:

- **tradecli OS**: the local harness for tools, personas, broker sidecars, browser control, model runtime, and action policy.
- **Agents**: workers you spawn with a persona and mandate, from Learner and Investor to Trader, Hedge Fund, and PMS desks.
- **AITradingOffice**: the system of record for theses, forward tests, ledgers, reviews, employees, clients, and account context.

Everything the agents do should remain visible and auditable from the operator's command surface. Broker credentials stay on your machine, and execution paths are gated behind explicit setup and review.

## Office Mode

Office Mode lets one operator coordinate multiple specialist agents from the interactive TUI. Launch `tradecli`, choose Office Mode, and the mailbox coordinates delegation while AITradingOffice keeps the durable record behind the session.

## New here?

Start with → [Quick Start](/getting-started/quick-start)

## Explore the docs

### Getting Started

#### [Quick Start](/getting-started/quick-start)
- Install via Homebrew
- Run first-time setup
- Run `tradecli doctor`
- Launch the TUI
- Pick your first workflow

#### [Broker Setup](/getting-started/broker-setup)
- Run `tradecli setup`
- Groww first-use auth behavior
- Zerodha Kite first-use login behavior
- Local doctor repair path

#### [Browser Setup](/getting-started/browser-setup)
- Why a dedicated browser
- Chrome/Chromium requirements
- The tradecli browser profile
- First-run flow
- Troubleshooting

#### [LLM Setup](/getting-started/llm-setup)
- API-key providers
- Subscription login paths
- Auth storage
- Verification

### Guides

#### [Personas & Modes](/guides/personas)
- Picking one
- Switching
- Office Mode

#### [Learner Mode](/guides/learner)
- How it works
- Typical prompts
- Switching away and back

#### [Investor](/guides/investor)
- What it's for
- Primary tools
- Typical prompts

#### [Trader](/guides/trader)
- What it's for
- Primary tools
- Typical prompts

#### [PMS and Portfolio Workflows](/guides/portfolio-manager)
- PMS mode in Office Mode
- Portfolio context
- Guardrails
- Typical prompts

#### [Channels & API](/guides/channels-api)
- What is a channel
- The TUI channel
- Telegram
- WhatsApp
- Gateway HTTP API
