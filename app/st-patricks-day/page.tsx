import Link from 'next/link';
import { Metadata } from 'next';
import { getJokesByCategory, getCategories, getTopics, getPackBySlug } from '@/lib/jokes';
import { generateBreadcrumbSchema, generateJokeListSchema, generateFAQSchema } from '@/lib/schema';
import { Category } from '@/lib/types';
import Breadcrumb from '@/components/Breadcrumb';
import HeroJoke from '@/components/HeroJoke';
import FAQAccordion from '@/components/FAQAccordion';
import JokeFilterBar from '@/components/JokeFilterBar';
import { Suspense } from 'react';
import JokeCard from '@/components/JokeCard';

const CATEGORY_DATA: Category = {
  slug: 'st-patricks-day',
  name: "St. Patrick's Day Dad Jokes",
  emoji: '☘️',
  description: "Lucky you! These St. Patrick's Day dad jokes are worth their weight in gold — pot of gold, that is. From leprechaun puns to shamrock wordplay, this collection is packed with green-themed groaners perfect for March 17th celebrations, pub crawls, and wearing ridiculous amounts of green.",
  metaTitle: "100+ St. Patrick's Day Dad Jokes (2026) — Lucky Laughs & Green Groans",
  metaDescription: "The best St. Patrick's Day dad jokes about leprechauns, shamrocks, and pots of gold. 100+ lucky puns perfect for your March 17th celebrations.",
  relatedCategories: ['christmas', 'halloween', 'thanksgiving'],
  jokeCount: 100,
  searchVolume: 4400,
};

const TOPIC_SLUGS = ['leprechaun', 'shamrock', 'irish', 'pot-of-gold', 'lucky', 'beer'] as const;

const FAQS = [
  {
    question: "What are the best St. Patrick's Day dad jokes?",
    answer: "The best St. Patrick's Day dad jokes feature leprechauns, shamrocks, pots of gold, and Irish puns. They're clean, family-friendly, and guaranteed to get a groan — even from someone who forgot to wear green.",
  },
  {
    question: "Are these St. Patrick's Day jokes appropriate for kids?",
    answer: "Yes! Every joke in our collection is family-friendly and suitable for all ages. They're perfect for school celebrations, family parties, and St. Patrick's Day parades.",
  },
  {
    question: "How many St. Patrick's Day dad jokes do you have?",
    answer: "We have 100+ handpicked St. Patrick's Day dad jokes covering leprechauns, shamrocks, rainbows, pots of gold, Irish culture, and more. New jokes are added regularly.",
  },
  {
    question: "Can I use these jokes at a St. Patrick's Day party?",
    answer: "Absolutely! These jokes are perfect for St. Patrick's Day parties, pub crawls, office celebrations, school events, and anywhere people are celebrating on March 17th.",
  },
  {
    question: "Why are dad jokes so popular on St. Patrick's Day?",
    answer: "St. Patrick's Day is all about fun, laughter, and community — the perfect setting for dad jokes. Plus, leprechauns, shamrocks, and pots of gold are naturally punny topics that lend themselves to groan-worthy wordplay.",
  },
];

export const metadata: Metadata = {
  title: CATEGORY_DATA.metaTitle,
  description: CATEGORY_DATA.metaDescription,
  alternates: { canonical: 'https://jokelikeadad.com/st-patricks-day' },
  openGraph: {
    title: CATEGORY_DATA.metaTitle,
    description: CATEGORY_DATA.metaDescription,
    url: 'https://jokelikeadad.com/st-patricks-day',
  },
};

