import { test, expect } from '@playwright/test';
import { moveTo, getChessBoardSquares } from './chessUtils';

test('black pawn can move 2 spaces', async ({ page }) => {
  await page.goto('http://localhost:4200/');

  const squares = getChessBoardSquares(page);
  const {a2, a4, a7, a5, b2, b4, b7, b5, a1, a3, b1, c7, c5, b3, c2, c4, c3, c1, b6, d2, d4, g5, g7, d1, d3, d5} = squares;

  await moveTo(page, a2, a4);
  await moveTo(page, a7, a5);

  await expect(a5.locator('[data-piece="bP"]')).toHaveCount(1);
  await expect(a7.locator('[data-piece="bP"]')).toHaveCount(0);
});

test('black pawn cant move 2 spaces after a move', async ({ page }) => {
  await page.goto('http://localhost:4200/');

  const squares = getChessBoardSquares(page);
  const {a2, a4, a7, a5, b2, b4, b7, b5, a1, a3, b1, c7, c5, b3, c2, c4, c3, c1, b6, d2, d4, g5, g7, d1, d3, d5, a6, c6} = squares;

  await moveTo(page, a2, a4);
  await moveTo(page, c7, c6);
  await moveTo(page, a4, a5);
  await moveTo(page, c6, c4);

  await expect(c6.locator('[data-piece="bP"]')).toHaveCount(1);
  await expect(c4.locator('[data-piece="bP"]')).toHaveCount(0);
});

test('black pawn takes', async ({ page }) => {
  await page.goto('http://localhost:4200/');

  const squares = getChessBoardSquares(page);
  const {a2, a4, a7, a5, b2, b4, b7, b5, a1, a3, b1, c7, c5, b3, c2, c4, c3, c1, b6, d2, d4, g5, g7, d1, d3, d5, a6} = squares;

  await moveTo(page, a2, a4);
  await moveTo(page, b7, b5);
  await moveTo(page, b2, b4);
  await moveTo(page, b5, a4);


  await expect(b5.locator('[data-piece="bP"]')).toHaveCount(0);
  await expect(a4.locator('[data-piece="bP"]')).toHaveCount(1);
  await expect(b5.locator('[data-piece="wP"]')).toHaveCount(0);

});

test('black pawn cannot take forward', async ({ page }) => {
  await page.goto('http://localhost:4200/');

  const squares = getChessBoardSquares(page);
  const {a2, a4, a7, a5, b2, b4, b7, b5, a1, a3, b1, c7, c5, b3, c2, c4, c3, c1, b6, d2, d4, g5, g7, d1, d3, d5, a6} = squares;

  await moveTo(page, a2, a4);
  await moveTo(page, a7, a5);
  await moveTo(page, b2, b4);
  await moveTo(page, a5, a4);

  await expect(a4.locator('[data-piece="wP"]')).toHaveCount(1);
  await expect(a4.locator('[data-piece="bP"]')).toHaveCount(0);
  await expect(a5.locator('[data-piece="bP"]')).toHaveCount(1);

});

test('test that black pawn cannot move passed pieces', async ({ page }) => {
  await page.goto('http://localhost:4200/');

  const squares = getChessBoardSquares(page);
  const {a2, a4, a7, a5, b2, b4, b7, b5, a1, a3, b1, c7, c5, b3, c2, c4, c3, c1, b6, d2, d4, g5, g7, d1, d3, d5, a6, c6} = squares;

  await moveTo(page, a2, a4);
  await moveTo(page, b7, b6);
  await moveTo(page, a4, a5);
  await moveTo(page, c7, c6);
  await moveTo(page, a5, a6);
  await moveTo(page, a7, a5);

  await expect(a5.locator('[data-piece="wP"]')).toHaveCount(0);
  await expect(a6.locator('[data-piece="wP"]')).toHaveCount(1);
  await expect(a7.locator('[data-piece="bP"]')).toHaveCount(1);
  await expect(a5.locator('[data-piece="bP"]')).toHaveCount(0);


});

