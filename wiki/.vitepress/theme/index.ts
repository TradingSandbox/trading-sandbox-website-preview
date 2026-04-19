import DefaultTheme from 'vitepress/theme';
import { h } from 'vue';
import './custom.css';

// Custom brand in navbar: "trade" green + "cli" primary + "/ wiki" muted — matches landing nav style.
// Uses VitePress's `nav-bar-title-before` slot to inject markup before the default siteTitle (which we hide via CSS).
export default {
  extends: DefaultTheme,
  Layout: () =>
    h(DefaultTheme.Layout, null, {
      'nav-bar-title-before': () =>
        h(
          'span',
          { class: 'brand-mark', style: 'font-family: \'JetBrains Mono\', monospace; font-weight: 700; letter-spacing: -0.02em;' },
          [
            h('span', { style: 'color: var(--green);' }, 'trade'),
            h('span', { style: 'color: var(--text-primary);' }, 'cli'),
            h(
              'span',
              { style: 'color: var(--text-muted); margin-left: 0.4em; font-weight: 400;' },
              '/ wiki',
            ),
          ],
        ),
    }),
};
