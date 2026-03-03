import Link from 'next/link';
import { Metadata } from 'next';
import { getCategories, getJokesByCategory, getTopics, getJokesByTags } from '@/lib/jokes';
import { generateBreadcrumbSchema } from '@/lib/schema';
import Breadcrumb from '@/components/Breadcrumb';

export const metadata: Metadata = {
  title: 'Browse Dad Jokes — Joke Like a Dad',
  description:
    'Browse 2,000+ dad jokes by style, subject, or occasion. Find jokes for teachers, kids, birthdays, engineers, and more.',
  alternates: { canonical: 'https://jokelikeadad.com/browse' },
  openGraph: {
    title: 'Browse Dad Jokes — Joke Like a Dad',
    description: 'Browse 2,000+ dad jokes by style, subject, or occasion.',
    url: 'https://jokelikeadad.com/browse',
  },
};

const SUBJECT_GROUPS: { label: string; slugs: string[] }[] = [
  {
    label: 'Food & Drink',
    slugs: ['coffee', 'cheese', 'pizza', 'pasta', 'fruit', 'vegetables', 'cooking', 'breakfast'],
  },
  {
    label: 'Animals',
    slugs: ['dinosaurs', 'dogs', 'cats', 'fish', 'bears', 'birds', 'cows', 'horses', 'ocean'],
  },
  {
    label: 'Sports',
    slugs: ['golf', 'football', 'baseball', 'basketball', 'soccer', 'tennis'],
  },
  {
    label: 'Science & Math',
    slugs: ['space', 'chemistry', 'physics', 'biology', 'weather', 'math-topic', 'geometry', 'algebra'],
  },
  {
    label: 'Work & Tech',
    slugs: ['office', 'programming', 'money', 'shopping'],
  },
  {
    label: 'School & Learning',
    slugs: ['school', 'books', 'history', 'geography', 'art'],
  },
  {
    label: 'Lifestyle',
    slugs: ['cars', 'music', 'fashion', 'travel', 'camping', 'fishing', 'nature', 'gardening', 'farming', 'sleep'],
  },
  {
    label: 'Family',
    slugs: ['marriage', 'parenting'],
  },
  {
    label: 'Health',
    slugs: ['doctor', 'dentist', 'anatomy'],
  },
  {
    label: 'Seasonal',
    slugs: [
      'ghosts', 'vampires', 'skeletons', 'witches', 'zombies', 'pumpkins',
      'santa', 'elves', 'reindeer', 'snowman', 'turkey', 'pirates', 'robots',
      'leprechaun', 'shamrock', 'irish', 'pot-of-gold', 'lucky', 'beer',
    ],
  },
];

const OCCASION_GROUPS: { label: string; slugs: string[] }[] = [
  {
    label: 'For Professionals',
    slugs: [
      'teacher-jokes', 'nurse-jokes', 'engineer-jokes',
      'accountant-jokes', 'doctor-jokes', 'programmer-jokes', 'lawyer-jokes',
    ],
  },
  {
    label: 'For Occasions',
    slugs: [
      'birthday-card-jokes', 'wedding-speech-jokes',
      'morning-announcement-jokes', 'lunchbox-notes', 'sales-meeting-jokes',
    ],
  },
  {
    label: 'By Age Group',
    slugs: [
      'jokes-for-4-year-olds', 'jokes-for-5-year-olds',
      'jokes-for-kindergarteners', 'jokes-for-middle-schoolers', 'jokes-for-teens',
    ],
  },
];

export default function BrowsePage() {
  const categories = getCategories();
  const allTopics = getTopics();
  const topicMap = new Map(allTopics.map((t) => [t.slug, t]));

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://jokelikeadad.com' },
    { name: 'Browse', url: 'https://jokelikeadad.com/browse' },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Browse' }]} />

        <div className="mb-10">
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl mb-3">Browse Dad Jokes</h1>
          <p className="text-text-secondary max-w-2xl leading-relaxed">
            2,000+ dad jokes organized by style, subject, and occasion. Find exactly the joke you need.
          </p>
        </div>

        {/* By Style */}
        <section className="mb-12">
          <h2 className="font-serif text-2xl sm:text-3xl mb-1">By Style</h2>
          <p className="text-text-secondary text-sm mb-5">Browse by tone — funny, corny, clean, dirty, and more.</p>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/${cat.slug}`}
                className="flex items-center gap-1.5 bg-surface border border-border rounded-full px-4 py-2 hover:border-accent transition-colors"
              >
                <span>{cat.emoji}</span>
                <span className="text-sm font-medium">{cat.name}</span>
              </Link>
            ))}
          </div>
        </section>

        {/* By Subject */}
        <section className="mb-12">
          <h2 className="font-serif text-2xl sm:text-3xl mb-1">By Subject</h2>
          <p className="text-text-secondary text-sm mb-5">Looking for jokes about something specific? Browse by topic.</p>
          {SUBJECT_GROUPS.map((group) => {
            const topics = group.slugs
              .map((s) => topicMap.get(s))
              .filter((t): t is NonNullable<typeof t> => !!t);
            if (topics.length === 0) return null;
            return (
              <div key={group.label} className="mb-6">
                <h3 className="text-sm font-semibold text-text-secondary uppercase tracking-wide mb-3">
                  {group.label}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {topics.map((topic) => (
                    <Link
                      key={topic.slug}
                      href={`/topics/${topic.slug}`}
                      className="flex items-center gap-1.5 bg-surface border border-border rounded-full px-4 py-2 hover:border-accent transition-colors"
                    >
                      <span>{topic.emoji}</span>
                      <span className="text-sm font-medium">{topic.name}</span>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </section>

        {/* For Specific People & Occasions */}
        <section className="mb-12">
          <h2 className="font-serif text-2xl sm:text-3xl mb-1">For Specific People & Occasions</h2>
          <p className="text-text-secondary text-sm mb-5">
            Need the perfect joke for a teacher, a birthday card, or a 5-year-old? You&apos;re in the right place.
          </p>
          {OCCASION_GROUPS.map((group) => {
            const topics = group.slugs
              .map((s) => topicMap.get(s))
              .filter((t): t is NonNullable<typeof t> => !!t);
            if (topics.length === 0) return null;
            return (
              <div key={group.label} className="mb-6">
                <h3 className="text-sm font-semibold text-text-secondary uppercase tracking-wide mb-3">
                  {group.label}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {topics.map((topic) => (
                    <Link
                      key={topic.slug}
                      href={`/topics/${topic.slug}`}
                      className="flex items-center gap-1.5 bg-surface border border-border rounded-full px-4 py-2 hover:border-accent transition-colors"
                    >
                      <span>{topic.emoji}</span>
                      <span className="text-sm font-medium">{topic.name}</span>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </section>
      </div>
    </>
  );
}
