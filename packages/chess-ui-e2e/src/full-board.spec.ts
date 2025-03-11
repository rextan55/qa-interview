import { test, expect } from '@playwright/test';
import { moveTo, getChessBoardSquares } from './chessUtils';

test('test that a2 can move 2 spaces', async ({ page }) => {
  await page.goto('http://localhost:4200/'); // Load the chess game

  const squares = getChessBoardSquares(page); // Get all chessboard squares
  const {a2, a4} = squares;

  await moveTo(page, a2, a4); // Move white pawn from a2 to a4 (valid two-square opening move)

  await expect(a4.locator('[data-piece="wP"]')).toHaveCount(1); // Ensure the pawn is now at a4
  await expect(a2.locator('[data-piece="wP"]')).toHaveCount(0); // Ensure a2 is empty
});

test('test that a2 cannot move 2 spaces after a move', async ({ page }) => {
  await page.goto('http://localhost:4200/');

  const squares = getChessBoardSquares(page);
  const {a2, a4, c7, c5, a6} = squares;

  await moveTo(page, a2, a4); // Move white pawn from a2 to a4
  await moveTo(page, c7, c5); // Move black pawn from c7 to c5
  await moveTo(page, a4, a6); // Attempt to move a4 to a6, which should be invalid

  await expect(a4.locator('[data-piece="wP"]')).toHaveCount(1); // The pawn should remain at a4
  await expect(a6.locator('[data-piece="wP"]')).toHaveCount(0); // The move to a6 should not have happened
});

test('test that pawn cannot take forward', async ({ page }) => {
  await page.goto('http://localhost:4200/');

  const squares = getChessBoardSquares(page);
  const {a2, a4, a7, a5} = squares;

  await moveTo(page, a2, a4); // Move white pawn from a2 to a4
  await moveTo(page, a7, a5); // Move black pawn from a7 to a5
  await moveTo(page, a4, a5); // Attempt to capture forward, which should be invalid

  await expect(a4.locator('[data-piece="wP"]')).toHaveCount(1); // The white pawn should remain at a4
  await expect(a5.locator('[data-piece="wP"]')).toHaveCount(0); // The white pawn should not have moved to a5
  await expect(a5.locator('[data-piece="bP"]')).toHaveCount(1); // The black pawn should remain at a5
});

test('test that pawn cannot move passed pieces', async ({ page }) => {
  await page.goto('http://localhost:4200/');

  const squares = getChessBoardSquares(page);
  const {a2, a4, c7, c5, b2, b4, d2, d4, c2, c4, c3} = squares;

  await moveTo(page, a2, a4); // Move white pawn a2 to a4
  await moveTo(page, c7, c5); // Move black pawn c7 to c5
  await moveTo(page, b2, b4); // Move white pawn b2 to b4
  await moveTo(page, c5, c4); // Move black pawn c5 to c4
  await moveTo(page, d2, d4); // Move white pawn d2 to d4
  await moveTo(page, c4, c3); // Move black pawn c4 to c3 (blocking path)
  await moveTo(page, c2, c4); // Attempt to move white pawn c2 to c4 (should be blocked)

  await expect(c2.locator('[data-piece="wP"]')).toHaveCount(1); // White pawn should still be at c2
  await expect(c4.locator('[data-piece="wP"]')).toHaveCount(0); // Move should be prevented
  await expect(c3.locator('[data-piece="bP"]')).toHaveCount(1); // Black pawn should remain at c3
});

test('pawn takes', async ({ page }) => {
  await page.goto('http://localhost:4200/');

  const squares = getChessBoardSquares(page);
  const {a2, a4, b7, b5} = squares;

  await moveTo(page, a2, a4); // Move white pawn a2 to a4
  await moveTo(page, b7, b5); // Move black pawn b7 to b5
  await moveTo(page, a4, b5); // Capture black pawn at b5 with white pawn

  await expect(b5.locator('[data-piece="wP"]')).toHaveCount(1); // White pawn should now be at b5
  await expect(a4.locator('[data-piece="wP"]')).toHaveCount(0); // a4 should be empty
  await expect(b5.locator('[data-piece="bP"]')).toHaveCount(0); // The black pawn should be gone
});