test('test black knight move', async ({ page }) => {
  await page.goto('http://localhost:4200/');

  const squares = getChessBoardSquares(page);
  const {a2, a4, a7, a5, b2, b4, b7, b5, a1, a3, b1, c7, c5, b3, d2, d4, c3, b8, c6, e5} = squares;

  await moveTo(page, a2, a3);
  await moveTo(page, b8, c6);

  await expect(c6.locator('[data-piece="bN"]')).toHaveCount(1);
  await expect(b8.locator('[data-piece="bN"]')).toHaveCount(0);

  await moveTo(page, b2, b3);
  await moveTo(page, c6, e5);

  await expect(e5.locator('[data-piece="bN"]')).toHaveCount(1);
  await expect(c6.locator('[data-piece="bN"]')).toHaveCount(0);

});

test('test black knight cannot move onto a black piece', async ({ page }) => {
  await page.goto('http://localhost:4200/');

  const squares = getChessBoardSquares(page);
  const {d2 , d4 , c7 , c5 , b1, b8, d7} = squares;
  await moveTo(page, d2, d4);
  await moveTo(page, b8, d7);

  await expect(d7.locator('[data-piece="bN"]')).toHaveCount(0);
  await expect(b8.locator('[data-piece="bN"]')).toHaveCount(1);
  await expect(d7.locator('[data-piece="bP"]')).toHaveCount(1);
});

test('test black knight illegal moves', async ({ page }) => {
  await page.goto('http://localhost:4200/');

  const squares = getChessBoardSquares(page);
  const {a2, a4, a7, a5, b2, b4, b7, b5, a1, a3, b1, c7, c5, b3, c2, c4, c3, c1, b6, a8, a6, d2, d3, b8} = squares;
  await moveTo(page, a2, a4);
  await moveTo(page, a7, a5);
  await moveTo(page, b2, b4);
  await moveTo(page, b7, b5);
  await moveTo(page, a1, a3);
  await moveTo(page, c7, c5);
  await moveTo(page, b1, a1);
  await moveTo(page, a8, a6);
  await moveTo(page, d2, d3);
  await moveTo(page, b8, a7)

  await expect(a7.locator('[data-piece="bN"]')).toHaveCount(0);
  await expect(b8.locator('[data-piece="bN"]')).toHaveCount(1);

  await moveTo(page, b8, a8);

  await expect(a8.locator('[data-piece="bN"]')).toHaveCount(0);
  await expect(b8.locator('[data-piece="bN"]')).toHaveCount(1);

  await moveTo(page, b8, b7);

  await expect(b7.locator('[data-piece="bN"]')).toHaveCount(0);
  await expect(b8.locator('[data-piece="bN"]')).toHaveCount(1);

  await moveTo(page, b8, b6);

  await expect(b6.locator('[data-piece="bN"]')).toHaveCount(0);
  await expect(b8.locator('[data-piece="bN"]')).toHaveCount(1);
});

test('black rook cannot move passed pieces', async ({ page }) => {
  await page.goto('http://localhost:4200/');

  const squares = getChessBoardSquares(page);
  const {a2, a4, a7, a5, b2, b4, b7, b5, a1, a3, b1, c7, c5, b3, c2, c4, c3, c1, b6, a8, a6, d2, d3, b8} = squares;
  await moveTo(page, b2, b4);
  await moveTo(page, a8, a6);

  await expect(a6.locator('[data-piece="bR"]')).toHaveCount(0);
  await expect(a8.locator('[data-piece="bR"]')).toHaveCount(1);

  await moveTo(page, a7, a5);
  await moveTo(page, b4, a5);
  await moveTo(page, a8, a4);

  await expect(a4.locator('[data-piece="bR"]')).toHaveCount(0);
  await expect(a8.locator('[data-piece="bR"]')).toHaveCount(1);
  await expect(a5.locator('[data-piece="wP"]')).toHaveCount(1);

});

