'use client';

import { useState } from 'react';
import { Category } from '@/lib/types';

export default function SubmitForm({ categories }: { categories: Category[] }) {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="bg-surface border border-border rounded-xl p-8 text-center">
        <span className="text-4xl mb-4 block">🎉</span>
        <h2 className="font-serif text-2xl mb-2">Thanks for submitting!</h2>
        <p className="text-text-secondary">
          We&apos;ll review your joke and add it to the collection if it makes us groan loud
          enough.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="mt-4 text-sm text-accent hover:text-accent-hover font-medium"
        >
          Submit another →
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSubmitted(true);
      }}
      className="space-y-6"
    >
      <div>
        <label htmlFor="setup" className="block text-sm font-medium mb-2">
          Setup
        </label>
        <input
          id="setup"
          name="setup"
          type="text"
          required
          placeholder="Why don't scientists trust atoms?"
          className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-sm placeholder:text-text-secondary focus:outline-none focus:border-accent transition-colors"
        />
      </div>

      <div>
        <label htmlFor="punchline" className="block text-sm font-medium mb-2">
          Punchline
        </label>
        <input
          id="punchline"
          name="punchline"
          type="text"
          required
          placeholder="Because they make up everything!"
          className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-sm placeholder:text-text-secondary focus:outline-none focus:border-accent transition-colors"
        />
      </div>

      <div>
        <label htmlFor="category" className="block text-sm font-medium mb-2">
          Category
        </label>
        <select
          id="category"
          name="category"
          className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-accent transition-colors"
        >
          <option value="">Select a category...</option>
          {categories.map((cat) => (
            <option key={cat.slug} value={cat.slug}>
              {cat.emoji} {cat.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="name" className="block text-sm font-medium mb-2">
          Your name <span className="text-text-secondary font-normal">(optional)</span>
        </label>
        <input
          id="name"
          name="name"
          type="text"
          placeholder="Dad McJokerson"
          className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-sm placeholder:text-text-secondary focus:outline-none focus:border-accent transition-colors"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-accent hover:bg-accent-hover text-white font-semibold py-3 rounded-full transition-colors"
      >
        Submit Joke
      </button>
    </form>
  );
}
