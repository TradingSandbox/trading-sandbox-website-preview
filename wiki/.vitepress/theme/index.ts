import DefaultTheme from 'vitepress/theme';
import { h } from 'vue';
import './custom.css';

// Brand markup `tradecli / wiki` injected into VPNavBarTitle's slot. VitePress
// wraps this in its own anchor to the wiki root, so clicking the brand goes
// to wiki home. Main-site navigation lives as a separate nav item (configured
// in config.ts) to avoid nested-anchor issues.
//
// `layout-bottom` slot renders a small global contact line under every page.
// Used instead of themeConfig.footer because VitePress hides the theme footer
// on pages with a sidebar (which is all of them).
export default {
  extends: DefaultTheme,
  Layout: () =>
    h(DefaultTheme.Layout, null, {
      'nav-bar-title-before': () =>
        h(
          'span',
          {
            class: 'brand-mark',
            style: 'font-family: \'JetBrains Mono\', monospace; font-weight: 700; letter-spacing: -0.02em;',
          },
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
      'layout-bottom': () =>
        h(
          'div',
          { class: 'tradecli-wiki-contact' },
          [
            'Questions or trouble? ',
            h('a', { href: 'mailto:contact@tradecli.in' }, 'contact@tradecli.in'),
          ],
        ),
    }),
};
