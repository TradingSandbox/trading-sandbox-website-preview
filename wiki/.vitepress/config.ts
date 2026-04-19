import { defineConfig, type HeadConfig } from 'vitepress';

const SITE_BASE = process.env.SITE_BASE || '/';
const DOCS_BASE = process.env.DOCS_BASE || '/wiki/';

// VitePress prepends `base:` to any nav link not starting with http(s)://, which
// double-prefixes cross-system links. Using full URLs keeps them intact.
const ORIGIN = process.env.PREVIEW === 'true'
  ? 'https://tradingsandbox.github.io'
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

    nav: [
      { text: 'Personas', link: `${ORIGIN}${SITE_BASE}#personas` },
      { text: 'Features', link: `${ORIGIN}${SITE_BASE}#features` },
      { text: 'Docs', link: `${ORIGIN}${SITE_BASE}wiki/` },
      { text: 'Updates', link: `${ORIGIN}${SITE_BASE}updates/` },
      { text: 'About', link: `${ORIGIN}${SITE_BASE}about/` },
      { text: 'Get Started →', link: `${ORIGIN}${SITE_BASE}wiki/getting-started/quick-start/` },
    ],

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
        items: [{ text: 'Personas', link: '/guides/personas' }],
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
