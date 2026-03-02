import { NextRequest, NextResponse } from 'next/server';
import { getAllJokes, getJokesByCategory, getCategorySlugs } from '@/lib/jokes';

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const category = searchParams.get('category');
  const limitParam = searchParams.get('limit');
  const pageParam = searchParams.get('page');

  const limit = Math.min(Math.max(parseInt(limitParam || '20', 10) || 20, 1), 100);
  const page = Math.max(parseInt(pageParam || '1', 10) || 1, 1);

  let jokes;
  if (category) {
    if (!getCategorySlugs().includes(category)) {
      return NextResponse.json(
        { error: `Unknown category: ${category}` },
        { status: 400 }
      );
    }
    jokes = getJokesByCategory(category);
  } else {
    jokes = getAllJokes();
  }

  const total = jokes.length;
  const start = (page - 1) * limit;
  const paged = jokes.slice(start, start + limit);

  return NextResponse.json({
    total,
    page,
    limit,
    jokes: paged.map((joke) => ({
      id: joke.id,
      setup: joke.setup,
      punchline: joke.punchline,
      category: joke.category,
      tags: joke.tags,
    })),
  });
}
