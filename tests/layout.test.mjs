import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

test('global.css contains existing CSS variables and animations', () => {
  assert.ok(fs.existsSync('src/styles/global.css'), 'src/styles/global.css must exist');
  const css = fs.readFileSync('src/styles/global.css', 'utf8');
  assert.ok(css.includes('--primary-accent: #ff9100;'));
  assert.ok(css.includes('@keyframes floatOrb'));
  assert.ok(css.includes('@keyframes spin'));
});

test('BaseLayout component exists and includes background orbs', () => {
  assert.ok(fs.existsSync('src/layouts/BaseLayout.astro'), 'src/layouts/BaseLayout.astro must exist');
  const layout = fs.readFileSync('src/layouts/BaseLayout.astro', 'utf8');
  assert.ok(layout.includes('background-wrapper'));
  assert.ok(layout.includes('orb orb-1'));
});
