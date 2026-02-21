'use client';

import { useState } from 'react';
import Link from 'next/link';

const words = [
  { word: 'APPLE', hint: '🍎 A red fruit' },
  { word: 'HOUSE', hint: '🏠 Where you live' },
  { word: 'WATER', hint: '💧 You drink this' },
  { word: 'HAPPY', hint: '😊 A good feeling' },
  { word: 'TIGER', hint: '🐯 A big cat' },
  { word: 'PLANT', hint: '🌱 It grows in soil' },
];

export default function SpellWords() {
  const [currentWordIdx, setCurrentWordIdx] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);

  const currentWord = words[currentWordIdx];

  const checkSpelling = () => {
    if (userInput.toUpperCase() === currentWord.word) {
      setFeedback('correct');
      setScore(score + 1);
      setTimeout(() => {
        setUserInput('');
        setFeedback(null);
        setCurrentWordIdx((currentWordIdx + 1) % words.length);
      }, 1500);
    } else {
      setFeedback('wrong');
      setTimeout(() => setFeedback(null), 1000);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl p-8 shadow-2xl">
        <Link href="/games/5+" className="inline-block mb-6 px-6 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-full font-bold transition-all">
          ← Back
        </Link>
        
        <h1 className="text-4xl font-bold text-indigo-600 text-center mb-6">✍️ Spell the Word!</h1>
        
        <div className="text-3xl text-center mb-8 font-bold text-gray-700">
          Score: <span className="text-indigo-600">{score}</span>
        </div>
        
        <div className="bg-gradient-to-br from-yellow-100 to-orange-100 rounded-3xl p-8 mb-8 text-center">
          <p className="text-3xl mb-4">{currentWord.hint}</p>
        </div>
        
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && checkSpelling()}
          placeholder="Type the word..."
          className="w-full text-4xl text-center p-6 rounded-2xl border-4 border-indigo-300 focus:border-indigo-500 outline-none mb-6"
        />
        
        {feedback === 'correct' && (
          <div className="text-4xl text-green-500 text-center font-bold animate-bounce mb-4">
            ✓ Correct!
          </div>
        )}
        
        {feedback === 'wrong' && (
          <div className="text-4xl text-red-500 text-center font-bold mb-4">
            ✗ Try Again!
          </div>
        )}
        
        <button
          onClick={checkSpelling}
          className="w-full px-8 py-4 bg-indigo-500 hover:bg-indigo-600 text-white rounded-full font-bold text-2xl transition-all"
        >
          Check Spelling
        </button>
      </div>
    </main>
  );
}
