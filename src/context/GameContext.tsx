import React, { createContext, ReactNode, useContext, useState } from "react";
import { GameState } from "../model/GameModel";
import { getRandomTetromino } from "../utils/tetromino";
import colors from "../utils/colors";
import useGameControls from "../hook/Controls";

const defaultState: GameState = {
  board: [],
  tetromino: [],
  position: { row: 0, col: 3 },
  generateBoard: () => [],
  placeTetrominoOnBoard: () => [],
  color: "",
  gameOver: false,
  newGame: () => {},
  score: 0,
  moveDown: () => {},
  moveLeft: () => {},
  moveRight: () => {},
  rotate: () => {},
};

const cols = 10;
const rows = 20;

const GameContext = createContext<GameState>(defaultState);

export const GameProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const generateBoard = () => {
    return Array.from({ length: rows }, () => Array(cols).fill(null));
  };

  const randomColor = () => {
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const [board, setBoard] = useState<string[][]>(generateBoard());
  const [tetromino, setTetromino] = useState<number[][]>(getRandomTetromino());
  const [position, setPosition] = useState({ row: 0, col: 3 });
  const [color, setColor] = useState<string>(randomColor);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);

  //táblán elhelyezés
  const placeTetrominoOnBoard = (): string[][] => {
    const newBoard = board.map((row) => [...row]);

    tetromino.forEach((row, y) => {
      row.forEach((cell, x) => {
        if (cell) {
          const boardX = position.col + x;
          const boardY = position.row + y;
          //nem lépi-e túl a játékteret
          if (boardY < board.length && boardX < board[0].length) {
            newBoard[boardY][boardX] = color;
          }
        }
      });
    });

    return newBoard;
  };

  // tábla frissítése
  const updatedBoard = placeTetrominoOnBoard();

  //Alakzat rögzítése a pályán
  const lockTetromino = () => {
    setBoard((prevBoard) => {
      const newBoard = [...prevBoard];
      tetromino.forEach((row, y) => {
        row.forEach((cell, x) => {
          if (cell) {
            const boardX = position.col + x;
            const boardY = position.row + y;
            if (boardY < rows && boardX < cols) {
              newBoard[boardY][boardX] = color;
            }
          }
        });
      });

      // sorok törlése
      return clearFullRows(newBoard);
    });
  };

  // Új alakzat
  const newTetromino = () => {
    const newTetrominoShape = getRandomTetromino();
    const startingPosition = { row: 0, col: 3 };
    const newColor = randomColor();

    setTetromino(newTetrominoShape);
    setPosition(startingPosition);
    setColor(newColor);

    // Játék vége ellenőrzése
    if (isGameOver()) {
      setGameOver(true);
    }
  };

  // alakzatok ütközése és a tábla alja
  const isCollision = (): boolean => {
    return tetromino.some((row, y) =>
      row.some((cell, x) => {
        if (cell) {
          const boardX = position.col + x;
          const boardY = position.row + y + 1;
          if (boardY >= rows || board[boardY]?.[boardX]) {
            return true;
          }
        }
        return false;
      })
    );
  };

  const isGameOver = (): boolean => {
    return tetromino.some((row, y) =>
      row.some((cell, x) => {
        if (cell) {
          const boardX = position.col + x;
          const boardY = position.row + y;
          if (board[boardY]?.[boardX]) {
            return true;
          }
        }
        return false;
      })
    );
  };

  //új játék indítása
  const newGame = () => {
    setBoard(generateBoard());
    setTetromino(getRandomTetromino());
    setPosition({ row: 0, col: 3 });
    setColor(randomColor());
    setGameOver(false);
    setScore(0);
  };

  //sorok törlése
  const clearFullRows = (board: string[][]): string[][] => {
    // a teli sorokat töröljük
    const newBoard = board.filter((row) => row.some((cell) => cell === null));
    const rowsCleared = rows - newBoard.length;
    setScore((prevScore) => prevScore + rowsCleared);
    //ugyanannyi sort létrehozunk amennyit töröltünk
    const emptyRows = Array.from({ length: rowsCleared }, () =>
      Array(cols).fill(null)
    );
    return [...emptyRows, ...newBoard];
  };

  const { moveDown, moveLeft, moveRight, rotate } = useGameControls({
    position,
    setPosition,
    tetromino,
    setTetromino,
    cols,
    lockTetromino,
    newTetromino,
    isCollision,
  });

  return (
    <GameContext.Provider
      value={{
        board: updatedBoard,
        tetromino,
        position,
        generateBoard,
        placeTetrominoOnBoard,
        color,
        gameOver,
        newGame,
        score,
        moveDown,
        moveLeft,
        moveRight,
        rotate,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGameContext = () => useContext(GameContext);
