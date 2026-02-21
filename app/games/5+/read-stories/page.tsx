'use client';

import { useState } from 'react';
import Link from 'next/link';

const stories = [
  {
    title: 'The Brave Little Mouse',
    emoji: '🐭',
    text: 'Once upon a time, there was a little mouse who lived in a big house. One day, the mouse heard a loud roar! It was a lion stuck in a net. The brave little mouse chewed through the ropes and saved the lion. The lion was so grateful and they became best friends forever!',
    questions: [
      { q: 'Where did the mouse live?', a: 'In a big house' },
      { q: 'Who was stuck in the net?', a: 'A lion' },
      { q: 'How did the mouse help?', a: 'Chewed through the ropes' },
    ],
    color: 'from-yellow-400 to-orange-400'
  },
  {
    title: 'The Magic Garden',
    emoji: '🌺',
    text: 'Emma found a secret garden behind her house. In the garden, flowers could talk! A rose told her about kindness, a sunflower taught her to be happy, and a daisy showed her how to be a good friend. Emma visited the garden every day and became the kindest girl in town.',
    questions: [
      { q: 'What did Emma find?', a: 'A secret garden' },
      { q: 'What could the flowers do?', a: 'Talk' },
      { q: 'What did the rose teach?', a: 'Kindness' },
    ],
    color: 'from-pink-400 to-purple-400'
  },
];

export default function ReadStories() {
  const [activeStory, setActiveStory] = useState<number | null>(null);
  const [showQuestions, setShowQuestions] = useState(false);
  const [answers, setAnswers] = useState<string[]>([]);
  const [score, setScore] = useState(0);

  const checkAnswers = () => {
    if (activeStory === null) return;
    let correct = 0;
    stories[activeStory].questions.forEach((q, idx) => {
      if (answers[idx]?.toLowerCase().includes(q.a.toLowerCase().split(' ')[0])) {
        correct++;
      }
    });
    setScore(correct);
  };

  const resetStory = () => {
    setActiveStory(null);
    setShowQuestions(false);
    setAnswers([]);
    setScore(0);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl p-8 shadow-2xl">
        <Link href="/games/5+" className="inline-block mb-6 px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-full font-bold transition-all">
          ← Back
        </Link>
        
        <h1 className="text-4xl font-bold text-blue-600 text-center mb-8">📖 Read & Answer</h1>
        
        {activeStory === null ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {stories.map((story, idx) => (
              <button
                key={idx}
                onClick={() => setActiveStory(idx)}
                className={`bg-gradient-to-br ${story.color} rounded-3xl p-8 transition-all shadow-lg hover:shadow-2xl hover:-translate-y-2`}
              >
                <div className="text-7xl mb-4">{story.emoji}</div>
                <h3 className="text-2xl font-bold text-white">{story.title}</h3>
              </button>
            ))}
          </div>
        ) : !showQuestions ? (
          <div>
            <div className="text-6xl text-center mb-6">{stories[activeStory].emoji}</div>
            <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">{stories[activeStory].title}</h2>
            <p className="text-xl text-gray-700 leading-relaxed mb-8">{stories[activeStory].text}</p>
            <button
              onClick={() => setShowQuestions(true)}
              className="w-full px-8 py-4 bg-blue-500 hover:bg-blue-600 text-white rounded-full font-bold text-xl transition-all"
            >
              Answer Questions
            </button>
          </div>
        ) : (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Answer these questions:</h2>
            {stories[activeStory].questions.map((q, idx) => (
              <div key={idx} className="mb-6">
                <p className="text-xl font-bold text-gray-700 mb-2">{idx + 1}. {q.q}</p>
                <input
                  type="text"
                  value={answers[idx] || ''}
                  onChange={(e) => {
                    const newAnswers = [...answers];
                    newAnswers[idx] = e.target.value;
                    setAnswers(newAnswers);
                  }}
                  className="w-full p-4 text-lg rounded-xl border-2 border-gray-300 focus:border-blue-500 outline-none"
                  placeholder="Your answer..."
                />
              </div>
            ))}
            <button
              onClick={checkAnswers}
              className="w-full px-8 py-4 bg-green-500 hover:bg-green-600 text-white rounded-full font-bold text-xl transition-all mb-4"
            >
              Check Answers
            </button>
            {score > 0 && (
              <div className="text-3xl text-center font-bold text-green-600 mb-4">
                Score: {score}/{stories[activeStory].questions.length}
              </div>
            )}
            <button
              onClick={resetStory}
              className="w-full px-8 py-4 bg-gray-500 hover:bg-gray-600 text-white rounded-full font-bold text-xl transition-all"
            >
              Choose Another Story
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
