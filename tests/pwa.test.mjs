import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

test('public directory contains required PWA and SEO files', () => {
  assert.ok(fs.existsSync('public/CNAME'), 'CNAME must exist');
  assert.ok(fs.existsSync('public/robots.txt'), 'robots.txt must exist');
  assert.ok(fs.existsSync('public/sitemap.xml'), 'sitemap.xml must exist');
  assert.ok(fs.existsSync('public/manifest.json'), 'manifest.json must exist');
  assert.ok(fs.existsSync('public/sw.js'), 'sw.js must exist');
  assert.ok(fs.existsSync('public/assets/logo.svg'), 'logo.svg must exist');
});

test('sw.js handles /_astro/ runtime caching', () => {
  const sw = fs.readFileSync('public/sw.js', 'utf8');
  assert.ok(sw.includes('_astro'), 'sw.js must handle _astro cached chunks');
});
