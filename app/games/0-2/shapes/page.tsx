'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const allShapes = [
  { name: 'Circle', emoji: '⭕', color: 'bg-red-400' },
  { name: 'Square', emoji: '🟦', color: 'bg-blue-400' },
  { name: 'Triangle', emoji: '🔺', color: 'bg-yellow-400' },
  { name: 'Star', emoji: '⭐', color: 'bg-purple-400' },
  { name: 'Heart', emoji: '❤️', color: 'bg-pink-400' },
  { name: 'Diamond', emoji: '💎', color: 'bg-cyan-400' },
  { name: 'Hexagon', emoji: '⬡', color: 'bg-green-400' },
  { name: 'Pentagon', emoji: '⬠', color: 'bg-orange-400' },
  { name: 'Octagon', emoji: '⯃', color: 'bg-indigo-400' },
  { name: 'Oval', emoji: '⬭', color: 'bg-teal-400' },
  { name: 'Rectangle', emoji: '▭', color: 'bg-lime-400' },
  { name: 'Rhombus', emoji: '◆', color: 'bg-rose-400' },
  { name: 'Crescent', emoji: '🌙', color: 'bg-violet-400' },
  { name: 'Cross', emoji: '✚', color: 'bg-amber-400' },
  { name: 'Arrow', emoji: '➤', color: 'bg-emerald-400' },
  { name: 'Cloud', emoji: '☁️', color: 'bg-sky-400' },
  { name: 'Sun', emoji: '☀️', color: 'bg-yellow-500' },
  { name: 'Moon', emoji: '🌙', color: 'bg-slate-400' },
  { name: 'Flower', emoji: '🌸', color: 'bg-pink-500' },
  { name: 'Leaf', emoji: '🍃', color: 'bg-green-500' },
];

export default function ShapesGame() {
  const [activeShape, setActiveShape] = useState<string | null>(null);
  const [displayedShapes, setDisplayedShapes] = useState<typeof allShapes>([]);

  useEffect(() => {
    shuffleShapes();
  }, []);

  const shuffleShapes = () => {
    const shuffled = [...allShapes].sort(() => Math.random() - 0.5);
    setDisplayedShapes(shuffled.slice(0, 12));
  };

  const showShape = (name: string) => {
    setActiveShape(name);
    
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(name);
      utterance.rate = 0.8;
      utterance.pitch = 1.3;
      
      const voices = window.speechSynthesis.getVoices();
      const femaleVoice = voices.find(voice => 
        voice.name.includes('Female') || 
        voice.name.includes('Samantha') ||
        voice.name.includes('Victoria') ||
        voice.name.includes('Karen') ||
        voice.name.includes('Moira') ||
        voice.name.includes('Fiona')
      );
      if (femaleVoice) {
        utterance.voice = femaleVoice;
      }
      
      window.speechSynthesis.speak(utterance);
    }
    
    setTimeout(() => setActiveShape(null), 1500);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-300 via-green-300 to-yellow-300 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl p-8 shadow-2xl">
        <Link href="/games/0-2" className="inline-block mb-6 px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-full font-bold transition-all">
          ← Back
        </Link>
        
        <h1 className="text-4xl font-bold text-blue-600 text-center mb-4">🔷 Learn Shapes</h1>
        <p className="text-xl text-gray-600 text-center mb-4">Tap a shape to see its name!</p>
        
        <button
          onClick={shuffleShapes}
          className="mx-auto block mb-6 px-6 py-3 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white rounded-full font-bold transition-all"
        >
          🔄 Show More Shapes
        </button>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {displayedShapes.map((shape) => (
            <button
              key={shape.name}
              onClick={() => showShape(shape.name)}
              className={`
                ${shape.color} rounded-3xl p-8 transition-all shadow-lg hover:shadow-2xl hover:-translate-y-2
                ${activeShape === shape.name ? 'scale-110 ring-8 ring-white' : ''}
              `}
            >
              <div className="text-6xl mb-2">{shape.emoji}</div>
              <p className="text-xl font-bold text-white" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
                {activeShape === shape.name ? shape.name : ''}
              </p>
            </button>
          ))}
        </div>
      </div>
    </main>
  );
}
