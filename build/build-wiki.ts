import { spawnSync } from 'node:child_process';
import { cpSync, existsSync, mkdirSync, rmSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildRedirectPageIntoDist, resolveHostname } from './build-pages.js';

export interface WikiRedirectEntry {
  source: string;
  target: string;
}

export const WIKI_LEGACY_REDIRECTS: readonly WikiRedirectEntry[] = [
  { source: 'hedge-fund/', target: 'trading-office/' },
  { source: 'hedge-fund/quickstart', target: 'trading-office/quickstart' },
  { source: 'hedge-fund/setup', target: 'trading-office/setup' },
  { source: 'hedge-fund/ideas', target: 'trading-office/ideas' },
  { source: 'hedge-fund/strategy-lab', target: 'trading-office/strategy-lab' },
  { source: 'hedge-fund/paper-operations', target: 'trading-office/paper-operations' },
  { source: 'hedge-fund/watches', target: 'trading-office/watches' },
  { source: 'hedge-fund/review', target: 'trading-office/review' },
  { source: 'hedge-fund/operations', target: 'trading-office/operations' },
  { source: 'hedge-fund/reference', target: 'trading-office/concepts' },
  { source: 'trading-office/reference', target: 'trading-office/concepts' },
];

export function deriveDocsBase(siteBase: string | undefined): string {
  const rawBase = siteBase?.trim() || '/';
  const base = rawBase.endsWith('/') ? rawBase : `${rawBase}/`;
  return `${base}wiki/`;
}

export function copySharedCSSToWikiPublic(repoRoot: string): void {
  const wikiPublic = join(repoRoot, 'wiki/public');
  mkdirSync(wikiPublic, { recursive: true });
  cpSync(join(repoRoot, 'shared/tokens.css'), join(wikiPublic, 'tokens.css'));
  cpSync(join(repoRoot, 'shared/components.css'), join(wikiPublic, 'components.css'));
  console.log('copied: shared/*.css → wiki/public/');
}

export function buildWiki(repoRoot: string): void {
  const wikiDir = join(repoRoot, 'wiki');
  if (!existsSync(join(wikiDir, '.vitepress/config.ts'))) {
    console.log('wiki/.vitepress/config.ts not found, skipping wiki build (expected pre-Phase-3)');
    return;
  }

  copySharedCSSToWikiPublic(repoRoot);

  const docsBase = deriveDocsBase(process.env.SITE_BASE);

  const result = spawnSync('npx', ['vitepress', 'build', 'wiki'], {
    cwd: repoRoot,
    stdio: 'inherit',
    env: { ...process.env, DOCS_BASE: docsBase },
  });

  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }

  copyVitePressDistToDistWiki(repoRoot);
  emitWikiLegacyRedirects(repoRoot, process.env.SITE_BASE);
  console.log(`wiki built: dist/wiki/ (DOCS_BASE=${docsBase})`);
}

export function copyVitePressDistToDistWiki(repoRoot: string): void {
  const vitePressOut = join(repoRoot, 'wiki/.vitepress/dist');
  const finalOut = join(repoRoot, 'dist/wiki');
  rmSync(finalOut, { recursive: true, force: true });
  mkdirSync(dirname(finalOut), { recursive: true });
  cpSync(vitePressOut, finalOut, { recursive: true });
}

export function emitWikiLegacyRedirects(repoRoot: string, siteBase: string | undefined): void {
  const docsBase = deriveDocsBase(siteBase);
  const hostname = resolveHostname(siteBase);

  for (const entry of WIKI_LEGACY_REDIRECTS) {
    const output = entry.source.endsWith('/')
      ? `wiki/${entry.source}index.html`
      : `wiki/${entry.source}.html`;
    buildRedirectPageIntoDist(
      repoRoot,
      output,
      `${docsBase}${entry.target}`,
      `${hostname}/wiki/${entry.target}`,
    );
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const __dirname = dirname(fileURLToPath(import.meta.url));
  buildWiki(join(__dirname, '..'));
}
