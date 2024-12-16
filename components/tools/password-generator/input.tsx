import React from 'react';

interface InputFieldsProps {
  passwordLength: string;
  useUppercase: boolean;
  useLowercase: boolean;
  useNumbers: boolean;
  useSpecialCharacters: boolean;
  setPasswordLength: React.Dispatch<React.SetStateAction<string>>;
  setUseUppercase: React.Dispatch<React.SetStateAction<boolean>>;
  setUseLowercase: React.Dispatch<React.SetStateAction<boolean>>;
  setUseNumbers: React.Dispatch<React.SetStateAction<boolean>>;
  setUseSpecialCharacters: React.Dispatch<React.SetStateAction<boolean>>;
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
          placeholder={`${passwordLengthRange.min}-${passwordLengthRange.max}`}
          value={passwordLength}
          onChange={(e) => setPasswordLength(getValidValue(e.target.value))}
        />
        <input
          type="range"
          id="passwordLength"
          min={passwordLengthRange.min}
          max={passwordLengthRange.max}
          value={passwordLength === '' ? passwordLengthRange.min : parseInt(passwordLength)}
          onChange={(e) => setPasswordLength(getValidValue(e.target.value))}
        />
      </div>
      <div>
        <label htmlFor="useUppercase">Uppercase</label>
        <input
          type="checkbox"
          id="useUppercase"
          checked={useUppercase}
          onChange={() => setUseUppercase(!useUppercase)}
        />
      </div>
      <div>
        <label htmlFor="useLowercase">Lowercase</label>
        <input
          type="checkbox"
          id="useLowercase"
          checked={useLowercase}
          onChange={() => setUseLowercase(!useLowercase)}
        />
      </div>
      <div>
        <label htmlFor="useNumbers">Numbers</label>
        <input
          type="checkbox"
          id="useNumbers"
          checked={useNumbers}
          onChange={() => setUseNumbers(!useNumbers)}
        />
      </div>
      <div>
        <label htmlFor="useSpecialCharacters">Special characters</label>
        <input
          type="checkbox"
          id="useSpecialCharacters"
          checked={useSpecialCharacters}
          onChange={() => setUseSpecialCharacters(!useSpecialCharacters)}
        />
      </div>
    </div>
  );
};

function getValidValue(value: string): string {
  const parsedNumber = parseInt(value);
  if (isNaN(parsedNumber)) return '';
  
  const truncatedNumber = Math.trunc(parseInt(value));

  switch (true) {
    case isNaN(truncatedNumber):
      return '';
    case truncatedNumber > passwordLengthRange.max:
      return passwordLengthRange.max.toString();
    case truncatedNumber < passwordLengthRange.min:
      return '';
    default:
      return truncatedNumber.toString();
  }
}
