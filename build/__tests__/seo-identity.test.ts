import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const repoRoot = join(import.meta.dirname, '..', '..');

function readSiteFile(path: string): string {
  return readFileSync(join(repoRoot, path), 'utf-8');
}

function jsonLdBlocks(html: string): unknown[] {
  const blockRegex = /<script\s+type="application\/ld\+json">([\s\S]*?)<\/script>/g;
  return Array.from(html.matchAll(blockRegex), (match) => JSON.parse(match[1]!));
}

describe('SEO identity signals', () => {
  it('marks tradecli as a stable organization and website entity', () => {
    const blocks = jsonLdBlocks(readSiteFile('shared/head-base.html'));
    const organization = blocks.find((block) => (block as { '@type'?: string })['@type'] === 'Organization') as Record<string, unknown>;
    const website = blocks.find((block) => (block as { '@type'?: string })['@type'] === 'WebSite') as Record<string, unknown>;

    expect(organization['@id']).toBe('https://tradecli.in/#organization');
    expect(organization.url).toBe('https://tradecli.in/');
    expect(organization.alternateName).toContain('tradecli.in');
    expect(organization.description).toContain('tradecli publishes the local-first, agent-native trading OS');
    expect(organization.description).not.toContain('official website');

    expect(website['@id']).toBe('https://tradecli.in/#website');
    expect(website.url).toBe('https://tradecli.in/');
    expect(website.description).toContain('tradecli.in is the official website for tradecli');
    expect(website.publisher).toEqual({ '@id': 'https://tradecli.in/#organization' });
  });

  it('describes the homepage as the official tradecli software site', () => {
    const home = readSiteFile('index.html');
    const blocks = jsonLdBlocks(home);
    const software = blocks.find((block) => (block as { '@type'?: string })['@type'] === 'SoftwareApplication') as Record<string, unknown>;

    expect(home).toContain('<title>tradecli Official Site');
    expect(software['@id']).toBe('https://tradecli.in/#software');
    expect(software.publisher).toEqual({ '@id': 'https://tradecli.in/#organization' });
    expect(software.softwareHelp).toBe('https://tradecli.in/wiki/');
    expect(software.installUrl).toBe('https://tradecli.in/wiki/getting-started/quick-start');
    expect(software.keywords).toContain('tradecli');
  });

  it('keeps official-site language out of visible homepage product copy', () => {
    const home = readSiteFile('index.html');

    expect(home).toContain('tradecli runs local AI agents across brokers');
    expect(home).not.toContain('tradecli is the official site');
  });

  it('promotes the Office Mode video as the homepage hero product proof', () => {
    const home = readSiteFile('index.html');

    expect(home).toContain('<h1>tradecli</h1>');
    expect(home).toContain('Local-first · Guardrailed');
    expect(home).not.toContain('Built in India · Local-first · Guardrailed by design');
    expect(home).toContain('class="hero-product-video"');
    expect(home).toContain('rel="preload" as="image" href="{{SITE_BASE}}assets/product/tradecli-office-video-poster.jpg" fetchpriority="high"');
    expect(home).toContain('poster="{{SITE_BASE}}assets/product/tradecli-office-video-poster.jpg"');
    expect(home).toContain('src="{{SITE_BASE}}assets/product/tradecli-office-loop.webm"');
    expect(home).toContain('src="{{SITE_BASE}}assets/product/tradecli-office-loop.mp4"');
    expect(home).toContain('data-autoplay-delay="900"');
    expect(home).toContain("window.addEventListener('load'");
    expect(home).toContain('requestIdleCallback');
    expect(home).not.toContain('id="multi-agent-demo"');
  });

  it('keeps homepage navigation targets large enough for touch devices', () => {
    const css = readSiteFile('shared/components.css');

    expect(css).toMatch(/\.nav-links a \{[\s\S]*min-width: 44px;[\s\S]*min-height: 44px;/);
    expect(css).toMatch(/\.nav-social-link \{[\s\S]*width: 44px; height: 44px;/);
    expect(css).toMatch(/\.nav-cta \{[\s\S]*min-height: 44px;/);
    expect(css).toMatch(/\.nav-hamburger \{[\s\S]*width: 44px; height: 44px;/);
  });

  it('stacks the hero video in the narrow viewport layout', () => {
    const css = readSiteFile('shared/components.css');
    const narrowHeroRule = css.match(/@media \(max-width: 768px\) \{[\s\S]*?\.os-hero \.hero-product-shot \{([\s\S]*?)\n  \}/);

    expect(narrowHeroRule?.[1]).toContain('position: relative;');
    expect(narrowHeroRule?.[1]).not.toContain('bottom:');
  });

  it('keeps the desktop hero video as the cinematic background product proof', () => {
    const css = readSiteFile('shared/components.css');
    const osHeroShotRule = css.match(/\.os-hero \.hero-product-shot \{([\s\S]*?)\n\}/);

    expect(osHeroShotRule?.[1]).toContain('position: absolute;');
    expect(osHeroShotRule?.[1]).toContain('z-index: 0;');
    expect(osHeroShotRule?.[1]).toContain('bottom: 22px;');
  });

  it('adds a dedicated readability scrim for video-backed hero copy', () => {
    const css = readSiteFile('shared/components.css');

    expect(css).toContain('.os-hero .container::before');
    expect(css).toMatch(/\.os-hero p \{[\s\S]*color: rgba\(248,250,252,0\.92\);/);
  });

  it('constrains centered hero copy so it wraps inside mobile Chrome viewports', () => {
    const css = readSiteFile('shared/components.css');
    const heroContainerRule = css.match(/\.os-hero \.container \{([\s\S]*?)\n\}/);
    const heroTitleRule = css.match(/\.os-hero h1 \{([\s\S]*?)\n\}/);
    const heroCopyRule = css.match(/\.os-hero p \{([\s\S]*?)\n\}/);

    expect(heroContainerRule?.[1]).toContain('box-sizing: border-box;');
    expect(heroTitleRule?.[1]).toContain('width: 100%;');
    expect(heroTitleRule?.[1]).toContain('max-width: 920px;');
    expect(heroCopyRule?.[1]).toContain('width: 100%;');
    expect(heroCopyRule?.[1]).toContain('max-width: 760px;');
  });

  it('links priority crawl targets from the homepage', () => {
    const home = readSiteFile('index.html');

    expect(home).toContain('href="{{SITE_BASE}}wiki/"');
    expect(home).toContain('href="{{SITE_BASE}}wiki/getting-started/quick-start"');
    expect(home).toContain('href="{{SITE_BASE}}updates/"');
    expect(home).toContain('href="{{SITE_BASE}}about/"');
    expect(home).not.toContain('href="{{SITE_BASE}}privacy/"');
  });

  it('advertises the root favicon URL crawlers request by default', () => {
    const head = readSiteFile('shared/head-base.html');

    expect(head).toContain('href="{{SITE_BASE}}favicon.ico"');
  });

  it('versions local CSS URLs so Chrome does not keep stale hero styles', () => {
    const head = readSiteFile('shared/head-base.html');

    expect(head).toContain('href="{{SITE_BASE}}assets/tokens.css?v={{ASSET_VERSION}}"');
    expect(head).toContain('href="{{SITE_BASE}}assets/components.css?v={{ASSET_VERSION}}"');
  });

  it('publishes a sitelink-focused SiteNavigationElement without privacy', () => {
    const blocks = jsonLdBlocks(readSiteFile('shared/head-base.html'));
    const navigation = blocks.find((block) => (block as { '@type'?: string })['@type'] === 'SiteNavigationElement') as Record<string, unknown>;

    expect(navigation['@id']).toBe('https://tradecli.in/#site-navigation');
    expect(navigation.name).toEqual(['Docs', 'Quick Start', 'Updates', 'About']);
    expect(navigation.url).toEqual([
      'https://tradecli.in/wiki/',
      'https://tradecli.in/wiki/getting-started/quick-start',
      'https://tradecli.in/updates/',
      'https://tradecli.in/about/',
    ]);
    expect(JSON.stringify(navigation)).not.toContain('/privacy/');
  });

  it('adds stable tradecli entity signals to the wiki config', () => {
    const wikiConfig = readSiteFile('wiki/.vitepress/config.ts');

    expect(wikiConfig).toContain('https://tradecli.in/#organization');
    expect(wikiConfig).toContain('https://tradecli.in/#website');
    expect(wikiConfig).toContain('tradecli.in');
  });
});
