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

const getPlayer1Moves = (state: { moves: number[] }) => {
  return state.moves.filter((_, index) => index % 2 === 0);
};

const getPlayer2Moves = (state: { moves: number[] }) => {
  return state.moves.filter((_, index) => index % 2 !== 0);
};

const movesIncludeCombination = (
  playerMoves: number[],
  combination: [number, number, number],
) => {
  for (const combinationPosition of combination) {
    if (!playerMoves.includes(combinationPosition)) {
      return false;
    }
  }
  return true;
};
