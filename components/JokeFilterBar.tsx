'use client';

import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { Joke } from '@/lib/types';
import JokeCard from './JokeCard';

const AGE_OPTIONS = [
  { value: '', label: 'All ages' },
  { value: 'kids', label: 'Kids' },
  { value: 'teens', label: 'Teens' },
];

const LENGTH_OPTIONS = [
  { value: '', label: 'Any length' },
  { value: 'short', label: 'Short (< 60 chars)' },
  { value: 'medium', label: 'Medium' },
  { value: 'long', label: 'Long (100+ chars)' },
];

function getLength(joke: Joke): 'short' | 'medium' | 'long' {
  const total = joke.setup.length + joke.punchline.length;
  if (total < 60) return 'short';
  if (total > 100) return 'long';
  return 'medium';
}

export default function JokeFilterBar({ jokes }: { jokes: Joke[] }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const ageFilter = searchParams.get('age') ?? '';
  const lengthFilter = searchParams.get('length') ?? '';

  const filtered = jokes.filter((joke) => {
    if (ageFilter) {
      const tiers = ['kids', 'teens', 'adults'];
      const selected = tiers.indexOf(ageFilter);
      const joke_tier = tiers.indexOf(joke.ageRange ?? 'teens');
      if (joke_tier > selected) return false;
    }
    if (lengthFilter && getLength(joke) !== lengthFilter) return false;
    return true;
  });

  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    const qs = params.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  };

  return (
    <>
      <div className="flex flex-wrap gap-3 mb-6">
        <div className="relative">
          <select
            value={ageFilter}
            onChange={(e) => updateFilter('age', e.target.value)}
            className="appearance-none bg-surface border border-border rounded-full pl-4 pr-9 py-2 text-sm focus:outline-none focus:border-accent transition-colors cursor-pointer"
          >
            {AGE_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
          <svg className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
        <div className="relative">
          <select
            value={lengthFilter}
            onChange={(e) => updateFilter('length', e.target.value)}
            className="appearance-none bg-surface border border-border rounded-full pl-4 pr-9 py-2 text-sm focus:outline-none focus:border-accent transition-colors cursor-pointer"
          >
            {LENGTH_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
          <svg className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
        {(ageFilter || lengthFilter) && (
          <span className="text-sm text-text-secondary self-center">
            {filtered.length} of {jokes.length} jokes
          </span>
        )}
      </div>
      <div className="space-y-4 mb-12">
        {filtered.map((joke, i) => (
          <JokeCard key={joke.id} joke={joke} index={i + 1} />
        ))}
      </div>
    </>
  );
}
