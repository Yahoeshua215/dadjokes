import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getPackBySlug, getPackSlugs, getJokesForPack, getPacks } from '@/lib/jokes';
import { generateBreadcrumbSchema, generatePackListSchema, generateFAQSchema } from '@/lib/schema';
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
  return getPackSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const pack = getPackBySlug(slug);
  if (!pack) return {};
  return {
    title: pack.metaTitle,
    description: pack.metaDescription,
    alternates: { canonical: `https://jokelikeadad.com/packs/${slug}` },
    openGraph: {
      title: pack.metaTitle,
      description: pack.metaDescription,
      url: `https://jokelikeadad.com/packs/${slug}`,
    },
  };
}

export default async function PackPage({ params }: Props) {
  const { slug } = await params;
  const pack = getPackBySlug(slug);
  if (!pack) notFound();

  const jokes = getJokesForPack(pack);
  const allPacks = getPacks();

  const relatedPacks = allPacks.filter((p) =>
    pack.relatedPacks.includes(p.slug)
  );

  const breadcrumbItems = [
    { name: 'Home', url: 'https://jokelikeadad.com' },
    { name: 'Joke Packs', url: 'https://jokelikeadad.com/packs' },
    { name: pack.name, url: `https://jokelikeadad.com/packs/${slug}` },
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
          __html: JSON.stringify(generatePackListSchema(jokes, pack)),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateFAQSchema(pack.faqs)) }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb
          items={[
            { label: 'Home', href: '/' },
            { label: 'Joke Packs', href: '/packs' },
            { label: pack.name },
          ]}
        />

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-4xl">{pack.emoji}</span>
            <h1 className="font-serif text-3xl sm:text-4xl">
              {pack.name}
            </h1>
          </div>
          <p className="text-text-secondary leading-relaxed max-w-2xl">
            {pack.description}
          </p>
          <div className="mt-3">
            <span className="text-xs font-medium text-accent bg-accent/10 px-3 py-1 rounded-full">
              {jokes.length} jokes
            </span>
          </div>
        </div>

        {/* Joke List */}
        <div className="print:block">
          <Suspense fallback={
            <div className="space-y-4 mb-12">
              {jokes.map((joke, i) => (
                <JokeCard key={joke.id} joke={joke} index={i + 1} />
              ))}
            </div>
          }>
            <JokeFilterBar jokes={jokes} />
          </Suspense>
        </div>

        {/* Related Packs */}
        {relatedPacks.length > 0 && (
          <section className="mb-12">
            <h2 className="font-serif text-2xl mb-4">Related Joke Packs</h2>
            <div className="flex flex-wrap gap-3">
              {relatedPacks.map((p) => (
                <Link
                  key={p.slug}
                  href={`/packs/${p.slug}`}
                  className="flex items-center gap-2 bg-surface border border-border rounded-full px-4 py-2 hover:border-accent transition-colors"
                >
                  <span>{p.emoji}</span>
                  <span className="text-sm font-medium">{p.name}</span>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* FAQ */}
        <section className="mb-12">
          <h2 className="font-serif text-2xl mb-4">Frequently Asked Questions</h2>
          <FAQAccordion faqs={pack.faqs} />
        </section>
      </div>
    </>
  );
}
