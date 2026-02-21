'use client';

import { useState } from 'react';
import Link from 'next/link';

const FREE_LIMIT = 10;

const worksheetCategories = [
  {
    title: 'Alphabet Tracing',
    count: 200,
    freeCount: 10,
    description: 'Trace uppercase and lowercase letters',
    icon: '✏️',
    type: 'alphabet'
  },
  {
    title: 'Number Practice',
    count: 200,
    freeCount: 10,
    description: 'Numbers 1-100 with counting exercises',
    icon: '🔢',
    type: 'numbers'
  },
  {
    title: 'Color Recognition',
    count: 150,
    freeCount: 10,
    description: 'Color and identify different colors',
    icon: '🎨',
    type: 'colors'
  },
  {
    title: 'Shape Matching',
    count: 150,
    freeCount: 10,
    description: 'Match and trace basic shapes',
    icon: '🔷',
    type: 'shapes'
  },
  {
    title: 'Animal Names',
    count: 200,
    freeCount: 10,
    description: 'Learn to write animal names',
    icon: '🐶',
    type: 'animals'
  },
  {
    title: 'Simple Words',
    count: 200,
    freeCount: 10,
    description: '3-letter word practice',
    icon: '📝',
    type: 'words'
  },
];

const TOTAL_WORKSHEETS = worksheetCategories.reduce((sum, cat) => sum + cat.count, 0);

export default function Worksheets() {
  const [downloading, setDownloading] = useState<string | null>(null);
  const [showPaywall, setShowPaywall] = useState(false);

  const downloadWorksheets = async (type: string, count: number) => {
    setDownloading(type);
    
    for (let i = 1; i <= count; i++) {
      try {
        const response = await fetch(`/api/worksheet-url?type=${type}&index=${i}`);
        const { url } = await response.json();
        
        const a = document.createElement('a');
        a.href = url;
        a.download = `${type}-worksheet-${i}.png`;
        a.click();
        
        await new Promise(resolve => setTimeout(resolve, 300));
      } catch (error) {
        console.error(`Failed to download worksheet ${i}:`, error);
      }
    }
    
    setDownloading(null);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-400 to-orange-400 p-6">
      <div className="max-w-6xl mx-auto">
        <Link href="/" className="inline-block mb-6 px-6 py-2 bg-white hover:bg-gray-100 text-purple-600 rounded-full font-bold transition-all">
          ← Back Home
        </Link>
        
        <div className="bg-white rounded-3xl p-8 shadow-2xl mb-8">
          <h1 className="text-5xl font-bold text-purple-600 text-center mb-4">📚 Free Worksheets</h1>
          <p className="text-xl text-gray-600 text-center">{TOTAL_WORKSHEETS}+ printable worksheets - {FREE_LIMIT} free per category!</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {worksheetCategories.map((category) => (
            <div key={category.type} className="bg-white rounded-3xl p-6 shadow-xl">
              <div className="text-6xl text-center mb-4">{category.icon}</div>
              <h3 className="text-2xl font-bold text-gray-800 text-center mb-2">{category.title}</h3>
              <p className="text-gray-600 text-center mb-2">{category.description}</p>
              <p className="text-purple-600 font-bold text-center mb-1">{category.count} Total Worksheets</p>
              <p className="text-green-600 text-sm text-center mb-4">{category.freeCount} Free • {category.count - category.freeCount} Premium</p>
              
              <div className="space-y-2">
                <button
                  onClick={() => downloadWorksheets(category.type, category.freeCount)}
                  disabled={downloading === category.type}
                  className="w-full px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white rounded-full font-bold transition-all disabled:opacity-50"
                >
                  {downloading === category.type ? 'Downloading...' : `Download ${category.freeCount} Free`}
                </button>
                
                <button
                  onClick={() => setShowPaywall(true)}
                  className="w-full px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-full font-bold transition-all"
                >
                  🔒 Get All {category.count}
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-3xl p-8 shadow-xl mt-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Why Our Worksheets?</h2>
          <ul className="space-y-3 text-lg text-gray-700">
            <li>✅ {FREE_LIMIT} free worksheets per category</li>
            <li>✅ High-quality educational content</li>
            <li>✅ Age-appropriate exercises</li>
            <li>✅ Designed by educators</li>
            <li>✅ Instant download - no signup for free sheets</li>
          </ul>
        </div>
      </div>

      {showPaywall && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl">
            <h2 className="text-3xl font-bold text-purple-600 mb-4">🌟 Premium Access</h2>
            <p className="text-gray-700 mb-6">
              Get unlimited access to all {TOTAL_WORKSHEETS}+ high-quality worksheets across all categories!
            </p>
            
            <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl p-6 mb-6">
              <div className="text-4xl font-bold text-purple-600 mb-2">$9.99/month</div>
              <ul className="space-y-2 text-gray-700">
                <li>✅ {TOTAL_WORKSHEETS}+ premium worksheets</li>
                <li>✅ New content weekly</li>
                <li>✅ Printable PDF format</li>
                <li>✅ Cancel anytime</li>
              </ul>
            </div>
            
            <button className="w-full px-6 py-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-full font-bold text-lg transition-all mb-3">
              Subscribe Now
            </button>
            
            <button
              onClick={() => setShowPaywall(false)}
              className="w-full px-6 py-2 text-gray-600 hover:text-gray-800 font-medium"
            >
              Maybe Later
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
