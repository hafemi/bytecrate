
import pageStyles from '@/app/tools/maze-generator/page.module.css';
import mainStyles from '@/app/page.module.css';
import { EntryAndExit, MazeGenerator } from '@/components/tools/maze-generator/button-handler';
import React from 'react';
import {
  NumberInput,
  ColorInput
 } from '@/lib/components/html-inputs';

interface InputFieldsProps {
  width: string;
  height: string;
  startDirections: string;
  animateCheckbox: boolean;
  animationSpeed: string;
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
  speed: 0,
};

export const maxValues: Record<string, number> = {
  width: 150,
  height: 150,
  startDirections: 4,
  speed: 1000,
};

export const InputFields: React.FC<InputFieldsProps> = ({
  width,
  height,
  startDirections,
  animateCheckbox,
  animationSpeed,
  setWidth,
  setHeight,
  setAnimationSpeed,
  setStartDirections,
}) => {
  return (
    <div className={pageStyles.userInputContainer}>
      <NumberInput
        label="Width"
        id="width"
        min={minValues.width}
        max={maxValues.width}
        value={width}
        setValue={setWidth}
        divData={pageStyles.userInput}
      />
      <NumberInput
        label="Height"
        id="height"
        min={minValues.height}
        max={maxValues.height}
        value={height}
        setValue={setHeight}
        divData={pageStyles.userInput}
      />
      <div className={!animateCheckbox ? mainStyles.hidden : ''}>
        <NumberInput
          label="Speed (ms)"
          id="speedInMS"
          min={minValues.speed}
          max={maxValues.speed}
          value={animationSpeed}
          setValue={setAnimationSpeed}
          divData={pageStyles.userInput}
        />
        <NumberInput
          label="Start Directions"
          id="startDirections"
          min={minValues.startDirections}
          max={maxValues.startDirections}
          value={startDirections}
          setValue={setStartDirections}
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
      <ColorInput
        label="Wall Color"
        id="wallColor"
        defaultValue="#000000"
        setValue={setWallColor}
        divData={pageStyles.userInput}
      />
      <ColorInput
        label="Path Color"
        id="pathColor"
        defaultValue="#FFFFFF"
        setValue={setPathColor}
        divData={pageStyles.userInput}
      />
      <div className={!showSolutionCheckbox ? mainStyles.hidden : ''}>
        <ColorInput
          label="Solution Color"
          id="solutionColor"
          defaultValue="#FF0000"
          setValue={setSolutionColor}
          divData={pageStyles.userInput}
        />
      </div>
      <div className={!showEntryExitCheckbox ? mainStyles.hidden : ''}>
        <ColorInput
          label="Entry Color"
          id="entryColor"
          defaultValue="#00FF00"
          setValue={setEntryColor}
          divData={pageStyles.userInput}
        />
        <ColorInput
          label="Exit Color"
          id="exitColor"
          defaultValue="#FF0000"
          setValue={setExitColor}
          divData={pageStyles.userInput}
        />
      </div>
    </div>
  );
};
