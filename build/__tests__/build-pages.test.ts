import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { mkdtempSync, mkdirSync, writeFileSync, readFileSync, rmSync, existsSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import {
  substituteTokens,
  injectFragments,
  buildPageIntoDist,
  copySharedCSSToDistAssets,
  guardNoCnameOnMaster,
} from '../build-pages.js';

describe('substituteTokens', () => {
  it('replaces {{SITE_BASE}} with the given value', () => {
    const input = '<a href="{{SITE_BASE}}about/">About</a>';
    const result = substituteTokens(input, { SITE_BASE: '/' });
    expect(result).toBe('<a href="/about/">About</a>');
  });

  it('replaces multiple occurrences', () => {
    const input = '<a href="{{SITE_BASE}}a">A</a><a href="{{SITE_BASE}}b">B</a>';
    const result = substituteTokens(input, { SITE_BASE: '/prefix/' });
    expect(result).toBe('<a href="/prefix/a">A</a><a href="/prefix/b">B</a>');
  });

  it('leaves text without tokens unchanged', () => {
    expect(substituteTokens('no tokens here', { SITE_BASE: '/' })).toBe('no tokens here');
  });
});

describe('injectFragments', () => {
  it('replaces @@HEAD_BASE@@ with the head fragment', () => {
    const template = '<head><!-- @@HEAD_BASE@@ --></head>';
    const fragments = { HEAD_BASE: '<meta charset="UTF-8">' };
    expect(injectFragments(template, fragments)).toBe(
      '<head><meta charset="UTF-8"></head>',
    );
  });

  it('replaces @@NAV@@ and @@FOOTER@@ independently', () => {
    const template = '<!-- @@NAV@@ -->body<!-- @@FOOTER@@ -->';
    const fragments = { NAV: '<nav>x</nav>', FOOTER: '<footer>y</footer>' };
    expect(injectFragments(template, fragments)).toBe(
      '<nav>x</nav>body<footer>y</footer>',
    );
  });

  it('leaves unrecognized markers as-is (safety)', () => {
    const template = '<!-- @@UNKNOWN@@ -->';
    expect(injectFragments(template, { NAV: 'x' })).toBe('<!-- @@UNKNOWN@@ -->');
  });
});

describe('buildPageIntoDist (integration)', () => {
  let tmpRoot: string;

  beforeEach(() => {
    tmpRoot = mkdtempSync(join(tmpdir(), 'build-pages-int-'));
    mkdirSync(join(tmpRoot, 'shared'), { recursive: true });
    writeFileSync(join(tmpRoot, 'shared/head-base.html'), '<meta name="generator" content="X">');
    writeFileSync(join(tmpRoot, 'shared/nav.html'), '<nav><a href="{{SITE_BASE}}x">X</a></nav>');
    writeFileSync(join(tmpRoot, 'shared/footer.html'), '<footer>F</footer>');
    writeFileSync(join(tmpRoot, 'shared/tokens.css'), '/* tokens */');
    writeFileSync(join(tmpRoot, 'shared/components.css'), '/* components */');
  });

  afterEach(() => rmSync(tmpRoot, { recursive: true, force: true }));

  it('assembles page with fragments and tokens, emits to dist/', () => {
    writeFileSync(join(tmpRoot, 'index.html'),
      '<!DOCTYPE html><html><head><!-- @@HEAD_BASE@@ --></head><body><!-- @@NAV@@ --><main>hi</main><!-- @@FOOTER@@ --></body></html>');
    buildPageIntoDist(tmpRoot, 'index.html', 'index.html', { SITE_BASE: '/base/' });
    const out = readFileSync(join(tmpRoot, 'dist/index.html'), 'utf-8');
    expect(out).toContain('<meta name="generator" content="X">');
    expect(out).toContain('<a href="/base/x">X</a>');
    expect(out).toContain('<footer>F</footer>');
    expect(out).not.toContain('@@');
    expect(out).not.toContain('{{SITE_BASE}}');
  });

  it('produces dist/404.html when 404.html source body exists', () => {
    writeFileSync(join(tmpRoot, '404.html'),
      '<!DOCTYPE html><html><head><!-- @@HEAD_BASE@@ --><title>404</title></head><body><!-- @@NAV@@ --><h1>Not found</h1></body></html>');
    buildPageIntoDist(tmpRoot, '404.html', '404.html', { SITE_BASE: '/' });
    expect(existsSync(join(tmpRoot, 'dist/404.html'))).toBe(true);
    expect(readFileSync(join(tmpRoot, 'dist/404.html'), 'utf-8')).toContain('<h1>Not found</h1>');
  });

  it('copies shared CSS to dist/assets/', () => {
    copySharedCSSToDistAssets(tmpRoot);
    expect(readFileSync(join(tmpRoot, 'dist/assets/tokens.css'), 'utf-8')).toBe('/* tokens */');
    expect(readFileSync(join(tmpRoot, 'dist/assets/components.css'), 'utf-8')).toBe('/* components */');
  });

  it('guardNoCnameOnMaster exits when CNAME exists', () => {
    writeFileSync(join(tmpRoot, 'CNAME'), 'tradecli.in');
    const exitSpy = vi.spyOn(process, 'exit').mockImplementation(((code?: number) => {
      throw new Error(`exit ${code}`);
    }) as never);
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    expect(() => guardNoCnameOnMaster(tmpRoot)).toThrow('exit 1');
    exitSpy.mockRestore();
    consoleSpy.mockRestore();
  });

  it('injects PREVIEW_ROBOTS meta tag when token value is non-empty', () => {
    writeFileSync(join(tmpRoot, 'shared/head-base.html'), '<meta charset="UTF-8">{{PREVIEW_ROBOTS}}');
    writeFileSync(join(tmpRoot, 'index.html'),
      '<!DOCTYPE html><html><head><!-- @@HEAD_BASE@@ --></head><body><!-- @@NAV@@ --><!-- @@FOOTER@@ --></body></html>');
    buildPageIntoDist(tmpRoot, 'index.html', 'index.html', {
      SITE_BASE: '/',
      PREVIEW_ROBOTS: '<meta name="robots" content="noindex, nofollow">',
    });
    const out = readFileSync(join(tmpRoot, 'dist/index.html'), 'utf-8');
    expect(out).toContain('<meta name="robots" content="noindex, nofollow">');
  });

  it('omits PREVIEW_ROBOTS meta tag when token value is empty (production)', () => {
    writeFileSync(join(tmpRoot, 'shared/head-base.html'), '<meta charset="UTF-8">{{PREVIEW_ROBOTS}}');
    writeFileSync(join(tmpRoot, 'index.html'),
      '<!DOCTYPE html><html><head><!-- @@HEAD_BASE@@ --></head><body><!-- @@NAV@@ --><!-- @@FOOTER@@ --></body></html>');
    buildPageIntoDist(tmpRoot, 'index.html', 'index.html', {
      SITE_BASE: '/',
      PREVIEW_ROBOTS: '',
    });
    const out = readFileSync(join(tmpRoot, 'dist/index.html'), 'utf-8');
    expect(out).not.toContain('noindex');
    expect(out).not.toContain('{{PREVIEW_ROBOTS}}');
  });
});
