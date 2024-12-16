'use client';
import { Footer, Header } from '@/app/layout';
import { useState } from 'react';
import styles from './page.module.css';
import { InputFields } from '@/components/tools/password-generator/input';

export default function Home() {
  const [passwordLength, setPasswordLength] = useState('20');
  const [useUppercase, setUseUppercase] = useState(true);
  const [useLowercase, setUseLowercase] = useState(true);
  const [useNumbers, setUseNumbers] = useState(true);
  const [useSpecialCharacters, setUseSpecialCharacters] = useState(true);
  
  return (
    <div className={styles.page}>
      <title>ByteCrate - Password Generator</title>
      <Header />
      <main className={styles.main}>
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
      <Footer />
    </div>
  );
}
