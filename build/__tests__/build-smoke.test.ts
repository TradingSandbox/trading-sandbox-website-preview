import { execSync } from 'node:child_process';
import { existsSync, readFileSync, readdirSync, rmSync, statSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, test } from 'vitest';

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