test('verify that white cannot move twice', async ({ page }) => {
  await page.goto('http://localhost:4200/');

  const squares = getChessBoardSquares(page);
  const { a2, a4, b2, b4 } = squares;

  await moveTo(page, a2, a4); // Move white pawn a2 to a4
  await moveTo(page, b2, b4); // Attempt to move another white pawn (should not be allowed)

  await expect(b2.locator('[data-piece="wP"]')).toHaveCount(1); // b2 should still have the white pawn
  await expect(b4.locator('[data-piece="wP"]')).toHaveCount(0); // Move should not have occurred
});


test('verify that black cannot move twice', async ({ page }) => {
  await page.goto('http://localhost:4200/');

  const squares = getChessBoardSquares(page);
  const { a2, a4, a7, a5, b2, b4, b7, b5, a1, a3, b1, c7, c5, b3} = squares;

  await moveTo(page, a2, a4);
  await moveTo(page, b7, b5);
  await moveTo(page, b5, b4); // If not allowed, this will be skipped internally

  await expect(b5.locator('[data-piece="bP"]')).toHaveCount(1);
  await expect(b4.locator('[data-piece="bP"]')).toHaveCount(0);
});

test('black can move', async ({ page }) => {
  await page.goto('http://localhost:4200/'); // Load the chess game

  const squares = getChessBoardSquares(page);
  const { a2, a4, f7, f5 } = squares;

  await moveTo(page, a2, a4); // Move white pawn from a2 to a4
  await moveTo(page, f7, f5); // Move black pawn from f7 to f5

  await expect(f7.locator('[data-piece="bP"]')).toHaveCount(0); // Ensure f7 is empty
  await expect(f5.locator('[data-piece="bP"]')).toHaveCount(1); // Ensure black pawn is at f5
});

test('test knight move', async ({ page }) => {
  await page.goto('http://localhost:4200/'); // Load the chess game

  const squares = getChessBoardSquares(page);
  const { d2, d4, c7, c5, b1, c3, a3 } = squares;

  await moveTo(page, d2, d4); // Move white pawn from d2 to d4
  await moveTo(page, c7, c5); // Move black pawn from c7 to c5
  await moveTo(page, b1, d2); // Move knight from b1 to d2

  await expect(d2.locator('[data-piece="wN"]')).toHaveCount(1); // Ensure knight is at d2
  await expect(b1.locator('[data-piece="wN"]')).toHaveCount(0); // Ensure b1 is empty

  await page.goto('http://localhost:4200/'); // Restart game

  await moveTo(page, b1, c3); // Move knight from b1 to c3

  await expect(c3.locator('[data-piece="wN"]')).toHaveCount(1); // Ensure knight is at c3
  await expect(b1.locator('[data-piece="wN"]')).toHaveCount(0); // Ensure b1 is empty

  await page.goto('http://localhost:4200/'); // Restart game

  await moveTo(page, b1, a3); // Move knight from b1 to a3

  await expect(a3.locator('[data-piece="wN"]')).toHaveCount(1); // Ensure knight is at a3
  await expect(b1.locator('[data-piece="wN"]')).toHaveCount(0); // Ensure b1 is empty
});

test('test knight cant move onto another white piece', async ({ page }) => {
  await page.goto('http://localhost:4200/'); // Load the chess game

  const squares = getChessBoardSquares(page);
  const { d2, d4, c7, c5, b1 } = squares;

  await moveTo(page, b1, d2); // Attempt to move knight to d2, which should be occupied

  await expect(d2.locator('[data-piece="wN"]')).toHaveCount(0); // Knight should not be at d2
  await expect(b1.locator('[data-piece="wN"]')).toHaveCount(1); // Knight should remain at b1
});

