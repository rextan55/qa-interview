# Chorus QA Interview

## About this Interview

Welcome to Chorus Engineering's QA Interview project!

We're looking for QA Engineers who are experienced, passionate, and obsessed with strong systems and high productivity.

The goal of this interview is to identify your skills as a QA professional, and is followed by
a 1 hour pairing session with other QA Engineers to review and extend your work by writing more tests together.

## Tech Stack
React UI

Emotion CSS

Typescript

NX Monorepo

Playwright E2E

## Prerequisites
Package Manager: pnpm 8.15.8
Node: 20.14.0 (LTS)

## Instructions
1. [Install pnpm](https://pnpm.io/installation)
2. [Install nvm](https://github.com/nvm-sh/nvm?tab=readme-ov-file#installing-and-updating)
- Our recommendation: use brew and run `brew install nvm`
  Brew Install Instructions 
  ```bash
  /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
  ```
3. Run `pnpm install`
4. Run `pm2 start`

The API and React server will automatically watch for changes. You can manage start/stop using `pm2`

Use `pm2 stop all` to stop the servers.
Use `pm2 delete all` to delete the entry from the pm2 process list.

### Troubleshooting

> I can't execute pm2!

pm2 is part of the devDependencies, so when you install the dependencies, you should be able to
execute the binary from node_modules.

Either use `pnpm pm2` or add `node_modules/.bin` to your `PATH`.


## Prompt

Lets QA Chess!

We want to QA our Chess source code. 

The source code allows the user to move White pieces, and the computer will move black pieces.

Your tests should do the following:
1. Test that Black pieces are not making illegal moves.
2. Test that White pieces are not making illegal moves.
3. Ensure that all possible chess movements are 100% covered.

**Testable Chessboard Configurations**

http://localhost:4200 -> A chessboard that ensures the user can play a game with legal moves, with white starting first.

http://localhost:4200/computer -> A chessboard where the computer plays black and you play white. All legal moves should work.

http://localhost:4200/custom?fen= -> A chessboard that adheres to the "fen" specficiation. This is useful for testing specific board configurations. Its always White's turn.

**Example board states**

[http://localhost:4200/custom?fen=8/8/8/3P4/8/8/8/8 w - - 0 1](http://localhost:4200/custom?fen=8/8/8/3P4/8/8/8/8%20w%20-%20-%200%201)

Summary of Meaning
-	A white pawn is located at d5.
-	It is White’s turn to move.
-	No castling is possible for either side.
-	There is no en passant opportunity.
-	The halfmove clock is at 0, meaning no captures or pawn moves have occurred since this position was set.
-	This is the first full move of the game.

[http://localhost:4200/custom?fen=8/8/8/3P4/3p4/8/8/8 w - - 0 1](http://localhost:4200/custom?fen=8/8/8/3P4/3p4/8/8/8%20w%20-%20-%200%201)

Summary of Meaning
- A white pawn (P) is at d5.
- A black pawn (p) is at d4, directly below the white pawn.
- It is White’s turn to move.
-	No castling is available.
- No en passant opportunity exists in this position.
-	The halfmove clock is at 0, meaning no captures or pawn moves have occurred since this position was set.
•	It’s the first move of the game.

**Hints**

You don't need to test that every possible square for each piece is accessible
