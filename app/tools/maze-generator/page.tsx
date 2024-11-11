'use client';
import {
  handleGenerationButtonClicked,
  MazeGenerator,
  StartingPoint,
} from '@/components/tools/maze-generator/button-handler';
import CanvaColors from '@/components/tools/maze-generator/canva-colors';
import { InputFields, Checkboxes, getNumberFromString } from '@/components/tools/maze-generator/input';
import { useState } from 'react';
import { FaArrowDown, FaGear } from 'react-icons/fa6';
import styles from './page.module.css';
import globalStyles from '@/app/page.module.css';

export default function Home() {
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [animationSpeed, setAnimationSpeed] = useState('');
  const [startDirections, setStartDirections] = useState('1');
  const [startingPoint, setStartingPoint] = useState(StartingPoint.TopAndBottom);
  
  const [animateCheckbox, setAnimateCheckbox] = useState(false);
  const [showSolutionCheckbox, setShowSolutionCheckbox] = useState(false);
  const [showEntryExitCheckbox, setShowEntryExitCheckbox] = useState(false);
  
  const [pathColor, setPathColor] = useState('#FFFFFF');
  const [wallColor, setWallColor] = useState('#000000');
  const [solutionColor, setSolutionColor] = useState('#FF0000');
  const [entryColor, setEntryColor] = useState('#00FF00');
  const [exitColor, setExitColor] = useState('#FF0000');
  
  const [invalidElements, setInvalidElements] = useState<string[]>([]);
  const [maze, setMaze] = useState<MazeGenerator | null>(null);

  return (
    <div className={globalStyles.page}>
      <main className={globalStyles.main}>
        <h1 className={globalStyles.heading}>MAZE GENERATOR</h1>
        <div className={styles.inputGroup}>
          <InputFields
            invalidElements={invalidElements}
            width={width}
            height={height}
            startDirections={startDirections}
            animateCheckbox={animateCheckbox}
            setInvalidElements={setInvalidElements}
            setWidth={setWidth}
            setHeight={setHeight}
            setAnimationSpeed={setAnimationSpeed}
            setStartDirections={setStartDirections}
          />
          <Checkboxes
            startingPoint={startingPoint}
            showEntryExitCheckbox={showEntryExitCheckbox}
            showSolutionCheckbox={showSolutionCheckbox}
            animateCheckbox={animateCheckbox}
            setStartingPoint={setStartingPoint}
            setShowSolutionCheckbox={setShowSolutionCheckbox}
            setShowEntryExitCheckbox={setShowEntryExitCheckbox}
            setAnimateCheckbox={setAnimateCheckbox}
            maze={maze}
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
        </div>
        {/* buttons do not have their own component since that would
        lead to a lot of argument passing */}
        <div>
          <button
            onClick={() =>
              handleGenerationButtonClicked({
                width: getNumberFromString(width),
                height: getNumberFromString(height),
                startDirections: getNumberFromString(startDirections),
                animationSpeed: getNumberFromString(animationSpeed),
                invalidElements,
                startingPoint,
                animateCheckbox,
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
