import Link from 'next/link';
import { Category } from '@/lib/types';
import { Joke } from '@/lib/types';

export default function CategoryCard({
  category,
  previewJoke,
}: {
  category: Category;
  previewJoke?: Joke;
}) {
  return (
    <Link href={`/${category.slug}`} className="block">
      <div className="bg-surface border border-border rounded-xl p-6 card-hover h-full">
        <div className="flex items-start justify-between mb-3">
          <span className="text-4xl">{category.emoji}</span>
          <span className="text-xs font-medium text-text-secondary bg-background px-2.5 py-1 rounded-full border border-border">
            {category.jokeCount} jokes
          </span>
        </div>
        <h3 className="font-semibold text-lg mb-2">{category.name}</h3>
        {previewJoke && (
          <p className="text-sm text-text-secondary line-clamp-2">
            &ldquo;{previewJoke.setup}&rdquo;
          </p>
        )}
      </div>
    </Link>
  );
}
