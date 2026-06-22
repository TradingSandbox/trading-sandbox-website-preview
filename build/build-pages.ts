import { readFileSync, writeFileSync, mkdirSync, cpSync, existsSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

// Cloudflare Web Analytics beacon token. Client-side-visible (ships in every
// browser's <script> tag), so safe to commit as a constant. Not a secret.
// Rotation path: replace the string, commit, deploy.
export const CF_BEACON_TOKEN = 'e68cb75864084de9afa70a34535a4251';

/**
 * Compute the Cloudflare Web Analytics <script> tag for build-time injection.
 * Returns empty string when preview mode is active OR the token is empty —
 * both gates are honored so the documented rollback (clear the token) works
 * uniformly across main-site and wiki surfaces.
 */
export function resolveAnalyticsSnippet(preview: boolean, token: string): string {
  if (preview || !token) return '';
  return `<script defer src="https://static.cloudflareinsights.com/beacon.min.js" data-cf-beacon='${JSON.stringify({ token })}'></script>`;
}

export function resolvePageRobots(isPreview: boolean, robots: string | undefined): string {
  if (isPreview) return '';
  if (!robots) return '';
  return `<meta name="robots" content="${robots}">`;
}

export function resolveAssetVersion(repoRoot: string): string {
  const explicitVersion = process.env.ASSET_VERSION;
  if (explicitVersion) return encodeURIComponent(explicitVersion);

  const hash = createHash('sha256');
  for (const rel of ['shared/tokens.css', 'shared/components.css']) {
    hash.update(readFileSync(join(repoRoot, rel)));
  }
  return hash.digest('hex').slice(0, 12);
}

export function substituteTokens(
  input: string,
  tokens: Record<string, string>,
): string {
  let result = input;
  for (const [key, value] of Object.entries(tokens)) {
    result = result.replaceAll(`{{${key}}}`, value);
  }
  return result;
}

export function injectFragments(
  template: string,
  fragments: Record<string, string>,
): string {
  let result = template;
  for (const [key, value] of Object.entries(fragments)) {
    const marker = `<!-- @@${key}@@ -->`;
    result = result.replaceAll(marker, value);
  }
  return result;
}

export function resolveHostname(siteBase: string | undefined): string {
  if (!siteBase || siteBase === '/') return 'https://tradecli.in';
  return `https://tradingsandbox.github.io${siteBase.replace(/\/$/, '')}`;
}

export function resolveCanonicalUrl(output: string, hostname: string): string {
  if (output === 'index.html') return `${hostname}/`;
  if (output.endsWith('/index.html')) return `${hostname}/${output.slice(0, -'index.html'.length)}`;
  return `${hostname}/${output}`;
}

export function validateJsonLdBlocks(html: string, sourceLabel: string): void {
  const blockRegex = /<script\s+type="application\/ld\+json">([\s\S]*?)<\/script>/g;
  let match: RegExpExecArray | null;
  let index = 0;
  while ((match = blockRegex.exec(html)) !== null) {
    index++;
    try {
      // The regex has exactly one capture group; when match is non-null it's always defined.
      JSON.parse(match[1]!);
    } catch (e) {
      const reason = e instanceof Error ? e.message : String(e);
      throw new Error(`Invalid JSON-LD in ${sourceLabel} (block #${index}): ${reason}`);
    }
  }
}

export function guardNoCnameOnMaster(repoRoot: string): void {
  if (existsSync(join(repoRoot, 'CNAME'))) {
    console.error('ERROR: CNAME file must not be committed to master. It lives only on gh-pages, written by CI on every deploy.');
    process.exit(1);
  }
}

export function buildPageIntoDist(
  repoRoot: string,
  sourceRel: string,
  outputRel: string,
  tokens: Record<string, string>,
  extraFragments: Record<string, string> = {},
): void {
  const sourcePath = join(repoRoot, sourceRel);
  if (!existsSync(sourcePath)) {
    throw new Error(`Missing page source in manifest: ${sourceRel}`);
  }
  const shared = {
    HEAD_BASE: readFileSync(join(repoRoot, 'shared/head-base.html'), 'utf-8'),
    NAV: readFileSync(join(repoRoot, 'shared/nav.html'), 'utf-8'),
    FOOTER: readFileSync(join(repoRoot, 'shared/footer.html'), 'utf-8'),
    ...extraFragments,
  };
  const rawBody = readFileSync(sourcePath, 'utf-8');
  const withFragments = injectFragments(rawBody, shared);
  const withTokens = substituteTokens(withFragments, tokens);
  validateJsonLdBlocks(withTokens, outputRel);
  const outPath = join(repoRoot, 'dist', outputRel);
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, withTokens);
  console.log(`built: ${outputRel}`);
}

export function copySharedCSSToDistAssets(repoRoot: string): void {
  const srcDir = join(repoRoot, 'shared');
  const destDir = join(repoRoot, 'dist/assets');
  mkdirSync(destDir, { recursive: true });
  cpSync(join(srcDir, 'tokens.css'), join(destDir, 'tokens.css'));
  cpSync(join(srcDir, 'components.css'), join(destDir, 'components.css'));
  console.log('copied: shared/tokens.css + components.css → dist/assets/');
}

