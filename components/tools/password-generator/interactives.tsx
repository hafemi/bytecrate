import React from 'react';
import { PWGenLengthRange } from '@/lib/types/tools';
import { NumberInput } from '@/components/common/number-input';
import { RangeInput } from '@/components/common/range-input';

interface InteractivesProps {
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

export const InputFields: React.FC<InteractivesProps> = ({
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
        <NumberInput
          label="Password Length"
          id="passwordLength"
          min={PWGenLengthRange.min}
          max={PWGenLengthRange.max}
          value={passwordLength}
          setValue={setPasswordLength}
        />
        <RangeInput
          label="Password Length"
          id="passwordLength"
          min={PWGenLengthRange.min}
          max={PWGenLengthRange.max}
          value={passwordLength}
          setValue={setPasswordLength}
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
        <input type="checkbox" id="useNumbers" checked={useNumbers} onChange={() => setUseNumbers(!useNumbers)} />
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
