import { useGameContext } from "../context/GameContext";
import MobileButton from "./MobileButton";

//TODO: következő megjelenítése

const GameBoard: React.FC = () => {
  const { board, color } = useGameContext();

  return (
    <>
      <div className="grid grid-cols-10 gap-0.5 border border-zinc-400">
        {board.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className={`w-6 h-6 md:w-8 md:h-8 ${
                cell ? color : "bg-slate-800"
              } border border-slate-900`}
            ></div>
          ))
        )}
      </div>
      <MobileButton />
    </>
  );
};

export default GameBoard;