export interface PageManifestEntry {
  source: string;
  output: string;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: number;
  indexable: boolean;
  /** Per-page <meta name="robots"> directive. Emitted only when PREVIEW !== 'true'
   *  (PREVIEW_ROBOTS already covers the whole site on preview builds). See spec §4.5. */
  robots?: string;
}

export interface RedirectManifestEntry {
  output: string;
  target: string;
}

export const PAGES_MANIFEST: readonly PageManifestEntry[] = [
  { source: 'index.html',         output: 'index.html',         changefreq: 'weekly',  priority: 1.0, indexable: true  },
  { source: 'about/index.html',   output: 'about/index.html',   changefreq: 'monthly', priority: 0.7, indexable: true  },
  { source: 'updates/index.html', output: 'updates/index.html', changefreq: 'weekly',  priority: 0.8, indexable: true  },
  { source: 'privacy/index.html', output: 'privacy/index.html', changefreq: 'yearly',  priority: 0.4, indexable: true  },
  { source: '404.html',           output: '404.html',           changefreq: 'never',   priority: 0.0, indexable: false, robots: 'noindex' },
];

export const LEGACY_REDIRECTS: readonly RedirectManifestEntry[] = [
  { output: 'getting-started/broker-setup/index.html', target: 'wiki/getting-started/broker-setup' },
  { output: 'getting-started/browser-setup/index.html', target: 'wiki/getting-started/browser-setup' },
  { output: 'getting-started/llm-setup/index.html', target: 'wiki/getting-started/llm-setup' },
  { output: 'getting-started/quick-start/index.html', target: 'wiki/getting-started/quick-start' },
  { output: 'guides/channels-api/index.html', target: 'wiki/guides/channels-api' },
  { output: 'guides/investor/index.html', target: 'wiki/guides/investor' },
  { output: 'guides/learner/index.html', target: 'wiki/guides/learner' },
  { output: 'guides/personas/index.html', target: 'wiki/guides/personas' },
  { output: 'guides/portfolio-manager/index.html', target: 'wiki/guides/portfolio-manager' },
  { output: 'guides/pro-trader/index.html', target: 'wiki/guides/trader' },
  { output: 'guides/trader/index.html', target: 'wiki/guides/trader' },
  { output: 'extending/channels-api/index.html', target: 'wiki/guides/channels-api' },
  { output: 'extending/skills/index.html', target: 'wiki/' },
  { output: 'wiki/extending/skills/index.html', target: 'wiki/' },
];

export function buildRedirectPageIntoDist(
  repoRoot: string,
  outputRel: string,
  targetPath: string,
  canonicalUrl: string,
): void {
  const outPath = join(repoRoot, 'dist', outputRel);
  mkdirSync(dirname(outPath), { recursive: true });
  const targetScript = JSON.stringify(targetPath);
  writeFileSync(outPath, `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Redirecting to tradecli docs</title>
  <link rel="canonical" href="${canonicalUrl}">
  <meta http-equiv="refresh" content="0; url=${targetPath}">
</head>
<body>
  <p>Redirecting to <a href="${targetPath}">${canonicalUrl}</a>.</p>
  <script>location.replace(${targetScript});</script>
</body>
</html>
`);
  console.log(`built redirect: ${outputRel} → ${targetPath}`);
}

function main(): void {
  const __dirname = dirname(fileURLToPath(import.meta.url));
  const repoRoot = join(__dirname, '..');
  const siteBase = process.env.SITE_BASE ?? '/';
  const isPreview = process.env.PREVIEW === 'true';
  const previewRobots = isPreview ? '<meta name="robots" content="noindex, nofollow">' : '';
  const analyticsSnippet = resolveAnalyticsSnippet(isPreview, CF_BEACON_TOKEN);
  const hostname = resolveHostname(process.env.SITE_BASE);
  const assetVersion = resolveAssetVersion(repoRoot);

  guardNoCnameOnMaster(repoRoot);
  for (const entry of PAGES_MANIFEST) {
    buildPageIntoDist(
      repoRoot,
      entry.source,
      entry.output,
      {
        SITE_BASE: siteBase,
        ASSET_VERSION: assetVersion,
        PREVIEW_ROBOTS: previewRobots,
        CANONICAL_URL: resolveCanonicalUrl(entry.output, hostname),
        PAGE_ROBOTS: resolvePageRobots(isPreview, entry.robots),
      },
      {
        BODY_END: analyticsSnippet,
      },
    );
  }
  for (const entry of LEGACY_REDIRECTS) {
    buildRedirectPageIntoDist(
      repoRoot,
      entry.output,
      `${siteBase}${entry.target}`,
      `${hostname}/${entry.target}`,
    );
  }
  copySharedCSSToDistAssets(repoRoot);
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}
