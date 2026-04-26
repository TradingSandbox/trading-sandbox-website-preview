---
title: Learner Mode
description: Guided curriculum for trading and investing — chapters, interactive steps, quizzes, and broker-aware examples.
outline: 2
---

# Learner Mode

Learner is a **guided curriculum**, not a free-form chat. It walks through chapters in a track, presents concepts one step at a time, runs quizzes, and has you execute real workflows on TradingView, Groww, or Zerodha as interactive steps. Progress is saved automatically at the chapter and concept level — if you switch away mid-step and come back, Learner resumes where you were.

## How it works

- **Structured flow** — you follow chapters in order, with each chapter split into concepts
- **Interactive steps** — the coach has you click through real TradingView or broker UI, not just read
- **Surface-aware practice** — pick TradingView, Groww, or Zerodha and the `Do` / `Check` steps adapt to that surface
- **Quizzes** — concepts are checked before moving on
- **Pause/resume** — stop a lesson, ask side questions, then continue from the same concept

## Typical prompts

```
Start chapter 1
Continue
/pause        (stop the lesson, just ask questions)
/continue     (resume from current step)
```

## Practice surfaces

Learner combines common teaching content with surface-specific practice:

| Surface | What Learner uses it for |
|---|---|
| TradingView | Chart reading, indicators, watchlists, and market-structure practice |
| Groww | Broker-aware investing and portfolio exercises |
| Zerodha | Broker-aware trading and portfolio exercises |

The teaching concept stays the same across surfaces, but the exact `Do` and `Check` instructions adapt to the platform you selected.

## Switching away and back

::: info Mid-step safety
If you jump to another persona mid-lesson, your step progress is preserved. When you return to Learner, you pick up from the same interactive step.
:::

## Pausing for questions

Use `/pause` when you want to stop the guided flow and ask a side question. Learner keeps the current concept in memory, preserves the answer in chat, and waits until you use `/continue` before opening the next quiz or practice step.

## What's next

- **Picking the right persona after you graduate** → [Personas & Modes](/guides/personas)
- **Broker setup** → [Broker Setup](../getting-started/broker-setup) — required for broker-aware examples
- **Browser setup** → [Browser Setup](../getting-started/browser-setup) — useful for TradingView and broker practice
