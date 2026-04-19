import { describe, it, expect } from 'vitest';
import { deriveDocsBase } from '../build-wiki.js';

describe('deriveDocsBase', () => {
  it('appends wiki/ to the site base', () => {
    expect(deriveDocsBase('/')).toBe('/wiki/');
    expect(deriveDocsBase('/trading-sandbox-website-preview/')).toBe('/trading-sandbox-website-preview/wiki/');
  });

  it('defaults to /wiki/ when siteBase is undefined', () => {
    expect(deriveDocsBase(undefined)).toBe('/wiki/');
  });
});
