import { Metadata } from 'next';
import Link from 'next/link';
import Fuse from 'fuse.js';
import { getAllJokes } from '@/lib/jokes';
import Breadcrumb from '@/components/Breadcrumb';

export const metadata: Metadata = {
  title: 'Search Dad Jokes',
  description: 'Search through 2,000+ dad jokes. Find the perfect joke by keyword.',
  robots: { index: false },
};

interface Props {
  searchParams: Promise<{ q?: string }>;
}

export default async function SearchPage({ searchParams }: Props) {
  const { q } = await searchParams;
  const query = q?.trim() ?? '';

  let results: ReturnType<typeof getAllJokes> = [];

  if (query.length > 0) {
    const allJokes = getAllJokes();
    const fuse = new Fuse(allJokes, {
      keys: ['setup', 'punchline', 'tags'],
      threshold: 0.4,
    });
    results = fuse.search(query, { limit: 50 }).map((r) => r.item);
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: 'Search' },
        ]}
      />

      <h1 className="font-serif text-3xl sm:text-4xl mb-6">Search Dad Jokes</h1>

      <form action="/search" method="GET" className="mb-8">
        <div className="flex gap-3">
          <input
            type="text"
            name="q"
            defaultValue={query}
            placeholder="Search jokes..."
            className="flex-1 bg-surface border border-border rounded-full px-5 py-3 text-sm placeholder:text-text-secondary focus:outline-none focus:border-accent transition-colors"
          />
          <button
            type="submit"
            className="bg-accent text-white font-medium px-6 py-3 rounded-full hover:bg-accent-hover transition-colors"
          >
            Search
          </button>
        </div>
      </form>

      {query && (
        <p className="text-text-secondary mb-6">
          {results.length} result{results.length !== 1 ? 's' : ''} for &ldquo;{query}&rdquo;
        </p>
      )}

      <div className="space-y-3">
        {results.map((joke) => (
          <Link
            key={joke.id}
            href={`/joke/${joke.slug}`}
            className="block bg-surface border border-border rounded-xl p-5 hover:border-accent transition-colors"
          >
            <p className="font-joke">{joke.setup}</p>
            <p className="mt-1.5 text-sm text-text-secondary">{joke.punchline}</p>
          </Link>
        ))}
      </div>

      {query && results.length === 0 && (
        <div className="text-center py-12">
          <p className="text-text-secondary mb-4">No jokes found. Try a different search term.</p>
          <Link href="/browse" className="text-accent hover:text-accent-hover font-medium transition-colors">
            Browse all categories →
          </Link>
        </div>
      )}
    </div>
  );
}
