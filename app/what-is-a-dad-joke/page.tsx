import { Metadata } from 'next';
import Link from 'next/link';
import { generateFAQSchema, generateBreadcrumbSchema } from '@/lib/schema';
import { getJokesByCategory } from '@/lib/jokes';

export const metadata: Metadata = {
  title: 'What Is a Dad Joke? Origin, History & Why We Love Them | JokeLikeaDad.com',
  description:
    'What is a dad joke? Learn the origin, history, and characteristics of dad jokes — the wholesome, groan-worthy puns that dads everywhere are famous for.',
  alternates: { canonical: 'https://jokelikeadad.com/what-is-a-dad-joke' },
  openGraph: {
    title: 'What Is a Dad Joke? Origin, History & Why We Love Them',
    description:
      'Everything you need to know about dad jokes — what makes them unique, where they came from, and why they never get old.',
    url: 'https://jokelikeadad.com/what-is-a-dad-joke',
  },
};

const faqs = [
  {
    question: 'What is a dad joke?',
    answer:
      'A dad joke is a short, clean joke that typically features a pun or obvious punchline. They are wholesome, family-friendly, and intentionally corny — designed to produce groans rather than belly laughs. The humor comes from the simplicity and predictability of the punchline.',
  },
  {
    question: 'Where did the term "dad joke" come from?',
    answer:
      'The term "dad joke" first appeared in print in 1987 in a Gettysburg Times column by Jim Kalbaugh, who described them as jokes only a dad could love. The term became widely popular in the 2010s with social media, subreddits like r/dadjokes, and internet meme culture.',
  },
  {
    question: 'What makes a joke a dad joke?',
    answer:
      'A dad joke has three key traits: it uses a pun or play on words, it is clean and family-friendly, and it is intentionally cheesy or groan-worthy. The joke teller often finds it funnier than the audience does, which is part of the charm.',
  },
  {
    question: 'Why are dad jokes so bad?',
    answer:
      'Dad jokes are "bad" on purpose — that is what makes them good. The humor lies in how obvious or corny the punchline is. The groan from the audience is the real reward. Researchers suggest that dads use these jokes to bond with their kids by modeling that it is okay to fail at being funny.',
  },
  {
    question: 'When does a joke become a dad joke?',
    answer:
      'When the punchline becomes apparent. This is itself a classic dad joke — "apparent" sounds like "a parent." A joke becomes a dad joke when it relies on wholesome puns, is told with unearned confidence, and produces more groans than laughs.',
  },
  {
    question: 'Are dad jokes only told by dads?',
    answer:
      'No. Anyone can tell a dad joke. The name refers to the style of humor, not the person telling it. Dad jokes are told by moms, kids, coworkers, teachers, and comedians. The style is defined by the wholesome pun format, not by parenthood.',
  },
];

