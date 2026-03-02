import { Metadata } from 'next';
import Link from 'next/link';
import { getPacks, getJokesForPack } from '@/lib/jokes';
import { generateBreadcrumbSchema } from '@/lib/schema';
import Breadcrumb from '@/components/Breadcrumb';

export const metadata: Metadata = {
  title: 'Dad Joke Packs — Jokes for Every Occasion | Joke Like a Dad',
  description: 'Curated dad joke packs for every occasion. Father\'s Day jokes, wedding speech one-liners, lunchbox notes for kids, birthday card puns, and office-friendly humor.',
  alternates: { canonical: 'https://jokelikeadad.com/packs' },
  openGraph: {
    title: 'Dad Joke Packs — Jokes for Every Occasion | Joke Like a Dad',
    description: 'Curated dad joke packs for every occasion. Father\'s Day jokes, wedding speech one-liners, lunchbox notes for kids, and more.',
    url: 'https://jokelikeadad.com/packs',
  },
};

export default function PacksPage() {
  const packs = getPacks();

  const breadcrumbSchemaItems = [
    { name: 'Home', url: 'https://jokelikeadad.com' },
    { name: 'Joke Packs', url: 'https://jokelikeadad.com/packs' },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateBreadcrumbSchema(breadcrumbSchemaItems)),
        }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb
          items={[
            { label: 'Home', href: '/' },
            { label: 'Joke Packs' },
          ]}
        />

        <div className="mb-8">
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl mb-3">
            Dad Joke Packs
          </h1>
          <p className="text-text-secondary max-w-2xl leading-relaxed">
            Curated collections of dad jokes for specific occasions. Whether you&apos;re writing a card, giving a toast, or packing a lunchbox, we&apos;ve got the perfect jokes ready to go.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {packs.map((pack) => {
            const jokeCount = getJokesForPack(pack).length;
            return (
              <Link
                key={pack.slug}
                href={`/packs/${pack.slug}`}
                className="flex flex-col bg-surface border border-border rounded-xl p-5 hover:border-accent transition-colors"
              >
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-3xl">{pack.emoji}</span>
                  <h2 className="font-serif text-lg font-medium">{pack.name}</h2>
                </div>
                <p className="text-sm text-text-secondary leading-relaxed mb-3 flex-1">
                  {pack.description}
                </p>
                <span className="text-xs font-medium text-accent bg-accent/10 px-3 py-1 rounded-full self-start">
                  {jokeCount} jokes
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}
