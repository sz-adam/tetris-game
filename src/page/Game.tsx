import GameBoard from "../components/GameBoard";
import GameOver from "../components/GameOver";
import { useGameContext } from "../context/GameContext";

const Game = () => {
  const { gameOver, score } = useGameContext();

  return (
    <div className="flex w-full justify-center">
      {gameOver ? (
        <GameOver />
      ) : (
        <div className="flex md:w-1/2 justify-around flex-col md:flex-row">
          <div className="flex flex-col items-center">
            <h1 className="text-center font-semibold mb-3 text-3xl text-slate-300 tracking-wider">
              Tetris Game
            </h1>
            {/**Mobile nézet */}
            <div className="text-white text-2xl text-center m-1 px-10 flex items-center md:hidden">
              Score: {score}
            </div>
            <GameBoard />
          </div>
          <div className="text-white text-2xl text-center m-1 border rounded-3xl px-10 h-16 items-center hidden md:flex">
            Score: {score}
          </div>
        </div>
      )}
    </div>
  );
};

export default Game;
