import { test, expect } from '@playwright/test';
import { moveTo, getChessBoardSquares } from './chessUtils';

test('that the white piece is visible', async ({ page }) => {
  await page.goto('http://localhost:4200/custom?fen=8/8/8/3P4/8/8/8/8 w - - 0 1');
  const squares = getChessBoardSquares(page);
  const { d5, d7 } = getChessBoardSquares(page);
  await expect(d5.locator('[data-piece="wP"]')).toBeVisible();
});

test('the white pawn can move up 1 space', async ({ page }) => {
  await page.goto('http://localhost:4200/custom?fen=8/8/8/3P4/8/8/8/8 w - - 0 1');
  const { d5, d6 } = getChessBoardSquares(page);

  await moveTo(page, d5, d6);

  await expect(d6.locator('[data-piece="wP"]')).toHaveCount(1);
  await expect(d5.locator('[data-piece="wP"]')).toHaveCount(0);
});

test('the white pawn cannot move 2 spaces', async ({ page }) => {
  await page.goto('http://localhost:4200/custom?fen=8/8/8/3P4/8/8/8/8 w - - 0 1');
  const { d5, d7 } = getChessBoardSquares(page);

  await moveTo(page, d5, d7);

  await expect(d7.locator('[data-piece="wP"]')).toHaveCount(0);
});

test('test that the pawn cannot move back', async ({ page }) => {
  await page.goto('http://localhost:4200/custom?fen=8/8/8/3P4/8/8/8/8 w - - 0 1');
  const { d5, d4 } = getChessBoardSquares(page);

  await moveTo(page, d5, d4);

  await expect(d4.locator('[data-piece="wP"]')).toHaveCount(0);
});

test('test that the pawn cannot move to e5', async ({ page }) => {
  await page.goto('http://localhost:4200/custom?fen=8/8/8/3P4/8/8/8/8 w - - 0 1');
  const { d5, e5 } = getChessBoardSquares(page);

  await moveTo(page, d5, e5);

  await expect(e5.locator('[data-piece="wP"]')).toHaveCount(0);
});

test('test that the pawn cannot move to c5', async ({ page }) => {
  await page.goto('http://localhost:4200/custom?fen=8/8/8/3P4/8/8/8/8 w - - 0 1');
  const { d5, c5 } = getChessBoardSquares(page);

  await moveTo(page, d5, c5);

  await expect(c5.locator('[data-piece="wP"]')).toHaveCount(0);
});


test('promotion to queen', async ({ page }) => {
  await page.goto('http://localhost:4200/custom?fen=8/8/8/3P4/8/8/8/8 w - - 0 1');
  const { d6, d7, d8, d5, c5 } = getChessBoardSquares(page);

  await moveTo(page, d5, d6);
  await moveTo(page, d6, d7);
  await moveTo(page, d7, d8);

  await page.locator('div[title="Choose promotion piece"] >> div[data-piece="wQ"]').click();

  await expect(d8.locator('[data-piece="wQ"]')).toHaveCount(1);
});
