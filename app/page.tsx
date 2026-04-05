export const revalidate = 86400; // revalidate once per day

import Link from 'next/link';
import { getCategories, getJokesByCategory, getAllJokes, getJokeOfTheDay, getTopics, getPacks, getJokesForPack } from '@/lib/jokes';
import { generateWebsiteSchema } from '@/lib/schema';
import HeroJoke from '@/components/HeroJoke';
import RandomJokeButton from '@/components/RandomJokeButton';
import SearchBar from '@/components/SearchBar';

const SUBJECT_GROUPS: { label: string; slugs: string[] }[] = [
  { label: 'Food & Drink', slugs: ['coffee', 'cheese', 'pizza', 'pasta', 'fruit', 'vegetables', 'cooking', 'breakfast'] },
  { label: 'Animals', slugs: ['dinosaurs', 'dogs', 'cats', 'fish', 'bears', 'birds', 'cows', 'horses', 'ocean'] },
  { label: 'Sports', slugs: ['golf', 'football', 'baseball', 'basketball', 'soccer', 'tennis'] },
  { label: 'Science & Math', slugs: ['space', 'chemistry', 'physics', 'biology', 'weather', 'math-topic', 'geometry', 'algebra'] },
  { label: 'Work & Tech', slugs: ['office', 'programming', 'money', 'shopping'] },
  { label: 'School & Learning', slugs: ['school', 'books', 'history', 'geography', 'art'] },
  { label: 'Lifestyle', slugs: ['cars', 'music', 'fashion', 'travel', 'camping', 'fishing', 'nature', 'gardening', 'farming', 'sleep'] },
  { label: 'Family', slugs: ['marriage', 'parenting'] },
  { label: 'Health', slugs: ['doctor', 'dentist', 'anatomy'] },
  { label: 'Seasonal', slugs: ['ghosts', 'vampires', 'skeletons', 'witches', 'zombies', 'pumpkins', 'santa', 'elves', 'reindeer', 'snowman', 'turkey', 'pirates', 'robots'] },
];

const OCCASION_GROUPS: { label: string; slugs: string[] }[] = [
  { label: 'For Professionals', slugs: ['teacher-jokes', 'nurse-jokes', 'engineer-jokes', 'accountant-jokes', 'doctor-jokes', 'programmer-jokes', 'lawyer-jokes'] },
  { label: 'For Occasions', slugs: ['birthday-card-jokes', 'wedding-speech-jokes', 'morning-announcement-jokes', 'lunchbox-notes', 'sales-meeting-jokes'] },
  { label: 'By Age Group', slugs: ['jokes-for-4-year-olds', 'jokes-for-5-year-olds', 'jokes-for-kindergarteners', 'jokes-for-middle-schoolers', 'jokes-for-teens'] },
];

export default function HomePage() {
  const categories = getCategories();
  const allJokes = getAllJokes();
  const jotd = getJokeOfTheDay();
  const bestJokes = getJokesByCategory('best').slice(0, 5);
  const allTopics = getTopics();
  const topicMap = new Map(allTopics.map((t) => [t.slug, t]));
  const packs = getPacks();
  const today = new Date().toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'America/New_York',
  });

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

        {/* Browse by Style */}
        <section className="mb-16">
          <h2 className="font-serif text-2xl sm:text-3xl mb-1">Browse by Style</h2>
          <p className="text-text-secondary text-sm mb-5">Browse by tone — funny, corny, clean, dirty, and more.</p>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/${cat.slug}`}
                className="flex items-center gap-1.5 bg-surface border border-border rounded-full px-4 py-2 hover:border-accent transition-colors"
              >
                <span>{cat.emoji}</span>
                <span className="text-sm font-medium">{cat.name}</span>
              </Link>
            ))}
          </div>
        </section>

        {/* By Subject */}
        <section className="mb-16">
          <h2 className="font-serif text-2xl sm:text-3xl mb-1">Browse by Subject</h2>
          <p className="text-text-secondary text-sm mb-5">Looking for jokes about something specific? Browse by topic.</p>
          {SUBJECT_GROUPS.map((group) => {
            const topics = group.slugs
              .map((s) => topicMap.get(s))
              .filter((t): t is NonNullable<typeof t> => !!t);
            if (topics.length === 0) return null;
            return (
              <div key={group.label} className="mb-6">
                <h3 className="text-sm font-semibold text-text-secondary uppercase tracking-wide mb-3">
                  {group.label}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {topics.map((topic) => (
                    <Link
                      key={topic.slug}
                      href={`/topics/${topic.slug}`}
                      className="flex items-center gap-1.5 bg-surface border border-border rounded-full px-4 py-2 hover:border-accent transition-colors"
                    >
                      <span>{topic.emoji}</span>
                      <span className="text-sm font-medium">{topic.name}</span>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </section>

        {/* For Specific People & Occasions */}
        <section className="mb-16">
          <h2 className="font-serif text-2xl sm:text-3xl mb-1">For Specific People & Occasions</h2>
          <p className="text-text-secondary text-sm mb-5">
            Need the perfect joke for a teacher, a birthday card, or a 5-year-old?
          </p>
          {OCCASION_GROUPS.map((group) => {
            const topics = group.slugs
              .map((s) => topicMap.get(s))
              .filter((t): t is NonNullable<typeof t> => !!t);
            if (topics.length === 0) return null;
            return (
              <div key={group.label} className="mb-6">
                <h3 className="text-sm font-semibold text-text-secondary uppercase tracking-wide mb-3">
                  {group.label}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {topics.map((topic) => (
                    <Link
                      key={topic.slug}
                      href={`/topics/${topic.slug}`}
                      className="flex items-center gap-1.5 bg-surface border border-border rounded-full px-4 py-2 hover:border-accent transition-colors"
                    >
                      <span>{topic.emoji}</span>
                      <span className="text-sm font-medium">{topic.name}</span>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </section>

        {/* Joke Packs */}
        <section className="mb-16">
          <h2 className="font-serif text-2xl sm:text-3xl mb-1">Joke Packs</h2>
          <p className="text-text-secondary text-sm mb-5">
            Curated collections for specific occasions — ready to use.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {packs.map((pack) => {
              const jokeCount = getJokesForPack(pack).length;
              return (
                <Link
                  key={pack.slug}
                  href={`/packs/${pack.slug}`}
                  className="flex items-center gap-3 bg-surface border border-border rounded-xl px-4 py-3 hover:border-accent transition-colors"
                >
                  <span className="text-2xl">{pack.emoji}</span>
                  <div className="min-w-0">
                    <p className="font-medium text-sm truncate">{pack.name}</p>
                    <p className="text-xs text-text-secondary">{jokeCount} jokes</p>
                  </div>
                </Link>
              );
            })}
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
