import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import { getJokeBySlug, getAllJokeSlugs, getJokesByCategory, getCategory, getTopicByTag } from '@/lib/jokes';
import { generateBreadcrumbSchema, generateJokeFAQSchema } from '@/lib/schema';
import Breadcrumb from '@/components/Breadcrumb';
import ShareButtons from '@/components/ShareButtons';
import VoteButtons from '@/components/VoteButtons';
import PrintButton from '@/components/PrintButton';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllJokeSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const joke = getJokeBySlug(slug);
  if (!joke) return {};

  const title = `${joke.setup} | Dad Joke`;
  const description = `${joke.setup} — Can you guess the answer? Find out at JokeLikeaDad.com`;
  const url = `https://jokelikeadad.com/joke/${slug}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: 'JokeLikeaDad.com',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

export default async function JokePage({ params }: Props) {
  const { slug } = await params;
  const joke = getJokeBySlug(slug);
  if (!joke) notFound();

  const category = getCategory(joke.category);
  const categoryJokes = getJokesByCategory(joke.category);
  const currentIndex = categoryJokes.findIndex((j) => j.id === joke.id);
  const prevJoke = currentIndex > 0 ? categoryJokes[currentIndex - 1] : null;
  const nextJoke = currentIndex < categoryJokes.length - 1 ? categoryJokes[currentIndex + 1] : null;
  const relatedJokes = categoryJokes
    .filter((j) => j.id !== joke.id)
    .slice(0, 3);

  const jokeUrl = `https://jokelikeadad.com/joke/${slug}`;

  const breadcrumbItems = [
    { name: 'Home', url: 'https://jokelikeadad.com' },
    { name: category?.name || 'Jokes', url: `https://jokelikeadad.com/${joke.category}` },
    { name: joke.setup.slice(0, 50) + (joke.setup.length > 50 ? '...' : ''), url: jokeUrl },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateBreadcrumbSchema(breadcrumbItems)),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateJokeFAQSchema(joke)),
        }}
      />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb
          items={[
            { label: 'Home', href: '/' },
            { label: category?.name || 'Jokes', href: `/${joke.category}` },
            { label: joke.setup.slice(0, 40) + (joke.setup.length > 40 ? '...' : '') },
          ]}
        />

        {/* Main Joke */}
        <article className="bg-surface border border-border rounded-2xl p-8 sm:p-10 mb-8 print-card">
          <h1 className="font-joke text-2xl sm:text-3xl leading-relaxed mb-6">
            {joke.setup}
          </h1>
          <p className="text-xl sm:text-2xl font-medium text-accent">
            {joke.punchline}
          </p>

          <div className="mt-6 pt-4 border-t border-border flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2 flex-wrap">
              {category && (
                <Link
                  href={`/${joke.category}`}
                  className="text-xs font-medium text-accent bg-accent/10 px-3 py-1.5 rounded-full hover:bg-accent/20 transition-colors"
                >
                  {category.emoji} {category.name}
                </Link>
              )}
              {joke.tags.map((tag) => {
                const topic = getTopicByTag(tag);
                return topic ? (
                  <Link
                    key={tag}
                    href={`/topics/${topic.slug}`}
                    className="text-xs text-text-secondary bg-background px-2.5 py-1 rounded-full border border-border hover:border-accent hover:text-accent transition-colors"
                  >
                    {tag}
                  </Link>
                ) : (
                  <span
                    key={tag}
                    className="text-xs text-text-secondary bg-background px-2.5 py-1 rounded-full border border-border"
                  >
                    {tag}
                  </span>
                );
              })}
            </div>
            <div className="flex items-center gap-3">
              <VoteButtons jokeId={joke.id} />
              <ShareButtons joke={joke} jokeUrl={jokeUrl} />
              <PrintButton />
            </div>
          </div>
        </article>

        {/* Prev / Next Navigation */}
        <div className="flex gap-4 mb-12">
          {prevJoke ? (
            <Link
              href={`/joke/${prevJoke.slug}`}
              className="flex-1 bg-surface border border-border rounded-xl p-4 hover:border-accent transition-colors group"
            >
              <span className="text-xs text-text-secondary">Previous joke</span>
              <p className="text-sm font-medium mt-1 group-hover:text-accent transition-colors line-clamp-1">
                {prevJoke.setup}
              </p>
            </Link>
          ) : (
            <div className="flex-1" />
          )}
          {nextJoke ? (
            <Link
              href={`/joke/${nextJoke.slug}`}
              className="flex-1 bg-surface border border-border rounded-xl p-4 hover:border-accent transition-colors group text-right"
            >
              <span className="text-xs text-text-secondary">Next joke</span>
              <p className="text-sm font-medium mt-1 group-hover:text-accent transition-colors line-clamp-1">
                {nextJoke.setup}
              </p>
            </Link>
          ) : (
            <div className="flex-1" />
          )}
        </div>

        {/* Related Jokes */}
        {relatedJokes.length > 0 && (
          <section>
            <h2 className="font-serif text-xl mb-4">More {category?.name || 'Dad Jokes'}</h2>
            <div className="space-y-3">
              {relatedJokes.map((rj) => (
                <Link
                  key={rj.id}
                  href={`/joke/${rj.slug}`}
                  className="block bg-surface border border-border rounded-xl p-5 hover:border-accent transition-colors"
                >
                  <p className="font-joke">{rj.setup}</p>
                  <p className="mt-1.5 text-sm text-text-secondary">{rj.punchline}</p>
                </Link>
              ))}
            </div>
            <Link
              href={`/${joke.category}`}
              className="inline-block mt-4 text-sm text-accent hover:text-accent-hover font-medium transition-colors"
            >
              See all {category?.name || 'jokes'} →
            </Link>
          </section>
        )}
      </div>
    </>
  );
}
