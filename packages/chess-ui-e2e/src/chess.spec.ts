import { test, expect } from '@playwright/test';

test('a piece is visible', async ({ page }) => {
  await page.goto('/custom?fen=8/8/8/3P4/8/8/8/8 w - - 0 1');

  // Expect h1 to contain a substring.

  const divWhite = page.locator("div[data-square='d5']");

  await expect(divWhite).toBeVisible();
});
