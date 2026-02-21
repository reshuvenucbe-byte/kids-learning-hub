# Kids Learning Hub - Next.js Version

Modern kids learning website built with Next.js, React, TypeScript, and Tailwind CSS.

## Tech Stack

- **Next.js 16** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS 4** - Styling
- **React Compiler** - Performance optimization

## Project Structure

```
kids-learning-next/
├── app/
│   ├── page.tsx              # Homepage with age group selection
│   ├── layout.tsx            # Root layout
│   ├── globals.css           # Global styles
│   └── games/
│       ├── 0-2/              # Games for 0-2 years
│       │   ├── page.tsx      # Age group landing page
│       │   ├── animal-sounds/
│       │   ├── color-tap/
│       │   └── music-box/
│       ├── 2-5/              # Games for 2-5 years
│       │   ├── page.tsx
│       │   ├── find-alphabets/
│       │   ├── number-match/
│       │   ├── trace-letters/
│       │   └── shape-sorter/
│       └── 5+/               # Games for 5+ years
│           ├── page.tsx
│           ├── story-time/
│           ├── spell-words/
│           ├── math-quiz/
│           └── word-search/
```

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000)

## Features

- 🎨 Modern gradient UI with smooth animations
- 📱 Fully responsive design
- ⚡ Fast page transitions with Next.js App Router
- 🎮 Interactive learning games
- 👶 Age-appropriate content (0-2, 2-5, 5+ years)

## Games Implemented

### 0-2 Years (Sounds & Colors)
- ✅ Animal Sounds - Interactive animal sound game
- 🎨 Color Tap - Coming soon
- 🎵 Music Box - Coming soon

### 2-5 Years (Letters & Numbers)
- ✅ Find Alphabets - Letter recognition game
- 🔢 Number Match - Coming soon
- ✏️ Trace Letters - Coming soon
- ⭐ Shape Sorter - Coming soon

### 5+ Years (Words & Stories)
- 📚 Story Time - Coming soon
- 📝 Spell Words - Coming soon
- ➕ Math Quiz - Coming soon
- 🔍 Word Search - Coming soon

## Adding New Games

1. Create a new directory under the appropriate age group:
```bash
mkdir -p app/games/2-5/new-game
```

2. Create `page.tsx` with your game component:
```tsx
'use client';

import Link from 'next/link';

export default function NewGame() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-400 to-purple-400 p-6">
      {/* Your game content */}
    </main>
  );
}
```

3. Add the game to the age group's page.tsx games array

## Deployment

Build for production:
```bash
npm run build
npm start
```

## License

MIT
