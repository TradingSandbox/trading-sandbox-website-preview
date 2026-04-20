import { defineConfig, type HeadConfig } from 'vitepress';

// Augment DefaultTheme.Config so we can pass `homeUrl` through themeConfig and read
// it in the custom theme (theme/index.ts) via useData().
declare module 'vitepress' {
  namespace DefaultTheme {
    interface Config {
      homeUrl?: string;
    }
  }
}

const SITE_BASE = process.env.SITE_BASE || '/';
const DOCS_BASE = process.env.DOCS_BASE || '/wiki/';

// URL for the brand-mark link (wiki → main site). Env-aware so preview stays
// inside the preview deploy and prod points at tradecli.in.
const HOME_URL = process.env.PREVIEW === 'true'
  ? 'https://tradingsandbox.github.io/trading-sandbox-website-preview/'
  : 'https://tradecli.in';

const head: HeadConfig[] = [
  ['link', { rel: 'icon', type: 'image/svg+xml', href: `${SITE_BASE}assets/favicon.svg` }],
];

if (process.env.PREVIEW === 'true') {
  head.push(['meta', { name: 'robots', content: 'noindex, nofollow' }]);
}

export default defineConfig({
  title: 'tradecli wiki',
  description: 'Documentation for the tradecli AI trading assistant.',
  base: DOCS_BASE,
  cleanUrls: true,

  head,

  themeConfig: {
    // Hide default siteTitle text — custom brand markup is injected via theme's nav-bar-title-before slot
    siteTitle: false,

    // Exposed to the custom theme (read via useData().theme.value.homeUrl) so the
    // brand-mark anchor points at the right main-site origin per environment.
    homeUrl: HOME_URL,

    // Nav intentionally empty — brand mark (in theme slot) links to the main site;
    // sidebar handles intra-wiki navigation.
    nav: [],

    sidebar: [
      {
        text: 'Getting Started',
        items: [
          { text: 'Quick Start', link: '/getting-started/quick-start' },
          { text: 'Broker Setup', link: '/getting-started/broker-setup' },
          { text: 'Browser Setup', link: '/getting-started/browser-setup' },
        ],
      },
      {
        text: 'Guides',
        items: [
          { text: 'Personas & Modes', link: '/guides/personas' },
          { text: 'Learner Mode', link: '/guides/learner' },
          { text: 'Investor', link: '/guides/investor' },
          { text: 'Trader', link: '/guides/trader' },
          { text: 'Portfolio Manager', link: '/guides/portfolio-manager' },
        ],
      },
      {
        text: 'Extending',
        items: [
          { text: 'Skills & Extensions', link: '/extending/skills' },
          { text: 'Channels & API', link: '/extending/channels-api' },
        ],
      },
    ],

    search: {
      provider: 'local',
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/TradingSandbox/TradingSandbox' },
    ],

    outline: [2, 3],
  },

  sitemap: {
    hostname: 'https://tradecli.in',
    // VitePress sitemap emits paths relative to the wiki project root (no base prefix).
    // Prepend /wiki/ so sitemap URLs match deployed prod paths (tradecli.in/wiki/<page>).
    transformItems: (items) => items.map((item) => ({
      ...item,
      url: `wiki/${item.url.replace(/^\//, '')}`,
    })),
  },
});
