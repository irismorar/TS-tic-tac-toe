import "./App.css";
import { useGameState } from "./useGameState";

export default function App() {
  const {
    moves,
    handleMoves,
    hasPlayer1Won,
    hasPlayer2Won,
    getWinningCombination,
    hasGameBeenWon,
    isDraw,
    isGameOver,
  } = useGameState();

  return (
    <main>
      <div>
        {" "}
        {isGameOver() && "GAME OVER!"} <br />
        {hasPlayer1Won() && "Player 1 wins!"}
        {hasPlayer2Won() && "Player 2 wins!"}
        {isDraw() && "DRAW!"}
      </div>
      <section className="game-container">
        <div
          className="player_name"
          style={{
            color:
              (moves.length % 2 === 0 && !hasGameBeenWon()) || hasPlayer1Won()
                ? "rgb(82, 146, 235)"
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
                onClick={() =>
                  handleMoves(
                    moves.indexOf(move) % 2 === 0 ? "P1" : "P2",
                    index,
                  )
                }
              >
                {move}
              </div>
            );
          })}
        </section>
        <div
          className="player_name"
          style={{
            color:
              (moves.length % 2 !== 0 && !hasGameBeenWon()) || hasPlayer2Won()
                ? "hsla(46, 91%, 56%, 1)"
                : "hsla(0, 0%, 100%, .1)",
          }}
        >
          P2
        </div>
      </section>
    </main>
  );
}
