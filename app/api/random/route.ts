import { NextResponse } from 'next/server';
import { getAllJokes } from '@/lib/jokes';

export async function GET() {
  const jokes = getAllJokes();
  const joke = jokes[Math.floor(Math.random() * jokes.length)];

  return NextResponse.json({
    id: joke.id,
    setup: joke.setup,
    punchline: joke.punchline,
    category: joke.category,
    tags: joke.tags,
  });
}
