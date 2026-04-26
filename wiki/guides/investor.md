---
title: Investor
description: Long-term, fundamentals-first research persona for Indian equities. Discover, analyze, value, compare, review results, test theses.
outline: 2
---

# Investor

Long-term, fundamentals-first research on Indian equities. Investor is built around the investing job: **discover, analyze, value, compare, review results, test a thesis**.

## What it's for

- Stock discovery using clear filters and investing styles: quality, value, growth, and dividend
- Business quality, earnings trend, capital allocation, balance-sheet strength
- Valuation using DCF where it fits, peer multiples otherwise
- Post-results reviews, peer comparisons, and thesis re-checks
- Held-stock reviews that include broker context when you already own the company

Investor is not a generic market chat mode. It routes your request into a workflow and keeps the answer focused on evidence, trade-offs, and what changed.

## Core workflows

| Workflow | Use it for |
|---|---|
| Find stocks | Discover Indian equities using Screener filters and investing styles |
| Deep stock analysis | Understand a company, business quality, financial trend, risks, and valuation context |
| DCF valuation | Estimate intrinsic value where cash-flow valuation makes sense |
| Results review | Check what changed after quarterly or annual results |
| Peer compare | Compare a company with listed peers on quality, growth, margins, and valuation |
| Thesis check | Test whether your original investing thesis still holds |

Discovery can be broad ("find quality compounders") or style-specific ("find dividend stocks with low debt"). Analysis and valuation are company-first. Held-stock review uses broker context more heavily so Investor can tell whether the question is about a new idea or something already in your portfolio.

## Primary tools

- [Screener.in](https://www.screener.in) for discovery filters, fundamentals, peer metrics, annual trends, and quarterly trends
- Groww and Kite MCP tools for current price, holdings context, quote sanity checks, and whether you already own the stock
- News for recent company or sector developments
- Browser as a last resort or when you explicitly ask Investor to navigate a website

Investor is Screener-first for discovery, analysis, and valuation. Broker tools matter most when the question touches your current holdings, prices, margins, or portfolio context.

## Typical prompts

```
Find quality compounders with ROCE > 18% and D/E < 0.5
Find dividend stocks with low debt and stable cash flows
Deep-dive Asian Paints
What's a reasonable intrinsic value for HDFC Life?
Compare INFY vs TCS vs HCLTECH on margins and growth
Q3 results review for Tata Motors — what changed?
Does my ITC thesis still hold?
Review my held stocks and flag where the thesis looks weaker
```

::: warning DCF exclusions
Investor does not run DCF on banks, NBFCs, insurers, or early-stage businesses. For those, it uses peer multiples and earnings trend instead.
:::

## What's next

- **Compare with other personas** → [Personas & Modes](/guides/personas)
- **Connect a broker for held-stock context** → [Broker Setup](../getting-started/broker-setup)
