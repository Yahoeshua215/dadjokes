import Link from 'next/link';
import { getCategories, getJokesByCategory, getAllJokes, getJokeOfTheDay } from '@/lib/jokes';
import { generateWebsiteSchema } from '@/lib/schema';
import HeroJoke from '@/components/HeroJoke';
import CategoryCard from '@/components/CategoryCard';
import RandomJokeButton from '@/components/RandomJokeButton';
import SearchBar from '@/components/SearchBar';

export default function HomePage() {
  const categories = getCategories();
  const allJokes = getAllJokes();
  const jotd = getJokeOfTheDay();
  const bestJokes = getJokesByCategory('best').slice(0, 5);

  const today = new Date().toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'America/New_York',
  });

  const categoryPreviews = categories.map((cat) => ({
    category: cat,
    preview: getJokesByCategory(cat.slug)[0],
  }));

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateWebsiteSchema()) }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero */}
        <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-center mb-2">
          Dad Jokes
        </h1>
        <p className="text-text-secondary text-center mb-8 max-w-lg mx-auto">
          The internet&apos;s finest collection of groan-worthy dad jokes. Browse by category or
          try your luck with a random one.
        </p>

        <div className="flex justify-center mb-10">
          <SearchBar jokes={allJokes} />
        </div>

        {jotd && (
          <div className="mb-16">
            <HeroJoke joke={jotd} date={today} />
          </div>
        )}

        {/* Category Grid */}
        <section className="mb-16">
          <h2 className="font-serif text-2xl sm:text-3xl mb-6">Browse Dad Jokes by Category</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {categoryPreviews.map(({ category, preview }) => (
              <CategoryCard key={category.slug} category={category} previewJoke={preview} />
            ))}
          </div>
        </section>

        {/* Pillar Content Link */}
        <section className="mb-16">
          <Link
            href="/what-is-a-dad-joke"
            className="block bg-surface border border-border rounded-xl p-6 hover:border-accent transition-colors"
          >
            <h2 className="font-serif text-xl sm:text-2xl mb-2">What Is a Dad Joke?</h2>
            <p className="text-text-secondary">
              The origin, history, and psychology behind the world&apos;s most groan-worthy humor genre.
            </p>
          </Link>
        </section>

        {/* Best Of Section */}
        {bestJokes.length > 0 && (
          <section className="mb-16">
            <h2 className="font-serif text-2xl sm:text-3xl mb-6">Best Dad Jokes</h2>
            <div className="space-y-4">
              {bestJokes.map((joke) => (
                <Link
                  key={joke.id}
                  href={`/joke/${joke.slug}`}
                  className="block bg-surface border border-border rounded-xl p-6 hover:border-accent transition-colors"
                >
                  <p className="font-joke text-lg">{joke.setup}</p>
                  <p className="mt-2 font-medium text-text-secondary">{joke.punchline}</p>
                </Link>
              ))}
            </div>
            <a
              href="/best"
              className="inline-block mt-4 text-sm text-accent hover:text-accent-hover font-medium transition-colors"
            >
              See all →
            </a>
          </section>
        )}

        {/* Random Joke */}
        <section className="mb-16">
          <RandomJokeButton jokes={allJokes} />
        </section>
      </div>
    </>
  );
}
