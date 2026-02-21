'use client';

import { useState } from 'react';
import Link from 'next/link';

const allAnimals = [
  { name: 'Dog', emoji: '🐶', sound: 'WOOF WOOF!', color: 'from-yellow-300 to-orange-400' },
  { name: 'Cat', emoji: '🐱', sound: 'MEOW MEOW!', color: 'from-pink-300 to-purple-400' },
  { name: 'Cow', emoji: '🐮', sound: 'MOO MOO!', color: 'from-blue-300 to-cyan-400' },
  { name: 'Duck', emoji: '🦆', sound: 'QUACK QUACK!', color: 'from-yellow-300 to-green-400' },
  { name: 'Lion', emoji: '🦁', sound: 'ROAR ROAR!', color: 'from-orange-300 to-red-400' },
  { name: 'Sheep', emoji: '🐑', sound: 'BAA BAA!', color: 'from-gray-200 to-blue-300' },
  { name: 'Pig', emoji: '🐷', sound: 'OINK OINK!', color: 'from-pink-300 to-rose-400' },
  { name: 'Elephant', emoji: '🐘', sound: 'PAWOO PAWOO!', color: 'from-gray-300 to-purple-400' },
  { name: 'Monkey', emoji: '🐵', sound: 'OOH OOH AH AH!', color: 'from-amber-300 to-orange-400' },
  { name: 'Frog', emoji: '🐸', sound: 'RIBBIT RIBBIT!', color: 'from-green-300 to-emerald-400' },
  { name: 'Bird', emoji: '🐦', sound: 'TWEET TWEET!', color: 'from-sky-300 to-blue-400' },
  { name: 'Bear', emoji: '🐻', sound: 'GRRR GRRR!', color: 'from-amber-400 to-brown-500' },
  { name: 'Horse', emoji: '🐴', sound: 'NEIGH NEIGH!', color: 'from-amber-300 to-yellow-400' },
  { name: 'Chicken', emoji: '🐔', sound: 'CLUCK CLUCK!', color: 'from-orange-300 to-red-400' },
  { name: 'Rooster', emoji: '🐓', sound: 'COCK-A-DOODLE-DOO!', color: 'from-red-300 to-orange-400' },
  { name: 'Wolf', emoji: '🐺', sound: 'AWOO AWOO!', color: 'from-gray-400 to-slate-500' },
  { name: 'Tiger', emoji: '🐯', sound: 'ROAR ROAR!', color: 'from-orange-400 to-yellow-500' },
  { name: 'Fox', emoji: '🦊', sound: 'YIP YIP!', color: 'from-orange-300 to-red-400' },
  { name: 'Owl', emoji: '🦉', sound: 'HOOT HOOT!', color: 'from-amber-400 to-brown-500' },
  { name: 'Parrot', emoji: '🦜', sound: 'SQUAWK SQUAWK!', color: 'from-green-400 to-blue-500' },
  { name: 'Penguin', emoji: '🐧', sound: 'HONK HONK!', color: 'from-blue-300 to-cyan-400' },
  { name: 'Mouse', emoji: '🐭', sound: 'SQUEAK SQUEAK!', color: 'from-gray-300 to-pink-400' },
  { name: 'Rabbit', emoji: '🐰', sound: 'SNIFF SNIFF!', color: 'from-pink-300 to-purple-400' },
  { name: 'Goat', emoji: '🐐', sound: 'MEH MEH!', color: 'from-gray-300 to-amber-400' },
  { name: 'Donkey', emoji: '🫏', sound: 'HEE HAW!', color: 'from-gray-400 to-brown-500' },
  { name: 'Bee', emoji: '🐝', sound: 'BUZZ BUZZ!', color: 'from-yellow-300 to-amber-400' },
  { name: 'Snake', emoji: '🐍', sound: 'HISS HISS!', color: 'from-green-400 to-emerald-500' },
  { name: 'Turkey', emoji: '🦃', sound: 'GOBBLE GOBBLE!', color: 'from-red-400 to-orange-500' },
  { name: 'Seal', emoji: '🦭', sound: 'ARF ARF!', color: 'from-blue-300 to-gray-400' },
  { name: 'Dolphin', emoji: '🐬', sound: 'CLICK CLICK!', color: 'from-blue-400 to-cyan-500' },
  { name: 'Whale', emoji: '🐋', sound: 'WHOOO WHOOO!', color: 'from-blue-500 to-indigo-600' },
  { name: 'Gorilla', emoji: '🦍', sound: 'OOH OOH!', color: 'from-gray-600 to-black' },
  { name: 'Zebra', emoji: '🦓', sound: 'NEIGH NEIGH!', color: 'from-gray-300 to-slate-400' },
  { name: 'Giraffe', emoji: '🦒', sound: 'HUM HUM!', color: 'from-yellow-400 to-orange-500' },
  { name: 'Hippo', emoji: '🦛', sound: 'GRUNT GRUNT!', color: 'from-gray-500 to-purple-600' },
  { name: 'Rhino', emoji: '🦏', sound: 'SNORT SNORT!', color: 'from-gray-500 to-slate-600' },
  { name: 'Camel', emoji: '🐪', sound: 'GRUNT GRUNT!', color: 'from-amber-400 to-yellow-500' },
  { name: 'Kangaroo', emoji: '🦘', sound: 'CHATTER CHATTER!', color: 'from-orange-400 to-red-500' },
  { name: 'Koala', emoji: '🐨', sound: 'GRUNT GRUNT!', color: 'from-gray-400 to-blue-500' },
  { name: 'Panda', emoji: '🐼', sound: 'BLEAT BLEAT!', color: 'from-gray-300 to-green-400' },
  { name: 'Squirrel', emoji: '🐿️', sound: 'CHATTER CHATTER!', color: 'from-orange-300 to-amber-400' },
  { name: 'Hyena', emoji: '🐺', sound: 'HA HA HA!', color: 'from-yellow-400 to-orange-500' },
  { name: 'Cheetah', emoji: '🐆', sound: 'CHIRP CHIRP!', color: 'from-yellow-400 to-orange-500' },
  { name: 'Leopard', emoji: '🐆', sound: 'GROWL GROWL!', color: 'from-yellow-500 to-orange-600' },
  { name: 'Buffalo', emoji: '🐃', sound: 'BELLOW BELLOW!', color: 'from-gray-600 to-brown-700' },
  { name: 'Llama', emoji: '🦙', sound: 'HUM HUM!', color: 'from-pink-300 to-purple-400' },
  { name: 'Peacock', emoji: '🦚', sound: 'MEOW MEOW!', color: 'from-blue-400 to-green-500' },
  { name: 'Flamingo', emoji: '🦩', sound: 'HONK HONK!', color: 'from-pink-400 to-rose-500' },
  { name: 'Swan', emoji: '🦢', sound: 'HONK HONK!', color: 'from-white to-blue-300' },
  { name: 'Eagle', emoji: '🦅', sound: 'SCREECH SCREECH!', color: 'from-amber-600 to-brown-700' },
  { name: 'Bat', emoji: '🦇', sound: 'SCREECH SCREECH!', color: 'from-gray-700 to-black' },
  { name: 'Raccoon', emoji: '🦝', sound: 'CHITTER CHITTER!', color: 'from-gray-500 to-slate-600' },
  { name: 'Badger', emoji: '🦡', sound: 'GROWL GROWL!', color: 'from-gray-600 to-black' },
  { name: 'Otter', emoji: '🦦', sound: 'CHIRP CHIRP!', color: 'from-brown-400 to-amber-500' },
  { name: 'Skunk', emoji: '🦨', sound: 'HISS HISS!', color: 'from-gray-700 to-black' },
  { name: 'Sloth', emoji: '🦥', sound: 'SQUEAK SQUEAK!', color: 'from-brown-400 to-gray-500' },
  { name: 'Hedgehog', emoji: '🦔', sound: 'SNIFF SNIFF!', color: 'from-brown-400 to-gray-500' },
  { name: 'Deer', emoji: '🦌', sound: 'SNORT SNORT!', color: 'from-amber-500 to-brown-600' },
  { name: 'Moose', emoji: '🫎', sound: 'BELLOW BELLOW!', color: 'from-brown-600 to-gray-700' },
  { name: 'Bison', emoji: '🦬', sound: 'GRUNT GRUNT!', color: 'from-brown-700 to-gray-800' },
  { name: 'Ox', emoji: '🐂', sound: 'MOO MOO!', color: 'from-brown-600 to-gray-700' },
  { name: 'Ram', emoji: '🐏', sound: 'BAA BAA!', color: 'from-gray-500 to-brown-600' },
  { name: 'Boar', emoji: '🐗', sound: 'GRUNT GRUNT!', color: 'from-brown-600 to-gray-700' },
  { name: 'Mammoth', emoji: '🦣', sound: 'PAWOO PAWOO!', color: 'from-brown-500 to-gray-600' },
  { name: 'Dodo', emoji: '🦤', sound: 'SQUAWK SQUAWK!', color: 'from-gray-500 to-blue-600' },
  { name: 'Lobster', emoji: '🦞', sound: 'CLICK CLICK!', color: 'from-red-500 to-orange-600' },
  { name: 'Crab', emoji: '🦀', sound: 'CLICK CLICK!', color: 'from-red-400 to-orange-500' },
  { name: 'Shrimp', emoji: '🦐', sound: 'CLICK CLICK!', color: 'from-pink-400 to-orange-500' },
  { name: 'Squid', emoji: '🦑', sound: 'SPLASH SPLASH!', color: 'from-pink-500 to-purple-600' },
  { name: 'Octopus', emoji: '🐙', sound: 'SPLASH SPLASH!', color: 'from-purple-500 to-pink-600' },
  { name: 'Jellyfish', emoji: '🪼', sound: 'SPLASH SPLASH!', color: 'from-blue-400 to-purple-500' },
  { name: 'Shark', emoji: '🦈', sound: 'SPLASH SPLASH!', color: 'from-blue-600 to-gray-700' },
  { name: 'Fish', emoji: '🐟', sound: 'BLUB BLUB!', color: 'from-blue-400 to-cyan-500' },
  { name: 'Tropical Fish', emoji: '🐠', sound: 'BLUB BLUB!', color: 'from-orange-400 to-blue-500' },
  { name: 'Blowfish', emoji: '🐡', sound: 'PUFF PUFF!', color: 'from-yellow-400 to-orange-500' },
  { name: 'Turtle', emoji: '🐢', sound: 'HISS HISS!', color: 'from-green-500 to-brown-600' },
  { name: 'Lizard', emoji: '🦎', sound: 'HISS HISS!', color: 'from-green-400 to-lime-500' },
  { name: 'Crocodile', emoji: '🐊', sound: 'SNAP SNAP!', color: 'from-green-600 to-gray-700' },
  { name: 'Dinosaur', emoji: '🦕', sound: 'ROAR ROAR!', color: 'from-green-500 to-blue-600' },
  { name: 'T-Rex', emoji: '🦖', sound: 'ROAR ROAR!', color: 'from-green-600 to-brown-700' },
  { name: 'Dragon', emoji: '🐉', sound: 'ROAR ROAR!', color: 'from-red-500 to-orange-600' },
  { name: 'Unicorn', emoji: '🦄', sound: 'NEIGH NEIGH!', color: 'from-pink-400 to-purple-500' },
  { name: 'Ladybug', emoji: '🐞', sound: 'BUZZ BUZZ!', color: 'from-red-400 to-orange-500' },
  { name: 'Butterfly', emoji: '🦋', sound: 'FLUTTER FLUTTER!', color: 'from-pink-400 to-purple-500' },
  { name: 'Ant', emoji: '🐜', sound: 'MARCH MARCH!', color: 'from-red-600 to-brown-700' },
  { name: 'Cricket', emoji: '🦗', sound: 'CHIRP CHIRP!', color: 'from-green-500 to-lime-600' },
  { name: 'Mosquito', emoji: '🦟', sound: 'BUZZ BUZZ!', color: 'from-gray-500 to-blue-600' },
  { name: 'Fly', emoji: '🪰', sound: 'BUZZ BUZZ!', color: 'from-gray-600 to-black' },
  { name: 'Worm', emoji: '🪱', sound: 'WIGGLE WIGGLE!', color: 'from-pink-500 to-red-600' },
  { name: 'Beetle', emoji: '🪲', sound: 'CLICK CLICK!', color: 'from-green-600 to-blue-700' },
  { name: 'Cockroach', emoji: '🪳', sound: 'SCUTTLE SCUTTLE!', color: 'from-brown-600 to-gray-700' },
  { name: 'Snail', emoji: '🐌', sound: 'SLIME SLIME!', color: 'from-brown-400 to-orange-500' },
  { name: 'Spider', emoji: '🕷️', sound: 'CREEP CREEP!', color: 'from-gray-700 to-black' },
  { name: 'Scorpion', emoji: '🦂', sound: 'CLICK CLICK!', color: 'from-orange-600 to-red-700' },
  { name: 'Chipmunk', emoji: '🐿️', sound: 'CHIP CHIP!', color: 'from-orange-400 to-brown-500' },
  { name: 'Beaver', emoji: '🦫', sound: 'CHATTER CHATTER!', color: 'from-brown-500 to-amber-600' },
  { name: 'Hamster', emoji: '🐹', sound: 'SQUEAK SQUEAK!', color: 'from-orange-300 to-yellow-400' },
  { name: 'Guinea Pig', emoji: '🐹', sound: 'WHEEK WHEEK!', color: 'from-orange-400 to-brown-500' },
  { name: 'Rat', emoji: '🐀', sound: 'SQUEAK SQUEAK!', color: 'from-gray-500 to-brown-600' },
  { name: 'Poodle', emoji: '🐩', sound: 'WOOF WOOF!', color: 'from-pink-300 to-purple-400' },
  { name: 'Guide Dog', emoji: '🦮', sound: 'WOOF WOOF!', color: 'from-yellow-400 to-orange-500' },
  { name: 'Service Dog', emoji: '🐕‍🦺', sound: 'WOOF WOOF!', color: 'from-orange-400 to-red-500' },
];

