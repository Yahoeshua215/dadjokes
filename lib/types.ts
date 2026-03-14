export interface Joke {
  id: string;
  slug: string;
  setup: string;
  punchline: string;
  category: string;
  tags: string[];
  rating: number;
  dateAdded: string;
  source?: string;
  ageRange?: 'kids' | 'teens' | 'adults';
  canonicalSlug?: string;
  whyFunny?: string;
  howToTell?: string;
  perfectFor?: string[];
}

export interface Topic {
  slug: string;
  name: string;
  emoji: string;
  description: string;
  metaTitle: string;
  metaDescription: string;
  tags: string[];
  relatedTopics: string[];
  relatedCategories: string[];
  faqs: { question: string; answer: string }[];
  searchVolume?: number;
  seasonal?: boolean;
  seasonMonth?: number;
}

export interface Pack {
  slug: string;
  name: string;
  emoji: string;
  description: string;
  metaTitle: string;
  metaDescription: string;
  tags: string[];
  categories: string[];
  relatedPacks: string[];
  faqs: { question: string; answer: string }[];
}

export interface Category {
  slug: string;
  name: string;
  emoji: string;
  description: string;
  metaTitle: string;
  metaDescription: string;
  relatedCategories: string[];
  jokeCount: number;
  searchVolume: number;
  seasonal?: boolean;
  seasonMonth?: number;
}
