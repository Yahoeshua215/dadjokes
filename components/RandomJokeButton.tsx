'use client';

import { useState } from 'react';
import { Joke } from '@/lib/types';
import ShareButtons from './ShareButtons';

export default function RandomJokeButton({ jokes }: { jokes: Joke[] }) {
  const [currentJoke, setCurrentJoke] = useState<Joke | null>(null);
  const [shaking, setShaking] = useState(false);
  const [revealed, setRevealed] = useState(false);

  const getRandomJoke = () => {
    setShaking(true);
    setRevealed(false);
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * jokes.length);
      setCurrentJoke(jokes[randomIndex]);
      setShaking(false);
      setRevealed(true);
    }, 500);
  };

  return (
    <section className="text-center">
      <h2 className="font-serif text-2xl sm:text-3xl mb-4">Feeling Lucky?</h2>
      <p className="text-text-secondary mb-6">
        Get a random dad joke delivered straight to your screen.
      </p>

      <button
        onClick={getRandomJoke}
        className={`bg-accent hover:bg-accent-hover text-white font-semibold px-8 py-4 rounded-full text-lg transition-colors ${
          shaking ? 'animate-shake' : ''
        }`}
      >
        Hit Me With a Dad Joke 🎲
      </button>

      {currentJoke && revealed && (
        <div className="mt-8 bg-surface border border-border rounded-xl p-8 max-w-lg mx-auto animate-fade-in">
          <p className="font-serif text-xl mb-3">{currentJoke.setup}</p>
          <p className="font-medium text-lg">{currentJoke.punchline}</p>
          <div className="mt-4 pt-3 border-t border-border flex justify-center">
            <ShareButtons joke={currentJoke} />
          </div>
        </div>
      )}
    </section>
  );
}
