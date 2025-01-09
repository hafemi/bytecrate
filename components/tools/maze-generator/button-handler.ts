import {
  MazeMaxValues,
  MazeMinValues
} from '@/lib/constants/tools';
import {
  Coordinate,
  Dimension,
  MazeCellValue,
  MazeEntryAndExit,
  MazeGenerationConfig
} from '@/lib/types/tools';
import {
  getRandomOddNumber,
  sleep,
  turnToOddNumber,
  validateDimensions
} from '@/lib/utils';

export function handleGenerationButtonClicked(values: MazeGenerationConfig): void {
  const dimensions: Dimension[] = [
    { value: values.width, min: MazeMinValues.width, max: MazeMaxValues.width },
    { value: values.height, min: MazeMinValues.height, max: MazeMaxValues.height },
    { value: values.startDirections, min: MazeMinValues.startDirections, max: MazeMaxValues.startDirections },
    { value: values.animationSpeed, min: MazeMinValues.animationSpeed, max: MazeMaxValues.animationSpeed },
  ];

  const isValid = validateDimensions(dimensions);
  if (isValid)
    createMaze(values);
}

function createMaze(values: MazeGenerationConfig): void {
  if (values.maze) values.maze.isGenerating = false;

  const maze = new MazeGenerator(
    values.width,
    values.height,
    values.startDirections,
    values.entryAndExit,
    values.animateCheckbox,
    values.animationSpeed,
    values.showSolutionCheckbox,
    values.showEntryExitCheckbox,
    values.pathColor,
    values.wallColor,
    values.solutionColor,
    values.entryColor,
    values.exitColor
  );

  values.setMaze(maze);
  maze.generate();
}

export class MazeGenerator {
  maze: number[][];
  entryPoint: Coordinate = { row: 0, col: 0 };
  exitPoint: Coordinate = { row: 0, col: 0 };
  isGenerating: boolean = true;

  constructor(
    public width: number,
    public height: number,
    public startDirections: number,
    public entryAndExit: MazeEntryAndExit,
    public animate: boolean,
    public animationSpeed: number,
    public showSolution: boolean,
    public showEntryExit: boolean,
    public pathColor: string,
    public wallColor: string,
    public solutionColor: string,
    public entryColor: string,
    public exitColor: string
  ) {
    this.width = turnToOddNumber(this.width);
    this.height = turnToOddNumber(this.height);
    this.maze = this.init();
  }

  init(): number[][] {
    const maze = [];
    for (let y = 0; y < this.height; y++) {
      const row = [];
      for (let x = 0; x < this.width; x++) {
        row.push(MazeCellValue.Wall);
      }
      maze.push(row);
    }
    return maze;
  }

  async generate(): Promise<void> {
    const x = getRandomOddNumber(1, this.width - 2);
    const y = getRandomOddNumber(1, this.height - 2);

    this.maze = this.init();
    this.maze[y][x] = MazeCellValue.Path;
    await this.awaitCarving(x, y);

    if (this.isGenerating) {
      this.createEntryAndExit();
      await this.solve(this.entryPoint.row, this.entryPoint.col);
      this.updateCanvas(this.showSolution, this.showEntryExit);
      this.isGenerating = false;
    }
  }

  async awaitCarving(x: number, y: number): Promise<void> {
    const promises = [];

    for (let i = 0; i < this.startDirections; i++) {
      promises.push(this.carve(x, y));
    }

    await Promise.all(promises);
  }

  async solve(startRow: number, startCol: number): Promise<void> {
    if (this.entryAndExit !== MazeEntryAndExit.None && (await this.findSolutionPath(startRow, startCol))) {
      this.maze[this.exitPoint.row][this.exitPoint.col] = MazeCellValue.Solution;
    }
  }

  async findSolutionPath(row: number, col: number): Promise<boolean> {
    const directionOffsets: { [key: string]: Coordinate; } = {
      up: { row: -1, col: 0 },
      down: { row: 1, col: 0 },
      left: { row: 0, col: -1 },
      right: { row: 0, col: 1 },
    };
    const directions = ['up', 'down', 'left', 'right'];
    if (!isValid(row, col, this.maze) || this.maze[row][col] !== MazeCellValue.Path || !this.isGenerating) {
      return false;
    }

    this.maze[row][col] = MazeCellValue.Solution;
    if (this.showSolution && this.animate) {
      this.updateCanvas(this.showSolution, true);
      await sleep(this.animationSpeed);
    }

    if (row === this.exitPoint.row && col === this.exitPoint.col) {
      return true;
    }

    for (const direction of directions) {
      const { row: dRow, col: dCol } = directionOffsets[direction];
      if (await this.findSolutionPath(row + dRow, col + dCol)) {
        return true;
      }
    }

    this.maze[row][col] = MazeCellValue.Path;
    return false;

    function isValid(row: number, col: number, maze: number[][]): boolean {
      return row >= 0 && row < maze.length && col >= 0 && col < maze[row].length;
    }
  }

