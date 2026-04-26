import { defineConfig, type HeadConfig } from 'vitepress';
import { execSync } from 'node:child_process';
import { existsSync, statSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

// Cloudflare Web Analytics beacon token. Mirror of CF_BEACON_TOKEN in
// build/build-pages.ts — duplicated here because wiki and main-site builds
// are separate toolchains. If you rotate the token, update BOTH places.
const CF_BEACON_TOKEN = 'e68cb75864084de9afa70a34535a4251';

const SITE_BASE = process.env.SITE_BASE || '/';
const DOCS_BASE = process.env.DOCS_BASE || '/wiki/';

// Env-aware main-site URL for the "tradecli.in" nav item. Preview deploy points
// at the preview fork's landing; prod points at tradecli.in.
const MAIN_SITE_URL = process.env.PREVIEW === 'true'
  ? 'https://tradingsandbox.github.io/trading-sandbox-website-preview/'
  : 'https://tradecli.in';

const head: HeadConfig[] = [
  ['link', { rel: 'icon', type: 'image/svg+xml', href: `${SITE_BASE}assets/favicon.svg` }],
];

if (process.env.PREVIEW === 'true') {
  head.push(['meta', { name: 'robots', content: 'noindex, nofollow' }]);
}

if (process.env.PREVIEW !== 'true' && CF_BEACON_TOKEN) {
  head.push(['script', {
    defer: '',
    src: 'https://static.cloudflareinsights.com/beacon.min.js',
    'data-cf-beacon': JSON.stringify({ token: CF_BEACON_TOKEN }),
  }]);
}

const wikiRoot = dirname(fileURLToPath(import.meta.url)) + '/..'; // wiki/.vitepress → wiki

const wikiMtimeCache = new Map<string, string>();
function wikiGitMtime(sourceRel: string): string {
  const cached = wikiMtimeCache.get(sourceRel);
  if (cached !== undefined) return cached;
  let mtime = '';
  try {
    // %cI hard-codes the committer's tz; --date=iso-strict-local + %cd respects TZ.
    // TZ=UTC normalizes every timestamp to +00:00 so they sort correctly.
    mtime = execSync(
      `git log -1 --date=iso-strict-local --format=%cd -- ${JSON.stringify(sourceRel)}`,
      { cwd: wikiRoot, encoding: 'utf-8', env: { ...process.env, TZ: 'UTC' } },
    ).trim();
  } catch { /* ignored */ }
  if (!mtime) {
    const abs = join(wikiRoot, sourceRel);
    if (existsSync(abs)) mtime = statSync(abs).mtime.toISOString();
  }
  wikiMtimeCache.set(sourceRel, mtime);
  return mtime;
}

export default defineConfig({
  title: 'tradecli wiki',
  description: 'Documentation for the tradecli AI trading assistant.',
  base: DOCS_BASE,
  cleanUrls: true,
  appearance: false,

  head,

  themeConfig: {
    // Hide default siteTitle text — custom brand markup is injected via theme's nav-bar-title-before slot
    siteTitle: false,

    // Single nav item for the main site. Brand mark (wiki slot) links to
    // wiki home; this item handles the "out of the wiki" navigation.
    nav: [
      { text: 'tradecli.in', link: MAIN_SITE_URL },
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
        items: [
          { text: 'Personas & Modes', link: '/guides/personas' },
          { text: 'Learner Mode', link: '/guides/learner' },
          { text: 'Investor', link: '/guides/investor' },
          { text: 'Trader', link: '/guides/trader' },
          { text: 'Portfolio Manager', link: '/guides/portfolio-manager' },
          { text: 'Channels & API', link: '/guides/channels-api' },
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
    transformItems: (items) => items.map((item) => {
      // VitePress passes item.url like '/getting-started/quick-start' (post-base).
      // The corresponding source file is wiki/<url>.md, with index.md for the section root.
      const cleaned = item.url.replace(/^\//, '');
      const candidate = cleaned === '' ? 'index.md' : `${cleaned}.md`;
      const lastmod = wikiGitMtime(candidate);
      return {
        ...item,
        url: `wiki/${cleaned}`,
        lastmod: lastmod || undefined,
      };
    }),
  },
});
