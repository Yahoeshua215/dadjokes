import Link from 'next/link';

export default function Header() {
  return (
    <header className="border-b border-border bg-surface sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">😄</span>
            <span className="font-serif text-xl font-bold text-foreground">
              DadJokes<span className="text-accent">.directory</span>
            </span>
          </Link>
          <nav className="hidden sm:flex items-center gap-6">
            <Link
              href="/categories"
              className="text-sm text-text-secondary hover:text-foreground transition-colors"
            >
              Categories
            </Link>
            <Link
              href="/top-rated"
              className="text-sm text-text-secondary hover:text-foreground transition-colors"
            >
              Top Rated
            </Link>
            <Link
              href="/joke-of-the-day"
              className="text-sm text-text-secondary hover:text-foreground transition-colors"
            >
              Joke of the Day
            </Link>
            <Link
              href="/submit"
              className="text-sm bg-accent hover:bg-accent-hover text-white px-4 py-2 rounded-full transition-colors"
            >
              Submit a Joke
            </Link>
          </nav>
          <Link
            href="/categories"
            className="sm:hidden text-sm text-text-secondary hover:text-foreground"
          >
            Browse
          </Link>
        </div>
      </div>
    </header>
  );
}
