'use client';
import { CheckboxInput, NumberInput, RangeInput, TextInput } from '@/components/common/inputs';
import { generatePassword, updateStrengthColor, validateBoxes } from '@/components/tools/password-generator/generation';
import { PWGenLengthRange } from '@/lib/constants/tools';
import { getNumberFromString, sleep } from '@/lib/utils';
import { useEffect, useState } from 'react';
import styles from './page.module.css';

export default function Home() {
  const [password, setPassword] = useState('');
  const [passwordLength, setPasswordLength] = useState('20');
  const [useUppercase, setUseUppercase] = useState(true);
  const [useLowercase, setUseLowercase] = useState(true);
  const [useNumbers, setUseNumbers] = useState(true);
  const [useSpecialCharacters, setUseSpecialCharacters] = useState(true);

  useEffect(() => {
    const Length = getNumberFromString(passwordLength);
    if (Length > PWGenLengthRange.max) return
    
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

    updateStrengthColor(password);
    setPassword(password);
  }, [useUppercase, useLowercase, useNumbers, useSpecialCharacters, passwordLength]);
  
  const handleCopy = async () => { 
    navigator.clipboard.writeText(password);
    const popup = document.getElementById('copiedPopup');
    if (!popup) return;

    popup.classList.add(styles.show);
    await sleep(1000);
    popup.classList.remove(styles.show);
  }

  return (
    <div>
      <title>ByteCrate - Password Generator</title>
      <main>
        <h1>PASSWORD GENERATOR</h1>
        <div className={styles.copyContainer}>
          <TextInput
            label=""
            id="password"
            placeholder=""
            value={password}
            setValue={setPassword}
            readonly
          />
          <button className={styles.popup} onClick={handleCopy}>
            <span className={styles.popupText} id="copiedPopup">
              COPIED
            </span>
            COPY
          </button>
        </div>
        <section>
          <div className={styles.lengthSelectors}>
            <NumberInput
              label="Password Length"
              id="passwordLength"
              min={PWGenLengthRange.min}
              max={PWGenLengthRange.max}
              value={passwordLength}
              setValue={setPasswordLength}
              divData={styles.passwordInputSpace}
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
          <div className={styles.checkboxContainer}>
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
        </section>
        <section className={styles.strengthContainer}>
          <div className={styles.strengthSlider} id="passwordSlider" />
          <p id="strengthText" className={styles.strengthText}>
            Weak
          </p>
        </section>
      </main>
    </div>
  );
}
