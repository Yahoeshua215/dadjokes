import { Joke, Category, Topic } from './types';

export function generateWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Joke Like a Dad',
    url: 'https://jokelikeadad.com',
    description: 'The best collection of dad jokes on the internet.',
  };
}

export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function generateJokeListSchema(jokes: Joke[], category: Category) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: category.name,
    description: category.description,
    numberOfItems: jokes.length,
    itemListElement: jokes.map((joke, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'CreativeWork',
        name: joke.setup,
        text: `${joke.setup} ${joke.punchline}`,
      },
    })),
  };
}

export function generateJokeFAQSchema(joke: Joke) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: joke.setup,
        acceptedAnswer: {
          '@type': 'Answer',
          text: joke.punchline,
        },
      },
    ],
  };
}

export function generateFAQSchema(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

export function generateTopicListSchema(jokes: Joke[], topic: Topic) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: topic.name,
    description: topic.description,
    numberOfItems: jokes.length,
    itemListElement: jokes.map((joke, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'CreativeWork',
        name: joke.setup,
        text: `${joke.setup} ${joke.punchline}`,
        ...(joke.slug ? { url: `https://jokelikeadad.com/joke/${joke.slug}` } : {}),
      },
    })),
  };
}
