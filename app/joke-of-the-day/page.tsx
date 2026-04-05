export const revalidate = 86400; // revalidate once per day

import { Metadata } from 'next';
import { getJokeOfTheDay, getAllJokes } from '@/lib/jokes';
import HeroJoke from '@/components/HeroJoke';

export const metadata: Metadata = {
  title: 'Dad Joke of the Day | JokeLikeaDad.com',
  description:
    'Get a fresh dad joke every day. Our joke of the day is handpicked from the best dad jokes in our collection.',
  alternates: { canonical: 'https://jokelikeadad.com/joke-of-the-day' },
};

export default function JokeOfTheDayPage() {
  const jotd = getJokeOfTheDay();
  const allJokes = getAllJokes();

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  // Get a few recent "past" jokes for the archive feel
  const pastJokes = allJokes.slice(0, 7);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="font-serif text-3xl sm:text-4xl text-center mb-2">Dad Joke of the Day</h1>
      <p className="text-text-secondary text-center mb-8">
        A fresh dad joke delivered daily. Come back tomorrow for a new one!
      </p>

      {jotd && (
        <div className="mb-12">
          <HeroJoke joke={jotd} date={today} />
        </div>
      )}

      <section>
        <h2 className="font-serif text-2xl mb-6">Recent Picks</h2>
        <div className="space-y-4">
          {pastJokes.map((joke, i) => (
            <div
              key={joke.id}
              className="bg-surface border border-border rounded-xl p-6"
            >
              <div className="flex items-start gap-3">
                <span className="text-xs text-text-secondary bg-background px-2 py-1 rounded-full whitespace-nowrap">
                  {i + 1}d ago
                </span>
                <div>
                  <p className="font-serif text-lg">{joke.setup}</p>
                  <p className="mt-2 font-medium text-text-secondary">{joke.punchline}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
