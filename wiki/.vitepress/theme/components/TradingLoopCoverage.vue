<script setup lang="ts">
type CoverageState = 'auto' | 'ask' | 'user' | 'none' | 'signal';

const stages = ['Idea', 'Research', 'Test', 'Judge', 'Promote', 'Execute', 'Monitor', 'Review', 'Improve'];

const rows: Array<{
  name: string;
  note: string;
  office?: boolean;
  coverage: CoverageState[];
}> = [
  {
    name: 'Stock tips',
    note: 'One signal',
    coverage: ['signal', 'none', 'none', 'none', 'none', 'user', 'user', 'user', 'user'],
  },
  {
    name: 'Generic AI',
    note: 'Works when asked',
    coverage: ['ask', 'ask', 'ask', 'ask', 'user', 'user', 'user', 'ask', 'ask'],
  },
  {
    name: 'Manual workflow',
    note: 'You move every step',
    coverage: ['user', 'user', 'user', 'user', 'user', 'user', 'user', 'user', 'user'],
  },
  {
    name: 'Trading Office',
    note: 'Works within your rules',
    office: true,
    coverage: ['auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto'],
  },
];

const stateText: Record<CoverageState, string> = {
  auto: 'Auto',
  ask: 'Ask',
  user: 'You',
  none: '—',
  signal: 'Signal',
};

const stateNames: Record<CoverageState, string> = {
  auto: 'automatic',
  ask: 'on request',
  user: 'user',
  none: 'not covered',
  signal: 'signal',
};

const legend: Array<{ state: Exclude<CoverageState, 'signal'>; label: string }> = [
  { state: 'auto', label: 'Automatic' },
  { state: 'ask', label: 'On request' },
  { state: 'user', label: 'User' },
  { state: 'none', label: 'Not covered' },
];
</script>

<template>
  <div class="doc-coverage" role="figure" aria-label="Coverage and automation across the trading loop">
    <div class="doc-coverage-phases" aria-hidden="true">
      <span></span>
      <span class="doc-coverage-phase doc-coverage-phase--discover">Discover</span>
      <span class="doc-coverage-phase doc-coverage-phase--validate">Validate</span>
      <span class="doc-coverage-phase doc-coverage-phase--operate">Operate and learn</span>
    </div>

    <div class="doc-coverage-stages" role="row">
      <span role="columnheader">Approach</span>
      <span v-for="stage in stages" :key="stage" role="columnheader">{{ stage }}</span>
    </div>

    <div class="doc-coverage-return" aria-hidden="true">
      <span>↖</span>
      <em>repeat with what you learned</em>
      <span>↵</span>
    </div>

    <div class="doc-coverage-table" role="table" aria-label="Trading loop coverage by approach">
      <div
        v-for="row in rows"
        :key="row.name"
        class="doc-coverage-row"
        :class="{ 'doc-coverage-row--office': row.office }"
        role="row"
      >
        <div class="doc-coverage-row-label" role="rowheader">
          <strong>{{ row.name }}</strong>
          <span>{{ row.note }}</span>
        </div>
        <span
          v-for="(state, index) in row.coverage"
          :key="stages[index]"
          class="doc-coverage-cell"
          :class="`doc-coverage-cell--${state}`"
          :data-stage="stages[index]"
          role="cell"
          :aria-label="`${stages[index]}: ${stateNames[state]}`"
        >{{ stateText[state] }}</span>
      </div>
    </div>

    <div class="doc-coverage-legend" aria-label="Diagram legend">
      <span v-for="item in legend" :key="item.state">
        <i class="doc-coverage-key" :class="`doc-coverage-key--${item.state}`"></i>{{ item.label }}
      </span>
    </div>

    <div class="doc-coverage-controls">
      <strong>Your role</strong>
      <span>Set the strategy and risk limits</span>
      <span>Approve when required</span>
      <span>Handle exceptions</span>
      <span>Change the rules</span>
    </div>
  </div>
</template>