test('test knight illegal moves', async ({ page }) => {
  await page.goto('http://localhost:4200/'); // Load the chess game

  const squares = getChessBoardSquares(page);
  const { a2, a4, a7, a5, b2, b4, b7, b5, a1, a3, b1, b3} = squares;

  await moveTo(page, a2, a4); // Move white pawn from a2 to a4
  await moveTo(page, a7, a5); // Move black pawn from a7 to a5
  await moveTo(page, b2, b4); // Move white pawn from b2 to b4
  await moveTo(page, b7, b5); // Move black pawn from b7 to b5
  await moveTo(page, a1, a3); // Move knight from a1 to a3
  await moveTo(page, b1, a1); // Attempt illegal knight move to a1

  await expect(a1.locator('[data-piece="wN"]')).toHaveCount(0); // Knight should not be at a1
  await expect(b1.locator('[data-piece="wN"]')).toHaveCount(1); // Knight should remain at b1

  await moveTo(page, b1, a2); // Attempt illegal knight move to a2

  await expect(a2.locator('[data-piece="wN"]')).toHaveCount(0); // Knight should not be at a2
  await expect(b1.locator('[data-piece="wN"]')).toHaveCount(1); // Knight should remain at b1

  await moveTo(page, b1, b2); // Attempt illegal knight move to b2

  await expect(b2.locator('[data-piece="wN"]')).toHaveCount(0); // Knight should not be at b2
  await expect(b1.locator('[data-piece="wN"]')).toHaveCount(1); // Knight should remain at b1

  await moveTo(page, b1, b3); // Attempt illegal knight move to b3

  await expect(b3.locator('[data-piece="wN"]')).toHaveCount(0); // Knight should not be at b3
  await expect(b1.locator('[data-piece="wN"]')).toHaveCount(1); // Knight should remain at b1
});

test('pawn take', async ({ page }) => {
  await page.goto('http://localhost:4200/'); // Load the chess game

  const squares = getChessBoardSquares(page);
  const { a2, a4, b7, b5 } = squares;

  await moveTo(page, a2, a4); // Move white pawn from a2 to a4
  await moveTo(page, b7, b5); // Move black pawn from b7 to b5
  await moveTo(page, a4, b5); // Capture black pawn at b5 with white pawn

  await expect(a4.locator('[data-piece="wP"]')).toHaveCount(0); // Ensure a4 is empty
  await expect(b5.locator('[data-piece="wP"]')).toHaveCount(1); // Ensure white pawn is at b5
});

test('pawn cannot take forward', async ({ page }) => {
  await page.goto('http://localhost:4200/'); // Load the chess game

  const squares = getChessBoardSquares(page);
  const { a2, a4, a7, a5 } = squares;

  await moveTo(page, a2, a4); // Move white pawn from a2 to a4
  await moveTo(page, a7, a5); // Move black pawn from a7 to a5
  await moveTo(page, a4, a5); // Attempt invalid forward capture

  await expect(a5.locator('[data-piece="wP"]')).toHaveCount(0); // Pawn should not be at a5
  await expect(a4.locator('[data-piece="wP"]')).toHaveCount(1); // Pawn should remain at a4
});

test('rook cannot move passed pieces', async ({ page }) => {
  await page.goto('http://localhost:4200/'); // Load the chess game

  const squares = getChessBoardSquares(page);
  const { a2, a4, b7, b5, a1, a5, c2, c4 } = squares;

  await moveTo(page, a2, a4); // Move white pawn from a2 to a4
  await moveTo(page, b7, b5); // Move black pawn from b7 to b5
  await moveTo(page, a1, a5); // Attempt to move rook from a1 to a5 (blocked)

  await expect(a5.locator('[data-piece="wR"]')).toHaveCount(0); // Rook should not be at a5
  await expect(a1.locator('[data-piece="wR"]')).toHaveCount(1); // Rook should remain at a1

  await moveTo(page, c2, c4); // Move white pawn from c2 to c4
  await moveTo(page, b5, a4); // Capture with black pawn
  await moveTo(page, a1, a5); // Attempt to move rook again

  await expect(a5.locator('[data-piece="wR"]')).toHaveCount(0); // Rook should not be at a5
  await expect(a1.locator('[data-piece="wR"]')).toHaveCount(1); // Rook should remain at a1
});


test('rook takes', async ({ page }) => {
  await page.goto('http://localhost:4200/');

  const squares = getChessBoardSquares(page);
  const { a2, a4, b7, b5, a1, a7, c7, c5 } = squares;

  await moveTo(page, a2, a4); // White pawn moves forward
  await moveTo(page, b7, b5); // Black pawn moves forward
  await moveTo(page, a4, b5); // White pawn captures black pawn
  await moveTo(page, c7, c5); // Black pawn moves forward
  await moveTo(page, a1, a7); // White rook captures piece on a7

  await expect(a1.locator('[data-piece="wR"]')).toHaveCount(0);
  await expect(a7.locator('[data-piece="wR"]')).toHaveCount(1);
});

