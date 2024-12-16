
import pageStyles from '@/app/tools/maze-generator/page.module.css';
import mainStyles from '@/app/page.module.css';
import { EntryAndExit, MazeGenerator } from '@/components/tools/maze-generator/button-handler';
import React from 'react';
import { MemoizedNumberInput } from '@/components/utils/input-creators';

interface InputFieldsProps {
  invalidElements: string[];
  width: string;
  height: string;
  startDirections: string;
  animateCheckbox: boolean;
  setInvalidElements: React.Dispatch<React.SetStateAction<string[]>>;
  setWidth: React.Dispatch<React.SetStateAction<string>>;
  setHeight: React.Dispatch<React.SetStateAction<string>>;
  setAnimationSpeed: React.Dispatch<React.SetStateAction<string>>;
  setStartDirections: React.Dispatch<React.SetStateAction<string>>;
}

interface CheckboxesProps {
  entryAndExit: EntryAndExit;
  showEntryExitCheckbox: boolean;
  showSolutionCheckbox: boolean;
  animateCheckbox: boolean;
  setEntryAndExit: React.Dispatch<React.SetStateAction<EntryAndExit>>;
  setShowSolutionCheckbox: React.Dispatch<React.SetStateAction<boolean>>;
  setShowEntryExitCheckbox: React.Dispatch<React.SetStateAction<boolean>>;
  setAnimateCheckbox: React.Dispatch<React.SetStateAction<boolean>>;
  maze: MazeGenerator | null;
}

interface CanvaColorsProps {
  showSolutionCheckbox: boolean;
  showEntryExitCheckbox: boolean;
  setWallColor: React.Dispatch<React.SetStateAction<string>>;
  setPathColor: React.Dispatch<React.SetStateAction<string>>;
  setSolutionColor: React.Dispatch<React.SetStateAction<string>>;
  setEntryColor: React.Dispatch<React.SetStateAction<string>>;
  setExitColor: React.Dispatch<React.SetStateAction<string>>;
}

export const minValues: Record<string, number> = {
  width: 5,
  height: 5,
  startDirections: 1,
};

export const maxValues: Record<string, number> = {
  width: 150,
  height: 150,
  startDirections: 4,
};

export const InputFields: React.FC<InputFieldsProps> = ({
  width,
  height,
  startDirections,
  animateCheckbox,
  invalidElements,
  setWidth,
  setHeight,
  setAnimationSpeed,
  setInvalidElements,
  setStartDirections,
}) => {
  return (
    <div className={pageStyles.userInputContainer}>
      <MemoizedNumberInput
        label="Width"
        id="width"
        min={minValues.width}
        max={maxValues.width}
        value={width}
        setValue={setWidth}
        invalidElements={invalidElements}
        setInvalidElements={setInvalidElements}
        divData={pageStyles.userInput}
      />
      <MemoizedNumberInput
        label="Height"
        id="height"
        min={minValues.height}
        max={maxValues.height}
        value={height}
        setValue={setHeight}
        invalidElements={invalidElements}
        setInvalidElements={setInvalidElements}
        divData={pageStyles.userInput}
      />
      <div className={!animateCheckbox ? mainStyles.hidden : ''}>
        <div className={pageStyles.userInput}>
          <label htmlFor="speedInMS">Speed (ms)</label>
          <input id="speedInMS" type="number" placeholder="100" onChange={(e) => setAnimationSpeed(e.target.value)} />
        </div>
        <MemoizedNumberInput
          label="Start Directions"
          id="startDirections"
          min={minValues.startDirections}
          max={maxValues.startDirections}
          value={startDirections}
          setValue={setStartDirections}
          invalidElements={invalidElements}
          setInvalidElements={setInvalidElements}
          divData={pageStyles.userInput}
        />
      </div>
    </div>
  );
};

export const Checkboxes: React.FC<CheckboxesProps> = ({
  animateCheckbox,
  showEntryExitCheckbox,
  showSolutionCheckbox,
  entryAndExit,
  maze,
  setEntryAndExit,
  setAnimateCheckbox,
  setShowEntryExitCheckbox,
  setShowSolutionCheckbox,
}) => {
  return (
    <div className={pageStyles.userInputContainer}>
      <div className={pageStyles.userInput}>
        <label htmlFor="entryAndExit">Starting Point</label>
        <select
          id="entryAndExit"
          value={entryAndExit}
          onChange={(e) => setEntryAndExit(e.target.value as EntryAndExit)}
        >
          <option value={EntryAndExit.TopAndBottom}>Top and Bottom</option>
          <option value={EntryAndExit.LeftAndRight}>Left and Right</option>
          <option value={EntryAndExit.DiagonalTopLeft}>Diagonal | Top Left</option>
          <option value={EntryAndExit.DiagonalLeftTop}>Diagonal | Left Top</option>
          <option value={EntryAndExit.Random}>Random</option>
          <option value={EntryAndExit.None}>None</option>
        </select>
      </div>
      <div className={pageStyles.userInput}>
        <label htmlFor="animationSpeedCheckbox">Animation Speed</label>
        <input
          id="animationSpeedCheckbox"
          type="checkbox"
          onChange={() => {
            setAnimateCheckbox(!animateCheckbox);
          }}
        />
      </div>
      <div className={pageStyles.userInput}>
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
      </div>
      <div className={pageStyles.userInput}>
        <label htmlFor="showEntryExitCheckbox">Show Entry/Exit</label>
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
    </div>
  );
};

export const CanvaColors: React.FC<CanvaColorsProps> = ({
  showSolutionCheckbox,
  showEntryExitCheckbox,
  setWallColor,
  setPathColor,
  setSolutionColor,
  setEntryColor,
  setExitColor,
}) => {
  return (
    <div className={pageStyles.userInputContainer}>
      <div className={pageStyles.userInput}>
        <label htmlFor="wallColor">Wall Color</label>
        <input
          type="color"
          id="wallColor"
          name="wallColor"
          defaultValue="#000000"
          onBlur={(e) => {
            setWallColor(e.target.value);
          }}
        />
      </div>
      <div className={pageStyles.userInput}>
        <label htmlFor="pathColor">Path Color</label>
        <input
          type="color"
          id="pathColor"
          name="pathColor"
          defaultValue="#FFFFFF"
          onBlur={(e) => {
            setPathColor(e.target.value);
          }}
        />
      </div>
      <div className={!showSolutionCheckbox ? mainStyles.hidden : ''}>
        <div className={pageStyles.userInput}>
          <label htmlFor="solutionColor">Solution Color</label>
          <input
            type="color"
            id="solutionColor"
            name="solutionColor"
            defaultValue="#FF0000"
            onBlur={(e) => {
              setSolutionColor(e.target.value);
            }}
          />
        </div>
      </div>
      <div className={!showEntryExitCheckbox ? mainStyles.hidden : ''}>
        <div className={pageStyles.userInput}>
          <label htmlFor="entryColor">Entry Color</label>
          <input
            type="color"
            id="entryColor"
            name="entryColor"
            defaultValue="#00FF00"
            onBlur={(e) => {
              setEntryColor(e.target.value);
            }}
          />
        </div>
        <div className={pageStyles.userInput}>
          <label htmlFor="exitColor">Exit Color</label>
          <input
            type="color"
            id="exitColor"
            name="exitColor"
            defaultValue="#FF0000"
            onBlur={(e) => {
              setExitColor(e.target.value);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export function getNumberFromString(value: string): number {
  return isNaN(parseInt(value)) ? 0 : parseInt(value);
}
