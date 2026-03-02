import { Joke, Category, Topic } from './types';
import categoriesData from '@/data/categories.json';
import topicsData from '@/data/topics.json';
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

export function getJokeById(id: string): Joke | undefined {
  return getAllJokes().find(j => j.id === id);
}

export function getJokeBySlug(slug: string): Joke | undefined {
  return getAllJokes().find(j => j.slug === slug);
}

export function getAllJokeSlugs(): string[] {
  return getAllJokes().map(j => j.slug);
}

export function getJokeOfTheDay(): Joke | undefined {
  try {
    const filePath = path.join(process.cwd(), 'data', 'joke-of-the-day.json');
    const data = fs.readFileSync(filePath, 'utf-8');
    const jotdData = JSON.parse(data) as { date: string; jokeId: string }[];
    const today = new Date();
    const dayOfYear = Math.floor(
      (today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000
    );
    const index = dayOfYear % jotdData.length;
    const jokeId = jotdData[index].jokeId;
    return getJokeById(jokeId);
  } catch {
    return getAllJokes()[0];
  }
}

export function getRandomJoke(): Joke {
  const jokes = getAllJokes();
  return jokes[Math.floor(Math.random() * jokes.length)];
}
