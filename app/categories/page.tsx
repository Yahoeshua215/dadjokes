import { Metadata } from 'next';
import { getCategories, getJokesByCategory } from '@/lib/jokes';
import CategoryCard from '@/components/CategoryCard';

export const metadata: Metadata = {
  title: 'All Dad Joke Categories | DadJokes.directory',
  description:
    'Browse all dad joke categories. From funny to corny, clean to dirty — find the perfect dad jokes for any occasion.',
  alternates: { canonical: 'https://dadjokes.directory/categories' },
};

export default function CategoriesPage() {
  const categories = getCategories();

  const categoriesWithPreviews = categories.map((cat) => ({
    category: cat,
    preview: getJokesByCategory(cat.slug)[0],
  }));

  // Sort by search volume (popularity)
  const byPopularity = [...categoriesWithPreviews].sort(
    (a, b) => b.category.searchVolume - a.category.searchVolume
  );

  // Sort alphabetically
  const byAlpha = [...categoriesWithPreviews].sort((a, b) =>
    a.category.name.localeCompare(b.category.name)
  );

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="font-serif text-3xl sm:text-4xl mb-2">All Categories</h1>
      <p className="text-text-secondary mb-8">
        Browse our full collection of dad joke categories. {categories.length} categories with
        hundreds of jokes.
      </p>

      <section className="mb-12">
        <h2 className="font-semibold text-lg mb-4">Most Popular</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {byPopularity.map(({ category, preview }) => (
            <CategoryCard key={category.slug} category={category} previewJoke={preview} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="font-semibold text-lg mb-4">A–Z</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {byAlpha.map(({ category, preview }) => (
            <CategoryCard key={category.slug} category={category} previewJoke={preview} />
          ))}
        </div>
      </section>
    </div>
  );
}
