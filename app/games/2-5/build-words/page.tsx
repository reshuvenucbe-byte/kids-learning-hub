'use client';

import { useState } from 'react';
import Link from 'next/link';

const words = [
  { word: 'CAT', emoji: '🐱', letters: ['C', 'A', 'T'] },
  { word: 'DOG', emoji: '🐶', letters: ['D', 'O', 'G'] },
  { word: 'SUN', emoji: '☀️', letters: ['S', 'U', 'N'] },
  { word: 'BEE', emoji: '🐝', letters: ['B', 'E', 'E'] },
  { word: 'HAT', emoji: '🎩', letters: ['H', 'A', 'T'] },
  { word: 'BAT', emoji: '🦇', letters: ['B', 'A', 'T'] },
];

export default function BuildWords() {
  const [currentWordIdx, setCurrentWordIdx] = useState(0);
  const [builtWord, setBuiltWord] = useState<string[]>([]);
  const [score, setScore] = useState(0);

  const currentWord = words[currentWordIdx];
  const shuffledLetters = [...currentWord.letters].sort(() => Math.random() - 0.5);

  const addLetter = (letter: string) => {
    if (builtWord.length < currentWord.letters.length) {
      const newWord = [...builtWord, letter];
      setBuiltWord(newWord);
      
      if (newWord.length === currentWord.letters.length) {
        const finalWord = newWord.join('');
        if (finalWord === currentWord.word) {
          setScore(score + 1);
          setTimeout(() => {
            setBuiltWord([]);
            setCurrentWordIdx((currentWordIdx + 1) % words.length);
          }, 1000);
        } else {
          setTimeout(() => setBuiltWord([]), 500);
        }
      }
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-cyan-400 via-blue-400 to-indigo-400 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl p-8 shadow-2xl">
        <Link href="/games/2-5" className="inline-block mb-6 px-6 py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-full font-bold transition-all">
          ← Back
        </Link>
        
        <h1 className="text-4xl font-bold text-cyan-600 text-center mb-6">🔤 Build the Word!</h1>
        
        <div className="text-3xl text-center mb-8 font-bold text-gray-700">
          Score: <span className="text-cyan-600">{score}</span>
        </div>
        
        <div className="text-8xl text-center mb-8">{currentWord.emoji}</div>
        
        <div className="bg-gray-100 rounded-2xl p-6 mb-8 min-h-[100px] flex items-center justify-center gap-2">
          {builtWord.map((letter, idx) => (
            <div key={idx} className="text-5xl font-bold text-cyan-600 bg-white rounded-xl p-4 shadow-lg">
              {letter}
            </div>
          ))}
          {Array(currentWord.letters.length - builtWord.length).fill(0).map((_, idx) => (
            <div key={idx} className="text-5xl font-bold text-gray-300 bg-white rounded-xl p-4 w-20 h-20 shadow-lg"></div>
          ))}
        </div>
        
        <div className="flex justify-center gap-4">
          {shuffledLetters.map((letter, idx) => (
            <button
              key={idx}
              onClick={() => addLetter(letter)}
              disabled={builtWord.length >= currentWord.letters.length}
              className="text-5xl font-bold bg-gradient-to-br from-pink-400 to-purple-400 text-white rounded-2xl p-6 shadow-lg hover:scale-110 transition-all disabled:opacity-50"
            >
              {letter}
            </button>
          ))}
        </div>
        
        <button
          onClick={() => setBuiltWord([])}
          className="mt-6 mx-auto block px-8 py-3 bg-red-500 hover:bg-red-600 text-white rounded-full font-bold transition-all"
        >
          Clear
        </button>
      </div>
    </main>
  );
}
