'use client';

import Link from 'next/link';

const games = [
  { name: 'Animal Sounds', icon: '🐶', path: '/games/0-2/animal-sounds' },
  { name: 'Learn Colors', icon: '🎨', path: '/games/0-2/colors' },
  { name: 'Learn Shapes', icon: '🔷', path: '/games/0-2/shapes' },
  { name: 'Story Time', icon: '📚', path: '/games/0-2/stories' }
];

export default function Games02() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400 p-6">
      <div className="max-w-6xl mx-auto">
        <Link href="/" className="inline-block mb-8 px-6 py-3 bg-white/90 hover:bg-white rounded-full text-purple-700 font-bold shadow-lg transition-all">
          ← Back Home
        </Link>
        
        <h1 className="text-5xl font-bold text-white text-center mb-4">👶 0-2 Years</h1>
        <p className="text-xl text-white/90 text-center mb-12">Sounds & Colors</p>

        <div className="grid md:grid-cols-3 gap-6">
          {games.map((game) => (
            <Link key={game.name} href={game.path}>
              <div className="bg-white/95 rounded-3xl p-8 text-center shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all cursor-pointer">
                <div className="text-7xl mb-4">{game.icon}</div>
                <h3 className="text-2xl font-bold text-purple-700">{game.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
