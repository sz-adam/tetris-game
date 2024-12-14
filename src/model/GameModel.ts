export type Tetromino = number[][];

export interface GameState {
  board: string[][];
  tetromino: Tetromino;
  position: { row: number; col: number };
  generateBoard: () => string[][];
  placeTetrominoOnBoard: () => string[][];
  color: string;
  gameOver: boolean;
  newGame: () => void;
  score: number;
  moveDown: () => void;
  moveLeft: () => void;
  moveRight: () => void;
  rotate: () => void;
}
