import { Page, Locator } from '@playwright/test';

export async function moveTo(page, from, to) {
  const fromBox = await from.boundingBox();
  const toBox = await to.boundingBox();

  if (!fromBox || !toBox) {
    console.error("Bounding box not found for one or both squares.");
    return;
  }

  // Ensure the piece is clicked before dragging
  await from.click();
  await page.waitForTimeout(200); // Small delay for UI to register selection

  // Move the piece with a drag-and-drop action
  await page.mouse.move(fromBox.x + fromBox.width / 2, fromBox.y + fromBox.height / 2);
  await page.mouse.down();
  await page.waitForTimeout(100); // Short pause to simulate real interaction
  await page.mouse.move(toBox.x + toBox.width / 2, toBox.y + toBox.height / 2, { steps: 10 });
  await page.mouse.up();

  // Wait for the UI to update
  await page.waitForTimeout(500);
}


export function getChessBoardSquares(page: Page): Record<string, Locator> {
  const squares: Record<string, Locator> = {};

  const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
  const ranks = ['1', '2', '3', '4', '5', '6', '7', '8'];

  for (const file of files) {
    for (const rank of ranks) {
      const squareName = `${file}${rank}`;
      squares[squareName] = page.locator(`[data-square="${squareName}"]`);
    }
  }

  return squares;
}
