import { Metadata } from 'next';
import { getCategories } from '@/lib/jokes';
import SubmitForm from './SubmitForm';

export const metadata: Metadata = {
  title: 'Submit a Dad Joke | DadJokes.directory',
  description: 'Submit your best dad joke to DadJokes.directory. If it makes us groan, we\'ll add it to the collection.',
  alternates: { canonical: 'https://dadjokes.directory/submit' },
};

export default function SubmitPage() {
  const categories = getCategories();

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="font-serif text-3xl sm:text-4xl mb-2">Submit a Dad Joke</h1>
      <p className="text-text-secondary mb-8">
        Got a joke that&apos;ll make us groan? We&apos;re always looking for new material.
        Fill out the form below and we&apos;ll review it.
      </p>

      <SubmitForm categories={categories} />
    </div>
  );
}
