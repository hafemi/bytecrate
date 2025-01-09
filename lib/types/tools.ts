
import { Dispatch, SetStateAction } from 'react';
import { MazeGenerator } from '@/components/tools/maze-generator/button-handler';

export enum MazeCellValue {
  Path = 0,
  Wall = 1,
  Solution = 2,
}

export enum MazeEntryAndExit {
  TopAndBottom = 'top_and_bottom',
  LeftAndRight = 'left_and_right',
  DiagonalTopLeft = 'diagonal_top_left',
  DiagonalLeftTop = 'diagonal_left_top',
  Random = 'random',
  None = 'none',
}

export interface Coordinate {
  row: number;
  col: number;
}

export interface MazeGenerationConfig {
  width: number;
  height: number;
  startDirections: number;
  animationSpeed: number;
  entryAndExit: MazeEntryAndExit;

  animateCheckbox: boolean;
  showSolutionCheckbox: boolean;
  showEntryExitCheckbox: boolean;

  pathColor: string;
  wallColor: string;
  solutionColor: string;
  entryColor: string;
  exitColor: string;

  maze: MazeGenerator | null;
  setMaze: Dispatch<SetStateAction<MazeGenerator | null>>;
}

export interface Dimension {
  value: number;
  max: number;
  min: number;
}