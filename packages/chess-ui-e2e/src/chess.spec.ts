import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('/custom?fen=8/8/8/3P4/8/8/8/8 w - - 0 1');

  // Expect h1 to contain a substring.
  expect(await page.locator('h1').innerText()).toContain('Welcome');
});
