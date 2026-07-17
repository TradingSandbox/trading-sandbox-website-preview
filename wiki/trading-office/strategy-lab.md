---
title: Test in Strategy Lab
description: Build, plan, run, judge, and promote durable Trading Office strategy experiments through TradingView.
outline: 2
---

# Test in Strategy Lab

Strategy Lab turns a Trading Office hypothesis into a reproducible experiment. AI helps express the idea and interpret the outcome; compiled code, stored plans, persisted jobs, and one machine-owned judge control what actually ran and what verdict it earned.

## Start an experiment

Use either verified entry point:

- Open `/ideas`, select a captured idea, and choose **Send to Lab**.
- Run `/backtest` and choose **New experiment**.

The second path asks you to describe the experiment. If a required choice such as the universe or entry rule cannot be resolved safely, the workflow asks one focused clarification instead of guessing.

## The five-stage contract

| Stage | Contract |
|---|---|
| **BUILD** | Produce or restore a compiled strategy and fingerprint its exact implementation |
| **PLAN** | Resolve and lock the complete experiment before computation begins |
| **RUN** | Execute bounded chunks and persist every completed result |
| **JUDGE** | Apply one deterministic promising, rejected, or inconclusive verdict |
| **PROMOTE** | Freeze a promising result into a strategy version and propose paper deployment |

## BUILD — make the idea testable

tradecli is the source of truth for strategy implementations; the TradingView chart is the render and simulation target. BUILD follows one of two paths:

- **Reuse** a matching Strategy Library version and restore its saved Pine implementation.
- **Author** a complete Pine strategy for a new hypothesis.

The strategy is compiled on TradingView. The build gate then verifies that the compiled script exposes the inputs the experiment expects to fix or sweep, returns the actual input catalogue, and fingerprints the result.

The workflow does not silently test whichever strategy happened to be open on the chart. On first setup, TradingView may expose one manual **Add to chart** step; after that, the build gate verifies the compiled strategy again.

## PLAN — approve the exact experiment

PLAN resolves and persists a preview containing:

- the pre-test hypothesis;
- fixed and swept parameters;
- symbols and candle timeframes;
- historical horizon or custom date range;
- validation method;
- commission and slippage assumptions;
- ranking metric and minimum trade count;
- finalist, cell, and chunk counts;
- warnings and estimated run time.

The native confirmation dialog starts that exact stored plan only when you approve it. If the strategy fingerprint or any experiment field changes, the plan must be created and approved again.

::: tip Read the warning line
Zero costs, a parameter sweep without validation, type or range mismatches, and a grid near the cell limit are surfaced before approval because each can change how much confidence the result deserves.
:::

## Choose a validation method

| Method | How it behaves |
|---|---|
| **None** | Runs the requested experiment without a chronological validation split |
| **Holdout** | Selects candidates on an earlier training period, then evaluates finalists on a later period |
| **Walk-forward** | Repeats expanding training windows followed by successive unseen test windows |

Test windows do not participate in the initial parameter search. Current promotion ranking evaluates the selected finalists using later history, so describe the outcome as **test-informed selection**, not as a final untouched estimate. Any change inspired by later results belongs in a new hypothesis and job.

## RUN — persisted, resumable evidence

RUN divides the full parameter × symbol × timeframe plan into bounded chunks. Each completed chunk is stored in AI Trading Office before the next begins. Status and results come from that stored job, not from model memory.

In a Trading Office pane, the workflow heartbeat can continue the next due chunk automatically. This deterministic continuation works in both Guided and Autonomous Paper modes. A temporary TradingView failure is retried with backoff; it does not require the agent to invent progress.

Open **Backtest Lab → Jobs** for:

- **Status** — persisted stage and progress, without AI.
- **Results** — specification, leaderboard, validation, and verdict, without AI.
- **Interpret** — an optional AI reading of the stored results.
- **Cancel** — stop a running job and keep its completed chunks.

## JUDGE — one machine verdict

JUDGE returns exactly one of:

- **Promising** — eligible for promotion.
- **Rejected** — the recorded evidence does not pass the gate.
- **Inconclusive** — the evidence is insufficient or unreliable.

AI can explain what survived, what degraded, how costs affected the answer, and what to test next. It cannot override the verdict or mark pipeline stages complete.

## PROMOTE — freeze, then approve

Only a completed job with a promising verdict can be promoted. Promotion creates:

1. a validated strategy version containing the frozen implementation, parameters, exits, universe, fingerprint, lineage, and evidence links; and
2. a proposed **paper** deployment containing its risk limits.

After the promising verdict appears, ask the Trading Office pane to promote that completed job. Rejected and inconclusive jobs stay available as evidence but cannot be promoted.

Use **Backtest Lab → Approvals** to inspect and approve or reject the proposal. Approval is attributed to the active employee, and the evidence gate is checked again. Rejection stops the deployment proposal while preserving the strategy version and experiment evidence.

After approval, the strategy becomes ready for paper operation. Open `/strategies` to inspect the version, review its deployment, and create a risk-sized paper ticket from its stored universe, exit rules, and risk limits.

## What AI owns—and what it does not

| AI helps with | Deterministic systems own |
|---|---|
| Shaping the hypothesis | Compiled strategy fingerprint |
| Authoring or restoring Pine | Immutable plan and approval |
| Explaining results | Chunk progress and stored cells |
| Suggesting a next experiment | Leaderboard and machine verdict |
| Discussing tradeoffs | Promotion and deployment state transitions |

## What's next

- Follow the complete workflow → [Your First Strategy](./quickstart)
- Start with a cleaner claim → [Research and Ideas](./ideas)
- Compare paper behavior with the backtest → [Review and Improve](./review)
- Look up lifecycle terms → [Concepts and Terminology](./concepts)