test('black rook takes', async ({ page }) => {
  await page.goto('http://localhost:4200/');

  const squares = getChessBoardSquares(page);
  const {a2, a4, a7, a5, b2, b4, b7, b5, a1, a3, b1, c7, c5, b3, c2, c4, c3, c1, b6, a8, a6, d2, d3, b8} = squares;

  await moveTo(page, b2, b4);
  await moveTo(page, a7, a5);
  await moveTo(page, b4, a5);
  await moveTo(page, a8, a5);

  await expect(a5.locator('[data-piece="bR"]')).toHaveCount(1);
  await expect(a8.locator('[data-piece="bR"]')).toHaveCount(0);
  await expect(a5.locator('[data-piece="wP"]')).toHaveCount(0);
});

test('black rook cannot move diagonally', async ({ page }) => {
  await page.goto('http://localhost:4200/');

  const squares = getChessBoardSquares(page);
  const {a2, a4, a7, a5, b2, b4, b7, b5, a1, a3, b1, c7, c5, b3, c2, c4, c3, c1, c6, b6, a8, a6, d2, d3, b8} = squares;

  await moveTo(page, b2, b3);
  await moveTo(page, b7, b6);
  await moveTo(page, a2, a3);
  await moveTo(page, a8, c6);

  await expect(c6.locator('[data-piece="bR"]')).toHaveCount(0);
  await expect(a8.locator('[data-piece="bR"]')).toHaveCount(1);
});

test('black rook cannot take black piece', async ({ page }) => {
  await page.goto('http://localhost:4200/');

  const squares = getChessBoardSquares(page);
  const {a2, a4, a7, a5, b2, b4, b7, b5, a1, a3, b1, c7, c5, b3, c2, c4, c3, c1, c6, b6, a8, a6, d2, d3, b8} = squares;
  await moveTo(page, a2, a3);
  await moveTo(page, a8, a7);

  await expect(a7.locator('[data-piece="bR"]')).toHaveCount(0);
  await expect(a8.locator('[data-piece="bR"]')).toHaveCount(1);
  await expect(a7.locator('[data-piece="bP"]')).toHaveCount(1);
});

test('black bishop cannot take black piece', async ({ page }) => {
  await page.goto('http://localhost:4200/');

  const squares = getChessBoardSquares(page);
  const {a2, a4, a7, a5, b2, b4, b7, b5, a1, a3, b1, c7, c5, b3, c2, c4, c3, c1, c6, b6, a8, a6, d2, d3, b8, c8, d7} = squares;

  await moveTo(page, a2, a4)
  await moveTo(page, c8, d7);

  await expect(d7.locator('[data-piece="bB"]')).toHaveCount(0);
  await expect(c8.locator('[data-piece="bB"]')).toHaveCount(1);
  await expect(d7.locator('[data-piece="bP"]')).toHaveCount(1);

});

test('black bishop cannot move passed pieces', async ({ page }) => {
  await page.goto('http://localhost:4200/');

  const squares = getChessBoardSquares(page);
  const {a2, a4, a7, a5, b2, b4, b7, b5, a1, a3, b1, c7, c5, b3, c2, c4, c3, c1, c6, b6, a8, a6, d2, d3, b8, c8, d7, g2, g4, h3, d6, e6} = squares;

  await moveTo(page, a2, a3);
  await moveTo(page, c8, e6);

  await expect(a6.locator('[data-piece="bB"]')).toHaveCount(0);
  await expect(c8.locator('[data-piece="bB"]')).toHaveCount(1);

  await moveTo(page, d7, d6);
  await moveTo(page, g2, g4);
  await moveTo(page, c8, h3);

  await expect(h3.locator('[data-piece="bB"]')).toHaveCount(0);
  await expect(c8.locator('[data-piece="bB"]')).toHaveCount(1);

});

