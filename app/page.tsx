'use client';
import styles from './page.module.css';
import Link from 'next/link';

export default function Home() {
  return (
    <div className={styles.page}>
      <title>ByteBay</title>
      <main className={styles.main}>
        <h1 className={styles.heading}>BYTE BAY</h1>

        <section>
          <h2>Tools</h2>
          <ul>
            <li>
              <Link href="/tools/maze-generator">Maze Generator</Link>
            </li>
            <li>Random Number Generator (planned)</li>
          </ul>
        </section>

        <section>
          <h2>Games</h2>
          <ul>
            <li>
              <Link href="/games/rock-paper-scissors">Rock Paper Scissors</Link>
            </li>
            <li>Hangman (planned)</li>
            <li>Tic Tac Toe (planned)</li>
          </ul>
        </section>
        
      </main>
    </div>
  );
}
