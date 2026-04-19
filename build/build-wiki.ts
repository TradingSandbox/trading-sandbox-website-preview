import { spawnSync } from 'node:child_process';
import { cpSync, existsSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

export function deriveDocsBase(siteBase: string | undefined): string {
  const base = siteBase ?? '/';
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

  const vitePressOut = join(repoRoot, 'wiki/.vitepress/dist');
  const finalOut = join(repoRoot, 'dist/wiki');
  mkdirSync(dirname(finalOut), { recursive: true });
  cpSync(vitePressOut, finalOut, { recursive: true });
  console.log(`wiki built: dist/wiki/ (DOCS_BASE=${docsBase})`);
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const __dirname = dirname(fileURLToPath(import.meta.url));
  buildWiki(join(__dirname, '..'));
}
