'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

export default function FindAlphabets() {
  const [score, setScore] = useState(0);
  const [targetLetter, setTargetLetter] = useState('');
  const [letters, setLetters] = useState<string[]>([]);
  const [clickedLetter, setClickedLetter] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const generateGame = () => {
    const target = alphabet[Math.floor(Math.random() * alphabet.length)];
    setTargetLetter(target);
    
    const gameLetters = [target];
    while (gameLetters.length < 10) {
      const randomLetter = alphabet[Math.floor(Math.random() * alphabet.length)];
      if (!gameLetters.includes(randomLetter)) {
        gameLetters.push(randomLetter);
      }
    }
    
    setLetters(gameLetters.sort(() => Math.random() - 0.5));
    setClickedLetter(null);
    setIsCorrect(null);
  };

  useEffect(() => {
    generateGame();
  }, []);

  const checkLetter = (letter: string) => {
    setClickedLetter(letter);
    if (letter === targetLetter) {
      setIsCorrect(true);
      setScore(score + 1);
      setTimeout(generateGame, 1000);
    } else {
      setIsCorrect(false);
      setTimeout(() => {
        setClickedLetter(null);
        setIsCorrect(null);
      }, 500);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-600 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl p-8 shadow-2xl">
        <Link href="/games/2-5" className="inline-block mb-6 px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-full font-bold transition-all">
          ← Back
        </Link>
        
        <h1 className="text-4xl font-bold text-purple-700 text-center mb-6">🔤 Find the Letter!</h1>
        
        <div className="text-3xl text-center mb-6 font-bold text-gray-700">
          Score: <span className="text-purple-600">{score}</span>
        </div>
        
        <div className="text-2xl text-center text-gray-600 mb-4">Find the letter:</div>
        <div className="text-8xl font-bold text-pink-500 text-center mb-8">{targetLetter}</div>
        
        <div className="grid grid-cols-5 gap-4">
          {letters.map((letter) => (
            <button
              key={letter}
              onClick={() => checkLetter(letter)}
              className={`
                p-8 text-4xl font-bold rounded-2xl transition-all
                ${clickedLetter === letter && isCorrect === true ? 'bg-gradient-to-br from-green-400 to-blue-400 scale-110' : ''}
                ${clickedLetter === letter && isCorrect === false ? 'bg-gradient-to-br from-red-400 to-yellow-400 animate-shake' : ''}
                ${clickedLetter !== letter ? 'bg-gradient-to-br from-cyan-300 to-pink-300 hover:scale-110' : ''}
                shadow-lg
              `}
            >
              {letter}
            </button>
          ))}
        </div>
      </div>
    </main>
  );
}
