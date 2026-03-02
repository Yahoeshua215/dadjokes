import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About | JokeLikeaDad.com',
  description:
    'Learn about JokeLikeaDad.com — the internet\'s best curated collection of dad jokes.',
  alternates: { canonical: 'https://jokelikeadad.com/about' },
};

export default function AboutPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="font-serif text-3xl sm:text-4xl mb-6">About JokeLikeaDad.com</h1>

      <div className="prose prose-neutral max-w-none space-y-4 text-text-secondary leading-relaxed">
        <p>
          Welcome to the internet&apos;s most carefully curated collection of dad jokes. We believe
          that a good dad joke is an art form — simple, groan-worthy, and guaranteed to make
          everyone in the room simultaneously laugh and roll their eyes.
        </p>

        <p>
          Every joke on this site has been handpicked for quality. No filler, no repeats, just
          pure, concentrated dad humor organized into easy-to-browse categories.
        </p>

        <h2 className="font-serif text-2xl text-foreground mt-8 mb-3">What makes a great dad joke?</h2>
        <p>
          A great dad joke follows a simple formula: an innocent setup that leads to a punchline
          so obvious (or so awful) that you can&apos;t help but laugh. The best ones are clean,
          clever, and work on multiple levels. They&apos;re the jokes your dad told at the dinner
          table that made you groan as a kid — and now you catch yourself telling them too.
        </p>

        <h2 className="font-serif text-2xl text-foreground mt-8 mb-3">Browse the collection</h2>
        <p>
          Ready to start groaning?{' '}
          <Link href="/categories" className="text-accent hover:text-accent-hover font-medium">
            Browse all categories
          </Link>
          {' '}or check out the{' '}
          <Link href="/joke-of-the-day" className="text-accent hover:text-accent-hover font-medium">
            Joke of the Day
          </Link>.
        </p>
      </div>
    </div>
  );
}