export default function StPatricksDayPage() {
  const jokes = getJokesByCategory('st-patricks-day');
  const allCategories = getCategories();
  const allTopics = getTopics();
  const pack = getPackBySlug('st-patricks-day');

  const relatedCategories = allCategories.filter((c) =>
    CATEGORY_DATA.relatedCategories.includes(c.slug)
  );

  const topics = TOPIC_SLUGS
    .map((slug) => allTopics.find((t) => t.slug === slug))
    .filter((t): t is NonNullable<typeof t> => !!t);

  // Pick top-rated joke as featured
  const featuredJoke = [...jokes].sort((a, b) => b.rating - a.rating)[0];

  const breadcrumbItems = [
    { name: 'Home', url: 'https://jokelikeadad.com' },
    { name: 'Categories', url: 'https://jokelikeadad.com/categories' },
    { name: CATEGORY_DATA.name, url: 'https://jokelikeadad.com/st-patricks-day' },
  ];

  const categoryForSchema: Category = {
    ...CATEGORY_DATA,
    jokeCount: jokes.length,
  };

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
          __html: JSON.stringify(generateJokeListSchema(jokes, categoryForSchema)),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateFAQSchema(FAQS)) }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb
          items={[
            { label: 'Home', href: '/' },
            { label: 'Categories', href: '/categories' },
            { label: CATEGORY_DATA.name },
          ]}
        />

        {/* Holiday Header */}
        <div className="text-center mb-12">
          <span className="text-7xl block mb-4">☘️</span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl mb-4">
            St. Patrick&apos;s Day Dad Jokes
          </h1>
          <p className="text-text-secondary max-w-2xl mx-auto leading-relaxed mb-4">
            {CATEGORY_DATA.description}
          </p>
          <span className="text-xs font-medium text-accent bg-accent/10 px-3 py-1 rounded-full">
            {jokes.length} jokes
          </span>
        </div>

        {/* Featured Joke Hero */}
        {featuredJoke && (
          <div className="mb-12">
            <HeroJoke joke={featuredJoke} date="March 17" />
          </div>
        )}

        {/* Explore by Theme */}
        {topics.length > 0 && (
          <section className="mb-12">
            <h2 className="font-serif text-2xl sm:text-3xl mb-6">Explore by Theme</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {topics.map((topic) => (
                <Link
                  key={topic.slug}
                  href={`/topics/${topic.slug}`}
                  className="bg-surface border border-border rounded-xl p-5 hover:border-accent transition-colors text-center"
                >
                  <span className="text-3xl block mb-2">{topic.emoji}</span>
                  <span className="font-medium text-sm">{topic.name}</span>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Pack Preview */}
        {pack && (
          <section className="mb-12">
            <div className="bg-surface border border-border rounded-xl p-6 sm:p-8">
              <div className="flex items-start gap-4">
                <span className="text-4xl">☘️</span>
                <div className="flex-1">
                  <h2 className="font-serif text-2xl mb-2">{pack.name} Pack</h2>
                  <p className="text-text-secondary text-sm leading-relaxed mb-4">
                    {pack.description}
                  </p>
                  <Link
                    href="/packs/st-patricks-day"
                    className="inline-block bg-accent hover:bg-accent-hover text-white font-medium px-5 py-2.5 rounded-full transition-colors text-sm"
                  >
                    View the full pack
                  </Link>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* All Jokes */}
        <section className="mb-12">
          <h2 className="font-serif text-2xl sm:text-3xl mb-6">All St. Patrick&apos;s Day Dad Jokes</h2>
          <Suspense
            fallback={
              <div className="space-y-4">
                {jokes.map((joke, i) => (
                  <JokeCard key={joke.id} joke={joke} index={i + 1} />
                ))}
              </div>
            }
          >
            <JokeFilterBar jokes={jokes} />
          </Suspense>
        </section>

        {/* Related Holidays */}
        {relatedCategories.length > 0 && (
          <section className="mb-12">
            <h2 className="font-serif text-2xl mb-4">More Holiday Dad Jokes</h2>
            <div className="flex flex-wrap gap-3">
              {relatedCategories.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/${cat.slug}`}
                  className="flex items-center gap-2 bg-surface border border-border rounded-full px-4 py-2 hover:border-accent transition-colors"
                >
                  <span>{cat.emoji}</span>
                  <span className="text-sm font-medium">{cat.name}</span>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* FAQ Accordion */}
        <section className="mb-12">
          <h2 className="font-serif text-2xl mb-4">Frequently Asked Questions</h2>
          <FAQAccordion faqs={FAQS} />
        </section>
      </div>
    </>
  );
}
