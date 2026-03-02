'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Fuse from 'fuse.js';
import { Joke } from '@/lib/types';

export default function SearchBar({ jokes }: { jokes: Joke[] }) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const fuse = useMemo(
    () =>
      new Fuse(jokes, {
        keys: ['setup', 'punchline', 'tags'],
        threshold: 0.4,
      }),
    [jokes]
  );

  const results = query.length > 1 ? fuse.search(query, { limit: 8 }) : [];

  return (
    <div className="relative w-full max-w-md">
      <input
        type="text"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setIsOpen(true);
        }}
        onFocus={() => setIsOpen(true)}
        onBlur={() => setTimeout(() => setIsOpen(false), 200)}
        placeholder="Search jokes..."
        className="w-full bg-surface border border-border rounded-full px-4 py-2.5 text-sm placeholder:text-text-secondary focus:outline-none focus:border-accent transition-colors"
      />
      {isOpen && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-surface border border-border rounded-xl shadow-lg overflow-hidden z-50">
          {results.map(({ item }) =>
            item.slug ? (
              <Link
                key={item.id}
                href={`/joke/${item.slug}`}
                className="block px-4 py-3 hover:bg-background transition-colors border-b border-border last:border-0"
              >
                <p className="text-sm font-medium">{item.setup}</p>
                <p className="text-xs text-text-secondary mt-1">{item.punchline}</p>
              </Link>
            ) : (
              <div
                key={item.id}
                className="px-4 py-3 hover:bg-background transition-colors border-b border-border last:border-0"
              >
                <p className="text-sm font-medium">{item.setup}</p>
                <p className="text-xs text-text-secondary mt-1">{item.punchline}</p>
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
}
