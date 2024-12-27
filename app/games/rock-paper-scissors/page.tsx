'use client';
import { useState } from 'react';
import { RPSChoices } from '@/lib/types/tools';

export default function Home() {
    const [playerChoice, setPlayerChoice] = useState('');
    const [computerChoice, setComputerChoice] = useState('');
    const [result, setResult] = useState('');

    const defineWinner = (player: string, computer: string) => {
        if (player === computer) {
            return 'DRAW';
        }
        if (
            (player === 'ROCK' && computer === 'SCISSORS') ||
            (player === 'PAPER' && computer === 'ROCK') ||
            (player === 'SCISSORS' && computer === 'PAPER')
        ) {
            return 'PLAYER WINS';
        }
        return 'COMPUTER WINS';
    };

    const handleClick = (choice: string) => {
        const randomChoice = RPSChoices[Math.floor(Math.random() * RPSChoices.length)];
        setPlayerChoice(choice);
        setComputerChoice(randomChoice);
        setResult(defineWinner(choice, randomChoice));
    };

  return (
    <div>
      <title>ByteCrate - Rock Paper Scissors</title>
      <main>
        <h1>ROCK PAPER SCISSORS</h1>
        <p>This is an epic Rock Paper Scissors game</p>
        <div>
            <button onClick={() => handleClick('ROCK')}>ROCK</button>
            <button onClick={() => handleClick('PAPER')}>PAPER</button>
            <button onClick={() => handleClick('SCISSORS')}>SCISSORS</button>
        </div>
        <div>
            <p>Player choice: {playerChoice}</p>
            <p>Computer choice: {computerChoice}</p>
            <p>Result: {result}</p>
        </div>
      </main>
    </div>
  );
}