test('black bishop cannot move forward or sideways', async ({ page }) => {
  await page.goto('http://localhost:4200/');

  const squares = getChessBoardSquares(page);
  const {a2, a4, a7, a5, b2, b4, b7, b5, a1, a3, b1, c7, c5, b3, c2, c4, c3, c1, c6, b6, a8, a6, d2, d3, b8, c8, d7, g2, g4, h3, d6, e6} = squares;

  await moveTo(page, a2, a3);
  await moveTo(page, b8, a6);
  await moveTo(page, a3, a4);
  await moveTo(page, c7, c6);
  await moveTo(page, a4, a5);
  await moveTo(page, c8, b8);

  await expect(b8.locator('[data-piece="bB"]')).toHaveCount(0);
  await expect(c8.locator('[data-piece="bB"]')).toHaveCount(1);

  await moveTo(page, c8, c7);


  await expect(c7.locator('[data-piece="bB"]')).toHaveCount(0);
  await expect(c8.locator('[data-piece="bB"]')).toHaveCount(1);

});

test('black bishop move successfully', async ({ page }) => {
  await page.goto('http://localhost:4200/');

  const squares = getChessBoardSquares(page);
  const {a2, a4, a7, a5, b2, b4, b7, b5, a1, a3, b1, c7, c5, b3, c2, c4, c3, c1, c6, b6, a8, a6, d2, d3, b8, c8, d7, g2, g4, h3, d6, e6, f5} = squares;

  await moveTo(page, a2, a3);
  await moveTo(page, d7, d6);
  await moveTo(page, a3, a4);
  await moveTo(page, c8, f5);

  await expect(c8.locator('[data-piece="bB"]')).toHaveCount(0);
  await expect(f5.locator('[data-piece="bB"]')).toHaveCount(1);
});

test('black bishop takes', async ({ page }) => {
  await page.goto('http://localhost:4200/');

  const squares = getChessBoardSquares(page);
  const {a2, a4, a7, a5, b2, b4, b7, b5, a1, a3, b1, c7, c5, b3, c2, c4, c3, c1, c6, b6, a8, a6, d2, d3, b8, c8, d7, g2, g4, h3, d6, e6, f5, d8} = squares;

  await moveTo(page, g2, g4);
  await moveTo(page, d7, d6);
  await moveTo(page, a2, a3);
  await moveTo(page, c8, g4);

  await expect(c8.locator('[data-piece="bB"]')).toHaveCount(0);
  await expect(g4.locator('[data-piece="bB"]')).toHaveCount(1);
  await expect(g4.locator('[data-piece="wP"]')).toHaveCount(0);
});

test('black queen cannot move onto black pieces', async ({ page }) => {
  await page.goto('http://localhost:4200/');

  const squares = getChessBoardSquares(page);
  const {a2, a4, a7, a5, b2, b4, b7, b5, a1, a3, b1, c7, c5, b3, c2, c4, c3, c1, c6, b6, a8, a6, d2, d3, b8, c8, d7, g2, g4, h3, d6, e6, f5, d8} = squares;

  await moveTo(page, a2, a3);
  await moveTo(page, d8, d7);

  await expect(d7.locator('[data-piece="bQ"]')).toHaveCount(0);
  await expect(d8.locator('[data-piece="bQ"]')).toHaveCount(1);
  await expect(d7.locator('[data-piece="bP"]')).toHaveCount(1);
});

