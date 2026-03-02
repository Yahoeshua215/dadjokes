import { Metadata } from 'next';
import Link from 'next/link';
import { generateBreadcrumbSchema } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'Free Dad Jokes API — For Developers | DadJokes.directory',
  description:
    'Free REST API for dad jokes. Get random jokes, browse by category, and integrate dad humor into your apps. No API key required.',
  alternates: { canonical: 'https://dadjokes.directory/developers' },
  openGraph: {
    title: 'Free Dad Jokes API — For Developers',
    description:
      'Free REST API for dad jokes. No API key required. Perfect for apps, bots, and tutorials.',
    url: 'https://dadjokes.directory/developers',
  },
};

export default function DevelopersPage() {
  const breadcrumbItems = [
    { name: 'Home', url: 'https://dadjokes.directory' },
    { name: 'Developers', url: 'https://dadjokes.directory/developers' },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateBreadcrumbSchema(breadcrumbItems)) }}
      />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <nav className="text-sm text-text-secondary mb-6">
          <Link href="/" className="hover:text-accent transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <span>Developers</span>
        </nav>

        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl mb-4">
          Free Dad Jokes API
        </h1>
        <p className="text-lg text-text-secondary mb-8 leading-relaxed">
          A free, open REST API for dad jokes. No API key required. 2,000+ jokes across 20
          categories. Perfect for apps, Slack bots, CLI tools, tutorials, and README examples.
        </p>

        <div className="bg-surface border border-border rounded-xl p-6 mb-8">
          <p className="text-sm text-text-secondary mb-1">Base URL</p>
          <code className="text-lg font-mono text-accent">https://dadjokes.directory/api</code>
        </div>

        {/* Endpoints */}
        <section className="space-y-10 mb-12">

          {/* Random */}
          <div>
            <h2 className="font-serif text-2xl mb-3">Get a Random Joke</h2>
            <div className="bg-surface border border-border rounded-xl overflow-hidden">
              <div className="px-4 py-2 bg-background border-b border-border">
                <code className="text-sm"><span className="text-green-600 font-bold">GET</span> /api/random</code>
              </div>
              <div className="p-4">
                <p className="text-sm text-text-secondary mb-3">Returns a single random dad joke.</p>
                <p className="text-xs font-medium text-text-secondary mb-2">Example</p>
                <pre className="bg-background rounded-lg p-4 text-sm overflow-x-auto"><code>{`curl https://dadjokes.directory/api/random`}</code></pre>
                <p className="text-xs font-medium text-text-secondary mt-4 mb-2">Response</p>
                <pre className="bg-background rounded-lg p-4 text-sm overflow-x-auto"><code>{`{
  "id": "funny-042",
  "setup": "Why don't eggs tell jokes?",
  "punchline": "They'd crack each other up!",
  "category": "funny",
  "tags": ["food", "wordplay"]
}`}</code></pre>
              </div>
            </div>
          </div>

          {/* List jokes */}
          <div>
            <h2 className="font-serif text-2xl mb-3">List Jokes</h2>
            <div className="bg-surface border border-border rounded-xl overflow-hidden">
              <div className="px-4 py-2 bg-background border-b border-border">
                <code className="text-sm"><span className="text-green-600 font-bold">GET</span> /api/jokes</code>
              </div>
              <div className="p-4">
                <p className="text-sm text-text-secondary mb-3">Returns a paginated list of jokes. Supports filtering by category.</p>
                <p className="text-xs font-medium text-text-secondary mb-2">Parameters</p>
                <div className="space-y-2 mb-4">
                  <div className="flex gap-3 text-sm">
                    <code className="text-accent whitespace-nowrap">category</code>
                    <span className="text-text-secondary">Filter by category slug (e.g., <code>funny</code>, <code>science</code>)</span>
                  </div>
                  <div className="flex gap-3 text-sm">
                    <code className="text-accent whitespace-nowrap">limit</code>
                    <span className="text-text-secondary">Results per page, 1-100 (default: 20)</span>
                  </div>
                  <div className="flex gap-3 text-sm">
                    <code className="text-accent whitespace-nowrap">page</code>
                    <span className="text-text-secondary">Page number (default: 1)</span>
                  </div>
                </div>
                <p className="text-xs font-medium text-text-secondary mb-2">Example</p>
                <pre className="bg-background rounded-lg p-4 text-sm overflow-x-auto"><code>{`curl "https://dadjokes.directory/api/jokes?category=science&limit=5"`}</code></pre>
                <p className="text-xs font-medium text-text-secondary mt-4 mb-2">Response</p>
                <pre className="bg-background rounded-lg p-4 text-sm overflow-x-auto"><code>{`{
  "total": 100,
  "page": 1,
  "limit": 5,
  "jokes": [
    {
      "id": "science-001",
      "setup": "Why can't you trust an atom?",
      "punchline": "They make up literally everything.",
      "category": "science",
      "tags": ["chemistry", "wordplay"]
    },
    ...
  ]
}`}</code></pre>
              </div>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h2 className="font-serif text-2xl mb-3">List Categories</h2>
            <div className="bg-surface border border-border rounded-xl overflow-hidden">
              <div className="px-4 py-2 bg-background border-b border-border">
                <code className="text-sm"><span className="text-green-600 font-bold">GET</span> /api/categories</code>
              </div>
              <div className="p-4">
                <p className="text-sm text-text-secondary mb-3">Returns all available joke categories.</p>
                <p className="text-xs font-medium text-text-secondary mb-2">Example</p>
                <pre className="bg-background rounded-lg p-4 text-sm overflow-x-auto"><code>{`curl https://dadjokes.directory/api/categories`}</code></pre>
                <p className="text-xs font-medium text-text-secondary mt-4 mb-2">Response</p>
                <pre className="bg-background rounded-lg p-4 text-sm overflow-x-auto"><code>{`{
  "categories": [
    {
      "slug": "funny",
      "name": "Funny Dad Jokes",
      "emoji": "\ud83d\ude02",
      "description": "The funniest dad jokes...",
      "jokeCount": 100
    },
    ...
  ]
}`}</code></pre>
              </div>
            </div>
          </div>
        </section>

        {/* JavaScript example */}
        <section className="mb-12">
          <h2 className="font-serif text-2xl mb-3">Quick Start (JavaScript)</h2>
          <pre className="bg-surface border border-border rounded-xl p-4 text-sm overflow-x-auto"><code>{`// Get a random dad joke
const response = await fetch('https://dadjokes.directory/api/random');
const joke = await response.json();

console.log(joke.setup);
// "Why don't eggs tell jokes?"
console.log(joke.punchline);
// "They'd crack each other up!"`}</code></pre>
        </section>

        {/* Attribution */}
        <section className="bg-surface border border-border rounded-xl p-8 text-center">
          <h2 className="font-serif text-2xl mb-3">Using the API?</h2>
          <p className="text-text-secondary mb-4">
            The API is free to use. If you build something with it, we&apos;d love a link back
            to <strong className="text-foreground">dadjokes.directory</strong> in your project,
            README, or blog post.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/categories"
              className="inline-block border border-border font-medium px-6 py-3 rounded-full hover:border-accent hover:text-accent transition-colors"
            >
              Browse Jokes
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
