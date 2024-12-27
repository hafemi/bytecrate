'use client';
import { useState } from 'react';

export default function Home() {
    const [playerChoice, setPlayerChoice] = useState('');
    const [computerChoice, setComputerChoice] = useState('');
    const [result, setResult] = useState('');

    const choices = ['ROCK', 'PAPER', 'SCISSORS'];

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
        const randomChoice = choices[Math.floor(Math.random() * choices.length)];
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
            <p>Player's choice: {playerChoice}</p>
            <p>Computer's choice: {computerChoice}</p>
            <p>Result: {result}</p>
        </div>
      </main>
    </div>
  );
}