<script setup lang="ts">
const stages = ['Idea', 'Research', 'Test', 'Decide', 'Execute', 'Monitor', 'Review & improve'];

const comparisons = [
  {
    name: 'Trading Office',
    note: 'Carries context through the loop',
    mode: 'office',
    segments: ['office', 'office', 'office', 'office', 'office', 'office', 'office'],
  },
  {
    name: 'Manual workflow',
    note: 'You move every step',
    mode: 'manual',
    segments: ['user', 'user', 'user', 'user', 'user', 'user', 'user'],
  },
  {
    name: 'Generic AI',
    note: 'Helps when asked; you connect the steps',
    mode: 'assistant',
    segments: ['assist', 'assist', 'assist', 'assist', 'assist', 'assist', 'assist'],
  },
  {
    name: 'Stock tips / chat advice',
    note: 'A signal; you carry the rest',
    mode: 'tips',
    segments: ['signal', 'user', 'user', 'user', 'user', 'user', 'user'],
  },
];
</script>

<template>
  <div class="doc-loop" role="figure" aria-label="Who moves each approach through the trading loop">
    <div class="doc-loop-lanes">
      <div class="doc-loop-lane doc-loop-lane--user">
        <div class="doc-loop-lane-label">
          <strong>You govern</strong>
        </div>
        <div class="doc-loop-governance">
          <span><b>Set</b> the mandate and risk limits</span>
          <i aria-hidden="true">→</i>
          <span><b>Approve</b> required gates and handle exceptions</span>
        </div>
      </div>

      <div class="doc-loop-lane doc-loop-lane--office">
        <div class="doc-loop-lane-label">
          <strong>Trading Office carries the work</strong>
        </div>
        <div class="doc-loop-stage-wrap">
          <ol class="doc-loop-stages" aria-label="The continuous trading loop">
            <li v-for="stage in stages" :key="stage">{{ stage }}</li>
          </ol>
          <span class="doc-loop-repeat" aria-label="Then repeat with what was learned">↺</span>
        </div>
      </div>
    </div>

    <div class="doc-loop-comparison">
      <strong class="doc-loop-comparison-title">Compared with other ways of working</strong>

      <div
        v-for="comparison in comparisons"
        :key="comparison.name"
        class="doc-loop-comparison-row"
        :class="`doc-loop-comparison-row--${comparison.mode}`"
      >
        <div class="doc-loop-comparison-label">
          <strong>{{ comparison.name }}</strong>
          <span>{{ comparison.note }}</span>
        </div>
        <div
          class="doc-loop-rail"
          :class="`doc-loop-rail--${comparison.mode}`"
          :aria-label="`${comparison.name}: ${comparison.note}`"
        >
          <span
            v-for="(segment, index) in comparison.segments"
            :key="stages[index]"
            :class="`doc-loop-segment doc-loop-segment--${segment}`"
            aria-hidden="true"
          ></span>
          <i v-if="comparison.mode === 'office'" class="doc-loop-rail-repeat" aria-hidden="true">↺</i>
        </div>
      </div>
    </div>
  </div>
</template>
