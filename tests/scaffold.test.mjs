import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

test('Astro config file exists and specifies file output', () => {
  assert.ok(fs.existsSync('astro.config.mjs'), 'astro.config.mjs must exist');
  const config = fs.readFileSync('astro.config.mjs', 'utf8');
  assert.ok(config.includes("format: 'file'"));
});
