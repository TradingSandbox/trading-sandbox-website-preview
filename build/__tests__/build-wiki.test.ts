import { describe, it, expect } from 'vitest';
import { existsSync, mkdtempSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import {
  WIKI_LEGACY_REDIRECTS,
  copyVitePressDistToDistWiki,
  deriveDocsBase,
  emitWikiLegacyRedirects,
} from '../build-wiki.js';

describe('deriveDocsBase', () => {
  it('appends wiki/ to the site base', () => {
    expect(deriveDocsBase('/')).toBe('/wiki/');
    expect(deriveDocsBase('/trading-sandbox-website-preview/')).toBe('/trading-sandbox-website-preview/wiki/');
    expect(deriveDocsBase('/trading-sandbox-website-preview')).toBe('/trading-sandbox-website-preview/wiki/');
  });

  it('defaults to /wiki/ when siteBase is undefined', () => {
    expect(deriveDocsBase(undefined)).toBe('/wiki/');
  });
});

describe('copyVitePressDistToDistWiki', () => {
  it('replaces old dist/wiki assets instead of merging stale hashed chunks', () => {
    const tmpRoot = mkdtempSync(join(tmpdir(), 'build-wiki-copy-'));
    try {
      mkdirSync(join(tmpRoot, 'wiki/.vitepress/dist/assets/chunks'), { recursive: true });
      mkdirSync(join(tmpRoot, 'dist/wiki/assets/chunks'), { recursive: true });
      writeFileSync(join(tmpRoot, 'wiki/.vitepress/dist/index.html'), '<main>wiki</main>');
      writeFileSync(join(tmpRoot, 'wiki/.vitepress/dist/assets/chunks/fresh.js'), 'fresh');
      writeFileSync(join(tmpRoot, 'dist/wiki/assets/chunks/stale-preview.js'), 'stale');

      copyVitePressDistToDistWiki(tmpRoot);

      expect(existsSync(join(tmpRoot, 'dist/wiki/index.html'))).toBe(true);
      expect(existsSync(join(tmpRoot, 'dist/wiki/assets/chunks/fresh.js'))).toBe(true);
      expect(existsSync(join(tmpRoot, 'dist/wiki/assets/chunks/stale-preview.js'))).toBe(false);
    } finally {
      rmSync(tmpRoot, { recursive: true, force: true });
    }
  });
});

describe('emitWikiLegacyRedirects', () => {
  it('redirects every Hedge Fund guide route after the wiki output is copied', () => {
    const tmpRoot = mkdtempSync(join(tmpdir(), 'build-wiki-redirects-'));
    try {
      emitWikiLegacyRedirects(tmpRoot, '/');

      expect(WIKI_LEGACY_REDIRECTS).toHaveLength(10);
      const overview = readFileSync(join(tmpRoot, 'dist/wiki/hedge-fund/index.html'), 'utf-8');
      expect(overview).toContain('url=/wiki/trading-office/');
      expect(overview).toContain('https://tradecli.in/wiki/trading-office/');

      const watches = readFileSync(join(tmpRoot, 'dist/wiki/hedge-fund/watches.html'), 'utf-8');
      expect(watches).toContain('url=/wiki/trading-office/watches');
      expect(watches).toContain('https://tradecli.in/wiki/trading-office/watches');
    } finally {
      rmSync(tmpRoot, { recursive: true, force: true });
    }
  });

  it('uses the GitHub Pages base and hostname for preview redirects', () => {
    const tmpRoot = mkdtempSync(join(tmpdir(), 'build-wiki-preview-redirects-'));
    try {
      emitWikiLegacyRedirects(tmpRoot, '/trading-sandbox-website-preview/');

      const quickstart = readFileSync(join(tmpRoot, 'dist/wiki/hedge-fund/quickstart.html'), 'utf-8');
      expect(quickstart).toContain('url=/trading-sandbox-website-preview/wiki/trading-office/quickstart');
      expect(quickstart).toContain('https://tradingsandbox.github.io/trading-sandbox-website-preview/wiki/trading-office/quickstart');
    } finally {
      rmSync(tmpRoot, { recursive: true, force: true });
    }
  });
});
