import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

test('index.astro contains required container IDs and typing classes', () => {
  assert.ok(fs.existsSync('src/pages/index.astro'), 'src/pages/index.astro must exist');
  const index = fs.readFileSync('src/pages/index.astro', 'utf8');
  assert.ok(index.includes('class="typing"'));
  assert.ok(index.includes('id="blog"'));
  const githubActivity = fs.readFileSync('src/components/GithubActivity.astro', 'utf8');
  assert.ok(githubActivity.includes('id="githubActivity"'));
  assert.ok(index.includes('<GithubActivity'));
  assert.ok(index.includes('class="project-list"'));
});

test('profile.astro and 404.astro exist', () => {
  assert.ok(fs.existsSync('src/pages/profile.astro'));
  assert.ok(fs.existsSync('src/pages/404.astro'));
});
