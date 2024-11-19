'use client';
import { Footer } from '@/app/layout';
import styles from './page.module.css';

export default function Home() {
  return (
    <div className={styles.page}>
      <title>ByteBay - Rock Paper Scissors</title>
      <main className={styles.main}>
        <h1>ROCK PAPER SCISSORS</h1>
      </main>
      <Footer />
    </div>
  );
}