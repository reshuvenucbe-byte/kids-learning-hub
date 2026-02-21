'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const stories = [
  {
    title: 'The Happy Sun',
    emoji: '☀️',
    text: 'Once upon a time, the sun woke up in the morning. It stretched its golden rays across the sky. The sun smiled at all the clouds floating by. Birds started singing their beautiful songs. Flowers opened their petals to say hello. The sun warmed the earth with its gentle light. All the animals came out to play in the sunshine. The trees danced in the warm breeze. Children laughed and played outside. The sun was so happy to see everyone enjoying the beautiful day.',
    color: 'from-yellow-400 to-orange-400'
  },
  {
    title: 'Sleepy Moon',
    emoji: '🌙',
    text: 'When the day ends, the moon comes out to play. The moon is soft and gentle in the night sky. It watches over all the sleeping children. The stars twinkle like tiny diamonds around the moon. Owls hoot softly in the trees. The moon tells bedtime stories to the clouds. Everything becomes quiet and peaceful. The moon shines its silver light on the world below. All the tired animals curl up to sleep. The moon whispers goodnight to everyone until morning comes again.',
    color: 'from-blue-600 to-purple-600'
  },
  {
    title: 'Rainbow Friends',
    emoji: '🌈',
    text: 'After a rainy day, something magical happens in the sky. A beautiful rainbow appears with seven bright colors. Red is at the top, smiling down at everyone. Orange and yellow dance together in the middle. Green waves hello to all the trees below. Blue matches the color of the ocean. Purple sits at the bottom, proud and beautiful. All the colors hold hands across the sky. Children point and laugh with joy. The rainbow stays until the sun dries all the rain. Then it waves goodbye until the next rainy day.',
    color: 'from-pink-400 to-purple-400'
  },
  {
    title: 'Little Butterfly',
    emoji: '🦋',
    text: 'In a garden, a tiny caterpillar lived on a green leaf. Every day it ate and ate, growing bigger and bigger. One day, the caterpillar felt very sleepy. It wrapped itself in a cozy cocoon. Inside the cocoon, something amazing was happening. Days passed and the cocoon started to shake. Suddenly, a beautiful butterfly came out. Its wings were colorful like a rainbow. The butterfly stretched its new wings in the sunshine. It flew from flower to flower, drinking sweet nectar. The butterfly was so happy to be free and beautiful.',
    color: 'from-green-400 to-blue-400'
  },
];

export default function StoriesGame() {
  const [activeStory, setActiveStory] = useState<number | null>(null);

  useEffect(() => {
    // Stop speech when component unmounts (user navigates away)
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const readStory = (idx: number) => {
    setActiveStory(idx);
    
    if ('speechSynthesis' in window) {
      const story = stories[idx];
      const utterance = new SpeechSynthesisUtterance(story.text);
      utterance.rate = 0.85;
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
  };

  const stopReading = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setActiveStory(null);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-400 to-red-400 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl p-8 shadow-2xl">
        <Link href="/games/0-2" className="inline-block mb-6 px-6 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-full font-bold transition-all">
          ← Back
        </Link>
        
        <h1 className="text-4xl font-bold text-purple-600 text-center mb-4">📚 Story Time</h1>
        <p className="text-xl text-gray-600 text-center mb-8">Choose a story to read!</p>
        
        {activeStory === null ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {stories.map((story, idx) => (
              <button
                key={idx}
                onClick={() => readStory(idx)}
                className={`bg-gradient-to-br ${story.color} rounded-3xl p-8 transition-all shadow-lg hover:shadow-2xl hover:-translate-y-2`}
              >
                <div className="text-7xl mb-4">{story.emoji}</div>
                <h3 className="text-2xl font-bold text-white">{story.title}</h3>
              </button>
            ))}
          </div>
        ) : (
          <div className={`bg-gradient-to-br ${stories[activeStory].color} rounded-3xl p-12 text-center`}>
            <div className="text-9xl mb-6">{stories[activeStory].emoji}</div>
            <h2 className="text-4xl font-bold text-white mb-6">{stories[activeStory].title}</h2>
            <p className="text-2xl text-white leading-relaxed mb-8">{stories[activeStory].text}</p>
            <button
              onClick={stopReading}
              className="px-8 py-4 bg-white text-purple-600 rounded-full font-bold text-xl hover:scale-110 transition-all"
            >
              Choose Another Story
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
