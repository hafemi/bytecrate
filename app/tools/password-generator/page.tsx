'use client';
import { CheckboxInput, NumberInput, RangeInput, TextInput } from '@/components/common/inputs';
import { generatePassword, updateStrengthColor, validateBoxes } from '@/components/tools/password-generator/generation';
import { PWGenLengthRange } from '@/lib/constants/tools';
import { getNumberFromString, sleep } from '@/lib/utils';
import { useEffect, useRef, useState } from 'react';
import styles from './page.module.css';

export default function Home() {
  const [password, setPassword] = useState('');
  const [passwordLength, setPasswordLength] = useState('20');
  const [useUppercase, setUseUppercase] = useState(true);
  const [useLowercase, setUseLowercase] = useState(true);
  const [useNumbers, setUseNumbers] = useState(true);
  const [useSpecialCharacters, setUseSpecialCharacters] = useState(true);
  const isRunning = useRef(false);

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

  const handleClick = async () => {
    navigator.clipboard.writeText(password);
    const popup = document.getElementById('copiedPopup');
    if (!popup || isRunning.current) return;
    isRunning.current = true;
    popup.classList.add(styles.show);
    await sleep(1500);
    popup.classList.add(styles.hide);
    await sleep(1000);
    popup.classList.remove(styles.show, styles.hide);
    isRunning.current = false;
  };

  return (
    <div>
      <title>ByteCrate - Password Generator</title>
      <main>
        <h1>PASSWORD GENERATOR</h1>
        <div>
          <TextInput
            label=""
            id="password"
            placeholder="Generated Password"
            value={password}
            setValue={setPassword}
            readonly
          />
          <button className={styles.popup} onClick={handleClick}>
            <span className={styles.popupText} id="copiedPopup">
              COPIED
            </span>
            COPY
          </button>
        </div>
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
        <section>
          <p id="passwordStrength">Password Strength</p>
          <div className={styles.strengthSlider} id="passwordSlider" />
          <p id="strengthText" className={styles.strengthText}>
            BAD
          </p>
        </section>
      </main>
    </div>
  );
}
