---
title: Quick Start
description: Install tradecli, run first-time setup, and launch the interactive TUI.
outline: 2
---

# Quick Start

Install the tradecli stack, run first-time setup, check the local environment, and launch the interactive TUI. This page assumes macOS (Apple Silicon) or Linux (x64). Windows users can grab the `.zip` from the [releases page](https://github.com/TradingSandbox/TradingSandbox/releases).

::: tip Time required
**~5 minutes** for a working local install. Broker login can take a few extra minutes the first time a workflow needs account data.
:::

## 1. Install via Homebrew

The recommended path on macOS and Linux is the Homebrew tap:

```bash
brew trust --tap TradingSandbox/tradecli && brew install TradingSandbox/tradecli/tradecli
```

That installs the local stack tradecli expects:

- `tradecli` - the interactive TUI and agent runtime
- `ai-trading-office` - local office memory and research state
- `herdr` - the agent desk host used when available
- `node` - required for stdio MCP packages such as TradingView

Verify the install:

```bash
tradecli --version
# tradecli 0.6.11 (or later)
```

::: info Upgrading
Run `tradecli upgrade` to update the Homebrew stack. It upgrades `tradecli` and `ai-trading-office`, and restarts the AITradingOffice service if it was already running.
:::

## 2. Run first-time setup

Run the setup wizard once:

```bash
tradecli setup
```

`tradecli setup` creates `~/.tradecli/config.json`, writes safe defaults, configures model credentials, caches MCP packages, and runs the same environment checks used by `tradecli doctor`.

For API-key access, you can either enter a key in the wizard or set one before running setup:

```bash
export ANTHROPIC_API_KEY="sk-ant-..."
tradecli setup
```

The wizard supports API keys for Anthropic, OpenAI, Google, Groq, xAI, OpenRouter, Mistral, Cerebras, and Hugging Face. For subscription-based OAuth access such as Claude Pro/Max, ChatGPT, GitHub Copilot, or Google AI, launch `tradecli`, type `/login`, then re-run `tradecli setup`. See [LLM Setup](./llm-setup) for the full auth flow.

Setup also covers the supporting local stack:

- Chrome and the tradecli browser profile
- MCP package cache for TradingView
- broker MCP and gateway configuration
- Groww auth status, with an optional fix prompt when auth is missing or expired
- local AITradingOffice API defaults

Kite does not keep the same persistent token shape as Groww, so Kite login happens interactively the first time a Kite workflow needs it.

::: warning Do not commit API keys
Keep API keys in your shell rc file (`~/.zshrc`, `~/.bashrc`) or the private tradecli auth store. Never commit keys to a repository. If a key leaks, rotate it immediately with the provider.
:::

## 3. Run `tradecli doctor`

Confirm the environment before serious work:

```bash
tradecli doctor
```

Doctor checks the config directory, product auth, LLM auth, Chrome, browser profile, MCP manifests, MCP source packages, broker gateway, broker auth, ports, network, and installed version.

If a check fails or warns, run:

```bash
tradecli doctor --fix
```

It prompts before applying available fixes such as creating missing directories, repairing the browser profile, refreshing MCP packages, or re-acquiring Groww OAuth.

## 4. Launch the TUI

```bash
tradecli
```

Plain `tradecli` is the launch surface. On first launch, setup runs automatically if it has not completed yet. After startup, you land in the interactive terminal interface, choose a persona, and start working.

When Herdr is installed and reachable, tradecli can host the TUI in the agent desk automatically. You do not need a separate Herdr command for the normal path.

## 5. Pick your first workflow

Choose the workflow that matches what you want to do:

- **Learner** - guided lessons, quizzes, and broker-aware practice
- **Investor** - fundamentals, valuation, Screener.in, thesis review, and portfolio context
- **Trader** - Streak or TradingView Desktop workflows for active trading
- **Hedge Fund** - Office Mode with a CEO pane coordinating investor and trader employees
- **PMS** - Office Mode for client mandates, model portfolios, overlays, and review workflows

Start with Learner if you are new to trading. Switch personas later with `Ctrl+\` inside the TUI.

::: tip First prompt ideas
- **Learner:** "Start chapter 1"
- **Investor:** "Run a quick screen for low-debt large caps with >15% ROCE"
- **Trader:** "Open the TradingView Desktop path for RELIANCE"
- **Hedge Fund:** "Research HDFC Bank and decide whether it fits the book"
- **PMS:** "Draft a model portfolio review workflow"
:::

## What's next

Once you have a working install:

- **Broker workflows** -> [Broker Setup](./broker-setup) - Groww/Kite first-use behavior and local repair path
- **Browser workflows** -> [Browser Setup](./browser-setup) - Chrome profile and platform automation
- **LLM auth** -> [LLM Setup](./llm-setup) - API keys and subscription login paths
- **Personas** -> [Personas guide](../guides/personas)
- **Channels and API** -> [Beyond the TUI](../guides/channels-api)

::: danger Not financial advice
`tradecli` is an educational and analytical tool. Nothing it outputs constitutes a recommendation to buy, sell, or hold any security. Always verify AI outputs against primary sources before trading real capital.
:::
