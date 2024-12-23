import React from 'react';
import { PWGenLengthRange } from '@/lib/types/tools';
import { NumberInput } from '@/components/common/number-input';
import { RangeInput } from '@/components/common/range-input';
import { CheckboxInput } from '@/components/common/checkbox-input';

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
          label=""
          id="passwordLength"
          min={PWGenLengthRange.min}
          max={PWGenLengthRange.max}
          value={passwordLength}
          setValue={setPasswordLength}
        />
      </div>
      <CheckboxInput
        label="Uppercase"
        id="useUppercase"
        checked={useUppercase}
        setChecked={setUseUppercase}
      />
      <CheckboxInput
        label="Lowercase"
        id="useLowercase"
        checked={useLowercase}
        setChecked={setUseLowercase}
      />
      <CheckboxInput
        label="Numbers"
        id="useNumbers"
        checked={useNumbers}
        setChecked={setUseNumbers}
      />
      <CheckboxInput
        label="Special characters"
        id="useSpecialCharacters"
        checked={useSpecialCharacters}
        setChecked={setUseSpecialCharacters}
      />
    </div>
  );
};
