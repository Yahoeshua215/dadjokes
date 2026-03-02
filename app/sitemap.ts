import { MetadataRoute } from 'next';
import { getCategorySlugs, getAllJokeSlugs } from '@/lib/jokes';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://jokelikeadad.com';
  const categorySlugs = getCategorySlugs();

  const categoryPages = categorySlugs.map((slug) => ({
    url: `${baseUrl}/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  const jokePages = getAllJokeSlugs().map((slug) => ({
    url: `${baseUrl}/joke/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/categories`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/joke-of-the-day`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    ...categoryPages,
    ...jokePages,
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.3,
    },
  ];
}
