import React from 'react';
import { PWGenLengthRange } from '@/lib/types/tools';

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
          placeholder={`${PWGenLengthRange.min}-${PWGenLengthRange.max}`}
          value={passwordLength}
          onChange={(e) => setPasswordLength(getValidValue(e.target.value))}
        />
        <input
          type="range"
          id="passwordLength"
          min={PWGenLengthRange.min}
          max={PWGenLengthRange.max}
          value={passwordLength === '' ? PWGenLengthRange.min : parseInt(passwordLength)}
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
    case truncatedNumber > PWGenLengthRange.max:
      return PWGenLengthRange.max.toString();
    case truncatedNumber < PWGenLengthRange.min:
      return '';
    default:
      return truncatedNumber.toString();
  }
}
