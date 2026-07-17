---
title: Review and Improve
description: Compare a Hedge Fund strategy's backtest expectation with its paper journal, then keep, pause, retire, or improve it.
outline: 2
---

# Review and Improve

A backtest is not the end of the strategy lifecycle. Review connects the frozen version, its original evidence, later history, and version-tagged paper trades to one explicit decision.

::: info Available
Strategy snapshots, computed journals, forward checks, employee-attributed reviews, review history, and Keep, Pause, Retire, or Improve outcomes are available in the Hedge Fund Strategy Library.
:::

## Open a strategy's evidence

From a Hedge Fund office pane, run:

```text
/strategies
```

Select the exact version you want to review. Its Library entry keeps the version number, lifecycle status, verdict, and latest deployment state visible.

The available evidence views are:

| Action | What it shows or does |
|---|---|
| **Snapshot** | Frozen hypothesis, parameters, exits, universe, fingerprint, evidence job, lineage, and deployments |
| **Journal** | Version-tagged trades, open and closed counts, wins and losses, and realized P&L |
| **Forward check** | The unchanged rules over history that arrived after promotion |
| **Review** | Backtest expectation beside the paper journal, followed by a recorded decision |
| **Reviews** | Earlier outcomes, hypotheses, paper summaries, and child-version links |

These are version-specific views. Similar strategy names do not merge their evidence.

## Read the paper journal

Choose **Journal** to inspect the paper transactions tagged with this strategy version. The summary is computed from Office records rather than reconstructed from conversation and includes:

- total, open, and closed trades;
- wins and losses;
- realized P&L; and
- each trade's entry quantity, exits, remaining quantity, and realized result.

If no tagged trades exist, the journal says so. For an approved deployment, **Library → Trade** can create a risk-sized paper ticket that carries the strategy version and deployment IDs into the ledger.

## Run a forward check

A forward check re-runs the version's frozen parameters on the post-promotion date range. It is a one-cell experiment with no parameter sweep and no validation split, and it uses the normal plan → confirm → persisted run path.

Forward checks are available when the version has explicit symbols and enough post-promotion history. A scan-defined universe currently needs explicit symbols before this check can run.

Use a forward check to ask, “Did the unchanged rules continue to behave as expected?” Do not tune the frozen version from this result. A proposed change belongs in a child hypothesis.

## Record the review

Choose **Review**. tradecli displays two sides of the comparison:

- **Expectation** — the stored machine verdict and available validation evidence from the original experiment.
- **Paper** — the current version journal summary.

The review warns when there are fewer than ten closed paper trades. You can still record an outcome, but the evidence should be treated conservatively.

Then choose one result:

| Outcome | Effect |
|---|---|
| **Keep** | Preserve the evidence and continue with the version as-is |
| **Pause** | Stop new entries for an applicable deployment; requires a deployment that can be acted on |
| **Retire** | Permanently stop the version and applicable deployment |
| **Improve** | Create a child draft around one typed change hypothesis |

The decision is applied and recorded by the Office. AI does not choose the outcome for you.

## Improve without rewriting history

For **Improve**, enter one change hypothesis, for example:

```text
Stops may be too tight in high-volatility regimes; test an ATR-based stop while keeping entry rules unchanged.
```

The Office clones a child draft linked to the reviewed parent. The parent keeps its original implementation, evidence, paper results, and review. The child must return to Strategy Lab, earn a new machine verdict, and be promoted independently.

This is the central discipline of the review loop: append evidence and create lineage instead of silently tuning a validated strategy.

## Review at useful moments

Review when there is enough paper evidence to compare with the original expectation, after a material regime change, or when a forward check contradicts the backtest. If the paper sample is still thin, record that uncertainty rather than forcing a strong conclusion.

Use **Reviews** to inspect the decision history before starting another experiment. It shows past outcomes and the child version created by an improvement, keeping repeated debates from losing their context.

::: warning TBD — exact-version scheduled execution
Deployment approval does not yet activate a scheduled runner for the frozen version. Pause and Retire still create durable lifecycle decisions, but exact-version autonomous entry generation remains TBD.
:::

## What's next

- See the full lifecycle in one tutorial → [Quickstart: Idea to Reviewed Paper Strategy](./quickstart)
- Turn the next change into a clean hypothesis → [Research and Ideas](./ideas)
- Re-test a child version → [Test in Strategy Lab](./strategy-lab)
