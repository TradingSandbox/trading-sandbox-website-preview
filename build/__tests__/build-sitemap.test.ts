import { describe, it, expect } from 'vitest';
import { execSync } from 'node:child_process';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildSitemapXml, gitMtimeResolver, SHARED_PAGE_INPUTS } from '../build-sitemap.js';
import type { PageManifestEntry } from '../build-pages.js';

const FIXTURE_MANIFEST: readonly PageManifestEntry[] = [
  { source: 'index.html',         output: 'index.html',         changefreq: 'weekly',  priority: 1.0, indexable: true  },
  { source: 'about/index.html',   output: 'about/index.html',   changefreq: 'monthly', priority: 0.7, indexable: true  },
  { source: 'updates/index.html', output: 'updates/index.html', changefreq: 'weekly',  priority: 0.8, indexable: false, robots: 'noindex, follow' },
  { source: '404.html',           output: '404.html',           changefreq: 'never',   priority: 0.0, indexable: false, robots: 'noindex' },
];

const FIXED_MTIME = '2026-04-26T10:00:00+00:00';
const resolveMtime = () => FIXED_MTIME;

describe('buildSitemapXml', () => {
  it('emits the XML declaration and urlset wrapper', () => {
    const xml = buildSitemapXml(FIXTURE_MANIFEST, 'https://tradecli.in', resolveMtime);
    expect(xml.startsWith('<?xml version="1.0" encoding="UTF-8"?>')).toBe(true);
    expect(xml).toContain('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">');
    expect(xml).toContain('</urlset>');
  });

  it('includes only indexable entries', () => {
    const xml = buildSitemapXml(FIXTURE_MANIFEST, 'https://tradecli.in', resolveMtime);
    expect(xml).toContain('<loc>https://tradecli.in/</loc>');
    expect(xml).toContain('<loc>https://tradecli.in/about/</loc>');
    expect(xml).not.toContain('updates'); // non-indexable
    expect(xml).not.toContain('404'); // non-indexable
  });

  it('emits lastmod, changefreq, priority for every included url', () => {
    const xml = buildSitemapXml(FIXTURE_MANIFEST, 'https://tradecli.in', resolveMtime);
    expect(xml).toContain(`<lastmod>${FIXED_MTIME}</lastmod>`);
    expect(xml).toContain('<changefreq>weekly</changefreq>');
    expect(xml).toContain('<priority>1.0</priority>');
    expect(xml).toContain('<priority>0.7</priority>');
  });

  it('strips trailing index.html from output paths', () => {
    const xml = buildSitemapXml(FIXTURE_MANIFEST, 'https://tradecli.in', resolveMtime);
    expect(xml).toContain('<loc>https://tradecli.in/</loc>');
    expect(xml).toContain('<loc>https://tradecli.in/about/</loc>');
    expect(xml).not.toContain('https://tradecli.in/index.html');
    expect(xml).not.toContain('https://tradecli.in/about/index.html');
  });

  it('uses the given hostname (preview vs prod)', () => {
    const previewXml = buildSitemapXml(
      FIXTURE_MANIFEST,
      'https://tradingsandbox.github.io/trading-sandbox-website-preview',
      resolveMtime,
    );
    expect(previewXml).toContain(
      '<loc>https://tradingsandbox.github.io/trading-sandbox-website-preview/</loc>',
    );
  });

  it('passes the source path to resolveMtime so each entry can have a distinct lastmod', () => {
    const seen: string[] = [];
    buildSitemapXml(FIXTURE_MANIFEST, 'https://tradecli.in', (source) => {
      seen.push(source);
      return FIXED_MTIME;
    });
    expect(seen).toContain('index.html');
    expect(seen).toContain('about/index.html');
    expect(seen).not.toContain('updates/index.html'); // non-indexable, skipped
  });
});

describe('gitMtimeResolver — max across page source + shared inputs', () => {
  it('returns ISO format and is >= each shared input mtime', () => {
    const repoRoot = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
    const resolver = gitMtimeResolver(repoRoot);
    const result = resolver('index.html');

    expect(result).toMatch(/^\d{4}-\d{2}-\d{2}T/);

    // Behavioral assertion: result must be >= every shared input's own mtime.
    // Use the same git format the resolver uses (TZ-normalized via TZ=UTC +
    // --date=iso-strict-local %cd) so the comparison is apples-to-apples.
    for (const sharedFile of SHARED_PAGE_INPUTS) {
      const sharedMtime = execSync(
        `git log -1 --date=iso-strict-local --format=%cd -- ${JSON.stringify(sharedFile)}`,
        { cwd: repoRoot, encoding: 'utf-8', env: { ...process.env, TZ: 'UTC' } },
      ).trim();
      if (sharedMtime) {
        expect(
          result >= sharedMtime,
          `result ${result} should be >= shared ${sharedFile} mtime ${sharedMtime}`,
        ).toBe(true);
      }
    }
  });
});
