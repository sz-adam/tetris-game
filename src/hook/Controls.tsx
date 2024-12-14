import { useEffect } from "react";

interface GameControls {
  position: { row: number; col: number };
  setPosition: React.Dispatch<
    React.SetStateAction<{ row: number; col: number }>
  >;
  tetromino: number[][];
  setTetromino: React.Dispatch<React.SetStateAction<number[][]>>;
  cols: number;
  lockTetromino: () => void;
  newTetromino: () => void;
  isCollision: () => boolean;
}

const useGameControls = ({
  position,
  setPosition,
  tetromino,
  setTetromino,
  cols,
  lockTetromino,
  newTetromino,
  isCollision,
}: GameControls) => {
  
  // Mozgás lefelé
  const moveDown = () => {
    if (isCollision()) {
      lockTetromino();
      newTetromino();
    } else {
      setPosition((prev) => ({ ...prev, row: prev.row + 1 }));
    }
  };

  // Mozgás balra
  const moveLeft = () => {
    setPosition((prev) => {
      if (prev.col > 0) {
        return { ...prev, col: prev.col - 1 };
      }
      return prev;
    });
  };

  // Mozgás jobbra
  const moveRight = () => {
    setPosition((prev) => {
      if (prev.col + tetromino[0].length < cols) {
        return { ...prev, col: prev.col + 1 };
      }
      return prev;
    });
  };

  // forgatása
  const rotate = () => {
    setTetromino((prev) =>
      prev[0].map((_, index) => prev.map((row) => row[index]).reverse())
    );
  };

  // Billentyűzet figyelése
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case "ArrowDown":
          moveDown();
          break;
        case "ArrowLeft":
          moveLeft();
          break;
        case "ArrowRight":
          moveRight();
          break;
        case "ArrowUp":
          rotate();
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [position, tetromino]);

  useEffect(() => {
    const interval = setInterval(() => {
      moveDown();
    }, 1000);
    return () => clearInterval(interval);
  }, [position]);

  return {
    moveDown,
    moveLeft,
    moveRight,
    rotate,
  };
};

export default useGameControls;