export default function WhatIsADadJokePage() {
  const exampleJokes = getJokesByCategory('best').slice(0, 3);

  const breadcrumbs = [
    { name: 'Home', url: 'https://jokelikeadad.com' },
    { name: 'What Is a Dad Joke?', url: 'https://jokelikeadad.com/what-is-a-dad-joke' },
  ];

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'What Is a Dad Joke? Origin, History & Why We Love Them',
    description:
      'A comprehensive guide to dad jokes — their definition, origin, history, characteristics, and cultural significance.',
    author: {
      '@type': 'Organization',
      name: 'JokeLikeaDad.com',
      url: 'https://jokelikeadad.com',
    },
    publisher: {
      '@type': 'Organization',
      name: 'JokeLikeaDad.com',
      url: 'https://jokelikeadad.com',
    },
    datePublished: '2026-03-01',
    dateModified: '2026-03-01',
    mainEntityOfPage: 'https://jokelikeadad.com/what-is-a-dad-joke',
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateFAQSchema(faqs)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateBreadcrumbSchema(breadcrumbs)) }}
      />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="text-sm text-text-secondary mb-6">
          <Link href="/" className="hover:text-accent transition-colors">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span>What Is a Dad Joke?</span>
        </nav>

        <article>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl mb-6">
            What Is a Dad Joke?
          </h1>

          <p className="text-lg text-text-secondary mb-8 leading-relaxed">
            A dad joke is a short, wholesome joke — usually a pun — that&apos;s so corny it
            circles back around to being funny. They&apos;re the signature humor of fathers
            everywhere: clean, predictable, and delivered with unearned confidence.
          </p>

          {/* Table of Contents */}
          <div className="bg-surface border border-border rounded-xl p-6 mb-10">
            <h2 className="font-serif text-lg mb-3">In this article</h2>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#definition" className="text-accent hover:text-accent-hover transition-colors">
                  Definition & Key Characteristics
                </a>
              </li>
              <li>
                <a href="#origin" className="text-accent hover:text-accent-hover transition-colors">
                  Origin & History
                </a>
              </li>
              <li>
                <a href="#why-bad" className="text-accent hover:text-accent-hover transition-colors">
                  Why Are Dad Jokes So Bad?
                </a>
              </li>
              <li>
                <a href="#psychology" className="text-accent hover:text-accent-hover transition-colors">
                  The Psychology Behind Dad Jokes
                </a>
              </li>
              <li>
                <a href="#examples" className="text-accent hover:text-accent-hover transition-colors">
                  Classic Examples
                </a>
              </li>
              <li>
                <a href="#when-becomes" className="text-accent hover:text-accent-hover transition-colors">
                  When Does a Joke Become a Dad Joke?
                </a>
              </li>
              <li>
                <a href="#faq" className="text-accent hover:text-accent-hover transition-colors">
                  Frequently Asked Questions
                </a>
              </li>
            </ul>
          </div>

          {/* Definition */}
          <section id="definition" className="mb-12">
            <h2 className="font-serif text-2xl sm:text-3xl mb-4">
              Definition & Key Characteristics
            </h2>
            <p className="text-text-secondary leading-relaxed mb-4">
              A dad joke is a brief, family-friendly joke built around a pun or simple wordplay.
              The punchline is intentionally obvious — that&apos;s the point. Unlike stand-up
              comedy or observational humor, dad jokes don&apos;t try to be clever. They aim to be
              so unfunny that the reaction itself becomes the joke.
            </p>
            <div className="bg-surface border border-border rounded-xl p-6">
              <h3 className="font-serif text-lg mb-3">The anatomy of a dad joke:</h3>
              <ul className="space-y-2 text-text-secondary">
                <li className="flex items-start gap-2">
                  <span className="text-accent font-bold mt-0.5">1.</span>
                  <span><strong className="text-foreground">Pun-based:</strong> Nearly always relies on a play on words, double meaning, or homophone.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent font-bold mt-0.5">2.</span>
                  <span><strong className="text-foreground">Clean:</strong> Always family-friendly. No profanity, no adult content. Safe for all ages.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent font-bold mt-0.5">3.</span>
                  <span><strong className="text-foreground">Short:</strong> Setup and punchline — two sentences max. No long stories.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent font-bold mt-0.5">4.</span>
                  <span><strong className="text-foreground">Groan-worthy:</strong> Designed to produce eye rolls, not applause. The groan is the goal.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent font-bold mt-0.5">5.</span>
                  <span><strong className="text-foreground">Delivered with confidence:</strong> Told as if it&apos;s the funniest thing ever said, regardless of audience reaction.</span>
                </li>
              </ul>
            </div>
          </section>

          {/* Origin & History */}
          <section id="origin" className="mb-12">
            <h2 className="font-serif text-2xl sm:text-3xl mb-4">Origin & History</h2>
            <p className="text-text-secondary leading-relaxed mb-4">
              Pun-based humor has existed for centuries — Shakespeare was a prolific punster, and
              wordplay appears in ancient Greek and Roman writing. But the specific term
              &quot;dad joke&quot; is relatively modern.
            </p>
            <p className="text-text-secondary leading-relaxed mb-4">
              The earliest known use of &quot;dad joke&quot; in print dates to <strong className="text-foreground">1987</strong>,
              in a humor column in the Gettysburg Times by Jim Kalbaugh. He described dad jokes
              as the kind of groan-worthy puns that only a father could love — and would insist on
              telling anyway.
            </p>
            <p className="text-text-secondary leading-relaxed mb-4">
              The term didn&apos;t gain mainstream popularity until the <strong className="text-foreground">2010s</strong>,
              when social media gave dad jokes their moment. The subreddit
              r/dadjokes (founded 2013) became one of Reddit&apos;s most popular communities, and
              Twitter accounts dedicated to dad humor amassed millions of followers. By 2019,
              Merriam-Webster officially added &quot;dad joke&quot; to the dictionary.
            </p>
            <div className="bg-surface border border-border rounded-xl p-6">
              <h3 className="font-serif text-lg mb-3">Timeline</h3>
              <div className="space-y-3 text-sm text-text-secondary">
                <div className="flex gap-4">
                  <span className="font-bold text-accent whitespace-nowrap">1987</span>
                  <span>First known use of &quot;dad joke&quot; in print (Gettysburg Times)</span>
                </div>
                <div className="flex gap-4">
                  <span className="font-bold text-accent whitespace-nowrap">2013</span>
                  <span>r/dadjokes subreddit created — now 10M+ members</span>
                </div>
                <div className="flex gap-4">
                  <span className="font-bold text-accent whitespace-nowrap">2019</span>
                  <span>Merriam-Webster adds &quot;dad joke&quot; to the dictionary</span>
                </div>
                <div className="flex gap-4">
                  <span className="font-bold text-accent whitespace-nowrap">2020s</span>
                  <span>Dad jokes become a global social media genre with billions of views on TikTok</span>
                </div>
              </div>
            </div>
          </section>

          {/* Why Are They So Bad? */}
          <section id="why-bad" className="mb-12">
            <h2 className="font-serif text-2xl sm:text-3xl mb-4">
              Why Are Dad Jokes So Bad?
            </h2>
            <p className="text-text-secondary leading-relaxed mb-4">
              Dad jokes are bad on purpose. The corniness is a feature, not a bug. The humor
              comes from the gap between how funny the joke teller thinks it is and how the
              audience reacts. A dad joke only truly works when it produces a groan — the bigger
              the groan, the better the joke.
            </p>
            <p className="text-text-secondary leading-relaxed">
              This is what separates dad jokes from simply bad comedy. A bad comedian wants laughs
              and doesn&apos;t get them. A dad wants groans and gets exactly what he&apos;s after.
              The &quot;failure&quot; is the success. It&apos;s anti-humor — and it&apos;s been
              making families simultaneously cringe and smile for generations.
            </p>
          </section>

          {/* Psychology */}
          <section id="psychology" className="mb-12">
            <h2 className="font-serif text-2xl sm:text-3xl mb-4">
              The Psychology Behind Dad Jokes
            </h2>
            <p className="text-text-secondary leading-relaxed mb-4">
              Researchers have found that dad jokes serve a real social purpose. A 2023 study in
              the British Psychological Society&apos;s journal suggests that fathers use
              intentionally bad humor as a form of bonding. By telling jokes that are embarrassing
              and unfunny, dads model an important lesson: it&apos;s okay to fail, to be
              uncool, and to not take yourself too seriously.
            </p>
            <p className="text-text-secondary leading-relaxed mb-4">
              Dad jokes also create a low-stakes social interaction. Unlike sharp wit or sarcasm,
              a dad joke can&apos;t hurt anyone. It&apos;s weaponized wholesomeness — a safe way
              to get a reaction without any risk. That&apos;s why dad jokes work in almost any
              social setting: the office, the dinner table, the school drop-off line.
            </p>
            <p className="text-text-secondary leading-relaxed">
              There&apos;s also the element of repetition. Dads are notorious for telling the same
              jokes over and over. This isn&apos;t forgetfulness — it&apos;s tradition. The
              familiarity of a well-worn dad joke becomes comforting, like a family ritual.
            </p>
          </section>

          {/* Examples */}
          <section id="examples" className="mb-12">
            <h2 className="font-serif text-2xl sm:text-3xl mb-4">Classic Dad Joke Examples</h2>
            <p className="text-text-secondary leading-relaxed mb-6">
              Here are a few classic examples that capture the spirit of the dad joke:
            </p>
            <div className="space-y-4">
              {exampleJokes.map((joke) => (
                <Link
                  key={joke.id}
                  href={`/joke/${joke.slug}`}
                  className="block bg-surface border border-border rounded-xl p-6 hover:border-accent transition-colors"
                >
                  <p className="font-joke text-lg">{joke.setup}</p>
                  <p className="mt-2 font-medium text-text-secondary">{joke.punchline}</p>
                </Link>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/best"
                className="text-sm text-accent hover:text-accent-hover font-medium transition-colors"
              >
                Browse the best dad jokes →
              </Link>
              <Link
                href="/funny"
                className="text-sm text-accent hover:text-accent-hover font-medium transition-colors"
              >
                Browse funny dad jokes →
              </Link>
              <Link
                href="/categories"
                className="text-sm text-accent hover:text-accent-hover font-medium transition-colors"
              >
                Browse all categories →
              </Link>
            </div>
          </section>

          {/* When Does a Joke Become a Dad Joke */}
          <section id="when-becomes" className="mb-12">
            <h2 className="font-serif text-2xl sm:text-3xl mb-4">
              When Does a Joke Become a Dad Joke?
            </h2>
            <div className="bg-surface border border-border rounded-xl p-6 mb-4">
              <p className="font-joke text-xl text-center">
                When the punchline becomes <em>apparent</em>.
              </p>
            </div>
            <p className="text-text-secondary leading-relaxed">
              This is perhaps the most famous meta-dad-joke ever told. &quot;Apparent&quot; sounds
              like &quot;a parent&quot; — and that double meaning is exactly what makes it a
              perfect dad joke. It&apos;s also a genuinely useful answer: a joke becomes a dad
              joke when the punchline is so predictable, so wholesome, and so pun-driven that
              you can&apos;t help but groan. If someone who heard it would say &quot;that&apos;s
              terrible&quot; while fighting a smile, it&apos;s a dad joke.
            </p>
          </section>

          {/* FAQ */}
          <section id="faq" className="mb-12">
            <h2 className="font-serif text-2xl sm:text-3xl mb-6">
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              {faqs.map((faq) => (
                <div key={faq.question} className="bg-surface border border-border rounded-xl p-6">
                  <h3 className="font-serif text-lg mb-2">{faq.question}</h3>
                  <p className="text-text-secondary leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section className="bg-surface border border-border rounded-xl p-8 text-center">
            <h2 className="font-serif text-2xl mb-3">Ready to browse some dad jokes?</h2>
            <p className="text-text-secondary mb-6">
              We&apos;ve got 2,000+ dad jokes across 20 categories. Find your next groan.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/categories"
                className="inline-block bg-accent text-white font-medium px-6 py-3 rounded-full hover:bg-accent-hover transition-colors"
              >
                Browse All Categories
              </Link>
              <Link
                href="/joke-of-the-day"
                className="inline-block border border-border font-medium px-6 py-3 rounded-full hover:border-accent hover:text-accent transition-colors"
              >
                Joke of the Day
              </Link>
            </div>
          </section>
        </article>
      </div>
    </>
  );
}
