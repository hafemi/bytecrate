'use client';
import { useState } from 'react';
import { InputFields } from '@/components/tools/password-generator/interactives';

export default function Home() {
  const [passwordLength, setPasswordLength] = useState('20');
  const [useUppercase, setUseUppercase] = useState(true);
  const [useLowercase, setUseLowercase] = useState(true);
  const [useNumbers, setUseNumbers] = useState(true);
  const [useSpecialCharacters, setUseSpecialCharacters] = useState(true);
  
  return (
    <div>
      <title>ByteCrate - Password Generator</title>
      <main>
        <h1>PASSWORD GENERATOR</h1>
        <div>
          <InputFields
            useUppercase={useUppercase}
            useLowercase={useLowercase}
            useNumbers={useNumbers}
            useSpecialCharacters={useSpecialCharacters}
            passwordLength={passwordLength}
            setUseUppercase={setUseUppercase}
            setUseLowercase={setUseLowercase}
            setUseNumbers={setUseNumbers}
            setUseSpecialCharacters={setUseSpecialCharacters}
            setPasswordLength={setPasswordLength}
          />
        </div>
      </main>
    </div>
  );
}