test('rook cannot move diagonally', async ({ page }) => {
  await page.goto('http://localhost:4200/');

  const squares = getChessBoardSquares(page);
  const { b2, b4, b7, b5, a1, c3 } = squares;

  await moveTo(page, b2, b4); // White pawn moves forward
  await moveTo(page, b7, b5); // Black pawn moves forward
  await moveTo(page, a1, c3); // White rook attempts illegal diagonal move

  await expect(c3.locator('[data-piece="wR"]')).toHaveCount(0);
  await expect(a1.locator('[data-piece="wR"]')).toHaveCount(1);
});

test('rook cannot take white piece', async ({ page }) => {
  await page.goto('http://localhost:4200/');

  const squares = getChessBoardSquares(page);
  const { a1, b1 } = squares;

  await moveTo(page, a1, b1); // White rook attempts to capture a white knight

  await expect(b1.locator('[data-piece="wR"]')).toHaveCount(0);
  await expect(a1.locator('[data-piece="wR"]')).toHaveCount(1);
  await expect(b1.locator('[data-piece="wN"]')).toHaveCount(1);
});

test('bishop cannot take white piece', async ({ page }) => {
  await page.goto('http://localhost:4200/');

  const squares = getChessBoardSquares(page);
  const { c1, b2 } = squares;

  await moveTo(page, c1, b2); // White bishop attempts to capture a white piece

  await expect(b2.locator('[data-piece="wB"]')).toHaveCount(0);
  await expect(c1.locator('[data-piece="wB"]')).toHaveCount(1);
});

test('bishop cannot move passed pieces', async ({ page }) => {
  await page.goto('http://localhost:4200/');

  const squares = getChessBoardSquares(page);
  const { c1, a3 } = squares;

  await moveTo(page, c1, a3); // White bishop attempts to jump over a piece

  await expect(a3.locator('[data-piece="wB"]')).toHaveCount(0);
  await expect(c1.locator('[data-piece="wB"]')).toHaveCount(1);
});

test('bishop cannot move forward or sideways', async ({ page }) => {
  await page.goto('http://localhost:4200/');

  const squares = getChessBoardSquares(page);
  const { c1, b1, c2, c4, b7, b6 } = squares;

  await moveTo(page, c1, b1); // White bishop attempts sideways move

  await expect(b1.locator('[data-piece="wB"]')).toHaveCount(0);
  await expect(c1.locator('[data-piece="wB"]')).toHaveCount(1);

  await moveTo(page, c2, c4); // White pawn moves forward
  await moveTo(page, b7, b6); // Black pawn moves forward
  await moveTo(page, c1, c2); // White bishop attempts forward move

  await expect(c2.locator('[data-piece="wB"]')).toHaveCount(0);
  await expect(c1.locator('[data-piece="wB"]')).toHaveCount(1);
});

test('bishop move successfully', async ({ page }) => {
  await page.goto('http://localhost:4200/');

  const squares = getChessBoardSquares(page);
  const { d2, d4, a7, a5, c1, g5 } = squares;

  await moveTo(page, d2, d4); // White pawn moves forward
  await moveTo(page, a7, a5); // Black pawn moves forward
  await moveTo(page, c1, g5); // White bishop moves diagonally

  await expect(c1.locator('[data-piece="wB"]')).toHaveCount(0);
  await expect(g5.locator('[data-piece="wB"]')).toHaveCount(1);
});

test('bishop takes', async ({ page }) => {
  await page.goto('http://localhost:4200/');

  const squares = getChessBoardSquares(page);
  const { d2, d4, g7, g5, c1,} = squares;

  await moveTo(page, d2, d4); // White pawn moves forward
  await moveTo(page, g7, g5); // Black pawn moves forward
  await moveTo(page, c1, g5); // White bishop captures black pawn

  await expect(c1.locator('[data-piece="wB"]')).toHaveCount(0);
  await expect(g5.locator('[data-piece="wB"]')).toHaveCount(1);
});

test('Queen cannot move onto white pieces', async ({ page }) => {
  await page.goto('http://localhost:4200/');

  const squares = getChessBoardSquares(page);
  const { d1, d2 } = squares;

  await moveTo(page, d1, d2); // White queen attempts to move onto a white piece

  await expect(d2.locator('[data-piece="wQ"]')).toHaveCount(0);
  await expect(d1.locator('[data-piece="wQ"]')).toHaveCount(1);
});


