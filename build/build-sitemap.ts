import { execSync } from 'node:child_process';
import { writeFileSync, statSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { PAGES_MANIFEST, type PageManifestEntry } from './build-pages.js';

export type MtimeResolver = (sourceRel: string) => string;

/** Strips trailing 'index.html' so '/about/index.html' → '/about/' and 'index.html' → '/'. */
function outputToUrlPath(output: string): string {
  if (output === 'index.html') return '/';
  if (output.endsWith('/index.html')) return '/' + output.slice(0, -'index.html'.length);
  return '/' + output;
}

export function buildSitemapXml(
  manifest: readonly PageManifestEntry[],
  hostname: string,
  resolveMtime: MtimeResolver,
): string {
  const urls = manifest
    .filter((entry) => entry.indexable)
    .map((entry) => {
      const loc = `${hostname}${outputToUrlPath(entry.output)}`;
      const lastmod = resolveMtime(entry.source);
      return [
        '  <url>',
        `    <loc>${loc}</loc>`,
        `    <lastmod>${lastmod}</lastmod>`,
        `    <changefreq>${entry.changefreq}</changefreq>`,
        `    <priority>${entry.priority.toFixed(1)}</priority>`,
        '  </url>',
      ].join('\n');
    })
    .join('\n');

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    urls,
    '</urlset>',
    '',
  ].join('\n');
}

/** Files shared across every marketing page — a change to any of these
 *  changes the rendered output of every page, so each entry's <lastmod>
 *  must reflect the most recent change across (its source) U (these).
 *  CSS files are excluded — visual-only changes don't justify recrawl. */
export const SHARED_PAGE_INPUTS: readonly string[] = [
  'shared/head-base.html',
  'shared/nav.html',
  'shared/footer.html',
];

/** Last-commit ISO timestamp for one file. Empty string if neither git nor
 *  the filesystem can resolve it (caller decides what to do with empty). */
function singleFileMtime(repoRoot: string, fileRel: string): string {
  try {
    // %cI hard-codes the committer's tz at commit time and ignores TZ env.
    // --date=iso-strict-local + %cd respects TZ, so TZ=UTC normalizes every
    // timestamp to +00:00, which is what makes the lex-compare in
    // gitMtimeResolver actually correct across mixed-tz committers.
    const out = execSync(
      `git log -1 --date=iso-strict-local --format=%cd -- ${JSON.stringify(fileRel)}`,
      {
        cwd: repoRoot,
        encoding: 'utf-8',
        env: { ...process.env, TZ: 'UTC' },
      },
    ).trim();
    if (out) return out;
  } catch { /* fall through */ }
  try {
    return statSync(join(repoRoot, fileRel)).mtime.toISOString();
  } catch {
    return '';
  }
}

/** Returns the max ISO mtime across [sourceRel, ...SHARED_PAGE_INPUTS].
 *  ISO 8601 strings sort lexicographically by time, so plain string compare works.
 *  git is invoked with TZ=UTC so all timestamps share the +00:00 offset, which is
 *  what makes lex compare correct. */
export function gitMtimeResolver(repoRoot: string): MtimeResolver {
  // Pre-resolve shared inputs once per build — they don't depend on the page.
  const sharedMtimes = SHARED_PAGE_INPUTS.map((f) => singleFileMtime(repoRoot, f)).filter(Boolean);
  return (sourceRel) => {
    const all = [singleFileMtime(repoRoot, sourceRel), ...sharedMtimes].filter(Boolean);
    if (all.length === 0) return new Date().toISOString(); // last-resort fallback
    return all.reduce((max, cur) => (cur > max ? cur : max));
  };
}

function resolveHostname(siteBase: string | undefined): string {
  if (!siteBase || siteBase === '/') return 'https://tradecli.in';
  // Preview: SITE_BASE = '/trading-sandbox-website-preview/'
  return `https://tradingsandbox.github.io${siteBase.replace(/\/$/, '')}`;
}

function main(): void {
  const __dirname = dirname(fileURLToPath(import.meta.url));
  const repoRoot = join(__dirname, '..');
  const hostname = resolveHostname(process.env.SITE_BASE);
  const xml = buildSitemapXml(PAGES_MANIFEST, hostname, gitMtimeResolver(repoRoot));
  const outPath = join(repoRoot, 'dist', 'sitemap.xml');
  writeFileSync(outPath, xml);
  console.log(`built: dist/sitemap.xml (${PAGES_MANIFEST.filter((p) => p.indexable).length} urls, hostname=${hostname})`);
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}
