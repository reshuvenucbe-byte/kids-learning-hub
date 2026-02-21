'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const allColors = [
  { name: 'Red', hex: '#EF4444', emoji: '❤️' },
  { name: 'Blue', hex: '#3B82F6', emoji: '💙' },
  { name: 'Yellow', hex: '#FBBF24', emoji: '💛' },
  { name: 'Green', hex: '#10B981', emoji: '💚' },
  { name: 'Purple', hex: '#A855F7', emoji: '💜' },
  { name: 'Orange', hex: '#F97316', emoji: '🧡' },
  { name: 'Pink', hex: '#EC4899', emoji: '🩷' },
  { name: 'Brown', hex: '#92400E', emoji: '🤎' },
  { name: 'Black', hex: '#1F2937', emoji: '🖤' },
  { name: 'White', hex: '#F3F4F6', emoji: '🤍' },
  { name: 'Gray', hex: '#6B7280', emoji: '🩶' },
  { name: 'Cyan', hex: '#06B6D4', emoji: '💙' },
  { name: 'Magenta', hex: '#D946EF', emoji: '💗' },
  { name: 'Lime', hex: '#84CC16', emoji: '💚' },
  { name: 'Indigo', hex: '#6366F1', emoji: '💙' },
  { name: 'Teal', hex: '#14B8A6', emoji: '💚' },
  { name: 'Violet', hex: '#8B5CF6', emoji: '💜' },
  { name: 'Rose', hex: '#F43F5E', emoji: '🌹' },
  { name: 'Sky', hex: '#0EA5E9', emoji: '☁️' },
  { name: 'Amber', hex: '#F59E0B', emoji: '🟡' },
];

export default function ColorsGame() {
  const [activeColor, setActiveColor] = useState<string | null>(null);
  const [displayedColors, setDisplayedColors] = useState<typeof allColors>([]);

  useEffect(() => {
    shuffleColors();
  }, []);

  const shuffleColors = () => {
    const shuffled = [...allColors].sort(() => Math.random() - 0.5);
    setDisplayedColors(shuffled.slice(0, 12));
  };

  const showColor = (name: string) => {
    setActiveColor(name);
    
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
    
    setTimeout(() => setActiveColor(null), 1500);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-300 via-purple-300 to-blue-300 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl p-8 shadow-2xl">
        <Link href="/games/0-2" className="inline-block mb-6 px-6 py-2 bg-pink-500 hover:bg-pink-600 text-white rounded-full font-bold transition-all">
          ← Back
        </Link>
        
        <h1 className="text-4xl font-bold text-pink-600 text-center mb-4">🎨 Learn Colors</h1>
        <p className="text-xl text-gray-600 text-center mb-4">Tap a color to see its name!</p>
        
        <button
          onClick={shuffleColors}
          className="mx-auto block mb-6 px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white rounded-full font-bold transition-all"
        >
          🔄 Show More Colors
        </button>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {displayedColors.map((color) => (
            <button
              key={color.name}
              onClick={() => showColor(color.name)}
              style={{ backgroundColor: color.hex }}
              className={`
                rounded-3xl p-8 transition-all shadow-lg hover:shadow-2xl hover:-translate-y-2
                ${activeColor === color.name ? 'scale-110 ring-8 ring-white' : ''}
              `}
            >
              <div className="text-6xl mb-2">{color.emoji}</div>
              <p className="text-xl font-bold text-white" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
                {activeColor === color.name ? color.name : ''}
              </p>
            </button>
          ))}
        </div>
      </div>
    </main>
  );
}
