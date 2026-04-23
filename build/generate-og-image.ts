import sharp from 'sharp';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = join(__dirname, '..');

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0a0b0f"/>
      <stop offset="100%" stop-color="#151820"/>
    </linearGradient>
    <linearGradient id="accent" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#60a5fa"/>
      <stop offset="50%" stop-color="#06b6d4"/>
      <stop offset="100%" stop-color="#22c55e"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <text x="80" y="280" font-family="Inter, sans-serif" font-weight="800" font-size="72" fill="#e8eaf0">
    tradecli
  </text>
  <text x="80" y="370" font-family="Inter, sans-serif" font-weight="600" font-size="44" fill="url(#accent)">
    AI Trading Assistant
  </text>
  <text x="80" y="430" font-family="Inter, sans-serif" font-weight="400" font-size="32" fill="#8b8fa3">
    for Indian Markets &#183; NSE &amp; BSE
  </text>
  <text x="80" y="560" font-family="JetBrains Mono, monospace" font-weight="500" font-size="24" fill="#5c6078">
    tradecli.in
  </text>
</svg>`;

const outPath = join(REPO_ROOT, 'assets/og-default.png');
await sharp(Buffer.from(svg)).png().toFile(outPath);
console.log(`wrote ${outPath}`);
