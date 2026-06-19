import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const repoRoot = join(import.meta.dirname, '..', '..');

function readSiteFile(path: string): string {
  return readFileSync(join(repoRoot, path), 'utf-8');
}

function jsonLdBlocks(html: string): unknown[] {
  const blockRegex = /<script\s+type="application\/ld\+json">([\s\S]*?)<\/script>/g;
  return Array.from(html.matchAll(blockRegex), (match) => JSON.parse(match[1]!));
}

describe('SEO identity signals', () => {
  it('marks tradecli as a stable organization and website entity', () => {
    const blocks = jsonLdBlocks(readSiteFile('shared/head-base.html'));
    const organization = blocks.find((block) => (block as { '@type'?: string })['@type'] === 'Organization') as Record<string, unknown>;
    const website = blocks.find((block) => (block as { '@type'?: string })['@type'] === 'WebSite') as Record<string, unknown>;

    expect(organization['@id']).toBe('https://tradecli.in/#organization');
    expect(organization.url).toBe('https://tradecli.in/');
    expect(organization.alternateName).toContain('tradecli.in');
    expect(organization.description).toContain('official');

    expect(website['@id']).toBe('https://tradecli.in/#website');
    expect(website.url).toBe('https://tradecli.in/');
    expect(website.publisher).toEqual({ '@id': 'https://tradecli.in/#organization' });
  });

  it('describes the homepage as the official tradecli software site', () => {
    const home = readSiteFile('index.html');
    const blocks = jsonLdBlocks(home);
    const software = blocks.find((block) => (block as { '@type'?: string })['@type'] === 'SoftwareApplication') as Record<string, unknown>;

    expect(home).toContain('<title>tradecli Official Site');
    expect(software['@id']).toBe('https://tradecli.in/#software');
    expect(software.publisher).toEqual({ '@id': 'https://tradecli.in/#organization' });
    expect(software.softwareHelp).toBe('https://tradecli.in/wiki/');
    expect(software.installUrl).toBe('https://tradecli.in/wiki/getting-started/quick-start');
    expect(software.keywords).toContain('tradecli');
  });

  it('links priority crawl targets from the homepage', () => {
    const home = readSiteFile('index.html');

    expect(home).toContain('href="{{SITE_BASE}}wiki/getting-started/quick-start"');
    expect(home).toContain('href="{{SITE_BASE}}updates/"');
    expect(home).toContain('href="{{SITE_BASE}}privacy/"');
  });

  it('adds stable tradecli entity signals to the wiki config', () => {
    const wikiConfig = readSiteFile('wiki/.vitepress/config.ts');

    expect(wikiConfig).toContain('https://tradecli.in/#organization');
    expect(wikiConfig).toContain('https://tradecli.in/#website');
    expect(wikiConfig).toContain('tradecli.in');
  });
});
