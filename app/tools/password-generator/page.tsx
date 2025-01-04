'use client';
import { CheckboxInput, NumberInput, RangeInput } from '@/components/common/inputs';
import {
  generatePassword,
  validateBoxes,
} from '@/components/tools/password-generator/generation';
import {
  PWGenLengthRange,
  PasswordStrength
} from '@/lib/types/tools';
import { useEffect, useState } from 'react';

export default function Home() {
  const [password, setPassword] = useState('');
  const [passwordLength, setPasswordLength] = useState('20');
  const [useUppercase, setUseUppercase] = useState(true);
  const [useLowercase, setUseLowercase] = useState(true);
  const [useNumbers, setUseNumbers] = useState(true);
  const [useSpecialCharacters, setUseSpecialCharacters] = useState(true);

  useEffect(() => {
    validateBoxes({
      useUppercase,
      useLowercase,
      useNumbers,
      useSpecialCharacters,
      setUseUppercase,
    });
    
    const password = generatePassword({
      useUppercase,
      useLowercase,
      useNumbers,
      useSpecialCharacters,
      passwordLength,
    });
    setPassword(password);
  }, [useUppercase, useLowercase, useNumbers, useSpecialCharacters, passwordLength, setPassword, setUseUppercase]);

  return (
    <div>
      <title>ByteCrate - Password Generator</title>
      <main>
        <h1>PASSWORD GENERATOR</h1>
        <section>
          <input type="text" value={password} readOnly />
          <button
            onClick={() => {
              navigator.clipboard.writeText(password);
            }}
          >
            COPY
          </button>
        </section>
        <section>
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
        </section>
      </main>
    </div>
  );
}
