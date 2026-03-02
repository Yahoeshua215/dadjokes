import { Metadata } from 'next';
import Link from 'next/link';
import { getAllJokes } from '@/lib/jokes';
import { generateBreadcrumbSchema } from '@/lib/schema';
import Breadcrumb from '@/components/Breadcrumb';
import JokeCard from '@/components/JokeCard';

export const metadata: Metadata = {
  title: 'Top Rated Dad Jokes (2026) — The 50 Highest Rated | JokeLikeaDad.com',
  description:
    'The top 50 highest rated dad jokes, ranked by our editors. Only the best groan-worthy puns and one-liners make this list.',
  alternates: { canonical: 'https://jokelikeadad.com/top-rated' },
  openGraph: {
    title: 'Top Rated Dad Jokes — The 50 Highest Rated',
    description:
      'The top 50 highest rated dad jokes, ranked by our editors. Only the best make this list.',
    url: 'https://jokelikeadad.com/top-rated',
  },
};

export default function TopRatedPage() {
  const allJokes = getAllJokes();
  const topJokes = [...allJokes]
    .sort((a, b) => b.rating - a.rating || a.setup.localeCompare(b.setup))
    .slice(0, 50);

  const breadcrumbItems = [
    { name: 'Home', url: 'https://jokelikeadad.com' },
    { name: 'Top Rated', url: 'https://jokelikeadad.com/top-rated' },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateBreadcrumbSchema(breadcrumbItems)) }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Top Rated' }]} />

        <div className="mb-8">
          <h1 className="font-serif text-3xl sm:text-4xl mb-3">
            Top Rated Dad Jokes
          </h1>
          <p className="text-text-secondary leading-relaxed max-w-2xl">
            The 50 highest rated dad jokes from our collection of 2,000+. These are the
            cream of the crop — the jokes that consistently produce the loudest groans.
          </p>
          <div className="mt-3">
            <span className="text-xs font-medium text-accent bg-accent/10 px-3 py-1 rounded-full">
              {topJokes.length} jokes
            </span>
          </div>
        </div>

        <div className="space-y-4 mb-12">
          {topJokes.map((joke, i) => (
            <JokeCard key={joke.id} joke={joke} index={i + 1} />
          ))}
        </div>

        <section className="text-center">
          <p className="text-text-secondary mb-4">Want more? Browse all categories.</p>
          <Link
            href="/categories"
            className="inline-block bg-accent text-white font-medium px-6 py-3 rounded-full hover:bg-accent-hover transition-colors"
          >
            Browse All Categories
          </Link>
        </section>
      </div>
    </>
  );
}
