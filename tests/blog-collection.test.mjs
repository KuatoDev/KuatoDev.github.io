import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

test('src/content/config.ts defines blog collection with required schema', () => {
  assert.ok(fs.existsSync('src/content/config.ts'), 'src/content/config.ts must exist');
  const config = fs.readFileSync('src/content/config.ts', 'utf8');
  assert.ok(config.includes("title: z.string()"));
  assert.ok(config.includes("tag: z.string()"));
  assert.ok(config.includes("date: z.string()"));
});

test('4 Markdown articles exist in src/content/blog', () => {
  for (let i = 1; i <= 4; i++) {
    assert.ok(fs.existsSync(`src/content/blog/article-${i}.md`), `article-${i}.md must exist`);
  }
});
