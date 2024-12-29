import React, { useEffect } from 'react';
import { PWGenLengthRange } from '@/lib/types/tools';
import { NumberInput, RangeInput, CheckboxInput } from '@/components/common/inputs';
import { generatePassword, validateBoxes } from '@/components/tools/password-generator/generation';

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
  setPassword: React.Dispatch<React.SetStateAction<string>>;
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
  setPassword,
}) => {
  useEffect(() => {
    validateBoxes({
      useUppercase,
      useLowercase,
      useNumbers,
      useSpecialCharacters,
      setUseUppercase,
    });

    setPassword(
      generatePassword({
        useUppercase,
        useLowercase,
        useNumbers,
        useSpecialCharacters,
        passwordLength,
      })
    );
  }, [useUppercase, useLowercase, useNumbers, useSpecialCharacters, passwordLength, setPassword, setUseUppercase]);

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
      <CheckboxInput label="Uppercase" id="useUppercase" checked={useUppercase} setChecked={setUseUppercase} />
      <CheckboxInput label="Lowercase" id="useLowercase" checked={useLowercase} setChecked={setUseLowercase} />
      <CheckboxInput label="Numbers" id="useNumbers" checked={useNumbers} setChecked={setUseNumbers} />
      <CheckboxInput
        label="Special characters"
        id="useSpecialCharacters"
        checked={useSpecialCharacters}
        setChecked={setUseSpecialCharacters}
      />
    </div>
  );
};
