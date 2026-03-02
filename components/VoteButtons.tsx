'use client';

import { useState, useEffect } from 'react';
import { getVote, setVote, Vote } from '@/lib/votes';

export default function VoteButtons({ jokeId }: { jokeId: string }) {
  const [vote, setVoteState] = useState<Vote>(null);

  useEffect(() => {
    setVoteState(getVote(jokeId));
  }, [jokeId]);

  function handleVote(type: 'up' | 'down') {
    const newVote = vote === type ? null : type;
    setVote(jokeId, newVote);
    setVoteState(newVote);
  }

  return (
    <div className="flex items-center gap-1">
      <button
        onClick={handleVote.bind(null, 'up')}
        aria-label="Thumbs up"
        className={`p-1.5 rounded-lg transition-colors ${
          vote === 'up'
            ? 'text-accent bg-accent/10'
            : 'text-text-secondary hover:text-accent hover:bg-accent/5'
        }`}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M7 10v12" />
          <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z" />
        </svg>
      </button>
      <button
        onClick={handleVote.bind(null, 'down')}
        aria-label="Thumbs down"
        className={`p-1.5 rounded-lg transition-colors ${
          vote === 'down'
            ? 'text-red-500 bg-red-500/10'
            : 'text-text-secondary hover:text-red-500 hover:bg-red-500/5'
        }`}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 14V2" />
          <path d="M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22h0a3.13 3.13 0 0 1-3-3.88Z" />
        </svg>
      </button>
    </div>
  );
}
