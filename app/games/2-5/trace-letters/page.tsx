'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

const letterDirections: Record<string, string> = {
  A: 'Start at the top, draw down left ↙, then down right ↘, then across the middle →',
  B: 'Start at top left, draw down ↓, then curve right twice ⟳',
  C: 'Start at top right, curve left and down ⟲',
  D: 'Start at top left, draw down ↓, then curve right ⟳',
  E: 'Start at top left, draw down ↓, then three lines right → → →',
  F: 'Start at top left, draw down ↓, then two lines right → →',
  G: 'Start at top right, curve left and down ⟲, then right →',
  H: 'Start at top left, draw down ↓, lift up, draw down ↓, then across middle →',
  I: 'Draw a line down ↓',
  J: 'Start at top, draw down ↓, then curve left ⟲',
  K: 'Start at top left, draw down ↓, then diagonal right ↗ and ↘',
  L: 'Start at top left, draw down ↓, then right →',
  M: 'Start at bottom left, draw up ↑, down ↓, up ↑, down ↓',
  N: 'Start at bottom left, draw up ↑, diagonal down ↘, then up ↑',
  O: 'Start at top, draw a circle ⭕',
  P: 'Start at top left, draw down ↓, then curve right at top ⟳',
  Q: 'Draw a circle ⭕, then add a tail ↘',
  R: 'Start at top left, draw down ↓, curve right at top ⟳, then diagonal ↘',
  S: 'Start at top right, curve left, then right ⟿',
  T: 'Draw across top →, then down from middle ↓',
  U: 'Start at top left, draw down and curve right ⟲, then up ↑',
  V: 'Start at top left, draw down ↓, then up right ↗',
  W: 'Start at top left, draw down ↓, up ↑, down ↓, up ↑',
  X: 'Draw diagonal ↘, then diagonal ↙',
  Y: 'Start at top left, draw to middle ↘, then from top right to middle ↙, then down ↓',
  Z: 'Draw right →, then diagonal down ↙, then right →',
};

export default function TraceLetters() {
  const [currentLetter, setCurrentLetter] = useState(letters[0]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasDrawn, setHasDrawn] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw letter outline
    ctx.font = 'bold 300px Arial';
    ctx.strokeStyle = '#D1D5DB';
    ctx.lineWidth = 8;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.strokeText(currentLetter, canvas.width / 2, canvas.height / 2);
  }, [currentLetter]);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    setHasDrawn(true);
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const rect = canvas.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = 'touches' in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;
    
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const rect = canvas.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = 'touches' in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;
    
    ctx.strokeStyle = '#10B981';
    ctx.lineWidth = 12;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const nextLetter = () => {
    const idx = letters.indexOf(currentLetter);
    setCurrentLetter(letters[(idx + 1) % letters.length]);
    setHasDrawn(false);
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const clearCanvas = () => {
    setHasDrawn(false);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-400 via-blue-400 to-purple-400 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl p-8 shadow-2xl">
        <Link href="/games/2-5" className="inline-block mb-6 px-6 py-2 bg-green-500 hover:bg-green-600 text-white rounded-full font-bold transition-all">
          ← Back
        </Link>
        
        <h1 className="text-4xl font-bold text-green-600 text-center mb-4">✏️ Trace Letters</h1>
        
        <div className="bg-blue-50 rounded-2xl p-4 mb-6">
          <p className="text-lg text-gray-700 text-center">
            <span className="font-bold text-green-600">How to write {currentLetter}:</span><br />
            {letterDirections[currentLetter]}
          </p>
        </div>
        
        <div className="bg-gradient-to-br from-yellow-100 to-orange-100 rounded-3xl p-4 mb-6 relative">
          <canvas
            ref={canvasRef}
            width={600}
            height={400}
            className="w-full touch-none cursor-crosshair"
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            onTouchStart={startDrawing}
            onTouchMove={draw}
            onTouchEnd={stopDrawing}
          />
        </div>

        <div className="flex justify-center gap-4">
          <button
            onClick={clearCanvas}
            className="px-8 py-4 bg-red-500 hover:bg-red-600 text-white rounded-full font-bold text-xl transition-all"
          >
            Clear
          </button>
          <button
            onClick={nextLetter}
            className="px-8 py-4 bg-green-500 hover:bg-green-600 text-white rounded-full font-bold text-xl transition-all"
          >
            Next Letter →
          </button>
        </div>
      </div>
    </main>
  );
}
