import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  return (
    <header className="border-b border-border bg-surface sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center">
            <Image
              src="/JLAD-logo-horizontal.png"
              alt="Joke Like a Dad"
              width={200}
              height={40}
              className="h-8 w-auto"
              priority
            />
          </Link>
          <nav className="hidden sm:flex items-center gap-6">
            <Link
              href="/browse"
              className="text-sm text-text-secondary hover:text-foreground transition-colors"
            >
              Browse
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
          </nav>
          <Link
            href="/browse"
            className="sm:hidden text-sm text-text-secondary hover:text-foreground"
          >
            Browse
          </Link>
        </div>
      </div>
    </header>
  );
}
