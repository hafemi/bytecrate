'use client';
import styles from './page.module.css';
import Link from 'next/link';

export default function Home() {
  return (
    <div className={styles.page}>
      <title>ByteBay</title>
      <main className={styles.main}>
        <h1 className={styles.heading}>BYTE BAY</h1>
        <Link href="/tools/maze-generator">Maze Generator</Link>
        <br />
        <Link href="/games/rock-paper-scissors">Rock Paper Scissors</Link>
      </main>
    </div>
  );
}