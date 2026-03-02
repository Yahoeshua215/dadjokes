export type Vote = 'up' | 'down' | null;

const STORAGE_KEY_PREFIX = 'vote:';

export function getVote(jokeId: string): Vote {
  if (typeof window === 'undefined') return null;
  const value = localStorage.getItem(`${STORAGE_KEY_PREFIX}${jokeId}`);
  if (value === 'up' || value === 'down') return value;
  return null;
}

export function setVote(jokeId: string, vote: Vote): void {
  if (typeof window === 'undefined') return;
  const key = `${STORAGE_KEY_PREFIX}${jokeId}`;
  if (vote === null) {
    localStorage.removeItem(key);
  } else {
    localStorage.setItem(key, vote);
  }
}
