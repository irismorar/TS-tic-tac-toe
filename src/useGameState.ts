import { useCallback, useState } from "react";

type BoardState = (null | "X" | "O")[];

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

export function useGameState() {
  const [moves, setMoves] = useState<BoardState>([
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
  ]);

  const addMove = useCallback((cellIndex: number) => {
    setMoves((prev) => {
      if (prev[cellIndex] !== null) {
        return prev;
      }
      const completedMoves = prev.filter((move) => move !== null);
      const currentPlayer = completedMoves.length % 2 === 0 ? "P1" : "P2";
      const currentMoves = [...prev];
      currentMoves[cellIndex] = currentPlayer === "P1" ? "X" : "O";
      return currentMoves;
    });
  }, []);

  const getPlayer1MovesIndices = () => {
    const player1MoveIndices: number[] = [];
    for (let i = 0; i < 9; i++) {
      if (moves[i] === "X") {
        player1MoveIndices.push(i);
      }
    }
    return player1MoveIndices;
  };

  const getPlayer2MovesIndices = () => {
    const player2MoveIndices: number[] = [];
    for (let i = 0; i < 9; i++) {
      if (moves[i] === "O") {
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

  const hasPlayer1Won = () => {
    for (const winningCombination of WINNING_COMBINATIONS) {
      if (
        movesIncludeCombination(getPlayer1MovesIndices(), winningCombination)
      ) {
        return true;
      }
    }
    return false;
  };

  const hasPlayer2Won = () => {
    for (const winningCombination of WINNING_COMBINATIONS) {
      if (
        movesIncludeCombination(getPlayer2MovesIndices(), winningCombination)
      ) {
        return true;
      }
    }
    return false;
  };

  const getWinningCombination = () => {
    for (const winningCombination of WINNING_COMBINATIONS) {
      if (
        movesIncludeCombination(getPlayer1MovesIndices(), winningCombination) ||
        movesIncludeCombination(getPlayer2MovesIndices(), winningCombination)
      ) {
        return winningCombination;
      }
    }
    return null;
  };

  const hasGameBeenWon = () => {
    return hasPlayer1Won() || hasPlayer2Won();
  };

  const isDraw = () => {
    return !hasGameBeenWon() && !moves.includes(null);
  };

  const isGameOver = () => {
    return hasGameBeenWon() || isDraw();
  };

  const reset = () => {
    setMoves([null, null, null, null, null, null, null, null, null]);
  };

  return {
    moves,
    addMove,
    hasPlayer1Won,
    hasPlayer2Won,
    getWinningCombination,
    isDraw,
    isGameOver,
    reset,
  };
}
