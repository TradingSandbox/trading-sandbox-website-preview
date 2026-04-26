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

  test('every built page has exactly one well-formed canonical link', () => {
    const pages = ['dist/index.html', 'dist/about/index.html', 'dist/updates/index.html', 'dist/404.html'];
    for (const page of pages) {
      const html = readFileSync(join(REPO_ROOT, page), 'utf-8');
      const canonicals = html.match(/<link rel="canonical"[^>]*>/g) ?? [];
      expect(canonicals.length).toBe(1);
      // Well-formed: starts with https://, has a real host, no localhost
      const hrefMatch = canonicals[0]!.match(/href="([^"]+)"/);
      expect(hrefMatch).not.toBeNull();
      const href = hrefMatch![1]!;
      expect(href.startsWith('https://')).toBe(true);
      expect(href).not.toContain('localhost');
      expect(href).not.toMatch(/https:\/\/\//); // empty host
    }
  });

  test('canonical hostname is tradecli.in on prod build', () => {
    const html = readFileSync(join(REPO_ROOT, 'dist/index.html'), 'utf-8');
    expect(html).toContain('<link rel="canonical" href="https://tradecli.in/">');
  });

  test('homepage has 3 JSON-LD blocks; other pages have 2', () => {
    const counts = {
      'dist/index.html': 3,
      'dist/about/index.html': 2,
      'dist/updates/index.html': 2,
      'dist/404.html': 2,
    };
    for (const [page, expected] of Object.entries(counts)) {
      const html = readFileSync(join(REPO_ROOT, page), 'utf-8');
      const blocks = html.match(/<script\s+type="application\/ld\+json">/g) ?? [];
      expect(blocks.length, `${page} JSON-LD block count`).toBe(expected);
    }
  });

  test('every JSON-LD block parses as valid JSON', () => {
    const pages = ['dist/index.html', 'dist/about/index.html', 'dist/updates/index.html', 'dist/404.html'];
    for (const page of pages) {
      const html = readFileSync(join(REPO_ROOT, page), 'utf-8');
      const blocks = [...html.matchAll(/<script\s+type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
      for (const [, body] of blocks) {
        expect(() => JSON.parse(body!), `${page} JSON-LD parse`).not.toThrow();
      }
    }
  });

  test('SoftwareApplication is on homepage only', () => {
    expect(readFileSync(join(REPO_ROOT, 'dist/index.html'), 'utf-8')).toContain('"SoftwareApplication"');
    expect(readFileSync(join(REPO_ROOT, 'dist/about/index.html'), 'utf-8')).not.toContain('SoftwareApplication');
    expect(readFileSync(join(REPO_ROOT, 'dist/404.html'), 'utf-8')).not.toContain('SoftwareApplication');
  });

  test('no duplicate <meta name="robots"> on prod 404 or updates', () => {
    for (const page of ['dist/404.html', 'dist/updates/index.html']) {
      const html = readFileSync(join(REPO_ROOT, page), 'utf-8');
      const robots = html.match(/<meta\s+name="robots"[^>]*>/g) ?? [];
      expect(robots.length, `${page} robots meta count`).toBe(1);
    }
  });

  test('every built wiki page has exactly one canonical pointing to tradecli.in/wiki/...', () => {
    const wikiDir = join(DIST, 'wiki');
    const wikiHtml: string[] = [];
    function walk(dir: string): void {
      for (const entry of readdirSync(dir)) {
        const p = join(dir, entry);
        if (statSync(p).isDirectory()) walk(p);
        // VitePress auto-generates 404.html with no markdown source, so
        // transformPageData (which injects the canonical) never runs for it.
        // A 404 page semantically should not advertise a canonical anyway.
        else if (entry.endsWith('.html') && entry !== '404.html') wikiHtml.push(p);
      }
    }
    walk(wikiDir);
    expect(wikiHtml.length).toBeGreaterThan(0);

    for (const file of wikiHtml) {
      const html = readFileSync(file, 'utf-8');
      const canonicals = html.match(/<link rel="canonical"[^>]*>/g) ?? [];
      expect(canonicals.length, `${file} canonical count`).toBe(1);
      expect(canonicals[0]).toMatch(/href="https:\/\/tradecli\.in\/wiki\//);
    }
  });

  test('every marketing page has exactly one <main> wrapping content between nav and footer', () => {
    const pages = ['dist/index.html', 'dist/about/index.html', 'dist/updates/index.html', 'dist/404.html'];
    for (const page of pages) {
      const html = readFileSync(join(REPO_ROOT, page), 'utf-8');
      const opens = html.match(/<main\b[^>]*>/g) ?? [];
      const closes = html.match(/<\/main>/g) ?? [];
      expect(opens.length, `${page} <main> opens`).toBe(1);
      expect(closes.length, `${page} </main> closes`).toBe(1);
      // <main> must open before the first <section> and close after the last:
      const mainOpenIdx = html.indexOf('<main');
      const mainCloseIdx = html.lastIndexOf('</main>');
      const firstSection = html.indexOf('<section');
      const lastSection = html.lastIndexOf('</section>');
      if (firstSection !== -1) {
        expect(mainOpenIdx, `${page} <main> before first <section>`).toBeLessThan(firstSection);
        expect(mainCloseIdx, `${page} </main> after last </section>`).toBeGreaterThan(lastSection);
      }
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

  test('preview build has exactly one <meta robots> per page (PREVIEW_ROBOTS only)', () => {
    for (const page of ['dist/index.html', 'dist/about/index.html', 'dist/updates/index.html', 'dist/404.html']) {
      const html = readFileSync(join(REPO_ROOT, page), 'utf-8');
      const robots = html.match(/<meta\s+name="robots"[^>]*>/g) ?? [];
      expect(robots.length, `${page} preview robots count`).toBe(1);
      expect(robots[0]).toContain('noindex, nofollow'); // PREVIEW_ROBOTS variant
    }
  });

  test('preview build canonical uses preview hostname', () => {
    const html = readFileSync(join(REPO_ROOT, 'dist/index.html'), 'utf-8');
    expect(html).toContain('<link rel="canonical" href="https://tradingsandbox.github.io/trading-sandbox-website-preview/">');
  });
});
