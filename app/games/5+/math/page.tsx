'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const problems = [
  { question: '5 + 3 = ?', answer: 8 },
  { question: '10 - 4 = ?', answer: 6 },
  { question: '7 + 2 = ?', answer: 9 },
  { question: '12 - 5 = ?', answer: 7 },
  { question: '6 + 6 = ?', answer: 12 },
  { question: '15 - 8 = ?', answer: 7 },
  { question: '9 + 4 = ?', answer: 13 },
  { question: '20 - 11 = ?', answer: 9 },
];

export default function MathGame() {
  const [currentProblem, setCurrentProblem] = useState(problems[0]);
  const [userAnswer, setUserAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);

  const generateProblem = () => {
    setCurrentProblem(problems[Math.floor(Math.random() * problems.length)]);
    setUserAnswer('');
    setFeedback(null);
  };

  useEffect(() => {
    generateProblem();
  }, []);

  const checkAnswer = () => {
    if (parseInt(userAnswer) === currentProblem.answer) {
      setFeedback('correct');
      setScore(score + 1);
      setTimeout(generateProblem, 1500);
    } else {
      setFeedback('wrong');
      setTimeout(() => setFeedback(null), 1000);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-400 via-teal-400 to-blue-400 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl p-8 shadow-2xl">
        <Link href="/games/5+" className="inline-block mb-6 px-6 py-2 bg-green-500 hover:bg-green-600 text-white rounded-full font-bold transition-all">
          ← Back
        </Link>
        
        <h1 className="text-4xl font-bold text-green-600 text-center mb-6">🔢 Math Challenge</h1>
        
        <div className="text-3xl text-center mb-8 font-bold text-gray-700">
          Score: <span className="text-green-600">{score}</span>
        </div>
        
        <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-3xl p-12 mb-8 text-center">
          <p className="text-6xl font-bold text-gray-800">{currentProblem.question}</p>
        </div>
        
        <input
          type="number"
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && checkAnswer()}
          placeholder="Your answer..."
          className="w-full text-5xl text-center p-6 rounded-2xl border-4 border-green-300 focus:border-green-500 outline-none mb-6"
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
          onClick={checkAnswer}
          className="w-full px-8 py-4 bg-green-500 hover:bg-green-600 text-white rounded-full font-bold text-2xl transition-all"
        >
          Check Answer
        </button>
      </div>
    </main>
  );
}
