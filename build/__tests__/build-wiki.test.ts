import { describe, it, expect } from 'vitest';
import { existsSync, mkdtempSync, mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { copyVitePressDistToDistWiki, deriveDocsBase } from '../build-wiki.js';

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
