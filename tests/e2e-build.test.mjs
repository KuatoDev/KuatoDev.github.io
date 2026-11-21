import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

test('Build output contains all required pages with clean .html names', () => {
  const expectedFiles = [
    'dist/index.html',
    'dist/antigravity.html',
    'dist/wincross.html',
    'dist/wearlevelinsight.html',
    'dist/profile.html',
    'dist/blog.html',
    'dist/blog/posts.json',
    'dist/blog/article-1.html',
    'dist/blog/article-2.html',
    'dist/blog/article-3.html',
    'dist/blog/article-4.html',
    'dist/404.html',
    'dist/CNAME',
    'dist/sw.js',
    'dist/manifest.json'
  ];

  for (const file of expectedFiles) {
    assert.ok(fs.existsSync(file), `Expected ${file} to exist in dist/`);
  }
});

test('dist/blog/posts.json contains all 4 articles with exact keys', () => {
  const jsonStr = fs.readFileSync('dist/blog/posts.json', 'utf8');
  const posts = JSON.parse(jsonStr);
  assert.equal(posts.length, 4);
  assert.ok(posts[0].title);
  assert.ok(posts[0].date);
  assert.ok(posts[0].tag);
  assert.ok(posts[0].description);
  assert.ok(posts[0].link);
});

test('dist/CNAME contains vernkuato.zone.id', () => {
  const cname = fs.readFileSync('dist/CNAME', 'utf8').trim();
  assert.equal(cname, 'vernkuato.zone.id');
});
