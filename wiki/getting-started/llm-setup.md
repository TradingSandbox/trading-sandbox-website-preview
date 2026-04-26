---
title: LLM Setup
description: Give tradecli access to a large language model — interactively via tradecli setup (API keys) or via /login (OAuth).
outline: 2
---

# LLM Setup

`tradecli` needs to talk to a large language model to drive its personas. There are two ways to give it access depending on what you have:

| You have… | Use… |
|---|---|
| An API key from any supported provider | `tradecli setup` (interactive wizard) |
| A Claude Pro/Max subscription, ChatGPT Plus, GitHub Copilot, or Google AI subscription | `/login` (OAuth, browser-based) |

::: tip One-time setup
You only need to do this once. After credentials are saved, every future `tradecli` invocation picks them up automatically — no env vars to remember, no flags to pass.
:::

## API key path: `tradecli setup`

The simplest path. If you have an API key from Anthropic, OpenAI, Google, or any other supported provider, run:

```bash
tradecli setup
```

The wizard's first step checks whether any credentials are already configured (env vars, an existing `~/.tradecli/agent/auth.json`). If none are found, it opens an interactive picker:

1. **Choose an LLM provider** — pick from the list (see [supported providers](#supported-providers) below).
2. **Paste your API key** — input is masked. Press Enter to save.
3. **Done** — the wizard verifies the credential landed on disk and continues with the rest of setup (browser config, broker auth, etc.).

Credentials are stored at `~/.tradecli/agent/auth.json` with `0600` permissions.

### Supported providers

The wizard offers these 9 providers. Each can be configured via the wizard (paste a key) or via environment variable.

| Provider | Env variable | Get an API key |
|---|---|---|
| Anthropic | `ANTHROPIC_API_KEY` | [console.anthropic.com](https://console.anthropic.com/) |
| OpenAI | `OPENAI_API_KEY` | [platform.openai.com](https://platform.openai.com/api-keys) |
| Google (Gemini) | `GEMINI_API_KEY` | [aistudio.google.com](https://aistudio.google.com/apikey) |
| Groq | `GROQ_API_KEY` | [console.groq.com](https://console.groq.com/keys) |
| xAI | `XAI_API_KEY` | [console.x.ai](https://console.x.ai/) |
| OpenRouter | `OPENROUTER_API_KEY` | [openrouter.ai](https://openrouter.ai/keys) |
| Mistral | `MISTRAL_API_KEY` | [console.mistral.ai](https://console.mistral.ai/api-keys) |
| Cerebras | `CEREBRAS_API_KEY` | [cloud.cerebras.ai](https://cloud.cerebras.ai/) |
| HuggingFace | `HF_TOKEN` | [huggingface.co/settings/tokens](https://huggingface.co/settings/tokens) |

::: info Env vars still work
If you prefer keeping keys in your shell rc (`~/.zshrc`, `~/.bashrc`), `export ANTHROPIC_API_KEY=sk-ant-…` (or any other provider's env var) before running `tradecli setup` — the wizard detects the env var and skips the picker.
:::

::: warning Do not commit API keys
Keep keys in your shell rc or in `~/.tradecli/agent/auth.json` — never commit them to a repository. If a key leaks, rotate it immediately in the relevant provider's console.
:::

## OAuth path: `/login`

If you have a subscription rather than an API key — Claude Pro/Max, ChatGPT Plus, GitHub Copilot, or one of Google's AI subscriptions — use the `/login` slash command from inside the running TUI. The setup wizard does not handle OAuth (browser flows aren't a good fit for a one-shot CLI wizard).

The flow:

```bash
tradecli           # launches the interactive TUI
```

Inside the TUI, type:

```
/login
```

Pick the provider, complete the browser login, and the credentials are written to `~/.tradecli/agent/auth.json` — the same file the wizard uses, so the rest of setup can pick them up.

### Supported OAuth providers

Five OAuth providers are available via `/login`:

| Provider | What it actually is | Subscription needed |
|---|---|---|
| Anthropic | Claude Pro/Max chat (uses your subscription quota) | Pro/Max |
| ChatGPT (Codex) | OpenAI's ChatGPT — separate from the OpenAI API | ChatGPT Plus / Pro / Team |
| GitHub Copilot | Copilot's chat completions endpoint | Copilot Individual / Business |
| Google Antigravity | Google's coding-focused product | Antigravity access |
| Google Gemini CLI | Gemini's CLI-tier auth | Google account |

::: warning ChatGPT ≠ OpenAI API, Copilot ≠ OpenAI API
The OAuth-only products are different services from the standard provider APIs in the wizard. ChatGPT (via OAuth) hits OpenAI's chat endpoints with your subscription quota; the OpenAI API key in the wizard hits the developer endpoints with metered billing. They're not interchangeable. Pick the one that matches what you're paying for.
:::

## First-run recipes

### "I have an API key" (most common)

```bash
tradecli setup
# Pick a provider in the wizard, paste your key, done.
```

One command. The wizard runs `setup` end-to-end including LLM auth.

### "I have an Anthropic Pro/Max (or any other subscription)"

```bash
tradecli           # 1. launch the TUI
/login             # 2. inside the TUI: pick Anthropic, complete browser login, then quit
tradecli setup     # 3. re-run setup — finds the OAuth credential and continues
```

Three commands the first time, one command thereafter.

## After authentication

Verify the credential is detected:

```bash
tradecli doctor
```

Look for the `llm-auth` row:

```
✓ llm-auth         Anthropic (auth.json)
```

The detail in parentheses tells you which source the credential came from — `auth.json` (wizard or `/login`), `env: ANTHROPIC_API_KEY` (env var), or `OAuth` (OAuth credential in auth.json).

If the row is `✗ llm-auth         no providers configured`, neither the wizard nor `/login` has been run yet — go back to the [API key path](#api-key-path-tradecli-setup) or the [OAuth path](#oauth-path-login) above.

## Troubleshooting

**The wizard says "no LLM provider configured" but I have `ANTHROPIC_API_KEY` set.**

Check that the env var is exported in the shell that's running tradecli:

```bash
echo "$ANTHROPIC_API_KEY"
```

If the value is empty, your `~/.zshrc` / `~/.bashrc` export isn't being picked up. Open a fresh terminal or `source` the rc file.

**OAuth login in the browser fails or the page shows an error.**

For Anthropic specifically, the SDK's local callback server doesn't always settle cleanly when the browser returns an error. If `/login` hangs after a browser error, press `Esc` to cancel — the prompt should release. Then start over.

**I want to switch providers or remove a saved credential.**

Edit `~/.tradecli/agent/auth.json` directly (it's a small JSON file keyed by provider id) or, for OAuth credentials, type `/logout` inside the TUI to open a picker of currently-logged-in OAuth providers.

**I'm on a remote box (SSH'd in) and the OAuth browser flow can't open.**

The OAuth flow prints a URL you can open on your local machine. After completing login locally, the redirect URL can be pasted back into the prompt. If the local callback server can't reach you (firewall, no port forward), this is the manual fallback.

## What's next

Once your LLM credential is configured:

- **Connect your broker** → [Broker Setup](./broker-setup) — Groww and Zerodha Kite OAuth flows
- **Configure the browser** → [Browser Setup](./browser-setup) — Chrome CDP for platform automation
- **Pick a persona** → [Personas guide](../guides/personas) — what each persona does and when to use it

::: danger Not financial advice
`tradecli` is an educational and analytical tool. Nothing it outputs constitutes a recommendation to buy, sell, or hold any security. Always verify AI outputs against primary sources before trading real capital.
:::
