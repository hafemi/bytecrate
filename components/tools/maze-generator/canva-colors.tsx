import styles from '@/app/page.module.css';
import pageStyles from '@/app/tools/maze-generator/page.module.css';
import React from 'react';

interface CanvaColorsProps {
  showSolutionCheckbox: boolean;
  showEntryExitCheckbox: boolean;
  setWallColor: React.Dispatch<React.SetStateAction<string>>;
  setPathColor: React.Dispatch<React.SetStateAction<string>>;
  setSolutionColor: React.Dispatch<React.SetStateAction<string>>;
  setEntryColor: React.Dispatch<React.SetStateAction<string>>;
  setExitColor: React.Dispatch<React.SetStateAction<string>>;
}

const CanvaColors: React.FC<CanvaColorsProps> = ({
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
          onChange={(e) => {
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
          onChange={(e) => {
            setPathColor(e.target.value);
          }}
        />
      </div>
      <div className={!showSolutionCheckbox ? styles.hidden : ''}>
        <div className={pageStyles.userInput}>
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
      </div>
      <div className={!showEntryExitCheckbox ? styles.hidden : ''}>
        <div className={pageStyles.userInput}>
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
        </div>
        <div className={pageStyles.userInput}>
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
    </div>
  );
};

export default CanvaColors;