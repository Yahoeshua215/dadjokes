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
  /** One-two sentences explaining why THIS specific joke is funny — the exact wordplay, pun, or double meaning. */
  whyFunny?: string;
  /** One-two sentences on how to deliver THIS joke for max effect. */
  howToTell?: string;
  /** 3 specific occasions/settings where this joke lands well. */
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
