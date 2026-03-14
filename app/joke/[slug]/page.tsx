import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import { getJokeBySlug, getAllJokeSlugs, getJokesByCategory, getCategory, getRelatedJokesByTags } from '@/lib/jokes';
import { generateBreadcrumbSchema, generateJokeFAQSchema } from '@/lib/schema';
import { getHumorExplanation, getDeliveryTip, getUsageContext, getCategoryFunFact, detectHumorType } from '@/lib/joke-content';
import Breadcrumb from '@/components/Breadcrumb';
import ShareButtons from '@/components/ShareButtons';
import VoteButtons from '@/components/VoteButtons';

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

  const category = getCategory(joke.category);
  const categoryLabel = category?.name || 'Dad Jokes';
  const title = `${joke.setup} | ${categoryLabel}`;
  const description = `${joke.setup} ${joke.punchline} — Find out why this ${categoryLabel.toLowerCase()} joke works, when to use it, and browse more like it at JokeLikeaDad.com.`;
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
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

const HUMOR_TYPE_LABELS: Record<string, string> = {
  pun: '🎯 Pun',
  wordplay: '🔤 Wordplay',
  'anti-humor': '😐 Anti-Humor',
  observational: '👀 Observational',
  absurd: '🤪 Absurd',
  classic: '👔 Classic Dad Joke',
};

export default async function JokePage({ params }: Props) {
  const { slug } = await params;
  const joke = getJokeBySlug(slug);
  if (!joke) notFound();

  const category = getCategory(joke.category);
  const categoryJokes = getJokesByCategory(joke.category);
  const currentIndex = categoryJokes.findIndex((j) => j.id === joke.id);
  const prevJoke = currentIndex > 0 ? categoryJokes[currentIndex - 1] : null;
  const nextJoke = currentIndex < categoryJokes.length - 1 ? categoryJokes[currentIndex + 1] : null;

  // Tag-based related jokes (cross-category)
  const relatedJokes = getRelatedJokesByTags(joke, 5);

  // Enriched content — use joke-specific fields if available, fall back to generic
  const humorType = detectHumorType(joke);
  const humorLabel = HUMOR_TYPE_LABELS[humorType] || '👔 Classic Dad Joke';
  const explanation = joke.whyFunny || getHumorExplanation(joke);
  const deliveryTip = joke.howToTell || getDeliveryTip(joke);
  const usageContext = joke.perfectFor
    ? joke.perfectFor.join(' · ')
    : category ? getUsageContext(joke, category) : '';
  const funFact = category ? getCategoryFunFact(category) : '';

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
        <article className="bg-surface border border-border rounded-2xl p-8 sm:p-10 mb-8">
          <div className="mb-4">
            <span className="text-xs font-medium text-accent bg-accent/10 px-3 py-1 rounded-full">
              {humorLabel}
            </span>
          </div>

          <h1 className="font-serif text-2xl sm:text-3xl leading-relaxed mb-6">
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
              {joke.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs text-text-secondary bg-background px-2.5 py-1 rounded-full border border-border"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex items-center gap-3">
              <VoteButtons jokeId={joke.id} />
              <ShareButtons joke={joke} jokeUrl={jokeUrl} />
            </div>
          </div>
        </article>

        {/* Why This Joke Works */}
        <section className="bg-surface border border-border rounded-2xl p-6 sm:p-8 mb-6">
          <h2 className="font-serif text-xl mb-3">Why This Joke Works</h2>
          <p className="text-text-secondary leading-relaxed">{explanation}</p>
        </section>

        {/* How to Tell It */}
        <section className="bg-surface border border-border rounded-2xl p-6 sm:p-8 mb-6">
          <h2 className="font-serif text-xl mb-3">🎤 How to Tell This Joke</h2>
          <p className="text-text-secondary leading-relaxed mb-4">{deliveryTip}</p>
          {joke.perfectFor ? (
            <div>
              <p className="text-sm font-medium text-text-secondary mb-2">Perfect for:</p>
              <ul className="space-y-1">
                {joke.perfectFor.map((occasion, i) => (
                  <li key={i} className="flex items-start gap-2 text-text-secondary text-sm">
                    <span className="text-accent mt-0.5">•</span>
                    <span>{occasion}</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : usageContext ? (
            <p className="text-text-secondary leading-relaxed">{usageContext}</p>
          ) : null}
        </section>

        {/* Fun Fact */}
        {funFact && (
          <section className="bg-accent/5 border border-accent/20 rounded-2xl p-6 sm:p-8 mb-8">
            <h2 className="font-serif text-xl mb-3">💡 Did You Know?</h2>
            <p className="text-text-secondary leading-relaxed">{funFact}</p>
          </section>
        )}

        {/* Prev / Next Navigation */}
        <div className="flex gap-4 mb-12">
          {prevJoke ? (
            <Link
              href={`/joke/${prevJoke.slug}`}
              className="flex-1 bg-surface border border-border rounded-xl p-4 hover:border-accent transition-colors group"
            >
              <span className="text-xs text-text-secondary">← Previous joke</span>
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
              <span className="text-xs text-text-secondary">Next joke →</span>
              <p className="text-sm font-medium mt-1 group-hover:text-accent transition-colors line-clamp-1">
                {nextJoke.setup}
              </p>
            </Link>
          ) : (
            <div className="flex-1" />
          )}
        </div>

        {/* Related Jokes (tag-based, cross-category) */}
        {relatedJokes.length > 0 && (
          <section className="mb-12">
            <h2 className="font-serif text-xl mb-4">More Jokes Like This</h2>
            <div className="space-y-3">
              {relatedJokes.map((rj) => {
                const rjCategory = getCategory(rj.category);
                return (
                  <Link
                    key={rj.id}
                    href={`/joke/${rj.slug}`}
                    className="block bg-surface border border-border rounded-xl p-5 hover:border-accent transition-colors"
                  >
                    <p className="font-serif">{rj.setup}</p>
                    <p className="mt-1.5 text-sm text-text-secondary">{rj.punchline}</p>
                    {rjCategory && rjCategory.slug !== joke.category && (
                      <span className="inline-block mt-2 text-xs text-accent bg-accent/10 px-2 py-0.5 rounded-full">
                        {rjCategory.emoji} {rjCategory.name}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
            <Link
              href={`/${joke.category}`}
              className="inline-block mt-4 text-sm text-accent hover:text-accent-hover font-medium transition-colors"
            >
              See all {category?.name || 'jokes'} →
            </Link>
          </section>
        )}

        {/* Browse More CTA */}
        <section className="text-center bg-surface border border-border rounded-2xl p-8">
          <h2 className="font-serif text-xl mb-2">Want More Dad Jokes?</h2>
          <p className="text-text-secondary mb-4">
            We&apos;ve got 2,000+ dad jokes across 20 categories. Find your next favorite.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/categories"
              className="bg-accent text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-accent-hover transition-colors"
            >
              Browse All Categories
            </Link>
            <Link
              href="/joke-of-the-day"
              className="border border-accent text-accent px-5 py-2.5 rounded-full text-sm font-medium hover:bg-accent/10 transition-colors"
            >
              Joke of the Day
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
