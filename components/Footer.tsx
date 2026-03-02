import Link from 'next/link';
import { getCategories } from '@/lib/jokes';

export default function Footer() {
  const categories = getCategories();

  return (
    <footer className="border-t border-border bg-surface mt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <span className="text-2xl">😄</span>
              <span className="font-serif text-lg font-bold">
                Joke Like a <span className="text-accent">Dad</span>
              </span>
            </Link>
            <p className="text-sm text-text-secondary">
              The internet&apos;s best collection of dad jokes. Groan-worthy puns and
              one-liners for every occasion.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-sm mb-3">Pages</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-sm text-text-secondary hover:text-foreground transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/categories" className="text-sm text-text-secondary hover:text-foreground transition-colors">
                  All Categories
                </Link>
              </li>
              <li>
                <Link href="/joke-of-the-day" className="text-sm text-text-secondary hover:text-foreground transition-colors">
                  Joke of the Day
                </Link>
              </li>
              <li>
                <Link href="/what-is-a-dad-joke" className="text-sm text-text-secondary hover:text-foreground transition-colors">
                  What Is a Dad Joke?
                </Link>
              </li>
              <li>
                <Link href="/top-rated" className="text-sm text-text-secondary hover:text-foreground transition-colors">
                  Top Rated
                </Link>
              </li>
              <li>
                <Link href="/developers" className="text-sm text-text-secondary hover:text-foreground transition-colors">
                  Free API
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm text-text-secondary hover:text-foreground transition-colors">
                  About
                </Link>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h3 className="font-semibold text-sm mb-3">Browse by Category</h3>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/${cat.slug}`}
                  className="text-xs text-text-secondary hover:text-accent bg-background px-3 py-1.5 rounded-full border border-border hover:border-accent transition-colors"
                >
                  {cat.emoji} {cat.name}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center">
          <p className="text-xs text-text-secondary">
            &copy; {new Date().getFullYear()} JokeLikeaDad.com. All groans reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
