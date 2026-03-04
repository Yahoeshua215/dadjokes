import { Joke, Category, Topic, Pack } from './types';
import categoriesData from '@/data/categories.json';
import topicsData from '@/data/topics.json';
import packsData from '@/data/packs.json';
import fs from 'fs';
import path from 'path';

// Module-level cache for build performance
let _allJokesCache: Joke[] | null = null;

export function getCategories(): Category[] {
  return categoriesData as Category[];
}

export function getCategory(slug: string): Category | undefined {
  return getCategories().find(c => c.slug === slug);
}

export function getCategorySlugs(): string[] {
  return getCategories().map(c => c.slug);
}

export function getJokesByCategory(slug: string): Joke[] {
  try {
    const filePath = path.join(process.cwd(), 'data', 'jokes', `${slug}.json`);
    const data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data) as Joke[];
  } catch {
    return [];
  }
}

export function getAllJokes(): Joke[] {
  if (_allJokesCache) return _allJokesCache;
  const slugs = getCategorySlugs();
  _allJokesCache = slugs.flatMap(slug => getJokesByCategory(slug));
  return _allJokesCache;
}

// --- Topic functions ---

export function getTopics(): Topic[] {
  return topicsData as Topic[];
}

export function getTopicBySlug(slug: string): Topic | undefined {
  return getTopics().find(t => t.slug === slug);
}

export function getTopicSlugs(): string[] {
  return getTopics().map(t => t.slug);
}

export function getJokesByTags(tags: string[]): Joke[] {
  const allJokes = getAllJokes();
  const tagSet = new Set(tags);
  return allJokes.filter(joke =>
    joke.tags.some(t => tagSet.has(t))
  );
}

export function getTopicByTag(tag: string): Topic | undefined {
  return getTopics().find(t => t.tags.includes(tag));
}

// --- Pack functions ---

export function getPacks(): Pack[] {
  return packsData as Pack[];
}

export function getPackBySlug(slug: string): Pack | undefined {
  return getPacks().find(p => p.slug === slug);
}

export function getPackSlugs(): string[] {
  return getPacks().map(p => p.slug);
}

export function getPacksByCategory(categorySlug: string): Pack[] {
  return getPacks().filter(p => p.categories.includes(categorySlug));
}

export function getJokesForPack(pack: Pack): Joke[] {
  const tagJokes = getJokesByTags(pack.tags);
  const categoryJokes = pack.categories.flatMap(cat => getJokesByCategory(cat));
  const seen = new Set<string>();
  const deduped: Joke[] = [];
  for (const joke of [...tagJokes, ...categoryJokes]) {
    if (!seen.has(joke.id)) {
      seen.add(joke.id);
      deduped.push(joke);
    }
  }
  return deduped;
}

export function getJokeById(id: string): Joke | undefined {
  return getAllJokes().find(j => j.id === id);
}

export function getJokeBySlug(slug: string): Joke | undefined {
  // Prefer the canonical (non-duplicate) version
  const all = getAllJokes().filter(j => j.slug === slug);
  return all.find(j => !j.canonicalSlug) || all[0];
}

export function getAllJokeSlugs(): string[] {
  const seen = new Set<string>();
  return getAllJokes()
    .filter(j => {
      if (j.canonicalSlug) return false; // skip duplicates
      if (seen.has(j.slug)) return false;
      seen.add(j.slug);
      return true;
    })
    .map(j => j.slug);
}

function getJOTDData(): { date: string; jokeId: string }[] {
  const filePath = path.join(process.cwd(), 'data', 'joke-of-the-day.json');
  const data = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(data) as { date: string; jokeId: string }[];
}

function toEasternDateString(date: Date): string {
  return date.toLocaleDateString('en-CA', { timeZone: 'America/New_York' });
}

export function getJokeOfTheDayForDate(dateStr: string): Joke | undefined {
  try {
    const jotdData = getJOTDData();
    const match = jotdData.find(entry => entry.date === dateStr);
    if (match) return getJokeById(match.jokeId);
    // Fallback: cycle through the list based on days since the first entry
    const firstDate = new Date(jotdData[0].date + 'T00:00:00');
    const targetDate = new Date(dateStr + 'T00:00:00');
    const daysDiff = Math.floor((targetDate.getTime() - firstDate.getTime()) / 86400000);
    const index = ((daysDiff % jotdData.length) + jotdData.length) % jotdData.length;
    return getJokeById(jotdData[index].jokeId);
  } catch {
    return getAllJokes()[0];
  }
}

export function getJokeOfTheDay(): Joke | undefined {
  const todayStr = toEasternDateString(new Date());
  return getJokeOfTheDayForDate(todayStr);
}

export function getRecentJOTD(count: number): { joke: Joke; date: Date }[] {
  const results: { joke: Joke; date: Date }[] = [];
  const now = new Date();
  for (let i = 1; i <= count; i++) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    const dateStr = toEasternDateString(d);
    const joke = getJokeOfTheDayForDate(dateStr);
    if (joke) results.push({ joke, date: new Date(dateStr + 'T00:00:00') });
  }
  return results;
}

export function getRandomJoke(): Joke {
  const jokes = getAllJokes();
  return jokes[Math.floor(Math.random() * jokes.length)];
}
