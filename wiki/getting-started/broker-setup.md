---
title: Broker Setup
description: Configure MCP-backed broker workflows for Groww and Zerodha Kite in tradecli.
outline: 2
---

# Broker Setup

Broker access is configured through the normal local setup path. The goal is not to hand credentials to a hosted service; it is to let `tradecli` coordinate local broker/browser sessions when a workflow needs account context.

::: tip Start here
Run `tradecli setup` first. It creates the local config, checks the broker gateway, verifies browser prerequisites, and prompts for available fixes when supported auth is missing or expired.
:::

## Supported brokers

Current MCP-backed broker flows focus on:

- **Groww MCP** for holdings, watchlists, screeners, and account context.
- **Zerodha Kite MCP** for holdings, positions, margins, historical data, and account context.

Broker behavior is intentionally local and explicit. Agents can prepare analysis and surface broker context, but actions that move money still require user approval at the broker surface.

## Groww connection

Run:

```bash
tradecli setup
```

If Groww auth is missing or expired, setup can prompt to repair it. You can also run:

```bash
tradecli doctor --fix
```

Doctor uses the same environment checks and can re-acquire Groww auth when the fix path is available.

## Zerodha Kite connection

Kite does not keep the same persistent token shape as Groww. After setup, Kite login happens interactively the first time a Kite workflow needs it.

Use `tradecli setup` to make sure the local broker gateway and browser profile are ready before that first-use login.

## Token refresh and reauth

- Run `tradecli doctor` when broker-aware workflows behave unexpectedly.
- Run `tradecli doctor --fix` when you want tradecli to prompt for safe repairs.
- Expect Groww to support a repair prompt when auth is missing or expired.
- Expect Kite to ask for login again on first use or after the broker session expires.

## Troubleshooting

If setup or doctor cannot repair the broker path:

- Confirm Chrome is installed and usable.
- Re-run `tradecli setup` after changing shell environment variables or model credentials.
- Launch `tradecli`, choose a broker-aware workflow, and complete any first-use broker login prompt.
- If you're still stuck, email [contact@tradecli.in](mailto:contact@tradecli.in).