export default function AnimalSounds() {
  const [activeAnimal, setActiveAnimal] = useState<number | null>(null);
  const [particles, setParticles] = useState<Array<{id: number, x: number, y: number}>>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const animalsPerPage = 12;
  
  const displayedAnimals = allAnimals.slice(currentPage * animalsPerPage, (currentPage + 1) * animalsPerPage);
  const totalPages = Math.ceil(allAnimals.length / animalsPerPage);

  const playSound = (animal: typeof allAnimals[0], index: number) => {
    setActiveAnimal(index);
    
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: Date.now() + i,
      x: Math.random() * 100 - 50,
      y: Math.random() * 100 - 50
    }));
    setParticles(newParticles);
    
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(animal.sound);
      utterance.rate = 0.7;
      utterance.pitch = 1.5;
      utterance.volume = 1;
      window.speechSynthesis.speak(utterance);
    }
    
    setTimeout(() => {
      setActiveAnimal(null);
      setParticles([]);
    }, 2000);
  };

  const shuffle = () => {
    setCurrentPage(Math.floor(Math.random() * totalPages));
  };

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-400 to-orange-400 p-4 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <Link href="/games/0-2" className="inline-block mb-4 px-6 py-3 bg-white hover:bg-gray-100 text-purple-600 rounded-full font-bold text-xl shadow-lg transition-all">
          ← Back
        </Link>
        
        <div className="text-center mb-6">
          <h1 className="text-6xl font-bold text-white mb-4 drop-shadow-lg animate-bounce">
            🎵 Animal Sounds! 🎵
          </h1>
          <p className="text-3xl text-white font-bold drop-shadow mb-4">Tap the animals!</p>
          <p className="text-2xl text-white font-bold drop-shadow">{allAnimals.length}+ Animals!</p>
        </div>
        
        <div className="flex justify-center gap-4 mb-6">
          <button
            onClick={prevPage}
            className="px-8 py-4 bg-white hover:bg-gray-100 text-purple-600 rounded-full font-bold text-2xl shadow-lg transition-all"
          >
            ← Previous
          </button>
          <button
            onClick={shuffle}
            className="px-8 py-4 bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white rounded-full font-bold text-2xl shadow-lg transition-all"
          >
            🔀 Shuffle
          </button>
          <button
            onClick={nextPage}
            className="px-8 py-4 bg-white hover:bg-gray-100 text-purple-600 rounded-full font-bold text-2xl shadow-lg transition-all"
          >
            Next →
          </button>
        </div>
        
        <div className="text-center mb-4">
          <span className="text-2xl text-white font-bold drop-shadow">
            Page {currentPage + 1} of {totalPages}
          </span>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {displayedAnimals.map((animal, index) => (
            <button
              key={`${animal.name}-${index}`}
              onClick={() => playSound(animal, index)}
              className={`
                relative bg-gradient-to-br ${animal.color} rounded-3xl p-8 
                transition-all duration-300 shadow-2xl
                ${activeAnimal === index 
                  ? 'scale-150 z-50 rotate-12 animate-[wiggle_0.3s_ease-in-out_infinite]' 
                  : 'hover:scale-110 hover:-translate-y-2'
                }
              `}
            >
              <div className={`text-9xl mb-2 ${activeAnimal === index ? 'animate-spin' : ''}`}>
                {animal.emoji}
              </div>
              
              {activeAnimal === index && (
                <>
                  <div className="absolute inset-0 bg-white/30 rounded-3xl animate-ping"></div>
                  <p className="text-4xl font-black text-white drop-shadow-lg animate-pulse mt-4">
                    {animal.sound}
                  </p>
                  {particles.map(particle => (
                    <div
                      key={particle.id}
                      className="absolute text-4xl animate-ping"
                      style={{
                        left: `50%`,
                        top: `50%`,
                        transform: `translate(${particle.x}px, ${particle.y}px)`,
                      }}
                    >
                      ⭐
                    </div>
                  ))}
                </>
              )}
            </button>
          ))}
        </div>
      </div>
    </main>
  );
}