test('Queen cannot move passed pieces', async ({ page }) => {
  await page.goto('http://localhost:4200/');

  const squares = getChessBoardSquares(page);
  const { a2, a4, a7, a5, b2, b4, b7, b5, a1, a3, b1, c7, c5, b3, c2, c4, c3, c1, b6, d2, d4, g5, g7, d1, d3, d5 } = squares;

  await moveTo(page, d1, d3); // White queen moves to d3, blocking her path
  await expect(d3.locator('[data-piece="wQ"]')).toHaveCount(0);
  await expect(d1.locator('[data-piece="wQ"]')).toHaveCount(1);

  await moveTo(page, d2, d4); // White pawn moves forward
  await moveTo(page, c7, c5); // Black pawn moves forward
  await moveTo(page, a2, a3); // White pawn moves forward
  await moveTo(page, c5, d4); // Black pawn captures white pawn
  await moveTo(page, d1, d5); // White queen attempts to move past piece (blocked)

  await expect(d5.locator('[data-piece="wQ"]')).toHaveCount(0);
  await expect(d1.locator('[data-piece="wQ"]')).toHaveCount(1);
});

test('Queen cannot move like a knight', async ({ page }) => {
  await page.goto('http://localhost:4200/');

  const squares = getChessBoardSquares(page);
  const { a2, a4, a7, a5, b2, b4, b7, b5, a1, a3, b1, c7, c5, b3, c2, c4, c3, c1, b6, d2, d4, g5, g7, d1, d3, d5, a6, e3, e2, e4 } = squares;

  await moveTo(page, d2, d4); // White pawn moves forward
  await moveTo(page, a7, a6); // Black pawn moves forward
  await moveTo(page, e2, e4); // White pawn moves forward
  await moveTo(page, a6, a5); // Black pawn moves forward
  await moveTo(page, d1, e3); // White queen attempts knight move (invalid)

  await expect(e3.locator('[data-piece="wQ"]')).toHaveCount(0);
  await expect(d1.locator('[data-piece="wQ"]')).toHaveCount(1);
});

test('Queen takes', async ({ page }) => {
  await page.goto('http://localhost:4200/');

  const squares = getChessBoardSquares(page);
  const { a2, a4, a7, a5, b2, b4, b7, b5, a1, a3, b1, c7, c5, b3, c2, c4, c3, c1, b6, d2, d4, g5, g7, d1, d3, d5 } = squares;

  await moveTo(page, d2, d4); // White pawn moves forward
  await moveTo(page, c7, c5); // Black pawn moves forward
  await moveTo(page, a2, a3); // White pawn moves forward
  await moveTo(page, c5, d4); // Black pawn captures white pawn
  await moveTo(page, d1, d4); // White queen captures black pawn

  await expect(d1.locator('[data-piece="wQ"]')).toHaveCount(0);
  await expect(d4.locator('[data-piece="wQ"]')).toHaveCount(1);
});

test('Queen can move diagonally and sideways', async ({ page }) => {
  await page.goto('http://localhost:4200/');

  const squares = getChessBoardSquares(page);
  const { a2, a4, a7, a5, b2, b4, b7, b5, a1, a3, b1, c7, c5, b3, c2, c4, c3, c1, b6, d2, d4, g5, g7, d1, d3, d5, e2, e4, g4 } = squares;

  await moveTo(page, e2, e4); // White pawn moves forward
  await moveTo(page, a7, a5); // Black pawn moves forward
  await moveTo(page, d1, g4); // White queen moves diagonally

  await expect(d1.locator('[data-piece="wQ"]')).toHaveCount(0);
  await expect(g4.locator('[data-piece="wQ"]')).toHaveCount(1);

  await page.goto('http://localhost:4200/');

  await moveTo(page, d2, d4); // White pawn moves forward
  await moveTo(page, a7, a5); // Black pawn moves forward
  await moveTo(page, c1, g5); // White bishop moves diagonally
  await moveTo(page, a5, a4); // Black pawn moves forward
  await moveTo(page, d1, c1); // White queen moves sideways

  await expect(d1.locator('[data-piece="wQ"]')).toHaveCount(0);
  await expect(c1.locator('[data-piece="wQ"]')).toHaveCount(1);
});

