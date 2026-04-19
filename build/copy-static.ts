import { cpSync, mkdirSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

export function copyStaticAssets(repoRoot: string): void {
  const distDir = join(repoRoot, 'dist');
  mkdirSync(distDir, { recursive: true });

  const targets = [
    { src: 'robots.txt', dest: 'dist/robots.txt' },
    { src: 'sitemap.xml', dest: 'dist/sitemap.xml' },
    { src: 'assets', dest: 'dist/assets' },
  ];

  for (const { src, dest } of targets) {
    const srcPath = join(repoRoot, src);
    if (!existsSync(srcPath)) {
      console.warn(`skipping missing: ${src}`);
      continue;
    }
    cpSync(srcPath, join(repoRoot, dest), { recursive: true });
    console.log(`copied: ${src} → ${dest}`);
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const __dirname = dirname(fileURLToPath(import.meta.url));
  copyStaticAssets(join(__dirname, '..'));
}
