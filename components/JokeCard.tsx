'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Joke } from '@/lib/types';
import ShareButtons from './ShareButtons';
import VoteButtons from './VoteButtons';

export default function JokeCard({ joke, index }: { joke: Joke; index: number }) {
  const [revealed, setRevealed] = useState(false);
  const jokeUrl = `https://jokelikeadad.com/joke/${joke.slug}`;

  return (
    <div className="bg-surface border border-border rounded-xl p-6 card-hover">
      <div className="flex items-start gap-4">
        {joke.slug ? (
          <Link
            href={`/joke/${joke.slug}`}
            className="text-sm font-medium text-text-secondary hover:text-accent bg-background rounded-full w-8 h-8 flex items-center justify-center shrink-0 transition-colors"
            title="View this joke"
          >
            {index}
          </Link>
        ) : (
          <span className="text-sm font-medium text-text-secondary bg-background rounded-full w-8 h-8 flex items-center justify-center shrink-0">
            {index}
          </span>
        )}
        <div className="flex-1 min-w-0">
          {joke.slug ? (
            <Link href={`/joke/${joke.slug}`} className="hover:text-accent transition-colors">
              <p className="font-serif text-lg leading-relaxed">{joke.setup}</p>
            </Link>
          ) : (
            <p className="font-serif text-lg leading-relaxed">{joke.setup}</p>
          )}

          {!revealed ? (
            <button
              onClick={() => setRevealed(true)}
              className="mt-3 text-sm text-accent hover:text-accent-hover font-medium transition-colors"
            >
              Reveal punchline →
            </button>
          ) : (
            <div className="punchline-visible">
              <p className="mt-3 font-medium text-foreground">{joke.punchline}</p>
              <div className="mt-4 pt-3 border-t border-border flex items-center justify-between">
                <VoteButtons jokeId={joke.id} />
                <ShareButtons joke={joke} jokeUrl={jokeUrl} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
