import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, test } from 'vitest';

const REPO_ROOT = join(import.meta.dirname, '..', '..');
const TRUSTED_INSTALL = 'brew trust --tap TradingSandbox/tradecli && brew install TradingSandbox/tradecli/tradecli';
const TRUSTED_INSTALL_HTML = 'brew trust --tap TradingSandbox/tradecli &amp;&amp; brew install TradingSandbox/tradecli/tradecli';

describe('install copy', () => {
  test('homepage copyable install command trusts the tap before install', () => {
    const html = readFileSync(join(REPO_ROOT, 'index.html'), 'utf-8');

    expect(html).toContain(TRUSTED_INSTALL_HTML);
  });

  test('quick start documents the trusted install path', () => {
    const markdown = readFileSync(join(REPO_ROOT, 'wiki/getting-started/quick-start.md'), 'utf-8');

    expect(markdown).toContain(TRUSTED_INSTALL);
  });
});
