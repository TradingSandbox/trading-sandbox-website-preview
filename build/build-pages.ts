import { readFileSync, writeFileSync, mkdirSync, cpSync, existsSync } from 'node:fs';
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
    console.warn(`skipping missing source: ${sourceRel}`);
    return;
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

export const PAGES_MANIFEST: readonly PageManifestEntry[] = [
  { source: 'index.html',         output: 'index.html',         changefreq: 'weekly',  priority: 1.0, indexable: true  },
  { source: 'about/index.html',   output: 'about/index.html',   changefreq: 'monthly', priority: 0.7, indexable: true  },
  { source: 'updates/index.html', output: 'updates/index.html', changefreq: 'weekly',  priority: 0.8, indexable: false, robots: 'noindex, follow' }, // placeholder content; lift when first real entry ships, see spec §4.5
  { source: '404.html',           output: '404.html',           changefreq: 'never',   priority: 0.0, indexable: false, robots: 'noindex' },
];

function main(): void {
  const __dirname = dirname(fileURLToPath(import.meta.url));
  const repoRoot = join(__dirname, '..');
  const siteBase = process.env.SITE_BASE ?? '/';
  const isPreview = process.env.PREVIEW === 'true';
  const previewRobots = isPreview ? '<meta name="robots" content="noindex, nofollow">' : '';
  const analyticsSnippet = resolveAnalyticsSnippet(isPreview, CF_BEACON_TOKEN);
  const hostname = resolveHostname(process.env.SITE_BASE);

  guardNoCnameOnMaster(repoRoot);
  for (const entry of PAGES_MANIFEST) {
    buildPageIntoDist(
      repoRoot,
      entry.source,
      entry.output,
      {
        SITE_BASE: siteBase,
        PREVIEW_ROBOTS: previewRobots,
        CANONICAL_URL: resolveCanonicalUrl(entry.output, hostname),
        PAGE_ROBOTS: resolvePageRobots(isPreview, entry.robots),
      },
      {
        BODY_END: analyticsSnippet,
      },
    );
  }
  copySharedCSSToDistAssets(repoRoot);
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}