  async carve(x: number, y: number): Promise<void> {
    if (!this.isGenerating) return;

    const dirs = [
      [-2, 0],
      [2, 0],
      [0, -2],
      [0, 2],
    ].sort(() => Math.random() - 0.5);

    for (let i = 0; i < dirs.length; i++) {
      const [dx, dy] = dirs[i];
      const nx = x + dx;
      const ny = y + dy;

      if (
        ny > 0 &&
        ny < this.height - 1 &&
        nx > 0 &&
        nx < this.width - 1 &&
        this.maze[ny][nx] === MazeCellValue.Wall &&
        this.isGenerating
      ) {
        this.maze[ny - dy / 2][nx - dx / 2] = MazeCellValue.Path;
        this.maze[ny][nx] = MazeCellValue.Path;

        if (this.animate) {
          this.updateCanvas(false, false);
          await sleep(this.animationSpeed);
          await this.carve(nx, ny);
        } else {
          this.carve(nx, ny);
        }
      }
    }
  }

  createEntryAndExit(): void {
    const middlePointX = turnToOddNumber(Math.floor(this.width / 2));
    const middlePointY = turnToOddNumber(Math.floor(this.height / 2));
    const OFFSET_ONE = 1;
    const OFFSET_TWO = 2;

    const setEntryAndExit = (entryRow: number, entryCol: number, exitRow: number, exitCol: number) => {
      this.maze[entryRow][entryCol] = MazeCellValue.Path;
      this.maze[exitRow][exitCol] = MazeCellValue.Path;
      this.entryPoint = { row: entryRow, col: entryCol };
      this.exitPoint = { row: exitRow, col: exitCol };
    };

    let entryAndExit = this.entryAndExit;
    if (entryAndExit == MazeEntryAndExit.Random)
      entryAndExit = [
        MazeEntryAndExit.TopAndBottom,
        MazeEntryAndExit.LeftAndRight,
        MazeEntryAndExit.DiagonalTopLeft,
        MazeEntryAndExit.DiagonalLeftTop,
      ][Math.floor(Math.random() * 4)];

    switch (entryAndExit) {
      case MazeEntryAndExit.TopAndBottom:
        setEntryAndExit(0, middlePointX, this.height - 1, middlePointX);
        break;
      case MazeEntryAndExit.LeftAndRight:
        setEntryAndExit(middlePointY, 0, middlePointY, this.width - 1);
        break;
      case MazeEntryAndExit.DiagonalTopLeft:
        setEntryAndExit(0, OFFSET_ONE, this.height - 1, this.width - OFFSET_TWO);
        break;
      case MazeEntryAndExit.DiagonalLeftTop:
        setEntryAndExit(OFFSET_ONE, 0, this.height - OFFSET_TWO, this.width - 1);
        break;
      case MazeEntryAndExit.DiagonalLeftTop:
        setEntryAndExit(OFFSET_ONE, 0, this.height - OFFSET_TWO, this.width - 1);
        break;
      default:
        break;
    }
  }

  updateCanvas(showSolution: boolean, showEntryExit: boolean): void {
    const mazeCanvas = document.getElementById('mazeCanvas') as HTMLCanvasElement;
    const ctx = mazeCanvas.getContext('2d');
    const multiplier = 10;
    if (!ctx) return;

    mazeCanvas.width = this.width * multiplier;
    mazeCanvas.height = this.height * multiplier;

    for (let y = 0; y < this.maze.length; y++) {
      for (let x = 0; x < this.maze[y].length; x++) {
        this.setCanvasFillColor({ ctx, coordinate: { row: y, col: x }, showSolution, showEntryExit });
        ctx.fillRect(x * multiplier, y * multiplier, multiplier, multiplier);
      }
    }
  }

  setCanvasFillColor(options: {
    ctx: CanvasRenderingContext2D;
    coordinate: Coordinate;
    showSolution: boolean;
    showEntryExit: boolean;
  }): void {
    if (
      options.showEntryExit &&
      this.entryAndExit !== MazeEntryAndExit.None &&
      this.entryAndExit !== MazeEntryAndExit.Random
    ) {
      if (options.coordinate.row === this.entryPoint.row && options.coordinate.col === this.entryPoint.col) {
        options.ctx.fillStyle = this.entryColor;
        return;
      } else if (options.coordinate.row === this.exitPoint.row && options.coordinate.col === this.exitPoint.col) {
        options.ctx.fillStyle = this.exitColor;
        return;
      }
    }

    switch (this.maze[options.coordinate.row][options.coordinate.col]) {
      case MazeCellValue.Wall:
        options.ctx.fillStyle = this.wallColor;
        break;
      case MazeCellValue.Solution:
        options.ctx.fillStyle = options.showSolution ? this.solutionColor : this.pathColor;
        break;
      default:
        options.ctx.fillStyle = this.pathColor;
        break;
    }
  }
}