test('king can move diagonally, forward, and sideways', async ({ page }) => {
  await page.goto('http://localhost:4200/');

  const squares = getChessBoardSquares(page);
  const { a2, a4, a7, a5, b2, b4, b7, b5, a1, a3, b1, c7, c5, b3, c2, c4, c3, c1, b6, d2, d4, g5, g7, d1, d3, d5, e2, e4, g4, e1 } = squares;

  await moveTo(page, e2, e4); // White pawn moves forward
  await moveTo(page, a7, a5); // Black pawn moves forward
  await moveTo(page, e1, e2); // White king moves forward

  await expect(e1.locator('[data-piece="wK"]')).toHaveCount(0);
  await expect(e2.locator('[data-piece="wK"]')).toHaveCount(1);

  await moveTo(page, b7, b5); // Black pawn moves forward
  await moveTo(page, e2, d3); // White king moves diagonally

  await expect(e2.locator('[data-piece="wK"]')).toHaveCount(0);
  await expect(d3.locator('[data-piece="wK"]')).toHaveCount(1);

  await moveTo(page, c7, c5); // Black pawn moves forward
  await moveTo(page, d3, c3); // White king moves sideways

  await expect(d3.locator('[data-piece="wK"]')).toHaveCount(0);
  await expect(c3.locator('[data-piece="wK"]')).toHaveCount(1);
});


test('king cannot move more than 1 square', async ({ page }) => {
  await page.goto('http://localhost:4200/');

  const squares = getChessBoardSquares(page);
  const {a2, a4, a7, a5, b2, b4, b7, b5, a1, a3, b1, c7, c5, b3, c2, c4, c3, c1, b6, d2, d4, g5, g7, d1, d3, d5, e2, e4, g4, e1, e3} = squares;

  await moveTo(page, e2, e4); // Move white pawn from e2 to e4
  await moveTo(page, a7, a5); // Move black pawn from a7 to a5
  await moveTo(page, e1, e3); // Attempt to move the white king from e1 to e3

  await expect(e3.locator('[data-piece="wK"]')).toHaveCount(0); // Verify the white king is not in e3 (should not move more than 1 square)
  await expect(e1.locator('[data-piece="wK"]')).toHaveCount(1); // Verify the white king is still in e1
});

test('king cannot move into check', async ({ page }) => {
  await page.goto('http://localhost:4200/');

  const squares = getChessBoardSquares(page);
  const {a2, a4, a7, a5, b2, b4, b7, b5, a1, a3, b1, c7, c5, b3, c2, c4, c3, c1, b6, d2, d4, g5, g7, d1, d3, d5, e2, e4, g4, e1, e3, c8, d7, d6} = squares;

  await moveTo(page, e2, e4); // Move white pawn from e2 to e4
  await moveTo(page, d7, d6); // Move black pawn from d7 to d6
  await moveTo(page, a2, a3); // Move white pawn from a2 to a3
  await moveTo(page, c8, g4); // Move black queen from c8 to g4 (threatening check)
  await moveTo(page, e1, e2); // Attempt to move white king from e1 to e2 (into check)

  await expect(e2.locator('[data-piece="wK"]')).toHaveCount(0); // Verify the king is not in e2 (should not move into check)
  await expect(e1.locator('[data-piece="wK"]')).toHaveCount(1); // Verify the king is still in e1
});

test('king takes', async ({ page }) => {
  await page.goto('http://localhost:4200/');

  const squares = getChessBoardSquares(page);
  const {f7, f5, f3, f4, a6, a2, a4, a7, a5, b2, b4, b7, b5, a1, a3, b1, c7, c5, b3, c2, c4, c3, c1, b6, d2, d4, g5, g7, d1, d3, d5, e2, e4, g4, e1, e3, c8, d7, d6} = squares;

  await moveTo(page, e2, e4); // Move white pawn from e2 to e4
  await moveTo(page, f7, f5); // Move black pawn from f7 to f5
  await moveTo(page, e1, e2); // Move white king from e1 to e2
  await moveTo(page, f5, f4); // Move black pawn from f5 to f4
  await moveTo(page, e2, f3); // Move white king from e2 to f3
  await moveTo(page, a7, a6); // Move black pawn from a7 to a6
  await moveTo(page, f3, f4); // White king captures black pawn on f4

  await expect(f3.locator('[data-piece="wK"]')).toHaveCount(0); // Verify the king is no longer on f3
  await expect(f4.locator('[data-piece="wK"]')).toHaveCount(1); // Verify the king is now on f4
  await expect(f4.locator('[data-piece="bP"]')).toHaveCount(0); // Verify the black pawn is no longer on f4 (captured)
});

