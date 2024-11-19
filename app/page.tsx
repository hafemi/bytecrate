'use client';
import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <title>ByteBay</title>
      <main>
        <h1 >BYTE BAY</h1>
      <title>ByteBay - Homepage</title>
        <p>Collection of different Tools and Games</p>
        <p>
          View GitHub{' '}
          <a
            href="https://github.com/hafemi/byte-bay"
            target="_blank"
            rel="noopener noreferrer"
          >
            repository
          </a>
        </p>
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