'use client';

import Link from 'next/link';

const games = [
  { name: 'Find Alphabets', icon: '🔤', path: '/games/2-5/find-alphabets' },
  { name: 'Find Numbers', icon: '🔢', path: '/games/2-5/numbers' },
  { name: 'Trace Letters', icon: '✏️', path: '/games/2-5/trace-letters' },
  { name: 'Build Words', icon: '🔤', path: '/games/2-5/build-words' }
];

export default function Games25() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-green-400 via-teal-400 to-blue-400 p-6">
      <div className="max-w-6xl mx-auto">
        <Link href="/" className="inline-block mb-8 px-6 py-3 bg-white/90 hover:bg-white rounded-full text-teal-700 font-bold shadow-lg transition-all">
          ← Back Home
        </Link>
        
        <h1 className="text-5xl font-bold text-white text-center mb-4">🧒 2-5 Years</h1>
        <p className="text-xl text-white/90 text-center mb-12">Letters & Numbers</p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {games.map((game) => (
            <Link key={game.name} href={game.path}>
              <div className="bg-white/95 rounded-3xl p-8 text-center shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all cursor-pointer">
                <div className="text-7xl mb-4">{game.icon}</div>
                <h3 className="text-2xl font-bold text-teal-700">{game.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
