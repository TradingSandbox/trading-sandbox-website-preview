import { execSync } from 'node:child_process';
import { existsSync, readFileSync, readdirSync, rmSync, statSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { beforeAll, describe, expect, test } from 'vitest';

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = join(__dirname, '..', '..');
const DIST = join(REPO_ROOT, 'dist');

function countMatchesInDist(needle: string): number {
  if (!existsSync(DIST)) return 0;
  let count = 0;
  function walk(dir: string): void {
    for (const entry of readdirSync(dir)) {
      const p = join(dir, entry);
      if (statSync(p).isDirectory()) walk(p);
      else if (entry.endsWith('.html')) {
        const content = readFileSync(p, 'utf-8');
        const matches = content.match(new RegExp(needle, 'g'));
        if (matches) count += matches.length;
      }
    }
  }
  walk(DIST);
  return count;
}

describe('smoke: analytics injection end-to-end', () => {
  test(
    'prod build injects beacon into every surface; preview build injects nothing',
    () => {
      // IMPORTANT: the preview workflow sets PREVIEW=true at the workflow env
      // level. If execSync inherited that, the prod-path build below would
      // silently run in preview mode and this test would always fail in
      // preview CI. Strip PREVIEW from the base env; re-inject only for the
      // preview-path build.
      const baseEnv = { ...process.env };
      delete baseEnv.PREVIEW;

      // --- Preview-path build ---
      rmSync(DIST, { recursive: true, force: true });
      execSync('npm run build', {
        stdio: 'inherit',
        cwd: REPO_ROOT,
        env: { ...baseEnv, PREVIEW: 'true' },
      });
      expect(countMatchesInDist('cloudflareinsights')).toBe(0);

      // --- Prod-path build ---
      rmSync(DIST, { recursive: true, force: true });
      execSync('npm run build', {
        stdio: 'inherit',
        cwd: REPO_ROOT,
        env: baseEnv,
      });
      expect(countMatchesInDist('cloudflareinsights')).toBeGreaterThan(0);

      // Every static page must receive the BODY_END fragment:
      for (const page of [
        'dist/index.html',
        'dist/about/index.html',
        'dist/updates/index.html',
        'dist/404.html',
      ]) {
        expect(readFileSync(join(REPO_ROOT, page), 'utf-8')).toContain('cloudflareinsights');
      }

      // Wiki: at least one rendered wiki page carries the script:
      const wikiDir = join(DIST, 'wiki');
      expect(existsSync(wikiDir)).toBe(true);
      const wikiHasBeacon = readdirSync(wikiDir).some(
        f => f.endsWith('.html') && readFileSync(join(wikiDir, f), 'utf-8').includes('cloudflareinsights'),
      );
      expect(wikiHasBeacon).toBe(true);
    },
    120_000, // 2-minute timeout — two full VitePress-inclusive builds.
  );
});

describe('smoke: sitemap.xml — prod build', () => {
  beforeAll(() => {
    const baseEnv = { ...process.env };
    delete baseEnv.PREVIEW;
    delete baseEnv.SITE_BASE; // force prod hostname

    rmSync(DIST, { recursive: true, force: true });
    execSync('npm run build', { stdio: 'inherit', cwd: REPO_ROOT, env: baseEnv });
  }, 180_000);

  test('emits dist/sitemap.xml with indexable manifest entries', () => {
    const xml = readFileSync(join(DIST, 'sitemap.xml'), 'utf-8');
    expect(xml).toContain('<loc>https://tradecli.in/</loc>');
    expect(xml).toContain('<loc>https://tradecli.in/about/</loc>');
  });

  test('excludes non-indexable entries (updates, 404)', () => {
    const xml = readFileSync(join(DIST, 'sitemap.xml'), 'utf-8');
    expect(xml).not.toMatch(/updates/);
    expect(xml).not.toMatch(/404\.html/);
    expect(xml).not.toContain('<priority>0.0</priority>'); // 404's priority — confirms exclusion
  });

  test('every <url> carries lastmod, changefreq, priority', () => {
    const xml = readFileSync(join(DIST, 'sitemap.xml'), 'utf-8');
    const urlBlocks = xml.match(/<url>[\s\S]*?<\/url>/g) ?? [];
    expect(urlBlocks.length).toBe(2);
    for (const block of urlBlocks) {
      expect(block).toMatch(/<lastmod>\d{4}-\d{2}-\d{2}T/);
      expect(block).toMatch(/<changefreq>/);
      expect(block).toMatch(/<priority>/);
    }
  });

  test('wiki sitemap carries <lastmod> on every <url>', () => {
    const wikiSitemap = readFileSync(join(DIST, 'wiki', 'sitemap.xml'), 'utf-8');
    const urlBlocks = wikiSitemap.match(/<url>[\s\S]*?<\/url>/g) ?? [];
    expect(urlBlocks.length).toBeGreaterThan(0);
    for (const block of urlBlocks) {
      expect(block).toMatch(/<lastmod>/);
    }
  });
});

describe('smoke: sitemap.xml — preview build', () => {
  beforeAll(() => {
    const baseEnv = { ...process.env };
    delete baseEnv.PREVIEW;

    rmSync(DIST, { recursive: true, force: true });
    execSync('npm run build', {
      stdio: 'inherit',
      cwd: REPO_ROOT,
      // PREVIEW='true' is REQUIRED — without it, the build runs in prod mode
      // and PREVIEW_ROBOTS would not be injected, breaking Chunk 2's robots
      // assertions on this same beforeAll. Match the existing analytics test's
      // preview env at the top of this file.
      env: { ...baseEnv, PREVIEW: 'true', SITE_BASE: '/trading-sandbox-website-preview/' },
    });
  }, 180_000);

  test('uses preview hostname in <loc>, not tradecli.in', () => {
    const xml = readFileSync(join(DIST, 'sitemap.xml'), 'utf-8');
    expect(xml).toContain('<loc>https://tradingsandbox.github.io/trading-sandbox-website-preview/</loc>');
    expect(xml).not.toContain('https://tradecli.in/');
  });
});
