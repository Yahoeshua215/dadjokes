'use client';

import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { Joke } from '@/lib/types';
import JokeCard from './JokeCard';

const AGE_OPTIONS = [
  { value: '', label: 'All ages' },
  { value: 'little-kids', label: 'Little kids' },
  { value: 'kids', label: 'Kids' },
  { value: 'tweens', label: 'Tweens' },
  { value: 'teens', label: 'Teens' },
  { value: 'all-ages', label: 'All-ages rated' },
];

const LENGTH_OPTIONS = [
  { value: '', label: 'Any length' },
  { value: 'short', label: 'Short (< 80 chars)' },
  { value: 'medium', label: 'Medium' },
  { value: 'long', label: 'Long (> 200 chars)' },
];

function getLength(joke: Joke): 'short' | 'medium' | 'long' {
  const total = joke.setup.length + joke.punchline.length;
  if (total < 80) return 'short';
  if (total > 200) return 'long';
  return 'medium';
}

export default function JokeFilterBar({ jokes }: { jokes: Joke[] }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const ageFilter = searchParams.get('age') ?? '';
  const lengthFilter = searchParams.get('length') ?? '';

  const filtered = jokes.filter((joke) => {
    if (ageFilter && joke.ageRange !== ageFilter) return false;
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
        <select
          value={ageFilter}
          onChange={(e) => updateFilter('age', e.target.value)}
          className="bg-surface border border-border rounded-full px-4 py-2 text-sm focus:outline-none focus:border-accent transition-colors"
        >
          {AGE_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
        <select
          value={lengthFilter}
          onChange={(e) => updateFilter('length', e.target.value)}
          className="bg-surface border border-border rounded-full px-4 py-2 text-sm focus:outline-none focus:border-accent transition-colors"
        >
          {LENGTH_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
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
