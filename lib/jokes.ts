import { Joke, Category } from './types';
import categoriesData from '@/data/categories.json';
import fs from 'fs';
import path from 'path';

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
  const slugs = getCategorySlugs();
  return slugs.flatMap(slug => getJokesByCategory(slug));
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
    const today = new Date(new Date().toLocaleDateString('en-US', { timeZone: 'America/New_York' }));
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