test('illegal check moves', async ({ page }) => {
  await page.goto('http://localhost:4200/');

  const squares = getChessBoardSquares(page);
  const {g1, f8, e6, e7, f7, f5, f3, f4, a6, a2, a4, a7, a5, b2, b4, b7, b5, a1, a3, b1, c7, c5, b3, c2, c4, c3, c1, b6, d2, d4, g5, g7, d1, d3, d5, e2, e4, g4, e1, e3, c8, d7, d6} = squares;

  await moveTo(page, d2, d3); // Move white pawn from d2 to d3
  await moveTo(page, e7, e6); // Move black pawn from e7 to e6
  await moveTo(page, a2, a3); // Move white pawn from a2 to a3
  await moveTo(page, f8, b4); // Move black bishop from f8 to b4
  await moveTo(page, g1, f3); // Move white knight from g1 to f3 (an illegal move)

  await expect(f3.locator('[data-piece="wN"]')).toHaveCount(0); // Verify the white knight is not on f3 (illegal move)
  await expect(g1.locator('[data-piece="wN"]')).toHaveCount(1); // Verify the white knight is still on g1

  await moveTo(page, a1, a2); // Move white rook from a1 to a2

  await expect(a2.locator('[data-piece="wR"]')).toHaveCount(0); // Verify the white rook is not on a2
  await expect(a1.locator('[data-piece="wR"]')).toHaveCount(1); // Verify the white rook is still on a1
});

test('block check', async ({ page }) => {
  await page.goto('http://localhost:4200/');

  const squares = getChessBoardSquares(page);
  const {g1, f8, e6, e7, f7, f5, f3, f4, a6, a2, a4, a7, a5, b2, b4, b7, b5, a1, a3, b1, c7, c5, b3, c2, c4, c3, c1, b6, d2, d4, g5, g7, d1, d3, d5, e2, e4, g4, e1, e3, c8, d7, d6} = squares;

  await moveTo(page, d2, d3); // Move white pawn from d2 to d3
  await moveTo(page, e7, e6); // Move black pawn from e7 to e6
  await moveTo(page, a2, a3); // Move white pawn from a2 to a3
  await moveTo(page, f8, b4); // Move black bishop from f8 to b4 (threatening check)
  await moveTo(page, c1, d2); // White bishop blocks the check by moving from c1 to d2

  await expect(c1.locator('[data-piece="wB"]')).toHaveCount(0); // Verify the white bishop is no longer on c1
  await expect(d2.locator('[data-piece="wB"]')).toHaveCount(1); // Verify the white bishop is now on d2, blocking the check
});

test('pinned piece', async ({ page }) => {
  await page.goto('http://localhost:4200/');

  const squares = getChessBoardSquares(page);
  const {g1, f8, e6, e7, f7, f5, f3, f4, a6, a2, a4, a7, a5, b2, b4, b7, b5, a1, a3, b1, c7, c5, b3, c2, c4, c3, c1, b6, d2, d4, g5, g7, d1, d3, d5, e2, e4, g4, e1, e3, c8, d7, d6} = squares;

  await moveTo(page, d2, d3); // Move white pawn from d2 to d3
  await moveTo(page, e7, e6); // Move black pawn from e7 to e6
  await moveTo(page, a2, a3); // Move white pawn from a2 to a3
  await moveTo(page, f8, b4); // Move black bishop from f8 to b4 (pinning white bishop on c1)
  await moveTo(page, c1, d2); // White bishop attempts to move but cannot due to pin
  await moveTo(page, a7, a6); // Move black pawn from a7 to a6
  await moveTo(page, d2, c1); // White bishop captures black bishop on c1

  await expect(c1.locator('[data-piece="wB"]')).toHaveCount(0); // Verify the white bishop is no longer on c1
  await expect(d2.locator('[data-piece="wB"]')).toHaveCount(1); // Verify the white bishop is now on d2
});
