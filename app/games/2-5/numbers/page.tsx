'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function NumbersGame() {
  const [targetNumber, setTargetNumber] = useState(1);
  const [numbers, setNumbers] = useState<number[]>([]);
  const [score, setScore] = useState(0);
  const [clicked, setClicked] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const generateGame = () => {
    const target = Math.floor(Math.random() * 10) + 1;
    setTargetNumber(target);
    
    const gameNumbers = [target];
    while (gameNumbers.length < 9) {
      const num = Math.floor(Math.random() * 10) + 1;
      if (!gameNumbers.includes(num)) {
        gameNumbers.push(num);
      }
    }
    
    setNumbers(gameNumbers.sort(() => Math.random() - 0.5));
    setClicked(null);
    setIsCorrect(null);
  };

  useEffect(() => {
    generateGame();
  }, []);

  const checkNumber = (num: number) => {
    setClicked(num);
    if (num === targetNumber) {
      setIsCorrect(true);
      setScore(score + 1);
      setTimeout(generateGame, 1000);
    } else {
      setIsCorrect(false);
      setTimeout(() => {
        setClicked(null);
        setIsCorrect(null);
      }, 500);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-orange-400 via-red-400 to-pink-400 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl p-8 shadow-2xl">
        <Link href="/games/2-5" className="inline-block mb-6 px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-full font-bold transition-all">
          ← Back
        </Link>
        
        <h1 className="text-4xl font-bold text-orange-600 text-center mb-6">🔢 Find the Number!</h1>
        
        <div className="text-3xl text-center mb-6 font-bold text-gray-700">
          Score: <span className="text-orange-600">{score}</span>
        </div>
        
        <div className="text-2xl text-center text-gray-600 mb-4">Find the number:</div>
        <div className="text-8xl font-bold text-pink-500 text-center mb-8">{targetNumber}</div>
        
        <div className="grid grid-cols-3 gap-4">
          {numbers.map((num) => (
            <button
              key={num}
              onClick={() => checkNumber(num)}
              className={`
                p-8 text-5xl font-bold rounded-2xl transition-all
                ${clicked === num && isCorrect === true ? 'bg-gradient-to-br from-green-400 to-blue-400 scale-110' : ''}
                ${clicked === num && isCorrect === false ? 'bg-gradient-to-br from-red-400 to-yellow-400' : ''}
                ${clicked !== num ? 'bg-gradient-to-br from-orange-300 to-pink-300 hover:scale-110' : ''}
                shadow-lg
              `}
            >
              {num}
            </button>
          ))}
        </div>
      </div>
    </main>
  );
}