test('black queen cannot move passed pieces', async ({ page }) => {
  await page.goto('http://localhost:4200/');

  const squares = getChessBoardSquares(page);
  const {a2, a4, a7, a5, b2, b4, b7, b5, a1, a3, b1, c7, c5, b3, c2, c4, c3, c1, c6, b6, a8, a6, d2, d3, b8, c8, d7, g2, g4, h3, d6, e6, f5, d8, d5, d4} = squares;

  await moveTo(page, c2, c4);
  await moveTo(page, d7, d5);
  await moveTo(page, c4, d5);
  await moveTo(page, d8, d4);

  await expect(d4.locator('[data-piece="bQ"]')).toHaveCount(0);
  await expect(d8.locator('[data-piece="bQ"]')).toHaveCount(1);
  await expect(d5.locator('[data-piece="wP"]')).toHaveCount(1);

  await moveTo(page, d8, b6);

  await expect(b6.locator('[data-piece="bQ"]')).toHaveCount(0);
  await expect(d8.locator('[data-piece="bQ"]')).toHaveCount(1);

});

test('black queen cannot move like a knight', async ({ page }) => {
  await page.goto('http://localhost:4200/');

  const squares = getChessBoardSquares(page);
  const {a2, a4, a7, a5, b2, b4, b7, b5, a1, a3, b1, c7, c5, b3, c2, c4, c3, c1, c6, b6, a8, a6, d2, d3, b8, c8, d7, g2, g4, h3, d6, e6, f5, d8, d5, d4, e7, e5} = squares;

  await moveTo(page, a2, a3);
  await moveTo(page, d7, d5);
  await moveTo(page, a3, a4);
  await moveTo(page, e7, e5);
  await moveTo(page, a4, a5);
  await moveTo(page, d8, e6);

  await expect(e6.locator('[data-piece="bQ"]')).toHaveCount(0);
  await expect(d8.locator('[data-piece="bQ"]')).toHaveCount(1);

});

test('black queen takes', async ({ page }) => {
  await page.goto('http://localhost:4200/');

  const squares = getChessBoardSquares(page);
  const {a2, a4, a7, a5, b2, b4, b7, b5, a1, a3, b1, c7, c5, b3, c2, c4, c3, c1, c6, b6, a8, a6, d2, d3, b8, c8, d7, g2, g4, h3, d6, e6, f5, d8, d5, d4, e7, e5} = squares;

  await moveTo(page, c2, c4);
  await moveTo(page, d7, d5);
  await moveTo(page, c4, d5);
  await moveTo(page, d8, d5);

  await expect(d8.locator('[data-piece="bQ"]')).toHaveCount(0);
  await expect(d5.locator('[data-piece="bQ"]')).toHaveCount(1);
  await expect(d5.locator('[data-piece="wP"]')).toHaveCount(0);

});

test('Queen can move diagonally and sideways', async ({ page }) => {
  await page.goto('http://localhost:4200/');

  const squares = getChessBoardSquares(page);
  const {a2, a4, a7, a5, b2, b4, b7, b5, a1, a3, b1, c7, c5, b3, c2, c4, c3, c1, c6, b6, a8, a6, d2, d3, b8, c8, d7, g2, g4, h3, d6, e6, f5, d8, d5, d4, e7, e5} = squares;

  await moveTo(page, a2, a3);
  await moveTo(page, c7, c6);
  await moveTo(page, b2, b3);
  await moveTo(page, d8, a5);

  await expect(d8.locator('[data-piece="bQ"]')).toHaveCount(0);
  await expect(a5.locator('[data-piece="bQ"]')).toHaveCount(1);

  await moveTo(page, c2, c3);
  await moveTo(page, a5, b5);

  await expect(a5.locator('[data-piece="bQ"]')).toHaveCount(0);
  await expect(b5.locator('[data-piece="bQ"]')).toHaveCount(1);

});

