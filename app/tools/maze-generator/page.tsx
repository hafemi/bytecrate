'use client';
import { useState } from 'react';
import { FaArrowDown, FaGear } from 'react-icons/fa6';
import { MazeGenerator, handleGenerationButtonClicked, StartingPoint } from './button-handler';
import styles from './page.module.css';

const minValues: Record<string, number> = {
  width: 5,
  height: 5,
};

const maxValues: Record<string, number> = {
  width: 150,
  height: 150,
};

export default function Home() {
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [startingPoint, setStartingPoint] = useState(StartingPoint.TopAndBottom);
  const [animateCheckbox, setAnimateCheckbox] = useState(false);
  const [animationSpeed, setAnimationSpeed] = useState(0);
  const [showSolutionCheckbox, setShowSolutionCheckbox] = useState(false);
  const [showEntryExitCheckbox, setShowEntryExitCheckbox] = useState(false);
  const [pathColor, setPathColor] = useState('#FFFFFF');
  const [wallColor, setWallColor] = useState('#000000');
  const [solutionColor, setSolutionColor] = useState('#FF0000');
  const [entryColor, setEntryColor] = useState('#00FF00');
  const [exitColor, setExitColor] = useState('#FF0000');
  const [invalidElements, setInvalidElements] = useState<string[]>([]);
  const [maze, setMaze] = useState<MazeGenerator | null>(null);

  const validateElement = ({
    value,
    min,
    max,
    elementId,
  }: {
    value: number;
    min: number;
    max: number;
    elementId: string;
  }): void => {
    if ((!isNaN(value) && value < min) || value > max) {
      setInvalidElements([...invalidElements, elementId]);
      return;
    }

    setInvalidElements(invalidElements.filter((id) => id !== elementId));
  };

  const getNumberFromString = (value: string): number => {
    return isNaN(parseInt(value)) ? 0 : parseInt(value);
  };

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1 className={styles.heading}>MAZE GENERATOR</h1>
        <div>
          <label htmlFor="width">Width</label>
          <input
            className={`
              ${invalidElements.includes('width') ? styles.invalid : ''}
              ${styles.input}
            `}
            id="width"
            type="number"
            placeholder={`${minValues.width}-${maxValues.width}`}
            value={width}
            onChange={(e) => {
              setWidth(e.target.value);
              validateElement({
                value: parseInt(e.target.value),
                min: minValues.width,
                max: maxValues.width,
                elementId: 'width',
              });
            }}
          />
          <br />
          <label htmlFor="height">Height</label>
          <input
            className={`
              ${invalidElements.includes('height') ? styles.invalid : ''}
              ${styles.input}
            `}
            id="height"
            type="number"
            placeholder={`${minValues.height}-${maxValues.height}`}
            value={height}
            onChange={(e) => {
              setHeight(e.target.value);
              validateElement({
                value: parseInt(e.target.value),
                min: minValues.height,
                max: maxValues.height,
                elementId: 'height',
              });
            }}
          />
          <br />
          <div className={!animateCheckbox ? styles.hidden : ''}>
            <label htmlFor="speedInMS">Speed (ms)</label>
            <input
              id="speedInMS"
              type="number"
              placeholder="100"
              onChange={(e) => setAnimationSpeed(parseInt(e.target.value))}
            />
          </div>
        </div>
        <div>
          <label htmlFor="startingPoint">Starting Point</label>
          <select
            id="startingPoint"
            value={startingPoint}
            onChange={(e) => setStartingPoint(e.target.value as StartingPoint)}
          >
            <option value={StartingPoint.TopAndBottom}>Top and Bottom</option>
            <option value={StartingPoint.LeftAndRight}>Left and Right</option>
            <option value={StartingPoint.DiagonalTopLeft}>Diagonal | Top Left</option>
            <option value={StartingPoint.DiagonalLeftTop}>Diagonal | Left Top</option>
            <option value={StartingPoint.Random}>Random</option>
            <option value={StartingPoint.None}>None</option>
          </select>
          <br />
          <label htmlFor="animationSpeedCheckbox">Animation Speed</label>
          <input
            id="animationSpeedCheckbox"
            type="checkbox"
            onChange={() => {
              setAnimateCheckbox(!animateCheckbox);
            }}
          />
          <br />
          <label htmlFor="showSolutionCheckbox">Show Solution</label>
          <input
            id="showSolutionCheckbox"
            type="checkbox"
            onChange={(e) => {
              setShowSolutionCheckbox(e.target.checked);
              if (!maze || maze.isGenerating) return;

              if (e.target.checked) {
                maze.updateMazeCanvas(true, showEntryExitCheckbox);
              } else {
                maze.updateMazeCanvas(false, showEntryExitCheckbox);
              }
            }}
          />
          <br />
          <label htmlFor="Show Entry/Exit">Show Entry/Exit</label>
          <input
            id="showEntryExitCheckbox"
            type="checkbox"
            onChange={(e) => {
              setShowEntryExitCheckbox(e.target.checked);
              if (!maze || maze.isGenerating) return;

              if (e.target.checked) {
                maze.updateMazeCanvas(showSolutionCheckbox, true);
              } else {
                maze.updateMazeCanvas(showSolutionCheckbox, false);
              }
            }}
          />
        </div>
        <div>
          <label htmlFor="wallColor">Wall Color</label>
          <input
            type="color"
            id="wallColor"
            name="wallColor"
            defaultValue="#000000"
            onChange={(e) => {
              setWallColor(e.target.value);
            }}
          />
          <br />
          <label htmlFor="pathColor">Path Color</label>
          <input
            type="color"
            id="pathColor"
            name="pathColor"
            defaultValue="#FFFFFF"
            onChange={(e) => {
              setPathColor(e.target.value);
            }}
          />
          <br />
          <div className={!showSolutionCheckbox ? styles.hidden : ''}>
            <label htmlFor="solutionColor">Solution Color</label>
            <input
              type="color"
              id="solutionColor"
              name="solutionColor"
              defaultValue="#FF0000"
              onChange={(e) => {
                setSolutionColor(e.target.value);
              }}
            />
          </div>
          <div className={!showEntryExitCheckbox ? styles.hidden : ''}>
            <label htmlFor="entryColor">Entry Color</label>
            <input
              type="color"
              id="entryColor"
              name="entryColor"
              defaultValue="#00FF00"
              onChange={(e) => {
                setEntryColor(e.target.value);
              }}
            />
            <br />
            <label htmlFor="exitColor">Exit Color</label>
            <input
              type="color"
              id="exitColor"
              name="exitColor"
              defaultValue="#FF0000"
              onChange={(e) => {
                setExitColor(e.target.value);
              }}
            />
          </div>
        </div>
        <div>
          <button
            onClick={() =>
              handleGenerationButtonClicked({
                width: getNumberFromString(width),
                height: getNumberFromString(height),
                invalidElements,
                minValues,
                maxValues,
                startingPoint,
                animateCheckbox,
                animationSpeed,
                showSolutionCheckbox,
                showEntryExitCheckbox,
                pathColor,
                wallColor,
                solutionColor,
                entryColor,
                exitColor,
                maze,
                setMaze,
              })
            }
          >
            <FaGear /> Generate
          </button>
          <button
            onClick={() => {
              if (!maze || maze.isGenerating) return;
              const canvas = document.getElementById('mazeCanvas') as HTMLCanvasElement;
              const dataURL = canvas.toDataURL('image/png');
              const link = document.createElement('a');
              link.href = dataURL;
              link.download = 'maze.png';
              link.click();
            }}
          >
            <FaArrowDown /> Download
          </button>
        </div>
        <canvas id="mazeCanvas" width="0" height="0"></canvas>
      </main>
    </div>
  );
}