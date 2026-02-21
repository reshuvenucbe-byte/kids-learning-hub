'use client';

import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400">
      <header className="bg-gradient-to-r from-purple-700 to-pink-600 border-b border-pink-400/50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-pink-500 rounded-xl flex items-center justify-center">
              <span className="text-white text-xl font-bold">🎮</span>
            </div>
            <span className="text-white text-xl font-bold">Kids Learning Hub</span>
          </div>
        </div>
      </header>

      <section className="max-w-7xl mx-auto px-6 pt-20 pb-32 text-center">
        <div className="inline-block mb-6 px-4 py-2 bg-yellow-400/30 border border-yellow-300/50 rounded-full">
          <span className="text-white text-sm font-medium">✨ Fun Learning Games</span>
        </div>
        
        <h1 className="text-6xl md:text-7xl font-bold text-white mb-6 leading-tight">
          Learn Through Play,<br />
          <span className="bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300 bg-clip-text text-transparent">
            Grow Every Day
          </span>
        </h1>
        
        <p className="text-xl text-white/90 mb-12 max-w-2xl mx-auto">
          Educational games designed for kids of all ages. Learn letters, numbers, colors, and more through interactive play!
        </p>

        <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto mb-12">
          <Link href="/games/0-2" className="group">
            <div className="bg-white/95 backdrop-blur rounded-3xl p-8 shadow-2xl hover:shadow-pink-500/50 transition-all hover:-translate-y-2">
              <div className="text-6xl mb-4">👶</div>
              <h3 className="text-2xl font-bold text-purple-700 mb-2">0-2 Years</h3>
              <p className="text-gray-600">Sounds & Colors</p>
            </div>
          </Link>

          <Link href="/games/2-5" className="group">
            <div className="bg-white/95 backdrop-blur rounded-3xl p-8 shadow-2xl hover:shadow-orange-500/50 transition-all hover:-translate-y-2">
              <div className="text-6xl mb-4">🧒</div>
              <h3 className="text-2xl font-bold text-pink-600 mb-2">2-5 Years</h3>
              <p className="text-gray-600">Letters & Numbers</p>
            </div>
          </Link>

          <Link href="/games/5+" className="group">
            <div className="bg-white/95 backdrop-blur rounded-3xl p-8 shadow-2xl hover:shadow-purple-500/50 transition-all hover:-translate-y-2">
              <div className="text-6xl mb-4">👦</div>
              <h3 className="text-2xl font-bold text-orange-600 mb-2">5+ Years</h3>
              <p className="text-gray-600">Words & Stories</p>
            </div>
          </Link>

          <Link href="/worksheets" className="group">
            <div className="bg-gradient-to-br from-green-400 to-blue-500 backdrop-blur rounded-3xl p-8 shadow-2xl hover:shadow-green-500/50 transition-all hover:-translate-y-2">
              <div className="text-6xl mb-4">📚</div>
              <h3 className="text-2xl font-bold text-white mb-2">Worksheets</h3>
              <p className="text-white/90">Free Downloads</p>
            </div>
          </Link>
        </div>
      </section>
    </main>
  );
}
