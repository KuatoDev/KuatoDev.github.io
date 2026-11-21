import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

test('blog.astro contains blogSearchInput and blogTagsContainer', () => {
  assert.ok(fs.existsSync('src/pages/blog.astro'));
  const blog = fs.readFileSync('src/pages/blog.astro', 'utf8');
  assert.ok(blog.includes('id="blogSearchInput"'));
  assert.ok(blog.includes('id="blogTagsContainer"'));
  assert.ok(blog.includes('id="articlesContainer"'));
});

test('ArticleLayout.astro renders article header, meta, and back button', () => {
  assert.ok(fs.existsSync('src/layouts/ArticleLayout.astro'));
  const layout = fs.readFileSync('src/layouts/ArticleLayout.astro', 'utf8');
  assert.ok(layout.includes('class="single-article-card"'));
  assert.ok(layout.includes('class="article-header"'));
  assert.ok(layout.includes('class="back-btn"'));
});
