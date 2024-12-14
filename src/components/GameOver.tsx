import { useGameContext } from "../context/GameContext";

const GameOver = () => {
  const { newGame, score } = useGameContext();

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-opacity-75">
      <h1 className="text-white text-5xl font-bold mb-6">Game Over</h1>
      <div className="text-white text-2xl">{score}</div>
      <button
        onClick={() => newGame()}
        className="mt-5 px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
      >
        Restart
      </button>
    </div>
  );
};

export default GameOver;
