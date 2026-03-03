import type { BoardState } from "./initialState";

const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const getPlayer1Moves = (state: BoardState) => {
  const player1MoveIndices: number[] = [];
  for (let i = 0; i < 9; i++) {
    if (state.moves[i] === "X") {
      player1MoveIndices.push(i);
    }
  }
  return player1MoveIndices;
};

const getPlayer2Moves = (state: BoardState) => {
  const player2MoveIndices: number[] = [];
  for (let i = 0; i < 9; i++) {
    if (state.moves[i] === "0") {
      player2MoveIndices.push(i);
    }
  }
  return player2MoveIndices;
};

const movesIncludeCombination = (
  playerMoves: number[],
  combination: number[],
) => {
  for (const combinationPosition of combination) {
    if (!playerMoves.includes(combinationPosition)) {
      return false;
    }
  }
  return true;
};

export const hasPlayer1Won = (state: BoardState) => {
  for (const winningCombination of WINNING_COMBINATIONS) {
    if (movesIncludeCombination(getPlayer1Moves(state), winningCombination)) {
      return true;
    }
  }
  return false;
};

export const hasPlayer2Won = (state: BoardState) => {
  for (const winningCombination of WINNING_COMBINATIONS) {
    if (movesIncludeCombination(getPlayer2Moves(state), winningCombination)) {
      return true;
    }
  }
  return false;
};

export const getWinningCombination = (state: BoardState) => {
  for (const winningCombination of WINNING_COMBINATIONS) {
    if (
      movesIncludeCombination(getPlayer1Moves(state), winningCombination) ||
      movesIncludeCombination(getPlayer2Moves(state), winningCombination)
    ) {
      return winningCombination;
    }
  }
};

export const hasGameBeenWon = (state: BoardState) => {
  return hasPlayer1Won(state) || hasPlayer2Won(state);
};

export const isDraw = (state: BoardState) => {
  return state.moves.length === 9 && !hasGameBeenWon(state);
};

export const isGameOver = (state: BoardState) => {
  return hasGameBeenWon(state) || isDraw(state);
};
