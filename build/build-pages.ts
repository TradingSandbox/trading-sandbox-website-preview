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

const PAGES = [
  { source: 'index.html', output: 'index.html' },
  { source: 'about/index.html', output: 'about/index.html' },
  { source: 'updates/index.html', output: 'updates/index.html' },
  { source: '404.html', output: '404.html' },
];

function main(): void {
  const __dirname = dirname(fileURLToPath(import.meta.url));
  const repoRoot = join(__dirname, '..');
  const siteBase = process.env.SITE_BASE ?? '/';
  const isPreview = process.env.PREVIEW === 'true';
  const previewRobots = isPreview ? '<meta name="robots" content="noindex, nofollow">' : '';
  const analyticsSnippet = resolveAnalyticsSnippet(isPreview, CF_BEACON_TOKEN);

  guardNoCnameOnMaster(repoRoot);
  for (const { source, output } of PAGES) {
    buildPageIntoDist(
      repoRoot,
      source,
      output,
      {
        SITE_BASE: siteBase,
        PREVIEW_ROBOTS: previewRobots,
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
