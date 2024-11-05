'use client';
import { handleGenerationButtonClicked, MazeGenerator, StartingPoint } from '@/components/tools/maze-generator/button-handler';
import CanvaColors from '@/components/tools/maze-generator/canva-colors';
import Input from '@/components/tools/maze-generator/input';
import { useState } from 'react';
import { FaArrowDown, FaGear } from 'react-icons/fa6';
import styles from './page.module.css';

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

  const getNumberFromString = (value: string): number => {
    return isNaN(parseInt(value)) ? 0 : parseInt(value);
  };

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1 className={styles.heading}>MAZE GENERATOR</h1>
        <Input
          invalidElements={invalidElements}
          width={width}
          height={height}
          animateCheckbox={animateCheckbox}
          showEntryExitCheckbox={showEntryExitCheckbox}
          showSolutionCheckbox={showSolutionCheckbox}
          startingPoint={startingPoint}
          maze={maze}
          setInvalidElements={setInvalidElements}
          setWidth={setWidth}
          setHeight={setHeight}
          setAnimationSpeed={setAnimationSpeed}
          setShowSolutionCheckbox={setShowSolutionCheckbox}
          setShowEntryExitCheckbox={setShowEntryExitCheckbox}
          setAnimateCheckbox={setAnimateCheckbox}
          setStartingPoint={setStartingPoint}
        />
        <CanvaColors
          showSolutionCheckbox={showSolutionCheckbox}
          showEntryExitCheckbox={showEntryExitCheckbox}
          setWallColor={setWallColor}
          setPathColor={setPathColor}
          setSolutionColor={setSolutionColor}
          setEntryColor={setEntryColor}
          setExitColor={setExitColor}
        />
        {/* buttons do not have their own component since that would
        lead to a lot of prop drilling */}
        <div>
          <button
            onClick={() =>
              handleGenerationButtonClicked({
                width: getNumberFromString(width),
                height: getNumberFromString(height),
                invalidElements,
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