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

  const getPlayer1MovesIndices = useCallback(() => {
    const player1MoveIndices: number[] = [];
    for (let i = 0; i < 9; i++) {
      if (moves[i] === "X") {
        player1MoveIndices.push(i);
      }
    }
    return player1MoveIndices;
  }, [moves]);

  const getPlayer2MovesIndices = useCallback(() => {
    const player2MoveIndices: number[] = [];
    for (let i = 0; i < 9; i++) {
      if (moves[i] === "O") {
        player2MoveIndices.push(i);
      }
    }
    return player2MoveIndices;
  }, [moves]);

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

  const hasPlayer1Won = useCallback(() => {
    for (const winningCombination of WINNING_COMBINATIONS) {
      if (
        movesIncludeCombination(getPlayer1MovesIndices(), winningCombination)
      ) {
        return true;
      }
    }
    return false;
  }, [getPlayer1MovesIndices]);

  const hasPlayer2Won = useCallback(() => {
    for (const winningCombination of WINNING_COMBINATIONS) {
      if (
        movesIncludeCombination(getPlayer2MovesIndices(), winningCombination)
      ) {
        return true;
      }
    }
    return false;
  }, [getPlayer2MovesIndices]);

  const hasGameBeenWon = useCallback(() => {
    return hasPlayer1Won() || hasPlayer2Won();
  }, [hasPlayer1Won, hasPlayer2Won]);

  const cellHasMove = useCallback(
    (cellIndex: number) => {
      return moves[cellIndex] !== null;
    },
    [moves],
  );

  const isPlayer1CurrentPlayer = useCallback(() => {
    const currentMoves = moves.filter((move) => move !== null);
    return currentMoves.length % 2 === 0;
  }, [moves]);

  const addMove = useCallback(
    (cellIndex: number) => {
      setMoves((prev) => {
        if (cellHasMove(cellIndex) || hasGameBeenWon()) {
          return prev;
        }
        const currentMoves = [...prev];
        currentMoves[cellIndex] = isPlayer1CurrentPlayer() ? "X" : "O";
        return currentMoves;
      });
    },
    [cellHasMove, hasGameBeenWon, isPlayer1CurrentPlayer],
  );

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
    isPlayer1CurrentPlayer,
    getWinningCombination,
    isDraw,
    isGameOver,
    reset,
  };
}
