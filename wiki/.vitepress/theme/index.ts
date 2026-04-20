import DefaultTheme from 'vitepress/theme';
import { useData } from 'vitepress';
import { h } from 'vue';
import './custom.css';

// Brand markup: `tradecli / wiki` as a split breadcrumb (org/repo style).
//   - "tradecli" (green + primary) → main site (tradecli.in or preview origin)
//   - "wiki" (muted) → wiki root (`/wiki/` or preview-scoped equivalent)
// Both destinations are env-aware: homeUrl comes from themeConfig; wiki root
// from VitePress's own base (site.base).
export default {
  extends: DefaultTheme,
  Layout: () =>
    h(DefaultTheme.Layout, null, {
      'nav-bar-title-before': () => {
        const { theme, site } = useData();
        const homeUrl = (theme.value as { homeUrl?: string }).homeUrl ?? 'https://tradecli.in';
        const wikiUrl = site.value.base;
        return h(
          'span',
          {
            class: 'brand-mark',
            style: 'font-family: \'JetBrains Mono\', monospace; font-weight: 700; letter-spacing: -0.02em;',
          },
          [
            h(
              'a',
              { href: homeUrl, style: 'text-decoration: none; color: inherit;' },
              [
                h('span', { style: 'color: var(--green);' }, 'trade'),
                h('span', { style: 'color: var(--text-primary);' }, 'cli'),
              ],
            ),
            h(
              'span',
              { style: 'color: var(--text-muted); margin: 0 0.4em; font-weight: 400;' },
              '/',
            ),
            h(
              'a',
              {
                href: wikiUrl,
                style: 'text-decoration: none; color: var(--text-muted); font-weight: 400;',
              },
              'wiki',
            ),
          ],
        );
      },
    }),
};
