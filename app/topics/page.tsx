import { Metadata } from 'next';
import Link from 'next/link';
import { getTopics, getJokesByTags } from '@/lib/jokes';
import { generateBreadcrumbSchema } from '@/lib/schema';
import Breadcrumb from '@/components/Breadcrumb';

export const metadata: Metadata = {
  title: 'Browse Dad Jokes by Topic — Joke Like a Dad',
  description: 'Browse dad jokes by specific topic. Find jokes about coffee, dinosaurs, golf, space, and 50+ more topics. The most searchable dad joke collection on the internet.',
  alternates: { canonical: 'https://jokelikeadad.com/topics' },
  openGraph: {
    title: 'Browse Dad Jokes by Topic — Joke Like a Dad',
    description: 'Browse dad jokes by specific topic. Find jokes about coffee, dinosaurs, golf, space, and 50+ more topics.',
    url: 'https://jokelikeadad.com/topics',
  },
};

const TOPIC_GROUPS: { label: string; slugs: string[] }[] = [
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
    label: 'Halloween',
    slugs: ['ghosts', 'vampires', 'skeletons', 'witches', 'zombies', 'pumpkins'],
  },
  {
    label: 'Christmas',
    slugs: ['santa', 'elves', 'reindeer', 'snowman'],
  },
  {
    label: 'Thanksgiving',
    slugs: ['turkey'],
  },
  {
    label: 'Fun & Adventure',
    slugs: ['pirates', 'robots'],
  },
  {
    label: 'For Professionals',
    slugs: ['teacher-jokes', 'nurse-jokes', 'engineer-jokes', 'accountant-jokes', 'doctor-jokes', 'programmer-jokes', 'lawyer-jokes'],
  },
  {
    label: 'For Specific Occasions',
    slugs: ['birthday-card-jokes', 'wedding-speech-jokes', 'morning-announcement-jokes', 'lunchbox-notes', 'sales-meeting-jokes'],
  },
  {
    label: 'By Age Group',
    slugs: ['jokes-for-4-year-olds', 'jokes-for-5-year-olds', 'jokes-for-kindergarteners', 'jokes-for-middle-schoolers', 'jokes-for-teens'],
  },
];

export default function TopicsPage() {
  const allTopics = getTopics();
  const topicMap = new Map(allTopics.map(t => [t.slug, t]));

  const breadcrumbSchemaItems = [
    { name: 'Home', url: 'https://jokelikeadad.com' },
    { name: 'Topics', url: 'https://jokelikeadad.com/topics' },
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
            { label: 'Topics' },
          ]}
        />

        <div className="mb-8">
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl mb-3">
            Browse Dad Jokes by Topic
          </h1>
          <p className="text-text-secondary max-w-2xl leading-relaxed">
            Looking for dad jokes about something specific? We&apos;ve organized our collection into {allTopics.length}+ topics so you can find exactly the jokes you need.
          </p>
        </div>

        {TOPIC_GROUPS.map((group) => {
          const topics = group.slugs
            .map(s => topicMap.get(s))
            .filter((t): t is NonNullable<typeof t> => !!t);

          if (topics.length === 0) return null;

          return (
            <section key={group.label} className="mb-10">
              <h2 className="font-serif text-xl sm:text-2xl mb-4">{group.label}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {topics.map((topic) => {
                  const jokeCount = getJokesByTags(topic.tags).length;
                  return (
                    <Link
                      key={topic.slug}
                      href={`/topics/${topic.slug}`}
                      className="flex items-center gap-3 bg-surface border border-border rounded-xl px-4 py-3 hover:border-accent transition-colors"
                    >
                      <span className="text-2xl">{topic.emoji}</span>
                      <div className="min-w-0">
                        <p className="font-medium text-sm truncate">{topic.name}</p>
                        <p className="text-xs text-text-secondary">{jokeCount} jokes</p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>
    </>
  );
}
