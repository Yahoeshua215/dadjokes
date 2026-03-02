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
