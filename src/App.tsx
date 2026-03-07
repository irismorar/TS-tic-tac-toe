import "./App.css";
import { useGameState } from "./useGameState";

export default function App() {
  const {
    moves,
    addMove,
    hasPlayer1Won,
    hasPlayer2Won,
    getWinningCombination,
    isDraw,
    isPlayer1CurrentPlayer,
    isGameOver,
    reset,
  } = useGameState();

  return (
    <main>
      <div>
        <div>
          {" "}
          {isGameOver() && "GAME OVER"} <br />
          {hasPlayer1Won() && "Player 1 wins!"}
          {hasPlayer2Won() && "Player 2 wins!"}
          {isDraw() && "DRAW!"}
        </div>
      </div>

      <section className="game-container">
        <div
          style={{
            color:
              (isPlayer1CurrentPlayer() && !isGameOver()) || hasPlayer1Won()
                ? "hsla(198, 96%, 50%, 1)"
                : "hsla(0, 0%, 100%, .1)",
          }}
        >
          P1
        </div>
        <section className="board-container">
          {moves.map((move, index) => {
            return (
              <div
                key={index}
                className="board-cell"
                onClick={() => {
                  addMove(index);
                }}
                style={{
                  backgroundColor: getWinningCombination()?.includes(index)
                    ? "hsla(136, 89%, 71%, .9)"
                    : "transparent",
                  color: getWinningCombination()?.includes(index)
                    ? "hsla(256, 75%, 45%, 1)"
                    : "hsla(284, 78%, 61%, 1)",
                }}
              >
                {move}
              </div>
            );
          })}
        </section>
        <div
          style={{
            color:
              (!isPlayer1CurrentPlayer() && !isGameOver()) || hasPlayer2Won()
                ? "hsla(46, 91%, 56%, 1)"
                : "hsla(0, 0%, 100%, .1)",
          }}
        >
          P2
        </div>
      </section>

      <div>
        <button onClick={reset}>RESET</button>
      </div>
    </main>
  );
}
