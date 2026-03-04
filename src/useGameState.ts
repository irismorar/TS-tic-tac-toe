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

  const handleMoves = useCallback((player: "P1" | "P2", indexCell: number) => {
    setMoves((prevMoves: BoardState) => {
      if (prevMoves[indexCell] !== null) {
        return prevMoves;
      }
      const playersMoves = [...prevMoves];
      playersMoves[indexCell] = player === "P1" ? "X" : "O";
      return playersMoves;
    });
  }, []);

  const getPlayer1Moves = () => {
    const player1MoveIndices: number[] = [];
    for (let i = 0; i < 9; i++) {
      if (moves[i] === "X") {
        player1MoveIndices.push(i);
      }
    }
    return player1MoveIndices;
  };

  const getPlayer2Moves = () => {
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
      if (movesIncludeCombination(getPlayer1Moves(), winningCombination)) {
        return true;
      }
    }
    return false;
  };

  const hasPlayer2Won = () => {
    for (const winningCombination of WINNING_COMBINATIONS) {
      if (movesIncludeCombination(getPlayer2Moves(), winningCombination)) {
        return true;
      }
    }
    return false;
  };

  const getWinningCombination = () => {
    for (const winningCombination of WINNING_COMBINATIONS) {
      if (
        movesIncludeCombination(getPlayer1Moves(), winningCombination) ||
        movesIncludeCombination(getPlayer2Moves(), winningCombination)
      ) {
        return winningCombination;
      }
    }
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

  return {
    moves,
    handleMoves,
    hasPlayer1Won,
    hasPlayer2Won,
    getWinningCombination,
    hasGameBeenWon,
    isDraw,
    isGameOver,
  };
}
