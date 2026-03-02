import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getTopicBySlug, getTopicSlugs, getJokesByTags, getTopics, getCategories } from '@/lib/jokes';
import { generateBreadcrumbSchema, generateTopicListSchema, generateFAQSchema } from '@/lib/schema';
import JokeCard from '@/components/JokeCard';
import Breadcrumb from '@/components/Breadcrumb';
import FAQAccordion from '@/components/FAQAccordion';
import JokeFilterBar from '@/components/JokeFilterBar';
import Link from 'next/link';
import { Suspense } from 'react';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getTopicSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const topic = getTopicBySlug(slug);
  if (!topic) return {};
  return {
    title: topic.metaTitle,
    description: topic.metaDescription,
    alternates: { canonical: `https://jokelikeadad.com/topics/${slug}` },
    openGraph: {
      title: topic.metaTitle,
      description: topic.metaDescription,
      url: `https://jokelikeadad.com/topics/${slug}`,
    },
  };
}

export default async function TopicPage({ params }: Props) {
  const { slug } = await params;
  const topic = getTopicBySlug(slug);
  if (!topic) notFound();

  const jokes = getJokesByTags(topic.tags);
  const allTopics = getTopics();
  const allCategories = getCategories();

  const relatedTopics = allTopics.filter((t) =>
    topic.relatedTopics.includes(t.slug)
  );
  const relatedCategories = allCategories.filter((c) =>
    topic.relatedCategories.includes(c.slug)
  );

  const breadcrumbItems = [
    { name: 'Home', url: 'https://jokelikeadad.com' },
    { name: 'Topics', url: 'https://jokelikeadad.com/topics' },
    { name: topic.name, url: `https://jokelikeadad.com/topics/${slug}` },
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
          __html: JSON.stringify(generateTopicListSchema(jokes, topic)),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateFAQSchema(topic.faqs)) }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb
          items={[
            { label: 'Home', href: '/' },
            { label: 'Topics', href: '/topics' },
            { label: topic.name },
          ]}
        />

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-4xl">{topic.emoji}</span>
            <h1 className="font-serif text-3xl sm:text-4xl">
              {topic.name}
            </h1>
          </div>
          <p className="text-text-secondary leading-relaxed max-w-2xl">
            {topic.description}
          </p>
          <div className="mt-3">
            <span className="text-xs font-medium text-accent bg-accent/10 px-3 py-1 rounded-full">
              {jokes.length} jokes
            </span>
          </div>
        </div>

        {/* Joke List */}
        <Suspense fallback={
          <div className="space-y-4 mb-12">
            {jokes.map((joke, i) => (
              <JokeCard key={joke.id} joke={joke} index={i + 1} />
            ))}
          </div>
        }>
          <JokeFilterBar jokes={jokes} />
        </Suspense>

        {/* Related Topics */}
        {relatedTopics.length > 0 && (
          <section className="mb-12">
            <h2 className="font-serif text-2xl mb-4">Related Topics</h2>
            <div className="flex flex-wrap gap-3">
              {relatedTopics.map((t) => (
                <Link
                  key={t.slug}
                  href={`/topics/${t.slug}`}
                  className="flex items-center gap-2 bg-surface border border-border rounded-full px-4 py-2 hover:border-accent transition-colors"
                >
                  <span>{t.emoji}</span>
                  <span className="text-sm font-medium">{t.name}</span>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Related Categories */}
        {relatedCategories.length > 0 && (
          <section className="mb-12">
            <h2 className="font-serif text-2xl mb-4">Browse Full Categories</h2>
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

        {/* FAQ */}
        <section className="mb-12">
          <h2 className="font-serif text-2xl mb-4">Frequently Asked Questions</h2>
          <FAQAccordion faqs={topic.faqs} />
        </section>
      </div>
    </>
  );
}
