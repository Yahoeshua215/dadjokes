import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
      <span className="text-6xl mb-6 block">😬</span>
      <h1 className="font-serif text-3xl sm:text-4xl mb-4">Page Not Found</h1>
      <p className="text-text-secondary mb-2 text-lg">
        This page is like my dad&apos;s hair&hellip; gone.
      </p>
      <p className="text-text-secondary mb-8">
        But don&apos;t worry, we&apos;ve got plenty of jokes that <em>are</em> here.
      </p>
      <Link
        href="/"
        className="bg-accent hover:bg-accent-hover text-white font-medium px-6 py-3 rounded-full transition-colors inline-block"
      >
        Back to Home
      </Link>
    </div>
  );
}
