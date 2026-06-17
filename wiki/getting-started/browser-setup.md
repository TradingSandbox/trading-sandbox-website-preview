---
title: Browser Setup
description: Configure Chrome for tradecli's browser-driven workflows.
outline: 2
---

# Browser Setup

Some tradecli workflows need a real browser because the source of truth is a web app: TradingView, Screener.in, broker screens, or login surfaces. Browser setup is handled by the same local setup path as the rest of the product.

## Why a dedicated browser

Browser-driven workflows are used when an API is unavailable, incomplete, or when the workflow needs to read the same screen a trader would inspect manually.

The browser path is designed to keep the operator in control:

- tradecli uses a local browser profile.
- Broker logins happen on the machine running tradecli.
- Agents can read context and prepare work, but broker actions still require explicit user approval.

## Chrome/Chromium requirements

Install Chrome or a compatible Chromium browser before running setup. Then run:

```bash
tradecli setup
```

Setup checks the browser path and creates the local browser profile when needed. You can re-check the environment with:

```bash
tradecli doctor
```

## The tradecli browser profile

tradecli keeps its browser automation state separate from your everyday browser profile. That reduces accidental session crossover and makes doctor repairs safer.

Use `tradecli doctor --fix` if the browser profile is missing, stale, or no longer launches cleanly.

## First-run flow

1. Install tradecli.
2. Run `tradecli setup`.
3. Launch `tradecli`.
4. Choose a browser-aware workflow, such as TradingView, Screener.in, or a broker-aware flow.
5. Complete any first-use login prompt in the local browser window.

## Troubleshooting

- Run `tradecli doctor`.
- Run `tradecli doctor --fix` for safe repairs.
- Confirm Chrome launches normally outside tradecli.
- Re-run `tradecli setup` after changing model credentials, broker state, or browser installation.
- If you're still stuck, email [contact@tradecli.in](mailto:contact@tradecli.in).
