import mainStyles from '@/app/page.module.css';
import pageStyles from '@/app/tools/maze-generator/page.module.css';
import { NumberInput, ColorInput, CheckboxInput } from '@/components/common/inputs';
import { MazeGenerator } from '@/components/tools/maze-generator/button-handler';
import { MazeEntryAndExit, MazeMaxValues, MazeMinValues } from '@/lib/types/tools';
import React from 'react';

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
  entryAndExit: MazeEntryAndExit;
  showEntryExitCheckbox: boolean;
  showSolutionCheckbox: boolean;
  animateCheckbox: boolean;
  setEntryAndExit: React.Dispatch<React.SetStateAction<MazeEntryAndExit>>;
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
        min={MazeMinValues.width}
        max={MazeMaxValues.width}
        value={width}
        setValue={setWidth}
        divData={pageStyles.userInput}
      />
      <NumberInput
        label="Height"
        id="height"
        min={MazeMinValues.height}
        max={MazeMaxValues.height}
        value={height}
        setValue={setHeight}
        divData={pageStyles.userInput}
      />
      <div className={!animateCheckbox ? mainStyles.hidden : ''}>
        <NumberInput
          label="Speed (ms)"
          id="speedInMS"
          min={MazeMinValues.speed}
          max={MazeMaxValues.speed}
          value={animationSpeed}
          setValue={setAnimationSpeed}
          divData={pageStyles.userInput}
        />
        <NumberInput
          label="Start Directions"
          id="startDirections"
          min={MazeMinValues.startDirections}
          max={MazeMaxValues.startDirections}
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
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    showSolution: boolean,
    showEntryExit: boolean
  ) => {
    if (!maze || maze.isGenerating) return;

    if (e.target.checked)
      maze.updateCanvas(showSolution, showEntryExit);
    else
      maze.updateCanvas(showSolution, showEntryExit);
  }
  
  return (
    <div className={pageStyles.userInputContainer}>
      <div className={pageStyles.userInput}>
        <label htmlFor="entryAndExit">Starting Point</label>
        <select
          id="entryAndExit"
          value={entryAndExit}
          onChange={(e) => setEntryAndExit(e.target.value as MazeEntryAndExit)}
        >
          <option value={MazeEntryAndExit.TopAndBottom}>Top and Bottom</option>
          <option value={MazeEntryAndExit.LeftAndRight}>Left and Right</option>
          <option value={MazeEntryAndExit.DiagonalTopLeft}>Diagonal | Top Left</option>
          <option value={MazeEntryAndExit.DiagonalLeftTop}>Diagonal | Left Top</option>
          <option value={MazeEntryAndExit.Random}>Random</option>
          <option value={MazeEntryAndExit.None}>None</option>
        </select>
      </div>
      <CheckboxInput
        label="Animation Speed"
        id="animationSpeedCheckbox"
        checked={animateCheckbox}
        setChecked={setAnimateCheckbox}
        divData={pageStyles.userInput}
      />
      <CheckboxInput
        label="Show Solution"
        id="showSolutionCheckbox"
        checked={showSolutionCheckbox}
        setChecked={setShowSolutionCheckbox}
        divData={pageStyles.userInput}
        onChange={(e) => {
          const newValue = !showSolutionCheckbox
          setShowSolutionCheckbox(newValue);
          handleChange(e, newValue, showEntryExitCheckbox);
        }}
      />
      <CheckboxInput
        label="Show Entry/Exit"
        id="showEntryExitCheckbox"
        checked={showEntryExitCheckbox}
        setChecked={setShowEntryExitCheckbox}
        divData={pageStyles.userInput}
        onChange={(e) => {
          const newValue = !showEntryExitCheckbox
          setShowEntryExitCheckbox(newValue);
          handleChange(e, showSolutionCheckbox, newValue);
        }}
      />
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
