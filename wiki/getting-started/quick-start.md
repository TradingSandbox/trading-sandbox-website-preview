---
title: Quick Start
description: Install tradecli, configure your first persona, and run your first session in under 5 minutes.
outline: 2
---

# Quick Start

Install `tradecli`, authenticate with an LLM provider, pick a persona, and run your first session — all in under 5 minutes. This page assumes you have macOS (Apple Silicon) or Linux (x64). Windows users can grab the `.zip` from the [releases page](https://github.com/TradingSandbox/TradingSandbox/releases).

::: tip Time required
**~5 minutes** for a working installation. Broker authentication takes a few extra minutes and is covered in [Broker Setup](./broker-setup).
:::

## 1. Install via Homebrew

The recommended path on macOS and Linux is the Homebrew tap:

```bash
brew install TradingSandbox/tradecli/tradecli
```

Or, in two steps:

```bash
brew tap TradingSandbox/tradecli
brew install tradecli
```

Verify the install:

```bash
tradecli --version
# tradecli 0.3.7 (or later)
```

::: info Upgrading
`brew upgrade tradecli` pulls the latest stable release. Releases follow semver: patch bumps (0.3.7 → 0.3.8) are bug fixes, minor bumps (0.3.x → 0.4.0) add features, major bumps (0.x → 1.0) are breaking changes.
:::

## 2. Configure an LLM provider

`tradecli` needs access to a large language model to drive the personas. First-run setup auto-detects the following (in priority order):

| Source | How it's detected |
|---|---|
| `ANTHROPIC_API_KEY` environment variable | Checked at startup |
| OAuth login (Anthropic / OpenAI) | Runs via browser if no env var |
| Hand-edited `~/.tradecli/auth.json` | Fallback for advanced users |

The simplest path:

```bash
export ANTHROPIC_API_KEY="sk-ant-..."
tradecli setup
```

The setup wizard walks through the remaining checks (config dir, Chrome, broker OAuth, port availability) and writes `~/.tradecli/config.json`.

::: warning Do not commit API keys
Keep `ANTHROPIC_API_KEY` in your shell's rc file (`~/.zshrc`, `~/.bashrc`) — never commit it to a repository. If a key leaks, rotate it immediately in the [Anthropic console](https://console.anthropic.com/).
:::

## 3. Run `tradecli doctor`

Confirms the environment is healthy before launching the full TUI:

```bash
tradecli doctor
```

Expected output:

```
✓ config-dir       Config directory OK
✓ llm-auth         ANTHROPIC_API_KEY present
✓ model-selection  Default: claude-opus-4-7
✓ chrome           Chrome 141.0 OK
✓ browser-profile  tradecli Chrome profile OK
✓ mcp              MCP manifests cached
✓ broker-auth      Groww token valid (expires in 23h)
✓ ports            All required ports free
✓ network          api.anthropic.com reachable
✓ version          Running latest (0.3.7)
```

If any check fails, run `tradecli doctor --fix` — it'll prompt to auto-repair what it can (missing directories, expired Groww tokens, etc.).

## 4. Pick your first persona

`tradecli` ships with four personas. Each has its own system prompt, tool set, and session state:

- **Learner** — 8-chapter interactive curriculum with quizzes and live practice on broker platforms
- **Trader** — short-term signal-driven decisions, news scanning, quick chart reads
- **Investor** — long-term fundamentals, DCF modeling, peer comparison via Screener.in
- **Portfolio Manager** — allocation, rebalancing, XLSX import, correlation analysis

Start with Learner if you're new to trading. Switch personas later with `Ctrl+\` inside the TUI.

## 5. Launch the TUI

```bash
tradecli
```

You'll land in the interactive terminal interface. On first launch, the persona picker appears — hit the number key for your chosen persona, then start chatting.

::: tip First prompt ideas
- **Learner:** "Start chapter 1"
- **Trader:** "What's happening with Nifty today?"
- **Investor:** "Run a quick screen for low-debt large caps with >15% ROCE"
- **Portfolio Manager:** "Load my portfolio from `~/Downloads/holdings.xlsx`"
:::

## What's next

Once you have a working install:

- **Connect your broker** → [Broker Setup](./broker-setup) — Groww and Zerodha Kite OAuth flows
- **Configure the browser** → [Browser Setup](./browser-setup) — Chrome CDP for platform automation
- **Deep-dive per persona** → [Personas guide](../guides/personas)
- **Extend tradecli** → [Skills & Extensions](../extending/skills)

::: danger Not financial advice
`tradecli` is an educational and analytical tool. Nothing it outputs constitutes a recommendation to buy, sell, or hold any security. Always verify AI outputs against primary sources before trading real capital.
:::
