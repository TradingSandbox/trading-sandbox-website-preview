import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { mkdtempSync, mkdirSync, writeFileSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { copyStaticAssets } from '../copy-static.js';

describe('copyStaticAssets', () => {
  let tmpRoot: string;

  beforeEach(() => {
    tmpRoot = mkdtempSync(join(tmpdir(), 'copy-static-'));
    mkdirSync(join(tmpRoot, 'assets/images'), { recursive: true });
    writeFileSync(join(tmpRoot, 'assets/favicon.ico'), 'FAVICON');
    writeFileSync(join(tmpRoot, 'assets/images/logo.png'), 'LOGO');
    writeFileSync(join(tmpRoot, 'robots.txt'), 'User-agent: *\n');
    writeFileSync(join(tmpRoot, 'sitemap.xml'), '<urlset/>');
  });

  afterEach(() => {
    rmSync(tmpRoot, { recursive: true, force: true });
  });

  it('copies robots.txt, sitemap.xml, and assets/ to dist/', () => {
    copyStaticAssets(tmpRoot);
    expect(readFileSync(join(tmpRoot, 'dist/robots.txt'), 'utf-8')).toBe('User-agent: *\n');
    expect(readFileSync(join(tmpRoot, 'dist/sitemap.xml'), 'utf-8')).toBe('<urlset/>');
    expect(readFileSync(join(tmpRoot, 'dist/assets/favicon.ico'), 'utf-8')).toBe('FAVICON');
    expect(readFileSync(join(tmpRoot, 'dist/assets/images/logo.png'), 'utf-8')).toBe('LOGO');
  });

  it('does NOT touch dist/404.html (owned by build-pages.ts)', () => {
    mkdirSync(join(tmpRoot, 'dist'));
    writeFileSync(join(tmpRoot, 'dist/404.html'), 'ORIGINAL');
    writeFileSync(join(tmpRoot, '404.html'), 'SOURCE_BODY');
    copyStaticAssets(tmpRoot);
    expect(readFileSync(join(tmpRoot, 'dist/404.html'), 'utf-8')).toBe('ORIGINAL');
  });
});
