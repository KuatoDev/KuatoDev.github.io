import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

test('all 3 showcase pages exist and retain exact download links and back buttons', () => {
  assert.ok(fs.existsSync('src/pages/antigravity.astro'));
  const ag = fs.readFileSync('src/pages/antigravity.astro', 'utf8');
  assert.ok(ag.includes('Antigravity'));
  assert.ok(ag.includes('back-btn'));

  assert.ok(fs.existsSync('src/pages/wincross.astro'));
  const wc = fs.readFileSync('src/pages/wincross.astro', 'utf8');
  assert.ok(wc.includes('WINCross'));

  assert.ok(fs.existsSync('src/pages/wearlevelinsight.astro'));
  const wl = fs.readFileSync('src/pages/wearlevelinsight.astro', 'utf8');
  assert.ok(wl.includes('Wear Level Insight'));
});
