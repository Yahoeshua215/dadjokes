import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'JokeLikeaDad.com — Dad Jokes Directory',
    short_name: 'Dad Jokes',
    description:
      'The best collection of dad jokes on the internet. Browse 2,000+ handpicked dad jokes across 20 categories.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#000000',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  };
}
