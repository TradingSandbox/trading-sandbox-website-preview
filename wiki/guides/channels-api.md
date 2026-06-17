---
title: Channels & API
description: Current notes on tradecli interaction channels beyond the main TUI.
outline: 2
---

# Channels & API

The supported launch surface is the interactive TUI:

```bash
tradecli
```

Other channels are treated as integration surfaces around the local runtime, not as the default path for a new user.

::: warning Current status
The TUI is the documented primary channel. Telegram, WhatsApp, and raw gateway usage are not part of the normal Quick Start path.
:::

## What is a channel

A channel is an interface that can send work into tradecli or receive output from it. The channel should not change the safety model: broker credentials remain local, and actions that move money still require explicit approval.

## The TUI channel

The TUI is the main product surface. It handles persona and workflow selection, Office Mode, local tool visibility, setup prompts, and review before risky actions.

## Telegram

Telegram is not required for normal use. Treat it as an external integration surface only when explicitly configured for a workflow.

## WhatsApp

WhatsApp is not required for normal use. Treat it as an external integration surface only when explicitly configured for a workflow.

## Gateway HTTP API

The local gateway exists to support tradecli workflows and sidecars. It is not the recommended first interface for users. Start with `tradecli`, then use documented integration paths only when a workflow calls for them.
