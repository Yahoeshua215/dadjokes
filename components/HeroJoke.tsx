'use client';

import { useState } from 'react';
import { Joke } from '@/lib/types';
import ShareButtons from './ShareButtons';

export default function HeroJoke({ joke, date, label }: { joke: Joke; date: string; label?: string }) {
  const [revealed, setRevealed] = useState(false);

  return (
    <section className="bg-surface border border-border rounded-2xl p-8 sm:p-12 text-center">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-center gap-2 mb-6">
          <span className="text-xs font-medium text-accent bg-accent/10 px-3 py-1 rounded-full">
            {label || 'Joke of the Day'}
          </span>
          <span className="text-xs text-text-secondary">{date}</span>
        </div>

        <p className="font-joke text-2xl sm:text-3xl lg:text-4xl leading-snug mb-6">
          {joke.setup}
        </p>

        {!revealed ? (
          <button
            onClick={() => setRevealed(true)}
            className="bg-accent hover:bg-accent-hover text-white font-medium px-6 py-3 rounded-full transition-colors text-sm"
          >
            Reveal punchline 👀
          </button>
        ) : (
          <div className="animate-fade-in">
            <p className="font-medium text-xl sm:text-2xl mb-6">{joke.punchline}</p>
            <div className="flex justify-center">
              <ShareButtons joke={joke} />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
