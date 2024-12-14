import React from 'react';

interface InputFieldsProps {
  useUppercase: boolean;
  useLowercase: boolean;
  useNumbers: boolean;
  useSpecialCharacters: boolean;
  passwordLength: number;
  setUseUppercase: React.Dispatch<React.SetStateAction<boolean>>;
  setUseLowercase: React.Dispatch<React.SetStateAction<boolean>>;
  setUseNumbers: React.Dispatch<React.SetStateAction<boolean>>;
  setUseSpecialCharacters: React.Dispatch<React.SetStateAction<boolean>>;
  setPasswordLength: React.Dispatch<React.SetStateAction<number>>;
}

export const passwordLengthRange: Record<string, number> = {
  min: 1,
  max: 512,
};

export const InputFields: React.FC<InputFieldsProps> = ({
  useUppercase,
  useLowercase,
  useNumbers,
  useSpecialCharacters,
  passwordLength,
  setUseUppercase,
  setUseLowercase,
  setUseNumbers,
  setUseSpecialCharacters,
  setPasswordLength,
}) => {
  return (
    <div>
      <div>
        <label htmlFor="passwordLength">Password Length</label>
        <input
          type="number"
          id="passwordLength"
          name="passwordLength"
          value={passwordLength}
          onChange={(e) => setPasswordLength(getValidValue(e.target.value))}
        />
        <input
          type="range"
          id="passwordLength"
          name="passwordLength"
          min={passwordLengthRange.min}
          max={passwordLengthRange.max}
          value={passwordLength}
          onChange={(e) => setPasswordLength(getValidValue(e.target.value))}
        />
      </div>
      <div>
        <label htmlFor="useUppercase">Uppercase</label>
        <input
          type="checkbox"
          id="useUppercase"
          name="useUppercase"
          checked={useUppercase}
          onChange={() => setUseUppercase(!useUppercase)}
        />
      </div>
      <div>
        <label htmlFor="useLowercase">Lowercase</label>
        <input
          type="checkbox"
          id="useLowercase"
          name="useLowercase"
          checked={useLowercase}
          onChange={() => setUseLowercase(!useLowercase)}
        />
      </div>
      <div>
        <label htmlFor="useNumbers">Numbers</label>
        <input
          type="checkbox"
          id="useNumbers"
          name="useNumbers"
          checked={useNumbers}
          onChange={() => setUseNumbers(!useNumbers)}
        />
      </div>
      <div>
        <label htmlFor="useSpecialCharacters">Special characters</label>
        <input
          type="checkbox"
          id="useSpecialCharacters"
          name="useSpecialCharacters"
          checked={useSpecialCharacters}
          onChange={() => setUseSpecialCharacters(!useSpecialCharacters)}
        />
      </div>
    </div>
  );
};

function getValidValue(value: string): number {
  const number = isNaN(parseInt(value)) ? 0 : parseInt(value);
  
  if (number > passwordLengthRange.max)
    return passwordLengthRange.max;
  if (number < passwordLengthRange.min)
    return passwordLengthRange.min;
  
  return number;
}