test('king can move diagonally, forward, and sideways', async ({ page }) => {
  await page.goto('http://localhost:4200/');

  const squares = getChessBoardSquares(page);
  const {a2, a4, a7, a5, b2, b4, b7, b5, a1, a3, b1, c7, c5, b3, c2, c4, c3, c1, c6, b6, a8, a6, d2, d3, b8, c8, d7, g2, g4, h3, d6, e6, f5, d8, d5, d4, e7, e5, e8} = squares;

  await moveTo(page, a2, a3);
  await moveTo(page, d7, d5);
  await moveTo(page, a3, a4);
  await moveTo(page, e8, d7);

  await expect(e8.locator('[data-piece="bK"]')).toHaveCount(0);
  await expect(d7.locator('[data-piece="bK"]')).toHaveCount(1);

  await moveTo(page, a4, a5);
  await moveTo(page, d7, d6);

  await expect(d7.locator('[data-piece="bK"]')).toHaveCount(0);
  await expect(d6.locator('[data-piece="bK"]')).toHaveCount(1);

  await moveTo(page, a5, a6);
  await moveTo(page, d6, e6);

  await expect(d6.locator('[data-piece="bK"]')).toHaveCount(0);
  await expect(e6.locator('[data-piece="bK"]')).toHaveCount(1);

  await moveTo(page, b2, b3);
  await moveTo(page, e6, e5);

  await expect(e6.locator('[data-piece="bK"]')).toHaveCount(0);
  await expect(e5.locator('[data-piece="bK"]')).toHaveCount(1);

  await moveTo(page, b3, b4);
  await moveTo(page, e5, e6);

  await expect(e5.locator('[data-piece="bK"]')).toHaveCount(0);
  await expect(e6.locator('[data-piece="bK"]')).toHaveCount(1);
});


test('black king cannot move more than 1 square', async ({ page }) => {
  await page.goto('http://localhost:4200/');

  const squares = getChessBoardSquares(page);
  const {a2, a4, a7, a5, b2, b4, b7, b5, a1, a3, b1, c7, c5, b3, c2, c4, c3, c1, c6, b6, a8, a6, d2, d3, b8, c8, d7, g2, g4, h3, d6, e6, f5, d8, d5, d4, e7, e5, e8} = squares;

  await moveTo(page, a2, a3);
  await moveTo(page, e7, e5);
  await moveTo(page, a3, a4);
  await moveTo(page, e8, e6);

  await expect(e6.locator('[data-piece="bK"]')).toHaveCount(0);
  await expect(e8.locator('[data-piece="bK"]')).toHaveCount(1);

});

test('black king cannot move into check', async ({ page }) => {
  await page.goto('http://localhost:4200/');

  const squares = getChessBoardSquares(page);
  const {g5, a2, a4, a7, a5, b2, b4, b7, b5, a1, a3, b1, c7, c5, b3, c2, c4, c3, c1, c6, b6, a8, a6, d2, d3, b8, c8, d7, g2, g4, h3, d6, e6, f5, d8, d5, d4, e7, e5, e8} = squares;

  await moveTo(page, d2, d3);
  await moveTo(page, e7, e6);
  await moveTo(page, c1, g5);
  await moveTo(page, c8, g4);
  await moveTo(page, e8, e7);


  await expect(e7.locator('[data-piece="bK"]')).toHaveCount(0);
  await expect(e8.locator('[data-piece="bK"]')).toHaveCount(1);

});

test('black king takes', async ({ page }) => {
  await page.goto('http://localhost:4200/');

  const squares = getChessBoardSquares(page);
  const {e6, e8, e5, e7, f7, f5, f3, f4, a6, a2, a4, a7, a5, b2, b4, b7, b5, a1, a3, b1, c7, c5, b3, c2, c4, c3, c1, b6, d2, d4, g5, g7, d1, d3, d5, e2, e4, g4, e1, e3, c8, d7, d6} = squares;

  await moveTo(page, d2, d4);
  await moveTo(page, e7, e5);
  await moveTo(page, d4, e5);
  await moveTo(page, e8, e7);
  await moveTo(page, e5, e6);
  await moveTo(page, e7, e6);

  await expect(e7.locator('[data-piece="bK"]')).toHaveCount(0);
  await expect(e6.locator('[data-piece="bK"]')).toHaveCount(1);
  await expect(e6.locator('[data-piece="wP"]')).toHaveCount(0);
});
