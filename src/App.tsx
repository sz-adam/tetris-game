import { GameProvider } from "./context/GameContext";
import Game from "./page/Game";

function App() {
  return (
    <GameProvider>
      <div className="min-h-screen bg-slate-600 flex justify-center items-center">
        <Game />
      </div>
    </GameProvider>
  );
}

export default App;
