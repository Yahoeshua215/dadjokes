import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getCategory, getCategorySlugs, getJokesByCategory, getCategories, getTopics } from '@/lib/jokes';
import { generateBreadcrumbSchema, generateJokeListSchema, generateFAQSchema } from '@/lib/schema';
import JokeCard from '@/components/JokeCard';
import Breadcrumb from '@/components/Breadcrumb';
import FAQAccordion from '@/components/FAQAccordion';
import JokeFilterBar from '@/components/JokeFilterBar';
import Link from 'next/link';
import { Suspense } from 'react';

interface Props {
  params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
  return getCategorySlugs().map((slug) => ({ category: slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category: slug } = await params;
  const category = getCategory(slug);
  if (!category) return {};
  return {
    title: category.metaTitle,
    description: category.metaDescription,
    alternates: { canonical: `https://jokelikeadad.com/${slug}` },
    openGraph: {
      title: category.metaTitle,
      description: category.metaDescription,
      url: `https://jokelikeadad.com/${slug}`,
    },
  };
}

function getFAQs(categoryName: string, slug: string) {
  return [
    {
      question: `What are ${categoryName.toLowerCase()}?`,
      answer: `${categoryName} are a specific style of dad jokes known for their ${slug === 'corny' ? 'cheesy puns and wordplay' : slug === 'bad' ? 'groan-inducing punchlines that are so bad they loop back around to being funny' : slug === 'dirty' ? 'clever double meanings and innuendo that fly over kids\' heads' : 'unique humor style'}. They follow the classic setup-punchline format that dads everywhere have perfected.`,
    },
    {
      question: `Are these ${categoryName.toLowerCase()} appropriate for all ages?`,
      answer: slug === 'for-kids' || slug === 'clean'
        ? 'Yes! Every joke in this collection is family-friendly and safe for all ages.'
        : slug === 'dirty' || slug === 'for-adults'
        ? 'These jokes are geared toward adults and may contain innuendo or mature themes, but nothing vulgar.'
        : `Most jokes in this collection are family-friendly, though some may be better appreciated by older audiences.`,
    },
    {
      question: `How many ${categoryName.toLowerCase()} do you have?`,
      answer: `We currently have 100+ handpicked ${categoryName.toLowerCase()} in our collection, and we're always adding more. Each joke is curated for quality — no filler.`,
    },
    {
      question: `Where can I find more ${categoryName.toLowerCase().replace(' dad jokes', '')} dad jokes?`,
      answer: `Browse our full collection at JokeLikeaDad.com! We have 2,000+ dad jokes across 20 categories, and we're always adding more.`,
    },
  ];
}

export default async function CategoryPage({ params }: Props) {
  const { category: slug } = await params;
  const category = getCategory(slug);
  if (!category) notFound();

  const jokes = getJokesByCategory(slug);
  const allCategories = getCategories();
  const relatedCategories = allCategories.filter((c) =>
    category.relatedCategories.includes(c.slug)
  );
  const faqs = getFAQs(category.name, slug);

  // Find related topics whose tags overlap with jokes in this category
  const categoryJokeTags = new Set(jokes.flatMap(j => j.tags));
  const relatedTopics = getTopics()
    .filter(t => t.tags.some(tag => categoryJokeTags.has(tag)))
    .slice(0, 8);

  const breadcrumbItems = [
    { name: 'Home', url: 'https://jokelikeadad.com' },
    { name: 'Categories', url: 'https://jokelikeadad.com/categories' },
    { name: category.name, url: `https://jokelikeadad.com/${slug}` },
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
          __html: JSON.stringify(generateJokeListSchema(jokes, category)),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateFAQSchema(faqs)) }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb
          items={[
            { label: 'Home', href: '/' },
            { label: 'Categories', href: '/categories' },
            { label: category.name },
          ]}
        />

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-4xl">{category.emoji}</span>
            <h1 className="font-serif text-3xl sm:text-4xl">
              25+ {category.name} That&apos;ll Make You Groan
            </h1>
          </div>
          <p className="text-text-secondary leading-relaxed max-w-2xl">
            {category.description}
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

        {/* Related Categories */}
        {relatedCategories.length > 0 && (
          <section className="mb-12">
            <h2 className="font-serif text-2xl mb-4">You might also like</h2>
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

        {/* Related Topics */}
        {relatedTopics.length > 0 && (
          <section className="mb-12">
            <h2 className="font-serif text-2xl mb-4">Explore by Topic</h2>
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

        {/* FAQ */}
        <section className="mb-12">
          <h2 className="font-serif text-2xl mb-4">Frequently Asked Questions</h2>
          <FAQAccordion faqs={faqs} />
        </section>
      </div>
    </>
  );
}
