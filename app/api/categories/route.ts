import { NextResponse } from 'next/server';
import { getCategories } from '@/lib/jokes';

export async function GET() {
  const categories = getCategories().map((cat) => ({
    slug: cat.slug,
    name: cat.name,
    emoji: cat.emoji,
    description: cat.description,
    jokeCount: cat.jokeCount,
  }));

  return NextResponse.json({ categories });
}
